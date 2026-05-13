import { useState, useEffect } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

type Mode = "normal" | "fault" | "tripped";

export const RCDDiagram = () => {
  const [mode, setMode] = useState<Mode>("normal");
  const [t, setT] = useState(0);
  const [_tripFrame, setTripFrame] = useState<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => setT((x) => x + 1), 33);
    return () => clearInterval(id);
  }, []);

  // When user selects fault, after ~40 ms of "fault" current the device trips
  useEffect(() => {
    if (mode === "fault") {
      const start = t;
      setTripFrame(null);
      const trip = setTimeout(() => {
        setTripFrame(start);
        setMode("tripped");
      }, 1200); // 1.2 s of visible "tripping" build-up for clarity
      return () => clearTimeout(trip);
    }
  }, [mode]);

  const W = 640;
  const H = 360;

  // Animated electron offset
  const flowing = mode !== "tripped";
  const offset = flowing ? (t * 6) % 40 : 0;

  // For "fault" mode, some current diverts through the patient → mismatch detected
  const showLeak = mode === "fault";
  const showTripped = mode === "tripped";

  const liveY = 130;
  const neutY = 200;
  const earthY = 320;

  return (
    <DiagramFigure
      id="rcd-diagram"
      title="Rcd"
      description="Auto-generated wrapper for the Rcd anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
          <div className="w-full max-w-3xl mx-auto space-y-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            { id: "normal" as Mode, label: "Normal — IL = IN" },
            { id: "fault" as Mode, label: "Fault — current leaks via patient" },
            { id: "tripped" as Mode, label: "Tripped — supply cut" },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => { setMode(m.id); setTripFrame(null); }}
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
            {/* Mains supply */}
            <rect x={20} y={120} width={80} height={100} rx={6} fill="hsl(210 30% 96%)" stroke="hsl(215 25% 35%)" strokeWidth="1.5" />
            <text x={60} y={110} textAnchor="middle" fontSize="11" className="fill-foreground font-medium">Mains</text>
            <text x={60} y={150} textAnchor="middle" fontSize="9" className="fill-muted-foreground">L</text>
            <text x={60} y={205} textAnchor="middle" fontSize="9" className="fill-muted-foreground">N</text>
  
            {/* RCD housing */}
            <rect x={140} y={95} width={140} height={150} rx={8} fill="hsl(210 30% 98%)" stroke={showTripped ? "hsl(0 70% 50%)" : "hsl(215 25% 35%)"} strokeWidth="2" />
            <text x={210} y={85} textAnchor="middle" fontSize="11" className="fill-foreground font-semibold">RCD / RCCB</text>
  
            {/* Toroidal current transformer (central element) */}
            <ellipse cx={210} cy={165} rx={45} ry={30} fill="none" stroke="hsl(215 25% 35%)" strokeWidth="1.5" />
            <ellipse cx={210} cy={165} rx={35} ry={22} fill="none" stroke="hsl(215 25% 50%)" strokeWidth="1" strokeDasharray="2 3" />
            <text x={210} y={138} textAnchor="middle" fontSize="9" className="fill-muted-foreground">torroid</text>
  
            {/* Switch contacts (open when tripped) */}
            <g>
              <circle cx={170} cy={liveY} r={3} fill="hsl(215 25% 35%)" />
              <circle cx={250} cy={liveY} r={3} fill="hsl(215 25% 35%)" />
              <line
                x1={170} y1={liveY}
                x2={showTripped ? 245 : 250}
                y2={showTripped ? liveY - 18 : liveY}
                stroke="hsl(215 25% 25%)"
                strokeWidth="2"
              />
              <circle cx={170} cy={neutY} r={3} fill="hsl(215 25% 35%)" />
              <circle cx={250} cy={neutY} r={3} fill="hsl(215 25% 35%)" />
              <line
                x1={170} y1={neutY}
                x2={showTripped ? 245 : 250}
                y2={showTripped ? neutY - 18 : neutY}
                stroke="hsl(215 25% 25%)"
                strokeWidth="2"
              />
            </g>
  
            {/* Trip coil */}
            <rect x={195} y={210} width={30} height={28} fill="none" stroke="hsl(215 25% 50%)" strokeWidth="1" />
            <text x={210} y={228} textAnchor="middle" fontSize="8" className="fill-muted-foreground">trip</text>
  
            {/* Arrow from torroid to trip coil */}
            <path d="M 210 195 L 210 210" stroke={showTripped || showLeak ? "hsl(0 70% 50%)" : "hsl(215 25% 60%)"} strokeWidth="1.5" markerEnd="url(#arr)" />
  
            {/* L and N wires through RCD */}
            <line x1={100} y1={liveY} x2={170} y2={liveY} stroke="hsl(0 70% 50%)" strokeWidth="2" />
            <line x1={100} y1={neutY} x2={170} y2={neutY} stroke="hsl(220 30% 40%)" strokeWidth="2" />
            {/* Through torroid (L and N) */}
            <line x1={250} y1={liveY} x2={420} y2={liveY} stroke="hsl(0 70% 50%)" strokeWidth="2" />
            <line x1={250} y1={neutY} x2={420} y2={neutY} stroke="hsl(220 30% 40%)" strokeWidth="2" />
  
            {/* Equipment / load */}
            <rect x={420} y={115} width={100} height={100} rx={6} fill="hsl(210 30% 98%)" stroke="hsl(215 25% 35%)" strokeWidth="1.5" />
            <text x={470} y={108} textAnchor="middle" fontSize="11" className="fill-foreground font-medium">Equipment</text>
            <text x={470} y={170} textAnchor="middle" fontSize="9" className="fill-muted-foreground">{showLeak ? "(insulation fault)" : "(load)"}</text>
            {showLeak && (
              <circle cx={435} cy={130} r={4} fill="hsl(45 100% 55%)">
                <animate attributeName="opacity" values="1;0.3;1" dur="0.5s" repeatCount="indefinite" />
              </circle>
            )}
  
            {/* Connect L and N at equipment */}
            <line x1={420} y1={liveY} x2={420} y2={neutY} stroke="hsl(215 25% 35%)" strokeWidth="1" opacity="0.5" />
  
            {/* Patient (only relevant in fault) */}
            <g opacity={showLeak || showTripped ? 1 : 0.3}>
              <circle cx={560} cy={150} r={12} fill="hsl(20 50% 85%)" stroke="hsl(215 25% 35%)" strokeWidth="1" />
              <rect x={545} y={162} width={30} height={45} rx={6} fill="hsl(210 60% 92%)" stroke="hsl(215 25% 35%)" strokeWidth="1" />
              <line x1={550} y1={207} x2={550} y2={earthY} stroke="hsl(215 25% 35%)" strokeWidth="1" />
              <line x1={570} y1={207} x2={570} y2={earthY} stroke="hsl(215 25% 35%)" strokeWidth="1" />
              <text x={560} y={222} textAnchor="middle" fontSize="9" className="fill-muted-foreground">Patient</text>
              {/* Wire from equipment fault to patient */}
              {(showLeak || showTripped) && (
                <line x1={520} y1={130} x2={547} y2={150} stroke="hsl(0 70% 50%)" strokeWidth="1.5" strokeDasharray="3 2" />
              )}
            </g>
  
            {/* Earth bar */}
            <line x1={20} y1={earthY} x2={W - 20} y2={earthY} stroke="hsl(140 50% 30%)" strokeWidth="2" />
            {Array.from({ length: 13 }).map((_, i) => (
              <line key={i} x1={40 + i * 50} y1={earthY} x2={35 + i * 50} y2={earthY + 8} stroke="hsl(140 50% 30%)" strokeWidth="1.5" />
            ))}
            <text x={W - 50} y={earthY + 22} fontSize="10" className="fill-[hsl(140_50%_30%)] font-medium">EARTH</text>
  
            {/* Dashed return path back to N at substation (showing why imbalance occurs) */}
            <path d="M 60 220 L 60 290 L 200 290" fill="none" stroke="hsl(220 30% 40%)" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
            <text x={75} y={285} fontSize="8" className="fill-muted-foreground">N–E bond at supply</text>
  
            {/* Animated current dashes — L wire */}
            {flowing && (
              <>
                <line
                  x1={100} y1={liveY} x2={420} y2={liveY}
                  stroke="hsl(45 100% 55%)" strokeWidth="2"
                  strokeDasharray="6 14" strokeDashoffset={-offset}
                  opacity={0.95}
                />
                {/* N return — in normal mode equal & opposite, in fault mode REDUCED */}
                <line
                  x1={100} y1={neutY} x2={420} y2={neutY}
                  stroke={showLeak ? "hsl(45 100% 55%)" : "hsl(45 100% 55%)"}
                  strokeWidth={showLeak ? 1.2 : 2.5}
                  strokeDasharray="6 14" strokeDashoffset={offset}
                  opacity={showLeak ? 0.5 : 0.95}
                />
                {/* Leak path L → patient → earth (only in fault) */}
                {showLeak && (
                  <>
                    <line
                      x1={520} y1={130} x2={547} y2={150}
                      stroke="hsl(0 80% 55%)" strokeWidth="2"
                      strokeDasharray="5 8" strokeDashoffset={-offset}
                    />
                    <line
                      x1={550} y1={207} x2={550} y2={earthY}
                      stroke="hsl(0 80% 55%)" strokeWidth="2"
                      strokeDasharray="5 8" strokeDashoffset={-offset}
                    />
                    <line
                      x1={570} y1={207} x2={570} y2={earthY}
                      stroke="hsl(0 80% 55%)" strokeWidth="2"
                      strokeDasharray="5 8" strokeDashoffset={-offset}
                    />
                  </>
                )}
              </>
            )}
  
            {/* Status badges */}
            <g transform="translate(20, 30)">
              <rect width="140" height="24" rx="4" fill={showTripped ? "hsl(0 75% 50%)" : showLeak ? "hsl(25 90% 50%)" : "hsl(140 50% 40%)"} />
              <text x="70" y="16" textAnchor="middle" fontSize="11" className="fill-white font-semibold">
                {showTripped ? "TRIPPED" : showLeak ? "IMBALANCE DETECTED" : "BALANCED"}
              </text>
            </g>
  
            {/* Numeric readouts */}
            <g transform="translate(180, 30)">
              <text fontSize="10" className="fill-muted-foreground">
                IL = <tspan className="fill-foreground font-semibold">{showTripped ? "0" : "5.00"} A</tspan>
                {"   "}
                IN = <tspan className="fill-foreground font-semibold">{showTripped ? "0" : showLeak ? "4.97" : "5.00"} A</tspan>
                {"   "}
                ΔI = <tspan className={showLeak || showTripped ? "fill-[hsl(0_75%_50%)] font-bold" : "fill-foreground font-semibold"}>
                  {showTripped ? "0 (cut)" : showLeak ? "30 mA" : "0 mA"}
                </tspan>
              </text>
            </g>
  
            <defs>
              <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(0 70% 50%)" />
              </marker>
            </defs>
          </svg>
  
          <div className="flex flex-wrap gap-3 justify-center text-[11px] mt-2 text-muted-foreground">
            <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-[hsl(0_70%_50%)]" /> Live</span>
            <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-[hsl(220_30%_40%)]" /> Neutral</span>
            <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-[hsl(140_50%_30%)]" /> Earth</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[hsl(45_100%_55%)]" /> Current flow</span>
          </div>
        </div>
  
        {/* How it works */}
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="bg-card rounded-lg border border-border p-3">
            <p className="text-sm font-semibold text-foreground mb-1">How the RCD detects a leak</p>
            <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
              <li>L and N conductors pass through a single <strong className="text-foreground">toroidal current transformer</strong>, but in opposite directions.</li>
              <li>In a healthy circuit, magnetic fluxes <strong className="text-foreground">cancel exactly</strong> — no induced EMF in the sensing winding.</li>
              <li>If current leaks to earth (via a fault, a person, water), <strong className="text-foreground">IL ≠ IN</strong> — net flux induces an EMF.</li>
              <li>When the residual current exceeds <strong className="text-foreground">30 mA</strong>, the trip coil fires within <strong className="text-foreground">≤ 40 ms</strong>, opening both contacts.</li>
              <li>Trip thresholds: 30 mA (people), 100–300 mA (fire/equipment).</li>
            </ul>
          </div>
          <div className="bg-card rounded-lg border border-border p-3">
            <p className="text-sm font-semibold text-foreground mb-1">Why this saves lives</p>
            <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
              <li>VF threshold ≈ 100 mA at 50 Hz; let-go threshold ≈ 15 mA.</li>
              <li>30 mA × 40 ms = below the cardiac vulnerable period for a single beat (depending on phase).</li>
              <li>Compare with a fuse/MCB which trips at <em>amps</em>, only protecting the wiring — not the person.</li>
              <li>Standard in domestic, commercial & general clinical areas (UK BS 7671).</li>
            </ul>
          </div>
        </div>
  
        {/* Why theatres use LIM instead */}
        <div className="bg-secondary/30 rounded-lg border border-border p-4">
          <p className="text-sm font-semibold text-foreground mb-2">Why operating theatres use a Line Isolation Monitor (LIM) instead of an RCD</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-1.5 px-2 text-foreground"></th>
                  <th className="text-left py-1.5 px-2 text-foreground">RCD / RCCB</th>
                  <th className="text-left py-1.5 px-2 text-foreground">Isolation Tx + LIM</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/50">
                  <td className="py-1.5 px-2 font-medium text-foreground">Supply type</td>
                  <td className="py-1.5 px-2">Earthed mains (TN/TT)</td>
                  <td className="py-1.5 px-2">Floating (isolated) supply</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-1.5 px-2 font-medium text-foreground">Action on 1st fault</td>
                  <td className="py-1.5 px-2 text-[hsl(0_75%_50%)]">Cuts the supply &lt; 40 ms</td>
                  <td className="py-1.5 px-2 text-[hsl(140_50%_40%)]">Alarms only — supply continues</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-1.5 px-2 font-medium text-foreground">Faults to harm patient</td>
                  <td className="py-1.5 px-2">Single fault sufficient</td>
                  <td className="py-1.5 px-2">Two simultaneous faults required</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-1.5 px-2 font-medium text-foreground">Loss-of-power risk</td>
                  <td className="py-1.5 px-2 text-[hsl(0_75%_50%)]">Yes — pump/ventilator may stop mid-procedure</td>
                  <td className="py-1.5 px-2 text-[hsl(140_50%_40%)]">No — supply preserved during fault</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-1.5 px-2 font-medium text-foreground">Microshock protection</td>
                  <td className="py-1.5 px-2">No — 30 mA threshold is &gt;&gt; 100 µA VF threshold for intracardiac</td>
                  <td className="py-1.5 px-2">No — Type CF (&lt; 10 µA leakage) equipment still required</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-2 font-medium text-foreground">Where used</td>
                  <td className="py-1.5 px-2">Domestic, ward areas, ICU bedspaces (often)</td>
                  <td className="py-1.5 px-2">Theatres, cath labs, IR suites</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            <strong className="text-foreground">The fundamental trade-off:</strong> an RCD is brilliantly safe for ordinary mains use, but
            its safety mechanism — automatic disconnection — is itself a hazard if it cuts power to a CPB pump, ventilator, or
            monitor during surgery. Theatres therefore tolerate a single fault (alarm only) and rely on staff to fix it before a
            second fault occurs. Both systems still depend on Type CF equipment (&lt; 10 µA) for microshock protection.
          </p>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default RCDDiagram;
