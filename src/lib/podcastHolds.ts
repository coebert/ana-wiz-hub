/** Words in a hold reason worth highlighting in the replacement draft. */
export function holdKeyTerms(reasons: string[]): string[] {
  const terms = new Set<string>();
  for (const r of reasons) {
    for (const m of r.matchAll(/\b\d+(?:[.,]\d+)?\s?(?:mL|ml|mg|mcg|%|breaths?|mmol\/L|kg)\b/g)) terms.add(m[0]);
    for (const m of r.matchAll(/\b(?:sugammadex|calcium gluconate|CICO|NAP\d|PUMA|TIVA|LAST|facemask|adjusted weight|actual body weight|20\d\d)\b/gi)) terms.add(m[0]);
  }
  return [...terms];
}

/** A held episode may only be recorded from an approved draft. */
export const canRecordDraft = (d: { status: string; reviewed_by: string | null } | null) =>
  !!d && d.status === "approved" && !!d.reviewed_by;
