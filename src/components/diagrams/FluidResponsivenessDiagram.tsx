import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DiagramFigure } from "./_shared/DiagramFigure";

const FluidResponsivenessDiagram = () => {
  const [selectedPredictor, setSelectedPredictor] = useState<string | null>(null);
  const [selectedDynamic, setSelectedDynamic] = useState<string | null>(null);

  const dynamicPredictors = [
    {
      id: "ppv",
      name: "Pulse Pressure Variation (PPV)",
      threshold: ">13% = fluid responsive",
      mechanism: "PPV = (PPmax − PPmin) / PPmean × 100 over one respiratory cycle. Positive pressure ventilation cyclically ↓preload → PP varies. Greater variation = more preload-dependent (steep Starling curve).",
      requirements: "Mechanically ventilated, VT ≥8 ml/kg, sinus rhythm, closed chest, no spontaneous breathing. RR >30 may reduce reliability.",
      limitations: "Unreliable: spontaneous breathing, arrhythmias (AF), open chest, low VT ventilation (<8 ml/kg), ↑intra-abdominal pressure, RV failure, ARDS with protective ventilation.",
      evidence: "Meta-analysis: sensitivity 88%, specificity 89% for predicting ↑CO with fluid bolus. Grey zone 9–13% — equivocal.",
      svg: (
        <svg viewBox="0 0 400 150" className="w-full h-auto">
          <line x1="40" y1="120" x2="380" y2="120" stroke="hsl(var(--border))" strokeWidth="1" />
          <line x1="40" y1="10" x2="40" y2="120" stroke="hsl(var(--border))" strokeWidth="1" />
          <text x="210" y="145" textAnchor="middle" className="fill-muted-foreground" fontSize="8">Time →</text>
          <text x="12" y="65" textAnchor="middle" className="fill-muted-foreground" fontSize="8" transform="rotate(-90,12,65)">Arterial Pressure</text>
          {/* Respiratory cycle envelope */}
          <path d="M 50,55 Q 100,35 150,55 Q 200,75 250,55 Q 300,35 350,55" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.75" strokeDasharray="4,3" />
          <path d="M 50,95 Q 100,80 150,95 Q 200,110 250,95 Q 300,80 350,95" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.75" strokeDasharray="4,3" />
          {/* Arterial waveforms with varying PP */}
          {[0,30,60,90,120,150,180,210,240,270,300].map((x, i) => {
            const phase = Math.sin((i / 11) * Math.PI * 2);
            const ppHalf = 18 + phase * 8;
            const mid = 75 - phase * 5;
            return (
              <path key={i} d={`M ${50+x},${mid+ppHalf} L ${55+x},${mid-ppHalf} Q ${58+x},${mid-ppHalf-5} ${60+x},${mid-ppHalf+3} L ${65+x},${mid+ppHalf-2} Q ${68+x},${mid+ppHalf+2} ${70+x},${mid+ppHalf}`}
                fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" />
            );
          })}
          {/* Labels */}
          <text x="150" y="25" fontSize="8" className="fill-primary" fontWeight="600" textAnchor="middle">PPmax</text>
          <text x="250" y="25" fontSize="8" fill="hsl(0,70%,55%)" fontWeight="600" textAnchor="middle">PPmin</text>
          {/* Ventilation annotation */}
          <text x="320" y="18" fontSize="7" className="fill-muted-foreground">Inspiration</text>
        </svg>
      ),
    },
    {
      id: "svv",
      name: "Stroke Volume Variation (SVV)",
      threshold: ">12% = fluid responsive",
      mechanism: "SVV = (SVmax − SVmin) / SVmean × 100. Measured by pulse contour analysis (LiDCO, FloTrac, PiCCO) or oesophageal Doppler. Same physiological basis as PPV — heart-lung interaction.",
      requirements: "Same as PPV: mechanical ventilation, VT ≥8 ml/kg, sinus rhythm, closed chest. Requires calibrated or uncalibrated pulse contour device.",
      limitations: "Same as PPV. Additionally: device-specific algorithms may differ. Uncalibrated devices (FloTrac) less accurate in vasoplegic states. Calibration drift with PiCCO.",
      evidence: "Similar predictive value to PPV. SVV >12% predicts fluid responsiveness with ~85% accuracy. Some evidence SVV slightly less specific than PPV.",
      svg: (
        <svg viewBox="0 0 400 130" className="w-full h-auto">
          <line x1="40" y1="110" x2="380" y2="110" stroke="hsl(var(--border))" strokeWidth="1" />
          <text x="210" y="128" textAnchor="middle" className="fill-muted-foreground" fontSize="8">Respiratory cycles →</text>
          {/* SV bars with variation */}
          {[0,1,2,3,4,5,6,7,8,9,10,11].map((i) => {
            const phase = Math.sin((i / 12) * Math.PI * 2);
            const h = 55 + phase * 18;
            const color = h > 65 ? "hsl(var(--primary))" : "hsl(25,80%,50%)";
            return (
              <rect key={i} x={55 + i * 27} y={110 - h} width="18" height={h} fill={color} opacity="0.6" rx="2" />
            );
          })}
          <text x="100" y="30" fontSize="8" className="fill-primary" fontWeight="600">SVmax</text>
          <text x="240" y="60" fontSize="8" fill="hsl(25,80%,50%)" fontWeight="600">SVmin</text>
        </svg>
      ),
    },
    {
      id: "plr",
      name: "Passive Leg Raise (PLR)",
      threshold: "↑CO ≥10% = fluid responsive",
      mechanism: "Raise legs to 45° from supine (or from 45° head-up to flat with legs up). Autotransfuses ~300 mL venous blood from legs/splanchnic. Reversible 'fluid challenge' — no actual fluid given. Effect peaks at 30–60 seconds.",
      requirements: "Requires REAL-TIME CO monitoring (not just BP). Pulse contour, oesophageal Doppler, bioreactance, echocardiography. Must measure CO/SV change, not just BP.",
      limitations: "Unreliable: raised intra-abdominal pressure (laparoscopy, compartment syndrome), compression stockings already on, lower limb amputation. Cannot use in unstable spine/pelvis.",
      evidence: "Meta-analysis: sensitivity 85%, specificity 91%. Works in spontaneous breathing, arrhythmias, low VT — overcomes all PPV/SVV limitations. Gold standard bedside test.",
      svg: (
        <svg viewBox="0 0 400 130" className="w-full h-auto">
          {/* Bed */}
          <rect x="60" y="75" width="160" height="8" fill="hsl(var(--border))" rx="2" />
          {/* Patient body */}
          <ellipse cx="110" cy="68" rx="30" ry="8" fill="hsl(var(--primary))" opacity="0.3" />
          {/* Raised legs */}
          <line x1="160" y1="72" x2="220" y2="35" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
          <text x="230" y="32" fontSize="8" className="fill-primary" fontWeight="600">45°</text>
          {/* Arrow showing blood return */}
          <path d="M 200,45 Q 170,55 130,60" fill="none" stroke="hsl(0,70%,55%)" strokeWidth="1.5" markerEnd="url(#arrowRed)" />
          <defs><marker id="arrowRed" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M 0,0 L 6,3 L 0,6 Z" fill="hsl(0,70%,55%)" /></marker></defs>
          <text x="165" y="48" fontSize="7" fill="hsl(0,70%,55%)" fontWeight="600">~300 mL</text>
          {/* CO trace */}
          <text x="280" y="25" fontSize="8" className="fill-foreground" fontWeight="600">CO response:</text>
          <rect x="280" y="32" width="80" height="25" fill="hsl(142,60%,45%)" opacity="0.15" rx="3" />
          <text x="320" y="48" fontSize="9" fill="hsl(142,60%,45%)" fontWeight="700" textAnchor="middle">≥10% = responsive</text>
          <rect x="280" y="62" width="80" height="25" fill="hsl(0,70%,50%)" opacity="0.15" rx="3" />
          <text x="320" y="78" fontSize="9" fill="hsl(0,70%,55%)" fontWeight="700" textAnchor="middle">&lt;10% = not responsive</text>
        </svg>
      ),
    },
    {
      id: "eev",
      name: "End-Expiratory Occlusion (EEO)",
      threshold: "↑CO ≥5% during 15s hold = responsive",
      mechanism: "Hold ventilator at end-expiration for 15 seconds. Removes cyclical impediment to venous return → ↑preload. If CO rises ≥5%, patient is preload-responsive. Can combine with end-inspiratory occlusion for greater sensitivity.",
      requirements: "Mechanically ventilated. Patient must tolerate 15-second pause without triggering. Requires real-time CO monitoring.",
      limitations: "Patient with high respiratory drive may not tolerate pause. Requires cooperative patient or adequate sedation. Less validated than PLR.",
      evidence: "Sensitivity ~87%, specificity ~100% (limited studies). Useful when PLR cannot be performed (pelvic fracture, intra-abdominal hypertension).",
      svg: (
        <svg viewBox="0 0 400 120" className="w-full h-auto">
          <line x1="40" y1="80" x2="380" y2="80" stroke="hsl(var(--border))" strokeWidth="1" />
          <text x="210" y="115" textAnchor="middle" className="fill-muted-foreground" fontSize="8">Time →</text>
          {/* Normal ventilation */}
          {[0,1,2].map((i) => (
            <path key={i} d={`M ${50+i*50},80 L ${50+i*50},30 L ${75+i*50},30 L ${75+i*50},80`} fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" />
          ))}
          {/* Occlusion hold */}
          <rect x="200" y="25" width="80" height="60" fill="hsl(25,80%,50%)" opacity="0.1" rx="3" />
          <line x1="200" y1="80" x2="280" y2="80" stroke="hsl(25,80%,50%)" strokeWidth="2" />
          <text x="240" y="20" fontSize="8" fill="hsl(25,80%,50%)" fontWeight="600" textAnchor="middle">15s EEO hold</text>
          <text x="240" y="55" fontSize="7" fill="hsl(25,80%,50%)" textAnchor="middle">↑Venous return</text>
          {/* Resume */}
          {[0,1].map((i) => (
            <path key={i} d={`M ${290+i*45},80 L ${290+i*45},30 L ${315+i*45},30 L ${315+i*45},80`} fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" />
          ))}
        </svg>
      ),
    },
  ];

  const staticVsDynamic = [
    { parameter: "CVP", type: "Static", predicts: "Poor", notes: "Cannot predict fluid responsiveness. A low CVP does NOT mean the patient will respond to fluids. AUC ~0.55 — no better than coin toss." },
    { parameter: "PAOP (wedge)", type: "Static", predicts: "Poor", notes: "Pulmonary artery occlusion pressure. Same limitations as CVP. Does not predict preload responsiveness. Useful for LV filling pressure assessment only." },
    { parameter: "LVEDV / GEDV", type: "Static", predicts: "Moderate", notes: "Global end-diastolic volume (PiCCO). Better than pressures but still static — a snapshot, not a dynamic test." },
    { parameter: "PPV", type: "Dynamic", predicts: "Excellent", notes: "AUC 0.94. Requires: MV, VT≥8, sinus rhythm, closed chest. >13% responsive." },
    { parameter: "SVV", type: "Dynamic", predicts: "Excellent", notes: "AUC 0.84. Same requirements as PPV. >12% responsive. Device-dependent." },
    { parameter: "PLR + CO", type: "Dynamic", predicts: "Excellent", notes: "AUC 0.95. Works in spontaneous breathing, AF, low VT. ≥10% ↑CO = responsive. Requires real-time CO monitor." },
    { parameter: "Mini fluid challenge", type: "Dynamic", predicts: "Good", notes: "100 mL crystalloid over 1 min. ↑SV ≥6% = responsive (echo VTI). Smaller volume than traditional challenge (250–500 mL)." },
  ];

  const fluidChallenge = {
    traditional: { volume: "250–500 mL crystalloid", time: "Over 10–15 minutes", target: "↑SV or CO ≥10–15%", monitor: "Re-assess after each bolus. Stop if no response or signs of overload." },
    mini: { volume: "100 mL crystalloid", time: "Over 1 minute", target: "↑VTI ≥10% (echo) or ↑SV ≥6%", monitor: "Less fluid committed. Requires sensitive CO monitoring (echo or pulse contour)." },
  };

  return (
    <div className="my-6 p-4 bg-muted/30 rounded-xl border border-border">
      <h3 className="text-lg font-bold text-foreground mb-1">Fluid Responsiveness & Haemodynamic Monitoring</h3>
      <p className="text-sm text-muted-foreground mb-4">Dynamic predictors, passive leg raise, and fluid challenge interpretation</p>

      <Tabs defaultValue="dynamic" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="dynamic" className="text-xs">Dynamic Tests</TabsTrigger>
          <TabsTrigger value="compare" className="text-xs">Static vs Dynamic</TabsTrigger>
          <TabsTrigger value="challenge" className="text-xs">Fluid Challenge</TabsTrigger>
        </TabsList>

        <TabsContent value="dynamic">
          <div className="grid grid-cols-2 gap-2 mb-3">
            {dynamicPredictors.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedDynamic(selectedDynamic === p.id ? null : p.id)}
                className={`p-2 rounded-lg border text-left transition-all text-xs ${selectedDynamic === p.id ? "border-primary bg-primary/10 ring-1 ring-primary" : "border-border hover:border-primary/50"}`}
              >
                <span className="font-bold text-foreground">{p.name}</span>
                <p className="text-muted-foreground mt-0.5">{p.threshold}</p>
              </button>
            ))}
          </div>

          {selectedDynamic && (() => {
            const p = dynamicPredictors.find((x) => x.id === selectedDynamic)!;
            return (
    <DiagramFigure
      id="fluid-responsiveness-diagram"
      title="Fluid responsiveness"
      description="Auto-generated wrapper for the Fluid responsiveness anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
                    <div className="animate-fade-in space-y-3">
                  <div className="bg-background rounded-lg border border-border p-3">{p.svg}</div>
                  <div className="p-3 rounded-lg border border-primary/30 bg-primary/5">
                    <p className="font-bold text-foreground text-sm">{p.name}</p>
                    <p className="text-xs text-primary font-semibold mt-1">{p.threshold}</p>
                    <p className="text-xs text-muted-foreground mt-1">{p.mechanism}</p>
                    <div className="grid gap-2 mt-2 text-xs">
                      <div className="p-2 rounded bg-background border border-border">
                        <span className="font-semibold text-foreground">Requirements: </span>
                        <span className="text-muted-foreground">{p.requirements}</span>
                      </div>
                      <div className="p-2 rounded bg-background border border-border">
                        <span className="font-semibold text-foreground">Limitations: </span>
                        <span className="text-muted-foreground">{p.limitations}</span>
                      </div>
                      <div className="p-2 rounded bg-background border border-border">
                        <span className="font-semibold text-foreground">Evidence: </span>
                        <span className="text-muted-foreground">{p.evidence}</span>
                      </div>
                    </div>
                  </div>
                </div>
    </DiagramFigure>
  );
          })()}

          {!selectedDynamic && (
            <div className="p-3 rounded bg-primary/5 border border-primary/20 text-xs text-muted-foreground">
              <strong className="text-foreground">Frank-Starling principle: </strong>
              Fluid responsiveness means the patient is on the steep part of the Starling curve — ↑preload will ↑SV. On the flat part, fluid causes harm (oedema) without benefit. ~50% of ICU patients are NOT fluid responsive. Tap a test above.
            </div>
          )}
        </TabsContent>

        <TabsContent value="compare">
          <p className="text-xs text-muted-foreground mb-3">Static parameters (CVP, PAOP) cannot reliably predict fluid responsiveness</p>
          <div className="space-y-1.5">
            {staticVsDynamic.map((s, i) => (
              <button
                key={i}
                onClick={() => setSelectedPredictor(selectedPredictor === s.parameter ? null : s.parameter)}
                className={`w-full p-2.5 rounded-lg border text-left transition-all text-xs ${selectedPredictor === s.parameter ? "border-primary bg-primary/10 ring-1 ring-primary" : "border-border hover:border-primary/50"}`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground">{s.parameter}</span>
                  <div className="flex gap-2">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${s.type === "Dynamic" ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`}>
                      {s.type}
                    </span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                      s.predicts === "Excellent" ? "bg-green-500/15 text-green-600" :
                      s.predicts === "Good" ? "bg-blue-500/15 text-blue-600" :
                      s.predicts === "Moderate" ? "bg-yellow-500/15 text-yellow-600" :
                      "bg-red-500/15 text-red-600"
                    }`}>
                      {s.predicts}
                    </span>
                  </div>
                </div>
                {selectedPredictor === s.parameter && (
                  <p className="text-muted-foreground mt-1.5 animate-fade-in">{s.notes}</p>
                )}
              </button>
            ))}
          </div>

          <div className="mt-3 p-2 rounded bg-destructive/5 border border-destructive/20 text-xs text-muted-foreground">
            <strong className="text-foreground">⚠ CVP myth: </strong>
            Marik & Cavallazzi (2013): CVP cannot predict fluid responsiveness (AUC 0.56). A CVP of 2 or 12 gives no useful information about whether fluids will increase CO. Stop using CVP to guide fluid therapy.
          </div>
        </TabsContent>

        <TabsContent value="challenge">
          <div className="space-y-3">
            <div className="p-3 rounded-lg border border-border">
              <p className="font-bold text-foreground text-sm">Traditional Fluid Challenge</p>
              <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                <div className="p-2 rounded bg-muted/50"><span className="text-muted-foreground">Volume:</span> <span className="font-semibold text-foreground">{fluidChallenge.traditional.volume}</span></div>
                <div className="p-2 rounded bg-muted/50"><span className="text-muted-foreground">Rate:</span> <span className="font-semibold text-foreground">{fluidChallenge.traditional.time}</span></div>
                <div className="p-2 rounded bg-muted/50"><span className="text-muted-foreground">Target:</span> <span className="font-semibold text-foreground">{fluidChallenge.traditional.target}</span></div>
                <div className="p-2 rounded bg-muted/50"><span className="text-muted-foreground">Rule:</span> <span className="font-semibold text-foreground">{fluidChallenge.traditional.monitor}</span></div>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-border">
              <p className="font-bold text-foreground text-sm">Mini Fluid Challenge</p>
              <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                <div className="p-2 rounded bg-muted/50"><span className="text-muted-foreground">Volume:</span> <span className="font-semibold text-foreground">{fluidChallenge.mini.volume}</span></div>
                <div className="p-2 rounded bg-muted/50"><span className="text-muted-foreground">Rate:</span> <span className="font-semibold text-foreground">{fluidChallenge.mini.time}</span></div>
                <div className="p-2 rounded bg-muted/50"><span className="text-muted-foreground">Target:</span> <span className="font-semibold text-foreground">{fluidChallenge.mini.target}</span></div>
                <div className="p-2 rounded bg-muted/50"><span className="text-muted-foreground">Note:</span> <span className="font-semibold text-foreground">{fluidChallenge.mini.monitor}</span></div>
              </div>
            </div>

            {/* Frank-Starling SVG */}
            <div className="bg-background rounded-lg border border-border p-3">
              <svg viewBox="0 0 400 170" className="w-full h-auto">
                <line x1="50" y1="140" x2="380" y2="140" stroke="hsl(var(--border))" strokeWidth="1" />
                <line x1="50" y1="15" x2="50" y2="140" stroke="hsl(var(--border))" strokeWidth="1" />
                <text x="215" y="160" textAnchor="middle" className="fill-muted-foreground" fontSize="9">Preload →</text>
                <text x="15" y="78" textAnchor="middle" className="fill-muted-foreground" fontSize="9" transform="rotate(-90,15,78)">Stroke Volume →</text>
                {/* Starling curve */}
                <path d="M 55,135 Q 120,80 180,45 Q 250,20 350,18" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" />
                {/* Steep part */}
                <circle cx="110" cy="95" r="6" fill="hsl(142,60%,45%)" opacity="0.4" />
                <text x="110" y="115" fontSize="8" fill="hsl(142,60%,45%)" fontWeight="600" textAnchor="middle">Responsive</text>
                <text x="110" y="125" fontSize="7" fill="hsl(142,60%,45%)" textAnchor="middle">(steep curve)</text>
                {/* Flat part */}
                <circle cx="300" cy="20" r="6" fill="hsl(0,70%,55%)" opacity="0.4" />
                <text x="300" y="40" fontSize="8" fill="hsl(0,70%,55%)" fontWeight="600" textAnchor="middle">Not responsive</text>
                <text x="300" y="50" fontSize="7" fill="hsl(0,70%,55%)" textAnchor="middle">(flat plateau)</text>
                {/* Arrows */}
                <path d="M 95,100 L 125,85" fill="none" stroke="hsl(142,60%,45%)" strokeWidth="1.5" markerEnd="url(#arrowG)" />
                <defs><marker id="arrowG" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M 0,0 L 6,3 L 0,6 Z" fill="hsl(142,60%,45%)" /></marker></defs>
                <text x="130" y="80" fontSize="7" fill="hsl(142,60%,45%)">↑SV</text>
                <path d="M 285,22 L 315,20" fill="none" stroke="hsl(0,70%,55%)" strokeWidth="1.5" markerEnd="url(#arrowR)" />
                <defs><marker id="arrowR" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M 0,0 L 6,3 L 0,6 Z" fill="hsl(0,70%,55%)" /></marker></defs>
                <text x="330" y="15" fontSize="7" fill="hsl(0,70%,55%)">No ↑SV, ↑oedema</text>
              </svg>
            </div>

            <div className="p-2 rounded bg-primary/5 border border-primary/20 text-xs text-muted-foreground">
              <strong className="text-foreground">CLASSIC trial approach: </strong>
              Restrict fluids in septic shock after initial resuscitation. After first bolus, use dynamic assessment before each subsequent fluid bolus. Four signs of fluid intolerance: ↑CVP, ↑EVLW, ↑lactate despite fluids, ↓PaO₂/FiO₂.
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FluidResponsivenessDiagram;
