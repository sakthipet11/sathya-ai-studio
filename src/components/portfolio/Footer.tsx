export function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-10 mt-10">
      <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
        <div>© {new Date().getFullYear()} Sathyanantham V. Crafted with care.</div>
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-primary shadow-[0_0_8px] shadow-primary" />
          Built as a production-ready portfolio scaffold.
        </div>
      </div>
    </footer>
  );
}
