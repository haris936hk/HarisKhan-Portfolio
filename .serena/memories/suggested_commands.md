# Suggested Commands

## Development (run from project root on Windows)
```
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run start    # Start production server (after build)
npm run lint     # ESLint via next lint
npm run deploy   # Deploy to Vercel production (vercel --prod)
```

## Windows-specific notes
- Use `npm run <script>` — no Makefile; no yarn/pnpm lockfile.
- PowerShell is the primary shell; Bash tool available for POSIX syntax.
- Path separator is `\` on Windows — use forward slashes only inside Next.js/Node config files.
