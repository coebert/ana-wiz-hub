import { useEffect, useRef, useState } from "react";

/**
 * Animated MAP = CO × SVR control-loop diagram.
 *
 * Visualises blood pressure regulation as a closed feedback loop:
 *   sensors → CNS integration → effectors → MAP → back to sensors.
 *
 * The user toggles a perturbation (haemorrhage / hypertension / steady-state)
 * and the diagram animates pulse particles travelling the appropriate arc,
 * highlighting which limbs of the loop are recruited and on what timescale.
 */

type Perturbation = "steady" | "hypotension" | "hypertension";

interface ArcDef {
  id: string;
  d: string;
  /** Which perturbation activates this arc. "both" = always lit. */
  active: Perturbation[];
  /** Time domain colour token. */
  domain: "neural" | "neurohormonal" | "renal" | "input";
  /** Travel time (s) for one particle along the arc. */
  speed: number;
}

const ARCS: ArcDef[] = [
  // Sensor → NTS afferents
  { id: "baro-in", d: "M 175 110 Q 240 95, 305 130", active: ["steady", "hypotension", "hypertension"], domain: "input", speed: 1.6 },
  { id: "chemo-in", d: "M 175 175 Q 240 165, 305 150", active: ["hypotension", "hypertension"], domain: "input", speed: 1.7 },
  { id: "cardio-in", d: "M 175 240 Q 240 220, 305 175", active: ["hypotension"], domain: "input", speed: 1.8 },
  // CNS → effectors
  { id: "to-heart", d: "M 405 130 Q 470 130, 540 110", active: ["steady", "hypotension", "hypertension"], domain: "neural", speed: 1.4 },
  { id: "to-vessels", d: "M 405 155 Q 470 175, 540 175", active: ["steady", "hypotension", "hypertension"], domain: "neural", speed: 1.4 },
  { id: "to-adrenal", d: "M 405 180 Q 470 215, 540 240", active: ["hypotension"], domain: "neurohormonal", speed: 2.4 },
  { id: "to-kidney", d: "M 405 200 Q 470 260, 540 305", active: ["hypotension"], domain: "renal", speed: 3.4 },
  // Effectors → MAP
  { id: "heart-map", d: "M 645 110 Q 720 165, 720 280", active: ["steady", "hypotension", "hypertension"], domain: "neural", speed: 1.6 },
  { id: "vessels-map", d: "M 645 175 Q 720 220, 720 280", active: ["steady", "hypotension", "hypertension"], domain: "neural", speed: 1.6 },
  { id: "adrenal-map", d: "M 645 240 Q 700 260, 720 280", active: ["hypotension"], domain: "neurohormonal", speed: 2.0 },
  { id: "kidney-map", d: "M 645 305 Q 690 295, 720 285", active: ["hypotension"], domain: "renal", speed: 3.2 },
  // MAP → sensors (feedback)
  { id: "map-feedback", d: "M 700 320 Q 420 430, 130 230", active: ["steady", "hypotension", "hypertension"], domain: "input", speed: 3.6 },
];

const DOMAIN_COLOR: Record<ArcDef["domain"], string> = {
  input: "hsl(var(--muted-foreground))",
  neural: "hsl(var(--physiology))",
  neurohormonal: "hsl(var(--pharmacology))",
  renal: "hsl(var(--clinical))",
};

const PerturbationButton = ({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
      active
        ? "bg-primary text-primary-foreground border-primary"
        : "bg-background text-foreground/80 border-border hover:bg-secondary"
    }`}
  >
    {children}
  </button>
);

const Node = ({
  x,
  y,
  w,
  h,
  title,
  sub,
  fill = "hsl(var(--card))",
  stroke = "hsl(var(--border))",
  textClass = "fill-foreground",
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  sub?: string;
  fill?: string;
  stroke?: string;
  textClass?: string;
}) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx={8} fill={fill} stroke={stroke} strokeWidth={1} />
    <text x={x + w / 2} y={y + (sub ? h / 2 - 2 : h / 2 + 4)} textAnchor="middle" className={`${textClass} text-[11px] font-semibold`}>
      {title}
    </text>
    {sub && (
      <text x={x + w / 2} y={y + h / 2 + 12} textAnchor="middle" className="fill-muted-foreground text-[9px]">
        {sub}
      </text>
    )}
  </g>
);

export const BPControlLoopDiagram = () => {
  const [perturbation, setPerturbation] = useState<Perturbation>("steady");
  const [t, setT] = useState(0);
  const raf = useRef<number>();
  const start = useRef<number>();

  useEffect(() => {
    const tick = (now: number) => {
      if (start.current === undefined) start.current = now;
      setT((now - start.current) / 1000);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  // MAP indicator value reflecting the perturbation + restoring loop
  const mapDelta =
    perturbation === "hypotension"
      ? -25 + 18 * (1 - Math.exp(-t / 4))
      : perturbation === "hypertension"
        ? 25 - 18 * (1 - Math.exp(-t / 4))
        : 2 * Math.sin(t * 1.2);
  const mapValue = Math.round(90 + mapDelta);

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground mr-1">Perturbation:</span>
        <PerturbationButton active={perturbation === "steady"} onClick={() => setPerturbation("steady")}>
          Steady state
        </PerturbationButton>
        <PerturbationButton active={perturbation === "hypotension"} onClick={() => setPerturbation("hypotension")}>
          ↓ MAP (haemorrhage)
        </PerturbationButton>
        <PerturbationButton active={perturbation === "hypertension"} onClick={() => setPerturbation("hypertension")}>
          ↑ MAP (acute rise)
        </PerturbationButton>
      </div>

      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <svg viewBox="0 0 880 470" className="w-full h-auto" role="img" aria-label="MAP control loop diagram">
          {/* Backdrop bands for the three time domains */}
          <rect x={20} y={80} width={840} height={75} fill="hsl(var(--physiology) / 0.05)" rx={6} stroke="hsl(var(--border))" strokeWidth="0.75" />
          <rect x={20} y={185} width={840} height={75} fill="hsl(var(--pharmacology) / 0.05)" rx={6} stroke="hsl(var(--border))" strokeWidth="0.75" />
          <rect x={20} y={285} width={840} height={75} fill="hsl(var(--clinical) / 0.05)" rx={6} stroke="hsl(var(--border))" strokeWidth="0.75" />

          <text x={30} y={75} className="fill-physiology text-[10px] font-semibold uppercase tracking-wide">
            Neural — seconds
          </text>
          <text x={30} y={180} className="fill-pharmacology text-[10px] font-semibold uppercase tracking-wide">
            Neurohormonal — minutes to hours
          </text>
          <text x={30} y={280} className="fill-clinical text-[10px] font-semibold uppercase tracking-wide">
            Renal–volume — hours to days
          </text>

          {/* Sensors column */}
          <text x={100} y={62} textAnchor="middle" className="fill-muted-foreground text-[10px] font-semibold uppercase tracking-wide">
            Sensors
          </text>
          <Node x={40} y={90} w={130} h={42} title="Baroreceptors" sub="Carotid sinus IX · Arch X" />
          <Node x={40} y={155} w={130} h={42} title="Chemoreceptors" sub="Carotid/aortic bodies" />
          <Node x={40} y={220} w={130} h={42} title="Cardiopulmonary" sub="Atrial stretch" />

          {/* CNS integrator */}
          <text x={355} y={62} textAnchor="middle" className="fill-muted-foreground text-[10px] font-semibold uppercase tracking-wide">
            CNS integrator
          </text>
          <Node
            x={305}
            y={110}
            w={100}
            h={100}
            title="Medulla"
            sub="NTS · RVLM · NA"
            fill="hsl(var(--secondary))"
          />
          <text x={355} y={185} textAnchor="middle" className="fill-foreground text-[9px]">
            ↑ vagal · ↓ sympathetic
          </text>

          {/* Effectors column */}
          <text x={595} y={62} textAnchor="middle" className="fill-muted-foreground text-[10px] font-semibold uppercase tracking-wide">
            Effectors
          </text>
          <Node x={540} y={90} w={105} h={42} title="Heart" sub="HR · contractility (β₁/M₂)" />
          <Node x={540} y={155} w={105} h={42} title="Vessels" sub="α₁ tone · venous return" />
          <Node x={540} y={220} w={105} h={42} title="Adrenal medulla" sub="Adr / NAdr · ADH" />
          <Node x={540} y={285} w={105} h={42} title="Kidney" sub="RAAS · pressure-natriuresis" />

          {/* MAP output */}
          <Node
            x={685}
            y={265}
            w={130}
            h={75}
            title={`MAP ≈ ${mapValue} mmHg`}
            sub="MAP = CO × SVR"
            fill="hsl(var(--primary) / 0.12)"
            stroke="hsl(var(--primary))"
          />
          <text x={750} y={358} textAnchor="middle" className="fill-muted-foreground text-[9px]">
            CO = HR × SV
          </text>

          {/* Arcs */}
          {ARCS.map((arc) => {
            const isActive = arc.active.includes(perturbation);
            const colour = DOMAIN_COLOR[arc.domain];
            return (
              <g key={arc.id}>
                <path
                  d={arc.d}
                  fill="none"
                  stroke={colour}
                  strokeOpacity={isActive ? 0.55 : 0.15}
                  strokeWidth={1.5}
                  strokeDasharray={isActive ? undefined : "4 4"}
                  markerEnd={isActive ? `url(#arrow-${arc.domain})` : undefined}
                />
                {isActive && (
                  <ParticleOnPath pathD={arc.d} colour={colour} period={arc.speed} t={t} />
                )}
              </g>
            );
          })}

          {/* Feedback loop label */}
          <text x={420} y={425} textAnchor="middle" className="fill-muted-foreground text-[10px] italic">
            Negative feedback: changes in MAP modulate sensor firing
          </text>

          {/* Arrow markers per domain */}
          <defs>
            {(["input", "neural", "neurohormonal", "renal"] as const).map((d) => (
              <marker
                key={d}
                id={`arrow-${d}`}
                viewBox="0 0 10 10"
                refX={9}
                refY={5}
                markerWidth={6}
                markerHeight={6}
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 Z" fill={DOMAIN_COLOR[d]} />
              </marker>
            ))}
          </defs>
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
        <div className="p-3 rounded-md border border-border bg-physiology/5">
          <p className="font-semibold text-foreground">Neural (seconds)</p>
          <p className="text-muted-foreground mt-1 leading-relaxed">
            Baroreceptors → NTS → RVLM. Adjusts HR, contractility, arteriolar tone, venous capacitance beat-to-beat.
          </p>
        </div>
        <div className="p-3 rounded-md border border-border bg-pharmacology/5">
          <p className="font-semibold text-foreground">Neurohormonal (min–h)</p>
          <p className="text-muted-foreground mt-1 leading-relaxed">
            Adrenal catecholamines, RAAS, vasopressin, ANP/BNP, capillary fluid shift restore filling and tone.
          </p>
        </div>
        <div className="p-3 rounded-md border border-border bg-clinical/5">
          <p className="font-semibold text-foreground">Renal–volume (h–days)</p>
          <p className="text-muted-foreground mt-1 leading-relaxed">
            Pressure-natriuresis sets the long-term operating point: ↑MAP → ↑Na⁺/H₂O excretion → ↓volume → ↓MAP.
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * Animates a small filled circle along an SVG path by sampling getPointAtLength.
 */
const ParticleOnPath = ({
  pathD,
  colour,
  period,
  t,
}: {
  pathD: string;
  colour: string;
  period: number;
  t: number;
}) => {
  const ref = useRef<SVGPathElement>(null);
  const [pt, setPt] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const path = ref.current;
    if (!path) return;
    const len = path.getTotalLength();
    const phase = ((t % period) / period) * len;
    const p = path.getPointAtLength(phase);
    setPt({ x: p.x, y: p.y });
  }, [t, period]);

  return (
    <>
      <path ref={ref} d={pathD} fill="none" stroke="none" />
      {pt && <circle cx={pt.x} cy={pt.y} r={3.2} fill={colour} opacity={0.95} />}
    </>
  );
};

export default BPControlLoopDiagram;
