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
  mostellerBsa,
  urineTargetMlPerHour,
} from "@/lib/calculators/t1-calculators";

/**
 * Burn-fluid formula estimator. Each formula is a named estimate, timed from injury,
 * and the patient's urine output and perfusion — not the formula — guide the rate.
 * A current rate is shown only when fluid actually given since injury is entered.
 */

const ACI = "https://aci.health.nsw.gov.au/networks/burn-injury/resources/patient-management/fluid-resuscitation";
const ABA = "https://doi.org/10.1093/jbcr/irad125";

const FORMULA: Record<BurnFormula, { label: string; note: React.ReactNode }> = {
  parkland: { label: "Parkland (4 mL/kg/%TBSA)", note: "Classic Parkland estimate; half in the first 8 h from injury, half over the next 16 h." },
  "nsw-modified-parkland": {
    label: "NSW ACI modified Parkland (3 mL/kg/%TBSA)",
    note: <>NSW ACI: Hartmann's, half in first 8 h from injury; infusion rate is guided by urine output, not by formula. In children, maintenance fluid is given in addition. <a className="underline" href={ACI} target="_blank" rel="noopener noreferrer">Source</a></>,
  },
  "aba-adult": {
    label: "ABA 2023 adult start (2 mL/kg/%TBSA)",
    note: <>ABA 2023 adult guideline (burns ≥20% TBSA): a lower starting estimate, titrated to response. Adults only. <a className="underline" href={ABA} target="_blank" rel="noopener noreferrer">Source</a></>,
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
  const other = num(otherFluids) ?? 0;
  const ivy = res && Number.isFinite(other) && other >= 0 ? ivyIndex(res.totalMl + other, w) : null;
  const uo = urineTargetMlPerHour(population, w);
  const m2 = mostellerBsa(w, Number(height));
  const popMismatch = (formula === "aba-adult" && population === "child") || (formula === "galveston" && population === "adult");

  const load = (f: BurnFormula, p: "adult" | "child", kg: number, pct: number, cm?: number) => {
    setFormula(f); setPopulation(p); setWeight(String(kg)); setTbsa(String(pct)); if (cm) setHeight(String(cm));
    setHours(""); setGiven(""); setOtherFluids("");
  };

  return (
    <DiagramFigure
      id="parkland-calculator"
      title="Parkland"
      description="Burn-fluid formula estimator: named Parkland, NSW modified Parkland, ABA adult and Galveston estimates, a rate only when fluid already given is entered, and an Ivy-index check on total projected intake."
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
            {formula === "aba-adult" ? "The ABA 2023 guideline is for adults; select Adult or another formula." : "Galveston is a paediatric formula; select Child."}
          </p>
        )}

        {!res || popMismatch ? (
          <p role="status" className="text-sm text-muted-foreground">
            {popMismatch ? "No estimate shown for this formula/population combination." : "Enter weight above 0, %TBSA between 0 and 100" + (formula === "galveston" ? " and height." : ".")}
          </p>
        ) : (
          <>
            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              <OutputCard icon={<Droplets className="h-4 w-4" />} label="24 h formula estimate" value={`${Math.round(res.totalMl).toLocaleString()} mL`}
                sub={formula === "galveston" ? `BSA ${m2?.toFixed(2)} m² · includes maintenance` : "Resuscitation fluid only"} />
              <OutputCard icon={<Clock className="h-4 w-4" />} label="First 8 h from injury" value={`${Math.round(res.totalMl / 2).toLocaleString()} mL`}
                sub={plan?.status === "rate" ? `Remaining ${Math.round(plan.remainingFirst8Ml).toLocaleString()} mL over ${plan.hoursLeftInFirst8} h ≈ ${Math.round(plan.mlPerHour)} mL/h — reassess against urine output` :
                  plan?.status === "estimate-only" ? "Enter hours AND fluid given for a remaining-volume rate" :
                  plan?.status === "first-8h-ended" ? "First-8 h window has ended" : plan?.status === "window-ended" ? "First-day window has ended" : "Check hours/fluid inputs"} />
              <OutputCard icon={<Clock className="h-4 w-4" />} label="Next 16 h" value={plan?.status === "window-ended" ? "—" : `${Math.round(res.totalMl / 2).toLocaleString()} mL`}
                sub={plan?.status === "window-ended" ? "Beyond 24 h — no first-day output" : "Formula estimate for hours 8–24"} />
              <OutputCard icon={<Droplets className="h-4 w-4" />} label="Urine-output target" value={uo === null ? "—" : `${Math.round(uo)} mL/h`}
                sub={population === "child" ? "1 mL/kg/h (child)" : "0.5 mL/kg/h (adult)"} />
            </div>

            <div className="mt-3 rounded-md border border-border bg-muted/30 p-3 text-xs text-muted-foreground">
              <p><span className="font-semibold text-foreground">Maintenance:</span>{" "}
                {res.includesMaintenance ? "already included in the Galveston total — do not add a second allowance." :
                  population === "child" ? "children also need maintenance fluid prescribed separately (NSW ACI); enter it above so total intake is counted." :
                  "prescribe any maintenance or other fluids separately and enter them above."}</p>
              <p className="mt-1"><span className="font-semibold text-foreground">Notes:</span> {FORMULA[formula].note}</p>
              <p className="mt-1">Electrical injury, inhalation injury, haemochromogenuria and delayed resuscitation often need more fluid and higher urine-output targets — follow the specific burns-service protocol.</p>
            </div>

            {ivy && (
              <div className={cn("mt-3 flex items-start gap-2 rounded-md border p-3 text-xs", ivy.exceeds ? "border-destructive/40 bg-destructive/10 text-destructive" : "border-border text-muted-foreground")}>
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <p>
                  <span className="font-semibold">Ivy index check:</span> projected 24 h intake {Math.round(res.totalMl + other).toLocaleString()} mL
                  = {Math.round(ivy.mlPerKg)} mL/kg ({ivy.exceeds ? "above" : "not above"} 250 mL/kg). {ivy.exceeds ? "Higher risk of abdominal compartment syndrome — review the fluid strategy with the burns team." : "Actual intake often exceeds the estimate; recalculate with real volumes."}
                </p>
              </div>
            )}
          </>
        )}

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <ExampleButton title="80 kg adult, 40% TBSA flame (Parkland)" onClick={() => load("parkland", "adult", 80, 40)}>
            4 × 80 × 40 = <strong>12,800 mL</strong> over 24 h; 6,400 mL in the first 8 h from injury (≈800 mL/h only if started at injury with nothing given). Urine target 0.5 mL/kg/h = 40 mL/h.
          </ExampleButton>
          <ExampleButton title="20 kg child, 25% TBSA scald (Parkland, child)" onClick={() => load("parkland", "child", 20, 25)}>
            4 × 20 × 25 = <strong>2,000 mL</strong> resuscitation fluid, plus separately prescribed maintenance. Urine target 1 mL/kg/h = <strong>20 mL/h</strong>. Use Lund–Browder.
          </ExampleButton>
          <ExampleButton title="20 kg, 110 cm child, 25% TBSA (Galveston)" onClick={() => load("galveston", "child", 20, 25, 110)}>
            BSA ≈ 0.78 m²: 5,000 × 0.78 × 0.25 + 2,000 × 0.78 ≈ <strong>2,540 mL</strong>, maintenance already included.
          </ExampleButton>
          <ExampleButton title="100 kg adult, 60% TBSA — Ivy index" onClick={() => load("parkland", "adult", 100, 60)}>
            4 × 100 × 60 = <strong>24,000 mL</strong> = 240 mL/kg — just <em>below</em> 250 mL/kg before any maintenance or other fluids; adding these can cross it.
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
