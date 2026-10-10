# `react-doctor/r3f-no-advancing-clock-in-use-frame`

Clock advanced inside useFrame

- **Status:** Active
- **Category:** Bugs
- **Assessment:** Evidence-required risk
- **Required evidence:** source code
- **Default configuration:** Enabled
- **Default severity:** warn
- **Scope:** All supported frameworks
- **Active when:** react, r3f
- **Disabled when:** r3f:10
- **Requirements:** react, r3f
- **Tags:** r3f, webgl
- **Priority:** Unranked; sorts as P3
- **Source:** oxlint-plugin-react-doctor
- **Rule set:** oxlint-plugin-react-doctor 0.9.3 (prompt schema 2)

## Validation prompt

Confirm the detector match and collect the required evidence before deciding whether an edit is warranted.

Confirm the detector conditions for `react-doctor/r3f-no-advancing-clock-in-use-frame` in the reported code. The Before example is representative, not exhaustive. Verify the same API, framework, execution context, and any documented exceptions before editing.

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

## Review a candidate correction

Apply this candidate correction only after the required evidence confirms the risk.

### Reported pattern

```tsx
useFrame(({ clock }) => {
  mesh.current.rotation.y += clock.getDelta();
});
```

### Candidate corrected pattern

```tsx
useFrame((_, delta) => {
  mesh.current.rotation.y += delta;
});
```

## Fix prompt

Apply this candidate correction only after the required evidence confirms the risk.

Use the delta argument supplied to useFrame or read clock.elapsedTime without advancing the shared clock

## Repository-wide copy prompt

Use this only for a repository-wide pass after validating each occurrence. For one occurrence, use the occurrence-level guidance above.

````text
Fix every confirmed `react-doctor/r3f-no-advancing-clock-in-use-frame` diagnostic in the current repository.

Required change:
- Use the delta argument supplied to useFrame or read clock.elapsedTime without advancing the shared clock.

Validation before editing:
Confirm the detector conditions for `react-doctor/r3f-no-advancing-clock-in-use-frame` in the reported code. The Before example is representative, not exhaustive. Verify the same API, framework, execution context, and any documented exceptions before editing.

Reference transformation:

Before:
```tsx
useFrame(({ clock }) => {
  mesh.current.rotation.y += clock.getDelta();
});
```

After:
```tsx
useFrame((_, delta) => {
  mesh.current.rotation.y += delta;
});
```

Constraints:
- Treat the Before example as representative. Confirm the detector conditions, not an exact text match.
- Make the smallest change that fixes the root cause.
- Preserve behavior and interfaces unrelated to this diagnostic.
- Reuse existing project components, utilities, and conventions.
- Do not introduce render-phase side effects, render-phase state updates, or Hooks rule violations.
- Adapt identifiers and framework details instead of copying blindly.
- Do not disable the rule or suppress matching code.
- Confirm this rule is enabled for the project: `react, r3f`.
- Do not edit code when this condition applies: r3f:10.

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
