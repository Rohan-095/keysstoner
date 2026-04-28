const BASE = import.meta.env.VITE_API_URL || "https://keysstoner-production.up.railway.app/api";

console.log("[api] BASE URL:", BASE);

async function request(path, opts = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...opts.headers },
    ...opts,
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${path}`);
  return res.json();
}

export const api = {
  getStats:       ()             => request("/stats"),
  getLeads:       (params = {})  => {
    const clean = Object.fromEntries(Object.entries(params).filter(([, v]) => v != null));
    return request("/leads?" + new URLSearchParams(clean));
  },
  getLead:        (id)           => request(`/leads/${id}`),
  updateStatus:   (id, status)   => request(`/leads/${id}/status`, { method: "PATCH", body: JSON.stringify({ status }) }),
  retryCall:      (id)           => request(`/leads/${id}/retry-call`, { method: "POST" }),
};
