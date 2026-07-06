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
    detail: "Confirms metabolic acidosis. If pH normal with low HCO₃⁻, suspect compensated chronic respiratory alkalosis OR mixed disorder — still calculate the AG." },

  { id: "winters", kind: "action", x: 40, y: 100, w: 200, h: 60,
    label: "Apply Winter's: expected PaCO₂ = 1.5 × HCO₃⁻ + 8 ± 2",
    detail: "Confirms respiratory compensation is appropriate. PaCO₂ above expected → coexisting respiratory acidosis. PaCO₂ below expected → coexisting respiratory alkalosis (think sepsis, salicylate, pregnancy)." },

  { id: "ag", kind: "decision", x: 280, y: 190, w: 200, h: 60,
    label: "AG = Na⁺ − (Cl⁻ + HCO₃⁻) > 12?",
    detail: "Normal AG 8–12 (3–11 if K⁺ excluded). A raised AG means unmeasured anions: lactate, ketones, formate, glycolate, oxalate, sulphate, urate, salicylate." },

  { id: "albcorr", kind: "redflag", x: 520, y: 190, w: 220, h: 60,
    label: "Albumin-correct (always in ICU)",
    detail: "Corrected AG = measured AG + 2.5 × (40 − albumin g/L). Hypoalbuminaemia masks a raised AG — an ICU patient with albumin 20 g/L and 'normal' AG of 12 actually has a corrected AG of 17 → HAGMA hiding in plain sight." },

  { id: "nagma", kind: "action", x: 40, y: 280, w: 200, h: 60,
    label: "Normal AG → NAGMA",
    detail: "Hyperchloraemic acidosis. Causes: GI HCO₃⁻ loss (diarrhoea, high-output stoma, ileal conduit), renal tubular acidosis (1/2/4), large-volume 0.9% saline, post-hypocapnia, carbonic-anhydrase inhibitors. Calculate urinary AG to distinguish renal from GI loss." },

  { id: "hagma-conf", kind: "decision", x: 280, y: 280, w: 200, h: 60,
    label: "Raised AG → HAGMA confirmed",
    detail: "Bicarbonate has been consumed buffering H⁺ from a strong acid HA; A⁻ has joined the unmeasured-anion pool. Cl⁻ is unchanged. Now hunt for the cause." },

  { id: "lact", kind: "decision", x: 280, y: 370, w: 200, h: 60,
    label: "Lactate > 4? Ketones ≥ 3?",
    detail: "Cover the two commonest HAGMA causes first. Lactate > 4 mmol/L triggers Sepsis-6/SSC bundles. Capillary β-hydroxybutyrate ≥ 3 in a hyperglycaemic patient diagnoses DKA (JBDS 2023)." },

  { id: "treat-common", kind: "action", x: 40, y: 460, w: 200, h: 60,
    label: "Treat lactic acidosis / DKA",
    detail: "Lactic acidosis: source control, balanced crystalloid, vasopressor early (MAP ≥ 65), trend lactate. DKA: fixed-rate insulin 0.1 U/kg/h + K⁺ replete + fluids; switch to glucose 10% at CBG < 14; target ketone fall ≥ 0.5 mmol/L/h." },

  { id: "osm-gap", kind: "decision", x: 280, y: 460, w: 200, h: 60,
    label: "Osmolar gap > 10?",
    detail: "Osm gap = measured − (2×Na⁺ + urea + glucose). Raised → toxic alcohols (methanol, ethylene glycol), propylene glycol (lorazepam/diazepam infusions), mannitol, severe ketoacidosis, or pseudohyponatraemia. A normal gap LATE in presentation does not exclude toxic alcohol (parent already metabolised)." },

  { id: "tox-alc", kind: "redflag", x: 520, y: 460, w: 220, h: 60,
    label: "Suspect toxic alcohol — fomepizole",
    detail: "Start fomepizole 15 mg/kg IV empirically while awaiting levels if history strong. Send methanol/EG, lactate, Ca²⁺, urine microscopy (oxalate). Add folinic acid (methanol) or pyridoxine + thiamine (EG). HD if level > 50 mg/dL, pH < 7.15–7.30, end-organ injury, or AKI." },

  { id: "uraemic", kind: "decision", x: 280, y: 560, w: 200, h: 60,
    label: "Uraemia / AKI stage 3?",
    detail: "Retained sulphate, phosphate, urate, hippurate; AG usually 16–24. If AG > 26, hunt for a second cause (lactate, ketones, toxin). Treat hyperkalaemia, consider oral NaHCO₃ in stable CKD to keep HCO₃⁻ > 22." },

  { id: "salic", kind: "decision", x: 280, y: 650, w: 200, h: 60,
    label: "Salicylate ingestion? (mixed picture)",
    detail: "Classic ABG: respiratory alkalosis (medullary stimulation) + HAGMA (uncoupled OXPHOS, lactate, ketones). Tinnitus, tachypnoea, vomiting, hyperthermia. Send level, glucose, K⁺. AVOID intubation if possible — sudden ↓ minute ventilation drives salicylate into CNS." },

  { id: "salic-tx", kind: "redflag", x: 520, y: 650, w: 220, h: 60,
    label: "Alkalinise urine ± HD",
    detail: "1.5 L 1.26% NaHCO₃ over 2 h, urinary pH target 7.5–8.5; K⁺ MUST stay > 4 (alkalinisation fails if hypokalaemic). HD for level > 700 mg/L acute / > 500 mg/L chronic, altered mental state, pulmonary/cerebral oedema, AKI, or pH < 7.20 (EXTRIP 2015)." },

  { id: "delta", kind: "decision", x: 280, y: 740, w: 200, h: 60,
    label: "Calculate delta ratio (ΔAG / ΔHCO₃⁻)",
    detail: "< 0.4 = pure NAGMA. 0.4–1.0 = mixed HAGMA + NAGMA. 1.0–2.0 = pure HAGMA. > 2 = HAGMA + concurrent metabolic alkalosis or chronic respiratory acidosis (e.g. DKA in a vomiting patient, COPD with sepsis). Ratio outside expectation → look for a second disorder." },

  { id: "redflags", kind: "redflag", x: 280, y: 820, w: 460, h: 48,
    label: "RED FLAGS — escalate / HD now",
    detail: "pH < 7.10 with cardiovascular compromise; refractory shock; KDIGO 3 AKI with acidosis; methanol > 50 mg/dL; EG > 50 mg/dL with oxaluria; salicylate > 700 mg/L acute; MALA with lactate > 20; lactate rising despite source control; coma / seizures from any HAGMA cause." },

  { id: "support", kind: "action", x: 40, y: 820, w: 200, h: 48,
    label: "Supportive: K⁺, fluids, NO routine bicarbonate",
    detail: "BICAR-ICU (Lancet 2018): bicarbonate had no overall mortality benefit but reduced RRT need in the AKI (KDIGO 2–3) subgroup with pH < 7.20. Consider only as a bridge in life-threatening acidaemia." },
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
  { from: "lact", to: "osm-gap", label: "no" },
  { from: "osm-gap", to: "tox-alc", label: "yes" },
  { from: "osm-gap", to: "uraemic", label: "no" },
  { from: "uraemic", to: "salic", label: "no/also" },
  { from: "salic", to: "salic-tx", label: "yes" },
  { from: "salic", to: "delta", label: "no" },
  { from: "delta", to: "redflags" },
  { from: "redflags", to: "support", label: "if absent" },
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
  const node = NODES.find((n) => n.id === active)!;

  const center = (n: Node) => ({ cx: n.x + n.w / 2, cy: n.y + n.h / 2 });

  const edgePath = (e: Edge): { d: string; mx: number; my: number } => {
    const a = NODES.find((n) => n.id === e.from)!;
    const b = NODES.find((n) => n.id === e.to)!;
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
