# Monmora Online website

An independent Thai-language Next.js website for Monmora Online. Original chibi key art, illustrated lotus borders, Thai gold ornaments, warm parchment, emerald green and gold carry the game's Thai fantasy identity into a responsive web portal.

## Run locally

Use Node.js 22.9+ and the committed npm lockfile. This project was verified with Node 26.13.0.

```sh
npm ci
npm run dev
```

Open http://localhost:3200. For a production build:

```sh
npm run build
npm run start
```

The information website runs independently on port 3200; no game server is required.

## Configure

Copy `.env.example` to `.env.local`, then set:

- `NEXT_PUBLIC_SITE_URL`: this website's canonical origin. Defaults to `http://localhost:3200`.

Restart development or rebuild production after changing this value. Set it to the public HTTPS website origin before deploying. This pre-launch site has no game-entry links, account registration or notification subscription system.

## Included

- Art-led home page with a responsive navigation menu.
- Three selectable class profiles with original chibi illustrations.
- Five selectable regional destinations using the game's original prototype map art.
- Three complete guide articles at `/journal/first-adventure`, `/journal/five-regions` and `/journal/make-it-yours`.
- Keyboard-accessible gallery dialog, expandable FAQ and custom 404.
- Four-stage pre-launch timeline. Coming-soon CTAs navigate to this section; future dates await announcements.
- Local FC Vision / FC Vision Wide fonts, metadata, social preview and favicon.

Edit copy, guide content and the launch roadmap in `lib/content.ts`; page interactions in `components/Site.tsx`; visual styles in `app/globals.css`. Update game controls and world descriptions if the game changes. The regional material describes the prototype game world, not historical reconstructions.

## Verify

```sh
npm run typecheck
npm run build
# Start the server first; requires Google Chrome installed.
npm run test:e2e
```

Browser checks use headless Chrome through Playwright. `TEST_BASE_URL` can override the local test origin. Screenshots and the latest check results are written to `docs/qa/`. See `docs/TEST_REPORT.md` for observed results and `docs/ART.md` for asset provenance.

This project has been saved and previewed locally. It has not been published to public hosting.

## Supplied fonts

FC Vision and FC Vision Wide are loaded with next/font/local from app/fonts. These supplied OTFs are the static Heavy weight (850), not variable fonts. The previous Noto font dependencies were removed. Thai shaping is left to the browser; no letter-spacing or disabled OpenType shaping is applied.

The supplied package is marked Non-commercial. Its original license memo is retained at app/fonts/LICENSE.original.txt, with a readable note at app/fonts/LICENSE.md. Before commercial publication, verify the required commercial and web-embedding rights with Fontcraft. No commercial certificate was supplied in this task.
