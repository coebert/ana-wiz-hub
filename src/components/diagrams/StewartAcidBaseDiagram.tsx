import { useState } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

type VariableKey = "sid" | "atot" | "pco2";

interface Variable {
  label: string;
  fullName: string;
  normal: number;
  unit: string;
  min: number;
  max: number;
  step: number;
  color: string;
  description: string;
  acidDirection: string;
  examples: string;
}

const variables: Record<VariableKey, Variable> = {
  sid: {
    label: "SID",
    fullName: "Strong Ion Difference",
    normal: 40,
    unit: "mEq/L",
    min: 20,
    max: 55,
    step: 1,
    color: "hsl(220, 65%, 55%)",
    description: "Difference between strong cations (Na⁺, K⁺, Ca²⁺, Mg²⁺) and strong anions (Cl⁻, lactate⁻). SID = [Na⁺] + [K⁺] − [Cl⁻] − [lactate⁻]",
    acidDirection: "↓SID → acidosis (e.g. hyperchloraemia, lactic acidosis). ↑SID → alkalosis (e.g. hypoalbuminaemia, vomiting).",
    examples: "Normal saline (SID=0) → ↓SID → hyperchloraemic acidosis. Hartmann's (SID=28) is more physiological.",
  },
  atot: {
    label: "Atot",
    fullName: "Total Weak Acids",
    normal: 17,
    unit: "mEq/L",
    min: 5,
    max: 25,
    step: 1,
    color: "hsl(45, 75%, 50%)",
    description: "Albumin and phosphate — the main non-volatile weak acids. Albumin contributes ~75% of Atot.",
    acidDirection: "↓Atot → alkalosis (hypoalbuminaemia). ↑Atot → acidosis (hyperphosphataemia in renal failure).",
    examples: "ICU patients with albumin 20 g/L have apparent metabolic alkalosis from ↓Atot — corrected anion gap needed.",
  },
  pco2: {
    label: "PaCO₂",
    fullName: "Partial Pressure of CO₂",
    normal: 40,
    unit: "mmHg",
    min: 15,
    max: 80,
    step: 1,
    color: "hsl(0, 60%, 55%)",
    description: "Respiratory component. CO₂ + H₂O ↔ H₂CO₃ ↔ H⁺ + HCO₃⁻. Controlled by alveolar ventilation.",
    acidDirection: "↑PaCO₂ → respiratory acidosis. ↓PaCO₂ → respiratory alkalosis.",
    examples: "Hypoventilation (opioids, COPD) → ↑PaCO₂. Hyperventilation (anxiety, PE, pregnancy) → ↓PaCO₂.",
  },
};

const variableOrder: VariableKey[] = ["sid", "atot", "pco2"];

// Simplified Henderson-Hasselbalch-Stewart pH calculation
function calculatepH(sid: number, atot: number, pco2: number): number {
  // Simplified: pH ≈ 6.1 + log10((SID - Atot/2) / (0.03 * pCO2))
  const bicarb = Math.max(1, sid - atot * 0.4);
  const ph = 6.1 + Math.log10(bicarb / (0.03 * pco2));
  return Math.min(7.8, Math.max(6.8, ph));
}

const StewartAcidBaseDiagram = () => {
  const [values, setValues] = useState<Record<VariableKey, number>>({
    sid: 40,
    atot: 17,
    pco2: 40,
  });
  const [selected, setSelected] = useState<VariableKey>("sid");

  const pH = calculatepH(values.sid, values.atot, values.pco2);
  const phColor = pH < 7.35 ? "hsl(0, 70%, 50%)" : pH > 7.45 ? "hsl(260, 60%, 55%)" : "hsl(145, 55%, 42%)";
  const phLabel = pH < 7.35 ? "Acidaemia" : pH > 7.45 ? "Alkalaemia" : "Normal";

  const info = variables[selected];

  return (
    <DiagramFigure
      id="stewart-acid-base-diagram"
      title="Stewart acid base"
      description="Auto-generated wrapper for the Stewart acid base anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
          <div className="border border-border rounded-lg p-4 mb-6">
        <h3 className="text-lg font-serif font-bold text-foreground mb-1">Stewart Approach to Acid-Base</h3>
        <p className="text-xs text-muted-foreground mb-4">Adjust the three independent variables to see their effect on pH</p>
  
        {/* pH display */}
        <div className="text-center mb-5 p-4 rounded-lg border border-border">
          <p className="text-xs text-muted-foreground">Calculated pH</p>
          <p className="text-4xl font-bold font-mono" style={{ color: phColor }}>{pH.toFixed(2)}</p>
          <p className="text-sm font-semibold" style={{ color: phColor }}>{phLabel}</p>
          <div className="mt-2 h-2 rounded-full bg-secondary overflow-hidden max-w-xs mx-auto">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${((pH - 6.8) / 1.0) * 100}%`,
                background: `linear-gradient(90deg, hsl(0, 70%, 50%), hsl(145, 55%, 42%) 55%, hsl(260, 60%, 55%))`,
              }}
            />
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground max-w-xs mx-auto mt-1">
            <span>6.80</span><span>7.35</span><span>7.45</span><span>7.80</span>
          </div>
        </div>
  
        {/* Variable sliders */}
        <div className="space-y-4 mb-5">
          {variableOrder.map((key) => {
            const v = variables[key];
            const val = values[key];
            const isNormal = Math.abs(val - v.normal) <= v.step;
            return (
                  <button
                key={key}
                onClick={() => setSelected(key)}
                className={`w-full text-left p-3 rounded-lg border transition-all ${selected === key ? "border-2" : ""}`}
                style={{ borderColor: selected === key ? v.color : "hsl(var(--border))" }}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-bold" style={{ color: v.color }}>{v.label}</span>
                  <span className={`text-sm font-mono font-bold ${isNormal ? "text-foreground" : ""}`} style={!isNormal ? { color: v.color } : {}}>
                    {val} {v.unit}
                  </span>
                </div>
                <input
                  type="range"
                  min={v.min}
                  max={v.max}
                  step={v.step}
                  value={val}
                  onChange={(e) => {
                    e.stopPropagation();
                    setValues({ ...values, [key]: Number(e.target.value) });
                  }}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(90deg, ${v.color} ${((val - v.min) / (v.max - v.min)) * 100}%, hsl(var(--muted)) ${((val - v.min) / (v.max - v.min)) * 100}%)`,
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
                <div className="flex justify-between text-[10px] text-muted-foreground mt-0.5">
                  <span>{v.min}</span>
                  <span className="font-medium">Normal: {v.normal}</span>
                  <span>{v.max}</span>
                </div>
              </button>
    );
          })}
        </div>
  
        {/* Reset button */}
        <div className="text-center mb-4">
          <button
            onClick={() => setValues({ sid: 40, atot: 17, pco2: 40 })}
            className="text-xs text-muted-foreground hover:text-foreground border border-border px-3 py-1 rounded transition-colors"
          >
            Reset to normal
          </button>
        </div>
  
        {/* Detail card */}
        <div className="p-4 rounded-lg border border-border animate-fade-in" key={selected}>
          <p className="font-bold text-sm" style={{ color: info.color }}>{info.fullName} ({info.label})</p>
          <p className="text-sm text-muted-foreground mt-1">{info.description}</p>
          <p className="text-xs text-muted-foreground mt-2"><strong className="text-foreground">Effect:</strong> {info.acidDirection}</p>
          <p className="text-xs text-primary mt-2 font-medium">Clinical: {info.examples}</p>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default StewartAcidBaseDiagram;
