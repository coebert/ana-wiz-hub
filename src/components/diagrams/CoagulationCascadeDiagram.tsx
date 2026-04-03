import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/* ────────────────────────── data ────────────────────────── */

type Pathway = "intrinsic" | "extrinsic" | "common" | "fibrinolysis";

interface Factor {
  id: string;
  label: string;
  pathway: Pathway;
  detail: string;
  drugs?: string[]; // anticoagulants acting here
}

const factors: Factor[] = [
  // Intrinsic
  { id: "xii", label: "XII → XIIa", pathway: "intrinsic", detail: "Contact activation (glass, collagen, kaolin). Activates XI. Deficiency → prolonged APTT but NO bleeding risk.", drugs: [] },
  { id: "xi", label: "XI → XIa", pathway: "intrinsic", detail: "Activated by XIIa (and thrombin — positive feedback). Deficiency → Haemophilia C (variable bleeding).", drugs: [] },
  { id: "ix", label: "IX → IXa", pathway: "intrinsic", detail: "Activated by XIa. Forms tenase complex with VIIIa on platelet surface. Deficiency → Haemophilia B (Christmas disease).", drugs: ["Warfarin (↓synthesis)", "LMWH / UFH"] },
  { id: "viii", label: "VIII (cofactor)", pathway: "intrinsic", detail: "Cofactor to IXa in tenase complex. Carried by vWF in plasma. Deficiency → Haemophilia A (commonest severe). Replaced by cryoprecipitate, FVIII concentrate, or recombinant.", drugs: [] },

  // Extrinsic
  { id: "tf-vii", label: "TF + VII → TF·VIIa", pathway: "extrinsic", detail: "Tissue factor (TF) released from damaged subendothelium binds VII. Fastest activation — initiates coagulation in vivo. Factor VII has shortest half-life (6h) — first to fall with warfarin/liver failure.", drugs: ["Warfarin (↓synthesis of VII)"] },

  // Common
  { id: "x", label: "X → Xa", pathway: "common", detail: "Convergence point. Xa + Va form prothrombinase complex on platelet surface. Rate-limiting step.", drugs: ["LMWH (anti-Xa)", "Fondaparinux (pure anti-Xa)", "Rivaroxaban / Apixaban (direct Xa inhibitor)"] },
  { id: "v", label: "V (cofactor)", pathway: "common", detail: "Cofactor in prothrombinase complex. Activated by thrombin. NOT vitamin-K dependent. Factor V Leiden mutation → APC resistance → thrombophilia.", drugs: [] },
  { id: "ii", label: "Prothrombin (II) → Thrombin (IIa)", pathway: "common", detail: "Thrombin: central enzyme. Converts fibrinogen → fibrin, activates V, VIII, XI, XIII, protein C, platelets. Multiple positive feedback loops.", drugs: ["Warfarin (↓synthesis)", "UFH (via ATIII)", "Dabigatran (direct thrombin inhibitor)"] },
  { id: "i", label: "Fibrinogen (I) → Fibrin", pathway: "common", detail: "Thrombin cleaves fibrinopeptides A & B from fibrinogen → fibrin monomers polymerise. Factor XIII cross-links → stable clot. Target fibrinogen > 1.5 g/L in major bleeding.", drugs: [] },
  { id: "xiii", label: "XIII → XIIIa", pathway: "common", detail: "Cross-links fibrin polymers (γ–γ dimers). Activated by thrombin. Deficiency → delayed bleeding, poor wound healing. Not detected by standard clotting tests.", drugs: [] },

  // Fibrinolysis
  { id: "plasminogen", label: "Plasminogen → Plasmin", pathway: "fibrinolysis", detail: "tPA (from endothelium) converts plasminogen → plasmin. Plasmin degrades fibrin → FDPs and D-dimers. Regulated by PAI-1 and α2-antiplasmin.", drugs: ["TXA (blocks plasmin)", "Aprotinin"] },
  { id: "fdp", label: "Fibrin → FDPs / D-dimer", pathway: "fibrinolysis", detail: "D-dimer: specific marker of cross-linked fibrin degradation. Elevated in DIC, PE, DVT, trauma, sepsis, post-op. D-dimer has high negative predictive value for VTE.", drugs: [] },
];

const pathwayMeta: Record<Pathway, { label: string; color: string; test: string; testDetail: string }> = {
  intrinsic: { label: "Intrinsic", color: "hsl(220,70%,55%)", test: "APTT", testDetail: "Activated Partial Thromboplastin Time. Kaolin activates XII. Normal 25–35s. Monitors UFH therapy (target ratio 1.5–2.5). Prolonged in haemophilia A/B, lupus anticoagulant, heparin." },
  extrinsic: { label: "Extrinsic", color: "hsl(0,65%,55%)", test: "PT / INR", testDetail: "Prothrombin Time. TF + Ca²⁺ added. Normal 12–15s. INR standardises PT across labs. Monitors warfarin (target INR 2–3). Prolonged early in liver failure (VII shortest t½)." },
  common: { label: "Common", color: "hsl(45,80%,50%)", test: "TT / Fibrinogen", testDetail: "Thrombin Time: exogenous thrombin added — measures fibrinogen → fibrin. Prolonged by heparin, low fibrinogen, FDPs, dabigatran. Clauss fibrinogen assay measures functional fibrinogen." },
  fibrinolysis: { label: "Fibrinolysis", color: "hsl(160,60%,45%)", test: "D-dimer / ROTEM ML", testDetail: "D-dimer detects fibrin degradation. ROTEM: EXTEM maximum lysis (ML) > 15% = hyperfibrinolysis. TEG: LY30 > 3%. Treat with TXA (1g IV over 10 min)." },
};

const drugs = [
  { name: "Unfractionated Heparin (UFH)", target: "Potentiates ATIII → inhibits IIa (thrombin) and Xa equally", monitor: "APTT (ratio 1.5–2.5)", reversal: "Protamine 1 mg per 100 IU heparin", factors: ["ix", "x", "ii"] },
  { name: "LMWH (enoxaparin)", target: "Potentiates ATIII → predominantly anti-Xa (4:1 ratio)", monitor: "Anti-Xa level (peak 0.5–1.0 IU/ml)", reversal: "Protamine (60–80% reversal only)", factors: ["ix", "x"] },
  { name: "Warfarin", target: "Vitamin K antagonist → ↓ synthesis II, VII, IX, X (+ protein C, S)", monitor: "PT / INR (target 2–3)", reversal: "Vitamin K (slow, 6–12h), PCC/Octaplex (rapid), FFP", factors: ["tf-vii", "ix", "ii"] },
  { name: "Rivaroxaban / Apixaban", target: "Direct factor Xa inhibitor (DOAC)", monitor: "Anti-Xa level (specific calibrator). PT may be prolonged.", reversal: "Andexanet alfa (specific). PCC if unavailable.", factors: ["x"] },
  { name: "Dabigatran", target: "Direct thrombin (IIa) inhibitor (DOAC)", monitor: "Dilute thrombin time (dTT). APTT prolonged. TT very sensitive.", reversal: "Idarucizumab (Praxbind — specific). Haemodialysis.", factors: ["ii"] },
  { name: "Fondaparinux", target: "Synthetic pentasaccharide → pure anti-Xa via ATIII", monitor: "Anti-Xa level", reversal: "No specific antidote. rFVIIa may help.", factors: ["x"] },
  { name: "Tranexamic Acid (TXA)", target: "Lysine analogue → blocks plasminogen activation", monitor: "ROTEM EXTEM ML (fibrinolysis)", reversal: "N/A — short half-life (2h)", factors: ["plasminogen"] },
];

/* ────────────────────────── component ────────────────────────── */

const CoagulationCascadeDiagram = () => {
  const [activePathway, setActivePathway] = useState<Pathway | "all">("all");
  const [selectedFactor, setSelectedFactor] = useState<string | null>(null);
  const [tab, setTab] = useState<"cascade" | "drugs" | "tests">("cascade");

  const activeFactor = factors.find(f => f.id === selectedFactor);
  const highlightedByDrug = drugs.flatMap(d => d.factors);

  // SVG layout positions for each factor
  const pos: Record<string, { x: number; y: number }> = {
    xii: { x: 65, y: 24 }, xi: { x: 65, y: 66 }, ix: { x: 65, y: 108 }, viii: { x: 65, y: 140 },
    "tf-vii": { x: 320, y: 66 },
    x: { x: 200, y: 162 }, v: { x: 200, y: 194 }, ii: { x: 200, y: 226 }, i: { x: 200, y: 258 }, xiii: { x: 200, y: 286 },
    plasminogen: { x: 340, y: 240 }, fdp: { x: 340, y: 272 },
  };

  const isVisible = (p: Pathway) => activePathway === "all" || activePathway === p;
  const factorOpacity = (f: Factor) => {
    if (activePathway !== "all" && f.pathway !== activePathway) return 0.12;
    if (selectedFactor && selectedFactor !== f.id) return 0.35;
    return 1;
  };

  return (
    <Card className="mb-8 border-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-serif text-foreground">Coagulation Cascade & Anticoagulant Targets</CardTitle>
        <p className="text-sm text-muted-foreground">Tap factors to explore. Switch tabs for drug targets and monitoring tests.</p>
      </CardHeader>
      <CardContent>
        <Tabs value={tab} onValueChange={v => setTab(v as typeof tab)}>
          <TabsList className="grid w-full grid-cols-3 mb-3">
            <TabsTrigger value="cascade" className="text-xs">Cascade</TabsTrigger>
            <TabsTrigger value="drugs" className="text-xs">Drug Targets</TabsTrigger>
            <TabsTrigger value="tests" className="text-xs">Monitoring Tests</TabsTrigger>
          </TabsList>

          {/* ──── CASCADE TAB ──── */}
          <TabsContent value="cascade">
            {/* Pathway filter */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              <Badge variant={activePathway === "all" ? "default" : "outline"} className="cursor-pointer text-xs" onClick={() => { setActivePathway("all"); setSelectedFactor(null); }}>All</Badge>
              {(["intrinsic", "extrinsic", "common", "fibrinolysis"] as Pathway[]).map(p => (
                <Badge key={p} variant={activePathway === p ? "default" : "outline"} className="cursor-pointer text-xs" onClick={() => { setActivePathway(p); setSelectedFactor(null); }}
                  style={activePathway === p ? { backgroundColor: pathwayMeta[p].color } : { color: pathwayMeta[p].color }}
                >{pathwayMeta[p].label}</Badge>
              ))}
            </div>

            {/* SVG */}
            <svg viewBox="0 0 400 305" className="w-full max-w-lg mx-auto mb-3">
              {/* Pathway labels */}
              <text x="10" y="14" fontSize="7" fill={pathwayMeta.intrinsic.color} fontWeight="600" opacity={isVisible("intrinsic") ? 0.7 : 0.15}>INTRINSIC (APTT)</text>
              <text x="280" y="14" fontSize="7" fill={pathwayMeta.extrinsic.color} fontWeight="600" opacity={isVisible("extrinsic") ? 0.7 : 0.15}>EXTRINSIC (PT/INR)</text>
              <text x="160" y="152" fontSize="7" fill={pathwayMeta.common.color} fontWeight="600" opacity={isVisible("common") ? 0.7 : 0.15}>COMMON PATHWAY</text>

              {/* Arrows/connections — intrinsic */}
              <g opacity={isVisible("intrinsic") ? 0.5 : 0.08}>
                <line x1="65" y1="35" x2="65" y2="55" stroke={pathwayMeta.intrinsic.color} strokeWidth="1" />
                <line x1="65" y1="77" x2="65" y2="97" stroke={pathwayMeta.intrinsic.color} strokeWidth="1" />
                <line x1="65" y1="119" x2="65" y2="130" stroke={pathwayMeta.intrinsic.color} strokeWidth="1" />
                <path d="M65,148 C65,155 120,162 155,162" stroke={pathwayMeta.intrinsic.color} strokeWidth="1" fill="none" strokeDasharray="3 2" />
              </g>
              {/* Arrows — extrinsic */}
              <g opacity={isVisible("extrinsic") ? 0.5 : 0.08}>
                <path d="M320,77 C320,120 260,162 245,162" stroke={pathwayMeta.extrinsic.color} strokeWidth="1" fill="none" strokeDasharray="3 2" />
              </g>
              {/* Arrows — common */}
              <g opacity={isVisible("common") ? 0.5 : 0.08}>
                <line x1="200" y1="173" x2="200" y2="184" stroke={pathwayMeta.common.color} strokeWidth="1" />
                <line x1="200" y1="205" x2="200" y2="216" stroke={pathwayMeta.common.color} strokeWidth="1" />
                <line x1="200" y1="237" x2="200" y2="248" stroke={pathwayMeta.common.color} strokeWidth="1" />
                <line x1="200" y1="269" x2="200" y2="278" stroke={pathwayMeta.common.color} strokeWidth="1" />
              </g>
              {/* Arrows — fibrinolysis */}
              <g opacity={isVisible("fibrinolysis") ? 0.5 : 0.08}>
                <line x1="260" y1="260" x2="295" y2="244" stroke={pathwayMeta.fibrinolysis.color} strokeWidth="1" strokeDasharray="2 2" />
                <line x1="340" y1="251" x2="340" y2="262" stroke={pathwayMeta.fibrinolysis.color} strokeWidth="1" />
              </g>

              {/* Thrombin feedback arrows */}
              <g opacity={isVisible("common") ? 0.25 : 0.05}>
                <path d="M220,226 C260,210 260,145 180,140" stroke={pathwayMeta.common.color} strokeWidth="0.6" fill="none" strokeDasharray="2 2" />
                <text x="258" y="180" fontSize="5" fill={pathwayMeta.common.color} opacity="0.6">feedback</text>
              </g>

              {/* Factor boxes */}
              {factors.map(f => {
                const p = pos[f.id];
                if (!p) return null;
                const color = pathwayMeta[f.pathway].color;
                const op = factorOpacity(f);
                const isSel = selectedFactor === f.id;
                const hasDrug = f.drugs && f.drugs.length > 0;
                const w = f.id === "tf-vii" ? 110 : f.id === "plasminogen" || f.id === "fdp" ? 95 : 100;
                return (
                  <g key={f.id} opacity={op} className="cursor-pointer transition-opacity duration-200" onClick={() => setSelectedFactor(isSel ? null : f.id)}>
                    <rect x={p.x - w / 2} y={p.y - 10} width={w} height={22} rx="5" fill={color} fillOpacity={isSel ? 0.25 : 0.1} stroke={color} strokeWidth={isSel ? 2 : 1} />
                    <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize="8" fill={color} fontWeight="bold">{f.label}</text>
                    {hasDrug && (
                      <circle cx={p.x + w / 2 - 4} cy={p.y - 6} r="3" fill="hsl(0,65%,55%)" fillOpacity="0.7" stroke="none" />
                    )}
                    {hasDrug && (
                      <text x={p.x + w / 2 - 4} y={p.y - 4} textAnchor="middle" fontSize="4" fill="white" fontWeight="bold">Rx</text>
                    )}
                  </g>
                );
              })}

              {/* Drug target annotations when a factor with drugs is selected */}
              {activeFactor && activeFactor.drugs && activeFactor.drugs.length > 0 && (
                <g>
                  {activeFactor.drugs.map((d, i) => {
                    const p = pos[activeFactor.id];
                    return (
                      <text key={i} x={p.x} y={p.y + 18 + i * 9} textAnchor="middle" fontSize="6" fill="hsl(0,65%,55%)" fontWeight="600" opacity="0.8">
                        ⊗ {d}
                      </text>
                    );
                  })}
                </g>
              )}
            </svg>

            {/* Factor detail */}
            {activeFactor ? (
              <div className="p-4 rounded-lg border border-border animate-fade-in">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-sm" style={{ color: pathwayMeta[activeFactor.pathway].color }}>{activeFactor.label}</span>
                  <Badge variant="outline" className="text-xs" style={{ color: pathwayMeta[activeFactor.pathway].color }}>{pathwayMeta[activeFactor.pathway].label}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{activeFactor.detail}</p>
                {activeFactor.drugs && activeFactor.drugs.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-border/50">
                    <p className="text-xs font-semibold text-red-400 mb-1">Drug Targets at This Step</p>
                    {activeFactor.drugs.map((d, i) => (
                      <p key={i} className="text-xs text-muted-foreground">• {d}</p>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground text-center italic">Tap a factor box to view details and drug targets</p>
            )}
          </TabsContent>

          {/* ──── DRUGS TAB ──── */}
          <TabsContent value="drugs">
            <div className="space-y-3">
              {drugs.map(d => (
                <div key={d.name} className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{d.name}</p>
                  <p className="text-xs text-muted-foreground mt-1"><span className="text-foreground font-medium">Target:</span> {d.target}</p>
                  <p className="text-xs text-muted-foreground mt-0.5"><span className="text-foreground font-medium">Monitor:</span> {d.monitor}</p>
                  <p className="text-xs text-muted-foreground mt-0.5"><span className="text-foreground font-medium">Reversal:</span> {d.reversal}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* ──── TESTS TAB ──── */}
          <TabsContent value="tests">
            <div className="space-y-3">
              {(["intrinsic", "extrinsic", "common", "fibrinolysis"] as Pathway[]).map(p => {
                const m = pathwayMeta[p];
                return (
                  <div key={p} className="p-3 rounded-lg border border-border" style={{ borderColor: m.color + "40" }}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm" style={{ color: m.color }}>{m.test}</span>
                      <Badge variant="outline" className="text-xs" style={{ color: m.color }}>{m.label} pathway</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{m.testDetail}</p>
                  </div>
                );
              })}
              <div className="p-3 rounded-lg border border-border bg-muted/20">
                <p className="text-xs font-semibold text-foreground mb-1">Viscoelastic Testing (ROTEM / TEG)</p>
                <p className="text-xs text-muted-foreground">
                  EXTEM CT prolonged → FFP. FIBTEM A5 {"<"} 12mm → cryoprecipitate. EXTEM MCF low (FIBTEM normal) → platelets. HEPTEM shorter than INTEM → protamine. EXTEM ML {">"} 15% → TXA.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CoagulationCascadeDiagram;
