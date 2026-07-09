import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { SectionLayout } from "@/components/layout/SectionLayout";
import AnimatedMechanism, {
  type AnimatedMechanismStep,
} from "@/components/diagrams/shared/AnimatedMechanism";

/**
 * Immunology for Intensivists
 *
 * FFICM / EDIC-oriented single-page overview of the immune system as it
 * matters at the bedside: innate vs adaptive arms, humoral vs cell-mediated
 * responses, the major cell lines, the complement cascade (animated), and
 * how the immune response differs between bacterial, viral, fungal,
 * protozoal and prion pathogens.
 *
 * All colour is via semantic tokens (icu / clinical / physiology).
 * Custom inline SVGs deliberately avoid the "*Diagram" suffix so the
 * `diagram-needs-heading` ESLint rule does not require the wrapper; they
 * still live under an <h2> and use <figure>/<figcaption> for a11y.
 */

// ---------------------------------------------------------------------------
// Innate vs Adaptive — timeline SVG
// ---------------------------------------------------------------------------
const InnateAdaptiveTimeline = () => (
  <figure
    role="group"
    aria-labelledby="innate-adaptive-fig"
    className="rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm"
  >
    <figcaption id="innate-adaptive-fig" className="sr-only">
      Timeline of the immune response — innate (0–96 h, non-specific,
      no memory) precedes and overlaps with adaptive (from ~4–7 days,
      specific, memory-forming).
    </figcaption>
    <svg
      viewBox="0 0 640 260"
      role="img"
      aria-label="Innate vs adaptive immune response timeline"
      className="w-full h-auto"
    >
      {/* Axis */}
      <line x1="50" y1="220" x2="620" y2="220" stroke="hsl(var(--border))" strokeWidth="1.5" />
      {[0, 1, 3, 7, 14, 21].map((d, i) => {
        const x = 50 + (i * (570 / 5));
        return (
          <g key={d}>
            <line x1={x} y1="216" x2={x} y2="224" stroke="hsl(var(--border))" strokeWidth="1" />
            <text x={x} y="240" textAnchor="middle" fontSize="11" fill="hsl(var(--muted-foreground))">
              {d === 0 ? "0 h" : `${d} d`}
            </text>
          </g>
        );
      })}
      <text x="335" y="256" textAnchor="middle" fontSize="11" fill="hsl(var(--muted-foreground))">
        Time from pathogen exposure
      </text>

      {/* Innate curve */}
      <path
        d="M 50 200 Q 100 60 180 90 Q 260 120 340 160 Q 420 190 620 205"
        fill="hsl(var(--icu) / 0.15)"
        stroke="hsl(var(--icu))"
        strokeWidth="2"
      />
      <text x="140" y="60" fontSize="12" fontWeight="600" fill="hsl(var(--icu))">
        Innate
      </text>
      <text x="140" y="76" fontSize="10" fill="hsl(var(--muted-foreground))">
        minutes–hours · no memory
      </text>

      {/* Adaptive curve */}
      <path
        d="M 50 220 L 220 220 Q 320 220 380 140 Q 450 60 520 40 Q 570 32 620 60"
        fill="hsl(var(--clinical) / 0.15)"
        stroke="hsl(var(--clinical))"
        strokeWidth="2"
      />
      <text x="440" y="50" fontSize="12" fontWeight="600" fill="hsl(var(--clinical))">
        Adaptive
      </text>
      <text x="440" y="66" fontSize="10" fill="hsl(var(--muted-foreground))">
        days–weeks · specific · memory
      </text>

      {/* Bridge label */}
      <line x1="240" y1="110" x2="240" y2="220" stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" strokeWidth="1" />
      <text x="246" y="122" fontSize="10" fill="hsl(var(--muted-foreground))">
        Dendritic cells present antigen → prime T cells
      </text>
    </svg>
  </figure>
);

// ---------------------------------------------------------------------------
// Humoral vs Cell-mediated — split SVG
// ---------------------------------------------------------------------------
const HumoralCellMediatedSplit = () => (
  <figure
    role="group"
    aria-labelledby="humoral-cellmed-fig"
    className="rounded-xl border border-border bg-card p-4 sm:p-5 shadow-sm"
  >
    <figcaption id="humoral-cellmed-fig" className="sr-only">
      Humoral response — B cells → plasma cells → antibodies (extracellular
      pathogens). Cell-mediated response — CD8 cytotoxic T cells kill
      infected/tumour cells; CD4 Th1 activates macrophages.
    </figcaption>
    <svg
      viewBox="0 0 720 320"
      role="img"
      aria-label="Humoral versus cell-mediated adaptive immunity"
      className="w-full h-auto"
    >
      {/* Divider */}
      <line x1="360" y1="20" x2="360" y2="300" stroke="hsl(var(--border))" strokeDasharray="4 4" />

      {/* --- Humoral (left) --- */}
      <text x="180" y="36" textAnchor="middle" fontSize="13" fontWeight="700" fill="hsl(var(--clinical))">
        Humoral (B-cell) response
      </text>
      <text x="180" y="52" textAnchor="middle" fontSize="10" fill="hsl(var(--muted-foreground))">
        Extracellular bacteria · toxins · viruses in blood
      </text>

      {/* APC */}
      <circle cx="80" cy="120" r="26" fill="hsl(var(--clinical) / 0.15)" stroke="hsl(var(--clinical))" />
      <text x="80" y="124" textAnchor="middle" fontSize="10" fontWeight="600" fill="hsl(var(--foreground))">APC</text>
      <text x="80" y="164" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">MHC-II</text>

      {/* CD4 Th2 */}
      <circle cx="180" cy="120" r="24" fill="hsl(var(--icu) / 0.15)" stroke="hsl(var(--icu))" />
      <text x="180" y="118" textAnchor="middle" fontSize="10" fontWeight="600" fill="hsl(var(--foreground))">CD4</text>
      <text x="180" y="130" textAnchor="middle" fontSize="9" fill="hsl(var(--foreground))">Th2</text>

      {/* B cell → Plasma cell */}
      <circle cx="280" cy="120" r="24" fill="hsl(var(--clinical) / 0.2)" stroke="hsl(var(--clinical))" />
      <text x="280" y="124" textAnchor="middle" fontSize="10" fontWeight="600" fill="hsl(var(--foreground))">B</text>

      {/* Arrows */}
      {[[106, 120, 156, 120], [204, 120, 256, 120]].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" markerEnd="url(#arrow)" />
      ))}

      {/* Plasma + Memory */}
      <circle cx="200" cy="230" r="20" fill="hsl(var(--clinical) / 0.25)" stroke="hsl(var(--clinical))" />
      <text x="200" y="234" textAnchor="middle" fontSize="9" fontWeight="600">Plasma</text>
      <circle cx="280" cy="230" r="18" fill="hsl(var(--card))" stroke="hsl(var(--clinical))" strokeDasharray="3 2" />
      <text x="280" y="234" textAnchor="middle" fontSize="9">Memory B</text>
      <line x1="270" y1="140" x2="215" y2="212" stroke="hsl(var(--muted-foreground))" strokeWidth="1.2" markerEnd="url(#arrow)" />
      <line x1="290" y1="142" x2="280" y2="210" stroke="hsl(var(--muted-foreground))" strokeWidth="1.2" markerEnd="url(#arrow)" />

      {/* Antibodies */}
      <g transform="translate(120,270)">
        <text x="0" y="0" fontSize="10" fontWeight="600" fill="hsl(var(--clinical))">IgM → IgG → IgA/IgE</text>
        <text x="0" y="14" fontSize="9" fill="hsl(var(--muted-foreground))">
          Neutralisation · opsonisation · complement fixation
        </text>
      </g>

      {/* --- Cell-mediated (right) --- */}
      <text x="540" y="36" textAnchor="middle" fontSize="13" fontWeight="700" fill="hsl(var(--icu))">
        Cell-mediated (T-cell) response
      </text>
      <text x="540" y="52" textAnchor="middle" fontSize="10" fill="hsl(var(--muted-foreground))">
        Intracellular pathogens · viruses · fungi · tumour cells
      </text>

      <circle cx="420" cy="120" r="26" fill="hsl(var(--icu) / 0.15)" stroke="hsl(var(--icu))" />
      <text x="420" y="124" textAnchor="middle" fontSize="10" fontWeight="600">APC</text>
      <text x="420" y="164" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))">MHC-I / II</text>

      <circle cx="530" cy="90" r="22" fill="hsl(var(--physiology) / 0.15)" stroke="hsl(var(--physiology))" />
      <text x="530" y="88" textAnchor="middle" fontSize="10" fontWeight="600">CD4</text>
      <text x="530" y="100" textAnchor="middle" fontSize="9">Th1</text>

      <circle cx="530" cy="160" r="22" fill="hsl(var(--icu) / 0.2)" stroke="hsl(var(--icu))" />
      <text x="530" y="158" textAnchor="middle" fontSize="10" fontWeight="600">CD8</text>
      <text x="530" y="170" textAnchor="middle" fontSize="9">CTL</text>

      <line x1="444" y1="112" x2="508" y2="94" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" markerEnd="url(#arrow)" />
      <line x1="444" y1="130" x2="508" y2="156" stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" markerEnd="url(#arrow)" />

      {/* Effector arrows */}
      <circle cx="640" cy="90" r="18" fill="hsl(var(--physiology) / 0.15)" stroke="hsl(var(--physiology))" />
      <text x="640" y="88" textAnchor="middle" fontSize="9" fontWeight="600">Mφ</text>
      <text x="640" y="100" textAnchor="middle" fontSize="8">activated</text>
      <line x1="552" y1="90" x2="622" y2="90" stroke="hsl(var(--muted-foreground))" strokeWidth="1.2" markerEnd="url(#arrow)" />
      <text x="588" y="82" textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">IFN-γ</text>

      <rect x="620" y="150" width="40" height="26" rx="4" fill="hsl(var(--destructive) / 0.15)" stroke="hsl(var(--destructive))" />
      <text x="640" y="167" textAnchor="middle" fontSize="9" fontWeight="600" fill="hsl(var(--destructive))">apoptosis</text>
      <line x1="552" y1="160" x2="620" y2="162" stroke="hsl(var(--muted-foreground))" strokeWidth="1.2" markerEnd="url(#arrow)" />
      <text x="588" y="152" textAnchor="middle" fontSize="8" fill="hsl(var(--muted-foreground))">perforin/granzyme</text>

      <g transform="translate(400,270)">
        <text x="0" y="0" fontSize="10" fontWeight="600" fill="hsl(var(--icu))">
          IFN-γ · perforin · granzyme · FasL
        </text>
        <text x="0" y="14" fontSize="9" fill="hsl(var(--muted-foreground))">
          Kills infected cells · activates macrophages · granuloma formation
        </text>
      </g>

      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="hsl(var(--muted-foreground))" />
        </marker>
      </defs>
    </svg>
  </figure>
);

// ---------------------------------------------------------------------------
// Complement cascade — animated stepper
// ---------------------------------------------------------------------------
type ComplementNode = {
  id: "classical" | "lectin" | "alternative" | "c3" | "c3conv" | "c5" | "mac" | "anaphyla";
  label: string;
  x: number;
  y: number;
  activeAt: number[];
};

const nodes: ComplementNode[] = [
  { id: "classical",   label: "Classical\n(Ag–Ab · C1q)", x: 80,  y: 50,  activeAt: [0] },
  { id: "lectin",      label: "Lectin\n(MBL · MASP)",     x: 80,  y: 130, activeAt: [0] },
  { id: "alternative", label: "Alternative\n(spontaneous)", x: 80, y: 210, activeAt: [0] },
  { id: "c3conv",      label: "C3 convertase",             x: 260, y: 130, activeAt: [1] },
  { id: "c3",          label: "C3 → C3a + C3b",            x: 420, y: 130, activeAt: [2] },
  { id: "c5",          label: "C5 → C5a + C5b",            x: 580, y: 90,  activeAt: [3] },
  { id: "anaphyla",    label: "C3a / C5a\n(anaphylatoxins)", x: 420, y: 240, activeAt: [4] },
  { id: "mac",         label: "MAC\nC5b–C9",               x: 580, y: 210, activeAt: [4] },
];

const ComplementScene = ({ active }: { active: number }) => (
  <svg
    viewBox="0 0 680 300"
    role="img"
    aria-label="Complement cascade — three initiating pathways converge on C3 convertase, generating C3a/C5a anaphylatoxins and the membrane attack complex"
    className="w-full h-auto"
  >
    <defs>
      <marker id="cmp-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="hsl(var(--muted-foreground))" />
      </marker>
    </defs>

    {/* Edges */}
    {[
      ["classical", "c3conv"],
      ["lectin", "c3conv"],
      ["alternative", "c3conv"],
      ["c3conv", "c3"],
      ["c3", "c5"],
      ["c3", "anaphyla"],
      ["c5", "mac"],
      ["c5", "anaphyla"],
    ].map(([a, b], i) => {
      const na = nodes.find((n) => n.id === a)!;
      const nb = nodes.find((n) => n.id === b)!;
      return (
        <line
          key={i}
          x1={na.x + 55}
          y1={na.y}
          x2={nb.x - 55}
          y2={nb.y}
          stroke="hsl(var(--muted-foreground))"
          strokeOpacity={0.6}
          strokeWidth="1.4"
          markerEnd="url(#cmp-arrow)"
        />
      );
    })}

    {/* Nodes */}
    {nodes.map((n) => {
      const isActive = n.activeAt.includes(active);
      return (
        <g key={n.id} className="transition-opacity duration-300" style={{ opacity: isActive ? 1 : 0.45 }}>
          <rect
            x={n.x - 55}
            y={n.y - 22}
            width="110"
            height="44"
            rx="8"
            fill={isActive ? "hsl(var(--icu) / 0.2)" : "hsl(var(--card))"}
            stroke={isActive ? "hsl(var(--icu))" : "hsl(var(--border))"}
            strokeWidth={isActive ? 2 : 1}
          />
          {n.label.split("\n").map((ln, i) => (
            <text
              key={i}
              x={n.x}
              y={n.y - 4 + i * 12}
              textAnchor="middle"
              fontSize="10"
              fontWeight={i === 0 ? 600 : 400}
              fill="hsl(var(--foreground))"
            >
              {ln}
            </text>
          ))}
        </g>
      );
    })}
  </svg>
);

const complementSteps: AnimatedMechanismStep[] = [
  {
    label: "Three pathways",
    detail: (
      <>
        Three independent triggers converge on the same amplifier.{" "}
        <strong>Classical</strong>: antigen–antibody complexes bind C1q.{" "}
        <strong>Lectin</strong>: mannose-binding lectin recognises pathogen sugars via MASP.{" "}
        <strong>Alternative</strong>: spontaneous C3 hydrolysis on any surface lacking regulatory
        proteins (bacterial cell walls).
      </>
    ),
    callout: <>C1 esterase inhibitor deficiency → hereditary angioedema (unopposed classical pathway).</>,
  },
  {
    label: "C3 convertase",
    detail: (
      <>
        All three pathways form a <strong>C3 convertase</strong> on the pathogen surface
        (C4b2a for classical/lectin; C3bBb for alternative). This is the cascade's central
        amplification step.
      </>
    ),
  },
  {
    label: "C3 cleavage",
    detail: (
      <>
        C3 is cleaved to <strong>C3a</strong> (anaphylatoxin) and <strong>C3b</strong> (opsonin
        that coats the pathogen for phagocytosis via CR1 on neutrophils and macrophages).
      </>
    ),
    callout: <>Opsonisation is the dominant reason splenectomised patients are vulnerable to encapsulated organisms.</>,
  },
  {
    label: "C5 cleavage",
    detail: (
      <>
        C3b joins the convertase to form a <strong>C5 convertase</strong>, cleaving C5 into
        C5a (potent anaphylatoxin/chemotaxin) and C5b (initiates the terminal pathway).
      </>
    ),
  },
  {
    label: "Effectors",
    detail: (
      <>
        Two effector arms fire in parallel: <strong>C3a &amp; C5a</strong> drive mast-cell
        degranulation, vasodilatation and neutrophil chemotaxis; <strong>C5b–C9</strong>{" "}
        assembles the <strong>membrane attack complex (MAC)</strong> that lyses
        Gram-negative bacteria.
      </>
    ),
    callout: (
      <>
        Terminal complement (C5–C9) deficiency → recurrent Neisseria infections.
        Eculizumab (anti-C5) blocks MAC formation — patients need meningococcal
        vaccination before starting.
      </>
    ),
  },
];

// ---------------------------------------------------------------------------
// Data tables
// ---------------------------------------------------------------------------
const cellLines: Array<{ cell: string; lineage: string; role: string }> = [
  { cell: "Neutrophil", lineage: "Myeloid", role: "First responder — phagocytosis, NETs, respiratory burst; short-lived (~24 h in tissue)" },
  { cell: "Monocyte / Macrophage", lineage: "Myeloid", role: "Tissue phagocytosis, antigen presentation (MHC-II), cytokine release (TNF-α, IL-1, IL-6); polarise M1 (kill) vs M2 (repair)" },
  { cell: "Dendritic cell", lineage: "Myeloid", role: "Professional antigen-presenting cell — the bridge to adaptive immunity" },
  { cell: "Eosinophil", lineage: "Myeloid", role: "Anti-parasitic (helminths); type 1 hypersensitivity / asthma" },
  { cell: "Basophil / Mast cell", lineage: "Myeloid", role: "IgE-mediated degranulation — histamine, tryptase, leukotrienes (anaphylaxis)" },
  { cell: "Natural killer (NK)", lineage: "Lymphoid (innate)", role: "Kills MHC-I-low cells (viral, tumour) via perforin/granzyme; no antigen specificity" },
  { cell: "B lymphocyte", lineage: "Lymphoid", role: "Humoral immunity — differentiates to plasma cells → antibodies; memory B cells" },
  { cell: "CD4⁺ T helper", lineage: "Lymphoid", role: "Th1 → macrophage activation; Th2 → antibody/allergy; Th17 → neutrophils/mucosa; Treg → tolerance" },
  { cell: "CD8⁺ cytotoxic T", lineage: "Lymphoid", role: "Kills virally infected and tumour cells via perforin/granzyme and Fas–FasL" },
];

const pathogenResponse: Array<{
  pathogen: string;
  keyRecognition: string;
  dominantArm: string;
  criticalCare: string;
}> = [
  {
    pathogen: "Bacteria (extracellular)",
    keyRecognition: "TLR2/4 sense LPS, peptidoglycan · complement opsonisation (C3b) · antibody (IgG/IgM)",
    dominantArm: "Innate + humoral — neutrophils, complement, antibody",
    criticalCare: "Septic shock, DIC; hyposplenism → encapsulated organisms; complement deficiency → Neisseria",
  },
  {
    pathogen: "Viruses (intracellular)",
    keyRecognition: "TLR3/7/9 sense viral nucleic acids · type I interferons (IFN-α/β) · MHC-I presentation",
    dominantArm: "Cell-mediated — CD8⁺ CTLs, NK cells; neutralising antibody",
    criticalCare: "Viral pneumonitis / ARDS; cytokine storm (IL-6); reactivation (CMV, HSV) in ICU immunosuppression",
  },
  {
    pathogen: "Fungi",
    keyRecognition: "Dectin-1 senses β-glucan · TLR2/4 · mannose receptor",
    dominantArm: "Neutrophils + Th17 (IL-17) + macrophages; granuloma for dimorphic fungi",
    criticalCare: "Invasive candidiasis in TPN/CVC; aspergillosis in neutropenia and post-influenza; PJP in T-cell deficiency",
  },
  {
    pathogen: "Protozoa",
    keyRecognition: "Varied PAMPs; intracellular (Plasmodium, Leishmania, Toxoplasma) or extracellular",
    dominantArm: "Th1 / macrophage activation for intracellular; antibody + eosinophils for extracellular",
    criticalCare: "Severe malaria (cerebral, ARDS, AKI); toxoplasmosis reactivation in HIV/transplant",
  },
  {
    pathogen: "Prions",
    keyRecognition: "No nucleic acid → no PAMP → immune system does not recognise misfolded PrPˢᶜ",
    dominantArm: "None — effectively invisible to innate and adaptive immunity",
    criticalCare: "vCJD/CJD; instrument decontamination requires NaOH or autoclave 134 °C · standard disinfection is inadequate",
  },
];

// ---------------------------------------------------------------------------
// FAQs (for JSON-LD + on-page)
// ---------------------------------------------------------------------------
const faqs: Array<[string, string]> = [
  [
    "What is the difference between innate and adaptive immunity?",
    "Innate immunity is the rapid (minutes to hours), non-specific first line — physical barriers, complement, neutrophils, macrophages, NK cells and pattern-recognition receptors. It has no memory. Adaptive immunity is slower to start (days), highly specific through T-cell receptors and B-cell immunoglobulins, and forms long-lived memory. The two arms are linked by dendritic cells, which sample pathogens and present antigen on MHC to prime naïve T cells.",
  ],
  [
    "What is the difference between humoral and cell-mediated immunity?",
    "Humoral (B-cell) immunity handles extracellular pathogens and toxins — B cells differentiate into plasma cells that secrete antibodies (IgM → IgG, IgA, IgE) which neutralise, opsonise and fix complement. Cell-mediated (T-cell) immunity deals with intracellular threats: CD8⁺ cytotoxic T cells kill virally infected and tumour cells via perforin/granzyme, while CD4⁺ Th1 cells activate macrophages to kill intracellular bacteria and fungi.",
  ],
  [
    "What are the three pathways of the complement cascade?",
    "Classical (antigen–antibody complexes activate C1q), lectin (mannose-binding lectin recognises pathogen sugars) and alternative (spontaneous C3 hydrolysis on surfaces without regulatory proteins). All three converge on C3 convertase, which cleaves C3 to C3a (anaphylatoxin) and C3b (opsonin), then form a C5 convertase leading to C5a and the C5b–C9 membrane attack complex.",
  ],
  [
    "Why are complement-deficient patients prone to Neisseria infection?",
    "Neisseria species (meningococcus, gonococcus) are killed largely by the membrane attack complex (C5b–C9). Patients with terminal complement (C5–C9) or properdin deficiency, and those on eculizumab (anti-C5), cannot form MAC and are at markedly increased risk of invasive meningococcal disease — meningococcal vaccination before eculizumab is mandatory.",
  ],
  [
    "How does the immune response to viruses differ from bacteria?",
    "Bacteria (mostly extracellular) are dealt with by complement opsonisation, neutrophils and antibody. Viruses are intracellular — infected cells present viral peptides on MHC-I to CD8⁺ cytotoxic T cells, which kill them via perforin/granzyme; NK cells kill cells that down-regulate MHC-I; type I interferons (IFN-α/β) induce an antiviral state in neighbouring cells. Neutralising antibody prevents entry but does not clear established intracellular infection.",
  ],
  [
    "Why does the immune system not recognise prions?",
    "Prions are misfolded host proteins (PrPˢᶜ) with no nucleic acid and no non-self PAMPs. Pattern-recognition receptors do not detect them, no antibody response is mounted, and there is no inflammatory infiltrate around the resulting spongiform change. This is why standard disinfection is inadequate for prion-contaminated instruments — decontamination requires 1 M NaOH or autoclaving at 134 °C for a prolonged cycle.",
  ],
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
const ImmunologyIntensivistsTopic = () => {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([name, acceptedAnswer]) => ({
      "@type": "Question",
      name,
      acceptedAnswer: { "@type": "Answer", text: acceptedAnswer },
    })),
  };

  return (
    <>
      <Helmet>
        <title>Immunology for Intensivists | FFICM &amp; EDIC</title>
        <meta
          property="og:title"
          content="Immunology for Intensivists | FFICM & EDIC"
        />
        <meta name="twitter:title" content="Immunology for Intensivists | FFICM & EDIC" />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>
      <SectionLayout
        title="Immunology for Intensivists"
        subtitle="Innate vs adaptive immunity, humoral vs cell-mediated responses, the major immune cell lines, the complement cascade, and how the immune response differs between bacterial, viral, fungal, protozoal and prion pathogens."
        backPath="/intensive-care"
        backLabel="Intensive Care"
        accentColor="text-icu"
        metaDescription="FFICM & EDIC immunology: innate vs adaptive immunity, humoral vs cell-mediated responses, key immune cell lines, complement cascade animation, and immune responses to bacterial, viral, fungal, protozoal and prion infections."
      >
        <div className="space-y-10">
          {/* ---------------- Overview ---------------- */}
          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-foreground">
              Two arms, one system
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              The immune system defends against infection through two
              overlapping arms. The <strong>innate</strong> response is
              hard-wired, fires within minutes, and recognises broad
              pathogen-associated molecular patterns (PAMPs) via
              pattern-recognition receptors (TLRs, NLRs, dectin, MBL).
              The <strong>adaptive</strong> response is slower (days) but
              exquisitely specific and forms long-lived memory through
              clonal expansion of T and B lymphocytes. Dendritic cells
              bridge the two arms by presenting antigen on MHC molecules
              to prime naïve T cells.
            </p>
            <InnateAdaptiveTimeline />
          </section>

          {/* ---------------- Innate / adaptive tiles ---------------- */}
          <section className="grid gap-4 md:grid-cols-2">
            <article className="rounded-xl border border-icu/40 bg-icu/5 p-5 space-y-2">
              <h3 className="text-lg font-serif font-semibold text-foreground">
                Innate immunity
              </h3>
              <ul className="text-sm text-muted-foreground leading-relaxed list-disc list-inside space-y-1">
                <li>Barriers: skin, mucosa, cilia, gastric acid, commensal flora</li>
                <li>Cells: neutrophils, monocytes/macrophages, dendritic cells, NK cells, eosinophils, basophils, mast cells</li>
                <li>Soluble: complement, acute-phase proteins (CRP, MBL), cytokines (TNF-α, IL-1, IL-6, type I IFNs)</li>
                <li>Recognition: TLR2/4 (bacterial), TLR3/7/9 (viral nucleic acids), dectin-1 (fungal β-glucan)</li>
                <li><strong>No memory · no somatic recombination</strong></li>
              </ul>
            </article>
            <article className="rounded-xl border border-clinical/40 bg-clinical/5 p-5 space-y-2">
              <h3 className="text-lg font-serif font-semibold text-foreground">
                Adaptive immunity
              </h3>
              <ul className="text-sm text-muted-foreground leading-relaxed list-disc list-inside space-y-1">
                <li>B lymphocytes → plasma cells → antibody (humoral)</li>
                <li>T lymphocytes: CD4⁺ helper (Th1/Th2/Th17/Treg) and CD8⁺ cytotoxic</li>
                <li>Antigen presentation: MHC-I (all nucleated cells → CD8⁺); MHC-II (professional APCs → CD4⁺)</li>
                <li>V(D)J recombination generates ~10¹¹ receptor specificities</li>
                <li><strong>Immunological memory · vaccine responsiveness</strong></li>
              </ul>
            </article>
          </section>

          {/* ---------------- Humoral vs cell-mediated ---------------- */}
          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-foreground">
              Humoral vs cell-mediated response
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Adaptive immunity splits along the extracellular / intracellular
              divide. Extracellular pathogens and toxins are cleared by
              antibodies (humoral); intracellular pathogens require killing
              of the infected host cell (cell-mediated).
            </p>
            <HumoralCellMediatedSplit />
          </section>

          {/* ---------------- Cell lines table ---------------- */}
          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-foreground">
              Key immune cell lines
            </h2>
            <p className="text-sm text-muted-foreground">
              All lineages arise from the haematopoietic stem cell, splitting
              into myeloid and lymphoid progenitors in the bone marrow. T cells
              mature in the thymus; B cells in the bone marrow.
            </p>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-secondary/40 text-foreground">
                  <tr>
                    <th className="text-left px-3 py-2 font-semibold">Cell</th>
                    <th className="text-left px-3 py-2 font-semibold">Lineage</th>
                    <th className="text-left px-3 py-2 font-semibold">Role</th>
                  </tr>
                </thead>
                <tbody>
                  {cellLines.map((row) => (
                    <tr key={row.cell} className="border-t border-border">
                      <td className="px-3 py-2 font-medium text-foreground whitespace-nowrap">{row.cell}</td>
                      <td className="px-3 py-2 text-muted-foreground whitespace-nowrap">{row.lineage}</td>
                      <td className="px-3 py-2 text-muted-foreground">{row.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ---------------- Complement animation ---------------- */}
          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-foreground">
              The complement cascade
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Complement is ~30 plasma proteins produced mainly by the liver.
              It amplifies innate immunity through three initiating pathways
              that converge on C3, generating opsonins (C3b), anaphylatoxins
              (C3a, C5a) and the membrane attack complex (C5b–C9).
            </p>
            <AnimatedMechanism
              title="Complement cascade — three pathways to MAC"
              subtitle="Classical, lectin and alternative pathways converge on C3 convertase, then split into anaphylatoxin and MAC effector arms."
              steps={complementSteps}
              renderScene={(active) => <ComplementScene active={active} />}
              stepMs={3000}
              accentClass="border-icu/40"
            />
          </section>

          {/* ---------------- Pathogen response table ---------------- */}
          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-foreground">
              Immune response by pathogen class
            </h2>
            <p className="text-sm text-muted-foreground">
              Which arm of the immune system dominates depends on where the
              pathogen lives. Extracellular organisms are killed by
              complement, phagocytes and antibody; intracellular organisms
              require T-cell-mediated killing of the host cell.
            </p>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-secondary/40 text-foreground">
                  <tr>
                    <th className="text-left px-3 py-2 font-semibold">Pathogen</th>
                    <th className="text-left px-3 py-2 font-semibold">Recognition</th>
                    <th className="text-left px-3 py-2 font-semibold">Dominant response</th>
                    <th className="text-left px-3 py-2 font-semibold">ICU relevance</th>
                  </tr>
                </thead>
                <tbody>
                  {pathogenResponse.map((row) => (
                    <tr key={row.pathogen} className="border-t border-border align-top">
                      <td className="px-3 py-2 font-medium text-foreground">{row.pathogen}</td>
                      <td className="px-3 py-2 text-muted-foreground">{row.keyRecognition}</td>
                      <td className="px-3 py-2 text-muted-foreground">{row.dominantArm}</td>
                      <td className="px-3 py-2 text-muted-foreground">{row.criticalCare}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ---------------- Clinical pearls ---------------- */}
          <section className="rounded-xl border border-icu/40 bg-icu/5 p-5 space-y-2">
            <h2 className="text-xl font-serif font-semibold text-foreground">
              ICU clinical pearls
            </h2>
            <ul className="text-sm text-muted-foreground leading-relaxed list-disc list-inside space-y-1.5">
              <li>Sepsis is a dysregulated host response — hyperinflammation (SIRS, cytokine storm) followed by <strong>compensatory anti-inflammatory response syndrome (CARS)</strong> and immunoparalysis, which drives secondary infection.</li>
              <li>Splenectomised or functionally hyposplenic patients (sickle cell) lose antibody-mediated opsonisation of encapsulated organisms: <strong>Strep pneumoniae, Neisseria meningitidis, Haemophilus influenzae</strong>. Vaccinate and give prophylactic antibiotics.</li>
              <li>Neutropenic sepsis (ANC &lt;0.5 × 10⁹/L): empirical broad-spectrum antibiotics within 1 h; think fungal (Candida, Aspergillus) if fever persists &gt;96 h.</li>
              <li>T-cell dysfunction (HIV, transplant, high-dose steroids, calcineurin inhibitors) predisposes to <strong>PJP, CMV, TB, toxoplasma, Cryptococcus</strong>.</li>
              <li>Eculizumab and ravulizumab block C5 → mandatory meningococcal vaccination and consideration of penicillin prophylaxis.</li>
              <li>C1 esterase inhibitor deficiency → hereditary angioedema — treat with C1-INH concentrate or icatibant, <em>not</em> adrenaline/steroids.</li>
              <li>Prion contamination: standard autoclaving is inadequate — use 1 M NaOH soak or 134 °C autoclave for a prolonged cycle; single-use instruments for high-risk tissue.</li>
            </ul>
          </section>

          {/* ---------------- FAQs ---------------- */}
          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-foreground">
              Frequently asked questions
            </h2>
            <dl className="space-y-4">
              {faqs.map(([q, a]) => (
                <div key={q} className="rounded-lg border border-border bg-secondary/20 p-4">
                  <dt className="font-semibold text-foreground text-sm mb-1">{q}</dt>
                  <dd className="text-sm text-muted-foreground leading-relaxed">{a}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ---------------- Key learning points ---------------- */}
          <section className="rounded-xl border border-icu/40 bg-gradient-to-br from-icu/5 to-card p-5 space-y-3">
            <h2 className="text-xl font-serif font-semibold text-foreground flex items-center gap-2">
              <span aria-hidden="true">✓</span>
              Key learning points
            </h2>
            <ul className="text-sm text-muted-foreground leading-relaxed list-disc list-inside space-y-1.5">
              <li>
                <strong>Innate immunity</strong> is immediate (minutes–hours), non-specific and
                memory-less — barriers, complement, neutrophils, macrophages, NK cells and pattern-recognition
                receptors are the first line.
              </li>
              <li>
                <strong>Adaptive immunity</strong> takes days to peak but is highly specific and
                generates memory — B cells drive the humoral response (antibodies), while T cells drive
                cell-mediated killing (CD8⁺ cytotoxic T cells and CD4⁺ helper subsets).
              </li>
              <li>
                Dendritic cells bridge the two arms by presenting antigen on MHC-I to CD8⁺ T cells and
                on MHC-II to CD4⁺ T cells.
              </li>
              <li>
                The <strong>complement cascade</strong> has three initiating pathways (classical, lectin,
                alternative) that converge on C3 convertase, producing C3a/C5a anaphylatoxins, C3b opsonin
                and the C5b–C9 membrane attack complex.
              </li>
              <li>
                Which immune arm dominates depends on pathogen location: <strong>extracellular</strong>
                bacteria and fungi are cleared by complement, neutrophils and antibody;{
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </SectionLayout>
    </>
  );
};

export default ImmunologyIntensivistsTopic;
