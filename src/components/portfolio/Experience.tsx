import { TIMELINE } from "@/lib/portfolio-data";
import { SectionHeader } from "./About";

export function Experience() {
  return (
    <section id="experience" className="relative py-24 md:py-32 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="Experience"
          title="Engineering leadership & platform capability."
          description="A capability-oriented view of my work. Specific employers, dates and metrics are intentionally omitted here and shared privately on request."
        />

        <ol className="mt-12 relative border-l border-white/10 pl-6 md:pl-8 space-y-8">
          {TIMELINE.map((t, i) => (
            <li key={t.title} className="relative">
              <span
                aria-hidden
                className="absolute -left-[33px] md:-left-[41px] top-1.5 grid size-4 place-items-center"
              >
                <span className="size-4 rounded-full bg-gradient-to-br from-primary to-accent shadow-[0_0_18px] shadow-primary/50" />
              </span>
              <div className="glass rounded-2xl p-5 md:p-6 transition-transform hover:-translate-y-0.5">
                <div className="text-[11px] uppercase tracking-widest text-primary">
                  Capability {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-1 font-display text-xl font-semibold">{t.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{t.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
