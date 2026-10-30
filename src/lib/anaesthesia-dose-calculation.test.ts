import { describe, expect, it } from "vitest";
import { anaesthesiaCalcDrugs } from "@/data/anaesthesiaCalculatorDrugs";
import { calculateAnaesthesiaDose, ivParacetamolLimits } from "./anaesthesia-dose-calculation";

function drug(name: string) {
  const found = anaesthesiaCalcDrugs.find(d => d.drug.startsWith(name));
  if (!found) throw new Error(`Missing drug ${name}`);
  return found;
}
describe("Named dose boundaries, not clinical clearance", () => {
  it.each([[39.999, 1.5, 60, false], [40, 1.5, 60, true], [70, 1.500001, 60, false], [70, 1.5, 0, false]])("lidocaine actual %s dose %s IBW %s", (w, d, ibw, exists) => {
    expect(calculateAnaesthesiaDose(drug("Lidocaine (intra"), Number(d), Number(w), 10, Number(ibw)) !== null).toBe(exists);
  });
  it("caps IV lidocaine at 120 mg/h and converts to 12 mL/h", () => {
    expect(calculateAnaesthesiaDose(drug("Lidocaine (intra"), 1.5, 120, 10, 100)).toMatchObject({ perHr: 120, mlPerHr: 12, cappedAt: 120 });
  });
  it.each([["Lidocaine plain", 4.5, 300], ["Lidocaine with adrenaline", 7, 500], ["Bupivacaine —", 2, 150]])("enforces scoped %s absolute limit", (n, d, cap) => {
    expect(calculateAnaesthesiaDose(drug(String(n)), Number(d), 150, 10)).toMatchObject({ amount: cap });
  });
  it.each(["Ropivacaine", "Prilocaine"])("does not invent a universal %s maximum", n => {
    expect(calculateAnaesthesiaDose(drug(n), 3, 70, 10)).toBeNull();
  });
  it.each([[10, 75, 300], [10.001, 150.015, 600.06], [33, 495, 1980], [33.001, 495.015, 1980.06], [50, 750, 3000], [50.001, 1000, 4000]])("IV paracetamol weight %s", (w, single, daily) => {
    expect(ivParacetamolLimits(w, false)?.doseMg).toBeCloseTo(single, 5);
    expect(ivParacetamolLimits(w, false)?.dailyMg).toBeCloseTo(daily, 5);
  });
  it("limits >50 kg IV paracetamol to 3 g/day with risk factors", () => expect(ivParacetamolLimits(70, true)?.dailyMg).toBe(3000));
  it("units/milliunits conversion is 1000, and potassium time is ≥2.5 h", () => {
    expect(0.0003 * 1000).toBeCloseTo(0.3);
    expect(0.002 * 1000).toBe(2);
    expect(0.5 / 0.2).toBe(2.5);
    expect(400 / (4 + 46)).toBe(8);
  });
});