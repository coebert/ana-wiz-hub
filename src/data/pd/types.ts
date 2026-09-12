/**
 * Structured pharmacodynamics for the adult ICU formulary.
 * Keys are the `slug` values used in src/data/icuDrugMechanisms.ts,
 * so every kinetics record has a matching dynamics record.
 */
export interface DrugPharmacodynamics {
  /** Shape of the dose–response relationship (linear, log-linear, sigmoid, ceiling, all-or-none). */
  doseResponse: string;
  /** Usable range between effect and toxicity, with numbers/levels where they exist. */
  therapeuticWindow: string;
  /** What you titrate against at the bedside and the target value. */
  titrationTarget: string;
  /** Dose-related unwanted effects, ordered from low to high exposure. */
  doseRelatedEffects: string[];
  /** Pharmacodynamic interactions — synergy, antagonism, receptor competition. */
  interactions: string[];
  /** Tolerance, tachyphylaxis, receptor down-regulation or rebound on stopping. */
  tolerance?: string;
}

export type DrugPharmacodynamicsMap = Record<string, DrugPharmacodynamics>;
