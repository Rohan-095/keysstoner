'use client';
import { Phone, Sparkles } from "lucide-react";
import GlowBtn from "./ui/GlowBtn";
import { PHONE_DISPLAY, PHONE_RAW } from "../data/config";

export default function FloatingButtons({ stickyIn, openQuote }) {
  return (
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
    </div>
  );
}
