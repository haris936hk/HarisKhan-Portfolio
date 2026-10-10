# `react-doctor/rendering-hydration-mismatch-time`

Provide stable server/client time or identity data; reserve suppressHydrationWarning for an unavoidable one-level text or attribute mismatch

- **Status:** Active
- **Category:** Correctness
- **Assessment:** Evidence-required risk
- **Required evidence:** source code
- **Default configuration:** Enabled
- **Default severity:** warn
- **Scope:** All supported frameworks
- **Active when:** always
- **Requirements:** react, ssr
- **Priority:** 62 (P2)
- **Source:** oxlint-plugin-react-doctor
- **Rule set:** oxlint-plugin-react-doctor 0.9.3 (prompt schema 2)

## Validation prompt

Confirm the detector match and collect the required evidence before deciding whether an edit is warranted.

Confirm a JSX expression contains new Date(), Date.now(), Math.random(), performance.now(), or crypto.randomUUID() and can render different server and first-client output. Distinguish display text from identity: suppressHydrationWarning can silence only an unavoidable one-level text/attribute mismatch and does not reconcile different DOM, IDs, relationships, or accessibility references.

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

Prefer serializing a stable timestamp/value from the server or rendering a server-compatible initial snapshot. A mount Effect is a last resort because it adds a blank or flickering render. Use useId for DOM and accessibility IDs, and generate persistent record IDs in the data layer rather than during render. Use suppressHydrationWarning only on the exact element with an unavoidable text or attribute difference, never as an ID or structural fix. See https://react.dev/reference/react-dom/client/hydrateRoot#suppressing-unavoidable-hydration-mismatch-errors

## Repository-wide copy prompt

Use this only for a repository-wide pass after validating each occurrence. For one occurrence, use the occurrence-level guidance above.

````text
Fix every confirmed `react-doctor/rendering-hydration-mismatch-time` diagnostic in the current repository.

Required change:
- Prefer serializing a stable timestamp/value from the server or rendering a server-compatible initial snapshot. A mount Effect is a last resort because it adds a blank or flickering render. Use useId for DOM and accessibility IDs, and generate persistent record IDs in the data layer rather than during render. Use suppressHydrationWarning only on the exact element with an unavoidable text or attribute difference, never as an ID or structural fix. See https://react.dev/reference/react-dom/client/hydrateRoot#suppressing-unavoidable-hydration-mismatch-errors.

Validation before editing:
Confirm a JSX expression contains new Date(), Date.now(), Math.random(), performance.now(), or crypto.randomUUID() and can render different server and first-client output. Distinguish display text from identity: suppressHydrationWarning can silence only an unavoidable one-level text/attribute mismatch and does not reconcile different DOM, IDs, relationships, or accessibility references.

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
