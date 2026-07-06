import { useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DiagramFigure } from "../_shared/DiagramFigure";

type Stage = 0 | 1 | 2 | 3;

interface Result {
  stage: Stage;
  creatReason: string;
  uoReason: string;
  label: string;
  mortality: string;
  advice: string;
  band: string;
}

const stageMeta: Record<Stage, { label: string; band: string; mortality: string; advice: string }> = {
  0: {
    label: "No AKI",
    band: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
    mortality: "Baseline risk",
    advice: "No KDIGO criteria met. Continue routine monitoring; reassess if oliguria or creatinine rise develops.",
  },
  1: {
    label: "Stage 1 AKI",
    band: "bg-yellow-500/15 text-yellow-700 dark:text-yellow-300 border-yellow-500/30",
    mortality: "Hospital mortality ~10–20%",
    advice: "Identify and treat cause. Optimise volume status and MAP (≥65 mmHg). Stop nephrotoxins (NSAIDs, ACEi/ARB, aminoglycosides, contrast). Review drug doses. Daily creatinine + UO.",
  },
  2: {
    label: "Stage 2 AKI",
    band: "bg-orange-500/15 text-orange-700 dark:text-orange-300 border-orange-500/30",
    mortality: "Hospital mortality ~20–35%",
    advice: "All Stage 1 measures + nephrology referral. Consider invasive haemodynamic monitoring. Anticipate RRT — establish vascular access plan. Avoid hyperchloraemic fluids.",
  },
  3: {
    label: "Stage 3 AKI",
    band: "bg-red-500/15 text-red-700 dark:text-red-300 border-red-500/30",
    mortality: "Hospital mortality ~40–60%",
    advice: "Urgent nephrology / critical care. Initiate RRT for refractory hyperkalaemia, acidosis, fluid overload, uraemic complications, or toxin removal (AEIOU). Consider CRRT if haemodynamically unstable.",
  },
};

const classify = (
  baselineCr: number | null,
  currentCr: number | null,
  uoMlKgHr: number | null,
  uoDurationHr: number | null,
  onRRT: boolean,
): Result => {
  let crStage: Stage = 0;
  let crReason = "Insufficient creatinine data";

  if (baselineCr && currentCr && baselineCr > 0) {
    const ratio = currentCr / baselineCr;
    const absRise = currentCr - baselineCr;
    if (currentCr >= 354 || ratio >= 3.0) {
      crStage = 3;
      crReason = `Cr ${currentCr} µmol/L (×${ratio.toFixed(2)} baseline) — ≥3× baseline or ≥354 µmol/L`;
    } else if (ratio >= 2.0) {
      crStage = 2;
      crReason = `Cr ×${ratio.toFixed(2)} baseline — 2.0–2.9× baseline`;
    } else if (ratio >= 1.5 || absRise >= 26.5) {
      crStage = 1;
      crReason = `Cr ×${ratio.toFixed(2)} baseline (Δ ${absRise.toFixed(0)} µmol/L) — ≥1.5× baseline or rise ≥26.5 µmol/L`;
    } else {
      crReason = `Cr ×${ratio.toFixed(2)} baseline — no AKI by creatinine`;
    }
  }

  let uoStage: Stage = 0;
  let uoReason = "Insufficient urine output data";
  if (uoMlKgHr !== null && uoDurationHr !== null) {
    if (uoMlKgHr < 0.3 && uoDurationHr >= 24) {
      uoStage = 3;
      uoReason = `UO ${uoMlKgHr} ml/kg/hr for ${uoDurationHr} h — <0.3 for ≥24 h (or anuria ≥12 h)`;
    } else if (uoMlKgHr < 0.5 && uoDurationHr >= 12) {
      uoStage = 2;
      uoReason = `UO ${uoMlKgHr} ml/kg/hr for ${uoDurationHr} h — <0.5 for ≥12 h`;
    } else if (uoMlKgHr < 0.5 && uoDurationHr >= 6) {
      uoStage = 1;
      uoReason = `UO ${uoMlKgHr} ml/kg/hr for ${uoDurationHr} h — <0.5 for 6–12 h`;
    } else {
      uoReason = `UO ${uoMlKgHr} ml/kg/hr for ${uoDurationHr} h — no AKI by urine output`;
    }
  }

  let stage = Math.max(crStage, uoStage) as Stage;
  if (onRRT) stage = 3;

  return {
    stage,
    creatReason: crReason,
    uoReason: uoReason,
    ...stageMeta[stage],
  };
};

export const KDIGOAKIClassifier = () => {
  const [baselineCr, setBaselineCr] = useState<string>("80");
  const [currentCr, setCurrentCr] = useState<string>("");
  const [uo, setUo] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [onRRT, setOnRRT] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const result = useMemo(() => {
    return classify(
      baselineCr ? parseFloat(baselineCr) : null,
      currentCr ? parseFloat(currentCr) : null,
      uo ? parseFloat(uo) : null,
      duration ? parseFloat(duration) : null,
      onRRT,
    );
  }, [baselineCr, currentCr, uo, duration, onRRT]);

  const reset = () => {
    setBaselineCr("80");
    setCurrentCr("");
    setUo("");
    setDuration("");
    setOnRRT(false);
    setSubmitted(false);
  };

  return (
    <DiagramFigure
      id="kdigoaki-classifier"
      title="KDIGOAKI classifier"
      description="Auto-generated wrapper for the KDIGOAKI classifier anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
                  <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="baseline-cr">Baseline creatinine (µmol/L)</Label>
            <Input
              id="baseline-cr"
              type="number"
              inputMode="decimal"
              value={baselineCr}
              onChange={(e) => setBaselineCr(e.target.value)}
              placeholder="e.g. 80"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="current-cr">Current creatinine (µmol/L)</Label>
            <Input
              id="current-cr"
              type="number"
              inputMode="decimal"
              value={currentCr}
              onChange={(e) => setCurrentCr(e.target.value)}
              placeholder="e.g. 150"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="uo">Urine output (ml/kg/hr)</Label>
            <Input
              id="uo"
              type="number"
              inputMode="decimal"
              step="0.1"
              value={uo}
              onChange={(e) => setUo(e.target.value)}
              placeholder="e.g. 0.4"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="duration">Duration of oliguria (hours)</Label>
            <Input
              id="duration"
              type="number"
              inputMode="decimal"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g. 8"
            />
          </div>
        </div>
  
        <label className="flex items-center gap-2 text-sm text-foreground/90 cursor-pointer">
          <input
            type="checkbox"
            checked={onRRT}
            onChange={(e) => setOnRRT(e.target.checked)}
            className="h-4 w-4 rounded border-border accent-primary"
          />
          Patient initiated on renal replacement therapy (auto-stage 3)
        </label>
  
        <div className="flex gap-2">
          <Button onClick={() => setSubmitted(true)}>Classify</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>
  
        {submitted && (
          <div className={cn("rounded-xl border p-5 space-y-3", result.band)}>
            <div className="flex items-baseline justify-between gap-3 flex-wrap">
              <h3 className="text-xl font-serif font-bold">{result.label}</h3>
              <span className="text-sm font-medium opacity-90">{result.mortality}</span>
            </div>
            <div className="text-sm space-y-1 text-foreground/90">
              <p><strong>Creatinine criterion:</strong> {result.creatReason}</p>
              <p><strong>Urine output criterion:</strong> {result.uoReason}</p>
              {onRRT && <p><strong>RRT:</strong> Patient on renal replacement therapy → Stage 3</p>}
            </div>
            <p className="text-sm text-foreground/90 leading-relaxed border-t border-current/20 pt-3">
              <strong>Management:</strong> {result.advice}
            </p>
          </div>
        )}
  
        <div className="rounded-lg bg-muted/40 border border-border p-4 text-xs text-foreground/80 space-y-1">
          <p className="font-semibold text-foreground">KDIGO 2012 AKI definition</p>
          <p>AKI is diagnosed by <strong>any</strong> of: ↑ Cr ≥26.5 µmol/L within 48 h, ↑ Cr ≥1.5× baseline within 7 days, or UO &lt;0.5 ml/kg/hr for ≥6 h.</p>
          <p>The <strong>highest</strong> stage from creatinine or urine output criteria is used. Conversion: 1 mg/dL ≈ 88.4 µmol/L.</p>
        </div>
      </div>
    </DiagramFigure>
  );
};
