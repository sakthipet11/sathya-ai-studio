import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    LINKS.forEach((l) => {
      const el = document.querySelector(l.href);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div className="mx-auto max-w-6xl px-4">
        <nav
          className={cn(
            "flex items-center justify-between rounded-full px-4 py-2.5 transition-all",
            scrolled ? "glass-strong shadow-lg shadow-black/20" : "bg-transparent",
          )}
        >
          <a href="#top" className="group flex items-center gap-2 font-display text-sm font-semibold">
            <span className="inline-flex size-7 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-md shadow-primary/30 transition-transform group-hover:scale-105">
              S
            </span>
            <span className="hidden sm:inline text-gradient">Sathyanantham V.</span>
          </a>

          <ul className="hidden md:flex items-center gap-1 text-sm">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground",
                    active === l.href && "text-foreground bg-white/5",
                  )}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="hidden md:inline-flex items-center rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground shadow-md shadow-primary/25 transition hover:shadow-primary/40"
          >
            Let's talk
          </a>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex size-9 items-center justify-center rounded-full glass"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </nav>

        {open && (
          <div className="md:hidden mt-2 rounded-2xl glass-strong p-2">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5"
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
