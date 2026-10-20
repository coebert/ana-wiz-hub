/**
 * Published FRCA oral/clinical pass rates (Royal College of Anaesthetists).
 * Figures copied from the RCoA results tables, retrieved 20 Oct 2026.
 * The College publishes pass percentages only — never per-question viva marks —
 * so practice scores can never be converted into a predicted exam result.
 */
export type PassRateExam = "primary" | "final" | "fficm";

export interface PassRateSitting {
  sitting: string;
  candidates: number;
  overall: number;
  ukAll: number;
  ukFirst: number;
}

export interface PassRateTable {
  exam: PassRateExam;
  label: string;
  component: string;
  sourceUrl: string;
  sittings: PassRateSitting[];
}

export const vivaPassRates: PassRateTable[] = [
  {
    exam: "final",
    label: "Final FRCA",
    component: "Clinical (SOE)",
    sourceUrl: "https://www.rcoa.ac.uk/final-frca-written-clinical-results",
    sittings: [
      { sitting: "Jun 2026", candidates: 427, overall: 73.07, ukAll: 78.69, ukFirst: 77.1 },
      { sitting: "Dec 2025", candidates: 484, overall: 73.55, ukAll: 76.89, ukFirst: 78.12 },
      { sitting: "Jun 2025", candidates: 436, overall: 75.46, ukAll: 79.01, ukFirst: 80.6 },
      { sitting: "Dec 2024", candidates: 471, overall: 69.85, ukAll: 75.54, ukFirst: 77.65 },
      { sitting: "Jun 2024", candidates: 420, overall: 66.9, ukAll: 69.64, ukFirst: 73.47 },
      { sitting: "Dec 2023", candidates: 506, overall: 72.13, ukAll: 75.26, ukFirst: 73.72 },
    ],
  },
  {
    exam: "primary",
    label: "Primary FRCA",
    component: "Clinical (OSCE + SOE)",
    sourceUrl: "https://www.rcoa.ac.uk/primary-frca-written-clinical-pass-rates",
    sittings: [
      { sitting: "May 2026", candidates: 431, overall: 61.25, ukAll: 71.11, ukFirst: 72.65 },
      { sitting: "Jan 2026", candidates: 399, overall: 69.42, ukAll: 76.18, ukFirst: 77.91 },
      { sitting: "Nov 2025", candidates: 309, overall: 62.78, ukAll: 72.73, ukFirst: 71.11 },
      { sitting: "Jun 2025", candidates: 421, overall: 60.33, ukAll: 68.85, ukFirst: 71.77 },
      { sitting: "Jan 2025", candidates: 377, overall: 64.19, ukAll: 74.37, ukFirst: 79.43 },
      { sitting: "Nov 2024", candidates: 374, overall: 60.96, ukAll: 73.53, ukFirst: 76.88 },
    ],
  },
];

export const passRatesFor = (exam: PassRateExam) =>
  vivaPassRates.find((t) => t.exam === exam) ?? null;

/** Candidate-weighted overall pass rate across the listed sittings (1 dp). */
export function weightedOverallPassRate(table: PassRateTable): number {
  const n = table.sittings.reduce((s, x) => s + x.candidates, 0);
  const passed = table.sittings.reduce((s, x) => s + (x.overall / 100) * x.candidates, 0);
  return Math.round((passed / n) * 1000) / 10;
}

/** Share of a learner's saved attempts that met the practice pass mark (score ≥ 5/10, the app rubric bare pass). */
export const PRACTICE_PASS_MARK = 5;
export function practicePassShare(scores: number[]): number | null {
  if (scores.length === 0) return null;
  const hit = scores.filter((s) => s >= PRACTICE_PASS_MARK).length;
  return Math.round((hit / scores.length) * 1000) / 10;
}
