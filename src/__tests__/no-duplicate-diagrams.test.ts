import { describe, it, expect } from "vitest";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";

describe("topic pages", () => {
  it("do not render the same diagram component more than once", () => {
    const script = resolve(__dirname, "../../scripts/check-duplicate-diagrams.mjs");
    try {
      const out = execFileSync("node", [script], { encoding: "utf8" });
      expect(out).toMatch(/No duplicate diagram usages/);
    } catch (err: unknown) {
      const e = err as { stdout?: string; stderr?: string };
      throw new Error(
        `Duplicate diagram check failed:\n${e.stderr ?? ""}${e.stdout ?? ""}`,
      );
    }
  });
});
