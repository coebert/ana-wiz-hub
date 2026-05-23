import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { withAlpha } from "@/lib/color-utils";
import { DiagramFigure } from "./_shared/DiagramFigure";

/* ────────────────────────── data ────────────────────────── */

type Pathway = "intrinsic" | "extrinsic" | "common" | "fibrinolysis" | "regulatory";
type CellPhase = "initiation" | "amplification" | "propagation" | "termination";

interface Factor {
  id: string;
  label: string;
  pathway: Pathway;
  detail: string;
  drugs?: string[];
  cellPhase?: CellPhase[];
}

const factors: Factor[] = [
  // Intrinsic
  { id: "xii", label: "XII → XIIa", pathway: "intrinsic", detail: "Contact activation (glass, collagen, kaolin). Activates XI and prekallikrein. Deficiency → prolonged APTT but NO bleeding risk (XII not required for haemostasis in vivo).", cellPhase: [] },
  { id: "xi", label: "XI → XIa", pathway: "intrinsic", detail: "Activated by XIIa (contact) AND thrombin (amplification — positive feedback on platelet surface). Deficiency → Haemophilia C (variable bleeding, common in Ashkenazi Jews).", cellPhase: ["amplification"] },
  { id: "ix", label: "IX → IXa", pathway: "intrinsic", detail: "Activated by XIa and TF-VIIa complex. Forms TENASE complex with VIIIa on activated platelet surface (phosphatidylserine exposure). Deficiency → Haemophilia B (Christmas disease). t½ = 24h.", drugs: ["Warfarin (↓synthesis)", "LMWH / UFH"], cellPhase: ["propagation"] },
  { id: "viii", label: "VIII (cofactor)", pathway: "intrinsic", detail: "Cofactor to IXa in tenase complex (↑ activity 200,000×). Circulates bound to vWF. Released by thrombin cleavage. Deficiency → Haemophilia A (commonest severe coagulopathy, X-linked). Replaced by cryoprecipitate, FVIII concentrate, emicizumab (bispecific Ab mimicking VIIIa).", cellPhase: ["propagation"] },

  // Extrinsic
  { id: "tf-vii", label: "TF + VII → TF·VIIa", pathway: "extrinsic", detail: "Tissue factor (TF/thromboplastin) from subendothelium + damaged cells binds VII → initiates coagulation in vivo. TF·VIIa activates BOTH X and IX. Factor VII has shortest half-life (6h) — first to fall with warfarin/liver failure. This is the PRIMARY initiator of coagulation.", drugs: ["Warfarin (↓synthesis of VII)"], cellPhase: ["initiation"] },

  // Common
  { id: "x", label: "X → Xa", pathway: "common", detail: "Convergence point of intrinsic and extrinsic pathways. Xa + Va = PROTHROMBINASE complex on platelet phospholipid surface + Ca²⁺. Rate-limiting step. Activated by both tenase (IXa-VIIIa) and TF-VIIa.", drugs: ["LMWH (anti-Xa)", "Fondaparinux (pure anti-Xa via ATIII)", "Rivaroxaban / Apixaban (direct oral Xa inhibitor)"], cellPhase: ["initiation", "propagation"] },
  { id: "v", label: "V (cofactor)", pathway: "common", detail: "Cofactor in prothrombinase complex (↑ Xa activity 300,000×). Activated by thrombin. NOT vitamin-K dependent. Factor V Leiden (R506Q mutation) → APC resistance → commonest inherited thrombophilia (5% Caucasians).", cellPhase: ["amplification", "propagation"] },
  { id: "ii", label: "II → Thrombin (IIa)", pathway: "common", detail: "Thrombin: central serine protease. Converts fibrinogen → fibrin; activates V, VIII, XI, XIII, protein C, platelets (PAR-1/4). Multiple positive feedback loops amplify signal. Small initial thrombin burst (initiation) → massive thrombin generation on platelet surface (propagation).", drugs: ["Warfarin (↓synthesis)", "UFH (via ATIII — 1:1 anti-IIa:anti-Xa)", "Dabigatran (direct thrombin inhibitor)"], cellPhase: ["amplification", "propagation"] },
  { id: "i", label: "Fibrinogen (I) → Fibrin", pathway: "common", detail: "Thrombin cleaves fibrinopeptides A & B → fibrin monomers polymerise. Factor XIII cross-links D-domains → stable clot (D-dimers on lysis). Target fibrinogen > 1.5–2.0 g/L in major haemorrhage. Measured by Clauss assay or FIBTEM (ROTEM).", cellPhase: ["propagation"] },
  { id: "xiii", label: "XIII → XIIIa", pathway: "common", detail: "Transglutaminase: cross-links fibrin γ-chains and α₂-antiplasmin into clot. Activated by thrombin + fibrin. Deficiency → delayed bleeding (24–48h post-op), poor wound healing, recurrent miscarriage. NOT detected by PT or APTT.", cellPhase: ["propagation"] },

  // Regulatory
  { id: "atiii", label: "Antithrombin", pathway: "regulatory", detail: "Serine protease inhibitor (serpin). Inhibits IIa, Xa, IXa, XIa. Activity enhanced 1000× by heparin. Deficiency (inherited or acquired — DIC, nephrotic, liver failure) → thrombophilia and heparin resistance. (Historically called Antithrombin III; current nomenclature is simply Antithrombin.)", cellPhase: ["termination"] },
  { id: "prot-c", label: "Protein C + S", pathway: "regulatory", detail: "Thrombin binds thrombomodulin on endothelium → activates Protein C (APC). APC + cofactor Protein S inactivate Va and VIIIa. Vitamin K dependent. Warfarin initially ↓ Protein C (t½ 8h) before ↓ procoagulants → risk of warfarin-induced skin necrosis.", cellPhase: ["termination"] },
  { id: "tfpi", label: "TFPI", pathway: "regulatory", detail: "Tissue Factor Pathway Inhibitor. Inhibits TF-VIIa-Xa complex. Released from endothelium. Explains why TF-VIIa alone produces only small initial thrombin burst — TFPI rapidly shuts down initiation phase, making amplification/propagation via intrinsic tenase essential.", cellPhase: ["termination"] },

  // Fibrinolysis
  { id: "plasminogen", label: "Plasminogen → Plasmin", pathway: "fibrinolysis", detail: "tPA (from endothelium, most active when bound to fibrin) and urokinase convert plasminogen → plasmin. Plasmin degrades fibrin → FDPs and D-dimers. Regulated by PAI-1 and α₂-antiplasmin. Hyperfibrinolysis in trauma, liver failure, cardiopulmonary bypass.", drugs: ["TXA (lysine analogue — blocks plasmin binding to fibrin)", "Aprotinin (direct plasmin inhibitor — withdrawn in some countries)"], cellPhase: ["termination"] },
  { id: "fdp", label: "FDPs / D-dimer", pathway: "fibrinolysis", detail: "D-dimer: specific cross-linked fibrin degradation product. Elevated in DIC, VTE, trauma, sepsis, post-op, pregnancy, malignancy. High sensitivity, low specificity. High NPV for excluding VTE in low-risk patients (Wells + D-dimer).", cellPhase: [] },
];

const pathwayMeta: Record<Pathway, { label: string; color: string; test: string; testDetail: string }> = {
  intrinsic: { label: "Intrinsic", color: "hsl(220,70%,55%)", test: "APTT", testDetail: "Activated Partial Thromboplastin Time. Kaolin + phospholipid + Ca²⁺ activate XII. Normal 25–35s. Monitors UFH (target ratio 1.5–2.5 or anti-Xa 0.3–0.7). Prolonged in haemophilia A/B/C, lupus anticoagulant (paradoxical thrombosis), heparin, factor deficiency < 30%." },
  extrinsic: { label: "Extrinsic", color: "hsl(0,65%,55%)", test: "PT / INR", testDetail: "Prothrombin Time. Tissue thromboplastin + Ca²⁺ added. Normal 12–15s. INR = (patient PT / mean normal PT)^ISI — standardises across reagents. Monitors warfarin (target INR 2–3, or 2.5–3.5 for mechanical valves). First to prolong in liver failure (VII shortest t½ = 6h)." },
  common: { label: "Common", color: "hsl(45,80%,50%)", test: "TT / Fibrinogen", testDetail: "Thrombin Time: exogenous thrombin → measures fibrinogen → fibrin conversion. Prolonged by heparin, low/dysfunctional fibrinogen, high FDPs, dabigatran. Clauss fibrinogen: quantitative functional assay (target > 1.5–2.0 g/L in bleeding)." },
  fibrinolysis: { label: "Fibrinolysis", color: "hsl(160,60%,45%)", test: "D-dimer / ROTEM", testDetail: "D-dimer detects cross-linked fibrin degradation. ROTEM: EXTEM maximum lysis (ML) > 15% = hyperfibrinolysis → TXA. FIBTEM A5 < 12mm → fibrinogen replacement. TEG: LY30 > 3% = hyperfibrinolysis. Use within goal-directed algorithms in major haemorrhage." },
  regulatory: { label: "Regulatory", color: "hsl(280,50%,55%)", test: "Thrombophilia screen", testDetail: "ATIII level, Protein C & S activity, APC resistance ratio, Factor V Leiden genetic test, Prothrombin G20210A mutation. Test > 3 months post-event and off anticoagulation. Do not test during acute thrombosis or on warfarin/DOACs (false results)." },
};

const cellPhaseColors: Record<CellPhase, string> = {
  initiation: "hsl(0 65% 55%)",
  amplification: "hsl(35 80% 50%)",
  propagation: "hsl(210 70% 55%)",
  termination: "hsl(160 60% 45%)",
};

const drugs = [
  { name: "Unfractionated Heparin (UFH)", target: "Potentiates ATIII → inhibits IIa and Xa equally (1:1)", monitor: "APTT ratio 1.5–2.5 or anti-Xa 0.3–0.7 IU/ml", reversal: "Protamine 1mg per 100 IU (last dose). Max 50mg. Binds heparin ionically.", factors: ["ix", "x", "ii"], notes: "t½ 60–90min IV. Variable pharmacokinetics (binds plasma proteins). HIT risk ~1–3%." },
  { name: "LMWH (enoxaparin)", target: "Potentiates ATIII → predominantly anti-Xa (4:1 Xa:IIa ratio)", monitor: "Peak anti-Xa 0.5–1.0 IU/ml (therapeutic). Trough for accumulation in renal impairment.", reversal: "Protamine (60–80% reversal of anti-Xa only). rFVIIa or PCC in life-threatening bleeding.", factors: ["ix", "x"], notes: "Predictable kinetics (less protein binding). Renal excretion — reduce dose if eGFR < 30. Lower HIT risk (~0.1%)." },
  { name: "Warfarin", target: "Vitamin K epoxide reductase (VKORC1) inhibitor → ↓ synthesis of factors II, VII, IX, X AND Protein C, S", monitor: "PT / INR (target 2–3 for AF/VTE; 2.5–3.5 for mechanical mitral valve)", reversal: "Vitamin K 5mg IV (6–12h onset). PCC/Octaplex 25–50 IU/kg (rapid, 10–15min). FFP 15ml/kg (volume load, slower).", factors: ["tf-vii", "ix", "ii"], notes: "Narrow therapeutic index. CYP2C9/VKORC1 polymorphisms affect dosing. Multiple drug interactions (CYP450)." },
  { name: "Rivaroxaban / Apixaban", target: "Direct factor Xa inhibitor (DOAC) — binds active site of free and clot-bound Xa", monitor: "Anti-Xa level (drug-specific calibrator). PT may be prolonged (rivaroxaban > apixaban). APTT less affected.", reversal: "Andexanet alfa (modified FXa decoy — specific). PCC 50 IU/kg if unavailable.", factors: ["x"], notes: "Predictable PK. Apixaban: hepatic elimination (safe in renal impairment). Rivaroxaban: take with food." },
  { name: "Dabigatran", target: "Direct thrombin (IIa) inhibitor — competitive, reversible binding to active site", monitor: "Dilute thrombin time (dTT) or Ecarin clotting time (ECT). TT very sensitive (normal TT excludes clinically significant levels). APTT prolonged but non-linear.", reversal: "Idarucizumab (Praxbind) 5g IV — humanised Fab fragment, immediate reversal. Haemodialysis (80% renal excretion).", factors: ["ii"], notes: "80% renal excretion — contraindicated if CrCl < 30. Dyspepsia common (tartaric acid core). Store in original packaging (moisture-sensitive)." },
  { name: "Fondaparinux", target: "Synthetic pentasaccharide → selective anti-Xa via ATIII (no anti-IIa activity)", monitor: "Anti-Xa level (fondaparinux calibrator)", reversal: "No specific antidote. rFVIIa 90 µg/kg may help. t½ 17h — long duration.", factors: ["x"], notes: "Zero HIT risk (no platelet binding). Can be used in HIT. SC once daily. Renal excretion." },
  { name: "Tranexamic Acid (TXA)", target: "Lysine analogue → blocks plasminogen binding to fibrin → inhibits fibrinolysis", monitor: "ROTEM EXTEM ML > 15% indicates hyperfibrinolysis. Clinical response.", reversal: "N/A — short t½ (~2h). Renally excreted.", factors: ["plasminogen"], notes: "CRASH-2: ↓ mortality in trauma if given < 3h. 1g IV over 10 min, then 1g over 8h. Also used in cardiac surgery, obstetric haemorrhage, TKR." },
];

/* ────────────────────────── SVG positions ────────────────────────── */

const pos: Record<string, { x: number; y: number }> = {
  xii: { x: 70, y: 30 }, xi: { x: 70, y: 68 }, ix: { x: 70, y: 106 }, viii: { x: 70, y: 140 },
  "tf-vii": { x: 330, y: 58 },
  x: { x: 200, y: 165 }, v: { x: 200, y: 200 }, ii: { x: 200, y: 235 }, i: { x: 200, y: 270 }, xiii: { x: 200, y: 302 },
  atiii: { x: 350, y: 200 }, "prot-c": { x: 350, y: 235 }, tfpi: { x: 350, y: 120 },
  plasminogen: { x: 345, y: 270 }, fdp: { x: 345, y: 302 },
};

type ViewTab = "cascade" | "cell-based" | "drugs" | "tests";

/* ────────────────────────── component ────────────────────────── */

const CoagulationCascadeDiagram = () => {
  const [activePathway, setActivePathway] = useState<Pathway | "all">("all");
  const [selectedFactor, setSelectedFactor] = useState<string | null>(null);
  const [tab, setTab] = useState<ViewTab>("cascade");
  const [highlightPhase, setHighlightPhase] = useState<CellPhase | null>(null);
  const [selectedDrug, setSelectedDrug] = useState<string | null>(null);

  const activeFactor = factors.find(f => f.id === selectedFactor);
  const activeDrugObj = drugs.find(d => d.name === selectedDrug);

  const isVisible = (p: Pathway) => activePathway === "all" || activePathway === p;
  const factorOpacity = (f: Factor) => {
    if (highlightPhase && (!f.cellPhase || !f.cellPhase.includes(highlightPhase))) return 0.1;
    if (selectedDrug) {
      const drug = drugs.find(d => d.name === selectedDrug);
      if (drug && !drug.factors.includes(f.id)) return 0.15;
    }
    if (activePathway !== "all" && f.pathway !== activePathway) return 0.12;
    if (selectedFactor && selectedFactor !== f.id) return 0.35;
    return 1;
  };

  const renderCascadeSVG = () => (
    <svg viewBox="0 0 410 320" className="w-full max-w-lg mx-auto mb-3">
      {/* Pathway labels */}
      <text x="10" y="14" fontSize="7" fill={pathwayMeta.intrinsic.color} fontWeight="600" opacity={isVisible("intrinsic") ? 0.7 : 0.15}>INTRINSIC (APTT)</text>
      <text x="280" y="14" fontSize="7" fill={pathwayMeta.extrinsic.color} fontWeight="600" opacity={isVisible("extrinsic") ? 0.7 : 0.15}>EXTRINSIC (PT/INR)</text>
      <text x="160" y="154" fontSize="7" fill={pathwayMeta.common.color} fontWeight="600" opacity={isVisible("common") ? 0.7 : 0.15}>COMMON PATHWAY</text>

      {/* Intrinsic arrows */}
      <g opacity={isVisible("intrinsic") ? 0.5 : 0.08}>
        <line x1="70" y1="41" x2="70" y2="57" stroke={pathwayMeta.intrinsic.color} strokeWidth="1" markerEnd="url(#arrow-i)" />
        <line x1="70" y1="79" x2="70" y2="95" stroke={pathwayMeta.intrinsic.color} strokeWidth="1" markerEnd="url(#arrow-i)" />
        <line x1="70" y1="117" x2="70" y2="130" stroke={pathwayMeta.intrinsic.color} strokeWidth="1" />
        <path d="M70,148 C70,158 130,165 155,165" stroke={pathwayMeta.intrinsic.color} strokeWidth="1" fill="none" strokeDasharray="3 2" markerEnd="url(#arrow-i)" />
        {/* Tenase complex bracket */}
        <rect x="15" y="96" width="110" height="50" rx="6" fill="none" stroke={pathwayMeta.intrinsic.color} strokeWidth="0.5" strokeDasharray="4 2" opacity="0.4" />
        <text x="20" y="152" fontSize="5" fill={pathwayMeta.intrinsic.color} opacity="0.6">Tenase complex</text>
      </g>

      {/* Extrinsic arrows */}
      <g opacity={isVisible("extrinsic") ? 0.5 : 0.08}>
        <path d="M330,70 C330,115 260,165 245,165" stroke={pathwayMeta.extrinsic.color} strokeWidth="1" fill="none" strokeDasharray="3 2" markerEnd="url(#arrow-e)" />
        {/* TF-VIIa also activates IX */}
        <path d="M280,58 L130,100" stroke={pathwayMeta.extrinsic.color} strokeWidth="0.75" fill="none" strokeDasharray="2 2" opacity="0.4" markerEnd="url(#arrow-e)" />
        <text x="190" y="72" fontSize="5" fill={pathwayMeta.extrinsic.color} opacity="0.5">TF·VIIa also activates IX</text>
      </g>

      {/* Common arrows */}
      <g opacity={isVisible("common") ? 0.5 : 0.08}>
        <line x1="200" y1="176" x2="200" y2="189" stroke={pathwayMeta.common.color} strokeWidth="1" markerEnd="url(#arrow-c)" />
        <line x1="200" y1="211" x2="200" y2="224" stroke={pathwayMeta.common.color} strokeWidth="1" markerEnd="url(#arrow-c)" />
        <line x1="200" y1="246" x2="200" y2="259" stroke={pathwayMeta.common.color} strokeWidth="1" markerEnd="url(#arrow-c)" />
        <line x1="200" y1="281" x2="200" y2="292" stroke={pathwayMeta.common.color} strokeWidth="1" markerEnd="url(#arrow-c)" />
        {/* Prothrombinase complex bracket */}
        <rect x="145" y="155" width="110" height="55" rx="6" fill="none" stroke={pathwayMeta.common.color} strokeWidth="0.5" strokeDasharray="4 2" opacity="0.4" />
        <text x="150" y="215" fontSize="5" fill={pathwayMeta.common.color} opacity="0.6">Prothrombinase</text>
      </g>

      {/* Thrombin feedback arrows */}
      <g opacity={isVisible("common") ? 0.3 : 0.05}>
        {/* IIa → V */}
        <path d="M225,235 C245,225 245,208 225,200" stroke="hsl(45 80% 50%)" strokeWidth="0.5" fill="none" strokeDasharray="2 2" markerEnd="url(#arrow-fb)" />
        {/* IIa → VIII */}
        <path d="M225,235 C270,210 270,145 115,140" stroke="hsl(45 80% 50%)" strokeWidth="0.5" fill="none" strokeDasharray="2 2" markerEnd="url(#arrow-fb)" />
        {/* IIa → XI */}
        <path d="M175,235 C140,220 135,80 110,68" stroke="hsl(45 80% 50%)" strokeWidth="0.5" fill="none" strokeDasharray="2 2" markerEnd="url(#arrow-fb)" />
        {/* IIa → platelets */}
        <text x="268" y="163" fontSize="5" fill="hsl(45 80% 50%)" opacity="0.7" fontWeight="600">Thrombin feedback</text>
        <text x="268" y="170" fontSize="4.5" fill="hsl(45 80% 50%)" opacity="0.5">activates V, VIII, XI, XIII</text>
      </g>

      {/* Regulatory pathways */}
      <g opacity={isVisible("regulatory") ? 0.5 : 0.08}>
        {/* ATIII inhibits IIa and Xa */}
        <path d="M305,200 L250,200" stroke={pathwayMeta.regulatory.color} strokeWidth="0.75" fill="none" strokeDasharray="2 2" markerEnd="url(#arrow-reg)" />
        <path d="M305,200 L250,175" stroke={pathwayMeta.regulatory.color} strokeWidth="0.75" fill="none" strokeDasharray="2 2" markerEnd="url(#arrow-reg)" />
        {/* APC inhibits Va and VIIIa */}
        <path d="M305,235 L250,207" stroke={pathwayMeta.regulatory.color} strokeWidth="0.5" fill="none" strokeDasharray="2 2" markerEnd="url(#arrow-reg)" />
        <path d="M305,235 L120,142" stroke={pathwayMeta.regulatory.color} strokeWidth="0.5" fill="none" strokeDasharray="2 2" markerEnd="url(#arrow-reg)" />
        {/* TFPI inhibits TF-VIIa-Xa */}
        <path d="M310,120 L290,80" stroke={pathwayMeta.regulatory.color} strokeWidth="0.5" fill="none" strokeDasharray="2 2" markerEnd="url(#arrow-reg)" />
      </g>

      {/* Fibrinolysis arrows */}
      <g opacity={isVisible("fibrinolysis") ? 0.5 : 0.08}>
        <line x1="260" y1="275" x2="300" y2="270" stroke={pathwayMeta.fibrinolysis.color} strokeWidth="1" strokeDasharray="2 2" />
        <line x1="345" y1="281" x2="345" y2="292" stroke={pathwayMeta.fibrinolysis.color} strokeWidth="1" markerEnd="url(#arrow-fib)" />
      </g>

      {/* Arrow markers */}
      <defs>
        {["i", "e", "c", "fib", "fb", "reg"].map((id, idx) => {
          const colors = [pathwayMeta.intrinsic.color, pathwayMeta.extrinsic.color, pathwayMeta.common.color, pathwayMeta.fibrinolysis.color, "hsl(45 80% 50%)", pathwayMeta.regulatory.color];
          return (
            <marker key={id} id={`arrow-${id}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6" fill="none" stroke={colors[idx]} strokeWidth="1" />
            </marker>
          );
        })}
      </defs>

      {/* Factor boxes */}
      {factors.map(f => {
        const p = pos[f.id];
        if (!p) return null;
        const color = pathwayMeta[f.pathway].color;
        const op = factorOpacity(f);
        const isSel = selectedFactor === f.id;
        const hasDrug = f.drugs && f.drugs.length > 0;
        const w = f.id === "tf-vii" || f.id === "prot-c" ? 110 : f.id === "plasminogen" || f.id === "fdp" || f.id === "atiii" || f.id === "tfpi" ? 95 : 100;
        return (
          <g key={f.id} opacity={op} className="cursor-pointer transition-opacity duration-200"
            onClick={() => { setSelectedFactor(isSel ? null : f.id); setSelectedDrug(null); }}>
            <rect x={p.x - w / 2} y={p.y - 10} width={w} height={22} rx="5"
              fill={color} fillOpacity={isSel ? 0.25 : 0.1}
              stroke={color} strokeWidth={isSel ? 2 : 1} />
            <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize="7.5" fill={color} fontWeight="bold">{f.label}</text>
            {hasDrug && (
              <>
                <circle cx={p.x + w / 2 - 4} cy={p.y - 6} r="3" fill="hsl(0,65%,55%)" fillOpacity="0.7" />
                <text x={p.x + w / 2 - 4} y={p.y - 4} textAnchor="middle" fontSize="4" fill="hsl(var(--background))" fontWeight="bold">Rx</text>
              </>
            )}
          </g>
        );
      })}

      {/* Ca²⁺ annotations */}
      <text x="170" y="185" fontSize="5" fill="hsl(45 80% 50%)" opacity="0.5">+ Ca²⁺ + PL</text>
      <text x="40" y="128" fontSize="5" fill={pathwayMeta.intrinsic.color} opacity="0.5">+ Ca²⁺ + PL</text>

      {/* Drug target highlights */}
      {activeDrugObj && activeDrugObj.factors.map(fId => {
        const p = pos[fId];
        if (!p) return null;
        return (
          <circle key={`drug-${fId}`} cx={p.x} cy={p.y} r="18" fill="hsl(0 65% 55%)" fillOpacity="0.1" stroke="hsl(0 65% 55%)" strokeWidth="1.5" strokeDasharray="3 2" />
        );
      })}
    </svg>
  );

  return (
    <DiagramFigure
      id="coagulation-cascade-diagram"
      title="Coagulation cascade"
      description="Auto-generated wrapper for the Coagulation cascade anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="mb-8">
        <div className="mb-3">
          <h3 className="text-lg font-serif font-bold text-foreground">Coagulation Cascade & Anticoagulant Targets</h3>
          <p className="text-sm text-muted-foreground">Tap factors to explore. Switch tabs for cell-based model, drug targets, and monitoring.</p>
        </div>
  
        <Tabs value={tab} onValueChange={v => { setTab(v as ViewTab); setSelectedFactor(null); setSelectedDrug(null); setHighlightPhase(null); }}>
          <TabsList className="grid w-full grid-cols-4 mb-3">
            <TabsTrigger value="cascade" className="text-[10px] sm:text-xs">Cascade</TabsTrigger>
            <TabsTrigger value="cell-based" className="text-[10px] sm:text-xs">Cell-Based</TabsTrigger>
            <TabsTrigger value="drugs" className="text-[10px] sm:text-xs">Drugs</TabsTrigger>
            <TabsTrigger value="tests" className="text-[10px] sm:text-xs">Tests</TabsTrigger>
          </TabsList>
  
          {/* ──── CASCADE TAB ──── */}
          <TabsContent value="cascade">
            <div className="flex flex-wrap gap-1.5 mb-3">
              <Badge variant={activePathway === "all" ? "default" : "outline"} className="cursor-pointer text-xs"
                onClick={() => { setActivePathway("all"); setSelectedFactor(null); }}>All</Badge>
              {(["intrinsic", "extrinsic", "common", "regulatory", "fibrinolysis"] as Pathway[]).map(p => (
                <Badge key={p} variant={activePathway === p ? "default" : "outline"} className="cursor-pointer text-xs"
                  onClick={() => { setActivePathway(p); setSelectedFactor(null); }}
                  style={activePathway === p ? { backgroundColor: pathwayMeta[p].color } : { color: pathwayMeta[p].color }}>
                  {pathwayMeta[p].label}
                </Badge>
              ))}
            </div>
  
            {renderCascadeSVG()}
  
            {activeFactor ? (
              <div className="p-4 rounded-lg border border-border animate-fade-in">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-bold text-sm" style={{ color: pathwayMeta[activeFactor.pathway].color }}>{activeFactor.label}</span>
                  <Badge variant="outline" className="text-xs" style={{ color: pathwayMeta[activeFactor.pathway].color }}>{pathwayMeta[activeFactor.pathway].label}</Badge>
                  {activeFactor.cellPhase && activeFactor.cellPhase.map(cp => (
                    <Badge key={cp} variant="outline" className="text-[10px]" style={{ color: cellPhaseColors[cp] }}>{cp}</Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{activeFactor.detail}</p>
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
  
          {/* ──── CELL-BASED MODEL TAB ──── */}
          <TabsContent value="cell-based">
            <p className="text-sm text-muted-foreground mb-3">
              The cell-based model describes coagulation occurring on cell surfaces in three overlapping phases. Highlight a phase to see which factors are involved.
            </p>
  
            <div className="flex flex-wrap gap-1.5 mb-4">
              {(["initiation", "amplification", "propagation", "termination"] as CellPhase[]).map(phase => (
                <button key={phase} onClick={() => setHighlightPhase(highlightPhase === phase ? null : phase)}
                  className={`px-2.5 py-1 rounded text-[10px] sm:text-xs font-medium border transition-all ${
                    highlightPhase === phase ? "border-primary/50 bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:bg-secondary/40"
                  }`}
                  style={highlightPhase === phase ? { borderColor: cellPhaseColors[phase], color: cellPhaseColors[phase] } : {}}>
                  {phase.charAt(0).toUpperCase() + phase.slice(1)}
                </button>
              ))}
            </div>
  
            {renderCascadeSVG()}
  
            <div className="space-y-3">
              {([
                { phase: "initiation" as CellPhase, title: "1. Initiation (TF-bearing cell)", desc: "Tissue factor exposed on damaged/activated cells binds VIIa → TF·VIIa complex activates small amounts of X → Xa. Xa + Va generate a small 'priming' dose of thrombin. Rapidly shut down by TFPI." },
                { phase: "amplification" as CellPhase, title: "2. Amplification (Platelet surface)", desc: "Small thrombin burst activates platelets (PAR-1/4 receptors → shape change, degranulation, PS exposure). Thrombin also activates V → Va, VIII → VIIIa (releases from vWF), XI → XIa. Primes the system for massive thrombin generation." },
                { phase: "propagation" as CellPhase, title: "3. Propagation (Activated platelet)", desc: "On activated platelet phospholipid surface: IXa + VIIIa (tenase) generate large amounts of Xa. Xa + Va (prothrombinase) produce a 'thrombin burst'. Fibrinogen → fibrin mesh. XIIIa cross-links clot. This is the main haemostatic event." },
                { phase: "termination" as CellPhase, title: "4. Termination / Regulation", desc: "ATIII (enhanced by heparin) neutralises IIa, Xa. Thrombin + thrombomodulin activate Protein C → APC + Protein S inactivate Va, VIIIa. TFPI inhibits TF·VIIa·Xa. Fibrinolysis: tPA → plasmin degrades fibrin. Balance prevents thrombosis." },
              ]).map(({ phase, title, desc }) => (
                <div key={phase} className={`p-3 rounded-lg border transition-all ${highlightPhase === phase ? "border-primary/30 bg-primary/5" : "border-border"}`}
                  style={highlightPhase === phase ? { borderColor: withAlpha(cellPhaseColors[phase], 0.38) } : {}}>
                  <p className="text-sm font-semibold text-foreground" style={{ color: cellPhaseColors[phase] }}>{title}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </TabsContent>
  
          {/* ──── DRUGS TAB ──── */}
          <TabsContent value="drugs">
            <div className="space-y-3">
              {drugs.map(d => {
                const isActive = selectedDrug === d.name;
                return (
                  <div key={d.name} className={`p-3 rounded-lg border transition-all cursor-pointer ${isActive ? "border-primary/30 bg-primary/5" : "border-border hover:bg-secondary/20"}`}
                    onClick={() => setSelectedDrug(isActive ? null : d.name)}>
                    <p className="font-semibold text-foreground text-sm">{d.name}</p>
                    <p className="text-xs text-muted-foreground mt-1"><span className="text-foreground font-medium">Target:</span> {d.target}</p>
                    <p className="text-xs text-muted-foreground mt-0.5"><span className="text-foreground font-medium">Monitor:</span> {d.monitor}</p>
                    <p className="text-xs text-muted-foreground mt-0.5"><span className="text-foreground font-medium">Reversal:</span> {d.reversal}</p>
                    {isActive && d.notes && (
                      <p className="text-xs text-muted-foreground mt-1.5 pt-1.5 border-t border-border/50 italic animate-fade-in">
                        💡 {d.notes}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
  
            {selectedDrug && (
              <div className="mt-4">
                <p className="text-xs font-semibold text-foreground mb-2">Cascade view — {selectedDrug} targets highlighted</p>
                {renderCascadeSVG()}
              </div>
            )}
          </TabsContent>
  
          {/* ──── TESTS TAB ──── */}
          <TabsContent value="tests">
            <div className="space-y-3">
              {(["intrinsic", "extrinsic", "common", "regulatory", "fibrinolysis"] as Pathway[]).map(p => {
                const m = pathwayMeta[p];
                return (
                      <div key={p} className="p-3 rounded-lg border border-border" style={{ borderColor: withAlpha(m.color, 0.25) }}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm" style={{ color: m.color }}>{m.test}</span>
                      <Badge variant="outline" className="text-xs" style={{ color: m.color }}>{m.label}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{m.testDetail}</p>
                  </div>
    );
              })}
              <div className="p-3 rounded-lg border border-border bg-muted/20">
                <p className="text-xs font-semibold text-foreground mb-1">Viscoelastic Testing (ROTEM / TEG)</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Point-of-care whole blood testing. ROTEM: EXTEM (extrinsic activation) — CT prolonged → FFP/PCC. FIBTEM A5 {"<"} 12mm → cryoprecipitate/fibrinogen concentrate.
                  EXTEM MCF low with normal FIBTEM → platelets. HEPTEM CT shorter than INTEM CT → residual heparin → protamine. EXTEM ML {">"} 15% → hyperfibrinolysis → TXA.
                  APTEM (TXA added) confirms fibrinolysis if EXTEM ML normalises.
                </p>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="rounded border border-border p-2 text-center">
                    <p className="text-[10px] font-semibold text-foreground">ROTEM Parameters</p>
                    <p className="text-[9px] text-muted-foreground">CT → clotting time (initiation)</p>
                    <p className="text-[9px] text-muted-foreground">CFT → clot formation time</p>
                    <p className="text-[9px] text-muted-foreground">MCF → max clot firmness</p>
                    <p className="text-[9px] text-muted-foreground">ML → max lysis (%)</p>
                  </div>
                  <div className="rounded border border-border p-2 text-center">
                    <p className="text-[10px] font-semibold text-foreground">TEG Parameters</p>
                    <p className="text-[9px] text-muted-foreground">R → reaction time</p>
                    <p className="text-[9px] text-muted-foreground">K → kinetics time</p>
                    <p className="text-[9px] text-muted-foreground">MA → max amplitude</p>
                    <p className="text-[9px] text-muted-foreground">LY30 → lysis at 30 min</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DiagramFigure>
  );
};

export default CoagulationCascadeDiagram;
