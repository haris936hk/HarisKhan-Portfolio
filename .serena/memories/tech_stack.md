# Tech Stack

## Core
- **Next.js 14.1.4** (App Router, no Pages Router)
- **React 18**, **TypeScript 5** (strict mode, `@/*` path alias)
- **Tailwind CSS 3.4** + `tailwindcss-animate`, PostCSS + autoprefixer

## Animation / 3D
- **Framer Motion 11** — all UI animations (scroll nav, hover, text reveal, borders)
- **Three.js 0.163** + **@react-three/fiber 8** + **@react-three/drei 9** — globe + CanvasRevealEffect GLSL shaders
- **three-globe 2.31** — pre-built globe wrapper used in GridGlobe
- **lottie-react 2.4** + **react-lottie 1.2** — confetti animation in BentoGrid item 6

## Styling utilities
- **clsx 2.1** + **tailwind-merge 2.2** (exposed as `cn()` in `lib/utils.ts`)
- **mini-svg-data-uri 1.4** — inline SVG bg patterns (`bg-grid`, `bg-dot`)
- **next-themes 0.3** — theme provider
- **class-variance-authority 0.7**, **lucide-react 0.365**, **@tabler/icons-react 3.1**, **react-icons 5**

## Observability
- **@sentry/nextjs 9.35** — server, client, edge runtime; session replay 10% / 100% on error

## Deployment
- **Vercel** (CLI via `vercel` package 34.x) — `npm run deploy` triggers `vercel --prod`

## Package manager
- **npm** (package-lock.json present)

## Custom Tailwind tokens
- `black-100` (#000319), `black-200` (rgba 17,25,40,0.75), `black-300` (rgba 255,255,255,0.125)
- `white-100` (#BEC1DD), `white-200` (#C1C2D3)
- `purple` (#CBACF9) — primary accent
- `blue-100` (#E4ECFF)
