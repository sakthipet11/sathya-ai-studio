import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { SectionHeader } from "./About";
import { Send, MapPin, Mail, Github, Linkedin, ShieldCheck } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(2, "Please share your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  message: z.string().trim().min(10, "A little more detail helps").max(1500),
});

type FormState = { name: string; email: string; message: string };

export function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const fe: Partial<FormState> = {};
      parsed.error.issues.forEach((i) => {
        fe[i.path[0] as keyof FormState] = i.message;
      });
      setErrors(fe);
      return;
    }
    setErrors({});
    setStatus("sending");
    // Simulated success — wire to real endpoint later.
    await new Promise((r) => setTimeout(r, 900));
    setStatus("sent");
    toast.success("Message received", {
      description: "This is a simulated success. Wire the form to a mail service or backend to enable delivery.",
    });
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setStatus("idle"), 2400);
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeader
          eyebrow="Contact"
          title="Let's build something considered."
          description="Send a note and I'll follow up. Direct channels are shared on request rather than posted publicly."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          <form onSubmit={submit} className="lg:col-span-3 glass rounded-3xl p-6 md:p-8 space-y-4" noValidate>
            <Field
              label="Your name"
              id="name"
              value={form.name}
              onChange={(v) => setForm({ ...form, name: v })}
              error={errors.name}
              autoComplete="name"
            />
            <Field
              label="Email"
              id="email"
              type="email"
              value={form.email}
              onChange={(v) => setForm({ ...form, email: v })}
              error={errors.email}
              autoComplete="email"
            />
            <div>
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                aria-invalid={!!errors.message}
                className="mt-1 w-full rounded-xl bg-black/30 border border-white/10 px-3.5 py-2.5 text-sm outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/25 resize-none"
                placeholder="A few lines about the project, team or role."
              />
              {errors.message && (
                <p className="mt-1 text-xs text-destructive">{errors.message}</p>
              )}
            </div>
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="size-3.5" />
                Validated client-side, never stored or shared.
              </div>
              <button
                type="submit"
                disabled={status !== "idle"}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground btn-glow disabled:opacity-70"
              >
                {status === "sending" ? "Sending…" : status === "sent" ? "Sent" : (
                  <>
                    Send message <Send className="size-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          <aside className="lg:col-span-2 space-y-4">
            <InfoLine icon={Mail} label="Email" value="available on request" />
            <InfoLine icon={Linkedin} label="LinkedIn" value="available on request" />
            <InfoLine icon={Github} label="GitHub" value="available on request" />
            <InfoLine icon={MapPin} label="Location" value="India" />
            <div className="glass rounded-2xl p-5 text-sm text-muted-foreground leading-relaxed">
              Prefer async? Drop a message and I'll reply with a scheduling link and the fastest
              channel for your conversation.
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        className="mt-1 w-full rounded-xl bg-black/30 border border-white/10 px-3.5 py-2.5 text-sm outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/25"
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function InfoLine({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
}) {
  return (
    <div className="glass rounded-2xl p-4 flex items-center gap-3">
      <span className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-4" />
      </span>
      <div>
        <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className="text-sm">{value}</div>
      </div>
    </div>
  );
}
