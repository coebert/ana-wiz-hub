import { useState } from "react";

type StepId = "trigger" | "pvr" | "rv-dilate" | "septal" | "lv-fill" | "hypotension" | "ischaemia";

interface SpiralStep {
  id: StepId;
  shortLabel: string;
  title: string;
  mechanism: string;
  consequences: string[];
  intervention: string;
  // polar coords on the spiral (deg, radius 0-1 from centre)
  angle: number;
  radius: number;
}

const steps: SpiralStep[] = [
  {
    id: "trigger",
    shortLabel: "Trigger",
    title: "1 — Acute trigger",
    mechanism:
      "Hypoxia, hypercarbia, acidosis, pain, suctioning, sepsis, PE, missed pulmonary vasodilator dose, or excessive PEEP precipitate hypoxic pulmonary vasoconstriction and a sudden rise in pulmonary vascular resistance.",
    consequences: [
      "Acute increase in RV afterload",
      "Often missed in non-specialist settings",
    ],
    intervention:
      "Identify and reverse trigger: 100% O₂, mild hyperventilation (PaCO₂ 4.0–4.5 kPa, pH 7.45–7.50), deepen anaesthesia, drain pneumothorax, treat sepsis.",
    angle: -90,
    radius: 0.95,
  },
  {
    id: "pvr",
    shortLabel: "↑ PVR",
    title: "2 — Pulmonary vascular resistance rises",
    mechanism:
      "PVR rises acutely on a vasculature that may already be remodelled. The thin-walled RV cannot rapidly hypertrophy and faces afterload it was never designed to overcome.",
    consequences: [
      "RV stroke work doubles for the same output",
      "RV wall tension and O₂ demand rise sharply",
    ],
    intervention:
      "Selective pulmonary vasodilator: inhaled NO 10–40 ppm OR nebulised iloprost 5–10 µg. Avoid IV vasodilators (worsen V/Q mismatch and SVR).",
    angle: -25,
    radius: 0.85,
  },
  {
    id: "rv-dilate",
    shortLabel: "RV dilates",
    title: "3 — RV dilatation & TR",
    mechanism:
      "The RV dilates to maintain stroke volume (Frank-Starling) but stretches the tricuspid annulus, causing functional tricuspid regurgitation. Regurgitant volume re-loads the RV — a self-perpetuating cycle.",
    consequences: [
      "Functional TR worsens RV volume overload",
      "Rising CVP, congested liver, peripheral oedema",
    ],
    intervention:
      "Avoid further volume loading (CVP target 8–12 mmHg). Bedside echo to assess RV size and TR severity. Diurese cautiously if overfilled.",
    angle: 40,
    radius: 0.70,
  },
  {
    id: "septal",
    shortLabel: "Septal shift",
    title: "4 — Interventricular septal shift",
    mechanism:
      "The dilated, high-pressure RV bulges the interventricular septum leftward (reverse Bernheim effect). The LV cavity becomes D-shaped on short-axis echo and loses its normal circular geometry.",
    consequences: [
      "LV diastolic compliance falls",
      "Pericardial constraint adds further restriction",
    ],
    intervention:
      "Maintain sinus rhythm (atrial kick now contributes ≥30% of RV output) — cardiovert AF promptly. Consider milrinone (PDE-3i) for lusitropy.",
    angle: 105,
    radius: 0.55,
  },
  {
    id: "lv-fill",
    shortLabel: "↓ LV filling",
    title: "5 — Reduced LV preload & cardiac output",
    mechanism:
      "Septal shift and pericardial constraint reduce LV end-diastolic volume. Cardiac output falls despite a normal LV ejection fraction — the LV has nothing to eject.",
    consequences: [
      "Stroke volume falls",
      "Mixed venous saturation drops",
    ],
    intervention:
      "Inotropic support: dobutamine 2–10 µg/kg/min OR milrinone (preserves pulmonary vasodilatation). Avoid pure α-agonists alone.",
    angle: 170,
    radius: 0.40,
  },
  {
    id: "hypotension",
    shortLabel: "↓ MAP",
    title: "6 — Systemic hypotension",
    mechanism:
      "Falling cardiac output drops mean arterial pressure. Crucially, MAP now approaches RV systolic pressure — the pressure gradient driving RV coronary perfusion collapses.",
    consequences: [
      "MAP < RV pressure removes the perfusion gradient",
      "Lactate rises; end-organs hypoperfuse",
    ],
    intervention:
      "Restore SVR aggressively: noradrenaline 0.05–0.5 µg/kg/min ± vasopressin 0.01–0.04 U/min. Goal: MAP > PAP at all times.",
    angle: 235,
    radius: 0.28,
  },
  {
    id: "ischaemia",
    shortLabel: "RV ischaemia",
    title: "7 — RV ischaemia → arrest",
    mechanism:
      "The RV is normally perfused throughout the cardiac cycle. Once RV pressure approaches aortic pressure, perfusion becomes systolic-only — exactly when O₂ demand is highest. RV ischaemia worsens contractility, the spiral closes, and PEA arrest follows.",
    consequences: [
      "RV contractility collapses → further ↑ in PVR/RV dilatation",
      "PEA arrest is the terminal event",
    ],
    intervention:
      "Refractory crisis: VA-ECMO as bridge to recovery, transplantation, or pulmonary endarterectomy. Call for help early — survival depends on cannulation before arrest.",
    angle: 300,
    radius: 0.15,
  },
];

const SVG_SIZE = 360;
const CENTRE = SVG_SIZE / 2;
const MAX_R = 150;

const polar = (angleDeg: number, radius: number) => {
  const r = radius * MAX_R;
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CENTRE + r * Math.cos(rad), y: CENTRE + r * Math.sin(rad) };
};

// Logarithmic-ish spiral path connecting all nodes
const spiralPath = () => {
  const pts = steps.map((s) => polar(s.angle, s.radius));
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[i - 1];
    const curr = pts[i];
    // gentle quadratic curve toward the centre
    const cx = (prev.x + curr.x) / 2 + (CENTRE - (prev.x + curr.x) / 2) * 0.25;
    const cy = (prev.y + curr.y) / 2 + (CENTRE - (prev.y + curr.y) / 2) * 0.25;
    d += ` Q ${cx} ${cy} ${curr.x} ${curr.y}`;
  }
  return d;
};

const RVFailureSpiralDiagram = () => {
  const [selected, setSelected] = useState<StepId>("trigger");
  const data = steps.find((s) => s.id === selected)!;
  const selectedIdx = steps.findIndex((s) => s.id === selected);

  return (
    <div className="space-y-4 mb-8">
      <div className="p-4 rounded-lg border border-border bg-card">
        <h2 className="text-xl font-serif font-bold text-foreground mb-1">
          The RV Failure Spiral
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          A self-perpetuating cycle in pulmonary hypertension. Each turn tightens
          inward: rising PVR overloads the right ventricle, septal shift starves
          the left, and falling MAP cuts off RV coronary perfusion. Tap any node
          to see the mechanism and management.
        </p>

        <div className="grid lg:grid-cols-[auto_1fr] gap-6 items-start">
          {/* Spiral SVG */}
          <div className="flex justify-center">
            <svg
              viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
              className="w-full max-w-[360px] h-auto"
              role="img"
              aria-label="RV failure spiral diagram"
            >
              <defs>
                <marker
                  id="arrow-spiral"
                  viewBox="0 0 10 10"
                  refX="8"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" className="fill-destructive" />
                </marker>
              </defs>

              {/* faint guide circles */}
              {[0.95, 0.7, 0.45, 0.2].map((r) => (
                <circle
                  key={r}
                  cx={CENTRE}
                  cy={CENTRE}
                  r={r * MAX_R}
                  fill="none"
                  className="stroke-border"
                  strokeDasharray="2 4"
                  strokeWidth={0.6}
                  opacity={0.5}
                />
              ))}

              {/* spiral arrow */}
              <path
                d={spiralPath()}
                fill="none"
                className="stroke-destructive"
                strokeWidth={2}
                strokeLinecap="round"
                markerEnd="url(#arrow-spiral)"
                opacity={0.8}
              />

              {/* central PEA arrest label */}
              <circle
                cx={CENTRE}
                cy={CENTRE}
                r={26}
                className="fill-destructive"
                opacity={0.12}
              />
              <circle
                cx={CENTRE}
                cy={CENTRE}
                r={26}
                fill="none"
                className="stroke-destructive"
                strokeWidth={1.2}
                strokeDasharray="3 2"
              />
              <text
                x={CENTRE}
                y={CENTRE - 2}
                textAnchor="middle"
                className="fill-destructive font-bold"
                style={{ fontSize: "10px" }}
              >
                PEA
              </text>
              <text
                x={CENTRE}
                y={CENTRE + 9}
                textAnchor="middle"
                className="fill-destructive font-semibold"
                style={{ fontSize: "8px" }}
              >
                arrest
              </text>

              {/* nodes */}
              {steps.map((s, i) => {
                const { x, y } = polar(s.angle, s.radius);
                const isSelected = s.id === selected;
                const nodeR = isSelected ? 18 : 14;
                return (
                  <g
                    key={s.id}
                    onClick={() => setSelected(s.id)}
                    className="cursor-pointer"
                  >
                    {/* halo for selected */}
                    {isSelected && (
                      <circle
                        cx={x}
                        cy={y}
                        r={nodeR + 5}
                        className="fill-primary"
                        opacity={0.18}
                      />
                    )}
                    <circle
                      cx={x}
                      cy={y}
                      r={nodeR}
                      className={
                        isSelected
                          ? "fill-primary stroke-primary"
                          : "fill-card stroke-destructive"
                      }
                      strokeWidth={isSelected ? 2 : 1.5}
                    />
                    <text
                      x={x}
                      y={y + 1}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className={
                        isSelected
                          ? "fill-primary-foreground font-bold"
                          : "fill-foreground font-bold"
                      }
                      style={{ fontSize: "10px" }}
                    >
                      {i + 1}
                    </text>
                    {/* short label outside the node */}
                    <text
                      x={x + (x >= CENTRE ? nodeR + 4 : -(nodeR + 4))}
                      y={y + 3}
                      textAnchor={x >= CENTRE ? "start" : "end"}
                      className={
                        isSelected
                          ? "fill-foreground font-semibold"
                          : "fill-muted-foreground"
                      }
                      style={{ fontSize: "9px" }}
                    >
                      {s.shortLabel}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Detail panel */}
          <div className="space-y-3">
            <div className="flex flex-wrap gap-1.5">
              {steps.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setSelected(s.id)}
                  className={`text-[10px] px-2 py-1 rounded-md border transition-colors ${
                    s.id === selected
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-muted-foreground border-border hover:bg-secondary/50"
                  }`}
                >
                  {i + 1}. {s.shortLabel}
                </button>
              ))}
            </div>

            <div className="p-3 rounded-lg border border-primary/30 bg-primary/5">
              <p className="text-sm font-semibold text-foreground mb-1">
                {data.title}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {data.mechanism}
              </p>
            </div>

            <div>
              <p className="text-[11px] font-semibold text-foreground mb-1">
                Haemodynamic consequence
              </p>
              <ul className="space-y-0.5">
                {data.consequences.map((c) => (
                  <li
                    key={c}
                    className="text-xs text-muted-foreground flex gap-1.5"
                  >
                    <span className="text-destructive">▸</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 rounded-lg border border-clinical/30 bg-clinical/5">
              <p className="text-[11px] font-semibold text-foreground mb-1">
                Management at this step
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {data.intervention}
              </p>
            </div>

            <div className="flex items-center justify-between text-[10px] text-muted-foreground border-t border-border pt-2">
              <span>
                Step {selectedIdx + 1} of {steps.length}
              </span>
              <div className="flex gap-1">
                <button
                  onClick={() =>
                    setSelected(
                      steps[(selectedIdx - 1 + steps.length) % steps.length].id
                    )
                  }
                  className="px-2 py-0.5 rounded border border-border hover:bg-secondary/50"
                >
                  ← Prev
                </button>
                <button
                  onClick={() =>
                    setSelected(steps[(selectedIdx + 1) % steps.length].id)
                  }
                  className="px-2 py-0.5 rounded border border-border hover:bg-secondary/50"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Septal shift cross-section */}
        <div className="mt-6 pt-4 border-t border-border">
          <p className="text-sm font-semibold text-foreground mb-2">
            Short-axis echo: the D-shaped LV
          </p>
          <div className="grid sm:grid-cols-2 gap-4 items-center">
            <svg
              viewBox="0 0 300 160"
              className="w-full max-w-[300px] h-auto mx-auto"
              role="img"
              aria-label="Normal vs PH short-axis cross-section"
            >
              {/* Normal heart */}
              <g>
                <text
                  x="75"
                  y="14"
                  textAnchor="middle"
                  className="fill-foreground font-semibold"
                  style={{ fontSize: "10px" }}
                >
                  Normal
                </text>
                {/* RV crescent */}
                <path
                  d="M 25 80 Q 30 30 75 30 Q 100 50 100 80 Q 100 110 75 130 Q 30 130 25 80 Z"
                  className="fill-muted stroke-foreground"
                  strokeWidth={1}
                  opacity={0.5}
                />
                {/* LV circle */}
                <circle
                  cx="85"
                  cy="80"
                  r="32"
                  className="fill-card stroke-foreground"
                  strokeWidth={1.2}
                />
                <text
                  x="60"
                  y="55"
                  className="fill-muted-foreground font-semibold"
                  style={{ fontSize: "9px" }}
                >
                  RV
                </text>
                <text
                  x="80"
                  y="84"
                  className="fill-foreground font-semibold"
                  style={{ fontSize: "10px" }}
                >
                  LV
                </text>
              </g>

              {/* PH heart with septal shift */}
              <g transform="translate(150,0)">
                <text
                  x="75"
                  y="14"
                  textAnchor="middle"
                  className="fill-destructive font-semibold"
                  style={{ fontSize: "10px" }}
                >
                  PH crisis
                </text>
                {/* Dilated RV */}
                <path
                  d="M 10 80 Q 15 20 80 20 Q 110 50 110 80 Q 110 110 80 140 Q 15 140 10 80 Z"
                  className="fill-destructive stroke-destructive"
                  strokeWidth={1.2}
                  opacity={0.18}
                />
                {/* D-shaped LV — septum bulges right→left */}
                <path
                  d="M 105 50 Q 90 80 105 110 A 28 30 0 1 0 105 50 Z"
                  className="fill-card stroke-foreground"
                  strokeWidth={1.2}
                />
                {/* Septal arrow */}
                <line
                  x1="118"
                  y1="80"
                  x2="98"
                  y2="80"
                  className="stroke-destructive"
                  strokeWidth={2}
                  markerEnd="url(#arrow-spiral)"
                />
                <text
                  x="55"
                  y="50"
                  className="fill-destructive font-semibold"
                  style={{ fontSize: "9px" }}
                >
                  RV ↑↑
                </text>
                <text
                  x="118"
                  y="84"
                  className="fill-foreground font-semibold"
                  style={{ fontSize: "10px" }}
                >
                  LV
                </text>
                <text
                  x="60"
                  y="155"
                  className="fill-destructive italic"
                  style={{ fontSize: "8px" }}
                >
                  Septal shift → ↓ LV preload
                </text>
              </g>
            </svg>

            <div className="text-xs text-muted-foreground space-y-2 leading-relaxed">
              <p>
                <span className="font-semibold text-foreground">Normal:</span> the
                LV is circular in short axis; the crescentic RV is a passive
                conduit at low pressure.
              </p>
              <p>
                <span className="font-semibold text-destructive">
                  PH crisis:
                </span>{" "}
                the dilated RV pushes the interventricular septum leftward
                (reverse Bernheim effect). The LV becomes D-shaped, loses
                preload, and cardiac output collapses despite a normal LVEF.
              </p>
              <p className="italic">
                Bedside transthoracic echo at the parasternal short-axis view is
                the fastest way to confirm RV-dominant haemodynamic
                decompensation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RVFailureSpiralDiagram;
