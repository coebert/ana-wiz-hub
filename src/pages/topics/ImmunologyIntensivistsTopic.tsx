import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { SectionLayout } from "@/components/layout/SectionLayout";
import AnimatedMechanism, {
  type AnimatedMechanismStep,
} from "@/components/diagrams/shared/AnimatedMechanism";
import { InlineRef } from "@/components/references/InlineRef";
import { ReferencesList } from "@/components/references/ReferencesList";
import { TopicPodcastPlayer } from "@/components/topic/TopicPodcastPlayer";

const TOPIC_ID = "immunology-intensivists";

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
        Two effector arms fire in parallel. <strong>C3a &amp; C5a</strong> (anaphylatoxins) act via
        G-protein-coupled receptors (C3aR, C5aR1) — <strong>C5a is far more potent than C3a</strong>.
        Effects include mast-cell and basophil degranulation with histamine release
        (vasodilatation, increased vascular permeability), potent chemotaxis of neutrophils,
        monocytes and macrophages, upregulation of endothelial adhesion molecules to promote
        leucocyte extravasation, and phagocyte activation with enhanced respiratory burst.
        <strong>C5b–C9</strong> assembles the <strong>membrane attack complex (MAC)</strong> that
        lyses Gram-negative bacteria.
      </>
    ),
    callout: (
      <>
        Terminal complement (C5–C9) deficiency → recurrent Neisseria infections.
        Eculizumab (anti-C5) blocks MAC formation — patients need meningococcal
        vaccination before starting. Neutrophil C5a receptor (C5aR1) is downregulated
        in sepsis, contributing to impaired neutrophil chemotaxis and immunoparalysis.
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
// Exam mapping — sub-section → FRCA Primary / Final / FFICM outcomes
// ---------------------------------------------------------------------------
type ExamMapRow = {
  subsection: string;
  primary: string;
  final: string;
  fficm: string;
};

const examMap: ExamMapRow[] = [
  {
    subsection: "Two arms, one system (innate vs adaptive)",
    primary:
      "Physiology & Biochemistry — Immunology: outline the innate and adaptive immune systems and the cells and molecules involved.",
    final:
      "Applied clinical science — apply immune physiology to the response to infection, trauma and surgery.",
    fficm:
      "Domain 2 (Basic sciences): 2.1 Immunology — innate vs adaptive immunity, PAMPs / PRRs, MHC and antigen presentation.",
  },
  {
    subsection: "Humoral vs cell-mediated response",
    primary:
      "Physiology & Biochemistry — describe the humoral (B-cell / antibody) and cell-mediated (T-cell) arms of adaptive immunity.",
    final:
      "Anaesthesia for the immunocompromised patient — implications of humoral vs cell-mediated deficiency for peri-operative infection risk.",
    fficm:
      "2.1 Immunology — differentiate humoral and cell-mediated responses; role of CD4⁺ and CD8⁺ T cells; immunoglobulin classes.",
  },
  {
    subsection: "Key immune cell lines",
    primary:
      "Physiology & Biochemistry — classify leucocytes (myeloid vs lymphoid), describe their origin, life-span and function.",
    final:
      "Interpret the full blood count and differential in the context of infection, sepsis and immunosuppression.",
    fficm:
      "2.1 Immunology & 2.5 Microbiology — function of neutrophils, macrophages, dendritic cells, NK, B and T lymphocytes in critical illness.",
  },
  {
    subsection: "The complement cascade",
    primary:
      "Physiology & Biochemistry — describe the complement system, its three activation pathways and biological effects.",
    final:
      "Anaphylaxis and hereditary angioedema — recognise C1-INH deficiency; understand complement-mediated reactions and eculizumab.",
    fficm:
      "2.1 Immunology — complement pathways, opsonisation, anaphylatoxins and MAC; clinical relevance of complement deficiency and C5 blockade.",
  },
  {
    subsection: "Immune response by pathogen class",
    primary:
      "Microbiology — classify bacteria, viruses, fungi, protozoa and prions and outline the host immune response to each.",
    final:
      "Management of severe sepsis and specific infections (viral pneumonitis, invasive fungal disease, malaria) in the peri-operative period.",
    fficm:
      "2.5 Microbiology & 3.4 Infection — pathogen-specific immunity; opportunistic infection in the immunocompromised ICU patient; prion decontamination.",
  },
  {
    subsection: "ICU clinical pearls (sepsis, hyposplenism, immunosuppression)",
    primary:
      "Not directly assessed at Primary — background for sepsis physiology and asplenia.",
    final:
      "Sepsis and septic shock — pathophysiology, immunoparalysis (CARS), management of the asplenic and neutropenic patient.",
    fficm:
      "3.4 Infection & 4.2 Sepsis — dysregulated host response, secondary infection, opportunistic pathogens in T-cell dysfunction.",
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
          <TopicPodcastPlayer topicId={TOPIC_ID} topicTitle="Immunology for Intensivists" />

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
              to prime naïve T cells.<InlineRef topicId={TOPIC_ID} refLabel="Janeway's Immunobiology 9e" /><InlineRef topicId={TOPIC_ID} refLabel="Peakman & Vergani 3e" />
            </p>
            <InnateAdaptiveTimeline />
          </section>

          {/* ---------------- Exam mapping ---------------- */}
          <section className="space-y-3" aria-labelledby="exam-mapping-heading">
            <h2
              id="exam-mapping-heading"
              className="text-2xl font-serif font-bold text-foreground"
            >
              Exam mapping — FRCA Primary, Final &amp; FFICM
            </h2>
            <p className="text-sm text-muted-foreground">
              How each sub-section maps to Royal College of Anaesthetists
              (RCoA) 2021 curriculum learning outcomes for the Primary and
              Final FRCA, and to the Faculty of Intensive Care Medicine
              (FICM) 2021 curriculum for the FFICM.
            </p>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-secondary/40 text-foreground">
                  <tr>
                    <th className="text-left px-3 py-2 font-semibold w-56">Sub-section</th>
                    <th className="text-left px-3 py-2 font-semibold">
                      <span className="inline-block rounded bg-physiology/15 text-physiology px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide mr-1">Primary</span>
                      FRCA outcome
                    </th>
                    <th className="text-left px-3 py-2 font-semibold">
                      <span className="inline-block rounded bg-clinical/15 text-clinical px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide mr-1">Final</span>
                      FRCA outcome
                    </th>
                    <th className="text-left px-3 py-2 font-semibold">
                      <span className="inline-block rounded bg-icu/15 text-icu px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide mr-1">FFICM</span>
                      Domain outcome
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {examMap.map((row) => (
                    <tr key={row.subsection} className="border-t border-border align-top">
                      <td className="px-3 py-2 font-medium text-foreground">{row.subsection}</td>
                      <td className="px-3 py-2 text-muted-foreground">{row.primary}</td>
                      <td className="px-3 py-2 text-muted-foreground">{row.final}</td>
                      <td className="px-3 py-2 text-muted-foreground">{row.fficm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground italic">
              Outcomes paraphrased from the RCoA 2021 anaesthetics curriculum
              (Basic Sciences — Physiology &amp; Biochemistry, Microbiology;
              Applied Clinical Science) and the FICM 2021 curriculum
              (Domain 2 Basic Sciences, Domain 3 Infection, Domain 4 Sepsis).
            </p>
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
                <li>
                  <strong>MHC-I</strong> presents endogenous peptides (viral, tumour) processed by the
                  proteasome and loaded in the ER, on <em>all nucleated cells</em>, signalling CD8⁺
                  cytotoxic T cells ("kill me"); <strong>MHC-II</strong> presents exogenous antigen
                  endocytosed and processed in lysosomes by professional APCs (dendritic cells,
                  macrophages, B cells), signalling CD4⁺ helper T cells to orchestrate antibody
                  production and macrophage activation ("help me"). Dendritic cells can also
                  cross-present exogenous antigen on MHC-I to prime CD8⁺ responses to tumours and
                  intracellular pathogens they have not themselves been infected by.
                </li>
                <li>Reduced monocyte <strong>HLA-DR</strong> (an MHC-II molecule) is a marker of sepsis-induced immunoparalysis.</li>
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
              (C3a, C5a) and the membrane attack complex (C5b–C9).<InlineRef topicId={TOPIC_ID} refLabel="Ricklin Nat Immunol 2010" /><InlineRef topicId={TOPIC_ID} refLabel="Merle Front Immunol 2015" />
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
              require T-cell-mediated killing of the host cell.<InlineRef topicId={TOPIC_ID} refLabel="Janeway's Immunobiology 9e" />
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

          {/* ---------------- Sepsis-induced immunosuppression ---------------- */}
          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-foreground">
              Sepsis-induced immunosuppression (CARS / immunoparalysis)
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Sepsis is not simply a hyperinflammatory storm — a state of profound
              immune hyporesponsiveness develops alongside it, historically labelled
              <strong> compensatory anti-inflammatory response syndrome (CARS)</strong>.
              Hyperinflammatory and immunosuppressive gene programmes are now understood
              to run <strong>concurrently rather than in strict sequence</strong>, with the
              net balance shifting toward immunoparalysis in patients who survive the
              initial insult.<InlineRef topicId={TOPIC_ID} refLabel="Janeway's Immunobiology 9e" />
            </p>
            <div className="grid gap-4 md:grid-cols-2">
              <article className="rounded-xl border border-border bg-card p-5 space-y-2">
                <h3 className="text-lg font-serif font-semibold text-foreground">
                  Triggers &amp; cellular features
                </h3>
                <ul className="text-sm text-muted-foreground leading-relaxed list-disc list-inside space-y-1">
                  <li>Prolonged hyperinflammation, endotoxin tolerance and apoptosis of immune cells drive the shift</li>
                  <li>Lymphocyte apoptosis, especially <strong>CD4⁺ T cells</strong></li>
                  <li>Reduced monocyte <strong>HLA-DR</strong> expression (impaired antigen presentation)</li>
                  <li>Th1 → Th2 cytokine shift</li>
                  <li>Expansion of regulatory T cells (Tregs) and myeloid-derived suppressor cells (MDSCs)</li>
                  <li>T-cell exhaustion with upregulation of <strong>PD-1 / PD-L1</strong></li>
                </ul>
              </article>
              <article className="rounded-xl border border-border bg-card p-5 space-y-2">
                <h3 className="text-lg font-serif font-semibold text-foreground">
                  Consequences, biomarkers &amp; experimental therapy
                </h3>
                <ul className="text-sm text-muted-foreground leading-relaxed list-disc list-inside space-y-1">
                  <li>Secondary/nosocomial infection — VAP, line sepsis</li>
                  <li>Reactivation of latent viruses — CMV, HSV</li>
                  <li>Associated with poor late (post-ICU) outcomes</li>
                  <li>Biomarkers: low monocyte HLA-DR; persistently high IL-10 with low TNF-α; persistent lymphopenia</li>
                  <li>Experimental immunostimulant therapies: <strong>IL-7, GM-CSF, anti-PD-1</strong></li>
                </ul>
              </article>
            </div>
          </section>

          {/* ---------------- Hypersensitivity — Gell and Coombs ---------------- */}
          <section className="space-y-3">
            <h2 className="text-2xl font-serif font-bold text-foreground">
              Hypersensitivity reactions — Gell and Coombs
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              The Gell and Coombs classification groups immune-mediated tissue damage
              into four mechanistic types.<InlineRef topicId={TOPIC_ID} refLabel="Peakman & Vergani 3e" />
            </p>
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-secondary/40 text-foreground">
                  <tr>
                    <th className="text-left px-3 py-2 font-semibold">Type</th>
                    <th className="text-left px-3 py-2 font-semibold">Mechanism</th>
                    <th className="text-left px-3 py-2 font-semibold">Examples</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-border align-top">
                    <td className="px-3 py-2 font-medium text-foreground whitespace-nowrap">I — Immediate</td>
                    <td className="px-3 py-2 text-muted-foreground">IgE-mediated mast-cell/basophil degranulation on allergen re-exposure</td>
                    <td className="px-3 py-2 text-muted-foreground">Anaphylaxis, urticaria, atopy (asthma, hay fever)</td>
                  </tr>
                  <tr className="border-t border-border align-top">
                    <td className="px-3 py-2 font-medium text-foreground whitespace-nowrap">II — Cytotoxic</td>
                    <td className="px-3 py-2 text-muted-foreground">IgG/IgM bind cell-surface antigen → complement activation or antibody-dependent cell-mediated cytotoxicity (ADCC)</td>
                    <td className="px-3 py-2 text-muted-foreground">Haemolytic transfusion reaction, autoimmune haemolytic anaemia, Goodpasture's syndrome; HIT is a clinical variant</td>
                  </tr>
                  <tr className="border-t border-border align-top">
                    <td className="px-3 py-2 font-medium text-foreground whitespace-nowrap">III — Immune complex</td>
                    <td className="px-3 py-2 text-muted-foreground">Antigen–antibody complexes deposit in tissue and activate complement</td>
                    <td className="px-3 py-2 text-muted-foreground">Serum sickness, post-streptococcal glomerulonephritis, SLE</td>
                  </tr>
                  <tr className="border-t border-border align-top">
                    <td className="px-3 py-2 font-medium text-foreground whitespace-nowrap">IV — Delayed (T-cell)</td>
                    <td className="px-3 py-2 text-muted-foreground">Antigen-specific T cells (no antibody) drive delayed-onset (24–72 h) inflammation</td>
                    <td className="px-3 py-2 text-muted-foreground">Tuberculin skin test, contact dermatitis (latex), graft-versus-host disease, DRESS/SJS</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground">
              <strong>Anaesthetic relevance:</strong> latex allergy can present as either an
              immediate Type I reaction (anaphylaxis on glove/catheter contact — IgE-mediated,
              rapid) or a delayed Type IV contact dermatitis (T-cell mediated, hours to days) —
              the two require entirely different avoidance and emergency management strategies.
            </p>
          </section>

          {/* ---------------- Clinical pearls ---------------- */}
          <section className="rounded-xl border border-icu/40 bg-icu/5 p-5 space-y-2">
            <h2 className="text-xl font-serif font-semibold text-foreground">
              ICU clinical pearls
            </h2>
            <ul className="text-sm text-muted-foreground leading-relaxed list-disc list-inside space-y-1.5">
              <li>Sepsis is a dysregulated host response — hyperinflammation (SIRS, cytokine storm) followed by <strong>compensatory anti-inflammatory response syndrome (CARS)</strong> and immunoparalysis, which drives secondary infection.<InlineRef topicId={TOPIC_ID} refLabel="Singer JAMA 2016 (Sepsis-3)" /><InlineRef topicId={TOPIC_ID} refLabel="Hotchkiss Nat Rev Immunol 2013" /><InlineRef topicId={TOPIC_ID} refLabel="Evans SSC 2021" /><InlineRef topicId={TOPIC_ID} refLabel="NICE NG51 Sepsis" /></li>
             <li>Splenectomised or functionally hyposplenic patients (sickle cell) lose antibody-mediated opsonisation of encapsulated organisms: <strong>Strep pneumoniae, Neisseria meningitidis, Haemophilus influenzae</strong>. Vaccinate and give prophylactic antibiotics.<InlineRef topicId={TOPIC_ID} refLabel="Rubin IDSA 2014" /></li>
             <li>Neutropenic sepsis (ANC &lt;0.5 × 10⁹/L): empirical broad-spectrum antibiotics within 1 h; think fungal (Candida, Aspergillus) if fever persists &gt;96 h.<InlineRef topicId={TOPIC_ID} refLabel="Evans SSC 2021" /></li>
             <li>T-cell dysfunction predisposes to <strong>PJP, CMV, TB, toxoplasma, Cryptococcus</strong>. Named culprits: HIV; calcineurin inhibitors (<strong>tacrolimus, ciclosporin</strong>); mTOR inhibitors (<strong>sirolimus, everolimus</strong>); antiproliferatives (<strong>mycophenolate, azathioprine</strong>); high-dose corticosteroids; and depleting biologics (<strong>alemtuzumab, rituximab</strong>) — ask about the last dose, since rituximab's effect outlasts it by 6–12 months.<InlineRef topicId={TOPIC_ID} refLabel="Hotchkiss Nat Rev Immunol 2013" /><InlineRef topicId={TOPIC_ID} refLabel="BJA Educ Immunosuppression 2019" /></li>
             <li><strong>Immunonutrition</strong> is not a routine ICU therapy. Glutamine, arginine and high-dose antioxidants should not be given routinely to general critically ill patients, and parenteral glutamine is harmful in multi-organ failure; enteral omega-3 (EPA/DHA) is at most an option in selected patients, and standard practice remains early enteral nutrition with adequate protein.<InlineRef topicId={TOPIC_ID} refLabel="ESPEN ICU 2019" /></li>
             <li>Eculizumab and ravulizumab block C5 → mandatory meningococcal vaccination and consideration of penicillin prophylaxis.<InlineRef topicId={TOPIC_ID} refLabel="McNamara MMWR 2017 (eculizumab)" /></li>
             <li>C1 esterase inhibitor deficiency → hereditary angioedema — treat with C1-INH concentrate or icatibant, <em>not</em> adrenaline/steroids.<InlineRef topicId={TOPIC_ID} refLabel="Cicardi HAE 2014" /><InlineRef topicId={TOPIC_ID} refLabel="Cook NAP6 2018" /></li>
             <li>Prion contamination: standard autoclaving is inadequate — use 1 M NaOH soak or 134 °C autoclave for a prolonged cycle; single-use instruments for high-risk tissue.<InlineRef topicId={TOPIC_ID} refLabel="ACDP TSE 2015" /></li>
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
                bacteria and fungi are cleared by complement, neutrophils and antibody;{" "}
                <strong>intracellular</strong> viruses and some bacteria require CD8⁺ T cells, NK cells and
                type I interferons.
              </li>
              <li>
                Splenectomy, hyposplenism, complement (C5–C9) deficiency and anti-C5 monoclonal antibodies
                (eculizumab) all increase susceptibility to <strong>encapsulated bacteria and Neisseria</strong>.
              </li>
              <li>
                T-cell dysfunction predisposes to <strong>PJP, CMV, TB, toxoplasmosis and Cryptococcus</strong>.
                Know the drug classes by name: <strong>calcineurin inhibitors</strong> (tacrolimus, ciclosporin —
                block IL-2 transcription), <strong>mTOR inhibitors</strong> (sirolimus, everolimus — impair T-cell
                proliferation and wound healing), <strong>antiproliferative agents</strong> (mycophenolate,
                azathioprine — deplete lymphocyte purine synthesis), <strong>high-dose corticosteroids</strong>,
                and <strong>lymphocyte-depleting biologics</strong> (alemtuzumab anti-CD52, rituximab anti-CD20 →
                prolonged B-cell depletion and hypogammaglobulinaemia)
                <InlineRef topicId={TOPIC_ID} refLabel="BJA Educ Immunosuppression 2019" />.
              </li>
              <li>
                Prions are invisible to the immune system (no PAMPs, no nucleic acid) and require special
                decontamination (1 M NaOH or prolonged 134 °C autoclaving) because standard disinfection is
                ineffective.
              </li>
            </ul>
          </section>

          {/* ---------------- See also ---------------- */}
          <section className="rounded-lg border border-border bg-muted/30 p-4 text-sm">
            <p className="text-foreground font-semibold mb-1">See also</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>
                <Link to="/physiology/haematology-immunity" className="text-icu underline">
                  Haematology &amp; Immunity — coagulation, blood groups, hypersensitivity
                </Link>
              </li>
              <li>
                <Link to="/intensive-care/sepsis" className="text-icu underline">
                  Sepsis — Surviving Sepsis, cytokine storm, host response
                </Link>
              </li>
              <li>
                <Link to="/intensive-care/haematology-icu" className="text-icu underline">
                  Haematological &amp; Immunological Disorders in ICU
                </Link>
              </li>
              <li>
                <Link to="/intensive-care/infectious-disease-icu" className="text-icu underline">
                  Infectious Disease in ICU
                </Link>
              </li>
            </ul>
          </section>

          {/* ---------------- References ---------------- */}
          <ReferencesList topicId={TOPIC_ID} />
        </div>
      </SectionLayout>
    </>
  );
};

export default ImmunologyIntensivistsTopic;
