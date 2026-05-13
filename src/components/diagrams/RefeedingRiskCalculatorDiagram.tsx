import { useMemo, useState } from "react";
import { AlertTriangle, ShieldCheck } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * Refeeding Risk Stratifier — interactive NICE CG32 calculator.
 *
 * Implements NICE CG32 (2006/2017) criteria for identifying patients at
 * risk of refeeding syndrome and recommends an evidence-based starting
 * caloric regimen, thiamine prophylaxis, and electrolyte monitoring plan.
 *
 * Logic (NICE CG32):
 *   High risk     = ANY ONE of:
 *     - BMI < 16
 *     - Weight loss > 15% in 3–6 months
 *     - Little / no nutrition > 10 days
 *     - Low pre-feeding K⁺ / PO₄³⁻ / Mg²⁺
 *   OR ANY TWO of:
 *     - BMI < 18.5
 *     - Weight loss > 10% in 3–6 months
 *     - Little / no nutrition > 5 days
 *     - History of alcohol misuse or insulin / chemotherapy / antacids / diuretics
 *
 *   Extreme risk  = BMI < 14 OR negligible intake > 15 days
 */

interface Inputs {
  bmi: number;
  weightLossPct: number;
  daysNbm: number;
  lowElectrolytes: boolean;
  alcoholOrDrugs: boolean;
}

type Verdict = "extreme" | "high" | "low";

const decide = (i: Inputs): { verdict: Verdict; reasons: string[]; startKcal: number } => {
  const reasons: string[] = [];

  if (i.bmi < 14) reasons.push("BMI <14 (extreme)");
  if (i.daysNbm > 15) reasons.push(">15 days negligible intake (extreme)");

  const major: string[] = [];
  if (i.bmi < 16) major.push("BMI <16");
  if (i.weightLossPct > 15) major.push("Weight loss >15%");
  if (i.daysNbm > 10) major.push(">10 days little/no intake");
  if (i.lowElectrolytes) major.push("Low pre-feed K⁺ / PO₄ / Mg²⁺");

  const minor: string[] = [];
  if (i.bmi < 18.5 && i.bmi >= 16) minor.push("BMI <18.5");
  if (i.weightLossPct > 10 && i.weightLossPct <= 15) minor.push("Weight loss >10%");
  if (i.daysNbm > 5 && i.daysNbm <= 10) minor.push(">5 days little/no intake");
  if (i.alcoholOrDrugs) minor.push("Alcohol misuse / chemo / insulin / antacids / diuretics");

  const isExtreme = i.bmi < 14 || i.daysNbm > 15;
  const isHighByMajor = major.length >= 1;
  const isHighByMinor = minor.length >= 2;

  if (isExtreme) {
    return { verdict: "extreme", reasons: [...reasons, ...major, ...minor], startKcal: 5 };
  }
  if (isHighByMajor || isHighByMinor) {
    return { verdict: "high", reasons: [...major, ...minor], startKcal: 10 };
  }
  return { verdict: "low", reasons: [], startKcal: 25 };
};

const VERDICT_COPY: Record<Verdict, { title: string; tone: string; ring: string; bg: string }> = {
  extreme: {
    title: "Extreme risk of refeeding syndrome",
    tone: "text-destructive",
    ring: "border-destructive/40",
    bg: "bg-destructive/10",
  },
  high: {
    title: "High risk of refeeding syndrome",
    tone: "text-icu",
    ring: "border-icu/40",
    bg: "bg-icu/10",
  },
  low: {
    title: "Not high risk by NICE CG32",
    tone: "text-physiology",
    ring: "border-physiology/40",
    bg: "bg-physiology/10",
  },
};

export const RefeedingRiskCalculatorDiagram = () => {
  const [inputs, setInputs] = useState<Inputs>({
    bmi: 17,
    weightLossPct: 12,
    daysNbm: 7,
    lowElectrolytes: false,
    alcoholOrDrugs: false,
  });

  const result = useMemo(() => decide(inputs), [inputs]);
  const copy = VERDICT_COPY[result.verdict];

  return (
    <DiagramFigure
      id="refeeding-risk-calculator-diagram"
      title="Refeeding risk calculator"
      description="Auto-generated wrapper for the Refeeding risk calculator interactive calculator. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div>
            <h3 className="text-lg font-serif font-bold text-foreground">
              Refeeding Risk Stratifier (NICE CG32)
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Adjust the sliders / toggles to mirror your patient. Recommendation updates live.
            </p>
          </div>
        </div>
  
        <div className="grid md:grid-cols-2 gap-5">
          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <Label className="text-sm">BMI (kg/m²)</Label>
                <span className="text-sm font-mono font-semibold text-foreground">{inputs.bmi.toFixed(1)}</span>
              </div>
              <Slider
                value={[inputs.bmi]}
                min={10}
                max={30}
                step={0.5}
                onValueChange={([v]) => setInputs((s) => ({ ...s, bmi: v }))}
              />
            </div>
  
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <Label className="text-sm">Unintentional weight loss (% in 3–6 mo)</Label>
                <span className="text-sm font-mono font-semibold text-foreground">{inputs.weightLossPct}%</span>
              </div>
              <Slider
                value={[inputs.weightLossPct]}
                min={0}
                max={30}
                step={1}
                onValueChange={([v]) => setInputs((s) => ({ ...s, weightLossPct: v }))}
              />
            </div>
  
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <Label className="text-sm">Days of little / no nutrition</Label>
                <span className="text-sm font-mono font-semibold text-foreground">{inputs.daysNbm} d</span>
              </div>
              <Slider
                value={[inputs.daysNbm]}
                min={0}
                max={20}
                step={1}
                onValueChange={([v]) => setInputs((s) => ({ ...s, daysNbm: v }))}
              />
            </div>
  
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <Label className="text-sm leading-tight">
                Low pre-feed K⁺ / PO₄³⁻ / Mg²⁺
              </Label>
              <Switch
                checked={inputs.lowElectrolytes}
                onCheckedChange={(v) => setInputs((s) => ({ ...s, lowElectrolytes: v }))}
              />
            </div>
  
            <div className="flex items-center justify-between rounded-lg border border-border p-3">
              <Label className="text-sm leading-tight">
                Alcohol misuse, chemo, insulin, antacids or diuretics
              </Label>
              <Switch
                checked={inputs.alcoholOrDrugs}
                onCheckedChange={(v) => setInputs((s) => ({ ...s, alcoholOrDrugs: v }))}
              />
            </div>
          </div>
  
          <div className={`rounded-lg border-2 ${copy.ring} ${copy.bg} p-4 space-y-3`}>
            <div className="flex items-center gap-2">
              {result.verdict === "low" ? (
                <ShieldCheck className={`h-5 w-5 ${copy.tone}`} />
              ) : (
                <AlertTriangle className={`h-5 w-5 ${copy.tone}`} />
              )}
              <p className={`text-sm font-bold uppercase tracking-wide ${copy.tone}`}>
                {copy.title}
              </p>
            </div>
  
            {result.reasons.length > 0 && (
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-1">
                  Triggering criteria
                </p>
                <ul className="text-xs text-foreground space-y-0.5 list-disc list-inside">
                  {result.reasons.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>
            )}
  
            <div className="rounded-md bg-background/60 border border-border/60 p-3 space-y-1.5">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                Starting regimen
              </p>
              <p className="text-sm text-foreground leading-relaxed">
                <strong>{result.startKcal} kcal/kg/day</strong>
                {result.verdict !== "low" && (
                  <>
                    {" "}for the first 24 h, then increase over <strong>4–7 days</strong> to full target.
                  </>
                )}
                {result.verdict === "low" && (
                  <> — feed to full target (20–25 kcal/kg/day) over 24–48 h.</>
                )}
              </p>
              {result.verdict !== "low" && (
                <ul className="text-xs text-muted-foreground space-y-1 mt-2 list-disc list-inside leading-relaxed">
                  <li>
                    IV thiamine <strong>200–300 mg</strong> at least 30 min before feeding, then daily for 3–10 days
                  </li>
                  <li>
                    Vitamin B compound + multivitamin / trace elements
                  </li>
                  <li>
                    Replace K⁺, PO₄³⁻ and Mg²⁺ <em>before</em> and <em>during</em> feeding (do not delay feed for normal levels)
                  </li>
                  <li>
                    Daily K⁺ / PO₄ / Mg²⁺ for the first week; ECG monitoring if extreme risk
                  </li>
                  <li>
                    Cardiac monitoring for fluid overload — risk of cardiac failure on day 3–7
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default RefeedingRiskCalculatorDiagram;
