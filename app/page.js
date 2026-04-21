'use client';

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  ArrowRight, Phone, ShieldCheck, Sparkles, Clock3, MapPin, Star,
  Droplets, Home, Wind, Waves, ChevronRight, CheckCircle2,
  Menu, X, ChevronDown, Send, Check, AlertCircle, Loader2,
  MessageCircle, BadgeCheck, Zap, ThumbsUp, Award, Play,
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
  grad1:      "linear-gradient(135deg, #091428 0%, #18345f 55%, #2a4a82 100%)",
  grad2:      "linear-gradient(135deg, #18345f 0%, #2a4a82 100%)",
  gradGold:   "linear-gradient(135deg, #e6a817 0%, #f5c842 100%)",
};

/* ─── Services ────────────────────────────────────────────── */
const services = [
  { title:"Roof Soft Wash",    short:"Remove moss, algae and black streaks safely — no pressure, no shingle damage.",    desc:"Biodegradable solution kills growth at the root for lasting results. Safe on asphalt, cedar, metal and tile.",                                icon:ShieldCheck, price:"From $349", duration:"2–4 hrs",  image:"/roof-cleaning.jpg",   popular:true  },
  { title:"Gutter Cleaning",   short:"Clear blocked gutters before overflow damages fascia, siding and foundations.",     desc:"Full scoop-out, downspout flush and visual inspection included. Great for seasonal property maintenance.",                                icon:Droplets,    price:"From $149", duration:"1–2 hrs",  image:"/image-2.jpg",         popular:false },
  { title:"House Washing",     short:"Restore siding, trim and soffits with a gentle, thorough soft wash.",              desc:"Safe for vinyl, Hardie board, stucco and painted surfaces. Removes dirt, mildew and algae cleanly.",                                    icon:Home,        price:"From $299", duration:"2–3 hrs",  image:"/image-1.jpg",         popular:false },
  { title:"Pressure Washing",  short:"Deep-clean driveways, patios and hard surfaces to a like-new finish.",             desc:"Powerful cleaning for concrete, brick and pavers. Cuts through stains, marks and grime fast.",                                           icon:Waves,       price:"From $199", duration:"1–3 hrs",  image:"/floor.jpg",           popular:false },
  { title:"Window Cleaning",   short:"Crystal-clear, streak-free exterior windows that refresh the whole property.",     desc:"Pure-water fed-pole system for spotless results up to 3 storeys. Includes frames, sills and screens.",                                  icon:Sparkles,    price:"From $179", duration:"1–2 hrs",  image:"/image-1.jpg",         popular:false },
  { title:"Maintenance Plans", short:"Scheduled seasonal care — roof, gutters and surfaces in one recurring bundle.",    desc:"Priority scheduling, locked pricing and no annual contracts. Ideal for homeowners and strata.",                                         icon:Wind,        price:"From $499/yr",duration:"Ongoing", image:"/pipe-cleaning.jpg",   popular:false },
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
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, [threshold]);
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

/* ─── Reveal ──────────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "", from = "bottom" }) {
  const [ref, vis] = useInView();
  const transforms = { bottom:"translateY(28px)", left:"translateX(-28px)", right:"translateX(28px)", scale:"scale(0.94)" };
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "none" : (transforms[from] || transforms.bottom),
      transition: `opacity .7s cubic-bezier(.22,.68,0,1.2) ${delay}ms, transform .7s cubic-bezier(.22,.68,0,1.2) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

/* ─── Field styles ────────────────────────────────────────── */
const fld = {
  width:"100%", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.14)",
  borderRadius:"0.75rem", padding:"0.88rem 1rem", color:"#fff", fontSize:"0.94rem",
  outline:"none", boxSizing:"border-box", fontFamily:"inherit", transition:"border-color .2s, box-shadow .2s",
};
const fldLight = {
  width:"100%", background:"#fff", border:`1px solid ${T.border}`,
  borderRadius:"0.75rem", padding:"0.88rem 1rem", color:T.ink, fontSize:"0.94rem",
  outline:"none", boxSizing:"border-box", fontFamily:"inherit",
};
const sel  = (v, dark=true) => ({ ...(dark?fld:fldLight), color: v ? (dark?"#fff":T.ink) : T.slateLight });

/* ─── GlowButton ──────────────────────────────────────────── */
function GlowBtn({ children, onClick, href, gold, wa, style={}, ...props }) {
  const base = {
    display:"inline-flex", alignItems:"center", justifyContent:"center", gap:"0.5rem",
    borderRadius:"0.85rem", padding:"1rem 1.7rem", fontWeight:800, fontSize:"0.97rem",
    cursor:"pointer", border:"none", textDecoration:"none", transition:"transform .2s, box-shadow .2s",
    fontFamily:"inherit",
    ...(gold ? { background:T.gradGold, color:T.navy, boxShadow:`0 8px 32px ${T.goldGlow}` }
             : wa ? { background:"#25D366", color:"#fff", boxShadow:"0 8px 28px rgba(37,211,102,0.3)" }
             : { background:"rgba(255,255,255,0.1)", color:"#fff", border:"1px solid rgba(255,255,255,0.18)", backdropFilter:"blur(8px)" }),
    ...style,
  };
  const Tag = href ? "a" : "button";
  return (
    <Tag href={href} onClick={onClick} style={base}
      onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px) scale(1.02)"; e.currentTarget.style.boxShadow=gold?`0 16px 48px ${T.goldGlow}`:wa?"0 14px 40px rgba(37,211,102,0.45)":"0 8px 32px rgba(0,0,0,0.3)"; }}
      onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=gold?`0 8px 32px ${T.goldGlow}`:wa?"0 8px 28px rgba(37,211,102,0.3)":""; }}
      {...props}
    >
      {children}
    </Tag>
  );
}

/* ─── Modal ───────────────────────────────────────────────── */
function Modal({ open, onClose, children }) {
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [open]);
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:1000, background:"rgba(7,14,32,0.85)", backdropFilter:"blur(12px)", display:"flex", alignItems:"center", justifyContent:"center", padding:"1rem", animation:"fadeIn .2s ease" }}>
      <div onClick={e=>e.stopPropagation()} style={{ position:"relative", width:"100%", maxWidth:560, maxHeight:"92vh", overflowY:"auto", background:`linear-gradient(145deg, #0f2244, #172e58)`, borderRadius:"1.6rem", boxShadow:"0 48px 100px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.12)", animation:"slideUp .3s cubic-bezier(.22,.68,0,1.2)" }}>
        <button onClick={onClose} style={{ position:"absolute", top:14, right:14, width:34, height:34, borderRadius:"50%", border:"1px solid rgba(255,255,255,0.15)", background:"rgba(255,255,255,0.08)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"rgba(255,255,255,0.7)", zIndex:2, transition:"background .2s" }}>
          <X size={14}/>
        </button>
        {children}
      </div>
    </div>
  );
}

/* ─── Quote Modal ─────────────────────────────────────────── */
function QuoteModal({ open, onClose, prefill="" }) {
  const [form, setForm] = useState({ name:"", phone:"", email:"", service:prefill, city:"", message:"" });
  const [status, setStatus] = useState("idle");
  const set = (k,v) => setForm(f=>({...f,[k]:v}));
  useEffect(() => { if (open) { setForm(f=>({...f, service:prefill||f.service})); setStatus("idle"); } }, [open, prefill]);
  const valid = form.name && form.phone && form.service && form.city;

  const submit = () => {
    if (!valid) return;
    setStatus("loading");
    const msg = ["Hi Keystoners, I need a quote.", `Name: ${form.name}`, `Phone: ${form.phone}`, form.email?`Email: ${form.email}`:null, `Service: ${form.service}`, `City: ${form.city}`, form.message?`Note: ${form.message}`:null].filter(Boolean).join("\n");
    setTimeout(() => { setStatus("success"); window.open(buildWA(msg), "_blank", "noopener,noreferrer"); }, 700);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ padding:"2rem" }}>
        {status==="success" ? (
          <div style={{ textAlign:"center", padding:"1.5rem 0" }}>
            <div style={{ width:68, height:68, borderRadius:"50%", background:"rgba(22,163,74,0.15)", border:"1px solid rgba(22,163,74,0.3)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 1.1rem", animation:"pulse 1s ease" }}>
              <Check size={30} style={{ color:"#4ade80" }}/>
            </div>
            <h3 style={{ margin:"0 0 0.4rem", color:"#fff", fontFamily:"'Bricolage Grotesque',sans-serif", fontSize:"1.35rem", fontWeight:800 }}>Opening WhatsApp…</h3>
            <p style={{ margin:"0 0 1.5rem", color:T.navyMuted }}>Your quote details are pre-filled and ready to send.</p>
            <button onClick={onClose} style={{ background:T.gradGold, color:T.navy, border:"none", borderRadius:"0.75rem", padding:"0.85rem 1.8rem", fontWeight:800, cursor:"pointer", fontFamily:"inherit" }}>Done</button>
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
                  onFocus={e=>{e.target.style.borderColor="rgba(230,168,23,0.6)"; e.target.style.boxShadow=`0 0 0 3px ${T.goldFaint}`;}}
                  onBlur={e=>{e.target.style.borderColor="rgba(255,255,255,0.14)"; e.target.style.boxShadow="";}}
                />
              ))}
              <select value={form.service} onChange={e=>set("service",e.target.value)} style={sel(form.service)}>
                <option value="">Service needed *</option>
                {services.map(s=><option key={s.title} value={s.title}>{s.title}</option>)}
                <option value="Multiple Services">Multiple Services</option>
              </select>
              <select value={form.city} onChange={e=>set("city",e.target.value)} style={sel(form.city)}>
                <option value="">Your city *</option>
                {coverage.map(c=><option key={c} value={c}>{c}</option>)}
                <option value="Other">Other</option>
              </select>
              <textarea rows={3} placeholder="Anything else?" value={form.message} onChange={e=>set("message",e.target.value)} style={{...fld, resize:"vertical"}}
                onFocus={e=>{e.target.style.borderColor="rgba(230,168,23,0.6)"; e.target.style.boxShadow=`0 0 0 3px ${T.goldFaint}`;}}
                onBlur={e=>{e.target.style.borderColor="rgba(255,255,255,0.14)"; e.target.style.boxShadow="";}}
              />
              <GlowBtn onClick={submit} wa disabled={!valid||status==="loading"} style={{ width:"100%", opacity:valid?1:0.5, cursor:valid?"pointer":"not-allowed" }}>
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
      <div style={{ borderRadius:"1.6rem", overflow:"hidden" }}>
        <div style={{ height:210, position:"relative", overflow:"hidden" }}>
          <img src={service.image} alt={service.title} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transform:"scale(1.04)" }}/>
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(9,20,40,0.92) 0%, rgba(9,20,40,0.3) 60%, transparent 100%)" }}/>
          <div style={{ position:"absolute", bottom:16, left:16, display:"flex", gap:"0.5rem" }}>
            <span style={{ background:T.gradGold, color:T.navy, borderRadius:"999px", padding:"0.3rem 0.85rem", fontSize:"0.8rem", fontWeight:800 }}>{service.price}</span>
            <span style={{ background:"rgba(255,255,255,0.12)", color:"#fff", backdropFilter:"blur(8px)", borderRadius:"999px", padding:"0.3rem 0.85rem", fontSize:"0.8rem", border:"1px solid rgba(255,255,255,0.15)" }}><Clock3 size={11} style={{display:"inline",marginRight:3}}/>{service.duration}</span>
          </div>
        </div>
        <div style={{ padding:"1.6rem" }}>
          <div style={{ width:44, height:44, borderRadius:"0.8rem", background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.12)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"0.9rem" }}>
            <Icon size={20} style={{ color:T.gold }}/>
          </div>
          <h3 style={{ margin:"0 0 0.65rem", color:"#fff", fontFamily:"'Bricolage Grotesque',sans-serif", fontSize:"1.4rem", fontWeight:800 }}>{service.title}</h3>
          <p style={{ margin:"0 0 0.5rem", color:"rgba(255,255,255,0.78)", lineHeight:1.74 }}>{service.short}</p>
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
function FAQItem({ q, a, i }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom:"1px solid rgba(255,255,255,0.08)", overflow:"hidden" }}>
      <button onClick={()=>setOpen(!open)} style={{ width:"100%", background:"none", border:"none", padding:"1.25rem 0", display:"flex", justifyContent:"space-between", alignItems:"center", gap:"1rem", cursor:"pointer", textAlign:"left" }}>
        <span style={{ color:"#fff", fontWeight:700, fontSize:"0.98rem", lineHeight:1.45 }}>{q}</span>
        <div style={{ width:28, height:28, borderRadius:"50%", background:open?T.gradGold:"rgba(255,255,255,0.08)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"background .25s, transform .25s", transform:open?"rotate(180deg)":"none" }}>
          <ChevronDown size={15} style={{ color:open?T.navy:T.gold }}/>
        </div>
      </button>
      <div style={{ maxHeight:open?"300px":"0", overflow:"hidden", transition:"max-height .35s cubic-bezier(.22,.68,0,1.2)" }}>
        <p style={{ margin:"0 0 1.25rem", color:T.navyMuted, lineHeight:1.82, fontSize:"0.94rem", paddingRight:"2rem" }}>{a}</p>
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
    e.preventDefault(); if (!valid) return;
    setStatus("loading");
    const msg = ["Hi Keystoners, quote request from website.", `Name: ${form.name}`, `Phone: ${form.phone}`, form.email?`Email: ${form.email}`:null, `Service: ${form.service}`, `City: ${form.city}`, form.message?`Note: ${form.message}`:null].filter(Boolean).join("\n");
    setTimeout(() => { setStatus("success"); window.open(buildWA(msg), "_blank", "noopener,noreferrer"); }, 700);
  };

  if (status==="success") return (
    <div style={{ background:"rgba(22,163,74,0.1)", border:"1px solid rgba(22,163,74,0.25)", borderRadius:"1.25rem", padding:"2.5rem", textAlign:"center" }}>
      <Check size={36} style={{ color:"#4ade80", marginBottom:"0.75rem" }}/>
      <h4 style={{ margin:"0 0 0.35rem", color:"#fff", fontWeight:800, fontSize:"1.1rem" }}>Opening WhatsApp…</h4>
      <p style={{ margin:0, color:T.navyMuted, fontSize:"0.9rem" }}>Your details are pre-filled and ready to send.</p>
    </div>
  );

  return (
    <form onSubmit={submit} style={{ display:"flex", flexDirection:"column", gap:"0.8rem", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"1.4rem", padding:"1.8rem", backdropFilter:"blur(8px)" }}>
      <div className="form-name-row" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.8rem" }}>
        {[["text","Full Name *","name"],["tel","Phone *","phone"]].map(([t,p,k])=>(
          <input key={k} type={t} placeholder={p} value={form[k]} onChange={e=>set(k,e.target.value)} style={fld}
            onFocus={e=>{e.target.style.borderColor="rgba(230,168,23,0.6)"; e.target.style.boxShadow=`0 0 0 3px ${T.goldFaint}`;}}
            onBlur={e=>{e.target.style.borderColor="rgba(255,255,255,0.14)"; e.target.style.boxShadow="";}}
          />
        ))}
      </div>
      <input type="email" placeholder="Email (optional)" value={form.email} onChange={e=>set("email",e.target.value)} style={fld}
        onFocus={e=>{e.target.style.borderColor="rgba(230,168,23,0.6)"; e.target.style.boxShadow=`0 0 0 3px ${T.goldFaint}`;}}
        onBlur={e=>{e.target.style.borderColor="rgba(255,255,255,0.14)"; e.target.style.boxShadow="";}}
      />
      <select value={form.service} onChange={e=>set("service",e.target.value)} style={sel(form.service)}>
        <option value="">Service needed *</option>
        {services.map(s=><option key={s.title} value={s.title}>{s.title}</option>)}
        <option value="Multiple Services">Multiple Services</option>
      </select>
      <select value={form.city} onChange={e=>set("city",e.target.value)} style={sel(form.city)}>
        <option value="">Your city *</option>
        {coverage.map(c=><option key={c} value={c}>{c}</option>)}
        <option value="Other">Other</option>
      </select>
      <textarea rows={4} placeholder="Additional details (optional)" value={form.message} onChange={e=>set("message",e.target.value)} style={{...fld, resize:"vertical"}}
        onFocus={e=>{e.target.style.borderColor="rgba(230,168,23,0.6)"; e.target.style.boxShadow=`0 0 0 3px ${T.goldFaint}`;}}
        onBlur={e=>{e.target.style.borderColor="rgba(255,255,255,0.14)"; e.target.style.boxShadow="";}}
      />
      <GlowBtn wa style={{ width:"100%", opacity:valid?1:0.5, cursor:valid?"pointer":"not-allowed" }} onClick={()=>{}} >
        {status==="loading" ? <><Loader2 size={16} style={{animation:"spin 1s linear infinite"}}/>Preparing…</> : <><Send size={15}/>Send via WhatsApp</>}
      </GlowBtn>
      {!valid && <p style={{margin:0,color:T.slateLight,fontSize:"0.78rem"}}><AlertCircle size={11} style={{display:"inline",marginRight:4}}/>Name, phone, service and city are required</p>}
    </form>
  );
}

/* ─── Floating Orbs ───────────────────────────────────────── */
function Orbs() {
  return (
    <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none", zIndex:0 }}>
      <div style={{ position:"absolute", width:600, height:600, borderRadius:"50%", background:"radial-gradient(circle, rgba(42,74,130,0.45) 0%, transparent 70%)", top:"-15%", right:"-10%", animation:"orbFloat 12s ease-in-out infinite" }}/>
      <div style={{ position:"absolute", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle, rgba(230,168,23,0.08) 0%, transparent 70%)", bottom:"-10%", left:"-5%", animation:"orbFloat 15s ease-in-out infinite reverse" }}/>
      <div style={{ position:"absolute", width:300, height:300, borderRadius:"50%", background:"radial-gradient(circle, rgba(42,74,130,0.3) 0%, transparent 70%)", top:"40%", left:"30%", animation:"orbFloat 10s ease-in-out infinite 2s" }}/>
    </div>
  );
}

/* ─── Marquee ─────────────────────────────────────────────── */
function Marquee() {
  return (
    <div style={{ background:"rgba(230,168,23,0.08)", borderTop:"1px solid rgba(230,168,23,0.15)", borderBottom:"1px solid rgba(230,168,23,0.15)", padding:"0.85rem 0", overflow:"hidden", position:"relative" }}>
      <div style={{ display:"flex", gap:"0", animation:"marquee 28s linear infinite", width:"max-content" }}>
        {marqueeItems.map((item, i)=>(
          <span key={i} style={{ color:T.gold, fontSize:"0.82rem", fontWeight:700, whiteSpace:"nowrap", padding:"0 2rem", letterSpacing:"0.08em" }}>{item}</span>
        ))}
      </div>
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────── */
export default function HomePage() {
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [quoteOpen,    setQuoteOpen]    = useState(false);
  const [quotePrefill, setQuotePrefill] = useState("");
  const [selSvc,       setSelSvc]       = useState(null);
  const [svcOpen,      setSvcOpen]      = useState(false);
  const [areaSearch,   setAreaSearch]   = useState("");
  const [areaResult,   setAreaResult]   = useState(null);
  const scrollY = useScrollY();

  const openQuote   = (pre="") => { setQuotePrefill(pre); setQuoteOpen(true); };
  const openService = (s)       => { setSelSvc(s); setSvcOpen(true); };
  const scrollTo    = (id)      => { setMobileOpen(false); document.getElementById(id)?.scrollIntoView({ behavior:"smooth", block:"start" }); };

  const checkArea = () => {
    const q = areaSearch.toLowerCase().trim(); if (!q) return;
    const match = coverage.find(c=>c.toLowerCase().includes(q));
    setAreaResult(match ? { found:true, city:match } : { found:false });
  };

  const navLinks = [
    { label:"Services", id:"services" }, { label:"Results", id:"results" }, { label:"Why Us", id:"why-us" },
    { label:"Coverage", id:"coverage" }, { label:"Reviews", id:"reviews" }, { label:"Contact", id:"contact" },
  ];

  const scrolled = scrollY > 50;

  return (
    <div style={{ minHeight:"100vh", background:T.navyDeep, color:"#fff", fontFamily:"'DM Sans',system-ui,sans-serif" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Bricolage+Grotesque:wght@600;700;800&display=swap');
        *, *::before, *::after { box-sizing:border-box; }
        html { scroll-behavior:smooth; }
        body { margin:0; }
        a { color:inherit; text-decoration:none; }
        input,textarea,select,button { font-family:inherit; }
        input::placeholder,textarea::placeholder { color:rgba(255,255,255,0.35); }
        select option { background:#172e58; color:#fff; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-track { background:${T.navyDeep}; }
        ::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.12); border-radius:3px; }

        @keyframes spin     { to { transform:rotate(360deg); } }
        @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
        @keyframes slideUp  { from { opacity:0; transform:translateY(24px) scale(.97); } to { opacity:1; transform:none; } }
        @keyframes fadeUp   { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:none; } }
        @keyframes orbFloat { 0%,100% { transform:translate(0,0) scale(1); } 33% { transform:translate(20px,-20px) scale(1.04); } 66% { transform:translate(-12px,14px) scale(.97); } }
        @keyframes marquee  { from { transform:translateX(0); } to { transform:translateX(-50%); } }
        @keyframes pulse    { 0%,100% { box-shadow:0 0 0 0 rgba(22,163,74,0.4); } 50% { box-shadow:0 0 0 12px rgba(22,163,74,0); } }
        @keyframes pulseDot { 0%,100% { box-shadow:0 0 0 0 rgba(37,211,102,0.6); } 70% { box-shadow:0 0 0 12px rgba(37,211,102,0); } }
        @keyframes gradShift { 0%,100% { background-position:0% 50%; } 50% { background-position:100% 50%; } }
        @keyframes float1   { 0%,100% { transform:translateY(0) rotate(0deg); } 50% { transform:translateY(-8px) rotate(1deg); } }
        @keyframes float2   { 0%,100% { transform:translateY(0) rotate(0deg); } 50% { transform:translateY(-6px) rotate(-1deg); } }
        @keyframes shimmer  { 0% { background-position:-200% 0; } 100% { background-position:200% 0; } }

        .nav-a:hover      { color:#fff !important; }
        .svc-card         { transition:transform .3s ease, box-shadow .3s ease; cursor:pointer; }
        .svc-card:hover   { transform:translateY(-8px); box-shadow:0 32px 70px rgba(0,0,0,0.35) !important; }
        .svc-card:hover .svc-img { transform:scale(1.08) !important; }
        .svc-img          { transition:transform .5s cubic-bezier(.22,.68,0,1.2) !important; }
        .res-card         { cursor:pointer; overflow:hidden; transition:transform .28s ease, box-shadow .28s ease; }
        .res-card:hover   { transform:translateY(-6px); box-shadow:0 28px 60px rgba(0,0,0,0.4) !important; }
        .res-card:hover img { transform:scale(1.07) !important; }
        .res-card img     { transition:transform .5s cubic-bezier(.22,.68,0,1.2); }
        .city-pill:hover  { background:${T.goldFaint} !important; border-color:rgba(230,168,23,0.4) !important; color:${T.gold} !important; }
        .sticky-bar-item:hover { opacity:0.85; }

        @media (max-width:1060px) {
          .hero-grid  { grid-template-columns:1fr !important; }
          .hero-right { display:none !important; }
        }
        @media (max-width:920px) {
          .desktop-nav { display:none !important; }
          .menu-btn    { display:flex !important; }
          .two-col     { grid-template-columns:1fr !important; gap:2rem !important; }
          .stats-grid  { grid-template-columns:repeat(2,1fr) !important; }
          .svc-grid    { grid-template-columns:repeat(2,1fr) !important; }
          .float-badge { display:none !important; }
          .hero-ctas   { flex-direction:column !important; }
          .hero-ctas > * { width:100% !important; justify-content:center; }
          .cta-row     { flex-direction:column !important; }
          .cta-row > * { width:100% !important; justify-content:center; text-align:center; }
        }
        @media (max-width:620px) {
          .svc-grid        { grid-template-columns:1fr !important; }
          .results-grid    { grid-template-columns:1fr !important; }
          .trust-grid      { grid-template-columns:1fr !important; }
          .city-grid       { grid-template-columns:repeat(2,1fr) !important; }
          .footer-grid     { grid-template-columns:1fr 1fr !important; }
          .form-name-row   { grid-template-columns:1fr !important; }
          .wa-label        { display:none !important; }
          .trust-chips     { justify-content:flex-start !important; }
          .sticky-bar      { padding:0.65rem 0.75rem !important; gap:0.5rem !important; }
          .sticky-label    { display:none !important; }
        }
      `}</style>

      {/* ════ HEADER ════ */}
      <header style={{ position:"fixed", top:0, left:0, right:0, zIndex:500, background:scrolled?"rgba(9,20,40,0.9)":"transparent", backdropFilter:scrolled?"blur(20px)":"none", borderBottom:scrolled?"1px solid rgba(255,255,255,0.09)":"none", transition:"background .4s, backdrop-filter .4s, border-color .4s" }}>
        <div style={{ maxWidth:1300, margin:"0 auto", padding:"0 1.25rem", minHeight:74, display:"flex", alignItems:"center", justifyContent:"space-between", gap:"1rem" }}>
          <button onClick={()=>scrollTo("hero")} style={{ display:"flex", alignItems:"center", gap:"0.75rem", background:"none", border:"none", cursor:"pointer", padding:0 }}>
            <div style={{ width:44, height:44, borderRadius:"0.85rem", background:"linear-gradient(135deg, #1a3566, #0d1c3f)", border:"1px solid rgba(230,168,23,0.35)", display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 4px 16px rgba(0,0,0,0.3)" }}>
              <Sparkles size={19} style={{ color:T.gold }}/>
            </div>
            <div>
              <p style={{ margin:0, fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:"1.05rem", color:"#fff", letterSpacing:"-0.02em" }}>Keystoners</p>
              <p style={{ margin:0, color:T.navyMuted, fontSize:"0.7rem", letterSpacing:"0.06em" }}>EXTERIOR CLEANING</p>
            </div>
          </button>

          <nav className="desktop-nav" style={{ display:"flex", gap:"1.8rem" }}>
            {navLinks.map(l=>(
              <button key={l.id} onClick={()=>scrollTo(l.id)} className="nav-a" style={{ background:"none", border:"none", color:T.navyMuted, fontSize:"0.88rem", fontWeight:500, cursor:"pointer", padding:0, transition:"color .15s", letterSpacing:"0.01em" }}>{l.label}</button>
            ))}
          </nav>

          <div style={{ display:"flex", gap:"0.6rem", alignItems:"center" }}>
            <a href={`tel:${PHONE_RAW}`} style={{ display:"flex", alignItems:"center", gap:"0.42rem", background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.13)", borderRadius:"0.7rem", padding:"0.58rem 0.95rem", fontWeight:600, fontSize:"0.86rem", color:"#fff", transition:"background .2s" }}>
              <Phone size={14}/><span className="wa-label">{PHONE_DISPLAY}</span>
            </a>
            <GlowBtn gold onClick={()=>openQuote()} style={{ padding:"0.62rem 1.1rem", fontSize:"0.9rem", borderRadius:"0.7rem" }}>Free Quote</GlowBtn>
            <button className="menu-btn" onClick={()=>setMobileOpen(v=>!v)} style={{ display:"none", width:42, height:42, alignItems:"center", justifyContent:"center", background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:"0.75rem", cursor:"pointer", color:"#fff" }}>
              {mobileOpen ? <X size={18}/> : <Menu size={18}/>}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div style={{ background:"rgba(9,20,40,0.98)", backdropFilter:"blur(20px)", borderTop:"1px solid rgba(255,255,255,0.08)", padding:"0.6rem 1.25rem 1.2rem", animation:"fadeIn .2s ease" }}>
            {navLinks.map(l=>(
              <button key={l.id} onClick={()=>scrollTo(l.id)} style={{ display:"block", width:"100%", textAlign:"left", background:"none", border:"none", color:"rgba(255,255,255,0.8)", padding:"0.85rem 0", borderBottom:"1px solid rgba(255,255,255,0.06)", fontSize:"0.97rem", cursor:"pointer" }}>{l.label}</button>
            ))}
            <GlowBtn gold onClick={()=>{setMobileOpen(false);openQuote();}} style={{ marginTop:"0.85rem", width:"100%", padding:"0.95rem" }}>Get Free Quote</GlowBtn>
          </div>
        )}
      </header>

      {/* ════ HERO ════ */}
      <section id="hero" style={{ background:`linear-gradient(145deg, #060f22 0%, #0d1c3f 45%, #18345f 80%, #1e3d72 100%)`, backgroundSize:"200% 200%", animation:"gradShift 12s ease infinite", position:"relative", overflow:"hidden", paddingTop:"74px" }}>
        <Orbs/>

        {/* Grid texture */}
        <div style={{ position:"absolute", inset:0, zIndex:0, backgroundImage:"linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)", backgroundSize:"60px 60px", maskImage:"radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)" }}/>

        <div className="hero-grid" style={{ maxWidth:1300, margin:"0 auto", padding:"5rem 1.25rem 4.5rem", display:"grid", gridTemplateColumns:"1.12fr 0.88fr", gap:"3.5rem", alignItems:"center", position:"relative", zIndex:1 }}>

          {/* Left */}
          <div style={{ animation:"fadeUp .75s cubic-bezier(.22,.68,0,1.2) both" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem", background:"rgba(230,168,23,0.1)", border:"1px solid rgba(230,168,23,0.3)", borderRadius:"999px", padding:"0.42rem 1rem", marginBottom:"1.5rem" }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:T.gold, animation:"pulseDot 1.8s ease infinite" }}/>
              <span style={{ color:T.goldLight, fontSize:"0.82rem", fontWeight:700, letterSpacing:"0.04em" }}>Trusted exterior cleaning · Lower Mainland</span>
            </div>

            <h1 style={{ margin:"0 0 1.15rem", fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:"clamp(2.6rem,5.8vw,4.8rem)", lineHeight:1.01, letterSpacing:"-0.038em", color:"#fff" }}>
              Your property
              <br/>deserves to{" "}
              <span style={{ background:T.gradGold, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>shine.</span>
            </h1>

            <p style={{ margin:"0 0 2.2rem", color:"rgba(255,255,255,0.62)", fontSize:"1.08rem", lineHeight:1.78, maxWidth:560 }}>
              Roof washing, gutter cleaning, pressure washing, house washing and window cleaning across Vancouver and the Lower Mainland. Fast quotes. Real results.
            </p>

            <div className="hero-ctas" style={{ display:"flex", gap:"0.9rem", flexWrap:"wrap", marginBottom:"2.5rem" }}>
              <GlowBtn gold onClick={()=>openQuote()}>Get Free Quote <ArrowRight size={16}/></GlowBtn>
              <GlowBtn href={`tel:${PHONE_RAW}`}><Phone size={15}/> {PHONE_DISPLAY}</GlowBtn>
              <GlowBtn wa href={buildWA(WA_DEFAULT_MSG)} target="_blank" rel="noopener noreferrer"><MessageCircle size={15}/> WhatsApp</GlowBtn>
            </div>

            <div className="trust-chips" style={{ display:"flex", gap:"1.5rem", flexWrap:"wrap" }}>
              {["500+ Homes Cleaned","5★ Rated","Same-Day Response","Fully Insured"].map(t=>(
                <div key={t} style={{ display:"flex", alignItems:"center", gap:"0.4rem", color:"rgba(255,255,255,0.55)", fontSize:"0.84rem" }}>
                  <CheckCircle2 size={13} style={{ color:T.gold }}/> {t}
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="hero-right" style={{ position:"relative", animation:"fadeUp .75s .18s cubic-bezier(.22,.68,0,1.2) both" }}>
            <div style={{ borderRadius:"2rem", overflow:"hidden", border:"1px solid rgba(255,255,255,0.12)", boxShadow:"0 60px 120px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)", position:"relative" }}>
              {/* Glassmorphism glow */}
              <div style={{ position:"absolute", inset:-1, borderRadius:"2rem", background:"linear-gradient(135deg, rgba(230,168,23,0.15), transparent 50%, rgba(42,74,130,0.2))", zIndex:1, pointerEvents:"none" }}/>
              <div style={{ position:"relative", aspectRatio:"4/5", overflow:"hidden" }}>
                <img src="/roof-cleaning.jpg" alt="Roof cleaning result" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transform:"scale(1.04)" }}/>
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(8,18,40,0.88) 0%, rgba(8,18,40,0.1) 55%, transparent 100%)" }}/>
                <div style={{ position:"absolute", left:16, right:16, bottom:16, background:"rgba(255,255,255,0.08)", backdropFilter:"blur(16px)", borderRadius:"1.2rem", padding:"1.15rem", border:"1px solid rgba(255,255,255,0.14)" }}>
                  <p style={{ margin:"0 0 0.22rem", color:"rgba(255,255,255,0.55)", fontSize:"0.72rem", textTransform:"uppercase", letterSpacing:"0.1em" }}>Most requested combo</p>
                  <p style={{ margin:"0 0 0.9rem", color:"#fff", fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:"1.02rem" }}>Roof Wash + Gutter Clean</p>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.5rem", marginBottom:"0.85rem" }}>
                    {["Protects roof edges","Improves drainage"].map(t=>(
                      <div key={t} style={{ background:"rgba(255,255,255,0.07)", borderRadius:"0.65rem", padding:"0.58rem 0.7rem", fontSize:"0.75rem", color:"rgba(255,255,255,0.8)", border:"1px solid rgba(255,255,255,0.08)" }}>{t}</div>
                    ))}
                  </div>
                  <GlowBtn gold onClick={()=>openQuote("Roof Soft Wash + Gutter Cleaning")} style={{ width:"100%", padding:"0.72rem", fontSize:"0.88rem", borderRadius:"0.75rem" }}>
                    Get a Quote for This Combo
                  </GlowBtn>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="float-badge" style={{ position:"absolute", top:"2.5rem", left:"-5.5rem", background:"rgba(13,28,63,0.92)", backdropFilter:"blur(16px)", borderRadius:"1.1rem", padding:"0.85rem 1.05rem", boxShadow:"0 20px 50px rgba(0,0,0,0.35)", display:"flex", alignItems:"center", gap:"0.7rem", border:"1px solid rgba(255,255,255,0.12)", animation:"float1 5s ease-in-out infinite" }}>
              <div style={{ width:40, height:40, borderRadius:"0.7rem", background:"rgba(230,168,23,0.12)", border:"1px solid rgba(230,168,23,0.2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Clock3 size={18} style={{ color:T.gold }}/>
              </div>
              <div>
                <p style={{ margin:0, color:"rgba(255,255,255,0.5)", fontSize:"0.7rem" }}>Response time</p>
                <p style={{ margin:0, color:"#fff", fontWeight:800, fontSize:"0.9rem" }}>Same day · &lt;24hr</p>
              </div>
            </div>

            <div className="float-badge" style={{ position:"absolute", bottom:"5rem", right:"-4.5rem", background:"rgba(13,28,63,0.92)", backdropFilter:"blur(16px)", borderRadius:"1.1rem", padding:"0.85rem 1.05rem", boxShadow:"0 20px 50px rgba(0,0,0,0.35)", display:"flex", alignItems:"center", gap:"0.7rem", border:"1px solid rgba(255,255,255,0.12)", animation:"float2 6s ease-in-out infinite 1s" }}>
              <div style={{ display:"flex", gap:2 }}>{Array.from({length:5}).map((_,i)=><Star key={i} size={13} style={{color:T.gold,fill:T.gold}}/>)}</div>
              <p style={{ margin:0, color:"#fff", fontWeight:800, fontSize:"0.88rem" }}>5★ Rated · 500+ Homes</p>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ background:"rgba(0,0,0,0.3)", borderTop:"1px solid rgba(255,255,255,0.08)", position:"relative", zIndex:1 }}>
          <div className="stats-grid" style={{ maxWidth:1300, margin:"0 auto", padding:"1.15rem 1.25rem", display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1rem" }}>
            {[{v:"24hr",l:"Quote response"},{v:"5★",l:"Top-rated service"},{v:"500+",l:"Homes cleaned"},{v:"100%",l:"Satisfaction focus"}].map(s=>(
              <div key={s.l} style={{ textAlign:"center" }}>
                <p style={{ margin:0, fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:"1.55rem", background:T.gradGold, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>{s.v}</p>
                <p style={{ margin:0, fontSize:"0.79rem", color:T.navyMuted }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ MARQUEE ════ */}
      <Marquee/>

      {/* ════ SERVICES ════ */}
      <section id="services" style={{ background:T.navyDeep, padding:"6rem 1.25rem" }}>
        <div style={{ maxWidth:1300, margin:"0 auto" }}>
          <Reveal>
            <div style={{ textAlign:"center", marginBottom:"3.2rem" }}>
              <p style={{ margin:"0 0 0.55rem", fontSize:"0.75rem", textTransform:"uppercase", letterSpacing:"0.2em", color:T.gold, fontWeight:700 }}>Our Services</p>
              <h2 style={{ margin:"0 0 0.8rem", fontFamily:"'Bricolage Grotesque',sans-serif", color:"#fff", fontWeight:800, fontSize:"clamp(2rem,3.8vw,3rem)", letterSpacing:"-0.028em" }}>Everything your exterior needs</h2>
              <p style={{ margin:"0 auto", color:T.navyMuted, maxWidth:520, lineHeight:1.74 }}>Click any service card to see what's included, starting price and how to get booked.</p>
            </div>
          </Reveal>

          <div className="svc-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1.25rem" }}>
            {services.map((svc,i)=>{
              const Icon = svc.icon;
              return (
                <Reveal key={svc.title} delay={i*65} from="bottom">
                  <div className="svc-card" onClick={()=>openService(svc)} style={{ background:"rgba(255,255,255,0.04)", borderRadius:"1.35rem", overflow:"hidden", border:"1px solid rgba(255,255,255,0.09)", boxShadow:"0 8px 30px rgba(0,0,0,0.25)", height:"100%", display:"flex", flexDirection:"column", position:"relative" }}>
                    {svc.popular && (
                      <div style={{ position:"absolute", top:14, right:14, zIndex:3, background:T.gradGold, color:T.navy, borderRadius:"999px", padding:"0.28rem 0.75rem", fontSize:"0.74rem", fontWeight:800, boxShadow:"0 4px 16px rgba(230,168,23,0.4)", animation:"float1 3s ease-in-out infinite" }}>
                        ⚡ Most Popular
                      </div>
                    )}
                    <div style={{ height:195, overflow:"hidden", position:"relative" }}>
                      <img src={svc.image} alt={svc.title} className="svc-img" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }}/>
                      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(9,20,40,0.85) 0%, transparent 55%)" }}/>
                      <span style={{ position:"absolute", left:13, bottom:13, background:T.gradGold, color:T.navy, borderRadius:"999px", padding:"0.3rem 0.78rem", fontSize:"0.79rem", fontWeight:800, boxShadow:"0 4px 12px rgba(230,168,23,0.3)" }}>{svc.price}</span>
                    </div>
                    <div style={{ padding:"1.25rem", flex:1, display:"flex", flexDirection:"column" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:"0.65rem", marginBottom:"0.75rem" }}>
                        <div style={{ width:36, height:36, borderRadius:"0.65rem", background:"rgba(230,168,23,0.1)", border:"1px solid rgba(230,168,23,0.18)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                          <Icon size={17} style={{ color:T.gold }}/>
                        </div>
                        <h3 style={{ margin:0, color:"#fff", fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:"1.04rem" }}>{svc.title}</h3>
                      </div>
                      <p style={{ margin:"0 0 1rem", color:T.navyMuted, lineHeight:1.68, fontSize:"0.88rem", flex:1 }}>{svc.short}</p>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"0.5rem" }}>
                        <span style={{ display:"flex", alignItems:"center", gap:"0.32rem", color:T.gold, fontWeight:700, fontSize:"0.87rem" }}>View details <ChevronRight size={13}/></span>
                        <span style={{ color:T.navyMuted, fontSize:"0.77rem" }}><Clock3 size={11} style={{display:"inline",marginRight:3}}/>{svc.duration}</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════ RESULTS ════ */}
      <section id="results" style={{ background:`linear-gradient(180deg, ${T.navyMid} 0%, ${T.navyDeep} 100%)`, padding:"6rem 1.25rem" }}>
        <div style={{ maxWidth:1300, margin:"0 auto" }}>
          <Reveal>
            <div style={{ textAlign:"center", marginBottom:"3rem" }}>
              <p style={{ margin:"0 0 0.55rem", fontSize:"0.75rem", textTransform:"uppercase", letterSpacing:"0.2em", color:T.gold, fontWeight:700 }}>Real Work</p>
              <h2 style={{ margin:"0 0 0.8rem", fontFamily:"'Bricolage Grotesque',sans-serif", color:"#fff", fontWeight:800, fontSize:"clamp(2rem,3.8vw,3rem)", letterSpacing:"-0.028em" }}>Results that speak for themselves</h2>
              <p style={{ margin:"0 auto", color:T.navyMuted, maxWidth:520, lineHeight:1.74 }}>Every job is treated with care and attention to detail — here's what that looks like on site.</p>
            </div>
          </Reveal>

          <div className="results-grid" style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"1.1rem" }}>
            {beforeAfter.map((item,i)=>(
              <Reveal key={item.title} delay={i*70}>
                <div className="res-card" style={{ borderRadius:"1.35rem", overflow:"hidden", border:"1px solid rgba(255,255,255,0.09)", boxShadow:"0 24px 60px rgba(0,0,0,0.3)" }}>
                  <div style={{ position:"relative", overflow:"hidden" }}>
                    <img src={item.image} alt={item.title} style={{ width:"100%", height:310, objectFit:"cover", display:"block" }}/>
                    <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(9,20,40,0.85) 0%, transparent 55%)" }}/>
                    <div style={{ position:"absolute", bottom:16, left:16, right:16, display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:"0.5rem" }}>
                      <p style={{ margin:0, color:"#fff", fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:700, fontSize:"1.05rem" }}>{item.title}</p>
                      <span style={{ background:T.gradGold, color:T.navy, borderRadius:"999px", padding:"0.3rem 0.8rem", fontSize:"0.78rem", fontWeight:800 }}>{item.tag}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div style={{ textAlign:"center", marginTop:"2.8rem" }}>
              <GlowBtn gold onClick={()=>openQuote()}>Get My Free Quote <ArrowRight size={16}/></GlowBtn>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════ WHY US ════ */}
      <section id="why-us" style={{ background:T.navyDeep, padding:"6rem 1.25rem" }}>
        <div style={{ maxWidth:1300, margin:"0 auto" }}>
          <div className="two-col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4.5rem", alignItems:"center" }}>

            <Reveal from="left">
              <p style={{ margin:"0 0 0.55rem", fontSize:"0.75rem", textTransform:"uppercase", letterSpacing:"0.2em", color:T.gold, fontWeight:700 }}>Why Keystoners</p>
              <h2 style={{ margin:"0 0 1.1rem", fontFamily:"'Bricolage Grotesque',sans-serif", color:"#fff", fontWeight:800, fontSize:"clamp(2rem,3.5vw,2.9rem)", lineHeight:1.08, letterSpacing:"-0.028em" }}>
                Professional service.<br/>No surprises.
              </h2>
              <p style={{ margin:"0 0 2rem", color:T.navyMuted, lineHeight:1.8, maxWidth:440 }}>
                Honest communication, fast quotes, safe cleaning methods and a clean finish every time. No contracts, no pressure, no hidden fees.
              </p>
              <div className="cta-row" style={{ display:"flex", gap:"0.85rem", flexWrap:"wrap" }}>
                <GlowBtn gold onClick={()=>openQuote()}>Get Free Quote <ArrowRight size={15}/></GlowBtn>
                <GlowBtn wa href={buildWA(WA_DEFAULT_MSG)} target="_blank" rel="noopener noreferrer"><MessageCircle size={15}/> WhatsApp</GlowBtn>
              </div>
            </Reveal>

            <div className="trust-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
              {[
                { icon:BadgeCheck,  title:"No-pressure quotes",  body:"Clear guidance with no confusing sales tactics."                      },
                { icon:Zap,         title:"Same-day response",    body:"Most requests answered within hours — often same day."               },
                { icon:ThumbsUp,    title:"Proven clean results", body:"Care, attention and thorough finish on every job."                   },
                { icon:ShieldCheck, title:"Safe methods",         body:"Soft-wash techniques protect your surfaces."                         },
                { icon:MapPin,      title:"Local team",           body:"A local Lower Mainland crew — not a franchise."                     },
                { icon:Award,       title:"5-star track record",  body:"Hundreds of satisfied homeowners across BC."                        },
              ].map((tp,i)=>{
                const Icon = tp.icon;
                return (
                  <Reveal key={tp.title} delay={i*60}>
                    <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.09)", borderRadius:"1.1rem", padding:"1.25rem", transition:"border-color .2s, background .2s" }}
                      onMouseEnter={e=>{ e.currentTarget.style.background="rgba(230,168,23,0.05)"; e.currentTarget.style.borderColor="rgba(230,168,23,0.2)"; }}
                      onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.09)"; }}
                    >
                      <div style={{ width:40, height:40, borderRadius:"0.7rem", background:"rgba(230,168,23,0.1)", border:"1px solid rgba(230,168,23,0.18)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"0.85rem" }}>
                        <Icon size={18} style={{ color:T.gold }}/>
                      </div>
                      <p style={{ margin:"0 0 0.3rem", color:"#fff", fontWeight:700, fontSize:"0.92rem" }}>{tp.title}</p>
                      <p style={{ margin:0, color:T.navyMuted, lineHeight:1.65, fontSize:"0.83rem" }}>{tp.body}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ════ COVERAGE + REVIEWS PREVIEW ════ */}
      <section id="coverage" style={{ background:`linear-gradient(180deg, ${T.navyMid} 0%, ${T.navyDeep} 100%)`, padding:"6rem 1.25rem" }}>
        <div style={{ maxWidth:1300, margin:"0 auto" }}>
          <div className="two-col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.5rem" }}>

            <Reveal>
              <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"1.4rem", padding:"1.9rem", height:"100%" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"0.8rem", marginBottom:"1.6rem" }}>
                  <div style={{ width:44, height:44, borderRadius:"0.8rem", background:"rgba(230,168,23,0.1)", border:"1px solid rgba(230,168,23,0.18)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <MapPin size={20} style={{ color:T.gold }}/>
                  </div>
                  <div>
                    <p style={{ margin:0, color:T.navyMuted, fontSize:"0.76rem", textTransform:"uppercase", letterSpacing:"0.08em" }}>Service Area</p>
                    <h3 style={{ margin:0, color:"#fff", fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:"1.2rem" }}>Vancouver & Lower Mainland</h3>
                  </div>
                </div>

                <div className="city-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"0.5rem", marginBottom:"1.1rem" }}>
                  {coverage.map(city=>(
                    <div key={city} className="city-pill" onClick={()=>{ setAreaSearch(city); setAreaResult({found:true,city}); }} style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.09)", borderRadius:"0.65rem", padding:"0.6rem 0.5rem", textAlign:"center", color:T.navyMuted, fontSize:"0.81rem", cursor:"pointer", transition:"all .2s" }}>{city}</div>
                  ))}
                </div>

                <div style={{ display:"flex", gap:"0.65rem" }}>
                  <input value={areaSearch} onChange={e=>{ setAreaSearch(e.target.value); setAreaResult(null); }} onKeyDown={e=>e.key==="Enter"&&checkArea()} placeholder="Type your city…" style={fld}
                    onFocus={e=>{ e.target.style.borderColor="rgba(230,168,23,0.5)"; e.target.style.boxShadow=`0 0 0 3px ${T.goldFaint}`; }}
                    onBlur={e=>{ e.target.style.borderColor="rgba(255,255,255,0.14)"; e.target.style.boxShadow=""; }}
                  />
                  <GlowBtn gold onClick={checkArea} style={{ padding:"0 1.2rem", borderRadius:"0.75rem", whiteSpace:"nowrap" }}>Check</GlowBtn>
                </div>

                {areaResult && (
                  <div style={{ marginTop:"0.9rem", padding:"0.9rem 1rem", borderRadius:"0.85rem", background:areaResult.found?"rgba(22,163,74,0.1)":"rgba(220,38,38,0.1)", border:`1px solid ${areaResult.found?"rgba(22,163,74,0.25)":"rgba(220,38,38,0.25)"}`, color:areaResult.found?"#4ade80":"#f87171", display:"flex", alignItems:"center", gap:"0.5rem", fontSize:"0.91rem", animation:"fadeIn .25s ease" }}>
                    {areaResult.found ? <Check size={15}/> : <AlertCircle size={15}/>}
                    {areaResult.found ? `Great — we service ${areaResult.city}!` : "May still be covered — message us to confirm."}
                  </div>
                )}
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"1.4rem", padding:"1.9rem", height:"100%" }}>
                <p style={{ margin:"0 0 0.4rem", fontSize:"0.75rem", textTransform:"uppercase", letterSpacing:"0.2em", color:T.gold, fontWeight:700 }}>Top Reviews</p>
                <h3 style={{ margin:"0 0 1.35rem", color:"#fff", fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:"1.2rem" }}>Why homeowners choose Keystoners</h3>
                <div style={{ display:"flex", flexDirection:"column", gap:"0.9rem" }}>
                  {reviews.slice(0,3).map((r,i)=>(
                    <div key={i} style={{ background:"rgba(255,255,255,0.05)", borderRadius:"1rem", padding:"1.05rem", border:"1px solid rgba(255,255,255,0.07)" }}>
                      <div style={{ display:"flex", gap:2, marginBottom:"0.42rem" }}>{Array.from({length:r.stars}).map((_,idx)=><Star key={idx} size={12} style={{color:T.gold,fill:T.gold}}/>)}</div>
                      <p style={{ margin:"0 0 0.6rem", color:"rgba(255,255,255,0.7)", lineHeight:1.65, fontSize:"0.87rem" }}>"{r.text}"</p>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"0.4rem" }}>
                        <p style={{ margin:0, color:"#fff", fontWeight:700, fontSize:"0.83rem" }}>{r.name} <span style={{fontWeight:400,color:T.navyMuted}}>— {r.location}</span></p>
                        <span style={{ background:T.goldFaint, color:T.gold, borderRadius:"999px", padding:"0.18rem 0.65rem", fontSize:"0.73rem", fontWeight:700, border:"1px solid rgba(230,168,23,0.2)" }}>{r.service}</span>
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
      <section id="reviews" style={{ background:T.navyDeep, padding:"6rem 1.25rem" }}>
        <div style={{ maxWidth:1300, margin:"0 auto" }}>
          <Reveal>
            <div style={{ textAlign:"center", marginBottom:"2.9rem" }}>
              <p style={{ margin:"0 0 0.55rem", fontSize:"0.75rem", textTransform:"uppercase", letterSpacing:"0.2em", color:T.gold, fontWeight:700 }}>All Reviews</p>
              <h2 style={{ margin:"0 0 0.8rem", fontFamily:"'Bricolage Grotesque',sans-serif", color:"#fff", fontWeight:800, fontSize:"clamp(2rem,3.8vw,3rem)", letterSpacing:"-0.028em" }}>What customers are saying</h2>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"0.32rem" }}>
                {Array.from({length:5}).map((_,i)=><Star key={i} size={18} style={{color:T.gold,fill:T.gold}}/>)}
                <span style={{ color:T.navyMuted, marginLeft:"0.45rem", fontSize:"0.88rem" }}>5.0 average · 100+ reviews</span>
              </div>
            </div>
          </Reveal>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"1.1rem" }}>
            {reviews.map((r,i)=>(
              <Reveal key={i} delay={i*65}>
                <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.09)", borderRadius:"1.2rem", padding:"1.5rem", height:"100%", transition:"border-color .2s, transform .2s" }}
                  onMouseEnter={e=>{ e.currentTarget.style.borderColor="rgba(230,168,23,0.2)"; e.currentTarget.style.transform="translateY(-4px)"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.borderColor="rgba(255,255,255,0.09)"; e.currentTarget.style.transform=""; }}
                >
                  <div style={{ display:"flex", gap:2, marginBottom:"0.75rem" }}>{Array.from({length:r.stars}).map((_,idx)=><Star key={idx} size={13} style={{color:T.gold,fill:T.gold}}/>)}</div>
                  <p style={{ margin:"0 0 1rem", color:"rgba(255,255,255,0.68)", lineHeight:1.72, fontSize:"0.92rem" }}>"{r.text}"</p>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"0.5rem" }}>
                    <p style={{ margin:0, fontWeight:700, fontSize:"0.84rem", color:"#fff" }}>{r.name} <span style={{fontWeight:400,color:T.navyMuted}}>— {r.location}</span></p>
                    <span style={{ background:T.goldFaint, color:T.gold, borderRadius:"999px", padding:"0.2rem 0.65rem", fontSize:"0.73rem", fontWeight:700, border:"1px solid rgba(230,168,23,0.18)" }}>{r.service}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════ FAQ ════ */}
      <section id="faq" style={{ background:`linear-gradient(180deg, ${T.navyMid} 0%, ${T.navyDeep} 100%)`, padding:"6rem 1.25rem" }}>
        <div style={{ maxWidth:820, margin:"0 auto" }}>
          <Reveal>
            <div style={{ textAlign:"center", marginBottom:"2.7rem" }}>
              <p style={{ margin:"0 0 0.55rem", fontSize:"0.75rem", textTransform:"uppercase", letterSpacing:"0.2em", color:T.gold, fontWeight:700 }}>FAQ</p>
              <h2 style={{ margin:0, fontFamily:"'Bricolage Grotesque',sans-serif", color:"#fff", fontWeight:800, fontSize:"clamp(2rem,3.8vw,3rem)", letterSpacing:"-0.028em" }}>Common questions</h2>
            </div>
          </Reveal>
          <div style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"1.4rem", padding:"0.4rem 1.6rem" }}>
            {faqs.map((f,i)=>(
              <Reveal key={i} delay={i*55}><FAQItem q={f.q} a={f.a} i={i}/></Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <div style={{ textAlign:"center", marginTop:"2.4rem" }}>
              <p style={{ color:T.navyMuted, marginBottom:"1.1rem" }}>Still have questions?</p>
              <div style={{ display:"flex", gap:"0.8rem", justifyContent:"center", flexWrap:"wrap" }}>
                <GlowBtn gold onClick={()=>openQuote()}>Get a Free Quote</GlowBtn>
                <GlowBtn wa href={buildWA(WA_DEFAULT_MSG)} target="_blank" rel="noopener noreferrer"><MessageCircle size={15}/> WhatsApp Us</GlowBtn>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════ CTA BANNER ════ */}
      <section style={{ background:T.gradGold, padding:"4.5rem 1.25rem", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(ellipse 60% 80% at 90% 50%, rgba(255,255,255,0.12) 0%, transparent 60%)", pointerEvents:"none" }}/>
        <div style={{ maxWidth:1100, margin:"0 auto", position:"relative" }}>
          <Reveal>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:"2rem", flexWrap:"wrap" }}>
              <div>
                <h2 style={{ margin:"0 0 0.55rem", fontFamily:"'Bricolage Grotesque',sans-serif", color:T.navy, fontWeight:800, fontSize:"clamp(1.8rem,3.2vw,2.6rem)", letterSpacing:"-0.025em" }}>Ready to clean up your property?</h2>
                <p style={{ margin:0, color:"rgba(10,22,40,0.65)", fontSize:"1.02rem" }}>Free quote in under 24 hours. No pressure, no obligation.</p>
              </div>
              <div className="cta-row" style={{ display:"flex", gap:"0.8rem", flexWrap:"wrap" }}>
                <button onClick={()=>openQuote()} style={{ background:T.navy, color:"#fff", border:"none", borderRadius:"0.9rem", padding:"1.05rem 1.7rem", fontWeight:800, cursor:"pointer", display:"flex", alignItems:"center", gap:"0.5rem", fontSize:"1rem", fontFamily:"inherit", transition:"transform .2s, box-shadow .2s", boxShadow:"0 8px 24px rgba(9,20,40,0.3)" }}
                  onMouseEnter={e=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow="0 16px 40px rgba(9,20,40,0.45)"; }}
                  onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow="0 8px 24px rgba(9,20,40,0.3)"; }}
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
      <section id="contact" style={{ background:T.navyDeep, padding:"6rem 1.25rem" }}>
        <div style={{ maxWidth:1300, margin:"0 auto" }}>
          <div className="two-col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4.5rem", alignItems:"start" }}>

            <Reveal from="left">
              <p style={{ margin:"0 0 0.55rem", fontSize:"0.75rem", textTransform:"uppercase", letterSpacing:"0.2em", color:T.gold, fontWeight:700 }}>Contact Us</p>
              <h2 style={{ margin:"0 0 1.1rem", fontFamily:"'Bricolage Grotesque',sans-serif", color:"#fff", fontWeight:800, fontSize:"clamp(2rem,3.3vw,2.9rem)", lineHeight:1.08, letterSpacing:"-0.028em" }}>
                Request your<br/>free quote
              </h2>
              <p style={{ margin:"0 0 2rem", color:T.navyMuted, lineHeight:1.8, maxWidth:400 }}>
                Fill the form and it opens WhatsApp with your quote details pre-filled. We reply the same day.
              </p>
              <div style={{ display:"flex", flexDirection:"column", gap:"1.2rem" }}>
                {[
                  { icon:Phone,  label:"Phone",        value:PHONE_DISPLAY, href:`tel:${PHONE_RAW}` },
                  { icon:Clock3, label:"Response Time", value:"Same day to 24 hours" },
                  { icon:MapPin, label:"Coverage Area", value:"Vancouver & Lower Mainland" },
                ].map(item=>{
                  const Icon = item.icon;
                  return (
                    <div key={item.label} style={{ display:"flex", alignItems:"center", gap:"0.9rem" }}>
                      <div style={{ width:44, height:44, borderRadius:"0.8rem", background:"rgba(230,168,23,0.1)", border:"1px solid rgba(230,168,23,0.18)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <Icon size={18} style={{ color:T.gold }}/>
                      </div>
                      <div>
                        <p style={{ margin:0, fontSize:"0.72rem", color:T.navyMuted, textTransform:"uppercase", letterSpacing:"0.08em" }}>{item.label}</p>
                        {item.href
                          ? <a href={item.href} style={{ color:"#fff", fontWeight:700, fontSize:"0.95rem" }}>{item.value}</a>
                          : <p style={{ margin:0, color:"#fff", fontWeight:700, fontSize:"0.95rem" }}>{item.value}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>

            <Reveal delay={90}><ContactForm/></Reveal>
          </div>
        </div>
      </section>

      {/* ════ FOOTER ════ */}
      <footer style={{ background:"rgba(4,10,22,0.98)", color:"rgba(255,255,255,0.5)", borderTop:"1px solid rgba(255,255,255,0.07)" }}>
        <div className="footer-grid" style={{ maxWidth:1300, margin:"0 auto", padding:"3.5rem 1.25rem 2rem", display:"grid", gridTemplateColumns:"1.6fr 1fr 1fr 1fr", gap:"2.5rem" }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1.1rem" }}>
              <div style={{ width:40, height:40, borderRadius:"0.72rem", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(230,168,23,0.25)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Sparkles size={16} style={{ color:T.gold }}/>
              </div>
              <span style={{ color:"#fff", fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:"1.02rem", letterSpacing:"-0.02em" }}>Keystoners</span>
            </div>
            <p style={{ margin:"0 0 1.1rem", lineHeight:1.74, maxWidth:260, fontSize:"0.87rem" }}>Professional exterior cleaning across Vancouver and the Lower Mainland.</p>
            <a href={`tel:${PHONE_RAW}`} style={{ color:T.gold, fontWeight:700, fontSize:"0.9rem" }}>{PHONE_DISPLAY}</a>
          </div>
          <div>
            <p style={{ margin:"0 0 0.9rem", color:"rgba(255,255,255,0.82)", fontWeight:700, fontSize:"0.87rem" }}>Services</p>
            {services.map(s=>(
              <button key={s.title} onClick={()=>openService(s)} style={{ display:"block", background:"none", border:"none", padding:"0.3rem 0", color:"rgba(255,255,255,0.48)", cursor:"pointer", fontSize:"0.85rem", textAlign:"left", transition:"color .15s" }}
                onMouseEnter={e=>e.currentTarget.style.color="rgba(255,255,255,0.85)"}
                onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.48)"}
              >{s.title}</button>
            ))}
          </div>
          <div>
            <p style={{ margin:"0 0 0.9rem", color:"rgba(255,255,255,0.82)", fontWeight:700, fontSize:"0.87rem" }}>Pages</p>
            {[["Why Us","why-us"],["Results","results"],["Reviews","reviews"],["FAQ","faq"],["Contact","contact"]].map(([l,id])=>(
              <button key={id} onClick={()=>scrollTo(id)} style={{ display:"block", background:"none", border:"none", padding:"0.3rem 0", color:"rgba(255,255,255,0.48)", cursor:"pointer", fontSize:"0.85rem", textAlign:"left", transition:"color .15s" }}
                onMouseEnter={e=>e.currentTarget.style.color="rgba(255,255,255,0.85)"}
                onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,0.48)"}
              >{l}</button>
            ))}
          </div>
          <div>
            <p style={{ margin:"0 0 0.9rem", color:"rgba(255,255,255,0.82)", fontWeight:700, fontSize:"0.87rem" }}>Areas</p>
            {coverage.slice(0,6).map(c=><p key={c} style={{ margin:"0.3rem 0", fontSize:"0.85rem" }}>{c}</p>)}
          </div>
        </div>
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.07)", maxWidth:1300, margin:"0 auto", padding:"1.25rem 1.25rem", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"0.75rem" }}>
          <p style={{ margin:0, fontSize:"0.78rem" }}>© 2025 Keystoners Exterior Cleaning. All rights reserved.</p>
          <GlowBtn gold onClick={()=>openQuote()} style={{ padding:"0.62rem 1.15rem", fontSize:"0.85rem", borderRadius:"0.68rem" }}>Get Free Quote</GlowBtn>
        </div>
      </footer>

      {/* ════ STICKY BOTTOM BAR ════ */}
      <div className="sticky-bar" style={{ position:"fixed", bottom:0, left:0, right:0, zIndex:400, background:"rgba(7,14,32,0.94)", backdropFilter:"blur(20px)", borderTop:"1px solid rgba(255,255,255,0.1)", padding:"0.8rem 1.25rem", display:"flex", gap:"0.65rem", alignItems:"center", justifyContent:"center" }}>
        <GlowBtn gold onClick={()=>openQuote()} style={{ flex:"1 1 auto", maxWidth:200, padding:"0.75rem 1rem", fontSize:"0.88rem", borderRadius:"0.75rem" }}>
          <Sparkles size={15}/><span className="sticky-label">Free Quote</span>
        </GlowBtn>
        <GlowBtn href={`tel:${PHONE_RAW}`} style={{ flex:"1 1 auto", maxWidth:160, padding:"0.75rem 1rem", fontSize:"0.88rem", borderRadius:"0.75rem" }}>
          <Phone size={15}/><span className="sticky-label">{PHONE_DISPLAY}</span>
        </GlowBtn>
        <GlowBtn wa href={buildWA(WA_DEFAULT_MSG)} target="_blank" rel="noopener noreferrer" style={{ flex:"1 1 auto", maxWidth:180, padding:"0.75rem 1rem", fontSize:"0.88rem", borderRadius:"0.75rem" }}>
          <MessageCircle size={15}/><span className="sticky-label">WhatsApp</span>
        </GlowBtn>
      </div>

      {/* ════ FLOATING WHATSAPP ════ */}
      <a href={buildWA(WA_DEFAULT_MSG)} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" style={{ position:"fixed", right:20, bottom:90, zIndex:999, display:"flex", alignItems:"center", justifyContent:"center", width:58, height:58, background:"#25D366", borderRadius:"50%", boxShadow:"0 8px 32px rgba(37,211,102,0.5)", border:"2px solid rgba(255,255,255,0.2)", animation:"pulseDot 2.5s ease-in-out infinite", transition:"transform .2s" }}
        onMouseEnter={e=>{ e.currentTarget.style.transform="scale(1.12)"; }}
        onMouseLeave={e=>{ e.currentTarget.style.transform=""; }}
      >
        <MessageCircle size={24} color="#fff"/>
      </a>

      {/* ════ MODALS ════ */}
      <QuoteModal   open={quoteOpen} onClose={()=>setQuoteOpen(false)} prefill={quotePrefill}/>
      <ServiceModal service={selSvc} open={svcOpen}  onClose={()=>setSvcOpen(false)} onQuote={openQuote}/>
    </div>
  );
}