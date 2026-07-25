import { PROFILE } from "@/lib/portfolio-data";
import { Users, Layers, Cpu, Building2 } from "lucide-react";

const HIGHLIGHTS = [
  { icon: Users, label: "Mentors 6+ engineers" },
  { icon: Layers, label: "Micro-frontend architecture" },
  { icon: Cpu, label: "AI-assisted platforms" },
  { icon: Building2, label: "Retail · Life Sciences · Food Service" },
];

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader eyebrow="About" title="Engineer, mentor, systems thinker." />

        <div className="mt-12 grid gap-10 md:grid-cols-5">
          <div className="md:col-span-3 space-y-5 text-base md:text-lg leading-relaxed text-muted-foreground">
            <p>{PROFILE.summary}</p>
            <p>
              I care about the seam between craft and system — the details of a component, and the
              architecture that lets a hundred of them ship without friction. I gravitate toward
              problems where product, platform and AI overlap: order flows, agent-assist tools,
              schema-driven interfaces, and internal copilots.
            </p>
          </div>

          <div className="md:col-span-2 grid grid-cols-2 gap-3">
            {HIGHLIGHTS.map((h) => (
              <div key={h.label} className="glass rounded-2xl p-4">
                <h.icon className="size-4 text-primary" />
                <div className="mt-3 text-sm text-foreground/90">{h.label}</div>
              </div>
            ))}
          </div>
        </div>
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
      <h2 className="mt-4 font-display text-3xl md:text-4xl font-semibold tracking-tight text-gradient">
        {title}
      </h2>
      {description && <p className="mt-3 text-muted-foreground">{description}</p>}
    </div>
  );
}
