import { useState } from "react";

type LayerKey = "skin" | "camper" | "scarpa" | "ext-oblique" | "int-oblique" | "tap-plane" | "transversus" | "transversalis" | "extraperitoneal" | "peritoneum";

interface Layer {
  label: string;
  color: string;
  detail: string;
  clinicalNote: string;
}

const layers: Record<LayerKey, Layer> = {
  skin: { label: "Skin", color: "hsl(25, 50%, 62%)", detail: "Epidermis and dermis. Langer's lines run transversely — transverse incisions heal better cosmetically.", clinicalNote: "LA infiltration. Dermatomes: T6 (xiphisternum), T10 (umbilicus), L1 (inguinal ligament)." },
  camper: { label: "Camper's Fascia (fatty)", color: "hsl(35, 50%, 68%)", detail: "Superficial fatty layer of subcutaneous tissue. Continuous with superficial fascia elsewhere. Variable thickness.", clinicalNote: "Contains superficial epigastric and circumflex iliac vessels — may bleed during port insertion." },
  scarpa: { label: "Scarpa's Fascia (membranous)", color: "hsl(40, 45%, 58%)", detail: "Deep membranous layer. Attaches to fascia lata below inguinal ligament. Can contain fluid collections.", clinicalNote: "Urine extravasation tracks along Scarpa's into anterior wall and scrotum but NOT thigh." },
  "ext-oblique": { label: "External Oblique", color: "hsl(0, 55%, 55%)", detail: "Largest, most superficial flat muscle. Fibres downward and medially ('hands in pockets'). Aponeurosis forms anterior rectus sheath and inguinal ligament.", clinicalNote: "Aponeurosis forms anterior inguinal canal wall and superficial ring. Split in McBurney's incision." },
  "int-oblique": { label: "Internal Oblique", color: "hsl(210, 55%, 52%)", detail: "Middle layer. Fibres upward and medially (perpendicular to external). Contributes to both anterior and posterior rectus sheath above arcuate line.", clinicalNote: "Ilioinguinal nerve (L1) runs between internal oblique and transversus. Forms conjoint tendon with transversus." },
  "tap-plane": { label: "★ TAP BLOCK PLANE ★", color: "hsl(45, 90%, 50%)", detail: "Fascial plane between internal oblique and transversus abdominis. T6–L1 thoracolumbar nerves run here.", clinicalNote: "US-guided TAP block: 20 ml LA per side. Somatic wall analgesia. Does NOT block visceral pain — supplement systemically." },
  transversus: { label: "Transversus Abdominis", color: "hsl(160, 50%, 48%)", detail: "Deepest flat muscle. Fibres transverse. Below arcuate line, all aponeuroses pass anterior to rectus.", clinicalNote: "Rectus sheath block relevant below arcuate line (midway umbilicus–pubis). No posterior sheath there." },
  transversalis: { label: "Transversalis Fascia", color: "hsl(200, 40%, 50%)", detail: "Continuous fascial lining. Forms posterior inguinal canal wall laterally. Deep inguinal ring is an opening here.", clinicalNote: "Layer traversed during laparoscopic port insertion after muscle layers." },
  extraperitoneal: { label: "Extraperitoneal Fat", color: "hsl(50, 50%, 65%)", detail: "Variable fat between transversalis fascia and peritoneum. Contains inferior epigastric vessels.", clinicalNote: "Inferior epigastric artery here — avoid during lateral laparoscopic ports. Runs medial to deep inguinal ring." },
  peritoneum: { label: "Parietal Peritoneum", color: "hsl(280, 45%, 52%)", detail: "Serous membrane lining abdomen. Somatic innervation (intercostal nerves) — pain-sensitive. Reflects onto organs as visceral peritoneum.", clinicalNote: "Peritoneal irritation → guarding/rebound. CO₂ insufflation → diaphragmatic stretch → shoulder tip pain (C3-5 phrenic)." },
};

const layerOrder: LayerKey[] = ["skin", "camper", "scarpa", "ext-oblique", "int-oblique", "tap-plane", "transversus", "transversalis", "extraperitoneal", "peritoneum"];

const layerGeom: Record<LayerKey, { y: number; h: number }> = {
  skin: { y: 8, h: 16 },
  camper: { y: 26, h: 14 },
  scarpa: { y: 42, h: 10 },
  "ext-oblique": { y: 56, h: 28 },
  "int-oblique": { y: 86, h: 28 },
  "tap-plane": { y: 115, h: 10 },
  transversus: { y: 127, h: 26 },
  transversalis: { y: 155, h: 12 },
  extraperitoneal: { y: 169, h: 10 },
  peritoneum: { y: 181, h: 16 },
};

const AbdominalWallDiagram = () => {
  const [selected, setSelected] = useState<LayerKey>("tap-plane");
  const info = layers[selected];

  const layerW = 170;
  const xOff = 10;

  return (
    <div className="border border-border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">Abdominal Wall Layers & TAP Block Plane</h3>
      <p className="text-xs text-muted-foreground mb-3">Tap any layer to explore anatomy and relevance to regional techniques</p>

      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="flex-shrink-0 mx-auto">
          <svg viewBox="0 0 280 205" width="280" height="205" className="border border-border rounded">
            {/* US probe */}
            <rect x={xOff + 45} y={0} width="70" height="7" rx="3.5" fill="hsl(var(--muted-foreground))" opacity="0.25" />
            <text x={xOff + 80} y={5.5} fontSize="4.5" textAnchor="middle" fill="hsl(var(--foreground))" opacity="0.6">US Probe</text>

            {/* US beam cone */}
            <path d={`M${xOff + 55},7 L${xOff + 40},${layerGeom["tap-plane"].y + 5} M${xOff + 105},7 L${xOff + 120},${layerGeom["tap-plane"].y + 5}`}
              stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.2" fill="none" />

            {/* Needle trajectory */}
            <path d={`M${xOff + layerW + 10},15 C${xOff + layerW},40 ${xOff + layerW - 20},80 ${xOff + layerW / 2 + 15},${layerGeom["tap-plane"].y + 5}`}
              stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" strokeDasharray="4 2" opacity="0.4" fill="none" />
            <text x={xOff + layerW + 12} y="14" fontSize="5.5" fill="hsl(var(--muted-foreground))">Needle</text>
            {/* Needle tip marker */}
            <circle cx={xOff + layerW / 2 + 15} cy={layerGeom["tap-plane"].y + 5} r="2" fill="hsl(45, 90%, 50%)" opacity="0.6" />

            {layerOrder.map((key) => {
              const l = layers[key];
              const g = layerGeom[key];
              const isActive = selected === key;
              const isTAP = key === "tap-plane";

              return (
                <g key={key} className="cursor-pointer" onClick={() => setSelected(key)}>
                  <rect
                    x={xOff}
                    y={g.y}
                    width={layerW}
                    height={g.h}
                    rx={2}
                    fill={l.color}
                    fillOpacity={isActive ? 0.55 : isTAP ? 0.4 : 0.15}
                    stroke={isActive ? l.color : isTAP ? l.color : "transparent"}
                    strokeWidth={isActive ? 2.5 : isTAP ? 1.5 : 0}
                    strokeDasharray={isTAP && !isActive ? "4 2" : ""}
                    className="transition-all duration-200"
                  />

                  {/* Muscle fibre patterns */}
                  {key === "ext-oblique" && (
                    <g opacity={isActive ? 0.4 : 0.15}>
                      {[0, 1, 2, 3, 4, 5, 6].map(i => (
                        <line key={i} x1={xOff + 12 + i * 22} y1={g.y + 4} x2={xOff + 24 + i * 22} y2={g.y + g.h - 4}
                          stroke={l.color} strokeWidth="0.7" />
                      ))}
                    </g>
                  )}
                  {key === "int-oblique" && (
                    <g opacity={isActive ? 0.4 : 0.15}>
                      {[0, 1, 2, 3, 4, 5, 6].map(i => (
                        <line key={i} x1={xOff + 24 + i * 22} y1={g.y + 4} x2={xOff + 12 + i * 22} y2={g.y + g.h - 4}
                          stroke={l.color} strokeWidth="0.7" />
                      ))}
                    </g>
                  )}
                  {key === "transversus" && (
                    <g opacity={isActive ? 0.4 : 0.15}>
                      {[0, 1, 2, 3, 4, 5].map(i => (
                        <line key={i} x1={xOff + 8} y1={g.y + 5 + i * 4} x2={xOff + layerW - 8} y2={g.y + 5 + i * 4}
                          stroke={l.color} strokeWidth="0.5" />
                      ))}
                    </g>
                  )}

                  {/* Nerve symbols in TAP plane */}
                  {isTAP && (
                    <g opacity={isActive ? 0.9 : 0.5}>
                      {[25, 50, 75, 100, 125, 150].map((nx, i) => (
                        <g key={i}>
                          <circle cx={xOff + nx} cy={g.y + g.h / 2} r="2.5" fill={l.color} opacity="0.6" />
                          <circle cx={xOff + nx} cy={g.y + g.h / 2} r="1" fill="hsl(var(--foreground))" opacity="0.4" />
                        </g>
                      ))}
                      <text x={xOff + layerW / 2} y={g.y + g.h / 2 + 1} fontSize="4" textAnchor="middle" fill="hsl(var(--foreground))" fontWeight="bold">T6–L1 nerves</text>
                    </g>
                  )}

                  {/* Label */}
                  <text
                    x={xOff + layerW + 8}
                    y={g.y + g.h / 2 + 3}
                    fontSize={isTAP ? "5.5" : "6"}
                    fill={isActive ? l.color : "hsl(var(--muted-foreground))"}
                    fontWeight={isActive || isTAP ? "bold" : "normal"}
                    className="select-none"
                  >
                    {l.label}
                  </text>
                </g>
              );
            })}

            {/* Depth annotations */}
            <g opacity="0.25" fontSize="4.5" fill="hsl(var(--muted-foreground))">
              <text x={xOff - 8} y={layerGeom.skin.y + 10} textAnchor="end">←</text>
              <text x={xOff - 8} y={layerGeom.peritoneum.y + 10} textAnchor="end">←</text>
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

export default AbdominalWallDiagram;
