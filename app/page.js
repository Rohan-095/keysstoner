'use client';

import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Phone,
  ShieldCheck,
  Sparkles,
  Clock3,
  MapPin,
  Star,
  Droplets,
  Home,
  Wind,
  Waves,
  ChevronRight,
  CheckCircle2,
  Menu,
  X,
  ChevronDown,
  Send,
  Check,
  AlertCircle,
  Loader2,
  MessageCircle,
  BadgeCheck,
  Zap,
  ThumbsUp,
} from "lucide-react";

/* ─── Constants ─────────────────────────────────────────────── */
const PHONE_DISPLAY  = "+1 250-317-1366";
const PHONE_RAW      = "12503171366";
const WA_DEFAULT_MSG = "Hi Keystoners, I'd like a free quote for exterior cleaning.";
const buildWA        = (msg) => `https://wa.me/${PHONE_RAW}?text=${encodeURIComponent(msg)}`;

/* ─── Design tokens ─────────────────────────────────────────── */
const C = {
  navy:      "#0d1c3f",
  navyMid:   "#1a3461",
  navyLight: "#2a4a82",
  blue50:    "#eef3fb",
  blue100:   "#ddeaf9",
  gold:      "#e6a817",
  goldDark:  "#c8920d",
  goldLight: "#fef3d0",
  white:     "#ffffff",
  offWhite:  "#f7f9fc",
  slate:     "#64748b",
  slateLight:"#94a3b8",
  ink:       "#0f172a",
  border:    "#e2e8f0",
};

/* ─── Data ───────────────────────────────────────────────────── */
const services = [
  {
    title:    "Roof Soft Wash",
    short:    "Remove moss, algae & black streaks without damaging your shingles.",
    desc:     "We use biodegradable solutions that kill organic growth at the root — preventing regrowth for 2–3 years. Safe on asphalt, cedar, metal & tile.",
    icon:     ShieldCheck,
    price:    "From $349",
    duration: "2–4 hrs",
    image:    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=700&q=80",
  },
  {
    title:    "Gutter Cleaning",
    short:    "Stop overflows that rot fascia, stain siding & damage foundations.",
    desc:     "Full scoop-out, bag disposal, downspout flush & inspection. We flag any sagging or damage while we're up there.",
    icon:     Droplets,
    price:    "From $149",
    duration: "1–2 hrs",
    image:    "https://images.unsplash.com/photo-1580983218765-f663bec07b37?auto=format&fit=crop&w=700&q=80",
  },
  {
    title:    "House Washing",
    short:    "Revive your siding, trim & soffits — safe on every exterior type.",
    desc:     "Soft-wash method safe for vinyl, Hardie board, stucco & cedar. Dramatically lifts curb appeal and protects your cladding from long-term decay.",
    icon:     Home,
    price:    "From $299",
    duration: "2–3 hrs",
    image:    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=700&q=80",
  },
  {
    title:    "Pressure Washing",
    short:    "Blast away grime from driveways, patios, walkways & concrete.",
    desc:     "Hot-water high-pressure cleaning removes oil stains, tire marks, moss & years of embedded dirt from concrete, brick & pavers.",
    icon:     Waves,
    price:    "From $199",
    duration: "1–3 hrs",
    image:    "https://images.unsplash.com/photo-1558618047-f4e90e0e33b0?auto=format&fit=crop&w=700&q=80",
  },
  {
    title:    "Window Cleaning",
    short:    "Streak-free exterior windows that brighten your whole property.",
    desc:     "Pure-water fed-pole system for spotless results on homes up to 3 storeys. Includes frames, sills & screen rinse — no chemicals, no streaks.",
    icon:     Sparkles,
    price:    "From $179",
    duration: "1–2 hrs",
    image:    "https://images.unsplash.com/photo-1527515862127-a4fc05baf7a5?auto=format&fit=crop&w=700&q=80",
  },
  {
    title:    "Maintenance Plans",
    short:    "Year-round care for homeowners, strata & commercial properties.",
    desc:     "Bi-annual or quarterly bundles — roof + gutters + house wash at locked-in pricing. Priority scheduling, no annual contracts.",
    icon:     Wind,
    price:    "From $499/yr",
    duration: "Ongoing",
    image:    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=700&q=80",
  },
];

const coverage = [
  "Vancouver","Burnaby","Richmond","Surrey",
  "Langley","Coquitlam","New Westminster","North Vancouver",
  "West Vancouver","Delta","Maple Ridge","Port Coquitlam",
];

const reviews = [
  { name:"Sarah M.", location:"Vancouver", stars:5, text:"Gutters completely cleared, house looks fresh again. Showed up exactly on time and left everything spotless.", service:"Gutter Cleaning" },
  { name:"David K.", location:"Burnaby",   stars:5, text:"Quick response and the house wash made a massive difference. Looks like a new home. Worth every penny.", service:"House Washing" },
  { name:"Priya T.", location:"North Van", stars:5, text:"Honest advice, zero upselling, very clean work. The roof soft wash removed years of moss. Super professional.", service:"Roof Soft Wash" },
  { name:"James O.", location:"Surrey",    stars:5, text:"My driveway hadn't looked this good since we moved in. Thorough and careful around the garden beds.", service:"Pressure Washing" },
  { name:"Linda H.", location:"Richmond",  stars:5, text:"Not a single streak on the windows. They did our second floor too — will definitely book again.", service:"Window Cleaning" },
];

const faqs = [
  { q:"Do I need to be home?", a:"No. Most exterior services don't require you home — just access details and pet instructions. We send before/after photos when done." },
  { q:"How long does a roof soft wash last?", a:"Typically 2–3 years depending on shade and moisture. We treat the root cause, not just visible growth on the surface." },
  { q:"Is soft washing safe for my roof warranty?", a:"Yes — it's the manufacturer-recommended cleaning method. High-pressure washing can void warranties; soft wash cannot." },
  { q:"Do you service strata buildings?", a:"Absolutely. We offer strata plans with bulk pricing, priority scheduling, and invoicing to the strata council." },
  { q:"What areas do you cover?", a:"Vancouver and the full Lower Mainland — Burnaby, Richmond, Surrey, Langley, Coquitlam, North/West Vancouver, Delta, and more." },
];

const trustPoints = [
  { icon: BadgeCheck, title:"No-pressure quotes",  body:"Free estimates — we give honest advice even if it means recommending nothing." },
  { icon: Zap,        title:"Same-day response",   body:"We reply within hours. Most quotes are sent the same day you reach out." },
  { icon: ThumbsUp,   title:"Before & after proof", body:"Every job includes photo documentation so you can see the result clearly." },
  { icon: ShieldCheck,title:"Insurance covered",   body:"Fully insured for liability so you can book with complete confidence." },
  { icon: MapPin,     title:"Local Lower Mainland", body:"We're a local crew — no call centres, no franchises, just your neighbours." },
  { icon: Star,       title:"5-star track record",  body:"Hundreds of happy homeowners across the Lower Mainland since launch." },
];

/* ─── Hooks & Helpers ────────────────────────────────────────── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : "translateY(24px)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

/* ─── Modal Shell ────────────────────────────────────────────── */
function Modal({ open, onClose, children }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position:"fixed", inset:0, zIndex:1000,
      background:"rgba(13,28,63,0.7)", backdropFilter:"blur(6px)",
      display:"flex", alignItems:"center", justifyContent:"center", padding:"1rem",
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        position:"relative", width:"100%", maxWidth:560,
        maxHeight:"90vh", overflowY:"auto",
        background:C.white, borderRadius:"1.5rem",
        boxShadow:"0 32px 80px rgba(13,28,63,0.2)",
      }}>
        <button onClick={onClose} style={{
          position:"absolute", top:16, right:16, width:36, height:36,
          border:`1px solid ${C.border}`, background:C.offWhite,
          borderRadius:"50%", cursor:"pointer", display:"flex",
          alignItems:"center", justifyContent:"center", color:C.slate,
        }}>
          <X size={15} />
        </button>
        {children}
      </div>
    </div>
  );
}

/* ─── Quote Modal ────────────────────────────────────────────── */
const fieldSt = {
  width:"100%", background:C.offWhite, border:`1px solid ${C.border}`,
  borderRadius:"0.75rem", padding:"0.8rem 1rem",
  color:C.ink, fontSize:"0.95rem", outline:"none", boxSizing:"border-box",
};
const selSt = (v) => ({ ...fieldSt, color: v ? C.ink : C.slateLight, background:"#fff" });

function QuoteModal({ open, onClose, prefill = "" }) {
  const [form, setForm] = useState({ name:"", phone:"", email:"", service:prefill, city:"", message:"" });
  const [status, setStatus] = useState("idle");
  useEffect(() => { if (open) { setForm(f => ({ ...f, service: prefill || f.service })); setStatus("idle"); } }, [open, prefill]);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const valid = form.name && form.phone && form.service && form.city;

  const submit = () => {
    if (!valid) return;
    setStatus("loading");
    const msg = ["Hi Keystoners, I need a quote.", `Name: ${form.name}`, `Phone: ${form.phone}`,
      form.email ? `Email: ${form.email}` : null, `Service: ${form.service}`, `City: ${form.city}`,
      form.message ? `Note: ${form.message}` : null].filter(Boolean).join("\n");
    setTimeout(() => { setStatus("success"); window.open(buildWA(msg), "_blank", "noopener,noreferrer"); }, 700);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ padding:"2rem" }}>
        {status === "success" ? (
          <div style={{ textAlign:"center", padding:"1rem 0" }}>
            <div style={{ width:64, height:64, borderRadius:"50%", background:"#dcfce7", margin:"0 auto 1.25rem", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Check size={28} style={{ color:"#16a34a" }} />
            </div>
            <h3 style={{ color:C.navy, fontSize:"1.35rem", margin:"0 0 0.5rem", fontWeight:700 }}>Opening WhatsApp…</h3>
            <p style={{ color:C.slate, marginBottom:"1.5rem" }}>Your quote details are pre-filled and ready to send.</p>
            <button onClick={onClose} style={{ background:C.navy, color:"#fff", border:"none", borderRadius:"0.75rem", padding:"0.75rem 2rem", fontWeight:700, cursor:"pointer" }}>Done</button>
          </div>
        ) : (
          <>
            <h3 style={{ color:C.navy, fontSize:"1.4rem", margin:"0 0 0.25rem", fontWeight:800 }}>Get your free quote</h3>
            <p style={{ color:C.slate, fontSize:"0.9rem", marginBottom:"1.4rem" }}>Fill once — we'll open WhatsApp with your message ready.</p>
            <div style={{ display:"flex", flexDirection:"column", gap:"0.7rem" }}>
              {[["text","Full Name *","name"],["tel","Phone *","phone"],["email","Email (optional)","email"]].map(([type,ph,key]) => (
                <input key={key} type={type} placeholder={ph} value={form[key]} onChange={e => set(key, e.target.value)} style={fieldSt} />
              ))}
              <select value={form.service} onChange={e => set("service", e.target.value)} style={selSt(form.service)}>
                <option value="">Service needed *</option>
                {services.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                <option value="Multiple Services">Multiple Services</option>
              </select>
              <select value={form.city} onChange={e => set("city", e.target.value)} style={selSt(form.city)}>
                <option value="">Your city *</option>
                {coverage.map(c => <option key={c} value={c}>{c}</option>)}
                <option value="Other">Other</option>
              </select>
              <textarea rows={3} placeholder="Anything else?" value={form.message} onChange={e => set("message", e.target.value)} style={{ ...fieldSt, resize:"vertical" }} />
              <button onClick={submit} disabled={!valid || status === "loading"} style={{
                background: valid ? C.navy : C.border, color: valid ? "#fff" : C.slateLight,
                border:"none", borderRadius:"0.8rem", padding:"0.9rem",
                fontWeight:700, fontSize:"1rem", cursor: valid ? "pointer" : "not-allowed",
                display:"flex", alignItems:"center", justifyContent:"center", gap:"0.5rem",
              }}>
                {status === "loading"
                  ? <><Loader2 size={17} style={{ animation:"spin 1s linear infinite" }} /> Preparing…</>
                  : <><Send size={15} /> Send on WhatsApp</>}
              </button>
              {!valid && <p style={{ margin:0, fontSize:"0.8rem", color:C.slateLight }}><AlertCircle size={11} style={{ display:"inline", marginRight:4 }} />Fields marked * are required</p>}
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
      <div style={{ overflow:"hidden", borderRadius:"1.5rem" }}>
        <div style={{ height:200, overflow:"hidden", position:"relative" }}>
          <img src={service.image} alt={service.title} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(13,28,63,0.6), transparent)" }} />
          <div style={{ position:"absolute", bottom:"1rem", left:"1rem", display:"flex", gap:"0.5rem" }}>
            <span style={{ background:C.gold, color:"#fff", borderRadius:"2rem", padding:"0.3rem 0.8rem", fontSize:"0.8rem", fontWeight:700 }}>{service.price}</span>
            <span style={{ background:"rgba(255,255,255,0.2)", color:"#fff", backdropFilter:"blur(4px)", borderRadius:"2rem", padding:"0.3rem 0.8rem", fontSize:"0.8rem" }}>
              <Clock3 size={11} style={{ display:"inline", marginRight:3 }} />{service.duration}
            </span>
          </div>
        </div>
        <div style={{ padding:"1.5rem" }}>
          <div style={{ width:44, height:44, borderRadius:"0.75rem", background:C.blue50, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"1rem" }}>
            <Icon size={22} style={{ color:C.navyMid }} />
          </div>
          <h3 style={{ color:C.navy, fontSize:"1.4rem", margin:"0 0 0.75rem", fontWeight:800 }}>{service.title}</h3>
          <p style={{ color:C.slate, lineHeight:1.7, marginBottom:"0.75rem" }}>{service.desc}</p>
          <div style={{ display:"flex", gap:"0.75rem", flexWrap:"wrap" }}>
            <button onClick={() => { onClose(); onQuote(service.title); }} style={{
              background:C.navy, color:"#fff", border:"none", borderRadius:"0.75rem",
              padding:"0.8rem 1.4rem", fontWeight:700, cursor:"pointer",
              display:"flex", alignItems:"center", gap:"0.5rem",
            }}>
              <ArrowRight size={15} /> Get a Quote
            </button>
            <a href={`tel:${PHONE_RAW}`} style={{
              display:"flex", alignItems:"center", gap:"0.5rem",
              background:C.offWhite, color:C.navy, border:`1px solid ${C.border}`,
              borderRadius:"0.75rem", padding:"0.8rem 1.2rem", fontWeight:600,
              textDecoration:"none", fontSize:"0.9rem",
            }}>
              <Phone size={15} /> Call Now
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
    <div style={{ borderBottom:`1px solid ${C.border}` }}>
      <button onClick={() => setOpen(!open)} style={{
        width:"100%", background:"none", border:"none", padding:"1.2rem 0",
        display:"flex", justifyContent:"space-between", alignItems:"center",
        gap:"1rem", cursor:"pointer", textAlign:"left",
      }}>
        <span style={{ color:C.navy, fontWeight:700, fontSize:"1rem", lineHeight:1.4 }}>{q}</span>
        <ChevronDown size={18} style={{ color:C.gold, flexShrink:0, transform: open ? "rotate(180deg)" : "none", transition:"transform 0.22s" }} />
      </button>
      {open && <p style={{ margin:"0 0 1.2rem", color:C.slate, lineHeight:1.75, fontSize:"0.95rem" }}>{a}</p>}
    </div>
  );
}

/* ─── Contact Form ───────────────────────────────────────────── */
function ContactForm({ onQuote }) {
  const [form, setForm] = useState({ name:"", phone:"", email:"", service:"", city:"", message:"" });
  const [status, setStatus] = useState("idle");
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const valid = form.name && form.phone && form.service && form.city;

  const submit = (e) => {
    e.preventDefault();
    if (!valid) return;
    setStatus("loading");
    const msg = ["Hi Keystoners, quote request from website.", `Name: ${form.name}`, `Phone: ${form.phone}`,
      form.email ? `Email: ${form.email}` : null, `Service: ${form.service}`, `City: ${form.city}`,
      form.message ? `Note: ${form.message}` : null].filter(Boolean).join("\n");
    setTimeout(() => { setStatus("success"); window.open(buildWA(msg), "_blank", "noopener,noreferrer"); }, 700);
  };

  if (status === "success") return (
    <div style={{ background:"#dcfce7", border:"1px solid #86efac", borderRadius:"1.25rem", padding:"2.5rem", textAlign:"center" }}>
      <Check size={32} style={{ color:"#16a34a", marginBottom:"0.75rem" }} />
      <h4 style={{ color:C.navy, margin:"0 0 0.4rem", fontWeight:700 }}>Opening WhatsApp…</h4>
      <p style={{ color:C.slate, margin:0, fontSize:"0.9rem" }}>Your details are pre-filled and ready to send.</p>
    </div>
  );

  return (
    <form onSubmit={submit} style={{ display:"flex", flexDirection:"column", gap:"0.75rem" }}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.75rem" }}>
        <input type="text"  placeholder="Full Name *"  value={form.name}  onChange={e => set("name",  e.target.value)} style={fieldSt} />
        <input type="tel"   placeholder="Phone *"      value={form.phone} onChange={e => set("phone", e.target.value)} style={fieldSt} />
      </div>
      <input type="email" placeholder="Email (optional)" value={form.email} onChange={e => set("email", e.target.value)} style={fieldSt} />
      <select value={form.service} onChange={e => set("service", e.target.value)} style={selSt(form.service)}>
        <option value="">Service needed *</option>
        {services.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
        <option value="Multiple Services">Multiple Services</option>
      </select>
      <select value={form.city} onChange={e => set("city", e.target.value)} style={selSt(form.city)}>
        <option value="">Your city *</option>
        {coverage.map(c => <option key={c} value={c}>{c}</option>)}
        <option value="Other">Other</option>
      </select>
      <textarea rows={3} placeholder="Additional details (property size, specific concerns…)" value={form.message} onChange={e => set("message", e.target.value)} style={{ ...fieldSt, resize:"vertical" }} />
      <button type="submit" disabled={!valid || status === "loading"} style={{
        background: valid ? C.navy : C.border, color: valid ? "#fff" : C.slateLight,
        border:"none", borderRadius:"0.85rem", padding:"1rem",
        fontWeight:700, fontSize:"1rem", cursor: valid ? "pointer" : "not-allowed",
        display:"flex", alignItems:"center", justifyContent:"center", gap:"0.5rem",
      }}>
        {status === "loading"
          ? <><Loader2 size={17} style={{ animation:"spin 1s linear infinite" }} /> Preparing…</>
          : <><Send size={15} /> Send via WhatsApp</>}
      </button>
      {!valid && <p style={{ margin:0, fontSize:"0.8rem", color:C.slateLight }}><AlertCircle size={11} style={{ display:"inline", marginRight:4 }} />Name, phone, service & city are required</p>}
    </form>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function HomePage() {
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [quoteOpen,      setQuoteOpen]      = useState(false);
  const [quotePrefill,   setQuotePrefill]   = useState("");
  const [selectedSvc,    setSelectedSvc]    = useState(null);
  const [svcOpen,        setSvcOpen]        = useState(false);
  const [areaSearch,     setAreaSearch]     = useState("");
  const [areaResult,     setAreaResult]     = useState(null);

  const openQuote   = (pre = "")  => { setQuotePrefill(pre); setQuoteOpen(true); };
  const openService = (s)          => { setSelectedSvc(s); setSvcOpen(true); };

  const scrollTo = (id) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior:"smooth", block:"start" });
  };

  const checkArea = () => {
    const q = areaSearch.toLowerCase().trim();
    if (!q) return;
    const match = coverage.find(c => c.toLowerCase().includes(q));
    setAreaResult(match ? { found:true, city:match } : { found:false });
  };

  const navLinks = [
    { label:"Services",    id:"services"  },
    { label:"Why Us",      id:"why-us"    },
    { label:"Service Area",id:"coverage"  },
    { label:"Reviews",     id:"reviews"   },
    { label:"FAQ",         id:"faq"       },
    { label:"Contact",     id:"contact"   },
  ];

  return (
    <div style={{ minHeight:"100vh", background:C.white, color:C.ink, fontFamily:"'DM Sans', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Bricolage+Grotesque:wght@600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: ${C.white}; }
        a { color: inherit; text-decoration: none; }
        input, textarea, select { font-family: inherit; }
        input::placeholder, textarea::placeholder { color: ${C.slateLight}; }
        input:focus, textarea:focus, select:focus {
          outline: none;
          border-color: ${C.navyMid} !important;
          box-shadow: 0 0 0 3px ${C.blue100} !important;
        }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${C.offWhite}; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 3px; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:none; } }

        .svc-card { transition: transform .25s ease, box-shadow .25s ease; cursor: pointer; }
        .svc-card:hover { transform: translateY(-5px); box-shadow: 0 20px 48px rgba(13,28,63,0.13) !important; }
        .svc-card:hover .svc-img { transform: scale(1.04); }
        .svc-img { transition: transform .4s ease; }

        .nav-a:hover { color: ${C.navy} !important; }
        .btn-ghost:hover { background: ${C.blue50} !important; }
        .city-pill:hover { background: ${C.blue50} !important; border-color: ${C.navyLight} !important; color: ${C.navy} !important; }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .hero-grid  { grid-template-columns: 1fr !important; }
          .hero-right { display: none !important; }
        }
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .menu-btn    { display: flex !important; }
          .why-grid    { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .cov-grid    { grid-template-columns: 1fr !important; }
          .contact-grid{ grid-template-columns: 1fr !important; }
          .float-badge { display: none !important; }
          .stats-grid  { grid-template-columns: repeat(2, 1fr) !important; }
          .hero-actions{ flex-direction: column !important; }
          .hero-actions > * { width: 100% !important; justify-content: center; }
        }
        @media (max-width: 600px) {
          .svc-grid { grid-template-columns: 1fr !important; }
          .trust-grid { grid-template-columns: 1fr !important; }
          .city-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
          .cta-row  { flex-direction: column !important; }
          .cta-row > * { width: 100% !important; text-align: center; justify-content: center; }
          .form-name-row { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ════════ HEADER ════════ */}
      <header style={{
        position:"sticky", top:0, zIndex:100,
        background:"rgba(255,255,255,0.95)", backdropFilter:"blur(16px)",
        borderBottom:`1px solid ${C.border}`,
      }}>
        <div style={{
          maxWidth:1280, margin:"0 auto", padding:"0 1.25rem",
          minHeight:68, display:"flex", alignItems:"center", justifyContent:"space-between", gap:"1rem",
        }}>
          {/* Logo */}
          <button onClick={() => scrollTo("hero")} style={{ display:"flex", alignItems:"center", gap:"0.75rem", background:"none", border:"none", cursor:"pointer", padding:0 }}>
            <div style={{ width:42, height:42, borderRadius:"0.75rem", background:C.navy, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Sparkles size={18} style={{ color:C.gold }} />
            </div>
            <div style={{ textAlign:"left" }}>
              <p style={{ margin:0, fontWeight:800, fontSize:"1.02rem", fontFamily:"'Bricolage Grotesque', sans-serif", color:C.navy }}>Keystoners</p>
              <p style={{ margin:0, fontSize:"0.72rem", color:C.slate }}>Exterior Cleaning</p>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="desktop-nav" style={{ display:"flex", gap:"1.75rem" }}>
            {navLinks.map(l => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="nav-a" style={{
                background:"none", border:"none", color:C.slate,
                fontSize:"0.9rem", fontWeight:500, cursor:"pointer", padding:0,
              }}>{l.label}</button>
            ))}
          </nav>

          {/* Actions */}
          <div style={{ display:"flex", gap:"0.6rem", alignItems:"center" }}>
            <a href={`tel:${PHONE_RAW}`} style={{
              display:"flex", alignItems:"center", gap:"0.45rem",
              background:C.offWhite, border:`1px solid ${C.border}`,
              borderRadius:"0.75rem", padding:"0.55rem 0.9rem",
              fontWeight:600, fontSize:"0.88rem", color:C.navy,
            }}>
              <Phone size={14} /><span style={{ display:"none" }} id="phone-full">{PHONE_DISPLAY}</span><span>Call</span>
            </a>
            <button onClick={() => openQuote()} style={{
              background:C.navy, color:"#fff", border:"none",
              borderRadius:"0.75rem", padding:"0.6rem 1.1rem",
              fontWeight:700, fontSize:"0.9rem", cursor:"pointer",
            }}>Free Quote</button>
            <button className="menu-btn" onClick={() => setMobileOpen(v => !v)} style={{
              display:"none", width:40, height:40, alignItems:"center", justifyContent:"center",
              background:C.offWhite, border:`1px solid ${C.border}`,
              borderRadius:"0.75rem", cursor:"pointer", color:C.navy,
            }}>
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div style={{ background:C.white, borderTop:`1px solid ${C.border}`, padding:"0.75rem 1.25rem 1.25rem" }}>
            {navLinks.map(l => (
              <button key={l.id} onClick={() => scrollTo(l.id)} style={{
                display:"block", width:"100%", textAlign:"left",
                background:"none", border:"none", color:C.navy,
                fontSize:"1rem", fontWeight:500, cursor:"pointer",
                padding:"0.85rem 0", borderBottom:`1px solid ${C.border}`,
              }}>{l.label}</button>
            ))}
            <button onClick={() => { setMobileOpen(false); openQuote(); }} style={{
              marginTop:"0.85rem", width:"100%", background:C.navy, color:"#fff",
              border:"none", borderRadius:"0.85rem", padding:"0.95rem",
              fontWeight:700, cursor:"pointer", fontSize:"1rem",
            }}>Get Free Quote</button>
          </div>
        )}
      </header>

      {/* ════════ HERO ════════ */}
      <section id="hero" style={{
        background:`linear-gradient(135deg, ${C.navy} 0%, ${C.navyMid} 55%, #1e4fa0 100%)`,
        position:"relative", overflow:"hidden",
      }}>
        {/* subtle pattern */}
        <div style={{
          position:"absolute", inset:0, zIndex:0,
          backgroundImage:"radial-gradient(circle at 70% 30%, rgba(230,168,23,0.12) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(255,255,255,0.06) 0%, transparent 40%)",
        }} />

        <div className="hero-grid" style={{
          maxWidth:1280, margin:"0 auto",
          padding:"5.5rem 1.25rem 6rem",
          display:"grid", gridTemplateColumns:"1.1fr 0.9fr",
          gap:"3rem", alignItems:"center",
          position:"relative", zIndex:1,
        }}>
          {/* Left */}
          <div style={{ animation:"fadeUp .65s ease both" }}>
            <div style={{
              display:"inline-flex", alignItems:"center", gap:"0.5rem",
              background:"rgba(230,168,23,0.15)", border:"1px solid rgba(230,168,23,0.3)",
              borderRadius:"999px", padding:"0.4rem 1rem",
              marginBottom:"1.4rem", color:"#fde68a", fontSize:"0.84rem", fontWeight:500,
            }}>
              <Star size={13} style={{ fill:"#fde68a", color:"#fde68a" }} />
              Trusted exterior cleaning — Lower Mainland
            </div>

            <h1 style={{
              fontFamily:"'Bricolage Grotesque', sans-serif",
              fontSize:"clamp(2.4rem, 5.5vw, 4.2rem)",
              fontWeight:800, lineHeight:1.08,
              letterSpacing:"-0.03em", color:"#fff",
              margin:"0 0 1.25rem", maxWidth:640,
            }}>
              Your home deserves<br />
              <span style={{ color:C.gold }}>to look its best.</span>
            </h1>

            <p style={{ color:"rgba(255,255,255,0.72)", fontSize:"1.08rem", lineHeight:1.75, maxWidth:560, marginBottom:"2rem" }}>
              Roof washing, gutter cleaning, house washing, pressure washing & window cleaning across Vancouver and the Lower Mainland. Fast quotes. Clean results.
            </p>

            <div className="hero-actions" style={{ display:"flex", gap:"0.85rem", flexWrap:"wrap", marginBottom:"2.5rem" }}>
              <button onClick={() => openQuote()} style={{
                background:C.gold, color:"#fff", border:"none",
                borderRadius:"0.85rem", padding:"1rem 1.75rem",
                fontWeight:700, fontSize:"1rem", cursor:"pointer",
                display:"flex", alignItems:"center", gap:"0.5rem",
                boxShadow:`0 8px 28px rgba(230,168,23,0.35)`,
              }}>
                Get My Free Quote <ArrowRight size={16} />
              </button>
              <a href={`tel:${PHONE_RAW}`} style={{
                display:"flex", alignItems:"center", gap:"0.5rem",
                background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.22)",
                borderRadius:"0.85rem", padding:"1rem 1.5rem",
                color:"#fff", fontWeight:600, fontSize:"1rem",
              }}>
                <Phone size={15} /> {PHONE_DISPLAY}
              </a>
              <a href={buildWA(WA_DEFAULT_MSG)} target="_blank" rel="noopener noreferrer" style={{
                display:"flex", alignItems:"center", gap:"0.5rem",
                background:"#25D366", border:"none",
                borderRadius:"0.85rem", padding:"1rem 1.4rem",
                color:"#fff", fontWeight:600, fontSize:"1rem",
              }}>
                <MessageCircle size={16} /> WhatsApp
              </a>
            </div>

            {/* Trust chips */}
            <div style={{ display:"flex", gap:"1.25rem", flexWrap:"wrap" }}>
              {["500+ Homes Cleaned","5★ Rated","Same-Day Response","Fully Insured"].map(t => (
                <div key={t} style={{ display:"flex", alignItems:"center", gap:"0.4rem", color:"rgba(255,255,255,0.65)", fontSize:"0.85rem" }}>
                  <CheckCircle2 size={14} style={{ color:C.gold }} /> {t}
                </div>
              ))}
            </div>
          </div>

          {/* Right — hero card */}
          <div className="hero-right" style={{ position:"relative", animation:"fadeUp .65s .15s ease both" }}>
            <div style={{
              borderRadius:"2rem", overflow:"hidden",
              border:"1px solid rgba(255,255,255,0.15)",
              boxShadow:"0 48px 100px rgba(0,0,0,0.35)",
            }}>
              <div style={{ position:"relative", aspectRatio:"4/5" }}>
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
                  alt="Clean home exterior" style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(13,28,63,0.7) 0%, transparent 55%)" }} />

                {/* Overlay card */}
                <div style={{
                  position:"absolute", bottom:"1rem", left:"1rem", right:"1rem",
                  background:"rgba(255,255,255,0.95)", backdropFilter:"blur(16px)",
                  borderRadius:"1.2rem", padding:"1.2rem",
                }}>
                  <p style={{ margin:"0 0 0.3rem", fontSize:"0.78rem", color:C.slate, fontWeight:500 }}>Most popular combo</p>
                  <p style={{ margin:"0 0 0.85rem", fontSize:"1.05rem", fontWeight:800, color:C.navy }}>Roof Wash + Gutter Clean</p>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"0.5rem", marginBottom:"0.85rem" }}>
                    {["Protects roof & drainage","Prevents costly buildup"].map(t => (
                      <div key={t} style={{ background:C.offWhite, borderRadius:"0.6rem", padding:"0.6rem 0.7rem", fontSize:"0.78rem", color:C.navy }}>{t}</div>
                    ))}
                  </div>
                  <button onClick={() => openQuote("Roof Soft Wash + Gutter Cleaning")} style={{
                    width:"100%", background:C.navy, color:"#fff", border:"none",
                    borderRadius:"0.7rem", padding:"0.65rem",
                    fontWeight:700, cursor:"pointer", fontSize:"0.875rem",
                  }}>Get a Quote for This Combo</button>
                </div>
              </div>
            </div>

            {/* Float badge */}
            <div className="float-badge" style={{
              position:"absolute", top:"2.5rem", left:"-5rem",
              background:"#fff", border:`1px solid ${C.border}`,
              borderRadius:"1rem", padding:"0.85rem 1.1rem",
              display:"flex", alignItems:"center", gap:"0.7rem",
              boxShadow:"0 12px 36px rgba(13,28,63,0.12)",
            }}>
              <div style={{ background:C.blue50, borderRadius:"0.65rem", padding:"0.5rem" }}>
                <Clock3 size={18} style={{ color:C.navyMid }} />
              </div>
              <div>
                <p style={{ margin:0, fontSize:"0.74rem", color:C.slate }}>Average response time</p>
                <p style={{ margin:0, fontWeight:700, fontSize:"0.92rem", color:C.navy }}>Same day · under 24 hrs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.12)", background:"rgba(0,0,0,0.2)", backdropFilter:"blur(8px)" }}>
          <div className="stats-grid" style={{
            maxWidth:1280, margin:"0 auto",
            padding:"1.1rem 1.25rem",
            display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1rem",
          }}>
            {[
              { value:"24hr",  label:"Quote response" },
              { value:"5★",   label:"Top-rated service" },
              { value:"500+",  label:"Homes cleaned" },
              { value:"100%",  label:"Satisfaction focus" },
            ].map(s => (
              <div key={s.label} style={{ textAlign:"center" }}>
                <p style={{ margin:0, fontFamily:"'Bricolage Grotesque', sans-serif", fontSize:"1.6rem", fontWeight:800, color:C.gold }}>{s.value}</p>
                <p style={{ margin:0, fontSize:"0.8rem", color:"rgba(255,255,255,0.62)" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ SERVICES ════════ */}
      <section id="services" style={{ background:C.offWhite, padding:"5.5rem 1.25rem" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <Reveal>
            <div style={{ textAlign:"center", marginBottom:"3rem" }}>
              <p style={{ margin:"0 0 0.5rem", fontSize:"0.78rem", textTransform:"uppercase", letterSpacing:"0.18em", color:C.gold, fontWeight:700 }}>Our Services</p>
              <h2 style={{ fontFamily:"'Bricolage Grotesque', sans-serif", margin:"0 0 0.85rem", fontSize:"clamp(1.9rem, 3.5vw, 2.8rem)", fontWeight:800, letterSpacing:"-0.025em", color:C.navy }}>
                Everything your exterior needs
              </h2>
              <p style={{ margin:0, color:C.slate, maxWidth:520, marginLeft:"auto", marginRight:"auto", lineHeight:1.7 }}>
                Click any service to see what's included, starting pricing, and how to get booked.
              </p>
            </div>
          </Reveal>

          <div className="svc-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1.25rem" }}>
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <Reveal key={svc.title} delay={i * 65}>
                  <div className="svc-card" onClick={() => openService(svc)} style={{
                    background:C.white, borderRadius:"1.25rem",
                    overflow:"hidden", boxShadow:"0 4px 20px rgba(13,28,63,0.07)",
                    border:`1px solid ${C.border}`, height:"100%",
                    display:"flex", flexDirection:"column",
                  }}>
                    {/* Image */}
                    <div style={{ height:180, overflow:"hidden", position:"relative" }}>
                      <img src={svc.image} alt={svc.title} className="svc-img"
                        style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                      <div style={{
                        position:"absolute", inset:0,
                        background:"linear-gradient(to top, rgba(13,28,63,0.45) 0%, transparent 60%)",
                      }} />
                      <span style={{
                        position:"absolute", bottom:"0.75rem", left:"0.75rem",
                        background:C.gold, color:"#fff",
                        borderRadius:"999px", padding:"0.25rem 0.75rem",
                        fontSize:"0.78rem", fontWeight:700,
                      }}>{svc.price}</span>
                    </div>

                    {/* Body */}
                    <div style={{ padding:"1.3rem", flex:1, display:"flex", flexDirection:"column" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:"0.6rem", marginBottom:"0.75rem" }}>
                        <div style={{ width:34, height:34, borderRadius:"0.6rem", background:C.blue50, display:"flex", alignItems:"center", justifyContent:"center" }}>
                          <Icon size={17} style={{ color:C.navyMid }} />
                        </div>
                        <h3 style={{ margin:0, fontFamily:"'Bricolage Grotesque', sans-serif", fontSize:"1.05rem", fontWeight:700, color:C.navy }}>{svc.title}</h3>
                      </div>
                      <p style={{ margin:"0 0 1rem", color:C.slate, fontSize:"0.9rem", lineHeight:1.65, flex:1 }}>{svc.short}</p>
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                        <span style={{ display:"flex", alignItems:"center", gap:"0.35rem", color:C.navyLight, fontWeight:600, fontSize:"0.88rem" }}>
                          View details <ChevronRight size={14} />
                        </span>
                        <span style={{ fontSize:"0.78rem", color:C.slateLight }}>
                          <Clock3 size={11} style={{ display:"inline", marginRight:3 }} />{svc.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════ WHY US ════════ */}
      <section id="why-us" style={{ background:C.white, padding:"5.5rem 1.25rem" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div className="why-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4rem", alignItems:"center" }}>
            <Reveal>
              <p style={{ margin:"0 0 0.6rem", fontSize:"0.78rem", textTransform:"uppercase", letterSpacing:"0.18em", color:C.gold, fontWeight:700 }}>Why Keystoners</p>
              <h2 style={{ fontFamily:"'Bricolage Grotesque', sans-serif", margin:"0 0 1rem", fontSize:"clamp(1.9rem, 3.5vw, 2.7rem)", fontWeight:800, letterSpacing:"-0.025em", color:C.navy, lineHeight:1.15 }}>
                Professional service.<br />No surprises. Clean results.
              </h2>
              <p style={{ margin:"0 0 2rem", color:C.slate, lineHeight:1.75, maxWidth:460 }}>
                We keep it simple — honest pricing guidance, fast responses, safe methods, and photo proof of every job. No contracts, no pressure, no hidden fees.
              </p>
              <div className="cta-row" style={{ display:"flex", gap:"0.75rem", flexWrap:"wrap" }}>
                <button onClick={() => openQuote()} style={{
                  background:C.navy, color:"#fff", border:"none",
                  borderRadius:"0.85rem", padding:"0.9rem 1.6rem",
                  fontWeight:700, cursor:"pointer", fontSize:"0.95rem",
                  display:"flex", alignItems:"center", gap:"0.45rem",
                }}>
                  Get Free Quote <ArrowRight size={15} />
                </button>
                <a href={`tel:${PHONE_RAW}`} style={{
                  display:"flex", alignItems:"center", gap:"0.45rem",
                  background:C.offWhite, border:`1px solid ${C.border}`,
                  borderRadius:"0.85rem", padding:"0.9rem 1.3rem",
                  color:C.navy, fontWeight:600, fontSize:"0.95rem",
                }}>
                  <Phone size={15} /> Call Us
                </a>
              </div>
            </Reveal>

            <div className="trust-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
              {trustPoints.map((tp, i) => {
                const Icon = tp.icon;
                return (
                  <Reveal key={tp.title} delay={i * 55}>
                    <div style={{
                      background:C.offWhite, border:`1px solid ${C.border}`,
                      borderRadius:"1.1rem", padding:"1.3rem",
                    }}>
                      <div style={{ width:40, height:40, borderRadius:"0.65rem", background:C.blue50, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:"0.85rem" }}>
                        <Icon size={18} style={{ color:C.navyMid }} />
                      </div>
                      <p style={{ margin:"0 0 0.35rem", fontWeight:700, fontSize:"0.92rem", color:C.navy }}>{tp.title}</p>
                      <p style={{ margin:0, color:C.slate, fontSize:"0.84rem", lineHeight:1.6 }}>{tp.body}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ════════ SERVICE AREA ════════ */}
      <section id="coverage" style={{ background:C.offWhite, padding:"5.5rem 1.25rem" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <Reveal>
            <div style={{ textAlign:"center", marginBottom:"2.5rem" }}>
              <p style={{ margin:"0 0 0.5rem", fontSize:"0.78rem", textTransform:"uppercase", letterSpacing:"0.18em", color:C.gold, fontWeight:700 }}>Service Area</p>
              <h2 style={{ fontFamily:"'Bricolage Grotesque', sans-serif", margin:0, fontSize:"clamp(1.9rem, 3.5vw, 2.7rem)", fontWeight:800, letterSpacing:"-0.025em", color:C.navy }}>
                Serving Vancouver & the Lower Mainland
              </h2>
            </div>
          </Reveal>

          <div className="cov-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.5rem" }}>
            {/* Area checker */}
            <Reveal>
              <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:"1.25rem", padding:"2rem" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"0.75rem", marginBottom:"1.5rem" }}>
                  <div style={{ width:42, height:42, borderRadius:"0.75rem", background:C.blue50, display:"flex", alignItems:"center", justifyContent:"center" }}>
                    <MapPin size={20} style={{ color:C.navyMid }} />
                  </div>
                  <h3 style={{ margin:0, fontFamily:"'Bricolage Grotesque', sans-serif", fontWeight:700, fontSize:"1.2rem", color:C.navy }}>Check your area</h3>
                </div>

                <div className="city-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"0.5rem", marginBottom:"1.25rem" }}>
                  {coverage.map(city => (
                    <div key={city} className="city-pill" onClick={() => { setAreaSearch(city); setAreaResult({ found:true, city }); }} style={{
                      background:C.offWhite, border:`1px solid ${C.border}`,
                      borderRadius:"0.6rem", padding:"0.6rem 0.5rem",
                      fontSize:"0.82rem", color:C.slate, textAlign:"center", cursor:"pointer",
                      transition:"all .15s",
                    }}>{city}</div>
                  ))}
                </div>

                <div style={{ display:"flex", gap:"0.65rem" }}>
                  <input value={areaSearch} onChange={e => { setAreaSearch(e.target.value); setAreaResult(null); }}
                    onKeyDown={e => e.key === "Enter" && checkArea()}
                    placeholder="Type your city…" style={{ ...fieldSt, flex:1 }} />
                  <button onClick={checkArea} style={{
                    background:C.navy, color:"#fff", border:"none",
                    borderRadius:"0.75rem", padding:"0 1.1rem",
                    fontWeight:700, cursor:"pointer", whiteSpace:"nowrap",
                  }}>Check</button>
                </div>

                {areaResult && (
                  <div style={{
                    marginTop:"0.85rem", padding:"0.85rem 1rem", borderRadius:"0.8rem",
                    background: areaResult.found ? "#f0fdf4" : "#fef2f2",
                    border: `1px solid ${areaResult.found ? "#86efac" : "#fca5a5"}`,
                    color: areaResult.found ? "#16a34a" : "#dc2626",
                    display:"flex", alignItems:"center", gap:"0.5rem", fontSize:"0.9rem",
                  }}>
                    {areaResult.found ? <Check size={15} /> : <AlertCircle size={15} />}
                    {areaResult.found ? `Great — we service ${areaResult.city}!` : "May still be covered — message us on WhatsApp to confirm."}
                  </div>
                )}
              </div>
            </Reveal>

            {/* Reviews preview */}
            <Reveal delay={80}>
              <div id="reviews" style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:"1.25rem", padding:"2rem" }}>
                <p style={{ margin:"0 0 0.4rem", fontSize:"0.78rem", textTransform:"uppercase", letterSpacing:"0.18em", color:C.gold, fontWeight:700 }}>Top Reviews</p>
                <h3 style={{ fontFamily:"'Bricolage Grotesque', sans-serif", margin:"0 0 1.4rem", fontWeight:700, fontSize:"1.2rem", color:C.navy }}>Why homeowners choose us</h3>
                <div style={{ display:"flex", flexDirection:"column", gap:"0.9rem" }}>
                  {reviews.slice(0,3).map((r,i) => (
                    <div key={i} style={{ background:C.offWhite, borderRadius:"0.9rem", padding:"1rem" }}>
                      <div style={{ display:"flex", gap:"2px", marginBottom:"0.45rem" }}>
                        {Array.from({ length:r.stars }).map((_,idx) => <Star key={idx} size={12} style={{ color:C.gold, fill:C.gold }} />)}
                      </div>
                      <p style={{ margin:"0 0 0.55rem", color:C.slate, fontSize:"0.88rem", lineHeight:1.6 }}>"{r.text}"</p>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                        <p style={{ margin:0, fontWeight:700, fontSize:"0.83rem", color:C.navy }}>{r.name} <span style={{ fontWeight:400, color:C.slateLight }}>— {r.location}</span></p>
                        <span style={{ background:C.blue50, color:C.navyMid, borderRadius:"999px", padding:"0.2rem 0.6rem", fontSize:"0.73rem", fontWeight:600 }}>{r.service}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════ ALL REVIEWS ════════ */}
      <section style={{ background:C.white, padding:"5.5rem 1.25rem", borderTop:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <Reveal>
            <div style={{ textAlign:"center", marginBottom:"3rem" }}>
              <p style={{ margin:"0 0 0.5rem", fontSize:"0.78rem", textTransform:"uppercase", letterSpacing:"0.18em", color:C.gold, fontWeight:700 }}>Customer Reviews</p>
              <h2 style={{ fontFamily:"'Bricolage Grotesque', sans-serif", margin:"0 0 0.75rem", fontSize:"clamp(1.9rem, 3.5vw, 2.7rem)", fontWeight:800, letterSpacing:"-0.025em", color:C.navy }}>
                What our customers are saying
              </h2>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"0.3rem" }}>
                {Array.from({ length:5 }).map((_,i) => <Star key={i} size={17} style={{ color:C.gold, fill:C.gold }} />)}
                <span style={{ color:C.slate, marginLeft:"0.4rem", fontSize:"0.9rem" }}>5.0 average · 100+ reviews</span>
              </div>
            </div>
          </Reveal>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))", gap:"1.1rem" }}>
            {reviews.map((r,i) => (
              <Reveal key={i} delay={i * 60}>
                <div style={{
                  background:C.offWhite, border:`1px solid ${C.border}`,
                  borderRadius:"1.1rem", padding:"1.4rem", height:"100%",
                }}>
                  <div style={{ display:"flex", gap:"2px", marginBottom:"0.75rem" }}>
                    {Array.from({ length:r.stars }).map((_,idx) => <Star key={idx} size={14} style={{ color:C.gold, fill:C.gold }} />)}
                  </div>
                  <p style={{ margin:"0 0 1rem", color:C.slate, lineHeight:1.7, fontSize:"0.93rem" }}>"{r.text}"</p>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"0.5rem" }}>
                    <p style={{ margin:0, fontWeight:700, fontSize:"0.86rem", color:C.navy }}>{r.name} <span style={{ fontWeight:400, color:C.slateLight }}>— {r.location}</span></p>
                    <span style={{ background:C.blue50, color:C.navyMid, borderRadius:"999px", padding:"0.2rem 0.6rem", fontSize:"0.74rem", fontWeight:600 }}>{r.service}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ FAQ ════════ */}
      <section id="faq" style={{ background:C.offWhite, padding:"5.5rem 1.25rem", borderTop:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:780, margin:"0 auto" }}>
          <Reveal>
            <div style={{ textAlign:"center", marginBottom:"2.5rem" }}>
              <p style={{ margin:"0 0 0.5rem", fontSize:"0.78rem", textTransform:"uppercase", letterSpacing:"0.18em", color:C.gold, fontWeight:700 }}>FAQ</p>
              <h2 style={{ fontFamily:"'Bricolage Grotesque', sans-serif", margin:0, fontSize:"clamp(1.9rem, 3.5vw, 2.7rem)", fontWeight:800, letterSpacing:"-0.025em", color:C.navy }}>
                Common questions
              </h2>
            </div>
          </Reveal>

          <div style={{ background:C.white, borderRadius:"1.25rem", border:`1px solid ${C.border}`, padding:"0.5rem 1.5rem" }}>
            {faqs.map((f,i) => (
              <Reveal key={i} delay={i * 50}>
                <FAQItem q={f.q} a={f.a} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div style={{ textAlign:"center", marginTop:"2rem" }}>
              <p style={{ color:C.slate, marginBottom:"1rem" }}>Still have questions?</p>
              <div style={{ display:"flex", gap:"0.75rem", justifyContent:"center", flexWrap:"wrap" }}>
                <button onClick={() => openQuote()} style={{
                  background:C.navy, color:"#fff", border:"none",
                  borderRadius:"0.85rem", padding:"0.85rem 1.75rem",
                  fontWeight:700, cursor:"pointer",
                }}>Get a Free Quote</button>
                <a href={buildWA(WA_DEFAULT_MSG)} target="_blank" rel="noopener noreferrer" style={{
                  display:"flex", alignItems:"center", gap:"0.45rem",
                  background:"#25D366", color:"#fff",
                  borderRadius:"0.85rem", padding:"0.85rem 1.4rem",
                  fontWeight:700,
                }}>
                  <MessageCircle size={15} /> WhatsApp Us
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════ CTA BANNER ════════ */}
      <section style={{ background:C.navy, padding:"4.5rem 1.25rem" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <Reveal>
            <div style={{
              display:"flex", justifyContent:"space-between",
              alignItems:"center", gap:"2rem", flexWrap:"wrap",
            }}>
              <div>
                <h2 style={{ fontFamily:"'Bricolage Grotesque', sans-serif", margin:"0 0 0.6rem", fontSize:"clamp(1.7rem, 3vw, 2.4rem)", fontWeight:800, color:"#fff", letterSpacing:"-0.025em" }}>
                  Ready to clean up your property?
                </h2>
                <p style={{ margin:0, color:"rgba(255,255,255,0.65)", fontSize:"1.02rem" }}>Free quote within 24 hours. No obligation, no pressure.</p>
              </div>
              <div className="cta-row" style={{ display:"flex", gap:"0.75rem", flexWrap:"wrap" }}>
                <button onClick={() => openQuote()} style={{
                  background:C.gold, color:"#fff", border:"none",
                  borderRadius:"0.85rem", padding:"1rem 1.75rem",
                  fontWeight:700, fontSize:"1rem", cursor:"pointer",
                  display:"flex", alignItems:"center", gap:"0.45rem",
                  boxShadow:`0 8px 28px rgba(230,168,23,0.35)`,
                }}>
                  Get Free Quote <ArrowRight size={16} />
                </button>
                <a href={`tel:${PHONE_RAW}`} style={{
                  display:"flex", alignItems:"center", gap:"0.5rem",
                  background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.2)",
                  borderRadius:"0.85rem", padding:"1rem 1.4rem",
                  color:"#fff", fontWeight:600, fontSize:"0.95rem",
                }}>
                  <Phone size={15} /> {PHONE_DISPLAY}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ════════ CONTACT ════════ */}
      <section id="contact" style={{ background:C.white, padding:"5.5rem 1.25rem", borderTop:`1px solid ${C.border}` }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <div className="contact-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4rem", alignItems:"start" }}>
            <Reveal>
              <p style={{ margin:"0 0 0.6rem", fontSize:"0.78rem", textTransform:"uppercase", letterSpacing:"0.18em", color:C.gold, fontWeight:700 }}>Contact Us</p>
              <h2 style={{ fontFamily:"'Bricolage Grotesque', sans-serif", margin:"0 0 1rem", fontSize:"clamp(1.9rem, 3vw, 2.7rem)", fontWeight:800, letterSpacing:"-0.025em", color:C.navy, lineHeight:1.15 }}>
                Request your<br />free quote
              </h2>
              <p style={{ margin:"0 0 2rem", color:C.slate, lineHeight:1.75, maxWidth:400 }}>
                Fill the form — it opens WhatsApp with your quote details ready to send. We respond the same day.
              </p>
              <div style={{ display:"flex", flexDirection:"column", gap:"1.25rem" }}>
                {[
                  { icon:Phone,  label:"Phone",        value:PHONE_DISPLAY, href:`tel:${PHONE_RAW}` },
                  { icon:Clock3, label:"Response Time", value:"Same day to 24 hours" },
                  { icon:MapPin, label:"Coverage Area", value:"Vancouver & Lower Mainland" },
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} style={{ display:"flex", alignItems:"center", gap:"0.85rem" }}>
                      <div style={{ width:44, height:44, borderRadius:"0.75rem", background:C.blue50, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <Icon size={18} style={{ color:C.navyMid }} />
                      </div>
                      <div>
                        <p style={{ margin:0, fontSize:"0.75rem", color:C.slateLight, textTransform:"uppercase", letterSpacing:"0.07em" }}>{item.label}</p>
                        {item.href
                          ? <a href={item.href} style={{ color:C.navy, fontWeight:700, fontSize:"0.95rem" }}>{item.value}</a>
                          : <p style={{ margin:0, fontWeight:700, fontSize:"0.95rem", color:C.navy }}>{item.value}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>

            <Reveal delay={80}>
              <ContactForm onQuote={openQuote} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════ FOOTER ════════ */}
      <footer style={{ background:C.navy, color:"rgba(255,255,255,0.65)" }}>
        <div className="footer-grid" style={{
          maxWidth:1280, margin:"0 auto",
          padding:"3.5rem 1.25rem 2rem",
          display:"grid", gridTemplateColumns:"1.6fr 1fr 1fr 1fr", gap:"2.5rem",
        }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:"0.7rem", marginBottom:"1.1rem" }}>
              <div style={{ width:38, height:38, borderRadius:"0.65rem", background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.15)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Sparkles size={16} style={{ color:C.gold }} />
              </div>
              <span style={{ color:"#fff", fontFamily:"'Bricolage Grotesque', sans-serif", fontWeight:800, fontSize:"1.02rem" }}>Keystoners</span>
            </div>
            <p style={{ margin:"0 0 1.1rem", lineHeight:1.7, maxWidth:260, fontSize:"0.88rem" }}>
              Professional exterior cleaning across Vancouver and the Lower Mainland.
            </p>
            <a href={`tel:${PHONE_RAW}`} style={{ color:C.gold, fontWeight:700, fontSize:"0.92rem" }}>{PHONE_DISPLAY}</a>
          </div>

          <div>
            <p style={{ margin:"0 0 0.9rem", color:"rgba(255,255,255,0.85)", fontWeight:700, fontSize:"0.88rem" }}>Services</p>
            {services.map(s => (
              <button key={s.title} onClick={() => openService(s)} style={{
                display:"block", background:"none", border:"none",
                padding:"0.3rem 0", color:"rgba(255,255,255,0.55)",
                cursor:"pointer", fontSize:"0.86rem", textAlign:"left",
              }}>{s.title}</button>
            ))}
          </div>

          <div>
            <p style={{ margin:"0 0 0.9rem", color:"rgba(255,255,255,0.85)", fontWeight:700, fontSize:"0.88rem" }}>Pages</p>
            {[["Why Us","why-us"],["Reviews","reviews"],["FAQ","faq"],["Contact","contact"]].map(([l,id]) => (
              <button key={id} onClick={() => scrollTo(id)} style={{
                display:"block", background:"none", border:"none",
                padding:"0.3rem 0", color:"rgba(255,255,255,0.55)",
                cursor:"pointer", fontSize:"0.86rem", textAlign:"left",
              }}>{l}</button>
            ))}
          </div>

          <div>
            <p style={{ margin:"0 0 0.9rem", color:"rgba(255,255,255,0.85)", fontWeight:700, fontSize:"0.88rem" }}>Areas</p>
            {coverage.slice(0,6).map(c => (
              <p key={c} style={{ margin:"0.3rem 0", fontSize:"0.86rem" }}>{c}</p>
            ))}
          </div>
        </div>

        <div style={{
          borderTop:"1px solid rgba(255,255,255,0.1)",
          maxWidth:1280, margin:"0 auto",
          padding:"1.25rem 1.25rem",
          display:"flex", justifyContent:"space-between", alignItems:"center",
          flexWrap:"wrap", gap:"0.75rem",
        }}>
          <p style={{ margin:0, fontSize:"0.8rem" }}>© 2025 Keystoners Exterior Cleaning. All rights reserved.</p>
          <button onClick={() => openQuote()} style={{
            background:C.gold, color:"#fff", border:"none",
            borderRadius:"0.65rem", padding:"0.55rem 1.1rem",
            fontWeight:700, cursor:"pointer", fontSize:"0.85rem",
          }}>Get Free Quote</button>
        </div>
      </footer>

      {/* ════════ WHATSAPP FLOAT ════════ */}
      <a href={buildWA(WA_DEFAULT_MSG)} target="_blank" rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        style={{
          position:"fixed", right:18, bottom:18, zIndex:999,
          display:"flex", alignItems:"center", gap:"0.55rem",
          background:"#25D366", color:"#fff",
          borderRadius:"999px", padding:"0.85rem 1.1rem",
          fontWeight:700, boxShadow:"0 8px 28px rgba(37,211,102,0.4)",
          border:"1px solid rgba(255,255,255,0.2)", fontSize:"0.9rem",
        }}>
        <MessageCircle size={20} />
        <span>WhatsApp Us</span>
      </a>

      {/* ════════ MODALS ════════ */}
      <QuoteModal   open={quoteOpen} onClose={() => setQuoteOpen(false)} prefill={quotePrefill} />
      <ServiceModal service={selectedSvc} open={svcOpen} onClose={() => setSvcOpen(false)} onQuote={openQuote} />
    </div>
  );
}