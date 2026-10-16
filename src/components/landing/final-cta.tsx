import { SOCIAL_LINKS, WEBAPP_URL } from "@/lib/links";
import { Button } from "@/components/ui";
import { SectionShell } from "./section-shell";

export default function FinalCta() {
  return (
    <SectionShell id="start">
      <div className="flex flex-col items-center px-6 py-20 text-center md:py-28">
        <p className="hud-label text-faint">Open source · Kerala, India</p>
        <h2
          data-reveal
          className="mt-6 max-w-4xl font-display text-5xl font-medium leading-[0.98] tracking-[-0.04em] text-ink-strong sm:text-6xl md:text-7xl"
        >
          Read the{" "}
          <span className="font-serif italic font-normal">code</span>.
        </h2>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
          Star a repo, open an issue, or say hello.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button href={SOCIAL_LINKS.GITHUB} size="lg">
            View GitHub profile
          </Button>
          <Button href={WEBAPP_URL} variant="secondary" size="lg">
            All repositories
          </Button>
        </div>
      </div>
    </SectionShell>
  );
}
