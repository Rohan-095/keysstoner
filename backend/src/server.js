require("dotenv").config();
const express  = require("express");
const cors     = require("cors");
const supabase = require("./supabase");

const leadsRouter    = require("./routes/leads");
const webhooksRouter = require("./routes/webhooks");
const statsRouter    = require("./routes/stats");

const app  = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: (origin, cb) => {
    const allowed = [
      process.env.FRONTEND_URL,
      "https://keysstoner.vercel.app",
      "https://keysstoner-git-main-rohan-095s-projects.vercel.app",
      "http://localhost:5173",
      "http://localhost:3000",
      "http://localhost:3001",
    ].filter(Boolean);
    // Allow Vercel preview URLs and no-origin (server-to-server / curl)
    if (!origin || allowed.includes(origin) || /\.vercel\.app$/.test(origin) || /^http:\/\/localhost:\d+$/.test(origin)) {
      return cb(null, true);
    }
    cb(new Error("CORS: origin not allowed: " + origin));
  },
}));
app.use(express.json());

app.use("/api/leads",    leadsRouter);
app.use("/api/webhooks", webhooksRouter);
app.use("/api/stats",    statsRouter);

app.get("/health", (_, res) => res.json({ ok: true }));

// ─── Stale-call recovery ─────────────────────────────────────────────────────
// If a lead stays "calling" for more than 5 minutes the webhook likely never
// arrived. Mark it "no_answer" and close any dangling call records.
async function recoverStaleCalls() {
  const cutoff = new Date(Date.now() - 5 * 60 * 1000).toISOString();

  const { data: stale } = await supabase
    .from("leads")
    .select("id")
    .eq("status", "calling")
    .lt("updated_at", cutoff);

  if (!stale?.length) return;

  for (const lead of stale) {
    console.log(`[recovery] lead ${lead.id} stuck in "calling" >5 min — marking no_answer`);
    await supabase.from("leads").update({ status: "no_answer" }).eq("id", lead.id);
    await supabase.from("calls")
      .update({ status: "completed" })
      .eq("lead_id", lead.id)
      .in("status", ["initiated", "ringing", "in_progress"]);
  }
}

app.listen(PORT, () => {
  console.log(`Keystoners backend running on :${PORT}`);
  console.log(`SUPABASE_URL:        ${process.env.SUPABASE_URL        ? "set" : "MISSING"}`);
  console.log(`SUPABASE_SERVICE_KEY:${process.env.SUPABASE_SERVICE_KEY ? "set" : "MISSING"}`);
  console.log(`VAPI_API_KEY:        ${process.env.VAPI_API_KEY         ? "set" : "MISSING"}`);
  console.log(`VAPI_ASSISTANT_ID:   ${process.env.VAPI_ASSISTANT_ID    ? "set" : "MISSING"}`);
  console.log(`VAPI_PHONE_NUMBER_ID:${process.env.VAPI_PHONE_NUMBER_ID ? "set" : "MISSING"}`);
  setInterval(recoverStaleCalls, 2 * 60 * 1000); // check every 2 minutes
});
