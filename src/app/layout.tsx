import type { Metadata, Viewport } from "next";
import {
  Archivo,
  Instrument_Serif,
  Inter,
  Geist_Mono,
} from "next/font/google";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";
import IntroConductor from "@/components/intro-conductor";
import MotionProvider from "@/components/motion-provider";
import ScrollRuler from "@/components/ruler/scroll-ruler";
import { SITE_URL } from "@/lib/links";
import "./globals.css";

// Display face: variable Archivo with its width axis loaded — headings run
// slightly expanded (font-stretch) for the industrial-grotesque look, and
// the hero wordmark renders the same family at its poster extreme
// (wght 900 / wdth 125%, the Archivo Black look) so the ruler's hero flip
// can interpolate weight and width down to the heading setting. A separate
// Archivo Black cut could never interpolate.
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
  axes: ["wdth"],
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Amal K Philip — Apps", template: "%s — Amal K Philip" },
  description: "Open source apps by Amal K Philip: music players, privacy tools and video utilities.",
  icons: { icon: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f1ee" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0c" },
  ],
};

const JSON_LD = { "@context": "https://schema.org", "@type": "Person", name: "Amal K Philip", url: SITE_URL, sameAs: ["https://github.com/Amal-kphilip"] };

// Applies the stored theme before first paint so neither theme flashes.
// System preference is the default; an explicit user choice is persisted
// as "light" | "dark" under this key by the navbar toggle. Also stamps
// data-intro when the intro will play (JS + motion allowed), so the
// wordmark letters are CSS-hidden BEFORE first paint — without it, the
// full word flashes for the frames between paint and hydration, then
// snaps into the logo-only formation start.
//
// Also reloads on back/forward-cache restores (pageshow with persisted):
// a bfcache-restored page thaws with its WebGL context discarded in some
// browsers, leaving a dead galaxy canvas — a reload swaps it for a clean
// load, and the intro is seen-flagged by then so it comes back settled.
// (The Firefox back-navigation hydration failure was a different bug:
// Next's router crashed on back_forward loads — "Router action dispatched
// before initialization" — fixed by the Next 16.2.12 patch bump.)
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("amal-theme");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t);}}catch(e){}try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.setAttribute("data-intro","");}}catch(e){}addEventListener("pageshow",function(e){if(e.persisted)location.reload();});})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${archivo.variable} ${instrumentSerif.variable} ${inter.variable} ${geistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <MotionProvider>
          {/* First child: its effect must run before every intro consumer
              (the ruler cascade reads introClock.scale at mount). */}
          <IntroConductor />
          <SiteNav />
          <main id="main">{children}</main>
          <SiteFooter />
          <ScrollRuler />
        </MotionProvider>
      </body>
    </html>
  );
}
