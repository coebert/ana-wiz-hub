import { describe, it, expect } from "vitest";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";

describe("topic pages & diagrams", () => {
  it("every external URL is well-formed and not known-broken", () => {
    const script = resolve(__dirname, "../../scripts/check-external-urls.mjs");
    try {
      const out = execFileSync("node", [script], {
        encoding: "utf8",
        cwd: resolve(__dirname, "../.."),
      });
      expect(out).toMatch(/unique external URLs/);
    } catch (err: unknown) {
      const e = err as { stdout?: string; stderr?: string };
      throw new Error(
        `External URL audit failed:\n${e.stderr ?? ""}${e.stdout ?? ""}`,
      );
    }
  });
});
