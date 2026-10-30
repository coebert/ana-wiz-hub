import { describe, expect, it } from "vitest";
import { glucoseGrams, gbsInspiratoryWeakness, hyperkalaemiaGlucoseSupport, HYPERKALAEMIA_GLUCOSE_CHECK_MINUTES } from "./clinical-audit-rules";

describe("Batch 4 clinical arithmetic and boundaries", () => {
  it.each([[20, 125], [50, 50], [10, 250]])("%s percent / %s mL supplies 25 g", (percent, volume) => expect(glucoseGrams(percent, volume)).toBe(25));
  it("100 mL of 20% is only 20 g", () => expect(glucoseGrams(20, 100)).toBe(20));
  it.each([[-30.1, false], [-30, false], [-29.9, true], [-20, true]])("MIP %s warning = %s", (mip, warning) => expect(gbsInspiratoryWeakness(Number(mip))).toBe(warning));
  it("rejects nonfinite and invalid signed MIP", () => { expect(gbsInspiratoryWeakness(NaN)).toBeNull(); expect(gbsInspiratoryWeakness(30)).toBeNull(); });
  it.each([[6.99, true], [7, false], [7.01, false]])("raw glucose %s support = %s", (value, support) => expect(hyperkalaemiaGlucoseSupport(Number(value))).toBe(support));
  it("UKKA July2026 checks through six hours including 90 minutes", () => expect(HYPERKALAEMIA_GLUCOSE_CHECK_MINUTES).toEqual([0,30,60,90,120,180,240,300,360]));
});