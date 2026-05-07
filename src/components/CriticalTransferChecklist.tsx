import { useMemo, useState } from "react";
import {
  CheckCircle2,
  AlertOctagon,
  RotateCcw,
  Ambulance,
  Stethoscope,
  Wrench,
  ClipboardList,
  HeartPulse,
  Printer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * End-to-end checklist for transfer of the critically ill patient.
 *
 * Combines five sequential phases following the ICS / AAGBI / FICM transfer
 * standards (ICS 2019; AAGBI 2009; FICM Transfer of the Critically Ill Adult 2019):
 *
 *   1. Decision & team
 *   2. Stabilisation (ABCDE — package the patient)
 *   3. Equipment, drugs & oxygen
 *   4. Handover at receiving unit (ISBAR)
 *   5. Documentation & post-transfer audit
 *
 * Pure UI — local state, deterministic completion %, printable.
 */

type Item = { id: string; label: string; detail?: string };
type Phase = {
  id: string;
  title: string;
  blurb: string;
  icon: React.ComponentType<{ className?: string }>;
  items: Item[];
};

const PHASES: Phase[] = [
  {
    id: "decision",
    title: "1. Decision & team",
    blurb:
      "Senior-to-senior decision; benefits must outweigh risks. Confirm receiving unit accepts.",
    icon: Ambulance,
    items: [
      { id: "d1", label: "Senior referring + receiving consultants agree timing & plan" },
      { id: "d2", label: "Bed, theatre and specialist team confirmed at destination" },
      { id: "d3", label: "Mode of transport selected (road / rotary / fixed-wing)" },
      { id: "d4", label: "Transfer team briefed: doctor (ST4+ / equivalent) + assistant" },
      { id: "d5", label: "Team trained in equipment; PPE and high-vis available" },
      { id: "d6", label: "Next-of-kin informed; consent / best-interests documented" },
      { id: "d7", label: "Insurance / indemnity confirmed (esp. air or international)" },
    ],
  },
  {
    id: "stabilise",
    title: "2. Stabilisation — ABCDE",
    blurb:
      "Package the patient before moving. Most in-transit emergencies stem from rushed pre-departure checks.",
    icon: Stethoscope,
    items: [
      { id: "a1", label: "Airway secured; ETT position confirmed (CXR + cm at teeth); tube tied, bite block" },
      { id: "b1", label: "Replicated ICU ventilator settings observed for ≥15 min before departure" },
      { id: "b2", label: "ETCO₂ trace + recent ABG; recruitment manoeuvre after circuit changes" },
      { id: "b3", label: "Chest drain on Heimlich/underwater seal — never clamped" },
      { id: "c1", label: "2 × secured large-bore IV access + line for vasopressor" },
      { id: "c2", label: "Arterial line zeroed (tragus for TBI, phlebostatic axis otherwise)" },
      { id: "c3", label: "Cross-matched blood / fluids loaded if bleeding risk" },
      { id: "d1", label: "Sedation + analgesia ± paralysis adequate for transport stimulation" },
      { id: "d2", label: "Pupils, GCS, neuro exam documented as baseline" },
      { id: "e1", label: "Active warming; temperature probe; pressure points padded" },
      { id: "e2", label: "NG tube on free drainage (gas expansion at altitude); urinary catheter" },
      { id: "e3", label: "Patient strapped to trolley; eyes taped; lines accessible" },
    ],
  },
  {
    id: "equipment",
    title: "3. Equipment, drugs & oxygen",
    blurb:
      "Calculate O₂ as flow × time × 2 safety factor. Battery life on every device. Spares for everything that can fail.",
    icon: Wrench,
    items: [
      { id: "eq1", label: "Transport ventilator + self-inflating bag with reservoir as backup" },
      { id: "eq2", label: "Monitoring: ECG, SpO₂, ETCO₂, invasive BP, temperature, NIBP cuff" },
      { id: "eq3", label: "O₂ calculated (flow × time × 2); ≥2 cylinders with gauges checked open" },
      { id: "eq4", label: "Suction unit (battery + manual backup) and Yankauer" },
      { id: "eq5", label: "Difficult airway kit: video laryngoscope, bougie, supraglottic, scalpel" },
      { id: "eq6", label: "Infusion pumps charged; spare batteries; drug labels checked" },
      { id: "eq7", label: "Pre-drawn emergency drugs: adrenaline, atropine, metaraminol, propofol, suxamethonium/rocuronium, sugammadex" },
      { id: "eq8", label: "Osmotherapy ready if neuro: mannitol 0.5–1 g/kg or 3% saline 250 mL" },
      { id: "eq9", label: "Mobile phone (charged) + numbers for receiving unit & base hospital" },
      { id: "eq10", label: "Pre-departure equipment checklist signed off (ICS proforma)" },
    ],
  },
  {
    id: "handover",
    title: "4. Handover at receiving unit (ISBAR)",
    blurb:
      "Structured, uninterrupted handover with full team present. Confirm understanding before leaving.",
    icon: HeartPulse,
    items: [
      { id: "h1", label: "Identification: patient name, DOB, hospital number, weight, allergies" },
      { id: "h2", label: "Situation: presenting problem, current physiology, vasoactive support" },
      { id: "h3", label: "Background: PMH, medications, social context, code status" },
      { id: "h4", label: "Assessment: working diagnosis, investigations done/pending" },
      { id: "h5", label: "Recommendation: ongoing plan, anticipated escalation, family liaison" },
      { id: "h6", label: "Receiving unit O₂, ventilator, monitoring CONNECTED before disconnecting transport gear" },
      { id: "h7", label: "Lines, drains, infusions handed over individually with rates" },
      { id: "h8", label: "Imaging on PACS / disc + notes physically transferred" },
      { id: "h9", label: "Receiving consultant signs acceptance; questions invited" },
    ],
  },
  {
    id: "documentation",
    title: "5. Documentation & post-transfer",
    blurb:
      "Every transfer audited. Adverse events feed back to referring and retrieval teams.",
    icon: ClipboardList,
    items: [
      { id: "do1", label: "Transfer form: 15-min observations, interventions, drugs, fluids" },
      { id: "do2", label: "Adverse events recorded (hypoxia, hypotension, equipment failure, delays)" },
      { id: "do3", label: "Cylinder volumes used vs carried logged" },
      { id: "do4", label: "Family / NOK updated on arrival" },
      { id: "do5", label: "Equipment cleaned, restocked, returned; faults reported" },
      { id: "do6", label: "Datix / incident form for any harm or near-miss" },
      { id: "do7", label: "Transfer reviewed at departmental governance / M&M" },
    ],
  },
];

const RED_FLAGS = [
  "Cannot maintain SpO₂ ≥94% on FiO₂ ≤0.6 — stabilise / escalate before departure",
  "Persistent hypotension requiring escalating vasopressor — review fitness for transfer",
  "Unsecured airway in deteriorating GCS — intubate before leaving",
  "Untreated pneumothorax (especially before any flight) — drain first",
  "Unstable cervical spine without immobilisation",
  "Cylinder reserve < calculated requirement × 2 — get more O₂ before leaving",
  "Single point of equipment failure with no backup (no self-inflating bag, no spare battery)",
  "Team unfamiliar with the transport ventilator or pumps",
];

const initialItems = (phases: Phase[]) =>
  Object.fromEntries(
    phases.flatMap((p) => p.items.map((i) => [`${p.id}.${i.id}`, false])),
  ) as Record<string, boolean>;

const PhaseBlock = ({
  phase,
  values,
  onToggle,
}: {
  phase: Phase;
  values: Record<string, boolean>;
  onToggle: (key: string) => void;
}) => {
  const Icon = phase.icon;
  const total = phase.items.length;
  const done = phase.items.filter((i) => values[`${phase.id}.${i.id}`]).length;
  const pct = Math.round((done / total) * 100);
  const complete = done === total;

  return (
    <div className="rounded-lg border border-border bg-card p-3 md:p-4">
      <div className="flex items-start gap-3 mb-3">
        <span
          className={cn(
            "flex-shrink-0 mt-0.5 w-9 h-9 rounded-lg flex items-center justify-center",
            complete
              ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
              : "bg-primary/15 text-primary",
          )}
        >
          <Icon className="h-4 w-4" />
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-2">
            <p className="font-serif font-bold text-foreground text-base leading-tight">
              {phase.title}
            </p>
            <span
              className={cn(
                "px-2 py-0.5 rounded text-xs font-bold tabular-nums whitespace-nowrap",
                complete
                  ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {done} / {total}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{phase.blurb}</p>
          <div
            className="mt-2 h-1.5 w-full rounded-full bg-muted overflow-hidden"
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className={cn(
                "h-full transition-all",
                complete ? "bg-emerald-500" : "bg-primary",
              )}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>

      <ul className="space-y-1.5">
        {phase.items.map((i) => {
          const key = `${phase.id}.${i.id}`;
          const checked = values[key];
          return (
            <li key={i.id}>
              <button
                type="button"
                role="checkbox"
                aria-checked={checked}
                onClick={() => onToggle(key)}
                className={cn(
                  "w-full text-left flex items-start gap-2 rounded-md border p-2 transition-colors",
                  checked
                    ? "border-emerald-500/40 bg-emerald-500/5"
                    : "border-border bg-background hover:bg-secondary/50",
                )}
              >
                <span
                  aria-hidden={true}
                  className={cn(
                    "mt-0.5 flex-shrink-0 w-4 h-4 rounded border flex items-center justify-center",
                    checked
                      ? "border-emerald-500 bg-emerald-500 text-white"
                      : "border-muted-foreground/40",
                  )}
                >
                  {checked ? <CheckCircle2 className="h-3 w-3" /> : null}
                </span>
                <span className="text-sm text-foreground/90 leading-snug">{i.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const CriticalTransferChecklist = () => {
  const [values, setValues] = useState(() => initialItems(PHASES));

  const totals = useMemo(() => {
    const all = PHASES.flatMap((p) => p.items.map((i) => values[`${p.id}.${i.id}`]));
    const done = all.filter(Boolean).length;
    return { done, total: all.length, pct: Math.round((done / all.length) * 100) };
  }, [values]);

  const phasesComplete = PHASES.every((p) =>
    p.items.every((i) => values[`${p.id}.${i.id}`]),
  );

  const reset = () => setValues(initialItems(PHASES));
  const print = () => window.print();

  return (
    <section
      className="my-6 rounded-xl border border-border bg-secondary/20 p-4 md:p-5"
      aria-label="End-to-end checklist for transfer of the critically ill patient"
    >
      <header className="flex items-start gap-3 mb-4">
        <span className="flex-shrink-0 mt-0.5 w-10 h-10 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
          <Ambulance className="h-5 w-5" aria-hidden={true} />
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="font-serif font-bold text-foreground text-lg leading-tight">
            End-to-end transfer checklist
          </h3>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            Five sequential phases — decision, stabilisation, equipment, handover, documentation —
            aligned to ICS / AAGBI / FICM standards. Tick each item before moving the patient.
          </p>
          <div className="mt-2 flex items-center gap-3">
            <div
              className="flex-1 h-2 rounded-full bg-muted overflow-hidden"
              role="progressbar"
              aria-valuenow={totals.pct}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className={cn(
                  "h-full transition-all",
                  phasesComplete ? "bg-emerald-500" : "bg-primary",
                )}
                style={{ width: `${totals.pct}%` }}
              />
            </div>
            <span
              className={cn(
                "text-xs font-bold tabular-nums whitespace-nowrap",
                phasesComplete ? "text-emerald-700 dark:text-emerald-300" : "text-muted-foreground",
              )}
            >
              {totals.done} / {totals.total} ({totals.pct}%)
            </span>
          </div>
        </div>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        {PHASES.map((p) => (
          <PhaseBlock
            key={p.id}
            phase={p}
            values={values}
            onToggle={(key) => setValues((v) => ({ ...v, [key]: !v[key] }))}
          />
        ))}
      </div>

      <div className="mt-5 rounded-lg border border-destructive/30 bg-destructive/5 p-3 md:p-4">
        <div className="flex items-center gap-2 mb-2">
          <AlertOctagon className="h-4 w-4 text-destructive" aria-hidden={true} />
          <p className="font-serif font-bold text-foreground text-base">
            Red flags — do NOT depart
          </p>
        </div>
        <ul className="space-y-1.5">
          {RED_FLAGS.map((r) => (
            <li key={r} className="flex items-start gap-2 text-sm text-foreground/90 leading-relaxed">
              <span
                aria-hidden={true}
                className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-destructive"
              />
              <span>{r}</span>
            </li>
          ))}
        </ul>
        <p className="text-[11px] text-muted-foreground italic mt-3">
          Any red flag → pause, escalate to senior, stabilise on scene before transfer.
        </p>
      </div>

      <div
        className={cn(
          "mt-4 rounded-md p-2.5 text-sm flex items-start gap-2",
          phasesComplete
            ? "bg-emerald-500/10 text-emerald-800 dark:text-emerald-200"
            : "bg-muted/60 text-muted-foreground",
        )}
        role="status"
        aria-live="polite"
      >
        {phasesComplete ? (
          <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" aria-hidden={true} />
        ) : (
          <AlertOctagon className="h-4 w-4 mt-0.5 flex-shrink-0" aria-hidden={true} />
        )}
        <span>
          {phasesComplete
            ? "All phases complete — safe to depart. Document and audit on return."
            : "Complete every phase in order before leaving the referring unit."}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap justify-end gap-2">
        <Button type="button" variant="outline" size="sm" onClick={print} className="h-8">
          <Printer className="h-3.5 w-3.5 mr-1.5" aria-hidden={true} />
          Print checklist
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={reset} className="h-8">
          <RotateCcw className="h-3.5 w-3.5 mr-1.5" aria-hidden={true} />
          Reset
        </Button>
      </div>
    </section>
  );
};

export default CriticalTransferChecklist;
