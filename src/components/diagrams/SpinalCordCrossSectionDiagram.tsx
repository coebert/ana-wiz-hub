import { useState } from "react";

type LayerKey = "skin" | "subcut" | "supraspinous" | "interspinous" | "flavum" | "epidural" | "dura" | "arachnoid" | "subarachnoid" | "pia" | "cord";

interface LayerInfo {
  label: string;
  y: number;
  h: number;
  color: string;
  detail: string;
  clinicalNote: string;
}

const layers: Record<LayerKey, LayerInfo> = {
  skin: { label: "Skin", y: 0, h: 14, color: "hsl(30, 50%, 65%)", detail: "Epidermis and dermis. Local anaesthetic infiltration provides skin analgesia for needle insertion.", clinicalNote: "Infiltrate with 1% lidocaine before epidural/spinal needle." },
  subcut: { label: "Subcutaneous Fat", y: 14, h: 16, color: "hsl(40, 55%, 72%)", detail: "Variable thickness (1–8 cm). Depth to epidural space correlates with BMI. Thicker in obese patients.", clinicalNote: "In morbid obesity, distance to epidural may exceed standard needle length (8 cm Tuohy)." },
  supraspinous: { label: "Supraspinous Ligament", y: 30, h: 12, color: "hsl(210, 30%, 60%)", detail: "Connects tips of spinous processes. Strong midline structure. First significant resistance felt during midline approach.", clinicalNote: "Dense fibrous tissue — provides initial resistance to needle advancement." },
  interspinous: { label: "Interspinous Ligament", y: 42, h: 18, color: "hsl(200, 35%, 55%)", detail: "Connects adjacent spinous processes. Less well-defined than supraspinous. Fibres run posterosuperior to anteroinferior.", clinicalNote: "Gritty feel during needle advancement. Off-midline insertion may miss this structure." },
  flavum: { label: "Ligamentum Flavum", y: 60, h: 16, color: "hsl(55, 60%, 55%)", detail: "Paired elastic ligaments connecting adjacent laminae. 3–5 mm thick at lumbar level. Dense elastic tissue provides characteristic resistance.", clinicalNote: "'Loss of resistance' target for epidural. Thickest in midline (where paired ligaments fuse). May be calcified in elderly." },
  epidural: { label: "Epidural Space", y: 76, h: 20, color: "hsl(140, 45%, 50%)", detail: "Potential space containing fat, lymphatics, internal vertebral venous plexus (Batson's plexus), and spinal nerve roots. Widest posteriorly at L2 (5–6 mm).", clinicalNote: "Target for epidural anaesthesia. Negative pressure in thoracic region (hanging drop technique). Contains segmental arteries — haematoma risk with anticoagulants." },
  dura: { label: "Dura Mater", y: 96, h: 10, color: "hsl(270, 40%, 55%)", detail: "Tough outer meningeal layer. Continuous with cranial dura. Extends to S2 in adults. Dural sac ends at S2.", clinicalNote: "Puncture with spinal needle → CSF flow. Accidental dural puncture with Tuohy → post-dural puncture headache (PDPH). Pencil-point needles (Whitacre, Sprotte) part fibres rather than cutting → less PDPH." },
  arachnoid: { label: "Arachnoid Mater", y: 106, h: 6, color: "hsl(290, 35%, 60%)", detail: "Thin, avascular membrane closely adherent to the inner surface of dura. The subdural space is a potential space (subdural block if catheter placed here).", clinicalNote: "Subdural block: unexpectedly high block with patchy distribution — catheter tip between dura and arachnoid." },
  subarachnoid: { label: "Subarachnoid Space (CSF)", y: 112, h: 22, color: "hsl(195, 60%, 55%)", detail: "Contains CSF, spinal nerve roots, and blood vessels. CSF volume ~75 ml in spinal canal. Cauda equina floats in CSF below L1/2.", clinicalNote: "Target for spinal anaesthesia. Hyperbaric bupivacaine sinks in CSF (patient position determines spread). Baricity and volume determine block height." },
  pia: { label: "Pia Mater", y: 134, h: 6, color: "hsl(320, 40%, 55%)", detail: "Innermost meningeal layer, closely adherent to spinal cord surface. Highly vascular — carries blood vessels into cord substance.", clinicalNote: "Filum terminale is a pia extension from conus to sacrum. Dentate ligaments (pia → arachnoid → dura) suspend the cord." },
  cord: { label: "Spinal Cord", y: 140, h: 30, color: "hsl(0, 0%, 75%)", detail: "Grey matter (H-shaped centre — cell bodies) surrounded by white matter (ascending/descending tracts). Anterior horn: motor neurons. Posterior horn: sensory relay.", clinicalNote: "Anterior spinal artery supplies anterior 2/3 (motor, pain, temperature). Posterior spinal arteries supply posterior 1/3 (proprioception, vibration). Cord ends at L1/2 in adults." },
};

const layerOrder: LayerKey[] = ["skin", "subcut", "supraspinous", "interspinous", "flavum", "epidural", "dura", "arachnoid", "subarachnoid", "pia", "cord"];

const SpinalCordCrossSectionDiagram = () => {
  const [selected, setSelected] = useState<LayerKey>("epidural");
  const info = layers[selected];

  const svgWidth = 280;
  const layerWidth = 180;
  const xOffset = (svgWidth - layerWidth) / 2;
  const totalH = 170;

  return (
    <div className="border border-border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">Spinal Cord Layers — Neuraxial Cross-Section</h3>
      <p className="text-xs text-muted-foreground mb-3">Tap a layer to see its clinical relevance for epidural and spinal anaesthesia</p>

      <div className="flex flex-col sm:flex-row gap-4 items-start">
        {/* SVG cross-section */}
        <div className="flex-shrink-0 mx-auto">
          <svg viewBox={`0 0 ${svgWidth} ${totalH + 10}`} width="280" height={totalH + 10}>
            {/* Needle */}
            <line x1={xOffset - 15} y1={0} x2={xOffset + 20} y2={layers.epidural.y + layers.epidural.h / 2} stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.5" />
            <text x={xOffset - 28} y={8} fontSize="7" fill="hsl(var(--muted-foreground))" transform="rotate(-55, 25, 8)">Needle</text>

            {layerOrder.map((key) => {
              const l = layers[key];
              const isActive = selected === key;
              return (
                <g key={key} className="cursor-pointer" onClick={() => setSelected(key)}>
                  <rect
                    x={xOffset}
                    y={l.y}
                    width={layerWidth}
                    height={l.h}
                    rx={key === "cord" ? 8 : 2}
                    fill={l.color}
                    fillOpacity={isActive ? 0.6 : 0.25}
                    stroke={isActive ? l.color : "transparent"}
                    strokeWidth={isActive ? 2 : 0}
                    className="transition-all duration-200"
                  />
                  {/* Grey matter H-shape in cord */}
                  {key === "cord" && (
                    <g opacity={isActive ? 0.5 : 0.2}>
                      <path d={`M${xOffset + 70},${l.y + 6} L${xOffset + 70},${l.y + l.h - 6} M${xOffset + 110},${l.y + 6} L${xOffset + 110},${l.y + l.h - 6} M${xOffset + 70},${l.y + l.h / 2} L${xOffset + 110},${l.y + l.h / 2}`} stroke="hsl(0, 0%, 50%)" strokeWidth="3" fill="none" strokeLinecap="round" />
                    </g>
                  )}
                  {/* Label */}
                  <text
                    x={xOffset + layerWidth + 5}
                    y={l.y + l.h / 2 + 3}
                    fontSize="7"
                    fill={isActive ? l.color : "hsl(var(--muted-foreground))"}
                    fontWeight={isActive ? "bold" : "normal"}
                    className="select-none"
                  >
                    {l.label}
                  </text>
                </g>
              );
            })}

            {/* Epidural needle tip marker */}
            <circle cx={xOffset + 20} cy={layers.epidural.y + layers.epidural.h / 2} r="2.5" fill="hsl(140, 45%, 50%)" opacity="0.7" />

            {/* Spinal needle tip marker */}
            <circle cx={xOffset + 25} cy={layers.subarachnoid.y + layers.subarachnoid.h / 2} r="2.5" fill="hsl(195, 60%, 55%)" opacity="0.7" />

            {/* Annotations */}
            <text x={xOffset - 5} y={layers.epidural.y + layers.epidural.h / 2 + 2} fontSize="6" fill="hsl(140, 45%, 50%)" textAnchor="end" fontWeight="bold">Epidural</text>
            <text x={xOffset - 5} y={layers.subarachnoid.y + layers.subarachnoid.h / 2 + 2} fontSize="6" fill="hsl(195, 60%, 55%)" textAnchor="end" fontWeight="bold">Spinal</text>
          </svg>
        </div>

        {/* Info panel */}
        <div className="flex-1 min-w-0">
          <div className="p-4 rounded-lg border border-border animate-fade-in" key={selected}>
            <p className="font-bold text-sm" style={{ color: info.color }}>{info.label}</p>
            <p className="text-sm text-muted-foreground mt-1">{info.detail}</p>
            <p className="text-xs mt-2 p-2 rounded bg-secondary/50 text-foreground">
              <strong>Clinical:</strong> {info.clinicalNote}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpinalCordCrossSectionDiagram;
