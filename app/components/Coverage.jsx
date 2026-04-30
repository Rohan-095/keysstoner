'use client';
import { useState } from "react";
import { MapPin, Star, Check, AlertCircle } from "lucide-react";
import Reveal from "./ui/Reveal";
import BgOrbs from "./ui/BgOrbs";
import GlowBtn from "./ui/GlowBtn";
import T from "../data/tokens";
import { fld } from "./ui/formStyles";
import coverage from "../data/coverage";
import reviews from "../data/reviews";

export default function Coverage() {
  const [areaSearch, setAreaSearch] = useState("");
  const [areaResult, setAreaResult] = useState(null);

  const checkArea = () => {
    const q = areaSearch.toLowerCase().trim();
    if (!q) return;
    const match = coverage.find(c => c.toLowerCase().includes(q));
    setAreaResult(match ? { found:true, city:match } : { found:false });
  };

  return (
    <section id="coverage" style={{ background:`linear-gradient(180deg,${T.navyMid} 0%,${T.navyDeep} 100%)`, padding:"6.5rem 1.5rem", position:"relative" }}>
      <BgOrbs/>
      <div style={{ maxWidth:1300, margin:"0 auto", position:"relative", zIndex:1 }}>
        <div className="two-col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.5rem" }}>

          {/* Coverage map card */}
          <Reveal>
            <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"1.45rem", padding:"1.95rem", height:"100%" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"0.82rem", marginBottom:"1.65rem" }}>
                <div style={{ width:46, height:46, borderRadius:"0.82rem", background:"rgba(230,168,23,0.09)", border:"1px solid rgba(230,168,23,0.18)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <MapPin size={21} style={{ color:T.gold }}/>
                </div>
                <div>
                  <p style={{ margin:0, color:T.navyMuted, fontSize:"0.74rem", textTransform:"uppercase", letterSpacing:"0.09em" }}>Service Area</p>
                  <h3 style={{ margin:0, color:"#fff", fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:"1.22rem" }}>Vancouver & Lower Mainland</h3>
                </div>
              </div>

              <div className="city-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"0.5rem", marginBottom:"1.15rem" }}>
                {coverage.map(city => (
                  <div
                    key={city}
                    className="city-pill"
                    onClick={() => { setAreaSearch(city); setAreaResult({ found:true, city }); }}
                    style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.09)", borderRadius:"0.65rem", padding:"0.62rem 0.5rem", textAlign:"center", color:T.navyMuted, fontSize:"0.81rem", cursor:"pointer", transition:"all .2s" }}
                  >
                    {city}
                  </div>
                ))}
              </div>

              <div style={{ display:"flex", gap:"0.65rem" }}>
                <input
                  value={areaSearch}
                  onChange={e => { setAreaSearch(e.target.value); setAreaResult(null); }}
                  onKeyDown={e => e.key === "Enter" && checkArea()}
                  placeholder="Type your city…"
                  style={fld}
                  onFocus={e => { e.target.style.borderColor="rgba(230,168,23,0.55)"; e.target.style.boxShadow=`0 0 0 3px ${T.goldFaint}`; }}
                  onBlur={e => { e.target.style.borderColor="rgba(255,255,255,0.14)"; e.target.style.boxShadow=""; }}
                />
                <GlowBtn gold onClick={checkArea} style={{ padding:"0 1.2rem", borderRadius:"0.78rem", whiteSpace:"nowrap", fontSize:"0.9rem" }}>Check</GlowBtn>
              </div>

              {areaResult && (
                <div style={{ marginTop:"0.9rem", padding:"0.92rem 1rem", borderRadius:"0.88rem", background:areaResult.found?"rgba(22,163,74,0.09)":"rgba(220,38,38,0.09)", border:`1px solid ${areaResult.found?"rgba(22,163,74,0.24)":"rgba(220,38,38,0.24)"}`, color:areaResult.found?"#4ade80":"#f87171", display:"flex", alignItems:"center", gap:"0.52rem", fontSize:"0.92rem", animation:"mfadeIn .28s ease" }}>
                  {areaResult.found ? <Check size={15}/> : <AlertCircle size={15}/>}
                  {areaResult.found ? `Great — we service ${areaResult.city}!` : "May still be covered — message us to confirm."}
                </div>
              )}
            </div>
          </Reveal>

          {/* Reviews preview card */}
          <Reveal delay={85}>
            <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"1.45rem", padding:"1.95rem", height:"100%" }}>
              <p style={{ margin:"0 0 0.42rem", fontSize:"0.74rem", textTransform:"uppercase", letterSpacing:"0.22em", color:T.gold, fontWeight:700 }}>Top Reviews</p>
              <h3 style={{ margin:"0 0 1.38rem", color:"#fff", fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:"1.22rem" }}>Why homeowners choose Keystone Cleaner</h3>
              <div style={{ display:"flex", flexDirection:"column", gap:"0.92rem" }}>
                {reviews.slice(0, 3).map((r, i) => (
                  <div key={i} style={{ background:"rgba(255,255,255,0.05)", borderRadius:"1rem", padding:"1.08rem", border:"1px solid rgba(255,255,255,0.07)" }}>
                    <div style={{ display:"flex", gap:2, marginBottom:"0.44rem" }}>
                      {Array.from({ length: r.stars }).map((_, idx) => <Star key={idx} size={12} style={{ color:T.gold, fill:T.gold }}/>)}
                    </div>
                    <p style={{ margin:"0 0 0.6rem", color:"rgba(255,255,255,0.72)", lineHeight:1.66, fontSize:"0.87rem" }}>&quot;{r.text}&quot;</p>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"0.4rem" }}>
                      <p style={{ margin:0, color:"#fff", fontWeight:700, fontSize:"0.83rem" }}>
                        {r.name} <span style={{ fontWeight:400, color:T.navyMuted }}>— {r.location}</span>
                      </p>
                      <span style={{ background:T.goldFaint, color:T.gold, borderRadius:"999px", padding:"0.18rem 0.66rem", fontSize:"0.73rem", fontWeight:700, border:"1px solid rgba(230,168,23,0.2)" }}>{r.service}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
