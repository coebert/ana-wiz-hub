import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronRight, AlertTriangle, CheckCircle2, Activity } from "lucide-react";

/**
 * Inhalation-injury management flowchart for burns ICU.
 *
 * Five sequential decision nodes the user can step through:
 *   1. Recognise inhalation injury (history + signs)
 *   2. Airway decision — early intubation vs observe
 *   3. Toxin management — CO and cyanide
 *   4. Bronchoscopy — grade and toilet
 *   5. Ventilator strategy + escalation (HFOV / iNO / ECMO)
 *
 * Pure SVG/JSX — no external animation library. Click chevrons or
 * checkpoints to advance. Highlights the active branch and shows the
 * supporting checklist.
 */

type StepId = 0 | 1 | 2 | 3 | 4;

const STEPS: {
  id: StepId;
  title: string;
  question: string;
  yes: { label: string; detail: string[]; tone: "danger" | "warn" | "ok" };
  no: { label: string; detail: string[]; tone: "danger" | "warn" | "ok" };
}[] = [
  {
    id: 0,
    title: "1. Recognise inhalation injury",
    question: "Any of: enclosed-space fire · facial / oropharyngeal burns · soot in nares or sputum · hoarse voice / stridor · ↓ GCS · COHb > 10 %?",
    yes: {
      label: "Inhalation injury suspected",
      tone: "danger",
      detail: [
        "Apply 100 % O₂ via non-rebreather (treats CO).",
        "Send ABG with co-oximetry: COHb, MetHb, lactate.",
        "Continuous SpO₂, ETCO₂, cardiac monitoring.",
        "Notify burns centre and prepare for difficult airway.",
      ],
    },
    no: {
      label: "Low-risk — observe",
      tone: "ok",
      detail: [
        "Reassess hourly for 6–12 h: voice, stridor, sputum, SpO₂.",
        "Repeat ABG/COHb if any new symptom.",
        "Document baseline airway exam.",
      ],
    },
  },
  {
    id: 1,
    title: "2. Airway decision — early intubation?",
    question: "Stridor / hoarse voice · deep facial burns · soot in pharynx · ↓ GCS · planned long transfer · TBSA > 30 %?",
    yes: {
      label: "Intubate NOW",
      tone: "danger",
      detail: [
        "Senior anaesthetist + difficult-airway trolley + surgeon for front-of-neck.",
        "Awake fibre-optic if cooperative; otherwise modified RSI with ketamine 1–2 mg/kg + rocuronium 1.2 mg/kg.",
        "Use a large-bore (≥ 8.0 mm internal diameter) UNCUT tube — oedema can swallow a cut tube.",
        "Secure with umbilical tape, NOT adhesive (face oedema makes tape fail).",
        "Avoid suxamethonium after 24 h post-burn (lethal hyperkalaemia from extra-junctional ACh receptors).",
      ],
    },
    no: {
      label: "Defer — but reassess every 1 h",
      tone: "warn",
      detail: [
        "Sit up 30°, humidified O₂, nebulised adrenaline / saline.",
        "Keep nil by mouth and consent for intubation.",
        "Have intubation kit at bedside; threshold lowers rapidly.",
      ],
    },
  },
  {
    id: 2,
    title: "3. Toxin co-management",
    question: "Enclosed-space fire AND any of: persistent acidosis · lactate > 10 · ↓ GCS · COHb > 10 %?",
    yes: {
      label: "Treat CO + suspect cyanide",
      tone: "danger",
      detail: [
        "100 % O₂ until COHb < 5 % (½-life: air 4 h · 100 % O₂ 80 min · HBO 25 min).",
        "Hyperbaric O₂ if: COHb > 25 %, LOC, neurology, pregnancy, persistent symptoms after 4–6 h.",
        "Hydroxocobalamin 5 g IV over 15 min for suspected cyanide (urine turns red — expected).",
        "Avoid sodium nitrite if CO co-exposure (worsens O₂ delivery via metHb).",
        "Repeat ABG / lactate every 30 min during resuscitation.",
      ],
    },
    no: {
      label: "Continue 100 % O₂ taper",
      tone: "ok",
      detail: [
        "Wean FiO₂ to maintain SpO₂ ≥ 94 %.",
        "Re-check COHb on serial ABG.",
      ],
    },
  },
  {
    id: 3,
    title: "4. Bronchoscopy — grade and toilet",
    question: "Intubated and / or any signs of lower-airway involvement?",
    yes: {
      label: "Fibre-optic bronchoscopy within 6 h",
      tone: "warn",
      detail: [
        "Grade 0–4 (Endorf / ABA score): erythema → severe sloughing & casts. Severity correlates with ventilator days and mortality.",
        "Therapeutic lavage and removal of mucosal slough / soot / casts.",
        "Repeat at 24–48 h or for rising airway pressures, atelectasis, hypoxaemia.",
        "Consider nebulised heparin 5,000 U + N-acetylcysteine 3 mL of 20 % q4h to reduce cast formation.",
      ],
    },
    no: {
      label: "No immediate scope",
      tone: "ok",
      detail: [
        "Re-evaluate if extubation fails, secretions worsen, or new infiltrate appears.",
      ],
    },
  },
  {
    id: 4,
    title: "5. Ventilator strategy &amp; escalation",
    question: "PaO₂/FiO₂ trajectory and compliance — what next?",
    yes: {
      label: "Lung-protective + targeted escalation",
      tone: "warn",
      detail: [
        "Tidal volume 6 mL/kg PBW, plateau < 30 cmH₂O, driving pressure < 15 cmH₂O.",
        "PEEP titrated to oxygenation and chest-wall compliance (high in anterior chest eschar — escharotomy may be needed).",
        "Permissive hypercapnia accepted; humidify aggressively to clear casts.",
        "Bronchodilators (salbutamol / ipratropium) and nebulised heparin / NAC.",
        "Escalate: prone positioning ⟶ neuromuscular blockade ⟶ HFOV / APRV in selected centres ⟶ inhaled nitric oxide for refractory hypoxaemia ⟶ VV-ECMO referral if Murray ≥ 3 or P/F < 80.",
        "Address chest-wall compliance: chest escharotomy if peak pressures rise with circumferential burn.",
      ],
    },
    no: {
      label: "Wean and extubate",
      tone: "ok",
      detail: [
        "Daily SBT once oxygenation, secretions and oedema improve.",
        "Cuff-leak test before extubation — high false-negative in burns.",
        "Consider tracheostomy if intubation expected > 10–14 days, or for prolonged dressing changes.",
      ],
    },
  },
];

const TONE: Record<"danger" | "warn" | "ok", string> = {
  danger: "border-destructive/40 bg-destructive/5",
  warn: "border-orange-500/40 bg-orange-500/5",
  ok: "border-emerald-600/40 bg-emerald-600/5",
};

const TONE_TEXT: Record<"danger" | "warn" | "ok", string> = {
  danger: "text-destructive",
  warn: "text-orange-600 dark:text-orange-400",
  ok: "text-emerald-700 dark:text-emerald-400",
};

export const InhalationInjuryFlowchart = () => {
  const [step, setStep] = useState<StepId>(0);
  const [branch, setBranch] = useState<"yes" | "no">("yes");

  const s = STEPS[step];
  const active = branch === "yes" ? s.yes : s.no;

  return (
    <figure className="my-6 rounded-xl border border-border bg-card p-4 md:p-5">
      <figcaption className="mb-3">
        <h3 className="text-base font-semibold text-foreground">
          Airway &amp; inhalation-injury management flowchart
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Step through the five decision nodes. Each node has a red / green branch with the supporting checklist —
          including bronchoscopy grading and ventilator escalation thresholds.
        </p>
      </figcaption>

      {/* Step rail */}
      <div className="mb-3 flex flex-wrap gap-1">
        {STEPS.map((stp) => (
          <button
            key={stp.id}
            type="button"
            onClick={() => { setStep(stp.id); setBranch("yes"); }}
            className={cn(
              "flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-[11px] font-medium transition-colors",
              step === stp.id
                ? "border-primary bg-primary text-primary-foreground"
                : step > stp.id
                ? "border-border bg-muted/60 text-muted-foreground"
                : "border-border bg-background text-muted-foreground hover:bg-muted"
            )}
          >
            {step > stp.id && <CheckCircle2 className="h-3 w-3" />}
            <span>{stp.title}</span>
          </button>
        ))}
      </div>

      {/* Active node */}
      <div className="rounded-lg border border-border bg-background p-4">
        <div className="mb-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{s.title}</p>
          <p className="mt-1 text-sm text-foreground leading-relaxed">{s.question}</p>
        </div>

        {/* Yes / No branch toggle */}
        <div className="mb-3 grid grid-cols-2 gap-2">
          {(["yes", "no"] as const).map((b) => {
            const node = b === "yes" ? s.yes : s.no;
            const selected = branch === b;
            return (
              <button
                key={b}
                type="button"
                onClick={() => setBranch(b)}
                className={cn(
                  "rounded-lg border p-3 text-left transition-all",
                  selected ? TONE[node.tone] + " ring-2 ring-primary/30" : "border-border bg-card hover:bg-muted/40"
                )}
              >
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {b === "yes" ? "YES branch" : "NO branch"}
                </p>
                <p className={cn("mt-1 text-sm font-semibold", selected ? TONE_TEXT[node.tone] : "text-foreground")}>
                  {b === "yes" ? <AlertTriangle className="inline h-3.5 w-3.5 mr-1" /> : <Activity className="inline h-3.5 w-3.5 mr-1" />}
                  {node.label}
                </p>
              </button>
            );
          })}
        </div>

        {/* Checklist for active branch */}
        <div className={cn("rounded-md border p-3", TONE[active.tone])}>
          <ul className="space-y-1.5 text-xs text-foreground">
            {active.detail.map((d, i) => (
              <li key={i} className="flex gap-2">
                <span className={cn("mt-0.5 inline-block h-1.5 w-1.5 rounded-full shrink-0", TONE_TEXT[active.tone].replace("text-", "bg-"))} />
                <span dangerouslySetInnerHTML={{ __html: d }} />
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation */}
        <div className="mt-3 flex items-center justify-between">
          <button
            type="button"
            disabled={step === 0}
            onClick={() => { setStep((step - 1) as StepId); setBranch("yes"); }}
            className={cn(
              "rounded-md border border-border px-2.5 py-1 text-[11px] font-medium",
              step === 0 ? "opacity-30" : "hover:bg-muted"
            )}
          >
            ← Previous
          </button>
          <p className="text-[10px] text-muted-foreground">Node {step + 1} of {STEPS.length}</p>
          <button
            type="button"
            disabled={step === STEPS.length - 1}
            onClick={() => { setStep((step + 1) as StepId); setBranch("yes"); }}
            className={cn(
              "flex items-center gap-1 rounded-md border border-border px-2.5 py-1 text-[11px] font-medium",
              step === STEPS.length - 1 ? "opacity-30" : "hover:bg-muted"
            )}
          >
            Next <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Bronchoscopy grading footnote */}
      <div className="mt-3 grid gap-2 text-[11px] md:grid-cols-2">
        <div className="rounded-md border border-border bg-muted/30 p-2.5">
          <p className="font-semibold text-foreground mb-1">Endorf / ABA bronchoscopic grade</p>
          <ul className="space-y-0.5 text-muted-foreground">
            <li><span className="font-mono text-foreground">0</span> — no injury</li>
            <li><span className="font-mono text-foreground">1</span> — mild: erythema, mild oedema, minimal soot</li>
            <li><span className="font-mono text-foreground">2</span> — moderate: erythema, oedema, secretions, no sloughing</li>
            <li><span className="font-mono text-foreground">3</span> — severe: severe oedema, sloughing, bronchorrhoea, casts</li>
            <li><span className="font-mono text-foreground">4</span> — massive sloughing, obstruction, mucosal necrosis</li>
          </ul>
        </div>
        <div className="rounded-md border border-border bg-muted/30 p-2.5">
          <p className="font-semibold text-foreground mb-1">Ventilator escalation thresholds</p>
          <ul className="space-y-0.5 text-muted-foreground">
            <li>Plateau &gt; 30 / driving pressure &gt; 15 → reduce Vt, treat chest-wall (escharotomy), prone</li>
            <li>P/F &lt; 150 despite optimisation → prone + NMB</li>
            <li>P/F &lt; 100 with refractory hypoxaemia → iNO trial / consider ECMO referral</li>
            <li>Murray score ≥ 3 or P/F &lt; 80 → VV-ECMO retrieval discussion</li>
          </ul>
        </div>
      </div>
    </figure>
  );
};

export default InhalationInjuryFlowchart;
