import { describe, it, expect } from "vitest";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";

describe("topic pages", () => {
  it("every in-page href=\"#...\" resolves to a real anchor in the same file", () => {
    const script = resolve(
      __dirname,
      "../../scripts/check-topic-anchor-links.mjs",
    );
    try {
      const out = execFileSync("node", [script], { encoding: "utf8" });
      expect(out).toMatch(/No broken topic-page hash anchors/);
    } catch (err: unknown) {
      const e = err as { stdout?: string; stderr?: string };
      throw new Error(
        `Topic anchor-link audit failed:\n${e.stderr ?? ""}${e.stdout ?? ""}`,
      );
    }
  });
});
