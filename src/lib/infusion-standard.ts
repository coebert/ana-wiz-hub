/**
 * D39 — typed normalisation of a drug's `infusion_standard` so biological units
 * (insulin, vasopressin) are never displayed or calculated as mass.
 *
 * Legacy compatibility: when `unit` is "units/hr" the legacy `amount_mg` field holds
 * the biological-unit COUNT, and `diluent_ml` is treated as the nominal FINAL volume.
 * Optional explicit `amount` / `amount_unit` / `final_volume_ml` fields take precedence.
 */

export interface InfusionStandardRecord {
  amount_mg?: number;
  amount?: number;
  amount_unit?: string;
  diluent_ml?: number;
  final_volume_ml?: number;
  unit?: string;
  weight_based?: boolean;
  note?: string;
}

export const MASS_TARGET_UNITS = ["mcg/kg/min", "mcg/min", "mg/kg/hr", "mcg/kg/hr", "mg/hr"] as const;
export const UNIT_TARGET_UNITS = ["units/hr"] as const;
export type TargetUnit = (typeof MASS_TARGET_UNITS)[number] | (typeof UNIT_TARGET_UNITS)[number];

export type NormalisedStandard =
  | { ok: true; kind: "mass"; amountMg: number; finalVolumeMl: number; mgPerMl: number; mcgPerMl: number; target: TargetUnit; weightBased: boolean; note?: string; reason?: undefined }
  | { ok: true; kind: "units"; amountUnits: number; finalVolumeMl: number; unitsPerMl: number; target: TargetUnit; weightBased: boolean; note?: string; reason?: undefined }
  | { ok: false; reason: string };

const pos = (n: unknown): n is number => typeof n === "number" && Number.isFinite(n) && n > 0;

export function normaliseInfusionStandard(std: InfusionStandardRecord | null | undefined): NormalisedStandard | null {
  if (!std || !std.unit) return null;
  const target = std.unit as TargetUnit;
  const isUnitsTarget = (UNIT_TARGET_UNITS as readonly string[]).includes(target);
  const isMassTarget = (MASS_TARGET_UNITS as readonly string[]).includes(target);
  if (!isUnitsTarget && !isMassTarget) return { ok: false, reason: `Unsupported target unit "${std.unit}".` };

  const declaredUnit = std.amount_unit?.toLowerCase();
  const amountKind: "mass" | "units" = declaredUnit
    ? declaredUnit.startsWith("unit") ? "units" : "mass"
    : isUnitsTarget ? "units" : "mass";
  if ((amountKind === "units") !== isUnitsTarget) return { ok: false, reason: "Amount and target dimensions do not match (mass vs biological units)." };

  let amount = std.amount ?? std.amount_mg;
  if (amountKind === "mass" && declaredUnit && amount !== undefined) {
    if (declaredUnit === "g") amount *= 1000;
    else if (declaredUnit.startsWith("mcg") || declaredUnit.startsWith("microgram")) amount /= 1000;
    else if (declaredUnit !== "mg") return { ok: false, reason: `Unsupported amount unit "${std.amount_unit}".` };
  }
  const vol = std.final_volume_ml ?? std.diluent_ml;
  if (!pos(amount) || !pos(vol)) return { ok: false, reason: "Standard mix needs a positive amount and final volume." };
  const weightBased = !!std.weight_based;
  if (amountKind === "units") {
    return { ok: true, kind: "units", amountUnits: amount, finalVolumeMl: vol, unitsPerMl: amount / vol, target, weightBased, note: std.note };
  }
  const mgPerMl = amount / vol;
  return { ok: true, kind: "mass", amountMg: amount, finalVolumeMl: vol, mgPerMl, mcgPerMl: mgPerMl * 1000, target, weightBased, note: std.note };
}

export type RateResult = { ok: true; mlPerHr: number; workings: string; reason?: undefined } | { ok: false; reason: string };

const f = (n: number, dp: number) => Number(n.toFixed(dp)).toString();

/** mL/hr for a target rate. Units/hr ÷ units/mL — never ×1000. */
export function computeMlPerHr(n: NormalisedStandard, rate: number, weightKg?: number): RateResult {
  if (!n.ok) return { ok: false, reason: n.reason };
  if (!pos(rate)) return { ok: false, reason: "Enter a target rate above zero." };
  const needsWeight = n.target.includes("/kg/");
  if (needsWeight && !pos(weightKg)) return { ok: false, reason: "Enter a weight above zero." };
  const w = weightKg ?? 0;
  if (n.kind === "units") {
    const ml = rate / n.unitsPerMl;
    return { ok: true, mlPerHr: ml, workings: `${f(rate, 2)} units/hr ÷ ${f(n.unitsPerMl, 3)} units/mL = ${ml.toFixed(2)} mL/hr` };
  }
  switch (n.target) {
    case "mcg/kg/min": {
      const perMin = rate * w;
      const ml = (perMin * 60) / n.mcgPerMl;
      return { ok: true, mlPerHr: ml, workings: `${rate} mcg/kg/min × ${w} kg = ${f(perMin, 1)} mcg/min → ×60 = ${f(perMin * 60, 0)} mcg/hr ÷ ${f(n.mcgPerMl, 1)} mcg/mL = ${ml.toFixed(2)} mL/hr` };
    }
    case "mcg/min": {
      const ml = (rate * 60) / n.mcgPerMl;
      return { ok: true, mlPerHr: ml, workings: `${rate} mcg/min × 60 = ${f(rate * 60, 0)} mcg/hr ÷ ${f(n.mcgPerMl, 1)} mcg/mL = ${ml.toFixed(2)} mL/hr` };
    }
    case "mg/kg/hr": {
      const ml = (rate * w) / n.mgPerMl;
      return { ok: true, mlPerHr: ml, workings: `${rate} mg/kg/hr × ${w} kg = ${f(rate * w, 1)} mg/hr ÷ ${f(n.mgPerMl, 3)} mg/mL = ${ml.toFixed(2)} mL/hr` };
    }
    case "mcg/kg/hr": {
      const ml = (rate * w) / n.mcgPerMl;
      return { ok: true, mlPerHr: ml, workings: `${rate} mcg/kg/hr × ${w} kg = ${f(rate * w, 1)} mcg/hr ÷ ${f(n.mcgPerMl, 1)} mcg/mL = ${ml.toFixed(2)} mL/hr` };
    }
    case "mg/hr": {
      const ml = rate / n.mgPerMl;
      return { ok: true, mlPerHr: ml, workings: `${rate} mg/hr ÷ ${f(n.mgPerMl, 3)} mg/mL = ${ml.toFixed(2)} mL/hr` };
    }
  }
  return { ok: false, reason: "Unsupported target unit." };
}

export function formatConcentration(n: NormalisedStandard): string {
  if (!n.ok) return "";
  if (n.kind === "units") return `${f(n.unitsPerMl, 3)} ${n.unitsPerMl === 1 ? "unit" : "units"}/mL`;
  return n.mcgPerMl >= 1 && n.mgPerMl < 1 ? `${f(n.mgPerMl, 3)} mg/mL (${f(n.mcgPerMl, 1)} mcg/mL)` : `${f(n.mgPerMl, 2)} mg/mL`;
}

export function formatMix(n: NormalisedStandard): string {
  if (!n.ok) return "";
  return n.kind === "units"
    ? `${f(n.amountUnits, 2)} units in ${f(n.finalVolumeMl, 2)} mL final volume`
    : `${f(n.amountMg, 3)} mg in ${f(n.finalVolumeMl, 2)} mL final volume`;
}

/**
 * Mass-only concentration badges parsed from preparation prose. Biological-unit phrases are
 * deliberately NOT parsed: prose often states diluent volume (e.g. "50 units in 49.5 mL"),
 * which is not the final volume.
 */
export function extractMassDilutions(text: string): Array<{ raw: string; mgPerMl: number; mcgPerMl: number }> {
  const out: Array<{ raw: string; mgPerMl: number; mcgPerMl: number }> = [];
  const seen = new Set<string>();
  const re = /(\d+(?:\.\d+)?)\s*(mg|g|mcg|micrograms?)\s*(?:in|\/)\s*(\d+(?:\.\d+)?)\s*(?:ml|mls)\b/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    const amount = parseFloat(m[1]);
    const unit = m[2].toLowerCase();
    const ml = parseFloat(m[3]);
    if (!pos(amount) || !pos(ml)) continue;
    const mg = unit === "g" ? amount * 1000 : unit.startsWith("mcg") || unit.startsWith("microgram") ? amount / 1000 : amount;
    const key = `${m[1]}${unit}-${ml}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const mgPerMl = mg / ml;
    out.push({ raw: m[0], mgPerMl, mcgPerMl: mgPerMl * 1000 });
    if (out.length >= 6) break;
  }
  return out;
}
