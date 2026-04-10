import { useState } from "react";
import { Button } from "@/components/ui/button";

type Category = "induction" | "volatile" | "nmba" | "analgesic" | "reversal" | "other";

interface DrugEntry {
  name: string;
  safe: boolean;
  note: string;
}

const categories: { key: Category; label: string }[] = [
  { key: "induction", label: "Induction" },
  { key: "volatile", label: "Volatiles" },
  { key: "nmba", label: "NMBAs" },
  { key: "analgesic", label: "Analgesics" },
  { key: "reversal", label: "Reversal" },
  { key: "other", label: "Other" },
];

const drugs: Record<Category, DrugEntry[]> = {
  induction: [
    { name: "Propofol", safe: true, note: "Mild bronchodilation; preferred induction agent in asthma" },
    { name: "Ketamine", safe: true, note: "Bronchodilator via sympathomimetic effect; useful in acute severe bronchospasm" },
    { name: "Etomidate", safe: true, note: "Minimal histamine release; haemodynamically stable" },
    { name: "Thiopentone", safe: false, note: "Histamine release → may trigger bronchospasm; avoid in asthma" },
  ],
  volatile: [
    { name: "Sevoflurane", safe: true, note: "Bronchodilator properties; preferred volatile agent" },
    { name: "Isoflurane", safe: true, note: "Mild bronchodilation; acceptable alternative" },
    { name: "Desflurane", safe: false, note: "Pungent airway irritant → bronchospasm, coughing, laryngospasm; avoid in reactive airways" },
  ],
  nmba: [
    { name: "Rocuronium", safe: true, note: "No histamine release; preferred NMBA for asthma/COPD" },
    { name: "Vecuronium", safe: true, note: "No significant histamine release" },
    { name: "Cisatracurium", safe: true, note: "Minimal histamine release (unlike atracurium)" },
    { name: "Atracurium", safe: false, note: "Dose-dependent histamine release → bronchospasm risk" },
    { name: "Mivacurium", safe: false, note: "Significant histamine release; avoid in reactive airways" },
    { name: "Suxamethonium", safe: true, note: "Generally safe; minimal bronchospasm risk (slight histamine release rarely significant)" },
  ],
  analgesic: [
    { name: "Fentanyl", safe: true, note: "No histamine release; preferred opioid for asthma" },
    { name: "Remifentanil", safe: true, note: "No histamine release; useful for short procedures" },
    { name: "Alfentanil", safe: true, note: "No histamine release" },
    { name: "Morphine", safe: false, note: "Histamine release → bronchospasm and hypotension; avoid in asthma" },
    { name: "Paracetamol", safe: true, note: "Safe; important part of multimodal analgesia" },
    { name: "NSAIDs", safe: false, note: "~10% asthmatics have aspirin-sensitive asthma (Samter's triad); avoid unless tolerance confirmed" },
  ],
  reversal: [
    { name: "Sugammadex", safe: true, note: "No muscarinic effects; preferred reversal agent in asthma" },
    { name: "Neostigmine", safe: false, note: "Muscarinic effects → bronchospasm, increased secretions; use with glycopyrrolate if needed" },
  ],
  other: [
    { name: "Salbutamol", safe: true, note: "β₂-agonist bronchodilator; first-line treatment for bronchospasm" },
    { name: "Ipratropium", safe: true, note: "Anticholinergic bronchodilator; useful adjunct" },
    { name: "IV Magnesium", safe: true, note: "2 g IV for acute bronchospasm; smooth muscle relaxant" },
    { name: "IV Hydrocortisone", safe: true, note: "200 mg for acute bronchospasm; anti-inflammatory (onset 4–6 h)" },
    { name: "IV Aminophylline", safe: true, note: "Last-line bronchodilator; narrow therapeutic index; monitor levels" },
  ],
};

const RespiratoryDrugSafetyDiagram = () => {
  const [category, setCategory] = useState<Category>("induction");

  return (
    <div className="space-y-4 mb-8">
      <div className="p-4 rounded-lg border border-border bg-card">
        <h2 className="text-xl font-serif font-bold text-foreground mb-1">Drug Safety in Reactive Airways</h2>
        <p className="text-sm text-muted-foreground mb-3">Interactive guide to safe and avoid drugs for patients with asthma or COPD. Select a category.</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {categories.map((c) => (
            <Button key={c.key} variant={category === c.key ? "default" : "outline"} size="sm" onClick={() => setCategory(c.key)} className="text-xs">
              {c.label}
            </Button>
          ))}
        </div>

        <div className="space-y-2">
          {drugs[category].map((d) => (
            <div key={d.name} className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${d.safe ? "border-chart-4/30 bg-chart-4/5" : "border-destructive/30 bg-destructive/5"}`}>
              <span className={`flex-shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${d.safe ? "bg-chart-4/20 text-chart-4" : "bg-destructive/20 text-destructive"}`}>
                {d.safe ? "✓" : "✗"}
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">{d.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{d.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-3 rounded-lg border border-border bg-card">
        <p className="text-xs font-semibold text-foreground mb-1">Acute Intraoperative Bronchospasm Protocol</p>
        <div className="flex flex-wrap gap-1.5">
          {["Deepen anaesthesia", "100% O₂", "Salbutamol MDI (8 puffs)", "IV salbutamol 250 µg", "IV MgSO₄ 2 g", "IV hydrocortisone 200 mg", "IV aminophylline (last-line)"].map((step, i) => (
            <span key={step} className="text-[10px] px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
              {i + 1}. {step}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RespiratoryDrugSafetyDiagram;
