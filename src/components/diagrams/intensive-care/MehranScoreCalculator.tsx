import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mehranScore, mehranBandIndex } from "@/lib/mehran-score";
import { cn } from "@/lib/utils";
import { DiagramFigure } from "../_shared/DiagramFigure";

interface RiskFactor {
  id: string;
  label: string;
  detail: string;
  points: number | "egfr" | "contrast";
}

const factors: RiskFactor[] = [
  { id: "hypotension", label: "Hypotension", detail: "SBP <80 mmHg for ≥1 h requiring inotropes within 24 h periprocedurally", points: 5 },
  { id: "iabp", label: "Intra-aortic balloon pump", detail: "IABP in situ", points: 5 },
  { id: "chf", label: "Congestive heart failure", detail: "NYHA III/IV or pulmonary oedema", points: 5 },
  { id: "age", label: "Age >75 years", detail: "Older patients have reduced renal reserve", points: 4 },
  { id: "anaemia", label: "Anaemia", detail: "Hct <39% (M) or <36% (F)", points: 3 },
  { id: "diabetes", label: "Diabetes mellitus", detail: "Insulin- or non-insulin-dependent", points: 3 },
  { id: "contrast", label: "Contrast volume", detail: "1 point per 100 mL contrast administered", points: "contrast" },
  { id: "egfr", label: "Reduced eGFR", detail: "2 (40–60), 4 (20–<40), 6 (<20) ml/min/1.73 m²", points: "egfr" },
];

interface RiskBand {
  max: number;
  label: string;
  band: string;
  ciAki: string;
  dialysis: string;
  advice: string;
}

const bands: RiskBand[] = [
  {
    max: 5,
    label: "Low risk",
    band: "bg-muted text-foreground border-border",
    ciAki: "~7.5%",
    dialysis: "0.04%",
    advice: "Historical PCI cohort estimate only. This score does not establish contrast causation or determine hydration, medication withholding, dialysis or whether imaging should proceed. Use the individual clinical assessment and current guidance in this lesson.",
  },
  {
    max: 10,
    label: "Moderate risk",
    band: "bg-muted text-foreground border-border",
    ciAki: "~14%",
    dialysis: "0.12%",
    advice: "Historical PCI cohort estimate only. This score does not establish contrast causation or determine hydration, medication withholding, dialysis or whether imaging should proceed. Use the individual clinical assessment and current guidance in this lesson.",
  },
  {
    max: 16,
    label: "High risk",
    band: "bg-muted text-foreground border-border",
    ciAki: "~26%",
    dialysis: "1.1%",
    advice: "Historical PCI cohort estimate only. This score does not establish contrast causation or determine hydration, medication withholding, dialysis or whether imaging should proceed. Use the individual clinical assessment and current guidance in this lesson.",
  },
  {
    max: 999,
    label: "Very high risk",
    band: "bg-muted text-foreground border-border",
    ciAki: "~57%",
    dialysis: "12.6%",
    advice: "Historical PCI cohort estimate only. This score does not establish contrast causation or determine hydration, medication withholding, dialysis or whether imaging should proceed. Use the individual clinical assessment and current guidance in this lesson.",
  },
];

export const MehranScoreCalculator = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [contrastMl, setContrastMl] = useState<string>("100");
  const [egfr, setEgfr] = useState<string>("60");
  const [submitted, setSubmitted] = useState(false);

  const toggle = (id: string) =>
    setChecked((s) => ({ ...s, [id]: !s[id] }));

  const result = useMemo(() => {
    const score = mehranScore(checked, contrastMl, egfr);
    if (score === null) return null;
    const band = bands[mehranBandIndex(score)];
    return { score, ...band };
  }, [checked, contrastMl, egfr]);

  const reset = () => {
    setChecked({});
    setContrastMl("100");
    setEgfr("60");
    setSubmitted(false);
  };

  return (
    <DiagramFigure
      id="mehran-score-calculator"
      title="Mehran score"
      description="Original 2004 PCI risk score: historical cohort estimates, not a validated ICU CT risk estimate or treatment directive."
    >
              <div className="space-y-5">
        <div className="space-y-2">
          {factors.map((f) => {
            if (f.points === "contrast" || f.points === "egfr") return null;
            return (
                  <label
                key={f.id}
                className="flex items-start gap-3 p-3 rounded-lg border border-border bg-card hover:bg-muted/40 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={!!checked[f.id]}
                  onChange={() => toggle(f.id)}
                  className="mt-1 h-4 w-4 rounded border-border accent-primary"
                />
                <div className="flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-medium text-foreground text-sm">{f.label}</span>
                    <span className="text-xs font-semibold text-primary">+{f.points}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{f.detail}</p>
                </div>
              </label>
    );
          })}
        </div>
  
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="mehran-contrast">Contrast volume (mL)</Label>
            <Input
              id="mehran-contrast"
              type="number"
              inputMode="decimal"
              value={contrastMl}
              onChange={(e) => setContrastMl(e.target.value)}
              placeholder="e.g. 200"
            />
            <p className="text-xs text-muted-foreground">+1 point per 100 mL</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="mehran-egfr">eGFR (ml/min/1.73 m²)</Label>
            <Input
              id="mehran-egfr"
              type="number"
              inputMode="decimal"
              value={egfr}
              onChange={(e) => setEgfr(e.target.value)}
              placeholder="e.g. 45"
            />
            <p className="text-xs text-muted-foreground">+2 (40–60), +4 (20–&lt;40), +6 (&lt;20)</p>
          </div>
        </div>
  
        <div className="flex gap-2">
          <Button onClick={() => setSubmitted(true)}>Calculate Mehran score</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>
  
        {submitted && !result && <p role="alert" className="text-destructive">Enter non-negative contrast volume and eGFR values. eGFR is unreliable during evolving AKI.</p>}
        {submitted && result && (
          <div className={cn("rounded-lg border p-5 space-y-3", result.band)}>
            <div className="flex items-baseline justify-between gap-3 flex-wrap">
              <div>
                <p className="text-xs uppercase tracking-wide opacity-80">Mehran Score</p>
                <p className="text-3xl font-serif font-bold">
                  {result.score}
                  <span className="text-base font-normal opacity-80"> points</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-serif font-bold">{result.label}</p>
                <p className="text-xs opacity-80">Original cohort kidney-injury incidence {result.ciAki} · dialysis {result.dialysis}</p>
              </div>
            </div>
            <p className="text-sm text-foreground/90 border-t border-current/20 pt-3">
              <strong>Interpretation:</strong> {result.advice}
            </p>
          </div>
        )}
  
        <div className="rounded-lg bg-muted/40 border border-border p-4 text-xs text-foreground/80 space-y-1">
          <p className="font-semibold text-foreground">Mehran score (2004) — original PCI cohort</p>
          <p>Bands: ≤5 low (~7.5% CI-AKI), 6–10 moderate (~14%), 11–16 high (~26%), &gt;16 very high (~57%). Developed for percutaneous coronary intervention, not calibrated for general ICU CT. These are historical cohort incidences, not modern patient-specific predictions or proof of injury caused by contrast.</p>
        </div>
      </div>
    </DiagramFigure>
  );
};
