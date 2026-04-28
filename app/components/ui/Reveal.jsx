'use client';
import useInView from "../../hooks/useInView";

export default function Reveal({ children, delay = 0, className = "", from = "bottom", distance = 32 }) {
  const [ref, vis] = useInView();
  const origins = {
    bottom: `translateY(${distance}px)`,
    top:    `translateY(-${distance}px)`,
    left:   `translateX(-${distance}px)`,
    right:  `translateX(${distance}px)`,
    scale:  `scale(0.93)`,
    none:   `none`,
  };
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "none" : origins[from],
      transition: `opacity .72s cubic-bezier(.22,.68,0,1.15) ${delay}ms, transform .72s cubic-bezier(.22,.68,0,1.15) ${delay}ms`,
      willChange: "opacity, transform",
    }}>
      {children}
    </div>
  );
}
