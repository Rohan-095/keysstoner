'use client';
import { Clock3, ArrowRight, MessageCircle } from "lucide-react";
import Modal from "./ui/Modal";
import GlowBtn from "./ui/GlowBtn";
import T from "../data/tokens";
import { buildWA } from "../data/config";

export default function ServiceModal({ service, open, onClose, onQuote }) {
  if (!service) return null;
  const Icon = service.icon;
  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ borderRadius:"1.65rem", overflow:"hidden" }}>
        <div style={{ height:215, position:"relative", overflow:"hidden" }}>
          <img src={service.image} alt={service.title} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transform:"scale(1.05)" }}/>
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(9,20,40,0.93) 0%,rgba(9,20,40,0.25) 60%,transparent 100%)" }}/>
          <div style={{ position:"absolute", bottom:16, left:16, display:"flex", gap:"0.5rem" }}>
            <span style={{ background:T.gradGold, color:T.navy, borderRadius:"999px", padding:"0.3rem 0.88rem", fontSize:"0.8rem", fontWeight:800 }}>{service.price}</span>
            <span style={{ background:"rgba(255,255,255,0.12)", color:"#fff", backdropFilter:"blur(8px)", borderRadius:"999px", padding:"0.3rem 0.88rem", fontSize:"0.8rem", border:"1px solid rgba(255,255,255,0.15)" }}><Clock3 size={11} style={{ display:"inline", marginRight:3 }}/>{service.duration}</span>
          </div>
        </div>
        <div style={{ padding:"1.65rem" }}>
          <div style={{ width:46, height:46, borderRadius:"0.8rem", background:"rgba(230,168,23,0.1)", border:"1px solid rgba(230,168,23,0.2)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"0.9rem" }}>
            <Icon size={21} style={{ color:T.gold }}/>
          </div>
          <h3 style={{ margin:"0 0 0.65rem", color:"#fff", fontFamily:"'Bricolage Grotesque',sans-serif", fontSize:"1.42rem", fontWeight:800 }}>{service.title}</h3>
          <p style={{ margin:"0 0 0.5rem", color:"rgba(255,255,255,0.8)", lineHeight:1.74 }}>{service.short}</p>
          <p style={{ margin:"0 0 1.4rem", color:T.navyMuted, lineHeight:1.74, fontSize:"0.9rem" }}>{service.desc}</p>
          <div style={{ display:"flex", gap:"0.75rem", flexWrap:"wrap" }}>
            <GlowBtn gold onClick={() => { onClose(); onQuote(service.title); }}><ArrowRight size={15}/> Get a Quote</GlowBtn>
            <GlowBtn wa href={buildWA(`Hi KeystoneCleaner, I'm interested in ${service.title}. Can I get a quote?`)} target="_blank" rel="noopener noreferrer"><MessageCircle size={15}/> WhatsApp</GlowBtn>
          </div>
        </div>
      </div>
    </Modal>
  );
}
