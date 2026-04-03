import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const HumidityTab = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-foreground">Humidity & Humidification</h3>
    <p className="text-sm text-muted-foreground">
      Absolute humidity (mg/L) vs relative humidity (%). The nose conditions inspired gas to 37°C, 44 mg/L (100% RH) at the carina.
    </p>
    <svg viewBox="0 0 400 280" className="w-full max-w-md mx-auto">
      {/* Airway schematic */}
      <text x="200" y="20" textAnchor="middle" fontSize="11" fill="hsl(var(--foreground))" fontWeight="bold">Humidity Along the Airway</text>
      
      {/* Airway path */}
      <path d="M 40 60 L 120 60 L 160 80 L 220 80 L 260 100 L 360 100" stroke="hsl(var(--primary))" strokeWidth="3" fill="none" />
      <path d="M 40 110 L 120 110 L 160 100 L 220 100 L 260 110 L 360 110" stroke="hsl(var(--primary))" strokeWidth="3" fill="none" />
      
      {/* Labels along path */}
      <text x="40" y="50" fontSize="8" fill="hsl(var(--muted-foreground))">Nose</text>
      <text x="130" y="70" fontSize="8" fill="hsl(var(--muted-foreground))">Pharynx</text>
      <text x="220" y="72" fontSize="8" fill="hsl(var(--muted-foreground))">Trachea</text>
      <text x="330" y="92" fontSize="8" fill="hsl(var(--muted-foreground))">Carina</text>
      
      {/* Humidity values */}
      <rect x="20" y="125" width="70" height="35" rx="6" fill="hsl(var(--primary)/0.1)" stroke="hsl(var(--primary)/0.3)" strokeWidth="1" />
      <text x="55" y="142" textAnchor="middle" fontSize="8" fill="hsl(var(--primary))" fontWeight="bold">Ambient</text>
      <text x="55" y="153" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">~10 mg/L</text>
      
      <rect x="165" y="125" width="70" height="35" rx="6" fill="hsl(var(--primary)/0.2)" stroke="hsl(var(--primary)/0.4)" strokeWidth="1" />
      <text x="200" y="142" textAnchor="middle" fontSize="8" fill="hsl(var(--primary))" fontWeight="bold">Oropharynx</text>
      <text x="200" y="153" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">~30 mg/L</text>
      
      <rect x="310" y="125" width="70" height="35" rx="6" fill="hsl(var(--primary)/0.3)" stroke="hsl(var(--primary)/0.5)" strokeWidth="1" />
      <text x="345" y="142" textAnchor="middle" fontSize="8" fill="hsl(var(--primary))" fontWeight="bold">Carina</text>
      <text x="345" y="153" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">44 mg/L</text>
      
      {/* Gradient arrow */}
      <defs>
        <linearGradient id="humGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
        </linearGradient>
        <marker id="humArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--primary))" />
        </marker>
      </defs>
      <rect x="40" y="170" width="320" height="8" rx="4" fill="url(#humGrad)" />
      <text x="200" y="195" textAnchor="middle" fontSize="9" fill="hsl(var(--foreground))" fontWeight="bold">Isothermic Saturation Boundary</text>
      <text x="200" y="208" textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">Below carina: gas is 37°C, 44 mg/L, 100% RH</text>
      
      {/* HME vs heated humidifier */}
      <rect x="30" y="225" width="160" height="45" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
      <text x="110" y="242" textAnchor="middle" fontSize="9" fill="hsl(var(--foreground))" fontWeight="bold">HME Filter</text>
      <text x="110" y="255" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">25-30 mg/L • Passive</text>
      <text x="110" y="265" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">Adds dead space (30-90 mL)</text>
      
      <rect x="210" y="225" width="160" height="45" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
      <text x="290" y="242" textAnchor="middle" fontSize="9" fill="hsl(var(--foreground))" fontWeight="bold">Heated Humidifier</text>
      <text x="290" y="255" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">44 mg/L • Active</text>
      <text x="290" y="265" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">Risk of condensation/burns</text>
    </svg>
    
    <div className="bg-card border border-border rounded-lg p-4 space-y-2">
      <h4 className="font-semibold text-sm text-foreground">Key Concepts</h4>
      <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
        <li><strong>Absolute humidity</strong>: mass of water vapour per unit volume (mg/L)</li>
        <li><strong>Relative humidity</strong>: actual water vapour content as % of maximum at that temperature</li>
        <li><strong>SVP of water at 37°C</strong> = 6.3 kPa → absolute humidity = 44 mg/L at 100% RH</li>
        <li><strong>Isothermic saturation boundary (ISB)</strong>: point below which gas is fully conditioned; normally at the carina</li>
        <li>ETT bypasses nose → ISB moves distally → mucociliary damage, secretion thickening</li>
        <li><strong>Measurement</strong>: Regnault's hygrometer (dew point), hair hygrometer, wet-and-dry bulb thermometer</li>
      </ul>
    </div>
  </div>
);

const PneumotachTab = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-foreground">Pneumotachograph</h3>
    <p className="text-sm text-muted-foreground">
      Measures gas flow by detecting pressure drop across a known resistance. Two main types: Fleisch and Lilly.
    </p>
    <svg viewBox="0 0 400 320" className="w-full max-w-md mx-auto">
      <text x="200" y="20" textAnchor="middle" fontSize="11" fill="hsl(var(--foreground))" fontWeight="bold">Fleisch Pneumotachograph</text>
      
      {/* Tube outer wall */}
      <rect x="40" y="50" width="320" height="80" rx="10" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="2" />
      
      {/* Laminar flow tubes (capillaries) */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <line key={i} x1="140" y1={58 + i * 10} x2="260" y2={58 + i * 10} stroke="hsl(var(--primary)/0.4)" strokeWidth="2" />
      ))}
      <text x="200" y="95" textAnchor="middle" fontSize="8" fill="hsl(var(--primary))" fontWeight="bold">Parallel capillary tubes</text>
      <text x="200" y="107" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">(ensure laminar flow)</text>
      
      {/* Flow arrows */}
      <path d="M 55 90 L 130 90" stroke="hsl(var(--primary))" strokeWidth="2" markerEnd="url(#pnArrow)" fill="none">
        <animate attributeName="stroke-dashoffset" values="20;0" dur="1s" repeatCount="indefinite" />
      </path>
      <text x="90" y="82" textAnchor="middle" fontSize="8" fill="hsl(var(--primary))">Flow →</text>
      
      {/* Pressure taps */}
      <line x1="140" y1="50" x2="140" y2="30" stroke="hsl(var(--destructive))" strokeWidth="2" />
      <line x1="260" y1="50" x2="260" y2="30" stroke="hsl(var(--destructive))" strokeWidth="2" />
      <circle cx="140" cy="28" r="4" fill="hsl(var(--destructive))" />
      <circle cx="260" cy="28" r="4" fill="hsl(var(--destructive))" />
      <text x="140" y="22" textAnchor="middle" fontSize="7" fill="hsl(var(--destructive))">P₁</text>
      <text x="260" y="22" textAnchor="middle" fontSize="7" fill="hsl(var(--destructive))">P₂</text>
      
      {/* Differential pressure transducer */}
      <line x1="140" y1="28" x2="185" y2="15" stroke="hsl(var(--destructive))" strokeWidth="1" strokeDasharray="3,2" />
      <line x1="260" y1="28" x2="215" y2="15" stroke="hsl(var(--destructive))" strokeWidth="1" strokeDasharray="3,2" />
      <rect x="175" y="2" width="50" height="18" rx="4" fill="hsl(var(--card))" stroke="hsl(var(--destructive))" strokeWidth="1" />
      <text x="200" y="14" textAnchor="middle" fontSize="6" fill="hsl(var(--destructive))" fontWeight="bold">ΔP sensor</text>
      
      <defs>
        <marker id="pnArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--primary))" />
        </marker>
      </defs>
      
      {/* Formula */}
      <text x="200" y="155" textAnchor="middle" fontSize="11" fill="hsl(var(--foreground))" fontWeight="bold">ΔP = Flow × Resistance</text>
      <text x="200" y="170" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">Hagen-Poiseuille: ΔP ∝ Flow (if laminar)</text>
      
      {/* Lilly comparison */}
      <text x="200" y="200" textAnchor="middle" fontSize="11" fill="hsl(var(--foreground))" fontWeight="bold">Lilly Pneumotachograph</text>
      <rect x="40" y="210" width="320" height="50" rx="10" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="2" />
      
      {/* Screen/mesh */}
      <line x1="200" y1="210" x2="200" y2="260" stroke="hsl(var(--primary))" strokeWidth="3" strokeDasharray="5,3" />
      <text x="200" y="275" textAnchor="middle" fontSize="8" fill="hsl(var(--primary))" fontWeight="bold">Fine wire mesh screen</text>
      
      {/* Pressure taps for Lilly */}
      <circle cx="170" cy="208" r="3" fill="hsl(var(--destructive))" />
      <circle cx="230" cy="208" r="3" fill="hsl(var(--destructive))" />
      <text x="170" y="204" textAnchor="middle" fontSize="6" fill="hsl(var(--destructive))">P₁</text>
      <text x="230" y="204" textAnchor="middle" fontSize="6" fill="hsl(var(--destructive))">P₂</text>
      
      <text x="200" y="305" textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">Both need heating to prevent condensation errors</text>
    </svg>
    
    <div className="bg-card border border-border rounded-lg p-4 space-y-2">
      <h4 className="font-semibold text-sm text-foreground">Key Physics</h4>
      <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
        <li><strong>Fleisch</strong>: parallel capillary tubes ensure laminar flow; ΔP measured across bundle</li>
        <li><strong>Lilly</strong>: fine wire mesh screen creates small known resistance</li>
        <li>Both rely on <strong>Hagen-Poiseuille</strong>: ΔP ∝ flow (only valid for laminar flow)</li>
        <li><strong>Integration</strong> of flow signal gives volume (tidal volume, minute ventilation)</li>
        <li><strong>Heated</strong> to 37°C to prevent condensation on tubes/mesh → inaccuracy</li>
        <li>Affected by gas composition changes (viscosity, density) — needs BTPS correction</li>
      </ul>
    </div>
  </div>
);

const MassSpecTab = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-foreground">Mass Spectrometry</h3>
    <p className="text-sm text-muted-foreground">
      Identifies and quantifies gases by ionising molecules and separating them by mass-to-charge ratio (m/z) in a magnetic field.
    </p>
    <svg viewBox="0 0 420 300" className="w-full max-w-md mx-auto">
      <text x="210" y="20" textAnchor="middle" fontSize="11" fill="hsl(var(--foreground))" fontWeight="bold">Magnetic Sector Mass Spectrometer</text>
      
      {/* Sample inlet */}
      <rect x="10" y="60" width="60" height="40" rx="6" fill="hsl(var(--primary)/0.15)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      <text x="40" y="78" textAnchor="middle" fontSize="7" fill="hsl(var(--primary))" fontWeight="bold">Sample</text>
      <text x="40" y="88" textAnchor="middle" fontSize="7" fill="hsl(var(--primary))">Inlet</text>
      
      {/* Arrow to ionisation */}
      <line x1="70" y1="80" x2="100" y2="80" stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#msArrow)" />
      
      {/* Ionisation chamber */}
      <rect x="100" y="55" width="70" height="50" rx="6" fill="hsl(var(--destructive)/0.1)" stroke="hsl(var(--destructive))" strokeWidth="1.5" />
      <text x="135" y="75" textAnchor="middle" fontSize="7" fill="hsl(var(--destructive))" fontWeight="bold">Ionisation</text>
      <text x="135" y="85" textAnchor="middle" fontSize="7" fill="hsl(var(--destructive))">Chamber</text>
      <text x="135" y="48" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Electron bombardment</text>
      {/* Electron beam zigzag */}
      <path d="M 110 58 L 115 62 L 120 58 L 125 62 L 130 58 L 135 62 L 140 58 L 145 62 L 150 58 L 155 62 L 160 58" stroke="#FBBF24" strokeWidth="1" fill="none">
        <animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="1s" repeatCount="indefinite" />
      </path>
      
      {/* Arrow to accelerator */}
      <line x1="170" y1="80" x2="200" y2="80" stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#msArrow)" />
      
      {/* Accelerating plates */}
      <rect x="200" y="55" width="35" height="50" rx="4" fill="hsl(var(--accent))" stroke="hsl(var(--border))" strokeWidth="1.5" />
      <text x="217" y="83" textAnchor="middle" fontSize="6" fill="hsl(var(--foreground))" fontWeight="bold">Accel.</text>
      <text x="217" y="50" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">High V</text>
      
      {/* Magnetic field region - curved paths */}
      <path d="M 235 80 Q 290 80, 320 130 Q 350 180, 320 230 Q 290 280, 250 280" stroke="hsl(var(--muted-foreground))" strokeWidth="1" fill="none" strokeDasharray="4,2" />
      <text x="340" y="155" fontSize="8" fill="hsl(var(--muted-foreground))" fontWeight="bold">B field</text>
      <text x="340" y="167" fontSize="7" fill="hsl(var(--muted-foreground))">(⊙ out of page)</text>
      
      {/* Ion paths - different radii for different masses */}
      {/* Light ion (e.g., He, m/z=4) - tighter curve */}
      <path d="M 235 78 Q 270 78, 285 110 Q 300 142, 285 174 Q 270 200, 245 210" stroke="#10B981" strokeWidth="2" fill="none">
        <animate attributeName="stroke-dashoffset" values="40;0" dur="2s" repeatCount="indefinite" />
      </path>
      <circle cx="245" cy="212" r="6" fill="#10B981" opacity="0.3" stroke="#10B981" strokeWidth="1" />
      <text x="245" y="230" textAnchor="middle" fontSize="7" fill="#10B981" fontWeight="bold">m/z = 4</text>
      <text x="245" y="240" textAnchor="middle" fontSize="6" fill="#10B981">He⁺</text>
      
      {/* Medium ion (N₂O, m/z=44) */}
      <path d="M 235 80 Q 280 80, 300 120 Q 320 160, 300 200 Q 280 240, 260 250" stroke="#6366F1" strokeWidth="2" fill="none">
        <animate attributeName="stroke-dashoffset" values="40;0" dur="2s" repeatCount="indefinite" />
      </path>
      <circle cx="260" cy="252" r="6" fill="#6366F1" opacity="0.3" stroke="#6366F1" strokeWidth="1" />
      <text x="265" y="268" textAnchor="middle" fontSize="7" fill="#6366F1" fontWeight="bold">m/z = 44</text>
      <text x="265" y="278" textAnchor="middle" fontSize="6" fill="#6366F1">CO₂/N₂O</text>
      
      {/* Heavy ion - wider curve */}
      <path d="M 235 82 Q 295 82, 320 135 Q 345 188, 315 240 Q 290 275, 275 280" stroke="#F59E0B" strokeWidth="2" fill="none">
        <animate attributeName="stroke-dashoffset" values="40;0" dur="2s" repeatCount="indefinite" />
      </path>
      <circle cx="275" cy="282" r="6" fill="#F59E0B" opacity="0.3" stroke="#F59E0B" strokeWidth="1" />
      <text x="290" y="292" textAnchor="middle" fontSize="7" fill="#F59E0B" fontWeight="bold">m/z = 131</text>
      <text x="290" y="302" textAnchor="middle" fontSize="6" fill="#F59E0B">Xe⁺</text>
      
      {/* Detectors */}
      <text x="180" y="215" fontSize="7" fill="hsl(var(--foreground))" fontWeight="bold">Detectors</text>
      <text x="180" y="225" fontSize="6" fill="hsl(var(--muted-foreground))">(Faraday cups)</text>
      
      {/* Formula */}
      <rect x="10" y="120" width="130" height="40" rx="6" fill="hsl(var(--primary)/0.08)" stroke="hsl(var(--primary)/0.3)" strokeWidth="1" />
      <text x="75" y="138" textAnchor="middle" fontSize="9" fill="hsl(var(--foreground))" fontWeight="bold">r = mv / qB</text>
      <text x="75" y="152" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">radius ∝ mass</text>
      
      <defs>
        <marker id="msArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--foreground))" />
        </marker>
      </defs>
    </svg>
    
    <div className="bg-card border border-border rounded-lg p-4 space-y-2">
      <h4 className="font-semibold text-sm text-foreground">Key Physics</h4>
      <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
        <li><strong>Principle</strong>: gas molecules ionised by electron bombardment → accelerated → deflected by magnetic field</li>
        <li><strong>Radius of curvature</strong>: r = mv/qB — heavier ions travel wider arcs</li>
        <li>Can identify <strong>all gases simultaneously</strong> — the only analyser to do so</li>
        <li><strong>N₂O and CO₂</strong> both have m/z = 44 — must be distinguished by fragmentation patterns</li>
        <li>Requires <strong>high vacuum</strong> (10⁻⁶ mmHg) in the analyser chamber</li>
        <li>Response time ~100 ms; can be <strong>shared</strong> between multiple operating theatres via multiplexing</li>
        <li><strong>Disadvantages</strong>: very expensive, large, requires vacuum pump, not portable</li>
      </ul>
    </div>
  </div>
);

const RamanTab = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-foreground">Raman Scattering</h3>
    <p className="text-sm text-muted-foreground">
      Monochromatic light interacts with gas molecules; scattered light shifts in frequency proportional to molecular bond vibrations.
    </p>
    <svg viewBox="0 0 400 300" className="w-full max-w-md mx-auto">
      <text x="200" y="20" textAnchor="middle" fontSize="11" fill="hsl(var(--foreground))" fontWeight="bold">Raman Scattering Principle</text>
      
      {/* Laser source */}
      <rect x="10" y="100" width="60" height="30" rx="6" fill="hsl(var(--destructive)/0.15)" stroke="hsl(var(--destructive))" strokeWidth="1.5" />
      <text x="40" y="118" textAnchor="middle" fontSize="8" fill="hsl(var(--destructive))" fontWeight="bold">Argon</text>
      <text x="40" y="128" textAnchor="middle" fontSize="7" fill="hsl(var(--destructive))">Laser</text>
      
      {/* Incident beam */}
      <line x1="70" y1="115" x2="170" y2="115" stroke="hsl(var(--destructive))" strokeWidth="3">
        <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite" />
      </line>
      <text x="120" y="108" textAnchor="middle" fontSize="7" fill="hsl(var(--destructive))">ν₀ (incident)</text>
      
      {/* Sample chamber */}
      <circle cx="200" cy="115" r="35" fill="hsl(var(--primary)/0.1)" stroke="hsl(var(--primary))" strokeWidth="2" />
      <text x="200" y="112" textAnchor="middle" fontSize="8" fill="hsl(var(--primary))" fontWeight="bold">Gas</text>
      <text x="200" y="124" textAnchor="middle" fontSize="7" fill="hsl(var(--primary))">Sample</text>
      
      {/* Molecule vibrating */}
      <circle cx="190" cy="105" r="4" fill="hsl(var(--primary))" opacity="0.6">
        <animate attributeName="cx" values="188;192;188" dur="0.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="210" cy="105" r="4" fill="hsl(var(--primary))" opacity="0.6">
        <animate attributeName="cx" values="212;208;212" dur="0.5s" repeatCount="indefinite" />
      </circle>
      
      {/* Rayleigh scattering (straight through) */}
      <line x1="235" y1="115" x2="330" y2="115" stroke="hsl(var(--muted-foreground))" strokeWidth="2" strokeDasharray="4,2" />
      <text x="310" y="108" fontSize="7" fill="hsl(var(--muted-foreground))">Rayleigh (ν₀)</text>
      <text x="310" y="130" fontSize="6" fill="hsl(var(--muted-foreground))">Same frequency</text>
      <text x="310" y="140" fontSize="6" fill="hsl(var(--muted-foreground))">(elastic — most light)</text>
      
      {/* Stokes scattering (downshift) */}
      <line x1="220" y1="140" x2="300" y2="200" stroke="#10B981" strokeWidth="2.5" />
      <text x="310" y="195" fontSize="8" fill="#10B981" fontWeight="bold">Stokes</text>
      <text x="310" y="208" fontSize="7" fill="#10B981">ν₀ − Δν</text>
      <text x="310" y="220" fontSize="6" fill="hsl(var(--muted-foreground))">Lower energy</text>
      <text x="310" y="230" fontSize="6" fill="hsl(var(--muted-foreground))">(molecule gains energy)</text>
      
      {/* Anti-Stokes scattering (upshift) */}
      <line x1="220" y1="90" x2="300" y2="40" stroke="#F59E0B" strokeWidth="2" />
      <text x="310" y="40" fontSize="8" fill="#F59E0B" fontWeight="bold">Anti-Stokes</text>
      <text x="310" y="53" fontSize="7" fill="#F59E0B">ν₀ + Δν</text>
      <text x="310" y="65" fontSize="6" fill="hsl(var(--muted-foreground))">Higher energy</text>
      
      {/* Energy level diagram */}
      <rect x="20" y="180" width="170" height="110" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
      <text x="105" y="198" textAnchor="middle" fontSize="8" fill="hsl(var(--foreground))" fontWeight="bold">Energy Levels</text>
      
      {/* Ground state */}
      <line x1="40" y1="270" x2="90" y2="270" stroke="hsl(var(--foreground))" strokeWidth="2" />
      <text x="65" y="282" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Ground</text>
      
      {/* Excited vibrational */}
      <line x1="40" y1="240" x2="90" y2="240" stroke="hsl(var(--foreground))" strokeWidth="2" />
      <text x="65" y="236" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">v=1</text>
      
      {/* Virtual state */}
      <line x1="40" y1="205" x2="170" y2="205" stroke="hsl(var(--foreground))" strokeWidth="1" strokeDasharray="4,2" />
      <text x="105" y="202" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Virtual state</text>
      
      {/* Stokes transition */}
      <line x1="55" y1="270" x2="55" y2="205" stroke="#10B981" strokeWidth="1.5" />
      <line x1="75" y1="205" x2="75" y2="240" stroke="#10B981" strokeWidth="1.5" />
      <text x="65" y="218" textAnchor="middle" fontSize="6" fill="#10B981">Stokes</text>
      
      {/* Rayleigh transition */}
      <line x1="115" y1="270" x2="115" y2="205" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" />
      <line x1="135" y1="205" x2="135" y2="270" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" />
      <text x="125" y="250" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Rayleigh</text>
      
      {/* Anti-Stokes */}
      <line x1="155" y1="240" x2="155" y2="205" stroke="#F59E0B" strokeWidth="1.5" />
      <line x1="165" y1="205" x2="165" y2="270" stroke="#F59E0B" strokeWidth="1.5" />
      <text x="160" y="256" textAnchor="middle" fontSize="5" fill="#F59E0B">Anti-S</text>
    </svg>
    
    <div className="bg-card border border-border rounded-lg p-4 space-y-2">
      <h4 className="font-semibold text-sm text-foreground">Key Physics</h4>
      <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
        <li><strong>Raman scattering</strong>: inelastic scattering — photon energy changes by amount equal to molecular vibrational energy</li>
        <li>Frequency shift (Δν) is <strong>unique to each molecule</strong> — acts as a molecular fingerprint</li>
        <li><strong>Stokes shift</strong>: scattered photon has lower energy (molecule gains energy) — most clinically measured</li>
        <li>Can analyse <strong>all gases including N₂</strong> (unlike IR absorption which cannot detect homonuclear diatomic molecules)</li>
        <li>Distinguishes N₂O from CO₂ (same m/z = 44 on mass spec) by different Raman shifts</li>
        <li><strong>Advantages</strong>: fast, measures all gases, no vacuum needed, can be sidestream</li>
        <li><strong>Disadvantages</strong>: very weak signal (~1 in 10⁷ photons), expensive laser, requires powerful optics</li>
      </ul>
    </div>
  </div>
);

const HumidityGasSamplingDiagram = () => {
  const [activeTab, setActiveTab] = useState("humidity");

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="humidity" className="text-xs">Humidity</TabsTrigger>
          <TabsTrigger value="pneumotach" className="text-xs">Pneumotach</TabsTrigger>
          <TabsTrigger value="mass-spec" className="text-xs">Mass Spec</TabsTrigger>
          <TabsTrigger value="raman" className="text-xs">Raman</TabsTrigger>
        </TabsList>
        <TabsContent value="humidity"><HumidityTab /></TabsContent>
        <TabsContent value="pneumotach"><PneumotachTab /></TabsContent>
        <TabsContent value="mass-spec"><MassSpecTab /></TabsContent>
        <TabsContent value="raman"><RamanTab /></TabsContent>
      </Tabs>
    </div>
  );
};

export default HumidityGasSamplingDiagram;
