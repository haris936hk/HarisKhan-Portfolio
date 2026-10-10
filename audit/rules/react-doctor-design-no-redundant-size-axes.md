# `react-doctor/design-no-redundant-size-axes`

Collapse `w-N h-N` to `size-N` (Tailwind v3.4+) when both axes match

- **Status:** Active
- **Category:** Architecture
- **Assessment:** Evidence-required risk
- **Required evidence:** source code, repository context
- **Default configuration:** Disabled until configured
- **Default severity:** warn
- **Scope:** All supported frameworks
- **Active when:** always
- **Requirements:** tailwind:3.4
- **Tags:** design, test-noise
- **Priority:** 14 (P3)
- **Source:** oxlint-plugin-react-doctor
- **Rule set:** oxlint-plugin-react-doctor 0.9.3 (prompt schema 2)

## Validation prompt

Confirm the detector match and collect the required evidence before deciding whether an edit is warranted.

Fires when className contains matching w-N and h-N tokens with identical values (w-10 h-10, w-[12px] h-[12px], negatives included). Fractional widths like w-1/2 don't match because no size-1/2 shorthand exists, and a responsive prefix on either axis suppresses the warning. The rule is tagged requires: tailwind:3.4.

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

Collapse to size-N (w-10 h-10 → size-10, w-[24px] h-[24px] → size-[24px]). The size-* utility shipped in Tailwind v3.4 and sets width and height in one token, cutting your icon and avatar classes in half. https://tailwindcss.com/docs/size

## Repository-wide copy prompt

Use this only for a repository-wide pass after validating each occurrence. For one occurrence, use the occurrence-level guidance above.

````text
Fix every confirmed `react-doctor/design-no-redundant-size-axes` diagnostic in the current repository.

Required change:
- Collapse to size-N (w-10 h-10 → size-10, w-[24px] h-[24px] → size-[24px]). The size-* utility shipped in Tailwind v3.4 and sets width and height in one token, cutting your icon and avatar classes in half. https://tailwindcss.com/docs/size.

Validation before editing:
Fires when className contains matching w-N and h-N tokens with identical values (w-10 h-10, w-[12px] h-[12px], negatives included). Fractional widths like w-1/2 don't match because no size-1/2 shorthand exists, and a responsive prefix on either axis suppresses the warning. The rule is tagged requires: tailwind:3.4.

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
