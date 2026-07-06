import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const FreeFlaPerfusionDiagram = () => {
  const [selectedFactor, setSelectedFactor] = useState<number | null>(null);
  const [selectedSign, setSelectedSign] = useState<string | null>(null);

  const perfusionFactors = [
    { factor: "Normotension", target: "MAP ≥65 mmHg", detail: "Maintain adequate perfusion pressure across the microvascular anastomosis. Hypotension reduces flow through small-calibre vessels. Use arterial line for continuous monitoring. Fluid boluses first; vasopressors as second line.", color: "hsl(var(--primary))" },
    { factor: "Normovolaemia", target: "Goal-directed", detail: "Both hypovolaemia (↓preload → ↓CO → ↓flap perfusion) and hypervolaemia (tissue oedema → ↑interstitial pressure → venous congestion) impair flap survival. Use stroke volume variation or pulse pressure variation to guide fluid therapy. Target crystalloid 1–2 ml/kg/h maintenance.", color: "hsl(142 60% 45%)" },
    { factor: "Normothermia", target: "Core >36°C", detail: "Hypothermia causes vasoconstriction (↓flow through anastomosis), platelet dysfunction (↑thrombosis risk), coagulopathy, and shivering (↑O₂ consumption). Forced-air warming, warmed IV fluids, theatre temperature ≥23°C. Monitor core temperature continuously.", color: "hsl(25 80% 50%)" },
    { factor: "Haemodilution", target: "Hct 30–35%", detail: "Mild haemodilution reduces blood viscosity (Poiseuille's law: flow ∝ 1/viscosity) improving microcirculatory flow through 1–3 mm diameter anastomosed vessels. Excessive haemodilution (<25%) reduces O₂-carrying capacity. Transfuse to maintain Hb >80 g/L.", color: "hsl(280 60% 55%)" },
    { factor: "Avoid Vasoconstrictors", target: "Low-dose norad if needed", detail: "Phenylephrine and metaraminol (pure α-agonists) cause direct flap vessel vasospasm and are generally avoided. If vasopressors are required, low-dose noradrenaline is preferred — it maintains MAP through both α₁ and β₁ effects without excessive microvascular constriction at low doses.", color: "hsl(0 70% 50%)" },
    { factor: "Analgesia", target: "Regional + multimodal", detail: "Regional anaesthesia (perforator blocks, TAP, pectoralis) provides excellent analgesia AND sympathetic blockade which improves flap perfusion. Reduces opioid-related nausea and sedation. Avoid NSAIDs if bleeding risk concerns. Paracetamol, gabapentinoids, ketamine as adjuncts.", color: "hsl(200 70% 50%)" },
  ];

  const flapSigns = [
    { id: "arterial", type: "Arterial Insufficiency", signs: ["Pale/white flap", "Cool to touch", "No capillary refill", "No Doppler signal", "Collapsed, non-bleeding on pinprick"], action: "Return to theatre URGENTLY — re-explore anastomosis. Thrombectomy, revision, or vein graft. Heparinised saline flush. Best salvage within 1–2 hours.", urgent: true },
    { id: "venous", type: "Venous Congestion", signs: ["Dusky blue/purple colour", "Warm and swollen", "Brisk/instant capillary refill", "Dark blood on pinprick (rapid bleeding)", "Doppler may show arterial signal"], action: "More common than arterial occlusion. Check for external compression (ties, tapes, haematoma). Elevate flap. Consider medicinal leeches (Hirudo medicinalis) as temporising measure. Urgent re-exploration.", urgent: true },
    { id: "normal", type: "Normal Flap", signs: ["Pink colour (matching surrounding tissue)", "Warm to touch", "Capillary refill 1–3 seconds", "Bright red blood on pinprick", "Good Doppler signal (biphasic arterial)"], action: "Continue q1h observations for 48–72h, then q2h. Document colour, temperature, CRT, turgor, and Doppler at each check. Buried flaps: implantable Doppler probe.", urgent: false },
  ];

  const timeline = [
    { phase: "Preoperative", time: "Day before", items: ["Crossmatch 2–4 units", "Arterial line, urinary catheter", "Warming devices", "Check anticoagulation plan", "Mark flap and recipient sites"] },
    { phase: "Flap Harvest", time: "0–3 hours", items: ["Maintain haemodynamic targets", "Avoid excessive fluid", "Regional block if applicable", "Forced-air warming active", "Inform blood bank"] },
    { phase: "Anastomosis", time: "3–6 hours", items: ["Critical period — avoid BP swings", "Heparin bolus per surgeon", "No cuff on flap arm", "Optimise Hct to 30–35%", "Zero patient movement"] },
    { phase: "Insetting", time: "6–10 hours", items: ["Confirm flap perfusion (colour, CRT, Doppler)", "Multimodal analgesia", "Plan extubation vs delayed", "Avoid shivering on emergence", "Handover flap observations"] },
    { phase: "Postoperative", time: "0–72 hours", items: ["Q1h flap observations", "Keep warm (warming blanket)", "Avoid vasoconstrictors", "Aspirin + LMWH per protocol", "Nil by mouth → clear fluids per surgeon"] },
  ];

  return (
    <div className="my-6 p-4 bg-muted/30 rounded-xl border border-border">
      <h3 className="text-lg font-bold text-foreground mb-1">Free Flap Anaesthesia — Interactive Guide</h3>
      <p className="text-sm text-muted-foreground mb-4">Perfusion optimisation, flap monitoring, and surgical timeline</p>

      <Tabs defaultValue="perfusion" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="perfusion" className="text-xs">Perfusion Targets</TabsTrigger>
          <TabsTrigger value="monitoring" className="text-xs">Flap Monitoring</TabsTrigger>
          <TabsTrigger value="timeline" className="text-xs">Surgical Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="perfusion">
          <div className="space-y-2">
            {perfusionFactors.map((f, i) => (
              <button
                key={i}
                onClick={() => setSelectedFactor(selectedFactor === i ? null : i)}
                className="w-full text-left transition-all"
              >
                <div className={`p-3 rounded-lg border ${selectedFactor === i ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"}`}>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: f.color }} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-foreground text-sm">{f.factor}</p>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/15 text-primary font-semibold">{f.target}</span>
                      </div>
                    </div>
                  </div>
                  {selectedFactor === i && (
                    <p className="text-xs text-muted-foreground mt-2 ml-6 animate-fade-in leading-relaxed">{f.detail}</p>
                  )}
                </div>
              </button>
            ))}
          </div>
          <div className="mt-3 p-2 rounded bg-accent/10 border border-accent/20 text-xs text-muted-foreground">
            <strong className="text-foreground">Key principle: </strong>
            Flap survival depends on maintaining laminar flow through a 1–3 mm anastomosis. Every factor above influences Poiseuille's equation — optimise all simultaneously.
          </div>
        </TabsContent>

        <TabsContent value="monitoring">
          <div className="space-y-3">
            {flapSigns.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSign(selectedSign === s.id ? null : s.id)}
                className="w-full text-left"
              >
                <div className={`p-3 rounded-lg border transition-all ${selectedSign === s.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"} ${s.urgent ? "" : ""}`}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-bold text-foreground text-sm">{s.type}</p>
                    {s.urgent && <span className="text-[10px] px-1.5 py-0.5 rounded bg-destructive/15 text-destructive font-semibold">URGENT</span>}
                    {!s.urgent && <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent/15 text-accent font-semibold">Normal</span>}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {s.signs.map((sign, j) => (
                      <span key={j} className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">{sign}</span>
                    ))}
                  </div>
                  {selectedSign === s.id && (
                    <div className={`mt-2 p-2 rounded text-xs leading-relaxed ${s.urgent ? "bg-destructive/5 text-foreground" : "bg-accent/5 text-muted-foreground"}`}>
                      <strong>Action: </strong>{s.action}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
          <div className="mt-3 p-2 rounded bg-destructive/5 border border-destructive/20 text-xs text-muted-foreground">
            <strong className="text-foreground">Golden rule: </strong>
            Re-exploration within 1–2 hours of compromise detection significantly improves salvage rates. Never adopt a "wait and see" approach with a compromised flap.
          </div>
        </TabsContent>

        <TabsContent value="timeline">
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
            <div className="space-y-4">
              {timeline.map((phase, i) => (
                <div key={i} className="relative pl-10">
                  <div className="absolute left-2.5 top-1 w-3 h-3 rounded-full bg-primary border-2 border-background" />
                  <div className="p-3 rounded-lg border border-border bg-card">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-bold text-foreground text-sm">{phase.phase}</p>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-medium">{phase.time}</span>
                    </div>
                    <ul className="space-y-0.5">
                      {phase.items.map((item, j) => (
                        <li key={j} className="text-xs text-muted-foreground flex items-start gap-1.5">
                          <span className="text-primary mt-0.5">•</span>{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FreeFlaPerfusionDiagram;
