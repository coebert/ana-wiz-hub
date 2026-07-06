import { DiagramFigure } from "../_shared/DiagramFigure";
/**
 * Animated SVG — CSF flow through the ventricular system.
 * Particles trace the physiological path:
 *   Choroid plexus (lateral ventricles) → foramen of Monro → 3rd ventricle
 *   → cerebral aqueduct of Sylvius → 4th ventricle → foramina of Luschka & Magendie
 *   → subarachnoid space → arachnoid granulations (sup. sagittal sinus)
 * Blockage markers highlight the common obstructive sites.
 */
const CsfFlowDiagram = () => {
  return (
    <DiagramFigure
      id="csf-flow-diagram"
      title="CSF flow"
      description="Auto-generated wrapper for the CSF flow anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
                  <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="px-4 sm:px-6 py-4 border-b border-border bg-muted/30">
          <h3 className="text-lg font-serif font-bold text-foreground">CSF Flow Through the Ventricular System</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Animated path from choroid plexus to arachnoid granulations · common obstruction points highlighted
          </p>
        </div>
  
        <div className="p-4 sm:p-6">
          <svg viewBox="0 0 800 540" className="w-full h-auto" role="img" aria-label="CSF flow through ventricular system">
            <defs>
              <marker id="arr-csf" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M0,0 L10,5 L0,10 z" fill="hsl(var(--clinical))" />
              </marker>
              <radialGradient id="brain-grad" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="hsl(var(--muted))" stopOpacity="0.6" />
                <stop offset="100%" stopColor="hsl(var(--muted))" stopOpacity="0.15" />
              </radialGradient>
              <linearGradient id="csf-grad" x1="0" x2="1">
                <stop offset="0%" stopColor="hsl(var(--clinical))" stopOpacity="0.2" />
                <stop offset="100%" stopColor="hsl(var(--clinical))" stopOpacity="0.55" />
              </linearGradient>
            </defs>
  
            {/* Brain silhouette (midsagittal-style outline) */}
            <path
              d="M120 240 Q 90 130 220 80 Q 380 30 540 70 Q 680 100 700 200 Q 720 300 640 360 Q 600 400 540 410 L 480 420 Q 460 440 440 460 L 380 470 Q 320 460 280 430 Q 200 400 160 360 Q 110 320 120 240 Z"
              fill="url(#brain-grad)"
              stroke="hsl(var(--border))"
              strokeWidth="1.5"
            />
  
            {/* Cerebellum bump */}
            <path d="M540 380 Q 600 360 640 390 Q 620 430 560 430 Q 530 415 540 380 Z" fill="hsl(var(--muted))" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.8" />
            <text x="595" y="412" textAnchor="middle" className="fill-muted-foreground" fontSize="9" fontStyle="italic">cerebellum</text>
  
            {/* === Ventricular system (filled with CSF) === */}
  
            {/* Lateral ventricles (C-shaped, two of them shown stacked for clarity) */}
            <path
              d="M180 180 Q 230 140 330 145 Q 410 150 430 200 Q 420 220 360 215 Q 290 215 240 240 Q 210 250 200 230 Q 180 215 180 180 Z"
              fill="url(#csf-grad)"
              stroke="hsl(var(--clinical))"
              strokeWidth="1.5"
            />
            <path
              d="M200 195 Q 250 165 320 170 Q 380 175 400 205 Q 380 220 340 218 Q 280 218 240 235 Q 215 240 200 220 Z"
              fill="hsl(var(--clinical) / 0.18)"
              stroke="hsl(var(--clinical))"
              strokeWidth="1"
              strokeDasharray="3 3"
              opacity="0.7"
            />
            <text x="290" y="125" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="700">Lateral ventricles</text>
            <text x="290" y="138" textAnchor="middle" className="fill-muted-foreground" fontSize="9">(L &amp; R · choroid plexus)</text>
  
            {/* Choroid plexus indicator (pulsing) */}
            <g>
              <ellipse cx="350" cy="195" rx="12" ry="6" fill="hsl(var(--clinical))" opacity="0.7">
                <animate attributeName="opacity" values="0.4;0.9;0.4" dur="2s" repeatCount="indefinite" />
              </ellipse>
              <text x="350" y="180" textAnchor="middle" className="fill-clinical" fontSize="9" fontWeight="600">choroid plexus</text>
            </g>
  
            {/* Foramen of Monro */}
            <circle cx="380" cy="240" r="6" fill="hsl(var(--clinical) / 0.5)" stroke="hsl(var(--clinical))" strokeWidth="1.5" />
            <text x="430" y="244" className="fill-foreground" fontSize="10" fontWeight="600">Foramen of Monro</text>
            <line x1="386" y1="240" x2="425" y2="240" stroke="hsl(var(--border))" strokeWidth="0.75" />
  
            {/* Third ventricle (vertical slit) */}
            <path
              d="M360 245 L 400 245 L 400 305 L 360 305 Z"
              fill="url(#csf-grad)"
              stroke="hsl(var(--clinical))"
              strokeWidth="1.5"
            />
            <text x="380" y="280" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="700">3rd</text>
            <text x="380" y="294" textAnchor="middle" className="fill-foreground" fontSize="9">ventricle</text>
  
            {/* Cerebral aqueduct (narrow tube) */}
            <path
              d="M375 305 L 385 305 L 430 380 L 420 380 Z"
              fill="url(#csf-grad)"
              stroke="hsl(var(--clinical))"
              strokeWidth="1.5"
            />
            <text x="475" y="350" className="fill-foreground" fontSize="10" fontWeight="600">Cerebral aqueduct</text>
            <text x="475" y="362" className="fill-muted-foreground" fontSize="9" fontStyle="italic">(of Sylvius)</text>
  
            {/* Fourth ventricle (diamond) */}
            <path
              d="M425 380 L 510 365 L 540 410 L 470 430 Z"
              fill="url(#csf-grad)"
              stroke="hsl(var(--clinical))"
              strokeWidth="1.5"
            />
            <text x="490" y="402" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="700">4th ventricle</text>
  
            {/* Foramina of Luschka (lateral, x2) and Magendie (median) */}
            <circle cx="445" cy="425" r="5" fill="hsl(var(--clinical) / 0.5)" stroke="hsl(var(--clinical))" strokeWidth="1.5" />
            <circle cx="540" cy="408" r="5" fill="hsl(var(--clinical) / 0.5)" stroke="hsl(var(--clinical))" strokeWidth="1.5" />
            <circle cx="495" cy="432" r="5" fill="hsl(var(--clinical) / 0.5)" stroke="hsl(var(--clinical))" strokeWidth="1.5" />
            <text x="495" y="465" textAnchor="middle" className="fill-muted-foreground" fontSize="9">foramina of Luschka (×2) &amp; Magendie</text>
  
            {/* Subarachnoid space (dashed envelope around brain) */}
            <path
              d="M120 240 Q 90 130 220 80 Q 380 30 540 70 Q 680 100 700 200 Q 720 300 640 360"
              fill="none"
              stroke="hsl(var(--clinical))"
              strokeWidth="1"
              strokeDasharray="4 4"
              opacity="0.5"
            />
            <text x="660" y="140" textAnchor="middle" className="fill-muted-foreground" fontSize="9" fontStyle="italic">subarachnoid space</text>
  
            {/* Arachnoid granulations into superior sagittal sinus (top) */}
            <g>
              {[260, 340, 420, 500].map((x) => (
                <path key={x} d={`M${x} 70 L${x - 4} 55 L${x + 4} 55 Z`} fill="hsl(var(--clinical))" opacity="0.7" />
              ))}
              <line x1="240" y1="55" x2="520" y2="55" stroke="hsl(var(--clinical))" strokeWidth="3" opacity="0.6" />
              <text x="380" y="46" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="600">Arachnoid granulations → superior sagittal sinus</text>
            </g>
  
            {/* === Animated CSF particles === */}
            {/* Path 1: choroid plexus → foramen of Monro → 3rd ventricle */}
            <path id="csf-path-1" d="M350 195 Q 370 215 380 240 L 380 305" fill="none" stroke="none" />
            {[0, 0.6, 1.2, 1.8].map((d, i) => (
              <circle key={`p1-${i}`} r="3.5" fill="hsl(var(--clinical))">
                <animateMotion dur="2.4s" begin={`${d}s`} repeatCount="indefinite">
                  <mpath href="#csf-path-1" />
                </animateMotion>
                <animate attributeName="opacity" values="0;1;1;0" dur="2.4s" begin={`${d}s`} repeatCount="indefinite" />
              </circle>
            ))}
  
            {/* Path 2: 3rd ventricle → aqueduct → 4th ventricle */}
            <path id="csf-path-2" d="M380 305 L 425 380 L 490 405" fill="none" stroke="none" />
            {[0, 0.7, 1.4, 2.1].map((d, i) => (
              <circle key={`p2-${i}`} r="3.5" fill="hsl(var(--clinical))">
                <animateMotion dur="2.8s" begin={`${d}s`} repeatCount="indefinite">
                  <mpath href="#csf-path-2" />
                </animateMotion>
                <animate attributeName="opacity" values="0;1;1;0" dur="2.8s" begin={`${d}s`} repeatCount="indefinite" />
              </circle>
            ))}
  
            {/* Path 3: 4th ventricle → foramina → subarachnoid space (over cerebellum, around brain to top) */}
            <path id="csf-path-3" d="M495 432 Q 560 470 620 420 Q 700 340 700 220 Q 660 100 540 70 Q 380 50 260 75 Q 160 110 130 200" fill="none" stroke="none" />
            {[0, 1, 2, 3, 4].map((d, i) => (
              <circle key={`p3-${i}`} r="3" fill="hsl(var(--clinical))" opacity="0.8">
                <animateMotion dur="6s" begin={`${d}s`} repeatCount="indefinite">
                  <mpath href="#csf-path-3" />
                </animateMotion>
                <animate attributeName="opacity" values="0;0.8;0.8;0" dur="6s" begin={`${d}s`} repeatCount="indefinite" />
              </circle>
            ))}
  
            {/* Path 4: subarachnoid → arachnoid granulations (reabsorption) */}
            <path id="csf-path-4" d="M180 180 Q 220 100 300 70 L 300 60" fill="none" stroke="none" />
            {[0, 1.5, 3].map((d, i) => (
              <circle key={`p4-${i}`} r="2.5" fill="hsl(var(--clinical))" opacity="0.7">
                <animateMotion dur="4s" begin={`${d}s`} repeatCount="indefinite">
                  <mpath href="#csf-path-4" />
                </animateMotion>
                <animate attributeName="opacity" values="0;0.8;0" dur="4s" begin={`${d}s`} repeatCount="indefinite" />
              </circle>
            ))}
  
            {/* === Common blockage markers === */}
            {/* Block 1: foramen of Monro (colloid cyst) */}
            <g>
              <circle cx="380" cy="240" r="14" fill="none" stroke="hsl(var(--destructive))" strokeWidth="2" strokeDasharray="3 3">
                <animate attributeName="r" values="12;18;12" dur="2s" repeatCount="indefinite" />
              </circle>
              <line x1="395" y1="225" x2="370" y2="255" stroke="hsl(var(--destructive))" strokeWidth="2" />
            </g>
  
            {/* Block 2: cerebral aqueduct stenosis */}
            <g>
              <circle cx="405" cy="345" r="14" fill="none" stroke="hsl(var(--destructive))" strokeWidth="2" strokeDasharray="3 3">
                <animate attributeName="r" values="12;18;12" dur="2s" begin="0.6s" repeatCount="indefinite" />
              </circle>
              <line x1="420" y1="330" x2="395" y2="360" stroke="hsl(var(--destructive))" strokeWidth="2" />
            </g>
  
            {/* Block 3: 4th ventricle outflow (posterior fossa tumour) */}
            <g>
              <circle cx="495" cy="432" r="16" fill="none" stroke="hsl(var(--destructive))" strokeWidth="2" strokeDasharray="3 3">
                <animate attributeName="r" values="14;20;14" dur="2s" begin="1.2s" repeatCount="indefinite" />
              </circle>
              <line x1="510" y1="417" x2="485" y2="447" stroke="hsl(var(--destructive))" strokeWidth="2" />
            </g>
  
            {/* Block 4: arachnoid granulation reabsorption failure (communicating) */}
            <g>
              <circle cx="380" cy="58" r="14" fill="none" stroke="hsl(var(--destructive))" strokeWidth="2" strokeDasharray="3 3">
                <animate attributeName="r" values="12;18;12" dur="2s" begin="1.8s" repeatCount="indefinite" />
              </circle>
            </g>
  
            {/* Legend */}
            <g transform="translate(20, 490)">
              <rect width="760" height="40" rx="8" fill="hsl(var(--muted) / 0.4)" stroke="hsl(var(--border))" />
              <circle cx="20" cy="20" r="4" fill="hsl(var(--clinical))" />
              <text x="32" y="24" className="fill-foreground" fontSize="10">CSF particle</text>
              <circle cx="135" cy="20" r="6" fill="none" stroke="hsl(var(--destructive))" strokeWidth="2" strokeDasharray="2 2" />
              <text x="148" y="24" className="fill-foreground" fontSize="10">Common obstruction site</text>
              <circle cx="320" cy="20" r="4" fill="hsl(var(--clinical) / 0.5)" stroke="hsl(var(--clinical))" />
              <text x="332" y="24" className="fill-foreground" fontSize="10">Anatomical foramen</text>
              <text x="470" y="24" className="fill-muted-foreground" fontSize="10">Production ≈ 500 mL/day · total volume ≈ 150 mL · turnover ×3/day</text>
            </g>
          </svg>
  
          {/* Numbered legend of obstructions */}
          <div className="mt-4 grid sm:grid-cols-2 gap-3">
            <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-3">
              <p className="text-sm font-semibold text-foreground">① Foramen of Monro</p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Classically obstructed by a <em>colloid cyst of the third ventricle</em> — causes intermittent positional headaches and "drop attacks". Unilateral block → unilateral lateral ventricle dilatation.
              </p>
            </div>
            <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-3">
              <p className="text-sm font-semibold text-foreground">② Cerebral aqueduct (of Sylvius)</p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Narrowest point of the system → commonest site of <em>obstructive (non-communicating) hydrocephalus</em>. Causes: congenital aqueduct stenosis, tectal/pineal tumours, post-haemorrhagic gliosis.
              </p>
            </div>
            <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-3">
              <p className="text-sm font-semibold text-foreground">③ Fourth ventricle outflow (Luschka/Magendie)</p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Posterior fossa tumours (medulloblastoma, ependymoma), Chiari malformation, Dandy-Walker, or cerebellar haemorrhage. Triventricular + 4th ventricle dilatation.
              </p>
            </div>
            <div className="rounded-lg border border-destructive/40 bg-destructive/5 p-3">
              <p className="text-sm font-semibold text-foreground">④ Arachnoid granulations</p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Failure of reabsorption → <em>communicating hydrocephalus</em>. Causes: subarachnoid haemorrhage, meningitis (fibrosis), high CSF protein. All ventricles dilate symmetrically.
              </p>
            </div>
          </div>
  
          <p className="text-xs text-muted-foreground mt-3 italic">
            Anaesthetic relevance: in obstructive hydrocephalus, ICP is exquisitely sensitive to PaCO₂, head-down positioning and venous obstruction. EVD or endoscopic third ventriculostomy bypasses obstructive blocks; VP shunt drains communicating hydrocephalus.
          </p>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default CsfFlowDiagram;
