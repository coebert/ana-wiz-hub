import { describe, expect, it } from "vitest";
import { MAC_AGE_MIN_YEARS, macForAge, temperatureFactor } from "./mac-for-age";

describe("Mapleson age correction is limited to age over 1 year", () => {
  it("returns the age-40 value at 40 years", () => {
    expect(macForAge(1.8, 40)).toBeCloseTo(1.8, 10);
  });

  it("falls about 6% per decade", () => {
    expect(macForAge(1.8, 50)).toBeCloseTo(1.8 * Math.pow(10, -0.0269), 10);
    expect(macForAge(1.8, 60)!).toBeLessThan(macForAge(1.8, 50)!);
  });

  it.each([0, 0.5, 0.99])("refuses infant extrapolation at %s years", (age) => {
    expect(macForAge(1.8, Number(age))).toBeNull();
  });

  it("computes at the validated lower bound", () => {
    expect(macForAge(1.8, MAC_AGE_MIN_YEARS)).not.toBeNull();
  });

  it("rejects invalid MAC and age input", () => {
    expect(macForAge(0, 40)).toBeNull();
    expect(macForAge(1.8, Number.NaN)).toBeNull();
  });

  it("lowers the illustrative factor with hypothermia and never raises it", () => {
    expect(temperatureFactor(37)).toBe(1);
    expect(temperatureFactor(35)).toBeCloseTo(0.9025, 5);
    expect(temperatureFactor(39)).toBe(1);
  });
});
