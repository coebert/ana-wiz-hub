import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DiagramFigure } from "./_shared/DiagramFigure";

const NeuromuscularMonitoringDiagram = () => {
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null);
  const [selectedDepth, setSelectedDepth] = useState<number | null>(null);

  const stimPatterns = [
    {
      id: "tof",
      name: "Train-of-Four (TOF)",
      params: "4 stimuli at 2 Hz (0.5s), repeat every 12–15s",
      description: "Most commonly used pattern. Compares T4 to T1 (TOF ratio). No baseline needed. Fade indicates non-depolarising block.",
      svg: (
        <svg viewBox="0 0 360 120" className="w-full h-auto">
          <line x1="20" y1="100" x2="340" y2="100" stroke="hsl(var(--border))" strokeWidth="1" />
          <text x="180" y="118" textAnchor="middle" className="fill-muted-foreground" fontSize="8">Time →</text>
          {[0, 1, 2, 3].map((i) => {
            const x = 60 + i * 60;
            const h = [80, 60, 40, 20][i];
            return (
              <g key={i}>
                <rect x={x - 8} y={100 - h} width="16" height={h} fill="hsl(var(--primary))" opacity={0.6 + i * 0.1} rx="2" />
                <text x={x} y={95 - h} textAnchor="middle" className="fill-foreground" fontSize="9" fontWeight="600">T{i + 1}</text>
              </g>
            );
          })}
          <path d="M 52,15 L 52,25 L 292,25 L 292,15" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.75" />
          <text x="172" y="12" textAnchor="middle" fontSize="8" className="fill-muted-foreground">TOF ratio = T4/T1</text>
          <text x="172" y="45" textAnchor="middle" fontSize="9" fill="hsl(var(--primary))" fontWeight="600">Fade = non-depolarising block</text>
        </svg>
      ),
    },
    {
      id: "ptc",
      name: "Post-Tetanic Count (PTC)",
      params: "50 Hz tetanus for 5s → 3s pause → 1 Hz single twitch",
      description: "Used when TOF count = 0 (deep block). Count single twitches after tetanic facilitation. PTC 1–2 = deep block. PTC >5 = TOF will return soon.",
      svg: (
        <svg viewBox="0 0 360 120" className="w-full h-auto">
          <line x1="20" y1="100" x2="340" y2="100" stroke="hsl(var(--border))" strokeWidth="1" />
          {/* Tetanus burst */}
          <rect x="30" y="20" width="80" height="80" fill="hsl(var(--primary))" opacity="0.3" rx="2" stroke="hsl(var(--border))" strokeWidth="0.75" />
          <rect x="30" y="20" width="80" height="3" fill="hsl(var(--primary))" opacity="0.8" />
          {Array.from({ length: 20 }).map((_, i) => (
            <line key={i} x1={32 + i * 4} y1="23" x2={32 + i * 4} y2="100" stroke="hsl(var(--primary))" strokeWidth="1.5" opacity="0.5" />
          ))}
          <text x="70" y="15" textAnchor="middle" fontSize="8" className="fill-foreground" fontWeight="600">Tetanus 50Hz</text>
          {/* Pause */}
          <text x="130" y="60" textAnchor="middle" fontSize="7" className="fill-muted-foreground">3s pause</text>
          {/* Post-tetanic twitches */}
          {[0, 1, 2, 3, 4].map((i) => {
            const x = 160 + i * 35;
            const h = [35, 28, 22, 15, 8][i];
            return (
              <g key={i}>
                <rect x={x - 6} y={100 - h} width="12" height={h} fill="hsl(25,80%,50%)" opacity="0.7" rx="1" />
                <text x={x} y={95 - h} textAnchor="middle" fontSize="7" className="fill-foreground">{i + 1}</text>
              </g>
            );
          })}
          <text x="260" y="55" textAnchor="middle" fontSize="8" fill="hsl(25,80%,50%)" fontWeight="600">PTC = 5</text>
        </svg>
      ),
    },
    {
      id: "dbs",
      name: "Double Burst Stimulation (DBS)",
      params: "2 bursts of 3 stimuli at 50 Hz, 750ms apart",
      description: "Easier to detect fade manually (tactile/visual) than TOF. Two distinct muscle contractions. If D2 < D1 = residual block. More sensitive than TOF for detecting TOF ratio 0.4–0.9.",
      svg: (
        <svg viewBox="0 0 360 120" className="w-full h-auto">
          <line x1="20" y1="100" x2="340" y2="100" stroke="hsl(var(--border))" strokeWidth="1" />
          {/* Burst 1 */}
          {[0, 1, 2].map((i) => (
            <rect key={`b1-${i}`} x={60 + i * 18 - 6} y={30} width="12" height="70" fill="hsl(var(--primary))" opacity="0.6" rx="1" />
          ))}
          <text x="78" y="22" textAnchor="middle" fontSize="9" className="fill-foreground" fontWeight="600">D1</text>
          {/* Gap */}
          <text x="155" y="60" textAnchor="middle" fontSize="7" className="fill-muted-foreground">750ms</text>
          <line x1="110" y1="65" x2="200" y2="65" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="3,2" />
          {/* Burst 2 — smaller (fade) */}
          {[0, 1, 2].map((i) => (
            <rect key={`b2-${i}`} x={215 + i * 18 - 6} y={50} width="12" height="50" fill="hsl(25,80%,50%)" opacity="0.6" rx="1" />
          ))}
          <text x="233" y="42" textAnchor="middle" fontSize="9" fill="hsl(25,80%,50%)" fontWeight="600">D2</text>
          <text x="155" y="15" textAnchor="middle" fontSize="8" className="fill-muted-foreground">D2 &lt; D1 = residual block</text>
        </svg>
      ),
    },
    {
      id: "tetanus",
      name: "Tetanic Stimulation",
      params: "50 Hz for 5 seconds (or 100 Hz)",
      description: "Sustained high-frequency stimulation. Fade = non-depolarising block (pre-synaptic ACh depletion). No fade with depolarising block (Phase I suxamethonium). Post-tetanic facilitation enables PTC.",
      svg: (
        <svg viewBox="0 0 360 120" className="w-full h-auto">
          <line x1="20" y1="100" x2="340" y2="100" stroke="hsl(var(--border))" strokeWidth="1" />
          {/* Non-depolarising: fade */}
          <path d="M 40,30 L 40,100" stroke="hsl(var(--primary))" strokeWidth="2" />
          <path d="M 40,30 Q 120,30 200,70 L 200,100" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" />
          <text x="120" y="22" textAnchor="middle" fontSize="8" className="fill-primary" fontWeight="600">Non-depolarising (FADE)</text>
          {/* Depolarising: sustained */}
          <path d="M 230,50 L 230,100" stroke="hsl(142,60%,45%)" strokeWidth="2" />
          <line x1="230" y1="50" x2="330" y2="50" stroke="hsl(142,60%,45%)" strokeWidth="2" />
          <path d="M 330,50 L 330,100" stroke="hsl(142,60%,45%)" strokeWidth="2" />
          <text x="280" y="42" textAnchor="middle" fontSize="8" fill="hsl(142,60%,45%)" fontWeight="600">Depolarising (NO fade)</text>
        </svg>
      ),
    },
  ];

  const depthLevels = [
    { tof: "TOF count 0, PTC 0", depth: "Intense block", ratio: "N/A", clinical: "Too deep for most surgery. No response to any stimulation. Used rarely — only specific procedures (e.g., intubation conditions).", sugammadex: "Cannot reverse — must wait for PTC ≥1. Sugammadex 16 mg/kg if emergency (immediate reversal from rocuronium).", color: "hsl(0 70% 50%)" },
    { tof: "TOF count 0, PTC 1–5", depth: "Deep block", ratio: "N/A", clinical: "Optimal for laparoscopy (improved surgical conditions vs moderate). No diaphragm movement. Used increasingly for abdominal surgery.", sugammadex: "Sugammadex 4 mg/kg (rocuronium/vecuronium). Neostigmine INEFFECTIVE at this depth.", color: "hsl(25 80% 50%)" },
    { tof: "TOF count 1–3", depth: "Moderate block", ratio: "N/A", clinical: "Standard surgical relaxation. Adequate for most open abdominal surgery. Some diaphragm activity may return at TOF 2–3.", sugammadex: "Sugammadex 2 mg/kg. Neostigmine 50 mcg/kg + glycopyrrolate (only if TOF count ≥2, ideally ≥3).", color: "hsl(45 80% 50%)" },
    { tof: "TOF ratio 0.4–0.9", depth: "Shallow block / Recovery", ratio: "0.4–0.9", clinical: "Residual block — clinically significant! Patient may appear to breathe but has ↓pharyngeal tone, ↑aspiration risk, diplopia, weakness. 5A grip weak.", sugammadex: "Sugammadex 2 mg/kg. Neostigmine 50 mcg/kg (if TOF ratio >0.4). Target TOF ratio ≥0.9 before extubation.", color: "hsl(200 70% 50%)" },
    { tof: "TOF ratio ≥0.9", depth: "Adequate recovery", ratio: "≥0.9", clinical: "Safe for extubation. Normal pharyngeal function, adequate tidal volume, sustained head lift 5s, 5A grip strength. Quantitative monitoring essential — tactile assessment misses ratios 0.4–0.9.", sugammadex: "No reversal needed. Confirm with quantitative acceleromyography (not subjective assessment).", color: "hsl(142 60% 45%)" },
  ];

  return (
    <DiagramFigure
      id="neuromuscular-monitoring-diagram"
      title="Neuromuscular monitoring"
      description="Auto-generated wrapper for the Neuromuscular monitoring anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="my-6 p-4 bg-muted/30 rounded-xl border border-border">
        <h3 className="text-lg font-bold text-foreground mb-1">Neuromuscular Monitoring & Reversal</h3>
        <p className="text-sm text-muted-foreground mb-4">Stimulation patterns, block depth assessment, and sugammadex dosing</p>
  
        <Tabs defaultValue="patterns" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="patterns" className="text-xs">Patterns</TabsTrigger>
            <TabsTrigger value="depth" className="text-xs">Block Depth</TabsTrigger>
            <TabsTrigger value="reversal" className="text-xs">Reversal</TabsTrigger>
          </TabsList>
  
          <TabsContent value="patterns">
            <div className="grid grid-cols-2 gap-2 mb-3">
              {stimPatterns.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPattern(selectedPattern === p.id ? null : p.id)}
                  className={`p-2 rounded-lg border text-left transition-all text-xs ${selectedPattern === p.id ? "border-primary bg-primary/10 ring-1 ring-primary" : "border-border hover:border-primary/50"}`}
                >
                  <span className="font-bold text-foreground">{p.name}</span>
                  <p className="text-muted-foreground mt-0.5 line-clamp-2">{p.params}</p>
                </button>
              ))}
            </div>
  
            {selectedPattern && (() => {
              const p = stimPatterns.find((x) => x.id === selectedPattern)!;
              return (
                    <div className="animate-fade-in space-y-3">
                  <div className="bg-background rounded-lg border border-border p-3">
                    {p.svg}
                  </div>
                  <div className="p-3 rounded-lg border border-primary/30 bg-primary/5">
                    <p className="font-bold text-foreground text-sm">{p.name}</p>
                    <p className="text-xs text-muted-foreground mt-1"><strong>Parameters:</strong> {p.params}</p>
                    <p className="text-xs text-muted-foreground mt-1">{p.description}</p>
                  </div>
                </div>
    );
            })()}
  
            {!selectedPattern && (
              <div className="p-3 rounded bg-primary/5 border border-primary/20 text-xs text-muted-foreground">
                <strong className="text-foreground">Peripheral nerve stimulator: </strong>
                Applied over ulnar nerve (adductor pollicis) or facial nerve (corrugator supercilii — onset 30s faster). Supramaximal stimulus ensures all fibres recruited. Tap a pattern above.
              </div>
            )}
          </TabsContent>
  
          <TabsContent value="depth">
            <p className="text-xs text-muted-foreground mb-3">Tap a depth level for clinical details and reversal guidance</p>
            <div className="space-y-2">
              {depthLevels.map((d, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDepth(selectedDepth === i ? null : i)}
                  className={`w-full p-2.5 rounded-lg border text-left transition-all text-xs ${selectedDepth === i ? "border-primary bg-primary/10 ring-1 ring-primary" : "border-border hover:border-primary/50"}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold" style={{ color: d.color }}>{d.depth}</span>
                    <span className="text-muted-foreground">{d.tof}</span>
                  </div>
                  {selectedDepth === i && (
                    <div className="mt-2 space-y-2 animate-fade-in">
                      <p className="text-muted-foreground">{d.clinical}</p>
                      <div className="p-2 rounded bg-background border border-border">
                        <p className="font-semibold text-foreground">Reversal</p>
                        <p className="text-muted-foreground mt-0.5">{d.sugammadex}</p>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </TabsContent>
  
          <TabsContent value="reversal">
            <div className="space-y-3">
              {/* Sugammadex */}
              <div className="p-3 rounded-lg border border-border">
                <p className="font-bold text-foreground text-sm">Sugammadex (Bridion)</p>
                <p className="text-xs text-muted-foreground mt-1 mb-2">Modified γ-cyclodextrin — encapsulates rocuronium &gt; vecuronium (1:1 molar ratio). Does NOT work on atracurium/cisatracurium.</p>
                <div className="space-y-1.5">
                  {[
                    { dose: "2 mg/kg", indication: "Moderate block (TOF count ≥2)", onset: "~2 min to TOF ≥0.9" },
                    { dose: "4 mg/kg", indication: "Deep block (PTC ≥1, TOF = 0)", onset: "~3 min to TOF ≥0.9" },
                    { dose: "16 mg/kg", indication: "Immediate reversal (can't intubate, can't oxygenate)", onset: "~1.5 min from 1.2 mg/kg rocuronium" },
                  ].map((r) => (
                    <div key={r.dose} className="flex gap-2 p-2 rounded bg-muted/50 text-xs">
                      <span className="font-bold text-primary whitespace-nowrap">{r.dose}</span>
                      <div>
                        <p className="text-foreground font-medium">{r.indication}</p>
                        <p className="text-muted-foreground">{r.onset}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2"><strong>Cautions:</strong> Binds oral contraceptive steroids (advise alternative contraception 7 days). Anaphylaxis rare (~1:2500). Re-curarisation risk if insufficient dose. Wait 24h before re-dosing rocuronium (or 5 min if sugammadex re-dosed).</p>
              </div>
  
              {/* Neostigmine */}
              <div className="p-3 rounded-lg border border-border">
                <p className="font-bold text-foreground text-sm">Neostigmine + Glycopyrrolate</p>
                <p className="text-xs text-muted-foreground mt-1 mb-2">Anticholinesterase — inhibits AChE → ↑ACh at NMJ. Must co-administer anticholinergic to block muscarinic effects.</p>
                <div className="space-y-1.5">
                  {[
                    { dose: "Neostigmine 50 mcg/kg", detail: "Maximum 5 mg. Only when TOF count ≥2 (ideally ≥3). Ceiling effect — more drug won't help if block too deep." },
                    { dose: "Glycopyrrolate 10 mcg/kg", detail: "Given simultaneously. Prevents bradycardia, salivation, bronchospasm. Onset matches neostigmine." },
                  ].map((r) => (
                    <div key={r.dose} className="flex gap-2 p-2 rounded bg-muted/50 text-xs">
                      <span className="font-bold text-primary whitespace-nowrap">{r.dose}</span>
                      <p className="text-muted-foreground">{r.detail}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2"><strong>Limitations:</strong> Slower onset (~7–10 min). Cannot reverse deep block. Ceiling effect. Risk of residual curarisation — quantitative monitoring essential. Works on ALL non-depolarising agents.</p>
              </div>
  
              {/* Key points */}
              <div className="p-3 rounded bg-primary/5 border border-primary/20 text-xs text-muted-foreground">
                <strong className="text-foreground">Critical: </strong>
                TOF ratio ≥0.9 required before extubation. Tactile/visual assessment cannot reliably detect ratios 0.4–0.9. Quantitative monitoring (acceleromyography/electromyography) is the standard of care. Residual curarisation (PORC) incidence: 20–40% without quantitative monitoring.
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DiagramFigure>
  );
};

export default NeuromuscularMonitoringDiagram;
