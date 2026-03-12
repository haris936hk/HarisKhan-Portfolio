---
trigger: always_on
---

# Project Overview
This project is a modern, interactive personal portfolio website designed to showcase software engineering projects, skills, and work experience. It leverages 3D graphics and smooth animations to provide an engaging dark-themed user experience.

## Tech Stack
- **Framework**: Next.js 14.1.4 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei, Three Globe
- **UI Architecture**: Custom components inspired by Aceternity UI
- **Error Tracking & Monitoring**: Sentry
- **Deployment**: Vercel

## Folder Structure
- `/app`: Contains the Next.js App Router entry points (`page.tsx`, `layout.tsx`) and global styles (`globals.css`).
- `/components`: Houses the main functional sections of the portfolio (e.g., `Hero.tsx`, `Experience.tsx`, `RecentProjects.tsx`).
- `/components/ui`: Contains highly reusable, complex, atomic UI building blocks (often involving framer-motion or Three.js). Always check this directory for existing elements before creating new animated components.
- `/data/index.ts`: The central source of truth for all structured portfolio content. This is where projects, job history, and personal details are defined.
- `/lib/utils.ts`: Contains shared utility functions, primarily the `cn` function for safe Tailwind class merging.
- `/public`: Stores static assets such as images, logos, and animations.

## Essential Commands
- Start development server: `npm run dev`
- Build for production: `npm run build`
- Start production server: `npm run start`
- Run linter: `npm run lint`
- Deploy to Vercel: `npm run deploy`

## Hard Rules
- **Content Management**: Never hardcode personal information, project details, or work experience directly within React components. Always define and update this data in `data/index.ts` to maintain a strict separation of content and presentation.
- **Tailwind Class Merging**: Always use the `cn` utility from `lib/utils.ts` (combining `clsx` and `tailwind-merge`) when conditionally applying or overriding Tailwind classes on components. This prevents CSS specificity conflicts.
- **Sentry Integration**: The application uses Sentry extensively (configured via `next.config.mjs`, `sentry.*.config.ts`, and `instrumentation.ts`). Do not modify or remove these monitoring integrations without explicit instructions.
- **Dark Theme Enforcement**: The project relies on a strict dark theme palette defined in `tailwind.config.ts` (using specific custom colors like `black-100` and `purple`). Do not introduce arbitrary hardcoded colors that violate this design system.
- **Performance Segregation**: Keep heavy 3D visualizations and complex Framer Motion logic isolated within specific leaf components. Avoid placing heavy imports into top-level layouts to ensure optimal loading performance.
