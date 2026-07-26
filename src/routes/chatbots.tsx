import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  MessageSquare,
  Send,
  Sparkles,
  Database,
  Terminal,
  Palette,
  Bot,
  ArrowLeft,
} from "lucide-react";
import { Nav } from "@/components/portfolio/Nav";
import { Footer } from "@/components/portfolio/Footer";
import { AuroraBackground } from "@/components/portfolio/AuroraBackground";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { askAssistant } from "@/lib/assistant-actions";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "sonner";

const Markdown = lazy(() => import("@/components/portfolio/Markdown"));

type PersonaId = "portfolio" | "oms" | "frontend" | "creative";

type Persona = {
  id: PersonaId;
  name: string;
  role: string;
  icon: typeof Bot;
  description: string;
  glowingColor: string; // Tailwind class color mapping
  suggestions: string[];
  initialMessage: string;
};

const PERSONAS: Persona[] = [
  {
    id: "portfolio",
    name: "Portfolio AI Assistant",
    role: "Sathya's Career Guide",
    icon: Bot,
    description: "Scoped agent trained on Sathya's resume, credentials, and work history.",
    glowingColor: "from-cyan-500/20 to-blue-500/20 shadow-cyan-500/10",
    suggestions: [
      "Tell me about Sathya",
      "What are Sathya's core skillsets?",
      "List Sathya's latest certifications",
    ],
    initialMessage:
      "Hi there! I am Sathya's personal career guide. Ask me about his experience at Nextuple, Cognizant, or systems engineering work.",
  },
  {
    id: "oms",
    name: "Enterprise OMS Consultant",
    role: "IBM Sterling Specialist",
    icon: Database,
    description:
      "Fulfillment architect focused on inventory, promises, pipelines, and integrations.",
    glowingColor: "from-amber-500/20 to-orange-500/20 shadow-orange-500/10",
    suggestions: [
      "How does Sterling OMS inventory engine scale?",
      "Describe Sathya's OMS customization projects",
      "What is retail Promising logic?",
    ],
    initialMessage:
      "Greetings. I specialize in IBM Sterling OMS and retail supply chain architectures. Ask me about inventory promise engine optimizations or order pipeline setups.",
  },
  {
    id: "frontend",
    name: "UI Platform Architect",
    role: "React & Micro-Frontends Expert",
    icon: Terminal,
    description: "Advises on Module Federation, React 19 performance, and schema-driven UIs.",
    glowingColor: "from-emerald-500/20 to-teal-500/20 shadow-emerald-500/10",
    suggestions: [
      "Explain Module Federation vs Monoliths",
      "How do you design schema-driven React UIs?",
      "How can I optimize React render speeds?",
    ],
    initialMessage:
      "Hello! Let's talk architecture. I analyze micro-frontends, shared design systems, component lifecycle, and state scaling.",
  },
  {
    id: "creative",
    name: "Creative Visual Brain",
    role: "UX Design & Animation Muse",
    icon: Palette,
    description: "Idea generator for premium visual styles, glassmorphism, and animations.",
    glowingColor: "from-purple-500/20 to-pink-500/20 shadow-purple-500/10",
    suggestions: [
      "Suggest a cool card hover effect code",
      "What is glassmorphism styling recipe?",
      "Visual concept for a tech portfolio",
    ],
    initialMessage:
      "Welcome to the sandbox! I generate visual layout concepts, code templates for shaders, CSS glowing variables, and animation details.",
  },
];

type Msg = { role: "user" | "assistant"; content: string; ts: number };

export const Route = createFileRoute("/chatbots")({
  head: () => ({
    meta: [
      { title: "Custom AI Chatbots Studio | Sathyanantham V." },
      {
        name: "description",
        content:
          "Explore interactive domain specialist chatbots representing Sathya's expertise in React platform architectures, IBM Sterling OMS fulfillment, and visual UX engineering.",
      },
    ],
  }),
  component: ChatbotStudio,
});

function ChatbotStudio() {
  const [activePersona, setActivePersona] = useState<Persona>(PERSONAS[0]);
  const [inputs, setInputs] = useState<Record<PersonaId, string>>({
    portfolio: "",
    oms: "",
    frontend: "",
    creative: "",
  });
  const [histories, setHistories] = useState<Record<PersonaId, Msg[]>>({
    portfolio: [],
    oms: [],
    frontend: [],
    creative: [],
  });
  const [typingStates, setTypingStates] = useState<Record<PersonaId, boolean>>({
    portfolio: false,
    oms: false,
    frontend: false,
    creative: false,
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Load chats from LocalStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("sv-persona-chats-v1");
      if (stored) {
        setHistories(JSON.parse(stored));
      }
    } catch (e) {
      console.warn("Could not load chats from local storage");
    }
  }, []);

  // Save histories when updated
  const updateHistory = (personaId: PersonaId, newHistory: Msg[]) => {
    const updated = { ...histories, [personaId]: newHistory };
    setHistories(updated);
    try {
      localStorage.setItem("sv-persona-chats-v1", JSON.stringify(updated));
    } catch (e) {
      console.warn("Could not save chats to local storage");
    }
  };

  useEffect(() => {
    // Scroll chat window to bottom on new messages or typing state change
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [histories, typingStates, activePersona]);

  const send = async (text: string) => {
    const q = text.trim();
    if (!q) return;

    const currentHistory = histories[activePersona.id];
    const now = Date.now();
    const newMsg: Msg = { role: "user", content: q, ts: now };
    const updatedHistory = [...currentHistory, newMsg];

    // Clear input
    setInputs((prev) => ({ ...prev, [activePersona.id]: "" }));
    // Update local state and storage
    updateHistory(activePersona.id, updatedHistory);

    // Set typing state
    setTypingStates((prev) => ({ ...prev, [activePersona.id]: true }));

    try {
      const reply = await askAssistant({
        data: {
          history: updatedHistory.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          persona: activePersona.id,
        },
      });

      const assistantMsg: Msg = { role: "assistant", content: reply, ts: Date.now() };
      updateHistory(activePersona.id, [...updatedHistory, assistantMsg]);
    } catch (err) {
      console.error("Error calling assistant:", err);
      const errorMsg: Msg = {
        role: "assistant",
        content: "I ran into a server error processing your request. Please try again.",
        ts: Date.now(),
      };
      updateHistory(activePersona.id, [...updatedHistory, errorMsg]);
    } finally {
      setTypingStates((prev) => ({ ...prev, [activePersona.id]: false }));
    }
  };

  const clearChat = (personaId: PersonaId) => {
    updateHistory(personaId, []);
  };

  const currentHistory = histories[activePersona.id];
  const isTyping = typingStates[activePersona.id];
  const currentInput = inputs[activePersona.id];

  return (
    <div className="relative min-h-screen text-foreground flex flex-col">
      <AuroraBackground />
      <ScrollProgress />
      <Nav />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 pt-24 pb-16 md:pt-28 md:pb-20 flex flex-col md:gap-8">
        {/* Header Breadcrumb */}
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <a href="/" className="hover:text-foreground transition flex items-center gap-1">
              <ArrowLeft className="size-3" /> Sathya's Portfolio
            </a>
            <span>/</span>
            <span className="text-primary font-mono">Custom AI Chatbots</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight">
            AI Chatbot <span className="text-gradient">Studio</span>
          </h1>
          <p className="max-w-2xl text-sm md:text-base text-muted-foreground">
            Interact with specialized artificial intelligences covering different dimensions of
            Sathya's enterprise engineering practice.
          </p>
        </div>

        {/* Studio Grid */}
        <div className="grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)] flex-1 lg:min-h-[550px] items-stretch min-w-0">
          {/* Left panel: Persona Selector */}
          <div className="flex flex-col gap-3 min-w-0">
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-mono px-1">
              Select Specialist Agent
            </div>
            <div className="flex flex-row overflow-x-auto scrollbar-none lg:flex-col gap-3 pb-3 lg:pb-0 shrink-0 -mx-4 px-4 lg:mx-0 lg:px-0">
              {PERSONAS.map((persona) => {
                const isActive = activePersona.id === persona.id;
                const Icon = persona.icon;
                return (
                  <button
                    key={persona.id}
                    onClick={() => setActivePersona(persona)}
                    className={cn(
                      "lg:flex-initial text-left rounded-2xl p-4 transition-all duration-300",
                      "border backdrop-blur-md relative overflow-hidden group shrink-0 w-[220px] sm:w-[260px] lg:w-auto",
                      isActive
                        ? "bg-white/[0.06] border-primary/50 shadow-lg " + persona.glowingColor
                        : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]",
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "grid size-9 place-items-center rounded-xl transition-all",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "bg-white/5 text-muted-foreground group-hover:text-foreground",
                        )}
                      >
                        <Icon className="size-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-sm truncate">{persona.name}</div>
                        <div className="text-[11px] text-muted-foreground truncate">
                          {persona.role}
                        </div>
                      </div>
                    </div>
                    <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {persona.description}
                    </p>
                    {isActive && (
                      <span className="absolute right-3 top-3 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right panel: Active Chat Sandbox */}
          <div className="glass rounded-3xl overflow-hidden flex flex-col border border-white/10 shadow-2xl relative min-h-[500px] lg:min-h-[550px]">
            {/* Active Persona Header */}
            <header className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-white/[0.01] backdrop-blur-md z-10">
              <div className="flex items-center gap-3">
                <div className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary">
                  <activePersona.icon className="size-4" />
                </div>
                <div>
                  <div className="font-semibold text-sm">{activePersona.name}</div>
                  <div className="text-[10px] text-muted-foreground uppercase font-mono tracking-wider">
                    {activePersona.role}
                  </div>
                </div>
              </div>
              <button
                onClick={() => clearChat(activePersona.id)}
                disabled={currentHistory.length === 0}
                className="text-[11px] text-muted-foreground hover:text-foreground disabled:opacity-40 transition"
              >
                Clear History
              </button>
            </header>

            {/* Chat Messages Log */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-5 py-5 space-y-4 max-h-[350px] lg:max-h-[420px]"
            >
              {/* Initial message bubble */}
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl px-4 py-3 bg-white/[0.03] text-foreground rounded-bl-md border border-white/5 text-sm leading-relaxed">
                  {activePersona.initialMessage}
                </div>
              </div>

              {/* Message loop */}
              <AnimatePresence initial={false}>
                {currentHistory.map((m, i) => (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    key={m.ts + "-" + i}
                    className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                        m.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-md font-medium"
                          : "bg-white/[0.04] text-foreground rounded-bl-md border border-white/5",
                      )}
                    >
                      {m.role === "assistant" ? (
                        <Suspense fallback={<span className="opacity-70">{m.content}</span>}>
                          <Markdown text={m.content} />
                        </Suspense>
                      ) : (
                        m.content
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="rounded-2xl bg-white/[0.03] border border-white/5 px-4 py-3 rounded-bl-md">
                    <div className="flex gap-1.5 items-center">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="size-2 rounded-full bg-primary/70 animate-bounce"
                          style={{ animationDelay: `${i * 120}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Prompt Chips */}
            <div className="px-5 pt-2 pb-1 bg-white/[0.01]">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                {activePersona.suggestions.map((p) => (
                  <button
                    key={p}
                    onClick={() => send(p)}
                    className="shrink-0 rounded-full border border-white/10 bg-white/[0.02] px-3.5 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-white/5 hover:border-primary/30 transition duration-200"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(currentInput);
              }}
              className="p-4 border-t border-white/10 bg-black/10 flex items-end gap-2"
            >
              <textarea
                ref={inputRef}
                rows={1}
                value={currentInput}
                onChange={(e) =>
                  setInputs((prev) => ({ ...prev, [activePersona.id]: e.target.value }))
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(currentInput);
                  }
                }}
                placeholder={`Ask the ${activePersona.name}...`}
                className="flex-1 resize-none rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-sm outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 max-h-32 transition duration-200"
              />
              <button
                type="submit"
                disabled={!currentInput?.trim() || isTyping}
                aria-label="Send"
                className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground disabled:opacity-40 shadow-lg hover:scale-105 active:scale-95 transition duration-200"
              >
                <Send className="size-4" />
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
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
