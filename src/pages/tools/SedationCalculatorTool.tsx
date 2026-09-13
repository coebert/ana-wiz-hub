import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Moon } from "lucide-react";
import { ToolShell } from "@/components/tools/ToolShell";

type DoseUnit = "mg/kg/h" | "micrograms/kg/h" | "micrograms/kg/min";

interface SedationDrug {
  id: string;
  name: string;
  recipe: string;
  /** concentration in micrograms per mL */
  concUgPerMl: number;
  unit: DoseUnit;
  start: number;
  maintenanceMin: number;
  maintenanceMax: number;
  /** taper step size in the drug's own dose unit */
  taperStep: number;
  taperInterval: string;
  weanNote: string;
  caution: string;
  href: string;
}

const DRUGS: SedationDrug[] = [
  {
    id: "propofol",
    name: "Propofol 1%",
    recipe: "Neat 1% emulsion — 10 mg/mL",
    concUgPerMl: 10000,
    unit: "mg/kg/h",
    start: 1,
    maintenanceMin: 0.3,
    maintenanceMax: 4,
    taperStep: 0.5,
    taperInterval: "every 1–2 h",
    weanNote:
      "Step down by ~0.5 mg/kg/h every 1–2 h once the RASS target holds; wake-up is usually prompt after short infusions. After days of therapy offset is slower — reduce gradually and reassess neurological status at each step.",
    caution:
      "Keep ≤4 mg/kg/h and review after 48 h: propofol-related infusion syndrome (lactic acidosis, rhabdomyolysis, hypertriglyceridaemia). Lipid load ≈1.1 kcal/mL — count towards nutrition.",
    href: "/intensive-care/drug-safety#propofol-1",
  },
  {
    id: "midazolam",
    name: "Midazolam",
    recipe: "50 mg in 50 mL — 1 mg/mL",
    concUgPerMl: 1000,
    unit: "micrograms/kg/h",
    start: 30,
    maintenanceMin: 20,
    maintenanceMax: 120,
    taperStep: 10,
    taperInterval: "every 6–12 h",
    weanNote:
      "Context-sensitive half-time rises sharply after >48–72 h, especially in renal failure and obesity. Reduce by ~10–20 micrograms/kg/h every 6–12 h, watch for delayed awakening, and screen for benzodiazepine withdrawal (agitation, tachycardia, hypertension) after prolonged use.",
    caution:
      "Accumulates with prolonged infusion — not ideal beyond 48–72 h. Avoid in renal failure where possible; metabolite (1-hydroxymidazolam) accumulates. Withdrawal risk after >1 week.",
    href: "/intensive-care/drug-safety#midazolam",
  },
  {
    id: "dexmedetomidine",
    name: "Dexmedetomidine",
    recipe: "400 µg in 50 mL — 8 µg/mL",
    concUgPerMl: 8,
    unit: "micrograms/kg/h",
    start: 0.7,
    maintenanceMin: 0.2,
    maintenanceMax: 1.4,
    taperStep: 0.2,
    taperInterval: "every 1–2 h",
    weanNote:
      "Infusions <24 h can usually be stopped without tapering. After longer or higher-rate infusions, step down by 0.2 micrograms/kg/h every 1–2 h to avoid rebound tachycardia and hypertension. Patients remain rousable throughout the wean.",
    caution:
      "Bradycardia and hypotension are dose-limiting; never give a loading bolus on ICU. Useful for light, co-operative sedation (RASS 0 to −2) and peri-extubation sedation.",
    href: "/intensive-care/drug-safety#dexmedetomidine",
  },
  {
    id: "remifentanil",
    name: "Remifentanil",
    recipe: "5 mg in 50 mL — 100 µg/mL",
    concUgPerMl: 100,
    unit: "micrograms/kg/min",
    start: 0.05,
    maintenanceMin: 0.02,
    maintenanceMax: 0.2,
    taperStep: 0.02,
    taperInterval: "every 5–10 min",
    weanNote:
      "Esterase-metabolised: context-sensitive half-time stays ~4 min however long the infusion has run, so no pharmacological taper is needed — offset is predictable within minutes. The critical step is planning post-stop analgesia (longer-acting opioid or regional technique) BEFORE discontinuing.",
    caution:
      "Analgesia disappears within minutes of stopping — always have replacement analgesia running first. Muscle rigidity and bradycardia with rapid boluses; titrate the infusion instead.",
    href: "/intensive-care/drug-safety#remifentanil",
  },
];

function fmt(n: number, dp = 2): string {
  if (!isFinite(n) || n === 0) return "0";
  return n.toLocaleString("en-GB", { maximumFractionDigits: dp });
}

/** Dose in the drug's native unit → mL/h at a given weight. */
function toMlPerHour(d: SedationDrug, dose: number, weightKg: number): number {
  const perHour = d.unit.endsWith("min") ? dose * 60 : dose;
  const amountUg = d.unit.startsWith("mg") ? perHour * 1000 : perHour;
  return (amountUg * weightKg) / d.concUgPerMl;
}

/** Build a weaning staircase from the current dose down to zero. */
function weanSteps(d: SedationDrug, current: number, weightKg: number) {
  const steps: { dose: number; rate: number }[] = [];
  let level = current - d.taperStep;
  while (level >= d.taperStep - 1e-9 && steps.length < 12) {
    steps.push({ dose: level, rate: toMlPerHour(d, level, weightKg) });
    level -= d.taperStep;
  }
  return steps;
}

export default function SedationCalculatorTool() {
  const [drugId, setDrugId] = useState("propofol");
  const [weight, setWeight] = useState(70);
  const [currentDose, setCurrentDose] = useState<number | null>(null);
  const [rass, setRass] = useState("-2");

  const drug = DRUGS.find((d) => d.id === drugId)!;

  const calc = useMemo(() => {
    const rate = (dose: number) => toMlPerHour(drug, dose, weight);
    return {
      start: { dose: drug.start, rate: rate(drug.start) },
      min: { dose: drug.maintenanceMin, rate: rate(drug.maintenanceMin) },
      max: { dose: drug.maintenanceMax, rate: rate(drug.maintenanceMax) },
      current:
        currentDose && currentDose > 0
          ? { dose: currentDose, rate: rate(currentDose), steps: weanSteps(drug, currentDose, weight) }
          : null,
    };
  }, [drug, weight, currentDose]);

  const unitLabel = drug.unit
    .replace("micrograms", "µg")
    .replace("/h", "/h")
    .replace("/min", "/min");

  return (
    <ToolShell
      slug="sedation"
      title="ICU sedation calculator"
      description="Start, maintenance and weaning rates for propofol, midazolam, dexmedetomidine and remifentanil, in native dose units and mL/h at the patient's weight."
      intro={
        <>
          Pick a sedative, enter the patient's weight, and get the{" "}
          <strong>start rate</strong>, <strong>maintenance range</strong> and a{" "}
          <strong>step-by-step weaning schedule</strong> in both dose units and
          mL/h. Aim for the lightest effective sedation (RASS 0 to −2) with a
          daily interruption trial. Full safety data for each drug is on its{" "}
          <Link to="/intensive-care/drug-safety" className="text-primary hover:underline">
            drug safety page
          </Link>
          , and any custom recipe can be run through the{" "}
          <Link to="/tools/infusion-pump" className="text-primary hover:underline">
            infusion pump calculator
          </Link>
          .
        </>
      }
      references={
        <>
          <p>
            Devlin JW, et al. Clinical practice guidelines for pain, agitation/sedation,
            delirium, immobility, and sleep disruption in adult ICU patients (PADIS).
            Crit Care Med. 2018;46(9):e825–e873.
          </p>
          <p>
            Barr J, et al. Clinical practice guidelines for the management of pain,
            agitation, and delirium in adult ICU patients. Crit Care Med.
            2013;41(1):263–306.
          </p>
        </>
      }
    >
      {/* Drug selector */}
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Sedative
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {DRUGS.map((d) => (
            <button
              key={d.id}
              type="button"
              onClick={() => {
                setDrugId(d.id);
                setCurrentDose(null);
              }}
              aria-pressed={drugId === d.id}
              className={`rounded-xl border p-3 text-left transition-colors ${
                drugId === d.id
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:border-primary/50"
              }`}
            >
              <p className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                <Moon className="h-3.5 w-3.5 text-primary" />
                {d.name}
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">{d.recipe}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Inputs */}
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <label className="block text-sm">
          <span className="text-muted-foreground">Patient weight (kg)</span>
          <input
            type="number" min={0.5} max={300} step={0.5} value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground"
          />
        </label>
        <label className="block text-sm">
          <span className="text-muted-foreground">RASS target</span>
          <select
            value={rass}
            onChange={(e) => setRass(e.target.value)}
            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground"
          >
            <option value="0">0 — alert and calm</option>
            <option value="-1">−1 — drowsy</option>
            <option value="-2">−2 — light sedation</option>
            <option value="-3">−3 — moderate sedation</option>
            <option value="-4">−4 — deep sedation</option>
          </select>
        </label>
        <label className="block text-sm">
          <span className="text-muted-foreground">
            Current dose ({unitLabel}) — for weaning
          </span>
          <input
            type="number" min={0} step="any" value={currentDose ?? ""}
            placeholder={fmt(drug.start, 2)}
            onChange={(e) =>
              setCurrentDose(e.target.value === "" ? null : Number(e.target.value))
            }
            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground"
          />
        </label>
      </div>

      {/* Start + maintenance */}
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-primary/40 bg-primary/5 p-3">
          <p className="text-xs text-muted-foreground">Start at</p>
          <p className="mt-1 font-serif text-xl font-semibold text-primary">
            {fmt(calc.start.rate, 2)}{" "}
            <span className="text-sm font-normal text-muted-foreground">mL/h</span>
          </p>
          <p className="text-[11px] text-muted-foreground">
            {fmt(calc.start.dose, 2)} {unitLabel}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-3">
          <p className="text-xs text-muted-foreground">Maintenance low</p>
          <p className="mt-1 font-serif text-xl font-semibold text-foreground">
            {fmt(calc.min.rate, 2)}{" "}
            <span className="text-sm font-normal text-muted-foreground">mL/h</span>
          </p>
          <p className="text-[11px] text-muted-foreground">
            {fmt(calc.min.dose, 2)} {unitLabel}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-3">
          <p className="text-xs text-muted-foreground">Maintenance high</p>
          <p className="mt-1 font-serif text-xl font-semibold text-foreground">
            {fmt(calc.max.rate, 2)}{" "}
            <span className="text-sm font-normal text-muted-foreground">mL/h</span>
          </p>
          <p className="text-[11px] text-muted-foreground">
            {fmt(calc.max.dose, 2)} {unitLabel}
          </p>
        </div>
      </div>

      {/* Weaning schedule */}
      <div className="mt-5 rounded-xl border border-border bg-card p-4">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Moon className="h-4 w-4 text-primary" />
          Weaning plan — {drug.name}
        </h2>
        <p className="mt-2 text-xs text-muted-foreground">{drug.weanNote}</p>

        {calc.current ? (
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border text-left text-muted-foreground">
                  <th className="py-1.5 pr-3 font-medium">Step</th>
                  <th className="py-1.5 pr-3 font-medium">Dose ({unitLabel})</th>
                  <th className="py-1.5 font-medium">Pump rate (mL/h)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="py-1.5 pr-3 text-muted-foreground">Now</td>
                  <td className="py-1.5 pr-3 font-medium text-foreground">
                    {fmt(calc.current.dose, 3)}
                  </td>
                  <td className="py-1.5 font-medium text-foreground">
                    {fmt(calc.current.rate, 2)}
                  </td>
                </tr>
                {calc.current.steps.map((s, i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="py-1.5 pr-3 text-muted-foreground">
                      Step {i + 1}
                    </td>
                    <td className="py-1.5 pr-3 text-foreground">{fmt(s.dose, 3)}</td>
                    <td className="py-1.5 text-foreground">{fmt(s.rate, 2)}</td>
                  </tr>
                ))}
                <tr>
                  <td className="py-1.5 pr-3 text-muted-foreground">Final</td>
                  <td className="py-1.5 pr-3 font-medium text-foreground">Stop</td>
                  <td className="py-1.5 font-medium text-foreground">0</td>
                </tr>
              </tbody>
            </table>
            <p className="mt-2 text-[11px] text-muted-foreground">
              Reduce by {fmt(drug.taperStep, 2)} {unitLabel} {drug.taperInterval},
              reassessing sedation and withdrawal signs at each step.
            </p>
          </div>
        ) : (
          <p className="mt-2 text-[11px] text-muted-foreground">
            Enter the current dose above to generate a step-by-step weaning
            schedule (steps of {fmt(drug.taperStep, 2)} {unitLabel}{" "}
            {drug.taperInterval}).
          </p>
        )}
      </div>

      {/* Caution */}
      <p className="mt-4 flex items-start gap-2 rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-xs text-amber-700 dark:text-amber-400">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
        {drug.caution}{" "}
        <Link to={drug.href} className="underline hover:no-underline">
          Full safety profile →
        </Link>
      </p>
    </ToolShell>
  );
}
