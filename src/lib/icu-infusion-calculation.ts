import type { Infusion } from "@/data/icuInfusions";
/** Concentration is micrograms/mL for mass drugs and units/mL for activity drugs. */
export function icuInfusionAmountPerHour(infusion: Infusion, dose: number, weightKg: number) {
  switch (infusion.unit) {
    case "micrograms/kg/min": return dose * 60 * weightKg;
    case "micrograms/kg/h": return dose * weightKg;
    case "micrograms/min": return dose * 60;
    case "mg/kg/h": return dose * 1000 * weightKg;
    case "units/min": return dose * 60;
    case "units/h": return dose;
    case "units/kg/h": return dose * weightKg;
  }
}