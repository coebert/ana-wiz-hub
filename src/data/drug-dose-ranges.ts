/**
 * Typed re-export of src/data/drug-dose-ranges.mjs for app code.
 * The .mjs sibling is the source of truth (consumed by Node scripts
 * without needing tsx); this file adds TypeScript types.
 */
import { DRUG_DOSE_RANGES as RAW } from "./drug-dose-ranges.mjs";

export type DoseUnit =
  | "mg" | "mcg" | "ng" | "units" | "mL" | "g"
  | "mg/kg" | "mcg/kg" | "ng/kg" | "units/kg" | "mL/kg"
  | "mg/kg/h" | "mcg/kg/h" | "mg/kg/min" | "mcg/kg/min" | "ng/kg/min"
  | "units/kg/h" | "mg/h" | "mcg/h" | "mg/min" | "units/h";

export type DoseRoute =
  | "bolus" | "infusion" | "induction" | "loading" | "maintenance" | "tci"
  | "iv" | "im" | "po" | "sc" | "io" | "intranasal" | "any";

export interface DrugDoseRange {
  drug: string;
  synonyms?: string[];
  route: DoseRoute;
  min: number;
  max: number;
  unit: DoseUnit;
  source: string;
}

export const DRUG_DOSE_RANGES = RAW as DrugDoseRange[];
