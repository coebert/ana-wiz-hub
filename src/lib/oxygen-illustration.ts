/** Illustrative Hill model; pressures are mmHg, Hb g/dL, content mL/dL. */
export const hillEquation = (po2: number, p50: number, n = 2.7) =>
  100 / (1 + Math.pow(p50 / po2, n));
/** Fractional oxyhaemoglobin assuming COHb is the only dyshemoglobin. */
export const effectiveSat = (functionalPercent: number, cohbFraction: number) => functionalPercent * (1 - cohbFraction);
export const dissolvedO2 = (po2MmHg: number) => 0.003 * po2MmHg;
/** Pass fractional saturation with TOTAL Hb: capacity reduction occurs once. */
export const o2Content = (fractionalPercent: number, po2MmHg: number, totalHb: number) =>
  1.34 * totalHb * fractionalPercent / 100 + dissolvedO2(po2MmHg);
export const boundAvailableOxygen = (functionalPercent: number, hb: number, cohbFraction: number) =>
  1.34 * hb * effectiveSat(functionalPercent, cohbFraction) / 100;