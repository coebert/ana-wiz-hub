import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Moon } from "lucide-react";
import { ToolShell } from "@/components/tools/ToolShell";
import { devineIbwKg, sedationMlPerHour } from "@/lib/calculators/t1-calculators";

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
    weanNote:
      "Wake-up is usually prompt after short infusions; after days of therapy offset is slower. Reduce according to the unit protocol and reassess neurological status as the dose falls.",
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
    weanNote:
      "Context-sensitive half-time rises sharply after >48–72 h, especially in renal failure and obesity. Reduce according to the unit protocol, watch for delayed awakening, and screen for benzodiazepine withdrawal (agitation, tachycardia, hypertension) after prolonged use.",
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
    weanNote:
      "After longer or higher-rate infusions, reduce gradually per the unit protocol and observe for rebound tachycardia, hypertension and agitation.",
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
    weanNote:
      "Product SmPC (emc 794): no residual opioid effect 5–10 min after stopping, but withdrawal (tachycardia, hypertension, agitation) is reported after abrupt cessation, particularly after >3 days. For ICU, establish alternative analgesia and sedation in advance, titrate in stages to 0.1 micrograms/kg/min up to 1 h before extubation, then reduce in 25% decrements at intervals of at least 10 min until stopped, monitoring carefully during transition. Not recommended beyond 3 days on ICU or in ICU patients under 18; in obesity dose on ideal body weight.",
    caution:
      "Use the weight below as ideal body weight in obese patients (SmPC). Analgesia disappears within minutes of stopping — always have replacement analgesia running first. Muscle rigidity and bradycardia with rapid boluses; titrate the infusion instead.",
    href: "/intensive-care/drug-safety#remifentanil",
  },
];

function fmt(n: number | null, dp = 2): string {
  if (n === null || !Number.isFinite(n)) return "—";
  return n.toLocaleString("en-GB", { maximumFractionDigits: dp });
}

export default function SedationCalculatorTool() {
  const [drugId, setDrugId] = useState("propofol");
  const [weight, setWeight] = useState(70);
  const [heightText, setHeightText] = useState("");
  const [sex, setSex] = useState<"male" | "female">("male");

  const drug = DRUGS.find((d) => d.id === drugId)!;
  const ibw = drug.id === "remifentanil" ? devineIbwKg(Number(heightText), sex) : null;
  const doseWeight = drug.id === "remifentanil" && ibw !== null ? Math.min(ibw, weight) : weight;
  const weightValid = Number.isFinite(weight) && weight > 0 && weight <= 300;

  const calc = useMemo(() => {
    const rate = (dose: number) => sedationMlPerHour(drug.unit, dose, doseWeight, drug.concUgPerMl);
    return {
      start: { dose: drug.start, rate: rate(drug.start) },
      min: { dose: drug.maintenanceMin, rate: rate(drug.maintenanceMin) },
      max: { dose: drug.maintenanceMax, rate: rate(drug.maintenanceMax) },
    };
  }, [drug, doseWeight]);

  const unitLabel = drug.unit
    .replace("micrograms", "µg")
    .replace("/h", "/h")
    .replace("/min", "/min");

  return (
    <ToolShell
      slug="sedation"
      title="ICU sedation calculator"
      description="Adult ICU teaching tool: start and maintenance rates for propofol, midazolam, dexmedetomidine and remifentanil converted to mL/h, with drug-specific weaning principles rather than an automatic schedule."
      intro={
        <>
          <strong>Adults only.</strong> Pick a sedative and enter the patient's
          weight to convert the listed <strong>start rate</strong> and{" "}
          <strong>maintenance range</strong> into mL/h. The listed doses are
          teaching values, not individualised prescriptions; titrate to a
          documented RASS target (the target is not used in the arithmetic).
          No automatic weaning schedule is produced. Full safety data for each drug is on its{" "}
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
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="text-muted-foreground">Adult weight (kg){drug.id === "remifentanil" ? " — actual" : ""}</span>
          <input
            type="number" min={0.5} max={300} step={0.5} value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground"
          />
        </label>
        {drug.id === "remifentanil" && (
          <div className="grid grid-cols-2 gap-2 text-sm">
            <label className="block">
              <span className="text-muted-foreground">Height (cm) for IBW</span>
              <input type="number" min={152} max={250} value={heightText} onChange={(e) => setHeightText(e.target.value)}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground" />
            </label>
            <label className="block">
              <span className="text-muted-foreground">Sex (IBW)</span>
              <select value={sex} onChange={(e) => setSex(e.target.value as "male" | "female")}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </label>
            <p className="col-span-2 text-[11px] text-muted-foreground">
              {ibw !== null ? `Dosing weight ${fmt(doseWeight, 1)} kg (lower of actual and Devine IBW ${fmt(ibw, 1)} kg).` : "Enter height (≥152 cm) to dose on ideal body weight; otherwise actual weight is used."}
            </p>
          </div>
        )}
      </div>

      {/* Start + maintenance */}
      {!weightValid ? (
        <p role="status" className="mt-5 text-sm text-destructive">Enter an adult weight above 0 and up to 300 kg to show pump rates.</p>
      ) : (
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
      )}

      {/* Weaning schedule */}
      <div className="mt-5 rounded-xl border border-border bg-card p-4">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <Moon className="h-4 w-4 text-primary" />
          Weaning principles — {drug.name}
        </h2>
        <p className="mt-2 text-xs text-muted-foreground">{drug.weanNote}</p>

        <p className="mt-2 text-[11px] text-muted-foreground">
          Weaning is a clinical decision: reduce according to the unit protocol,
          exposure duration and the patient's response, reassessing sedation,
          pain and withdrawal at every step. This tool does not generate a
          step-down table or a stop time.
        </p>
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
