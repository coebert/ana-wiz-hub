import brainAnatomyImg from "@/assets/brain-anatomy-lateral.jpg";
import { DiagramSourcesPanel, DiagramSource } from "./DiagramSourcesPanel";

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


const labelledRegions = [
  { name: "Frontal lobe", note: "Personality, executive function, motor planning. Houses Broca's area (dominant inferior frontal gyrus) — expressive speech." },
  { name: "Precentral gyrus (motor cortex)", note: "Primary motor cortex (Brodmann 4). Somatotopic homunculus — face/hand laterally, leg medially (toward falx)." },
  { name: "Central sulcus", note: "Divides frontal from parietal lobe; separates motor from sensory cortex." },
  { name: "Postcentral gyrus (sensory cortex)", note: "Primary somatosensory cortex (Brodmann 1, 2, 3). Mirrors motor homunculus." },
  { name: "Parietal lobe", note: "Sensory integration, spatial awareness, proprioception." },
  { name: "Lateral sulcus (Sylvian fissure)", note: "Separates temporal lobe from frontal/parietal lobes. MCA runs within it." },
  { name: "Temporal lobe", note: "Auditory cortex, memory (hippocampus), language comprehension. Wernicke's area in dominant superior temporal gyrus." },
  { name: "Occipital lobe", note: "Primary visual cortex (Brodmann 17) lies along the calcarine sulcus — supplied by the PCA." },
  { name: "Cerebellum", note: "Coordination, balance, motor learning. Supplied by SCA, AICA, PICA. Tonsillar herniation through foramen magnum is fatal." },
  { name: "Brainstem (midbrain, pons, medulla)", note: "Midbrain: CN III, IV. Pons: CN V–VIII. Medulla: CN IX–XII; cardiorespiratory centres and reticular activating system." },
];

const BrainAnatomyDiagram = () => {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
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

      <DiagramSourcesPanel
        references={references}
        imageCredit="Custom illustration generated for this resource (Gemini image model, premium tier), styled after Frank H. Netter / Gray's Anatomy lateral cerebral plates. Anatomical labelling cross-checked against the references above."
        note="Educational use only. Not a substitute for primary anatomical references."
      />
    </div>
  );
};

export default BrainAnatomyDiagram;
