/**
 * Citation-regression guard.
 *
 * Reads scripts/required-citations.snapshot.json (generated from the
 * topic_audit_findings table via `node scripts/generate-required-citations-snapshot.mjs`)
 * and asserts that every reference label previously used to satisfy a
 * fixed audit finding still appears in its topic file.
 *
 * If this test fails, the topic file has lost a citation that was required
 * to close out a content-audit finding. Either:
 *   - restore the missing <InlineRef />, <Cite />, sectionSources, or
 *     cites=[...] entry that names the listed label, OR
 *   - if the finding has been intentionally re-opened or invalidated,
 *     update the DB row (status / unverifiable_reason) and re-run
 *     `node scripts/generate-required-citations-snapshot.mjs` to refresh
 *     the snapshot.
 */
import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(__dirname, "../..");
const SNAPSHOT = resolve(ROOT, "scripts/required-citations.snapshot.json");

interface Entry {
  findingId: string;
  topicId: string;
  file: string;
  requiredLabels: string[];
}

const snapshot: { entries: Entry[] } = JSON.parse(
  readFileSync(SNAPSHOT, "utf8"),
);

describe("required-citations snapshot", () => {
  it("snapshot file exists and has entries", () => {
    expect(snapshot.entries.length).toBeGreaterThan(0);
  });

  it("every fixed finding's required citation labels still appear in its topic file", () => {
    const errors: string[] = [];
    // Cache file reads
    const fileCache = new Map<string, string | null>();
    const read = (rel: string) => {
      if (fileCache.has(rel)) return fileCache.get(rel)!;
      const abs = resolve(ROOT, rel);
      const src = existsSync(abs) ? readFileSync(abs, "utf8") : null;
      fileCache.set(rel, src);
      return src;
    };

    for (const entry of snapshot.entries) {
      const src = read(entry.file);
      if (src === null) {
        errors.push(
          `FILE:       ${entry.file}\n` +
          `  Finding ID: ${entry.findingId}\n` +
          `  Topic ID:   ${entry.topicId}\n` +
          `  ERROR:      Topic file does not exist.\n` +
          `  ACTION:     If the file was renamed, update App.tsx routes and re-run ` +
          `\`node scripts/generate-required-citations-snapshot.mjs\`.`
        );
        continue;
      }
      // At least one of the required labels must still be cited.
      const present = entry.requiredLabels.filter((l) => src.includes(`"${l}"`));
      if (present.length === 0) {
        errors.push(
          `FILE:        ${entry.file}\n` +
          `  Finding ID:  ${entry.findingId}\n` +
          `  Topic ID:    ${entry.topicId}\n` +
          `  MISSING:     ${entry.requiredLabels.map((l) => `"${l}"`).join(", ")}\n` +
          `  ACTION:      Restore an <InlineRef label="…" />, <Cite label="…" />, ` +
          `sectionSources, or cites=[…] entry that names one of the missing labels.\n` +
          `               Or, if the finding has been re-opened / invalidated, update the ` +
          `DB row and re-run \`node scripts/generate-required-citations-snapshot.mjs\`.`
        );
      }
    }
    expect(
      errors,
      "\n\n=== Citation Regression Errors ===\n\n" +
      errors.join("\n\n---\n\n") +
      "\n\n===================================\n"
    ).toEqual([]);
  });
});
