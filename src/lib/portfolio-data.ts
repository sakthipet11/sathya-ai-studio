export const PROFILE = {
  name: "Sathyanantham V",
  shortName: "Sathyanantham",
  roles: [
    "Lead Software Engineer",
    "Frontend Architect",
    "React & TypeScript Specialist",
    "Generative AI Practitioner",
  ],
  location: "Coimbatore, Tamil Nadu, India",
  email: "v.sathyanantham@gmail.com",
  linkedIn: "https://www.linkedin.com/in/sathyanantham-v-646b911b",
  resumeUrl: "/sathyanantham-v-resume.pdf",
  coverLetterUrl: "/sathyanantham-v-cover-letter.pdf",
  tagline:
    "13+ years designing enterprise UI platforms, digital commerce and order-management solutions - with React, TypeScript, micro-frontends and applied AI.",
  summary:
    "Lead Software Engineer and Frontend Architect with 13+ years of experience delivering enterprise-scale applications across Retail, Digital Commerce, Banking, Healthcare and Life Sciences. I specialize in React.js, TypeScript, scalable UI platforms and Micro Frontend Architecture, and currently lead a team of 8 engineers at Nextuple. My work combines frontend architecture with practical backend integration, IBM Sterling OMS customizations and AI-enabled engineering workflows.",
} as const;

export const SKILLS: {
  category: string;
  items: { name: string; level: "Core" | "Strong" | "Working" }[];
}[] = [
  {
    category: "Frontend",
    items: [
      { name: "React.js", level: "Core" },
      { name: "TypeScript", level: "Core" },
      { name: "JavaScript (ES6+)", level: "Core" },
      { name: "Next.js", level: "Strong" },
      { name: "Redux Toolkit", level: "Strong" },
      { name: "HTML5 / CSS3 / SCSS", level: "Core" },
    ],
  },
  {
    category: "Architecture",
    items: [
      { name: "Micro Frontend Architecture", level: "Core" },
      { name: "Module Federation", level: "Core" },
      { name: "Design Systems", level: "Strong" },
      { name: "UI Extensibility Frameworks", level: "Strong" },
      { name: "Schema-Driven UI", level: "Strong" },
      { name: "Performance Optimization", level: "Strong" },
    ],
  },
  {
    category: "Backend & Data",
    items: [
      { name: "Node.js / Express.js", level: "Strong" },
      { name: "Java / Spring Boot", level: "Strong" },
      { name: "Python", level: "Strong" },
      { name: "REST APIs / Microservices", level: "Strong" },
      { name: "Kafka / Redis", level: "Strong" },
      { name: "PostgreSQL / MongoDB", level: "Strong" },
    ],
  },
  {
    category: "Enterprise & AI",
    items: [
      { name: "IBM Sterling OMS", level: "Strong" },
      { name: "IBM Call Center", level: "Strong" },
      { name: "Generative AI", level: "Strong" },
      { name: "Claude Skills", level: "Strong" },
      { name: "OpenAI APIs / Prompt Engineering", level: "Strong" },
      { name: "AI Agents / MCP", level: "Working" },
    ],
  },
  {
    category: "Tools & Leadership",
    items: [
      { name: "Technical Leadership", level: "Core" },
      { name: "Mentoring & Code Reviews", level: "Core" },
      { name: "Git / Bitbucket / Jenkins", level: "Strong" },
      { name: "Docker / Maven / SonarQube", level: "Strong" },
      { name: "AEM / Drupal", level: "Strong" },
      { name: "Agile Delivery", level: "Strong" },
    ],
  },
];

export const EXPERIENCE = [
  {
    role: "Lead Software Engineer",
    company: "Nextuple Inc.",
    period: "Aug 2023 - Present",
    highlights: [
      "Lead frontend architecture for enterprise order-management and commerce applications.",
      "Mentor a team of 8 engineers, set standards, and lead architecture, design and code reviews.",
      "Delivered reusable patterns across 15+ enterprise modules and applications.",
      "Contributed to IBM AI chatbot integration, Sterling OMS customizations and Python-based AI services.",
    ],
  },
  {
    role: "Senior Software Engineer",
    company: "Nextuple Inc.",
    period: "Aug 2022 - Jul 2023",
    highlights: [
      "Built enterprise order-management applications spanning promise, inventory, picking, packing, staging and hub workflows.",
      "Developed reusable React components and frontend frameworks with architects and product owners.",
    ],
  },
  {
    role: "Senior Associate",
    company: "Cognizant Technology Solutions",
    period: "Nov 2018 - Aug 2022",
    highlights: [
      "Developed React and Drupal applications for global banking, healthcare and life-sciences clients including Bayer and US Bank.",
      "Delivered responsive websites, reusable UI components, code reviews and mentoring across distributed teams.",
    ],
  },
  {
    role: "Lead Developer / Senior Software Engineer / Software Engineer",
    company: "Skava Systems (Infosys)",
    period: "Jul 2012 - Nov 2018",
    highlights: [
      "Led frontend delivery for large retail eCommerce platforms and mentored engineers through architecture reviews.",
      "Contributed to commerce experiences for Adidas, Reebok, Kohl's, Kraft Foods and Toys\"R\"Us.",
    ],
  },
] as const;

export const PROJECTS = [
  {
    slug: "claude-skills",
    name: "Claude Skills Initiative",
    tagline: "Reusable AI-assisted engineering accelerators for frontend and backend teams.",
    problem: "Common delivery activities were repetitive and inconsistent across teams.",
    solution:
      "Designed reusable Skills for UI schema generation, design documentation, code and unit-test generation, architecture guidance, API documentation and standards.",
    stack: ["Claude", "Prompt Engineering", "React", "Node.js", "Python"],
    category: "AI",
    featured: true,
  },
  {
    slug: "ibm-ai-chatbot",
    name: "IBM AI-Powered Chatbot",
    tagline: "AI-enabled support for enterprise call center and order-management workflows.",
    problem: "Enterprise operations need faster, more consistent assistance across complex customer and order workflows.",
    solution:
      "Contributed to chatbot integration, frontend integrations, Python-based AI utilities and collaboration with AI and backend teams.",
    stack: ["IBM AI", "IBM Call Center", "IBM Sterling OMS", "React", "Python"],
    category: "AI",
    featured: true,
  },
  {
    slug: "micro-frontends",
    name: "Enterprise Micro Frontend Platform",
    tagline: "Scalable frontend architecture across 15+ modules and applications.",
    problem: "Large enterprise applications require independent, reusable frontend capabilities without sacrificing consistency.",
    solution:
      "Architected Micro Frontend solutions using Module Federation, reusable component libraries, extensibility frameworks and schema-driven UI patterns.",
    stack: ["React", "TypeScript", "Module Federation", "Vite", "Design Systems"],
    category: "Platform",
    featured: true,
  },
  {
    slug: "sterling-oms",
    name: "IBM Sterling OMS Customizations",
    tagline: "Frontend integration and client-specific extension work for enterprise order management.",
    problem: "Order-management implementations need tailored interfaces and integrations for each enterprise workflow.",
    solution:
      "Contributed to Sterling OMS customizations and frontend integrations for clients including Tapestry, DICK'S Sporting Goods and Ashley Furniture.",
    stack: ["IBM Sterling OMS", "React", "Node.js", "Spring Boot", "Kafka"],
    category: "OMS",
  },
] as const;

export const CERTIFICATIONS = [
  "Introduction to Agent Skills - Claude",
  "React Testing Library with Jest / Vitest",
  "Principles of Secure Coding",
  "Docker for the Absolute Beginner",
  "Azure Serverless - Hands-on Learning",
  "Generative AI",
] as const;

export const AWARDS = [
  "Top Performer Award 2023 - Nextuple",
  "Monthly Spot Award - Nextuple",
  "Best Performer Award 2019, 2020 - Cognizant",
  "Skava Star Performer Award 2013, 2015 - Skava Systems",
] as const;

export const KB: { q: RegExp; a: string }[] = [
  {
    q: /(who|about|tell).*(sathya|you)|about (him|sathya)/i,
    a: "**Sathyanantham V** is a Lead Software Engineer and Frontend Architect with **13+ years** of experience. He currently leads a team of **8 engineers** at Nextuple, specializing in React.js, TypeScript, micro-frontends, enterprise UI platforms and applied AI.",
  },
  {
    q: /react|frontend|front[- ]?end/i,
    a: "Sathyanantham specializes in **React.js**, **TypeScript**, JavaScript, Next.js, design systems and Micro Frontend Architecture. His enterprise frontend work spans digital commerce, order management, banking, healthcare and life sciences.",
  },
  {
    q: /(ibm|sterling|oms|order manage)/i,
    a: "He contributes to **IBM Sterling OMS** customizations and frontend integrations, including work for Tapestry, DICK'S Sporting Goods and Ashley Furniture. At Nextuple he has also delivered enterprise order-management apps across promise, inventory, picking, packing, staging and hub workflows.",
  },
  {
    q: /micro[- ]?frontend|architecture/i,
    a: "Sathyanantham has architected **Micro Frontend** solutions using Module Federation, reusable component libraries, extensibility frameworks and schema-driven UI patterns across 15+ enterprise modules and applications.",
  },
  {
    q: /(years|experience|senior)/i,
    a: "Sathyanantham brings **13+ years** of software-engineering experience and currently leads a team of **8 engineers** at Nextuple.",
  },
  {
    q: /(ai|llm|rag|assistant|gpt|gemini|groq|claude)/i,
    a: "His applied AI work includes contributing to an **IBM AI-powered chatbot** for enterprise call center and order-management applications, Python-based integration utilities, and reusable **Claude Skills**. The Skills initiative reduced common engineering work from approximately **20 days to 5 days**.",
  },
  {
    q: /contact|hire|email|reach/i,
    a: "You can reach Sathyanantham at [v.sathyanantham@gmail.com](mailto:v.sathyanantham@gmail.com) or on [LinkedIn](https://www.linkedin.com/in/sathyanantham-v-646b911b).",
  },
];

export const SUGGESTED_PROMPTS = [
  "Tell me about Sathyanantham",
  "What frontend technologies do you know?",
  "Explain IBM Sterling OMS experience",
  "Explain Micro Frontend architecture",
  "What AI initiatives have you led?",
  "How many years of experience?",
];
