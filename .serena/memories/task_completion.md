# Task Completion Checklist

Run these after any coding change before considering a task done:

1. **Lint** — `npm run lint` (ESLint via next lint; must pass with no errors)
2. **Build** — `npm run build` (catches TypeScript type errors and Next.js build issues)
3. **Dev smoke test** — `npm run dev` then visually verify at http://localhost:3000 for UI changes
4. **Deploy** — `npm run deploy` only when explicitly asked to ship to production

## Notes
- No dedicated test suite (no Jest/Vitest/Playwright configured). Type correctness is verified via build.
- Sentry is active in production; after deploy, confirm no new errors appear in Sentry dashboard.
