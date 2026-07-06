import { useState } from "react";
import {
  AlertTriangle,
  Activity,
  Wind,
  Brain,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Interactive escalation ladders for the three "must-not-miss" sedation
 * emergencies: hypoventilation, airway obstruction, and over-sedation.
 *
 * Each scenario is a stepwise rescue ladder. The user clicks "Next step"
 * to walk through the escalation; previously-revealed steps stay visible so
 * the full pathway is built up on screen. A reset button restarts the ladder.
 *
 * Steps mirror AAGBI/RCoA Safe Sedation Practice (2021), DAS guidelines and
 * standard ALS escalation pathways. Final "stop" step represents conversion
 * to formal anaesthetic / call-for-help — i.e. the patient has left the
 * "procedural sedation" envelope.
 */

type Severity = "assess" | "act" | "rescue" | "escalate";

interface Step {
  label: string;
  detail: string;
  severity: Severity;
}

interface Scenario {
  id: string;
  title: string;
  trigger: string;
  icon: typeof Wind;
  /** Token name (without `hsl(var(...))`) used for the accent colour */
  accentVar: string;
  steps: Step[];
}

const SCENARIOS: Scenario[] = [
  {
    id: "hypoventilation",
    title: "Hypoventilation / respiratory depression",
    trigger:
      "ETCO₂ rising or trace lost · SpO₂ falling · RR <8 · shallow chest movement",
    icon: Wind,
    accentVar: "--primary",
    steps: [
      {
        label: "Recognise & call for help",
        detail:
          "Stop sedative infusion / pause further boluses. State the problem out loud. Call for an anaesthetist and a second pair of hands; do not continue the procedure.",
        severity: "assess",
      },
      {
        label: "Stimulate & open airway",
        detail:
          "Verbal then physical stimulation. Head-tilt + chin-lift or jaw-thrust. Increase FiO₂ to 100% via non-rebreather or facemask. Confirm capnography trace.",
        severity: "act",
      },
      {
        label: "Support ventilation",
        detail:
          "If RR remains inadequate or SpO₂ <92% → two-handed bag-mask ventilation with an oral/nasal airway adjunct, 10–12 breaths/min, watch chest rise and ETCO₂.",
        severity: "act",
      },
      {
        label: "Pharmacological reversal",
        detail:
          "Opioid contribution → naloxone 40–100 µg IV every 1–2 min, titrated. Benzodiazepine contribution → flumazenil 100–200 µg IV, then 100 µg/min to 1 mg max. Both have shorter t½ than the agonist — observe for re-sedation for ≥2 h.",
        severity: "rescue",
      },
      {
        label: "Escalate to definitive airway",
        detail:
          "If apnoea persists, airway protection compromised, or aspiration suspected → insert supraglottic airway or proceed to RSI / tracheal intubation. Move to a resourced area; involve ICU early.",
        severity: "escalate",
      },
    ],
  },
  {
    id: "obstruction",
    title: "Airway obstruction",
    trigger:
      "Snoring, stridor, paradoxical chest/abdominal movement · loss of ETCO₂ trace despite effort",
    icon: Activity,
    accentVar: "--accent-foreground",
    steps: [
      {
        label: "Recognise & reposition",
        detail:
          "Stop sedative. Optimise position: head-tilt + chin-lift; jaw-thrust if obese / OSA / suspected obstruction at base of tongue. Apply 100% O₂.",
        severity: "assess",
      },
      {
        label: "Airway adjunct",
        detail:
          "Insert an oropharyngeal airway (size = incisor → angle of mandible). If gag reflex present, use a nasopharyngeal airway. Reassess capnography.",
        severity: "act",
      },
      {
        label: "Two-person bag-mask + CPAP",
        detail:
          "Two-handed VE-grip with assistant squeezing the bag. Add 5–10 cmH₂O CPAP via the bag's APL valve to splint open the upper airway. Suction secretions/blood.",
        severity: "act",
      },
      {
        label: "Supraglottic airway",
        detail:
          "If obstruction not relieved, insert a 2nd-generation SGA (e.g. i-gel). Confirm with capnography and chest rise. Allow patient to wake or convert to GA.",
        severity: "rescue",
      },
      {
        label: "CICO pathway",
        detail:
          "If can't intubate, can't oxygenate → declare CICO, follow DAS algorithm: full neuromuscular blockade (sugammadex-reversible NMBA), front-of-neck access (scalpel-bougie-tube). Crash team, post-event debrief and Datix.",
        severity: "escalate",
      },
    ],
  },
  {
    id: "oversedation",
    title: "Over-sedation (unintended deep sedation / GA)",
    trigger:
      "No purposeful response to repeated stimulus · lost airway reflexes · MOAA/S ≤1",
    icon: Brain,
    accentVar: "--destructive",
    steps: [
      {
        label: "Recognise the depth shift",
        detail:
          "By definition the patient is now in general anaesthesia. Stop further sedative. Document time, last dose and depth-of-sedation score. Call for an anaesthetist if not already present.",
        severity: "assess",
      },
      {
        label: "Manage as GA",
        detail:
          "Open airway, jaw-thrust, 100% O₂, capnography on, full AAGBI monitoring. Prepare suction and airway adjuncts. Ensure tipping trolley and rescue drugs at the bedside.",
        severity: "act",
      },
      {
        label: "Targeted reversal",
        detail:
          "Identify the dominant agent. Opioid → naloxone titrated 40 µg increments. Benzodiazepine → flumazenil 100 µg increments. Propofol/dexmedetomidine — no antagonist; support and wait. Avoid 'reversal cocktails'; each can unmask the other agent.",
        severity: "rescue",
      },
      {
        label: "Cardiorespiratory support",
        detail:
          "Treat hypotension (fluid bolus 250 mL crystalloid, vasopressor — metaraminol 0.5 mg or phenylephrine 50–100 µg). Treat bradycardia (atropine 300–600 µg). Maintain normothermia.",
        severity: "rescue",
      },
      {
        label: "Escalate, debrief, learn",
        detail:
          "If unable to maintain airway / ventilation → secure airway (SGA or ETT) and admit to monitored bed (HDU/ICU) for ≥4 h post-reversal. File Datix incident; structured team debrief; review case at M&M; update local sedation policy if a system issue is identified.",
        severity: "escalate",
      },
    ],
  },
];

const severityClasses: Record<Severity, string> = {
  assess: "bg-muted text-muted-foreground",
  act: "bg-primary/15 text-primary",
  rescue: "bg-accent/30 text-accent-foreground",
  escalate: "bg-destructive/15 text-destructive",
};

const severityLabel: Record<Severity, string> = {
  assess: "Recognise",
  act: "Act",
  rescue: "Rescue",
  escalate: "Escalate",
};

export const SedationRescueLadder = () => {
  const [activeId, setActiveId] = useState<string>(SCENARIOS[0].id);
  const [revealed, setRevealed] = useState<Record<string, number>>(() =>
    Object.fromEntries(SCENARIOS.map((s) => [s.id, 1])),
  );

  const active = SCENARIOS.find((s) => s.id === activeId)!;
  const shown = revealed[active.id];
  const total = active.steps.length;
  const atEnd = shown >= total;

  const next = () => {
    if (atEnd) return;
    setRevealed((r) => ({ ...r, [active.id]: Math.min(total, r[active.id] + 1) }));
  };

  const reset = () => {
    setRevealed((r) => ({ ...r, [active.id]: 1 }));
  };

  return (
    <section
      className="my-6 rounded-xl border border-border bg-card p-4 md:p-5"
      aria-label="Interactive sedation rescue ladder"
    >
      <header className="flex items-start gap-3 mb-4">
        <span className="flex-shrink-0 mt-0.5 w-9 h-9 rounded-lg bg-destructive/15 text-destructive flex items-center justify-center">
          <AlertTriangle className="h-4.5 w-4.5" aria-hidden="true" />
        </span>
        <div>
          <h3 className="font-serif font-bold text-foreground text-lg leading-tight">
            Rescue ladders — step through the escalation
          </h3>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            Pick a scenario, then click <em>Next step</em> to walk the pathway. Steps are aligned to AAGBI/RCoA Safe Sedation Practice (2021) and DAS algorithms.
          </p>
        </div>
      </header>

      {/* Scenario tabs */}
      <div
        role="tablist"
        aria-label="Sedation emergency scenarios"
        className="flex flex-wrap gap-2 mb-4"
      >
        {SCENARIOS.map((s) => {
          const Icon = s.icon;
          const isActive = s.id === activeId;
          return (
            <button
              key={s.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${s.id}`}
              id={`tab-${s.id}`}
              onClick={() => setActiveId(s.id)}
              className={cn(
                "flex items-center gap-2 rounded-lg border px-3 py-2 text-xs md:text-sm font-medium transition-colors",
                isActive
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border bg-background text-muted-foreground hover:bg-secondary/50",
              )}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              <span className="text-left">{s.title}</span>
            </button>
          );
        })}
      </div>

      {/* Active scenario panel */}
      <div
        role="tabpanel"
        id={`panel-${active.id}`}
        aria-labelledby={`tab-${active.id}`}
        className="rounded-lg border border-border bg-secondary/20 p-3 md:p-4"
      >
        <div className="mb-3 rounded-md bg-background border border-border p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-1">
            Trigger
          </p>
          <p className="text-sm text-foreground leading-relaxed">{active.trigger}</p>
        </div>

        {/* Progress strip */}
        <div className="flex items-center gap-1.5 mb-3" aria-hidden="true">
          {active.steps.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors",
                i < shown ? "bg-primary" : "bg-border",
              )}
            />
          ))}
        </div>

        <ol className="space-y-2.5">
          {active.steps.slice(0, shown).map((step, i) => (
            <li
              key={step.label}
              className="flex gap-3 rounded-lg border border-border bg-background p-3 animate-fade-in"
            >
              <span
                className={cn(
                  "flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold",
                  severityClasses[step.severity],
                )}
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-0.5">
                  <p className="font-semibold text-foreground text-sm">{step.label}</p>
                  <span
                    className={cn(
                      "text-[10px] uppercase tracking-wide font-semibold px-1.5 py-0.5 rounded",
                      severityClasses[step.severity],
                    )}
                  >
                    {severityLabel[step.severity]}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-4 flex items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground">
            Step <span className="font-semibold text-foreground">{shown}</span> of {total}
            {atEnd && " — pathway complete"}
          </p>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={reset}
              className="h-8"
            >
              <RotateCcw className="h-3.5 w-3.5 mr-1.5" aria-hidden="true" />
              Reset
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={next}
              disabled={atEnd}
              className="h-8"
            >
              Next step
              <ChevronRight className="h-3.5 w-3.5 ml-1" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SedationRescueLadder;
