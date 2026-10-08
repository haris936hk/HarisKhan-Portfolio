# Repository Guidelines

## Project Overview
Personal portfolio showcasing projects, certificates, qualifications, experience, and contact information. Built with Next.js 14.1.4 App Router, React 18, TypeScript, Tailwind CSS 3, Framer Motion, and Three.js; deployed through Vercel with Sentry monitoring.

## Architecture & Data Flow
- `app/layout.tsx` supplies metadata, Inter, global CSS, and the dark-theme provider. `app/page.tsx` is a client component composing the single-page portfolio and floating navigation.
- Structured content flows from `data/index.ts` → section components → reusable UI primitives. The inspected app has static content imports and local interactions, not a backend data-fetching layer.
- `components/Certificates.tsx` dynamically loads `PDFThumbnail` with `ssr: false`; PDF.js renders page one from `public/certificates/` using `/pdf.worker.min.mjs`. Globe and Lottie browser-heavy modules also use client-only dynamic imports.
- `components/ui/BentoGrid.tsx` assigns special behavior to grid IDs 2 (globe), 3 (stack), and 6 (email copy); preserve these IDs when editing data.
- `projects.md` and `certificates.md` are standalone catalogues, not runtime content sources. Editing them does not update the site.

## Key Directories
- `app/`: route composition, theme provider, global styles, and error boundary.
- `components/`: portfolio sections; `components/ui/`: reusable animated and 3D UI.
- `data/`: structured portfolio records and globe/confetti JSON; `lib/`: shared utilities.
- `public/`: served assets, including certificate PDFs and PDF.js worker. Asset URLs omit `public`, e.g. `/certificates/file.pdf`; root `Certificates/` is a separate collection, not the served directory.
- `scripts/`: certificate inspection utility. `.agent/rules/` and `.serena/memories/` contain existing project guidance; verify older memories against current source.

## Development Commands
Run from the repository root:

```bash
npm install          # install dependencies
npm run dev          # development server: http://localhost:3000
npm run lint         # next lint
npm run build        # production build and Next/TypeScript validation
npm run start        # production server; requires a successful build
npm run deploy       # vercel --prod; only when explicitly requested
node scripts/identify-certs.mjs  # print first-page certificate text for inspection
```

The certificate helper reads `public/certificates/*.pdf` and reports per-file extraction errors; it is not a test runner. No test, typecheck, or formatting npm script is defined.

## Code Conventions & Common Patterns
- Use TypeScript/TSX, function components, PascalCase component names, and camelCase values. Section components commonly use default exports; UI primitives commonly use named exports. Match surrounding formatting; no dedicated formatter is configured.
- `tsconfig.json` enables strict checking; `@/*` resolves from the repository root, e.g. `@/data` and `@/lib/utils`. Neighboring component imports also use relative paths.
- Keep structured portfolio records in `data/index.ts`, not new hardcoded component records. Some existing Hero/Approach copy remains inline. Certificate additions need both a served PDF and a matching data record/verification URL.
- Compose conditional or overriding Tailwind classes with `cn()` from `lib/utils.ts` (`clsx` + `tailwind-merge`). Reuse dark-theme tokens such as `black-100` and `purple`; static layout belongs in Tailwind, runtime transforms/gradients in inline styles or CSS variables.
- State is local React state/effects; theme context is supplied by `next-themes`. There is no shared application store or dependency-injection framework in the inspected core; dependencies flow through imports and props.
- Keep hooks/DOM APIs behind client boundaries and expensive WebGL/animation code in leaf components, not layouts. Reuse existing `next/dynamic` patterns for browser-only modules.
- Clean up timers and async effects. `PDFThumbnail` uses a cancellation flag and displays “Preview unavailable” on failure; the global error boundary captures errors with Sentry. Clipboard handling currently does not await/catch `writeText`; do not treat it as a robust async-error pattern.

## Important Files
- `app/page.tsx`, `app/layout.tsx`, `app/provider.tsx`: page assembly, metadata, and theme boundary.
- `data/index.ts`: rendered portfolio records; `lib/utils.ts`: shared `cn()` helper.
- `components/PDFThumbnail.tsx`, `components/ui/BentoGrid.tsx`: PDF lifecycle and ID-dependent interactions.
- `package.json`, `package-lock.json`: command/dependency authority; `tsconfig.json`: strictness and aliases.
- `next.config.mjs`: webpack aliases (`canvas`/`encoding` disabled) and Sentry wrappers. Preserve monitoring unless explicitly changing it.
- `tailwind.config.ts`, `app/globals.css`, `postcss.config.js`, `.eslintrc.json`: theme, CSS pipeline, and `next/core-web-vitals` linting.
- `instrumentation.ts`, `instrumentation-client.ts`, `sentry.server.config.ts`, `sentry.edge.config.ts`, `app/global-error.jsx`: runtime monitoring and error capture.
- `.agent/rules/project-guide.md`: existing repository-specific rules. Prefer current source/config over stale README claims, including its unconfigured `next export` deployment instructions.

## Runtime/Tooling Preferences
Use Node.js and npm; `package-lock.json` is the checked-in lockfile, with no Bun/Yarn/pnpm lockfile or package-manager pin. Although README says Node 18+, locked `pdfjs-dist` 6.0.227 requires `>=22.13.0 || >=24`; use a compatible Node version, such as Node 24. No root `engines`, `.nvmrc`, or `.node-version` pins the runtime.

This repository uses Tailwind 3 and ESLint 8 with Next 14 tooling; do not apply Tailwind 4 or newer Next tooling conventions without an explicit migration task.

## Testing & QA
No dedicated test suite, test framework configuration, coverage command, or coverage threshold was found. An ignored `/coverage` directory and transitive `jest-worker` dependency do not constitute test support; do not claim `npm test` exists.

For code changes, run `npm run lint` and `npm run build`. For UI changes, run `npm run dev` and inspect the affected surface at `http://localhost:3000`, including responsive layout, dark styling, navigation, and browser console errors. For certificate changes, confirm the first-page thumbnail renders and the card opens the correct PDF; for interaction changes, exercise the actual clipboard/globe/animation path. Report checks actually run and any failures; production deployment is not routine verification.
