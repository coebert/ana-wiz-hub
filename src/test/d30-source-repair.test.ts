import { describe, expect, it } from "vitest";
import { buildSourceRepair } from "../../scripts/d30-source-repair.mjs";

describe("D30 guarded metadata repair", () => {
  const old = { title: "Historical search", url: "https://bnf.nice.org.uk/search/?q=x" };
  const add = { title: "Named formulation", url: "https://example.test/product", scope: "Composition only" };
  it("guards ID, slug and exact current JSON and never changes clinical fields", () => {
    const sql = buildSourceRepair([{ id: "00000000-0000-0000-0000-000000000001", slug: "drug", before: [old], append: [add] }]);
    expect(sql).toContain("AND slug = 'drug' AND sources =");
    expect(sql).toContain(JSON.stringify([old]));
    expect(sql).toContain("SET sources = sources ||");
    expect(sql).not.toContain("dosing =");
    expect(sql).toContain("RETURNING id, slug, sources");
  });
  it("has no write when identical metadata is already present", () => {
    expect(buildSourceRepair([{ id: "id", slug: "drug", before: [old, add], append: [add] }])).toBe("-- drug: exact metadata already present");
  });
  it("refuses a missing guard", () => {
    expect(() => buildSourceRepair([{ id: "id", slug: "drug", append: [add] }])).toThrow("Incomplete exact-source guard");
  });
});