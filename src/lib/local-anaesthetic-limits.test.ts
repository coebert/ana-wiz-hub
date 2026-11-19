import { describe, expect, it } from "vitest";
import {
  LOCAL_ANAESTHETIC_ROWS,
  calculateLocalAnaestheticLimit,
  localAnaestheticUnsupportedReason,
} from "./local-anaesthetic-limits";

describe("Named product limits replace universal maximum-safe doses", () => {
  it("caps plain lidocaine 1% at the named product's 300 mg, not 500 mg", () => {
    expect(calculateLocalAnaestheticLimit("lidocaine-plain", 70, 1)?.maxMg).toBe(300);
    expect(calculateLocalAnaestheticLimit("lidocaine-plain", 120, 1)?.maxMg).toBe(300);
    expect(calculateLocalAnaestheticLimit("lidocaine-plain", 40, 1)?.maxMg).toBe(180);
  });

  it("keeps the with-adrenaline lidocaine ceiling separate at 500 mg", () => {
    expect(calculateLocalAnaestheticLimit("lidocaine-adrenaline", 70, 1)?.maxMg).toBe(490);
    expect(calculateLocalAnaestheticLimit("lidocaine-adrenaline", 120, 1)?.maxMg).toBe(500);
  });

  it("caps plain prilocaine 1% at the named product's 400 mg, not 600 mg", () => {
    expect(calculateLocalAnaestheticLimit("prilocaine-plain", 70, 1)?.maxMg).toBe(400);
    expect(calculateLocalAnaestheticLimit("prilocaine-plain", 120, 1)?.maxMg).toBe(400);
    expect(calculateLocalAnaestheticLimit("prilocaine-plain", 40, 1)?.maxMg).toBe(400);
  });

  it("scopes bupivacaine to the field-block table", () => {
    expect(calculateLocalAnaestheticLimit("bupivacaine-field", 70, 0.25)?.maxMg).toBe(140);
    expect(calculateLocalAnaestheticLimit("bupivacaine-field", 40, 0.25)?.maxMg).toBe(80);
  });

  it("converts the limit to a volume at the chosen strength", () => {
    const out = calculateLocalAnaestheticLimit("lidocaine-plain", 70, 1);
    expect(out?.mgPerMl).toBe(10);
    expect(out?.maxMl).toBeCloseTo(30, 5);
  });

  it.each([5, 10, 10.1] as const)("fails closed below the adult product table at %s kg", (w) => {
    expect(calculateLocalAnaestheticLimit("lidocaine-plain", w, 1)).toBeNull();
    expect(calculateLocalAnaestheticLimit("prilocaine-plain", w, 1)).toBeNull();
    expect(localAnaestheticUnsupportedReason("lidocaine-plain", w, 1)).toMatch(
      /not validated below/
    );
  });

  it("fails closed for a concentration the product table does not cover", () => {
    expect(calculateLocalAnaestheticLimit("lidocaine-plain", 70, 2)).toBeNull();
    expect(localAnaestheticUnsupportedReason("lidocaine-plain", 70, 2)).toMatch(/does not cover/);
  });

  it("does not invent a ropivacaine maximum", () => {
    expect(calculateLocalAnaestheticLimit("ropivacaine-lookup", 70, 0.5)).toBeNull();
    expect(localAnaestheticUnsupportedReason("ropivacaine-lookup", 70, 0.5)).toMatch(
      /No product-specific/
    );
  });

  it("gives every row a named product source", () => {
    for (const row of LOCAL_ANAESTHETIC_ROWS) {
      expect(row.sourceUrl).toMatch(/^https:\/\/(www\.)?medicines\.org\.uk\//);
      expect(row.technique.length).toBeGreaterThan(0);
      expect(row.route.length).toBeGreaterThan(0);
    }
  });
});
