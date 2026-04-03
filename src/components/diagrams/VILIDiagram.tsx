import { useState, useMemo } from "react";

const VILIDiagram = () => {
  const [vt, setVt] = useState(6);
  const [rr, setRr] = useState(16);
  const [peep, setPeep] = useState(10);
  const [plateau, setPlateau] = useState(28);
  const [ibw, setIbw] = useState(70);
  const [flow, setFlow] = useState(30); // L/min

  // Calculations
  const vtMl = vt * ibw;
  const drivingP = plateau - peep;
  const compliance = drivingP > 0 ? vtMl / drivingP : 0;
  const strain = vtMl / (ibw * 20); // FRC ≈ 20ml/kg (simplified baby lung in ARDS)
  const stress = plateau; // simplified: stress ≈ transpulmonary plateau

  // Mechanical power (simplified Gattinoni formula) in J/min
  const mp = 0.098 * rr * vtMl / 1000 * (plateau - drivingP / 2);
  // Normalised MP per kg
  const mpPerKg = mp / ibw;

  // Thresholds
  const dpSafe = drivingP <= 15;
  const plateauSafe = plateau <= 30;
  const strainSafe = strain <= 0.27; // ~27%
  const mpSafe = mp <= 17;

  const overallRisk = (!dpSafe || !plateauSafe || !strainSafe || !mpSafe) ? 
    ((!dpSafe && !plateauSafe) || mp > 25) ? "high" : "moderate" : "low";

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">VILI: Stress, Strain & Mechanical Power</h3>

      {/* Risk indicator */}
      <div className={`rounded-lg p-3 border ${
        overallRisk === "high" ? "bg-destructive/5 border-destructive/30" :
        overallRisk === "moderate" ? "bg-yellow-500/5 border-yellow-500/30" :
        "bg-green-500/5 border-green-500/30"
      }`}>
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${
            overallRisk === "high" ? "bg-destructive animate-pulse" :
            overallRisk === "moderate" ? "bg-yellow-500" : "bg-green-500"
          }`} />
          <span className={`text-sm font-semibold ${
            overallRisk === "high" ? "text-destructive" :
            overallRisk === "moderate" ? "text-yellow-600" : "text-green-600"
          }`}>
            VILI Risk: {overallRisk.charAt(0).toUpperCase() + overallRisk.slice(1)}
          </span>
        </div>
      </div>

      {/* Stress-Strain Curve */}
      <div>
        <p className="text-xs font-medium text-foreground mb-1">Stress–Strain Relationship</p>
        <svg viewBox="0 0 400 180" className="w-full">
          <rect x="55" y="5" width="335" height="145" fill="hsl(var(--muted))" opacity={0.06} />
          {/* Axes */}
          <line x1="55" y1="150" x2="390" y2="150" stroke="hsl(var(--border))" strokeWidth="1" />
          <line x1="55" y1="150" x2="55" y2="5" stroke="hsl(var(--border))" strokeWidth="1" />
          <text x="222" y="172" textAnchor="middle" className="text-[9px] fill-muted-foreground">Strain (ΔV/FRC)</text>
          <text x="12" y="80" textAnchor="middle" className="text-[9px] fill-muted-foreground" transform="rotate(-90,12,80)">Stress (cmH₂O)</text>

          {/* Safe zone */}
          <rect x="55" y="55" width={0.3 / 0.8 * 335} height="95" fill="hsl(142, 60%, 45%)" opacity={0.05} />
          {/* Danger zone */}
          <rect x={55 + 0.5 / 0.8 * 335} y="5" width={0.3 / 0.8 * 335} height="145" fill="hsl(0, 70%, 55%)" opacity={0.05} />

          {/* Stress-strain curve (sigmoid) */}
          {(() => {
            const pts: string[] = [];
            for (let s = 0; s <= 0.8; s += 0.01) {
              const x = 55 + (s / 0.8) * 335;
              // Sigmoid-ish: linear then steepening
              const stress_val = s <= 0.3 ? s * 100 : 30 + (s - 0.3) * 200;
              const y = 150 - (Math.min(stress_val, 55) / 60) * 145;
              pts.push(`${pts.length === 0 ? "M" : "L"} ${x.toFixed(1)},${y.toFixed(1)}`);
            }
            return <path d={pts.join(" ")} fill="none" stroke="hsl(var(--foreground))" strokeWidth="2" opacity={0.4} />;
          })()}

          {/* Current point */}
          {(() => {
            const x = 55 + (Math.min(strain, 0.8) / 0.8) * 335;
            const stressVal = strain <= 0.3 ? strain * 100 : 30 + (strain - 0.3) * 200;
            const y = 150 - (Math.min(stressVal, 55) / 60) * 145;
            const col = strainSafe ? "hsl(142, 60%, 45%)" : "hsl(0, 70%, 55%)";
            return (
              <>
                <circle cx={x} cy={y} r="6" fill={col} stroke="white" strokeWidth="1.5" />
                <line x1={x} y1={y} x2={x} y2={150} stroke={col} strokeWidth="1" strokeDasharray="3,3" opacity={0.5} />
                <text x={x} y={y - 10} textAnchor="middle" className="text-[8px] fill-foreground font-semibold">
                  Current
                </text>
              </>
            );
          })()}

          {/* Threshold lines */}
          {/* Strain threshold */}
          {(() => {
            const threshX = 55 + (0.27 / 0.8) * 335;
            return (
              <>
                <line x1={threshX} y1="5" x2={threshX} y2="150" stroke="hsl(0, 70%, 55%)" strokeWidth="1" strokeDasharray="4,3" />
                <text x={threshX + 3} y="15" className="text-[7px] fill-destructive">Strain 0.27</text>
              </>
            );
          })()}
          {/* Stress threshold at 30 */}
          {(() => {
            const threshY = 150 - (30 / 60) * 145;
            return (
              <>
                <line x1="55" y1={threshY} x2="390" y2={threshY} stroke="hsl(0, 70%, 55%)" strokeWidth="1" strokeDasharray="4,3" />
                <text x="392" y={threshY + 3} className="text-[7px] fill-destructive">30</text>
              </>
            );
          })()}

          {/* Y ticks */}
          {[0, 15, 30, 45].map(v => (
            <text key={v} x="52" y={150 - (v / 60) * 145 + 3} textAnchor="end" className="text-[7px] fill-muted-foreground">{v}</text>
          ))}
        </svg>
      </div>

      {/* Parameter sliders */}
      <div className="bg-secondary/30 rounded-xl p-3 border border-border space-y-2">
        <p className="text-xs font-semibold text-foreground">Ventilator Settings</p>
        <Slider label="VT" value={vt} min={4} max={12} unit={`ml/kg (${vtMl} ml)`} onChange={setVt} />
        <Slider label="RR" value={rr} min={8} max={35} unit="bpm" onChange={setRr} />
        <Slider label="PEEP" value={peep} min={0} max={20} unit="cmH₂O" onChange={setPeep} />
        <Slider label="Plateau" value={plateau} min={10} max={40} unit="cmH₂O" onChange={setPlateau} />
        <Slider label="IBW" value={ibw} min={40} max={100} unit="kg" onChange={setIbw} />
      </div>

      {/* VILI components dashboard */}
      <div className="grid grid-cols-2 gap-2">
        <MetricCard label="Driving Pressure" value={drivingP.toFixed(0)} unit="cmH₂O" safe={dpSafe} threshold="≤15" />
        <MetricCard label="Plateau Pressure" value={plateau.toFixed(0)} unit="cmH₂O" safe={plateauSafe} threshold="≤30" />
        <MetricCard label="Strain (ΔV/FRC)" value={strain.toFixed(2)} unit="" safe={strainSafe} threshold="≤0.27" />
        <MetricCard label="Mechanical Power" value={mp.toFixed(1)} unit="J/min" safe={mpSafe} threshold="≤17" />
        <MetricCard label="Compliance" value={compliance.toFixed(0)} unit="ml/cmH₂O" safe={compliance >= 30} threshold="≥30" />
        <MetricCard label="MP / kg IBW" value={mpPerKg.toFixed(2)} unit="J/min/kg" safe={mpPerKg <= 0.25} threshold="≤0.25" />
      </div>

      {/* Mechanical Power breakdown bar */}
      <div className="bg-card rounded-xl border border-border p-3">
        <p className="text-xs font-semibold text-foreground mb-2">Mechanical Power Components</p>
        <div className="space-y-1.5">
          {(() => {
            const elastic = 0.098 * rr * vtMl / 1000 * drivingP / 2;
            const resistive = 0.098 * rr * vtMl / 1000 * (flow / 60 * 10) * 0.3; // simplified
            const peepComp = 0.098 * rr * vtMl / 1000 * peep;
            const total = elastic + resistive + peepComp;
            const items = [
              { label: "Elastic (driving P)", value: elastic, color: "hsl(210, 70%, 55%)" },
              { label: "PEEP component", value: peepComp, color: "hsl(142, 60%, 45%)" },
              { label: "Resistive", value: resistive, color: "hsl(35, 80%, 50%)" },
            ];
            return items.map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-[10px] mb-0.5">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-mono text-foreground">{item.value.toFixed(1)} J/min</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-300"
                    style={{ width: `${total > 0 ? (item.value / total) * 100 : 0}%`, backgroundColor: item.color }} />
                </div>
              </div>
            ));
          })()}
        </div>
      </div>

      {/* VILI mechanisms */}
      <div className="bg-secondary/30 rounded-lg p-3 border border-border">
        <p className="text-xs font-medium text-foreground">VILI Mechanisms</p>
        <ul className="text-xs text-muted-foreground mt-1 space-y-1 list-disc list-inside">
          <li><strong>Volutrauma</strong>: overdistension from excessive VT → target 6 ml/kg IBW</li>
          <li><strong>Barotrauma</strong>: high transpulmonary pressure → plateau ≤30 cmH₂O</li>
          <li><strong>Atelectrauma</strong>: cyclic opening/closing → adequate PEEP</li>
          <li><strong>Biotrauma</strong>: inflammatory mediator release from mechanical injury</li>
          <li><strong>Driving pressure</strong> ΔP = Pplat − PEEP. Best mortality predictor in ARDS (≤15)</li>
          <li><strong>Mechanical power</strong> unifies VT, ΔP, RR, flow, PEEP into single metric. Threshold ~17 J/min</li>
          <li><strong>Stress</strong> = transpulmonary pressure. <strong>Strain</strong> = ΔV/FRC. Related by specific elastance (~13.5 cmH₂O)</li>
          <li>In ARDS "baby lung": FRC reduced → same VT produces higher strain in aerated lung</li>
        </ul>
      </div>
    </div>
  );
};

function MetricCard({ label, value, unit, safe, threshold }: {
  label: string; value: string; unit: string; safe: boolean; threshold: string;
}) {
  return (
    <div className="text-center bg-card rounded-lg p-2 border border-border">
      <p className="text-[10px] text-muted-foreground">{label}</p>
      <p className={`text-base font-mono font-bold ${safe ? "text-foreground" : "text-destructive"}`}>{value}</p>
      <p className="text-[9px] text-muted-foreground">{unit} {safe ? "✓" : "✗"} {threshold}</p>
    </div>
  );
}

function Slider({ label, value, min, max, unit, onChange }: {
  label: string; value: number; min: number; max: number; unit: string; onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-0.5">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono font-semibold text-foreground">{value} {unit}</span>
      </div>
      <input type="range" min={min} max={max} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none bg-secondary cursor-pointer accent-primary" />
    </div>
  );
}

export { VILIDiagram };
