import T from "../data/tokens";
import marqueeItems from "../data/marqueeItems";

export default function Marquee() {
  return (
    <div style={{ background:"rgba(230,168,23,0.07)", borderTop:"1px solid rgba(230,168,23,0.14)", borderBottom:"1px solid rgba(230,168,23,0.14)", padding:"0.88rem 0", overflow:"hidden" }}>
      <div style={{ display:"flex", width:"max-content", animation:"marquee 30s linear infinite" }}>
        {marqueeItems.map((item, i) => (
          <span key={i} style={{ color:T.gold, fontSize:"0.82rem", fontWeight:700, whiteSpace:"nowrap", padding:"0 2rem", letterSpacing:"0.09em" }}>{item}</span>
        ))}
      </div>
    </div>
  );
}
