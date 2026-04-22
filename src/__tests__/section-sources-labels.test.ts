import { describe, it, expect } from "vitest";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";

describe("topic pages", () => {
  it("only reference sectionSources labels that exist in references.ts", () => {
    const script = resolve(
      __dirname,
      "../../scripts/check-section-sources.mjs",
    );
    try {
      const out = execFileSync("node", [script], { encoding: "utf8" });
      expect(out).toMatch(/No sectionSources label mismatches/);
    } catch (err: unknown) {
      const e = err as { stdout?: string; stderr?: string };
      throw new Error(
        `sectionSources label audit failed:\n${e.stderr ?? ""}${e.stdout ?? ""}`,
      );
    }
  });
});
