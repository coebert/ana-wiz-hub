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


interface LabelledRegion {
  name: string;
  note: string;
  primaryFRCA: string[];
  finalFRCA: string[];
}

const labelledRegions: LabelledRegion[] = [
  {
    name: "Corpus callosum (genu · body · splenium)",
    note: "Largest commissural tract — ~200 million axons connecting homologous cortical areas of the two hemispheres. Sectioned in callosotomy for refractory epilepsy.",
    primaryFRCA: ["Describe the commissural pathways of the cerebrum"],
    finalFRCA: ["Anaesthesia for corpus callosotomy in refractory epilepsy; recognise disconnection syndromes"],
  },
  {
    name: "Septum pellucidum",
    note: "Thin double membrane separating the frontal horns of the lateral ventricles. A useful midline landmark on CT/MRI; deviation suggests mass effect.",
    primaryFRCA: ["Identify midline neuro-radiological landmarks on CT/MRI"],
    finalFRCA: ["Interpret midline shift as a marker of raised ICP and mass effect requiring urgent intervention"],
  },
  {
    name: "Fornix",
    note: "Major output tract of the hippocampus → mammillary bodies → anterior thalamus (Papez circuit). Key to episodic memory consolidation.",
    primaryFRCA: ["Outline the limbic Papez circuit and its role in memory"],
    finalFRCA: ["Recognise post-operative amnesia after third-ventricle / fornix surgery"],
  },
  {
    name: "Thalamus",
    note: "Paired ovoid relay nucleus for all sensory modalities except olfaction. Gateway to cortex; lesions cause contralateral sensory loss and central post-stroke pain.",
    primaryFRCA: [
      "Describe thalamic nuclei and their cortical projections",
      "Outline thalamic role in ascending sensory and arousal pathways",
    ],
    finalFRCA: [
      "Manage central post-stroke (Déjerine–Roussy) thalamic pain",
      "Anaesthesia for deep brain stimulation (VIM, STN) — awake technique, microelectrode recording",
    ],
  },
  {
    name: "Hypothalamus",
    note: "Master autonomic and endocrine controller — thermoregulation, osmolality, hunger, circadian rhythm, ANS outflow. Releases CRH, TRH, GnRH, GHRH, dopamine, ADH and oxytocin.",
    primaryFRCA: [
      "Describe hypothalamic control of the autonomic nervous system, temperature and osmolality",
      "Outline hypothalamic-pituitary axes and releasing hormones",
    ],
    finalFRCA: [
      "Manage diabetes insipidus, SIADH and cerebral salt wasting peri-operatively",
      "Maintain normothermia and recognise central hyperthermia after hypothalamic injury",
    ],
  },
  {
    name: "Mammillary body",
    note: "Part of the limbic Papez circuit. Atrophy is the pathological hallmark of Wernicke–Korsakoff syndrome (thiamine deficiency).",
    primaryFRCA: ["Identify mammillary bodies in the Papez circuit"],
    finalFRCA: ["Prevent and treat Wernicke's encephalopathy peri-operatively (IV thiamine before glucose in at-risk patients)"],
  },
  {
    name: "Pituitary gland (in sella turcica)",
    note: "Anterior lobe (adenohypophysis): ACTH, TSH, FSH, LH, GH, prolactin. Posterior lobe (neurohypophysis): stores ADH and oxytocin synthesised in hypothalamus. Adenomas may compress the optic chiasm.",
    primaryFRCA: [
      "Describe anterior and posterior pituitary hormones and their control",
      "Outline the hypothalamo-pituitary portal system",
    ],
    finalFRCA: [
      "Anaesthesia for trans-sphenoidal hypophysectomy — airway, throat pack, CSF leak, DI",
      "Manage pituitary apoplexy and acromegalic / Cushingoid airway and cardiovascular implications",
    ],
  },
  {
    name: "Optic chiasm",
    note: "Crossing of nasal retinal fibres. Compression here (e.g. pituitary macroadenoma) produces bitemporal hemianopia.",
    primaryFRCA: ["Describe the visual pathway and field defects produced by lesions at each level"],
    finalFRCA: ["Assess and document visual fields before pituitary / parasellar surgery; protect vision intra-operatively"],
  },
  {
    name: "Pineal gland",
    note: "Secretes melatonin in response to darkness via sympathetic input from the SCN. Often calcified on CT — useful midline radiological marker.",
    primaryFRCA: ["Outline melatonin secretion and circadian regulation"],
    finalFRCA: ["Anaesthesia for pineal region tumours — sitting position, obstructive hydrocephalus, VAE risk"],
  },
  {
    name: "Third ventricle · cerebral aqueduct · fourth ventricle",
    note: "CSF pathway through the midline. The narrow aqueduct of Sylvius is a classic site of obstructive (non-communicating) hydrocephalus.",
    primaryFRCA: [
      "Describe CSF production, circulation and absorption",
      "Outline the ventricular system anatomy",
    ],
    finalFRCA: [
      "Manage acute obstructive hydrocephalus — EVD insertion, ICP control",
      "Anaesthesia for endoscopic third ventriculostomy",
    ],
  },
  {
    name: "Midbrain",
    note: "Contains CN III and IV nuclei, red nucleus, substantia nigra, and the colliculi (visual/auditory reflexes). Uncal herniation compresses CN III → fixed dilated pupil.",
    primaryFRCA: ["Describe midbrain anatomy and the cranial nerve nuclei it contains"],
    finalFRCA: [
      "Recognise uncal herniation (blown pupil) and instigate ICP-lowering measures",
      "Anaesthetic implications of Parkinson's disease (substantia nigra dopaminergic loss)",
    ],
  },
  {
    name: "Pons",
    note: "Contains CN V, VI, VII, VIII nuclei; pontine respiratory centres (apneustic and pneumotaxic); descending corticospinal fibres. Central pontine myelinolysis follows rapid Na⁺ correction.",
    primaryFRCA: [
      "Outline the pontine respiratory centres and their role in ventilation",
      "Describe cranial nerve nuclei within the pons",
    ],
    finalFRCA: [
      "Correct hyponatraemia safely (≤10 mmol/L/24 h) to avoid central pontine myelinolysis",
      "Recognise locked-in syndrome from ventral pontine infarction",
    ],
  },
  {
    name: "Medulla oblongata",
    note: "Houses CN IX, X, XI, XII nuclei; cardiovascular and respiratory control centres; decussation of the pyramids. Foramen magnum coning is rapidly fatal.",
    primaryFRCA: [
      "Describe medullary cardiovascular and respiratory control centres",
      "Outline central and peripheral chemoreceptor pathways",
    ],
    finalFRCA: [
      "Perform brainstem death testing (apnoea test, cranial nerve reflexes)",
      "Recognise and manage Cushing's reflex and impending coning",
    ],
  },
  {
    name: "Cerebellum (with arbor vitae)",
    note: "Coordinates movement, posture and motor learning. Vermis = midline (truncal ataxia); hemispheres = limb coordination. Tonsils may herniate through the foramen magnum.",
    primaryFRCA: ["Describe cerebellar functional anatomy and arterial supply"],
    finalFRCA: [
      "Anaesthesia for posterior fossa craniotomy — sitting position, VAE detection (precordial Doppler, TOE)",
      "Recognise Chiari malformation and tonsillar herniation",
    ],
  },
  {
    name: "Cingulate gyrus",
    note: "Limbic cortex above the corpus callosum — emotion, pain processing, autonomic regulation. Subfalcine herniation occurs here under the falx cerebri.",
    primaryFRCA: ["Outline limbic system anatomy and the role of the cingulate cortex in pain and emotion"],
    finalFRCA: [
      "Recognise subfalcine herniation on imaging and its risk of ACA compression",
      "Understand cingulate cortex involvement in chronic pain modulation",
    ],
  },
  {
    name: "Calcarine sulcus",
    note: "Landmark of the primary visual cortex (V1) on the medial occipital lobe. Supplied by the posterior cerebral artery; PCA stroke causes contralateral homonymous hemianopia (often with macular sparing).",
    primaryFRCA: ["Describe the primary visual cortex and its arterial supply"],
    finalFRCA: [
      "Recognise post-operative visual loss and cortical blindness; counsel patients on PCA-stroke deficits",
    ],
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
        <p className="text-sm font-semibold text-foreground">Labelled regions — clinical relevance & FRCA learning objectives</p>
        <ul className="space-y-2">
          {labelledRegions.map((r) => (
            <li key={r.name} className="p-3 rounded-lg border border-border space-y-3">
              <div>
                <p className="text-sm font-semibold text-foreground">{r.name}</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{r.note}</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-2">
                <div className="rounded-md bg-physiology/10 border border-physiology/30 p-2">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-physiology mb-1">Primary FRCA</p>
                  <ul className="list-disc pl-4 space-y-1">
                    {r.primaryFRCA.map((o) => (
                      <li key={o} className="text-xs text-foreground/80 leading-snug">{o}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-md bg-clinical/10 border border-clinical/30 p-2">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-clinical mb-1">Final FRCA</p>
                  <ul className="list-disc pl-4 space-y-1">
                    {r.finalFRCA.map((o) => (
                      <li key={o} className="text-xs text-foreground/80 leading-snug">{o}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <DiagramSourcesPanel
        references={references}
        imageCredit="Custom illustration generated for this resource (Gemini image model, premium tier), styled after Frank H. Netter / Gray's Anatomy midsagittal cerebral plates. Anatomical labelling cross-checked against the references above."
        note="Educational use only. Not a substitute for primary anatomical references."
      />
    </div>
  );
};

export default BrainMedialDiagram;
