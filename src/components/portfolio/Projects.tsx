import { PROJECTS } from "@/lib/portfolio-data";
import { SectionHeader } from "./About";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const ARCHITECTURE_FLOWS: Record<string, readonly string[]> = {
  "claude-skills": ["Engineering input", "Reusable Skills", "Docs, code & tests", "Team delivery"],
  "ibm-ai-chatbot": ["Call center context", "AI assistant", "OMS workflows", "Guided response"],
  "micro-frontends": ["Product teams", "Shared platform", "Module Federation", "Unified experience"],
};

function ArchitectureViz({ slug }: { slug: string }) {
  const flow = ARCHITECTURE_FLOWS[slug] ?? ["Input", "Platform", "Integration", "Outcome"];
  return (
    <div className="py-1" aria-label={`Architecture flow: ${flow.join(", then ")}`}>
      <div className="mb-3 text-[10px] font-medium uppercase tracking-[0.16em] text-primary/80">Delivery flow</div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:items-center">
        {flow.map((label, index) => (
          <div key={label} className="relative">
            <div className="flex min-h-14 items-center justify-center rounded-xl border border-primary/25 bg-primary/[0.06] px-3 text-center text-xs font-medium text-foreground/90">{label}</div>
            {index < flow.length - 1 && <ArrowRight aria-hidden className="absolute -right-3 top-1/2 z-10 hidden size-4 -translate-y-1/2 text-primary sm:block" />}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ p, featured }: { p: (typeof PROJECTS)[number]; featured?: boolean }) {
  return (
    <article className={cn("group relative overflow-hidden rounded-3xl glass p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 md:p-7", featured && "md:col-span-2")}>
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="inline-flex items-center gap-1.5 rounded-full glass px-2 py-0.5 text-[10px] uppercase tracking-widest text-primary"><Sparkles className="size-2.5" /> {p.category} initiative</div>
      <h3 className="mt-3 font-display text-xl font-semibold md:text-2xl">{p.name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
      {featured && <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 md:px-5"><ArchitectureViz slug={p.slug} /></div>}
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div><div className="text-[10px] uppercase tracking-widest text-muted-foreground">Context</div><p className="mt-1 text-sm leading-relaxed">{p.problem}</p></div>
        <div><div className="text-[10px] uppercase tracking-widest text-muted-foreground">Contribution</div><p className="mt-1 text-sm leading-relaxed">{p.solution}</p></div>
      </div>
      <div className="mt-5 flex flex-wrap gap-1.5">{p.stack.map((skill) => <span key={skill} className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[11px] text-muted-foreground">{skill}</span>)}</div>
    </article>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative py-16 md:py-20 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader eyebrow="Projects" title="Selected enterprise initiatives." description="A concise view of verified initiatives. Client-specific implementation details remain confidential." />
        <div className="mt-10 grid gap-5 md:grid-cols-2">{PROJECTS.map((project) => <ProjectCard key={project.slug} p={project} featured={project.featured} />)}</div>
      </div>
    </section>
  );
}
