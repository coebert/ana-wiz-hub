import { useState } from "react";

type Tab = "si-units" | "gas-laws" | "heat" | "thermodynamics" | "phase-change" | "specific-heat" | "pv-diagrams";

const tabs: { key: Tab; label: string }[] = [
  { key: "si-units", label: "SI Units" },
  { key: "gas-laws", label: "Gas Laws" },
  { key: "heat", label: "Heat & Capacity" },
  { key: "thermodynamics", label: "Thermo Laws" },
  { key: "phase-change", label: "Phase Changes" },
  { key: "specific-heat", label: "Specific Heat" },
  { key: "pv-diagrams", label: "PV Diagrams" },
];

const SIUnitsDiagram = () => (
  <div className="space-y-4">
    <h4 className="font-semibold text-foreground">SI Base & Derived Units</h4>
    <div className="bg-secondary/30 rounded-xl p-5 border border-border">
      <svg viewBox="0 0 600 420" className="w-full h-auto">
        <text x="300" y="20" textAnchor="middle" className="fill-foreground text-[13px] font-bold">7 SI Base Units</text>
        {[
          { unit: "metre", sym: "m", quantity: "Length", x: 60, y: 45 },
          { unit: "kilogram", sym: "kg", quantity: "Mass", x: 200, y: 45 },
          { unit: "second", sym: "s", quantity: "Time", x: 340, y: 45 },
          { unit: "ampere", sym: "A", quantity: "Electric current", x: 480, y: 45 },
          { unit: "kelvin", sym: "K", quantity: "Temperature", x: 100, y: 115 },
          { unit: "mole", sym: "mol", quantity: "Amount", x: 300, y: 115 },
          { unit: "candela", sym: "cd", quantity: "Luminous intensity", x: 490, y: 115 },
        ].map((u) => (
          <g key={u.sym}>
            <rect x={u.x - 55} y={u.y} width="110" height="52" rx="8" fill="hsl(var(--primary)/0.1)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
            <text x={u.x} y={u.y + 20} textAnchor="middle" className="fill-primary text-[14px] font-bold">{u.sym}</text>
            <text x={u.x} y={u.y + 35} textAnchor="middle" className="fill-foreground text-[9px] font-medium">{u.unit}</text>
            <text x={u.x} y={u.y + 47} textAnchor="middle" className="fill-muted-foreground text-[8px]">{u.quantity}</text>
          </g>
        ))}
        <text x="300" y="195" textAnchor="middle" className="fill-foreground text-[12px] font-bold">Key Derived Units in Anaesthesia</text>
        {[
          { unit: "Pascal (Pa)", def: "N/m²", use: "Pressure (1 atm = 101.3 kPa)" },
          { unit: "Joule (J)", def: "N·m", use: "Energy, work, heat" },
          { unit: "Watt (W)", def: "J/s", use: "Power" },
          { unit: "Newton (N)", def: "kg·m·s⁻²", use: "Force" },
          { unit: "Hertz (Hz)", def: "s⁻¹", use: "Frequency" },
          { unit: "Volt (V)", def: "W/A", use: "Electrical potential" },
          { unit: "Ohm", def: "V/A", use: "Electrical resistance" },
        ].map((d, i) => (
          <g key={d.unit}>
            <rect x="30" y={210 + i * 26} width="540" height="24" rx="4" fill={i % 2 === 0 ? "hsl(var(--secondary)/0.2)" : "transparent"} />
            <text x="45" y={226 + i * 26} className="fill-foreground text-[10px] font-medium">{d.unit}</text>
            <text x="230" y={226 + i * 26} textAnchor="middle" className="fill-primary text-[9.5px]">{d.def}</text>
            <text x="430" y={226 + i * 26} textAnchor="middle" className="fill-muted-foreground text-[9.5px]">{d.use}</text>
          </g>
        ))}
        <text x="300" y="410" textAnchor="middle" className="fill-foreground text-[10px] font-semibold">1 atm = 101.3 kPa = 760 mmHg = 1013 cmH₂O = 14.7 psi</text>
      </svg>
    </div>
  </div>
);

const GasLawDerivationsDiagram = () => (
  <div className="space-y-4">
    <h4 className="font-semibold text-foreground">Gas Law Derivations & Relationships</h4>
    <div className="bg-secondary/30 rounded-xl p-5 border border-border">
      <svg viewBox="0 0 600 520" className="w-full h-auto">
        <rect x="180" y="10" width="240" height="50" rx="10" fill="hsl(var(--primary)/0.15)" stroke="hsl(var(--primary))" strokeWidth="2" />
        <text x="300" y="35" textAnchor="middle" className="fill-primary text-[15px] font-bold">PV = nRT</text>
        <text x="300" y="50" textAnchor="middle" className="fill-muted-foreground text-[8px]">Ideal Gas Equation (all laws derive from this)</text>
        {[
          { law: "Boyle's Law", eq: "P₁V₁ = P₂V₂", cond: "Constant T, n", app: "Pneumothorax at altitude", x: 20, y: 85 },
          { law: "Charles' Law", eq: "V₁/T₁ = V₂/T₂", cond: "Constant P, n", app: "Spirometry BTPS correction", x: 310, y: 85 },
          { law: "Gay-Lussac's", eq: "P₁/T₁ = P₂/T₂", cond: "Constant V, n", app: "Cylinder pressure in fire", x: 20, y: 175 },
          { law: "Avogadro's", eq: "V ∝ n", cond: "Constant T, P", app: "1 mol gas = 22.4 L at STP", x: 310, y: 175 },
        ].map((l) => (
          <g key={l.law}>
            <rect x={l.x} y={l.y} width="270" height="75" rx="8" fill="hsl(var(--primary)/0.08)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
            <text x={l.x + 135} y={l.y + 18} textAnchor="middle" className="fill-foreground text-[11px] font-bold">{l.law}</text>
            <text x={l.x + 135} y={l.y + 36} textAnchor="middle" className="fill-primary text-[13px] font-bold">{l.eq}</text>
            <text x={l.x + 135} y={l.y + 52} textAnchor="middle" className="fill-muted-foreground text-[9px]">{l.cond}</text>
            <text x={l.x + 135} y={l.y + 66} textAnchor="middle" className="fill-muted-foreground text-[8px]">{l.app}</text>
          </g>
        ))}
        <text x="300" y="280" textAnchor="middle" className="fill-foreground text-[12px] font-bold">Additional Gas Laws</text>
        {[
          { law: "Dalton's Law", eq: "Ptotal = P₁ + P₂ + ...", desc: "Total pressure = sum of partial pressures" },
          { law: "Henry's Law", eq: "C = k × P", desc: "Dissolved amount ∝ partial pressure × solubility" },
          { law: "Graham's Law", eq: "Rate ∝ 1/√MW", desc: "Diffusion rate inversely ∝ √molecular weight" },
          { law: "Fick's Law", eq: "J = −D·A·(ΔC/Δx)", desc: "Diffusion flux ∝ area × gradient / thickness" },
          { law: "Hagen-Poiseuille", eq: "Q = πr⁴ΔP/8ηL", desc: "Laminar flow ∝ r⁴; radius is dominant factor" },
          { law: "Reynolds Number", eq: "Re = ρvd/η", desc: "Re > 2000 → turbulent flow" },
        ].map((l, i) => (
          <g key={l.law}>
            <rect x="20" y={295 + i * 35} width="560" height="32" rx="6" fill={i % 2 === 0 ? "hsl(var(--secondary)/0.2)" : "transparent"} />
            <text x="35" y={315 + i * 35} className="fill-primary text-[10px] font-bold">{l.law}</text>
            <text x="165" y={315 + i * 35} className="fill-foreground text-[9.5px] font-medium">{l.eq}</text>
            <text x="350" y={315 + i * 35} className="fill-muted-foreground text-[8.5px]">{l.desc}</text>
          </g>
        ))}
      </svg>
    </div>
  </div>
);

const HeatCapacityDiagram = () => (
  <div className="space-y-4">
    <h4 className="font-semibold text-foreground">Heat, Latent Heat & Specific Heat Capacity</h4>
    <div className="bg-secondary/30 rounded-xl p-5 border border-border">
      <svg viewBox="0 0 600 450" className="w-full h-auto">
        <text x="300" y="20" textAnchor="middle" className="fill-foreground text-[13px] font-bold">Heating Curve — Temperature vs Energy Added</text>
        <rect x="40" y="30" width="520" height="200" rx="8" fill="hsl(var(--secondary)/0.2)" stroke="hsl(var(--border))" strokeWidth="1" />
        <line x1="70" y1="210" x2="540" y2="210" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <line x1="70" y1="50" x2="70" y2="210" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <text x="305" y="225" textAnchor="middle" className="fill-muted-foreground text-[9px]">Heat energy added →</text>
        <text x="40" y="130" textAnchor="middle" className="fill-muted-foreground text-[9px]" transform="rotate(-90 40 130)">Temperature →</text>
        <path d="M 70 200 L 150 160 L 250 160 L 330 100 L 430 100 L 530 55" fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5" />
        <text x="110" y="195" textAnchor="middle" className="fill-foreground text-[9px] font-medium">Solid</text>
        <text x="200" y="152" textAnchor="middle" className="fill-destructive text-[9px] font-bold">Melting</text>
        <text x="200" y="175" textAnchor="middle" className="fill-muted-foreground text-[7px]">(Latent heat of fusion)</text>
        <text x="290" y="140" textAnchor="middle" className="fill-foreground text-[9px] font-medium">Liquid</text>
        <text x="380" y="92" textAnchor="middle" className="fill-destructive text-[9px] font-bold">Boiling</text>
        <text x="380" y="115" textAnchor="middle" className="fill-muted-foreground text-[7px]">(Latent heat of vaporisation)</text>
        <text x="490" y="80" textAnchor="middle" className="fill-foreground text-[9px] font-medium">Gas</text>
        <text x="20" y="255" className="fill-foreground text-[12px] font-bold">Key Equations</text>
        {[
          { name: "Specific Heat Capacity", eq: "Q = mcΔT", desc: "Water: 4.18 kJ/kg/K — highest of common liquids" },
          { name: "Latent Heat of Vaporisation", eq: "Q = mL", desc: "Water: 2260 kJ/kg — drives evaporative cooling" },
          { name: "Latent Heat of Fusion", eq: "Q = mLf", desc: "Water: 334 kJ/kg — phase change without temp change" },
        ].map((e, i) => (
          <g key={e.name}>
            <rect x="20" y={265 + i * 50} width="560" height="45" rx="8" fill="hsl(var(--primary)/0.06)" stroke="hsl(var(--primary))" strokeWidth="1" />
            <text x="35" y={282 + i * 50} className="fill-foreground text-[10px] font-bold">{e.name}</text>
            <text x="35" y={298 + i * 50} className="fill-primary text-[11px] font-bold">{e.eq}</text>
            <text x="150" y={298 + i * 50} className="fill-muted-foreground text-[9px]">{e.desc}</text>
          </g>
        ))}
      </svg>
    </div>
  </div>
);

const ThermodynamicsDiagram = () => (
  <div className="space-y-4">
    <h4 className="font-semibold text-foreground">Laws of Thermodynamics</h4>
    <div className="bg-secondary/30 rounded-xl p-5 border border-border">
      <svg viewBox="0 0 600 480" className="w-full h-auto">
        <text x="300" y="22" textAnchor="middle" className="fill-foreground text-[14px] font-bold">The Laws of Thermodynamics</text>
        {[
          { law: "Zeroth Law", statement: "If A equilibrium with C, and B with C, then A and B in equilibrium.", clinical: "Basis of temperature measurement", colour: "accent", y: 35 },
          { law: "First Law", statement: "Energy conserved: ΔU = Q − W. Cannot create or destroy energy.", clinical: "Adiabatic gas expansion causes cooling (regulators, cryotherapy)", colour: "primary", y: 145 },
          { law: "Second Law", statement: "Heat flows spontaneously hot → cold. Entropy always increases.", clinical: "Patient heat loss to cold theatre environment", colour: "destructive", y: 255 },
          { law: "Third Law", statement: "Entropy → 0 as temperature → absolute zero (0 K = −273.15°C).", clinical: "Defines Kelvin scale used in gas law calculations", colour: "primary", y: 365 },
        ].map((l) => (
          <g key={l.law}>
            <rect x="20" y={l.y} width="560" height="95" rx="10" fill={`hsl(var(--${l.colour})/0.06)`} stroke={`hsl(var(--${l.colour}))`} strokeWidth="1.5" />
            <text x="300" y={l.y + 20} textAnchor="middle" className="fill-foreground text-[13px] font-bold">{l.law}</text>
            <text x="35" y={l.y + 45} className="fill-foreground text-[9.5px]">{l.statement}</text>
            <text x="35" y={l.y + 70} className="fill-muted-foreground text-[9px] font-medium">Clinical: {l.clinical}</text>
          </g>
        ))}
      </svg>
    </div>
  </div>
);

/* ─── NEW INTERACTIVE TABS ─── */

const PhaseChangeDiagram = () => {
  const [selectedSubstance, setSelectedSubstance] = useState<"water" | "sevoflurane" | "n2o">("water");

  const substances = {
    water: {
      name: "Water (H₂O)", mp: "0°C", bp: "100°C",
      lf: "334 kJ/kg", lv: "2260 kJ/kg", shc: "4.18 kJ/kg/K",
      clinical: "High SHC provides thermal stability. High Lv makes evaporation dominant intraop heat loss.",
      points: "M 80 270 L 150 230 L 230 230 L 310 150 L 420 150 L 520 80",
      meltX: 190, boilX: 365, meltY: 230, boilY: 150,
    },
    sevoflurane: {
      name: "Sevoflurane", mp: "−118°C", bp: "58.6°C",
      lf: "~60 kJ/kg", lv: "160 kJ/kg", shc: "~0.9 kJ/kg/K",
      clinical: "Low BP = significant vaporisation at room temp. Cooling requires temperature compensation in vaporizer.",
      points: "M 80 265 L 110 255 L 130 255 L 210 145 L 420 145 L 520 75",
      meltX: 120, boilX: 315, meltY: 255, boilY: 145,
    },
    n2o: {
      name: "Nitrous Oxide (N₂O)", mp: "−91°C", bp: "−88°C",
      lf: "~148 kJ/kg", lv: "376 kJ/kg", shc: "~0.88 kJ/kg/K",
      clinical: "Critical temp 36.5°C — stored as liquid at room temp. Gauge unreliable until liquid exhausted.",
      points: "M 80 265 L 100 250 L 120 250 L 145 155 L 260 155 L 520 65",
      meltX: 110, boilX: 200, meltY: 250, boilY: 155,
    },
  };

  const s = substances[selectedSubstance];

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-foreground">Interactive Phase Change Curves</h4>
      <p className="text-sm text-muted-foreground">Select a substance to compare heating curves, phase transitions, and clinical relevance.</p>
      <div className="flex flex-wrap gap-2">
        {(Object.keys(substances) as Array<keyof typeof substances>).map((key) => (
          <button
            key={key}
            onClick={() => setSelectedSubstance(key)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              selectedSubstance === key ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-secondary/80"
            }`}
          >
            {substances[key].name}
          </button>
        ))}
      </div>
      <div className="bg-secondary/30 rounded-xl p-5 border border-border">
        <svg viewBox="0 0 600 420" className="w-full h-auto">
          <text x="300" y="22" textAnchor="middle" className="fill-foreground text-[13px] font-bold">
            Heating Curve — {s.name}
          </text>

          <rect x="60" y="40" width="480" height="250" rx="6" fill="hsl(var(--secondary)/0.15)" stroke="hsl(var(--border))" strokeWidth="1" />

          {/* Axes */}
          <line x1="80" y1="280" x2="530" y2="280" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
          <line x1="80" y1="55" x2="80" y2="280" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
          <text x="305" y="298" textAnchor="middle" className="fill-muted-foreground text-[9px]">Heat energy added (Q) →</text>
          <text x="48" y="170" textAnchor="middle" className="fill-muted-foreground text-[9px]" transform="rotate(-90 48 170)">Temperature →</text>

          {/* Heating curve with animation */}
          <path d={s.points} fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Phase labels */}
          <text x={s.meltX} y={s.meltY - 12} textAnchor="middle" className="fill-destructive text-[9px] font-bold">Melting</text>
          <text x={s.meltX} y={s.meltY + 18} textAnchor="middle" className="fill-muted-foreground text-[7.5px]">Lf = {s.lf}</text>
          <text x={s.boilX} y={s.boilY - 12} textAnchor="middle" className="fill-destructive text-[9px] font-bold">Boiling</text>
          <text x={s.boilX} y={s.boilY + 18} textAnchor="middle" className="fill-muted-foreground text-[7.5px]">Lv = {s.lv}</text>

          {/* Temperature markers */}
          <text x="75" y={s.meltY + 4} textAnchor="end" className="fill-primary text-[8px] font-medium">{s.mp}</text>
          <text x="75" y={s.boilY + 4} textAnchor="end" className="fill-primary text-[8px] font-medium">{s.bp}</text>
          <line x1="78" y1={s.meltY} x2={s.meltX - 30} y2={s.meltY} stroke="hsl(var(--primary)/0.3)" strokeWidth="0.5" strokeDasharray="3 2" />
          <line x1="78" y1={s.boilY} x2={s.boilX - 30} y2={s.boilY} stroke="hsl(var(--primary)/0.3)" strokeWidth="0.5" strokeDasharray="3 2" />

          {/* Phase regions */}
          <text x="95" y="268" className="fill-foreground text-[9px] font-medium">Solid</text>
          <text x={(s.meltX + s.boilX) / 2} y={((s.meltY + s.boilY) / 2) + 25} textAnchor="middle" className="fill-foreground text-[9px] font-medium">Liquid</text>
          <text x="480" y="95" textAnchor="middle" className="fill-foreground text-[9px] font-medium">Gas</text>

          {/* Info panel */}
          <rect x="60" y="310" width="480" height="100" rx="8" fill="hsl(var(--primary)/0.06)" stroke="hsl(var(--primary)/0.3)" strokeWidth="1" />
          <text x="80" y="332" className="fill-foreground text-[10px] font-bold">SHC: {s.shc}</text>
          <text x="230" y="332" className="fill-foreground text-[10px] font-bold">MP: {s.mp}</text>
          <text x="350" y="332" className="fill-foreground text-[10px] font-bold">BP: {s.bp}</text>
          <text x="80" y="355" className="fill-muted-foreground text-[9px]">{s.clinical.substring(0, 85)}</text>
          {s.clinical.length > 85 && (
            <text x="80" y="372" className="fill-muted-foreground text-[9px]">{s.clinical.substring(85)}</text>
          )}
          <text x="80" y="398" className="fill-foreground text-[8px] font-medium">Key: Flat regions = phase change (latent heat absorbed, no temp change). Sloped = heating (Q = mcΔT)</text>
        </svg>
      </div>
    </div>
  );
};

const SpecificHeatDiagram = () => {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);

  const materials = [
    { name: "Water", shc: 4.18, colour: "hsl(210,80%,55%)", clinical: "Body is ~60% water. High SHC provides thermal buffering. Excellent warming/cooling medium." },
    { name: "Blood", shc: 3.6, colour: "hsl(0,65%,50%)", clinical: "Warm IV fluids & blood products to prevent hypothermia. Lower SHC than water due to proteins/cells." },
    { name: "Body tissue", shc: 3.5, colour: "hsl(30,60%,55%)", clinical: "Average of fat, muscle, bone. Determines rate of core temperature change during surgery." },
    { name: "Ethanol", shc: 2.44, colour: "hsl(280,50%,55%)", clinical: "Rapid evaporation adds latent heat loss to conductive cooling. Used historically for skin cooling." },
    { name: "Aluminium", shc: 0.9, colour: "hsl(200,15%,60%)", clinical: "High conductivity + low SHC = rapid equilibration. Used in heat exchangers and warming devices." },
    { name: "Soda lime", shc: 0.84, colour: "hsl(80,40%,50%)", clinical: "Exothermic CO₂ absorption generates heat, warming inspired gases in the circle system." },
    { name: "Steel", shc: 0.5, colour: "hsl(220,10%,50%)", clinical: "Surgical instruments, laryngoscopes. Feels cold due to high thermal conductivity." },
    { name: "Copper", shc: 0.39, colour: "hsl(25,80%,50%)", clinical: "Excellent conductor used as heat sink in vaporizers to maintain stable temperature output." },
  ];

  const maxSHC = 4.5;
  const barAreaWidth = 350;
  const barH = 26;

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-foreground">Specific Heat Capacity Comparison</h4>
      <p className="text-sm text-muted-foreground">Hover/tap each bar to see why it matters clinically. Water's high SHC underpins thermoregulation.</p>
      <div className="bg-secondary/30 rounded-xl p-5 border border-border">
        <svg viewBox="0 0 600 400" className="w-full h-auto">
          <text x="300" y="22" textAnchor="middle" className="fill-foreground text-[13px] font-bold">
            Specific Heat Capacity (kJ/kg/K)
          </text>

          {materials.map((m, i) => {
            const barW = (m.shc / maxSHC) * barAreaWidth;
            const y = 42 + i * 36;
            const isHovered = hoveredBar === i;
            return (
              <g
                key={m.name}
                onMouseEnter={() => setHoveredBar(i)}
                onMouseLeave={() => setHoveredBar(null)}
                onClick={() => setHoveredBar(hoveredBar === i ? null : i)}
                className="cursor-pointer"
              >
                <text x="130" y={y + 18} textAnchor="end" className="fill-foreground text-[10px] font-medium">{m.name}</text>
                <rect x="138" y={y + 3} width={barAreaWidth} height={barH} rx="4" fill="hsl(var(--secondary)/0.15)" />
                <rect
                  x="138" y={y + 3}
                  width={barW} height={barH} rx="4"
                  fill={m.colour}
                  opacity={isHovered ? 1 : 0.65}
                  className="transition-opacity duration-200"
                />
                <text x={140 + barW + 6} y={y + 20} className="fill-foreground text-[10px] font-bold">{m.shc}</text>
                {isHovered && (
                  <rect x="136" y={y + 1} width={barAreaWidth + 4} height={barH + 4} rx="6" fill="none" stroke={m.colour} strokeWidth="2" />
                )}
              </g>
            );
          })}

          {/* Detail panel */}
          <rect x="30" y="340" width="540" height="50" rx="8" fill="hsl(var(--primary)/0.06)" stroke="hsl(var(--primary)/0.2)" strokeWidth="1" />
          {hoveredBar !== null ? (
            <>
              <text x="50" y="360" className="fill-foreground text-[10px] font-bold">{materials[hoveredBar].name}</text>
              <text x="50" y="378" className="fill-muted-foreground text-[9px]">{materials[hoveredBar].clinical}</text>
            </>
          ) : (
            <text x="300" y="370" textAnchor="middle" className="fill-muted-foreground text-[9px] italic">
              Tap or hover a bar to see clinical relevance
            </text>
          )}
        </svg>
      </div>
    </div>
  );
};

const PVDiagramsTab = () => {
  const [selectedProcess, setSelectedProcess] = useState<"isothermal" | "adiabatic" | "isobaric" | "isochoric" | "all">("all");

  const processes = [
    {
      key: "isothermal" as const, label: "Isothermal",
      desc: "Constant temperature (T). PV = constant (Boyle's law). Slow compression/expansion with perfect heat exchange.",
      colour: "hsl(210,80%,55%)",
      clinical: "Slow gas equilibration in the lungs. Compliance measurements at low flow rates.",
      path: "M 140 100 C 200 108, 300 160, 490 245",
    },
    {
      key: "adiabatic" as const, label: "Adiabatic",
      desc: "No heat exchange (Q=0). PV^γ = constant. Steeper curve than isothermal — less work done.",
      colour: "hsl(0,70%,55%)",
      clinical: "Rapid gas expansion in regulators causes cooling (Joule-Thomson effect). Cryotherapy probe function.",
      path: "M 140 80 C 170 120, 230 200, 490 265",
    },
    {
      key: "isobaric" as const, label: "Isobaric",
      desc: "Constant pressure (P). Horizontal line. Volume ∝ Temperature (Charles' law).",
      colour: "hsl(130,60%,45%)",
      clinical: "Heating gas at atmospheric pressure increases volume — spirometry BTPS correction.",
      path: "M 140 170 L 490 170",
    },
    {
      key: "isochoric" as const, label: "Isochoric",
      desc: "Constant volume (V). Vertical line. Pressure ∝ Temperature (Gay-Lussac's law). No work done (W=0).",
      colour: "hsl(45,80%,50%)",
      clinical: "Gas cylinder in fire: fixed volume, rising temperature causes dangerous pressure rise.",
      path: "M 310 80 L 310 265",
    },
  ];

  const visible = selectedProcess === "all" ? processes : processes.filter((p) => p.key === selectedProcess);
  const singleProc = selectedProcess !== "all" ? processes.find((p) => p.key === selectedProcess) : null;

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-foreground">PV Diagrams — Thermodynamic Processes</h4>
      <p className="text-sm text-muted-foreground">Each process holds one variable constant. Select to explore or overlay all four.</p>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedProcess("all")}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
            selectedProcess === "all" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-secondary/80"
          }`}
        >
          All Overlaid
        </button>
        {processes.map((p) => (
          <button
            key={p.key}
            onClick={() => setSelectedProcess(p.key)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              selectedProcess === p.key ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:bg-secondary/80"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>
      <div className="bg-secondary/30 rounded-xl p-5 border border-border">
        <svg viewBox="0 0 600 440" className="w-full h-auto">
          <text x="300" y="22" textAnchor="middle" className="fill-foreground text-[13px] font-bold">
            Pressure–Volume Diagram
          </text>

          <rect x="90" y="40" width="430" height="250" rx="6" fill="hsl(var(--secondary)/0.1)" stroke="hsl(var(--border))" strokeWidth="1" />

          {/* Axes */}
          <line x1="110" y1="280" x2="510" y2="280" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" />
          <line x1="110" y1="50" x2="110" y2="280" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" />
          <polygon points="510,280 502,276 502,284" fill="hsl(var(--muted-foreground))" />
          <polygon points="110,50 106,58 114,58" fill="hsl(var(--muted-foreground))" />
          <text x="310" y="300" textAnchor="middle" className="fill-foreground text-[11px] font-medium">Volume (V)</text>
          <text x="65" y="170" textAnchor="middle" className="fill-foreground text-[11px] font-medium" transform="rotate(-90 65 170)">Pressure (P)</text>

          {/* Curves */}
          {visible.map((p) => (
            <path
              key={p.key}
              d={p.path}
              fill="none"
              stroke={p.colour}
              strokeWidth={selectedProcess === "all" ? "2" : "3"}
              strokeLinecap="round"
              strokeDasharray={p.key === "isobaric" ? "8 4" : p.key === "isochoric" ? "4 4" : "none"}
            />
          ))}

          {/* Labels on "all" view */}
          {selectedProcess === "all" && (
            <>
              <text x="420" y="220" className="text-[9px] font-bold" fill="hsl(210,80%,55%)">Isothermal</text>
              <text x="430" y="252" className="text-[9px] font-bold" fill="hsl(0,70%,55%)">Adiabatic</text>
              <text x="495" y="165" className="text-[9px] font-bold" fill="hsl(130,60%,45%)">Isobaric</text>
              <text x="318" y="75" className="text-[9px] font-bold" fill="hsl(45,80%,50%)">Isochoric</text>
            </>
          )}

          {/* Work annotation */}
          {selectedProcess !== "all" && selectedProcess !== "isochoric" && (
            <text x="310" y="195" textAnchor="middle" className="fill-muted-foreground text-[10px] italic">
              Work done = area under curve
            </text>
          )}
          {selectedProcess === "isochoric" && (
            <text x="310" y="195" textAnchor="middle" className="fill-muted-foreground text-[10px] italic">
              No work done (ΔV = 0)
            </text>
          )}

          {/* Detail panel for single process */}
          {singleProc && (
            <g>
              <rect x="90" y="315" width="430" height="115" rx="8" fill="hsl(var(--primary)/0.06)" stroke="hsl(var(--primary)/0.3)" strokeWidth="1" />
              <text x="110" y="338" className="fill-foreground text-[12px] font-bold">{singleProc.label}</text>
              <text x="110" y="358" className="fill-foreground text-[9px]">{singleProc.desc.substring(0, 80)}</text>
              {singleProc.desc.length > 80 && (
                <text x="110" y="375" className="fill-foreground text-[9px]">{singleProc.desc.substring(80)}</text>
              )}
              <text x="110" y="400" className="fill-muted-foreground text-[9px] font-medium">Clinical: {singleProc.clinical}</text>
              <text x="110" y="420" className="fill-muted-foreground text-[8px]">W = ∫PdV — work equals the area under the PV curve</text>
            </g>
          )}

          {/* Legend for "all" view */}
          {selectedProcess === "all" && (
            <g>
              {processes.map((p, i) => (
                <g key={p.key}>
                  <line x1={95 + i * 130} y1="325" x2={118 + i * 130} y2="325" stroke={p.colour} strokeWidth="3" strokeDasharray={p.key === "isobaric" ? "8 4" : p.key === "isochoric" ? "4 4" : "none"} />
                  <text x={123 + i * 130} y="329" className="fill-foreground text-[9px] font-medium">{p.label}</text>
                </g>
              ))}
              <text x="300" y="360" textAnchor="middle" className="fill-muted-foreground text-[9px]">
                Adiabatic curve is steeper than isothermal — gas cools as it expands (no heat input)
              </text>
              <text x="300" y="378" textAnchor="middle" className="fill-muted-foreground text-[9px]">
                Work done (W) = ∫PdV = area under the curve on a PV diagram
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};

const SIUnitsThermodynamicsDiagram = () => {
  const [activeTab, setActiveTab] = useState<Tab>("si-units");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === t.key
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:bg-secondary/80"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === "si-units" && <SIUnitsDiagram />}
      {activeTab === "gas-laws" && <GasLawDerivationsDiagram />}
      {activeTab === "heat" && <HeatCapacityDiagram />}
      {activeTab === "thermodynamics" && <ThermodynamicsDiagram />}
      {activeTab === "phase-change" && <PhaseChangeDiagram />}
      {activeTab === "specific-heat" && <SpecificHeatDiagram />}
      {activeTab === "pv-diagrams" && <PVDiagramsTab />}
    </div>
  );
};

export default SIUnitsThermodynamicsDiagram;