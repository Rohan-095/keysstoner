import Reveal from "./ui/Reveal";
import T from "../data/tokens";

const stats = [
  { v:"24hr", l:"Quote response"    },
  { v:"5★",   l:"Top-rated service" },
  { v:"500+", l:"Homes cleaned"     },
  { v:"100%", l:"Satisfaction focus"},
];

export default function StatsStrip() {
  return (
    <div style={{ background:"rgba(0,0,0,0.35)", borderTop:"1px solid rgba(255,255,255,0.08)", position:"relative", zIndex:5 }}>
      <div className="stats-grid" style={{ maxWidth:1300, margin:"0 auto", padding:"1.1rem 1.5rem", display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1rem" }}>
        {stats.map((s, i) => (
          <Reveal key={s.l} delay={i * 80} from="bottom" distance={16}>
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
