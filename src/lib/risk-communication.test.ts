import { describe, expect, it } from "vitest";
import { describeRisk, absoluteRiskComparison } from "./risk-communication";

describe("Risk communication arithmetic, not patient prediction", () => {
  it("converts one in 10000 without rounding it to zero", () => {
    expect(describeRisk(0.01)).toEqual({ perTenThousand: 1, unaffectedPerTenThousand: 9999, oneIn: 10000 });
  });
  it("distinguishes absolute percentage points and relative reduction", () => {
    expect(absoluteRiskComparison(2, 1)).toEqual({ percentagePointReduction: 1, relativeReductionPercent: 50, numberNeededToTreat: 100 });
  });
  it("does not produce NNT for harm or no reduction", () => {
    expect(absoluteRiskComparison(1, 2)?.numberNeededToTreat).toBeNull();
    expect(absoluteRiskComparison(2, 2)?.numberNeededToTreat).toBeNull();
  });
  it("handles zero and certain probabilities", () => {
    expect(describeRisk(0)?.oneIn).toBeNull();
    expect(describeRisk(100)?.oneIn).toBe(1);
    expect(absoluteRiskComparison(0, 0)?.relativeReductionPercent).toBeNull();
  });
  it.each([-1, 101, NaN, Infinity])("rejects invalid probability %s", value => {
    expect(describeRisk(value)).toBeNull();
    expect(absoluteRiskComparison(2, value)).toBeNull();
  });
});