import { useState } from "react";

interface Element {
  symbol: string;
  name: string;
  atomicNumber: number;
  atomicMass: string;
  category: "alkali" | "alkaline" | "transition" | "halogen" | "other" | "polyatomic";
  group: number;
  period: number;
  electronConfig: string;
  normalRange?: string;
  physiology: string;
  pharmacology: string;
  clinicalPearl: string;
  disorders: string[];
}

const elements: Element[] = [
  {
    symbol: "Na", name: "Sodium", atomicNumber: 11, atomicMass: "22.99",
    category: "alkali", group: 1, period: 3, electronConfig: "2,8,1",
    normalRange: "135–145 mmol/L",
    physiology: "Principal extracellular cation. Determines plasma osmolality and ECF volume. Na⁺/K⁺-ATPase maintains resting membrane potential (−70 mV). Critical for action potential generation in nerves and muscle.",
    pharmacology: "0.9% NaCl (154 mmol/L) — isotonic crystalloid. Hypertonic saline (3–23.4%) for raised ICP and hyponatraemia. Co-transported with glucose (SGLT-2 inhibitors). Sodium bicarbonate for metabolic acidosis.",
    clinicalPearl: "Rapid correction of hyponatraemia risks osmotic demyelination syndrome (ODS). Correct ≤10 mmol/L per 24h. Hyponatraemia is the commonest electrolyte abnormality in hospitalised patients.",
    disorders: ["Hyponatraemia — SIADH, diuretics, water overload", "Hypernatraemia — diabetes insipidus, dehydration", "Osmotic demyelination syndrome"]
  },
  {
    symbol: "K", name: "Potassium", atomicNumber: 19, atomicMass: "39.10",
    category: "alkali", group: 1, period: 4, electronConfig: "2,8,8,1",
    normalRange: "3.5–5.0 mmol/L",
    physiology: "Principal intracellular cation (150 mmol/L inside cells). K⁺ gradient across cell membranes sets resting membrane potential. Critical for cardiac repolarisation, skeletal muscle function, and insulin secretion.",
    pharmacology: "KCl replacement (max 20 mmol/h peripherally, 40 mmol/h centrally). Suxamethonium raises K⁺ by ~0.5 mmol/L (contraindicated in burns, denervation). Insulin drives K⁺ intracellularly. Calcium gluconate stabilises cardiac membrane.",
    clinicalPearl: "Hyperkalaemia is the most dangerous perioperative electrolyte emergency — causes tall peaked T waves → loss of P wave → sine wave → VF/asystole. Treat with: calcium, insulin/dextrose, salbutamol, bicarbonate.",
    disorders: ["Hyperkalaemia — renal failure, acidosis, tissue damage, suxamethonium", "Hypokalaemia — diuretics, alkalosis, insulin", "ECG: peaked T, wide QRS, sine wave"]
  },
  {
    symbol: "Ca", name: "Calcium", atomicNumber: 20, atomicMass: "40.08",
    category: "alkaline", group: 2, period: 4, electronConfig: "2,8,8,2",
    normalRange: "2.2–2.6 mmol/L (total); 1.1–1.3 (ionised)",
    physiology: "Essential for excitation-contraction coupling (skeletal, cardiac, smooth muscle). Triggers neurotransmitter release at NMJ. Activates coagulation cascade (Factor IV). 99% stored in bone as hydroxyapatite. Only ionised fraction (45%) is physiologically active.",
    pharmacology: "Calcium chloride (6.8 mmol/10 mL) — 3× more ionised Ca²⁺ than gluconate. Calcium gluconate (2.2 mmol/10 mL) — safer peripherally. Reverses Mg²⁺ toxicity and Ca²⁺-channel blocker overdose. Citrate in blood products chelates Ca²⁺.",
    clinicalPearl: "Massive transfusion causes hypocalcaemia via citrate chelation — give 10 mL CaCl₂ per 4 units PRBCs. Ionised Ca²⁺ falls with alkalosis (increased protein binding). Always check ionised, not total.",
    disorders: ["Hypocalcaemia — massive transfusion, parathyroid surgery, alkalosis", "Hypercalcaemia — malignancy, hyperparathyroidism", "Chvostek's & Trousseau's signs"]
  },
  {
    symbol: "Mg", name: "Magnesium", atomicNumber: 12, atomicMass: "24.31",
    category: "alkaline", group: 2, period: 3, electronConfig: "2,8,2",
    normalRange: "0.7–1.0 mmol/L",
    physiology: "Cofactor for >300 enzymes including Na⁺/K⁺-ATPase. Natural calcium channel antagonist. Regulates vascular tone and bronchial smooth muscle. Required for ATP function (Mg-ATP complex). Modulates NMDA receptor activity.",
    pharmacology: "MgSO₄ 2g IV for eclampsia (loading) then 1g/h. Bronchodilator in acute severe asthma (2g IV). Anti-arrhythmic for torsades de pointes. Potentiates non-depolarising NMBAs. Analgesic adjunct (NMDA antagonism).",
    clinicalPearl: "Mg²⁺ potentiates NMBAs — monitor neuromuscular function carefully in pre-eclamptic patients on MgSO₄. Toxicity: loss of reflexes (5 mmol/L) → respiratory depression (7.5) → cardiac arrest (12.5). Treat with IV CaCl₂.",
    disorders: ["Hypomagnesaemia — diuretics, alcohol, malabsorption", "Hypermagnesaemia — renal failure, iatrogenic", "Mg²⁺ toxicity: reflexes → resp depression → arrest"]
  },
  {
    symbol: "Cl", name: "Chloride", atomicNumber: 17, atomicMass: "35.45",
    category: "halogen", group: 17, period: 3, electronConfig: "2,8,7",
    normalRange: "96–106 mmol/L",
    physiology: "Principal extracellular anion. Maintains electroneutrality with Na⁺. Key component of Stewart acid-base model (strong ion difference). GABA-A receptor channels are Cl⁻ channels — Cl⁻ influx causes neuronal hyperpolarisation (inhibition).",
    pharmacology: "0.9% NaCl delivers 154 mmol/L Cl⁻ (supraphysiological) — large volumes cause hyperchloraemic metabolic acidosis (↓SID). Balanced solutions (Hartmann's: 111 mmol/L Cl⁻) avoid this. Suxamethonium and atracurium contain Cl⁻.",
    clinicalPearl: "Hyperchloraemic acidosis from 0.9% saline is a non-anion-gap metabolic acidosis (NAGMA). Stewart approach: excess Cl⁻ reduces SID → acidosis. Use balanced crystalloids to avoid this — especially in large-volume resuscitation.",
    disorders: ["Hyperchloraemia — excessive 0.9% NaCl", "Hypochloraemia — vomiting, NG losses, diuretics", "NAGMA vs HAGMA differentiation"]
  },
  {
    symbol: "Fe", name: "Iron", atomicNumber: 26, atomicMass: "55.85",
    category: "transition", group: 8, period: 4, electronConfig: "2,8,14,2",
    normalRange: "10–30 μmol/L (serum)",
    physiology: "Central atom in haemoglobin (Fe²⁺ in haem binds O₂ reversibly). Each Hb molecule contains 4 haem groups. Also in myoglobin, cytochrome oxidase (electron transport chain), and catalase. Fe³⁺ (methaemoglobin) cannot bind O₂.",
    pharmacology: "IV iron (ferric carboxymaltose/Ferinject® — up to 1000 mg single dose) for preoperative anaemia optimisation. Oral iron poorly absorbed (10%). Deferoxamine chelates iron in poisoning. EPO requires adequate iron stores.",
    clinicalPearl: "Preoperative anaemia (Hb <130 g/L in both sexes, WHO) doubles perioperative morbidity and mortality. IV iron can raise Hb by 10–20 g/L in 2–4 weeks. Check ferritin (<30 = depleted, 30–100 = possible deficiency) and transferrin saturation.",
    disorders: ["Iron-deficiency anaemia — commonest cause worldwide", "Methaemoglobinaemia — Fe²⁺ → Fe³⁺ (prilocaine, dapsone)", "Haemochromatosis — iron overload"]
  },
  {
    symbol: "Cu", name: "Copper", atomicNumber: 29, atomicMass: "63.55",
    category: "transition", group: 11, period: 4, electronConfig: "2,8,18,1",
    normalRange: "12–20 μmol/L",
    physiology: "Cofactor for cytochrome c oxidase (terminal electron transport), superoxide dismutase (antioxidant defence), and ceruloplasmin (ferroxidase — converts Fe²⁺ to Fe³⁺ for transferrin binding). Essential for collagen cross-linking (lysyl oxidase).",
    pharmacology: "No direct anaesthetic pharmacology but relevant in Wilson's disease — penicillamine and trientine chelate copper. Zinc acetate reduces copper absorption. Liver transplant may be curative in fulminant Wilson's.",
    clinicalPearl: "Wilson's disease patients presenting for surgery: check LFTs, coagulation, and copper levels. Hepatic failure, haemolytic anaemia, and neuropsychiatric features. Avoid hepatotoxic agents. Kayser-Fleischer rings are pathognomonic.",
    disorders: ["Wilson's disease — copper overload, ceruloplasmin low", "Menkes disease — copper deficiency, X-linked", "Kayser-Fleischer rings on slit-lamp examination"]
  },
  {
    symbol: "Zn", name: "Zinc", atomicNumber: 30, atomicMass: "65.38",
    category: "transition", group: 12, period: 4, electronConfig: "2,8,18,2",
    normalRange: "10–18 μmol/L",
    physiology: "Cofactor for >100 metalloenzymes including carbonic anhydrase (CO₂ transport and acid-base regulation), alcohol dehydrogenase, and DNA/RNA polymerases. Essential for wound healing, immune function (T-cell maturation), and taste/smell sensation.",
    pharmacology: "Zinc supplements in ICU patients reduce infection rates (some evidence). Zinc acetate used in Wilson's disease to block copper absorption. Zinc oxide in topical wound care. Carbonic anhydrase inhibitors (acetazolamide) target zinc-dependent enzyme.",
    clinicalPearl: "ICU patients are commonly zinc-deficient (losses in burns, diarrhoea, renal replacement therapy). Deficiency impairs wound healing and immune function. Check levels in prolonged critical illness. Carbonic anhydrase (Zn-dependent) is the target of acetazolamide.",
    disorders: ["Zinc deficiency — impaired wound healing, immunodeficiency", "Acrodermatitis enteropathica — congenital zinc malabsorption", "Anosmia/ageusia in deficiency"]
  },
  {
    symbol: "F", name: "Fluorine", atomicNumber: 9, atomicMass: "19.00",
    category: "halogen", group: 17, period: 2, electronConfig: "2,7",
    physiology: "Most electronegative element. C–F bond is one of the strongest in organic chemistry (485 kJ/mol), conferring metabolic stability. Fluoride incorporated into bone as fluorapatite. Fluoride inhibits enolase in glycolysis at high concentrations.",
    pharmacology: "Critical in volatile anaesthetic structure — sevoflurane has 7 F atoms, desflurane has 6. C–F bonds reduce flammability, increase stability, and modify blood:gas solubility. Compound A (from sevoflurane + soda lime) contains fluoride. High-dose/prolonged sevoflurane → inorganic fluoride release (nephrotoxicity debated).",
    clinicalPearl: "Methoxyflurane was withdrawn due to fluoride nephrotoxicity (>50 μmol/L). Sevoflurane produces fluoride but nephrotoxicity not proven — possibly because fluoride is released systemically not intrarenally. The C–F bond explains why modern volatiles are non-flammable unlike diethyl ether.",
    disorders: ["Fluoride nephrotoxicity (historical — methoxyflurane)", "Compound A production with soda lime", "Fluorosis with chronic exposure"]
  },
  {
    symbol: "I", name: "Iodine", atomicNumber: 53, atomicMass: "126.90",
    category: "halogen", group: 17, period: 5, electronConfig: "2,8,18,18,7",
    normalRange: "Urinary: 100–200 μg/L",
    physiology: "Essential component of thyroid hormones — T₃ (triiodothyronine, 3 iodine atoms) and T₄ (thyroxine, 4 iodine atoms). T₃ is the active form (4× more potent). Thyroid hormones regulate basal metabolic rate, thermogenesis, and cardiovascular function.",
    pharmacology: "Povidone-iodine (Betadine®) — antiseptic for skin preparation. Lugol's iodine pre-thyroidectomy (reduces vascularity). Amiodarone contains 37% iodine by weight — causes thyroid dysfunction in 15–20%. IV contrast media are iodine-based (anaphylactoid risk).",
    clinicalPearl: "Amiodarone-induced thyrotoxicosis (AIT) — Type 1 (excess iodine → increased T₄ in abnormal gland) vs Type 2 (destructive thyroiditis releasing stored hormone). Pre-thyroidectomy: Lugol's iodine for 10 days reduces gland vascularity and thyroid storm risk.",
    disorders: ["Thyrotoxicosis/thyroid storm — life-threatening perioperative emergency", "Amiodarone-induced thyroid dysfunction (AIT Type 1 vs 2)", "Iodine contrast allergy (not true iodine allergy)"]
  },
  {
    symbol: "PO₄", name: "Phosphate", atomicNumber: 15, atomicMass: "94.97",
    category: "polyatomic", group: 15, period: 3, electronConfig: "PO₄³⁻",
    normalRange: "0.8–1.5 mmol/L",
    physiology: "Essential for energy metabolism — ATP (adenosine triphosphate) is the universal energy currency. Component of DNA/RNA backbone (phosphodiester bonds), cell membrane phospholipids, and 2,3-DPG (regulates O₂-Hb affinity). Phosphate buffer system (H₂PO₄⁻/HPO₄²⁻, pKa 6.8) is the main intracellular and urinary buffer.",
    pharmacology: "IV sodium phosphate (Polyfusor®) for severe hypophosphataemia (0.3–0.5 mmol/kg over 6h). Phosphate-containing enemas (Fleet®) can cause fatal hyperphosphataemia in children/elderly. Phosphate binders (sevelamer, calcium acetate) in CKD. Fosphenytoin is a phosphate ester prodrug of phenytoin.",
    clinicalPearl: "Refeeding syndrome: insulin surge drives PO₄ into cells → acute hypophosphataemia → ATP depletion → respiratory muscle weakness, cardiac failure, arrhythmias. Check PO₄ before starting nutrition in malnourished/ICU patients. Correct to >0.5 mmol/L before extubation — diaphragm weakness is underappreciated.",
    disorders: ["Hypophosphataemia — refeeding syndrome, DKA treatment, CRRT", "Hyperphosphataemia — CKD, tumour lysis, rhabdomyolysis", "Refeeding syndrome — potentially fatal if unrecognised"]
  },
  {
    symbol: "HCO₃⁻", name: "Bicarbonate", atomicNumber: 6, atomicMass: "61.02",
    category: "polyatomic", group: 14, period: 2, electronConfig: "HCO₃⁻",
    normalRange: "22–26 mmol/L",
    physiology: "The most important extracellular buffer. Bicarbonate buffer system: CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻ (catalysed by carbonic anhydrase). Open system — CO₂ eliminated by lungs, HCO₃⁻ regulated by kidneys. Henderson-Hasselbalch: pH = 6.1 + log([HCO₃⁻] / 0.03 × PaCO₂). Normal ratio 20:1 maintains pH 7.4.",
    pharmacology: "8.4% NaHCO₃ (1 mmol/mL) for severe metabolic acidosis (pH <7.1), hyperkalaemia (drives K⁺ intracellularly), and tricyclic antidepressant overdose (sodium loading + alkalinisation). 1.26% NaHCO₃ is isotonic. Generates CO₂ — ensure adequate ventilation. Citrate in RRT is metabolised to HCO₃⁻.",
    clinicalPearl: "Bicarbonate therapy is controversial — generates CO₂ (worsens intracellular acidosis if ventilation inadequate), causes hypokalaemia, hypernatraemia, and left-shifts the O₂ dissociation curve. ALS guidelines: consider in pH <7.1 or hyperkalaemia. Stewart approach: HCO₃⁻ is a dependent variable — treat the cause (SID, weak acids, CO₂) not the number.",
    disorders: ["Metabolic acidosis — low HCO₃⁻ (DKA, lactic acidosis, renal tubular acidosis)", "Metabolic alkalosis — high HCO₃⁻ (vomiting, diuretics, Cushing's)", "Respiratory compensation — Winter's formula: expected PaCO₂ = 1.5 × [HCO₃⁻] + 8 ± 2"]
  },
];

const categoryColors: Record<string, { bg: string; border: string; text: string; label: string }> = {
  alkali: { bg: "bg-red-500/15", border: "border-red-500/40", text: "text-red-400", label: "Alkali Metals" },
  alkaline: { bg: "bg-orange-500/15", border: "border-orange-500/40", text: "text-orange-400", label: "Alkaline Earth Metals" },
  transition: { bg: "bg-sky-500/15", border: "border-sky-500/40", text: "text-sky-400", label: "Transition Metals" },
  halogen: { bg: "bg-emerald-500/15", border: "border-emerald-500/40", text: "text-emerald-400", label: "Halogens" },
  polyatomic: { bg: "bg-violet-500/15", border: "border-violet-500/40", text: "text-violet-400", label: "Polyatomic Ions" },
  other: { bg: "bg-purple-500/15", border: "border-purple-500/40", text: "text-purple-400", label: "Other Non-metals" },
};

export const PeriodicTableAnaestheticDiagram = () => {
  const [selected, setSelected] = useState<Element | null>(null);
  const [activeTab, setActiveTab] = useState<"physiology" | "pharmacology" | "clinical">("physiology");

  return (
    <div className="space-y-4">
      {/* Legend */}
      <div className="flex flex-wrap gap-2 justify-center">
        {Object.entries(categoryColors).map(([key, val]) => (
          <span key={key} className={`inline-flex items-center gap-1.5 text-[10px] px-2 py-1 rounded-full border ${val.border} ${val.bg} ${val.text} font-medium`}>
            <span className={`w-2 h-2 rounded-full ${val.bg} border ${val.border}`} />
            {val.label}
          </span>
        ))}
      </div>

      {/* Element Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-6 gap-1.5 sm:gap-2">
        {elements.map((el) => {
          const cat = categoryColors[el.category];
          const isSelected = selected?.symbol === el.symbol;
          return (
            <button
              key={el.symbol}
              onClick={() => setSelected(isSelected ? null : el)}
              className={`relative flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-lg border-2 transition-all duration-200 cursor-pointer min-h-[72px] sm:min-h-[88px]
                ${isSelected
                  ? `${cat.bg} ${cat.border} ring-2 ring-offset-1 ring-offset-background scale-105 shadow-lg`
                  : `${cat.bg} ${cat.border} hover:scale-105 hover:shadow-md`
                }
                ${isSelected ? `ring-${el.category === 'alkali' ? 'red' : el.category === 'alkaline' ? 'orange' : el.category === 'transition' ? 'sky' : 'emerald'}-400/50` : ''}
              `}
            >
              <span className="text-[9px] text-muted-foreground leading-none">{el.atomicNumber}</span>
              <span className={`text-lg sm:text-2xl font-bold ${cat.text} leading-tight`}>{el.symbol}</span>
              <span className="text-[8px] sm:text-[9px] text-muted-foreground leading-tight truncate w-full text-center">{el.name}</span>
              <span className="text-[7px] sm:text-[8px] text-muted-foreground/60 leading-none">{el.atomicMass}</span>
            </button>
          );
        })}
      </div>

      {/* Detail Panel */}
      {selected && (
        <div className={`rounded-xl border-2 ${categoryColors[selected.category].border} ${categoryColors[selected.category].bg} p-4 sm:p-5 space-y-4 animate-in fade-in-0 slide-in-from-bottom-2 duration-300`}>
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className={`flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-xl border-2 ${categoryColors[selected.category].border} bg-background/50`}>
              <span className="text-xs text-muted-foreground">{selected.atomicNumber}</span>
              <span className={`text-3xl sm:text-4xl font-bold ${categoryColors[selected.category].text}`}>{selected.symbol}</span>
              <span className="text-[10px] text-muted-foreground">{selected.atomicMass}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className={`text-xl font-bold ${categoryColors[selected.category].text}`}>{selected.name}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Electron config: {selected.electronConfig}</p>
              {selected.normalRange && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  Normal range: <span className="font-semibold text-foreground">{selected.normalRange}</span>
                </p>
              )}
              <div className="flex flex-wrap gap-1 mt-2">
                {selected.disorders.map((d, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-background/50 border border-border text-muted-foreground">{d}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-background/30 rounded-lg p-0.5">
            {(["physiology", "pharmacology", "clinical"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 text-xs sm:text-sm font-medium py-2 px-3 rounded-md transition-all capitalize
                  ${activeTab === tab
                    ? `${categoryColors[selected.category].bg} ${categoryColors[selected.category].text} shadow-sm`
                    : "text-muted-foreground hover:text-foreground"
                  }`}
              >
                {tab === "clinical" ? "Clinical Pearl" : tab}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="text-sm text-muted-foreground leading-relaxed">
            {activeTab === "physiology" && <p>{selected.physiology}</p>}
            {activeTab === "pharmacology" && <p>{selected.pharmacology}</p>}
            {activeTab === "clinical" && <p>{selected.clinicalPearl}</p>}
          </div>
        </div>
      )}

      {!selected && (
        <p className="text-center text-xs text-muted-foreground py-3">Tap an element to explore its physiological and pharmacological significance</p>
      )}
    </div>
  );
};
