# `react-doctor/use-lazy-motion`

Consider LazyMotion for routes that ship the full Motion component; verify the installed package, required features, and measured bundle impact

- **Status:** Active
- **Category:** Bundle Size
- **Assessment:** Evidence-required risk
- **Required evidence:** source code
- **Default configuration:** Enabled
- **Default severity:** warn
- **Scope:** All supported frameworks
- **Active when:** always
- **Tags:** test-noise
- **Priority:** 48 (P3)
- **Source:** oxlint-plugin-react-doctor
- **Rule set:** oxlint-plugin-react-doctor 0.9.3 (prompt schema 2)

## Validation prompt

Confirm the detector match and collect the required evidence before deciding whether an edit is warranted.

The detector reports a non-type named `motion` import from exactly "framer-motion" or "motion/react"; it does not measure the produced chunk, feature usage, route boundary, or an existing LazyMotion provider elsewhere. Current Motion documentation quotes Rollup-generated reference sizes, which are not universal across versions and bundlers. Confirm the import reaches the affected client bundle and inventory drag, pan, layout projection, gestures, and mixed `motion`/`m` descendants. Suppress when the route is already isolated behind an appropriate dynamic boundary, the installed version has a different supported API, domMax leaves no material saving, or a bundle report shows no worthwhile reduction.

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

For the current `motion` package, import `{ LazyMotion, domAnimation }` from "motion/react", import `* as m` from "motion/react-m", wrap the relevant client subtree once in `<LazyMotion features={domAnimation}>`, and replace Motion components in that subtree with `m.*`. Use domMax when the subtree needs pan, drag, or layout animation. Add LazyMotion strict mode only after every descendant is converted, because importing/rendering the full `motion` component defeats the split. For an existing `framer-motion` dependency, use the API supported by its installed version instead of silently migrating packages. Preserve client/server and code-splitting boundaries, then compare the actual route chunk before and after. See https://motion.dev/docs/react-reduce-bundle-size

## Repository-wide copy prompt

Use this only for a repository-wide pass after validating each occurrence. For one occurrence, use the occurrence-level guidance above.

````text
Fix every confirmed `react-doctor/use-lazy-motion` diagnostic in the current repository.

Required change:
- For the current `motion` package, import `{ LazyMotion, domAnimation }` from "motion/react", import `* as m` from "motion/react-m", wrap the relevant client subtree once in `<LazyMotion features={domAnimation}>`, and replace Motion components in that subtree with `m.*`. Use domMax when the subtree needs pan, drag, or layout animation. Add LazyMotion strict mode only after every descendant is converted, because importing/rendering the full `motion` component defeats the split. For an existing `framer-motion` dependency, use the API supported by its installed version instead of silently migrating packages. Preserve client/server and code-splitting boundaries, then compare the actual route chunk before and after. See https://motion.dev/docs/react-reduce-bundle-size.

Validation before editing:
The detector reports a non-type named `motion` import from exactly "framer-motion" or "motion/react"; it does not measure the produced chunk, feature usage, route boundary, or an existing LazyMotion provider elsewhere. Current Motion documentation quotes Rollup-generated reference sizes, which are not universal across versions and bundlers. Confirm the import reaches the affected client bundle and inventory drag, pan, layout projection, gestures, and mixed `motion`/`m` descendants. Suppress when the route is already isolated behind an appropriate dynamic boundary, the installed version has a different supported API, domMax leaves no material saving, or a bundle report shows no worthwhile reduction.

Constraints:
- Make the smallest change that fixes the root cause.
- Preserve behavior and interfaces unrelated to this diagnostic.
- Reuse existing project components, utilities, and conventions.
- Preserve resource ownership and cleanup. Do not move work into a hotter render or frame path.
- If syntax proves only a candidate cost, require a relevant trace, bundle report, payload measurement, or metric before editing.
- Without evidence, record Needs evidence. Compare the same scenario before and after; keep the change only when its target metric improves without regression.
- Adapt identifiers and framework details instead of copying blindly.
- Do not disable the rule or suppress matching code.

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
