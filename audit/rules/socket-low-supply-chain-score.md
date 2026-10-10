# `socket/low-supply-chain-score`

A direct dependency's worst Socket security axis (supply chain or vulnerability) scores below the configured minimum: bump it to a patched/healthier release, replace it, or vet it and raise `supplyChain.minScore`

- **Status:** Active
- **Category:** Security
- **Assessment:** Evidence-required risk
- **Required evidence:** source code, repository context
- **Default severity:** error
- **Scope:** All supported frameworks
- **Active when:** project has scoreable direct dependencies; partial and staged scans require a package.json change; disabled when `supplyChain.enabled` is false
- **Priority:** 86 (P0)
- **Source:** react-doctor-core
- **Rule set:** oxlint-plugin-react-doctor 0.9.3 (prompt schema 2)
- **Documentation:** [Official documentation](https://docs.socket.dev/docs/package-scores)

## Validation prompt

Confirm the detector match and collect the required evidence before deciding whether an edit is warranted.

Project-level supply-chain check emitted by react-doctor core (not the oxlint plugin): every direct dependency: plus devDependencies unless `supplyChain.includeDevDependencies` is false: declared in package.json is scored against Socket.dev's free, keyless PURL endpoint, and ONE diagnostic fires per dependency whose WORST security axis falls below `supplyChain.minScore` (default 50, on a 0–100 scale). Only the two SECURITY axes gate: supply chain (typosquats, malicious install scripts, obfuscation, compromised or brand-new maintainer accounts) and vulnerability (known CVEs: e.g. event-stream@3.3.6, or a vulnerable minimist/lodash release). The quality / maintenance / license axes are printed in the message's axis breakdown purely as context and NEVER trigger a finding (issue #770: `@types/bun` scored quality 48 with supplyChain 100 and must not fire), so the message always names the exact security axis that failed and that number matches the socket.dev package page. CONFIRM when the named axis is a genuine exposure on a package you actually ship. SUPPRESS as a false positive when: (1) the package has already been vetted and its alert assessed as not-applicable or accepted: the right move is to raise `minScore` or restamp the check to `warning`, not to thrash the dependency; (2) the scored version is stale: the check scores the FLOOR of the declared range (the first concrete semver token in the spec, e.g. `^1.2.4` → `1.2.4`), so if your lockfile actually resolves to a higher, patched version that Socket rates fine, the finding is anchored to a version you don't run; (3) the score sits just under the threshold from a moderate or already-mitigated advisory rather than active compromise. The check is fail-open. Partial and staged scans skip it unless package.json changed, and per-package timeouts, network failures, and parse failures recover to skip, so a surfaced finding is a real low score rather than a transient outage. Specs with no concrete version (`*`, `latest`, `1.x`) or a non-registry protocol (`workspace:` / `file:` / `link:` / `npm:` / `git+…` / a URL) are not scored, and `next` is excluded by design.

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

Treat a confirmed below-threshold security-axis score as a real supply-chain risk and fix the dependency rather than silencing the gate: open the linked socket.dev package page first to read the specific alerts and per-axis breakdown for that exact version. If the VULNERABILITY axis failed (known CVE): bump to the patched release named in the advisory, update the `"<name>": "<spec>"` entry in package.json, and re-lock; when the vulnerable code is a transitive dep, force the fixed version via `overrides` (npm) / `resolutions` (yarn) / `pnpm.overrides`. If the SUPPLY-CHAIN axis failed (typosquat, install script, obfuscation, compromised or new maintainer): first confirm you meant THIS package: typosquats differ by a character or scope: and if it is abandoned or compromised, replace it with a healthier, actively-maintained equivalent and delete the entry. Only after vetting and genuinely accepting the residual risk should you quiet the finding: raise `supplyChain.minScore`, set `supplyChain.severity: "warning"` to keep it advisory, or set `supplyChain.includeDevDependencies: false` for a build-only tool: never just remove the dependency to dodge the gate or lower `minScore` blindly. See https://docs.socket.dev/docs/package-scores

## Repository-wide copy prompt

Use this only for a repository-wide pass after validating each occurrence. For one occurrence, use the occurrence-level guidance above.

````text
Fix every confirmed `socket/low-supply-chain-score` diagnostic in the current repository.

Required change:
- Treat a confirmed below-threshold security-axis score as a real supply-chain risk and fix the dependency rather than silencing the gate: open the linked socket.dev package page first to read the specific alerts and per-axis breakdown for that exact version. If the VULNERABILITY axis failed (known CVE): bump to the patched release named in the advisory, update the `"<name>": "<spec>"` entry in package.json, and re-lock; when the vulnerable code is a transitive dep, force the fixed version via `overrides` (npm) / `resolutions` (yarn) / `pnpm.overrides`. If the SUPPLY-CHAIN axis failed (typosquat, install script, obfuscation, compromised or new maintainer): first confirm you meant THIS package: typosquats differ by a character or scope: and if it is abandoned or compromised, replace it with a healthier, actively-maintained equivalent and delete the entry. Only after vetting and genuinely accepting the residual risk should you quiet the finding: raise `supplyChain.minScore`, set `supplyChain.severity: "warning"` to keep it advisory, or set `supplyChain.includeDevDependencies: false` for a build-only tool: never just remove the dependency to dodge the gate or lower `minScore` blindly. See https://docs.socket.dev/docs/package-scores

Validation before editing:
Project-level supply-chain check emitted by react-doctor core (not the oxlint plugin): every direct dependency: plus devDependencies unless `supplyChain.includeDevDependencies` is false: declared in package.json is scored against Socket.dev's free, keyless PURL endpoint, and ONE diagnostic fires per dependency whose WORST security axis falls below `supplyChain.minScore` (default 50, on a 0–100 scale). Only the two SECURITY axes gate: supply chain (typosquats, malicious install scripts, obfuscation, compromised or brand-new maintainer accounts) and vulnerability (known CVEs: e.g. event-stream@3.3.6, or a vulnerable minimist/lodash release). The quality / maintenance / license axes are printed in the message's axis breakdown purely as context and NEVER trigger a finding (issue #770: `@types/bun` scored quality 48 with supplyChain 100 and must not fire), so the message always names the exact security axis that failed and that number matches the socket.dev package page. CONFIRM when the named axis is a genuine exposure on a package you actually ship. SUPPRESS as a false positive when: (1) the package has already been vetted and its alert assessed as not-applicable or accepted: the right move is to raise `minScore` or restamp the check to `warning`, not to thrash the dependency; (2) the scored version is stale: the check scores the FLOOR of the declared range (the first concrete semver token in the spec, e.g. `^1.2.4` → `1.2.4`), so if your lockfile actually resolves to a higher, patched version that Socket rates fine, the finding is anchored to a version you don't run; (3) the score sits just under the threshold from a moderate or already-mitigated advisory rather than active compromise. The check is fail-open. Partial and staged scans skip it unless package.json changed, and per-package timeouts, network failures, and parse failures recover to skip, so a surfaced finding is a real low score rather than a transient outage. Specs with no concrete version (`*`, `latest`, `1.x`) or a non-registry protocol (`workspace:` / `file:` / `link:` / `npm:` / `git+…` / a URL) are not scored, and `next` is excluded by design.

Constraints:
- Confirm every occurrence independently.
- Make the smallest change that addresses the root cause.
- Preserve unrelated behavior, interfaces, content, and semantics.
- Reuse existing project conventions and components.
- Do not suppress the rule merely to clear the report.

Assessment:
- Record detector evidence, applicability, missing evidence, and one outcome: Confirmed failure, Rejected, Needs evidence, Unavailable, Waived with evidence, or Observation.

Verification:
- Run focused tests and every repository-mandated check.
- Run React Doctor and confirm the diagnostic no longer appears from changed code.
- Run an unfiltered scan of the affected scope before claiming no cross-category regression.
- Report checks that were not run instead of claiming they passed.
````
