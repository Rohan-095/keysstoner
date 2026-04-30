'use client';
import { useState } from "react";
import { Phone, Clock3, MapPin, Mail, Check, Send, Loader2, AlertCircle } from "lucide-react";
import Reveal from "./ui/Reveal";
import BgOrbs from "./ui/BgOrbs";
import GlowBtn from "./ui/GlowBtn";
import T from "../data/tokens";
import { fld, selStyle, focusGold, blurGold } from "./ui/formStyles";
import { PHONE_DISPLAY, PHONE_RAW, BUSINESS_EMAIL, BUSINESS_ADDRESS } from "../data/config";
import services from "../data/services";
import coverage from "../data/coverage";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://keysstoner-production.up.railway.app/api";

function ContactForm() {
  const [form, setForm] = useState({ name:"", phone:"", email:"", service:"", city:"", message:"" });
  const [status, setStatus] = useState("idle");
  const set = (k, v) => setForm(f => ({ ...f, [k]:v }));
  const valid = form.name && form.phone && form.service && form.city;

  const submit = async (e) => {
    e.preventDefault();
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
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") return (
    <div style={{ background:"rgba(22,163,74,0.08)", border:"1px solid rgba(22,163,74,0.22)", borderRadius:"1.3rem", padding:"2.5rem", textAlign:"center" }}>
      <Check size={36} style={{ color:"#4ade80", marginBottom:"0.75rem" }}/>
      <h4 style={{ margin:"0 0 0.5rem", color:"#fff", fontWeight:800, fontSize:"1.1rem" }}>Thank you!</h4>
      <p style={{ margin:0, color:T.navyMuted, fontSize:"0.9rem", lineHeight:1.7 }}>
        We&apos;ll contact you within 24 hours.
      </p>
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
      <textarea rows={4} placeholder="Additional details (optional)" value={form.message} onChange={e => set("message", e.target.value)} style={{ ...fld, resize:"vertical" }} onFocus={focusGold} onBlur={blurGold}/>

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
      {!valid && <p style={{ margin:0, color:T.slateLight, fontSize:"0.78rem" }}><AlertCircle size={11} style={{ display:"inline", marginRight:4 }}/>Name, phone, service and city are required</p>}
    </form>
  );
}

const contactInfo = [
  { icon:Phone,  label:"Phone",         value:PHONE_DISPLAY,  href:`tel:${PHONE_RAW}` },
  { icon:Mail,   label:"Email",         value:BUSINESS_EMAIL, href:`mailto:${BUSINESS_EMAIL}` },
  { icon:Clock3, label:"Response Time", value:"Same day to 24 hours" },
  { icon:MapPin, label:"Address",        value:BUSINESS_ADDRESS },
];

export default function ContactSection() {
  return (
    <section id="contact" style={{ background:T.navyDeep, padding:"6.5rem 1.5rem", position:"relative" }}>
      <BgOrbs/>
      <div style={{ maxWidth:1300, margin:"0 auto", position:"relative", zIndex:1 }}>
        <div className="two-col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"5rem", alignItems:"start" }}>

          <Reveal from="left">
            <p style={{ margin:"0 0 0.55rem", fontSize:"0.74rem", textTransform:"uppercase", letterSpacing:"0.22em", color:T.gold, fontWeight:700 }}>Contact Us</p>
            <h2 style={{ margin:"0 0 1.1rem", fontFamily:"'Bricolage Grotesque',sans-serif", color:"#fff", fontWeight:800, fontSize:"clamp(2rem,3.3vw,2.9rem)", lineHeight:1.07, letterSpacing:"-0.028em" }}>
              Request your<br/>free quote
            </h2>
            <p style={{ margin:"0 0 2rem", color:T.navyMuted, lineHeight:1.82, maxWidth:395 }}>
              Fill the form and our team will reach out the same day to confirm your free quote.
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:"1.25rem" }}>
              {contactInfo.map(item => {
                const Icon = item.icon;
                return (
                  <div key={item.label} style={{ display:"flex", alignItems:"center", gap:"0.92rem" }}>
                    <div style={{ width:46, height:46, borderRadius:"0.82rem", background:"rgba(230,168,23,0.09)", border:"1px solid rgba(230,168,23,0.18)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <Icon size={19} style={{ color:T.gold }}/>
                    </div>
                    <div>
                      <p style={{ margin:0, fontSize:"0.72rem", color:T.navyMuted, textTransform:"uppercase", letterSpacing:"0.09em" }}>{item.label}</p>
                      {item.href
                        ? <a href={item.href} style={{ color:"#fff", fontWeight:700, fontSize:"0.96rem" }}>{item.value}</a>
                        : <p style={{ margin:0, color:"#fff", fontWeight:700, fontSize:"0.96rem" }}>{item.value}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={95}><ContactForm/></Reveal>
        </div>
      </div>
    </section>
  );
}
