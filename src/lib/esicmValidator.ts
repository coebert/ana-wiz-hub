/**
 * ESICM dose-statement validator.
 *
 * Scans every Reference in `topicReferences` whose label or citation marks it
 * as ESICM-backed (ESICM, SSC 2021, ERC/ESICM, SCCM/ESICM), then flags:
 *   - missing-excerpt   — ESICM ref with no verbatim excerpt at all
 *   - dose-mismatch     — a dose statement (value + unit) appears in the
 *                         citation/label but is NOT present in the excerpt,
 *                         OR appears with a different unit family
 *
 * Pure functions; safe to unit-test and to run inside an admin page.
 */
import { topicReferences, type Reference } from "@/data/references";

export type IssueKind = "missing-excerpt" | "dose-mismatch";

export interface DoseToken {
  /** Raw matched substring, e.g. "30 mL/kg", "65 mm Hg", "32–36 °C". */
  raw: string;
  /** Numeric portion as written (may be a range like "32-36" or "4-8"). */
  value: string;
  /** Canonical unit, lower-cased + whitespace-stripped, e.g. "ml/kg". */
  unit: string;
}

export interface Issue {
  kind: IssueKind;
  topicId: string;
  refLabel: string;
  refIndex: number;
  /** Human-readable detail shown in the UI. */
  detail: string;
  /** The dose token that triggered a dose-mismatch (if applicable). */
  dose?: DoseToken;
}

export interface ValidationReport {
  totalEsicmRefs: number;
  refsMissingExcerpt: number;
  doseMismatches: number;
  issues: Issue[];
}

// ---------- ESICM detection ----------

const ESICM_PATTERN = /\b(ESICM|SCCM\/ESICM|ERC\/ESICM|Surviving Sepsis|SSC\s?20\d\d)\b/i;

export const isEsicmBacked = (ref: Reference): boolean =>
  ESICM_PATTERN.test(ref.label) || ESICM_PATTERN.test(ref.citation);

// ---------- Dose extraction ----------

/**
 * Units we recognise inside ESICM dose statements. Order matters: longer /
 * compound units (mL/kg/h) must be tried before shorter prefixes (mL/kg).
 */
const UNIT_ALTERNATIVES = [
  "ml/kg/h",
  "mcg/kg/min",
  "μg/kg/min",
  "ug/kg/min",
  "mg/kg/h",
  "mg/kg",
  "ml/kg",
  "mmhg",
  "mm hg",
  "cmh2o",
  "cmh₂o",
  "kpa",
  "mmol/l",
  "μg/l",
  "ug/l",
  "mcg/l",
  "°c",
  "°f",
  "%",
  "h",
];

// Numeric token: integer/decimal, optionally a range using "-", "–", or "to".
const NUM = "\\d+(?:\\.\\d+)?(?:\\s*(?:-|–|to)\\s*\\d+(?:\\.\\d+)?)?";
// Comparator prefix optional: ≥, ≤, >, <, ~
const CMP = "(?:[≥≤><~]\\s*)?";

const buildDoseRegex = (): RegExp => {
  const units = UNIT_ALTERNATIVES.map((u) => u.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
  // Unit must NOT be followed by another letter (so "h" in "Haemodynamics"
  // is not treated as the hour unit).
  return new RegExp(`${CMP}${NUM}\\s*(${units})(?![a-z])`, "gi");
};

const DOSE_RX = buildDoseRegex();

/** Normalise a unit for comparison: lowercase, strip spaces, fold synonyms. */
const normaliseUnit = (u: string): string => {
  const x = u.toLowerCase().replace(/\s+/g, "").replace(/₂/g, "2");
  // Unit synonyms / common variants
  if (x === "mmhg") return "mmhg";
  if (x === "μg/l" || x === "ug/l" || x === "mcg/l") return "ug/l";
  if (x === "μg/kg/min" || x === "ug/kg/min" || x === "mcg/kg/min") return "ug/kg/min";
  return x;
};

/** Normalise a numeric/range token: strip spaces, fold en-dash + "to" to "-". */
const normaliseValue = (v: string): string =>
  v.toLowerCase().replace(/\s+/g, "").replace(/–|to/g, "-");

export const extractDoses = (text: string): DoseToken[] => {
  const out: DoseToken[] = [];
  const seen = new Set<string>();
  DOSE_RX.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = DOSE_RX.exec(text)) !== null) {
    const raw = m[0].trim();
    const unit = normaliseUnit(m[1]);
    // value = the chunk before the unit
    const valueRaw = raw.slice(0, raw.toLowerCase().lastIndexOf(m[1].toLowerCase())).trim();
    const value = normaliseValue(valueRaw.replace(/^[≥≤><~]\s*/, ""));
    const key = `${value}|${unit}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ raw, value, unit });
  }
  return out;
};

/** Does `excerpt` contain a dose token whose value+unit matches `dose`? */
const excerptContainsDose = (excerpt: string, dose: DoseToken): boolean => {
  const tokens = extractDoses(excerpt);
  return tokens.some(
    (t) => t.unit === dose.unit && (t.value === dose.value || valuesOverlap(t.value, dose.value)),
  );
};

/**
 * Treat a single value as matching a range that includes it
 * (e.g. citation "65 mmhg" should match excerpt "65 mm hg" or a wider
 * range like "65-90 mmhg"). Conservative: only numeric equality of either
 * endpoint counts.
 */
const valuesOverlap = (a: string, b: string): boolean => {
  const partsA = a.split("-");
  const partsB = b.split("-");
  return partsA.some((p) => partsB.includes(p));
};

// ---------- Validation entry point ----------

export const validateEsicmReferences = (
  refs: Record<string, Reference[]> = topicReferences,
): ValidationReport => {
  const issues: Issue[] = [];
  let totalEsicm = 0;
  let missingExcerpt = 0;
  let mismatches = 0;

  for (const [topicId, list] of Object.entries(refs)) {
    list.forEach((ref, idx) => {
      if (!isEsicmBacked(ref)) return;
      totalEsicm++;

      const hay = `${ref.label} ${ref.citation}`;
      const citationDoses = extractDoses(hay);

      if (!ref.excerpt) {
        missingExcerpt++;
        issues.push({
          kind: "missing-excerpt",
          topicId,
          refLabel: ref.label,
          refIndex: idx,
          detail:
            citationDoses.length > 0
              ? `No excerpt — citation mentions doses: ${citationDoses.map((d) => d.raw).join(", ")}`
              : "No excerpt on this ESICM-backed reference",
        });
        return;
      }

      for (const d of citationDoses) {
        if (!excerptContainsDose(ref.excerpt, d)) {
          mismatches++;
          issues.push({
            kind: "dose-mismatch",
            topicId,
            refLabel: ref.label,
            refIndex: idx,
            dose: d,
            detail: `Citation/label mentions "${d.raw}" but excerpt does not contain a matching value+unit (normalised: ${d.value} ${d.unit}).`,
          });
        }
      }
    });
  }

  return {
    totalEsicmRefs: totalEsicm,
    refsMissingExcerpt: missingExcerpt,
    doseMismatches: mismatches,
    issues,
  };
};
