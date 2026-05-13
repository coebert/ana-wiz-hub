import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DiagramFigure } from "./_shared/DiagramFigure";

const LaserPrinciplesTab = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-foreground">LASER Principles</h3>
    <p className="text-sm text-muted-foreground">
      Light Amplification by Stimulated Emission of Radiation — coherent, monochromatic, collimated light from population inversion.
    </p>
    <svg viewBox="0 0 400 320" className="w-full max-w-md mx-auto">
      <text x="200" y="18" textAnchor="middle" fontSize="11" fill="hsl(var(--foreground))" fontWeight="bold">Stimulated Emission</text>

      {/* Energy level diagram */}
      <rect x="20" y="30" width="170" height="140" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />

      {/* Ground state E₁ */}
      <line x1="40" y1="150" x2="140" y2="150" stroke="hsl(var(--foreground))" strokeWidth="2" />
      <text x="155" y="154" fontSize="8" fill="hsl(var(--muted-foreground))">E₁</text>

      {/* Metastable E₂ */}
      <line x1="40" y1="100" x2="140" y2="100" stroke="hsl(var(--primary))" strokeWidth="2" />
      <text x="155" y="104" fontSize="8" fill="hsl(var(--primary))" fontWeight="bold">E₂</text>
      <text x="155" y="114" fontSize="6" fill="hsl(var(--muted-foreground))">(metastable)</text>

      {/* Excited E₃ */}
      <line x1="40" y1="50" x2="140" y2="50" stroke="hsl(var(--destructive))" strokeWidth="2" />
      <text x="155" y="54" fontSize="8" fill="hsl(var(--destructive))">E₃</text>

      {/* Pumping arrow */}
      <line x1="55" y1="148" x2="55" y2="52" stroke="hsl(var(--destructive))" strokeWidth="1.5" markerEnd="url(#lArrow)" />
      <text x="48" y="95" fontSize="7" fill="hsl(var(--destructive))" transform="rotate(-90,48,95)">Pumping</text>

      {/* Fast decay */}
      <path d="M 80 52 Q 85 70, 80 75 Q 75 80, 80 85 Q 85 90, 80 98" stroke="hsl(var(--accent))" strokeWidth="1.5" fill="none" markerEnd="url(#lArrowY)" />
      <text x="92" y="76" fontSize="6" fill="hsl(var(--accent))">Fast decay</text>

      {/* Stimulated emission */}
      <line x1="115" y1="98" x2="115" y2="148" stroke="hsl(var(--clinical))" strokeWidth="2" markerEnd="url(#lArrowG)" />
      <text x="128" y="130" fontSize="6" fill="hsl(var(--clinical))" fontWeight="bold">Stimulated</text>
      <text x="128" y="139" fontSize="6" fill="hsl(var(--clinical))">emission</text>

      {/* Population inversion note */}
      <text x="90" y="88" fontSize="6" fill="hsl(var(--primary))" fontWeight="bold">N₂ &gt; N₁</text>

      {/* Laser cavity diagram */}
      <text x="310" y="38" textAnchor="middle" fontSize="10" fill="hsl(var(--foreground))" fontWeight="bold">Optical Cavity</text>

      {/* Mirrors */}
      <rect x="220" y="55" width="8" height="80" rx="2" fill="hsl(var(--primary))" />
      <text x="224" y="148" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Total</text>
      <text x="224" y="156" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">mirror</text>

      <rect x="392" y="55" width="8" height="80" rx="2" fill="hsl(var(--primary)/0.6)" />
      <text x="396" y="148" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Partial</text>
      <text x="396" y="156" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">mirror</text>

      {/* Gain medium */}
      <rect x="260" y="70" width="100" height="50" rx="6" fill="hsl(var(--destructive)/0.1)" stroke="hsl(var(--destructive)/0.4)" strokeWidth="1" />
      <text x="310" y="95" textAnchor="middle" fontSize="8" fill="hsl(var(--destructive))" fontWeight="bold">Gain Medium</text>
      <text x="310" y="108" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">(CO₂ gas / Nd:YAG / KTP)</text>

      {/* Bouncing photons */}
      {[0, 1, 2].map((i) => (
        <line key={i} x1="228" y1={80 + i * 15} x2="392" y2={80 + i * 15} stroke="hsl(var(--clinical))" strokeWidth="1.5" opacity={0.5 + i * 0.15}>
          <animate attributeName="x1" values="228;232;228" dur={`${0.8 + i * 0.2}s`} repeatCount="indefinite" />
        </line>
      ))}

      {/* Output beam */}
      <line x1="400" y1="95" x2="420" y2="95" stroke="hsl(var(--clinical))" strokeWidth="3">
        <animate attributeName="stroke-opacity" values="0.4;1;0.4" dur="1s" repeatCount="indefinite" />
      </line>

      {/* Properties box */}
      <rect x="20" y="185" width="380" height="55" rx="8" fill="hsl(var(--primary)/0.08)" stroke="hsl(var(--primary)/0.3)" strokeWidth="1" />
      <text x="200" y="202" textAnchor="middle" fontSize="9" fill="hsl(var(--foreground))" fontWeight="bold">Laser Light Properties</text>
      <text x="105" y="218" textAnchor="middle" fontSize="8" fill="hsl(var(--primary))">Monochromatic</text>
      <text x="105" y="230" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">Single wavelength</text>
      <text x="200" y="218" textAnchor="middle" fontSize="8" fill="hsl(var(--primary))">Coherent</text>
      <text x="200" y="230" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">Waves in phase</text>
      <text x="305" y="218" textAnchor="middle" fontSize="8" fill="hsl(var(--primary))">Collimated</text>
      <text x="305" y="230" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">Parallel beam</text>

      {/* Clinical lasers table */}
      <text x="200" y="260" textAnchor="middle" fontSize="9" fill="hsl(var(--foreground))" fontWeight="bold">Clinical Lasers</text>
      <text x="80" y="278" textAnchor="middle" fontSize="7" fill="hsl(var(--destructive))" fontWeight="bold">CO₂ (10,600 nm)</text>
      <text x="80" y="290" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Airway surgery, cutting</text>
      <text x="200" y="278" textAnchor="middle" fontSize="7" fill="hsl(var(--clinical))" fontWeight="bold">Nd:YAG (1,064 nm)</text>
      <text x="200" y="290" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Deep coagulation</text>
      <text x="320" y="278" textAnchor="middle" fontSize="7" fill="hsl(var(--primary))" fontWeight="bold">KTP (532 nm)</text>
      <text x="320" y="290" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Superficial, vocal cord</text>

      <text x="200" y="312" textAnchor="middle" fontSize="8" fill="hsl(var(--destructive))" fontWeight="bold">⚠ CO₂ laser ignites PVC ETTs — use metal or laser-safe tubes</text>

      <defs>
        <marker id="lArrow" viewBox="0 0 10 10" refX="5" refY="0" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 10 L 5 0 L 10 10 z" fill="hsl(var(--destructive))" />
        </marker>
        <marker id="lArrowY" viewBox="0 0 10 10" refX="5" refY="10" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 5 10 L 10 0 z" fill="hsl(var(--accent))" />
        </marker>
        <marker id="lArrowG" viewBox="0 0 10 10" refX="5" refY="10" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 5 10 L 10 0 z" fill="hsl(var(--clinical))" />
        </marker>
      </defs>
    </svg>

    <div className="bg-card border border-border rounded-lg p-4 space-y-2">
      <h4 className="font-semibold text-sm text-foreground">Key Physics</h4>
      <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
        <li><strong>Population inversion</strong>: more atoms in excited (metastable) state than ground state — achieved by pumping</li>
        <li><strong>Stimulated emission</strong>: incoming photon triggers release of identical photon — same wavelength, phase, direction</li>
        <li><strong>Optical cavity</strong>: mirrors at each end amplify light through multiple passes; partial mirror allows beam output</li>
        <li><strong>3 properties</strong>: monochromatic, coherent, collimated</li>
        <li><strong>CO₂ laser</strong> (10,600 nm): absorbed by water → vaporises tissue; major airway fire risk with PVC tubes</li>
        <li><strong>Nd:YAG</strong> (1,064 nm): penetrates deeply, coagulates; transmitted via fibreoptic</li>
      </ul>
    </div>
  </div>
);

const FibreopticTab = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-foreground">Fibreoptic Light Transmission</h3>
    <p className="text-sm text-muted-foreground">
      Light travels through flexible glass or plastic fibres by total internal reflection at the core-cladding interface.
    </p>
    <svg viewBox="0 0 400 300" className="w-full max-w-md mx-auto">
      <text x="200" y="18" textAnchor="middle" fontSize="11" fill="hsl(var(--foreground))" fontWeight="bold">Total Internal Reflection in a Fibre</text>

      {/* Fibre cross-section */}
      <rect x="30" y="40" width="340" height="80" rx="12" fill="hsl(var(--muted)/0.2)" stroke="hsl(var(--border))" strokeWidth="1.5" />
      <text x="370" y="85" fontSize="7" fill="hsl(var(--muted-foreground))">Cladding</text>
      <text x="370" y="95" fontSize="6" fill="hsl(var(--muted-foreground))">(n₂, lower RI)</text>

      <rect x="30" y="55" width="340" height="50" rx="8" fill="hsl(var(--primary)/0.1)" stroke="hsl(var(--primary)/0.4)" strokeWidth="1.5" />
      <text x="370" y="70" fontSize="7" fill="hsl(var(--primary))">Core</text>
      <text x="370" y="80" fontSize="6" fill="hsl(var(--primary))">(n₁, higher RI)</text>

      {/* Light ray bouncing */}
      <path d="M 40 75 L 100 55 L 160 95 L 220 55 L 280 95 L 340 55 L 370 70" stroke="hsl(var(--accent))" strokeWidth="2" fill="none">
        <animate attributeName="stroke-dashoffset" values="60;0" dur="2s" repeatCount="indefinite" />
      </path>

      {/* Reflection points */}
      {[100, 220, 340].map((x) => (
        <circle key={x} cx={x} cy={55} r="3" fill="hsl(var(--accent))" opacity="0.6">
          <animate attributeName="r" values="2;4;2" dur="1s" repeatCount="indefinite" />
        </circle>
      ))}
      {[160, 280].map((x) => (
        <circle key={x} cx={x} cy={95} r="3" fill="hsl(var(--accent))" opacity="0.6">
          <animate attributeName="r" values="2;4;2" dur="1s" repeatCount="indefinite" />
        </circle>
      ))}

      {/* Critical angle diagram */}
      <text x="130" y="145" textAnchor="middle" fontSize="10" fill="hsl(var(--foreground))" fontWeight="bold">Critical Angle</text>

      <rect x="20" y="155" width="220" height="120" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />

      {/* Interface line */}
      <line x1="30" y1="220" x2="230" y2="220" stroke="hsl(var(--border))" strokeWidth="2" />
      <text x="50" y="240" fontSize="7" fill="hsl(var(--primary))">n₁ (core, higher)</text>
      <text x="50" y="210" fontSize="7" fill="hsl(var(--muted-foreground))">n₂ (cladding, lower)</text>

      {/* Normal */}
      <line x1="130" y1="165" x2="130" y2="270" stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeDasharray="3,2" />
      <text x="135" y="170" fontSize="6" fill="hsl(var(--muted-foreground))">Normal</text>

      {/* Sub-critical ray — refracted */}
      <line x1="80" y1="265" x2="130" y2="220" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      <line x1="130" y1="220" x2="160" y2="180" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="4,2" />
      <text x="160" y="175" fontSize="6" fill="hsl(var(--primary))">Refracted</text>

      {/* Critical ray */}
      <line x1="95" y1="265" x2="130" y2="220" stroke="hsl(var(--accent))" strokeWidth="2" />
      <line x1="130" y1="220" x2="230" y2="220" stroke="hsl(var(--accent))" strokeWidth="1.5" strokeDasharray="4,2" />
      <text x="190" y="215" fontSize="6" fill="hsl(var(--accent))" fontWeight="bold">θc (critical)</text>

      {/* TIR ray */}
      <line x1="110" y1="265" x2="130" y2="220" stroke="hsl(var(--clinical))" strokeWidth="2" />
      <line x1="130" y1="220" x2="170" y2="265" stroke="hsl(var(--clinical))" strokeWidth="2" />
      <text x="175" y="260" fontSize="6" fill="hsl(var(--clinical))" fontWeight="bold">TIR (θ &gt; θc)</text>

      {/* Angle arc */}
      <path d="M 130 240 Q 120 235, 115 245" stroke="hsl(var(--clinical))" strokeWidth="1" fill="none" />
      <text x="112" y="250" fontSize="6" fill="hsl(var(--clinical))">θ</text>

      {/* Formula */}
      <rect x="260" y="155" width="130" height="50" rx="8" fill="hsl(var(--primary)/0.08)" stroke="hsl(var(--primary)/0.3)" strokeWidth="1" />
      <text x="325" y="175" textAnchor="middle" fontSize="10" fill="hsl(var(--foreground))" fontWeight="bold">sin θc = n₂/n₁</text>
      <text x="325" y="195" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">Snell's law at critical angle</text>

      {/* Numerical aperture */}
      <rect x="260" y="215" width="130" height="55" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
      <text x="325" y="232" textAnchor="middle" fontSize="8" fill="hsl(var(--foreground))" fontWeight="bold">Numerical Aperture</text>
      <text x="325" y="248" textAnchor="middle" fontSize="9" fill="hsl(var(--primary))">NA = √(n₁² − n₂²)</text>
      <text x="325" y="262" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">Acceptance cone angle</text>
    </svg>

    <div className="bg-card border border-border rounded-lg p-4 space-y-2">
      <h4 className="font-semibold text-sm text-foreground">Key Physics</h4>
      <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
        <li><strong>Total internal reflection (TIR)</strong>: occurs when light travels from higher to lower refractive index at angle &gt; critical angle</li>
        <li><strong>Critical angle</strong>: sin θc = n₂/n₁ (Snell's law); depends on refractive index difference</li>
        <li><strong>Numerical aperture (NA)</strong>: defines the cone of light accepted by the fibre; NA = √(n₁² − n₂²)</li>
        <li>Higher NA → wider acceptance angle → more light collected but lower resolution</li>
        <li><strong>Coherent bundles</strong>: fibres maintain spatial arrangement → transmit images (viewing channel)</li>
        <li><strong>Incoherent bundles</strong>: random arrangement → transmit light only (illumination channel)</li>
      </ul>
    </div>
  </div>
);

const ClinicalTab = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-foreground">Clinical Applications</h3>
    <svg viewBox="0 0 400 300" className="w-full max-w-md mx-auto">
      <text x="200" y="18" textAnchor="middle" fontSize="11" fill="hsl(var(--foreground))" fontWeight="bold">Flexible Fibreoptic Bronchoscope</text>

      {/* Scope body */}
      <rect x="20" y="60" width="60" height="120" rx="10" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2" />
      <text x="50" y="90" textAnchor="middle" fontSize="7" fill="hsl(var(--foreground))" fontWeight="bold">Control</text>
      <text x="50" y="100" textAnchor="middle" fontSize="7" fill="hsl(var(--foreground))" fontWeight="bold">Body</text>

      {/* Eyepiece */}
      <circle cx="50" cy="50" r="14" fill="hsl(var(--accent))" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      <text x="50" y="54" textAnchor="middle" fontSize="7" fill="hsl(var(--foreground))" fontWeight="bold">Eye</text>
      <text x="50" y="35" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">(or camera)</text>

      {/* Lever */}
      <rect x="80" y="100" width="20" height="8" rx="2" fill="hsl(var(--primary))" />
      <text x="115" y="108" fontSize="6" fill="hsl(var(--muted-foreground))">Tip control</text>

      {/* Flexible insertion tube */}
      <path d="M 50 180 Q 50 220, 80 240 Q 130 270, 180 260 Q 230 250, 280 240 Q 330 230, 360 210" stroke="hsl(var(--primary))" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M 50 180 Q 50 220, 80 240 Q 130 270, 180 260 Q 230 250, 280 240 Q 330 230, 360 210" stroke="hsl(var(--primary)/0.2)" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Tip detail */}
      <circle cx="362" cy="208" r="12" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2" />

      {/* Channels at tip */}
      <circle cx="358" cy="204" r="2" fill="hsl(var(--accent))" />
      <circle cx="366" cy="204" r="2" fill="hsl(var(--accent))" />
      <circle cx="362" cy="212" r="3" fill="hsl(var(--muted-foreground))" />

      {/* Labels */}
      <line x1="358" y1="204" x2="340" y2="190" stroke="hsl(var(--accent))" strokeWidth="0.5" />
      <text x="310" y="188" fontSize="6" fill="hsl(var(--accent))">Light fibres</text>
      <text x="310" y="196" fontSize="6" fill="hsl(var(--accent))">(incoherent)</text>

      <line x1="366" y1="204" x2="390" y2="188" stroke="hsl(var(--primary))" strokeWidth="0.5" />
      <text x="380" y="185" fontSize="6" fill="hsl(var(--primary))">Image fibre</text>
      <text x="380" y="193" fontSize="6" fill="hsl(var(--primary))">(coherent)</text>

      <line x1="362" y1="215" x2="362" y2="235" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
      <text x="362" y="242" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Working/suction</text>
      <text x="362" y="250" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">channel</text>

      {/* Cross-section */}
      <text x="250" y="55" textAnchor="middle" fontSize="9" fill="hsl(var(--foreground))" fontWeight="bold">Cross-Section</text>
      <circle cx="250" cy="105" r="35" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1.5" />

      {/* Outer sheath */}
      <circle cx="250" cy="105" r="33" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="2" />

      {/* Light bundles (incoherent) */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = (i * 60 + 15) * Math.PI / 180;
        const cx = 250 + Math.cos(angle) * 22;
        const cy = 105 + Math.sin(angle) * 22;
        return <circle key={i} cx={cx} cy={cy} r="4" fill="hsl(var(--accent))" opacity="0.5" />;
      })}

      {/* Image bundle (coherent) */}
      <circle cx="240" cy="100" r="8" fill="hsl(var(--primary)/0.3)" stroke="hsl(var(--primary))" strokeWidth="1" />
      <text x="240" y="103" textAnchor="middle" fontSize="5" fill="hsl(var(--primary))">img</text>

      {/* Working channel */}
      <circle cx="260" cy="112" r="7" fill="hsl(var(--muted)/0.5)" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
      <text x="260" y="115" textAnchor="middle" fontSize="5" fill="hsl(var(--muted-foreground))">W/C</text>

      {/* Legend */}
      <circle cx="320" cy="70" r="4" fill="hsl(var(--accent))" opacity="0.5" />
      <text x="330" y="73" fontSize="6" fill="hsl(var(--muted-foreground))">Light (incoherent)</text>
      <circle cx="320" cy="85" r="4" fill="hsl(var(--primary)/0.3)" stroke="hsl(var(--primary))" strokeWidth="0.5" />
      <text x="330" y="88" fontSize="6" fill="hsl(var(--muted-foreground))">Image (coherent)</text>
      <circle cx="320" cy="100" r="4" fill="hsl(var(--muted)/0.5)" />
      <text x="330" y="103" fontSize="6" fill="hsl(var(--muted-foreground))">Working channel</text>
    </svg>

    <div className="bg-card border border-border rounded-lg p-4 space-y-2">
      <h4 className="font-semibold text-sm text-foreground">Fibreoptic Bronchoscope</h4>
      <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
        <li><strong>Illumination</strong>: incoherent fibre bundle carries light from external source to tip</li>
        <li><strong>Imaging</strong>: coherent fibre bundle (or CCD chip) transmits image back to eyepiece/screen</li>
        <li><strong>Working channel</strong>: suction, oxygen insufflation, local anaesthetic, biopsy</li>
        <li>Typical outer diameter: 3.8–6.0 mm (adult); 2.2 mm (paediatric/neonatal)</li>
        <li>Tip deflection: 130–180° up, 60–130° down via control lever</li>
      </ul>
    </div>

    <div className="bg-card border border-border rounded-lg p-4 space-y-2">
      <h4 className="font-semibold text-sm text-foreground">Laser Safety in Anaesthesia</h4>
      <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
        <li><strong>Airway fire</strong>: CO₂ laser ignites PVC/rubber ETTs → use laser-safe (metal, wrapped) tubes</li>
        <li><strong>FiO₂</strong>: reduce to ≤30%; avoid N₂O (supports combustion) → use air/O₂ or helium/O₂</li>
        <li><strong>Cuff</strong>: fill with saline (± methylene blue dye to detect perforation)</li>
        <li><strong>Eye protection</strong>: wavelength-specific goggles for all theatre personnel</li>
        <li><strong>Skin protection</strong>: cover patient's face/skin around surgical field with wet drapes</li>
        <li><strong>Controlled access</strong>: warning signs on doors, key-operated laser</li>
      </ul>
    </div>
  </div>
);

const LaserFibreopticsDiagram = () => {
  const [activeTab, setActiveTab] = useState("laser");

  return (
    <DiagramFigure
      id="laser-fibreoptics-diagram"
      title="Laser fibreoptics"
      description="Auto-generated wrapper for the Laser fibreoptics anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
                  <div className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="laser" className="text-xs">LASER Principles</TabsTrigger>
            <TabsTrigger value="fibreoptic" className="text-xs">Fibreoptics & TIR</TabsTrigger>
            <TabsTrigger value="clinical" className="text-xs">Clinical Use</TabsTrigger>
          </TabsList>
          <TabsContent value="laser"><LaserPrinciplesTab /></TabsContent>
          <TabsContent value="fibreoptic"><FibreopticTab /></TabsContent>
          <TabsContent value="clinical"><ClinicalTab /></TabsContent>
        </Tabs>
      </div>
    </DiagramFigure>
  );
};

export default LaserFibreopticsDiagram;
