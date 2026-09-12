import type { DrugPharmacokinetics, DrugPharmacokineticsMap } from "./types";
import { pkSedationNmb } from "./pkSedationNmb";
import { pkCardiovascular } from "./pkCardiovascular";
import { pkNeuroCoag } from "./pkNeuroCoag";
import { pkMetabolicInfection } from "./pkMetabolicInfection";

export type { DrugPharmacokinetics, DrugPharmacokineticsMap };

/** Pharmacokinetics keyed by the mechanism-page slug. */
export const icuDrugPharmacokinetics: DrugPharmacokineticsMap = {
  ...pkSedationNmb,
  ...pkCardiovascular,
  ...pkNeuroCoag,
  ...pkMetabolicInfection,
};

export const pharmacokineticsFor = (slug: string): DrugPharmacokinetics | undefined =>
  icuDrugPharmacokinetics[slug];
