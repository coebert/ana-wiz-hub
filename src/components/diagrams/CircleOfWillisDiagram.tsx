import { useState } from "react";

type VesselKey = "ica-l" | "ica-r" | "aca-l" | "aca-r" | "acomm" | "mca-l" | "mca-r" | "pcomm-l" | "pcomm-r" | "pca-l" | "pca-r" | "basilar" | "vert-l" | "vert-r";

interface Vessel {
  label: string;
  color: string;
  detail: string;
  territory: string;
  pathD: string;
  labelPos: { x: number; y: number };
}

const vessels: Record<VesselKey, Vessel> = {
  "ica-l": {
    label: "L Internal Carotid",
    color: "hsl(0, 65%, 55%)",
    detail: "Enters skull via carotid canal. Gives ophthalmic artery. Terminates as ACA + MCA.",
    territory: "Anterior 2/3 of cerebral hemisphere (via ACA + MCA)",
    pathD: "M145,220 Q145,200 145,175 Q145,155 150,145",
    labelPos: { x: 110, y: 220 },
  },
  "ica-r": {
    label: "R Internal Carotid",
    color: "hsl(0, 65%, 55%)",
    detail: "Mirror of left ICA. Enters via right carotid canal. Same branching pattern.",
    territory: "Right anterior 2/3 of hemisphere",
    pathD: "M215,220 Q215,200 215,175 Q215,155 210,145",
    labelPos: { x: 240, y: 220 },
  },
  "aca-l": {
    label: "L Anterior Cerebral",
    color: "hsl(20, 70%, 52%)",
    detail: "From ICA terminal bifurcation. Runs anteriorly in interhemispheric fissure. Supplies medial frontal and parietal lobes.",
    territory: "Medial surface — leg motor/sensory cortex. Occlusion → contralateral leg weakness.",
    pathD: "M150,145 Q155,130 165,120 Q175,110 180,105",
    labelPos: { x: 120, y: 118 },
  },
  "aca-r": {
    label: "R Anterior Cerebral",
    color: "hsl(20, 70%, 52%)",
    detail: "Mirror of left ACA. Connected to left ACA by anterior communicating artery.",
    territory: "Right medial surface — right leg motor/sensory cortex",
    pathD: "M210,145 Q205,130 195,120 Q185,110 180,105",
    labelPos: { x: 230, y: 118 },
  },
  "acomm": {
    label: "Anterior Communicating",
    color: "hsl(45, 75%, 50%)",
    detail: "Connects L and R ACA. MOST COMMON site of intracranial aneurysm (~30%). Rupture → SAH with blood in interhemispheric fissure.",
    territory: "No direct territory — collateral pathway between anterior circulations",
    pathD: "M168,115 L192,115",
    labelPos: { x: 180, y: 95 },
  },
  "mca-l": {
    label: "L Middle Cerebral",
    color: "hsl(350, 60%, 52%)",
    detail: "Largest branch of ICA. Runs laterally in Sylvian fissure. Most commonly affected in ischaemic stroke.",
    territory: "Lateral surface — face/arm motor cortex, Broca's & Wernicke's areas (dominant). Occlusion → contralateral hemiplegia (face+arm > leg), aphasia if dominant.",
    pathD: "M150,145 Q130,140 110,135 Q90,130 75,125",
    labelPos: { x: 55, y: 140 },
  },
  "mca-r": {
    label: "R Middle Cerebral",
    color: "hsl(350, 60%, 52%)",
    detail: "Mirror of left MCA. Supplies right lateral hemisphere. Non-dominant → neglect syndromes.",
    territory: "Right lateral surface — face/arm motor cortex. Occlusion → left hemiplegia, left neglect.",
    pathD: "M210,145 Q230,140 250,135 Q270,130 285,125",
    labelPos: { x: 290, y: 140 },
  },
  "pcomm-l": {
    label: "L Posterior Communicating",
    color: "hsl(45, 75%, 50%)",
    detail: "Connects ICA to PCA. 2nd most common aneurysm site. Aneurysm compresses CN III → ipsilateral dilated pupil, ptosis.",
    territory: "No direct territory — collateral between anterior and posterior circulations",
    pathD: "M148,155 Q150,165 155,170",
    labelPos: { x: 108, y: 168 },
  },
  "pcomm-r": {
    label: "R Posterior Communicating",
    color: "hsl(45, 75%, 50%)",
    detail: "Mirror of left PComm. Same aneurysm risk and CN III compression.",
    territory: "Collateral pathway",
    pathD: "M212,155 Q210,165 205,170",
    labelPos: { x: 240, y: 168 },
  },
  "pca-l": {
    label: "L Posterior Cerebral",
    color: "hsl(240, 50%, 55%)",
    detail: "Terminal branch of basilar. Supplies occipital lobe, inferior temporal lobe, thalamus (perforators).",
    territory: "Visual cortex. Occlusion → contralateral homonymous hemianopia with macular sparing.",
    pathD: "M155,175 Q140,180 120,182 Q100,184 85,183",
    labelPos: { x: 60, y: 192 },
  },
  "pca-r": {
    label: "R Posterior Cerebral",
    color: "hsl(240, 50%, 55%)",
    detail: "Mirror of left PCA. Supplies right occipital and inferior temporal lobes.",
    territory: "Right visual cortex — left homonymous hemianopia if occluded",
    pathD: "M205,175 Q220,180 240,182 Q260,184 275,183",
    labelPos: { x: 280, y: 192 },
  },
  "basilar": {
    label: "Basilar Artery",
    color: "hsl(220, 55%, 50%)",
    detail: "Formed by union of vertebral arteries at pontomedullary junction. Gives pontine, AICA, and SCA branches. Terminates as bilateral PCAs.",
    territory: "Pons, cerebellum. Occlusion → 'locked-in syndrome', cerebellar infarction.",
    pathD: "M180,220 L180,180",
    labelPos: { x: 180, y: 240 },
  },
  "vert-l": {
    label: "L Vertebral",
    color: "hsl(220, 50%, 48%)",
    detail: "From subclavian artery. Ascends through C6–C1 transverse foramina. Enters skull via foramen magnum. Gives PICA.",
    territory: "PICA → lateral medulla (Wallenberg syndrome if occluded), inferior cerebellum",
    pathD: "M160,260 Q165,245 170,235 Q175,225 180,220",
    labelPos: { x: 125, y: 260 },
  },
  "vert-r": {
    label: "R Vertebral",
    color: "hsl(220, 50%, 48%)",
    detail: "Mirror of left vertebral. Usually smaller than left. Joins left vertebral to form basilar.",
    territory: "Right PICA territory",
    pathD: "M200,260 Q195,245 190,235 Q185,225 180,220",
    labelPos: { x: 220, y: 260 },
  },
};

const vesselOrder: VesselKey[] = ["ica-l", "ica-r", "aca-l", "aca-r", "acomm", "mca-l", "mca-r", "pcomm-l", "pcomm-r", "pca-l", "pca-r", "basilar", "vert-l", "vert-r"];

const CircleOfWillisDiagram = () => {
  const [selected, setSelected] = useState<VesselKey>("acomm");
  const info = vessels[selected];

  return (
    <div className="border border-border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">Circle of Willis — Interactive</h3>
      <p className="text-xs text-muted-foreground mb-3">Tap any vessel to see its territory and clinical significance</p>

      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="flex-shrink-0 mx-auto">
          <svg viewBox="40 80 280 200" width="280" height="200" className="border border-border rounded">
            {/* Brain outline */}
            <ellipse cx="180" cy="160" rx="130" ry="90" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" opacity="0.2" />

            {/* Vessels */}
            {vesselOrder.map((key) => {
              const v = vessels[key];
              const isActive = selected === key;
              return (
                <g key={key} className="cursor-pointer" onClick={() => setSelected(key)}>
                  <path
                    d={v.pathD}
                    fill="none"
                    stroke={v.color}
                    strokeWidth={isActive ? 4 : 2.5}
                    strokeLinecap="round"
                    opacity={isActive ? 1 : 0.5}
                    className="transition-all duration-200"
                  />
                  {/* Clickable hit area */}
                  <path
                    d={v.pathD}
                    fill="none"
                    stroke="transparent"
                    strokeWidth="12"
                  />
                </g>
              );
            })}

            {/* Labels */}
            {vesselOrder.map((key) => {
              const v = vessels[key];
              const isActive = selected === key;
              // Only show labels for main vessels to avoid clutter
              const showLabel = !key.includes("pcomm") || isActive;
              if (!showLabel) return null;
              return (
                <text
                  key={key + "-label"}
                  x={v.labelPos.x}
                  y={v.labelPos.y}
                  fontSize="6.5"
                  fill={isActive ? v.color : "hsl(var(--muted-foreground))"}
                  fontWeight={isActive ? "bold" : "normal"}
                  textAnchor="middle"
                  className="cursor-pointer select-none"
                  onClick={() => setSelected(key)}
                >
                  {v.label.replace("L ", "").replace("R ", "").replace(" Communicating", " Comm.").replace(" Cerebral", "").replace(" Internal Carotid", "ICA").replace(" Artery", "")}
                </text>
              );
            })}

            {/* Aneurysm markers */}
            <circle cx="180" cy="115" r="3" fill="hsl(45, 75%, 50%)" opacity={selected === "acomm" ? 0.8 : 0.3} className="cursor-pointer" onClick={() => setSelected("acomm")}>
              <title>Most common aneurysm site</title>
            </circle>
          </svg>
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
