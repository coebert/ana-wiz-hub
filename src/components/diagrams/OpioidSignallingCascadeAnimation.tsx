import { AnimatedMechanism, AnimatedMechanismStep } from "./AnimatedMechanism";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * µ-opioid receptor (MOR) signalling cascade — animated step-by-step from
 * agonist binding to clinical analgesia, plus the parallel pathways that
 * drive the canonical side-effects.
 *
 * Designed for the Opioids topic. All colour via design tokens.
 */
const STEPS: AnimatedMechanismStep[] = [
  {
    label: "Agonist binds MOR",
    detail: (
      <>
        Morphine, fentanyl or remifentanil bind the orthosteric pocket of the
        <strong> µ-opioid receptor</strong>, a 7-transmembrane Gαi/o-coupled
        GPCR found pre- and post-synaptically in the dorsal horn,
        periaqueductal grey, and locus coeruleus.
      </>
    ),
    callout: <>Affinity ladder: sufentanil &gt; fentanyl &gt; morphine ≫ codeine.</>,
  },
  {
    label: "Gαi dissociates",
    detail: (
      <>
        Receptor activation exchanges GDP for GTP on the Gαi subunit. Gαi
        dissociates from Gβγ. <strong>Gαi inhibits adenylyl cyclase →
        ↓ cAMP → ↓ PKA</strong>, while Gβγ acts directly on ion channels.
      </>
    ),
  },
  {
    label: "K⁺ channels open",
    detail: (
      <>
        Gβγ activates inwardly-rectifying <strong>GIRK K⁺ channels</strong> →
        K⁺ efflux → membrane <strong>hyperpolarisation</strong> of the
        post-synaptic neuron. Threshold for firing rises.
      </>
    ),
  },
  {
    label: "Ca²⁺ channels close",
    detail: (
      <>
        Gβγ also <strong>inhibits voltage-gated Ca²⁺ channels</strong>{" "}
        (N-, P/Q-type) at the pre-synaptic terminal. ↓ Ca²⁺ influx →{" "}
        ↓ vesicle fusion → ↓ release of glutamate, substance P and CGRP.
      </>
    ),
    callout: <>Pre-synaptic block is the dominant analgesic mechanism in the dorsal horn.</>,
  },
  {
    label: "↓ Nociceptive transmission",
    detail: (
      <>
        Net effect: nociceptive input from C and Aδ fibres fails to drive the
        second-order neuron. Combined with descending modulation from the PAG
        and RVM, this produces clinical <strong>analgesia</strong>.
      </>
    ),
  },
  {
    label: "Side-effect pathways",
    detail: (
      <>
        Same MOR activation in other locations explains the canonical
        side-effect profile:
        <ul className="list-disc list-inside mt-1.5 space-y-0.5 text-xs">
          <li><strong>Brainstem (preBötC)</strong> → respiratory depression</li>
          <li><strong>CTZ / area postrema</strong> → nausea & vomiting</li>
          <li><strong>Edinger–Westphal nucleus</strong> → miosis</li>
          <li><strong>Enteric MOR</strong> → constipation, ↓ gastric emptying</li>
        </ul>
      </>
    ),
    callout: <>Naloxone reverses ALL of these competitively — including analgesia.</>,
  },
  {
    label: "Tolerance & OIH",
    detail: (
      <>
        Sustained agonism drives <strong>β-arrestin recruitment</strong>,
        receptor phosphorylation by GRKs, internalisation and downstream
        NMDA-mediated central sensitisation. Clinically: tolerance (more drug
        for same effect) and <strong>opioid-induced hyperalgesia</strong>
        (paradoxical increased pain).
      </>
    ),
    callout: <>Biased agonists (e.g. oliceridine) aim to favour Gαi over β-arrestin signalling.</>,
  },
];

const STEP_DURATIONS = [2400, 2600, 2400, 2600, 2400, 3400, 3000];

export const OpioidSignallingCascadeAnimation = () => {
  const stepsWithDur = STEPS.map((s, i) => ({ ...s, durationMs: STEP_DURATIONS[i] }));

  return (
    <AnimatedMechanism
      title="µ-opioid receptor signalling cascade"
      subtitle="From agonist binding to analgesia — and the parallel pathways that drive respiratory depression, nausea, constipation, tolerance and OIH."
      steps={stepsWithDur}
      accentClass="border-pharmacology/50"
      renderScene={(active) => {
        // Highlight rules per step
        const highlights = {
          agonist: active >= 0,
          receptor: active >= 0,
          gprotein: active >= 1,
          kchannel: active >= 2,
          cachannel: active >= 3,
          synapse: active >= 4,
          sideEffects: active >= 5,
          arrestin: active >= 6,
        };

        return (
    <DiagramFigure
      id="opioid-signalling-cascade-animation"
      title="Opioid signalling cascade"
      description="Auto-generated wrapper for the Opioid signalling cascade animated physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
                <svg
              viewBox="0 0 360 320"
              className="w-full h-auto"
              role="img"
              aria-label="µ-opioid receptor signalling cascade"
            >
              {/* Pre-synaptic neuron membrane */}
              <rect
                x="20"
                y="20"
                width="320"
                height="40"
                fill="hsl(var(--muted))"
                stroke="hsl(var(--border))"
              />
              <text x="30" y="15" className="text-[9px]" fill="hsl(var(--muted-foreground))">
                Pre-synaptic terminal (1° afferent)
              </text>
  
              {/* Synaptic cleft */}
              <rect x="20" y="60" width="320" height="40" fill="hsl(var(--background))" />
              <text x="30" y="86" className="text-[9px]" fill="hsl(var(--muted-foreground))">
                Synaptic cleft
              </text>
  
              {/* Glutamate / SP vesicles in cleft (only when Ca²⁺ open) */}
              {!highlights.cachannel && (
                <>
                  <circle cx="160" cy="80" r="3" fill="hsl(var(--destructive))" opacity="0.7" />
                  <circle cx="180" cy="78" r="3" fill="hsl(var(--destructive))" opacity="0.7" />
                  <circle cx="200" cy="82" r="3" fill="hsl(var(--destructive))" opacity="0.7" />
                </>
              )}
  
              {/* Post-synaptic membrane */}
              <rect
                x="20"
                y="100"
                width="320"
                height="40"
                fill="hsl(var(--muted))"
                stroke="hsl(var(--border))"
              />
              <text x="30" y="156" className="text-[9px]" fill="hsl(var(--muted-foreground))">
                Post-synaptic neuron (2° projection)
              </text>
  
              {/* µ-receptor */}
              <g>
                <rect
                  x="148"
                  y="95"
                  width="24"
                  height="50"
                  rx="6"
                  fill={highlights.receptor ? "hsl(var(--pharmacology) / 0.4)" : "hsl(var(--card))"}
                  stroke={highlights.receptor ? "hsl(var(--pharmacology))" : "hsl(var(--border))"}
                  strokeWidth={active === 0 ? "2.5" : "1.5"}
                  className="transition-all duration-500"
                />
                <text x="160" y="172" textAnchor="middle" className="text-[9px] font-semibold" fill="hsl(var(--foreground))">
                  MOR
                </text>
              </g>
  
              {/* Agonist (drug) */}
              {highlights.agonist && (
                <g className="animate-fade-in">
                  <circle
                    cx="160"
                    cy="80"
                    r="7"
                    fill="hsl(var(--pharmacology))"
                    stroke="hsl(var(--background))"
                    strokeWidth="1.5"
                  />
                  <text x="160" y="50" textAnchor="middle" className="text-[9px] font-semibold" fill="hsl(var(--pharmacology))">
                    agonist
                  </text>
                </g>
              )}
  
              {/* G-protein subunits inside cell */}
              {highlights.gprotein && (
                <g className="animate-fade-in">
                  <circle cx="140" cy="155" r="9" fill="hsl(var(--accent) / 0.35)" stroke="hsl(var(--accent))" />
                  <text x="140" y="159" textAnchor="middle" className="text-[8px] font-bold" fill="hsl(var(--foreground))">
                    Gαi
                  </text>
                  <circle cx="180" cy="155" r="9" fill="hsl(var(--clinical) / 0.35)" stroke="hsl(var(--clinical))" />
                  <text x="180" y="159" textAnchor="middle" className="text-[8px] font-bold" fill="hsl(var(--foreground))">
                    Gβγ
                  </text>
                </g>
              )}
  
              {/* Adenylyl cyclase / cAMP — labelled when Gαi active */}
              {active === 1 && (
                <g className="animate-fade-in">
                  <text x="100" y="175" className="text-[9px]" fill="hsl(var(--muted-foreground))">
                    ↓ cAMP, ↓ PKA
                  </text>
                </g>
              )}
  
              {/* K+ channel (post-synaptic) */}
              <g>
                <rect
                  x="60"
                  y="100"
                  width="20"
                  height="40"
                  rx="3"
                  fill={highlights.kchannel ? "hsl(var(--accent) / 0.4)" : "hsl(var(--card))"}
                  stroke={highlights.kchannel ? "hsl(var(--accent))" : "hsl(var(--border))"}
                  strokeWidth={active === 2 ? "2.5" : "1.2"}
                  className="transition-all duration-500"
                />
                <text x="70" y="172" textAnchor="middle" className="text-[8px]" fill="hsl(var(--foreground))">
                  GIRK K⁺
                </text>
                {highlights.kchannel && (
                  <g className="animate-fade-in">
                    <text x="70" y="190" textAnchor="middle" className="text-[9px] font-bold" fill="hsl(var(--accent))">
                      K⁺ →
                    </text>
                  </g>
                )}
              </g>
  
              {/* Ca2+ channel (pre-synaptic) */}
              <g>
                <rect
                  x="240"
                  y="20"
                  width="20"
                  height="40"
                  rx="3"
                  fill={highlights.cachannel ? "hsl(var(--clinical) / 0.4)" : "hsl(var(--card))"}
                  stroke={highlights.cachannel ? "hsl(var(--clinical))" : "hsl(var(--border))"}
                  strokeWidth={active === 3 ? "2.5" : "1.2"}
                  className="transition-all duration-500"
                />
                <text x="250" y="14" textAnchor="middle" className="text-[8px]" fill="hsl(var(--foreground))">
                  Ca²⁺ (V)
                </text>
                {highlights.cachannel && (
                  <g className="animate-fade-in">
                    <line x1="245" y1="35" x2="255" y2="45" stroke="hsl(var(--destructive))" strokeWidth="2" />
                    <line x1="255" y1="35" x2="245" y2="45" stroke="hsl(var(--destructive))" strokeWidth="2" />
                    <text x="280" y="42" className="text-[9px] font-bold" fill="hsl(var(--destructive))">
                      closed
                    </text>
                  </g>
                )}
              </g>
  
              {/* Synapse outcome */}
              {highlights.synapse && (
                <g className="animate-fade-in">
                  <rect
                    x="220"
                    y="200"
                    width="120"
                    height="38"
                    rx="6"
                    fill="hsl(var(--accent) / 0.15)"
                    stroke="hsl(var(--accent))"
                  />
                  <text x="280" y="216" textAnchor="middle" className="text-[10px] font-bold" fill="hsl(var(--accent))">
                    ANALGESIA
                  </text>
                  <text x="280" y="230" textAnchor="middle" className="text-[8px]" fill="hsl(var(--muted-foreground))">
                    ↓ nociceptive transmission
                  </text>
                </g>
              )}
  
              {/* Side-effect pathways panel */}
              {highlights.sideEffects && (
                <g className="animate-fade-in">
                  <rect
                    x="20"
                    y="200"
                    width="180"
                    height="105"
                    rx="6"
                    fill="hsl(var(--destructive) / 0.08)"
                    stroke="hsl(var(--destructive) / 0.5)"
                  />
                  <text x="30" y="218" className="text-[10px] font-bold" fill="hsl(var(--destructive))">
                    Same MOR — other sites:
                  </text>
                  {[
                    ["preBötC", "→ ↓ RR (apnoea)"],
                    ["CTZ", "→ N&V"],
                    ["E-W nucleus", "→ miosis"],
                    ["Enteric", "→ constipation"],
                  ].map(([site, eff], i) => (
                    <g key={site}>
                      <text x="30" y={236 + i * 16} className="text-[9px] font-semibold" fill="hsl(var(--foreground))">
                        {site}
                      </text>
                      <text x="100" y={236 + i * 16} className="text-[9px]" fill="hsl(var(--muted-foreground))">
                        {eff}
                      </text>
                    </g>
                  ))}
                </g>
              )}
  
              {/* β-arrestin / tolerance overlay */}
              {highlights.arrestin && (
                <g className="animate-fade-in">
                  <rect
                    x="220"
                    y="245"
                    width="120"
                    height="60"
                    rx="6"
                    fill="hsl(var(--clinical) / 0.12)"
                    stroke="hsl(var(--clinical) / 0.6)"
                  />
                  <text x="280" y="263" textAnchor="middle" className="text-[10px] font-bold" fill="hsl(var(--clinical))">
                    β-arrestin
                  </text>
                  <text x="280" y="278" textAnchor="middle" className="text-[8px]" fill="hsl(var(--muted-foreground))">
                    GRK phosphorylation
                  </text>
                  <text x="280" y="290" textAnchor="middle" className="text-[8px]" fill="hsl(var(--muted-foreground))">
                    internalisation
                  </text>
                  <text x="280" y="302" textAnchor="middle" className="text-[8px] font-semibold" fill="hsl(var(--foreground))">
                    → tolerance + OIH
                  </text>
                </g>
              )}
            </svg>
    </DiagramFigure>
  );
      }}
    />
  );
};

export default OpioidSignallingCascadeAnimation;
