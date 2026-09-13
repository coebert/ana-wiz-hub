import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, Calculator, Syringe, AlertTriangle, Pill } from "lucide-react";
import {
  anaesthesiaCalcDrugs,
  anaesthesiaCalcGroups,
  type AnaesthesiaCalcDrug,
} from "@/data/anaesthesiaCalculatorDrugs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/** True when the entered dose scales with body weight. */
function isPerKg(drug: AnaesthesiaCalcDrug): boolean {
  return drug.unit.includes("/kg");
}

/** Total amount (in the drug's presentation unit) for a bolus or fixed dose. */
function totalAmount(drug: AnaesthesiaCalcDrug, dose: number, weightKg: number): number {
  switch (drug.unit) {
    case "mg/kg":
    case "micrograms/kg":
      return dose * weightKg;
    case "mg":
    case "micrograms":
      return dose;
    default:
      return dose;
  }
}

/** Amount per hour (presentation unit) for an infusion. */
function amountPerHour(drug: AnaesthesiaCalcDrug, dose: number, weightKg: number): number {
  switch (drug.unit) {
    case "mg/kg/h":
    case "micrograms/kg/h":
      return dose * weightKg;
    case "micrograms/kg/min":
      return dose * weightKg * 60;
    default:
      return dose;
  }
}

function fmt(n: number, dp = 2): string {
  return n.toLocaleString("en-GB", { maximumFractionDigits: dp });
}

const AnaesthesiaDrugCalculator = () => {
  const [drugKey, setDrugKey] = useState(anaesthesiaCalcDrugs[0].drug);
  const [weight, setWeight] = useState("70");
  const [dose, setDose] = useState(String(anaesthesiaCalcDrugs[0].startDose));
  const [concentration, setConcentration] = useState(
    String(anaesthesiaCalcDrugs[0].concentrationPerMl),
  );

  const drug = anaesthesiaCalcDrugs.find((d) => d.drug === drugKey) ?? anaesthesiaCalcDrugs[0];
  const perKg = isPerKg(drug);

  const onDrugChange = (name: string) => {
    const next = anaesthesiaCalcDrugs.find((d) => d.drug === name) ?? anaesthesiaCalcDrugs[0];
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
    if (perKg && !weightValid) return null;
    const wkg = weightValid ? w : 70;

    const outOfRange = d < drug.minDose || d > drug.maxDose;

    if (drug.kind === "infusion") {
      const perHr = amountPerHour(drug, d, wkg);
      const mlPerHr = perHr / c;
      return {
        kind: "infusion" as const,
        perHr,
        mlPerHr,
        mlPerDay: mlPerHr * 24,
        syringeHours: mlPerHr > 0 ? 50 / mlPerHr : null,
        outOfRange,
        cappedAt: null as number | null,
      };
    }

    const raw = totalAmount(drug, d, wkg);
    const capped = drug.maxSingleDose !== undefined && raw > drug.maxSingleDose;
    const amount = capped ? drug.maxSingleDose! : raw;
    return {
      kind: "bolus" as const,
      amount,
      volumeMl: amount / c,
      outOfRange,
      cappedAt: capped ? drug.maxSingleDose! : null,
    };
  }, [drug, perKg, weight, dose, concentration]);

  const groupTitle =
    anaesthesiaCalcGroups.find((g) => g.id === drug.groupId)?.title ?? "Anaesthesia drug";

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>Anaesthesia Drug Calculator — Dose and Volume | AnaesthesiaCore</title>
        <meta
          name="description"
          content="Anaesthesia drug calculator: work out induction, maintenance and reversal doses by weight, with the volume to draw up and the infusion rate in mL/hour."
        />
        <link rel="canonical" href="https://anaesthesiacore.app/perioperative/calculator" />
        <meta property="og:url" content="https://anaesthesiacore.app/perioperative/calculator" />
      </Helmet>

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <Link
          to="/perioperative/drug-doses"
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-perioperative hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to the anaesthesia dosing table
        </Link>

        <header className="mb-8">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-perioperative/10 text-perioperative">
              <Calculator className="h-5 w-5" />
            </span>
            <h1 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
              Anaesthesia drug calculator
            </h1>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Choose an induction, maintenance, neuromuscular blocking, opioid, adjunct or reversal
            agent, enter the dose and patient weight, and see the total dose, the volume to draw up
            and — for infusions — the pump rate. Doses and presentations pre-fill from the{" "}
            <Link
              to="/perioperative/drug-doses"
              className="font-medium text-perioperative hover:underline"
            >
              anaesthesia dosing table
            </Link>
            ; adjust the concentration if your ampoule or dilution differs.
          </p>
        </header>

        {/* Inputs */}
        <section className="rounded-xl border border-border bg-card p-4 sm:p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label htmlFor="anaes-drug">Drug</Label>
              <Select value={drugKey} onValueChange={onDrugChange}>
                <SelectTrigger id="anaes-drug" className="mt-1.5">
                  <SelectValue placeholder="Select a drug" />
                </SelectTrigger>
                <SelectContent>
                  {anaesthesiaCalcGroups.map((g) => (
                    <SelectGroup key={g.id}>
                      <SelectLabel>{g.title}</SelectLabel>
                      {anaesthesiaCalcDrugs
                        .filter((d) => d.groupId === g.id)
                        .map((d) => (
                          <SelectItem key={d.drug} value={d.drug}>
                            {d.drug}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
              <p className="mt-1 text-xs text-muted-foreground">{groupTitle} — {drug.route}</p>
            </div>

            <div>
              <Label htmlFor="anaes-dose">Dose ({drug.unit})</Label>
              <Input
                id="anaes-dose"
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={dose}
                onChange={(e) => setDose(e.target.value)}
                className="mt-1.5"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Usual range {drug.minDose}
                {drug.maxDose !== drug.minDose ? `–${drug.maxDose}` : ""} {drug.unit}
              </p>
            </div>

            <div>
              <Label htmlFor="anaes-weight">Patient weight (kg)</Label>
              <Input
                id="anaes-weight"
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="mt-1.5"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                {perKg
                  ? "Use lean or adjusted body weight in obesity for lipophilic agents."
                  : "Fixed dose — weight does not change the result."}
              </p>
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="anaes-conc">
                Concentration ({drug.amountUnit}/mL)
              </Label>
              <Input
                id="anaes-conc"
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                value={concentration}
                onChange={(e) => setConcentration(e.target.value)}
                className="mt-1.5"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Standard presentation: {drug.concentrationLabel}
              </p>
            </div>
          </div>
        </section>

        {/* Results */}
        <section
          aria-live="polite"
          className="mt-6 rounded-xl border border-perioperative/30 bg-perioperative/5 p-4 sm:p-6"
        >
          <div className="mb-4 flex items-center gap-2 text-perioperative">
            <Syringe className="h-5 w-5" />
            <h2 className="font-heading text-lg font-semibold">{drug.drug} — calculated dose</h2>
          </div>

          {result ? (
            <>
              {result.kind === "bolus" ? (
                <dl className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-border bg-background p-4">
                    <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Total dose
                    </dt>
                    <dd className="mt-1 text-2xl font-bold text-foreground">
                      {fmt(result.amount, 1)} {drug.amountUnit}
                    </dd>
                  </div>
                  <div className="rounded-lg border border-border bg-background p-4">
                    <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Volume to draw up
                    </dt>
                    <dd className="mt-1 text-2xl font-bold text-foreground">
                      {fmt(result.volumeMl)} mL
                    </dd>
                  </div>
                </dl>
              ) : (
                <dl className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-lg border border-border bg-background p-4">
                    <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Amount per hour
                    </dt>
                    <dd className="mt-1 text-2xl font-bold text-foreground">
                      {fmt(result.perHr, 1)} {drug.amountUnit}/hr
                    </dd>
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
              )}

              <p className="mt-4 text-sm text-muted-foreground">
                {result.kind === "bolus"
                  ? `At ${fmt(parseFloat(concentration))} ${drug.amountUnit}/mL via ${drug.route.toLowerCase()}.`
                  : `A 50 mL syringe at this rate lasts about ${
                      result.syringeHours !== null ? fmt(result.syringeHours, 1) : "—"
                    } hours.`}
              </p>

              {result.cappedAt !== null && (
                <p className="mt-3 flex items-start gap-2 rounded-md border border-perioperative/40 bg-perioperative/10 p-3 text-sm text-foreground">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-perioperative" />
                  Capped at the usual maximum single dose of {fmt(result.cappedAt, 0)}{" "}
                  {drug.amountUnit}.
                </p>
              )}

              {result.outOfRange && (
                <p className="mt-3 flex items-start gap-2 rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                  This dose sits outside the usual range ({drug.minDose}
                  {drug.maxDose !== drug.minDose ? `–${drug.maxDose}` : ""} {drug.unit}).
                  Double-check before giving it.
                </p>
              )}
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              Enter a valid dose{perKg ? " and weight" : ""} to see the calculated result.
            </p>
          )}
        </section>

        <p className="mt-4 rounded-lg border border-border bg-muted/50 p-3 text-sm text-muted-foreground">
          <strong className="text-foreground">Clinical note:</strong> {drug.notes}
        </p>

        {drug.topicPaths?.length ? (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Pill className="h-4 w-4 text-perioperative" />
            {drug.topicPaths.map((p) => (
              <Link
                key={p}
                to={p}
                className="rounded-full border border-perioperative/30 bg-perioperative/5 px-2.5 py-0.5 text-xs text-perioperative underline-offset-2 hover:underline"
              >
                {p.split("/").pop()?.replace(/-/g, " ")}
              </Link>
            ))}
          </div>
        ) : null}

        <p className="mt-6 text-xs text-muted-foreground">
          For education and exam preparation only. Always confirm doses against the BNF, the product
          literature and local guidelines, and check the ampoule strength in front of you before
          drawing up.
        </p>
      </div>
    </main>
  );
};

export default AnaesthesiaDrugCalculator;
