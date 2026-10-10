# `react-doctor/no-effect-chain`

Compute as much as possible during render (e.g. `const isGameOver = round > 5`) and write all related state inside the event handler that originally fires the chain. Each effect link adds an extra render and makes the code rigid as requirements evolve

- **Status:** Active
- **Category:** State & Effects
- **Assessment:** Evidence-required risk
- **Required evidence:** source code
- **Default configuration:** Enabled
- **Default severity:** warn
- **Scope:** All supported frameworks
- **Active when:** always
- **Requirements:** react
- **Tags:** test-noise
- **Priority:** 56 (P2)
- **Source:** oxlint-plugin-react-doctor
- **Rule set:** oxlint-plugin-react-doctor 0.9.3 (prompt schema 2)

## Validation prompt

Confirm the detector match and collect the required evidence before deciding whether an edit is warranted.

Fires when one effect synchronously updates state that triggers a sibling effect, creating an avoidable render chain. It follows directly invoked helpers and `useEffect` or `useLayoutEffect` callback aliases. It excludes deferred writes in promises, timers, and async helpers. It also excludes effects that synchronize an external system through browser storage, Document Object Model (DOM) methods, observers, subscriptions, fetches, delegated context or prop setters, or a returned cleanup. A function-shaped cleanup and an opaque cleanup-return helper both establish external ownership; a proven state-setter return does not.

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

Compute derived values during render and move related state writes into the event handler that starts the chain. Use one reducer action when several fields form one transition. Keep effects that synchronize external systems. See https://react.dev/learn/you-might-not-need-an-effect#chains-of-computations

## Repository-wide copy prompt

Use this only for a repository-wide pass after validating each occurrence. For one occurrence, use the occurrence-level guidance above.

````text
Fix every confirmed `react-doctor/no-effect-chain` diagnostic in the current repository.

Required change:
- Compute derived values during render and move related state writes into the event handler that starts the chain. Use one reducer action when several fields form one transition. Keep effects that synchronize external systems. See https://react.dev/learn/you-might-not-need-an-effect#chains-of-computations.

Validation before editing:
Fires when one effect synchronously updates state that triggers a sibling effect, creating an avoidable render chain. It follows directly invoked helpers and `useEffect` or `useLayoutEffect` callback aliases. It excludes deferred writes in promises, timers, and async helpers. It also excludes effects that synchronize an external system through browser storage, Document Object Model (DOM) methods, observers, subscriptions, fetches, delegated context or prop setters, or a returned cleanup. A function-shaped cleanup and an opaque cleanup-return helper both establish external ownership; a proven state-setter return does not.

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
