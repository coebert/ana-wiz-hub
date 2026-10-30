import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Moon } from "lucide-react";
import { ToolShell } from "@/components/tools/ToolShell";
import { devineIbwKg, sedationMlPerHour } from "@/lib/calculators/t1-calculators";

type DoseUnit = "mg/kg/h" | "micrograms/kg/h" | "micrograms/kg/min";

interface DoseCard { label: string; dose: number; note?: string; emphasis?: boolean }

interface SedationDrug {
  id: string;
  name: string;
  recipe: string;
  /** concentration used for arithmetic, micrograms per mL */
  concUgPerMl: number;
  unit: DoseUnit;
  cards: DoseCard[];
  rangeNote: string;
  weanNote: string;
  caution: string;
  source: { label: string; url: string };
  href: string;
}

const REMI_URL = "https://www.medicines.org.uk/emc/product/794/smpc";

const DRUGS: SedationDrug[] = [
  {
    id: "propofol",
    name: "Propofol 1%",
    recipe: "Neat 1% emulsion — 10 mg/mL",
    concUgPerMl: 10000,
    unit: "mg/kg/h",
    cards: [
      { label: "Arithmetic example (not a universal start)", dose: 1 },
      { label: "Product range low", dose: 0.3 },
      { label: "Product range high", dose: 4 },
    ],
    rangeNote: "Adult ventilated ICU sedation: 0.3–4 mg/kg/h, titrated to the sedation target (SmPC 4.2).",
    weanNote:
      "Wake-up is usually prompt after short infusions; after days of therapy offset is slower. Reduce according to the unit protocol and reassess neurological status as the dose falls.",
    caution:
      "Do not exceed 4 mg/kg/h. Assess for propofol infusion syndrome risk (lactic acidosis, rhabdomyolysis, hypertriglyceridaemia, arrhythmia) throughout treatment, not first at 48 h (SmPC 4.4). Lipid load ≈1.1 kcal/mL — count towards nutrition.",
    source: { label: "Propofol 1% SmPC (emc 15152) 4.1/4.2/4.4", url: "https://www.medicines.org.uk/emc/product/15152/smpc" },
    href: "/intensive-care/drug-safety#propofol-1",
  },
  {
    id: "midazolam",
    name: "Midazolam",
    recipe: "Diluted to 1 mg/mL for this arithmetic (e.g. 50 mg in 50 mL; stock ampoules are stronger)",
    concUgPerMl: 1000,
    unit: "micrograms/kg/h",
    cards: [
      { label: "Product range low", dose: 30 },
      { label: "Product range high", dose: 200 },
    ],
    rangeNote: "Adult ICU maintenance 30–200 micrograms/kg/h (emc 3605). Start at the lower end and titrate individually; elderly, hypovolaemic or high-risk patients may need less (emc 5668 4.2). The 1 mg/mL calculator concentration is a dilution, not the stock strength.",
    weanNote:
      "Context-sensitive half-time rises sharply after >48–72 h, especially in renal failure and obesity. Reduce according to the unit protocol, watch for delayed awakening, and screen for benzodiazepine withdrawal (agitation, tachycardia, hypertension) after prolonged use.",
    caution:
      "Accumulates with prolonged infusion. Avoid in renal failure where possible; metabolite (1-hydroxymidazolam) accumulates. Withdrawal risk after prolonged use.",
    source: { label: "Midazolam SmPCs (emc 3605; emc 5668 4.2)", url: "https://www.medicines.org.uk/emc/product/3605/smpc" },
    href: "/intensive-care/drug-safety#midazolam",
  },
  {
    id: "dexmedetomidine",
    name: "Dexmedetomidine",
    recipe: "400 µg in 50 mL — 8 µg/mL",
    concUgPerMl: 8,
    unit: "micrograms/kg/h",
    cards: [
      { label: "Labelled switch-in rate (already intubated & sedated adult)", dose: 0.7, note: "Frail patients may need a lower start." },
      { label: "Product range low", dose: 0.2 },
      { label: "Product range high", dose: 1.4 },
    ],
    rangeNote: "Adjust within 0.2–1.4 micrograms/kg/h (SmPC 4.2). No loading dose in ICU sedation.",
    weanNote:
      "After longer or higher-rate infusions, reduce gradually per the unit protocol and observe for rebound tachycardia, hypertension and agitation.",
    caution:
      "Bradycardia and hypotension are dose-limiting; no ICU loading bolus. Useful for light, co-operative sedation (RASS 0 to −2) and peri-extubation sedation.",
    source: { label: "Dexmedetomidine SmPC (emc 4783) 4.2/6.6", url: "https://www.medicines.org.uk/emc/product/4783/smpc" },
    href: "/intensive-care/drug-safety#dexmedetomidine",
  },
  {
    id: "remifentanil",
    name: "Remifentanil",
    recipe: "5 mg in 50 mL — 100 µg/mL",
    concUgPerMl: 100,
    unit: "micrograms/kg/min",
    cards: [
      { label: "Initial range low (ventilated adult ICU)", dose: 0.1, emphasis: true },
      { label: "Initial range high", dose: 0.15, emphasis: true },
      { label: "Product reference range low — titrate, not a target", dose: 0.006 },
      { label: "Product reference range high — titrate, not a target", dose: 0.74 },
    ],
    rangeNote: "SmPC: initial 0.1–0.15 micrograms/kg/min, titrated; reference range 0.006–0.74. If sedation is inadequate at 0.2 micrograms/kg/min, add a sedative; further opioid increases address analgesia.",
    weanNote:
      "Product SmPC (emc 794): no residual opioid effect 5–10 min after stopping, but withdrawal (tachycardia, hypertension, agitation) is reported after abrupt cessation, particularly after >3 days. For ICU, establish alternative analgesia and sedation in advance, titrate in stages to 0.1 micrograms/kg/min up to 1 h before extubation; after extubation, reduce in 25% decrements at intervals of at least 10 min until stopped, monitoring carefully during transition. Not recommended beyond 3 days on ICU or in ICU patients under 18; in obesity dose on ideal body weight.",
    caution:
      "Analgesia disappears within minutes of stopping — always have replacement analgesia running first. Muscle rigidity and bradycardia with rapid boluses; titrate the infusion instead.",
    source: { label: "Remifentanil (Aspen) SmPC (emc 794) 4.2.3/4.2.4.2, updated 1 Nov 2024", url: REMI_URL },
    href: "/intensive-care/drug-safety#remifentanil",
  },
];

function fmt(n: number | null, dp = 2): string {
  if (n === null || !Number.isFinite(n)) return "—";
  return n.toLocaleString("en-GB", { maximumFractionDigits: dp });
}
function fmtDose(n: number): string {
  return n.toLocaleString("en-GB", { maximumFractionDigits: 3 });
}

export default function SedationCalculatorTool() {
  const [drugId, setDrugId] = useState("propofol");
  const [weight, setWeight] = useState(70);
  const [heightText, setHeightText] = useState("");
  const [sex, setSex] = useState<"male" | "female">("male");

  const [remiBasis, setRemiBasis] = useState<"" | "actual" | "ibw">("");
  const drug = DRUGS.find((d) => d.id === drugId)!;
  const isRemi = drug.id === "remifentanil";
  const heightNum = heightText.trim() === "" ? NaN : Number(heightText);
  const ibw = isRemi && remiBasis === "ibw" ? devineIbwKg(heightNum, sex) : null;
  const weightValid = Number.isFinite(weight) && weight > 0 && weight <= 300;
  const doseWeight: number | null = !weightValid ? null : !isRemi ? weight : remiBasis === "actual" ? weight : remiBasis === "ibw" ? ibw : null;
  const basisText = !isRemi ? "actual weight" : remiBasis === "actual" ? "actual weight (non-obese)" : "Devine ideal body weight (obesity)";
  const blockMsg = !weightValid
    ? "Enter an adult weight above 0 and up to 300 kg to show pump rates."
    : isRemi && remiBasis === ""
      ? "Select the remifentanil dosing-weight basis to show rates."
      : isRemi && remiBasis === "ibw" && ibw === null
        ? "Enter a valid height ≥152.4 cm for IBW. Shorter adults need a separately validated dosing weight — actual weight is not substituted."
        : null;

  const calc = useMemo(
    () => drug.cards.map((c) => ({ ...c, rate: doseWeight === null ? null : sedationMlPerHour(drug.unit, c.dose, doseWeight, drug.concUgPerMl) })),
    [drug, doseWeight],
  );

  const unitLabel = drug.unit
    .replace("micrograms", "µg")
    .replace("/h", "/h")
    .replace("/min", "/min");

  return (
    <ToolShell
      slug="sedation"
      title="ICU sedation calculator"
      description="Adult ICU teaching tool: product-referenced dose ranges for propofol, midazolam, dexmedetomidine and remifentanil converted to mL/h, with drug-specific weaning principles rather than an automatic schedule."
      intro={
        <>
          <strong>Adults only.</strong> Pick a sedative and enter the patient's
          weight to convert each named product's <strong>referenced dose range</strong>{" "}
          into mL/h. These are arithmetic conversions, not individualised prescriptions; titrate to a
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
        {isRemi && (
          <div className="grid grid-cols-2 gap-2 text-sm">
            <label className="col-span-2 block">
              <span className="text-muted-foreground">Remifentanil dosing-weight basis (SmPC)</span>
              <select aria-label="Remifentanil dosing-weight basis" value={remiBasis} onChange={(e) => setRemiBasis(e.target.value as typeof remiBasis)}
                className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground">
                <option value="">Select basis</option>
                <option value="actual">Non-obese — actual weight</option>
                <option value="ibw">Obese — ideal body weight (Devine)</option>
              </select>
            </label>
            {remiBasis === "ibw" && (
              <>
                <label className="block">
                  <span className="text-muted-foreground">Height (cm, ≥152.4)</span>
                  <input type="number" min={152.4} max={250} step={0.1} value={heightText} onChange={(e) => setHeightText(e.target.value)}
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
              </>
            )}
          </div>
        )}
      </div>

      {/* Dose cards */}
      {blockMsg ? (
        <p role="status" className="mt-5 text-sm text-destructive">{blockMsg}</p>
      ) : (
        <>
          <p className="mt-5 text-xs text-muted-foreground" data-testid="dose-basis">
            Dosing weight: <strong className="text-foreground">{fmt(doseWeight, 3)} kg</strong> ({basisText}) · concentration {fmt(drug.concUgPerMl, 0)} µg/mL
          </p>
          <div className="mt-2 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {calc.map((c) => (
              <div key={c.label} className={`rounded-xl border p-3 ${c.emphasis ? "border-primary/40 bg-primary/5" : "border-border bg-card"}`}>
                <p className="text-xs text-muted-foreground">{c.label}</p>
                <p className="mt-1 font-serif text-xl font-semibold text-foreground">
                  {fmt(c.rate, 2)} <span className="text-sm font-normal text-muted-foreground">mL/h</span>
                </p>
                <p className="text-[11px] text-muted-foreground">{fmtDose(c.dose)} {unitLabel}</p>
                {c.note && <p className="text-[11px] text-muted-foreground">{c.note}</p>}
              </div>
            ))}
          </div>
        </>
      )}
      <p className="mt-2 text-[11px] text-muted-foreground">
        {drug.rangeNote}{" "}
        <a href={drug.source.url} target="_blank" rel="noopener noreferrer" className="underline">{drug.source.label}</a>
      </p>

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
