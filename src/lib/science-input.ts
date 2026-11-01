/** Complete decimal syntax; no prefix parsing, comma decimal, hex or incomplete exponent. */
export function strictDecimal(value: string): number | null {
  const s = value.trim();
  if (!/^[+-]?(?:\d+(?:\.\d+)?|\.\d+)(?:[eE][+-]?\d+)?$/.test(s)) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}
export const finiteResult = (n: number): number | null => Number.isFinite(n) ? n : null;
export const boundedDecimal = (s: string, low: number, high: number): number | null => {
  const n = strictDecimal(s);
  return n !== null && n >= low && n <= high ? n : null;
};
/** Canonical mmol/L validation; ceilings are arithmetic entry limits, not clinical ranges. */
export function osmolarSolute(s: string, kind: "urea" | "glucose", unit: string): number | null {
  const n = strictDecimal(s);
  if (n === null) return null;
  const canonical = unit.startsWith("mg/dL") ? (kind === "urea" ? n * 0.357 : n / 18) : n;
  return Number.isFinite(canonical) && canonical >= 0 && canonical <= 200 ? canonical : null;
}
export const osmolarUnitMaximum = (kind: "urea" | "glucose", unit: string) =>
  unit.startsWith("mg/dL") ? (kind === "urea" ? 200 / 0.357 : 200 * 18) : 200;
export const osmolarGapRaised = (gap: number) => Number.isFinite(gap) && gap >= 10;
export function toxinConcentration(value: string, unit: string, mass: number) {
  const n = strictDecimal(value);
  if (n === null || n < 0 || !Number.isFinite(mass) || mass <= 0) return null;
  const mgL = unit === "mg/L" ? n : unit === "mmol/L" ? n * mass : unit === "mg/dL" ? n * 10 : NaN;
  const mgDl = mgL / 10, mmolL = mgL / mass;
  return [mgL, mgDl, mmolL].every(Number.isFinite) ? { mgL, mgDl, mmolL } : null;
}