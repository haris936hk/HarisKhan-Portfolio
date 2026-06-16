# Conventions

## Class merging
Always use `cn()` from `lib/utils.ts` for conditional Tailwind class merging. Never raw string concatenation.

## Comments
No comments by default. Only add when WHY is non-obvious (hidden constraint, workaround, subtle invariant).

## Component patterns
- **MagicButton** — accepts `position: "left" | "right"` for icon placement; spinning conic-gradient border.
- **PinContainer** — applies `rotateX(40deg) scale(0.8)` on hover. Wraps project cards.
- **MovingBorders** — Framer Motion frame-loop tracks SVG path for animated border. Used in Experience cards.
- **FloatingNavbar** — `useScroll` shows on scroll-up / hides on scroll-down; glassmorphism (`backdrop-filter: blur(16px) saturate(180%)`).
- **TextGenerateEffect** — staggered word fade-in; words after index 3 are colored purple, earlier words are white.
- **CanvasRevealEffect** — custom Three.js GLSL shader for GPU dot matrix; used in Approach hover cards.

## Dynamic imports
All components touching WebGL/canvas must be dynamically imported with `ssr: false` to prevent hydration errors.

## Styling
- Dynamic values (transforms, gradient colors, durations) → inline styles or CSS vars.
- Static layout → Tailwind classes.
- No global state; state is local to each component. Data flows: `data/index.ts` → section component → UI primitive.

## Data shapes (data/index.ts)
```typescript
navItems:       { name, link }[]
gridItems:      { id, title, description, className, img, imgClassName, titleClassName, spareImg }[]
projects:       { id, title, des, img, iconLists: string[], link }[]
qualifications: { quote, name, title, image }[]
companies:      { id, name, img, nameImg }[]
workExperience: { id, title, desc, className, thumbnail }[]
socialMedia:    { id, img, link }[]
```
