import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, Calculator, Syringe, AlertTriangle } from "lucide-react";
import { icuInfusionGroups, type Infusion } from "@/data/icuInfusions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/** Flattened drug option list with group context. */
const allInfusions: (Infusion & { group: string })[] = icuInfusionGroups.flatMap((g) =>
  g.infusions.map((i) => ({ ...i, group: g.title })),
);

/**
 * Convert a dose in the drug's native unit to micrograms/kg/hour.
 * Returns null when a meaningful weight-based conversion is not possible
 * (fixed-unit drugs such as vasopressin, or a missing weight).
 */
function toMcgKgHr(infusion: Infusion, dose: number, weightKg: number): number | null {
  switch (infusion.unit) {
    case "micrograms/kg/min":
      return dose * 60;
    case "micrograms/kg/h":
      return dose;
    case "micrograms/min":
      return weightKg > 0 ? (dose * 60) / weightKg : null;
    case "mg/kg/h":
      return dose * 1000;
    case "units/min":
    case "units/h":
    case "units/kg/h":
      return null; // unit-based drugs don't convert to micrograms
  }
}

/**
 * Micrograms delivered per hour for the entered dose — used to derive the
 * mL/hr pump rate. For unit-based drugs this returns units per hour instead.
 */
function amountPerHour(infusion: Infusion, dose: number, weightKg: number): number {
  switch (infusion.unit) {
    case "micrograms/kg/min":
      return dose * 60 * weightKg;
    case "micrograms/kg/h":
      return dose * weightKg;
    case "micrograms/min":
      return dose * 60;
    case "mg/kg/h":
      return dose * 1000 * weightKg;
    case "units/min":
      return dose * 60;
    case "units/h":
      return dose;
    case "units/kg/h":
      return dose * weightKg;
  }
}

function fmt(n: number, dp = 2): string {
  return n.toLocaleString("en-GB", { maximumFractionDigits: dp });
}

/** Match a ?drug= param (exact name or slug-ish fragment) to an infusion. */
function findInfusionParam(value: string | null) {
  if (!value) return null;
  const needle = value.toLowerCase().replace(/[^a-z]/g, "");
  return (
    allInfusions.find((i) => i.drug.toLowerCase() === value.toLowerCase()) ??
    allInfusions.find((i) => i.drug.toLowerCase().replace(/[^a-z]/g, "").startsWith(needle)) ??
    null
  );
}

const IcuDrugCalculator = () => {
  const [searchParams] = useSearchParams();
  const preset = findInfusionParam(searchParams.get("drug")) ?? allInfusions[0];
  const presetDose = searchParams.get("dose");
  const presetWeight = searchParams.get("weight");

  const [drugKey, setDrugKey] = useState(preset.drug);
  const [weight, setWeight] = useState(presetWeight && parseFloat(presetWeight) > 0 ? presetWeight : "70");
  const [dose, setDose] = useState(
    presetDose && parseFloat(presetDose) > 0 ? presetDose : String(preset.startDose),
  );
  const [route, setRoute] = useState("IV infusion (central preferred)");
  const [concentration, setConcentration] = useState(String(preset.concentrationPerMl));

  const infusion = allInfusions.find((i) => i.drug === drugKey) ?? allInfusions[0];

  const onDrugChange = (drug: string) => {
    const next = allInfusions.find((i) => i.drug === drug) ?? allInfusions[0];
    setDrugKey(next.drug);
    setDose(String(next.startDose));
    setConcentration(String(next.concentrationPerMl));
  };

  const result = useMemo(() => {
    const w = parseFloat(weight);
    const d = parseFloat(dose);
    const c = parseFloat(concentration);
    if (!isFinite(d) || d <= 0 || !isFinite(c) || c <= 0) return null;
    const weightValid = isFinite(w) && w > 0;
    if (infusion.perKg && !weightValid) return null;

    const wkg = weightValid ? w : 70; // fallback for non-weight-based display only
    const perHr = amountPerHour(infusion, d, wkg); // micrograms/h or units/h
    const mlPerHr = perHr / c;
    const mlPerDay = mlPerHr * 24;
    const mcgKgHr = toMcgKgHr(infusion, d, wkg);
    const outOfRange = d < infusion.minDose || d > infusion.maxDose;
    return { mlPerHr, mlPerDay, mcgKgHr, outOfRange };
  }, [infusion, weight, dose, concentration]);

  const amountLabel = infusion.unit.startsWith("units") ? "units" : "micrograms";

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>ICU Drug Calculator — Dose, Rate and Volume | AnaesthesiaCore</title>
        <meta
          name="description"
          content="ICU medication calculator: enter drug, dose, patient weight and route to get the infusion rate in mcg/kg/hr and mL/hr, plus the total volume per day."
        />
        <link rel="canonical" href="https://anaesthesiacore.app/intensive-care/calculator" />
      </Helmet>

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <Link
          to="/intensive-care"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-icu hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Intensive Care
        </Link>

        <header className="mb-8">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-icu/10 text-icu">
              <Calculator className="h-5 w-5" />
            </span>
            <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
              ICU drug calculator
            </h1>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Enter a drug, dose, patient weight and route to calculate the infusion rate in
            micrograms/kg/hour and mL/hour, plus the total volume given per day. Concentrations
            pre-fill from the{" "}
            <Link to="/intensive-care/infusions" className="font-medium text-icu hover:underline">
              standard infusion recipes
            </Link>{" "}
            — adjust them if your unit draws the drug up differently.
          </p>
        </header>

        {/* Inputs */}
        <section className="rounded-xl border border-border bg-card p-4 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="calc-drug">Drug</Label>
              <Select value={drugKey} onValueChange={onDrugChange}>
                <SelectTrigger id="calc-drug" className="mt-1.5">
                  <SelectValue placeholder="Select a drug" />
                </SelectTrigger>
                <SelectContent>
                  {allInfusions.map((i) => (
                    <SelectItem key={i.drug} value={i.drug}>
                      {i.drug} — {i.group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="calc-dose">
                Dose ({infusion.unit})
              </Label>
              <Input
                id="calc-dose"
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={dose}
                onChange={(e) => setDose(e.target.value)}
                className="mt-1.5"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Usual range {infusion.minDose}–{infusion.maxDose} {infusion.unit}
              </p>
            </div>

            <div>
              <Label htmlFor="calc-weight">Patient weight (kg)</Label>
              <Input
                id="calc-weight"
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="mt-1.5"
              />
              {!infusion.perKg && (
                <p className="mt-1 text-xs text-muted-foreground">
                  Not weight-based — weight only affects the mcg/kg/hr display.
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="calc-route">Route</Label>
              <Select value={route} onValueChange={setRoute}>
                <SelectTrigger id="calc-route" className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IV infusion (central preferred)">
                    IV infusion — central preferred
                  </SelectItem>
                  <SelectItem value="IV infusion (peripheral)">IV infusion — peripheral</SelectItem>
                  <SelectItem value="IV infusion (central only)">IV infusion — central only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="calc-conc">
                Concentration ({amountLabel}/mL)
              </Label>
              <Input
                id="calc-conc"
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={concentration}
                onChange={(e) => setConcentration(e.target.value)}
                className="mt-1.5"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Standard recipe: {infusion.drawUp} ({infusion.concentrationLabel})
              </p>
            </div>
          </div>
        </section>

        {/* Results */}
        <section aria-live="polite" className="mt-6 rounded-xl border border-icu/30 bg-icu/5 p-4 sm:p-6">
          <div className="mb-4 flex items-center gap-2 text-icu">
            <Syringe className="h-5 w-5" />
            <h2 className="font-heading text-lg font-semibold">
              {infusion.drug} — calculated rate
            </h2>
          </div>

          {result ? (
            <>
              <dl className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border border-border bg-background p-4">
                  <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Dose (weight-based)
                  </dt>
                  <dd className="mt-1 text-2xl font-bold text-foreground">
                    {result.mcgKgHr !== null ? `${fmt(result.mcgKgHr, 3)} mcg/kg/hr` : "—"}
                  </dd>
                  {result.mcgKgHr === null && (
                    <dd className="mt-1 text-xs text-muted-foreground">
                      Unit-based drug — dosed in {infusion.unit}, not micrograms.
                    </dd>
                  )}
                </div>
                <div className="rounded-lg border border-border bg-background p-4">
                  <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Pump rate
                  </dt>
                  <dd className="mt-1 text-2xl font-bold text-foreground">
                    {fmt(result.mlPerHr)} mL/hr
                  </dd>
                </div>
                <div className="rounded-lg border border-border bg-background p-4">
                  <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Volume per day
                  </dt>
                  <dd className="mt-1 text-2xl font-bold text-foreground">
                    {fmt(result.mlPerDay, 0)} mL/24 h
                  </dd>
                </div>
              </dl>
              <p className="mt-4 text-sm text-muted-foreground">
                At {fmt(parseFloat(concentration))} {amountLabel}/mL via {route.toLowerCase()},
                a 50 mL syringe will last about{" "}
                <strong className="text-foreground">
                  {result.mlPerHr > 0 ? fmt(50 / result.mlPerHr, 1) : "—"} hours
                </strong>
                .
              </p>
              {result.outOfRange && (
                <p className="mt-3 flex items-start gap-2 rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                  This dose is outside the usual range ({infusion.minDose}–{infusion.maxDose}{" "}
                  {infusion.unit}). Double-check before prescribing.
                </p>
              )}
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              Enter a valid dose{infusion.perKg ? " and weight" : ""} to see the calculated rate.
            </p>
          )}
        </section>

        {infusion.notes && (
          <p className="mt-4 rounded-lg border border-border bg-muted/50 p-3 text-sm text-muted-foreground">
            <strong className="text-foreground">Clinical note:</strong> {infusion.notes}
          </p>
        )}

        <p className="mt-6 text-xs text-muted-foreground">
          For education and exam preparation. Always verify doses against the BNF, local critical
          care guidelines and your smart-pump drug library before administration.
        </p>
      </div>
    </div>
  );
};

export default IcuDrugCalculator;
