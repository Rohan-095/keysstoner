'use client';
import { useState } from "react";
import { MessageSquare, X, Phone, Mail, MessageCircle } from "lucide-react";
import T from "../data/tokens";
import { PHONE_DISPLAY, PHONE_RAW, BUSINESS_EMAIL, buildWA, WA_DEFAULT_MSG } from "../data/config";

const options = [
  {
    icon: Phone,
    label: "Call us",
    sub: PHONE_DISPLAY,
    href: `tel:${PHONE_RAW}`,
    color: T.gold,
    bg: "rgba(230,168,23,0.1)",
    border: "rgba(230,168,23,0.22)",
  },
  {
    icon: Mail,
    label: "Email us",
    sub: BUSINESS_EMAIL,
    href: `mailto:${BUSINESS_EMAIL}`,
    color: "#60a5fa",
    bg: "rgba(96,165,250,0.1)",
    border: "rgba(96,165,250,0.22)",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    sub: "Chat with us",
    href: buildWA(WA_DEFAULT_MSG),
    color: "#4ade80",
    bg: "rgba(37,211,102,0.1)",
    border: "rgba(37,211,102,0.22)",
    target: "_blank",
  },
];

export default function ChatWidget({ stickyIn }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position:"fixed", right:22, bottom: stickyIn ? 94 : 22, zIndex:999, transition:"bottom .48s cubic-bezier(.22,.68,0,1.2)" }}>

      {/* Popup */}
      {open && (
        <div style={{
          position:"absolute", bottom:"calc(100% + 14px)", right:0,
          width:300,
          background:"rgba(10,20,44,0.97)", backdropFilter:"blur(24px)",
          borderRadius:"1.4rem", border:"1px solid rgba(255,255,255,0.12)",
          boxShadow:"0 32px 80px rgba(0,0,0,0.55)",
          animation:"mslideUp .28s cubic-bezier(.22,.68,0,1.2) both",
          overflow:"hidden",
        }}>
          {/* Header */}
          <div style={{ padding:"1.25rem 1.4rem 1.1rem", borderBottom:"1px solid rgba(255,255,255,0.07)", background:"rgba(255,255,255,0.03)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"0.72rem", marginBottom:"0.75rem" }}>
              <div style={{ width:40, height:40, borderRadius:"50%", background:T.gradGold, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <MessageSquare size={18} style={{ color:T.navy }}/>
              </div>
              <div>
                <p style={{ margin:0, color:"#fff", fontWeight:800, fontSize:"0.95rem" }}>Keystone Cleaner</p>
                <p style={{ margin:0, color:"#4ade80", fontSize:"0.73rem", display:"flex", alignItems:"center", gap:"0.3rem" }}>
                  <span style={{ width:6, height:6, borderRadius:"50%", background:"#4ade80", display:"inline-block" }}/> Typically replies fast
                </p>
              </div>
            </div>
            <div style={{ background:"rgba(255,255,255,0.06)", borderRadius:"0.85rem", padding:"0.88rem 1rem" }}>
              <p style={{ margin:0, color:"rgba(255,255,255,0.85)", fontSize:"0.9rem", lineHeight:1.65 }}>
                👋 Hi there! How can we help you today?
              </p>
            </div>
          </div>

          {/* Options */}
          <div style={{ padding:"0.9rem 1rem 1.1rem", display:"flex", flexDirection:"column", gap:"0.52rem" }}>
            {options.map(opt => {
              const Icon = opt.icon;
              return (
                <a
                  key={opt.label}
                  href={opt.href}
                  target={opt.target || "_self"}
                  rel={opt.target ? "noopener noreferrer" : undefined}
                  style={{ display:"flex", alignItems:"center", gap:"0.85rem", padding:"0.82rem 1rem", borderRadius:"0.95rem", background:opt.bg, border:`1px solid ${opt.border}`, textDecoration:"none", transition:"transform .18s, box-shadow .18s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.28)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
                >
                  <div style={{ width:38, height:38, borderRadius:"0.72rem", background:opt.bg, border:`1px solid ${opt.border}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <Icon size={17} style={{ color:opt.color }}/>
                  </div>
                  <div>
                    <p style={{ margin:0, color:"#fff", fontWeight:700, fontSize:"0.9rem" }}>{opt.label}</p>
                    <p style={{ margin:0, color:"rgba(255,255,255,0.48)", fontSize:"0.76rem" }}>{opt.sub}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(v => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        style={{
          width:58, height:58, borderRadius:"50%",
          background: open ? "rgba(30,50,90,0.95)" : T.gradGold,
          border: open ? "1px solid rgba(255,255,255,0.15)" : "none",
          display:"flex", alignItems:"center", justifyContent:"center",
          cursor:"pointer",
          boxShadow: open ? "0 8px 32px rgba(0,0,0,0.4)" : `0 8px 32px rgba(230,168,23,0.48)`,
          transition:"background .22s, box-shadow .22s, transform .22s",
          animation: open ? "none" : "pulseGold 2.6s ease-in-out infinite",
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.1)"; }}
        onMouseLeave={e => { e.currentTarget.style.transform = ""; }}
      >
        {open
          ? <X size={22} color="#fff"/>
          : <MessageSquare size={24} color={T.navy}/>}
      </button>
    </div>
  );
}
