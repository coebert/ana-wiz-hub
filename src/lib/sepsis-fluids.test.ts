import { describe, expect, it } from "vitest";
import { sepsisFluidComparison } from "./sepsis-fluids";

describe("sepsis fluid teaching comparison", () => {
  it("SSC 2021 suggests 30 mL/kg: 70 kg gives 2,100 mL", () => {
    expect(sepsisFluidComparison("70", "")?.sscMl).toBe(2100);
  });
  it("NICE NG253: four 250 mL boluses before the 1,000 mL senior review", () => {
    expect(sepsisFluidComparison("70", "0")?.niceBolusesBeforeReview).toBe(4);
  });
  it("NICE total includes fluid already given", () => {
    const r = sepsisFluidComparison("70", "500");
    expect(r?.niceRemainingMl).toBe(500);
    expect(r?.niceBolusesBeforeReview).toBe(2);
  });
  it("senior review is due once 1,000 mL has been given", () => {
    expect(sepsisFluidComparison("70", "1000")?.seniorReviewDue).toBe(true);
  });
  it("rejects blank, zero or negative inputs", () => {
    expect(sepsisFluidComparison("", "0")).toBeNull();
    expect(sepsisFluidComparison("0", "0")).toBeNull();
    expect(sepsisFluidComparison("70", "-1")).toBeNull();
  });
});
