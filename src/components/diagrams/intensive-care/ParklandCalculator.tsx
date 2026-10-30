import { useState } from "react";
import { Calculator, Droplets, Clock, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { DiagramFigure } from "../_shared/DiagramFigure";
import {
  type BurnFormula,
  burnFirstDayPlan,
  burnFormula24h,
  ivyIndex,
  burnSourceScope,
  mostellerBsa,
  urineTargetMlPerHour,
} from "@/lib/calculators/t1-calculators";

/**
 * Burn-fluid formula estimator. Each formula is a named estimate, timed from injury,
 * and the patient's urine output and perfusion — not the formula — guide the rate.
 * No current or catch-up rate is generated.
 */

const ACI = "https://aci.health.nsw.gov.au/networks/burn-injury/resources/patient-management/fluid-resuscitation";
const ABA = "https://doi.org/10.1093/jbcr/irad125";

const FORMULA: Record<BurnFormula, { label: string; note: React.ReactNode }> = {
  parkland: { label: "Parkland (4 mL/kg/%TBSA)", note: "Classic Parkland teaching arithmetic; half in the first 8 h from injury, half over the next 16 h." },
  "nsw-modified-parkland": {
    label: "NSW ACI modified Parkland (3 mL/kg/%TBSA)",
    note: <>NSW ACI (adults >20% TBSA, children >10% TBSA): Hartmann's, half in first 8 h from injury; infusion rate is guided by urine output, not by formula. In children, maintenance fluid is given in addition. <a className="underline" href={ACI} target="_blank" rel="noopener noreferrer">Source</a></>,
  },
  "aba-adult": {
    label: "ABA 2024 adult start (2 mL/kg/%TBSA)",
    note: <>ABA guideline (J Burn Care Res 2024, published online 2023; adults, burns ≥20% TBSA): a lower starting estimate, titrated to response. Adults only. <a className="underline" href={ABA} target="_blank" rel="noopener noreferrer">Source</a></>,
  },
  galveston: {
    label: "Galveston (paediatric, BSA-based)",
    note: "5,000 mL/m² burned + 2,000 mL/m² total BSA over 24 h. The 2,000 mL/m² term is the maintenance component — do not add a second maintenance allowance.",
  },
};

const num = (t: string) => (t.trim() === "" ? null : Number(t));

export const ParklandCalculator = () => {
  const [formula, setFormula] = useState<BurnFormula>("parkland");
  const [population, setPopulation] = useState<"adult" | "child">("adult");
  const [weight, setWeight] = useState("80");
  const [tbsa, setTbsa] = useState("40");
  const [height, setHeight] = useState("175");
  const [hours, setHours] = useState("");
  const [given, setGiven] = useState("");
  const [otherFluids, setOtherFluids] = useState("");

  const w = Number(weight);
  const res = burnFormula24h(formula, w, Number(tbsa), Number(height));
  const plan = res ? burnFirstDayPlan(res.totalMl, num(hours), num(given)) : null;
  const otherRaw = num(otherFluids);
  const otherValid = otherRaw !== null && Number.isFinite(otherRaw) && otherRaw >= 0;
  const ivy = res && otherValid ? ivyIndex(res.totalMl + otherRaw!, w) : null;
  const uo = urineTargetMlPerHour(population, w);
  const m2 = mostellerBsa(w, Number(height));
  const scopeReason = burnSourceScope(formula, population, Number(tbsa));
  const popMismatch = scopeReason !== null;

  const load = (f: BurnFormula, p: "adult" | "child", kg: number, pct: number, cm?: number) => {
    setFormula(f); setPopulation(p); setWeight(String(kg)); setTbsa(String(pct)); if (cm) setHeight(String(cm));
    setHours(""); setGiven(""); setOtherFluids("");
  };

  return (
    <DiagramFigure
      id="parkland-calculator"
      title="Parkland"
      description="Burn-fluid formula estimator: named Parkland, NSW modified Parkland, ABA adult and Galveston estimates within each source's scope, remaining formula volumes without rate instructions, and an Ivy-index check once other fluids are accounted for."
    >
      <figure className="my-6 rounded-xl border border-border bg-card p-4 md:p-5">
        <figcaption className="mb-4">
          <h3 className="flex items-center gap-2 text-base font-semibold text-foreground">
            <Calculator className="h-4 w-4 text-primary" /> Burn fluid formula estimator
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Formulae give a starting estimate, not a prescription. Follow your burns-service protocol; reassess urine output and
            perfusion repeatedly rather than accelerating fluid to "catch up" with a formula.
          </p>
        </figcaption>

        <div className="mb-3 flex flex-wrap gap-1.5">
          {(Object.keys(FORMULA) as BurnFormula[]).map((f) => (
            <button key={f} type="button" onClick={() => setFormula(f)} aria-pressed={formula === f}
              className={cn("rounded-full border px-3 py-1 text-[11px] font-medium transition-colors",
                formula === f ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-muted-foreground hover:bg-muted")}>
              {FORMULA[f].label}
            </button>
          ))}
        </div>
        <div className="mb-4 flex gap-1.5 text-[11px]">
          {(["adult", "child"] as const).map((p) => (
            <button key={p} type="button" onClick={() => setPopulation(p)} aria-pressed={population === p}
              className={cn("rounded border px-3 py-1", population === p ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground")}>
              {p === "adult" ? "Adult" : "Child"}
            </button>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-4">
          <div><Label htmlFor="bw" className="text-xs">Weight (kg)</Label><Input id="bw" type="number" min={0} value={weight} onChange={(e) => setWeight(e.target.value)} className="mt-1" /></div>
          <div><Label htmlFor="tbsa" className="text-xs">%TBSA burned (exclude erythema)</Label><Input id="tbsa" type="number" min={0} max={100} value={tbsa} onChange={(e) => setTbsa(e.target.value)} className="mt-1" /></div>
          {formula === "galveston" && (
            <div><Label htmlFor="ht" className="text-xs">Height (cm)</Label><Input id="ht" type="number" min={30} max={220} value={height} onChange={(e) => setHeight(e.target.value)} className="mt-1" /></div>
          )}
          <div><Label htmlFor="elapsed" className="text-xs">Hours since injury (optional)</Label><Input id="elapsed" type="number" min={0} value={hours} onChange={(e) => setHours(e.target.value)} className="mt-1" /></div>
          <div><Label htmlFor="given" className="text-xs">Resuscitation fluid given since injury (mL)</Label><Input id="given" type="number" min={0} value={given} onChange={(e) => setGiven(e.target.value)} className="mt-1" /></div>
          <div><Label htmlFor="other" className="text-xs">Other prescribed fluids over 24 h (mL, e.g. maintenance)</Label><Input id="other" type="number" min={0} value={otherFluids} onChange={(e) => setOtherFluids(e.target.value)} className="mt-1" /></div>
        </div>

        {popMismatch && (
          <p role="status" className="mb-3 rounded-md border border-destructive/40 bg-destructive/10 p-2 text-xs text-destructive">
            {scopeReason} No source-specific estimate is shown outside its stated scope.
          </p>
        )}

        {!res || popMismatch ? (
          <p role="status" className="text-sm text-muted-foreground">
            {popMismatch ? "No estimate shown outside the source's scope." : "Enter weight above 0, %TBSA between 0 and 100" + (formula === "galveston" ? " and height." : ".")}
          </p>
        ) : (
          <>
            {plan?.status === "invalid" ? (
              <p role="status" className="text-sm text-destructive">{plan.reason} No timed volumes are shown.</p>
            ) : plan?.status === "expired" ? (
              <div role="status" className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive">
                ≥24 h since injury: the first-day formula window has expired. No current first-day volumes or rates are shown. Fluid now depends on
                urine output, perfusion and burns-service reassessment. (Historical/theoretical day-1 total for teaching: {Math.round(res.totalMl).toLocaleString()} mL.)
              </div>
            ) : (
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
                <OutputCard icon={<Droplets className="h-4 w-4" />} label="24 h formula estimate" value={`${Math.round(res.totalMl).toLocaleString()} mL`}
                  sub={formula === "galveston" ? `BSA ${m2?.toFixed(2)} m² · includes maintenance` : "Resuscitation fluid only"} />
                {plan?.status === "first-8h-ended" ? (
                  <OutputCard icon={<Clock className="h-4 w-4" />} label="First 8 h window" value="Ended"
                    sub={plan.remainingDayMl === null ? `${plan.hoursLeftInDay} h left of day 1; enter fluid given for remaining formula volume` : `Remaining formula volume to 24 h: ${Math.round(plan.remainingDayMl).toLocaleString()} mL over ${plan.hoursLeftInDay} h (not a rate instruction)`} />
                ) : (
                  <OutputCard icon={<Clock className="h-4 w-4" />} label="First 8 h from injury" value={`${Math.round(res.totalMl / 2).toLocaleString()} mL`}
                    sub={plan?.status === "within-first-8h"
                      ? plan.remainingFirst8Ml === null ? `${plan.hoursLeftInFirst8} h left; enter fluid given for remaining volume` : `Remaining ${Math.round(plan.remainingFirst8Ml).toLocaleString()} mL of the formula volume, ${plan.hoursLeftInFirst8} h left (not a rate instruction)`
                      : "Formula estimate timed from injury"} />
                )}
                <OutputCard icon={<Clock className="h-4 w-4" />} label="Next 16 h" value={`${Math.round(res.totalMl / 2).toLocaleString()} mL`} sub="Formula estimate for hours 8–24" />
                <OutputCard icon={<Droplets className="h-4 w-4" />} label="Urine-output target" value={uo === null ? "—" : `${Math.round(uo)} mL/h`}
                  sub={population === "child" ? "1 mL/kg/h (child)" : "0.5 mL/kg/h (adult)"} />
              </div>
            )}
            <p className="mt-2 text-[11px] text-muted-foreground">
              No current or catch-up rate is calculated: elapsed time and fluid already given do not prescribe an individual's rate. Titrate to urine output and perfusion with burns-service reassessment.
            </p>

            <div className="mt-3 rounded-md border border-border bg-muted/30 p-3 text-xs text-muted-foreground">
              <p><span className="font-semibold text-foreground">Maintenance:</span>{" "}
                {res.includesMaintenance ? "already included in the Galveston total — do not add a second allowance." :
                  population === "child" ? "children also need maintenance fluid prescribed separately (NSW ACI); enter it above so total intake is counted." :
                  "prescribe any maintenance or other fluids separately and enter them above."}</p>
              <p className="mt-1"><span className="font-semibold text-foreground">Notes:</span> {FORMULA[formula].note}</p>
              <p className="mt-1">Electrical injury, inhalation injury, haemochromogenuria and delayed resuscitation often need more fluid and higher urine-output targets — follow the specific burns-service protocol.</p>
            </div>

            {otherRaw === null ? (
              <p className="mt-3 rounded-md border border-border p-3 text-xs text-muted-foreground" data-testid="ivy">
                <span className="font-semibold text-foreground">Formula subtotal only:</span> {Math.round(res.totalMl / w)} mL/kg. Other fluids are unknown — enter them (or 0) before any total projected intake or Ivy index (250 mL/kg) comparison is made.
              </p>
            ) : !otherValid ? (
              <p role="status" className="mt-3 text-xs text-destructive">Other fluids must be a number ≥0 mL.</p>
            ) : ivy && (
              <div data-testid="ivy" className={cn("mt-3 flex items-start gap-2 rounded-md border p-3 text-xs", ivy.exceeds ? "border-destructive/40 bg-destructive/10 text-destructive" : "border-border text-muted-foreground")}>
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <p>
                  <span className="font-semibold">Ivy index check:</span> projected 24 h intake {Math.round(res.totalMl + otherRaw!).toLocaleString()} mL
                  = {Math.round(ivy.mlPerKg)} mL/kg ({ivy.exceeds ? "above" : "not above"} 250 mL/kg). {ivy.exceeds ? "Higher risk of abdominal compartment syndrome — review the fluid strategy with the burns team." : "Actual intake often exceeds the estimate; recalculate with real volumes."}
                </p>
              </div>
            )}
          </>
        )}

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <ExampleButton title="80 kg adult, 40% TBSA flame (Parkland)" onClick={() => load("parkland", "adult", 80, 40)}>
            4 × 80 × 40 = <strong>12,800 mL</strong> over 24 h; 6,400 mL in the first 8 h from injury as teaching arithmetic; titrate to response. Urine target 0.5 mL/kg/h = 40 mL/h.
          </ExampleButton>
          <ExampleButton title="20 kg child, 25% TBSA scald (Parkland, child)" onClick={() => load("parkland", "child", 20, 25)}>
            4 × 20 × 25 = <strong>2,000 mL</strong> resuscitation fluid, plus separately prescribed maintenance. Urine target 1 mL/kg/h = <strong>20 mL/h</strong>. Use Lund–Browder.
          </ExampleButton>
          <ExampleButton title="20 kg, 110 cm child, 25% TBSA (Galveston)" onClick={() => load("galveston", "child", 20, 25, 110)}>
            BSA ≈ 0.78 m²: 5,000 × 0.78 × 0.25 + 2,000 × 0.78 ≈ <strong>2,540 mL</strong>, maintenance already included.
          </ExampleButton>
          <ExampleButton title="100 kg adult, 60% TBSA — Ivy index" onClick={() => load("parkland", "adult", 100, 60)}>
            4 × 100 × 60 = <strong>24,000 mL</strong> = 240 mL/kg formula subtotal; enter other fluids to compare total intake with 250 mL/kg.
          </ExampleButton>
        </div>
      </figure>
    </DiagramFigure>
  );
};

const OutputCard = ({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub: string }) => (
  <div className="rounded-lg border border-border bg-background p-3">
    <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-muted-foreground">{icon} {label}</p>
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
