export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
export const WEBAPP_URL = "https://github.com/Amal-kphilip?tab=repositories";
export const MEDIA_BASE = "";
export function webappUrl(path: string): string { return `${WEBAPP_URL}${path.replace(/^\//, "")}`; }
export function mediaUrl(path: string): string { return `${MEDIA_BASE}${path.startsWith("/") ? path : `/${path}`}`; }
export const SOCIAL_LINKS = {
  GITHUB: "https://github.com/Amal-kphilip",
  X: "https://x.com/AmalkPhilip",
  LINKEDIN: "https://www.linkedin.com/in/amal-k-philip",
} as const;
