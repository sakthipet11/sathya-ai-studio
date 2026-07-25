import { SectionHeader } from "./About";
import { Award, BookOpen, Quote } from "lucide-react";

export function EmptyStates() {
  return (
    <section id="signals" className="relative py-24 md:py-32 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="Signals"
          title="Certificates, writing & references."
          description="These surfaces are intentionally empty until verified sources are in place — no invented posts, quotes or credentials."
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          <PlaceholderCard
            icon={Award}
            title="Certificates"
            body="IBM Sterling OMS, cloud and AI credentials will be listed here with issuer and verification link once uploaded."
          />
          <PlaceholderCard
            icon={BookOpen}
            title="Writing"
            body="Engineering notes on micro-frontends, OMS design and AI product patterns — coming as posts are published."
          />
          <PlaceholderCard
            icon={Quote}
            title="Testimonials"
            body="References from managers, peers and clients are available on request — no quotes are fabricated for this site."
          />
        </div>
      </div>
    </section>
  );
}

function PlaceholderCard({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof Award;
  title: string;
  body: string;
}) {
  return (
    <div className="glass rounded-2xl p-6 relative overflow-hidden">
      <div className="absolute -right-8 -top-8 size-32 rounded-full bg-primary/10 blur-3xl" />
      <Icon className="size-5 text-primary" />
      <h3 className="mt-4 font-display text-lg font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
      <div className="mt-4 inline-flex items-center rounded-full border border-dashed border-white/15 px-2.5 py-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
        details coming with verified sources
      </div>
    </div>
  );
}
