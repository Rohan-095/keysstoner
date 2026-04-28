export const STATUS_CONFIG = {
  new:            { label: "New",            color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
  calling:        { label: "Calling…",       color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30" },
  called:         { label: "Called",         color: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
  booked:         { label: "Booked ✓",       color: "bg-green-500/20 text-green-300 border-green-500/30" },
  no_answer:      { label: "No Answer",      color: "bg-gray-500/20 text-gray-300 border-gray-500/30" },
  not_interested: { label: "Not Interested", color: "bg-red-500/20 text-red-300 border-red-500/30" },
  failed:         { label: "Failed",         color: "bg-red-700/20 text-red-400 border-red-700/30" },
};

export const SENTIMENT_CONFIG = {
  positive: { label: "Positive", color: "text-green-400" },
  neutral:  { label: "Neutral",  color: "text-yellow-400" },
  negative: { label: "Negative", color: "text-red-400" },
};

export function formatDate(iso) {
  if (!iso) return "—";
  return new Intl.DateTimeFormat("en-CA", { dateStyle: "medium", timeStyle: "short" }).format(new Date(iso));
}

export function formatDuration(seconds) {
  if (!seconds) return "—";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

export function formatPhone(phone) {
  const d = (phone || "").replace(/\D/g, "");
  if (d.length === 11) return `+1 (${d.slice(1,4)}) ${d.slice(4,7)}-${d.slice(7)}`;
  if (d.length === 10) return `(${d.slice(0,3)}) ${d.slice(3,6)}-${d.slice(6)}`;
  return phone;
}
