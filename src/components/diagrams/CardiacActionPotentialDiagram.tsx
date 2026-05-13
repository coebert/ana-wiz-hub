import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

type CellType = "contractile" | "pacemaker";

interface Phase {
  id: number;
  name: string;
  contractile: { ions: string; mechanism: string; duration: string };
  pacemaker: { ions: string; mechanism: string; duration: string };
  color: string;
}

const phases: Phase[] = [
  {
    id: 0,
    name: "Phase 0 — Rapid Depolarisation",
    contractile: { ions: "Na⁺ influx (fast Na⁺ channels)", mechanism: "Voltage-gated Na⁺ channels open at −70 mV threshold → rapid upstroke to +20 mV", duration: "1–2 ms" },
    pacemaker: { ions: "Ca²⁺ influx (L-type Ca²⁺ channels)", mechanism: "Slow upstroke via L-type Ca²⁺ channels (no fast Na⁺ channels) → peak ~+10 mV", duration: "~50 ms" },
    color: "hsl(0, 80%, 60%)",
  },
  {
    id: 1,
    name: "Phase 1 — Early Repolarisation",
    contractile: { ions: "K⁺ efflux (Ito — transient outward)", mechanism: "Brief K⁺ efflux creates notch, Na⁺ channels inactivate", duration: "~10 ms" },
    pacemaker: { ions: "—", mechanism: "Phase 1 is absent in pacemaker cells", duration: "—" },
    color: "hsl(30, 80%, 55%)",
  },
  {
    id: 2,
    name: "Phase 2 — Plateau",
    contractile: { ions: "Ca²⁺ influx (L-type) balanced by K⁺ efflux (IKr, IKs)", mechanism: "Plateau at ~0 mV; Ca²⁺ triggers excitation-contraction coupling. Duration determines refractory period", duration: "~200 ms" },
    pacemaker: { ions: "—", mechanism: "Phase 2 is absent in pacemaker cells — repolarisation begins immediately", duration: "—" },
    color: "hsl(45, 80%, 50%)",
  },
  {
    id: 3,
    name: "Phase 3 — Repolarisation",
    contractile: { ions: "K⁺ efflux (IKr, IKs, IK1)", mechanism: "Ca²⁺ channels inactivate; sustained K⁺ efflux returns membrane to −90 mV", duration: "~100 ms" },
    pacemaker: { ions: "K⁺ efflux (IKr)", mechanism: "Delayed rectifier K⁺ efflux repolarises to −60 mV (maximum diastolic potential)", duration: "~100 ms" },
    color: "hsl(210, 80%, 55%)",
  },
  {
    id: 4,
    name: "Phase 4 — Resting / Pacemaker Potential",
    contractile: { ions: "K⁺ leak (IK1)", mechanism: "Stable resting potential at −90 mV maintained by inward rectifier K⁺ channels (IK1)", duration: "Until next stimulus" },
    pacemaker: { ions: "If (funny current, Na⁺/K⁺), ICa-T, ICa-L", mechanism: "Spontaneous depolarisation from −60 to −40 mV via If current → automaticity. No stable resting potential", duration: "~400 ms (determines HR)" },
    color: "hsl(150, 60%, 45%)",
  },
];

interface Drug {
  class: string;
  name: string;
  mechanism: string;
  effect: string;
  phases: number[];
  examples: string;
  ecgEffect: string;
}

const vaughanWilliams: Drug[] = [
  { class: "Ia", name: "Na⁺ channel blockers (intermediate)", mechanism: "Block fast Na⁺ channels, prolong AP duration", effect: "↓ Phase 0 upstroke, ↑ QT", phases: [0], examples: "Procainamide, Quinidine, Disopyramide", ecgEffect: "↑ QRS, ↑ QT" },
  { class: "Ib", name: "Na⁺ channel blockers (fast)", mechanism: "Block fast Na⁺ channels, shorten AP duration", effect: "↓ Phase 0 in ischaemic tissue", phases: [0], examples: "Lidocaine, Mexiletine", ecgEffect: "Minimal change / ↓ QT" },
  { class: "Ic", name: "Na⁺ channel blockers (slow)", mechanism: "Potent Na⁺ channel blockade, slow conduction", effect: "Marked ↓ Phase 0 upstroke", phases: [0], examples: "Flecainide, Propafenone", ecgEffect: "↑↑ QRS" },
  { class: "II", name: "β-blockers", mechanism: "Block β₁-adrenoceptors → ↓ cAMP → ↓ If and ICa-L", effect: "↓ Phase 4 slope (pacemaker), ↓ HR, ↓ conduction", phases: [4], examples: "Atenolol, Metoprolol, Esmolol, Propranolol", ecgEffect: "↓ HR, ↑ PR" },
  { class: "III", name: "K⁺ channel blockers", mechanism: "Block IKr/IKs → prolong repolarisation and refractory period", effect: "↑ Phase 3 duration, ↑ ERP", phases: [3], examples: "Amiodarone, Sotalol, Dronedarone", ecgEffect: "↑ QT" },
  { class: "IV", name: "Ca²⁺ channel blockers", mechanism: "Block L-type Ca²⁺ channels → ↓ Phase 0 (pacemaker) and Phase 2 (contractile)", effect: "↓ Pacemaker Phase 0, ↓ AV conduction", phases: [0, 2], examples: "Verapamil, Diltiazem", ecgEffect: "↓ HR, ↑ PR" },
];

const ContractileAPSvg = ({ selectedPhase, onSelectPhase }: { selectedPhase: number | null; onSelectPhase: (p: number) => void }) => {
  const w = 440, h = 260;
  // Improved waveform with more realistic proportions:
  // Phase 0: rapid upstroke (~1-2ms) — very steep
  // Phase 1: brief notch (~10ms) 
  // Phase 2: long plateau (~200ms) — largest portion
  // Phase 3: repolarisation (~100ms) — gradual curve
  // Phase 4: resting potential

  const phaseRegions = [
    { id: 0, x1: 55, x2: 72 },    // rapid depolarisation
    { id: 1, x1: 72, x2: 90 },    // early repolarisation  
    { id: 2, x1: 90, x2: 260 },   // plateau (longest phase)
    { id: 3, x1: 260, x2: 340 },  // repolarisation
    { id: 4, x1: 340, x2: 420 },  // resting
  ];

  // More anatomically accurate action potential shape
  const fullPath = "M 20,210 L 55,210 L 60,35 Q 68,28 72,35 Q 76,55 82,65 Q 86,70 90,68 Q 140,60 200,62 Q 240,64 260,72 Q 290,130 320,190 Q 330,205 340,210 L 420,210";

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-md mx-auto">
      <text x={10} y={15} fontSize="11" fill="currentColor" className="font-semibold">Contractile Cell (Ventricular Myocyte)</text>
      {/* Y axis labels */}
      <text x={5} y={40} fontSize="9" fill="currentColor" opacity={0.6}>+20</text>
      <text x={5} y={100} fontSize="9" fill="currentColor" opacity={0.6}>0</text>
      <text x={5} y={215} fontSize="9" fill="currentColor" opacity={0.6}>−90</text>
      {/* Axes */}
      <line x1={25} y1={25} x2={25} y2={225} stroke="currentColor" opacity={0.2} />
      <line x1={25} y1={225} x2={430} y2={225} stroke="currentColor" opacity={0.2} />
      {/* Threshold line */}
      <line x1={25} y1={172} x2={430} y2={172} stroke="currentColor" opacity={0.1} strokeDasharray="4,4" />
      <text x={432} y={175} fontSize="7" fill="currentColor" opacity={0.4}>−70 mV</text>
      {/* 0 mV reference */}
      <line x1={25} y1={100} x2={430} y2={100} stroke="currentColor" opacity={0.06} strokeDasharray="2,6" />

      {/* Phase highlight regions */}
      {phaseRegions.map(r => (
        <rect
          key={r.id}
          x={r.x1} y={20} width={r.x2 - r.x1} height={215}
          fill={selectedPhase === r.id ? phases[r.id].color : "transparent"}
          opacity={selectedPhase === r.id ? 0.15 : 0}
          rx={4}
          className="cursor-pointer transition-all"
          onClick={() => onSelectPhase(r.id)}
        />
      ))}

      {/* AP waveform — thicker with gradient feel */}
      <path d={fullPath} fill="none" stroke="hsl(var(--primary))" strokeWidth={2} strokeLinejoin="round" />
      
      {/* Phase duration indicators */}
      <g opacity={0.4} fontSize="6" fill="currentColor">
        <text x={63} y={248}>~2ms</text>
        <text x={150} y={248}>~200ms</text>
        <text x={285} y={248}>~100ms</text>
      </g>
      <line x1={55} y1={240} x2={72} y2={240} stroke="currentColor" opacity={0.2} strokeWidth={1} />
      <line x1={90} y1={240} x2={260} y2={240} stroke="currentColor" opacity={0.2} strokeWidth={1} />
      <line x1={260} y1={240} x2={340} y2={240} stroke="currentColor" opacity={0.2} strokeWidth={1} />

      {/* Phase labels */}
      <text x={60} y={130} fontSize="11" fill="currentColor" fontWeight="bold" className="cursor-pointer" onClick={() => onSelectPhase(0)}>0</text>
      <text x={78} y={55} fontSize="11" fill="currentColor" fontWeight="bold" className="cursor-pointer" onClick={() => onSelectPhase(1)}>1</text>
      <text x={170} y={52} fontSize="11" fill="currentColor" fontWeight="bold" className="cursor-pointer" onClick={() => onSelectPhase(2)}>2</text>
      <text x={305} y={140} fontSize="11" fill="currentColor" fontWeight="bold" className="cursor-pointer" onClick={() => onSelectPhase(3)}>3</text>
      <text x={375} y={205} fontSize="11" fill="currentColor" fontWeight="bold" className="cursor-pointer" onClick={() => onSelectPhase(4)}>4</text>

      {/* Ion current annotations */}
      <g fontSize="7" opacity={0.45} fill="currentColor">
        <text x={50} y={145}>Na⁺↑↑</text>
        <text x={80} y={80}>K⁺(Ito)</text>
        <text x={155} y={80}>Ca²⁺↑ = K⁺↓</text>
        <text x={280} y={155}>K⁺(IKr,IKs)</text>
        <text x={365} y={200}>IK1</text>
      </g>

      {/* ERP/RRP markers */}
      <line x1={55} y1={234} x2={300} y2={234} stroke="hsl(0,70%,55%)" strokeWidth={2} />
      <text x={160} y={232} fontSize="8" fill="hsl(0,70%,55%)" textAnchor="middle">ERP (~250 ms)</text>
      <line x1={300} y1={234} x2={340} y2={234} stroke="hsl(45,70%,55%)" strokeWidth={2} />
      <text x={320} y={232} fontSize="7" fill="hsl(45,70%,55%)" textAnchor="middle">RRP</text>
    </svg>
  );
};

const PacemakerAPSvg = ({ selectedPhase, onSelectPhase }: { selectedPhase: number | null; onSelectPhase: (p: number) => void }) => {
  const w = 440, h = 260;
  // More realistic pacemaker AP — slower upstroke, no plateau, spontaneous Phase 4
  const fullPath = "M 20,175 Q 55,175 80,170 Q 110,160 130,140 Q 145,115 155,80 Q 160,60 162,45 Q 168,55 178,80 Q 195,130 220,170 Q 240,178 260,175 Q 290,172 320,162 Q 340,148 355,125 Q 368,95 375,60";

  const phaseRegions = [
    { id: 4, x1: 15, x2: 140, label: "4", lx: 80, ly: 165 },
    { id: 0, x1: 140, x2: 175, label: "0", lx: 155, ly: 55 },
    { id: 3, x1: 175, x2: 265, label: "3", lx: 215, ly: 140 },
  ];

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-md mx-auto">
      <text x={10} y={15} fontSize="11" fill="currentColor" className="font-semibold">Pacemaker Cell (SA Node)</text>
      <text x={5} y={50} fontSize="9" fill="currentColor" opacity={0.6}>+10</text>
      <text x={5} y={110} fontSize="9" fill="currentColor" opacity={0.6}>−40</text>
      <text x={5} y={180} fontSize="9" fill="currentColor" opacity={0.6}>−60</text>
      <line x1={25} y1={25} x2={25} y2={200} stroke="currentColor" opacity={0.2} />
      <line x1={25} y1={200} x2={430} y2={200} stroke="currentColor" opacity={0.2} />
      {/* Threshold at -40mV */}
      <line x1={25} y1={110} x2={430} y2={110} stroke="currentColor" opacity={0.1} strokeDasharray="4,4" />
      <text x={432} y={113} fontSize="7" fill="currentColor" opacity={0.4}>−40 mV</text>
      {/* MDP line */}
      <line x1={25} y1={175} x2={430} y2={175} stroke="currentColor" opacity={0.06} strokeDasharray="2,6" />
      <text x={432} y={178} fontSize="6" fill="currentColor" opacity={0.3}>MDP</text>

      {phaseRegions.map(r => (
        <rect
          key={r.id}
          x={r.x1} y={20} width={r.x2 - r.x1} height={190}
          fill={selectedPhase === r.id ? phases[r.id].color : "transparent"}
          opacity={selectedPhase === r.id ? 0.15 : 0}
          rx={4}
          className="cursor-pointer transition-all"
          onClick={() => onSelectPhase(r.id)}
        />
      ))}

      <path d={fullPath} fill="none" stroke="hsl(var(--primary))" strokeWidth={2} strokeLinejoin="round" />

      {phaseRegions.map(r => (
        <text key={r.id} x={r.lx} y={r.ly} fontSize="11" fill="currentColor" fontWeight="bold" className="cursor-pointer" onClick={() => onSelectPhase(r.id)}>{r.label}</text>
      ))}

      {/* Ion current annotations — more detailed */}
      <g fontSize="7" opacity={0.5} fill="currentColor">
        <text x={35} y={190}>If (funny current)</text>
        <text x={90} y={155}>ICa-T</text>
        <text x={145} y={35}>ICa-L</text>
        <text x={200} y={110}>IKr</text>
      </g>

      {/* Slope annotation for Phase 4 */}
      <g opacity={0.3}>
        <line x1={40} y1={176} x2={130} y2={145} stroke="currentColor" strokeWidth={0.75} strokeDasharray="3,3" />
        <text x={65} y={155} fontSize="6" fill="currentColor">slope = rate</text>
      </g>
    </svg>
  );
};

const CardiacActionPotentialDiagram = () => {
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);
  const [cellType, setCellType] = useState<CellType>("contractile");

  const phase = selectedPhase !== null ? phases[selectedPhase] : null;
  const detail = phase ? (cellType === "contractile" ? phase.contractile : phase.pacemaker) : null;

  return (
    <div className="space-y-4">
      <Tabs defaultValue="waveforms" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="waveforms">Action Potentials</TabsTrigger>
          <TabsTrigger value="comparison">Comparison</TabsTrigger>
          <TabsTrigger value="drugs">Vaughan-Williams</TabsTrigger>
        </TabsList>

        {/* Tab 1: Waveforms */}
        <TabsContent value="waveforms" className="space-y-4">
          {/* Cell type toggle */}
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => { setCellType("contractile"); setSelectedPhase(null); }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${cellType === "contractile" ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-muted-foreground border-border"}`}
            >
              Contractile Cell
            </button>
            <button
              onClick={() => { setCellType("pacemaker"); setSelectedPhase(null); }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${cellType === "pacemaker" ? "bg-primary text-primary-foreground border-primary" : "bg-muted text-muted-foreground border-border"}`}
            >
              Pacemaker Cell
            </button>
          </div>

          {/* SVG */}
          <div className="bg-muted/30 rounded-lg p-3">
            {cellType === "contractile" ? (
              <ContractileAPSvg selectedPhase={selectedPhase} onSelectPhase={setSelectedPhase} />
            ) : (
              <PacemakerAPSvg selectedPhase={selectedPhase} onSelectPhase={setSelectedPhase} />
            )}
          </div>

          {/* Phase buttons */}
          <div className="flex flex-wrap gap-1.5 justify-center">
            {phases.map(p => {
              const disabled = cellType === "pacemaker" && (p.id === 1 || p.id === 2);
              return (
                <button
                  key={p.id}
                  disabled={disabled}
                  onClick={() => setSelectedPhase(selectedPhase === p.id ? null : p.id)}
                  className={`px-2.5 py-1 rounded text-xs font-medium border transition-colors ${
                    disabled ? "opacity-30 cursor-not-allowed border-border text-muted-foreground" :
                    selectedPhase === p.id ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border hover:bg-accent"
                  }`}
                >
                  Phase {p.id}
                </button>
              );
            })}
          </div>

          {/* Phase detail */}
          {phase && detail && (
            <div className="bg-card border border-border rounded-lg p-4 space-y-2 animate-in fade-in-0 duration-200">
              <h4 className="font-semibold text-sm text-foreground">{phase.name}</h4>
              {detail.ions === "—" ? (
                <p className="text-sm text-muted-foreground italic">{detail.mechanism}</p>
              ) : (
                <>
                  <div className="text-sm"><span className="text-muted-foreground font-medium">Ion currents: </span><span className="text-foreground">{detail.ions}</span></div>
                  <div className="text-sm"><span className="text-muted-foreground font-medium">Mechanism: </span><span className="text-foreground">{detail.mechanism}</span></div>
                  <div className="text-sm"><span className="text-muted-foreground font-medium">Duration: </span><span className="text-foreground">{detail.duration}</span></div>
                </>
              )}
            </div>
          )}
        </TabsContent>

        {/* Tab 2: Comparison table */}
        <TabsContent value="comparison" className="space-y-3">
          <p className="text-sm text-muted-foreground">Key differences between contractile (ventricular) and pacemaker (SA/AV node) cells.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-2 font-medium text-muted-foreground">Feature</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Contractile</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Pacemaker</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  ["Resting potential", "−90 mV (stable)", "−60 mV (unstable)"],
                  ["Phase 0 ion", "Fast Na⁺ channels", "L-type Ca²⁺ channels"],
                  ["Upstroke velocity", "~300 V/s (fast)", "~10 V/s (slow)"],
                  ["Phase 1 & 2", "Present (notch + plateau)", "Absent"],
                  ["Phase 4", "Flat (IK1)", "Spontaneous depolarisation (If)"],
                  ["Automaticity", "No (requires stimulus)", "Yes (intrinsic)"],
                  ["Tetrodotoxin", "Blocks Phase 0", "No effect"],
                  ["Verapamil", "↓ Phase 2 (plateau)", "Blocks Phase 0"],
                  ["AP duration", "~300 ms", "~200 ms"],
                  ["Key clinical role", "Force generation", "Heart rate control"],
                ].map(([feat, c, p], i) => (
                  <tr key={i}>
                    <td className="p-2 font-medium text-foreground">{feat}</td>
                    <td className="p-2 text-foreground/80">{c}</td>
                    <td className="p-2 text-foreground/80">{p}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-muted/40 rounded-lg p-3 space-y-1.5">
            <h4 className="text-sm font-semibold text-foreground">Clinical Relevance</h4>
            <ul className="text-xs text-foreground/80 space-y-1 list-disc list-inside">
              <li><strong>Long refractory period</strong> prevents tetanic contraction of the heart (unlike skeletal muscle)</li>
              <li><strong>If current</strong> is the target of ivabradine — reduces HR without affecting contractility</li>
              <li><strong>Hyperkalaemia</strong> raises resting potential → inactivates Na⁺ channels → widened QRS, risk of VF</li>
              <li><strong>Hypothermia</strong> prolongs AP duration and refractory period → J waves (Osborn waves)</li>
            </ul>
          </div>
        </TabsContent>

        {/* Tab 3: Vaughan-Williams */}
        <TabsContent value="drugs" className="space-y-3">
          <p className="text-sm text-muted-foreground">Vaughan-Williams classification of antiarrhythmic drugs by mechanism and phase affected.</p>
          <div className="space-y-3">
            {vaughanWilliams.map(d => (
              <div key={d.class} className="bg-card border border-border rounded-lg p-3 space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary" className="text-xs">Class {d.class}</Badge>
                  <span className="text-sm font-semibold text-foreground">{d.name}</span>
                  <Badge variant="outline" className="text-[10px]">
                    Phase {d.phases.join(", ")}
                  </Badge>
                </div>
                <p className="text-xs text-foreground/80">{d.mechanism}</p>
                <div className="text-xs"><span className="text-muted-foreground">Examples: </span><span className="text-foreground">{d.examples}</span></div>
                <div className="text-xs"><span className="text-muted-foreground">ECG effect: </span><span className="text-foreground">{d.ecgEffect}</span></div>
              </div>
            ))}
          </div>

          <div className="bg-muted/40 rounded-lg p-3 space-y-1.5">
            <h4 className="text-sm font-semibold text-foreground">Exam High-Yield Points</h4>
            <ul className="text-xs text-foreground/80 space-y-1 list-disc list-inside">
              <li><strong>Amiodarone</strong> has actions across all four classes — unique multi-channel blocker</li>
              <li><strong>Flecainide</strong> is contraindicated post-MI (↑ mortality — CAST trial)</li>
              <li><strong>Sotalol</strong> has both Class II (β-blocker) and Class III (K⁺ blocker) activity</li>
              <li><strong>Adenosine</strong> and <strong>digoxin</strong> are not classified in Vaughan-Williams but act on AV node</li>
              <li><strong>Sicilian Gambit</strong> is the modern alternative framework based on vulnerable parameter</li>
            </ul>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CardiacActionPotentialDiagram;
