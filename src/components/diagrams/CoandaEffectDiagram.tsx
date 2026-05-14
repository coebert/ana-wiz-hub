import { useEffect, useRef, useState } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

const W = 640;
const H = 320;

/**
 * Coandă Effect Diagram
 *
 * Animated illustration of a fluid jet adhering to a nearby curved
 * surface (Coandă effect) and the clinical implications:
 *  • Bifurcation flow asymmetry (e.g. at airway / vascular branches)
 *  • Fluidic ventilator logic
 *  • Jet entrainment alongside a wall
 *
 * Toggle between "free jet" (symmetrical entrainment) and "wall jet"
 * (jet hugs the curved surface, low-pressure region pulls it in).
 */
const CoandaEffectDiagram = () => {
  const [mode, setMode] = useState<"free" | "wall">("wall");
  const [t, setT] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setT((x) => (x + dt) % 1000);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  // Nozzle exit
  const nozzleX = 110;
  const nozzleY = H / 2;
  const nozzleH = 36;

  // Curved wall (an arc curving away from the jet) — only shown in wall mode
  // Wall starts just below the nozzle exit and curves down/away.
  const wallPath = `M ${nozzleX + 10} ${nozzleY + nozzleH / 2}
                    Q ${nozzleX + 180} ${nozzleY + nozzleH / 2 + 10}
                      ${W - 40} ${nozzleY + 130}`;

  // Streamlines
  // In "free" mode: 5 symmetric streams diverging mildly.
  // In "wall" mode: streams bend downward toward the wall.
  const streams = Array.from({ length: 7 }).map((_, i) => {
    const offset = (i - 3) * 8; // -24..24 across the nozzle
    const y0 = nozzleY + offset;
    if (mode === "free") {
      // Slight symmetric spread
      const y1 = nozzleY + offset * 1.4;
      const y2 = nozzleY + offset * 2.0;
      const y3 = nozzleY + offset * 2.8;
      return `M ${nozzleX + 8} ${y0} C ${nozzleX + 150} ${y1}, ${nozzleX + 320} ${y2}, ${W - 30} ${y3}`;
    }
    // Wall mode: jet bends down, lower streams hug the wall most strongly
    const bend = 70 + offset * 0.4; // lower streamlines bend more
    const y1 = nozzleY + offset * 0.6 + 10;
    const y2 = nozzleY + offset * 0.5 + bend * 0.6;
    const y3 = nozzleY + offset * 0.4 + bend;
    return `M ${nozzleX + 8} ${y0} C ${nozzleX + 140} ${y1}, ${nozzleX + 300} ${y2}, ${W - 30} ${y3 + 30}`;
  });

  // Moving particle markers (dashes) along the central streamline
  const dashOffset = -((t * 80) % 24);

  return (
    <DiagramFigure
      id="coanda-effect"
      title="Coandă effect: jet attachment to a curved surface"
      description="A fluid jet (gas or blood) tends to follow a nearby convex surface because entrained fluid between the jet and wall creates a low-pressure region that pulls the jet toward the wall. Clinically relevant in airway bifurcations, fluidic ventilator switches and jet ventilation."
    >
      <div className="flex items-center justify-end gap-2 mb-2">
        <button
          type="button"
          onClick={() => setMode("free")}
          className={`text-xs px-3 py-1 rounded-md border transition ${
            mode === "free"
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-card text-foreground/80 border-border hover:bg-secondary/50"
          }`}
        >
          Free jet
        </button>
        <button
          type="button"
          onClick={() => setMode("wall")}
          className={`text-xs px-3 py-1 rounded-md border transition ${
            mode === "wall"
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-card text-foreground/80 border-border hover:bg-secondary/50"
          }`}
        >
          Jet near curved wall (Coandă)
        </button>
      </div>

      <svg
        role="img"
        aria-labelledby="coanda-effect-title coanda-effect-desc"
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto bg-card rounded-lg border border-border"
      >
        <defs>
          <linearGradient id="coanda-jet" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.85" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.15" />
          </linearGradient>
          <radialGradient id="coanda-lowp" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="hsl(var(--destructive))" stopOpacity="0.35" />
            <stop offset="100%" stopColor="hsl(var(--destructive))" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Nozzle */}
        <rect
          x={nozzleX - 60}
          y={nozzleY - nozzleH / 2 - 10}
          width={70}
          height={nozzleH + 20}
          fill="hsl(var(--muted))"
          stroke="hsl(var(--border))"
          strokeWidth={1.5}
          rx={4}
        />
        <rect
          x={nozzleX - 55}
          y={nozzleY - nozzleH / 2}
          width={65}
          height={nozzleH}
          fill="hsl(var(--background))"
        />
        <text
          x={nozzleX - 25}
          y={nozzleY + nozzleH / 2 + 24}
          fontSize={11}
          textAnchor="middle"
          fill="hsl(var(--muted-foreground))"
        >
          Nozzle
        </text>

        {/* Curved wall (only in wall mode) */}
        {mode === "wall" && (
          <>
            <path
              d={wallPath}
              fill="none"
              stroke="hsl(var(--foreground))"
              strokeWidth={3}
              strokeLinecap="round"
            />
            {/* Hatching beneath wall to show "solid" */}
            <path
              d={`${wallPath} L ${W - 40} ${H} L ${nozzleX + 10} ${H} Z`}
              fill="hsl(var(--muted))"
              opacity={0.35}
            />
            {/* Low-pressure region between jet and wall */}
            <ellipse
              cx={nozzleX + 170}
              cy={nozzleY + 50}
              rx={90}
              ry={28}
              fill="url(#coanda-lowp)"
            />
            <text
              x={nozzleX + 170}
              y={nozzleY + 54}
              fontSize={11}
              textAnchor="middle"
              fill="hsl(var(--destructive))"
              fontWeight={600}
            >
              ↓ Low pressure
            </text>
            <text
              x={W - 90}
              y={nozzleY + 145}
              fontSize={11}
              textAnchor="middle"
              fill="hsl(var(--muted-foreground))"
            >
              Curved wall
            </text>
          </>
        )}

        {/* Streamlines */}
        {streams.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="url(#coanda-jet)"
            strokeWidth={i === 3 ? 2.4 : 1.6}
            opacity={i === 3 ? 1 : 0.7}
          />
        ))}

        {/* Animated flow markers along central streamline */}
        <path
          d={streams[3]}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth={3}
          strokeDasharray="6 18"
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
        />

        {/* Entrainment arrows (free jet: symmetric) */}
        {mode === "free" && (
          <>
            <Arrow x1={nozzleX + 60} y1={nozzleY - 70} x2={nozzleX + 90} y2={nozzleY - 35} />
            <Arrow x1={nozzleX + 60} y1={nozzleY + 70} x2={nozzleX + 90} y2={nozzleY + 35} />
            <text
              x={nozzleX + 75}
              y={nozzleY - 78}
              fontSize={10}
              textAnchor="middle"
              fill="hsl(var(--muted-foreground))"
            >
              entrainment
            </text>
            <text
              x={nozzleX + 75}
              y={nozzleY + 90}
              fontSize={10}
              textAnchor="middle"
              fill="hsl(var(--muted-foreground))"
            >
              entrainment
            </text>
          </>
        )}

        {/* Mode caption */}
        <text
          x={W / 2}
          y={26}
          fontSize={13}
          fontWeight={600}
          textAnchor="middle"
          fill="hsl(var(--foreground))"
        >
          {mode === "free"
            ? "Free jet — symmetrical entrainment, jet stays straight"
            : "Wall jet — jet adheres to convex surface (Coandă effect)"}
        </text>
      </svg>

      <div className="grid sm:grid-cols-2 gap-3 mt-4 text-sm">
        <div className="rounded-lg border border-border bg-secondary/30 p-3">
          <p className="font-medium text-foreground">Mechanism</p>
          <p className="text-muted-foreground mt-1">
            A jet entrains surrounding fluid. Near a wall, entrainment is restricted on
            the wall side, so pressure there falls below ambient. The pressure
            differential deflects the jet onto the surface, where it remains attached
            until the curvature is too sharp to follow.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-secondary/30 p-3">
          <p className="font-medium text-foreground">Clinical relevance</p>
          <ul className="text-muted-foreground mt-1 space-y-1 list-disc list-inside">
            <li>Asymmetric gas/blood distribution at airway and vascular bifurcations</li>
            <li>Fluidic logic in older ventilators (no moving parts)</li>
            <li>Jet ventilation: jet hugs tracheal wall — affects entrainment & FiO₂</li>
            <li>Cardiac murmurs / regurgitant jets that track along chamber walls</li>
          </ul>
        </div>
      </div>
    </DiagramFigure>
  );
};

const Arrow = ({ x1, y1, x2, y2 }: { x1: number; y1: number; x2: number; y2: number }) => (
  <g>
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="hsl(var(--muted-foreground))"
      strokeWidth={1.5}
      markerEnd="url(#coanda-arrowhead)"
    />
    <defs>
      <marker
        id="coanda-arrowhead"
        markerWidth="8"
        markerHeight="8"
        refX="6"
        refY="4"
        orient="auto"
      >
        <path d="M0,0 L6,4 L0,8 Z" fill="hsl(var(--muted-foreground))" />
      </marker>
    </defs>
  </g>
);

export default CoandaEffectDiagram;
