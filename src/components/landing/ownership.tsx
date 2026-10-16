import { GitHubIcon } from "@/components/icons";
import { Button } from "@/components/ui";
import { SOCIAL_LINKS } from "@/lib/links";
import { SectionShell, SectionEyebrow } from "./section-shell";

const PILLARS = [
  {
    index: "A",
    title: "Public code",
    body: "All projects live on GitHub. Read the source and see how each app is put together.",
    href: SOCIAL_LINKS.GITHUB,
  },
  {
    index: "B",
    title: "Backend first",
    body: "Python, SQL and clean code underneath every interface.",
  },
  {
    index: "C",
    title: "Privacy minded",
    body: "CleanShot and Framelet do their work in your browser by default.",
  },
];

export default function Ownership({ index = "02" }: { index?: string }) {
  return (
    <SectionShell id="ownership">
      <SectionEyebrow index={index} label="Open source" annotation="Public on GitHub" />

      <div className="px-6 py-14 md:px-10 md:py-20">
        <h2
          data-reveal
          className="max-w-3xl font-display text-4xl font-medium leading-[1.02] tracking-[-0.035em] text-ink-strong sm:text-5xl md:text-6xl"
        >
          Built in the{" "}
          <span className="font-serif italic font-normal">open</span>.
        </h2>
        <p data-reveal className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
          Read it, run it, fork it. Every app on this page is public.
        </p>
      </div>

      <div data-reveal-group className="grid gap-px border-t border-line bg-line md:grid-cols-3">
        {PILLARS.map((pillar) => (
          <article key={pillar.index} data-reveal className="bg-bg p-6 md:p-8">
            <p className="hud-label text-faint">{pillar.index}</p>
            <h3 className="mt-6 font-display text-2xl font-medium tracking-[-0.02em] text-ink-strong">
              {pillar.title}
            </h3>
            <p className="mt-2 leading-relaxed text-muted">{pillar.body}</p>
            {pillar.href && (
              <Button
                href={pillar.href}
                variant="secondary"
                size="sm"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 gap-1.5 font-medium"
              >
                <GitHubIcon className="h-3.5 w-3.5" />
                View source
              </Button>
            )}
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
