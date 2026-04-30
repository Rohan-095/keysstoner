'use client';
import { useState, useEffect } from "react";
import { Phone, Menu, X } from "lucide-react";
import GlowBtn from "./ui/GlowBtn";
import T from "../data/tokens";
import { PHONE_DISPLAY, PHONE_RAW } from "../data/config";
import useScrollY from "../hooks/useScrollY";

const navLinks = [
  { label:"Services",  id:"services"  },
  { label:"Results",   id:"results"   },
  { label:"Why Us",    id:"why-us"    },
  { label:"Coverage",  id:"coverage"  },
  { label:"Reviews",   id:"reviews"   },
  { label:"Contact",   id:"contact"   },
];

export default function Navbar({ openQuote }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeNav,  setActiveNav]  = useState("");
  const scrollY  = useScrollY();
  const scrolled = scrollY > 60;

  const scrollTo = (id) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior:"smooth", block:"start" });
  };

  useEffect(() => {
    const ids = ["services","results","why-us","coverage","reviews","contact"];
    const els = ids.map(id => document.getElementById(id)).filter(Boolean);
    const handler = () => {
      const sc = window.scrollY + 120;
      let found = "";
      for (const el of els) { if (el.offsetTop <= sc) found = el.id; }
      setActiveNav(found);
    };
    window.addEventListener("scroll", handler, { passive:true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header style={{
      position:"fixed", top:0, left:0, right:0, zIndex:900,
      background: scrolled ? "rgba(7,15,32,0.94)" : "transparent",
      backdropFilter: scrolled ? "blur(22px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
      transition:"background .4s ease, backdrop-filter .4s ease, border-color .4s ease",
      minHeight: scrolled ? 66 : 74,
    }}>
      <div style={{ maxWidth:1300, margin:"0 auto", padding:"0 1.5rem", minHeight:"inherit", display:"flex", alignItems:"center", justifyContent:"space-between", gap:"1rem" }}>

        <button onClick={() => scrollTo("hero")} style={{ display:"flex", alignItems:"center", gap:"0.75rem", background:"none", border:"none", cursor:"pointer", padding:0 }}>
          <img
            src="/logo.png"
            alt="Keystone Cleaner"
            style={{ width:36, height:36, borderRadius:"0.72rem", flexShrink:0, display:"block" }}
          />
          <div>
            <p style={{ margin:0, fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:"1.06rem", color:"#fff", letterSpacing:"-0.022em" }}>Keystone Cleaner</p>
            <p style={{ margin:0, color:T.navyMuted, fontSize:"0.68rem", letterSpacing:"0.08em" }}>EXTERIOR CLEANING</p>
          </div>
        </button>

        <nav className="desktop-nav" style={{ display:"flex", gap:"0.25rem" }}>
          {navLinks.map(l => (
            <button key={l.id} onClick={() => scrollTo(l.id)} className={`nav-link-btn${activeNav === l.id ? " active" : ""}`}
              style={{ background:"none", border:"none", cursor:"pointer", padding:"0.45rem 0.7rem", borderRadius:"0.6rem", transition:"background .18s" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <span className="nav-link-inner" style={{ color: activeNav === l.id ? "#fff" : T.navyMuted, fontSize:"0.88rem", fontWeight:500, letterSpacing:"0.01em", transition:"color .18s" }}>
                {l.label}
              </span>
            </button>
          ))}
        </nav>

        <div style={{ display:"flex", gap:"0.6rem", alignItems:"center" }}>
          <a href={`tel:${PHONE_RAW}`} style={{ display:"flex", alignItems:"center", gap:"0.44rem", background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.13)", borderRadius:"0.72rem", padding:"0.58rem 0.95rem", fontWeight:600, fontSize:"0.86rem", color:"#fff", transition:"background .2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.07)"}
          >
            <Phone size={14}/><span className="wa-label">{PHONE_DISPLAY}</span>
          </a>
          <GlowBtn gold onClick={() => openQuote()} style={{ padding:"0.62rem 1.1rem", fontSize:"0.9rem", borderRadius:"0.72rem" }}>Free Quote</GlowBtn>
          <button className="menu-btn" onClick={() => setMobileOpen(v => !v)}
            style={{ display:"none", width:42, height:42, alignItems:"center", justifyContent:"center", background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.13)", borderRadius:"0.75rem", cursor:"pointer", color:"#fff" }}>
            {mobileOpen ? <X size={18}/> : <Menu size={18}/>}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div style={{ background:"rgba(7,15,32,0.98)", backdropFilter:"blur(22px)", borderTop:"1px solid rgba(255,255,255,0.08)", padding:"0.6rem 1.5rem 1.3rem", animation:"mfadeIn .2s ease" }}>
          {navLinks.map(l => (
            <button key={l.id} onClick={() => scrollTo(l.id)} style={{ display:"block", width:"100%", textAlign:"left", background:"none", border:"none", color:"rgba(255,255,255,0.82)", padding:"0.88rem 0", borderBottom:"1px solid rgba(255,255,255,0.06)", fontSize:"0.97rem", cursor:"pointer" }}>{l.label}</button>
          ))}
          <GlowBtn gold onClick={() => { setMobileOpen(false); openQuote(); }} style={{ marginTop:"0.9rem", width:"100%", padding:"0.95rem" }}>Get Free Quote</GlowBtn>
        </div>
      )}
    </header>
  );
}
