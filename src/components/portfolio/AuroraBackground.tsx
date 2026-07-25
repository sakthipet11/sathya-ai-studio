import { AIParticlesBackground } from "./AIParticlesBackground";

export function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 aurora-bg animate-aurora" />
      <AIParticlesBackground />
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(600px_circle_at_75%_15%,color-mix(in_oklab,var(--primary)_9%,transparent),transparent_65%)]" />
      <div className="noise-overlay" />
    </div>
  );
}
