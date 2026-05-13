import { useState } from "react";

type Tab = "arterial" | "damping" | "cvp" | "cardiac-output";

const tabs: { key: Tab; label: string }[] = [
  { key: "arterial", label: "Arterial Line" },
  { key: "damping", label: "Frequency & Damping" },
  { key: "cvp", label: "CVP" },
  { key: "cardiac-output", label: "Cardiac Output" },
];

const ArterialLineDiagram = () => (
  <div className="space-y-4">
    <h4 className="font-semibold text-foreground">Invasive Arterial Monitoring System</h4>
    <div className="bg-secondary/30 rounded-xl p-5 border border-border">
      <svg viewBox="0 0 600 400" className="w-full h-auto">
        {/* System components */}
        <text x="300" y="20" textAnchor="middle" className="fill-foreground text-[13px] font-bold">Arterial Transducer System</text>

        {/* Cannula */}
        <rect x="20" y="60" width="90" height="40" rx="6" fill="hsl(var(--destructive)/0.15)" stroke="hsl(var(--destructive))" strokeWidth="2" />
        <text x="65" y="78" textAnchor="middle" className="fill-foreground text-[10px] font-semibold">Arterial</text>
        <text x="65" y="92" textAnchor="middle" className="fill-muted-foreground text-[8px]">20G cannula</text>

        {/* Tubing */}
        <line x1="110" y1="80" x2="175" y2="80" stroke="hsl(var(--primary))" strokeWidth="3" />
        <text x="142" y="72" textAnchor="middle" className="fill-muted-foreground text-[8px]">Stiff tubing</text>
        <text x="142" y="96" textAnchor="middle" className="fill-muted-foreground text-[7px]">&lt;120 cm, no air</text>

        {/* Transducer */}
        <rect x="175" y="50" width="110" height="60" rx="8" fill="hsl(var(--primary)/0.15)" stroke="hsl(var(--primary))" strokeWidth="2" />
        <text x="230" y="72" textAnchor="middle" className="fill-foreground text-[10px] font-semibold">Transducer</text>
        <text x="230" y="86" textAnchor="middle" className="fill-muted-foreground text-[8px]">Wheatstone bridge</text>
        <text x="230" y="98" textAnchor="middle" className="fill-muted-foreground text-[8px]">Strain gauge</text>

        {/* Flush */}
        <rect x="175" y="120" width="110" height="35" rx="6" fill="hsl(var(--accent)/0.12)" stroke="hsl(var(--accent))" strokeWidth="1.5" />
        <text x="230" y="138" textAnchor="middle" className="fill-foreground text-[9px] font-medium">Flush: 3 mL/hr</text>
        <text x="230" y="150" textAnchor="middle" className="fill-muted-foreground text-[7px]">300 mmHg pressure bag</text>

        {/* Amplifier */}
        <line x1="285" y1="80" x2="340" y2="80" stroke="hsl(var(--primary))" strokeWidth="2" />
        <rect x="340" y="55" width="90" height="50" rx="8" fill="hsl(var(--secondary)/0.4)" stroke="hsl(var(--border))" strokeWidth="1.5" />
        <text x="385" y="78" textAnchor="middle" className="fill-foreground text-[10px] font-semibold">Amplifier</text>
        <text x="385" y="92" textAnchor="middle" className="fill-muted-foreground text-[8px]">+ Filter</text>

        {/* Monitor */}
        <line x1="430" y1="80" x2="480" y2="80" stroke="hsl(var(--primary))" strokeWidth="2" />
        <rect x="480" y="50" width="100" height="60" rx="8" fill="hsl(var(--primary)/0.1)" stroke="hsl(var(--primary))" strokeWidth="2" />
        <text x="530" y="78" textAnchor="middle" className="fill-foreground text-[10px] font-semibold">Monitor</text>
        <text x="530" y="92" textAnchor="middle" className="fill-muted-foreground text-[8px]">120/80 (MAP 93)</text>

        {/* Zeroing info */}
        <text x="20" y="185" className="fill-foreground text-[12px] font-bold">Zeroing & Levelling</text>
        <rect x="20" y="195" width="560" height="75" rx="8" fill="hsl(var(--secondary)/0.2)" stroke="hsl(var(--border))" strokeWidth="1" />
        {[
          "Zero: open transducer to atmosphere → sets atmospheric pressure as reference zero",
          "Level: position transducer at phlebostatic axis (RA level = mid-axillary line, 4th ICS)",
          "If transducer too LOW → falsely HIGH reading (hydrostatic pressure adds to signal)",
          "If transducer too HIGH → falsely LOW reading",
        ].map((t, i) => (
          <text key={i} x="35" y={213 + i * 16} className="fill-muted-foreground text-[9.5px]">• {t}</text>
        ))}

        {/* Waveform */}
        <text x="20" y="295" className="fill-foreground text-[12px] font-bold">Arterial Waveform Components</text>
        {[
          "Systolic upstroke → peak systolic pressure → anacrotic notch (aortic valve opening artefact)",
          "Systolic decline → dicrotic notch (aortic valve closure) → diastolic runoff",
          "Distal arteries: systolic amplification (↑SBP, ↓DBP, preserved MAP) — due to wave reflection & resonance",
          "MAP = DBP + ⅓(SBP − DBP) — most reliable parameter, least affected by damping/site",
        ].map((t, i) => (
          <text key={i} x="30" y={315 + i * 18} className="fill-muted-foreground text-[9.5px]">• {t}</text>
        ))}

        {/* Complications */}
        <text x="20" y="390" className="fill-foreground text-[11px] font-semibold">Complications: thrombosis, embolism, ischaemia, infection, pseudoaneurysm, haematoma</text>
      </svg>
    </div>
  </div>
);

const DampingDiagram = () => (
  <div className="space-y-4">
    <h4 className="font-semibold text-foreground">Natural Frequency & Damping</h4>

    {/* --- Part 1: Frequency Response Plot --- */}
    <div className="bg-secondary/30 rounded-xl p-5 border border-border">
      <svg viewBox="0 0 620 280" className="w-full h-auto">
        <text x="310" y="18" textAnchor="middle" className="fill-foreground text-[13px] font-bold">Frequency Response (Amplitude Ratio vs Input Frequency)</text>

        <rect x="60" y="28" width="530" height="200" rx="6" fill="hsl(var(--secondary)/0.15)" stroke="hsl(var(--border))" strokeWidth="0.75" />

        {/* Y-axis */}
        <line x1="80" y1="40" x2="80" y2="220" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <text x="30" y="135" textAnchor="middle" className="fill-muted-foreground text-[8.5px]" transform="rotate(-90 30 135)">Amplitude ratio (output/input)</text>
        {[
          { v: "3.0", y: 52 }, { v: "2.0", y: 92 }, { v: "1.0", y: 132 },
          { v: "0.5", y: 152 }, { v: "0", y: 220 },
        ].map((t) => (
          <text key={t.v} x="75" y={t.y + 3} textAnchor="end" className="fill-muted-foreground text-[7px]">{t.v}</text>
        ))}

        {/* X-axis */}
        <line x1="80" y1="220" x2="570" y2="220" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <text x="325" y="245" textAnchor="middle" className="fill-muted-foreground text-[8.5px]">Input frequency / natural frequency (f / fn)</text>
        {[
          { v: "0", x: 80 }, { v: "0.2", x: 160 }, { v: "0.4", x: 240 },
          { v: "0.6", x: 320 }, { v: "0.8", x: 400 }, { v: "1.0", x: 480 },
          { v: "1.2", x: 540 },
        ].map((t) => (
          <g key={t.v}>
            <line x1={t.x} y1={220} x2={t.x} y2={224} stroke="hsl(var(--muted-foreground))" strokeWidth="0.75" />
            <text x={t.x} y={233} textAnchor="middle" className="fill-muted-foreground text-[7px]">{t.v}</text>
          </g>
        ))}

        {/* Unity reference line */}
        <line x1="80" y1="132" x2="570" y2="132" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="3,3" />

        {/* Natural frequency vertical line */}
        <line x1="480" y1="40" x2="480" y2="220" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="2,4" />
        <text x="480" y="258" textAnchor="middle" className="fill-foreground text-[8px] font-semibold">fn</text>

        {/* D = 0.2 Underdamped — large resonant peak near fn */}
        <path d="M 80 132 Q 160 131, 240 128 Q 320 118, 400 80 Q 440 42, 480 38 Q 500 55, 520 140 Q 540 190, 570 210" fill="none" stroke="hsl(var(--destructive))" strokeWidth="2" strokeLinejoin="round" />
        <text x="488" y="35" className="fill-destructive text-[8px] font-bold">D = 0.2</text>

        {/* D = 0.4 */}
        <path d="M 80 132 Q 200 131, 300 126 Q 380 112, 430 95 Q 460 85, 480 90 Q 510 120, 540 170 Q 555 195, 570 210" fill="none" stroke="hsl(var(--chart-4))" strokeWidth="1.5" strokeDasharray="5,3" />
        <text x="445" y="80" className="fill-muted-foreground text-[8px]">D = 0.4</text>

        {/* D = 0.64 Optimal — flat then gentle rolloff */}
        <path d="M 80 132 Q 200 131, 320 130 Q 400 128, 440 130 Q 480 136, 510 155 Q 540 178, 570 200" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
        <text x="530" y="150" className="fill-primary text-[9px] font-bold">D = 0.64</text>

        {/* D = 1.0 Critical — monotonic rolloff */}
        <path d="M 80 132 Q 200 133, 300 138 Q 380 150, 440 168 Q 500 190, 540 205 L 570 212" fill="none" stroke="hsl(var(--accent-foreground))" strokeWidth="1.5" strokeDasharray="6,2" />
        <text x="380" y="162" className="fill-accent-foreground text-[8px]">D = 1.0 (critical)</text>

        {/* D = 2.0 Overdamped */}
        <path d="M 80 132 Q 160 135, 240 145 Q 320 162, 400 185 Q 460 203, 540 215 L 570 218" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" />
        <text x="300" y="172" className="fill-muted-foreground text-[8px]">D = 2.0 (overdamped)</text>

        {/* Shaded flat bandwidth zone for D=0.64 */}
        <rect x="80" y="126" width="380" height="12" rx="2" fill="hsl(var(--primary)/0.08)" stroke="hsl(var(--border))" strokeWidth="0.75" />
        <text x="270" y="124" textAnchor="middle" className="fill-primary/60 text-[7px]">Usable flat bandwidth (D = 0.64)</text>

        {/* Legend */}
        <rect x="90" y="42" width="150" height="58" rx="5" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.92" />
        <text x="100" y="55" className="fill-foreground text-[8px] font-semibold">Damping Coefficient (D)</text>
        {[
          { c: "destructive", l: "D = 0.2 (underdamped)" },
          { c: "primary", l: "D = 0.64 (optimal)" },
          { c: "accent-foreground", l: "D = 1.0 (critical)" },
          { c: "muted-foreground", l: "D = 2.0 (overdamped)" },
        ].map((item, i) => (
          <g key={i}>
            <line x1="100" y1={65 + i * 10} x2="115" y2={65 + i * 10} stroke={`hsl(var(--${item.c}))`} strokeWidth="2" />
            <text x="120" y={68 + i * 10} className="fill-muted-foreground text-[7px]">{item.l}</text>
          </g>
        ))}
      </svg>
    </div>

    {/* --- Part 2: Fast Flush (Square Wave) Test --- */}
    <div className="bg-secondary/30 rounded-xl p-5 border border-border">
      <svg viewBox="0 0 620 250" className="w-full h-auto">
        <text x="310" y="18" textAnchor="middle" className="fill-foreground text-[13px] font-bold">Fast Flush (Square Wave) Test</text>

        {/* Optimal */}
        <text x="108" y="38" textAnchor="middle" className="fill-primary text-[9px] font-bold">Optimal (D ≈ 0.64)</text>
        <rect x="20" y="42" width="176" height="85" rx="5" fill="hsl(var(--secondary)/0.15)" stroke="hsl(var(--primary))" strokeWidth="1" />
        <path d="M 28 100 L 48 100 L 48 55 L 120 55 L 120 100 L 122 92 L 126 106 L 130 100 L 140 100 L 188 100" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
        <text x="108" y="120" textAnchor="middle" className="fill-primary text-[7.5px]">1–2 oscillations then baseline</text>

        {/* Underdamped */}
        <text x="324" y="38" textAnchor="middle" className="fill-destructive text-[9px] font-bold">Underdamped (D &lt; 0.64)</text>
        <rect x="236" y="42" width="176" height="85" rx="5" fill="hsl(var(--secondary)/0.15)" stroke="hsl(var(--destructive))" strokeWidth="1" />
        <path d="M 244 100 L 264 100 L 264 55 L 336 55 L 336 100 L 339 82 L 343 114 L 347 86 L 351 110 L 355 90 L 359 108 L 363 94 L 367 104 L 371 98 L 404 100" fill="none" stroke="hsl(var(--destructive))" strokeWidth="2" />
        <text x="324" y="120" textAnchor="middle" className="fill-destructive text-[7.5px]">&gt;2 oscillations (ringing)</text>

        {/* Overdamped */}
        <text x="530" y="38" textAnchor="middle" className="fill-muted-foreground text-[9px] font-bold">Overdamped (D &gt; 0.64)</text>
        <rect x="442" y="42" width="176" height="85" rx="5" fill="hsl(var(--secondary)/0.15)" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <path d="M 450 100 L 470 100 L 470 55 L 542 55 L 542 80 Q 548 98, 560 100 L 610 100" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="2" />
        <text x="530" y="120" textAnchor="middle" className="fill-muted-foreground text-[7.5px]">Sluggish return, no oscillations</text>

        {/* Effect on waveform */}
        <rect x="20" y="142" width="580" height="100" rx="6" fill="hsl(var(--secondary)/0.1)" stroke="hsl(var(--border))" strokeWidth="0.75" />
        <text x="310" y="158" textAnchor="middle" className="fill-foreground text-[10px] font-bold">Effect on Arterial Waveform</text>
        {[
          { label: "Underdamped", effects: "↑SBP, ↓DBP, MAP preserved. Systolic overshoot, ringing after dicrotic notch.", color: "destructive" },
          { label: "Optimal", effects: "Accurate SBP, DBP, MAP. Clear dicrotic notch. Faithful waveform reproduction.", color: "primary" },
          { label: "Overdamped", effects: "↓SBP, ↑DBP, MAP preserved. Loss of dicrotic notch, slurred upstroke.", color: "muted-foreground" },
        ].map((item, i) => (
          <g key={i}>
            <text x="35" y={178 + i * 20} className={`fill-${item.color} text-[9px] font-bold`}>{item.label}:</text>
            <text x="120" y={178 + i * 20} className="fill-muted-foreground text-[8.5px]">{item.effects}</text>
          </g>
        ))}
      </svg>
    </div>

    {/* --- Part 3: Key Concepts & Equations --- */}
    <div className="bg-secondary/30 rounded-xl p-5 border border-border">
      <svg viewBox="0 0 620 320" className="w-full h-auto">
        <text x="310" y="18" textAnchor="middle" className="fill-foreground text-[13px] font-bold">Transducer System Physics</text>

        {/* Natural Frequency box */}
        <rect x="20" y="30" width="280" height="135" rx="6" fill="hsl(var(--primary)/0.06)" stroke="hsl(var(--primary))" strokeWidth="1" />
        <text x="160" y="48" textAnchor="middle" className="fill-primary text-[10px] font-bold">Natural Frequency (fn)</text>
        {[
          "fn = (1/2π) × √(elastance/inertance)",
          "↑fn: short, stiff, wide-bore tubing",
          "↓fn: long, compliant, narrow tubing",
          "Arterial waveform = fundamental + 6–8 harmonics",
          "Fundamental freq ≈ HR/60 (e.g. 1.33 Hz at 80 bpm)",
          "fn must be >10× fundamental → >200 Hz",
        ].map((t, i) => (
          <text key={i} x="32" y={66 + i * 16} className="fill-muted-foreground text-[8.5px]">• {t}</text>
        ))}

        {/* Damping Coefficient box */}
        <rect x="320" y="30" width="280" height="135" rx="6" fill="hsl(var(--accent)/0.06)" stroke="hsl(var(--accent-foreground))" strokeWidth="1" />
        <text x="460" y="48" textAnchor="middle" className="fill-accent-foreground text-[10px] font-bold">Damping Coefficient (D)</text>
        {[
          "D = actual damping / critical damping",
          "D = 0: undamped — perpetual oscillation",
          "D < 0.64: underdamped — resonant overshoot",
          "D = 0.64: optimal — flat to 89% of fn",
          "D = 1.0: critically damped — no overshoot",
          "D > 1.0: overdamped — sluggish, detail lost",
        ].map((t, i) => (
          <text key={i} x="332" y={66 + i * 16} className="fill-muted-foreground text-[8.5px]">• {t}</text>
        ))}

        {/* Amplitude ratio equation */}
        <rect x="20" y="178" width="580" height="44" rx="6" fill="hsl(var(--secondary)/0.2)" stroke="hsl(var(--border))" strokeWidth="0.75" />
        <text x="310" y="195" textAnchor="middle" className="fill-foreground text-[9.5px] font-semibold">Amplitude Ratio = 1 / √[ (1 − (f/fn)²)² + (2D × f/fn)² ]</text>
        <text x="310" y="214" textAnchor="middle" className="fill-muted-foreground text-[8px]">At f/fn = 1 (resonance): ratio = 1/(2D) — hence smaller D → larger resonant peak</text>

        {/* Causes table */}
        <text x="310" y="244" textAnchor="middle" className="fill-foreground text-[10px] font-bold">Common Causes of Abnormal Damping</text>

        <rect x="20" y="252" width="280" height="62" rx="5" fill="hsl(var(--destructive)/0.06)" stroke="hsl(var(--destructive))" strokeWidth="0.75" />
        <text x="160" y="266" textAnchor="middle" className="fill-destructive text-[9px] font-bold">Underdamping</text>
        {["Long tubing / extension sets", "Stiff non-compliant tubing", "Additional stopcocks / connectors"].map((t, i) => (
          <text key={i} x="32" y={280 + i * 11} className="fill-muted-foreground text-[8px]">• {t}</text>
        ))}

        <rect x="320" y="252" width="280" height="62" rx="5" fill="hsl(var(--muted)/0.5)" stroke="hsl(var(--muted-foreground))" strokeWidth="0.75" />
        <text x="460" y="266" textAnchor="middle" className="fill-muted-foreground text-[9px] font-bold">Overdamping</text>
        {["Air bubbles in system (most common)", "Blood clot / fibrin in catheter", "Kinked or partially occluded tubing"].map((t, i) => (
          <text key={i} x="332" y={280 + i * 11} className="fill-muted-foreground text-[8px]">• {t}</text>
        ))}
      </svg>
    </div>
  </div>
);

const CVPDiagram = () => (
  <div className="space-y-4">
    <h4 className="font-semibold text-foreground">Central Venous Pressure Monitoring</h4>
    <div className="bg-secondary/30 rounded-xl p-5 border border-border">
      <svg viewBox="0 0 600 440" className="w-full h-auto">
        {/* CVP waveform */}
        <text x="300" y="20" textAnchor="middle" className="fill-foreground text-[13px] font-bold">CVP Waveform Components</text>

        <rect x="30" y="30" width="540" height="160" rx="8" fill="hsl(var(--secondary)/0.2)" stroke="hsl(var(--border))" strokeWidth="1" />
        {/* Axes */}
        <line x1="60" y1="170" x2="550" y2="170" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <line x1="60" y1="50" x2="60" y2="170" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />

        {/* CVP waveform - a, c, x, v, y */}
        <path d="M 60 130 Q 80 130, 100 85 Q 110 70, 120 85 Q 135 110, 145 100 Q 155 90, 160 100 Q 180 140, 220 145 Q 240 145, 260 105 Q 270 90, 280 105 Q 300 135, 330 140 Q 350 140, 380 85 Q 390 70, 400 85 Q 415 110, 425 100 Q 435 90, 440 100 Q 460 140, 500 145 Q 520 145, 540 105" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />

        {/* Labels */}
        <text x="110" y="63" textAnchor="middle" className="fill-destructive text-[11px] font-bold">a</text>
        <text x="155" y="83" textAnchor="middle" className="fill-primary text-[11px] font-bold">c</text>
        <text x="220" y="155" textAnchor="middle" className="fill-accent text-[11px] font-bold">x</text>
        <text x="275" y="83" textAnchor="middle" className="fill-destructive text-[11px] font-bold">v</text>
        <text x="335" y="155" textAnchor="middle" className="fill-accent text-[11px] font-bold">y</text>

        {/* Wave descriptions */}
        <text x="20" y="210" className="fill-foreground text-[12px] font-bold">Waveform Components</text>
        {[
          { wave: "a wave", desc: "Atrial contraction (absent in AF; giant in tricuspid stenosis, pulmonary HTN)", colour: "destructive" },
          { wave: "c wave", desc: "Tricuspid valve closure / bulging into atrium during isovolumetric contraction", colour: "primary" },
          { wave: "x descent", desc: "Atrial relaxation + descent of tricuspid ring during ventricular systole", colour: "accent" },
          { wave: "v wave", desc: "Passive atrial filling against closed tricuspid valve (giant in TR)", colour: "destructive" },
          { wave: "y descent", desc: "Rapid atrial emptying after tricuspid valve opens (steep in constrictive pericarditis)", colour: "accent" },
        ].map((w, i) => (
          <g key={w.wave}>
            <text x="30" y={230 + i * 20} className={`fill-${w.colour} text-[10px] font-bold`}>{w.wave}:</text>
            <text x="100" y={230 + i * 20} className="fill-muted-foreground text-[9.5px]">{w.desc}</text>
          </g>
        ))}

        {/* Clinical */}
        <text x="20" y="345" className="fill-foreground text-[12px] font-bold">Clinical Interpretation</text>
        <text x="30" y="362" className="fill-muted-foreground text-[10px]">• Normal CVP: 0–8 mmHg (0–10 cmH₂O). Measure at end-expiration, zeroed to RA level.</text>
        <text x="30" y="380" className="fill-muted-foreground text-[10px]">• ↑CVP: fluid overload, RV failure, PE, tamponade, tension pneumothorax, IPPV</text>
        <text x="30" y="398" className="fill-muted-foreground text-[10px]">• ↓CVP: hypovolaemia, vasodilation (sepsis, neuraxial block)</text>
        <text x="30" y="416" className="fill-muted-foreground text-[10px]">• CVP is a poor predictor of fluid responsiveness — trend and dynamic assessment are more valuable</text>
        <text x="30" y="434" className="fill-muted-foreground text-[10px]">• Kink/Friedreich sign: prominent x + y descents in constrictive pericarditis</text>
      </svg>
    </div>
  </div>
);

const CardiacOutputDiagram = () => (
  <div className="space-y-4">
    <h4 className="font-semibold text-foreground">Cardiac Output Measurement Techniques</h4>
    <div className="bg-secondary/30 rounded-xl p-5 border border-border">
      <svg viewBox="0 0 600 520" className="w-full h-auto">
        <text x="300" y="20" textAnchor="middle" className="fill-foreground text-[13px] font-bold">Methods of Cardiac Output Measurement</text>

        {/* Thermodilution */}
        <rect x="20" y="35" width="270" height="120" rx="8" fill="hsl(var(--primary)/0.08)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
        <text x="155" y="55" textAnchor="middle" className="fill-primary text-[11px] font-bold">PAC Thermodilution (Gold Standard)</text>
        {[
          "Cold saline injected RA → temperature",
          "change measured at PA thermistor",
          "CO = V×(Tb−Ti)×K / ∫ΔT dt",
          "(Stewart-Hamilton equation)",
          "Large area under curve = low CO",
          "Small area under curve = high CO",
        ].map((t, i) => (
          <text key={i} x="35" y={72 + i * 13} className="fill-muted-foreground text-[9px]">{t}</text>
        ))}

        {/* Transpulmonary */}
        <rect x="310" y="35" width="270" height="120" rx="8" fill="hsl(var(--accent)/0.08)" stroke="hsl(var(--accent))" strokeWidth="1.5" />
        <text x="445" y="55" textAnchor="middle" className="fill-accent text-[11px] font-bold">Transpulmonary (PiCCO / VolumeView)</text>
        {[
          "Cold saline: CVC → arterial thermistor",
          "Calibrated pulse contour analysis",
          "Also gives: GEDV, EVLW, SVV, PPV",
          "Less invasive than PAC",
          "Needs recalibration periodically",
          "Inaccurate with aortic regurgitation",
        ].map((t, i) => (
          <text key={i} x="325" y={72 + i * 13} className="fill-muted-foreground text-[9px]">{t}</text>
        ))}

        {/* Fick */}
        <rect x="20" y="170" width="270" height="100" rx="8" fill="hsl(var(--destructive)/0.08)" stroke="hsl(var(--destructive))" strokeWidth="1.5" />
        <text x="155" y="190" textAnchor="middle" className="fill-destructive text-[11px] font-bold">Fick Principle</text>
        {[
          "CO = VO₂ / (CaO₂ − CvO₂)",
          "VO₂ = oxygen consumption (~250 mL/min)",
          "CaO₂ = arterial O₂ content",
          "CvO₂ = mixed venous O₂ content (PA blood)",
          "Gold standard theory; impractical clinically",
        ].map((t, i) => (
          <text key={i} x="35" y={207 + i * 13} className="fill-muted-foreground text-[9px]">{t}</text>
        ))}

        {/* Non-invasive */}
        <rect x="310" y="170" width="270" height="100" rx="8" fill="hsl(var(--secondary)/0.4)" stroke="hsl(var(--border))" strokeWidth="1.5" />
        <text x="445" y="190" textAnchor="middle" className="fill-foreground text-[11px] font-bold">Non/Minimally Invasive</text>
        {[
          "Oesophageal Doppler: aortic flow velocity",
          "  CO = CSA × VTI × HR",
          "LiDCO: lithium dilution + pulse power",
          "FloTrac/Vigileo: arterial waveform analysis",
          "Thoracic bioimpedance/bioreactance",
        ].map((t, i) => (
          <text key={i} x="325" y={207 + i * 13} className="fill-muted-foreground text-[9px]">{t}</text>
        ))}

        {/* Comparison */}
        <text x="300" y="295" textAnchor="middle" className="fill-foreground text-[12px] font-bold">Method Comparison</text>
        {/* Header */}
        <rect x="20" y="302" width="560" height="22" rx="4" fill="hsl(var(--primary)/0.1)" stroke="hsl(var(--border))" strokeWidth="0.75" />
        <text x="120" y="317" textAnchor="middle" className="fill-foreground text-[9px] font-bold">Method</text>
        <text x="270" y="317" textAnchor="middle" className="fill-foreground text-[9px] font-bold">Invasiveness</text>
        <text x="390" y="317" textAnchor="middle" className="fill-foreground text-[9px] font-bold">Calibration</text>
        <text x="520" y="317" textAnchor="middle" className="fill-foreground text-[9px] font-bold">Continuous?</text>

        {[
          { method: "PAC Thermodilution", inv: "High (PA catheter)", cal: "Self-calibrating", cont: "Intermittent bolus" },
          { method: "PiCCO", inv: "Moderate (CVC + art)", cal: "Thermodilution", cont: "Yes (pulse contour)" },
          { method: "LiDCO", inv: "Low (art line only)", cal: "Lithium dilution", cont: "Yes (pulse power)" },
          { method: "Oesophageal Doppler", inv: "Low (oesophageal probe)", cal: "Nomogram", cont: "Yes (real-time)" },
          { method: "FloTrac/Vigileo", inv: "Low (art line only)", cal: "Uncalibrated", cont: "Yes (waveform)" },
          { method: "Echocardiography", inv: "Non-invasive (TTE)", cal: "None needed", cont: "Intermittent" },
        ].map((row, i) => (
          <g key={row.method}>
            <rect x="20" y={326 + i * 22} width="560" height="20" rx="3" fill={i % 2 === 0 ? "hsl(var(--secondary)/0.15)" : "transparent"} />
            <text x="120" y={340 + i * 22} textAnchor="middle" className="fill-foreground text-[9px]">{row.method}</text>
            <text x="270" y={340 + i * 22} textAnchor="middle" className="fill-muted-foreground text-[8.5px]">{row.inv}</text>
            <text x="390" y={340 + i * 22} textAnchor="middle" className="fill-muted-foreground text-[8.5px]">{row.cal}</text>
            <text x="520" y={340 + i * 22} textAnchor="middle" className="fill-muted-foreground text-[8.5px]">{row.cont}</text>
          </g>
        ))}

        {/* Echo CO formula */}
        <text x="300" y="480" textAnchor="middle" className="fill-foreground text-[10px] font-semibold">Echo: CO = LVOT CSA × VTI × HR = π(d/2)² × VTI × HR</text>
        <text x="300" y="498" textAnchor="middle" className="fill-muted-foreground text-[9px]">LVOT diameter measured in parasternal long axis; VTI from apical 5-chamber PW Doppler</text>
      </svg>
    </div>
  </div>
);

const ClinicalMeasurementDiagram = () => {
  const [activeTab, setActiveTab] = useState<Tab>("arterial");

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

      {activeTab === "arterial" && <ArterialLineDiagram />}
      {activeTab === "damping" && <DampingDiagram />}
      {activeTab === "cvp" && <CVPDiagram />}
      {activeTab === "cardiac-output" && <CardiacOutputDiagram />}
    </div>
  );
};

export default ClinicalMeasurementDiagram;
