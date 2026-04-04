import { useState } from "react";

type ViewMode = "overview" | "bohr" | "vq";

interface AlveolusData {
  label: string;
  ventilation: number;
  perfusion: number;
  vq: number;
  color: string;
  description: string;
}

const alveolarUnits: AlveolusData[] = [
  { label: "Dead Space", ventilation: 1, perfusion: 0, vq: Infinity, color: "hsl(var(--physiology))", description: "V/Q = ∞ — Ventilated but not perfused (e.g. PE, Zone 1)" },
  { label: "High V/Q", ventilation: 0.8, perfusion: 0.3, vq: 2.7, color: "hsl(210, 70%, 55%)", description: "V/Q > 1 — Relative over-ventilation (apical lung zones)" },
  { label: "Normal", ventilation: 0.6, perfusion: 0.6, vq: 1.0, color: "hsl(142, 60%, 45%)", description: "V/Q ≈ 1 — Ideal gas exchange (mid-lung zones)" },
  { label: "Low V/Q", ventilation: 0.3, perfusion: 0.8, vq: 0.4, color: "hsl(35, 80%, 50%)", description: "V/Q < 1 — Relative under-ventilation (basal zones)" },
  { label: "Shunt", ventilation: 0, perfusion: 1, vq: 0, color: "hsl(0, 70%, 55%)", description: "V/Q = 0 — Perfused but not ventilated (e.g. atelectasis)" },
];

const DeadSpaceDiagram = () => {
  const [view, setView] = useState<ViewMode>("overview");
  const [selectedUnit, setSelectedUnit] = useState<number | null>(null);
  const [highlightType, setHighlightType] = useState<"anatomical" | "alveolar" | "physiological" | null>(null);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Dead Space & V/Q Mismatch</h3>

      {/* View selector */}
      <div className="flex flex-wrap gap-2">
        {([
          { key: "overview" as ViewMode, label: "Dead Space Types" },
          { key: "bohr" as ViewMode, label: "Bohr Equation" },
          { key: "vq" as ViewMode, label: "V/Q Spectrum" },
        ]).map(({ key, label }) => (
          <button
            key={key}
            onClick={() => { setView(key); setHighlightType(null); setSelectedUnit(null); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              view === key
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {view === "overview" && <OverviewView highlightType={highlightType} setHighlightType={setHighlightType} />}
      {view === "bohr" && <BohrView />}
      {view === "vq" && <VQView selectedUnit={selectedUnit} setSelectedUnit={setSelectedUnit} />}
    </div>
  );
};

/* ─── Overview: Airway diagram with dead space types ─── */
function OverviewView({ highlightType, setHighlightType }: {
  highlightType: "anatomical" | "alveolar" | "physiological" | null;
  setHighlightType: (t: "anatomical" | "alveolar" | "physiological" | null) => void;
}) {
  const types = [
    { key: "anatomical" as const, label: "Anatomical", volume: "~150 ml", color: "hsl(210, 70%, 55%)", desc: "Conducting airways (nose → terminal bronchioles). No gas exchange. Measured by Fowler's method (N₂ washout)." },
    { key: "alveolar" as const, label: "Alveolar", volume: "~5 ml (normal)", color: "hsl(35, 80%, 50%)", desc: "Ventilated alveoli with no perfusion (V/Q = ∞). Minimal in health but increases with PE, high PEEP, or low cardiac output." },
    { key: "physiological" as const, label: "Physiological", volume: "~155 ml", color: "hsl(var(--physiology))", desc: "Anatomical + Alveolar dead space. Measured by the Bohr equation. Equals anatomical dead space in a healthy lung." },
  ];

  return (
    <div className="space-y-4">
      {/* Toggle buttons */}
      <div className="flex flex-wrap gap-2">
        {types.map(t => (
          <button
            key={t.key}
            onClick={() => setHighlightType(highlightType === t.key ? null : t.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
              highlightType === t.key
                ? "border-border shadow-sm text-foreground"
                : "border-transparent bg-secondary/50 text-muted-foreground hover:bg-secondary"
            }`}
            style={highlightType === t.key ? { backgroundColor: t.color + "20" } : {}}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* SVG Airway Diagram */}
      <svg viewBox="0 0 400 300" className="w-full max-w-md mx-auto">
        {/* Trachea */}
        <rect x="175" y="10" width="50" height="60" rx="6"
          fill={highlightType === "anatomical" || highlightType === "physiological" ? "hsl(210, 70%, 55%, 0.3)" : "hsl(var(--muted))"}
          stroke="hsl(var(--border))" strokeWidth="1.5" />
        <text x="200" y="45" textAnchor="middle" className="text-[10px] fill-foreground font-medium">Trachea</text>

        {/* Main bronchi */}
        <line x1="200" y1="70" x2="140" y2="110" stroke="hsl(var(--border))" strokeWidth="2" />
        <line x1="200" y1="70" x2="260" y2="110" stroke="hsl(var(--border))" strokeWidth="2" />
        <rect x="115" y="100" width="50" height="30" rx="4"
          fill={highlightType === "anatomical" || highlightType === "physiological" ? "hsl(210, 70%, 55%, 0.3)" : "hsl(var(--muted))"}
          stroke="hsl(var(--border))" strokeWidth="1.5" />
        <rect x="235" y="100" width="50" height="30" rx="4"
          fill={highlightType === "anatomical" || highlightType === "physiological" ? "hsl(210, 70%, 55%, 0.3)" : "hsl(var(--muted))"}
          stroke="hsl(var(--border))" strokeWidth="1.5" />
        <text x="140" y="119" textAnchor="middle" className="text-[8px] fill-foreground">Bronchi</text>
        <text x="260" y="119" textAnchor="middle" className="text-[8px] fill-foreground">Bronchi</text>

        {/* Bronchioles → alveoli left side */}
        <line x1="125" y1="130" x2="90" y2="165" stroke="hsl(var(--border))" strokeWidth="1.5" />
        <line x1="155" y1="130" x2="170" y2="165" stroke="hsl(var(--border))" strokeWidth="1.5" />

        {/* Normal perfused alveoli (left) */}
        <circle cx="80" cy="190" r="24"
          fill={highlightType === null ? "hsl(142, 60%, 45%, 0.15)" : highlightType === "anatomical" ? "hsl(var(--muted))" : "hsl(142, 60%, 45%, 0.15)"}
          stroke="hsl(142, 60%, 45%)" strokeWidth="1.5" />
        <text x="80" y="188" textAnchor="middle" className="text-[7px] fill-foreground font-medium">Normal</text>
        <text x="80" y="198" textAnchor="middle" className="text-[7px] fill-muted-foreground">V/Q ≈ 1</text>
        {/* Blood vessels */}
        <line x1="65" y1="214" x2="65" y2="240" stroke="hsl(0, 70%, 55%)" strokeWidth="2" strokeDasharray="3,2" />
        <line x1="95" y1="214" x2="95" y2="240" stroke="hsl(210, 70%, 55%)" strokeWidth="2" strokeDasharray="3,2" />

        <circle cx="170" cy="190" r="24"
          fill={highlightType === null ? "hsl(142, 60%, 45%, 0.15)" : highlightType === "anatomical" ? "hsl(var(--muted))" : "hsl(142, 60%, 45%, 0.15)"}
          stroke="hsl(142, 60%, 45%)" strokeWidth="1.5" />
        <text x="170" y="188" textAnchor="middle" className="text-[7px] fill-foreground font-medium">Normal</text>
        <text x="170" y="198" textAnchor="middle" className="text-[7px] fill-muted-foreground">V/Q ≈ 1</text>
        <line x1="155" y1="214" x2="155" y2="240" stroke="hsl(0, 70%, 55%)" strokeWidth="2" strokeDasharray="3,2" />
        <line x1="185" y1="214" x2="185" y2="240" stroke="hsl(210, 70%, 55%)" strokeWidth="2" strokeDasharray="3,2" />

        {/* Right side bronchioles */}
        <line x1="245" y1="130" x2="230" y2="165" stroke="hsl(var(--border))" strokeWidth="1.5" />
        <line x1="275" y1="130" x2="310" y2="165" stroke="hsl(var(--border))" strokeWidth="1.5" />

        {/* Alveolar dead space (right - no blood supply) */}
        <circle cx="230" cy="190" r="24"
          fill={highlightType === "alveolar" || highlightType === "physiological" ? "hsl(35, 80%, 50%, 0.25)" : "hsl(var(--muted), 0.3)"}
          stroke={highlightType === "alveolar" || highlightType === "physiological" ? "hsl(35, 80%, 50%)" : "hsl(var(--border))"}
          strokeWidth="1.5" strokeDasharray={highlightType === "alveolar" || highlightType === "physiological" ? "none" : "4,3"} />
        <text x="230" y="185" textAnchor="middle" className="text-[7px] fill-foreground font-medium">Alveolar</text>
        <text x="230" y="195" textAnchor="middle" className="text-[7px] fill-foreground font-medium">Dead Space</text>
        <text x="230" y="205" textAnchor="middle" className="text-[7px] fill-muted-foreground">V/Q = ∞</text>
        {/* X over vessels */}
        <line x1="220" y1="220" x2="240" y2="240" stroke="hsl(0, 70%, 55%)" strokeWidth="1.5" />
        <line x1="240" y1="220" x2="220" y2="240" stroke="hsl(0, 70%, 55%)" strokeWidth="1.5" />

        {/* Shunt (right) */}
        <circle cx="320" cy="190" r="24"
          fill="hsl(0, 70%, 55%, 0.1)"
          stroke="hsl(0, 70%, 55%)" strokeWidth="1.5" strokeDasharray="4,3" />
        <text x="320" y="185" textAnchor="middle" className="text-[7px] fill-foreground font-medium">Shunt</text>
        <text x="320" y="195" textAnchor="middle" className="text-[7px] fill-foreground font-medium">(no ventilation)</text>
        <text x="320" y="205" textAnchor="middle" className="text-[7px] fill-muted-foreground">V/Q = 0</text>
        <line x1="305" y1="214" x2="305" y2="250" stroke="hsl(0, 70%, 55%)" strokeWidth="2.5" />
        <line x1="335" y1="214" x2="335" y2="250" stroke="hsl(210, 70%, 55%)" strokeWidth="2.5" />

        {/* Legend */}
        <rect x="10" y="260" width="380" height="35" rx="4" fill="hsl(var(--muted))" opacity="0.4" />
        <circle cx="30" cy="278" r="5" fill="hsl(0, 70%, 55%)" opacity="0.6" />
        <text x="40" y="281" className="text-[8px] fill-muted-foreground">Deoxygenated blood</text>
        <circle cx="150" cy="278" r="5" fill="hsl(210, 70%, 55%)" opacity="0.6" />
        <text x="160" y="281" className="text-[8px] fill-muted-foreground">Oxygenated blood</text>
        <line x1="265" y1="275" x2="275" y2="282" stroke="hsl(0, 70%, 55%)" strokeWidth="1.5" />
        <line x1="275" y1="275" x2="265" y2="282" stroke="hsl(0, 70%, 55%)" strokeWidth="1.5" />
        <text x="282" y="281" className="text-[8px] fill-muted-foreground">No perfusion</text>
      </svg>

      {/* Info panel */}
      {highlightType && (
        <div className="bg-secondary/30 rounded-lg p-3 border border-border">
          <p className="text-sm font-semibold text-foreground capitalize">{highlightType} Dead Space</p>
          <p className="text-xs text-muted-foreground mt-1">
            {types.find(t => t.key === highlightType)?.desc}
          </p>
          <p className="text-xs font-medium text-foreground mt-2">
            Volume: {types.find(t => t.key === highlightType)?.volume}
          </p>
        </div>
      )}

      {!highlightType && (
        <p className="text-xs text-muted-foreground text-center">Tap a dead space type above to highlight it in the diagram</p>
      )}
    </div>
  );
}

const types = [
  { key: "anatomical" as const, label: "Anatomical", volume: "~150 ml", color: "hsl(210, 70%, 55%)", desc: "Conducting airways (nose → terminal bronchioles). No gas exchange. Measured by Fowler's method (N₂ washout)." },
  { key: "alveolar" as const, label: "Alveolar", volume: "~5 ml (normal)", color: "hsl(35, 80%, 50%)", desc: "Ventilated alveoli with no perfusion (V/Q = ∞). Minimal in health but increases with PE, high PEEP, or low cardiac output." },
  { key: "physiological" as const, label: "Physiological", volume: "~155 ml", color: "hsl(var(--physiology))", desc: "Anatomical + Alveolar dead space. Measured by the Bohr equation. Equals anatomical dead space in a healthy lung." },
];

/* ─── Bohr Equation ─── */
function BohrView() {
  const [paCO2, setPaCO2] = useState(5.3); // kPa
  const [peCO2, setPeCO2] = useState(3.7); // kPa
  const ratio = ((paCO2 - peCO2) / paCO2);

  return (
    <div className="space-y-4">
      {/* Equation display */}
      <div className="bg-secondary/30 rounded-xl p-4 border border-border text-center">
        <p className="text-xs text-muted-foreground mb-2">Bohr Equation</p>
        <p className="text-lg font-mono font-bold text-foreground">
          V<sub>D</sub>/V<sub>T</sub> = (PaCO₂ − P<sub>E</sub>CO₂) / PaCO₂
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Modified Enghoff: uses PaCO₂ (arterial) instead of PACO₂ (alveolar)
        </p>
      </div>

      {/* Interactive sliders */}
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">PaCO₂ (arterial)</span>
            <span className="font-mono font-semibold text-foreground">{paCO2.toFixed(1)} kPa</span>
          </div>
          <input
            type="range" min={3.3} max={8.0} step={0.1} value={paCO2}
            onChange={e => setPaCO2(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none bg-secondary cursor-pointer accent-primary"
          />
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-muted-foreground">P<sub>E</sub>CO₂ (mixed expired)</span>
            <span className="font-mono font-semibold text-foreground">{peCO2.toFixed(1)} kPa</span>
          </div>
          <input
            type="range" min={0.7} max={6.0} step={0.1} value={peCO2}
            onChange={e => setPeCO2(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none bg-secondary cursor-pointer accent-primary"
          />
        </div>
      </div>

      {/* Result */}
      <div className="bg-card rounded-xl border border-border p-4 text-center">
        <p className="text-xs text-muted-foreground">Dead Space Fraction (V<sub>D</sub>/V<sub>T</sub>)</p>
        <p className={`text-3xl font-mono font-bold mt-1 ${ratio > 0.4 ? "text-destructive" : ratio > 0.3 ? "text-yellow-500" : "text-green-500"}`}>
          {ratio.toFixed(2)}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Normal: 0.2–0.35 | With TV 500 ml → V<sub>D</sub> ≈ {Math.round(ratio * 500)} ml
        </p>
        <div className="mt-3 w-full bg-secondary rounded-full h-3 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${Math.min(ratio * 100, 100)}%`,
              backgroundColor: ratio > 0.4 ? "hsl(0, 70%, 55%)" : ratio > 0.3 ? "hsl(35, 80%, 50%)" : "hsl(142, 60%, 45%)"
            }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
          <span>0</span>
          <span>Normal (0.3)</span>
          <span>1.0</span>
        </div>
      </div>

      <div className="bg-secondary/30 rounded-lg p-3 border border-border">
        <p className="text-xs font-medium text-foreground">Clinical Significance</p>
        <p className="text-xs text-muted-foreground mt-1">
          {ratio > 0.5
            ? "Severely elevated dead space fraction. Seen in massive PE, ARDS, or cardiac arrest. Consider cause and adjust ventilation."
            : ratio > 0.35
            ? "Mildly elevated. May be seen with PE, high PEEP, low cardiac output, or age-related changes."
            : "Within normal range. Suggests efficient alveolar ventilation with good V/Q matching."}
        </p>
      </div>
    </div>
  );
}

/* ─── V/Q Spectrum ─── */
function VQView({ selectedUnit, setSelectedUnit }: { selectedUnit: number | null; setSelectedUnit: (i: number | null) => void }) {
  return (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">The V/Q spectrum ranges from shunt (V/Q=0) to dead space (V/Q=∞). Tap each unit to explore.</p>

      {/* Spectrum bar */}
      <svg viewBox="0 0 400 160" className="w-full">
        {alveolarUnits.map((unit, i) => {
          const x = 30 + i * 80;
          const isSelected = selectedUnit === i;
          const vBarH = unit.ventilation * 60;
          const qBarH = unit.perfusion * 60;
          return (
            <g key={i} onClick={() => setSelectedUnit(isSelected ? null : i)} className="cursor-pointer">
              {/* Background highlight */}
              {isSelected && <rect x={x - 15} y={5} width={60} height={150} rx="6" fill={unit.color} opacity={0.08} />}

              {/* V bar */}
              <rect x={x - 8} y={80 - vBarH} width={14} height={vBarH} rx="2"
                fill="hsl(210, 70%, 55%)" opacity={isSelected ? 1 : 0.5}
              />
              <text x={x - 1} y={75 - vBarH} textAnchor="middle" className="text-[8px] fill-muted-foreground">V</text>

              {/* Q bar */}
              <rect x={x + 10} y={80 - qBarH} width={14} height={qBarH} rx="2"
                fill="hsl(0, 70%, 55%)" opacity={isSelected ? 1 : 0.5}
              />
              <text x={x + 17} y={75 - qBarH} textAnchor="middle" className="text-[8px] fill-muted-foreground">Q</text>

              {/* Label */}
              <text x={x + 5} y={95} textAnchor="middle" className={`text-[9px] font-medium ${isSelected ? "fill-foreground" : "fill-muted-foreground"}`}>
                {unit.label}
              </text>
              <text x={x + 5} y={107} textAnchor="middle" className="text-[8px] fill-muted-foreground">
                {unit.vq === Infinity ? "V/Q=∞" : unit.vq === 0 ? "V/Q=0" : `V/Q=${unit.vq}`}
              </text>

              {/* Alveolus icon */}
              <circle cx={x + 5} cy={130} r={12} fill={unit.color} opacity={0.15} stroke={unit.color} strokeWidth={isSelected ? 2 : 1} />
              <circle cx={x + 5} cy={130} r={6} fill={unit.color} opacity={0.3} />
            </g>
          );
        })}

        {/* Spectrum arrow */}
        <line x1="30" y1="148" x2="370" y2="148" stroke="hsl(var(--border))" strokeWidth="1" markerEnd="url(#arrowDS)" />
        <defs>
          <marker id="arrowDS" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6" fill="hsl(var(--muted-foreground))" />
          </marker>
        </defs>
        <text x="30" y="158" className="text-[8px] fill-muted-foreground">Shunt</text>
        <text x="370" y="158" textAnchor="end" className="text-[8px] fill-muted-foreground">Dead Space</text>
      </svg>

      {/* Detail panel */}
      {selectedUnit !== null && (
        <div className="bg-secondary/30 rounded-lg p-3 border border-border" style={{ borderLeftColor: alveolarUnits[selectedUnit].color, borderLeftWidth: 3 }}>
          <p className="text-sm font-semibold text-foreground">{alveolarUnits[selectedUnit].label}</p>
          <p className="text-xs text-muted-foreground mt-1">{alveolarUnits[selectedUnit].description}</p>
          <div className="flex gap-4 mt-2">
            <div className="text-xs">
              <span className="text-muted-foreground">Ventilation: </span>
              <span className="font-mono font-semibold text-foreground">{alveolarUnits[selectedUnit].ventilation === 0 ? "None" : `${(alveolarUnits[selectedUnit].ventilation * 100).toFixed(0)}%`}</span>
            </div>
            <div className="text-xs">
              <span className="text-muted-foreground">Perfusion: </span>
              <span className="font-mono font-semibold text-foreground">{alveolarUnits[selectedUnit].perfusion === 0 ? "None" : `${(alveolarUnits[selectedUnit].perfusion * 100).toFixed(0)}%`}</span>
            </div>
          </div>
        </div>
      )}

      {selectedUnit === null && (
        <p className="text-xs text-muted-foreground text-center">Tap a unit above to see details</p>
      )}

      {/* Key relationships */}
      <div className="bg-secondary/30 rounded-lg p-3 border border-border">
        <p className="text-xs font-medium text-foreground">Key V/Q Relationships</p>
        <ul className="text-xs text-muted-foreground mt-1 space-y-1 list-disc list-inside">
          <li>Overall lung V/Q ≈ 0.8 (VA 4 L/min ÷ Q 5 L/min)</li>
          <li>Apex: V/Q ≈ 3.3 (relatively over-ventilated)</li>
          <li>Base: V/Q ≈ 0.6 (relatively over-perfused)</li>
          <li>Hypoxic pulmonary vasoconstriction (HPV) minimises V/Q mismatch</li>
        </ul>
      </div>
    </div>
  );
}

export { DeadSpaceDiagram };
