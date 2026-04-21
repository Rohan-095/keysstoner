'use client';

import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight, Phone, ShieldCheck, Sparkles, Clock3, MapPin, Star,
  Droplets, Home, Wind, Waves, ChevronRight, CheckCircle2,
  Menu, X, ChevronDown, Send, Check, AlertCircle, Loader2,
  MessageCircle, BadgeCheck, Zap, ThumbsUp, Award,
} from "lucide-react";

/* ─── Config ─────────────────────────────────────────────────── */
const PHONE_DISPLAY  = "+1 250-317-1366";
const PHONE_RAW      = "12503171366";
const WA_DEFAULT_MSG = "Hi Keystoners, I'd like a free quote for exterior cleaning.";
const buildWA = (msg) => `https://wa.me/${PHONE_RAW}?text=${encodeURIComponent(msg)}`;

/* ─── Design Tokens ──────────────────────────────────────────── */
const T = {
  navy:      "#0a1628",
  navyMid:   "#122044",
  navyDeep:  "#0d1c3a",
  navyCard:  "#162444",
  navyBorder:"rgba(255,255,255,0.1)",
  navyMuted: "rgba(255,255,255,0.62)",
  navyFaint: "rgba(255,255,255,0.08)",
  gold:      "#f0b429",
  goldGlow:  "rgba(240,180,41,0.28)",
  white:     "#ffffff",
  offWhite:  "#f5f8fc",
  lightCard: "#eef3fa",
  slate:     "#60748b",
  slateMid:  "#4a6080",
  slateLight:"#8fa0b8",
  ink:       "#0f1c2e",
  border:    "#dde5f0",
  green:     "#16a34a",
  greenBg:   "#dcfce7",
};

/* ─── Data ───────────────────────────────────────────────────── */
const services = [
  { title:"Roof Soft Wash",    short:"Remove moss, algae and black streaks safely — no pressure, no shingle damage.",    desc:"Biodegradable solution kills growth at the root for lasting results. Safe on asphalt, cedar, metal and tile.",                                icon:ShieldCheck, price:"From $349",    duration:"2–4 hrs",  image:"/roof-cleaning.jpg" },
  { title:"Gutter Cleaning",   short:"Clear blocked gutters before overflow damages fascia, siding and foundations.",     desc:"Full scoop-out, downspout flush and visual inspection included. Great for seasonal property maintenance.",                                icon:Droplets,    price:"From $149",    duration:"1–2 hrs",  image:"/image-2.jpg"       },
  { title:"House Washing",     short:"Restore siding, trim and soffits with a gentle, thorough soft wash.",              desc:"Safe for vinyl, Hardie board, stucco and painted surfaces. Removes dirt, mildew and algae cleanly.",                                    icon:Home,        price:"From $299",    duration:"2–3 hrs",  image:"/image-1.jpg"       },
  { title:"Pressure Washing",  short:"Deep-clean driveways, patios and hard surfaces to a like-new finish.",             desc:"Powerful cleaning for concrete, brick and pavers. Cuts through stains, marks and grime fast.",                                           icon:Waves,       price:"From $199",    duration:"1–3 hrs",  image:"/floor.jpg"         },
  { title:"Window Cleaning",   short:"Crystal-clear, streak-free exterior windows that refresh the whole property.",     desc:"Pure-water fed-pole system for spotless results up to 3 storeys. Includes frames, sills and screens.",                                  icon:Sparkles,    price:"From $179",    duration:"1–2 hrs",  image:"/image-1.jpg"       },
  { title:"Maintenance Plans", short:"Scheduled seasonal care — roof, gutters and surfaces in one recurring bundle.",    desc:"Priority scheduling, locked pricing and no annual contracts. Ideal for homeowners and strata.",                                         icon:Wind,        price:"From $499/yr", duration:"Ongoing",  image:"/pipe-cleaning.jpg" },
];

const beforeAfter = [
  { title:"Driveway Pressure Wash",  tag:"Pressure Washing", image:"/floor.jpg"          },
  { title:"Gutter Clear-Out",        tag:"Gutter Cleaning",  image:"/image-2.jpg"        },
  { title:"Roof Moss Removal",       tag:"Roof Soft Wash",   image:"/roof-cleaning.jpg"  },
  { title:"Pipe & Exterior Refresh", tag:"Maintenance",      image:"/pipe-cleaning.jpg"  },
];

const coverage = [
  "Vancouver","Burnaby","Richmond","Surrey",
  "Langley","Coquitlam","New Westminster","North Vancouver",
  "West Vancouver","Delta","Maple Ridge","Port Coquitlam",
];

const reviews = [
  { name:"Sarah M.", location:"Vancouver",      stars:5, service:"Gutter Cleaning",  text:"Gutters completely cleared and the property looked noticeably cleaner the same day. Very professional and easy to deal with." },
  { name:"David K.", location:"Burnaby",        stars:5, service:"House Washing",    text:"House wash made a massive difference. Fast response, no hassle, and everything looked fresh again." },
  { name:"Priya T.", location:"North Vancouver",stars:5, service:"Roof Soft Wash",   text:"Roof soft wash removed years of growth. Honest, clean work and very easy communication throughout." },
  { name:"James O.", location:"Surrey",         stars:5, service:"Pressure Washing", text:"Driveway and hard surfaces came out way better than expected. Great value and a neat, careful finish." },
  { name:"Linda H.", location:"Richmond",       stars:5, service:"Window Cleaning",  text:"Crystal-clear windows — not a single streak. Did our second floor too. Booking again for sure." },
];

const faqs = [
  { q:"Do I need to be home during the service?",         a:"Usually no. We only need access details and any specific instructions. Most exterior jobs can be completed while you're away, and we send photos when done." },
  { q:"How long does a roof soft wash last?",             a:"Typically 2–3 years depending on shade, moisture and tree coverage. The treatment targets root growth, not just the visible surface layer." },
  { q:"Is soft washing safe for my roof warranty?",       a:"Yes — soft washing is the manufacturer-recommended method for most roofing types. High-pressure washing risks voiding warranties; soft wash does not." },
  { q:"Do you service strata or commercial properties?",  a:"Yes. We offer strata and maintenance plans with repeat scheduling, priority booking and invoicing direct to the strata council." },
  { q:"Can I message you directly on WhatsApp?",          a:"Absolutely. The floating button, quote popup and contact form all open WhatsApp directly with your details pre-filled." },
];

/* ─── Hooks ──────────────────────────────────────────────────── */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} className={className} style={{ opacity:vis?1:0, transform:vis?"none":"translateY(22px)", transition:`opacity .6s ease ${delay}ms, transform .6s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

/* ─── Form Styles ────────────────────────────────────────────── */
const fld = { width:"100%", background:"#fff", border:`1px solid ${T.border}`, borderRadius:"0.75rem", padding:"0.85rem 1rem", color:T.ink, fontSize:"0.94rem", outline:"none", boxSizing:"border-box", fontFamily:"inherit" };
const sel = (v) => ({ ...fld, color:v ? T.ink : T.slateLight });

/* ─── Modal Shell ────────────────────────────────────────────── */
function Modal({ open, onClose, children }) {
  useEffect(() => { document.body.style.overflow = open?"hidden":""; return () => { document.body.style.overflow=""; }; }, [open]);
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:1000, background:"rgba(8,18,40,0.78)", backdropFilter:"blur(7px)", display:"flex", alignItems:"center", justifyContent:"center", padding:"1rem" }}>
      <div onClick={e=>e.stopPropagation()} style={{ position:"relative", width:"100%", maxWidth:560, maxHeight:"92vh", overflowY:"auto", background:T.white, borderRadius:"1.5rem", boxShadow:"0 40px 90px rgba(8,18,40,0.28)" }}>
        <button onClick={onClose} style={{ position:"absolute", top:14, right:14, width:34, height:34, borderRadius:"50%", border:`1px solid ${T.border}`, background:T.offWhite, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:T.slate, zIndex:2 }}>
          <X size={14} />
        </button>
        {children}
      </div>
    </div>
  );
}

/* ─── Quote Modal ────────────────────────────────────────────── */
function QuoteModal({ open, onClose, prefill = "" }) {
  const [form, setForm] = useState({ name:"", phone:"", email:"", service:prefill, city:"", message:"" });
  const [status, setStatus] = useState("idle");
  const set = (k,v) => setForm(f=>({...f,[k]:v}));
  useEffect(() => { if (open) { setForm(f=>({...f, service:prefill||f.service})); setStatus("idle"); } }, [open, prefill]);
  const valid = form.name && form.phone && form.service && form.city;

  const submit = () => {
    if (!valid) return;
    setStatus("loading");
    const msg = ["Hi Keystoners, I need a quote.", `Name: ${form.name}`, `Phone: ${form.phone}`, form.email?`Email: ${form.email}`:null, `Service: ${form.service}`, `City: ${form.city}`, form.message?`Note: ${form.message}`:null].filter(Boolean).join("\n");
    setTimeout(() => { setStatus("success"); window.open(buildWA(msg), "_blank", "noopener,noreferrer"); }, 600);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ padding:"2rem" }}>
        {status==="success" ? (
          <div style={{ textAlign:"center", padding:"1rem 0" }}>
            <div style={{ width:64, height:64, borderRadius:"50%", background:T.greenBg, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 1.1rem" }}>
              <Check size={28} style={{ color:T.green }} />
            </div>
            <h3 style={{ margin:"0 0 0.4rem", color:T.navy, fontFamily:"'Bricolage Grotesque',sans-serif", fontSize:"1.3rem", fontWeight:800 }}>Opening WhatsApp…</h3>
            <p style={{ margin:"0 0 1.2rem", color:T.slate }}>Your quote details are pre-filled and ready to send.</p>
            <button onClick={onClose} style={{ background:T.navy, color:"#fff", border:"none", borderRadius:"0.75rem", padding:"0.8rem 1.6rem", fontWeight:700, cursor:"pointer" }}>Done</button>
          </div>
        ) : (
          <>
            <h3 style={{ margin:"0 0 0.3rem", color:T.navy, fontFamily:"'Bricolage Grotesque',sans-serif", fontSize:"1.38rem", fontWeight:800 }}>Get your free quote</h3>
            <p style={{ margin:"0 0 1.3rem", color:T.slate, fontSize:"0.9rem" }}>Fill once — WhatsApp opens with your message ready to send.</p>
            <div style={{ display:"flex", flexDirection:"column", gap:"0.7rem" }}>
              {[["text","Full Name *","name"],["tel","Phone Number *","phone"],["email","Email (optional)","email"]].map(([type,ph,k]) => (
                <input key={k} type={type} placeholder={ph} value={form[k]} onChange={e=>set(k,e.target.value)} style={fld} />
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
              <textarea rows={3} placeholder="Anything else?" value={form.message} onChange={e=>set("message",e.target.value)} style={{...fld, resize:"vertical"}} />
              <button onClick={submit} disabled={!valid||status==="loading"} style={{ background:valid?"#25D366":T.border, color:valid?"#fff":T.slateLight, border:"none", borderRadius:"0.8rem", padding:"0.95rem", fontWeight:700, fontSize:"0.97rem", cursor:valid?"pointer":"not-allowed", display:"flex", alignItems:"center", justifyContent:"center", gap:"0.5rem" }}>
                {status==="loading" ? <><Loader2 size={16} style={{animation:"spin 1s linear infinite"}}/>Preparing…</> : <><MessageCircle size={16}/>Send on WhatsApp</>}
              </button>
              {!valid && <p style={{margin:0,color:T.slateLight,fontSize:"0.8rem"}}><AlertCircle size={11} style={{display:"inline",marginRight:4}}/>Name, phone, service and city are required</p>}
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}

/* ─── Service Modal ──────────────────────────────────────────── */
function ServiceModal({ service, open, onClose, onQuote }) {
  if (!service) return null;
  const Icon = service.icon;
  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ borderRadius:"1.5rem", overflow:"hidden" }}>
        <div style={{ height:200, position:"relative", overflow:"hidden" }}>
          <img src={service.image} alt={service.title} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(10,22,40,0.8), transparent 55%)" }} />
          <div style={{ position:"absolute", bottom:14, left:14, display:"flex", gap:"0.5rem" }}>
            <span style={{ background:T.gold, color:T.navy, borderRadius:"999px", padding:"0.28rem 0.8rem", fontSize:"0.8rem", fontWeight:800 }}>{service.price}</span>
            <span style={{ background:"rgba(255,255,255,0.18)", color:"#fff", backdropFilter:"blur(4px)", borderRadius:"999px", padding:"0.28rem 0.8rem", fontSize:"0.8rem" }}><Clock3 size={11} style={{display:"inline",marginRight:3}}/>{service.duration}</span>
          </div>
        </div>
        <div style={{ padding:"1.5rem" }}>
          <div style={{ width:42, height:42, borderRadius:"0.7rem", background:T.lightCard, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"0.9rem" }}>
            <Icon size={20} style={{ color:T.navyMid }} />
          </div>
          <h3 style={{ margin:"0 0 0.65rem", color:T.navy, fontFamily:"'Bricolage Grotesque',sans-serif", fontSize:"1.35rem", fontWeight:800 }}>{service.title}</h3>
          <p style={{ margin:"0 0 0.5rem", color:T.slate, lineHeight:1.72 }}>{service.short}</p>
          <p style={{ margin:"0 0 1.4rem", color:T.slateLight, lineHeight:1.72, fontSize:"0.92rem" }}>{service.desc}</p>
          <div style={{ display:"flex", gap:"0.75rem", flexWrap:"wrap" }}>
            <button onClick={()=>{onClose();onQuote(service.title);}} style={{ background:T.navy, color:"#fff", border:"none", borderRadius:"0.75rem", padding:"0.85rem 1.4rem", fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", gap:"0.45rem" }}>
              <ArrowRight size={15}/> Get a Quote
            </button>
            <a href={buildWA(`Hi Keystoners, I'm interested in ${service.title}. Can I get a quote?`)} target="_blank" rel="noopener noreferrer" style={{ background:"#25D366", color:"#fff", borderRadius:"0.75rem", padding:"0.85rem 1.2rem", fontWeight:700, display:"flex", alignItems:"center", gap:"0.45rem", textDecoration:"none" }}>
              <MessageCircle size={15}/> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </Modal>
  );
}

/* ─── FAQ Item ───────────────────────────────────────────────── */
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom:`1px solid rgba(255,255,255,0.1)` }}>
      <button onClick={()=>setOpen(!open)} style={{ width:"100%", background:"none", border:"none", padding:"1.15rem 0", display:"flex", justifyContent:"space-between", alignItems:"center", gap:"1rem", cursor:"pointer", textAlign:"left" }}>
        <span style={{ color:"#fff", fontWeight:700, fontSize:"0.97rem", lineHeight:1.45 }}>{q}</span>
        <ChevronDown size={17} style={{ color:T.gold, flexShrink:0, transform:open?"rotate(180deg)":"none", transition:"transform .22s" }} />
      </button>
      {open && <p style={{ margin:"0 0 1.1rem", color:T.navyMuted, lineHeight:1.78, fontSize:"0.94rem" }}>{a}</p>}
    </div>
  );
}

/* ─── Contact Form ───────────────────────────────────────────── */
function ContactForm() {
  const [form, setForm] = useState({ name:"", phone:"", email:"", service:"", city:"", message:"" });
  const [status, setStatus] = useState("idle");
  const set = (k,v) => setForm(f=>({...f,[k]:v}));
  const valid = form.name && form.phone && form.service && form.city;

  const submit = (e) => {
    e.preventDefault(); if (!valid) return;
    setStatus("loading");
    const msg = ["Hi Keystoners, quote request from website.", `Name: ${form.name}`, `Phone: ${form.phone}`, form.email?`Email: ${form.email}`:null, `Service: ${form.service}`, `City: ${form.city}`, form.message?`Note: ${form.message}`:null].filter(Boolean).join("\n");
    setTimeout(() => { setStatus("success"); window.open(buildWA(msg), "_blank", "noopener,noreferrer"); }, 600);
  };

  if (status==="success") return (
    <div style={{ background:T.greenBg, border:"1px solid #86efac", borderRadius:"1.25rem", padding:"2.5rem", textAlign:"center" }}>
      <Check size={32} style={{ color:T.green, marginBottom:"0.65rem" }} />
      <h4 style={{ margin:"0 0 0.35rem", color:T.navy, fontWeight:800 }}>Opening WhatsApp…</h4>
      <p style={{ margin:0, color:T.slate, fontSize:"0.9rem" }}>Your details are pre-filled and ready to send to Keystoners.</p>
    </div>
  );

  return (
    <form onSubmit={submit} style={{ display:"flex", flexDirection:"column", gap:"0.75rem", background:T.white, border:`1px solid ${T.border}`, borderRadius:"1.25rem", padding:"1.6rem", boxShadow:"0 18px 50px rgba(10,22,40,0.09)" }}>
      <div className="form-name-row" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.75rem" }}>
        <input type="text" placeholder="Full Name *" value={form.name}  onChange={e=>set("name",e.target.value)} style={fld} />
        <input type="tel"  placeholder="Phone *"     value={form.phone} onChange={e=>set("phone",e.target.value)} style={fld} />
      </div>
      <input type="email" placeholder="Email (optional)" value={form.email} onChange={e=>set("email",e.target.value)} style={fld} />
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
      <textarea rows={4} placeholder="Additional details (optional)" value={form.message} onChange={e=>set("message",e.target.value)} style={{...fld, resize:"vertical"}} />
      <button type="submit" disabled={!valid||status==="loading"} style={{ background:valid?"#25D366":T.border, color:valid?"#fff":T.slateLight, border:"none", borderRadius:"0.85rem", padding:"1rem", fontWeight:700, fontSize:"0.97rem", cursor:valid?"pointer":"not-allowed", display:"flex", alignItems:"center", justifyContent:"center", gap:"0.5rem" }}>
        {status==="loading" ? <><Loader2 size={16} style={{animation:"spin 1s linear infinite"}}/>Preparing…</> : <><Send size={15}/>Send via WhatsApp</>}
      </button>
      {!valid && <p style={{margin:0,color:T.slateLight,fontSize:"0.8rem"}}><AlertCircle size={11} style={{display:"inline",marginRight:4}}/>Name, phone, service and city are required</p>}
    </form>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function HomePage() {
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [quoteOpen,    setQuoteOpen]    = useState(false);
  const [quotePrefill, setQuotePrefill] = useState("");
  const [selSvc,       setSelSvc]       = useState(null);
  const [svcOpen,      setSvcOpen]      = useState(false);
  const [areaSearch,   setAreaSearch]   = useState("");
  const [areaResult,   setAreaResult]   = useState(null);

  const openQuote   = (pre="") => { setQuotePrefill(pre); setQuoteOpen(true); };
  const openService = (s)       => { setSelSvc(s); setSvcOpen(true); };
  const scrollTo    = (id)      => { setMobileOpen(false); document.getElementById(id)?.scrollIntoView({ behavior:"smooth", block:"start" }); };

  const checkArea = () => {
    const q = areaSearch.toLowerCase().trim(); if (!q) return;
    const match = coverage.find(c=>c.toLowerCase().includes(q));
    setAreaResult(match ? { found:true, city:match } : { found:false });
  };

  const navLinks = [
    { label:"Services",     id:"services" },
    { label:"Results",      id:"results"  },
    { label:"Why Us",       id:"why-us"   },
    { label:"Service Area", id:"coverage" },
    { label:"Reviews",      id:"reviews"  },
    { label:"Contact",      id:"contact"  },
  ];

  return (
    <div style={{ minHeight:"100vh", background:T.navy, color:T.white, fontFamily:"'DM Sans',system-ui,sans-serif" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&family=Bricolage+Grotesque:wght@600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; }
        a { color: inherit; text-decoration: none; }
        input, textarea, select, button { font-family: inherit; }
        input::placeholder, textarea::placeholder { color: ${T.slateLight}; }
        input:focus, textarea:focus, select:focus { outline: none; border-color: ${T.navyMid} !important; box-shadow: 0 0 0 3px rgba(18,32,68,0.12) !important; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${T.navyDeep}; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 3px; }
        @keyframes spin    { to { transform: rotate(360deg); } }
        @keyframes fadeUp  { from { opacity:0; transform:translateY(22px); } to { opacity:1; transform:none; } }

        .nav-a:hover       { color: #fff !important; }
        .footer-a:hover    { color: rgba(255,255,255,0.85) !important; }
        .svc-card          { transition: transform .26s ease, box-shadow .26s ease; cursor: pointer; }
        .svc-card:hover    { transform: translateY(-5px); box-shadow: 0 24px 56px rgba(10,22,40,0.22) !important; }
        .svc-card:hover .svc-img { transform: scale(1.05); }
        .svc-img           { transition: transform .42s ease; display: block; }
        .res-card          { overflow: hidden; transition: transform .26s ease; }
        .res-card:hover    { transform: translateY(-3px); }
        .res-card img      { transition: transform .38s ease; }
        .res-card:hover img{ transform: scale(1.04); }
        .city-pill:hover   { background: rgba(240,180,41,0.12) !important; border-color: rgba(240,180,41,0.4) !important; color: ${T.gold} !important; }

        @media (max-width: 1060px) {
          .hero-grid  { grid-template-columns: 1fr !important; }
          .hero-right { display: none !important; }
        }
        @media (max-width: 920px) {
          .desktop-nav { display: none !important; }
          .menu-btn    { display: flex !important; }
          .two-col     { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .stats-grid  { grid-template-columns: repeat(2,1fr) !important; }
          .svc-grid    { grid-template-columns: repeat(2,1fr) !important; }
          .float-badge { display: none !important; }
          .hero-ctas, .cta-row { flex-direction: column !important; }
          .hero-ctas > *, .cta-row > * { width:100% !important; justify-content: center; text-align: center; }
        }
        @media (max-width: 620px) {
          .svc-grid        { grid-template-columns: 1fr !important; }
          .results-grid    { grid-template-columns: 1fr !important; }
          .trust-grid      { grid-template-columns: 1fr !important; }
          .city-grid       { grid-template-columns: repeat(2,1fr) !important; }
          .footer-grid     { grid-template-columns: 1fr 1fr !important; }
          .form-name-row   { grid-template-columns: 1fr !important; }
          .wa-label        { display: none !important; }
          .trust-chips     { justify-content: flex-start !important; }
        }
      `}</style>

      {/* ════ HEADER ════ */}
      <header style={{ position:"sticky", top:0, zIndex:200, background:"rgba(10,22,40,0.94)", backdropFilter:"blur(18px)", borderBottom:"1px solid rgba(255,255,255,0.09)" }}>
        <div style={{ maxWidth:1300, margin:"0 auto", padding:"0 1.25rem", minHeight:72, display:"flex", alignItems:"center", justifyContent:"space-between", gap:"1rem" }}>

          <button onClick={()=>scrollTo("hero")} style={{ display:"flex", alignItems:"center", gap:"0.7rem", background:"none", border:"none", cursor:"pointer", padding:0 }}>
            <div style={{ width:42, height:42, borderRadius:"0.8rem", background:"linear-gradient(135deg,#1e3a6e,#0a1628)", border:"1px solid rgba(240,180,41,0.35)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Sparkles size={18} style={{ color:T.gold }} />
            </div>
            <div style={{ textAlign:"left" }}>
              <p style={{ margin:0, fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:"1.02rem", color:"#fff" }}>Keystoners</p>
              <p style={{ margin:0, color:T.navyMuted, fontSize:"0.7rem" }}>Exterior Cleaning</p>
            </div>
          </button>

          <nav className="desktop-nav" style={{ display:"flex", gap:"1.7rem" }}>
            {navLinks.map(l=>(
              <button key={l.id} onClick={()=>scrollTo(l.id)} className="nav-a" style={{ background:"none", border:"none", color:T.navyMuted, fontSize:"0.88rem", fontWeight:500, cursor:"pointer", padding:0, transition:"color .15s" }}>{l.label}</button>
            ))}
          </nav>

          <div style={{ display:"flex", gap:"0.6rem", alignItems:"center" }}>
            <a href={`tel:${PHONE_RAW}`} style={{ display:"flex", alignItems:"center", gap:"0.4rem", background:T.navyFaint, border:"1px solid rgba(255,255,255,0.14)", borderRadius:"0.7rem", padding:"0.55rem 0.9rem", fontWeight:600, fontSize:"0.87rem", color:"#fff" }}>
              <Phone size={14}/> <span className="wa-label">{PHONE_DISPLAY}</span>
            </a>
            <button onClick={()=>openQuote()} style={{ background:T.gold, color:T.navy, border:"none", borderRadius:"0.7rem", padding:"0.6rem 1rem", fontWeight:800, cursor:"pointer", fontSize:"0.9rem" }}>Free Quote</button>
            <button className="menu-btn" onClick={()=>setMobileOpen(v=>!v)} style={{ display:"none", width:40, height:40, alignItems:"center", justifyContent:"center", background:T.navyFaint, border:"1px solid rgba(255,255,255,0.12)", borderRadius:"0.7rem", cursor:"pointer", color:"#fff" }}>
              {mobileOpen ? <X size={18}/> : <Menu size={18}/>}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div style={{ background:T.navyDeep, borderTop:"1px solid rgba(255,255,255,0.08)", padding:"0.6rem 1.25rem 1.1rem" }}>
            {navLinks.map(l=>(
              <button key={l.id} onClick={()=>scrollTo(l.id)} style={{ display:"block", width:"100%", textAlign:"left", background:"none", border:"none", color:"rgba(255,255,255,0.82)", padding:"0.82rem 0", borderBottom:"1px solid rgba(255,255,255,0.07)", fontSize:"0.97rem", cursor:"pointer" }}>{l.label}</button>
            ))}
            <button onClick={()=>{setMobileOpen(false);openQuote();}} style={{ marginTop:"0.8rem", width:"100%", background:T.gold, color:T.navy, border:"none", borderRadius:"0.85rem", padding:"0.95rem", fontWeight:800, cursor:"pointer" }}>Get Free Quote</button>
          </div>
        )}
      </header>

      {/* ════ HERO ════ */}
      <section id="hero" style={{ background:`linear-gradient(145deg, #081120 0%, ${T.navyMid} 60%, #193565 100%)`, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, zIndex:0, backgroundImage:"radial-gradient(ellipse 55% 42% at 80% 20%, rgba(240,180,41,0.13) 0%, transparent 55%), radial-gradient(ellipse 40% 35% at 15% 75%, rgba(255,255,255,0.05) 0%, transparent 45%)" }} />

        <div className="hero-grid" style={{ maxWidth:1300, margin:"0 auto", padding:"5.5rem 1.25rem 5rem", display:"grid", gridTemplateColumns:"1.1fr 0.9fr", gap:"3.5rem", alignItems:"center", position:"relative", zIndex:1 }}>

          {/* Left */}
          <div style={{ animation:"fadeUp .7s ease both" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:"0.45rem", background:"rgba(240,180,41,0.12)", border:"1px solid rgba(240,180,41,0.28)", borderRadius:"999px", padding:"0.4rem 0.95rem", marginBottom:"1.4rem", color:"#fde68a", fontSize:"0.83rem", fontWeight:600 }}>
              <Star size={13} style={{ fill:"#fde68a", color:"#fde68a" }}/> Trusted exterior cleaning — Lower Mainland
            </div>

            <h1 style={{ margin:"0 0 1.1rem", fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:"clamp(2.5rem,5.8vw,4.5rem)", lineHeight:1.04, letterSpacing:"-0.035em", color:"#fff" }}>
              Your property deserves<br/>
              <span style={{ color:T.gold }}>to look its best.</span>
            </h1>

            <p style={{ margin:"0 0 2rem", color:T.navyMuted, fontSize:"1.06rem", lineHeight:1.78, maxWidth:570 }}>
              Roof washing, gutter cleaning, pressure washing, house washing and window cleaning across Vancouver and the Lower Mainland. Fast quotes. Real results.
            </p>

            <div className="hero-ctas" style={{ display:"flex", gap:"0.85rem", flexWrap:"wrap", marginBottom:"2.2rem" }}>
              <button onClick={()=>openQuote()} style={{ background:T.gold, color:T.navy, border:"none", borderRadius:"0.85rem", padding:"1rem 1.7rem", fontWeight:800, fontSize:"1rem", cursor:"pointer", display:"flex", alignItems:"center", gap:"0.45rem", boxShadow:`0 12px 30px ${T.goldGlow}` }}>
                Get Free Quote <ArrowRight size={16}/>
              </button>
              <a href={`tel:${PHONE_RAW}`} style={{ display:"flex", alignItems:"center", gap:"0.5rem", background:T.navyFaint, border:"1px solid rgba(255,255,255,0.18)", borderRadius:"0.85rem", padding:"1rem 1.4rem", color:"#fff", fontWeight:600, fontSize:"0.97rem" }}>
                <Phone size={15}/> {PHONE_DISPLAY}
              </a>
              <a href={buildWA(WA_DEFAULT_MSG)} target="_blank" rel="noopener noreferrer" style={{ display:"flex", alignItems:"center", gap:"0.5rem", background:"#25D366", borderRadius:"0.85rem", padding:"1rem 1.4rem", color:"#fff", fontWeight:700, fontSize:"0.97rem" }}>
                <MessageCircle size={15}/> WhatsApp
              </a>
            </div>

            <div className="trust-chips" style={{ display:"flex", gap:"1.4rem", flexWrap:"wrap" }}>
              {["500+ Homes Cleaned","5★ Rated","Same-Day Response","Fully Insured"].map(t=>(
                <div key={t} style={{ display:"flex", alignItems:"center", gap:"0.38rem", color:"rgba(255,255,255,0.6)", fontSize:"0.84rem" }}>
                  <CheckCircle2 size={13} style={{ color:T.gold }}/> {t}
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="hero-right" style={{ position:"relative", animation:"fadeUp .7s .15s ease both" }}>
            <div style={{ borderRadius:"1.8rem", overflow:"hidden", border:"1px solid rgba(255,255,255,0.13)", boxShadow:"0 48px 100px rgba(0,0,0,0.4)" }}>
              <div style={{ position:"relative", aspectRatio:"4/5" }}>
                <img src="/roof-cleaning.jpg" alt="Roof cleaning result" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(8,18,40,0.78) 0%, transparent 52%)" }} />
                <div style={{ position:"absolute", left:14, right:14, bottom:14, background:"rgba(255,255,255,0.95)", borderRadius:"1.1rem", padding:"1.1rem" }}>
                  <p style={{ margin:"0 0 0.22rem", color:T.slate, fontSize:"0.75rem" }}>Most requested combo</p>
                  <p style={{ margin:"0 0 0.8rem", color:T.navy, fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:"1rem" }}>Roof Wash + Gutter Clean</p>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.45rem", marginBottom:"0.8rem" }}>
                    {["Protects roof edges","Improves drainage"].map(t=>(
                      <div key={t} style={{ background:T.offWhite, borderRadius:"0.6rem", padding:"0.55rem 0.65rem", fontSize:"0.76rem", color:T.navy }}>{t}</div>
                    ))}
                  </div>
                  <button onClick={()=>openQuote("Roof Soft Wash + Gutter Cleaning")} style={{ width:"100%", background:T.navy, color:"#fff", border:"none", borderRadius:"0.65rem", padding:"0.68rem", fontWeight:700, cursor:"pointer", fontSize:"0.875rem" }}>
                    Get a Quote for This Combo
                  </button>
                </div>
              </div>
            </div>

            <div className="float-badge" style={{ position:"absolute", top:"2.5rem", left:"-5rem", background:"#fff", borderRadius:"1rem", padding:"0.8rem 1rem", boxShadow:"0 16px 44px rgba(10,22,40,0.18)", display:"flex", alignItems:"center", gap:"0.65rem" }}>
              <div style={{ width:38, height:38, borderRadius:"0.65rem", background:T.lightCard, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Clock3 size={17} style={{ color:T.navyMid }}/>
              </div>
              <div>
                <p style={{ margin:0, color:T.slate, fontSize:"0.72rem" }}>Average response</p>
                <p style={{ margin:0, color:T.navy, fontWeight:800, fontSize:"0.89rem" }}>Same day · under 24 hrs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ background:"rgba(0,0,0,0.28)", borderTop:"1px solid rgba(255,255,255,0.1)" }}>
          <div className="stats-grid" style={{ maxWidth:1300, margin:"0 auto", padding:"1.05rem 1.25rem", display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1rem" }}>
            {[{v:"24hr",l:"Quote response"},{v:"5★",l:"Top-rated service"},{v:"500+",l:"Homes cleaned"},{v:"100%",l:"Satisfaction focus"}].map(s=>(
              <div key={s.l} style={{ textAlign:"center" }}>
                <p style={{ margin:0, fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:"1.5rem", color:T.gold }}>{s.v}</p>
                <p style={{ margin:0, fontSize:"0.8rem", color:T.navyMuted }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ SERVICES ════ */}
      <section id="services" style={{ background:T.offWhite, padding:"5.5rem 1.25rem" }}>
        <div style={{ maxWidth:1300, margin:"0 auto" }}>
          <Reveal>
            <div style={{ textAlign:"center", marginBottom:"3rem" }}>
              <p style={{ margin:"0 0 0.5rem", fontSize:"0.77rem", textTransform:"uppercase", letterSpacing:"0.18em", color:T.gold, fontWeight:700 }}>Our Services</p>
              <h2 style={{ margin:"0 0 0.8rem", fontFamily:"'Bricolage Grotesque',sans-serif", color:T.navy, fontWeight:800, fontSize:"clamp(1.9rem,3.6vw,2.85rem)", letterSpacing:"-0.025em" }}>Everything your exterior needs</h2>
              <p style={{ margin:"0 auto", color:T.slate, maxWidth:540, lineHeight:1.72 }}>Click any service card to see what's included, starting price, and how to get booked.</p>
            </div>
          </Reveal>

          <div className="svc-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1.2rem" }}>
            {services.map((svc,i)=>{
              const Icon = svc.icon;
              return (
                <Reveal key={svc.title} delay={i*60}>
                  <div className="svc-card" onClick={()=>openService(svc)} style={{ background:T.white, borderRadius:"1.2rem", overflow:"hidden", border:`1px solid ${T.border}`, boxShadow:"0 6px 24px rgba(10,22,40,0.07)", height:"100%", display:"flex", flexDirection:"column" }}>
                    <div style={{ height:188, overflow:"hidden", position:"relative" }}>
                      <img src={svc.image} alt={svc.title} className="svc-img" style={{ width:"100%", height:"100%", objectFit:"cover" }}/>
                      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(10,22,40,0.55) 0%, transparent 55%)" }}/>
                      <span style={{ position:"absolute", left:12, bottom:12, background:T.gold, color:T.navy, borderRadius:"999px", padding:"0.28rem 0.72rem", fontSize:"0.78rem", fontWeight:800 }}>{svc.price}</span>
                    </div>
                    <div style={{ padding:"1.2rem", flex:1, display:"flex", flexDirection:"column" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:"0.6rem", marginBottom:"0.7rem" }}>
                        <div style={{ width:34, height:34, borderRadius:"0.65rem", background:T.lightCard, display:"flex", alignItems:"center", justifyContent:"center" }}>
                          <Icon size={16} style={{ color:T.navyMid }}/>
                        </div>
                        <h3 style={{ margin:0, color:T.navy, fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:"1.02rem" }}>{svc.title}</h3>
                      </div>
                      <p style={{ margin:"0 0 1rem", color:T.slate, lineHeight:1.67, fontSize:"0.89rem", flex:1 }}>{svc.short}</p>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"0.5rem" }}>
                        <span style={{ display:"flex", alignItems:"center", gap:"0.3rem", color:T.navyMid, fontWeight:700, fontSize:"0.87rem" }}>View details <ChevronRight size={13}/></span>
                        <span style={{ color:T.slateLight, fontSize:"0.77rem" }}><Clock3 size={11} style={{display:"inline",marginRight:3}}/>{svc.duration}</span>
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
      <section id="results" style={{ background:T.navyDeep, padding:"5.5rem 1.25rem" }}>
        <div style={{ maxWidth:1300, margin:"0 auto" }}>
          <Reveal>
            <div style={{ textAlign:"center", marginBottom:"3rem" }}>
              <p style={{ margin:"0 0 0.5rem", fontSize:"0.77rem", textTransform:"uppercase", letterSpacing:"0.18em", color:T.gold, fontWeight:700 }}>Real Work</p>
              <h2 style={{ margin:"0 0 0.8rem", fontFamily:"'Bricolage Grotesque',sans-serif", color:"#fff", fontWeight:800, fontSize:"clamp(1.9rem,3.6vw,2.85rem)", letterSpacing:"-0.025em" }}>Results that speak for themselves</h2>
              <p style={{ margin:"0 auto", color:T.navyMuted, maxWidth:540, lineHeight:1.72 }}>Every job is treated with care and attention to detail — here's what that looks like on site.</p>
            </div>
          </Reveal>

          <div className="results-grid" style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"1rem" }}>
            {beforeAfter.map((item,i)=>(
              <Reveal key={item.title} delay={i*65}>
                <div className="res-card" style={{ borderRadius:"1.2rem", overflow:"hidden", border:"1px solid rgba(255,255,255,0.1)", boxShadow:"0 18px 48px rgba(0,0,0,0.25)" }}>
                  <div style={{ position:"relative", overflow:"hidden" }}>
                    <img src={item.image} alt={item.title} style={{ width:"100%", height:300, objectFit:"cover", display:"block" }}/>
                    <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(10,22,40,0.72) 0%, transparent 55%)" }}/>
                    <div style={{ position:"absolute", bottom:14, left:14, right:14, display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:"0.5rem" }}>
                      <p style={{ margin:0, color:"#fff", fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:700, fontSize:"1.02rem" }}>{item.title}</p>
                      <span style={{ background:T.gold, color:T.navy, borderRadius:"999px", padding:"0.28rem 0.75rem", fontSize:"0.77rem", fontWeight:800, whiteSpace:"nowrap" }}>{item.tag}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div style={{ textAlign:"center", marginTop:"2.5rem" }}>
              <button onClick={()=>openQuote()} style={{ background:T.gold, color:T.navy, border:"none", borderRadius:"0.85rem", padding:"1rem 2rem", fontWeight:800, cursor:"pointer", display:"inline-flex", alignItems:"center", gap:"0.5rem", fontSize:"1rem" }}>
                Get My Free Quote <ArrowRight size={16}/>
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════ WHY US ════ */}
      <section id="why-us" style={{ background:T.white, padding:"5.5rem 1.25rem" }}>
        <div style={{ maxWidth:1300, margin:"0 auto" }}>
          <div className="two-col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4rem", alignItems:"center" }}>

            <Reveal>
              <p style={{ margin:"0 0 0.5rem", fontSize:"0.77rem", textTransform:"uppercase", letterSpacing:"0.18em", color:T.gold, fontWeight:700 }}>Why Keystoners</p>
              <h2 style={{ margin:"0 0 1rem", fontFamily:"'Bricolage Grotesque',sans-serif", color:T.navy, fontWeight:800, fontSize:"clamp(1.9rem,3.5vw,2.75rem)", lineHeight:1.1, letterSpacing:"-0.025em" }}>
                Professional service.<br/>No surprises.
              </h2>
              <p style={{ margin:"0 0 1.8rem", color:T.slate, lineHeight:1.78, maxWidth:460 }}>
                Honest communication, fast quotes, safe cleaning methods and a clean finish every time. No contracts, no pressure, no hidden fees.
              </p>
              <div className="cta-row" style={{ display:"flex", gap:"0.8rem", flexWrap:"wrap" }}>
                <button onClick={()=>openQuote()} style={{ background:T.navy, color:"#fff", border:"none", borderRadius:"0.85rem", padding:"0.95rem 1.6rem", fontWeight:700, cursor:"pointer", display:"flex", alignItems:"center", gap:"0.45rem" }}>
                  Get Free Quote <ArrowRight size={15}/>
                </button>
                <a href={buildWA(WA_DEFAULT_MSG)} target="_blank" rel="noopener noreferrer" style={{ background:"#25D366", color:"#fff", borderRadius:"0.85rem", padding:"0.95rem 1.3rem", fontWeight:700, display:"flex", alignItems:"center", gap:"0.45rem" }}>
                  <MessageCircle size={15}/> WhatsApp
                </a>
              </div>
            </Reveal>

            <div className="trust-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
              {[
                { icon:BadgeCheck,  title:"No-pressure quotes",  body:"Clear guidance with no confusing sales tactics involved."         },
                { icon:Zap,         title:"Same-day response",    body:"Most requests answered within hours — often the same day."        },
                { icon:ThumbsUp,    title:"Proven clean results", body:"Care, attention and a thorough finish on every single job."       },
                { icon:ShieldCheck, title:"Safe methods",         body:"Soft-wash and correct-pressure techniques protect your surfaces." },
                { icon:MapPin,      title:"Local team",           body:"A local Lower Mainland crew — not a franchise or call centre."   },
                { icon:Award,       title:"5-star track record",  body:"Hundreds of satisfied homeowners across the Lower Mainland."     },
              ].map((tp,i)=>{
                const Icon = tp.icon;
                return (
                  <Reveal key={tp.title} delay={i*55}>
                    <div style={{ background:T.offWhite, border:`1px solid ${T.border}`, borderRadius:"1rem", padding:"1.2rem" }}>
                      <div style={{ width:38, height:38, borderRadius:"0.65rem", background:T.lightCard, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"0.8rem" }}>
                        <Icon size={17} style={{ color:T.navyMid }}/>
                      </div>
                      <p style={{ margin:"0 0 0.28rem", color:T.navy, fontWeight:700, fontSize:"0.92rem" }}>{tp.title}</p>
                      <p style={{ margin:0, color:T.slate, lineHeight:1.62, fontSize:"0.83rem" }}>{tp.body}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ════ SERVICE AREA + REVIEWS PREVIEW ════ */}
      <section id="coverage" style={{ background:T.navyDeep, padding:"5.5rem 1.25rem" }}>
        <div style={{ maxWidth:1300, margin:"0 auto" }}>
          <div className="two-col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.5rem" }}>

            <Reveal>
              <div style={{ background:T.navyCard, border:T.navyBorder, borderRadius:"1.25rem", padding:"1.8rem", height:"100%" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1.5rem" }}>
                  <div style={{ width:42, height:42, borderRadius:"0.75rem", background:"rgba(255,255,255,0.08)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <MapPin size={20} style={{ color:T.gold }}/>
                  </div>
                  <div>
                    <p style={{ margin:0, color:T.navyMuted, fontSize:"0.78rem" }}>Service Area</p>
                    <h3 style={{ margin:0, color:"#fff", fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:"1.18rem" }}>Vancouver & Lower Mainland</h3>
                  </div>
                </div>

                <div className="city-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"0.5rem", marginBottom:"1.1rem" }}>
                  {coverage.map(city=>(
                    <div key={city} className="city-pill" onClick={()=>{ setAreaSearch(city); setAreaResult({found:true,city}); }} style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"0.6rem", padding:"0.58rem 0.5rem", textAlign:"center", color:T.navyMuted, fontSize:"0.81rem", cursor:"pointer", transition:"all .15s" }}>{city}</div>
                  ))}
                </div>

                <div style={{ display:"flex", gap:"0.65rem" }}>
                  <input value={areaSearch} onChange={e=>{ setAreaSearch(e.target.value); setAreaResult(null); }} onKeyDown={e=>e.key==="Enter"&&checkArea()} placeholder="Type your city…" style={{ flex:1, background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.14)", borderRadius:"0.75rem", padding:"0.8rem 1rem", color:"#fff", fontSize:"0.92rem", outline:"none", fontFamily:"inherit" }}/>
                  <button onClick={checkArea} style={{ background:T.gold, color:T.navy, border:"none", borderRadius:"0.75rem", padding:"0 1.1rem", fontWeight:800, cursor:"pointer", whiteSpace:"nowrap" }}>Check</button>
                </div>

                {areaResult && (
                  <div style={{ marginTop:"0.85rem", padding:"0.85rem 1rem", borderRadius:"0.8rem", background:areaResult.found?"rgba(22,163,74,0.12)":"rgba(220,38,38,0.12)", border:`1px solid ${areaResult.found?"rgba(22,163,74,0.3)":"rgba(220,38,38,0.3)"}`, color:areaResult.found?"#4ade80":"#f87171", display:"flex", alignItems:"center", gap:"0.5rem", fontSize:"0.9rem" }}>
                    {areaResult.found ? <Check size={14}/> : <AlertCircle size={14}/>}
                    {areaResult.found ? `We service ${areaResult.city}!` : "May still be covered — message us on WhatsApp to confirm."}
                  </div>
                )}
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div style={{ background:T.navyCard, border:T.navyBorder, borderRadius:"1.25rem", padding:"1.8rem", height:"100%" }}>
                <p style={{ margin:"0 0 0.4rem", fontSize:"0.77rem", textTransform:"uppercase", letterSpacing:"0.18em", color:T.gold, fontWeight:700 }}>Top Reviews</p>
                <h3 style={{ margin:"0 0 1.25rem", color:"#fff", fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:"1.18rem" }}>Why homeowners choose Keystoners</h3>
                <div style={{ display:"flex", flexDirection:"column", gap:"0.85rem" }}>
                  {reviews.slice(0,3).map((r,i)=>(
                    <div key={i} style={{ background:"rgba(255,255,255,0.06)", borderRadius:"0.95rem", padding:"1rem" }}>
                      <div style={{ display:"flex", gap:2, marginBottom:"0.4rem" }}>{Array.from({length:r.stars}).map((_,idx)=><Star key={idx} size={12} style={{color:T.gold,fill:T.gold}}/>)}</div>
                      <p style={{ margin:"0 0 0.55rem", color:"rgba(255,255,255,0.72)", lineHeight:1.63, fontSize:"0.87rem" }}>"{r.text}"</p>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"0.4rem" }}>
                        <p style={{ margin:0, color:"#fff", fontWeight:700, fontSize:"0.83rem" }}>{r.name} <span style={{fontWeight:400,color:T.navyMuted}}>— {r.location}</span></p>
                        <span style={{ background:"rgba(240,180,41,0.14)", color:T.gold, borderRadius:"999px", padding:"0.18rem 0.6rem", fontSize:"0.73rem", fontWeight:700 }}>{r.service}</span>
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
      <section id="reviews" style={{ background:T.offWhite, padding:"5.5rem 1.25rem" }}>
        <div style={{ maxWidth:1300, margin:"0 auto" }}>
          <Reveal>
            <div style={{ textAlign:"center", marginBottom:"2.8rem" }}>
              <p style={{ margin:"0 0 0.5rem", fontSize:"0.77rem", textTransform:"uppercase", letterSpacing:"0.18em", color:T.gold, fontWeight:700 }}>All Reviews</p>
              <h2 style={{ margin:"0 0 0.75rem", fontFamily:"'Bricolage Grotesque',sans-serif", color:T.navy, fontWeight:800, fontSize:"clamp(1.9rem,3.6vw,2.85rem)", letterSpacing:"-0.025em" }}>What customers are saying</h2>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"0.3rem" }}>
                {Array.from({length:5}).map((_,i)=><Star key={i} size={17} style={{color:T.gold,fill:T.gold}}/>)}
                <span style={{ color:T.slate, marginLeft:"0.4rem", fontSize:"0.88rem" }}>5.0 average · 100+ reviews</span>
              </div>
            </div>
          </Reveal>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))", gap:"1.1rem" }}>
            {reviews.map((r,i)=>(
              <Reveal key={i} delay={i*60}>
                <div style={{ background:T.white, border:`1px solid ${T.border}`, borderRadius:"1.1rem", padding:"1.4rem", height:"100%" }}>
                  <div style={{ display:"flex", gap:2, marginBottom:"0.72rem" }}>{Array.from({length:r.stars}).map((_,idx)=><Star key={idx} size={13} style={{color:T.gold,fill:T.gold}}/>)}</div>
                  <p style={{ margin:"0 0 1rem", color:T.slate, lineHeight:1.7, fontSize:"0.92rem" }}>"{r.text}"</p>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"0.5rem" }}>
                    <p style={{ margin:0, fontWeight:700, fontSize:"0.84rem", color:T.navy }}>{r.name} <span style={{fontWeight:400,color:T.slateLight}}>— {r.location}</span></p>
                    <span style={{ background:T.lightCard, color:T.navyMid, borderRadius:"999px", padding:"0.2rem 0.6rem", fontSize:"0.73rem", fontWeight:700 }}>{r.service}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════ FAQ ════ */}
      <section id="faq" style={{ background:T.navyDeep, padding:"5.5rem 1.25rem" }}>
        <div style={{ maxWidth:820, margin:"0 auto" }}>
          <Reveal>
            <div style={{ textAlign:"center", marginBottom:"2.5rem" }}>
              <p style={{ margin:"0 0 0.5rem", fontSize:"0.77rem", textTransform:"uppercase", letterSpacing:"0.18em", color:T.gold, fontWeight:700 }}>FAQ</p>
              <h2 style={{ margin:0, fontFamily:"'Bricolage Grotesque',sans-serif", color:"#fff", fontWeight:800, fontSize:"clamp(1.9rem,3.6vw,2.85rem)", letterSpacing:"-0.025em" }}>Common questions</h2>
            </div>
          </Reveal>
          <div style={{ background:T.navyCard, border:"1px solid rgba(255,255,255,0.1)", borderRadius:"1.25rem", padding:"0.3rem 1.5rem" }}>
            {faqs.map((f,i)=>(
              <Reveal key={i} delay={i*50}><FAQItem q={f.q} a={f.a}/></Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <div style={{ textAlign:"center", marginTop:"2.2rem" }}>
              <p style={{ color:T.navyMuted, marginBottom:"1rem" }}>Still have questions?</p>
              <div style={{ display:"flex", gap:"0.75rem", justifyContent:"center", flexWrap:"wrap" }}>
                <button onClick={()=>openQuote()} style={{ background:T.gold, color:T.navy, border:"none", borderRadius:"0.85rem", padding:"0.9rem 1.75rem", fontWeight:800, cursor:"pointer" }}>Get a Free Quote</button>
                <a href={buildWA(WA_DEFAULT_MSG)} target="_blank" rel="noopener noreferrer" style={{ background:"#25D366", color:"#fff", borderRadius:"0.85rem", padding:"0.9rem 1.4rem", fontWeight:700, display:"inline-flex", alignItems:"center", gap:"0.45rem" }}>
                  <MessageCircle size={15}/> WhatsApp Us
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════ CTA BANNER ════ */}
      <section style={{ background:T.gold, padding:"4rem 1.25rem" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <Reveal>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:"2rem", flexWrap:"wrap" }}>
              <div>
                <h2 style={{ margin:"0 0 0.5rem", fontFamily:"'Bricolage Grotesque',sans-serif", color:T.navy, fontWeight:800, fontSize:"clamp(1.7rem,3vw,2.4rem)", letterSpacing:"-0.02em" }}>Ready to clean up your property?</h2>
                <p style={{ margin:0, color:"rgba(10,22,40,0.7)", fontSize:"1rem" }}>Free quote in under 24 hours. No pressure, no obligation.</p>
              </div>
              <div className="cta-row" style={{ display:"flex", gap:"0.75rem", flexWrap:"wrap" }}>
                <button onClick={()=>openQuote()} style={{ background:T.navy, color:"#fff", border:"none", borderRadius:"0.85rem", padding:"1rem 1.6rem", fontWeight:800, cursor:"pointer", display:"flex", alignItems:"center", gap:"0.45rem", fontSize:"1rem" }}>
                  Get Free Quote <ArrowRight size={16}/>
                </button>
                <a href={`tel:${PHONE_RAW}`} style={{ display:"flex", alignItems:"center", gap:"0.5rem", background:"rgba(10,22,40,0.1)", color:T.navy, border:"1px solid rgba(10,22,40,0.18)", borderRadius:"0.85rem", padding:"1rem 1.4rem", fontWeight:700, fontSize:"0.97rem" }}>
                  <Phone size={15}/> {PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════ CONTACT ════ */}
      <section id="contact" style={{ background:T.white, padding:"5.5rem 1.25rem" }}>
        <div style={{ maxWidth:1300, margin:"0 auto" }}>
          <div className="two-col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4rem", alignItems:"start" }}>

            <Reveal>
              <p style={{ margin:"0 0 0.5rem", fontSize:"0.77rem", textTransform:"uppercase", letterSpacing:"0.18em", color:T.gold, fontWeight:700 }}>Contact Us</p>
              <h2 style={{ margin:"0 0 1rem", fontFamily:"'Bricolage Grotesque',sans-serif", color:T.navy, fontWeight:800, fontSize:"clamp(1.9rem,3.2vw,2.75rem)", lineHeight:1.1, letterSpacing:"-0.025em" }}>
                Request your<br/>free quote
              </h2>
              <p style={{ margin:"0 0 1.8rem", color:T.slate, lineHeight:1.78, maxWidth:400 }}>
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
                    <div key={item.label} style={{ display:"flex", alignItems:"center", gap:"0.85rem" }}>
                      <div style={{ width:42, height:42, borderRadius:"0.75rem", background:T.lightCard, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <Icon size={17} style={{ color:T.navyMid }}/>
                      </div>
                      <div>
                        <p style={{ margin:0, fontSize:"0.73rem", color:T.slateLight, textTransform:"uppercase", letterSpacing:"0.07em" }}>{item.label}</p>
                        {item.href
                          ? <a href={item.href} style={{ color:T.navy, fontWeight:700, fontSize:"0.94rem" }}>{item.value}</a>
                          : <p style={{ margin:0, color:T.navy, fontWeight:700, fontSize:"0.94rem" }}>{item.value}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>

            <Reveal delay={80}><ContactForm/></Reveal>
          </div>
        </div>
      </section>

      {/* ════ FOOTER ════ */}
      <footer style={{ background:T.navy, color:"rgba(255,255,255,0.6)" }}>
        <div className="footer-grid" style={{ maxWidth:1300, margin:"0 auto", padding:"3.5rem 1.25rem 2rem", display:"grid", gridTemplateColumns:"1.6fr 1fr 1fr 1fr", gap:"2.5rem" }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:"0.7rem", marginBottom:"1rem" }}>
              <div style={{ width:38, height:38, borderRadius:"0.65rem", background:"rgba(255,255,255,0.07)", border:"1px solid rgba(240,180,41,0.25)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Sparkles size={15} style={{ color:T.gold }}/>
              </div>
              <span style={{ color:"#fff", fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:"1rem" }}>Keystoners</span>
            </div>
            <p style={{ margin:"0 0 1rem", lineHeight:1.7, maxWidth:260, fontSize:"0.87rem" }}>Professional exterior cleaning across Vancouver and the Lower Mainland.</p>
            <a href={`tel:${PHONE_RAW}`} style={{ color:T.gold, fontWeight:700, fontSize:"0.9rem" }}>{PHONE_DISPLAY}</a>
          </div>
          <div>
            <p style={{ margin:"0 0 0.85rem", color:"rgba(255,255,255,0.85)", fontWeight:700, fontSize:"0.87rem" }}>Services</p>
            {services.map(s=><button key={s.title} onClick={()=>openService(s)} className="footer-a" style={{ display:"block", background:"none", border:"none", padding:"0.3rem 0", color:"rgba(255,255,255,0.55)", cursor:"pointer", fontSize:"0.85rem", textAlign:"left", transition:"color .15s" }}>{s.title}</button>)}
          </div>
          <div>
            <p style={{ margin:"0 0 0.85rem", color:"rgba(255,255,255,0.85)", fontWeight:700, fontSize:"0.87rem" }}>Pages</p>
            {[["Why Us","why-us"],["Results","results"],["Reviews","reviews"],["FAQ","faq"],["Contact","contact"]].map(([l,id])=>(
              <button key={id} onClick={()=>scrollTo(id)} className="footer-a" style={{ display:"block", background:"none", border:"none", padding:"0.3rem 0", color:"rgba(255,255,255,0.55)", cursor:"pointer", fontSize:"0.85rem", textAlign:"left", transition:"color .15s" }}>{l}</button>
            ))}
          </div>
          <div>
            <p style={{ margin:"0 0 0.85rem", color:"rgba(255,255,255,0.85)", fontWeight:700, fontSize:"0.87rem" }}>Areas</p>
            {coverage.slice(0,6).map(c=><p key={c} style={{ margin:"0.3rem 0", fontSize:"0.85rem" }}>{c}</p>)}
          </div>
        </div>
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.09)", maxWidth:1300, margin:"0 auto", padding:"1.2rem 1.25rem", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"0.75rem" }}>
          <p style={{ margin:0, fontSize:"0.78rem" }}>© 2025 Keystoners Exterior Cleaning. All rights reserved.</p>
          <button onClick={()=>openQuote()} style={{ background:T.gold, color:T.navy, border:"none", borderRadius:"0.65rem", padding:"0.6rem 1.1rem", fontWeight:800, cursor:"pointer", fontSize:"0.84rem" }}>Get Free Quote</button>
        </div>
      </footer>

      {/* ════ FLOATING WHATSAPP ════ */}
      <a href={buildWA(WA_DEFAULT_MSG)} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" style={{ position:"fixed", right:18, bottom:18, zIndex:999, display:"flex", alignItems:"center", gap:"0.55rem", background:"#25D366", color:"#fff", borderRadius:"999px", padding:"0.9rem 1.1rem", fontWeight:800, fontSize:"0.9rem", boxShadow:"0 12px 30px rgba(37,211,102,0.38)", border:"1px solid rgba(255,255,255,0.2)" }}>
        <MessageCircle size={20}/>
        <span className="wa-label">WhatsApp Us</span>
      </a>

      {/* ════ MODALS ════ */}
      <QuoteModal   open={quoteOpen} onClose={()=>setQuoteOpen(false)}  prefill={quotePrefill}/>
      <ServiceModal service={selSvc}  open={svcOpen}   onClose={()=>setSvcOpen(false)} onQuote={openQuote}/>
    </div>
  );
}