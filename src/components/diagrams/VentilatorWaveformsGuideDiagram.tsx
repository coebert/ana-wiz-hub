import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DiagramFigure } from "./_shared/DiagramFigure";

type WaveformId = "pressure" | "flow" | "volume";
type PathologyId = string;

const VentilatorWaveformsGuideDiagram = () => {
  const [selectedWaveform, setSelectedWaveform] = useState<WaveformId>("pressure");
  const [selectedPathology, setSelectedPathology] = useState<PathologyId | null>(null);

  const normalWaveforms: Record<WaveformId, { title: string; yLabel: string; unit: string; description: string }> = {
    pressure: {
      title: "Pressure–Time",
      yLabel: "Paw (cmH₂O)",
      unit: "cmH₂O",
      description: "VCV: linear rise to peak (PIP), then brief plateau (Pplat). PCV: rapid rise to set pressure, square waveform, decelerating flow. PEEP = baseline. Driving pressure = Pplat − PEEP.",
    },
    flow: {
      title: "Flow–Time",
      yLabel: "Flow (L/min)",
      unit: "L/min",
      description: "VCV: constant (square) inspiratory flow, passive expiratory decay. PCV: decelerating inspiratory flow (highest at start). Expiratory flow returns to zero before next breath — if not, auto-PEEP.",
    },
    volume: {
      title: "Volume–Time",
      yLabel: "Volume (mL)",
      unit: "mL",
      description: "Rises during inspiration (linear in VCV, curved in PCV). Falls during expiration. Should return to baseline — if not, indicates air trapping or leak. Tidal volume = peak − trough.",
    },
  };

  const renderNormalSVG = (type: WaveformId) => {
    const w = 400, h = 160, baseline = type === "flow" ? 80 : 130;
    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
        {/* Axes */}
        <line x1="50" y1={baseline} x2="380" y2={baseline} stroke="hsl(var(--border))" strokeWidth="1" />
        <line x1="50" y1="15" x2="50" y2={h - 10} stroke="hsl(var(--border))" strokeWidth="1" />
        <text x="215" y={h - 2} textAnchor="middle" className="fill-muted-foreground" fontSize="9">Time →</text>
        <text x="12" y={baseline / 2 + 10} textAnchor="middle" className="fill-muted-foreground" fontSize="8" transform={`rotate(-90,12,${baseline / 2 + 10})`}>
          {normalWaveforms[type].yLabel}
        </text>

        {type === "pressure" && (
          <>
            {/* VCV waveform — two breaths */}
            {[0, 160].map((offset) => (
              <g key={offset}>
                <path
                  d={`M ${55 + offset},${baseline} L ${75 + offset},45 L ${115 + offset},45 L ${115 + offset},${baseline}`}
                  fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"
                />
              </g>
            ))}
            {/* PEEP line */}
            <line x1="50" y1={baseline - 8} x2="380" y2={baseline - 8} stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="3,2" />
            <text x="385" y={baseline - 5} fontSize="7" className="fill-muted-foreground">PEEP</text>
            {/* Labels */}
            <text x="75" y="38" fontSize="7" className="fill-primary" fontWeight="600">PIP</text>
            <text x="95" y="38" fontSize="7" className="fill-muted-foreground">Pplat</text>
            <path d="M 75,42 L 75,48 L 115,48 L 115,42" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
            <text x="95" y="57" fontSize="6" className="fill-muted-foreground" textAnchor="middle">Plateau</text>
          </>
        )}

        {type === "flow" && (
          <>
            {[0, 160].map((offset) => (
              <g key={offset}>
                {/* Inspiratory — square */}
                <path
                  d={`M ${55 + offset},${baseline} L ${55 + offset},30 L ${105 + offset},30 L ${105 + offset},${baseline}`}
                  fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"
                />
                {/* Expiratory — decay below baseline */}
                <path
                  d={`M ${105 + offset},${baseline} L ${105 + offset},${baseline + 35} Q ${140 + offset},${baseline + 35} ${155 + offset},${baseline}`}
                  fill="none" stroke="hsl(0,70%,55%)" strokeWidth="2" strokeLinecap="round"
                />
              </g>
            ))}
            <text x="80" y="24" fontSize="7" className="fill-primary" fontWeight="600">Insp</text>
            <text x="130" y={baseline + 48} fontSize="7" fill="hsl(0,70%,55%)" fontWeight="600">Exp</text>
            <text x="385" y={baseline + 3} fontSize="7" className="fill-muted-foreground">0</text>
          </>
        )}

        {type === "volume" && (
          <>
            {[0, 160].map((offset) => (
              <g key={offset}>
                <path
                  d={`M ${55 + offset},${baseline} L ${105 + offset},35 L ${155 + offset},${baseline}`}
                  fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round"
                />
              </g>
            ))}
            <text x="105" y="28" fontSize="7" className="fill-primary" fontWeight="600">VT</text>
          </>
        )}
      </svg>
    );
  };

  const pathologies = [
    {
      id: "auto-peep",
      name: "Auto-PEEP (Air Trapping)",
      category: "Obstructive",
      description: "Expiratory flow does not return to zero before next breath. Caused by incomplete expiration — COPD, asthma, high RR, short expiratory time.",
      flowSign: "Expiratory flow cut off — does not reach zero baseline",
      pressureSign: "Measured by end-expiratory hold: total PEEP − set PEEP = auto-PEEP",
      volumeSign: "Volume trace does not return to baseline between breaths",
      management: "↓RR, ↓I:E ratio (longer expiration), ↓VT, bronchodilators. Apply extrinsic PEEP ≈80% of auto-PEEP to reduce triggering work. Disconnect circuit briefly to measure effect.",
      svg: (
        <svg viewBox="0 0 400 140" className="w-full h-auto">
          <line x1="50" y1="70" x2="380" y2="70" stroke="hsl(var(--border))" strokeWidth="1" />
          <line x1="50" y1="15" x2="50" y2="130" stroke="hsl(var(--border))" strokeWidth="1" />
          <text x="215" y="138" textAnchor="middle" className="fill-muted-foreground" fontSize="8">Flow–Time</text>
          {[0, 130].map((o) => (
            <g key={o}>
              <path d={`M ${55+o},70 L ${55+o},25 L ${95+o},25 L ${95+o},70`} fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
              <path d={`M ${95+o},70 L ${95+o},105 Q ${120+o},105 ${135+o},85`} fill="none" stroke="hsl(0,70%,55%)" strokeWidth="2" />
            </g>
          ))}
          {/* Arrow showing flow doesn't reach zero */}
          <line x1="180" y1="85" x2="180" y2="70" stroke="hsl(0,70%,55%)" strokeWidth="1" strokeDasharray="2,2" />
          <text x="195" y="95" fontSize="7" fill="hsl(0,70%,55%)" fontWeight="600">Flow ≠ 0</text>
          <text x="195" y="105" fontSize="6" fill="hsl(0,70%,55%)">= auto-PEEP</text>
        </svg>
      ),
    },
    {
      id: "bronchospasm",
      name: "Bronchospasm",
      category: "Obstructive",
      description: "Acute airway narrowing → ↑airway resistance → prolonged expiration, ↑PIP with preserved Pplat (resistive component). Shark-fin capnography pattern.",
      flowSign: "Prolonged, slow expiratory decay. May not reach zero (auto-PEEP). Reduced peak inspiratory flow if severe.",
      pressureSign: "↑PIP with normal Pplat. Large PIP−Pplat gap = ↑airway resistance. (cf. ↓compliance where both PIP and Pplat rise).",
      volumeSign: "May not deliver set VT in PCV. Prolonged expiratory phase.",
      management: "Salbutamol (8–10 puffs via MDI + spacer in circuit). IV magnesium 2g. Deepen anaesthesia (volatiles are bronchodilators — sevoflurane/isoflurane). Ketamine 0.5 mg/kg. Hand ventilate to assess compliance.",
      svg: (
        <svg viewBox="0 0 400 140" className="w-full h-auto">
          <line x1="50" y1="100" x2="380" y2="100" stroke="hsl(var(--border))" strokeWidth="1" />
          <line x1="50" y1="15" x2="50" y2="125" stroke="hsl(var(--border))" strokeWidth="1" />
          <text x="215" y="138" textAnchor="middle" className="fill-muted-foreground" fontSize="8">Pressure–Time</text>
          {/* Normal PCV - square */}
          <path d="M 55,100 L 55,40 L 120,40 L 120,100" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" strokeDasharray="4,3" />
          <text x="87" y="33" fontSize="7" className="fill-muted-foreground">Normal</text>
          {/* Bronchospasm VCV — high PIP, normal Pplat */}
          <path d="M 160,100 L 175,25 L 195,55 L 225,55 L 225,100" fill="none" stroke="hsl(0,70%,55%)" strokeWidth="2" />
          <text x="175" y="20" fontSize="7" fill="hsl(0,70%,55%)" fontWeight="600">↑PIP</text>
          <text x="210" y="50" fontSize="7" fill="hsl(142,60%,45%)" fontWeight="600">Normal Pplat</text>
          <path d="M 175,27 L 175,33 L 195,33" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
          <text x="290" y="50" fontSize="8" fill="hsl(0,70%,55%)" fontWeight="600">PIP−Pplat gap</text>
          <text x="290" y="62" fontSize="7" fill="hsl(0,70%,55%)">= airway resistance</text>
        </svg>
      ),
    },
    {
      id: "missed-trigger",
      name: "Missed / Ineffective Trigger",
      category: "Asynchrony",
      description: "Patient effort does not trigger a ventilator breath. Most common asynchrony (up to 50% in some studies). Associated with ↑duration of ventilation, ↑mortality.",
      flowSign: "Small deflection in expiratory flow (patient effort) without a delivered breath",
      pressureSign: "Small negative pressure deflection on airway pressure trace without triggered breath",
      volumeSign: "No volume delivery despite visible patient effort",
      management: "↑Trigger sensitivity (flow trigger > pressure trigger). ↓Over-assistance (↓PS, ↓VT). Treat auto-PEEP (common cause — patient cannot overcome auto-PEEP + trigger threshold). Consider NAVA mode.",
      svg: (
        <svg viewBox="0 0 400 140" className="w-full h-auto">
          <line x1="50" y1="90" x2="380" y2="90" stroke="hsl(var(--border))" strokeWidth="1" />
          <line x1="50" y1="15" x2="50" y2="125" stroke="hsl(var(--border))" strokeWidth="1" />
          <text x="215" y="138" textAnchor="middle" className="fill-muted-foreground" fontSize="8">Pressure–Time</text>
          {/* Normal triggered breath */}
          <path d="M 55,90 L 60,95 L 65,90 L 65,35 L 120,35 L 120,90" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
          <text x="92" y="28" fontSize="7" className="fill-primary" fontWeight="600">Triggered</text>
          {/* Missed trigger */}
          <path d="M 155,90 L 165,100 L 175,90" fill="none" stroke="hsl(0,70%,55%)" strokeWidth="2" />
          <text x="165" y="118" fontSize="7" fill="hsl(0,70%,55%)" fontWeight="600" textAnchor="middle">Missed!</text>
          <circle cx="165" cy="100" r="10" fill="none" stroke="hsl(0,70%,55%)" strokeWidth="1" strokeDasharray="3,2" />
          {/* Next triggered breath */}
          <path d="M 220,90 L 225,95 L 230,90 L 230,35 L 285,35 L 285,90" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
          <text x="257" y="28" fontSize="7" className="fill-primary" fontWeight="600">Triggered</text>
        </svg>
      ),
    },
    {
      id: "double-trigger",
      name: "Double Triggering",
      category: "Asynchrony",
      description: "Two ventilator breaths delivered for one patient effort. Neural Ti > ventilator Ti — patient still inspiring when breath terminates, triggering a second breath. Results in breath-stacking and ↑VT.",
      flowSign: "Two consecutive inspiratory flows with very short or absent expiratory phase between them",
      pressureSign: "Two pressure cycles in rapid succession. Second breath may have higher PIP (stacked volume).",
      volumeSign: "Effective VT = sum of both breaths — may be dangerously high (VILI risk)",
      management: "↑Inspiratory time to match patient Ti. ↑Cycling threshold in PSV (e.g., 40% → 25%). ↓Over-sedation (paradoxically). Consider ↑VT slightly if set too low. Neuromuscular blockade if severe.",
      svg: (
        <svg viewBox="0 0 400 140" className="w-full h-auto">
          <line x1="50" y1="100" x2="380" y2="100" stroke="hsl(var(--border))" strokeWidth="1" />
          <line x1="50" y1="15" x2="50" y2="125" stroke="hsl(var(--border))" strokeWidth="1" />
          <text x="215" y="138" textAnchor="middle" className="fill-muted-foreground" fontSize="8">Volume–Time</text>
          {/* First breath */}
          <path d="M 55,100 L 100,45 L 115,100" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
          {/* Immediate second breath (stacked) */}
          <path d="M 115,100 L 160,30 L 180,100" fill="none" stroke="hsl(0,70%,55%)" strokeWidth="2" />
          <text x="160" y="23" fontSize="7" fill="hsl(0,70%,55%)" fontWeight="600">Stacked VT!</text>
          {/* Gap then normal */}
          <path d="M 240,100 L 285,50 L 310,100" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
          <text x="285" y="43" fontSize="7" className="fill-primary">Normal</text>
          {/* Bracket */}
          <path d="M 55,108 L 55,115 L 180,115 L 180,108" fill="none" stroke="hsl(0,70%,55%)" strokeWidth="0.75" />
          <text x="117" y="125" fontSize="7" fill="hsl(0,70%,55%)" textAnchor="middle">Double trigger</text>
        </svg>
      ),
    },
    {
      id: "compliance",
      name: "↓Compliance (Stiff Lungs)",
      category: "Restrictive",
      description: "ARDS, pulmonary fibrosis, pulmonary oedema, pneumothorax. Both PIP AND Pplat rise (cf. bronchospasm where only PIP rises). ↑Driving pressure = ↑mortality.",
      flowSign: "Flow pattern relatively preserved. Expiratory flow may be rapid (good recoil).",
      pressureSign: "↑PIP AND ↑Pplat. Small PIP−Pplat gap (resistance normal). Driving pressure (Pplat−PEEP) elevated >15 cmH₂O.",
      volumeSign: "In PCV: ↓delivered VT for same set pressure. In VCV: higher pressures for same VT.",
      management: "Lung-protective ventilation: VT 6 ml/kg IBW, Pplat ≤30, driving pressure ≤15. Titrate PEEP (FiO₂/PEEP table or EIT). Prone positioning if P/F <150. Consider ECMO if refractory.",
      svg: (
        <svg viewBox="0 0 400 140" className="w-full h-auto">
          <line x1="50" y1="110" x2="380" y2="110" stroke="hsl(var(--border))" strokeWidth="1" />
          <line x1="50" y1="15" x2="50" y2="125" stroke="hsl(var(--border))" strokeWidth="1" />
          <text x="215" y="138" textAnchor="middle" className="fill-muted-foreground" fontSize="8">Pressure–Time (VCV)</text>
          {/* Normal */}
          <path d="M 55,110 L 75,55 L 95,65 L 120,65 L 120,110" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" strokeDasharray="4,3" />
          <text x="97" y="50" fontSize="7" className="fill-muted-foreground">Normal</text>
          {/* Low compliance — both PIP and Pplat high */}
          <path d="M 180,110 L 200,20 L 220,35 L 250,35 L 250,110" fill="none" stroke="hsl(0,70%,55%)" strokeWidth="2" />
          <text x="200" y="15" fontSize="7" fill="hsl(0,70%,55%)" fontWeight="600">↑PIP</text>
          <text x="235" y="30" fontSize="7" fill="hsl(0,70%,55%)" fontWeight="600">↑Pplat</text>
          <text x="320" y="40" fontSize="8" fill="hsl(0,70%,55%)" fontWeight="600">Both rise</text>
          <text x="320" y="52" fontSize="7" fill="hsl(0,70%,55%)">= ↓compliance</text>
        </svg>
      ),
    },
  ];

  return (
    <div className="my-6 p-4 bg-muted/30 rounded-xl border border-border">
      <h3 className="text-lg font-bold text-foreground mb-1">Ventilator Waveforms Interpretation</h3>
      <p className="text-sm text-muted-foreground mb-4">Normal waveforms and pathological patterns with clinical management</p>

      <Tabs defaultValue="normal" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="normal" className="text-xs">Normal Waveforms</TabsTrigger>
          <TabsTrigger value="pathology" className="text-xs">Pathological Patterns</TabsTrigger>
        </TabsList>

        <TabsContent value="normal">
          <div className="flex gap-2 mb-4">
            {(["pressure", "flow", "volume"] as WaveformId[]).map((w) => (
              <button
                key={w}
                onClick={() => setSelectedWaveform(w)}
                className={`flex-1 p-2 rounded-lg border text-xs font-semibold transition-all capitalize ${selectedWaveform === w ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}
              >
                {normalWaveforms[w].title}
              </button>
            ))}
          </div>

          <div className="bg-background rounded-lg border border-border p-3 mb-3">
            {renderNormalSVG(selectedWaveform)}
          </div>

          <div className="p-3 rounded-lg border border-primary/30 bg-primary/5 text-xs">
            <p className="font-bold text-foreground text-sm">{normalWaveforms[selectedWaveform].title}</p>
            <p className="text-muted-foreground mt-1">{normalWaveforms[selectedWaveform].description}</p>
          </div>

          <div className="mt-3 p-2 rounded bg-muted/50 border border-border text-xs text-muted-foreground">
            <strong className="text-foreground">VCV vs PCV: </strong>
            In VCV the <em>flow</em> is square (set) and pressure is variable. In PCV the <em>pressure</em> is square (set) and flow decelerates. Volume is the dependent variable in PCV.
          </div>
        </TabsContent>

        <TabsContent value="pathology">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
            {pathologies.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPathology(selectedPathology === p.id ? null : p.id)}
                className={`p-2 rounded-lg border text-left transition-all text-xs ${selectedPathology === p.id ? "border-primary bg-primary/10 ring-1 ring-primary" : "border-border hover:border-primary/50"}`}
              >
                <span className="font-bold text-foreground">{p.name}</span>
                <p className="text-muted-foreground mt-0.5">{p.category}</p>
              </button>
            ))}
          </div>

          {selectedPathology && (() => {
            const p = pathologies.find((x) => x.id === selectedPathology)!;
            return (
    <DiagramFigure
      id="ventilator-waveforms-guide-diagram"
      title="Ventilator waveforms guide"
      description="Auto-generated wrapper for the Ventilator waveforms guide anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
                    <div className="animate-fade-in space-y-3">
                  <div className="bg-background rounded-lg border border-border p-3">
                    {p.svg}
                  </div>
                  <div className="p-3 rounded-lg border border-primary/30 bg-primary/5">
                    <p className="font-bold text-foreground text-sm">{p.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{p.description}</p>
                    <div className="grid gap-2 mt-2 text-xs">
                      <div className="p-2 rounded bg-background border border-border">
                        <span className="font-semibold text-foreground">Pressure trace: </span>
                        <span className="text-muted-foreground">{p.pressureSign}</span>
                      </div>
                      <div className="p-2 rounded bg-background border border-border">
                        <span className="font-semibold text-foreground">Flow trace: </span>
                        <span className="text-muted-foreground">{p.flowSign}</span>
                      </div>
                      <div className="p-2 rounded bg-background border border-border">
                        <span className="font-semibold text-foreground">Volume trace: </span>
                        <span className="text-muted-foreground">{p.volumeSign}</span>
                      </div>
                    </div>
                    <div className="mt-2 p-2 rounded bg-primary/10 border border-primary/20">
                      <span className="font-semibold text-foreground text-xs">Management: </span>
                      <span className="text-xs text-muted-foreground">{p.management}</span>
                    </div>
                  </div>
                </div>
    </DiagramFigure>
  );
          })()}

          {!selectedPathology && (
            <div className="p-3 rounded bg-primary/5 border border-primary/20 text-xs text-muted-foreground">
              <strong className="text-foreground">Systematic approach: </strong>
              For any ventilator alarm — check all three waveforms systematically. PIP−Pplat gap differentiates resistance (↑gap) from compliance (↓gap) problems. Always check expiratory flow returns to zero (auto-PEEP screen).
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default VentilatorWaveformsGuideDiagram;
