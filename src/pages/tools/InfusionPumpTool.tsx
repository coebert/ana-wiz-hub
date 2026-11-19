import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, ArrowRightLeft } from "lucide-react";
import { ToolShell } from "@/components/tools/ToolShell";
import {
  calculateDeliveredDose,
  calculatePumpRate,
  type DoseMode,
  type InfusionError,
  type MassUnit,
  type RateUnit,
} from "@/lib/infusion-calc";

interface DrugPreset {
  name: string;
  amount: number;
  amountUnit: MassUnit;
  volumeMl: number;
  /** How this drug is usually prescribed — a unit scaffold, never a dose. */
  doseUnit: MassUnit;
  doseMode: DoseMode;
  doseRate: RateUnit;
}

/**
 * Common UK theatre/ICU syringe recipes — convenience only, check local policy.
 * No dose is carried: the prescriber must enter the intended dose after a preset.
 */
const PRESETS: DrugPreset[] = [
  { name: "Noradrenaline 4 mg in 50 mL", amount: 4, amountUnit: "mg", volumeMl: 50, doseUnit: "micrograms", doseMode: "per-kg", doseRate: "per-min" },
  { name: "Adrenaline 4 mg in 50 mL", amount: 4, amountUnit: "mg", volumeMl: 50, doseUnit: "micrograms", doseMode: "per-kg", doseRate: "per-min" },
  { name: "Vasopressin 20 units in 50 mL", amount: 20, amountUnit: "units", volumeMl: 50, doseUnit: "units", doseMode: "fixed", doseRate: "per-min" },
  { name: "Propofol 1% (500 mg in 50 mL)", amount: 500, amountUnit: "mg", volumeMl: 50, doseUnit: "mg", doseMode: "per-kg", doseRate: "per-hour" },
  { name: "Fentanyl 2500 micrograms in 50 mL", amount: 2500, amountUnit: "micrograms", volumeMl: 50, doseUnit: "micrograms", doseMode: "per-kg", doseRate: "per-hour" },
  { name: "Midazolam 50 mg in 50 mL", amount: 50, amountUnit: "mg", volumeMl: 50, doseUnit: "mg", doseMode: "per-kg", doseRate: "per-hour" },
  { name: "Insulin (Actrapid) 50 units in 50 mL", amount: 50, amountUnit: "units", volumeMl: 50, doseUnit: "units", doseMode: "fixed", doseRate: "per-hour" },
  { name: "Heparin 25 000 units in 500 mL", amount: 25000, amountUnit: "units", volumeMl: 500, doseUnit: "units", doseMode: "per-kg", doseRate: "per-hour" },
  { name: "Labetalol 100 mg in 20 mL (neat)", amount: 100, amountUnit: "mg", volumeMl: 20, doseUnit: "mg", doseMode: "fixed", doseRate: "per-hour" },
  { name: "Atracurium 250 mg in 50 mL", amount: 250, amountUnit: "mg", volumeMl: 50, doseUnit: "mg", doseMode: "per-kg", doseRate: "per-hour" },
  { name: "Dobutamine 250 mg in 50 mL", amount: 250, amountUnit: "mg", volumeMl: 50, doseUnit: "micrograms", doseMode: "per-kg", doseRate: "per-min" },
  { name: "Dopamine 200 mg in 50 mL", amount: 200, amountUnit: "mg", volumeMl: 50, doseUnit: "micrograms", doseMode: "per-kg", doseRate: "per-min" },
  { name: "Levosimendan 12.5 mg in 50 mL", amount: 12.5, amountUnit: "mg", volumeMl: 50, doseUnit: "micrograms", doseMode: "per-kg", doseRate: "per-min" },
  { name: "Levophed (noradrenaline) 4 mg in 50 mL", amount: 4, amountUnit: "mg", volumeMl: 50, doseUnit: "micrograms", doseMode: "per-kg", doseRate: "per-min" },
];

const MASS_LABEL: Record<MassUnit, string> = {
  mg: "mg",
  micrograms: "µg",
  units: "units",
};

const ERROR_MESSAGE: Record<InfusionError, string> = {
  "unit-mismatch":
    "Units don't match — the drug amount and the dose must be in the same unit family (mg/µg convert automatically; units do not).",
  "invalid-amount": "Enter a drug amount greater than zero.",
  "invalid-volume": "Enter a diluent volume greater than zero.",
  "missing-dose": "Enter the prescribed dose to calculate the pump rate. No dose is pre-filled.",
  "invalid-dose": "Enter a prescribed dose greater than zero.",
  "invalid-weight": "Enter a weight between 0.3 and 500 kg for weight-based dosing.",
  "missing-pump-rate": "Enter the running pump rate to calculate the delivered dose.",
  "invalid-pump-rate": "Enter a pump rate greater than zero.",
};

function fmt(n: number, dp = 2): string {
  if (!isFinite(n) || n === 0) return "0";
  return n.toLocaleString("en-GB", { maximumFractionDigits: dp });
}

/** Parse a text input into a number, treating blank as null. */
function parseInput(value: string): number | null {
  const trimmed = value.trim();
  if (trimmed === "") return null;
  return Number(trimmed);
}

export default function InfusionPumpTool() {
  const [weight, setWeight] = useState(70);
  const [amount, setAmount] = useState(4);
  const [amountUnit, setAmountUnit] = useState<MassUnit>("mg");
  const [volume, setVolume] = useState(50);
  const [dose, setDose] = useState("");
  const [doseUnit, setDoseUnit] = useState<MassUnit>("micrograms");
  const [doseMode, setDoseMode] = useState<DoseMode>("per-kg");
  const [doseRate, setDoseRate] = useState<RateUnit>("per-min");
  const [reverse, setReverse] = useState(false);
  const [pumpRate, setPumpRate] = useState("");

  const result = useMemo(() => {
    const shared = {
      amount,
      amountUnit,
      volumeMl: volume,
      doseUnit,
      doseMode,
      weightKg: weight,
    };
    if (reverse) {
      return calculateDeliveredDose({ ...shared, pumpRateMlPerHour: parseInput(pumpRate), doseRate });
    }
    return calculatePumpRate({ ...shared, dose: parseInput(dose), doseRate });
  }, [amount, amountUnit, volume, dose, doseUnit, doseMode, doseRate, weight, reverse, pumpRate]);

  const applyPreset = (p: DrugPreset) => {
    setAmount(p.amount);
    setAmountUnit(p.amountUnit);
    setVolume(p.volumeMl);
    setDoseUnit(p.doseUnit);
    setDoseMode(p.doseMode);
    setDoseRate(p.doseRate);
    // Deliberately clear the dose: a preset supplies the syringe, not a prescription.
    setDose("");
  };

  /** Changing how the dose is expressed invalidates the entered number. */
  const clearDoseOnUnitChange = () => setDose("");

  const doseLabel = `${MASS_LABEL[doseUnit]}${doseMode === "per-kg" ? "/kg" : ""}/${doseRate === "per-min" ? "min" : "h"}`;
  const ok = result.ok ? result : null;

  return (
    <ToolShell
      slug="infusion-pump"
      title="Infusion pump rate calculator"
      description="Standalone infusion calculator for theatre and ICU: enter syringe contents (mg, µg or units), diluent volume and the prescribed dose to get the pump rate in mL/h — or work backwards from the pump rate to the dose."
      intro={
        <>
          Works for any infusion — catecholamines, sedation, insulin, heparin,
          labetalol. Amounts may be entered in <strong>mg</strong>,{" "}
          <strong>µg (micrograms)</strong> or <strong>units</strong>; the calculator
          handles the mg→µg conversion and weight-based dosing. It never
          pre-fills a dose: choose a preset to load the syringe contents, then
          enter the prescribed dose yourself. Switch direction with the ⇄ button
          to convert a running pump rate back into the delivered dose. For named
          ICU drug recipes and safety data see the{" "}
          <Link to="/intensive-care/infusions" className="text-primary hover:underline">
            ICU infusion guide
          </Link>{" "}
          and{" "}
          <Link to="/intensive-care/calculator" className="text-primary hover:underline">
            drug-specific calculator
          </Link>
          .
        </>
      }
      references={
        <>
          <p>
            Smith AF, et al. Infusion devices and drug delivery. In: Allman KG,
            Wilson IH, eds. Oxford Handbook of Anaesthesia, 4th ed. Oxford
            University Press; 2016.
          </p>
          <p>
            Midazolam 1 mg/ml solution for injection/infusion — summary of
            product characteristics (AS Kalceks), emc:{" "}
            <a
              href="https://www.medicines.org.uk/emc/product/13192/smpc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2"
            >
              medicines.org.uk/emc/product/13192/smpc
            </a>
            .
          </p>
        </>
      }
    >
      {/* Presets */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Quick presets (tap to fill the syringe — dose still required)
        </p>
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {PRESETS.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => applyPreset(p)}
              className="shrink-0 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-muted-foreground">Weight (kg)</span>
          <input
            type="number" min={0} step="any" value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground"
          />
        </label>
        <div className="text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Syringe drug amount</span>
          </div>
          <div className="mt-1 flex gap-2">
            <input
              type="number" min={0} step="any" value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground"
            />
            <select
              value={amountUnit}
              onChange={(e) => {
                setAmountUnit(e.target.value as MassUnit);
                clearDoseOnUnitChange();
              }}
              className="rounded-lg border border-input bg-background px-2 py-2 text-foreground"
              aria-label="Drug amount unit"
            >
              <option value="mg">mg</option>
              <option value="micrograms">µg</option>
              <option value="units">units</option>
            </select>
          </div>
        </div>
        <label className="block text-sm">
          <span className="text-muted-foreground">Diluent volume (mL)</span>
          <input
            type="number" min={0} step="any" value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground"
          />
        </label>
        <div className="text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">
              {reverse ? "Pump rate (mL/h)" : "Target dose"}
            </span>
            <button
              type="button"
              onClick={() => setReverse((r) => !r)}
              className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground hover:border-primary hover:text-primary"
            >
              <ArrowRightLeft className="h-3 w-3" />
              {reverse ? "Dose → mL/h" : "mL/h → dose"}
            </button>
          </div>
          {reverse ? (
            <input
              type="number" min={0} step="any" value={pumpRate}
              onChange={(e) => setPumpRate(e.target.value)}
              placeholder="Enter the running rate"
              className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground"
            />
          ) : (
            <div className="mt-1 flex flex-wrap gap-2">
              <input
                type="number" min={0} step="any" value={dose}
                onChange={(e) => setDose(e.target.value)}
                placeholder="Enter prescribed dose"
                aria-label="Prescribed dose"
                className="w-36 rounded-lg border border-input bg-background px-3 py-2 text-foreground"
              />
              <select
                value={doseUnit}
                onChange={(e) => {
                  setDoseUnit(e.target.value as MassUnit);
                  clearDoseOnUnitChange();
                }}
                className="rounded-lg border border-input bg-background px-2 py-2 text-foreground"
                aria-label="Dose unit"
              >
                <option value="mg">mg</option>
                <option value="micrograms">µg</option>
                <option value="units">units</option>
              </select>
              <select
                value={doseMode}
                onChange={(e) => {
                  setDoseMode(e.target.value as DoseMode);
                  clearDoseOnUnitChange();
                }}
                className="rounded-lg border border-input bg-background px-2 py-2 text-foreground"
                aria-label="Weight-based or fixed"
              >
                <option value="per-kg">per kg</option>
                <option value="fixed">fixed</option>
              </select>
              <select
                value={doseRate}
                onChange={(e) => {
                  setDoseRate(e.target.value as RateUnit);
                  clearDoseOnUnitChange();
                }}
                className="rounded-lg border border-input bg-background px-2 py-2 text-foreground"
                aria-label="Per minute or per hour"
              >
                <option value="per-min">per min</option>
                <option value="per-hour">per hour</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {!result.ok && (
        <p className="mt-4 flex items-start gap-2 rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-amber-700 dark:text-amber-400">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          {ERROR_MESSAGE[result.error]}
        </p>
      )}

      {/* Results */}
      {ok && (
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-border bg-card p-3">
            <p className="text-xs text-muted-foreground">Concentration</p>
            <p className="mt-1 font-serif text-xl font-semibold text-foreground">
              {fmt(ok.concPerMl, ok.concPerMl < 10 ? 2 : 1)}{" "}
              <span className="text-sm font-normal text-muted-foreground">
                {amountUnit === "units" ? "units" : "µg"}/mL
              </span>
            </p>
            <p className="text-[11px] text-muted-foreground">
              {fmt(amount, amount < 1 ? 2 : 1)} {MASS_LABEL[amountUnit]} in {volume} mL
            </p>
          </div>
          <div className="rounded-xl border border-primary/40 bg-primary/5 p-3">
            <p className="text-xs text-muted-foreground">
              {reverse ? "Delivered" : "Pump rate"}
            </p>
            <p className="mt-1 font-serif text-xl font-semibold text-primary">
              {reverse && "displayDose" in ok
                ? `${fmt(ok.displayDose, ok.displayDose < 1 ? 3 : 2)} ${doseLabel}`
                : `${fmt(ok.rateMlPerHour, ok.rateMlPerHour < 1 ? 3 : 2)} mL/h`}
            </p>
            <p className="text-[11px] text-muted-foreground">
              {fmt(ok.amountPerHour, 0)} {amountUnit === "units" ? "units" : "µg"}/h delivered
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-3">
            <p className="text-xs text-muted-foreground">24 h volume</p>
            <p className="mt-1 font-serif text-xl font-semibold text-foreground">
              {fmt(ok.dayVolumeMl, 1)}{" "}
              <span className="text-sm font-normal text-muted-foreground">mL/day</span>
            </p>
            <p className="text-[11px] text-muted-foreground">
              counts towards fluid balance
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-3">
            <p className="text-xs text-muted-foreground">Syringe lasts</p>
            <p className="mt-1 font-serif text-xl font-semibold text-foreground">
              {fmt(ok.syringeHours, 1)}{" "}
              <span className="text-sm font-normal text-muted-foreground">hours</span>
            </p>
            <p className="text-[11px] text-muted-foreground">
              {volume} mL at {fmt(ok.rateMlPerHour, 2)} mL/h
            </p>
          </div>
        </div>
      )}

      <p className="mt-5 flex items-start gap-2 rounded-lg border border-border bg-secondary/50 p-3 text-xs text-muted-foreground">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
        Educational aid for trained clinicians. Always verify concentrations and
        rates against your local drug library and smart-pump settings, and have a
        second person independently check the calculation before connecting to
        the patient.
      </p>
    </ToolShell>
  );
}
