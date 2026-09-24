import brainMedialImg from "@/assets/brain-anatomy-medial.jpg";
import { DiagramSourcesPanel, DiagramSource } from "@/components/diagrams/shared/DiagramSourcesPanel";
import { BrainRegionsList } from "@/components/diagrams/shared/BrainRegionsList";
import { DiagramFigure } from "../_shared/DiagramFigure";

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

/**
 * Inner plate content (no outer card chrome) — used by BrainPlatesViewer.
 */
export const BrainMedialPlate = () => {
  return (
    <>
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

      <BrainRegionsList regions={labelledRegions} />

      <div className="px-4 sm:px-6 py-5 border-t border-border bg-muted/20 space-y-4">
        <div>
          <p className="text-sm font-bold text-foreground">Exam-style clinical vignettes — midline structure → lesion</p>
          <p className="text-xs text-muted-foreground mt-1">Each scenario maps a labelled midline structure on the plate above to a classic FRCA / FFICM presentation.</p>
        </div>

        <ol className="space-y-3 list-none counter-reset-vignette">
          {[
            {
              structure: "Optic chiasm",
              stem: "A 48-year-old man presents with progressive headaches, reduced libido and worsening peripheral vision. Visual fields show loss of both temporal hemifields. MRI shows a sellar mass elevating the chiasm.",
              answer: "Bitemporal hemianopia from a pituitary macroadenoma compressing crossing nasal retinal fibres in the optic chiasm.",
              pearl: "Document fields pre-op; trans-sphenoidal hypophysectomy — anticipate diabetes insipidus, CSF leak and steroid cover.",
            },
            {
              structure: "Hypothalamus / posterior pituitary",
              stem: "Day 2 after trans-sphenoidal surgery a patient develops polyuria (350 mL/h), Na⁺ 152 mmol/L, plasma osmolality 312 mOsm/kg with dilute urine (osm 110).",
              answer: "Cranial diabetes insipidus from disruption of the supraoptic-hypophyseal tract / posterior pituitary.",
              pearl: "Match urine output mL-for-mL with hypotonic fluid + IV/IN desmopressin; correct Na⁺ slowly (≤10 mmol/L/24 h).",
            },
            {
              structure: "Thalamus (VPL nucleus)",
              stem: "Three months after a right-sided lacunar stroke, a 72-year-old develops burning, allodynic pain in the left arm and leg, worsened by light touch. MRI shows an old infarct in the right thalamus.",
              answer: "Déjerine–Roussy (central post-stroke) thalamic pain syndrome.",
              pearl: "First-line: amitriptyline / gabapentinoids; refractory cases — DBS or motor cortex stimulation. Opioids are typically ineffective.",
            },
            {
              structure: "Mammillary bodies & fornix",
              stem: "An alcohol-dependent patient is admitted for emergency laparotomy. After IV dextrose he becomes confused with horizontal nystagmus and a wide-based gait; later he confabulates and cannot retain new information.",
              answer: "Wernicke encephalopathy progressing to Korsakoff syndrome — thiamine deficiency causing mammillary body and dorsomedial thalamic atrophy (Papez circuit).",
              pearl: "Always give IV thiamine (Pabrinex) BEFORE glucose in at-risk patients; high-risk groups need prophylactic peri-operative thiamine.",
            },
            {
              structure: "Corpus callosum",
              stem: "A child with refractory drop-attack epilepsy undergoes anterior callosotomy. Post-operatively she can name objects placed in her right hand but not her left (eyes closed).",
              answer: "Disconnection syndrome (alien-hand / tactile anomia) from interruption of interhemispheric transfer through the corpus callosum.",
              pearl: "Anaesthetic plan: TIVA-friendly, neuro-protective, anticipate cerebral oedema and post-op seizures.",
            },
            {
              structure: "Cerebral aqueduct (of Sylvius)",
              stem: "A young adult presents with morning headache, vomiting and papilloedema. CT shows dilated lateral and third ventricles with a normal-sized fourth ventricle and a tectal-plate lesion.",
              answer: "Obstructive (non-communicating) hydrocephalus from aqueductal stenosis.",
              pearl: "Endoscopic third ventriculostomy bypasses the block. Avoid hypercapnia and head-down tilt — both raise ICP precipitously.",
            },
            {
              structure: "Midbrain (CN III nucleus / uncus)",
              stem: "After head injury, a patient's GCS falls from 13 to 7 with a unilateral fixed dilated pupil and contralateral hemiparesis. CT shows a temporal extradural haematoma.",
              answer: "Uncal (transtentorial) herniation compressing the ipsilateral oculomotor nerve and cerebral peduncle.",
              pearl: "Immediate ICP-lowering bundle — head-up 30°, sedation, mannitol/hypertonic saline, normocapnia, urgent neurosurgical decompression.",
            },
            {
              structure: "Pons (central pontine myelinolysis)",
              stem: "A malnourished patient with Na⁺ 108 mmol/L is corrected to 132 over 18 h. Forty-eight hours later she develops dysarthria, dysphagia and a flaccid quadriparesis but remains awake.",
              answer: "Osmotic demyelination syndrome (central pontine myelinolysis) — locked-in pattern.",
              pearl: "Correct chronic hyponatraemia ≤10 mmol/L in 24 h (≤6 mmol/L if very high risk). Re-lower with desmopressin + 5% dextrose if overshoot.",
            },
            {
              structure: "Medulla oblongata",
              stem: "A devastating intracerebral haemorrhage patient meets pre-conditions for brainstem death testing. The team plans pupillary, corneal, oculovestibular, gag and cough reflex testing followed by an apnoea test.",
              answer: "Brainstem death — confirms loss of medullary cardiorespiratory drive and cranial nerve reflexes.",
              pearl: "Apnoea test: pre-oxygenate, target PaCO₂ rise ≥0.5 kPa above 6.0 kPa with no respiratory effort. Two doctors, two sets of tests.",
            },
            {
              structure: "Cerebellum / cerebellar tonsils",
              stem: "Following a posterior fossa craniotomy in the sitting position, a patient develops bradycardia, hypertension and an irregular breathing pattern with a sudden fall in end-tidal CO₂.",
              answer: "Tonsillar (foramen magnum) herniation with the Cushing reflex — and concurrent venous air embolism reducing pulmonary blood flow.",
              pearl: "Flood the field with saline, jugular compression, 100% O₂, head-down, aspirate from CVC, vasopressors. Survey for VAE with precordial Doppler / TOE.",
            },
            {
              structure: "Cingulate gyrus",
              stem: "A large frontal glioma causes the contralateral leg to weaken. CT shows the cingulate gyrus pushed under the falx with effacement of the ipsilateral lateral ventricle.",
              answer: "Subfalcine herniation compressing the anterior cerebral artery → contralateral leg weakness.",
              pearl: "Marker of dangerous mass effect; manage as raised ICP and refer urgently for decompression.",
            },
            {
              structure: "Calcarine cortex (occipital pole)",
              stem: "An elderly patient wakes from cardiac surgery unable to see, but denies any visual problem and confabulates descriptions of the ward. Pupils react normally; fundi are normal.",
              answer: "Cortical blindness (Anton syndrome) from bilateral PCA / watershed infarction of the calcarine cortex.",
              pearl: "Maintain MAP, avoid prolonged hypotension and venous obstruction; image early — POVL is a recognised peri-operative complication.",
            },
          ].map((v, i) => (
            <li
              key={v.structure}
              className="rounded-lg border border-clinical/30 bg-clinical/5 p-3 sm:p-4 space-y-2"
            >
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full bg-clinical text-clinical-foreground text-xs font-bold">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-wide text-clinical">{v.structure}</p>
                  <p className="text-sm text-foreground mt-1 leading-relaxed">
                    <span className="font-semibold">Vignette: </span>{v.stem}
                  </p>
                </div>
              </div>
              <div className="ml-10 space-y-1.5">
                <p className="text-xs text-foreground leading-relaxed">
                  <span className="font-bold text-clinical">Diagnosis: </span>{v.answer}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <span className="font-bold text-foreground">Anaesthetic / management pearl: </span>{v.pearl}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="rounded-lg border-2 border-clinical/40 bg-clinical/10 p-4 mt-2">
          <p className="text-sm font-bold text-foreground mb-2">📌 Take-home summary — midline structures &amp; their classic lesions</p>
          <ul className="space-y-1 text-xs text-foreground/90 leading-relaxed">
            <li>• <span className="font-semibold">Optic chiasm</span> → bitemporal hemianopia (pituitary macroadenoma)</li>
            <li>• <span className="font-semibold">Posterior pituitary / hypothalamus</span> → diabetes insipidus / SIADH</li>
            <li>• <span className="font-semibold">Thalamus</span> → contralateral sensory loss · Déjerine–Roussy central pain</li>
            <li>• <span className="font-semibold">Mammillary bodies + fornix</span> → Wernicke–Korsakoff (give thiamine before glucose)</li>
            <li>• <span className="font-semibold">Corpus callosum</span> → disconnection / alien-hand syndrome</li>
            <li>• <span className="font-semibold">Cerebral aqueduct</span> → obstructive hydrocephalus (commonest narrow-point block)</li>
            <li>• <span className="font-semibold">Midbrain (CN III)</span> → uncal herniation: blown pupil + contralateral hemiparesis</li>
            <li>• <span className="font-semibold">Pons</span> → osmotic demyelination after rapid Na⁺ correction (locked-in)</li>
            <li>• <span className="font-semibold">Medulla</span> → loss of cardiorespiratory drive — brainstem death testing</li>
            <li>• <span className="font-semibold">Cerebellar tonsils</span> → coning + Cushing reflex; sitting-position VAE risk</li>
            <li>• <span className="font-semibold">Cingulate gyrus</span> → subfalcine herniation → contralateral leg weakness (ACA)</li>
            <li>• <span className="font-semibold">Calcarine cortex</span> → cortical blindness / Anton syndrome (PCA / POVL)</li>
          </ul>
        </div>
      </div>

      <DiagramSourcesPanel
        references={references}
        imageCredit="Custom illustration generated for this resource (Gemini image model, premium tier), styled after Frank H. Netter / Gray's Anatomy midsagittal cerebral plates. Anatomical labelling cross-checked against the references above."
        note="Educational use only. Not a substitute for primary anatomical references."
      />
    </>
  );
};

const BrainMedialDiagram = () => (
    <DiagramFigure
      id="brain-medial-diagram"
      title="Brain medial"
      description="Inner plate content (no outer card chrome) — used by BrainPlatesViewer."
    >
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <BrainMedialPlate />
    </div>
    </DiagramFigure>
  );

export default BrainMedialDiagram;
