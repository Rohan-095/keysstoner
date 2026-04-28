const { createClient } = require("@supabase/supabase-js");

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_KEY;

if (!url || !key) {
  console.error("[FATAL] SUPABASE_URL or SUPABASE_SERVICE_KEY is missing from environment variables.");
  process.exit(1);
}

const supabase = createClient(url, key);

module.exports = supabase;
