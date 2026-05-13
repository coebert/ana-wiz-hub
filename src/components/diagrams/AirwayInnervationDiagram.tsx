import { useState } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

interface Zone {
  id: string;
  label: string;
  nerve: string;
  branch: string;
  color: string;
  topicalMethod: string;
  detail: string;
  path: string;
}

const zones: Zone[] = [
  {
    id: "nasal",
    label: "Nasal Cavity",
    nerve: "Trigeminal (V₂)",
    branch: "Anterior ethmoidal n. & sphenopalatine ganglion",
    color: "hsl(210,70%,55%)",
    topicalMethod: "Co-phenylcaine spray or cocaine paste on pledgets",
    detail: "Anterior ethmoidal nerve supplies the anterior septum and lateral wall. Sphenopalatine ganglion (via V₂) supplies the posterior nasal cavity. Topicalise with vasoconstrictor to reduce bleeding and provide anaesthesia.",
    path: "M 145,80 C 150,60 160,45 170,40 L 190,38 C 200,36 210,40 215,50 L 218,65 C 220,75 218,90 215,100 L 195,105 C 180,108 160,105 150,100 Z",
  },
  {
    id: "oropharynx",
    label: "Oropharynx & Posterior Tongue",
    nerve: "Glossopharyngeal (IX)",
    branch: "Lingual & pharyngeal branches",
    color: "hsl(340,65%,55%)",
    topicalMethod: "Lidocaine spray / gargle or bilateral IX nerve block",
    detail: "CN IX provides sensation to the posterior third of the tongue, tonsillar fossa, soft palate, and oropharynx. The gag reflex afferent runs via IX. Block by injecting LA at the palatoglossal fold (posterior tonsillar pillar) or topicalise with 4% lidocaine gargle.",
    path: "M 140,175 C 145,160 160,150 180,148 L 210,148 C 225,150 235,158 238,170 L 240,190 C 242,205 238,220 230,230 L 200,238 C 180,240 160,238 150,230 C 142,222 138,200 140,175 Z",
  },
  {
    id: "supraglottic",
    label: "Supraglottis & Epiglottis",
    nerve: "Vagus (X) — SLN internal branch",
    branch: "Internal branch of Superior Laryngeal Nerve",
    color: "hsl(45,80%,50%)",
    topicalMethod: "Bilateral SLN block or 'spray-as-you-go' via scope",
    detail: "The internal branch of the SLN pierces the thyrohyoid membrane to provide sensation from the epiglottis to the vocal cords (supraglottic mucosa). Blocked by depositing LA in the pyriform fossa or by infiltrating below the greater cornu of the hyoid. This abolishes the cough reflex above the cords.",
    path: "M 150,250 C 155,240 170,232 185,230 L 205,230 C 220,232 232,240 235,252 L 237,268 C 238,278 235,290 228,298 L 210,305 C 195,310 175,310 162,305 C 153,298 148,280 150,250 Z",
  },
  {
    id: "subglottic",
    label: "Subglottis & Trachea",
    nerve: "Vagus (X) — Recurrent Laryngeal Nerve",
    branch: "Recurrent Laryngeal Nerve (RLN)",
    color: "hsl(150,60%,45%)",
    topicalMethod: "Transtracheal injection (cricothyroid membrane) or spray-as-you-go",
    detail: "The RLN provides sensation below the vocal cords to the upper trachea, plus motor to all intrinsic laryngeal muscles except cricothyroid. Transtracheal injection of 2–4 ml 4% lidocaine through the cricothyroid membrane at end-inspiration spreads LA above and below the cords. This also blocks the cough reflex.",
    path: "M 162,315 C 165,308 178,304 190,302 L 200,302 C 215,304 225,310 228,318 L 230,340 C 232,365 230,395 228,420 L 225,440 C 222,455 215,460 200,462 L 190,462 C 175,460 168,455 165,440 L 162,420 C 158,395 157,365 158,340 Z",
  },
  {
    id: "anterior-tongue",
    label: "Anterior Tongue & Floor of Mouth",
    nerve: "Trigeminal (V₃)",
    branch: "Lingual nerve (V₃ branch)",
    color: "hsl(270,55%,55%)",
    topicalMethod: "Topical lidocaine or lingual nerve block",
    detail: "The lingual nerve (branch of V₃) provides general sensation to the anterior two-thirds of the tongue and floor of the mouth. It travels medial to the mandible in the submandibular region. Topical 4% lidocaine applied to the tongue or bilateral lingual nerve block at the pterygomandibular fold.",
    path: "M 155,148 C 158,135 170,125 185,122 L 205,122 C 218,125 228,132 230,145 L 232,155 C 233,162 230,170 222,175 L 205,178 C 190,180 172,180 160,175 C 153,170 152,160 155,148 Z",
  },
];

const AirwayInnervationDiagram = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const activeZone = zones.find((z) => z.id === selected);

  return (
    <DiagramFigure
      id="airway-innervation-diagram"
      title="Airway innervation"
      description="Auto-generated wrapper for the Airway innervation anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
        <h3 className="text-lg font-serif font-bold text-foreground mb-1">Airway Innervation for Awake Fibreoptic Intubation</h3>
        <p className="text-sm text-muted-foreground mb-4">Tap a zone to see the nerve supply and topicalisation technique.</p>
  
        <div className="flex flex-col lg:flex-row gap-4">
          {/* SVG diagram */}
          <div className="flex-shrink-0 mx-auto">
            <svg viewBox="60 10 270 480" className="w-full max-w-[320px]" role="img" aria-label="Sagittal cross-section of upper airway showing sensory innervation zones">
              <defs>
                {zones.map((z) => (
                  <linearGradient key={z.id} id={`aw-grad-${z.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={z.color} stopOpacity={0.5} />
                    <stop offset="100%" stopColor={z.color} stopOpacity={0.25} />
                  </linearGradient>
                ))}
                <filter id="aw-glow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
  
              {/* Head/neck outline — sagittal silhouette */}
              <path
                d="M 120,20 C 100,30 85,55 80,85 C 75,115 78,140 82,160 L 85,180 C 88,195 95,210 100,225 L 105,245 C 108,260 110,280 112,300 L 115,340 C 116,370 118,400 120,430 L 122,470 L 268,470 L 270,430 C 272,400 274,370 275,340 L 278,300 C 280,275 282,255 280,240 L 275,220 C 270,200 262,185 258,170 L 255,150 C 252,130 255,110 260,90 C 265,70 268,50 260,35 C 250,20 230,15 210,15 C 190,12 160,15 140,18 Z"
                fill="hsl(var(--muted))"
                opacity={0.15}
                stroke="hsl(var(--border))"
                strokeWidth={1.5}
              />
  
              {/* Anatomical landmarks */}
              {/* Hard palate */}
              <path d="M 130,115 C 150,108 180,105 210,108 C 230,110 245,115 250,120" fill="none" stroke="hsl(var(--foreground))" strokeWidth={2} opacity={0.3} />
              <text x="115" y="112" className="text-[8px]" fill="hsl(var(--muted-foreground))" fontStyle="italic">Hard palate</text>
  
              {/* Soft palate */}
              <path d="M 130,130 C 140,140 155,145 165,142" fill="none" stroke="hsl(var(--foreground))" strokeWidth={1.5} opacity={0.3} strokeDasharray="3,2" />
              <text x="95" y="140" className="text-[7px]" fill="hsl(var(--muted-foreground))" fontStyle="italic">Soft palate</text>
  
              {/* Epiglottis */}
              <path d="M 180,230 C 185,218 192,210 195,218 C 198,226 195,235 190,240" fill="hsl(45,80%,50%)" opacity={0.3} stroke="hsl(var(--foreground))" strokeWidth={1} />
              <text x="200" y="222" className="text-[7px]" fill="hsl(var(--muted-foreground))" fontStyle="italic">Epiglottis</text>
  
              {/* Hyoid bone */}
              <line x1="145" y1="228" x2="175" y2="228" stroke="hsl(var(--foreground))" strokeWidth={2} opacity={0.4} />
              <text x="95" y="232" className="text-[7px]" fill="hsl(var(--muted-foreground))" fontStyle="italic">Hyoid</text>
  
              {/* Vocal cords line */}
              <line x1="155" y1="305" x2="235" y2="305" stroke="hsl(var(--foreground))" strokeWidth={2} opacity={0.5} strokeDasharray="6,3" />
              <text x="240" y="308" className="text-[7px] font-semibold" fill="hsl(var(--foreground))" opacity={0.7}>Vocal cords</text>
  
              {/* Cricothyroid membrane */}
              <line x1="158" y1="335" x2="232" y2="335" stroke="hsl(150,60%,45%)" strokeWidth={1.5} opacity={0.5} strokeDasharray="4,2" />
              <text x="235" y="338" className="text-[6px]" fill="hsl(var(--muted-foreground))" fontStyle="italic">CTM</text>
  
              {/* Thyroid cartilage outline */}
              <path d="M 150,260 L 148,300 L 155,320 L 190,325 L 235,320 L 240,300 L 238,260" fill="none" stroke="hsl(var(--foreground))" strokeWidth={1} opacity={0.2} />
  
              {/* Tracheal rings */}
              {[365, 385, 405, 425, 445].map((y) => (
                <ellipse key={y} cx="195" cy={y} rx="30" ry="6" fill="none" stroke="hsl(var(--foreground))" strokeWidth={1} opacity={0.15} />
              ))}
  
              {/* Interactive zones */}
              {zones.map((z) => {
                const isActive = selected === z.id;
                return (
                      <g key={z.id} onClick={() => setSelected(isActive ? null : z.id)} className="cursor-pointer">
                    <path
                      d={z.path}
                      fill={`url(#aw-grad-${z.id})`}
                      stroke={z.color}
                      strokeWidth={isActive ? 2.5 : 1.5}
                      opacity={selected && !isActive ? 0.3 : 1}
                      filter={isActive ? "url(#aw-glow)" : undefined}
                      className="transition-all duration-300"
                    />
                  </g>
    );
              })}
  
              {/* Zone labels on diagram */}
              <text x="170" y="70" className="text-[8px] font-semibold" fill="hsl(210,70%,55%)" textAnchor="middle">Nasal cavity</text>
              <text x="190" y="138" className="text-[7px] font-medium" fill="hsl(270,55%,55%)" textAnchor="middle">Ant. tongue</text>
              <text x="190" y="195" className="text-[7px] font-medium" fill="hsl(340,65%,55%)" textAnchor="middle">Oropharynx</text>
              <text x="190" y="270" className="text-[7px] font-medium" fill="hsl(45,80%,50%)" textAnchor="middle">Supraglottis</text>
              <text x="190" y="375" className="text-[7px] font-medium" fill="hsl(150,60%,45%)" textAnchor="middle">Subglottis</text>
  
              {/* Nerve label arrows (right side) */}
              <g opacity={0.7}>
                <line x1="220" y1="68" x2="280" y2="55" stroke="hsl(210,70%,55%)" strokeWidth={0.75} />
                <text x="283" y="58" className="text-[7px]" fill="hsl(210,70%,55%)">V₂</text>
  
                <text x="283" y="140" className="text-[7px]" fill="hsl(270,55%,55%)">V₃</text>
                <line x1="232" y1="136" x2="280" y2="138" stroke="hsl(270,55%,55%)" strokeWidth={0.75} />
  
                <text x="283" y="198" className="text-[7px]" fill="hsl(340,65%,55%)">IX</text>
                <line x1="240" y1="195" x2="280" y2="196" stroke="hsl(340,65%,55%)" strokeWidth={0.75} />
  
                <text x="283" y="270" className="text-[7px]" fill="hsl(45,80%,50%)">X (iSLN)</text>
                <line x1="237" y1="268" x2="280" y2="268" stroke="hsl(45,80%,50%)" strokeWidth={0.75} />
  
                <text x="283" y="378" className="text-[7px]" fill="hsl(150,60%,45%)">X (RLN)</text>
                <line x1="232" y1="375" x2="280" y2="376" stroke="hsl(150,60%,45%)" strokeWidth={0.75} />
              </g>
            </svg>
          </div>
  
          {/* Right panel: info or legend */}
          <div className="flex-1 min-w-0">
            {activeZone ? (
              <div className="p-4 rounded-lg border border-border bg-secondary/20 space-y-3 animate-fade-in">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: activeZone.color }} />
                  <h4 className="font-semibold text-foreground text-sm">{activeZone.label}</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-foreground">Nerve: </span>
                    <span className="text-muted-foreground">{activeZone.nerve}</span>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Branch: </span>
                    <span className="text-muted-foreground">{activeZone.branch}</span>
                  </div>
                  <div>
                    <span className="font-medium text-foreground">Topicalisation: </span>
                    <span className="text-muted-foreground">{activeZone.topicalMethod}</span>
                  </div>
                  <p className="text-muted-foreground text-xs leading-relaxed pt-1 border-t border-border">{activeZone.detail}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground mb-3">Sensory Innervation Zones</p>
                {zones.map((z) => (
                  <button
                    key={z.id}
                    onClick={() => setSelected(z.id)}
                    className="flex items-center gap-2 w-full text-left p-2 rounded-lg hover:bg-secondary/30 transition-colors"
                  >
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: z.color }} />
                    <div>
                      <p className="text-sm font-medium text-foreground">{z.label}</p>
                      <p className="text-xs text-muted-foreground">{z.nerve} — {z.branch}</p>
                    </div>
                  </button>
                ))}
                <div className="mt-4 p-3 rounded-lg border border-border bg-secondary/10">
                  <p className="text-xs font-medium text-foreground mb-1">Awake FOI Technique Summary</p>
                  <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
                    <li>Antisialagogue: glycopyrrolate 200 mcg IV</li>
                    <li>Nasal: co-phenylcaine / cocaine paste on pledgets</li>
                    <li>Oropharynx: 4% lidocaine gargle ± IX block</li>
                    <li>Supraglottis: bilateral SLN block or spray-as-you-go</li>
                    <li>Subglottis: transtracheal injection 4% lidocaine 2–4 ml</li>
                    <li>Maximum lidocaine dose: 9 mg/kg topical (airway)</li>
                  </ol>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default AirwayInnervationDiagram;
