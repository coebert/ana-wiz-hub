import { useState, useEffect } from "react";

type Mode = "earthed" | "isolated" | "isolated-fault";

export const IsolationTransformerDiagram = () => {
  const [mode, setMode] = useState<Mode>("earthed");
  const [t, setT] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setT((x) => (x + 1) % 1000), 50);
    return () => clearInterval(id);
  }, []);

  const W = 640;
  const H = 360;

  // Animated electron position helper (0..1 along path)
  const phase = (offset: number) => ((t / 40 + offset) % 1);

  // Patient body coords
  const patient = { x: 470, y: 200, w: 90, h: 110 };
  const earthY = 320;

  // For "earthed-fault": current flows L → patient → earth → back to neutral
  // For "isolated": no path closes through earth, no current through patient
  // For "isolated-fault": one fault makes hot conductor referenced to earth — LIM alarms, but still no shock (until 2nd fault)

  const showCurrentThroughPatient = mode === "earthed";
  const showLIMAlarm = mode === "isolated-fault";

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {/* Mode tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        {[
          { id: "earthed" as Mode, label: "Earthed mains + 1 fault" },
          { id: "isolated" as Mode, label: "Isolated supply (intact)" },
          { id: "isolated-fault" as Mode, label: "Isolated supply + 1 fault" },
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
              mode === m.id
                ? "bg-physics/10 border-physics text-physics"
                : "border-border text-muted-foreground hover:border-physics/40"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      <div className="bg-card rounded-xl border border-border p-4">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
          {/* MAINS supply (left) */}
          <g>
            <rect x={20} y={120} width={90} height={120} rx={6} fill="hsl(210 30% 96%)" stroke="hsl(215 25% 35%)" strokeWidth="1.5" />
            <text x={65} y={110} textAnchor="middle" fontSize="11" className="fill-foreground font-medium">Mains</text>
            <text x={65} y={150} textAnchor="middle" fontSize="10" className="fill-muted-foreground">240 V AC</text>
            <text x={65} y={170} textAnchor="middle" fontSize="10" className="fill-muted-foreground">L · N · E</text>
            {/* L, N, E terminals */}
            <circle cx={110} cy={150} r={3} fill="hsl(0 70% 50%)" />
            <circle cx={110} cy={185} r={3} fill="hsl(220 30% 40%)" />
            <circle cx={110} cy={220} r={3} fill="hsl(140 50% 40%)" />
            <text x={120} y={154} fontSize="9" className="fill-muted-foreground">L</text>
            <text x={120} y={189} fontSize="9" className="fill-muted-foreground">N</text>
            <text x={120} y={224} fontSize="9" className="fill-muted-foreground">E</text>
          </g>

          {/* Isolation transformer (only shown in isolated modes) */}
          {mode !== "earthed" && (
            <g>
              {/* Primary coil */}
              <rect x={150} y={140} width={18} height={70} fill="none" stroke="hsl(215 25% 35%)" strokeWidth="1.5" />
              <path d="M 159 145 q 6 5 0 10 q -6 5 0 10 q 6 5 0 10 q -6 5 0 10 q 6 5 0 10" fill="none" stroke="hsl(215 25% 35%)" strokeWidth="1.5" />
              {/* Iron core */}
              <line x1={178} y1={130} x2={178} y2={220} stroke="hsl(215 25% 25%)" strokeWidth="2" />
              <line x1={183} y1={130} x2={183} y2={220} stroke="hsl(215 25% 25%)" strokeWidth="2" />
              {/* Secondary coil */}
              <rect x={193} y={140} width={18} height={70} fill="none" stroke="hsl(215 25% 35%)" strokeWidth="1.5" />
              <path d="M 202 145 q 6 5 0 10 q -6 5 0 10 q 6 5 0 10 q -6 5 0 10 q 6 5 0 10" fill="none" stroke="hsl(215 25% 35%)" strokeWidth="1.5" />
              <text x={180} y={120} textAnchor="middle" fontSize="10" className="fill-foreground font-medium">Isolation Tx</text>
              <text x={180} y={235} textAnchor="middle" fontSize="9" className="fill-muted-foreground">1:1</text>

              {/* Wires from mains to primary */}
              <path d="M 110 150 L 140 150 L 140 155 L 150 155" fill="none" stroke="hsl(0 70% 50%)" strokeWidth="2" />
              <path d="M 110 185 L 135 185 L 135 195 L 150 195" fill="none" stroke="hsl(220 30% 40%)" strokeWidth="2" />
            </g>
          )}

          {/* Direct mains wires (earthed mode) */}
          {mode === "earthed" && (
            <>
              <path d="M 110 150 L 270 150" fill="none" stroke="hsl(0 70% 50%)" strokeWidth="2" />
              <path d="M 110 185 L 270 185" fill="none" stroke="hsl(220 30% 40%)" strokeWidth="2" />
              {/* Neutral bonded to earth at supply */}
              <path d="M 110 185 L 110 290 L 200 290 L 200 320" fill="none" stroke="hsl(220 30% 40%)" strokeWidth="1.5" strokeDasharray="3 3" />
              <text x={130} y={285} fontSize="9" className="fill-muted-foreground">N bonded to E at substation</text>
            </>
          )}

          {/* Conductors from transformer secondary onward */}
          {mode !== "earthed" && (
            <>
              <path d="M 211 155 L 270 155 L 270 150" fill="none" stroke="hsl(0 70% 50%)" strokeWidth="2" />
              <path d="M 211 195 L 270 195 L 270 185" fill="none" stroke="hsl(220 30% 40%)" strokeWidth="2" />
              <path d="M 270 150 L 380 150" fill="none" stroke="hsl(0 70% 50%)" strokeWidth="2" />
              <path d="M 270 185 L 380 185" fill="none" stroke="hsl(220 30% 40%)" strokeWidth="2" />
              <text x={225} y={130} fontSize="9" className="fill-muted-foreground">Floating LINE 1</text>
              <text x={225} y={215} fontSize="9" className="fill-muted-foreground">Floating LINE 2</text>
            </>
          )}

          {/* Equipment box */}
          <g>
            <rect x={290} y={130} width={130} height={90} rx={6} fill="hsl(210 30% 98%)" stroke="hsl(215 25% 35%)" strokeWidth="1.5" />
            <text x={355} y={120} textAnchor="middle" fontSize="11" className="fill-foreground font-medium">Equipment</text>
            <text x={355} y={170} textAnchor="middle" fontSize="9" className="fill-muted-foreground">(faulty — live</text>
            <text x={355} y={182} textAnchor="middle" fontSize="9" className="fill-muted-foreground">conductor</text>
            <text x={355} y={194} textAnchor="middle" fontSize="9" className="fill-muted-foreground">touches case)</text>
            {/* Fault spark indicator */}
            {(mode === "earthed" || mode === "isolated-fault") && (
              <g>
                <circle cx={310} cy={150} r={4} fill="hsl(45 100% 55%)">
                  <animate attributeName="opacity" values="1;0.3;1" dur="0.6s" repeatCount="indefinite" />
                </circle>
                <text x={318} y={144} fontSize="9" className="fill-foreground font-medium">fault</text>
              </g>
            )}
          </g>

          {/* Wire to patient (touching equipment case) */}
          <path d={`M 420 175 L 470 175 L 470 ${patient.y}`} fill="none" stroke="hsl(215 25% 35%)" strokeWidth="1.5" />

          {/* Patient */}
          <g>
            {/* Head */}
            <circle cx={patient.x + patient.w / 2} cy={patient.y - 5} r={14} fill="hsl(20 50% 85%)" stroke="hsl(215 25% 35%)" strokeWidth="1.2" />
            {/* Body */}
            <rect x={patient.x} y={patient.y + 10} width={patient.w} height={patient.h - 20} rx={10} fill="hsl(210 60% 92%)" stroke="hsl(215 25% 35%)" strokeWidth="1.2" />
            {/* Heart */}
            <path d="M 510 245 q -8 -10 -16 0 q 0 10 16 22 q 16 -12 16 -22 q -8 -10 -16 0" fill="hsl(0 70% 55%)" opacity={showCurrentThroughPatient ? 1 : 0.7}>
              {showCurrentThroughPatient && (
                <animate attributeName="opacity" values="0.6;1;0.6" dur="0.4s" repeatCount="indefinite" />
              )}
            </path>
            <text x={patient.x + patient.w / 2} y={patient.y + patient.h + 14} textAnchor="middle" fontSize="10" className="fill-foreground font-medium">Patient</text>
            {showCurrentThroughPatient && (
              <text x={patient.x + patient.w / 2} y={patient.y + patient.h + 28} textAnchor="middle" fontSize="9" className="fill-[hsl(0_70%_50%)] font-semibold">VF risk!</text>
            )}
          </g>

          {/* Patient feet to earth */}
          <line x1={patient.x + 20} y1={patient.y + patient.h} x2={patient.x + 20} y2={earthY} stroke="hsl(215 25% 35%)" strokeWidth="1.2" />
          <line x1={patient.x + patient.w - 20} y1={patient.y + patient.h} x2={patient.x + patient.w - 20} y2={earthY} stroke="hsl(215 25% 35%)" strokeWidth="1.2" />

          {/* Earth bar */}
          <line x1={40} y1={earthY} x2={W - 40} y2={earthY} stroke="hsl(140 50% 30%)" strokeWidth="2" />
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={i} x1={50 + i * 50} y1={earthY} x2={45 + i * 50} y2={earthY + 8} stroke="hsl(140 50% 30%)" strokeWidth="1.5" />
          ))}
          <text x={W - 60} y={earthY + 22} fontSize="10" className="fill-[hsl(140_50%_30%)] font-medium">EARTH</text>

          {/* Animated electrons through patient (earthed mode only) */}
          {showCurrentThroughPatient && Array.from({ length: 6 }).map((_, i) => {
            const p = phase(i / 6);
            // Path: L wire (110,150) → equipment (310,150) → case → patient (515,200) → through body (515,310) → earth (515,320) → back along earth (200,320) → up to N (110,185)
            // Approximate piecewise
            const segments = [
              { x1: 110, y1: 150, x2: 310, y2: 150 }, // L wire
              { x1: 310, y1: 150, x2: 470, y2: 175 }, // through equipment
              { x1: 470, y1: 175, x2: 515, y2: 200 }, // to patient
              { x1: 515, y1: 200, x2: 515, y2: 310 }, // through body
              { x1: 515, y1: 310, x2: 200, y2: 320 }, // through earth
              { x1: 200, y1: 320, x2: 110, y2: 185 }, // back to neutral
            ];
            const totalLen = segments.length;
            const segIdx = Math.floor(p * totalLen);
            const segP = (p * totalLen) % 1;
            const s = segments[segIdx];
            const x = s.x1 + (s.x2 - s.x1) * segP;
            const y = s.y1 + (s.y2 - s.y1) * segP;
            return <circle key={i} cx={x} cy={y} r={3.5} fill="hsl(45 100% 55%)" />;
          })}

          {/* Animated electrons in floating loop (isolated modes — confined to L1↔equipment↔L2 loop, never through patient) */}
          {mode !== "earthed" && Array.from({ length: 6 }).map((_, i) => {
            const p = phase(i / 6);
            const segments = [
              { x1: 211, y1: 155, x2: 380, y2: 150 }, // L1 to equipment
              { x1: 380, y1: 150, x2: 380, y2: 185 }, // through equipment
              { x1: 380, y1: 185, x2: 211, y2: 195 }, // back via L2
              { x1: 211, y1: 195, x2: 211, y2: 155 }, // through secondary winding
            ];
            const totalLen = segments.length;
            const segIdx = Math.floor(p * totalLen);
            const segP = (p * totalLen) % 1;
            const s = segments[segIdx];
            const x = s.x1 + (s.x2 - s.x1) * segP;
            const y = s.y1 + (s.y2 - s.y1) * segP;
            return <circle key={i} cx={x} cy={y} r={3} fill="hsl(45 100% 55%)" opacity={0.85} />;
          })}

          {/* LIM (Line Isolation Monitor) — shown in isolated modes */}
          {mode !== "earthed" && (
            <g>
              <rect x={250} y={250} width={120} height={55} rx={6} fill="hsl(210 30% 97%)" stroke={showLIMAlarm ? "hsl(0 70% 50%)" : "hsl(215 25% 35%)"} strokeWidth="1.5" />
              <text x={310} y={266} textAnchor="middle" fontSize="10" className="fill-foreground font-semibold">Line Isolation</text>
              <text x={310} y={278} textAnchor="middle" fontSize="10" className="fill-foreground font-semibold">Monitor (LIM)</text>
              {/* Status light */}
              <circle cx={310} cy={295} r={5} fill={showLIMAlarm ? "hsl(0 80% 55%)" : "hsl(140 60% 45%)"}>
                {showLIMAlarm && (
                  <animate attributeName="opacity" values="1;0.3;1" dur="0.5s" repeatCount="indefinite" />
                )}
              </circle>
              <text x={320} y={299} fontSize="9" className="fill-muted-foreground">
                {showLIMAlarm ? "ALARM > 2 mA leakage" : "Safe — isolated"}
              </text>

              {/* LIM senses both lines vs earth */}
              <path d="M 270 250 L 270 150" fill="none" stroke="hsl(215 25% 50%)" strokeWidth="0.8" strokeDasharray="2 2" />
              <path d="M 350 250 L 350 185" fill="none" stroke="hsl(215 25% 50%)" strokeWidth="0.8" strokeDasharray="2 2" />
              <path d="M 310 305 L 310 320" fill="none" stroke="hsl(215 25% 50%)" strokeWidth="0.8" strokeDasharray="2 2" />
            </g>
          )}

          {/* Caption box */}
          <g>
            <rect x={20} y={H - 40} width={W - 40} height={32} rx={4} fill="hsl(210 30% 97%)" stroke="hsl(215 25% 80%)" />
            {mode === "earthed" && (
              <text x={W / 2} y={H - 18} textAnchor="middle" fontSize="11" className="fill-foreground">
                Neutral is earth-referenced. A single fault closes a circuit through the patient → MACROSHOCK
              </text>
            )}
            {mode === "isolated" && (
              <text x={W / 2} y={H - 18} textAnchor="middle" fontSize="11" className="fill-foreground">
                Both supply lines float relative to earth. No path closes through the patient — safe.
              </text>
            )}
            {mode === "isolated-fault" && (
              <text x={W / 2} y={H - 18} textAnchor="middle" fontSize="11" className="fill-foreground">
                One fault references a line to earth — patient still safe, but LIM alarms. A 2nd fault would be lethal.
              </text>
            )}
          </g>
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 justify-center text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5"><span className="inline-block w-3 h-0.5 bg-[hsl(0_70%_50%)]" /> Live (L)</div>
        <div className="flex items-center gap-1.5"><span className="inline-block w-3 h-0.5 bg-[hsl(220_30%_40%)]" /> Neutral (N)</div>
        <div className="flex items-center gap-1.5"><span className="inline-block w-3 h-0.5 bg-[hsl(140_50%_30%)]" /> Earth</div>
        <div className="flex items-center gap-1.5"><span className="inline-block w-2.5 h-2.5 rounded-full bg-[hsl(45_100%_55%)]" /> Current (electrons)</div>
      </div>

      <div className="bg-secondary/30 rounded-lg p-4 border border-border text-xs space-y-1.5">
        <p className="text-foreground"><strong>How the isolation transformer protects:</strong> the 1:1 transformer magnetically couples mains power to the theatre circuit but breaks the galvanic connection. Neither secondary conductor is bonded to earth, so they "float." A patient touching one live conductor cannot complete a circuit to earth — no current flows.</p>
        <p className="text-foreground"><strong>Line Isolation Monitor (LIM):</strong> continuously measures the impedance between each conductor and earth. If a single fault (e.g., a wet cable, equipment insulation failure) drops impedance below ~25 kΩ — corresponding to a hazard current &gt; 2 mA were a second fault to occur — the LIM alarms. The supply is <em>not</em> automatically cut: in theatre, abrupt loss of power (e.g., to a CPB pump or ventilator) can be more dangerous than the fault itself.</p>
        <p className="text-foreground"><strong>Note:</strong> isolation transformers protect against macroshock, not microshock. For intracardiac catheters, Type CF equipment (&lt; 10 µA leakage) is still required.</p>
      </div>
    </div>
  );
};

export default IsolationTransformerDiagram;
