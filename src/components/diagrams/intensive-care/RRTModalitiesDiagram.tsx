import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DiagramFigure } from "../_shared/DiagramFigure";

type ModalityId = "cvvh" | "cvvhd" | "cvvhdf";

const RRTModalitiesDiagram = () => {
  const [selectedModality, setSelectedModality] = useState<ModalityId>("cvvhdf");
  const [selectedAnticoag, setSelectedAnticoag] = useState<string | null>(null);

  const modalities: Record<ModalityId, { name: string; full: string; mechanism: string; clearance: string; advantages: string; disadvantages: string; bestFor: string }> = {
    cvvh: {
      name: "CVVH",
      full: "Continuous Veno-Venous Haemofiltration",
      mechanism: "Convection only. Blood passes across haemofilter membrane under transmembrane pressure. Plasma water + solutes dragged through membrane (solvent drag). Replacement fluid added pre- or post-filter.",
      clearance: "Convective clearance — equally effective for small AND middle molecules (up to ~20 kDa). Sieving coefficient ≈ 1 for small molecules. Better middle-molecule clearance than diffusion alone.",
      advantages: "Superior middle-molecule clearance (cytokines, β₂-microglobulin). Mimics glomerular filtration. Good for sepsis (cytokine removal theory).",
      disadvantages: "Requires large volumes of replacement fluid (expensive). Filter clotting more common. Haemoconcentration at filter if pre-dilution not used.",
      bestFor: "Sepsis, cytokine-mediated illness, middle-molecule clearance",
    },
    cvvhd: {
      name: "CVVHD",
      full: "Continuous Veno-Venous Haemodialysis",
      mechanism: "Diffusion only. Dialysate flows counter-current to blood across semi-permeable membrane. Solutes move down concentration gradient from blood to dialysate. No replacement fluid needed.",
      clearance: "Diffusive clearance — excellent for small molecules (urea, creatinine, K⁺, <500 Da). Poor middle-molecule clearance. Clearance ∝ 1/molecular weight.",
      advantages: "Simple setup (no replacement fluid). Efficient small-molecule clearance. Less filter clotting (no haemoconcentration). Lower cost.",
      disadvantages: "Poor middle-molecule clearance. Less 'physiological' than convection. Dialysate flow rate limits clearance.",
      bestFor: "Uraemia, hyperkalaemia, small-molecule toxin removal, simple setup",
    },
    cvvhdf: {
      name: "CVVHDF",
      full: "Continuous Veno-Venous Haemodiafiltration",
      mechanism: "Combined convection + diffusion. Dialysate AND replacement fluid used simultaneously. Most common CRRT modality in UK ICUs. Combines advantages of both mechanisms.",
      clearance: "Both small AND middle-molecule clearance. Total effluent = dialysate + ultrafiltrate + net fluid removal. Most versatile modality. Dose measured as total effluent rate (ml/kg/hr).",
      advantages: "Best overall solute clearance across molecular weight range. Most commonly used. Flexible — can adjust convective/diffusive ratio. Standard of care in most ICUs.",
      disadvantages: "Most complex setup. Highest fluid/consumable costs. Requires both dialysate and replacement fluid management.",
      bestFor: "Standard ICU CRRT — covers all clearance needs. Default modality for most patients.",
    },
  };

  const renderCircuitSVG = (mode: ModalityId) => (
    <svg viewBox="0 0 400 220" className="w-full h-auto">
      {/* Patient */}
      <rect x="10" y="85" width="50" height="50" rx="8" fill="hsl(0,70%,55%)" opacity="0.15" stroke="hsl(0,70%,55%)" strokeWidth="1.5" />
      <text x="35" y="107" textAnchor="middle" fill="hsl(0,70%,55%)" fontSize="8" fontWeight="600">Patient</text>
      <text x="35" y="118" textAnchor="middle" fill="hsl(0,70%,55%)" fontSize="7">Dialysis catheter</text>

      {/* Blood pump */}
      <circle cx="115" cy="110" r="18" fill="hsl(var(--primary))" opacity="0.15" stroke="hsl(var(--primary))" strokeWidth="1.5" />
      <text x="115" y="108" textAnchor="middle" className="fill-primary" fontSize="7" fontWeight="600">Blood</text>
      <text x="115" y="118" textAnchor="middle" className="fill-primary" fontSize="7">Pump</text>
      <text x="115" y="140" textAnchor="middle" className="fill-muted-foreground" fontSize="6">150-250 mL/min</text>

      {/* Lines to filter */}
      <line x1="60" y1="100" x2="97" y2="100" stroke="hsl(0,70%,55%)" strokeWidth="2" />
      <line x1="133" y1="100" x2="170" y2="100" stroke="hsl(0,70%,55%)" strokeWidth="2" />

      {/* Pre-filter replacement (CVVH/CVVHDF) */}
      {(mode === "cvvh" || mode === "cvvhdf") && (
        <>
          <rect x="135" y="55" width="45" height="28" rx="4" fill="hsl(200,70%,50%)" opacity="0.15" stroke="hsl(200,70%,50%)" strokeWidth="1" />
          <text x="157" y="68" textAnchor="middle" fill="hsl(200,70%,50%)" fontSize="6" fontWeight="600">Pre-dilution</text>
          <text x="157" y="78" textAnchor="middle" fill="hsl(200,70%,50%)" fontSize="5">Replacement</text>
          <line x1="157" y1="83" x2="157" y2="100" stroke="hsl(200,70%,50%)" strokeWidth="1" />
        </>
      )}

      {/* Haemofilter */}
      <rect x="170" y="70" width="90" height="80" rx="6" fill="hsl(var(--muted))" opacity="0.3" stroke="hsl(var(--border))" strokeWidth="1.5" />
      <text x="215" y="90" textAnchor="middle" className="fill-foreground" fontSize="9" fontWeight="700">Haemofilter</text>
      <text x="215" y="102" textAnchor="middle" className="fill-muted-foreground" fontSize="7">Semi-permeable</text>
      <text x="215" y="112" textAnchor="middle" className="fill-muted-foreground" fontSize="7">membrane</text>

      {/* Convection arrows (CVVH/CVVHDF) */}
      {(mode === "cvvh" || mode === "cvvhdf") && (
        <>
          <line x1="215" y1="150" x2="215" y2="175" stroke="hsl(142,60%,45%)" strokeWidth="1.5" markerEnd="url(#arrowConv)" />
          <defs><marker id="arrowConv" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto"><path d="M 0,0 L 6,3 L 0,6 Z" fill="hsl(142,60%,45%)" /></marker></defs>
          <text x="240" y="165" fontSize="6" fill="hsl(142,60%,45%)" fontWeight="600">Convection</text>
          <text x="240" y="175" fontSize="6" fill="hsl(142,60%,45%)">(solvent drag)</text>
        </>
      )}

      {/* Dialysate (CVVHD/CVVHDF) */}
      {(mode === "cvvhd" || mode === "cvvhdf") && (
        <>
          <rect x="175" y="180" width="80" height="30" rx="4" fill="hsl(25,80%,50%)" opacity="0.15" stroke="hsl(25,80%,50%)" strokeWidth="1" />
          <text x="215" y="195" textAnchor="middle" fill="hsl(25,80%,50%)" fontSize="7" fontWeight="600">Dialysate</text>
          <text x="215" y="205" textAnchor="middle" fill="hsl(25,80%,50%)" fontSize="5">Counter-current diffusion</text>
          {/* arrows in/out */}
          <line x1="170" y1="195" x2="175" y2="195" stroke="hsl(25,80%,50%)" strokeWidth="1" markerEnd="url(#arrowDial)" />
          <line x1="260" y1="195" x2="255" y2="195" stroke="hsl(25,80%,50%)" strokeWidth="1" />
          <defs><marker id="arrowDial" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto"><path d="M 0,0 L 5,2.5 L 0,5 Z" fill="hsl(25,80%,50%)" /></marker></defs>
        </>
      )}

      {/* Effluent bag */}
      <rect x="290" y="160" width="55" height="35" rx="4" fill="hsl(45,80%,50%)" opacity="0.15" stroke="hsl(45,80%,50%)" strokeWidth="1" />
      <text x="317" y="178" textAnchor="middle" fill="hsl(45,80%,50%)" fontSize="7" fontWeight="600">Effluent</text>
      <text x="317" y="189" textAnchor="middle" fill="hsl(45,80%,50%)" fontSize="5">Waste bag</text>
      <line x1="260" y1="140" x2="290" y2="170" stroke="hsl(45,80%,50%)" strokeWidth="1.5" />

      {/* Return line */}
      <line x1="260" y1="100" x2="310" y2="100" stroke="hsl(200,70%,50%)" strokeWidth="2" />
      <path d="M 310,100 Q 340,100 340,110 L 340,120 Q 340,130 310,130 L 60,130 Q 50,130 50,120" fill="none" stroke="hsl(200,70%,50%)" strokeWidth="2" />
      <text x="340" y="95" fontSize="6" className="fill-muted-foreground">Return</text>

      {/* Post-filter replacement (CVVH/CVVHDF) */}
      {(mode === "cvvh" || mode === "cvvhdf") && (
        <>
          <rect x="275" y="55" width="45" height="28" rx="4" fill="hsl(200,70%,50%)" opacity="0.15" stroke="hsl(200,70%,50%)" strokeWidth="1" />
          <text x="297" y="68" textAnchor="middle" fill="hsl(200,70%,50%)" fontSize="6" fontWeight="600">Post-dilution</text>
          <text x="297" y="78" textAnchor="middle" fill="hsl(200,70%,50%)" fontSize="5">Replacement</text>
          <line x1="297" y1="83" x2="297" y2="100" stroke="hsl(200,70%,50%)" strokeWidth="1" />
        </>
      )}

      {/* Anticoag site */}
      <rect x="80" y="30" width="50" height="22" rx="4" fill="hsl(var(--primary))" opacity="0.1" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="3,2" />
      <text x="105" y="43" textAnchor="middle" className="fill-primary" fontSize="6" fontWeight="600">Anticoag</text>
      <text x="105" y="50" textAnchor="middle" className="fill-primary" fontSize="5">pre-filter</text>
      <line x1="105" y1="52" x2="105" y2="98" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeDasharray="2,2" />

      {/* Mode label */}
      <text x="215" y="18" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="700">{modalities[mode].name}</text>
      <text x="215" y="30" textAnchor="middle" className="fill-muted-foreground" fontSize="7">
        {mode === "cvvh" ? "Convection only" : mode === "cvvhd" ? "Diffusion only" : "Convection + Diffusion"}
      </text>
    </svg>
  );

  const anticoagOptions = [
    {
      id: "citrate",
      name: "Regional Citrate (RCA)",
      preferred: true,
      mechanism: "Citrate infused pre-filter → chelates ionised Ca²⁺ → prevents coagulation in circuit. Calcium replaced post-filter via separate systemic infusion. Citrate metabolised to HCO₃⁻ in liver.",
      dose: "4% trisodium citrate: 2.5–4 mmol/L blood flow. Target circuit iCa²⁺ <0.35 mmol/L. Systemic iCa²⁺ target 1.0–1.2 mmol/L.",
      monitoring: "Circuit iCa²⁺ (target <0.35), systemic iCa²⁺ (1.0–1.2), total Ca/ionised Ca ratio (<2.5), pH, HCO₃⁻.",
      complications: "Citrate accumulation (liver failure) — total/ionised Ca ratio >2.5, metabolic alkalosis or acidosis. Hypocalcaemia if insufficient replacement. Hypernatraemia (trisodium citrate).",
      evidence: "KDIGO: first-line for CRRT. ↑Filter life (40–70h vs 20–30h with heparin). ↓Bleeding risk. Contraindicated in severe liver failure (citrate accumulation).",
    },
    {
      id: "heparin",
      name: "Systemic Heparin (UFH)",
      preferred: false,
      mechanism: "Unfractionated heparin infused pre-filter. Potentiates antithrombin III → inhibits thrombin and factor Xa. Systemic anticoagulation — affects both circuit and patient.",
      dose: "Bolus 5–10 U/kg, then 5–15 U/kg/hr. Target APTT 45–60s (1.5–2× normal). Some units use anti-Xa levels (0.3–0.5 IU/mL).",
      monitoring: "APTT every 4–6 hours. Platelet count (HIT risk). Anti-Xa if APTT unreliable (high CRP, factor VIII).",
      complications: "Bleeding (most common). HIT type II (0.5–5% — thrombocytopenia + thrombosis). Heparin resistance (↓ATIII in sepsis). Osteoporosis (long-term).",
      evidence: "Traditional standard. Inferior to citrate for filter life and bleeding. Still used when citrate contraindicated (severe liver failure). KDIGO: second-line.",
    },
    {
      id: "none",
      name: "No Anticoagulation",
      preferred: false,
      mechanism: "Circuit run without anticoagulant. Pre-filter saline flushes (100–200 mL every 30 min) to reduce clotting. Pre-dilution replacement fluid reduces haemoconcentration.",
      dose: "N/A. Saline flush protocol. Maximise blood flow rate (>200 mL/min). Use pre-dilution mode.",
      monitoring: "Filter pressures (transmembrane pressure, venous pressure). Visual clotting assessment. Filter life typically 12–24h.",
      complications: "Frequent filter clotting (↑cost, ↓effective dose delivery). Interrupted therapy. Blood loss in clotted circuit (~150 mL per circuit).",
      evidence: "Used in coagulopathic patients (INR >2, platelets <50) or active bleeding. Acceptable if endogenous coagulopathy provides 'natural' anticoagulation. ↓Filter life accepted.",
    },
    {
      id: "argatroban",
      name: "Argatroban / Bivalirudin",
      preferred: false,
      mechanism: "Direct thrombin inhibitors. Used when HIT confirmed/suspected. Argatroban: hepatic metabolism (adjust in liver failure). Bivalirudin: enzymatic degradation (safe in liver/renal failure).",
      dose: "Argatroban: 0.5–1 μg/kg/min (↓dose in liver impairment). Target APTT 1.5–3× baseline. Bivalirudin: 0.03–0.2 mg/kg/hr.",
      monitoring: "APTT every 2–4 hours initially. Argatroban falsely elevates INR (important when transitioning to warfarin). ECT for bivalirudin.",
      complications: "Bleeding. No specific reversal agent (short half-life is the safety margin). Argatroban dose reduction essential in hepatic dysfunction.",
      evidence: "First-line for HIT patients requiring CRRT. Bivalirudin increasingly preferred — organ-independent metabolism, shorter half-life.",
    },
  ];

  const doseCalc = {
    target: "20–25 mL/kg/hr effluent dose (KDIGO recommendation)",
    prescribe: "Prescribe 25–30 mL/kg/hr to DELIVER 20–25 mL/kg/hr (accounting for downtime — filter changes, procedures, transport)",
    formula: "Effluent = Dialysate flow + Replacement fluid flow + Net fluid removal",
    example: "80 kg patient: target 25 mL/kg/hr = 2000 mL/hr effluent. Prescribe ~2400 mL/hr. If CVVHDF: dialysate 1200 + replacement 1200 mL/hr.",
    trials: "ATN trial (2008) & RENAL trial (2009): 25 vs 40 mL/kg/hr — NO benefit from higher dose. Standard dose = 20–25 mL/kg/hr.",
  };

  return (
    <DiagramFigure
      id="rrt-modalities-diagram"
      title="RRT modalities"
      description="Auto-generated wrapper for the RRT modalities anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="my-6 p-4 bg-muted/30 rounded-xl border border-border">
        <h3 className="text-lg font-bold text-foreground mb-1">RRT Modalities & Circuit Configuration</h3>
        <p className="text-sm text-muted-foreground mb-4">CVVH, CVVHD, CVVHDF circuits, anticoagulation, and dosing</p>
  
        <Tabs defaultValue="circuits" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="circuits" className="text-xs">Circuits</TabsTrigger>
            <TabsTrigger value="anticoag" className="text-xs">Anticoagulation</TabsTrigger>
            <TabsTrigger value="dosing" className="text-xs">Dosing</TabsTrigger>
          </TabsList>
  
          <TabsContent value="circuits">
            <div className="flex gap-2 mb-4">
              {(["cvvh", "cvvhd", "cvvhdf"] as ModalityId[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setSelectedModality(m)}
                  className={`flex-1 p-2 rounded-lg border text-xs font-semibold transition-all uppercase ${selectedModality === m ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-primary/50"}`}
                >
                  {m}
                </button>
              ))}
            </div>
  
            <div className="bg-background rounded-lg border border-border p-2 mb-3">
              {renderCircuitSVG(selectedModality)}
            </div>
  
            {(() => {
              const m = modalities[selectedModality];
              return (
                    <div className="p-3 rounded-lg border border-primary/30 bg-primary/5 text-xs space-y-2">
                  <p className="font-bold text-foreground text-sm">{m.name} — {m.full}</p>
                  <p className="text-muted-foreground">{m.mechanism}</p>
                  <div className="p-2 rounded bg-background border border-border">
                    <span className="font-semibold text-foreground">Clearance: </span>
                    <span className="text-muted-foreground">{m.clearance}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 rounded bg-background border border-border">
                      <span className="font-semibold text-foreground">✓ Advantages</span>
                      <p className="text-muted-foreground mt-0.5">{m.advantages}</p>
                    </div>
                    <div className="p-2 rounded bg-background border border-border">
                      <span className="font-semibold text-foreground">✗ Disadvantages</span>
                      <p className="text-muted-foreground mt-0.5">{m.disadvantages}</p>
                    </div>
                  </div>
                  <p className="text-primary font-semibold">Best for: {m.bestFor}</p>
                </div>
    );
            })()}
          </TabsContent>
  
          <TabsContent value="anticoag">
            <p className="text-xs text-muted-foreground mb-3">Tap an option for details — regional citrate is first-line (KDIGO)</p>
            <div className="space-y-1.5">
              {anticoagOptions.map((a) => (
                <button
                  key={a.id}
                  onClick={() => setSelectedAnticoag(selectedAnticoag === a.id ? null : a.id)}
                  className={`w-full text-left p-2.5 rounded-lg border transition-all text-xs ${selectedAnticoag === a.id ? "border-primary bg-primary/10 ring-1 ring-primary" : "border-border hover:border-primary/50"}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-foreground">{a.name}</span>
                    {a.preferred && <span className="px-1.5 py-0.5 rounded bg-primary/15 text-primary text-[10px] font-semibold">1st line</span>}
                  </div>
                  {selectedAnticoag === a.id && (
                    <div className="mt-2 space-y-2 animate-fade-in">
                      <p className="text-muted-foreground">{a.mechanism}</p>
                      <div className="p-2 rounded bg-background border border-border">
                        <span className="font-semibold text-foreground">Dose: </span>
                        <span className="text-muted-foreground">{a.dose}</span>
                      </div>
                      <div className="p-2 rounded bg-background border border-border">
                        <span className="font-semibold text-foreground">Monitoring: </span>
                        <span className="text-muted-foreground">{a.monitoring}</span>
                      </div>
                      <div className="p-2 rounded bg-background border border-border">
                        <span className="font-semibold text-foreground">Complications: </span>
                        <span className="text-muted-foreground">{a.complications}</span>
                      </div>
                      <div className="p-2 rounded bg-primary/10 border border-primary/20">
                        <span className="font-semibold text-foreground">Evidence: </span>
                        <span className="text-muted-foreground">{a.evidence}</span>
                      </div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </TabsContent>
  
          <TabsContent value="dosing">
            <div className="space-y-3">
              <div className="p-3 rounded-lg border border-primary/30 bg-primary/5 text-xs">
                <p className="font-bold text-foreground text-sm">CRRT Dose Prescription</p>
                <p className="text-primary font-semibold mt-1">{doseCalc.target}</p>
                <p className="text-muted-foreground mt-2">{doseCalc.prescribe}</p>
              </div>
  
              <div className="p-3 rounded-lg border border-border text-xs">
                <p className="font-semibold text-foreground mb-1">Effluent Dose Formula</p>
                <div className="p-2 rounded bg-muted/50 font-mono text-foreground text-center">{doseCalc.formula}</div>
                <p className="text-muted-foreground mt-2">{doseCalc.example}</p>
              </div>
  
              <div className="p-3 rounded-lg border border-border text-xs">
                <p className="font-semibold text-foreground mb-1">Pre- vs Post-dilution</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 rounded bg-background border border-border">
                    <span className="font-semibold text-foreground">Pre-dilution</span>
                    <p className="text-muted-foreground mt-0.5">Fluid added before filter. ↓Haemoconcentration → ↑filter life. BUT ↓clearance efficiency (~15% less) — dilutes blood entering filter.</p>
                  </div>
                  <div className="p-2 rounded bg-background border border-border">
                    <span className="font-semibold text-foreground">Post-dilution</span>
                    <p className="text-muted-foreground mt-0.5">Fluid added after filter. Maximum clearance efficiency. BUT ↑haemoconcentration → ↑clotting risk. Filtration fraction should be &lt;25%.</p>
                  </div>
                </div>
              </div>
  
              <div className="p-2 rounded bg-destructive/5 border border-destructive/20 text-xs text-muted-foreground">
                <strong className="text-foreground">Key trials: </strong>{doseCalc.trials}
              </div>
  
              <div className="p-3 rounded-lg border border-border text-xs">
                <p className="font-semibold text-foreground mb-1">Drug Dosing in CRRT</p>
                <div className="space-y-1">
                  {[
                    { drug: "Vancomycin", adjust: "Significant CRRT clearance. Load 25 mg/kg, then level-guided. Target trough 15–20 mg/L." },
                    { drug: "Piperacillin-tazobactam", adjust: "4.5g Q6–8H (not Q8H as per normal renal dosing). Time-dependent killing — consider extended infusion." },
                    { drug: "Meropenem", adjust: "1g Q8H standard. 2g Q8H for CNS infections. Cleared by CRRT — do not use 'renal' doses." },
                  ].map((d) => (
                    <div key={d.drug} className="p-1.5 rounded bg-muted/50">
                      <span className="font-semibold text-foreground">{d.drug}: </span>
                      <span className="text-muted-foreground">{d.adjust}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DiagramFigure>
  );
};

export default RRTModalitiesDiagram;
