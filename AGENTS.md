# Repository Guidelines

## Project Overview

DevHQ is Haris Khan’s personal portfolio: a static single-page site presenting experience, projects, skills, certificates, and downloadable documents. A serverless contact endpoint sends email through Resend. Content is authored directly in HTML; there is no CMS or frontend framework.

## Architecture & Data Flow

- `index.html` owns content and DOM structure; `style.css` owns presentation. CDN-loaded Three.js, GSAP, and ScrollTrigger precede the application scripts. Preserve script ordering and the globals those scripts require.
- `script.js` implements direct DOM interactions: navigation, scroll reveals, skill filtering, resume modal, typing, preloader, and contact submission. State lives in local variables, DOM attributes, and CSS classes—not a store or persistence layer.
- `3d_background.js` creates the Three.js starfield and GSAP animations, including pointer and viewport-resize behavior.
- Contact flow: required form fields → `FormData` serialized as JSON → POST `/api/submit` → `api/submit.js` → Resend via Node’s native `https`. The handler returns JSON; the browser displays success/error button states and resets the form only after success.
- The preloader waits for both `pageLoaded` and `animationDone`, then dispatches `preloaderComplete`; typing waits for that event. Preserve this lifecycle when changing startup behavior.

## Key Directories

- `api/`: serverless contact handler; not served as an API by the static preview command.
- `Docs/`: resume, project case-study PDF, portrait, and certificate PDFs under `Docs/Certificates/`.
- `portfolio_assets/`: presentation images and employer logos; `haris_certificates/` holds certificate previews. Keep preview filename stems aligned with their corresponding PDFs and percent-encode spaces in HTML URLs.

## Development Commands

| Command | Purpose / limitation |
| --- | --- |
| `npm ci` | Install dependencies from `package-lock.json`. |
| `npm run serve` | Static preview at `http://localhost:3000`; invokes `npx http-server -p 3000`. |
| `npm test` | Placeholder only: prints `Error: no test specified` and exits 1. |

No build, lint, format, deployment, or functional test script is configured. Edit the static files directly; do not assume a bundling step. `http-server` is not a declared dependency, so `npx` may need to fetch it. Static preview does not execute `/api/submit`; contact delivery needs a serverless runtime and configured credentials.

## Code Conventions & Common Patterns

- Preserve nearby formatting: browser JavaScript/CSS generally use four-space indentation; `api/submit.js` uses two spaces. No formatter or linter configuration is present.
- Use `camelCase` JavaScript variables and generally camelCase HTML IDs; CSS classes use kebab-case. Keep selectors synchronized across HTML, CSS, and JavaScript.
- Follow existing `DOMContentLoaded`, event-listener, `IntersectionObserver`, timer, and `data-*` patterns. UI transitions use classes such as `.active`, `.expanded`, `.show`, and `.d-none`.
- Reuse `:root` CSS custom properties and section-local styles. Responsive rules commonly target 768px and 480px; check neighboring media rules before adding overrides.
- Contact submission uses asynchronous fetch with visible success/failure states; preserve recovery of the submit button after either outcome. The backend uses callback/event-based HTTPS handling and JSON error responses.
- There is no dependency-injection layer. Browser dependencies are CDN globals; the backend uses CommonJS `require`/`module.exports`, native `https`, and environment variables. Do not introduce framework/store/DI abstractions for small changes.

## Important Files

- `index.html`: page entry point, SEO metadata, section IDs, contact markup, asset URLs, and script ordering.
- `script.js`: UI behavior and `/api/submit` client contract.
- `3d_background.js`: WebGL background and GSAP animation setup.
- `style.css`: theme, responsive layout, and interaction-state styling.
- `api/submit.js`: POST-only Resend handler; requires `RESEND_API_KEY` and `RECEIVER_EMAIL` and returns 500 when configuration is missing.
- `package.json` / `package-lock.json`: available commands and npm dependency lock; declared packages are `@vercel/analytics` and `@vercel/speed-insights`.
- `robots.txt` / `sitemap.xml`: crawler policy and homepage URL; update alongside canonical/social URLs when changing the domain.
- `README.md`: feature/setup reference, but its directory tree is stale (`portfolio_assests` is a typo; actual path is `portfolio_assets/`).

## Runtime/Tooling Preferences

Use npm, as established by the committed lockfile; no Bun requirement, Node version, `engines`, or package-manager version is pinned. The backend requires Node.js APIs and a compatible serverless host. Keep credentials in the deployment environment or ignored local env files; never place them in browser code.

Hosting is unresolved in repository configuration: README describes Vercel, while canonical metadata and sitemap use a Netlify domain. No `vercel.json` or `netlify.toml` is present. Verify the intended host and `/api/submit` routing before deployment changes; do not assume static hosting runs the function. `index.html` also references `./speed-insights.js`, which is absent; installing the declared package alone does not establish that URL.

## Testing & QA

No automated test framework, test suite, CI workflow, coverage tooling, or coverage threshold is configured. README performance figures have no documented reproducible benchmark procedure; do not treat them as verified baselines.

For UI changes, run the static preview and inspect the actual browser surface: responsive layouts, console/network errors, local asset/PDF links, navigation and anchor scrolling, filters, modal open/close, preloader/typing, and starfield resizing as applicable.

For contact changes, exercise required-field/email validation and success/failure UI. Verify the handler in a compatible serverless runtime: non-POST → 405, missing configuration → 500, and provider/request failures → error responses. End-to-end success requires real credentials and can send email; use a controlled recipient. Static preview alone is not contact-delivery verification.
