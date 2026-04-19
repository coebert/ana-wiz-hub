/**
 * Canonical dermatome level keys shared between InteractiveDermatomeMap
 * and DermatomeMyotomeDiagram so clicks in one component can highlight the
 * matching level in the other.
 *
 * Both source diagrams use slightly different naming for the same levels
 * (e.g. "C2" vs "c2", "S4-S5" vs "s2-4", "T2-T12 (back)"). This module
 * normalises everything to one canonical uppercase form.
 */

/** Canonical form, e.g. "C5", "T10", "L4", "S2-4". */
export type CanonicalLevel = string;

/**
 * Convert any local level identifier (from either diagram) into the canonical
 * uppercase key. Returns null when the level cannot be mapped.
 *
 * Examples:
 *   "c2"              -> "C2"
 *   "T10"             -> "T10"
 *   "s2-4"            -> "S2-4"
 *   "S4-S5"           -> "S2-4"   (saddle area — collapsed)
 *   "T2-T12 (back)"   -> null     (posterior trunk is not a single level)
 */
export const normaliseLevel = (raw: string | null | undefined): CanonicalLevel | null => {
  if (!raw) return null;
  const upper = raw.trim().toUpperCase();

  // Posterior trunk band — not a single spinal level, no useful counterpart.
  if (upper.startsWith("T2-T12")) return null;

  // Saddle area — DermatomeMyotomeDiagram uses S2–4, InteractiveDermatomeMap uses S4-S5.
  if (upper === "S4-S5" || upper === "S2-4" || upper === "S2–4" || upper === "S2-S4") {
    return "S2-4";
  }

  // Anything matching e.g. "C5", "T10", "L1", "S1".
  const m = upper.match(/^([CTLS])(\d{1,2})$/);
  if (m) return `${m[1]}${m[2]}`;

  return null;
};

/**
 * Find the canonical key inside an arbitrary record keyed by local level
 * identifiers. Returns the local key whose normalised form matches the
 * canonical input, or null if there is no match.
 *
 * Used so each diagram can resolve `selectedLevel` (canonical) back to its
 * own internal id format.
 */
export const findLocalLevel = <T extends { level?: string; id?: string }>(
  items: readonly T[],
  canonical: CanonicalLevel | null,
  /** Which field on the item holds the local identifier — usually "level" or "id". */
  field: "level" | "id" = "level",
): T | null => {
  if (!canonical) return null;
  return items.find((it) => normaliseLevel(it[field] as string | undefined) === canonical) ?? null;
};
