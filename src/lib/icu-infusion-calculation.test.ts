import { expect, it } from "vitest";
import { icuInfusionGroups } from "@/data/icuInfusions";
import { icuInfusionAmountPerHour } from "./icu-infusion-calculation";
it("activity units stay units: heparin 18 units/kg/h at 70 kg and 500 units/mL is 2.52 mL/h", () => {
  const drug = icuInfusionGroups.flatMap(g => g.infusions).find(d => d.unit === "units/kg/h");
  if (!drug) throw new Error("Missing heparin infusion");
  expect(icuInfusionAmountPerHour(drug, 18, 70)).toBe(1260);
  expect(icuInfusionAmountPerHour(drug, 18, 70) / drug.concentrationPerMl).toBe(2.52);
});
it("mg/kg/h converts to micrograms/h before division by micrograms/mL", () => {
  const drug = icuInfusionGroups.flatMap(g => g.infusions).find(d => d.unit === "mg/kg/h");
  if (!drug) throw new Error("Missing mass infusion");
  expect(icuInfusionAmountPerHour(drug, 2, 70)).toBe(140000);
  expect(icuInfusionAmountPerHour(drug, 2, 70) / 10000).toBe(14);
});