import { useState } from "react";
import { DiagramToggleBar } from "./DiagramToggleBar";

type LayerKey = "skin" | "ext-intercostal" | "int-intercostal" | "innermost" | "neurovascular" | "endothoracic" | "parietal-pleura" | "pleural-space" | "visceral-pleura" | "lung" | "rib-above" | "rib-below";

interface Layer {
  label: string;
  color: string;
  detail: string;
  clinicalNote: string;
}

const layers: Record<LayerKey, Layer> = {
  "rib-above": { label: "Rib (above)", color: "hsl(35, 40%, 60%)", detail: "Superior rib with costal groove on its inferior surface housing the intercostal neurovascular bundle (VAN — vein, artery, nerve from top to bottom).", clinicalNote: "The neurovascular bundle runs in the costal groove at the INFERIOR border of the rib above. Insert needles/drains ABOVE the rib below." },
  skin: { label: "Skin & Subcutaneous", color: "hsl(25, 45%, 65%)", detail: "Skin, subcutaneous fat, and superficial fascia. Variable thickness depending on body habitus.", clinicalNote: "Local anaesthetic infiltration here for chest drain insertion. Mark the safe triangle (anterior lat dorsi, lateral pec major, 5th ICS)." },
  "ext-intercostal": { label: "External Intercostal", color: "hsl(0, 50%, 55%)", detail: "Fibres run downward and FORWARD ('hands in pockets'). Extends from tubercle posteriorly to costochondral junction anteriorly, replaced by external intercostal membrane.", clinicalNote: "Active in inspiration — elevates ribs." },
  "int-intercostal": { label: "Internal Intercostal", color: "hsl(210, 50%, 52%)", detail: "Fibres run downward and BACKWARD (perpendicular to external). Extends from sternum anteriorly to angle of rib posteriorly.", clinicalNote: "Active in forced expiration. Between internal and innermost layers lies the neurovascular bundle — target for intercostal nerve block." },
  neurovascular: { label: "Neurovascular Bundle (VAN)", color: "hsl(350, 65%, 50%)", detail: "Intercostal Vein (superior), Artery (middle), Nerve (inferior) — VAN from top to bottom. Runs between internal and innermost intercostal muscles in costal groove.", clinicalNote: "Target for intercostal nerve block (inject just inferior to rib at angle). Inadvertent puncture → pneumo/haemothorax." },
  innermost: { label: "Innermost Intercostal", color: "hsl(240, 45%, 52%)", detail: "Incomplete muscle layer, same fibre direction as internal intercostal. Includes subcostalis and transversus thoracis.", clinicalNote: "Plane between internal and innermost intercostals is target for ESP block and paravertebral block." },
  endothoracic: { label: "Endothoracic Fascia", color: "hsl(180, 35%, 52%)", detail: "Thin connective tissue lining inner thoracic wall, deep to innermost intercostal.", clinicalNote: "Separates musculoskeletal thorax from pleura. Extrapleural plane used in some surgical approaches." },
  "parietal-pleura": { label: "Parietal Pleura", color: "hsl(160, 50%, 48%)", detail: "Lines inner thoracic wall. Innervated by intercostal (costal) and phrenic (mediastinal/diaphragmatic) nerves — pain-sensitive.", clinicalNote: "Parietal pleura is sensory — pleuritic pain arises here. Phrenic supply to central diaphragmatic pleura → shoulder tip pain." },
  "pleural-space": { label: "Pleural Space", color: "hsl(195, 55%, 55%)", detail: "Potential space containing ~5 ml serous fluid. Negative pressure (−5 cmH₂O at FRC) keeps lung expanded.", clinicalNote: "Pneumothorax: air here → lung collapse. Chest drain target (safe triangle, 5th ICS, mid-axillary line)." },
  "visceral-pleura": { label: "Visceral Pleura", color: "hsl(140, 45%, 48%)", detail: "Covers lung surface including fissures. Autonomic innervation only — NOT pain-sensitive. Blood supply from bronchial arteries.", clinicalNote: "No somatic innervation — lung parenchymal disease painless unless parietal pleura involved." },
  lung: { label: "Lung Parenchyma", color: "hsl(340, 40%, 60%)", detail: "~300 million alveoli, surface area ~70 m². Dual blood supply: pulmonary (gas exchange) and bronchial (nutritive).", clinicalNote: "Right: 3 lobes, 10 segments. Left: 2 lobes. Right upper lobe bronchus eparterial — key for DLT positioning." },
  "rib-below": { label: "Rib (below)", color: "hsl(35, 40%, 60%)", detail: "Insert needles and drains ABOVE this rib to avoid the neurovascular bundle running under the rib above.", clinicalNote: "Safe insertion: above the rib below. Triangle of safety for chest drain." },
};

const layerOrder: LayerKey[] = ["rib-above", "skin", "ext-intercostal", "int-intercostal", "neurovascular", "innermost", "endothoracic", "parietal-pleura", "pleural-space", "visceral-pleura", "lung", "rib-below"];

// Layout positions with anatomical proportions
const layerGeom: Record<LayerKey, { y: number; h: number }> = {
  "rib-above": { y: 0, h: 28 },
  skin: { y: 32, h: 16 },
  "ext-intercostal": { y: 50, h: 24 },
  "int-intercostal": { y: 76, h: 22 },
  neurovascular: { y: 98, h: 12 },
  innermost: { y: 112, h: 20 },
  endothoracic: { y: 134, h: 8 },
  "parietal-pleura": { y: 144, h: 10 },
  "pleural-space": { y: 156, h: 16 },
  "visceral-pleura": { y: 174, h: 8 },
  lung: { y: 184, h: 30 },
  "rib-below": { y: 220, h: 28 },
};

const IntercostalAnatomyDiagram = () => {
  const [selected, setSelected] = useState<LayerKey>("neurovascular");
  const [showSutures, setShowSutures] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const info = layers[selected];

  const layerW = 160;
  const xOff = 60;

  return (
    <div className="my-6 space-y-4">
      <div className="bg-muted/30 rounded-xl border border-border p-4">
        <DiagramToggleBar
          title="Intercostal space — cross-section"
          subtitle="Tap any layer to see its anatomy and clinical relevance for chest procedures"
          toggles={[
            { label: "Sutures", active: showSutures, onChange: () => setShowSutures((s) => !s) },
            { label: "Labels", active: showLabels, onChange: () => setShowLabels((s) => !s) },
          ]}
        />

        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <div className="flex-shrink-0 mx-auto">
            <svg viewBox="0 0 280 255" className="w-full max-w-[320px]" role="img" aria-label="Cross-section through an intercostal space showing layers from skin to lung">
              <defs>
                <radialGradient id="ics-bgShade" cx="50%" cy="50%" r="65%">
                  <stop offset="0%" stopColor="hsl(var(--anatomy))" stopOpacity="0.16" />
                  <stop offset="100%" stopColor="hsl(var(--anatomy))" stopOpacity="0.03" />
                </radialGradient>
                <pattern id="ics-grain" patternUnits="userSpaceOnUse" width="6" height="6">
                  <circle cx="1" cy="1" r="0.4" fill="hsl(var(--muted-foreground))" opacity="0.18" />
                </pattern>
                <filter id="ics-shadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" />
                  <feOffset dx="0" dy="1.2" result="off" />
                  <feComponentTransfer><feFuncA type="linear" slope="0.28" /></feComponentTransfer>
                  <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              <rect x="2" y="2" width="276" height="251" rx="8" fill="url(#ics-bgShade)" stroke="hsl(var(--border))" strokeWidth="0.5" />
              {showSutures && <rect x="2" y="2" width="276" height="251" rx="8" fill="url(#ics-grain)" pointerEvents="none" />}

              {/* Compass labels (gated by Labels) */}
              {showLabels && (
                <g pointerEvents="none">
                  <text x="140" y="12" fontSize="8" fill="hsl(var(--muted-foreground))" opacity="0.55" textAnchor="middle" fontWeight="600">SUPERFICIAL</text>
                  <text x="140" y="252" fontSize="8" fill="hsl(var(--muted-foreground))" opacity="0.55" textAnchor="middle" fontWeight="600">DEEP</text>
                </g>
              )}

              {/* Needle trajectory (gated by Sutures) */}
              {showSutures && (
                <>
                  <path d="M20,240 C30,220 45,195 55,170 L60,158"
                    stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.45" fill="none" />
                  {showLabels && (
                    <>
                      <text x="10" y="248" fontSize="6" fill="hsl(var(--muted-foreground))">Needle / drain</text>
                      <text x="30" y="225" fontSize="5" fill="hsl(195, 55%, 55%)" opacity="0.7">↑ above lower rib</text>
                    </>
                  )}
                </>
              )}

            {layerOrder.map((key) => {
              const l = layers[key];
              const g = layerGeom[key];
              const isActive = selected === key;
              const isRib = key.includes("rib");

              return (
                <g key={key} className="cursor-pointer" onClick={() => setSelected(key)}>
                  {isRib ? (
                    // Anatomical rib cross-section - oval bone shape
                    <g>
                      <ellipse
                        cx={xOff + layerW / 2}
                        cy={g.y + g.h / 2}
                        rx={layerW / 2}
                        ry={g.h / 2}
                        fill={l.color}
                        fillOpacity={isActive ? 0.5 : 0.18}
                        stroke={l.color}
                        strokeWidth={isActive ? 2 : 1}
                        className="transition-all duration-200"
                      />
                      {/* Cortical bone outline */}
                      <ellipse
                        cx={xOff + layerW / 2}
                        cy={g.y + g.h / 2}
                        rx={layerW / 2 - 4}
                        ry={g.h / 2 - 3}
                        fill="none"
                        stroke={l.color}
                        strokeWidth="0.5"
                        opacity={isActive ? 0.4 : 0.15}
                      />
                      {/* Costal groove on lower border of upper rib */}
                      {key === "rib-above" && (
                        <path
                          d={`M${xOff + 20},${g.y + g.h - 4} Q${xOff + layerW / 2},${g.y + g.h + 2} ${xOff + layerW - 20},${g.y + g.h - 4}`}
                          stroke={layers.neurovascular.color}
                          strokeWidth="1.5"
                          fill="none"
                          opacity={isActive ? 0.6 : 0.25}
                          strokeDasharray="3 2"
                        />
                      )}
                    </g>
                  ) : (
                    <rect
                      x={xOff}
                      y={g.y}
                      width={layerW}
                      height={g.h}
                      rx={2}
                      fill={l.color}
                      fillOpacity={isActive ? 0.5 : 0.15}
                      stroke={isActive ? l.color : "transparent"}
                      strokeWidth={isActive ? 2 : 0}
                      className="transition-all duration-200"
                    />
                  )}

                  {/* VAN detail */}
                  {key === "neurovascular" && (
                    <g opacity={isActive ? 0.85 : 0.4}>
                      {/* Vein - largest, most superior */}
                      <circle cx={xOff + 35} cy={g.y + 3} r="3" fill="hsl(220, 60%, 55%)" />
                      <text x={xOff + 42} y={g.y + 5} fontSize="5" fill="hsl(220, 60%, 55%)" fontWeight="bold">V</text>
                      {/* Artery */}
                      <circle cx={xOff + 35} cy={g.y + 7} r="2.2" fill="hsl(0, 65%, 50%)" />
                      <text x={xOff + 42} y={g.y + 9} fontSize="5" fill="hsl(0, 65%, 50%)" fontWeight="bold">A</text>
                      {/* Nerve - smallest, most inferior */}
                      <circle cx={xOff + 35} cy={g.y + 10.5} r="1.5" fill="hsl(50, 65%, 48%)" />
                      <text x={xOff + 42} y={g.y + 12} fontSize="5" fill="hsl(50, 65%, 48%)" fontWeight="bold">N</text>
                    </g>
                  )}

                  {/* Muscle fibre directions */}
                  {key === "ext-intercostal" && (
                    <g opacity={isActive ? 0.5 : 0.2}>
                      {[0, 1, 2, 3, 4, 5].map(i => (
                        <line key={i} x1={xOff + 20 + i * 22} y1={g.y + 4} x2={xOff + 32 + i * 22} y2={g.y + g.h - 4}
                          stroke={l.color} strokeWidth="0.8" />
                      ))}
                      <text x={xOff + 5} y={g.y + 14} fontSize="5" fill={l.color}>↘ fibres</text>
                    </g>
                  )}
                  {key === "int-intercostal" && (
                    <g opacity={isActive ? 0.5 : 0.2}>
                      {[0, 1, 2, 3, 4, 5].map(i => (
                        <line key={i} x1={xOff + 32 + i * 22} y1={g.y + 4} x2={xOff + 20 + i * 22} y2={g.y + g.h - 4}
                          stroke={l.color} strokeWidth="0.8" />
                      ))}
                      <text x={xOff + 5} y={g.y + 13} fontSize="5" fill={l.color}>↙ fibres</text>
                    </g>
                  )}

                  {/* Pleural space stipple */}
                  {key === "pleural-space" && (
                    <g opacity={isActive ? 0.4 : 0.15}>
                      {Array.from({ length: 20 }).map((_, i) => (
                        <circle key={i} cx={xOff + 10 + (i % 10) * 15} cy={g.y + 4 + Math.floor(i / 10) * 8} r="0.8" fill={l.color} />
                      ))}
                    </g>
                  )}

                  {/* Alveoli pattern in lung */}
                  {key === "lung" && (
                    <g opacity={isActive ? 0.3 : 0.1}>
                      {Array.from({ length: 12 }).map((_, i) => (
                        <circle key={i} cx={xOff + 15 + (i % 6) * 24} cy={g.y + 8 + Math.floor(i / 6) * 14} r="5" fill="none" stroke={l.color} strokeWidth="0.5" />
                      ))}
                    </g>
                  )}

                  {/* Label */}
                  <text
                    x={xOff + layerW + 8}
                    y={g.y + g.h / 2 + 3}
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
          </svg>
        </div>

          <div className="flex-1 min-w-0">
            <div
              className="p-3 rounded-lg border border-border bg-background/80 space-y-1.5"
              style={{ borderLeftWidth: 4, borderLeftColor: info.color }}
            >
              <p className="font-semibold text-foreground text-sm">{info.label}</p>
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Anatomy:</span> {info.detail}
              </p>
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">Clinical:</span> {info.clinicalNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntercostalAnatomyDiagram;
