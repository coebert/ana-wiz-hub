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
  // SVG contractile action potential waveform
  const w = 400, h = 250;
  const phaseRegions = [
    { id: 0, path: "M 60,200 L 65,30", x1: 55, x2: 70 },
    { id: 1, path: "M 65,30 Q 75,50 80,60", x1: 70, x2: 85 },
    { id: 2, path: "M 80,60 Q 160,55 240,65", x1: 85, x2: 245 },
    { id: 3, path: "M 240,65 Q 280,120 320,200", x1: 245, x2: 325 },
    { id: 4, path: "M 320,200 L 380,200", x1: 325, x2: 385 },
  ];

  const fullPath = "M 20,200 L 60,200 L 65,30 Q 75,50 80,60 Q 160,55 240,65 Q 280,120 320,200 L 380,200";

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-md mx-auto">
      <text x={10} y={15} fontSize="11" fill="currentColor" className="font-semibold">Contractile Cell (Ventricular Myocyte)</text>
      {/* Y axis labels */}
      <text x={5} y={35} fontSize="9" fill="currentColor" opacity={0.6}>+20</text>
      <text x={5} y={100} fontSize="9" fill="currentColor" opacity={0.6}>0</text>
      <text x={5} y={205} fontSize="9" fill="currentColor" opacity={0.6}>−90</text>
      <line x1={25} y1={25} x2={25} y2={220} stroke="currentColor" opacity={0.2} />
      <line x1={25} y1={220} x2={390} y2={220} stroke="currentColor" opacity={0.2} />
      {/* Threshold line */}
      <line x1={25} y1={162} x2={390} y2={162} stroke="currentColor" opacity={0.1} strokeDasharray="4,4" />
      <text x={392} y={165} fontSize="8" fill="currentColor" opacity={0.4}>−70 mV</text>

      {/* Phase highlight regions */}
      {phaseRegions.map(r => (
        <rect
          key={r.id}
          x={r.x1} y={20} width={r.x2 - r.x1} height={210}
          fill={selectedPhase === r.id ? phases[r.id].color : "transparent"}
          opacity={selectedPhase === r.id ? 0.15 : 0}
          rx={4}
          className="cursor-pointer transition-all"
          onClick={() => onSelectPhase(r.id)}
        />
      ))}

      {/* AP waveform */}
      <path d={fullPath} fill="none" stroke="hsl(var(--primary))" strokeWidth={2.5} />

      {/* Phase labels */}
      <text x={58} y={120} fontSize="10" fill="currentColor" fontWeight="bold" className="cursor-pointer" onClick={() => onSelectPhase(0)}>0</text>
      <text x={72} y={50} fontSize="10" fill="currentColor" fontWeight="bold" className="cursor-pointer" onClick={() => onSelectPhase(1)}>1</text>
      <text x={155} y={50} fontSize="10" fill="currentColor" fontWeight="bold" className="cursor-pointer" onClick={() => onSelectPhase(2)}>2</text>
      <text x={290} y={120} fontSize="10" fill="currentColor" fontWeight="bold" className="cursor-pointer" onClick={() => onSelectPhase(3)}>3</text>
      <text x={345} y={195} fontSize="10" fill="currentColor" fontWeight="bold" className="cursor-pointer" onClick={() => onSelectPhase(4)}>4</text>

      {/* ERP/RRP markers */}
      <line x1={60} y1={235} x2={280} y2={235} stroke="hsl(0,70%,55%)" strokeWidth={2} />
      <text x={130} y={248} fontSize="8" fill="hsl(0,70%,55%)" textAnchor="middle">ERP</text>
      <line x1={280} y1={235} x2={320} y2={235} stroke="hsl(45,70%,55%)" strokeWidth={2} />
      <text x={300} y={248} fontSize="8" fill="hsl(45,70%,55%)" textAnchor="middle">RRP</text>
    </svg>
  );
};

const PacemakerAPSvg = ({ selectedPhase, onSelectPhase }: { selectedPhase: number | null; onSelectPhase: (p: number) => void }) => {
  const w = 400, h = 250;
  const fullPath = "M 20,170 Q 80,170 120,100 Q 140,50 150,40 Q 165,50 180,80 Q 220,170 260,170 Q 320,170 360,100";

  const phaseRegions = [
    { id: 4, x1: 15, x2: 125, label: "4", lx: 70, ly: 160 },
    { id: 0, x1: 125, x2: 165, label: "0", lx: 138, ly: 65 },
    { id: 3, x1: 165, x2: 265, label: "3", lx: 210, ly: 110 },
  ];

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-md mx-auto">
      <text x={10} y={15} fontSize="11" fill="currentColor" className="font-semibold">Pacemaker Cell (SA Node)</text>
      <text x={5} y={45} fontSize="9" fill="currentColor" opacity={0.6}>+10</text>
      <text x={5} y={105} fontSize="9" fill="currentColor" opacity={0.6}>−40</text>
      <text x={5} y={175} fontSize="9" fill="currentColor" opacity={0.6}>−60</text>
      <line x1={25} y1={25} x2={25} y2={200} stroke="currentColor" opacity={0.2} />
      <line x1={25} y1={200} x2={390} y2={200} stroke="currentColor" opacity={0.2} />
      {/* Threshold */}
      <line x1={25} y1={100} x2={390} y2={100} stroke="currentColor" opacity={0.1} strokeDasharray="4,4" />
      <text x={392} y={103} fontSize="8" fill="currentColor" opacity={0.4}>−40 mV</text>

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

      <path d={fullPath} fill="none" stroke="hsl(var(--primary))" strokeWidth={2.5} />

      {phaseRegions.map(r => (
        <text key={r.id} x={r.lx} y={r.ly} fontSize="10" fill="currentColor" fontWeight="bold" className="cursor-pointer" onClick={() => onSelectPhase(r.id)}>{r.label}</text>
      ))}

      {/* If current annotation */}
      <text x={60} y={190} fontSize="8" fill="currentColor" opacity={0.5}>If + ICa-T</text>
      <text x={130} y={30} fontSize="8" fill="currentColor" opacity={0.5}>ICa-L</text>
      <text x={195} y={90} fontSize="8" fill="currentColor" opacity={0.5}>IKr</text>
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
