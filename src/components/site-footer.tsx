import { SOCIAL_LINKS, WEBAPP_URL } from "@/lib/links";
import { APPS } from "@/lib/landing-data";

export default function SiteFooter() {
  const cols = [
    { heading: "Apps", links: APPS.map((a) => ({ name: a.title, href: a.href })) },
    { heading: "Elsewhere", links: [
      { name: "GitHub", href: SOCIAL_LINKS.GITHUB }, { name: "All repositories", href: WEBAPP_URL },
      { name: "LinkedIn", href: SOCIAL_LINKS.LINKEDIN }, { name: "X", href: SOCIAL_LINKS.X } ] },
  ];
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-[1280px] border-x border-line">
        <div className="grid gap-px bg-line md:grid-cols-[2fr_1fr_1fr]">
          <div className="bg-bg p-6 md:p-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img alt="Amal K Philip" src="/icon.svg" className="themed-logo h-8 w-auto" />
            <p className="mt-4 max-w-xs leading-relaxed text-muted">i don’t debug, i manifest fixes.</p>
          </div>
          {cols.map((c) => (
            <nav key={c.heading} aria-label={c.heading} className="bg-bg p-6 md:p-8">
              <p className="hud-label text-faint">{c.heading}</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {c.links.map((l) => (<li key={l.name}><a href={l.href} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-ink">{l.name}</a></li>))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="flex flex-col gap-2 border-t border-line px-6 py-4 md:flex-row md:items-center md:justify-between md:px-10">
          <p className="hud-label text-faint">© {new Date().getFullYear()} Amal K Philip</p>
          <p className="hud-label text-faint">Layout inspired by ArtCraft (open source)</p>
        </div>
      </div>
    </footer>
  );
}
