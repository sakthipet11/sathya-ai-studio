import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const LINKS = [
  { to: "/", hash: "about", label: "About" },
  { to: "/", hash: "skills", label: "Skills" },
  { to: "/", hash: "experience", label: "Experience" },
  { to: "/", hash: "projects", label: "Projects" },
  { to: "/", hash: "contact", label: "Contact" },
  { to: "/chatbots", hash: undefined, label: "AI Studio" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    if (!isHome) {
      setActiveHash("");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveHash(entry.target.id);
        }),
      { rootMargin: "-30% 0px -60% 0px" },
    );

    LINKS.forEach((link) => {
      if (link.hash) {
        const element = document.getElementById(link.hash);
        if (element) observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [isHome]);

  const isLinkActive = (link: (typeof LINKS)[number]) => {
    if (link.to === "/chatbots") {
      return location.pathname === "/chatbots";
    }
    return isHome && activeHash === link.hash;
  };

  return (
    <header className="sticky top-0 z-50 py-2 md:py-3">
      <div className="mx-auto max-w-6xl px-4">
        <nav className="glass-strong flex items-center justify-between rounded-2xl px-3 py-2 shadow-lg shadow-black/20 md:rounded-full md:px-4">
          <Link
            to="/"
            hash={isHome ? "top" : undefined}
            className="group flex min-w-0 items-center gap-2 font-display text-sm font-semibold"
          >
            <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-md shadow-primary/30 transition-transform duration-300 group-hover:scale-105">
              S
            </span>
            <span className="truncate text-gradient">Sathyanantham V.</span>
          </Link>
          <ul className="hidden lg:flex items-center gap-1 text-sm">
            {LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.to}
                  hash={link.hash}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground",
                    isLinkActive(link) && "bg-white/5 text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/"
            hash="contact"
            className="hidden lg:inline-flex items-center rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground shadow-md shadow-primary/25 transition hover:shadow-primary/40 hover:-translate-y-0.5"
          >
            Let's talk
          </Link>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="lg:hidden inline-flex size-9 shrink-0 items-center justify-center rounded-full glass"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </nav>
        {open && (
          <div className="mt-2 rounded-2xl glass-strong p-2 lg:hidden space-y-1">
            {LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                hash={link.hash}
                onClick={() => setOpen(false)}
                className={cn(
                  "block rounded-xl px-4 py-2.5 text-sm text-muted-foreground transition hover:bg-white/5 hover:text-foreground",
                  isLinkActive(link) && "bg-white/5 text-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
