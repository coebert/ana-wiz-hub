import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DiagramFigure } from "./_shared/DiagramFigure";

const ThermocoupleTab = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-foreground">Thermocouple</h3>
    <p className="text-sm text-muted-foreground">
      Two dissimilar metals joined at a junction produce a voltage (Seebeck effect) proportional to temperature difference.
    </p>
    <svg viewBox="0 0 400 260" className="w-full max-w-md mx-auto">
      {/* Background */}
      <rect x="0" y="0" width="400" height="260" fill="none" />
      
      {/* Measuring junction (patient end) */}
      <circle cx="80" cy="130" r="20" fill="hsl(var(--primary)/0.15)" stroke="hsl(var(--primary))" strokeWidth="2">
        <animate attributeName="r" values="18;22;18" dur="2s" repeatCount="indefinite" />
      </circle>
      <text x="80" y="135" textAnchor="middle" fontSize="10" fill="hsl(var(--primary))" fontWeight="bold">T₁</text>
      <text x="80" y="175" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">Measuring</text>
      <text x="80" y="186" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">Junction</text>
      
      {/* Wire A (top) - Copper */}
      <path d="M 100 120 L 280 120" stroke="hsl(var(--accent))" strokeWidth="3" fill="none" />
      <text x="190" y="112" textAnchor="middle" fontSize="9" fill="hsl(var(--accent))" fontWeight="bold">Metal A (Copper)</text>
      
      {/* Wire B (bottom) - Constantan */}
      <path d="M 100 140 L 280 140" stroke="hsl(var(--primary))" strokeWidth="3" fill="none" />
      <text x="190" y="158" textAnchor="middle" fontSize="9" fill="hsl(var(--primary))" fontWeight="bold">Metal B (Constantan)</text>
      
      {/* Reference junction */}
      <circle cx="300" cy="130" r="20" fill="hsl(var(--muted)/0.3)" stroke="hsl(var(--muted-foreground))" strokeWidth="2" />
      <text x="300" y="135" textAnchor="middle" fontSize="10" fill="hsl(var(--muted-foreground))" fontWeight="bold">T₂</text>
      <text x="300" y="175" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">Reference</text>
      <text x="300" y="186" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">Junction</text>
      
      {/* Voltmeter */}
      <line x1="300" y1="110" x2="300" y2="60" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
      <circle cx="300" cy="45" r="18" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2" />
      <text x="300" y="49" textAnchor="middle" fontSize="10" fill="hsl(var(--primary))" fontWeight="bold">mV</text>
      
      {/* EMF indication */}
      <text x="300" y="25" textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">Seebeck EMF</text>
      
      {/* Arrow showing voltage */}
      <path d="M 120 90 L 260 90" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="4,2" markerEnd="url(#arrowT)" fill="none" />
      <text x="190" y="85" textAnchor="middle" fontSize="8" fill="hsl(var(--primary))">EMF ∝ (T₁ − T₂)</text>
      
      <defs>
        <marker id="arrowT" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--primary))" />
        </marker>
      </defs>
      
      {/* Labels */}
      <text x="200" y="220" textAnchor="middle" fontSize="10" fill="hsl(var(--foreground))" fontWeight="bold">~40 μV/°C (Type T: Copper-Constantan)</text>
      <text x="200" y="240" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">Fast response (ms) • Small probe size • Wide range −200 to +400°C</text>
    </svg>
    
    <div className="bg-card border border-border rounded-lg p-4 space-y-2">
      <h4 className="font-semibold text-sm text-foreground">Key Physics</h4>
      <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
        <li><strong>Seebeck effect</strong>: EMF generated at junction of two dissimilar metals proportional to temperature difference</li>
        <li><strong>Type T</strong> (copper-constantan): most common in clinical use; ~40 μV/°C</li>
        <li><strong>Advantages</strong>: very fast response, small probe, can measure core temperature (nasopharyngeal, oesophageal, rectal)</li>
        <li><strong>Limitation</strong>: small EMF requires amplification; needs reference junction compensation</li>
        <li>Does NOT require a battery or external power source — self-generating EMF</li>
      </ul>
    </div>
  </div>
);

const ThermistorTab = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-foreground">Thermistor</h3>
    <p className="text-sm text-muted-foreground">
      A semiconductor whose resistance changes markedly with temperature (negative temperature coefficient — NTC).
    </p>
    <svg viewBox="0 0 400 300" className="w-full max-w-md mx-auto">
      {/* Thermistor bead */}
      <ellipse cx="120" cy="130" rx="30" ry="20" fill="hsl(var(--primary)/0.2)" stroke="hsl(var(--primary))" strokeWidth="2">
        <animate attributeName="fill-opacity" values="0.2;0.4;0.2" dur="2s" repeatCount="indefinite" />
      </ellipse>
      <text x="120" y="126" textAnchor="middle" fontSize="9" fill="hsl(var(--primary))" fontWeight="bold">NTC</text>
      <text x="120" y="138" textAnchor="middle" fontSize="8" fill="hsl(var(--primary))">Thermistor</text>
      
      {/* Leads */}
      <line x1="150" y1="130" x2="220" y2="130" stroke="hsl(var(--foreground))" strokeWidth="2" />
      <line x1="90" y1="130" x2="40" y2="130" stroke="hsl(var(--foreground))" strokeWidth="2" />
      <line x1="40" y1="130" x2="40" y2="60" stroke="hsl(var(--foreground))" strokeWidth="2" />
      <line x1="220" y1="130" x2="220" y2="60" stroke="hsl(var(--foreground))" strokeWidth="2" />
      
      {/* Wheatstone bridge */}
      <rect x="30" y="30" width="200" height="60" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1.5" />
      <text x="130" y="55" textAnchor="middle" fontSize="10" fill="hsl(var(--foreground))" fontWeight="bold">Wheatstone Bridge</text>
      <text x="130" y="70" textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">Measures resistance change</text>
      
      {/* Resistance-Temperature curve */}
      <text x="320" y="40" textAnchor="middle" fontSize="10" fill="hsl(var(--foreground))" fontWeight="bold">R vs T</text>
      <rect x="270" y="50" width="110" height="100" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" rx="4" />
      
      {/* Axes */}
      <line x1="285" y1="140" x2="285" y2="58" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
      <line x1="285" y1="140" x2="370" y2="140" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
      <text x="278" y="95" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))" transform="rotate(-90,278,95)">R (kΩ)</text>
      <text x="330" y="150" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">T (°C)</text>
      
      {/* Non-linear curve */}
      <path d="M 290 65 Q 310 70, 320 90 Q 330 110, 345 125 Q 355 132, 365 135" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" />
      <text x="330" y="80" fontSize="7" fill="hsl(var(--destructive))">Non-linear!</text>
      
      {/* Temperature arrow */}
      <path d="M 100 170 L 100 200" stroke="hsl(var(--destructive))" strokeWidth="1.5" markerEnd="url(#arrowDown)" fill="none" />
      <text x="100" y="215" textAnchor="middle" fontSize="9" fill="hsl(var(--destructive))">↑ Temp</text>
      <text x="100" y="228" textAnchor="middle" fontSize="9" fill="hsl(var(--destructive))">↓ Resistance</text>
      
      <defs>
        <marker id="arrowDown" viewBox="0 0 10 10" refX="5" refY="9" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 0 L 5 10 z" fill="hsl(var(--destructive))" />
        </marker>
      </defs>
      
      {/* Clinical uses */}
      <text x="200" y="265" textAnchor="middle" fontSize="10" fill="hsl(var(--foreground))" fontWeight="bold">PA catheter tip • Skin temperature probes</text>
      <text x="200" y="282" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">Very sensitive • Non-linear response • Needs linearisation circuit</text>
    </svg>
    
    <div className="bg-card border border-border rounded-lg p-4 space-y-2">
      <h4 className="font-semibold text-sm text-foreground">Key Physics</h4>
      <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
        <li><strong>NTC thermistor</strong>: resistance falls exponentially as temperature rises (semiconductor)</li>
        <li>Measured using a <strong>Wheatstone bridge</strong> circuit</li>
        <li><strong>Non-linear</strong> response — requires calibration or linearisation circuitry</li>
        <li><strong>Very sensitive</strong> — large resistance change per °C (much more than RTD)</li>
        <li>Used in <strong>PA catheter tip</strong> (cardiac output by thermodilution), skin probes</li>
        <li>Slower response than thermocouple, faster than mercury thermometer</li>
      </ul>
    </div>
  </div>
);

const RTDTab = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-foreground">Resistance Thermometer (RTD)</h3>
    <p className="text-sm text-muted-foreground">
      A metallic conductor (platinum) whose resistance increases linearly with temperature (positive temperature coefficient — PTC).
    </p>
    <svg viewBox="0 0 400 280" className="w-full max-w-md mx-auto">
      {/* Platinum coil */}
      <rect x="60" y="80" width="100" height="60" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1.5" />
      <text x="110" y="100" textAnchor="middle" fontSize="9" fill="hsl(var(--foreground))" fontWeight="bold">Platinum</text>
      <text x="110" y="112" textAnchor="middle" fontSize="9" fill="hsl(var(--foreground))" fontWeight="bold">Wire Coil</text>
      {/* Coil representation */}
      <path d="M 80 125 Q 85 118, 90 125 Q 95 132, 100 125 Q 105 118, 110 125 Q 115 132, 120 125 Q 125 118, 130 125 Q 135 132, 140 125" stroke="hsl(var(--primary))" strokeWidth="2" fill="none">
        <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
      </path>
      
      {/* Leads to Wheatstone bridge */}
      <line x1="80" y1="125" x2="60" y2="125" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
      <line x1="140" y1="125" x2="160" y2="125" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
      <line x1="60" y1="125" x2="60" y2="30" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
      <line x1="160" y1="125" x2="160" y2="30" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
      
      {/* Wheatstone bridge label */}
      <rect x="40" y="10" width="140" height="25" rx="6" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
      <text x="110" y="27" textAnchor="middle" fontSize="9" fill="hsl(var(--foreground))" fontWeight="bold">Wheatstone Bridge</text>
      
      {/* R vs T graph - LINEAR */}
      <text x="310" y="40" textAnchor="middle" fontSize="10" fill="hsl(var(--foreground))" fontWeight="bold">R vs T</text>
      <rect x="260" y="50" width="120" height="100" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" rx="4" />
      
      {/* Axes */}
      <line x1="275" y1="140" x2="275" y2="58" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
      <line x1="275" y1="140" x2="370" y2="140" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
      <text x="268" y="95" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))" transform="rotate(-90,268,95)">R (Ω)</text>
      <text x="325" y="150" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">T (°C)</text>
      
      {/* Linear line */}
      <line x1="280" y1="130" x2="365" y2="65" stroke="hsl(var(--clinical))" strokeWidth="2" />
      <text x="340" y="80" fontSize="8" fill="hsl(var(--clinical))" fontWeight="bold">Linear!</text>
      
      {/* R₀ label */}
      <text x="280" y="138" fontSize="7" fill="hsl(var(--muted-foreground))">R₀</text>
      <text x="280" y="148" fontSize="6" fill="hsl(var(--muted-foreground))">100Ω</text>
      
      {/* Formula */}
      <text x="200" y="195" textAnchor="middle" fontSize="11" fill="hsl(var(--foreground))" fontWeight="bold">Rₜ = R₀(1 + αΔT)</text>
      <text x="200" y="212" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">α = 0.00385 Ω/Ω/°C for Pt100</text>
      
      {/* Comparison box */}
      <rect x="40" y="230" width="320" height="40" rx="8" fill="hsl(var(--primary)/0.08)" stroke="hsl(var(--primary)/0.3)" strokeWidth="1" />
      <text x="200" y="248" textAnchor="middle" fontSize="9" fill="hsl(var(--primary))" fontWeight="bold">Pt100: 100Ω at 0°C → 138.5Ω at 100°C</text>
      <text x="200" y="262" textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">Most accurate • Most stable • Slowest response • Laboratory standard</text>
    </svg>
    
    <div className="bg-card border border-border rounded-lg p-4 space-y-2">
      <h4 className="font-semibold text-sm text-foreground">Key Physics</h4>
      <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
        <li><strong>Positive temperature coefficient (PTC)</strong>: resistance increases linearly with temperature in metals</li>
        <li><strong>Pt100</strong>: platinum element with R₀ = 100Ω at 0°C; gold standard for accuracy</li>
        <li><strong>Linear response</strong> — main advantage over thermistor</li>
        <li><strong>Less sensitive</strong> than thermistor (0.385 Ω/°C vs thousands of Ω/°C)</li>
        <li><strong>Slowest response</strong> of electronic thermometers — used as laboratory reference</li>
        <li>Also measured using a Wheatstone bridge circuit</li>
      </ul>
    </div>
  </div>
);

const InfraredTab = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-foreground">Infrared Tympanic Thermometry</h3>
    <p className="text-sm text-muted-foreground">
      Detects infrared radiation emitted from the tympanic membrane — a non-contact measure of core temperature.
    </p>
    <svg viewBox="0 0 400 300" className="w-full max-w-md mx-auto">
      {/* Ear canal */}
      <path d="M 60 100 Q 60 60, 100 55 Q 150 50, 180 70 Q 200 85, 200 130 Q 200 175, 180 190 Q 150 210, 100 205 Q 60 200, 60 160" 
            fill="hsl(var(--muted)/0.3)" stroke="hsl(var(--border))" strokeWidth="1.5" />
      <text x="130" y="135" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">External</text>
      <text x="130" y="147" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">Auditory Canal</text>
      
      {/* Tympanic membrane */}
      <ellipse cx="190" cy="130" rx="8" ry="40" fill="hsl(var(--destructive)/0.2)" stroke="hsl(var(--destructive))" strokeWidth="2">
        <animate attributeName="fill-opacity" values="0.1;0.3;0.1" dur="1.5s" repeatCount="indefinite" />
      </ellipse>
      <text x="210" y="100" fontSize="8" fill="hsl(var(--destructive))" fontWeight="bold">Tympanic</text>
      <text x="210" y="112" fontSize="8" fill="hsl(var(--destructive))" fontWeight="bold">Membrane</text>
      
      {/* IR radiation waves */}
      {[0, 1, 2].map((i) => (
        <path key={i} d={`M ${175 - i * 18} ${130} Q ${165 - i * 18} ${115}, ${155 - i * 18} ${130} Q ${165 - i * 18} ${145}, ${175 - i * 18} ${130}`}
              stroke="hsl(var(--destructive))" strokeWidth="1" fill="none" opacity={0.4 + i * 0.2}>
          <animate attributeName="opacity" values={`${0.2 + i * 0.1};${0.6 + i * 0.1};${0.2 + i * 0.1}`} dur="1.5s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
        </path>
      ))}
      <text x="110" y="118" fontSize="7" fill="hsl(var(--destructive))">IR radiation</text>
      
      {/* Probe */}
      <rect x="20" y="120" width="60" height="20" rx="4" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2" />
      <text x="50" y="134" textAnchor="middle" fontSize="7" fill="hsl(var(--primary))" fontWeight="bold">Probe</text>
      
      {/* Waveguide */}
      <line x1="20" y1="130" x2="0" y2="130" stroke="hsl(var(--primary))" strokeWidth="3" />
      
      {/* Thermometer body */}
      <rect x="-60" y="80" width="65" height="100" rx="10" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2" />
      
      {/* Thermopile sensor */}
      <rect x="-50" y="100" width="45" height="25" rx="4" fill="hsl(var(--primary)/0.15)" stroke="hsl(var(--primary))" strokeWidth="1" />
      <text x="-28" y="114" textAnchor="middle" fontSize="7" fill="hsl(var(--primary))" fontWeight="bold">Thermopile</text>
      <text x="-28" y="122" textAnchor="middle" fontSize="6" fill="hsl(var(--primary))">Sensor</text>
      
      {/* Display */}
      <rect x="-48" y="135" width="41" height="20" rx="3" fill="hsl(var(--accent))" stroke="hsl(var(--border))" strokeWidth="1" />
      <text x="-28" y="149" textAnchor="middle" fontSize="9" fill="hsl(var(--foreground))" fontWeight="bold">37.0°C</text>
      
      {/* Blood supply note */}
      <text x="230" y="150" fontSize="8" fill="hsl(var(--primary))">Blood supply:</text>
      <text x="230" y="162" fontSize="7" fill="hsl(var(--muted-foreground))">Internal carotid</text>
      <text x="230" y="172" fontSize="7" fill="hsl(var(--muted-foreground))">(same as hypothalamus)</text>
      
      {/* Stefan-Boltzmann law */}
      <rect x="60" y="230" width="280" height="50" rx="8" fill="hsl(var(--primary)/0.08)" stroke="hsl(var(--primary)/0.3)" strokeWidth="1" />
      <text x="200" y="250" textAnchor="middle" fontSize="11" fill="hsl(var(--foreground))" fontWeight="bold">P = εσAT⁴ (Stefan-Boltzmann Law)</text>
      <text x="200" y="268" textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">Power radiated ∝ T⁴ • ε = emissivity • σ = 5.67 × 10⁻⁸ W/m²K⁴</text>
    </svg>
    
    <div className="bg-card border border-border rounded-lg p-4 space-y-2">
      <h4 className="font-semibold text-sm text-foreground">Key Physics</h4>
      <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
        <li><strong>Stefan-Boltzmann law</strong>: all objects emit IR radiation proportional to T⁴</li>
        <li><strong>Thermopile</strong>: multiple thermocouples in series detecting IR radiation → voltage</li>
        <li>Tympanic membrane shares blood supply with <strong>hypothalamus</strong> (internal carotid) — reflects core temperature</li>
        <li><strong>Advantages</strong>: non-invasive, rapid (1–2 seconds), easy to use</li>
        <li><strong>Sources of error</strong>: cerumen (wax), otitis media, poor probe positioning, cold ear canal</li>
        <li>Measures radiation at <strong>~10 μm wavelength</strong> (far infrared)</li>
      </ul>
    </div>
  </div>
);

const ComparisonTab = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-foreground">Comparison of Temperature Devices</h3>
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-border">
            <th className="p-2 text-left text-foreground">Feature</th>
            <th className="p-2 text-left text-foreground">Thermocouple</th>
            <th className="p-2 text-left text-foreground">Thermistor</th>
            <th className="p-2 text-left text-foreground">RTD (Pt100)</th>
            <th className="p-2 text-left text-foreground">IR Tympanic</th>
          </tr>
        </thead>
        <tbody className="text-muted-foreground">
          <tr className="border-b border-border/50">
            <td className="p-2 font-medium text-foreground">Principle</td>
            <td className="p-2">Seebeck effect</td>
            <td className="p-2">NTC semiconductor</td>
            <td className="p-2">PTC metal (Pt)</td>
            <td className="p-2">Stefan-Boltzmann</td>
          </tr>
          <tr className="border-b border-border/50">
            <td className="p-2 font-medium text-foreground">Linearity</td>
            <td className="p-2">Fairly linear</td>
            <td className="p-2">Non-linear</td>
            <td className="p-2">Very linear</td>
            <td className="p-2">Non-linear (T⁴)</td>
          </tr>
          <tr className="border-b border-border/50">
            <td className="p-2 font-medium text-foreground">Sensitivity</td>
            <td className="p-2">Low (~40 μV/°C)</td>
            <td className="p-2">Very high</td>
            <td className="p-2">Low (0.385 Ω/°C)</td>
            <td className="p-2">High</td>
          </tr>
          <tr className="border-b border-border/50">
            <td className="p-2 font-medium text-foreground">Response</td>
            <td className="p-2">Fastest (ms)</td>
            <td className="p-2">Fast (s)</td>
            <td className="p-2">Slowest (s)</td>
            <td className="p-2">Very fast (1-2s)</td>
          </tr>
          <tr className="border-b border-border/50">
            <td className="p-2 font-medium text-foreground">Accuracy</td>
            <td className="p-2">Moderate</td>
            <td className="p-2">Moderate</td>
            <td className="p-2">Highest</td>
            <td className="p-2">Moderate</td>
          </tr>
          <tr className="border-b border-border/50">
            <td className="p-2 font-medium text-foreground">Power</td>
            <td className="p-2">Self-generating</td>
            <td className="p-2">External needed</td>
            <td className="p-2">External needed</td>
            <td className="p-2">Battery</td>
          </tr>
          <tr>
            <td className="p-2 font-medium text-foreground">Clinical Use</td>
            <td className="p-2">Nasopharyngeal, oesophageal</td>
            <td className="p-2">PA catheter, skin</td>
            <td className="p-2">Laboratory standard</td>
            <td className="p-2">Ward, triage</td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div className="bg-card border border-border rounded-lg p-4 space-y-2">
      <h4 className="font-semibold text-sm text-foreground">Core Temperature Monitoring Sites</h4>
      <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
        <li><strong>Pulmonary artery</strong> — gold standard (thermistor on PA catheter tip)</li>
        <li><strong>Distal oesophagus</strong> — correlates well with core; thermocouple probe</li>
        <li><strong>Nasopharyngeal</strong> — reflects brain temperature; thermocouple</li>
        <li><strong>Tympanic membrane</strong> — non-invasive; IR thermometry</li>
        <li><strong>Bladder</strong> — thermistor catheter; affected by urine flow rate</li>
        <li><strong>Axillary/skin</strong> — peripheral; underestimates core by ~1°C</li>
      </ul>
    </div>
  </div>
);

const TemperatureMeasurementDiagram = () => {
  const [activeTab, setActiveTab] = useState("thermocouple");

  return (
    <DiagramFigure
      id="temperature-measurement-diagram"
      title="Temperature measurement"
      description="Auto-generated wrapper for the Temperature measurement anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="thermocouple" className="text-xs">Thermocouple</TabsTrigger>
            <TabsTrigger value="thermistor" className="text-xs">Thermistor</TabsTrigger>
            <TabsTrigger value="rtd" className="text-xs">RTD</TabsTrigger>
            <TabsTrigger value="infrared" className="text-xs">IR Tympanic</TabsTrigger>
            <TabsTrigger value="comparison" className="text-xs">Compare</TabsTrigger>
          </TabsList>
          <TabsContent value="thermocouple"><ThermocoupleTab /></TabsContent>
          <TabsContent value="thermistor"><ThermistorTab /></TabsContent>
          <TabsContent value="rtd"><RTDTab /></TabsContent>
          <TabsContent value="infrared"><InfraredTab /></TabsContent>
          <TabsContent value="comparison"><ComparisonTab /></TabsContent>
        </Tabs>
      </div>
    </DiagramFigure>
  );
};

export default TemperatureMeasurementDiagram;
