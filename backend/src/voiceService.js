// Unified voice provider abstraction — supports Retell, Vapi, Bland.
// Returns null from getProvider() if no keys are configured, so the caller
// can skip the call entirely and just save the lead.

function isReal(val) {
  return val && !val.startsWith("your_");
}

function getProvider() {
  const explicit = (process.env.VOICE_PROVIDER || "").toLowerCase();
  if (explicit && explicit !== "none") return explicit;

  if (isReal(process.env.RETELL_API_KEY)) return "retell";
  if (isReal(process.env.VAPI_API_KEY))   return "vapi";
  if (isReal(process.env.BLAND_API_KEY))  return "bland";
  return null;
}

// ─── Retell ──────────────────────────────────────────────────────────────────
async function callRetell({ toNumber, lead }) {
  const res = await fetch("https://api.retellai.com/v2/create-phone-call", {
    method: "POST",
    headers: {
      Authorization:  `Bearer ${process.env.RETELL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from_number:  process.env.RETELL_FROM_NUMBER,
      to_number:    toNumber,
      agent_id:     process.env.RETELL_AGENT_ID,
      metadata:     { lead_id: lead.id },
      retell_llm_dynamic_variables: {
        customer_name:     lead.name,
        service_requested: lead.service       || "exterior cleaning",
        city:              lead.city          || "your area",
        address:           lead.address       || "your property",
        preferred_time:    lead.preferred_time || "flexible",
        notes:             lead.notes         || "",
      },
    }),
  });
  if (!res.ok) throw new Error(`Retell ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return { provider_call_id: data.call_id };
}

// ─── Vapi ─────────────────────────────────────────────────────────────────────
async function callVapi({ toNumber, lead }) {
  const apiKey  = process.env.VAPI_API_KEY;
  const asstId  = process.env.VAPI_ASSISTANT_ID;
  const phoneId = process.env.VAPI_PHONE_NUMBER_ID;

  console.log("[Vapi] VAPI_API_KEY:        ", apiKey  ? `set (${apiKey.slice(0, 8)}…)` : "MISSING");
  console.log("[Vapi] VAPI_ASSISTANT_ID:   ", asstId  || "MISSING");
  console.log("[Vapi] VAPI_PHONE_NUMBER_ID:", phoneId || "MISSING");
  console.log("[Vapi] to_number:           ", toNumber);

  const res = await fetch("https://api.vapi.ai/call/phone", {
    method: "POST",
    headers: {
      Authorization:  `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      assistantId:   asstId,
      phoneNumberId: phoneId,
      customer: { number: toNumber, name: lead.name },
      assistantOverrides: {
        variableValues: {
          customer_name:     lead.name,
          service_requested: lead.service       || "exterior cleaning",
          city:              lead.city          || "your area",
          address:           lead.address       || "your property",
          preferred_time:    lead.preferred_time || "flexible",
          notes:             lead.notes         || "",
        },
      },
      metadata: { lead_id: lead.id },
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error(`[Vapi] Error ${res.status}:`, body);
    const err = new Error(`Vapi ${res.status}: ${body}`);
    err.providerResponse = { status: res.status, body };
    throw err;
  }

  const data = await res.json();
  console.log("[Vapi] call created:", data.id);
  return { provider_call_id: data.id };
}

// ─── Bland ────────────────────────────────────────────────────────────────────
async function callBland({ toNumber, lead }) {
  const task = [
    `You are calling ${lead.name} on behalf of Keystoners Exterior Cleaning, a professional exterior cleaning company in Vancouver, BC.`,
    `They requested a quote for: ${lead.service || "exterior cleaning"} in ${lead.city || "the Lower Mainland"}.`,
    `Goals:`,
    `1. Confirm their service request and address (${lead.address || "not provided"}).`,
    `2. Ask about any access requirements or concerns.`,
    `3. Offer time slots: mornings (8am–12pm), afternoons (12–4pm), or evenings (4–7pm).`,
    `4. Try to book a specific appointment and confirm it.`,
    `5. If no answer, leave a brief friendly voicemail.`,
    `Preferred time they mentioned: ${lead.preferred_time || "flexible"}.`,
    `Additional notes: ${lead.notes || "none"}.`,
  ].join(" ");

  const res = await fetch("https://api.bland.ai/v1/calls", {
    method: "POST",
    headers: {
      authorization:  process.env.BLAND_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone_number:       toNumber,
      from:               process.env.BLAND_FROM_NUMBER || undefined,
      task,
      voice:              "maya",
      wait_for_greeting:  true,
      record:             true,
      metadata:           { lead_id: lead.id },
    }),
  });
  if (!res.ok) throw new Error(`Bland ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return { provider_call_id: data.call_id };
}

// ─── Public API ───────────────────────────────────────────────────────────────
async function createCall({ toNumber, lead }) {
  const provider = getProvider();
  if (!provider) return null;

  const handlers = { retell: callRetell, vapi: callVapi, bland: callBland };
  const fn = handlers[provider];
  if (!fn) throw new Error(`Unknown voice provider: ${provider}`);

  const result = await fn({ toNumber, lead });
  return { provider, ...result };
}

module.exports = { createCall, getProvider };
