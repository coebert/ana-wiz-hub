import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DiagramFigure } from "./_shared/DiagramFigure";

const PACDiagram = () => {
  const [selectedChamber, setSelectedChamber] = useState<string | null>(null);
  const [selectedApp, setSelectedApp] = useState<string | null>(null);

  const chambers = [
    {
      id: "ra",
      name: "Right Atrium",
      depth: "20 cm (IJ) / 35 cm (femoral)",
      pressure: "0–8 mmHg (mean)",
      waveform: "a wave (atrial contraction), c wave (tricuspid closure), x descent (atrial relaxation), v wave (atrial filling against closed TV), y descent (TV opens, passive emptying).",
      abnormal: "Giant a waves: tricuspid stenosis, RV hypertrophy, pulmonary HTN. Cannon a waves: complete heart block, VT (atrium contracts against closed TV). Giant v waves: tricuspid regurgitation. Absent a waves: AF.",
      tips: "Confirm position by waveform — should see a and v waves with x and y descents. If no waveform, catheter coiled or not advanced enough.",
      svg: (
        <svg viewBox="0 0 360 100" className="w-full h-auto">
          <line x1="30" y1="60" x2="340" y2="60" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="3,2" />
          <text x="15" y="63" fontSize="7" className="fill-muted-foreground">0</text>
          {/* RA waveform — low amplitude a, c, v waves */}
          <path d="M 40,60 Q 50,60 55,50 Q 58,45 60,50 L 65,58 Q 70,55 73,52 Q 76,55 80,58 L 90,60 Q 100,60 110,52 Q 115,48 118,52 L 125,60 Q 140,60 155,50 Q 158,45 160,50 L 165,58 Q 170,55 173,52 Q 176,55 180,58 L 190,60 Q 200,60 210,52 Q 215,48 218,52 L 225,60 Q 240,60 255,50 Q 258,45 260,50 L 265,58 Q 270,55 273,52 Q 276,55 280,58 L 290,60" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
          {/* Labels */}
          <text x="55" y="38" fontSize="8" className="fill-primary" fontWeight="600">a</text>
          <text x="73" y="46" fontSize="7" fill="hsl(25,80%,50%)">c</text>
          <text x="85" y="52" fontSize="7" className="fill-muted-foreground">x</text>
          <text x="112" y="42" fontSize="8" className="fill-primary" fontWeight="600">v</text>
          <text x="125" y="55" fontSize="7" className="fill-muted-foreground">y</text>
          <text x="180" y="85" textAnchor="middle" fontSize="8" className="fill-foreground" fontWeight="600">RA: 0–8 mmHg</text>
        </svg>
      ),
    },
    {
      id: "rv",
      name: "Right Ventricle",
      depth: "30 cm (IJ) / 45 cm (femoral)",
      pressure: "15–30 / 0–8 mmHg (systolic/diastolic)",
      waveform: "Sudden ↑ in systolic pressure (15–30 mmHg) with diastolic pressure near zero. Sharp upstroke and downstroke. RV diastolic pressure ≈ RA pressure (0–8 mmHg).",
      abnormal: "↑RV systolic: pulmonary HTN, pulmonary stenosis. ↑RV diastolic (>8): RV failure, tamponade, constrictive pericarditis (dip-and-plateau / square root sign). RV diastolic = RA pressure if no tricuspid disease.",
      tips: "Catheter should pass through quickly — prolonged time in RV risks arrhythmias. Inflate balloon before advancing through RV. Deflate balloon if persistent ectopics. VT/VF risk highest here.",
      svg: (
        <svg viewBox="0 0 360 100" className="w-full h-auto">
          <line x1="30" y1="75" x2="340" y2="75" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="3,2" />
          <text x="15" y="78" fontSize="7" className="fill-muted-foreground">0</text>
          {/* RV waveform — sharp peaks */}
          {[0, 100, 200].map((o) => (
            <path key={o} d={`M ${40+o},75 L ${50+o},73 L ${60+o},25 L ${75+o},25 L ${85+o},73 L ${95+o},75 L ${130+o},75`} fill="none" stroke="hsl(0,70%,55%)" strokeWidth="2" />
          ))}
          <text x="75" y="18" fontSize="8" fill="hsl(0,70%,55%)" fontWeight="600">Systolic 15–30</text>
          <text x="130" y="88" fontSize="7" className="fill-muted-foreground">Diastolic ≈ 0–8</text>
          <text x="180" y="98" textAnchor="middle" fontSize="8" className="fill-foreground" fontWeight="600">RV: 15–30 / 0–8 mmHg</text>
        </svg>
      ),
    },
    {
      id: "pa",
      name: "Pulmonary Artery",
      depth: "40 cm (IJ) / 55 cm (femoral)",
      pressure: "15–30 / 8–15 mmHg (systolic/diastolic), mean 10–20",
      waveform: "Systolic pressure similar to RV (15–30 mmHg). KEY CHANGE: diastolic pressure rises (8–15 mmHg vs 0–8 in RV) — this is the diagnostic transition. Dicrotic notch present (pulmonary valve closure). Pulse pressure narrower than RV.",
      abnormal: "↑PA systolic + diastolic: pulmonary HTN (primary or secondary). PA diastolic > PAOP by >5 mmHg: pulmonary vascular disease. PA diastolic ≈ PAOP: normal pulmonary vasculature.",
      tips: "Transition RV→PA recognised by ↑diastolic pressure and appearance of dicrotic notch. If systolic pressure drops, catheter may have fallen back into RV. PA diastolic approximates PAOP in normal lungs.",
      svg: (
        <svg viewBox="0 0 360 100" className="w-full h-auto">
          <line x1="30" y1="75" x2="340" y2="75" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="3,2" />
          <line x1="30" y1="55" x2="340" y2="55" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="2,3" />
          <text x="15" y="78" fontSize="7" className="fill-muted-foreground">0</text>
          <text x="345" y="58" fontSize="6" className="fill-muted-foreground">8–15</text>
          {/* PA waveform — same systolic, higher diastolic, dicrotic notch */}
          {[0, 110, 220].map((o) => (
            <path key={o} d={`M ${40+o},55 L ${48+o},53 L ${55+o},25 L ${68+o},25 L ${75+o},42 Q ${78+o},48 ${80+o},44 L ${85+o},53 L ${95+o},55`} fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
          ))}
          <text x="65" y="18" fontSize="8" className="fill-primary" fontWeight="600">Systolic 15–30</text>
          <text x="82" y="38" fontSize="6" fill="hsl(25,80%,50%)" fontWeight="600">Dicrotic notch</text>
          <text x="180" y="92" textAnchor="middle" fontSize="8" className="fill-foreground" fontWeight="600">PA: 15–30 / 8–15 mmHg</text>
        </svg>
      ),
    },
    {
      id: "paop",
      name: "PAOP (Wedge)",
      depth: "45–55 cm (IJ) — balloon inflated",
      pressure: "6–12 mmHg (mean)",
      waveform: "Balloon inflated → 'wedges' in distal PA branch → damped trace with a and v waves (like RA but representing LA). Mean PAOP ≈ LAP ≈ LVEDP (in absence of mitral disease). Used to estimate LV preload.",
      abnormal: "↑PAOP (>18): LV failure, mitral stenosis, fluid overload, tamponade. Giant v waves: mitral regurgitation (can mimic PA waveform — but no dicrotic notch). ↓PAOP (<6): hypovolaemia.",
      tips: "Never leave balloon inflated — risk of PA rupture (mortality >50%). Inflate only for measurement (max 15 seconds). Overwedging = catheter too distal — pull back with balloon deflated. West zone III position required for accurate readings.",
      svg: (
        <svg viewBox="0 0 360 100" className="w-full h-auto">
          <line x1="30" y1="55" x2="340" y2="55" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="3,2" />
          <text x="15" y="58" fontSize="7" className="fill-muted-foreground">0</text>
          {/* Transition from PA to wedge */}
          <path d="M 40,45 L 48,43 L 55,20 L 68,20 L 75,35 Q 78,40 80,37 L 85,45" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity="0.4" />
          {/* Damped wedge trace */}
          <path d="M 95,46 Q 110,46 120,40 Q 125,38 128,40 L 135,46 Q 145,46 155,42 Q 158,40 160,42 L 170,46 Q 180,46 190,40 Q 195,38 198,40 L 205,46 Q 215,46 225,42 Q 228,40 230,42 L 240,46 Q 250,46 260,40 Q 265,38 268,40 L 275,46 Q 285,46 300,46" fill="none" stroke="hsl(142,60%,45%)" strokeWidth="2" />
          {/* Balloon inflate marker */}
          <line x1="90" y1="15" x2="90" y2="55" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="2,2" />
          <text x="90" y="12" textAnchor="middle" fontSize="7" fill="hsl(142,60%,45%)" fontWeight="600">Balloon inflated</text>
          <text x="120" y="34" fontSize="7" fill="hsl(142,60%,45%)">a</text>
          <text x="155" y="36" fontSize="7" fill="hsl(142,60%,45%)">v</text>
          <text x="200" y="65" textAnchor="middle" fontSize="8" className="fill-foreground" fontWeight="600">PAOP: 6–12 mmHg</text>
          <text x="60" y="65" fontSize="7" className="fill-muted-foreground">PA trace</text>
        </svg>
      ),
    },
  ];

  const applications = [
    { id: "diagnosis", name: "Shock Differentiation", detail: "Cardiogenic: ↑PAOP, ↓CO, ↑SVR. Hypovolaemic: ↓PAOP, ↓CO, ↑SVR. Distributive (sepsis): ↓SVR, ↑CO, ↓/normal PAOP. Obstructive (PE/tamponade): ↑CVP, ↓CO, equalisation of diastolic pressures in tamponade." },
    { id: "phtn", name: "Pulmonary Hypertension", detail: "mPAP ≥20 mmHg at rest (2022 ESC definition, previously ≥25). Pre-capillary: PAOP ≤15, PVR >2 WU. Post-capillary: PAOP >15. Combined: PAOP >15 + PVR >2 WU. PAC is the gold standard for PH diagnosis and classification." },
    { id: "mr", name: "Mitral Regurgitation", detail: "Giant v waves on PAOP trace. V wave height correlates with MR severity (may exceed 50 mmHg in acute MR). Can mimic PA waveform — distinguish by absence of dicrotic notch and timing relative to ECG." },
    { id: "shunt", name: "Intracardiac Shunt", detail: "Step-up in O₂ saturation indicates left-to-right shunt. RA to RV step-up >7% = VSD. IVC/SVC to RA step-up = ASD. Qp:Qs ratio calculated from saturations. PAC essential for shunt quantification." },
    { id: "svo2", name: "Mixed Venous O₂ (SvO₂)", detail: "True mixed venous sample from PA (not ScvO₂ from CVC). Normal SvO₂ 65–75%. Low SvO₂: ↑O₂ extraction — shock, anaemia, ↑VO₂. High SvO₂: ↓extraction — sepsis (mitochondrial dysfunction), cyanide, L→R shunt, high FiO₂." },
    { id: "cardiac-surgery", name: "Cardiac Surgery / Transplant", detail: "Routine in cardiac surgery in many centres. Post-CPB RV dysfunction assessment. Transplant recipients: surveillance RHC for rejection monitoring. Guides inotrope/vasopressor titration. Real-time PA pressures during valve surgery." },
  ];

  const trials = [
    { trial: "PAC-Man (2005)", design: "UK RCT, 1041 ICU patients", result: "No difference in hospital mortality (68% vs 66%). No evidence of benefit or harm from routine PAC use. Changed practice worldwide.", conclusion: "PAC does NOT improve outcomes when used routinely." },
    { trial: "ESCAPE (2005)", design: "Heart failure patients, 433 patients", result: "PAC-guided therapy vs clinical assessment alone — no mortality difference. ↑Adverse events in PAC group. Some benefit in exercise tolerance.", conclusion: "PAC not recommended routinely in heart failure management." },
    { trial: "FACTT (2006)", design: "ARDS fluid management, 1000 patients", result: "Conservative vs liberal fluid strategy (using PAC or CVC). Conservative strategy improved oxygenation and ventilator-free days. PAC provided no additional benefit over CVC-guided management.", conclusion: "CVC-guided fluid management is sufficient in ARDS." },
  ];

  return (
    <DiagramFigure
      id="pac-diagram"
      title="PAC"
      description="Auto-generated wrapper for the PAC anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
          <div className="my-6 p-4 bg-muted/30 rounded-xl border border-border">
        <h3 className="text-lg font-bold text-foreground mb-1">Pulmonary Artery Catheter (Swan-Ganz)</h3>
        <p className="text-sm text-muted-foreground mb-4">Insertion waveforms, clinical applications, and evidence</p>
  
        <Tabs defaultValue="waveforms" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="waveforms" className="text-xs">Waveforms</TabsTrigger>
            <TabsTrigger value="applications" className="text-xs">Applications</TabsTrigger>
            <TabsTrigger value="evidence" className="text-xs">Evidence</TabsTrigger>
          </TabsList>
  
          <TabsContent value="waveforms">
            {/* Position SVG */}
            <div className="bg-background rounded-lg border border-border p-3 mb-3">
              <svg viewBox="0 0 400 130" className="w-full h-auto">
                <text x="200" y="15" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="700">Catheter Path & Depth (IJ approach)</text>
                {/* Chambers as connected boxes */}
                {[
                  { name: "RA", depth: "20cm", x: 30, color: "hsl(200,70%,50%)" },
                  { name: "RV", depth: "30cm", x: 120, color: "hsl(0,70%,55%)" },
                  { name: "PA", depth: "40cm", x: 210, color: "hsl(var(--primary))" },
                  { name: "PAOP", depth: "45–55cm", x: 300, color: "hsl(142,60%,45%)" },
                ].map((c, i) => (
                  <g key={c.name}>
                    <rect x={c.x} y="30" width="70" height="45" rx="6" fill={c.color} opacity="0.12" stroke={c.color} strokeWidth={selectedChamber === chambers[i].id ? "2.5" : "1.5"} className="cursor-pointer" onClick={() => setSelectedChamber(selectedChamber === chambers[i].id ? null : chambers[i].id)} />
                    <text x={c.x + 35} y="50" textAnchor="middle" fill={c.color} fontSize="12" fontWeight="700">{c.name}</text>
                    <text x={c.x + 35} y="68" textAnchor="middle" fill={c.color} fontSize="7">{c.depth}</text>
                    {i < 3 && <line x1={c.x + 70} y1="52" x2={c.x + 90} y2="52" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" markerEnd="url(#arrowPath)" />}
                  </g>
                ))}
                <defs><marker id="arrowPath" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M 0,0 L 6,3 L 0,6 Z" fill="hsl(var(--muted-foreground))" /></marker></defs>
                {/* Pressure scale below */}
                <text x="65" y="95" textAnchor="middle" className="fill-muted-foreground" fontSize="7">0–8</text>
                <text x="155" y="95" textAnchor="middle" className="fill-muted-foreground" fontSize="7">15–30/0–8</text>
                <text x="245" y="95" textAnchor="middle" className="fill-muted-foreground" fontSize="7">15–30/8–15</text>
                <text x="335" y="95" textAnchor="middle" className="fill-muted-foreground" fontSize="7">6–12</text>
                <text x="200" y="112" textAnchor="middle" className="fill-muted-foreground" fontSize="8">Pressures in mmHg — tap a chamber for waveform detail</text>
                {/* Balloon annotation */}
                <circle cx="335" cy="32" r="5" fill="hsl(142,60%,45%)" opacity="0.3" stroke="hsl(142,60%,45%)" strokeWidth="0.75" />
                <text x="365" y="28" fontSize="5" fill="hsl(142,60%,45%)" fontWeight="600">Balloon</text>
                <text x="365" y="36" fontSize="5" fill="hsl(142,60%,45%)">inflated</text>
              </svg>
            </div>
  
            {/* Chamber selector buttons */}
            <div className="grid grid-cols-4 gap-1.5 mb-3">
              {chambers.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedChamber(selectedChamber === c.id ? null : c.id)}
                  className={`p-1.5 rounded-lg border text-center transition-all text-xs font-bold ${selectedChamber === c.id ? "border-primary bg-primary/10 text-primary" : "border-border text-foreground hover:border-primary/50"}`}
                >
                  {c.name}
                </button>
              ))}
            </div>
  
            {selectedChamber && (() => {
              const c = chambers.find((x) => x.id === selectedChamber)!;
              return (
                    <div className="animate-fade-in space-y-3">
                  <div className="bg-background rounded-lg border border-border p-2">{c.svg}</div>
                  <div className="p-3 rounded-lg border border-primary/30 bg-primary/5 text-xs space-y-2">
                    <p className="font-bold text-foreground text-sm">{c.name}</p>
                    <div className="grid grid-cols-2 gap-1.5">
                      <div className="p-1.5 rounded bg-background border border-border">
                        <span className="text-muted-foreground">Depth:</span>
                        <p className="font-semibold text-foreground">{c.depth}</p>
                      </div>
                      <div className="p-1.5 rounded bg-background border border-border">
                        <span className="text-muted-foreground">Pressure:</span>
                        <p className="font-semibold text-foreground">{c.pressure}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground"><strong>Waveform:</strong> {c.waveform}</p>
                    <p className="text-muted-foreground"><strong>Abnormal:</strong> {c.abnormal}</p>
                    <div className="p-2 rounded bg-primary/10 border border-primary/20">
                      <span className="font-semibold text-foreground">Tips: </span>
                      <span className="text-muted-foreground">{c.tips}</span>
                    </div>
                  </div>
                </div>
    );
            })()}
  
            {!selectedChamber && (
              <div className="p-3 rounded bg-primary/5 border border-primary/20 text-xs text-muted-foreground">
                <strong className="text-foreground">PAC structure: </strong>
                7.5 Fr, 110 cm. Proximal port (RA — 30 cm), distal port (PA tip), thermistor (3.7 cm from tip), balloon (1.5 mL capacity). Introducer sheath via IJ/SC/femoral. Flow-directed with balloon inflated.
              </div>
            )}
          </TabsContent>
  
          <TabsContent value="applications">
            <p className="text-xs text-muted-foreground mb-3">Clinical indications and measured/derived parameters</p>
            <div className="space-y-1.5">
              {applications.map((a) => (
                <button
                  key={a.id}
                  onClick={() => setSelectedApp(selectedApp === a.id ? null : a.id)}
                  className={`w-full text-left p-2.5 rounded-lg border transition-all text-xs ${selectedApp === a.id ? "border-primary bg-primary/10 ring-1 ring-primary" : "border-border hover:border-primary/50"}`}
                >
                  <span className="font-bold text-foreground">{a.name}</span>
                  {selectedApp === a.id && (
                    <p className="text-muted-foreground mt-1.5 animate-fade-in">{a.detail}</p>
                  )}
                </button>
              ))}
            </div>
  
            <div className="mt-3 p-3 rounded-lg border border-border text-xs">
              <p className="font-semibold text-foreground mb-1">PAC Complications</p>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  "Arrhythmias (VT/VF during insertion)",
                  "PA rupture (balloon over-inflation — mortality >50%)",
                  "Pulmonary infarction (prolonged wedge)",
                  "Catheter knotting",
                  "Thromboembolism",
                  "Infection (line sepsis)",
                  "Valve damage (tricuspid/pulmonary)",
                  "Air embolism",
                ].map((c) => (
                  <div key={c} className="p-1.5 rounded bg-muted/50 text-muted-foreground text-[10px]">• {c}</div>
                ))}
              </div>
            </div>
          </TabsContent>
  
          <TabsContent value="evidence">
            <p className="text-xs text-muted-foreground mb-3">Key trials that changed PAC practice</p>
            <div className="space-y-2">
              {trials.map((t) => (
                <div key={t.trial} className="p-3 rounded-lg border border-border text-xs">
                  <p className="font-bold text-foreground text-sm">{t.trial}</p>
                  <p className="text-muted-foreground mt-1"><strong>Design:</strong> {t.design}</p>
                  <p className="text-muted-foreground mt-1"><strong>Result:</strong> {t.result}</p>
                  <div className="mt-2 p-2 rounded bg-primary/10 border border-primary/20">
                    <span className="font-semibold text-foreground">Conclusion: </span>
                    <span className="text-muted-foreground">{t.conclusion}</span>
                  </div>
                </div>
              ))}
            </div>
  
            <div className="mt-3 p-2 rounded bg-primary/5 border border-primary/20 text-xs text-muted-foreground">
              <strong className="text-foreground">Current indications (selective use): </strong>
              Pulmonary hypertension diagnosis/management, cardiac surgery (complex), cardiac transplant, refractory shock with unclear aetiology, intracardiac shunt quantification. Routine use in ICU is NOT supported by evidence.
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DiagramFigure>
  );
};

export default PACDiagram;
