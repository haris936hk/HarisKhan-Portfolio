# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Serena MCP

This project uses the **Serena MCP** for code intelligence. Always call `mcp__serena__initial_instructions` at the start of any coding task before reading or editing files.

- Use Serena's symbolic tools (`get_symbols_overview`, `find_symbol`, `find_referencing_symbols`) for discovery and navigation — do **not** use `Read` or `Grep` for code files when Serena can answer the question.
- Use Serena's editing tools (`replace_symbol_body`, `replace_content`, `insert_after_symbol`, `insert_before_symbol`) for all code edits — do **not** use the built-in `Edit` tool on code files.
- Project memories are stored under `.serena/memories/`. Run `serena memories check` to validate references.

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Production build
npm run lint     # ESLint via next lint
npm run deploy   # Deploy to Vercel production
```

## Architecture

This is a **single-page Next.js 14 (App Router) portfolio site**. All sections render on one page — [app/page.tsx](app/page.tsx) composes the full page from section components in order:

```
FloatingNav → Hero → Grid → RecentProjects → Clients → Experience → Approach → Footer
```

**Content is centralized.** All portfolio data (projects, work experience, qualifications, nav items, social links) lives exclusively in [data/index.ts](data/index.ts). This is the only file to touch when updating content.

**Component split:**
- `components/` — full page sections (Hero, Grid, Experience, etc.)
- `components/ui/` — visual primitives (Spotlight, MovingBorders, Pin, Globe, BentoGrid, etc.) — most derived from Aceternity UI patterns

**No global state management.** State is local to each component (hover, copy, selected). Data flows only from `data/index.ts` → parent section component → child UI component via props.

**Theme:** Dark mode is the default (forced via `defaultTheme="dark"` in provider). `next-themes` wraps the app in [app/provider.tsx](app/provider.tsx). Light mode CSS variables are defined but the UI is dark-optimized.

**3D / animation runtime:**
- Three.js + React Three Fiber for the globe visualization (`Globe.tsx`, `GridGlobe.tsx`)
- Framer Motion for all other animations (scroll-aware nav, hover effects, text reveal, pin perspective, moving borders)
- Lottie (lottie-react) for confetti animation in BentoGrid item 6
- Custom Three.js GLSL shader in `CanvasRevealEffect.tsx` for GPU-accelerated dot matrix

**Sentry** is fully integrated across server, client, and edge runtimes with session replay enabled (10% sessions, 100% on errors). DSN is hardcoded in config files — update all three (`sentry.server.config.ts`, `sentry.edge.config.ts`, `instrumentation-client.ts`) if rotating the key.

**Dynamic imports with `ssr: false`** are used for anything touching the browser's WebGL/canvas context: `GridGlobe` and `LottieConfetti` are always dynamically imported to avoid hydration errors.

## Styling Conventions

- **Color palette** (custom Tailwind tokens):
  - `black-100` (`#000319`) — primary page background
  - `black-200` (`rgba(17,25,40,0.75)`) — nav/card glass background
  - `black-300` (`rgba(255,255,255,0.125)`) — subtle borders
  - `white-100` (`#BEC1DD`) — secondary text
  - `white-200` (`#C1C2D3`) — tertiary text
  - `purple` (`#CBACF9`) — accent color (highlighted text, icons, buttons)
  - `blue-100` (`#E4ECFF`) — cool accent

- **Custom Tailwind utilities** (`bg-grid`, `bg-grid-small`, `bg-dot`): SVG background patterns generated inline via `mini-svg-data-uri`. Used for Hero and card backgrounds.

- **`cn()` from [lib/utils.ts](lib/utils.ts)** (clsx + tailwind-merge) is the standard for all conditional class merging — use it everywhere.

- **`.heading` utility class** (defined in `globals.css`): `font-bold text-4xl md:text-5xl text-center` — used for all section headings.

- Dynamic values (transforms, gradient colors, animation durations) use inline styles or CSS variables; static layout uses Tailwind classes.

## Key Component Patterns

**BentoGridItem special IDs** — items 2, 3, and 6 in `gridItems` data get unique rendering:
- ID 2 → renders `GridGlobe` (3D globe)
- ID 3 → renders two animated tech stack lists side by side
- ID 6 → renders email-copy button with `BackgroundGradientAnimation` overlay and confetti on success

**TextGenerateEffect** splits text into words, animates each with staggered opacity (0→1, 0.2s delay each). Words after index 3 are colored purple, earlier words are white.

**MagicButton** uses an animated conic gradient border that spins (2s linear infinite). It accepts `position: "left" | "right"` to place the icon.

**PinContainer** applies `rotateX(40deg) scale(0.8)` perspective on hover. Used to wrap each project card in `RecentProjects`.

**MovingBorders (Button)** uses a Framer Motion animation frame loop to track progress along an SVG path and move a radial gradient accordingly. Used in `Experience` cards.

**FloatingNavbar** uses `useScroll` to show on scroll-up, hide on scroll-down; glassmorphism styling with `backdropFilter: blur(16px) saturate(180%)`.

## Data Shapes (`data/index.ts`)

```typescript
navItems:      { name, link }[]
gridItems:     { id, title, description, className, img, imgClassName, titleClassName, spareImg }[]
projects:      { id, title, des, img, iconLists: string[], link }[]
qualifications:{ quote, name, title, image }[]
companies:     { id, name, img, nameImg }[]
workExperience:{ id, title, desc, className, thumbnail }[]
socialMedia:   { id, img, link }[]
```

## Project Directory

```
app/
  layout.tsx              — Root layout: Inter font, metadata, ThemeProvider wrapper, favicon
  page.tsx                — Home page: composes all section components in order
  provider.tsx            — Client wrapper for next-themes ThemeProvider
  globals.css             — CSS variables for light/dark theme, .heading utility, scroll-behavior

components/
  Hero.tsx                — Full-screen intro: Spotlights, TextGenerateEffect, MagicButton CTA with smooth-scroll
  Grid.tsx                — "About" section: BentoGrid of 6 items with globe, tech stack, and email CTA
  RecentProjects.tsx      — Projects section: 4 PinContainer cards with tech icons and live links
  Clients.tsx             — Qualifications section: InfiniteMovingCards carousel + company logo row
  Experience.tsx          — Work experience: 4 MovingBorder cards with job title and description
  Approach.tsx            — Methodology section: 3 hover-reveal cards with CanvasRevealEffect shaders
  Footer.tsx              — Contact footer: CV link, social icons, copyright
  MagicButton.tsx         — Reusable button with animated spinning conic-gradient border
  LottieConfetti.tsx      — Confetti burst animation via lottie-react (dynamically imported, SSR disabled)

  ui/
    BentoGrid.tsx         — Grid layout system + BentoGridItem with special rendering for IDs 2, 3, 6
    CanvasRevealEffect.tsx — GPU-accelerated dot matrix using custom Three.js GLSL shaders; used in Approach cards
    FloatingNavbar.tsx    — Scroll-aware sticky nav with glassmorphism; hides on scroll-down, shows on scroll-up
    Globe.tsx             — Three.js globe with animated arcs, rings, and OrbitControls (core globe logic)
    GradientBg.tsx        — 5-orb animated gradient background with optional interactive mouse-following pointer
    GridGlobe.tsx         — Pre-configured World wrapper with 30 sample arc routes; used in BentoGrid item 2
    HoverBorder.tsx       — Button variant with rotating gradient border that highlights on hover
    InfiniteCards.tsx     — Infinite horizontal scroll carousel; speed/direction configurable via CSS vars
    LayoutGrid.tsx        — 4-column grid with click-to-expand card overlay; uses Next.js Image
    MovingBorders.tsx     — Button with Framer Motion frame-loop border that tracks an SVG path
    Pin.tsx               — 3D perspective container with pulsing rings and light ray on hover
    Spotlight.tsx         — SVG ellipse with Gaussian blur for directional spotlight glow
    TextGenerateEffect.tsx — Staggered word-by-word fade-in; words after index 3 render in purple

data/
  index.ts                — Single source of truth for all portfolio content (nav, projects, experience, etc.)
  confetti.json           — Lottie animation data for confetti burst
  globe.json              — Lat/lng coordinate data used by Globe.tsx for arc positioning

lib/
  utils.ts                — cn() helper: clsx + tailwind-merge for conditional class composition

public/                   — Static assets: SVG icons, project screenshots, company logos, resume PDF, institution images

instrumentation.ts        — Next.js instrumentation: loads Sentry server/edge config based on NEXT_RUNTIME
instrumentation-client.ts — Sentry client-side init with Replay integration (10% sessions, 100% on error)
sentry.server.config.ts   — Sentry server config: DSN, 100% trace sampling
sentry.edge.config.ts     — Sentry edge runtime config: DSN, 100% trace sampling
tailwind.config.ts        — Custom colors, keyframe animations, bg-grid/bg-dot SVG utilities, color CSS vars plugin
tsconfig.json             — Strict TypeScript, @/* path alias, bundler module resolution
components.json           — Shadcn/ui config: zinc base color, CSS variables enabled
postcss.config.js         — PostCSS: tailwindcss + autoprefixer plugins
```

## Design Language & Philosophy

### Core Aesthetic: "Cinematic Dark Tech"

The portfolio is a **permanently dark** experience — not dark-mode as a user option, but dark as the intentional, singular identity. The background is `#000319` (a deep navy-black, not pure black), which gives the canvas a subtle blue warmth and makes glow effects feel three-dimensional. Everything is calibrated around the interplay of **depth, light, and motion** — elements appear to float in space rather than sit on a flat plane.

The design philosophy is: **make the visitor feel something before they read anything**. Spotlights sweep in on load, text reveals word by word, cards tilt in perspective on hover. Every section has at least one ambient motion happening at all times, so the page never feels static.

---

### Color System

**The palette is deliberately minimal — one warm accent against a cold monochromatic base.**

| Token | Value | Role |
|---|---|---|
| `black-100` | `#000319` | Primary page background (deep navy, not pure black) |
| Card fill gradient | `rgb(4,7,29)` → `rgba(12,14,35)` | BentoGrid items, Experience cards — slightly lighter than bg |
| `#10132E` | hardcoded | Tech stack badge surface — a mid-depth navy |
| `black-200` | `rgba(17,25,40,0.75)` | Glass surface (nav, social icon pills) |
| `black-300` | `rgba(255,255,255,0.125)` | Ultra-subtle glass border — almost invisible |
| `white` / `#FFF` | primary text | Used only at full opacity for key content |
| `white-100` | `#BEC1DD` | Secondary text — cool blue-white, clearly subordinate |
| `white-200` | `#C1C2D3` | Tertiary descriptions — very muted, `font-extralight` |
| `blue-100` | `#E4ECFF` | Eyebrow/label text (uppercase small caps above headlines) |
| `purple` | `#CBACF9` | **The only warm accent** — soft lavender-purple |

**The purple rule:** `#CBACF9` (`text-purple`) appears in exactly four contexts:
1. The key noun in every section heading (`<span className="text-purple">projects</span>`)
2. Words after index 3 in `TextGenerateEffect` — the emotional payload of the headline
3. The `MagicButton` conic gradient border (`#E2CBFF` variant)
4. One of the three `Spotlight` fills

Never use purple decoratively. Always use it for the single most important word or element in a composition. Its rarity is what makes it land.

---

### Typography

**Font family:** Inter throughout — clean, neutral, lets the visuals carry personality.

**Typographic hierarchy (largest to smallest):**

1. **Hero headline** — `text-[40px] md:text-5xl lg:text-6xl`, animated word-by-word with `TextGenerateEffect`
2. **Section headings** — `.heading` utility: `font-bold text-4xl md:text-5xl text-center`. Always centered. Always one key word in `text-purple`.
3. **Card titles** — `text-lg lg:text-3xl font-bold`, left-aligned inside cards
4. **Body/descriptions** — `text-sm lg:text-base`, `font-extralight` or `font-light`, color `#C1C2D3`
5. **Eyebrow labels** — `uppercase tracking-widest text-xs text-blue-100` — appears above the hero headline to frame the content category
6. **Badges/tags** — `text-xs lg:text-base` in `#10132E` pill containers (tech stack)

**Weight discipline:** Bold only for titles. Everything else is `font-light`, `font-extralight`, or `font-normal`. The contrast between bold headings and light body text is stronger than any color could achieve.

---

### Glassmorphism Pattern

The "glass" surface recipe is applied consistently in three places — **never deviate from these exact values:**

```
backdrop-filter: blur(16px) saturate(180%)
background: rgba(17, 25, 40, 0.75)     ← black-200
border: 1px solid rgba(255,255,255,0.125)  ← black-300
border-radius: 12px
```

Used in: FloatingNavbar, social icon pills in Footer, backdrop of MovingBorders cards. The pattern creates the feeling that elements are frosted glass panels floating above the background.

---

### Animation System

Four distinct animation archetypes — each serves a different purpose:

**1. Entrance / reveal** — fires once on load or first appearance
- `spotlight` keyframe: scale 0.5 → 1, translate, 2s ease with 0.75s delay
- `TextGenerateEffect`: staggered word opacity 0→1, 0.2s per word
- `FloatingNavbar`: slides Y: -100→0 with opacity 0→1, 200ms duration

**2. Ambient / idle** — runs forever without interaction; keeps the page alive
- `GradientBg` orbs: 20–40s `moveVertical`, `moveInCircle`, `moveHorizontal` loops
- `MagicButton` border: `spin 2s linear infinite` conic gradient
- `MovingBorder`: Framer Motion `useAnimationFrame` tracking an SVG path — no duration; continuous
- `scroll` keyframe in `InfiniteCards`: CSS variable `--animation-duration` (default 40s), configurable direction
- Globe: Three.js `OrbitControls` autorotate

**3. Hover-triggered depth transforms** — reward cursor interaction with 3D motion
- `PinContainer`: `rotateX(40deg) scale(0.8)` on enter, `rotateX(0deg) scale(1)` on leave, `perspective: 1000px`
- `BentoGridItem`: `group-hover/bento:translate-x-2 transition duration-200` — subtle content slide
- `Approach Card`: `CanvasRevealEffect` fades in on hover, fades out on leave

**4. Cursor-following** — one instance only, in `BackgroundGradientAnimation` (email CTA card)
- An extra gradient orb (`pointer-color: rgba(140,100,255,0.8)`) follows the mouse with 1/20 lerp easing

**Timing conventions:**
- Micro-interactions: `200ms`
- Hover depth transitions: `700ms`
- Ambient orbs: `20s–40s`
- Button borders: `2s`
- Scroll carousels: `40s`
- Page entrance (spotlight): `2s`

---

### Visual Texture System

Three SVG background patterns, all generated inline via `mini-svg-data-uri`:

| Utility | Grid size | Stroke | Typical use |
|---|---|---|---|
| `bg-grid` | 100×100px | Path `M0 .5H31.5V32` | Hero background at `white/[0.03]` — nearly invisible |
| `bg-grid-small` | 8×8px | Same path | Denser grids for tighter areas |
| `bg-dot` | 16×16px | Circle `r=1.6` | Dot matrix pattern |

**Always pair textures with a radial gradient mask:**
```
[mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]
```
This fades the texture into the background at the edges, making it feel like it emerges organically from the center rather than tiling uniformly. The texture reinforces depth without competing with content.

---

### Spatial / Layout Language

**Section rhythm:** `py-20` (80px) vertical padding on every section — generous, breath-giving space.

**Full-bleed hero:** `h-screen flex items-center justify-center` — the hero always occupies exactly one viewport height.

**Max-width pattern:** Content narrows as viewport grows: `max-w-[89vw] md:max-w-2xl lg:max-w-[60vw]`. On large screens, content is intentionally not full-width — this creates a focused reading column.

**Grid systems in use:**
- BentoGrid: CSS Grid with `row-span` and `col-span` classes on items — asymmetric, mosaic layout
- Experience: `lg:grid-cols-4 grid-cols-1 gap-10` — equal columns on desktop, stacked on mobile
- Projects: `flex flex-wrap gap-16` — wrap-based with large gaps for breathing room
- Approach: `flex flex-col lg:flex-row gap-4` — horizontal on desktop

**Corner radius vocabulary:**
- `rounded-3xl` — large feature cards, BentoGrid items, Approach cards
- `rounded-2xl` — inner card surfaces (PinContainer inner div)
- `rounded-lg` — buttons (MagicButton, FloatingNavbar), social icons
- `rounded-full` — tech icon overlapping circles only

---

### Depth / 3D System

The design uses three independent depth techniques that layer into a cohesive sense of three-dimensionality:

1. **SVG spotlight glows** (`Spotlight.tsx`) — directional light sources rendered as SVG ellipses with `feGaussianBlur`. Three spotlights hit the Hero from different angles: white (left), purple (right-upper), blue (lower-center). They establish the "scene lighting" before any content appears.

2. **CSS perspective transforms** (`PinContainer`) — `perspective: 1000px; transform: rotateX(70deg) translateZ(0)` on the container, then `rotateX(40deg) scale(0.8)` on hover for the card face. This creates a genuine 3D tilt that reveals the pulsing rings and light ray of `PinPerspective`.

3. **WebGL / Three.js** (`Globe.tsx`, `GridGlobe.tsx`, `CanvasRevealEffect.tsx`) — actual GPU-rendered content. The globe represents global reach/connectivity. The dot-matrix canvas in Approach cards gives a "code running" feel on hover. Both use `dynamic(() => import(...), { ssr: false })` — never render server-side.

---

### Component Design Contracts

When building new components, follow these established contracts:

**Cards:**
- Background: `rgb(4,7,29)` → `rgba(12,14,35)` gradient (never solid black)
- Border: `border border-white/[0.1]` at rest, `group-hover:border-white/[0.2]` on hover
- Radius: `rounded-3xl`
- Shadow: `shadow-[0_8px_16px_rgb(0_0_0/0.4)]`

**Buttons (MagicButton):**
- Outer: `rounded-lg h-12`, `p-[1px]` — 1px padding creates the spinning border effect
- Border effect: `animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]`
- Inner: `bg-slate-950` fill, `text-white`, `px-7`, `gap-2` for icon spacing
- Icons: left or right via `position` prop — never center

**Section headings:**
- Always use `.heading` class (`font-bold text-4xl md:text-5xl text-center`)
- Always wrap the key noun in `<span className="text-purple">...</span>`
- Never add additional decorators (no underlines, no background fills)

**Text hierarchy in cards:**
- Description first (`font-extralight`, `#C1C2D3`, `z-10`) — small, quiet
- Title second (`font-bold`, `text-lg lg:text-3xl`, white, `z-10`) — bold, dominant
- This reverse order (small caption → large title) is intentional throughout BentoGrid

---

### Section-by-Section Design Intent

| Section | Primary technique | Design goal |
|---|---|---|
| **Hero** | 3 spotlights + grid texture + word-reveal | Immersive first impression; light before content |
| **Grid (About)** | BentoGrid mosaic + 3D globe | Spatial variety; globe as centerpiece of global identity |
| **Projects** | PinContainer 3D tilt + overlapping icon chips | Tactile depth; physical sense of "picking up" a project card |
| **Clients** | InfiniteCards scroll + company logo row | Breadth and continuity; never stops moving |
| **Experience** | MovingBorder circuit animation | Suggests ongoing activity; circuits that never rest |
| **Approach** | CanvasRevealEffect hover reveal | Interactive discovery; the visitor "switches on" each phase |
| **Footer** | SVG grid background + centered CTA | Convergence point; returns to the grid motif from Hero |
