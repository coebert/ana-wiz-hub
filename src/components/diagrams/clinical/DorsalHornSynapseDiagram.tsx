import { useState } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

interface Agent {
  id: string;
  name: string;
  target: string;
  location: "presynaptic" | "postsynaptic" | "descending" | "glia" | "channel";
  mechanism: string;
  effect: string;
  evidence: string;
  color: string;
}

const agents: Agent[] = [
  {
    id: "opioids",
    name: "Opioids",
    target: "μ-opioid receptors (MOR)",
    location: "presynaptic",
    mechanism: "Gi-coupled receptors on presynaptic C-fibre terminals → ↓ cAMP, close voltage-gated Ca²⁺ channels, open K⁺ channels → hyperpolarisation. Also postsynaptic MOR on projection neurons.",
    effect: "↓ Glutamate & substance P release from primary afferents; postsynaptic hyperpolarisation",
    evidence: "Gold standard analgesia. Tolerance, hyperalgesia, respiratory depression, constipation limit use.",
    color: "hsl(0 70% 55%)",
  },
  {
    id: "ketamine",
    name: "Ketamine",
    target: "NMDA receptor (channel pore)",
    location: "postsynaptic",
    mechanism: "Non-competitive NMDA receptor antagonist — blocks open channel. Prevents Ca²⁺ influx into postsynaptic neuron, blocking 'wind-up' and central sensitisation.",
    effect: "Prevents central sensitisation, reduces opioid tolerance, anti-hyperalgesic",
    evidence: "0.1–0.5 mg/kg/hr opioid-sparing infusion. Strong evidence in opioid-tolerant and chronic pain patients.",
    color: "hsl(280 65% 55%)",
  },
  {
    id: "magnesium",
    name: "IV Magnesium",
    target: "NMDA receptor (Mg²⁺ plug) + Ca²⁺ channels",
    location: "postsynaptic",
    mechanism: "Physiological voltage-dependent NMDA channel block (Mg²⁺ plug). Also blocks presynaptic L- and N-type voltage-gated Ca²⁺ channels → ↓ neurotransmitter release.",
    effect: "Dual presynaptic and postsynaptic action — reduces glutamate release AND blocks NMDA receptor",
    evidence: "Cochrane 2013 (Albrecht): ~25% opioid reduction at 24h. Bolus 30–50 mg/kg, infusion 6–15 mg/kg/hr.",
    color: "hsl(180 60% 45%)",
  },
  {
    id: "lidocaine",
    name: "IV Lidocaine",
    target: "Voltage-gated Na⁺ channels + glycine receptors",
    location: "channel",
    mechanism: "Blocks Na⁺ channels on peripheral and central neurons → ↓ ectopic firing. Potentiates inhibitory glycine receptors. Anti-inflammatory (↓ IL-6, TNF-α). Weak NMDA antagonism.",
    effect: "Reduces nociceptive transmission, anti-inflammatory, prokinetic (anti-ileus)",
    evidence: "Weibel 2018 Cochrane: benefit in open abdominal surgery. LOLIPOP 2024: no benefit in laparoscopic surgery.",
    color: "hsl(45 85% 50%)",
  },
  {
    id: "gabapentinoids",
    name: "Gabapentinoids",
    target: "α₂δ-1 subunit of Ca²⁺ channels",
    location: "presynaptic",
    mechanism: "Bind α₂δ-1 subunit of presynaptic voltage-gated Ca²⁺ channels → ↓ trafficking to membrane → ↓ Ca²⁺ influx → ↓ release of glutamate, substance P, CGRP from C-fibre terminals.",
    effect: "Reduces excitatory neurotransmitter release; particularly effective in neuropathic pain",
    evidence: "First-line for neuropathic pain (NICE CG173). Pregabalin 75–300 mg BD, gabapentin 300–1200 mg TDS.",
    color: "hsl(210 70% 55%)",
  },
  {
    id: "alpha2",
    name: "α₂-Agonists (Clonidine/Dex)",
    target: "α₂-adrenoceptors",
    location: "descending",
    mechanism: "Activate α₂ receptors at three sites: (1) presynaptic on C-fibres → ↓ glutamate release; (2) postsynaptic on projection neurons → hyperpolarisation; (3) facilitate descending noradrenergic inhibition from locus coeruleus.",
    effect: "Tri-site analgesia, anxiolysis, opioid-sparing, no respiratory depression",
    evidence: "Dexmedetomidine: cooperative sedation. Useful intraoperatively and in ICU.",
    color: "hsl(140 55% 45%)",
  },
  {
    id: "tca",
    name: "TCAs / SNRIs",
    target: "Serotonin & noradrenaline reuptake",
    location: "descending",
    mechanism: "Inhibit reuptake of 5-HT and noradrenaline at descending inhibitory synapses (PAG → RVM → dorsal horn). Enhances endogenous descending pain modulation.",
    effect: "Augments descending inhibition; particularly effective in neuropathic pain",
    evidence: "First-line neuropathic pain. Amitriptyline 10–75 mg ON, duloxetine 60 mg OD.",
    color: "hsl(320 60% 55%)",
  },
  {
    id: "nsaids",
    name: "NSAIDs / Paracetamol",
    target: "COX enzymes (peripheral + central)",
    location: "glia",
    mechanism: "NSAIDs: COX-1/2 inhibition → ↓ prostaglandin E₂ at peripheral nociceptors and dorsal horn (central sensitisation). Paracetamol: central COX inhibition + serotonergic modulation.",
    effect: "Reduces peripheral and central sensitisation via prostaglandin inhibition",
    evidence: "Backbone of multimodal analgesia. Synergistic with opioids — reduces consumption by 20–30%.",
    color: "hsl(20 75% 55%)",
  },
];

export const DorsalHornSynapseDiagram = () => {
  const [selected, setSelected] = useState<string>("opioids");
  const active = agents.find((a) => a.id === selected) ?? agents[0];

  return (
    <DiagramFigure
      id="dorsal-horn-synapse-diagram"
      title="Dorsal horn synapse"
      description="Auto-generated wrapper for the Dorsal horn synapse anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
                  <div className="w-full bg-card border border-border rounded-lg p-4 sm:p-6 my-6">
        <h3 className="text-lg font-serif font-bold text-foreground mb-1">Multimodal Analgesia at the Dorsal Horn Synapse</h3>
        <p className="text-sm text-muted-foreground mb-4">Click any agent to highlight its site of action on the C-fibre → projection neuron synapse.</p>
  
        {/* Agent selector chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {agents.map((a) => (
            <button
              key={a.id}
              onClick={() => setSelected(a.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                selected === a.id
                  ? "border-foreground text-background shadow-sm"
                  : "border-border text-foreground hover:border-foreground/50"
              }`}
              style={{
                backgroundColor: selected === a.id ? a.color : "transparent",
              }}
            >
              {a.name}
            </button>
          ))}
        </div>
  
        {/* SVG diagram */}
        <div className="w-full overflow-x-auto">
          <svg viewBox="0 0 800 480" className="w-full h-auto" style={{ minWidth: 600 }}>
            {/* Background regions */}
            <rect x="0" y="0" width="800" height="80" fill="hsl(var(--muted))" opacity="0.3" />
            <text x="10" y="20" className="fill-muted-foreground" fontSize="11" fontWeight="600">DESCENDING MODULATION (PAG → RVM → dorsal horn)</text>
  
            {/* Descending fibre */}
            <path d="M 400 30 Q 400 100 350 180" stroke={active.location === "descending" ? active.color : "hsl(var(--muted-foreground))"} strokeWidth={active.location === "descending" ? 4 : 2} fill="none" opacity={active.location === "descending" ? 1 : 0.4} strokeDasharray="4 3" />
            <text x="410" y="100" className="fill-muted-foreground" fontSize="10">5-HT / NA</text>
  
            {/* C-fibre (presynaptic) */}
            <path d="M 50 280 Q 200 280 320 240" stroke={active.location === "presynaptic" || active.location === "channel" ? active.color : "hsl(var(--foreground))"} strokeWidth={active.location === "presynaptic" || active.location === "channel" ? 5 : 3} fill="none" opacity={active.location === "presynaptic" || active.location === "channel" ? 1 : 0.6} />
            <circle cx="50" cy="280" r="18" fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeWidth="2" />
            <text x="50" y="284" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="600">C/Aδ</text>
            <text x="50" y="315" textAnchor="middle" className="fill-muted-foreground" fontSize="10">Nociceptor</text>
  
            {/* Presynaptic terminal (bouton) */}
            <ellipse cx="340" cy="230" rx="55" ry="40" fill="hsl(var(--background))" stroke={active.location === "presynaptic" ? active.color : "hsl(var(--foreground))"} strokeWidth={active.location === "presynaptic" ? 3 : 2} />
            <text x="340" y="200" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="600">Presynaptic</text>
            <text x="340" y="212" textAnchor="middle" className="fill-muted-foreground" fontSize="9">terminal</text>
  
            {/* Ca channels on presynaptic */}
            <rect x="320" y="260" width="10" height="14" fill={active.id === "gabapentinoids" || active.id === "magnesium" ? active.color : "hsl(var(--muted-foreground))"} stroke="hsl(var(--foreground))" strokeWidth="1" />
            <rect x="350" y="260" width="10" height="14" fill={active.id === "gabapentinoids" || active.id === "magnesium" ? active.color : "hsl(var(--muted-foreground))"} stroke="hsl(var(--foreground))" strokeWidth="1" />
            <text x="340" y="290" textAnchor="middle" className="fill-muted-foreground" fontSize="9">Ca²⁺ (α₂δ)</text>
  
            {/* MOR on presynaptic */}
            <circle cx="295" cy="245" r="6" fill={active.id === "opioids" ? active.color : "hsl(var(--muted-foreground))"} stroke="hsl(var(--foreground))" strokeWidth="1" />
            <text x="270" y="248" textAnchor="end" className="fill-muted-foreground" fontSize="9">MOR</text>
  
            {/* α2 on presynaptic */}
            <circle cx="385" cy="220" r="6" fill={active.id === "alpha2" ? active.color : "hsl(var(--muted-foreground))"} stroke="hsl(var(--foreground))" strokeWidth="1" />
            <text x="400" y="218" className="fill-muted-foreground" fontSize="9">α₂</text>
  
            {/* Na channels along axon */}
            <rect x="180" y="265" width="8" height="12" fill={active.id === "lidocaine" ? active.color : "hsl(var(--muted-foreground))"} stroke="hsl(var(--foreground))" strokeWidth="1" />
            <rect x="230" y="262" width="8" height="12" fill={active.id === "lidocaine" ? active.color : "hsl(var(--muted-foreground))"} stroke="hsl(var(--foreground))" strokeWidth="1" />
            <text x="205" y="255" textAnchor="middle" className="fill-muted-foreground" fontSize="9">Na⁺</text>
  
            {/* Synaptic cleft */}
            <line x1="340" y1="280" x2="340" y2="330" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="2 2" />
            <line x1="380" y1="280" x2="380" y2="330" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="2 2" />
            <text x="445" y="305" className="fill-muted-foreground" fontSize="9" fontStyle="italic">cleft</text>
  
            {/* Neurotransmitters */}
            <circle cx="350" cy="295" r="3" fill="hsl(280 60% 50%)" opacity={["opioids","gabapentinoids","magnesium","alpha2"].includes(active.id) ? 0.3 : 0.9} />
            <circle cx="360" cy="305" r="3" fill="hsl(280 60% 50%)" opacity={["opioids","gabapentinoids","magnesium","alpha2"].includes(active.id) ? 0.3 : 0.9} />
            <circle cx="370" cy="298" r="3" fill="hsl(280 60% 50%)" opacity={["opioids","gabapentinoids","magnesium","alpha2"].includes(active.id) ? 0.3 : 0.9} />
            <text x="395" y="295" className="fill-muted-foreground" fontSize="9">Glu / SP</text>
  
            {/* Postsynaptic neuron (projection neuron) */}
            <path d="M 340 360 Q 500 360 700 280" stroke={active.location === "postsynaptic" ? active.color : "hsl(var(--foreground))"} strokeWidth={active.location === "postsynaptic" ? 5 : 3} fill="none" opacity={active.location === "postsynaptic" ? 1 : 0.6} />
            <ellipse cx="340" cy="360" rx="60" ry="30" fill="hsl(var(--background))" stroke={active.location === "postsynaptic" ? active.color : "hsl(var(--foreground))"} strokeWidth={active.location === "postsynaptic" ? 3 : 2} />
            <text x="340" y="358" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="600">Projection</text>
            <text x="340" y="370" textAnchor="middle" className="fill-muted-foreground" fontSize="9">neuron (lamina I/V)</text>
  
            {/* NMDA receptor on postsynaptic */}
            <rect x="305" y="328" width="14" height="10" fill={active.id === "ketamine" || active.id === "magnesium" ? active.color : "hsl(var(--muted-foreground))"} stroke="hsl(var(--foreground))" strokeWidth="1" />
            <text x="312" y="322" textAnchor="middle" className="fill-muted-foreground" fontSize="9">NMDA</text>
  
            {/* AMPA */}
            <rect x="330" y="328" width="14" height="10" fill="hsl(var(--muted-foreground))" stroke="hsl(var(--foreground))" strokeWidth="1" />
            <text x="337" y="322" textAnchor="middle" className="fill-muted-foreground" fontSize="9">AMPA</text>
  
            {/* MOR postsynaptic */}
            <circle cx="362" cy="333" r="5" fill={active.id === "opioids" ? active.color : "hsl(var(--muted-foreground))"} stroke="hsl(var(--foreground))" strokeWidth="1" />
            <text x="372" y="322" textAnchor="middle" className="fill-muted-foreground" fontSize="9">MOR</text>
  
            {/* α2 postsynaptic */}
            <circle cx="385" cy="335" r="5" fill={active.id === "alpha2" ? active.color : "hsl(var(--muted-foreground))"} stroke="hsl(var(--foreground))" strokeWidth="1" />
            <text x="397" y="338" className="fill-muted-foreground" fontSize="9">α₂</text>
  
            {/* Glycine receptor (lidocaine target) */}
            <rect x="280" y="352" width="12" height="10" fill={active.id === "lidocaine" ? active.color : "hsl(var(--muted-foreground))"} stroke="hsl(var(--foreground))" strokeWidth="1" />
            <text x="270" y="362" textAnchor="end" className="fill-muted-foreground" fontSize="9">Glycine-R</text>
  
            {/* To brain arrow */}
            <text x="700" y="265" textAnchor="middle" className="fill-muted-foreground" fontSize="10" fontWeight="600">→ Thalamus</text>
            <text x="700" y="278" textAnchor="middle" className="fill-muted-foreground" fontSize="9">(spinothalamic)</text>
  
            {/* Microglia (NSAIDs target) */}
            <ellipse cx="500" cy="410" rx="35" ry="20" fill={active.location === "glia" ? active.color : "hsl(var(--muted))"} opacity={active.location === "glia" ? 0.5 : 0.3} stroke="hsl(var(--foreground))" strokeWidth="1" />
            <text x="500" y="408" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="600">Microglia</text>
            <text x="500" y="420" textAnchor="middle" className="fill-muted-foreground" fontSize="9">PGE₂ / cytokines</text>
  
            {/* COX label */}
            <text x="500" y="445" textAnchor="middle" className="fill-muted-foreground" fontSize="9">{active.id === "nsaids" ? "← COX inhibited" : "COX-1/2"}</text>
  
            {/* Region label */}
            <text x="10" y="470" className="fill-muted-foreground" fontSize="11" fontWeight="600">DORSAL HORN — Rexed laminae I, II, V</text>
          </svg>
        </div>
  
        {/* Detail panel */}
        <div className="mt-4 p-4 rounded-lg border-2" style={{ borderColor: active.color, backgroundColor: `${active.color}10` }}>
          <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
            <div>
              <h4 className="font-serif font-bold text-foreground text-base">{active.name}</h4>
              <p className="text-xs text-muted-foreground mt-0.5">Target: <span className="font-medium text-foreground">{active.target}</span></p>
            </div>
            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-border text-muted-foreground bg-background">
              {active.location}
            </span>
          </div>
          <div className="space-y-2 text-sm">
            <div>
              <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-0.5">Mechanism</p>
              <p className="text-muted-foreground leading-relaxed">{active.mechanism}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-0.5">Net effect</p>
              <p className="text-muted-foreground leading-relaxed">{active.effect}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-0.5">Clinical evidence</p>
              <p className="text-muted-foreground leading-relaxed">{active.evidence}</p>
            </div>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};
