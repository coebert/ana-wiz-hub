import { describe, it, expect } from "vitest";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";

describe("topic pages", () => {
  it("only reference curriculum codes that exist in curriculumCodes.ts", () => {
    const script = resolve(
      __dirname,
      "../../scripts/check-curriculum-codes.mjs",
    );
    try {
      const out = execFileSync("node", [script], { encoding: "utf8" });
      expect(out).toMatch(/No curriculumCodes mapping issues/);
    } catch (err: unknown) {
      const e = err as { stdout?: string; stderr?: string };
      throw new Error(
        `Curriculum code mapping audit failed:\n${e.stderr ?? ""}${e.stdout ?? ""}`,
      );
    }
  });
});
