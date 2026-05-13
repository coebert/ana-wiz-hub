import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const CBFAutoregulationDiagram = () => {
  const [selectedMAP, setSelectedMAP] = useState<number | null>(null);
  const [selectedGas, setSelectedGas] = useState<"co2" | "o2" | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  const mapZones = [
    { range: "0–50", label: "Below autoregulation", cbf: "Flow falls passively with pressure", clinical: "Ischaemia risk — watershed infarcts. Seen in hypotension, high spinal block.", color: "hsl(0 70% 50%)" },
    { range: "50–60", label: "Lower limit", cbf: "~50 ml/100g/min (threshold)", clinical: "Lower limit shifts RIGHT with chronic hypertension, sympathetic activation. Shifts LEFT with volatiles.", color: "hsl(30 70% 50%)" },
    { range: "60–150", label: "Autoregulatory plateau", cbf: "Maintained ~50 ml/100g/min", clinical: "Myogenic (Bayliss effect) + metabolic mechanisms. Flow-metabolism coupling intact.", color: "hsl(142 60% 45%)" },
    { range: "150–160", label: "Upper limit", cbf: "~50 ml/100g/min (breakthrough)", clinical: "Upper limit also shifts RIGHT with chronic HTN. Volatile agents may lower it.", color: "hsl(30 70% 50%)" },
    { range: ">160", label: "Above autoregulation", cbf: "Flow rises passively — forced dilatation", clinical: "Breakthrough hyperperfusion → vasogenic oedema, haemorrhage. Hypertensive encephalopathy.", color: "hsl(0 70% 50%)" },
  ];

  const gasEffects = {
    co2: {
      title: "PaCO₂ Effects on CBF",
      subtitle: "Most potent physiological regulator of CBF",
      points: [
        { level: "< 2.5 kPa", cbf: "~25 ml/100g/min", effect: "Severe vasoconstriction → ischaemia risk. No further benefit below 2.7 kPa. CSF pH normalises in 6–8 hours negating effect.", color: "hsl(200 70% 50%)" },
        { level: "3.5–4.5 kPa", cbf: "~35–45 ml/100g/min", effect: "Mild hyperventilation target for ↓ICP. Each 1 kPa ↓PaCO₂ reduces CBF by ~30%. Safe therapeutic window.", color: "hsl(142 60% 45%)" },
        { level: "5.3 kPa (normal)", cbf: "~50 ml/100g/min", effect: "Normal resting CBF. Flow-metabolism coupling intact. Arteriolar tone at baseline.", color: "hsl(142 60% 45%)" },
        { level: "6–8 kPa", cbf: "~70–90 ml/100g/min", effect: "Vasodilatation → ↑CBF → ↑ICP. Each 1 kPa ↑PaCO₂ increases CBF by ~30%.", color: "hsl(30 70% 50%)" },
        { level: "> 10 kPa", cbf: "~100+ ml/100g/min", effect: "Maximal vasodilatation. Loss of CO₂ reactivity. Cerebral steal phenomenon in ischaemic areas.", color: "hsl(0 70% 50%)" },
      ],
      mechanism: "CO₂ crosses BBB → alters perivascular pH → smooth muscle relaxation/contraction via NO and prostanoids. Effect on arterioles (resistance vessels), not capillaries.",
    },
    o2: {
      title: "PaO₂ Effects on CBF",
      subtitle: "Threshold effect — significant only at extremes",
      points: [
        { level: "< 6.7 kPa (50 mmHg)", cbf: "↑↑↑ Exponential rise", effect: "Steep increase in CBF below PaO₂ ~8 kPa. Hypoxic vasodilation mediated by adenosine, K⁺ATP channels, NO.", color: "hsl(0 70% 50%)" },
        { level: "8–13 kPa (normal)", cbf: "~50 ml/100g/min", effect: "Minimal effect of PaO₂ on CBF in the normal range. O₂ reactivity is ~7% per kPa (much less than CO₂).", color: "hsl(142 60% 45%)" },
        { level: "> 40 kPa (hyperbaric)", cbf: "↓ Modest decrease", effect: "Hyperoxic vasoconstriction — mild (~10–15% reduction). Used clinically in hyperbaric O₂ therapy.", color: "hsl(200 70% 50%)" },
      ],
      mechanism: "O₂ effect is a threshold response. CBF remains stable until PaO₂ drops below ~8 kPa, then rises sharply. Mediated by local metabolites (adenosine, lactate, H⁺) rather than direct O₂ effect on vessels.",
    },
  };

  const agents = [
    { name: "Propofol", cbf: "↓↓", cmro2: "↓↓", coupling: "Maintained", autoregulation: "Maintained", icp: "↓↓", clinical: "Ideal for neuroanesthesia. Dose-dependent ↓CBF/CMRO₂. Preserves autoregulation and CO₂ reactivity. TIVA preferred for neurosurgery." },
    { name: "Thiopentone", cbf: "↓↓↓", cmro2: "↓↓↓", coupling: "Maintained", autoregulation: "Maintained", icp: "↓↓↓", clinical: "Most potent CMRO₂ reducer — to isoelectric EEG (burst suppression). Used for refractory ↑ICP and neuroprotection. No benefit beyond burst suppression." },
    { name: "Sevoflurane", cbf: "↑ (dose-dep)", cmro2: "↓", coupling: "Uncoupled >1 MAC", autoregulation: "Impaired >1 MAC", icp: "↑", clinical: "Acceptable <1 MAC with hyperventilation. Dose-dependent cerebral vasodilatation. >1.5 MAC disrupts autoregulation. CO₂ reactivity preserved." },
    { name: "Desflurane", cbf: "↑↑", cmro2: "↓", coupling: "Uncoupled", autoregulation: "Impaired", icp: "↑↑", clinical: "Greater CBF increase than sevoflurane at equivalent MAC. More sympathetic stimulation. Less ideal for neurosurgery." },
    { name: "N₂O", cbf: "↑↑", cmro2: "↑", coupling: "Maintained but ↑", autoregulation: "Maintained", icp: "↑↑", clinical: "Increases both CBF AND CMRO₂ — unique among anaesthetics. Avoid in neurosurgery. Expands pneumocephalus (34× more soluble than N₂)." },
    { name: "Ketamine", cbf: "↑↑", cmro2: "↑↑", coupling: "Maintained", autoregulation: "Unknown", icp: "↑↑", clinical: "Traditionally contraindicated in ↑ICP. Recent evidence suggests safe with controlled ventilation. NMDA antagonism → ↑excitatory neurotransmission." },
    { name: "Remifentanil", cbf: "↓ (mild)", cmro2: "↓ (mild)", coupling: "Maintained", autoregulation: "Maintained", icp: "↓ (mild)", clinical: "Minimal cerebral effects. Excellent for neurosurgery — rapid offset, titratable. Reduces propofol requirements. Preserves autoregulation." },
    { name: "Dexmedetomidine", cbf: "↓", cmro2: "↓", coupling: "Maintained", autoregulation: "Maintained", icp: "↓", clinical: "α₂-agonist. Useful for awake craniotomy — sedation without respiratory depression. Preserves neurological assessment. May cause bradycardia/hypotension." },
  ];

  return (
    <div className="my-6 p-4 bg-muted/30 rounded-xl border border-border">
      <h3 className="text-lg font-bold text-foreground mb-1">Cerebral Blood Flow Autoregulation</h3>
      <p className="text-sm text-muted-foreground mb-4">Interactive guide to CBF regulation, gas effects, and anaesthetic agents</p>

      <Tabs defaultValue="curve" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="curve" className="text-xs">Autoregulation</TabsTrigger>
          <TabsTrigger value="gases" className="text-xs">CO₂ & O₂</TabsTrigger>
          <TabsTrigger value="agents" className="text-xs">Agents</TabsTrigger>
        </TabsList>

        <TabsContent value="curve">
          {/* SVG Autoregulation Curve */}
          <div className="mb-4">
            <svg viewBox="0 0 500 280" className="w-full h-auto">
              <defs>
                <linearGradient id="cbf-plateau" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="hsl(30,70%,50%)" />
                  <stop offset="15%" stopColor="hsl(142,60%,45%)" />
                  <stop offset="85%" stopColor="hsl(142,60%,45%)" />
                  <stop offset="100%" stopColor="hsl(30,70%,50%)" />
                </linearGradient>
              </defs>
              {/* Axes */}
              <line x1="60" y1="230" x2="480" y2="230" stroke="hsl(var(--border))" strokeWidth="1.5" />
              <line x1="60" y1="30" x2="60" y2="230" stroke="hsl(var(--border))" strokeWidth="1.5" />
              <text x="270" y="265" textAnchor="middle" className="fill-muted-foreground" fontSize="11">MAP (mmHg)</text>
              <text x="20" y="130" textAnchor="middle" className="fill-muted-foreground" fontSize="11" transform="rotate(-90,20,130)">CBF (ml/100g/min)</text>

              {/* MAP labels */}
              {[0, 50, 100, 150, 200].map((v) => (
                <g key={v}>
                  <line x1={60 + v * 2.1} y1="230" x2={60 + v * 2.1} y2="235" stroke="hsl(var(--border))" />
                  <text x={60 + v * 2.1} y="248" textAnchor="middle" className="fill-muted-foreground" fontSize="9">{v}</text>
                </g>
              ))}
              {/* CBF labels */}
              {[0, 25, 50, 75, 100].map((v) => (
                <g key={v}>
                  <line x1="55" y1={230 - v * 2} x2="60" y2={230 - v * 2} stroke="hsl(var(--border))" />
                  <text x="50" y={234 - v * 2} textAnchor="end" className="fill-muted-foreground" fontSize="9">{v}</text>
                </g>
              ))}

              {/* Normal autoregulation curve */}
              <path
                d="M 60,230 L 120,160 Q 145,130 165,130 L 370,130 Q 390,130 410,100 L 470,40"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Dashed line for 50 ml/100g/min */}
              <line x1="60" y1="130" x2="480" y2="130" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="4,4" />
              <text x="485" y="134" className="fill-muted-foreground" fontSize="8" textAnchor="start">50</text>

              {/* Zone labels */}
              <text x="95" y="55" className="fill-destructive" fontSize="9" textAnchor="middle" fontWeight="600">Ischaemia</text>
              <text x="270" y="55" className="fill-primary" fontSize="10" textAnchor="middle" fontWeight="700">Autoregulatory Plateau</text>
              <text x="270" y="68" className="fill-muted-foreground" fontSize="8" textAnchor="middle">Myogenic + Metabolic</text>
              <text x="445" y="55" className="fill-destructive" fontSize="9" textAnchor="middle" fontWeight="600">Breakthrough</text>

              {/* Vertical zone boundaries */}
              <line x1="165" y1="40" x2="165" y2="225" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="3,3" />
              <line x1="370" y1="40" x2="370" y2="225" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="3,3" />
              <text x="165" y="220" className="fill-muted-foreground" fontSize="8" textAnchor="middle">~60</text>
              <text x="370" y="220" className="fill-muted-foreground" fontSize="8" textAnchor="middle">~150</text>

              {/* Shifted curve — chronic HTN */}
              <path
                d="M 60,230 L 170,175 Q 200,145 225,145 L 420,145 Q 440,145 455,115 L 475,55"
                fill="none"
                stroke="hsl(0,70%,60%)"
                strokeWidth="2"
                strokeDasharray="6,3"
                strokeLinecap="round"
                opacity="0.7"
              />
              <text x="440" y="100" fontSize="8" fill="hsl(0,70%,60%)" fontWeight="600">Chronic HTN</text>
              <text x="440" y="112" fontSize="7" fill="hsl(0,70%,60%)">(shifted right)</text>
            </svg>
          </div>

          {/* MAP Zone selector */}
          <p className="text-xs font-semibold text-foreground mb-2">Select a MAP zone:</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
            {mapZones.map((z, i) => (
              <button
                key={i}
                onClick={() => setSelectedMAP(selectedMAP === i ? null : i)}
                className={`p-2 rounded-lg border text-left transition-all text-xs ${selectedMAP === i ? "border-primary bg-primary/10 ring-1 ring-primary" : "border-border hover:border-primary/50"}`}
              >
                <span className="font-bold" style={{ color: z.color }}>{z.range} mmHg</span>
                <p className="text-muted-foreground mt-0.5">{z.label}</p>
              </button>
            ))}
          </div>
          {selectedMAP !== null && (
            <div className="p-3 rounded-lg border border-primary/30 bg-primary/5 text-sm animate-fade-in">
              <p className="font-semibold text-foreground">{mapZones[selectedMAP].label} — MAP {mapZones[selectedMAP].range} mmHg</p>
              <p className="text-muted-foreground mt-1"><strong>CBF:</strong> {mapZones[selectedMAP].cbf}</p>
              <p className="text-muted-foreground mt-1"><strong>Clinical:</strong> {mapZones[selectedMAP].clinical}</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="gases">
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setSelectedGas("co2")}
              className={`flex-1 p-2 rounded-lg border text-sm font-semibold transition-all ${selectedGas === "co2" ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}
            >
              PaCO₂
            </button>
            <button
              onClick={() => setSelectedGas("o2")}
              className={`flex-1 p-2 rounded-lg border text-sm font-semibold transition-all ${selectedGas === "o2" ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}
            >
              PaO₂
            </button>
          </div>

          {selectedGas && (
            <div className="animate-fade-in">
              <h4 className="font-bold text-foreground text-sm">{gasEffects[selectedGas].title}</h4>
              <p className="text-xs text-muted-foreground mb-3">{gasEffects[selectedGas].subtitle}</p>

              {/* SVG curve */}
              <svg viewBox="0 0 400 180" className="w-full h-auto mb-3">
                <line x1="50" y1="150" x2="380" y2="150" stroke="hsl(var(--border))" strokeWidth="1" />
                <line x1="50" y1="20" x2="50" y2="150" stroke="hsl(var(--border))" strokeWidth="1" />
                <text x="215" y="175" textAnchor="middle" className="fill-muted-foreground" fontSize="10">
                  {selectedGas === "co2" ? "PaCO₂ (kPa)" : "PaO₂ (kPa)"}
                </text>
                <text x="15" y="85" textAnchor="middle" className="fill-muted-foreground" fontSize="10" transform="rotate(-90,15,85)">CBF</text>

                {selectedGas === "co2" ? (
                  <>
                    <path d="M 60,140 Q 120,135 180,90 Q 240,45 320,30 L 370,25" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" />
                    <text x="100" y="125" fontSize="8" className="fill-muted-foreground">Hypocapnia</text>
                    <text x="220" y="60" fontSize="8" className="fill-muted-foreground">Normocapnia</text>
                    <text x="330" y="45" fontSize="8" className="fill-muted-foreground">Hypercapnia</text>
                    <line x1="200" y1="25" x2="200" y2="145" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="3,3" />
                    <text x="200" y="162" fontSize="8" className="fill-muted-foreground" textAnchor="middle">5.3</text>
                    <text x="200" y="18" fontSize="7" className="fill-primary" textAnchor="middle" fontWeight="600">~30% per kPa</text>
                  </>
                ) : (
                  <>
                    <path d="M 60,30 Q 80,32 100,35 Q 130,55 160,100 Q 180,130 220,135 L 370,138" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" />
                    <text x="90" y="55" fontSize="8" className="fill-destructive" fontWeight="600">Hypoxic</text>
                    <text x="90" y="65" fontSize="8" className="fill-destructive">vasodilatation</text>
                    <text x="270" y="128" fontSize="8" className="fill-muted-foreground">Minimal O₂ effect</text>
                    <line x1="160" y1="25" x2="160" y2="145" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="3,3" />
                    <text x="160" y="162" fontSize="8" className="fill-muted-foreground" textAnchor="middle">8 kPa</text>
                    <text x="160" y="18" fontSize="7" className="fill-destructive" textAnchor="middle" fontWeight="600">Threshold</text>
                  </>
                )}
              </svg>

              <div className="space-y-2 mb-3">
                {gasEffects[selectedGas].points.map((p, i) => (
                  <div key={i} className="p-2 rounded border border-border text-xs">
                    <span className="font-bold" style={{ color: p.color }}>{p.level}</span>
                    <span className="text-muted-foreground ml-2">CBF {p.cbf}</span>
                    <p className="text-muted-foreground mt-1">{p.effect}</p>
                  </div>
                ))}
              </div>
              <div className="p-2 rounded bg-primary/5 border border-primary/20 text-xs text-muted-foreground">
                <strong className="text-foreground">Mechanism: </strong>{gasEffects[selectedGas].mechanism}
              </div>
            </div>
          )}
          {!selectedGas && <p className="text-sm text-muted-foreground text-center py-6">Select PaCO₂ or PaO₂ above</p>}
        </TabsContent>

        <TabsContent value="agents">
          <p className="text-xs text-muted-foreground mb-3">Tap an agent to see cerebral effects and clinical relevance</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
            {agents.map((a) => (
              <button
                key={a.name}
                onClick={() => setSelectedAgent(selectedAgent === a.name ? null : a.name)}
                className={`p-2 rounded-lg border text-xs font-semibold transition-all ${selectedAgent === a.name ? "border-primary bg-primary/10 text-primary" : "border-border text-foreground hover:border-primary/50"}`}
              >
                {a.name}
              </button>
            ))}
          </div>

          {selectedAgent && (() => {
            const a = agents.find((x) => x.name === selectedAgent)!;
            return (
              <div className="p-3 rounded-lg border border-primary/30 bg-primary/5 animate-fade-in">
                <p className="font-bold text-foreground text-sm mb-2">{a.name}</p>
                <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                  <div className="p-2 rounded bg-background border border-border"><span className="text-muted-foreground">CBF:</span> <span className="font-semibold text-foreground">{a.cbf}</span></div>
                  <div className="p-2 rounded bg-background border border-border"><span className="text-muted-foreground">CMRO₂:</span> <span className="font-semibold text-foreground">{a.cmro2}</span></div>
                  <div className="p-2 rounded bg-background border border-border"><span className="text-muted-foreground">Coupling:</span> <span className="font-semibold text-foreground">{a.coupling}</span></div>
                  <div className="p-2 rounded bg-background border border-border"><span className="text-muted-foreground">Autoreg:</span> <span className="font-semibold text-foreground">{a.autoregulation}</span></div>
                  <div className="p-2 rounded bg-background border border-border col-span-2"><span className="text-muted-foreground">ICP:</span> <span className="font-semibold text-foreground">{a.icp}</span></div>
                </div>
                <p className="text-xs text-muted-foreground">{a.clinical}</p>
              </div>
            );
          })()}

          {!selectedAgent && (
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-1.5 text-foreground">Agent</th>
                    <th className="text-left py-1.5 text-foreground">CBF</th>
                    <th className="text-left py-1.5 text-foreground">CMRO₂</th>
                    <th className="text-left py-1.5 text-foreground">ICP</th>
                    <th className="text-left py-1.5 text-foreground">Autoreg</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  {agents.map((a) => (
                    <tr key={a.name} className="border-b border-border cursor-pointer hover:bg-muted/50" onClick={() => setSelectedAgent(a.name)}>
                      <td className="py-1.5 font-medium text-foreground">{a.name}</td>
                      <td>{a.cbf}</td>
                      <td>{a.cmro2}</td>
                      <td>{a.icp}</td>
                      <td>{a.autoregulation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CBFAutoregulationDiagram;
