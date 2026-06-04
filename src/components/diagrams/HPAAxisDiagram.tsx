import { useState } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

type Highlight = "normal" | "stress" | "exogenousSteroid" | "primaryAddison" | "secondary";

interface Scenario {
  id: Highlight;
  label: string;
  crh: "low" | "normal" | "high" | "suppressed";
  acth: "low" | "normal" | "high" | "suppressed" | "very-high";
  cortisol: "low" | "normal" | "high" | "very-high";
  feedback: string;
  description: string;
}

const scenarios: Record<Highlight, Scenario> = {
  normal: {
    id: "normal",
    label: "Normal (resting)",
    crh: "normal",
    acth: "normal",
    cortisol: "normal",
    feedback: "Long loop: cortisol inhibits CRH (hypothalamus) and ACTH (pituitary). Short loop: ACTH inhibits CRH. Diurnal rhythm peaks ~08:00, trough ~midnight.",
    description: "Basal pulsatile secretion. Plasma cortisol ≈ 200–700 nmol/L (am).",
  },
  stress: {
    id: "stress",
    label: "Surgical stress",
    crh: "high",
    acth: "high",
    cortisol: "very-high",
    feedback: "Long and short loops overridden by afferent sympathetic input plus IL-1, IL-6, TNF-α. Diurnal rhythm abolished.",
    description: "Major surgery: cortisol ~1000–1500 nmol/L, peaks 4–6 h, sustained 24–72 h.",
  },
  exogenousSteroid: {
    id: "exogenousSteroid",
    label: "Exogenous steroid",
    crh: "suppressed",
    acth: "suppressed",
    cortisol: "low",
    feedback: "Synthetic glucocorticoid drives the long loop maximally → CRH + ACTH suppressed → adrenal atrophy. Risk of Addisonian crisis if abruptly withdrawn or under stress.",
    description: ">5 mg prednisolone for >3 weeks (or equivalent) → assume HPA suppression — give perioperative steroid cover.",
  },
  primaryAddison: {
    id: "primaryAddison",
    label: "Primary adrenal failure",
    crh: "high",
    acth: "very-high",
    cortisol: "low",
    feedback: "Adrenal cortex destroyed. No cortisol → long loop collapses → CRH and ACTH rise dramatically. ACTH-derived MSH → hyperpigmentation.",
    description: "Addison's disease. Aldosterone also low → hyponatraemia, hyperkalaemia, hypovolaemia.",
  },
  secondary: {
    id: "secondary",
    label: "Secondary (pituitary) failure",
    crh: "high",
    acth: "low",
    cortisol: "low",
    feedback: "Pituitary cannot make ACTH. CRH driven high but no response. Aldosterone preserved (RAAS-driven) — no hyperkalaemia.",
    description: "No hyperpigmentation (low ACTH/MSH). Other anterior pituitary axes often also affected.",
  },
};

const levelStyles = {
  low: { color: "hsl(220 60% 55%)", label: "↓ low", bg: "bg-blue-500/10 border-blue-500/30 text-blue-500" },
  suppressed: { color: "hsl(220 70% 45%)", label: "↓↓ suppressed", bg: "bg-blue-600/15 border-blue-600/40 text-blue-600" },
  normal: { color: "hsl(var(--muted-foreground))", label: "= normal", bg: "bg-secondary/40 border-border text-muted-foreground" },
  high: { color: "hsl(25 85% 55%)", label: "↑ high", bg: "bg-amber-500/10 border-amber-500/30 text-amber-500" },
  "very-high": { color: "hsl(0 70% 55%)", label: "↑↑ very high", bg: "bg-red-500/10 border-red-500/30 text-red-500" },
};

export const HPAAxisDiagram = () => {
  const [scenario, setScenario] = useState<Highlight>("normal");
  const data = scenarios[scenario];

  const arrowOpacity = (level: string) => {
    if (level === "suppressed") return 0.15;
    if (level === "low") return 0.4;
    if (level === "normal") return 0.8;
    return 1;
  };
  const arrowWidth = (level: string) => {
    if (level === "suppressed") return 1;
    if (level === "low") return 1.6;
    if (level === "normal") return 2.6;
    if (level === "high") return 3.6;
    return 4.6;
  };

  const loopOpacity = (lvl: string) =>
    lvl === "suppressed" ? 0.18
    : lvl === "low" ? 0.3
    : lvl === "normal" ? 0.7
    : lvl === "high" ? 0.95
    : 1;

  return (
    <DiagramFigure
      id="hpa-axis-diagram"
      title="HPA axis — CRH → ACTH → cortisol → target receptors"
      description="Simplified vertical schematic of the hypothalamic-pituitary-adrenal axis. Driving hormones (orange, solid) flow top-down; negative feedback (blue, dashed) returns from cortisol to pituitary and hypothalamus. Cortisol acts at glucocorticoid (GR) receptors in liver, muscle, immune cells and bone, with cross-reactivity at mineralocorticoid (MR) receptors in the kidney (normally inactivated by 11β-HSD2). Zona glomerulosa aldosterone is driven by the RAAS / K⁺, not ACTH."
    >
      <div className="space-y-4">
        {/* Scenario selector */}
        <div className="flex flex-wrap gap-2">
          {(Object.values(scenarios) as Scenario[]).map((s) => (
            <button
              key={s.id}
              onClick={() => setScenario(s.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                scenario === s.id
                  ? "bg-primary/15 border-primary/50 text-primary"
                  : "bg-secondary/50 border-border text-muted-foreground hover:bg-secondary"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* SVG axis */}
          <div className="lg:col-span-3 rounded-lg border border-border bg-card p-4">
            <svg viewBox="0 0 420 560" className="w-full" role="img" aria-label="HPA axis schematic">
              <defs>
                <marker id="arrow-stim-hpa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(25 85% 55%)" />
                </marker>
                <marker id="arrow-inhib-hpa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
                  <path d="M 0 4 L 10 4 L 10 6 L 0 6 z" fill="hsl(220 60% 55%)" />
                </marker>
                <marker id="arrow-target-hpa" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(140 50% 45%)" />
                </marker>
              </defs>

              {/* Central column at x=210 */}

              {/* === Hypothalamus === */}
              <g>
                <ellipse cx="210" cy="42" rx="110" ry="30" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" strokeWidth="1" />
                <text x="210" y="38" fontSize="13" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="700">Hypothalamus</text>
                <text x="210" y="54" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="middle">paraventricular nucleus</text>
              </g>

              {/* CRH badge */}
              <g>
                <rect x="155" y="78" width="110" height="22" rx="11" fill="hsl(var(--card))" stroke={levelStyles[data.crh].color} strokeWidth="1.6" />
                <text x="210" y="93" fontSize="10" fill={levelStyles[data.crh].color} textAnchor="middle" fontWeight="700">
                  CRH · {levelStyles[data.crh].label}
                </text>
              </g>

              {/* CRH arrow */}
              <line x1="210" y1="100" x2="210" y2="148"
                stroke="hsl(25 85% 55%)" strokeWidth={arrowWidth(data.crh)}
                opacity={arrowOpacity(data.crh)} markerEnd="url(#arrow-stim-hpa)" />
              <text x="222" y="126" fontSize="8" fill="hsl(25 75% 50%)" fontWeight="600" opacity={arrowOpacity(data.crh)}>
                hypophyseal portal
              </text>

              {/* === Anterior pituitary === */}
              <g>
                <ellipse cx="210" cy="170" rx="90" ry="22" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" strokeWidth="1" />
                <text x="210" y="167" fontSize="11" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="700">Anterior Pituitary</text>
                <text x="210" y="180" fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="middle">corticotrophs · POMC → ACTH</text>
              </g>

              {/* ACTH badge */}
              <g>
                <rect x="160" y="198" width="100" height="22" rx="11" fill="hsl(var(--card))" stroke={levelStyles[data.acth].color} strokeWidth="1.6" />
                <text x="210" y="213" fontSize="10" fill={levelStyles[data.acth].color} textAnchor="middle" fontWeight="700">
                  ACTH · {levelStyles[data.acth].label}
                </text>
              </g>

              {/* ACTH arrow */}
              <line x1="210" y1="220" x2="210" y2="280"
                stroke="hsl(25 85% 55%)" strokeWidth={arrowWidth(data.acth)}
                opacity={arrowOpacity(data.acth)} markerEnd="url(#arrow-stim-hpa)" />
              <text x="222" y="256" fontSize="8" fill="hsl(25 75% 50%)" fontWeight="600" opacity={arrowOpacity(data.acth)}>
                systemic circulation
              </text>

              {/* === Adrenal cortex === */}
              <g>
                <rect x="120" y="298" width="180" height="80" rx="6" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" strokeWidth="1" />
                <text x="210" y="313" fontSize="11" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="700">Adrenal Cortex</text>

                {/* Zona glomerulosa — RAAS, dimmed */}
                <rect x="130" y="320" width="160" height="14" fill="hsl(45 50% 55%)" opacity="0.10" />
                <text x="136" y="330" fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="start" opacity="0.7">Z. glomerulosa</text>
                <text x="284" y="330" fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="end" fontStyle="italic" opacity="0.7">aldosterone (RAAS · K⁺)</text>

                {/* Zona fasciculata — ACTH target, highlighted */}
                <rect x="130" y="336" width="160" height="14" fill="hsl(25 70% 55%)" opacity="0.28" />
                <text x="136" y="346" fontSize="8" fill={levelStyles[data.cortisol].color} textAnchor="start" fontWeight="700">Z. fasciculata</text>
                <text x="284" y="346" fontSize="8" fill={levelStyles[data.cortisol].color} textAnchor="end" fontStyle="italic" fontWeight="700">cortisol</text>

                {/* Zona reticularis */}
                <rect x="130" y="352" width="160" height="14" fill="hsl(310 50% 55%)" opacity="0.18" />
                <text x="136" y="362" fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="start" fontWeight="600">Z. reticularis</text>
                <text x="284" y="362" fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="end" fontStyle="italic">androgens (DHEA)</text>
              </g>

              {/* RAAS callout to glomerulosa */}
              <g opacity="0.55">
                <line x1="60" y1="327" x2="128" y2="327" stroke="hsl(var(--muted-foreground))" strokeWidth="1" strokeDasharray="2 2" markerEnd="url(#arrow-stim-hpa)" />
                <text x="60" y="319" fontSize="7" fill="hsl(var(--muted-foreground))" fontWeight="600">RAAS / K⁺</text>
                <text x="60" y="338" fontSize="7" fill="hsl(var(--muted-foreground))" fontStyle="italic">(not ACTH)</text>
              </g>

              {/* Cortisol badge */}
              <g>
                <rect x="135" y="386" width="150" height="22" rx="11" fill="hsl(var(--card))" stroke={levelStyles[data.cortisol].color} strokeWidth="1.8" />
                <text x="210" y="401" fontSize="10" fill={levelStyles[data.cortisol].color} textAnchor="middle" fontWeight="700">
                  Cortisol · {levelStyles[data.cortisol].label}
                </text>
              </g>

              {/* Cortisol → target receptors arrow */}
              <line x1="210" y1="408" x2="210" y2="448"
                stroke="hsl(140 50% 45%)" strokeWidth={arrowWidth(data.cortisol)}
                opacity={arrowOpacity(data.cortisol)} markerEnd="url(#arrow-target-hpa)" />
              <text x="222" y="432" fontSize="8" fill="hsl(140 45% 40%)" fontWeight="600" opacity={arrowOpacity(data.cortisol)}>
                bound to CBG (90%)
              </text>

              {/* === Target receptors === */}
              <g>
                <rect x="20" y="450" width="380" height="90" rx="6" fill="hsl(var(--background))" stroke="hsl(var(--border))" strokeWidth="1" />
                <text x="210" y="465" fontSize="10" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="700">
                  Target receptors
                </text>

                {/* GR column */}
                <g>
                  <rect x="32" y="473" width="248" height="58" rx="4" fill="hsl(140 50% 45% / 0.08)" stroke="hsl(140 50% 45% / 0.4)" strokeWidth="1" />
                  <text x="156" y="486" fontSize="9" fill="hsl(140 45% 40%)" textAnchor="middle" fontWeight="700">
                    Glucocorticoid receptor (GR · intracellular)
                  </text>
                  <text x="40" y="500" fontSize="7.5" fill="hsl(var(--muted-foreground))">
                    • Liver: ↑gluconeogenesis, ↑glycogen
                  </text>
                  <text x="40" y="510" fontSize="7.5" fill="hsl(var(--muted-foreground))">
                    • Muscle / adipose: proteolysis, lipolysis
                  </text>
                  <text x="40" y="520" fontSize="7.5" fill="hsl(var(--muted-foreground))">
                    • Immune: ↓cytokines, ↓COX-2, ↓PLA₂
                  </text>
                  <text x="40" y="529" fontSize="7.5" fill="hsl(var(--muted-foreground))">
                    • Vasculature: permissive for catecholamines
                  </text>
                </g>

                {/* MR column */}
                <g>
                  <rect x="288" y="473" width="112" height="58" rx="4" fill="hsl(220 60% 55% / 0.08)" stroke="hsl(220 60% 55% / 0.4)" strokeWidth="1" />
                  <text x="344" y="486" fontSize="9" fill="hsl(220 55% 45%)" textAnchor="middle" fontWeight="700">MR (kidney)</text>
                  <text x="294" y="500" fontSize="7.5" fill="hsl(var(--muted-foreground))">Cortisol = MR</text>
                  <text x="294" y="510" fontSize="7.5" fill="hsl(var(--muted-foreground))">agonist, but</text>
                  <text x="294" y="520" fontSize="7.5" fill="hsl(var(--muted-foreground))">11β-HSD2 → cortisone</text>
                  <text x="294" y="529" fontSize="7.5" fill="hsl(var(--muted-foreground))">protects MR locally</text>
                </g>
              </g>

              {/* === Feedback loops === */}
              {(() => {
                const longOp = loopOpacity(data.cortisol);
                const shortOp = loopOpacity(data.acth);
                const longColor = data.cortisol === "very-high" ? "hsl(220 75% 48%)" : "hsl(220 60% 55%)";
                const shortColor = data.acth === "very-high" ? "hsl(260 70% 52%)" : "hsl(260 55% 60%)";
                const longW = data.cortisol === "very-high" ? 2.4 : 1.8;
                const shortW = data.acth === "very-high" ? 2.2 : 1.6;
                return (
                  <>
                    {/* LONG LOOP — cortisol ⊣ pituitary + hypothalamus (right arc) */}
                    <g opacity={longOp}>
                      <path
                        d="M 300 397 Q 388 397 388 230 Q 388 80 318 60"
                        fill="none"
                        stroke={longColor}
                        strokeWidth={longW}
                        strokeDasharray="6 4"
                        markerEnd="url(#arrow-inhib-hpa)"
                      >
                        <animate attributeName="stroke-dashoffset" from="0" to="-40" dur="5s" repeatCount="indefinite" />
                      </path>
                      <text x="346" y="244" fontSize="9" fill={longColor} fontWeight="700" textAnchor="middle">long loop</text>
                      <text x="346" y="255" fontSize="7.5" fill={longColor} textAnchor="middle">cortisol ⊣ ACTH</text>
                      <text x="346" y="264" fontSize="7.5" fill={longColor} textAnchor="middle">cortisol ⊣ CRH</text>
                    </g>

                    {/* SHORT LOOP — ACTH ⊣ CRH (left tight arc) */}
                    <g opacity={shortOp}>
                      <path
                        d="M 160 209 Q 90 180 90 130 Q 90 88 155 78"
                        fill="none"
                        stroke={shortColor}
                        strokeWidth={shortW}
                        strokeDasharray="4 2"
                        markerEnd="url(#arrow-inhib-hpa)"
                      >
                        <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="2s" repeatCount="indefinite" />
                      </path>
                      <text x="58" y="142" fontSize="8" fill={shortColor} fontWeight="700">short loop</text>
                      <text x="58" y="152" fontSize="7.5" fill={shortColor}>ACTH ⊣ CRH</text>
                    </g>
                  </>
                );
              })()}

              {/* Stress inputs */}
              {scenario === "stress" && (
                <g className="animate-pulse">
                  <line x1="40" y1="42" x2="98" y2="42" stroke="hsl(0 75% 55%)" strokeWidth="2" markerEnd="url(#arrow-stim-hpa)" />
                  <text x="40" y="30" fontSize="8" fill="hsl(0 75% 55%)" fontWeight="700">surgery · IL-6 · TNF-α · sympathetic</text>
                </g>
              )}
            </svg>

            {/* Legend below svg */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1"><span className="inline-block w-3 h-[2px] bg-[hsl(25_85%_55%)]" />stimulation</span>
              <span className="flex items-center gap-1"><span className="inline-block w-3 h-[2px] bg-[hsl(140_50%_45%)]" />cortisol → target</span>
              <span className="flex items-center gap-1"><span className="inline-block w-3 border-t-2 border-dashed border-[hsl(220_60%_55%)]" />long loop (slow)</span>
              <span className="flex items-center gap-1"><span className="inline-block w-3 border-t-2 border-dashed border-[hsl(260_55%_60%)]" />short loop (fast)</span>
            </div>
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-2 space-y-3">
            <div className="rounded-lg border border-border bg-card p-3">
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold mb-1">{data.label}</p>
              <p className="text-xs text-foreground/90 leading-relaxed mb-2">{data.description}</p>
              <p className="text-[11px] text-muted-foreground leading-relaxed">{data.feedback}</p>
            </div>

            <div className="rounded-lg border border-border bg-card p-3 space-y-2">
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold">Hormone levels</p>
              {[
                { key: "CRH", level: data.crh },
                { key: "ACTH", level: data.acth },
                { key: "Cortisol", level: data.cortisol },
              ].map((row) => (
                <div key={row.key} className={`flex items-center justify-between rounded-md border px-2 py-1.5 ${levelStyles[row.level].bg}`}>
                  <span className="text-xs font-semibold">{row.key}</span>
                  <span className="text-[11px] font-medium">{levelStyles[row.level].label}</span>
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-border bg-secondary/20 p-3">
              <p className="text-xs font-semibold text-foreground mb-1">Anaesthetic relevance</p>
              <ul className="text-[11px] text-muted-foreground leading-relaxed list-disc list-inside space-y-1">
                <li>Steroid cover: hydrocortisone 25–100 mg IV by surgical magnitude</li>
                <li>Etomidate inhibits 11β-hydroxylase → adrenal suppression ~24 h after a single dose</li>
                <li>Regional anaesthesia attenuates the cortisol stress response</li>
                <li>Synacthen (250 µg) test: cortisol &gt;500 nmol/L at 30 min excludes adrenal insufficiency</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default HPAAxisDiagram;
