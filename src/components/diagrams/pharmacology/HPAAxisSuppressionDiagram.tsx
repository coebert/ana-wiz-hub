import { MechanismCascadeDiagram, CascadeStep, CascadeSource } from "@/components/diagrams/shared/MechanismCascadeDiagram";
import { DiagramFigure } from "../_shared/DiagramFigure";

const AAGBI: CascadeSource = {
  label: "AAGBI Steroid Cover",
  citation:
    "Woodcock T et al. Guidelines for the management of glucocorticoids during the peri-operative period for patients with adrenal insufficiency. Anaesthesia. 2020;75(5):654-663.",
  url: "https://doi.org/10.1111/anae.14963",
};

const PECK17: CascadeSource = {
  label: "Peck & Hill Ch.17",
  citation:
    "Peck TE, Hill SA. Pharmacology for Anaesthesia and Intensive Care, 5th ed. Cambridge UP 2020 — corticosteroids and adrenal physiology.",
  url: "https://www.cambridge.org/9781108710961",
};

const BJA12: CascadeSource = {
  label: "BJA Educ 2012",
  citation:
    "Yong SL, Coulthard P, Wrzosek A. Supplemental perioperative steroids for surgical patients with adrenal insufficiency. Cochrane / BJA Education review.",
  url: "https://doi.org/10.1093/bjaceaccp/mks028",
};

const steps: CascadeStep[] = [
  {
    node: "Hypothalamus",
    detail: "CRH release",
    title: "Stress signal initiates the axis",
    body:
      "Surgical stress, pain, hypoglycaemia and cytokines drive paraventricular nucleus neurons to secrete CRH into the hypophyseal portal system. CRH release is pulsatile with a circadian peak at ~06:00 — exogenous steroids given at the wrong time blunt this physiological rhythm.",
    sources: [PECK17],
  },
  {
    node: "Anterior pituitary",
    detail: "ACTH",
    title: "Corticotrophs release ACTH",
    body:
      "CRH binds CRHR1 → cAMP-mediated cleavage of POMC → ACTH release. ACTH circulates within minutes and reaches the adrenal cortex. Plasma ACTH itself shows diurnal variation and is suppressed by long-acting steroids (>3 weeks of >5 mg prednisolone) within days.",
    sources: [PECK17, AAGBI],
  },
  {
    node: "Adrenal cortex",
    detail: "Zona fasciculata",
    title: "Cortisol synthesised and released",
    body:
      "ACTH stimulates StAR protein → cholesterol enters mitochondria → CYP11A1 converts to pregnenolone → cortisol via CYP11B1. Basal output ≈ 8-10 mg/m²/day; rises to 75-150 mg/day with major surgery, peaking ~6 h post-op and returning to baseline by day 5.",
    sources: [PECK17, BJA12],
  },
  {
    node: "Negative feedback",
    detail: "Exogenous steroid → −CRH/ACTH",
    title: "Exogenous steroid enhances negative feedback",
    body:
      "In chronic exogenous steroid use the pathological negative feedback is driven by the drug itself (e.g. prednisolone), not endogenous cortisol — which is already suppressed. Exogenous glucocorticoids act on hypothalamic and pituitary glucocorticoid receptors to suppress CRH and ACTH; the loop is useful therapeutically but dangerous on abrupt withdrawal because the suppressed axis cannot restart on demand.",
    sources: [PECK17],
  },
  {
    node: "HPA suppression",
    detail: "≥5 mg pred ≥3 weeks",
    title: "Chronic exogenous steroid silences the axis",
    body:
      "Atrophy of CRH neurons, corticotrophs and zona fasciculata follows sustained suppression. Recovery is slow and sequential: ACTH returns first (~1-2 months), cortisol later (up to 9-12 months). ACTH stimulation (Synacthen) test confirms intact reserve before stopping cover.",
    sources: [AAGBI, BJA12],
  },
  {
    node: "Adrenal crisis risk",
    detail: "Hypotension / shock",
    title: "Stress without cover → cardiovascular collapse",
    body:
      "Secondary adrenal insufficiency from chronic exogenous steroids preserves mineralocorticoid (aldosterone) output, so the dominant feature is hypotension/shock unresponsive to fluids ± hypoglycaemia; significant hyponatraemia and hyperkalaemia are typically only seen in primary adrenal failure. Treatment: hydrocortisone 100 mg IV stat then 200 mg/24 h infusion, fluids, glucose, treat the underlying stressor. Prevent with stress-dose cover guided by surgical severity (AAGBI 2020 algorithm).",
    sources: [AAGBI, BJA12],
  },
];

export const HPAAxisSuppressionDiagram = () => (
    <DiagramFigure
      id="hpa-axis-suppression-diagram"
      title="HPA axis suppression"
      description="Auto-generated wrapper for the HPA axis suppression anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
            <MechanismCascadeDiagram
      title="HPA axis — chronic steroid suppression cascade"
      subtitle="From CRH to perioperative adrenal crisis — why long-term steroids need cover."
      accent="pharmacology"
      steps={steps}
    />
    </DiagramFigure>
  );

export default HPAAxisSuppressionDiagram;
