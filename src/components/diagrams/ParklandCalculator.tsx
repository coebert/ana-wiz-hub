import { useMemo, useState } from "react";
import { Calculator, Droplets, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

/**
 * Interactive burn-fluid resuscitation calculator.
 *
 * Supports four formulae taught in UK/EU exams:
 *   - Parkland (4 mL × kg × %TBSA, Hartmann's, half in 8 h)
 *   - Modified Brooke / ABA consensus (2 mL × kg × %TBSA)
 *   - Galveston paediatric (5,000 mL/m² burn + 2,000 mL/m² BSA)
 *   - Electrical / rhabdo target (4 mL × kg × %TBSA, UO 1–2 mL/kg/h)
 *
 * Outputs total 24-h volume, first-8-h volume, infusion rates (mL/h and
 * drops/min using Hartmann's giving set 20 dpm), maintenance, and a
 * fluid-creep warning if cumulative volume exceeds the Ivy index
 * (>250 mL/kg in 24 h).
 */

type Formula = "parkland" | "brooke" | "galveston" | "electrical";

const FORMULA: Record<Formula, { label: string; factor: number; uo: string; note: string }> = {
  parkland: {
    label: "Parkland (4 mL/kg/%TBSA)",
    factor: 4,
    uo: "0.5 mL/kg/h adult · 1 mL/kg/h child",
    note: "Hartmann's. Half in first 8 h from time of burn, half in next 16 h.",
  },
  brooke: {
    label: "Modified Brooke / ABA (2 mL/kg/%TBSA)",
    factor: 2,
    uo: "0.5 mL/kg/h adult",
    note: "ABA consensus 2018 — start at 2 mL/kg/%TBSA and titrate up to avoid fluid creep.",
  },
  galveston: {
    label: "Galveston (paediatric, BSA-based)",
    factor: 0,
    uo: "1 mL/kg/h",
    note: "5,000 mL × m² burn + 2,000 mL × m² BSA total over 24 h. Half in 8 h.",
  },
  electrical: {
    label: "Electrical / rhabdomyolysis (4 mL/kg/%TBSA)",
    factor: 4,
    uo: "1–2 mL/kg/h until myoglobinuria clears",
    note: "Target higher UO; consider urinary alkalinisation. TBSA underestimates true tissue injury.",
  },
};

// Mosteller BSA (m²) = √(height × weight / 3600)
function bsa(weightKg: number, heightCm: number) {
  if (!weightKg || !heightCm) return 0;
  return Math.sqrt((heightCm * weightKg) / 3600);
}

export const ParklandCalculator = () => {
  const [formula, setFormula] = useState<Formula>("parkland");
  const [weight, setWeight] = useState(80);
  const [tbsa, setTbsa] = useState(40);
  const [height, setHeight] = useState(175);
  const [hoursSinceBurn, setHoursSinceBurn] = useState(0);

  const result = useMemo(() => {
    const m2 = bsa(weight, height);
    let total24 = 0;
    if (formula === "galveston") {
      // 5000 × m² burn + 2000 × m² BSA
      total24 = 5000 * (m2 * (tbsa / 100)) + 2000 * m2;
    } else {
      total24 = FORMULA[formula].factor * weight * tbsa;
    }
    const first8 = total24 / 2;
    const remaining16 = total24 / 2;

    // Adjust for hours already elapsed since burn
    const remainingFirst8 = Math.max(0, 8 - hoursSinceBurn);
    const first8Rate = remainingFirst8 > 0 ? (first8 - (first8 * Math.min(hoursSinceBurn, 8)) / 8) / remainingFirst8 : 0;
    const next16Rate = remaining16 / 16;

    // Maintenance: 4-2-1 for adult ≈ 40 + 20 + (kg-20) = 100 + kg-20 mL/h, capped
    const maintRate = weight <= 10 ? 4 * weight : weight <= 20 ? 40 + 2 * (weight - 10) : 60 + (weight - 20);

    // Urine output target
    const uoTarget = formula === "electrical" ? 1.5 * weight : formula === "galveston" ? 1 * weight : 0.5 * weight;

    // Ivy index warning (>250 mL/kg in 24 h = fluid creep risk)
    const ivyMl = 250 * weight;
    const creepRisk = total24 > ivyMl;

    // Drops/min using Hartmann's standard adult giving set (20 dpm = 1 mL)
    const dropsFirst8 = (first8Rate * 20) / 60;

    return { total24, first8, remaining16, first8Rate, next16Rate, maintRate, uoTarget, creepRisk, ivyMl, dropsFirst8, m2 };
  }, [formula, weight, tbsa, height, hoursSinceBurn]);

  return (
        <figure className="my-6 rounded-xl border border-border bg-card p-4 md:p-5">
      <figcaption className="mb-4">
        <h3 className="flex items-center gap-2 text-base font-semibold text-foreground">
          <Calculator className="h-4 w-4 text-primary" /> Burn fluid resuscitation calculator
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Choose a formula, enter patient parameters, and read the prescription. The patient — not the formula — is the
          monitor: titrate to urine output and end-organ markers.
        </p>
      </figcaption>

      {/* Formula chips */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {(Object.keys(FORMULA) as Formula[]).map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFormula(f)}
            className={cn(
              "rounded-full border px-3 py-1 text-[11px] font-medium transition-colors",
              formula === f
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-muted-foreground hover:bg-muted",
            )}
          >
            {FORMULA[f].label}
          </button>
        ))}
      </div>

      {/* Inputs */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 mb-4">
        <div>
          <Label htmlFor="bw" className="text-xs">Weight (kg)</Label>
          <Input id="bw" type="number" min={1} max={250} value={weight}
            onChange={(e) => setWeight(Math.max(1, Number(e.target.value) || 0))} className="mt-1" />
        </div>
        <div>
          <Label htmlFor="tbsa" className="text-xs">%TBSA burned (exclude erythema)</Label>
          <Input id="tbsa" type="number" min={0} max={100} value={tbsa}
            onChange={(e) => setTbsa(Math.max(0, Math.min(100, Number(e.target.value) || 0)))} className="mt-1" />
        </div>
        {formula === "galveston" && (
          <div>
            <Label htmlFor="ht" className="text-xs">Height (cm)</Label>
            <Input id="ht" type="number" min={30} max={220} value={height}
              onChange={(e) => setHeight(Math.max(1, Number(e.target.value) || 0))} className="mt-1" />
          </div>
        )}
        <div>
          <Label htmlFor="elapsed" className="text-xs">Hours since burn</Label>
          <Input id="elapsed" type="number" min={0} max={24} value={hoursSinceBurn}
            onChange={(e) => setHoursSinceBurn(Math.max(0, Math.min(24, Number(e.target.value) || 0)))} className="mt-1" />
        </div>
      </div>

      {/* Outputs */}
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <OutputCard
          icon={<Droplets className="h-4 w-4" />}
          label="Total 24 h volume"
          value={`${Math.round(result.total24).toLocaleString()} mL`}
          sub={formula === "galveston" ? `BSA ${result.m2.toFixed(2)} m²` : `${FORMULA[formula].factor} × ${weight} × ${tbsa}`}
        />
        <OutputCard
          icon={<Clock className="h-4 w-4" />}
          label="First 8 h (from burn)"
          value={`${Math.round(result.first8).toLocaleString()} mL`}
          sub={`Rate now ≈ ${Math.round(result.first8Rate).toLocaleString()} mL/h${result.dropsFirst8 > 0 ? ` (${Math.round(result.dropsFirst8)} dpm)` : ""}`}
        />
        <OutputCard
          icon={<Clock className="h-4 w-4" />}
          label="Next 16 h"
          value={`${Math.round(result.remaining16).toLocaleString()} mL`}
          sub={`Rate ${Math.round(result.next16Rate).toLocaleString()} mL/h`}
        />
        <OutputCard
          icon={<Droplets className="h-4 w-4" />}
          label="Urine-output target"
          value={`${Math.round(result.uoTarget)} mL/h`}
          sub={FORMULA[formula].uo}
        />
      </div>

      <div className="mt-3 rounded-md border border-border bg-muted/30 p-3 text-xs text-muted-foreground">
        <p><span className="font-semibold text-foreground">Maintenance:</span> add ~ {Math.round(result.maintRate)} mL/h
          using 4-2-1 (separate from resuscitation fluid; consider 5 % glucose for paediatrics).</p>
        <p className="mt-1"><span className="font-semibold text-foreground">Notes:</span> {FORMULA[formula].note}</p>
      </div>

      {result.creepRisk && (
        <div className="mt-3 flex items-start gap-2 rounded-md border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            <span className="font-semibold">Fluid creep risk:</span> projected 24 h volume
            ({Math.round(result.total24).toLocaleString()} mL) exceeds the Ivy index of 250 mL/kg
            ({result.ivyMl.toLocaleString()} mL). Watch for abdominal compartment syndrome, ARDS, ocular and limb compartment
            syndromes; consider early colloid (5 % albumin from 12–24 h) and re-evaluate %TBSA.
          </p>
        </div>
      )}

      {/* Worked examples */}
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <ExampleButton
          title="80 kg adult, 40 % TBSA flame"
          onClick={() => { setFormula("parkland"); setWeight(80); setTbsa(40); setHoursSinceBurn(0); }}
        >
          Parkland 4 × 80 × 40 = <strong>12,800 mL</strong> in 24 h. 6,400 mL in first 8 h ≈ <strong>800 mL/h</strong>;
          remainder 400 mL/h. Titrate to UO 40 mL/h.
        </ExampleButton>
        <ExampleButton
          title="20 kg child, 25 % TBSA scald"
          onClick={() => { setFormula("parkland"); setWeight(20); setTbsa(25); setHoursSinceBurn(0); }}
        >
          Parkland 4 × 20 × 25 = <strong>2,000 mL</strong> + maintenance ~ 60 mL/h (4-2-1).
          Target UO 1 mL/kg/h = 20 mL/h. Use Lund–Browder, not rule of nines.
        </ExampleButton>
        <ExampleButton
          title="High-voltage electrical, 70 kg, 15 % visible TBSA"
          onClick={() => { setFormula("electrical"); setWeight(70); setTbsa(15); setHoursSinceBurn(0); }}
        >
          Visible TBSA underestimates. Start at 4 × 70 × 15 = <strong>4,200 mL</strong> but target UO
          <strong> 1–2 mL/kg/h </strong>(70–140 mL/h) until myoglobinuria clears; consider bicarbonate.
        </ExampleButton>
        <ExampleButton
          title="100 kg adult, 60 % TBSA — fluid-creep alert"
          onClick={() => { setFormula("parkland"); setWeight(100); setTbsa(60); setHoursSinceBurn(0); }}
        >
          Parkland 4 × 100 × 60 = <strong>24,000 mL</strong> — comfortably above the 250 mL/kg Ivy index.
          Switch to modified Brooke (2 mL/kg/%TBSA) or add albumin from 12 h to limit creep.
        </ExampleButton>
      </div>
    </figure>
  );
};

const OutputCard = ({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub: string }) => (
  <div className="rounded-lg border border-border bg-background p-3">
    <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-muted-foreground">
      {icon} {label}
    </p>
    <p className="mt-1 text-lg font-semibold text-foreground">{value}</p>
    <p className="text-[11px] text-muted-foreground">{sub}</p>
  </div>
);

const ExampleButton = ({ title, children, onClick }: { title: string; children: React.ReactNode; onClick: () => void }) => (
  <div className="rounded-lg border border-border bg-background/60 p-3">
    <div className="flex items-start justify-between gap-2">
      <p className="text-xs font-semibold text-foreground">{title}</p>
      <Button size="sm" variant="outline" className="h-6 px-2 text-[10px]" onClick={onClick}>Load</Button>
    </div>
    <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{children}</p>
  </div>
);

export default ParklandCalculator;
