import { useState } from "react";
import { X, Phone, RefreshCw, MapPin, Clock, MessageSquare } from "lucide-react";
import { STATUS_CONFIG, SENTIMENT_CONFIG, formatDate, formatPhone, formatDuration } from "../lib/utils";
import { api } from "../lib/api";

const ALL_STATUSES = Object.keys(STATUS_CONFIG);

export default function LeadDrawer({ lead, onClose, onRefresh }) {
  const [saving, setSaving] = useState(false);
  const [retrying, setRetrying] = useState(false);

  if (!lead) return null;

  const cfg       = STATUS_CONFIG[lead.status] || {};
  const lastCall  = lead.calls?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];
  const sentCfg   = lastCall?.sentiment ? SENTIMENT_CONFIG[lastCall.sentiment] : null;

  async function handleStatusChange(newStatus) {
    setSaving(true);
    try {
      await api.updateStatus(lead.id, newStatus);
      onRefresh();
    } finally {
      setSaving(false);
    }
  }

  async function handleRetry() {
    setRetrying(true);
    try {
      await api.retryCall(lead.id);
      onRefresh();
    } finally {
      setRetrying(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}/>

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-[#0d1c3f] border-l border-white/10 overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 sticky top-0 bg-[#0d1c3f] z-10">
          <div>
            <h2 className="font-bold text-lg text-white">{lead.name}</h2>
            <p className="text-sm text-white/50">{formatPhone(lead.phone)}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRetry}
              disabled={retrying}
              title="Retry call"
              className="w-9 h-9 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400 hover:bg-yellow-500/20 transition-colors disabled:opacity-40"
            >
              <RefreshCw size={15} className={retrying ? "animate-spin" : ""}/>
            </button>
            <a
              href={`tel:${lead.phone}`}
              className="w-9 h-9 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 hover:bg-green-500/20 transition-colors"
            >
              <Phone size={15}/>
            </a>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
            >
              <X size={15}/>
            </button>
          </div>
        </div>

        <div className="p-5 flex flex-col gap-5 flex-1">
          {/* Status changer */}
          <div>
            <p className="text-xs text-white/40 uppercase tracking-wide mb-2">Status</p>
            <div className="flex flex-wrap gap-1.5">
              {ALL_STATUSES.map(s => {
                const c = STATUS_CONFIG[s];
                return (
                  <button
                    key={s}
                    onClick={() => handleStatusChange(s)}
                    disabled={saving || lead.status === s}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                      lead.status === s ? c.color : "bg-white/5 border-white/10 text-white/40 hover:text-white/70"
                    } disabled:opacity-50`}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Lead details */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
            <Detail icon={MapPin}     label="City"     value={lead.city || "—"} />
            <Detail icon={Clock}      label="Submitted" value={formatDate(lead.created_at)} />
            <Detail icon={MessageSquare} label="Service"  value={lead.service || "—"} />
            {lead.preferred_time && <Detail icon={Clock} label="Preferred time" value={lead.preferred_time} />}
            {lead.address         && <Detail icon={MapPin} label="Address" value={lead.address} />}
            {lead.notes && (
              <div className="pt-2 border-t border-white/10">
                <p className="text-xs text-white/40 mb-1">Notes</p>
                <p className="text-sm text-white/80">{lead.notes}</p>
              </div>
            )}
          </div>

          {/* Call history */}
          {lead.calls?.length > 0 && (
            <div>
              <p className="text-xs text-white/40 uppercase tracking-wide mb-2">Call History ({lead.calls.length})</p>
              <div className="space-y-3">
                {lead.calls
                  .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                  .map(call => (
                    <div key={call.id} className="bg-white/5 border border-white/10 rounded-xl p-4">
                      <div className="flex justify-between items-start mb-3 flex-wrap gap-2">
                        <div className="flex gap-2 flex-wrap">
                          <StatusPill status={call.status} />
                          {call.intent && <IntentPill intent={call.intent} />}
                          {call.sentiment && <p className={`text-xs font-semibold ${SENTIMENT_CONFIG[call.sentiment]?.color ?? ""}`}>{SENTIMENT_CONFIG[call.sentiment]?.label}</p>}
                        </div>
                        <p className="text-xs text-white/40">{formatDuration(call.duration_seconds)}</p>
                      </div>
                      {call.summary && (
                        <p className="text-sm text-white/70 mb-2 leading-relaxed">{call.summary}</p>
                      )}
                      {call.transcript && (
                        <details className="text-xs text-white/40">
                          <summary className="cursor-pointer hover:text-white/60 mb-1">View transcript</summary>
                          <pre className="whitespace-pre-wrap mt-2 leading-relaxed text-white/50 max-h-40 overflow-y-auto">{call.transcript}</pre>
                        </details>
                      )}
                      <p className="text-xs text-white/30 mt-2">{formatDate(call.created_at)}</p>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Detail({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-7 h-7 rounded-md bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon size={13} className="text-yellow-400"/>
      </div>
      <div>
        <p className="text-xs text-white/40">{label}</p>
        <p className="text-sm text-white font-medium">{value}</p>
      </div>
    </div>
  );
}

function StatusPill({ status }) {
  const cfg = STATUS_CONFIG[status] || {};
  return (
    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold border ${cfg.color}`}>
      {cfg.label ?? status}
    </span>
  );
}

function IntentPill({ intent }) {
  const colors = {
    booked:         "bg-green-500/10 text-green-300 border-green-500/20",
    callback:       "bg-blue-500/10 text-blue-300 border-blue-500/20",
    not_interested: "bg-red-500/10 text-red-300 border-red-500/20",
    no_answer:      "bg-gray-500/10 text-gray-300 border-gray-500/20",
  };
  return (
    <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold border capitalize ${colors[intent] ?? ""}`}>
      {intent?.replace("_", " ")}
    </span>
  );
}
