'use client';
import { useState } from "react";
import { Star, Check, Send, Loader2, AlertCircle } from "lucide-react";
import Modal from "./ui/Modal";
import GlowBtn from "./ui/GlowBtn";
import T from "../data/tokens";
import { fld, selStyle, focusGold, blurGold } from "./ui/formStyles";
import { buildWA } from "../data/config";
import services from "../data/services";
import coverage from "../data/coverage";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://keysstoner-production.up.railway.app/api";

export default function QuoteModal({ open, onClose, prefill = "" }) {
  const [form, setForm]     = useState({ name:"", phone:"", email:"", service:prefill, city:"", message:"" });
  const [status, setStatus] = useState("idle");
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const valid = form.name && form.phone && form.service && form.city;

  const submit = async () => {
    if (!valid) return;
    setStatus("loading");
    try {
      const res = await fetch(`${API_URL}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:    form.name,
          phone:   form.phone,
          email:   form.email,
          service: form.service,
          city:    form.city,
          notes:   form.message,
        }),
      });
      if (!res.ok) throw new Error();
      const waMsg = `Hi Keystone Cleaner, I'd like to get a free quote. My name is ${form.name}, I need ${form.service} in ${form.city}.`;
      window.open(buildWA(waMsg), "_blank", "noopener,noreferrer");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ padding:"2rem" }}>
        {status === "success" ? (
          <div style={{ textAlign:"center", padding:"1.5rem 0" }}>
            <div style={{ width:68, height:68, borderRadius:"50%", background:"rgba(22,163,74,0.15)", border:"1px solid rgba(22,163,74,0.3)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 1.1rem" }}>
              <Check size={30} style={{ color:"#4ade80" }}/>
            </div>
            <h3 style={{ margin:"0 0 0.5rem", color:"#fff", fontFamily:"'Bricolage Grotesque',sans-serif", fontSize:"1.35rem", fontWeight:800 }}>Request received!</h3>
            <p style={{ margin:"0 0 1.5rem", color:T.navyMuted, lineHeight:1.7 }}>
              We&apos;ll be in touch within 24 hours!
            </p>
            <GlowBtn gold onClick={onClose}>Done</GlowBtn>
          </div>
        ) : (
          <>
            <div style={{ marginBottom:"1.4rem" }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:"0.4rem", background:T.goldFaint, border:"1px solid rgba(230,168,23,0.25)", borderRadius:"999px", padding:"0.35rem 0.85rem", marginBottom:"0.9rem" }}>
                <Star size={12} style={{ color:T.gold, fill:T.gold }}/>
                <span style={{ color:T.gold, fontSize:"0.78rem", fontWeight:700 }}>Free Quote — No Obligation</span>
              </div>
              <h3 style={{ margin:"0 0 0.3rem", color:"#fff", fontFamily:"'Bricolage Grotesque',sans-serif", fontSize:"1.4rem", fontWeight:800 }}>Get your free quote</h3>
              <p style={{ margin:0, color:T.navyMuted, fontSize:"0.88rem" }}>Fill in your details and we&apos;ll be in touch shortly.</p>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:"0.7rem" }}>
              {[["text","Full Name *","name"],["tel","Phone Number *","phone"],["email","Email (optional)","email"]].map(([type,ph,k]) => (
                <input key={k} type={type} placeholder={ph} value={form[k]} onChange={e => set(k, e.target.value)} style={fld} onFocus={focusGold} onBlur={blurGold}/>
              ))}
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
              <textarea rows={3} placeholder="Anything else?" value={form.message} onChange={e => set("message", e.target.value)} style={{ ...fld, resize:"vertical" }} onFocus={focusGold} onBlur={blurGold}/>

              {status === "error" && (
                <p style={{ margin:0, color:"#f87171", fontSize:"0.82rem", display:"flex", alignItems:"center", gap:6 }}>
                  <AlertCircle size={13}/> Something went wrong. Please call us directly.
                </p>
              )}

              <GlowBtn gold onClick={submit} disabled={!valid || status === "loading"} style={{ width:"100%" }}>
                {status === "loading"
                  ? <><Loader2 size={16} style={{ animation:"spin 1s linear infinite" }}/>Submitting…</>
                  : <><Send size={16}/>Request Free Quote</>}
              </GlowBtn>
              {!valid && <p style={{ margin:0, color:T.slateLight, fontSize:"0.78rem" }}><AlertCircle size={11} style={{ display:"inline", marginRight:4 }}/>Name, phone, service and city are required</p>}
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
