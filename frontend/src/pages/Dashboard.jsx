import { useState, useEffect, useCallback } from "react";
import { Sparkles, RefreshCw, LogOut } from "lucide-react";
import { api } from "../lib/api";
import StatsCards  from "../components/StatsCards";
import FilterBar   from "../components/FilterBar";
import LeadsTable  from "../components/LeadsTable";
import LeadDrawer  from "../components/LeadDrawer";

const POLL_MS = 30_000;

export default function Dashboard({ onLogout }) {
  const [stats,      setStats]      = useState(null);
  const [leads,      setLeads]      = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [search,     setSearch]     = useState("");
  const [status,     setStatus]     = useState("all");
  const [selected,   setSelected]   = useState(null);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const fetchAll = useCallback(async () => {
    try {
      const [s, l] = await Promise.all([
        api.getStats(),
        api.getLeads({ status: status === "all" ? undefined : status, search: search || undefined }),
      ]);
      setStats(s);
      setLeads(l);
      setLastRefresh(new Date());
    } catch (e) {
      console.error("Fetch error:", e);
    } finally {
      setLoading(false);
    }
  }, [status, search]);

  // Initial load + re-fetch on filter change
  useEffect(() => { fetchAll(); }, [fetchAll]);

  // 30-second poll
  useEffect(() => {
    const id = setInterval(fetchAll, POLL_MS);
    return () => clearInterval(id);
  }, [fetchAll]);

  // Re-open updated lead after refresh
  const handleRefresh = async () => {
    await fetchAll();
    if (selected) {
      try {
        const updated = await api.getLead(selected.id);
        setSelected(updated);
      } catch {}
    }
  };

  const timeSince = Math.round((new Date() - lastRefresh) / 1000);

  return (
    <div className="min-h-screen bg-[#091428] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0d1c3f]/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1a3566] to-[#0d1c3f] border border-yellow-500/30 flex items-center justify-center">
              <Sparkles size={16} className="text-yellow-400"/>
            </div>
            <div>
              <p className="font-bold text-white leading-none">Keystoners</p>
              <p className="text-xs text-white/40">Admin Dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs text-white/40">
            <span>Updated {timeSince}s ago</span>
            <button
              onClick={handleRefresh}
              title="Refresh"
              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <RefreshCw size={13}/>
            </button>
            <button
              onClick={onLogout}
              title="Sign out"
              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-500/20 hover:border-red-500/30 hover:text-red-400 transition-colors"
            >
              <LogOut size={13}/>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <StatsCards stats={stats}/>

        {/* Filters */}
        <FilterBar
          search={search}   onSearch={setSearch}
          status={status}   onStatus={setStatus}
        />

        {/* Table */}
        <LeadsTable
          leads={leads}
          loading={loading}
          onSelect={setSelected}
        />
      </main>

      {/* Lead detail drawer */}
      <LeadDrawer
        lead={selected}
        onClose={() => setSelected(null)}
        onRefresh={handleRefresh}
      />
    </div>
  );
}
