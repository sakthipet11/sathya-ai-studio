import { SectionHeader } from "./About";
import { Award, Trophy } from "lucide-react";
import { AWARDS, CERTIFICATIONS } from "@/lib/portfolio-data";

export function EmptyStates() {
  return (
    <section id="signals" className="relative py-16 md:py-20 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader eyebrow="Recognition" title="Continual learning, recognized delivery." description="Selected certifications and recognition from the resume." />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <SignalCard icon={Award} title="Certifications" items={CERTIFICATIONS} />
          <SignalCard icon={Trophy} title="Awards & recognition" items={AWARDS} />
        </div>
      </div>
    </section>
  );
}

function SignalCard({ icon: Icon, title, items }: { icon: typeof Award; title: string; items: readonly string[] }) {
  return <div className="glass rounded-2xl p-6 relative overflow-hidden"><div className="absolute -right-8 -top-8 size-32 rounded-full bg-primary/10 blur-3xl" /><Icon className="size-5 text-primary" /><h3 className="mt-4 font-display text-lg font-semibold">{title}</h3><ul className="mt-4 space-y-3 text-sm text-muted-foreground">{items.map((item) => <li key={item} className="flex gap-2"><span className="mt-2 size-1 shrink-0 rounded-full bg-primary" />{item}</li>)}</ul></div>;
}
