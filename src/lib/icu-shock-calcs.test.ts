import { describe, expect, it } from "vitest";
import { shockNumbers, plrChange, niceMaintenance, stopItEndDay } from "./icu-shock-calcs";

describe("ICU shock teaching arithmetic", () => {
  it("calculates MAP, shock index and cardiac power output", () => {
    expect(shockNumbers(120, 80, 50, 3)).toEqual({ map: 60, shockIndex: 1.5, belowSscMap: true, cpo: 0.4 });
    expect(shockNumbers(80, 120, 60)?.belowSscMap).toBe(false);
    expect(shockNumbers(80, 60, 90)).toBeNull();
  });
  it("uses the 10% passive leg raise threshold", () => {
    expect(plrChange(4, 4.4)).toEqual({ pct: 10, responsive: true });
    expect(plrChange(4, 4.2)?.responsive).toBe(false);
  });
  it("gives NICE 25–30 mL/kg/day maintenance", () => {
    expect(niceMaintenance(70)).toEqual({ waterLow: 1750, waterHigh: 2100, electrolyteMmol: 70 });
    expect(niceMaintenance(5)).toBeNull();
  });
  it("ends the STOP-IT course 4 days after source control", () => {
    expect(stopItEndDay("2026-10-30")).toBe("2026-11-03");
    expect(stopItEndDay("bad")).toBeNull();
  });
});
