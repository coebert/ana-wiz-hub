import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DiagramFigure } from "../_shared/DiagramFigure";

/**
 * Detailed cross-section of the endothelial glycocalyx.
 * Two views: STRUCTURE (intact, healthy ESL) and DAMAGE (shedding by ANP /
 * inflammation / hyperglycaemia / hypervolaemia → oedema).
 */
export const GlycocalyxDiagram = () => {
  const [view, setView] = useState<"structure" | "damage">("structure");

  return (
    <DiagramFigure
      id="glycocalyx-diagram"
      title="Glycocalyx"
      description="Auto-generated wrapper for the Glycocalyx anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="rounded-xl border border-border bg-card p-3 sm:p-5">
        <Tabs value={view} onValueChange={(v) => setView(v as "structure" | "damage")} className="w-full">
          <TabsList className="grid grid-cols-2 w-full mb-4">
            <TabsTrigger value="structure">Intact Glycocalyx</TabsTrigger>
            <TabsTrigger value="damage">Shedding & Oedema</TabsTrigger>
          </TabsList>
  
          {/* ─────────────── INTACT ─────────────── */}
          <TabsContent value="structure">
            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 720 460" className="w-full h-auto" role="img" aria-label="Intact endothelial glycocalyx structure">
                <defs>
                  <linearGradient id="lumen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--perioperative) / 0.10)" />
                    <stop offset="100%" stopColor="hsl(var(--perioperative) / 0.02)" />
                  </linearGradient>
                  <linearGradient id="esl" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--accent) / 0.55)" />
                    <stop offset="100%" stopColor="hsl(var(--accent) / 0.15)" />
                  </linearGradient>
                  <pattern id="endo" width="40" height="60" patternUnits="userSpaceOnUse">
                    <rect width="40" height="60" fill="hsl(var(--muted))" />
                    <rect x="0.5" y="0.5" width="39" height="59" fill="none" stroke="hsl(var(--border))" strokeWidth="1" />
                  </pattern>
                </defs>
  
                {/* Capillary lumen */}
                <rect x="0" y="0" width="720" height="170" fill="url(#lumen)" />
                <text x="20" y="28" className="fill-muted-foreground" fontSize="12" fontFamily="ui-sans-serif">CAPILLARY LUMEN  ·  flowing plasma + RBC</text>
  
                {/* RBCs in lumen */}
                {[
                  { x: 110, y: 80 }, { x: 240, y: 60 }, { x: 380, y: 90 }, { x: 520, y: 65 }, { x: 640, y: 95 },
                ].map((p, i) => (
                  <ellipse key={i} cx={p.x} cy={p.y} rx="22" ry="9" fill="hsl(var(--destructive) / 0.55)" stroke="hsl(var(--destructive))" strokeWidth="0.5" />
                ))}
  
                {/* Plasma proteins (albumin) — large dots, EXCLUDED from sub-glycocalyx */}
                {Array.from({ length: 28 }).map((_, i) => (
                  <circle
                    key={`alb-${i}`}
                    cx={20 + (i * 25) % 680}
                    cy={120 + ((i * 17) % 40)}
                    r="3"
                    fill="hsl(var(--primary))"
                  />
                ))}
  
                {/* ESL band */}
                <rect x="0" y="170" width="720" height="60" fill="url(#esl)" />
  
                {/* Glycocalyx — stylised brush border (proteoglycan core proteins + GAG side chains) */}
                {Array.from({ length: 36 }).map((_, i) => {
                  const x = 10 + i * 20;
                  return (
                    <g key={`gx-${i}`}>
                      {/* core protein anchored to endothelium (syndecan / glypican) */}
                      <line x1={x} y1={230} x2={x} y2={185} stroke="hsl(var(--accent))" strokeWidth="1.5" />
                      {/* GAG side branches (heparan sulfate, hyaluronic acid, chondroitin) */}
                      <line x1={x} y1={210} x2={x - 5} y2={195} stroke="hsl(var(--accent))" strokeWidth="0.75" />
                      <line x1={x} y1={205} x2={x + 5} y2={190} stroke="hsl(var(--accent))" strokeWidth="0.75" />
                      <line x1={x} y1={200} x2={x - 4} y2={188} stroke="hsl(var(--accent))" strokeWidth="0.75" />
                      {/* tip */}
                      <circle cx={x} cy={185} r="1.6" fill="hsl(var(--accent))" />
                    </g>
                  );
                })}
  
                {/* Endothelial cells with tight junctions */}
                <rect x="0" y="230" width="720" height="60" fill="url(#endo)" />
                {[180, 360, 540].map((x) => (
                  <line key={x} x1={x} y1={230} x2={x} y2={290} stroke="hsl(var(--foreground))" strokeWidth="1" strokeDasharray="2 3" />
                ))}
                <text x="20" y="265" className="fill-foreground" fontSize="11" fontFamily="ui-sans-serif">ENDOTHELIUM</text>
  
                {/* Basement membrane + interstitium */}
                <rect x="0" y="290" width="720" height="14" fill="hsl(var(--border))" />
                <rect x="0" y="304" width="720" height="156" fill="hsl(var(--muted) / 0.4)" />
                <text x="20" y="325" className="fill-muted-foreground" fontSize="11" fontFamily="ui-sans-serif">BASEMENT MEMBRANE</text>
                <text x="20" y="365" className="fill-muted-foreground" fontSize="12" fontFamily="ui-sans-serif">INTERSTITIUM  ·  lymphatic drainage Jv ↓</text>
  
                {/* Lymphatic */}
                <path d="M 580 410 Q 620 380 660 405 L 700 405" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" markerEnd="url(#arr)" />
                <text x="540" y="430" className="fill-primary" fontSize="10" fontFamily="ui-sans-serif">→ lymphatic</text>
  
                <defs>
                  <marker id="arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 Z" fill="hsl(var(--primary))" />
                  </marker>
                </defs>
  
                {/* Annotation callouts */}
                <g fontFamily="ui-sans-serif" fontSize="10" className="fill-foreground">
                  {/* ESL thickness */}
                  <line x1="700" y1="170" x2="700" y2="230" stroke="hsl(var(--foreground))" strokeWidth="0.75" />
                  <line x1="695" y1="170" x2="705" y2="170" stroke="hsl(var(--foreground))" strokeWidth="0.75" />
                  <line x1="695" y1="230" x2="705" y2="230" stroke="hsl(var(--foreground))" strokeWidth="0.75" />
                  <text x="660" y="205" textAnchor="end" fontSize="9" className="fill-foreground">0.5–1 µm</text>
  
                  {/* Sub-glycocalyx label */}
                  <rect x="320" y="218" width="115" height="14" fill="hsl(var(--background))" stroke="hsl(var(--border))" strokeWidth="0.5" rx="2" />
                  <text x="377" y="228" textAnchor="middle" fontSize="9" className="fill-muted-foreground">sub-glycocalyx πsg ≈ 0</text>
                </g>
  
                {/* Legend */}
                <g transform="translate(20, 395)" fontFamily="ui-sans-serif" fontSize="10">
                  <circle cx="6" cy="0" r="3" fill="hsl(var(--primary))" />
                  <text x="14" y="3" className="fill-foreground">albumin / plasma proteins (excluded)</text>
                  <line x1="0" y1="20" x2="12" y2="20" stroke="hsl(var(--accent))" strokeWidth="2" />
                  <text x="18" y="23" className="fill-foreground">proteoglycan + GAG mesh</text>
                  <ellipse cx="6" cy="40" rx="6" ry="2.5" fill="hsl(var(--destructive) / 0.55)" />
                  <text x="18" y="43" className="fill-foreground">RBC</text>
                </g>
              </svg>
            </div>
  
            <div className="grid sm:grid-cols-3 gap-2 mt-4 text-xs">
              <div className="p-3 rounded-lg border border-border bg-card">
                <p className="font-semibold text-foreground">Composition</p>
                <p className="text-muted-foreground mt-1">Membrane-bound proteoglycans (syndecan-1, glypican) + GAG side chains: <strong>heparan sulfate (50–90%)</strong>, hyaluronic acid, chondroitin sulfate. Adsorbed plasma proteins (albumin, antithrombin III, SOD).</p>
              </div>
              <div className="p-3 rounded-lg border border-border bg-card">
                <p className="font-semibold text-foreground">Dimensions</p>
                <p className="text-muted-foreground mt-1">Thickness <strong>0.5–1 µm</strong> in capillaries, up to 4 µm in larger arteries. Total endothelial surface area ~350 m². Estimated intravascular volume <strong>~700–1000 mL</strong> in an adult — a 'hidden' fluid compartment.</p>
              </div>
              <div className="p-3 rounded-lg border border-border bg-card">
                <p className="font-semibold text-foreground">Functions</p>
                <ul className="text-muted-foreground mt-1 space-y-0.5 list-disc list-inside">
                  <li>Permeability barrier (molecular sieve)</li>
                  <li>Mechanotransduction of shear stress → eNOS</li>
                  <li>Anti-coagulant (binds AT-III, TFPI)</li>
                  <li>Anti-adhesive (shields ICAM/VCAM)</li>
                  <li>Anti-oxidant (binds extracellular SOD)</li>
                </ul>
              </div>
            </div>
          </TabsContent>
  
          {/* ─────────────── DAMAGE ─────────────── */}
          <TabsContent value="damage">
            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 720 460" className="w-full h-auto" role="img" aria-label="Glycocalyx shedding leading to capillary leak and oedema">
                <defs>
                  <linearGradient id="lumen2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--destructive) / 0.10)" />
                    <stop offset="100%" stopColor="hsl(var(--destructive) / 0.02)" />
                  </linearGradient>
                </defs>
  
                {/* Lumen */}
                <rect x="0" y="0" width="720" height="180" fill="url(#lumen2)" />
                <text x="20" y="28" className="fill-muted-foreground" fontSize="12" fontFamily="ui-sans-serif">CAPILLARY LUMEN  ·  inflammation / sepsis / hypervolaemia</text>
  
                {/* Triggers */}
                <g fontFamily="ui-sans-serif" fontSize="10" className="fill-destructive">
                  {[
                    { x: 90, label: "ANP" },
                    { x: 200, label: "TNF-α / IL-6" },
                    { x: 330, label: "hyperglycaemia" },
                    { x: 460, label: "ischaemia-reperfusion" },
                    { x: 620, label: "fluid overload" },
                  ].map((t) => (
                    <g key={t.label}>
                      <circle cx={t.x} cy={70} r="4" fill="hsl(var(--destructive))" />
                      <text x={t.x} y={60} textAnchor="middle">{t.label}</text>
                      <line x1={t.x} y1={75} x2={t.x} y2={155} stroke="hsl(var(--destructive))" strokeWidth="1" strokeDasharray="2 2" />
                    </g>
                  ))}
                </g>
  
                {/* Adherent leucocyte (now exposed because ESL gone) */}
                <circle cx="380" cy="155" r="14" fill="hsl(var(--accent))" stroke="hsl(var(--foreground))" strokeWidth="0.75" />
                <text x="380" y="145" textAnchor="middle" fontSize="9" fontFamily="ui-sans-serif" className="fill-foreground">PMN</text>
  
                {/* RBCs leaking through */}
                <ellipse cx="540" cy="120" rx="20" ry="8" fill="hsl(var(--destructive) / 0.5)" />
  
                {/* Damaged ESL — sparse stubs */}
                <rect x="0" y="180" width="720" height="50" fill="hsl(var(--accent) / 0.08)" />
                {Array.from({ length: 36 }).map((_, i) => {
                  const x = 10 + i * 20;
                  const broken = i % 3 !== 0;
                  const len = broken ? 8 + (i % 4) * 2 : 38;
                  return (
                        <line
                      key={`gx2-${i}`}
                      x1={x}
                      y1={228}
                      x2={x}
                      y2={228 - len}
                      stroke="hsl(var(--accent))"
                      strokeWidth={broken ? 0.8 : 1.4}
                      opacity={broken ? 0.5 : 1}
                    />
    );
                })}
  
                {/* Shed fragments floating into lumen */}
                {[
                  { x: 80, y: 130 }, { x: 160, y: 100 }, { x: 280, y: 140 }, { x: 430, y: 110 }, { x: 580, y: 135 }, { x: 660, y: 100 },
                ].map((p, i) => (
                  <g key={`shed-${i}`}>
                    <line x1={p.x} y1={p.y} x2={p.x + 8} y2={p.y - 6} stroke="hsl(var(--accent))" strokeWidth="1" />
                    <line x1={p.x} y1={p.y} x2={p.x - 6} y2={p.y - 4} stroke="hsl(var(--accent))" strokeWidth="1" />
                    <circle cx={p.x} cy={p.y} r="1.3" fill="hsl(var(--accent))" />
                  </g>
                ))}
                <text x="690" y="115" textAnchor="end" fontSize="9" fontFamily="ui-sans-serif" className="fill-muted-foreground">
                  ↑ syndecan-1, heparan sulfate (serum biomarkers)
                </text>
  
                {/* Endothelium */}
                <rect x="0" y="230" width="720" height="50" fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
                {[180, 360, 540].map((x) => (
                  <line key={x} x1={x} y1={230} x2={x} y2={280} stroke="hsl(var(--foreground))" strokeWidth="1" strokeDasharray="2 3" />
                ))}
                {/* Widened junction */}
                <line x1={360} y1={230} x2={356} y2={280} stroke="hsl(var(--destructive))" strokeWidth="1.5" />
                <line x1={360} y1={230} x2={364} y2={280} stroke="hsl(var(--destructive))" strokeWidth="1.5" />
                <text x="20" y="262" className="fill-foreground" fontSize="11" fontFamily="ui-sans-serif">ENDOTHELIUM (gaps widened)</text>
  
                {/* BM */}
                <rect x="0" y="280" width="720" height="14" fill="hsl(var(--border))" />
  
                {/* Interstitial OEDEMA */}
                <rect x="0" y="294" width="720" height="166" fill="hsl(var(--accent) / 0.18)" />
                <text x="20" y="318" className="fill-foreground" fontSize="12" fontFamily="ui-sans-serif" fontWeight="bold">INTERSTITIUM  —  oedema, ↑ protein, ↑ Jv</text>
  
                {/* Albumin and fluid extravasating into interstitium */}
                {Array.from({ length: 40 }).map((_, i) => (
                  <circle
                    key={`alb2-${i}`}
                    cx={20 + (i * 23) % 680}
                    cy={335 + ((i * 19) % 110)}
                    r="2.6"
                    fill="hsl(var(--primary) / 0.7)"
                  />
                ))}
  
                {/* Arrows — fluid flux */}
                <defs>
                  <marker id="arr2" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 Z" fill="hsl(var(--destructive))" />
                  </marker>
                </defs>
                {[120, 360, 600].map((x) => (
                  <line key={x} x1={x} y1={195} x2={x} y2={295} stroke="hsl(var(--destructive))" strokeWidth="2" markerEnd="url(#arr2)" />
                ))}
              </svg>
            </div>
  
            <div className="grid sm:grid-cols-2 gap-2 mt-4 text-xs">
              <div className="p-3 rounded-lg border-2 border-destructive/40 bg-destructive/5">
                <p className="font-semibold text-foreground">Triggers of shedding</p>
                <ul className="text-muted-foreground mt-1 space-y-0.5 list-disc list-inside">
                  <li><strong>Atrial natriuretic peptide</strong> (released by hypervolaemia / atrial stretch)</li>
                  <li>Inflammation: TNF-α, IL-6, complement, oxidised LDL</li>
                  <li>Hyperglycaemia, ischaemia–reperfusion injury</li>
                  <li>Surgical trauma, sepsis, major haemorrhage</li>
                  <li>Iatrogenic crystalloid bolus &gt; 30 mL/kg</li>
                </ul>
              </div>
              <div className="p-3 rounded-lg border-2 border-destructive/40 bg-destructive/5">
                <p className="font-semibold text-foreground">Consequences</p>
                <ul className="text-muted-foreground mt-1 space-y-0.5 list-disc list-inside">
                  <li>↑ permeability → interstitial oedema, capillary leak</li>
                  <li>Loss of mechanotransduction → ↓ NO, vasoconstriction</li>
                  <li>Leucocyte / platelet adhesion → microthrombosis</li>
                  <li>Loss of AT-III binding → procoagulant state</li>
                  <li>Serum syndecan-1 / heparan sulfate are validated biomarkers (correlate with mortality in sepsis & trauma)</li>
                </ul>
              </div>
            </div>
  
            <div className="mt-3 p-3 rounded-lg border-l-4 border-perioperative bg-perioperative/5 text-sm text-foreground">
              <span className="font-semibold">Glycocalyx-protective strategies:</span> avoid hypervolaemia (zero-balance fluids, GDFT); titrated small boluses (3–4 mL/kg); permissive hypotension in haemorrhage; albumin in sepsis (SAFE/ALBIOS); sevoflurane &gt; propofol for ischaemia-reperfusion (preconditioning); hydrocortisone in septic shock; tight glycaemic control (avoid hyperglycaemia, but not &lt; 6 mmol/L).
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DiagramFigure>
  );
};

export default GlycocalyxDiagram;
