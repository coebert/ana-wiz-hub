import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { DiagramFigure } from "../_shared/DiagramFigure";

/**
 * OxygenCascadeDiagram
 *
 * Stepwise fall in PO₂ from atmospheric air to the mitochondrion
 * (room air, breathing spontaneously, at sea level). Shown as a
 * descending step plot so the magnitude of each loss is visually
 * obvious.
 *
 * Values are the canonical FRCA Primary teaching figures (kPa):
 *   Atmospheric  ............ 21.2
 *   Humidified inspired  .... 19.9
 *   Alveolar  ............... 13.3
 *   Arterial  ............... 13.0   (small A–a gradient ≈ 0.3 kPa)
 *   Capillary  .............. 5.3
 *   Mitochondrial  .......... 1.0    (Pasteur point ~0.5–3 kPa)
 *
 * Source: West JB, Respiratory Physiology — The Essentials (10th ed.).
 */
const STEPS = [
  { label: "Atmospheric",  po2: 21.2, note: "Dry air, sea level (FiO₂ 0.21 × 101.3 kPa)" },
  { label: "Humidified",   po2: 19.9, note: "After warming + saturation in upper airway (P_H₂O 6.3 kPa)" },
  { label: "Alveolar",     po2: 13.3, note: "Alveolar gas equation: P_AO₂ = FiO₂(P_atm − P_H₂O) − PaCO₂/RQ" },
  { label: "Arterial",     po2: 13.0, note: "Small A–a gradient (≈0.3 kPa) from physiological V/Q mismatch + shunt" },
  { label: "Capillary",    po2: 5.3,  note: "After tissue O₂ offloading (mixed venous PO₂)" },
  { label: "Mitochondrial",po2: 1.0,  note: "Pasteur point: below ~0.5–3 kPa oxidative phosphorylation fails" },
];

const W = 720;
const H = 360;
const PAD_L = 70;
const PAD_R = 20;
const PAD_T = 30;
const PAD_B = 70;
const PLOT_W = W - PAD_L - PAD_R;
const PLOT_H = H - PAD_T - PAD_B;
const Y_MAX = 22; // kPa

const xFor = (i: number) => PAD_L + (i + 0.5) * (PLOT_W / STEPS.length);
const yFor = (po2: number) => PAD_T + (1 - po2 / Y_MAX) * PLOT_H;

const STEP_MS = 1600;        // dwell time per step
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

const OxygenCascadeDiagram = () => {
  const yTicks = [0, 5, 10, 15, 20];

  // ── Sequential highlight animation ──────────────────────────────
  // `active` is the index of the currently highlighted step, or -1
  // when nothing is highlighted (initial state / reduced motion).
  // The timer auto-advances through 0..N-1, then loops after a brief
  // dwell on the final mitochondrial step.
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const reducedMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia?.(REDUCED_MOTION_QUERY).matches,
  );

  useEffect(() => {
    if (reducedMotion.current || !playing) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % STEPS.length);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [playing]);

  // If the user prefers reduced motion, show all steps at full
  // emphasis (treat every step as "active") and skip the timer.
  const isActive = (i: number) =>
    reducedMotion.current ? true : i === active;

  return (
    <div className="space-y-4">
      <DiagramFigure
        id="oxygen-cascade"
        title="Oxygen cascade from atmosphere to mitochondrion"
        description="Stepwise fall in partial pressure of oxygen (PO₂, kPa) from inspired air through the alveolus, arterial blood, capillary and mitochondrion at sea level breathing room air."
      >
        <svg
          role="img"
          aria-labelledby="oxygen-cascade-title oxygen-cascade-desc"
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto"
        >
          <title id="oxygen-cascade-title">Oxygen cascade</title>
          <desc id="oxygen-cascade-desc">
            Descending step plot showing PO₂ falling from 21 kPa atmospheric to ~1 kPa mitochondrial.
          </desc>

          {/* Y axis grid + labels */}
          {yTicks.map((t) => {
            const y = yFor(t);
            return (
              <g key={t}>
                <line
                  x1={PAD_L}
                  x2={W - PAD_R}
                  y1={y}
                  y2={y}
                  stroke="hsl(var(--border))"
                  strokeDasharray="2 4"
                />
                <text
                  x={PAD_L - 10}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-muted-foreground"
                  fontSize="11"
                >
                  {t}
                </text>
              </g>
            );
          })}
          <text
            x={18}
            y={PAD_T + PLOT_H / 2}
            transform={`rotate(-90 18 ${PAD_T + PLOT_H / 2})`}
            textAnchor="middle"
            className="fill-foreground"
            fontSize="12"
            fontWeight="600"
          >
            PO₂ (kPa)
          </text>

          {/* Step plot — descending horizontal bars + connecting drops */}
          {STEPS.map((s, i) => {
            const x = xFor(i);
            const y = yFor(s.po2);
            const barW = (PLOT_W / STEPS.length) * 0.7;
            const next = STEPS[i + 1];
            const on = isActive(i);
            // Tween-friendly visual values; CSS handles the transition.
            return (
              <g key={s.label} style={{ transition: "opacity 400ms ease-out" }}>
                {/* Drop connector to next step */}
                {next && (
                  <line
                    x1={x + barW / 2}
                    y1={y}
                    x2={xFor(i + 1) - barW / 2}
                    y2={yFor(next.po2)}
                    stroke="hsl(var(--physiology))"
                    strokeWidth={on ? 2.5 : 2}
                    strokeDasharray="4 3"
                    opacity={on ? 0.95 : 0.4}
                    style={{ transition: "opacity 400ms ease-out, stroke-width 400ms ease-out" }}
                  />
                )}
                {/* Bar — fill + stroke + a glow filter brighten when active */}
                <rect
                  x={x - barW / 2}
                  y={y}
                  width={barW}
                  height={PAD_T + PLOT_H - y}
                  rx={3}
                  fill={on ? "hsl(var(--physiology) / 0.55)" : "hsl(var(--physiology) / 0.14)"}
                  stroke="hsl(var(--physiology))"
                  strokeWidth={on ? 2.5 : 1.25}
                  opacity={on ? 1 : 0.55}
                  style={{
                    transition:
                      "fill 400ms ease-out, stroke-width 400ms ease-out, opacity 400ms ease-out, filter 400ms ease-out",
                    filter: on
                      ? "drop-shadow(0 0 6px hsl(var(--physiology) / 0.55))"
                      : "none",
                  }}
                />
                {/* Value label above bar */}
                <text
                  x={x}
                  y={y - 6}
                  textAnchor="middle"
                  className="fill-foreground"
                  fontSize={on ? 13 : 12}
                  fontWeight="700"
                  style={{ transition: "font-size 400ms ease-out" }}
                >
                  {s.po2.toFixed(1)}
                </text>
                {/* X axis label */}
                <text
                  x={x}
                  y={PAD_T + PLOT_H + 18}
                  textAnchor="middle"
                  className="fill-foreground"
                  fontSize="11"
                  fontWeight={on ? 700 : 500}
                  opacity={on ? 1 : 0.7}
                  style={{ transition: "opacity 400ms ease-out, font-weight 400ms ease-out" }}
                >
                  {s.label}
                </text>
              </g>
            );
          })}

          {/* Pasteur-point shading */}
          <rect
            x={PAD_L}
            y={yFor(3)}
            width={PLOT_W}
            height={yFor(0) - yFor(3)}
            fill="hsl(var(--destructive) / 0.08)"
          />
          <text
            x={W - PAD_R - 6}
            y={yFor(3) - 4}
            textAnchor="end"
            className="fill-destructive"
            fontSize="10"
            fontStyle="italic"
          >
            Pasteur point (~0.5–3 kPa)
          </text>

          {/* X axis baseline */}
          <line
            x1={PAD_L}
            x2={W - PAD_R}
            y1={PAD_T + PLOT_H}
            y2={PAD_T + PLOT_H}
            stroke="hsl(var(--foreground))"
            strokeWidth={1.5}
          />
          <text
            x={PAD_L + PLOT_W / 2}
            y={H - 10}
            textAnchor="middle"
            className="fill-muted-foreground"
            fontSize="11"
          >
            Stage along the oxygen cascade
          </text>
        </svg>
      </DiagramFigure>

      {/* Playback controls — let the user pause/scrub the sequence */}
      {!reducedMotion.current && (
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause cascade animation" : "Play cascade animation"}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary/60 text-foreground hover:bg-secondary transition-colors"
          >
            {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            {playing ? "Pause" : "Play"}
          </button>
          <button
            type="button"
            onClick={() => { setActive(0); setPlaying(true); }}
            aria-label="Restart cascade animation"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary/40 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Restart
          </button>
          <div className="flex gap-1 ml-1">
            {STEPS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => { setActive(i); setPlaying(false); }}
                aria-label={`Jump to step ${i + 1}: ${STEPS[i].label}`}
                className={`h-2 w-2 rounded-full transition-all ${
                  i === active
                    ? "bg-physiology scale-125"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Stage-by-stage explanation — the active step is highlighted to match the diagram */}
      <ol className="space-y-2 text-sm">
        {STEPS.map((s, i) => {
          const on = isActive(i);
          return (
            <li
              key={s.label}
              className={`flex gap-3 rounded-md px-2 py-1 -mx-2 transition-all duration-300 ${
                on
                  ? "bg-physiology/10 ring-1 ring-physiology/40"
                  : "opacity-70"
              }`}
            >
              <span
                className={`font-mono text-xs w-6 shrink-0 mt-0.5 transition-colors ${
                  on ? "text-physiology font-bold" : "text-muted-foreground"
                }`}
              >
                {i + 1}.
              </span>
              <div>
                <span className="font-semibold text-foreground">{s.label}</span>{" "}
                <span className="font-mono text-physiology">{s.po2.toFixed(1)} kPa</span>
                <span className="text-foreground/80"> — {s.note}</span>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default OxygenCascadeDiagram;
