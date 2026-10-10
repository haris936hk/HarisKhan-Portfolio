# `react-doctor/html-has-lang`

Require a lang attribute on the html element so screen readers use the right pronunciation rules.

- **Status:** Active
- **Category:** Accessibility
- **Assessment:** Evidence-required risk
- **Required evidence:** source code, rendered UI, accessibility audit
- **Default configuration:** Enabled
- **Default severity:** warn
- **Scope:** All supported frameworks
- **Active when:** always (unless customRulesOnly=true)
- **Requirements:** react
- **Tags:** react-jsx-only
- **Priority:** 56 (P2)
- **Source:** oxlint-plugin-react-doctor
- **Rule set:** oxlint-plugin-react-doctor 0.9.3 (prompt schema 2)
- **Documentation:** [Official documentation](https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/html-has-lang)

## Validation prompt

Confirm the detector match and collect the required evidence before deciding whether an edit is warranted.

Fires on a JSX <html> element without a lang prop, or with lang set to an empty string. The rule only inspects the literal <html> tag in the current file.

Suppress when: in Next.js App Router, lang is set on <html> in the root layout: a deeper file rendering its own <html> usually indicates a different structural problem, not a missed attribute.

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

Add a BCP 47 language code: <html lang='en'> for English, <html lang='en-US'> for regional variants, or <html lang={locale}> driven from i18n state. Screen readers use lang to switch pronunciation rules and dictionaries; without it, they fall back to the user's OS language and mispronounce content. See https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/html-has-lang

## Repository-wide copy prompt

Use this only for a repository-wide pass after validating each occurrence. For one occurrence, use the occurrence-level guidance above.

````text
Fix every confirmed `react-doctor/html-has-lang` diagnostic in the current repository.

Required change:
- Add a BCP 47 language code: <html lang='en'> for English, <html lang='en-US'> for regional variants, or <html lang={locale}> driven from i18n state. Screen readers use lang to switch pronunciation rules and dictionaries; without it, they fall back to the user's OS language and mispronounce content. See https://oxc.rs/docs/guide/usage/linter/rules/jsx_a11y/html-has-lang.

Validation before editing:
Fires on a JSX <html> element without a lang prop, or with lang set to an empty string. The rule only inspects the literal <html> tag in the current file.

Suppress when: in Next.js App Router, lang is set on <html> in the root layout: a deeper file rendering its own <html> usually indicates a different structural problem, not a missed attribute.

Constraints:
- Make the smallest change that fixes the root cause.
- Preserve behavior and interfaces unrelated to this diagnostic.
- Reuse existing project components, utilities, and conventions.
- Do not introduce render-phase side effects, render-phase state updates, or Hooks rule violations.
- Preserve accessible names, focus order, keyboard behavior, and touch access not targeted by this rule.
- Adapt identifiers and framework details instead of copying blindly.
- Do not disable the rule or suppress matching code.
- Confirm this rule is enabled for the project: `always (unless customRulesOnly=true)`.

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
