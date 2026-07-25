# Sathyanantham V. — Portfolio

A production-ready, dark-first personal portfolio for **Sathyanantham V.** — Senior Software Engineer & AI Engineer. Built with TanStack Start, React 19, TypeScript and Tailwind v4.

## Highlights

- Editorial dark-first design (Space Grotesk + Inter, aurora + grid + noise background)
- Sticky glass navigation with scroll progress, active-section tracking, mobile drawer
- Hero with rotating role typewriter, magnetic CTAs, glass panels, spotlight cursor effect
- About, categorized Skills, capability-based Experience timeline
- Six project case-study cards (challenge / approach / stack) with 3D tilt hover and inline SVG architecture diagrams for featured items
- Empty states for Certificates / Writing / Testimonials (no fabricated content)
- Contact form with zod client-side validation, success simulation, and "available on request" links
- Floating AI assistant with glassmorphism chat UI, suggested prompt chips, typing indicator, local chat history, markdown-style rendering (code blocks, lists, blockquotes)
- SEO metadata + JSON-LD, sitemap.xml route, robots.txt
- Full keyboard navigation, semantic landmarks, reduced-motion support

## Getting started

```bash
bun install
bun run dev
```

Then open the printed local URL.

## Assets & content checklist

Replace these placeholders with verified assets:

- [ ] `public/resume.pdf` — actual resume (unlocks the Download Resume button; wire in `Hero.tsx`)
- [ ] `public/cover-letter.pdf` — optional cover letter
- [ ] `public/og.jpg` — 1200×630 social preview image, then add `og:image` in `src/routes/index.tsx`
- [ ] `public/avatar.jpg` — profile photo
- [ ] `public/projects/*.png` — real project screenshots
- [ ] Company logos (SVG) for verified employers
- [ ] Live URLs for each project in `src/lib/portfolio-data.ts`
- [ ] Verified certificates (issuer + verification URL) — add to `EmptyStates.tsx`
- [ ] Career timeline with real dates and employers — populate `TIMELINE` in `src/lib/portfolio-data.ts`
- [ ] Contact channels (email, LinkedIn, GitHub) — update `Contact.tsx`

## AI assistant

The floating assistant answers from a small, curated knowledge base in `src/lib/portfolio-data.ts` (`KB`). It never fabricates.

To enable live LLM / RAG responses, set one of the following in a `.env` file and wire the provider inside `AIAssistant.tsx`:

- `OPENAI_API_KEY` — OpenAI
- `GEMINI_API_KEY` — Google Gemini
- `GROQ_API_KEY` — Groq

Keys must stay server-side. See `.env.example`.

## Deployment

This app is a TanStack Start project and deploys to any modern Node/edge platform. Build:

```bash
bun run build
```

Then serve the produced output. Do not commit `.env` files. Configure the provider keys and `og:image` before publishing.
