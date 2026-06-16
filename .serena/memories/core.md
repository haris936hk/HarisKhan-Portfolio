# Core — HarisKhan-Portfolio

Single-page Next.js 14 (App Router) portfolio site. All sections on one page.

## Page composition (app/page.tsx)
FloatingNav → Hero → Grid → RecentProjects → Clients → Experience → Approach → Footer

## Content source of truth
`data/index.ts` — ALL portfolio content lives here (navItems, gridItems, projects, qualifications, companies, workExperience, socialMedia). Only touch this file for content updates.

## Key invariants
- Dark mode forced via `defaultTheme="dark"` in `app/provider.tsx` — UI is dark-optimised only.
- `cn()` from `lib/utils.ts` (clsx + tailwind-merge) is mandatory for all conditional class merging.
- `.heading` utility class (`globals.css`): `font-bold text-4xl md:text-5xl text-center` — used for all section headings.
- Dynamic imports with `ssr: false` required for WebGL/canvas: `GridGlobe` and `LottieConfetti`.
- Sentry DSN is hardcoded in three files — update all three if rotating: `sentry.server.config.ts`, `sentry.edge.config.ts`, `instrumentation-client.ts`.

## Special BentoGridItem IDs
- ID 2 → renders `GridGlobe` (3D Three.js globe)
- ID 3 → animated tech stack lists
- ID 6 → email-copy button + confetti on success

## Directory map
- `app/` — layout, page, provider, globals.css
- `components/` — full page sections; `components/ui/` — visual primitives (Aceternity UI patterns)
- `data/` — index.ts (content), confetti.json, globe.json
- `lib/utils.ts` — cn() helper
- `public/` — static assets (SVGs, images, resume PDF)

See `mem:tech_stack`, `mem:conventions`, `mem:suggested_commands`, `mem:task_completion`.
