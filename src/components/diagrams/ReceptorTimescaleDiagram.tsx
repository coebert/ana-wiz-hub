import { useEffect, useState } from "react";

/**
 * Receptor types & signal-transduction timescales.
 *
 * Four parallel "tracks" — ligand-gated ion channel, GPCR,
 * kinase-linked, nuclear — share a logarithmic time axis spanning
 * 1 ms → 24 h. A playhead sweeps the axis; for each phase the
 * matching schematic on the left highlights and animates.
 */

type RxId = "ionChannel" | "gpcr" | "kinase" | "nuclear";

interface ReceptorBand {
  id: RxId;
  label: string;
  color: string;
  start: number; // ms
  peak: number;  // ms
  end: number;   // ms
  mechanism: string;
  examples: string;
  effect: string;
}

const BANDS: ReceptorBand[] = [
  {
    id: "ionChannel",
    label: "Ligand-gated ion channel",
    color: "hsl(35 85% 50%)",
    start: 0.5,
    peak: 5,
    end: 100,
    mechanism: "Ligand binding gates an integral pore → direct ion flux (Na⁺, K⁺, Cl⁻, Ca²⁺).",
    examples: "nAChR (Na⁺), GABA_A (Cl⁻), 5-HT₃, NMDA / AMPA (Ca²⁺/Na⁺), glycine.",
    effect: "Membrane potential changes within milliseconds — fast synaptic transmission.",
  },
  {
    id: "gpcr",
    label: "G-protein coupled receptor (GPCR)",
    color: "hsl(210 70% 50%)",
    start: 50,
    peak: 800,
    end: 30_000,
    mechanism: "7-TM receptor activates Gα subunit → second messenger cascade (cAMP, IP₃/DAG, ↑Ca²⁺).",
    examples: "β₁ (Gαs ↑cAMP), M₂ (Gαi ↓cAMP), α₁ (Gαq IP₃/DAG), μ-opioid, 5-HT₁.",
    effect: "Effects in seconds — modulate channels, contractility, secretion, neurotransmission.",
  },
  {
    id: "kinase",
    label: "Kinase-linked receptor",
    color: "hsl(280 50% 55%)",
    start: 30_000,
    peak: 600_000, // 10 min
    end: 7_200_000, // 2 h
    mechanism: "Single-TM receptor dimerises → autophosphorylation → recruits SH2 adaptor proteins → MAPK / PI3K cascade.",
    examples: "Insulin receptor, IGF-1, EGFR, cytokine receptors (JAK/STAT).",
    effect: "Metabolic and proliferative effects over minutes to hours.",
  },
  {
    id: "nuclear",
    label: "Nuclear / intracellular receptor",
    color: "hsl(160 55% 40%)",
    start: 1_800_000, // 30 min
    peak: 21_600_000, // 6 h
    end: 86_400_000, // 24 h
    mechanism: "Lipid-soluble ligand crosses membrane → binds cytosolic / nuclear receptor → DRE / HRE → modifies gene transcription.",
    examples: "Glucocorticoids, thyroid hormone, vitamin D, oestrogen, retinoids.",
    effect: "Protein synthesis-dependent — onset hours, duration days.",
  },
];

// Time axis (log scale): 1 ms → 24 h = 1 → 86_400_000 ms
const T_MIN = 1; // ms
const T_MAX = 86_400_000; // 24 h in ms
const logT = (t: number) => Math.log10(t);
const L_MIN = logT(T_MIN);
const L_MAX = logT(T_MAX);

const W = 540;
const H = 320;
const PAD_L = 168;
const PAD_R = 22;
const PAD_T = 28;
const PAD_B = 44;

const tToX = (t: number) =>
  PAD_L + ((logT(t) - L_MIN) / (L_MAX - L_MIN)) * (W - PAD_L - PAD_R);

// Tick markers for log time axis (with friendly labels)
const TICKS: Array<{ t: number; label: string }> = [
  { t: 1, label: "1 ms" },
  { t: 10, label: "10 ms" },
  { t: 100, label: "100 ms" },
  { t: 1_000, label: "1 s" },
  { t: 10_000, label: "10 s" },
  { t: 60_000, label: "1 min" },
  { t: 600_000, label: "10 min" },
  { t: 3_600_000, label: "1 h" },
  { t: 21_600_000, label: "6 h" },
  { t: 86_400_000, label: "24 h" },
];

export const ReceptorTimescaleDiagram = () => {
  const [playing, setPlaying] = useState(true);
  // Position along normalised log axis 0..1
  const [pos, setPos] = useState(0);

  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let last = performance.now();
    const step = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setPos((p) => {
        const next = p + dt * 0.13; // ~7.7 s per loop
        return next > 1.05 ? 0 : next;
      });
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const playheadL = L_MIN + pos * (L_MAX - L_MIN);
  const playheadT = Math.pow(10, playheadL); // ms
  const playheadX = tToX(playheadT);

  // Active bands: those whose log-time window covers playhead
  const isActive = (b: ReceptorBand) =>
    playheadL >= logT(b.start) && playheadL <= logT(b.end);
  const activeBand = BANDS.find(isActive) ?? null;

  // Band track Y positions
  const trackTop = PAD_T + 6;
  const trackH = (H - PAD_T - PAD_B - 6) / BANDS.length;

  return (
    <div className="my-6 space-y-4">
      <div className="bg-muted/30 rounded-xl border border-border p-4">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              Receptor types &amp; signal-transduction timescales
            </h3>
            <p className="text-xs text-muted-foreground">
              Watch the playhead sweep a log-time axis from 1 ms to 24 h.
            </p>
          </div>
          <button
            onClick={() => setPlaying((p) => !p)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border text-foreground hover:bg-muted transition-colors"
          >
            {playing ? "⏸ Pause" : "▶ Play"}
          </button>
        </div>

        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full max-w-2xl mx-auto"
          role="img"
          aria-label="Animated comparison of receptor types and the timescale of their cellular effects"
        >
          {/* Tracks */}
          {BANDS.map((b, i) => {
            const yTop = trackTop + i * trackH;
            const yMid = yTop + trackH / 2;
            const x0 = tToX(b.start);
            const x1 = tToX(b.end);
            const xPeak = tToX(b.peak);
            const active = isActive(b);

            return (
              <g key={b.id}>
                {/* Track background */}
                <rect
                  x={PAD_L}
                  y={yTop + 4}
                  width={W - PAD_L - PAD_R}
                  height={trackH - 8}
                  fill="hsl(var(--background))"
                  stroke="hsl(var(--border))"
                  strokeWidth={0.5}
                  opacity={0.6}
                />
                {/* Effect window */}
                <rect
                  x={x0}
                  y={yTop + 8}
                  width={Math.max(2, x1 - x0)}
                  height={trackH - 16}
                  rx={4}
                  fill={b.color}
                  opacity={active ? 0.55 : 0.22}
                />
                {/* Peak marker */}
                <circle
                  cx={xPeak}
                  cy={yMid}
                  r={active ? 4.5 : 3}
                  fill={b.color}
                  stroke="hsl(var(--background))"
                  strokeWidth={1}
                />

                {/* Left-side schematic */}
                <g transform={`translate(8, ${yTop + 6})`}>
                  <rect
                    x={0}
                    y={0}
                    width={PAD_L - 16}
                    height={trackH - 12}
                    rx={6}
                    fill={active ? `${b.color}1f` : "hsl(var(--muted) / 0.4)"}
                    stroke={active ? b.color : "hsl(var(--border))"}
                    strokeWidth={active ? 1.4 : 0.8}
                  />
                  <text
                    x={8}
                    y={14}
                    fontSize="9.5"
                    fontWeight={700}
                    fill={active ? b.color : "hsl(var(--foreground))"}
                  >
                    {b.label}
                  </text>
                  {/* Mini icon per receptor type */}
                  <ReceptorIcon id={b.id} active={active} color={b.color} x={8} y={22} />
                </g>
              </g>
            );
          })}

          {/* Time axis */}
          <line
            x1={PAD_L}
            x2={W - PAD_R}
            y1={H - PAD_B + 4}
            y2={H - PAD_B + 4}
            stroke="hsl(var(--muted-foreground))"
          />
          {TICKS.map((tk) => (
            <g key={tk.t}>
              <line
                x1={tToX(tk.t)}
                x2={tToX(tk.t)}
                y1={H - PAD_B + 4}
                y2={H - PAD_B + 8}
                stroke="hsl(var(--muted-foreground))"
              />
              <text
                x={tToX(tk.t)}
                y={H - PAD_B + 18}
                textAnchor="middle"
                fontSize="8"
                className="fill-muted-foreground"
              >
                {tk.label}
              </text>
            </g>
          ))}
          <text
            x={(PAD_L + W - PAD_R) / 2}
            y={H - 6}
            textAnchor="middle"
            fontSize="9.5"
            className="fill-foreground font-semibold"
          >
            time after ligand binding (log scale)
          </text>

          {/* Playhead */}
          <line
            x1={playheadX}
            x2={playheadX}
            y1={trackTop - 4}
            y2={H - PAD_B + 6}
            stroke="hsl(var(--primary))"
            strokeWidth={1.5}
            strokeDasharray="3 3"
          />
          <circle
            cx={playheadX}
            cy={trackTop - 6}
            r={4}
            fill="hsl(var(--primary))"
          />
        </svg>

        {/* Active panel */}
        <div
          className="mt-3 p-3 rounded-lg border border-border bg-background/80 space-y-1.5 min-h-[110px]"
          style={
            activeBand
              ? { borderLeftWidth: 4, borderLeftColor: activeBand.color }
              : undefined
          }
        >
          {activeBand ? (
            <>
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold text-foreground text-sm">
                  {activeBand.label}
                </p>
                <span
                  className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded-md"
                  style={{
                    background: `${activeBand.color}26`,
                    color: activeBand.color,
                  }}
                >
                  active at {formatTime(playheadT)}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Mechanism:</span>{" "}
                {activeBand.mechanism}
              </p>
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Effect:</span>{" "}
                {activeBand.effect}
              </p>
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Examples:</span>{" "}
                {activeBand.examples}
              </p>
            </>
          ) : (
            <p className="text-xs text-muted-foreground italic text-center">
              Between effect windows — no receptor class is currently signalling.
            </p>
          )}
        </div>

        <p className="text-xs text-center text-muted-foreground mt-3 italic">
          <span className="font-semibold not-italic text-foreground">
            Channels in milliseconds, GPCRs in seconds, kinases in minutes, nuclear receptors in hours.
          </span>
        </p>
      </div>
    </div>
  );
};

/* ─── helpers ─── */

function formatTime(ms: number): string {
  if (ms < 1_000) return `${ms.toFixed(0)} ms`;
  const s = ms / 1_000;
  if (s < 60) return `${s.toFixed(s < 10 ? 1 : 0)} s`;
  const m = s / 60;
  if (m < 60) return `${m.toFixed(m < 10 ? 1 : 0)} min`;
  const h = m / 60;
  return `${h.toFixed(h < 10 ? 1 : 0)} h`;
}

interface IconProps {
  id: RxId;
  active: boolean;
  color: string;
  x: number;
  y: number;
}

const ReceptorIcon = ({ id, active, color, x, y }: IconProps) => {
  const fg = active ? color : "hsl(var(--muted-foreground))";
  const wash = active ? 0.85 : 0.45;
  switch (id) {
    case "ionChannel":
      return (
        <g transform={`translate(${x}, ${y})`}>
          {/* Membrane band */}
          <rect x={0} y={14} width={120} height={18} fill="hsl(45 30% 92%)" stroke="hsl(var(--border))" />
          {/* Open channel */}
          <rect x={48} y={6} width={24} height={34} rx={3} fill={fg} opacity={wash} />
          <line x1={60} y1={9} x2={60} y2={37} stroke="hsl(var(--background))" strokeWidth={2} />
          {/* Ions flowing */}
          {active && [0, 1, 2].map((i) => (
            <circle key={i} cx={60} cy={4 + i * 14} r={2.2} fill={color}>
              <animate attributeName="cy" values="4;46;4" dur="0.8s" begin={`${i * 0.25}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="0;1;0" dur="0.8s" begin={`${i * 0.25}s`} repeatCount="indefinite" />
            </circle>
          ))}
          <text x={88} y={28} fontSize="8" fill={fg}>Na⁺ / Cl⁻</text>
        </g>
      );
    case "gpcr":
      return (
        <g transform={`translate(${x}, ${y})`}>
          <rect x={0} y={14} width={120} height={18} fill="hsl(45 30% 92%)" stroke="hsl(var(--border))" />
          {/* 7TM bundle */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <line key={i} x1={28 + i * 5} y1={14} x2={28 + i * 5} y2={32} stroke={fg} strokeWidth={2} opacity={wash} />
          ))}
          {/* Gα subunit drifting */}
          {active && (
            <circle cx={70} cy={38} r={4} fill={color}>
              <animate attributeName="cx" values="70;100;70" dur="1.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0.4;1" dur="1.4s" repeatCount="indefinite" />
            </circle>
          )}
          <text x={86} y={26} fontSize="8" fill={fg}>cAMP / IP₃</text>
        </g>
      );
    case "kinase":
      return (
        <g transform={`translate(${x}, ${y})`}>
          <rect x={0} y={14} width={120} height={18} fill="hsl(45 30% 92%)" stroke="hsl(var(--border))" />
          {/* Two single-TM receptors dimerising */}
          <line x1={36} y1={14} x2={36} y2={32} stroke={fg} strokeWidth={2} opacity={wash} />
          <line x1={48} y1={14} x2={48} y2={32} stroke={fg} strokeWidth={2} opacity={wash} />
          {/* P phosphate dots */}
          {active && [0, 1].map((i) => (
            <circle key={i} cx={36 + i * 12} cy={36} r={2.5} fill={color}>
              <animate attributeName="opacity" values="0;1;0" dur="1s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
            </circle>
          ))}
          <text x={64} y={28} fontSize="8" fill={fg}>P–MAPK / PI3K</text>
        </g>
      );
    case "nuclear":
      return (
        <g transform={`translate(${x}, ${y})`}>
          {/* Membrane (broken — ligand crosses) */}
          <line x1={0} y1={20} x2={120} y2={20} stroke="hsl(var(--border))" strokeDasharray="2 2" />
          {/* Nucleus */}
          <ellipse cx={62} cy={36} rx={26} ry={10} fill="hsl(45 30% 92%)" stroke={fg} strokeWidth={1} opacity={wash} />
          {/* Ligand-receptor entering */}
          {active && (
            <circle cx={20} cy={10} r={3.5} fill={color}>
              <animate attributeName="cx" values="20;55" dur="1.4s" repeatCount="indefinite" />
              <animate attributeName="cy" values="10;36" dur="1.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0.3" dur="1.4s" repeatCount="indefinite" />
            </circle>
          )}
          <text x={92} y={38} fontSize="8" fill={fg}>mRNA</text>
        </g>
      );
  }
};
