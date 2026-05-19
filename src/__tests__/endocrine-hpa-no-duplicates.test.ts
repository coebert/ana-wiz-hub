import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Guard against re-introducing the duplicated HPA / hormone-table content
 * that existed before the Endocrine merge. If a future refactor accidentally
 * re-adds a second "Hypothalamic-Pituitary" subsection, a second hormone
 * table, or a second <HPAAxisDiagram /> on this topic page, this test fails.
 */

const FILE = resolve(
  __dirname,
  "../pages/topics/EndocrinePhysiologyTopic.tsx",
);

const countMatches = (src: string, re: RegExp) => (src.match(re) || []).length;

describe("EndocrinePhysiologyTopic — HPA / hormone-table de-duplication guard", () => {
  const src = readFileSync(FILE, "utf8");

  it("renders the HPA axis diagram exactly once", () => {
    expect(countMatches(src, /<HPAAxisDiagram\b/g)).toBe(1);
  });

  it("contains a single hypothalamic-pituitary / HPA subsection", () => {
    const titles = countMatches(
      src,
      /<CollapsibleSubsection[^>]*title="[^"]*(Hypothalamic-Pituitary|HPA)[^"]*"/g,
    );
    expect(titles).toBe(1);
  });

  it("contains a single pituitary hormone table (one ACTH/ADH/TSH/GH row each)", () => {
    for (const hormone of ["ACTH", "ADH (vasopressin)", "TSH", "GH"]) {
      const escaped = hormone.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const rowRe = new RegExp(
        `<td[^>]*>\\s*${escaped}\\s*</td>`,
        "g",
      );
      expect(
        countMatches(src, rowRe),
        `expected exactly one table row for ${hormone}`,
      ).toBe(1);
    }
  });

  it("does not wrap <HPAAxisDiagram /> in an extra bordered card (diagram self-styles)", () => {
    // Catches the previous bug where the diagram sat inside a duplicate
    // `bg-card rounded-xl border border-border` wrapper.
    const wrapped = /border\s+border-border[^"]*"[^>]*>\s*<HPAAxisDiagram\b/.test(src)
      || /<div[^>]*bg-card[^"]*rounded-xl[^"]*border[^"]*"[^>]*>\s*<HPAAxisDiagram\b/.test(src);
    expect(wrapped).toBe(false);
  });
});
