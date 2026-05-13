import { useState, useEffect } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

type Scenario = "skin" | "intracardiac-safe" | "intracardiac-fault";

export const MicroshockDiagram = () => {
  const [scenario, setScenario] = useState<Scenario>("skin");
  const [t, setT] = useState(0);
  const [leakageUA, setLeakageUA] = useState(50); // microamps

  useEffect(() => {
    const id = setInterval(() => setT((x) => x + 1), 33);
    return () => clearInterval(id);
  }, []);

  // Effective current reaching myocardium (µA)
  const myocardialCurrent =
    scenario === "skin"
      ? leakageUA * 0.0001 // ~99.99% dissipated in skin / body tissues
      : leakageUA;          // direct intracardiac path — all of it

  const vfRisk = myocardialCurrent >= 100;
  const cfCompliant = leakageUA < 10;

  const W = 660;
  const H = 360;

  const flowing = true;
  const offset = flowing ? (t * 5) % 30 : 0;

  // Pulse for VF
  const vfPulse = vfRisk ? 0.5 + 0.5 * Math.sin(t * 0.4) : 1;

  return (
    <DiagramFigure
      id="microshock-diagram"
      title="Microshock"
      description="Auto-generated wrapper for the Microshock anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="w-full max-w-3xl mx-auto space-y-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            { id: "skin" as Scenario, label: "Macroshock — skin contact" },
            { id: "intracardiac-safe" as Scenario, label: "Intracardiac — Type CF (<10 µA)" },
            { id: "intracardiac-fault" as Scenario, label: "Intracardiac — faulty equipment" },
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setScenario(s.id);
                if (s.id === "intracardiac-safe") setLeakageUA(8);
                else if (s.id === "intracardiac-fault") setLeakageUA(150);
                else setLeakageUA(50);
              }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                scenario === s.id
                  ? "bg-physics/10 border-physics text-physics"
                  : "border-border text-muted-foreground hover:border-physics/40"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
  
        <div className="bg-card rounded-xl border border-border p-4">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
            {/* Faulty monitor / equipment */}
            <rect x={20} y={130} width={120} height={90} rx={6} fill="hsl(210 30% 96%)" stroke="hsl(215 25% 35%)" strokeWidth="1.5" />
            <text x={80} y={120} textAnchor="middle" fontSize="11" className="fill-foreground font-medium">Monitor / Pump</text>
            <text x={80} y={170} textAnchor="middle" fontSize="9" className="fill-muted-foreground">leakage current</text>
            <text x={80} y={185} textAnchor="middle" fontSize="13" className="fill-foreground font-bold">
              {leakageUA} µA
            </text>
            {/* Insulation fault marker */}
            <circle cx={130} cy={140} r={4} fill="hsl(45 100% 55%)">
              <animate attributeName="opacity" values="1;0.3;1" dur="0.8s" repeatCount="indefinite" />
            </circle>
  
            {/* Patient body */}
            <g>
              {/* Head */}
              <circle cx={400} cy={75} r={22} fill="hsl(20 50% 88%)" stroke="hsl(215 25% 35%)" strokeWidth="1" />
              {/* Torso */}
              <path d="M 360 100 Q 400 95 440 100 L 450 240 Q 400 250 350 240 Z" fill="hsl(210 60% 94%)" stroke="hsl(215 25% 35%)" strokeWidth="1" />
              {/* Heart */}
              <g transform="translate(395, 165)">
                <path
                  d="M 0 8 C -10 -2 -22 -2 -22 10 C -22 22 0 32 0 32 C 0 32 22 22 22 10 C 22 -2 10 -2 0 8 Z"
                  fill={vfRisk ? `hsl(0 ${70 + vfPulse * 20}% ${50 + vfPulse * 10}%)` : "hsl(0 60% 60%)"}
                  stroke="hsl(0 50% 35%)"
                  strokeWidth="1"
                  style={{ transform: `scale(${vfRisk ? 1 + vfPulse * 0.1 : 1})`, transformOrigin: "center", transition: "fill 0.1s" }}
                />
                <text x={0} y={50} textAnchor="middle" fontSize="9" className="fill-muted-foreground">heart</text>
              </g>
  
              {/* Skin contact pad (macroshock) */}
              {scenario === "skin" && (
                <>
                  <rect x={345} y={130} width={20} height={12} fill="hsl(220 30% 50%)" stroke="hsl(215 25% 25%)" strokeWidth="1" />
                  <text x={355} y={125} textAnchor="middle" fontSize="8" className="fill-muted-foreground">ECG pad</text>
                </>
              )}
  
              {/* CVP/PA catheter (intracardiac scenarios) */}
              {scenario !== "skin" && (
                <>
                  {/* Catheter from neck down to RA */}
                  <path
                    d="M 380 60 Q 385 100 395 165"
                    fill="none"
                    stroke="hsl(215 25% 30%)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 380 60 Q 385 100 395 165"
                    fill="none"
                    stroke="hsl(45 90% 70%)"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                  <text x={345} y={55} textAnchor="middle" fontSize="9" className="fill-muted-foreground">CVP / PA tip</text>
                  {/* Tip */}
                  <circle cx={395} cy={170} r={3} fill="hsl(45 100% 55%)" />
                </>
              )}
            </g>
  
            {/* Wire from monitor to patient */}
            <path
              d={
                scenario === "skin"
                  ? `M 140 175 L 345 136`
                  : `M 140 175 Q 250 100 380 60`
              }
              fill="none"
              stroke="hsl(215 25% 35%)"
              strokeWidth="2"
            />
            {/* Animated current */}
            <path
              d={
                scenario === "skin"
                  ? `M 140 175 L 345 136`
                  : `M 140 175 Q 250 100 380 60`
              }
              fill="none"
              stroke="hsl(45 100% 55%)"
              strokeWidth="2"
              strokeDasharray="5 10"
              strokeDashoffset={-offset}
              opacity="0.95"
            />
  
            {/* Earth return from feet */}
            <line x1={385} y1={245} x2={385} y2={300} stroke="hsl(215 25% 40%)" strokeWidth="1.5" />
            <line x1={415} y1={245} x2={415} y2={300} stroke="hsl(215 25% 40%)" strokeWidth="1.5" />
            <line x1={20} y1={310} x2={W - 20} y2={310} stroke="hsl(140 50% 30%)" strokeWidth="2" />
            {Array.from({ length: 13 }).map((_, i) => (
              <line key={i} x1={40 + i * 50} y1={310} x2={35 + i * 50} y2={318} stroke="hsl(140 50% 30%)" strokeWidth="1.5" />
            ))}
            <text x={W - 50} y={330} fontSize="10" className="fill-[hsl(140_50%_30%)] font-medium">EARTH</text>
  
            {/* Skin barrier indicator (only for macroshock) */}
            {scenario === "skin" && (
              <g transform="translate(330, 200)">
                <rect width="140" height="22" rx="3" fill="hsl(140 40% 92%)" stroke="hsl(140 50% 40%)" strokeWidth="1" />
                <text x="70" y="15" textAnchor="middle" fontSize="9" className="fill-[hsl(140_50%_25%)] font-medium">
                  Skin: ~100 kΩ — dissipates &gt;99.99%
                </text>
              </g>
            )}
  
            {/* Numeric panel */}
            <g transform="translate(490, 80)">
              <rect width="155" height="160" rx="6" fill="hsl(210 30% 98%)" stroke="hsl(215 25% 80%)" strokeWidth="1" />
              <text x="10" y="20" fontSize="10" className="fill-muted-foreground font-medium">Source leakage</text>
              <text x="10" y="36" fontSize="14" className="fill-foreground font-bold">{leakageUA} µA</text>
  
              <line x1="10" y1="46" x2="145" y2="46" stroke="hsl(215 25% 85%)" strokeWidth="0.75" />
  
              <text x="10" y="64" fontSize="10" className="fill-muted-foreground font-medium">At myocardium</text>
              <text x="10" y="82" fontSize="14"
                className={vfRisk ? "fill-[hsl(0_75%_45%)] font-bold" : "fill-foreground font-bold"}>
                {myocardialCurrent < 1
                  ? `${myocardialCurrent.toFixed(3)} µA`
                  : `${myocardialCurrent.toFixed(0)} µA`}
              </text>
  
              <line x1="10" y1="92" x2="145" y2="92" stroke="hsl(215 25% 85%)" strokeWidth="0.75" />
  
              <text x="10" y="110" fontSize="10" className="fill-muted-foreground font-medium">VF threshold</text>
              <text x="10" y="126" fontSize="11" className="fill-foreground">100 µA (intracardiac)</text>
  
              <rect x="10" y="135" width="135" height="18" rx="3"
                fill={vfRisk ? "hsl(0 75% 50%)" : cfCompliant ? "hsl(140 50% 40%)" : "hsl(45 90% 50%)"} />
              <text x="77.5" y="148" textAnchor="middle" fontSize="10" className="fill-white font-bold">
                {vfRisk ? "VF RISK" : cfCompliant ? "TYPE CF SAFE" : "BELOW THRESHOLD"}
              </text>
            </g>
  
            {/* Status banner */}
            <g transform="translate(20, 25)">
              <rect width="280" height="26" rx="4"
                fill={vfRisk ? "hsl(0 75% 50%)" : cfCompliant ? "hsl(140 50% 40%)" : "hsl(45 90% 50%)"} />
              <text x="140" y="17" textAnchor="middle" fontSize="11" className="fill-white font-semibold">
                {scenario === "skin" && "MACROSHOCK PATHWAY — skin protects"}
                {scenario === "intracardiac-safe" && "MICROSHOCK PATHWAY — Type CF protects"}
                {scenario === "intracardiac-fault" && "MICROSHOCK — VF INDUCED"}
              </text>
            </g>
          </svg>
  
          {/* Slider */}
          <div className="mt-3 px-2">
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-medium text-foreground">Equipment leakage current</label>
              <span className="text-xs font-mono text-muted-foreground">{leakageUA} µA</span>
            </div>
            <input
              type="range" min={1} max={500} value={leakageUA}
              onChange={(e) => setLeakageUA(Number(e.target.value))}
              className="w-full accent-physics"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground mt-0.5">
              <span>1 µA</span>
              <span className="text-[hsl(140_50%_40%)]">10 µA (Type CF)</span>
              <span className="text-[hsl(45_90%_45%)]">100 µA (Type B/BF)</span>
              <span className="text-[hsl(0_75%_45%)]">500 µA</span>
            </div>
          </div>
        </div>
  
        {/* Why microshock matters */}
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="bg-card rounded-lg border border-border p-3">
            <p className="text-sm font-semibold text-foreground mb-1">Why so little current is dangerous</p>
            <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
              <li>Skin impedance (~100 kΩ dry) normally limits current to harmless levels — this is <strong className="text-foreground">macroshock protection</strong>.</li>
              <li>A CVP/PA catheter, transvenous pacing wire, or saline-filled pressure line provides a <strong className="text-foreground">direct low-resistance path</strong> to the myocardium.</li>
              <li>Current is concentrated over a tiny endocardial area → very high <strong className="text-foreground">current density</strong>.</li>
              <li>As little as <strong className="text-foreground">100 µA at 50 Hz</strong> delivered during the relative refractory period (T-wave) can trigger <strong className="text-foreground">VF</strong>.</li>
              <li>That is <strong className="text-foreground">1000× less</strong> than the macroshock VF threshold (~100 mA).</li>
            </ul>
          </div>
          <div className="bg-card rounded-lg border border-border p-3">
            <p className="text-sm font-semibold text-foreground mb-1">How Type CF equipment protects</p>
            <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
              <li><strong className="text-foreground">Type B</strong>: body, no patient connection — leakage &lt; 100 µA.</li>
              <li><strong className="text-foreground">Type BF</strong>: floating patient circuit — leakage &lt; 100 µA. Suitable for skin/superficial use only.</li>
              <li><strong className="text-foreground">Type CF</strong>: cardiac floating — leakage &lt; <strong>10 µA</strong> (normal) and &lt; 50 µA (single fault). Mandatory for any device with a direct cardiac connection.</li>
              <li>The <strong className="text-foreground">'F' (floating)</strong> patient circuit is isolated from earth, so a mains contact elsewhere on the patient cannot drive current through the cardiac lead.</li>
              <li>Identified by the <strong className="text-foreground">heart-in-square symbol</strong> on the device.</li>
            </ul>
          </div>
        </div>
  
        <div className="bg-secondary/30 rounded-lg border border-border p-3">
          <p className="text-xs text-muted-foreground">
            <strong className="text-foreground">Sources of microshock in theatre/ICU:</strong> faulty monitor with elevated leakage,
            static discharge to a pacing wire, simultaneous touching of two earthed devices by staff (one hand on equipment, one on
            the catheter hub), wet pacing wire connections. <strong className="text-foreground">Mitigation:</strong> Type CF equipment
            throughout, isolated power supply (LIM), insulated pacing-wire terminals, equipotential bonding, never handle exposed
            conductors with bare hands.
          </p>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default MicroshockDiagram;
