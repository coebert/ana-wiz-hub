import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface DrugClass {
  id: string;
  label: string;
  fullName: string;
  color: string;
  phases: number[];
  mechanism: string;
  effect: string;
  examples: string;
  ecg: string;
}

const drugClasses: DrugClass[] = [
  {
    id: "Ia",
    label: "Ia",
    fullName: "Na⁺ block (intermediate)",
    color: "hsl(0, 75%, 55%)",
    phases: [0],
    mechanism: "Intermediate dissociation from Na⁺ channels; also blocks K⁺ channels → ↑ APD",
    effect: "↓ Phase 0 upstroke velocity, ↑ QRS width, ↑ QT interval",
    examples: "Procainamide, Quinidine, Disopyramide",
    ecg: "Widened QRS + prolonged QT",
  },
  {
    id: "Ib",
    label: "Ib",
    fullName: "Na⁺ block (fast)",
    color: "hsl(15, 80%, 50%)",
    phases: [0],
    mechanism: "Fast dissociation — selective for inactivated Na⁺ channels in ischaemic tissue; ↓ APD",
    effect: "Minimal effect on normal tissue; ↓ Phase 0 in depolarised/ischaemic cells",
    examples: "Lidocaine, Mexiletine, Phenytoin",
    ecg: "Minimal change / slight ↓ QT",
  },
  {
    id: "Ic",
    label: "Ic",
    fullName: "Na⁺ block (slow)",
    color: "hsl(30, 85%, 50%)",
    phases: [0],
    mechanism: "Slow dissociation — potent, use-dependent Na⁺ blockade; no change in APD",
    effect: "Marked ↓ Phase 0 upstroke; marked slowing of conduction",
    examples: "Flecainide, Propafenone",
    ecg: "Markedly widened QRS",
  },
  {
    id: "II",
    label: "II",
    fullName: "β-adrenoceptor blockers",
    color: "hsl(210, 80%, 55%)",
    phases: [4],
    mechanism: "Block β₁ receptors → ↓ cAMP → ↓ If current slope and ↓ ICa-L",
    effect: "↓ Phase 4 slope in pacemaker cells → ↓ automaticity and ↓ AV conduction",
    examples: "Atenolol, Metoprolol, Esmolol, Bisoprolol",
    ecg: "↓ Heart rate, ↑ PR interval",
  },
  {
    id: "III",
    label: "III",
    fullName: "K⁺ channel blockers",
    color: "hsl(270, 70%, 55%)",
    phases: [3],
    mechanism: "Block IKr/IKs → delay repolarisation → ↑ APD and ERP",
    effect: "Prolonged Phase 3 → ↑ refractory period → terminates re-entry circuits",
    examples: "Amiodarone, Sotalol, Dronedarone",
    ecg: "Prolonged QT interval",
  },
  {
    id: "IV",
    label: "IV",
    fullName: "L-type Ca²⁺ channel blockers",
    color: "hsl(160, 70%, 40%)",
    phases: [0, 2],
    mechanism: "Block L-type Ca²⁺ channels → ↓ Phase 0 in pacemaker cells; ↓ Phase 2 plateau in contractile cells",
    effect: "↓ SA node automaticity, ↓ AV conduction velocity, ↓ contractility",
    examples: "Verapamil, Diltiazem",
    ecg: "↓ Heart rate, ↑ PR interval",
  },
];

const phaseInfo: Record<number, { name: string; ion: string }> = {
  0: { name: "Rapid Depolarisation", ion: "Na⁺ influx (fast channels)" },
  1: { name: "Early Repolarisation", ion: "K⁺ efflux (Ito)" },
  2: { name: "Plateau", ion: "Ca²⁺ in / K⁺ out balance" },
  3: { name: "Repolarisation", ion: "K⁺ efflux (IKr, IKs)" },
  4: { name: "Resting Potential", ion: "K⁺ leak (IK1) / If in pacemaker" },
};

const VaughanWilliamsAPDiagram = () => {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const selected = selectedClass ? drugClasses.find((d) => d.id === selectedClass) : null;

  const w = 500, h = 300;

  // Phase boundaries (x coords on the SVG)
  const phaseX = {
    0: { x1: 80, x2: 95 },
    1: { x1: 95, x2: 115 },
    2: { x1: 115, x2: 300 },
    3: { x1: 300, x2: 400 },
    4: { x1: 400, x2: 480 },
  };

  // Highlighted phases for selected drug class
  const highlightedPhases = selected ? selected.phases : [];

  // Annotation positions for each drug class bracket
  const classAnnotations: Record<string, { phases: number[]; y: number; label: string }> = {
    Ia: { phases: [0], y: 265, label: "Class Ia — Na⁺ block (intermediate)" },
    Ib: { phases: [0], y: 278, label: "Class Ib — Na⁺ block (fast)" },
    Ic: { phases: [0], y: 291, label: "Class Ic — Na⁺ block (slow)" },
    II: { phases: [4], y: 265, label: "Class II — β-blockers" },
    III: { phases: [3], y: 265, label: "Class III — K⁺ block" },
    IV: { phases: [0, 2], y: 278, label: "Class IV — Ca²⁺ block" },
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground text-center">
        Click a drug class to see where it acts on the cardiac action potential
      </p>

      {/* Drug class selector pills */}
      <div className="flex flex-wrap gap-2 justify-center">
        {drugClasses.map((dc) => (
          <button
            key={dc.id}
            onClick={() => setSelectedClass(selectedClass === dc.id ? null : dc.id)}
            className="px-3 py-1.5 rounded-full text-xs font-semibold border-2 transition-all duration-200"
            style={{
              borderColor: dc.color,
              backgroundColor: selectedClass === dc.id ? dc.color : "transparent",
              color: selectedClass === dc.id ? "white" : dc.color,
            }}
          >
            Class {dc.label}
          </button>
        ))}
      </div>

      {/* SVG Action Potential Diagram */}
      <div className="bg-muted/30 rounded-lg p-2 overflow-x-auto">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-xl mx-auto" style={{ minWidth: 360 }}>
          {/* Axes */}
          <line x1={50} y1={20} x2={50} y2={240} stroke="currentColor" opacity={0.3} strokeWidth={1} />
          <line x1={50} y1={240} x2={490} y2={240} stroke="currentColor" opacity={0.3} strokeWidth={1} />
          {/* Y-axis labels */}
          <text x={8} y={48} fontSize="9" fill="currentColor" opacity={0.5}>+20 mV</text>
          <text x={8} y={130} fontSize="9" fill="currentColor" opacity={0.5}>0 mV</text>
          <text x={8} y={228} fontSize="9" fill="currentColor" opacity={0.5}>−90 mV</text>
          {/* Y-axis label */}
          <text x={4} y={140} fontSize="9" fill="currentColor" opacity={0.4} transform="rotate(-90, 4, 140)" textAnchor="middle">Membrane Potential</text>
          {/* X-axis label */}
          <text x={270} y={252} fontSize="9" fill="currentColor" opacity={0.4} textAnchor="middle">Time</text>

          {/* Threshold line */}
          <line x1={50} y1={185} x2={490} y2={185} stroke="currentColor" opacity={0.08} strokeDasharray="4,4" />
          <text x={492} y={188} fontSize="7" fill="currentColor" opacity={0.3}>−70 mV</text>

          {/* Phase highlight regions */}
          {[0, 1, 2, 3, 4].map((p) => {
            const region = phaseX[p as keyof typeof phaseX];
            const isHighlighted = highlightedPhases.includes(p);
            return (
              <rect
                key={p}
                x={region.x1}
                y={20}
                width={region.x2 - region.x1}
                height={220}
                fill={isHighlighted && selected ? selected.color : "currentColor"}
                opacity={isHighlighted ? 0.15 : 0.02}
                rx={3}
                className="transition-opacity duration-300"
              />
            );
          })}

          {/* Action potential waveform — contractile cell */}
          <path
            d="M 50,225 L 80,225 L 88,40 Q 95,55 100,75 Q 105,80 115,80 Q 200,76 300,85 Q 340,140 400,225 L 480,225"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth={2.5}
            strokeLinejoin="round"
          />

          {/* Phase number labels on the waveform */}
          <text x={82} y={135} fontSize="13" fill="currentColor" fontWeight="bold" opacity={0.7}>0</text>
          <text x={102} y={68} fontSize="13" fill="currentColor" fontWeight="bold" opacity={0.7}>1</text>
          <text x={200} y={68} fontSize="13" fill="currentColor" fontWeight="bold" opacity={0.7}>2</text>
          <text x={355} y={145} fontSize="13" fill="currentColor" fontWeight="bold" opacity={0.7}>3</text>
          <text x={435} y={218} fontSize="13" fill="currentColor" fontWeight="bold" opacity={0.7}>4</text>

          {/* Ion current labels */}
          <text x={70} y={155} fontSize="7" fill="currentColor" opacity={0.45}>Na⁺ ↑</text>
          <text x={105} y={95} fontSize="7" fill="currentColor" opacity={0.45}>K⁺ (Ito)</text>
          <text x={185} y={95} fontSize="7" fill="currentColor" opacity={0.45}>Ca²⁺ ↑ / K⁺ ↓</text>
          <text x={330} y={160} fontSize="7" fill="currentColor" opacity={0.45}>K⁺ (IKr/IKs)</text>
          <text x={425} y={235} fontSize="7" fill="currentColor" opacity={0.45}>IK1</text>

          {/* ERP / RRP markers */}
          <line x1={80} y1={255} x2={350} y2={255} stroke="hsl(0,60%,50%)" strokeWidth={2} opacity={0.6} />
          <text x={180} y={262} fontSize="8" fill="hsl(0,60%,50%)" textAnchor="middle" opacity={0.7}>ERP</text>
          <line x1={350} y1={255} x2={400} y2={255} stroke="hsl(45,60%,50%)" strokeWidth={2} opacity={0.6} />
          <text x={375} y={262} fontSize="8" fill="hsl(45,60%,50%)" textAnchor="middle" opacity={0.7}>RRP</text>

          {/* Drug class annotation brackets — show all, highlight selected */}
          {Object.entries(classAnnotations).map(([cls, ann]) => {
            const isActive = selectedClass === cls;
            const dc = drugClasses.find((d) => d.id === cls)!;
            // Get the span of all target phases
            const minX = Math.min(...ann.phases.map((p) => phaseX[p as keyof typeof phaseX].x1));
            const maxX = Math.max(...ann.phases.map((p) => phaseX[p as keyof typeof phaseX].x2));
            const midX = (minX + maxX) / 2;
            const bracketY = ann.y;

            return (
              <g
                key={cls}
                opacity={selectedClass === null ? 0.5 : isActive ? 1 : 0.15}
                className="transition-opacity duration-300 cursor-pointer"
                onClick={() => setSelectedClass(selectedClass === cls ? null : cls)}
              >
                {/* Bracket line */}
                <line x1={minX + 2} y1={bracketY} x2={maxX - 2} y2={bracketY} stroke={dc.color} strokeWidth={2} />
                <line x1={minX + 2} y1={bracketY - 4} x2={minX + 2} y2={bracketY + 1} stroke={dc.color} strokeWidth={1.5} />
                <line x1={maxX - 2} y1={bracketY - 4} x2={maxX - 2} y2={bracketY + 1} stroke={dc.color} strokeWidth={1.5} />
                {/* Label */}
                <text x={midX} y={bracketY + 10} fontSize="7" fill={dc.color} textAnchor="middle" fontWeight={isActive ? "bold" : "normal"}>
                  {ann.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Detail panel for selected class */}
      {selected && (
        <div
          className="border rounded-lg p-4 space-y-2 animate-in fade-in-0 slide-in-from-bottom-2 duration-200"
          style={{ borderColor: selected.color + "66" }}
        >
          <div className="flex items-center gap-2 flex-wrap">
            <Badge
              className="text-xs font-bold text-white"
              style={{ backgroundColor: selected.color }}
            >
              Class {selected.id}
            </Badge>
            <span className="text-sm font-semibold text-foreground">{selected.fullName}</span>
            <Badge variant="outline" className="text-[10px]">
              Phase {selected.phases.join(" & ")}
            </Badge>
          </div>

          <div className="grid gap-2 text-sm">
            <div>
              <span className="text-muted-foreground font-medium">Target phases: </span>
              {selected.phases.map((p) => (
                <span key={p} className="text-foreground">
                  Phase {p} ({phaseInfo[p].name} — {phaseInfo[p].ion})
                  {selected.phases.length > 1 && p !== selected.phases[selected.phases.length - 1] ? " + " : ""}
                </span>
              ))}
            </div>
            <div>
              <span className="text-muted-foreground font-medium">Mechanism: </span>
              <span className="text-foreground">{selected.mechanism}</span>
            </div>
            <div>
              <span className="text-muted-foreground font-medium">Effect: </span>
              <span className="text-foreground">{selected.effect}</span>
            </div>
            <div>
              <span className="text-muted-foreground font-medium">Examples: </span>
              <span className="text-foreground">{selected.examples}</span>
            </div>
            <div>
              <span className="text-muted-foreground font-medium">ECG changes: </span>
              <span className="text-foreground">{selected.ecg}</span>
            </div>
          </div>
        </div>
      )}

      {!selected && (
        <p className="text-xs text-muted-foreground text-center italic">
          Select a drug class above to see its mechanism, target phase, and clinical effects
        </p>
      )}
    </div>
  );
};

export default VaughanWilliamsAPDiagram;
