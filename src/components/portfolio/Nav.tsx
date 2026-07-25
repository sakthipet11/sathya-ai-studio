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
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => { if (entry.isIntersecting) setActive(`#${entry.target.id}`); }),
      { rootMargin: "-30% 0px -60% 0px" },
    );
    LINKS.forEach((link) => { const element = document.querySelector(link.href); if (element) observer.observe(element); });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 py-2 md:py-3">
      <div className="mx-auto max-w-6xl px-4">
        <nav className="glass-strong flex items-center justify-between rounded-2xl px-3 py-2 shadow-lg shadow-black/20 md:rounded-full md:px-4">
          <a href="#top" className="group flex min-w-0 items-center gap-2 font-display text-sm font-semibold">
            <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-md shadow-primary/30 transition-transform duration-300 group-hover:scale-105">S</span>
            <span className="truncate text-gradient">Sathyanantham V.</span>
          </a>
          <ul className="hidden lg:flex items-center gap-1 text-sm">
            {LINKS.map((link) => <li key={link.href}><a href={link.href} className={cn("rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground", active === link.href && "bg-white/5 text-foreground")}>{link.label}</a></li>)}
          </ul>
          <a href="#contact" className="hidden lg:inline-flex items-center rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground shadow-md shadow-primary/25 transition hover:shadow-primary/40">Let's talk</a>
          <button aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)} className="lg:hidden inline-flex size-9 shrink-0 items-center justify-center rounded-full glass">{open ? <X className="size-4" /> : <Menu className="size-4" />}</button>
        </nav>
        {open && <div className="mt-2 rounded-2xl glass-strong p-2 lg:hidden">{LINKS.map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-2.5 text-sm text-muted-foreground transition hover:bg-white/5 hover:text-foreground">{link.label}</a>)}</div>}
      </div>
    </header>
  );
}
