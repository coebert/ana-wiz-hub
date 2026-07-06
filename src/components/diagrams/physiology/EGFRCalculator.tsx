import { useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DiagramFigure } from "../_shared/DiagramFigure";

type Sex = "female" | "male";

interface CKDStage {
  stage: string;
  label: string;
  band: string;
  description: string;
  action: string;
}

const stageFor = (egfr: number): CKDStage => {
  if (egfr >= 90) return {
    stage: "G1",
    label: "Normal or high",
    band: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
    description: "GFR ≥90 ml/min/1.73 m². Only classified as CKD if structural/functional kidney damage is present (e.g. albuminuria, haematuria, imaging abnormality) for >3 months.",
    action: "Address cardiovascular risk factors. Investigate cause of any markers of kidney damage.",
  };
  if (egfr >= 60) return {
    stage: "G2",
    label: "Mildly decreased",
    band: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
    description: "GFR 60–89 ml/min/1.73 m². Only CKD if accompanied by markers of kidney damage. Common in healthy older adults.",
    action: "Monitor annually. Avoid nephrotoxins. Adjust drug doses (e.g. LMWH, gabapentin) only if clinically indicated.",
  };
  if (egfr >= 45) return {
    stage: "G3a",
    label: "Mild–moderate decrease",
    band: "bg-yellow-500/15 text-yellow-700 dark:text-yellow-300 border-yellow-500/30",
    description: "GFR 45–59 ml/min/1.73 m². Increased cardiovascular risk; complications of CKD (anaemia, mineral bone disease) begin to emerge.",
    action: "Check ACR, FBC, bone profile, PTH. Review meds (metformin caution; avoid NSAIDs). BP target <130/80. Annual review.",
  };
  if (egfr >= 30) return {
    stage: "G3b",
    label: "Moderate–severe decrease",
    band: "bg-orange-500/15 text-orange-700 dark:text-orange-300 border-orange-500/30",
    description: "GFR 30–44 ml/min/1.73 m². Higher risk of progression and complications.",
    action: "Refer to nephrology if rapid progression, ACR ≥70, or unexplained. Stop metformin if eGFR <30. Dose-adjust LMWH, DOACs, gabapentin, opioids. Avoid gadolinium.",
  };
  if (egfr >= 15) return {
    stage: "G4",
    label: "Severely decreased",
    band: "bg-red-500/15 text-red-700 dark:text-red-300 border-red-500/30",
    description: "GFR 15–29 ml/min/1.73 m². Pre-dialysis. High symptom burden, anaemia, hyperkalaemia, acidosis, fluid overload risk.",
    action: "Nephrology follow-up. Plan for RRT (vascular access, transplant work-up, conservative care discussion). Avoid contrast where possible. Pre-op: K⁺, HCO₃⁻, Hb, fluid status.",
  };
  return {
    stage: "G5",
    label: "Kidney failure",
    band: "bg-red-600/20 text-red-800 dark:text-red-200 border-red-600/40",
    description: "GFR <15 ml/min/1.73 m². Established kidney failure — usually requires RRT (haemodialysis, peritoneal dialysis or transplant) or conservative management.",
    action: "Time anaesthesia around dialysis (ideally day after). Check K⁺ on day. Use cisatracurium/atracurium. Avoid morphine (active metabolites), NSAIDs, contrast.",
  };
};

// CKD-EPI 2021 (race-free) creatinine equation
// eGFR = 142 × min(Scr/κ, 1)^α × max(Scr/κ, 1)^-1.200 × 0.9938^age × (1.012 if female)
// Scr in mg/dL; κ = 0.7 (F) / 0.9 (M); α = -0.241 (F) / -0.302 (M)
const calculateEGFR = (crUmolL: number, age: number, sex: Sex): number => {
  const scr = crUmolL / 88.4; // µmol/L → mg/dL
  const kappa = sex === "female" ? 0.7 : 0.9;
  const alpha = sex === "female" ? -0.241 : -0.302;
  const sexFactor = sex === "female" ? 1.012 : 1;
  const ratio = scr / kappa;
  const minTerm = Math.pow(Math.min(ratio, 1), alpha);
  const maxTerm = Math.pow(Math.max(ratio, 1), -1.2);
  const ageTerm = Math.pow(0.9938, age);
  return 142 * minTerm * maxTerm * ageTerm * sexFactor;
};

export const EGFRCalculator = () => {
  const [creatinine, setCreatinine] = useState<string>("80");
  const [age, setAge] = useState<string>("60");
  const [sex, setSex] = useState<Sex>("male");
  const [submitted, setSubmitted] = useState(false);

  const result = useMemo(() => {
    const cr = parseFloat(creatinine);
    const a = parseFloat(age);
    if (!cr || !a || cr <= 0 || a <= 0 || a > 120) return null;
    const egfr = calculateEGFR(cr, a, sex);
    return { egfr, stage: stageFor(egfr) };
  }, [creatinine, age, sex]);

  const reset = () => {
    setCreatinine("80");
    setAge("60");
    setSex("male");
    setSubmitted(false);
  };

  return (
    <DiagramFigure
      id="egfr-calculator"
      title="EGFR"
      description="Auto-generated wrapper for the EGFR interactive calculator. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
                  <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="egfr-cr">Serum creatinine (µmol/L)</Label>
            <Input
              id="egfr-cr"
              type="number"
              inputMode="decimal"
              value={creatinine}
              onChange={(e) => setCreatinine(e.target.value)}
              placeholder="e.g. 80"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="egfr-age">Age (years)</Label>
            <Input
              id="egfr-age"
              type="number"
              inputMode="numeric"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="e.g. 60"
            />
          </div>
          <div className="space-y-2">
            <Label>Sex</Label>
            <div className="flex gap-2">
              <Button
                type="button"
                variant={sex === "female" ? "default" : "outline"}
                className="flex-1"
                onClick={() => setSex("female")}
              >
                Female
              </Button>
              <Button
                type="button"
                variant={sex === "male" ? "default" : "outline"}
                className="flex-1"
                onClick={() => setSex("male")}
              >
                Male
              </Button>
            </div>
          </div>
        </div>
  
        <div className="flex gap-2">
          <Button onClick={() => setSubmitted(true)}>Calculate eGFR</Button>
          <Button variant="outline" onClick={reset}>Reset</Button>
        </div>
  
        {submitted && result && (
          <div className={cn("rounded-xl border p-5 space-y-3", result.stage.band)}>
            <div className="flex items-baseline justify-between gap-3 flex-wrap">
              <div>
                <p className="text-xs uppercase tracking-wide opacity-80">CKD-EPI 2021 eGFR</p>
                <p className="text-3xl font-serif font-bold">
                  {result.egfr.toFixed(1)}
                  <span className="text-base font-normal opacity-80"> ml/min/1.73 m²</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-serif font-bold">{result.stage.stage}</p>
                <p className="text-sm font-medium">{result.stage.label}</p>
              </div>
            </div>
            <p className="text-sm text-foreground/90 border-t border-current/20 pt-3">{result.stage.description}</p>
            <p className="text-sm text-foreground/90"><strong>Action:</strong> {result.stage.action}</p>
          </div>
        )}
  
        {submitted && !result && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-foreground">
            Please enter valid creatinine and age values.
          </div>
        )}
  
        <div className="rounded-lg bg-muted/40 border border-border p-4 text-xs text-foreground/80 space-y-1">
          <p className="font-semibold text-foreground">CKD-EPI 2021 (race-free) equation</p>
          <p>
            eGFR = 142 × min(Scr/κ, 1)<sup>α</sup> × max(Scr/κ, 1)<sup>−1.200</sup> × 0.9938<sup>age</sup>
            × (1.012 if female), where κ = 0.7 (F) / 0.9 (M); α = −0.241 (F) / −0.302 (M); Scr in mg/dL.
          </p>
          <p>The 2021 equation removed the race coefficient. Less accurate at extremes of muscle mass, AKI, pregnancy, and amputees — use measured GFR (Cr-EDTA, iohexol) when precision matters.</p>
        </div>
      </div>
    </DiagramFigure>
  );
};
