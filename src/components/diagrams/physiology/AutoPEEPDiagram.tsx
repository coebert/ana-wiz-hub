import { useState, useMemo } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

const AutoPEEPDiagram = () => {
  const [rr, setRr] = useState(12);
  const [ieRatio, setIeRatio] = useState(2.0); // E component of 1:E
  const [compliance, setCompliance] = useState(50);
  const [resistance, setResistance] = useState(10);
  const [peepSet, setPeepSet] = useState(5);

  const tau = (compliance / 1000) * resistance;
  const breathT = 60 / rr;
  const ti = breathT / (1 + ieRatio);
  const te = breathT - ti;
  const tauRatio = te / tau;
  const expComplete = (1 - Math.exp(-tauRatio)) * 100;

  // Simulate auto-PEEP: volume trapped after expiration
  // Steady-state calculation
  const vtDelivered = 500; // assume fixed VT for visualization
  const volTrapped = vtDelivered * Math.exp(-te / tau) / (1 - Math.exp(-te / tau));
  const autoPEEP = Math.max(volTrapped / compliance, 0);
  const totalPEEP = peepSet + autoPEEP;

  const waveforms = useMemo(() => {
    const dt = 0.02;
    const cycles = 6;
    const _totalT = breathT * cycles;
    const out = { volume: [] as { t: number; v: number }[], flow: [] as { t: number; v: number }[], pressure: [] as { t: number; v: number }[] };

    let baseVol = 0; // accumulates with air trapping

    for (let cycle = 0; cycle < cycles; cycle++) {
      const cycleStart = cycle * breathT;

      // Inspiration
      for (let dt2 = 0; dt2 < ti; dt2 += dt) {
        const t = cycleStart + dt2;
        const frac = dt2 / ti;
        const vol = baseVol + vtDelivered * frac;
        const flow = (vtDelivered / 1000) / ti * 60; // L/min
        const pres = peepSet + vol / compliance + resistance * ((vtDelivered / 1000) / ti);
        out.volume.push({ t, v: vol });
        out.flow.push({ t, v: flow });
        out.pressure.push({ t, v: pres });
      }

      // Expiration
      const _peakVol = baseVol + vtDelivered;
      for (let dt2 = 0; dt2 < te; dt2 += dt) {
        const t = cycleStart + ti + dt2;
        const vol = baseVol + vtDelivered * Math.exp(-dt2 / tau);
        const flowLps = -(vtDelivered / 1000) / tau * Math.exp(-dt2 / tau);
        out.volume.push({ t, v: vol });
        out.flow.push({ t, v: flowLps * 60 });
        out.pressure.push({ t, v: peepSet + vol / compliance });
      }

      // Update trapped volume for next cycle
      baseVol = baseVol + vtDelivered * Math.exp(-te / tau);
      // Clamp to steady state
      const steadyState = vtDelivered * Math.exp(-te / tau) / (1 - Math.exp(-te / tau));
      if (baseVol > steadyState) baseVol = steadyState;
    }

    return out;
  }, [rr, ieRatio, compliance, resistance, peepSet, breathT, ti, te, tau]);

  const maxVol = Math.max(...waveforms.volume.map(p => p.v), 100);
  const hasAutopeep = autoPEEP > 1;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Auto-PEEP & Air Trapping</h3>

      {/* Status indicator */}
      <div className={`rounded-lg p-3 border ${hasAutopeep ? "bg-destructive/5 border-destructive/30" : "bg-green-500/5 border-green-500/30"}`}>
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${hasAutopeep ? "bg-destructive animate-pulse" : "bg-green-500"}`} />
          <span className={`text-sm font-semibold ${hasAutopeep ? "text-destructive" : "text-green-600"}`}>
            {hasAutopeep ? `Auto-PEEP: ${autoPEEP.toFixed(1)} cmH₂O` : "No significant auto-PEEP"}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Te/τ = {tauRatio.toFixed(1)} | Expiration {expComplete.toFixed(0)}% complete | 
          {tauRatio < 3 ? " ⚠ Incomplete expiration" : " ✓ Adequate expiratory time"}
        </p>
      </div>

      {/* Volume waveform with trapped gas highlight */}
      <div>
        <p className="text-xs font-medium text-foreground mb-1">Volume-Time (showing air trapping)</p>
        <svg viewBox="0 0 400 120" className="w-full">
          <rect x="50" y="5" width="340" height="95" fill="hsl(var(--muted))" opacity={0.06} />
          <line x1="50" y1="100" x2="390" y2="100" stroke="hsl(var(--border))" strokeWidth="1" />
          <line x1="50" y1="5" x2="50" y2="100" stroke="hsl(var(--border))" strokeWidth="1" />

          {/* Trapped volume zone */}
          {hasAutopeep && (() => {
            const steadyVol = vtDelivered * Math.exp(-te / tau) / (1 - Math.exp(-te / tau));
            const yTrap = 100 - (steadyVol / maxVol) * 90;
            return (
              <>
                <rect x="50" y={yTrap} width="340" height={100 - yTrap} fill="hsl(0, 70%, 55%)" opacity={0.08} />
                <line x1="50" y1={yTrap} x2="390" y2={yTrap} stroke="hsl(0, 70%, 55%)" strokeWidth="1" strokeDasharray="4,3" />
                <text x="55" y={yTrap - 3} className="text-[8px] fill-destructive font-medium">Trapped volume ({steadyVol.toFixed(0)} ml)</text>
              </>
            );
          })()}

          {/* Volume trace */}
          <path
            d={waveforms.volume.map((p, i) => {
              const x = 50 + (p.t / (waveforms.volume[waveforms.volume.length - 1]?.t || 1)) * 340;
              const y = 100 - (p.v / maxVol) * 90;
              return `${i === 0 ? "M" : "L"} ${x.toFixed(1)},${y.toFixed(1)}`;
            }).join(" ")}
            fill="none" stroke="hsl(210, 70%, 55%)" strokeWidth="2" />

          <text x="10" y="55" className="text-[8px] fill-foreground font-medium">Vol</text>
          <text x="10" y="65" className="text-[7px] fill-muted-foreground">(ml)</text>
          <text x="47" y="8" textAnchor="end" className="text-[7px] fill-muted-foreground">{maxVol.toFixed(0)}</text>
          <text x="47" y="100" textAnchor="end" className="text-[7px] fill-muted-foreground">0</text>
          <text x="220" y="115" textAnchor="middle" className="text-[8px] fill-muted-foreground">Time (s)</text>
        </svg>
      </div>

      {/* Flow waveform showing incomplete expiration */}
      <div>
        <p className="text-xs font-medium text-foreground mb-1">Flow-Time (expiratory flow at next breath)</p>
        <svg viewBox="0 0 400 100" className="w-full">
          <rect x="50" y="5" width="340" height="85" fill="hsl(var(--muted))" opacity={0.06} />
          <line x1="50" y1="47" x2="390" y2="47" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="3,3" />
          <line x1="50" y1="90" x2="390" y2="90" stroke="hsl(var(--border))" strokeWidth="1" />
          <line x1="50" y1="5" x2="50" y2="90" stroke="hsl(var(--border))" strokeWidth="1" />

          <path
            d={waveforms.flow.map((p, i) => {
              const x = 50 + (p.t / (waveforms.flow[waveforms.flow.length - 1]?.t || 1)) * 340;
              const y = 47 - (p.v / 80) * 40;
              return `${i === 0 ? "M" : "L"} ${x.toFixed(1)},${Math.min(Math.max(y, 5), 90).toFixed(1)}`;
            }).join(" ")}
            fill="none" stroke="hsl(142, 60%, 45%)" strokeWidth="2" />

          {/* Arrow showing flow doesn't reach zero */}
          {hasAutopeep && (
            <text x="360" y="58" className="text-[7px] fill-destructive font-medium">Flow ≠ 0 →</text>
          )}

          <text x="10" y="45" className="text-[8px] fill-foreground font-medium">Flow</text>
          <text x="10" y="55" className="text-[7px] fill-muted-foreground">(L/min)</text>
        </svg>
      </div>

      {/* Controls */}
      <div className="bg-secondary/30 rounded-xl p-3 border border-border space-y-2">
        <p className="text-xs font-semibold text-foreground">Adjust Parameters</p>
        <SliderRow label="Respiratory Rate" value={rr} min={8} max={35} unit="bpm" onChange={setRr} />
        <div>
          <div className="flex justify-between text-xs mb-0.5">
            <span className="text-muted-foreground">I:E Ratio</span>
            <span className="font-mono font-semibold text-foreground">1:{ieRatio.toFixed(1)}</span>
          </div>
          <input type="range" min={0.5} max={4.0} step={0.1} value={ieRatio}
            onChange={e => setIeRatio(Number(e.target.value))}
            className="w-full h-1.5 rounded-full appearance-none bg-secondary cursor-pointer accent-primary" />
        </div>
        <SliderRow label="Compliance" value={compliance} min={15} max={100} unit="ml/cmH₂O" onChange={setCompliance} />
        <SliderRow label="Resistance" value={resistance} min={5} max={40} unit="cmH₂O/L/s" onChange={setResistance} />
        <SliderRow label="Set PEEP" value={peepSet} min={0} max={15} unit="cmH₂O" onChange={setPeepSet} />
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: "Time Constant (τ)", value: `${(tau * 1000).toFixed(0)} ms`, sub: `${tau.toFixed(2)} s` },
          { label: "Expiratory Time", value: `${te.toFixed(2)} s`, sub: `${tauRatio.toFixed(1)}τ (need ≥3τ)` },
          { label: "Total PEEP", value: `${totalPEEP.toFixed(1)}`, sub: `Set ${peepSet} + Auto ${autoPEEP.toFixed(1)}` },
          { label: "Exp. Complete", value: `${expComplete.toFixed(0)}%`, sub: tauRatio >= 3 ? "Adequate" : "Incomplete" },
        ].map((m, i) => (
          <div key={i} className="text-center bg-card rounded-lg p-2 border border-border">
            <p className="text-[10px] text-muted-foreground">{m.label}</p>
            <p className={`text-base font-mono font-bold ${i === 2 && hasAutopeep ? "text-destructive" : i === 3 && tauRatio < 3 ? "text-yellow-500" : "text-foreground"}`}>
              {m.value}
            </p>
            <p className="text-[9px] text-muted-foreground">{m.sub}</p>
          </div>
        ))}
      </div>

      {/* Clinical context */}
      <div className="bg-secondary/30 rounded-lg p-3 border border-border">
        <p className="text-xs font-medium text-foreground">Clinical Significance</p>
        <ul className="text-xs text-muted-foreground mt-1 space-y-1 list-disc list-inside">
          <li>Auto-PEEP (intrinsic PEEP) = alveolar pressure at end-expiration above set PEEP</li>
          <li>Caused by incomplete expiration: high RR, short Te, high resistance, high compliance (COPD)</li>
          <li>Effects: ↑ work of breathing, ↓ venous return, ↓ cardiac output, barotrauma risk</li>
          <li>Detection: end-expiratory hold manoeuvre on ventilator, or flow not reaching zero</li>
          <li>Management: ↓ RR, ↑ I:E ratio, bronchodilators, ↓ VT, applied extrinsic PEEP (≤80% auto-PEEP)</li>
          <li>3τ = 95% expiration, 5τ = 99% — aim for Te ≥ 3τ to minimise air trapping</li>
        </ul>
      </div>
    </div>
  );
};

function SliderRow({ label, value, min, max, unit, onChange }: {
  label: string; value: number; min: number; max: number; unit: string; onChange: (v: number) => void;
}) {
  return (
    <DiagramFigure id="auto-peep" title="Auto-PEEP from dynamic hyperinflation: respiratory rate and I:E effects" description="Interactive ventilator model showing how shortened expiratory time at higher rates or longer inspiratory ratios traps gas and generates intrinsic PEEP.">
    <div>
      <div className="flex justify-between text-xs mb-0.5">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono font-semibold text-foreground">{value} {unit}</span>
      </div>
      <input type="range" min={min} max={max} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none bg-secondary cursor-pointer accent-primary" />
    </div>
    </DiagramFigure>
  );
}

export { AutoPEEPDiagram };
