'use client';

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  ArrowRight, Phone, ShieldCheck, Sparkles, Clock3, MapPin, Star,
  Droplets, Home, Wind, Waves, ChevronRight, CheckCircle2,
  Menu, X, ChevronDown, Send, Check, AlertCircle, Loader2,
  MessageCircle, BadgeCheck, Zap, ThumbsUp, Award, ChevronLeft,
} from "lucide-react";

/* ─── Config ──────────────────────────────────────────────── */
const PHONE_DISPLAY  = "+1 250-317-1366";
const PHONE_RAW      = "12503171366";
const WA_DEFAULT_MSG = "Hi Keystoners, I'd like a free quote for exterior cleaning.";
const buildWA = (msg) => `https://wa.me/${PHONE_RAW}?text=${encodeURIComponent(msg)}`;

/* ─── Design Tokens ───────────────────────────────────────── */
const T = {
  navy:       "#0d1c3f",
  navyMid:    "#18345f",
  navyDeep:   "#091428",
  navyCard:   "#16284a",
  navyGlass:  "rgba(13,28,63,0.82)",
  navyBorder: "rgba(255,255,255,0.1)",
  navyMuted:  "rgba(255,255,255,0.58)",
  navyFaint:  "rgba(255,255,255,0.07)",
  gold:       "#e6a817",
  goldLight:  "#f5c842",
  goldGlow:   "rgba(230,168,23,0.32)",
  goldFaint:  "rgba(230,168,23,0.12)",
  white:      "#ffffff",
  offWhite:   "#f4f7fc",
  lightCard:  "#edf2fb",
  slate:      "#5a6e8a",
  slateLight: "#8fa3bf",
  ink:        "#0c1a2e",
  border:     "#dae2f0",
  green:      "#16a34a",
  greenBg:    "#dcfce7",
  gradGold:   "linear-gradient(135deg, #e6a817 0%, #f5c842 100%)",
};

/* ─── Hero Slides ─────────────────────────────────────────── */
const heroSlides = [
  {
    image: "/roof-cleaning.jpg",
    headline: ["Your property", "deserves to", "shine."],
    sub: "Roof washing, gutter cleaning, pressure washing and more across Vancouver and the Lower Mainland.",
    cta: "Get Free Quote",
    tag: "Roof Soft Wash",
  },
  {
    image: "/image-1.jpg",
    headline: ["Clean home.", "Happy family.", "Fast results."],
    sub: "Professional house washing that restores siding, trim and soffits with a gentle, thorough soft wash.",
    cta: "Book House Wash",
    tag: "House Washing",
  },
  {
    image: "/floor.jpg",
    headline: ["Driveways that", "look brand", "new again."],
    sub: "Deep-clean concrete, brick and pavers with high-pressure washing that cuts through years of grime.",
    cta: "Book Now",
    tag: "Pressure Washing",
  },
  {
    image: "/image-2.jpg",
    headline: ["Gutters clear.", "No overflow.", "No damage."],
    sub: "Full gutter scoop-out and downspout flush before overflow causes expensive fascia and foundation damage.",
    cta: "Book Gutter Clean",
    tag: "Gutter Cleaning",
  },
];

/* ─── Services ────────────────────────────────────────────── */
const services = [
  { title:"Roof Soft Wash",    short:"Remove moss, algae and black streaks safely — no pressure, no shingle damage.",    desc:"Biodegradable solution kills growth at the root for lasting results. Safe on asphalt, cedar, metal and tile.",             icon:ShieldCheck, price:"From $349",    duration:"2–4 hrs",  image:"/roof-cleaning.jpg",  popular:true  },
  { title:"Gutter Cleaning",   short:"Clear blocked gutters before overflow damages fascia, siding and foundations.",     desc:"Full scoop-out, downspout flush and visual inspection included. Great for seasonal property maintenance.",             icon:Droplets,    price:"From $149",    duration:"1–2 hrs",  image:"/image-2.jpg",        popular:false },
  { title:"House Washing",     short:"Restore siding, trim and soffits with a gentle, thorough soft wash.",              desc:"Safe for vinyl, Hardie board, stucco and painted surfaces. Removes dirt, mildew and algae cleanly.",                 icon:Home,        price:"From $299",    duration:"2–3 hrs",  image:"/image-1.jpg",        popular:false },
  { title:"Pressure Washing",  short:"Deep-clean driveways, patios and hard surfaces to a like-new finish.",             desc:"Powerful cleaning for concrete, brick and pavers. Cuts through stains, marks and grime fast.",                        icon:Waves,       price:"From $199",    duration:"1–3 hrs",  image:"/floor.jpg",          popular:false },
  { title:"Window Cleaning",   short:"Crystal-clear, streak-free exterior windows that refresh the whole property.",     desc:"Pure-water fed-pole system for spotless results up to 3 storeys. Includes frames, sills and screens.",               icon:Sparkles,    price:"From $179",    duration:"1–2 hrs",  image:"/image-1.jpg",        popular:false },
  { title:"Maintenance Plans", short:"Scheduled seasonal care — roof, gutters and surfaces in one recurring bundle.",    desc:"Priority scheduling, locked pricing and no annual contracts. Ideal for homeowners and strata.",                        icon:Wind,        price:"From $499/yr", duration:"Ongoing",  image:"/pipe-cleaning.jpg",  popular:false },
];

const beforeAfter = [
  { title:"Driveway Pressure Wash",  tag:"Pressure Washing", image:"/floor.jpg"         },
  { title:"Gutter Clear-Out",        tag:"Gutter Cleaning",  image:"/image-2.jpg"       },
  { title:"Roof Moss Removal",       tag:"Roof Soft Wash",   image:"/roof-cleaning.jpg" },
  { title:"Pipe & Exterior Refresh", tag:"Maintenance",      image:"/pipe-cleaning.jpg" },
];

const coverage = [
  "Vancouver","Burnaby","Richmond","Surrey",
  "Langley","Coquitlam","New Westminster","North Vancouver",
  "West Vancouver","Delta","Maple Ridge","Port Coquitlam",
];

const reviews = [
  { name:"Sarah M.", location:"Vancouver",       stars:5, service:"Gutter Cleaning",  text:"Gutters completely cleared and the property looked noticeably cleaner the same day. Very professional and easy to deal with." },
  { name:"David K.", location:"Burnaby",         stars:5, service:"House Washing",    text:"House wash made a massive difference. Fast response, no hassle, and everything looked fresh again." },
  { name:"Priya T.", location:"North Vancouver", stars:5, service:"Roof Soft Wash",   text:"Roof soft wash removed years of growth. Honest, clean work and very easy communication throughout." },
  { name:"James O.", location:"Surrey",          stars:5, service:"Pressure Washing", text:"Driveway and hard surfaces came out way better than expected. Great value and a neat, careful finish." },
  { name:"Linda H.", location:"Richmond",        stars:5, service:"Window Cleaning",  text:"Crystal-clear windows — not a single streak. Did our second floor too. Booking again for sure." },
];

const faqs = [
  { q:"Do I need to be home during the service?",        a:"Usually no. We only need access details and any specific instructions. Most exterior jobs can be completed while you're away, and we send photos when done." },
  { q:"How long does a roof soft wash last?",            a:"Typically 2–3 years depending on shade, moisture and tree coverage. The treatment targets root growth, not just the visible surface layer." },
  { q:"Is soft washing safe for my roof warranty?",      a:"Yes — soft washing is the manufacturer-recommended method for most roofing types. High-pressure washing risks voiding warranties; soft wash does not." },
  { q:"Do you service strata or commercial properties?", a:"Yes. We offer strata and maintenance plans with repeat scheduling, priority booking and invoicing direct to the strata council." },
  { q:"Can I message you directly on WhatsApp?",         a:"Absolutely. The floating button, quote popup and contact form all open WhatsApp directly with your details pre-filled." },
];

const marqueeItems = [
  "✦ Licensed & Insured","✦ 500+ Homes Cleaned","✦ 5★ Rated","✦ Same-Day Response",
  "✦ Fully Bonded","✦ Eco-Friendly Solutions","✦ Lower Mainland Experts","✦ No Hidden Fees",
  "✦ Licensed & Insured","✦ 500+ Homes Cleaned","✦ 5★ Rated","✦ Same-Day Response",
  "✦ Fully Bonded","✦ Eco-Friendly Solutions","✦ Lower Mainland Experts","✦ No Hidden Fees",
];

/* ─── Hooks ───────────────────────────────────────────────── */
function useInView(threshold = 0.1, once = true) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); if (once) obs.disconnect(); }
      else if (!once) setVis(false);
    }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, [threshold, once]);
  return [ref, vis];
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const fn = () => setY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return y;
}

function useInterval(cb, delay) {
  const saved = useRef(cb);
  useEffect(() => { saved.current = cb; }, [cb]);
  useEffect(() => {
    if (delay == null) return;
    const id = setInterval(() => saved.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}

/* ─── Reveal Component ────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "", from = "bottom", distance = 32 }) {
  const [ref, vis] = useInView();
  const origins = {
    bottom: `translateY(${distance}px)`,
    top:    `translateY(-${distance}px)`,
    left:   `translateX(-${distance}px)`,
    right:  `translateX(${distance}px)`,
    scale:  `scale(0.93)`,
    none:   `none`,
  };
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "none" : origins[from],
      transition: `opacity .72s cubic-bezier(.22,.68,0,1.15) ${delay}ms, transform .72s cubic-bezier(.22,.68,0,1.15) ${delay}ms`,
      willChange: "opacity, transform",
    }}>
      {children}
    </div>
  );
}

/* ─── Form Field Styles ───────────────────────────────────── */
const fld = {
  width:"100%", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.14)",
  borderRadius:"0.75rem", padding:"0.9rem 1rem", color:"#fff", fontSize:"0.94rem",
  outline:"none", boxSizing:"border-box", fontFamily:"inherit", transition:"border-color .22s, box-shadow .22s",
};
const selStyle = (v) => ({
  ...fld, color: v ? "#fff" : "rgba(255,255,255,0.38)",
  appearance:"none", WebkitAppearance:"none",
});

/* ─── GlowBtn ─────────────────────────────────────────────── */
function GlowBtn({ children, onClick, href, target, rel, gold, wa, ghost, style = {}, disabled, ...rest }) {
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
      style={base} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* ─── Modal ───────────────────────────────────────────────── */
function Modal({ open, onClose, children }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:2000, background:"rgba(5,12,28,0.88)", backdropFilter:"blur(14px)", display:"flex", alignItems:"center", justifyContent:"center", padding:"1rem", animation:"mfadeIn .22s ease" }}>
      <div onClick={e=>e.stopPropagation()} style={{ position:"relative", width:"100%", maxWidth:560, maxHeight:"92vh", overflowY:"auto", background:"linear-gradient(145deg,#0d2248,#162e56)", borderRadius:"1.65rem", boxShadow:"0 56px 120px rgba(0,0,0,0.55),inset 0 1px 0 rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.13)", animation:"mslideUp .32s cubic-bezier(.22,.68,0,1.18)" }}>
        <button onClick={onClose} style={{ position:"absolute", top:14, right:14, width:34, height:34, borderRadius:"50%", border:"1px solid rgba(255,255,255,0.15)", background:"rgba(255,255,255,0.08)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"rgba(255,255,255,0.7)", zIndex:2, transition:"background .2s" }}
          onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.15)"}
          onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.08)"}
        >
          <X size={14}/>
        </button>
        {children}
      </div>
    </div>
  );
}

/* ─── Quote Modal ─────────────────────────────────────────── */
function QuoteModal({ open, onClose, prefill = "" }) {
  const [form, setForm] = useState({ name:"", phone:"", email:"", service:prefill, city:"", message:"" });
  const [status, setStatus] = useState("idle");
  const set = (k,v) => setForm(f=>({...f,[k]:v}));
  useEffect(() => { if (open) { setForm(f=>({...f,service:prefill||f.service})); setStatus("idle"); } }, [open, prefill]);
  const valid = form.name && form.phone && form.service && form.city;

  const submit = () => {
    if (!valid) return; setStatus("loading");
    const msg = ["Hi Keystoners, I need a quote.", `Name: ${form.name}`, `Phone: ${form.phone}`, form.email?`Email: ${form.email}`:null, `Service: ${form.service}`, `City: ${form.city}`, form.message?`Note: ${form.message}`:null].filter(Boolean).join("\n");
    setTimeout(() => { setStatus("success"); window.open(buildWA(msg),"_blank","noopener,noreferrer"); }, 700);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ padding:"2rem" }}>
        {status==="success" ? (
          <div style={{ textAlign:"center", padding:"1.5rem 0" }}>
            <div style={{ width:68, height:68, borderRadius:"50%", background:"rgba(22,163,74,0.15)", border:"1px solid rgba(22,163,74,0.3)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 1.1rem" }}>
              <Check size={30} style={{ color:"#4ade80" }}/>
            </div>
            <h3 style={{ margin:"0 0 0.4rem", color:"#fff", fontFamily:"'Bricolage Grotesque',sans-serif", fontSize:"1.35rem", fontWeight:800 }}>Opening WhatsApp…</h3>
            <p style={{ margin:"0 0 1.5rem", color:T.navyMuted }}>Your quote details are pre-filled and ready to send.</p>
            <GlowBtn gold onClick={onClose}>Done</GlowBtn>
          </div>
        ) : (
          <>
            <div style={{ marginBottom:"1.4rem" }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:"0.4rem", background:T.goldFaint, border:`1px solid rgba(230,168,23,0.25)`, borderRadius:"999px", padding:"0.35rem 0.85rem", marginBottom:"0.9rem" }}>
                <Star size={12} style={{ color:T.gold, fill:T.gold }}/><span style={{ color:T.gold, fontSize:"0.78rem", fontWeight:700 }}>Free Quote — No Obligation</span>
              </div>
              <h3 style={{ margin:"0 0 0.3rem", color:"#fff", fontFamily:"'Bricolage Grotesque',sans-serif", fontSize:"1.4rem", fontWeight:800 }}>Get your free quote</h3>
              <p style={{ margin:0, color:T.navyMuted, fontSize:"0.88rem" }}>Fill once — WhatsApp opens with your message ready to send.</p>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:"0.7rem" }}>
              {[["text","Full Name *","name"],["tel","Phone Number *","phone"],["email","Email (optional)","email"]].map(([type,ph,k])=>(
                <input key={k} type={type} placeholder={ph} value={form[k]} onChange={e=>set(k,e.target.value)} style={fld}
                  onFocus={e=>{ e.target.style.borderColor="rgba(230,168,23,0.6)"; e.target.style.boxShadow=`0 0 0 3px ${T.goldFaint}`; }}
                  onBlur={e=>{ e.target.style.borderColor="rgba(255,255,255,0.14)"; e.target.style.boxShadow=""; }}
                />
              ))}
              <select value={form.service} onChange={e=>set("service",e.target.value)} style={selStyle(form.service)}>
                <option value="">Service needed *</option>
                {services.map(s=><option key={s.title} value={s.title}>{s.title}</option>)}
                <option value="Multiple Services">Multiple Services</option>
              </select>
              <select value={form.city} onChange={e=>set("city",e.target.value)} style={selStyle(form.city)}>
                <option value="">Your city *</option>
                {coverage.map(c=><option key={c} value={c}>{c}</option>)}
                <option value="Other">Other</option>
              </select>
              <textarea rows={3} placeholder="Anything else?" value={form.message} onChange={e=>set("message",e.target.value)} style={{...fld,resize:"vertical"}}
                onFocus={e=>{ e.target.style.borderColor="rgba(230,168,23,0.6)"; e.target.style.boxShadow=`0 0 0 3px ${T.goldFaint}`; }}
                onBlur={e=>{ e.target.style.borderColor="rgba(255,255,255,0.14)"; e.target.style.boxShadow=""; }}
              />
              <GlowBtn wa onClick={submit} disabled={!valid||status==="loading"} style={{ width:"100%" }}>
                {status==="loading" ? <><Loader2 size={16} style={{animation:"spin 1s linear infinite"}}/>Preparing…</> : <><MessageCircle size={16}/>Send on WhatsApp</>}
              </GlowBtn>
              {!valid && <p style={{margin:0,color:T.slateLight,fontSize:"0.78rem"}}><AlertCircle size={11} style={{display:"inline",marginRight:4}}/>Name, phone, service and city are required</p>}
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}

/* ─── Service Modal ───────────────────────────────────────── */
function ServiceModal({ service, open, onClose, onQuote }) {
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
            <span style={{ background:"rgba(255,255,255,0.12)", color:"#fff", backdropFilter:"blur(8px)", borderRadius:"999px", padding:"0.3rem 0.88rem", fontSize:"0.8rem", border:"1px solid rgba(255,255,255,0.15)" }}><Clock3 size={11} style={{display:"inline",marginRight:3}}/>{service.duration}</span>
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
            <GlowBtn gold onClick={()=>{onClose();onQuote(service.title);}}><ArrowRight size={15}/> Get a Quote</GlowBtn>
            <GlowBtn wa href={buildWA(`Hi Keystoners, I'm interested in ${service.title}. Can I get a quote?`)} target="_blank" rel="noopener noreferrer"><MessageCircle size={15}/> WhatsApp</GlowBtn>
          </div>
        </div>
      </div>
    </Modal>
  );
}

/* ─── FAQ Item ────────────────────────────────────────────── */
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
      <button onClick={()=>setOpen(!open)} style={{ width:"100%", background:"none", border:"none", padding:"1.28rem 0", display:"flex", justifyContent:"space-between", alignItems:"center", gap:"1rem", cursor:"pointer", textAlign:"left" }}>
        <span style={{ color:"#fff", fontWeight:700, fontSize:"0.98rem", lineHeight:1.45 }}>{q}</span>
        <div style={{ width:30, height:30, borderRadius:"50%", background:open?T.gradGold:"rgba(255,255,255,0.07)", border:open?"none":"1px solid rgba(255,255,255,0.12)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"background .28s, transform .32s", transform:open?"rotate(180deg)":"none" }}>
          <ChevronDown size={15} style={{ color:open?T.navy:T.gold }}/>
        </div>
      </button>
      <div style={{ maxHeight:open?"320px":"0", overflow:"hidden", transition:"max-height .38s cubic-bezier(.22,.68,0,1.15)" }}>
        <p style={{ margin:"0 0 1.3rem", color:T.navyMuted, lineHeight:1.84, fontSize:"0.94rem", paddingRight:"2rem" }}>{a}</p>
      </div>
    </div>
  );
}

/* ─── Contact Form ────────────────────────────────────────── */
function ContactForm() {
  const [form, setForm] = useState({ name:"", phone:"", email:"", service:"", city:"", message:"" });
  const [status, setStatus] = useState("idle");
  const set = (k,v) => setForm(f=>({...f,[k]:v}));
  const valid = form.name && form.phone && form.service && form.city;

  const submit = (e) => {
    e.preventDefault(); if (!valid) return; setStatus("loading");
    const msg = ["Hi Keystoners, quote request.", `Name: ${form.name}`, `Phone: ${form.phone}`, form.email?`Email: ${form.email}`:null, `Service: ${form.service}`, `City: ${form.city}`, form.message?`Note: ${form.message}`:null].filter(Boolean).join("\n");
    setTimeout(() => { setStatus("success"); window.open(buildWA(msg),"_blank","noopener,noreferrer"); }, 700);
  };

  if (status==="success") return (
    <div style={{ background:"rgba(22,163,74,0.08)", border:"1px solid rgba(22,163,74,0.22)", borderRadius:"1.3rem", padding:"2.5rem", textAlign:"center" }}>
      <Check size={36} style={{ color:"#4ade80", marginBottom:"0.75rem" }}/>
      <h4 style={{ margin:"0 0 0.35rem", color:"#fff", fontWeight:800, fontSize:"1.1rem" }}>Opening WhatsApp…</h4>
      <p style={{ margin:0, color:T.navyMuted, fontSize:"0.9rem" }}>Your details are pre-filled and ready to send.</p>
    </div>
  );

  return (
    <form onSubmit={submit} style={{ display:"flex", flexDirection:"column", gap:"0.8rem", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"1.4rem", padding:"1.85rem", backdropFilter:"blur(8px)" }}>
      <div className="form-name-row" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.8rem" }}>
        {[["text","Full Name *","name"],["tel","Phone *","phone"]].map(([t,p,k])=>(
          <input key={k} type={t} placeholder={p} value={form[k]} onChange={e=>set(k,e.target.value)} style={fld}
            onFocus={e=>{ e.target.style.borderColor="rgba(230,168,23,0.6)"; e.target.style.boxShadow=`0 0 0 3px ${T.goldFaint}`; }}
            onBlur={e=>{ e.target.style.borderColor="rgba(255,255,255,0.14)"; e.target.style.boxShadow=""; }}
          />
        ))}
      </div>
      <input type="email" placeholder="Email (optional)" value={form.email} onChange={e=>set("email",e.target.value)} style={fld}
        onFocus={e=>{ e.target.style.borderColor="rgba(230,168,23,0.6)"; e.target.style.boxShadow=`0 0 0 3px ${T.goldFaint}`; }}
        onBlur={e=>{ e.target.style.borderColor="rgba(255,255,255,0.14)"; e.target.style.boxShadow=""; }}
      />
      <select value={form.service} onChange={e=>set("service",e.target.value)} style={selStyle(form.service)}>
        <option value="">Service needed *</option>
        {services.map(s=><option key={s.title} value={s.title}>{s.title}</option>)}
        <option value="Multiple Services">Multiple Services</option>
      </select>
      <select value={form.city} onChange={e=>set("city",e.target.value)} style={selStyle(form.city)}>
        <option value="">Your city *</option>
        {coverage.map(c=><option key={c} value={c}>{c}</option>)}
        <option value="Other">Other</option>
      </select>
      <textarea rows={4} placeholder="Additional details (optional)" value={form.message} onChange={e=>set("message",e.target.value)} style={{...fld,resize:"vertical"}}
        onFocus={e=>{ e.target.style.borderColor="rgba(230,168,23,0.6)"; e.target.style.boxShadow=`0 0 0 3px ${T.goldFaint}`; }}
        onBlur={e=>{ e.target.style.borderColor="rgba(255,255,255,0.14)"; e.target.style.boxShadow=""; }}
      />
      <GlowBtn wa style={{ width:"100%" }} disabled={!valid||status==="loading"} onClick={()=>{}}>
        {status==="loading" ? <><Loader2 size={16} style={{animation:"spin 1s linear infinite"}}/>Preparing…</> : <><Send size={15}/>Send via WhatsApp</>}
      </GlowBtn>
      {!valid && <p style={{margin:0,color:T.slateLight,fontSize:"0.78rem"}}><AlertCircle size={11} style={{display:"inline",marginRight:4}}/>Name, phone, service and city are required</p>}
    </form>
  );
}

/* ─── Marquee ─────────────────────────────────────────────── */
function Marquee() {
  return (
    <div style={{ background:"rgba(230,168,23,0.07)", borderTop:"1px solid rgba(230,168,23,0.14)", borderBottom:"1px solid rgba(230,168,23,0.14)", padding:"0.88rem 0", overflow:"hidden" }}>
      <div style={{ display:"flex", width:"max-content", animation:"marquee 30s linear infinite" }}>
        {marqueeItems.map((item,i)=>(
          <span key={i} style={{ color:T.gold, fontSize:"0.82rem", fontWeight:700, whiteSpace:"nowrap", padding:"0 2rem", letterSpacing:"0.09em" }}>{item}</span>
        ))}
      </div>
    </div>
  );
}

/* ─── Floating Orbs / Background ──────────────────────────── */
function BgOrbs({ gold = false }) {
  return (
    <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none", zIndex:0 }}>
      <div style={{ position:"absolute", width:700, height:700, borderRadius:"50%", background:gold?"radial-gradient(circle,rgba(230,168,23,0.06) 0%,transparent 68%)":"radial-gradient(circle,rgba(42,74,130,0.42) 0%,transparent 68%)", top:"-20%", right:"-12%", animation:"orbFloat 14s ease-in-out infinite" }}/>
      <div style={{ position:"absolute", width:500, height:500, borderRadius:"50%", background:gold?"radial-gradient(circle,rgba(230,168,23,0.04) 0%,transparent 68%)":"radial-gradient(circle,rgba(24,52,95,0.5) 0%,transparent 68%)", bottom:"-15%", left:"-8%", animation:"orbFloat 18s ease-in-out infinite reverse" }}/>
      <div style={{ position:"absolute", width:350, height:350, borderRadius:"50%", background:"radial-gradient(circle,rgba(42,74,130,0.28) 0%,transparent 68%)", top:"45%", left:"28%", animation:"orbFloat 11s ease-in-out infinite 2s" }}/>
    </div>
  );
}

/* ─── Service Card ────────────────────────────────────────── */
function ServiceCard({ svc, onOpen, delay = 0 }) {
  const Icon = svc.icon;
  const [hov, setHov] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onClick={()=>onOpen(svc)}
        onMouseEnter={()=>setHov(true)}
        onMouseLeave={()=>setHov(false)}
        style={{
          background:"rgba(255,255,255,0.04)", borderRadius:"1.35rem", overflow:"hidden",
          border: hov ? "1px solid rgba(230,168,23,0.25)" : "1px solid rgba(255,255,255,0.09)",
          boxShadow: hov ? "0 36px 80px rgba(0,0,0,0.42),0 0 0 1px rgba(230,168,23,0.12)" : "0 8px 32px rgba(0,0,0,0.22)",
          height:"100%", display:"flex", flexDirection:"column", position:"relative", cursor:"pointer",
          transform: hov ? "translateY(-8px)" : "none",
          transition:"transform .3s cubic-bezier(.22,.68,0,1.2), box-shadow .3s ease, border-color .3s",
        }}
      >
        {svc.popular && (
          <div style={{ position:"absolute", top:14, right:14, zIndex:3, background:T.gradGold, color:T.navy, borderRadius:"999px", padding:"0.3rem 0.78rem", fontSize:"0.74rem", fontWeight:800, boxShadow:"0 4px 18px rgba(230,168,23,0.45)", animation:"floatY 3s ease-in-out infinite" }}>
            ⚡ Most Popular
          </div>
        )}
        <div style={{ height:198, overflow:"hidden", position:"relative" }}>
          <img src={svc.image} alt={svc.title} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transform: hov ? "scale(1.09)" : "scale(1.01)", transition:"transform .55s cubic-bezier(.22,.68,0,1.2)" }}/>
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(9,20,40,0.88) 0%,transparent 58%)" }}/>
          <span style={{ position:"absolute", left:13, bottom:13, background:T.gradGold, color:T.navy, borderRadius:"999px", padding:"0.3rem 0.8rem", fontSize:"0.79rem", fontWeight:800, boxShadow:"0 4px 14px rgba(230,168,23,0.35)" }}>{svc.price}</span>
        </div>
        <div style={{ padding:"1.28rem", flex:1, display:"flex", flexDirection:"column" }}>
          <div style={{ display:"flex", alignItems:"center", gap:"0.65rem", marginBottom:"0.75rem" }}>
            <div style={{ width:37, height:37, borderRadius:"0.65rem", background: hov ? "rgba(230,168,23,0.15)" : "rgba(230,168,23,0.08)", border: hov ? "1px solid rgba(230,168,23,0.3)" : "1px solid rgba(230,168,23,0.15)", display:"flex", alignItems:"center", justifyContent:"center", transition:"background .25s, border-color .25s", transform: hov ? "scale(1.1) rotate(4deg)" : "none", transitionProperty:"background,border-color,transform" }}>
              <Icon size={17} style={{ color:T.gold }}/>
            </div>
            <h3 style={{ margin:0, color:"#fff", fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:"1.04rem" }}>{svc.title}</h3>
          </div>
          <p style={{ margin:"0 0 1rem", color:T.navyMuted, lineHeight:1.68, fontSize:"0.88rem", flex:1 }}>{svc.short}</p>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"0.5rem" }}>
            <span style={{ display:"flex", alignItems:"center", gap:"0.32rem", color:T.gold, fontWeight:700, fontSize:"0.87rem", transform: hov ? "translateX(3px)" : "none", transition:"transform .22s" }}>View details <ChevronRight size={13}/></span>
            <span style={{ color:T.navyMuted, fontSize:"0.77rem" }}><Clock3 size={11} style={{display:"inline",marginRight:3}}/>{svc.duration}</span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ─── Result Card (hover reveal) ─────────────────────────── */
function ResultCard({ item, delay = 0 }) {
  const [hov, setHov] = useState(false);
  return (
    <Reveal delay={delay}>
      <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
        style={{ borderRadius:"1.35rem", overflow:"hidden", border: hov?"1px solid rgba(230,168,23,0.2)":"1px solid rgba(255,255,255,0.09)", boxShadow: hov?"0 32px 72px rgba(0,0,0,0.42)":"0 18px 52px rgba(0,0,0,0.28)", transform: hov?"translateY(-6px)":"none", transition:"transform .3s cubic-bezier(.22,.68,0,1.2), box-shadow .3s, border-color .3s", cursor:"pointer" }}
      >
        <div style={{ position:"relative", overflow:"hidden" }}>
          <img src={item.image} alt={item.title} style={{ width:"100%", height:310, objectFit:"cover", display:"block", transform: hov?"scale(1.07)":"scale(1.01)", transition:"transform .55s cubic-bezier(.22,.68,0,1.2)" }}/>
          {/* Hover overlay shimmer */}
          <div style={{ position:"absolute", inset:0, background: hov ? "linear-gradient(135deg,rgba(230,168,23,0.08) 0%,transparent 60%,rgba(42,74,130,0.15) 100%)" : "transparent", transition:"background .4s ease" }}/>
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(9,20,40,0.88) 0%,transparent 55%)" }}/>
          <div style={{ position:"absolute", bottom:16, left:16, right:16, display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:"0.5rem" }}>
            <p style={{ margin:0, color:"#fff", fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:700, fontSize:"1.06rem", transform: hov?"translateY(-2px)":"none", transition:"transform .22s" }}>{item.title}</p>
            <span style={{ background:T.gradGold, color:T.navy, borderRadius:"999px", padding:"0.3rem 0.82rem", fontSize:"0.78rem", fontWeight:800 }}>{item.tag}</span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ─── Review Card ─────────────────────────────────────────── */
function ReviewCard({ r, delay = 0 }) {
  const [hov, setHov] = useState(false);
  return (
    <Reveal delay={delay}>
      <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{ background:"rgba(255,255,255,0.04)", border: hov?"1px solid rgba(230,168,23,0.22)":"1px solid rgba(255,255,255,0.09)", borderRadius:"1.2rem", padding:"1.52rem", height:"100%", transform: hov?"translateY(-5px)":"none", boxShadow: hov?"0 24px 60px rgba(0,0,0,0.3)":"0 4px 20px rgba(0,0,0,0.12)", transition:"transform .3s cubic-bezier(.22,.68,0,1.2), box-shadow .3s, border-color .3s" }}>
        <div style={{ display:"flex", gap:2, marginBottom:"0.75rem" }}>{Array.from({length:r.stars}).map((_,i)=><Star key={i} size={13} style={{color:T.gold,fill:T.gold}}/>)}</div>
        <p style={{ margin:"0 0 1rem", color:"rgba(255,255,255,0.7)", lineHeight:1.74, fontSize:"0.92rem" }}>"{r.text}"</p>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"0.5rem" }}>
          <p style={{ margin:0, fontWeight:700, fontSize:"0.84rem", color:"#fff" }}>{r.name} <span style={{fontWeight:400,color:T.navyMuted}}>— {r.location}</span></p>
          <span style={{ background:T.goldFaint, color:T.gold, borderRadius:"999px", padding:"0.2rem 0.66rem", fontSize:"0.73rem", fontWeight:700, border:"1px solid rgba(230,168,23,0.18)" }}>{r.service}</span>
        </div>
      </div>
    </Reveal>
  );
}

/* ─── Hero Slider ─────────────────────────────────────────── */
function HeroSlider({ openQuote }) {
  const [cur, setCur] = useState(0);
  const [prev, setPrev] = useState(null);
  const [textKey, setTextKey] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback((idx) => {
    setPrev(cur);
    setCur(idx);
    setTextKey(k => k + 1);
  }, [cur]);

  const next = useCallback(() => goTo((cur + 1) % heroSlides.length), [cur, goTo]);
  const prev_ = useCallback(() => goTo((cur - 1 + heroSlides.length) % heroSlides.length), [cur, goTo]);

  useInterval(next, paused ? null : 5500);

  const slide = heroSlides[cur];

  return (
    <div
      style={{ position:"relative", width:"100%", height:"100vh", minHeight:600, maxHeight:920, overflow:"hidden" }}
      onMouseEnter={()=>setPaused(true)}
      onMouseLeave={()=>setPaused(false)}
    >
      {/* Background layers */}
      {heroSlides.map((s, i) => (
        <div key={i} style={{
          position:"absolute", inset:0, zIndex:1,
          opacity: i === cur ? 1 : (i === prev ? 0 : 0),
          transition: "opacity 1.2s cubic-bezier(.4,0,.2,1)",
          transform: i === cur ? "scale(1.04)" : "scale(1.0)",
          animation: i === cur ? "kenBurns 6s ease-out forwards" : "none",
        }}>
          <img src={s.image} alt={s.tag} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
        </div>
      ))}

      {/* Gradient overlay */}
      <div style={{ position:"absolute", inset:0, zIndex:2, background:"linear-gradient(135deg,rgba(6,12,26,0.88) 0%,rgba(9,20,45,0.72) 50%,rgba(6,14,32,0.5) 100%)" }}/>
      {/* Bottom fade */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"30%", zIndex:3, background:"linear-gradient(to top,rgba(9,20,40,0.85),transparent)" }}/>
      {/* Grid texture */}
      <div style={{ position:"absolute", inset:0, zIndex:2, backgroundImage:"linear-gradient(rgba(255,255,255,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.022) 1px,transparent 1px)", backgroundSize:"64px 64px", maskImage:"radial-gradient(ellipse 85% 85% at 50% 50%,black 30%,transparent 100%)" }}/>

      {/* Floating orb */}
      <div style={{ position:"absolute", zIndex:2, width:600, height:600, borderRadius:"50%", background:"radial-gradient(circle,rgba(42,74,130,0.35) 0%,transparent 70%)", top:"-10%", right:"-8%", animation:"orbFloat 14s ease-in-out infinite", pointerEvents:"none" }}/>

      {/* Content */}
      <div style={{ position:"absolute", inset:0, zIndex:10, display:"flex", flexDirection:"column", justifyContent:"center", maxWidth:1300, margin:"0 auto", padding:"0 1.5rem", width:"100%" }}>

        {/* Animated text block */}
        <div key={textKey} style={{ maxWidth:720, paddingBottom:"1rem", animation:"heroTextIn .72s cubic-bezier(.22,.68,0,1.2) both" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem", background:"rgba(230,168,23,0.1)", border:"1px solid rgba(230,168,23,0.3)", borderRadius:"999px", padding:"0.42rem 1rem", marginBottom:"1.6rem" }}>
            <div style={{ width:7, height:7, borderRadius:"50%", background:T.gold, animation:"pulseDot 1.8s ease infinite" }}/>
            <span style={{ color:T.goldLight, fontSize:"0.82rem", fontWeight:700, letterSpacing:"0.05em" }}>Trusted exterior cleaning · Lower Mainland</span>
          </div>

          <h1 style={{ margin:"0 0 1.2rem", fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:"clamp(2.8rem,6.5vw,5.2rem)", lineHeight:1.0, letterSpacing:"-0.04em", color:"#fff" }}>
            {slide.headline.map((line, i) => (
              <span key={i} style={{ display:"block", animation:`heroLineIn .62s cubic-bezier(.22,.68,0,1.2) ${i * 90}ms both` }}>
                {i === 2 ? <span style={{ background:T.gradGold, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>{line}</span> : line}
              </span>
            ))}
          </h1>

          <p style={{ margin:"0 0 2.4rem", color:"rgba(255,255,255,0.68)", fontSize:"1.08rem", lineHeight:1.76, maxWidth:560, animation:"heroSubIn .7s cubic-bezier(.22,.68,0,1.2) .25s both" }}>
            {slide.sub}
          </p>

          <div style={{ display:"flex", gap:"0.88rem", flexWrap:"wrap", marginBottom:"2.6rem", animation:"heroCTAIn .7s cubic-bezier(.22,.68,0,1.2) .38s both" }}>
            <GlowBtn gold onClick={()=>openQuote()}>{slide.cta} <ArrowRight size={16}/></GlowBtn>
            <GlowBtn ghost href={`tel:${PHONE_RAW}`}><Phone size={15}/> {PHONE_DISPLAY}</GlowBtn>
            <GlowBtn wa href={buildWA(WA_DEFAULT_MSG)} target="_blank" rel="noopener noreferrer"><MessageCircle size={15}/> WhatsApp</GlowBtn>
          </div>

          <div style={{ display:"flex", gap:"1.5rem", flexWrap:"wrap", animation:"heroCTAIn .7s cubic-bezier(.22,.68,0,1.2) .5s both" }}>
            {["500+ Homes","5★ Rated","Same-Day","Insured"].map(t=>(
              <div key={t} style={{ display:"flex", alignItems:"center", gap:"0.4rem", color:"rgba(255,255,255,0.55)", fontSize:"0.84rem" }}>
                <CheckCircle2 size={13} style={{ color:T.gold }}/> {t}
              </div>
            ))}
          </div>
        </div>

        {/* Floating badges */}
        <div
  className="hero-badges"
  style={{
    position:"absolute",
    right:"1.5rem",
    top:"50%",
    transform:"translateY(-50%)",
    display:"flex",
    flexDirection:"column",
    gap:"0.85rem",
    maxWidth:"220px"
  }}
>
          <div style={{ background:"rgba(13,28,63,0.9)", backdropFilter:"blur(16px)", borderRadius:"1.1rem", padding:"0.88rem 1.1rem", border:"1px solid rgba(255,255,255,0.12)", animation:"floatY 5s ease-in-out infinite", display:"flex", alignItems:"center", gap:"0.7rem", boxShadow:"0 18px 48px rgba(0,0,0,0.35)", minWidth:180 }}>
            <div style={{ width:40, height:40, borderRadius:"0.7rem", background:"rgba(230,168,23,0.12)", border:"1px solid rgba(230,168,23,0.22)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <Clock3 size={18} style={{ color:T.gold }}/>
            </div>
            <div>
              <p style={{ margin:0, color:"rgba(255,255,255,0.48)", fontSize:"0.68rem", textTransform:"uppercase", letterSpacing:"0.08em" }}>Response</p>
              <p style={{ margin:0, color:"#fff", fontWeight:800, fontSize:"0.9rem" }}>Same day</p>
            </div>
          </div>
          <div style={{ background:"rgba(13,28,63,0.9)", backdropFilter:"blur(16px)", borderRadius:"1.1rem", padding:"0.88rem 1.1rem", border:"1px solid rgba(255,255,255,0.12)", animation:"floatY 6s ease-in-out infinite 1.2s", display:"flex", alignItems:"center", gap:"0.7rem", boxShadow:"0 18px 48px rgba(0,0,0,0.35)", minWidth:180 }}>
            <div style={{ display:"flex", gap:1.5, flexShrink:0 }}>{Array.from({length:5}).map((_,i)=><Star key={i} size={13} style={{color:T.gold,fill:T.gold}}/>)}</div>
            <p style={{ margin:0, color:"#fff", fontWeight:800, fontSize:"0.88rem" }}>5★ · 500+ Homes</p>
          </div>
          <div style={{ background:"rgba(13,28,63,0.9)", backdropFilter:"blur(16px)", borderRadius:"1.1rem", padding:"0.88rem 1.1rem", border:"1px solid rgba(255,255,255,0.12)", animation:"floatY 7s ease-in-out infinite 2.4s", display:"flex", alignItems:"center", gap:"0.7rem", boxShadow:"0 18px 48px rgba(0,0,0,0.35)", minWidth:180 }}>
            <div style={{ width:40, height:40, borderRadius:"0.7rem", background:"rgba(230,168,23,0.12)", border:"1px solid rgba(230,168,23,0.22)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <ShieldCheck size={18} style={{ color:T.gold }}/>
            </div>
            <div>
              <p style={{ margin:0, color:"rgba(255,255,255,0.48)", fontSize:"0.68rem", textTransform:"uppercase", letterSpacing:"0.08em" }}>Licensed</p>
              <p style={{ margin:0, color:"#fff", fontWeight:800, fontSize:"0.9rem" }}>& Insured</p>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Controls */}
      <div style={{ position:"absolute", bottom:28, left:0, right:0, zIndex:20, display:"flex", alignItems:"center", justifyContent:"center", gap:"1rem" }}>
        {/* Prev */}
        <button onClick={prev_} style={{ width:40, height:40, borderRadius:"50%", background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.18)", backdropFilter:"blur(8px)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"#fff", transition:"background .2s, transform .2s" }}
          onMouseEnter={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.2)"; e.currentTarget.style.transform="scale(1.08)"; }}
          onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.1)"; e.currentTarget.style.transform=""; }}
        ><ChevronLeft size={17}/></button>
        {/* Dots */}
        <div style={{ display:"flex", gap:"0.55rem", alignItems:"center" }}>
          {heroSlides.map((_,i)=>(
            <button key={i} onClick={()=>goTo(i)} style={{ width: i===cur?"28px":"8px", height:"8px", borderRadius:"4px", background: i===cur?T.gold:"rgba(255,255,255,0.35)", border:"none", cursor:"pointer", padding:0, transition:"width .35s cubic-bezier(.22,.68,0,1.2), background .3s" }}/>
          ))}
        </div>
        {/* Next */}
        <button onClick={next} style={{ width:40, height:40, borderRadius:"50%", background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.18)", backdropFilter:"blur(8px)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"#fff", transition:"background .2s, transform .2s" }}
          onMouseEnter={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.2)"; e.currentTarget.style.transform="scale(1.08)"; }}
          onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.1)"; e.currentTarget.style.transform=""; }}
        ><ChevronRight size={17}/></button>
      </div>

      {/* Progress bar */}
      <div style={{ position:"absolute", bottom:0, left:0, right:0, height:2, zIndex:21, background:"rgba(255,255,255,0.1)" }}>
        <div key={cur} style={{ height:"100%", background:T.gradGold, animation:`progressBar ${paused?10000:5500}ms linear forwards`, transformOrigin:"left" }}/>
      </div>
    </div>
  );
}

/* ─── Stats Strip ─────────────────────────────────────────── */
function StatsStrip() {
  return (
    <div style={{ background:"rgba(0,0,0,0.35)", borderTop:"1px solid rgba(255,255,255,0.08)", position:"relative", zIndex:5 }}>
      <div className="stats-grid" style={{ maxWidth:1300, margin:"0 auto", padding:"1.1rem 1.5rem", display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1rem" }}>
        {[{v:"24hr",l:"Quote response"},{v:"5★",l:"Top-rated service"},{v:"500+",l:"Homes cleaned"},{v:"100%",l:"Satisfaction focus"}].map((s,i)=>(
          <Reveal key={s.l} delay={i*80} from="bottom" distance={16}>
            <div style={{ textAlign:"center" }}>
              <p style={{ margin:0, fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:"1.6rem", background:T.gradGold, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>{s.v}</p>
              <p style={{ margin:0, fontSize:"0.79rem", color:T.navyMuted }}>{s.l}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Page ───────────────────────────────────────────── */
export default function HomePage() {
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [quoteOpen,    setQuoteOpen]    = useState(false);
  const [quotePrefill, setQuotePrefill] = useState("");
  const [selSvc,       setSelSvc]       = useState(null);
  const [svcOpen,      setSvcOpen]      = useState(false);
  const [areaSearch,   setAreaSearch]   = useState("");
  const [areaResult,   setAreaResult]   = useState(null);
  const [stickyIn,     setStickyIn]     = useState(false);
  const [activeNav,    setActiveNav]    = useState("");
  const scrollY = useScrollY();

  const openQuote   = (pre = "") => { setQuotePrefill(pre); setQuoteOpen(true); };
  const openService = (s)         => { setSelSvc(s); setSvcOpen(true); };
  const scrollTo    = (id)        => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior:"smooth", block:"start" });
  };

  const checkArea = () => {
    const q = areaSearch.toLowerCase().trim(); if (!q) return;
    const match = coverage.find(c=>c.toLowerCase().includes(q));
    setAreaResult(match ? { found:true, city:match } : { found:false });
  };

  // Sticky bar appears after scrolling past hero
  useEffect(() => {
    setStickyIn(scrollY > 520);
  }, [scrollY]);

  // Active nav section detection
  useEffect(() => {
    const ids = ["services","results","why-us","coverage","reviews","contact"];
    const els = ids.map(id=>document.getElementById(id)).filter(Boolean);
    const handler = () => {
      const sc = window.scrollY + 120;
      let found = "";
      for (const el of els) {
        if (el.offsetTop <= sc) found = el.id;
      }
      setActiveNav(found);
    };
    window.addEventListener("scroll", handler, { passive:true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label:"Services", id:"services" }, { label:"Results", id:"results" }, { label:"Why Us", id:"why-us" },
    { label:"Coverage", id:"coverage" }, { label:"Reviews", id:"reviews" }, { label:"Contact", id:"contact" },
  ];

  const scrolled = scrollY > 60;

  return (
    <div style={{ minHeight:"100vh", background:T.navyDeep, color:"#fff", fontFamily:"'DM Sans',system-ui,sans-serif" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Bricolage+Grotesque:wght@600;700;800&display=swap');
        *,*::before,*::after{box-sizing:border-box;}
        html{scroll-behavior:smooth;}
        body{margin:0;}
        a{color:inherit;text-decoration:none;}
        input,textarea,select,button{font-family:inherit;}
        input::placeholder,textarea::placeholder{color:rgba(255,255,255,0.32);}
        select option{background:#172e58;color:#fff;}
        ::-webkit-scrollbar{width:5px;}
        ::-webkit-scrollbar-track{background:${T.navyDeep};}
        ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.14);border-radius:3px;}

        @keyframes spin       { to{transform:rotate(360deg);} }
        @keyframes mfadeIn    { from{opacity:0;}to{opacity:1;} }
        @keyframes mslideUp   { from{opacity:0;transform:translateY(28px) scale(.96);}to{opacity:1;transform:none;} }
        @keyframes orbFloat   { 0%,100%{transform:translate(0,0) scale(1);}33%{transform:translate(18px,-18px) scale(1.03);}66%{transform:translate(-10px,12px) scale(.97);} }
        @keyframes marquee    { from{transform:translateX(0);}to{transform:translateX(-50%);} }
        @keyframes pulseDot   { 0%,100%{box-shadow:0 0 0 0 rgba(230,168,23,0.6);}70%{box-shadow:0 0 0 9px rgba(230,168,23,0);} }
        @keyframes pulseWA    { 0%,100%{box-shadow:0 8px 32px rgba(37,211,102,0.5);}50%{box-shadow:0 8px 32px rgba(37,211,102,0.5),0 0 0 12px rgba(37,211,102,0);} }
        @keyframes floatY     { 0%,100%{transform:translateY(0);}50%{transform:translateY(-9px);} }
        @keyframes kenBurns   { from{transform:scale(1.04);}to{transform:scale(1.12);} }
        @keyframes heroTextIn { from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:none;} }
        @keyframes heroLineIn { from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:none;} }
        @keyframes heroSubIn  { from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:none;} }
        @keyframes heroCTAIn  { from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:none;} }
        @keyframes progressBar{ from{transform:scaleX(0);}to{transform:scaleX(1);} }
        @keyframes stickyIn   { from{transform:translateY(100%);opacity:0;}to{transform:none;opacity:1;} }
        @keyframes gradShift  { 0%,100%{background-position:0% 50%;}50%{background-position:100% 50%;} }

        .nav-link-inner{position:relative;padding-bottom:2px;}
        .nav-link-inner::after{content:'';position:absolute;bottom:0;left:0;width:100%;height:2px;background:${T.gradGold};transform:scaleX(0);transform-origin:left;transition:transform .28s cubic-bezier(.22,.68,0,1.2);}
        .nav-link-btn:hover .nav-link-inner::after,.nav-link-btn.active .nav-link-inner::after{transform:scaleX(1);}
        .nav-link-btn:hover .nav-link-inner,.nav-link-btn.active .nav-link-inner{color:#fff !important;}

        .city-pill:hover{background:${T.goldFaint} !important;border-color:rgba(230,168,23,0.4) !important;color:${T.gold} !important;}

        
        @media(max-width:920px){
          .desktop-nav{display:none !important;}
          .menu-btn{display:flex !important;}
          .two-col{grid-template-columns:1fr !important;gap:2rem !important;}
          .stats-grid{grid-template-columns:repeat(2,1fr) !important;}
          .svc-grid{grid-template-columns:repeat(2,1fr) !important;}
          .cta-row{flex-direction:column !important;}
          .cta-row>*{width:100% !important;justify-content:center;}
          .hero-ctas{flex-direction:column !important;}
          .hero-ctas>*{width:100% !important;justify-content:center;}
        }
        @media(max-width:620px){
          .svc-grid{grid-template-columns:1fr !important;}
          .results-grid{grid-template-columns:1fr !important;}
          .trust-grid{grid-template-columns:1fr !important;}
          .city-grid{grid-template-columns:repeat(2,1fr) !important;}
          .footer-grid{grid-template-columns:1fr 1fr !important;}
          .form-name-row{grid-template-columns:1fr !important;}
          .wa-label{display:none !important;}
          .sticky-label{display:none !important;}
          .sticky-bar{padding:0.65rem 0.75rem !important;gap:0.5rem !important;}
        }
          /* ===== HERO BADGES MOBILE FIX ===== */
@media (max-width: 920px){
  .hero-badges{
    position: static !important;
    transform: none !important;
    margin-top: 1.5rem;
    flex-direction: column !important;
    align-items: flex-start !important;
    width: 100%;
  }
}

@media (max-width: 620px){
  .hero-badges{
    gap: 0.6rem !important;
  }

  .hero-badges > div{
    width: 100% !important;
    justify-content: flex-start !important;
  }
}
          
      `}</style>
      

      {/* ════ HEADER ════ */}
      <header style={{
        position:"fixed", top:0, left:0, right:0, zIndex:900,
        background: scrolled ? "rgba(7,15,32,0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(22px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
        transition:"background .4s ease, backdrop-filter .4s ease, border-color .4s ease",
        minHeight: scrolled ? 66 : 74,
        transitionProperty:"background,backdrop-filter,border-color,min-height",
      }}>
        <div style={{ maxWidth:1300, margin:"0 auto", padding:"0 1.5rem", minHeight:"inherit", display:"flex", alignItems:"center", justifyContent:"space-between", gap:"1rem" }}>

          {/* Logo */}
          <button onClick={()=>scrollTo("hero")} style={{ display:"flex", alignItems:"center", gap:"0.75rem", background:"none", border:"none", cursor:"pointer", padding:0 }}>
            <div style={{ width:44, height:44, borderRadius:"0.85rem", background:"linear-gradient(135deg,#1a3566,#0d1c3f)", border:"1px solid rgba(230,168,23,0.38)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 18px rgba(0,0,0,0.32)", flexShrink:0 }}>
              <Sparkles size={19} style={{ color:T.gold }}/>
            </div>
            <div>
              <p style={{ margin:0, fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:"1.06rem", color:"#fff", letterSpacing:"-0.022em" }}>Keystoners</p>
              <p style={{ margin:0, color:T.navyMuted, fontSize:"0.68rem", letterSpacing:"0.08em" }}>EXTERIOR CLEANING</p>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="desktop-nav" style={{ display:"flex", gap:"0.25rem" }}>
            {navLinks.map(l=>(
              <button key={l.id} onClick={()=>scrollTo(l.id)} className={`nav-link-btn${activeNav===l.id?" active":""}`} style={{ background:"none", border:"none", cursor:"pointer", padding:"0.45rem 0.7rem", borderRadius:"0.6rem", transition:"background .18s" }}
                onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.06)"}
                onMouseLeave={e=>e.currentTarget.style.background="transparent"}
              >
                <span className="nav-link-inner" style={{ color: activeNav===l.id ? "#fff" : T.navyMuted, fontSize:"0.88rem", fontWeight:500, letterSpacing:"0.01em", transition:"color .18s" }}>
                  {l.label}
                </span>
              </button>
            ))}
          </nav>

          {/* Right Actions */}
          <div style={{ display:"flex", gap:"0.6rem", alignItems:"center" }}>
            <a href={`tel:${PHONE_RAW}`} style={{ display:"flex", alignItems:"center", gap:"0.44rem", background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.13)", borderRadius:"0.72rem", padding:"0.58rem 0.95rem", fontWeight:600, fontSize:"0.86rem", color:"#fff", transition:"background .2s" }}
              onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.12)"}
              onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,0.07)"}
            >
              <Phone size={14}/><span className="wa-label">{PHONE_DISPLAY}</span>
            </a>
            <GlowBtn gold onClick={()=>openQuote()} style={{ padding:"0.62rem 1.1rem", fontSize:"0.9rem", borderRadius:"0.72rem" }}>Free Quote</GlowBtn>
            <button className="menu-btn" onClick={()=>setMobileOpen(v=>!v)} style={{ display:"none", width:42, height:42, alignItems:"center", justifyContent:"center", background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.13)", borderRadius:"0.75rem", cursor:"pointer", color:"#fff" }}>
              {mobileOpen ? <X size={18}/> : <Menu size={18}/>}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div style={{ background:"rgba(7,15,32,0.98)", backdropFilter:"blur(22px)", borderTop:"1px solid rgba(255,255,255,0.08)", padding:"0.6rem 1.5rem 1.3rem", animation:"mfadeIn .2s ease" }}>
            {navLinks.map(l=>(
              <button key={l.id} onClick={()=>scrollTo(l.id)} style={{ display:"block", width:"100%", textAlign:"left", background:"none", border:"none", color:"rgba(255,255,255,0.82)", padding:"0.88rem 0", borderBottom:"1px solid rgba(255,255,255,0.06)", fontSize:"0.97rem", cursor:"pointer" }}>{l.label}</button>
            ))}
            <GlowBtn gold onClick={()=>{setMobileOpen(false);openQuote();}} style={{ marginTop:"0.9rem", width:"100%", padding:"0.95rem" }}>Get Free Quote</GlowBtn>
          </div>
        )}
      </header>

      {/* ════ HERO SLIDER ════ */}
      <section id="hero">
        <HeroSlider openQuote={openQuote}/>
        <div style={{ background:`linear-gradient(145deg,#060f22,#0d1c3f,#18345f)` }}>
          <StatsStrip/>
        </div>
      </section>

      {/* ════ MARQUEE ════ */}
      <Marquee/>

      {/* ════ SERVICES ════ */}
      <section id="services" style={{ background:T.navyDeep, padding:"6.5rem 1.5rem", position:"relative" }}>
        <BgOrbs/>
        <div style={{ maxWidth:1300, margin:"0 auto", position:"relative", zIndex:1 }}>
          <Reveal>
            <div style={{ textAlign:"center", marginBottom:"3.4rem" }}>
              <p style={{ margin:"0 0 0.55rem", fontSize:"0.74rem", textTransform:"uppercase", letterSpacing:"0.22em", color:T.gold, fontWeight:700 }}>Our Services</p>
              <h2 style={{ margin:"0 0 0.82rem", fontFamily:"'Bricolage Grotesque',sans-serif", color:"#fff", fontWeight:800, fontSize:"clamp(2rem,3.8vw,3rem)", letterSpacing:"-0.028em" }}>Everything your exterior needs</h2>
              <p style={{ margin:"0 auto", color:T.navyMuted, maxWidth:520, lineHeight:1.76 }}>Click any service to see what's included, starting price and how to get booked.</p>
            </div>
          </Reveal>
          <div className="svc-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1.3rem" }}>
            {services.map((svc, i) => <ServiceCard key={svc.title} svc={svc} onOpen={openService} delay={i * 70}/>)}
          </div>
        </div>
      </section>

      {/* ════ RESULTS ════ */}
      <section id="results" style={{ background:`linear-gradient(180deg,${T.navyMid} 0%,${T.navyDeep} 100%)`, padding:"6.5rem 1.5rem", position:"relative" }}>
        <BgOrbs/>
        <div style={{ maxWidth:1300, margin:"0 auto", position:"relative", zIndex:1 }}>
          <Reveal>
            <div style={{ textAlign:"center", marginBottom:"3.2rem" }}>
              <p style={{ margin:"0 0 0.55rem", fontSize:"0.74rem", textTransform:"uppercase", letterSpacing:"0.22em", color:T.gold, fontWeight:700 }}>Real Work</p>
              <h2 style={{ margin:"0 0 0.82rem", fontFamily:"'Bricolage Grotesque',sans-serif", color:"#fff", fontWeight:800, fontSize:"clamp(2rem,3.8vw,3rem)", letterSpacing:"-0.028em" }}>Results that speak for themselves</h2>
              <p style={{ margin:"0 auto", color:T.navyMuted, maxWidth:520, lineHeight:1.76 }}>Every job is treated with care and attention to detail — here's what that looks like on site.</p>
            </div>
          </Reveal>
          <div className="results-grid" style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"1.2rem" }}>
            {beforeAfter.map((item, i) => <ResultCard key={item.title} item={item} delay={i*75}/>)}
          </div>
          <Reveal delay={220}>
            <div style={{ textAlign:"center", marginTop:"3rem" }}>
              <GlowBtn gold onClick={()=>openQuote()}>Get My Free Quote <ArrowRight size={16}/></GlowBtn>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════ WHY US ════ */}
      <section id="why-us" style={{ background:T.navyDeep, padding:"6.5rem 1.5rem", position:"relative" }}>
        <BgOrbs/>
        <div style={{ maxWidth:1300, margin:"0 auto", position:"relative", zIndex:1 }}>
          <div className="two-col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"5rem", alignItems:"center" }}>

            <Reveal from="left">
              <p style={{ margin:"0 0 0.55rem", fontSize:"0.74rem", textTransform:"uppercase", letterSpacing:"0.22em", color:T.gold, fontWeight:700 }}>Why Keystoners</p>
              <h2 style={{ margin:"0 0 1.1rem", fontFamily:"'Bricolage Grotesque',sans-serif", color:"#fff", fontWeight:800, fontSize:"clamp(2rem,3.5vw,2.9rem)", lineHeight:1.07, letterSpacing:"-0.028em" }}>
                Professional service.<br/>No surprises.
              </h2>
              <p style={{ margin:"0 0 2rem", color:T.navyMuted, lineHeight:1.82, maxWidth:430 }}>
                Honest communication, fast quotes, safe cleaning methods and a clean finish every time. No contracts, no pressure, no hidden fees.
              </p>
              <div className="cta-row" style={{ display:"flex", gap:"0.85rem", flexWrap:"wrap" }}>
                <GlowBtn gold onClick={()=>openQuote()}>Get Free Quote <ArrowRight size={15}/></GlowBtn>
                <GlowBtn wa href={buildWA(WA_DEFAULT_MSG)} target="_blank" rel="noopener noreferrer"><MessageCircle size={15}/> WhatsApp</GlowBtn>
              </div>
            </Reveal>

            <div className="trust-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
              {[
                { icon:BadgeCheck,  title:"No-pressure quotes",  body:"Clear guidance with no confusing sales tactics." },
                { icon:Zap,         title:"Same-day response",    body:"Most requests answered within hours — often same day." },
                { icon:ThumbsUp,    title:"Proven clean results", body:"Care, attention and thorough finish on every job." },
                { icon:ShieldCheck, title:"Safe methods",         body:"Soft-wash techniques protect your surfaces." },
                { icon:MapPin,      title:"Local team",           body:"A local Lower Mainland crew — not a franchise." },
                { icon:Award,       title:"5-star track record",  body:"Hundreds of satisfied homeowners across BC." },
              ].map((tp, i) => {
                const Icon = tp.icon;
                return (
                  <Reveal key={tp.title} delay={i*65}>
                    <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.09)", borderRadius:"1.1rem", padding:"1.28rem", transition:"border-color .25s, background .25s, transform .25s" }}
                      onMouseEnter={e=>{ e.currentTarget.style.background="rgba(230,168,23,0.05)"; e.currentTarget.style.borderColor="rgba(230,168,23,0.22)"; e.currentTarget.style.transform="translateY(-4px)"; }}
                      onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.09)"; e.currentTarget.style.transform=""; }}
                    >
                      <div style={{ width:40, height:40, borderRadius:"0.72rem", background:"rgba(230,168,23,0.09)", border:"1px solid rgba(230,168,23,0.18)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"0.88rem" }}>
                        <Icon size={18} style={{ color:T.gold }}/>
                      </div>
                      <p style={{ margin:"0 0 0.3rem", color:"#fff", fontWeight:700, fontSize:"0.92rem" }}>{tp.title}</p>
                      <p style={{ margin:0, color:T.navyMuted, lineHeight:1.66, fontSize:"0.83rem" }}>{tp.body}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ════ COVERAGE + REVIEWS PREVIEW ════ */}
      <section id="coverage" style={{ background:`linear-gradient(180deg,${T.navyMid} 0%,${T.navyDeep} 100%)`, padding:"6.5rem 1.5rem", position:"relative" }}>
        <BgOrbs/>
        <div style={{ maxWidth:1300, margin:"0 auto", position:"relative", zIndex:1 }}>
          <div className="two-col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.5rem" }}>

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
                  {coverage.map(city=>(
                    <div key={city} className="city-pill" onClick={()=>{ setAreaSearch(city); setAreaResult({found:true,city}); }} style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.09)", borderRadius:"0.65rem", padding:"0.62rem 0.5rem", textAlign:"center", color:T.navyMuted, fontSize:"0.81rem", cursor:"pointer", transition:"all .2s" }}>{city}</div>
                  ))}
                </div>
                <div style={{ display:"flex", gap:"0.65rem" }}>
                  <input value={areaSearch} onChange={e=>{ setAreaSearch(e.target.value); setAreaResult(null); }} onKeyDown={e=>e.key==="Enter"&&checkArea()} placeholder="Type your city…" style={fld}
                    onFocus={e=>{ e.target.style.borderColor="rgba(230,168,23,0.55)"; e.target.style.boxShadow=`0 0 0 3px ${T.goldFaint}`; }}
                    onBlur={e=>{ e.target.style.borderColor="rgba(255,255,255,0.14)"; e.target.style.boxShadow=""; }}
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

            <Reveal delay={85}>
              <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"1.45rem", padding:"1.95rem", height:"100%" }}>
                <p style={{ margin:"0 0 0.42rem", fontSize:"0.74rem", textTransform:"uppercase", letterSpacing:"0.22em", color:T.gold, fontWeight:700 }}>Top Reviews</p>
                <h3 style={{ margin:"0 0 1.38rem", color:"#fff", fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:"1.22rem" }}>Why homeowners choose Keystoners</h3>
                <div style={{ display:"flex", flexDirection:"column", gap:"0.92rem" }}>
                  {reviews.slice(0,3).map((r,i)=>(
                    <div key={i} style={{ background:"rgba(255,255,255,0.05)", borderRadius:"1rem", padding:"1.08rem", border:"1px solid rgba(255,255,255,0.07)" }}>
                      <div style={{ display:"flex", gap:2, marginBottom:"0.44rem" }}>{Array.from({length:r.stars}).map((_,idx)=><Star key={idx} size={12} style={{color:T.gold,fill:T.gold}}/>)}</div>
                      <p style={{ margin:"0 0 0.6rem", color:"rgba(255,255,255,0.72)", lineHeight:1.66, fontSize:"0.87rem" }}>"{r.text}"</p>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"0.4rem" }}>
                        <p style={{ margin:0, color:"#fff", fontWeight:700, fontSize:"0.83rem" }}>{r.name} <span style={{fontWeight:400,color:T.navyMuted}}>— {r.location}</span></p>
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

      {/* ════ ALL REVIEWS ════ */}
      <section id="reviews" style={{ background:T.navyDeep, padding:"6.5rem 1.5rem", position:"relative" }}>
        <BgOrbs/>
        <div style={{ maxWidth:1300, margin:"0 auto", position:"relative", zIndex:1 }}>
          <Reveal>
            <div style={{ textAlign:"center", marginBottom:"3rem" }}>
              <p style={{ margin:"0 0 0.55rem", fontSize:"0.74rem", textTransform:"uppercase", letterSpacing:"0.22em", color:T.gold, fontWeight:700 }}>All Reviews</p>
              <h2 style={{ margin:"0 0 0.82rem", fontFamily:"'Bricolage Grotesque',sans-serif", color:"#fff", fontWeight:800, fontSize:"clamp(2rem,3.8vw,3rem)", letterSpacing:"-0.028em" }}>What customers are saying</h2>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"0.32rem" }}>
                {Array.from({length:5}).map((_,i)=><Star key={i} size={18} style={{color:T.gold,fill:T.gold}}/>)}
                <span style={{ color:T.navyMuted, marginLeft:"0.46rem", fontSize:"0.88rem" }}>5.0 average · 100+ reviews</span>
              </div>
            </div>
          </Reveal>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"1.15rem" }}>
            {reviews.map((r, i) => <ReviewCard key={i} r={r} delay={i*68}/>)}
          </div>
        </div>
      </section>

      {/* ════ FAQ ════ */}
      <section id="faq" style={{ background:`linear-gradient(180deg,${T.navyMid} 0%,${T.navyDeep} 100%)`, padding:"6.5rem 1.5rem", position:"relative" }}>
        <BgOrbs/>
        <div style={{ maxWidth:820, margin:"0 auto", position:"relative", zIndex:1 }}>
          <Reveal>
            <div style={{ textAlign:"center", marginBottom:"2.8rem" }}>
              <p style={{ margin:"0 0 0.55rem", fontSize:"0.74rem", textTransform:"uppercase", letterSpacing:"0.22em", color:T.gold, fontWeight:700 }}>FAQ</p>
              <h2 style={{ margin:0, fontFamily:"'Bricolage Grotesque',sans-serif", color:"#fff", fontWeight:800, fontSize:"clamp(2rem,3.8vw,3rem)", letterSpacing:"-0.028em" }}>Common questions</h2>
            </div>
          </Reveal>
          <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"1.45rem", padding:"0.4rem 1.65rem" }}>
            {faqs.map((f,i)=>(
              <Reveal key={i} delay={i*58}><FAQItem q={f.q} a={f.a}/></Reveal>
            ))}
          </div>
          <Reveal delay={210}>
            <div style={{ textAlign:"center", marginTop:"2.5rem" }}>
              <p style={{ color:T.navyMuted, marginBottom:"1.1rem" }}>Still have questions?</p>
              <div style={{ display:"flex", gap:"0.82rem", justifyContent:"center", flexWrap:"wrap" }}>
                <GlowBtn gold onClick={()=>openQuote()}>Get a Free Quote</GlowBtn>
                <GlowBtn wa href={buildWA(WA_DEFAULT_MSG)} target="_blank" rel="noopener noreferrer"><MessageCircle size={15}/> WhatsApp Us</GlowBtn>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════ CTA BANNER ════ */}
      <section style={{ background:T.gradGold, backgroundSize:"200% 200%", animation:"gradShift 8s ease infinite", padding:"4.8rem 1.5rem", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(ellipse 55% 75% at 88% 50%,rgba(255,255,255,0.14) 0%,transparent 60%)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(ellipse 35% 50% at 12% 50%,rgba(255,255,255,0.07) 0%,transparent 55%)", pointerEvents:"none" }}/>
        <div style={{ maxWidth:1100, margin:"0 auto", position:"relative" }}>
          <Reveal>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:"2rem", flexWrap:"wrap" }}>
              <div>
                <h2 style={{ margin:"0 0 0.55rem", fontFamily:"'Bricolage Grotesque',sans-serif", color:T.navy, fontWeight:800, fontSize:"clamp(1.85rem,3.2vw,2.65rem)", letterSpacing:"-0.025em" }}>Ready to clean up your property?</h2>
                <p style={{ margin:0, color:"rgba(10,22,40,0.64)", fontSize:"1.02rem" }}>Free quote in under 24 hours. No pressure, no obligation.</p>
              </div>
              <div className="cta-row" style={{ display:"flex", gap:"0.82rem", flexWrap:"wrap" }}>
                <button onClick={()=>openQuote()} style={{ background:T.navy, color:"#fff", border:"none", borderRadius:"0.9rem", padding:"1.05rem 1.72rem", fontWeight:800, cursor:"pointer", display:"flex", alignItems:"center", gap:"0.5rem", fontSize:"1rem", fontFamily:"inherit", transition:"transform .22s, box-shadow .22s", boxShadow:"0 8px 26px rgba(9,20,40,0.3)" }}
                  onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 18px 44px rgba(9,20,40,0.45)"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow="0 8px 26px rgba(9,20,40,0.3)"; }}
                >
                  Get Free Quote <ArrowRight size={16}/>
                </button>
                <a href={`tel:${PHONE_RAW}`} style={{ display:"flex", alignItems:"center", gap:"0.5rem", background:"rgba(9,20,40,0.1)", color:T.navy, border:"1px solid rgba(9,20,40,0.18)", borderRadius:"0.9rem", padding:"1.05rem 1.5rem", fontWeight:700, fontSize:"0.97rem", transition:"background .2s" }}>
                  <Phone size={15}/> {PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════ CONTACT ════ */}
      <section id="contact" style={{ background:T.navyDeep, padding:"6.5rem 1.5rem", position:"relative" }}>
        <BgOrbs/>
        <div style={{ maxWidth:1300, margin:"0 auto", position:"relative", zIndex:1 }}>
          <div className="two-col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"5rem", alignItems:"start" }}>

            <Reveal from="left">
              <p style={{ margin:"0 0 0.55rem", fontSize:"0.74rem", textTransform:"uppercase", letterSpacing:"0.22em", color:T.gold, fontWeight:700 }}>Contact Us</p>
              <h2 style={{ margin:"0 0 1.1rem", fontFamily:"'Bricolage Grotesque',sans-serif", color:"#fff", fontWeight:800, fontSize:"clamp(2rem,3.3vw,2.9rem)", lineHeight:1.07, letterSpacing:"-0.028em" }}>
                Request your<br/>free quote
              </h2>
              <p style={{ margin:"0 0 2rem", color:T.navyMuted, lineHeight:1.82, maxWidth:395 }}>
                Fill the form and it opens WhatsApp with your quote details pre-filled. We reply the same day.
              </p>
              <div style={{ display:"flex", flexDirection:"column", gap:"1.25rem" }}>
                {[
                  { icon:Phone,  label:"Phone",        value:PHONE_DISPLAY, href:`tel:${PHONE_RAW}` },
                  { icon:Clock3, label:"Response Time", value:"Same day to 24 hours" },
                  { icon:MapPin, label:"Coverage Area", value:"Vancouver & Lower Mainland" },
                ].map(item=>{
                  const Icon = item.icon;
                  return (
                    <div key={item.label} style={{ display:"flex", alignItems:"center", gap:"0.92rem" }}>
                      <div style={{ width:46, height:46, borderRadius:"0.82rem", background:"rgba(230,168,23,0.09)", border:"1px solid rgba(230,168,23,0.18)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <Icon size={19} style={{ color:T.gold }}/>
                      </div>
                      <div>
                        <p style={{ margin:0, fontSize:"0.72rem", color:T.navyMuted, textTransform:"uppercase", letterSpacing:"0.09em" }}>{item.label}</p>
                        {item.href
                          ? <a href={item.href} style={{ color:"#fff", fontWeight:700, fontSize:"0.96rem" }}>{item.value}</a>
                          : <p style={{ margin:0, color:"#fff", fontWeight:700, fontSize:"0.96rem" }}>{item.value}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>

            <Reveal delay={95}><ContactForm/></Reveal>
          </div>
        </div>
      </section>

      {/* ════ FOOTER ════ */}
      <footer style={{ background:"rgba(3,8,20,0.99)", color:"rgba(255,255,255,0.48)", borderTop:"1px solid rgba(255,255,255,0.07)" }}>
        <div className="footer-grid" style={{ maxWidth:1300, margin:"0 auto", padding:"3.8rem 1.5rem 2.2rem", display:"grid", gridTemplateColumns:"1.65fr 1fr 1fr 1fr", gap:"2.5rem" }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:"0.78rem", marginBottom:"1.12rem" }}>
              <div style={{ width:42, height:42, borderRadius:"0.75rem", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(230,168,23,0.26)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Sparkles size={17} style={{ color:T.gold }}/>
              </div>
              <span style={{ color:"#fff", fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:"1.04rem", letterSpacing:"-0.022em" }}>Keystoners</span>
            </div>
            <p style={{ margin:"0 0 1.12rem", lineHeight:1.75, maxWidth:265, fontSize:"0.87rem" }}>Professional exterior cleaning across Vancouver and the Lower Mainland.</p>
            <a href={`tel:${PHONE_RAW}`} style={{ color:T.gold, fontWeight:700, fontSize:"0.9rem" }}>{PHONE_DISPLAY}</a>
          </div>
          <div>
            <p style={{ margin:"0 0 0.92rem", color:"rgba(255,255,255,0.82)", fontWeight:700, fontSize:"0.87rem" }}>Services</p>
            {services.map(s=>(
              <button key={s.title} onClick={()=>openService(s)} style={{ display:"block", background:"none", border:"none", padding:"0.32rem 0", color:"rgba(255,255,255,0.46)", cursor:"pointer", fontSize:"0.85rem", textAlign:"left", transition:"color .18s" }}
                onMouseEnter={e=>e.currentTarget.style.color="rgba(255,255,255,0.88)"}
                onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.46)"}
              >{s.title}</button>
            ))}
          </div>
          <div>
            <p style={{ margin:"0 0 0.92rem", color:"rgba(255,255,255,0.82)", fontWeight:700, fontSize:"0.87rem" }}>Pages</p>
            {[["Why Us","why-us"],["Results","results"],["Reviews","reviews"],["FAQ","faq"],["Contact","contact"]].map(([l,id])=>(
              <button key={id} onClick={()=>scrollTo(id)} style={{ display:"block", background:"none", border:"none", padding:"0.32rem 0", color:"rgba(255,255,255,0.46)", cursor:"pointer", fontSize:"0.85rem", textAlign:"left", transition:"color .18s" }}
                onMouseEnter={e=>e.currentTarget.style.color="rgba(255,255,255,0.88)"}
                onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.46)"}
              >{l}</button>
            ))}
          </div>
          <div>
            <p style={{ margin:"0 0 0.92rem", color:"rgba(255,255,255,0.82)", fontWeight:700, fontSize:"0.87rem" }}>Areas</p>
            {coverage.slice(0,6).map(c=><p key={c} style={{ margin:"0.32rem 0", fontSize:"0.85rem" }}>{c}</p>)}
          </div>
        </div>
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.07)", maxWidth:1300, margin:"0 auto", padding:"1.3rem 1.5rem", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"0.8rem" }}>
          <p style={{ margin:0, fontSize:"0.78rem" }}>© 2025 Keystoners Exterior Cleaning. All rights reserved.</p>
          <GlowBtn gold onClick={()=>openQuote()} style={{ padding:"0.62rem 1.18rem", fontSize:"0.85rem", borderRadius:"0.7rem" }}>Get Free Quote</GlowBtn>
        </div>
      </footer>

      {/* ════ STICKY BOTTOM BAR ════ */}
      <div className="sticky-bar" style={{
        position:"fixed", bottom:0, left:0, right:0, zIndex:800,
        background:"rgba(5,12,28,0.96)", backdropFilter:"blur(22px)",
        borderTop:"1px solid rgba(255,255,255,0.1)",
        padding:"0.82rem 1.5rem", display:"flex", gap:"0.7rem", alignItems:"center", justifyContent:"center",
        transform: stickyIn ? "translateY(0)" : "translateY(110%)",
        opacity: stickyIn ? 1 : 0,
        transition:"transform .48s cubic-bezier(.22,.68,0,1.2), opacity .48s ease",
      }}>
        <GlowBtn gold onClick={()=>openQuote()} style={{ flex:"1 1 auto", maxWidth:210, padding:"0.78rem 1rem", fontSize:"0.88rem", borderRadius:"0.78rem" }}>
          <Sparkles size={15}/><span className="sticky-label"> Free Quote</span>
        </GlowBtn>
        <GlowBtn ghost href={`tel:${PHONE_RAW}`} style={{ flex:"1 1 auto", maxWidth:170, padding:"0.78rem 1rem", fontSize:"0.88rem", borderRadius:"0.78rem" }}>
          <Phone size={15}/><span className="sticky-label"> {PHONE_DISPLAY}</span>
        </GlowBtn>
        <GlowBtn wa href={buildWA(WA_DEFAULT_MSG)} target="_blank" rel="noopener noreferrer" style={{ flex:"1 1 auto", maxWidth:188, padding:"0.78rem 1rem", fontSize:"0.88rem", borderRadius:"0.78rem" }}>
          <MessageCircle size={15}/><span className="sticky-label"> WhatsApp</span>
        </GlowBtn>
      </div>

      {/* ════ FLOATING WHATSAPP ════ */}
      <a href={buildWA(WA_DEFAULT_MSG)} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" style={{ position:"fixed", right:22, bottom: stickyIn ? 94 : 22, zIndex:999, width:58, height:58, background:"#25D366", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 8px 32px rgba(37,211,102,0.52)", border:"2px solid rgba(255,255,255,0.22)", animation:"pulseWA 2.4s ease-in-out infinite", transition:"bottom .48s cubic-bezier(.22,.68,0,1.2), transform .22s" }}
        onMouseEnter={e=>{ e.currentTarget.style.transform="scale(1.14)"; }}
        onMouseLeave={e=>{ e.currentTarget.style.transform=""; }}
      >
        <MessageCircle size={24} color="#fff"/>
      </a>

      {/* ════ MODALS ════ */}
      <QuoteModal   open={quoteOpen} onClose={()=>setQuoteOpen(false)} prefill={quotePrefill}/>
      <ServiceModal service={selSvc} open={svcOpen} onClose={()=>setSvcOpen(false)} onQuote={openQuote}/>
    </div>
  );
}