# `react-doctor/no-mutable-in-deps`

Read mutable values (`location.pathname`, `ref.current`) inside the effect body instead of in the deps array, or subscribe with `useSyncExternalStore`. Mutations to these don't trigger re-renders, so listing them in deps doesn't make the effect react to changes

- **Status:** Active
- **Category:** State & Effects
- **Assessment:** Evidence-required risk
- **Required evidence:** source code
- **Default configuration:** Enabled
- **Default severity:** error
- **Scope:** All supported frameworks
- **Active when:** always
- **Requirements:** react
- **Priority:** 42 (P3)
- **Source:** oxlint-plugin-react-doctor
- **Rule set:** oxlint-plugin-react-doctor 0.9.3 (prompt schema 2)

## Validation prompt

Confirm the detector match and collect the required evidence before deciding whether an edit is warranted.

Fires on a deps array element of useEffect/useLayoutEffect/useMemo/useCallback that is EITHER (a) '<x>.current' where 'x' is a 'useRef(...)' binding declared in the same component, OR (b) any MemberExpression whose ROOT identifier name is one of 'location','window','document','navigator','history','screen','performance': e.g. 'location.pathname', 'window.innerWidth'. Crucially, branch (b) matches on the NAME ALONE; it never checks what that root actually resolves to. CONFIRM branch (a) ref.current always: refs are mutable and never re-trigger an effect. CONFIRM branch (b) ONLY when the root is the genuine browser global (no in-scope binding shadows it; the file reads it implicitly off 'window'). SUPPRESS branch (b) when the root is a LOCAL reactive binding that merely shares the global's name: most commonly 'const location = useLocation()' (react-router), 'const location = useLiveData(...location$)', or any hook return / prop / state / context value named 'location','history', etc. Those values are reactive: React re-runs the effect when they change, so 'location.pathname' in deps is correct and intended. Tell: an import or 'const <name> = ...' for that root inside (or above) the component means it is NOT the global: suppress.

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

Principle: list in deps only values React can compare across renders; mutable refs and live browser globals can't drive re-runs, so move the READ into the effect and let a real reactive value (or a subscription) trigger it. (A) ref.current: delete '<ref>.current' from the deps array and read it inside the effect body: 'useEffect(() => { const el = ref.current; if (!el) return; observe(el) }, [])'. The effect already re-reads the latest '.current' on every run; if you need to re-run when a DOM node attaches, use a ref CALLBACK ('<div ref={node => ...}>') instead. (B) Genuine browser global ('window.innerWidth','location.pathname' off the real window): remove it from deps and read it inside the body; when you truly must re-render on its changes, subscribe via 'useSyncExternalStore' (e.g. a resize/popstate listener) rather than listing the mutable read. Anti-pattern: do NOT 'just add an eslint-disable' or duplicate the value into useState only to mirror it: that re-introduces stale state. NOTE the common false alarm: if the root is a LOCAL binding like 'const location = useLocation()' it is already reactive: keep 'location.pathname' in deps unchanged; no fix needed. See https://react.dev/learn/lifecycle-of-reactive-effects#all-variables-declared-in-the-component-body-are-reactive

## Repository-wide copy prompt

Use this only for a repository-wide pass after validating each occurrence. For one occurrence, use the occurrence-level guidance above.

````text
Fix every confirmed `react-doctor/no-mutable-in-deps` diagnostic in the current repository.

Required change:
- Principle: list in deps only values React can compare across renders; mutable refs and live browser globals can't drive re-runs, so move the READ into the effect and let a real reactive value (or a subscription) trigger it. (A) ref.current: delete '<ref>.current' from the deps array and read it inside the effect body: 'useEffect(() => { const el = ref.current; if (!el) return; observe(el) }, [])'. The effect already re-reads the latest '.current' on every run; if you need to re-run when a DOM node attaches, use a ref CALLBACK ('<div ref={node => ...}>') instead. (B) Genuine browser global ('window.innerWidth','location.pathname' off the real window): remove it from deps and read it inside the body; when you truly must re-render on its changes, subscribe via 'useSyncExternalStore' (e.g. a resize/popstate listener) rather than listing the mutable read. Anti-pattern: do NOT 'just add an eslint-disable' or duplicate the value into useState only to mirror it: that re-introduces stale state. NOTE the common false alarm: if the root is a LOCAL binding like 'const location = useLocation()' it is already reactive: keep 'location.pathname' in deps unchanged; no fix needed. See https://react.dev/learn/lifecycle-of-reactive-effects#all-variables-declared-in-the-component-body-are-reactive.

Validation before editing:
Fires on a deps array element of useEffect/useLayoutEffect/useMemo/useCallback that is EITHER (a) '<x>.current' where 'x' is a 'useRef(...)' binding declared in the same component, OR (b) any MemberExpression whose ROOT identifier name is one of 'location','window','document','navigator','history','screen','performance': e.g. 'location.pathname', 'window.innerWidth'. Crucially, branch (b) matches on the NAME ALONE; it never checks what that root actually resolves to. CONFIRM branch (a) ref.current always: refs are mutable and never re-trigger an effect. CONFIRM branch (b) ONLY when the root is the genuine browser global (no in-scope binding shadows it; the file reads it implicitly off 'window'). SUPPRESS branch (b) when the root is a LOCAL reactive binding that merely shares the global's name: most commonly 'const location = useLocation()' (react-router), 'const location = useLiveData(...location$)', or any hook return / prop / state / context value named 'location','history', etc. Those values are reactive: React re-runs the effect when they change, so 'location.pathname' in deps is correct and intended. Tell: an import or 'const <name> = ...' for that root inside (or above) the component means it is NOT the global: suppress.

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
