'use client';
import { useState } from "react";
import { Send, Loader2, Check, AlertCircle, MessageCircle } from "lucide-react";
import GlowBtn from "./ui/GlowBtn";
import T from "../data/tokens";
import { fld, selStyle, focusGold, blurGold } from "./ui/formStyles";
import { buildWA } from "../data/config"; // used in the WhatsApp fallback link only
import services from "../data/services";
import coverage from "../data/coverage";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://keysstoner-production.up.railway.app/api";

export default function LeadCaptureForm({ prefill = "", onSuccess }) {
  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    service: prefill, city: "", address: "", notes: "", preferred_time: "",
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const valid = form.name && form.phone && form.service && form.city;

  const submit = async (e) => {
    e.preventDefault();
    if (!valid) return;
    setStatus("loading");

    try {
      const res = await fetch(`${API_URL}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Server error");

      const data = await res.json();
      setStatus("success");
      onSuccess?.(data);

    } catch {
      setStatus("error");
    }
  };

  if (status === "success") return (
    <div style={{ background:"rgba(22,163,74,0.08)", border:"1px solid rgba(22,163,74,0.22)", borderRadius:"1.3rem", padding:"2.5rem", textAlign:"center" }}>
      <Check size={36} style={{ color:"#4ade80", marginBottom:"0.75rem" }}/>
      <h4 style={{ margin:"0 0 0.35rem", color:"#fff", fontWeight:800, fontSize:"1.1rem" }}>Thank you!</h4>
      <p style={{ margin:"0 0 1.2rem", color:T.navyMuted, fontSize:"0.9rem", lineHeight:1.7 }}>
        We&apos;ll contact you within 24 hours.
      </p>
      <GlowBtn gold onClick={() => setStatus("idle")} style={{ fontSize:"0.88rem", padding:"0.68rem 1.2rem" }}>
        Submit another
      </GlowBtn>
    </div>
  );

  return (
    <form onSubmit={submit} style={{ display:"flex", flexDirection:"column", gap:"0.8rem", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"1.4rem", padding:"1.85rem", backdropFilter:"blur(8px)" }}>
      <div className="form-name-row" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.8rem" }}>
        {[["text","Full Name *","name"],["tel","Phone *","phone"]].map(([t,p,k]) => (
          <input key={k} type={t} placeholder={p} value={form[k]} onChange={e => set(k, e.target.value)} style={fld} onFocus={focusGold} onBlur={blurGold}/>
        ))}
      </div>

      <input type="email" placeholder="Email (optional)" value={form.email} onChange={e => set("email", e.target.value)} style={fld} onFocus={focusGold} onBlur={blurGold}/>

      <select value={form.service} onChange={e => set("service", e.target.value)} style={selStyle(form.service)}>
        <option value="">Service needed *</option>
        {services.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
        <option value="Multiple Services">Multiple Services</option>
      </select>

      <select value={form.city} onChange={e => set("city", e.target.value)} style={selStyle(form.city)}>
        <option value="">Your city *</option>
        {coverage.map(c => <option key={c} value={c}>{c}</option>)}
        <option value="Other">Other</option>
      </select>

      <input type="text" placeholder="Address (optional)" value={form.address} onChange={e => set("address", e.target.value)} style={fld} onFocus={focusGold} onBlur={blurGold}/>

      <select value={form.preferred_time} onChange={e => set("preferred_time", e.target.value)} style={selStyle(form.preferred_time)}>
        <option value="">Preferred call time (optional)</option>
        <option value="Morning (8am–12pm)">Morning (8am–12pm)</option>
        <option value="Afternoon (12pm–4pm)">Afternoon (12pm–4pm)</option>
        <option value="Evening (4pm–7pm)">Evening (4pm–7pm)</option>
      </select>

      <textarea rows={3} placeholder="Anything else? (optional)" value={form.notes} onChange={e => set("notes", e.target.value)} style={{ ...fld, resize:"vertical" }} onFocus={focusGold} onBlur={blurGold}/>

      {status === "error" && (
        <p style={{ margin:0, color:"#f87171", fontSize:"0.82rem", display:"flex", alignItems:"center", gap:6 }}>
          <AlertCircle size={13}/> Something went wrong. Please call us directly.
        </p>
      )}

      <GlowBtn gold style={{ width:"100%" }} disabled={!valid || status === "loading"} onClick={() => {}}>
        {status === "loading"
          ? <><Loader2 size={16} style={{ animation:"spin 1s linear infinite" }}/>Submitting…</>
          : <><Send size={15}/>Request Free Quote</>}
      </GlowBtn>

      {!valid && (
        <p style={{ margin:0, color:T.slateLight, fontSize:"0.78rem" }}>
          <AlertCircle size={11} style={{ display:"inline", marginRight:4 }}/>Name, phone, service and city are required
        </p>
      )}

      <p style={{ margin:0, textAlign:"center", fontSize:"0.75rem", color:T.navyMuted }}>
        We&apos;ll call you within minutes. You can also{" "}
        <a href={buildWA("Hi Keystone Cleaner, I'd like to get a free quote")} target="_blank" rel="noopener noreferrer" style={{ color:T.gold, fontWeight:600 }}>
          message us on WhatsApp
        </a>.
      </p>
    </form>
  );
}
