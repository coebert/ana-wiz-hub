import { useState, useMemo } from "react";
import { withAlpha } from "@/lib/color-utils";

type Mode = "vcv" | "pcv" | "psv";

interface ModeInfo {
  key: Mode;
  label: string;
  full: string;
  color: string;
  description: string;
}

const modes: ModeInfo[] = [
  { key: "vcv", label: "VCV", full: "Volume Control", color: "hsl(210, 70%, 55%)", description: "Clinician sets tidal volume and flow rate. Pressure varies with compliance and resistance. Constant (square) inspiratory flow → linear volume rise → rising pressure waveform." },
  { key: "pcv", label: "PCV", full: "Pressure Control", color: "hsl(142, 60%, 45%)", description: "Clinician sets inspiratory pressure and time. Volume and flow vary. Square pressure waveform → decelerating flow → decelerating volume curve. More uniform gas distribution." },
  { key: "psv", label: "PSV", full: "Pressure Support", color: "hsl(35, 80%, 50%)", description: "Patient-triggered, pressure-targeted, flow-cycled. Clinician sets support level. Patient controls rate, Ti, and VT. Decelerating flow — cycles off when flow drops to 25% of peak." },
];

interface Params {
  peep: number;
  compliance: number;
  resistance: number;
  vt: number;
  flowRate: number;
  pip: number;
  ti: number;
  ps: number;
}

const defaultParams: Params = {
  peep: 5,
  compliance: 50,
  resistance: 10,
  vt: 500,
  flowRate: 60,
  pip: 20,
  ti: 1.2,
  ps: 15,
};

const VentilatorWaveformsDiagram = () => {
  const [mode, setMode] = useState<Mode>("vcv");
  const [params, setParams] = useState<Params>(defaultParams);

  const setParam = (key: keyof Params, val: number) =>
    setParams(p => ({ ...p, [key]: val }));

  const waveforms = useMemo(() => generateWaveforms(mode, params), [mode, params]);

  const modeInfo = modes.find(m => m.key === mode)!;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Ventilator Waveforms</h3>

      {/* Mode selector */}
      <div className="flex gap-2">
        {modes.map(m => (
          <button key={m.key} onClick={() => setMode(m.key)}
            className={`flex-1 px-2 py-2 rounded-lg text-xs font-medium transition-all border ${
              mode === m.key ? "border-border shadow-sm text-foreground" : "border-transparent bg-secondary/50 text-muted-foreground hover:bg-secondary"
            }`}
            style={mode === m.key ? { backgroundColor: withAlpha(m.color, 0.09) } : {}}>
            <div>{m.label}</div>
            <div className="text-[10px] opacity-70">{m.full}</div>
          </button>
        ))}
      </div>

      {/* Waveform graphs */}
      <div className="space-y-1">
        <WaveformGraph label="Pressure" unit="cmH₂O" data={waveforms.pressure} color={modeInfo.color}
          yMin={0} yMax={Math.max(35, params.pip + params.peep + 5, params.ps + params.peep + 5)} baseline={params.peep} />
        <WaveformGraph label="Flow" unit="L/min" data={waveforms.flow} color={modeInfo.color}
          yMin={-80} yMax={80} baseline={0} />
        <WaveformGraph label="Volume" unit="ml" data={waveforms.volume} color={modeInfo.color}
          yMin={0} yMax={700} baseline={0} />
      </div>

      {/* Parameter sliders */}
      <div className="bg-secondary/30 rounded-xl p-3 border border-border space-y-2">
        <p className="text-xs font-semibold text-foreground">Parameters</p>
        <ParamSlider label="PEEP" value={params.peep} min={0} max={20} unit="cmH₂O" onChange={v => setParam("peep", v)} />
        <ParamSlider label="Compliance" value={params.compliance} min={15} max={100} unit="ml/cmH₂O" onChange={v => setParam("compliance", v)} />
        <ParamSlider label="Resistance" value={params.resistance} min={5} max={30} unit="cmH₂O/L/s" onChange={v => setParam("resistance", v)} />

        {mode === "vcv" && (
          <>
            <ParamSlider label="Tidal Volume" value={params.vt} min={200} max={700} unit="ml" onChange={v => setParam("vt", v)} step={10} />
            <ParamSlider label="Flow Rate" value={params.flowRate} min={20} max={80} unit="L/min" onChange={v => setParam("flowRate", v)} />
          </>
        )}
        {mode === "pcv" && (
          <>
            <ParamSlider label="Insp. Pressure" value={params.pip} min={8} max={35} unit="cmH₂O" onChange={v => setParam("pip", v)} />
            <ParamSlider label="Insp. Time" value={params.ti} min={0.5} max={2.0} unit="s" onChange={v => setParam("ti", v)} step={0.1} />
          </>
        )}
        {mode === "psv" && (
          <ParamSlider label="Pressure Support" value={params.ps} min={5} max={25} unit="cmH₂O" onChange={v => setParam("ps", v)} />
        )}
      </div>

      {/* Calculated values */}
      <div className="grid grid-cols-3 gap-2">
        {(() => {
          let peakP: number, vt: number, peakFlow: number;
          const tau = (params.compliance / 1000) * params.resistance;
          if (mode === "vcv") {
            peakFlow = params.flowRate;
            vt = params.vt;
            peakP = params.peep + vt / params.compliance + params.resistance * (peakFlow / 60);
          } else if (mode === "pcv") {
            peakP = params.peep + params.pip;
            vt = params.pip * params.compliance * (1 - Math.exp(-params.ti / tau));
            peakFlow = (params.pip / params.resistance) * 60;
          } else {
            peakP = params.peep + params.ps;
            vt = params.ps * params.compliance * (1 - Math.exp(-1.0 / tau));
            peakFlow = (params.ps / params.resistance) * 60;
          }
          return [
            { label: "Peak Pressure", value: `${peakP.toFixed(0)}`, unit: "cmH₂O" },
            { label: "Tidal Volume", value: `${vt.toFixed(0)}`, unit: "ml" },
            { label: "Peak Flow", value: `${peakFlow.toFixed(0)}`, unit: "L/min" },
          ].map((v, i) => (
            <div key={i} className="text-center bg-card rounded-lg p-2 border border-border">
              <p className="text-[10px] text-muted-foreground">{v.label}</p>
              <p className="text-sm font-mono font-bold" style={{ color: modeInfo.color }}>{v.value}</p>
              <p className="text-[9px] text-muted-foreground">{v.unit}</p>
            </div>
          ));
        })()}
      </div>

      {/* Mode description */}
      <div className="bg-secondary/30 rounded-lg p-3 border border-border"
        style={{ borderLeftColor: modeInfo.color, borderLeftWidth: 3 }}>
        <p className="text-sm font-semibold text-foreground">{modeInfo.full} Ventilation</p>
        <p className="text-xs text-muted-foreground mt-1">{modeInfo.description}</p>
      </div>

      {/* Key points */}
      <div className="bg-secondary/30 rounded-lg p-3 border border-border">
        <p className="text-xs font-medium text-foreground">Waveform Interpretation</p>
        <ul className="text-xs text-muted-foreground mt-1 space-y-1 list-disc list-inside">
          <li>VCV: square flow, rising pressure — peak−plateau difference = resistive pressure</li>
          <li>PCV: square pressure, decelerating flow — more homogeneous ventilation</li>
          <li>PSV: patient-triggered, flow-cycled at 25% peak — supports spontaneous breathing</li>
          <li>↑ Resistance → higher peak pressure (VCV), lower VT (PCV/PSV)</li>
          <li>↓ Compliance → higher plateau pressure (VCV), lower VT (PCV/PSV)</li>
          <li>Auto-PEEP: expiratory flow doesn't reach zero before next breath</li>
        </ul>
      </div>
    </div>
  );
};

/* ─── Waveform Graph ─── */
function WaveformGraph({ label, unit, data, color, yMin, yMax, baseline }: {
  label: string; unit: string; data: { t: number; v: number }[];
  color: string; yMin: number; yMax: number; baseline: number;
}) {
  const W = 380, H = 65, PL = 45, PR = 10, PT = 5, PB = 12;
  const plotW = W - PL - PR;
  const plotH = H - PT - PB;
  const tMax = data.length > 0 ? data[data.length - 1].t : 4;

  const toX = (t: number) => PL + (t / tMax) * plotW;
  const toY = (v: number) => PT + plotH - ((v - yMin) / (yMax - yMin)) * plotH;

  const pathD = data.map((p, i) => `${i === 0 ? "M" : "L"} ${toX(p.t).toFixed(1)},${toY(p.v).toFixed(1)}`).join(" ");
  const baseY = toY(baseline);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      <rect x={PL} y={PT} width={plotW} height={plotH} fill="hsl(var(--muted))" opacity={0.06} />
      <line x1={PL} y1={baseY} x2={PL + plotW} y2={baseY} stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="3,3" />
      <line x1={PL} y1={PT + plotH} x2={PL + plotW} y2={PT + plotH} stroke="hsl(var(--border))" strokeWidth="1" />
      <line x1={PL} y1={PT} x2={PL} y2={PT + plotH} stroke="hsl(var(--border))" strokeWidth="1" />
      <path d={pathD} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <text x="3" y={PT + plotH / 2 + 3} className="text-[8px] fill-foreground font-medium">{label}</text>
      <text x="3" y={PT + plotH / 2 + 12} className="text-[7px] fill-muted-foreground">({unit})</text>
      <text x={PL - 3} y={PT + 5} textAnchor="end" className="text-[7px] fill-muted-foreground">{yMax}</text>
      <text x={PL - 3} y={PT + plotH} textAnchor="end" className="text-[7px] fill-muted-foreground">{yMin}</text>
    </svg>
  );
}

/* ─── Param Slider ─── */
function ParamSlider({ label, value, min, max, unit, onChange, step = 1 }: {
  label: string; value: number; min: number; max: number; unit: string; onChange: (v: number) => void; step?: number;
}) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-0.5">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono font-semibold text-foreground">{step < 1 ? value.toFixed(1) : value} {unit}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none bg-secondary cursor-pointer accent-primary" />
    </div>
  );
}

/* ─── Waveform Generation ─── */
function generateWaveforms(mode: Mode, p: Params) {
  const dt = 0.02;
  const totalT = 4;
  const out = { pressure: [] as { t: number; v: number }[], flow: [] as { t: number; v: number }[], volume: [] as { t: number; v: number }[] };
  const tau = (p.compliance / 1000) * p.resistance;

  if (mode === "vcv") {
    const flowLps = p.flowRate / 60;
    const ti = (p.vt / 1000) / flowLps;
    const breathT = 2.0;
    for (let t = 0; t <= totalT; t += dt) {
      const tb = t % breathT;
      let pres: number, flow: number, vol: number;
      if (tb < ti) {
        flow = p.flowRate;
        vol = (tb / ti) * p.vt;
        pres = p.peep + vol / p.compliance + p.resistance * flowLps;
      } else {
        const tE = tb - ti;
        flow = -p.flowRate * Math.exp(-tE / (tau * 2));
        vol = p.vt * Math.exp(-tE / (tau * 2));
        pres = p.peep + vol / p.compliance;
      }
      out.pressure.push({ t, v: Math.max(pres, p.peep) });
      out.flow.push({ t, v: flow });
      out.volume.push({ t, v: Math.max(vol, 0) });
    }
  } else if (mode === "pcv") {
    const breathT = 2.0;
    for (let t = 0; t <= totalT; t += dt) {
      const tb = t % breathT;
      let pres: number, flow: number, vol: number;
      if (tb < p.ti) {
        const frac = 1 - Math.exp(-tb / tau);
        vol = p.pip * p.compliance * frac;
        flow = (p.pip / p.resistance) * Math.exp(-tb / tau) * 60;
        pres = p.peep + p.pip;
      } else {
        const tE = tb - p.ti;
        const vtA = p.pip * p.compliance * (1 - Math.exp(-p.ti / tau));
        vol = vtA * Math.exp(-tE / (tau * 2));
        flow = -(vtA / 1000) / (tau * 2) * Math.exp(-tE / (tau * 2)) * 60000;
        flow = Math.max(flow, -80);
        pres = p.peep;
      }
      out.pressure.push({ t, v: Math.max(pres, p.peep) });
      out.flow.push({ t, v: flow });
      out.volume.push({ t, v: Math.max(vol, 0) });
    }
  } else {
    const breathT = 2.2;
    const tCycle = Math.min(-tau * Math.log(0.25), 1.5);
    for (let t = 0; t <= totalT; t += dt) {
      const tb = t % breathT;
      let pres: number, flow: number, vol: number;
      if (tb < 0.05) {
        flow = -5; pres = p.peep - 1; vol = 0;
      } else if (tb < tCycle + 0.05) {
        const tI = tb - 0.05;
        const frac = 1 - Math.exp(-tI / tau);
        vol = p.ps * p.compliance * frac;
        flow = (p.ps / p.resistance) * Math.exp(-tI / tau) * 60;
        pres = p.peep + p.ps;
      } else {
        const tE = tb - tCycle - 0.05;
        const vtA = p.ps * p.compliance * (1 - Math.exp(-tCycle / tau));
        vol = vtA * Math.exp(-tE / (tau * 2));
        flow = -(vtA / 1000) / (tau * 2) * Math.exp(-tE / (tau * 2)) * 60000;
        flow = Math.max(flow, -80);
        pres = p.peep;
      }
      out.pressure.push({ t, v: Math.max(pres, 0) });
      out.flow.push({ t, v: flow });
      out.volume.push({ t, v: Math.max(vol, 0) });
    }
  }
  return out;
}

export { VentilatorWaveformsDiagram };
