'use client';
import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import Reveal from "./ui/Reveal";
import BgOrbs from "./ui/BgOrbs";
import GlowBtn from "./ui/GlowBtn";
import T from "../data/tokens";
import faqs from "../data/faqs";
import { buildWA, WA_DEFAULT_MSG } from "../data/config";

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width:"100%", background:"none", border:"none", padding:"1.28rem 0", display:"flex", justifyContent:"space-between", alignItems:"center", gap:"1rem", cursor:"pointer", textAlign:"left" }}
      >
        <span style={{ color:"#fff", fontWeight:700, fontSize:"0.98rem", lineHeight:1.45 }}>{q}</span>
        <div style={{
          width:30, height:30, borderRadius:"50%",
          background: open ? T.gradGold : "rgba(255,255,255,0.07)",
          border: open ? "none" : "1px solid rgba(255,255,255,0.12)",
          display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
          transition:"background .28s, transform .32s",
          transform: open ? "rotate(180deg)" : "none",
        }}>
          <ChevronDown size={15} style={{ color: open ? T.navy : T.gold }}/>
        </div>
      </button>
      <div style={{ maxHeight: open ? "320px" : "0", overflow:"hidden", transition:"max-height .38s cubic-bezier(.22,.68,0,1.15)" }}>
        <p style={{ margin:"0 0 1.3rem", color:T.navyMuted, lineHeight:1.84, fontSize:"0.94rem", paddingRight:"2rem" }}>{a}</p>
      </div>
    </div>
  );
}

export default function FAQ({ openQuote }) {
  return (
    <section id="faq" style={{ background:`linear-gradient(180deg,${T.navyMid} 0%,${T.navyDeep} 100%)`, padding:"6.5rem 1.5rem", position:"relative" }}>
      <BgOrbs/>
      <div style={{ maxWidth:820, margin:"0 auto", position:"relative", zIndex:1 }}>
        <Reveal>
          <div style={{ textAlign:"center", marginBottom:"2.8rem" }}>
            <p style={{ margin:"0 0 0.55rem", fontSize:"0.74rem", textTransform:"uppercase", letterSpacing:"0.22em", color:T.gold, fontWeight:700 }}>FAQ</p>
            <h2 style={{ margin:0, fontFamily:"'Bricolage Grotesque',sans-serif", color:"#fff", fontWeight:800, fontSize:"clamp(2rem,3.8vw,3rem)", letterSpacing:"-0.028em" }}>
              Common questions
            </h2>
          </div>
        </Reveal>
        <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"1.45rem", padding:"0.4rem 1.65rem" }}>
          {faqs.map((f, i) => (
            <Reveal key={i} delay={i * 58}><FAQItem q={f.q} a={f.a}/></Reveal>
          ))}
        </div>
        <Reveal delay={210}>
          <div style={{ textAlign:"center", marginTop:"2.5rem" }}>
            <p style={{ color:T.navyMuted, marginBottom:"1.1rem" }}>Still have questions?</p>
            <div style={{ display:"flex", gap:"0.82rem", justifyContent:"center", flexWrap:"wrap" }}>
              <GlowBtn gold onClick={() => openQuote()}>Get a Free Quote</GlowBtn>
              <GlowBtn wa href={buildWA(WA_DEFAULT_MSG)} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={15}/> WhatsApp Us
              </GlowBtn>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
