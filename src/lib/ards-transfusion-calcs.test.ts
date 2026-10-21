import { describe, expect, it } from "vitest";
import { predictedBodyWeight, tidalVolumes, drivingPressure, pfBand } from "./ards-ventilation";
import { belowDiscussedTrigger, gdlToGl, THRESHOLDS_G_PER_L } from "./transfusion-thresholds";

describe("ARDS teaching arithmetic", () => {
  it("PBW male 175 cm ≈ 70.6 kg; female 160 cm ≈ 52.4 kg", () => {
    expect(predictedBodyWeight("male", 175)).toBe(70.6);
    expect(predictedBodyWeight("female", 160)).toBe(52.4);
  });
  it("6 mL/kg PBW starting tidal volume and ESICM 4–8 mL/kg range", () => {
    expect(tidalVolumes(70)).toEqual({ low: 280, start: 420, high: 560 });
  });
  it("driving pressure = plateau − PEEP", () => {
    expect(drivingPressure(28, 12)).toBe(16);
    expect(drivingPressure(10, 12)).toBeNull();
  });
  it("P/F bands and the prone threshold of <150", () => {
    expect(pfBand(90, 0.6)).toEqual({ ratio: 150, band: "moderate", proneThresholdMet: false });
    expect(pfBand(60, 0.8)?.band).toBe("severe");
    expect(pfBand(60, 0.8)?.proneThresholdMet).toBe(true);
    expect(pfBand(100, 0.4)?.band).toBe("mild");
  });
});

describe("transfusion thresholds", () => {
  it("NICE NG24: 70 g/L general, 80 g/L acute coronary syndrome", () => {
    expect(THRESHOLDS_G_PER_L.general.trigger).toBe(70);
    expect(THRESHOLDS_G_PER_L.acs.trigger).toBe(80);
  });
  it("converts trial g/dL to g/L", () => expect(gdlToGl(9)).toBe(90));
  it("Hb 75 g/L is above the general trigger but below the ACS trigger", () => {
    expect(belowDiscussedTrigger("general", 75)).toBe(false);
    expect(belowDiscussedTrigger("acs", 75)).toBe(true);
  });
});
