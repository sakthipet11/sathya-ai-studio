import { ArrowRight, Download, FileText, Mail, Sparkles } from "lucide-react";
import { PROFILE } from "@/lib/portfolio-data";
import { ThreeDProfile } from "./ThreeDProfile";

export function Hero() {
  return (
    <section id="top" className="relative pt-24 pb-12 md:pt-32 md:pb-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-muted-foreground">
              <Sparkles className="size-3 text-primary" /> Available for senior engineering & AI
              roles
            </div>
            <h1 className="mt-5 font-display text-[2.25rem] font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="text-gradient">Sathyanantham V.</span>
            </h1>
            <div className="mt-4 font-mono text-sm text-foreground/85 sm:text-base md:text-lg">
              Lead Software Engineer <span className="text-primary">/</span> Frontend Architect
            </div>
            <p className="mx-auto mt-4 max-w-2xl text-[0.95rem] leading-relaxed text-muted-foreground sm:text-base md:text-lg lg:mx-0">
              {PROFILE.tagline}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <button
                onClick={() =>
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })
                }
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground btn-glow transition hover:-translate-y-0.5"
              >
                View Projects{" "}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <button
                onClick={() =>
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-medium transition hover:bg-white/5"
              >
                <Mail className="size-4" /> Contact
              </button>
              <a
                href={PROFILE.resumeUrl}
                download
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-muted-foreground transition hover:border-primary/50 hover:text-foreground"
              >
                <Download className="size-4" /> Download Resume
              </a>
              <a
                href={PROFILE.coverLetterUrl}
                download
                className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
              >
                <FileText className="size-4" /> Cover letter
              </a>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
              {["React & Next.js", "IBM Sterling OMS", "Micro Frontends", "Applied AI"].map(
                (item) => (
                  <div
                    key={item}
                    className="glass rounded-xl px-3 py-2.5 text-xs text-muted-foreground"
                  >
                    {item}
                  </div>
                ),
              )}
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[17rem] sm:max-w-sm">
            <div
              aria-hidden
              className="absolute -inset-5 rounded-[2.5rem] bg-primary/15 blur-3xl"
            />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-card/70 shadow-2xl shadow-primary/10 animate-hero-float aspect-[4/5] w-full flex items-center justify-center p-2">
              <ThreeDProfile />
              <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/10 bg-background/75 px-4 py-3 backdrop-blur-md">
                <div className="text-[10px] uppercase tracking-[0.18em] text-primary">
                  Enterprise engineering
                </div>
                <div className="mt-1 text-sm font-medium">
                  Scalable platforms, order management, and applied AI.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
