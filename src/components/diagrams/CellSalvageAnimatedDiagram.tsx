import AnimatedMechanism, { AnimatedMechanismStep } from "./AnimatedMechanism";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * Animated schematic of intra-operative cell salvage (ICS).
 * Five steps: Collection → Reservoir → Centrifugation (bell) → Wash → Re-infusion.
 * Each step lights up the relevant component of the circuit and streams the
 * appropriate fluid (whole blood / plasma waste / saline / packed RBCs).
 */
const CellSalvageAnimatedDiagram = () => {
  const steps: AnimatedMechanismStep[] = [
    {
      label: "1. Collect",
      detail: (
        <>
          Surgical blood is aspirated through a <strong>dual-lumen suction tip</strong>{" "}
          with anticoagulant (heparinised saline 30,000 IU/L, or ACD-A citrate)
          dripping at the tip. Vacuum is kept low (<strong>≤ −150 mmHg</strong>,
          ideally −100 mmHg) to minimise mechanical haemolysis. A separate
          high-vacuum sucker handles irrigation, betadine, bowel contents and
          topical haemostats — these must NEVER enter the salvage line.
        </>
      ),
      callout: (
        <>
          <strong>Pearl:</strong> keep the salvage tip beneath the blood pool —
          skimming air froths cells and shears membranes.
        </>
      ),
      durationMs: 2800,
    },
    {
      label: "2. Reservoir",
      detail: (
        <>
          Anticoagulated blood drains through a <strong>40 µm gross filter</strong>{" "}
          into a soft reservoir. Processing begins once <strong>~500–1000 mL</strong>{" "}
          has accumulated (or one bowl-volume below the bowl size selected).
          Reservoir blood is unwashed, unsafe to re-infuse, and clock-limited.
        </>
      ),
      callout: (
        <>Bowl size matched to anticipated loss: 125 mL (paeds/obs), 175–225 mL (adult major).</>
      ),
      durationMs: 2400,
    },
    {
      label: "3. Spin",
      detail: (
        <>
          Reservoir contents are pumped into a spinning <strong>Latham bowl</strong>{" "}
          (≈5,000 rpm). Dense red cells layer outwards against the bowl wall;
          plasma, anticoagulant, free haemoglobin, activated complement,
          cytokines, fat and bioactive lipids form the central buffy/plasma
          layer destined for waste.
        </>
      ),
      callout: (
        <>Continuous-flow disc devices achieve the same separation without a discrete bowl-fill phase.</>
      ),
      durationMs: 2800,
    },
    {
      label: "4. Wash",
      detail: (
        <>
          <strong>1–1.5 L of 0.9% saline</strong> is passed through the spinning
          bowl. The central plasma layer (with heparin, free Hb, K⁺, cytokines,
          inflammatory mediators) is eluted to the <strong>waste bag</strong>.
          Wash quality is the <em>single most important</em> determinant of
          returned-product safety — under-washing causes "salvaged blood
          syndrome".
        </>
      ),
      callout: (
        <>
          <strong>⚠️ Never bypass the wash</strong> to deliver raw reservoir contents — risk of
          non-cardiogenic pulmonary oedema, coagulopathy and DIC.
        </>
      ),
      durationMs: 3000,
    },
    {
      label: "5. Re-infuse",
      detail: (
        <>
          Washed RBCs are re-suspended in saline (<strong>Hct 50–70%</strong>,
          ~225 mL per processed bowl) and pumped to a labelled re-infusion bag.
          Returned through a standard giving set with a <strong>40 µm screen
          filter</strong>; add a <strong>leucodepletion filter</strong> in
          obstetrics/oncology. <strong>4-hour expiry</strong> once in the bag.
        </>
      ),
      callout: (
        <>
          No platelets / fibrinogen / clotting factors — anticipate dilutional
          coagulopathy after &gt;1500–2000 mL returned and replace with FFP /
          cryo / platelets guided by ROTEM.
        </>
      ),
      durationMs: 3000,
    },
  ];

  return (
    <AnimatedMechanism
      title="Intra-operative cell salvage — circuit walkthrough"
      subtitle="Step through the five stages from suction tip to re-infusion bag. Click chips or use Prev/Next to scrub."
      accentClass="border-clinical/40"
      steps={steps}
      renderScene={(active) => <CellSalvageScene active={active} />}
    />
  );
};

/* -------------------------------------------------------------------------- */
/*  Scene                                                                      */
/* -------------------------------------------------------------------------- */

const CellSalvageScene = ({ active }: { active: number }) => {
  // Convenience flags
  const lit = (i: number) => active === i;
  const done = (i: number) => active > i;
  const reached = (i: number) => active >= i;

  // Standard token colours
  const RED = "hsl(var(--destructive))";       // whole / packed blood
  const PLASMA = "hsl(var(--accent))";         // yellow plasma waste
  const SALINE = "hsl(var(--clinical))";       // saline wash
  const STROKE = "hsl(var(--border))";
  const FG = "hsl(var(--foreground))";
  const MUTED = "hsl(var(--muted-foreground))";

  // Highlight helper for outline of the active component
  const ringFor = (i: number) =>
    lit(i)
      ? { stroke: "hsl(var(--primary))", strokeWidth: 2.2 }
      : done(i)
      ? { stroke: "hsl(var(--clinical))", strokeWidth: 1.4 }
      : { stroke: STROKE, strokeWidth: 1 };

  return (
    <DiagramFigure
      id="cell-salvage-animated-diagram"
      title="Cell salvage animated"
      description="Auto-generated wrapper for the Cell salvage animated anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
          <svg
        viewBox="0 0 720 360"
        className="w-full h-auto"
        role="img"
        aria-label="Animated schematic of the cell salvage circuit"
      >
        <defs>
          {/* Arrowhead */}
          <marker id="cs-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill={MUTED} />
          </marker>
          {/* Bell gradient — packed cells outside, plasma inside */}
          <radialGradient id="cs-bowl-spin" cx="50%" cy="55%" r="55%">
            <stop offset="0%" stopColor={PLASMA} stopOpacity="0.85" />
            <stop offset="55%" stopColor={PLASMA} stopOpacity="0.55" />
            <stop offset="70%" stopColor={RED} stopOpacity="0.7" />
            <stop offset="100%" stopColor={RED} stopOpacity="0.95" />
          </radialGradient>
          <radialGradient id="cs-bowl-idle" cx="50%" cy="55%" r="55%">
            <stop offset="0%" stopColor="hsl(var(--muted))" />
            <stop offset="100%" stopColor="hsl(var(--muted))" stopOpacity="0.4" />
          </radialGradient>
        </defs>
  
        {/* ---------- 1. Surgical field + dual-lumen suction ---------- */}
        <g aria-label="Surgical field with dual-lumen suction">
          {/* Field */}
          <ellipse cx="80" cy="305" rx="62" ry="22" fill="hsl(var(--destructive) / 0.18)" stroke={STROKE} />
          <text x="80" y="345" textAnchor="middle" fontSize="11" fill={MUTED}>Surgical field</text>
  
          {/* Suction tip */}
          <rect x="70" y="220" width="20" height="80" rx="3" fill="hsl(var(--muted))" {...ringFor(0)} />
          <line x1="80" y1="218" x2="80" y2="120" stroke={FG} strokeWidth="2" />
          {/* Anticoag drip indicator */}
          <circle cx="92" cy="232" r="3" fill={SALINE} opacity={lit(0) ? 1 : 0.4}>
            {lit(0) && <animate attributeName="cy" values="225;245;225" dur="1.4s" repeatCount="indefinite" />}
          </circle>
          <text x="100" y="232" fontSize="9" fill={MUTED}>anticoag</text>
          <text x="80" y="215" textAnchor="middle" fontSize="10" fill={FG} fontWeight={lit(0) ? 600 : 400}>
            dual-lumen tip
          </text>
  
          {/* Travelling blood drops 1 → reservoir */}
          {lit(0) && (
            <>
              {[0, 0.5, 1].map((d, i) => (
                <circle key={i} cx="80" cy="200" r="3.2" fill={RED}>
                  <animate attributeName="cy" values="290;120" dur="1.5s" begin={`${d}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="1;1;0" dur="1.5s" begin={`${d}s`} repeatCount="indefinite" />
                </circle>
              ))}
            </>
          )}
        </g>
  
        {/* Tubing 1: tip → reservoir */}
        <path d="M80,120 C80,90 140,90 175,90" fill="none" stroke={MUTED} strokeWidth="1.5" markerEnd="url(#cs-arrow)" />
  
        {/* ---------- 2. Reservoir ---------- */}
        <g aria-label="Collection reservoir">
          <rect x="180" y="60" width="90" height="110" rx="10" fill="hsl(var(--card))" {...ringFor(1)} stroke="hsl(var(--border))" strokeWidth="0.75" />
          {/* Fill level animates as we progress */}
          <rect
            x="184"
            y={reached(1) ? (lit(1) ? 95 : 80) : 140}
            width="82"
            height={reached(1) ? (lit(1) ? 71 : 86) : 26}
            rx="6"
            fill={RED}
            opacity="0.55"
          >
            {lit(1) && <animate attributeName="y" values="120;90;120" dur="2.2s" repeatCount="indefinite" />}
          </rect>
          <line x1="184" y1="105" x2="266" y2="105" stroke={STROKE} strokeDasharray="2 3" />
          <text x="270" y="108" fontSize="8" fill={MUTED}>500 mL</text>
          <text x="225" y="50" textAnchor="middle" fontSize="11" fill={FG} fontWeight={lit(1) ? 600 : 400}>
            Reservoir
          </text>
          <text x="225" y="185" textAnchor="middle" fontSize="9" fill={MUTED}>40 µm gross filter</text>
        </g>
  
        {/* Pump roller indicator between reservoir → bowl */}
        <g aria-label="Roller pump">
          <circle cx="305" cy="115" r="14" fill="hsl(var(--muted))" stroke={STROKE} />
          <g style={{ transformOrigin: "305px 115px" }}>
            <line x1="305" y1="103" x2="305" y2="127" stroke={FG} strokeWidth="1.5">
              {lit(2) && (
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 305 115"
                  to="360 305 115"
                  dur="0.8s"
                  repeatCount="indefinite"
                />
              )}
            </line>
            <line x1="293" y1="115" x2="317" y2="115" stroke={FG} strokeWidth="1.5">
              {lit(2) && (
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 305 115"
                  to="360 305 115"
                  dur="0.8s"
                  repeatCount="indefinite"
                />
              )}
            </line>
          </g>
          <text x="305" y="145" textAnchor="middle" fontSize="8" fill={MUTED}>pump</text>
        </g>
        <path d="M270,115 L290,115" stroke={MUTED} strokeWidth="1.5" markerEnd="url(#cs-arrow)" />
        <path d="M320,115 L355,115" stroke={MUTED} strokeWidth="1.5" markerEnd="url(#cs-arrow)" />
  
        {/* Travelling drops reservoir → bowl when entering spin */}
        {lit(2) && (
          <>
            {[0, 0.4, 0.8].map((d, i) => (
              <circle key={i} cx="280" cy="115" r="2.8" fill={RED}>
                <animate attributeName="cx" values="275;355" dur="1.2s" begin={`${d}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;1;0" dur="1.2s" begin={`${d}s`} repeatCount="indefinite" />
              </circle>
            ))}
          </>
        )}
  
        {/* ---------- 3. Centrifuge bell (Latham bowl) ---------- */}
        <g aria-label="Latham bowl centrifuge">
          <text x="410" y="50" textAnchor="middle" fontSize="11" fill={FG} fontWeight={lit(2) || lit(3) ? 600 : 400}>
            Latham bowl
          </text>
          {/* Bowl outline */}
          <path
            d="M370,80 L370,160 Q370,200 410,200 Q450,200 450,160 L450,80 Z"
            fill={reached(2) ? "url(#cs-bowl-spin)" : "url(#cs-bowl-idle)"}
            {...ringFor(2)}
          />
          {/* Spinning indicator lines */}
          {(lit(2) || lit(3)) && (
            <g style={{ transformOrigin: "410px 140px" }}>
              <ellipse cx="410" cy="140" rx="32" ry="8" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.75" opacity="0.6">
                <animateTransform attributeName="transform" type="rotate" from="0 410 140" to="360 410 140" dur="0.6s" repeatCount="indefinite" />
              </ellipse>
              <ellipse cx="410" cy="140" rx="32" ry="8" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.75" opacity="0.4" transform="rotate(60 410 140)">
                <animateTransform attributeName="transform" type="rotate" from="60 410 140" to="420 410 140" dur="0.6s" repeatCount="indefinite" />
              </ellipse>
            </g>
          )}
          {/* Layer labels appear once spinning */}
          {(lit(2) || lit(3)) && (
            <>
              <text x="410" y="138" textAnchor="middle" fontSize="8" fill="hsl(var(--accent-foreground))" fontWeight="600">plasma</text>
              <text x="410" y="190" textAnchor="middle" fontSize="8" fill="hsl(var(--destructive-foreground))" fontWeight="600">RBC layer</text>
            </>
          )}
          <text x="410" y="220" textAnchor="middle" fontSize="9" fill={MUTED}>~5,000 rpm</text>
        </g>
  
        {/* ---------- 4. Saline wash (top inlet) ---------- */}
        <g aria-label="Saline wash bag">
          <rect x="385" y="10" width="50" height="32" rx="4" fill={SALINE} opacity={reached(3) ? 0.85 : 0.3} {...ringFor(3)} />
          <text x="410" y="29" textAnchor="middle" fontSize="9" fill="hsl(var(--clinical-foreground))" fontWeight="600">0.9% NaCl</text>
          <line x1="410" y1="42" x2="410" y2="78" stroke={MUTED} strokeWidth="1.5" markerEnd="url(#cs-arrow)" />
          {/* Saline drops */}
          {lit(3) && (
            <>
              {[0, 0.3, 0.6, 0.9].map((d, i) => (
                <circle key={i} cx="410" cy="50" r="2.2" fill={SALINE}>
                  <animate attributeName="cy" values="44;78" dur="0.8s" begin={`${d}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="1;1;0" dur="0.8s" begin={`${d}s`} repeatCount="indefinite" />
                </circle>
              ))}
            </>
          )}
        </g>
  
        {/* ---------- 4b. Waste bag (right of bowl) ---------- */}
        <g aria-label="Waste bag">
          <path d="M450,140 C490,140 510,140 540,140" stroke={MUTED} strokeWidth="1.5" fill="none" markerEnd="url(#cs-arrow)" />
          <rect x="540" y="115" width="60" height="60" rx="6" fill="hsl(var(--card))" {...ringFor(3)} stroke="hsl(var(--border))" strokeWidth="0.75" />
          {/* Plasma waste fills as we wash */}
          <rect x="544" y={lit(3) ? 130 : done(3) ? 122 : 165} width="52" height={lit(3) ? 41 : done(3) ? 49 : 6} rx="4" fill={PLASMA} opacity="0.6">
            {lit(3) && <animate attributeName="height" values="10;48;10" dur="2.4s" repeatCount="indefinite" />}
            {lit(3) && <animate attributeName="y" values="161;123;161" dur="2.4s" repeatCount="indefinite" />}
          </rect>
          <text x="570" y="105" textAnchor="middle" fontSize="10" fill={FG} fontWeight={lit(3) ? 600 : 400}>Waste</text>
          <text x="570" y="190" textAnchor="middle" fontSize="8" fill={MUTED}>plasma · heparin</text>
          <text x="570" y="200" textAnchor="middle" fontSize="8" fill={MUTED}>free Hb · cytokines</text>
          {/* Travelling plasma drops bowl → waste */}
          {lit(3) && (
            <>
              {[0, 0.5].map((d, i) => (
                <circle key={i} cx="460" cy="140" r="2.5" fill={PLASMA}>
                  <animate attributeName="cx" values="455;540" dur="1.2s" begin={`${d}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="1;1;0" dur="1.2s" begin={`${d}s`} repeatCount="indefinite" />
                </circle>
              ))}
            </>
          )}
        </g>
  
        {/* ---------- 5. Re-infusion path (bowl → filter → bag → patient) ---------- */}
        <g aria-label="Re-infusion bag and filter">
          <path d="M410,200 L410,240 L520,240" stroke={MUTED} strokeWidth="1.5" fill="none" markerEnd="url(#cs-arrow)" />
  
          {/* 40 µm filter */}
          <rect x="455" y="232" width="22" height="16" rx="2" fill="hsl(var(--card))" {...(lit(4) ? { stroke: "hsl(var(--primary))", strokeWidth: 1.6 } : { stroke: STROKE, strokeWidth: 1 })} />
          <text x="466" y="262" textAnchor="middle" fontSize="8" fill={MUTED}>40 µm</text>
  
          {/* Re-infusion bag */}
          <rect x="525" y="215" width="60" height="55" rx="6" fill="hsl(var(--card))" {...ringFor(4)} stroke="hsl(var(--border))" strokeWidth="0.75" />
          <rect x="529" y={lit(4) ? 230 : done(4) ? 222 : 263} width="52" height={lit(4) ? 36 : done(4) ? 44 : 4} rx="4" fill={RED} opacity="0.7">
            {lit(4) && <animate attributeName="height" values="6;42;6" dur="2.4s" repeatCount="indefinite" />}
            {lit(4) && <animate attributeName="y" values="260;224;260" dur="2.4s" repeatCount="indefinite" />}
          </rect>
          <text x="555" y="208" textAnchor="middle" fontSize="10" fill={FG} fontWeight={lit(4) ? 600 : 400}>Re-infusion</text>
          <text x="555" y="285" textAnchor="middle" fontSize="8" fill={MUTED}>Hct 50–70% · 4 h expiry</text>
  
          {/* Bag → patient */}
          <path d="M585,242 L645,242 L645,300 L660,300" stroke={MUTED} strokeWidth="1.5" fill="none" markerEnd="url(#cs-arrow)" />
          <text x="685" y="280" textAnchor="middle" fontSize="11" fill={FG} fontWeight={lit(4) ? 600 : 400}>Patient</text>
          <circle cx="685" cy="305" r="14" fill="hsl(var(--clinical) / 0.25)" {...(lit(4) ? { stroke: "hsl(var(--clinical))", strokeWidth: 1.6 } : { stroke: STROKE, strokeWidth: 1 })} />
  
          {/* Travelling washed RBCs to patient */}
          {lit(4) && (
            <>
              {[0, 0.6].map((d, i) => (
                <circle key={i} cx="600" cy="242" r="3" fill={RED}>
                  <animate attributeName="cx" values="590;645;645;660" keyTimes="0;0.5;0.7;1" dur="1.8s" begin={`${d}s`} repeatCount="indefinite" />
                  <animate attributeName="cy" values="242;242;300;300" keyTimes="0;0.5;0.7;1" dur="1.8s" begin={`${d}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="1;1;0" dur="1.8s" begin={`${d}s`} repeatCount="indefinite" />
                </circle>
              ))}
            </>
          )}
        </g>
      </svg>
    </DiagramFigure>
  );
};

export default CellSalvageAnimatedDiagram;
