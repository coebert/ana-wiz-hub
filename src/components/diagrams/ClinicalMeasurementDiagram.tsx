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
    <div className="bg-secondary/30 rounded-xl p-5 border border-border">
      <svg viewBox="0 0 600 460" className="w-full h-auto">
        {/* Frequency response curve */}
        <text x="300" y="20" textAnchor="middle" className="fill-foreground text-[13px] font-bold">Frequency Response & Resonance</text>

        <rect x="30" y="30" width="540" height="180" rx="8" fill="hsl(var(--secondary)/0.2)" stroke="hsl(var(--border))" strokeWidth="1" />
        {/* Axes */}
        <line x1="80" y1="190" x2="540" y2="190" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <line x1="80" y1="50" x2="80" y2="190" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <text x="310" y="205" textAnchor="middle" className="fill-muted-foreground text-[9px]">Input frequency (Hz)</text>
        <text x="50" y="120" textAnchor="middle" className="fill-muted-foreground text-[9px]" transform="rotate(-90 50 120)">Amplitude ratio</text>

        {/* Underdamped curve - big resonant peak */}
        <path d="M 80 150 Q 200 148, 300 145 Q 380 100, 420 50 Q 440 80, 470 170 Q 500 185, 540 190" fill="none" stroke="hsl(var(--destructive))" strokeWidth="2" />
        <text x="430" y="45" className="fill-destructive text-[9px] font-medium">Underdamped</text>

        {/* Optimally damped - slight rise then flat */}
        <path d="M 80 150 Q 200 148, 350 145 Q 400 140, 430 150 Q 470 165, 540 185" fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5" />
        <text x="460" y="148" className="fill-primary text-[9px] font-bold">Optimal (D = 0.64)</text>

        {/* Overdamped - rolls off early */}
        <path d="M 80 150 Q 200 152, 300 160 Q 400 175, 500 188 L 540 190" fill="none" stroke="hsl(var(--accent))" strokeWidth="2" />
        <text x="350" y="178" className="fill-accent text-[9px] font-medium">Overdamped</text>

        {/* Unity line */}
        <line x1="80" y1="150" x2="540" y2="150" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="4" />
        <text x="72" y="153" textAnchor="end" className="fill-muted-foreground text-[8px]">1.0</text>

        {/* Natural frequency label */}
        <line x1="420" y1="190" x2="420" y2="195" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <text x="420" y="205" textAnchor="middle" className="fill-foreground text-[8px] font-medium">fn</text>

        {/* Key concepts */}
        <text x="20" y="235" className="fill-foreground text-[12px] font-bold">Key Concepts</text>
        <rect x="20" y="245" width="270" height="100" rx="8" fill="hsl(var(--primary)/0.06)" stroke="hsl(var(--primary))" strokeWidth="1" />
        <text x="155" y="262" textAnchor="middle" className="fill-primary text-[10px] font-bold">Natural Frequency (fn)</text>
        {[
          "Frequency at which system resonates",
          "Must be >10× arterial fundamental",
          "Arterial = 6–8 harmonics of HR",
          "Ideal fn > 200 Hz",
        ].map((t, i) => (
          <text key={i} x="35" y={280 + i * 15} className="fill-muted-foreground text-[9px]">• {t}</text>
        ))}

        <rect x="310" y="245" width="270" height="100" rx="8" fill="hsl(var(--accent)/0.06)" stroke="hsl(var(--accent))" strokeWidth="1" />
        <text x="445" y="262" textAnchor="middle" className="fill-accent text-[10px] font-bold">Damping Coefficient (D)</text>
        {[
          "D = 0: undamped (infinite oscillation)",
          "D = 0.64: optimal (flat response)",
          "D = 1: critical damping (no overshoot)",
          "D > 1: overdamped (sluggish, loses detail)",
        ].map((t, i) => (
          <text key={i} x="325" y={280 + i * 15} className="fill-muted-foreground text-[9px]">• {t}</text>
        ))}

        {/* Fast flush test */}
        <text x="20" y="370" className="fill-foreground text-[12px] font-bold">Fast Flush (Square Wave) Test</text>
        <rect x="20" y="380" width="560" height="70" rx="8" fill="hsl(var(--secondary)/0.2)" stroke="hsl(var(--border))" strokeWidth="1" />
        {[
          "Optimal: 1–2 oscillations before returning to waveform; amplitude ratio of successive peaks ≈ 0.6",
          "Underdamped: >2 oscillations (ringing) → SBP overestimated, DBP underestimated; causes: long tubing, air bubbles, compliant tubing",
          "Overdamped: no oscillations, slurred waveform → SBP underestimated, DBP overestimated; causes: air bubbles, clot, kink, soft tubing",
        ].map((t, i) => (
          <text key={i} x="35" y={398 + i * 17} className="fill-muted-foreground text-[9px]">• {t}</text>
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
        <path d="M 60 130 Q 80 130, 100 85 Q 110 70, 120 85 Q 135 110, 145 100 Q 155 90, 160 100 Q 180 140, 220 145 Q 240 145, 260 105 Q 270 90, 280 105 Q 300 135, 330 140 Q 350 140, 380 85 Q 390 70, 400 85 Q 415 110, 425 100 Q 435 90, 440 100 Q 460 140, 500 145 Q 520 145, 540 105" fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5" />

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
        <rect x="20" y="302" width="560" height="22" rx="4" fill="hsl(var(--primary)/0.1)" />
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
