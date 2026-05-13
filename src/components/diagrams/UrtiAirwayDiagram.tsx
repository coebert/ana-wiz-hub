import DiagramAnimationLegend from "./DiagramAnimationLegend";

/**
 * Animated pathophysiology diagram — Recent URTI and airway hyper-reactivity.
 * Viral epithelial injury → exposure of irritant C-fibres + neurogenic
 * inflammation → vagally-mediated reflex bronchoconstriction & laryngospasm
 * for 6–8 weeks. Risk amplified in children with airway instrumentation.
 */
const UrtiAirwayDiagram = () => {
  return (
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b border-border bg-muted/30">
        <h3 className="text-lg font-serif font-bold text-foreground">Recent URTI — Airway Hyper-reactivity</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Why airway reflexes remain primed for 6–8 weeks after a "simple" cold
        </p>
      </div>

      <div className="p-4 sm:p-6">
        <svg viewBox="0 0 800 420" className="w-full h-auto" role="img" aria-label="Post-URTI airway hyper-reactivity">
          <defs>
            <marker id="arr-urti" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="hsl(var(--clinical))" />
            </marker>
          </defs>

          {/* Virus */}
          <g>
            <circle cx="90" cy="70" r="34" fill="hsl(var(--clinical) / 0.15)" stroke="hsl(var(--clinical))" strokeWidth="2">
              <animate attributeName="r" values="32;38;32" dur="1.8s" repeatCount="indefinite" />
            </circle>
            {/* Spikes */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
              <line
                key={a}
                x1={90 + Math.cos((a * Math.PI) / 180) * 34}
                y1={70 + Math.sin((a * Math.PI) / 180) * 34}
                x2={90 + Math.cos((a * Math.PI) / 180) * 42}
                y2={70 + Math.sin((a * Math.PI) / 180) * 42}
                stroke="hsl(var(--clinical))"
                strokeWidth="1.5"
              />
            ))}
            <text x="90" y="74" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="700">Virus</text>
            <text x="90" y="125" textAnchor="middle" className="fill-muted-foreground" fontSize="10">RSV · rhinovirus · influenza</text>
          </g>

          {/* Epithelial injury panel */}
          <g transform="translate(180, 30)">
            <rect width="280" height="90" rx="10" fill="hsl(var(--card))" stroke="hsl(var(--border))" />
            <text x="140" y="22" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="700">Epithelial denudation</text>
            {/* Healthy → broken epithelium */}
            <rect x="20" y="38" width="100" height="14" rx="3" fill="hsl(var(--clinical) / 0.2)" stroke="hsl(var(--clinical))" />
            <text x="70" y="76" textAnchor="middle" className="fill-muted-foreground" fontSize="9">intact cilia</text>
            <path d="M130 45 L 160 45" stroke="hsl(var(--clinical))" strokeWidth="2" markerEnd="url(#arr-urti)" />
            {/* Damaged */}
            {[0, 1, 2, 3].map((i) => (
              <rect key={i} x={170 + i * 24} y="38" width="18" height="14" rx="2" fill="hsl(var(--clinical) / 0.4)" stroke="hsl(var(--clinical))">
                <animate attributeName="y" values="38;42;38" dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite" />
              </rect>
            ))}
            <text x="200" y="76" textAnchor="middle" className="fill-clinical" fontSize="9" fontWeight="600">exposed nerves · ↓ cilia</text>
          </g>

          {/* C-fibre exposed */}
          <g>
            <rect x="500" y="30" width="280" height="90" rx="10" fill="hsl(var(--clinical) / 0.08)" stroke="hsl(var(--clinical) / 0.5)" />
            <text x="640" y="52" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="700">Sensitised C-fibres</text>
            <text x="640" y="70" textAnchor="middle" className="fill-muted-foreground" fontSize="10">substance P · neurokinin A</text>
            <text x="640" y="86" textAnchor="middle" className="fill-muted-foreground" fontSize="10">low threshold to mechanical / chemical stimuli</text>
            <text x="640" y="104" textAnchor="middle" className="fill-clinical" fontSize="9" fontWeight="600">persists 6–8 weeks</text>
          </g>

          {/* Trigger row */}
          <g>
            <rect x="40" y="160" width="720" height="50" rx="10" fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
            <text x="400" y="183" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="700">Peri-operative trigger</text>
            <text x="400" y="200" textAnchor="middle" className="fill-muted-foreground" fontSize="10">ETT/LMA insertion · cold dry gas · desflurane · light anaesthesia · secretions</text>
          </g>

          {/* Animated reflex arc - signal travelling */}
          <g>
            <path id="vagal" d="M120 230 Q 400 280 680 230" stroke="hsl(var(--clinical))" strokeWidth="2" fill="none" strokeDasharray="6 4" />
            <text x="400" y="278" textAnchor="middle" className="fill-clinical" fontSize="10" fontWeight="600">vagal afferent → brainstem → vagal efferent</text>
            <circle r="6" fill="hsl(var(--clinical))">
              <animateMotion dur="2.5s" repeatCount="indefinite">
                <mpath href="#vagal" />
              </animateMotion>
            </circle>
            <circle r="6" fill="hsl(var(--clinical))">
              <animateMotion dur="2.5s" begin="1.25s" repeatCount="indefinite">
                <mpath href="#vagal" />
              </animateMotion>
            </circle>
          </g>

          {/* Three reflex outcomes */}
          {/* Bronchospasm */}
          <g transform="translate(40, 290)">
            <rect width="220" height="110" rx="10" fill="hsl(var(--card))" stroke="hsl(var(--border))" />
            <text x="110" y="22" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="700">Bronchospasm</text>
            <rect x="40" y="36" width="140" height="50" rx="6" fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
            <rect x="40" y="36" width="140" height="50" rx="6" fill="hsl(var(--clinical) / 0.4)">
              <animate attributeName="height" values="14;36;14" dur="2s" repeatCount="indefinite" stroke="hsl(var(--border))" strokeWidth="0.75" />
              <animate attributeName="y" values="54;43;54" dur="2s" repeatCount="indefinite" />
            </rect>
            <text x="110" y="102" textAnchor="middle" className="fill-muted-foreground" fontSize="9">M3 mediated</text>
          </g>

          {/* Laryngospasm */}
          <g transform="translate(290, 290)">
            <rect width="220" height="110" rx="10" fill="hsl(var(--card))" stroke="hsl(var(--border))" />
            <text x="110" y="22" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="700">Laryngospasm</text>
            {/* Vocal cords closing */}
            <path d="M40 70 L 100 60" stroke="hsl(var(--clinical))" strokeWidth="3" fill="none">
              <animate attributeName="d" values="M40 70 L 100 60; M40 70 L 100 70; M40 70 L 100 60" dur="2s" repeatCount="indefinite" />
            </path>
            <path d="M180 70 L 120 60" stroke="hsl(var(--clinical))" strokeWidth="3" fill="none">
              <animate attributeName="d" values="M180 70 L 120 60; M180 70 L 120 70; M180 70 L 120 60" dur="2s" repeatCount="indefinite" />
            </path>
            <text x="110" y="102" textAnchor="middle" className="fill-muted-foreground" fontSize="9">superior laryngeal n.</text>
          </g>

          {/* Desaturation */}
          <g transform="translate(540, 290)">
            <rect width="220" height="110" rx="10" fill="hsl(var(--card))" stroke="hsl(var(--border))" />
            <text x="110" y="22" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="700">Desaturation · breath-hold</text>
            <rect x="20" y="50" width="180" height="14" rx="7" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="0.75" />
            <rect x="20" y="50" width="180" height="14" rx="7" fill="hsl(var(--clinical))">
              <animate attributeName="width" values="180;40;180" dur="3s" repeatCount="indefinite" stroke="hsl(var(--border))" strokeWidth="0.75" />
            </rect>
            <text x="110" y="84" textAnchor="middle" className="fill-clinical" fontSize="10" fontWeight="600">↓ SpO₂</text>
            <text x="110" y="102" textAnchor="middle" className="fill-muted-foreground" fontSize="9">2–4× risk in children</text>
          </g>

          {/* Top arrows */}
          <path d="M124 70 L 175 70" stroke="hsl(var(--clinical))" strokeWidth="2" markerEnd="url(#arr-urti)" />
          <path d="M462 70 L 498 70" stroke="hsl(var(--clinical))" strokeWidth="2" markerEnd="url(#arr-urti)" />
        </svg>

        <DiagramAnimationLegend
          items={[
            { glyph: "trigger", label: "Virus / epithelium box", meaning: "viral injury exposing irritant C-fibre nerve endings" },
            { glyph: "process", label: "Pulsing reflex node", meaning: "vagally-mediated bronchoconstriction & laryngospasm" },
            { glyph: "mediator", label: "Travelling dots", meaning: "neurogenic inflammation signalling along sensory afferents" },
            { glyph: "structure", label: "Narrowing airway", meaning: "reflex glottic / bronchial closure on instrumentation" },
            { glyph: "arrow", label: "Solid arrow", meaning: "causal step from trigger to airway event" },
            { glyph: "outcome", label: "Tinted ↓SpO₂ box", meaning: "desaturation — risk amplified 2–4× in children for 6–8 weeks" },
          ]}
        />

        <p className="text-xs text-muted-foreground mt-3 italic">
          Mitigation: postpone elective surgery 2–4 weeks (severe URTI/LRTI ≥6 weeks), prefer LMA over ETT, deepen anaesthesia before instrumentation, humidify gases, avoid desflurane, and have suxamethonium + atropine immediately available for laryngospasm.
        </p>
      </div>
    </div>
  );
};

export default UrtiAirwayDiagram;
