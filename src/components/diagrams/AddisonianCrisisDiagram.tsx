/**
 * Animated pathophysiology diagram — Addisonian crisis.
 * HPA axis suppression → cortisol/aldosterone collapse →
 * hypotension, hyperkalaemia, hyponatraemia, hypoglycaemia.
 */
const AddisonianCrisisDiagram = () => {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b border-border bg-muted/30">
        <h3 className="text-lg font-serif font-bold text-foreground">Addisonian Crisis — HPA Axis Failure</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Animated collapse of the hypothalamic–pituitary–adrenal axis in acute adrenal insufficiency
        </p>
      </div>

      <div className="p-4 sm:p-6">
        <svg viewBox="0 0 800 440" className="w-full h-auto" role="img" aria-label="HPA axis failure in Addisonian crisis">
          <defs>
            <marker id="arr-add" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="hsl(var(--anatomy))" />
            </marker>
            <marker id="arr-add-x" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="hsl(var(--destructive))" />
            </marker>
          </defs>

          {/* Hypothalamus */}
          <g>
            <ellipse cx="120" cy="60" rx="70" ry="32" fill="hsl(var(--anatomy) / 0.15)" stroke="hsl(var(--anatomy))" strokeWidth="2" />
            <text x="120" y="58" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="700">Hypothalamus</text>
            <text x="120" y="75" textAnchor="middle" className="fill-muted-foreground" fontSize="10">CRH</text>
          </g>

          {/* Pituitary */}
          <g>
            <ellipse cx="120" cy="180" rx="70" ry="32" fill="hsl(var(--anatomy) / 0.15)" stroke="hsl(var(--anatomy))" strokeWidth="2" />
            <text x="120" y="178" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="700">Pituitary</text>
            <text x="120" y="195" textAnchor="middle" className="fill-muted-foreground" fontSize="10">ACTH</text>
          </g>

          {/* Adrenal */}
          <g>
            <ellipse cx="120" cy="320" rx="70" ry="32" fill="hsl(var(--anatomy) / 0.06)" stroke="hsl(var(--destructive))" strokeWidth="2" strokeDasharray="4 4" />
            <text x="120" y="318" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="700">Adrenal cortex</text>
            <text x="120" y="335" textAnchor="middle" className="fill-destructive" fontSize="10" fontWeight="700">SUPPRESSED</text>
          </g>

          {/* Normal axis arrows (CRH down, ACTH down) — fading particles */}
          {[0, 0.6].map((d, i) => (
            <circle key={`h-p-${i}`} cx="120" cy="92" r="4" fill="hsl(var(--anatomy))">
              <animate attributeName="cy" values="92;148" dur="1.5s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;1;0" dur="1.5s" begin={`${d}s`} repeatCount="indefinite" />
            </circle>
          ))}
          {[0.3, 0.9].map((d, i) => (
            <circle key={`p-a-${i}`} cx="120" cy="212" r="4" fill="hsl(var(--anatomy))">
              <animate attributeName="cy" values="212;288" dur="1.5s" begin={`${d}s`} repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;1;0" dur="1.5s" begin={`${d}s`} repeatCount="indefinite" />
            </circle>
          ))}

          {/* Cortisol output FAILED - red X */}
          <g transform="translate(220 310)">
            <line x1="0" y1="0" x2="30" y2="30" stroke="hsl(var(--destructive))" strokeWidth="3" strokeLinecap="round">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="1.2s" repeatCount="indefinite" />
            </line>
            <line x1="30" y1="0" x2="0" y2="30" stroke="hsl(var(--destructive))" strokeWidth="3" strokeLinecap="round">
              <animate attributeName="opacity" values="0.4;1;0.4" dur="1.2s" repeatCount="indefinite" />
            </line>
          </g>

          {/* Failed hormones */}
          <g>
            <rect x="270" y="280" width="220" height="70" rx="10" fill="hsl(var(--destructive) / 0.08)" stroke="hsl(var(--destructive))" />
            <text x="380" y="306" textAnchor="middle" className="fill-foreground" fontSize="13" fontWeight="700">↓↓ Cortisol · ↓↓ Aldosterone</text>
            <text x="380" y="326" textAnchor="middle" className="fill-muted-foreground" fontSize="10">No glucocorticoid · no mineralocorticoid</text>
            <text x="380" y="342" textAnchor="middle" className="fill-muted-foreground" fontSize="10">cover for surgical stress</text>
          </g>

          {/* Four downstream consequences */}
          {[
            { x: 540, y: 60, label: "Hypotension", detail: "Loss of vascular tone, ↓ catecholamine response", color: "hsl(var(--destructive))" },
            { x: 540, y: 150, label: "Hyperkalaemia", detail: "Lost aldosterone → ↑ K⁺ retention", color: "hsl(var(--clinical))" },
            { x: 540, y: 240, label: "Hyponatraemia", detail: "Na⁺ loss + ADH up-regulation", color: "hsl(var(--anatomy))" },
            { x: 540, y: 330, label: "Hypoglycaemia", detail: "Lost gluconeogenesis", color: "hsl(var(--pharmacology))" },
          ].map((c, i) => (
            <g key={c.label}>
              <path d={`M490 315 Q ${c.x - 30} ${c.y + 25} ${c.x} ${c.y + 25}`} stroke={c.color} strokeWidth="2" fill="none" opacity="0.7">
                <animate attributeName="stroke-dasharray" values="0 200;200 0" dur="2s" begin={`${i * 0.25}s`} repeatCount="indefinite" />
              </path>
              <rect x={c.x} y={c.y} width="240" height="50" rx="8" fill="hsl(var(--card))" stroke={c.color} strokeWidth="1.5" />
              <text x={c.x + 15} y={c.y + 22} className="fill-foreground" fontSize="12" fontWeight="700">{c.label}</text>
              <text x={c.x + 15} y={c.y + 40} className="fill-muted-foreground" fontSize="10">{c.detail}</text>
              <circle cx={c.x + 220} cy={c.y + 25} r="4" fill={c.color}>
                <animate attributeName="opacity" values="1;0.3;1" dur="1.4s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
              </circle>
            </g>
          ))}
        </svg>

        <div className="mt-4 p-3 rounded-lg border border-destructive/30 bg-destructive/5">
          <p className="font-semibold text-foreground text-sm">Emergency management</p>
          <p className="text-muted-foreground text-xs mt-1">
            IV hydrocortisone 100 mg stat (then 200 mg/24 h) · 0.9% saline bolus (20 mL/kg) · 10% dextrose for hypoglycaemia · treat hyperkalaemia · search for and treat the precipitant.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddisonianCrisisDiagram;
