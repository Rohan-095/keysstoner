const express  = require("express");
const supabase  = require("../supabase");

const router = express.Router();

/* GET /api/stats */
router.get("/", async (req, res) => {
  const [leadsRes, callsRes] = await Promise.all([
    supabase.from("leads").select("status, created_at"),
    supabase.from("calls").select("status, duration_seconds, created_at"),
  ]);

  if (leadsRes.error || callsRes.error) {
    return res.status(500).json({ error: "Failed to fetch stats" });
  }

  const leads = leadsRes.data;
  const calls = callsRes.data;

  const count = (arr, key, val) => arr.filter(r => r[key] === val).length;

  const durations = calls
    .map(c => c.duration_seconds)
    .filter(Boolean);

  const avgDuration = durations.length
    ? Math.round(durations.reduce((a, b) => a + b, 0) / durations.length)
    : 0;

  // Leads per day for the last 14 days
  const today = new Date();
  const dailyLeads = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (13 - i));
    const key = d.toISOString().slice(0, 10);
    return {
      date:  key,
      count: leads.filter(l => l.created_at.slice(0, 10) === key).length,
    };
  });

  res.json({
    totals: {
      leads:          leads.length,
      new:            count(leads, "status", "new"),
      booked:         count(leads, "status", "booked"),
      called:         count(leads, "status", "called"),
      no_answer:      count(leads, "status", "no_answer"),
      not_interested: count(leads, "status", "not_interested"),
      calling:        count(leads, "status", "calling"),
      failed:         count(leads, "status", "failed"),
    },
    calls: {
      total:        calls.length,
      completed:    count(calls, "status", "completed"),
      avg_duration: avgDuration,
    },
    daily_leads: dailyLeads,
  });
});

module.exports = router;
