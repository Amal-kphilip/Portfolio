import { mediaUrl } from "./links";

export type App = {
  index: string; label: string; title: string; description: string;
  video: string; href: string; tags: string[]; color: string; glyph: string;
};

// Edit this list to add or change apps. `video` is a looping clip in public/videos/showcase.
export const APPS: App[] = [
  { index: "01", label: "Android", title: "Geekify App", color: "#2d81ff", glyph: "G", href: "https://github.com/Amal-kphilip/Geekify-App", tags: ["Kotlin", "Jetpack Compose", "Material 3"],
    description: "A modern Android music player and streaming app with playlists, library, search and audio playback.", video: mediaUrl("/videos/showcase/001.mp4") },
  { index: "02", label: "Web", title: "Geekify", color: "#8b5cf6", glyph: "G", href: "https://github.com/Amal-kphilip/Geekify", tags: ["TypeScript", "Next.js", "FastAPI"],
    description: "A full-stack music streaming app with search, playback, playlists and personalised recommendations.", video: mediaUrl("/videos/showcase/002.mp4") },
  { index: "03", label: "Privacy tool", title: "CleanShot", color: "#10b981", glyph: "C", href: "https://github.com/Amal-kphilip/CleanShot", tags: ["TypeScript", "Browser-side"],
    description: "Inspect and remove photo metadata. Processing runs in your browser by default, with an optional server mode.", video: mediaUrl("/videos/showcase/003.mp4") },
  { index: "04", label: "Video tool", title: "Framelet", color: "#f59e0b", glyph: "F", href: "https://github.com/Amal-kphilip/Framelet", tags: ["TypeScript", "Next.js", "React"],
    description: "Extract still frames from short videos in your browser, with accurate file names and an accessible interface.", video: mediaUrl("/videos/showcase/004.mp4") },
];

// Hero galaxy cards: local looping clips (12 files). Replace them with screen recordings of your apps.
const SHOWCASE_CLIP_COUNT = 12;
export type SeedanceClip = { src: string; aspect: number };
export const SEEDANCE_SHOWCASE: SeedanceClip[] = Array.from({ length: SHOWCASE_CLIP_COUNT }, (_, i) => ({
  src: mediaUrl(`/videos/showcase/${String(i + 1).padStart(3, "0")}.mp4`), aspect: 16 / 9,
}));

export type RulerSection = { id: string; label: string };
export const HERO_SECTION_ID = "hero";
export const RULER_SECTIONS: RulerSection[] = [
  { id: HERO_SECTION_ID, label: "AMAL" },
  { id: "apps", label: "APPS" },
  { id: "lineup", label: "LINEUP" },
  { id: "principles", label: "PRINCIPLES" },
  { id: "features", label: "FEATURES" },
  { id: "ownership", label: "OPEN SOURCE" },
  { id: "made-with", label: "STACK" },
  { id: "start", label: "GITHUB" },
];

export const TICKER_ITEMS = ["Kotlin", "Jetpack Compose", "Next.js", "FastAPI", "TypeScript", "React", "Python", "Java", "SQL", "PostgreSQL", "SQLite"];
