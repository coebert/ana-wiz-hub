import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WorkedExampleCallout } from "./WorkedExampleCallout";
import { ZoomableSVG } from "./ZoomableSVG";

const NuclearSpinTab = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-foreground">Nuclear Spin & Precession</h3>
    <p className="text-sm text-muted-foreground">
      Hydrogen nuclei (protons) possess spin and act as tiny magnets. In a strong magnetic field (B₀), they align and precess at the Larmor frequency.
    </p>
    <ZoomableSVG><svg viewBox="0 0 400 310" className="w-full max-w-md mx-auto" role="img" aria-label="A hydrogen proton precessing around the main magnetic field B₀ in a cone, with the Larmor equation omega-zero equals gamma times B-zero. Side panels show parallel-versus-anti-parallel alignment and the slight excess that produces the net magnetisation M-zero.">
      <text x="200" y="18" textAnchor="middle" fontSize="11" fill="hsl(var(--foreground))" fontWeight="bold">Proton Precession in B₀</text>

      {/* B₀ field arrow */}
      <line x1="200" y1="280" x2="200" y2="35" stroke="hsl(var(--muted-foreground))" strokeWidth="2" markerEnd="url(#mriUp)" />
      <text x="210" y="42" fontSize="9" fill="hsl(var(--muted-foreground))" fontWeight="bold">B₀</text>

      {/* Precession cone */}
      <ellipse cx="200" cy="100" rx="60" ry="18" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="4,3" />

      {/* Proton spinning */}
      <line x1="200" y1="200" x2="230" y2="90" stroke="hsl(var(--primary))" strokeWidth="2.5" />
      <circle cx="232" cy="86" r="8" fill="hsl(var(--primary)/0.3)" stroke="hsl(var(--primary))" strokeWidth="2">
        <animate attributeName="r" values="7;9;7" dur="1s" repeatCount="indefinite" />
      </circle>
      <text x="245" y="82" fontSize="7" fill="hsl(var(--primary))" fontWeight="bold">¹H</text>

      {/* Precession arc arrow */}
      <path d="M 230 90 Q 200 78, 170 92" stroke="hsl(var(--destructive))" strokeWidth="1.5" fill="none" markerEnd="url(#mriArc)" />
      <text x="165" y="82" fontSize="7" fill="hsl(var(--destructive))">Precession</text>

      {/* Origin dot */}
      <circle cx="200" cy="200" r="3" fill="hsl(var(--foreground))" />

      {/* Larmor equation */}
      <rect x="40" y="225" width="320" height="45" rx="8" fill="hsl(var(--primary)/0.08)" stroke="hsl(var(--primary)/0.3)" strokeWidth="1" />
      <text x="200" y="245" textAnchor="middle" fontSize="12" fill="hsl(var(--foreground))" fontWeight="bold">ω₀ = γ × B₀</text>
      <text x="200" y="262" textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">Larmor frequency (ω₀) = gyromagnetic ratio (γ) × field strength (B₀)</text>

      {/* Key values */}
      <text x="200" y="290" textAnchor="middle" fontSize="8" fill="hsl(var(--primary))">¹H: γ = 42.58 MHz/T → at 1.5T: ω₀ = 63.87 MHz → at 3T: ω₀ = 127.74 MHz</text>

      {/* Parallel vs antiparallel */}
      <rect x="20" y="30" width="80" height="90" rx="6" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
      <text x="60" y="48" textAnchor="middle" fontSize="7" fill="hsl(var(--foreground))" fontWeight="bold">Alignment</text>
      {/* Parallel arrows (more) */}
      {[0, 1, 2, 3].map((i) => (
        <line key={`p${i}`} x1={35 + i * 15} y1="78" x2={35 + i * 15} y2="58" stroke="#10B981" strokeWidth="2" markerEnd="url(#mriUpG)" />
      ))}
      <text x="60" y="90" textAnchor="middle" fontSize="6" fill="#10B981">↑ Parallel (low E)</text>
      {/* Antiparallel arrows (fewer) */}
      {[0, 1, 2].map((i) => (
        <line key={`a${i}`} x1={38 + i * 15} y1="98" x2={38 + i * 15} y2="115" stroke="hsl(var(--destructive))" strokeWidth="2" markerEnd="url(#mriDnR)" />
      ))}
      <text x="60" y="125" textAnchor="middle" fontSize="6" fill="hsl(var(--destructive))">↓ Anti-parallel (high E)</text>

      {/* Net magnetisation */}
      <rect x="300" y="30" width="90" height="60" rx="6" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
      <text x="345" y="48" textAnchor="middle" fontSize="7" fill="hsl(var(--foreground))" fontWeight="bold">Net M₀</text>
      <line x1="345" y1="80" x2="345" y2="55" stroke="hsl(var(--primary))" strokeWidth="3" markerEnd="url(#mriUpP)" />
      <text x="345" y="90" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Slight parallel</text>
      <text x="345" y="98" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">excess → signal</text>

      <defs>
        <marker id="mriUp" viewBox="0 0 10 10" refX="5" refY="0" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 10 L 5 0 L 10 10 z" fill="hsl(var(--muted-foreground))" />
        </marker>
        <marker id="mriUpG" viewBox="0 0 10 10" refX="5" refY="0" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 10 L 5 0 L 10 10 z" fill="#10B981" />
        </marker>
        <marker id="mriUpP" viewBox="0 0 10 10" refX="5" refY="0" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 10 L 5 0 L 10 10 z" fill="hsl(var(--primary))" />
        </marker>
        <marker id="mriDnR" viewBox="0 0 10 10" refX="5" refY="10" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 0 L 5 10 L 10 0 z" fill="hsl(var(--destructive))" />
        </marker>
        <marker id="mriArc" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--destructive))" />
        </marker>
      </defs>
    </svg></ZoomableSVG>

    <div className="bg-card border border-border rounded-lg p-4 space-y-2">
      <h4 className="font-semibold text-sm text-foreground">Key Physics</h4>
      <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
        <li><strong>Nuclear spin</strong>: protons (¹H) have spin ½ and act as tiny magnets (magnetic moment)</li>
        <li>In B₀, protons align <strong>parallel</strong> (low energy) or <strong>anti-parallel</strong> (high energy); slight parallel excess creates <strong>net magnetisation (M₀)</strong></li>
        <li><strong>Precession</strong>: protons wobble around B₀ axis at the Larmor frequency ω₀ = γB₀</li>
        <li>An <strong>RF pulse</strong> at the Larmor frequency tips M₀ into the transverse plane (resonance)</li>
        <li>90° RF pulse → M₀ fully transverse; 180° pulse → M₀ inverted</li>
        <li>Higher field strength → stronger signal (more parallel excess) but more artefact and SAR</li>
      </ul>
    </div>
  </div>
);

const RelaxationTab = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-foreground">T1 & T2 Relaxation</h3>
    <ZoomableSVG><svg viewBox="0 0 400 340" className="w-full max-w-md mx-auto" role="img" aria-label="Two graphs side by side: T1 longitudinal recovery (Mz returns to M-zero after 63% recovery at one T1 time constant, faster for fat than water) and T2 transverse decay (Mxy falls to 37% remaining at one T2, with T2-star always faster than T2). Below, a tissue contrast table shows fat appears bright on T1-weighted images and water appears bright on T2-weighted images.">
      <text x="200" y="18" textAnchor="middle" fontSize="11" fill="hsl(var(--foreground))" fontWeight="bold">Relaxation After RF Pulse</text>

      {/* T1 Recovery graph */}
      <rect x="15" y="30" width="180" height="130" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
      <text x="105" y="48" textAnchor="middle" fontSize="9" fill="hsl(var(--foreground))" fontWeight="bold">T1 Recovery</text>
      <text x="105" y="60" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">(Longitudinal / Spin-Lattice)</text>

      {/* Axes */}
      <line x1="40" y1="145" x2="40" y2="68" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
      <line x1="40" y1="145" x2="180" y2="145" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
      <text x="32" y="105" fontSize="6" fill="hsl(var(--muted-foreground))" transform="rotate(-90,32,105)">Mz</text>
      <text x="110" y="156" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Time</text>

      {/* T1 curve - exponential recovery, animated draw-on */}
      <path d="M 42 142 Q 70 140, 90 115 Q 110 95, 130 82 Q 150 74, 175 72" stroke="#10B981" strokeWidth="2.5" fill="none" strokeDasharray="180" strokeDashoffset="180">
        <animate attributeName="stroke-dashoffset" from="180" to="0" dur="2.4s" repeatCount="indefinite" />
      </path>
      <text x="170" y="68" fontSize="7" fill="#10B981" fontWeight="bold">M₀</text>

      {/* T1 marker */}
      <line x1="95" y1="145" x2="95" y2="110" stroke="#10B981" strokeWidth="1" strokeDasharray="3,2" />
      <text x="95" y="155" textAnchor="middle" fontSize="6" fill="#10B981">T1</text>
      <text x="130" y="130" fontSize="6" fill="#10B981">63% recovery</text>

      {/* Fat vs water labels */}
      <path d="M 42 142 Q 55 135, 65 110 Q 75 90, 85 80 Q 100 72, 120 70" stroke="#F59E0B" strokeWidth="1.5" fill="none" strokeDasharray="4,2" />
      <text x="125" y="68" fontSize="6" fill="#F59E0B">Fat (short T1)</text>
      <path d="M 42 142 Q 80 140, 110 125 Q 140 108, 160 95 Q 172 88, 178 85" stroke="#6366F1" strokeWidth="1.5" fill="none" strokeDasharray="4,2" />
      <text x="175" y="95" fontSize="6" fill="#6366F1">Water (long T1)</text>

      {/* T2 Decay graph */}
      <rect x="205" y="30" width="180" height="130" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
      <text x="295" y="48" textAnchor="middle" fontSize="9" fill="hsl(var(--foreground))" fontWeight="bold">T2 Decay</text>
      <text x="295" y="60" textAnchor="middle" fontSize="7" fill="hsl(var(--muted-foreground))">(Transverse / Spin-Spin)</text>

      {/* Axes */}
      <line x1="230" y1="145" x2="230" y2="68" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
      <line x1="230" y1="145" x2="370" y2="145" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
      <text x="222" y="105" fontSize="6" fill="hsl(var(--muted-foreground))" transform="rotate(-90,222,105)">Mxy</text>
      <text x="300" y="156" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Time</text>

      {/* T2 curve - exponential decay, animated draw-on */}
      <path d="M 232 72 Q 260 78, 280 100 Q 300 120, 320 132 Q 340 140, 365 143" stroke="hsl(var(--destructive))" strokeWidth="2.5" fill="none" strokeDasharray="180" strokeDashoffset="180">
        <animate attributeName="stroke-dashoffset" from="180" to="0" dur="2.4s" repeatCount="indefinite" />
      </path>

      {/* T2 marker */}
      <line x1="280" y1="145" x2="280" y2="100" stroke="hsl(var(--destructive))" strokeWidth="1" strokeDasharray="3,2" />
      <text x="280" y="155" textAnchor="middle" fontSize="6" fill="hsl(var(--destructive))">T2</text>
      <text x="310" y="95" fontSize="6" fill="hsl(var(--destructive))">37% remaining</text>

      {/* T2* faster decay */}
      <path d="M 232 72 Q 250 85, 260 110 Q 270 130, 285 140 Q 300 143, 320 144" stroke="hsl(var(--destructive))" strokeWidth="1.5" fill="none" strokeDasharray="4,2" />
      <text x="300" y="135" fontSize="6" fill="hsl(var(--destructive))" opacity="0.7">T2* (faster)</text>

      {/* Water vs fat */}
      <path d="M 232 72 Q 270 78, 310 105 Q 340 125, 365 140" stroke="#6366F1" strokeWidth="1.5" fill="none" strokeDasharray="4,2" />
      <text x="360" y="133" fontSize="6" fill="#6366F1">Water (long T2)</text>
      <path d="M 232 72 Q 248 88, 258 115 Q 268 135, 280 142" stroke="#F59E0B" strokeWidth="1.5" fill="none" strokeDasharray="4,2" />
      <text x="285" y="110" fontSize="6" fill="#F59E0B">Fat (short T2)</text>

      {/* Tissue contrast table */}
      <text x="200" y="185" textAnchor="middle" fontSize="10" fill="hsl(var(--foreground))" fontWeight="bold">Image Weighting & Tissue Appearance</text>

      <rect x="20" y="195" width="360" height="65" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="1" />
      <text x="90" y="212" textAnchor="middle" fontSize="8" fill="hsl(var(--foreground))" fontWeight="bold">T1-weighted</text>
      <text x="90" y="226" textAnchor="middle" fontSize="7" fill="#F59E0B">Fat = BRIGHT</text>
      <text x="90" y="238" textAnchor="middle" fontSize="7" fill="#6366F1">Water = DARK</text>
      <text x="90" y="250" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Short TR, short TE</text>

      <line x1="200" y1="200" x2="200" y2="255" stroke="hsl(var(--border))" strokeWidth="1" />

      <text x="310" y="212" textAnchor="middle" fontSize="8" fill="hsl(var(--foreground))" fontWeight="bold">T2-weighted</text>
      <text x="310" y="226" textAnchor="middle" fontSize="7" fill="#6366F1">Water = BRIGHT</text>
      <text x="310" y="238" textAnchor="middle" fontSize="7" fill="#F59E0B">Fat = DARK</text>
      <text x="310" y="250" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Long TR, long TE</text>

      {/* Mnemonic */}
      <rect x="60" y="275" width="280" height="50" rx="8" fill="hsl(var(--primary)/0.08)" stroke="hsl(var(--primary)/0.3)" strokeWidth="1" />
      <text x="200" y="295" textAnchor="middle" fontSize="10" fill="hsl(var(--foreground))" fontWeight="bold">Mnemonic: "WW2" — Water is White on T2</text>
      <text x="200" y="315" textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">T1 = anatomy (fat bright) • T2 = pathology (oedema/fluid bright)</text>
    </svg></ZoomableSVG>

    <div className="bg-card border border-border rounded-lg p-4 space-y-2">
      <h4 className="font-semibold text-sm text-foreground">Key Physics</h4>
      <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
        <li><strong>T1 (spin-lattice)</strong>: recovery of longitudinal magnetisation; time for 63% recovery; energy transfer to surroundings</li>
        <li><strong>T2 (spin-spin)</strong>: decay of transverse magnetisation; time to 37% remaining; loss of phase coherence between spins</li>
        <li><strong>T2*</strong>: faster than T2; includes field inhomogeneity effects (T2* &lt; T2 always)</li>
        <li><strong>T1-weighted</strong>: short TR, short TE → fat bright, water dark → best for anatomy</li>
        <li><strong>T2-weighted</strong>: long TR, long TE → water bright, fat dark → best for pathology (oedema, inflammation)</li>
        <li><strong>Gadolinium</strong> (contrast agent): shortens T1 → enhances signal on T1-weighted images; nephrogenic systemic fibrosis risk in renal failure</li>
      </ul>
    </div>
  </div>
);

const SafetyTab = () => (
  <div className="space-y-4">
    <h3 className="text-lg font-semibold text-foreground">MRI Safety for Anaesthetists</h3>
    <ZoomableSVG><svg viewBox="0 0 400 320" className="w-full max-w-md mx-auto" role="img" aria-label="Four MRI safety zones (I public, II screening, III controlled access, IV magnet room), the three principal hazards (missile effect, thermal burns from RF heating, and device malfunction), and the three equipment labels (MR Safe in green, MR Conditional in amber, MR Unsafe in red).">
      <text x="200" y="18" textAnchor="middle" fontSize="11" fill="hsl(var(--foreground))" fontWeight="bold">MRI Safety Zones</text>

      {/* Zone diagram */}
      {[
        { x: 20, w: 80, color: "#10B981", label: "Zone I", sub: "Public", desc: "Unrestricted" },
        { x: 110, w: 80, color: "#F59E0B", label: "Zone II", sub: "Screening", desc: "Questionnaire" },
        { x: 200, w: 80, color: "hsl(var(--destructive))", label: "Zone III", sub: "Controlled", desc: "MRI-trained only" },
        { x: 290, w: 90, color: "#DC2626", label: "Zone IV", sub: "MAGNET", desc: "5 Gauss → bore" },
      ].map((z, i) => (
        <g key={i}>
          <rect x={z.x} y="30" width={z.w} height="70" rx="8" fill={`${z.color}`} fillOpacity="0.12" stroke={z.color} strokeWidth="1.5" />
          <text x={z.x + z.w / 2} y="50" textAnchor="middle" fontSize="9" fill={z.color} fontWeight="bold">{z.label}</text>
          <text x={z.x + z.w / 2} y="65" textAnchor="middle" fontSize="7" fill={z.color}>{z.sub}</text>
          <text x={z.x + z.w / 2} y="80" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">{z.desc}</text>
          {i < 3 && <text x={z.x + z.w + 5} y="65" fontSize="12" fill="hsl(var(--muted-foreground))">→</text>}
        </g>
      ))}

      {/* Hazards */}
      <text x="200" y="120" textAnchor="middle" fontSize="10" fill="hsl(var(--foreground))" fontWeight="bold">Three Main Hazards</text>

      {/* Missile effect */}
      <rect x="15" y="130" width="120" height="85" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--destructive))" strokeWidth="1.5" />
      <text x="75" y="148" textAnchor="middle" fontSize="8" fill="hsl(var(--destructive))" fontWeight="bold">⚠ Missile Effect</text>
      <text x="75" y="162" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Ferromagnetic objects</text>
      <text x="75" y="174" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">attracted at high velocity</text>
      <text x="75" y="186" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">toward bore of magnet</text>
      <text x="75" y="200" textAnchor="middle" fontSize="6" fill="hsl(var(--destructive))" fontWeight="bold">O₂ cylinders, laryngoscopes</text>
      <text x="75" y="210" textAnchor="middle" fontSize="6" fill="hsl(var(--destructive))" fontWeight="bold">scissors, IV poles</text>

      {/* Thermal */}
      <rect x="145" y="130" width="110" height="85" rx="8" fill="hsl(var(--card))" stroke="#F59E0B" strokeWidth="1.5" />
      <text x="200" y="148" textAnchor="middle" fontSize="8" fill="#F59E0B" fontWeight="bold">⚠ Thermal/Burns</text>
      <text x="200" y="162" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">RF energy → tissue heating</text>
      <text x="200" y="174" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Measured as SAR (W/kg)</text>
      <text x="200" y="186" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Loops of wire/ECG leads</text>
      <text x="200" y="198" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">act as antennae</text>
      <text x="200" y="210" textAnchor="middle" fontSize="6" fill="#F59E0B" fontWeight="bold">→ focal skin burns</text>

      {/* Device interference */}
      <rect x="265" y="130" width="120" height="85" rx="8" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      <text x="325" y="148" textAnchor="middle" fontSize="8" fill="hsl(var(--primary))" fontWeight="bold">⚠ Device Effects</text>
      <text x="325" y="162" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Pacemaker malfunction</text>
      <text x="325" y="174" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Cochlear implant damage</text>
      <text x="325" y="186" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Aneurysm clip migration</text>
      <text x="325" y="198" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Metallic heart valves</text>
      <text x="325" y="210" textAnchor="middle" fontSize="6" fill="hsl(var(--primary))" fontWeight="bold">Check MR compatibility</text>

      {/* Equipment classification */}
      <text x="200" y="235" textAnchor="middle" fontSize="10" fill="hsl(var(--foreground))" fontWeight="bold">Equipment Labels</text>

      <rect x="20" y="245" width="110" height="40" rx="6" fill="#10B981" fillOpacity="0.1" stroke="#10B981" strokeWidth="1.5" />
      <text x="75" y="262" textAnchor="middle" fontSize="8" fill="#10B981" fontWeight="bold">MR Safe</text>
      <text x="75" y="278" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">No hazard in any MR</text>

      <rect x="145" y="245" width="110" height="40" rx="6" fill="#F59E0B" fillOpacity="0.1" stroke="#F59E0B" strokeWidth="1.5" />
      <text x="200" y="262" textAnchor="middle" fontSize="8" fill="#F59E0B" fontWeight="bold">MR Conditional</text>
      <text x="200" y="278" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">Safe under specific conditions</text>

      <rect x="270" y="245" width="110" height="40" rx="6" fill="hsl(var(--destructive))" fillOpacity="0.1" stroke="hsl(var(--destructive))" strokeWidth="1.5" />
      <text x="325" y="262" textAnchor="middle" fontSize="8" fill="hsl(var(--destructive))" fontWeight="bold">MR Unsafe</text>
      <text x="325" y="278" textAnchor="middle" fontSize="6" fill="hsl(var(--muted-foreground))">NEVER enter MR environment</text>

      {/* Anaesthetic considerations */}
      <text x="200" y="308" textAnchor="middle" fontSize="8" fill="hsl(var(--primary))" fontWeight="bold">MR-compatible: monitors, ventilator, infusion pumps, anaesthetic machine — all must be non-ferromagnetic</text>
    </svg></ZoomableSVG>

    <div className="bg-card border border-border rounded-lg p-4 space-y-2">
      <h4 className="font-semibold text-sm text-foreground">Anaesthetic Considerations for MRI</h4>
      <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
        <li><strong>Remote site anaesthesia</strong>: limited access to patient inside bore; long breathing circuits/IV lines</li>
        <li><strong>Monitoring</strong>: MR-conditional pulse oximetry, capnography, ECG (fibreoptic), NIBP (long hose)</li>
        <li><strong>ECG artefact</strong>: magnetohydrodynamic effect causes ST changes (blood flow in B₀ induces voltage)</li>
        <li><strong>No ferromagnetic equipment</strong>: use aluminium laryngoscopes, plastic stethoscopes, MR-safe gas cylinders</li>
        <li><strong>Patient screening</strong>: implants, metallic foreign bodies (orbital X-ray if history of metal work), pacemakers</li>
        <li><strong>Noise</strong>: gradient coils produce &gt;100 dB → ear protection mandatory for patient and staff</li>
        <li><strong>Quench</strong>: rapid boil-off of liquid helium; risk of asphyxiation in enclosed space; emergency ventilation required</li>
      </ul>
    </div>
  </div>
);

const MRIPhysicsDiagram = () => {
  const [activeTab, setActiveTab] = useState("spin");

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="spin" className="text-xs">Spin & Precession</TabsTrigger>
          <TabsTrigger value="relaxation" className="text-xs">T1/T2 Relaxation</TabsTrigger>
          <TabsTrigger value="safety" className="text-xs">MRI Safety</TabsTrigger>
        </TabsList>
        <TabsContent value="spin">
          <NuclearSpinTab />
          <WorkedExampleCallout
            title="Larmor frequency at 1.5 T vs 3 T"
            scenario="An MRI department has both a 1.5 T and a 3 T scanner. Calculate the proton Larmor frequency at each field strength (γ for ¹H = 42.58 MHz/T)."
            numbers="ω₀ = γ × B₀. At 1.5 T → 42.58 × 1.5 = 63.87 MHz. At 3 T → 42.58 × 3 = 127.74 MHz. SAR scales with B₀² for a given sequence, so 3 T deposits roughly 4× the RF energy per kilogram."
            takeaway="The RF transmit chain must be tuned to 64 MHz at 1.5 T or 128 MHz at 3 T. Higher field strengths give better SNR but a much higher SAR — tighter scanning duty cycles and a higher index of suspicion for thermal injury (loops of wire, ECG leads, tattoos)."
          />
        </TabsContent>
        <TabsContent value="relaxation">
          <RelaxationTab />
          <WorkedExampleCallout
            title="Choosing the sequence for a suspected stroke"
            scenario="A 65-year-old with sudden right-sided weakness comes for an MRI brain. Which weighting best demonstrates oedema and ischaemia?"
            numbers="T1-weighted (short TR ~500 ms, short TE ~15 ms) makes fat bright and water dark — best for anatomy. T2-weighted (long TR ~3,000 ms, long TE ~90 ms) makes water bright and fat dark — best for oedema, CSF and pathology. DWI is even more sensitive in the first hours of stroke, but T2/FLAIR remains the workhorse on most curricula."
            takeaway="'WW2' — Water is White on T2. T1 = anatomy, T2 = pathology. Gadolinium shortens T1 and brightens enhancing lesions on post-contrast T1-weighted images."
          />
        </TabsContent>
        <TabsContent value="safety">
          <SafetyTab />
          <WorkedExampleCallout
            title="Anaesthesia for paediatric brain MRI"
            scenario="A 4-year-old needs GA for a 60-minute brain MRI with gadolinium contrast."
            numbers="Pre-screen: implants, prior surgery, foreign bodies, eGFR (avoid gadolinium if eGFR <30 → NSF risk). Equipment: MR-conditional anaesthetic machine and monitor, non-ferromagnetic laryngoscope and trolley, aluminium gas cylinders, long sampling lines for capnography, fibreoptic ECG cables to avoid focal burns. Brief the team on the quench drill and noise (>99 dB inside the bore)."
            takeaway="Treat MRI as a remote, hazardous environment: only MR-conditional kit beyond Zone IV, long IV/breathing extensions, dedicated MR-trained team, and a documented quench-and-evacuation plan before any case starts."
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MRIPhysicsDiagram;
