import brainCoronalImgAsset from "@/assets/brain-coronal-gray743.png.asset.json";
const brainCoronalImg = brainCoronalImgAsset.url;
import { DiagramSourcesPanel, DiagramSource } from "@/components/diagrams/shared/DiagramSourcesPanel";
import { BrainRegionsList } from "@/components/diagrams/shared/BrainRegionsList";
import { DiagramFigure } from "../_shared/DiagramFigure";




const references: DiagramSource[] = [
  {
    label: "Standring S. Gray's Anatomy: The Anatomical Basis of Clinical Practice, 42nd ed.",
    detail: "Coronal sections through the diencephalon and basal ganglia",
    url: "https://www.elsevier.com/books/grays-anatomy/standring/978-0-7020-7705-0",
  },
  {
    label: "Netter FH. Atlas of Human Anatomy, 7th ed.",
    detail: "Plates 110–112 — coronal sections of the cerebrum",
  },
  {
    label: "Snell RS. Clinical Neuroanatomy, 8th ed.",
    detail: "Internal capsule, basal nuclei and limbic structures",
  },
  {
    label: "Radiopaedia — Coronal brain anatomy",
    url: "https://radiopaedia.org/articles/coronal-brain-anatomy",
  },
  {
    label: "TeachMeAnatomy — Basal ganglia and internal capsule",
    url: "https://teachmeanatomy.info/neuroanatomy/structures/basal-ganglia/",
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
    name: "Cerebral cortex (grey matter ribbon)",
    note: "Six-layered neocortex covering the gyri. Folding (gyrification) maximises surface area within the fixed cranial volume.",
    primaryFRCA: ["Describe the laminar organisation of the neocortex"],
    finalFRCA: ["Recognise cortical injury patterns on imaging (watershed, embolic, laminar necrosis)"],
  },
  {
    name: "Subcortical white matter",
    note: "Myelinated axons connecting cortex to cortex (association/commissural) and cortex to deep nuclei (projection).",
    primaryFRCA: ["Distinguish association, commissural and projection white matter tracts"],
    finalFRCA: ["Interpret diffuse axonal injury and small-vessel ischaemic change on MRI"],
  },
  {
    name: "Corpus callosum (body)",
    note: "Largest commissural tract — roof of the lateral ventricles in coronal section.",
    primaryFRCA: ["Identify the corpus callosum as the principal interhemispheric commissure"],
    finalFRCA: ["Recognise callosal infarction (ACA territory) and disconnection syndromes"],
  },
  {
    name: "Lateral ventricles (body & inferior horn)",
    note: "CSF-filled cavities flanking the midline; inferior horns extend into the temporal lobes alongside the hippocampus.",
    primaryFRCA: ["Describe the ventricular system and CSF circulation"],
    finalFRCA: ["Anaesthesia for EVD insertion and management of ventriculitis"],
  },
  {
    name: "Septum pellucidum",
    note: "Thin double membrane separating the frontal horns. A key midline radiological landmark — deviation = mass effect.",
    primaryFRCA: ["Identify midline structures on coronal imaging"],
    finalFRCA: ["Use midline shift as a marker of raised ICP / impending herniation"],
  },
  {
    name: "Fornix",
    note: "Arching white-matter tract from hippocampus → mammillary body. Limbic Papez circuit.",
    primaryFRCA: ["Outline the Papez circuit and its role in episodic memory"],
    finalFRCA: ["Recognise post-operative amnesia after fornix / third-ventricle surgery"],
  },
  {
    name: "Caudate nucleus (head)",
    note: "C-shaped basal ganglion indenting the lateral wall of the lateral ventricle.",
    primaryFRCA: ["Describe the basal ganglia and their role in motor control"],
    finalFRCA: ["Recognise Huntington's disease (caudate atrophy) and its anaesthetic implications"],
  },
  {
    name: "Putamen + globus pallidus (lentiform nucleus)",
    note: "Together form the lentiform nucleus lateral to the internal capsule. Pallidum is the main basal ganglia output to thalamus.",
    primaryFRCA: ["Outline direct and indirect basal ganglia pathways"],
    finalFRCA: ["Anaesthesia for deep brain stimulation (GPi, STN) — awake technique, micro-electrode recording"],
  },
  {
    name: "Internal capsule (anterior limb · genu · posterior limb)",
    note: "Compact projection-fibre highway between cortex and brainstem/spinal cord. Posterior limb carries corticospinal fibres.",
    primaryFRCA: ["Describe the somatotopy of the internal capsule"],
    finalFRCA: ["Recognise lacunar 'pure motor' stroke from internal capsule infarction (lenticulostriate vessels)"],
  },
  {
    name: "External capsule · claustrum · insula",
    note: "Thin sheets of white matter and grey nuclei deep to the lateral sulcus; insula = visceral and interoceptive cortex.",
    primaryFRCA: ["Identify the insular cortex deep to the Sylvian fissure"],
    finalFRCA: ["Insular involvement in MCA stroke and altered autonomic / cardiovascular control"],
  },
  {
    name: "Thalamus",
    note: "Paired ovoid relay nucleus on either side of the third ventricle. Sensory gateway to cortex.",
    primaryFRCA: ["List thalamic nuclei and their cortical projections"],
    finalFRCA: ["Manage Déjerine–Roussy thalamic pain; thalamic DBS for tremor"],
  },
  {
    name: "Hypothalamus",
    note: "Floor of the third ventricle — autonomic, endocrine and homeostatic control centre.",
    primaryFRCA: ["Describe hypothalamic control of temperature, osmolality and the ANS"],
    finalFRCA: ["Manage DI / SIADH / cerebral salt wasting after pituitary or third-ventricle surgery"],
  },
  {
    name: "Hippocampus & parahippocampal gyrus",
    note: "Medial temporal lobe — short-term to long-term memory consolidation. Sensitive to global hypoxia.",
    primaryFRCA: ["Outline hippocampal anatomy and its role in declarative memory"],
    finalFRCA: ["Recognise hypoxic-ischaemic hippocampal injury (CA1 vulnerability) post-arrest"],
  },
  {
    name: "Optic tract / mammillary bodies",
    note: "Optic tract sweeps around the cerebral peduncle to the lateral geniculate body. Mammillary bodies sit immediately posterior — atrophy in Wernicke–Korsakoff.",
    primaryFRCA: ["Describe the visual pathway from retina to LGN"],
    finalFRCA: ["Prevent Wernicke's encephalopathy peri-operatively (IV thiamine before glucose in at-risk patients)"],
  },
];

/**
 * Inner plate content (no outer card chrome) — used by BrainPlatesViewer
 * so multiple views can share a single panel shell.
 */
export const BrainCoronalPlate = () => (
  <>
    <div className="px-4 sm:px-6 py-4 border-b border-border bg-muted/30">
      <h3 className="text-lg font-serif font-bold text-foreground">Mid-Coronal View of the Brain</h3>
      <p className="text-xs text-muted-foreground mt-1">
        Frontal section through the thalamus and basal ganglia — internal capsule, ventricles and limbic structures
      </p>
    </div>

    <figure className="bg-[hsl(var(--background))]">
      <div className="relative">
        <img
          src={brainCoronalImg}
          alt="Gray's Anatomy (1918) Fig. 743 — Coronal section through anterior cornua of lateral ventricles"
          loading="lazy"
                    className="w-full h-auto block"
        />
      </div>
      <figcaption className="px-4 sm:px-6 py-3 text-xs text-muted-foreground italic border-t border-border">
        Gray's Anatomy reference plate with its original printed labels. One hemisphere shown, midline on the viewer's left and lateral surface on the right.
      </figcaption>
    </figure>

    <BrainRegionsList regions={labelledRegions} />

    <DiagramSourcesPanel
      references={references}
      imageCredit="Henry Gray, Anatomy of the Human Body (20th ed., 1918), Fig. 743: Coronal section through anterior cornua of lateral ventricles. Public domain, via Wikimedia Commons (https://commons.wikimedia.org/wiki/File:Gray743.png). Printed labels are Gray's original 1918 terms."
      note="Educational use only. Not a substitute for primary anatomical references."
    />
  </>
);

const BrainCoronalDiagram = () => (
    <DiagramFigure
      id="brain-coronal-diagram"
      title="Brain coronal"
      description="Brain coronal: labelled teaching figure summarising the key structures, relationships and values FRCA and FFICM candidates need to recognise and explain."
    >
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <BrainCoronalPlate />
    </div>
    </DiagramFigure>
  );

export default BrainCoronalDiagram;
