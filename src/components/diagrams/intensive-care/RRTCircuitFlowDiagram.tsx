import { useEffect, useState } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { DiagramFigure } from "../_shared/DiagramFigure";

/**
 * Animated comparison of CRRT (CVVHDF) vs Intermittent Haemodialysis (IHD).
 *
 * Both circuits draw blood from the patient → through an access pump → into
 * the haemofilter → returning to the patient. The animation steps through:
 *   1. Vascular access (vascath)
 *   2. Blood pump (Qb)
 *   3. Pre-filter additions (anticoagulant ± replacement fluid for CRRT)
 *   4. Filter — solute clearance (diffusion vs convection)
 *   5. Effluent / dialysate out
 *   6. Air trap & return to patient
 *
 * The contrast between modalities is highlighted by:
 *   - Flow speed (CRRT slow ~150–200 ml/min; IHD fast ~250–400 ml/min)
 *   - Dialysate direction (countercurrent in IHD; convective + diffusive in CVVHDF)
 *   - Treatment duration label (continuous vs 3–4h)
 */
export const RRTCircuitFlowDiagram = () => {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(true);

  // 6 steps × ~1.6s each
  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => setStep((s) => (s + 1) % 6), 1600);
    return () => window.clearInterval(id);
  }, [playing]);

  const stepCopy = [
    {
      title: "1 · Vascular access",
      crrt: "Dual-lumen dialysis catheter (typically R IJ, 13.5 Fr). Lower flows tolerated → easier on the line.",
      ihd: "Same dual-lumen dialysis catheter OR tunnelled line / AV fistula in chronic patients. Needs to deliver ≥250 ml/min.",
    },
    {
      title: "2 · Blood pump (Qb)",
      crrt: "Qb 150–200 ml/min — gentle flows, haemodynamically tolerated.",
      ihd: "Qb 250–400 ml/min — high flows drive rapid solute clearance.",
    },
    {
      title: "3 · Pre-filter additions",
      crrt: "Regional citrate (1st line) infused pre-filter — chelates Ca²⁺ in the circuit. Replacement fluid added pre- or post-filter (CVVHDF).",
      ihd: "Systemic heparin (or none in bleeding patients). No replacement fluid — pure diffusion.",
    },
    {
      title: "4 · Haemofilter — solute clearance",
      crrt: "CVVHDF combines diffusion (dialysate countercurrent) AND convection (UF + replacement). Effluent dose 20–25 ml/kg/hr.",
      ihd: "Pure diffusion. Dialysate runs countercurrent at 500–800 ml/min. Rapid urea/K⁺ clearance.",
    },
    {
      title: "5 · Effluent out",
      crrt: "Slow continuous effluent — gentle fluid & solute removal over 24h. Less disequilibrium.",
      ihd: "Large volumes shifted in 3–4h → risk of hypotension and dialysis disequilibrium syndrome.",
    },
    {
      title: "6 · Return to patient",
      crrt: "Warmed return via air trap. Run continuously for days — minimal haemodynamic perturbation.",
      ihd: "Warmed return via air trap. Single 3–4h session, repeated alternate days.",
    },
  ];

  return (
    <DiagramFigure
      id="rrt-circuit-flow-diagram"
      title="RRT circuit flow"
      description="RRT: labelled teaching figure showing the structures, relationships and key values FRCA and FFICM candidates need to recognise and explain."
    >
          <div className="rounded-xl border border-border bg-card/40 p-4">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
          <div>
            <h3 className="text-base font-semibold text-foreground">
              CRRT (CVVHDF) vs IHD — Animated Circuit Flow
            </h3>
            <p className="text-xs text-muted-foreground">
              Step-by-step blood and dialysate path through both modalities.
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted/60"
              aria-label={playing ? "Pause animation" : "Play animation"}
            >
              {playing ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
              {playing ? "Pause" : "Play"}
            </button>
            <button
              type="button"
              onClick={() => {
                setStep(0);
                setPlaying(true);
              }}
              className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted/60"
              aria-label="Restart animation"
            >
              <RotateCcw className="h-3 w-3" /> Restart
            </button>
          </div>
        </div>
  
        {/* Step pills */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {stepCopy.map((s, i) => (
            <button
              key={s.title}
              type="button"
              onClick={() => {
                setStep(i);
                setPlaying(false);
              }}
              data-active={step === i}
              className="rounded-full border border-border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground transition-colors data-[active=true]:bg-primary data-[active=true]:text-primary-foreground data-[active=true]:border-primary"
            >
              {s.title.split(" · ")[0]}
            </button>
          ))}
        </div>
  
        <div className="grid lg:grid-cols-2 gap-4">
          <CircuitSvg variant="crrt" step={step} />
          <CircuitSvg variant="ihd" step={step} />
        </div>
  
        {/* Step descriptions */}
        <div className="mt-3 grid lg:grid-cols-2 gap-3">
          <div className="rounded-lg border border-icu/30 bg-icu/5 p-3">
            <p className="text-[11px] font-bold uppercase tracking-wide text-icu mb-1">
              CRRT — {stepCopy[step].title}
            </p>
            <p className="text-xs text-foreground leading-relaxed">{stepCopy[step].crrt}</p>
          </div>
          <div className="rounded-lg border border-pharmacology/30 bg-pharmacology/5 p-3">
            <p className="text-[11px] font-bold uppercase tracking-wide text-pharmacology mb-1">
              IHD — {stepCopy[step].title}
            </p>
            <p className="text-xs text-foreground leading-relaxed">{stepCopy[step].ihd}</p>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

/* -------------------------------------------------------------------------- */
/*  Circuit SVG                                                               */
/* -------------------------------------------------------------------------- */

interface CircuitSvgProps {
  variant: "crrt" | "ihd";
  step: number;
}

const CircuitSvg = ({ variant, step }: CircuitSvgProps) => {
  const isCrrt = variant === "crrt";
  // Slower dash motion for CRRT, faster for IHD — purely visual cue.
  const bloodDur = isCrrt ? "2.4s" : "1.1s";
  const dialysateDur = isCrrt ? "2.8s" : "1.3s";
  const accent = isCrrt ? "hsl(var(--icu))" : "hsl(var(--pharmacology))";
  const label = isCrrt ? "CVVHDF — Continuous (24h)" : "IHD — Intermittent (3–4h)";
  const qbLabel = isCrrt ? "Qb 150–200 ml/min" : "Qb 250–400 ml/min";

  // Highlight active component per step
  const isActive = (idx: number) => step === idx;

  return (
        <div className="rounded-lg border border-border bg-background p-2">
      <div className="flex items-center justify-between mb-1">
        <p className="text-xs font-semibold" style={{ color: accent }}>
          {label}
        </p>
        <p className="text-[10px] font-mono text-muted-foreground">{qbLabel}</p>
      </div>
      <svg viewBox="0 0 360 240" className="w-full h-auto">
        {/* Patient silhouette (left) */}
        <g>
          <rect
            x="6"
            y="70"
            width="46"
            height="100"
            rx="10"
            fill="hsl(var(--muted))"
            stroke={isActive(0) || isActive(5) ? accent : "hsl(var(--border))"}
            strokeWidth={isActive(0) || isActive(5) ? 2.5 : 1}
          />
          <text x="29" y="125" textAnchor="middle" fontSize="9" fill="hsl(var(--foreground))" fontWeight="600">
            Patient
          </text>
          <text x="29" y="138" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">
            dialysis catheter
          </text>
        </g>

        {/* Access (arterial) line — patient → pump */}
        <FlowPath
          d="M52 95 L100 95"
          color="hsl(0 75% 55%)"
          dur={bloodDur}
          highlight={isActive(0) || isActive(1)}
          accent={accent}
        />
        {/* Blood pump */}
        <g>
          <circle
            cx="115"
            cy="95"
            r="14"
            fill="hsl(var(--card))"
            stroke={isActive(1) ? accent : "hsl(var(--border))"}
            strokeWidth={isActive(1) ? 2.5 : 1.2}
          />
          <text x="115" y="98" textAnchor="middle" fontSize="9" fill="hsl(var(--foreground))" fontWeight="700">
            Qb
          </text>
        </g>

        {/* Anticoagulant injection point */}
        <g opacity={isActive(2) ? 1 : 0.5}>
          <line
            x1="135"
            y1="60"
            x2="145"
            y2="88"
            stroke={isActive(2) ? accent : "hsl(var(--muted-foreground))"}
            strokeWidth={isActive(2) ? 2 : 1}
            strokeDasharray="3 2"
          />
          <text x="135" y="55" textAnchor="middle" fontSize="7" fill="hsl(var(--foreground))" fontWeight="600">
            {isCrrt ? "Citrate" : "Heparin"}
          </text>
        </g>

        {/* Pre-filter line → filter top */}
        <FlowPath
          d="M129 95 L165 95 L165 105"
          color="hsl(0 75% 55%)"
          dur={bloodDur}
          highlight={isActive(2) || isActive(3)}
          accent={accent}
        />

        {/* Replacement fluid (CRRT only) — pre/post filter */}
        {isCrrt && (
          <g opacity={isActive(3) ? 1 : 0.55}>
            <line
              x1="155"
              y1="60"
              x2="160"
              y2="100"
              stroke="hsl(200 85% 55%)"
              strokeWidth={isActive(3) ? 2 : 1.2}
              strokeDasharray="3 2"
            />
            <text x="155" y="55" textAnchor="middle" fontSize="7" fill="hsl(200 85% 55%)" fontWeight="600">
              Replacement
            </text>
          </g>
        )}

        {/* Haemofilter body */}
        <g>
          <rect
            x="150"
            y="105"
            width="30"
            height="80"
            rx="4"
            fill="hsl(var(--card))"
            stroke={isActive(3) ? accent : "hsl(var(--border))"}
            strokeWidth={isActive(3) ? 2.5 : 1.2}
          />
          {/* Membrane fibres */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line
              key={i}
              x1={155 + i * 5}
              y1={107}
              x2={155 + i * 5}
              y2={183}
              stroke="hsl(var(--muted-foreground))"
              strokeWidth="0.5"
              opacity="0.6"
            />
          ))}
          <text x="165" y="200" textAnchor="middle" fontSize="8" fill="hsl(var(--foreground))" fontWeight="600">
            Filter
          </text>
        </g>

        {/* Dialysate IN (countercurrent — bottom) → OUT (top) */}
        <FlowPath
          d="M225 175 L195 175 L195 165"
          color="hsl(200 85% 55%)"
          dur={dialysateDur}
          highlight={isActive(3) || isActive(4)}
          accent={accent}
          reverse
        />
        <text x="245" y="178" fontSize="7" fill="hsl(200 85% 55%)" fontWeight="600">
          Dialysate in
        </text>
        <FlowPath
          d="M195 125 L195 115 L225 115"
          color="hsl(40 90% 55%)"
          dur={dialysateDur}
          highlight={isActive(4)}
          accent={accent}
        />
        <text x="245" y="118" fontSize="7" fill="hsl(40 90% 55%)" fontWeight="600">
          Effluent out
        </text>

        {/* Filter → air trap (bottom return path) */}
        <FlowPath
          d="M165 185 L165 210 L240 210"
          color="hsl(0 70% 45%)"
          dur={bloodDur}
          highlight={isActive(4) || isActive(5)}
          accent={accent}
        />
        {/* Air trap */}
        <g>
          <rect
            x="240"
            y="195"
            width="22"
            height="30"
            rx="3"
            fill="hsl(var(--card))"
            stroke={isActive(5) ? accent : "hsl(var(--border))"}
            strokeWidth={isActive(5) ? 2.5 : 1.2}
          />
          <text x="251" y="214" textAnchor="middle" fontSize="7" fill="hsl(var(--foreground))" fontWeight="600">
            Air
          </text>
          <text x="251" y="222" textAnchor="middle" fontSize="7" fill="hsl(var(--foreground))" fontWeight="600">
            trap
          </text>
        </g>

        {/* Return line → patient venous lumen */}
        <FlowPath
          d="M262 210 L325 210 L325 145 L52 145"
          color="hsl(0 70% 45%)"
          dur={bloodDur}
          highlight={isActive(5)}
          accent={accent}
        />
        <text x="290" y="138" fontSize="7" fill="hsl(var(--muted-foreground))">
          venous return
        </text>
      </svg>
    </div>
  );
};

interface FlowPathProps {
  d: string;
  color: string;
  dur: string;
  highlight: boolean;
  accent: string;
  reverse?: boolean;
}

const FlowPath = ({ d, color, dur, highlight, accent, reverse }: FlowPathProps) => (
      <g>
    {/* base path */}
    <path d={d} stroke={highlight ? accent : color} strokeWidth={highlight ? 3 : 2} fill="none" opacity={highlight ? 1 : 0.55} />
    {/* animated flow dashes */}
    <path
      d={d}
      stroke={color}
      strokeWidth="2"
      fill="none"
      strokeDasharray="6 8"
      opacity="0.95"
    >
      <animate
        attributeName="stroke-dashoffset"
        from={reverse ? "0" : "28"}
        to={reverse ? "28" : "0"}
        dur={dur}
        repeatCount="indefinite"
      />
    </path>
  </g>
  );

export default RRTCircuitFlowDiagram;
