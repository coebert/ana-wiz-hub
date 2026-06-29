import { describe, it, expect } from "vitest";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";

describe("topic pages", () => {
  it("every href=\"#...\" and SVG fragment ref resolves to a real anchor", () => {
    const script = resolve(
      __dirname,
      "../../scripts/check-topic-anchor-links.mjs",
    );
    try {
      const out = execFileSync("node", [script], { encoding: "utf8" });
      expect(out).toMatch(/No broken hash anchors/);
    } catch (err: unknown) {
      const e = err as { stdout?: string; stderr?: string };
      throw new Error(
        `Topic anchor-link audit failed:\n${e.stderr ?? ""}${e.stdout ?? ""}`,
      );
    }
  });
});
