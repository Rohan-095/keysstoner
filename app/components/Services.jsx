'use client';
import { useState } from "react";
import { Clock3, ChevronRight } from "lucide-react";
import Reveal from "./ui/Reveal";
import BgOrbs from "./ui/BgOrbs";
import T from "../data/tokens";
import services from "../data/services";

function ServiceCard({ svc, onOpen, delay = 0 }) {
  const Icon = svc.icon;
  const [hov, setHov] = useState(false);
  return (
    <Reveal delay={delay}>
      <div onClick={() => onOpen(svc)} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{ background:"rgba(255,255,255,0.04)", borderRadius:"1.35rem", overflow:"hidden", border: hov ? "1px solid rgba(230,168,23,0.25)" : "1px solid rgba(255,255,255,0.09)", boxShadow: hov ? "0 36px 80px rgba(0,0,0,0.42),0 0 0 1px rgba(230,168,23,0.12)" : "0 8px 32px rgba(0,0,0,0.22)", height:"100%", display:"flex", flexDirection:"column", position:"relative", cursor:"pointer", transform: hov ? "translateY(-8px)" : "none", transition:"transform .3s cubic-bezier(.22,.68,0,1.2), box-shadow .3s ease, border-color .3s" }}>
        {svc.popular && (
          <div style={{ position:"absolute", top:14, right:14, zIndex:3, background:T.gradGold, color:T.navy, borderRadius:"999px", padding:"0.3rem 0.78rem", fontSize:"0.74rem", fontWeight:800, boxShadow:"0 4px 18px rgba(230,168,23,0.45)", animation:"floatY 3s ease-in-out infinite" }}>⚡ Most Popular</div>
        )}
        <div style={{ height:198, overflow:"hidden", position:"relative" }}>
          <img src={svc.image} alt={svc.title} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transform: hov ? "scale(1.09)" : "scale(1.01)", transition:"transform .55s cubic-bezier(.22,.68,0,1.2)" }}/>
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(9,20,40,0.88) 0%,transparent 58%)" }}/>
        </div>
        <div style={{ padding:"1.28rem", flex:1, display:"flex", flexDirection:"column" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"0.65rem", marginBottom:"0.75rem" }}>
            <div style={{ width:37, height:37, borderRadius:"0.65rem", background: hov ? "rgba(230,168,23,0.15)" : "rgba(230,168,23,0.08)", border: hov ? "1px solid rgba(230,168,23,0.3)" : "1px solid rgba(230,168,23,0.15)", display:"flex", alignItems:"center", justifyContent:"center", transition:"background .25s, border-color .25s, transform .25s", transform: hov ? "scale(1.1) rotate(4deg)" : "none" }}>
              <Icon size={17} style={{ color:T.gold }}/>
            </div>
            <h3 style={{ margin:0, color:"#fff", fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:"1.04rem" }}>{svc.title}</h3>
          </div>
          <p style={{ margin:"0 0 1rem", color:T.navyMuted, lineHeight:1.68, fontSize:"0.88rem", flex:1 }}>{svc.short}</p>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"0.5rem" }}>
            <span style={{ display:"flex", alignItems:"center", gap:"0.32rem", color:T.gold, fontWeight:700, fontSize:"0.87rem", transform: hov ? "translateX(3px)" : "none", transition:"transform .22s" }}>View details <ChevronRight size={13}/></span>
            <span style={{ color:T.navyMuted, fontSize:"0.77rem" }}><Clock3 size={11} style={{ display:"inline", marginRight:3 }}/>{svc.duration}</span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Services({ onOpenService }) {
  return (
    <section id="services" style={{ background:T.navyDeep, padding:"6.5rem 1.5rem", position:"relative" }}>
      <BgOrbs/>
      <div style={{ maxWidth:1300, margin:"0 auto", position:"relative", zIndex:1 }}>
        <Reveal>
          <div style={{ textAlign:"center", marginBottom:"3.4rem" }}>
            <p style={{ margin:"0 0 0.55rem", fontSize:"0.74rem", textTransform:"uppercase", letterSpacing:"0.22em", color:T.gold, fontWeight:700 }}>Our Services</p>
            <h2 style={{ margin:"0 0 0.82rem", fontFamily:"'Bricolage Grotesque',sans-serif", color:"#fff", fontWeight:800, fontSize:"clamp(2rem,3.8vw,3rem)", letterSpacing:"-0.028em" }}>Everything your exterior needs</h2>
            <p style={{ margin:"0 auto", color:T.navyMuted, maxWidth:520, lineHeight:1.76 }}>Click any service to see what&apos;s included, starting price and how to get booked.</p>
          </div>
        </Reveal>
        <div className="svc-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1.3rem" }}>
          {services.map((svc, i) => <ServiceCard key={svc.title} svc={svc} onOpen={onOpenService} delay={i * 70}/>)}
        </div>
      </div>
    </section>
  );
}
