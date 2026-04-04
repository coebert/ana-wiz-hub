import { useState } from "react";

type LayerKey = "skin" | "subcut" | "supraspinous" | "interspinous" | "flavum" | "epidural" | "dura" | "arachnoid" | "subarachnoid" | "pia" | "cord";

interface LayerInfo {
  label: string;
  h: number;
  color: string;
  detail: string;
  clinicalNote: string;
}

const layers: Record<LayerKey, LayerInfo> = {
  skin: { label: "Skin", h: 14, color: "hsl(30, 50%, 65%)", detail: "Epidermis and dermis. Local anaesthetic infiltration provides skin analgesia for needle insertion.", clinicalNote: "Infiltrate with 1% lidocaine before epidural/spinal needle." },
  subcut: { label: "Subcutaneous Fat", h: 18, color: "hsl(40, 55%, 72%)", detail: "Variable thickness (1–8 cm). Depth to epidural space correlates with BMI. Thicker in obese patients.", clinicalNote: "In morbid obesity, distance to epidural may exceed standard 8 cm Tuohy needle." },
  supraspinous: { label: "Supraspinous Ligament", h: 12, color: "hsl(210, 30%, 60%)", detail: "Connects tips of spinous processes. Strong midline structure. First significant resistance in midline approach.", clinicalNote: "Dense fibrous tissue — provides initial resistance to needle." },
  interspinous: { label: "Interspinous Ligament", h: 20, color: "hsl(200, 35%, 55%)", detail: "Connects adjacent spinous processes. Fibres posterosuperior to anteroinferior. Less well-defined than supraspinous.", clinicalNote: "Gritty feel during advancement. Off-midline may miss this structure." },
  flavum: { label: "Ligamentum Flavum", h: 18, color: "hsl(55, 60%, 55%)", detail: "Paired elastic ligaments connecting adjacent laminae. 3–5 mm thick at lumbar level. Dense elastic tissue provides characteristic resistance.", clinicalNote: "'Loss of resistance' target for epidural. Thickest in midline. May be calcified in elderly." },
  epidural: { label: "Epidural Space", h: 22, color: "hsl(140, 45%, 50%)", detail: "Potential space with fat, lymphatics, internal vertebral venous plexus (Batson's), spinal nerve roots. Widest posteriorly at L2 (5–6 mm).", clinicalNote: "Target for epidural anaesthesia. Negative pressure thoracically (hanging drop). Segmental arteries — haematoma risk with anticoagulants." },
  dura: { label: "Dura Mater", h: 10, color: "hsl(270, 40%, 55%)", detail: "Tough outer meningeal layer. Continuous with cranial dura. Dural sac ends at S2 in adults.", clinicalNote: "Puncture → CSF flow. Accidental dural puncture with Tuohy → PDPH. Pencil-point needles part fibres → less PDPH." },
  arachnoid: { label: "Arachnoid Mater", h: 6, color: "hsl(290, 35%, 60%)", detail: "Thin, avascular membrane adherent to inner dura. Subdural space is potential (subdural block if catheter placed here).", clinicalNote: "Subdural block: unexpectedly high, patchy — catheter between dura and arachnoid." },
  subarachnoid: { label: "Subarachnoid Space (CSF)", h: 24, color: "hsl(195, 60%, 55%)", detail: "Contains CSF (~75 ml in spinal canal), nerve roots, blood vessels. Cauda equina floats below L1/2.", clinicalNote: "Spinal anaesthesia target. Hyperbaric bupivacaine sinks — position determines spread. Baricity and volume determine block height." },
  pia: { label: "Pia Mater", h: 6, color: "hsl(320, 40%, 55%)", detail: "Innermost meningeal layer, adherent to cord surface. Highly vascular. Filum terminale extends from conus to sacrum.", clinicalNote: "Dentate ligaments (pia → arachnoid → dura) suspend the cord laterally." },
  cord: { label: "Spinal Cord", h: 34, color: "hsl(0, 0%, 70%)", detail: "Grey matter (H-shaped — cell bodies) surrounded by white matter (tracts). Anterior horn: motor. Posterior horn: sensory.", clinicalNote: "Anterior spinal artery: anterior 2/3 (motor, pain, temperature). Posterior spinal arteries: posterior 1/3 (proprioception, vibration). Cord ends L1/2 in adults." },
};

const layerOrder: LayerKey[] = ["skin", "subcut", "supraspinous", "interspinous", "flavum", "epidural", "dura", "arachnoid", "subarachnoid", "pia", "cord"];

const SpinalCordCrossSectionDiagram = () => {
  const [selected, setSelected] = useState<LayerKey>("epidural");
  const info = layers[selected];

  const svgWidth = 290;
  const layerWidth = 180;
  const xOffset = (svgWidth - layerWidth) / 2;

  // Calculate cumulative y positions
  const yPositions: Record<LayerKey, number> = {} as any;
  let cumY = 8;
  for (const key of layerOrder) {
    yPositions[key] = cumY;
    cumY += layers[key].h;
  }
  const totalH = cumY + 10;

  return (
    <div className="border border-border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">Spinal Cord Layers — Neuraxial Cross-Section</h3>
      <p className="text-xs text-muted-foreground mb-3">Tap a layer to see clinical relevance for epidural and spinal anaesthesia</p>

      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="flex-shrink-0 mx-auto">
          <svg viewBox={`0 0 ${svgWidth} ${totalH}`} width="290" height={totalH}>
            {/* Spinous process outlines */}
            <g opacity="0.15" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="1">
              <path d={`M${xOffset - 10},${yPositions.supraspinous} L${xOffset - 25},${yPositions.supraspinous + 6} L${xOffset - 10},${yPositions.flavum}`} />
              <path d={`M${xOffset + layerWidth + 10},${yPositions.supraspinous} L${xOffset + layerWidth + 25},${yPositions.supraspinous + 6} L${xOffset + layerWidth + 10},${yPositions.flavum}`} />
            </g>

            {/* Epidural needle trajectory */}
            <path
              d={`M${xOffset - 20},0 C${xOffset - 10},${yPositions.epidural / 2} ${xOffset + 15},${yPositions.epidural - 10} ${xOffset + 22},${yPositions.epidural + layers.epidural.h / 2}`}
              stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.4" fill="none"
            />
            <text x={xOffset - 30} y={8} fontSize="6" fill="hsl(var(--muted-foreground))">Tuohy</text>

            {/* Spinal needle trajectory (longer, thinner) */}
            <path
              d={`M${xOffset - 12},2 C${xOffset},${yPositions.subarachnoid / 2} ${xOffset + 20},${yPositions.subarachnoid - 10} ${xOffset + 28},${yPositions.subarachnoid + layers.subarachnoid.h / 2}`}
              stroke="hsl(195, 60%, 55%)" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" fill="none"
            />

            {layerOrder.map((key) => {
              const l = layers[key];
              const y = yPositions[key];
              const isActive = selected === key;

              return (
                <g key={key} className="cursor-pointer" onClick={() => setSelected(key)}>
              {key === "cord" ? (
                    // Spinal cord with rounded shape and detailed grey/white matter
                    <g>
                      <rect
                        x={xOffset + 15}
                        y={y}
                        width={layerWidth - 30}
                        height={l.h}
                        rx={l.h / 2}
                        fill={l.color}
                        fillOpacity={isActive ? 0.55 : 0.2}
                        stroke={isActive ? l.color : "transparent"}
                        strokeWidth={isActive ? 2 : 0}
                        className="transition-all duration-200"
                      />
                      {/* White matter tract labels */}
                      <g opacity={isActive ? 0.5 : 0.15} fontSize="3.5" fill="hsl(var(--muted-foreground))">
                        {/* Dorsal columns */}
                        <text x={xOffset + layerWidth / 2} y={y + 6} textAnchor="middle">Dorsal columns</text>
                        <text x={xOffset + layerWidth / 2} y={y + 10} textAnchor="middle" fontSize="3">(proprioception, vibration)</text>
                        {/* Lateral corticospinal */}
                        <text x={xOffset + layerWidth / 2 - 42} y={y + l.h / 2 + 1} textAnchor="middle" fontSize="3">Lat CST</text>
                        <text x={xOffset + layerWidth / 2 + 42} y={y + l.h / 2 + 1} textAnchor="middle" fontSize="3">Lat CST</text>
                        {/* Spinothalamic */}
                        <text x={xOffset + layerWidth / 2 - 42} y={y + l.h / 2 + 8} textAnchor="middle" fontSize="3">STT</text>
                        <text x={xOffset + layerWidth / 2 + 42} y={y + l.h / 2 + 8} textAnchor="middle" fontSize="3">STT</text>
                        {/* Anterior area */}
                        <text x={xOffset + layerWidth / 2} y={y + l.h - 4} textAnchor="middle" fontSize="3">Ant CST</text>
                      </g>
                      {/* Grey matter butterfly/H shape — more detailed */}
                      <g opacity={isActive ? 0.6 : 0.22}>
                        {/* Central canal */}
                        <circle cx={xOffset + layerWidth / 2} cy={y + l.h / 2} r="2" fill="hsl(200, 40%, 60%)" />
                        {/* Grey commissure */}
                        <line x1={xOffset + layerWidth / 2 - 5} y1={y + l.h / 2} x2={xOffset + layerWidth / 2 + 5} y2={y + l.h / 2} stroke="hsl(0, 0%, 55%)" strokeWidth="2" />
                        {/* Anterior horns (wider, motor — α/γ motor neurons) */}
                        <path d={`M${xOffset + layerWidth / 2 - 4},${y + l.h / 2 + 1} Q${xOffset + layerWidth / 2 - 15},${y + l.h / 2 + 3} ${xOffset + layerWidth / 2 - 28},${y + l.h / 2 + 10}`}
                          stroke="hsl(0, 0%, 50%)" strokeWidth="4" fill="none" strokeLinecap="round" />
                        <path d={`M${xOffset + layerWidth / 2 + 4},${y + l.h / 2 + 1} Q${xOffset + layerWidth / 2 + 15},${y + l.h / 2 + 3} ${xOffset + layerWidth / 2 + 28},${y + l.h / 2 + 10}`}
                          stroke="hsl(0, 0%, 50%)" strokeWidth="4" fill="none" strokeLinecap="round" />
                        {/* Posterior horns (thinner, sensory — substantia gelatinosa) */}
                        <path d={`M${xOffset + layerWidth / 2 - 4},${y + l.h / 2 - 1} Q${xOffset + layerWidth / 2 - 12},${y + l.h / 2 - 4} ${xOffset + layerWidth / 2 - 20},${y + l.h / 2 - 13}`}
                          stroke="hsl(0, 0%, 50%)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                        <path d={`M${xOffset + layerWidth / 2 + 4},${y + l.h / 2 - 1} Q${xOffset + layerWidth / 2 + 12},${y + l.h / 2 - 4} ${xOffset + layerWidth / 2 + 20},${y + l.h / 2 - 13}`}
                          stroke="hsl(0, 0%, 50%)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                        {/* Lateral horns (intermediolateral cell column — sympathetic T1-L2) */}
                        <path d={`M${xOffset + layerWidth / 2 - 6},${y + l.h / 2} L${xOffset + layerWidth / 2 - 18},${y + l.h / 2 - 3}`}
                          stroke="hsl(0, 0%, 50%)" strokeWidth="2" fill="none" strokeLinecap="round" />
                        <path d={`M${xOffset + layerWidth / 2 + 6},${y + l.h / 2} L${xOffset + layerWidth / 2 + 18},${y + l.h / 2 - 3}`}
                          stroke="hsl(0, 0%, 50%)" strokeWidth="2" fill="none" strokeLinecap="round" />
                        {/* Labels */}
                        <text x={xOffset + layerWidth / 2 - 34} y={y + l.h / 2 + 15} fontSize="3.5" fill="hsl(0, 0%, 45%)" textAnchor="middle">Ant horn (motor)</text>
                        <text x={xOffset + layerWidth / 2 + 34} y={y + l.h / 2 - 15} fontSize="3.5" fill="hsl(0, 0%, 45%)" textAnchor="middle">Post horn (sensory)</text>
                        <text x={xOffset + layerWidth / 2 - 24} y={y + l.h / 2 - 7} fontSize="3" fill="hsl(0, 0%, 50%)" textAnchor="middle">IML</text>
                      </g>
                      {/* Anterior spinal artery */}
                      <g opacity={isActive ? 0.5 : 0.15}>
                        <circle cx={xOffset + layerWidth / 2} cy={y + l.h + 2} r="1.5" fill="hsl(0, 60%, 55%)" />
                        <text x={xOffset + layerWidth / 2 + 5} y={y + l.h + 4} fontSize="3.5" fill="hsl(0, 60%, 55%)">ASA</text>
                      </g>
                    </g>
                  ) : (
                    <rect
                      x={xOffset}
                      y={y}
                      width={layerWidth}
                      height={l.h}
                      rx={2}
                      fill={l.color}
                      fillOpacity={isActive ? 0.55 : 0.2}
                      stroke={isActive ? l.color : "transparent"}
                      strokeWidth={isActive ? 2 : 0}
                      className="transition-all duration-200"
                    />
                  )}

                  {/* Ligament texture */}
                  {(key === "supraspinous" || key === "interspinous") && (
                    <g opacity={isActive ? 0.25 : 0.08}>
                      {Array.from({ length: Math.floor(layerWidth / 8) }).map((_, i) => (
                        <line key={i} x1={xOffset + 4 + i * 8} y1={y + 2} x2={xOffset + 4 + i * 8} y2={y + l.h - 2}
                          stroke={l.color} strokeWidth="0.5" />
                      ))}
                    </g>
                  )}

                  {/* Elastic fibres in flavum */}
                  {key === "flavum" && (
                    <g opacity={isActive ? 0.3 : 0.1}>
                      {Array.from({ length: 12 }).map((_, i) => (
                        <path key={i}
                          d={`M${xOffset + 10 + i * 14},${y + 3} Q${xOffset + 17 + i * 14},${y + l.h / 2} ${xOffset + 10 + i * 14},${y + l.h - 3}`}
                          stroke={l.color} strokeWidth="0.7" fill="none" />
                      ))}
                    </g>
                  )}

                  {/* CSF waves in subarachnoid */}
                  {key === "subarachnoid" && (
                    <g opacity={isActive ? 0.25 : 0.08}>
                      {[0, 1, 2].map(i => (
                        <path key={i}
                          d={`M${xOffset + 5},${y + 6 + i * 8} Q${xOffset + layerWidth / 4},${y + 3 + i * 8} ${xOffset + layerWidth / 2},${y + 6 + i * 8} Q${xOffset + 3 * layerWidth / 4},${y + 9 + i * 8} ${xOffset + layerWidth - 5},${y + 6 + i * 8}`}
                          stroke={l.color} strokeWidth="0.5" fill="none" />
                      ))}
                    </g>
                  )}

                  {/* Label */}
                  <text
                    x={xOffset + layerWidth + 6}
                    y={y + l.h / 2 + 3}
                    fontSize={l.h < 8 ? "5.5" : "6.5"}
                    fill={isActive ? l.color : "hsl(var(--muted-foreground))"}
                    fontWeight={isActive ? "bold" : "normal"}
                    className="select-none"
                  >
                    {l.label}
                  </text>
                </g>
              );
            })}

            {/* Needle tip markers */}
            <circle cx={xOffset + 22} cy={yPositions.epidural + layers.epidural.h / 2} r="3" fill="hsl(140, 45%, 50%)" opacity="0.6" />
            <circle cx={xOffset + 28} cy={yPositions.subarachnoid + layers.subarachnoid.h / 2} r="2.5" fill="hsl(195, 60%, 55%)" opacity="0.6" />

            {/* Needle labels */}
            <text x={xOffset - 8} y={yPositions.epidural + layers.epidural.h / 2 + 2} fontSize="5.5" fill="hsl(140, 45%, 50%)" textAnchor="end" fontWeight="bold">Epidural</text>
            <text x={xOffset - 8} y={yPositions.subarachnoid + layers.subarachnoid.h / 2 + 2} fontSize="5.5" fill="hsl(195, 60%, 55%)" textAnchor="end" fontWeight="bold">Spinal</text>
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
