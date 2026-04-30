'use client';
import { useState } from "react";
import { Star } from "lucide-react";
import Reveal from "./ui/Reveal";
import BgOrbs from "./ui/BgOrbs";
import T from "../data/tokens";
import reviews from "../data/reviews";

function ReviewCard({ r, delay = 0 }) {
  const [hov, setHov] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          background: "rgba(255,255,255,0.04)",
          border: hov ? "1px solid rgba(230,168,23,0.22)" : "1px solid rgba(255,255,255,0.09)",
          borderRadius: "1.2rem", padding: "1.52rem", height: "100%",
          transform: hov ? "translateY(-5px)" : "none",
          boxShadow: hov ? "0 24px 60px rgba(0,0,0,0.3)" : "0 4px 20px rgba(0,0,0,0.12)",
          transition: "transform .3s cubic-bezier(.22,.68,0,1.2), box-shadow .3s, border-color .3s",
        }}
      >
        <div style={{ display:"flex", gap:2, marginBottom:"0.75rem" }}>
          {Array.from({ length: r.stars }).map((_, i) => <Star key={i} size={13} style={{ color:T.gold, fill:T.gold }}/>)}
        </div>
        <p style={{ margin:"0 0 1rem", color:"rgba(255,255,255,0.7)", lineHeight:1.74, fontSize:"0.92rem" }}>&quot;{r.text}&quot;</p>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"0.5rem" }}>
          <p style={{ margin:0, fontWeight:700, fontSize:"0.84rem", color:"#fff" }}>
            {r.name} <span style={{ fontWeight:400, color:T.navyMuted }}>— {r.location}</span>
          </p>
          <span style={{ background:T.goldFaint, color:T.gold, borderRadius:"999px", padding:"0.2rem 0.66rem", fontSize:"0.73rem", fontWeight:700, border:"1px solid rgba(230,168,23,0.18)" }}>
            {r.service}
          </span>
        </div>
      </div>
    </Reveal>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" style={{ background:T.navyDeep, padding:"6.5rem 1.5rem", position:"relative" }}>
      <BgOrbs/>
      <div style={{ maxWidth:1300, margin:"0 auto", position:"relative", zIndex:1 }}>
        <Reveal>
          <div style={{ textAlign:"center", marginBottom:"3rem" }}>
            <p style={{ margin:"0 0 0.55rem", fontSize:"0.74rem", textTransform:"uppercase", letterSpacing:"0.22em", color:T.gold, fontWeight:700 }}>All Reviews</p>
            <h2 style={{ margin:"0 0 0.82rem", fontFamily:"'Bricolage Grotesque',sans-serif", color:"#fff", fontWeight:800, fontSize:"clamp(2rem,3.8vw,3rem)", letterSpacing:"-0.028em" }}>
              What customers are saying
            </h2>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"0.32rem" }}>
              {Array.from({ length:5 }).map((_,i) => <Star key={i} size={18} style={{ color:T.gold, fill:T.gold }}/>)}
              <span style={{ color:T.navyMuted, marginLeft:"0.46rem", fontSize:"0.88rem" }}>5.0 average · 100+ reviews</span>
            </div>
          </div>
        </Reveal>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"1.15rem" }}>
          {reviews.map((r, i) => <ReviewCard key={i} r={r} delay={i * 68}/>)}
        </div>
      </div>
    </section>
  );
}
