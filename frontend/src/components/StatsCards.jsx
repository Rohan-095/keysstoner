import { Users, PhoneCall, CalendarCheck, PhoneMissed, TrendingUp } from "lucide-react";

const cards = [
  { key: "leads",     label: "Total Leads",    icon: Users,         color: "text-blue-400",   bg: "bg-blue-500/10" },
  { key: "calling",   label: "Calling Now",    icon: PhoneCall,     color: "text-yellow-400", bg: "bg-yellow-500/10" },
  { key: "booked",    label: "Booked",         icon: CalendarCheck, color: "text-green-400",  bg: "bg-green-500/10" },
  { key: "no_answer", label: "No Answer",      icon: PhoneMissed,   color: "text-gray-400",   bg: "bg-gray-500/10" },
  { key: "called",    label: "Called",         icon: TrendingUp,    color: "text-purple-400", bg: "bg-purple-500/10" },
];

export default function StatsCards({ stats }) {
  if (!stats) return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
      {cards.map(c => (
        <div key={c.key} className="bg-white/5 border border-white/10 rounded-xl p-4 animate-pulse h-24"/>
      ))}
    </div>
  );

  const { totals, calls } = stats;

  const bookRate = totals.leads > 0
    ? Math.round((totals.booked / totals.leads) * 100)
    : 0;

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
      {cards.map(({ key, label, icon: Icon, color, bg }) => (
        <div key={key} className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col gap-2">
          <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center`}>
            <Icon size={18} className={color}/>
          </div>
          <p className="text-2xl font-bold text-white">{totals[key] ?? 0}</p>
          <p className="text-xs text-white/50">{label}</p>
        </div>
      ))}
    </div>
  );
}
