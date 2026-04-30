'use client';
import { useState } from "react";
import { Calculator, ArrowRight } from "lucide-react";
import Reveal from "./ui/Reveal";
import BgOrbs from "./ui/BgOrbs";
import GlowBtn from "./ui/GlowBtn";
import T from "../data/tokens";
import { fld, selStyle, focusGold, blurGold } from "./ui/formStyles";

const ESTIMATES = {
  "Roof Wash":             { min: 299, max: 599 },
  "Gutter Cleaning":       { min: 149, max: 299 },
  "Pressure Washing":      { min: 199, max: 449 },
  "Window Cleaning":       { min: 179, max: 349 },
  "Full Exterior Package": { min: 599, max: 999 },
};

const BASE = 1800;

function calcRange(service, sqft) {
  const p = ESTIMATES[service];
  if (!p) return null;
  const s = Math.max(600, Math.min(6000, parseInt(sqft) || BASE));
  const ratio = Math.max(0.65, Math.min(1.8, s / BASE));
  return {
    min: Math.round((p.min * ratio) / 5) * 5,
    max: Math.round((p.max * ratio) / 5) * 5,
  };
}

export default function InstantEstimate({ openQuote }) {
  const [service, setService] = useState("");
  const [sqft,    setSqft]    = useState("");
  const estimate = service ? calcRange(service, sqft) : null;

  return (
    <section id="estimate" style={{ background:`linear-gradient(180deg,${T.navyMid} 0%,${T.navyDeep} 100%)`, padding:"6.5rem 1.5rem", position:"relative" }}>
      <BgOrbs/>
      <div style={{ maxWidth:1300, margin:"0 auto", position:"relative", zIndex:1 }}>

        <Reveal>
          <div style={{ textAlign:"center", marginBottom:"3rem" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem", background:"rgba(230,168,23,0.1)", border:"1px solid rgba(230,168,23,0.3)", borderRadius:"999px", padding:"0.42rem 1rem", marginBottom:"1rem" }}>
              <Calculator size={13} style={{ color:T.gold }}/>
              <span style={{ color:T.goldLight, fontSize:"0.82rem", fontWeight:700, letterSpacing:"0.05em" }}>Instant Estimate</span>
            </div>
            <h2 style={{ margin:"0 0 0.8rem", fontFamily:"'Bricolage Grotesque',sans-serif", color:"#fff", fontWeight:800, fontSize:"clamp(1.8rem,3vw,2.6rem)", letterSpacing:"-0.028em" }}>
              Get your price range instantly
            </h2>
            <p style={{ margin:"0 auto", color:T.navyMuted, maxWidth:500, lineHeight:1.7 }}>
              Select your service and approximate home size — we&apos;ll show you an estimated range.
            </p>
          </div>
        </Reveal>

        <Reveal delay={60}>
          <div style={{ maxWidth:680, margin:"0 auto", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"1.6rem", padding:"2.5rem", backdropFilter:"blur(8px)" }}>

            <div className="form-name-row" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem", marginBottom:"1.5rem" }}>
              <div>
                <label style={{ display:"block", color:T.navyMuted, fontSize:"0.78rem", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:"0.5rem" }}>Service</label>
                <select value={service} onChange={e => setService(e.target.value)} style={selStyle(service)}>
                  <option value="">Select service…</option>
                  {Object.keys(ESTIMATES).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display:"block", color:T.navyMuted, fontSize:"0.78rem", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:"0.5rem" }}>Home Size (sq ft)</label>
                <input
                  type="number"
                  placeholder="e.g. 1800"
                  value={sqft}
                  onChange={e => setSqft(e.target.value)}
                  style={fld}
                  onFocus={focusGold}
                  onBlur={blurGold}
                />
              </div>
            </div>

            {estimate ? (
              <div style={{ background:"rgba(230,168,23,0.09)", border:"1px solid rgba(230,168,23,0.28)", borderRadius:"1rem", padding:"1.6rem", textAlign:"center", marginBottom:"1.5rem" }}>
                <p style={{ margin:"0 0 0.25rem", color:T.navyMuted, fontSize:"0.76rem", textTransform:"uppercase", letterSpacing:"0.1em" }}>Estimated Price Range</p>
                <p style={{ margin:0, fontFamily:"'Bricolage Grotesque',sans-serif", color:T.goldLight, fontWeight:800, fontSize:"2.6rem", letterSpacing:"-0.02em" }}>
                  ${estimate.min.toLocaleString()} – ${estimate.max.toLocaleString()}
                </p>
                <p style={{ margin:"0.4rem 0 0", color:T.navyMuted, fontSize:"0.78rem" }}>Exact quote confirmed on-site · No obligation</p>
              </div>
            ) : (
              <div style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:"1rem", padding:"1.6rem", textAlign:"center", marginBottom:"1.5rem" }}>
                <p style={{ margin:0, color:"rgba(255,255,255,0.22)", fontSize:"0.9rem" }}>Select a service above to see your estimate</p>
              </div>
            )}

            <GlowBtn gold onClick={() => openQuote(service)} style={{ width:"100%" }}>
              Get My Exact Free Quote <ArrowRight size={15}/>
            </GlowBtn>
            <p style={{ margin:"0.75rem 0 0", textAlign:"center", color:T.navyMuted, fontSize:"0.78rem" }}>
              No obligation · Same-day response · Free quote
            </p>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
