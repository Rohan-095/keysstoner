import { useEffect, useRef, useState } from "react";

export default function useInView(threshold = 0.1, once = true) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); if (once) obs.disconnect(); }
      else if (!once) setVis(false);
    }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, [threshold, once]);
  return [ref, vis];
}
