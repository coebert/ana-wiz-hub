import { DiagramFigure } from "./_shared/DiagramFigure";
const AnaphylaxisPathophysiologyDiagram = () => {
  return (
    <DiagramFigure
      id="anaphylaxis-pathophysiology-diagram"
      title="Anaphylaxis pathophysiology"
      description="Auto-generated wrapper for the Anaphylaxis pathophysiology anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="w-full overflow-x-auto">
        <svg viewBox="0 0 700 560" className="w-full min-w-[500px]" aria-label="Anaphylaxis Pathophysiology Diagram">
          <defs>
            <marker id="ana-arrow" viewBox="0 0 10 7" refX="9" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="hsl(var(--clinical))" />
            </marker>
            <marker id="ana-arrow-red" viewBox="0 0 10 7" refX="9" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="hsl(0 72% 51%)" />
            </marker>
            <linearGradient id="ana-trigger-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="hsl(0 72% 51% / 0.15)" />
              <stop offset="100%" stopColor="hsl(0 72% 51% / 0.05)" />
            </linearGradient>
            <linearGradient id="ana-cell-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--clinical) / 0.08)" />
              <stop offset="100%" stopColor="hsl(var(--clinical) / 0.03)" />
            </linearGradient>
          </defs>
  
          {/* Title */}
          <text x="350" y="24" textAnchor="middle" className="fill-foreground text-sm font-bold">Perioperative Anaphylaxis — Pathophysiology</text>
  
          {/* ── ANTIGEN EXPOSURE ── */}
          <rect x="220" y="40" width="260" height="44" rx="8" fill="url(#ana-trigger-grad)" stroke="hsl(0 72% 51% / 0.4)" strokeWidth="1.5" />
          <text x="350" y="58" textAnchor="middle" className="fill-foreground text-xs font-semibold">Antigen Re-exposure</text>
          <text x="350" y="73" textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: '9px' }}>NMBAs (60%) · Antibiotics · Chlorhexidine · Latex</text>
  
          {/* Arrow → IgE */}
          <line x1="350" y1="84" x2="350" y2="110" stroke="hsl(0 72% 51%)" strokeWidth="1.5" markerEnd="url(#ana-arrow-red)" />
  
          {/* ── IgE CROSS-LINKING ── */}
          <rect x="225" y="112" width="250" height="48" rx="8" fill="hsl(var(--clinical) / 0.12)" stroke="hsl(var(--clinical) / 0.5)" strokeWidth="1.5" />
          <text x="350" y="132" textAnchor="middle" className="fill-foreground text-xs font-semibold">IgE Cross-linking on Mast Cells</text>
          <text x="350" y="147" textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: '9px' }}>Antigen bridges 2× surface-bound IgE via FcεRI</text>
  
          {/* Prior sensitisation annotation */}
          <rect x="500" y="100" width="160" height="40" rx="6" fill="hsl(var(--clinical) / 0.06)" stroke="hsl(var(--clinical) / 0.2)" strokeWidth="1" />
          <text x="580" y="116" textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: '8px' }}>Prior sensitisation required</text>
          <text x="580" y="128" textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: '8px' }}>(NMBAs may cross-react with</text>
          <text x="580" y="138" textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: '8px' }}>cosmetics — no prior drug exposure)</text>
          <line x1="500" y1="126" x2="477" y2="130" stroke="hsl(var(--clinical) / 0.3)" strokeWidth="1" strokeDasharray="4 3" />
  
          {/* Arrow → Degranulation */}
          <line x1="350" y1="160" x2="350" y2="190" stroke="hsl(var(--clinical))" strokeWidth="1.5" markerEnd="url(#ana-arrow)" />
  
          {/* ── MAST CELL DEGRANULATION ── */}
          <rect x="30" y="192" width="640" height="345" rx="14" fill="url(#ana-cell-grad)" stroke="hsl(var(--border))" strokeWidth="1" strokeDasharray="6 3" />
          <text x="50" y="212" className="fill-muted-foreground" style={{ fontSize: '9px', fontStyle: 'italic' }}>Mast Cell & Basophil Degranulation</text>
  
          {/* Mediator release box */}
          <rect x="225" y="218" width="250" height="44" rx="8" fill="hsl(var(--clinical) / 0.15)" stroke="hsl(var(--clinical) / 0.5)" strokeWidth="1.5" />
          <text x="350" y="236" textAnchor="middle" className="fill-foreground text-xs font-bold">Massive Mediator Release</text>
          <text x="350" y="251" textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: '9px' }}>Histamine · Tryptase · PGD₂ · Leukotrienes · PAF</text>
  
          {/* Three branches */}
          <line x1="260" y1="262" x2="140" y2="300" stroke="hsl(var(--clinical))" strokeWidth="1.5" markerEnd="url(#ana-arrow)" />
          <line x1="350" y1="262" x2="350" y2="300" stroke="hsl(var(--clinical))" strokeWidth="1.5" markerEnd="url(#ana-arrow)" />
          <line x1="440" y1="262" x2="560" y2="300" stroke="hsl(var(--clinical))" strokeWidth="1.5" markerEnd="url(#ana-arrow)" />
  
          {/* ── LEFT: Vasodilation ── */}
          <rect x="45" y="303" width="190" height="44" rx="7" fill="hsl(var(--clinical) / 0.1)" stroke="hsl(var(--clinical) / 0.3)" strokeWidth="1" />
          <text x="140" y="321" textAnchor="middle" className="fill-foreground" style={{ fontSize: '10px', fontWeight: 600 }}>Vasodilation</text>
          <text x="140" y="337" textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: '9px' }}>Histamine on H₁/H₂ + NO release</text>
  
          <line x1="140" y1="347" x2="140" y2="378" stroke="hsl(var(--clinical))" strokeWidth="1" markerEnd="url(#ana-arrow)" />
  
          <rect x="45" y="381" width="190" height="55" rx="7" fill="hsl(var(--clinical) / 0.06)" stroke="hsl(var(--clinical) / 0.2)" strokeWidth="1" />
          <text x="140" y="399" textAnchor="middle" className="fill-foreground" style={{ fontSize: '10px', fontWeight: 600 }}>Distributive Shock</text>
          <text x="140" y="413" textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: '8px' }}>↓↓ SVR → profound hypotension</text>
          <text x="140" y="425" textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: '8px' }}>Compensatory tachycardia</text>
  
          {/* ── CENTRE: Capillary Leak ── */}
          <rect x="255" y="303" width="190" height="44" rx="7" fill="hsl(var(--clinical) / 0.1)" stroke="hsl(var(--clinical) / 0.3)" strokeWidth="1" />
          <text x="350" y="321" textAnchor="middle" className="fill-foreground" style={{ fontSize: '10px', fontWeight: 600 }}>↑ Capillary Permeability</text>
          <text x="350" y="337" textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: '9px' }}>Endothelial gap formation</text>
  
          <line x1="350" y1="347" x2="350" y2="378" stroke="hsl(var(--clinical))" strokeWidth="1" markerEnd="url(#ana-arrow)" />
  
          <rect x="255" y="381" width="190" height="55" rx="7" fill="hsl(var(--clinical) / 0.06)" stroke="hsl(var(--clinical) / 0.2)" strokeWidth="1" />
          <text x="350" y="399" textAnchor="middle" className="fill-foreground" style={{ fontSize: '10px', fontWeight: 600 }}>Tissue Oedema</text>
          <text x="350" y="413" textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: '8px' }}>Laryngeal → stridor / obstruction</text>
          <text x="350" y="425" textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: '8px' }}>Up to 35% plasma loss in mins</text>
  
          {/* ── RIGHT: Bronchospasm ── */}
          <rect x="465" y="303" width="190" height="44" rx="7" fill="hsl(var(--clinical) / 0.1)" stroke="hsl(var(--clinical) / 0.3)" strokeWidth="1" />
          <text x="560" y="321" textAnchor="middle" className="fill-foreground" style={{ fontSize: '10px', fontWeight: 600 }}>Bronchospasm</text>
          <text x="560" y="337" textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: '9px' }}>Leukotrienes C₄/D₄ + histamine</text>
  
          <line x1="560" y1="347" x2="560" y2="378" stroke="hsl(var(--clinical))" strokeWidth="1" markerEnd="url(#ana-arrow)" />
  
          <rect x="465" y="381" width="190" height="55" rx="7" fill="hsl(var(--clinical) / 0.06)" stroke="hsl(var(--clinical) / 0.2)" strokeWidth="1" />
          <text x="560" y="399" textAnchor="middle" className="fill-foreground" style={{ fontSize: '10px', fontWeight: 600 }}>Respiratory Failure</text>
          <text x="560" y="413" textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: '8px' }}>↑ Airway pressure, ↓ compliance</text>
          <text x="560" y="425" textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: '8px' }}>Desaturation, wheeze</text>
  
          {/* Converging lines to outcome */}
          <line x1="140" y1="436" x2="140" y2="458" stroke="hsl(0 72% 51% / 0.4)" strokeWidth="1" strokeDasharray="4 3" />
          <line x1="140" y1="458" x2="350" y2="478" stroke="hsl(0 72% 51% / 0.4)" strokeWidth="1" strokeDasharray="4 3" />
          <line x1="350" y1="436" x2="350" y2="478" stroke="hsl(0 72% 51% / 0.4)" strokeWidth="1" strokeDasharray="4 3" />
          <line x1="560" y1="436" x2="560" y2="458" stroke="hsl(0 72% 51% / 0.4)" strokeWidth="1" strokeDasharray="4 3" />
          <line x1="560" y1="458" x2="350" y2="478" stroke="hsl(0 72% 51% / 0.4)" strokeWidth="1" strokeDasharray="4 3" />
  
          {/* Final outcome */}
          <rect x="225" y="480" width="250" height="28" rx="6" fill="hsl(0 72% 51% / 0.15)" stroke="hsl(0 72% 51% / 0.5)" strokeWidth="1.5" />
          <text x="350" y="499" textAnchor="middle" className="fill-foreground text-xs font-bold">Cardiovascular Collapse + Cardiac Arrest</text>
  
          {/* ── ADRENALINE annotation ── */}
          <rect x="50" y="218" width="150" height="55" rx="7" fill="hsl(142 71% 45% / 0.12)" stroke="hsl(142 71% 45% / 0.5)" strokeWidth="1.5" />
          <text x="125" y="236" textAnchor="middle" style={{ fontSize: '10px', fontWeight: 700, fill: 'hsl(142 71% 45%)' }}>Adrenaline</text>
          <text x="125" y="249" textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: '8px' }}>α₁: vasoconstriction</text>
          <text x="125" y="259" textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: '8px' }}>β₁: inotropy · β₂: bronchodilation</text>
          <text x="125" y="269" textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: '8px' }}>Stabilises mast cell membrane</text>
  
          {/* Tryptase annotation */}
          <rect x="50" y="460" width="155" height="40" rx="6" fill="hsl(var(--clinical) / 0.06)" stroke="hsl(var(--clinical) / 0.25)" strokeWidth="1" />
          <text x="127" y="476" textAnchor="middle" className="fill-foreground" style={{ fontSize: '9px', fontWeight: 600 }}>Mast Cell Tryptase</text>
          <text x="127" y="488" textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: '8px' }}>Sample at 1h, 6h, &gt;24h (baseline)</text>
          <text x="127" y="498" textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: '8px' }}>Confirms mast cell degranulation</text>
        </svg>
      </div>
    </DiagramFigure>
  );
};

export default AnaphylaxisPathophysiologyDiagram;
