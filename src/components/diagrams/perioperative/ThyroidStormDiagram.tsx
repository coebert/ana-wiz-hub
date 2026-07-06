/**
 * Animated pathophysiology diagram — Thyroid Storm.
 * Shows the cascade: trigger → ↑ free T3/T4 → catecholamine sensitisation
 *   → hypermetabolic state → multi-organ decompensation.
 */
const ThyroidStormDiagram = () => {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b border-border bg-muted/30">
        <h3 className="text-lg font-serif font-bold text-foreground">Thyroid Storm — Pathophysiological Cascade</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Animated cascade from precipitating trigger to multi-organ crisis (mortality &gt; 20%)
        </p>
      </div>

      <div className="p-4 sm:p-6">
        <svg viewBox="0 0 800 420" className="w-full h-auto" role="img" aria-label="Thyroid storm pathophysiology cascade">
          <defs>
            <marker id="arr-thy" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="hsl(var(--clinical))" />
            </marker>
            <linearGradient id="pulse-thy" x1="0" x2="1">
              <stop offset="0%" stopColor="hsl(var(--clinical))" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(var(--clinical))" stopOpacity="1" />
              <stop offset="100%" stopColor="hsl(var(--clinical))" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Trigger */}
          <g>
            <rect x="20" y="40" width="160" height="60" rx="10" fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
            <text x="100" y="68" textAnchor="middle" className="fill-foreground" fontSize="13" fontWeight="600">Trigger</text>
            <text x="100" y="86" textAnchor="middle" className="fill-muted-foreground" fontSize="10">Surgery · sepsis · iodine load</text>
          </g>

          {/* Thyroid gland - pulsing */}
          <g>
            <circle cx="320" cy="70" r="40" fill="hsl(var(--clinical) / 0.15)" stroke="hsl(var(--clinical))" strokeWidth="2">
              <animate attributeName="r" values="38;46;38" dur="1.6s" repeatCount="indefinite" />
              <animate attributeName="fill-opacity" values="0.15;0.35;0.15" dur="1.6s" repeatCount="indefinite" />
            </circle>
            <text x="320" y="68" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="600">Thyroid</text>
            <text x="320" y="84" textAnchor="middle" className="fill-clinical" fontSize="11" fontWeight="700">↑↑ T3 / T4</text>
          </g>

          {/* Hormone particles travelling right */}
          {[0, 0.4, 0.8, 1.2].map((delay, i) => (
            <circle key={i} cx="360" cy="70" r="4" fill="hsl(var(--clinical))">
              <animate attributeName="cx" values="360;540" dur="2s" begin={`${delay}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;1;0" dur="2s" begin={`${delay}s`} repeatCount="indefinite" />
            </circle>
          ))}

          {/* Adrenergic sensitisation */}
          <g>
            <rect x="540" y="40" width="240" height="60" rx="10" fill="hsl(var(--clinical) / 0.08)" stroke="hsl(var(--clinical) / 0.5)" />
            <text x="660" y="64" textAnchor="middle" className="fill-foreground" fontSize="13" fontWeight="600">β-adrenergic sensitisation</text>
            <text x="660" y="84" textAnchor="middle" className="fill-muted-foreground" fontSize="10">↑ catecholamine receptor density · ↑ cAMP</text>
          </g>

          {/* Connector arrows */}
          <path d="M180 70 L 280 70" stroke="hsl(var(--clinical))" strokeWidth="2" markerEnd="url(#arr-thy)" />
          <path d="M360 70 L 540 70" stroke="hsl(var(--clinical))" strokeWidth="2" strokeDasharray="4 4" markerEnd="url(#arr-thy)" />

          {/* Central node — Hypermetabolic state */}
          <g>
            <rect x="260" y="160" width="280" height="60" rx="10" fill="hsl(var(--clinical) / 0.18)" stroke="hsl(var(--clinical))" strokeWidth="2" />
            <text x="400" y="184" textAnchor="middle" className="fill-foreground" fontSize="14" fontWeight="700">Hypermetabolic state</text>
            <text x="400" y="204" textAnchor="middle" className="fill-muted-foreground" fontSize="11">↑↑ O₂ consumption · ↑ heat production · ↑ CO</text>
          </g>

          {/* Down arrow from sensitisation to centre */}
          <path d="M400 100 L 400 158" stroke="hsl(var(--clinical))" strokeWidth="2" markerEnd="url(#arr-thy)" />

          {/* End-organ effects — 4 columns */}
          {[
            { x: 40, label: "Cardiovascular", detail: "Tachy · AF · high-output failure", color: "hsl(var(--clinical))" },
            { x: 230, label: "CNS", detail: "Agitation · seizures · coma", color: "hsl(var(--anatomy))" },
            { x: 420, label: "Thermoregulation", detail: "Hyperthermia > 40 °C", color: "hsl(var(--icu))" },
            { x: 610, label: "GI / Hepatic", detail: "N&V · diarrhoea · jaundice", color: "hsl(var(--pharmacology))" },
          ].map((c, i) => (
            <g key={c.label}>
              <path
                d={`M400 220 Q ${c.x + 75} 260 ${c.x + 75} 295`}
                stroke={c.color}
                strokeWidth="2"
                fill="none"
                opacity="0.7"
              >
                <animate attributeName="stroke-dasharray" values="0 200;200 0" dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
              </path>
              <rect x={c.x} y="295" width="150" height="80" rx="8" fill="hsl(var(--card))" stroke={c.color} strokeWidth="1.5" />
              <text x={c.x + 75} y="320" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="600">{c.label}</text>
              <text x={c.x + 75} y="345" textAnchor="middle" className="fill-muted-foreground" fontSize="10">{c.detail}</text>
              <circle cx={c.x + 75} cy="365" r="3" fill={c.color}>
                <animate attributeName="r" values="3;6;3" dur="1.4s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0.3;1" dur="1.4s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
              </circle>
            </g>
          ))}
        </svg>

        <div className="mt-4 grid sm:grid-cols-2 gap-2 text-sm">
          <div className="p-3 rounded-lg border border-clinical/30 bg-clinical/5">
            <p className="font-semibold text-foreground">Mechanism in one line</p>
            <p className="text-muted-foreground text-xs mt-1">Surge of free T3/T4 up-regulates β-adrenergic receptors → exaggerated catecholamine response → hypermetabolic crisis with multi-organ failure.</p>
          </div>
          <div className="p-3 rounded-lg border border-destructive/30 bg-destructive/5">
            <p className="font-semibold text-foreground">Treatment targets each step</p>
            <p className="text-muted-foreground text-xs mt-1">Propranolol (sensitisation), PTU (synthesis), Lugol's iodine (release), hydrocortisone (T4→T3 conversion), active cooling.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThyroidStormDiagram;
