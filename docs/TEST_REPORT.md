# Verification report

2026-11-06, local macOS, Node 26.13.0, npm 11.20.0. Production Next.js 16.4.5 / React 19.3.1 build served at http://127.0.0.1:3200.

| Check | Observed result |
| --- | --- |
| `npm run typecheck` | Passed, no TypeScript errors. |
| `npm run build` | Passed; home, three guide pages, not-found and robots generated. |
| `npm run test:e2e` | 61/61 browser assertions passed against the final production build. |
| Responsive width | No document horizontal overflow at 320, 390, 768 or 1440 CSS px. |
| Class profiles | All three tabs update the active panel and show loaded illustration; arrow-key selection works. |
| Regional explorer | All five regional panels selectable; Home key returns to first region. |
| Gallery | Opens, advances image, closes with Escape and restores trigger focus. |
| Mobile menu | Opens and closes after selecting a navigation destination. |
| FAQ | Native details expands. |
| Guides | Three article URLs return HTTP 200 and render at least three content sections; no mobile overflow. |
| Invalid guide | Returns HTTP 404. |
| Robots / favicon | HTTP 200. |
| Browser errors / failed requests | Zero observed page errors and zero failed application/image requests on tested paths. |
| Pre-launch CTAs | Homepage links navigate to #timeline; all three article CTAs point to /#timeline. |
| No game connection | No external game links in homepage or any of the three guide pages; source has no GAME_URL setting. |
| FC Vision fonts | Computed body family vision, heading family visionWide; both supplied local faces loaded at weight 850. |
| Decorative graphics | Lotus border HTTP 200; decorative art has pointer-events none; class/world/gallery controls remain functional. |
| Launch roadmap | Four ordered stages, only information stage current; future milestones await announcements. |

Visually inspected desktop home, archer profile, mobile hero, mobile class showcase, regional explorer, guide article and gallery. Corrected mobile artwork overlapping the class tabs and a neighboring atlas glow at the archer viewport edge; rebuilt, restarted and repeated all browser checks successfully.

Latest pre-launch revision: visually inspected desktop timeline, mobile timeline and mobile hero. All existing class, region, gallery, FAQ and article checks also passed.

Artifacts: `docs/qa/desktop-timeline.png`, `docs/qa/mobile-timeline.png`, `docs/qa/results.json`, `desktop.png`, `desktop-class.png`, `mobile-top.png`, `mobile-class.png`, `mobile-world.png`, `mobile-guide.png`, `gallery.png`.

Scope limits: local website verification only. No account creation/login, database mutations, public deployment, load testing or full accessibility audit was performed. The site has no game connection, registration or notification subscription. Public hosting requires the real canonical site URL in the environment and a new build. No opening date has been asserted. Game art is original prototype illustration, not a claim of historical precision or production readiness.

## FC Vision / illustrated UI revision

Rebuilt after the final mobile heading line-break correction, restarted the production server, and ran all 61 assertions successfully. Zero browser JS errors and zero failed application/image requests. Visually inspected full desktop home, mobile hero, mobile class showcase and desktop timeline. FC Vision Heavy is the actual weight supplied (850); body uses the standard-width face and headings the Wide face. Supplied font memo is Non-commercial; commercial publication rights have not been verified or acquired.

Original lotus border generated with the built-in imagegen tool and saved within public/art. Class and timeline backgrounds use copied original game prototype maps. Decorative imagery does not handle interaction. Hero motes have a prefers-reduced-motion override. No public deployment performed.
