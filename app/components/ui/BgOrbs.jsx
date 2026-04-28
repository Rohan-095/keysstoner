export default function BgOrbs({ gold = false }) {
  return (
    <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none", zIndex:0 }}>
      <div style={{ position:"absolute", width:700, height:700, borderRadius:"50%", background:gold?"radial-gradient(circle,rgba(230,168,23,0.06) 0%,transparent 68%)":"radial-gradient(circle,rgba(42,74,130,0.42) 0%,transparent 68%)", top:"-20%", right:"-12%", animation:"orbFloat 14s ease-in-out infinite" }}/>
      <div style={{ position:"absolute", width:500, height:500, borderRadius:"50%", background:gold?"radial-gradient(circle,rgba(230,168,23,0.04) 0%,transparent 68%)":"radial-gradient(circle,rgba(24,52,95,0.5) 0%,transparent 68%)", bottom:"-15%", left:"-8%", animation:"orbFloat 18s ease-in-out infinite reverse" }}/>
      <div style={{ position:"absolute", width:350, height:350, borderRadius:"50%", background:"radial-gradient(circle,rgba(42,74,130,0.28) 0%,transparent 68%)", top:"45%", left:"28%", animation:"orbFloat 11s ease-in-out infinite 2s" }}/>
    </div>
  );
}
