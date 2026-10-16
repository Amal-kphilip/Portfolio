import { SectionShell, SectionEyebrow } from "./section-shell";

const STACK = [
  { label: "Languages", title: "Python, Java, C, C++, JS", body: "Plus Kotlin and TypeScript for the apps above." },
  { label: "Data", title: "MySQL, PostgreSQL, SQLite", body: "Database design and query optimization." },
  { label: "Learning", title: "System design", body: "One commit at a time." },
];

export default function MadeWith({ index = "03" }: { index?: string }) {
  return (
    <SectionShell id="made-with">
      <SectionEyebrow index={index} label="Stack" annotation="What I work with" />
      <div className="px-6 py-14 md:px-10 md:py-20">
        <h2 data-reveal className="max-w-3xl font-display text-4xl font-medium leading-[1.02] tracking-[-0.035em] text-ink-strong sm:text-5xl md:text-6xl">
          Tools I <span className="font-serif italic font-normal">reach</span> for.
        </h2>
      </div>
      <div data-reveal-group className="grid gap-px border-t border-line bg-line md:grid-cols-3">
        {STACK.map((s, i) => (
          <article key={s.label} data-reveal className="bg-bg p-6 md:p-8">
            <div className="flex justify-between"><p className="hud-label text-muted">{s.label}</p><p className="hud-label text-faint">{String(i + 1).padStart(2, "0")}</p></div>
            <h3 className="mt-6 font-display text-2xl font-medium tracking-[-0.02em] text-ink-strong">{s.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
