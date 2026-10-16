import type { Metadata } from "next";
import { ArrowUpRightIcon } from "lucide-react";
import RevealManager from "@/components/reveal-manager";
import { PageHeader, Accent } from "@/components/page-header";
import { SectionShell, SectionEyebrow } from "@/components/landing/section-shell";
import FinalCta from "@/components/landing/final-cta";
import LazyVideo from "@/components/lazy-video";
import { Button } from "@/components/ui";
import { APPS, type App } from "@/lib/landing-data";
import { SOCIAL_LINKS, WEBAPP_URL } from "@/lib/links";

export const metadata: Metadata = { title: "Apps", description: "Open source apps by Amal K Philip." };

const PRINCIPLES = [
  ["Open source", "Every project is public on GitHub. Read it, fork it, build on it."],
  ["Backend first", "Python, SQL and clean code underneath every interface."],
  ["Privacy minded", "CleanShot and Framelet process your files in the browser by default."],
  ["Runs anywhere", "Android, web and browser apps built with Kotlin, Next.js and FastAPI."],
  ["Clean code", "Small, readable projects you can understand in an afternoon."],
  ["Always shipping", "Learning in public, one commit at a time."],
];

function AppIcon({ app, size = 56 }: { app: App; size?: number }) {
  return (
    <span aria-hidden style={{ background: app.color, width: size, height: size, fontSize: size * 0.5 }}
      className="inline-flex items-center justify-center rounded-[22%] font-display font-extrabold text-white shadow-lg">
      {app.glyph}
    </span>
  );
}

export default function AppsPage() {
  return (
    <>
      <RevealManager />
      <PageHeader id="apps" index="01" label="Apps" annotation="Open source on GitHub"
        title={<>Four apps. One <Accent>developer</Accent>.</>}
        lede="Music players, privacy tools and video utilities, built with Kotlin, TypeScript and Python. Pick one to read the source."
        aside={
          <div className="mt-10 grid grid-cols-4 gap-6 xl:mt-0">
            {APPS.map((a) => (
              <a key={a.title} href={a.href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 text-center hover:opacity-80">
                <AppIcon app={a} size={64} /><span className="hud-label text-muted">{a.title}</span>
              </a>
            ))}
          </div>
        }>
        <div data-reveal className="mt-8 flex flex-wrap gap-3">
          <Button href={SOCIAL_LINKS.GITHUB} size="lg">Browse on GitHub</Button>
          <Button href={WEBAPP_URL} variant="secondary" size="lg">All 22 repositories</Button>
        </div>
      </PageHeader>

      <SectionShell id="lineup">
        <SectionEyebrow index="02" label="The lineup" annotation="Pick an app to explore" />
        <div data-reveal-group className="grid gap-px border-t border-line bg-line md:grid-cols-2 xl:grid-cols-4">
          {APPS.map((a) => (
            <a key={a.title} data-reveal href={a.href} target="_blank" rel="noopener noreferrer" className="group flex flex-col bg-bg">
              <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-2.5">
                <span className="hud-label px-1.5 py-0.5 font-bold text-white" style={{ background: a.color }}>{a.index}</span>
                <p className="hud-label text-muted">{a.label}</p>
              </div>
              <div className="relative aspect-video w-full overflow-hidden bg-bg-sunken">
                <LazyVideo src={a.video} label={`${a.title} preview`} className="absolute inset-0 h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 flex-col px-5 pb-6 pt-6">
                <div className="mb-4"><AppIcon app={a} size={48} /></div>
                <h3 className="font-display text-3xl font-medium tracking-[-0.03em]" style={{ color: a.color }}>{a.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{a.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {a.tags.map((t) => <span key={t} className="hud-label border border-line px-1.5 py-1 text-faint">{t}</span>)}
                </div>
                <p className="hud-label mt-auto flex items-center gap-1.5 pt-6 text-muted group-hover:text-ink">
                  View {a.title} on GitHub <ArrowUpRightIcon aria-hidden className="h-3.5 w-3.5" />
                </p>
              </div>
            </a>
          ))}
        </div>
      </SectionShell>

      <SectionShell id="principles">
        <SectionEyebrow index="03" label="Principles" annotation="Shared by every app" />
        <div className="px-6 py-14 md:px-10 md:py-20">
          <h2 data-reveal className="max-w-3xl font-display text-4xl font-medium leading-[1.02] tracking-[-0.035em] text-ink-strong sm:text-5xl md:text-6xl">
            Built with <Accent>care</Accent>.
          </h2>
          <p data-reveal className="mt-5 max-w-xl text-lg leading-relaxed text-muted">Every app follows the same few rules.</p>
        </div>
        <div data-reveal-group className="grid gap-px border-t border-line bg-line md:grid-cols-3">
          {PRINCIPLES.map(([t, b], i) => (
            <article key={t} data-reveal className="bg-bg p-6 md:p-8">
              <p className="hud-label text-faint">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-6 font-display text-2xl font-medium tracking-[-0.02em] text-ink-strong">{t}</h3>
              <p className="mt-2 leading-relaxed text-muted">{b}</p>
            </article>
          ))}
        </div>
      </SectionShell>

      <FinalCta />
    </>
  );
}
