import { useState } from "react";
import { createLinearScale } from "@/lib/diagram-scale";
import { DiagramFigure } from "./_shared/DiagramFigure";

const AlveolarGasEquationDiagram = () => {
  const [fio2, setFio2] = useState(21);
  const [paCO2, setPaCO2] = useState(5.3); // kPa (was 40 mmHg)
  const [patm, setPatm] = useState(101.3); // kPa (was 760 mmHg)
  const [rq, setRq] = useState(0.8);

  const pH2O = 6.3; // kPa (was 47 mmHg)
  const piO2 = (fio2 / 100) * (patm - pH2O);
  const paO2 = piO2 - paCO2 / rq;
  const expectedAa = 1.3; // kPa (was ~10 mmHg)
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
          P<sub>H₂O</sub> = 6.3 kPa at 37°C (saturated vapour pressure)
        </p>
      </div>

      {/* Sliders */}
      <div className="space-y-3">
        <SliderRow label="FiO₂" value={fio2} min={21} max={100} unit="%" step={1} onChange={setFio2} />
        <SliderRow label="PaCO₂" value={paCO2} min={2} max={10.7} unit="kPa" step={0.1} onChange={setPaCO2} />
        <SliderRow label={<>P<sub>atm</sub></>} value={patm} min={53} max={101.3} unit="kPa" step={0.1} onChange={setPatm} />
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
            {(fio2 / 100).toFixed(2)} × ({patm.toFixed(1)} − 6.3) = <span className="font-bold">{piO2.toFixed(1)} kPa</span>
          </p>
        </div>
        <div className="border-t border-border pt-3 text-center">
          <p className="text-xs text-muted-foreground">Step 2: Alveolar PO₂ (P<sub>A</sub>O₂)</p>
          <p className="text-sm font-mono text-foreground">
            {piO2.toFixed(1)} − {paCO2.toFixed(1)} / {rq.toFixed(1)} = <span className="font-bold">{paO2.toFixed(1)} kPa</span>
          </p>
        </div>
        <div className="border-t border-border pt-3 text-center">
          <p className="text-xs text-muted-foreground">Estimated PaO₂ (A-a gradient ~{expectedAa} kPa)</p>
          <p className={`text-2xl font-mono font-bold mt-1 ${estimatedPaO2 < 8 ? "text-destructive" : estimatedPaO2 < 10.7 ? "text-yellow-500" : "text-green-500"}`}>
            {estimatedPaO2.toFixed(1)} kPa
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
              { label: "Mitochondrial", value: Math.max(estimatedPaO2 - 7.3, 0.4) },
            ];
            const maxVal = Math.max(...stages.map(s => s.value), 1);
            const xScale = createLinearScale({ domain: [0, maxVal], range: [0, 300] });
            return stages.map((s, i) => {
              const barW = Math.max(xScale(s.value), 2);
              const y = 5 + i * 19;
              const color = s.value < 8 ? "hsl(0, 70%, 55%)" : s.value < 10.7 ? "hsl(35, 80%, 50%)" : "hsl(210, 70%, 55%)";
              return (
                <g key={i}>
                  <rect x="90" y={y} width={barW} height="14" rx="3" fill={color} opacity={0.7} />
                  <text x="85" y={y + 11} textAnchor="end" className="text-[8px] fill-muted-foreground">{s.label}</text>
                  <text x={93 + barW} y={y + 11} className="text-[8px] fill-foreground font-mono font-semibold">{s.value.toFixed(1)}</text>
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
          {patm < 80 && <li>Low atmospheric pressure — altitude effect. PAO₂ significantly reduced even with normal ventilation.</li>}
          {paCO2 > 6.7 && <li>Hypercapnia: elevated PaCO₂ displaces O₂ from the alveolus, reducing PAO₂.</li>}
          {fio2 > 60 && <li>High FiO₂: risk of absorption atelectasis and oxygen toxicity with prolonged use.</li>}
          {estimatedPaO2 < 8 && <li className="font-semibold text-destructive">Estimated PaO₂ &lt; 8 kPa — respiratory failure threshold (steep part of ODC).</li>}
          <li>Normal A-a gradient ≈ (Age/4 + 4) × 0.133 kPa (widens with V/Q mismatch, shunt, diffusion impairment).</li>
          <li>P/F ratio = PaO₂/FiO₂ (in kPa). Normal &gt;53. ARDS mild &lt;40, moderate &lt;26.7, severe &lt;13.3.</li>
        </ul>
      </div>
    </div>
  );
};

function SliderRow({ label, value, min, max, unit, step = 1, onChange }: {
  label: React.ReactNode; value: number; min: number; max: number; unit: string; step?: number; onChange: (v: number) => void;
}) {
  return (
    <DiagramFigure id="alveolar-gas-equation" title="Alveolar gas equation: PAO2 as a function of FiO2 and PaCO2" description="Sliders for FiO2 and PaCO2 illustrate how the alveolar gas equation predicts alveolar oxygen tension and the A–a gradient.">
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono font-semibold text-foreground">{step < 1 ? value.toFixed(1) : value} {unit}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none bg-secondary cursor-pointer accent-primary"
      />
    </div>
    </DiagramFigure>
  );
}

export { AlveolarGasEquationDiagram };
