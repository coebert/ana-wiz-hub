/**
 * Teaching arithmetic only: compares the NICE NG253 stepwise adult bolus plan
 * (250 mL steps, senior review at 1,000 mL total) with the SSC 2021
 * "at least 30 mL/kg in 3 h" suggestion. It never prescribes fluid.
 */
export const NICE_BOLUS_ML = 250;
export const NICE_REVIEW_TOTAL_ML = 1000;
export const SSC_ML_PER_KG = 30;

export function sepsisFluidComparison(weightKg: string, alreadyGivenMl: string) {
  if (!weightKg.trim()) return null;
  const w = Number(weightKg);
  const given = alreadyGivenMl.trim() ? Number(alreadyGivenMl) : 0;
  if (!Number.isFinite(w) || !Number.isFinite(given) || w <= 0 || w > 300 || given < 0) return null;
  const sscMl = Math.round(w * SSC_ML_PER_KG);
  const niceRemainingMl = Math.max(0, NICE_REVIEW_TOTAL_ML - given);
  return {
    sscMl,
    niceRemainingMl,
    niceBolusesBeforeReview: Math.ceil(niceRemainingMl / NICE_BOLUS_ML),
    seniorReviewDue: given >= NICE_REVIEW_TOTAL_ML,
  };
}
