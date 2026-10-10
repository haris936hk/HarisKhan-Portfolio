# `react-doctor/design-no-space-on-flex-children`

Use `gap-*` on the flex/grid parent. `space-x-*` / `space-y-*` produce phantom gaps when a sibling is conditionally rendered, lose vertical spacing on wrapped lines, and don't mirror in RTL

- **Status:** Active
- **Category:** Architecture
- **Assessment:** Evidence-required risk
- **Required evidence:** source code, repository context
- **Default configuration:** Disabled until configured
- **Default severity:** warn
- **Scope:** All supported frameworks
- **Active when:** always
- **Requirements:** react
- **Tags:** design, test-noise
- **Priority:** 42 (P3)
- **Source:** oxlint-plugin-react-doctor
- **Rule set:** oxlint-plugin-react-doctor 0.9.3 (prompt schema 2)

## Validation prompt

Confirm the detector match and collect the required evidence before deciding whether an edit is warranted.

Fires when ONE className contains both a flex/grid display token (flex, inline-flex, grid, inline-grid: variant prefixes like md:flex are honored by stripping to the last segment) AND a space-x-N or space-y-N token. The rule does NOT flag space-* on plain block containers, even though gap is preferable there too.

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

## Fix prompt

Apply this candidate correction only after the required evidence confirms the risk.

Replace space-x-N with gap-x-N and space-y-N with gap-y-N on the parent: keep the axis suffix (bare gap-N adds the other direction silently). gap survives conditional siblings without phantom margins, mirrors correctly in RTL, and handles flex-wrap rows. https://tailwindcss.com/docs/gap

## Repository-wide copy prompt

Use this only for a repository-wide pass after validating each occurrence. For one occurrence, use the occurrence-level guidance above.

````text
Fix every confirmed `react-doctor/design-no-space-on-flex-children` diagnostic in the current repository.

Required change:
- Replace space-x-N with gap-x-N and space-y-N with gap-y-N on the parent: keep the axis suffix (bare gap-N adds the other direction silently). gap survives conditional siblings without phantom margins, mirrors correctly in RTL, and handles flex-wrap rows. https://tailwindcss.com/docs/gap.

Validation before editing:
Fires when ONE className contains both a flex/grid display token (flex, inline-flex, grid, inline-grid: variant prefixes like md:flex are honored by stripping to the last segment) AND a space-x-N or space-y-N token. The rule does NOT flag space-* on plain block containers, even though gap is preferable there too.

Constraints:
- Make the smallest change that fixes the root cause.
- Preserve behavior and interfaces unrelated to this diagnostic.
- Reuse existing project components, utilities, and conventions.
- Do not introduce render-phase side effects, render-phase state updates, or Hooks rule violations.
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
