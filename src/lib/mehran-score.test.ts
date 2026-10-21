import { describe, expect, it } from "vitest";
import { mehranScore, mehranBandIndex } from "./mehran-score";

describe("Historical PCI score arithmetic", () => {
  it("rejects missing, negative and nonfinite clinical inputs", () => {
    for (const [volume, renal] of [["", "60"], ["100", ""], ["-1", "60"], ["100", "-2"], ["Infinity", "60"], ["abc", "60"]]) {
      expect(mehranScore({}, volume, renal)).toBeNull();
    }
  });
  it("keeps the four conventional table bands distinct at 5, 10 and 16", () => {
    expect([5, 6, 10, 11, 16, 17].map(mehranBandIndex)).toEqual([0, 1, 1, 2, 2, 3]);
  });
  it("assigns renal points at the boundaries", () => {
    expect(["19", "20", "39", "40", "60", "61"].map(e => mehranScore({}, "0", e))).toEqual([6, 4, 4, 2, 2, 0]);
  });
  it("adds the six clinical weights and whole 100 mL increments", () => {
    expect(mehranScore({ hypotension: true, iabp: true, chf: true, age: true, anaemia: true, diabetes: true }, "250", "19")).toBe(33);
    expect(mehranScore({}, "99", "61")).toBe(0);
    expect(mehranScore({}, "100", "61")).toBe(1);
  });
});