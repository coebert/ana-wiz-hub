import { useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

type Phase = "acute-early" | "acute-late" | "recovery";

const PHASE_COPY: Record<Phase, { title: string; subtitle: string; kcalFactor: [number, number]; protein: [number, number]; note: string }>
= {
  "acute-early": {
    title: "Acute / Ebb (0–48 h)",
    subtitle: "Hypermetabolic, high endogenous glucose production",
    kcalFactor: [0.7, 0.7], // hypocaloric: ~70% of measured/predicted
    protein: [1.2, 1.3],
    note: "Trophic / hypocaloric feeding only. Avoid full-target feeding — overfeeding worsens hyperglycaemia, lipogenesis and CO₂ load. ESPEN: do not exceed 70% of REE in the first 48 h.",
  },
  "acute-late": {
    title: "Late Acute (day 3–7)",
    subtitle: "Catabolic phase — muscle wasting peaks",
    kcalFactor: [0.8, 1.0],
    protein: [1.3, 1.5],
    note: "Increase progressively to 80–100% of measured/predicted REE by day 4–7. Indirect calorimetry is the gold standard; otherwise use 25 kcal/kg/day actual body weight. Protein delivery matters more than total calories.",
  },
  recovery: {
    title: "Recovery / rehabilitation",
    subtitle: "Anabolic — supports muscle reconditioning",
    kcalFactor: [1.0, 1.25],
    protein: [1.5, 2.0],
    note: "Aim for 100–125% of REE with high protein delivery (up to 2.0 g/kg/day, higher in burns/trauma) to support rehabilitation. Combine with early mobilisation for maximal benefit.",
  },
};

const baseKcalPerKg = 25; // ESPEN: 20–25 kcal/kg/day target for non-obese ICU patients

export const EnergyProteinTargetDiagram = () => {
  const [weight, setWeight] = useState(70);
  const [phase, setPhase] = useState<Phase>("acute-early");

  const targets = useMemo(() => {
    const p = PHASE_COPY[phase];
    const kcalLow = Math.round(baseKcalPerKg * weight * p.kcalFactor[0]);
    const kcalHigh = Math.round(baseKcalPerKg * weight * p.kcalFactor[1]);
    const proteinLow = +(p.protein[0] * weight).toFixed(0);
    const proteinHigh = +(p.protein[1] * weight).toFixed(0);
    return { kcalLow, kcalHigh, proteinLow, proteinHigh };
  }, [weight, phase]);

  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-serif font-bold text-foreground">
          Energy &amp; Protein Target Estimator (ESPEN 2019)
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Non-obese adult ICU patient. Targets are predictive — indirect calorimetry remains gold standard.
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <Label className="text-sm">Patient weight</Label>
            <span className="text-sm font-mono font-semibold text-foreground">{weight} kg</span>
          </div>
          <Slider
            value={[weight]}
            min={40}
            max={130}
            step={1}
            onValueChange={([v]) => setWeight(v)}
          />
        </div>

        <div>
          <Label className="text-sm mb-2 block">Phase of critical illness</Label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {(Object.keys(PHASE_COPY) as Phase[]).map((p) => {
              const active = phase === p;
              return (
                    <button
                  key={p}
                  type="button"
                  onClick={() => setPhase(p)}
                  className={`text-left rounded-lg border p-3 transition-colors ${
                    active
                      ? "border-icu/60 bg-icu/10"
                      : "border-border bg-background hover:bg-muted/40"
                  }`}
                >
                  <p className={`text-xs font-semibold ${active ? "text-icu" : "text-foreground"}`}>
                    {PHASE_COPY[p].title}
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                    {PHASE_COPY[p].subtitle}
                  </p>
                </button>
  );
            })}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <div className="rounded-lg border border-icu/30 bg-icu/5 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-icu">Energy target</p>
            <p className="text-2xl font-bold text-foreground mt-1">
              {targets.kcalLow === targets.kcalHigh
                ? `${targets.kcalLow}`
                : `${targets.kcalLow}–${targets.kcalHigh}`}{" "}
              <span className="text-sm font-normal text-muted-foreground">kcal/day</span>
            </p>
            <p className="text-[11px] text-muted-foreground mt-1">
              ≈ {Math.round((targets.kcalLow / weight) * 10) / 10}–
              {Math.round((targets.kcalHigh / weight) * 10) / 10} kcal/kg/day
            </p>
          </div>
          <div className="rounded-lg border border-clinical/30 bg-clinical/5 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-clinical">Protein target</p>
            <p className="text-2xl font-bold text-foreground mt-1">
              {targets.proteinLow}–{targets.proteinHigh}{" "}
              <span className="text-sm font-normal text-muted-foreground">g/day</span>
            </p>
            <p className="text-[11px] text-muted-foreground mt-1">
              ≈ {PHASE_COPY[phase].protein[0]}–{PHASE_COPY[phase].protein[1]} g/kg/day
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-muted/30 p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-1">
            Phase guidance
          </p>
          <p className="text-xs text-foreground leading-relaxed">{PHASE_COPY[phase].note}</p>
        </div>
      </div>
    </div>
  );
};

export default EnergyProteinTargetDiagram;
