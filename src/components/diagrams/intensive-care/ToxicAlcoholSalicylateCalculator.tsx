import { useState, useMemo } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";
import { AlertTriangle, CheckCircle2, Activity, RotateCcw } from "lucide-react";

/**
 * Toxic Alcohol & Salicylate Decision Support
 *
 * Three tabs:
 *   1. Methanol           — level, AG, visual symptoms, pH, AKI → fomepizole ± HD
 *   2. Ethylene glycol    — level, AG, oxalate crystals, AKI    → fomepizole ± HD
 *   3. Salicylate         — level, pH, CNS, AKI                 → alkalinisation ± HD
 *
 * All inputs validated with bounds; outputs are recommendations only,
 * cross-referenced with EXTRIP / AACT / TOXBASE guidance.
 */

type Tab = "methanol" | "eg" | "salicylate";
type LevelUnit = "mg/dL" | "mg/L" | "mmol/L";

interface NumFieldProps {
  label: string;
  value: string;
  set: (v: string) => void;
  unit?: string;
  min: number;
  max: number;
  step?: number;
  placeholder?: string;
}

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
const parseNum = (s: string, lo: number, hi: number): number | null => {
  if (s.trim() === "") return null;
  const n = Number(s);
  if (!Number.isFinite(n)) return null;
  return clamp(n, lo, hi);
};

const NumField = ({ label, value, set, unit, min, max, step = 0.1, placeholder }: NumFieldProps) => (
  <label className="block">
    <span className="text-xs font-medium text-foreground">{label}{unit ? <span className="text-muted-foreground"> ({unit})</span> : null}</span>
    <input
      type="number"
      inputMode="decimal"
      value={value}
      min={min}
      max={max}
      step={step}
      placeholder={placeholder}
      onChange={(e) => set(e.target.value.slice(0, 8))}
      className="mt-1 w-full px-2 py-1.5 text-sm rounded border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary"
    />
  </label>
);

const Toggle = ({ label, value, set }: { label: string; value: boolean; set: (v: boolean) => void }) => (
  <button
    onClick={() => set(!value)}
    className={`text-left text-xs px-2.5 py-2 rounded border transition-colors w-full ${
      value ? "border-primary bg-primary/10 text-foreground" : "border-border hover:bg-secondary text-muted-foreground"
    }`}
    aria-pressed={value}
  >
    <span className="font-medium">{value ? "✓" : "○"}</span> {label}
  </button>
);

// Unit conversion to mg/L for the toxin in question
const toMgPerL = (val: number, unit: LevelUnit, mw: number): number => {
  if (unit === "mg/L") return val;
  if (unit === "mg/dL") return val * 10;
  // mmol/L → mg/L = mmol/L × MW
  return val * mw;
};

interface Recommendation {
  level: "ok" | "treat" | "dialyse";
  headline: string;
  actions: string[];
  notes: string[];
}

const useMethanol = () => {
  const [val, setVal] = useState("");
  const [unit, setUnit] = useState<LevelUnit>("mg/dL");
  const [pH, setPH] = useState("");
  const [hco, setHco] = useState("");
  const [visual, setVisual] = useState(false);
  const [aki, setAki] = useState(false);
  const [coma, setComa] = useState(false);
  const [history, setHistory] = useState(false); // strong history without level

  const reset = () => { setVal(""); setUnit("mg/dL"); setPH(""); setHco(""); setVisual(false); setAki(false); setComa(false); setHistory(false); };

  const rec = useMemo<Recommendation>(() => {
    const raw = parseNum(val, 0, 1000);
    const mgL = raw !== null ? toMgPerL(raw, unit, 32) : null;
    const pHv = parseNum(pH, 6.5, 7.8);
    const hcoV = parseNum(hco, 0, 35);

    const treatThreshold = mgL !== null && mgL >= 200; // 20 mg/dL
    const acidaemia = pHv !== null && pHv < 7.3;
    const lowHco = hcoV !== null && hcoV < 18;
    const dialyseLevel = mgL !== null && mgL >= 500; // 50 mg/dL
    const anyEndOrgan = visual || coma || aki;

    if (history && !treatThreshold && !acidaemia && !lowHco && !anyEndOrgan) {
      return {
        level: "treat",
        headline: "Strong history → empirically block ADH while awaiting levels",
        actions: [
          "Fomepizole 15 mg/kg IV loading dose (or ethanol infusion if unavailable — target ethanol 100–150 mg/dL)",
          "Send urgent methanol level, ABG, U&E, lactate, osmolality",
          "Folinic acid 1 mg/kg IV 4-hourly (max 50 mg) — accelerates formate clearance",
        ],
        notes: ["Do not wait for confirmatory levels if history is convincing — irreversible blindness can develop within hours."],
      };
    }

    if (dialyseLevel || acidaemia || anyEndOrgan) {
      return {
        level: "dialyse",
        headline: "Haemodialysis indicated",
        actions: [
          "Continue fomepizole until methanol level < 20 mg/dL (200 mg/L) AND acidosis resolved AND patient asymptomatic",
          "Intermittent HD preferred (high clearance of methanol & formate); CRRT if haemodynamically unstable",
          "Folinic acid 1 mg/kg IV 4-hourly",
          "Sodium bicarbonate if pH < 7.20 — also improves urinary formate excretion",
        ],
        notes: [
          "EXTRIP recommends HD for methanol > 50 mg/dL, pH < 7.15, vision impairment, coma/seizures, or AKI.",
          "Methanol dosing of fomepizole must be increased during HD (every 4 h instead of 12 h).",
        ],
      };
    }

    if (treatThreshold) {
      return {
        level: "treat",
        headline: "Block alcohol-dehydrogenase",
        actions: [
          "Fomepizole 15 mg/kg IV load, then 10 mg/kg q12h × 4 doses, then 15 mg/kg q12h",
          "Folinic acid 1 mg/kg IV 4-hourly",
          "Repeat methanol level, ABG, AG every 2–4 h",
        ],
        notes: ["Watch for evolving acidosis or end-organ injury → escalate to HD."],
      };
    }

    if (mgL === null) {
      return { level: "ok", headline: "Awaiting data", actions: [], notes: ["Enter a methanol level and key clinical features."] };
    }

    return {
      level: "ok",
      headline: "Below toxic threshold",
      actions: ["Observe, repeat level in 2–4 h", "Reassess if clinical features develop or AG widens"],
      notes: ["Threshold for treatment is methanol ≥ 20 mg/dL (200 mg/L) — lower if history strong or evolving acidosis."],
    };
  }, [val, unit, pH, hco, visual, aki, coma, history]);

  return { val, setVal, unit, setUnit, pH, setPH, hco, setHco, visual, setVisual, aki, setAki, coma, setComa, history, setHistory, rec, reset };
};

const useEthyleneGlycol = () => {
  const [val, setVal] = useState("");
  const [unit, setUnit] = useState<LevelUnit>("mg/dL");
  const [pH, setPH] = useState("");
  const [oxalate, setOxalate] = useState(false);
  const [aki, setAki] = useState(false);
  const [history, setHistory] = useState(false);

  const reset = () => { setVal(""); setUnit("mg/dL"); setPH(""); setOxalate(false); setAki(false); setHistory(false); };

  const rec = useMemo<Recommendation>(() => {
    const raw = parseNum(val, 0, 1000);
    const mgL = raw !== null ? toMgPerL(raw, unit, 62) : null;
    const pHv = parseNum(pH, 6.5, 7.8);

    const treatThreshold = mgL !== null && mgL >= 200;
    const acidaemia = pHv !== null && pHv < 7.3;
    const dialyseLevel = mgL !== null && mgL >= 500;

    if (history && !treatThreshold && !acidaemia && !oxalate && !aki) {
      return {
        level: "treat",
        headline: "Strong history → block ADH empirically",
        actions: [
          "Fomepizole 15 mg/kg IV load",
          "Send EG level, ABG, U&E, Ca²⁺ (hypocalcaemia from oxalate chelation), urine microscopy for crystals",
          "Pyridoxine 50 mg IV q6h + thiamine 100 mg IV q6h — shunt glyoxylate toward non-toxic metabolites",
        ],
        notes: ["EG itself isn't toxic — toxicity comes from glycolate (acidosis) and oxalate (AKI). Earlier ADH blockade = less injury."],
      };
    }

    if (dialyseLevel || acidaemia || aki || oxalate) {
      return {
        level: "dialyse",
        headline: "Haemodialysis indicated",
        actions: [
          "Continue fomepizole until EG level < 20 mg/dL AND acidosis resolved",
          "Intermittent HD (high clearance of EG, glycolate); fomepizole q4h during HD",
          "Pyridoxine + thiamine cofactors",
          "Correct hypocalcaemia (monitor — repletion may worsen oxalate deposition if EG still present)",
        ],
        notes: [
          "EXTRIP suggests HD for EG > 50 mg/dL, pH < 7.30, end-organ injury, or oxalate crystalluria.",
          "Fomepizole monotherapy reasonable if levels low, no AKI, no acidosis, and HD logistically difficult.",
        ],
      };
    }

    if (treatThreshold) {
      return {
        level: "treat",
        headline: "Block alcohol-dehydrogenase",
        actions: [
          "Fomepizole 15 mg/kg load, then 10 mg/kg q12h × 4, then 15 mg/kg q12h",
          "Pyridoxine 50 mg IV q6h + thiamine 100 mg IV q6h",
          "Repeat EG level, ABG, AG, Ca²⁺, renal function every 2–4 h",
        ],
        notes: ["Reassess for HD if acidosis or AKI develops."],
      };
    }

    if (mgL === null) return { level: "ok", headline: "Awaiting data", actions: [], notes: ["Enter ethylene glycol level and key features."] };

    return {
      level: "ok",
      headline: "Below toxic threshold",
      actions: ["Observe, repeat level in 2–4 h", "Reassess if AG widens, AKI develops, or crystals appear in urine"],
      notes: ["Treatment threshold EG ≥ 20 mg/dL (200 mg/L)."],
    };
  }, [val, unit, pH, oxalate, aki, history]);

  return { val, setVal, unit, setUnit, pH, setPH, oxalate, setOxalate, aki, setAki, history, setHistory, rec, reset };
};

const useSalicylate = () => {
  const [val, setVal] = useState("");
  const [unit, setUnit] = useState<LevelUnit>("mg/L");
  const [pH, setPH] = useState("");
  const [cns, setCns] = useState(false);
  const [aki, setAki] = useState(false);
  const [pulm, setPulm] = useState(false); // pulmonary/cerebral oedema
  const [chronic, setChronic] = useState(false);

  const reset = () => { setVal(""); setUnit("mg/L"); setPH(""); setCns(false); setAki(false); setPulm(false); setChronic(false); };

  const rec = useMemo<Recommendation>(() => {
    // Convert to mg/L (MW 180 for mmol conversion)
    const raw = parseNum(val, 0, 2000);
    const mgL = raw !== null ? toMgPerL(raw, unit, 180) : null;
    const pHv = parseNum(pH, 6.5, 7.8);

    const acuteHD = mgL !== null && mgL >= 700;
    const chronicHD = chronic && mgL !== null && mgL >= 500;
    const severeAcid = pHv !== null && pHv < 7.20;
    const endOrgan = cns || aki || pulm;
    const treatLevel = mgL !== null && mgL >= 300;

    if (acuteHD || chronicHD || severeAcid || endOrgan) {
      return {
        level: "dialyse",
        headline: "Haemodialysis indicated (EXTRIP 2015)",
        actions: [
          "Urgent intermittent HD — high clearance of salicylate (small MW, low protein binding at toxic levels)",
          "Continue IV NaHCO₃ infusion (1.26% or 8.4% diluted) — urinary pH target 7.5–8.5",
          "Aggressive K⁺ replacement (alkalinisation fails without normokalaemia)",
          "Avoid intubation if possible — sudden ↓ minute ventilation lets PaCO₂ rise → CNS salicylate ↑; if essential, match the patient's pre-intubation minute ventilation and avoid sedative-induced hypoventilation",
        ],
        notes: [
          "EXTRIP: HD if salicylate > 700 mg/L (acute) or > 500 mg/L (chronic), altered mental status, pulmonary/cerebral oedema, AKI, or pH < 7.20 despite optimal therapy.",
          "Activated charcoal still useful within 1–2 h of ingestion; multiple doses for enteric-coated preparations.",
        ],
      };
    }

    if (treatLevel) {
      return {
        level: "treat",
        headline: "Urinary alkalinisation",
        actions: [
          "1.5 L of 1.26% NaHCO₃ over 2 h, then titrate to urinary pH 7.5–8.5",
          "Add 40 mmol KCl per litre — replace to keep serum K⁺ > 4.0 mmol/L",
          "Repeat salicylate level, ABG, U&E every 2 h until trending down",
          "Glucose 5–10% if any neuroglycopaenia (CSF glucose may be low despite normal serum glucose)",
        ],
        notes: [
          "Mechanism: alkaline urine traps ionised salicylate (pKa 3.5) in the tubule → 10–20× ↑ in clearance.",
          "Stop or reduce bicarbonate if serum pH > 7.55.",
        ],
      };
    }

    if (mgL === null) return { level: "ok", headline: "Awaiting data", actions: [], notes: ["Enter salicylate level and key features."] };

    return {
      level: "ok",
      headline: "Below treatment threshold",
      actions: ["Observe, repeat level in 2 h (absorption ongoing, especially enteric-coated)", "Treat symptomatically; ensure rehydration and K⁺ replete"],
      notes: ["Reassess if level rising, AG widening, or any CNS / respiratory features develop."],
    };
  }, [val, unit, pH, cns, aki, pulm, chronic]);

  return { val, setVal, unit, setUnit, pH, setPH, cns, setCns, aki, setAki, pulm, setPulm, chronic, setChronic, rec, reset };
};

const RecCard = ({ rec }: { rec: Recommendation }) => {
  const cls =
    rec.level === "dialyse" ? "border-destructive/40 bg-destructive/5"
    : rec.level === "treat" ? "border-yellow-500/40 bg-yellow-500/5"
    : "border-primary/30 bg-primary/5";
  const Icon = rec.level === "dialyse" ? AlertTriangle : rec.level === "treat" ? Activity : CheckCircle2;
  return (
    <div className={`p-3 rounded-md border ${cls} animate-fade-in`} key={rec.headline}>
      <div className="flex items-start gap-2">
        <Icon className="h-4 w-4 mt-0.5 shrink-0 text-foreground" />
        <p className="text-sm font-semibold text-foreground">{rec.headline}</p>
      </div>
      {rec.actions.length > 0 && (
        <ul className="list-disc list-inside space-y-1 text-sm text-foreground mt-2">
          {rec.actions.map((a, i) => <li key={i}>{a}</li>)}
        </ul>
      )}
      {rec.notes.length > 0 && (
        <div className="mt-2 text-xs text-muted-foreground space-y-1">
          {rec.notes.map((n, i) => <p key={i}>{n}</p>)}
        </div>
      )}
    </div>
  );
};

const UnitToggle = ({ value, set, units }: { value: LevelUnit; set: (u: LevelUnit) => void; units: LevelUnit[] }) => (
  <div className="mt-1 inline-flex rounded border border-border overflow-hidden text-[10px] w-full">
    {units.map((u) => (
      <button key={u} onClick={() => set(u)}
        className={`flex-1 px-1 py-0.5 transition-colors ${value === u ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}>
        {u}
      </button>
    ))}
  </div>
);

const ToxicAlcoholSalicylateCalculator = () => {
  const [tab, setTab] = useState<Tab>("methanol");
  const meth = useMethanol();
  const eg = useEthyleneGlycol();
  const sal = useSalicylate();

  const tabs: { key: Tab; label: string }[] = [
    { key: "methanol", label: "Methanol" },
    { key: "eg", label: "Ethylene glycol" },
    { key: "salicylate", label: "Salicylate" },
  ];

  const activeReset = tab === "methanol" ? meth.reset : tab === "eg" ? eg.reset : sal.reset;

  return (
    <DiagramFigure
      id="toxic-alcohol-salicylate-calculator"
      title="Toxic Alcohol & Salicylate Decision Support"
      description="Interactive decision support: enter level (mg/dL, mg/L, mmol/L), pH, end-organ features. Returns treatment level (observation, ADH blockade / urinary alkalinisation, or haemodialysis) aligned with EXTRIP guidance."
    >
      <div className="border border-border rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
          <div className="inline-flex rounded border border-border overflow-hidden text-xs">
            {tabs.map((t) => (
              <button key={t.key} onClick={() => setTab(t.key)}
                className={`px-3 py-1.5 transition-colors ${tab === t.key ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}>
                {t.label}
              </button>
            ))}
          </div>
          <button onClick={activeReset} className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded border border-border hover:bg-secondary transition-colors">
            <RotateCcw className="h-3 w-3" /> Reset
          </button>
        </div>

        {tab === "methanol" && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <NumField label="Methanol level" value={meth.val} set={meth.setVal} unit={meth.unit} min={0} max={1000} step={1} placeholder="e.g. 25" />
                <UnitToggle value={meth.unit} set={meth.setUnit} units={["mg/dL", "mg/L", "mmol/L"]} />
              </div>
              <NumField label="Arterial pH" value={meth.pH} set={meth.setPH} min={6.5} max={7.8} step={0.01} placeholder="e.g. 7.20" />
              <NumField label="HCO₃⁻" value={meth.hco} set={meth.setHco} unit="mmol/L" min={0} max={35} step={1} placeholder="e.g. 12" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <Toggle label="Visual symptoms" value={meth.visual} set={meth.setVisual} />
              <Toggle label="Coma / seizures" value={meth.coma} set={meth.setComa} />
              <Toggle label="AKI" value={meth.aki} set={meth.setAki} />
              <Toggle label="Strong history (no level yet)" value={meth.history} set={meth.setHistory} />
            </div>
            <RecCard rec={meth.rec} />
            <details className="text-xs text-muted-foreground">
              <summary className="cursor-pointer text-foreground font-medium">Worked example</summary>
              <div className="mt-2 p-3 rounded border border-border bg-secondary/30">
                Methanol 65 mg/dL, pH 7.18, HCO₃⁻ 10, blurred vision. → Marked acidosis + visual symptoms + level &gt; 50 mg/dL → <strong>HD + fomepizole + folinic acid + bicarbonate</strong>.
              </div>
            </details>
          </div>
        )}

        {tab === "eg" && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <NumField label="Ethylene glycol level" value={eg.val} set={eg.setVal} unit={eg.unit} min={0} max={1000} step={1} placeholder="e.g. 25" />
                <UnitToggle value={eg.unit} set={eg.setUnit} units={["mg/dL", "mg/L", "mmol/L"]} />
              </div>
              <NumField label="Arterial pH" value={eg.pH} set={eg.setPH} min={6.5} max={7.8} step={0.01} placeholder="e.g. 7.25" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <Toggle label="Oxalate crystals in urine" value={eg.oxalate} set={eg.setOxalate} />
              <Toggle label="AKI" value={eg.aki} set={eg.setAki} />
              <Toggle label="Strong history (no level yet)" value={eg.history} set={eg.setHistory} />
            </div>
            <RecCard rec={eg.rec} />
            <details className="text-xs text-muted-foreground">
              <summary className="cursor-pointer text-foreground font-medium">Worked example</summary>
              <div className="mt-2 p-3 rounded border border-border bg-secondary/30">
                EG 80 mg/dL, pH 7.10, oxaluria, creatinine doubling. → All three HD triggers → <strong>HD + fomepizole + pyridoxine + thiamine + Ca²⁺ correction</strong>.
              </div>
            </details>
          </div>
        )}

        {tab === "salicylate" && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <NumField label="Salicylate level" value={sal.val} set={sal.setVal} unit={sal.unit} min={0} max={2000} step={1} placeholder="e.g. 450" />
                <UnitToggle value={sal.unit} set={sal.setUnit} units={["mg/L", "mg/dL", "mmol/L"]} />
              </div>
              <NumField label="Arterial pH" value={sal.pH} set={sal.setPH} min={6.5} max={7.8} step={0.01} placeholder="e.g. 7.35" />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <Toggle label="Altered mental state" value={sal.cns} set={sal.setCns} />
              <Toggle label="AKI" value={sal.aki} set={sal.setAki} />
              <Toggle label="Pulmonary / cerebral oedema" value={sal.pulm} set={sal.setPulm} />
              <Toggle label="Chronic ingestion" value={sal.chronic} set={sal.setChronic} />
            </div>
            <RecCard rec={sal.rec} />
            <details className="text-xs text-muted-foreground">
              <summary className="cursor-pointer text-foreground font-medium">Worked example</summary>
              <div className="mt-2 p-3 rounded border border-border bg-secondary/30">
                Acute aspirin OD, salicylate 650 mg/L, pH 7.32, K⁺ 3.4, alert. → Below acute HD threshold but at the boundary → <strong>urinary alkalinisation + aggressive K⁺ replacement</strong>, recheck level in 2 h; escalate to HD if level rises &gt; 700 mg/L, pH falls &lt; 7.20, or CNS features develop.
              </div>
            </details>
          </div>
        )}

        <p className="mt-4 text-[10px] text-muted-foreground italic">
          Decision support only — confirm with local toxicology / NPIS-TOXBASE before acting. Thresholds based on EXTRIP workgroup recommendations.
        </p>
      </div>
    </DiagramFigure>
  );
};

export default ToxicAlcoholSalicylateCalculator;
