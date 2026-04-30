'use client';
import { useState, useCallback } from "react";
import { ArrowRight, Phone, CheckCircle2, Clock3, Star, ShieldCheck, ChevronLeft, ChevronRight } from "lucide-react";
import GlowBtn from "./ui/GlowBtn";
import T from "../data/tokens";
import { PHONE_DISPLAY, PHONE_RAW } from "../data/config";
import heroSlides from "../data/heroSlides";
import useInterval from "../hooks/useInterval";

export default function HeroSlider({ openQuote }) {
  const [cur,     setCur]     = useState(0);
  const [textKey, setTextKey] = useState(0);
  const [paused,  setPaused]  = useState(false);

  const goTo = useCallback((idx) => { setCur(idx); setTextKey(k => k + 1); }, []);
  const next = useCallback(() => goTo((cur + 1) % heroSlides.length), [cur, goTo]);
  const prev = useCallback(() => goTo((cur - 1 + heroSlides.length) % heroSlides.length), [cur, goTo]);

  useInterval(next, paused ? null : 5500);

  const slide = heroSlides[cur];

  return (
    <div className="hero-slider-wrap" style={{ position:"relative", width:"100%", height:"100svh", minHeight:640, maxHeight:920, overflow:"hidden" }}
      onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>

      {heroSlides.map((s, i) => (
        <div key={i} style={{ position:"absolute", inset:0, zIndex:1, opacity: i === cur ? 1 : 0, transition:"opacity 1.2s cubic-bezier(.4,0,.2,1)", transform: i === cur ? "scale(1.04)" : "scale(1.0)", animation: i === cur ? "kenBurns 6s ease-out forwards" : "none" }}>
          <img src={s.image} alt={s.tag} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
        </div>
      ))}

      <div style={{ position:"absolute", inset:0, zIndex:2, background:"linear-gradient(135deg,rgba(6,12,26,0.88) 0%,rgba(9,20,45,0.72) 50%,rgba(6,14,32,0.5) 100%)" }}/>
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"30%", zIndex:3, background:"linear-gradient(to top,rgba(9,20,40,0.85),transparent)" }}/>
      <div style={{ position:"absolute", inset:0, zIndex:2, backgroundImage:"linear-gradient(rgba(255,255,255,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.022) 1px,transparent 1px)", backgroundSize:"64px 64px", maskImage:"radial-gradient(ellipse 85% 85% at 50% 50%,black 30%,transparent 100%)" }}/>
      <div style={{ position:"absolute", zIndex:2, width:600, height:600, borderRadius:"50%", background:"radial-gradient(circle,rgba(42,74,130,0.35) 0%,transparent 70%)", top:"-10%", right:"-8%", animation:"orbFloat 14s ease-in-out infinite", pointerEvents:"none" }}/>

      <div className="hero-inner" style={{ position:"absolute", inset:0, zIndex:10, display:"flex", flexDirection:"column", justifyContent:"center", maxWidth:1300, margin:"0 auto", padding:"0 1.5rem", width:"100%" }}>
        <div key={textKey} className="hero-copy" style={{ maxWidth:720, animation:"heroTextIn .72s cubic-bezier(.22,.68,0,1.2) both" }}>

          <div style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem", background:"rgba(230,168,23,0.1)", border:"1px solid rgba(230,168,23,0.3)", borderRadius:"999px", padding:"0.42rem 1rem", marginBottom:"1.6rem" }}>
            <div style={{ width:7, height:7, borderRadius:"50%", background:T.gold, animation:"pulseDot 1.8s ease infinite" }}/>
            <span style={{ color:T.goldLight, fontSize:"0.82rem", fontWeight:700, letterSpacing:"0.05em" }}>Trusted exterior cleaning · Lower Mainland</span>
          </div>

          <h1 className="hero-title" style={{ margin:"0 0 1.2rem", fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:"clamp(2.8rem,6.5vw,5.2rem)", lineHeight:1, letterSpacing:"-0.04em", color:"#fff" }}>
            {slide.headline.map((line, i) => (
              <span key={i} style={{ display:"block", animation:`heroLineIn .62s cubic-bezier(.22,.68,0,1.2) ${i * 90}ms both` }}>
                {i === 2 ? (
                  <span style={{ background:T.gradGold, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>{line}</span>
                ) : line}
              </span>
            ))}
          </h1>

          <p className="hero-sub" style={{ margin:"0 0 2.1rem", color:"rgba(255,255,255,0.68)", fontSize:"1.08rem", lineHeight:1.76, maxWidth:560, animation:"heroSubIn .7s cubic-bezier(.22,.68,0,1.2) .25s both" }}>
            {slide.sub}
          </p>

          <div className="hero-ctas" style={{ display:"flex", gap:"0.88rem", flexWrap:"wrap", marginBottom:"2rem", animation:"heroCTAIn .7s cubic-bezier(.22,.68,0,1.2) .38s both" }}>
            <GlowBtn gold onClick={() => openQuote()}>{slide.cta} <ArrowRight size={16}/></GlowBtn>
            <GlowBtn ghost href={`tel:${PHONE_RAW}`}><Phone size={15}/> {PHONE_DISPLAY}</GlowBtn>
          </div>

          <div className="hero-proof" style={{ display:"flex", gap:"1.5rem", flexWrap:"wrap", animation:"heroCTAIn .7s cubic-bezier(.22,.68,0,1.2) .5s both" }}>
            {["500+ Homes","5★ Rated","Same-Day","Insured"].map(t => (
              <div key={t} style={{ display:"flex", alignItems:"center", gap:"0.4rem", color:"rgba(255,255,255,0.55)", fontSize:"0.84rem" }}>
                <CheckCircle2 size={13} style={{ color:T.gold }}/> {t}
              </div>
            ))}
          </div>
        </div>

        <div className="hero-badges" style={{ position:"absolute", right:"1.5rem", top:"50%", transform:"translateY(-50%)", display:"flex", flexDirection:"column", gap:"0.85rem", width:"min(220px,28vw)" }}>
          {[
            { label:"Response", value:"Same day",  icon:<Clock3 size={18} style={{ color:T.gold }}/> },
            { label:null,       value:null,         stars:true },
            { label:"Licensed", value:"& Insured",  icon:<ShieldCheck size={18} style={{ color:T.gold }}/> },
          ].map((b, i) => (
            <div key={i} style={{ background:"rgba(13,28,63,0.9)", backdropFilter:"blur(16px)", borderRadius:"1.1rem", padding:"0.88rem 1.1rem", border:"1px solid rgba(255,255,255,0.12)", animation:`floatY ${5 + i * 1}s ease-in-out infinite ${i * 1.2}s`, display:"flex", alignItems:"center", gap:"0.7rem", boxShadow:"0 18px 48px rgba(0,0,0,0.35)" }}>
              {b.stars ? (
                <>
                  <div style={{ display:"flex", gap:1.5, flexShrink:0 }}>
                    {Array.from({ length:5 }).map((_, j) => <Star key={j} size={13} style={{ color:T.gold, fill:T.gold }}/>)}
                  </div>
                  <p style={{ margin:0, color:"#fff", fontWeight:800, fontSize:"0.88rem" }}>5★ · 500+ Homes</p>
                </>
              ) : (
                <>
                  <div style={{ width:40, height:40, borderRadius:"0.7rem", background:"rgba(230,168,23,0.12)", border:"1px solid rgba(230,168,23,0.22)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    {b.icon}
                  </div>
                  <div>
                    <p style={{ margin:0, color:"rgba(255,255,255,0.48)", fontSize:"0.68rem", textTransform:"uppercase", letterSpacing:"0.08em" }}>{b.label}</p>
                    <p style={{ margin:0, color:"#fff", fontWeight:800, fontSize:"0.9rem" }}>{b.value}</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="hero-controls" style={{ position:"absolute", bottom:28, left:0, right:0, zIndex:20, display:"flex", alignItems:"center", justifyContent:"center", gap:"1rem" }}>
        <button onClick={prev} style={{ width:40, height:40, borderRadius:"50%", background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.18)", backdropFilter:"blur(8px)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"#fff", transition:"background .2s, transform .2s" }}>
          <ChevronLeft size={17}/>
        </button>
        <div style={{ display:"flex", gap:"0.55rem", alignItems:"center" }}>
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} style={{ width: i === cur ? "28px" : "8px", height:"8px", borderRadius:"4px", background: i === cur ? T.gold : "rgba(255,255,255,0.35)", border:"none", cursor:"pointer", padding:0, transition:"width .35s cubic-bezier(.22,.68,0,1.2), background .3s" }}/>
          ))}
        </div>
        <button onClick={next} style={{ width:40, height:40, borderRadius:"50%", background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.18)", backdropFilter:"blur(8px)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"#fff", transition:"background .2s, transform .2s" }}>
          <ChevronRight size={17}/>
        </button>
      </div>

      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:2, zIndex:21, background:"rgba(255,255,255,0.1)" }}>
        <div key={cur} style={{ height:"100%", background:T.gradGold, animation:`progressBar ${paused ? 10000 : 5500}ms linear forwards`, transformOrigin:"left" }}/>
      </div>
    </div>
  );
}
