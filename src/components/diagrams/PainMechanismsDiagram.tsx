import { useState } from "react";
import { DiagramToggleBar } from "./DiagramToggleBar";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * Interactive comparison of the three IASP-recognised pain mechanisms:
 * nociceptive, neuropathic and nociplastic. Click a mechanism band to
 * see lesion site, signalling biology, exemplar conditions and
 * mechanism-targeted management.
 *
 * Conforms to STYLE_GUIDE.md: DiagramToggleBar header, prefixed defs
 * ids (pmd-), depth gradient, drop shadow, default selection, left-
 * border detail panel keyed to mechanism colour.
 */

type MechKey = "nociceptive" | "neuropathic" | "nociplastic";

interface MechInfo {
  label: string;
  iaspYear: string;
  color: string;
  oneLiner: string;
  lesion: string;
  mechanism: string[];
  features: string[];
  examples: string[];
  treatment: string[];
  avoid: string[];
}

const MECH_COLOR: Record<MechKey, string> = {
  nociceptive: "hsl(0, 70%, 50%)",
  neuropathic: "hsl(220, 70%, 55%)",
  nociplastic: "hsl(280, 60%, 55%)",
};

const MECHS: Record<MechKey, MechInfo> = {
  nociceptive: {
    label: "Nociceptive",
    iaspYear: "Recognised since 1979",
    color: MECH_COLOR.nociceptive,
    oneLiner: "Pain from actual or threatened tissue damage activating peripheral nociceptors.",
    lesion: "Peripheral tissue (skin, muscle, viscera, bone) — nervous system intact.",
    mechanism: [
      "Tissue injury → release of bradykinin, prostaglandins, H⁺, ATP, 5-HT",
      "Activation of peripheral Aδ (sharp/fast) and C (dull/burning, slow) nociceptors",
      "Signal travels via dorsal root ganglion → dorsal horn (laminae I, II, V)",
      "Crosses midline → ascends in spinothalamic tract → thalamus → S1, insula, ACC",
      "Descending modulation from PAG / RVM (serotonin, noradrenaline, endogenous opioids)",
    ],
    features: [
      "Well-localised (somatic) or poorly localised + referred (visceral)",
      "Sharp, throbbing, aching — proportionate to stimulus",
      "Reproducible on movement / palpation",
      "Resolves with healing of the underlying tissue",
    ],
    examples: [
      "Post-operative incisional pain",
      "Fracture, sprain, burn",
      "Osteoarthritis (mechanical component)",
      "Renal / biliary colic, bowel obstruction",
      "Cancer bone metastases (somatic component)",
    ],
    treatment: [
      "Paracetamol — first-line",
      "NSAIDs / COX-2 inhibitors (peripheral COX inhibition)",
      "Opioids — effective and appropriate (acute / cancer pain)",
      "Local anaesthetic / regional blocks",
      "Treat the underlying cause: surgery, immobilisation, drainage",
    ],
    avoid: ["Long-term opioids beyond the healing window", "Gabapentinoids (no nociceptive evidence base)"],
  },
  neuropathic: {
    label: "Neuropathic",
    iaspYear: "IASP 2008 — revised definition",
    color: MECH_COLOR.neuropathic,
    oneLiner: "Pain caused by a lesion or disease of the somatosensory nervous system.",
    lesion: "Peripheral nerve, dorsal root, spinal cord, or brain — demonstrable somatosensory pathway pathology.",
    mechanism: [
      "Ectopic discharges from injured axons (upregulated Na⁺ channels Nav1.7/1.8)",
      "Loss of inhibitory interneurons in dorsal horn (GABA / glycine)",
      "NMDA-receptor activation → central sensitisation, wind-up",
      "Microglial activation, neuroinflammation (IL-1β, TNF-α, BDNF)",
      "Reorganisation of A-β fibres into superficial laminae → allodynia",
      "Sympathetic-sensory coupling in some chronic states",
    ],
    features: [
      "Burning, electric-shock, shooting, lancinating quality",
      "In a recognisable neuro-anatomical distribution (dermatome / nerve)",
      "Allodynia (pain to non-painful stimulus), hyperalgesia",
      "Spontaneous paroxysms, evoked dysaesthesiae",
      "Sensory loss often coexists with the pain",
    ],
    examples: [
      "Post-herpetic neuralgia",
      "Diabetic / chemotherapy-induced peripheral neuropathy",
      "Trigeminal neuralgia",
      "Post-amputation / phantom limb pain",
      "Post-stroke central pain, MS-related pain",
      "Lumbar / cervical radiculopathy",
    ],
    treatment: [
      "NICE CG173 first-line: amitriptyline, duloxetine, gabapentin or pregabalin",
      "Tramadol as rescue only (not long-term)",
      "Topical: capsaicin 8%, lidocaine 5% patch (focal neuropathy)",
      "Carbamazepine is first-line specifically for trigeminal neuralgia",
      "Refractory: ketamine infusion, lidocaine infusion, neuromodulation (SCS — NICE TA159 for FBSS / diabetic neuropathy)",
      "Address the underlying lesion where possible",
    ],
    avoid: [
      "Conventional opioids as first-line (poor response, harms outweigh benefits)",
      "Strong opioids for chronic neuropathic pain without specialist input",
    ],
  },
  nociplastic: {
    label: "Nociplastic",
    iaspYear: "IASP 2017 — newest mechanism category",
    color: MECH_COLOR.nociplastic,
    oneLiner: "Pain from altered nociceptive processing without clear tissue or somatosensory nerve damage.",
    lesion: "No identifiable tissue or nerve lesion — pathology lies in CNS pain-processing networks.",
    mechanism: [
      "Augmented central pain processing — central sensitisation as the primary lesion",
      "Loss of descending inhibition (PAG / RVM dysfunction)",
      "Functional MRI: enhanced activation of insula, ACC, S1/S2; reduced default-mode connectivity",
      "Elevated CSF substance P and glutamate; reduced 5-HT, NA, dopamine signalling",
      "Often accompanied by autonomic dysregulation, sleep disturbance, mood disorder, fatigue",
      "Strong genetic component; epigenetic effects from adverse childhood experiences",
    ],
    features: [
      "Widespread or regional pain disproportionate to any inciting event",
      "Multiple sensitivities (light, sound, smell, touch)",
      "Frequent comorbidities: sleep disorder, fatigue, IBS, migraine, mood disorder",
      "Symptoms fluctuate with stress, sleep, activity",
      "Catastrophising, fear-avoidance commonly amplify the experience",
    ],
    examples: [
      "Fibromyalgia",
      "Chronic primary low back pain",
      "Tension-type headache, primary chronic headaches",
      "Irritable bowel syndrome, interstitial cystitis / bladder pain syndrome",
      "Temporomandibular disorder",
      "Many cases of CRPS (mixed mechanisms) and chronic pelvic pain",
    ],
    treatment: [
      "NICE NG193 (2021): supported self-management, exercise, CBT/ACT, acupuncture",
      "Antidepressants (amitriptyline, duloxetine, sertraline) may be considered",
      "Pain Management Programmes — strongest functional-outcome evidence",
      "Sleep hygiene, graded aerobic exercise, paced activity",
      "Fibromyalgia-specific (EULAR 2016): aerobic + strengthening exercise, CBT, low-dose naltrexone (emerging)",
      "Address comorbid depression, anxiety, sleep disorder",
    ],
    avoid: [
      "Paracetamol, NSAIDs, opioids, gabapentinoids and benzodiazepines for chronic primary pain (NICE NG193)",
      "Repeat investigations / interventions reinforcing the 'damage' narrative",
      "Long-term opioids — worsen central sensitisation (opioid-induced hyperalgesia)",
    ],
  },
};

const ORDER: MechKey[] = ["nociceptive", "neuropathic", "nociplastic"];

const Section = ({
  title,
  items,
  color,
  variant = "default",
}: {
  title: string;
  items: string[];
  color: string;
  variant?: "default" | "warning";
}) => (
  <div>
    <p
      className="text-[11px] uppercase tracking-wide font-semibold mb-1.5"
      style={{ color: variant === "warning" ? "hsl(var(--destructive))" : color }}
    >
      {title}
    </p>
    <ul className="space-y-1">
      {items.map((it) => (
        <li key={it} className="text-sm text-foreground leading-snug pl-3 relative">
          <span
            className="absolute left-0 top-2 w-1.5 h-1.5 rounded-full"
            style={{ background: variant === "warning" ? "hsl(var(--destructive))" : color }}
          />
          {it}
        </li>
      ))}
    </ul>
  </div>
);

export const PainMechanismsDiagram = () => {
  const [selected, setSelected] = useState<MechKey>("nociplastic");
  const [showFeatures, setShowFeatures] = useState(true);
  const [showAvoid, setShowAvoid] = useState(true);

  const info = MECHS[selected];

  // Layout for the schematic at the top: peripheral tissue → nerve → spinal cord → brain
  const W = 720;
  const H = 200;

  const stages = [
    { key: "tissue", label: "Tissue", x: 70, color: "hsl(var(--muted-foreground))" },
    { key: "nerve", label: "Peripheral nerve", x: 230, color: "hsl(var(--muted-foreground))" },
    { key: "cord", label: "Dorsal horn", x: 400, color: "hsl(var(--muted-foreground))" },
    { key: "brain", label: "Brain (cortex / limbic)", x: 600, color: "hsl(var(--muted-foreground))" },
  ];

  // Which stage(s) carry the lesion for the selected mechanism
  const lesionStages: Record<MechKey, string[]> = {
    nociceptive: ["tissue"],
    neuropathic: ["nerve", "cord"],
    nociplastic: ["cord", "brain"],
  };
  const isLesion = (s: string) => lesionStages[selected].includes(s);

  return (
    <DiagramFigure
      id="pain-mechanisms-diagram"
      title="Pain mechanisms"
      description="Auto-generated wrapper for the Pain mechanisms anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="my-6 space-y-4">
        <div className="bg-muted/30 rounded-xl border border-border p-4">
          <DiagramToggleBar
            toggles={[
              { label: "Features", active: showFeatures, onChange: () => setShowFeatures((v) => !v) },
              { label: "Avoid", active: showAvoid, onChange: () => setShowAvoid((v) => !v) },
            ]}
          />
  
          {/* Schematic of the pain pathway with lesion site highlighted */}
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full h-auto"
            role="img"
            aria-label="Schematic of the pain pathway from peripheral tissue through nerve and dorsal horn to brain, with the lesion site highlighted for the selected mechanism"
          >
            <defs>
              <radialGradient id="pmd-depth" cx="50%" cy="50%" r="65%">
                <stop offset="0%" stopColor="hsl(var(--background))" stopOpacity="0" />
                <stop offset="100%" stopColor="hsl(var(--background))" stopOpacity="0.25" />
              </radialGradient>
              <filter id="pmd-shadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="1.5" stdDeviation="2" floodOpacity="0.18" />
              </filter>
              <marker id="pmd-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--muted-foreground))" />
              </marker>
            </defs>
  
            {/* Pathway line */}
            <line x1="70" y1="100" x2="650" y2="100" stroke="hsl(var(--border))" strokeWidth="2" markerEnd="url(#pmd-arrow)" />
  
            {/* Stages */}
            {stages.map((s, _i) => {
              const lesion = isLesion(s.key);
              const r = lesion ? 38 : 28;
              const fill = lesion ? info.color : "hsl(var(--background))";
              const stroke = lesion ? info.color : "hsl(var(--border))";
              const opacity = lesion ? 0.85 : 1;
  
              // Icon glyph
              const glyph =
                s.key === "tissue" ? "🔥" :
                s.key === "nerve"  ? "⚡" :
                s.key === "cord"   ? "═"  :
                                     "🧠";
  
              return (
                <g key={s.key} filter="url(#pmd-shadow)">
                  <circle cx={s.x} cy="100" r={r} fill={fill} stroke={stroke} strokeWidth={lesion ? 3 : 1.5} opacity={opacity} />
                  <text x={s.x} y={107} textAnchor="middle" fontSize={lesion ? 22 : 16} fill={lesion ? "white" : "hsl(var(--foreground))"}>
                    {glyph}
                  </text>
                  <text x={s.x} y={160} textAnchor="middle" fontSize="11" fill="hsl(var(--foreground))" fontWeight={lesion ? 600 : 400}>
                    {s.label}
                  </text>
                  {lesion && (
                    <text x={s.x} y={177} textAnchor="middle" fontSize="9" fontWeight={600} fill={info.color}>
                      LESION SITE
                    </text>
                  )}
                  {lesion && (
                    <circle cx={s.x} cy="100" r={r + 6} fill="none" stroke={info.color} strokeWidth="1" opacity="0.6">
                      <animate attributeName="r" from={r + 4} to={r + 14} dur="1.6s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.6" to="0" dur="1.6s" repeatCount="indefinite" />
                    </circle>
                  )}
                </g>
              );
            })}
  
            {/* Stage axis labels */}
            <text x={W / 2} y={25} textAnchor="middle" fontSize="11" fill="hsl(var(--muted-foreground))">
              Pain pathway — periphery to cortex
            </text>
  
            <rect x="0" y="0" width={W} height={H} fill="url(#pmd-depth)" pointerEvents="none" />
          </svg>
  
          {/* Mechanism selector — three colour bands */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3">
            {ORDER.map((k) => {
              const m = MECHS[k];
              const isSel = selected === k;
              return (
                    <button
                  key={k}
                  type="button"
                  onClick={() => setSelected(k)}
                  aria-pressed={isSel}
                  className={`text-left p-3 rounded-lg border-2 transition-all ${
                    isSel ? "shadow-md" : "hover:bg-background/60"
                  }`}
                  style={{
                    borderColor: isSel ? m.color : "hsl(var(--border))",
                    background: isSel ? `${m.color.replace(")", " / 0.08)").replace("hsl", "hsl")}` : "hsl(var(--background))",
                  }}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-serif font-bold text-base" style={{ color: m.color }}>
                      {m.label}
                    </span>
                    <span className="text-[9px] uppercase tracking-wide px-1.5 py-0.5 rounded border" style={{ borderColor: m.color, color: m.color }}>
                      {k === "nociplastic" ? "Newest" : k === "neuropathic" ? "2008" : "Classical"}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-snug">{m.oneLiner}</p>
                </button>
    );
            })}
          </div>
  
          {/* Detail panel */}
          <div
            className="mt-4 rounded-lg border border-border bg-background p-4 border-l-4"
            style={{ borderLeftColor: info.color }}
          >
            <div className="flex items-baseline justify-between gap-3 flex-wrap mb-2">
              <h4 className="font-serif font-bold text-foreground text-lg">
                {info.label} pain
              </h4>
              <span className="text-[10px] uppercase tracking-wide text-muted-foreground">{info.iaspYear}</span>
            </div>
            <p className="text-sm text-muted-foreground italic mb-3">
              <strong className="not-italic text-foreground">Lesion site:</strong> {info.lesion}
            </p>
  
            <div className="grid md:grid-cols-2 gap-4">
              <Section title="Mechanism" items={info.mechanism} color={info.color} />
              <Section title="Example conditions" items={info.examples} color={info.color} />
              {showFeatures && <Section title="Clinical features" items={info.features} color={info.color} />}
              <Section title="Mechanism-targeted treatment" items={info.treatment} color={info.color} />
              {showAvoid && <Section title="Avoid / low-value" items={info.avoid} color={info.color} variant="warning" />}
            </div>
          </div>
  
          <p className="mt-3 text-[11px] text-muted-foreground">
            Many real-world chronic pain syndromes are <strong className="text-foreground">mixed</strong> — e.g. chronic low back pain often has nociceptive (facet, disc), neuropathic (radicular) and nociplastic (central sensitisation) components. Treatment should target each contributing mechanism.
          </p>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default PainMechanismsDiagram;
