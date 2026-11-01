const present = value => typeof value === 'string' && value.trim().length > 0;
export function validateDoseSummary(row) {
  const material = row.dosing;
  // Existing schema has indication prose but no structured population field.
  // Only an explicitly neonatal indication can use non-adult dosing material.
  const neonatal = /\b(neonat|prematur|preterm)/i.test(row.indication_oneliner ?? '') && !/\badults?\b/i.test(row.indication_oneliner ?? '');
  if (!present(material) || !/\d\s*(?:mg|mcg|micrograms?|µg|units?|mmol)\b/i.test(material)) return { error: 'missing or malformed dosing material' };
  if (present(row.adult_bolus_dose) || present(row.infusion_range)) return {};
  if (neonatal) return { warning: 'Explicit neonatal indication with dosing material; schema lacks a population-specific summary field (no adult indication inferred; doses not verified).' };
  return { error: 'no dose summary (adult_bolus_dose or infusion_range); no explicit neonatal-only scope' };
}
