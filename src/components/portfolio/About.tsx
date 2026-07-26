import { PROFILE } from "@/lib/portfolio-data";
import { Users, Layers, Cpu, Building2 } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const HIGHLIGHTS = [
  { icon: Users, label: "Leads a team of 8 engineers" },
  { icon: Layers, label: "15+ enterprise modules" },
  { icon: Cpu, label: "AI-enabled engineering workflows" },
  { icon: Building2, label: "Retail, Banking & Life Sciences" },
];

export function About() {
  return (
    <section id="about" className="relative py-16 md:py-20 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4">
        <ScrollReveal>
          <SectionHeader eyebrow="About" title="Engineer, mentor, systems thinker." />
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <div className="mt-10 grid gap-8 md:grid-cols-5">
            <div className="md:col-span-3 space-y-5 text-[0.95rem] sm:text-base md:text-lg leading-relaxed text-muted-foreground">
              <p>{PROFILE.summary}</p>
              <p>
                I care about the seam between craft and system - the details of a component, and the
                architecture that lets a hundred of them ship without friction. I gravitate toward
                problems where product, platform and AI overlap: order flows, AI-enabled support
                tools, schema-driven interfaces, and developer productivity accelerators.
              </p>
            </div>

            <div className="md:col-span-2 grid grid-cols-2 gap-3">
              {HIGHLIGHTS.map((h, i) => (
                <ScrollReveal key={h.label} delay={0.35 + i * 0.08} direction="up" distance={15}>
                  <div className="glass rounded-2xl p-4 h-full">
                    <h.icon className="size-4 text-primary" />
                    <div className="mt-3 text-sm text-foreground/90">{h.label}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      <div className="inline-flex items-center gap-2 rounded-full glass px-2.5 py-1 text-[11px] uppercase tracking-widest text-primary">
        <span className="size-1.5 rounded-full bg-primary shadow-[0_0_10px] shadow-primary" />
        {eyebrow}
      </div>
      <h2 className="mt-4 font-display text-[1.75rem] sm:text-3xl md:text-4xl font-semibold tracking-tight text-gradient">
        {title}
      </h2>
      {description && <p className="mt-3 text-muted-foreground">{description}</p>}
    </div>
  );
}
