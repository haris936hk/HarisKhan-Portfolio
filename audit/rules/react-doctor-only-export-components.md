# `react-doctor/only-export-components`

Move non-component exports out of files that export components.

- **Status:** Active
- **Category:** Architecture
- **Assessment:** Evidence-required risk
- **Required evidence:** source code, repository context
- **Default configuration:** Enabled
- **Default severity:** warn
- **Scope:** All supported frameworks
- **Active when:** always
- **Requirements:** react
- **Priority:** 12 (P3)
- **Source:** oxlint-plugin-react-doctor
- **Rule set:** oxlint-plugin-react-doctor 0.9.3 (prompt schema 2)
- **Documentation:** [Official documentation](https://oxc.rs/docs/guide/usage/linter/rules/react/only-export-components)

## Validation prompt

Confirm the detector match and collect the required evidence before deciding whether an edit is warranted.

Fires only in .tsx/.jsx files (or .js with checkJS) that also export at least one React component, when the same module also exports a non-component value (utility fn, object, enum, createContext result), uses `export *`, ships an anonymous/unnamed default export, or defines a local component alongside exports: anything that breaks Vite/react-refresh Fast Refresh boundaries. Stable constants are NOT flagged (allowConstantExport defaults true), and `use[A-Z]` hook exports plus names in allowExportNames are always allowed.

Suppress when: files conventionally exempted by basename (main/index/bootstrap entrypoints, icons/assets/utils/constants/types/hooks/*ShapeUtil/*Node files, test/spec/stories/cypress) are skipped, so a finding on such a path is likely stale or a misclassified filename.

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

Split the module so the component file exports only components (and constants/hooks if your toolchain allows them): move utility functions, enums, objects, and `createContext(...)` calls into a sibling non-component file and re-import them (`import { ChatContext } from './context'`). Name anonymous defaults (`export default function Foo() {}` instead of `export default () => {}`), and replace `export *` with explicit named exports. If a non-component export is genuinely HMR-safe (e.g. a Remix `loader`/`meta`), add it to the rule's `allowExportNames` setting rather than disabling the rule. See https://oxc.rs/docs/guide/usage/linter/rules/react/only-export-components

## Repository-wide copy prompt

Use this only for a repository-wide pass after validating each occurrence. For one occurrence, use the occurrence-level guidance above.

````text
Fix every confirmed `react-doctor/only-export-components` diagnostic in the current repository.

Required change:
- Split the module so the component file exports only components (and constants/hooks if your toolchain allows them): move utility functions, enums, objects, and `createContext(...)` calls into a sibling non-component file and re-import them (`import { ChatContext } from './context'`). Name anonymous defaults (`export default function Foo() {}` instead of `export default () => {}`), and replace `export *` with explicit named exports. If a non-component export is genuinely HMR-safe (e.g. a Remix `loader`/`meta`), add it to the rule's `allowExportNames` setting rather than disabling the rule. See https://oxc.rs/docs/guide/usage/linter/rules/react/only-export-components.

Validation before editing:
Fires only in .tsx/.jsx files (or .js with checkJS) that also export at least one React component, when the same module also exports a non-component value (utility fn, object, enum, createContext result), uses `export *`, ships an anonymous/unnamed default export, or defines a local component alongside exports: anything that breaks Vite/react-refresh Fast Refresh boundaries. Stable constants are NOT flagged (allowConstantExport defaults true), and `use[A-Z]` hook exports plus names in allowExportNames are always allowed.

Suppress when: files conventionally exempted by basename (main/index/bootstrap entrypoints, icons/assets/utils/constants/types/hooks/*ShapeUtil/*Node files, test/spec/stories/cypress) are skipped, so a finding on such a path is likely stale or a misclassified filename.

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
