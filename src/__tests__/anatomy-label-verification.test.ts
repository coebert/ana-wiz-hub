import { describe, it, expect } from "vitest";
import { execSync } from "node:child_process";

/**
 * Wraps scripts/verify-anatomy-labels.mjs as a unit test so future drift
 * in nerve-root labels or vessel-side placement fails CI rather than only
 * surfacing when someone manually runs the script.
 *
 * Script exits non-zero when any ROOT mismatches are detected. Side and
 * view mismatches are warnings (still reported in stdout for triage).
 */
describe("anatomy label verification", () => {
  it("all diagram source files agree with the canonical ground-truth map", () => {
    let stdout = "";
    let exitCode = 0;
    try {
      stdout = execSync("node scripts/verify-anatomy-labels.mjs", {
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
      });
    } catch (e: any) {
      exitCode = e.status ?? 1;
      stdout = (e.stdout?.toString?.() ?? "") + (e.stderr?.toString?.() ?? "");
    }
    if (exitCode !== 0) {
      // Surface the report inline so the failure is actionable.
      throw new Error(`Anatomy label verification failed:\n\n${stdout}`);
    }
    expect(stdout).toMatch(/0 error\(s\)/);
  });
});
