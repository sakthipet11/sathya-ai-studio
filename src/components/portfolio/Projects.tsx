import { useRef, useState } from "react";
import { PROJECTS } from "@/lib/portfolio-data";
import { SectionHeader } from "./About";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

function ArchitectureViz({ slug }: { slug: string }) {
  // Small inline SVG diagram, varies by slug
  return (
    <svg
      viewBox="0 0 320 120"
      className="w-full h-24 opacity-80"
      aria-hidden
    >
      <defs>
        <linearGradient id={`g-${slug}`} x1="0" x2="1">
          <stop offset="0" stopColor="oklch(0.78 0.14 225)" />
          <stop offset="1" stopColor="oklch(0.62 0.20 300)" />
        </linearGradient>
      </defs>
      {[30, 110, 190, 270].map((x, i) => (
        <g key={x}>
          <rect
            x={x}
            y="40"
            width="60"
            height="40"
            rx="10"
            fill="none"
            stroke={`url(#g-${slug})`}
            strokeWidth="1.2"
          />
          <circle cx={x + 30} cy="60" r="3" fill={`url(#g-${slug})`}>
            <animate
              attributeName="opacity"
              values="0.3;1;0.3"
              dur="2s"
              begin={`${i * 0.3}s`}
              repeatCount="indefinite"
            />
          </circle>
          {i < 3 && (
            <line
              x1={x + 60}
              y1="60"
              x2={x + 80}
              y2="60"
              stroke={`url(#g-${slug})`}
              strokeWidth="1"
              strokeDasharray="2 3"
            />
          )}
        </g>
      ))}
    </svg>
  );
}

function ProjectCard({
  p,
  featured,
}: {
  p: (typeof PROJECTS)[number];
  featured?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const b = ref.current!.getBoundingClientRect();
    const px = (e.clientX - b.left) / b.width - 0.5;
    const py = (e.clientY - b.top) / b.height - 0.5;
    setTilt({ x: -py * 4, y: px * 4 });
  };

  return (
    <article
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{ transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      className={cn(
        "tilt-card tilt-card-hover group relative overflow-hidden rounded-3xl glass p-6 md:p-7",
        featured && "md:col-span-2",
      )}
    >
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full glass px-2 py-0.5 text-[10px] uppercase tracking-widest text-primary">
            <Sparkles className="size-2.5" /> {p.category} · Concept
          </div>
          <h3 className="mt-3 font-display text-xl md:text-2xl font-semibold">{p.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
          }}
          aria-disabled="true"
          title="Live link available once real deployment is added"
          className="rounded-full glass p-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowUpRight className="size-4" />
        </button>
      </div>

      {featured && (
        <div className="mt-5 rounded-xl border border-white/5 bg-black/20 p-3">
          <ArchitectureViz slug={p.slug} />
        </div>
      )}

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Challenge</div>
          <p className="mt-1 text-sm leading-relaxed">{p.problem}</p>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Approach</div>
          <p className="mt-1 text-sm leading-relaxed">{p.solution}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {p.stack.map((s) => (
          <span
            key={s}
            className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-muted-foreground"
          >
            {s}
          </span>
        ))}
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative py-24 md:py-32 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="Projects"
          title="Portfolio solution concepts."
          description="Case-study framings of the systems I design and build. Client-specific details, live URLs and metrics will replace these placeholders as verified sources are added."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.slug} p={p} featured={p.featured} />
          ))}
        </div>
      </div>
    </section>
  );
}
