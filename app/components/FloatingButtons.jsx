'use client';
import { Phone, Sparkles, MessageCircle } from "lucide-react";
import GlowBtn from "./ui/GlowBtn";
import T from "../data/tokens";
import { PHONE_DISPLAY, PHONE_RAW, buildWA, WA_DEFAULT_MSG } from "../data/config";

export default function FloatingButtons({ stickyIn, openQuote }) {
  return (
    <>
      {/* Sticky bottom bar */}
      <div
        className="sticky-bar"
        style={{
          position:"fixed", bottom:0, left:0, right:0, zIndex:800,
          background:"rgba(5,12,28,0.96)", backdropFilter:"blur(22px)",
          borderTop:"1px solid rgba(255,255,255,0.1)",
          padding:"0.82rem 1.5rem", display:"flex", gap:"0.7rem", alignItems:"center", justifyContent:"center",
          transform: stickyIn ? "translateY(0)" : "translateY(110%)",
          opacity: stickyIn ? 1 : 0,
          transition:"transform .48s cubic-bezier(.22,.68,0,1.2), opacity .48s ease",
        }}
      >
        <GlowBtn gold onClick={() => openQuote()} style={{ flex:"1 1 auto", maxWidth:210, padding:"0.78rem 1rem", fontSize:"0.88rem", borderRadius:"0.78rem" }}>
          <Sparkles size={15}/><span className="sticky-label"> Free Quote</span>
        </GlowBtn>
        <GlowBtn ghost href={`tel:${PHONE_RAW}`} style={{ flex:"1 1 auto", maxWidth:170, padding:"0.78rem 1rem", fontSize:"0.88rem", borderRadius:"0.78rem" }}>
          <Phone size={15}/><span className="sticky-label"> {PHONE_DISPLAY}</span>
        </GlowBtn>
        <GlowBtn wa href={buildWA(WA_DEFAULT_MSG)} target="_blank" rel="noopener noreferrer" style={{ flex:"1 1 auto", maxWidth:188, padding:"0.78rem 1rem", fontSize:"0.88rem", borderRadius:"0.78rem" }}>
          <MessageCircle size={15}/><span className="sticky-label"> WhatsApp</span>
        </GlowBtn>
      </div>

      {/* Floating WhatsApp bubble */}
      <a
        href={buildWA(WA_DEFAULT_MSG)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        style={{
          position:"fixed", right:22, bottom: stickyIn ? 94 : 22, zIndex:999,
          width:58, height:58, background:"#25D366", borderRadius:"50%",
          display:"flex", alignItems:"center", justifyContent:"center",
          boxShadow:"0 8px 32px rgba(37,211,102,0.52)", border:"2px solid rgba(255,255,255,0.22)",
          animation:"pulseWA 2.4s ease-in-out infinite",
          transition:"bottom .48s cubic-bezier(.22,.68,0,1.2), transform .22s",
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.14)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = ""; }}
      >
        <MessageCircle size={24} color="#fff"/>
      </a>
    </>
  );
}
