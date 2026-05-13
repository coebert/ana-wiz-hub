import { useMemo, useState } from "react";

type State = "baseline" | "shock" | "iabp" | "impella" | "ecmo" | "lvad";

interface LoopParams {
  label: string;
  shortLabel: string;
  color: string;
  description: string;
  EDV: number;       // mL
  ESV: number;       // mL
  Pmax: number;      // mmHg, peak LV systolic
  Pdia_ao: number;   // diastolic aortic (afterload floor for ejection)
  Ees: number;       // end-systolic elastance slope (mmHg/mL) — pivots through V0
  V0: number;        // x-intercept of ESPVR
  EDPVR_a: number;   // EDPVR exponential coefficient
  EDPVR_b: number;
}

// EDPVR: P = a*(exp(b*(V-V0_ed)) - 1)
const STATES: Record<State, LoopParams> = {
  baseline: {
    label: "Baseline LV",
    shortLabel: "Baseline",
    color: "hsl(215 25% 25%)",
    description: "Normal: EDV ~120, ESV ~50, SV ~70, EF 58%, peak P 120, EDP 8.",
    EDV: 120, ESV: 50, Pmax: 120, Pdia_ao: 80,
    Ees: 2.3, V0: 15,
    EDPVR_a: 0.5, EDPVR_b: 0.04,
  },
  shock: {
    label: "Cardiogenic Shock",
    shortLabel: "Shock",
    color: "hsl(0 70% 50%)",
    description: "Failing LV: contractility collapses (Ees ↓), LV dilates (EDV ↑↑), ESV ↑↑, SV ↓, EF <25%, EDP ↑ (pulmonary oedema). Stroke work falls; PVA dominated by potential energy → low mechanical efficiency.",
    EDV: 180, ESV: 150, Pmax: 90, Pdia_ao: 55,
    Ees: 0.6, V0: 20,
    EDPVR_a: 0.5, EDPVR_b: 0.045,
  },
  iabp: {
    label: "Shock + IABP",
    shortLabel: "IABP",
    color: "hsl(220 80% 55%)",
    description: "Modest help: diastolic balloon inflation augments coronary perfusion; pre-systolic deflation drops afterload (Pdia ↓ ~10–15 mmHg). Loop shifts slightly leftward — small ↓ ESV, small ↑ SV (~10–20%). EDV barely changes. PVA modestly reduced.",
    EDV: 175, ESV: 135, Pmax: 85, Pdia_ao: 45,
    Ees: 0.6, V0: 20,
    EDPVR_a: 0.5, EDPVR_b: 0.045,
  },
  impella: {
    label: "Shock + Impella",
    shortLabel: "Impella",
    color: "hsl(280 60% 55%)",
    description: "Direct LV unloading: continuous blood removal from LV → LV cavity shrinks throughout cycle. Loop becomes narrow and shifts leftward. EDV ↓, ESV ↓, EDP ↓ markedly. Native LV stroke work falls (loop area shrinks) but total CO is augmented by the pump output. PVA ↓↓ → ↓ MVO₂.",
    EDV: 130, ESV: 105, Pmax: 80, Pdia_ao: 65,
    Ees: 0.6, V0: 20,
    EDPVR_a: 0.5, EDPVR_b: 0.045,
  },
  ecmo: {
    label: "Shock + VA-ECMO",
    shortLabel: "VA-ECMO",
    color: "hsl(35 90% 50%)",
    description: "Peripheral retrograde aortic flow ↑ afterload markedly. LV may fail to open the AV → loop becomes a vertical isovolumetric line (no ejection, EDV = ESV). LVEDP rises → LV distension and pulmonary oedema. Adjunct unloading (Impella, IABP, atrial septostomy) often required.",
    EDV: 195, ESV: 195, Pmax: 70, Pdia_ao: 75,
    Ees: 0.6, V0: 20,
    EDPVR_a: 0.5, EDPVR_b: 0.05,
  },
  lvad: {
    label: "Durable LVAD (continuous flow)",
    shortLabel: "LVAD",
    color: "hsl(160 60% 40%)",
    description: "Maximal LV unloading: continuous LV→aorta drainage. LV barely fills; native AV may stay closed for several beats → loop collapses to a small triangle or vertical line at low volume. EDV ↓↓, EDP ↓↓, native stroke work ≈ 0. Total CO supplied by the pump (4–10 L/min).",
    EDV: 95, ESV: 80, Pmax: 70, Pdia_ao: 75,
    Ees: 0.6, V0: 20,
    EDPVR_a: 0.5, EDPVR_b: 0.045,
  },
};

const W = 620;
const H = 440;
const PAD = { top: 40, right: 40, bottom: 60, left: 70 };
const PLOT_W = W - PAD.left - PAD.right;
const PLOT_H = H - PAD.top - PAD.bottom;
const V_MAX = 250;
const P_MAX = 180;

const xOf = (v: number) => PAD.left + (v / V_MAX) * PLOT_W;
const yOf = (p: number) => PAD.top + PLOT_H - (p / P_MAX) * PLOT_H;

// Build a PV loop path. 4 phases:
// 1. Filling: ESV → EDV along EDPVR (low pressure)
// 2. Isovolumetric contraction: at EDV, P rises from EDP → Pdia_ao
// 3. Ejection: EDV → ESV along a curve up to Pmax then down to ESP (on ESPVR)
// 4. Isovolumetric relaxation: at ESV, P falls from ESP → EDP_at_ESV
function edpvrP(v: number, p: LoopParams) {
  return p.EDPVR_a * (Math.exp(p.EDPVR_b * Math.max(0, v - 20)) - 1);
}
function espvrP(v: number, p: LoopParams) {
  return Math.max(0, p.Ees * (v - p.V0));
}

function buildLoop(p: LoopParams) {
  const pts: [number, number][] = [];
  const SV = p.EDV - p.ESV;
  const EDP = edpvrP(p.EDV, p);
  const ESP = Math.min(p.Pmax, espvrP(p.ESV, p));

  // If ESV >= EDV (e.g. ECMO failure to eject), draw isovolumetric line only
  if (SV <= 1) {
    // single vertical line at EDV between EDP and Pmax
    pts.push([p.EDV, EDP]);
    pts.push([p.EDV, p.Pmax]);
    pts.push([p.EDV, EDP]);
    return pts;
  }

  // 1. Filling: ESV → EDV along EDPVR
  const fillSteps = 20;
  for (let i = 0; i <= fillSteps; i++) {
    const v = p.ESV + (SV * i) / fillSteps;
    pts.push([v, edpvrP(v, p)]);
  }
  // 2. Isovolumetric contraction at EDV: EDP → Pdia_ao
  const isoCSteps = 8;
  for (let i = 1; i <= isoCSteps; i++) {
    const pr = EDP + (p.Pdia_ao - EDP) * (i / isoCSteps);
    pts.push([p.EDV, pr]);
  }
  // 3. Ejection: EDV → ESV. Pressure rises to Pmax (around mid-ejection) then falls to ESP.
  const ejSteps = 30;
  for (let i = 1; i <= ejSteps; i++) {
    const t = i / ejSteps;
    const v = p.EDV - SV * t;
    // Sinusoidal: P = Pdia_ao + (Pmax - Pdia_ao) * sin(pi * t_adj)
    const arc = Math.sin(Math.PI * t);
    const pr = p.Pdia_ao + (p.Pmax - p.Pdia_ao) * arc * 0.7 + (ESP - p.Pdia_ao) * t;
    pts.push([v, Math.max(ESP, pr)]);
  }
  // 4. Isovolumetric relaxation at ESV: ESP → EDP (at ESV)
  const isoRSteps = 8;
  const EDP_at_ESV = edpvrP(p.ESV, p);
  for (let i = 1; i <= isoRSteps; i++) {
    const pr = ESP + (EDP_at_ESV - ESP) * (i / isoRSteps);
    pts.push([p.ESV, pr]);
  }
  return pts;
}

function pathFromPts(pts: [number, number][]) {
  return pts.map((pt, i) => `${i === 0 ? "M" : "L"}${xOf(pt[0]).toFixed(1)} ${yOf(pt[1]).toFixed(1)}`).join(" ") + " Z";
}

// Approximate stroke work (loop area, mmHg·mL) using shoelace
function loopArea(pts: [number, number][]) {
  let area = 0;
  for (let i = 0; i < pts.length; i++) {
    const j = (i + 1) % pts.length;
    area += pts[i][0] * pts[j][1] - pts[j][0] * pts[i][1];
  }
  return Math.abs(area) / 2;
}

// Approximate PE (potential energy) triangle: between ESPVR, EDPVR and isovolumetric line at ESV
function potentialEnergy(p: LoopParams) {
  const ESP = Math.min(p.Pmax, espvrP(p.ESV, p));
  // Triangle with vertices: (V0, 0), (ESV, ESP), (ESV, EDP_at_ESV)
  const EDP_at_ESV = edpvrP(p.ESV, p);
  const base = p.ESV - p.V0;
  const height = ESP - EDP_at_ESV;
  return 0.5 * base * height;
}

const ALL_STATES: State[] = ["baseline", "shock", "iabp", "impella", "ecmo", "lvad"];

export const MCSPressureVolumeLoopDiagram = () => {
  const [active, setActive] = useState<Set<State>>(new Set(["baseline", "shock"]));
  const [highlight, setHighlight] = useState<State>("shock");

  const toggle = (s: State) => {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s); else next.add(s);
      return next;
    });
    setHighlight(s);
  };

  // ESPVR baseline reference line
  const espvrPath = useMemo(() => {
    const p = STATES.baseline;
    const v0 = p.V0;
    const v1 = 220;
    return `M${xOf(v0)} ${yOf(0)} L${xOf(v1)} ${yOf(espvrP(v1, p))}`;
  }, []);
  const espvrShockPath = useMemo(() => {
    const p = STATES.shock;
    const v0 = p.V0;
    const v1 = 220;
    return `M${xOf(v0)} ${yOf(0)} L${xOf(v1)} ${yOf(espvrP(v1, p))}`;
  }, []);
  const edpvrPath = useMemo(() => {
    const p = STATES.shock;
    let d = "";
    for (let v = 20; v <= 220; v += 4) {
      d += `${v === 20 ? "M" : "L"}${xOf(v).toFixed(1)} ${yOf(edpvrP(v, p)).toFixed(1)} `;
    }
    return d;
  }, []);

  const loops = useMemo(() => {
    const m: Record<string, { path: string; area: number; pe: number; pts: [number, number][] }> = {};
    for (const s of ALL_STATES) {
      const pts = buildLoop(STATES[s]);
      m[s] = {
        path: pathFromPts(pts),
        area: loopArea(pts),
        pe: potentialEnergy(STATES[s]),
        pts,
      };
    }
    return m;
  }, []);

  const baselineSW = loops.baseline.area;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-3 my-6">
      <div className="text-center">
        <h3 className="text-lg font-serif font-bold text-foreground">
          Pressure–Volume Loops: MCS Device Effects
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Toggle states to overlay. Click a button again to highlight that state's metrics.
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5 justify-center">
        {ALL_STATES.map((s) => {
          const isActive = active.has(s);
          const isHL = highlight === s;
          return (
            <button
              key={s}
              onClick={() => toggle(s)}
              className={`px-2.5 py-1 rounded text-xs font-medium border transition-colors ${
                isActive
                  ? "border-foreground/40 text-foreground"
                  : "border-border text-muted-foreground hover:bg-secondary/60"
              } ${isHL && isActive ? "ring-2 ring-offset-1 ring-foreground/30" : ""}`}
              style={isActive ? { backgroundColor: STATES[s].color + "22", borderColor: STATES[s].color } : {}}
            >
              <span className="inline-block w-2.5 h-2.5 rounded-sm mr-1.5 align-middle" style={{ backgroundColor: STATES[s].color }} />
              {STATES[s].shortLabel}
            </button>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-[2fr_1fr] gap-3">
        <div className="bg-card rounded-lg border border-border p-3">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
            {/* grid */}
            {[0, 40, 80, 120, 160].map((p) => (
              <g key={`gp${p}`}>
                <line x1={PAD.left} y1={yOf(p)} x2={W - PAD.right} y2={yOf(p)} stroke="hsl(210 20% 92%)" />
                <text x={PAD.left - 6} y={yOf(p) + 3} textAnchor="end" fontSize="10" className="fill-muted-foreground">{p}</text>
              </g>
            ))}
            {[0, 50, 100, 150, 200, 250].map((v) => (
              <g key={`gv${v}`}>
                <line x1={xOf(v)} y1={PAD.top} x2={xOf(v)} y2={PAD.top + PLOT_H} stroke="hsl(210 20% 95%)" />
                <text x={xOf(v)} y={PAD.top + PLOT_H + 14} textAnchor="middle" fontSize="10" className="fill-muted-foreground">{v}</text>
              </g>
            ))}

            {/* axes */}
            <line x1={PAD.left} y1={PAD.top} x2={PAD.left} y2={PAD.top + PLOT_H} stroke="hsl(215 25% 15%)" strokeWidth="1.5" />
            <line x1={PAD.left} y1={PAD.top + PLOT_H} x2={W - PAD.right} y2={PAD.top + PLOT_H} stroke="hsl(215 25% 15%)" strokeWidth="1.5" />
            <text x={PAD.left + PLOT_W / 2} y={H - 10} textAnchor="middle" fontSize="11" className="fill-foreground font-medium">LV Volume (mL)</text>
            <text x={20} y={PAD.top + PLOT_H / 2} textAnchor="middle" transform={`rotate(-90 20 ${PAD.top + PLOT_H / 2})`} fontSize="11" className="fill-foreground font-medium">
              LV Pressure (mmHg)
            </text>

            {/* ESPVR (baseline) — dashed grey */}
            <path d={espvrPath} stroke="hsl(215 25% 40%)" strokeWidth="1" strokeDasharray="4 3" fill="none" />
            <text x={W - PAD.right - 5} y={yOf(espvrP(240, STATES.baseline)) - 5} textAnchor="end" fontSize="9" className="fill-muted-foreground">ESPVR (normal)</text>

            {/* ESPVR (shock) — dashed red */}
            {(active.has("shock") || active.has("iabp") || active.has("impella") || active.has("ecmo") || active.has("lvad")) && (
              <>
                <path d={espvrShockPath} stroke="hsl(0 70% 50%)" strokeWidth="1" strokeDasharray="4 3" fill="none" opacity="0.6" />
                <text x={W - PAD.right - 5} y={yOf(espvrP(240, STATES.shock)) - 5} textAnchor="end" fontSize="9" className="fill-[hsl(0_70%_50%)]" opacity="0.8">ESPVR (shock)</text>
              </>
            )}

            {/* EDPVR */}
            <path d={edpvrPath} stroke="hsl(215 25% 40%)" strokeWidth="1" strokeDasharray="2 2" fill="none" />
            <text x={xOf(230)} y={yOf(edpvrP(230, STATES.shock)) - 4} fontSize="9" className="fill-muted-foreground">EDPVR</text>

            {/* Loops */}
            {ALL_STATES.filter((s) => active.has(s)).map((s) => {
              const isHL = highlight === s;
              return (
                <path
                  key={s}
                  d={loops[s].path}
                  stroke={STATES[s].color}
                  strokeWidth={isHL ? 2.5 : 1.8}
                  fill={STATES[s].color}
                  fillOpacity={isHL ? 0.18 : 0.08}
                  opacity={isHL ? 1 : 0.85}
                />
              );
            })}
          </svg>
        </div>

        {/* Stroke work / PVA bar chart */}
        <div className="bg-card rounded-lg border border-border p-3 flex flex-col">
          <div className="text-center mb-1">
            <p className="text-xs font-semibold text-foreground">Stroke Work + PE = PVA</p>
            <p className="text-[10px] text-muted-foreground">PVA ∝ MVO₂ per beat</p>
          </div>
          {(() => {
            const activeStates = ALL_STATES.filter((s) => active.has(s));
            const maxPVA = Math.max(
              ...ALL_STATES.map((s) => loops[s].area + loops[s].pe),
              1,
            );
            const BW = 360;
            const BH = 320;
            const BPAD = { top: 24, right: 14, bottom: 60, left: 44 };
            const PW = BW - BPAD.left - BPAD.right;
            const PH = BH - BPAD.top - BPAD.bottom;
            const n = Math.max(activeStates.length, 1);
            const bandW = PW / n;
            const barW = Math.min(38, bandW * 0.65);
            const yScale = (val: number) => BPAD.top + PH - (val / maxPVA) * PH;
            const ticks = [0, 0.25, 0.5, 0.75, 1].map((f) => Math.round((f * maxPVA) / 1000) * 1000);
            return (
              <svg viewBox={`0 0 ${BW} ${BH}`} className="w-full flex-1">
                {/* gridlines */}
                {ticks.map((t) => (
                  <g key={t}>
                    <line x1={BPAD.left} y1={yScale(t)} x2={BW - BPAD.right} y2={yScale(t)} stroke="hsl(210 20% 92%)" />
                    <text x={BPAD.left - 4} y={yScale(t) + 3} textAnchor="end" fontSize="9" className="fill-muted-foreground">{(t / 1000).toFixed(1)}k</text>
                  </g>
                ))}
                {/* axes */}
                <line x1={BPAD.left} y1={BPAD.top} x2={BPAD.left} y2={BPAD.top + PH} stroke="hsl(215 25% 15%)" strokeWidth="1" />
                <line x1={BPAD.left} y1={BPAD.top + PH} x2={BW - BPAD.right} y2={BPAD.top + PH} stroke="hsl(215 25% 15%)" strokeWidth="1" />
                <text x={12} y={BPAD.top + PH / 2} textAnchor="middle" transform={`rotate(-90 12 ${BPAD.top + PH / 2})`} fontSize="10" className="fill-foreground font-medium">mmHg·mL</text>

                {/* Baseline reference line */}
                {active.has("baseline") && (
                  <>
                    <line
                      x1={BPAD.left}
                      x2={BW - BPAD.right}
                      y1={yScale(loops.baseline.area + loops.baseline.pe)}
                      y2={yScale(loops.baseline.area + loops.baseline.pe)}
                      stroke="hsl(215 25% 40%)"
                      strokeDasharray="3 3"
                      strokeWidth="0.75"
                      opacity="0.7"
                    />
                    <text x={BW - BPAD.right - 2} y={yScale(loops.baseline.area + loops.baseline.pe) - 3} textAnchor="end" fontSize="8" className="fill-muted-foreground">baseline PVA</text>
                  </>
                )}

                {activeStates.map((s, i) => {
                  const ew = loops[s].area;
                  const pe = loops[s].pe;
                  const pva = ew + pe;
                  const cx = BPAD.left + bandW * (i + 0.5);
                  const x = cx - barW / 2;
                  const yPVA = yScale(pva);
                  const yEW = yScale(ew);
                  const peH = yEW - yPVA; // PE on top
                  const ewH = BPAD.top + PH - yEW;
                  const isHL = highlight === s;
                  return (
                    <g key={s} opacity={isHL ? 1 : 0.9}>
                      {/* PE (top, lighter) */}
                      <rect x={x} y={yPVA} width={barW} height={Math.max(0, peH)} fill={STATES[s].color} fillOpacity="0.35" stroke={STATES[s].color} strokeWidth={isHL ? 1.5 : 0.8} />
                      {/* EW (bottom, darker) */}
                      <rect x={x} y={yEW} width={barW} height={Math.max(0, ewH)} fill={STATES[s].color} fillOpacity="0.85" stroke={STATES[s].color} strokeWidth={isHL ? 1.5 : 0.8} />
                      {/* PVA value above bar */}
                      <text x={cx} y={yPVA - 4} textAnchor="middle" fontSize="9" className="fill-foreground" fontWeight={isHL ? 700 : 500}>
                        {Math.round(pva).toLocaleString()}
                      </text>
                      {/* Δ vs baseline */}
                      {s !== "baseline" && (
                        <text x={cx} y={BPAD.top + PH + 14} textAnchor="middle" fontSize="8" className="fill-muted-foreground">
                          {pva > baselineSW + loops.baseline.pe ? "↑" : "↓"}
                          {Math.round(((pva - (loops.baseline.area + loops.baseline.pe)) / (loops.baseline.area + loops.baseline.pe)) * 100)}%
                        </text>
                      )}
                      {/* state label, rotated for fit */}
                      <text
                        x={cx}
                        y={BPAD.top + PH + 28}
                        textAnchor="end"
                        fontSize="9"
                        fill={STATES[s].color}
                        fontWeight={isHL ? 700 : 500}
                        transform={`rotate(-35 ${cx} ${BPAD.top + PH + 28})`}
                      >
                        {STATES[s].shortLabel}
                      </text>
                    </g>
                  );
                })}

                {activeStates.length === 0 && (
                  <text x={BW / 2} y={BPAD.top + PH / 2} textAnchor="middle" fontSize="10" className="fill-muted-foreground">Toggle a state to display</text>
                )}
              </svg>
            );
          })()}

          {/* Legend */}
          <div className="flex items-center justify-center gap-3 text-[10px] text-muted-foreground mt-1">
            <div className="flex items-center gap-1">
              <span className="inline-block w-3 h-3 rounded-sm bg-foreground/70" />
              <span>EW (loop area)</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="inline-block w-3 h-3 rounded-sm bg-foreground/30 border border-foreground/50" />
              <span>PE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Highlighted state description */}
      <div
        className="rounded-lg border p-3"
        style={{
          backgroundColor: STATES[highlight].color + "10",
          borderColor: STATES[highlight].color + "60",
        }}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ backgroundColor: STATES[highlight].color }} />
          <span className="font-semibold text-foreground text-sm">{STATES[highlight].label}</span>
        </div>
        <p className="text-xs text-foreground/85 leading-relaxed">{STATES[highlight].description}</p>
      </div>

      {/* Metrics table */}
      <div className="overflow-x-auto rounded-lg border border-border bg-card">
        <table className="w-full text-xs">
          <thead className="bg-muted/50">
            <tr className="border-b border-border">
              <th className="text-left p-2 font-semibold text-foreground">State</th>
              <th className="text-right p-2 font-semibold text-foreground">EDV</th>
              <th className="text-right p-2 font-semibold text-foreground">ESV</th>
              <th className="text-right p-2 font-semibold text-foreground">SV</th>
              <th className="text-right p-2 font-semibold text-foreground">EF</th>
              <th className="text-right p-2 font-semibold text-foreground">Pmax</th>
              <th className="text-right p-2 font-semibold text-foreground">SW</th>
              <th className="text-right p-2 font-semibold text-foreground">PE</th>
              <th className="text-right p-2 font-semibold text-foreground">PVA</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border text-muted-foreground">
            {ALL_STATES.map((s) => {
              const p = STATES[s];
              const SV = Math.max(0, p.EDV - p.ESV);
              const EF = p.EDV > 0 ? Math.round((SV / p.EDV) * 100) : 0;
              const SW = loops[s].area;
              const PE = loops[s].pe;
              const PVA = SW + PE;
              const isHL = highlight === s;
              const swPct = baselineSW > 0 ? Math.round((SW / baselineSW) * 100) : 0;
              return (
                <tr key={s} className={isHL ? "bg-muted/40" : ""}>
                  <td className="p-2 font-medium text-foreground flex items-center gap-1.5">
                    <span className="inline-block w-2 h-2 rounded-sm" style={{ backgroundColor: p.color }} />
                    {p.shortLabel}
                  </td>
                  <td className="p-2 text-right">{p.EDV}</td>
                  <td className="p-2 text-right">{p.ESV}</td>
                  <td className="p-2 text-right">{SV}</td>
                  <td className="p-2 text-right">{EF}%</td>
                  <td className="p-2 text-right">{p.Pmax}</td>
                  <td className="p-2 text-right">{Math.round(SW)} <span className="text-[10px] text-muted-foreground">({swPct}%)</span></td>
                  <td className="p-2 text-right">{Math.round(PE)}</td>
                  <td className="p-2 text-right font-semibold text-foreground">{Math.round(PVA)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="px-3 py-2 text-[11px] text-muted-foreground border-t border-border">
          Volumes mL · Pressures mmHg · SW (stroke work) and PE (potential energy) in mmHg·mL · PVA = SW + PE ∝ MVO₂.
          Percentages compare stroke work to baseline.
        </div>
      </div>
    </div>
  );
};

export default MCSPressureVolumeLoopDiagram;
