import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { MessageSquare, X, Send, Sparkles } from "lucide-react";
import { SUGGESTED_PROMPTS } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";
import { askAssistant } from "@/lib/assistant-actions";

const Markdown = lazy(() => import("./Markdown"));

type Msg = { role: "user" | "assistant"; content: string; ts: number };

const STORAGE = "sv-chat-history-v1";

export function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE);
      if (raw) setMessages(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE, JSON.stringify(messages.slice(-40)));
    } catch {
      /* ignore */
    }
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  const send = async (text: string) => {
    const q = text.trim();
    if (!q) return;
    const now = Date.now();
    const newMessages: Msg[] = [...messages, { role: "user", content: q, ts: now }];
    setMessages(newMessages);
    setInput("");
    setTyping(true);

    try {
      const reply = await askAssistant({
        data: {
          history: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        },
      });
      setMessages((m) => [...m, { role: "assistant", content: reply, ts: Date.now() }]);
    } catch (err) {
      console.error("Error asking assistant:", err);
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: "Sorry, I had trouble reaching the assistant. Please try again.",
          ts: Date.now(),
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        aria-expanded={open}
        className={cn(
          "fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-full transition-all",
          "bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-xl shadow-primary/30",
          "hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/40",
        )}
      >
        {open ? <X className="size-5" /> : <MessageSquare className="size-5" />}
        {!open && (
          <span className="absolute -top-1 -right-1 size-3 rounded-full bg-primary animate-ping opacity-70" />
        )}
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Portfolio AI assistant"
          className="fixed bottom-24 right-5 z-50 w-[min(94vw,420px)] h-[min(75vh,620px)] flex flex-col rounded-3xl glass-strong shadow-2xl shadow-black/40 overflow-hidden"
        >
          <header className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
            <span className="grid size-9 place-items-center rounded-xl bg-primary/15 text-primary">
              <Sparkles className="size-4" />
            </span>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm">Ask about Sathyanantham</div>
              <div className="text-[11px] text-muted-foreground truncate">
                Resume-informed portfolio assistant
              </div>
            </div>
            <button
              onClick={() => setMessages([])}
              className="text-[11px] text-muted-foreground hover:text-foreground"
            >
              Clear
            </button>
          </header>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {messages.length === 0 && (
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-sm text-muted-foreground">
                Hi! I answer from a curated knowledge base about Sathyanantham's verified
                experience. Try a suggestion below.
              </div>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                    m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-white/[0.04] text-foreground rounded-bl-md",
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
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-white/[0.04] px-3.5 py-3 rounded-bl-md">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="size-1.5 rounded-full bg-primary/70 animate-bounce"
                        style={{ animationDelay: `${i * 120}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="px-3 pb-2">
            <div className="flex gap-1.5 overflow-x-auto pb-2">
              {SUGGESTED_PROMPTS.map((p) => (
                <button
                  key={p}
                  onClick={() => send(p)}
                  className="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[11px] text-muted-foreground hover:text-foreground hover:bg-white/10 transition"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="p-3 border-t border-white/10 flex items-end gap-2"
          >
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(input);
                }
              }}
              placeholder="Ask a question..."
              className="flex-1 resize-none rounded-xl bg-black/30 border border-white/10 px-3 py-2 text-sm outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/25 max-h-32"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              aria-label="Send"
              className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground disabled:opacity-40"
            >
              <Send className="size-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
