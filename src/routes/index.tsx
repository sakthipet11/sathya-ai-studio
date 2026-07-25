import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { Toaster } from "sonner";
import { AuroraBackground } from "@/components/portfolio/AuroraBackground";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Experience } from "@/components/portfolio/Experience";
import { Projects } from "@/components/portfolio/Projects";
import { EmptyStates } from "@/components/portfolio/EmptyStates";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";

const AIAssistant = lazy(() =>
  import("@/components/portfolio/AIAssistant").then((m) => ({ default: m.AIAssistant })),
);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sathyanantham V. | Lead Software Engineer & Frontend Architect" },
      {
        name: "description",
        content:
          "Portfolio of Sathyanantham V. - Lead Software Engineer and Frontend Architect with 13+ years of experience in React, TypeScript, micro-frontends, IBM Sterling OMS and applied AI.",
      },
      { property: "og:title", content: "Sathyanantham V. | Lead Software Engineer & Frontend Architect" },
      {
        property: "og:description",
        content:
          "Portfolio of Sathyanantham V. - Lead Software Engineer and Frontend Architect with 13+ years of experience in React, TypeScript, micro-frontends, IBM Sterling OMS and applied AI.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Sathyanantham V. | Lead Software Engineer & Frontend Architect" },
      {
        name: "twitter:description",
        content:
          "Portfolio of Sathyanantham V. - Lead Software Engineer and Frontend Architect with 13+ years of experience in React, TypeScript, micro-frontends, IBM Sterling OMS and applied AI.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Sathyanantham V",
          jobTitle: "Lead Software Engineer, Frontend Architect",
          knowsAbout: [
            "React",
            "Next.js",
            "TypeScript",
            "Micro Frontends",
            "IBM Sterling OMS",
            "AI Engineering",
            "Node.js",
            "Java Spring Boot",
            "Kafka",
            "PostgreSQL",
          ],
          address: { "@type": "PostalAddress", addressCountry: "IN" },
        }),
      },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  return (
    <div className="relative min-h-screen text-foreground">
      <AuroraBackground />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <EmptyStates />
        <Contact />
      </main>
      <Footer />
      <Suspense fallback={null}>
        <AIAssistant />
      </Suspense>
      <Toaster
        theme="dark"
        position="bottom-center"
        toastOptions={{
          className: "glass-strong !border-white/10 !text-foreground",
        }}
      />
    </div>
  );
}
