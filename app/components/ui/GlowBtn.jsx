'use client';
import { useState } from "react";
import T from "../../data/tokens";

export default function GlowBtn({ children, onClick, href, target, rel, gold, wa, ghost, style = {}, disabled, ...rest }) {
  const [hov, setHov] = useState(false);
  const base = {
    display:"inline-flex", alignItems:"center", justifyContent:"center", gap:"0.48rem",
    borderRadius:"0.88rem", padding:"0.95rem 1.6rem", fontWeight:800, fontSize:"0.97rem",
    cursor: disabled ? "not-allowed" : "pointer", border:"none", textDecoration:"none",
    fontFamily:"inherit", opacity: disabled ? 0.48 : 1,
    transition:"transform .22s cubic-bezier(.22,.68,0,1.2), box-shadow .22s, background .18s",
    transform: hov && !disabled ? "translateY(-2px) scale(1.025)" : "none",
    ...(gold ? {
      background: T.gradGold, color: T.navy,
      boxShadow: hov ? `0 18px 48px ${T.goldGlow}` : `0 6px 24px ${T.goldGlow}`,
    } : wa ? {
      background:"#25D366", color:"#fff",
      boxShadow: hov ? "0 16px 44px rgba(37,211,102,0.48)" : "0 6px 26px rgba(37,211,102,0.32)",
    } : ghost ? {
      background:"rgba(255,255,255,0.07)", color:"#fff",
      border:"1px solid rgba(255,255,255,0.18)", backdropFilter:"blur(8px)",
      boxShadow: hov ? "0 8px 30px rgba(0,0,0,0.25)" : "none",
    } : {
      background:"rgba(255,255,255,0.1)", color:"#fff",
      border:"1px solid rgba(255,255,255,0.18)", backdropFilter:"blur(8px)",
      boxShadow: hov ? "0 8px 30px rgba(0,0,0,0.25)" : "none",
    }),
    ...style,
  };
  const Tag = href ? "a" : "button";
  return (
    <Tag href={href} target={target} rel={rel} onClick={disabled ? undefined : onClick}
      style={base} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
