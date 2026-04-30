'use client';
import { ArrowRight } from "lucide-react";
import Reveal from "./ui/Reveal";
import GlowBtn from "./ui/GlowBtn";
import T from "../data/tokens";

const sections = [
  {
    id:    "roof-cleaning-detail",
    label: "Roof Cleaning",
    heading: ["Professional", "Roof", "Cleaning"],
    highlight: 1,
    desc: "Our soft-wash system safely removes moss, algae, lichen and black streaks without damaging shingles. Biodegradable solutions kill growth at the root for long-lasting results on asphalt, cedar, metal and tile roofs across the Lower Mainland.",
    image: "/roof-cleaning.jpg",
    service: "Roof Soft Wash",
  },
  {
    id:    "pressure-washing-detail",
    label: "Pressure Washing",
    heading: ["High-Power", "Pressure", "Washing"],
    highlight: 1,
    desc: "Restore driveways, patios, walkways and hard surfaces to a like-new finish. Our pressure washing service cuts through years of built-up dirt, oil stains and grime on concrete, brick and pavers — fast and thorough.",
    image: "/floor.jpg",
    service: "Pressure Washing",
  },
  {
    id:    "house-washing-detail",
    label: "House Washing",
    heading: ["Complete", "House", "Washing"],
    highlight: 1,
    desc: "Gentle soft-wash cleaning for all exterior siding — vinyl, Hardie board, stucco and painted surfaces. We safely remove dirt, mildew and algae from siding, trim, soffits and fascia for a thorough, full-home result.",
    image: "/image-1.jpg",
    service: "House Washing",
  },
  {
    id:    "window-cleaning-detail",
    label: "Window Cleaning",
    heading: ["Crystal-Clear", "Window", "Cleaning"],
    highlight: 1,
    desc: "Pure-water fed-pole system delivers spotless, streak-free exterior windows up to 3 storeys — no ladders, no smears. Includes frames, sills and screens for a complete finish that refreshes your whole property.",
    image: "/window-cleaning.jpg",
    service: "Window Cleaning",
  },
];

export default function ServiceSections({ openQuote }) {
  return (
    <div id="featured-services">
      {sections.map((sec, i) => {
        const imageLeft = i % 2 === 0;
        const bg = i % 2 === 0 ? T.navyDeep : T.navyMid;

        return (
          <section key={sec.id} id={sec.id} style={{ background:bg, padding:"6rem 1.5rem", position:"relative", overflow:"hidden" }}>
            {/* Subtle orb decoration */}
            <div style={{ position:"absolute", width:480, height:480, borderRadius:"50%", background:`radial-gradient(circle,rgba(42,74,130,0.22) 0%,transparent 70%)`, top:"-15%", [imageLeft ? "right" : "left"]:"-8%", pointerEvents:"none" }}/>

            <div style={{ maxWidth:1200, margin:"0 auto", position:"relative", zIndex:1 }}>
              <div
                className="two-col"
                style={{
                  display:"grid",
                  gridTemplateColumns:"1fr 1fr",
                  gap:"4.5rem",
                  alignItems:"center",
                  direction: imageLeft ? "ltr" : "rtl",
                }}
              >
                {/* Image side */}
                <Reveal from={imageLeft ? "left" : "right"}>
                  <div style={{ direction:"ltr", borderRadius:"1.8rem", overflow:"hidden", aspectRatio:"4/3", boxShadow:"0 32px 80px rgba(0,0,0,0.45)", border:"1px solid rgba(255,255,255,0.07)" }}>
                    <img
                      src={sec.image}
                      alt={sec.label}
                      style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform .55s cubic-bezier(.22,.68,0,1.2)" }}
                      onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = ""; }}
                    />
                  </div>
                </Reveal>

                {/* Text side */}
                <Reveal from={imageLeft ? "right" : "left"} delay={80}>
                  <div style={{ direction:"ltr" }}>
                    <div style={{ display:"inline-flex", alignItems:"center", gap:"0.5rem", background:"rgba(230,168,23,0.1)", border:"1px solid rgba(230,168,23,0.28)", borderRadius:"999px", padding:"0.38rem 0.95rem", marginBottom:"1.3rem" }}>
                      <span style={{ color:T.goldLight, fontSize:"0.78rem", fontWeight:700, letterSpacing:"0.06em" }}>{sec.label.toUpperCase()}</span>
                    </div>

                    <h2 style={{ margin:"0 0 1.2rem", fontFamily:"'Bricolage Grotesque',sans-serif", fontWeight:800, fontSize:"clamp(2rem,3.5vw,3rem)", lineHeight:1.06, letterSpacing:"-0.032em", color:"#fff" }}>
                      {sec.heading.map((word, wi) => (
                        <span key={wi} style={{ display:"block" }}>
                          {wi === sec.highlight
                            ? <span style={{ background:T.gradGold, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>{word}</span>
                            : word}
                        </span>
                      ))}
                    </h2>

                    <p style={{ margin:"0 0 2.1rem", color:T.navyMuted, lineHeight:1.82, fontSize:"1rem", maxWidth:440 }}>
                      {sec.desc}
                    </p>

                    <div style={{ display:"flex", gap:"0.85rem", flexWrap:"wrap" }}>
                      <GlowBtn gold onClick={() => openQuote(sec.service)}>
                        Get a Free Quote <ArrowRight size={15}/>
                      </GlowBtn>
                      <GlowBtn ghost onClick={() => openQuote(sec.service)}>
                        Learn More
                      </GlowBtn>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
