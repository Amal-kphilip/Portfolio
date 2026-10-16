import { ArrowUpRightIcon } from "lucide-react";
import { APPS } from "@/lib/landing-data";
import { WEBAPP_URL } from "@/lib/links";
import LazyVideo from "@/components/lazy-video";
import { SectionShell, SectionEyebrow } from "./section-shell";


// Feature grid: hairline-separated cells (gap-px over the line color).
// The studio demo leads full-width — the announce strip as its header, the
// blocking↔render comparator as its body — then the seven features and the
// launch-CTA cell split an even two-column grid. Every feature cell is
// index + label + real product footage + copy — no illustration, only the
// actual tool. `index` is the section's eyebrow number — the section is
// reused on other pages where it sits at a different position.
export default function Features({ index = "01" }: { index?: string }) {
  return (
    <SectionShell id="features">
      <SectionEyebrow
        index={index}
        label="Apps"
        annotation="Pinned on GitHub"
      />

      <div className="px-6 py-14 md:px-10 md:py-20">
        <h2
          data-reveal
          className="max-w-3xl font-display text-4xl font-medium leading-[1.02] tracking-[-0.035em] text-ink-strong sm:text-5xl md:text-6xl"
        >
          Four apps,{" "}
          <span className="font-serif italic font-normal">all</span> open
          source.
        </h2>
        <p data-reveal className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
          Each one is a working project with its code on GitHub. Open a card to read the source.
        </p>
      </div>

      <div
        data-reveal-group
        className="grid gap-px border-t border-line bg-line md:grid-cols-2"
      >

        {APPS.map((feature) => (
          <FeatureCell key={feature.index} feature={feature} />
        ))}

        {/* Eighth cell: the launch CTA, full-sized like its siblings — the
            grid stays even and the section ends on a door into the app. */}
        <a data-reveal href={WEBAPP_URL} className="group flex flex-col bg-bg">
          <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-2.5 md:px-8">
            <p className="hud-label text-muted">More on GitHub</p>
            <p className="hud-label text-faint">08</p>
          </div>
          <div className="relative flex aspect-video w-full flex-col items-center justify-center gap-4 overflow-hidden bg-bg-sunken">
            <span className="flex h-14 w-14 items-center justify-center border border-line-strong text-ink transition-colors group-hover:bg-invert-bg group-hover:text-invert-fg">
              <ArrowUpRightIcon className="h-6 w-6" />
            </span>
            <p className="hud-label text-faint">github.com/Amal-kphilip</p>
            <span aria-hidden className="tick top-2 left-2 opacity-60" />
            <span aria-hidden className="tick bottom-2 right-2 opacity-60" />
          </div>
          <div className="px-6 py-6 md:px-8">
            <h3 className="font-display text-2xl font-medium tracking-[-0.02em] text-ink-strong">
              Browse all 22 repositories
            </h3>
            <p className="mt-2 max-w-xl leading-relaxed text-muted">
              The rest of the projects, experiments and coursework live on GitHub.
            </p>
          </div>
        </a>
      </div>
    </SectionShell>
  );
}

function FeatureCell({ feature }: { feature: (typeof APPS)[number] }) {
  return (
    <a data-reveal href={feature.href} target="_blank" rel="noopener noreferrer" className="group block bg-bg">
      <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-2.5 md:px-8">
        <p className="hud-label text-muted">{feature.label}</p>
        <p className="hud-label text-faint">{feature.index}</p>
      </div>
      <div className="relative aspect-video w-full overflow-hidden bg-bg-sunken">
        <LazyVideo
          src={feature.video}
          label={`${feature.title} demo`}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div className="px-6 py-6 md:px-8">
        <h3 className="font-display text-2xl font-medium tracking-[-0.02em] text-ink-strong">
          {feature.title}
        </h3>
        <p className="mt-2 max-w-xl leading-relaxed text-muted">
          {feature.description}
        </p>
        <p className="hud-label mt-4 text-accent-ink">{feature.tags.join(" · ")}</p>
      </div>
    </a>
  );
}
