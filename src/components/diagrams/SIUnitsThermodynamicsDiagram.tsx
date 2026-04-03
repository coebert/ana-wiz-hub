import { useState } from "react";

type Tab = "si-units" | "gas-laws" | "heat" | "thermodynamics";

const tabs: { key: Tab; label: string }[] = [
  { key: "si-units", label: "SI Units" },
  { key: "gas-laws", label: "Gas Law Derivations" },
  { key: "heat", label: "Heat & Capacity" },
  { key: "thermodynamics", label: "Thermodynamic Laws" },
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
          { unit: "Pascal (Pa)", def: "N/m² = kg·m⁻¹·s⁻²", use: "Pressure (1 atm = 101.3 kPa)" },
          { unit: "Joule (J)", def: "N·m = kg·m²·s⁻²", use: "Energy, work, heat" },
          { unit: "Watt (W)", def: "J/s = kg·m²·s⁻³", use: "Power" },
          { unit: "Newton (N)", def: "kg·m·s⁻²", use: "Force" },
          { unit: "Hertz (Hz)", def: "s⁻¹", use: "Frequency" },
          { unit: "Volt (V)", def: "W/A = kg·m²·s⁻³·A⁻¹", use: "Electrical potential" },
          { unit: "Ohm (Ω)", def: "V/A", use: "Electrical resistance" },
        ].map((d, i) => (
          <g key={d.unit}>
            <rect x="30" y={210 + i * 26} width="540" height="24" rx="4" fill={i % 2 === 0 ? "hsl(var(--secondary)/0.2)" : "transparent"} />
            <text x="45" y={226 + i * 26} className="fill-foreground text-[10px] font-medium">{d.unit}</text>
            <text x="230" y={226 + i * 26} textAnchor="middle" className="fill-primary text-[9.5px]">{d.def}</text>
            <text x="430" y={226 + i * 26} textAnchor="middle" className="fill-muted-foreground text-[9.5px]">{d.use}</text>
          </g>
        ))}

        <text x="300" y="410" textAnchor="middle" className="fill-foreground text-[10px] font-semibold">Pressure conversions: 1 atm = 101.3 kPa = 760 mmHg = 1013 cmH₂O = 14.7 psi = 1.013 bar</text>
      </svg>
    </div>
  </div>
);

const GasLawDerivationsDiagram = () => (
  <div className="space-y-4">
    <h4 className="font-semibold text-foreground">Gas Law Derivations & Relationships</h4>
    <div className="bg-secondary/30 rounded-xl p-5 border border-border">
      <svg viewBox="0 0 600 520" className="w-full h-auto">
        {/* Central ideal gas law */}
        <rect x="180" y="10" width="240" height="50" rx="10" fill="hsl(var(--primary)/0.15)" stroke="hsl(var(--primary))" strokeWidth="2" />
        <text x="300" y="35" textAnchor="middle" className="fill-primary text-[15px] font-bold">PV = nRT</text>
        <text x="300" y="50" textAnchor="middle" className="fill-muted-foreground text-[8px]">Ideal Gas Equation (all laws derive from this)</text>

        {/* Derivations */}
        {[
          { law: "Boyle's Law", eq: "P₁V₁ = P₂V₂", cond: "Constant T, n", app: "Pneumothorax at altitude, gas expansion", x: 20, y: 85, colour: "destructive" },
          { law: "Charles' Law", eq: "V₁/T₁ = V₂/T₂", cond: "Constant P, n", app: "Spirometry BTPS correction", x: 310, y: 85, colour: "accent" },
          { law: "Gay-Lussac's", eq: "P₁/T₁ = P₂/T₂", cond: "Constant V, n", app: "Cylinder pressure in fire", x: 20, y: 175, colour: "primary" },
          { law: "Avogadro's", eq: "V ∝ n", cond: "Constant T, P", app: "1 mol any gas = 22.4 L at STP", x: 310, y: 175, colour: "primary" },
        ].map((l) => (
          <g key={l.law}>
            <rect x={l.x} y={l.y} width="270" height="75" rx="8" fill={`hsl(var(--${l.colour})/0.08)`} stroke={`hsl(var(--${l.colour}))`} strokeWidth="1.5" />
            <text x={l.x + 135} y={l.y + 18} textAnchor="middle" className="fill-foreground text-[11px] font-bold">{l.law}</text>
            <text x={l.x + 135} y={l.y + 36} textAnchor="middle" className={`fill-${l.colour} text-[13px] font-bold`}>{l.eq}</text>
            <text x={l.x + 135} y={l.y + 52} textAnchor="middle" className="fill-muted-foreground text-[9px]">{l.cond}</text>
            <text x={l.x + 135} y={l.y + 66} textAnchor="middle" className="fill-muted-foreground text-[8px]">{l.app}</text>
          </g>
        ))}

        {/* Additional laws */}
        <text x="300" y="280" textAnchor="middle" className="fill-foreground text-[12px] font-bold">Additional Gas Laws</text>

        {[
          { law: "Dalton's Law", eq: "P_total = P₁ + P₂ + P₃ + ...", desc: "Total pressure = sum of partial pressures. PAO₂ = FiO₂(Patm − PH₂O) − PaCO₂/RQ" },
          { law: "Henry's Law", eq: "C = k × P", desc: "Amount dissolved ∝ partial pressure × solubility coefficient. Explains N₂ narcosis, decompression sickness" },
          { law: "Graham's Law", eq: "Rate ∝ 1/√(MW)", desc: "Diffusion rate inversely ∝ √molecular weight. CO₂ diffuses 20× faster than O₂ (higher solubility)" },
          { law: "Fick's Law", eq: "J = −D × A × (ΔC/Δx)", desc: "Diffusion flux ∝ area × concentration gradient / thickness. Governs alveolar gas exchange" },
          { law: "Hagen-Poiseuille", eq: "Q = πr⁴ΔP / 8ηL", desc: "Laminar flow: ∝ r⁴, ∝ ΔP, inversely ∝ viscosity & length. Radius is dominant factor" },
          { law: "Reynolds Number", eq: "Re = ρvd / η", desc: "Re > 2000 → turbulent flow. Turbulent flow: ∝ r⁵, depends on density not viscosity" },
        ].map((l, i) => (
          <g key={l.law}>
            <rect x="20" y={295 + i * 35} width="560" height="32" rx="6" fill={i % 2 === 0 ? "hsl(var(--secondary)/0.2)" : "transparent"} />
            <text x="35" y={315 + i * 35} className="fill-primary text-[10px] font-bold">{l.law}</text>
            <text x="165" y={315 + i * 35} className="fill-foreground text-[9.5px] font-medium">{l.eq}</text>
            <text x="35" y={326 + i * 35} className="fill-muted-foreground text-[8px]">{l.desc}</text>
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
        {/* Phase change diagram */}
        <text x="300" y="20" textAnchor="middle" className="fill-foreground text-[13px] font-bold">Heating Curve — Temperature vs Energy Added</text>

        <rect x="40" y="30" width="520" height="200" rx="8" fill="hsl(var(--secondary)/0.2)" stroke="hsl(var(--border))" strokeWidth="1" />
        {/* Axes */}
        <line x1="70" y1="210" x2="540" y2="210" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <line x1="70" y1="50" x2="70" y2="210" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <text x="305" y="225" textAnchor="middle" className="fill-muted-foreground text-[9px]">Heat energy added →</text>
        <text x="40" y="130" textAnchor="middle" className="fill-muted-foreground text-[9px]" transform="rotate(-90 40 130)">Temperature →</text>

        {/* Heating curve */}
        <path d="M 70 200 L 150 160 L 250 160 L 330 100 L 430 100 L 530 55" fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5" />

        {/* Labels for phases */}
        <text x="110" y="195" textAnchor="middle" className="fill-foreground text-[9px] font-medium">Solid</text>
        <text x="200" y="152" textAnchor="middle" className="fill-destructive text-[9px] font-bold">Melting</text>
        <text x="200" y="165" textAnchor="middle" className="fill-muted-foreground text-[7px]">(Latent heat</text>
        <text x="200" y="175" textAnchor="middle" className="fill-muted-foreground text-[7px]">of fusion)</text>
        <text x="290" y="140" textAnchor="middle" className="fill-foreground text-[9px] font-medium">Liquid</text>
        <text x="380" y="92" textAnchor="middle" className="fill-destructive text-[9px] font-bold">Boiling</text>
        <text x="380" y="105" textAnchor="middle" className="fill-muted-foreground text-[7px]">(Latent heat of</text>
        <text x="380" y="115" textAnchor="middle" className="fill-muted-foreground text-[7px]">vaporisation)</text>
        <text x="490" y="80" textAnchor="middle" className="fill-foreground text-[9px] font-medium">Gas</text>

        {/* Key equations */}
        <text x="20" y="255" className="fill-foreground text-[12px] font-bold">Key Equations</text>

        {[
          { name: "Specific Heat Capacity (c)", eq: "Q = m × c × ΔT", desc: "Heat to raise 1 kg by 1 K. Water: 4.18 kJ/kg/K (highest of common liquids → thermal stability)" },
          { name: "Latent Heat of Vaporisation (L)", eq: "Q = m × L", desc: "Heat for phase change at constant temperature. Water: 2260 kJ/kg. Explains cooling from evaporation" },
          { name: "Latent Heat of Fusion", eq: "Q = m × Lf", desc: "Heat to melt solid → liquid. Water: 334 kJ/kg. Phase change absorbs energy without temperature change" },
        ].map((e, i) => (
          <g key={e.name}>
            <rect x="20" y={265 + i * 50} width="560" height="45" rx="8" fill={`hsl(var(--${i === 0 ? "primary" : i === 1 ? "destructive" : "accent"}/0.06)`} stroke={`hsl(var(--${i === 0 ? "primary" : i === 1 ? "destructive" : "accent"}))`} strokeWidth="1" />
            <text x="35" y={282 + i * 50} className="fill-foreground text-[10px] font-bold">{e.name}</text>
            <text x="35" y={298 + i * 50} className="fill-primary text-[11px] font-bold">{e.eq}</text>
            <text x="200" y={298 + i * 50} className="fill-muted-foreground text-[9px]">{e.desc}</text>
          </g>
        ))}

        {/* Clinical relevance */}
        <text x="20" y="425" className="fill-foreground text-[11px] font-bold">Clinical Relevance</text>
        <text x="30" y="443" className="fill-muted-foreground text-[9.5px]">• Evaporative heat loss (latent heat) is the dominant mechanism in theatre • Vaporizer cooling effect (draws energy from liquid anaesthetic)</text>
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
          {
            law: "Zeroth Law",
            statement: "If A is in thermal equilibrium with C, and B is in thermal equilibrium with C, then A and B are in thermal equilibrium.",
            clinical: "Basis of temperature measurement — thermometer reaches equilibrium with patient.",
            colour: "accent", y: 35,
          },
          {
            law: "First Law",
            statement: "Energy cannot be created or destroyed, only converted. ΔU = Q − W (internal energy = heat added − work done).",
            clinical: "Conservation of energy in metabolism. Adiabatic processes: gas expansion causes cooling (regulators, cryotherapy).",
            colour: "primary", y: 145,
          },
          {
            law: "Second Law",
            statement: "Heat flows spontaneously from hot to cold. Entropy of an isolated system always increases.",
            clinical: "Patient heat loss to cold theatre environment. Cannot achieve 100% efficient heat conservation.",
            colour: "destructive", y: 255,
          },
          {
            law: "Third Law",
            statement: "Entropy approaches zero as temperature approaches absolute zero (0 K = −273.15°C).",
            clinical: "Defines absolute zero. Basis of the Kelvin scale used in gas law calculations.",
            colour: "primary", y: 365,
          },
        ].map((l) => (
          <g key={l.law}>
            <rect x="20" y={l.y} width="560" height="95" rx="10" fill={`hsl(var(--${l.colour})/0.06)`} stroke={`hsl(var(--${l.colour}))`} strokeWidth="1.5" />
            <text x="300" y={l.y + 20} textAnchor="middle" className={`fill-${l.colour} text-[13px] font-bold`}>{l.law}</text>
            <text x="35" y={l.y + 42} className="fill-foreground text-[9.5px]">{l.statement}</text>
            <text x="35" y={l.y + 62} className="fill-muted-foreground text-[9px] font-medium">Clinical: {l.clinical.substring(0, 95)}</text>
            {l.clinical.length > 95 && (
              <text x="35" y={l.y + 78} className="fill-muted-foreground text-[9px]">{l.clinical.substring(95)}</text>
            )}
          </g>
        ))}

        <text x="300" y="475" textAnchor="middle" className="fill-foreground text-[10px] font-semibold">Adiabatic: no heat exchange (Q=0). Isothermal: constant temperature. Isobaric: constant pressure.</text>
      </svg>
    </div>
  </div>
);

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
    </div>
  );
};

export default SIUnitsThermodynamicsDiagram;
