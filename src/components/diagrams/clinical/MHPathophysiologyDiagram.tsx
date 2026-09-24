import { DiagramFigure } from "../_shared/DiagramFigure";
const MHPathophysiologyDiagram = () => {
  return (
    <DiagramFigure
      id="mh-pathophysiology-diagram"
      title="MH pathophysiology"
      description="MH pathophysiology: labelled teaching figure showing the structures, relationships and key values FRCA and FFICM candidates need to recognise and explain for this topic."
    >
                  <div className="w-full overflow-x-auto">
        <svg viewBox="0 0 700 520" className="w-full min-w-[500px]" aria-label="Malignant Hyperthermia Pathophysiology Diagram">
          <defs>
            <marker id="mh-arrow" viewBox="0 0 10 7" refX="9" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="hsl(var(--clinical))" />
            </marker>
            <marker id="mh-arrow-red" viewBox="0 0 10 7" refX="9" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="hsl(0 72% 51%)" />
            </marker>
            <linearGradient id="mh-trigger-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="hsl(0 72% 51% / 0.15)" />
              <stop offset="100%" stopColor="hsl(0 72% 51% / 0.05)" />
            </linearGradient>
            <linearGradient id="mh-cell-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--clinical) / 0.08)" />
              <stop offset="100%" stopColor="hsl(var(--clinical) / 0.03)" />
            </linearGradient>
          </defs>
  
          {/* Title */}
          <text x="350" y="24" textAnchor="middle" className="fill-foreground text-sm font-bold">Malignant Hyperthermia — Pathophysiology</text>
  
          {/* ── TRIGGERS ── */}
          <rect x="220" y="40" width="260" height="44" rx="8" fill="url(#mh-trigger-grad)" stroke="hsl(0 72% 51% / 0.4)" strokeWidth="1.5" />
          <text x="350" y="58" textAnchor="middle" className="fill-foreground text-xs font-semibold">Trigger Exposure</text>
          <text x="350" y="73" textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: '9px' }}>Volatile agents (sevoflurane, desflurane) · Suxamethonium</text>
  
          {/* Arrow trigger → RYR1 */}
          <line x1="350" y1="84" x2="350" y2="108" stroke="hsl(0 72% 51%)" strokeWidth="1.5" markerEnd="url(#mh-arrow-red)" />
  
          {/* ── SKELETAL MUSCLE CELL ── */}
          <rect x="30" y="108" width="640" height="380" rx="14" fill="url(#mh-cell-grad)" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="6 3" />
          <text x="50" y="128" className="fill-muted-foreground" style={{ fontSize: '9px', fontStyle: 'italic' }}>Skeletal Muscle Cell</text>
  
          {/* ── RYR1 MUTATION BOX ── */}
          <rect x="240" y="118" width="220" height="48" rx="8" fill="hsl(0 72% 51% / 0.12)" stroke="hsl(0 72% 51% / 0.5)" strokeWidth="1.5" />
          <text x="350" y="138" textAnchor="middle" className="fill-foreground text-xs font-semibold">Mutant RYR1 Channel</text>
          <text x="350" y="153" textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: '9px' }}>Ryanodine receptor on SR membrane</text>
  
          {/* Arrow RYR1 → Ca²⁺ release */}
          <line x1="350" y1="166" x2="350" y2="194" stroke="hsl(var(--clinical))" strokeWidth="1.5" markerEnd="url(#mh-arrow)" />
          <text x="358" y="184" className="fill-muted-foreground" style={{ fontSize: '8px' }}>uncontrolled opening</text>
  
          {/* ── CALCIUM RELEASE ── */}
          <rect x="245" y="196" width="210" height="40" rx="8" fill="hsl(var(--clinical) / 0.15)" stroke="hsl(var(--clinical) / 0.5)" strokeWidth="1.5" />
          <text x="350" y="213" textAnchor="middle" className="fill-foreground text-xs font-bold">↑↑↑ Ca²⁺ Release into Cytoplasm</text>
          <text x="350" y="227" textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: '9px' }}>From sarcoplasmic reticulum</text>
  
          {/* Branching arrows from Ca²⁺ */}
          {/* Left branch: sustained contraction */}
          <line x1="280" y1="236" x2="140" y2="275" stroke="hsl(var(--clinical))" strokeWidth="1.5" markerEnd="url(#mh-arrow)" />
          {/* Centre branch: mitochondrial overload */}
          <line x1="350" y1="236" x2="350" y2="275" stroke="hsl(var(--clinical))" strokeWidth="1.5" markerEnd="url(#mh-arrow)" />
          {/* Right branch: ATP consumption */}
          <line x1="420" y1="236" x2="560" y2="275" stroke="hsl(var(--clinical))" strokeWidth="1.5" markerEnd="url(#mh-arrow)" />
  
          {/* ── LEFT: Sustained Contraction ── */}
          <rect x="50" y="278" width="180" height="44" rx="7" fill="hsl(var(--clinical) / 0.1)" stroke="hsl(var(--clinical) / 0.3)" strokeWidth="1" />
          <text x="140" y="296" textAnchor="middle" className="fill-foreground" style={{ fontSize: '10px', fontWeight: 600 }}>Sustained Contraction</text>
          <text x="140" y="312" textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: '9px' }}>Actin-myosin cross-bridge cycling</text>
  
          {/* Left downstream: rigidity + rhabdo */}
          <line x1="140" y1="322" x2="140" y2="355" stroke="hsl(var(--clinical))" strokeWidth="1" markerEnd="url(#mh-arrow)" />
          <rect x="55" y="358" width="170" height="50" rx="7" fill="hsl(var(--clinical) / 0.06)" stroke="hsl(var(--clinical) / 0.2)" strokeWidth="1" />
          <text x="140" y="376" textAnchor="middle" className="fill-foreground" style={{ fontSize: '10px', fontWeight: 600 }}>Muscle Rigidity</text>
          <text x="140" y="390" textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: '8px' }}>Masseter spasm (earliest sign)</text>
          <text x="140" y="401" textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: '8px' }}>→ Rhabdomyolysis → ↑CK, ↑K⁺</text>
  
          {/* ── CENTRE: Mitochondrial Overload ── */}
          <rect x="260" y="278" width="180" height="44" rx="7" fill="hsl(var(--clinical) / 0.1)" stroke="hsl(var(--clinical) / 0.3)" strokeWidth="1" />
          <text x="350" y="296" textAnchor="middle" className="fill-foreground" style={{ fontSize: '10px', fontWeight: 600 }}>↑↑ Aerobic Metabolism</text>
          <text x="350" y="312" textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: '9px' }}>Mitochondrial O₂ consumption</text>
  
          {/* Centre downstream: heat + CO₂ */}
          <line x1="350" y1="322" x2="350" y2="355" stroke="hsl(var(--clinical))" strokeWidth="1" markerEnd="url(#mh-arrow)" />
          <rect x="265" y="358" width="170" height="50" rx="7" fill="hsl(var(--clinical) / 0.06)" stroke="hsl(var(--clinical) / 0.2)" strokeWidth="1" />
          <text x="350" y="376" textAnchor="middle" className="fill-foreground" style={{ fontSize: '10px', fontWeight: 600 }}>↑↑ Heat + ↑↑ CO₂</text>
          <text x="350" y="390" textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: '8px' }}>↑EtCO₂ (earliest monitor sign)</text>
          <text x="350" y="401" textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: '8px' }}>Hyperthermia &gt;2°C/hr</text>
  
          {/* ── RIGHT: ATP Consumption ── */}
          <rect x="470" y="278" width="180" height="44" rx="7" fill="hsl(var(--clinical) / 0.1)" stroke="hsl(var(--clinical) / 0.3)" strokeWidth="1" />
          <text x="560" y="296" textAnchor="middle" className="fill-foreground" style={{ fontSize: '10px', fontWeight: 600 }}>↑↑ ATP Consumption</text>
          <text x="560" y="312" textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: '9px' }}>Ca²⁺ pump + contraction demand</text>
  
          {/* Right downstream: metabolic crisis */}
          <line x1="560" y1="322" x2="560" y2="355" stroke="hsl(var(--clinical))" strokeWidth="1" markerEnd="url(#mh-arrow)" />
          <rect x="475" y="358" width="170" height="50" rx="7" fill="hsl(var(--clinical) / 0.06)" stroke="hsl(var(--clinical) / 0.2)" strokeWidth="1" />
          <text x="560" y="376" textAnchor="middle" className="fill-foreground" style={{ fontSize: '10px', fontWeight: 600 }}>Metabolic Crisis</text>
          <text x="560" y="390" textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: '8px' }}>Anaerobic → Lactic acidosis</text>
          <text x="560" y="401" textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: '8px' }}>Cell death → ↑K⁺ → Arrhythmia</text>
  
          {/* ── BOTTOM: Converging to final outcome ── */}
          <line x1="140" y1="408" x2="140" y2="440" stroke="hsl(0 72% 51% / 0.4)" strokeWidth="1" strokeDasharray="4 3" />
          <line x1="140" y1="440" x2="350" y2="460" stroke="hsl(0 72% 51% / 0.4)" strokeWidth="1" strokeDasharray="4 3" />
          <line x1="350" y1="408" x2="350" y2="460" stroke="hsl(0 72% 51% / 0.4)" strokeWidth="1" strokeDasharray="4 3" />
          <line x1="560" y1="408" x2="560" y2="440" stroke="hsl(0 72% 51% / 0.4)" strokeWidth="1" strokeDasharray="4 3" />
          <line x1="560" y1="440" x2="350" y2="460" stroke="hsl(0 72% 51% / 0.4)" strokeWidth="1" strokeDasharray="4 3" />
  
          {/* Final outcome */}
          <rect x="230" y="460" width="240" height="28" rx="6" fill="hsl(0 72% 51% / 0.15)" stroke="hsl(0 72% 51% / 0.5)" strokeWidth="1.5" />
          <text x="350" y="479" textAnchor="middle" className="fill-foreground text-xs font-bold">Multi-organ Failure + Cardiac Arrest</text>
  
          {/* Dantrolene annotation */}
          <rect x="500" y="118" width="150" height="48" rx="7" fill="hsl(142 71% 45% / 0.12)" stroke="hsl(142 71% 45% / 0.5)" strokeWidth="1.5" />
          <text x="575" y="137" textAnchor="middle" style={{ fontSize: '10px', fontWeight: 700, fill: 'hsl(142 71% 45%)' }}>Dantrolene</text>
          <text x="575" y="150" textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: '8px' }}>Blocks RYR1 → stops</text>
          <text x="575" y="160" textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: '8px' }}>Ca²⁺ release from SR</text>
          {/* Dantrolene inhibition line */}
          <line x1="500" y1="142" x2="462" y2="142" stroke="hsl(142 71% 45%)" strokeWidth="1.5" strokeDasharray="5 3" />
          <line x1="462" y1="142" x2="462" y2="142" stroke="hsl(142 71% 45%)" strokeWidth="1.5" />
          <text x="472" y="136" textAnchor="middle" style={{ fontSize: '14px', fill: 'hsl(142 71% 45%)', fontWeight: 700 }}>⊣</text>
        </svg>
      </div>
    </DiagramFigure>
  );
};

export default MHPathophysiologyDiagram;
