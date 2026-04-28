'use client';
import { ArrowRight, Phone } from "lucide-react";
import Reveal from "./ui/Reveal";
import T from "../data/tokens";
import { PHONE_DISPLAY, PHONE_RAW } from "../data/config";

export default function CTABanner({ openQuote }) {
  return (
    <section style={{ background:T.gradGold, backgroundSize:"200% 200%", animation:"gradShift 8s ease infinite", padding:"4.8rem 1.5rem", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(ellipse 55% 75% at 88% 50%,rgba(255,255,255,0.14) 0%,transparent 60%)", pointerEvents:"none" }}/>
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(ellipse 35% 50% at 12% 50%,rgba(255,255,255,0.07) 0%,transparent 55%)", pointerEvents:"none" }}/>
      <div style={{ maxWidth:1100, margin:"0 auto", position:"relative" }}>
        <Reveal>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:"2rem", flexWrap:"wrap" }}>
            <div>
              <h2 style={{ margin:"0 0 0.55rem", fontFamily:"'Bricolage Grotesque',sans-serif", color:T.navy, fontWeight:800, fontSize:"clamp(1.85rem,3.2vw,2.65rem)", letterSpacing:"-0.025em" }}>
                Ready to clean up your property?
              </h2>
              <p style={{ margin:0, color:"rgba(10,22,40,0.64)", fontSize:"1.02rem" }}>Free quote in under 24 hours. No pressure, no obligation.</p>
            </div>
            <div className="cta-row" style={{ display:"flex", gap:"0.82rem", flexWrap:"wrap" }}>
              <button
                onClick={() => openQuote()}
                style={{ background:T.navy, color:"#fff", border:"none", borderRadius:"0.9rem", padding:"1.05rem 1.72rem", fontWeight:800, cursor:"pointer", display:"flex", alignItems:"center", gap:"0.5rem", fontSize:"1rem", fontFamily:"inherit", transition:"transform .22s, box-shadow .22s", boxShadow:"0 8px 26px rgba(9,20,40,0.3)" }}
                onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 18px 44px rgba(9,20,40,0.45)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow="0 8px 26px rgba(9,20,40,0.3)"; }}
              >
                Get Free Quote <ArrowRight size={16}/>
              </button>
              <a
                href={`tel:${PHONE_RAW}`}
                style={{ display:"flex", alignItems:"center", gap:"0.5rem", background:"rgba(9,20,40,0.1)", color:T.navy, border:"1px solid rgba(9,20,40,0.18)", borderRadius:"0.9rem", padding:"1.05rem 1.5rem", fontWeight:700, fontSize:"0.97rem", transition:"background .2s" }}
              >
                <Phone size={15}/> {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
