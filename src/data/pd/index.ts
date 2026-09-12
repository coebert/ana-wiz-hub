import type { DrugPharmacodynamics, DrugPharmacodynamicsMap } from "./types";
import { pdSedationNmb } from "./pdSedationNmb";
import { pdCardiovascular } from "./pdCardiovascular";
import { pdNeuroCoag } from "./pdNeuroCoag";
import { pdMetabolicInfection } from "./pdMetabolicInfection";

export type { DrugPharmacodynamics, DrugPharmacodynamicsMap };

/** Pharmacodynamics keyed by the mechanism-page slug. */
export const icuDrugPharmacodynamics: DrugPharmacodynamicsMap = {
  ...pdSedationNmb,
  ...pdCardiovascular,
  ...pdNeuroCoag,
  ...pdMetabolicInfection,
};

export const pharmacodynamicsFor = (slug: string): DrugPharmacodynamics | undefined =>
  icuDrugPharmacodynamics[slug];

/** Flattened text for search indexing on the mechanisms page. */
export const pharmacodynamicsText = (slug: string): string => {
  const pd = icuDrugPharmacodynamics[slug];
  if (!pd) return "";
  return [
    pd.doseResponse,
    pd.therapeuticWindow,
    pd.titrationTarget,
    pd.tolerance ?? "",
    ...pd.doseRelatedEffects,
    ...pd.interactions,
  ].join(" ");
};
