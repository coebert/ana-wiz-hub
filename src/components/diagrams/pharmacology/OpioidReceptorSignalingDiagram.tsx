import { useState } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

interface Receptor {
  id: string;
  name: string;
  fullName: string;
  gene: string;
  gProtein: string;
  endogenous: string;
  agonists: string;
  antagonists: string;
  location: string;
  effects: string;
  adverse: string;
  color: string;
}

const receptors: Receptor[] = [
  {
    id: "mor",
    name: "MOR (μ)",
    fullName: "Mu opioid receptor",
    gene: "OPRM1",
    gProtein: "Gαi/o — ↓ adenylate cyclase → ↓ cAMP; opens GIRK K⁺ channels (hyperpolarisation); closes voltage-gated Ca²⁺ channels (↓ neurotransmitter release)",
    endogenous: "β-endorphin, endomorphin-1 & -2",
    agonists: "Morphine, fentanyl, alfentanil, remifentanil, methadone, oxycodone, codeine (pro-drug)",
    antagonists: "Naloxone, naltrexone, methylnaltrexone (peripheral)",
    location: "PAG, RVM, dorsal horn (laminae I, II), thalamus, limbic system, GI tract, peripheral nociceptors",
    effects: "Supraspinal & spinal analgesia, euphoria, sedation, miosis, respiratory depression, ↓ GI motility, antitussive",
    adverse: "Respiratory depression, tolerance, dependence, constipation, nausea, pruritus, urinary retention, hyperalgesia (OIH)",
    color: "hsl(0 70% 55%)",
  },
  {
    id: "kor",
    name: "KOR (κ)",
    fullName: "Kappa opioid receptor",
    gene: "OPRK1",
    gProtein: "Gαi/o — ↓ cAMP; opens K⁺ channels; closes N-type Ca²⁺ channels. Also recruits β-arrestin → dysphoria.",
    endogenous: "Dynorphin A & B",
    agonists: "Pentazocine (partial), butorphanol, nalbuphine (mixed agonist-antagonist), salvinorin A",
    antagonists: "Naloxone, nor-binaltorphimine (selective)",
    location: "Spinal cord (dorsal horn), brain (hypothalamus, claustrum), peripheral tissue",
    effects: "Spinal analgesia, dysphoria, miosis, diuresis (↓ ADH), sedation, antipruritic",
    adverse: "Dysphoria, hallucinations, psychotomimetic effects — limits clinical use as analgesics",
    color: "hsl(280 65% 55%)",
  },
  {
    id: "dor",
    name: "DOR (δ)",
    fullName: "Delta opioid receptor",
    gene: "OPRD1",
    gProtein: "Gαi/o — ↓ cAMP; modulates K⁺ and Ca²⁺ channels. Forms heteromers with MOR.",
    endogenous: "Enkephalins (Met- and Leu-enkephalin)",
    agonists: "DPDPE (research), SNC80 (research) — no widely used clinical δ-selective agonists",
    antagonists: "Naloxone, naltrindole (selective)",
    location: "Cortex, olfactory bulb, striatum, spinal cord (less than MOR)",
    effects: "Modulatory analgesia (especially chronic/inflammatory pain), anxiolytic, antidepressant effects, cardioprotection (preconditioning)",
    adverse: "Convulsions at high doses (animal models); limited clinical use",
    color: "hsl(180 60% 45%)",
  },
  {
    id: "nop",
    name: "NOP (ORL-1)",
    fullName: "Nociceptin/orphanin FQ peptide receptor",
    gene: "OPRL1",
    gProtein: "Gαi/o — ↓ cAMP; opens K⁺ channels; closes Ca²⁺ channels. Despite homology with classical opioid receptors, NOT blocked by naloxone.",
    endogenous: "Nociceptin / orphanin FQ (N/OFQ)",
    agonists: "Cebranopadol (mixed MOR/NOP — investigational), buprenorphine (partial NOP agonism contributes to ceiling effect)",
    antagonists: "J-113397, SB-612111 (research). NOT antagonised by naloxone.",
    location: "Cortex, hippocampus, amygdala, hypothalamus, spinal cord, autonomic ganglia",
    effects: "Bidirectional pain modulation: pro-nociceptive supraspinally, anti-nociceptive spinally. Anxiolytic, anti-reward (↓ addiction potential), modulates stress and memory",
    adverse: "Hyperalgesia (supraspinal), tolerance to opioid analgesia, immune modulation",
    color: "hsl(45 85% 50%)",
  },
];

export const OpioidReceptorSignalingDiagram = () => {
  const [selected, setSelected] = useState<string>("mor");
  const active = receptors.find((r) => r.id === selected) ?? receptors[0];

  return (
    <DiagramFigure
      id="opioid-receptor-signaling-diagram"
      title="Opioid receptor signaling"
      description="Opioid receptor signaling: labelled teaching figure showing the structures, relationships and key values FRCA and FFICM candidates need to recognise and explain for this topic."
    >
                  <div className="w-full bg-card border border-border rounded-lg p-4 sm:p-6 my-6">
        <h3 className="text-lg font-serif font-bold text-foreground mb-1">Opioid Receptors — Signalling & Downstream Effects</h3>
        <p className="text-sm text-muted-foreground mb-4">All four receptors are 7-transmembrane Gαi/o-coupled GPCRs. Click a receptor to explore its endogenous ligand, agonists, and clinical effects.</p>
  
        {/* Receptor selector chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {receptors.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelected(r.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                selected === r.id
                  ? "border-foreground text-background shadow-sm"
                  : "border-border text-foreground hover:border-foreground/50"
              }`}
              style={{ backgroundColor: selected === r.id ? r.color : "transparent" }}
            >
              {r.name}
            </button>
          ))}
        </div>
  
        {/* SVG diagram */}
        <div className="w-full overflow-x-auto">
          <svg viewBox="0 0 800 520" className="w-full h-auto" style={{ minWidth: 600 }}>
            {/* Extracellular label */}
            <text x="10" y="20" className="fill-muted-foreground" fontSize="11" fontWeight="600">EXTRACELLULAR</text>
  
            {/* Endogenous ligand */}
            <circle cx="400" cy="60" r="14" fill={active.color} opacity="0.85" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
            <text x="400" y="64" textAnchor="middle" className="fill-background" fontSize="10" fontWeight="700">L</text>
            <text x="400" y="40" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="600">{active.endogenous.split(",")[0]}</text>
  
            {/* Arrow ligand → receptor */}
            <line x1="400" y1="78" x2="400" y2="105" stroke={active.color} strokeWidth="2" markerEnd="url(#arrowR)" />
            <defs>
              <marker id="arrowR" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill={active.color} />
              </marker>
              <marker id="arrowGrey" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--muted-foreground))" />
              </marker>
            </defs>
  
            {/* Membrane bilayer */}
            <rect x="50" y="110" width="700" height="40" fill="hsl(var(--muted))" opacity="0.4" />
            <text x="55" y="135" className="fill-muted-foreground" fontSize="10" fontStyle="italic">lipid bilayer</text>
  
            {/* 7TM receptor (7 helices as rectangles) */}
            {[0,1,2,3,4,5,6].map((i) => (
              <rect
                key={i}
                x={355 + i * 13}
                y="108"
                width="9"
                height="44"
                fill={active.color}
                opacity="0.85"
                stroke="hsl(var(--foreground))"
                strokeWidth="1"
                rx="2"
              />
            ))}
            <text x="400" y="172" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="700">{active.name}</text>
            <text x="400" y="184" textAnchor="middle" className="fill-muted-foreground" fontSize="9">7-TM GPCR · {active.gene}</text>
  
            {/* Intracellular label */}
            <text x="10" y="170" className="fill-muted-foreground" fontSize="11" fontWeight="600">INTRACELLULAR</text>
  
            {/* G-protein heterotrimer (αi/o, β, γ) */}
            <ellipse cx="385" cy="210" rx="22" ry="14" fill="hsl(var(--background))" stroke={active.color} strokeWidth="2" />
            <text x="385" y="214" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="600">αi/o</text>
            <ellipse cx="420" cy="210" rx="14" ry="10" fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeWidth="1" />
            <text x="420" y="213" textAnchor="middle" className="fill-foreground" fontSize="9">βγ</text>
  
            {/* Arrow αi → AC */}
            <line x1="365" y1="220" x2="180" y2="280" stroke={active.color} strokeWidth="2" markerEnd="url(#arrowR)" />
            <text x="270" y="245" className="fill-muted-foreground" fontSize="9" fontStyle="italic">inhibits</text>
  
            {/* Arrow βγ → channels */}
            <line x1="435" y1="220" x2="600" y2="285" stroke={active.color} strokeWidth="2" markerEnd="url(#arrowR)" />
            <text x="510" y="245" className="fill-muted-foreground" fontSize="9" fontStyle="italic">βγ acts on channels</text>
  
            {/* Adenylate cyclase box */}
            <rect x="80" y="280" width="140" height="50" rx="6" fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
            <text x="150" y="300" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="600">Adenylate cyclase</text>
            <text x="150" y="316" textAnchor="middle" className="fill-muted-foreground" fontSize="10">↓ cAMP</text>
  
            {/* Downstream from AC */}
            <line x1="150" y1="335" x2="150" y2="375" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" markerEnd="url(#arrowGrey)" />
            <rect x="60" y="380" width="180" height="55" rx="6" fill="hsl(var(--muted))" opacity="0.3" stroke="hsl(var(--border))" strokeWidth="1" />
            <text x="150" y="400" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="600">↓ PKA activity</text>
            <text x="150" y="415" textAnchor="middle" className="fill-muted-foreground" fontSize="9">↓ phosphorylation of</text>
            <text x="150" y="427" textAnchor="middle" className="fill-muted-foreground" fontSize="9">CREB, ion channels</text>
  
            {/* K+ channel (GIRK) */}
            <rect x="540" y="285" width="60" height="44" fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeWidth="1.5" rx="3" />
            <text x="570" y="305" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="600">GIRK</text>
            <text x="570" y="319" textAnchor="middle" className="fill-muted-foreground" fontSize="9">K⁺ ↑ efflux</text>
            <text x="570" y="350" textAnchor="middle" className="fill-muted-foreground" fontSize="9">→ hyperpolarisation</text>
  
            {/* Ca2+ channel */}
            <rect x="640" y="285" width="70" height="44" fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeWidth="1.5" rx="3" />
            <text x="675" y="305" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="600">VG-Ca²⁺</text>
            <text x="675" y="319" textAnchor="middle" className="fill-muted-foreground" fontSize="9">N-type ↓</text>
            <text x="675" y="350" textAnchor="middle" className="fill-muted-foreground" fontSize="9">→ ↓ NT release</text>
  
            {/* Convergent arrows to "Net effect" */}
            <line x1="150" y1="435" x2="380" y2="475" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" markerEnd="url(#arrowGrey)" />
            <line x1="570" y1="360" x2="430" y2="475" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" markerEnd="url(#arrowGrey)" />
            <line x1="675" y1="360" x2="450" y2="475" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" markerEnd="url(#arrowGrey)" />
  
            {/* Net effect box */}
            <rect x="280" y="470" width="280" height="40" rx="8" fill={active.color} opacity="0.15" stroke={active.color} strokeWidth="2" />
            <text x="420" y="488" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="700">↓ Neuronal excitability</text>
            <text x="420" y="502" textAnchor="middle" className="fill-foreground" fontSize="10">↓ Pain transmission · {active.id === "kor" ? "± dysphoria" : active.id === "nop" ? "bidirectional" : "analgesia"}</text>
  
            {/* β-arrestin pathway */}
            <line x1="405" y1="195" x2="490" y2="155" stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeDasharray="3 3" markerEnd="url(#arrowGrey)" />
            <rect x="490" y="135" width="120" height="38" rx="6" fill="hsl(var(--background))" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="3 3" />
            <text x="550" y="153" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="600">β-arrestin</text>
            <text x="550" y="166" textAnchor="middle" className="fill-muted-foreground" fontSize="9">desensitisation, internalisation</text>
          </svg>
        </div>
  
        {/* Detail panel */}
        <div className="mt-4 p-4 rounded-lg border-2" style={{ borderColor: active.color, backgroundColor: `${active.color}10` }}>
          <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
            <div>
              <h4 className="font-serif font-bold text-foreground text-base">{active.name} — {active.fullName}</h4>
              <p className="text-xs text-muted-foreground mt-0.5">Gene: <span className="font-medium text-foreground">{active.gene}</span></p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-0.5">G-protein coupling</p>
              <p className="text-muted-foreground leading-relaxed">{active.gProtein}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-0.5">Endogenous ligand</p>
              <p className="text-muted-foreground leading-relaxed">{active.endogenous}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-0.5">Clinical agonists</p>
              <p className="text-muted-foreground leading-relaxed">{active.agonists}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-0.5">Antagonists</p>
              <p className="text-muted-foreground leading-relaxed">{active.antagonists}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-0.5">Distribution</p>
              <p className="text-muted-foreground leading-relaxed">{active.location}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-0.5">Clinical effects</p>
              <p className="text-muted-foreground leading-relaxed">{active.effects}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-0.5">Adverse effects</p>
              <p className="text-muted-foreground leading-relaxed">{active.adverse}</p>
            </div>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};
