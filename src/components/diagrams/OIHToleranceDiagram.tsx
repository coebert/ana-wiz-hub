import { useState } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

type StageId = "acute" | "tolerance" | "oih" | "biased";

interface Stage {
  id: StageId;
  label: string;
  shortLabel: string;
  subtitle: string;
  color: string;
  summary: string;
  mechanisms: { title: string; detail: string }[];
  clinical: string;
  evidence: string;
}

const stages: Stage[] = [
  {
    id: "acute",
    label: "Acute opioid exposure",
    shortLabel: "Acute",
    subtitle: "Normal G-protein signalling — analgesia",
    color: "hsl(140 55% 45%)",
    summary:
      "Opioid binds μ-receptor → Gαi/o dissociates → ↓ adenylate cyclase, ↓ cAMP → opens GIRK K⁺ channels and closes VG-Ca²⁺ channels → neuronal hyperpolarisation and ↓ neurotransmitter release → analgesia.",
    mechanisms: [
      { title: "G-protein pathway dominant", detail: "Gαi/o-mediated inhibition of cAMP and modulation of K⁺/Ca²⁺ channels produces the analgesic signal." },
      { title: "Minimal β-arrestin recruitment", detail: "Receptor remains on the membrane; phosphorylation by GRK2/3 is limited at therapeutic doses." },
      { title: "NMDA receptors quiescent", detail: "Mg²⁺ plug intact; no central sensitisation." },
    ],
    clinical: "Predictable analgesia, dose-response relationship intact. Side effects (sedation, miosis, respiratory depression) reflect on-target G-protein effects.",
    evidence: "Forms the basis of perioperative opioid use. Effect lost over hours-to-days with continued exposure.",
  },
  {
    id: "tolerance",
    label: "Tolerance",
    shortLabel: "Tolerance",
    subtitle: "Receptor desensitisation & internalisation",
    color: "hsl(45 85% 50%)",
    summary:
      "Repeated agonist exposure recruits GRK2/3 → phosphorylates the activated receptor → β-arrestin-2 binds → uncouples the receptor from G-protein and triggers clathrin-mediated internalisation. Net result: fewer functional receptors and reduced signal per dose.",
    mechanisms: [
      { title: "GRK phosphorylation", detail: "G-protein receptor kinases phosphorylate the C-terminus of the activated MOR." },
      { title: "β-arrestin-2 recruitment", detail: "Sterically blocks further G-protein coupling and scaffolds the receptor for endocytosis." },
      { title: "Receptor internalisation & recycling", detail: "Some receptors recycle back (resensitisation); others are degraded — net downregulation." },
      { title: "Adenylate cyclase superactivation", detail: "Chronic Gαi/o inhibition paradoxically upregulates AC isoforms — withdrawal hyperexcitability." },
    ],
    clinical: "Need for escalating doses to maintain analgesia. Cross-tolerance between μ-agonists. Opioid rotation exploits incomplete cross-tolerance (use 25–50% dose reduction).",
    evidence: "Demonstrated in β-arrestin-2 knockout mice — markedly reduced tolerance to morphine analgesia (Bohn et al., Science 1999).",
  },
  {
    id: "oih",
    label: "Opioid-induced hyperalgesia (OIH)",
    shortLabel: "OIH",
    subtitle: "Pro-nociceptive sensitisation",
    color: "hsl(0 70% 55%)",
    summary:
      "Distinct from tolerance: a paradoxical increase in pain sensitivity with opioid exposure. Mechanistically driven by glutamatergic activation of NMDA receptors, descending facilitation from the RVM, dynorphin upregulation, and microglial activation.",
    mechanisms: [
      { title: "NMDA receptor upregulation", detail: "Opioids ↑ presynaptic glutamate release and ↑ NMDA receptor trafficking and phosphorylation (via PKC) → central sensitisation and 'wind-up'." },
      { title: "Spinal dynorphin ↑", detail: "Dynorphin acts at NMDA receptors (non-opioid effect) and bradykinin pathways → pro-nociceptive." },
      { title: "Descending facilitation", detail: "Cells in the rostral ventromedial medulla (RVM) shift from inhibitory to facilitatory output, driven by cholecystokinin (CCK)." },
      { title: "Microglial / TLR4 activation", detail: "Opioids activate spinal microglia (independent of MOR via TLR4) → release IL-1β, TNF-α, BDNF → neuronal sensitisation." },
    ],
    clinical: "Suspect when pain worsens despite escalating opioid doses, diffuse allodynia/hyperalgesia outside surgical site, or after high-dose intraoperative remifentanil. Treat by ↓ opioid, rotate to methadone/buprenorphine, add ketamine, magnesium, α₂-agonists, or regional anaesthesia.",
    evidence: "Most consistently demonstrated with high-dose remifentanil intraoperative infusions (Fletcher & Martinez, BJA 2014 meta-analysis: ↑ postop pain and ↑ morphine consumption at 24h).",
  },
  {
    id: "biased",
    label: "Biased agonism (oliceridine)",
    shortLabel: "Biased agonism",
    subtitle: "G-protein favoured over β-arrestin",
    color: "hsl(210 70% 55%)",
    summary:
      "Functional selectivity: a ligand stabilises a receptor conformation that preferentially couples to one downstream effector. Oliceridine (TRV130) preferentially activates the Gαi/o pathway with limited β-arrestin-2 recruitment — theoretically uncoupling analgesia from respiratory depression, GI effects, and tolerance.",
    mechanisms: [
      { title: "G-protein–biased ligand", detail: "Stabilises receptor conformation favouring Gαi/o over β-arrestin-2 coupling." },
      { title: "Preserved analgesia", detail: "Analgesia is largely Gαi/o mediated → maintained at full efficacy." },
      { title: "Reduced β-arrestin effects", detail: "Hypothesised to ↓ respiratory depression, constipation, tolerance and OIH (β-arrestin-2 KO mice show less of all of these)." },
      { title: "Caveats", detail: "Recent data (Kliewer et al., Br J Pharmacol 2020) challenge the strict β-arrestin hypothesis — efficacy/intrinsic activity may explain much of the safety profile." },
    ],
    clinical: "Oliceridine (Olinvyk®) FDA-approved 2020 for moderate-to-severe acute pain in adults requiring IV opioid in monitored settings. Dosed in µg, onset 1–2 min, duration ~3h. Trials (APOLLO-1/2) showed comparable analgesia to morphine with modest reduction in respiratory and GI adverse effects.",
    evidence: "APOLLO-1, APOLLO-2, ATHENA studies. Real-world evidence still emerging; not yet widely adopted in the UK/Europe.",
  },
];

export const OIHToleranceDiagram = () => {
  const [selected, setSelected] = useState<StageId>("acute");
  const active = stages.find((s) => s.id === selected) ?? stages[0];

  // visual state flags driving SVG
  const showArrestin = active.id === "tolerance" || active.id === "oih";
  const internalised = active.id === "tolerance" || active.id === "oih";
  const nmdaActive = active.id === "oih";
  const microglia = active.id === "oih";
  const biased = active.id === "biased";

  return (
    <DiagramFigure
      id="oih-tolerance-diagram"
      title="OIH tolerance"
      description="Auto-generated wrapper for the OIH tolerance anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="w-full bg-card border border-border rounded-lg p-4 sm:p-6 my-6">
        <h3 className="text-lg font-serif font-bold text-foreground mb-1">
          Opioid Tolerance, OIH & Biased Agonism
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Click a stage to see how μ-receptor signalling shifts from pure analgesia to tolerance, OIH, and how G-protein–biased ligands attempt to escape this.
        </p>
  
        {/* Stage selector */}
        <div className="flex flex-wrap gap-2 mb-4">
          {stages.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelected(s.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                selected === s.id
                  ? "border-foreground text-background shadow-sm"
                  : "border-border text-foreground hover:border-foreground/50"
              }`}
              style={{ backgroundColor: selected === s.id ? s.color : "transparent" }}
            >
              {s.shortLabel}
            </button>
          ))}
        </div>
  
        {/* SVG diagram */}
        <div className="w-full overflow-x-auto">
          <svg viewBox="0 0 800 540" className="w-full h-auto" style={{ minWidth: 640 }}>
            <defs>
              <marker id="arrowOIH" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill={active.color} />
              </marker>
              <marker id="arrowGreyOIH" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--muted-foreground))" />
              </marker>
              <marker id="arrowRed" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(0 70% 55%)" />
              </marker>
            </defs>
  
            {/* Labels */}
            <text x="10" y="20" className="fill-muted-foreground" fontSize="11" fontWeight="600">EXTRACELLULAR</text>
            <text x="10" y="195" className="fill-muted-foreground" fontSize="11" fontWeight="600">INTRACELLULAR</text>
  
            {/* Opioid ligand */}
            <circle cx="220" cy="60" r="12" fill={biased ? "hsl(210 70% 55%)" : active.color} stroke="hsl(var(--foreground))" strokeWidth="1.5" />
            <text x="220" y="64" textAnchor="middle" className="fill-background" fontSize="10" fontWeight="700">μ</text>
            <text x="220" y="40" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="600">
              {biased ? "Oliceridine" : "Morphine / fentanyl"}
            </text>
            <line x1="220" y1="74" x2="220" y2="105" stroke={active.color} strokeWidth="2" markerEnd="url(#arrowOIH)" />
  
            {/* Membrane */}
            <rect x="40" y="115" width="720" height="40" fill="hsl(var(--muted))" opacity="0.4" />
            <text x="48" y="138" className="fill-muted-foreground" fontSize="10" fontStyle="italic">lipid bilayer</text>
  
            {/* MOR — surface or internalised */}
            {!internalised && (
              <g>
                {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                  <rect key={i} x={185 + i * 11} y="113" width="8" height="44" fill={active.color} opacity="0.85" stroke="hsl(var(--foreground))" strokeWidth="1" rx="2" />
                ))}
                <text x="220" y="178" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="700">MOR (surface)</text>
              </g>
            )}
            {internalised && (
              <g>
                {/* faded surface receptor */}
                {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                  <rect key={i} x={185 + i * 11} y="113" width="8" height="44" fill={active.color} opacity="0.25" stroke="hsl(var(--foreground))" strokeWidth="1" rx="2" />
                ))}
                {/* internalised vesicle */}
                <circle cx="320" cy="245" r="32" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.5" strokeDasharray="3 3" />
                {[0, 1, 2, 3, 4].map((i) => (
                  <rect key={i} x={302 + i * 7} y="232" width="5" height="26" fill={active.color} opacity="0.85" stroke="hsl(var(--foreground))" strokeWidth="0.75" rx="1" />
                ))}
                <text x="320" y="290" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="600">Internalised MOR</text>
                <text x="320" y="302" textAnchor="middle" className="fill-muted-foreground" fontSize="9">(endosome)</text>
              </g>
            )}
  
            {/* G-protein */}
            <ellipse cx="195" cy="200" rx="22" ry="14" fill="hsl(var(--background))" stroke={active.color} strokeWidth={biased ? 3 : 2} opacity={internalised ? 0.5 : 1} />
            <text x="195" y="204" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="600">Gαi/o</text>
            <ellipse cx="240" cy="200" rx="14" ry="10" fill="hsl(var(--background))" stroke="hsl(var(--foreground))" strokeWidth="1" opacity={internalised ? 0.5 : 1} />
            <text x="240" y="203" textAnchor="middle" className="fill-foreground" fontSize="9">βγ</text>
  
            {/* G-protein arrow → analgesia */}
            <line x1="175" y1="210" x2="100" y2="280" stroke={active.color} strokeWidth={biased ? 3 : 2} markerEnd="url(#arrowOIH)" opacity={internalised && !biased ? 0.4 : 1} />
            <rect x="30" y="285" width="140" height="50" rx="6" fill={active.color} opacity={biased ? 0.25 : (internalised ? 0.1 : 0.15)} stroke={active.color} strokeWidth="1.5" />
            <text x="100" y="305" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="700">Analgesia</text>
            <text x="100" y="320" textAnchor="middle" className="fill-muted-foreground" fontSize="9">↓ cAMP, GIRK ↑, Ca²⁺ ↓</text>
  
            {/* β-arrestin */}
            {showArrestin && (
              <g>
                <ellipse cx="380" cy="195" rx="32" ry="16" fill="hsl(45 85% 50%)" opacity="0.25" stroke="hsl(45 85% 50%)" strokeWidth="2" />
                <text x="380" y="199" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="700">β-arrestin-2</text>
                <line x1="260" y1="170" x2="350" y2="190" stroke="hsl(45 85% 50%)" strokeWidth="2" markerEnd="url(#arrowOIH)" />
                <text x="295" y="170" className="fill-muted-foreground" fontSize="9">GRK2/3 → P</text>
                <line x1="380" y1="215" x2="380" y2="285" stroke="hsl(45 85% 50%)" strokeWidth="2" markerEnd="url(#arrowOIH)" />
                <rect x="305" y="290" width="150" height="50" rx="6" fill="hsl(45 85% 50%)" opacity="0.15" stroke="hsl(45 85% 50%)" strokeWidth="1.5" />
                <text x="380" y="310" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="700">Desensitisation</text>
                <text x="380" y="325" textAnchor="middle" className="fill-muted-foreground" fontSize="9">internalisation, ↓ analgesia, side-effects</text>
              </g>
            )}
  
            {/* Biased agonism — strikethrough β-arrestin path */}
            {biased && (
              <g>
                <ellipse cx="380" cy="195" rx="32" ry="16" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                <text x="380" y="199" textAnchor="middle" className="fill-muted-foreground" fontSize="10" fontWeight="600">β-arrestin-2</text>
                <line x1="260" y1="170" x2="350" y2="190" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
                {/* big red X over arrestin path */}
                <line x1="345" y1="180" x2="415" y2="210" stroke="hsl(0 70% 55%)" strokeWidth="3" />
                <line x1="415" y1="180" x2="345" y2="210" stroke="hsl(0 70% 55%)" strokeWidth="3" />
                <text x="475" y="200" className="fill-foreground" fontSize="10" fontWeight="600">↓ recruitment</text>
                <text x="475" y="213" className="fill-muted-foreground" fontSize="9">→ ↓ resp depression, ↓ tolerance</text>
              </g>
            )}
  
            {/* NMDA receptor (presynaptic glutamate releasing onto postsyn) */}
            <g opacity={nmdaActive ? 1 : 0.3}>
              <rect x="560" y="113" width="80" height="44" fill={nmdaActive ? "hsl(0 70% 55%)" : "hsl(var(--muted-foreground))"} opacity={nmdaActive ? 0.85 : 0.4} stroke="hsl(var(--foreground))" strokeWidth="1" rx="3" />
              <text x="600" y="135" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="700">NMDA-R</text>
              <text x="600" y="150" textAnchor="middle" className="fill-foreground" fontSize="9">{nmdaActive ? "↑ trafficking, PKC-P" : "quiescent"}</text>
              {/* Glutamate */}
              <circle cx="600" cy="85" r="6" fill="hsl(280 65% 55%)" opacity={nmdaActive ? 0.95 : 0.4} />
              <text x="600" y="75" textAnchor="middle" className="fill-muted-foreground" fontSize="9">Glu</text>
              <line x1="600" y1="93" x2="600" y2="110" stroke={nmdaActive ? "hsl(0 70% 55%)" : "hsl(var(--muted-foreground))"} strokeWidth="1.5" markerEnd={nmdaActive ? "url(#arrowRed)" : "url(#arrowGreyOIH)"} />
              {/* Ca2+ influx */}
              <line x1="600" y1="160" x2="600" y2="220" stroke={nmdaActive ? "hsl(0 70% 55%)" : "hsl(var(--muted-foreground))"} strokeWidth={nmdaActive ? 2.5 : 1.5} markerEnd={nmdaActive ? "url(#arrowRed)" : "url(#arrowGreyOIH)"} />
              <text x="615" y="190" className="fill-muted-foreground" fontSize="9">Ca²⁺</text>
              <rect x="540" y="225" width="120" height="55" rx="6" fill={nmdaActive ? "hsl(0 70% 55%)" : "hsl(var(--muted))"} opacity={nmdaActive ? 0.2 : 0.3} stroke={nmdaActive ? "hsl(0 70% 55%)" : "hsl(var(--border))"} strokeWidth="1.5" />
              <text x="600" y="245" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="700">Central sensitisation</text>
              <text x="600" y="260" textAnchor="middle" className="fill-muted-foreground" fontSize="9">'wind-up', allodynia,</text>
              <text x="600" y="272" textAnchor="middle" className="fill-muted-foreground" fontSize="9">hyperalgesia</text>
            </g>
  
            {/* Microglia (only OIH) */}
            {microglia && (
              <g>
                <ellipse cx="700" cy="370" rx="40" ry="22" fill="hsl(0 70% 55%)" opacity="0.25" stroke="hsl(0 70% 55%)" strokeWidth="1.5" />
                <text x="700" y="368" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="700">Microglia</text>
                <text x="700" y="382" textAnchor="middle" className="fill-muted-foreground" fontSize="9">TLR4 → IL-1β, TNF-α</text>
                <line x1="660" y1="370" x2="610" y2="295" stroke="hsl(0 70% 55%)" strokeWidth="1.5" markerEnd="url(#arrowRed)" />
              </g>
            )}
  
            {/* Descending facilitation (only OIH) */}
            {microglia && (
              <g>
                <rect x="30" y="370" width="170" height="50" rx="6" fill="hsl(0 70% 55%)" opacity="0.15" stroke="hsl(0 70% 55%)" strokeWidth="1.5" />
                <text x="115" y="390" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="700">Descending facilitation</text>
                <text x="115" y="405" textAnchor="middle" className="fill-muted-foreground" fontSize="9">RVM, CCK ↑, dynorphin ↑</text>
                <line x1="200" y1="395" x2="540" y2="265" stroke="hsl(0 70% 55%)" strokeWidth="1.5" strokeDasharray="3 3" markerEnd="url(#arrowRed)" />
              </g>
            )}
  
            {/* Net clinical effect bar */}
            <rect x="120" y="465" width="560" height="50" rx="8" fill={active.color} opacity="0.15" stroke={active.color} strokeWidth="2" />
            <text x="400" y="486" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="700">{active.label}</text>
            <text x="400" y="503" textAnchor="middle" className="fill-foreground" fontSize="10">{active.subtitle}</text>
          </svg>
        </div>
  
        {/* Detail panel */}
        <div className="mt-4 p-4 rounded-lg border-2" style={{ borderColor: active.color, backgroundColor: `${active.color}10` }}>
          <h4 className="font-serif font-bold text-foreground text-base mb-1">{active.label}</h4>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">{active.summary}</p>
  
          <div className="grid sm:grid-cols-2 gap-3 mb-3">
            {active.mechanisms.map((m) => (
              <div key={m.title} className="p-3 rounded-md border border-border bg-background">
                <p className="text-xs font-semibold text-foreground mb-0.5">{m.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{m.detail}</p>
              </div>
            ))}
          </div>
  
          <div className="space-y-2 text-sm">
            <div>
              <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-0.5">Clinical implications</p>
              <p className="text-muted-foreground leading-relaxed">{active.clinical}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground uppercase tracking-wide mb-0.5">Evidence</p>
              <p className="text-muted-foreground leading-relaxed">{active.evidence}</p>
            </div>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};
