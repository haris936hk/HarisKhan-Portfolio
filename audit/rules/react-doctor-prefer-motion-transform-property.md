# `react-doctor/prefer-motion-transform-property`

Prefer a complete Motion transform string only when profiling shows acceleration is crucial and transform ownership can remain correct

- **Status:** Active
- **Category:** Performance
- **Assessment:** Evidence-required risk
- **Required evidence:** source code, runtime behavior, measurement
- **Default configuration:** Disabled until configured
- **Default severity:** warn
- **Scope:** All supported frameworks
- **Active when:** react
- **Requirements:** react
- **Tags:** design, opt-in
- **Priority:** Unranked; sorts as P3
- **Source:** oxlint-plugin-react-doctor
- **Rule set:** oxlint-plugin-react-doctor 0.9.3 (prompt schema 2)

## Validation prompt

Confirm the detector match and collect the required evidence before deciding whether an edit is warranted.

For `react-doctor/prefer-motion-transform-property`, this opt-in detector reads static Motion animation props other than initial. It reports x, y, scale, or rotate when the same object lacks a direct transform property. It does not prove main-thread contention, hardware acceleration, or complete transform ownership. Audit drag, layout projection, gestures, variants, transformTemplate, CSS, and other animation owners. Motion documents that individual transforms use CSS variables and are not hardware-accelerated, but a full transform string is warranted only when acceleration is crucial. Require a representative production trace and a complete transform-owner audit before confirming. The Before example is representative, not exhaustive.

## Evidence boundary

The diagnostic proves only that the detector's modeled source pattern matched. It does not prove runtime impact, product intent, rendered failure, or that one remediation is correct.

Establish the environment, explicit repository policy, relevant exceptions, and required rendered or runtime evidence before deciding the occurrence. This page’s Assessment and Required evidence fields define the review contract.

The `design` tag controls activation and discovery. It does not determine the rule’s proof class.

Default severity is registry metadata. Use the occurrence's JSON severity after repository configuration when ordering real findings.

Record one outcome:

- **Confirmed failure:** The required evidence establishes the violation.
- **Rejected:** A documented exception or false-positive predicate applies.
- **Needs evidence:** Named evidence can still be collected.
- **Unavailable:** Required evidence cannot be collected in this run.
- **Waived with evidence:** An authorized, scoped exception applies to an established failure.
- **Observation:** The review records an optional tradeoff without claiming a defect.

A waiver records its scope, authority, evidence, and review or expiry condition. It is not a pass or false positive.

## Review a candidate correction

Apply this candidate correction only after the required evidence confirms the risk.

### Reported pattern

```tsx
import { motion } from "motion/react";

const Demo = () => (
  <motion.div
    animate={{ x: 120, scale: 1.1 }}
    transition={{ type: "tween", duration: 0.3 }}
  />
);
```

### Candidate corrected pattern

```tsx
import { motion } from "motion/react";

const Demo = () => (
  <motion.div
    animate={{ transform: "translateX(120px) scale(1.1)" }}
    transition={{ type: "tween", duration: 0.3 }}
  />
);
```

## Fix prompt

Apply this candidate correction only after the required evidence confirms the risk.

Use one complete transform string only when a trace shows material main-thread contention. First confirm that no other transform owner must compose with it. Preserve every value, unit, operation order, transition type, duration, easing, delay, interruption, and reduced-motion behavior. Use a dedicated wrapper when independent transform owners must coexist. Re-profile the same interaction after the change; do not rewrite healthy Motion code based on syntax alone. See https://motion.dev/docs/performance

## Repository-wide copy prompt

Use this only for a repository-wide pass after validating each occurrence. For one occurrence, use the occurrence-level guidance above.

````text
Fix every confirmed `react-doctor/prefer-motion-transform-property` diagnostic in the current repository.

Required change:
- Use one complete transform string only when a trace shows material main-thread contention. First confirm that no other transform owner must compose with it. Preserve every value, unit, operation order, transition type, duration, easing, delay, interruption, and reduced-motion behavior. Use a dedicated wrapper when independent transform owners must coexist. Re-profile the same interaction after the change; do not rewrite healthy Motion code based on syntax alone. See https://motion.dev/docs/performance.

Validation before editing:
For `react-doctor/prefer-motion-transform-property`, this opt-in detector reads static Motion animation props other than initial. It reports x, y, scale, or rotate when the same object lacks a direct transform property. It does not prove main-thread contention, hardware acceleration, or complete transform ownership. Audit drag, layout projection, gestures, variants, transformTemplate, CSS, and other animation owners. Motion documents that individual transforms use CSS variables and are not hardware-accelerated, but a full transform string is warranted only when acceleration is crucial. Require a representative production trace and a complete transform-owner audit before confirming. The Before example is representative, not exhaustive.

Reference transformation:

Before:
```tsx
import { motion } from "motion/react";

const Demo = () => (
  <motion.div
    animate={{ x: 120, scale: 1.1 }}
    transition={{ type: "tween", duration: 0.3 }}
  />
);
```

After:
```tsx
import { motion } from "motion/react";

const Demo = () => (
  <motion.div
    animate={{ transform: "translateX(120px) scale(1.1)" }}
    transition={{ type: "tween", duration: 0.3 }}
  />
);
```

Detector corpus sample (do not copy without validating the contextual transformation):

Before:
```tsx
import { motion } from "motion/react";

<motion.div
  animate={{ x: 120, scale: 1.1 }}
/>
```

After:
```tsx
import { motion } from "motion/react";

<motion.div
  animate={{
    transform: "translateX(120px) scale(1.1)",
  }}
/>
```

Constraints:
- Treat the Before example as representative. Confirm the detector conditions, not an exact text match.
- Make the smallest change that fixes the root cause.
- Preserve behavior and interfaces unrelated to this diagnostic.
- Reuse existing project components, utilities, and conventions.
- Do not introduce render-phase side effects, render-phase state updates, or Hooks rule violations.
- Preserve resource ownership and cleanup. Do not move work into a hotter render or frame path.
- If syntax proves only a candidate cost, require a relevant trace, bundle report, payload measurement, or metric before editing.
- Without evidence, record Needs evidence. Compare the same scenario before and after; keep the change only when its target metric improves without regression.
- Adapt identifiers and framework details instead of copying blindly.
- Do not disable the rule or suppress matching code.
- Confirm this rule is enabled for the project: `react`.

Assessment:
- Record detector evidence, applicability facts, assumptions, missing evidence, and the rule class for this occurrence.
- Return one outcome: Confirmed failure, Rejected, Needs evidence, Unavailable, Waived with evidence, or Observation.
- A waiver records the established failure, scope, authority, evidence, and review or expiry condition. It is not a pass or false positive.

Verification:
- Run focused tests for the changed behavior.
- Run React Doctor and confirm this diagnostic no longer appears from changed code.
- Run an unfiltered scan of the affected scope before claiming no cross-category regression.
- Report the files changed and any checks you could not run.
````
