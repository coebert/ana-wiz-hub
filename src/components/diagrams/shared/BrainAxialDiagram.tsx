import brainAxialImgAsset from "@/assets/brain-axial-gray742.png.asset.json";
const brainAxialImg = brainAxialImgAsset.url;
import { DiagramSourcesPanel, DiagramSource } from "@/components/diagrams/shared/DiagramSourcesPanel";
import { BrainRegionsList } from "@/components/diagrams/shared/BrainRegionsList";
import { DiagramFigure } from "../_shared/DiagramFigure";




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
          alt="Gray's Anatomy (1918) Fig. 742 — Horizontal section of right cerebral hemisphere"
          loading="lazy"
                    className="w-full h-auto block"
        />
      </div>
      <figcaption className="px-4 sm:px-6 py-3 text-xs text-muted-foreground italic border-t border-border">
        Gray's Anatomy reference plate with its original printed labels. Frontal lobes anterior (top); occipital lobes posterior (bottom).
      </figcaption>
    </figure>

    <BrainRegionsList regions={labelledRegions} />

    <DiagramSourcesPanel
      references={references}
      imageCredit="Henry Gray, Anatomy of the Human Body (20th ed., 1918), Fig. 742: Horizontal section of right cerebral hemisphere. Public domain, via Wikimedia Commons (https://commons.wikimedia.org/wiki/File:Gray742.png). Printed labels are Gray's original 1918 terms."
      note="Educational use only. Not a substitute for primary anatomical references."
    />
  </>
);

const BrainAxialDiagram = () => (
    <DiagramFigure
      id="brain-axial-diagram"
      title="Brain axial"
      description="Brain axial: labelled teaching figure summarising the key structures, relationships and values FRCA and FFICM candidates need to recognise and explain."
    >
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <BrainAxialPlate />
    </div>
    </DiagramFigure>
  );

export default BrainAxialDiagram;
