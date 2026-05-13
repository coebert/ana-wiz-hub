import { useState } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * Propofol-induced penile erection during cystoscopy/TURP — one-page stepwise
 * management algorithm. Click a step to reveal actions, doses, and what NOT
 * to do. Designed as a single-screen exam-style flowchart.
 */

type StepKey = "recognise" | "stop" | "deepen" | "switch" | "pharm" | "abandon" | "postop";

interface Step {
  key: StepKey;
  number: string;
  title: string;
  badge: string;
  actions: string[];
  avoid: string[];
  tone: "neutral" | "warn" | "danger" | "success";
}

const steps: Step[] = [
  {
    key: "recognise",
    number: "0",
    title: "Recognise & pause",
    badge: "Trigger",
    actions: [
      "Tumescence noted on instrumentation or shortly after propofol bolus",
      "Confirm with surgeon — do not proceed if scope passage unsafe",
      "Note time of onset; check propofol TCI target / recent bolus history",
    ],
    avoid: [
      "Do NOT force the cystoscope/resectoscope — urethral trauma, false passage",
      "Do NOT ignore — wait-and-see costs theatre time and risks injury",
    ],
    tone: "neutral",
  },
  {
    key: "stop",
    number: "1",
    title: "Stop the trigger",
    badge: "Immediate",
    actions: [
      "Withdraw the scope; reduce genital handling",
      "Pause/lower propofol TCI infusion (consider halving target briefly)",
      "Ensure adequate depth of anaesthesia — check BIS / clinical signs first",
    ],
    avoid: [
      "Do NOT bolus more propofol blindly first — paradoxically may worsen via further disinhibition in some patients",
      "Do NOT lighten anaesthesia hoping reflex resolves — it won't, and patient may move",
    ],
    tone: "warn",
  },
  {
    key: "deepen",
    number: "2",
    title: "Deepen + opioid",
    badge: "First-line pharmacology",
    actions: [
      "Fentanyl 1–2 µg/kg IV (or alfentanil 10–20 µg/kg) — opioids are protective",
      "Midazolam 1–2 mg IV if not already given — benzodiazepines suppress the reflex",
      "Allow 2–3 min for effect before re-attempting instrumentation",
    ],
    avoid: [
      "Do NOT add remifentanil bolus alone without checking BP — profound bradycardia/hypotension",
      "Do NOT escalate to invasive measures before a trial of opioid + benzodiazepine",
    ],
    tone: "neutral",
  },
  {
    key: "switch",
    number: "3",
    title: "Switch technique",
    badge: "If still erect after 5 min",
    actions: [
      "Convert TIVA → volatile maintenance (sevoflurane 1.5–2 MAC) — case reports favour switching off propofol",
      "Consider ketamine 0.25–0.5 mg/kg IV as adjunct (sympathomimetic, dissociative)",
      "If neuraxial planned and not contraindicated — spinal/epidural blocks the reflex arc",
    ],
    avoid: [
      "Do NOT continue propofol-only TIVA if it is the suspected trigger",
      "Do NOT use nitrous oxide as a 'rescue' — no evidence; may worsen bowel distension in laparoscopy",
    ],
    tone: "neutral",
  },
  {
    key: "pharm",
    number: "4",
    title: "Pharmacological detumescence",
    badge: "Specific therapy",
    actions: [
      "Intracavernosal phenylephrine 100–200 µg (dilute 10 mg in 500 mL saline → 20 µg/mL); repeat every 3–5 min, max ~1 mg",
      "Requires invasive arterial BP monitoring + 5-lead ECG — risk of hypertensive crisis, reflex bradycardia, arrhythmia",
      "Alternative: terbutaline 0.25–0.5 mg SC (β2-agonist; slower onset, ~15 min)",
      "Ephedrine 5–10 mg IV boluses if α-agonist contraindicated",
    ],
    avoid: [
      "Do NOT use adrenaline intracavernosally — arrhythmia risk too high",
      "Do NOT inject without urology/anaesthetic consultant input if first IC dose fails",
      "Do NOT rely on ice packs or manual compression alone — ineffective",
    ],
    tone: "danger",
  },
  {
    key: "abandon",
    number: "5",
    title: "Abandon & reschedule",
    badge: "Escape",
    actions: [
      "If detumescence fails after escalation → wake the patient and reschedule",
      "Document trigger drug, sequence of interventions, and response",
      "Plan next anaesthetic: avoid propofol induction; consider thiopentone alternative, volatile induction, or spinal/regional",
    ],
    avoid: [
      "Do NOT proceed with forced instrumentation 'just to finish' — medicolegal and clinical risk",
    ],
    tone: "warn",
  },
  {
    key: "postop",
    number: "6",
    title: "Post-op surveillance",
    badge: "Safety net",
    actions: [
      "Recovery: monitor for persistent erection >4 h → treat as low-flow priapism",
      "Urology referral for cavernosal aspiration ± further intracavernosal phenylephrine",
      "Document on anaesthetic chart and warn patient + GP for future anaesthetics",
    ],
    avoid: [
      "Do NOT discharge with ongoing tumescence — ischaemic priapism risks permanent ED",
    ],
    tone: "success",
  },
];

const toneStyles: Record<Step["tone"], { ring: string; chip: string }> = {
  neutral: { ring: "border-border", chip: "bg-secondary text-foreground" },
  warn: { ring: "border-amber-500/40", chip: "bg-amber-500/15 text-amber-400" },
  danger: { ring: "border-destructive/50", chip: "bg-destructive/15 text-destructive" },
  success: { ring: "border-clinical/40", chip: "bg-clinical/15 text-clinical" },
};

const PropofolErectionAlgorithmDiagram = () => {
  const [active, setActive] = useState<StepKey>("recognise");
  const activeStep = steps.find((s) => s.key === active)!;
  const tone = toneStyles[activeStep.tone];

  return (
    <DiagramFigure
      id="propofol-erection-algorithm-diagram"
      title="Propofol erection algorithm"
      description="Auto-generated wrapper for the Propofol erection algorithm clinical decision flowchart. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="rounded-xl border border-border bg-card p-4 sm:p-6 my-6">
        <div className="mb-4">
          <h3 className="text-lg font-serif font-bold text-foreground">
            Propofol-induced penile erection — stepwise algorithm
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            One-page management cascade for cystoscopy / TURP / TURBT. Click a step
            for actions and what to stop doing.
          </p>
        </div>
  
        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-4">
          {/* Vertical step rail */}
          <ol className="space-y-1.5">
            {steps.map((s, i) => {
              const t = toneStyles[s.tone];
              const isActive = active === s.key;
              return (
                    <li key={s.key}>
                  <button
                    onClick={() => setActive(s.key)}
                    className={`w-full text-left flex items-start gap-3 p-2.5 rounded-lg border transition-all ${
                      isActive
                        ? `bg-primary/5 ${t.ring} border-2 shadow-sm`
                        : "bg-secondary/30 border-border hover:bg-secondary/50"
                    }`}
                  >
                    <span
                      className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${t.chip}`}
                    >
                      {s.number}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-[10px] uppercase tracking-wide text-muted-foreground">
                        {s.badge}
                      </span>
                      <span className="block text-sm font-semibold text-foreground leading-tight">
                        {s.title}
                      </span>
                    </span>
                    {i < steps.length - 1 && (
                      <span className="text-muted-foreground text-xs">↓</span>
                    )}
                  </button>
                </li>
    );
            })}
          </ol>
  
          {/* Detail panel */}
          <div className={`rounded-lg border-2 ${tone.ring} bg-secondary/20 p-4`}>
            <div className="flex items-center gap-2 mb-3">
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${tone.chip}`}
              >
                {activeStep.number}
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
                  {activeStep.badge}
                </p>
                <p className="font-serif text-base font-bold text-foreground leading-tight">
                  {activeStep.title}
                </p>
              </div>
            </div>
  
            <div className="mb-3">
              <p className="text-[11px] uppercase tracking-wide text-clinical font-semibold mb-1.5">
                ✓ Do
              </p>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                {activeStep.actions.map((a, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-clinical mt-0.5">•</span>
                    <span className="leading-relaxed">{a}</span>
                  </li>
                ))}
              </ul>
            </div>
  
            <div className="rounded-md border border-destructive/30 bg-destructive/5 p-2.5">
              <p className="text-[11px] uppercase tracking-wide text-destructive font-semibold mb-1.5">
                ✕ Do not
              </p>
              <ul className="space-y-1.5 text-xs text-muted-foreground">
                {activeStep.avoid.map((a, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-destructive mt-0.5">•</span>
                    <span className="leading-relaxed">{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
  
        <div className="mt-4 grid sm:grid-cols-3 gap-2 text-[11px]">
          <div className="p-2 rounded-md bg-secondary/30 border border-border">
            <p className="text-muted-foreground">First-line</p>
            <p className="font-semibold text-foreground">Stop trigger + opioid + benzo</p>
          </div>
          <div className="p-2 rounded-md bg-secondary/30 border border-border">
            <p className="text-muted-foreground">Second-line</p>
            <p className="font-semibold text-foreground">TIVA → volatile, ± ketamine</p>
          </div>
          <div className="p-2 rounded-md bg-destructive/5 border border-destructive/30">
            <p className="text-muted-foreground">Rescue</p>
            <p className="font-semibold text-foreground">IC phenylephrine 100–200 µg</p>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default PropofolErectionAlgorithmDiagram;
