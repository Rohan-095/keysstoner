'use client';

import { useState } from "react";
import T from "./data/tokens";
import useScrollY from "./hooks/useScrollY";

import Navbar          from "./components/Navbar";
import HeroSlider      from "./components/HeroSlider";
import StatsStrip      from "./components/StatsStrip";
import Marquee         from "./components/Marquee";
import Services        from "./components/Services";
import Results         from "./components/Results";
import WhyUs           from "./components/WhyUs";
import Coverage        from "./components/Coverage";
import Reviews         from "./components/Reviews";
import FAQ             from "./components/FAQ";
import CTABanner        from "./components/CTABanner";
import InstantEstimate from "./components/InstantEstimate";
import ContactSection  from "./components/ContactSection";
import Footer          from "./components/Footer";
import FloatingButtons  from "./components/FloatingButtons";
import ChatWidget       from "./components/ChatWidget";
import ServiceSections  from "./components/ServiceSections";
import QuoteModal       from "./components/QuoteModal";
import ServiceModal     from "./components/ServiceModal";

export default function HomePage() {
  const [quoteOpen,    setQuoteOpen]    = useState(false);
  const [quotePrefill, setQuotePrefill] = useState("");
  const [selSvc,       setSelSvc]       = useState(null);
  const [svcOpen,      setSvcOpen]      = useState(false);
  const scrollY = useScrollY();
  const stickyIn = scrollY > 520;

  const openQuote   = (pre = "") => { setQuotePrefill(pre); setQuoteOpen(true); };
  const openService = (s)         => { setSelSvc(s); setSvcOpen(true); };

  return (
    <div style={{ minHeight:"100svh", background:T.navyDeep, color:"#fff", fontFamily:"'DM Sans',system-ui,sans-serif" }}>

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
        @keyframes pulseGold  { 0%,100%{box-shadow:0 8px 32px rgba(230,168,23,0.5);}50%{box-shadow:0 8px 32px rgba(230,168,23,0.5),0 0 0 12px rgba(230,168,23,0);} }
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
          .cta-row>*{width:100% !important;justify-content:center !important;}
          .hero-ctas{flex-direction:column !important;align-items:flex-start !important;gap:0.55rem !important;margin-bottom:1rem !important;max-width:220px !important;}
          .hero-ctas>*{width:220px !important;max-width:220px !important;min-width:220px !important;justify-content:center !important;padding:0.68rem 0.9rem !important;font-size:0.82rem !important;border-radius:0.72rem !important;}
          .hero-proof{display:grid !important;grid-template-columns:1fr 1fr !important;gap:0.5rem 0.9rem !important;max-width:220px !important;margin-top:0.2rem !important;}
          .hero-proof>*{font-size:0.76rem !important;line-height:1.2 !important;}
          .hero-badges{top:auto !important;bottom:120px !important;right:0.7rem !important;left:auto !important;transform:none !important;gap:0.45rem !important;width:145px !important;}
          .hero-badges>div{min-width:145px !important;width:145px !important;padding:0.54rem 0.58rem !important;border-radius:0.82rem !important;}
          .hero-badges>div p:first-child{font-size:0.58rem !important;letter-spacing:0.06em !important;}
          .hero-badges>div p:last-child{font-size:0.72rem !important;line-height:1.12 !important;}
          .hero-controls{bottom:14px !important;gap:0.65rem !important;}
          .hero-controls button{width:34px !important;height:34px !important;}
          .hero-sub{max-width:calc(100% - 170px) !important;}
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
          .hero-ctas{max-width:205px !important;gap:0.48rem !important;}
          .hero-ctas>*{width:205px !important;max-width:205px !important;min-width:205px !important;padding:0.64rem 0.8rem !important;font-size:0.79rem !important;border-radius:0.68rem !important;}
          .hero-proof{max-width:205px !important;gap:0.45rem 0.8rem !important;}
          .hero-proof>*{font-size:0.72rem !important;}
          .hero-badges{right:0.55rem !important;bottom:118px !important;width:132px !important;gap:0.4rem !important;}
          .hero-badges>div{min-width:132px !important;width:132px !important;padding:0.48rem 0.52rem !important;border-radius:0.76rem !important;}
          .hero-badges>div p:first-child{font-size:0.54rem !important;}
          .hero-badges>div p:last-child{font-size:0.68rem !important;line-height:1.08 !important;}
          .hero-controls{bottom:12px !important;}
          .hero-controls button{width:32px !important;height:32px !important;}
          .hero-badges{display:none !important;}
          .hero-sub{max-width:100% !important;}
        }

        @media(max-width:480px){
          .hero-title{font-size:2.2rem !important;letter-spacing:-0.03em !important;}
          .footer-grid{grid-template-columns:1fr !important;}
          .result-img{height:210px !important;}
        }
      `}</style>

      <Navbar openQuote={openQuote}/>

      <section id="hero">
        <HeroSlider openQuote={openQuote}/>
        <div style={{ background:`linear-gradient(145deg,#060f22,#0d1c3f,#18345f)` }}>
          <StatsStrip/>
        </div>
      </section>

      <Marquee/>
      <Services openQuote={openQuote} onOpenService={openService}/>
      <ServiceSections openQuote={openQuote}/>
      <Results openQuote={openQuote}/>
      <WhyUs openQuote={openQuote}/>
      <Coverage/>
      <Reviews/>
      <FAQ openQuote={openQuote}/>
      <CTABanner openQuote={openQuote}/>
      <InstantEstimate openQuote={openQuote}/>
      <ContactSection/>
      <Footer openQuote={openQuote} openService={openService}/>
      {/* Spacer so the sticky bar never covers the footer copyright */}
      <div style={{ height: stickyIn ? 76 : 0, transition:"height .48s cubic-bezier(.22,.68,0,1.2)", background:"rgba(3,8,20,0.99)" }}/>

      <FloatingButtons stickyIn={stickyIn} openQuote={openQuote}/>
      <ChatWidget stickyIn={stickyIn}/>

      <QuoteModal   key={`${quoteOpen}-${quotePrefill}`} open={quoteOpen} onClose={() => setQuoteOpen(false)} prefill={quotePrefill}/>
      <ServiceModal service={selSvc} open={svcOpen}  onClose={() => setSvcOpen(false)} onQuote={openQuote}/>
    </div>
  );
}
