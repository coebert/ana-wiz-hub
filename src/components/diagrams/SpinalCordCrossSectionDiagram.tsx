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
  skin: { label: "Skin", h: 16, color: "hsl(30, 50%, 65%)", detail: "Epidermis and dermis. Local anaesthetic infiltration provides skin analgesia for needle insertion.", clinicalNote: "Infiltrate with 1% lidocaine before epidural/spinal needle." },
  subcut: { label: "Subcutaneous Fat", h: 20, color: "hsl(40, 55%, 72%)", detail: "Variable thickness (1–8 cm). Depth to epidural space correlates with BMI. Thicker in obese patients.", clinicalNote: "In morbid obesity, distance to epidural may exceed standard 8 cm Tuohy needle." },
  supraspinous: { label: "Supraspinous Ligament", h: 14, color: "hsl(210, 30%, 60%)", detail: "Connects tips of spinous processes. Strong midline structure. First significant resistance in midline approach.", clinicalNote: "Dense fibrous tissue — provides initial resistance to needle." },
  interspinous: { label: "Interspinous Ligament", h: 22, color: "hsl(200, 35%, 55%)", detail: "Connects adjacent spinous processes. Fibres posterosuperior to anteroinferior. Less well-defined than supraspinous.", clinicalNote: "Gritty feel during advancement. Off-midline may miss this structure." },
  flavum: { label: "Ligamentum Flavum", h: 20, color: "hsl(55, 60%, 55%)", detail: "Paired elastic ligaments connecting adjacent laminae. 3–5 mm thick at lumbar level. Dense elastic tissue provides characteristic resistance.", clinicalNote: "'Loss of resistance' target for epidural. Thickest in midline. May be calcified in elderly." },
  epidural: { label: "Epidural Space", h: 24, color: "hsl(140, 45%, 50%)", detail: "Potential space with fat, lymphatics, internal vertebral venous plexus (Batson's), spinal nerve roots. Widest posteriorly at L2 (5–6 mm).", clinicalNote: "Target for epidural anaesthesia. Negative pressure thoracically (hanging drop). Segmental arteries — haematoma risk with anticoagulants." },
  dura: { label: "Dura Mater", h: 12, color: "hsl(270, 40%, 55%)", detail: "Tough outer meningeal layer. Continuous with cranial dura. Dural sac ends at S2 in adults.", clinicalNote: "Puncture → CSF flow. Accidental dural puncture with Tuohy → PDPH. Pencil-point needles part fibres → less PDPH." },
  arachnoid: { label: "Arachnoid Mater", h: 8, color: "hsl(290, 35%, 60%)", detail: "Thin, avascular membrane adherent to inner dura. Subdural space is potential (subdural block if catheter placed here).", clinicalNote: "Subdural block: unexpectedly high, patchy — catheter between dura and arachnoid." },
  subarachnoid: { label: "Subarachnoid Space (CSF)", h: 26, color: "hsl(195, 60%, 55%)", detail: "Contains CSF (~75 ml in spinal canal), nerve roots, blood vessels. Cauda equina floats below L1/2.", clinicalNote: "Spinal anaesthesia target. Hyperbaric bupivacaine sinks — position determines spread. Baricity and volume determine block height." },
  pia: { label: "Pia Mater", h: 8, color: "hsl(320, 40%, 55%)", detail: "Innermost meningeal layer, adherent to cord surface. Highly vascular. Filum terminale extends from conus to sacrum.", clinicalNote: "Dentate ligaments (pia → arachnoid → dura) suspend the cord laterally." },
  cord: { label: "Spinal Cord", h: 38, color: "hsl(0, 0%, 70%)", detail: "Grey matter (H-shaped — cell bodies) surrounded by white matter (tracts). Anterior horn: motor. Posterior horn: sensory.", clinicalNote: "Anterior spinal artery: anterior 2/3 (motor, pain, temperature). Posterior spinal arteries: posterior 1/3 (proprioception, vibration). Cord ends L1/2 in adults." },
};

const layerOrder: LayerKey[] = ["skin", "subcut", "supraspinous", "interspinous", "flavum", "epidural", "dura", "arachnoid", "subarachnoid", "pia", "cord"];

const SpinalCordCrossSectionDiagram = () => {
  const [selected, setSelected] = useState<LayerKey>("epidural");
  const info = layers[selected];

  const svgWidth = 310;
  const layerWidth = 195;
  const xOffset = 18;

  const yPositions: Record<LayerKey, number> = {} as any;
  let cumY = 10;
  for (const key of layerOrder) {
    yPositions[key] = cumY;
    cumY += layers[key].h;
  }
  const totalH = cumY + 14;

  return (
    <div className="border border-border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">Spinal Cord Layers — Neuraxial Cross-Section</h3>
      <p className="text-xs text-muted-foreground mb-3">Tap a layer to see clinical relevance for epidural and spinal anaesthesia</p>

      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="flex-shrink-0 mx-auto">
          <svg viewBox={`0 0 ${svgWidth} ${totalH}`} width="310" height={totalH}>
            <defs>
              {/* Skin texture */}
              <pattern id="sc-skinTex" patternUnits="userSpaceOnUse" width="5" height="5">
                <circle cx="2.5" cy="2.5" r="0.35" fill="hsl(30, 40%, 50%)" opacity="0.2" />
              </pattern>
              {/* Fat globules */}
              <pattern id="sc-fatTex" patternUnits="userSpaceOnUse" width="12" height="10">
                <ellipse cx="6" cy="5" rx="4" ry="3" fill="hsl(40, 50%, 70%)" opacity="0.25" stroke="hsl(38, 40%, 58%)" strokeWidth="0.3" />
              </pattern>
              {/* Ligament collagen fibres */}
              <pattern id="sc-collagen" patternUnits="userSpaceOnUse" width="4" height="14" patternTransform="rotate(10)">
                <line x1="2" y1="0" x2="2" y2="14" stroke="hsl(210, 25%, 55%)" strokeWidth="0.5" opacity="0.3" />
              </pattern>
              {/* Elastic fibres (flavum) */}
              <pattern id="sc-elastic" patternUnits="userSpaceOnUse" width="8" height="20">
                <path d="M4,0 Q6,5 4,10 Q2,15 4,20" fill="none" stroke="hsl(55, 50%, 48%)" strokeWidth="0.6" opacity="0.3" />
              </pattern>
              {/* CSF shimmer */}
              <linearGradient id="sc-csfGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(195, 60%, 55%)" stopOpacity="0.15" />
                <stop offset="50%" stopColor="hsl(195, 65%, 65%)" stopOpacity="0.25" />
                <stop offset="100%" stopColor="hsl(195, 60%, 55%)" stopOpacity="0.15" />
              </linearGradient>
              {/* Dura texture */}
              <pattern id="sc-duraTex" patternUnits="userSpaceOnUse" width="6" height="3">
                <line x1="0" y1="1.5" x2="6" y2="1.5" stroke="hsl(270, 35%, 50%)" strokeWidth="0.4" opacity="0.3" />
              </pattern>
              {/* Vessel glow */}
              <filter id="sc-glow">
                <feGaussianBlur stdDeviation="1.2" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* Spinous process outlines — more realistic bone shape */}
            <g opacity="0.2" fill="hsl(var(--muted-foreground))" fillOpacity="0.04" stroke="hsl(var(--muted-foreground))" strokeWidth="1">
              <path d={`M${xOffset - 8},${yPositions.supraspinous - 2} L${xOffset - 28},${yPositions.interspinous + 5} Q${xOffset - 30},${yPositions.flavum - 2} ${xOffset - 18},${yPositions.flavum + 2} L${xOffset - 5},${yPositions.flavum}`} />
              <path d={`M${xOffset + layerWidth + 8},${yPositions.supraspinous - 2} L${xOffset + layerWidth + 28},${yPositions.interspinous + 5} Q${xOffset + layerWidth + 30},${yPositions.flavum - 2} ${xOffset + layerWidth + 18},${yPositions.flavum + 2} L${xOffset + layerWidth + 5},${yPositions.flavum}`} />
              {/* Lamina hint */}
              <path d={`M${xOffset - 18},${yPositions.flavum + 2} C${xOffset - 22},${yPositions.epidural + 5} ${xOffset - 20},${yPositions.epidural + 12} ${xOffset - 12},${yPositions.dura}`} strokeDasharray="3 2" />
              <path d={`M${xOffset + layerWidth + 18},${yPositions.flavum + 2} C${xOffset + layerWidth + 22},${yPositions.epidural + 5} ${xOffset + layerWidth + 20},${yPositions.epidural + 12} ${xOffset + layerWidth + 12},${yPositions.dura}`} strokeDasharray="3 2" />
            </g>

            {/* Epidural needle trajectory — Tuohy */}
            <g opacity="0.45">
              <path
                d={`M${xOffset - 18},2 C${xOffset - 8},${yPositions.epidural / 2} ${xOffset + 18},${yPositions.epidural - 12} ${xOffset + 25},${yPositions.epidural + layers.epidural.h / 2}`}
                stroke="hsl(var(--muted-foreground))" strokeWidth="2" fill="none"
              />
              {/* Huber point bevel */}
              <circle cx={xOffset + 25} cy={yPositions.epidural + layers.epidural.h / 2} r="2.5" fill="hsl(140, 45%, 50%)" opacity="0.8" />
              <circle cx={xOffset + 25} cy={yPositions.epidural + layers.epidural.h / 2} r="5" fill="hsl(140, 45%, 50%)" opacity="0.12" />
              <text x={xOffset - 26} y={8} fontSize="5.5" fill="hsl(var(--muted-foreground))" fontWeight="600">Tuohy</text>
            </g>

            {/* Spinal needle trajectory */}
            <g opacity="0.3">
              <path
                d={`M${xOffset - 10},4 C${xOffset + 2},${yPositions.subarachnoid / 2} ${xOffset + 24},${yPositions.subarachnoid - 12} ${xOffset + 32},${yPositions.subarachnoid + layers.subarachnoid.h / 2}`}
                stroke="hsl(195, 60%, 55%)" strokeWidth="1.2" strokeDasharray="3 3" fill="none"
              />
              <circle cx={xOffset + 32} cy={yPositions.subarachnoid + layers.subarachnoid.h / 2} r="2" fill="hsl(195, 60%, 55%)" opacity="0.7" />
            </g>

            {layerOrder.map((key) => {
              const l = layers[key];
              const y = yPositions[key];
              const isActive = selected === key;

              return (
                <g key={key} className="cursor-pointer" onClick={() => setSelected(key)}>
                  {key === "cord" ? (
                    <g>
                      {/* White matter outer */}
                      <rect
                        x={xOffset + 20}
                        y={y}
                        width={layerWidth - 40}
                        height={l.h}
                        rx={l.h / 2}
                        fill={l.color}
                        fillOpacity={isActive ? 0.45 : 0.15}
                        stroke={isActive ? l.color : "hsl(var(--border))"}
                        strokeWidth={isActive ? 2 : 0.5}
                        className="transition-all duration-200"
                      />
                      {/* White matter myelin texture */}
                      <g opacity={isActive ? 0.15 : 0.05}>
                        {Array.from({ length: 8 }).map((_, i) => (
                          <circle key={i} cx={xOffset + 35 + i * 18} cy={y + l.h / 2 + (i % 2 ? 4 : -4)} r="2.5" fill="none" stroke="hsl(0, 0%, 60%)" strokeWidth="0.5" />
                        ))}
                      </g>

                      {/* White matter tract labels */}
                      <g opacity={isActive ? 0.5 : 0.12} fontSize="3.5" fill="hsl(var(--muted-foreground))">
                        <text x={xOffset + layerWidth / 2} y={y + 7} textAnchor="middle">Dorsal columns</text>
                        <text x={xOffset + layerWidth / 2} y={y + 11} textAnchor="middle" fontSize="3">(proprioception, vibration)</text>
                        <text x={xOffset + layerWidth / 2 - 48} y={y + l.h / 2 + 1} textAnchor="middle" fontSize="3">Lat CST</text>
                        <text x={xOffset + layerWidth / 2 + 48} y={y + l.h / 2 + 1} textAnchor="middle" fontSize="3">Lat CST</text>
                        <text x={xOffset + layerWidth / 2 - 48} y={y + l.h / 2 + 8} textAnchor="middle" fontSize="3">STT</text>
                        <text x={xOffset + layerWidth / 2 + 48} y={y + l.h / 2 + 8} textAnchor="middle" fontSize="3">STT</text>
                        <text x={xOffset + layerWidth / 2} y={y + l.h - 4} textAnchor="middle" fontSize="3">Ant CST</text>
                      </g>

                      {/* Grey matter butterfly — more organic shape */}
                      <g opacity={isActive ? 0.55 : 0.2}>
                        {/* Central canal */}
                        <circle cx={xOffset + layerWidth / 2} cy={y + l.h / 2} r="2.2" fill="hsl(200, 40%, 60%)" stroke="hsl(200, 30%, 50%)" strokeWidth="0.4" />
                        {/* Grey commissure */}
                        <line x1={xOffset + layerWidth / 2 - 6} y1={y + l.h / 2} x2={xOffset + layerWidth / 2 + 6} y2={y + l.h / 2} stroke="hsl(0, 0%, 52%)" strokeWidth="2.5" />
                        {/* Anterior horns — wider, with cell body suggestion */}
                        <path d={`M${xOffset + layerWidth / 2 - 5},${y + l.h / 2 + 1} Q${xOffset + layerWidth / 2 - 18},${y + l.h / 2 + 4} ${xOffset + layerWidth / 2 - 32},${y + l.h / 2 + 12}`}
                          stroke="hsl(0, 0%, 48%)" strokeWidth="5" fill="none" strokeLinecap="round" />
                        <path d={`M${xOffset + layerWidth / 2 + 5},${y + l.h / 2 + 1} Q${xOffset + layerWidth / 2 + 18},${y + l.h / 2 + 4} ${xOffset + layerWidth / 2 + 32},${y + l.h / 2 + 12}`}
                          stroke="hsl(0, 0%, 48%)" strokeWidth="5" fill="none" strokeLinecap="round" />
                        {/* Motor neuron cell bodies */}
                        {[-28, -22, 22, 28].map((dx, i) => (
                          <circle key={i} cx={xOffset + layerWidth / 2 + dx} cy={y + l.h / 2 + 9 + (i % 2) * 3} r="1.2" fill="hsl(0, 0%, 42%)" opacity="0.5" />
                        ))}
                        {/* Posterior horns — thinner, sensory */}
                        <path d={`M${xOffset + layerWidth / 2 - 5},${y + l.h / 2 - 1} Q${xOffset + layerWidth / 2 - 14},${y + l.h / 2 - 5} ${xOffset + layerWidth / 2 - 24},${y + l.h / 2 - 14}`}
                          stroke="hsl(0, 0%, 48%)" strokeWidth="3" fill="none" strokeLinecap="round" />
                        <path d={`M${xOffset + layerWidth / 2 + 5},${y + l.h / 2 - 1} Q${xOffset + layerWidth / 2 + 14},${y + l.h / 2 - 5} ${xOffset + layerWidth / 2 + 24},${y + l.h / 2 - 14}`}
                          stroke="hsl(0, 0%, 48%)" strokeWidth="3" fill="none" strokeLinecap="round" />
                        {/* Substantia gelatinosa cap */}
                        {[-24, 24].map((dx, i) => (
                          <ellipse key={i} cx={xOffset + layerWidth / 2 + dx} cy={y + l.h / 2 - 15} rx="3" ry="2" fill="hsl(45, 40%, 55%)" opacity="0.35" />
                        ))}
                        {/* Lateral horns (IML) */}
                        <path d={`M${xOffset + layerWidth / 2 - 7},${y + l.h / 2} L${xOffset + layerWidth / 2 - 20},${y + l.h / 2 - 4}`}
                          stroke="hsl(0, 0%, 48%)" strokeWidth="2.2" fill="none" strokeLinecap="round" />
                        <path d={`M${xOffset + layerWidth / 2 + 7},${y + l.h / 2} L${xOffset + layerWidth / 2 + 20},${y + l.h / 2 - 4}`}
                          stroke="hsl(0, 0%, 48%)" strokeWidth="2.2" fill="none" strokeLinecap="round" />
                        {/* Labels */}
                        <text x={xOffset + layerWidth / 2 - 38} y={y + l.h / 2 + 17} fontSize="3.5" fill="hsl(0, 0%, 42%)" textAnchor="middle">Ant horn</text>
                        <text x={xOffset + layerWidth / 2 - 38} y={y + l.h / 2 + 21} fontSize="3" fill="hsl(0, 0%, 48%)" textAnchor="middle">(motor)</text>
                        <text x={xOffset + layerWidth / 2 + 38} y={y + l.h / 2 - 17} fontSize="3.5" fill="hsl(0, 0%, 42%)" textAnchor="middle">Post horn</text>
                        <text x={xOffset + layerWidth / 2 + 38} y={y + l.h / 2 - 13} fontSize="3" fill="hsl(0, 0%, 48%)" textAnchor="middle">(sensory)</text>
                        <text x={xOffset + layerWidth / 2 - 26} y={y + l.h / 2 - 7} fontSize="3" fill="hsl(0, 0%, 48%)" textAnchor="middle">IML</text>
                      </g>

                      {/* Blood supply */}
                      <g opacity={isActive ? 0.55 : 0.15}>
                        {/* Anterior spinal artery */}
                        <circle cx={xOffset + layerWidth / 2} cy={y + l.h + 3} r="2" fill="hsl(0, 60%, 55%)" stroke="hsl(0, 50%, 45%)" strokeWidth="0.5" />
                        <text x={xOffset + layerWidth / 2 + 6} y={y + l.h + 5} fontSize="4" fill="hsl(0, 60%, 55%)" fontWeight="bold">ASA</text>
                        {/* Posterior spinal arteries */}
                        <circle cx={xOffset + layerWidth / 2 - 40} cy={y - 2} r="1.5" fill="hsl(0, 50%, 50%)" />
                        <circle cx={xOffset + layerWidth / 2 + 40} cy={y - 2} r="1.5" fill="hsl(0, 50%, 50%)" />
                        <text x={xOffset + layerWidth / 2 - 50} y={y} fontSize="3.5" fill="hsl(0, 50%, 50%)" textAnchor="end">PSA</text>
                        <text x={xOffset + layerWidth / 2 + 50} y={y} fontSize="3.5" fill="hsl(0, 50%, 50%)">PSA</text>
                      </g>

                      {/* Ventral and dorsal roots */}
                      <g opacity={isActive ? 0.4 : 0.1}>
                        {/* Dorsal root + DRG */}
                        <path d={`M${xOffset + layerWidth / 2 - 24},${y + l.h / 2 - 14} C${xOffset + layerWidth / 2 - 40},${y + l.h / 2 - 18} ${xOffset + layerWidth / 2 - 55},${y + l.h / 2 - 14} ${xOffset + layerWidth / 2 - 60},${y + l.h / 2 - 8}`}
                          stroke="hsl(45, 55%, 50%)" strokeWidth="1.2" fill="none" />
                        {/* DRG */}
                        <ellipse cx={xOffset + layerWidth / 2 - 60} cy={y + l.h / 2 - 8} rx="4" ry="2.5" fill="hsl(45, 55%, 50%)" opacity="0.4" stroke="hsl(45, 45%, 42%)" strokeWidth="0.5" />
                        <text x={xOffset + layerWidth / 2 - 68} y={y + l.h / 2 - 5} fontSize="3" fill="hsl(45, 55%, 50%)">DRG</text>
                        {/* Ventral root */}
                        <path d={`M${xOffset + layerWidth / 2 - 32},${y + l.h / 2 + 12} C${xOffset + layerWidth / 2 - 45},${y + l.h / 2 + 14} ${xOffset + layerWidth / 2 - 55},${y + l.h / 2 + 8} ${xOffset + layerWidth / 2 - 60},${y + l.h / 2 + 2}`}
                          stroke="hsl(150, 45%, 48%)" strokeWidth="1" fill="none" />
                      </g>
                    </g>
                  ) : (
                    <g>
                      {/* Base rect */}
                      <rect
                        x={xOffset}
                        y={y}
                        width={layerWidth}
                        height={l.h}
                        rx={key === "skin" ? 3 : 1}
                        fill={l.color}
                        fillOpacity={isActive ? 0.5 : 0.18}
                        stroke={isActive ? l.color : "transparent"}
                        strokeWidth={isActive ? 2 : 0}
                        className="transition-all duration-200"
                      />

                      {/* Skin texture */}
                      {key === "skin" && (
                        <rect x={xOffset} y={y} width={layerWidth} height={l.h} rx={3} fill="url(#sc-skinTex)" />
                      )}

                      {/* Subcutaneous fat globules */}
                      {key === "subcut" && (
                        <rect x={xOffset} y={y} width={layerWidth} height={l.h} fill="url(#sc-fatTex)" opacity={isActive ? 0.7 : 0.3} />
                      )}

                      {/* Ligament collagen fibres */}
                      {(key === "supraspinous" || key === "interspinous") && (
                        <g>
                          <rect x={xOffset} y={y} width={layerWidth} height={l.h} fill="url(#sc-collagen)" opacity={isActive ? 0.8 : 0.3} />
                          {/* Collagen crimp pattern */}
                          <g opacity={isActive ? 0.2 : 0.06}>
                            {Array.from({ length: Math.floor(layerWidth / 12) }).map((_, i) => (
                              <path key={i}
                                d={`M${xOffset + 6 + i * 12},${y + 2} Q${xOffset + 12 + i * 12},${y + l.h / 2} ${xOffset + 6 + i * 12},${y + l.h - 2}`}
                                stroke={l.color} strokeWidth="0.6" fill="none" />
                            ))}
                          </g>
                        </g>
                      )}

                      {/* Elastic fibres in flavum */}
                      {key === "flavum" && (
                        <g>
                          <rect x={xOffset} y={y} width={layerWidth} height={l.h} fill="url(#sc-elastic)" opacity={isActive ? 0.8 : 0.3} />
                          {/* Dense elastic fibre bundles */}
                          <g opacity={isActive ? 0.3 : 0.08}>
                            {Array.from({ length: 16 }).map((_, i) => (
                              <path key={i}
                                d={`M${xOffset + 8 + i * 12},${y + 2} Q${xOffset + 14 + i * 12},${y + l.h / 2} ${xOffset + 8 + i * 12},${y + l.h - 2}`}
                                stroke={l.color} strokeWidth="0.8" fill="none" />
                            ))}
                          </g>
                          {/* LOR annotation */}
                          <g opacity={isActive ? 0.6 : 0}>
                            <text x={xOffset + layerWidth / 2} y={y + l.h + 5} fontSize="3.5" textAnchor="middle" fill="hsl(55, 60%, 55%)" fontStyle="italic">← Loss of Resistance →</text>
                          </g>
                        </g>
                      )}

                      {/* Epidural space contents */}
                      {key === "epidural" && (
                        <g>
                          {/* Epidural fat */}
                          <g opacity={isActive ? 0.35 : 0.1}>
                            {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
                              <ellipse key={i} cx={xOffset + 15 + i * 24} cy={y + l.h / 2 + (i % 2 ? 3 : -2)} rx="8" ry="4" fill="hsl(45, 50%, 65%)" opacity="0.3" />
                            ))}
                          </g>
                          {/* Epidural veins (Batson's plexus) */}
                          <g opacity={isActive ? 0.4 : 0.1}>
                            <path d={`M${xOffset + 20},${y + l.h - 3} C${xOffset + 40},${y + l.h - 6} ${xOffset + 60},${y + l.h - 8} ${xOffset + 85},${y + l.h - 5}`}
                              stroke="hsl(220, 50%, 52%)" strokeWidth="1.2" fill="none" />
                            <path d={`M${xOffset + 100},${y + l.h - 4} C${xOffset + 130},${y + l.h - 7} ${xOffset + 150},${y + l.h - 5} ${xOffset + 170},${y + l.h - 6}`}
                              stroke="hsl(220, 50%, 52%)" strokeWidth="0.8" fill="none" />
                            <text x={xOffset + layerWidth - 20} y={y + l.h - 1} fontSize="3" fill="hsl(220, 50%, 52%)" textAnchor="end">Batson's plexus</text>
                          </g>
                          {/* Nerve root traversing */}
                          <g opacity={isActive ? 0.35 : 0.08}>
                            <path d={`M${xOffset + 50},${y + 2} C${xOffset + 45},${y + l.h / 2} ${xOffset + 40},${y + l.h - 2} ${xOffset + 35},${y + l.h + 5}`}
                              stroke="hsl(50, 60%, 55%)" strokeWidth="1" fill="none" />
                          </g>
                        </g>
                      )}

                      {/* Dura mater: dense fibrous */}
                      {key === "dura" && (
                        <rect x={xOffset} y={y} width={layerWidth} height={l.h} fill="url(#sc-duraTex)" opacity={isActive ? 0.8 : 0.3} />
                      )}

                      {/* Arachnoid: delicate web */}
                      {key === "arachnoid" && (
                        <g opacity={isActive ? 0.3 : 0.1}>
                          {Array.from({ length: 10 }).map((_, i) => (
                            <path key={i}
                              d={`M${xOffset + 5 + i * 20},${y + 1} Q${xOffset + 15 + i * 20},${y + l.h / 2} ${xOffset + 5 + i * 20},${y + l.h - 1}`}
                              stroke="hsl(290, 30%, 58%)" strokeWidth="0.3" fill="none" />
                          ))}
                        </g>
                      )}

                      {/* CSF in subarachnoid */}
                      {key === "subarachnoid" && (
                        <g>
                          <rect x={xOffset} y={y} width={layerWidth} height={l.h} fill="url(#sc-csfGrad)" />
                          {/* CSF flow waves */}
                          <g opacity={isActive ? 0.3 : 0.08}>
                            {[0, 1, 2, 3].map(i => (
                              <path key={i}
                                d={`M${xOffset + 5},${y + 5 + i * 6} Q${xOffset + layerWidth / 4},${y + 3 + i * 6} ${xOffset + layerWidth / 2},${y + 5 + i * 6} Q${xOffset + 3 * layerWidth / 4},${y + 7 + i * 6} ${xOffset + layerWidth - 5},${y + 5 + i * 6}`}
                                stroke="hsl(195, 55%, 60%)" strokeWidth="0.4" fill="none" />
                            ))}
                          </g>
                          {/* Cauda equina filaments */}
                          <g opacity={isActive ? 0.25 : 0.06}>
                            {[0, 1, 2, 3, 4].map(i => (
                              <line key={i} x1={xOffset + 60 + i * 18} y1={y + 3} x2={xOffset + 55 + i * 18} y2={y + l.h - 3}
                                stroke="hsl(50, 50%, 55%)" strokeWidth="0.5" />
                            ))}
                            <text x={xOffset + layerWidth / 2} y={y + l.h - 2} fontSize="3" textAnchor="middle" fill="hsl(50, 50%, 55%)" fontStyle="italic">cauda equina</text>
                          </g>
                        </g>
                      )}

                      {/* Pia: vascular membrane */}
                      {key === "pia" && (
                        <g opacity={isActive ? 0.4 : 0.12}>
                          {/* Pial vessels */}
                          <path d={`M${xOffset + 10},${y + l.h / 2} C${xOffset + 30},${y + 2} ${xOffset + 60},${y + l.h - 2} ${xOffset + 90},${y + l.h / 2}`}
                            stroke="hsl(0, 45%, 52%)" strokeWidth="0.5" fill="none" />
                          <path d={`M${xOffset + 100},${y + l.h / 2} C${xOffset + 120},${y + 2} ${xOffset + 145},${y + l.h - 2} ${xOffset + 170},${y + l.h / 2}`}
                            stroke="hsl(0, 45%, 52%)" strokeWidth="0.5" fill="none" />
                          {/* Dentate ligaments */}
                          <line x1={xOffset + 5} y1={y + l.h / 2} x2={xOffset - 5} y2={y + l.h / 2 - 4} stroke="hsl(320, 35%, 52%)" strokeWidth="0.8" />
                          <line x1={xOffset + layerWidth - 5} y1={y + l.h / 2} x2={xOffset + layerWidth + 5} y2={y + l.h / 2 - 4} stroke="hsl(320, 35%, 52%)" strokeWidth="0.8" />
                          <text x={xOffset - 10} y={y + l.h / 2 - 6} fontSize="3" fill="hsl(320, 35%, 52%)" textAnchor="end">dentate lig.</text>
                        </g>
                      )}
                    </g>
                  )}

                  {/* Label */}
                  <text
                    x={xOffset + layerWidth + 8}
                    y={y + l.h / 2 + 3}
                    fontSize={l.h < 10 ? "5.5" : "6.5"}
                    fill={isActive ? l.color : "hsl(var(--muted-foreground))"}
                    fontWeight={isActive ? "bold" : "normal"}
                    className="select-none"
                  >
                    {l.label}
                  </text>
                </g>
              );
            })}

            {/* Needle labels */}
            <text x={xOffset - 6} y={yPositions.epidural + layers.epidural.h / 2 + 2} fontSize="5.5" fill="hsl(140, 45%, 50%)" textAnchor="end" fontWeight="bold">Epidural</text>
            <text x={xOffset - 6} y={yPositions.subarachnoid + layers.subarachnoid.h / 2 + 2} fontSize="5.5" fill="hsl(195, 60%, 55%)" textAnchor="end" fontWeight="bold">Spinal</text>

            {/* Depth scale */}
            <g opacity="0.25">
              <line x1={svgWidth - 8} y1={yPositions.skin} x2={svgWidth - 8} y2={yPositions.cord + layers.cord.h}
                stroke="hsl(var(--muted-foreground))" strokeWidth="0.6" />
              <text x={svgWidth - 6} y={(yPositions.skin + yPositions.cord + layers.cord.h) / 2} fontSize="4" fill="hsl(var(--muted-foreground))" transform={`rotate(90, ${svgWidth - 6}, ${(yPositions.skin + yPositions.cord + layers.cord.h) / 2})`} textAnchor="middle">Deep →</text>
            </g>
          </svg>
        </div>

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
