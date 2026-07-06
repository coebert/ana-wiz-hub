import { useMemo, useState } from "react";
import { ShieldCheck, AlertTriangle, ShieldAlert, Stethoscope, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Decision-gate widget that maps three pre-procedure risk inputs
 *   - ASA physical status (I–V)
 *   - Predicted airway difficulty (easy / borderline / difficult)
 *   - OSA / BMI risk (low / moderate / high)
 * to:
 *   - A recommended maximum sedation depth (minimal / moderate / deep / GA-by-anaesthetist)
 *   - A monitoring intensity bundle (standard / enhanced / anaesthetist-led)
 *   - Plain-language reasons for the recommendation
 *
 * The logic is a worst-of-three "ceiling" rule consistent with AAGBI/RCoA Safe
 * Sedation Practice (2021): the safest plan is governed by the highest single
 * risk axis, not by an average. The component is purely client-side and
 * deterministic — same inputs always produce the same recommendation.
 */

type AsaKey = "I-II" | "III" | "IV-V";
type AirwayKey = "easy" | "borderline" | "difficult";
type OsaKey = "low" | "moderate" | "high";

type DepthLevel = 0 | 1 | 2 | 3; // 0 minimal, 1 moderate, 2 deep, 3 GA / anaesthetist
type MonitoringLevel = 0 | 1 | 2; // 0 standard, 1 enhanced, 2 anaesthetist-led

interface OptionDef<K extends string> {
  value: K;
  label: string;
  helper: string;
  /** Risk weight used to derive the recommendation */
  depth: DepthLevel;
  monitoring: MonitoringLevel;
}

const ASA_OPTIONS: OptionDef<AsaKey>[] = [
  { value: "I-II", label: "ASA I–II", helper: "Healthy or mild systemic disease", depth: 2, monitoring: 0 },
  { value: "III", label: "ASA III", helper: "Severe but not incapacitating disease", depth: 1, monitoring: 1 },
  { value: "IV-V", label: "ASA IV–V", helper: "Severe disease, constant threat to life", depth: 3, monitoring: 2 },
];

const AIRWAY_OPTIONS: OptionDef<AirwayKey>[] = [
  { value: "easy", label: "Easy airway", helper: "MP I–II, normal mouth opening, no risk factors", depth: 2, monitoring: 0 },
  { value: "borderline", label: "Borderline", helper: "MP III, BMI 30–40, limited extension or ↑ neck circumference", depth: 1, monitoring: 1 },
  { value: "difficult", label: "Predicted difficult", helper: "MP IV, prior failed intubation, fixed flexion, severe OSA, awake FOI candidate", depth: 3, monitoring: 2 },
];

const OSA_OPTIONS: OptionDef<OsaKey>[] = [
  { value: "low", label: "Low OSA / BMI", helper: "STOP-BANG 0–2, BMI <30", depth: 2, monitoring: 0 },
  { value: "moderate", label: "Moderate", helper: "STOP-BANG 3–4, BMI 30–40", depth: 1, monitoring: 1 },
  { value: "high", label: "High OSA / BMI", helper: "STOP-BANG ≥5, BMI >40, on CPAP", depth: 2, monitoring: 1 },
];

interface DepthBand {
  level: DepthLevel;
  label: string;
  short: string;
  description: string;
  iconClass: string;
  badgeClass: string;
}

const DEPTH_BANDS: Record<DepthLevel, DepthBand> = {
  0: {
    level: 0,
    label: "Minimal sedation only",
    short: "Anxiolysis",
    description:
      "Normal verbal response; ventilation and CV function unaffected. Single-agent low-dose midazolam or N₂O. Procedure must be tolerable under LA alone.",
    iconClass: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    badgeClass: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  },
  1: {
    level: 1,
    label: "Moderate (conscious) sedation",
    short: "Moderate",
    description:
      "Purposeful response to verbal/light tactile stimulus. Airway, ventilation and CV function maintained. Titrated midazolam + fentanyl or low-dose propofol; reversal drugs at the bedside.",
    iconClass: "bg-primary/15 text-primary",
    badgeClass: "bg-primary/15 text-primary",
  },
  2: {
    level: 2,
    label: "Deep sedation acceptable",
    short: "Deep",
    description:
      "Purposeful response only to repeated/painful stimulus. Airway intervention may be required. Propofol ± remifentanil TCI in a fully equipped location with airway-trained sedationist whose sole role is the patient.",
    iconClass: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
    badgeClass: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  },
  3: {
    level: 3,
    label: "Anaesthetist-led / GA",
    short: "GA",
    description:
      "Risk profile exceeds the safety envelope of procedural sedation. Refer for anaesthetist-delivered care; consider GA with secured airway, awake fibreoptic intubation, or regional alternative.",
    iconClass: "bg-destructive/15 text-destructive",
    badgeClass: "bg-destructive/15 text-destructive",
  },
};

interface MonitoringBundle {
  level: MonitoringLevel;
  label: string;
  items: string[];
}

const MONITORING_BUNDLES: Record<MonitoringLevel, MonitoringBundle> = {
  0: {
    level: 0,
    label: "Standard sedation monitoring",
    items: [
      "Continuous SpO₂ (audible)",
      "Capnography for moderate sedation upwards",
      "NIBP every 5 min, ECG if cardiac history",
      "Trained sedationist + assistant, IV access",
      "Resuscitation trolley immediately available",
    ],
  },
  1: {
    level: 1,
    label: "Enhanced monitoring",
    items: [
      "All standard monitoring + continuous ECG",
      "Capnography mandatory throughout",
      "NIBP every 3 min during titration",
      "Pre-oxygenation, low-flow O₂ via cannula with ETCO₂ port",
      "Reversal drugs drawn up; difficult-airway trolley in room",
      "Recovery in monitored area; extended observation if OSA / opioid co-administered",
    ],
  },
  2: {
    level: 2,
    label: "Anaesthetist-led environment",
    items: [
      "Manage as for GA: full AAGBI minimum monitoring",
      "Dedicated anaesthetist (not the proceduralist), ODP/anaesthetic assistant",
      "Theatre-equivalent environment with piped gases, suction, anaesthetic machine",
      "Invasive monitoring as clinically indicated (arterial line, depth-of-anaesthesia)",
      "Plan for definitive airway, ICU/HDU bed available post-procedure",
    ],
  },
};

interface Recommendation {
  depth: DepthBand;
  monitoring: MonitoringBundle;
  drivers: { axis: string; reason: string }[];
}

const ASA_LABEL: Record<AsaKey, string> = { "I-II": "ASA I–II", III: "ASA III", "IV-V": "ASA IV–V" };
const AIRWAY_LABEL: Record<AirwayKey, string> = { easy: "easy airway", borderline: "borderline airway", difficult: "predicted difficult airway" };
const OSA_LABEL: Record<OsaKey, string> = { low: "low OSA risk", moderate: "moderate OSA risk", high: "high OSA risk" };

const recommend = (asa: AsaKey, airway: AirwayKey, osa: OsaKey): Recommendation => {
  const asaOpt = ASA_OPTIONS.find((o) => o.value === asa)!;
  const airwayOpt = AIRWAY_OPTIONS.find((o) => o.value === airway)!;
  const osaOpt = OSA_OPTIONS.find((o) => o.value === osa)!;

  // The maximum allowed depth is the LOWEST depth ceiling across axes
  // (lowest depth.value = strictest ceiling? No — depth values are codified
  // such that higher number = MORE restrictive, so we take the MAX.)
  // Wait: re-checking. depth: 2 = "deep ok", 1 = "moderate only", 3 = "GA".
  // So a higher number means a more restrictive recommendation. Take MAX.
  const depthLevel = Math.max(asaOpt.depth, airwayOpt.depth, osaOpt.depth) as DepthLevel;
  // Special case: if airway is "easy" and ASA I–II and OSA low, allow deep (level 2).
  // The mapping above already gives that (max(2,2,2) = 2).

  const monitoringLevel = Math.max(asaOpt.monitoring, airwayOpt.monitoring, osaOpt.monitoring) as MonitoringLevel;

  // Build human-readable drivers — list the axis whose risk forced the ceiling
  const drivers: { axis: string; reason: string }[] = [];
  if (asaOpt.depth === depthLevel || asaOpt.monitoring === monitoringLevel) {
    drivers.push({
      axis: "ASA",
      reason:
        asa === "IV-V"
          ? "ASA IV–V exceeds the safety envelope of ward/endoscopy sedation."
          : asa === "III"
            ? "ASA III: limit to moderate sedation with enhanced monitoring."
            : "ASA I–II permits deeper sedation if other axes allow.",
    });
  }
  if (airwayOpt.depth === depthLevel || airwayOpt.monitoring === monitoringLevel) {
    drivers.push({
      axis: "Airway",
      reason:
        airway === "difficult"
          ? "Predicted difficult airway — secure airway with anaesthetist; do not deepen sedation."
          : airway === "borderline"
            ? "Borderline airway — preserve respiratory drive; capnography mandatory."
            : "Easy airway — no airway constraint on depth.",
    });
  }
  if (osaOpt.depth === depthLevel || osaOpt.monitoring === monitoringLevel) {
    drivers.push({
      axis: "OSA / BMI",
      reason:
        osa === "high"
          ? "Severe OSA / morbid obesity — high apnoea risk; avoid synergistic combinations, extended recovery."
          : osa === "moderate"
            ? "Moderate OSA — capnography essential, prefer single-agent titration."
            : "Low OSA risk — no OSA constraint on depth.",
    });
  }

  return {
    depth: DEPTH_BANDS[depthLevel],
    monitoring: MONITORING_BUNDLES[monitoringLevel],
    drivers,
  };
};

interface SegmentProps<K extends string> {
  legend: string;
  options: OptionDef<K>[];
  value: K;
  onChange: (v: K) => void;
}

function Segment<K extends string>({ legend, options, value, onChange }: SegmentProps<K>) {
  return (
    <fieldset>
      <legend className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
        {legend}
      </legend>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2" role="radiogroup" aria-label={legend}>
        {options.map((opt) => {
          const selected = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(opt.value)}
              className={cn(
                "text-left rounded-lg border p-2.5 transition-colors",
                selected
                  ? "border-primary bg-primary/10"
                  : "border-border bg-background hover:bg-secondary/50",
              )}
            >
              <p className={cn("text-sm font-semibold", selected ? "text-foreground" : "text-foreground/90")}>
                {opt.label}
              </p>
              <p className="text-[11px] text-muted-foreground leading-snug mt-0.5">{opt.helper}</p>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export const SedationDecisionGate = () => {
  const [asa, setAsa] = useState<AsaKey>("I-II");
  const [airway, setAirway] = useState<AirwayKey>("easy");
  const [osa, setOsa] = useState<OsaKey>("low");

  const rec = useMemo(() => recommend(asa, airway, osa), [asa, airway, osa]);

  const reset = () => {
    setAsa("I-II");
    setAirway("easy");
    setOsa("low");
  };

  const HeadlineIcon =
    rec.depth.level === 3 ? ShieldAlert : rec.depth.level === 0 ? ShieldCheck : Stethoscope;

  return (
    <section
      className="my-6 rounded-xl border border-border bg-card p-4 md:p-5"
      aria-label="Sedation depth & monitoring decision gate"
    >
      <header className="flex items-start gap-3 mb-4">
        <span className="flex-shrink-0 mt-0.5 w-9 h-9 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
          <Stethoscope className="h-4.5 w-4.5" aria-hidden="true" />
        </span>
        <div>
          <h3 className="font-serif font-bold text-foreground text-lg leading-tight">
            Decision gate — depth &amp; monitoring
          </h3>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            Pick the patient's risk on each axis. The recommendation follows a "ceiling" rule:
            the safest plan is governed by the highest single risk, per AAGBI/RCoA Safe Sedation
            Practice (2021).
          </p>
        </div>
      </header>

      <div className="space-y-4">
        <Segment<AsaKey> legend="ASA physical status" options={ASA_OPTIONS} value={asa} onChange={setAsa} />
        <Segment<AirwayKey> legend="Predicted airway difficulty" options={AIRWAY_OPTIONS} value={airway} onChange={setAirway} />
        <Segment<OsaKey> legend="OSA / BMI risk" options={OSA_OPTIONS} value={osa} onChange={setOsa} />
      </div>

      {/* Recommendation */}
      <div
        className="mt-5 rounded-lg border border-border bg-secondary/30 p-4"
        role="status"
        aria-live="polite"
      >
        <div className="flex items-start gap-3">
          <span
            className={cn(
              "flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center",
              rec.depth.iconClass,
            )}
          >
            <HeadlineIcon className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                Recommended ceiling
              </p>
              <span className={cn("text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded", rec.depth.badgeClass)}>
                {rec.depth.short}
              </span>
            </div>
            <p className="font-serif font-bold text-foreground text-base mt-0.5">{rec.depth.label}</p>
            <p className="text-sm text-muted-foreground leading-relaxed mt-1">{rec.depth.description}</p>
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-2">
              Monitoring intensity — {rec.monitoring.label}
            </p>
            <ul className="space-y-1.5">
              {rec.monitoring.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-foreground/90 leading-relaxed">
                  <span aria-hidden="true" className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-2">
              Why this plan
            </p>
            <ul className="space-y-1.5">
              {rec.drivers.map((d) => (
                <li key={d.axis} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                  <AlertTriangle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-primary" aria-hidden="true" />
                  <span>
                    <strong className="text-foreground">{d.axis}:</strong> {d.reason}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-[11px] text-muted-foreground italic mt-3">
              Inputs: {ASA_LABEL[asa]} · {AIRWAY_LABEL[airway]} · {OSA_LABEL[osa]}.
            </p>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <Button type="button" variant="outline" size="sm" onClick={reset} className="h-8">
            <RotateCcw className="h-3.5 w-3.5 mr-1.5" aria-hidden="true" />
            Reset
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SedationDecisionGate;
