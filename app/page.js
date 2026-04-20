'use client'
import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight, Phone, ShieldCheck, Sparkles, Clock3, MapPin, Star,
  Droplets, Home, Wind, Waves, ChevronRight, CheckCircle2, Menu, X,
  ChevronDown, Send, Check, AlertCircle, Loader2
} from "lucide-react";

const services = [
  {
    title: "Roof Soft Wash",
    desc: "Safe, low-pressure washing to remove moss, algae, lichen, and black streaks from your roof — without voiding warranties or damaging shingles.",
    icon: ShieldCheck,
    detail: "We use biodegradable cleaning solutions that kill organic growth at the root, preventing regrowth for 2–3 years. Works on asphalt shingles, cedar shakes, metal, and tile.",
    price: "From $349",
    duration: "2–4 hrs",
  },
  {
    title: "Gutter Cleaning",
    desc: "Remove leaves, needles, and debris before overflow causes fascia rot, siding stains, or foundation issues.",
    icon: Droplets,
    detail: "Includes full scoop-out, bag disposal, and a flush to confirm downspout flow. We also inspect for sagging, loose hangers, or damage while we're up there.",
    price: "From $149",
    duration: "1–2 hrs",
  },
  {
    title: "House Washing",
    desc: "Wash away dirt, algae, mildew, and buildup from siding, trim, soffits, and entry areas.",
    icon: Home,
    detail: "Soft-wash approach that's safe for vinyl, Hardie board, stucco, cedar, and painted surfaces. Dramatically improves curb appeal and protects your cladding.",
    price: "From $299",
    duration: "2–3 hrs",
  },
  {
    title: "Pressure Washing",
    desc: "Restore driveways, patios, walkways, stairs, and concrete surfaces with high-impact cleaning.",
    icon: Waves,
    detail: "Up to 4000 PSI hot-water pressure washing for concrete, brick, and pavers. Removes oil stains, tire marks, moss, and years of embedded grime.",
    price: "From $199",
    duration: "1–3 hrs",
  },
  {
    title: "Window Cleaning",
    desc: "Streak-free exterior window cleaning that brightens the whole property.",
    icon: Sparkles,
    detail: "Pure-water fed-pole system for spotless results on up to 3-storey homes. Includes frames, sills, and screen rinse. No chemicals, no streaks.",
    price: "From $179",
    duration: "1–2 hrs",
  },
  {
    title: "Maintenance Plans",
    desc: "Seasonal maintenance packages for homeowners, strata, and commercial properties.",
    icon: Wind,
    detail: "Bi-annual or quarterly service bundles — roof wash + gutters + house wash at a bundled rate. Priority scheduling, locked-in pricing, and no annual contracts.",
    price: "From $499/yr",
    duration: "Ongoing",
  },
];

const stats = [
  { value: "24hr", label: "Quote response" },
  { value: "5★", label: "Top-rated service" },
  { value: "500+", label: "Homes cleaned" },
  { value: "100%", label: "Satisfaction focus" },
];

const coverage = [
  "Vancouver", "Burnaby", "Richmond", "Surrey",
  "Langley", "Coquitlam", "New Westminster", "North Vancouver",
  "West Vancouver", "Delta", "Maple Ridge", "Port Coquitlam",
];

const reviews = [
  {
    name: "Sarah M.", location: "Vancouver", stars: 5,
    text: "Absolutely amazing service. Gutters were completely cleared and the house looks fresh again. Showed up exactly on time and left the property spotless. Highly recommend.",
    service: "Gutter Cleaning"
  },
  {
    name: "David K.", location: "Burnaby", stars: 5,
    text: "Quick response, on time, and the house wash made a massive difference. Looks like a new home. Worth every penny — I'll be booking again in spring.",
    service: "House Washing"
  },
  {
    name: "Priya T.", location: "North Vancouver", stars: 5,
    text: "Honest advice, no upselling, and very clean work. The roof soft wash removed years of moss buildup. Super professional team, I'll be signing up for the annual plan.",
    service: "Roof Soft Wash"
  },
  {
    name: "James O.", location: "Surrey", stars: 5,
    text: "My driveway hadn't looked this good since we moved in. The pressure washing was thorough and they were careful around the garden beds. Great value.",
    service: "Pressure Washing"
  },
  {
    name: "Linda H.", location: "Richmond", stars: 5,
    text: "Window cleaning was impeccable — not a single streak. They did our second floor too which I always found difficult. Will definitely book again.",
    service: "Window Cleaning"
  },
];

const faqs = [
  {
    q: "Do I need to be home during the service?",
    a: "No — most exterior services don't require you to be home. We just need gate access and to know of any pets. We'll send a before/after photo report when complete."
  },
  {
    q: "How long does a roof soft wash last?",
    a: "Results typically last 2–3 years depending on tree coverage and weather exposure. Our soft wash solution kills moss and algae at the root rather than just washing it off the surface."
  },
  {
    q: "Is soft washing safe for my roof warranty?",
    a: "Yes. Soft washing is the manufacturer-recommended cleaning method for most roofing materials. High-pressure washing can void warranties — soft wash cannot."
  },
  {
    q: "Do you service strata buildings?",
    a: "Absolutely. We offer strata maintenance plans with bulk pricing, priority scheduling, and invoicing to the strata council."
  },
  {
    q: "What areas do you cover?",
    a: "We cover the full Lower Mainland including Vancouver, Burnaby, Richmond, Surrey, Langley, Coquitlam, North/West Vancouver, Delta, and more. Not sure? Just ask."
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function AnimSection({ children, className = "", delay = 0 }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`
    }}>
      {children}
    </div>
  );
}

function Modal({ open, onClose, children }) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  if (!open) return null;
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }} onClick={onClose}>
      <div style={{ background: "#111", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "1.5rem", maxWidth: 560, width: "100%", maxHeight: "90vh", overflowY: "auto", position: "relative" }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white" }}>
          <X size={16} />
        </button>
        {children}
      </div>
    </div>
  );
}

function QuoteModal({ open, onClose, prefill = "" }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: prefill, city: "", message: "" });
  const [status, setStatus] = useState("idle");
  useEffect(() => { if (open) setForm(f => ({ ...f, service: prefill })); }, [open, prefill]);

  const handle = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const valid = form.name && form.phone && form.service && form.city;

  const submit = () => {
    if (!valid) return;
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1800);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ padding: "2rem" }}>
        {status === "success" ? (
          <div style={{ textAlign: "center", padding: "1rem 0" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(52,211,153,0.15)", border: "1px solid rgba(52,211,153,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
              <Check size={28} style={{ color: "#34d399" }} />
            </div>
            <h3 style={{ color: "white", fontSize: "1.4rem", fontWeight: 600, margin: "0 0 0.5rem" }}>Quote request sent!</h3>
            <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "1.5rem" }}>We'll get back to you within 24 hours — usually much faster. Check your phone for our reply.</p>
            <button onClick={onClose} style={{ background: "#facc15", color: "#000", border: "none", borderRadius: "0.75rem", padding: "0.75rem 2rem", fontWeight: 600, cursor: "pointer", fontSize: "1rem" }}>Done</button>
          </div>
        ) : (
          <>
            <h3 style={{ color: "white", fontSize: "1.4rem", fontWeight: 600, margin: "0 0 0.25rem" }}>Get your free quote</h3>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem", marginBottom: "1.5rem" }}>We respond within 24 hours — usually same day.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { key: "name", placeholder: "Full Name *", type: "text" },
                { key: "phone", placeholder: "Phone Number *", type: "tel" },
                { key: "email", placeholder: "Email Address", type: "email" },
              ].map(({ key, placeholder, type }) => (
                <input key={key} type={type} placeholder={placeholder} value={form[key]} onChange={e => handle(key, e.target.value)}
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "0.75rem", padding: "0.75rem 1rem", color: "white", fontSize: "0.95rem", outline: "none", width: "100%", boxSizing: "border-box" }} />
              ))}
              <select value={form.service} onChange={e => handle("service", e.target.value)}
                style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "0.75rem", padding: "0.75rem 1rem", color: form.service ? "white" : "rgba(255,255,255,0.4)", fontSize: "0.95rem", outline: "none", width: "100%" }}>
                <option value="">Service Needed *</option>
                {services.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                <option value="Multiple Services">Multiple Services</option>
              </select>
              <select value={form.city} onChange={e => handle("city", e.target.value)}
                style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "0.75rem", padding: "0.75rem 1rem", color: form.city ? "white" : "rgba(255,255,255,0.4)", fontSize: "0.95rem", outline: "none", width: "100%" }}>
                <option value="">Select Your City *</option>
                {coverage.map(c => <option key={c} value={c}>{c}</option>)}
                <option value="Other">Other (please specify below)</option>
              </select>
              <textarea placeholder="Anything else we should know? (optional)" value={form.message} onChange={e => handle("message", e.target.value)} rows={3}
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "0.75rem", padding: "0.75rem 1rem", color: "white", fontSize: "0.95rem", outline: "none", width: "100%", resize: "vertical", boxSizing: "border-box" }} />
              <button onClick={submit} disabled={!valid || status === "loading"}
                style={{ background: valid ? "#facc15" : "rgba(255,255,255,0.1)", color: valid ? "#000" : "rgba(255,255,255,0.3)", border: "none", borderRadius: "0.75rem", padding: "0.85rem", fontWeight: 600, cursor: valid ? "pointer" : "not-allowed", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", transition: "all 0.2s" }}>
                {status === "loading" ? <><Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /> Sending...</> : <><Send size={16} /> Get My Free Quote</>}
              </button>
              {!valid && <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", textAlign: "center", margin: 0 }}>
                <AlertCircle size={12} style={{ display: "inline", marginRight: 4 }} />Fields marked * are required
              </p>}
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}

function ServiceModal({ service, open, onClose, onQuote }) {
  if (!service) return null;
  const Icon = service.icon;
  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ padding: "2rem" }}>
        <div style={{ width: 56, height: 56, borderRadius: "0.875rem", background: "rgba(250,204,21,0.1)", border: "1px solid rgba(250,204,21,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
          <Icon size={24} style={{ color: "#fbbf24" }} />
        </div>
        <h3 style={{ color: "white", fontSize: "1.5rem", fontWeight: 600, margin: "0 0 0.5rem" }}>{service.title}</h3>
        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.25rem", flexWrap: "wrap" }}>
          <span style={{ background: "rgba(250,204,21,0.1)", color: "#fbbf24", borderRadius: "2rem", padding: "0.3rem 0.875rem", fontSize: "0.85rem", fontWeight: 500 }}>{service.price}</span>
          <span style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.7)", borderRadius: "2rem", padding: "0.3rem 0.875rem", fontSize: "0.85rem" }}>
            <Clock3 size={12} style={{ display: "inline", marginRight: 4 }} />{service.duration}
          </span>
        </div>
        <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: "1rem" }}>{service.desc}</p>
        <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem", lineHeight: 1.7, marginBottom: "1.75rem" }}>{service.detail}</p>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <button onClick={() => { onClose(); onQuote(service.title); }} style={{ background: "#facc15", color: "#000", border: "none", borderRadius: "0.75rem", padding: "0.75rem 1.5rem", fontWeight: 600, cursor: "pointer", fontSize: "0.95rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <ArrowRight size={16} /> Get a Quote
          </button>
          <a href="tel:+12503171366" style={{ background: "rgba(255,255,255,0.08)", color: "white", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "0.75rem", padding: "0.75rem 1.5rem", fontWeight: 500, cursor: "pointer", fontSize: "0.95rem", display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
            <Phone size={16} /> Call Now
          </a>
        </div>
      </div>
    </Modal>
  );
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: "1rem", overflow: "hidden", transition: "border-color 0.2s", borderColor: open ? "rgba(250,204,21,0.25)" : "rgba(255,255,255,0.1)" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", background: open ? "rgba(250,204,21,0.04)" : "rgba(255,255,255,0.03)", border: "none", padding: "1.25rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", gap: "1rem", textAlign: "left" }}>
        <span style={{ color: "white", fontWeight: 500, fontSize: "1rem", lineHeight: 1.4 }}>{q}</span>
        <ChevronDown size={18} style={{ color: "#fbbf24", flexShrink: 0, transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.25s" }} />
      </button>
      {open && <div style={{ padding: "0 1.5rem 1.25rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.7, fontSize: "0.95rem" }}>{a}</div>}
    </div>
  );
}

export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quotePrefill, setQuotePrefill] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [areaSearch, setAreaSearch] = useState("");
  const [areaResult, setAreaResult] = useState(null);

  const openQuote = (prefill = "") => { setQuotePrefill(prefill); setQuoteOpen(true); };
  const openService = (s) => { setSelectedService(s); setServiceOpen(true); };

  const scrollTo = (id) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSearch = () => {
    if (!searchVal.trim()) return;
    const lower = searchVal.toLowerCase();
    const found = services.find(s => s.title.toLowerCase().includes(lower) || s.desc.toLowerCase().includes(lower));
    if (found) openService(found);
    else openQuote(searchVal);
  };

  const checkArea = () => {
    const lower = areaSearch.toLowerCase();
    const match = coverage.find(c => c.toLowerCase().includes(lower));
    if (match) setAreaResult({ found: true, city: match });
    else if (areaSearch.trim()) setAreaResult({ found: false });
  };

  const navLinks = [
    { label: "Services", id: "services" },
    { label: "Why Us", id: "why-us" },
    { label: "Service Area", id: "coverage" },
    { label: "Reviews", id: "reviews" },
    { label: "FAQ", id: "faq" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", color: "white", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:none; } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #111; } ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
        a { color: inherit; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.35); }
        input:focus, textarea:focus, select:focus { border-color: rgba(250,204,21,0.4) !important; box-shadow: 0 0 0 3px rgba(250,204,21,0.08) !important; }
        .card-hover { transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease; }
        .card-hover:hover { transform: translateY(-4px); border-color: rgba(250,204,21,0.3) !important; background: rgba(255,255,255,0.07) !important; }
        .quick-btn:hover { border-color: rgba(250,204,21,0.35) !important; color: white !important; }
        .nav-link:hover { color: white !important; }
        .city-badge:hover { background: rgba(250,204,21,0.1) !important; border-color: rgba(250,204,21,0.25) !important; color: #fbbf24 !important; cursor: pointer; }
      `}</style>

      {/* NAV */}
      <header style={{ position: "sticky", top: 0, zIndex: 100, borderBottom: "1px solid rgba(255,255,255,0.08)", background: "rgba(10,10,10,0.85)", backdropFilter: "blur(20px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          <button onClick={() => scrollTo("hero")} style={{ display: "flex", alignItems: "center", gap: "0.75rem", background: "none", border: "none", cursor: "pointer" }}>
            <div style={{ width: 44, height: 44, borderRadius: "0.75rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(250,204,21,0.25)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 24px rgba(251,191,36,0.1)" }}>
              <Sparkles size={18} style={{ color: "#fbbf24" }} />
            </div>
            <div style={{ textAlign: "left" }}>
              <p style={{ margin: 0, fontWeight: 600, fontSize: "1rem", letterSpacing: "-0.01em" }}>Keystoners</p>
              <p style={{ margin: 0, fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}>Exterior Cleaning</p>
            </div>
          </button>
          <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }} className="desktop-nav">
            {navLinks.map(l => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="nav-link" style={{ background: "none", border: "none", color: "rgba(255,255,255,0.7)", cursor: "pointer", fontSize: "0.9rem", fontWeight: 450, padding: 0, transition: "color 0.15s" }}>{l.label}</button>
            ))}
          </nav>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
            <a href="tel:+12503171366" style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "0.75rem", padding: "0.5rem 1rem", color: "white", textDecoration: "none", fontSize: "0.875rem", fontWeight: 500, transition: "all 0.15s" }}>
              <Phone size={15} /> <span style={{ display: "none" }} className="phone-text">+1 250-317-1366</span><span>Call</span>
            </a>
            <button onClick={() => openQuote()} style={{ background: "#facc15", color: "#000", border: "none", borderRadius: "0.75rem", padding: "0.55rem 1.25rem", fontWeight: 600, cursor: "pointer", fontSize: "0.9rem" }}>Free Quote</button>
            <button onClick={() => setMobileOpen(!mobileOpen)} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "0.625rem", padding: "0.5rem", cursor: "pointer", color: "white", display: "none" }} className="menu-btn">
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <div style={{ background: "#111", borderTop: "1px solid rgba(255,255,255,0.08)", padding: "1rem 1.5rem" }}>
            {navLinks.map(l => (
              <button key={l.id} onClick={() => scrollTo(l.id)} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", color: "rgba(255,255,255,0.8)", cursor: "pointer", padding: "0.75rem 0", fontSize: "1rem", fontWeight: 500, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>{l.label}</button>
            ))}
            <button onClick={() => { setMobileOpen(false); openQuote(); }} style={{ marginTop: "0.75rem", width: "100%", background: "#facc15", color: "#000", border: "none", borderRadius: "0.75rem", padding: "0.875rem", fontWeight: 600, cursor: "pointer", fontSize: "1rem" }}>Get Free Quote</button>
          </div>
        )}
        <style>{`@media(max-width:768px){.desktop-nav{display:none !important;}.menu-btn{display:flex !important;}.phone-text{display:none !important;}}`}</style>
      </header>

      {/* HERO */}
      <section id="hero" style={{ position: "relative", overflow: "hidden", minHeight: "90vh", display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0, background: "radial-gradient(ellipse 60% 50% at 10% 20%, rgba(212,175,55,0.12) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 85% 15%, rgba(59,130,246,0.1) 0%, transparent 55%), linear-gradient(180deg, #0a0a0a 0%, #111 50%, #0a0a0a 100%)" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "5rem 1.5rem 4rem", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "3rem", alignItems: "center", width: "100%", position: "relative", zIndex: 1 }}>
          <div style={{ animation: "fadeUp 0.7s ease both" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(250,204,21,0.08)", border: "1px solid rgba(250,204,21,0.2)", borderRadius: "2rem", padding: "0.4rem 1rem", marginBottom: "1.5rem", fontSize: "0.85rem", color: "#fde68a" }}>
              <Star size={13} style={{ fill: "#fbbf24", color: "#fbbf24" }} /> Trusted exterior cleaning across the Lower Mainland
            </div>
            <h1 style={{ fontSize: "clamp(2.4rem, 5vw, 3.75rem)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em", margin: "0 0 1.25rem", maxWidth: 600 }}>
              Protect your home.<br />
              <span style={{ background: "linear-gradient(90deg, #fde68a, #fbbf24, #f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Make it spotless again.</span>
            </h1>
            <p style={{ fontSize: "1.1rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.7, marginBottom: "2rem", maxWidth: 520 }}>
              Keystoners provides professional roof washing, gutter cleaning, house washing, pressure washing, and window cleaning across Vancouver and the Lower Mainland. Fast quotes. Reliable crews. Results you'll notice.
            </p>
            <div style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap", marginBottom: "2.5rem" }}>
              <button onClick={() => openQuote()} style={{ background: "#facc15", color: "#000", border: "none", borderRadius: "0.875rem", padding: "0.875rem 2rem", fontWeight: 700, cursor: "pointer", fontSize: "1rem", display: "flex", alignItems: "center", gap: "0.5rem", boxShadow: "0 8px 32px rgba(250,204,21,0.25)", transition: "all 0.2s" }}>
                Get My Free Quote <ArrowRight size={16} />
              </button>
              <button onClick={() => scrollTo("services")} style={{ background: "rgba(255,255,255,0.06)", color: "white", border: "1px solid rgba(255,255,255,0.14)", borderRadius: "0.875rem", padding: "0.875rem 2rem", fontWeight: 500, cursor: "pointer", fontSize: "1rem", transition: "all 0.2s" }}>
                View Services
              </button>
            </div>
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "1.25rem", padding: "1rem", backdropFilter: "blur(12px)" }}>
              <div style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem", flexWrap: "wrap" }}>
                <input value={searchVal} onChange={e => setSearchVal(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSearch()} placeholder="What service do you need? (roof moss, gutters, driveway...)"
                  style={{ flex: "1 1 200px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "0.75rem", padding: "0.75rem 1rem", color: "white", fontSize: "0.9rem", outline: "none" }} />
                <button onClick={handleSearch} style={{ background: "white", color: "#000", border: "none", borderRadius: "0.75rem", padding: "0.75rem 1.5rem", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", fontSize: "0.9rem" }}>Search</button>
              </div>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {["Free Quote", "Gutter Cleaning", "Roof Wash", "See Services"].map(item => (
                  <button key={item} className="quick-btn" onClick={() => item === "See Services" ? scrollTo("services") : item === "Free Quote" ? openQuote() : openQuote(item)}
                    style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "2rem", padding: "0.4rem 0.875rem", fontSize: "0.8rem", color: "rgba(255,255,255,0.7)", cursor: "pointer", transition: "all 0.15s" }}>
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div style={{ animation: "fadeUp 0.7s 0.15s ease both", position: "relative" }}>
            <div style={{ borderRadius: "2rem", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", padding: "0.75rem", boxShadow: "0 40px 100px rgba(0,0,0,0.5)" }}>
              <div style={{ position: "relative", borderRadius: "1.5rem", overflow: "hidden", aspectRatio: "4/5" }}>
                <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80" alt="Clean home exterior" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)" }} />
                <div style={{ position: "absolute", bottom: "1rem", left: "1rem", right: "1rem", background: "rgba(10,10,10,0.8)", backdropFilter: "blur(16px)", borderRadius: "1.25rem", border: "1px solid rgba(255,255,255,0.1)", padding: "1.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "0.875rem" }}>
                    <div>
                      <p style={{ margin: 0, fontSize: "0.8rem", color: "rgba(255,255,255,0.55)", marginBottom: "0.25rem" }}>Most popular combo</p>
                      <p style={{ margin: 0, fontWeight: 600, fontSize: "1rem" }}>Roof Wash + Gutter Clean</p>
                    </div>
                    <span style={{ background: "#facc15", color: "#000", borderRadius: "0.5rem", padding: "0.25rem 0.75rem", fontSize: "0.8rem", fontWeight: 600, whiteSpace: "nowrap" }}>Popular</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                    {["Protects roof & drainage", "Prevents costly buildup"].map(t => (
                      <div key={t} style={{ background: "rgba(255,255,255,0.06)", borderRadius: "0.75rem", padding: "0.625rem 0.75rem", fontSize: "0.8rem", color: "rgba(255,255,255,0.7)" }}>{t}</div>
                    ))}
                  </div>
                  <button onClick={() => openQuote("Roof Soft Wash + Gutter Cleaning")} style={{ marginTop: "0.875rem", width: "100%", background: "#facc15", color: "#000", border: "none", borderRadius: "0.75rem", padding: "0.625rem", fontWeight: 600, cursor: "pointer", fontSize: "0.875rem" }}>
                    Get a Quote for This Combo
                  </button>
                </div>
              </div>
            </div>
            <div style={{ position: "absolute", top: "2rem", left: "-4rem", background: "rgba(20,20,20,0.9)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "1rem", padding: "0.875rem 1.125rem", display: "flex", alignItems: "center", gap: "0.75rem", boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}>
              <div style={{ background: "rgba(52,211,153,0.15)", borderRadius: "0.625rem", padding: "0.5rem" }}>
                <Clock3 size={18} style={{ color: "#34d399" }} />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: "0.75rem", color: "rgba(255,255,255,0.55)" }}>Average response time</p>
                <p style={{ margin: 0, fontWeight: 600, fontSize: "0.9rem" }}>Same day · 24 hrs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, borderTop: "1px solid rgba(255,255,255,0.07)", background: "rgba(0,0,0,0.4)", backdropFilter: "blur(10px)" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", padding: "1rem 1.5rem", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
            {stats.map(s => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <p style={{ margin: 0, fontSize: "1.5rem", fontWeight: 700, color: "#fbbf24" }}>{s.value}</p>
                <p style={{ margin: 0, fontSize: "0.8rem", color: "rgba(255,255,255,0.55)" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:900px){.hero-grid{grid-template-columns:1fr !important;} .hero-img{display:none;} .float-badge{display:none;}}`}</style>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ maxWidth: 1280, margin: "0 auto", padding: "5rem 1.5rem" }}>
        <AnimSection>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <p style={{ margin: "0 0 0.5rem", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "#fbbf24" }}>Core Services</p>
              <h2 style={{ margin: 0, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>Exterior cleaning homeowners actually need</h2>
            </div>
            <p style={{ maxWidth: 380, color: "rgba(255,255,255,0.55)", fontSize: "0.95rem", lineHeight: 1.6, margin: 0 }}>Click any service to see what's included, pricing, and how to book.</p>
          </div>
        </AnimSection>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem" }}>
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <AnimSection key={service.title} delay={i * 60}>
                <div className="card-hover" onClick={() => openService(service)} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "1.5rem", padding: "1.75rem", cursor: "pointer", height: "100%" }}>
                  <div style={{ width: 52, height: 52, borderRadius: "0.875rem", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                    <Icon size={22} style={{ color: "#fbbf24" }} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                    <h3 style={{ margin: 0, fontWeight: 600, fontSize: "1.15rem" }}>{service.title}</h3>
                    <span style={{ fontSize: "0.8rem", color: "#fbbf24", fontWeight: 500, background: "rgba(250,204,21,0.08)", padding: "0.2rem 0.625rem", borderRadius: "2rem", whiteSpace: "nowrap", marginLeft: "0.5rem" }}>{service.price}</span>
                  </div>
                  <p style={{ margin: "0 0 1.5rem", fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.65 }}>{service.desc}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.875rem", fontWeight: 500, color: "#fbbf24" }}>
                    Learn more <ChevronRight size={15} />
                  </div>
                </div>
              </AnimSection>
            );
          })}
        </div>
      </section>

      {/* WHY US */}
      <section id="why-us" style={{ borderTop: "1px solid rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "5rem 1.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <AnimSection>
            <p style={{ margin: "0 0 0.75rem", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "#fbbf24" }}>Why Keystoners</p>
            <h2 style={{ margin: "0 0 1rem", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.2 }}>Professional service. Clear process. Better curb appeal.</h2>
            <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: "2rem", maxWidth: 420 }}>
              We're a premium but approachable exterior cleaning brand — no pushy sales, no hidden fees. We show up on time, do the job right, and send you proof.
            </p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button onClick={() => openQuote()} style={{ background: "#facc15", color: "#000", border: "none", borderRadius: "0.875rem", padding: "0.75rem 1.75rem", fontWeight: 600, cursor: "pointer", fontSize: "0.95rem" }}>Get a Free Quote</button>
              <a href="tel:+12503171366" style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "0.875rem", padding: "0.75rem 1.25rem", color: "white", textDecoration: "none", fontWeight: 500, fontSize: "0.9rem" }}>
                <Phone size={15} /> Call Us
              </a>
            </div>
          </AnimSection>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
            {[
              { icon: CheckCircle2, text: "Free quote — no obligation" },
              { icon: Clock3, text: "Same-day response time" },
              { icon: ShieldCheck, text: "Insurance & liability covered" },
              { icon: Star, text: "5-star rated by 100+ homeowners" },
              { icon: MapPin, text: "Local Lower Mainland team" },
              { icon: CheckCircle2, text: "Before & after photo reports" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <AnimSection key={item.text} delay={i * 50}>
                  <div style={{ display: "flex", gap: "0.75rem", background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "1rem", padding: "1.125rem" }}>
                    <Icon size={18} style={{ color: "#fbbf24", marginTop: 1, flexShrink: 0 }} />
                    <p style={{ margin: 0, color: "rgba(255,255,255,0.8)", fontSize: "0.9rem", lineHeight: 1.45 }}>{item.text}</p>
                  </div>
                </AnimSection>
              );
            })}
          </div>
        </div>
        <style>{`@media(max-width:768px){#why-us > div{grid-template-columns:1fr !important;}}`}</style>
      </section>

      {/* COVERAGE */}
      <section id="coverage" style={{ maxWidth: 1280, margin: "0 auto", padding: "5rem 1.5rem" }}>
        <AnimSection>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "1.5rem", padding: "2rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: "1.75rem" }}>
                <div style={{ background: "rgba(250,204,21,0.1)", borderRadius: "0.75rem", padding: "0.625rem" }}>
                  <MapPin size={20} style={{ color: "#fbbf24" }} />
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>Service Area</p>
                  <h3 style={{ margin: 0, fontWeight: 600, fontSize: "1.2rem" }}>Vancouver & Lower Mainland</h3>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem", marginBottom: "1.5rem" }}>
                {coverage.map(city => (
                  <div key={city} className="city-badge" onClick={() => { setAreaSearch(city); setAreaResult({ found: true, city }); }} style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "0.625rem", padding: "0.6rem 0.75rem", fontSize: "0.82rem", color: "rgba(255,255,255,0.75)", textAlign: "center", transition: "all 0.15s" }}>
                    {city}
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: "0.625rem" }}>
                <input value={areaSearch} onChange={e => { setAreaSearch(e.target.value); setAreaResult(null); }} onKeyDown={e => e.key === "Enter" && checkArea()} placeholder="Check your city..." style={{ flex: 1, background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "0.75rem", padding: "0.625rem 0.875rem", color: "white", fontSize: "0.875rem", outline: "none" }} />
                <button onClick={checkArea} style={{ background: "white", color: "#000", border: "none", borderRadius: "0.75rem", padding: "0.625rem 1rem", fontWeight: 600, cursor: "pointer", fontSize: "0.875rem", whiteSpace: "nowrap" }}>Check Area</button>
              </div>
              {areaResult && (
                <div style={{ marginTop: "0.75rem", padding: "0.75rem 1rem", borderRadius: "0.75rem", background: areaResult.found ? "rgba(52,211,153,0.08)" : "rgba(239,68,68,0.08)", border: `1px solid ${areaResult.found ? "rgba(52,211,153,0.2)" : "rgba(239,68,68,0.2)"}`, color: areaResult.found ? "#34d399" : "#f87171", fontSize: "0.875rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  {areaResult.found ? <Check size={15} /> : <AlertCircle size={15} />}
                  {areaResult.found ? `Great news — we service ${areaResult.city}!` : "We might still cover your area — call us to confirm."}
                </div>
              )}
            </div>
            <div id="reviews" style={{ background: "rgba(250,204,21,0.04)", border: "1px solid rgba(250,204,21,0.12)", borderRadius: "1.5rem", padding: "2rem", display: "flex", flexDirection: "column" }}>
              <p style={{ margin: "0 0 0.5rem", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "#fbbf24" }}>Customer Reviews</p>
              <h3 style={{ margin: "0 0 1.5rem", fontWeight: 600, fontSize: "1.2rem" }}>Why homeowners choose Keystoners</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem", flex: 1 }}>
                {reviews.slice(0, 3).map((r, i) => (
                  <div key={i} style={{ background: "rgba(0,0,0,0.25)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "1rem", padding: "1rem 1.125rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                      <div>
                        <div style={{ display: "flex", gap: "2px", marginBottom: "0.25rem" }}>
                          {Array.from({ length: r.stars }).map((_, idx) => <Star key={idx} size={12} style={{ color: "#fbbf24", fill: "#fbbf24" }} />)}
                        </div>
                        <p style={{ margin: 0, fontWeight: 600, fontSize: "0.875rem" }}>{r.name} · <span style={{ fontWeight: 400, color: "rgba(255,255,255,0.55)" }}>{r.location}</span></p>
                      </div>
                      <span style={{ background: "rgba(250,204,21,0.08)", color: "#fbbf24", borderRadius: "2rem", padding: "0.2rem 0.625rem", fontSize: "0.75rem", whiteSpace: "nowrap" }}>{r.service}</span>
                    </div>
                    <p style={{ margin: 0, fontSize: "0.875rem", color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>"{r.text}"</p>
                  </div>
                ))}
              </div>
              <button onClick={() => scrollTo("all-reviews")} style={{ marginTop: "1rem", background: "none", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "0.75rem", padding: "0.625rem", color: "rgba(255,255,255,0.7)", cursor: "pointer", fontSize: "0.875rem", transition: "all 0.15s" }}>
                See all {reviews.length} reviews ↓
              </button>
            </div>
          </div>
        </AnimSection>
        <style>{`@media(max-width:768px){#coverage > div > div:first-child{grid-template-columns:1fr !important;}}`}</style>
      </section>

      {/* ALL REVIEWS */}
      <section id="all-reviews" style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.07)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "5rem 1.5rem" }}>
          <AnimSection>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <p style={{ margin: "0 0 0.5rem", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "#fbbf24" }}>All Reviews</p>
              <h2 style={{ margin: "0 0 0.75rem", fontSize: "clamp(1.75rem, 3vw, 2.25rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>What our customers are saying</h2>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={18} style={{ color: "#fbbf24", fill: "#fbbf24" }} />)}
                <span style={{ color: "rgba(255,255,255,0.6)", marginLeft: "0.25rem" }}>5.0 average from 100+ reviews</span>
              </div>
            </div>
          </AnimSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1rem" }}>
            {reviews.map((r, i) => (
              <AnimSection key={i} delay={i * 60}>
                <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: "1.25rem", padding: "1.5rem", height: "100%" }}>
                  <div style={{ display: "flex", gap: "2px", marginBottom: "0.75rem" }}>
                    {Array.from({ length: r.stars }).map((_, idx) => <Star key={idx} size={14} style={{ color: "#fbbf24", fill: "#fbbf24" }} />)}
                  </div>
                  <p style={{ margin: "0 0 1rem", fontSize: "0.95rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.65 }}>"{r.text}"</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: "0.875rem" }}>{r.name} <span style={{ fontWeight: 400, color: "rgba(255,255,255,0.45)" }}>— {r.location}</span></p>
                    <span style={{ fontSize: "0.75rem", color: "#fbbf24", background: "rgba(250,204,21,0.08)", padding: "0.2rem 0.625rem", borderRadius: "2rem" }}>{r.service}</span>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ maxWidth: 800, margin: "0 auto", padding: "5rem 1.5rem" }}>
        <AnimSection>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{ margin: "0 0 0.5rem", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "#fbbf24" }}>FAQ</p>
            <h2 style={{ margin: 0, fontSize: "clamp(1.75rem, 3vw, 2.25rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>Common questions</h2>
          </div>
        </AnimSection>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {faqs.map((f, i) => (
            <AnimSection key={i} delay={i * 50}>
              <FAQItem q={f.q} a={f.a} />
            </AnimSection>
          ))}
        </div>
        <AnimSection delay={300}>
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <p style={{ color: "rgba(255,255,255,0.55)", marginBottom: "1rem" }}>Still have questions?</p>
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button onClick={() => openQuote()} style={{ background: "#facc15", color: "#000", border: "none", borderRadius: "0.875rem", padding: "0.75rem 1.75rem", fontWeight: 600, cursor: "pointer", fontSize: "0.95rem" }}>Get a Free Quote</button>
              <a href="tel:+12503171366" style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "0.875rem", padding: "0.75rem 1.25rem", color: "white", textDecoration: "none", fontWeight: 500 }}>
                <Phone size={15} /> Call +1 250-317-1366
              </a>
            </div>
          </div>
        </AnimSection>
      </section>

      {/* CTA BANNER */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.5rem 5rem" }}>
        <AnimSection>
          <div style={{ background: "linear-gradient(135deg, rgba(250,204,21,0.1) 0%, rgba(251,191,36,0.04) 60%, rgba(255,255,255,0.03) 100%)", border: "1px solid rgba(250,204,21,0.2)", borderRadius: "2rem", padding: "3rem", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
            <div>
              <h2 style={{ margin: "0 0 0.625rem", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>Ready to clean up your property?</h2>
              <p style={{ margin: 0, color: "rgba(255,255,255,0.6)" }}>Get a free quote in under 24 hours. No obligation, no pressure.</p>
            </div>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <button onClick={() => openQuote()} style={{ background: "#facc15", color: "#000", border: "none", borderRadius: "0.875rem", padding: "0.875rem 2rem", fontWeight: 700, cursor: "pointer", fontSize: "1rem", display: "flex", alignItems: "center", gap: "0.5rem", boxShadow: "0 8px 28px rgba(250,204,21,0.2)" }}>
                Get Free Quote <ArrowRight size={16} />
              </button>
              <a href="tel:+12503171366" style={{ display: "flex", alignItems: "center", gap: "0.5rem", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: "0.875rem", padding: "0.875rem 1.5rem", color: "white", textDecoration: "none", fontWeight: 500, fontSize: "0.95rem" }}>
                <Phone size={16} /> +1 250-317-1366
              </a>
            </div>
          </div>
        </AnimSection>
      </section>

      {/* CONTACT FORM */}
      <section id="contact" style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "5rem 1.5rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
            <AnimSection>
              <p style={{ margin: "0 0 0.75rem", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "#fbbf24" }}>Contact Us</p>
              <h2 style={{ margin: "0 0 1rem", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.2 }}>Request your free quote</h2>
              <p style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: "2rem", maxWidth: 400 }}>Tell us what you need and where you're located. We'll respond the same day with a fair, no-pressure quote.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                {[
                  { icon: Phone, label: "Phone", value: "+1 250-317-1366", href: "tel:+12503171366" },
                  { icon: Clock3, label: "Response Time", value: "Same day to 24 hours" },
                  { icon: MapPin, label: "Area", value: "Vancouver & Lower Mainland" },
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} style={{ display: "flex", gap: "0.875rem", alignItems: "center" }}>
                      <div style={{ width: 44, height: 44, background: "rgba(250,204,21,0.08)", border: "1px solid rgba(250,204,21,0.15)", borderRadius: "0.75rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon size={18} style={{ color: "#fbbf24" }} />
                      </div>
                      <div>
                        <p style={{ margin: 0, fontSize: "0.78rem", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{item.label}</p>
                        {item.href ? <a href={item.href} style={{ color: "white", fontWeight: 600, textDecoration: "none", fontSize: "0.95rem" }}>{item.value}</a>
                          : <p style={{ margin: 0, fontWeight: 600, fontSize: "0.95rem" }}>{item.value}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </AnimSection>
            <AnimSection delay={100}>
              <ContactForm services={services} coverage={coverage} />
            </AnimSection>
          </div>
        </div>
        <style>{`@media(max-width:768px){#contact > div > div{grid-template-columns:1fr !important;}}`}</style>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.07)", background: "#080808" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "3rem 1.5rem 2rem", display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: "2rem", flexWrap: "wrap" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <div style={{ width: 38, height: 38, borderRadius: "0.625rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(250,204,21,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Sparkles size={16} style={{ color: "#fbbf24" }} />
              </div>
              <span style={{ fontWeight: 600 }}>Keystoners</span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem", lineHeight: 1.65, maxWidth: 260, margin: "0 0 1rem" }}>Professional exterior cleaning across Vancouver and the Lower Mainland.</p>
            <a href="tel:+12503171366" style={{ color: "#fbbf24", fontWeight: 600, textDecoration: "none", fontSize: "0.9rem" }}>+1 250-317-1366</a>
          </div>
          <div>
            <p style={{ margin: "0 0 0.875rem", fontWeight: 600, fontSize: "0.875rem", color: "rgba(255,255,255,0.8)" }}>Services</p>
            {services.map(s => <button key={s.title} onClick={() => openService(s)} style={{ display: "block", background: "none", border: "none", padding: "0.3rem 0", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: "0.875rem", textAlign: "left", transition: "color 0.15s" }} className="nav-link">{s.title}</button>)}
          </div>
          <div>
            <p style={{ margin: "0 0 0.875rem", fontWeight: 600, fontSize: "0.875rem", color: "rgba(255,255,255,0.8)" }}>Company</p>
            {[["Why Us", "why-us"], ["Reviews", "all-reviews"], ["FAQ", "faq"], ["Contact", "contact"]].map(([l, id]) => (
              <button key={id} onClick={() => scrollTo(id)} style={{ display: "block", background: "none", border: "none", padding: "0.3rem 0", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: "0.875rem", textAlign: "left" }} className="nav-link">{l}</button>
            ))}
          </div>
          <div>
            <p style={{ margin: "0 0 0.875rem", fontWeight: 600, fontSize: "0.875rem", color: "rgba(255,255,255,0.8)" }}>Areas</p>
            {coverage.slice(0, 6).map(c => <p key={c} style={{ margin: "0.3rem 0", color: "rgba(255,255,255,0.5)", fontSize: "0.875rem" }}>{c}</p>)}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", maxWidth: 1280, margin: "0 auto", padding: "1.25rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
          <p style={{ margin: 0, color: "rgba(255,255,255,0.35)", fontSize: "0.8rem" }}>© 2025 Keystoners Exterior Cleaning. All rights reserved.</p>
          <button onClick={() => openQuote()} style={{ background: "#facc15", color: "#000", border: "none", borderRadius: "0.625rem", padding: "0.5rem 1.25rem", fontWeight: 600, cursor: "pointer", fontSize: "0.85rem" }}>Get Free Quote</button>
        </div>
        <style>{`@media(max-width:768px){footer > div:first-child{grid-template-columns:1fr 1fr !important;}}`}</style>
      </footer>

      {/* Modals */}
      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} prefill={quotePrefill} />
      <ServiceModal service={selectedService} open={serviceOpen} onClose={() => setServiceOpen(false)} onQuote={openQuote} />
    </div>
  );
}

function ContactForm({ services, coverage }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", city: "", message: "" });
  const [status, setStatus] = useState("idle");
  const handle = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const valid = form.name && form.phone && form.service && form.city;

  const submit = () => {
    if (!valid) return;
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1800);
  };

  if (status === "success") return (
    <div style={{ background: "rgba(52,211,153,0.06)", border: "1px solid rgba(52,211,153,0.2)", borderRadius: "1.5rem", padding: "3rem 2rem", textAlign: "center" }}>
      <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(52,211,153,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
        <Check size={28} style={{ color: "#34d399" }} />
      </div>
      <h3 style={{ color: "white", fontSize: "1.4rem", fontWeight: 600, margin: "0 0 0.5rem" }}>Quote request sent!</h3>
      <p style={{ color: "rgba(255,255,255,0.6)", margin: 0 }}>We'll respond within 24 hours — usually same day. Keep an eye on your phone!</p>
    </div>
  );

  return (
    <div style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "1.5rem", padding: "2rem" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "0.75rem" }}>
        <input placeholder="Full Name *" value={form.name} onChange={e => handle("name", e.target.value)} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "0.75rem", padding: "0.75rem 1rem", color: "white", fontSize: "0.9rem", outline: "none" }} />
        <input placeholder="Phone Number *" type="tel" value={form.phone} onChange={e => handle("phone", e.target.value)} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "0.75rem", padding: "0.75rem 1rem", color: "white", fontSize: "0.9rem", outline: "none" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <input placeholder="Email Address" type="email" value={form.email} onChange={e => handle("email", e.target.value)} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "0.75rem", padding: "0.75rem 1rem", color: "white", fontSize: "0.9rem", outline: "none" }} />
        <select value={form.service} onChange={e => handle("service", e.target.value)} style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "0.75rem", padding: "0.75rem 1rem", color: form.service ? "white" : "rgba(255,255,255,0.4)", fontSize: "0.9rem", outline: "none" }}>
          <option value="">Service Needed *</option>
          {services.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
          <option value="Multiple Services">Multiple Services</option>
        </select>
        <select value={form.city} onChange={e => handle("city", e.target.value)} style={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "0.75rem", padding: "0.75rem 1rem", color: form.city ? "white" : "rgba(255,255,255,0.4)", fontSize: "0.9rem", outline: "none" }}>
          <option value="">Your City *</option>
          {coverage.map(c => <option key={c} value={c}>{c}</option>)}
          <option value="Other">Other</option>
        </select>
        <textarea placeholder="Any additional details? (property size, specific issues, etc.)" value={form.message} onChange={e => handle("message", e.target.value)} rows={4} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "0.75rem", padding: "0.75rem 1rem", color: "white", fontSize: "0.9rem", outline: "none", resize: "vertical" }} />
        <button onClick={submit} disabled={!valid || status === "loading"} style={{ background: valid ? "#facc15" : "rgba(255,255,255,0.1)", color: valid ? "#000" : "rgba(255,255,255,0.3)", border: "none", borderRadius: "0.75rem", padding: "0.875rem", fontWeight: 700, cursor: valid ? "pointer" : "not-allowed", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", transition: "all 0.2s" }}>
          {status === "loading" ? <><Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /> Sending Request...</> : <><Send size={16} /> Get My Free Quote Now</>}
        </button>
      </div>
    </div>
  );
}