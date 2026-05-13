import { useEffect, useRef, useState } from "react";

/**
 * Side-by-side animated ventilator waveform comparison for ARDS:
 * Volume Control (VCV) vs Pressure Control (PCV) vs APRV.
 * Each panel shows a synchronised pressure–time trace with a moving
 * playhead, plus annotations for PEEP, plateau (Pplat), peak (Ppeak)
 * and driving pressure (ΔP = Pplat − PEEP).
 */

type ModeKey = "vcv" | "pcv" | "aprv";

interface ModeDef {
  key: ModeKey;
  label: string;
  full: string;
  blurb: string;
  // Pressure params (cmH2O) used for ARDS-typical settings
  peep: number;
  pPlat: number;   // VCV/PCV plateau (PCV target = pPlat)
  pPeak: number;   // VCV peak (resistive overshoot); PCV peak = plateau
  // APRV
  pHigh?: number;
  pLow?: number;
  tHigh?: number;
  tLow?: number;
}

const MODES: ModeDef[] = [
  {
    key: "vcv",
    label: "VCV",
    full: "Volume Control",
    blurb: "Set VT 6 mL/kg IBW. Square flow → rising pressure. Peak − plateau = resistive load. Pplat ≤ 30.",
    peep: 12,
    pPlat: 26,
    pPeak: 30,
  },
  {
    key: "pcv",
    label: "PCV",
    full: "Pressure Control",
    blurb: "Set ΔP above PEEP. Square pressure, decelerating flow. Peak = plateau. More even gas distribution.",
    peep: 12,
    pPlat: 26,
    pPeak: 26,
  },
  {
    key: "aprv",
    label: "APRV",
    full: "Airway Pressure Release",
    blurb: "Prolonged P_high recruits; brief release at P_low clears CO₂. Spontaneous breathing on plateau.",
    peep: 0,
    pPlat: 28,
    pPeak: 28,
    pHigh: 28,
    pLow: 5,
    tHigh: 4.5,
    tLow: 0.6,
  },
];

const ARDSVentModeComparisonDiagram = () => {
  const [playing, setPlaying] = useState(true);
  const [t, setT] = useState(0); // 0..1 across 8s sweep
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef<number | null>(null);

  useEffect(() => {
    if (!playing) {
      lastRef.current = null;
      return;
    }
    const tick = (now: number) => {
      if (lastRef.current == null) lastRef.current = now;
      const dt = (now - lastRef.current) / 1000;
      lastRef.current = now;
      setT((prev) => (prev + dt / 8) % 1); // 8s loop
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [playing]);

  return (
    <div className="rounded-xl border border-border bg-card p-4 my-6">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Ventilator Modes in ARDS — VCV vs PCV vs APRV
          </h3>
          <p className="text-xs text-muted-foreground">
            Synchronised pressure–time traces. Annotations show PEEP, plateau and driving pressure (ΔP).
          </p>
        </div>
        <button
          onClick={() => setPlaying((p) => !p)}
          className="px-3 py-1.5 text-xs font-medium rounded-md border border-border bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
        >
          {playing ? "❚❚ Pause" : "▶ Play"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {MODES.map((m) => (
          <ModePanel key={m.key} mode={m} t={t} />
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
        <Legend swatch="hsl(var(--primary))" label="Pressure waveform" />
        <Legend swatch="hsl(var(--accent))" dashed label="Plateau / P_high reference" />
        <Legend swatch="hsl(var(--destructive))" dashed label="PEEP / P_low reference" />
      </div>

      <div className="mt-4 rounded-lg bg-secondary/40 border border-border p-3">
        <p className="text-xs font-semibold text-foreground mb-1">ARDS take-home</p>
        <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
          <li><strong>Driving pressure (ΔP = Pplat − PEEP)</strong> is the strongest mortality predictor (Amato 2015). Keep ≤ 15 cmH₂O.</li>
          <li><strong>VCV</strong>: guaranteed VT but watch peak overshoot — a high peak−plateau gap signals high resistance, not lung injury.</li>
          <li><strong>PCV</strong>: peak = plateau, decelerating flow improves distribution; VT varies with compliance — set alarms.</li>
          <li><strong>APRV</strong>: extended P_high recruits dorsal lung; very brief T_low (release ≈ 0.5–0.8 s) preserves auto-PEEP and clears CO₂.</li>
        </ul>
      </div>
    </div>
  );
};

/* ───── Per-mode panel ───── */
function ModePanel({ mode, t }: { mode: ModeDef; t: number }) {
  const W = 320;
  const H = 200;
  const PL = 40;
  const PR = 16;
  const PT = 28;
  const PB = 30;
  const plotW = W - PL - PR;
  const plotH = H - PT - PB;
  const yMax = 36;
  const yMin = 0;
  const yScale = (p: number) => PT + plotH - ((p - yMin) / (yMax - yMin)) * plotH;
  const xScale = (frac: number) => PL + frac * plotW;

  // Build waveform points across one normalised sweep [0..1]
  const points = buildWaveform(mode, 200);
  const pathD = points
    .map((pt, i) => `${i === 0 ? "M" : "L"} ${xScale(pt.x).toFixed(1)},${yScale(pt.y).toFixed(1)}`)
    .join(" ");

  // Playhead
  const xHead = xScale(t);
  // Sample current pressure at playhead
  const idx = Math.min(points.length - 1, Math.floor(t * points.length));
  const yHead = yScale(points[idx].y);

  const peep = mode.key === "aprv" ? (mode.pLow ?? 0) : mode.peep;
  const plat = mode.key === "aprv" ? (mode.pHigh ?? mode.pPlat) : mode.pPlat;
  const dp = plat - peep;

  return (
    <div className="rounded-lg border border-border bg-background/40 p-2">
      <div className="flex items-baseline justify-between mb-1">
        <p className="text-sm font-bold text-foreground">{mode.label}</p>
        <p className="text-[10px] text-muted-foreground">{mode.full}</p>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label={`${mode.full} pressure-time waveform`}>
        {/* Y grid */}
        {[0, 10, 20, 30].map((p) => (
          <g key={p}>
            <line
              x1={PL}
              x2={W - PR}
              y1={yScale(p)}
              y2={yScale(p)}
              stroke="hsl(var(--border))"
              strokeWidth={0.5}
              strokeDasharray={p === 0 ? "0" : "3 3"}
              opacity={0.7}
            />
            <text x={PL - 4} y={yScale(p) + 3} textAnchor="end" fontSize={8} fill="hsl(var(--muted-foreground))">
              {p}
            </text>
          </g>
        ))}
        <text
          x={10}
          y={PT + plotH / 2}
          textAnchor="middle"
          fontSize={9}
          fill="hsl(var(--foreground))"
          transform={`rotate(-90, 10, ${PT + plotH / 2})`}
        >
          P (cmH₂O)
        </text>

        {/* PEEP / P_low reference line */}
        <line
          x1={PL}
          x2={W - PR}
          y1={yScale(peep)}
          y2={yScale(peep)}
          stroke="hsl(var(--destructive))"
          strokeWidth={1}
          strokeDasharray="4 3"
          opacity={0.7}
        />
        <text x={W - PR + 2} y={yScale(peep) + 3} fontSize={8} fill="hsl(var(--destructive))" textAnchor="start">
          {mode.key === "aprv" ? "P_low" : "PEEP"} {peep}
        </text>

        {/* Plateau / P_high reference line */}
        <line
          x1={PL}
          x2={W - PR}
          y1={yScale(plat)}
          y2={yScale(plat)}
          stroke="hsl(var(--accent))"
          strokeWidth={1}
          strokeDasharray="4 3"
          opacity={0.7}
        />
        <text x={W - PR + 2} y={yScale(plat) + 3} fontSize={8} fill="hsl(var(--accent))" textAnchor="start">
          {mode.key === "aprv" ? "P_high" : "Pplat"} {plat}
        </text>

        {/* Driving pressure bracket on the left */}
        <line
          x1={PL - 14}
          x2={PL - 14}
          y1={yScale(peep)}
          y2={yScale(plat)}
          stroke="hsl(var(--foreground))"
          strokeWidth={1}
        />
        <line x1={PL - 18} x2={PL - 10} y1={yScale(peep)} y2={yScale(peep)} stroke="hsl(var(--foreground))" strokeWidth={1} />
        <line x1={PL - 18} x2={PL - 10} y1={yScale(plat)} y2={yScale(plat)} stroke="hsl(var(--foreground))" strokeWidth={1} />
        <text
          x={PL - 22}
          y={(yScale(peep) + yScale(plat)) / 2 + 3}
          textAnchor="middle"
          fontSize={9}
          fontWeight="bold"
          fill="hsl(var(--foreground))"
          transform={`rotate(-90, ${PL - 22}, ${(yScale(peep) + yScale(plat)) / 2 + 3})`}
        >
          ΔP {dp}
        </text>

        {/* Waveform */}
        <path d={pathD} fill="none" stroke="hsl(var(--primary))" strokeWidth={2} strokeLinejoin="round" />

        {/* Playhead */}
        <line x1={xHead} x2={xHead} y1={PT} y2={PT + plotH} stroke="hsl(var(--foreground))" strokeWidth={0.75} opacity={0.4} />
        <circle cx={xHead} cy={yHead} r={3.5} fill="hsl(var(--primary))" stroke="hsl(var(--card))" strokeWidth={1} />

        {/* X axis */}
        <line x1={PL} y1={PT + plotH} x2={W - PR} y2={PT + plotH} stroke="hsl(var(--foreground))" strokeWidth={1} />
        <text x={PL + plotW / 2} y={H - 6} textAnchor="middle" fontSize={9} fill="hsl(var(--muted-foreground))">
          Time (s)
        </text>

        {/* Mode-specific feature labels */}
        {mode.key === "vcv" && (
          <>
            {/* Peak overshoot annotation */}
            <text x={xScale(0.18)} y={yScale(mode.pPeak) - 4} fontSize={8} fill="hsl(var(--primary))" textAnchor="middle">
              Ppeak {mode.pPeak}
            </text>
          </>
        )}
        {mode.key === "aprv" && (
          <text x={xScale(0.45)} y={yScale(mode.pHigh ?? 28) - 4} fontSize={8} fill="hsl(var(--muted-foreground))" textAnchor="middle" fontStyle="italic">
            spont. breaths
          </text>
        )}
      </svg>

      <p className="text-[11px] text-muted-foreground mt-1 leading-snug">{mode.blurb}</p>
    </div>
  );
}

/* ───── Waveform builders (normalised x ∈ [0,1]) ───── */
function buildWaveform(mode: ModeDef, n: number): { x: number; y: number }[] {
  const pts: { x: number; y: number }[] = [];
  if (mode.key === "vcv") {
    // 2 breaths across [0,1]; each breath: rise (resistive overshoot) → linear to plateau → drop to PEEP → expiratory decay
    const breaths = 2;
    for (let i = 0; i <= n; i++) {
      const x = i / n;
      const phase = (x * breaths) % 1;
      let p: number;
      if (phase < 0.05) {
        // rise to peak
        p = mode.peep + (mode.pPeak - mode.peep) * (phase / 0.05);
      } else if (phase < 0.45) {
        // linear decline to plateau across inspiration (constant flow → resistive component falls as flow constant; simplification)
        const f = (phase - 0.05) / 0.4;
        p = mode.pPeak - (mode.pPeak - mode.pPlat) * f;
      } else if (phase < 0.5) {
        // drop to PEEP
        const f = (phase - 0.45) / 0.05;
        p = mode.pPlat - (mode.pPlat - mode.peep) * f;
      } else {
        // expiratory baseline at PEEP
        p = mode.peep;
      }
      pts.push({ x, y: p });
    }
  } else if (mode.key === "pcv") {
    // 2 breaths: square pressure plateau at pPlat, drop to PEEP
    const breaths = 2;
    for (let i = 0; i <= n; i++) {
      const x = i / n;
      const phase = (x * breaths) % 1;
      let p: number;
      if (phase < 0.03) {
        p = mode.peep + (mode.pPlat - mode.peep) * (phase / 0.03);
      } else if (phase < 0.45) {
        p = mode.pPlat;
      } else if (phase < 0.48) {
        const f = (phase - 0.45) / 0.03;
        p = mode.pPlat - (mode.pPlat - mode.peep) * f;
      } else {
        p = mode.peep;
      }
      pts.push({ x, y: p });
    }
  } else {
    // APRV: long P_high with brief T_low release. ~1.5 cycles over the sweep
    const tHigh = mode.tHigh ?? 4.5;
    const tLow = mode.tLow ?? 0.6;
    const cycle = tHigh + tLow;
    const totalT = cycle * 1.6;
    const pHigh = mode.pHigh ?? 28;
    const pLow = mode.pLow ?? 5;
    for (let i = 0; i <= n; i++) {
      const x = i / n;
      const tAbs = x * totalT;
      const tInCycle = tAbs % cycle;
      let p: number;
      if (tInCycle < 0.1) {
        p = pLow + (pHigh - pLow) * (tInCycle / 0.1);
      } else if (tInCycle < tHigh) {
        // P_high plateau with small spontaneous ripples
        const ripple = Math.sin((tInCycle - 0.1) * 4) * 1.2;
        p = pHigh + ripple;
      } else if (tInCycle < tHigh + 0.08) {
        const f = (tInCycle - tHigh) / 0.08;
        p = pHigh - (pHigh - pLow) * f;
      } else {
        p = pLow;
      }
      pts.push({ x, y: p });
    }
  }
  return pts;
}

function Legend({ swatch, label, dashed }: { swatch: string; label: string; dashed?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <svg width={28} height={8}>
        <line
          x1={0}
          x2={28}
          y1={4}
          y2={4}
          stroke={swatch}
          strokeWidth={2}
          strokeDasharray={dashed ? "4 3" : "0"}
        />
      </svg>
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}

export default ARDSVentModeComparisonDiagram;
