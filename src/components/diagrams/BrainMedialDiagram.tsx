import brainMedialImg from "@/assets/brain-anatomy-medial.jpg";
import { DiagramSourcesPanel, DiagramSource } from "./DiagramSourcesPanel";

const references: DiagramSource[] = [
  {
    label: "Gray's Anatomy for Students (Drake, Vogl & Mitchell), 4th ed.",
    detail: "Chapter 8: Midsagittal section — corpus callosum, diencephalon, brainstem",
    url: "https://www.elsevier.com/books/grays-anatomy-for-students/drake/978-0-323-39304-1",
  },
  {
    label: "Standring S. Gray's Anatomy: The Anatomical Basis of Clinical Practice, 42nd ed.",
    detail: "Diencephalon, ventricular system and brainstem",
    url: "https://www.elsevier.com/books/grays-anatomy/standring/978-0-7020-7705-0",
  },
  {
    label: "Snell RS. Clinical Neuroanatomy, 8th ed.",
    detail: "Limbic system, hypothalamus and pituitary anatomy",
  },
  {
    label: "TeachMeAnatomy — The Diencephalon: Thalamus & Hypothalamus",
    url: "https://teachmeanatomy.info/neuroanatomy/structures/diencephalon/",
  },
  {
    label: "Kenhub — Median sagittal section of the brain",
    url: "https://www.kenhub.com/en/library/anatomy/midsagittal-section-of-the-brain",
  },
  {
    label: "Radiopaedia — Cerebral ventricular system",
    url: "https://radiopaedia.org/articles/ventricles-of-the-brain",
  },
];


const labelledRegions = [
  {
    name: "Corpus callosum (genu · body · splenium)",
    note: "Largest commissural tract — ~200 million axons connecting homologous cortical areas of the two hemispheres. Sectioned in callosotomy for refractory epilepsy.",
  },
  {
    name: "Septum pellucidum",
    note: "Thin double membrane separating the frontal horns of the lateral ventricles. A useful midline landmark on CT/MRI; deviation suggests mass effect.",
  },
  {
    name: "Fornix",
    note: "Major output tract of the hippocampus → mammillary bodies → anterior thalamus (Papez circuit). Key to episodic memory consolidation.",
  },
  {
    name: "Thalamus",
    note: "Paired ovoid relay nucleus for all sensory modalities except olfaction. Gateway to cortex; lesions cause contralateral sensory loss and central post-stroke pain.",
  },
  {
    name: "Hypothalamus",
    note: "Master autonomic and endocrine controller — thermoregulation, osmolality, hunger, circadian rhythm, ANS outflow. Releases CRH, TRH, GnRH, GHRH, dopamine, ADH and oxytocin.",
  },
  {
    name: "Mammillary body",
    note: "Part of the limbic Papez circuit. Atrophy is the pathological hallmark of Wernicke–Korsakoff syndrome (thiamine deficiency).",
  },
  {
    name: "Pituitary gland (in sella turcica)",
    note: "Anterior lobe (adenohypophysis): ACTH, TSH, FSH, LH, GH, prolactin. Posterior lobe (neurohypophysis): stores ADH and oxytocin synthesised in hypothalamus. Adenomas may compress the optic chiasm.",
  },
  {
    name: "Optic chiasm",
    note: "Crossing of nasal retinal fibres. Compression here (e.g. pituitary macroadenoma) produces bitemporal hemianopia.",
  },
  {
    name: "Pineal gland",
    note: "Secretes melatonin in response to darkness via sympathetic input from the SCN. Often calcified on CT — useful midline radiological marker.",
  },
  {
    name: "Third ventricle · cerebral aqueduct · fourth ventricle",
    note: "CSF pathway through the midline. The narrow aqueduct of Sylvius is a classic site of obstructive (non-communicating) hydrocephalus.",
  },
  {
    name: "Midbrain",
    note: "Contains CN III and IV nuclei, red nucleus, substantia nigra, and the colliculi (visual/auditory reflexes). Uncal herniation compresses CN III → fixed dilated pupil.",
  },
  {
    name: "Pons",
    note: "Contains CN V, VI, VII, VIII nuclei; pontine respiratory centres (apneustic and pneumotaxic); descending corticospinal fibres. Central pontine myelinolysis follows rapid Na⁺ correction.",
  },
  {
    name: "Medulla oblongata",
    note: "Houses CN IX, X, XI, XII nuclei; cardiovascular and respiratory control centres; decussation of the pyramids. Foramen magnum coning is rapidly fatal.",
  },
  {
    name: "Cerebellum (with arbor vitae)",
    note: "Coordinates movement, posture and motor learning. Vermis = midline (truncal ataxia); hemispheres = limb coordination. Tonsils may herniate through the foramen magnum.",
  },
  {
    name: "Cingulate gyrus",
    note: "Limbic cortex above the corpus callosum — emotion, pain processing, autonomic regulation. Subfalcine herniation occurs here under the falx cerebri.",
  },
  {
    name: "Calcarine sulcus",
    note: "Landmark of the primary visual cortex (V1) on the medial occipital lobe. Supplied by the posterior cerebral artery; PCA stroke causes contralateral homonymous hemianopia (often with macular sparing).",
  },
];

const BrainMedialDiagram = () => {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <div className="px-4 sm:px-6 py-4 border-b border-border bg-muted/30">
        <h3 className="text-lg font-serif font-bold text-foreground">Midsagittal (Medial) View of the Brain</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Cut surface of the right hemisphere — midline structures, ventricular system and brainstem
        </p>
      </div>

      <figure className="bg-[hsl(var(--background))]">
        <img
          src={brainMedialImg}
          alt="Detailed anatomical illustration of the human brain in midsagittal section, showing corpus callosum (genu, body, splenium), septum pellucidum, fornix, thalamus, hypothalamus, mammillary body, pituitary gland, optic chiasm, third ventricle, cerebral aqueduct, fourth ventricle, midbrain, pons, medulla oblongata, cerebellum with arbor vitae, cingulate gyrus and calcarine sulcus."
          loading="lazy"
          width={1200}
          height={896}
          className="w-full h-auto block"
        />
        <figcaption className="px-4 sm:px-6 py-3 text-xs text-muted-foreground italic border-t border-border">
          Anatomical reference plate. Anterior to the left, posterior to the right.
        </figcaption>
      </figure>

      <div className="px-4 sm:px-6 py-4 space-y-2">
        <p className="text-sm font-semibold text-foreground">Labelled regions — clinical relevance</p>
        <ul className="space-y-2">
          {labelledRegions.map((r) => (
            <li key={r.name} className="p-3 rounded-lg border border-border">
              <p className="text-sm font-semibold text-foreground">{r.name}</p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{r.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BrainMedialDiagram;
