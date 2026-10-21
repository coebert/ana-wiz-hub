/**
 * Teaching summary of which haemoglobin trigger the guideline or trial evidence
 * discusses for a population. It never decides whether to transfuse.
 */
export type TransfusionPopulation = "general" | "acs" | "brain-injury";

export const THRESHOLDS_G_PER_L: Record<TransfusionPopulation, { trigger: number; note: string }> = {
  general: { trigger: 70, note: "NICE NG24 restrictive threshold 70 g/L, target 70–90 g/L" },
  acs: { trigger: 80, note: "NICE NG24 suggests 80 g/L, target 80–100 g/L; MINT could not exclude harm from restriction" },
  "brain-injury": { trigger: 90, note: "No single guideline value: TRAIN favoured a <90 g/L trigger, while HEMOTION and SAHaRA (100 g/L) were neutral" },
};

/** Converts g/dL (trial reporting) to g/L (UK reporting). */
export const gdlToGl = (gdl: number) => Math.round(gdl * 10);

export function belowDiscussedTrigger(population: TransfusionPopulation, hbGl: number) {
  if (!Number.isFinite(hbGl) || hbGl <= 0 || hbGl > 250) return null;
  return hbGl < THRESHOLDS_G_PER_L[population].trigger;
}
