import { useState } from "react";
import { SKILLS } from "@/lib/portfolio-data";
import { SectionHeader } from "./About";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "./ScrollReveal";

const LEVEL_WIDTH = { Core: "w-full", Strong: "w-4/5", Working: "w-3/5" } as const;
const LEVEL_LABEL = { Core: "Core specialism", Strong: "Strong", Working: "Working" } as const;

export function Skills() {
  const [active, setActive] = useState(SKILLS[0].category);
  const current = SKILLS.find((s) => s.category === active)!;

  return (
    <section id="skills" className="relative py-16 md:py-20 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Skills"
            title="A stack tuned for platforms & AI."
            description="Grouped by discipline. Confidence indicators are qualitative — no fabricated years or scores."
          />
        </ScrollReveal>

        <div className="mt-10 grid gap-6 md:grid-cols-[240px_1fr]">
          <ScrollReveal direction="left" delay={0.15} className="min-w-0">
            <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-none">

              {SKILLS.map((s) => (
                <button
                  key={s.category}
                  onClick={() => setActive(s.category)}
                  className={cn(
                    "shrink-0 rounded-xl px-4 py-2.5 text-left text-sm transition-all",
                    active === s.category
                      ? "glass-strong text-foreground shadow-md shadow-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5",
                  )}
                >
                  {s.category}
                </button>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.2} className="min-w-0">
            <div className="glass rounded-2xl p-6 md:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                {current.items.map((it, idx) => (
                  <ScrollReveal
                    key={it.name}
                    delay={0.25 + idx * 0.05}
                    direction="up"
                    distance={15}
                  >
                    <div className="group">
                      <div className="flex items-baseline justify-between">
                        <div className="font-medium">{it.name}</div>
                        <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                          {LEVEL_LABEL[it.level]}
                        </div>
                      </div>
                      <div className="mt-2 h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div
                          className={cn(
                            "h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-700",
                            LEVEL_WIDTH[it.level],
                          )}
                        />
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
