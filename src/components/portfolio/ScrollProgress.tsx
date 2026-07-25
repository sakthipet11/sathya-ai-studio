import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
      setProgress(scrolled * 100);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      aria-hidden
      className="fixed left-0 top-0 z-[60] h-[2px] w-full bg-transparent"
    >
      <div
        className="h-full bg-gradient-to-r from-primary via-accent to-primary transition-[width] duration-150"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
