'use client';
import { useEffect } from "react";
import { X } from "lucide-react";

export default function Modal({ open, onClose, children }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:2000, background:"rgba(5,12,28,0.88)", backdropFilter:"blur(14px)", display:"flex", alignItems:"center", justifyContent:"center", padding:"1rem", animation:"mfadeIn .22s ease" }}>
      <div onClick={e => e.stopPropagation()} style={{ position:"relative", width:"100%", maxWidth:560, maxHeight:"92vh", overflowY:"auto", background:"linear-gradient(145deg,#0d2248,#162e56)", borderRadius:"1.65rem", boxShadow:"0 56px 120px rgba(0,0,0,0.55),inset 0 1px 0 rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.13)", animation:"mslideUp .32s cubic-bezier(.22,.68,0,1.18)" }}>
        <button onClick={onClose} style={{ position:"absolute", top:14, right:14, width:34, height:34, borderRadius:"50%", border:"1px solid rgba(255,255,255,0.15)", background:"rgba(255,255,255,0.08)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"rgba(255,255,255,0.7)", zIndex:2, transition:"background .2s" }}
          onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
        >
          <X size={14} />
        </button>
        {children}
      </div>
    </div>
  );
}
