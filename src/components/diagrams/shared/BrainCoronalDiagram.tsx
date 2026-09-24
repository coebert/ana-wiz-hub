import brainCoronalImg from "@/assets/brain-anatomy-coronal.jpg";
import { DiagramSourcesPanel, DiagramSource } from "@/components/diagrams/shared/DiagramSourcesPanel";
import { BrainRegionsList } from "@/components/diagrams/shared/BrainRegionsList";
import BrainPlateLabels, { type PlateLabel } from "@/components/diagrams/shared/BrainPlateLabels";
import { DiagramFigure } from "../_shared/DiagramFigure";

const plateLabels: PlateLabel[] = [
  // Cortex & deep white matter (left hemisphere)
  { text: "Cerebral cortex", dot: { x: 18, y: 22 }, label: { x: 3, y: 8 }, anchor: "start" },
  { text: "Subcortical white matter", dot: { x: 28, y: 32 }, label: { x: 3, y: 22 }, anchor: "start" },
  // Midline white-matter / ventricular complex
  { text: "Corpus callosum (body)", dot: { x: 50, y: 36 }, label: { x: 97, y: 8 }, anchor: "end" },
  { text: "Lateral ventricle (body)", dot: { x: 44, y: 42 }, label: { x: 3, y: 36 }, anchor: "start" },
  { text: "Septum pellucidum", dot: { x: 50, y: 41 }, label: { x: 97, y: 22 }, anchor: "end" },
  { text: "Fornix", dot: { x: 50, y: 46 }, label: { x: 97, y: 36 }, anchor: "end" },
  // Deep grey nuclei & capsules (left hemisphere)
  { text: "Caudate (head)", dot: { x: 42, y: 43 }, label: { x: 3, y: 50 }, anchor: "start" },
  { text: "Internal capsule", dot: { x: 38, y: 53 }, label: { x: 3, y: 64 }, anchor: "start" },
  { text: "Lentiform nucleus\n(putamen + pallidus)", dot: { x: 32, y: 53 }, label: { x: 3, y: 78 }, anchor: "start" },
  { text: "External capsule ·\nclaustrum · insula", dot: { x: 24, y: 54 }, label: { x: 3, y: 92 }, anchor: "start" },
  // Diencephalon (right hemisphere)
  { text: "Thalamus", dot: { x: 56, y: 52 }, label: { x: 97, y: 50 }, anchor: "end" },
  { text: "Hypothalamus", dot: { x: 50, y: 64 }, label: { x: 97, y: 64 }, anchor: "end" },
  { text: "Optic tract /\nmammillary bodies", dot: { x: 50, y: 70 }, label: { x: 97, y: 78 }, anchor: "end" },
  { text: "Hippocampus\n(inferior horn)", dot: { x: 72, y: 70 }, label: { x: 97, y: 92 }, anchor: "end" },
];



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
          alt="Detailed anatomical mid-coronal section of the human brain through the thalamus and basal ganglia, showing cerebral cortex, white matter, corpus callosum, lateral ventricles, septum pellucidum, fornix, caudate nucleus, putamen and globus pallidus (lentiform nucleus), internal capsule, external capsule, claustrum, insula, thalamus, hypothalamus, mammillary bodies, optic tract and hippocampus."
          loading="lazy"
          width={1200}
          height={896}
          className="w-full h-auto block"
        />
        <BrainPlateLabels labels={plateLabels} />
      </div>
      <figcaption className="px-4 sm:px-6 py-3 text-xs text-muted-foreground italic border-t border-border">
        Anatomical reference plate with overlay labels. Right hemisphere on viewer's left (anatomical convention).
      </figcaption>
    </figure>

    <BrainRegionsList regions={labelledRegions} />

    <DiagramSourcesPanel
      references={references}
      imageCredit="Custom illustration generated for this resource (Gemini image model, premium tier), styled after Frank H. Netter / Gray's Anatomy coronal cerebral plates. Anatomical labelling cross-checked against the references above."
      note="Educational use only. Not a substitute for primary anatomical references."
    />
  </>
);

const BrainCoronalDiagram = () => (
    <DiagramFigure
      id="brain-coronal-diagram"
      title="Brain coronal"
      description="Inner plate content (no outer card chrome) — used by BrainPlatesViewer so multiple views can share a single panel shell."
    >
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <BrainCoronalPlate />
    </div>
    </DiagramFigure>
  );

export default BrainCoronalDiagram;
