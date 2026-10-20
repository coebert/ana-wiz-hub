import { describe, expect, it } from "vitest";
import { passRatesFor, practicePassShare, weightedOverallPassRate } from "./vivaPassRates";

describe("viva pass-rate comparison", () => {
  it("uses the RCoA June 2026 Final SOE overall rate", () => {
    expect(passRatesFor("final")!.sittings[0]).toMatchObject({ sitting: "Jun 2026", overall: 73.07 });
  });
  it("has no unverified FFICM figures", () => {
    expect(passRatesFor("fficm")).toBeNull();
  });
  it("counts 6/10 as meeting the practice pass mark", () => {
    expect(practicePassShare([6, 5, 8, 4])).toBe(50);
    expect(practicePassShare([])).toBeNull();
  });
  it("weights sittings by candidates", () => {
    const r = weightedOverallPassRate(passRatesFor("final")!);
    expect(r).toBeGreaterThan(66.9);
    expect(r).toBeLessThan(75.46);
  });
});
