import { useEffect, useState } from "react";

export function AuroraBackground() {
  const [cursor, setCursor] = useState({ x: 50, y: 30 });
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() =>
        setCursor({
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100,
        }),
      );
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 aurora-bg animate-aurora" />
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div
        className="absolute inset-0 transition-[background] duration-300"
        style={{
          background: `radial-gradient(600px circle at ${cursor.x}% ${cursor.y}%, color-mix(in oklab, var(--primary) 12%, transparent), transparent 60%)`,
        }}
      />
      <div className="noise-overlay" />
    </div>
  );
}
