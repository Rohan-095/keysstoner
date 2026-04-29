'use client';
import { ArrowRight, MessageCircle, BadgeCheck, Zap, ThumbsUp, ShieldCheck, MapPin, Award } from "lucide-react";
import Reveal from "./ui/Reveal";
import BgOrbs from "./ui/BgOrbs";
import GlowBtn from "./ui/GlowBtn";
import T from "../data/tokens";
import { buildWA, WA_DEFAULT_MSG } from "../data/config";

const trustPoints = [
  { icon:BadgeCheck,  title:"No-pressure quotes",  body:"Clear guidance with no confusing sales tactics." },
  { icon:Zap,         title:"Same-day response",    body:"Most requests answered within hours — often same day." },
  { icon:ThumbsUp,    title:"Proven clean results", body:"Care, attention and thorough finish on every job." },
  { icon:ShieldCheck, title:"Safe methods",         body:"Soft-wash techniques protect your surfaces." },
  { icon:MapPin,      title:"Local team",           body:"A local Lower Mainland crew — not a franchise." },
  { icon:Award,       title:"5-star track record",  body:"Hundreds of satisfied homeowners across BC." },
];

export default function WhyUs({ openQuote }) {
  return (
    <section id="why-us" style={{ background:T.navyDeep, padding:"6.5rem 1.5rem", position:"relative" }}>
      <BgOrbs/>
      <div style={{ maxWidth:1300, margin:"0 auto", position:"relative", zIndex:1 }}>
        <div className="two-col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"5rem", alignItems:"center" }}>

          <Reveal from="left">
            <p style={{ margin:"0 0 0.55rem", fontSize:"0.74rem", textTransform:"uppercase", letterSpacing:"0.22em", color:T.gold, fontWeight:700 }}>Why KeystoneCleaner</p>
            <h2 style={{ margin:"0 0 1.1rem", fontFamily:"'Bricolage Grotesque',sans-serif", color:"#fff", fontWeight:800, fontSize:"clamp(2rem,3.5vw,2.9rem)", lineHeight:1.07, letterSpacing:"-0.028em" }}>
              Professional service.<br/>No surprises.
            </h2>
            <p style={{ margin:"0 0 2rem", color:T.navyMuted, lineHeight:1.82, maxWidth:430 }}>
              Honest communication, fast quotes, safe cleaning methods and a clean finish every time. No contracts, no pressure, no hidden fees.
            </p>
            <div className="cta-row" style={{ display:"flex", gap:"0.85rem", flexWrap:"wrap" }}>
              <GlowBtn gold onClick={() => openQuote()}>Get Free Quote <ArrowRight size={15}/></GlowBtn>
              <GlowBtn wa href={buildWA(WA_DEFAULT_MSG)} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={15}/> WhatsApp
              </GlowBtn>
            </div>
          </Reveal>

          <div className="trust-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
            {trustPoints.map((tp, i) => {
              const Icon = tp.icon;
              return (
                <Reveal key={tp.title} delay={i * 65}>
                  <div
                    style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.09)", borderRadius:"1.1rem", padding:"1.28rem", transition:"border-color .25s, background .25s, transform .25s" }}
                    onMouseEnter={e => { e.currentTarget.style.background="rgba(230,168,23,0.05)"; e.currentTarget.style.borderColor="rgba(230,168,23,0.22)"; e.currentTarget.style.transform="translateY(-4px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.09)"; e.currentTarget.style.transform=""; }}
                  >
                    <div style={{ width:40, height:40, borderRadius:"0.72rem", background:"rgba(230,168,23,0.09)", border:"1px solid rgba(230,168,23,0.18)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"0.88rem" }}>
                      <Icon size={18} style={{ color:T.gold }}/>
                    </div>
                    <p style={{ margin:"0 0 0.3rem", color:"#fff", fontWeight:700, fontSize:"0.92rem" }}>{tp.title}</p>
                    <p style={{ margin:0, color:T.navyMuted, lineHeight:1.66, fontSize:"0.83rem" }}>{tp.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
