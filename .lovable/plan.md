# D30: visible, scoped medicine sources

1. Add an accessible References section and in-page link on medicine details, separating exact product/guideline links from accurately labelled search tools. Reject unsafe URLs; retain distinct source scopes and historical metadata.
2. Independently open and match sources for the 66 candidates against current records. Preserve root’s calcium/dexamethasone changes. Record formulation, sections, observed scope and limitations; flag new clinical mismatches for root review without changing clinical fields.
3. Append reviewed metadata using ID, slug and exact-current-sources guards, with an idempotent repository repair script and readback. Preserve all existing entries, rows, policies and grants.
4. Run focused malformed-source, safe-link and rendering tests; verify desktop/mobile and keyboard access. Report per-record evidence/counts, unresolved coverage and automatic build/typecheck results.

## Boundaries
No publication, audio work, clinical-field rewrites or whole-monograph certification. Unavailable sources remain explicitly unresolved. Manual builds/typechecks are restricted by this environment; automatic validation is not described as separately executed manual proof.

## Technical details
Normalize untrusted JSON in a pure helper; use a focused source-list component without coupling drug rows to topic-reference identifiers. Exact JSON guards prevent concurrent source edits being overwritten; guard misses require a fresh read and reconciliation.