import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DiagramFigure } from "./_shared/DiagramFigure";

const PiezoelectricTab = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-foreground">Piezoelectric Effect & Transducers</h3>
    <p className="text-sm text-muted-foreground">
      Ultrasound transducers use piezoelectric crystals that convert electrical energy to mechanical (sound) waves and vice versa.
    </p>
    <svg viewBox="0 0 400 300" className="w-full max-w-md mx-auto">
      <text x="200" y="18" textAnchor="middle" fontSize="11" fill="hsl(var(--foreground))" fontWeight="bold">Piezoelectric Transducer</text>

      {/* Transducer housing */}
      <rect x="120" y="30" width="160" height="100" rx="10" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="2" />

      {/* Backing material */}
      <rect x="130" y="40" width="140" height="25" rx="4" fill="hsl(var(--muted)/0.4)" stroke="hsl(var(--muted-foreground)/0.3)" strokeWidth="1" />
      <text x="200" y="57" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))" fontWeight="bold">Backing Material (damping)</text>

      {/* Piezoelectric crystal */}
      <rect x="130" y="68" width="140" height="30" rx="4" fill="hsl(var(--primary)/0.2)" stroke="hsl(var(--primary))" strokeWidth="2">
        <animate attributeName="fill-opacity" values="0.15;0.35;0.15" dur="1.5s" repeatCount="indefinite" />
      </rect>
      <text x="200" y="87" textAnchor="middle" fontSize="8" fill="hsl(var(--primary))" fontWeight="bold">PZT Crystal (Lead Zirconate Titanate)</text>

      {/* Matching layer */}
      <rect x="130" y="101" width="140" height="15" rx="3" fill="hsl(var(--clinical))" opacity="0.2" stroke="hsl(var(--clinical))" strokeWidth="1" />
      <text x="200" y="112" textAnchor="middle" fontSize="6" fill="hsl(var(--clinical))" fontWeight="bold">Matching Layer (λ/4)</text>

      {/* Acoustic lens */}
      <path d="M 130 118 Q 200 130, 270 118" stroke="hsl(var(--foreground))" strokeWidth="2" fill="hsl(var(--accent)/0.3)" />
      <text x="200" y="128" textAnchor="middle" fontSize="6" fill="hsl(var(--foreground))">Acoustic Lens</text>

      {/* Electrodes */}
      <line x1="125" y1="75" x2="110" y2="75" stroke="hsl(var(--destructive))" strokeWidth="2" />
      <line x1="110" y1="68" x2="110" y2="82" stroke="hsl(var(--destructive))" strokeWidth="2" />
      <text x="100" y="78" textAnchor="end" fontSize="6" fill="hsl(var(--destructive))">+</text>
      <line x1="275" y1="75" x2="290" y2="75" stroke="hsl(var(--primary))" strokeWidth="2" />
      <line x1="290" y1="68" x2="290" y2="82" stroke="hsl(var(--primary))" strokeWidth="2" />
      <text x="300" y="78" fontSize="6" fill="hsl(var(--primary))">−</text>

      {/* Sound waves emanating */}
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M 160 ${140 + i * 18} Q 200 ${145 + i * 18}, 240 ${140 + i * 18}`}
              stroke="hsl(var(--primary))" strokeWidth="1.5" fill="none" opacity={0.8 - i * 0.15}>
          <animate attributeName="opacity" values={`${0.8 - i * 0.15};${0.3};${0.8 - i * 0.15}`} dur="1.5s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
        </path>
      ))}
      <text x="200" y="230" textAnchor="middle" fontSize="8" fill="hsl(var(--primary))">Ultrasound pulses → tissue</text>

      {/* Dual function arrows */}
      <rect x="30" y="155" width="80" height="60" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
      <text x="70" y="172" textAnchor="middle" fontSize="7" fill="hsl(var(--foreground))" fontWeight="bold">Transmit</text>
      <text x="70" y="184" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Electrical →</text>
      <text x="70" y="194" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Mechanical</text>
      <text x="70" y="208" textAnchor="middle" fontSize="6" fill="hsl(var(--primary))">(~1% time)</text>

      <rect x="290" y="155" width="80" height="60" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
      <text x="330" y="172" textAnchor="middle" fontSize="7" fill="hsl(var(--foreground))" fontWeight="bold">Receive</text>
      <text x="330" y="184" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Mechanical →</text>
      <text x="330" y="194" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Electrical</text>
      <text x="330" y="208" textAnchor="middle" fontSize="6" fill="hsl(var(--primary))">(~99% time)</text>

      {/* Key formula */}
      <rect x="80" y="250" width="240" height="40" rx="8" fill="hsl(var(--primary)/0.08)" stroke="hsl(var(--primary)/0.3)" strokeWidth="1" />
      <text x="200" y="268" textAnchor="middle" fontSize="10" fill="hsl(var(--foreground))" fontWeight="bold">v = f × λ</text>
      <text x="200" y="282" textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">Speed (1,540 m/s in soft tissue) = frequency × wavelength</text>
    </svg>

    <div className="bg-card border border-border rounded-lg p-4 space-y-2">
      <h4 className="font-semibold text-sm text-foreground">Key Physics</h4>
      <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
        <li><strong>Piezoelectric effect</strong>: certain crystals (PZT) generate voltage when deformed, and deform when voltage applied</li>
        <li><strong>Reverse piezoelectric</strong>: alternating voltage → crystal vibrates → produces ultrasound (transmit mode)</li>
        <li><strong>Direct piezoelectric</strong>: returning echoes deform crystal → generate voltage (receive mode)</li>
        <li><strong>Matching layer</strong> (λ/4 thickness): reduces acoustic impedance mismatch between crystal and tissue</li>
        <li><strong>Backing material</strong>: dampens crystal vibration → shorter pulse → better axial resolution</li>
        <li>Speed of sound in soft tissue assumed to be <strong>1,540 m/s</strong> for depth calculation</li>
        <li>Transducer acts as both transmitter (~1%) and receiver (~99%) of time — <strong>pulse-echo principle</strong></li>
      </ul>
    </div>
  </div>
);

const FrequencyResolutionTab = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-foreground">Frequency, Resolution & Penetration</h3>
    <svg viewBox="0 0 400 320" className="w-full max-w-md mx-auto">
      <text x="200" y="18" textAnchor="middle" fontSize="11" fill="hsl(var(--foreground))" fontWeight="bold">The Frequency Trade-off</text>

      {/* Trade-off diagram */}
      <rect x="20" y="30" width="360" height="70" rx="10" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />

      {/* Frequency scale */}
      <defs>
        <linearGradient id="freqGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <rect x="40" y="45" width="300" height="10" rx="5" fill="url(#freqGrad)" />
      <text x="40" y="42" fontSize="7" fill="hsl(var(--muted-foreground))">2 MHz</text>
      <text x="170" y="42" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">5 MHz</text>
      <text x="320" y="42" textAnchor="end" fontSize="7" fill="hsl(var(--muted-foreground))">15 MHz</text>
      <text x="200" y="36" textAnchor="middle" fontSize="8" fill="hsl(var(--foreground))" fontWeight="bold">↑ Frequency →</text>

      {/* Resolution arrow */}
      <text x="60" y="75" fontSize="7" fill="hsl(var(--clinical))">Low</text>
      <path d="M 85 72 L 310 72" stroke="hsl(var(--clinical))" strokeWidth="1.5" fill="none" markerEnd="url(#usArrow)" />
      <text x="315" y="75" fontSize="7" fill="hsl(var(--clinical))" fontWeight="bold">High</text>
      <text x="200" y="85" textAnchor="middle" fontSize="7" fill="hsl(var(--clinical))">↑ Resolution</text>

      {/* Penetration arrow (opposite) */}
      <text x="60" y="95" fontSize="7" fill="hsl(var(--destructive))" fontWeight="bold">Deep</text>
      <path d="M 310 92 L 85 92" stroke="hsl(var(--destructive))" strokeWidth="1.5" fill="none" markerEnd="url(#usArrowR)" />
      <text x="315" y="95" fontSize="7" fill="hsl(var(--destructive))">Shallow</text>
      <text x="200" y="104" textAnchor="middle" fontSize="7" fill="hsl(var(--destructive))">↓ Penetration (↑ attenuation)</text>

      {/* Resolution types */}
      <text x="200" y="130" textAnchor="middle" fontSize="10" fill="hsl(var(--foreground))" fontWeight="bold">Types of Resolution</text>

      {/* Axial resolution */}
      <rect x="20" y="140" width="170" height="80" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      <text x="105" y="158" textAnchor="middle" fontSize="9" fill="hsl(var(--primary))" fontWeight="bold">Axial Resolution</text>
      <text x="105" y="172" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">Along beam axis (depth)</text>
      <text x="105" y="188" textAnchor="middle" fontSize="9" fill="hsl(var(--foreground))" fontWeight="bold">= SPL / 2</text>
      <text x="105" y="202" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">(spatial pulse length)</text>
      <text x="105" y="214" textAnchor="middle" fontSize="7" fill="hsl(var(--clinical))">↑ freq → shorter pulse → better</text>

      {/* Lateral resolution */}
      <rect x="210" y="140" width="170" height="80" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      <text x="295" y="158" textAnchor="middle" fontSize="9" fill="hsl(var(--primary))" fontWeight="bold">Lateral Resolution</text>
      <text x="295" y="172" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">Perpendicular to beam</text>
      <text x="295" y="188" textAnchor="middle" fontSize="9" fill="hsl(var(--foreground))" fontWeight="bold">= Beam width</text>
      <text x="295" y="202" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">Narrowest at focal zone</text>
      <text x="295" y="214" textAnchor="middle" fontSize="7" fill="hsl(var(--clinical))">Focusing improves this</text>

      {/* Clinical probes */}
      <text x="200" y="245" textAnchor="middle" fontSize="10" fill="hsl(var(--foreground))" fontWeight="bold">Clinical Probe Selection</text>

      <rect x="20" y="255" width="110" height="55" rx="6" fill="hsl(var(--destructive)/0.08)" stroke="hsl(var(--destructive)/0.3)" strokeWidth="1" />
      <text x="75" y="272" textAnchor="middle" fontSize="8" fill="hsl(var(--destructive))" fontWeight="bold">Curvilinear</text>
      <text x="75" y="284" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">2–5 MHz</text>
      <text x="75" y="296" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Abdominal, FAST scan</text>

      <rect x="145" y="255" width="110" height="55" rx="6" fill="hsl(var(--primary)/0.08)" stroke="hsl(var(--primary)/0.3)" strokeWidth="1" />
      <text x="200" y="272" textAnchor="middle" fontSize="8" fill="hsl(var(--primary))" fontWeight="bold">Phased Array</text>
      <text x="200" y="284" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">1–5 MHz</text>
      <text x="200" y="296" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Cardiac (TTE/TOE)</text>

      <rect x="270" y="255" width="110" height="55" rx="6" fill="hsl(var(--clinical))" fillOpacity="0.08" stroke="hsl(var(--clinical))" strokeOpacity="0.3" strokeWidth="1" />
      <text x="325" y="272" textAnchor="middle" fontSize="8" fill="hsl(var(--clinical))" fontWeight="bold">Linear</text>
      <text x="325" y="284" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">6–15 MHz</text>
      <text x="325" y="296" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Nerve blocks, vascular</text>

      <defs>
        <marker id="usArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--clinical))" />
        </marker>
        <marker id="usArrowR" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--destructive))" />
        </marker>
      </defs>
    </svg>

    <div className="bg-card border border-border rounded-lg p-4 space-y-2">
      <h4 className="font-semibold text-sm text-foreground">Key Concepts</h4>
      <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
        <li><strong>↑ frequency → ↑ resolution but ↓ penetration</strong> (higher attenuation)</li>
        <li><strong>Axial resolution</strong> = SPL/2 = (n × λ)/2; improved by higher frequency, shorter pulse, better damping</li>
        <li><strong>Lateral resolution</strong> = beam width; best at focal zone; improved by focusing and aperture</li>
        <li><strong>Attenuation</strong>: ~0.5 dB/cm/MHz in soft tissue (absorption, reflection, scattering)</li>
        <li><strong>Time gain compensation (TGC)</strong>: amplifies deeper echoes to compensate for attenuation</li>
      </ul>
    </div>
  </div>
);

const DopplerTab = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-foreground">Doppler Effect</h3>
    <svg viewBox="0 0 400 310" className="w-full max-w-md mx-auto">
      <text x="200" y="18" textAnchor="middle" fontSize="11" fill="hsl(var(--foreground))" fontWeight="bold">Doppler Ultrasound</text>

      {/* Blood vessel */}
      <rect x="40" y="80" width="320" height="50" rx="25" fill="hsl(var(--destructive)/0.1)" stroke="hsl(var(--destructive)/0.4)" strokeWidth="1.5" />
      <text x="200" y="110" textAnchor="middle" fontSize="8" fill="hsl(var(--destructive))">Blood vessel</text>

      {/* RBCs moving */}
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx={80 + i * 60} cy={105} r="6" fill="hsl(var(--destructive)/0.4)" stroke="hsl(var(--destructive))" strokeWidth="1">
          <animate attributeName="cx" values={`${80 + i * 60};${140 + i * 60};${80 + i * 60}`} dur="3s" repeatCount="indefinite" />
        </circle>
      ))}
      <text x="200" y="98" textAnchor="middle" fontSize="7" fill="hsl(var(--destructive))" fontWeight="bold">RBCs → v</text>

      {/* Transducer */}
      <rect x="160" y="30" width="80" height="25" rx="6" fill="hsl(var(--primary)/0.2)" stroke="hsl(var(--primary))" strokeWidth="2" />
      <text x="200" y="46" textAnchor="middle" fontSize="7" fill="hsl(var(--primary))" fontWeight="bold">Transducer</text>

      {/* Beam angle */}
      <line x1="200" y1="55" x2="170" y2="85" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="4,2" />
      <line x1="200" y1="55" x2="230" y2="85" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="4,2" opacity="0.3" />

      {/* Angle θ */}
      <path d="M 200 65 Q 195 68, 190 72" stroke="hsl(var(--primary))" strokeWidth="1" fill="none" />
      <text x="185" y="68" fontSize="7" fill="hsl(var(--primary))">θ</text>

      {/* Flow direction */}
      <path d="M 100 105 L 300 105" stroke="hsl(var(--destructive))" strokeWidth="1" strokeDasharray="3,2" />

      {/* Doppler equation */}
      <rect x="40" y="145" width="320" height="55" rx="10" fill="hsl(var(--primary)/0.08)" stroke="hsl(var(--primary)/0.3)" strokeWidth="1" />
      <text x="200" y="168" textAnchor="middle" fontSize="12" fill="hsl(var(--foreground))" fontWeight="bold">Δf = 2 f₀ v cos θ / c</text>
      <text x="200" y="185" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">Δf = frequency shift • f₀ = transmitted freq • v = blood velocity • θ = angle • c = 1540 m/s</text>
      <text x="200" y="195" textAnchor="middle" fontSize="7" fill="hsl(var(--destructive))" fontWeight="bold">θ must be &lt;60° for accurate velocity measurement</text>

      {/* Doppler types */}
      <text x="200" y="220" textAnchor="middle" fontSize="10" fill="hsl(var(--foreground))" fontWeight="bold">Doppler Modes</text>

      <rect x="20" y="230" width="115" height="70" rx="6" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
      <text x="78" y="248" textAnchor="middle" fontSize="8" fill="hsl(var(--primary))" fontWeight="bold">CW Doppler</text>
      <text x="78" y="262" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Continuous wave</text>
      <text x="78" y="274" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">No depth info</text>
      <text x="78" y="286" textAnchor="middle" fontSize="6" fill="hsl(var(--clinical))">No aliasing</text>
      <text x="78" y="296" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">High velocities ✓</text>

      <rect x="145" y="230" width="115" height="70" rx="6" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
      <text x="203" y="248" textAnchor="middle" fontSize="8" fill="hsl(var(--primary))" fontWeight="bold">PW Doppler</text>
      <text x="203" y="262" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Pulsed wave</text>
      <text x="203" y="274" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Depth-specific</text>
      <text x="203" y="286" textAnchor="middle" fontSize="6" fill="hsl(var(--destructive))">Aliasing if v &gt; Nyquist</text>
      <text x="203" y="296" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">PRF limits max v</text>

      <rect x="270" y="230" width="115" height="70" rx="6" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
      <text x="328" y="248" textAnchor="middle" fontSize="8" fill="hsl(var(--destructive))" fontWeight="bold">Colour Doppler</text>
      <text x="328" y="262" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">PW-based colour map</text>
      <text x="328" y="274" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Red = toward probe</text>
      <text x="328" y="286" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Blue = away from probe</text>
      <text x="328" y="296" textAnchor="middle" fontSize="6" fill="hsl(var(--destructive))">Also aliases</text>
    </svg>

    <div className="bg-card border border-border rounded-lg p-4 space-y-2">
      <h4 className="font-semibold text-sm text-foreground">Key Physics</h4>
      <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
        <li><strong>Doppler shift</strong>: frequency change when ultrasound reflects off moving RBCs</li>
        <li><strong>Angle of insonation (θ)</strong>: must be &lt;60°; at 90° cos θ = 0 → no Doppler signal</li>
        <li><strong>CW Doppler</strong>: separate transmit/receive crystals; measures all velocities along beam; no aliasing</li>
        <li><strong>PW Doppler</strong>: single crystal; depth-specific via gate; subject to <strong>aliasing</strong> (Nyquist limit = PRF/2)</li>
        <li><strong>Colour flow</strong>: PW-based; <strong>BART</strong> (Blue Away, Red Towards) by convention</li>
        <li><strong>Aliasing</strong>: appears as colour wrap-around; overcome by ↑PRF, ↓depth, lower frequency, or switch to CW</li>
      </ul>
    </div>
  </div>
);

const ArtefactsTab = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-foreground">Ultrasound Artefacts</h3>
    <p className="text-sm text-muted-foreground">
      Understanding artefacts is essential for accurate image interpretation and avoiding misdiagnosis.
    </p>
    <svg viewBox="0 0 400 340" className="w-full max-w-md mx-auto">
      <text x="200" y="18" textAnchor="middle" fontSize="11" fill="hsl(var(--foreground))" fontWeight="bold">Common Ultrasound Artefacts</text>

      {/* Acoustic shadowing */}
      <rect x="10" y="30" width="120" height="140" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
      <text x="70" y="48" textAnchor="middle" fontSize="8" fill="hsl(var(--foreground))" fontWeight="bold">Acoustic Shadow</text>

      {/* Beam lines */}
      <line x1="40" y1="58" x2="40" y2="100" stroke="hsl(var(--primary))" strokeWidth="1" />
      <line x1="100" y1="58" x2="100" y2="100" stroke="hsl(var(--primary))" strokeWidth="1" />
      {/* Calcified structure */}
      <ellipse cx="70" cy="100" rx="25" ry="10" fill="hsl(var(--foreground))" opacity="0.6" />
      <text x="70" y="104" textAnchor="middle" fontSize="5" fill="hsl(var(--background))">Calculus</text>
      {/* Shadow below */}
      <rect x="45" y="112" width="50" height="50" fill="hsl(var(--foreground))" opacity="0.15" />
      <text x="70" y="140" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Shadow</text>
      <text x="70" y="150" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">(anechoic)</text>

      {/* Acoustic enhancement */}
      <rect x="140" y="30" width="120" height="140" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
      <text x="200" y="48" textAnchor="middle" fontSize="8" fill="hsl(var(--foreground))" fontWeight="bold">Enhancement</text>

      <line x1="170" y1="58" x2="170" y2="80" stroke="hsl(var(--primary))" strokeWidth="1" />
      <line x1="230" y1="58" x2="230" y2="80" stroke="hsl(var(--primary))" strokeWidth="1" />
      {/* Fluid collection */}
      <ellipse cx="200" cy="95" rx="25" ry="15" fill="hsl(var(--primary)/0.15)" stroke="hsl(var(--primary))" strokeWidth="1" />
      <text x="200" y="98" textAnchor="middle" fontSize="5" fill="hsl(var(--primary))">Fluid</text>
      {/* Bright below */}
      <rect x="175" y="112" width="50" height="50" fill="hsl(var(--clinical))" opacity="0.15" />
      <text x="200" y="140" textAnchor="middle" fontSize="6" fill="hsl(var(--clinical))">Brighter</text>
      <text x="200" y="150" textAnchor="middle" fontSize="6" fill="hsl(var(--clinical))">(enhanced)</text>

      {/* Reverberation */}
      <rect x="270" y="30" width="120" height="140" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
      <text x="330" y="48" textAnchor="middle" fontSize="8" fill="hsl(var(--foreground))" fontWeight="bold">Reverberation</text>

      {/* Two parallel reflectors */}
      <line x1="290" y1="70" x2="370" y2="70" stroke="hsl(var(--foreground))" strokeWidth="2" />
      <line x1="290" y1="95" x2="370" y2="95" stroke="hsl(var(--foreground))" strokeWidth="2" />
      {/* Bounce arrows */}
      <path d="M 310 72 L 310 93" stroke="hsl(var(--primary))" strokeWidth="1" />
      <path d="M 315 93 L 315 72" stroke="hsl(var(--primary))" strokeWidth="1" />
      <path d="M 320 72 L 320 93" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.6" />
      {/* A-lines below */}
      <line x1="290" y1="120" x2="370" y2="120" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.4" />
      <line x1="290" y1="145" x2="370" y2="145" stroke="hsl(var(--foreground))" strokeWidth="1" opacity="0.2" />
      <text x="330" y="160" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">A-lines</text>
      <text x="330" y="168" textAnchor="middle" fontSize="5" fill="hsl(var(--muted-foreground))">(equidistant)</text>

      {/* Mirror & B-lines */}
      <rect x="10" y="185" width="185" height="75" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
      <text x="103" y="202" textAnchor="middle" fontSize="8" fill="hsl(var(--foreground))" fontWeight="bold">Mirror Artefact</text>
      {/* Diaphragm line */}
      <line x1="30" y1="225" x2="180" y2="225" stroke="hsl(var(--foreground))" strokeWidth="2" />
      <text x="105" y="222" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Diaphragm</text>
      {/* Real structure above */}
      <circle cx="80" cy="215" r="6" fill="hsl(var(--primary)/0.3)" stroke="hsl(var(--primary))" strokeWidth="1" />
      <text x="95" y="213" fontSize="5" fill="hsl(var(--primary))">Real</text>
      {/* Mirror image below */}
      <circle cx="80" cy="240" r="6" fill="hsl(var(--primary)/0.15)" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="2,1" />
      <text x="95" y="243" fontSize="5" fill="hsl(var(--muted-foreground))">Mirror</text>

      <rect x="205" y="185" width="185" height="75" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
      <text x="298" y="202" textAnchor="middle" fontSize="8" fill="hsl(var(--foreground))" fontWeight="bold">B-Lines (Comet Tail)</text>
      {/* Pleural line */}
      <line x1="225" y1="220" x2="375" y2="220" stroke="hsl(var(--foreground))" strokeWidth="2" />
      <text x="300" y="217" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Pleural line</text>
      {/* B-line beams */}
      {[260, 300, 340].map((x) => (
        <line key={x} x1={x} y1="222" x2={x} y2="258" stroke="hsl(var(--primary))" strokeWidth="2" opacity="0.5">
          <animate attributeName="opacity" values="0.3;0.7;0.3" dur="1.5s" repeatCount="indefinite" />
        </line>
      ))}
      <text x="300" y="256" textAnchor="middle" fontSize="6" fill="hsl(var(--primary))">Vertical laser-like</text>

      {/* Clinical significance */}
      <rect x="10" y="270" width="380" height="60" rx="8" fill="hsl(var(--primary)/0.08)" stroke="hsl(var(--primary)/0.3)" strokeWidth="1" />
      <text x="200" y="288" textAnchor="middle" fontSize="9" fill="hsl(var(--foreground))" fontWeight="bold">Clinical Significance of Lung Artefacts</text>
      <text x="200" y="302" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))"><tspan fontWeight="bold" fill="hsl(var(--clinical))">A-lines</tspan> = normal aerated lung (reverberation) | <tspan fontWeight="bold" fill="hsl(var(--primary))">B-lines</tspan> = interstitial oedema</text>
      <text x="200" y="316" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))"><tspan fontWeight="bold">Lung sliding</tspan> = rules out pneumothorax at that point | <tspan fontWeight="bold">Barcode sign</tspan> = absent sliding (M-mode)</text>
    </svg>

    <div className="bg-card border border-border rounded-lg p-4 space-y-2">
      <h4 className="font-semibold text-sm text-foreground">Artefact Summary</h4>
      <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
        <li><strong>Acoustic shadowing</strong>: behind strong reflectors (bone, calculi) — no echoes deep to structure</li>
        <li><strong>Posterior enhancement</strong>: brighter echoes deep to fluid (less attenuation through fluid)</li>
        <li><strong>Reverberation</strong>: multiple equidistant lines (A-lines at pleura-air interface); indicates normal aerated lung</li>
        <li><strong>B-lines (comet tail)</strong>: vertical hyperechoic lines from pleura to screen edge; indicate interstitial oedema/fluid</li>
        <li><strong>Mirror artefact</strong>: duplicate structure on opposite side of strong reflector (e.g., liver image above diaphragm)</li>
        <li><strong>Side lobe</strong>: off-axis echoes misplaced into main image</li>
        <li><strong>Aliasing</strong>: Doppler wrap-around when velocity exceeds Nyquist limit (PRF/2)</li>
      </ul>
    </div>
  </div>
);

const UltrasoundPhysicsDiagram = () => {
  const [activeTab, setActiveTab] = useState("piezo");

  return (
    <DiagramFigure
      id="ultrasound-physics-diagram"
      title="Ultrasound physics"
      description="Auto-generated wrapper for the Ultrasound physics anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
                  <div className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="piezo" className="text-xs">Piezoelectric</TabsTrigger>
            <TabsTrigger value="resolution" className="text-xs">Resolution</TabsTrigger>
            <TabsTrigger value="doppler" className="text-xs">Doppler</TabsTrigger>
            <TabsTrigger value="artefacts" className="text-xs">Artefacts</TabsTrigger>
          </TabsList>
          <TabsContent value="piezo"><PiezoelectricTab /></TabsContent>
          <TabsContent value="resolution"><FrequencyResolutionTab /></TabsContent>
          <TabsContent value="doppler"><DopplerTab /></TabsContent>
          <TabsContent value="artefacts"><ArtefactsTab /></TabsContent>
        </Tabs>
      </div>
    </DiagramFigure>
  );
};

export default UltrasoundPhysicsDiagram;
