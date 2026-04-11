import React from "react";

const VomitingControlDiagram = () => {
  return (
    <div className="my-6">
      <h3 className="text-lg font-serif font-bold text-foreground mb-3">Control of Vomiting</h3>
      <div className="rounded-xl border border-border bg-card p-4 overflow-x-auto">
        <svg viewBox="0 0 720 520" className="w-full h-auto min-w-[600px]" style={{ maxHeight: 520 }}>
          <defs>
            <marker id="vom-arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6" fill="none" stroke="hsl(var(--foreground))" strokeWidth="1.2" />
            </marker>
            <marker id="vom-arrow-muted" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
              <path d="M0,0 L8,3 L0,6" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1" />
            </marker>
          </defs>

          {/* === VOMITING CENTRE (NTS) — Central hub === */}
          <rect x="260" y="230" width="200" height="70" rx="10" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" strokeWidth="2" />
          <text x="360" y="255" textAnchor="middle" className="fill-foreground" fontWeight="700" fontSize="13">Vomiting Centre</text>
          <text x="360" y="272" textAnchor="middle" className="fill-muted-foreground" fontSize="10">(Nucleus Tractus Solitarius)</text>
          <text x="360" y="288" textAnchor="middle" className="fill-muted-foreground" fontSize="9" fontStyle="italic">Medulla oblongata</text>

          {/* === HIGHER CENTRES (Cortex) — Top left === */}
          <rect x="30" y="20" width="180" height="80" rx="8" fill="hsl(var(--accent) / 0.3)" stroke="hsl(var(--accent-foreground) / 0.3)" strokeWidth="1.5" />
          <text x="120" y="42" textAnchor="middle" className="fill-foreground" fontWeight="600" fontSize="12">Higher Centres</text>
          <text x="120" y="57" textAnchor="middle" className="fill-muted-foreground" fontSize="9">(Cortex, limbic system)</text>
          <text x="120" y="75" textAnchor="middle" className="fill-muted-foreground" fontSize="9">Anticipatory N&V, anxiety</text>
          <text x="120" y="90" textAnchor="middle" className="fill-muted-foreground" fontSize="9">↑ICP, pain, sight/smell</text>

          {/* === VESTIBULAR SYSTEM — Top right === */}
          <rect x="510" y="20" width="180" height="80" rx="8" fill="hsl(var(--secondary) / 0.5)" stroke="hsl(var(--secondary-foreground) / 0.2)" strokeWidth="1.5" />
          <text x="600" y="42" textAnchor="middle" className="fill-foreground" fontWeight="600" fontSize="12">Vestibular System</text>
          <text x="600" y="57" textAnchor="middle" className="fill-muted-foreground" fontSize="9">(Labyrinth, CN VIII)</text>
          <text x="600" y="75" textAnchor="middle" className="fill-muted-foreground" fontSize="9">Motion sickness, opioids</text>
          {/* Receptor badges */}
          <rect x="535" y="83" width="30" height="14" rx="3" fill="hsl(var(--destructive) / 0.15)" stroke="hsl(var(--destructive) / 0.4)" strokeWidth="0.8" />
          <text x="550" y="93" textAnchor="middle" fontSize="8" fontWeight="600" className="fill-destructive">H₁</text>
          <rect x="572" y="83" width="30" height="14" rx="3" fill="hsl(var(--destructive) / 0.15)" stroke="hsl(var(--destructive) / 0.4)" strokeWidth="0.8" />
          <text x="587" y="93" textAnchor="middle" fontSize="8" fontWeight="600" className="fill-destructive">M₁</text>

          {/* === CTZ (Area Postrema) — Middle left === */}
          <rect x="30" y="150" width="180" height="100" rx="8" fill="hsl(var(--primary) / 0.08)" stroke="hsl(var(--primary) / 0.4)" strokeWidth="1.5" />
          <text x="120" y="172" textAnchor="middle" className="fill-foreground" fontWeight="600" fontSize="12">Chemoreceptor</text>
          <text x="120" y="186" textAnchor="middle" className="fill-foreground" fontWeight="600" fontSize="12">Trigger Zone (CTZ)</text>
          <text x="120" y="201" textAnchor="middle" className="fill-muted-foreground" fontSize="9">(Area postrema — outside BBB)</text>
          <text x="120" y="216" textAnchor="middle" className="fill-muted-foreground" fontSize="9">Detects circulating emetogens</text>
          {/* Receptor badges */}
          <rect x="42" y="228" width="30" height="14" rx="3" fill="hsl(var(--destructive) / 0.15)" stroke="hsl(var(--destructive) / 0.4)" strokeWidth="0.8" />
          <text x="57" y="238" textAnchor="middle" fontSize="8" fontWeight="600" className="fill-destructive">D₂</text>
          <rect x="78" y="228" width="36" height="14" rx="3" fill="hsl(var(--destructive) / 0.15)" stroke="hsl(var(--destructive) / 0.4)" strokeWidth="0.8" />
          <text x="96" y="238" textAnchor="middle" fontSize="8" fontWeight="600" className="fill-destructive">5-HT₃</text>
          <rect x="120" y="228" width="32" height="14" rx="3" fill="hsl(var(--destructive) / 0.15)" stroke="hsl(var(--destructive) / 0.4)" strokeWidth="0.8" />
          <text x="136" y="238" textAnchor="middle" fontSize="8" fontWeight="600" className="fill-destructive">NK₁</text>
          <rect x="158" y="228" width="38" height="14" rx="3" fill="hsl(var(--destructive) / 0.15)" stroke="hsl(var(--destructive) / 0.4)" strokeWidth="0.8" />
          <text x="177" y="238" textAnchor="middle" fontSize="8" fontWeight="600" className="fill-destructive">μ-opioid</text>

          {/* === GI Tract — Bottom === */}
          <rect x="230" y="400" width="260" height="100" rx="8" fill="hsl(var(--accent) / 0.2)" stroke="hsl(var(--accent-foreground) / 0.2)" strokeWidth="1.5" />
          <text x="360" y="422" textAnchor="middle" className="fill-foreground" fontWeight="600" fontSize="12">GI Tract</text>
          <text x="360" y="437" textAnchor="middle" className="fill-muted-foreground" fontSize="9">(Vagal & splanchnic afferents)</text>
          <text x="360" y="455" textAnchor="middle" className="fill-muted-foreground" fontSize="9">Enterochromaffin cells → 5-HT release</text>
          <text x="360" y="470" textAnchor="middle" className="fill-muted-foreground" fontSize="9">Distension, irritation, cytotoxics</text>
          {/* Receptor badges */}
          <rect x="298" y="478" width="36" height="14" rx="3" fill="hsl(var(--destructive) / 0.15)" stroke="hsl(var(--destructive) / 0.4)" strokeWidth="0.8" />
          <text x="316" y="488" textAnchor="middle" fontSize="8" fontWeight="600" className="fill-destructive">5-HT₃</text>
          <rect x="340" y="478" width="45" height="14" rx="3" fill="hsl(var(--destructive) / 0.15)" stroke="hsl(var(--destructive) / 0.4)" strokeWidth="0.8" />
          <text x="362" y="488" textAnchor="middle" fontSize="8" fontWeight="600" className="fill-destructive">Mechano</text>

          {/* === Efferent Output — Right === */}
          <rect x="530" y="230" width="160" height="70" rx="8" fill="hsl(var(--muted) / 0.5)" stroke="hsl(var(--muted-foreground) / 0.3)" strokeWidth="1.5" />
          <text x="610" y="252" textAnchor="middle" className="fill-foreground" fontWeight="600" fontSize="11">Efferent Output</text>
          <text x="610" y="268" textAnchor="middle" className="fill-muted-foreground" fontSize="9">Vagus → ↑ gastric motility</text>
          <text x="610" y="281" textAnchor="middle" className="fill-muted-foreground" fontSize="9">Phrenic/intercostal → retch</text>
          <text x="610" y="294" textAnchor="middle" className="fill-muted-foreground" fontSize="9">Somatic → abdominal wall</text>

          {/* === ARROWS === */}
          {/* Cortex → Vomiting Centre */}
          <line x1="180" y1="100" x2="290" y2="230" stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#vom-arrow)" />

          {/* Vestibular → Vomiting Centre */}
          <line x1="540" y1="100" x2="430" y2="230" stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#vom-arrow)" />

          {/* CTZ → Vomiting Centre */}
          <line x1="210" y1="210" x2="260" y2="250" stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#vom-arrow)" />

          {/* GI → Vomiting Centre */}
          <line x1="360" y1="400" x2="360" y2="300" stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#vom-arrow)" />
          <text x="372" y="360" className="fill-muted-foreground" fontSize="8" fontStyle="italic">Vagal afferents</text>

          {/* Vomiting Centre → Efferent */}
          <line x1="460" y1="265" x2="530" y2="265" stroke="hsl(var(--foreground))" strokeWidth="1.5" markerEnd="url(#vom-arrow)" />

          {/* GI → CTZ (blood-borne) */}
          <path d="M 240,440 C 80,440 40,310 70,250" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeDasharray="4,3" markerEnd="url(#vom-arrow-muted)" />
          <text x="55" y="350" className="fill-muted-foreground" fontSize="7" fontStyle="italic" transform="rotate(-70 55 350)">Blood-borne emetogens</text>

          {/* === Antiemetic drug annotations === */}
          <rect x="510" y="135" width="180" height="80" rx="6" fill="hsl(var(--muted) / 0.3)" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="4,2" />
          <text x="600" y="152" textAnchor="middle" className="fill-foreground" fontWeight="600" fontSize="10">Antiemetic Targets</text>
          <text x="520" y="168" className="fill-muted-foreground" fontSize="8">D₂ → metoclopramide, droperidol</text>
          <text x="520" y="180" className="fill-muted-foreground" fontSize="8">5-HT₃ → ondansetron</text>
          <text x="520" y="192" className="fill-muted-foreground" fontSize="8">NK₁ → aprepitant</text>
          <text x="520" y="204" className="fill-muted-foreground" fontSize="8">H₁/M₁ → cyclizine, hyoscine</text>

          {/* Legend */}
          <text x="30" y="510" className="fill-muted-foreground" fontSize="8">Red badges = receptor subtypes at each site</text>
        </svg>
      </div>
    </div>
  );
};

export default VomitingControlDiagram;
