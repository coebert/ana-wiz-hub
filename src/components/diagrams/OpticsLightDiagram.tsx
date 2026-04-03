import { useState } from "react";

type Tab = "reflection" | "refraction" | "fibreoptics" | "beer-lambert" | "spectrophotometry";

const tabs: { key: Tab; label: string }[] = [
  { key: "reflection", label: "Reflection" },
  { key: "refraction", label: "Refraction" },
  { key: "fibreoptics", label: "Fibreoptics" },
  { key: "beer-lambert", label: "Beer-Lambert" },
  { key: "spectrophotometry", label: "Spectrophotometry" },
];

const ReflectionDiagram = () => (
  <div className="space-y-4">
    <h4 className="font-semibold text-foreground">Reflection of Light</h4>
    <div className="bg-secondary/30 rounded-xl p-5 border border-border">
      <svg viewBox="0 0 600 350" className="w-full h-auto">
        <text x="300" y="20" textAnchor="middle" className="fill-foreground text-[13px] font-bold">Laws of Reflection</text>

        {/* Mirror surface */}
        <line x1="100" y1="200" x2="500" y2="200" stroke="hsl(var(--foreground))" strokeWidth="2" />
        {/* Hatching */}
        {Array.from({ length: 20 }).map((_, i) => (
          <line key={i} x1={105 + i * 20} y1="200" x2={115 + i * 20} y2="210" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        ))}

        {/* Normal */}
        <line x1="300" y1="60" x2="300" y2="200" stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeDasharray="6" />
        <text x="310" y="55" className="fill-muted-foreground text-[10px]">Normal</text>

        {/* Incident ray */}
        <line x1="150" y1="60" x2="300" y2="200" stroke="hsl(var(--primary))" strokeWidth="2.5" />
        <polygon points="240,155 248,145 255,158" fill="hsl(var(--primary))" />
        <text x="180" y="100" className="fill-primary text-[10px] font-medium">Incident ray</text>

        {/* Reflected ray */}
        <line x1="300" y1="200" x2="450" y2="60" stroke="hsl(var(--destructive))" strokeWidth="2.5" />
        <polygon points="390,118 400,110 395,125" fill="hsl(var(--destructive))" />
        <text x="400" y="100" className="fill-destructive text-[10px] font-medium">Reflected ray</text>

        {/* Angles */}
        <path d="M 280 155 A 45 45 0 0 1 300 145" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <text x="270" y="145" className="fill-primary text-[10px] font-bold">θᵢ</text>
        <path d="M 300 145 A 45 45 0 0 1 320 155" fill="none" stroke="hsl(var(--destructive))" strokeWidth="1.5" />
        <text x="322" y="145" className="fill-destructive text-[10px] font-bold">θᵣ</text>

        {/* Laws */}
        <text x="300" y="240" textAnchor="middle" className="fill-foreground text-[12px] font-bold">θᵢ = θᵣ (angle of incidence = angle of reflection)</text>
        <text x="300" y="260" textAnchor="middle" className="fill-muted-foreground text-[10px]">Incident ray, reflected ray, and normal all lie in the same plane</text>

        {/* Types */}
        <text x="20" y="290" className="fill-foreground text-[11px] font-bold">Types of Reflection</text>
        <text x="30" y="310" className="fill-muted-foreground text-[9.5px]">• Specular: smooth surface → parallel rays remain parallel (mirrors, glass)</text>
        <text x="30" y="328" className="fill-muted-foreground text-[9.5px]">• Diffuse: rough surface → rays scattered in all directions (paper, skin)</text>
        <text x="30" y="346" className="fill-muted-foreground text-[9.5px]">• Clinical: pulse oximetry uses reflectance mode when transmission is not possible (forehead sensors)</text>
      </svg>
    </div>
  </div>
);

const RefractionDiagram = () => (
  <div className="space-y-4">
    <h4 className="font-semibold text-foreground">Refraction & Snell's Law</h4>
    <div className="bg-secondary/30 rounded-xl p-5 border border-border">
      <svg viewBox="0 0 600 400" className="w-full h-auto">
        <text x="300" y="20" textAnchor="middle" className="fill-foreground text-[13px] font-bold">Snell's Law: n₁ sin θ₁ = n₂ sin θ₂</text>

        {/* Media boundary */}
        <rect x="60" y="40" width="480" height="100" rx="0" fill="hsl(var(--primary)/0.03)" />
        <rect x="60" y="140" width="480" height="100" rx="0" fill="hsl(var(--primary)/0.12)" />
        <line x1="60" y1="140" x2="540" y2="140" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
        <text x="80" y="90" className="fill-muted-foreground text-[10px]">n₁ (low density, e.g. air)</text>
        <text x="80" y="190" className="fill-muted-foreground text-[10px]">n₂ (high density, e.g. glass)</text>

        {/* Normal */}
        <line x1="300" y1="40" x2="300" y2="240" stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeDasharray="5" />

        {/* Incident */}
        <line x1="180" y1="40" x2="300" y2="140" stroke="hsl(var(--primary))" strokeWidth="2.5" />
        <text x="210" y="70" className="fill-primary text-[10px] font-bold">θ₁</text>

        {/* Refracted — bends toward normal */}
        <line x1="300" y1="140" x2="370" y2="240" stroke="hsl(var(--accent))" strokeWidth="2.5" />
        <text x="345" y="210" className="fill-accent text-[10px] font-bold">θ₂</text>

        {/* Critical angle */}
        <text x="300" y="275" textAnchor="middle" className="fill-foreground text-[12px] font-bold">Critical Angle & Total Internal Reflection (TIR)</text>

        <rect x="30" y="285" width="540" height="105" rx="8" fill="hsl(var(--secondary)/0.2)" stroke="hsl(var(--border))" strokeWidth="1" />
        {[
          "When light travels from dense → less dense medium (n₁ > n₂):",
          "  At critical angle θc: refracted ray travels along interface (θ₂ = 90°)",
          "  sin θc = n₂/n₁",
          "  Beyond θc: Total Internal Reflection — ALL light reflected back into dense medium",
          "  TIR is the basis of fibreoptic light transmission",
          "  Refractive index: n = c/v (speed of light in vacuum / speed in medium)",
        ].map((t, i) => (
          <text key={i} x="45" y={303 + i * 14} className="fill-muted-foreground text-[9.5px]">{t}</text>
        ))}
      </svg>
    </div>
  </div>
);

const FibreopticsDiagram = () => (
  <div className="space-y-4">
    <h4 className="font-semibold text-foreground">Fibreoptic Light Transmission</h4>
    <div className="bg-secondary/30 rounded-xl p-5 border border-border">
      <svg viewBox="0 0 600 400" className="w-full h-auto">
        <text x="300" y="20" textAnchor="middle" className="fill-foreground text-[13px] font-bold">Fibreoptic Bundle Structure</text>

        {/* Fibre cross-section */}
        <rect x="40" y="40" width="520" height="100" rx="8" fill="hsl(var(--secondary)/0.15)" stroke="hsl(var(--border))" strokeWidth="1" />

        {/* Core */}
        <rect x="60" y="60" width="480" height="20" rx="3" fill="hsl(var(--primary)/0.3)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <text x="300" y="74" textAnchor="middle" className="fill-primary text-[9px] font-bold">Core (high refractive index glass)</text>

        {/* Cladding */}
        <rect x="60" y="50" width="480" height="8" rx="2" fill="hsl(var(--accent)/0.3)" stroke="hsl(var(--accent))" strokeWidth="1" />
        <rect x="60" y="82" width="480" height="8" rx="2" fill="hsl(var(--accent)/0.3)" stroke="hsl(var(--accent))" strokeWidth="1" />
        <text x="560" y="57" className="fill-accent text-[8px]">Cladding</text>
        <text x="560" y="88" className="fill-accent text-[8px]">(low n)</text>

        {/* Light path - zigzag TIR */}
        <path d="M 60 70 L 120 55 L 180 78 L 240 55 L 300 78 L 360 55 L 420 78 L 480 55 L 540 70" fill="none" stroke="hsl(var(--destructive))" strokeWidth="1.5" />

        {/* Labels */}
        <text x="300" y="110" textAnchor="middle" className="fill-foreground text-[9px]">Light undergoes Total Internal Reflection at core-cladding interface</text>

        {/* Scope structure */}
        <text x="300" y="150" textAnchor="middle" className="fill-foreground text-[12px] font-bold">Flexible Fibreoptic Scope Components</text>

        {[
          { component: "Light bundle (incoherent)", desc: "Transmits illumination. Fibres randomly arranged — carries light intensity but not image.", colour: "primary" },
          { component: "Image bundle (coherent)", desc: "Fibres precisely aligned end-to-end — preserves spatial arrangement to transmit image.", colour: "accent" },
          { component: "Working channel", desc: "2.2–3.2 mm channel for suction, O₂ insufflation, local anaesthetic application.", colour: "destructive" },
          { component: "Angulation wires", desc: "Control tip deflection (up/down ± anterior flexion). Lever mechanism on handle.", colour: "primary" },
        ].map((c, i) => (
          <g key={c.component}>
            <rect x="30" y={165 + i * 48} width="540" height="42" rx="6" fill={`hsl(var(--${c.colour})/0.06)`} stroke={`hsl(var(--${c.colour}))`} strokeWidth="1" />
            <text x="45" y={182 + i * 48} className="fill-foreground text-[10px] font-bold">{c.component}</text>
            <text x="45" y={198 + i * 48} className="fill-muted-foreground text-[9px]">{c.desc}</text>
          </g>
        ))}

        {/* Key points */}
        <text x="20" y="370" className="fill-foreground text-[11px] font-bold">Key Points</text>
        <text x="30" y="388" className="fill-muted-foreground text-[9.5px]">• Typical fibres: 8–12 μm diameter, 10,000–30,000 per bundle • Numerical aperture = sin(acceptance angle) determines light-gathering</text>
      </svg>
    </div>
  </div>
);

const BeerLambertDiagram = () => (
  <div className="space-y-4">
    <h4 className="font-semibold text-foreground">Beer-Lambert Law</h4>
    <div className="bg-secondary/30 rounded-xl p-5 border border-border">
      <svg viewBox="0 0 600 420" className="w-full h-auto">
        <text x="300" y="22" textAnchor="middle" className="fill-foreground text-[14px] font-bold">A = ε × c × l</text>
        <text x="300" y="40" textAnchor="middle" className="fill-muted-foreground text-[9px]">Absorbance = molar absorptivity × concentration × path length</text>

        {/* Light beam through cuvette */}
        <rect x="40" y="60" width="80" height="50" rx="6" fill="hsl(var(--primary)/0.2)" stroke="hsl(var(--primary))" strokeWidth="2" />
        <text x="80" y="85" textAnchor="middle" className="fill-primary text-[10px] font-bold">I₀</text>
        <text x="80" y="100" textAnchor="middle" className="fill-muted-foreground text-[8px]">Source</text>

        {/* Beam */}
        <line x1="120" y1="85" x2="200" y2="85" stroke="hsl(var(--primary))" strokeWidth="3" />

        {/* Cuvette */}
        <rect x="200" y="55" width="200" height="60" rx="4" fill="hsl(var(--destructive)/0.1)" stroke="hsl(var(--destructive))" strokeWidth="2" />
        <text x="300" y="80" textAnchor="middle" className="fill-destructive text-[10px] font-bold">Sample</text>
        <text x="300" y="95" textAnchor="middle" className="fill-muted-foreground text-[8px]">concentration c, path length l</text>

        {/* Transmitted beam (thinner) */}
        <line x1="400" y1="85" x2="470" y2="85" stroke="hsl(var(--primary))" strokeWidth="1.5" />

        {/* Detector */}
        <rect x="470" y="60" width="80" height="50" rx="6" fill="hsl(var(--accent)/0.2)" stroke="hsl(var(--accent))" strokeWidth="2" />
        <text x="510" y="85" textAnchor="middle" className="fill-accent text-[10px] font-bold">I</text>
        <text x="510" y="100" textAnchor="middle" className="fill-muted-foreground text-[8px]">Detector</text>

        {/* Equations */}
        <rect x="30" y="130" width="540" height="85" rx="8" fill="hsl(var(--secondary)/0.2)" stroke="hsl(var(--border))" strokeWidth="1" />
        <text x="300" y="150" textAnchor="middle" className="fill-foreground text-[11px] font-bold">Key Relationships</text>
        <text x="45" y="170" className="fill-muted-foreground text-[10px]">• Transmittance: T = I/I₀ (fraction of light transmitted)</text>
        <text x="45" y="188" className="fill-muted-foreground text-[10px]">• Absorbance: A = −log₁₀(T) = ε × c × l (Beer-Lambert law)</text>
        <text x="45" y="206" className="fill-muted-foreground text-[10px]">• Absorbance is linearly proportional to concentration (at low concentrations)</text>

        {/* Limitations */}
        <text x="20" y="240" className="fill-foreground text-[12px] font-bold">Limitations & Assumptions</text>
        {[
          "Assumes monochromatic light (single wavelength)",
          "Linear only at low concentrations — deviates at high concentrations",
          "Assumes no scattering, fluorescence, or chemical interaction with light",
          "Path length must be uniform",
          "Applies to pulse oximetry (modified) and co-oximetry",
        ].map((t, i) => (
          <text key={i} x="30" y={260 + i * 18} className="fill-muted-foreground text-[9.5px]">• {t}</text>
        ))}

        {/* Clinical application */}
        <text x="20" y="360" className="fill-foreground text-[12px] font-bold">Clinical Application: Pulse Oximetry</text>
        <text x="30" y="380" className="fill-muted-foreground text-[9.5px]">• Uses 2 wavelengths: 660 nm (red) and 940 nm (infrared)</text>
        <text x="30" y="398" className="fill-muted-foreground text-[9.5px]">• HbO₂ absorbs more IR; deoxy-Hb absorbs more red → ratio R = (AC₆₆₀/DC₆₆₀)/(AC₉₄₀/DC₉₄₀)</text>
        <text x="30" y="416" className="fill-muted-foreground text-[9.5px]">• R calibrated empirically against healthy volunteers (inaccurate below SpO₂ ~70%)</text>
      </svg>
    </div>
  </div>
);

const SpectrophotometryDiagram = () => (
  <div className="space-y-4">
    <h4 className="font-semibold text-foreground">Spectrophotometry & Absorption Spectra</h4>
    <div className="bg-secondary/30 rounded-xl p-5 border border-border">
      <svg viewBox="0 0 600 450" className="w-full h-auto">
        <text x="300" y="20" textAnchor="middle" className="fill-foreground text-[13px] font-bold">Absorption Spectra of Haemoglobin Species</text>

        <rect x="40" y="30" width="520" height="200" rx="8" fill="hsl(var(--secondary)/0.2)" stroke="hsl(var(--border))" strokeWidth="1" />
        {/* Axes */}
        <line x1="70" y1="210" x2="540" y2="210" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <line x1="70" y1="45" x2="70" y2="210" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <text x="305" y="225" textAnchor="middle" className="fill-muted-foreground text-[9px]">Wavelength (nm)</text>
        <text x="50" y="130" textAnchor="middle" className="fill-muted-foreground text-[8px]" transform="rotate(-90 50 130)">Absorption</text>

        {/* Wavelength markers */}
        {[
          { nm: "600", x: 150 }, { nm: "660", x: 220 }, { nm: "700", x: 270 },
          { nm: "800", x: 370 }, { nm: "940", x: 480 },
        ].map((w) => (
          <g key={w.nm}>
            <line x1={w.x} y1="210" x2={w.x} y2="215" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
            <text x={w.x} y="225" textAnchor="middle" className="fill-muted-foreground text-[8px]">{w.nm}</text>
          </g>
        ))}

        {/* HbO₂ curve - low at 660, high at 940 */}
        <path d="M 100 120 Q 150 140, 220 180 Q 280 195, 370 140 Q 420 110, 480 70" fill="none" stroke="hsl(var(--destructive))" strokeWidth="2" />
        <text x="500" y="70" className="fill-destructive text-[9px] font-bold">HbO₂</text>

        {/* Deoxy-Hb curve - high at 660, low at 940 */}
        <path d="M 100 60 Q 150 55, 220 65 Q 280 100, 370 140 Q 420 170, 480 185" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
        <text x="500" y="185" className="fill-primary text-[9px] font-bold">Hb</text>

        {/* Isobestic point */}
        <circle cx="370" cy="140" r="5" fill="hsl(var(--foreground))" />
        <text x="370" y="135" textAnchor="middle" className="fill-foreground text-[8px] font-bold">Isobestic</text>
        <text x="370" y="158" textAnchor="middle" className="fill-muted-foreground text-[7px]">~800 nm</text>

        {/* Vertical lines at key wavelengths */}
        <line x1="220" y1="45" x2="220" y2="205" stroke="hsl(var(--destructive)/0.3)" strokeWidth="1" strokeDasharray="3" />
        <text x="220" y="42" textAnchor="middle" className="fill-destructive text-[8px] font-bold">660 nm (Red)</text>
        <line x1="480" y1="45" x2="480" y2="205" stroke="hsl(var(--primary)/0.3)" strokeWidth="1" strokeDasharray="3" />
        <text x="480" y="42" textAnchor="middle" className="fill-primary text-[8px] font-bold">940 nm (IR)</text>

        {/* Spectrophotometry types */}
        <text x="300" y="255" textAnchor="middle" className="fill-foreground text-[12px] font-bold">Types of Spectrophotometry</text>

        {[
          { type: "Pulse Oximetry", wavelengths: "660 nm + 940 nm (2λ)", measures: "SpO₂ (functional saturation: HbO₂/(HbO₂+Hb))", limit: "Cannot detect COHb or MetHb", colour: "destructive" },
          { type: "Co-oximetry", wavelengths: "4+ wavelengths", measures: "HbO₂, Hb, COHb, MetHb (fractional saturation)", limit: "Requires blood sample (lab)", colour: "primary" },
          { type: "NIRS", wavelengths: "700–1000 nm (near IR)", measures: "Regional cerebral O₂ saturation (rSO₂)", limit: "Mixed arterial/venous signal, scalp contamination", colour: "accent" },
        ].map((s, i) => (
          <g key={s.type}>
            <rect x="20" y={268 + i * 52} width="560" height="46" rx="8" fill={`hsl(var(--${s.colour})/0.06)`} stroke={`hsl(var(--${s.colour}))`} strokeWidth="1" />
            <text x="35" y={285 + i * 52} className="fill-foreground text-[10px] font-bold">{s.type}</text>
            <text x="200" y={285 + i * 52} className="fill-muted-foreground text-[9px]">{s.wavelengths}</text>
            <text x="35" y={300 + i * 52} className="fill-muted-foreground text-[9px]">Measures: {s.measures}</text>
            <text x="35" y={312 + i * 52} className="fill-muted-foreground text-[8px]">Limitation: {s.limit}</text>
          </g>
        ))}

        {/* Key fact */}
        <text x="300" y="440" textAnchor="middle" className="fill-foreground text-[10px] font-semibold">Isobestic point (~800 nm): HbO₂ and Hb absorb equally — used for calibration and total Hb measurement</text>
      </svg>
    </div>
  </div>
);

const OpticsLightDiagram = () => {
  const [activeTab, setActiveTab] = useState<Tab>("reflection");

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

      {activeTab === "reflection" && <ReflectionDiagram />}
      {activeTab === "refraction" && <RefractionDiagram />}
      {activeTab === "fibreoptics" && <FibreopticsDiagram />}
      {activeTab === "beer-lambert" && <BeerLambertDiagram />}
      {activeTab === "spectrophotometry" && <SpectrophotometryDiagram />}
    </div>
  );
};

export default OpticsLightDiagram;
