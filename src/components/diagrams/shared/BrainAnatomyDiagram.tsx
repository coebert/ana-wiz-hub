import brainAnatomyImg from "@/assets/brain-anatomy-lateral.jpg";
import { DiagramSourcesPanel, DiagramSource } from "@/components/diagrams/shared/DiagramSourcesPanel";
import { BrainRegionsList } from "@/components/diagrams/shared/BrainRegionsList";
import { DiagramFigure } from "../_shared/DiagramFigure";

const references: DiagramSource[] = [
  {
    label: "Gray's Anatomy for Students (Drake, Vogl & Mitchell), 4th ed.",
    detail: "Chapter 8: Head and Neck — surface anatomy of the cerebrum and brainstem",
    url: "https://www.elsevier.com/books/grays-anatomy-for-students/drake/978-0-323-39304-1",
  },
  {
    label: "Standring S. Gray's Anatomy: The Anatomical Basis of Clinical Practice, 42nd ed.",
    detail: "Section 4: Head and Neck — cerebral lobes, sulci and gyri",
    url: "https://www.elsevier.com/books/grays-anatomy/standring/978-0-7020-7705-0",
  },
  {
    label: "TeachMeAnatomy — Cerebrum: Lobes, Surfaces & Functions",
    url: "https://teachmeanatomy.info/neuroanatomy/structures/cerebrum/",
  },
  {
    label: "Kenhub — Lateral surface of the cerebrum",
    url: "https://www.kenhub.com/en/library/anatomy/the-cerebrum",
  },
  {
    label: "Brodmann K. (1909) Localisation in the Cerebral Cortex",
    detail: "Cytoarchitectonic basis for primary motor (area 4), sensory (1–3) and visual (17) cortices",
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
    name: "Frontal lobe",
    note: "Personality, executive function, motor planning. Houses Broca's area (dominant inferior frontal gyrus) — expressive speech.",
    primaryFRCA: [
      "Describe the gross anatomical organisation of the cerebral hemispheres and lobes",
      "Outline functional localisation of the frontal lobe (motor, prefrontal, Broca's)",
    ],
    finalFRCA: [
      "Recognise frontal-lobe syndromes after trauma, tumour or ACA stroke and their anaesthetic implications",
      "Plan awake craniotomy / cortical mapping for lesions adjacent to Broca's area",
    ],
  },
  {
    name: "Precentral gyrus (motor cortex)",
    note: "Primary motor cortex (Brodmann 4). Somatotopic homunculus — face/hand laterally, leg medially (toward falx).",
    primaryFRCA: [
      "Describe the motor homunculus and corticospinal tract origin",
      "Explain the cortical generators of MEPs",
    ],
    finalFRCA: [
      "Tailor anaesthesia (TIVA, avoid neuromuscular blockade) to permit motor-evoked potential monitoring",
      "Interpret loss of MEP signal intra-operatively and respond appropriately",
    ],
  },
  {
    name: "Central sulcus",
    note: "Divides frontal from parietal lobe; separates motor from sensory cortex.",
    primaryFRCA: [
      "Identify major cerebral sulci as surface landmarks",
    ],
    finalFRCA: [
      "Use central sulcus localisation (phase-reversal SSEPs) during eloquent-cortex surgery",
    ],
  },
  {
    name: "Postcentral gyrus (sensory cortex)",
    note: "Primary somatosensory cortex (Brodmann 1, 2, 3). Mirrors motor homunculus.",
    primaryFRCA: [
      "Describe ascending sensory pathways (DCML, spinothalamic) terminating in S1",
      "Outline the sensory homunculus",
    ],
    finalFRCA: [
      "Apply somatosensory-evoked potentials (SSEPs) for spinal cord and cortical monitoring",
      "Recognise patterns of cortical sensory loss after MCA territory stroke",
    ],
  },
  {
    name: "Parietal lobe",
    note: "Sensory integration, spatial awareness, proprioception.",
    primaryFRCA: [
      "Describe parietal association cortex function (sensory integration, proprioception)",
    ],
    finalFRCA: [
      "Recognise neglect, apraxia and Gerstmann syndrome relevant to peri-operative neurological assessment",
    ],
  },
  {
    name: "Lateral sulcus (Sylvian fissure)",
    note: "Separates temporal lobe from frontal/parietal lobes. MCA runs within it.",
    primaryFRCA: [
      "Describe the course of the middle cerebral artery within the Sylvian fissure",
      "Outline the circle of Willis and cortical arterial territories",
    ],
    finalFRCA: [
      "Manage anaesthesia for MCA aneurysm clipping or endovascular thrombectomy (BP targets, neuroprotection)",
    ],
  },
  {
    name: "Temporal lobe",
    note: "Auditory cortex, memory (hippocampus), language comprehension. Wernicke's area in dominant superior temporal gyrus.",
    primaryFRCA: [
      "Describe the auditory and limbic anatomy of the temporal lobe",
      "Outline the dominant-hemisphere language areas (Wernicke's)",
    ],
    finalFRCA: [
      "Anaesthesia for temporal lobectomy / amygdalohippocampectomy in refractory epilepsy",
      "Recognise post-operative dysphasia and risk of uncal herniation with temporal mass lesions",
    ],
  },
  {
    name: "Occipital lobe",
    note: "Primary visual cortex (Brodmann 17) lies along the calcarine sulcus — supplied by the PCA.",
    primaryFRCA: [
      "Describe the visual pathway from retina to primary visual cortex",
      "Identify PCA territory and its cortical supply",
    ],
    finalFRCA: [
      "Recognise post-operative visual loss (POVL) — ION, cortical infarction — risk factors and prevention",
      "Interpret homonymous visual field defects after PCA stroke",
    ],
  },
  {
    name: "Cerebellum",
    note: "Coordination, balance, motor learning. Supplied by SCA, AICA, PICA. Tonsillar herniation through foramen magnum is fatal.",
    primaryFRCA: [
      "Describe cerebellar anatomy (vermis, hemispheres, peduncles) and arterial supply",
      "Outline cerebellar functional divisions (vestibulo-, spino-, cerebrocerebellum)",
    ],
    finalFRCA: [
      "Anaesthesia for posterior fossa surgery — sitting position, VAE risk, cardiovascular instability",
      "Recognise and manage tonsillar (coning) herniation as a neurosurgical emergency",
    ],
  },
  {
    name: "Brainstem (midbrain, pons, medulla)",
    note: "Midbrain: CN III, IV. Pons: CN V–VIII. Medulla: CN IX–XII; cardiorespiratory centres and reticular activating system.",
    primaryFRCA: [
      "Describe brainstem cranial nerve nuclei and their functional columns",
      "Outline the reticular activating system and central control of respiration and cardiovascular reflexes",
    ],
    finalFRCA: [
      "Perform and interpret brainstem death testing per AoMRC / FICM guidance",
      "Manage anaesthesia for brainstem lesions and recognise Cushing's reflex",
    ],
  },
];

/**
 * Inner plate content (no outer card chrome) — used by BrainPlatesViewer.
 */
export const BrainLateralPlate = () => (
  <>
    <div className="px-4 sm:px-6 py-4 border-b border-border bg-muted/30">
      <h3 className="text-lg font-serif font-bold text-foreground">Lateral View of the Brain</h3>
      <p className="text-xs text-muted-foreground mt-1">
        Left hemisphere — colour-coded lobes with key cortical landmarks, brainstem and cerebellum
      </p>
    </div>

    <figure className="bg-[hsl(var(--background))]">
      <img
        src={brainAnatomyImg}
        alt="Detailed anatomical illustration of the human brain in lateral view, showing colour-coded frontal, parietal, temporal and occipital lobes, with labels for the precentral and postcentral gyri, central sulcus, lateral (Sylvian) fissure, Broca's and Wernicke's areas, primary visual cortex, cerebellum, midbrain, pons, medulla oblongata and spinal cord."
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

    <DiagramSourcesPanel
      references={references}
      imageCredit="Custom illustration generated for this resource (Gemini image model, premium tier), styled after Frank H. Netter / Gray's Anatomy lateral cerebral plates. Anatomical labelling cross-checked against the references above."
      note="Educational use only. Not a substitute for primary anatomical references."
    />
  </>
);

const BrainAnatomyDiagram = () => (
    <DiagramFigure
      id="brain-anatomy-diagram"
      title="Brain anatomy"
      description="Brain anatomy: labelled teaching figure summarising the key structures, relationships and values FRCA and FFICM candidates need to recognise and explain."
    >
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <BrainLateralPlate />
    </div>
    </DiagramFigure>
  );

export default BrainAnatomyDiagram;
