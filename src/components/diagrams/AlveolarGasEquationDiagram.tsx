import { useState } from "react";

const AlveolarGasEquationDiagram = () => {
  const [fio2, setFio2] = useState(21);
  const [paCO2, setPaCO2] = useState(40);
  const [patm, setPatm] = useState(760);
  const [rq, setRq] = useState(0.8);

  const pH2O = 47;
  const piO2 = (fio2 / 100) * (patm - pH2O);
  const paO2 = piO2 - paCO2 / rq;
  const aaDiff = paO2 - (paO2 - 10); // simplified normal A-a ≈ age/4 + 4, show concept
  const expectedAa = 10; // normal young adult
  const estimatedPaO2 = paO2 - expectedAa;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Alveolar Gas Equation</h3>

      {/* Equation */}
      <div className="bg-secondary/30 rounded-xl p-4 border border-border text-center">
        <p className="text-xs text-muted-foreground mb-2">Alveolar Gas Equation</p>
        <p className="text-base font-mono font-bold text-foreground">
          P<sub>A</sub>O₂ = FiO₂ × (P<sub>atm</sub> − P<sub>H₂O</sub>) − PaCO₂ / RQ
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          P<sub>H₂O</sub> = 47 mmHg at 37°C (saturated vapour pressure)
        </p>
      </div>

      {/* Sliders */}
      <div className="space-y-3">
        <SliderRow label="FiO₂" value={fio2} min={21} max={100} unit="%" onChange={setFio2} />
        <SliderRow label="PaCO₂" value={paCO2} min={15} max={80} unit="mmHg" onChange={setPaCO2} />
        <SliderRow label={<>P<sub>atm</sub></>} value={patm} min={400} max={760} unit="mmHg" onChange={setPatm} />
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">RQ (Respiratory Quotient)</span>
            <span className="font-mono font-semibold text-foreground">{rq.toFixed(2)}</span>
          </div>
          <div className="flex gap-2">
            {[0.7, 0.8, 1.0].map(v => (
              <button
                key={v}
                onClick={() => setRq(v)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  rq === v
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
                }`}
              >
                {v.toFixed(1)} {v === 0.7 ? "(fat)" : v === 0.8 ? "(mixed)" : "(carb)"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Calculation breakdown */}
      <div className="bg-card rounded-xl border border-border p-4 space-y-3">
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Step 1: Inspired O₂ Pressure (PiO₂)</p>
          <p className="text-sm font-mono text-foreground">
            {fio2 / 100} × ({patm} − 47) = <span className="font-bold">{piO2.toFixed(1)} mmHg</span>
          </p>
        </div>
        <div className="border-t border-border pt-3 text-center">
          <p className="text-xs text-muted-foreground">Step 2: Alveolar PO₂ (P<sub>A</sub>O₂)</p>
          <p className="text-sm font-mono text-foreground">
            {piO2.toFixed(1)} − {paCO2} / {rq.toFixed(1)} = <span className="font-bold">{paO2.toFixed(1)} mmHg</span>
          </p>
        </div>
        <div className="border-t border-border pt-3 text-center">
          <p className="text-xs text-muted-foreground">Estimated PaO₂ (A-a gradient ~{expectedAa} mmHg)</p>
          <p className={`text-2xl font-mono font-bold mt-1 ${estimatedPaO2 < 60 ? "text-destructive" : estimatedPaO2 < 80 ? "text-yellow-500" : "text-green-500"}`}>
            {estimatedPaO2.toFixed(1)} mmHg
          </p>
        </div>
      </div>

      {/* Visual O2 cascade */}
      <div>
        <p className="text-xs font-medium text-foreground mb-2">Oxygen Cascade</p>
        <svg viewBox="0 0 400 100" className="w-full">
          {(() => {
            const stages = [
              { label: "Atmospheric", value: patm * (fio2 / 100) },
              { label: "Inspired (PiO₂)", value: piO2 },
              { label: "Alveolar (PAO₂)", value: paO2 },
              { label: "Arterial (PaO₂)", value: estimatedPaO2 },
              { label: "Mitochondrial", value: Math.max(estimatedPaO2 - 55, 3) },
            ];
            const maxVal = Math.max(...stages.map(s => s.value), 1);
            return stages.map((s, i) => {
              const barW = Math.max((s.value / maxVal) * 300, 2);
              const y = 5 + i * 19;
              const color = s.value < 60 ? "hsl(0, 70%, 55%)" : s.value < 80 ? "hsl(35, 80%, 50%)" : "hsl(210, 70%, 55%)";
              return (
                <g key={i}>
                  <rect x="90" y={y} width={barW} height="14" rx="3" fill={color} opacity={0.7} />
                  <text x="85" y={y + 11} textAnchor="end" className="text-[8px] fill-muted-foreground">{s.label}</text>
                  <text x={93 + barW} y={y + 11} className="text-[8px] fill-foreground font-mono font-semibold">{s.value.toFixed(0)}</text>
                </g>
              );
            });
          })()}
        </svg>
      </div>

      {/* Clinical context */}
      <div className="bg-secondary/30 rounded-lg p-3 border border-border">
        <p className="text-xs font-medium text-foreground">Clinical Notes</p>
        <ul className="text-xs text-muted-foreground mt-1 space-y-1 list-disc list-inside">
          {patm < 600 && <li>Low atmospheric pressure — altitude effect. PAO₂ significantly reduced even with normal ventilation.</li>}
          {paCO2 > 50 && <li>Hypercapnia: elevated PaCO₂ displaces O₂ from the alveolus, reducing PAO₂.</li>}
          {fio2 > 60 && <li>High FiO₂: risk of absorption atelectasis and oxygen toxicity with prolonged use.</li>}
          {estimatedPaO2 < 60 && <li className="font-semibold text-destructive">Estimated PaO₂ &lt; 60 mmHg — respiratory failure threshold (steep part of ODC).</li>}
          <li>Normal A-a gradient ≈ Age/4 + 4 mmHg (widens with V/Q mismatch, shunt, diffusion impairment).</li>
          <li>P/F ratio = PaO₂/FiO₂. Normal &gt;400. ARDS mild &lt;300, moderate &lt;200, severe &lt;100.</li>
        </ul>
      </div>
    </div>
  );
};

function SliderRow({ label, value, min, max, unit, onChange }: {
  label: React.ReactNode; value: number; min: number; max: number; unit: string; onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono font-semibold text-foreground">{value} {unit}</span>
      </div>
      <input
        type="range" min={min} max={max} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none bg-secondary cursor-pointer accent-primary"
      />
    </div>
  );
}

export { AlveolarGasEquationDiagram };
