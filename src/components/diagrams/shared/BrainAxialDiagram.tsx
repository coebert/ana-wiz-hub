import brainAxialImg from "@/assets/brain-anatomy-axial.jpg";
import { DiagramSourcesPanel, DiagramSource } from "@/components/diagrams/shared/DiagramSourcesPanel";
import { BrainRegionsList } from "@/components/diagrams/shared/BrainRegionsList";
import BrainPlateLabels, { type PlateLabel } from "@/components/diagrams/shared/BrainPlateLabels";
import { DiagramFigure } from "../_shared/DiagramFigure";

const plateLabels: PlateLabel[] = [
  // Anterior pole
  { text: "Frontal lobe", dot: { x: 32, y: 14 }, label: { x: 3, y: 8 }, anchor: "start" },
  { text: "Longitudinal fissure", dot: { x: 50, y: 12 }, label: { x: 97, y: 8 }, anchor: "end" },
  // Anterior midline
  { text: "Genu of corpus callosum", dot: { x: 50, y: 28 }, label: { x: 3, y: 22 }, anchor: "start" },
  { text: "Frontal horn\n(lateral ventricle)", dot: { x: 46, y: 34 }, label: { x: 97, y: 22 }, anchor: "end" },
  { text: "Septum pellucidum", dot: { x: 50, y: 35 }, label: { x: 3, y: 35 }, anchor: "start" },
  // Basal ganglia + capsule (left hemisphere)
  { text: "Caudate (head)", dot: { x: 42, y: 36 }, label: { x: 3, y: 47 }, anchor: "start" },
  { text: "Internal capsule", dot: { x: 39, y: 45 }, label: { x: 97, y: 36 }, anchor: "end" },
  { text: "Putamen", dot: { x: 33, y: 44 }, label: { x: 3, y: 58 }, anchor: "start" },
  { text: "Globus pallidus", dot: { x: 38, y: 47 }, label: { x: 97, y: 48 }, anchor: "end" },
  { text: "External capsule ·\nclaustrum · insula", dot: { x: 27, y: 45 }, label: { x: 3, y: 70 }, anchor: "start" },
  { text: "Sylvian fissure", dot: { x: 23, y: 43 }, label: { x: 3, y: 81 }, anchor: "start" },
  // Diencephalon midline
  { text: "Third ventricle", dot: { x: 50, y: 49 }, label: { x: 97, y: 60 }, anchor: "end" },
  { text: "Thalamus", dot: { x: 56, y: 51 }, label: { x: 97, y: 72 }, anchor: "end" },
  { text: "Pineal gland", dot: { x: 50, y: 58 }, label: { x: 97, y: 84 }, anchor: "end" },
  // Posterior
  { text: "Choroid plexus\n(atrium)", dot: { x: 38, y: 63 }, label: { x: 3, y: 92 }, anchor: "start" },
  { text: "Occipital horn", dot: { x: 50, y: 70 }, label: { x: 97, y: 95 }, anchor: "end" },
  { text: "Occipital lobe", dot: { x: 40, y: 88 }, label: { x: 3, y: 96 }, anchor: "start" },
];



const references: DiagramSource[] = [
  {
    label: "Standring S. Gray's Anatomy: The Anatomical Basis of Clinical Practice, 42nd ed.",
    detail: "Axial sections through the basal ganglia and thalamus",
    url: "https://www.elsevier.com/books/grays-anatomy/standring/978-0-7020-7705-0",
  },
  {
    label: "Netter FH. Atlas of Human Anatomy, 7th ed.",
    detail: "Axial cerebral plates",
  },
  {
    label: "Osborn AG. Osborn's Brain: Imaging, Pathology, and Anatomy, 2nd ed.",
    detail: "Axial neuro-anatomy at the level of the basal ganglia and thalamus",
  },
  {
    label: "Radiopaedia — Axial brain anatomy (basal ganglia level)",
    url: "https://radiopaedia.org/articles/axial-brain-anatomy",
  },
  {
    label: "TeachMeAnatomy — The Cerebrum",
    url: "https://teachmeanatomy.info/neuroanatomy/structures/cerebrum/",
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
    name: "Frontal lobes (anteriorly)",
    note: "Form the front of the axial plane; separated from each other by the longitudinal fissure and falx cerebri.",
    primaryFRCA: ["Identify the lobes of the cerebrum on axial imaging"],
    finalFRCA: ["Recognise frontal contusions / ACA territory infarcts on CT"],
  },
  {
    name: "Genu & splenium of corpus callosum",
    note: "Anterior (genu) and posterior (splenium) transverse white-matter bundles connecting the hemispheres — bracket the lateral ventricles.",
    primaryFRCA: ["Describe the parts of the corpus callosum"],
    finalFRCA: ["Recognise splenial lesions (cytotoxic oedema, MERS) and traumatic shear injury"],
  },
  {
    name: "Frontal horns of lateral ventricles",
    note: "Paired CSF-filled spaces separated only by the septum pellucidum — the most reliable midline landmark on axial CT.",
    primaryFRCA: ["Identify the frontal horns and assess ventricular size"],
    finalFRCA: ["Use Evans' index and the third-ventricle width to assess hydrocephalus"],
  },
  {
    name: "Septum pellucidum & third ventricle",
    note: "Septum separates the frontal horns; the slit-like third ventricle lies in the midline between the thalami.",
    primaryFRCA: ["Identify midline CSF spaces"],
    finalFRCA: ["Recognise third-ventricle colloid cyst causing acute hydrocephalus"],
  },
  {
    name: "Caudate nucleus (head)",
    note: "Indents the lateral wall of the frontal horn; part of the basal ganglia.",
    primaryFRCA: ["Describe basal ganglia anatomy and connections"],
    finalFRCA: ["Recognise caudate atrophy in Huntington's disease"],
  },
  {
    name: "Putamen + globus pallidus",
    note: "Lentiform nucleus lateral to the internal capsule. Pallidum is medial, putamen lateral.",
    primaryFRCA: ["Distinguish striatum (caudate + putamen) from pallidum"],
    finalFRCA: ["Recognise hypoxic-ischaemic basal ganglia injury and CO poisoning (pallidal necrosis)"],
  },
  {
    name: "Internal capsule (anterior limb · genu · posterior limb)",
    note: "V-shaped white-matter band on axial section. Posterior limb carries corticospinal fibres — supplied by lenticulostriate branches of MCA.",
    primaryFRCA: ["Describe the somatotopy and arterial supply of the internal capsule"],
    finalFRCA: ["Recognise lacunar 'pure motor' stroke from posterior-limb infarction"],
  },
  {
    name: "External capsule · claustrum · insula",
    note: "Thin grey/white-matter layers between the putamen and the deep insular cortex — insula buried within the Sylvian fissure.",
    primaryFRCA: ["Identify the insular cortex on axial imaging"],
    finalFRCA: ["Insular involvement in MCA stroke — autonomic dysregulation and cardiac arrhythmia risk"],
  },
  {
    name: "Sylvian fissure",
    note: "Lateral CSF cleft housing the M1/M2 segments of the MCA. Hyperdense MCA sign in acute thrombosis.",
    primaryFRCA: ["Trace the course of the MCA in the Sylvian fissure"],
    finalFRCA: ["Time-critical recognition of MCA stroke for thrombolysis / thrombectomy referral"],
  },
  {
    name: "Thalami (paired)",
    note: "Egg-shaped grey-matter masses on either side of the third ventricle — sensory and arousal relay.",
    primaryFRCA: ["Describe thalamic functional anatomy"],
    finalFRCA: ["Recognise bilateral thalamic infarction (artery of Percheron) presenting as coma"],
  },
  {
    name: "Pineal gland",
    note: "Midline structure posterior to the third ventricle; commonly calcified — useful midline marker for assessing shift.",
    primaryFRCA: ["Identify the pineal gland and its melatonin-secreting role"],
    finalFRCA: ["Anaesthesia for pineal-region tumour surgery — sitting position, VAE risk"],
  },
  {
    name: "Choroid plexus & atrium of lateral ventricle",
    note: "Choroid plexus produces CSF; sits in the atrium (trigone) where body, occipital and temporal horns converge. Often calcified.",
    primaryFRCA: ["Describe CSF production by the choroid plexus"],
    finalFRCA: ["Recognise intraventricular haemorrhage and choroid plexus papilloma"],
  },
  {
    name: "Occipital horns & calcarine cortex",
    note: "Posterior extensions of the lateral ventricles; calcarine cortex on the medial occipital lobe = primary visual cortex (V1).",
    primaryFRCA: ["Describe the primary visual cortex and PCA territory"],
    finalFRCA: ["Recognise post-operative cortical visual loss; PCA stroke causing homonymous hemianopia"],
  },
  {
    name: "Occipital lobes (posteriorly)",
    note: "Form the back of the axial plane; separated from parietal lobes by the parieto-occipital sulcus.",
    primaryFRCA: ["Identify the occipital lobes and their visual function"],
    finalFRCA: ["Recognise PRES (posterior reversible encephalopathy) and occipital ischaemia"],
  },
];

/**
 * Inner plate content (no outer card chrome) — used by BrainPlatesViewer
 * so multiple views can share a single panel shell.
 */
export const BrainAxialPlate = () => (
  <>
    <div className="px-4 sm:px-6 py-4 border-b border-border bg-muted/30">
      <h3 className="text-lg font-serif font-bold text-foreground">Mid-Axial View of the Brain</h3>
      <p className="text-xs text-muted-foreground mt-1">
        Transverse section at the level of the basal ganglia and thalamus — the classic neuro-imaging plane
      </p>
    </div>

    <figure className="bg-[hsl(var(--background))]">
      <div className="relative">
        <img
          src={brainAxialImg}
          alt="Detailed anatomical axial (transverse) section of the human brain at the level of the basal ganglia and thalamus, showing frontal lobes, longitudinal fissure, genu and splenium of corpus callosum, frontal horns of lateral ventricles, septum pellucidum, third ventricle, caudate nucleus, putamen, globus pallidus, internal capsule, external capsule, claustrum, insula, Sylvian fissure, thalami, pineal gland, choroid plexus, atrium and occipital horns of lateral ventricles, calcarine cortex and occipital lobes."
          loading="lazy"
          width={1200}
          height={896}
          className="w-full h-auto block"
        />
        <BrainPlateLabels labels={plateLabels} />
      </div>
      <figcaption className="px-4 sm:px-6 py-3 text-xs text-muted-foreground italic border-t border-border">
        Anatomical reference plate with overlay labels. Frontal lobes anterior (top); occipital lobes posterior (bottom).
      </figcaption>
    </figure>

    <BrainRegionsList regions={labelledRegions} />

    <DiagramSourcesPanel
      references={references}
      imageCredit="Custom illustration generated for this resource (Gemini image model, premium tier), styled after Frank H. Netter / Gray's Anatomy axial cerebral plates. Anatomical labelling cross-checked against the references above."
      note="Educational use only. Not a substitute for primary anatomical references."
    />
  </>
);

const BrainAxialDiagram = () => (
    <DiagramFigure
      id="brain-axial-diagram"
      title="Brain axial"
      description="Inner plate content (no outer card chrome) — used by BrainPlatesViewer so multiple views can share a single panel shell."
    >
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <BrainAxialPlate />
    </div>
    </DiagramFigure>
  );

export default BrainAxialDiagram;
