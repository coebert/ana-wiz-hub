/** EASL–CLIF single-organ exceptions; these descriptions are shared with the teaching figure. */
export const ACLF_CLASSIFICATION = [
  { grade: "No ACLF", description: "No organ failure; OR isolated liver/coagulation/circulation/respiration failure with creatinine <1.5 mg/dL and no HE; OR isolated brain failure with creatinine <1.5 mg/dL.", mortality: "~5%" },
  { grade: "ACLF Grade 1", description: "Isolated kidney failure; OR isolated liver/coagulation/circulation/respiration failure with creatinine 1.5–1.9 mg/dL and/or HE grade I–II; OR isolated brain failure with creatinine 1.5–1.9 mg/dL.", mortality: "~23%" },
  { grade: "ACLF Grade 2", description: "Two organ failures", mortality: "~32%" },
  { grade: "ACLF Grade 3", description: "Three or more organ failures", mortality: "~75%" },
] as const;

/** WSACS adult definition, not a treatment-response criterion. */
export function adultAcsDefinition(iap: number, sustained: boolean, newOrganDysfunction: boolean): boolean | null {
  if (!Number.isFinite(iap) || iap < 0) return null;
  return sustained && iap > 20 && newOrganDysfunction;
}