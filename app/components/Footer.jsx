'use client';
import { Sparkles } from "lucide-react";
import GlowBtn from "./ui/GlowBtn";
import T from "../data/tokens";
import { PHONE_DISPLAY, PHONE_RAW } from "../data/config";
import services from "../data/services";
import coverage from "../data/coverage";

export default function Footer({ openQuote, openService }) {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior:"smooth", block:"start" });

  return (
    <footer style={{ background:"rgba(3,8,20,0.99)", color:"rgba(255,255,255,0.48)", borderTop:"1px solid rgba(255,255,255,0.07)" }}>
      <div className="footer-grid" style={{ maxWidth:1300, margin:"0 auto", padding:"3.8rem 1.5rem 2.2rem", display:"grid", gridTemplateColumns:"1.65fr 1fr 1fr 1fr", gap:"2.5rem" }}>

        <div>
          <div style={{ display:"flex", alignItems:"center", gap:"0.78rem", marginBottom:"1.12rem" }}>
            <div style={{ width:42, height:42, borderRadius:"0.75rem", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(230,168,23,0.26)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Sparkles size={17} style={{ color:T.gold }}/>
            </div>
            <span style={{ color:"#fff", fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:"1.04rem", letterSpacing:"-0.022em" }}>KeystoneCleaner</span>
          </div>
          <p style={{ margin:"0 0 1.12rem", lineHeight:1.75, maxWidth:265, fontSize:"0.87rem" }}>
            Professional exterior cleaning across Vancouver and the Lower Mainland.
          </p>
          <a href={`tel:${PHONE_RAW}`} style={{ color:T.gold, fontWeight:700, fontSize:"0.9rem" }}>{PHONE_DISPLAY}</a>
        </div>

        <div>
          <p style={{ margin:"0 0 0.92rem", color:"rgba(255,255,255,0.82)", fontWeight:700, fontSize:"0.87rem" }}>Services</p>
          {services.map(s => (
            <button key={s.title} onClick={() => openService(s)} style={{ display:"block", background:"none", border:"none", padding:"0.32rem 0", color:"rgba(255,255,255,0.46)", cursor:"pointer", fontSize:"0.85rem", textAlign:"left", transition:"color .18s" }}
              onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.88)"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.46)"}
            >{s.title}</button>
          ))}
        </div>

        <div>
          <p style={{ margin:"0 0 0.92rem", color:"rgba(255,255,255,0.82)", fontWeight:700, fontSize:"0.87rem" }}>Pages</p>
          {[["Why Us","why-us"],["Results","results"],["Reviews","reviews"],["FAQ","faq"],["Contact","contact"]].map(([l,id]) => (
            <button key={id} onClick={() => scrollTo(id)} style={{ display:"block", background:"none", border:"none", padding:"0.32rem 0", color:"rgba(255,255,255,0.46)", cursor:"pointer", fontSize:"0.85rem", textAlign:"left", transition:"color .18s" }}
              onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,0.88)"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.46)"}
            >{l}</button>
          ))}
        </div>

        <div>
          <p style={{ margin:"0 0 0.92rem", color:"rgba(255,255,255,0.82)", fontWeight:700, fontSize:"0.87rem" }}>Areas</p>
          {coverage.slice(0, 6).map(c => <p key={c} style={{ margin:"0.32rem 0", fontSize:"0.85rem" }}>{c}</p>)}
        </div>
      </div>

      <div style={{ borderTop:"1px solid rgba(255,255,255,0.07)", maxWidth:1300, margin:"0 auto", padding:"1.3rem 1.5rem", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"0.8rem" }}>
        <p style={{ margin:0, fontSize:"0.78rem" }}>© 2025 KeystoneCleaner. All rights reserved.</p>
        <GlowBtn gold onClick={() => openQuote()} style={{ padding:"0.62rem 1.18rem", fontSize:"0.85rem", borderRadius:"0.7rem" }}>Get Free Quote</GlowBtn>
      </div>
    </footer>
  );
}
