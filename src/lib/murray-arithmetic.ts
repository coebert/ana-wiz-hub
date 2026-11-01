/** Murray lung injury arithmetic, not ARDS diagnosis or ECMO candidacy. */
export function murrayScore(pf: number, peep: number, compliance: number, quadrants: number) {
  if (![pf, peep, compliance, quadrants].every(Number.isFinite) || pf <= 0 || peep < 0 || compliance <= 0 || !Number.isInteger(quadrants) || quadrants < 0 || quadrants > 4) return null;
  const pPf = pf >= 300 ? 0 : pf >= 225 ? 1 : pf >= 175 ? 2 : pf >= 100 ? 3 : 4;
  const pPeep = peep <= 5 ? 0 : peep <= 8 ? 1 : peep <= 11 ? 2 : peep <= 14 ? 3 : 4;
  const pComp = compliance >= 80 ? 0 : compliance >= 60 ? 1 : compliance >= 40 ? 2 : compliance >= 20 ? 3 : 4;
  const score = (pPf + pPeep + pComp + quadrants) / 4;
  return { score, points: [pPf, pPeep, pComp, quadrants], category: score === 0 ? "No lung injury by score" : score <= 2.5 ? "Mild–moderate lung injury" : "Severe lung injury" };
}
export function staticDrivingPressure(pplat: number, totalPeep: number): number | null {
  if (![pplat, totalPeep].every(Number.isFinite) || totalPeep < 0 || pplat < totalPeep) return null;
  const dp = pplat - totalPeep;
  return Number.isFinite(dp) ? dp : null;
}