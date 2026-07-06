import { useEffect, useRef, useState } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

const W = 640;
const H = 320;

/**
 * Coandă Effect Diagram
 *
 * Animated illustration of a fluid jet adhering to a curved surface
 * (Coandă effect) and the transition to detachment as the wall
 * curvature increases beyond a critical angle.
 *
 * Modes:
 *  • "free"  — symmetrical entrainment, jet stays axial.
 *  • "wall"  — jet near a curved wall; user-controlled curvature
 *              (or auto-cycle) demonstrates the attached → separating →
 *              detached transition with a visible separation point.
 */
const CoandaEffectDiagram = () => {
  const [mode, setMode] = useState<"free" | "wall">("wall");
  const [curvature, setCurvature] = useState(35); // 0..100
  const [auto, setAuto] = useState(false);
  const [t, setT] = useState(0);
  const raf = useRef<number | null>(null);

  // Continuous time for dash animation
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

  // Auto-cycle curvature 0 → 100 → 0 to dramatise the detachment
  useEffect(() => {
    if (!auto || mode !== "wall") return;
    const id = setInterval(() => {
      setCurvature((c) => {
        const next = c + 2;
        return next > 100 ? 0 : next;
      });
    }, 60);
    return () => clearInterval(id);
  }, [auto, mode]);

  // ---- Geometry --------------------------------------------------
  const nozzleX = 110;
  const nozzleY = H / 2;
  const nozzleH = 36;

  // Critical curvature beyond which the jet separates
  const CRIT = 60;
  // Smooth attachment factor: 1 = fully attached, 0 = fully detached
  const attach = clamp01(1 - (curvature - CRIT) / 25);

  // Wall geometry: deeper "drop" as curvature increases.
  // Wall ends at (W-40, nozzleY + wallDrop). Higher curvature = bigger drop.
  const wallDrop = 40 + curvature * 1.8; // 40 .. 220 px
  const wallEndX = W - 40;
  const wallEndY = nozzleY + wallDrop;
  // Quadratic control point — pulls the curve down sharply for high curvature
  const wallCpX = nozzleX + 160;
  const wallCpY = nozzleY + nozzleH / 2 + curvature * 1.2;
  const wallPath = `M ${nozzleX + 10} ${nozzleY + nozzleH / 2}
                    Q ${wallCpX} ${wallCpY}
                      ${wallEndX} ${wallEndY}`;

  // Where the jet separates from the wall (only when curvature > CRIT).
  // Separation point slides leftward (earlier separation) as curvature grows.
  const sepFrac = clamp01(1 - (curvature - CRIT) / 40); // 1 → 0
  const sepX = nozzleX + 10 + sepFrac * (wallEndX - (nozzleX + 10));
  const sepY = quadAt(nozzleX + 10, nozzleY + nozzleH / 2, wallCpX, wallCpY, wallEndX, wallEndY, sepFrac);

  // ---- Streamlines ----------------------------------------------
  // Build streamline paths. In wall mode, each streamline is a blend between
  // "attached to wall" and "free / straight" trajectories, weighted by `attach`.
  const streams = Array.from({ length: 7 }).map((_, i) => {
    const offset = (i - 3) * 8; // -24..24 across the nozzle
    const y0 = nozzleY + offset;
    const x0 = nozzleX + 8;

    if (mode === "free") {
      const y3 = nozzleY + offset * 2.4;
      return `M ${x0} ${y0} C ${nozzleX + 150} ${nozzleY + offset * 1.4}, ${nozzleX + 320} ${nozzleY + offset * 2.0}, ${W - 30} ${y3}`;
    }

    // Wall mode — interpolate
    // Attached endpoint: along the wall surface at offset above wall
    const aEndY = wallEndY - 8 + offset * 0.3;
    const aCp1Y = nozzleY + offset * 0.6 + 10;
    const aCp2Y = nozzleY + offset * 0.4 + (wallDrop - 30) * 0.65;

    // Detached endpoint: roughly straight (continues axial), slight downward kink
    // because the jet was bent before separation
    const initialBend = curvature * 0.25; // small initial deflection
    const dEndY = nozzleY + offset + initialBend;
    const dCp1Y = nozzleY + offset + initialBend * 0.4;
    const dCp2Y = nozzleY + offset + initialBend * 0.8;

    const cp1Y = lerp(dCp1Y, aCp1Y, attach);
    const cp2Y = lerp(dCp2Y, aCp2Y, attach);
    const endY = lerp(dEndY, aEndY, attach);

    return `M ${x0} ${y0} C ${nozzleX + 140} ${cp1Y}, ${nozzleX + 320} ${cp2Y}, ${W - 30} ${endY}`;
  });

  // Animated dashes along central streamline
  const dashOffset = -((t * 80) % 24);

  // Status label
  const status =
    mode === "free"
      ? "Free jet"
      : curvature < CRIT - 5
      ? "Attached"
      : curvature < CRIT + 10
      ? "Separating"
      : "Detached";

  const statusColor =
    status === "Attached"
      ? "hsl(var(--primary))"
      : status === "Separating"
      ? "hsl(var(--chart-4, var(--accent)))"
      : status === "Detached"
      ? "hsl(var(--destructive))"
      : "hsl(var(--muted-foreground))";

  // Low-pressure region opacity scales with attachment
  const lowPOpacity = attach;

  return (
    <DiagramFigure
      id="coanda-effect"
      title="Coandă effect: jet attachment to a curved surface"
      description="A fluid jet (gas or blood) tends to follow a nearby convex surface because entrained fluid between the jet and wall creates a low-pressure region that pulls the jet toward the wall. As wall curvature increases beyond a critical angle, the jet can no longer follow and separates from the surface."
    >
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
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
        {mode === "wall" && (
          <button
            type="button"
            onClick={() => setAuto((a) => !a)}
            className={`text-xs px-3 py-1 rounded-md border transition ${
              auto
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-foreground/80 border-border hover:bg-secondary/50"
            }`}
            aria-pressed={auto}
          >
            {auto ? "■ Stop" : "▶ Auto-cycle curvature"}
          </button>
        )}
      </div>

      {mode === "wall" && (
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
            <label htmlFor="coanda-curvature">Wall curvature</label>
            <span style={{ color: statusColor }} className="font-semibold">
              {status} · {curvature}°
            </span>
          </div>
          <input
            id="coanda-curvature"
            type="range"
            min={0}
            max={100}
            value={curvature}
            onChange={(e) => {
              setAuto(false);
              setCurvature(parseInt(e.target.value, 10));
            }}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-[10px] text-muted-foreground mt-0.5">
            <span>gentle</span>
            <span className="opacity-70">↑ critical angle ~{CRIT}</span>
            <span>sharp</span>
          </div>
        </div>
      )}

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
            <stop offset="0%" stopColor="hsl(var(--destructive))" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(var(--destructive))" stopOpacity="0" />
          </radialGradient>
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
              d={`${wallPath} L ${wallEndX} ${H} L ${nozzleX + 10} ${H} Z`}
              fill="hsl(var(--muted))"
              opacity={0.35}
            />
            <path
              d={wallPath}
              fill="none"
              stroke="hsl(var(--foreground))"
              strokeWidth={3}
              strokeLinecap="round"
            />

            {/* Low-pressure region between jet and wall — fades as jet detaches */}
            <ellipse
              cx={nozzleX + 170}
              cy={nozzleY + 50 + curvature * 0.3}
              rx={90}
              ry={28}
              fill="url(#coanda-lowp)"
              opacity={lowPOpacity}
              style={{ transition: "opacity 0.25s ease" }}
            />
            {lowPOpacity > 0.25 && (
              <text
                x={nozzleX + 170}
                y={nozzleY + 54 + curvature * 0.3}
                fontSize={11}
                textAnchor="middle"
                fill="hsl(var(--destructive))"
                fontWeight={600}
                opacity={lowPOpacity}
              >
                ↓ Low pressure
              </text>
            )}

            {/* Separation marker — appears when jet has detached */}
            {attach < 0.95 && (
              <g opacity={1 - attach}>
                <circle
                  cx={sepX}
                  cy={sepY - 6}
                  r={6}
                  fill="none"
                  stroke="hsl(var(--destructive))"
                  strokeWidth={2}
                />
                <line
                  x1={sepX}
                  y1={sepY - 12}
                  x2={sepX}
                  y2={sepY - 30}
                  stroke="hsl(var(--destructive))"
                  strokeWidth={1.5}
                  strokeDasharray="3 3"
                />
                <text
                  x={sepX}
                  y={sepY - 36}
                  fontSize={11}
                  textAnchor="middle"
                  fill="hsl(var(--destructive))"
                  fontWeight={600}
                >
                  separation
                </text>
                {/* Recirculation eddy under detached jet */}
                <path
                  d={`M ${sepX + 20} ${sepY + 20} q 30 -18 60 0 q -30 26 -60 0 z`}
                  fill="hsl(var(--destructive))"
                  opacity={0.12 * (1 - attach)}
                />
                <text
                  x={sepX + 50}
                  y={sepY + 28}
                  fontSize={10}
                  textAnchor="middle"
                  fill="hsl(var(--muted-foreground))"
                  opacity={1 - attach}
                >
                  recirculation
                </text>
              </g>
            )}
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
            style={{ transition: "d 0.15s linear" }}
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
            <line
              x1={nozzleX + 60}
              y1={nozzleY - 70}
              x2={nozzleX + 90}
              y2={nozzleY - 35}
              stroke="hsl(var(--muted-foreground))"
              strokeWidth={1.5}
              markerEnd="url(#coanda-arrowhead)"
            />
            <line
              x1={nozzleX + 60}
              y1={nozzleY + 70}
              x2={nozzleX + 90}
              y2={nozzleY + 35}
              stroke="hsl(var(--muted-foreground))"
              strokeWidth={1.5}
              markerEnd="url(#coanda-arrowhead)"
            />
            <text x={nozzleX + 75} y={nozzleY - 78} fontSize={10} textAnchor="middle" fill="hsl(var(--muted-foreground))">
              entrainment
            </text>
            <text x={nozzleX + 75} y={nozzleY + 90} fontSize={10} textAnchor="middle" fill="hsl(var(--muted-foreground))">
              entrainment
            </text>
          </>
        )}

        {/* Caption */}
        <text
          x={W / 2}
          y={26}
          fontSize={13}
          fontWeight={600}
          textAnchor="middle"
          fill="hsl(var(--foreground))"
        >
          {mode === "free"
            ? "Free jet — symmetrical entrainment"
            : status === "Attached"
            ? "Jet adheres to wall (Coandă)"
            : status === "Separating"
            ? "Adverse pressure gradient — jet about to break away"
            : "Curvature exceeds critical angle — jet detaches"}
        </text>
      </svg>

      <div className="grid sm:grid-cols-2 gap-3 mt-4 text-sm">
        <div className="rounded-lg border border-border bg-secondary/30 p-3">
          <p className="font-medium text-foreground">Mechanism</p>
          <p className="text-muted-foreground mt-1">
            A jet entrains surrounding fluid. Near a wall, entrainment is restricted on
            the wall side, so pressure there falls below ambient and the jet bends onto
            the surface. Beyond a <strong>critical curvature</strong>, the boundary layer
            cannot supply enough momentum to follow the surface and the jet
            <strong> separates</strong>, leaving a recirculation zone behind it.
          </p>
        </div>
        <div className="rounded-lg border border-border bg-secondary/30 p-3">
          <p className="font-medium text-foreground">Clinical relevance</p>
          <ul className="text-muted-foreground mt-1 space-y-1 list-disc list-inside">
            <li>Asymmetric gas/blood distribution at airway and vascular bifurcations</li>
            <li>Fluidic logic in older ventilators (no moving parts)</li>
            <li>Jet ventilation: jet hugs tracheal wall — affects entrainment & FiO₂</li>
            <li>Eccentric regurgitant jets that track along chamber walls on echo</li>
          </ul>
        </div>
      </div>
    </DiagramFigure>
  );
};

// ---- helpers --------------------------------------------------
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
// Quadratic Bézier y at parameter t (0..1) given P0, P1 (control), P2
const quadAt = (
  _x0: number,
  y0: number,
  _x1: number,
  y1: number,
  _x2: number,
  y2: number,
  t: number,
) => {
  const u = 1 - t;
  return u * u * y0 + 2 * u * t * y1 + t * t * y2;
};

export default CoandaEffectDiagram;
