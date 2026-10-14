import { useState } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

/**
 * Exam-style HAGMA workup flowchart
 *
 * Vertical SVG decision tree: ABG → primary disorder → Winter's →
 * albumin-corrected AG → branch on AG → osmolar gap → delta ratio →
 * cause-specific action. Clickable nodes highlight the active path and
 * reveal a teaching panel below. Red-flag nodes pulse.
 */

type Kind = "start" | "decision" | "action" | "redflag" | "end";

interface Node {
  id: string;
  kind: Kind;
  x: number; y: number; w: number; h: number;
  label: string;
  detail: string;
}

interface Edge { from: string; to: string; label?: string; }

const W = 760;
const H = 880;

const NODES: Node[] = [
  { id: "abg", kind: "start", x: 280, y: 20, w: 200, h: 48,
    label: "ABG + U&E + albumin + lactate + ketones",
    detail: "Always pair an ABG with venous chemistry. Without albumin you cannot correct the AG; without lactate and ketones you cannot screen the commonest HAGMA causes." },

  { id: "ph", kind: "decision", x: 280, y: 100, w: 200, h: 60,
    label: "pH < 7.35 AND HCO₃⁻ < 22?",
    detail: "Supports a metabolic acidosis, but mixed disturbances need assessment. If pH normal with low HCO₃⁻, suspect compensated chronic respiratory alkalosis OR mixed disorder — still calculate the AG." },

  { id: "winters", kind: "action", x: 40, y: 100, w: 200, h: 60,
    label: "Apply Winter's: expected PaCO₂ = 1.5 × HCO₃⁻ + 8 ± 2",
    detail: "Confirms respiratory compensation is appropriate. PaCO₂ above expected → coexisting respiratory acidosis. PaCO₂ below expected → coexisting respiratory alkalosis (think sepsis, salicylate, pregnancy)." },

  { id: "ag", kind: "decision", x: 280, y: 190, w: 200, h: 60,
    label: "Albumin-corrected AG above lab range?",
    detail: "Use the local Na-only AG reference interval; the French panel quotes 12 ±4 mmol/L without potassium. A raised AG means unmeasured anions: lactate, ketones, formate, glycolate, oxalate, sulphate, urate, salicylate." },

  { id: "albcorr", kind: "redflag", x: 520, y: 190, w: 220, h: 60,
    label: "Albumin-correct (always in ICU)",
    detail: "Corrected AG = measured AG + 0.25 × (40 − albumin g/L). Hypoalbuminaemia masks a raised AG — an ICU patient with albumin 20 g/L and 'normal' AG of 12 actually has a corrected AG of 17 → HAGMA hiding in plain sight." },

  { id: "nagma", kind: "action", x: 40, y: 280, w: 200, h: 60,
    label: "Normal corrected AG → assess NAGMA",
    detail: "Hyperchloraemic acidosis. Causes: GI HCO₃⁻ loss (diarrhoea, high-output stoma, ileal conduit), renal tubular acidosis (1/2/4), large-volume 0.9% saline, post-hypocapnia, carbonic-anhydrase inhibitors. If the cause is unclear, consider urinary ammonium/UAG with its limitations; proximal RTA can have a negative UAG." },

  { id: "hagma-conf", kind: "decision", x: 280, y: 280, w: 200, h: 60,
    label: "Raised corrected AG → investigate",
    detail: "Bicarbonate has been consumed buffering H⁺ from a strong acid HA; A⁻ has joined the unmeasured-anion pool. Cl⁻ is unchanged. Now hunt for the cause." },

  { id: "lact", kind: "decision", x: 280, y: 370, w: 200, h: 60,
    label: "Measure lactate and blood ketones",
    detail: "Cover the two commonest HAGMA causes first. Any raised lactate merits clinical assessment; do not wait for 4 mmol/L. Blood ketones require interpretation with pH/bicarbonate, diabetes and drug history; SGLT2-associated DKA may be euglycaemic." },

  { id: "treat-common", kind: "action", x: 40, y: 460, w: 200, h: 60,
    label: "Treat lactic acidosis / DKA",
    detail: "Treat the clinical cause of lactate elevation. For DKA use the current fluid, insulin and potassium protocol and monitor blood ketones; do not substitute glucose for resuscitation fluid or wait for a high glucose to recognise euglycaemic DKA." },

  { id: "osm-gap", kind: "decision", x: 280, y: 460, w: 200, h: 60,
    label: "Osmolar gap > 10?",
    detail: "Osm gap = measured − (2×Na⁺ + urea + glucose). Raised → toxic alcohols (methanol, ethylene glycol), propylene glycol (lorazepam/diazepam infusions), mannitol, severe ketoacidosis, or pseudohyponatraemia. A normal gap at any stage cannot exclude toxic exposure; late presentation may have little remaining parent alcohol." },

  { id: "tox-alc", kind: "redflag", x: 520, y: 460, w: 220, h: 60,
    label: "Suspect toxic alcohol — fomepizole",
    detail: "Urgent NPIS/TOXBASE advice; sample for direct levels without delaying indicated ADH blockade. Dialysis depends on toxin, antidote, acid–base status and organ injury. Use the current EXTRIP criteria shown below, not a universal 50 mg/dL trigger." },

  { id: "uraemic", kind: "decision", x: 280, y: 560, w: 200, h: 60,
    label: "Uraemia / AKI stage 3?",
    detail: "Assess renal function and retained acid, but also lactate, ketones and exposure. Do not impose a fixed maximum renal AG or prescribe bicarbonate from the gap alone; seek renal input for refractory acidosis or other dialysis indications." },

  { id: "salic", kind: "decision", x: 280, y: 650, w: 200, h: 60,
    label: "Salicylate ingestion? (mixed picture)",
    detail: "Classic ABG: respiratory alkalosis (medullary stimulation) + HAGMA (uncoupled OXPHOS, lactate, ketones). Tinnitus, tachypnoea, vomiting, hyperthermia. Send level, glucose, K⁺. AVOID intubation if possible — sudden ↓ minute ventilation drives salicylate into CNS." },

  { id: "salic-tx", kind: "redflag", x: 520, y: 650, w: 220, h: 60,
    label: "Alkalinise urine ± HD",
    detail: "Urgent NPIS/TOXBASE advice for specialist-directed bicarbonate therapy and dialysis assessment. EXTRIP uses symptoms, oxygen requirement, treatment failure, pH and level/renal function together. Do not use a universal 700 mg/L acute or 500 mg/L chronic rule." },

  { id: "delta", kind: "decision", x: 280, y: 740, w: 200, h: 60,
    label: "Calculate delta ratio (ΔAG / ΔHCO₃⁻)",
    detail: "< 0.4 = pure NAGMA. 0.4–1.0 = mixed HAGMA + NAGMA. 1.0–2.0 = compatible with predominantly HAGMA; mixed disorders remain possible. > 2 = HAGMA + concurrent metabolic alkalosis or chronic respiratory acidosis (e.g. DKA in a vomiting patient, COPD with sepsis). Ratio outside expectation → look for a second disorder." },

  { id: "redflags", kind: "redflag", x: 280, y: 820, w: 460, h: 48,
    label: "RED FLAGS — urgent senior assessment",
    detail: "Urgently escalate severe acidaemia with cardiovascular compromise, refractory shock, organ dysfunction or suspected severe poisoning. The need for dialysis is cause-specific and is not established by one generic numerical threshold." },

  { id: "support", kind: "action", x: 40, y: 820, w: 200, h: 48,
    label: "Supportive: K⁺, fluids, NO routine bicarbonate",
    detail: "Treat the cause and monitor ventilation and electrolytes. Bicarbonate is not routine for every HAGMA. See the separate BICAR-ICU lesson for trial eligibility, AKIN stage 2–3 subgroup findings and limitations." },
];

const EDGES: Edge[] = [
  { from: "abg", to: "ph" },
  { from: "ph", to: "winters", label: "in parallel" },
  { from: "ph", to: "ag", label: "yes" },
  { from: "ag", to: "albcorr", label: "always" },
  { from: "ag", to: "nagma", label: "no" },
  { from: "ag", to: "hagma-conf", label: "yes" },
  { from: "hagma-conf", to: "lact" },
  { from: "lact", to: "treat-common", label: "yes" },
  { from: "lact", to: "osm-gap", label: "also assess" },
  { from: "osm-gap", to: "tox-alc", label: "exposure suspected" },
  { from: "osm-gap", to: "uraemic", label: "no" },
  { from: "uraemic", to: "salic", label: "no/also" },
  { from: "salic", to: "salic-tx", label: "yes" },
  { from: "salic", to: "delta", label: "no" },
  { from: "delta", to: "redflags" },
  { from: "redflags", to: "support", label: "in parallel" },
];

const nodeFill = (kind: Kind, active: boolean): string => {
  if (active) return "hsl(var(--primary))";
  switch (kind) {
    case "start": return "hsl(var(--icu) / 0.18)";
    case "decision": return "hsl(var(--secondary))";
    case "action": return "hsl(var(--physiology) / 0.15)";
    case "redflag": return "hsl(0 70% 55% / 0.12)";
    case "end": return "hsl(var(--muted))";
  }
};
const nodeStroke = (kind: Kind, active: boolean): string => {
  if (active) return "hsl(var(--primary))";
  if (kind === "redflag") return "hsl(0 70% 55%)";
  return "hsl(var(--border))";
};
const nodeText = (kind: Kind, active: boolean): string => {
  if (active) return "hsl(var(--primary-foreground))";
  return "hsl(var(--foreground))";
};

const HAGMAWorkupFlowchart = () => {
  const [active, setActive] = useState<string>("abg");
  const node = NODES.find((n) => n.id === active) ?? NODES[0];

  const center = (n: Node) => ({ cx: n.x + n.w / 2, cy: n.y + n.h / 2 });

  const edgePath = (e: Edge): { d: string; mx: number; my: number } => {
    const a = NODES.find((n) => n.id === e.from) ?? NODES[0];
    const b = NODES.find((n) => n.id === e.to) ?? NODES[0];
    const ac = center(a);
    const bc = center(b);
    // Start at bottom of a (or side if horizontal), end at top of b (or side)
    let x1 = ac.cx, y1 = a.y + a.h;
    let x2 = bc.cx, y2 = b.y;
    if (Math.abs(ac.cy - bc.cy) < 30) {
      // horizontal
      const goingRight = bc.cx > ac.cx;
      x1 = goingRight ? a.x + a.w : a.x;
      y1 = ac.cy;
      x2 = goingRight ? b.x : b.x + b.w;
      y2 = bc.cy;
      return { d: `M ${x1} ${y1} L ${x2} ${y2}`, mx: (x1 + x2) / 2, my: y1 - 6 };
    }
    if (Math.abs(ac.cx - bc.cx) < 30) {
      return { d: `M ${x1} ${y1} L ${x2} ${y2}`, mx: x1 + 8, my: (y1 + y2) / 2 };
    }
    // bent — out the side then down
    const goingRight = bc.cx > ac.cx;
    x1 = goingRight ? a.x + a.w : a.x;
    y1 = ac.cy;
    x2 = bc.cx;
    y2 = b.y;
    const midX = goingRight ? Math.max(x1 + 16, x2) : Math.min(x1 - 16, x2);
    return { d: `M ${x1} ${y1} L ${midX} ${y1} L ${midX} ${y2 - 14} L ${x2} ${y2}`, mx: midX + (goingRight ? 6 : -6), my: y1 - 6 };
  };

  return (
    <DiagramFigure
      id="hagma-workup-flowchart"
      title="HAGMA workup flowchart (exam-style)"
      description="Vertical decision tree from ABG through Winter's, albumin-corrected anion gap, osmolar gap, cause-specific branches, and the delta ratio, ending in red-flag escalation triggers."
    >
      <div className="border border-border rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <h3 className="text-base font-serif font-bold text-foreground">HAGMA workup — exam-style flowchart</h3>
          <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
            <span className="inline-flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-sm" style={{ background: "hsl(var(--icu) / 0.5)" }} /> Start</span>
            <span className="inline-flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-sm" style={{ background: "hsl(var(--secondary))" }} /> Decision</span>
            <span className="inline-flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-sm" style={{ background: "hsl(var(--physiology) / 0.4)" }} /> Action</span>
            <span className="inline-flex items-center gap-1"><span className="inline-block w-3 h-3 rounded-sm border" style={{ background: "hsl(0 70% 55% / 0.25)", borderColor: "hsl(0 70% 55%)" }} /> Red flag</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto min-w-[640px]" role="img" aria-labelledby="hagma-workup-flowchart-title hagma-workup-flowchart-desc">
            <title id="hagma-workup-flowchart-title">HAGMA workup flowchart</title>
            <desc id="hagma-workup-flowchart-desc">Interactive vertical decision tree.</desc>

            <defs>
              <marker id="arr-flow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" fill="hsl(var(--muted-foreground))" />
              </marker>
            </defs>

            {/* Edges */}
            {EDGES.map((e, i) => {
              const p = edgePath(e);
              return (
                <g key={i}>
                  <path d={p.d} fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth={1.2} markerEnd="url(#arr-flow)" />
                  {e.label && (
                    <text x={p.mx} y={p.my} className="fill-muted-foreground" style={{ fontSize: 9, fontStyle: "italic" }}>
                      {e.label}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Nodes */}
            {NODES.map((n) => {
              const isActive = n.id === active;
              const fill = nodeFill(n.kind, isActive);
              const stroke = nodeStroke(n.kind, isActive);
              const txt = nodeText(n.kind, isActive);
              const rx = n.kind === "decision" ? 22 : n.kind === "start" || n.kind === "end" ? 22 : 8;
              return (
                <g key={n.id} onClick={() => setActive(n.id)} style={{ cursor: "pointer" }}>
                  <rect
                    x={n.x} y={n.y} width={n.w} height={n.h}
                    rx={rx} ry={rx}
                    fill={fill} stroke={stroke}
                    strokeWidth={isActive ? 2.5 : 1.2}
                    style={{ transition: "all 250ms" }}
                  >
                    {n.kind === "redflag" && !isActive && (
                      <animate attributeName="stroke-opacity" values="1;0.45;1" dur="2s" repeatCount="indefinite" />
                    )}
                  </rect>
                  <foreignObject x={n.x + 6} y={n.y + 4} width={n.w - 12} height={n.h - 8}>
                    <div
                      style={{
                        width: "100%", height: "100%",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        textAlign: "center", color: txt,
                        fontSize: 11, fontWeight: 600, lineHeight: 1.2,
                        fontFamily: "Inter, sans-serif",
                      }}
                    >
                      {n.label}
                    </div>
                  </foreignObject>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Detail panel for selected node */}
        <div className="mt-3 p-3 rounded-md border border-primary/30 bg-primary/5 animate-fade-in" key={active}>
          <p className="text-sm font-semibold text-foreground">{node.label}</p>
          <p className="text-sm text-muted-foreground mt-1">{node.detail}</p>
        </div>

        <p className="mt-3 text-[10px] text-muted-foreground italic">
          Tap any node to see the teaching point. Red-flag nodes pulse — these are the triggers an examiner expects you to verbalise out loud.
        </p>
      </div>
    </DiagramFigure>
  );
};

export default HAGMAWorkupFlowchart;
