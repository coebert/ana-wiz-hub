import { useMemo, useState } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

// ESC/ERS 2022 four-strata risk model for PAH at follow-up.
// Each variable scored 1 (low) / 2 (intermediate-low) / 3 (intermediate-high) / 4 (high).
// Final risk = round(mean of available scores).

type Score = 1 | 2 | 3 | 4 | null;

interface VariableDef {
  key: string;
  label: string;
  unit?: string;
  // ordered thresholds for the four bands
  options: { label: string; score: Score }[];
}

const variables: VariableDef[] = [
  {
    key: "whofc",
    label: "WHO Functional Class",
    options: [
      { label: "I or II", score: 1 },
      { label: "III", score: 3 },
      { label: "IV", score: 4 },
    ],
  },
  {
    key: "sixmwd",
    label: "6-Minute Walk Distance",
    unit: "m",
    options: [
      { label: ">440 m", score: 1 },
      { label: "320–440 m", score: 2 },
      { label: "165–319 m", score: 3 },
      { label: "<165 m", score: 4 },
    ],
  },
  {
    key: "ntprobnp",
    label: "NT-proBNP",
    unit: "ng/L",
    options: [
      { label: "<300", score: 1 },
      { label: "300–649", score: 2 },
      { label: "650–1100", score: 3 },
      { label: ">1100", score: 4 },
    ],
  },
  {
    key: "rap",
    label: "Right Atrial Pressure (RHC)",
    unit: "mmHg",
    options: [
      { label: "<8", score: 1 },
      { label: "8–14", score: 3 },
      { label: ">14", score: 4 },
    ],
  },
  {
    key: "ci",
    label: "Cardiac Index (RHC)",
    unit: "L/min/m²",
    options: [
      { label: "≥2.5", score: 1 },
      { label: "2.0–2.4", score: 3 },
      { label: "<2.0", score: 4 },
    ],
  },
  {
    key: "svo2",
    label: "Mixed Venous Saturation (SvO₂)",
    unit: "%",
    options: [
      { label: ">65 %", score: 1 },
      { label: "60–65 %", score: 2 },
      { label: "55–59 %", score: 3 },
      { label: "<55 %", score: 4 },
    ],
  },
];

const bands = [
  {
    score: 1,
    label: "Low risk",
    mortality: "<5 % at 1 year",
    tone: "bg-clinical/10 border-clinical/40 text-clinical",
    advice:
      "Continue current targeted therapy; reassess at next clinic visit. Treatment goal achieved.",
  },
  {
    score: 2,
    label: "Intermediate–Low risk",
    mortality: "5–10 % at 1 year",
    tone: "bg-perioperative/10 border-perioperative/40 text-perioperative",
    advice:
      "Consider treatment escalation — addition of a third drug or switch to parenteral prostacyclin (selexipag, treprostinil).",
  },
  {
    score: 3,
    label: "Intermediate–High risk",
    mortality: "10–20 % at 1 year",
    tone: "bg-icu/10 border-icu/40 text-icu",
    advice:
      "Escalate therapy now — add IV/SC prostacyclin and refer for transplantation work-up. Discuss with PH centre.",
  },
  {
    score: 4,
    label: "High risk",
    mortality: ">20 % at 1 year",
    tone: "bg-destructive/10 border-destructive/40 text-destructive",
    advice:
      "Initiate maximal therapy including IV epoprostenol; urgent transplantation assessment; consider palliative care discussion in parallel.",
  },
] as const;

const PHRiskStratificationCalculator = () => {
  const [scores, setScores] = useState<Record<string, Score>>({});

  const result = useMemo(() => {
    const filled = Object.values(scores).filter((s): s is Exclude<Score, null> => s !== null);
    if (filled.length === 0) return null;
    const mean = filled.reduce((a, b) => a + b, 0) / filled.length;
    const rounded = Math.round(mean);
    const band = bands.find((b) => b.score === rounded) ?? bands[0];
    return { mean, rounded, band, n: filled.length };
  }, [scores]);

  const reset = () => setScores({});

  return (
    <DiagramFigure
      id="ph-risk-stratification-calculator"
      title="PH risk stratification"
      description="PH calculator: enter patient values to compute the score step by step, with the interpretation thresholds and clinical actions FRCA and FFICM candidates should know."
    >
              <div className="space-y-4 mb-8">
        <div className="p-4 rounded-lg border border-border bg-card">
          <h2 className="text-xl font-serif font-bold text-foreground mb-1">
            ESC/ERS 2022 Risk Stratification — PAH Follow-up
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Four-strata risk model for follow-up assessment of patients with
            pulmonary arterial hypertension. Select the band for each available
            variable; the calculator returns the rounded mean as the estimated
            1-year mortality risk. Use the simplified ESC/ERS table — not a
            substitute for full multidimensional assessment in a PH centre.
          </p>
  
          <div className="grid sm:grid-cols-2 gap-3">
            {variables.map((v) => (
              <div key={v.key} className="p-3 rounded-md border border-border bg-background/50">
                <p className="text-xs font-semibold text-foreground mb-2">
                  {v.label}
                  {v.unit && (
                    <span className="text-muted-foreground font-normal"> ({v.unit})</span>
                  )}
                </p>
                <div className="flex flex-wrap gap-1">
                  {v.options.map((opt) => {
                    const isSelected = scores[v.key] === opt.score;
                    return (
                          <button
                        key={opt.label}
                        onClick={() =>
                          setScores((prev) => ({ ...prev, [v.key]: isSelected ? null : opt.score }))
                        }
                        className={`text-[11px] px-2 py-1 rounded-md border transition-colors ${
                          isSelected
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-card text-muted-foreground border-border hover:bg-secondary/50"
                        }`}
                      >
                        {opt.label}
                      </button>
    );
                  })}
                </div>
              </div>
            ))}
          </div>
  
          {/* Result */}
          <div className="mt-4">
            {result ? (
              <div className={`p-4 rounded-lg border-2 ${result.band.tone}`}>
                <div className="flex items-baseline justify-between flex-wrap gap-2 mb-2">
                  <p className="font-serif text-lg font-bold">{result.band.label}</p>
                  <p className="text-xs font-mono">
                    Mean score {result.mean.toFixed(2)} · rounded {result.rounded} · {result.n}/{variables.length} variables
                  </p>
                </div>
                <p className="text-sm font-semibold mb-1">
                  Estimated 1-year mortality: <span className="font-mono">{result.band.mortality}</span>
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">{result.band.advice}</p>
              </div>
            ) : (
              <div className="p-4 rounded-lg border border-dashed border-border bg-background/30 text-center text-xs text-muted-foreground">
                Select a band for at least one variable to calculate risk.
              </div>
            )}
            <div className="flex justify-end mt-2">
              <button
                onClick={reset}
                className="text-[11px] px-2 py-1 rounded border border-border text-muted-foreground hover:bg-secondary/50"
                disabled={!result}
              >
                Reset
              </button>
            </div>
          </div>
  
          {/* Reference key */}
          <div className="mt-4 pt-3 border-t border-border">
            <p className="text-[11px] font-semibold text-foreground mb-2">Risk band reference</p>
            <div className="grid sm:grid-cols-4 gap-2">
              {bands.map((b) => (
                <div key={b.score} className={`p-2 rounded border ${b.tone}`}>
                  <p className="text-[11px] font-semibold">{b.label}</p>
                  <p className="text-[10px] font-mono">{b.mortality}</p>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground italic mt-3">
              Adapted from Humbert et al., 2022 ESC/ERS Guidelines for the diagnosis and treatment of pulmonary hypertension (Eur Heart J 2022;43:3618–3731). The four-strata model is intended for follow-up; the three-strata COMPERA/SPAHR/REVEAL Lite tools may be preferred at baseline.
            </p>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default PHRiskStratificationCalculator;
