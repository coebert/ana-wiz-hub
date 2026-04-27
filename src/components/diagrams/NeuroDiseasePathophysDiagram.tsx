import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HotspotLayer, HotspotHint, type HotspotDef } from "./HotspotLayer";

type Condition = "mg" | "epilepsy" | "ms" | "pd" | "mnd" | "md" | "sci";

const conditions: { id: Condition; label: string; tagline: string }[] = [
  { id: "mg", label: "Myasthenia gravis", tagline: "Anti-AChR antibodies block postsynaptic nicotinic receptors" },
  { id: "epilepsy", label: "Epilepsy", tagline: "Imbalance: excess glutamate excitation vs deficient GABA inhibition" },
  { id: "ms", label: "Multiple sclerosis", tagline: "Autoimmune demyelination of CNS axons → conduction failure" },
  { id: "pd", label: "Parkinson's disease", tagline: "Loss of nigrostriatal dopamine → basal-ganglia output imbalance" },
  { id: "mnd", label: "Motor neuron disease", tagline: "Upper + lower motor neuron degeneration → denervation supersensitivity" },
  { id: "md", label: "Muscular dystrophies", tagline: "Dystrophin/membrane defect → fragile sarcolemma, leaky to K⁺/CK" },
  { id: "sci", label: "Spinal cord injury", tagline: "Loss of supraspinal inhibition → unmodulated reflex arcs below lesion" },
];

const NeuroDiseasePathophysDiagram = () => {
  const [active, setActive] = useState<Condition>("mg");
  const meta = conditions.find((c) => c.id === active)!;

  return (
    <div className="rounded-lg border border-border bg-card p-4 space-y-3">
      <div>
        <h3 className="font-semibold text-foreground mb-1">Pathophysiology of neurological co-existing disease</h3>
        <p className="text-xs text-muted-foreground">
          Select a condition to see the cellular/anatomical lesion driving its anaesthetic implications.
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {conditions.map((c) => (
          <Button
            key={c.id}
            size="sm"
            variant={active === c.id ? "default" : "outline"}
            onClick={() => setActive(c.id)}
            className="text-xs h-7"
          >
            {c.label}
          </Button>
        ))}
      </div>

      <div className="rounded-md border border-border bg-background p-3 overflow-x-auto">
        <svg viewBox="0 0 460 250" className="w-full h-auto min-w-[420px]" role="img" aria-label={`${meta.label} pathophysiology`}>
          {active === "mg" && <MGDiagram />}
          {active === "epilepsy" && <EpilepsyDiagram />}
          {active === "ms" && <MSDiagram />}
          {active === "pd" && <PDDiagram />}
          {active === "mnd" && <MNDDiagram />}
          {active === "md" && <MDDiagram />}
          {active === "sci" && <SCIDiagram />}
        </svg>
      </div>

      <div className="rounded-md border border-border bg-muted/40 p-3 text-sm">
        <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">{meta.label}</p>
        <p className="text-muted-foreground">{meta.tagline}</p>
      </div>
    </div>
  );
};

/* ---------- Individual SVG diagrams ---------- */

const labelClass = "fill-foreground";
const subClass = "fill-muted-foreground";

const MGDiagram = () => (
  <g>
    {/* Presynaptic terminal */}
    <path d="M 30 60 Q 80 30 140 60 L 140 110 Q 80 130 30 110 Z" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" strokeWidth="1" />
    <text x="85" y="55" textAnchor="middle" fontSize="9" fontWeight="600" className={labelClass}>Motor nerve terminal</text>
    {/* ACh vesicles */}
    {[50, 75, 100, 120].map((x, i) => (
      <circle key={i} cx={x} cy={85} r="5" fill="hsl(var(--clinical))" />
    ))}
    {/* ACh in cleft */}
    {[60, 85, 110].map((x, i) => (
      <circle key={i} cx={x} cy={140} r="3" fill="hsl(var(--clinical))" />
    ))}
    <text x="85" y="160" textAnchor="middle" fontSize="7.5" className={subClass}>ACh released normally</text>
    {/* Postsynaptic muscle membrane with reduced receptors */}
    <rect x="20" y="170" width="160" height="40" fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
    {/* Few remaining receptors */}
    <rect x="40" y="165" width="10" height="12" fill="hsl(var(--primary))" />
    <rect x="120" y="165" width="10" height="12" fill="hsl(var(--primary))" />
    {/* Antibody-blocked receptors */}
    {[60, 80, 100, 140].map((x, i) => (
      <g key={i}>
        <rect x={x} y={165} width="10" height="12" fill="hsl(var(--destructive) / 0.4)" stroke="hsl(var(--destructive))" />
        <path d={`M ${x - 2} 158 L ${x + 12} 158`} stroke="hsl(var(--destructive))" strokeWidth="1.4" />
      </g>
    ))}
    <text x="100" y="225" textAnchor="middle" fontSize="8" className={labelClass}>Postsynaptic muscle membrane</text>
    <text x="100" y="237" textAnchor="middle" fontSize="7" className={subClass}>↓ functional nicotinic AChR (autoantibodies + complement)</text>

    {/* Right side: anti-AChR Ab */}
    <g transform="translate(260 50)">
      <text x="90" y="0" textAnchor="middle" fontSize="9" fontWeight="600" className={labelClass}>Autoantibodies</text>
      {[0, 25, 50].map((dy, i) => (
        <g key={i} transform={`translate(0 ${20 + dy})`}>
          <path d="M 0 0 L 12 -8 L 24 0 L 12 8 Z" fill="hsl(var(--destructive) / 0.3)" stroke="hsl(var(--destructive))" />
          <text x="35" y="3" fontSize="7.5" className={subClass}>Anti-AChR IgG</text>
        </g>
      ))}
      <text x="90" y="115" textAnchor="middle" fontSize="8" fontWeight="600" className="fill-destructive">Result</text>
      <text x="90" y="128" textAnchor="middle" fontSize="7.5" className={subClass}>↑ sensitivity to non-depolarising NMBAs</text>
      <text x="90" y="140" textAnchor="middle" fontSize="7.5" className={subClass}>resistance to suxamethonium (↑ ED₉₅)</text>
      <text x="90" y="152" textAnchor="middle" fontSize="7.5" className={subClass}>fatigable weakness on repeated stimulation</text>
    </g>
  </g>
);

const EpilepsyDiagram = () => (
  <g>
    {/* Two neurons: glutamatergic (excit) and GABAergic (inhib) onto pyramidal cell */}
    <text x="230" y="20" textAnchor="middle" fontSize="10" fontWeight="600" className={labelClass}>
      Imbalance of excitation vs inhibition → seizure focus
    </text>

    {/* Excitatory neuron */}
    <circle cx="80" cy="80" r="22" fill="hsl(var(--destructive) / 0.18)" stroke="hsl(var(--destructive))" />
    <text x="80" y="83" textAnchor="middle" fontSize="8" className={labelClass}>Glu</text>
    <line x1="100" y1="90" x2="200" y2="135" stroke="hsl(var(--destructive))" strokeWidth="2" markerEnd="url(#exc-arrow)" />
    <text x="140" y="105" fontSize="7.5" className={subClass}>↑↑ glutamate (NMDA/AMPA)</text>

    {/* Inhibitory neuron */}
    <circle cx="80" cy="180" r="22" fill="hsl(var(--primary) / 0.18)" stroke="hsl(var(--primary))" />
    <text x="80" y="183" textAnchor="middle" fontSize="8" className={labelClass}>GABA</text>
    <line x1="100" y1="170" x2="200" y2="155" stroke="hsl(var(--primary))" strokeWidth="2" strokeDasharray="3 3" />
    <circle cx="200" cy="155" r="3" fill="hsl(var(--primary))" />
    <text x="140" y="195" fontSize="7.5" className={subClass}>↓ GABAergic inhibition</text>

    {/* Pyramidal target neuron */}
    <circle cx="240" cy="145" r="28" fill="hsl(var(--clinical) / 0.18)" stroke="hsl(var(--clinical))" />
    <text x="240" y="143" textAnchor="middle" fontSize="8" fontWeight="600" className={labelClass}>Pyramidal</text>
    <text x="240" y="155" textAnchor="middle" fontSize="7" className={subClass}>cortical neuron</text>

    {/* Burst output */}
    <path d="M 270 130 L 290 120 L 295 140 L 310 125 L 320 145 L 340 130 L 350 150" fill="none" stroke="hsl(var(--destructive))" strokeWidth="1.8" />
    <text x="310" y="170" fontSize="8" fontWeight="600" className="fill-destructive">Hypersynchronous firing</text>

    {/* Right column: drug effects */}
    <g transform="translate(370 70)">
      <text x="0" y="0" fontSize="8" fontWeight="600" className={labelClass}>Anaesthetic targets</text>
      <text x="0" y="14" fontSize="7" className={subClass}>↑ GABA: propofol, thiopentone</text>
      <text x="0" y="26" fontSize="7" className={subClass}>↓ NMDA: ketamine (mixed)</text>
      <text x="0" y="38" fontSize="7" className={subClass}>↓ Na⁺ channels: phenytoin</text>
      <text x="0" y="56" fontSize="8" fontWeight="600" className="fill-destructive">Avoid:</text>
      <text x="0" y="68" fontSize="7" className={subClass}>enflurane, tramadol, pethidine</text>
    </g>

    <defs>
      <marker id="exc-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--destructive))" />
      </marker>
    </defs>
  </g>
);

const MSDiagram = () => (
  <g>
    <text x="230" y="20" textAnchor="middle" fontSize="10" fontWeight="600" className={labelClass}>
      Autoimmune demyelination of CNS axons
    </text>

    {/* Healthy axon (top) */}
    <text x="60" y="55" fontSize="8" fontWeight="600" className={labelClass}>Normal axon</text>
    <line x1="60" y1="80" x2="400" y2="80" stroke="hsl(var(--muted-foreground))" strokeWidth="3" />
    {[80, 140, 200, 260, 320, 380].map((x, i) => (
      <ellipse key={i} cx={x} cy={80} rx="22" ry="9" fill="hsl(var(--clinical) / 0.6)" stroke="hsl(var(--clinical))" />
    ))}
    {/* Saltatory conduction arrows */}
    {[110, 170, 230, 290, 350].map((x, i) => (
      <path key={i} d={`M ${x - 8} 65 Q ${x} 50 ${x + 8} 65`} fill="none" stroke="hsl(var(--primary))" strokeWidth="1.4" markerEnd="url(#con-arrow)" />
    ))}
    <text x="230" y="42" textAnchor="middle" fontSize="7.5" className={subClass}>Fast saltatory conduction (intact myelin)</text>

    {/* Demyelinated axon (bottom) */}
    <text x="60" y="155" fontSize="8" fontWeight="600" className="fill-destructive">MS plaque</text>
    <line x1="60" y1="180" x2="400" y2="180" stroke="hsl(var(--muted-foreground))" strokeWidth="3" />
    {/* Some myelin intact */}
    <ellipse cx="80" cy="180" rx="22" ry="9" fill="hsl(var(--clinical) / 0.6)" stroke="hsl(var(--clinical))" />
    <ellipse cx="380" cy="180" rx="22" ry="9" fill="hsl(var(--clinical) / 0.6)" stroke="hsl(var(--clinical))" />
    {/* Demyelinated stretch with attacking T cells */}
    {[160, 220, 280].map((x, i) => (
      <ellipse key={i} cx={x} cy={180} rx="20" ry="8" fill="hsl(var(--destructive) / 0.25)" stroke="hsl(var(--destructive))" strokeDasharray="2 2" />
    ))}
    {/* Immune cells */}
    {[155, 225, 285].map((x, i) => (
      <g key={i}>
        <circle cx={x} cy={205} r="5" fill="hsl(var(--destructive))" />
        <line x1={x} y1={200} x2={x} y2={189} stroke="hsl(var(--destructive))" strokeWidth="1" />
      </g>
    ))}
    <text x="220" y="225" textAnchor="middle" fontSize="7.5" className={subClass}>T cells, macrophages, anti-myelin Ab</text>
    <text x="220" y="237" textAnchor="middle" fontSize="7.5" className="fill-destructive">→ slowed/blocked conduction; heat-sensitive</text>

    <defs>
      <marker id="con-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--primary))" />
      </marker>
    </defs>
  </g>
);

const PDDiagram = () => (
  <g>
    <text x="230" y="20" textAnchor="middle" fontSize="10" fontWeight="600" className={labelClass}>
      Loss of nigrostriatal dopaminergic neurons
    </text>

    {/* Brain schematic */}
    <ellipse cx="180" cy="135" rx="130" ry="80" fill="hsl(var(--muted) / 0.5)" stroke="hsl(var(--border))" />
    {/* Striatum */}
    <ellipse cx="140" cy="115" rx="32" ry="20" fill="hsl(var(--primary) / 0.25)" stroke="hsl(var(--primary))" />
    <text x="140" y="118" textAnchor="middle" fontSize="8" fontWeight="600" className={labelClass}>Striatum</text>
    {/* Substantia nigra */}
    <ellipse cx="220" cy="170" rx="35" ry="14" fill="hsl(var(--destructive) / 0.25)" stroke="hsl(var(--destructive))" strokeDasharray="3 2" />
    <text x="220" y="173" textAnchor="middle" fontSize="8" fontWeight="600" className={labelClass}>SN pars compacta</text>

    {/* Degenerating dopaminergic projection */}
    <path d="M 200 158 Q 180 140 155 122" fill="none" stroke="hsl(var(--destructive))" strokeWidth="2.5" strokeDasharray="4 3" />
    <text x="155" y="155" fontSize="7.5" className="fill-destructive">↓↓ dopamine</text>

    {/* Lewy body */}
    <circle cx="230" cy="170" r="3" fill="hsl(var(--destructive))" />
    <text x="240" y="168" fontSize="6.5" className={subClass}>α-synuclein (Lewy)</text>

    {/* Output: imbalance */}
    <g transform="translate(340 60)">
      <text x="0" y="0" fontSize="8" fontWeight="600" className={labelClass}>Basal-ganglia output</text>
      <text x="0" y="14" fontSize="7" className={subClass}>↓ direct (D1) pathway</text>
      <text x="0" y="26" fontSize="7" className={subClass}>↑ indirect (D2) pathway</text>
      <text x="0" y="38" fontSize="7" className={subClass}>↑ thalamic inhibition</text>
      <text x="0" y="56" fontSize="8" fontWeight="600" className="fill-destructive">Clinical</text>
      <text x="0" y="68" fontSize="7" className={subClass}>tremor, rigidity, bradykinesia</text>
      <text x="0" y="80" fontSize="7" className={subClass}>autonomic dysfunction, sialorrhoea</text>
      <text x="0" y="100" fontSize="8" fontWeight="600" className={labelClass}>Anaesthesia</text>
      <text x="0" y="112" fontSize="7" className={subClass}>Continue L-DOPA · avoid D2 antagonists</text>
    </g>
  </g>
);

const MNDDiagram = () => (
  <g>
    <text x="230" y="20" textAnchor="middle" fontSize="10" fontWeight="600" className={labelClass}>
      Upper + lower motor neuron degeneration
    </text>

    {/* Cortex */}
    <rect x="40" y="40" width="120" height="30" rx="4" fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
    <text x="100" y="58" textAnchor="middle" fontSize="8" fontWeight="600" className={labelClass}>Motor cortex (UMN)</text>
    {/* UMN with degeneration */}
    <line x1="100" y1="70" x2="100" y2="120" stroke="hsl(var(--destructive))" strokeWidth="2.5" strokeDasharray="4 3" />
    <text x="115" y="100" fontSize="7" className="fill-destructive">UMN loss</text>

    {/* Anterior horn */}
    <ellipse cx="100" cy="140" rx="22" ry="14" fill="hsl(var(--destructive) / 0.2)" stroke="hsl(var(--destructive))" strokeDasharray="3 2" />
    <text x="100" y="143" textAnchor="middle" fontSize="7.5" fontWeight="600" className={labelClass}>Anterior horn (LMN)</text>

    {/* LMN axon to muscle - degenerating */}
    <line x1="122" y1="140" x2="220" y2="140" stroke="hsl(var(--destructive))" strokeWidth="2" strokeDasharray="4 3" />
    <text x="170" y="132" textAnchor="middle" fontSize="7" className="fill-destructive">LMN degeneration</text>

    {/* Muscle with denervation supersensitivity */}
    <rect x="225" y="115" width="90" height="50" rx="4" fill="hsl(var(--clinical) / 0.18)" stroke="hsl(var(--clinical))" />
    <text x="270" y="132" textAnchor="middle" fontSize="8" fontWeight="600" className={labelClass}>Muscle fibre</text>
    {/* Extra-junctional AChRs */}
    {[235, 250, 265, 280, 295, 305].map((x, i) => (
      <rect key={i} x={x} y={150} width="6" height="8" fill="hsl(var(--destructive))" />
    ))}
    <text x="270" y="178" textAnchor="middle" fontSize="7" className={subClass}>↑↑ extra-junctional AChR (denervation supersensitivity)</text>

    {/* Right column */}
    <g transform="translate(335 60)">
      <text x="0" y="0" fontSize="8" fontWeight="600" className="fill-destructive">Anaesthetic risks</text>
      <text x="0" y="14" fontSize="7" className={subClass}>Suxamethonium → lethal K⁺ release</text>
      <text x="0" y="26" fontSize="7" className={subClass}>↑ sensitivity to non-dep NMBAs</text>
      <text x="0" y="38" fontSize="7" className={subClass}>Bulbar weakness → aspiration</text>
      <text x="0" y="50" fontSize="7" className={subClass}>Restrictive ventilation, weak cough</text>
    </g>
  </g>
);

const MDDiagram = () => (
  <g>
    <text x="230" y="20" textAnchor="middle" fontSize="10" fontWeight="600" className={labelClass}>
      Dystrophin / sarcolemmal protein deficiency
    </text>

    {/* Healthy sarcolemma */}
    <text x="115" y="50" textAnchor="middle" fontSize="8" fontWeight="600" className={labelClass}>Normal sarcolemma</text>
    <rect x="30" y="60" width="170" height="20" fill="hsl(var(--clinical) / 0.3)" stroke="hsl(var(--clinical))" />
    <rect x="30" y="80" width="170" height="20" fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
    {/* Dystrophin links */}
    {[50, 80, 110, 140, 170].map((x, i) => (
      <line key={i} x1={x} y1={80} x2={x} y2={100} stroke="hsl(var(--primary))" strokeWidth="2" />
    ))}
    <text x="115" y="115" textAnchor="middle" fontSize="7" className={subClass}>Dystrophin links cytoskeleton ↔ ECM</text>

    {/* Diseased sarcolemma */}
    <text x="115" y="148" textAnchor="middle" fontSize="8" fontWeight="600" className="fill-destructive">Dystrophin-deficient</text>
    <rect x="30" y="158" width="170" height="20" fill="hsl(var(--destructive) / 0.25)" stroke="hsl(var(--destructive))" strokeDasharray="3 2" />
    <rect x="30" y="178" width="170" height="20" fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
    {/* Tears in membrane */}
    {[60, 110, 160].map((x, i) => (
      <path key={i} d={`M ${x - 6} 158 L ${x + 6} 178`} stroke="hsl(var(--destructive))" strokeWidth="1.5" />
    ))}
    {/* K+ leaking out */}
    {[55, 115, 165].map((x, i) => (
      <g key={i}>
        <text x={x} y={150} fontSize="8" fontWeight="700" className="fill-destructive">K⁺</text>
        <path d={`M ${x} 153 L ${x} 145`} stroke="hsl(var(--destructive))" strokeWidth="1" markerEnd="url(#k-arrow)" />
      </g>
    ))}
    {/* CK leaking */}
    <text x="90" y="218" fontSize="7.5" className={subClass}>↑ serum CK · myoglobinuria · rhabdomyolysis risk</text>

    {/* Right column */}
    <g transform="translate(255 50)">
      <text x="0" y="0" fontSize="8" fontWeight="600" className="fill-destructive">Triggers</text>
      <text x="0" y="14" fontSize="7" className={subClass}>Suxamethonium → hyperK⁺, arrest</text>
      <text x="0" y="26" fontSize="7" className={subClass}>Volatiles → MH-like rhabdomyolysis</text>
      <text x="0" y="38" fontSize="7" className={subClass}>(Myotonic DM: cold, neostigmine, sux)</text>
      <text x="0" y="58" fontSize="8" fontWeight="600" className={labelClass}>Associated</text>
      <text x="0" y="70" fontSize="7" className={subClass}>Cardiomyopathy, conduction defects</text>
      <text x="0" y="82" fontSize="7" className={subClass}>Restrictive lung disease (scoliosis)</text>
      <text x="0" y="100" fontSize="8" fontWeight="600" className={labelClass}>Choose</text>
      <text x="0" y="112" fontSize="7" className={subClass}>TIVA · rocuronium + sugammadex</text>
    </g>

    <defs>
      <marker id="k-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--destructive))" />
      </marker>
    </defs>
  </g>
);

const SCIDiagram = () => (
  <g>
    <text x="230" y="20" textAnchor="middle" fontSize="10" fontWeight="600" className={labelClass}>
      Autonomic dysreflexia (lesion ≥ T6)
    </text>

    {/* Spinal cord schematic */}
    <rect x="195" y="40" width="40" height="180" rx="6" fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
    <text x="215" y="55" textAnchor="middle" fontSize="7" className={subClass}>cord</text>

    {/* Lesion line at T6 */}
    <line x1="190" y1="100" x2="240" y2="100" stroke="hsl(var(--destructive))" strokeWidth="3" />
    <text x="245" y="103" fontSize="8" fontWeight="600" className="fill-destructive">T6 lesion</text>
    <text x="245" y="114" fontSize="7" className={subClass}>(supraspinal inhibition LOST)</text>

    {/* Above lesion */}
    <text x="100" y="60" textAnchor="middle" fontSize="8" fontWeight="600" className={labelClass}>Above lesion</text>
    <text x="100" y="74" textAnchor="middle" fontSize="7" className={subClass}>baroreflex intact</text>
    <text x="100" y="86" textAnchor="middle" fontSize="7" className="fill-clinical">flushing, sweating</text>
    <text x="100" y="98" textAnchor="middle" fontSize="7" className="fill-clinical">reflex bradycardia (vagal)</text>
    <path d="M 150 80 Q 175 80 195 90" fill="none" stroke="hsl(var(--clinical))" strokeWidth="1.5" markerEnd="url(#sci-arrow-c)" />

    {/* Below lesion: trigger */}
    <text x="100" y="160" textAnchor="middle" fontSize="8" fontWeight="600" className="fill-destructive">Below lesion</text>
    <text x="100" y="174" textAnchor="middle" fontSize="7" className={subClass}>Trigger:</text>
    <text x="100" y="186" textAnchor="middle" fontSize="7" className={subClass}>bladder/bowel distension,</text>
    <text x="100" y="198" textAnchor="middle" fontSize="7" className={subClass}>skin stim, uterine contraction</text>
    <path d="M 150 180 Q 175 180 195 165" fill="none" stroke="hsl(var(--destructive))" strokeWidth="1.5" markerEnd="url(#sci-arrow-d)" />

    {/* Sympathetic outflow below lesion */}
    <text x="335" y="155" textAnchor="middle" fontSize="8" fontWeight="600" className="fill-destructive">Unchecked</text>
    <text x="335" y="167" textAnchor="middle" fontSize="8" fontWeight="600" className="fill-destructive">sympathetic surge</text>
    <text x="335" y="180" textAnchor="middle" fontSize="7" className={subClass}>vasoconstriction below lesion</text>
    <text x="335" y="192" textAnchor="middle" fontSize="7" className={subClass}>pallor, piloerection</text>
    <path d="M 235 165 Q 270 165 290 165" fill="none" stroke="hsl(var(--destructive))" strokeWidth="1.5" markerEnd="url(#sci-arrow-d)" />

    {/* Result */}
    <rect x="280" y="40" width="160" height="60" rx="4" fill="hsl(var(--destructive) / 0.15)" stroke="hsl(var(--destructive))" />
    <text x="360" y="58" textAnchor="middle" fontSize="8" fontWeight="600" className="fill-destructive">CRISIS</text>
    <text x="360" y="72" textAnchor="middle" fontSize="7" className={subClass}>severe HTN (CVA / MI risk)</text>
    <text x="360" y="84" textAnchor="middle" fontSize="7" className={subClass}>headache, bradycardia</text>
    <text x="360" y="96" textAnchor="middle" fontSize="7" className={subClass}>Rx: sit up, remove trigger, GTN</text>

    <defs>
      <marker id="sci-arrow-c" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--clinical))" />
      </marker>
      <marker id="sci-arrow-d" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--destructive))" />
      </marker>
    </defs>
  </g>
);

export default NeuroDiseasePathophysDiagram;

/* ---------- Per-condition focused diagrams (for inline section use) ---------- */

const Wrap = ({ title, tagline, children }: { title: string; tagline: string; children: React.ReactNode }) => (
  <div className="rounded-lg border border-border bg-card p-3 my-3 not-prose">
    <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1">Pathophysiology — {title}</p>
    <div className="rounded-md border border-border bg-background p-2 overflow-x-auto">
      <svg viewBox="0 0 460 250" className="w-full h-auto min-w-[380px]" role="img" aria-label={`${title} pathophysiology`}>
        {children}
      </svg>
    </div>
    <p className="text-xs text-muted-foreground mt-2">{tagline}</p>
  </div>
);

export const MGPathophysDiagram = () => (
  <Wrap title="Myasthenia gravis" tagline="Anti-AChR antibodies block / cross-link postsynaptic nicotinic receptors → fatigable weakness, ↑ sensitivity to non-depolarising NMBAs.">
    <MGDiagram />
  </Wrap>
);
export const EpilepsyPathophysDiagram = () => (
  <Wrap title="Epilepsy" tagline="Excess glutamatergic excitation with deficient GABAergic inhibition produces hypersynchronous cortical firing.">
    <EpilepsyDiagram />
  </Wrap>
);
export const MSPathophysDiagram = () => (
  <Wrap title="Multiple sclerosis" tagline="T-cell-mediated CNS demyelination → slowed/blocked saltatory conduction; relapse triggered by pyrexia, stress, surgery.">
    <MSDiagram />
  </Wrap>
);
export const PDPathophysDiagram = () => (
  <Wrap title="Parkinson's disease" tagline="Loss of substantia-nigra dopaminergic neurons (α-synuclein Lewy bodies) shifts basal-ganglia output toward thalamic inhibition.">
    <PDDiagram />
  </Wrap>
);
export const MNDPathophysDiagram = () => (
  <Wrap title="Motor neuron disease" tagline="Combined UMN + LMN degeneration → denervation supersensitivity (extra-junctional AChRs) → lethal hyperkalaemia with suxamethonium.">
    <MNDDiagram />
  </Wrap>
);
export const MDPathophysDiagram = () => (
  <Wrap title="Muscular dystrophies" tagline="Dystrophin / sarcolemmal protein deficiency → fragile membrane leaks K⁺ and CK, predisposing to rhabdomyolysis with sux/volatiles.">
    <MDDiagram />
  </Wrap>
);
export const SCIPathophysDiagram = () => (
  <Wrap title="Spinal cord injury — autonomic dysreflexia" tagline="Loss of supraspinal inhibition above a T6+ lesion lets noxious stimuli below trigger massive unmodulated sympathetic discharge.">
    <SCIDiagram />
  </Wrap>
);

