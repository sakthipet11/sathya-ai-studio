import { PROFILE } from "@/lib/portfolio-data";

export function Footer() {
  return <footer className="relative border-t border-white/5 py-8"><div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground"><div>© {new Date().getFullYear()} Sathyanantham V.</div><div className="flex items-center gap-4"><a href={PROFILE.resumeUrl} download className="hover:text-foreground">Resume</a><a href={PROFILE.linkedIn} target="_blank" rel="noreferrer" className="hover:text-foreground">LinkedIn</a><a href={`mailto:${PROFILE.email}`} className="hover:text-foreground">Email</a></div></div></footer>;
}
