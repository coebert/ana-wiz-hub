import { useState } from "react";
import { WorkedExampleCallout } from "./WorkedExampleCallout";
import { DiagramLearningPoints } from "./DiagramLearningPoints";
import { ZoomableSVG } from "./ZoomableSVG";
import { DiagramFigure } from "./_shared/DiagramFigure";

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
      <ZoomableSVG><svg viewBox="0 0 600 380" className="w-full h-auto" role="img" aria-label="Comparison of a monophasic damped sinusoidal defibrillator waveform with a biphasic truncated exponential waveform, followed by a comparison table of energy, efficacy and myocardial damage.">
        {/* Monophasic */}
        <text x="150" y="20" textAnchor="middle" className="fill-foreground text-[13px] font-bold">Monophasic (MDS)</text>
        <rect x="10" y="28" width="280" height="140" rx="8" fill="hsl(var(--secondary)/0.3)" stroke="hsl(var(--border))" strokeWidth="1" />
        {/* Axes */}
        <line x1="40" y1="140" x2="270" y2="140" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <line x1="40" y1="45" x2="40" y2="155" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <text x="35" y="50" textAnchor="end" className="fill-muted-foreground text-[8px]">+</text>
        <text x="270" y="152" className="fill-muted-foreground text-[8px]">ms</text>
        {/* Monophasic damped sinusoidal — animated draw-on */}
        <path d="M 40 140 Q 60 40, 100 60 Q 140 80, 180 120 Q 210 135, 250 140" fill="none" stroke="hsl(var(--destructive))" strokeWidth="2" strokeDasharray="400" strokeDashoffset="400">
          <animate attributeName="stroke-dashoffset" from="400" to="0" dur="1.6s" repeatCount="indefinite" />
        </path>
        <text x="150" y="55" textAnchor="middle" className="fill-destructive text-[9px] font-medium">Single polarity</text>
        <text x="150" y="105" textAnchor="middle" className="fill-muted-foreground text-[9px]">Current flows one direction</text>

        {/* Biphasic */}
        <text x="450" y="20" textAnchor="middle" className="fill-foreground text-[13px] font-bold">Biphasic (BTE / RLB)</text>
        <rect x="310" y="28" width="280" height="140" rx="8" fill="hsl(var(--secondary)/0.3)" stroke="hsl(var(--border))" strokeWidth="1" />
        <line x1="340" y1="100" x2="570" y2="100" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <line x1="340" y1="45" x2="340" y2="155" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
        <text x="335" y="50" textAnchor="end" className="fill-muted-foreground text-[8px]">+</text>
        <text x="335" y="155" textAnchor="end" className="fill-muted-foreground text-[8px]">−</text>
        {/* Biphasic truncated exponential — animated draw-on */}
        <path d="M 340 100 L 345 55 Q 380 58, 430 70 L 430 100" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="200" strokeDashoffset="200">
          <animate attributeName="stroke-dashoffset" from="200" to="0" dur="0.8s" begin="0s;reanim.end+0.8s" id="phase1" repeatCount="1" fill="freeze" />
        </path>
        <path d="M 430 100 L 430 130 Q 470 128, 520 118 L 520 100" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="200" strokeDashoffset="200">
          <animate attributeName="stroke-dashoffset" from="200" to="0" dur="0.8s" begin="phase1.end" id="reanim" repeatCount="1" fill="freeze" />
        </path>
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
      </svg></ZoomableSVG>
    </div>
  </div>
);

const ImpedanceDiagram = () => (
  <div className="space-y-4">
    <h4 className="font-semibold text-foreground">Transthoracic Impedance (TTI)</h4>
    <div className="bg-secondary/30 rounded-xl p-5 border border-border">
      <ZoomableSVG><svg viewBox="0 0 600 400" className="w-full h-auto" role="img" aria-label="Schematic of the chest in cross-section showing two defibrillation pads, a heart, and the current pathway. Approximately 4% of delivered current traverses the heart.">
        {/* Chest cross-section schematic */}
        <text x="300" y="22" textAnchor="middle" className="fill-foreground text-[13px] font-bold">Current Pathway Through the Chest</text>
        
        {/* Chest outline */}
        <ellipse cx="300" cy="130" rx="140" ry="90" fill="hsl(var(--secondary)/0.2)" stroke="hsl(var(--border))" strokeWidth="2" />
        
        {/* Heart */}
        <ellipse cx="300" cy="130" rx="35" ry="30" fill="hsl(var(--destructive)/0.2)" stroke="hsl(var(--destructive))" strokeWidth="2" />
        <text x="300" y="134" textAnchor="middle" className="fill-destructive text-[10px] font-bold">Heart</text>

        {/* Pads */}
        <rect x="155" y="80" width="40" height="20" rx="4" fill="hsl(var(--primary))" stroke="hsl(var(--border))" strokeWidth="0.75" />
        <text x="175" y="94" textAnchor="middle" fill="hsl(var(--background))" className="text-[8px] font-bold">PAD</text>
        <rect x="405" y="130" width="40" height="20" rx="4" fill="hsl(var(--primary))" stroke="hsl(var(--border))" strokeWidth="0.75" />
        <text x="425" y="144" textAnchor="middle" fill="hsl(var(--background))" className="text-[8px] font-bold">PAD</text>

        {/* Current path with travelling pulse */}
        <path id="def-currentPath" d="M 195 90 Q 250 100, 265 120 L 335 140 Q 370 145, 405 140" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="4" />
        <circle r="3" fill="hsl(var(--primary))">
          <animateMotion dur="1.4s" repeatCount="indefinite">
            <mpath href="#def-currentPath" />
          </animateMotion>
        </circle>
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
      </svg></ZoomableSVG>
    </div>
  </div>
);

const PacemakerDiagram = () => (
  <div className="space-y-4">
    <h4 className="font-semibold text-foreground">Pacemaker Modes (NBG Code)</h4>
    <div className="bg-secondary/30 rounded-xl p-5 border border-border">
      <ZoomableSVG><svg viewBox="0 0 600 480" className="w-full h-auto" role="img" aria-label="Five-position NASPE-BPEG generic pacemaker code with explanations and a list of common pacing modes including VVI, AAI, DDD, and asynchronous VOO/DOO with magnet application.">
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
      </svg></ZoomableSVG>
    </div>
  </div>
);

const EMIDiagram = () => (
  <div className="space-y-4">
    <h4 className="font-semibold text-foreground">Electromagnetic Interference & Perioperative Safety</h4>
    <div className="bg-secondary/30 rounded-xl p-5 border border-border">
      <ZoomableSVG><svg viewBox="0 0 600 500" className="w-full h-auto" role="img" aria-label="Sources of electromagnetic interference in the operating theatre and a three-phase pre, intra and post-operative management plan for patients with cardiac implantable electronic devices.">
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
      </svg></ZoomableSVG>
    </div>
  </div>
);

const DefibrillationPacingDiagram = () => {
  const [activeTab, setActiveTab] = useState<Tab>("waveforms");

  return (
    <DiagramFigure
      id="defibrillation-pacing-diagram"
      title="Defibrillation pacing"
      description="Auto-generated wrapper for the Defibrillation pacing anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
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
  
        {activeTab === "waveforms" && (
          <>
            <WaveformsDiagram />
            <WorkedExampleCallout
              title="Capacitor energy in a defibrillator"
              scenario="A 32 µF capacitor is charged to 5,000 V before discharge across a patient with VF."
              numbers="E = ½CV² = 0.5 × 32 × 10⁻⁶ × (5,000)² = 400 J stored. With transthoracic impedance ~75 Ω, only ~4% reaches the myocardium. Biphasic devices then use impedance compensation to deliver a consistent transmyocardial current."
              takeaway="Selected energy on the front panel (e.g. 200 J) is what the device delivers into a 50 Ω test load — only a small fraction reaches the heart, which is why pad contact, expiration phase and gel pads matter so much."
            />
            <DiagramLearningPoints
              anchorId="waveforms"
              anchorLabel="Defibrillation Waveforms"
              points={[
                "Stored energy E = ½CV²; delivered energy depends on transthoracic impedance.",
                "Monophasic (MDS): single polarity, up to 360 J for VF — largely superseded.",
                "Biphasic (BTE / RLB): 120–200 J, equal/superior efficacy, less myocardial damage.",
                "Biphasic devices auto-compensate for impedance — delivered current is more consistent.",
              ]}
              sources={[
                {
                  label: "RCUK ALS 2021",
                  citation:
                    "Soar J, Böttiger BW, Carli P et al. Resuscitation Council UK / European Resuscitation Council Guidelines 2021: Adult advanced life support. Resuscitation. 2021;161:115–151 — defibrillation waveforms and energy levels.",
                  url: "https://doi.org/10.1016/j.resuscitation.2021.02.010",
                },
                {
                  label: "BJA Educ 2018",
                  citation:
                    "Marsch S, Tschan F, Semmer NK et al. Defibrillation: physical and biological basis (review). Anaesthesia & Intensive Care Medicine. 2018;19(11):572–576.",
                },
              ]}
            />
          </>
        )}
        {activeTab === "impedance" && (
          <>
            <ImpedanceDiagram />
            <WorkedExampleCallout
              title="Reducing TTI at the bedside"
              scenario="A hairy-chested adult arrests in the resus bay. Initial 200 J biphasic shock fails to terminate VF."
              numbers="Manoeuvres that drop TTI: shave the chest under the pads, apply firm 25 lb pressure, deliver during expiration, ensure conductive gel pads, and use the largest adult pads available. Each repeated shock also lowers TTI as tissue conductivity rises."
              takeaway="Before escalating energy, optimise pad contact — a 20–30% drop in TTI translates directly into a higher transmyocardial current at the same selected energy."
            />
            <DiagramLearningPoints
              anchorId="tti"
              anchorLabel="Transthoracic Impedance"
              points={[
                "Typical TTI 70–80 Ω (range 15–150 Ω); only ~4% of current crosses the myocardium.",
                "↑ TTI: obesity, COPD/hyperinflation, hairy chest, small/poor-contact pads.",
                "↓ TTI: gel pads, 25 lb pressure, expiration, larger pads, repeated shocks.",
                "Anterolateral pad position (R sternal edge + L mid-axillary) is standard.",
              ]}
              sources={[
                {
                  label: "RCUK ALS 2021",
                  citation:
                    "Soar J et al. Resuscitation Council UK / ERC Guidelines 2021: Adult advanced life support. Resuscitation. 2021;161:115–151 — pad placement, TTI minimisation.",
                  url: "https://doi.org/10.1016/j.resuscitation.2021.02.010",
                },
                {
                  label: "Deakin & Nolan 2005",
                  citation:
                    "Deakin CD, Nolan JP. European Resuscitation Council guidelines for resuscitation 2005. Section 3: Electrical therapies. Resuscitation. 2005;67(Suppl 1):S25–37 — physics of transthoracic impedance.",
                  url: "https://doi.org/10.1016/j.resuscitation.2005.10.008",
                },
              ]}
            />
          </>
        )}
        {activeTab === "pacemaker" && (
          <>
            <PacemakerDiagram />
            <WorkedExampleCallout
              title="Magnet over a DDD pacemaker"
              scenario="A 78-year-old DDD-paced for complete heart block is listed for laparoscopic cholecystectomy with monopolar diathermy."
              numbers="A magnet placed over the generator typically converts the device to DOO (dual-chamber asynchronous) at a fixed magnet rate — sensing is disabled, eliminating the risk of EMI-induced inhibition. The magnet rate also indicates battery status (rate falls as the battery depletes)."
              takeaway="DDD → DOO via magnet is safe for diathermy in a pacing-dependent patient — but always interrogate the device pre-op to confirm the magnet response, and re-interrogate post-op to confirm settings are unchanged."
            />
            <DiagramLearningPoints
              anchorId="pacing-modes"
              anchorLabel="Pacemaker Modes"
              points={[
                "NBG code (5 positions): paced / sensed / response / rate-modulation / multisite.",
                "VVI = ventricular demand; AAI requires intact AV conduction; DDD is most physiological.",
                "VOO/DOO = asynchronous (no sensing) — magnet response in most pacemakers.",
                "Magnet rate also reflects battery status (falls as battery depletes).",
              ]}
              sources={[
                {
                  label: "AAGBI/MHRA 2022",
                  citation:
                    "Thomas H, Plummer C, Wright IJ, Foley P, Turley AJ. Guidelines for the perioperative management of people with cardiac implantable electronic devices. Anaesthesia. 2022;77(7):808–817.",
                  url: "https://doi.org/10.1111/anae.15728",
                },
                {
                  label: "BJA Educ 2016",
                  citation:
                    "Diprose P, Pierce JMT. Anaesthesia for patients with pacemakers and similar devices. BJA Education. 2001;1(6):166–170 — NBG code and magnet response.",
                  url: "https://doi.org/10.1093/bjacepd/1.6.166",
                },
              ]}
            />
          </>
        )}
        {activeTab === "emi" && (
          <>
            <EMIDiagram />
            <WorkedExampleCallout
              title="ICD patient for elective surgery"
              scenario="A 65-year-old with an ICD for ischaemic cardiomyopathy is listed for inguinal hernia repair under GA with monopolar diathermy."
              numbers="Pre-op: interrogate the device, document anti-tachy zones. Intra-op: apply external defib pads BEFORE disabling anti-tachy therapies (magnet OR reprogramming). Use bipolar diathermy where possible; monopolar in <5 s bursts with the return pad on the thigh so the current vector avoids the generator. Post-op: re-enable anti-tachy therapies before leaving recovery."
              takeaway="Disabling an ICD without external defib pads in place is unsafe — the patient is unprotected from VT/VF until the ICD is reactivated."
            />
            <DiagramLearningPoints
              anchorId="emi"
              anchorLabel="Electromagnetic Interference"
              points={[
                "Diathermy is the commonest source of EMI; bipolar > monopolar for safety.",
                "Pacemaker EMI risks: inappropriate inhibition or inappropriate ventricular tracking.",
                "ICDs: disable anti-tachy therapies intra-op (magnet or reprogramme) — only after external pads are on.",
                "Re-interrogate every CIED post-op before discharge from recovery.",
              ]}
              sources={[
                {
                  label: "AAGBI 2022",
                  citation:
                    "Thomas H et al. Guidelines for the perioperative management of people with cardiac implantable electronic devices. Anaesthesia. 2022;77(7):808–817 — EMI mitigation, ICD management.",
                  url: "https://doi.org/10.1111/anae.15728",
                },
                {
                  label: "MHRA 2014",
                  citation:
                    "MHRA. Guidance on the management of patients with cardiac implantable electronic devices undergoing surgery. Medical Device Alert MDA/2014/018. UK Government; 2014.",
                  url: "https://www.gov.uk/drug-device-alerts",
                },
              ]}
            />
          </>
        )}
      </div>
    </DiagramFigure>
  );
};

export default DefibrillationPacingDiagram;
