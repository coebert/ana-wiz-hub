import { useState, useEffect } from "react";

type Scenario = "normal" | "ndmr" | "sux" | "neostigmine" | "sugammadex";

interface ScenarioInfo {
  id: Scenario;
  label: string;
  color: string;
  description: string;
  detail: string;
}

const scenarios: ScenarioInfo[] = [
  {
    id: "normal", label: "Normal Transmission", color: "hsl(170 50% 40%)",
    description: "ACh is released from vesicles, crosses the synaptic cleft, and binds to both α subunits of the nicotinic AChR (α₂βδε). The channel opens, allowing Na⁺ influx → end-plate potential → muscle AP → contraction. AChE rapidly hydrolyses ACh into choline + acetate.",
    detail: "Each nAChR requires 2 ACh molecules (one per α subunit) for channel opening. ~5 million receptors at each NMJ. Safety margin: only ~25% receptors need to be occupied for normal transmission (75% must be blocked before clinical weakness).",
  },
  {
    id: "ndmr", label: "Non-Depolarising Block", color: "hsl(0 60% 50%)",
    description: "Non-depolarising agents (rocuronium, vecuronium, atracurium, cisatracurium) are competitive antagonists. They bind to one or both α subunits of the nAChR WITHOUT opening the channel. This prevents ACh from binding → no depolarisation → flaccid paralysis.",
    detail: "Competitive block: characterised by TOF fade (T4/T1 <1), post-tetanic potentiation, and reversal by anticholinesterases. Margin of safety means >75% receptor occupancy needed for clinical block, >95% for complete block. Onset is slower at the diaphragm (high blood flow, large safety margin).",
  },
  {
    id: "sux", label: "Depolarising Block (Sux)", color: "hsl(30 70% 50%)",
    description: "Suxamethonium (two ACh molecules joined) binds both α subunits and OPENS the channel — initial depolarisation causes fasciculations. But unlike ACh, suxamethonium is not hydrolysed by AChE. Persistent depolarisation → Na⁺ channel inactivation → desensitisation block (Phase I).",
    detail: "Phase I: no fade on TOF, no PTP. Phase II (prolonged/repeated dosing): receptor conformational change → resembles non-depolarising block (fade, PTP, reversible by anticholinesterases). Sux is metabolised by plasma cholinesterase in the blood, NOT at the NMJ.",
  },
  {
    id: "neostigmine", label: "Neostigmine Reversal", color: "hsl(150 55% 40%)",
    description: "Neostigmine is a reversible anticholinesterase — it inhibits AChE at the NMJ. This prevents ACh hydrolysis → ACh accumulates in the cleft → increased [ACh] competitively displaces NDMR from the α subunits → channel reopens → transmission restored.",
    detail: "Must co-administer glycopyrrolate (or atropine) to block muscarinic effects of excess ACh elsewhere (bradycardia, salivation, bronchospasm, ↑gut motility). Ceiling effect: once AChE is fully inhibited, more neostigmine provides no additional benefit. Cannot reverse deep block (TOF count <2). Dose: 50 μg/kg (max 5mg).",
  },
  {
    id: "sugammadex", label: "Sugammadex Reversal", color: "hsl(270 55% 55%)",
    description: "Sugammadex is a modified γ-cyclodextrin — a ring of 8 sugar molecules forming a truncated cone with a lipophilic cavity. It encapsulates rocuronium (and to a lesser extent vecuronium) in a tight 1:1 inclusion complex in the plasma. This creates a concentration gradient that draws rocuronium away from the NMJ back into the plasma, where it is immediately trapped. The nAChR α subunits are freed → normal ACh binding resumes → transmission restored.",
    detail: "Dosing: 2 mg/kg (moderate block, TOF ≥2), 4 mg/kg (deep block, PTC ≥1), 16 mg/kg (immediate reversal — rescue from CICV). Unlike neostigmine: no muscarinic side effects, no ceiling effect, can reverse profound block. Binds OCP steroids → advise additional contraception for 7 days. Does NOT reverse benzylisoquinoliniums or suxamethonium. Sugammadex–rocuronium complex is renally excreted unchanged.",
  },
];

export const NMBAMechanismDiagram = () => {
  const [scenario, setScenario] = useState<Scenario>("normal");
  const [frame, setFrame] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setFrame(f => (f + 1) % 200), 35);
    return () => clearInterval(id);
  }, [playing]);

  const info = scenarios.find(s => s.id === scenario)!;
  const progress = frame / 200; // 0→1

  // Receptor positions
  const receptors = [130, 185, 240, 295, 350];
  // α subunit label positions (two per receptor)
  const alphaOffsets = [-5, 5];

  // Animation helpers
  const sugammadexActive = scenario === "sugammadex";
  const achVisible = scenario === "normal" || scenario === "neostigmine" || (sugammadexActive && progress > 0.5);
  const achCount = scenario === "neostigmine" ? 12 : 6;
  const ndmrBound = scenario === "ndmr" || (sugammadexActive && progress < 0.3);
  const suxBound = scenario === "sux";
  const neostigmineActive = scenario === "neostigmine";
  const channelOpen = (scenario === "normal" || scenario === "neostigmine") && progress > 0.3 && progress < 0.75;
  const sugChannelOpen = sugammadexActive && progress > 0.55 && progress < 0.85;
  const suxChannelOpen = scenario === "sux" && progress < 0.35;
  const fasciculations = scenario === "sux" && progress < 0.35;
  const desensitised = scenario === "sux" && progress >= 0.35;
  // Sugammadex: rocuronium molecules being pulled off receptors
  const _sugEncapsulating = sugammadexActive && progress > 0.15 && progress < 0.55;
  const sugComplete = sugammadexActive && progress >= 0.55;

  return (
        <div className="space-y-4">
      {/* Scenario selector */}
      <div className="flex flex-wrap gap-2">
        {scenarios.map(s => (
          <button key={s.id} onClick={() => { setScenario(s.id); setFrame(0); setPlaying(true); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              scenario === s.id ? "bg-primary/15 border-primary/40 text-primary" : "bg-secondary/50 border-border text-muted-foreground hover:bg-secondary"
            }`}>{s.label}</button>
        ))}
      </div>

      <svg viewBox="0 0 500 420" className="w-full" role="img" aria-label={`NMJ diagram: ${info.label}`}>
        <defs>
          <marker id="nmbaArr" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
            <path d="M0,0 L6,2 L0,4" fill="hsl(var(--muted-foreground))" opacity="0.5" />
          </marker>
        </defs>

        {/* ===== NERVE TERMINAL ===== */}
        <rect x={80} y={30} width={340} height={100} rx={14}
          fill="hsl(210 60% 94%)" stroke="hsl(210 70% 45%)" strokeWidth="1.5" />
        <text x={250} y={22} textAnchor="middle" fontSize="10" fill="hsl(var(--foreground))" fontWeight="600">Pre-synaptic Nerve Terminal</text>

        {/* Vesicles */}
        {[140, 190, 250, 310, 350].map((cx, i) => {
          const releasing = achVisible && progress > 0.15 && progress < 0.6;
          const cy = releasing ? 95 + Math.min((progress - 0.15) * 120, 30) : 85;
          const op = releasing && progress > 0.35 ? 0.4 : 0.9;
          return (
            <g key={`v-${i}`}>
              <circle cx={cx} cy={cy} r={13} fill="hsl(170 50% 75%)" stroke="hsl(170 50% 40%)" strokeWidth="1" opacity={op} />
              <circle cx={cx - 3} cy={cy - 1} r={2} fill="hsl(170 50% 40%)" opacity={op * 0.7} />
              <circle cx={cx + 3} cy={cy + 2} r={2} fill="hsl(170 50% 40%)" opacity={op * 0.7} />
            </g>
          );
        })}
        <text x={435} y={80} fontSize="7.5" fill="hsl(var(--muted-foreground))">ACh</text>
        <text x={435} y={90} fontSize="7.5" fill="hsl(var(--muted-foreground))">vesicles</text>

        {/* VGCC */}
        {receptors.map((x, i) => (
          <rect key={`vgcc-${i}`} x={x - 5} y={124} width={10} height={12} rx={2}
            fill="hsl(210 25% 80%)" stroke="hsl(210 25% 55%)" strokeWidth="0.75" />
        ))}
        <text x={435} y={133} fontSize="7" fill="hsl(var(--muted-foreground))">VGCCs</text>

        {/* ===== SYNAPTIC CLEFT ===== */}
        <rect x={80} y={140} width={340} height={65} fill="hsl(45 40% 96%)" stroke="none" />
        <text x={435} y={168} fontSize="8" fill="hsl(var(--muted-foreground))">Synaptic</text>
        <text x={435} y={178} fontSize="8" fill="hsl(var(--muted-foreground))">Cleft</text>

        {/* ACh molecules in cleft */}
        {achVisible && progress > 0.2 && Array.from({ length: achCount }).map((_, i) => {
          const x = 115 + (i % 6) * 50 + Math.sin(i * 2 + frame * 0.08) * 6;
          const yBase = 150 + Math.min((progress - 0.2) * 130, 40);
          const y = yBase + Math.cos(i * 3 + frame * 0.05) * 4;
          const op = progress > 0.75 && !neostigmineActive ? Math.max(0, 1 - (progress - 0.75) * 4) : 0.85;
          return <circle key={`ach-${i}`} cx={x} cy={y} r={3.5}
            fill="hsl(170 55% 45%)" opacity={op} />;
        })}

        {/* AChE enzymes */}
        {receptors.map((x, i) => {
          const inhibited = neostigmineActive;
          return (
            <g key={`ache-${i}`} opacity={0.7}>
              <ellipse cx={x} cy={175} rx={10} ry={6}
                fill={inhibited ? "hsl(150 55% 40%/0.3)" : "hsl(0 55% 50%/0.15)"}
                stroke={inhibited ? "hsl(150 55% 40%)" : "hsl(0 55% 50%)"}
                strokeWidth="0.75" />
              <text x={x} y={178} textAnchor="middle" fontSize="5.5"
                fill={inhibited ? "hsl(150 55% 40%)" : "hsl(0 55% 50%)"} fontWeight="600">AChE</text>
              {inhibited && (
                <g>
                  <line x1={x - 8} y1={170} x2={x + 8} y2={180} stroke="hsl(150 55% 40%)" strokeWidth="1.5" />
                  <line x1={x - 8} y1={180} x2={x + 8} y2={170} stroke="hsl(150 55% 40%)" strokeWidth="1.5" />
                </g>
              )}
            </g>
          );
        })}

        {/* Neostigmine molecules */}
        {neostigmineActive && progress > 0.1 && receptors.map((x, i) => (
          <g key={`neo-${i}`} opacity={Math.min((progress - 0.1) * 3, 0.9)}>
            <rect x={x - 7} y={166} width={14} height={8} rx={2}
              fill="hsl(150 55% 40%)" fillOpacity="0.3" stroke="hsl(150 55% 40%)" strokeWidth="0.75" />
            <text x={x} y={173} textAnchor="middle" fontSize="4" fill="hsl(150 55% 40%)" fontWeight="600">Neo</text>
          </g>
        ))}

        {/* ===== MOTOR END PLATE ===== */}
        {/* Junctional folds */}
        <path d={`M 80 205 ${receptors.map(x => `L ${x - 15} 205 L ${x - 8} 215 L ${x} 200 L ${x + 8} 215 L ${x + 15} 205`).join(" ")} L 420 205 L 420 320 L 80 320 Z`}
          fill="hsl(340 40% 96%)" stroke="hsl(340 55% 50%)" strokeWidth="1.5" />
        <text x={250} y={315} textAnchor="middle" fontSize="10" fill="hsl(var(--foreground))" fontWeight="600">Motor End Plate (Post-synaptic)</text>

        {/* nAChR receptors with α subunits */}
        {receptors.map((x, i) => {
          const open = (channelOpen && i < Math.ceil(progress * 5)) || (suxChannelOpen && i < Math.ceil(progress * 8)) || (sugChannelOpen && i < Math.ceil((progress - 0.55) * 16));
          const blocked = ndmrBound;
          const desens = desensitised;

          const fillColor = open || sugChannelOpen ? "hsl(170 55% 65%)"
            : blocked ? "hsl(0 55% 85%)"
            : desens ? "hsl(30 30% 80%)"
            : sugComplete ? "hsl(340 30% 88%)"
            : "hsl(340 30% 88%)";
          const strokeColor = open || sugChannelOpen ? "hsl(170 55% 35%)"
            : blocked ? "hsl(0 55% 50%)"
            : desens ? "hsl(30 30% 50%)"
            : "hsl(340 30% 55%)";

          return (
            <g key={`rcpt-${i}`}>
              {/* Receptor body */}
              <rect x={x - 12} y={195} width={24} height={30} rx={4}
                fill={fillColor} stroke={strokeColor} strokeWidth="1.5" />

              {/* α subunit labels */}
              {alphaOffsets.map((dx, j) => (
                <g key={`alpha-${i}-${j}`}>
                  <circle cx={x + dx * 2.5} cy={198} r={4}
                    fill={blocked ? "hsl(0 60% 50%)" : suxBound ? "hsl(30 70% 50%)" : neostigmineActive && progress > 0.4 ? "hsl(170 55% 45%)" : "hsl(260 40% 65%)"}
                    fillOpacity={0.3}
                    stroke={blocked ? "hsl(0 60% 50%)" : suxBound ? "hsl(30 70% 50%)" : "hsl(260 40% 65%)"}
                    strokeWidth="0.75" />
                  <text x={x + dx * 2.5} y={200} textAnchor="middle" fontSize="5"
                    fill={blocked ? "hsl(0 60% 50%)" : suxBound ? "hsl(30 70% 50%)" : "hsl(260 40% 55%)"} fontWeight="700">α</text>
                </g>
              ))}

              {/* Channel pore */}
              <line x1={x} y1={200} x2={x} y2={222}
                stroke={strokeColor}
                strokeWidth={open || suxChannelOpen || sugChannelOpen ? 3 : 1}
                opacity={open || suxChannelOpen || sugChannelOpen ? 0.9 : 0.4} />

              {/* Na⁺ flow indicator */}
              {(open || (suxChannelOpen && i < 4) || sugChannelOpen) && (
                <text x={x} y={232} textAnchor="middle" fontSize="6" fill="hsl(170 55% 35%)" fontWeight="600">Na⁺↓</text>
              )}

              {/* NDMR bound molecules */}
              {blocked && (
                <g>
                  <rect x={x - 10} y={192} width={8} height={6} rx={1.5}
                    fill="hsl(0 60% 50%)" fillOpacity="0.5" stroke="hsl(0 60% 50%)" strokeWidth="0.5">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
                  </rect>
                  <rect x={x + 2} y={192} width={8} height={6} rx={1.5}
                    fill="hsl(0 60% 50%)" fillOpacity="0.5" stroke="hsl(0 60% 50%)" strokeWidth="0.5">
                    <animate attributeName="opacity" values="0.7;1;0.7" dur="2s" repeatCount="indefinite" />
                  </rect>
                </g>
              )}

              {/* Sux bound */}
              {suxBound && (
                <g>
                  <rect x={x - 10} y={192} width={20} height={6} rx={1.5}
                    fill="hsl(30 70% 50%)" fillOpacity="0.5" stroke="hsl(30 70% 50%)" strokeWidth="0.5">
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="1.5s" repeatCount="indefinite" />
                  </rect>
                </g>
              )}

              {/* Desensitised label */}
              {desens && i === 2 && (
                <text x={x} y={242} textAnchor="middle" fontSize="5.5" fill="hsl(30 40% 45%)" fontWeight="600">desensitised</text>
              )}
            </g>
          );
        })}

        {/* Receptor label */}
        <text x={435} y={210} fontSize="7.5" fill="hsl(var(--muted-foreground))">nAChR</text>
        <text x={435} y={220} fontSize="6" fill="hsl(var(--muted-foreground))">(α₂βδε)</text>

        {/* ===== SUGAMMADEX ENCAPSULATION ===== */}
        {sugammadexActive && receptors.map((x, i) => {
          // Rocuronium leaves receptor and floats up into cleft where sugammadex ring captures it
          const encapProgress = Math.max(0, Math.min(1, (progress - 0.15 - i * 0.06) / 0.25));
          const rocY = 192 - encapProgress * 40; // floats up from receptor
          const showRing = encapProgress > 0.5;
          const captured = encapProgress >= 1;
          // After capture, complex drifts upward
          const driftY = captured ? rocY - Math.min((progress - 0.4) * 60, 30) : rocY;
          if (encapProgress <= 0) return null;
          return (
                <g key={`sug-${i}`} opacity={Math.min(encapProgress * 2, 1)}>
              {/* Rocuronium molecule leaving receptor */}
              <rect x={x - 5} y={driftY} width={10} height={6} rx={1.5}
                fill="hsl(0 60% 50%)" fillOpacity={captured ? 0.7 : 0.5} stroke="hsl(0 60% 50%)" strokeWidth="0.5" />
              <text x={x} y={driftY + 4.5} textAnchor="middle" fontSize="3.5" fill="hsl(0 60% 50%)" fontWeight="700">Roc</text>
              {/* Sugammadex cyclodextrin ring */}
              {showRing && (
                <g>
                  <circle cx={x} cy={driftY + 3} r={10}
                    fill="hsl(270 55% 55%/0.15)" stroke="hsl(270 55% 55%)" strokeWidth={captured ? 1.5 : 1}
                    strokeDasharray={captured ? "0" : "3 2"}>
                    {!captured && <animate attributeName="r" values="10;12;10" dur="1s" repeatCount="indefinite" />}
                  </circle>
                  {/* Cone shape hint — inner ring */}
                  {captured && (
                    <circle cx={x} cy={driftY + 3} r={6}
                      fill="none" stroke="hsl(270 55% 55%)" strokeWidth="0.5" opacity="0.4" />
                  )}
                  <text x={x} y={driftY - 10} textAnchor="middle" fontSize="4" fill="hsl(270 55% 55%)" fontWeight="600">
                    {captured ? "Sug–Roc" : "Sug"}
                  </text>
                </g>
              )}
            </g>
  );
        })}

        {/* Concentration gradient arrow */}
        {sugammadexActive && progress > 0.2 && progress < 0.6 && (
          <g opacity={0.5}>
            <text x={440} y={155} fontSize="5.5" fill="hsl(270 55% 55%)" fontWeight="600">Concentration</text>
            <text x={440} y={164} fontSize="5.5" fill="hsl(270 55% 55%)" fontWeight="600">gradient</text>
            <line x1={460} y1={200} x2={460} y2={170} stroke="hsl(270 55% 55%)" strokeWidth="1" markerEnd="url(#nmbaArr)" />
          </g>
        )}

        {/* ===== MUSCLE FIBRE ===== */}
        <rect x={80} y={330} width={340} height={40} rx={8}
          fill={fasciculations ? `hsl(30 60% ${88 + Math.sin(frame * 0.5) * 5}%)` : (channelOpen || sugChannelOpen || (neostigmineActive && progress > 0.4)) ? "hsl(170 40% 88%)" : "hsl(210 10% 94%)"}
          stroke="hsl(210 10% 70%)" strokeWidth="1" />
        <text x={250} y={355} textAnchor="middle" fontSize="9" fill="hsl(var(--foreground))" fontWeight="500">
          {fasciculations ? "⚡ Fasciculations → Contraction" :
           desensitised ? "No Contraction (Desensitised)" :
           channelOpen ? "✓ Contraction" :
           sugChannelOpen ? "✓ Contraction Restored" :
           ndmrBound ? "✗ No Contraction (Blocked)" :
           neostigmineActive && progress > 0.4 ? "✓ Contraction Restored" :
           sugComplete ? "✓ Contraction Restored" :
           "Muscle Fibre (Resting)"}
        </text>

        {/* ===== SCENARIO-SPECIFIC ANNOTATIONS ===== */}
        {/* Safety margin annotation for NDMR */}
        {ndmrBound && (
          <g opacity="0.6">
            <rect x={80} y={380} width={340} height={30} rx={4} fill="hsl(0 50% 50%/0.05)" stroke="hsl(0 50% 50%)" strokeWidth="0.5" />
            <text x={250} y={393} textAnchor="middle" fontSize="6.5" fill="hsl(0 50% 50%)" fontWeight="600">
              &gt;75% receptor occupancy for clinical weakness • &gt;95% for complete block
            </text>
            <text x={250} y={404} textAnchor="middle" fontSize="5.5" fill="hsl(0 40% 50%)">
              Competitive block: TOF fade, post-tetanic potentiation, reversible by ↑[ACh]
            </text>
          </g>
        )}

        {/* Phase I/II for Sux */}
        {suxBound && (
          <g opacity="0.6">
            <rect x={80} y={380} width={165} height={30} rx={4} fill="hsl(30 60% 50%/0.05)" stroke="hsl(30 60% 50%)" strokeWidth="0.5" />
            <text x={162} y={393} textAnchor="middle" fontSize="6" fill="hsl(30 60% 50%)" fontWeight="600">Phase I (Depolarising)</text>
            <text x={162} y={403} textAnchor="middle" fontSize="5" fill="hsl(30 50% 50%)">No fade, no PTP</text>
            <rect x={255} y={380} width={165} height={30} rx={4} fill="hsl(0 50% 50%/0.05)" stroke="hsl(0 50% 50%)" strokeWidth="0.5" />
            <text x={337} y={393} textAnchor="middle" fontSize="6" fill="hsl(0 50% 50%)" fontWeight="600">Phase II (Prolonged)</text>
            <text x={337} y={403} textAnchor="middle" fontSize="5" fill="hsl(0 40% 50%)">Fade + PTP (like NDMR)</text>
          </g>
        )}

        {/* Neostigmine mechanism */}
        {neostigmineActive && (
          <g opacity="0.6">
            <rect x={80} y={380} width={340} height={30} rx={4} fill="hsl(150 50% 40%/0.05)" stroke="hsl(150 50% 40%)" strokeWidth="0.5" />
            <text x={250} y={393} textAnchor="middle" fontSize="6.5" fill="hsl(150 50% 40%)" fontWeight="600">
              AChE inhibited → ↑[ACh] → competitively displaces NDMR from α subunits
            </text>
            <text x={250} y={404} textAnchor="middle" fontSize="5.5" fill="hsl(150 40% 40%)">
              Must co-administer glycopyrrolate (antimuscarinic) • Ceiling effect at full AChE inhibition • Max dose 5mg
            </text>
          </g>
        )}

        {/* Sugammadex mechanism */}
        {sugammadexActive && (
          <g opacity="0.6">
            <rect x={80} y={380} width={340} height={30} rx={4} fill="hsl(270 50% 55%/0.05)" stroke="hsl(270 50% 55%)" strokeWidth="0.5" />
            <text x={250} y={393} textAnchor="middle" fontSize="6.5" fill="hsl(270 50% 55%)" fontWeight="600">
              γ-cyclodextrin encapsulates rocuronium → concentration gradient pulls Roc from NMJ
            </text>
            <text x={250} y={404} textAnchor="middle" fontSize="5.5" fill="hsl(270 40% 50%)">
              2mg/kg (TOF≥2) • 4mg/kg (PTC≥1) • 16mg/kg (immediate/rescue) • No muscarinic effects • Renal excretion
            </text>
          </g>
        )}

        {/* Normal transmission */}
        {scenario === "normal" && (
          <g opacity="0.5">
            <rect x={80} y={380} width={340} height={25} rx={4} fill="hsl(170 40% 40%/0.05)" stroke="hsl(170 40% 40%)" strokeWidth="0.5" />
            <text x={250} y={396} textAnchor="middle" fontSize="6" fill="hsl(170 40% 40%)" fontWeight="600">
              Safety margin: ~75% receptors can be blocked before clinical weakness
            </text>
          </g>
        )}
      </svg>

      {/* Play/pause */}
      <div className="flex justify-center">
        <button onClick={() => setPlaying(!playing)}
          className="px-4 py-1.5 rounded-lg text-sm font-medium border border-border text-foreground hover:bg-muted transition-colors">
          {playing ? "⏸ Pause" : "▶ Play"}
        </button>
      </div>

      {/* Info panel */}
      <div className="rounded-lg border border-border bg-secondary/30 p-4" key={scenario}>
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: info.color }} />
          <h4 className="text-sm font-semibold text-foreground">{info.label}</h4>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{info.description}</p>
        <p className="text-xs text-muted-foreground mt-2 border-t border-border pt-2">
          <span className="font-semibold text-foreground/80">Clinical: </span>{info.detail}
        </p>
      </div>
    </div>
  );
};
