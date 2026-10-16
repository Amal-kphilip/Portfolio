# Amal K Philip — Apps

Portfolio site for GitHub apps. The layout and animations (3D hero galaxy, scroll ruler, intro, smooth scroll) are adapted from the open-source ArtCraft website (`artcraft-website-next`) that you provided.

## Run locally
Requires Node 20.9+.

    npm install
    npm run dev      # http://localhost:3000
    npm run build && npm start

## Edit content
- `src/lib/landing-data.ts` — the apps list, ticker words, scroll-ruler sections, hero clips
- `src/components/landing/*.tsx` — headlines and copy per section
- `src/lib/links.ts` — GitHub / X / LinkedIn links
- `public/videos/showcase/001-012.mp4` — the looping clips that orbit in the hero. Replace them with screen recordings of your apps (keep the file names, or change `SHOWCASE_CLIP_COUNT`).
- `public/icon.svg` — the logo mark (also drawn in the hero wordmark in `hero-wordmark.tsx`)
