import { Search } from "lucide-react";
import { STATUS_CONFIG } from "../lib/utils";

const statuses = ["all", ...Object.keys(STATUS_CONFIG)];

export default function FilterBar({ search, onSearch, status, onStatus, counts = {} }) {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      {/* Search */}
      <div className="relative flex-1 min-w-48">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"/>
        <input
          type="text"
          value={search}
          onChange={e => onSearch(e.target.value)}
          placeholder="Search name, phone, city…"
          className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-yellow-500/50"
        />
      </div>

      {/* Status filter */}
      <div className="flex flex-wrap gap-1.5">
        {statuses.map(s => {
          const count = s === "all" ? counts.leads : counts[s];
          const label = s === "all" ? "All" : (STATUS_CONFIG[s]?.label ?? s);
          return (
            <button
              key={s}
              onClick={() => onStatus(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                status === s
                  ? "bg-yellow-500/20 border-yellow-500/50 text-yellow-300"
                  : "bg-white/5 border-white/10 text-white/50 hover:text-white/80"
              }`}
            >
              {label}{count != null ? ` (${count})` : ""}
            </button>
          );
        })}
      </div>
    </div>
  );
}
