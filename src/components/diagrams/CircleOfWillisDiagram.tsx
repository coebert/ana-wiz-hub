import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { DiagramToggleBar } from "./DiagramToggleBar";

type VesselKey = "ica-l" | "ica-r" | "aca-l" | "aca-r" | "acomm" | "mca-l" | "mca-r" | "pcomm-l" | "pcomm-r" | "pca-l" | "pca-r" | "basilar" | "vert-l" | "vert-r" | "sca-l" | "sca-r" | "aica-l" | "aica-r" | "pica-l" | "pica-r" | "ophthalmic-l" | "ophthalmic-r";

interface Vessel {
  label: string;
  abbr: string;
  color: string;
  detail: string;
  territory: string;
  paths: string[];
  labelPos: { x: number; y: number };
  labelAnchor?: string;
  group: "anterior" | "posterior" | "communicating" | "cerebellar" | "branch";
}

const vessels: Record<VesselKey, Vessel> = {
  "ica-l": {
    label: "L Internal Carotid", abbr: "L ICA",
    color: "hsl(0, 65%, 55%)", group: "anterior",
    detail: "Enters skull via carotid canal → cavernous sinus (S-shaped siphon). Gives ophthalmic artery in cavernous segment. Terminates as ACA + MCA at supraclinoid bifurcation. Cavernous segment gives meningohypophyseal trunk.",
    territory: "Anterior 2/3 of cerebral hemisphere (via ACA + MCA)",
    paths: ["M142,280 C140,265 135,250 132,235 C128,218 126,200 130,185 C133,172 138,162 142,152"],
    labelPos: { x: 108, y: 268 },
  },
  "ica-r": {
    label: "R Internal Carotid", abbr: "R ICA",
    color: "hsl(0, 65%, 55%)", group: "anterior",
    detail: "Mirror of left ICA. Enters via right carotid canal. Same S-shaped cavernous siphon. Key collateral via PComm to posterior circulation.",
    territory: "Right anterior 2/3 of hemisphere",
    paths: ["M218,280 C220,265 225,250 228,235 C232,218 234,200 230,185 C227,172 222,162 218,152"],
    labelPos: { x: 252, y: 268 },
  },
  "aca-l": {
    label: "L Anterior Cerebral (A1→A2)", abbr: "L ACA",
    color: "hsl(20, 70%, 52%)", group: "anterior",
    detail: "A1 segment runs medially above optic chiasm to AComm. A2 (pericallosal) ascends in interhemispheric fissure along corpus callosum. A1 gives medial lenticulostriate arteries (Heubner's artery) → caudate head, anterior limb internal capsule.",
    territory: "Medial frontal & parietal cortex — leg motor/sensory strip. Occlusion → contralateral leg weakness, personality change (frontal).",
    paths: [
      "M142,152 C148,142 155,133 165,128 C170,126 175,124 180,123",
      "M180,123 C178,112 175,100 170,85 C166,74 162,65 158,55",
    ],
    labelPos: { x: 130, y: 118 },
  },
  "aca-r": {
    label: "R Anterior Cerebral (A1→A2)", abbr: "R ACA",
    color: "hsl(20, 70%, 52%)", group: "anterior",
    detail: "Mirror of left ACA. Connected by AComm. Recurrent artery of Heubner from A1/A2 junction.",
    territory: "Right medial cortex — right leg motor/sensory",
    paths: [
      "M218,152 C212,142 205,133 195,128 C190,126 185,124 180,123",
      "M180,123 C182,112 185,100 190,85 C194,74 198,65 202,55",
    ],
    labelPos: { x: 230, y: 118 },
  },
  acomm: {
    label: "Anterior Communicating", abbr: "AComm",
    color: "hsl(45, 80%, 50%)", group: "communicating",
    detail: "Short (1–3mm) segment connecting L & R ACA. MOST COMMON aneurysm site (~30%). Rupture → SAH with blood in interhemispheric fissure & frontal lobe haematoma. Associated with abulia, confabulation (from Heubner territory ischaemia).",
    territory: "No direct territory — key collateral between anterior circulations. Variant: may be absent, duplicated, or fenestrated.",
    paths: ["M172,123 L188,123"],
    labelPos: { x: 180, y: 108 },
  },
  "mca-l": {
    label: "L Middle Cerebral", abbr: "L MCA",
    color: "hsl(350, 60%, 52%)", group: "anterior",
    detail: "Largest terminal branch of ICA. M1 (sphenoidal) runs laterally in Sylvian fissure — gives lateral lenticulostriate arteries (supply internal capsule, basal ganglia). M2 branches over insula. Most commonly occluded in ischaemic stroke.",
    territory: "Lateral convexity — face/arm motor cortex, Broca's (dominant frontal), Wernicke's (dominant temporal). Occlusion → contralateral face+arm hemiplegia (leg spared), aphasia if dominant.",
    paths: [
      "M142,152 C132,148 118,144 105,140 C90,135 76,128 62,120",
      "M80,132 C72,124 65,115 58,105",
      "M80,132 C70,130 60,132 50,135",
    ],
    labelPos: { x: 42, y: 142 },
  },
  "mca-r": {
    label: "R Middle Cerebral", abbr: "R MCA",
    color: "hsl(350, 60%, 52%)", group: "anterior",
    detail: "Mirror of left MCA. Non-dominant hemisphere → neglect syndromes (especially right parietal). Same lenticulostriate branches.",
    territory: "Right lateral cortex. Occlusion → left hemiplegia (face+arm), left neglect, constructional apraxia.",
    paths: [
      "M218,152 C228,148 242,144 255,140 C270,135 284,128 298,120",
      "M280,132 C288,124 295,115 302,105",
      "M280,132 C290,130 300,132 310,135",
    ],
    labelPos: { x: 318, y: 142 },
  },
  "pcomm-l": {
    label: "L Posterior Communicating", abbr: "L PComm",
    color: "hsl(45, 80%, 50%)", group: "communicating",
    detail: "Connects ICA to PCA. 2nd most common aneurysm site (~25%). Aneurysm expands posterolaterally → compresses CN III (oculomotor) at tentorial edge → ipsilateral fixed dilated pupil, ptosis, 'down and out' eye.",
    territory: "Key collateral. Gives anterior thalamoperforating branches → hypothalamus, anterior thalamus.",
    paths: ["M136,168 C140,178 144,188 150,195"],
    labelPos: { x: 105, y: 185 },
  },
  "pcomm-r": {
    label: "R Posterior Communicating", abbr: "R PComm",
    color: "hsl(45, 80%, 50%)", group: "communicating",
    detail: "Mirror of left PComm. Same CN III compression risk with aneurysm.",
    territory: "Collateral pathway",
    paths: ["M224,168 C220,178 216,188 210,195"],
    labelPos: { x: 255, y: 185 },
  },
  "pca-l": {
    label: "L Posterior Cerebral", abbr: "L PCA",
    color: "hsl(240, 50%, 55%)", group: "posterior",
    detail: "P1 from basilar tip to PComm junction. P2 wraps around midbrain in ambient cistern. P1 gives posterior thalamoperforating arteries → midbrain, posterior thalamus. P2/P3 give temporal and calcarine branches.",
    territory: "Occipital visual cortex, inferior temporal, posterior thalamus. Occlusion → contralateral homonymous hemianopia with macular sparing (dual supply from MCA).",
    paths: [
      "M180,210 C172,206 162,200 150,195",
      "M150,195 C135,192 118,194 100,200 C85,206 72,215 60,225",
    ],
    labelPos: { x: 50, y: 210 },
  },
  "pca-r": {
    label: "R Posterior Cerebral", abbr: "R PCA",
    color: "hsl(240, 50%, 55%)", group: "posterior",
    detail: "Mirror of left PCA. Supplies right occipital and inferior temporal lobes.",
    territory: "Right visual cortex — left homonymous hemianopia if occluded",
    paths: [
      "M180,210 C188,206 198,200 210,195",
      "M210,195 C225,192 242,194 260,200 C275,206 288,215 300,225",
    ],
    labelPos: { x: 310, y: 210 },
  },
  basilar: {
    label: "Basilar Artery", abbr: "Basilar",
    color: "hsl(220, 55%, 50%)", group: "posterior",
    detail: "Formed by union of vertebral arteries at pontomedullary junction. Runs in pontine cistern. Gives pontine perforating branches, AICA, SCA. Terminates as bilateral PCAs at interpeduncular fossa.",
    territory: "Pons, upper cerebellum. Complete occlusion → 'locked-in syndrome' (ventral pons infarct — quadriplegia, anarthria, preserved consciousness & vertical eye movement).",
    paths: ["M180,270 C180,258 180,244 180,230 C180,222 180,216 180,210"],
    labelPos: { x: 180, y: 285 },
  },
  "vert-l": {
    label: "L Vertebral", abbr: "L Vert",
    color: "hsl(220, 50%, 48%)", group: "posterior",
    detail: "From subclavian artery (1st branch). Ascends through C6–C1 transverse foramina (V2 segment). Enters skull via foramen magnum (V4 segment). Gives PICA, anterior spinal artery, posterior spinal arteries before joining right vertebral.",
    territory: "Via PICA → lateral medulla (Wallenberg syndrome: ipsilateral Horner, facial numbness, cerebellar signs, contralateral body pain/temp loss), inferior cerebellum. Via ASA → anterior 2/3 spinal cord.",
    paths: [
      "M155,310 C158,300 162,290 168,280 C172,274 176,272 180,270",
    ],
    labelPos: { x: 120, y: 308 },
  },
  "vert-r": {
    label: "R Vertebral", abbr: "R Vert",
    color: "hsl(220, 50%, 48%)", group: "posterior",
    detail: "Mirror of left vertebral. Usually smaller (left dominant in ~70%). Joins left vertebral to form basilar.",
    territory: "Right PICA territory",
    paths: [
      "M205,310 C202,300 198,290 192,280 C188,274 184,272 180,270",
    ],
    labelPos: { x: 240, y: 308 },
  },
  "sca-l": {
    label: "L Superior Cerebellar", abbr: "L SCA",
    color: "hsl(180, 45%, 48%)", group: "cerebellar",
    detail: "Arises from basilar just before bifurcation. CN III passes between SCA and PCA. Supplies superior cerebellum, superior cerebellar peduncle, dentate nucleus.",
    territory: "Superior cerebellum. Occlusion → ipsilateral limb ataxia, dysarthria.",
    paths: ["M180,214 C170,218 158,222 145,228 C132,234 120,242 108,250"],
    labelPos: { x: 98, y: 245 },
  },
  "sca-r": {
    label: "R Superior Cerebellar", abbr: "R SCA",
    color: "hsl(180, 45%, 48%)", group: "cerebellar",
    detail: "Mirror of left SCA.",
    territory: "Right superior cerebellum",
    paths: ["M180,214 C190,218 202,222 215,228 C228,234 240,242 252,250"],
    labelPos: { x: 262, y: 245 },
  },
  "aica-l": {
    label: "L Ant. Inf. Cerebellar", abbr: "L AICA",
    color: "hsl(160, 45%, 45%)", group: "cerebellar",
    detail: "From lower basilar. Supplies anteroinferior cerebellum, CN VII & VIII at cerebellopontine angle. Gives labyrinthine artery (internal ear).",
    territory: "Anteroinferior cerebellum, inner ear. Occlusion → vertigo, ipsilateral deafness, facial palsy, cerebellar signs.",
    paths: ["M180,248 C168,252 155,258 140,265 C128,272 118,278 108,285"],
    labelPos: { x: 98, y: 278 },
  },
  "aica-r": {
    label: "R Ant. Inf. Cerebellar", abbr: "R AICA",
    color: "hsl(160, 45%, 45%)", group: "cerebellar",
    detail: "Mirror of left AICA.",
    territory: "Right anteroinferior cerebellum",
    paths: ["M180,248 C192,252 205,258 220,265 C232,272 242,278 252,285"],
    labelPos: { x: 262, y: 278 },
  },
  "pica-l": {
    label: "L Post. Inf. Cerebellar", abbr: "L PICA",
    color: "hsl(200, 50%, 48%)", group: "cerebellar",
    detail: "Largest vertebral branch. Tortuous course around medulla. Supplies posterior inferior cerebellum, choroid plexus of 4th ventricle, lateral medulla.",
    territory: "Lateral medulla → Wallenberg syndrome (most common posterior circulation stroke). Inferior cerebellum — large infarct may compress brainstem.",
    paths: ["M165,285 C155,288 145,294 138,302 C130,310 125,318 122,325"],
    labelPos: { x: 106, y: 320 },
  },
  "pica-r": {
    label: "R Post. Inf. Cerebellar", abbr: "R PICA",
    color: "hsl(200, 50%, 48%)", group: "cerebellar",
    detail: "Mirror of left PICA.",
    territory: "Right lateral medulla and inferior cerebellum",
    paths: ["M195,285 C205,288 215,294 222,302 C230,310 235,318 238,325"],
    labelPos: { x: 248, y: 320 },
  },
  "ophthalmic-l": {
    label: "L Ophthalmic Artery", abbr: "L Ophth.",
    color: "hsl(30, 60%, 52%)", group: "branch",
    detail: "First major branch of supraclinoid ICA. Enters orbit via optic canal with CN II. Gives central retinal artery (end artery — occlusion → sudden painless monocular blindness).",
    territory: "Retina (central retinal artery), orbit. Amaurosis fugax = transient monocular blindness from microemboli.",
    paths: ["M138,158 C130,152 120,146 108,140 C98,136 88,134 78,132"],
    labelPos: { x: 60, y: 128 },
  },
  "ophthalmic-r": {
    label: "R Ophthalmic Artery", abbr: "R Ophth.",
    color: "hsl(30, 60%, 52%)", group: "branch",
    detail: "Mirror of left ophthalmic artery.",
    territory: "Right retina and orbit",
    paths: ["M222,158 C230,152 240,146 252,140 C262,136 272,134 282,132"],
    labelPos: { x: 292, y: 128 },
  },
};

const vesselOrder: VesselKey[] = [
  "vert-l", "vert-r", "pica-l", "pica-r", "basilar", "aica-l", "aica-r", "sca-l", "sca-r",
  "pca-l", "pca-r", "pcomm-l", "pcomm-r", "ica-l", "ica-r",
  "ophthalmic-l", "ophthalmic-r", "mca-l", "mca-r", "aca-l", "aca-r", "acomm",
];

const aneurysmSites = [
  { x: 180, y: 123, label: "AComm (~30%)", vessel: "acomm" as VesselKey, note: "Most common. SAH → interhemispheric blood." },
  { x: 136, y: 168, label: "PComm (~25%)", vessel: "pcomm-l" as VesselKey, note: "CN III palsy — fixed dilated pupil, ptosis." },
  { x: 142, y: 152, label: "ICA bifurcation (~7%)", vessel: "ica-l" as VesselKey, note: "Visual field defects from chiasm compression." },
  { x: 80, y: 132, label: "MCA bifurcation (~20%)", vessel: "mca-l" as VesselKey, note: "Sylvian fissure SAH. May present with seizures." },
  { x: 180, y: 210, label: "Basilar tip (~5%)", vessel: "basilar" as VesselKey, note: "CN III between SCA & PCA. Difficult surgical access." },
];

const cranialNerves = [
  { x: 168, y: 146, label: "CN II", detail: "Optic nerve" },
  { x: 162, y: 170, label: "CN III", detail: "Between SCA & PCA" },
];

type GroupFilter = "all" | "anterior" | "posterior" | "communicating" | "cerebellar" | "branch";

const CircleOfWillisDiagram = () => {
  const [selected, setSelected] = useState<VesselKey>("acomm");
  const [showAneurysms, setShowAneurysms] = useState(true);
  const [showCNs, setShowCNs] = useState(false);
  const [groupFilter, setGroupFilter] = useState<GroupFilter>("all");
  const [showSutures, setShowSutures] = useState<boolean>(true);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const info = vessels[selected];

  const isVisible = (key: VesselKey) =>
    groupFilter === "all" || vessels[key].group === groupFilter;

  return (
    <div className="my-6 space-y-4">
      <div className="bg-muted/30 rounded-xl border border-border p-4">
        <DiagramToggleBar
          title="Circle of Willis — Vascular Map"
          subtitle="Tap any vessel to see territory, clinical significance, and stroke syndromes"
          toggles={[
            { label: "Sutures", active: showSutures, onChange: () => setShowSutures(s => !s) },
            { label: "Labels", active: showLabels, onChange: () => setShowLabels(s => !s) },
            { label: "Aneurysms", active: showAneurysms, onChange: () => setShowAneurysms(s => !s) },
            { label: "Cranial nerves", active: showCNs, onChange: () => setShowCNs(s => !s) },
          ]}
        />

      {/* Group filter */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {(["all", "anterior", "posterior", "communicating", "cerebellar", "branch"] as GroupFilter[]).map(g => (
          <Badge
            key={g}
            variant={groupFilter === g ? "default" : "outline"}
            className="cursor-pointer text-xs capitalize"
            onClick={() => setGroupFilter(g)}
          >
            {g === "all" ? "All Vessels" : g}
          </Badge>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="flex-shrink-0 mx-auto">
          <svg viewBox="20 35 320 305" width="320" height="300" className="border border-border rounded">
            {/* Brain outline — inferior (basal) view with anatomical detail */}
            <g opacity="0.14" stroke="hsl(var(--muted-foreground))" strokeWidth="1" fill="none">
              {/* Frontal lobes — wider anteriorly with gyral folding */}
              <path d="M180,42 C155,42 125,48 100,62 C78,76 62,95 55,118 C48,142 50,165 58,182 C62,190 65,193 65,193" />
              <path d="M180,42 C205,42 235,48 260,62 C282,76 298,95 305,118 C312,142 310,165 302,182 C298,190 295,193 295,193" />
              {/* Frontal pole detail — olfactory sulcus */}
              <path d="M160,50 C165,55 170,62 172,72" strokeDasharray="2 2" opacity="0.6" />
              <path d="M200,50 C195,55 190,62 188,72" strokeDasharray="2 2" opacity="0.6" />
              {/* Longitudinal fissure */}
              <line x1="180" y1="42" x2="180" y2="92" strokeDasharray="3 3" />
              {/* Orbital surfaces (frontal lobe gyri) */}
              <path d="M120,70 C130,75 140,78 150,78" strokeWidth="0.5" opacity="0.4" />
              <path d="M240,70 C230,75 220,78 210,78" strokeWidth="0.5" opacity="0.4" />

              {/* Temporal lobes — curved inferiorly with uncus */}
              <path d="M65,193 C58,205 52,222 50,240 C48,258 52,275 62,288 C72,300 88,308 110,314 C125,318 140,320 155,318" />
              <path d="M295,193 C302,205 308,222 310,240 C312,258 308,275 298,288 C288,300 272,308 250,314 C235,318 220,320 205,318" />
              {/* Temporal uncus (medial temporal lobe — tentorial notch) */}
              <path d="M125,175 C118,182 112,188 110,195" strokeWidth="1" opacity="0.5" />
              <path d="M235,175 C242,182 248,188 250,195" strokeWidth="1" opacity="0.5" />
              <text x="100" y="200" fontSize="3.5" fill="hsl(var(--muted-foreground))" opacity="0.4" fontStyle="italic">uncus</text>
              <text x="256" y="200" fontSize="3.5" fill="hsl(var(--muted-foreground))" opacity="0.4" fontStyle="italic">uncus</text>

              {/* Sylvian fissures — more anatomically correct lateral sulcus */}
              <path d="M145,148 C130,143 112,140 95,140 C82,142 72,146 65,152" strokeDasharray="2 2" strokeWidth="0.75" />
              <path d="M215,148 C230,143 248,140 265,140 C278,142 288,146 295,152" strokeDasharray="2 2" strokeWidth="0.75" />

              {/* Occipital lobes */}
              <path d="M155,318 C165,322 175,324 180,324 C185,324 195,322 205,318" />
              <path d="M110,314 C120,320 140,326 160,328 C175,329 185,329 200,328 C220,326 240,320 250,314" strokeDasharray="3 2" opacity="0.5" />

              {/* ===== BRAINSTEM — anatomically detailed ===== */}
              {/* Midbrain (cerebral peduncles) */}
              <ellipse cx="180" cy="210" rx="18" ry="10" strokeWidth="1" />
              <text x="180" y="213" fontSize="3.5" textAnchor="middle" fill="hsl(var(--muted-foreground))" opacity="0.5">midbrain</text>
              {/* Pons — wider, rectangular with basilar sulcus */}
              <path d="M160,220 L160,255 Q165,260 180,262 Q195,260 200,255 L200,220 Q195,218 180,217 Q165,218 160,220 Z" strokeWidth="1" />
              <line x1="180" y1="220" x2="180" y2="258" strokeWidth="0.5" strokeDasharray="1 2" opacity="0.4" />
              <text x="180" y="242" fontSize="3.5" textAnchor="middle" fill="hsl(var(--muted-foreground))" opacity="0.5">pons</text>
              {/* Medulla oblongata — tapered */}
              <path d="M165,258 L168,285 Q175,292 180,293 Q185,292 192,285 L195,258" strokeWidth="1" />
              {/* Pyramids */}
              <line x1="177" y1="262" x2="177" y2="288" strokeWidth="0.5" opacity="0.4" />
              <line x1="183" y1="262" x2="183" y2="288" strokeWidth="0.5" opacity="0.4" />
              <text x="180" y="278" fontSize="3" textAnchor="middle" fill="hsl(var(--muted-foreground))" opacity="0.4">medulla</text>

              {/* Cerebellum — more detailed inferior view */}
              <path d="M115,250 C105,258 95,272 90,288 C86,302 88,314 98,320 C108,326 122,326 138,322 C152,318 162,312 168,305" strokeWidth="1" />
              <path d="M245,250 C255,258 265,272 270,288 C274,302 272,314 262,320 C252,326 238,326 222,322 C208,318 198,312 192,305" strokeWidth="1" />
              {/* Cerebellar folia (surface folds) */}
              <path d="M100,275 C110,278 125,280 135,278" strokeWidth="0.5" opacity="0.4" />
              <path d="M95,290 C108,294 125,296 140,294" strokeWidth="0.5" opacity="0.4" />
              <path d="M260,275 C250,278 235,280 225,278" strokeWidth="0.5" opacity="0.4" />
              <path d="M265,290 C252,294 235,296 220,294" strokeWidth="0.5" opacity="0.4" />
              {/* Vermis */}
              <path d="M168,305 C174,310 180,312 186,312 C190,310 192,305" strokeWidth="0.5" opacity="0.5" />
              <text x="180" y="318" fontSize="3.5" textAnchor="middle" fill="hsl(var(--muted-foreground))" opacity="0.4" fontStyle="italic">vermis</text>

              {/* Optic chiasm — more anatomical */}
              <path d="M152,138 L168,148 L180,150 L192,148 L208,138" strokeWidth="2" opacity="0.7" />
              <path d="M168,148 L180,142 L192,148" strokeWidth="1.5" opacity="0.5" />
              <text x="180" y="136" fontSize="4.5" textAnchor="middle" fill="hsl(var(--muted-foreground))">Optic chiasm</text>
              {/* Optic nerves */}
              <path d="M152,138 C140,128 128,118 115,112" strokeWidth="1.5" opacity="0.5" />
              <path d="M208,138 C220,128 232,118 245,112" strokeWidth="1.5" opacity="0.5" />
              {/* Optic tracts */}
              <path d="M168,148 C158,158 145,168 135,175" strokeWidth="1" opacity="0.4" strokeDasharray="2 2" />
              <path d="M192,148 C202,158 215,168 225,175" strokeWidth="1" opacity="0.4" strokeDasharray="2 2" />

              {/* Tentorium cerebelli — dural fold */}
              <path d="M65,200 C95,192 135,188 180,188 C225,188 265,192 295,200" strokeDasharray="5 3" opacity="0.5" strokeWidth="1" />
              <text x="310" y="195" fontSize="4" fill="hsl(var(--muted-foreground))">Tentorium</text>

              {/* Sella turcica / pituitary fossa hint */}
              <path d="M170,155 Q175,162 180,164 Q185,162 190,155" strokeWidth="0.75" opacity="0.4" />
              <text x="180" y="170" fontSize="3" textAnchor="middle" fill="hsl(var(--muted-foreground))" opacity="0.35" fontStyle="italic">sella</text>

              {/* Cranial nerve exit points */}
              <g opacity="0.3" fill="hsl(var(--muted-foreground))">
                <circle cx="168" cy="218" r="1.2" />
                <text x="155" y="220" fontSize="3">CN III</text>
                <circle cx="192" cy="218" r="1.2" />
                <circle cx="155" cy="238" r="1.2" />
                <text x="142" y="240" fontSize="3">CN V</text>
                <circle cx="205" cy="238" r="1.2" />
              </g>
            </g>

            {/* Vessel paths */}
            {vesselOrder.map((key) => {
              const v = vessels[key];
              const isActive = selected === key;
              const visible = isVisible(key);
              if (!visible && !isActive) return null;
              return (
                <g key={key} className="cursor-pointer" onClick={() => setSelected(key)}>
                  {v.paths.map((p, i) => (
                    <g key={i}>
                      <path
                        d={p}
                        fill="none"
                        stroke={v.color}
                        strokeWidth={isActive ? 4.5 : 3}
                        strokeLinecap="round"
                        opacity={isActive ? 1 : visible ? 0.45 : 0.1}
                        className="transition-all duration-200"
                      />
                      <path d={p} fill="none" stroke="transparent" strokeWidth="3" />
                    </g>
                  ))}
                </g>
              );
            })}

            {/* Basilar tip */}
            <circle cx="180" cy="210" r="3" fill="hsl(220, 55%, 50%)" opacity="0.5" />

            {/* Aneurysm markers */}
            {showAneurysms && aneurysmSites.map((site, i) => (
              <g key={i} className="cursor-pointer" onClick={() => setSelected(site.vessel)}>
                <circle cx={site.x} cy={site.y} r="5" fill="none" stroke="hsl(45, 80%, 50%)" strokeWidth="1.5" opacity={selected === site.vessel ? 0.9 : 0.35} strokeDasharray="2 1" />
                <circle cx={site.x} cy={site.y} r="1.8" fill="hsl(45, 80%, 50%)" opacity={selected === site.vessel ? 0.9 : 0.35} />
              </g>
            ))}

            {/* Cranial nerves */}
            {showCNs && cranialNerves.map((cn, i) => (
              <g key={i} opacity="0.6">
                <circle cx={cn.x} cy={cn.y} r="3.5" fill="none" stroke="hsl(var(--foreground))" strokeWidth="0.75" />
                <text x={cn.x} y={cn.y + 1.5} fontSize="4.5" textAnchor="middle" fill="hsl(var(--foreground))" fontWeight="bold">{cn.label}</text>
              </g>
            ))}

            {/* Vessel labels */}
            {vesselOrder.map((key) => {
              const v = vessels[key];
              const isActive = selected === key;
              const visible = isVisible(key);
              if (!visible && !isActive) return null;
              return (
                    <text
                  key={key + "-label"}
                  x={v.labelPos.x}
                  y={v.labelPos.y}
                  fontSize="6"
                  fill={isActive ? v.color : "hsl(var(--muted-foreground))"}
                  fontWeight={isActive ? "bold" : "normal"}
                  textAnchor={v.labelAnchor || "middle"}
                  className="cursor-pointer select-none"
                  onClick={() => setSelected(key)}
                  opacity={isActive ? 1 : 0.6}
                >
                  {v.abbr}
                </text>
  );
            })}

            {/* Territory shading when vessel selected */}
            {selected === "mca-l" && (
              <path d="M55,118 C65,105 80,95 100,90 C120,85 138,88 145,95 C140,125 135,155 140,175 C120,170 90,160 65,155 C50,148 48,135 55,118 Z"
                fill={vessels["mca-l"].color} fillOpacity="0.08" stroke="none" className="animate-fade-in" />
            )}
            {selected === "mca-r" && (
              <path d="M305,118 C295,105 280,95 260,90 C240,85 222,88 215,95 C220,125 225,155 220,175 C240,170 270,160 295,155 C310,148 312,135 305,118 Z"
                fill={vessels["mca-r"].color} fillOpacity="0.08" stroke="none" className="animate-fade-in" />
            )}
            {(selected === "aca-l" || selected === "aca-r") && (
              <path d="M160,42 C168,48 175,60 178,75 C180,90 180,100 178,112 C175,100 170,88 164,78 C158,68 155,55 160,42 Z"
                fill={vessels["aca-l"].color} fillOpacity="0.1" stroke="none" className="animate-fade-in" />
            )}
            {(selected === "pca-l" || selected === "pca-r") && (
              <path d="M120,308 C140,295 160,290 180,290 C200,290 220,295 240,308 C220,318 200,322 180,322 C160,322 140,318 120,308 Z"
                fill={vessels["pca-l"].color} fillOpacity="0.08" stroke="none" className="animate-fade-in" />
            )}
          </svg>

          <div className="flex gap-1.5 mt-2 flex-wrap">
            <button
              onClick={() => setShowAneurysms(!showAneurysms)}
              className={`text-xs px-2 py-1 rounded border transition-colors ${showAneurysms ? "border-amber-500/50 bg-amber-500/10 text-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}
            >
              {showAneurysms ? "⊕" : "⊖"} Aneurysm sites
            </button>
            <button
              onClick={() => setShowCNs(!showCNs)}
              className={`text-xs px-2 py-1 rounded border transition-colors ${showCNs ? "border-primary/50 bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}
            >
              {showCNs ? "⊕" : "⊖"} Cranial nerves
            </button>
          </div>
        </div>

        {/* Info panel */}
        <div className="flex-1 min-w-0 space-y-3">
          <div className="p-4 rounded-lg border border-border animate-fade-in" key={selected}>
            <div className="flex items-center gap-2 mb-2">
              <p className="font-bold text-sm" style={{ color: info.color }}>{info.label}</p>
              <Badge variant="outline" className="text-xs capitalize">{info.group}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{info.detail}</p>
            <div className="mt-2 pt-2 border-t border-border/50">
              <p className="text-xs text-muted-foreground">
                <strong className="text-foreground">Territory / Stroke syndrome:</strong> {info.territory}
              </p>
            </div>
          </div>

          {/* Aneurysm info when relevant */}
          {showAneurysms && aneurysmSites.find(a => a.vessel === selected) && (
            <div className="p-3 rounded-lg border border-amber-500/30 bg-amber-500/5 animate-fade-in">
              <p className="text-xs font-semibold text-amber-400 mb-1">⚠ Aneurysm Site</p>
              <p className="text-xs text-muted-foreground">{aneurysmSites.find(a => a.vessel === selected)?.note}</p>
            </div>
          )}

          {/* Circle completeness note */}
          <div className="p-3 rounded-lg border border-border/60 bg-muted/20">
            <p className="text-xs font-semibold text-foreground mb-1">Exam Key Facts</p>
            <div className="space-y-0.5 text-xs text-muted-foreground">
              <p>• Complete circle present in only ~25–50% of population</p>
              <p>• Anterior circulation (ICA) = 80% of cerebral blood flow</p>
              <p>• Posterior circulation (vertebrobasilar) = 20%</p>
              <p>• Berry aneurysms at branch points — rupture → SAH</p>
              <p>• CN III runs between SCA & PCA at tentorial edge</p>
            </div>
          </div>
        </div>
      </div>
    </div>
      </div>
  );
};

export default CircleOfWillisDiagram;
