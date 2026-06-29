import { describe, it, expect } from "vitest";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";

describe("topic pages", () => {
  it("only use cites: [...] labels that exist in references.ts for that topic", () => {
    const script = resolve(__dirname, "../../scripts/check-cites-labels.mjs");
    try {
      const out = execFileSync("node", [script], { encoding: "utf8" });
      expect(out).toMatch(/No cites-label mismatches/);
    } catch (err: unknown) {
      const e = err as { stdout?: string; stderr?: string };
      throw new Error(
        `cites: label audit failed:\n${e.stderr ?? ""}${e.stdout ?? ""}`,
      );
    }
  });
});
