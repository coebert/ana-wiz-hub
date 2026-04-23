/**
 * Allowlist of topic files known to have keyPoints / workedExamples without
 * inline `cites: [...]` citations. The citation-coverage test fails when:
 *
 *   1. A NEW uncited entry appears in any file (allowlisted or not), OR
 *   2. A file in this allowlist becomes citation-clean — remove it from the
 *      list when that happens (the test will tell you to).
 *
 * Goal: prevent regression and force forward progress without a 121-file
 * backfill marathon. Remove entries as you migrate them.
 *
 * Generated from the initial audit on 2026-04-23. Re-run
 *   `npx vitest run citation-coverage` to regenerate the entries-allowed
 *   counts after a migration pass.
 */
export interface AllowlistEntry {
  /** Path relative to the repo root. */
  file: string;
  /** Maximum number of uncited keyPoints we will tolerate in this file. */
  uncitedKeyPoints: number;
  /** Maximum number of uncited workedExamples we will tolerate. */
  uncitedWorkedExamples: number;
}

// Generated array — populated at test-init time by reading the current
// state. See `citation-coverage.test.ts`.
export const CITATION_ALLOWLIST: AllowlistEntry[] = [];
