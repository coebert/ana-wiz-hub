import type { AnaesthesiaCalcDrug } from "@/data/anaesthesiaCalculatorDrugs";

/** Arithmetic only; scoped limits are not patient-specific toxicity thresholds. */
export function calculateAnaesthesiaDose(drug: AnaesthesiaCalcDrug, dose: number, weight: number, concentration: number, idealWeight?: number) {
  if (![dose, concentration].every(v => Number.isFinite(v) && v > 0)) return null;
  if (drug.lookupOnly || (drug.minimumWeightKg !== undefined && (!Number.isFinite(weight) || weight < drug.minimumWeightKg))) return null;
  const dosingWeight = drug.weightBasis === "ideal" ? idealWeight : weight;
  const perKg = drug.unit.includes("/kg");
  if (perKg && (dosingWeight === undefined || !Number.isFinite(dosingWeight) || dosingWeight <= 0)) return null;
  const outOfRange = dose < drug.minDose || dose > drug.maxDose;
  if (drug.enforceDoseRange && outOfRange) return null;
  const amount = dose * (perKg ? dosingWeight ?? 0 : 1);
  if (drug.kind === "infusion") {
    const rawPerHr = amount * (drug.unit.endsWith("/min") ? 60 : 1);
    const perHr = Math.min(rawPerHr, drug.maxInfusionPerHour ?? Infinity);
    const mlPerHr = perHr / concentration;
    return { kind: "infusion" as const, perHr, mlPerHr, mlPerDay: mlPerHr * 24, syringeHours: 50 / mlPerHr, outOfRange, cappedAt: perHr < rawPerHr ? perHr : null };
  }
  const limitedAmount = Math.min(amount, drug.maxSingleDose ?? Infinity);
  return { kind: "bolus" as const, amount: limitedAmount, volumeMl: limitedAmount / concentration, outOfRange, cappedAt: limitedAmount < amount ? limitedAmount : null };
}

/** Paracetamol 10 mg/mL, UK product emc 100803, IV only, non-preterm. */
export function ivParacetamolLimits(weightKg: number, hepatotoxicityRisk: boolean) {
  if (!Number.isFinite(weightKg) || weightKg <= 0) return null;
  if (weightKg <= 10) return { doseMg: weightKg * 7.5, dailyMg: weightKg * 30 };
  if (weightKg <= 33) return { doseMg: weightKg * 15, dailyMg: Math.min(weightKg * 60, 2000) };
  if (weightKg <= 50) return { doseMg: weightKg * 15, dailyMg: Math.min(weightKg * 60, 3000) };
  return { doseMg: 1000, dailyMg: hepatotoxicityRisk ? 3000 : 4000 };
}