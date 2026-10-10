# `react-doctor/no-pure-black-shadow`

Surface uses a pure-black shadow

- **Status:** Active
- **Category:** Maintainability
- **Assessment:** Creative-direction review
- **Required evidence:** source code, repository context, rendered UI, product intent
- **Default configuration:** Disabled until configured
- **Default severity:** warn
- **Scope:** All supported frameworks
- **Active when:** always
- **Tags:** design, test-noise
- **Priority:** Unranked; sorts as P3
- **Source:** oxlint-plugin-react-doctor
- **Rule set:** oxlint-plugin-react-doctor 0.9.3 (prompt schema 2)

## Validation prompt

Review the reported pattern in context before deciding whether an edit is warranted.

Confirm the detector conditions for `react-doctor/no-pure-black-shadow` in the reported code. The Before example is representative, not exhaustive. Verify the same API, framework, execution context, and any documented exceptions before editing.

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

## Review the pattern

This revision is illustrative, not proof that the reported pattern is wrong. Keep intentional choices that fit the product brief and design system.

### Reported pattern

```tsx
<article className="shadow-xl shadow-black">Report</article>
```

### One possible revision

```tsx
<article className="shadow-xl shadow-black/15">Report</article>
```

## Fix prompt

Treat this as review guidance, not a required correction. Preserve an intentional choice when the brief, design system, and rendered evidence support it.

If a pure-black shadow looks detached from its surface, use the project’s shadow token or reduce opacity or spread. Keep intentional low-alpha black shadows that match the elevation system.

## Repository-wide copy prompt

Use this only for a repository-wide pass after validating each occurrence. For one occurrence, use the occurrence-level guidance above.

````text
Review every confirmed `react-doctor/no-pure-black-shadow` diagnostic in the current repository.

Revise only when evidence supports the candidate adjustment.
- If a pure-black shadow looks detached from its surface, use the project’s shadow token or reduce opacity or spread. Keep intentional low-alpha black shadows that match the elevation system.

Validation before editing:
Confirm the detector conditions for `react-doctor/no-pure-black-shadow` in the reported code. The Before example is representative, not exhaustive. Verify the same API, framework, execution context, and any documented exceptions before editing.

Reference transformation:

Before:
```tsx
<article className="shadow-xl shadow-black">Report</article>
```

After:
```tsx
<article className="shadow-xl shadow-black/15">Report</article>
```

Constraints:
- Treat the Before example as representative. Confirm the detector conditions, not an exact text match.
- If revising, make the smallest change that addresses the observed tradeoff.
- Preserve behavior and interfaces unrelated to this diagnostic.
- Reuse existing project components, utilities, and conventions.
- This rule is explicitly classified as creative-direction review. The design tag alone never determines proof class.
- Inspect the product brief, rendered context, and existing design system before editing.
- Keep an intentional pattern that is consistent with the project, and report why it stays.
- Verify accessibility and performance claims with rendered or runtime evidence.
- Use existing brand assets, product facts, content, and design tokens.
- Do not invent claims, customer data, typefaces, artwork, or a new visual direction.
- Adapt identifiers and framework details instead of copying blindly.
- Do not change code only to silence this heuristic.

Assessment:
- Record detector evidence, applicability facts, assumptions, missing evidence, and the rule class for this occurrence.
- Return one outcome: Confirmed failure, Rejected, Needs evidence, Unavailable, Waived with evidence, or Observation.
- A waiver records the established failure, scope, authority, evidence, and review or expiry condition. It is not a pass or false positive.

Verification:
- Run focused tests for the changed behavior.
- Re-read the changed code and inspect the affected rendered state at relevant viewport, theme, input, and motion settings.
- If rendered verification is unavailable, report that limitation instead of claiming the design is fixed.
- If revised, rerun React Doctor and report whether the diagnostic remains. If kept, cite the brief, design-system, or rendered evidence.
- Report the files changed and any checks you could not run.
````
