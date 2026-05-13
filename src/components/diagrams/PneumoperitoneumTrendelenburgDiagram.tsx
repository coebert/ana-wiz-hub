import { useState } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * Pneumoperitoneum + steep Trendelenburg — multi-system effects diagram.
 * Tap a system (CV / Resp / Neuro / Renal / Endocrine) to see physiology
 * and anaesthetic mitigation. Used in robotic gynae / urology.
 */

type SystemKey = "cv" | "resp" | "neuro" | "renal" | "airway";

interface SystemEffect {
  key: SystemKey;
  label: string;
  short: string;
  color: string;
  effects: string[];
  mitigation: string[];
}

const systems: SystemEffect[] = [
  {
    key: "cv",
    label: "Cardiovascular",
    short: "↑ SVR · ↑ preload (early) · ↓ venous return (late)",
    color: "hsl(var(--destructive))",
    effects: [
      "Initial autotransfusion from leg/splanchnic compression → ↑ preload",
      "↑ Intra-abdominal pressure → IVC compression → late ↓ venous return",
      "↑ SVR from CO₂ absorption + neuroendocrine response (catecholamines, vasopressin, RAAS)",
      "Vagal stimulation at peritoneal stretch → bradyarrhythmia, even asystole",
      "Risk of CO₂ gas embolism — sudden ↓ EtCO₂ + mill-wheel murmur",
    ],
    mitigation: [
      "Slow insufflation; keep IAP ≤ 12–15 mmHg",
      "Glycopyrrolate / atropine ready for vagal bradycardia",
      "Watch EtCO₂ closely; treat embolism with desufflation, head-down left lateral (Durant), 100% O₂",
    ],
  },
  {
    key: "resp",
    label: "Respiratory",
    short: "↓ FRC · ↑ Ppeak · ↑ PaCO₂",
    color: "hsl(var(--clinical))",
    effects: [
      "Cephalad diaphragm shift → ↓ FRC, ↓ compliance, basal atelectasis",
      "Endobronchial migration of ETT (carina moves cephalad — recheck position)",
      "↑ Peak airway pressures; V/Q mismatch",
      "CO₂ absorption → hypercapnia despite minute-volume increase",
    ],
    mitigation: [
      "Lung-protective ventilation (Vt 6–8 mL/kg IBW, PEEP 5–10 cmH₂O, recruit if needed)",
      "↑ Respiratory rate to maintain EtCO₂; accept mild permissive hypercapnia",
      "Recheck ETT depth after positioning and after pneumoperitoneum",
    ],
  },
  {
    key: "neuro",
    label: "Neuro / Eye",
    short: "↑ ICP · ↑ IOP",
    color: "hsl(var(--accent))",
    effects: [
      "Steep Trendelenburg + IAP impede cerebral venous drainage → ↑ ICP",
      "↑ IOP up to 30+ mmHg — risk of postoperative ischaemic optic neuropathy",
      "Facial, scleral and laryngeal oedema — may delay extubation",
    ],
    mitigation: [
      "Limit angle / time when feasible; intermittent flat positioning if surgery permits",
      "Eye protection: tape, padding, avoid direct pressure",
      "Cuff-leak test before extubation; consider steroids/dexamethasone if airway oedema",
    ],
  },
  {
    key: "renal",
    label: "Renal",
    short: "↓ RBF · ↓ urine output",
    color: "hsl(var(--icu))",
    effects: [
      "Direct renal parenchymal compression by IAP",
      "↓ Renal blood flow and GFR — oliguria common",
      "Oliguria typically reversible after desufflation",
    ],
    mitigation: [
      "Maintain MAP > 65 (or > 80 in elderly); avoid hypovolaemia",
      "Do not chase urine output with extra fluid intra-op — accept oliguria",
      "Recheck urine output post-desufflation before assuming AKI",
    ],
  },
  {
    key: "airway",
    label: "Airway / Position",
    short: "Difficult extubation · brachial plexus",
    color: "hsl(var(--primary))",
    effects: [
      "Prolonged steep head-down → laryngeal/pharyngeal oedema",
      "Robot docked over patient → no airway access mid-case",
      "Shoulder braces risk brachial plexus injury (avoid)",
      "Pressure injuries to face, scalp, and dependent areas",
    ],
    mitigation: [
      "Secure ETT meticulously before docking; have plan for emergency undock (~2–3 min)",
      "Tuck arms at sides with neutral wrist; pad ulnar nerve",
      "Cuff-leak / direct laryngoscopy before extubation — keep tube in if oedematous",
    ],
  },
];

export const PneumoperitoneumTrendelenburgDiagram = () => {
  const [selected, setSelected] = useState<SystemKey>("cv");
  const current = systems.find((s) => s.key === selected)!;

  return (
    <DiagramFigure
      id="pneumoperitoneum-trendelenburg-diagram"
      title="Pneumoperitoneum trendelenburg"
      description="Auto-generated wrapper for the Pneumoperitoneum trendelenburg anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
          <div className="my-6 space-y-4">
        <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-foreground">Pneumoperitoneum + Steep Trendelenburg — System Effects</h3>
            <p className="text-xs text-muted-foreground">
              Robotic gynae/urology physiology. Tap a body system to see the effect and how to mitigate it.
            </p>
          </div>
  
          <svg
            viewBox="0 0 600 320"
            className="w-full h-auto max-w-3xl mx-auto"
            role="img"
            aria-label="Patient in steep Trendelenburg with pneumoperitoneum showing organ-system effects"
          >
            <defs>
              <linearGradient id="ppt-bg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--muted) / 0.4)" />
                <stop offset="100%" stopColor="hsl(var(--muted) / 0.1)" />
              </linearGradient>
              <linearGradient id="ppt-belly" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--clinical) / 0.4)" />
                <stop offset="100%" stopColor="hsl(var(--clinical) / 0.1)" />
              </linearGradient>
            </defs>
  
            <rect x="0" y="0" width="600" height="320" fill="url(#ppt-bg)" />
  
            {/* Operating table tilted (head-down): higher feet, lower head */}
            <g transform="rotate(-12 300 180)">
              {/* Table */}
              <rect x="80" y="180" width="440" height="14" rx="4" fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
              {/* Patient body silhouette */}
              <ellipse cx="300" cy="160" rx="180" ry="28" fill="hsl(var(--background))" stroke="hsl(var(--border))" strokeWidth="1" />
              {/* Head */}
              <circle cx="120" cy="158" r="18" fill="hsl(var(--background))" stroke="hsl(var(--border))" strokeWidth="1" />
              {/* Insufflated abdomen */}
              <ellipse cx="320" cy="148" rx="55" ry="22" fill="url(#ppt-belly)" stroke="hsl(var(--clinical))" strokeWidth="1" />
              <text x="320" y="151" textAnchor="middle" className="fill-foreground" fontSize="9" fontWeight="600">CO₂ 12–15 mmHg</text>
            </g>
  
            {/* Tilt indicator */}
            <text x="60" y="290" className="fill-muted-foreground" fontSize="9">↓ HEAD</text>
            <text x="510" y="60" className="fill-muted-foreground" fontSize="9">↑ FEET</text>
            <text x="300" y="20" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="600">Steep Trendelenburg ≈ 25–30°</text>
  
            {/* Clickable system labels arranged around patient */}
            {([
              { key: "neuro", x: 70, y: 100, anchor: "start" as const },
              { key: "airway", x: 70, y: 240, anchor: "start" as const },
              { key: "resp", x: 530, y: 100, anchor: "end" as const },
              { key: "cv", x: 530, y: 175, anchor: "end" as const },
              { key: "renal", x: 530, y: 240, anchor: "end" as const },
            ] as const).map((pos) => {
              const sys = systems.find((s) => s.key === pos.key)!;
              const isSel = selected === pos.key;
              const w = 130;
              const x = pos.anchor === "start" ? pos.x : pos.x - w;
              return (
                    <g key={pos.key} onClick={() => setSelected(pos.key)} style={{ cursor: "pointer" }}>
                  <rect
                    x={x}
                    y={pos.y - 18}
                    width={w}
                    height={36}
                    rx={6}
                    fill={isSel ? sys.color : "hsl(var(--background))"}
                    fillOpacity={isSel ? 0.18 : 1}
                    stroke={sys.color}
                    strokeWidth={isSel ? 2 : 1}
                  />
                  <text x={x + w / 2} y={pos.y - 4} textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight={600}>
                    {sys.label}
                  </text>
                  <text x={x + w / 2} y={pos.y + 9} textAnchor="middle" className="fill-muted-foreground" fontSize="8">
                    {sys.short}
                  </text>
                </g>
    );
            })}
          </svg>
  
          {/* Detail panel */}
          <div
            className="mt-4 p-3 rounded-lg border border-border bg-background/80"
            style={{ borderLeftWidth: 4, borderLeftColor: current.color }}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <p className="font-semibold text-foreground text-sm">{current.label}</p>
              <span
                className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded-md"
                style={{ background: `${current.color}26`, color: current.color }}
              >
                {current.short}
              </span>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">Effects</p>
                <ul className="text-xs text-muted-foreground space-y-0.5 list-disc list-inside">
                  {current.effects.map((e) => (<li key={e}>{e}</li>))}
                </ul>
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">Anaesthetic mitigation</p>
                <ul className="text-xs text-muted-foreground space-y-0.5 list-disc list-inside">
                  {current.mitigation.map((m) => (<li key={m}>{m}</li>))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default PneumoperitoneumTrendelenburgDiagram;
