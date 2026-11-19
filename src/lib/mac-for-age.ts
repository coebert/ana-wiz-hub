/**
 * Age correction of MAC for /tools/mac-for-age.
 *
 * Mapleson WW. Effect of age on MAC in humans: a meta-analysis.
 * Br J Anaesth 1996; 76:179–85 (PMID 8777094): MAC = a × 10^(b·x), where x is
 * the age difference from 40 years and b = −0.00269 (≈6% per decade).
 *
 * The regression is explicitly for age **over 1 year**. It must not be
 * extrapolated to infants, whose MAC is higher than the adult trend predicts,
 * so `macForAge` returns `null` below 1 year.
 */

export const MAC_AGE_MIN_YEARS = 1;
export const MAC_AGE_SLOPE = -0.00269;

/** Age-adjusted MAC, or `null` for invalid input or age ≤1 year (no validated fit). */
export function macForAge(mac40: number, ageYears: number): number | null {
  if (!Number.isFinite(mac40) || mac40 <= 0) return null;
  if (!Number.isFinite(ageYears) || ageYears < MAC_AGE_MIN_YEARS) return null;
  return mac40 * Math.pow(10, MAC_AGE_SLOPE * (ageYears - 40));
}

/**
 * Illustrative temperature factor used by the teaching display: ≈5% lower MAC
 * per °C below 37 °C. Not a validated prediction for an individual patient.
 */
export function temperatureFactor(tempC: number): number {
  if (!Number.isFinite(tempC)) return 1;
  return Math.pow(0.95, Math.max(0, 37 - tempC));
}
