// Tiny, dependency-free Markdown renderer: handles fenced code, bold, italic,
// inline code, blockquotes, and lists — enough for the assistant's answers.
import { Fragment } from "react";

function renderInline(text: string) {
  const parts: React.ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith("**")) {
      parts.push(<strong key={k++}>{tok.slice(2, -2)}</strong>);
    } else if (tok.startsWith("`")) {
      parts.push(
        <code
          key={k++}
          className="rounded bg-black/40 px-1 py-0.5 font-mono text-[0.85em] text-primary"
        >
          {tok.slice(1, -1)}
        </code>,
      );
    } else {
      parts.push(<em key={k++}>{tok.slice(1, -1)}</em>);
    }
    last = m.index + tok.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export default function Markdown({ text }: { text: string }) {
  const blocks = text.split(/\n{2,}/);
  return (
    <div className="space-y-2">
      {blocks.map((b, i) => {
        const fence = b.match(/^```(\w+)?\n([\s\S]*?)```$/);
        if (fence) {
          return (
            <pre
              key={i}
              className="overflow-x-auto rounded-lg border border-white/10 bg-black/50 p-3 font-mono text-[11px] leading-relaxed"
            >
              <code>{fence[2]}</code>
            </pre>
          );
        }
        if (b.startsWith("> ")) {
          return (
            <blockquote
              key={i}
              className="border-l-2 border-primary/60 pl-3 text-muted-foreground italic"
            >
              {renderInline(b.replace(/^> /gm, ""))}
            </blockquote>
          );
        }
        if (/^\s*(?:[-*]|\d+\.)\s/.test(b)) {
          const ordered = /^\s*\d+\./.test(b);
          const items = b.split("\n").map((l) => l.replace(/^\s*(?:[-*]|\d+\.)\s/, ""));
          const List = ordered ? "ol" : "ul";
          return (
            <List
              key={i}
              className={
                ordered
                  ? "list-decimal pl-5 space-y-1"
                  : "list-disc pl-5 space-y-1 marker:text-primary/70"
              }
            >
              {items.map((it, j) => (
                <li key={j}>{renderInline(it)}</li>
              ))}
            </List>
          );
        }
        return (
          <p key={i}>
            {b.split("\n").map((line, j) => (
              <Fragment key={j}>
                {j > 0 && <br />}
                {renderInline(line)}
              </Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
