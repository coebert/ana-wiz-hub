import { useState } from "react";

type VesselKey = "ica-l" | "ica-r" | "aca-l" | "aca-r" | "acomm" | "mca-l" | "mca-r" | "pcomm-l" | "pcomm-r" | "pca-l" | "pca-r" | "basilar" | "vert-l" | "vert-r";

interface Vessel {
  label: string;
  color: string;
  detail: string;
  territory: string;
  paths: string[];
  labelPos: { x: number; y: number };
  labelAnchor?: string;
}

const vessels: Record<VesselKey, Vessel> = {
  "ica-l": {
    label: "L Internal Carotid",
    color: "hsl(0, 65%, 55%)",
    detail: "Enters skull via carotid canal. C-shaped siphon in cavernous sinus. Gives ophthalmic artery. Terminates as ACA + MCA at bifurcation.",
    territory: "Anterior 2/3 of cerebral hemisphere (via ACA + MCA)",
    paths: [
      "M142,280 C140,265 135,250 132,235 C128,218 126,200 130,185 C133,172 138,162 142,152",
    ],
    labelPos: { x: 108, y: 268 },
  },
  "ica-r": {
    label: "R Internal Carotid",
    color: "hsl(0, 65%, 55%)",
    detail: "Mirror of left ICA. Enters via right carotid canal. Same S-shaped siphon pattern.",
    territory: "Right anterior 2/3 of hemisphere",
    paths: [
      "M218,280 C220,265 225,250 228,235 C232,218 234,200 230,185 C227,172 222,162 218,152",
    ],
    labelPos: { x: 252, y: 268 },
  },
  "aca-l": {
    label: "L Anterior Cerebral (A1→A2)",
    color: "hsl(20, 70%, 52%)",
    detail: "A1 segment runs medially above optic chiasm to join AComm. A2 ascends in interhemispheric fissure. Supplies medial frontal and parietal lobes.",
    territory: "Medial surface — leg motor/sensory cortex. Occlusion → contralateral leg weakness.",
    paths: [
      // A1 segment horizontal toward midline
      "M142,152 C148,142 155,133 165,128 C170,126 175,124 180,123",
      // A2 segment ascending
      "M180,123 C178,112 175,100 170,85 C166,74 162,65 158,55",
    ],
    labelPos: { x: 130, y: 118 },
  },
  "aca-r": {
    label: "R Anterior Cerebral (A1→A2)",
    color: "hsl(20, 70%, 52%)",
    detail: "Mirror of left ACA. Connected to left ACA by anterior communicating artery.",
    territory: "Right medial surface — right leg motor/sensory cortex",
    paths: [
      "M218,152 C212,142 205,133 195,128 C190,126 185,124 180,123",
      "M180,123 C182,112 185,100 190,85 C194,74 198,65 202,55",
    ],
    labelPos: { x: 230, y: 118 },
  },
  acomm: {
    label: "Anterior Communicating",
    color: "hsl(45, 80%, 50%)",
    detail: "Short segment connecting L and R ACA. MOST COMMON site of intracranial aneurysm (~30%). Rupture → SAH with blood in interhemispheric fissure.",
    territory: "No direct territory — collateral pathway between anterior circulations",
    paths: ["M172,123 L188,123"],
    labelPos: { x: 180, y: 108 },
  },
  "mca-l": {
    label: "L Middle Cerebral",
    color: "hsl(350, 60%, 52%)",
    detail: "Largest branch of ICA. M1 runs laterally in Sylvian fissure. Most commonly affected in ischaemic stroke. Lenticulostriate branches supply internal capsule.",
    territory: "Lateral surface — face/arm motor cortex, Broca's & Wernicke's (dominant). Occlusion → contralateral hemiplegia (face+arm > leg), aphasia.",
    paths: [
      "M142,152 C132,148 118,144 105,140 C90,135 76,128 62,120",
      // M2 branches
      "M80,132 C72,124 65,115 58,105",
      "M80,132 C70,130 60,132 50,135",
    ],
    labelPos: { x: 42, y: 142 },
  },
  "mca-r": {
    label: "R Middle Cerebral",
    color: "hsl(350, 60%, 52%)",
    detail: "Mirror of left MCA. Supplies right lateral hemisphere. Non-dominant → neglect syndromes.",
    territory: "Right lateral surface — face/arm motor cortex. Occlusion → left hemiplegia, left neglect.",
    paths: [
      "M218,152 C228,148 242,144 255,140 C270,135 284,128 298,120",
      "M280,132 C288,124 295,115 302,105",
      "M280,132 C290,130 300,132 310,135",
    ],
    labelPos: { x: 318, y: 142 },
  },
  "pcomm-l": {
    label: "L Posterior Communicating",
    color: "hsl(45, 80%, 50%)",
    detail: "Connects ICA to PCA. 2nd most common aneurysm site. Aneurysm compresses CN III → ipsilateral dilated pupil, ptosis.",
    territory: "No direct territory — collateral between anterior and posterior circulations",
    paths: ["M136,168 C140,178 144,188 150,195"],
    labelPos: { x: 108, y: 185 },
  },
  "pcomm-r": {
    label: "R Posterior Communicating",
    color: "hsl(45, 80%, 50%)",
    detail: "Mirror of left PComm. Same aneurysm risk and CN III compression.",
    territory: "Collateral pathway",
    paths: ["M224,168 C220,178 216,188 210,195"],
    labelPos: { x: 252, y: 185 },
  },
  "pca-l": {
    label: "L Posterior Cerebral",
    color: "hsl(240, 50%, 55%)",
    detail: "P1 from basilar tip to PComm junction, P2 wraps around midbrain in ambient cistern. Supplies occipital lobe, inferior temporal, thalamus.",
    territory: "Visual cortex. Occlusion → contralateral homonymous hemianopia with macular sparing.",
    paths: [
      // P1 segment
      "M180,210 C172,206 162,200 150,195",
      // P2 segment wrapping around
      "M150,195 C135,192 118,194 100,200 C85,206 72,215 60,225",
    ],
    labelPos: { x: 50, y: 210 },
  },
  "pca-r": {
    label: "R Posterior Cerebral",
    color: "hsl(240, 50%, 55%)",
    detail: "Mirror of left PCA. Supplies right occipital and inferior temporal lobes.",
    territory: "Right visual cortex — left homonymous hemianopia if occluded",
    paths: [
      "M180,210 C188,206 198,200 210,195",
      "M210,195 C225,192 242,194 260,200 C275,206 288,215 300,225",
    ],
    labelPos: { x: 310, y: 210 },
  },
  basilar: {
    label: "Basilar Artery",
    color: "hsl(220, 55%, 50%)",
    detail: "Formed by union of vertebral arteries at pontomedullary junction. Gives pontine, AICA, SCA branches. Terminates as bilateral PCAs at top of pons.",
    territory: "Pons, cerebellum. Occlusion → 'locked-in syndrome', cerebellar infarction.",
    paths: ["M180,270 C180,258 180,244 180,230 C180,222 180,216 180,210"],
    labelPos: { x: 180, y: 285 },
  },
  "vert-l": {
    label: "L Vertebral",
    color: "hsl(220, 50%, 48%)",
    detail: "From subclavian artery. Ascends through C6–C1 transverse foramina. Enters skull via foramen magnum. Gives PICA before joining right vertebral.",
    territory: "PICA → lateral medulla (Wallenberg syndrome), inferior cerebellum",
    paths: [
      "M155,310 C158,300 162,290 168,280 C172,274 176,272 180,270",
      // PICA branch
      "M165,285 C155,288 145,294 138,302",
    ],
    labelPos: { x: 120, y: 308 },
  },
  "vert-r": {
    label: "R Vertebral",
    color: "hsl(220, 50%, 48%)",
    detail: "Mirror of left vertebral. Usually smaller than left. Joins left vertebral to form basilar at pontomedullary junction.",
    territory: "Right PICA territory",
    paths: [
      "M205,310 C202,300 198,290 192,280 C188,274 184,272 180,270",
      "M195,285 C205,288 215,294 222,302",
    ],
    labelPos: { x: 240, y: 308 },
  },
};

const vesselOrder: VesselKey[] = ["vert-l", "vert-r", "basilar", "pca-l", "pca-r", "pcomm-l", "pcomm-r", "ica-l", "ica-r", "mca-l", "mca-r", "aca-l", "aca-r", "acomm"];

// Aneurysm sites with frequencies
const aneurysmSites = [
  { x: 180, y: 123, label: "AComm (~30%)", vessel: "acomm" as VesselKey },
  { x: 136, y: 168, label: "PComm (~25%)", vessel: "pcomm-l" as VesselKey },
  { x: 142, y: 152, label: "ICA bifurcation", vessel: "ica-l" as VesselKey },
  { x: 80, y: 132, label: "MCA bifurcation (~20%)", vessel: "mca-l" as VesselKey },
];

const CircleOfWillisDiagram = () => {
  const [selected, setSelected] = useState<VesselKey>("acomm");
  const [showAneurysms, setShowAneurysms] = useState(true);
  const info = vessels[selected];

  return (
    <div className="border border-border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">Circle of Willis — Interactive Vascular Map</h3>
      <p className="text-xs text-muted-foreground mb-3">Tap any vessel to see its territory and clinical significance</p>

      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="flex-shrink-0 mx-auto">
          <svg viewBox="25 40 310 290" width="310" height="280" className="border border-border rounded">
            {/* Brain outline - inferior view */}
            <g opacity="0.12" stroke="hsl(var(--muted-foreground))" strokeWidth="1" fill="none">
              {/* Frontal lobes */}
              <path d="M180,45 C130,45 70,70 55,120 C45,155 50,180 65,195" />
              <path d="M180,45 C230,45 290,70 305,120 C315,155 310,180 295,195" />
              {/* Temporal lobes */}
              <path d="M65,195 C55,210 50,240 60,265 C70,285 90,300 120,310" />
              <path d="M295,195 C305,210 310,240 300,265 C290,285 270,300 240,310" />
              {/* Occipital */}
              <path d="M120,310 C150,320 210,320 240,310" />
              {/* Interhemispheric fissure */}
              <line x1="180" y1="45" x2="180" y2="90" strokeDasharray="3 3" />
              {/* Sylvian fissures */}
              <path d="M140,150 C120,145 100,145 80,148" strokeDasharray="2 2" />
              <path d="M220,150 C240,145 260,145 280,148" strokeDasharray="2 2" />
              {/* Brainstem outline */}
              <ellipse cx="180" cy="245" rx="22" ry="45" />
              {/* Optic chiasm */}
              <path d="M160,140 L180,148 L200,140" strokeWidth="1.5" />
              <text x="180" y="138" fontSize="5" textAnchor="middle" fill="hsl(var(--muted-foreground))">Optic chiasm</text>
            </g>

            {/* Vessel paths */}
            {vesselOrder.map((key) => {
              const v = vessels[key];
              const isActive = selected === key;
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
                        opacity={isActive ? 1 : 0.45}
                        className="transition-all duration-200"
                      />
                      {/* Hit area */}
                      <path d={p} fill="none" stroke="transparent" strokeWidth="14" />
                    </g>
                  ))}
                </g>
              );
            })}

            {/* Basilar tip bifurcation circle */}
            <circle cx="180" cy="210" r="3" fill="hsl(220, 55%, 50%)" opacity="0.5" />

            {/* Aneurysm markers */}
            {showAneurysms && aneurysmSites.map((site, i) => (
              <g key={i} className="cursor-pointer" onClick={() => setSelected(site.vessel)}>
                <circle cx={site.x} cy={site.y} r="4" fill="none" stroke="hsl(45, 80%, 50%)" strokeWidth="1.5" opacity={selected === site.vessel ? 0.9 : 0.4} />
                <circle cx={site.x} cy={site.y} r="1.5" fill="hsl(45, 80%, 50%)" opacity={selected === site.vessel ? 0.9 : 0.4} />
              </g>
            ))}

            {/* Abbreviated vessel labels */}
            {vesselOrder.map((key) => {
              const v = vessels[key];
              const isActive = selected === key;
              const shortLabel = v.label
                .replace("L ", "L ")
                .replace("R ", "R ")
                .replace(" Internal Carotid", " ICA")
                .replace(" Anterior Cerebral (A1→A2)", " ACA")
                .replace("Anterior Communicating", "AComm")
                .replace(" Middle Cerebral", " MCA")
                .replace(" Posterior Communicating", " PComm")
                .replace(" Posterior Cerebral", " PCA")
                .replace("Basilar Artery", "Basilar")
                .replace(" Vertebral", " Vert");
              return (
                <text
                  key={key + "-label"}
                  x={v.labelPos.x}
                  y={v.labelPos.y}
                  fontSize="6.5"
                  fill={isActive ? v.color : "hsl(var(--muted-foreground))"}
                  fontWeight={isActive ? "bold" : "normal"}
                  textAnchor={v.labelAnchor || "middle"}
                  className="cursor-pointer select-none"
                  onClick={() => setSelected(key)}
                  opacity={isActive ? 1 : 0.65}
                >
                  {shortLabel}
                </text>
              );
            })}
          </svg>

          <button
            onClick={() => setShowAneurysms(!showAneurysms)}
            className="mt-1 text-xs px-2 py-1 rounded border border-border text-muted-foreground hover:text-foreground transition-colors"
          >
            {showAneurysms ? "Hide" : "Show"} aneurysm sites
          </button>
        </div>

        {/* Info panel */}
        <div className="flex-1 min-w-0">
          <div className="p-4 rounded-lg border border-border animate-fade-in" key={selected}>
            <p className="font-bold text-sm" style={{ color: info.color }}>{info.label}</p>
            <p className="text-sm text-muted-foreground mt-1">{info.detail}</p>
            <p className="text-xs text-muted-foreground mt-2">
              <strong className="text-foreground">Territory:</strong> {info.territory}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircleOfWillisDiagram;
