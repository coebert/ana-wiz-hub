import { useState } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

type RhythmKey = "vf-vt" | "asystole-pea";

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
    detail: "Performed by a trained surgeon at the bedside. Internal cardiac massage at 100/min, internal defibrillation 20 J. Open chest gives access to control bleeding, relieve tamponade, and start internal massage.",
    color: "hsl(0, 75%, 50%)",
    modified: true,
    modificationNote: "Replaces standard external CPR after 3 shocks (VF/VT) or 3 min (asystole/PEA). Resternotomy set kept at the bedside on every cardiac ICU.",
  },
  {
    id: "ecmo",
    title: "Consider VA-ECMO / mechanical support",
    detail: "If no return of spontaneous circulation despite resternotomy and reversible cause correction: escalate to VA-ECMO, IABP, or temporary VAD. Decision made by senior cardiac surgeon and intensivist.",
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
      detail: "If witnessed/monitored VF or pulseless VT (the usual scenario in CICU), give 3 sequential biphasic shocks (150–200 J) before starting external compressions. Defibrillator pads pre-applied.",
      color: "hsl(0, 75%, 50%)",
      modified: true,
      modificationNote: "Standard ALS gives 1 shock then 2 min CPR. Here, post-cardiac-surgery patients usually arrest while monitored and the underlying cause (e.g. reperfusion VF) often responds to immediate shocks without compressions, which can damage grafts/sternotomy.",
    },
    {
      id: "compressions",
      title: "External chest compressions ONLY if shocks fail",
      detail: "If still in VF/VT after 3 shocks, start external compressions at 100–120/min, depth 5–6 cm, allow full chest recoil. Anticipate reduced effectiveness due to recent sternotomy.",
      color: "hsl(210, 65%, 50%)",
    },
    {
      id: "drugs",
      title: "Modified drug strategy",
      detail: "Withhold initial adrenaline. Amiodarone 300 mg IV for refractory VF/VT after 3 shocks. Consider lidocaine 1 mg/kg.",
      color: "hsl(140, 55%, 42%)",
      modified: true,
      modificationNote: "Bolus adrenaline 1 mg can cause severe rebound hypertension after ROSC, disrupting fresh anastomoses. If used, give in 100–300 mcg increments only, on senior advice.",
    },
    ...sharedFinal,
  ],
  "asystole-pea": [
    {
      id: "recognise",
      title: "Recognise arrest — call for help",
      detail: "Confirm asystole or PEA on monitor + arterial trace + absent pulse. Call cardiac arrest team AND on-call cardiac surgeon. Note time.",
      color: "hsl(45, 90%, 50%)",
    },
    {
      id: "pacing",
      title: "Check & use epicardial pacing FIRST",
      detail: "Almost all post-cardiac-surgery patients have epicardial pacing wires. For asystole or extreme bradycardia, set DDD or VVI at 80–100 bpm with maximum output BEFORE starting compressions.",
      color: "hsl(195, 70%, 45%)",
      modified: true,
      modificationNote: "Standard ALS does not include this step — but pacing wires can immediately restore output without the trauma of CPR.",
    },
    {
      id: "compressions",
      title: "External chest compressions if no capture",
      detail: "If pacing fails to produce output, start external compressions at 100–120/min. Brief pause for any rhythm/pulse check at the next assessment.",
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
      detail: "Withhold bolus adrenaline. Atropine no longer routine. Consider calcium, sodium bicarbonate if hyperkalaemia/acidosis suspected (cardioplegia effect).",
      color: "hsl(140, 55%, 42%)",
      modified: true,
      modificationNote: "Avoid 1 mg adrenaline boluses — risk of catastrophic hypertension with ROSC. Titrated low-dose only on senior advice.",
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
      description="Auto-generated wrapper for the Cardiac arrest post cardiac surgery anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <figure className="rounded-xl border border-border bg-card p-4 my-6">
        <figcaption className="mb-3">
          <h3 className="text-base font-serif font-bold text-foreground">
            Cardiac Arrest Following Cardiac Surgery — EACTS/EACTA Algorithm
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Click any step to read why it differs from the standard ALS algorithm. Toggle the initial rhythm to see the two pathways.
          </p>
        </figcaption>
  
        {/* Rhythm toggle */}
        <div className="flex flex-wrap gap-2 mb-4" role="tablist" aria-label="Initial rhythm">
          {(
            [
              { key: "vf-vt", label: "VF / pulseless VT" },
              { key: "asystole-pea", label: "Asystole / PEA" },
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
          Source: Dunning et al., EACTS/EACTA Guideline for resuscitation after cardiac surgery (2009; updated 2017). Resternotomy capability and trained team must be immediately available wherever cardiac surgery is performed.
        </p>
      </figure>
    </DiagramFigure>
  );
}
