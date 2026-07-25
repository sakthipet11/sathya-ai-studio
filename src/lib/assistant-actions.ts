import { createServerFn } from "@tanstack/react-start";
import {
  PROFILE,
  SKILLS,
  EXPERIENCE,
  PROJECTS,
  CERTIFICATIONS,
  AWARDS,
  KB,
} from "./portfolio-data";
import { RESUME_TEXT } from "./resume-data";

type Message = {
  role: "user" | "assistant";
  content: string;
};

function localAnswer(q: string): string {
  const hit = KB.find((k) => k.q.test(q));
  if (hit) return hit.a;
  return `I answer from a curated knowledge base about **Sathyanantham V** - experience, skills, IBM Sterling OMS work, micro-frontends and AI initiatives.

Try one of the suggested prompts below, or ask about React, OMS, or the project case studies.

> This is a scoped portfolio assistant. Its answers are based on the verified information shown on this site.`;
}

export const askAssistant = createServerFn({ method: "POST" })
  .validator((data: { history: Message[]; persona?: string }) => data)
  .handler(async ({ data }) => {
    const { history, persona = "portfolio" } = data;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      const lastMsg = history[history.length - 1];
      if (lastMsg && lastMsg.role === "user") {
        return localAnswer(lastMsg.content);
      }
      return "Hello! How can I help you today?";
    }

    try {
      const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

      let systemInstructionText = `You are the portfolio AI assistant for ${PROFILE.name}.
Your job is to answer questions about ${PROFILE.name}'s background, experience, skills, and projects in a helpful, professional, and friendly manner.

Here is the verified information about ${PROFILE.name} from their official resume:

${RESUME_TEXT}

INSTRUCTIONS:
1. Answer using ONLY the verified information from the resume above. Do not make up or hallucinate any details (such as other companies, other certifications, etc.). If you don't know or if it is not in the facts, politely state that you only have access to the verified information in the portfolio.
2. If the user asks about something not covered in the resume, politely inform them that you are a scoped portfolio assistant and can only answer questions related to ${PROFILE.name}'s professional background.
3. Be concise and professional. Use markdown formatting (bolding, lists, code blocks if needed) to make responses highly readable.
4. Keep the tone helpful, modern, and engaging.
`;

      if (persona === "oms") {
        systemInstructionText = `You are an expert Enterprise IBM Sterling OMS Consultant. Your role is to provide architect-level advice on Order Management Systems, retail fulfillment, inventory promise, sourcing, and integrations.
You are assisting a user browsing Sathya's portfolio. You know that Sathya has 13+ years of experience including deep expertise in Sterling OMS customizations, promise/inventory modules, and frontend integrations for clients like Dick's Sporting Goods, Ashley Furniture, and Tapestry.
Highlight Sathya's relevant experience and skills when discussing OMS architectures, but do not disclose any confidential client data.
Keep responses concise, technical, and structured in clean markdown.`;
      } else if (persona === "frontend") {
        systemInstructionText = `You are an expert Frontend Platform Architect. Your role is to advise on micro-frontends, Module Federation, React, TypeScript, performance optimization, and custom component libraries.
You know that Sathya is a Lead Software Engineer and Frontend Architect with 13+ years of experience who leads a team of 8 engineers and has architected platforms across 15+ modules.
Highlight Sathya's engineering credentials and approach to clean modular code when discussing React and frontend platform design.
Use markdown formatting and provide clear architectural patterns.`;
      } else if (persona === "creative") {
        systemInstructionText = `You are a Creative Visual Brain. Your role is to suggest visual design ideas, web animation concepts, and beautiful user interfaces (using techniques like Glassmorphism, 3D, WebGL, and micro-animations).
Be highly inspiring, visual, and supply code templates if helpful. Mention that Sathya specializes in crafting premium, high-fidelity frontends.
Keep responses engaging, modern, and write code snippets when demonstrating visual effects.`;
      }

      const contents = history.map((msg) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      }));

      const payload = {
        systemInstruction: {
          parts: [{ text: systemInstructionText }],
        },
        contents,
      };

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Gemini API Error:", errorText);
        const lastMsg = history[history.length - 1];
        return localAnswer(lastMsg ? lastMsg.content : "");
      }

      const json = (await res.json()) as {
        candidates?: {
          content?: {
            parts?: {
              text?: string;
            }[];
          };
        }[];
      };
      const text = json?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        throw new Error("Empty response from Gemini API");
      }

      return text;
    } catch (err) {
      console.error("Error in askAssistant server function:", err);
      const lastMsg = history[history.length - 1];
      return localAnswer(lastMsg ? lastMsg.content : "");
    }
  });
