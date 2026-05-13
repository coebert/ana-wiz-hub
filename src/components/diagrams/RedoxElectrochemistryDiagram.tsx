import { useState, useEffect } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

export const RedoxElectrochemistryDiagram = () => {
  const [activeTab, setActiveTab] = useState<"redox" | "electrodes" | "radicals">("redox");
  const [animFrame, setAnimFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setAnimFrame((f) => (f + 1) % 120), 33);
    return () => clearInterval(interval);
  }, []);

  const t = animFrame / 120;
  const osc = Math.sin(t * Math.PI * 2) * 0.5 + 0.5;

  return (
    <DiagramFigure
      id="redox-electrochemistry-diagram"
      title="Redox electrochemistry"
      description="Auto-generated wrapper for the Redox electrochemistry anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="w-full max-w-2xl mx-auto">
        <div className="flex gap-2 justify-center mb-6">
          {([
            { key: "redox" as const, label: "Redox Reactions" },
            { key: "electrodes" as const, label: "Clinical Electrodes" },
            { key: "radicals" as const, label: "Free Radicals" },
          ]).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                activeTab === key ? "bg-chemistry/10 border-chemistry text-chemistry" : "border-border text-muted-foreground hover:border-chemistry/50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
  
        {activeTab === "redox" && (
          <div className="space-y-4">
            <div className="bg-secondary/30 rounded-xl p-4 border border-border text-center">
              <p className="text-xs text-muted-foreground mb-1">Mnemonic: OIL RIG</p>
              <p className="text-base font-bold text-foreground">
                <span className="text-chemistry">O</span>xidation <span className="text-chemistry">I</span>s <span className="text-chemistry">L</span>oss · 
                <span className="text-chemistry"> R</span>eduction <span className="text-chemistry">I</span>s <span className="text-chemistry">G</span>ain
              </p>
              <p className="text-xs text-muted-foreground mt-1">(of electrons)</p>
            </div>
  
            <svg viewBox="0 0 400 150" className="w-full">
              {/* Oxidation half */}
              <rect x={20} y={20} width={170} height={100} rx="8" fill="hsl(0 70% 55%)" opacity="0.08" stroke="hsl(0 70% 55%)" strokeWidth="1.5" />
              <text x={105} y={38} textAnchor="middle" fontSize="10" fill="hsl(0 70% 55%)" fontWeight="bold">OXIDATION</text>
              <text x={105} y={55} textAnchor="middle" fontSize="9" className="fill-foreground">Fe²⁺ → Fe³⁺ + e⁻</text>
              <text x={105} y={72} textAnchor="middle" fontSize="8" className="fill-muted-foreground">Loss of electrons</text>
              <text x={105} y={88} textAnchor="middle" fontSize="8" className="fill-muted-foreground">↑ Oxidation state</text>
              <text x={105} y={105} textAnchor="middle" fontSize="7" className="fill-muted-foreground">e.g. MetHb: Fe²⁺ → Fe³⁺</text>
  
              {/* Electron transfer arrow */}
              <circle cx={200 + osc * 10} cy={70} r={4} fill="hsl(210 70% 60%)" />
              <text x={200} y={58} textAnchor="middle" fontSize="7" className="fill-muted-foreground">e⁻</text>
              <path d="M 192 70 L 210 70" stroke="hsl(210 70% 50%)" strokeWidth="1.5" fill="none" />
  
              {/* Reduction half */}
              <rect x={215} y={20} width={170} height={100} rx="8" fill="hsl(210 70% 50%)" opacity="0.08" stroke="hsl(210 70% 50%)" strokeWidth="1.5" />
              <text x={300} y={38} textAnchor="middle" fontSize="10" fill="hsl(210 70% 50%)" fontWeight="bold">REDUCTION</text>
              <text x={300} y={55} textAnchor="middle" fontSize="9" className="fill-foreground">Cu²⁺ + 2e⁻ → Cu</text>
              <text x={300} y={72} textAnchor="middle" fontSize="8" className="fill-muted-foreground">Gain of electrons</text>
              <text x={300} y={88} textAnchor="middle" fontSize="8" className="fill-muted-foreground">↓ Oxidation state</text>
              <text x={300} y={105} textAnchor="middle" fontSize="7" className="fill-muted-foreground">e.g. cytochrome oxidase</text>
  
              <text x={200} y={140} textAnchor="middle" fontSize="9" className="fill-foreground font-medium">Oxidation and reduction always occur together</text>
            </svg>
  
            <div className="bg-card rounded-xl border border-border p-4">
              <h4 className="text-xs font-semibold text-foreground mb-2">Clinical Redox Reactions</h4>
              <div className="space-y-2 text-xs text-muted-foreground">
                {[
                  { reaction: "Methaemoglobin", detail: "Fe²⁺ in Hb oxidised to Fe³⁺ → cannot bind O₂. Caused by prilocaine (o-toluidine metabolite), GTN, dapsone. Treated with methylene blue (electron carrier)." },
                  { reaction: "Cytochrome P450", detail: "Haem-containing enzymes use redox cycling (Fe²⁺ ⇌ Fe³⁺) to oxidise drug substrates. Phase I metabolism." },
                  { reaction: "Electron transport chain", detail: "Sequential redox reactions in mitochondria. Electrons pass through complexes I-IV. Cyanide blocks complex IV → cellular hypoxia." },
                  { reaction: "Soda lime", detail: "CO₂ + Ca(OH)₂ → CaCO₃ + H₂O. Not a true redox but an acid-base reaction. Sevoflurane + desiccated soda lime → CO (redox degradation)." },
                ].map((item, i) => (
                  <div key={i}>
                    <p className="font-medium text-foreground">{item.reaction}</p>
                    <p>{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
  
        {activeTab === "electrodes" && (
          <div className="space-y-4">
            <div className="bg-secondary/30 rounded-xl p-4 border border-border text-center">
              <p className="text-xs text-muted-foreground mb-1">Electrochemical Cells in Clinical Measurement</p>
              <p className="text-sm font-medium text-foreground">Electrodes convert chemical energy into electrical signals</p>
            </div>
  
            <svg viewBox="0 0 400 180" className="w-full">
              {/* Clark electrode (PO2) */}
              <rect x={20} y={20} width={170} height={140} rx="8" fill="hsl(210 70% 50%)" opacity="0.06" stroke="hsl(210 70% 50%)" strokeWidth="1.5" />
              <text x={105} y={38} textAnchor="middle" fontSize="10" fill="hsl(210 70% 50%)" fontWeight="bold">Clark Electrode (PO₂)</text>
              
              {/* Cathode/Anode */}
              <rect x={60} y={50} width={8} height={60} rx="2" fill="hsl(210 70% 50%)" opacity="0.5" />
              <text x={64} y={120} textAnchor="middle" fontSize="7" className="fill-foreground">Pt cathode</text>
              <rect x={130} y={50} width={8} height={60} rx="2" fill="hsl(45 70% 50%)" opacity="0.5" />
              <text x={134} y={120} textAnchor="middle" fontSize="7" className="fill-foreground">Ag/AgCl</text>
              <text x={134} y={130} textAnchor="middle" fontSize="7" className="fill-muted-foreground">anode</text>
  
              {/* O2 molecules arriving */}
              {[0,1,2].map(i => (
                <circle key={i} cx={40 + osc * 15 + i * 3} cy={70 + i * 10} r={3} fill="hsl(0 70% 55%)" opacity="0.6" />
              ))}
              
              <text x={105} y={145} textAnchor="middle" fontSize="7" className="fill-muted-foreground">O₂ + 4e⁻ + 2H₂O → 4OH⁻</text>
              <text x={105} y={155} textAnchor="middle" fontSize="7" className="fill-muted-foreground">Current ∝ PO₂ (amperometric)</text>
  
              {/* Severinghaus electrode (PCO2) */}
              <rect x={210} y={20} width={170} height={140} rx="8" fill="hsl(95 55% 38%)" opacity="0.06" stroke="hsl(95 55% 38%)" strokeWidth="1.5" />
              <text x={295} y={38} textAnchor="middle" fontSize="10" fill="hsl(95 55% 38%)" fontWeight="bold">Severinghaus (PCO₂)</text>
              
              <rect x={250} y={50} width={90} height={40} rx="4" fill="hsl(95 55% 38%)" opacity="0.1" stroke="hsl(95 55% 38%)" strokeWidth="1" />
              <text x={295} y={68} textAnchor="middle" fontSize="8" className="fill-foreground">pH electrode</text>
              <text x={295} y={80} textAnchor="middle" fontSize="7" className="fill-muted-foreground">in NaHCO₃ solution</text>
              
              <rect x={250} y={95} width={90} height={15} rx="3" fill="hsl(95 55% 38%)" opacity="0.2" stroke="hsl(95 55% 38%)" strokeWidth="1" />
              <text x={295} y={106} textAnchor="middle" fontSize="7" className="fill-foreground">Teflon membrane</text>
  
              <text x={295} y={130} textAnchor="middle" fontSize="7" className="fill-muted-foreground">CO₂ diffuses through membrane</text>
              <text x={295} y={140} textAnchor="middle" fontSize="7" className="fill-muted-foreground">→ changes pH of NaHCO₃</text>
              <text x={295} y={155} textAnchor="middle" fontSize="7" className="fill-muted-foreground">pH change ∝ log PCO₂ (potentiometric)</text>
            </svg>
  
            <div className="bg-card rounded-xl border border-border p-4">
              <h4 className="text-xs font-semibold text-foreground mb-2">Electrode Types Summary</h4>
              <div className="space-y-2 text-xs text-muted-foreground">
                {[
                  { name: "pH (Sanz) electrode", type: "Potentiometric", principle: "H⁺-sensitive glass membrane generates voltage proportional to [H⁺]" },
                  { name: "Clark (PO₂) electrode", type: "Amperometric", principle: "O₂ reduced at Pt cathode → current proportional to PO₂. -0.6V applied." },
                  { name: "Severinghaus (PCO₂)", type: "Modified pH", principle: "CO₂ crosses Teflon membrane, dissolves in NaHCO₃, changes pH" },
                  { name: "Galvanic fuel cell", type: "Amperometric", principle: "O₂ analysers. Lead anode + gold cathode in KOH. Self-generating — no external voltage." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="font-medium text-foreground min-w-[130px]">{item.name}</span>
                    <span><strong>{item.type}:</strong> {item.principle}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
  
        {activeTab === "radicals" && (
          <div className="space-y-4">
            <div className="bg-secondary/30 rounded-xl p-4 border border-border text-center">
              <p className="text-xs text-muted-foreground mb-1">Free Radicals</p>
              <p className="text-sm font-medium text-foreground">Species with an unpaired electron — highly reactive</p>
              <p className="text-xs text-muted-foreground mt-1">Written with a dot: O₂•⁻ (superoxide), •OH (hydroxyl radical), NO• (nitric oxide)</p>
            </div>
  
            <svg viewBox="0 0 400 140" className="w-full">
              {/* ROS cascade */}
              <text x={200} y={18} textAnchor="middle" fontSize="10" className="fill-foreground font-semibold">Reactive Oxygen Species (ROS) Cascade</text>
              
              {/* O2 → Superoxide → H2O2 → OH• → H2O */}
              {[
                { label: "O₂", x: 40, color: "hsl(210 70% 50%)" },
                { label: "O₂•⁻", x: 120, color: "hsl(25 80% 50%)" },
                { label: "H₂O₂", x: 200, color: "hsl(45 70% 50%)" },
                { label: "•OH", x: 280, color: "hsl(0 70% 55%)" },
                { label: "H₂O", x: 360, color: "hsl(210 70% 50%)" },
              ].map((item, i) => (
                <g key={i}>
                  <circle cx={item.x} cy={60} r={22} fill={item.color} opacity="0.12" stroke={item.color} strokeWidth="1.5" />
                  <text x={item.x} y={64} textAnchor="middle" fontSize="10" fill={item.color} fontWeight="bold">{item.label}</text>
                  {i < 4 && <path d={`M ${item.x + 24} 60 L ${[120,200,280,360][i] - 24} 60`} stroke="hsl(var(--foreground))" strokeWidth="1" fill="none" opacity="0.5" markerEnd="url(#arrow)" />}
                </g>
              ))}
              {/* Enzyme labels */}
              <text x={80} y={45} textAnchor="middle" fontSize="7" className="fill-muted-foreground">+e⁻</text>
              <text x={160} y={45} textAnchor="middle" fontSize="7" className="fill-muted-foreground">SOD</text>
              <text x={240} y={45} textAnchor="middle" fontSize="7" className="fill-muted-foreground">Fenton</text>
              <text x={320} y={45} textAnchor="middle" fontSize="7" className="fill-muted-foreground">+e⁻</text>
  
              {/* Defence mechanisms */}
              <text x={200} y={105} textAnchor="middle" fontSize="9" className="fill-foreground font-semibold">Antioxidant Defences</text>
              <text x={80} y={125} textAnchor="middle" fontSize="8" className="fill-muted-foreground">SOD</text>
              <text x={160} y={125} textAnchor="middle" fontSize="8" className="fill-muted-foreground">Catalase</text>
              <text x={240} y={125} textAnchor="middle" fontSize="8" className="fill-muted-foreground">Glutathione</text>
              <text x={330} y={125} textAnchor="middle" fontSize="8" className="fill-muted-foreground">Vit C, E</text>
            </svg>
  
            <div className="bg-card rounded-xl border border-border p-4">
              <h4 className="text-xs font-semibold text-foreground mb-2">Clinical Relevance of Free Radicals</h4>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                <li><strong>Ischaemia-reperfusion injury:</strong> Xanthine oxidase generates superoxide during reperfusion. Major cause of organ damage after ROSC, transplant, tourniquet release.</li>
                <li><strong>Oxygen toxicity:</strong> High FiO₂ → excessive ROS → pulmonary endothelial damage → ARDS-like picture. Keep FiO₂ ≤0.6 when possible.</li>
                <li><strong>Nitric oxide (NO•):</strong> A free radical used therapeutically — vasodilator, inhaled for pulmonary hypertension. Reacts with superoxide → peroxynitrite (cytotoxic).</li>
                <li><strong>Paracetamol toxicity:</strong> CYP450 generates NAPQI (oxidising metabolite) → depletes glutathione → hepatocyte necrosis. N-acetylcysteine replenishes glutathione.</li>
                <li><strong>Propofol infusion syndrome:</strong> Mitochondrial electron transport chain dysfunction → impaired fatty acid oxidation → ROS accumulation.</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </DiagramFigure>
  );
};
