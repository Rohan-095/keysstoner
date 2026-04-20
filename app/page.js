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
} from "lucide-react";

const PHONE_DISPLAY = "+1 250-317-1366";
const PHONE_WHATSAPP = "12503171366";
const DEFAULT_WHATSAPP_MESSAGE =
  "Hi Keystoners, I need a quote for exterior cleaning.";

const services = [
  {
    title: "Roof Soft Wash",
    desc: "Safe, low-pressure washing to remove moss, algae, lichen, and black streaks from your roof without damaging shingles.",
    icon: ShieldCheck,
    detail:
      "We use biodegradable cleaning solutions that kill organic growth at the root, helping prevent quick regrowth. Works on asphalt shingles, cedar shakes, metal, and tile.",
    price: "From $349",
    duration: "2–4 hrs",
  },
  {
    title: "Gutter Cleaning",
    desc: "Remove leaves, needles, and debris before overflow causes fascia rot, siding stains, or foundation issues.",
    icon: Droplets,
    detail:
      "Includes full scoop-out, bag disposal, and a flush to confirm downspout flow. We also inspect for sagging, loose hangers, or visible damage.",
    price: "From $149",
    duration: "1–2 hrs",
  },
  {
    title: "House Washing",
    desc: "Wash away dirt, algae, mildew, and buildup from siding, trim, soffits, and entry areas.",
    icon: Home,
    detail:
      "Soft-wash approach that's safe for vinyl, Hardie board, stucco, cedar, and painted surfaces. Great for improving curb appeal fast.",
    price: "From $299",
    duration: "2–3 hrs",
  },
  {
    title: "Pressure Washing",
    desc: "Restore driveways, patios, walkways, stairs, and concrete surfaces with high-impact cleaning.",
    icon: Waves,
    detail:
      "Removes oil stains, tire marks, moss, and years of embedded grime from concrete, brick, and pavers.",
    price: "From $199",
    duration: "1–3 hrs",
  },
  {
    title: "Window Cleaning",
    desc: "Streak-free exterior window cleaning that brightens the whole property.",
    icon: Sparkles,
    detail:
      "Pure-water fed-pole system for spotless results on up to 3-storey homes. Includes frames, sills, and screen rinse.",
    price: "From $179",
    duration: "1–2 hrs",
  },
  {
    title: "Maintenance Plans",
    desc: "Seasonal maintenance packages for homeowners, strata, and commercial properties.",
    icon: Wind,
    detail:
      "Bi-annual or quarterly bundles with priority scheduling, bundled pricing, and simple recurring care.",
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
    text: "Absolutely amazing service. Gutters were completely cleared and the house looks fresh again. Showed up exactly on time and left the property spotless.",
    service: "Gutter Cleaning",
  },
  {
    name: "David K.",
    location: "Burnaby",
    stars: 5,
    text: "Quick response, on time, and the house wash made a massive difference. Looks like a new home. Worth every penny.",
    service: "House Washing",
  },
  {
    name: "Priya T.",
    location: "North Vancouver",
    stars: 5,
    text: "Honest advice, no upselling, and very clean work. The roof soft wash removed years of moss buildup. Super professional team.",
    service: "Roof Soft Wash",
  },
  {
    name: "James O.",
    location: "Surrey",
    stars: 5,
    text: "My driveway hadn't looked this good since we moved in. The pressure washing was thorough and they were careful around the garden beds.",
    service: "Pressure Washing",
  },
  {
    name: "Linda H.",
    location: "Richmond",
    stars: 5,
    text: "Window cleaning was impeccable — not a single streak. They did our second floor too which I always found difficult. Will definitely book again.",
    service: "Window Cleaning",
  },
];

const faqs = [
  {
    q: "Do I need to be home during the service?",
    a: "No. Most exterior services do not require you to be home. We only need access details and any special instructions.",
  },
  {
    q: "How long does a roof soft wash last?",
    a: "Usually 2–3 years depending on trees, shade, and moisture. Soft washing treats the root cause, not just the visible surface growth.",
  },
  {
    q: "Is soft washing safe for my roof?",
    a: "Yes. Soft washing is the safer alternative to high pressure for most roofing materials.",
  },
  {
    q: "Do you service strata buildings?",
    a: "Yes. We offer strata and maintenance plan options with repeat scheduling.",
  },
  {
    q: "What areas do you cover?",
    a: "We cover Vancouver and much of the Lower Mainland including Burnaby, Richmond, Surrey, Langley, Coquitlam, North Vancouver, Delta, and nearby areas.",
  },
];

function buildWhatsAppUrl(message) {
  return `https://wa.me/${PHONE_WHATSAPP}?text=${encodeURIComponent(message)}`;
}

function useInView(threshold = 0.15) {
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

function AnimSection({ children, className = "", delay = 0 }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
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
        background: "rgba(0,0,0,0.75)",
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
          maxWidth: 580,
          maxHeight: "90vh",
          overflowY: "auto",
          background: "#111",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "1.5rem",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            width: 38,
            height: 38,
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.08)",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 2,
          }}
        >
          <X size={16} />
        </button>
        {children}
      </div>
    </div>
  );
}

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

  const handle = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

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
      form.message ? `Message: ${form.message}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    setTimeout(() => {
      setStatus("success");
      window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
    }, 700);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div style={{ padding: "2rem" }}>
        {status === "success" ? (
          <div style={{ textAlign: "center", padding: "1rem 0" }}>
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: "999px",
                margin: "0 auto 1.25rem",
                background: "rgba(52,211,153,0.15)",
                border: "1px solid rgba(52,211,153,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Check size={28} style={{ color: "#34d399" }} />
            </div>
            <h3 style={{ color: "white", fontSize: "1.4rem", margin: "0 0 0.5rem" }}>
              Opening WhatsApp...
            </h3>
            <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "1.25rem" }}>
              Your quote details are ready to send to Keystoners.
            </p>
            <button
              onClick={onClose}
              style={{
                background: "#facc15",
                color: "#000",
                border: "none",
                borderRadius: "0.75rem",
                padding: "0.75rem 1.5rem",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <h3 style={{ color: "white", fontSize: "1.4rem", margin: "0 0 0.25rem" }}>
              Get your free quote
            </h3>
            <p style={{ color: "rgba(255,255,255,0.55)", marginBottom: "1.5rem" }}>
              Fill this once and it will open WhatsApp with your quote message.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              <input
                type="text"
                placeholder="Full Name *"
                value={form.name}
                onChange={(e) => handle("name", e.target.value)}
                style={fieldStyle}
              />
              <input
                type="tel"
                placeholder="Phone Number *"
                value={form.phone}
                onChange={(e) => handle("phone", e.target.value)}
                style={fieldStyle}
              />
              <input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => handle("email", e.target.value)}
                style={fieldStyle}
              />
              <select
                value={form.service}
                onChange={(e) => handle("service", e.target.value)}
                style={selectStyle(form.service)}
              >
                <option value="">Service Needed *</option>
                {services.map((s) => (
                  <option key={s.title} value={s.title}>
                    {s.title}
                  </option>
                ))}
                <option value="Multiple Services">Multiple Services</option>
              </select>
              <select
                value={form.city}
                onChange={(e) => handle("city", e.target.value)}
                style={selectStyle(form.city)}
              >
                <option value="">Select Your City *</option>
                {coverage.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
                <option value="Other">Other</option>
              </select>
              <textarea
                rows={4}
                placeholder="Anything else we should know?"
                value={form.message}
                onChange={(e) => handle("message", e.target.value)}
                style={{ ...fieldStyle, resize: "vertical" }}
              />
              <button
                onClick={submit}
                disabled={!valid || status === "loading"}
                style={{
                  background: valid ? "#facc15" : "rgba(255,255,255,0.1)",
                  color: valid ? "#000" : "rgba(255,255,255,0.3)",
                  border: "none",
                  borderRadius: "0.8rem",
                  padding: "0.9rem 1rem",
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
                    <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
                    Preparing...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send on WhatsApp
                  </>
                )}
              </button>
              {!valid && (
                <p style={{ margin: 0, fontSize: "0.82rem", color: "rgba(255,255,255,0.45)" }}>
                  <AlertCircle size={12} style={{ display: "inline", marginRight: 4 }} />
                  Fields marked * are required
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
      <div style={{ padding: "2rem" }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "0.9rem",
            background: "rgba(250,204,21,0.1)",
            border: "1px solid rgba(250,204,21,0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "1.25rem",
          }}
        >
          <Icon size={24} style={{ color: "#fbbf24" }} />
        </div>

        <h3 style={{ color: "white", fontSize: "1.5rem", margin: "0 0 0.6rem" }}>
          {service.title}
        </h3>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "1.1rem" }}>
          <span
            style={{
              background: "rgba(250,204,21,0.1)",
              color: "#fbbf24",
              borderRadius: "999px",
              padding: "0.35rem 0.85rem",
              fontSize: "0.85rem",
              fontWeight: 600,
            }}
          >
            {service.price}
          </span>
          <span
            style={{
              background: "rgba(255,255,255,0.07)",
              color: "rgba(255,255,255,0.7)",
              borderRadius: "999px",
              padding: "0.35rem 0.85rem",
              fontSize: "0.85rem",
            }}
          >
            <Clock3 size={12} style={{ display: "inline", marginRight: 4 }} />
            {service.duration}
          </span>
        </div>

        <p style={{ color: "rgba(255,255,255,0.72)", lineHeight: 1.7 }}>{service.desc}</p>
        <p style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          {service.detail}
        </p>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <button
            onClick={() => {
              onClose();
              onQuote(service.title);
            }}
            style={{
              background: "#facc15",
              color: "#000",
              border: "none",
              borderRadius: "0.8rem",
              padding: "0.8rem 1.4rem",
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <ArrowRight size={16} />
            Get a Quote
          </button>
          <a
            href={`tel:${PHONE_WHATSAPP}`}
            style={{
              background: "rgba(255,255,255,0.08)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "0.8rem",
              padding: "0.8rem 1.4rem",
              fontWeight: 600,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Phone size={16} />
            Call Now
          </a>
        </div>
      </div>
    </Modal>
  );
}

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        border: `1px solid ${open ? "rgba(250,204,21,0.25)" : "rgba(255,255,255,0.1)"}`,
        borderRadius: "1rem",
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          background: open ? "rgba(250,204,21,0.04)" : "rgba(255,255,255,0.03)",
          border: "none",
          padding: "1.2rem 1.3rem",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span style={{ fontWeight: 600, fontSize: "0.98rem" }}>{q}</span>
        <ChevronDown
          size={18}
          style={{
            color: "#fbbf24",
            flexShrink: 0,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        />
      </button>
      {open && (
        <div style={{ padding: "0 1.3rem 1.2rem", color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>
          {a}
        </div>
      )}
    </div>
  );
}

function ContactForm({ onQuote }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    city: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");

  const valid = form.name && form.phone && form.service && form.city;

  const handle = (key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const submit = (e) => {
    e.preventDefault();
    if (!valid) return;
    setStatus("loading");

    const msg = [
      "Hi Keystoners, I need a quote from the website contact form.",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.email ? `Email: ${form.email}` : null,
      `Service: ${form.service}`,
      `City: ${form.city}`,
      form.message ? `Message: ${form.message}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    setTimeout(() => {
      setStatus("success");
      window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
    }, 700);
  };

  return (
    <form
      onSubmit={submit}
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "1.5rem",
        padding: "1.4rem",
      }}
    >
      <div style={{ display: "grid", gap: "0.8rem" }}>
        <input
          type="text"
          placeholder="Full Name *"
          value={form.name}
          onChange={(e) => handle("name", e.target.value)}
          style={fieldStyle}
        />
        <input
          type="tel"
          placeholder="Phone Number *"
          value={form.phone}
          onChange={(e) => handle("phone", e.target.value)}
          style={fieldStyle}
        />
        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) => handle("email", e.target.value)}
          style={fieldStyle}
        />
        <select
          value={form.service}
          onChange={(e) => handle("service", e.target.value)}
          style={selectStyle(form.service)}
        >
          <option value="">Service Needed *</option>
          {services.map((s) => (
            <option key={s.title} value={s.title}>
              {s.title}
            </option>
          ))}
          <option value="Multiple Services">Multiple Services</option>
        </select>
        <select
          value={form.city}
          onChange={(e) => handle("city", e.target.value)}
          style={selectStyle(form.city)}
        >
          <option value="">Select Your City *</option>
          {coverage.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
          <option value="Other">Other</option>
        </select>
        <textarea
          rows={4}
          placeholder="Anything else we should know?"
          value={form.message}
          onChange={(e) => handle("message", e.target.value)}
          style={{ ...fieldStyle, resize: "vertical" }}
        />
      </div>

      <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem", flexWrap: "wrap" }}>
        <button
          type="submit"
          disabled={!valid || status === "loading"}
          style={{
            flex: "1 1 220px",
            background: valid ? "#facc15" : "rgba(255,255,255,0.1)",
            color: valid ? "#000" : "rgba(255,255,255,0.3)",
            border: "none",
            borderRadius: "0.85rem",
            padding: "0.9rem 1rem",
            fontWeight: 700,
            cursor: valid ? "pointer" : "not-allowed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          {status === "loading" ? (
            <>
              <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />
              Preparing...
            </>
          ) : (
            <>
              <Send size={16} />
              Send on WhatsApp
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => onQuote()}
          style={{
            flex: "1 1 180px",
            background: "rgba(255,255,255,0.08)",
            color: "white",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "0.85rem",
            padding: "0.9rem 1rem",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Open Quote Popup
        </button>
      </div>

      {!valid && (
        <p style={{ margin: "0.8rem 0 0", fontSize: "0.82rem", color: "rgba(255,255,255,0.45)" }}>
          <AlertCircle size={12} style={{ display: "inline", marginRight: 4 }} />
          Name, phone, service, and city are required
        </p>
      )}
    </form>
  );
}

const fieldStyle = {
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "0.8rem",
  padding: "0.85rem 1rem",
  color: "white",
  fontSize: "0.95rem",
  outline: "none",
  width: "100%",
};

const selectStyle = (hasValue) => ({
  background: "#1a1a1a",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: "0.8rem",
  padding: "0.85rem 1rem",
  color: hasValue ? "white" : "rgba(255,255,255,0.45)",
  fontSize: "0.95rem",
  outline: "none",
  width: "100%",
});

export default function HomePage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quotePrefill, setQuotePrefill] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
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

  const handleSearch = () => {
    if (!searchVal.trim()) return;
    const lower = searchVal.toLowerCase();
    const found = services.find(
      (s) =>
        s.title.toLowerCase().includes(lower) ||
        s.desc.toLowerCase().includes(lower) ||
        s.detail.toLowerCase().includes(lower)
    );
    if (found) openService(found);
    else openQuote(searchVal);
  };

  const checkArea = () => {
    const lower = areaSearch.toLowerCase().trim();
    if (!lower) return;
    const match = coverage.find((c) => c.toLowerCase().includes(lower));
    if (match) setAreaResult({ found: true, city: match });
    else setAreaResult({ found: false });
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
    <div
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        color: "white",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #0a0a0a; }
        a { color: inherit; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.35); }
        input:focus, textarea:focus, select:focus {
          border-color: rgba(250,204,21,0.4) !important;
          box-shadow: 0 0 0 3px rgba(250,204,21,0.08) !important;
        }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 999px; }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .nav-link:hover { color: white !important; }
        .card-hover {
          transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease;
        }
        .card-hover:hover {
          transform: translateY(-4px);
          border-color: rgba(250,204,21,0.28) !important;
          background: rgba(255,255,255,0.065) !important;
        }

        @media (max-width: 1100px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .hero-image-wrap {
            max-width: 720px;
            margin: 0 auto;
          }
          .floating-badge {
            display: none !important;
          }
        }

        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
          .menu-btn {
            display: flex !important;
          }
          .hero-stats-grid,
          .coverage-grid,
          .contact-grid,
          .why-grid {
            grid-template-columns: 1fr !important;
          }
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }

        @media (max-width: 640px) {
          .hero-top-actions,
          .hero-search-row,
          .cta-actions {
            flex-direction: column !important;
          }
          .hero-top-actions > *,
          .hero-search-row > *,
          .cta-actions > * {
            width: 100% !important;
          }
          .service-cities-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
          .stats-bar-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .phone-label-full {
            display: none !important;
          }
          .whatsapp-label {
            display: none !important;
          }
          #hero {
            min-height: auto !important;
            padding-bottom: 0 !important;
          }
          .hero-stats-wrap {
            position: static !important;
            margin-top: 1.25rem;
          }
        }
      `}</style>

      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(10,10,10,0.86)",
          backdropFilter: "blur(18px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 1rem",
            minHeight: 68,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <button
            onClick={() => scrollTo("hero")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "0.8rem",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(250,204,21,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 24px rgba(251,191,36,0.1)",
              }}
            >
              <Sparkles size={18} style={{ color: "#fbbf24" }} />
            </div>
            <div style={{ textAlign: "left" }}>
              <p style={{ margin: 0, fontWeight: 700, fontSize: "1rem" }}>Keystoners</p>
              <p style={{ margin: 0, color: "rgba(255,255,255,0.5)", fontSize: "0.76rem" }}>
                Exterior Cleaning
              </p>
            </div>
          </button>

          <nav className="desktop-nav" style={{ display: "flex", gap: "1.6rem", alignItems: "center" }}>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="nav-link"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "rgba(255,255,255,0.72)",
                  fontSize: "0.92rem",
                  fontWeight: 500,
                  padding: 0,
                }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div style={{ display: "flex", gap: "0.65rem", alignItems: "center" }}>
            <a
              href={`tel:${PHONE_WHATSAPP}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.45rem",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "0.8rem",
                padding: "0.58rem 0.9rem",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.9rem",
              }}
            >
              <Phone size={15} />
              <span className="phone-label-full">{PHONE_DISPLAY}</span>
              <span>Call</span>
            </a>

            <button
              onClick={() => openQuote()}
              style={{
                background: "#facc15",
                color: "#000",
                border: "none",
                borderRadius: "0.8rem",
                padding: "0.62rem 1rem",
                fontWeight: 800,
                cursor: "pointer",
                fontSize: "0.92rem",
              }}
            >
              Free Quote
            </button>

            <button
              className="menu-btn"
              onClick={() => setMobileOpen((v) => !v)}
              style={{
                display: "none",
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                height: 40,
                borderRadius: "0.75rem",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "white",
                cursor: "pointer",
              }}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div
            style={{
              background: "#111",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              padding: "0.75rem 1rem 1rem",
            }}
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  background: "none",
                  border: "none",
                  color: "rgba(255,255,255,0.82)",
                  fontSize: "1rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  padding: "0.8rem 0",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {link.label}
              </button>
            ))}

            <button
              onClick={() => {
                setMobileOpen(false);
                openQuote();
              }}
              style={{
                marginTop: "0.8rem",
                width: "100%",
                background: "#facc15",
                color: "#000",
                border: "none",
                borderRadius: "0.85rem",
                padding: "0.95rem 1rem",
                fontWeight: 800,
                cursor: "pointer",
              }}
            >
              Get Free Quote
            </button>
          </div>
        )}
      </header>

      <section
        id="hero"
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "92vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            background:
              "radial-gradient(ellipse 60% 50% at 10% 20%, rgba(212,175,55,0.12) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 85% 15%, rgba(59,130,246,0.09) 0%, transparent 55%), linear-gradient(180deg, #0a0a0a 0%, #111 50%, #0a0a0a 100%)",
          }}
        />

        <div
          className="hero-grid"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "4.5rem 1rem 2rem",
            display: "grid",
            gridTemplateColumns: "1.08fr 0.92fr",
            gap: "3rem",
            alignItems: "center",
            width: "100%",
            position: "relative",
            zIndex: 1,
          }}
        >
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "rgba(250,204,21,0.08)",
                border: "1px solid rgba(250,204,21,0.2)",
                borderRadius: "999px",
                padding: "0.45rem 0.95rem",
                marginBottom: "1.25rem",
                color: "#fde68a",
                fontSize: "0.84rem",
                fontWeight: 500,
              }}
            >
              <Star size={13} style={{ fill: "#fbbf24", color: "#fbbf24" }} />
              Trusted exterior cleaning across the Lower Mainland
            </div>

            <h1
              style={{
                fontSize: "clamp(2.2rem, 5vw, 4rem)",
                lineHeight: 1.08,
                margin: "0 0 1rem",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                maxWidth: 680,
              }}
            >
              Protect your home and
              <br />
              make it{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #fde68a, #fbbf24, #f59e0b)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                look spotless again
              </span>
            </h1>

            <p
              style={{
                maxWidth: 620,
                fontSize: "1.05rem",
                color: "rgba(255,255,255,0.65)",
                lineHeight: 1.75,
                marginBottom: "1.8rem",
              }}
            >
              Keystoners provides professional roof washing, gutter cleaning, house washing,
              pressure washing, and window cleaning across Vancouver and the Lower Mainland.
              Fast quotes. Reliable crews. Results you actually notice.
            </p>

            <div className="hero-top-actions" style={{ display: "flex", gap: "0.85rem", marginBottom: "2rem" }}>
              <button
                onClick={() => openQuote()}
                style={{
                  background: "#facc15",
                  color: "#000",
                  border: "none",
                  borderRadius: "0.9rem",
                  padding: "0.95rem 1.45rem",
                  fontWeight: 800,
                  fontSize: "1rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.45rem",
                }}
              >
                Get My Free Quote
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => scrollTo("services")}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  color: "white",
                  border: "1px solid rgba(255,255,255,0.14)",
                  borderRadius: "0.9rem",
                  padding: "0.95rem 1.45rem",
                  fontWeight: 600,
                  fontSize: "1rem",
                  cursor: "pointer",
                }}
              >
                View Services
              </button>
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "1.25rem",
                padding: "1rem",
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="hero-search-row" style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem" }}>
                <input
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="What service do you need? (roof moss, gutters, driveway...)"
                  style={{
                    flex: 1,
                    background: "rgba(0,0,0,0.3)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "0.8rem",
                    padding: "0.85rem 1rem",
                    color: "white",
                    fontSize: "0.92rem",
                    outline: "none",
                  }}
                />
                <button
                  onClick={handleSearch}
                  style={{
                    minWidth: 130,
                    background: "white",
                    color: "#000",
                    border: "none",
                    borderRadius: "0.8rem",
                    padding: "0.85rem 1rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    fontSize: "0.92rem",
                  }}
                >
                  Search
                </button>
              </div>

              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {["Free Quote", "Gutter Cleaning", "Roof Wash", "Pressure Washing"].map((item) => (
                  <button
                    key={item}
                    onClick={() => (item === "Free Quote" ? openQuote() : openQuote(item))}
                    style={{
                      background: "rgba(0,0,0,0.25)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "999px",
                      padding: "0.45rem 0.8rem",
                      color: "rgba(255,255,255,0.72)",
                      fontSize: "0.82rem",
                      cursor: "pointer",
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="hero-image-wrap" style={{ position: "relative" }}>
            <div
              style={{
                borderRadius: "2rem",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.04)",
                padding: "0.75rem",
                boxShadow: "0 36px 100px rgba(0,0,0,0.45)",
              }}
            >
              <div style={{ position: "relative", borderRadius: "1.5rem", overflow: "hidden", aspectRatio: "4 / 5" }}>
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
                  alt="Clean home exterior"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.62) 0%, transparent 50%)",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    left: "1rem",
                    right: "1rem",
                    bottom: "1rem",
                    background: "rgba(10,10,10,0.82)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    backdropFilter: "blur(16px)",
                    borderRadius: "1.2rem",
                    padding: "1.2rem",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", marginBottom: "0.8rem" }}>
                    <div>
                      <p style={{ margin: 0, fontSize: "0.8rem", color: "rgba(255,255,255,0.55)", marginBottom: "0.25rem" }}>
                        Most popular combo
                      </p>
                      <p style={{ margin: 0, fontSize: "1rem", fontWeight: 700 }}>
                        Roof Wash + Gutter Clean
                      </p>
                    </div>
                    <span
                      style={{
                        background: "#facc15",
                        color: "#000",
                        borderRadius: "0.55rem",
                        padding: "0.25rem 0.75rem",
                        fontSize: "0.8rem",
                        fontWeight: 800,
                        whiteSpace: "nowrap",
                        height: "fit-content",
                      }}
                    >
                      Popular
                    </span>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                    {["Protects roof & drainage", "Helps prevent costly buildup"].map((text) => (
                      <div
                        key={text}
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          borderRadius: "0.75rem",
                          padding: "0.7rem 0.75rem",
                          fontSize: "0.8rem",
                          color: "rgba(255,255,255,0.72)",
                        }}
                      >
                        {text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div
              className="floating-badge"
              style={{
                position: "absolute",
                top: "2rem",
                left: "-4rem",
                background: "rgba(20,20,20,0.9)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "1rem",
                padding: "0.85rem 1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.7rem",
                boxShadow: "0 12px 32px rgba(0,0,0,0.35)",
              }}
            >
              <div
                style={{
                  background: "rgba(52,211,153,0.15)",
                  borderRadius: "0.65rem",
                  padding: "0.5rem",
                }}
              >
                <Clock3 size={18} style={{ color: "#34d399" }} />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: "0.78rem", color: "rgba(255,255,255,0.55)" }}>
                  Average response time
                </p>
                <p style={{ margin: 0, fontSize: "0.92rem", fontWeight: 700 }}>
                  Same day · 24 hrs
                </p>
              </div>
            </div>
          </div>
        </div>

        <div
          className="hero-stats-wrap"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background: "rgba(0,0,0,0.4)",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div
            className="stats-bar-grid"
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              padding: "1rem",
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1rem",
            }}
          >
            {stats.map((stat) => (
              <div key={stat.label} style={{ textAlign: "center" }}>
                <p style={{ margin: 0, fontSize: "1.4rem", fontWeight: 800, color: "#fbbf24" }}>
                  {stat.value}
                </p>
                <p style={{ margin: 0, fontSize: "0.82rem", color: "rgba(255,255,255,0.55)" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" style={{ maxWidth: 1280, margin: "0 auto", padding: "5rem 1rem" }}>
        <AnimSection>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "1rem", flexWrap: "wrap", marginBottom: "2.4rem" }}>
            <div>
              <p style={{ margin: "0 0 0.5rem", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "#fbbf24" }}>
                Core Services
              </p>
              <h2 style={{ margin: 0, fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, letterSpacing: "-0.02em" }}>
                Exterior cleaning homeowners actually need
              </h2>
            </div>
            <p style={{ margin: 0, maxWidth: 420, color: "rgba(255,255,255,0.58)", lineHeight: 1.7 }}>
              Click any service to see what’s included, starting pricing, and how to book.
            </p>
          </div>
        </AnimSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <AnimSection key={service.title} delay={i * 60}>
                <div
                  className="card-hover"
                  onClick={() => openService(service)}
                  style={{
                    height: "100%",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "1.45rem",
                    padding: "1.5rem",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: "0.85rem",
                      background: "rgba(0,0,0,0.3)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "1.1rem",
                    }}
                  >
                    <Icon size={22} style={{ color: "#fbbf24" }} />
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", gap: "0.75rem", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                    <h3 style={{ margin: 0, fontSize: "1.12rem", fontWeight: 700 }}>{service.title}</h3>
                    <span
                      style={{
                        background: "rgba(250,204,21,0.08)",
                        color: "#fbbf24",
                        borderRadius: "999px",
                        padding: "0.25rem 0.65rem",
                        fontSize: "0.78rem",
                        fontWeight: 700,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {service.price}
                    </span>
                  </div>

                  <p style={{ margin: "0 0 1.2rem", color: "rgba(255,255,255,0.62)", lineHeight: 1.7, fontSize: "0.92rem" }}>
                    {service.desc}
                  </p>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#fbbf24", fontWeight: 700, fontSize: "0.9rem" }}>
                    Learn more <ChevronRight size={15} />
                  </div>
                </div>
              </AnimSection>
            );
          })}
        </div>
      </section>

      <section
        id="why-us"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          background: "rgba(255,255,255,0.02)",
        }}
      >
        <div
          className="why-grid"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "5rem 1rem",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "3rem",
            alignItems: "center",
          }}
        >
          <AnimSection>
            <p style={{ margin: "0 0 0.6rem", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "#fbbf24" }}>
              Why Keystoners
            </p>
            <h2 style={{ margin: "0 0 1rem", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, lineHeight: 1.18, letterSpacing: "-0.02em" }}>
              Professional service. Clear process. Better curb appeal.
            </h2>
            <p style={{ margin: "0 0 1.6rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, maxWidth: 480 }}>
              We keep the experience simple: clear pricing direction, fast responses, clean work, and easy booking through call or WhatsApp.
            </p>

            <div className="cta-actions" style={{ display: "flex", gap: "0.75rem" }}>
              <button
                onClick={() => openQuote()}
                style={{
                  background: "#facc15",
                  color: "#000",
                  border: "none",
                  borderRadius: "0.85rem",
                  padding: "0.85rem 1.4rem",
                  fontWeight: 800,
                  cursor: "pointer",
                }}
              >
                Get Free Quote
              </button>
              <a
                href={`tel:${PHONE_WHATSAPP}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  background: "rgba(255,255,255,0.06)",
                  color: "white",
                  textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "0.85rem",
                  padding: "0.85rem 1.2rem",
                  fontWeight: 700,
                }}
              >
                <Phone size={15} />
                Call Us
              </a>
            </div>
          </AnimSection>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
            {[
              { icon: CheckCircle2, text: "Free quote — no pressure" },
              { icon: Clock3, text: "Same-day response time" },
              { icon: ShieldCheck, text: "Safe methods for exterior surfaces" },
              { icon: Star, text: "Top-rated customer service" },
              { icon: MapPin, text: "Local Lower Mainland coverage" },
              { icon: CheckCircle2, text: "Simple WhatsApp booking flow" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <AnimSection key={item.text} delay={i * 60}>
                  <div
                    style={{
                      display: "flex",
                      gap: "0.75rem",
                      background: "rgba(0,0,0,0.25)",
                      border: "1px solid rgba(255,255,255,0.09)",
                      borderRadius: "1rem",
                      padding: "1rem",
                    }}
                  >
                    <Icon size={18} style={{ color: "#fbbf24", flexShrink: 0, marginTop: 2 }} />
                    <p style={{ margin: 0, color: "rgba(255,255,255,0.8)", lineHeight: 1.5, fontSize: "0.9rem" }}>
                      {item.text}
                    </p>
                  </div>
                </AnimSection>
              );
            })}
          </div>
        </div>
      </section>

      <section id="coverage" style={{ maxWidth: 1280, margin: "0 auto", padding: "5rem 1rem" }}>
        <AnimSection>
          <div className="coverage-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem" }}>
            <div
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "1.4rem",
                padding: "1.5rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.8rem", marginBottom: "1.4rem" }}>
                <div
                  style={{
                    background: "rgba(250,204,21,0.1)",
                    borderRadius: "0.75rem",
                    padding: "0.65rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MapPin size={20} style={{ color: "#fbbf24" }} />
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>Service Area</p>
                  <h3 style={{ margin: 0, fontWeight: 700, fontSize: "1.2rem" }}>Vancouver & Lower Mainland</h3>
                </div>
              </div>

              <div className="service-cities-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem", marginBottom: "1rem" }}>
                {coverage.map((city) => (
                  <div
                    key={city}
                    onClick={() => {
                      setAreaSearch(city);
                      setAreaResult({ found: true, city });
                    }}
                    style={{
                      background: "rgba(0,0,0,0.25)",
                      border: "1px solid rgba(255,255,255,0.09)",
                      borderRadius: "0.7rem",
                      padding: "0.65rem 0.75rem",
                      fontSize: "0.83rem",
                      color: "rgba(255,255,255,0.75)",
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                  >
                    {city}
                  </div>
                ))}
              </div>

              <div className="hero-search-row" style={{ display: "flex", gap: "0.65rem" }}>
                <input
                  value={areaSearch}
                  onChange={(e) => {
                    setAreaSearch(e.target.value);
                    setAreaResult(null);
                  }}
                  onKeyDown={(e) => e.key === "Enter" && checkArea()}
                  placeholder="Check your city..."
                  style={{
                    flex: 1,
                    background: "rgba(0,0,0,0.3)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "0.8rem",
                    padding: "0.8rem 1rem",
                    color: "white",
                    outline: "none",
                  }}
                />
                <button
                  onClick={checkArea}
                  style={{
                    background: "white",
                    color: "#000",
                    border: "none",
                    borderRadius: "0.8rem",
                    padding: "0.8rem 1rem",
                    fontWeight: 800,
                    cursor: "pointer",
                  }}
                >
                  Check Area
                </button>
              </div>

              {areaResult && (
                <div
                  style={{
                    marginTop: "0.8rem",
                    borderRadius: "0.8rem",
                    padding: "0.8rem 1rem",
                    background: areaResult.found ? "rgba(52,211,153,0.08)" : "rgba(239,68,68,0.08)",
                    border: `1px solid ${
                      areaResult.found ? "rgba(52,211,153,0.2)" : "rgba(239,68,68,0.2)"
                    }`,
                    color: areaResult.found ? "#34d399" : "#f87171",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontSize: "0.9rem",
                  }}
                >
                  {areaResult.found ? <Check size={15} /> : <AlertCircle size={15} />}
                  {areaResult.found
                    ? `Great news — we service ${areaResult.city}.`
                    : "We might still cover your area. Message us on WhatsApp to confirm."}
                </div>
              )}
            </div>

            <div
              id="reviews"
              style={{
                background: "rgba(250,204,21,0.04)",
                border: "1px solid rgba(250,204,21,0.12)",
                borderRadius: "1.4rem",
                padding: "1.5rem",
              }}
            >
              <p style={{ margin: "0 0 0.5rem", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "#fbbf24" }}>
                Customer Reviews
              </p>
              <h3 style={{ margin: "0 0 1rem", fontWeight: 700, fontSize: "1.2rem" }}>
                Why homeowners choose Keystoners
              </h3>

              <div style={{ display: "grid", gap: "0.85rem" }}>
                {reviews.slice(0, 3).map((r, i) => (
                  <div
                    key={i}
                    style={{
                      background: "rgba(0,0,0,0.25)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "1rem",
                      padding: "1rem",
                    }}
                  >
                    <div style={{ display: "flex", gap: "2px", marginBottom: "0.5rem" }}>
                      {Array.from({ length: r.stars }).map((_, idx) => (
                        <Star key={idx} size={13} style={{ color: "#fbbf24", fill: "#fbbf24" }} />
                      ))}
                    </div>
                    <p style={{ margin: "0 0 0.7rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.65, fontSize: "0.9rem" }}>
                      "{r.text}"
                    </p>
                    <p style={{ margin: 0, fontSize: "0.85rem", fontWeight: 700 }}>
                      {r.name} <span style={{ fontWeight: 400, color: "rgba(255,255,255,0.48)" }}>— {r.location}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </AnimSection>
      </section>

      <section
        style={{
          background: "rgba(255,255,255,0.02)",
          borderTop: "1px solid rgba(255,255,255,0.07)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "5rem 1rem" }}>
          <AnimSection>
            <div style={{ textAlign: "center", marginBottom: "2.4rem" }}>
              <p style={{ margin: "0 0 0.5rem", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "#fbbf24" }}>
                All Reviews
              </p>
              <h2 style={{ margin: "0 0 0.75rem", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.02em" }}>
                What our customers are saying
              </h2>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.3rem", flexWrap: "wrap" }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={17} style={{ color: "#fbbf24", fill: "#fbbf24" }} />
                ))}
                <span style={{ color: "rgba(255,255,255,0.6)", marginLeft: "0.35rem" }}>
                  5.0 average experience
                </span>
              </div>
            </div>
          </AnimSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
            {reviews.map((review, i) => (
              <AnimSection key={i} delay={i * 60}>
                <div
                  style={{
                    height: "100%",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    borderRadius: "1.2rem",
                    padding: "1.4rem",
                  }}
                >
                  <div style={{ display: "flex", gap: "2px", marginBottom: "0.7rem" }}>
                    {Array.from({ length: review.stars }).map((_, idx) => (
                      <Star key={idx} size={14} style={{ color: "#fbbf24", fill: "#fbbf24" }} />
                    ))}
                  </div>
                  <p style={{ margin: "0 0 0.95rem", color: "rgba(255,255,255,0.75)", lineHeight: 1.65, fontSize: "0.94rem" }}>
                    "{review.text}"
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: "0.88rem" }}>
                      {review.name}{" "}
                      <span style={{ fontWeight: 400, color: "rgba(255,255,255,0.45)" }}>— {review.location}</span>
                    </p>
                    <span
                      style={{
                        background: "rgba(250,204,21,0.08)",
                        color: "#fbbf24",
                        borderRadius: "999px",
                        padding: "0.2rem 0.6rem",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                      }}
                    >
                      {review.service}
                    </span>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" style={{ maxWidth: 820, margin: "0 auto", padding: "5rem 1rem" }}>
        <AnimSection>
          <div style={{ textAlign: "center", marginBottom: "2.2rem" }}>
            <p style={{ margin: "0 0 0.5rem", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "#fbbf24" }}>
              FAQ
            </p>
            <h2 style={{ margin: 0, fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 800 }}>
              Common questions
            </h2>
          </div>
        </AnimSection>

        <div style={{ display: "grid", gap: "0.75rem" }}>
          {faqs.map((faq, i) => (
            <AnimSection key={i} delay={i * 50}>
              <FAQItem q={faq.q} a={faq.a} />
            </AnimSection>
          ))}
        </div>
      </section>

      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1rem 5rem" }}>
        <AnimSection>
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(250,204,21,0.1) 0%, rgba(251,191,36,0.04) 60%, rgba(255,255,255,0.03) 100%)",
              border: "1px solid rgba(250,204,21,0.2)",
              borderRadius: "1.8rem",
              padding: "2rem",
              display: "flex",
              justifyContent: "space-between",
              gap: "1rem",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h2 style={{ margin: "0 0 0.5rem", fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 800 }}>
                Ready to clean up your property?
              </h2>
              <p style={{ margin: 0, color: "rgba(255,255,255,0.6)" }}>
                Get a free quote in under 24 hours. No pressure.
              </p>
            </div>

            <div className="cta-actions" style={{ display: "flex", gap: "0.75rem" }}>
              <button
                onClick={() => openQuote()}
                style={{
                  background: "#facc15",
                  color: "#000",
                  border: "none",
                  borderRadius: "0.85rem",
                  padding: "0.9rem 1.4rem",
                  fontWeight: 800,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.45rem",
                }}
              >
                Get Free Quote
                <ArrowRight size={16} />
              </button>

              <a
                href={`tel:${PHONE_WHATSAPP}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.45rem",
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  borderRadius: "0.85rem",
                  padding: "0.9rem 1.2rem",
                  textDecoration: "none",
                  fontWeight: 700,
                }}
              >
                <Phone size={16} />
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </AnimSection>
      </section>

      <section
        id="contact"
        style={{
          background: "rgba(255,255,255,0.02)",
          borderTop: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "5rem 1rem" }}>
          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", alignItems: "start" }}>
            <AnimSection>
              <p style={{ margin: "0 0 0.6rem", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "#fbbf24" }}>
                Contact Us
              </p>
              <h2 style={{ margin: "0 0 1rem", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", fontWeight: 800, lineHeight: 1.18 }}>
                Request your free quote
              </h2>
              <p style={{ margin: "0 0 1.8rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, maxWidth: 420 }}>
                Fill the form and it will open WhatsApp with your full quote details ready to send.
              </p>

              <div style={{ display: "grid", gap: "1rem" }}>
                {[
                  { icon: Phone, label: "Phone", value: PHONE_DISPLAY, href: `tel:${PHONE_WHATSAPP}` },
                  { icon: Clock3, label: "Response Time", value: "Same day to 24 hours" },
                  { icon: MapPin, label: "Coverage", value: "Vancouver & Lower Mainland" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} style={{ display: "flex", gap: "0.8rem", alignItems: "center" }}>
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: "0.75rem",
                          background: "rgba(250,204,21,0.08)",
                          border: "1px solid rgba(250,204,21,0.16)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={18} style={{ color: "#fbbf24" }} />
                      </div>
                      <div>
                        <p
                          style={{
                            margin: 0,
                            fontSize: "0.78rem",
                            color: "rgba(255,255,255,0.45)",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                          }}
                        >
                          {item.label}
                        </p>
                        {item.href ? (
                          <a
                            href={item.href}
                            style={{ color: "white", fontWeight: 700, textDecoration: "none", fontSize: "0.95rem" }}
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p style={{ margin: 0, fontWeight: 700, fontSize: "0.95rem" }}>{item.value}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </AnimSection>

            <AnimSection delay={80}>
              <ContactForm onQuote={openQuote} />
            </AnimSection>
          </div>
        </div>
      </section>

      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.07)", background: "#080808" }}>
        <div
          className="footer-grid"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "3rem 1rem 2rem",
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
            gap: "2rem",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "0.65rem",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(250,204,21,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Sparkles size={16} style={{ color: "#fbbf24" }} />
              </div>
              <span style={{ fontWeight: 800 }}>Keystoners</span>
            </div>

            <p style={{ margin: "0 0 1rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: 260 }}>
              Professional exterior cleaning across Vancouver and the Lower Mainland.
            </p>

            <a
              href={`tel:${PHONE_WHATSAPP}`}
              style={{ color: "#fbbf24", fontWeight: 800, textDecoration: "none", fontSize: "0.92rem" }}
            >
              {PHONE_DISPLAY}
            </a>
          </div>

          <div>
            <p style={{ margin: "0 0 0.8rem", fontWeight: 800, fontSize: "0.9rem", color: "rgba(255,255,255,0.85)" }}>
              Services
            </p>
            {services.map((service) => (
              <button
                key={service.title}
                onClick={() => openService(service)}
                style={{
                  display: "block",
                  background: "none",
                  border: "none",
                  padding: "0.3rem 0",
                  color: "rgba(255,255,255,0.52)",
                  cursor: "pointer",
                  fontSize: "0.88rem",
                  textAlign: "left",
                }}
              >
                {service.title}
              </button>
            ))}
          </div>

          <div>
            <p style={{ margin: "0 0 0.8rem", fontWeight: 800, fontSize: "0.9rem", color: "rgba(255,255,255,0.85)" }}>
              Company
            </p>
            {[
              ["Why Us", "why-us"],
              ["Reviews", "reviews"],
              ["FAQ", "faq"],
              ["Contact", "contact"],
            ].map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                style={{
                  display: "block",
                  background: "none",
                  border: "none",
                  padding: "0.3rem 0",
                  color: "rgba(255,255,255,0.52)",
                  cursor: "pointer",
                  fontSize: "0.88rem",
                  textAlign: "left",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <div>
            <p style={{ margin: "0 0 0.8rem", fontWeight: 800, fontSize: "0.9rem", color: "rgba(255,255,255,0.85)" }}>
              Areas
            </p>
            {coverage.slice(0, 6).map((city) => (
              <p key={city} style={{ margin: "0.3rem 0", color: "rgba(255,255,255,0.52)", fontSize: "0.88rem" }}>
                {city}
              </p>
            ))}
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            maxWidth: 1280,
            margin: "0 auto",
            padding: "1.2rem 1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "0.75rem",
            flexWrap: "wrap",
          }}
        >
          <p style={{ margin: 0, fontSize: "0.8rem", color: "rgba(255,255,255,0.35)" }}>
            © 2025 Keystoners Exterior Cleaning. All rights reserved.
          </p>

          <button
            onClick={() => openQuote()}
            style={{
              background: "#facc15",
              color: "#000",
              border: "none",
              borderRadius: "0.7rem",
              padding: "0.6rem 1.1rem",
              fontWeight: 800,
              cursor: "pointer",
              fontSize: "0.86rem",
            }}
          >
            Get Free Quote
          </button>
        </div>
      </footer>

      <a
        href={buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        style={{
          position: "fixed",
          right: 18,
          bottom: 18,
          zIndex: 999,
          display: "flex",
          alignItems: "center",
          gap: "0.6rem",
          background: "#25D366",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "999px",
          padding: "0.9rem 1rem",
          fontWeight: 800,
          boxShadow: "0 12px 30px rgba(37,211,102,0.35)",
          border: "1px solid rgba(255,255,255,0.18)",
        }}
      >
        <MessageCircle size={20} />
        <span className="whatsapp-label">WhatsApp Us</span>
      </a>

      <QuoteModal open={quoteOpen} onClose={() => setQuoteOpen(false)} prefill={quotePrefill} />
      <ServiceModal
        service={selectedService}
        open={serviceOpen}
        onClose={() => setServiceOpen(false)}
        onQuote={openQuote}
      />
    </div>
  );
}
