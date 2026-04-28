'use client';
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Reveal from "./ui/Reveal";
import BgOrbs from "./ui/BgOrbs";
import GlowBtn from "./ui/GlowBtn";
import T from "../data/tokens";
import beforeAfter from "../data/beforeAfter";

function ResultCard({ item, delay = 0 }) {
  const [hov, setHov] = useState(false);
  return (
    <Reveal delay={delay}>
      <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{ borderRadius:"1.35rem", overflow:"hidden", border: hov ? "1px solid rgba(230,168,23,0.2)" : "1px solid rgba(255,255,255,0.09)", boxShadow: hov ? "0 32px 72px rgba(0,0,0,0.42)" : "0 18px 52px rgba(0,0,0,0.28)", transform: hov ? "translateY(-6px)" : "none", transition:"transform .3s cubic-bezier(.22,.68,0,1.2), box-shadow .3s, border-color .3s", cursor:"pointer" }}>
        <div style={{ position:"relative", overflow:"hidden" }}>
          <img className="result-img" src={item.image} alt={item.title} style={{ width:"100%", height:310, objectFit:"cover", display:"block", transform: hov ? "scale(1.07)" : "scale(1.01)", transition:"transform .55s cubic-bezier(.22,.68,0,1.2)" }}/>
          <div style={{ position:"absolute", inset:0, background: hov ? "linear-gradient(135deg,rgba(230,168,23,0.08) 0%,transparent 60%,rgba(42,74,130,0.15) 100%)" : "transparent", transition:"background .4s ease" }}/>
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(9,20,40,0.88) 0%,transparent 55%)" }}/>
          <div style={{ position:"absolute", bottom:16, left:16, right:16, display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:"0.5rem" }}>
            <p style={{ margin:0, color:"#fff", fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:700, fontSize:"1.06rem", transform: hov ? "translateY(-2px)" : "none", transition:"transform .22s" }}>{item.title}</p>
            <span style={{ background:T.gradGold, color:T.navy, borderRadius:"999px", padding:"0.3rem 0.82rem", fontSize:"0.78rem", fontWeight:800 }}>{item.tag}</span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Results({ openQuote }) {
  return (
    <section id="results" style={{ background:`linear-gradient(180deg,#18345f 0%,#091428 100%)`, padding:"6.5rem 1.5rem", position:"relative" }}>
      <BgOrbs/>
      <div style={{ maxWidth:1300, margin:"0 auto", position:"relative", zIndex:1 }}>
        <Reveal>
          <div style={{ textAlign:"center", marginBottom:"3.2rem" }}>
            <p style={{ margin:"0 0 0.55rem", fontSize:"0.74rem", textTransform:"uppercase", letterSpacing:"0.22em", color:T.gold, fontWeight:700 }}>Real Work</p>
            <h2 style={{ margin:"0 0 0.82rem", fontFamily:"'Bricolage Grotesque',sans-serif", color:"#fff", fontWeight:800, fontSize:"clamp(2rem,3.8vw,3rem)", letterSpacing:"-0.028em" }}>Results that speak for themselves</h2>
            <p style={{ margin:"0 auto", color:T.navyMuted, maxWidth:520, lineHeight:1.76 }}>Every job is treated with care and attention to detail — here's what that looks like on site.</p>
          </div>
        </Reveal>
        <div className="results-grid" style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"1.2rem" }}>
          {beforeAfter.map((item, i) => <ResultCard key={item.title} item={item} delay={i * 75}/>)}
        </div>
        <Reveal delay={220}>
          <div style={{ textAlign:"center", marginTop:"3rem" }}>
            <GlowBtn gold onClick={() => openQuote()}>Get My Free Quote <ArrowRight size={16}/></GlowBtn>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
