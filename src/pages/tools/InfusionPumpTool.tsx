import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, ArrowRightLeft } from "lucide-react";
import { ToolShell } from "@/components/tools/ToolShell";

/** Internal base units: drug amount in micrograms or units, rate in mL/h. */
type MassUnit = "mg" | "micrograms" | "units";
type RateUnit = "per-hour" | "per-min";
type DoseMode = "fixed" | "per-kg";

interface DrugPreset {
  name: string;
  amount: number;
  amountUnit: MassUnit;
  volumeMl: number;
  dose: number;
  doseUnit: MassUnit;
  doseMode: DoseMode;
  doseRate: RateUnit;
}

/** Common UK theatre/ICU syringe recipes — convenience only, check local policy. */
const PRESETS: DrugPreset[] = [
  { name: "Noradrenaline 4 mg in 50 mL", amount: 4, amountUnit: "mg", volumeMl: 50, dose: 0.05, doseUnit: "micrograms", doseMode: "per-kg", doseRate: "per-min" },
  { name: "Adrenaline 4 mg in 50 mL", amount: 4, amountUnit: "mg", volumeMl: 50, dose: 0.05, doseUnit: "micrograms", doseMode: "per-kg", doseRate: "per-min" },
  { name: "Vasopressin 20 units in 50 mL", amount: 20, amountUnit: "units", volumeMl: 50, dose: 0.03, doseUnit: "units", doseMode: "fixed", doseRate: "per-min" },
  { name: "Propofol 1% (500 mg in 50 mL)", amount: 500, amountUnit: "mg", volumeMl: 50, dose: 2, doseUnit: "mg", doseMode: "per-kg", doseRate: "per-hour" },
  { name: "Fentanyl 2500 micrograms in 50 mL", amount: 2500, amountUnit: "micrograms", volumeMl: 50, dose: 0.5, doseUnit: "micrograms", doseMode: "per-kg", doseRate: "per-hour" },
  { name: "Midazolam 50 mg in 50 mL", amount: 50, amountUnit: "mg", volumeMl: 50, dose: 1, doseUnit: "mg", doseMode: "per-kg", doseRate: "per-hour" },
  { name: "Insulin (Actrapid) 50 units in 50 mL", amount: 50, amountUnit: "units", volumeMl: 50, dose: 2, doseUnit: "units", doseMode: "fixed", doseRate: "per-hour" },
  { name: "Heparin 25 000 units in 500 mL", amount: 25000, amountUnit: "units", volumeMl: 500, dose: 18, doseUnit: "units", doseMode: "per-kg", doseRate: "per-hour" },
  { name: "Labetalol 100 mg in 20 mL (neat)", amount: 100, amountUnit: "mg", volumeMl: 20, dose: 10, doseUnit: "mg", doseMode: "fixed", doseRate: "per-hour" },
  { name: "Atracurium 250 mg in 50 mL", amount: 250, amountUnit: "mg", volumeMl: 50, dose: 0.3, doseUnit: "mg", doseMode: "per-kg", doseRate: "per-hour" },
];

const MASS_LABEL: Record<MassUnit, string> = {
  mg: "mg",
  micrograms: "µg",
  units: "units",
};

function fmt(n: number, dp = 2): string {
  if (!isFinite(n) || n === 0) return "0";
  return n.toLocaleString("en-GB", { maximumFractionDigits: dp });
}

/** Convert a mass/unit amount to micrograms (or units, unchanged). */
function toBase(amount: number, unit: MassUnit): number {
  return unit === "mg" ? amount * 1000 : amount;
}

export default function InfusionPumpTool() {
  const [weight, setWeight] = useState(70);
  const [amount, setAmount] = useState(4);
  const [amountUnit, setAmountUnit] = useState<MassUnit>("mg");
  const [volume, setVolume] = useState(50);
  const [dose, setDose] = useState(0.05);
  const [doseUnit, setDoseUnit] = useState<MassUnit>("micrograms");
  const [doseMode, setDoseMode] = useState<DoseMode>("per-kg");
  const [doseRate, setDoseRate] = useState<RateUnit>("per-min");
  const [reverse, setReverse] = useState(false);
  const [pumpRate, setPumpRate] = useState(1.3);

  // mg and micrograms are inter-convertible; units only match units.
  const compatible =
    (amountUnit === "units" && doseUnit === "units") ||
    (amountUnit !== "units" && doseUnit !== "units");

  const result = useMemo(() => {
    if (volume <= 0 || !compatible) return null;
    // concentration in µg/mL (or units/mL)
    const concPerMl = toBase(amount, amountUnit) / volume;
    if (concPerMl <= 0) return null;

    if (!reverse) {
      // dose -> mL/h
      const perHour = doseRate === "per-min" ? dose * 60 : dose;
      const weightTerm = doseMode === "per-kg" ? weight : 1;
      const amountPerHour = toBase(perHour, doseUnit) * weightTerm; // µg/h or units/h
      return {
        concPerMl,
        rate: amountPerHour / concPerMl,
        amountPerHour,
        dayVolume: (amountPerHour / concPerMl) * 24,
        syringeHours: concPerMl > 0 ? (toBase(amount, amountUnit) / amountPerHour) * 1 : 0,
      };
    }
    // mL/h -> dose, shown in the currently selected dose unit/mode
    const amountPerHour = pumpRate * concPerMl; // µg/h or units/h
    const divisor = doseMode === "per-kg" ? weight : 1;
    const perHour = amountPerHour / divisor;
    const perRate = doseRate === "per-min" ? perHour / 60 : perHour;
    const displayDose = doseUnit === "mg" ? perRate / 1000 : perRate;
    return {
      concPerMl,
      rate: pumpRate,
      amountPerHour,
      dayVolume: pumpRate * 24,
      syringeHours: volume / pumpRate,
      displayDose,
    };
  }, [amount, amountUnit, volume, dose, doseUnit, doseMode, doseRate, weight, reverse, pumpRate, compatible]);

  const applyPreset = (p: DrugPreset) => {
    setAmount(p.amount);
    setAmountUnit(p.amountUnit);
    setVolume(p.volumeMl);
    setDose(p.dose);
    setDoseUnit(p.doseUnit);
    setDoseMode(p.doseMode);
    setDoseRate(p.doseRate);
  };

  const doseLabel = `${MASS_LABEL[doseUnit]}${doseMode === "per-kg" ? "/kg" : ""}/${doseRate === "per-min" ? "min" : "h"}`;

  return (
    <ToolShell
      slug="infusion-pump"
      title="Infusion pump rate calculator"
      description="Standalone infusion calculator for theatre and ICU: enter syringe contents (mg, µg or units), diluent volume and dose to get the pump rate in mL/h — or work backwards from the pump rate to the dose."
      intro={
        <>
          Works for any infusion — catecholamines, sedation, insulin, heparin,
          labetalol. Amounts may be entered in <strong>mg</strong>,{" "}
          <strong>µg (micrograms)</strong> or <strong>units</strong>; the calculator
          handles the mg→µg conversion and weight-based dosing automatically.
          Switch direction with the ⇄ button to convert a running pump rate back
          into the delivered dose. For named ICU drug recipes and safety data see
          the{" "}
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
        <p>
          Smith AF, et al. Infusion devices and drug delivery. In: Allman KG,
          Wilson IH, eds. Oxford Handbook of Anaesthesia, 4th ed. Oxford
          University Press; 2016.
        </p>
      }
    >
      {/* Presets */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Quick presets (tap to fill)
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

      {/* Patient + syringe */}
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-muted-foreground">Patient weight (kg)</span>
          <input
            type="number" min={0.5} max={300} step={0.5} value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground"
          />
        </label>
        <label className="block text-sm">
          <span className="text-muted-foreground">Total volume in syringe/bag (mL)</span>
          <input
            type="number" min={1} step={1} value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground"
          />
        </label>
        <div className="text-sm">
          <span className="text-muted-foreground">Drug amount in syringe/bag</span>
          <div className="mt-1 flex gap-2">
            <input
              type="number" min={0} step="any" value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground"
            />
            <select
              value={amountUnit}
              onChange={(e) => setAmountUnit(e.target.value as MassUnit)}
              className="rounded-lg border border-input bg-background px-2 py-2 text-foreground"
              aria-label="Drug amount unit"
            >
              <option value="mg">mg</option>
              <option value="micrograms">µg</option>
              <option value="units">units</option>
            </select>
          </div>
        </div>
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
              onChange={(e) => setPumpRate(Number(e.target.value))}
              className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground"
            />
          ) : (
            <div className="mt-1 flex flex-wrap gap-2">
              <input
                type="number" min={0} step="any" value={dose}
                onChange={(e) => setDose(Number(e.target.value))}
                className="w-28 rounded-lg border border-input bg-background px-3 py-2 text-foreground"
              />
              <select
                value={doseUnit}
                onChange={(e) => setDoseUnit(e.target.value as MassUnit)}
                className="rounded-lg border border-input bg-background px-2 py-2 text-foreground"
                aria-label="Dose unit"
              >
                <option value="mg">mg</option>
                <option value="micrograms">µg</option>
                <option value="units">units</option>
              </select>
              <select
                value={doseMode}
                onChange={(e) => setDoseMode(e.target.value as DoseMode)}
                className="rounded-lg border border-input bg-background px-2 py-2 text-foreground"
                aria-label="Weight-based or fixed"
              >
                <option value="per-kg">per kg</option>
                <option value="fixed">fixed</option>
              </select>
              <select
                value={doseRate}
                onChange={(e) => setDoseRate(e.target.value as RateUnit)}
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

      {!compatible && (
        <p className="mt-4 flex items-start gap-2 rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-amber-700 dark:text-amber-400">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          Units don't match — the drug amount is in {MASS_LABEL[amountUnit]} but the
          dose is in {MASS_LABEL[doseUnit]}. Set both to the same unit family
          (mg/µg convert automatically; units do not).
        </p>
      )}

      {/* Results */}
      {result && compatible && (
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-border bg-card p-3">
            <p className="text-xs text-muted-foreground">Concentration</p>
            <p className="mt-1 font-serif text-xl font-semibold text-foreground">
              {fmt(result.concPerMl, result.concPerMl < 10 ? 2 : 1)}{" "}
              <span className="text-sm font-normal text-muted-foreground">
                {amountUnit === "units" ? "units" : "µg"}/mL
              </span>
            </p>
            <p className="text-[11px] text-muted-foreground">
              {fmt(amount, amount < 1 ? 2 : 1)} {MASS_LABEL[amountUnit]} in {volume} mL
            </p>
          </div>
          <div className="rounded-xl border border-primary/40 bg-primary/5 p-3">
            <p className="text-xs text-muted-foreground">Pump rate</p>
            <p className="mt-1 font-serif text-xl font-semibold text-primary">
              {fmt(result.rate, result.rate < 1 ? 3 : 2)}{" "}
              <span className="text-sm font-normal text-muted-foreground">mL/h</span>
            </p>
            <p className="text-[11px] text-muted-foreground">
              {fmt(result.amountPerHour, 0)} {amountUnit === "units" ? "units" : "µg"}/h delivered
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-3">
            <p className="text-xs text-muted-foreground">24 h volume</p>
            <p className="mt-1 font-serif text-xl font-semibold text-foreground">
              {fmt(result.dayVolume, 1)}{" "}
              <span className="text-sm font-normal text-muted-foreground">mL/day</span>
            </p>
            <p className="text-[11px] text-muted-foreground">
              counts towards fluid balance
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-3">
            <p className="text-xs text-muted-foreground">Syringe lasts</p>
            <p className="mt-1 font-serif text-xl font-semibold text-foreground">
              {fmt(result.syringeHours, 1)}{" "}
              <span className="text-sm font-normal text-muted-foreground">hours</span>
            </p>
            <p className="text-[11px] text-muted-foreground">
              {volume} mL at {fmt(result.rate, 2)} mL/h
            </p>
          </div>
          {reverse && result.displayDose !== undefined && (
            <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/5 p-3 sm:col-span-2 lg:col-span-4">
              <p className="text-xs text-muted-foreground">Delivered dose at this rate</p>
              <p className="mt-1 font-serif text-xl font-semibold text-foreground">
                {fmt(result.displayDose, result.displayDose < 1 ? 3 : 2)}{" "}
                <span className="text-sm font-normal text-muted-foreground">{doseLabel}</span>
              </p>
            </div>
          )}
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
