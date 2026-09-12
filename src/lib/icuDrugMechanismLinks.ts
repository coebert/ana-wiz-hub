import { icuDrugMechanismGroups } from "@/data/icuDrugMechanisms";

/**
 * Map a dosing-table drug name to its mechanism-page slug so each dosing row can
 * deep-link to the pharmacology, pharmacokinetics and metabolism of that drug.
 */
const slugByDrugName = new Map<string, string>(
  icuDrugMechanismGroups.flatMap((group) =>
    group.drugs.map((d) => [d.drug.trim().toLowerCase(), d.slug] as const),
  ),
);

export const mechanismSlugForDrug = (drugName: string): string | undefined =>
  slugByDrugName.get(drugName.trim().toLowerCase());

export const mechanismLinkForDrug = (drugName: string): string | undefined => {
  const slug = mechanismSlugForDrug(drugName);
  return slug ? `/intensive-care/drug-mechanisms#${slug}` : undefined;
};
