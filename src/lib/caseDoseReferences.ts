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
