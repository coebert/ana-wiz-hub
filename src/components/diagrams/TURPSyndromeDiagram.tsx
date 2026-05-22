import { useState } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * TURP Syndrome — interactive process diagram.
 * Shows hypotonic glycine 1.5% absorption via open prostatic venous sinuses,
 * the cascade of dilutional hyponatraemia → CNS / CV / visual features,
 * and key management levers. Click a stage to reveal the clinical detail.
 */

type StageKey =
  | "irrigant"
  | "absorption"
  | "dilution"
  | "cns"
  | "cv"
  | "visual"
  | "management";

interface Stage {
  key: StageKey;
  title: string;
  badge: string;
  detail: string;
  color: string;
}

const stages: Stage[] = [
  {
    key: "irrigant",
    title: "Hypotonic glycine 1.5% irrigant",
    badge: "Source",
    detail:
      "Glycine 1.5% is hypotonic (osmolality ~200 mOsm/kg). Used in monopolar TURP because it is non-conductive. Bag height >60 cm above patient ↑ absorption pressure. Modern bipolar TURP uses 0.9% saline — eliminates hyponatraemia risk but fluid overload still possible.",
    color: "hsl(var(--clinical))",
  },
  {
    key: "absorption",
    title: "Open prostatic venous sinuses",
    badge: "Route",
    detail:
      "Resection of vascular prostate exposes large venous sinuses → systemic absorption ~20 mL/min. Risk rises sharply with resection time >60 min, gland >40 g, capsule perforation, and high irrigant bag height.",
    color: "hsl(var(--clinical))",
  },
  {
    key: "dilution",
    title: "Dilutional hyponatraemia + fluid overload",
    badge: "Pathophysiology",
    detail:
      "Free-water absorption → serum Na⁺ falls (often <120 mmol/L) and intravascular volume expands. Rapid rate of fall (not absolute Na⁺) drives the symptoms. Glycine itself is metabolised to ammonia and glyoxylate — adds CNS toxicity in hepatic impairment.",
    color: "hsl(var(--destructive))",
  },
  {
    key: "cns",
    title: "CNS — confusion, seizures, coma",
    badge: "Feature",
    detail:
      "Cerebral oedema from hypo-osmolality. In an awake spinal patient: restlessness, nausea, headache → confusion → seizures → coma. Under GA these heralds are masked — relying on physiological monitors only delays diagnosis.",
    color: "hsl(var(--destructive))",
  },
  {
    key: "cv",
    title: "CV — hypertension then collapse",
    badge: "Feature",
    detail:
      "Volume overload first → hypertension, bradycardia, raised CVP, pulmonary oedema. Late: myocardial depression from hyponatraemia + acidosis → hypotension and arrhythmias. ECG: widened QRS, ST changes.",
    color: "hsl(var(--destructive))",
  },
  {
    key: "visual",
    title: "Transient blindness",
    badge: "Feature",
    detail:
      "Glycine is an inhibitory neurotransmitter at retinal level → blurred vision and transient blindness with normal pupillary reflexes (post-chiasmatic origin). Resolves within 24–48 h. Pathognomonic when present.",
    color: "hsl(var(--accent))",
  },
  {
    key: "management",
    title: "Management",
    badge: "Treat",
    detail:
      "1) Tell surgeon to STOP and achieve haemostasis; lower irrigant bag. 2) Bloods: Na⁺, osmolality, ABG, ammonia. 3) Symptomatic Na⁺ <120: 3% NaCl 1–2 mL/kg over 10 min, repeat until symptoms abate. 4) Furosemide 20–40 mg IV for pulmonary oedema. 5) Cap Na⁺ rise at ≤10 mmol/L per 24 h to avoid central pontine myelinolysis. 6) HDU/ICU; secure airway if seizures/coma.",
    color: "hsl(var(--primary))",
  },
];

export interface TURPSyndromeDiagramProps {
  /** Switch anatomical labels for the gynaecological / hysteroscopy context (uterine vasculature instead of prostatic sinuses). */
  context?: "turp" | "hysteroscopy";
}

export const TURPSyndromeDiagram = ({ context = "turp" }: TURPSyndromeDiagramProps = {}) => {
  const [selected, setSelected] = useState<StageKey>("absorption");
  const isHyst = context === "hysteroscopy";
  const contextStages: Stage[] = isHyst
    ? stages.map((s) =>
        s.key === "absorption"
          ? {
              ...s,
              title: "Open uterine venous sinuses",
              detail:
                "Operative hysteroscopy (resection of fibroids, endometrial ablation) exposes uterine venous sinuses → systemic absorption of distension fluid. Risk rises with intrauterine pressure >100 mmHg, resection time, uterine perforation, and large vascular fibroids.",
            }
          : s
      )
    : stages;
  const current = contextStages.find((s) => s.key === selected)!;

  // Node positions in viewBox 600x340
  const nodes: Record<StageKey, { x: number; y: number; w: number; h: number; label: string }> = {
    irrigant: { x: 30, y: 30, w: 170, h: 56, label: "Glycine 1.5%\n(hypotonic)" },
    absorption: {
      x: 220,
      y: 30,
      w: 170,
      h: 56,
      label: isHyst ? "Uterine venous\nsinuses" : "Prostatic venous\nsinuses",
    },
    dilution: { x: 410, y: 30, w: 170, h: 56, label: "↓ Na⁺ + volume\noverload" },
    cns: { x: 30, y: 140, w: 170, h: 56, label: "CNS — confusion,\nseizures, coma" },
    cv: { x: 220, y: 140, w: 170, h: 56, label: "CV — HTN → collapse,\npulmonary oedema" },
    visual: { x: 410, y: 140, w: 170, h: 56, label: "Visual — transient\nblindness (glycine)" },
    management: { x: 130, y: 250, w: 340, h: 60, label: "STOP surgery → 3% NaCl + furosemide → ICU" },
  };

  return (
    <DiagramFigure
      id="turp-syndrome-diagram"
      title="TURP syndrome"
      description="Auto-generated wrapper for the TURP syndrome anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="my-6 space-y-4">
        <div className="rounded-xl border border-border bg-card p-4 sm:p-5">
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-foreground">TURP Syndrome — Cascade & Management</h3>
            <p className="text-xs text-muted-foreground">
              Tap a stage to see the underlying pathophysiology and clinical action.
            </p>
          </div>
  
          <svg
            viewBox="0 0 600 340"
            className="w-full h-auto max-w-3xl mx-auto"
            role="img"
            aria-label="TURP syndrome cascade from glycine absorption to clinical features and management"
          >
            <defs>
              <marker id="trp-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" fill="hsl(var(--muted-foreground))" />
              </marker>
              <linearGradient id="trp-flow" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(var(--clinical) / 0.15)" />
                <stop offset="100%" stopColor="hsl(var(--destructive) / 0.15)" />
              </linearGradient>
            </defs>
  
            {/* Top row backdrop */}
            <rect x="20" y="20" width="570" height="80" rx="10" fill="url(#trp-flow)" opacity="0.5" />
  
            {/* Connectors top row */}
            <line x1="200" y1="58" x2="220" y2="58" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" markerEnd="url(#trp-arrow)" />
            <line x1="390" y1="58" x2="410" y2="58" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" markerEnd="url(#trp-arrow)" />
  
            {/* Down connectors from dilution to cns/cv/visual */}
            <path d="M115 86 L115 140" stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeDasharray="3 3" markerEnd="url(#trp-arrow)" fill="none" />
            <path d="M305 86 L305 140" stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeDasharray="3 3" markerEnd="url(#trp-arrow)" fill="none" />
            <path d="M495 86 L495 140" stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeDasharray="3 3" markerEnd="url(#trp-arrow)" fill="none" />
  
            {/* Down connectors features → management */}
            <path d="M115 196 L260 250" stroke="hsl(var(--muted-foreground))" strokeWidth="1" opacity="0.5" fill="none" />
            <path d="M305 196 L305 250" stroke="hsl(var(--muted-foreground))" strokeWidth="1" opacity="0.5" fill="none" />
            <path d="M495 196 L350 250" stroke="hsl(var(--muted-foreground))" strokeWidth="1" opacity="0.5" fill="none" />
  
            {/* Nodes */}
            {(Object.keys(nodes) as StageKey[]).map((key) => {
              const n = nodes[key];
              const isSel = selected === key;
              const stage = contextStages.find((s) => s.key === key)!;
              return (
                    <g key={key} onClick={() => setSelected(key)} style={{ cursor: "pointer" }}>
                  <rect
                    x={n.x}
                    y={n.y}
                    width={n.w}
                    height={n.h}
                    rx={8}
                    fill={isSel ? stage.color : "hsl(var(--background))"}
                    fillOpacity={isSel ? 0.18 : 1}
                    stroke={stage.color}
                    strokeWidth={isSel ? 2 : 1}
                  />
                  {n.label.split("\n").map((line, i) => (
                    <text
                      key={i}
                      x={n.x + n.w / 2}
                      y={n.y + (n.h / 2) - 4 + i * 12}
                      textAnchor="middle"
                      className="fill-foreground select-none"
                      fontSize="10"
                      fontWeight={isSel ? 600 : 500}
                    >
                      {line}
                    </text>
                  ))}
                </g>
    );
            })}
          </svg>
  
          {/* Detail panel */}
          <div
            className="mt-4 p-3 rounded-lg border border-border bg-background/80"
            style={{ borderLeftWidth: 4, borderLeftColor: current.color }}
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <p className="font-semibold text-foreground text-sm">{current.title}</p>
              <span
                className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded-md"
                style={{ background: `${current.color}26`, color: current.color }}
              >
                {current.badge}
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">{current.detail}</p>
          </div>
  
          <p className="text-[11px] text-muted-foreground mt-3 italic text-center">
            Risk factors: gland &gt;40 g · resection time &gt;60 min · capsule perforation · irrigant bag &gt;60 cm above patient.
          </p>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default TURPSyndromeDiagram;
