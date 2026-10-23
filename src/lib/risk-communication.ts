/** Arithmetic for communicating an already-sourced probability, not a risk model. */
export function describeRisk(percent: number) {
  if (!Number.isFinite(percent) || percent < 0 || percent > 100) return null;
  return {
    perTenThousand: percent * 100,
    unaffectedPerTenThousand: 10000 - percent * 100,
    oneIn: percent === 0 ? null : 100 / percent,
  };
}

export function absoluteRiskComparison(baseline: number, after: number) {
  if (!describeRisk(baseline) || !describeRisk(after)) return null;
  const reduction = baseline - after;
  return {
    percentagePointReduction: reduction,
    relativeReductionPercent: baseline === 0 ? null : (reduction / baseline) * 100,
    numberNeededToTreat: reduction > 0 ? Math.ceil(100 / reduction) : null,
  };
}