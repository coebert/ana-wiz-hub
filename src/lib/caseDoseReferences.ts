import { icuDrugDoseGroups } from "@/data/icuDrugDoses";
import type { PerioperativeCase } from "@/components/perioperative/ProgressiveCase";

export type CaseAgeGroup = "adult" | "paediatric" | "neonatal";

export interface CaseDoseReference {
  drug: string;
  dose: string;
  route: string;
  ageGroup: CaseAgeGroup;
  groupId: string;
  groupTitle: string;
  slug: string;
}

export const drugSlug = (drug: string): string =>
  drug
    .toLowerCase()
    .replace(/\([^)]*\)/g, " ")
    .replace(/[^a-z]+/g, "-")
    .replace(/^-|-$/g, "");

interface IndexedDrug extends Omit<CaseDoseReference, "ageGroup"> {
  paediatricDose?: string;
  neonatalDose?: string;
  terms: string[];
}

/** Search terms for a drug: the base name plus any bracketed synonym. */
const drugTerms = (drug: string): string[] => {
  const alias = /\(([^)]*)\)/.exec(drug)?.[1] ?? "";
  const base = drug.replace(/\([^)]*\)/g, " ");
  return [base, alias]
    .flatMap((part) => part.split("/"))
    .map((part) =>
      part
        .replace(/[0-9].*$/, " ")
        .replace(/[^a-zA-Z\s-]/g, " ")
        .trim()
        .toLowerCase(),
    )
    .filter((term) => term.length > 3);
};

const indexedDrugs: IndexedDrug[] = icuDrugDoseGroups.flatMap((group) =>
  group.drugs.map((drug) => ({
    drug: drug.drug,
    dose: drug.dose,
    route: drug.route,
    paediatricDose: drug.paediatricDose,
    neonatalDose: drug.neonatalDose,
    groupId: group.id,
    groupTitle: group.title,
    slug: drugSlug(drug.drug),
    terms: drugTerms(drug.drug),
  })),
);

/**
 * Neonatal, paediatric or adult scenario — decides which dose column a case
 * should be pointed at.
 */
export const caseAgeGroup = (caseData: PerioperativeCase): CaseAgeGroup => {
  const text = [caseData.title, caseData.category, caseData.patient, caseData.presentation]
    .join(" ")
    .toLowerCase();
  if (/\bneonat|newborn|\bpreterm|ex-prem|\bday-old|\bhours old|birth\b/.test(text)) return "neonatal";
  if (/paediatric|\bchild|\binfant|\bbaby|\bboy\b|\bgirl\b|month-old|year-old girl|year-old boy|\bschool-age/.test(text))
    return "paediatric";
  return "adult";
};

const caseText = (caseData: PerioperativeCase): string =>
  [
    caseData.title,
    caseData.patient,
    caseData.presentation,
    caseData.takeHome,
    ...caseData.stages.flatMap((stage) => [stage.title, stage.prompt, ...stage.answer]),
    ...caseData.detailedAnswer.flatMap((section) => [section.title, section.content]),
  ]
    .join(" ")
    .toLowerCase();

/**
 * Drugs from the ICU dosing table that are actually mentioned in a case, so each
 * scenario can link straight to the dose it needs. Capped to keep the panel short.
 */
export const doseReferencesForCase = (
  caseData: PerioperativeCase,
  limit = 6,
): CaseDoseReference[] => {
  const text = caseText(caseData);
  const ageGroup = caseAgeGroup(caseData);
  const matches = indexedDrugs.filter((entry) =>
    entry.terms.some((term) => new RegExp(`\\b${term.replace(/[-]/g, "[- ]")}`, "i").test(text)),
  );
  return matches.slice(0, limit).map(({ terms: _terms, paediatricDose, neonatalDose, ...rest }) => ({
    ...rest,
    ageGroup,
    dose:
      ageGroup === "neonatal"
        ? neonatalDose ?? paediatricDose ?? rest.dose
        : ageGroup === "paediatric"
          ? paediatricDose ?? rest.dose
          : rest.dose,
  }));
};

export const drugDoseHref = (reference: CaseDoseReference): string =>
  `/intensive-care/drug-doses?drug=${encodeURIComponent(reference.slug)}&age=${reference.ageGroup}#drug-${reference.slug}`;

/* ------------------------------------------------------------------ */
/* Calculator prefill                                                  */
/* ------------------------------------------------------------------ */

import { icuInfusionGroups } from "@/data/icuInfusions";

const infusionIndex = icuInfusionGroups.flatMap((group) =>
  group.infusions.map((infusion) => ({
    drug: infusion.drug,
    startDose: infusion.startDose,
    /** first alphabetic token, e.g. "propofol" from "Propofol 1%" */
    key: drugSlug(infusion.drug).split("-")[0],
  })),
);

/** The infusion record (if any) that matches a dosing-table drug name. */
export const infusionForDrug = (drug: string) => {
  const key = drugSlug(drug).split("-")[0];
  return infusionIndex.find((entry) => entry.key === key);
};

/**
 * Patient weight stated in the scenario text (e.g. "82 kg", "3.2kg"), so the
 * calculator can prefill it. Falls back to a typical neonatal weight.
 */
export const caseWeightKg = (caseData: PerioperativeCase): number | null => {
  const text = [caseData.title, caseData.patient, caseData.presentation].join(" ");
  const match = /(\d{1,3}(?:\.\d)?)\s?kg\b/i.exec(text);
  if (match) {
    const value = parseFloat(match[1]);
    if (isFinite(value) && value > 0.4 && value <= 250) return value;
  }
  return caseAgeGroup(caseData) === "neonatal" ? 3.5 : null;
};

/** Deep link that opens the ICU drug calculator prefilled for this case. */
export const drugCalculatorHref = (
  reference: CaseDoseReference,
  weightKg: number | null,
): string | null => {
  const infusion = infusionForDrug(reference.drug);
  if (!infusion) return null;
  const params = new URLSearchParams({ drug: infusion.drug, dose: String(infusion.startDose) });
  if (weightKg) params.set("weight", String(weightKg));
  return `/intensive-care/calculator?${params.toString()}`;
};
