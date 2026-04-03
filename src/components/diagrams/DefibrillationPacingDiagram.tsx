import { useState } from "react";

type Tab = "waveforms" | "impedance" | "pacemaker" | "emi";

const tabs: { key: Tab; label: string }[] = [
  { key: "waveforms", label: "Waveforms" },
  { key: "impedance", label: "Impedance" },
  { key: "pacemaker", label: "Pacemaker Modes" },
  { key: "emi", label: "EMI & Safety" },
];

const WaveformsDiagram = () => (
  <div className="space-y-4">
    <h4 className="font-semibold text-foreground">Monophasic vs Biphasic Waveforms</h4>
    <div className="bg-secondary/30 rounded-xl p-5 border border-border">
      <svg viewBox="0 0 600 380" className="w-full h-auto">
        {/* Monophasic */}
        <text x="150" y="20" textAnchor="middle" className="fill-foreground text-[13px] font-bold">Monophasic (MDS)</text>
        <rect x="10" y="28" width="280" height="140" rx="8" fill="hsl(var(--secondary)/0.3)" stroke="hsl(var(--border))" strokeWidth="1" />
        {/* Axes */}
        <line x1="40" y1="140" x2="270" y2="140" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <line x1="40" y1="45" x2="40" y2="155" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <text x="35" y="50" textAnchor="end" className="fill-muted-foreground text-[8px]">+</text>
        <text x="270" y="152" className="fill-muted-foreground text-[8px]">ms</text>
        {/* Monophasic damped sinusoidal */}
        <path d="M 40 140 Q 60 40, 100 60 Q 140 80, 180 120 Q 210 135, 250 140" fill="none" stroke="hsl(var(--destructive))" strokeWidth="2.5" />
        <text x="150" y="55" textAnchor="middle" className="fill-destructive text-[9px] font-medium">Single polarity</text>
        <text x="150" y="105" textAnchor="middle" className="fill-muted-foreground text-[9px]">Current flows one direction</text>

        {/* Biphasic */}
        <text x="450" y="20" textAnchor="middle" className="fill-foreground text-[13px] font-bold">Biphasic (BTE / RLB)</text>
        <rect x="310" y="28" width="280" height="140" rx="8" fill="hsl(var(--secondary)/0.3)" stroke="hsl(var(--border))" strokeWidth="1" />
        <line x1="340" y1="100" x2="570" y2="100" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <line x1="340" y1="45" x2="340" y2="155" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <text x="335" y="50" textAnchor="end" className="fill-muted-foreground text-[8px]">+</text>
        <text x="335" y="155" textAnchor="end" className="fill-muted-foreground text-[8px]">−</text>
        {/* Biphasic truncated exponential */}
        <path d="M 340 100 L 345 55 Q 380 58, 430 70 L 430 100" fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5" />
        <path d="M 430 100 L 430 130 Q 470 128, 520 118 L 520 100" fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5" />
        <text x="385" y="53" textAnchor="middle" className="fill-primary text-[9px] font-medium">Phase 1 (+)</text>
        <text x="475" y="145" textAnchor="middle" className="fill-primary text-[9px] font-medium">Phase 2 (−)</text>

        {/* Comparison table */}
        <text x="300" y="195" textAnchor="middle" className="fill-foreground text-[12px] font-bold">Comparison</text>

        {[
          { feature: "Energy for VF", mono: "360 J", bi: "120–200 J" },
          { feature: "Efficacy", mono: "Good", bi: "Equal or superior" },
          { feature: "Myocardial damage", mono: "More (higher energy)", bi: "Less" },
          { feature: "Impedance compensation", mono: "No", bi: "Yes (adjusts waveform)" },
          { feature: "Current standard", mono: "Largely replaced", bi: "✓ Recommended" },
        ].map((row, i) => (
          <g key={row.feature}>
            <rect x="30" y={205 + i * 28} width="540" height="26" rx="4" fill={i % 2 === 0 ? "hsl(var(--secondary)/0.2)" : "transparent"} />
            <text x="40" y={222 + i * 28} className="fill-foreground text-[10px] font-medium">{row.feature}</text>
            <text x="280" y={222 + i * 28} textAnchor="middle" className="fill-muted-foreground text-[10px]">{row.mono}</text>
            <text x="460" y={222 + i * 28} textAnchor="middle" className="fill-primary text-[10px] font-medium">{row.bi}</text>
          </g>
        ))}
        <text x="280" y="202" textAnchor="middle" className="fill-muted-foreground text-[9px] font-semibold">Monophasic</text>
        <text x="460" y="202" textAnchor="middle" className="fill-primary text-[9px] font-semibold">Biphasic</text>

        {/* Key formula */}
        <text x="300" y="365" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">Energy (J) = Power (W) × Time (s) = V × I × t</text>
      </svg>
    </div>
  </div>
);

const ImpedanceDiagram = () => (
  <div className="space-y-4">
    <h4 className="font-semibold text-foreground">Transthoracic Impedance (TTI)</h4>
    <div className="bg-secondary/30 rounded-xl p-5 border border-border">
      <svg viewBox="0 0 600 400" className="w-full h-auto">
        {/* Chest cross-section schematic */}
        <text x="300" y="22" textAnchor="middle" className="fill-foreground text-[13px] font-bold">Current Pathway Through the Chest</text>
        
        {/* Chest outline */}
        <ellipse cx="300" cy="130" rx="140" ry="90" fill="hsl(var(--secondary)/0.2)" stroke="hsl(var(--border))" strokeWidth="2" />
        
        {/* Heart */}
        <ellipse cx="300" cy="130" rx="35" ry="30" fill="hsl(var(--destructive)/0.2)" stroke="hsl(var(--destructive))" strokeWidth="2" />
        <text x="300" y="134" textAnchor="middle" className="fill-destructive text-[10px] font-bold">Heart</text>

        {/* Pads */}
        <rect x="155" y="80" width="40" height="20" rx="4" fill="hsl(var(--primary))" />
        <text x="175" y="94" textAnchor="middle" fill="#fff" className="text-[8px] font-bold">PAD</text>
        <rect x="405" y="130" width="40" height="20" rx="4" fill="hsl(var(--primary))" />
        <text x="425" y="144" textAnchor="middle" fill="#fff" className="text-[8px] font-bold">PAD</text>

        {/* Current path */}
        <path d="M 195 90 Q 250 100, 265 120" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="4" />
        <path d="M 335 140 Q 370 145, 405 140" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="4" />
        <text x="300" y="175" textAnchor="middle" className="fill-muted-foreground text-[9px]">Only ~4% of current traverses the heart</text>

        {/* TTI value */}
        <rect x="170" y="200" width="260" height="30" rx="6" fill="hsl(var(--accent)/0.1)" stroke="hsl(var(--accent))" strokeWidth="1.5" />
        <text x="300" y="220" textAnchor="middle" className="fill-foreground text-[11px] font-semibold">Typical TTI: 70–80 Ω (range 15–150 Ω)</text>

        {/* Factors */}
        <text x="20" y="255" className="fill-foreground text-[12px] font-bold">Factors Affecting TTI</text>
        
        {[
          { factor: "↑ Impedance", items: "Obesity, COPD/hyperinflation, hairy chest, poor pad contact, small pads" },
          { factor: "↓ Impedance", items: "Conductive gel/pads, firm pressure (25 lb), expiration, larger pads, repeated shocks" },
        ].map((group, gi) => (
          <g key={group.factor}>
            <text x="30" y={278 + gi * 45} className="fill-foreground text-[10px] font-semibold">{group.factor}</text>
            <text x="40" y={293 + gi * 45} className="fill-muted-foreground text-[9.5px]">{group.items}</text>
          </g>
        ))}

        {/* Pad positions */}
        <text x="20" y="375" className="fill-foreground text-[12px] font-bold">Pad Positions</text>
        <text x="30" y="395" className="fill-muted-foreground text-[10px]">• Anterolateral: right sternal edge (below clavicle) + left mid-axillary line (V6 position)</text>
      </svg>
    </div>
  </div>
);

const PacemakerDiagram = () => (
  <div className="space-y-4">
    <h4 className="font-semibold text-foreground">Pacemaker Modes (NBG Code)</h4>
    <div className="bg-secondary/30 rounded-xl p-5 border border-border">
      <svg viewBox="0 0 600 480" className="w-full h-auto">
        {/* NBG code explanation */}
        <text x="300" y="22" textAnchor="middle" className="fill-foreground text-[13px] font-bold">NASPE/BPEG Generic (NBG) Pacemaker Code</text>

        {[
          { pos: "I", label: "Chamber Paced", options: "A, V, D, O", x: 60 },
          { pos: "II", label: "Chamber Sensed", options: "A, V, D, O", x: 180 },
          { pos: "III", label: "Response", options: "I, T, D, O", x: 300 },
          { pos: "IV", label: "Rate Response", options: "R, O", x: 420 },
          { pos: "V", label: "Multisite", options: "A, V, D, O", x: 540 },
        ].map((col) => (
          <g key={col.pos}>
            <rect x={col.x - 50} y={35} width="100" height="70" rx="8" fill="hsl(var(--primary)/0.1)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
            <text x={col.x} y={55} textAnchor="middle" className="fill-primary text-[12px] font-bold">{col.pos}</text>
            <text x={col.x} y={72} textAnchor="middle" className="fill-foreground text-[9px] font-medium">{col.label}</text>
            <text x={col.x} y={90} textAnchor="middle" className="fill-muted-foreground text-[9px]">{col.options}</text>
          </g>
        ))}

        <text x="300" y="125" textAnchor="middle" className="fill-muted-foreground text-[9px]">A=Atrium V=Ventricle D=Dual O=None I=Inhibited T=Triggered R=Rate-responsive</text>

        {/* Common modes */}
        <text x="20" y="155" className="fill-foreground text-[12px] font-bold">Common Pacemaker Modes</text>

        {[
          { mode: "VVI", desc: "Ventricular demand pacing", detail: "Paces V, senses V, inhibited by sensed beat. Most common single-chamber mode. Risk: pacemaker syndrome (loss of AV synchrony)." },
          { mode: "AAI", desc: "Atrial demand pacing", detail: "Paces A, senses A, inhibited by sensed P wave. Requires intact AV conduction. Used in sick sinus syndrome." },
          { mode: "DDD", desc: "Dual-chamber pacing", detail: "Paces & senses both chambers. Maintains AV synchrony. Most physiological. Mode of choice for complete heart block." },
          { mode: "VOO/DOO", desc: "Asynchronous (fixed rate)", detail: "No sensing → no inhibition. Used with magnet application. Safe during diathermy — eliminates EMI-induced inhibition." },
        ].map((m, i) => (
          <g key={m.mode}>
            <rect x="20" y={165 + i * 65} width="560" height="58" rx="8" fill="hsl(var(--secondary)/0.2)" stroke="hsl(var(--border))" strokeWidth="1" />
            <text x="35" y={185 + i * 65} className="fill-primary text-[13px] font-bold">{m.mode}</text>
            <text x="90" y={185 + i * 65} className="fill-foreground text-[11px] font-medium">— {m.desc}</text>
            <text x="35" y={205 + i * 65} className="fill-muted-foreground text-[9.5px]">{m.detail}</text>
          </g>
        ))}

        {/* Temporary pacing */}
        <text x="20" y="440" className="fill-foreground text-[12px] font-bold">Temporary Pacing Methods</text>
        <text x="30" y="458" className="fill-muted-foreground text-[10px]">• Transcutaneous (external pads, painful, bridge only) • Transvenous (RV apex via central vein, reliable)</text>
        <text x="30" y="475" className="fill-muted-foreground text-[10px]">• Epicardial (post cardiac surgery) • Transoesophageal (atrial pacing only)</text>
      </svg>
    </div>
  </div>
);

const EMIDiagram = () => (
  <div className="space-y-4">
    <h4 className="font-semibold text-foreground">Electromagnetic Interference & Perioperative Safety</h4>
    <div className="bg-secondary/30 rounded-xl p-5 border border-border">
      <svg viewBox="0 0 600 500" className="w-full h-auto">
        <text x="300" y="22" textAnchor="middle" className="fill-foreground text-[13px] font-bold">Sources of EMI in Theatre</text>

        {[
          { source: "Surgical Diathermy", risk: "Most common cause of EMI. Monopolar > bipolar risk. Can cause inhibition (no pacing) or inappropriate tracking.", colour: "destructive", x: 20, y: 35 },
          { source: "MRI", risk: "Ferromagnetic components → missile effect. Lead heating → myocardial burns. Gradient fields → inappropriate pacing.", colour: "destructive", x: 310, y: 35 },
          { source: "Defibrillation", risk: "Energy conducted along leads → myocardial damage at electrode tip. Place pads >15 cm from generator.", colour: "primary", x: 20, y: 130 },
          { source: "Nerve Stimulators", risk: "Low risk with modern devices. Use lowest effective current. Avoid proximity to generator.", colour: "primary", x: 310, y: 130 },
        ].map((s) => (
          <g key={s.source}>
            <rect x={s.x} y={s.y} width="270" height="80" rx="8" fill={`hsl(var(--${s.colour})/0.08)`} stroke={`hsl(var(--${s.colour}))`} strokeWidth="1.5" />
            <text x={s.x + 135} y={s.y + 20} textAnchor="middle" className="fill-foreground text-[11px] font-bold">{s.source}</text>
            {s.risk.split(". ").map((line, li) => (
              <text key={li} x={s.x + 10} y={s.y + 38 + li * 14} className="fill-muted-foreground text-[9px]">• {line}{li < s.risk.split(". ").length - 1 ? "" : ""}</text>
            ))}
          </g>
        ))}

        {/* Perioperative management */}
        <text x="300" y="240" textAnchor="middle" className="fill-foreground text-[13px] font-bold">Perioperative Pacemaker Management</text>

        <rect x="20" y="252" width="560" height="240" rx="10" fill="hsl(var(--secondary)/0.2)" stroke="hsl(var(--border))" strokeWidth="1" />

        {[
          { phase: "Pre-operative", steps: ["Identify device type (pacemaker vs ICD), manufacturer, indication", "Check dependency: is patient pacing >90% of the time?", "Recent interrogation (<12 months), battery status, lead integrity", "Plan: magnet availability, external pacing/defib backup"] },
          { phase: "Intra-operative", steps: ["ICD: disable anti-tachy therapies (magnet or reprogramme)", "Pacemaker-dependent: consider magnet (→ VOO/DOO) if diathermy needed", "Bipolar diathermy preferred; if monopolar, place return pad away from generator", "Short bursts of diathermy (<5s); continuous ECG + SpO₂ + arterial line"] },
          { phase: "Post-operative", steps: ["Re-interrogate and restore original settings before discharge", "ICD: re-enable anti-tachy therapies immediately post-op", "Document all changes in patient notes"] },
        ].map((p, pi) => (
          <g key={p.phase}>
            <text x="35" y={275 + pi * 78} className="fill-primary text-[11px] font-bold">{p.phase}</text>
            {p.steps.map((s, si) => (
              <text key={si} x="45" y={290 + pi * 78 + si * 14} className="fill-muted-foreground text-[9px]">• {s}</text>
            ))}
          </g>
        ))}
      </svg>
    </div>
  </div>
);

const DefibrillationPacingDiagram = () => {
  const [activeTab, setActiveTab] = useState<Tab>("waveforms");

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

      {activeTab === "waveforms" && <WaveformsDiagram />}
      {activeTab === "impedance" && <ImpedanceDiagram />}
      {activeTab === "pacemaker" && <PacemakerDiagram />}
      {activeTab === "emi" && <EMIDiagram />}
    </div>
  );
};

export default DefibrillationPacingDiagram;
