/** Illustrative monoprotic weak-base equilibrium, not onset or fetal safety. */
export function unchargedWeakBaseFraction(pH: number, pKa: number): number | null {
  if (!Number.isFinite(pH) || !Number.isFinite(pKa) || pH < 0 || pH > 14 || pKa < 0 || pKa > 14) return null;
  return 1 / (1 + 10 ** (pKa - pH));
}
export const ESTER_DRUG_DISTINCTIONS = "Hydrolysis depends on the drug: remifentanil uses non-specific blood and tissue esterases and is not a substrate of plasma cholinesterase. Atracurium undergoes Hofmann elimination plus non-specific esterase hydrolysis; low pseudocholinesterase does not impair its inactivation. Some ester local anaesthetics use butyrylcholinesterase. Ester Phase I metabolism does not universally complete in plasma.";
export const AMIDE_NAME_AID = "Common amide generic names such as lidocaine and bupivacaine contain two letters i in the complete name, one in -caine. This is a limited memory aid, not the chemical definition: classify by the amide versus ester linkage.";