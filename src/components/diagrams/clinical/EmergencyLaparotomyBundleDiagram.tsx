import { AnimatedMechanism, AnimatedMechanismStep } from "@/components/diagrams/shared/AnimatedMechanism";
import { DiagramFigure } from "../_shared/DiagramFigure";

/**
 * NELA emergency-laparotomy care bundle visualised as a horizontal pathway
 * from decision-to-operate through to postoperative critical care. Each step
 * lights up the corresponding node and surfaces the audited standard.
 */

interface Node {
  key: string;
  short: string;
  detail: string;
  x: number;
}

const NODES: Node[] = [
  { key: "decision", short: "Decision", detail: "Decision-to-operate documented; NELA score calculated", x: 50 },
  { key: "ct", short: "CT < 90 min", detail: "CT (if needed) reported within 90 minutes of request (NELA 2021 standard); senior surgical review within 2 hours", x: 130 },
  { key: "abx", short: "Antibiotics", detail: "Sepsis-6 if septic — antibiotics within 1 hour of decision", x: 210 },
  { key: "consultant", short: "Consultant", detail: "Consultant surgeon + anaesthetist present if mortality > 5%", x: 290 },
  { key: "theatre", short: "Theatre", detail: "Knife-to-skin within window appropriate to NCEPOD category", x: 370 },
  { key: "icu", short: "ICU", detail: "Postoperative critical-care admission for high-risk patients", x: 450 },
];

const STEPS: AnimatedMechanismStep[] = [
  {
    label: "Decision + risk score",
    detail: (
      <>
        Document the time the decision-to-operate is made — the NELA clock starts here. Calculate
        predicted mortality using the <strong>NELA risk calculator</strong> (preferred over
        P-POSSUM in this cohort). Mortality &gt;5% triggers the high-risk pathway.
      </>
    ),
    callout: <><strong>Audit standard:</strong> documented risk score in &gt;90% of cases.</>,
    sources: [
      { label: "NELA Year 9 Report" },
      { label: "P-POSSUM" },
      { label: "SORT" },
    ],
  },
  {
    label: "CT within 2 hours",
    detail: (
      <>
        Senior surgical review within 2 hours of decision. CT abdomen/pelvis with IV contrast if
        diagnosis or operative plan unclear — should not delay surgery in haemodynamic collapse.
        Lactate, FBC, U&E, coag, group & save / crossmatch as standard.
      </>
    ),
    sources: [{ label: "NELA Year 9 Report" }, { label: "RCoA Emergency Laparotomy" }],
  },
  {
    label: "Antibiotics + sepsis-6",
    detail: (
      <>
        If septic (qSOFA ≥2, NEWS2 ≥5, lactate &gt;2): broad-spectrum IV antibiotics within{" "}
        <strong>1 hour</strong> of recognition (Sepsis-6). Source control IS the definitive sepsis
        treatment — surgery is the priority.
      </>
    ),
    callout: <><strong>Empiric example:</strong> piperacillin-tazobactam 4.5 g IV (or per local guideline).</>,
    sources: [{ label: "NELA Year 9 Report" }, { label: "BJA Educ 2017 EmLap" }],
  },
  {
    label: "Consultant presence",
    detail: (
      <>
        For predicted mortality &gt; 5% (or any ASA 4/5 emergency): both consultant surgeon{" "}
        <em>and</em> consultant anaesthetist must be present in theatre. Consultant intensivist
        review pre-/post-op if planned for ICU.
      </>
    ),
    callout: <><strong>Audit standard:</strong> consultant of both specialties present in &gt;80% of high-risk cases.</>,
    sources: [{ label: "NELA Year 9 Report" }, { label: "RCoA Emergency Laparotomy" }],
  },
  {
    label: "Theatre + GDT",
    detail: (
      <>
        Time-to-theatre matched to NCEPOD category (immediate &lt;1h, urgent &lt;6h, expedited
        &lt;18h). <strong>Goal-directed fluid therapy</strong> with cardiac-output monitoring
        (oesophageal Doppler / LiDCO / ClearSight) for high-risk cases. Active warming, lung-protective
        ventilation, multimodal analgesia (epidural if coagulopathy permits, otherwise rectus
        sheath or TAP blocks).
      </>
    ),
    sources: [
      { label: "NCEPOD Knowing the Risk" },
      { label: "BJA Educ 2017 EmLap" },
      { label: "NELA Year 9 Report" },
    ],
  },
  {
    label: "Postop critical care",
    detail: (
      <>
        All NELA high-risk patients (mortality &gt; 5%) → planned ICU/HDU bed. Enhanced recovery
        principles: early enteral nutrition, mobilisation, VTE prophylaxis, structured pain plan,
        delirium screening (4AT/CAM-ICU). Daily senior review until discharge from critical care.
      </>
    ),
    callout: <><strong>Outcome:</strong> NELA bundle compliance ↓ 30-day mortality from ~12% to ~9%.</>,
    sources: [{ label: "NELA Year 9 Report" }, { label: "RCoA Emergency Laparotomy" }],
  },
];

export const EmergencyLaparotomyBundleDiagram = () => {
  return (
    <DiagramFigure
      id="emergency-laparotomy-bundle-diagram"
      title="Emergency laparotomy bundle"
      description="Auto-generated wrapper for the Emergency laparotomy bundle anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <AnimatedMechanism
        title="NELA emergency-laparotomy care bundle"
        subtitle="The audited pathway from decision-to-operate to ICU. Each node is a measured standard."
        steps={STEPS}
        accentClass="border-icu/40"
        stepMs={2800}
        renderScene={(active) => (
          <svg
            viewBox="0 0 510 220"
            role="img"
            aria-label="NELA care bundle pathway with six sequential nodes"
            className="w-full"
          >
            <defs>
              <radialGradient id="nela-bg" cx="50%" cy="50%" r="65%">
                <stop offset="0%" stopColor="hsl(var(--muted))" stopOpacity="0.5" />
                <stop offset="100%" stopColor="hsl(var(--background))" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="510" height="220" fill="url(#nela-bg)" />
  
            {/* Pathway track */}
            <line
              x1={NODES[0].x}
              y1={110}
              x2={NODES[NODES.length - 1].x}
              y2={110}
              stroke="hsl(var(--border))"
              strokeWidth={3}
              strokeLinecap="round"
            />
            {/* Progress overlay */}
            <line
              x1={NODES[0].x}
              y1={110}
              x2={NODES[active].x}
              y2={110}
              stroke="hsl(var(--icu))"
              strokeWidth={3}
              strokeLinecap="round"
              style={{ transition: "all 600ms cubic-bezier(0.4,0,0.2,1)" }}
            />
  
            {/* Nodes */}
            {NODES.map((n, i) => {
              const isActive = i === active;
              const isDone = i < active;
              const fill = isActive
                ? "hsl(var(--icu))"
                : isDone
                ? "hsl(var(--clinical))"
                : "hsl(var(--card))";
              return (
                    <g key={n.key}>
                  <circle
                    cx={n.x}
                    cy={110}
                    r={isActive ? 18 : 13}
                    fill={fill}
                    stroke={isActive ? "hsl(var(--icu))" : "hsl(var(--border))"}
                    strokeWidth={isActive ? 2.5 : 1.5}
                    style={{ transition: "all 400ms ease" }}
                  />
                  <text
                    x={n.x}
                    y={114}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight={700}
                    fill={isActive || isDone ? "hsl(var(--background))" : "hsl(var(--muted-foreground))"}
                  >
                    {i + 1}
                  </text>
                  <text
                    x={n.x}
                    y={isActive ? 150 : 145}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight={isActive ? 700 : 500}
                    fill={isActive ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))"}
                    style={{ transition: "all 400ms ease" }}
                  >
                    {n.short}
                  </text>
                </g>
    );
            })}
  
            {/* Active node detail callout */}
            <g transform={`translate(${NODES[active].x - 90}, 30)`} style={{ transition: "transform 500ms ease" }}>
              <rect
                x={0}
                y={0}
                width={180}
                height={52}
                rx={6}
                fill="hsl(var(--card))"
                stroke="hsl(var(--icu))"
                strokeWidth={1.5}
              />
              <foreignObject x={8} y={6} width={164} height={44}>
                <div
                  style={{
                    fontSize: "10px",
                    lineHeight: "1.3",
                    color: "hsl(var(--foreground))",
                    fontFamily: "inherit",
                  }}
                >
                  {NODES[active].detail}
                </div>
              </foreignObject>
              {/* pointer triangle */}
              <polygon
                points="84,52 96,52 90,62"
                fill="hsl(var(--card))"
                stroke="hsl(var(--icu))"
                strokeWidth={1.5}
              />
            </g>
  
            {/* Legend */}
            <g transform="translate(50, 190)">
              <circle cx={6} cy={0} r={5} fill="hsl(var(--clinical))" />
              <text x={16} y={3} fontSize="9" fill="hsl(var(--muted-foreground))">Done</text>
              <circle cx={66} cy={0} r={5} fill="hsl(var(--icu))" />
              <text x={76} y={3} fontSize="9" fill="hsl(var(--muted-foreground))">Active</text>
              <circle cx={130} cy={0} r={5} fill="hsl(var(--card))" stroke="hsl(var(--border))" />
              <text x={140} y={3} fontSize="9" fill="hsl(var(--muted-foreground))">Pending</text>
            </g>
          </svg>
        )}
      />
    </DiagramFigure>
  );
};

export default EmergencyLaparotomyBundleDiagram;
