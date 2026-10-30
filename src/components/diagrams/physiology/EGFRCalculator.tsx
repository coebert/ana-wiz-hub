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
  considerations: string;
}

const COMMON = "Interpret with the trend, albuminuria (ACR) and any acute illness; a single low value may need prompt repeat and AKI assessment and cannot establish chronic disease. Drug dosing depends on the drug and the renal estimate its guidance requires (e.g. DOACs use Cockcroft–Gault CrCl).";

/** Raw GFR category (KDIGO/NICE NG203) on the unrounded value. */
export const stageFor = (egfr: number): CKDStage => {
  if (egfr >= 90) return {
    stage: "G1", label: "Normal or high",
    band: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
    description: "GFR ≥90 ml/min/1.73 m². G1 alone is not CKD; CKD applies only with markers of kidney damage (e.g. albuminuria, haematuria, structural abnormality) persisting ≥3 months.",
    considerations: "If markers of kidney damage are present, consider their cause and persistence. " + COMMON,
  };
  if (egfr >= 60) return {
    stage: "G2", label: "Mildly decreased",
    band: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
    description: "GFR 60–89 ml/min/1.73 m². G2 alone is not CKD; CKD applies only with markers of kidney damage persisting ≥3 months.",
    considerations: COMMON,
  };
  if (egfr >= 45) return {
    stage: "G3a", label: "Mildly to moderately decreased",
    band: "bg-yellow-500/15 text-yellow-700 dark:text-yellow-300 border-yellow-500/30",
    description: "GFR 45–59 ml/min/1.73 m². Consistent with CKD only if sustained ≥3 months.",
    considerations: COMMON + " Monitoring and investigations follow NICE NG203 and the individual context.",
  };
  if (egfr >= 30) return {
    stage: "G3b", label: "Moderately to severely decreased",
    band: "bg-orange-500/15 text-orange-700 dark:text-orange-300 border-orange-500/30",
    description: "GFR 30–44 ml/min/1.73 m². Consistent with CKD only if sustained ≥3 months.",
    considerations: COMMON + " Contrast and gadolinium choice depends on the agent and the benefit/risk of the study, not the category alone.",
  };
  if (egfr >= 15) return {
    stage: "G4", label: "Severely decreased",
    band: "bg-red-500/15 text-red-700 dark:text-red-300 border-red-500/30",
    description: "GFR 15–29 ml/min/1.73 m². Consistent with CKD only if sustained ≥3 months.",
    considerations: COMMON + " Referral and planning need individual renal assessment (NICE NG203); the category itself does not mandate a specific anaesthetic regimen.",
  };
  return {
    stage: "G5", label: "Kidney failure category",
    band: "bg-red-600/20 text-red-800 dark:text-red-200 border-red-600/40",
    description: "GFR <15 ml/min/1.73 m². A category, not a decision: whether renal replacement therapy is needed depends on symptoms, biochemistry, fluid status and the person's goals (NICE NG107).",
    considerations: COMMON + " Perioperative planning (e.g. dialysis timing, drug choice) is individual and specialist-led.",
  };
};

/** Strict parse: whole nonblank numeric string, finite. Partial strings like "80abc" are rejected. */
export const parseStrict = (s: string): number | null => {
  const t = s.trim();
  if (t === "" || !/^[+-]?(\d+\.?\d*|\.\d+)(e[+-]?\d+)?$/i.test(t)) return null;
  const n = Number(t);
  return Number.isFinite(n) ? n : null;
};

export type EgfrResult = { ok: true; egfr: number; stage: CKDStage } | { ok: false; reason: string };

export const computeEgfr = (crRaw: string, ageRaw: string, sex: Sex): EgfrResult => {
  const cr = parseStrict(crRaw);
  const a = parseStrict(ageRaw);
  if (cr === null || cr <= 0) return { ok: false, reason: "Enter a positive creatinine in µmol/L." };
  if (a === null) return { ok: false, reason: "Enter age in years." };
  if (a < 18) return { ok: false, reason: "CKD-EPI 2021 is an adult equation (age ≥18); it is not applied to children." };
  if (a > 120) return { ok: false, reason: "Age above this tool's 120-year interface limit." };
  const egfr = calculateEGFR(cr, a, sex);
  if (!Number.isFinite(egfr) || egfr <= 0) return { ok: false, reason: "Result is not a finite positive value — check inputs." };
  return { ok: true, egfr, stage: stageFor(egfr) };
};

// CKD-EPI 2021 (race-free) creatinine equation
// eGFR = 142 × min(Scr/κ, 1)^α × max(Scr/κ, 1)^-1.200 × 0.9938^age × (1.012 if female)
// Scr in mg/dL; κ = 0.7 (F) / 0.9 (M); α = -0.241 (F) / -0.302 (M)
export const calculateEGFR = (crUmolL: number, age: number, sex: Sex): number => {
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

  const computed = useMemo(() => computeEgfr(creatinine, age, sex), [creatinine, age, sex]);
  const result = computed.ok ? computed : null;

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
      description="EGFR calculator: enter patient values to compute the score step by step, with GFR category thresholds and educational considerations FRCA and FFICM candidates should know."
    >
                  <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="egfr-cr">Serum creatinine (µmol/L)</Label>
            <Input
              id="egfr-cr"
              type="text"
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
              type="text"
              inputMode="decimal"
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
            <p className="text-sm text-foreground/90"><strong>Educational considerations:</strong> {result.stage.considerations}</p>
            <p className="text-xs text-foreground/80">GFR category only — not a CKD diagnosis. See <a className="underline" href="https://www.nice.org.uk/guidance/ng203/chapter/Recommendations" target="_blank" rel="noreferrer">NICE NG203</a>, <a className="underline" href="https://www.gov.uk/drug-safety-update/prescribing-medicines-in-renal-impairment-using-the-appropriate-estimate-of-renal-function-to-avoid-the-risk-of-adverse-drug-reactions" target="_blank" rel="noreferrer">MHRA renal estimate guidance</a>, <a className="underline" href="https://www.nice.org.uk/guidance/ng148/chapter/Recommendations" target="_blank" rel="noreferrer">NICE NG148 (AKI)</a>.</p>
          </div>
        )}
  
        {!computed.ok && (creatinine.trim() !== "" || age.trim() !== "" || submitted) && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-foreground">
            {"reason" in computed ? computed.reason : null}
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
