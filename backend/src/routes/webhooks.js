const express  = require("express");
const supabase  = require("../supabase");

const router = express.Router();

// ─── Shared helpers ───────────────────────────────────────────────────────────

function normaliseSentiment(raw) {
  if (!raw) return null;
  const s = raw.toLowerCase();
  if (s.includes("positive")) return "positive";
  if (s.includes("negative")) return "negative";
  return "neutral";
}

// intent → lead status
const INTENT_STATUS = {
  booked:         "booked",
  callback:       "called",
  not_interested: "not_interested",
  no_answer:      "no_answer",
};

function intentFromText(text = "", customData = {}) {
  const t = text.toLowerCase();
  if (customData.booked        || t.includes("booked") || t.includes("appointment confirmed")) return "booked";
  if (customData.not_interested || t.includes("not interested") || t.includes("declined"))    return "not_interested";
  if (t.includes("callback")   || t.includes("call back") || t.includes("try again"))         return "callback";
  return "no_answer";
}

async function saveCallResult(providerCallId, { transcript, summary, intent, sentiment, duration_seconds, recording_url, raw }) {
  const { data: callRecord, error } = await supabase
    .from("calls")
    .select("id, lead_id")
    .eq("provider_call_id", providerCallId)
    .single();

  if (error || !callRecord) {
    console.warn("[webhook] no call record for provider_call_id:", providerCallId);
    return;
  }

  console.log(`[webhook] saving result for call ${callRecord.id} — intent=${intent}`);

  await supabase.from("calls").update({
    status: "completed",
    transcript,
    summary,
    intent,
    sentiment,
    duration_seconds,
    recording_url,
    raw_webhook: raw,
  }).eq("id", callRecord.id);

  const leadStatus = INTENT_STATUS[intent] || "called";
  console.log(`[webhook] updating lead ${callRecord.lead_id} → ${leadStatus}`);

  await supabase.from("leads")
    .update({ status: leadStatus })
    .eq("id", callRecord.lead_id);
}

async function saveCallStarted(providerCallId) {
  const { data: callRecord } = await supabase
    .from("calls").select("id, lead_id").eq("provider_call_id", providerCallId).single();
  if (!callRecord) {
    console.warn("[webhook] saveCallStarted: no record for", providerCallId);
    return;
  }
  console.log(`[webhook] call ${callRecord.id} in_progress`);
  await supabase.from("calls").update({ status: "in_progress" }).eq("id", callRecord.id);
  await supabase.from("leads").update({ status: "calling" }).eq("id", callRecord.lead_id);
}

// ─── Retell ───────────────────────────────────────────────────────────────────
router.post("/retell", async (req, res) => {
  res.sendStatus(200);
  console.log("[Retell webhook] event:", req.body?.event, "call_id:", req.body?.call?.call_id);

  const { event, call } = req.body;
  if (!call) return;

  if (event === "call_started") {
    await saveCallStarted(call.call_id);
    return;
  }

  if (event === "call_ended" || event === "call_analyzed") {
    const analysis = call.call_analysis || {};
    const noAnswer = ["no_answer", "voicemail"].includes(call.call_status);
    const intent   = noAnswer ? "no_answer" : intentFromText(analysis.call_summary, analysis.custom_analysis_data);

    await saveCallResult(call.call_id, {
      transcript:       call.transcript         || null,
      summary:          analysis.call_summary   || null,
      intent,
      sentiment:        normaliseSentiment(analysis.user_sentiment),
      duration_seconds: call.duration_ms ? Math.round(call.duration_ms / 1000) : null,
      recording_url:    call.recording_url      || null,
      raw:              req.body,
    });
  }
});

// ─── Vapi ─────────────────────────────────────────────────────────────────────
// Vapi POST /api/webhooks/vapi
// All events arrive wrapped: { message: { type, call: { id }, ... } }
// endedReason values for no-answer: "customer-did-not-answer", "voicemail",
//   "no-answer", "exceeded-max-duration", "pipeline-no-available-model"
router.post("/vapi", async (req, res) => {
  res.sendStatus(200);

  // Log every incoming Vapi event so you can see it in the terminal
  console.log("[Vapi webhook] raw body:", JSON.stringify(req.body));

  // Vapi wraps events in { message: {...} }; also handle unwrapped payloads
  const msg    = req.body?.message ?? req.body;
  const type   = msg?.type;
  const callId = msg?.call?.id;

  console.log(`[Vapi webhook] type=${type ?? "none"} callId=${callId ?? "none"}`);

  if (!type || !callId) {
    console.warn("[Vapi webhook] missing type or callId — ignoring");
    return;
  }

  // ── Call started ────────────────────────────────────────────────────────────
  if (type === "call-started") {
    await saveCallStarted(callId);
    return;
  }

  // ── Status updates (in-progress / error / failed) ───────────────────────────
  if (type === "status-update") {
    const s = (msg.status || "").toLowerCase();
    console.log(`[Vapi webhook] status-update: ${s}`);
    if (s === "in-progress") {
      await saveCallStarted(callId);
    } else if (s === "error" || s === "failed") {
      const { data: callRecord } = await supabase
        .from("calls").select("id, lead_id").eq("provider_call_id", callId).single();
      if (callRecord) {
        await supabase.from("calls").update({ status: "failed", raw_webhook: req.body }).eq("id", callRecord.id);
        await supabase.from("leads").update({ status: "failed" }).eq("id", callRecord.lead_id);
      }
    }
    return;
  }

  // ── End of call report ──────────────────────────────────────────────────────
  if (type === "end-of-call-report") {
    const endedReason = (msg.endedReason || "").toLowerCase();
    console.log(`[Vapi webhook] endedReason=${endedReason}`);

    const NO_ANSWER_REASONS = [
      "customer-did-not-answer",
      "no-answer",
      "no_answer",
      "voicemail",
      "exceeded-max-duration",
      "pipeline-no-available-model",
    ];
    const noAnswer = NO_ANSWER_REASONS.some(r => endedReason.includes(r));
    const intent   = noAnswer
      ? "no_answer"
      : intentFromText(
          (msg.summary || "") + " " + (msg.transcript || ""),
          msg.analysis?.structuredData,
        );

    // recordingUrl can appear in several places in Vapi's payload
    const recordingUrl =
      msg.recordingUrl        ||
      msg.stereoRecordingUrl  ||
      msg.call?.recordingUrl  ||
      null;

    await saveCallResult(callId, {
      transcript:       msg.transcript                              || null,
      summary:          msg.summary                                 || null,
      intent,
      sentiment:        normaliseSentiment(msg.analysis?.successEvaluation),
      duration_seconds: msg.durationMs ? Math.round(msg.durationMs / 1000) : null,
      recording_url:    recordingUrl,
      raw:              req.body,
    });
  }
});

// ─── Bland ────────────────────────────────────────────────────────────────────
router.post("/bland", async (req, res) => {
  res.sendStatus(200);
  console.log("[Bland webhook] call_id:", req.body?.call_id, "status:", req.body?.status);

  const body   = req.body;
  const callId = body.call_id;
  if (!callId) return;

  if (body.status === "completed" || body.completed === true) {
    const noAnswer = !body.answered;
    const intent   = noAnswer ? "no_answer" : intentFromText(body.summary || body.transcript);

    await saveCallResult(callId, {
      transcript:       body.transcript    || null,
      summary:          body.summary       || null,
      intent,
      sentiment:        normaliseSentiment(body.sentiment),
      duration_seconds: body.call_length   ? Math.round(body.call_length * 60) : null,
      recording_url:    body.recording_url || null,
      raw:              req.body,
    });
  }
});

module.exports = router;
