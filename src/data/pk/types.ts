/**
 * Structured pharmacokinetics for the adult ICU formulary.
 * Keys are the `slug` values used in src/data/icuDrugMechanisms.ts.
 */
export interface DrugPharmacokinetics {
  /** Time to clinical effect after the usual ICU route. */
  onset: string;
  /** Duration of a single dose / offset behaviour. */
  duration: string;
  /** Elimination half-life (and context-sensitive half-time where relevant). */
  halfLife: string;
  /** Volume of distribution with lipophilicity comment. */
  volumeOfDistribution: string;
  /** Plasma protein binding and the binding protein. */
  proteinBinding: string;
  /** Total plasma clearance with units, and renal vs hepatic contribution. */
  clearance: string;
  /** Enzymes / pathways responsible for biotransformation. */
  metabolicPathway: string;
  /** Active metabolites and their clinical significance. */
  activeMetabolites: string;
  /** Route and proportion of elimination. */
  elimination: string;
  /** Dose handling in hepatic failure, renal failure and on RRT. */
  organImpairment: string;
  /** Behaviour during prolonged infusion, accumulation and monitoring. */
  infusionBehaviour?: string;
}

export type DrugPharmacokineticsMap = Record<string, DrugPharmacokinetics>;
