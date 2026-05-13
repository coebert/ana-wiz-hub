import DiagramAnimationLegend from "./DiagramAnimationLegend";

/**
 * Animated pathophysiology diagram — Obstructive Sleep Apnoea.
 * Cyclical: sleep onset → loss of pharyngeal dilator tone → upper airway collapse
 *   → apnoea/hypopnoea → hypoxaemia + hypercapnia → sympathetic surge & arousal
 *   → airway reopens → cycle repeats. Long-term: HTN, AF, RV strain.
 */
const OsaCycleDiagram = () => {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b border-border bg-muted/30">
        <h3 className="text-lg font-serif font-bold text-foreground">Obstructive Sleep Apnoea — Cyclical Pathophysiology</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Repeating cycle of airway collapse, desaturation and arousal — driver of perioperative risk
        </p>
      </div>

      <div className="p-4 sm:p-6">
        <svg viewBox="0 0 800 440" className="w-full h-auto" role="img" aria-label="OSA pathophysiology cycle">
          <defs>
            <marker id="arr-osa" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="hsl(var(--clinical))" />
            </marker>
          </defs>

          {/* Animated pharynx (open <-> closed) */}
          <g transform="translate(60, 60)">
            <rect width="240" height="200" rx="12" fill="hsl(var(--card))" stroke="hsl(var(--border))" />
            <text x="120" y="22" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="600">Upper airway</text>
            {/* Hard palate / tongue outlines */}
            <path d="M40 50 Q 80 45 120 55 Q 160 45 200 50" stroke="hsl(var(--border))" strokeWidth="2" fill="none" />
            <path d="M40 170 Q 80 175 120 165 Q 160 175 200 170" stroke="hsl(var(--border))" strokeWidth="2" fill="none" />
            {/* Animated tongue/soft palate collapsing */}
            <path d="M40 90 Q 120 110 200 90 L 200 130 Q 120 110 40 130 Z" fill="hsl(var(--clinical) / 0.4)" stroke="hsl(var(--clinical))">
              <animate attributeName="d"
                values="M40 90 Q 120 110 200 90 L 200 130 Q 120 110 40 130 Z;
                        M40 90 Q 120 130 200 90 L 200 130 Q 120 110 40 130 Z;
                        M40 90 Q 120 110 200 90 L 200 130 Q 120 110 40 130 Z"
                dur="4s" repeatCount="indefinite" />
            </path>
            <text x="120" y="194" textAnchor="middle" className="fill-muted-foreground" fontSize="10">↓ pharyngeal dilator tone</text>
          </g>

          {/* Cycle nodes positioned around an oval */}
          {/* Node A: Apnoea/hypopnoea */}
          <g>
            <rect x="360" y="50" width="180" height="56" rx="10" fill="hsl(var(--clinical) / 0.1)" stroke="hsl(var(--clinical))" />
            <text x="450" y="74" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="700">Apnoea / hypopnoea</text>
            <text x="450" y="92" textAnchor="middle" className="fill-muted-foreground" fontSize="10">cessation of airflow ≥10 s</text>
          </g>

          {/* Node B: Hypoxaemia / hypercapnia with animated SpO2 dropping */}
          <g>
            <rect x="580" y="130" width="200" height="80" rx="10" fill="hsl(var(--card))" stroke="hsl(var(--border))" />
            <text x="680" y="152" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="700">Hypoxaemia + hypercapnia</text>
            {/* SpO2 bar */}
            <rect x="600" y="165" width="160" height="10" rx="5" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="0.75" />
            <rect x="600" y="165" width="160" height="10" rx="5" fill="hsl(var(--clinical))">
              <animate attributeName="width" values="160;60;160" dur="4s" repeatCount="indefinite" stroke="hsl(var(--border))" strokeWidth="0.75" />
            </rect>
            <text x="680" y="195" textAnchor="middle" className="fill-clinical" fontSize="10" fontWeight="700">↓ SpO₂ · ↑ PaCO₂</text>
          </g>

          {/* Node C: Sympathetic surge */}
          <g>
            <rect x="500" y="240" width="220" height="66" rx="10" fill="hsl(var(--clinical) / 0.1)" stroke="hsl(var(--clinical))" />
            <text x="610" y="262" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="700">Sympathetic surge</text>
            <text x="610" y="280" textAnchor="middle" className="fill-muted-foreground" fontSize="10">↑ HR · ↑ BP · ↑ catecholamines</text>
            <text x="610" y="296" textAnchor="middle" className="fill-muted-foreground" fontSize="9">chemoreceptor activation</text>
          </g>

          {/* Node D: Arousal / airway reopens */}
          <g>
            <rect x="320" y="320" width="220" height="66" rx="10" fill="hsl(var(--card))" stroke="hsl(var(--border))" />
            <text x="430" y="342" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="700">Cortical arousal</text>
            <text x="430" y="360" textAnchor="middle" className="fill-muted-foreground" fontSize="10">dilator tone restored · airway reopens</text>
            <text x="430" y="376" textAnchor="middle" className="fill-muted-foreground" fontSize="9">sleep fragmentation</text>
          </g>

          {/* Cycle arrows */}
          <path d="M300 130 Q 340 90 360 80" stroke="hsl(var(--clinical))" strokeWidth="2" fill="none" markerEnd="url(#arr-osa)">
            <animate attributeName="stroke-opacity" values="0.4;1;0.4" dur="4s" repeatCount="indefinite" />
          </path>
          <path d="M540 90 Q 600 110 600 135" stroke="hsl(var(--clinical))" strokeWidth="2" fill="none" markerEnd="url(#arr-osa)">
            <animate attributeName="stroke-opacity" values="0.4;1;0.4" dur="4s" begin="1s" repeatCount="indefinite" />
          </path>
          <path d="M680 215 Q 660 235 640 245" stroke="hsl(var(--clinical))" strokeWidth="2" fill="none" markerEnd="url(#arr-osa)">
            <animate attributeName="stroke-opacity" values="0.4;1;0.4" dur="4s" begin="2s" repeatCount="indefinite" />
          </path>
          <path d="M540 295 Q 500 320 500 330" stroke="hsl(var(--clinical))" strokeWidth="2" fill="none" markerEnd="url(#arr-osa)">
            <animate attributeName="stroke-opacity" values="0.4;1;0.4" dur="4s" begin="3s" repeatCount="indefinite" />
          </path>
          <path d="M320 350 Q 220 320 180 270" stroke="hsl(var(--clinical))" strokeWidth="2" fill="none" markerEnd="url(#arr-osa)" strokeDasharray="6 4" />

          {/* Long term consequences */}
          <g>
            <rect x="40" y="320" width="240" height="100" rx="10" fill="hsl(var(--clinical) / 0.08)" stroke="hsl(var(--clinical) / 0.5)" />
            <text x="160" y="342" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="700">Chronic consequences</text>
            <text x="160" y="362" textAnchor="middle" className="fill-muted-foreground" fontSize="10">systemic + pulmonary HTN</text>
            <text x="160" y="378" textAnchor="middle" className="fill-muted-foreground" fontSize="10">AF · RV strain · stroke risk</text>
            <text x="160" y="394" textAnchor="middle" className="fill-muted-foreground" fontSize="10">opioid sensitivity ↑↑</text>
            <text x="160" y="412" textAnchor="middle" className="fill-clinical" fontSize="10" fontWeight="700">peri-op risk amplified</text>
          </g>
        </svg>

        <DiagramAnimationLegend
          items={[
            { glyph: "structure", label: "Collapsing pharynx", meaning: "loss of dilator tone → airway closes during inspiration" },
            { glyph: "process", label: "Apnoea/hypopnoea node", meaning: "active cessation of airflow ≥10 s" },
            { glyph: "oscillate", label: "Shrinking SpO₂ bar", meaning: "falling oxygen saturation with rising PaCO₂" },
            { glyph: "arrow", label: "Curved cycle arrows", meaning: "self-perpetuating loop — sympathetic surge → arousal → reopening" },
            { glyph: "outcome", label: "Tinted consequence box", meaning: "chronic sequelae — HTN, AF, RV strain, opioid sensitivity" },
          ]}
        />

        <p className="text-xs text-muted-foreground mt-3 italic">
          The cycle explains every peri-operative concern: opioids and sedatives prolong apnoeas (↓ arousal), supine posture worsens collapse, and residual NMB delays dilator recovery. CPAP splints the airway open and breaks the cycle.
        </p>
      </div>
    </div>
  );
};

export default OsaCycleDiagram;
