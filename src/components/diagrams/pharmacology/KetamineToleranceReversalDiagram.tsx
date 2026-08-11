import { useEffect, useState } from "react";
import { BookOpen, ExternalLink, Pause, Play } from "lucide-react";
import { DiagramFigure } from "../_shared/DiagramFigure";
import { useMotionPreference } from "@/contexts/MotionPreferenceContext";

/**
 * Animated walkthrough of the seven proposed molecular mechanisms by which
 * ketamine reverses opioid tolerance / opioid-induced hyperalgesia.
 *
 * The scene is a single dorsal-horn synapse. Each mechanism illuminates a
 * different element of that synapse, so learners build one mental model
 * rather than seven disconnected cartoons. Auto-play cycles the mechanisms;
 * reduced-motion users get a static, fully-labelled frame and manual tabs.
 */

type MechId = 1 | 2 | 3 | 4 | 5 | 6 | 7;

interface Mechanism {
  id: MechId;
  short: string;
  title: string;
  target: string;
  summary: string;
  consequence: string;
  colour: string;
  /** Studies from the "Ketamine and re-setting opioid receptors" section that support this mechanism. */
  sources: MechSource[];
}

interface MechSource {
  /** Short label — matches the entry in the topic's References list. */
  label: string;
  /** DOI deep link. */
  url: string;
  /** PubMed ID for direct linking to the NCBI record. */
  pmid: string;
}

const MECHANISMS: Mechanism[] = [
  {
    id: 1,
    short: "NMDA pore",
    title: "Open-channel NMDA blockade (PCP site)",
    target: "Post-synaptic NMDA receptor",
    summary:
      "Chronic opioid exposure relieves the Mg²⁺ block and increases NMDA conductance. Ketamine enters the open pore and blocks use-dependently, silencing the high-frequency, wind-up-carrying receptors while sparing normal transmission.",
    consequence: "↓ Ca²⁺ influx at sensitised synapses — the upstream event for every mechanism below.",
    colour: "hsl(210 75% 52%)",
    sources: [
      { label: "Trujillo & Akil 1991", url: "https://doi.org/10.1126/science.1824728", pmid: "1824728" },
      { label: "Mao 1995", url: "https://doi.org/10.1016/0304-3959(95)00073-2", pmid: "8657426" },
      { label: "Angst & Clark 2006", url: "https://doi.org/10.1097/00000542-200603000-00025", pmid: "16508405" },
    ],
  },
  {
    id: 2,
    short: "PKC–MOR loop",
    title: "Breaking the PKC → MOR phosphorylation loop",
    target: "Protein kinase C ↔ µ-opioid receptor",
    summary:
      "Ca²⁺ activates PKC, which phosphorylates and uncouples the MOR from Gi/Go (heterologous desensitisation) and simultaneously relieves the Mg²⁺ block on NMDA — a self-reinforcing loop. NMDA blockade breaks it and MOR–G-protein coupling recovers.",
    consequence: "Closest mechanistic correlate of “re-setting” the receptor: same receptors, restored signalling.",
    colour: "hsl(280 60% 55%)",
    sources: [
      { label: "Mao 1995", url: "https://doi.org/10.1016/0304-3959(95)00073-2", pmid: "8657426" },
      { label: "Trujillo & Akil 1991", url: "https://doi.org/10.1126/science.1824728", pmid: "1824728" },
    ],
  },
  {
    id: 3,
    short: "CaMKII / NO",
    title: "↓ CaMKII and nNOS–NO–cGMP signalling",
    target: "Dorsal-horn second messengers",
    summary:
      "Autophosphorylated CaMKII and nitric-oxide generation maintain long-term potentiation of nociceptive synapses. Both are downstream of NMDA Ca²⁺ flux and both fall with ketamine.",
    consequence: "Reversal of established spinal LTP — pain memory is de-potentiated.",
    colour: "hsl(160 55% 42%)",
    sources: [
      { label: "Mao 1995", url: "https://doi.org/10.1016/0304-3959(95)00073-2", pmid: "8657426" },
      { label: "Angst & Clark 2006", url: "https://doi.org/10.1097/00000542-200603000-00025", pmid: "16508405" },
    ],
  },
  {
    id: 4,
    short: "RVM / dynorphin",
    title: "↓ Descending facilitation and spinal dynorphin",
    target: "Rostral ventromedial medulla → dorsal horn",
    summary:
      "Chronic opioids drive RVM “on-cell” activity and upregulate spinal dynorphin, which promotes CGRP/substance-P release. NMDA blockade dampens this pro-nociceptive descending arm.",
    consequence: "Shifts the descending balance back towards inhibition.",
    colour: "hsl(24 80% 52%)",
    sources: [
      { label: "Angst & Clark 2006", url: "https://doi.org/10.1097/00000542-200603000-00025", pmid: "16508405" },
      { label: "Joly 2005", url: "https://doi.org/10.1097/00000542-200507000-00022", pmid: "15983467" },
    ],
  },
  {
    id: 5,
    short: "Glia / BDNF",
    title: "Glial and neuroinflammatory modulation",
    target: "Microglia — TLR4 / P2X7 → BDNF–TrkB → KCC2",
    summary:
      "Opioids activate microglia releasing IL-1β, TNF-α and BDNF; BDNF–TrkB downregulates the KCC2 chloride transporter so GABA-ergic inhibition becomes excitatory. Ketamine is directly anti-inflammatory and microglia-inhibiting.",
    consequence: "Restores the chloride gradient and therefore inhibitory tone.",
    colour: "hsl(0 68% 55%)",
    sources: [
      { label: "Loftus 2010", url: "https://doi.org/10.1097/ALN.0b013e3181e90914", pmid: "20693876" },
      { label: "Schwenk 2018", url: "https://doi.org/10.1097/AAP.0000000000000806", pmid: "29870457" },
    ],
  },
  {
    id: 6,
    short: "β-arrestin-2",
    title: "↓ β-arrestin-2-biased signalling",
    target: "µ-opioid receptor trafficking",
    summary:
      "Because ketamine delivers the same analgesia at a lower opioid dose, agonist occupancy falls — with it GRK phosphorylation, β-arrestin-2 recruitment, receptor internalisation and adenylyl-cyclase superactivation.",
    consequence: "Indirect but real: fewer receptors withdrawn from the membrane.",
    colour: "hsl(45 85% 45%)",
    sources: [
      { label: "Joly 2005", url: "https://doi.org/10.1097/00000542-200507000-00022", pmid: "15983467" },
      { label: "Nielsen 2017", url: "https://doi.org/10.1097/j.pain.0000000000000782", pmid: "28067693" },
      { label: "Loftus 2010", url: "https://doi.org/10.1097/ALN.0b013e3181e90914", pmid: "20693876" },
    ],
  },
  {
    id: 7,
    short: "HNK / plasticity",
    title: "Secondary targets and (2R,6R)-hydroxynorketamine",
    target: "HCN1, adenosine A₁, monoamines, AMPA–mTORC1",
    summary:
      "HCN1 inhibition, adenosine A₁ recruitment and monoamine reuptake inhibition add analgesia. The metabolite (2R,6R)-HNK drives AMPA-receptor and mTORC1-dependent synaptic plasticity independent of NMDA blockade.",
    consequence: "May explain benefit that outlasts the infusion by days to weeks.",
    colour: "hsl(330 60% 55%)",
    sources: [
      { label: "Laskowski 2011", url: "https://doi.org/10.1007/s12630-011-9560-0", pmid: "21773855" },
      { label: "Brinck 2018", url: "https://doi.org/10.1002/14651858.CD012033.pub4", pmid: "30570761" },
      { label: "Schwenk 2018", url: "https://doi.org/10.1097/AAP.0000000000000806", pmid: "29870457" },
    ],
  },
];

const CYCLE_MS = 5200;

export const KetamineToleranceReversalDiagram = () => {
  const { reduceMotion } = useMotionPreference();
  const [active, setActive] = useState<MechId>(1);
  const [playing, setPlaying] = useState(false);
  const [showSources, setShowSources] = useState(false);

  useEffect(() => {
    if (reduceMotion) setPlaying(false);
  }, [reduceMotion]);

  useEffect(() => {
    if (!playing || reduceMotion) return;
    const t = setInterval(() => {
      setActive((prev) => ((prev % 7) + 1) as MechId);
    }, CYCLE_MS);
    return () => clearInterval(t);
  }, [playing, reduceMotion]);

  const mech = MECHANISMS.find((m) => m.id === active) ?? MECHANISMS[0];
  const on = (id: MechId) => active === id;
  /** In reduced-motion mode everything is drawn at full opacity, statically. */
  const dim = (id: MechId) => (reduceMotion || on(id) ? 1 : 0.22);
  const pulse = (id: MechId) => (on(id) && !reduceMotion ? "animate-pulse" : undefined);

  return (
    <DiagramFigure
      id="ketamine-tolerance-reversal"
      title="Seven molecular mechanisms by which ketamine reverses opioid tolerance"
      description="A dorsal-horn synapse showing, in sequence: open-channel NMDA blockade at the PCP site; interruption of the PKC–µ-opioid-receptor phosphorylation loop; reduced CaMKII and nNOS–nitric-oxide signalling; attenuated descending facilitation from the rostral ventromedial medulla and reduced spinal dynorphin; inhibition of microglial TLR4–BDNF–KCC2 signalling; reduced β-arrestin-2 recruitment and receptor internalisation secondary to opioid dose sparing; and secondary targets including HCN1, adenosine A1 and (2R,6R)-hydroxynorketamine-mediated AMPA–mTORC1 plasticity."
    >
      <div className="w-full bg-card border border-border rounded-lg p-4 sm:p-6 my-6">
        <h3 className="text-lg font-serif font-bold text-foreground mb-1">
          How ketamine “re-sets” the opioid-tolerant synapse
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Seven proposed mechanisms, all converging on one dorsal-horn synapse. Step through them, or press play to
          watch the cascade unfold.
        </p>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {!reduceMotion && (
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause mechanism animation" : "Play mechanism animation"}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-border text-foreground hover:border-foreground/50 transition-colors"
            >
              {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              {playing ? "Pause" : "Play all"}
            </button>
          )}
          <button
            type="button"
            onClick={() => setShowSources((v) => !v)}
            aria-pressed={showSources}
            aria-label={showSources ? "Hide on-diagram source citations" : "Show on-diagram source citations"}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              showSources
                ? "border-foreground bg-foreground/10 text-foreground"
                : "border-border text-foreground hover:border-foreground/50"
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            Sources
          </button>
          {MECHANISMS.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => {
                setPlaying(false);
                setActive(m.id);
              }}
              aria-pressed={active === m.id}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                active === m.id
                  ? "border-foreground text-background shadow-sm"
                  : "border-border text-foreground hover:border-foreground/50"
              }`}
              style={{ backgroundColor: active === m.id ? m.colour : "transparent" }}
            >
              {m.id}. {m.short}
            </button>
          ))}
        </div>

        {/* Scene */}
        <div className="w-full overflow-x-auto">
          <svg
            viewBox="0 0 820 560"
            className="w-full h-auto"
            style={{ minWidth: 660 }}
            role="img"
            aria-label={`Mechanism ${mech.id} of 7: ${mech.title}. ${mech.summary}`}
          >
            <defs>
              <marker id="ktrArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill={mech.colour} />
              </marker>
              <marker id="ktrGrey" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--muted-foreground))" />
              </marker>
            </defs>

            {/* ---------- static scaffold ---------- */}
            <text x="12" y="20" className="fill-muted-foreground" fontSize="11" fontWeight="600">
              PRESYNAPTIC TERMINAL
            </text>
            <rect x="60" y="30" width="700" height="70" rx="14" fill="hsl(var(--muted))" opacity="0.35" />
            <circle cx="250" cy="66" r="6" fill="hsl(280 60% 55%)" opacity="0.9" />
            <text x="250" y="52" textAnchor="middle" className="fill-muted-foreground" fontSize="9">Glu</text>
            <circle cx="470" cy="66" r="6" fill="hsl(45 85% 45%)" opacity="0.9" />
            <text x="470" y="52" textAnchor="middle" className="fill-muted-foreground" fontSize="9">opioid</text>

            <rect x="40" y="140" width="740" height="34" fill="hsl(var(--muted))" opacity="0.45" />
            <text x="48" y="162" className="fill-muted-foreground" fontSize="10" fontStyle="italic">
              post-synaptic membrane
            </text>
            <text x="12" y="205" className="fill-muted-foreground" fontSize="11" fontWeight="600">
              POST-SYNAPTIC NEURONE
            </text>

            {/* ---------- 1. NMDA pore ---------- */}
            <g opacity={dim(1)} className={pulse(1)}>
              <rect x="200" y="136" width="96" height="42" rx="4" fill={MECHANISMS[0].colour} opacity="0.85" stroke="hsl(var(--foreground))" strokeWidth="1" />
              <text x="248" y="153" textAnchor="middle" className="fill-background" fontSize="10" fontWeight="700">NMDA-R</text>
              <text x="248" y="168" textAnchor="middle" className="fill-background" fontSize="9">open pore</text>
              <circle cx="248" cy="112" r="11" fill="hsl(var(--background))" stroke={MECHANISMS[0].colour} strokeWidth="2" />
              <text x="248" y="116" textAnchor="middle" className="fill-foreground" fontSize="8" fontWeight="700">KET</text>
              <line x1="248" y1="123" x2="248" y2="134" stroke={MECHANISMS[0].colour} strokeWidth="2" markerEnd="url(#ktrArrow)" />
              <text x="312" y="152" className="fill-foreground" fontSize="9" fontWeight="600">PCP site block</text>
              <text x="312" y="165" className="fill-muted-foreground" fontSize="9">↓ Ca²⁺ influx, Mg²⁺ block restored</text>
              <line x1="248" y1="180" x2="248" y2="232" stroke={MECHANISMS[0].colour} strokeWidth="2" strokeDasharray="4 3" markerEnd="url(#ktrArrow)" />
              <text x="256" y="210" className="fill-muted-foreground" fontSize="9">Ca²⁺</text>
            </g>

            {/* ---------- 2. PKC ↔ MOR loop ---------- */}
            <g opacity={dim(2)} className={pulse(2)}>
              <rect x="440" y="136" width="86" height="42" rx="4" fill={MECHANISMS[5].colour} opacity="0.85" stroke="hsl(var(--foreground))" strokeWidth="1" />
              <text x="483" y="161" textAnchor="middle" className="fill-background" fontSize="10" fontWeight="700">µ-receptor</text>
              <ellipse cx="360" cy="248" rx="42" ry="20" fill={MECHANISMS[1].colour} opacity="0.22" stroke={MECHANISMS[1].colour} strokeWidth="2" />
              <text x="360" y="252" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="700">PKC</text>
              <path d="M 400 240 Q 460 205 478 182" fill="none" stroke={MECHANISMS[1].colour} strokeWidth="2" markerEnd="url(#ktrArrow)" />
              <text x="430" y="222" className="fill-muted-foreground" fontSize="9">P → uncoupling</text>
              <path d="M 330 232 Q 268 200 252 182" fill="none" stroke={MECHANISMS[1].colour} strokeWidth="2" strokeDasharray="4 3" markerEnd="url(#ktrArrow)" />
              <text x="196" y="222" className="fill-muted-foreground" fontSize="9">↓ Mg²⁺ block</text>
              <line x1="336" y1="268" x2="392" y2="290" stroke="hsl(0 68% 55%)" strokeWidth="3" />
              <line x1="392" y1="268" x2="336" y2="290" stroke="hsl(0 68% 55%)" strokeWidth="3" />
              <text x="404" y="288" className="fill-foreground" fontSize="9" fontWeight="600">loop broken → MOR re-couples to Gi/Go</text>
            </g>

            {/* ---------- 3. CaMKII / nNOS ---------- */}
            <g opacity={dim(3)} className={pulse(3)}>
              <rect x="120" y="308" width="120" height="46" rx="6" fill={MECHANISMS[2].colour} opacity="0.18" stroke={MECHANISMS[2].colour} strokeWidth="1.5" />
              <text x="180" y="328" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="700">CaMKII ↓</text>
              <text x="180" y="343" textAnchor="middle" className="fill-muted-foreground" fontSize="9">autophosphorylation lost</text>
              <rect x="252" y="308" width="126" height="46" rx="6" fill={MECHANISMS[2].colour} opacity="0.18" stroke={MECHANISMS[2].colour} strokeWidth="1.5" />
              <text x="315" y="328" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="700">nNOS → NO → cGMP ↓</text>
              <text x="315" y="343" textAnchor="middle" className="fill-muted-foreground" fontSize="9">spinal LTP reversed</text>
            </g>

            {/* ---------- 4. Descending facilitation ---------- */}
            <g opacity={dim(4)} className={pulse(4)}>
              <rect x="590" y="232" width="180" height="52" rx="8" fill={MECHANISMS[3].colour} opacity="0.18" stroke={MECHANISMS[3].colour} strokeWidth="1.5" />
              <text x="680" y="252" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="700">RVM “on-cells” ↓</text>
              <text x="680" y="268" textAnchor="middle" className="fill-muted-foreground" fontSize="9">spinal dynorphin ↓, CGRP/SP ↓</text>
              <path d="M 590 262 Q 480 300 400 316" fill="none" stroke={MECHANISMS[3].colour} strokeWidth="2" strokeDasharray="5 4" markerEnd="url(#ktrArrow)" />
              <text x="470" y="300" className="fill-muted-foreground" fontSize="9">descending facilitation</text>
            </g>

            {/* ---------- 5. Glia / BDNF / KCC2 ---------- */}
            <g opacity={dim(5)} className={pulse(5)}>
              <ellipse cx="680" cy="380" rx="66" ry="30" fill={MECHANISMS[4].colour} opacity="0.2" stroke={MECHANISMS[4].colour} strokeWidth="1.5" />
              <text x="680" y="376" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="700">Microglia inhibited</text>
              <text x="680" y="392" textAnchor="middle" className="fill-muted-foreground" fontSize="9">TLR4 / P2X7 → IL-1β, TNF-α ↓</text>
              <path d="M 614 380 Q 520 380 452 372" fill="none" stroke={MECHANISMS[4].colour} strokeWidth="2" markerEnd="url(#ktrArrow)" />
              <rect x="300" y="350" width="150" height="46" rx="6" fill={MECHANISMS[4].colour} opacity="0.14" stroke={MECHANISMS[4].colour} strokeWidth="1.5" />
              <text x="375" y="370" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="700">BDNF–TrkB ↓ → KCC2 ↑</text>
              <text x="375" y="385" textAnchor="middle" className="fill-muted-foreground" fontSize="9">Cl⁻ gradient and GABA inhibition restored</text>
            </g>

            {/* ---------- 6. β-arrestin-2 ---------- */}
            <g opacity={dim(6)} className={pulse(6)}>
              <ellipse cx="560" cy="212" rx="46" ry="19" fill={MECHANISMS[5].colour} opacity="0.2" stroke={MECHANISMS[5].colour} strokeWidth="2" />
              <text x="560" y="216" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="700">β-arrestin-2 ↓</text>
              <line x1="516" y1="182" x2="546" y2="196" stroke={MECHANISMS[5].colour} strokeWidth="2" strokeDasharray="4 3" markerEnd="url(#ktrArrow)" />
              <text x="470" y="200" className="fill-muted-foreground" fontSize="9">GRK-P ↓</text>
              <circle cx="612" cy="176" r="20" fill="none" stroke={MECHANISMS[5].colour} strokeWidth="1.5" strokeDasharray="3 3" />
              <text x="612" y="180" textAnchor="middle" className="fill-muted-foreground" fontSize="8">endosome</text>
              <text x="560" y="240" textAnchor="middle" className="fill-muted-foreground" fontSize="9">
                opioid dose sparing → less internalisation, less AC superactivation
              </text>
            </g>

            {/* ---------- 7. Secondary targets ---------- */}
            <g opacity={dim(7)} className={pulse(7)}>
              <rect x="60" y="416" width="230" height="60" rx="8" fill={MECHANISMS[6].colour} opacity="0.16" stroke={MECHANISMS[6].colour} strokeWidth="1.5" />
              <text x="175" y="437" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="700">HCN1 ↓ · adenosine A₁ ↑</text>
              <text x="175" y="453" textAnchor="middle" className="fill-muted-foreground" fontSize="9">monoamine reuptake inhibition</text>
              <text x="175" y="467" textAnchor="middle" className="fill-muted-foreground" fontSize="9">— additional direct analgesia</text>
              <rect x="310" y="416" width="250" height="60" rx="8" fill={MECHANISMS[6].colour} opacity="0.16" stroke={MECHANISMS[6].colour} strokeWidth="1.5" />
              <text x="435" y="437" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="700">(2R,6R)-hydroxynorketamine</text>
              <text x="435" y="453" textAnchor="middle" className="fill-muted-foreground" fontSize="9">AMPA-R → mTORC1 → synaptogenesis</text>
              <text x="435" y="467" textAnchor="middle" className="fill-muted-foreground" fontSize="9">NMDA-independent, outlasts the infusion</text>
            </g>

            {/* ---------- caption bar ---------- */}
            <rect x="60" y="500" width="700" height="48" rx="8" fill={mech.colour} opacity="0.15" stroke={mech.colour} strokeWidth="2" />
            <text x="410" y="520" textAnchor="middle" className="fill-foreground" fontSize="12" fontWeight="700">
              {mech.id}. {mech.title}
            </text>
            <text x="410" y="537" textAnchor="middle" className="fill-foreground" fontSize="10">
              {showSources ? mech.sources.map((s) => s.label).join(" · ") : mech.target}
            </text>
            {showSources && (
              <text x="70" y="514" className="fill-muted-foreground" fontSize="9" fontWeight="600">
                EVIDENCE
              </text>
            )}
          </svg>
        </div>

        {/* Detail panel */}
        <div
          className="mt-4 p-4 rounded-lg border-2"
          style={{ borderColor: mech.colour, backgroundColor: "hsl(var(--muted) / 0.35)" }}
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
            Mechanism {mech.id} of 7
          </p>
          <h4 className="font-serif font-bold text-foreground text-base mb-1">{mech.title}</h4>
          <p className="text-sm text-muted-foreground leading-relaxed mb-2">{mech.summary}</p>
          <p className="text-sm text-foreground leading-relaxed">
            <span className="font-semibold">Net effect: </span>
            {mech.consequence}
          </p>
          {showSources && (
            <div className="mt-3 pt-3 border-t border-border">
              <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5">
                <BookOpen className="h-3 w-3" /> Sources for mechanism {mech.id}
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {mech.sources.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-full border border-border bg-card px-2 py-0.5 text-[11px] font-medium text-foreground hover:bg-muted hover:border-foreground/40 transition-colors"
                      title={`Open ${s.label}`}
                    >
                      {s.label}
                      <ExternalLink className="h-2.5 w-2.5 text-muted-foreground" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Expandable full reference list for all seven mechanisms */}
        <details className="mt-4 group rounded-lg border border-border bg-card overflow-hidden">
          <summary className="flex items-center justify-between gap-3 cursor-pointer list-none px-4 py-3 text-sm font-medium text-foreground hover:bg-muted/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
            <span className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-muted-foreground" aria-hidden />
              Full reference list
            </span>
            <svg
              className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-4 pb-4 pt-1 border-t border-border">
            <ol className="space-y-4">
              {MECHANISMS.map((m) => (
                <li key={m.id}>
                  <div className="flex items-start gap-2 mb-1.5">
                    <span
                      className="inline-flex items-center justify-center h-5 w-5 rounded-full text-[10px] font-bold text-background shrink-0 mt-0.5"
                      style={{ backgroundColor: m.colour }}
                    >
                      {m.id}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{m.title}</p>
                      <p className="text-xs text-muted-foreground">{m.target}</p>
                    </div>
                  </div>
                  <ul className="flex flex-wrap gap-1.5 pl-7">
                    {m.sources.map((s) => (
                      <li key={s.label}>
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/50 px-2 py-0.5 text-[11px] font-medium text-foreground hover:bg-muted hover:border-foreground/40 transition-colors"
                          title={`Open ${s.label}`}
                        >
                          {s.label}
                          <ExternalLink className="h-2.5 w-2.5 text-muted-foreground" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </details>

        {/* Static text fallback — always in the DOM for screen readers and print */}
        <ol className="sr-only">
          {MECHANISMS.map((m) => (
            <li key={m.id}>
              {m.title} ({m.target}). {m.summary} {m.consequence} Sources: {m.sources.map((s) => s.label).join("; ")}.
            </li>
          ))}
        </ol>
      </div>
    </DiagramFigure>
  );
};
