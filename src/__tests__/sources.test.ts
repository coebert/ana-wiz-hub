import { describe, it, expect } from "vitest";
import {
  sources,
  getSource,
  resolveReference,
  resolveReferences,
} from "@/data/sources";
import type { Reference } from "@/data/references";

describe("source library", () => {
  it("has unique kebab-case ids", () => {
    const ids = sources.map((s) => s.id);
    const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect(dupes).toEqual([]);
    for (const id of ids) {
      expect(id).toMatch(/^[a-z][a-z0-9-]*$/);
    }
  });

  it("getSource returns the canonical record", () => {
    const peck = getSource("peck-hill");
    expect(peck?.shortName).toBe("Peck & Hill");
    expect(peck?.type).toBe("textbook");
    expect(getSource("does-not-exist")).toBeUndefined();
  });

  it("resolveReference formats a textbook citation consistently", () => {
    const ref = resolveReference({ sourceId: "peck-hill", locator: "Ch.3" });
    expect(ref.label).toBe("Peck & Hill Ch.3");
    expect(ref.citation).toContain("Peck TE, Hill SA");
    expect(ref.citation).toContain("Pharmacology for Anaesthesia");
    expect(ref.citation).toContain("5th ed.");
    expect(ref.citation).toContain("Cambridge University Press; 2021");
    expect(ref.citation).toContain("Ch.3");
    expect(ref.citation.endsWith(".")).toBe(true);
  });

  it("resolveReference formats a journal citation with article details", () => {
    const ref = resolveReference({
      sourceId: "bja-education",
      year: 2017,
      locator: "17(3):73-78",
      articleAuthor: "Thomas G",
      articleTitle: "Gas laws and physics relevant to anaesthesia",
      url: "https://doi.org/10.1093/bjaed/mkw052",
    });
    expect(ref.label).toBe("BJA Education 17(3):73-78");
    expect(ref.citation).toContain("Thomas G");
    expect(ref.citation).toContain("Gas laws and physics relevant to anaesthesia");
    expect(ref.citation).toContain("BJA Education");
    expect(ref.citation).toContain("2017");
    expect(ref.url).toBe("https://doi.org/10.1093/bjaed/mkw052");
  });

  it("resolveReference falls back to a usable shape for unknown ids", () => {
    const ref = resolveReference({ sourceId: "made-up-source", locator: "p.1" });
    expect(ref.label).toBe("made-up-source");
    expect(ref.citation).toContain("Unknown source");
  });

  it("resolveReferences accepts a mix of compact and legacy entries", () => {
    const legacy: Reference = {
      label: "Hand-rolled",
      citation: "Some legacy citation.",
    };
    const out = resolveReferences([
      { sourceId: "peck-hill", locator: "Ch.1" },
      legacy,
    ]);
    expect(out).toHaveLength(2);
    expect(out[0].label).toBe("Peck & Hill Ch.1");
    expect(out[1]).toBe(legacy);
  });
});
