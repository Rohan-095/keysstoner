const express  = require("express");
const supabase  = require("../supabase");
const { createCall, getProvider } = require("../voiceService");
const { sendLeadNotification }    = require("../emailService");

const router = express.Router();

function toE164(phone) {
  const s = phone.trim();
  if (s.startsWith("+")) return s;                          // already E.164
  const digits = s.replace(/\D/g, "");
  if (digits.startsWith("0") && digits.length === 11)
    return "+92" + digits.slice(1);                         // Pakistan: 03XXXXXXXXX → +923XXXXXXXXX
  if (digits.length === 10) return "+1" + digits;           // North American 10-digit
  if (digits.length === 11 && digits.startsWith("1"))
    return "+" + digits;                                    // North American with leading 1
  return "+" + digits;                                      // best-effort
}

/* POST /api/leads — save lead, optionally trigger AI call */
router.post("/", async (req, res) => {
  const { name, phone, email, address, city, service, notes, preferred_time } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: "name and phone are required" });
  }

  const e164 = toE164(phone);
  const provider = getProvider();

  // 1. Check for existing lead with same phone — update instead of duplicating
  const { data: existing } = await supabase
    .from("leads").select("id, status").eq("phone", e164).maybeSingle();

  if (existing) {
    await supabase.from("leads")
      .update({ name, email, address, city, service, notes, preferred_time })
      .eq("id", existing.id);
    console.log(`Lead ${existing.id} already exists for ${e164}, updated info.`);
    return res.status(200).json({ success: true, leadId: existing.id, updated: true });
  }

  // 2. Save new lead — always start as "new"; promote to "calling" only if we fire a call
  const { data: lead, error: leadErr } = await supabase
    .from("leads")
    .insert({ name, phone: e164, email, address, city, service, notes, preferred_time, status: "new" })
    .select()
    .single();

  if (leadErr) {
    console.error("Lead insert error:", leadErr);
    return res.status(500).json({ error: "Failed to save lead" });
  }

  // Respond immediately so the website form doesn't hang
  res.status(201).json({ success: true, leadId: lead.id });

  // Send email notification (non-blocking)
  sendLeadNotification(lead).catch(err => console.error("[email] Failed to send notification:", err.message));

  // 2. If no AI provider is configured, stop here
  if (!provider) {
    console.log(`Lead ${lead.id} saved — no voice provider configured, skipping call.`);
    return;
  }

  // 3. Create call record and promote lead to "calling"
  const { data: callRecord } = await supabase
    .from("calls")
    .insert({ lead_id: lead.id, provider, status: "initiated" })
    .select()
    .single();

  await supabase.from("leads").update({ status: "calling" }).eq("id", lead.id);

  // 4. Fire the call (non-blocking, response already sent)
  createCall({ toNumber: e164, lead })
    .then(async (result) => {
      if (!result) return;
      await supabase
        .from("calls")
        .update({ provider_call_id: result.provider_call_id, status: "ringing" })
        .eq("id", callRecord.id);
      console.log(`Call initiated for lead ${lead.id} via ${provider}: ${result.provider_call_id}`);
    })
    .catch(async (err) => {
      console.error(`Call failed for lead ${lead.id}:`, err.message);
      await supabase.from("calls").update({
        status: "failed",
        raw_webhook: { error: err.message, detail: err.providerResponse ?? null },
      }).eq("id", callRecord.id);
      await supabase.from("leads").update({ status: "failed" }).eq("id", lead.id);
    });
});

/* GET /api/leads */
router.get("/", async (req, res) => {
  const { status, search, limit = 50, offset = 0 } = req.query;

  let query = supabase
    .from("leads")
    .select("*, calls(*)")
    .order("created_at", { ascending: false })
    .range(Number(offset), Number(offset) + Number(limit) - 1);

  if (status && status !== "all") query = query.eq("status", status);
  if (search) query = query.or(`name.ilike.%${search}%,phone.ilike.%${search}%,city.ilike.%${search}%`);

  const { data, error } = await query;
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

/* GET /api/leads/:id */
router.get("/:id", async (req, res) => {
  const { data, error } = await supabase
    .from("leads")
    .select("*, calls(*)")
    .eq("id", req.params.id)
    .single();

  if (error) return res.status(404).json({ error: "Lead not found" });
  res.json(data);
});

/* PATCH /api/leads/:id/status — manual override from dashboard */
router.patch("/:id/status", async (req, res) => {
  const { status } = req.body;
  const allowed = ["new","calling","called","booked","no_answer","not_interested","failed"];
  if (!allowed.includes(status)) return res.status(400).json({ error: "Invalid status" });

  const { data, error } = await supabase
    .from("leads")
    .update({ status })
    .eq("id", req.params.id)
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

/* POST /api/leads/:id/retry-call */
router.post("/:id/retry-call", async (req, res) => {
  const provider = getProvider();
  if (!provider) return res.status(400).json({ error: "No voice provider configured" });

  const { data: lead, error } = await supabase
    .from("leads").select("*").eq("id", req.params.id).single();
  if (error) return res.status(404).json({ error: "Lead not found" });

  const { data: callRecord } = await supabase
    .from("calls")
    .insert({ lead_id: lead.id, provider, status: "initiated" })
    .select()
    .single();

  await supabase.from("leads").update({ status: "calling" }).eq("id", lead.id);

  res.json({ success: true });

  createCall({ toNumber: lead.phone, lead })
    .then(async (result) => {
      if (!result) return;
      await supabase
        .from("calls")
        .update({ provider_call_id: result.provider_call_id, status: "ringing" })
        .eq("id", callRecord.id);
    })
    .catch(async (err) => {
      console.error("Retry call failed:", err.message);
      await supabase.from("calls").update({
        status: "failed",
        raw_webhook: { error: err.message, detail: err.providerResponse ?? null },
      }).eq("id", callRecord.id);
    });
});

module.exports = router;
