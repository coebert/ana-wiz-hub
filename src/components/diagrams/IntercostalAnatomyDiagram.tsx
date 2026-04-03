import { useState } from "react";

type LayerKey = "skin" | "ext-intercostal" | "int-intercostal" | "innermost" | "neurovascular" | "endothoracic" | "parietal-pleura" | "pleural-space" | "visceral-pleura" | "lung" | "rib-above" | "rib-below";

interface Layer {
  label: string;
  color: string;
  y: number;
  h: number;
  detail: string;
  clinicalNote: string;
}

const layers: Record<LayerKey, Layer> = {
  "rib-above": { label: "Rib (above)", color: "hsl(35, 40%, 60%)", y: 0, h: 20, detail: "Superior rib with costal groove on its inferior surface housing the intercostal neurovascular bundle (VAN — vein, artery, nerve from top to bottom).", clinicalNote: "The neurovascular bundle runs in the costal groove at the INFERIOR border of the rib above. This is why chest drains and needles should be inserted ABOVE the rib below." },
  skin: { label: "Skin & Subcutaneous", color: "hsl(25, 45%, 65%)", y: 24, h: 14, detail: "Skin, subcutaneous fat, and superficial fascia. Variable thickness depending on body habitus.", clinicalNote: "Local anaesthetic infiltration here for chest drain insertion. Mark the safe triangle (anterior border of latissimus dorsi, lateral border of pectoralis major, 5th intercostal space)." },
  "ext-intercostal": { label: "External Intercostal", color: "hsl(0, 50%, 55%)", y: 40, h: 18, detail: "Fibres run downward and FORWARD ('hands in pockets' direction). Extends from tubercle of rib posteriorly to costochondral junction anteriorly, where it becomes the external intercostal membrane.", clinicalNote: "Active in inspiration — elevates ribs. Replaced by external intercostal membrane anteriorly." },
  "int-intercostal": { label: "Internal Intercostal", color: "hsl(210, 50%, 52%)", y: 60, h: 18, detail: "Fibres run downward and BACKWARD (perpendicular to external). Extends from sternum anteriorly to angle of rib posteriorly, where it becomes the internal intercostal membrane.", clinicalNote: "Active in forced expiration — depresses ribs. Between internal and innermost layers lies the neurovascular bundle — target for intercostal nerve block." },
  neurovascular: { label: "Neurovascular Bundle (VAN)", color: "hsl(350, 65%, 50%)", y: 78, h: 14, detail: "Intercostal Vein (superior), Artery (middle), Nerve (inferior) — VAN from top to bottom. Runs between internal and innermost intercostal muscles in the costal groove.", clinicalNote: "Target for intercostal nerve block (inject just inferior to rib at angle). Inadvertent puncture → pneumothorax or haemothorax. Intercostal artery is a branch of aorta (posterior) and internal thoracic artery (anterior)." },
  innermost: { label: "Innermost Intercostal", color: "hsl(240, 45%, 52%)", y: 94, h: 16, detail: "Incomplete muscle layer, same fibre direction as internal intercostal. Also includes subcostalis and transversus thoracis as variants of the innermost layer.", clinicalNote: "The plane between internal and innermost intercostals is the target for erector spinae plane (ESP) block and paravertebral block diffusion." },
  endothoracic: { label: "Endothoracic Fascia", color: "hsl(180, 35%, 52%)", y: 112, h: 10, detail: "Thin connective tissue layer lining the inner surface of the thoracic wall, deep to the innermost intercostal muscle.", clinicalNote: "Separates the musculoskeletal thorax from the pleura. Extrapleural plane used in some surgical approaches." },
  "parietal-pleura": { label: "Parietal Pleura", color: "hsl(160, 50%, 48%)", y: 124, h: 12, detail: "Lines inner thoracic wall, mediastinum, and diaphragm. Innervated by intercostal (costal) and phrenic (mediastinal/diaphragmatic) nerves — pain-sensitive.", clinicalNote: "Parietal pleura is sensory — pleuritic chest pain arises here. Phrenic nerve supply to central diaphragmatic pleura → referred shoulder tip pain." },
  "pleural-space": { label: "Pleural Space", color: "hsl(195, 55%, 55%)", y: 138, h: 14, detail: "Potential space containing ~5 ml serous fluid. Negative pressure (−5 cmH₂O at FRC) keeps lung expanded. Surface tension between visceral and parietal pleura.", clinicalNote: "Pneumothorax: air in pleural space → lung collapse. Pleural effusion: fluid accumulation. Chest drain inserted into this space (safe triangle, 5th ICS, mid-axillary line)." },
  "visceral-pleura": { label: "Visceral Pleura", color: "hsl(140, 45%, 48%)", y: 154, h: 10, detail: "Covers lung surface including fissures. Innervated by autonomic nerves only — NOT pain-sensitive. Receives blood supply from bronchial arteries.", clinicalNote: "Visceral pleura has no somatic innervation — lung parenchymal disease is painless unless parietal pleura is involved." },
  lung: { label: "Lung Parenchyma", color: "hsl(340, 40%, 60%)", y: 166, h: 22, detail: "Alveolar tissue where gas exchange occurs. ~300 million alveoli, total surface area ~70 m². Dual blood supply: pulmonary (gas exchange) and bronchial (nutritive).", clinicalNote: "Right lung: 3 lobes, 10 segments. Left lung: 2 lobes, 8-10 segments. Right upper lobe bronchus is eparterial — key for DLT positioning." },
  "rib-below": { label: "Rib (below)", color: "hsl(35, 40%, 60%)", y: 192, h: 18, detail: "The rib below the intercostal space. Insert needles and drains ABOVE this rib to avoid the neurovascular bundle running under the rib above.", clinicalNote: "Safe insertion: above the rib below. The 'triangle of safety' for chest drain: anterior to latissimus dorsi, lateral to pectoralis major, at or above 5th ICS." },
};

const layerOrder: LayerKey[] = ["rib-above", "skin", "ext-intercostal", "int-intercostal", "neurovascular", "innermost", "endothoracic", "parietal-pleura", "pleural-space", "visceral-pleura", "lung", "rib-below"];

const IntercostalAnatomyDiagram = () => {
  const [selected, setSelected] = useState<LayerKey>("neurovascular");
  const info = layers[selected];

  const svgW = 280;
  const layerW = 170;
  const xOff = 55;

  return (
    <div className="border border-border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">Intercostal Space — Cross-Section</h3>
      <p className="text-xs text-muted-foreground mb-3">Tap any layer to see its anatomy and clinical relevance for chest procedures</p>

      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="flex-shrink-0 mx-auto">
          <svg viewBox={`0 0 ${svgW} 215`} width="280" height="215" className="border border-border rounded">
            {/* Chest drain arrow */}
            <line x1="15" y1="195" x2="50" y2={layers["pleural-space"].y + layers["pleural-space"].h / 2} stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.4" />
            <text x="5" y="205" fontSize="6" fill="hsl(var(--muted-foreground))">Drain</text>
            <text x="12" y="186" fontSize="5" fill="hsl(195, 55%, 55%)">↑ above rib</text>

            {layerOrder.map((key) => {
              const l = layers[key];
              const isActive = selected === key;
              const isRib = key.includes("rib");
              return (
                <g key={key} className="cursor-pointer" onClick={() => setSelected(key)}>
                  <rect
                    x={xOff}
                    y={l.y}
                    width={layerW}
                    height={l.h}
                    rx={isRib ? 6 : 2}
                    fill={l.color}
                    fillOpacity={isActive ? 0.55 : 0.2}
                    stroke={isActive ? l.color : "transparent"}
                    strokeWidth={isActive ? 2 : 0}
                    className="transition-all duration-200"
                  />
                  {/* VAN detail within neurovascular layer */}
                  {key === "neurovascular" && (
                    <g opacity={isActive ? 0.8 : 0.4}>
                      <circle cx={xOff + 40} cy={l.y + 4} r="2.5" fill="hsl(220, 60%, 55%)" />
                      <text x={xOff + 48} y={l.y + 6} fontSize="5" fill="hsl(220, 60%, 55%)">V</text>
                      <circle cx={xOff + 40} cy={l.y + 9} r="2" fill="hsl(0, 65%, 50%)" />
                      <text x={xOff + 48} y={l.y + 11} fontSize="5" fill="hsl(0, 65%, 50%)">A</text>
                      <circle cx={xOff + 40} cy={l.y + 13.5} r="1.5" fill="hsl(50, 65%, 48%)" />
                      <text x={xOff + 48} y={l.y + 15} fontSize="5" fill="hsl(50, 65%, 48%)">N</text>
                    </g>
                  )}
                  {/* Label */}
                  <text
                    x={xOff + layerW + 5}
                    y={l.y + l.h / 2 + 3}
                    fontSize="6"
                    fill={isActive ? l.color : "hsl(var(--muted-foreground))"}
                    fontWeight={isActive ? "bold" : "normal"}
                    className="select-none"
                  >
                    {l.label}
                  </text>
                </g>
              );
            })}

            {/* Fibre direction arrows */}
            <g opacity="0.3">
              <text x={xOff + 5} y={layers["ext-intercostal"].y + 12} fontSize="5" fill={layers["ext-intercostal"].color}>↗ fibres</text>
              <text x={xOff + 5} y={layers["int-intercostal"].y + 12} fontSize="5" fill={layers["int-intercostal"].color}>↙ fibres</text>
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

export default IntercostalAnatomyDiagram;
