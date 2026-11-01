/** Unit-labelled educational arithmetic, not device suitability or treatment clearance. */
export function protonLarmor(fieldTesla: number) {
  if (!Number.isFinite(fieldTesla) || fieldTesla < 0) return null;
  const frequencyHz = 42.58e6 * fieldTesla;
  return { frequencyHz, angularRadPerSecond: 2 * Math.PI * frequencyHz };
}
export function arterialFundamental(heartRatePerMinute: number) {
  if (!Number.isFinite(heartRatePerMinute) || heartRatePerMinute <= 0) return null;
  return heartRatePerMinute / 60;
}
export const STARLING_STEADY = "In most continuous systemic microvessels, steady-state exchange is slight filtration rather than sustained venular reabsorption. Transient absorption can follow pressure changes; sustained absorption occurs in specialised beds such as renal peritubular and intestinal vessels. Lymphatics provide the main return route in most tissues, not a universal exclusive route.";
export const STARLING_BARRIER = "The glycocalyx is an important macromolecular sieve acting with endothelial and intercellular pathways, including junctions. Subglycocalyx protein concentration and oncotic pressure are relatively low during filtration and depend on flow; they are not universally zero.";
export const STARLING_ANP = "ANP-associated shedding and increased permeability have experimental support in isolated guinea-pig hearts. A small human study of preoperative 20 mL/kg hydroxyethyl-starch volume loading (nine patients per group) associated ANP increases with shedding markers. These findings do not establish direct enzymatic cleavage by ANP or prove that every bolus causes clinical oedema.";
export const STARLING_FLUID = "The model does not make colloid and crystalloid filtration universally equal, establish clinical outcome superiority, or guarantee that small goal-directed boluses avoid glycocalyx injury. Fluid choice and volume require patient-specific evidence and repeated assessment.";
export const T2_FAT = "Water and fluid are generally bright on T2-weighted imaging; fat signal depends on the pulse sequence and fat-suppression method, and is often bright on T2 fast/turbo spin echo. Fat suppression is an additional technique, not intrinsic to T2 weighting.";
export const MAINSTREAM_CAPABILITIES = "Most common mainstream capnographs measure CO₂, but mainstream multigas analysers also exist. Mainstream versus sidestream describes sampling configuration; detectable gases depend on the specific device.";
export const UK_WORKER_DOSE = "For adult workers, IRR 2017 Schedule 3 sets an effective-dose limit of 20 mSv in any calendar year. Special dose-limit arrangements under regulation 12(2) and Schedule 3 Part 2 are separate, not routine whole-body five-year averaging. The eye-lens equivalent-dose limit is 20 mSv per calendar year, or under approved conditions 100 mSv over five consecutive calendar years with a maximum 50 mSv in any single year.";