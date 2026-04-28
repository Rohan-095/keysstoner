import { PhoneCall } from "lucide-react";
import { STATUS_CONFIG, formatDate, formatPhone } from "../lib/utils";

export default function LeadsTable({ leads, onSelect, loading }) {
  if (loading) return (
    <div className="space-y-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white/5 rounded-xl h-16 animate-pulse"/>
      ))}
    </div>
  );

  if (!leads?.length) return (
    <div className="text-center py-16 text-white/40">No leads found.</div>
  );

  return (
    <div className="overflow-x-auto rounded-xl border border-white/10">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-white/10 bg-white/5">
            {["Name", "Phone", "Email", "Service", "City", "Status", "Created At", ""].map(h => (
              <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-white/40 uppercase tracking-wide">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {leads.map(lead => {
            const cfg = STATUS_CONFIG[lead.status] || {};
            return (
              <tr
                key={lead.id}
                onClick={() => onSelect(lead)}
                className="border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors"
              >
                <td className="px-4 py-3 font-medium text-white">{lead.name}</td>
                <td className="px-4 py-3 text-white/60">{formatPhone(lead.phone)}</td>
                <td className="px-4 py-3 text-white/60">{lead.email || "—"}</td>
                <td className="px-4 py-3 text-white/60">{lead.service || "—"}</td>
                <td className="px-4 py-3 text-white/60">{lead.city || "—"}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${cfg.color}`}>
                    {cfg.label ?? lead.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-white/40 whitespace-nowrap">{formatDate(lead.created_at)}</td>
                <td className="px-4 py-3">
                  {lead.calls?.length > 0 && (
                    <PhoneCall size={13} className="text-white/30"/>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
