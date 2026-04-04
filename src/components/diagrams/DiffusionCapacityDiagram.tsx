import { useState } from "react";

const DiffusionCapacityDiagram = () => {
  const [view, setView] = useState<"fick" | "dlco" | "factors">("fick");
  const [thickness, setThickness] = useState(0.5); // μm
  const [area, setArea] = useState(70); // m²
  const [gradient, setGradient] = useState(8); // kPa (was 60 mmHg)
  const [solubility, setSolubility] = useState(1.0); // relative

  // Fick's law: Vgas = A × D × (P1-P2) / T
  // D = solubility / √MW
  const diffusionRate = (area * solubility * gradient) / (thickness * 10);
  const normalRate = (70 * 1.0 * 8) / (0.5 * 10);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground">Diffusion & Gas Transfer</h3>

      <div className="flex gap-2">
        {([
          { key: "fick" as const, label: "Fick's Law" },
          { key: "dlco" as const, label: "DLCO" },
          { key: "factors" as const, label: "Clinical Factors" },
        ]).map(v => (
          <button key={v.key} onClick={() => setView(v.key)}
            className={`flex-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-all ${
              view === v.key ? "bg-primary text-primary-foreground shadow-sm" : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
            }`}>
            {v.label}
          </button>
        ))}
      </div>

      {view === "fick" && (
        <FickView
          thickness={thickness} setThickness={setThickness}
          area={area} setArea={setArea}
          gradient={gradient} setGradient={setGradient}
          solubility={solubility} setSolubility={setSolubility}
          diffusionRate={diffusionRate} normalRate={normalRate}
        />
      )}
      {view === "dlco" && <DLCOView />}
      {view === "factors" && <FactorsView />}
    </div>
  );
};

/* ─── Fick's Law Interactive ─── */
function FickView({ thickness, setThickness, area, setArea, gradient, setGradient, solubility, setSolubility, diffusionRate, normalRate }: {
  thickness: number; setThickness: (v: number) => void;
  area: number; setArea: (v: number) => void;
  gradient: number; setGradient: (v: number) => void;
  solubility: number; setSolubility: (v: number) => void;
  diffusionRate: number; normalRate: number;
}) {
  const ratio = diffusionRate / normalRate;

  return (
    <div className="space-y-4">
      {/* Equation */}
      <div className="bg-secondary/30 rounded-xl p-4 border border-border text-center">
        <p className="text-xs text-muted-foreground mb-1">Fick's Law of Diffusion</p>
        <p className="text-base font-mono font-bold text-foreground">
          V̇<sub>gas</sub> = A × D × (P₁ − P₂) / T
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          D = Sol / √MW &nbsp;|&nbsp; CO₂ diffuses ~20× faster than O₂ (higher solubility)
        </p>
      </div>

      {/* Alveolar-capillary membrane SVG */}
      <svg viewBox="0 0 400 160" className="w-full">
        {/* Alveolus side */}
        <rect x="20" y="10" width="160" height="140" rx="10"
          fill="hsl(210, 70%, 55%)" opacity={0.06} stroke="hsl(210, 70%, 55%)" strokeWidth="1" />
        <text x="100" y="30" textAnchor="middle" className="text-[10px] fill-foreground font-semibold">Alveolus</text>
        <text x="100" y="45" textAnchor="middle" className="text-[8px] fill-muted-foreground">PAO₂ = {(8 + gradient).toFixed(1)} kPa</text>

        {/* O2 molecules */}
        {[55, 75, 95].map((y, i) => (
          <circle key={i} cx={140} cy={y + 15} r="4" fill="hsl(210, 70%, 55%)" opacity={0.5} />
        ))}

        {/* Membrane */}
        <rect x="185" y="10" width={Math.max(thickness * 60, 8)} height="140" rx="2"
          fill="hsl(35, 80%, 50%)" opacity={0.2} stroke="hsl(35, 80%, 50%)" strokeWidth="1.5" />
        <text x={185 + Math.max(thickness * 30, 4)} y="80" textAnchor="middle"
          className="text-[7px] fill-foreground font-medium" transform={`rotate(-90,${185 + Math.max(thickness * 30, 4)},80)`}>
          Membrane ({thickness.toFixed(1)} μm)
        </text>

        {/* Arrows through membrane */}
        {ratio > 0.2 && [50, 80, 110].map((y, i) => {
          const opacity = Math.min(ratio, 1) * 0.7;
          return (
            <line key={i} x1={185 + Math.max(thickness * 60, 8) - 5} y1={y} x2={185 + Math.max(thickness * 60, 8) + 20} y2={y}
              stroke="hsl(210, 70%, 55%)" strokeWidth={Math.max(ratio * 2, 0.5)} opacity={opacity}
              markerEnd="url(#diffArr)" />
          );
        })}

        {/* Capillary side */}
        <rect x={185 + Math.max(thickness * 60, 8) + 5} y="10" width={400 - 185 - Math.max(thickness * 60, 8) - 25} height="140" rx="10"
          fill="hsl(0, 70%, 55%)" opacity={0.06} stroke="hsl(0, 70%, 55%)" strokeWidth="1" />
        <text x={300 + thickness * 10} y="30" textAnchor="middle" className="text-[10px] fill-foreground font-semibold">Capillary</text>
        <text x={300 + thickness * 10} y="45" textAnchor="middle" className="text-[8px] fill-muted-foreground">PvO₂ = 40 mmHg</text>

        {/* RBCs */}
        {[60, 85, 110].map((y, i) => (
          <ellipse key={i} cx={320 + thickness * 5} cy={y} rx="12" ry="7"
            fill="hsl(0, 70%, 55%)" opacity={0.2} stroke="hsl(0, 70%, 55%)" strokeWidth="0.8" />
        ))}

        {/* CO2 going back */}
        <text x={250 + thickness * 15} y="145" textAnchor="middle" className="text-[7px] fill-muted-foreground">← CO₂ (20× faster)</text>

        <defs>
          <marker id="diffArr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6" fill="hsl(210, 70%, 55%)" />
          </marker>
        </defs>
      </svg>

      {/* Sliders */}
      <div className="bg-secondary/30 rounded-xl p-3 border border-border space-y-2">
        <Slider label="Membrane Thickness (T)" value={thickness} min={0.2} max={3.0} step={0.1} unit="μm" onChange={setThickness} />
        <Slider label="Surface Area (A)" value={area} min={10} max={100} step={1} unit="m²" onChange={setArea} />
        <Slider label="Pressure Gradient (ΔP)" value={gradient} min={5} max={100} step={1} unit="mmHg" onChange={setGradient} />
        <div>
          <div className="flex justify-between text-xs mb-0.5">
            <span className="text-muted-foreground">Gas Solubility</span>
            <span className="font-mono font-semibold text-foreground">{solubility === 1.0 ? "O₂ (1.0)" : solubility === 20 ? "CO₂ (20×)" : `${solubility.toFixed(1)}×`}</span>
          </div>
          <div className="flex gap-2">
            {[{ v: 1.0, l: "O₂" }, { v: 20, l: "CO₂" }].map(g => (
              <button key={g.v} onClick={() => setSolubility(g.v)}
                className={`flex-1 px-2 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  solubility === g.v ? "bg-primary text-primary-foreground shadow-sm" : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
                }`}>
                {g.l}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Diffusion rate result */}
      <div className="bg-card rounded-xl border border-border p-4 text-center">
        <p className="text-xs text-muted-foreground">Relative Diffusion Rate</p>
        <p className={`text-3xl font-mono font-bold mt-1 ${ratio < 0.5 ? "text-destructive" : ratio < 0.8 ? "text-yellow-500" : "text-green-500"}`}>
          {(ratio * 100).toFixed(0)}%
        </p>
        <div className="w-full bg-secondary rounded-full h-3 mt-2 overflow-hidden">
          <div className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${Math.min(ratio * 100, 100)}%`,
              backgroundColor: ratio < 0.5 ? "hsl(0, 70%, 55%)" : ratio < 0.8 ? "hsl(35, 80%, 50%)" : "hsl(142, 60%, 45%)"
            }} />
        </div>
        <p className="text-[10px] text-muted-foreground mt-1">Compared to normal (100%)</p>
      </div>

      <div className="bg-secondary/30 rounded-lg p-3 border border-border">
        <p className="text-xs font-medium text-foreground">Key Concepts</p>
        <ul className="text-xs text-muted-foreground mt-1 space-y-1 list-disc list-inside">
          <li>O₂ transfer is normally perfusion-limited (equilibrates in ~0.25s of 0.75s transit)</li>
          <li>Becomes diffusion-limited with: thickened membrane, ↓ area, exercise (↓ transit time)</li>
          <li>CO₂ transfer always perfusion-limited (20× more soluble than O₂)</li>
          <li>CO is entirely diffusion-limited → used to measure DLCO</li>
          <li>Normal membrane: type I pneumocyte + basement membranes + endothelium (0.2–0.5 μm)</li>
        </ul>
      </div>
    </div>
  );
}

/* ─── DLCO View ─── */
function DLCOView() {
  const [selected, setSelected] = useState<string | null>(null);

  const steps = [
    { label: "1. Inspire", desc: "Single breath of 0.3% CO + 10% He + 21% O₂ + balance N₂ to TLC" },
    { label: "2. Hold", desc: "10-second breath-hold at TLC — CO diffuses across membrane and binds Hb" },
    { label: "3. Expire", desc: "Discard first 750ml (dead space), collect alveolar sample" },
    { label: "4. Analyse", desc: "Measure CO and He in expired gas. He dilution gives alveolar volume (VA)" },
  ];

  const components = [
    { label: "DM", name: "Membrane conductance", desc: "Diffusion across alveolar-capillary membrane. Reduced by fibrosis, oedema, thickened membrane." },
    { label: "θ·Vc", name: "RBC uptake", desc: "Rate of CO-Hb binding (θ) × capillary blood volume (Vc). Reduced by anaemia, low Vc." },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-secondary/30 rounded-xl p-4 border border-border text-center">
        <p className="text-xs text-muted-foreground mb-1">DLCO (Transfer Factor, TLCO)</p>
        <p className="text-base font-mono font-bold text-foreground">
          1/DLCO = 1/DM + 1/(θ·Vc)
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Normal: 25–30 ml/min/mmHg | KCO = DLCO/VA (corrects for lung volume)
        </p>
      </div>

      {/* Method steps */}
      <div className="space-y-2">
        <p className="text-xs font-semibold text-foreground">Single-Breath Method</p>
        {steps.map((s, i) => (
          <div key={i} className="flex gap-2 items-start">
            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-[10px] font-bold text-primary">{i + 1}</span>
            </div>
            <div>
              <p className="text-xs font-medium text-foreground">{s.label}</p>
              <p className="text-[11px] text-muted-foreground">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Roughton-Forster */}
      <div>
        <p className="text-xs font-semibold text-foreground mb-2">Roughton-Forster Components</p>
        <div className="flex gap-2">
          {components.map(c => (
            <button key={c.label} onClick={() => setSelected(selected === c.label ? null : c.label)}
              className={`flex-1 px-3 py-3 rounded-lg text-center border transition-all ${
                selected === c.label ? "border-border bg-accent/50 shadow-sm" : "border-transparent bg-secondary/50"
              }`}>
              <p className="text-sm font-mono font-bold text-foreground">{c.label}</p>
              <p className="text-[10px] text-muted-foreground">{c.name}</p>
            </button>
          ))}
        </div>
        {selected && (
          <p className="text-xs text-muted-foreground mt-2 bg-secondary/30 rounded-lg p-2 border border-border">
            {components.find(c => c.label === selected)?.desc}
          </p>
        )}
      </div>

      <div className="bg-secondary/30 rounded-lg p-3 border border-border">
        <p className="text-xs font-medium text-foreground">Why CO?</p>
        <ul className="text-xs text-muted-foreground mt-1 space-y-1 list-disc list-inside">
          <li>CO binds Hb with 210× affinity of O₂ → back-pressure remains ~0 → purely diffusion-limited</li>
          <li>Helium doesn't diffuse across membrane → used for alveolar volume measurement</li>
          <li>CO uptake depends only on diffusion properties, not perfusion</li>
        </ul>
      </div>
    </div>
  );
}

/* ─── Clinical Factors ─── */
function FactorsView() {
  const [highlight, setHighlight] = useState<"increased" | "decreased" | null>(null);

  const increased = [
    { factor: "Exercise", mechanism: "↑ capillary recruitment, ↑ Vc, ↑ surface area" },
    { factor: "Supine position", mechanism: "↑ pulmonary blood volume and Vc" },
    { factor: "Polycythaemia", mechanism: "↑ Hb available for CO binding" },
    { factor: "Pulmonary haemorrhage", mechanism: "Extravasated Hb binds CO (falsely elevated)" },
    { factor: "Left-to-right shunt", mechanism: "↑ pulmonary blood flow and Vc" },
    { factor: "Asthma", mechanism: "↑ blood flow to ventilated areas (usually normal or slightly ↑)" },
  ];

  const decreased = [
    { factor: "Pulmonary fibrosis", mechanism: "↑ membrane thickness (↓ DM)" },
    { factor: "Emphysema", mechanism: "↓ surface area (destroyed alveoli)" },
    { factor: "Pulmonary embolism", mechanism: "↓ perfused capillary bed (↓ Vc)" },
    { factor: "Anaemia", mechanism: "↓ Hb for CO binding (↓ θ·Vc)" },
    { factor: "Pneumonectomy", mechanism: "↓ total surface area (KCO may be normal)" },
    { factor: "Pulmonary oedema", mechanism: "↑ diffusion distance (↓ DM)" },
    { factor: "High FiO₂", mechanism: "O₂ competes with CO for Hb binding" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button onClick={() => setHighlight(highlight === "increased" ? null : "increased")}
          className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all border ${
            highlight === "increased" ? "bg-green-500/10 border-green-500/30 text-green-600" : "border-transparent bg-secondary/50 text-muted-foreground hover:bg-secondary"
          }`}>
          ↑ Increased DLCO
        </button>
        <button onClick={() => setHighlight(highlight === "decreased" ? null : "decreased")}
          className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all border ${
            highlight === "decreased" ? "bg-destructive/10 border-destructive/30 text-destructive" : "border-transparent bg-secondary/50 text-muted-foreground hover:bg-secondary"
          }`}>
          ↓ Decreased DLCO
        </button>
      </div>

      {(highlight === "increased" || highlight === null) && (
        <div className="space-y-1.5">
          {(highlight === null ? increased.slice(0, 3) : increased).map((item, i) => (
            <div key={i} className="bg-green-500/5 rounded-lg p-2 border border-green-500/10">
              <p className="text-xs font-semibold text-foreground">↑ {item.factor}</p>
              <p className="text-[11px] text-muted-foreground">{item.mechanism}</p>
            </div>
          ))}
        </div>
      )}

      {(highlight === "decreased" || highlight === null) && (
        <div className="space-y-1.5">
          {(highlight === null ? decreased.slice(0, 3) : decreased).map((item, i) => (
            <div key={i} className="bg-destructive/5 rounded-lg p-2 border border-destructive/10">
              <p className="text-xs font-semibold text-foreground">↓ {item.factor}</p>
              <p className="text-[11px] text-muted-foreground">{item.mechanism}</p>
            </div>
          ))}
        </div>
      )}

      {highlight === null && <p className="text-xs text-muted-foreground text-center">Tap a category to see all factors</p>}

      {/* Distinguishing patterns */}
      <div className="bg-secondary/30 rounded-lg p-3 border border-border">
        <p className="text-xs font-medium text-foreground">DLCO vs KCO Patterns</p>
        <div className="mt-2 space-y-1">
          {[
            { pattern: "↓ DLCO, normal KCO", example: "Pneumonectomy — less lung but remaining lung normal" },
            { pattern: "↓ DLCO, ↓ KCO", example: "Emphysema, fibrosis — intrinsic gas transfer impairment" },
            { pattern: "↓ DLCO, ↑ KCO", example: "Extrapulmonary restriction (neuromuscular) — small VA but concentrated perfusion" },
            { pattern: "↑ DLCO", example: "Pulmonary haemorrhage, polycythaemia, L→R shunt" },
          ].map((p, i) => (
            <div key={i} className="flex gap-2 text-xs">
              <span className="font-mono font-semibold text-foreground whitespace-nowrap">{p.pattern}</span>
              <span className="text-muted-foreground">— {p.example}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Slider({ label, value, min, max, step, unit, onChange }: {
  label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (v: number) => void;
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

export { DiffusionCapacityDiagram };
