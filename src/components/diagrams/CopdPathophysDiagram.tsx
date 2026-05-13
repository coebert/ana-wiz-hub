import DiagramAnimationLegend from "./DiagramAnimationLegend";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * Animated pathophysiology diagram — COPD.
 * Cigarette smoke → protease/antiprotease imbalance + chronic inflammation
 * → emphysema (loss of elastic recoil) + chronic bronchitis (mucus, narrowing)
 * → V/Q mismatch, hypoxic pulmonary vasoconstriction → cor pulmonale.
 */
const CopdPathophysDiagram = () => {
  return (
    <DiagramFigure
      id="copd-pathophys-diagram"
      title="COPD pathophys"
      description="Auto-generated wrapper for the COPD pathophys anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b border-border bg-muted/30">
          <h3 className="text-lg font-serif font-bold text-foreground">COPD — Pathophysiological Cascade</h3>
          <p className="text-xs text-muted-foreground mt-1">
            From inhaled insult to alveolar destruction, V/Q mismatch and right heart failure
          </p>
        </div>
  
        <div className="p-4 sm:p-6">
          <svg viewBox="0 0 800 460" className="w-full h-auto" role="img" aria-label="COPD pathophysiology cascade">
            <defs>
              <marker id="arr-copd" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" fill="hsl(var(--clinical))" />
              </marker>
            </defs>
  
            {/* Smoke source */}
            <g>
              <rect x="20" y="30" width="170" height="60" rx="10" fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
              <text x="105" y="56" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="600">Inhaled insult</text>
              <text x="105" y="74" textAnchor="middle" className="fill-muted-foreground" fontSize="10">cigarette smoke · pollution</text>
            </g>
  
            {/* Smoke particles drifting right */}
            {[0, 0.4, 0.8, 1.2, 1.6].map((d, i) => (
              <circle key={i} cx="195" cy="60" r="3" fill="hsl(var(--clinical))" opacity="0.6">
                <animate attributeName="cx" values="195;320" dur="2s" begin={`${d}s`} repeatCount="indefinite" />
                <animate attributeName="cy" values="60;50;65;60" dur="2s" begin={`${d}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;0.6;0" dur="2s" begin={`${d}s`} repeatCount="indefinite" />
              </circle>
            ))}
  
            {/* Inflammation node */}
            <g>
              <circle cx="360" cy="60" r="34" fill="hsl(var(--clinical) / 0.15)" stroke="hsl(var(--clinical))" strokeWidth="2">
                <animate attributeName="r" values="32;38;32" dur="1.6s" repeatCount="indefinite" />
              </circle>
              <text x="360" y="56" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="600">Chronic</text>
              <text x="360" y="70" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="600">inflammation</text>
              <text x="360" y="84" textAnchor="middle" className="fill-clinical" fontSize="9">neutrophils · macrophages · CD8⁺</text>
            </g>
  
            {/* Imbalance scale */}
            <g>
              <rect x="500" y="30" width="280" height="60" rx="10" fill="hsl(var(--clinical) / 0.08)" stroke="hsl(var(--clinical) / 0.5)" />
              <text x="640" y="52" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="600">Protease ⇄ antiprotease imbalance</text>
              <text x="640" y="70" textAnchor="middle" className="fill-muted-foreground" fontSize="10">↑ neutrophil elastase · ↓ α₁-antitrypsin</text>
              <text x="640" y="84" textAnchor="middle" className="fill-muted-foreground" fontSize="9">+ oxidative stress (↓ glutathione)</text>
            </g>
  
            {/* Two parallel pathways: emphysema + chronic bronchitis */}
            {/* Emphysema box */}
            <g transform="translate(40, 150)">
              <rect width="340" height="130" rx="10" fill="hsl(var(--card))" stroke="hsl(var(--border))" />
              <text x="170" y="22" textAnchor="middle" className="fill-foreground" fontSize="13" fontWeight="700">Emphysema</text>
              <text x="170" y="38" textAnchor="middle" className="fill-clinical" fontSize="10">alveolar wall destruction · ↓ elastic recoil</text>
              {/* Healthy alveoli */}
              {[0, 1, 2].map((i) => (
                <circle key={`h${i}`} cx={45 + i * 28} cy="78" r="11" fill="hsl(var(--clinical) / 0.1)" stroke="hsl(var(--clinical))" />
              ))}
              <text x="70" y="108" textAnchor="middle" className="fill-muted-foreground" fontSize="9">normal</text>
              {/* Arrow */}
              <path d="M150 78 L 195 78" stroke="hsl(var(--clinical))" strokeWidth="2" markerEnd="url(#arr-copd)" />
              {/* Emphysematous bullae - pulsing */}
              <ellipse cx="250" cy="78" rx="28" ry="22" fill="hsl(var(--clinical) / 0.2)" stroke="hsl(var(--clinical))" strokeDasharray="3 3">
                <animate attributeName="rx" values="26;34;26" dur="3s" repeatCount="indefinite" />
                <animate attributeName="ry" values="20;28;20" dur="3s" repeatCount="indefinite" />
              </ellipse>
              <ellipse cx="305" cy="82" rx="22" ry="18" fill="hsl(var(--clinical) / 0.2)" stroke="hsl(var(--clinical))" strokeDasharray="3 3">
                <animate attributeName="rx" values="20;28;20" dur="3.4s" repeatCount="indefinite" />
                <animate attributeName="ry" values="16;24;16" dur="3.4s" repeatCount="indefinite" />
              </ellipse>
              <text x="275" y="115" textAnchor="middle" className="fill-muted-foreground" fontSize="9">bullae · gas trapping · ↑ TLC</text>
            </g>
  
            {/* Chronic bronchitis box */}
            <g transform="translate(420, 150)">
              <rect width="340" height="130" rx="10" fill="hsl(var(--card))" stroke="hsl(var(--border))" />
              <text x="170" y="22" textAnchor="middle" className="fill-foreground" fontSize="13" fontWeight="700">Chronic bronchitis</text>
              <text x="170" y="38" textAnchor="middle" className="fill-clinical" fontSize="10">goblet cell hyperplasia · mucus hypersecretion</text>
              {/* Airway with mucus accumulating */}
              <rect x="40" y="62" width="260" height="40" rx="6" fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
              {[0, 1, 2, 3].map((i) => (
                <ellipse key={i} cx={70 + i * 60} cy="82" rx="14" ry="8" fill="hsl(var(--clinical) / 0.6)">
                  <animate attributeName="rx" values="6;18;6" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
                </ellipse>
              ))}
              <text x="170" y="118" textAnchor="middle" className="fill-muted-foreground" fontSize="9">productive cough · airway narrowing · ↑ resistance</text>
            </g>
  
            {/* Convergent arrows */}
            <path d="M210 285 L 360 320" stroke="hsl(var(--clinical))" strokeWidth="2" fill="none" markerEnd="url(#arr-copd)" />
            <path d="M590 285 L 440 320" stroke="hsl(var(--clinical))" strokeWidth="2" fill="none" markerEnd="url(#arr-copd)" />
  
            {/* V/Q mismatch */}
            <g>
              <rect x="220" y="325" width="360" height="50" rx="10" fill="hsl(var(--clinical) / 0.1)" stroke="hsl(var(--clinical))" />
              <text x="400" y="350" textAnchor="middle" className="fill-foreground" fontSize="13" fontWeight="700">V/Q mismatch · hypoxaemia · CO₂ retention</text>
              <text x="400" y="368" textAnchor="middle" className="fill-muted-foreground" fontSize="10">hypoxic pulmonary vasoconstriction (HPV)</text>
            </g>
  
            <path d="M400 378 L 400 405" stroke="hsl(var(--clinical))" strokeWidth="2" markerEnd="url(#arr-copd)" />
  
            {/* Cor pulmonale - pulsing heart */}
            <g>
              <rect x="240" y="408" width="320" height="44" rx="10" fill="hsl(var(--clinical) / 0.15)" stroke="hsl(var(--clinical))" strokeWidth="2" />
              <text x="400" y="430" textAnchor="middle" className="fill-foreground" fontSize="13" fontWeight="700">Cor pulmonale</text>
              <text x="400" y="446" textAnchor="middle" className="fill-muted-foreground" fontSize="10">RV hypertrophy → RV failure · peripheral oedema</text>
              <path d="M270 430 q -8 -10 -16 0 q -8 -10 -16 0 q 0 12 16 22 q 16 -10 16 -22 z" fill="hsl(var(--clinical))" transform="translate(-10,0)">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="0.9s" repeatCount="indefinite" />
              </path>
            </g>
  
            {/* Top arrows */}
            <path d="M190 60 L 320 60" stroke="hsl(var(--clinical))" strokeWidth="2" markerEnd="url(#arr-copd)" />
            <path d="M398 60 L 495 60" stroke="hsl(var(--clinical))" strokeWidth="2" markerEnd="url(#arr-copd)" />
            <path d="M640 95 L 210 145" stroke="hsl(var(--clinical))" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" markerEnd="url(#arr-copd)" />
            <path d="M640 95 L 590 145" stroke="hsl(var(--clinical))" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6" markerEnd="url(#arr-copd)" />
          </svg>
  
          <DiagramAnimationLegend
            items={[
              { glyph: "trigger", label: "Inhaled insult box", meaning: "smoke / pollution entering the airway" },
              { glyph: "process", label: "Pulsing inflammation node", meaning: "neutrophil + macrophage + CD8⁺ activity driving injury" },
              { glyph: "mediator", label: "Travelling dots", meaning: "elastases & oxidants reaching alveolar walls" },
              { glyph: "oscillate", label: "Expanding alveoli", meaning: "loss of elastic recoil → emphysematous bullae & gas trapping" },
              { glyph: "arrow", label: "Solid arrow", meaning: "causal step in the cascade" },
              { glyph: "outcome", label: "Tinted outcome boxes", meaning: "V/Q mismatch → HPV → cor pulmonale" },
            ]}
          />
  
          <p className="text-xs text-muted-foreground mt-3 italic">
            Anaesthetic implications: avoid auto-PEEP (long expiration, low VT), titrate O₂ to SpO₂ 88–92% in CO₂ retainers, expect raised PA pressure and RV strain — minimise drugs that depress RV function or precipitate further HPV.
          </p>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default CopdPathophysDiagram;
