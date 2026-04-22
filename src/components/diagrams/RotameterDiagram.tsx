import { useEffect, useState } from "react";

/**
 * Animated rotameter (variable-orifice, constant-pressure-drop flowmeter) diagram.
 * - Tapered glass tube with rising/falling bobbin driven by a flow slider or auto-play
 * - Annotates the annular gap (laminar at low flow → turbulent at high flow)
 * - Animated upstream gas particles that speed up with flow
 * - Free-body force diagram (weight ↔ pressure-drop × area + drag) updates live
 */

const MIN = 0;
const MAX = 10; // L/min
const TUBE_TOP_Y = 30;
const TUBE_BOTTOM_Y = 290;
const TUBE_HEIGHT = TUBE_BOTTOM_Y - TUBE_TOP_Y;

// Tapered tube: narrow at the bottom, wider at the top
const TOP_HALF_WIDTH = 55;
const BOTTOM_HALF_WIDTH = 18;
const CENTER_X = 150;

const halfWidthAt = (y: number) => {
  const t = (y - TUBE_TOP_Y) / TUBE_HEIGHT; // 0 top, 1 bottom
  return TOP_HALF_WIDTH + (BOTTOM_HALF_WIDTH - TOP_HALF_WIDTH) * t;
};

const BOBBIN_HALF_WIDTH = 14; // constant
const BOBBIN_HEIGHT = 22;

export const RotameterDiagram = () => {
  const [flow, setFlow] = useState(3);
  const [playing, setPlaying] = useState(true);
  const [particleTick, setParticleTick] = useState(0);

  // Auto-sweep flow when playing
  useEffect(() => {
    if (!playing) return;
    let raf: number;
    let last = performance.now();
    let dir = 1;
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setFlow((f) => {
        let next = f + dir * dt * 1.6;
        if (next >= MAX) { next = MAX; dir = -1; }
        if (next <= MIN + 0.3) { next = MIN + 0.3; dir = 1; }
        return next;
      });
      setParticleTick((t) => t + dt);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  // Continue particle animation even when paused (so gas still drifts at fixed flow)
  useEffect(() => {
    if (playing) return;
    let raf: number;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setParticleTick((t) => t + dt);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  // Bobbin position: higher flow → higher bobbin (lower y)
  const bobbinCenterY =
    TUBE_BOTTOM_Y - 30 - (flow / MAX) * (TUBE_HEIGHT - 60);
  const bobbinTopY = bobbinCenterY - BOBBIN_HEIGHT / 2;
  const bobbinBottomY = bobbinCenterY + BOBBIN_HEIGHT / 2;

  // Annular gap at bobbin level
  const tubeHalfAtBobbin = halfWidthAt(bobbinCenterY);
  const annularGap = tubeHalfAtBobbin - BOBBIN_HALF_WIDTH; // per side
  const flowRegime = annularGap < 8 ? "Laminar" : annularGap < 16 ? "Transitional" : "Turbulent";
  const regimeColor =
    flowRegime === "Laminar"
      ? "hsl(var(--physics))"
      : flowRegime === "Transitional"
        ? "hsl(var(--accent))"
        : "hsl(var(--destructive))";
  const dependsOn = flowRegime === "Laminar" ? "Viscosity (η)" : flowRegime === "Turbulent" ? "Density (ρ)" : "Both";

  // Particles streaming upward through the tube
  const PARTICLE_COUNT = 14;
  const speed = 30 + flow * 28; // px/s upward
  const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const phase = (i / PARTICLE_COUNT) * (TUBE_HEIGHT + 40);
    const distance = (particleTick * speed + phase) % (TUBE_HEIGHT + 40);
    const y = TUBE_BOTTOM_Y - distance;
    if (y < TUBE_TOP_Y - 10 || y > TUBE_BOTTOM_Y + 5) return null;
    const halfW = halfWidthAt(Math.max(TUBE_TOP_Y, Math.min(TUBE_BOTTOM_Y, y)));
    // Particles ride on either side of the bobbin
    const inBobbin = y > bobbinTopY && y < bobbinBottomY;
    const offsetMag = inBobbin
      ? BOBBIN_HALF_WIDTH + Math.max(2, (halfW - BOBBIN_HALF_WIDTH) / 2)
      : (halfW - 4) * (0.3 + 0.4 * Math.sin(i * 12.9 + distance * 0.05));
    const side = i % 2 === 0 ? 1 : -1;
    return { id: i, x: CENTER_X + side * offsetMag, y, inBobbin };
  }).filter(Boolean) as { id: number; x: number; y: number; inBobbin: boolean }[];

  // Scale tick marks (0–10 L/min)
  const ticks = Array.from({ length: 11 }, (_, i) => {
    const value = i;
    const y = TUBE_BOTTOM_Y - 30 - (value / MAX) * (TUBE_HEIGHT - 60);
    return { value, y };
  });

  return (
    <div className="bg-card rounded-xl border border-border p-6 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-foreground">Rotameter — Variable Orifice Flowmeter</h3>
          <p className="text-sm text-muted-foreground">
            Adjust the flow to watch the bobbin rise. The annular gap widens as the tube tapers outward.
          </p>
        </div>
        <button
          onClick={() => setPlaying((p) => !p)}
          className="px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover-scale"
        >
          {playing ? "Pause" : "Auto-sweep"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6 items-start">
        {/* SVG diagram */}
        <div className="flex justify-center">
          <svg viewBox="0 0 300 320" className="w-full max-w-[300px]">
            <defs>
              <linearGradient id="tubeGrad" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="hsl(var(--muted))" stopOpacity="0.25" />
                <stop offset="50%" stopColor="hsl(var(--muted))" stopOpacity="0.05" />
                <stop offset="100%" stopColor="hsl(var(--muted))" stopOpacity="0.25" />
              </linearGradient>
              <linearGradient id="bobbinGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--foreground))" stopOpacity="0.95" />
                <stop offset="50%" stopColor="hsl(var(--muted-foreground))" />
                <stop offset="100%" stopColor="hsl(var(--foreground))" stopOpacity="0.85" />
              </linearGradient>
              <radialGradient id="particleGrad">
                <stop offset="0%" stopColor="hsl(var(--physics))" stopOpacity="0.95" />
                <stop offset="100%" stopColor="hsl(var(--physics))" stopOpacity="0.2" />
              </radialGradient>
            </defs>

            {/* Inlet arrow */}
            <g>
              <line
                x1={CENTER_X}
                y1={TUBE_BOTTOM_Y + 25}
                x2={CENTER_X}
                y2={TUBE_BOTTOM_Y + 5}
                stroke="hsl(var(--physics))"
                strokeWidth="2"
                markerEnd="url(#arrowUp)"
              />
              <text x={CENTER_X + 10} y={TUBE_BOTTOM_Y + 22} fontSize="10" fill="hsl(var(--muted-foreground))">
                Gas in
              </text>
            </g>
            <defs>
              <marker id="arrowUp" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" fill="hsl(var(--physics))" />
              </marker>
            </defs>

            {/* Tapered tube outline */}
            <path
              d={`
                M ${CENTER_X - TOP_HALF_WIDTH} ${TUBE_TOP_Y}
                L ${CENTER_X - BOTTOM_HALF_WIDTH} ${TUBE_BOTTOM_Y}
                L ${CENTER_X + BOTTOM_HALF_WIDTH} ${TUBE_BOTTOM_Y}
                L ${CENTER_X + TOP_HALF_WIDTH} ${TUBE_TOP_Y}
                Z
              `}
              fill="url(#tubeGrad)"
              stroke="hsl(var(--border))"
              strokeWidth="1.5"
            />

            {/* Tick marks on right side */}
            {ticks.map((t) => (
              <g key={t.value}>
                <line
                  x1={CENTER_X + halfWidthAt(t.y)}
                  x2={CENTER_X + halfWidthAt(t.y) + (t.value % 2 === 0 ? 8 : 4)}
                  y1={t.y}
                  y2={t.y}
                  stroke="hsl(var(--muted-foreground))"
                  strokeWidth="1"
                />
                {t.value % 2 === 0 && (
                  <text
                    x={CENTER_X + halfWidthAt(t.y) + 12}
                    y={t.y + 3}
                    fontSize="9"
                    fill="hsl(var(--muted-foreground))"
                  >
                    {t.value}
                  </text>
                )}
              </g>
            ))}
            <text x={CENTER_X + 65} y={TUBE_TOP_Y - 8} fontSize="9" fill="hsl(var(--muted-foreground))">
              L/min
            </text>

            {/* Particles */}
            {particles.map((p) => (
              <circle
                key={p.id}
                cx={p.x}
                cy={p.y}
                r={p.inBobbin ? 1.6 : 2.2}
                fill="url(#particleGrad)"
              />
            ))}

            {/* Annular gap shading at bobbin */}
            <rect
              x={CENTER_X - tubeHalfAtBobbin}
              y={bobbinTopY}
              width={tubeHalfAtBobbin - BOBBIN_HALF_WIDTH}
              height={BOBBIN_HEIGHT}
              fill={regimeColor}
              opacity="0.18"
            />
            <rect
              x={CENTER_X + BOBBIN_HALF_WIDTH}
              y={bobbinTopY}
              width={tubeHalfAtBobbin - BOBBIN_HALF_WIDTH}
              height={BOBBIN_HEIGHT}
              fill={regimeColor}
              opacity="0.18"
            />

            {/* Bobbin */}
            <g style={{ transition: "transform 60ms linear" }}>
              <ellipse
                cx={CENTER_X}
                cy={bobbinCenterY}
                rx={BOBBIN_HALF_WIDTH}
                ry={BOBBIN_HEIGHT / 2}
                fill="url(#bobbinGrad)"
                stroke="hsl(var(--foreground))"
                strokeWidth="0.8"
              />
              {/* Slot for rotation indicator */}
              <line
                x1={CENTER_X - BOBBIN_HALF_WIDTH + 2}
                x2={CENTER_X + BOBBIN_HALF_WIDTH - 2}
                y1={bobbinCenterY}
                y2={bobbinCenterY}
                stroke="hsl(var(--background))"
                strokeWidth="1.5"
                opacity="0.7"
              />
              {/* Read line at top of bobbin */}
              <line
                x1={CENTER_X - BOBBIN_HALF_WIDTH - 4}
                x2={CENTER_X + tubeHalfAtBobbin + 4}
                y1={bobbinTopY}
                y2={bobbinTopY}
                stroke={regimeColor}
                strokeWidth="1"
                strokeDasharray="3 2"
              />
              <text
                x={CENTER_X - tubeHalfAtBobbin - 8}
                y={bobbinTopY + 3}
                fontSize="9"
                fill={regimeColor}
                textAnchor="end"
                fontWeight="600"
              >
                {flow.toFixed(1)}
              </text>
            </g>

            {/* Outlet */}
            <line
              x1={CENTER_X}
              y1={TUBE_TOP_Y}
              x2={CENTER_X}
              y2={TUBE_TOP_Y - 18}
              stroke="hsl(var(--physics))"
              strokeWidth="2"
              markerEnd="url(#arrowUp)"
            />
            <text x={CENTER_X + 10} y={TUBE_TOP_Y - 8} fontSize="10" fill="hsl(var(--muted-foreground))">
              Gas out
            </text>
          </svg>
        </div>

        {/* Live readouts + force diagram */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Flow rate: <span className="text-primary font-bold">{flow.toFixed(1)} L/min</span>
            </label>
            <input
              type="range"
              min={MIN}
              max={MAX}
              step={0.1}
              value={flow}
              onChange={(e) => {
                setPlaying(false);
                setFlow(parseFloat(e.target.value));
              }}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>0</span><span>5</span><span>10 L/min</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-border bg-secondary/30 p-3">
              <p className="text-xs text-muted-foreground">Annular gap (per side)</p>
              <p className="text-lg font-bold text-foreground">{annularGap.toFixed(1)} px</p>
            </div>
            <div className="rounded-lg border border-border bg-secondary/30 p-3">
              <p className="text-xs text-muted-foreground">Flow regime</p>
              <p className="text-lg font-bold" style={{ color: regimeColor }}>{flowRegime}</p>
            </div>
            <div className="rounded-lg border border-border bg-secondary/30 p-3 col-span-2">
              <p className="text-xs text-muted-foreground">Reading depends on</p>
              <p className="text-base font-semibold text-foreground">{dependsOn}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {flowRegime === "Laminar"
                  ? "Narrow gap behaves like a tube → Hagen-Poiseuille (Q ∝ ΔPr⁴/ηl)."
                  : flowRegime === "Turbulent"
                    ? "Wide gap behaves like an orifice → flow ∝ √(ΔP/ρ)."
                    : "Mixed regime — calibration interpolates between viscosity and density dependence."}
              </p>
            </div>
          </div>

          {/* Force balance */}
          <div className="rounded-lg border border-border bg-card p-3">
            <p className="text-sm font-semibold text-foreground mb-2">Force balance on bobbin (constant ΔP)</p>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center gap-2">
                <span className="inline-block w-16 text-muted-foreground">Up:</span>
                <span className="text-foreground">ΔP × A<sub>bobbin</sub> + drag</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-16 text-muted-foreground">Down:</span>
                <span className="text-foreground">Weight (mg)</span>
              </div>
              <p className="text-muted-foreground italic mt-2">
                The bobbin floats where forces balance. Because A<sub>annulus</sub> increases as the bobbin rises in the tapered
                tube, ΔP across the bobbin stays <strong>constant</strong> at all flows — the orifice area is the variable.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick safety pearls */}
      <div className="grid sm:grid-cols-3 gap-3 pt-2">
        <div className="rounded-lg border border-border bg-secondary/20 p-3">
          <p className="text-xs font-semibold text-foreground">Read at top of bobbin</p>
          <p className="text-xs text-muted-foreground mt-1">Ball floats are read at centre.</p>
        </div>
        <div className="rounded-lg border border-border bg-secondary/20 p-3">
          <p className="text-xs font-semibold text-foreground">Gas-specific calibration</p>
          <p className="text-xs text-muted-foreground mt-1">Viscosity & density differ — not interchangeable.</p>
        </div>
        <div className="rounded-lg border border-border bg-secondary/20 p-3">
          <p className="text-xs font-semibold text-foreground">O₂ downstream</p>
          <p className="text-xs text-muted-foreground mt-1">Prevents hypoxic mix if upstream tube cracks.</p>
        </div>
      </div>
    </div>
  );
};

export default RotameterDiagram;
