# `react-doctor/require-reduced-motion`

Project may ship non-essential motion without an observable reduced-motion policy; confirm library defaults and real animation use before changing code

- **Status:** Active
- **Category:** Accessibility
- **Assessment:** Evidence-required risk
- **Required evidence:** source code, rendered UI, accessibility audit
- **Default severity:** warn
- **Scope:** All supported frameworks
- **Active when:** always (project depends on a known motion library)
- **Priority:** 56 (P2)
- **Source:** react-doctor-core
- **Rule set:** oxlint-plugin-react-doctor 0.9.3 (prompt schema 2)
- **Documentation:** [Official documentation](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions)

## Validation prompt

Confirm the detector match and collect the required evidence before deciding whether an edit is warranted.

This project-level heuristic fires once on package.json when dependencies include a known motion library (framer-motion/motion, react-spring, gsap, @react-spring/*, react-native-reanimated, and others) and a text scan of *.ts/*.tsx/*.js/*.jsx/*.css/*.scss finds none of `prefers-reduced-motion`, `useReducedMotion`, `MotionConfig`, or `reducedMotion`. Confirm the dependency actually ships non-essential spatial, parallax, autoplaying, looping, or interaction-triggered animation and that no app, design-system, component-library, generated, MDX, HTML, Less/Stylus, native, or user-setting layer already handles the preference. Suppress an unused/non-animating dependency. Also suppress supported React Native Reanimated versions whose animations retain the default ReduceMotion.System behavior (the default in Reanimated 3.5+ and 4); investigate only explicit ReduceMotion.Never, custom animation paths, or older versions. WCAG 2.3.3 Animation from Interactions is Level AAA, so absence is not a blanket WCAG failure; separately assess auto-started moving content under WCAG 2.2.2 and flashes under 2.3.1/2.3.2.

## Evidence boundary

The diagnostic proves only that the detector's modeled source pattern matched. It does not prove runtime impact, product intent, rendered failure, or that one remediation is correct.

Establish the environment, explicit repository policy, relevant exceptions, and required rendered or runtime evidence before deciding the occurrence. This page’s Assessment and Required evidence fields define the review contract.

Default severity is registry metadata. Use the occurrence's JSON severity after repository configuration when ordering real findings.

Record one outcome:

- **Confirmed failure:** The required evidence establishes the violation.
- **Rejected:** A documented exception or false-positive predicate applies.
- **Needs evidence:** Named evidence can still be collected.
- **Unavailable:** Required evidence cannot be collected in this run.
- **Waived with evidence:** An authorized, scoped exception applies to an established failure.
- **Observation:** The review records an optional tradeoff without claiming a defect.

A waiver records its scope, authority, evidence, and review or expiry condition. It is not a pass or false positive.

## Fix prompt

Apply this candidate correction only after the required evidence confirms the risk.

Implement a policy at the narrowest layer that owns each animation, preserving the same content, focus behavior, and final state. For Motion, `<MotionConfig reducedMotion="user">` disables transform and layout animation while opacity and color can remain; use `useReducedMotion()` when a specific parallax, autoplay, or large spatial effect needs a static or brief local-fade alternative. For react-spring, use its `useReducedMotion` support. For GSAP, use `gsap.matchMedia()` with `(prefers-reduced-motion: reduce)`, choose reduced distances/durations or a static end state, and call `revert()` during cleanup. Reanimated 3.5+/4 already defaults animations to ReduceMotion.System; remove explicit Never overrides or customize with its hook/config only when needed. For CSS, add targeted `@media (prefers-reduced-motion: reduce)` rules that remove spatial movement, smooth scrolling, parallax, and autoplay while optionally retaining a short local opacity/color transition. Do not apply a universal 0.01ms !important reset: it can break completion callbacks, sequencing, focus, and essential state. Keep essential information available in a calm or static form. See https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions

## Repository-wide copy prompt

Use this only for a repository-wide pass after validating each occurrence. For one occurrence, use the occurrence-level guidance above.

````text
Fix every confirmed `react-doctor/require-reduced-motion` diagnostic in the current repository.

Required change:
- Implement a policy at the narrowest layer that owns each animation, preserving the same content, focus behavior, and final state. For Motion, `<MotionConfig reducedMotion="user">` disables transform and layout animation while opacity and color can remain; use `useReducedMotion()` when a specific parallax, autoplay, or large spatial effect needs a static or brief local-fade alternative. For react-spring, use its `useReducedMotion` support. For GSAP, use `gsap.matchMedia()` with `(prefers-reduced-motion: reduce)`, choose reduced distances/durations or a static end state, and call `revert()` during cleanup. Reanimated 3.5+/4 already defaults animations to ReduceMotion.System; remove explicit Never overrides or customize with its hook/config only when needed. For CSS, add targeted `@media (prefers-reduced-motion: reduce)` rules that remove spatial movement, smooth scrolling, parallax, and autoplay while optionally retaining a short local opacity/color transition. Do not apply a universal 0.01ms !important reset: it can break completion callbacks, sequencing, focus, and essential state. Keep essential information available in a calm or static form. See https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions

Validation before editing:
This project-level heuristic fires once on package.json when dependencies include a known motion library (framer-motion/motion, react-spring, gsap, @react-spring/*, react-native-reanimated, and others) and a text scan of *.ts/*.tsx/*.js/*.jsx/*.css/*.scss finds none of `prefers-reduced-motion`, `useReducedMotion`, `MotionConfig`, or `reducedMotion`. Confirm the dependency actually ships non-essential spatial, parallax, autoplaying, looping, or interaction-triggered animation and that no app, design-system, component-library, generated, MDX, HTML, Less/Stylus, native, or user-setting layer already handles the preference. Suppress an unused/non-animating dependency. Also suppress supported React Native Reanimated versions whose animations retain the default ReduceMotion.System behavior (the default in Reanimated 3.5+ and 4); investigate only explicit ReduceMotion.Never, custom animation paths, or older versions. WCAG 2.3.3 Animation from Interactions is Level AAA, so absence is not a blanket WCAG failure; separately assess auto-started moving content under WCAG 2.2.2 and flashes under 2.3.1/2.3.2.

Constraints:
- Confirm every occurrence independently.
- Make the smallest change that addresses the root cause.
- Preserve unrelated behavior, interfaces, content, and semantics.
- Reuse existing project conventions and components.
- Do not suppress the rule merely to clear the report.

Assessment:
- Record detector evidence, applicability, missing evidence, and one outcome: Confirmed failure, Rejected, Needs evidence, Unavailable, Waived with evidence, or Observation.

Verification:
- Run focused tests and every repository-mandated check.
- Run React Doctor and confirm the diagnostic no longer appears from changed code.
- Run an unfiltered scan of the affected scope before claiming no cross-category regression.
- Report checks that were not run instead of claiming they passed.
````
