# `react-doctor/no-array-index-as-key`

Use a stable unique identifier: `key={item.id}` or `key={item.slug}`: index keys break on reorder/filter

- **Status:** Active
- **Category:** Correctness
- **Assessment:** Evidence-required risk
- **Required evidence:** source code
- **Default configuration:** Enabled
- **Default severity:** warn
- **Scope:** All supported frameworks
- **Active when:** always
- **Priority:** 66 (P2)
- **Source:** oxlint-plugin-react-doctor
- **Rule set:** oxlint-plugin-react-doctor 0.9.3 (prompt schema 2)

## Validation prompt

Confirm the detector match and collect the required evidence before deciding whether an edit is warranted.

Rule flags JSX key={...} whose expression resolves to an iteration index named i, idx, or index: directly, inside a template literal, via .toString(), through String(i) or Number(i), or via '' + i string coercion. Static placeholder lists built from Array.from({length}) or new Array(N) are already excluded.

Suppress when: append-only logs whose rows have no per-item identity and never reorder or filter.

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

Use a stable per-item identifier: key={item.id}, key={item.slug}, or any field that uniquely identifies the row across renders. If items truly lack an id, derive one (content hash, crypto.randomUUID() cached on the item): never the index alone, because reordering reassigns React state across the wrong DOM nodes. See https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key

## Repository-wide copy prompt

Use this only for a repository-wide pass after validating each occurrence. For one occurrence, use the occurrence-level guidance above.

````text
Fix every confirmed `react-doctor/no-array-index-as-key` diagnostic in the current repository.

Required change:
- Use a stable per-item identifier: key={item.id}, key={item.slug}, or any field that uniquely identifies the row across renders. If items truly lack an id, derive one (content hash, crypto.randomUUID() cached on the item): never the index alone, because reordering reassigns React state across the wrong DOM nodes. See https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key.

Validation before editing:
Rule flags JSX key={...} whose expression resolves to an iteration index named i, idx, or index: directly, inside a template literal, via .toString(), through String(i) or Number(i), or via '' + i string coercion. Static placeholder lists built from Array.from({length}) or new Array(N) are already excluded.

Suppress when: append-only logs whose rows have no per-item identity and never reorder or filter.

Constraints:
- Make the smallest change that fixes the root cause.
- Preserve behavior and interfaces unrelated to this diagnostic.
- Reuse existing project components, utilities, and conventions.
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
