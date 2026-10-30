/** Teaching arithmetic for ARDS ventilation. Never a ventilator prescription. */
export function predictedBodyWeight(sex: "male" | "female", heightCm: number) {
  if (!Number.isFinite(heightCm) || heightCm < 120 || heightCm > 230) return null;
  const base = sex === "male" ? 50 : 45.5;
  return Math.round((base + 0.91 * (heightCm - 152.4)) * 10) / 10;
}

/** Tidal volume range in mL using the ESICM 2023 4–8 mL/kg PBW range, plus the ARDSNet 6 mL/kg start. */
export function tidalVolumes(pbw: number) {
  return { low: Math.round(pbw * 4), start: Math.round(pbw * 6), high: Math.round(pbw * 8) };
}

export function drivingPressure(plateau: number, peep: number) {
  if (!Number.isFinite(plateau) || !Number.isFinite(peep) || peep < 0 || plateau < peep) return null;
  return plateau - peep;
}

/** Oxygenation band by PaO2/FiO2 (mm Hg), as in Berlin and the 2024 global definition. */
export function pfBand(paO2mmHg: number, fio2: number) {
  if (!Number.isFinite(paO2mmHg) || !Number.isFinite(fio2) || paO2mmHg <= 0 || fio2 < 0.21 || fio2 > 1) return null;
  const rawRatio = paO2mmHg / fio2;
  const band = rawRatio > 300 ? "above ARDS range" : rawRatio > 200 ? "mild" : rawRatio > 100 ? "moderate" : "severe";
  return { ratio: Math.round(rawRatio), band, proneThresholdMet: rawRatio < 150 };
}
