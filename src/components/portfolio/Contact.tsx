import { useState } from "react";
import { z } from "zod";
import { SectionHeader } from "./About";
import { Send, MapPin, Mail, Linkedin, ShieldCheck } from "lucide-react";
import { PROFILE } from "@/lib/portfolio-data";
import { ScrollReveal } from "./ScrollReveal";

const schema = z.object({
  name: z.string().trim().min(2, "Please share your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  message: z.string().trim().min(10, "A little more detail helps").max(1500),
});
type FormState = { name: string; email: string; message: string };

export function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const next: Partial<FormState> = {};
      parsed.error.issues.forEach((issue) => {
        next[issue.path[0] as keyof FormState] = issue.message;
      });
      setErrors(next);
      return;
    }
    setErrors({});
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
  };
  return (
    <section id="contact" className="relative py-16 md:py-20 scroll-mt-24">
      <div className="mx-auto max-w-6xl px-4">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Contact"
            title="Let's build something considered."
            description="For roles, architecture conversations or collaborations, get in touch directly."
          />
        </ScrollReveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          <ScrollReveal direction="up" delay={0.15} className="lg:col-span-3">
            <form onSubmit={submit} className="glass rounded-3xl p-6 md:p-8 space-y-4" noValidate>
              <Field
                label="Your name"
                id="name"
                value={form.name}
                onChange={(name) => setForm({ ...form, name })}
                error={errors.name}
                autoComplete="name"
              />
              <Field
                label="Email"
                id="email"
                type="email"
                value={form.email}
                onChange={(email) => setForm({ ...form, email })}
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
                  <ShieldCheck className="size-3.5" /> Opens your email client - no form data is
                  stored.
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground btn-glow"
                >
                  Email Sathyanantham <Send className="size-4" />
                </button>
              </div>
            </form>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.25} className="lg:col-span-2 space-y-4">
            <aside className="space-y-4">
              <a href={`mailto:${PROFILE.email}`} className="block">
                <InfoLine icon={Mail} label="Email" value={PROFILE.email} />
              </a>
              <a href={PROFILE.linkedIn} target="_blank" rel="noreferrer" className="block">
                <InfoLine icon={Linkedin} label="LinkedIn" value="Sathyanantham V" />
              </a>
              <InfoLine icon={MapPin} label="Location" value={PROFILE.location} />
            </aside>
          </ScrollReveal>
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
    <div className="glass rounded-2xl p-4 flex items-center gap-3 transition hover:border-primary/40">
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
