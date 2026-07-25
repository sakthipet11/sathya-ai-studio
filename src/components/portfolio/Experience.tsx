import { EXPERIENCE } from "@/lib/portfolio-data";
import { SectionHeader } from "./About";
import { ScrollReveal } from "./ScrollReveal";

export function Experience() {
  return (
    <section id="experience" className="relative py-16 md:py-20 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Experience"
            title="13+ years shipping enterprise software."
            description="A progression through commerce, order-management, banking, healthcare and life-sciences platforms."
          />
        </ScrollReveal>

        <ol className="mt-12 relative border-l border-white/10 pl-6 md:pl-8 space-y-8">
          {EXPERIENCE.map((item, index) => (
            <li key={`${item.company}-${item.role}`} className="relative">
              <ScrollReveal delay={0.15 + index * 0.1} direction="up" distance={20}>
                <span
                  aria-hidden
                  className="absolute -left-[33px] md:-left-[41px] top-1.5 grid size-4 place-items-center"
                >
                  <span className="size-4 rounded-full bg-gradient-to-br from-primary to-accent shadow-[0_0_18px] shadow-primary/50" />
                </span>
                <div className="glass rounded-2xl p-5 md:p-6 transition-transform hover:-translate-y-0.5">
                  <div className="text-[11px] uppercase tracking-widest text-primary">
                    {item.company}
                  </div>
                  <h3 className="mt-1 font-display text-xl font-semibold">{item.role}</h3>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground leading-relaxed">
                    {item.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-2">
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
