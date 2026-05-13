import { useState, useEffect, useMemo, useRef } from "react";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DiagramFigure } from "./_shared/DiagramFigure";

type ModelName = "marsh" | "schnider";

interface PKParams {
  V1: number; V2: number; V3: number;
  k10: number; k12: number; k21: number; k13: number; k31: number;
  ke0: number;
}

// Marsh model (weight-based)
const marshParams = (weight: number): PKParams => {
  const V1 = 0.228 * weight;
  const V2 = 0.463 * weight;
  const V3 = 2.893 * weight;
  return {
    V1, V2, V3,
    k10: 0.119,
    k12: 0.112,
    k21: 0.055,
    k13: 0.0419,
    k31: 0.0033,
    ke0: 0.26, // modified Marsh
  };
};

// Schnider model (age, weight, height, LBM)
const schniderParams = (weight: number, age: number, height: number, sex: "M" | "F"): PKParams => {
  // James equation for LBM
  const lbm = sex === "M"
    ? 1.1 * weight - 128 * (weight / height) ** 2
    : 1.07 * weight - 148 * (weight / height) ** 2;
  const V1 = 4.27;
  const V2 = 18.9 - 0.391 * (age - 53);
  const V3 = 238;
  const Cl1 = 1.89 + 0.0456 * (weight - 77) - 0.0681 * (lbm - 59) + 0.0264 * (height - 177);
  const Cl2 = 1.29 - 0.024 * (age - 53);
  const Cl3 = 0.836;
  return {
    V1, V2, V3,
    k10: Cl1 / V1,
    k12: Cl2 / V1,
    k21: Cl2 / V2,
    k13: Cl3 / V1,
    k31: Cl3 / V3,
    ke0: 0.456,
  };
};

// Simulate 3-compartment + effect site over time
// dt in minutes; infusion in mg/min; bolus in mg given at t=0
function simulate(
  params: PKParams,
  bolusMg: number,
  infusionMgPerMin: number,
  durationMin: number,
  dt = 0.05,
) {
  const steps = Math.floor(durationMin / dt);
  const A1 = new Float32Array(steps + 1);
  const A2 = new Float32Array(steps + 1);
  const A3 = new Float32Array(steps + 1);
  const Ce = new Float32Array(steps + 1);
  A1[0] = bolusMg;
  for (let i = 0; i < steps; i++) {
    const c1 = A1[i] / params.V1;
    const dA1 = infusionMgPerMin
      - params.k10 * A1[i]
      - params.k12 * A1[i] + params.k21 * A2[i]
      - params.k13 * A1[i] + params.k31 * A3[i];
    const dA2 = params.k12 * A1[i] - params.k21 * A2[i];
    const dA3 = params.k13 * A1[i] - params.k31 * A3[i];
    const dCe = params.ke0 * (c1 - Ce[i]);
    A1[i + 1] = A1[i] + dA1 * dt;
    A2[i + 1] = A2[i] + dA2 * dt;
    A3[i + 1] = A3[i] + dA3 * dt;
    Ce[i + 1] = Ce[i] + dCe * dt;
  }
  // plasma concentration μg/mL = mg/L = (mg)/(L)
  const Cp = new Float32Array(steps + 1);
  for (let i = 0; i <= steps; i++) Cp[i] = A1[i] / params.V1;
  return { Cp, Ce, dt, steps };
}

export const PropofolTCISimulatorDiagram = () => {
  const [model, setModel] = useState<ModelName>("schnider");
  const [weight, setWeight] = useState(70);
  const [age, setAge] = useState(50);
  const [height, setHeight] = useState(170);
  const [sex, setSex] = useState<"M" | "F">("M");
  const [bolusMgPerKg, setBolusMgPerKg] = useState(2);
  const [infusionMgPerKgPerHr, setInfusionMgPerKgPerHr] = useState(8);
  const [durationMin, setDurationMin] = useState(60);
  const [playT, setPlayT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const rafRef = useRef<number | null>(null);

  const params = useMemo(() => {
    return model === "marsh"
      ? marshParams(weight)
      : schniderParams(weight, age, height, sex);
  }, [model, weight, age, height, sex]);

  const sim = useMemo(() => {
    const bolusMg = bolusMgPerKg * weight;
    const infusionMgPerMin = (infusionMgPerKgPerHr * weight) / 60;
    return simulate(params, bolusMg, infusionMgPerMin, durationMin);
  }, [params, bolusMgPerKg, infusionMgPerKgPerHr, durationMin, weight]);

  // animation
  useEffect(() => {
    if (!playing) return;
    let last = performance.now();
    const tick = (now: number) => {
      const elapsed = (now - last) / 1000;
      last = now;
      setPlayT((t) => {
        const next = t + elapsed * 30; // 30 sim-minutes / sec
        if (next >= durationMin) {
          setPlaying(false);
          return durationMin;
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [playing, durationMin]);

  const width = 560;
  const height_ = 280;
  const pad = { top: 20, right: 20, bottom: 40, left: 50 };
  const plotW = width - pad.left - pad.right;
  const plotH = height_ - pad.top - pad.bottom;
  const maxC = 8; // μg/mL y-axis

  const xOf = (t: number) => pad.left + (t / durationMin) * plotW;
  const yOf = (c: number) => pad.top + plotH - Math.min(c, maxC) / maxC * plotH;

  const buildPath = (arr: Float32Array) => {
    let d = "";
    const stride = Math.max(1, Math.floor(arr.length / 300));
    for (let i = 0; i < arr.length; i += stride) {
      const t = i * sim.dt;
      d += `${i === 0 ? "M" : "L"}${xOf(t).toFixed(1)} ${yOf(arr[i]).toFixed(1)} `;
    }
    return d;
  };

  const cpPath = useMemo(() => buildPath(sim.Cp), [sim, durationMin]);
  const cePath = useMemo(() => buildPath(sim.Ce), [sim, durationMin]);

  const idxAtPlay = Math.min(sim.Cp.length - 1, Math.floor(playT / sim.dt));
  const currentCp = sim.Cp[idxAtPlay];
  const currentCe = sim.Ce[idxAtPlay];

  const peakCp = useMemo(() => Math.max(...Array.from(sim.Cp)), [sim]);
  const peakCe = useMemo(() => Math.max(...Array.from(sim.Ce)), [sim]);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      <Tabs value={model} onValueChange={(v) => setModel(v as ModelName)}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="marsh">Marsh (weight-based)</TabsTrigger>
          <TabsTrigger value="schnider">Schnider (age, height, LBM)</TabsTrigger>
        </TabsList>

        <TabsContent value="marsh" className="text-xs text-muted-foreground mt-2">
          V1 = 0.228 × wt · k10 = 0.119 · ke0 = 0.26 (modified). Targets <em>plasma</em> concentration.
        </TabsContent>
        <TabsContent value="schnider" className="text-xs text-muted-foreground mt-2">
          V2 & Cl1 adjusted for age, weight, height, LBM (James). Smaller V1 (4.27 L) → larger initial plasma peak. Targets <em>effect-site</em>.
        </TabsContent>
      </Tabs>

      {/* Compartment schematic */}
      <div className="bg-card rounded-lg border border-border p-4">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <div className="flex flex-col items-center">
            <div className="w-16 h-12 rounded border-2 border-pharmacology bg-pharmacology/10 flex items-center justify-center text-xs font-semibold text-pharmacology">
              V1
            </div>
            <span className="text-[10px] text-muted-foreground mt-1">{params.V1.toFixed(1)} L</span>
          </div>
          <div className="flex flex-col items-center text-[10px] text-muted-foreground">
            <span>k12 {params.k12.toFixed(3)}→</span>
            <div className="w-10 h-px bg-border my-1" />
            <span>←k21 {params.k21.toFixed(3)}</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-12 rounded border-2 border-pharmacology/60 bg-pharmacology/5 flex items-center justify-center text-xs font-semibold text-pharmacology/80">
              V2
            </div>
            <span className="text-[10px] text-muted-foreground mt-1">{params.V2.toFixed(1)} L</span>
          </div>
          <div className="flex flex-col items-center text-[10px] text-muted-foreground">
            <span>k13 {params.k13.toFixed(4)}→</span>
            <div className="w-10 h-px bg-border my-1" />
            <span>←k31 {params.k31.toFixed(4)}</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-12 rounded border-2 border-pharmacology/40 bg-pharmacology/5 flex items-center justify-center text-xs font-semibold text-pharmacology/60">
              V3
            </div>
            <span className="text-[10px] text-muted-foreground mt-1">{params.V3.toFixed(1)} L</span>
          </div>
          <div className="flex flex-col items-center mx-2">
            <span className="text-[10px] text-muted-foreground">k10 {params.k10.toFixed(3)}</span>
            <span className="text-[10px] text-muted-foreground">↓ elim</span>
          </div>
          <div className="flex flex-col items-center border-l pl-3 ml-1 border-border">
            <div className="w-16 h-12 rounded border-2 border-clinical bg-clinical/10 flex items-center justify-center text-xs font-semibold text-clinical">
              Ce
            </div>
            <span className="text-[10px] text-muted-foreground mt-1">ke0 {params.ke0.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Plot */}
      <div className="bg-card rounded-lg border border-border p-4">
        <svg viewBox={`0 0 ${width} ${height_}`} className="w-full">
          {/* grid */}
          {[0, 2, 4, 6, 8].map((c) => (
            <g key={c}>
              <line x1={pad.left} y1={yOf(c)} x2={width - pad.right} y2={yOf(c)} stroke="hsl(210 20% 90%)" />
              <text x={pad.left - 6} y={yOf(c) + 3} textAnchor="end" fontSize="10" className="fill-muted-foreground">{c}</text>
            </g>
          ))}
          {[0, 0.25, 0.5, 0.75, 1].map((f) => {
            const x = pad.left + f * plotW;
            return (
    <DiagramFigure
      id="propofol-tci-simulator-diagram"
      title="Propofol tci simulator"
      description="Auto-generated wrapper for the Propofol tci simulator anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
                    <g key={f}>
                  <line x1={x} y1={pad.top} x2={x} y2={pad.top + plotH} stroke="hsl(210 20% 95%)" />
                  <text x={x} y={pad.top + plotH + 14} textAnchor="middle" fontSize="10" className="fill-muted-foreground">
                    {Math.round(f * durationMin)}
                  </text>
                </g>
    </DiagramFigure>
  );
          })}
          {/* axes */}
          <line x1={pad.left} y1={pad.top} x2={pad.left} y2={pad.top + plotH} stroke="hsl(215 25% 15%)" strokeWidth="1.5" />
          <line x1={pad.left} y1={pad.top + plotH} x2={width - pad.right} y2={pad.top + plotH} stroke="hsl(215 25% 15%)" strokeWidth="1.5" />
          <text x={width / 2} y={height_ - 4} textAnchor="middle" fontSize="11" className="fill-foreground font-medium">Time (min)</text>
          <text x={12} y={height_ / 2} textAnchor="middle" transform={`rotate(-90 12 ${height_ / 2})`} fontSize="11" className="fill-foreground font-medium">
            Conc (μg/mL)
          </text>

          {/* therapeutic window 2-6 μg/mL */}
          <rect x={pad.left} y={yOf(6)} width={plotW} height={yOf(2) - yOf(6)} fill="hsl(170 50% 40%)" opacity="0.06" />

          {/* curves */}
          <path d={cpPath} fill="none" stroke="hsl(0 70% 50%)" strokeWidth="2" />
          <path d={cePath} fill="none" stroke="hsl(220 70% 50%)" strokeWidth="2" strokeDasharray="0" />

          {/* play marker */}
          <line x1={xOf(playT)} y1={pad.top} x2={xOf(playT)} y2={pad.top + plotH} stroke="hsl(215 25% 30%)" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx={xOf(playT)} cy={yOf(currentCp)} r="4" fill="hsl(0 70% 50%)" />
          <circle cx={xOf(playT)} cy={yOf(currentCe)} r="4" fill="hsl(220 70% 50%)" />
        </svg>

        <div className="flex flex-wrap items-center gap-4 text-xs mt-2">
          <div className="flex items-center gap-1.5"><span className="inline-block w-3 h-0.5 bg-[hsl(0_70%_50%)]" /> Cp (plasma)</div>
          <div className="flex items-center gap-1.5"><span className="inline-block w-3 h-0.5 bg-[hsl(220_70%_50%)]" /> Ce (effect-site)</div>
          <div className="flex items-center gap-1.5"><span className="inline-block w-3 h-2 bg-pharmacology/10 border border-pharmacology/30" /> Therapeutic window 2–6 μg/mL</div>
        </div>
      </div>

      {/* Live readouts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
        <div className="bg-secondary/40 rounded p-2 border border-border">
          <div className="text-[10px] text-muted-foreground uppercase">t = {playT.toFixed(1)} min</div>
          <div className="text-xs font-medium text-foreground">marker</div>
        </div>
        <div className="bg-secondary/40 rounded p-2 border border-border">
          <div className="text-[10px] text-muted-foreground uppercase">Cp now</div>
          <div className="text-sm font-bold text-[hsl(0_70%_50%)]">{currentCp.toFixed(2)} μg/mL</div>
        </div>
        <div className="bg-secondary/40 rounded p-2 border border-border">
          <div className="text-[10px] text-muted-foreground uppercase">Ce now</div>
          <div className="text-sm font-bold text-[hsl(220_70%_50%)]">{currentCe.toFixed(2)} μg/mL</div>
        </div>
        <div className="bg-secondary/40 rounded p-2 border border-border">
          <div className="text-[10px] text-muted-foreground uppercase">Peak Cp / Ce</div>
          <div className="text-xs font-medium text-foreground">{peakCp.toFixed(1)} / {peakCe.toFixed(1)}</div>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => { setPlayT(0); setPlaying(true); }}
          className="px-3 py-1.5 rounded bg-pharmacology text-white text-sm font-medium hover:bg-pharmacology/90"
        >
          ▶ Play
        </button>
        <button
          onClick={() => setPlaying(false)}
          className="px-3 py-1.5 rounded border border-border text-sm font-medium text-foreground hover:bg-secondary"
        >
          ⏸ Pause
        </button>
        <button
          onClick={() => { setPlayT(0); setPlaying(false); }}
          className="px-3 py-1.5 rounded border border-border text-sm font-medium text-foreground hover:bg-secondary"
        >
          ⟲ Reset
        </button>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-card rounded-lg border border-border p-4">
        <div>
          <label className="text-xs font-medium text-foreground flex justify-between">
            <span>Bolus dose</span><span>{bolusMgPerKg.toFixed(1)} mg/kg ({(bolusMgPerKg * weight).toFixed(0)} mg)</span>
          </label>
          <Slider value={[bolusMgPerKg]} min={0} max={3} step={0.1} onValueChange={(v) => setBolusMgPerKg(v[0])} className="mt-2" />
        </div>
        <div>
          <label className="text-xs font-medium text-foreground flex justify-between">
            <span>Maintenance infusion</span><span>{infusionMgPerKgPerHr.toFixed(1)} mg/kg/h</span>
          </label>
          <Slider value={[infusionMgPerKgPerHr]} min={0} max={15} step={0.5} onValueChange={(v) => setInfusionMgPerKgPerHr(v[0])} className="mt-2" />
        </div>
        <div>
          <label className="text-xs font-medium text-foreground flex justify-between">
            <span>Weight</span><span>{weight} kg</span>
          </label>
          <Slider value={[weight]} min={40} max={150} step={1} onValueChange={(v) => setWeight(v[0])} className="mt-2" />
        </div>
        <div>
          <label className="text-xs font-medium text-foreground flex justify-between">
            <span>Duration window</span><span>{durationMin} min</span>
          </label>
          <Slider value={[durationMin]} min={15} max={240} step={5} onValueChange={(v) => { setDurationMin(v[0]); if (playT > v[0]) setPlayT(v[0]); }} className="mt-2" />
        </div>
        {model === "schnider" && (
          <>
            <div>
              <label className="text-xs font-medium text-foreground flex justify-between">
                <span>Age</span><span>{age} yr</span>
              </label>
              <Slider value={[age]} min={18} max={90} step={1} onValueChange={(v) => setAge(v[0])} className="mt-2" />
            </div>
            <div>
              <label className="text-xs font-medium text-foreground flex justify-between">
                <span>Height</span><span>{height} cm</span>
              </label>
              <Slider value={[height]} min={140} max={200} step={1} onValueChange={(v) => setHeight(v[0])} className="mt-2" />
            </div>
            <div className="md:col-span-2 flex gap-2 items-center">
              <span className="text-xs font-medium text-foreground">Sex:</span>
              <button onClick={() => setSex("M")} className={`px-3 py-1 rounded text-xs border ${sex === "M" ? "bg-pharmacology/10 border-pharmacology text-pharmacology" : "border-border text-muted-foreground"}`}>Male</button>
              <button onClick={() => setSex("F")} className={`px-3 py-1 rounded text-xs border ${sex === "F" ? "bg-pharmacology/10 border-pharmacology text-pharmacology" : "border-border text-muted-foreground"}`}>Female</button>
            </div>
          </>
        )}
      </div>

      <div className="bg-secondary/30 rounded-lg p-4 border border-border text-xs text-muted-foreground space-y-1">
        <p><strong className="text-foreground">Marsh vs Schnider:</strong> Marsh has a larger V1 (~16 L in 70 kg) so plasma peaks are lower; Schnider's small fixed V1 (4.27 L) produces higher initial plasma peaks but the higher ke0 (0.456 vs 0.26 modified Marsh) yields faster effect-site equilibration. Schnider is typically used in <em>effect-site targeting</em> mode; Marsh historically targets plasma.</p>
        <p><strong className="text-foreground">Hysteresis:</strong> Ce lags Cp during onset and exceeds Cp during washout — the basis of "overshooting" the plasma to drive effect-site to target.</p>
      </div>
    </div>
  );
};

export default PropofolTCISimulatorDiagram;
