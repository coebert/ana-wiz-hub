import { useState } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

type RhythmKey = "vf-vt" | "asystole" | "pea";

interface Step {
  id: string;
  title: string;
  detail: string;
  color: string;
  modified?: boolean;
  modificationNote?: string;
}

const sharedFinal: Step[] = [
  {
    id: "resternotomy",
    title: "Emergency Resternotomy (≤5 min)",
    detail: "Performed by a trained cardiac surgical team at the bedside. Internal cardiac massage at 100/min, internal defibrillation 20 J. Open chest gives access to control bleeding, relieve tamponade, and start internal massage.",
    color: "hsl(0, 75%, 50%)",
    modified: true,
    modificationNote: "Prepare for reopening from the moment of arrest. RCUK advises emergency resternotomy within five minutes in persistent arrest up to ten days after cardiac surgery.",
  },
  {
    id: "ecmo",
    title: "Consider VA-ECMO / mechanical support",
    detail: "Consider extracorporeal CPR with the specialist team for prolonged resuscitation or when minimally invasive surgery delays reopening.",
    color: "hsl(280, 55%, 50%)",
    modified: true,
    modificationNote: "Cardiac surgical patients have rapid access to mechanical circulatory support — uniquely available rescue therapy.",
  },
];

const pathways: Record<RhythmKey, Step[]> = {
  "vf-vt": [
    {
      id: "recognise",
      title: "Recognise arrest — call for help",
      detail: "Confirm arrest on monitor + arterial line trace + absent pulse. Call cardiac arrest team AND on-call cardiac surgeon simultaneously. Note time.",
      color: "hsl(45, 90%, 50%)",
    },
    {
      id: "shock-x3",
      title: "Up to 3 stacked shocks BEFORE chest compressions",
      detail: "In witnessed monitored VF/pVT, give up to three consecutive shocks if a defibrillator is immediately available. Start compressions immediately if shocks cannot be delivered promptly, or if they fail. The initial exception lasts at most one minute.",
      color: "hsl(0, 75%, 50%)",
      modified: true,
      modificationNote: "Standard ALS gives 1 shock then 2 min CPR. Here, post-cardiac-surgery patients usually arrest while monitored and the underlying cause (e.g. reperfusion VF) often responds to immediate shocks without compressions, which can damage grafts/sternotomy.",
    },
    {
      id: "compressions",
      title: "Start compressions if immediate shocks fail or are unavailable",
      detail: "If still in VF/VT after 3 shocks, start external compressions at 100–120/min, depth 5–6 cm, allow full chest recoil. Anticipate reduced effectiveness due to recent sternotomy.",
      color: "hsl(210, 65%, 50%)",
    },
    {
      id: "drugs",
      title: "Modified drug strategy",
      detail: "For refractory VF/pVT, follow the cardiac surgical arrest protocol for antiarrhythmic treatment. If adrenaline is used, RCUK advises a reduced IV dose of 50–100 micrograms.",
      color: "hsl(140, 55%, 42%)",
      modified: true,
      modificationNote: "After cardiac surgery, excessive vasopressor doses can cause severe hypertension if spontaneous circulation returns.",
    },
    ...sharedFinal,
  ],
  asystole: [
    {
      id: "recognise",
      title: "Recognise arrest — call for help",
      detail: "Confirm arrest with the clinical signs and pulseless pressure waveform. Call the cardiac arrest and surgical teams, and prepare for emergency resternotomy.",
      color: "hsl(45, 90%, 50%)",
    },
    {
      id: "pacing",
      title: "Check & use epicardial pacing FIRST",
      detail: "In asystole or extreme bradycardia, briefly pause epicardial pacing to identify the underlying rhythm. If it remains asystole or extreme bradycardia and wires are available, attempt immediate pacing at maximum output. Check for mechanical capture.",
      color: "hsl(195, 70%, 45%)",
      modified: true,
      modificationNote: "Standard ALS does not include this step — but pacing wires can immediately restore output without the trauma of CPR.",
    },
    {
      id: "compressions",
      title: "External chest compressions if no capture",
      detail: "Start compressions immediately if pacing is unavailable or fails to restore circulation. Limit the initial attempt to the first minute.",
      color: "hsl(210, 65%, 50%)",
    },
    {
      id: "reversible",
      title: "Address surgery-specific reversible causes",
      detail: "Cardiac tamponade (echo / TOE), tension pneumothorax, hypovolaemia from surgical bleeding, graft occlusion, severe acidosis or hyperkalaemia from cardioplegia/reperfusion.",
      color: "hsl(25, 80%, 50%)",
      modified: true,
      modificationNote: "Tamponade and major bleeding are far more likely than the standard 4 Hs/4 Ts list — and both are corrected by resternotomy.",
    },
    {
      id: "drugs",
      title: "Modified drug strategy",
      detail: "If adrenaline is used, RCUK advises a reduced IV dose of 50–100 micrograms. Identify and treat reversible causes.",
      color: "hsl(140, 55%, 42%)",
      modified: true,
      modificationNote: "Avoid 1 mg adrenaline boluses — risk of catastrophic hypertension with ROSC. Titrated low-dose only on senior advice.",
    },
    ...sharedFinal,
  ],
  pea: [
    {
      id: "compressions",
      title: "Start external chest compressions immediately",
      detail: "In pulseless electrical activity, call the cardiac arrest and surgical teams, start CPR and prepare for resternotomy immediately. If there is a paced rhythm, briefly pause pacing to check for underlying VF/pVT or asystole.",
      color: "hsl(210, 65%, 50%)",
    },
    {
      id: "causes",
      title: "Treat reversible causes during CPR",
      detail: "Assess tamponade, bleeding and hypovolaemia, tension pneumothorax and other reversible causes. If adrenaline is used, RCUK advises 50–100 micrograms IV. Prepare for early surgical reopening.",
      color: "hsl(25, 80%, 50%)",
    },
    ...sharedFinal,
  ],
};

export default function CardiacArrestPostCardiacSurgeryDiagram() {
  const [rhythm, setRhythm] = useState<RhythmKey>("vf-vt");
  const [activeId, setActiveId] = useState<string | null>(null);
  const steps = pathways[rhythm];
  const active = steps.find((s) => s.id === activeId) ?? steps[0];

  return (
    <DiagramFigure
      id="cardiac-arrest-post-cardiac-surgery-diagram"
      title="Cardiac arrest post cardiac surgery"
      description="Cardiac arrest post cardiac surgery: labelled teaching figure showing the structures, relationships and key values FRCA and FFICM candidates need to recognise and explain for this topic."
    >
              <figure className="rounded-xl border border-border bg-card p-4 my-6">
        <figcaption className="mb-3">
          <h3 className="text-base font-serif font-bold text-foreground">
            Cardiac Arrest Following Cardiac Surgery — EACTS/EACTA Algorithm
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Click any step to read why it differs from the standard ALS algorithm. Select the initial rhythm to see its immediate treatment.
          </p>
        </figcaption>
  
        {/* Rhythm toggle */}
        <div className="flex flex-wrap gap-2 mb-4" role="tablist" aria-label="Initial rhythm">
          {(
            [
              { key: "vf-vt", label: "VF / pulseless VT" },
              { key: "asystole", label: "Asystole / extreme bradycardia" },
              { key: "pea", label: "Pulseless electrical activity" },
            ] as const
          ).map((opt) => (
            <button
              key={opt.key}
              role="tab"
              aria-selected={rhythm === opt.key}
              onClick={() => {
                setRhythm(opt.key);
                setActiveId(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                rhythm === opt.key
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground border-border hover:bg-accent/40"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
  
        <div className="grid lg:grid-cols-[1fr_320px] gap-4">
          {/* Flow diagram */}
          <ol className="space-y-2">
            {steps.map((step, i) => {
              const isActive = active.id === step.id;
              return (
                    <li key={step.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(step.id)}
                    className={`w-full text-left rounded-lg border p-3 transition-all flex gap-3 items-start ${
                      isActive
                        ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                        : "border-border bg-background hover:bg-accent/30"
                    }`}
                    style={isActive ? { borderColor: step.color, boxShadow: `0 0 0 1px ${step.color}33` } : undefined}
                  >
                    <span
                      className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: step.color }}
                      aria-hidden
                    >
                      {i + 1}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm font-semibold text-foreground">{step.title}</span>
                      <span className="block text-xs text-muted-foreground mt-0.5">{step.detail}</span>
                      {step.modified && (
                        <span className="inline-block mt-1.5 text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-500">
                          Modified vs ALS
                        </span>
                      )}
                    </span>
                  </button>
                </li>
    );
            })}
          </ol>
  
          {/* Detail panel */}
          <aside className="rounded-lg border border-border bg-secondary/30 p-4 self-start sticky top-4">
            <div
              className="inline-block text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded text-white mb-2"
              style={{ background: active.color }}
            >
              Step {steps.findIndex((s) => s.id === active.id) + 1}
            </div>
            <p className="text-sm font-semibold text-foreground mb-2">{active.title}</p>
            <p className="text-xs text-muted-foreground leading-relaxed mb-3">{active.detail}</p>
            {active.modified && active.modificationNote && (
              <div className="rounded border border-amber-500/30 bg-amber-500/5 p-2.5">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-500 mb-1">
                  Why it differs from ALS
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">{active.modificationNote}</p>
              </div>
            )}
          </aside>
        </div>
  
        <p className="text-[11px] text-muted-foreground italic mt-4">
          <a className="underline" href="https://www.resus.org.uk/professional-library/2025-resuscitation-guidelines/special-circumstances-guidelines">RCUK 2025 cardiac surgery guidance</a> and <a className="underline" href="https://www.sts.org/sites/default/files/documents/ExpertConsensus_ResuscitationAfterCardiacSurgery.pdf">STS post-cardiac-surgery resuscitation consensus</a>.
        </p>
      </figure>
    </DiagramFigure>
  );
}
