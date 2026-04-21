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
  Shield,
} from "lucide-react";

const PHONE_DISPLAY = "+1 250-317-1366";
const PHONE_RAW = "12503171366";
const WA_DEFAULT_MSG = "Hi Keystoners, I'd like a free quote for exterior cleaning.";
const buildWA = (msg) => `https://wa.me/${PHONE_RAW}?text=${encodeURIComponent(msg)}`;

const C = {
  navy: "#0b1e3c",
  navy2: "#102852",
  navy3: "#163468",
  white: "#ffffff",
  offWhite: "#f6f8fc",
  pale: "#eef3fb",
  pale2: "#dce7f8",
  gold: "#f0b322",
  ink: "#0f172a",
  text: "#475569",
  text2: "#64748b",
  border: "#d9e3f2",
  green: "#25D366",
};

const services = [
  {
    title: "Roof Soft Wash",
    short: "Remove moss, algae, and roof streaks safely without damaging shingles.",
    desc: "A safer low-pressure treatment that improves roof appearance while helping prevent future buildup.",
    icon: ShieldCheck,
    price: "From $349",
    duration: "2–4 hrs",
    image: "/roof cleaning.jpg",
  },
  {
    title: "Gutter Cleaning",
    short: "Clear blocked gutters and downspouts before overflow causes damage.",
    desc: "Full debris removal and water-flow check so your drainage works properly again.",
    icon: Droplets,
    price: "From $149",
    duration: "1–2 hrs",
    image: "/image 2.jpg",
  },
  {
    title: "House Washing",
    short: "Refresh siding, trim, and soffits with a cleaner exterior finish.",
    desc: "Great for improving curb appeal fast without harsh pressure on sensitive exterior surfaces.",
    icon: Home,
    price: "From $299",
    duration: "2–3 hrs",
    image: "/image 1.jpg",
  },
  {
    title: "Pressure Washing",
    short: "Revive driveways, patios, and concrete with deep surface cleaning.",
    desc: "Cuts through dirt and weather staining on hard surfaces for a brighter, cleaner look.",
    icon: Waves,
    price: "From $199",
    duration: "1–3 hrs",
    image: "/floor.jpg",
  },
  {
    title: "Window Cleaning",
    short: "Get a brighter, cleaner exterior with streak-free window cleaning.",
    desc: "Perfect finishing service after a wash, especially for boosting overall property presentation.",
    icon: Sparkles,
    price: "From $179",
    duration: "1–2 hrs",
    image: "/image 1.jpg",
  },
  {
    title: "Maintenance Plans",
    short: "Seasonal care plans for homeowners, strata, and repeat clients.",
    desc: "Bundle roof, gutter, and exterior cleaning into an ongoing maintenance plan.",
    icon: Wind,
    price: "From $499/yr",
    duration: "Ongoing",
    image: "/pipe cleaning.jpg",
  },
];

const heroPills = [
  { title: "Gutter Cleaning", image: "/image 2.jpg" },
  { title: "Roof Soft Wash", image: "/roof cleaning.jpg" },
  { title: "House Washing", image: "/image 1.jpg" },
  { title: "Window Cleaning", image: "/image 1.jpg" },
  { title: "Pressure Washing", image: "/floor.jpg" },
];

const beforeAfter = [
  { title: "Driveway Pressure Washing", image: "/floor.jpg" },
  { title: "Gutter Cleaning", image: "/image 2.jpg" },
  { title: "Roof & Gutter Refresh", image: "/pipe cleaning.jpg" },
  { title: "Roof Moss Removal", image: "/roof cleaning.jpg" },
];

const coverage = [
  "Vancouver",
  "Burnaby",
  "Richmond",
  "Surrey",
  "Langley",
  "Coquitlam",
  "New Westminster",
  "North Vancouver",
  "West Vancouver",
  "Delta",
  "Maple Ridge",
  "Port Coquitlam",
];

const reviews = [
  {
    name: "Sarah M.",
    location: "Vancouver",
    stars: 5,
    text: "Gutters were completely cleared and the property looked noticeably cleaner the same day. Very professional and easy to deal with.",
    service: "Gutter Cleaning",
  },
  {
    name: "David K.",
    location: "Burnaby",
    stars: 5,
    text: "House wash made a massive difference. Fast response, no hassle, and everything looked fresh again.",
    service: "House Washing",
  },
  {
    name: "Priya T.",
    location: "North Vancouver",
    stars: 5,
    text: "Roof soft wash removed years of growth. Honest, clean work and very easy communication.",
    service: "Roof Soft Wash",
  },
  {
    name: "James O.",
    location: "Surrey",
    stars: 5,
    text: "Driveway and hard surfaces came out way better than expected. Great value and neat finish.",
    service: "Pressure Washing",
  },
];

const faqs = [
  {
    q: "Do I need to be home during the service?",
    a: "Usually no. We only need access details and any specific instructions. Many exterior jobs can be completed while you're away.",
  },
  {
    q: "How long does a roof soft wash last?",
    a: "Typically 2–3 years depending on shade, moisture, and tree coverage. The treatment targets root growth rather than only surface appearance.",
  },
  {
    q: "Do you work across the Lower Mainland?",
    a: "Yes. We cover Vancouver and many surrounding areas including Burnaby, Richmond, Surrey, Langley, Coquitlam, Delta, and North Vancouver.",
  },
  {
    q: "Can I contact you directly on WhatsApp?",
    a: "Yes. The floating WhatsApp button, quote popup, and contact form all open directly into WhatsApp with your details pre-filled.",
  },
];

const trustBadges = [
  { icon: Shield, title: "Licensed & Insured" },
  { icon: BadgeCheck, title: "Safe Soft Wash Methods" },
  { icon: Sparkles, title: "Moss Protection Focus" },
  { icon: Clock3, title: "Fast Local Response" },
  { icon: MapPin, title: "Lower Mainland Service" },
];

const whyCards = [
  { icon: BadgeCheck, title: "No-pressure quotes", body: "Clear pricing guidance without a confusing sales process." },
  { icon: Zap, title: "Fast response", body: "Most quote requests are answered the same day." },
  { icon: ThumbsUp, title: "Visible results", body: "Before-and-after visuals help show exactly what kind of difference to expect." },
  { icon: ShieldCheck, title: "Professional service", body: "Simple, reliable exterior cleaning with a clean finish and smooth communication." },
];

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Modal({ open, onClose, children }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(11,30,60,0.72)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 560,
          maxHeight: "90vh",
          overflowY: "auto",
          background: C.white,
          borderRadius: "1.5rem",
          boxShadow: "0 36px 80px rgba(11,30,60,0.24)",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: `1px solid ${C.border}`,
            background: C.offWhite,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: C.text,
            zIndex: 2,
          }}
        >
          <X size={15} />
        </button>
        {children}
      </div>
    </div>
  );
}

const fieldSt = {
  width: "100%",
  background: C.offWhite,
  border: `1px solid ${C.border}`,
  borderRadius: "0.8rem",
  padding: "0.9rem 1rem",
  color: C.ink,
  fontSize: "0.95rem",
  outline: "none",
  boxSizing: "border-box",
};

const selSt = (value) => ({
  ...fieldSt,
  color: value ? C.ink : C.text2,
  background: C.white,
});

function QuoteModal({ open, onClose, prefill = "" }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: prefill,
    city: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    if (open) {
      setForm((f) => ({ ...f, service: prefill || f.service }));
      setStatus("idle");
    }
  }, [open, prefill]);

  const valid = form.name && form.phone && form.service && form.city;
  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const submit = () => {
    if (!valid) return;
    setStatus("loading");
    const msg = [
      "Hi Keystoners, I need a quote.",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.email ? `Email: ${form.email}` : null,
      `Service: ${form.service}`,
      `City: ${form.city}`,
      form.message ? `Note: ${form.message}` : null,
    ]
      .filter(Boolean)
      .join("
");

    setTimeout(() => {
      setStatus("success");
      window.open(buildWA(msg), "_blank", "noopener,noreferrer");
    }, 500);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ padding: "2rem" }}>
        {status === "success" ? (
          <div style={{ textAlign: "center", padding: "1rem 0" }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "#dcfce7",
                margin: "0 auto 1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Check size={28} style={{ color: "#16a34a" }} />
            </div>
            <h3
              style={{
                margin: "0 0 0.5rem",
                color: C.navy,
                fontSize: "1.3rem",
                fontWeight: 800,
              }}
            >
              Opening WhatsApp…
            </h3>
            <p style={{ margin: "0 0 1.2rem", color: C.text }}>Your quote details are ready to send.</p>
            <button
              onClick={onClose}
              style={{
                background: C.navy,
                color: C.white,
                border: "none",
                borderRadius: "0.75rem",
                padding: "0.8rem 1.6rem",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <h3 style={{ margin: "0 0 0.3rem", color: C.navy, fontSize: "1.4rem", fontWeight: 800 }}>
              Get your free quote
            </h3>
            <p style={{ margin: "0 0 1.4rem", color: C.text, fontSize: "0.92rem" }}>
              Fill this once and WhatsApp will open with your message pre-filled.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <input type="text" placeholder="Full Name *" value={form.name} onChange={(e) => set("name", e.target.value)} style={fieldSt} />
              <input type="tel" placeholder="Phone *" value={form.phone} onChange={(e) => set("phone", e.target.value)} style={fieldSt} />
              <input type="email" placeholder="Email (optional)" value={form.email} onChange={(e) => set("email", e.target.value)} style={fieldSt} />
              <select value={form.service} onChange={(e) => set("service", e.target.value)} style={selSt(form.service)}>
                <option value="">Service needed *</option>
                {services.map((s) => (
                  <option key={s.title} value={s.title}>
                    {s.title}
                  </option>
                ))}
                <option value="Multiple Services">Multiple Services</option>
              </select>
              <select value={form.city} onChange={(e) => set("city", e.target.value)} style={selSt(form.city)}>
                <option value="">Your city *</option>
                {coverage.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
                <option value="Other">Other</option>
              </select>
              <textarea rows={3} placeholder="Anything else?" value={form.message} onChange={(e) => set("message", e.target.value)} style={{ ...fieldSt, resize: "vertical" }} />
              <button
                onClick={submit}
                disabled={!valid || status === "loading"}
                style={{
                  background: valid ? C.green : C.border,
                  color: valid ? C.white : C.text2,
                  border: "none",
                  borderRadius: "0.8rem",
                  padding: "0.95rem",
                  fontWeight: 700,
                  fontSize: "1rem",
                  cursor: valid ? "pointer" : "not-allowed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={17} style={{ animation: "spin 1s linear infinite" }} /> Preparing…
                  </>
                ) : (
                  <>
                    <MessageCircle size={16} /> Send on WhatsApp
                  </>
                )}
              </button>
              {!valid && (
                <p style={{ margin: 0, color: C.text2, fontSize: "0.8rem" }}>
                  <AlertCircle size={11} style={{ display: "inline", marginRight: 4 }} />
                  Name, phone, service and city are required
                </p>
              )}
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
      <div style={{ overflow: "hidden", borderRadius: "1.5rem" }}>
        <div style={{ height: 220, position: "relative", overflow: "hidden" }}>
          <img src={service.image} alt={service.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(11,30,60,0.74), transparent)" }} />
          <div style={{ position: "absolute", left: 16, bottom: 16, display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <span style={{ background: C.gold, color: C.white, borderRadius: "999px", padding: "0.3rem 0.8rem", fontSize: "0.8rem", fontWeight: 700 }}>{service.price}</span>
            <span style={{ background: "rgba(255,255,255,0.22)", color: C.white, borderRadius: "999px", padding: "0.3rem 0.8rem", fontSize: "0.8rem" }}>
              <Clock3 size={11} style={{ display: "inline", marginRight: 3 }} />
              {service.duration}
            </span>
          </div>
        </div>
        <div style={{ padding: "1.5rem" }}>
          <div style={{ width: 44, height: 44, borderRadius: "0.8rem", background: C.pale, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
            <Icon size={22} style={{ color: C.navy2 }} />
          </div>
          <h3 style={{ margin: "0 0 0.7rem", color: C.navy, fontSize: "1.35rem", fontWeight: 800 }}>{service.title}</h3>
          <p style={{ margin: "0 0 0.7rem", color: C.text, lineHeight: 1.7 }}>{service.short}</p>
          <p style={{ margin: "0 0 1.4rem", color: C.text, lineHeight: 1.7 }}>{service.desc}</p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button onClick={() => { onClose(); onQuote(service.title); }} style={{ background: C.navy, color: C.white, border: "none", borderRadius: "0.8rem", padding: "0.85rem 1.4rem", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: "0.45rem" }}>
              <ArrowRight size={15} /> Get a Quote
            </button>
            <a href={buildWA(`Hi Keystoners, I'm interested in ${service.title}.`)} target="_blank" rel="noopener noreferrer" style={{ background: C.green, color: C.white, borderRadius: "0.8rem", padding: "0.85rem 1.2rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.45rem" }}>
              <MessageCircle size={15} /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </Modal>
  );
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${C.border}` }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", background: "none", border: "none", padding: "1.2rem 0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", cursor: "pointer", textAlign: "left" }}>
        <span style={{ color: C.navy, fontWeight: 700, fontSize: "1rem", lineHeight: 1.45 }}>{q}</span>
        <ChevronDown size={18} style={{ color: C.gold, flexShrink: 0, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.22s" }} />
      </button>
      {open && <p style={{ margin: "0 0 1.1rem", color: C.text, lineHeight: 1.75, fontSize: "0.95rem" }}>{a}</p>}
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", service: "", city: "", message: "" });
  const [status, setStatus] = useState("idle");
  const valid = form.name && form.phone && form.service && form.city;
  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const submit = (e) => {
    e.preventDefault();
    if (!valid) return;
    setStatus("loading");
    const msg = [
      "Hi Keystoners, quote request from website.",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.email ? `Email: ${form.email}` : null,
      `Service: ${form.service}`,
      `City: ${form.city}`,
      form.message ? `Note: ${form.message}` : null,
    ]
      .filter(Boolean)
      .join("
");

    setTimeout(() => {
      setStatus("success");
      window.open(buildWA(msg), "_blank", "noopener,noreferrer");
    }, 500);
  };

  return (
    <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "0.8rem", background: C.white, border: `1px solid ${C.border}`, borderRadius: "1.25rem", padding: "1.4rem", boxShadow: "0 16px 40px rgba(11,30,60,0.08)" }}>
      <div className="form-name-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
        <input type="text" placeholder="Full Name *" value={form.name} onChange={(e) => set("name", e.target.value)} style={fieldSt} />
        <input type="tel" placeholder="Phone *" value={form.phone} onChange={(e) => set("phone", e.target.value)} style={fieldSt} />
      </div>
      <input type="email" placeholder="Email (optional)" value={form.email} onChange={(e) => set("email", e.target.value)} style={fieldSt} />
      <select value={form.service} onChange={(e) => set("service", e.target.value)} style={selSt(form.service)}>
        <option value="">Service needed *</option>
        {services.map((s) => (
          <option key={s.title} value={s.title}>
            {s.title}
          </option>
        ))}
        <option value="Multiple Services">Multiple Services</option>
      </select>
      <select value={form.city} onChange={(e) => set("city", e.target.value)} style={selSt(form.city)}>
        <option value="">Your city *</option>
        {coverage.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
        <option value="Other">Other</option>
      </select>
      <textarea rows={4} placeholder="Additional details" value={form.message} onChange={(e) => set("message", e.target.value)} style={{ ...fieldSt, resize: "vertical" }} />
      <button type="submit" disabled={!valid || status === "loading"} style={{ background: valid ? C.navy : C.border, color: valid ? C.white : C.text2, border: "none", borderRadius: "0.85rem", padding: "1rem", fontWeight: 700, fontSize: "1rem", cursor: valid ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
        {status === "loading" ? (
          <>
            <Loader2 size={17} style={{ animation: "spin 1s linear infinite" }} /> Preparing…
          </>
        ) : (
          <>
            <Send size={15} /> Send via WhatsApp
          </>
        )}
      </button>
      {!valid && (
        <p style={{ margin: 0, color: C.text2, fontSize: "0.8rem" }}>
          <AlertCircle size={11} style={{ display: "inline", marginRight: 4 }} />
          Name, phone, service and city are required
        </p>
      )}
    </form>
  );
}

export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quotePrefill, setQuotePrefill] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [areaSearch, setAreaSearch] = useState("");
  const [areaResult, setAreaResult] = useState(null);

  const openQuote = (prefill = "") => {
    setQuotePrefill(prefill);
    setQuoteOpen(true);
  };

  const openService = (service) => {
    setSelectedService(service);
    setServiceOpen(true);
  };

  const scrollTo = (id) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const checkArea = () => {
    const q = areaSearch.toLowerCase().trim();
    if (!q) return;
    const match = coverage.find((c) => c.toLowerCase().includes(q));
    setAreaResult(match ? { found: true, city: match } : { found: false });
  };

  const navLinks = [
    { label: "Services", id: "services" },
    { label: "Why Us", id: "why-us" },
    { label: "Results", id: "results" },
    { label: "Service Area", id: "coverage" },
    { label: "Reviews", id: "reviews" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: C.white, color: C.ink, fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Bricolage+Grotesque:wght@600;700;800&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: ${C.white}; }
        a { color: inherit; text-decoration: none; }
        input, textarea, select { font-family: inherit; }
        input::placeholder, textarea::placeholder { color: ${C.text2}; }
        input:focus, textarea:focus, select:focus { outline: none; border-color: ${C.navy2} !important; box-shadow: 0 0 0 3px ${C.pale2} !important; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .nav-link:hover { color: ${C.white} !important; }
        .service-card { transition: transform .24s ease, box-shadow .24s ease; cursor: pointer; }
        .service-card:hover { transform: translateY(-4px); box-shadow: 0 20px 44px rgba(11,30,60,.14) !important; }
        .service-card:hover .service-img { transform: scale(1.04); }
        .service-img { transition: transform .45s ease; }
        .result-card img { transition: transform .35s ease; }
        .result-card:hover img { transform: scale(1.02); }
        @media (max-width: 1120px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-right { max-width: 760px; margin: 0 auto; }
        }
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .menu-btn { display: flex !important; }
          .hero-actions, .cta-row { flex-direction: column !important; }
          .hero-actions > *, .cta-row > * { width: 100% !important; justify-content: center; }
          .service-grid { grid-template-columns: repeat(2,1fr) !important; }
          .why-grid, .coverage-grid, .contact-grid { grid-template-columns: 1fr !important; }
          .float-badge { display: none !important; }
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
          .pill-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .service-grid, .results-grid, .review-grid, .trust-grid, .footer-grid { grid-template-columns: 1fr !important; }
          .city-grid { grid-template-columns: repeat(2,1fr) !important; }
          .wa-label { display: none !important; }
          .form-name-row { grid-template-columns: 1fr !important; }
          .pill-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <header style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(11,30,60,0.92)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.25rem", minHeight: 74, display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
          <button onClick={() => scrollTo("hero")} style={{ display: "flex", alignItems: "center", gap: "0.75rem", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            <div style={{ width: 42, height: 42, borderRadius: "0.8rem", background: C.white, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Sparkles size={18} style={{ color: C.gold }} />
            </div>
            <div style={{ textAlign: "left" }}>
              <p style={{ margin: 0, fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: "1.02rem", color: C.white }}>Keystoners</p>
              <p style={{ margin: 0, color: "rgba(255,255,255,0.62)", fontSize: "0.72rem" }}>Exterior Cleaning</p>
            </div>
          </button>

          <nav className="desktop-nav" style={{ display: "flex", gap: "1.65rem", alignItems: "center" }}>
            {navLinks.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="nav-link" style={{ background: "none", border: "none", color: "rgba(255,255,255,0.72)", fontSize: "0.9rem", fontWeight: 500, cursor: "pointer", padding: 0 }}>
                {l.label}
              </button>
            ))}
          </nav>

          <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
            <a href={`tel:${PHONE_RAW}`} style={{ background: "rgba(255,255,255,0.08)", color: C.white, border: "1px solid rgba(255,255,255,0.15)", borderRadius: "0.75rem", padding: "0.6rem 0.9rem", display: "flex", alignItems: "center", gap: "0.45rem", fontWeight: 600, fontSize: "0.88rem" }}>
              <Phone size={14} /> Call
            </a>
            <button onClick={() => openQuote()} style={{ background: C.gold, color: C.white, border: "none", borderRadius: "0.75rem", padding: "0.65rem 1rem", fontWeight: 700, cursor: "pointer", fontSize: "0.9rem" }}>
              Free Quote
            </button>
            <button className="menu-btn" onClick={() => setMobileOpen((v) => !v)} style={{ display: "none", width: 40, height: 40, borderRadius: "0.75rem", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.08)", color: C.white, alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div style={{ background: C.navy, borderTop: "1px solid rgba(255,255,255,0.08)", padding: "0.75rem 1.25rem 1rem" }}>
            {navLinks.map((l) => (
              <button key={l.id} onClick={() => scrollTo(l.id)} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", color: C.white, padding: "0.85rem 0", borderBottom: "1px solid rgba(255,255,255,0.08)", fontSize: "0.98rem", cursor: "pointer" }}>
                {l.label}
              </button>
            ))}
            <button onClick={() => { setMobileOpen(false); openQuote(); }} style={{ marginTop: "0.8rem", width: "100%", background: C.gold, color: C.white, border: "none", borderRadius: "0.85rem", padding: "0.95rem", fontWeight: 700, cursor: "pointer" }}>
              Get Free Quote
            </button>
          </div>
        )}
      </header>

      <section id="hero" style={{ background: `linear-gradient(135deg, ${C.navy} 0%, ${C.navy2} 58%, ${C.navy3} 100%)`, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 75% 25%, rgba(240,179,34,0.14) 0%, transparent 42%), radial-gradient(circle at 20% 80%, rgba(255,255,255,0.08) 0%, transparent 40%)", zIndex: 0 }} />
        <div className="hero-grid" style={{ maxWidth: 1280, margin: "0 auto", padding: "5rem 1.25rem 2rem", display: "grid", gridTemplateColumns: "1.03fr 0.97fr", gap: "3rem", alignItems: "center", position: "relative", zIndex: 1 }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(240,179,34,0.14)", border: "1px solid rgba(240,179,34,0.3)", borderRadius: "999px", padding: "0.42rem 0.95rem", marginBottom: "1.2rem", color: "#fde68a", fontSize: "0.84rem", fontWeight: 500 }}>
              <Star size={13} style={{ fill: "#fde68a", color: "#fde68a" }} /> Trusted exterior cleaning across the Lower Mainland
            </div>
            <h1 style={{ margin: "0 0 1rem", fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: "clamp(2.4rem, 5.2vw, 4.2rem)", lineHeight: 1.04, letterSpacing: "-0.03em", color: C.white }}>
              Protect your home and make it look spotless again.
            </h1>
            <p style={{ margin: "0 0 1.8rem", color: "rgba(255,255,255,0.74)", fontSize: "1.04rem", lineHeight: 1.75, maxWidth: 560 }}>
              Roof cleaning, gutter cleaning, house washing, and pressure washing across Vancouver and the Lower Mainland with fast quotes and real visible results.
            </p>
            <div className="hero-actions" style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
              <button onClick={() => openQuote()} style={{ background: C.gold, color: C.white, border: "none", borderRadius: "0.85rem", padding: "1rem 1.6rem", fontWeight: 700, fontSize: "1rem", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.45rem", boxShadow: "0 10px 30px rgba(240,179,34,0.32)" }}>
                Get Free Quote <ArrowRight size={16} />
              </button>
              <a href={`tel:${PHONE_RAW}`} style={{ background: "rgba(255,255,255,0.08)", color: C.white, border: "1px solid rgba(255,255,255,0.18)", borderRadius: "0.85rem", padding: "1rem 1.3rem", display: "flex", alignItems: "center", gap: "0.45rem", fontWeight: 600, fontSize: "0.98rem" }}>
                <Phone size={15} /> {PHONE_DISPLAY}
              </a>
              <a href={buildWA(WA_DEFAULT_MSG)} target="_blank" rel="noopener noreferrer" style={{ background: C.green, color: C.white, borderRadius: "0.85rem", padding: "1rem 1.2rem", display: "flex", alignItems: "center", gap: "0.45rem", fontWeight: 700, fontSize: "0.98rem" }}>
                <MessageCircle size={15} /> WhatsApp
              </a>
            </div>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1.2rem" }}>
              {["Licensed & Insured", "Fast Response", "Safe Soft Wash", "Local Service"].map((t) => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: "0.35rem", color: "rgba(255,255,255,0.7)", fontSize: "0.84rem" }}>
                  <CheckCircle2 size={13} style={{ color: C.gold }} /> {t}
                </div>
              ))}
            </div>
            <div className="pill-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.9rem", marginTop: "1.5rem" }}>
              {heroPills.map((pill) => (
                <button key={pill.title} onClick={() => openQuote(pill.title)} style={{ display: "flex", alignItems: "center", gap: "0.8rem", background: C.white, border: "none", borderRadius: "999px", padding: "0.55rem 0.8rem 0.55rem 0.55rem", cursor: "pointer", boxShadow: "0 14px 32px rgba(0,0,0,0.16)", textAlign: "left" }}>
                  <div style={{ width: 54, height: 54, borderRadius: "999px", overflow: "hidden", flexShrink: 0 }}>
                    <img src={pill.image} alt={pill.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  </div>
                  <span style={{ color: C.ink, fontWeight: 700, fontSize: "1rem", lineHeight: 1.2 }}>{pill.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="hero-right" style={{ position: "relative" }}>
            <div style={{ borderRadius: "1.8rem", overflow: "hidden", border: "1px solid rgba(255,255,255,0.14)", boxShadow: "0 48px 100px rgba(0,0,0,0.32)" }}>
              <div style={{ position: "relative", aspectRatio: "4 / 5" }}>
                <img src="/roof cleaning.jpg" alt="Roof cleaning before and after" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(11,30,60,0.76) 0%, transparent 58%)" }} />
                <div style={{ position: "absolute", left: 16, right: 16, bottom: 16, background: "rgba(255,255,255,0.96)", borderRadius: "1.1rem", padding: "1rem" }}>
                  <p style={{ margin: "0 0 0.25rem", color: C.text, fontSize: "0.76rem" }}>Most requested combo</p>
                  <p style={{ margin: "0 0 0.8rem", color: C.navy, fontWeight: 800, fontSize: "1rem" }}>Roof Wash + Gutter Clean</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginBottom: "0.8rem" }}>
                    {["Protects roof edges", "Improves drainage flow"].map((t) => (
                      <div key={t} style={{ background: C.offWhite, borderRadius: "0.65rem", padding: "0.6rem 0.7rem", fontSize: "0.77rem", color: C.navy }}>
                        {t}
                      </div>
                    ))}
                  </div>
                  <button onClick={() => openQuote("Roof Soft Wash + Gutter Cleaning")} style={{ width: "100%", background: C.navy, color: C.white, border: "none", borderRadius: "0.7rem", padding: "0.7rem", fontWeight: 700, cursor: "pointer" }}>
                    Get a Quote for This
                  </button>
                </div>
              </div>
            </div>
            <div className="float-badge" style={{ position: "absolute", top: "2rem", left: "-4.5rem", background: C.white, borderRadius: "1rem", padding: "0.8rem 1rem", boxShadow: "0 12px 36px rgba(11,30,60,0.16)", display: "flex", alignItems: "center", gap: "0.7rem" }}>
              <div style={{ width: 38, height: 38, borderRadius: "0.7rem", background: C.pale, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Clock3 size={17} style={{ color: C.navy2 }} />
              </div>
              <div>
                <p style={{ margin: 0, color: C.text, fontSize: "0.74rem" }}>Average response</p>
                <p style={{ margin: 0, color: C.navy, fontWeight: 700, fontSize: "0.9rem" }}>Same day · under 24 hrs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: C.navy, padding: "1.3rem 1.25rem", borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="trust-grid" style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "1rem", alignItems: "stretch" }}>
          {trustBadges.map((b, i) => {
            const Icon = b.icon;
            return (
              <Reveal key={b.title} delay={i * 40}>
                <div style={{ height: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "1rem", padding: "1rem", color: C.white, display: "flex", alignItems: "center", gap: "0.65rem", justifyContent: "center", textAlign: "center" }}>
                  <Icon size={18} style={{ color: C.gold, flexShrink: 0 }} />
                  <span style={{ fontWeight: 700, fontSize: "0.9rem", lineHeight: 1.3 }}>{b.title}</span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section style={{ background: C.white, boxShadow: "0 8px 24px rgba(11,30,60,0.04)" }}>
        <div className="stats-grid" style={{ maxWidth: 1280, margin: "0 auto", padding: "1rem 1.25rem", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem" }}>
          {[
            { value: "24hr", label: "Quote response" },
            { value: "5★", label: "Top-rated service" },
            { value: "500+", label: "Homes cleaned" },
            { value: "100%", label: "Satisfaction focus" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <p style={{ margin: 0, color: C.navy, fontWeight: 800, fontSize: "1.35rem", fontFamily: "'Bricolage Grotesque', sans-serif" }}>{s.value}</p>
              <p style={{ margin: 0, color: C.text, fontSize: "0.8rem" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="services" style={{ background: C.offWhite, padding: "5.5rem 1.25rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <p style={{ margin: "0 0 0.5rem", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.18em", color: C.gold, fontWeight: 700 }}>Our Services</p>
              <h2 style={{ margin: "0 0 0.8rem", fontFamily: "'Bricolage Grotesque', sans-serif", color: C.navy, fontWeight: 800, fontSize: "clamp(1.9rem, 3.6vw, 2.8rem)" }}>Simple, clear services homeowners actually need</h2>
              <p style={{ margin: 0, color: C.text, maxWidth: 560, marginLeft: "auto", marginRight: "auto", lineHeight: 1.7 }}>Service visuals, stronger descriptions, and clear actions — built to look premium without feeling crowded.</p>
            </div>
          </Reveal>
          <div className="service-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.2rem" }}>
            {services.map((svc, i) => {
              const Icon = svc.icon;
              return (
                <Reveal key={svc.title} delay={i * 55}>
                  <div className="service-card" onClick={() => openService(svc)} style={{ background: C.white, borderRadius: "1.2rem", overflow: "hidden", border: `1px solid ${C.border}`, boxShadow: "0 8px 24px rgba(11,30,60,0.07)", height: "100%", display: "flex", flexDirection: "column" }}>
                    <div style={{ height: 190, overflow: "hidden", position: "relative" }}>
                      <img src={svc.image} alt={svc.title} className="service-img" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(11,30,60,0.5), transparent 60%)" }} />
                      <span style={{ position: "absolute", left: 12, bottom: 12, background: C.gold, color: C.white, borderRadius: "999px", padding: "0.28rem 0.7rem", fontSize: "0.78rem", fontWeight: 700 }}>{svc.price}</span>
                    </div>
                    <div style={{ padding: "1.2rem", flex: 1, display: "flex", flexDirection: "column" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "0.75rem" }}>
                        <div style={{ width: 36, height: 36, borderRadius: "0.7rem", background: C.pale, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <Icon size={17} style={{ color: C.navy2 }} />
                        </div>
                        <h3 style={{ margin: 0, color: C.navy, fontWeight: 800, fontSize: "1.03rem" }}>{svc.title}</h3>
                      </div>
                      <p style={{ margin: "0 0 1rem", color: C.text, lineHeight: 1.65, fontSize: "0.9rem", flex: 1 }}>{svc.short}</p>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
                        <span style={{ color: C.navy2, fontWeight: 700, fontSize: "0.88rem", display: "flex", alignItems: "center", gap: "0.3rem" }}>View details <ChevronRight size={14} /></span>
                        <span style={{ color: C.text2, fontSize: "0.78rem" }}>
                          <Clock3 size={11} style={{ display: "inline", marginRight: 3 }} />{svc.duration}
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

      <section id="why-us" style={{ background: C.white, padding: "5.5rem 1.25rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "center" }}>
            <Reveal>
              <p style={{ margin: "0 0 0.5rem", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.18em", color: C.gold, fontWeight: 700 }}>Why Keystoners</p>
              <h2 style={{ margin: "0 0 1rem", color: C.navy, fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: "clamp(1.9rem, 3.5vw, 2.7rem)", lineHeight: 1.12 }}>Professional look. Professional process. Professional results.</h2>
              <p style={{ margin: "0 0 1.8rem", color: C.text, lineHeight: 1.75, maxWidth: 460 }}>This layout is intentionally simple like a strong service-business homepage should be: clear services, clear proof, clear action, and easy contact.</p>
              <div className="cta-row" style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <button onClick={() => openQuote()} style={{ background: C.navy, color: C.white, border: "none", borderRadius: "0.85rem", padding: "0.95rem 1.5rem", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: "0.45rem" }}>
                  Get Free Quote <ArrowRight size={15} />
                </button>
                <a href={buildWA(WA_DEFAULT_MSG)} target="_blank" rel="noopener noreferrer" style={{ background: C.green, color: C.white, borderRadius: "0.85rem", padding: "0.95rem 1.2rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.45rem" }}>
                  <MessageCircle size={15} /> WhatsApp
                </a>
              </div>
            </Reveal>
            <div className="trust-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {whyCards.map((tp, i) => {
                const Icon = tp.icon;
                return (
                  <Reveal key={tp.title} delay={i * 55}>
                    <div style={{ background: C.offWhite, border: `1px solid ${C.border}`, borderRadius: "1rem", padding: "1.2rem" }}>
                      <div style={{ width: 40, height: 40, borderRadius: "0.7rem", background: C.pale, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "0.8rem" }}>
                        <Icon size={18} style={{ color: C.navy2 }} />
                      </div>
                      <p style={{ margin: "0 0 0.3rem", color: C.navy, fontWeight: 800, fontSize: "0.95rem" }}>{tp.title}</p>
                      <p style={{ margin: 0, color: C.text, lineHeight: 1.6, fontSize: "0.85rem" }}>{tp.body}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="results" style={{ background: C.offWhite, padding: "5.5rem 1.25rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "2.8rem" }}>
              <p style={{ margin: "0 0 0.5rem", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.18em", color: C.gold, fontWeight: 700 }}>Before & After</p>
              <h2 style={{ margin: "0 0 0.8rem", color: C.navy, fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: "clamp(1.9rem, 3.6vw, 2.8rem)" }}>Real work. Real visible difference.</h2>
              <p style={{ margin: 0, color: C.text, maxWidth: 560, marginLeft: "auto", marginRight: "auto", lineHeight: 1.7 }}>Your uploaded result images are placed here where they help most — showing clear transformation and helping visitors trust the result.</p>
            </div>
          </Reveal>
          <div className="results-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1rem" }}>
            {beforeAfter.map((item, i) => (
              <Reveal key={item.title} delay={i * 60}>
                <div className="result-card" style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: "1.2rem", overflow: "hidden", boxShadow: "0 10px 30px rgba(11,30,60,0.08)" }}>
                  <img src={item.image} alt={item.title} style={{ width: "100%", height: 320, objectFit: "cover", display: "block" }} />
                  <div style={{ padding: "1rem 1.1rem" }}>
                    <p style={{ margin: 0, color: C.navy, fontWeight: 800, fontSize: "0.95rem" }}>{item.title}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="coverage" style={{ background: C.white, padding: "5.5rem 1.25rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="coverage-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.4rem" }}>
            <Reveal>
              <div style={{ background: C.offWhite, border: `1px solid ${C.border}`, borderRadius: "1.2rem", padding: "1.6rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.2rem" }}>
                  <div style={{ width: 42, height: 42, borderRadius: "0.75rem", background: C.pale, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <MapPin size={20} style={{ color: C.navy2 }} />
                  </div>
                  <div>
                    <p style={{ margin: 0, color: C.text, fontSize: "0.8rem" }}>Service Area</p>
                    <h3 style={{ margin: 0, color: C.navy, fontWeight: 800, fontSize: "1.15rem" }}>Vancouver & Lower Mainland</h3>
                  </div>
                </div>
                <div className="city-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "0.5rem", marginBottom: "1rem" }}>
                  {coverage.map((city) => (
                    <div key={city} onClick={() => { setAreaSearch(city); setAreaResult({ found: true, city }); }} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: "0.65rem", padding: "0.6rem 0.5rem", textAlign: "center", color: C.text, fontSize: "0.82rem", cursor: "pointer" }}>
                      {city}
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: "0.65rem" }}>
                  <input value={areaSearch} onChange={(e) => { setAreaSearch(e.target.value); setAreaResult(null); }} onKeyDown={(e) => e.key === "Enter" && checkArea()} placeholder="Check your city…" style={{ ...fieldSt, flex: 1 }} />
                  <button onClick={checkArea} style={{ background: C.navy, color: C.white, border: "none", borderRadius: "0.75rem", padding: "0 1.1rem", fontWeight: 700, cursor: "pointer" }}>
                    Check
                  </button>
                </div>
                {areaResult && (
                  <div style={{ marginTop: "0.85rem", padding: "0.85rem 1rem", borderRadius: "0.8rem", background: areaResult.found ? "#f0fdf4" : "#fef2f2", border: `1px solid ${areaResult.found ? "#86efac" : "#fca5a5"}`, color: areaResult.found ? "#16a34a" : "#dc2626", display: "flex", alignItems: "center", gap: "0.45rem", fontSize: "0.9rem" }}>
                    {areaResult.found ? <Check size={14} /> : <AlertCircle size={14} />}
                    {areaResult.found ? `Great — we service ${areaResult.city}.` : "May still be covered. Message us on WhatsApp to confirm."}
                  </div>
                )}
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div id="reviews" style={{ background: C.navy, borderRadius: "1.2rem", padding: "1.6rem", color: C.white, boxShadow: "0 18px 48px rgba(11,30,60,0.16)" }}>
                <p style={{ margin: "0 0 0.4rem", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.18em", color: "#fde68a", fontWeight: 700 }}>Top Reviews</p>
                <h3 style={{ margin: "0 0 1rem", fontWeight: 800, fontSize: "1.18rem" }}>Why homeowners choose Keystoners</h3>
                <div className="review-grid" style={{ display: "grid", gap: "0.8rem" }}>
                  {reviews.slice(0, 3).map((r, i) => (
                    <div key={i} style={{ background: "rgba(255,255,255,0.08)", borderRadius: "0.95rem", padding: "0.95rem" }}>
                      <div style={{ display: "flex", gap: 2, marginBottom: "0.45rem" }}>
                        {Array.from({ length: r.stars }).map((_, idx) => (
                          <Star key={idx} size={12} style={{ color: C.gold, fill: C.gold }} />
                        ))}
                      </div>
                      <p style={{ margin: "0 0 0.6rem", color: "rgba(255,255,255,0.76)", lineHeight: 1.6, fontSize: "0.88rem" }}>&quot;{r.text}&quot;</p>
                      <p style={{ margin: 0, fontWeight: 700, fontSize: "0.84rem" }}>
                        {r.name} <span style={{ fontWeight: 400, color: "rgba(255,255,255,0.55)" }}>— {r.location}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="faq" style={{ background: C.offWhite, padding: "5.5rem 1.25rem" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <Reveal>
            <div style={{ textAlign: "center", marginBottom: "2.3rem" }}>
              <p style={{ margin: "0 0 0.5rem", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.18em", color: C.gold, fontWeight: 700 }}>FAQ</p>
              <h2 style={{ margin: 0, color: C.navy, fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: "clamp(1.9rem, 3.6vw, 2.7rem)" }}>Common questions</h2>
            </div>
          </Reveal>
          <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: "1.2rem", padding: "0.4rem 1.35rem" }}>
            {faqs.map((faq, i) => (
              <Reveal key={i} delay={i * 50}>
                <FAQItem q={faq.q} a={faq.a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: C.navy, padding: "4.5rem 1.25rem" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "2rem", flexWrap: "wrap" }}>
              <div>
                <h2 style={{ margin: "0 0 0.5rem", color: C.white, fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: "clamp(1.7rem, 3vw, 2.4rem)" }}>Ready to clean up your property?</h2>
                <p style={{ margin: 0, color: "rgba(255,255,255,0.7)", fontSize: "1rem" }}>Fast quote. Clear process. Strong curb appeal improvement.</p>
              </div>
              <div className="cta-row" style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <button onClick={() => openQuote()} style={{ background: C.gold, color: C.white, border: "none", borderRadius: "0.85rem", padding: "1rem 1.55rem", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: "0.45rem" }}>
                  Get Free Quote <ArrowRight size={15} />
                </button>
                <a href={buildWA(WA_DEFAULT_MSG)} target="_blank" rel="noopener noreferrer" style={{ background: C.green, color: C.white, borderRadius: "0.85rem", padding: "1rem 1.25rem", fontWeight: 700, display: "flex", alignItems: "center", gap: "0.45rem" }}>
                  <MessageCircle size={15} /> WhatsApp
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="contact" style={{ background: C.white, padding: "5.5rem 1.25rem" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>
            <Reveal>
              <p style={{ margin: "0 0 0.5rem", fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "0.18em", color: C.gold, fontWeight: 700 }}>Contact Us</p>
              <h2 style={{ margin: "0 0 1rem", color: C.navy, fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: "clamp(1.9rem, 3.5vw, 2.7rem)", lineHeight: 1.12 }}>Request your free quote</h2>
              <p style={{ margin: "0 0 1.7rem", color: C.text, lineHeight: 1.75, maxWidth: 420 }}>The form below opens straight into WhatsApp so the message reaches your number directly with all details included.</p>
              <div style={{ display: "grid", gap: "1rem" }}>
                {[
                  { icon: Phone, label: "Phone", value: PHONE_DISPLAY, href: `tel:${PHONE_RAW}` },
                  { icon: Clock3, label: "Response Time", value: "Same day to 24 hours" },
                  { icon: MapPin, label: "Coverage", value: "Vancouver & Lower Mainland" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
                      <div style={{ width: 42, height: 42, borderRadius: "0.75rem", background: C.pale, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <Icon size={18} style={{ color: C.navy2 }} />
                      </div>
                      <div>
                        <p style={{ margin: 0, fontSize: "0.74rem", color: C.text2, textTransform: "uppercase", letterSpacing: "0.08em" }}>{item.label}</p>
                        {item.href ? (
                          <a href={item.href} style={{ color: C.navy, fontWeight: 700, fontSize: "0.95rem" }}>{item.value}</a>
                        ) : (
                          <p style={{ margin: 0, color: C.navy, fontWeight: 700, fontSize: "0.95rem" }}>{item.value}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>
            <Reveal delay={80}><ContactForm /></Reveal>
          </div>
        </div>
      </section>

      <footer style={{ background: C.navy, color: "rgba(255,255,255,0.68)" }}>
        <div className="footer-grid" style={{ maxWidth: 1280, margin: "0 auto", padding: "3.2rem 1.25rem 2rem", display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: "2rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "1rem" }}>
              <div style={{ width: 38, height: 38, borderRadius: "0.7rem", background: "rgba(255,255,255,0.09)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Sparkles size={16} style={{ color: C.gold }} />
              </div>
              <span style={{ color: C.white, fontWeight: 800, fontFamily: "'Bricolage Grotesque', sans-serif" }}>Keystoners</span>
            </div>
            <p style={{ margin: "0 0 1rem", lineHeight: 1.7, maxWidth: 260, fontSize: "0.88rem" }}>Professional exterior cleaning across Vancouver and the Lower Mainland.</p>
            <a href={`tel:${PHONE_RAW}`} style={{ color: C.gold, fontWeight: 700, fontSize: "0.92rem" }}>{PHONE_DISPLAY}</a>
          </div>
          <div>
            <p style={{ margin: "0 0 0.8rem", color: C.white, fontWeight: 700, fontSize: "0.88rem" }}>Services</p>
            {services.map((s) => (
              <button key={s.title} onClick={() => openService(s)} style={{ display: "block", background: "none", border: "none", padding: "0.3rem 0", color: "rgba(255,255,255,0.58)", cursor: "pointer", fontSize: "0.86rem", textAlign: "left" }}>{s.title}</button>
            ))}
          </div>
          <div>
            <p style={{ margin: "0 0 0.8rem", color: C.white, fontWeight: 700, fontSize: "0.88rem" }}>Pages</p>
            {[["Why Us", "why-us"], ["Results", "results"], ["Reviews", "reviews"], ["Contact", "contact"]].map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)} style={{ display: "block", background: "none", border: "none", padding: "0.3rem 0", color: "rgba(255,255,255,0.58)", cursor: "pointer", fontSize: "0.86rem", textAlign: "left" }}>{label}</button>
            ))}
          </div>
          <div>
            <p style={{ margin: "0 0 0.8rem", color: C.white, fontWeight: 700, fontSize: "0.88rem" }}>Areas</p>
            {coverage.slice(0, 6).map((c) => (
              <p key={c} style={{ margin: "0.3rem 0", fontSize: "0.86rem" }}>{c}</p>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", maxWidth: 1280, margin: "0 auto", padding: "1.2rem 1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          <p style={{ margin: 0, fontSize: "0.8rem" }}>© 2025 Keystoners Exterior Cleaning. All rights reserved.</p>
          <button onClick={() => openQuote()} style={{ background: C.gold, color: C.white, border: "none", borderRadius: "0.65rem", padding: "0.6rem 1.1rem", fontWeight: 700, cursor: "pointer", fontSize: "0.85rem" }}>Get Free Quote</button>
        </div>
      </footer>

      <a href={buildWA(WA_DEFAULT_MSG)} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" style={{ position: "fixed", right: 18, bottom: 18, zIndex: 999, display: "flex", alignItems: "center", gap: "0.55rem", background: C.green, color: C.white, borderRadius: "999px", padding: "0.9rem 1rem", boxShadow: "0 14px 32px rgba(37,211,102,0.34)", border: "1px solid rgba(255,255,255,0.18)" }}>
        <MessageCircle size={20} />
        <span className="wa-label" style={{ fontWeight: 800 }}>WhatsApp Us</span>
      </a>

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} prefill={quotePrefill} />
      <ServiceModal service={selectedService} open={serviceOpen} onClose={() => setServiceOpen(false)} onQuote={openQuote} />
    </div>
  );
}
