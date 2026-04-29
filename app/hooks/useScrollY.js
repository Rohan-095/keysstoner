import { useEffect, useState } from "react";

export default function useScrollY() {
  const [y, setY] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ticking = false;

    const update = () => {
      const nextY = window.scrollY || 0;
      setY(prev => (prev === nextY ? prev : nextY));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return y;
}
