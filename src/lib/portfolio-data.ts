export const PROFILE = {
  name: "Sathyanantham V",
  shortName: "Sathyanantham",
  roles: [
    "Senior Software Engineer",
    "AI Engineer",
    "React Expert",
    "IBM Sterling OMS Specialist",
  ],
  tagline:
    "I build resilient omnichannel commerce, order-management, and AI-assisted platforms — from micro-frontend UIs to Sterling OMS extensions.",
  location: "India",
  summary: `Senior engineer working across the full product surface — React, Next.js and TypeScript on the front, Node.js, Java Spring Boot, Kafka, Redis and PostgreSQL on the back, and IBM Sterling OMS at the enterprise core. I design micro-frontend architectures, integrate AEM and Drupal, and build AI-assisted experiences that make complex workflows feel obvious. I've led and mentored engineering teams of 6+ people delivering omnichannel commerce and order-management platforms across Retail, Life Sciences and Food Service.`,
} as const;

export const SKILLS: {
  category: string;
  items: { name: string; level: "Core" | "Strong" | "Working" }[];
}[] = [
  {
    category: "Frontend",
    items: [
      { name: "React", level: "Core" },
      { name: "Next.js", level: "Core" },
      { name: "TypeScript", level: "Core" },
      { name: "Micro Frontends", level: "Core" },
      { name: "Tailwind CSS", level: "Strong" },
      { name: "Design Systems", level: "Strong" },
      { name: "Schema-Driven UI", level: "Strong" },
      { name: "AEM / Drupal", level: "Strong" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js / Express", level: "Core" },
      { name: "Java / Spring Boot", level: "Core" },
      { name: "REST & GraphQL APIs", level: "Strong" },
      { name: "Kafka", level: "Strong" },
      { name: "Redis", level: "Strong" },
      { name: "PostgreSQL", level: "Strong" },
    ],
  },
  {
    category: "IBM / OMS",
    items: [
      { name: "IBM Sterling OMS", level: "Core" },
      { name: "Order Orchestration", level: "Core" },
      { name: "Omnichannel Fulfilment", level: "Strong" },
      { name: "Custom Agents & Extensions", level: "Strong" },
    ],
  },
  {
    category: "AI Engineering",
    items: [
      { name: "LLM App Design", level: "Strong" },
      { name: "RAG Architectures", level: "Strong" },
      { name: "Prompt & Tooling", level: "Strong" },
      { name: "AI Assistants / Chat UX", level: "Strong" },
    ],
  },
  {
    category: "Cloud & DevOps",
    items: [
      { name: "Docker", level: "Strong" },
      { name: "CI / CD Pipelines", level: "Strong" },
      { name: "Cloud Deployments", level: "Working" },
      { name: "Observability", level: "Working" },
    ],
  },
  {
    category: "Architecture & Leadership",
    items: [
      { name: "Micro-Frontend Architecture", level: "Core" },
      { name: "Event-Driven Systems", level: "Strong" },
      { name: "Mentoring 6+ Engineers", level: "Core" },
      { name: "Cross-Team Delivery", level: "Strong" },
    ],
  },
];

export const TIMELINE: { title: string; body: string }[] = [
  {
    title: "Engineering Leadership",
    body: "Leading and mentoring a team of 6+ engineers — reviewing architecture, unblocking delivery, and setting front-end and platform standards across squads.",
  },
  {
    title: "Enterprise Order Management",
    body: "Designing and extending IBM Sterling OMS implementations — orchestration flows, custom agents, and omnichannel fulfilment for Retail, Life Sciences and Food Service programmes.",
  },
  {
    title: "Micro-Frontend Platforms",
    body: "Building composable React / Next.js micro-frontend platforms with shared design systems, schema-driven UI, and independent team deploys.",
  },
  {
    title: "AI-Assisted Experiences",
    body: "Prototyping and shipping AI assistants for internal tooling, call-center workflows and documentation — RAG pipelines, tool-use, and grounded chat UX.",
  },
  {
    title: "Content & Digital Platforms",
    body: "Integrating AEM and Drupal with modern JavaScript front-ends, and building Node.js / Spring Boot services backed by Kafka, Redis and PostgreSQL.",
  },
];

export const PROJECTS: {
  slug: string;
  name: string;
  tagline: string;
  problem: string;
  solution: string;
  stack: string[];
  category: "AI" | "Platform" | "OMS" | "Frontend";
  featured?: boolean;
}[] = [
  {
    slug: "ibm-oms-ai-assistant",
    name: "IBM OMS AI Assistant",
    tagline: "Natural-language copilot over Sterling OMS orders & flows.",
    problem:
      "Support and ops teams spend hours navigating OMS screens to answer order-state questions and diagnose stuck flows.",
    solution:
      "A retrieval-grounded assistant that queries OMS data, explains order state, and suggests next actions with citations back to the underlying documents and screens.",
    stack: ["React", "Node.js", "IBM Sterling OMS", "RAG", "PostgreSQL"],
    category: "AI",
    featured: true,
  },
  {
    slug: "call-center-ai",
    name: "Call Center AI",
    tagline: "Agent-assist copilot for omnichannel support desks.",
    problem:
      "Agents juggle multiple systems on every call — customer, order, returns, promotions — with high cognitive load.",
    solution:
      "A unified assist panel that summarises the customer, surfaces order context, and drafts responses using guardrailed LLM tooling.",
    stack: ["Next.js", "TypeScript", "Node.js", "Kafka", "LLM Tooling"],
    category: "AI",
    featured: true,
  },
  {
    slug: "schema-driven-ui",
    name: "Schema-Driven UI",
    tagline: "One JSON schema, many product surfaces.",
    problem:
      "Product teams re-implement the same forms and layouts across channels, drifting away from a shared design language.",
    solution:
      "A schema-driven UI runtime that renders forms, tables and layouts from typed schemas — with validation, theming, and design-system alignment baked in.",
    stack: ["React", "TypeScript", "Design System", "JSON Schema"],
    category: "Frontend",
  },
  {
    slug: "micro-frontend-platform",
    name: "Micro Frontend Platform",
    tagline: "Composable UI shell for independent product teams.",
    problem:
      "Multiple teams shipping into one storefront created release contention and inconsistent UX.",
    solution:
      "A micro-frontend shell with module federation, shared design tokens, isolated routing and progressive rollout — teams deploy independently, users see one product.",
    stack: ["React", "Next.js", "Module Federation", "TypeScript"],
    category: "Platform",
    featured: true,
  },
  {
    slug: "ai-docs-assistant",
    name: "AI Documentation Assistant",
    tagline: "Ask your internal docs, get grounded answers.",
    problem:
      "Onboarding and cross-team knowledge lives in scattered wikis, PDFs and code comments.",
    solution:
      "A RAG assistant over internal docs and code — with source citations, per-workspace scoping, and a chat UI tuned for engineers.",
    stack: ["Next.js", "RAG", "Vector Store", "TypeScript"],
    category: "AI",
  },
  {
    slug: "enterprise-chatbot",
    name: "Enterprise Chatbot",
    tagline: "Guardrailed conversational surface for enterprise workflows.",
    problem:
      "Enterprises want conversational entry points but need auditability, access control and predictable tool behaviour.",
    solution:
      "A pluggable chatbot with role-aware tools, structured outputs, streaming responses and full request logging for compliance.",
    stack: ["Node.js", "TypeScript", "LLM Providers", "Redis"],
    category: "AI",
  },
];

// Scoped, factual knowledge base for the on-page AI assistant.
// The assistant answers ONLY from these snippets.
export const KB: { q: RegExp; a: string }[] = [
  {
    q: /(who|about|tell).*(sathya|you)|about (him|sathya)/i,
    a: `**Sathyanantham V** is a Senior Software Engineer and AI Engineer.

He works across React, Next.js and TypeScript on the front, Node.js, Java Spring Boot, Kafka, Redis and PostgreSQL on the back, and **IBM Sterling OMS** at the enterprise core. He designs micro-frontend architectures, integrates AEM and Drupal, and builds AI-assisted experiences.

He has led and mentored teams of **6+ engineers** delivering omnichannel commerce and order-management platforms across Retail, Life Sciences and Food Service.`,
  },
  {
    q: /react|frontend|front[- ]?end/i,
    a: `On the frontend Sathyanantham works with:

- **React**, **Next.js**, **TypeScript**
- **Micro-frontend** architectures with shared design systems
- **Schema-driven UI** runtimes
- **Tailwind CSS** and modern design-system tooling
- Integrations with **AEM** and **Drupal**

Sample projects: *Schema-Driven UI*, *Micro Frontend Platform*.`,
  },
  {
    q: /(ibm|sterling|oms|order manage)/i,
    a: `**IBM Sterling OMS** is a core specialism.

Sathyanantham designs and extends Sterling OMS implementations — order orchestration flows, custom agents, and omnichannel fulfilment — across **Retail, Life Sciences and Food Service** programmes.

See the *IBM OMS AI Assistant* case study for an example of pairing Sterling OMS with a retrieval-grounded copilot.`,
  },
  {
    q: /micro[- ]?frontend|architecture/i,
    a: `The **Micro Frontend Platform** approach he uses:

\`\`\`text
[ Shell App ]
   ├── design tokens + shared UI
   ├── routing + auth
   └── module federation
         ├── team A remote (React)
         ├── team B remote (Next.js)
         └── team C remote (React)
\`\`\`

Independent teams deploy their own remotes; the shell composes them behind one product experience. Shared design tokens and a schema-driven UI layer keep everything visually and behaviourally consistent.`,
  },
  {
    q: /(years|experience|senior)/i,
    a: `Sathyanantham is a **senior-level engineer** with hands-on experience across omnichannel commerce, order management and AI-assisted platforms, and has led teams of **6+ engineers**.

Exact tenure and employer history are intentionally not listed on this site — verified details are available on request via the Contact section.`,
  },
  {
    q: /project|show|portfolio|case/i,
    a: `Featured solution concepts:

1. **IBM OMS AI Assistant** — natural-language copilot over Sterling OMS.
2. **Call Center AI** — agent-assist copilot for omnichannel desks.
3. **Micro Frontend Platform** — composable UI shell.
4. **Schema-Driven UI**, **AI Documentation Assistant**, **Enterprise Chatbot**.

Open the **Projects** section for the challenge / solution / stack for each.`,
  },
  {
    q: /(ai|llm|rag|assistant|gpt|gemini|groq)/i,
    a: `On the AI side, Sathyanantham focuses on:

- **LLM application design** with structured outputs and tool use
- **RAG** pipelines over internal documents and enterprise data
- Grounded **chat UX** — citations, streaming, guardrails
- Provider-agnostic wiring (**OpenAI / Gemini / Groq**) behind a common interface

This portfolio's assistant is a *scoped* demo answering from an embedded knowledge base. Live LLM/RAG integration is enabled once API keys and source documents are configured — see the README.`,
  },
  {
    q: /contact|hire|email|reach/i,
    a: `Contact details (email, LinkedIn, GitHub) are shared **on request** via the Contact form on this site.

Head to the **Contact** section, drop a short message, and Sathyanantham will follow up.`,
  },
];

export const SUGGESTED_PROMPTS = [
  "Tell me about Sathyanantham",
  "Show React projects",
  "Explain IBM Sterling OMS experience",
  "What frontend technologies do you know?",
  "Explain Micro Frontend architecture",
  "How many years of experience?",
];
