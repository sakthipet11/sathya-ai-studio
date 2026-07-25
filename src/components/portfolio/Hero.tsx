import { useEffect, useRef, useState } from "react";
import { ArrowRight, Download, Mail, Sparkles } from "lucide-react";
import { PROFILE } from "@/lib/portfolio-data";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

function useTypewriter(words: readonly string[], speed = 65, pause = 1500) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setText(words[i]);
      const t = setTimeout(() => setI((x) => (x + 1) % words.length), 2600);
      return () => clearTimeout(t);
    }
    const current = words[i];
    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && text === "") {
      setDeleting(false);
      setI((x) => (x + 1) % words.length);
      return;
    }
    const t = setTimeout(
      () => {
        setText((prev) =>
          deleting ? current.slice(0, prev.length - 1) : current.slice(0, prev.length + 1),
        );
      },
      deleting ? 32 : speed,
    );
    return () => clearTimeout(t);
  }, [text, deleting, i, words, speed, pause]);

  return text;
}

function MagneticButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { children: React.ReactNode }) {
  const ref = useRef<HTMLButtonElement>(null);
  return (
    <button
      ref={ref}
      onMouseMove={(e) => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const b = ref.current!.getBoundingClientRect();
        const x = e.clientX - b.left - b.width / 2;
        const y = e.clientY - b.top - b.height / 2;
        ref.current!.style.transform = `translate(${x * 0.15}px, ${y * 0.2}px)`;
      }}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.transform = "";
      }}
      className={cn("transition-transform duration-200", className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function Hero() {
  const role = useTypewriter(PROFILE.roles);
  return (
    <section id="top" className="relative pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-muted-foreground animate-float-slow">
            <Sparkles className="size-3 text-primary" />
            Available for senior engineering & AI roles
          </div>

          <h1 className="mt-6 font-display text-5xl sm:text-6xl md:text-7xl font-semibold leading-[1.02] tracking-tight">
            <span className="text-gradient">Sathyanantham V.</span>
          </h1>

          <div
            className="mt-5 h-8 md:h-9 font-mono text-base md:text-lg text-muted-foreground"
            aria-live="polite"
          >
            <span className="text-foreground/90">{role}</span>
            <span className="ml-0.5 inline-block w-[2px] bg-primary align-middle animate-blink" style={{ height: "1em" }} />
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
            {PROFILE.tagline}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <MagneticButton
              onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground btn-glow"
            >
              View Projects
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </MagneticButton>

            <MagneticButton
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-medium hover:bg-white/5"
            >
              <Mail className="size-4" /> Contact
            </MagneticButton>

            <MagneticButton
              onClick={() =>
                toast("Resume coming soon", {
                  description:
                    "Upload the PDF to /public/resume.pdf and this button will download it. See README > Assets checklist.",
                })
              }
              aria-disabled="true"
              className="inline-flex items-center gap-2 rounded-full border border-dashed border-white/15 px-5 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <Download className="size-4" /> Download Resume
              <span className="ml-1 rounded-full bg-white/5 px-1.5 py-0.5 text-[10px] uppercase tracking-wider">
                pending
              </span>
            </MagneticButton>
          </div>

          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            {["React & Next.js", "IBM Sterling OMS", "Micro Frontends", "AI Assistants"].map((k) => (
              <div key={k} className="glass rounded-xl px-3 py-2.5 text-xs text-muted-foreground">
                {k}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
