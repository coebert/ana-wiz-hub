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
    feedback: "Both long and short loops are overridden by afferent sympathetic input, IL-1, IL-6 and TNF-α to the hypothalamus. Diurnal rhythm abolished.",
    description: "Major surgery: cortisol may rise to ~1000–1500 nmol/L within hours, peaks at 4–6 h, sustained for 24–72 h.",
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
    feedback: "Adrenal cortex destroyed. Long loop collapses (no cortisol) → CRH and ACTH rise dramatically; short loop (ACTH → CRH) cannot compensate. ACTH-derived MSH → hyperpigmentation.",
    description: "Addison's disease. Aldosterone also low → hyponatraemia, hyperkalaemia, hypovolaemia.",
  },
  secondary: {
    id: "secondary",
    label: "Secondary (pituitary) failure",
    crh: "high",
    acth: "low",
    cortisol: "low",
    feedback: "Pituitary cannot make ACTH. Long loop drives CRH up but no response; short loop is absent. Aldosterone preserved (RAAS-driven) — no hyperkalaemia.",
    description: "No hyperpigmentation (low ACTH/MSH). Other anterior pituitary axes often also affected.",
  },
};

const levelStyles = {
  low: { color: "hsl(220 60% 55%)", label: "↓ low", bg: "bg-blue-500/10 border-blue-500/30 text-blue-500" },
  suppressed: { color: "hsl(220 70% 45%)", label: "↓↓ suppressed", bg: "bg-blue-600/15 border-blue-600/40 text-blue-600" },
  normal: { color: "hsl(var(--muted-foreground))", label: "→ normal", bg: "bg-secondary/40 border-border text-muted-foreground" },
  high: { color: "hsl(25 85% 55%)", label: "↑ high", bg: "bg-amber-500/10 border-amber-500/30 text-amber-500" },
  "very-high": { color: "hsl(0 70% 55%)", label: "↑↑ very high", bg: "bg-red-500/10 border-red-500/30 text-red-500" },
};

export const HPAAxisDiagram = () => {
  const [scenario, setScenario] = useState<Highlight>("normal");
  const data = scenarios[scenario];

  const arrowOpacity = (level: string) => {
    if (level === "suppressed") return 0.15;
    if (level === "low") return 0.4;
    if (level === "normal") return 0.75;
    if (level === "high") return 1;
    return 1;
  };
  const arrowWidth = (level: string) => {
    if (level === "suppressed") return 1;
    if (level === "low") return 1.5;
    if (level === "normal") return 2.4;
    if (level === "high") return 3.4;
    return 4.4;
  };

  return (
    <DiagramFigure
      id="hpa-axis-diagram"
      title="HPA axis"
      description="Auto-generated wrapper for the HPA axis anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
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
            <svg viewBox="0 0 360 480" className="w-full" role="img" aria-label="HPA axis schematic">
              <defs>
                <marker id="arrow-stim" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(25 85% 55%)" />
                </marker>
                <marker id="arrow-inhib" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                  <path d="M 0 4 L 10 4 L 10 6 L 0 6 z" fill="hsl(220 60% 55%)" />
                </marker>
              </defs>
  
              {/* === Hypothalamus === */}
              <g>
                <ellipse cx="180" cy="50" rx="105" ry="32" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" strokeWidth="1" />
                <text x="180" y="44" fontSize="13" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="700">Hypothalamus</text>
                <text x="180" y="60" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="middle">Paraventricular nucleus</text>
                {/* CRH badge */}
                <g>
                  <rect x="125" y="78" width="110" height="22" rx="11" fill="hsl(var(--card))" stroke={levelStyles[data.crh].color} strokeWidth="1.5" />
                  <text x="180" y="93" fontSize="10" fill={levelStyles[data.crh].color} textAnchor="middle" fontWeight="700">
                    CRH · {levelStyles[data.crh].label}
                  </text>
                </g>
              </g>
  
              {/* === CRH arrow down === */}
              <line x1="180" y1="100" x2="180" y2="148"
                stroke="hsl(25 85% 55%)" strokeWidth={arrowWidth(data.crh)}
                opacity={arrowOpacity(data.crh)} markerEnd="url(#arrow-stim)" />
              <text x="195" y="125" fontSize="8" fill="hsl(25 75% 50%)" fontWeight="600" opacity={arrowOpacity(data.crh)}>
                hypothalamic-hypophyseal portal
              </text>
  
              {/* === Anterior pituitary === */}
              <g>
                <ellipse cx="180" cy="170" rx="80" ry="22" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" strokeWidth="1" />
                <text x="180" y="167" fontSize="11" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="700">Anterior Pituitary</text>
                <text x="180" y="180" fontSize="8" fill="hsl(var(--muted-foreground))" textAnchor="middle">corticotrophs (POMC → ACTH)</text>
                <g>
                  <rect x="130" y="195" width="100" height="22" rx="11" fill="hsl(var(--card))" stroke={levelStyles[data.acth].color} strokeWidth="1.5" />
                  <text x="180" y="210" fontSize="10" fill={levelStyles[data.acth].color} textAnchor="middle" fontWeight="700">
                    ACTH · {levelStyles[data.acth].label}
                  </text>
                </g>
              </g>
  
              {/* === ACTH arrow down === */}
              <line x1="180" y1="217" x2="180" y2="275"
                stroke="hsl(25 85% 55%)" strokeWidth={arrowWidth(data.acth)}
                opacity={arrowOpacity(data.acth)} markerEnd="url(#arrow-stim)" />
              <text x="195" y="252" fontSize="8" fill="hsl(25 75% 50%)" fontWeight="600" opacity={arrowOpacity(data.acth)}>
                systemic circulation
              </text>
  
              {/* === Adrenal cortex === */}
              <g>
                <rect x="100" y="293" width="160" height="80" rx="6" fill="hsl(var(--secondary))" stroke="hsl(var(--border))" strokeWidth="1" />
                <text x="180" y="308" fontSize="11" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="700">Adrenal Cortex</text>
                {/* zones */}
                <g fontSize="8" fill="hsl(var(--muted-foreground))">
                  <rect x="110" y="316" width="140" height="14" fill="hsl(45 50% 55%)" opacity="0.18" />
                  <text x="116" y="326" textAnchor="start" fontWeight="600">Zona glomerulosa</text>
                  <text x="244" y="326" textAnchor="end" fontStyle="italic">aldosterone</text>
  
                  <rect x="110" y="332" width="140" height="14" fill="hsl(25 70% 55%)" opacity="0.25" />
                  <text x="116" y="342" textAnchor="start" fontWeight="700" fill={levelStyles[data.cortisol].color}>Zona fasciculata</text>
                  <text x="244" y="342" textAnchor="end" fontStyle="italic" fontWeight="700" fill={levelStyles[data.cortisol].color}>cortisol</text>
  
                  <rect x="110" y="348" width="140" height="14" fill="hsl(310 50% 55%)" opacity="0.18" />
                  <text x="116" y="358" textAnchor="start" fontWeight="600">Zona reticularis</text>
                  <text x="244" y="358" textAnchor="end" fontStyle="italic">androgens (DHEA)</text>
                </g>
                <g>
                  <rect x="100" y="378" width="160" height="22" rx="11" fill="hsl(var(--card))" stroke={levelStyles[data.cortisol].color} strokeWidth="1.5" />
                  <text x="180" y="393" fontSize="10" fill={levelStyles[data.cortisol].color} textAnchor="middle" fontWeight="700">
                    Cortisol · {levelStyles[data.cortisol].label}
                  </text>
                </g>
              </g>
  
              {/* === Adrenal medulla (context) === */}
              <g opacity="0.45">
                <rect x="100" y="408" width="160" height="22" rx="3" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="3 2" />
                <text x="180" y="423" fontSize="9" fill="hsl(var(--muted-foreground))" textAnchor="middle" fontStyle="italic">
                  Medulla — adrenaline / NA (separate sympathetic axis)
                </text>
              </g>
  
              {/* === Negative feedback loops === */}
              {(() => {
                const loopStrength = (lvl: string) =>
                  lvl === "suppressed" ? 0.18
                  : lvl === "low" ? 0.3
                  : lvl === "normal" ? 0.7
                  : lvl === "high" ? 0.95
                  : 1;
                const longOp = loopStrength(data.cortisol);
                const shortOp = loopStrength(data.acth);
                const longColor = data.cortisol === "very-high" ? "hsl(220 75% 48%)" : "hsl(220 60% 55%)";
                const shortColor = data.acth === "very-high" ? "hsl(260 70% 52%)" : "hsl(260 55% 60%)";
                const longW = data.cortisol === "very-high" ? 2.2 : 1.6;
                const shortW = data.acth === "very-high" ? 2 : 1.4;
                return (
                  <>
                    {/* LONG LOOP A — cortisol ⊣ ACTH (left arc) */}
                    <g opacity={longOp}>
                      <path
                        d="M 100 388 Q 30 320 30 230 Q 30 195 100 195"
                        fill="none"
                        stroke={longColor}
                        strokeWidth={longW}
                        strokeDasharray="6 4"
                        markerEnd="url(#arrow-inhib)"
                      >
                        <animate attributeName="stroke-dashoffset" from="0" to="-40" dur="5s" repeatCount="indefinite" />
                      </path>
                      <text x="36" y="262" fontSize="8" fill={longColor} fontWeight="700">long loop</text>
                      <text x="36" y="272" fontSize="7" fill={longColor}>cortisol ⊣ ACTH</text>
                    </g>

                    {/* LONG LOOP B — cortisol ⊣ CRH (right arc) */}
                    <g opacity={longOp}>
                      <path
                        d="M 260 388 Q 340 320 340 130 Q 340 70 285 60"
                        fill="none"
                        stroke={longColor}
                        strokeWidth={longW}
                        strokeDasharray="6 4"
                        markerEnd="url(#arrow-inhib)"
                      >
                        <animate attributeName="stroke-dashoffset" from="0" to="-40" dur="5s" repeatCount="indefinite" />
                      </path>
                      <text x="305" y="245" fontSize="8" fill={longColor} fontWeight="700" textAnchor="middle">long loop</text>
                      <text x="305" y="255" fontSize="7" fill={longColor} textAnchor="middle">cortisol ⊣ CRH</text>
                    </g>

                    {/* SHORT LOOP — ACTH ⊣ CRH (tight inner arc) */}
                    <g opacity={shortOp}>
                      <path
                        d="M 130 200 Q 78 175 78 130 Q 78 90 130 78"
                        fill="none"
                        stroke={shortColor}
                        strokeWidth={shortW}
                        strokeDasharray="4 2"
                        markerEnd="url(#arrow-inhib)"
                      >
                        <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="2s" repeatCount="indefinite" />
                      </path>
                      <text x="50" y="142" fontSize="8" fill={shortColor} fontWeight="700">short loop</text>
                      <text x="50" y="152" fontSize="7" fill={shortColor}>ACTH ⊣ CRH</text>
                    </g>
                  </>
                );
              })()}

              {/* Stress inputs */}
              {scenario === "stress" && (
                <g className="animate-pulse">
                  <line x1="40" y1="50" x2="75" y2="50" stroke="hsl(0 75% 55%)" strokeWidth="2" markerEnd="url(#arrow-stim)" />
                  <text x="40" y="38" fontSize="8" fill="hsl(0 75% 55%)" fontWeight="700">surgery, IL-6, TNF-α, sympathetic</text>
                </g>
              )}

              {/* Legend */}
              <g transform="translate(8, 448)">
                <line x1="0" y1="6" x2="22" y2="6" stroke="hsl(25 85% 55%)" strokeWidth="2" markerEnd="url(#arrow-stim)" />
                <text x="28" y="9" fontSize="8" fill="hsl(var(--muted-foreground))">stimulation</text>
                <line x1="92" y1="6" x2="114" y2="6" stroke="hsl(220 60% 55%)" strokeWidth="1.6" strokeDasharray="6 4" markerEnd="url(#arrow-inhib)" />
                <text x="120" y="9" fontSize="8" fill="hsl(var(--muted-foreground))">long (slow)</text>
                <line x1="188" y1="6" x2="210" y2="6" stroke="hsl(260 55% 60%)" strokeWidth="1.4" strokeDasharray="4 2" markerEnd="url(#arrow-inhib)" />
                <text x="216" y="9" fontSize="8" fill="hsl(var(--muted-foreground))">short (fast)</text>
              </g>
            </svg>
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
                <li>Steroid cover: hydrocortisone 25–100 mg IV depending on surgical magnitude</li>
                <li>Etomidate inhibits 11β-hydroxylase → adrenal suppression for ~24 h after a single dose</li>
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
