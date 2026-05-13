import React from "react";

const VomitingControlDiagram = () => {
  return (
            <div className="my-6">
      <h3 className="text-lg font-serif font-bold text-foreground mb-3">Control of Vomiting & Antiemetic Sites of Action</h3>
      <div className="rounded-xl border border-border bg-card p-4 overflow-x-auto">
        <svg viewBox="0 0 760 620" className="w-full h-auto min-w-[620px]" style={{ maxHeight: 620 }}>
          <defs>
            <marker id="vom-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1" />
            </marker>
            <marker id="vom-arrow-muted" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
            </marker>
            <marker id="vom-arrow-drug" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
              <path d="M0,0 L7,2.5 L0,5" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" />
            </marker>
          </defs>

          {/* === VOMITING CENTRE (NTS) — Central hub === */}
          <rect x="270" y="250" width="210" height="75" rx="10" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" strokeWidth="2" />
          <text x="375" y="275" textAnchor="middle" className="fill-foreground" fontWeight="700" fontSize="13">Vomiting Centre</text>
          <text x="375" y="292" textAnchor="middle" className="fill-muted-foreground" fontSize="10">(Nucleus Tractus Solitarius)</text>
          <text x="375" y="308" textAnchor="middle" className="fill-muted-foreground" fontSize="9" fontStyle="italic">Medulla oblongata</text>

          {/* === HIGHER CENTRES (Cortex) — Top left === */}
          <rect x="30" y="20" width="180" height="80" rx="8" fill="hsl(var(--accent) / 0.3)" stroke="hsl(var(--accent-foreground) / 0.3)" strokeWidth="1.5" />
          <text x="120" y="42" textAnchor="middle" className="fill-foreground" fontWeight="600" fontSize="12">Higher Centres</text>
          <text x="120" y="57" textAnchor="middle" className="fill-muted-foreground" fontSize="9">(Cortex, limbic system)</text>
          <text x="120" y="75" textAnchor="middle" className="fill-muted-foreground" fontSize="9">Anticipatory N&V, anxiety</text>
          <text x="120" y="90" textAnchor="middle" className="fill-muted-foreground" fontSize="9">↑ICP, pain, sight/smell</text>

          {/* Drug annotation — Cortex: benzodiazepines, dexamethasone */}
          <rect x="6" y="108" width="145" height="32" rx="5" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary) / 0.5)" strokeWidth="1" />
          <text x="14" y="121" fontSize="8" fontWeight="600" className="fill-primary">Benzodiazepines</text>
          <text x="14" y="133" fontSize="8" className="fill-primary">Dexamethasone, nabilone</text>
          <line x1="78" y1="108" x2="100" y2="100" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="3,2" markerEnd="url(#vom-arrow-drug)" />

          {/* === VESTIBULAR SYSTEM — Top right === */}
          <rect x="540" y="20" width="180" height="80" rx="8" fill="hsl(var(--secondary) / 0.5)" stroke="hsl(var(--secondary-foreground) / 0.2)" strokeWidth="1.5" />
          <text x="630" y="42" textAnchor="middle" className="fill-foreground" fontWeight="600" fontSize="12">Vestibular System</text>
          <text x="630" y="57" textAnchor="middle" className="fill-muted-foreground" fontSize="9">(Labyrinth, CN VIII)</text>
          <text x="630" y="75" textAnchor="middle" className="fill-muted-foreground" fontSize="9">Motion sickness, opioids</text>
          {/* Receptor badges */}
          <rect x="565" y="83" width="30" height="14" rx="3" fill="hsl(var(--destructive) / 0.15)" stroke="hsl(var(--destructive) / 0.4)" strokeWidth="0.75" />
          <text x="580" y="93" textAnchor="middle" fontSize="8" fontWeight="600" className="fill-destructive">H₁</text>
          <rect x="602" y="83" width="30" height="14" rx="3" fill="hsl(var(--destructive) / 0.15)" stroke="hsl(var(--destructive) / 0.4)" strokeWidth="0.75" />
          <text x="617" y="93" textAnchor="middle" fontSize="8" fontWeight="600" className="fill-destructive">M₁</text>

          {/* Drug annotation — Vestibular: cyclizine, hyoscine */}
          <rect x="580" y="108" width="140" height="32" rx="5" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary) / 0.5)" strokeWidth="1" />
          <text x="588" y="121" fontSize="8" fontWeight="600" className="fill-primary">Cyclizine (H₁)</text>
          <text x="588" y="133" fontSize="8" className="fill-primary">Hyoscine (M₁)</text>
          <line x1="650" y1="108" x2="630" y2="100" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="3,2" markerEnd="url(#vom-arrow-drug)" />

          {/* === CTZ (Area Postrema) — Middle left === */}
          <rect x="30" y="170" width="190" height="105" rx="8" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary) / 0.4)" strokeWidth="1.5" />
          <text x="125" y="192" textAnchor="middle" className="fill-foreground" fontWeight="600" fontSize="12">Chemoreceptor</text>
          <text x="125" y="206" textAnchor="middle" className="fill-foreground" fontWeight="600" fontSize="12">Trigger Zone (CTZ)</text>
          <text x="125" y="221" textAnchor="middle" className="fill-muted-foreground" fontSize="9">(Area postrema — outside BBB)</text>
          <text x="125" y="236" textAnchor="middle" className="fill-muted-foreground" fontSize="9">Detects circulating emetogens</text>
          {/* Receptor badges */}
          <rect x="42" y="248" width="30" height="14" rx="3" fill="hsl(var(--destructive) / 0.15)" stroke="hsl(var(--destructive) / 0.4)" strokeWidth="0.75" />
          <text x="57" y="258" textAnchor="middle" fontSize="8" fontWeight="600" className="fill-destructive">D₂</text>
          <rect x="78" y="248" width="36" height="14" rx="3" fill="hsl(var(--destructive) / 0.15)" stroke="hsl(var(--destructive) / 0.4)" strokeWidth="0.75" />
          <text x="96" y="258" textAnchor="middle" fontSize="8" fontWeight="600" className="fill-destructive">5-HT₃</text>
          <rect x="120" y="248" width="32" height="14" rx="3" fill="hsl(var(--destructive) / 0.15)" stroke="hsl(var(--destructive) / 0.4)" strokeWidth="0.75" />
          <text x="136" y="258" textAnchor="middle" fontSize="8" fontWeight="600" className="fill-destructive">NK₁</text>
          <rect x="158" y="248" width="38" height="14" rx="3" fill="hsl(var(--destructive) / 0.15)" stroke="hsl(var(--destructive) / 0.4)" strokeWidth="0.75" />
          <text x="177" y="258" textAnchor="middle" fontSize="8" fontWeight="600" className="fill-destructive">μ-opioid</text>

          {/* Drug annotation — CTZ */}
          <rect x="6" y="290" width="200" height="60" rx="5" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary) / 0.5)" strokeWidth="1" />
          <text x="14" y="304" fontSize="8" fontWeight="600" className="fill-primary">Ondansetron, granisetron (5-HT₃)</text>
          <text x="14" y="316" fontSize="8" className="fill-primary">Metoclopramide, droperidol (D₂)</text>
          <text x="14" y="328" fontSize="8" className="fill-primary">Aprepitant, fosaprepitant (NK₁)</text>
          <text x="14" y="340" fontSize="8" className="fill-primary">Prochlorperazine (D₂)</text>
          <line x1="106" y1="290" x2="125" y2="275" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="3,2" markerEnd="url(#vom-arrow-drug)" />

          {/* === GI Tract — Bottom centre === */}
          <rect x="240" y="430" width="270" height="105" rx="8" fill="hsl(var(--accent) / 0.2)" stroke="hsl(var(--accent-foreground) / 0.2)" strokeWidth="1.5" />
          <text x="375" y="452" textAnchor="middle" className="fill-foreground" fontWeight="600" fontSize="12">GI Tract</text>
          <text x="375" y="467" textAnchor="middle" className="fill-muted-foreground" fontSize="9">(Vagal & splanchnic afferents)</text>
          <text x="375" y="485" textAnchor="middle" className="fill-muted-foreground" fontSize="9">Enterochromaffin cells → 5-HT release</text>
          <text x="375" y="500" textAnchor="middle" className="fill-muted-foreground" fontSize="9">Distension, irritation, cytotoxics</text>
          {/* Receptor badges */}
          <rect x="308" y="508" width="36" height="14" rx="3" fill="hsl(var(--destructive) / 0.15)" stroke="hsl(var(--destructive) / 0.4)" strokeWidth="0.75" />
          <text x="326" y="518" textAnchor="middle" fontSize="8" fontWeight="600" className="fill-destructive">5-HT₃</text>
          <rect x="350" y="508" width="45" height="14" rx="3" fill="hsl(var(--destructive) / 0.15)" stroke="hsl(var(--destructive) / 0.4)" strokeWidth="0.75" />
          <text x="372" y="518" textAnchor="middle" fontSize="8" fontWeight="600" className="fill-destructive">Mechano</text>

          {/* Drug annotation — GI tract */}
          <rect x="530" y="450" width="210" height="48" rx="5" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary) / 0.5)" strokeWidth="1" />
          <text x="538" y="464" fontSize="8" fontWeight="600" className="fill-primary">Ondansetron (5-HT₃ on vagal aff.)</text>
          <text x="538" y="476" fontSize="8" className="fill-primary">Metoclopramide (prokinetic + D₂)</text>
          <text x="538" y="488" fontSize="8" className="fill-primary">Domperidone (D₂ — prokinetic)</text>
          <line x1="530" y1="474" x2="510" y2="474" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="3,2" markerEnd="url(#vom-arrow-drug)" />

          {/* === Efferent Output — Right === */}
          <rect x="550" y="250" width="170" height="75" rx="8" fill="hsl(var(--muted) / 0.5)" stroke="hsl(var(--muted-foreground) / 0.3)" strokeWidth="1.5" />
          <text x="635" y="272" textAnchor="middle" className="fill-foreground" fontWeight="600" fontSize="11">Efferent Output</text>
          <text x="635" y="288" textAnchor="middle" className="fill-muted-foreground" fontSize="9">Vagus → ↑ gastric motility</text>
          <text x="635" y="301" textAnchor="middle" className="fill-muted-foreground" fontSize="9">Phrenic/intercostal → retch</text>
          <text x="635" y="314" textAnchor="middle" className="fill-muted-foreground" fontSize="9">Somatic → abdominal wall</text>

          {/* === ARROWS === */}
          {/* Cortex → Vomiting Centre */}
          <line x1="185" y1="100" x2="300" y2="250" stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#vom-arrow)" />

          {/* Vestibular → Vomiting Centre */}
          <line x1="565" y1="100" x2="450" y2="250" stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#vom-arrow)" />

          {/* CTZ → Vomiting Centre */}
          <line x1="220" y1="230" x2="270" y2="270" stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#vom-arrow)" />

          {/* GI → Vomiting Centre */}
          <line x1="375" y1="430" x2="375" y2="325" stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#vom-arrow)" />
          <text x="387" y="385" className="fill-muted-foreground" fontSize="8" fontStyle="italic">Vagal afferents</text>

          {/* Vomiting Centre → Efferent */}
          <line x1="480" y1="287" x2="550" y2="287" stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#vom-arrow)" />

          {/* GI → CTZ (blood-borne) */}
          <path d="M 250,470 C 80,470 20,330 55,275" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeDasharray="4,3" markerEnd="url(#vom-arrow-muted)" />
          <text x="40" y="390" className="fill-muted-foreground" fontSize="7" fontStyle="italic" transform="rotate(-70 40 390)">Blood-borne emetogens</text>

          {/* === Dexamethasone annotation — multiple sites === */}
          <rect x="270" y="355" width="210" height="32" rx="5" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary) / 0.5)" strokeWidth="1" />
          <text x="278" y="368" fontSize="8" fontWeight="600" className="fill-primary">Dexamethasone — multiple sites</text>
          <text x="278" y="380" fontSize="8" className="fill-primary">CTZ, NTS, GI (mechanism unclear)</text>
          <line x1="375" y1="355" x2="375" y2="325" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="3,2" />

          {/* Legend */}
          <rect x="20" y="560" width="720" height="45" rx="6" fill="hsl(var(--muted) / 0.3)" stroke="hsl(var(--border))" strokeWidth="1" />
          <rect x="35" y="571" width="10" height="10" rx="2" fill="hsl(var(--destructive) / 0.15)" stroke="hsl(var(--destructive) / 0.4)" strokeWidth="0.75" />
          <text x="50" y="580" className="fill-muted-foreground" fontSize="8">Receptor subtype</text>
          <rect x="150" y="571" width="10" height="10" rx="2" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary) / 0.5)" strokeWidth="1" />
          <text x="165" y="580" className="fill-muted-foreground" fontSize="8">Antiemetic drug (site of action)</text>
          <line x1="320" y1="576" x2="345" y2="576" stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#vom-arrow)" />
          <text x="350" y="580" className="fill-muted-foreground" fontSize="8">Afferent pathway</text>
          <line x1="470" y1="576" x2="495" y2="576" stroke="hsl(var(--primary))" strokeWidth="1" strokeDasharray="3,2" markerEnd="url(#vom-arrow-drug)" />
          <text x="500" y="580" className="fill-muted-foreground" fontSize="8">Drug action</text>
          <text x="35" y="596" className="fill-muted-foreground" fontSize="7" fontStyle="italic">Multi-modal antiemesis recommended: combine agents acting at different receptor sites (e.g. ondansetron + dexamethasone + cyclizine)</text>
        </svg>
      </div>
    </div>
  );
};

export default VomitingControlDiagram;
