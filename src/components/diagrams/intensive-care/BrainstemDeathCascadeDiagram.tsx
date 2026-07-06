import { useState } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

/**
 * Brainstem death physiological cascade & donor management targets.
 *
 * Three-phase timeline:
 *   1. Catecholamine storm   — coning → massive sympathetic outflow
 *   2. Vasomotor collapse    — loss of medullary control, vasoplegia
 *   3. Endocrine collapse    — DI, hypothyroidism, hypocortisolism, hyperglycaemia
 * Each phase reveals the bedside derangements and the matched donor-optimisation
 * intervention.
 */

type PhaseKey = "storm" | "collapse" | "endocrine";

interface Phase {
  key: PhaseKey;
  label: string;
  timing: string;
  mechanism: string;
  bedside: string[];
  management: string[];
  color: string;
}

const PHASES: Phase[] = [
  {
    key: "storm",
    label: "1. Catecholamine storm",
    timing: "Minutes around coning",
    mechanism:
      "Brainstem ischaemia → massive sympathetic outflow (Cushing response then loss of inhibition). Plasma adrenaline rises 100–1000-fold.",
    bedside: [
      "Severe hypertension, tachycardia",
      "↑ SVR, ↑ myocardial O₂ demand",
      "Subendocardial ischaemia, troponin rise",
      "Neurogenic pulmonary oedema (capillary stress failure)",
    ],
    management: [
      "Short-acting β-blocker (esmolol) or GTN if MAP > 90 mmHg sustained",
      "Avoid long-acting agents — storm is transient",
      "Lung-protective ventilation, PEEP, recruitment for NPO",
      "Echo to document baseline LV function",
    ],
    color: "hsl(0 70% 50%)",
  },
  {
    key: "collapse",
    label: "2. Vasomotor collapse",
    timing: "Hours after BSD",
    mechanism:
      "Loss of medullary vasomotor centre → sympathetic withdrawal, profound vasoplegia and relative hypovolaemia. Cardiac stunning compounds the picture.",
    bedside: [
      "Hypotension, ↓ SVR, warm peripheries",
      "Reduced preload (vasoplegia + DI losses)",
      "Lactate rise, oliguria",
      "Hypothermia (lost thermoregulation)",
    ],
    management: [
      "Target MAP ≥ 60–65 mmHg, CVP 6–10 mmHg",
      "Vasopressin 0.5–4 U/h first line (treats both DI and vasoplegia, opioid-sparing of catecholamines)",
      "Noradrenaline as needed; minimise high-dose catecholamines (heart graft preservation)",
      "Active warming to 35–37 °C",
    ],
    color: "hsl(210 70% 50%)",
  },
  {
    key: "endocrine",
    label: "3. Endocrine collapse",
    timing: "Within 6–12 h",
    mechanism:
      "Pituitary infarction → cranial DI (~65%), hypothyroidism, hypocortisolism. Hyperglycaemia from insulin resistance and steroid use.",
    bedside: [
      "Polyuria > 4 mL/kg/h, hypernatraemia (Na⁺ > 150)",
      "Urine osm < 300, serum osm > 305",
      "Low T3/T4, low cortisol",
      "Hyperglycaemia, K⁺/Mg²⁺/PO₄³⁻ shifts",
    ],
    management: [
      "DDAVP 1–4 µg IV for DI; titrate to urine output < 4 mL/kg/h",
      "Methylprednisolone 15 mg/kg IV (single dose) — reduces lung oedema, improves graft yield",
      "T3 / T4 if EF < 45 % or escalating inotropes (controversial but widely used)",
      "Insulin infusion: glucose 6–10 mmol/L; Na⁺ < 155 mmol/L (liver graft)",
    ],
    color: "hsl(140 55% 40%)",
  },
];

const W = 760;
const H = 360;

export const BrainstemDeathCascadeDiagram = () => {
  const [active, setActive] = useState<PhaseKey>("storm");
  const phase = PHASES.find((p) => p.key === active)!;
  const phaseIdx = PHASES.findIndex((p) => p.key === active);

  return (
    <DiagramFigure
      id="brainstem-death-cascade"
      title="Brainstem death physiological cascade"
      description="Three-phase timeline from catecholamine storm through vasomotor collapse to endocrine failure, with matched donor optimisation targets at each phase."
    >
      <div className="my-6">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="overflow-x-auto">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto min-w-[640px]" style={{ maxHeight: H }}>
              <defs>
                <marker id="bsd-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                  <path d="M0,0 L8,3 L0,6" fill="hsl(var(--muted-foreground))" />
                </marker>
              </defs>

              {/* Trigger node */}
              <rect x="20" y="140" width="150" height="70" rx="10"
                fill="hsl(var(--destructive) / 0.12)" stroke="hsl(var(--destructive))" strokeWidth="2" />
              <text x="95" y="170" textAnchor="middle" className="fill-foreground" fontSize="13" fontWeight="700">Coning</text>
              <text x="95" y="190" textAnchor="middle" className="fill-muted-foreground" fontSize="11">↑ ICP → brainstem</text>
              <text x="95" y="204" textAnchor="middle" className="fill-muted-foreground" fontSize="11">ischaemia</text>

              {/* Phase pills */}
              {PHASES.map((p, i) => {
                const x = 200 + i * 190;
                const isActive = p.key === active;
                return (
                  <g key={p.key} style={{ cursor: "pointer" }} onClick={() => setActive(p.key)}>
                    <rect
                      x={x} y="140" width="170" height="70" rx="10"
                      fill={isActive ? p.color : "hsl(var(--card))"}
                      stroke={p.color}
                      strokeWidth={isActive ? 3 : 1.5}
                      opacity={isActive ? 0.95 : 0.85}
                    />
                    <text x={x + 85} y="170" textAnchor="middle"
                      className={isActive ? "fill-primary-foreground" : "fill-foreground"}
                      fontSize="12" fontWeight="700">
                      {p.label}
                    </text>
                    <text x={x + 85} y="190" textAnchor="middle"
                      className={isActive ? "fill-primary-foreground" : "fill-muted-foreground"}
                      fontSize="10.5">
                      {p.timing}
                    </text>
                  </g>
                );
              })}

              {/* Connecting arrows */}
              {[170, 370, 560].map((x1, i) => (
                <line key={i} x1={x1} y1="175" x2={x1 + 30} y2="175"
                  stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" markerEnd="url(#bsd-arrow)" />
              ))}

              {/* Timeline axis */}
              <line x1="20" y1="260" x2={W - 20} y2="260" stroke="hsl(var(--border))" strokeWidth="1" />
              <text x="20" y="280" className="fill-muted-foreground" fontSize="10">t = 0 (coning)</text>
              <text x={W / 2} y="280" textAnchor="middle" className="fill-muted-foreground" fontSize="10">Hours</text>
              <text x={W - 20} y="280" textAnchor="end" className="fill-muted-foreground" fontSize="10">Donor optimisation phase</text>

              {/* Indicator under active pill */}
              <polygon
                points={`${200 + phaseIdx * 190 + 85 - 8},230 ${200 + phaseIdx * 190 + 85 + 8},230 ${200 + phaseIdx * 190 + 85},242`}
                fill={phase.color}
              />

              {/* Header */}
              <text x={W / 2} y="30" textAnchor="middle" className="fill-foreground" fontSize="15" fontWeight="700">
                Brainstem Death — Physiological Cascade
              </text>
              <text x={W / 2} y="50" textAnchor="middle" className="fill-muted-foreground" fontSize="11">
                Click a phase to see bedside picture and donor-optimisation targets
              </text>
            </svg>
          </div>

          {/* Detail panel */}
          <div className="mt-4 grid md:grid-cols-2 gap-3">
            <div className="p-3 rounded-lg border border-border bg-secondary/30">
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Mechanism</p>
              <p className="text-sm text-foreground leading-relaxed mb-3">{phase.mechanism}</p>
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Bedside picture</p>
              <ul className="text-sm text-muted-foreground list-disc list-inside space-y-0.5">
                {phase.bedside.map((b) => <li key={b}>{b}</li>)}
              </ul>
            </div>
            <div className="p-3 rounded-lg border" style={{ borderColor: phase.color, backgroundColor: `${phase.color.replace(")", " / 0.08)")}` }}>
              <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Donor management</p>
              <ul className="text-sm text-foreground list-disc list-inside space-y-1">
                {phase.management.map((m) => <li key={m}>{m}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default BrainstemDeathCascadeDiagram;
