import { describe, expect, it } from "vitest";
import { pfBand } from "./ards-ventilation";
import { shockNumbers, plrChange } from "./icu-shock-calcs";

describe("SCI-017: raw oxygenation thresholds (mmHg / fraction)", () => {
  it.each([
    [99.6, "severe"], [100, "severe"], [100.4, "moderate"],
    [199.6, "moderate"], [200, "moderate"], [200.4, "mild"],
    [299.6, "mild"], [300, "mild"], [300.4, "above ARDS range"],
  ])("classifies raw P/F %s as %s", (ratio, band) => {
    expect(pfBand(Number(ratio) * 0.5, 0.5)?.band).toBe(band);
  });
  it.each([[149.6, true], [150, false], [150.4, false]])("uses strict raw <150 at %s", (ratio, met) => {
    expect(pfBand(Number(ratio) * 0.5, 0.5)?.proneThresholdMet).toBe(met);
  });
});

describe("SCI-018: unrounded MAP and PLR decisions", () => {
  it.each([[94, 50, true], [95, 50, false], [96, 50, false]])("MAP threshold with SBP %s / DBP %s", (sbp, dbp, below) => {
    expect(shockNumbers(80, Number(sbp), Number(dbp), 4)?.belowSscMap).toBe(below);
  });
  it("uses raw MAP in power arithmetic, not displayed 65", () => {
    expect(shockNumbers(80, 94, 50, 4)).toMatchObject({ map: 65, cpo: 0.57, belowSscMap: true });
  });
  it.each([[9.94, false], [9.96, false], [10, true], [10.01, true]])("PLR raw %s percent", (pct, responsive) => {
    expect(plrChange(4, 4 * (1 + Number(pct) / 100))?.responsive).toBe(responsive);
  });
  it("does not treat a substantive below-boundary value as representation error", () => {
    expect(plrChange(4, 4.399999999)?.responsive).toBe(false);
  });
});