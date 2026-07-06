import { useMemo, useState } from "react";
import { CheckCircle2, AlertOctagon, Clock, Home, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Post-procedural sedation discharge checklist.
 *
 * Combines two scoring systems used in UK practice:
 *   - Modified Aldrete score (5 domains × 0–2 = 10) — fitness to leave the
 *     immediate recovery area.
 *   - Post-Anaesthetic Discharge Scoring System (PADSS, Chung) — fitness to
 *     leave the day-case unit for home (5 domains × 0–2 = 10).
 *
 * Both must score ≥ 9 with no single domain = 0 before discharge.
 *
 * Observation-timing rules and red-flag symptoms reflect AAGBI/RCoA Safe
 * Sedation Practice (2021) and BADS day-surgery guidance.
 *
 * Pure UI — calculation is local and deterministic.
 */

type Domain = {
  id: string;
  label: string;
  /** Options in order: 2 → 1 → 0 (best to worst) */
  options: { score: 0 | 1 | 2; label: string }[];
};

const ALDRETE: Domain[] = [
  {
    id: "activity",
    label: "Activity (motor)",
    options: [
      { score: 2, label: "Moves all four limbs voluntarily / on command" },
      { score: 1, label: "Moves two limbs" },
      { score: 0, label: "Unable to move limbs" },
    ],
  },
  {
    id: "respiration",
    label: "Respiration",
    options: [
      { score: 2, label: "Breathes deeply and coughs freely" },
      { score: 1, label: "Dyspnoea or limited breathing" },
      { score: 0, label: "Apnoeic or requiring airway support" },
    ],
  },
  {
    id: "circulation",
    label: "Circulation",
    options: [
      { score: 2, label: "BP ± 20% of pre-sedation value" },
      { score: 1, label: "BP ± 20–50% of pre-sedation value" },
      { score: 0, label: "BP ± >50% of pre-sedation value" },
    ],
  },
  {
    id: "consciousness",
    label: "Consciousness",
    options: [
      { score: 2, label: "Fully awake and oriented" },
      { score: 1, label: "Rousable on calling" },
      { score: 0, label: "Not responding" },
    ],
  },
  {
    id: "saturation",
    label: "O₂ saturation",
    options: [
      { score: 2, label: "SpO₂ > 92% on room air" },
      { score: 1, label: "Needs supplemental O₂ to keep SpO₂ > 90%" },
      { score: 0, label: "SpO₂ < 90% even with O₂" },
    ],
  },
];

const PADSS: Domain[] = [
  {
    id: "vitals",
    label: "Vital signs",
    options: [
      { score: 2, label: "Within 20% of baseline" },
      { score: 1, label: "20–40% of baseline" },
      { score: 0, label: ">40% of baseline" },
    ],
  },
  {
    id: "ambulation",
    label: "Activity / ambulation",
    options: [
      { score: 2, label: "Steady gait, no dizziness, at pre-procedure level" },
      { score: 1, label: "Requires assistance" },
      { score: 0, label: "Unable to ambulate" },
    ],
  },
  {
    id: "nausea",
    label: "Nausea / vomiting",
    options: [
      { score: 2, label: "Minimal: PO antiemetics adequate" },
      { score: 1, label: "Moderate: requires IM/IV antiemetic" },
      { score: 0, label: "Severe: persistent despite treatment" },
    ],
  },
  {
    id: "pain",
    label: "Pain",
    options: [
      { score: 2, label: "Acceptable to patient; controlled with PO analgesia" },
      { score: 1, label: "Mild–moderate, controllable" },
      { score: 0, label: "Severe / uncontrolled" },
    ],
  },
  {
    id: "bleeding",
    label: "Surgical bleeding",
    options: [
      { score: 2, label: "Minimal; no dressing change required" },
      { score: 1, label: "Moderate; ≤ 2 dressing changes" },
      { score: 0, label: "Severe; > 2 dressing changes" },
    ],
  },
];

const RED_FLAGS = [
  "Persistent SpO₂ < 92% on room air or new oxygen requirement",
  "Recurrent apnoea, snoring or stridor in recovery",
  "Sustained tachycardia, hypotension or new arrhythmia",
  "GCS < 15 or unable to protect airway",
  "Severe or rising pain not responding to oral analgesia",
  "Active surgical bleeding or expanding haematoma",
  "Suspected aspiration: cough, wheeze, desaturation post-procedure",
  "Re-sedation after flumazenil/naloxone (their t½ is shorter than the agonist)",
];

const TIMING_RULES = [
  {
    label: "Minimum observation",
    detail:
      "≥ 30 min after last sedative/opioid dose; ≥ 1 h after flumazenil or naloxone reversal (longer if half-life mismatch).",
  },
  {
    label: "Eating, drinking & PO meds",
    detail:
      "Sips of clear fluid once awake and protective reflexes intact; light snack before discharge.",
  },
  {
    label: "Voiding (selected cases)",
    detail:
      "Documented bladder emptying before discharge after spinal/caudal, lengthy procedures, or pelvic surgery.",
  },
  {
    label: "Driving & legal capacity",
    detail:
      "No driving, operating machinery, signing legal documents, or alcohol for 24 h after sedation.",
  },
  {
    label: "Escort & supervision",
    detail:
      "Discharge only with a responsible adult who can stay overnight; written and verbal instructions given to patient AND escort.",
  },
];

const initialScores = (domains: Domain[]) =>
  Object.fromEntries(domains.map((d) => [d.id, null as number | null])) as Record<string, number | null>;

const ScoreSection = ({
  title,
  domains,
  values,
  onChange,
}: {
  title: string;
  domains: Domain[];
  values: Record<string, number | null>;
  onChange: (id: string, score: number) => void;
}) => {
  const total = useMemo(
    () => domains.reduce((acc, d) => acc + (values[d.id] ?? 0), 0),
    [domains, values],
  );
  const allScored = domains.every((d) => values[d.id] !== null);
  const anyZero = domains.some((d) => values[d.id] === 0);
  const passes = allScored && total >= 9 && !anyZero;

  return (
    <div className="rounded-lg border border-border bg-card p-3 md:p-4">
      <div className="flex items-baseline justify-between mb-3">
        <p className="font-serif font-bold text-foreground text-base">{title}</p>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Score</span>
          <span
            className={cn(
              "px-2 py-0.5 rounded text-sm font-bold tabular-nums",
              !allScored
                ? "bg-muted text-muted-foreground"
                : passes
                  ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                  : "bg-destructive/15 text-destructive",
            )}
          >
            {total} / 10
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {domains.map((d) => (
          <fieldset key={d.id}>
            <legend className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5">
              {d.label}
            </legend>
            <div className="grid gap-1.5" role="radiogroup" aria-label={d.label}>
              {d.options.map((opt) => {
                const selected = values[d.id] === opt.score;
                return (
                  <button
                    key={opt.score}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => onChange(d.id, opt.score)}
                    className={cn(
                      "flex items-start gap-2 text-left rounded-md border p-2 transition-colors",
                      selected
                        ? "border-primary bg-primary/10"
                        : "border-border bg-background hover:bg-secondary/50",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "mt-0.5 flex-shrink-0 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center",
                        opt.score === 2
                          ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                          : opt.score === 1
                            ? "bg-amber-500/15 text-amber-700 dark:text-amber-300"
                            : "bg-destructive/15 text-destructive",
                      )}
                    >
                      {opt.score}
                    </span>
                    <span className="text-sm text-foreground/90 leading-snug">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      <div
        className={cn(
          "mt-3 rounded-md p-2.5 text-sm flex items-start gap-2",
          !allScored
            ? "bg-muted/60 text-muted-foreground"
            : passes
              ? "bg-emerald-500/10 text-emerald-800 dark:text-emerald-200"
              : "bg-destructive/10 text-destructive",
        )}
        role="status"
        aria-live="polite"
      >
        {passes ? (
          <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
        ) : (
          <AlertOctagon className="h-4 w-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
        )}
        <span>
          {!allScored
            ? "Score every domain to evaluate readiness."
            : passes
              ? "Criteria met (≥ 9 with no single domain = 0)."
              : anyZero
                ? "Any domain scoring 0 prevents progression — investigate and treat."
                : "Total below 9 — extend observation and reassess."}
        </span>
      </div>
    </div>
  );
};

export const SedationDischargeChecklist = () => {
  const [aldrete, setAldrete] = useState(() => initialScores(ALDRETE));
  const [padss, setPadss] = useState(() => initialScores(PADSS));

  const reset = () => {
    setAldrete(initialScores(ALDRETE));
    setPadss(initialScores(PADSS));
  };

  return (
    <section
      className="my-6 rounded-xl border border-border bg-secondary/20 p-4 md:p-5"
      aria-label="Discharge checklist after procedural sedation"
    >
      <header className="flex items-start gap-3 mb-4">
        <span className="flex-shrink-0 mt-0.5 w-9 h-9 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
          <Home className="h-4.5 w-4.5" aria-hidden="true" />
        </span>
        <div>
          <h3 className="font-serif font-bold text-foreground text-lg leading-tight">
            Discharge checklist
          </h3>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            Use the modified Aldrete score to leave first-stage recovery, then PADSS to leave the
            day-unit. Both must reach ≥ 9 with no single domain scoring 0.
          </p>
        </div>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        <ScoreSection
          title="Modified Aldrete (recovery → step-down)"
          domains={ALDRETE}
          values={aldrete}
          onChange={(id, score) => setAldrete((s) => ({ ...s, [id]: score }))}
        />
        <ScoreSection
          title="PADSS (step-down → home)"
          domains={PADSS}
          values={padss}
          onChange={(id, score) => setPadss((s) => ({ ...s, [id]: score }))}
        />
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-3 md:p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
            <p className="font-serif font-bold text-foreground text-base">Observation timing</p>
          </div>
          <ul className="space-y-2">
            {TIMING_RULES.map((r) => (
              <li key={r.label} className="text-sm text-foreground/90 leading-relaxed">
                <strong className="text-foreground">{r.label}:</strong>{" "}
                <span className="text-muted-foreground">{r.detail}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 md:p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertOctagon className="h-4 w-4 text-destructive" aria-hidden="true" />
            <p className="font-serif font-bold text-foreground text-base">
              Red flags — do NOT discharge
            </p>
          </div>
          <ul className="space-y-1.5">
            {RED_FLAGS.map((r) => (
              <li
                key={r}
                className="flex items-start gap-2 text-sm text-foreground/90 leading-relaxed"
              >
                <span
                  aria-hidden="true"
                  className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-destructive"
                />
                <span>{r}</span>
              </li>
            ))}
          </ul>
          <p className="text-[11px] text-muted-foreground italic mt-3">
            Any red flag → extend monitored observation, escalate to anaesthetist, and consider
            admission. Document decision and safety-net advice.
          </p>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <Button type="button" variant="outline" size="sm" onClick={reset} className="h-8">
          <RotateCcw className="h-3.5 w-3.5 mr-1.5" aria-hidden="true" />
          Reset checklist
        </Button>
      </div>
    </section>
  );
};

export default SedationDischargeChecklist;
