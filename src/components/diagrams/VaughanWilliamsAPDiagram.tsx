import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCcw } from "lucide-react";

/* Channel activity windows as fraction of cycle (0..1) for each view */
const contractileChannels: { id: string; label: string; start: number; end: number; color: string }[] = [
  { id: "INa",  label: "INa (fast Na⁺)",       start: 0.06,  end: 0.10, color: "hsl(0, 75%, 55%)" },
  { id: "Ito",  label: "Ito (transient K⁺)",   start: 0.09,  end: 0.15, color: "hsl(30, 85%, 50%)" },
  { id: "ICaL", label: "ICa-L (L-type Ca²⁺)",  start: 0.10,  end: 0.58, color: "hsl(160, 70%, 40%)" },
  { id: "IKr",  label: "IKr/IKs (K⁺ efflux)",  start: 0.55,  end: 0.82, color: "hsl(270, 70%, 55%)" },
  { id: "IK1",  label: "IK1 (resting K⁺)",     start: 0.80,  end: 1.00, color: "hsl(210, 70%, 50%)" },
];

const pacemakerChannels: { id: string; label: string; start: number; end: number; color: string }[] = [
  { id: "If",   label: "If (funny current)",   start: 0.00, end: 0.42, color: "hsl(45, 85%, 50%)" },
  { id: "ICaT", label: "ICa-T (T-type Ca²⁺)",  start: 0.30, end: 0.48, color: "hsl(15, 80%, 50%)" },
  { id: "ICaL", label: "ICa-L (Phase 0)",      start: 0.45, end: 0.62, color: "hsl(160, 70%, 40%)" },
  { id: "IKr",  label: "IKr (repolarisation)", start: 0.58, end: 0.95, color: "hsl(270, 70%, 55%)" },
];

interface DrugClass {
  id: string;
  label: string;
  fullName: string;
  color: string;
  phases: number[];
  pacemakerPhases?: number[];
  blocks: string[]; // channel ids blocked by this drug class
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
    blocks: ["INa", "IKr"],
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
    blocks: ["INa"],
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
    blocks: ["INa"],
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
    pacemakerPhases: [4],
    blocks: ["If", "ICaL"],
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
    blocks: ["IKr"],
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
    pacemakerPhases: [0],
    blocks: ["ICaL"],
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

type ViewMode = "contractile" | "pacemaker";

const VaughanWilliamsAPDiagram = () => {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [view, setView] = useState<ViewMode>("contractile");
  const [time, setTime] = useState(0); // 0..1
  const [playing, setPlaying] = useState(false);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const selected = selectedClass ? drugClasses.find((d) => d.id === selectedClass) : null;

  const cycleMs = 2400;

  useEffect(() => {
    if (!playing) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
      return;
    }
    const tick = (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = ts - lastTsRef.current;
      lastTsRef.current = ts;
      setTime((t) => (t + dt / cycleMs) % 1);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [playing]);

  const channels = view === "contractile" ? contractileChannels : pacemakerChannels;
  const activeChannels = channels.filter((c) => time >= c.start && time <= c.end);

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground text-center">
        Click a drug class to see where it acts — or press play to sweep the timeline and see which channels are open
      </p>

      {/* View toggle */}
      <div className="flex justify-center gap-1 bg-muted/50 rounded-lg p-1 max-w-xs mx-auto">
        <button
          onClick={() => setView("contractile")}
          className={`flex-1 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
            view === "contractile"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Contractile Cell
        </button>
        <button
          onClick={() => setView("pacemaker")}
          className={`flex-1 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
            view === "pacemaker"
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Pacemaker (SA Node)
        </button>
      </div>

      {/* Drug class selector pills */}
      <div className="flex flex-wrap gap-2 justify-center">
        {drugClasses.map((dc) => {
          const relevantInView =
            view === "pacemaker"
              ? dc.pacemakerPhases && dc.pacemakerPhases.length > 0
              : true;
          return (
            <button
              key={dc.id}
              onClick={() => setSelectedClass(selectedClass === dc.id ? null : dc.id)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold border-2 transition-all duration-200"
              style={{
                borderColor: dc.color,
                backgroundColor: selectedClass === dc.id ? dc.color : "transparent",
                color: selectedClass === dc.id ? "white" : dc.color,
                opacity: relevantInView ? 1 : 0.35,
              }}
            >
              Class {dc.label}
            </button>
          );
        })}
      </div>

      {/* Playhead controls */}
      <div className="flex items-center gap-3 max-w-xl mx-auto px-1">
        <button
          onClick={() => setPlaying((p) => !p)}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity shrink-0"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>
        <button
          onClick={() => { setTime(0); setPlaying(false); }}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-muted text-foreground hover:bg-muted/70 transition-colors shrink-0"
          aria-label="Reset"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <input
          type="range"
          min={0}
          max={1000}
          value={Math.round(time * 1000)}
          onChange={(e) => { setTime(Number(e.target.value) / 1000); setPlaying(false); }}
          className="flex-1 accent-primary"
          aria-label="Scrub timeline"
        />
        <span className="text-xs font-mono text-muted-foreground w-14 text-right tabular-nums">
          {(time * cycleMs / 1000).toFixed(2)}s
        </span>
      </div>

      {/* Active channels readout — blocked currents appear suppressed (greyed) */}
      <div className="flex flex-wrap gap-1.5 justify-center min-h-[28px]">
        {channels.map((c) => {
          const active = activeChannels.some((a) => a.id === c.id);
          const blocked = !!selected && selected.blocks.includes(c.id);
          const greyBorder = "hsl(var(--muted-foreground))";
          return (
            <span
              key={c.id}
              className="px-2 py-0.5 rounded text-[10px] font-semibold border transition-all duration-150 relative inline-flex items-center gap-1"
              style={{
                borderColor: blocked ? greyBorder : c.color,
                borderWidth: 1,
                borderStyle: blocked ? "dashed" : "solid",
                backgroundColor: blocked
                  ? (active ? "hsl(var(--muted))" : "transparent")
                  : (active ? c.color : "transparent"),
                color: blocked
                  ? "hsl(var(--muted-foreground))"
                  : (active ? "white" : c.color),
                opacity: blocked ? (active ? 0.55 : 0.35) : (active ? 1 : 0.4),
                textDecoration: blocked ? "line-through" : "none",
                filter: blocked ? "grayscale(1)" : "none",
              }}
              title={blocked ? `Blocked by Class ${selected!.id} — current suppressed` : undefined}
            >
              {blocked && <span aria-hidden className="text-[9px]">⛔</span>}
              {c.label}
            </span>
          );
        })}
      </div>

      {/* Blocking legend */}
      {selected && selected.blocks.length > 0 && (
        <p className="text-center text-[11px] text-muted-foreground -mt-2">
          <span className="font-semibold" style={{ color: selected.color }}>Class {selected.id}</span> blocks{" "}
          <span className="font-semibold">{selected.blocks.join(", ")}</span> — watch the badge light up red as the playhead enters its window
        </p>
      )}

      {/* SVG Diagrams + ECG strip side-by-side */}
      <div className="grid lg:grid-cols-2 gap-3">
        <div className="bg-muted/30 rounded-lg p-2 overflow-x-auto">
          {view === "contractile" ? (
            <ContractileView selectedClass={selectedClass} setSelectedClass={setSelectedClass} selected={selected} time={time} />
          ) : (
            <PacemakerView selectedClass={selectedClass} setSelectedClass={setSelectedClass} selected={selected} time={time} />
          )}
        </div>
        <div className="bg-muted/30 rounded-lg p-2 overflow-x-auto">
          <ECGStrip selected={selected} time={time} />
        </div>
      </div>

      {/* Detail panel */}
      {selected && (
        <div
          className="border rounded-lg p-4 space-y-2 animate-in fade-in-0 slide-in-from-bottom-2 duration-200"
          style={{ borderColor: selected.color + "66" }}
        >
          <div className="flex items-center gap-2 flex-wrap">
            <Badge className="text-xs font-bold text-white" style={{ backgroundColor: selected.color }}>
              Class {selected.id}
            </Badge>
            <span className="text-sm font-semibold text-foreground">{selected.fullName}</span>
            {view === "contractile" && (
              <Badge variant="outline" className="text-[10px]">
                Phase {selected.phases.join(" & ")}
              </Badge>
            )}
            {view === "pacemaker" && selected.pacemakerPhases && (
              <Badge variant="outline" className="text-[10px]">
                Pacemaker Phase {selected.pacemakerPhases.join(" & ")}
              </Badge>
            )}
          </div>
          <div className="grid gap-2 text-sm">
            <div>
              <span className="text-muted-foreground font-medium">Target phases: </span>
              {(view === "pacemaker" && selected.pacemakerPhases ? selected.pacemakerPhases : selected.phases).map((p, i, arr) => (
                <span key={p} className="text-foreground">
                  Phase {p} ({phaseInfo[p].name} — {phaseInfo[p].ion})
                  {i < arr.length - 1 ? " + " : ""}
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

/* ─── CONTRACTILE CELL VIEW ─── */
const ContractileView = ({
  selectedClass,
  setSelectedClass,
  selected,
  time,
}: {
  selectedClass: string | null;
  setSelectedClass: (c: string | null) => void;
  selected: DrugClass | undefined;
  time: number;
}) => {
  const w = 500, h = 300;
  const phaseX = {
    0: { x1: 80, x2: 95 },
    1: { x1: 95, x2: 115 },
    2: { x1: 115, x2: 300 },
    3: { x1: 300, x2: 400 },
    4: { x1: 400, x2: 480 },
  };
  const highlightedPhases = selected ? selected.phases : [];

  const classAnnotations: Record<string, { phases: number[]; y: number; label: string }> = {
    Ia: { phases: [0], y: 265, label: "Class Ia — Na⁺ block (intermediate)" },
    Ib: { phases: [0], y: 278, label: "Class Ib — Na⁺ block (fast)" },
    Ic: { phases: [0], y: 291, label: "Class Ic — Na⁺ block (slow)" },
    II: { phases: [4], y: 265, label: "Class II — β-blockers" },
    III: { phases: [3], y: 265, label: "Class III — K⁺ block" },
    IV: { phases: [0, 2], y: 278, label: "Class IV — Ca²⁺ block" },
  };

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-xl mx-auto" style={{ minWidth: 360 }}>
      <text x={w / 2} y={14} fontSize="10" fill="currentColor" opacity={0.5} textAnchor="middle" fontWeight="600">
        Ventricular Myocyte (Fast Response)
      </text>
      <line x1={50} y1={20} x2={50} y2={240} stroke="currentColor" opacity={0.3} strokeWidth={1} />
      <line x1={50} y1={240} x2={490} y2={240} stroke="currentColor" opacity={0.3} strokeWidth={1} />
      <text x={8} y={48} fontSize="9" fill="currentColor" opacity={0.5}>+20 mV</text>
      <text x={8} y={130} fontSize="9" fill="currentColor" opacity={0.5}>0 mV</text>
      <text x={8} y={228} fontSize="9" fill="currentColor" opacity={0.5}>−90 mV</text>
      <text x={4} y={140} fontSize="9" fill="currentColor" opacity={0.4} transform="rotate(-90, 4, 140)" textAnchor="middle">Membrane Potential</text>
      <text x={270} y={252} fontSize="9" fill="currentColor" opacity={0.4} textAnchor="middle">Time</text>
      <line x1={50} y1={185} x2={490} y2={185} stroke="currentColor" opacity={0.08} strokeDasharray="4,4" />
      <text x={492} y={188} fontSize="7" fill="currentColor" opacity={0.3}>−70 mV</text>

      {[0, 1, 2, 3, 4].map((p) => {
        const region = phaseX[p as keyof typeof phaseX];
        const isHighlighted = highlightedPhases.includes(p);
        return (
          <rect
            key={p}
            x={region.x1} y={20} width={region.x2 - region.x1} height={220}
            fill={isHighlighted && selected ? selected.color : "currentColor"}
            opacity={isHighlighted ? 0.15 : 0.02}
            rx={3}
            className="transition-opacity duration-300"
          />
        );
      })}

      <path
        d="M 50,225 L 80,225 L 88,40 Q 95,55 100,75 Q 105,80 115,80 Q 200,76 300,85 Q 340,140 400,225 L 480,225"
        fill="none" stroke="hsl(var(--primary))" strokeWidth={2.5} strokeLinejoin="round"
      />

      <text x={82} y={135} fontSize="13" fill="currentColor" fontWeight="bold" opacity={0.7}>0</text>
      <text x={102} y={68} fontSize="13" fill="currentColor" fontWeight="bold" opacity={0.7}>1</text>
      <text x={200} y={68} fontSize="13" fill="currentColor" fontWeight="bold" opacity={0.7}>2</text>
      <text x={355} y={145} fontSize="13" fill="currentColor" fontWeight="bold" opacity={0.7}>3</text>
      <text x={435} y={218} fontSize="13" fill="currentColor" fontWeight="bold" opacity={0.7}>4</text>

      <text x={70} y={155} fontSize="7" fill="currentColor" opacity={0.45}>Na⁺ ↑</text>
      <text x={105} y={95} fontSize="7" fill="currentColor" opacity={0.45}>K⁺ (Ito)</text>
      <text x={185} y={95} fontSize="7" fill="currentColor" opacity={0.45}>Ca²⁺ ↑ / K⁺ ↓</text>
      <text x={330} y={160} fontSize="7" fill="currentColor" opacity={0.45}>K⁺ (IKr/IKs)</text>
      <text x={425} y={235} fontSize="7" fill="currentColor" opacity={0.45}>IK1</text>

      <line x1={80} y1={255} x2={350} y2={255} stroke="hsl(0,60%,50%)" strokeWidth={2} opacity={0.6} />
      <text x={180} y={262} fontSize="8" fill="hsl(0,60%,50%)" textAnchor="middle" opacity={0.7}>ERP</text>
      <line x1={350} y1={255} x2={400} y2={255} stroke="hsl(45,60%,50%)" strokeWidth={2} opacity={0.6} />
      <text x={375} y={262} fontSize="8" fill="hsl(45,60%,50%)" textAnchor="middle" opacity={0.7}>RRP</text>

      {Object.entries(classAnnotations).map(([cls, ann]) => {
        const isActive = selectedClass === cls;
        const dc = drugClasses.find((d) => d.id === cls)!;
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
            <line x1={minX + 2} y1={bracketY} x2={maxX - 2} y2={bracketY} stroke={dc.color} strokeWidth={2} />
            <line x1={minX + 2} y1={bracketY - 4} x2={minX + 2} y2={bracketY + 1} stroke={dc.color} strokeWidth={1.5} />
            <line x1={maxX - 2} y1={bracketY - 4} x2={maxX - 2} y2={bracketY + 1} stroke={dc.color} strokeWidth={1.5} />
            <text x={midX} y={bracketY + 10} fontSize="7" fill={dc.color} textAnchor="middle" fontWeight={isActive ? "bold" : "normal"}>
              {ann.label}
            </text>
          </g>
        );
      })}

      {/* Animated playhead */}
      {(() => {
        const x = 50 + time * (480 - 50);
        return (
          <g style={{ pointerEvents: "none" }}>
            <line x1={x} y1={20} x2={x} y2={240} stroke="hsl(var(--primary))" strokeWidth={1.5} opacity={0.85} />
            <circle cx={x} cy={20} r={4} fill="hsl(var(--primary))" />
            <rect x={x - 16} y={4} width={32} height={12} rx={2} fill="hsl(var(--primary))" opacity={0.92} />
            <text x={x} y={13} fontSize="7" fill="white" textAnchor="middle" fontWeight="bold">
              {(time * 2.4).toFixed(2)}s
            </text>
          </g>
        );
      })()}
    </svg>
  );
};

/* ─── PACEMAKER CELL VIEW ─── */
const PacemakerView = ({
  selectedClass,
  setSelectedClass,
  selected,
  time,
}: {
  selectedClass: string | null;
  setSelectedClass: (c: string | null) => void;
  selected: DrugClass | undefined;
  time: number;
}) => {
  const w = 500, h = 340;

  // Pacemaker phases: 4 (slow depolarisation), 0 (upstroke via ICa-L), 3 (repolarisation)
  // No phases 1 or 2 (no plateau, no fast Na⁺)
  const phaseX = {
    4: { x1: 50, x2: 170 },
    0: { x1: 170, x2: 210 },
    3: { x1: 210, x2: 310 },
  };

  // Second cycle
  const phase2X = {
    4: { x1: 310, x2: 430 },
    0: { x1: 430, x2: 470 },
  };

  const highlightedPhases = selected?.pacemakerPhases || [];

  // Drug effect on Phase 4 slope — show a dotted "slower" slope for Class II / IV
  const showSlowedSlope = selected && (selected.id === "II" || selected.id === "IV");

  // Drug effect on Phase 0 — show a dotted "reduced upstroke" for Class IV
  const showReducedUpstroke = selected?.id === "IV";

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-xl mx-auto" style={{ minWidth: 360 }}>
      <text x={w / 2} y={14} fontSize="10" fill="currentColor" opacity={0.5} textAnchor="middle" fontWeight="600">
        SA Node Pacemaker Cell (Slow Response)
      </text>

      {/* Axes */}
      <line x1={40} y1={25} x2={40} y2={250} stroke="currentColor" opacity={0.3} strokeWidth={1} />
      <line x1={40} y1={250} x2={490} y2={250} stroke="currentColor" opacity={0.3} strokeWidth={1} />
      <text x={4} y={58} fontSize="9" fill="currentColor" opacity={0.5}>+10 mV</text>
      <text x={4} y={148} fontSize="9" fill="currentColor" opacity={0.5}>−40 mV</text>
      <text x={4} y={228} fontSize="9" fill="currentColor" opacity={0.5}>−60 mV</text>
      <text x={4} y={140} fontSize="9" fill="currentColor" opacity={0.4} transform="rotate(-90, 4, 140)" textAnchor="middle">mV</text>
      <text x={270} y={262} fontSize="9" fill="currentColor" opacity={0.4} textAnchor="middle">Time</text>

      {/* Threshold line at -40 mV */}
      <line x1={40} y1={145} x2={490} y2={145} stroke="currentColor" opacity={0.1} strokeDasharray="4,4" />
      <text x={492} y={148} fontSize="7" fill="currentColor" opacity={0.3}>−40 mV (threshold)</text>

      {/* MDP line */}
      <line x1={40} y1={225} x2={490} y2={225} stroke="currentColor" opacity={0.06} strokeDasharray="2,6" />
      <text x={492} y={228} fontSize="6" fill="currentColor" opacity={0.25}>MDP (−60 mV)</text>

      {/* Phase highlight regions — first cycle */}
      {Object.entries(phaseX).map(([p, region]) => {
        const pNum = Number(p);
        const isHighlighted = highlightedPhases.includes(pNum);
        return (
          <rect
            key={p}
            x={region.x1} y={25} width={region.x2 - region.x1} height={225}
            fill={isHighlighted && selected ? selected.color : "currentColor"}
            opacity={isHighlighted ? 0.15 : 0.02}
            rx={3}
            className="transition-opacity duration-300"
          />
        );
      })}

      {/* Phase highlight — second cycle Phase 4 */}
      {highlightedPhases.includes(4) && selected && (
        <rect x={phase2X[4].x1} y={25} width={phase2X[4].x2 - phase2X[4].x1} height={225}
          fill={selected.color} opacity={0.1} rx={3} />
      )}

      {/* Normal pacemaker AP waveform — two cycles */}
      <path
        d={`
          M 50,225
          Q 85,220 110,200
          Q 135,175 160,150
          Q 167,142 170,145
          L 178,80
          Q 185,52 190,50
          Q 200,55 210,80
          Q 240,160 280,215
          Q 295,225 310,225
          Q 345,220 370,200
          Q 395,175 420,150
          Q 427,142 430,145
          L 438,80
          Q 445,52 450,50
          Q 460,55 470,80
        `}
        fill="none" stroke="hsl(var(--primary))" strokeWidth={2.5} strokeLinejoin="round"
      />

      {/* Slowed Phase 4 slope (drug effect — dashed) */}
      {showSlowedSlope && (
        <>
          <path
            d={`
              M 50,225
              Q 95,222 130,210
              Q 160,195 190,170
              Q 200,158 210,145
            `}
            fill="none" stroke={selected!.color} strokeWidth={2} strokeDasharray="6,4" opacity={0.7}
          />
          <text x={120} y={198} fontSize="8" fill={selected!.color} fontWeight="600" opacity={0.8}>
            ↓ slope
          </text>
          {/* Arrow showing delayed threshold crossing */}
          <line x1={210} y1={145} x2={230} y2={145} stroke={selected!.color} strokeWidth={1} strokeDasharray="3,3" opacity={0.5} />
          <text x={235} y={148} fontSize="7" fill={selected!.color} opacity={0.6}>delayed</text>
        </>
      )}

      {/* Reduced upstroke for Class IV */}
      {showReducedUpstroke && (
        <>
          <path
            d="M 210,145 L 220,100 Q 225,85 230,82"
            fill="none" stroke={selected!.color} strokeWidth={2} strokeDasharray="6,4" opacity={0.7}
          />
          <text x={232} y={96} fontSize="7" fill={selected!.color} fontWeight="600" opacity={0.8}>
            ↓ upstroke
          </text>
        </>
      )}

      {/* Phase number labels — cycle 1 */}
      <text x={110} y={178} fontSize="14" fill="currentColor" fontWeight="bold" opacity={0.7}>4</text>
      <text x={185} y={100} fontSize="14" fill="currentColor" fontWeight="bold" opacity={0.7}>0</text>
      <text x={250} y={140} fontSize="14" fill="currentColor" fontWeight="bold" opacity={0.7}>3</text>
      {/* Cycle 2 */}
      <text x={370} y={178} fontSize="14" fill="currentColor" fontWeight="bold" opacity={0.5}>4</text>
      <text x={445} y={100} fontSize="14" fill="currentColor" fontWeight="bold" opacity={0.5}>0</text>

      {/* Ion current labels */}
      <g fontSize="7.5" opacity={0.5} fill="currentColor">
        <text x={60} y={240}>If (funny current)</text>
        <text x={130} y={160}>ICa-T</text>
        <text x={175} y={42}>ICa-L</text>
        <text x={245} y={180}>IKr</text>
      </g>

      {/* Key differences callout */}
      <g>
        <rect x={50} y={272} width={420} height={58} rx={6} fill="currentColor" opacity={0.03} stroke="currentColor" strokeOpacity={0.08} />
        <text x={60} y={286} fontSize="8" fill="currentColor" opacity={0.6} fontWeight="bold">Key differences from contractile cells:</text>
        <text x={60} y={298} fontSize="7.5" fill="currentColor" opacity={0.45}>• No fast Na⁺ channels → Phase 0 upstroke via ICa-L (slow, ~1–2 V/s vs 200 V/s)</text>
        <text x={60} y={309} fontSize="7.5" fill="currentColor" opacity={0.45}>• No plateau (Phase 2) — repolarisation begins immediately after peak</text>
        <text x={60} y={320} fontSize="7.5" fill="currentColor" opacity={0.45}>• Spontaneous Phase 4 depolarisation: If + ICa-T → automaticity (MDP → threshold)</text>
      </g>

      {/* Drug class annotations for pacemaker-relevant classes */}
      {/* Class II — acts on Phase 4 */}
      <g
        opacity={selectedClass === null ? 0.55 : selectedClass === "II" ? 1 : 0.12}
        className="transition-opacity duration-300 cursor-pointer"
        onClick={() => setSelectedClass(selectedClass === "II" ? null : "II")}
      >
        <line x1={52} y1={255} x2={168} y2={255} stroke="hsl(210, 80%, 55%)" strokeWidth={2} />
        <line x1={52} y1={251} x2={52} y2={256} stroke="hsl(210, 80%, 55%)" strokeWidth={1.5} />
        <line x1={168} y1={251} x2={168} y2={256} stroke="hsl(210, 80%, 55%)" strokeWidth={1.5} />
        <text x={110} y={266} fontSize="7.5" fill="hsl(210, 80%, 55%)" textAnchor="middle" fontWeight={selectedClass === "II" ? "bold" : "normal"}>
          Class II — β-blockers (↓ If slope)
        </text>
      </g>

      {/* Class IV — acts on Phase 0 (ICa-L) */}
      <g
        opacity={selectedClass === null ? 0.55 : selectedClass === "IV" ? 1 : 0.12}
        className="transition-opacity duration-300 cursor-pointer"
        onClick={() => setSelectedClass(selectedClass === "IV" ? null : "IV")}
      >
        <line x1={172} y1={255} x2={208} y2={255} stroke="hsl(160, 70%, 40%)" strokeWidth={2} />
        <line x1={172} y1={251} x2={172} y2={256} stroke="hsl(160, 70%, 40%)" strokeWidth={1.5} />
        <line x1={208} y1={251} x2={208} y2={256} stroke="hsl(160, 70%, 40%)" strokeWidth={1.5} />
        <text x={190} y={266} fontSize="7.5" fill="hsl(160, 70%, 40%)" textAnchor="middle" fontWeight={selectedClass === "IV" ? "bold" : "normal"}>
          Class IV — Ca²⁺ block
        </text>
      </g>

      {/* Animated playhead — first cycle spans x=50→310 */}
      {(() => {
        const x = 50 + time * (310 - 50);
        return (
          <g style={{ pointerEvents: "none" }}>
            <line x1={x} y1={25} x2={x} y2={250} stroke="hsl(var(--primary))" strokeWidth={1.5} opacity={0.85} />
            <circle cx={x} cy={25} r={4} fill="hsl(var(--primary))" />
            <rect x={x - 16} y={9} width={32} height={12} rx={2} fill="hsl(var(--primary))" opacity={0.92} />
            <text x={x} y={18} fontSize="7" fill="white" textAnchor="middle" fontWeight="bold">
              {(time * 2.4).toFixed(2)}s
            </text>
          </g>
        );
      })()}
    </svg>
  );
};

/* ─── ECG STRIP ─── */
const ECGStrip = ({ selected, time }: { selected: DrugClass | undefined | null; time: number }) => {
  const w = 500, h = 300;
  const baseline = 150;

  const mods: Record<string, { pr: number; qrs: number; qt: number; note: string }> = {
    Ia:  { pr: 1.0,  qrs: 1.4, qt: 1.3,  note: "↑ QRS, ↑ QT (Na⁺ + K⁺ block)" },
    Ib:  { pr: 1.0,  qrs: 1.0, qt: 0.95, note: "minimal change in normal tissue" },
    Ic:  { pr: 1.1,  qrs: 1.7, qt: 1.05, note: "markedly ↑ QRS (slow Na⁺ block)" },
    II:  { pr: 1.3,  qrs: 1.0, qt: 1.0,  note: "↑ PR, ↓ HR (β-block)" },
    III: { pr: 1.0,  qrs: 1.0, qt: 1.5,  note: "↑↑ QT (K⁺ block)" },
    IV:  { pr: 1.35, qrs: 1.0, qt: 1.0,  note: "↑ PR, ↓ HR (Ca²⁺ block at AV node)" },
  };
  const m = selected ? mods[selected.id] : { pr: 1, qrs: 1, qt: 1, note: "" };

  const stripStart = 50;
  const stripEnd = 480;
  const stripWidth = stripEnd - stripStart;
  const baseRR = 1000;
  const ms2x = (ms: number) => stripStart + (ms / baseRR) * stripWidth;

  const pStart = 40;
  const pEnd = pStart + 80;
  const prEnd = pStart + 160 * m.pr;
  const qStart = prEnd;
  const qrsEnd = qStart + 90 * m.qrs;
  const stEnd = qrsEnd + 80;
  const tEnd = qStart + 380 * m.qt;
  const tPeak = (stEnd + tEnd) / 2;

  const y0 = baseline;
  const pPeak = (pStart + pEnd) / 2;
  const qDip = qStart + (qrsEnd - qStart) * 0.2;
  const rPeak = qStart + (qrsEnd - qStart) * 0.5;
  const sDip = qStart + (qrsEnd - qStart) * 0.8;

  const path = [
    `M ${ms2x(0)},${y0}`,
    `L ${ms2x(pStart)},${y0}`,
    `Q ${ms2x(pPeak)},${y0 - 18} ${ms2x(pEnd)},${y0}`,
    `L ${ms2x(prEnd)},${y0}`,
    `L ${ms2x(qDip)},${y0 + 12}`,
    `L ${ms2x(rPeak)},${y0 - 90}`,
    `L ${ms2x(sDip)},${y0 + 18}`,
    `L ${ms2x(qrsEnd)},${y0}`,
    `L ${ms2x(stEnd)},${y0}`,
    `Q ${ms2x(tPeak)},${y0 - 35} ${ms2x(tEnd)},${y0}`,
    `L ${ms2x(baseRR)},${y0}`,
  ].join(" ");

  const playX = ms2x(time * baseRR);

  const Bar = ({ x1, x2, y, label, value, color }: { x1: number; x2: number; y: number; label: string; value: string; color: string }) => (
    <g>
      <line x1={x1} y1={y} x2={x2} y2={y} stroke={color} strokeWidth={2} />
      <line x1={x1} y1={y - 4} x2={x1} y2={y + 4} stroke={color} strokeWidth={2} />
      <line x1={x2} y1={y - 4} x2={x2} y2={y + 4} stroke={color} strokeWidth={2} />
      <text x={(x1 + x2) / 2} y={y - 4} fontSize="9" fill={color} textAnchor="middle" fontWeight="600">
        {label} {value}
      </text>
    </g>
  );

  const prMs = Math.round(160 * m.pr);
  const qrsMs = Math.round(90 * m.qrs);
  const qtMs = Math.round(380 * m.qt);

  const prChanged = m.pr !== 1;
  const qrsChanged = m.qrs !== 1;
  const qtChanged = m.qt !== 1;
  const muted = "hsl(var(--muted-foreground))";
  const prCol = prChanged && selected ? selected.color : muted;
  const qrsCol = qrsChanged && selected ? selected.color : muted;
  const qtCol = qtChanged && selected ? selected.color : muted;

  // Baseline ghost path (when a class is selected)
  const _prEnd = pStart + 160;
  const _qrsEnd = _prEnd + 90;
  const _stEnd = _qrsEnd + 80;
  const _tEnd = _prEnd + 380;
  const _tPeak = (_stEnd + _tEnd) / 2;
  const _qDip = _prEnd + 90 * 0.2;
  const _rPeak = _prEnd + 90 * 0.5;
  const _sDip = _prEnd + 90 * 0.8;
  const ghostPath = [
    `M ${ms2x(0)},${y0}`,
    `L ${ms2x(pStart)},${y0}`,
    `Q ${ms2x(pPeak)},${y0 - 18} ${ms2x(pEnd)},${y0}`,
    `L ${ms2x(_prEnd)},${y0}`,
    `L ${ms2x(_qDip)},${y0 + 12}`,
    `L ${ms2x(_rPeak)},${y0 - 90}`,
    `L ${ms2x(_sDip)},${y0 + 18}`,
    `L ${ms2x(_qrsEnd)},${y0}`,
    `L ${ms2x(_stEnd)},${y0}`,
    `Q ${ms2x(_tPeak)},${y0 - 35} ${ms2x(_tEnd)},${y0}`,
    `L ${ms2x(baseRR)},${y0}`,
  ].join(" ");

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-xl mx-auto" style={{ minWidth: 360 }}>
      <text x={w / 2} y={14} fontSize="10" fill="currentColor" opacity={0.5} textAnchor="middle" fontWeight="600">
        Surface ECG (Lead II)
      </text>

      <defs>
        <pattern id="ecgGrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="hsl(0, 70%, 60%)" strokeWidth="0.4" opacity="0.25" />
        </pattern>
      </defs>
      <rect x={stripStart} y={30} width={stripWidth} height={200} fill="url(#ecgGrid)" />

      {selected && (
        <path d={ghostPath} fill="none" stroke="currentColor" strokeWidth={1} opacity={0.3} strokeDasharray="3,3" />
      )}

      <path d={path} fill="none" stroke={selected ? selected.color : "hsl(var(--primary))"} strokeWidth={2} strokeLinejoin="round" />

      <text x={ms2x(pPeak)} y={y0 - 24} fontSize="10" fill="currentColor" opacity={0.7} textAnchor="middle" fontWeight="bold">P</text>
      <text x={ms2x(rPeak)} y={y0 - 96} fontSize="10" fill="currentColor" opacity={0.7} textAnchor="middle" fontWeight="bold">R</text>
      <text x={ms2x(tPeak)} y={y0 - 40} fontSize="10" fill="currentColor" opacity={0.7} textAnchor="middle" fontWeight="bold">T</text>

      <Bar x1={ms2x(pStart)} x2={ms2x(prEnd)} y={y0 + 55} label="PR" value={`${prMs}ms`} color={prCol} />
      <Bar x1={ms2x(qStart)} x2={ms2x(qrsEnd)} y={y0 + 75} label="QRS" value={`${qrsMs}ms`} color={qrsCol} />
      <Bar x1={ms2x(qStart)} x2={ms2x(tEnd)} y={y0 + 95} label="QT" value={`${qtMs}ms`} color={qtCol} />

      <line x1={playX} y1={30} x2={playX} y2={230} stroke="hsl(var(--primary))" strokeWidth={1.5} opacity={0.6} strokeDasharray="3,3" />

      <text x={w / 2} y={278} fontSize="10" fill="currentColor" opacity={0.75} textAnchor="middle" fontStyle="italic">
        {selected ? `Class ${selected.id}: ${m.note}` : "Select a drug class to see PR / QRS / QT change"}
      </text>
      {selected && (
        <text x={w / 2} y={293} fontSize="9" fill="currentColor" opacity={0.45} textAnchor="middle">
          dashed = baseline · solid coloured = on Class {selected.id}
        </text>
      )}
    </svg>
  );
};

export default VaughanWilliamsAPDiagram;
