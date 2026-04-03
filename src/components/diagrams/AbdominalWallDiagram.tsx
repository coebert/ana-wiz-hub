import { useState } from "react";

type LayerKey = "skin" | "camper" | "scarpa" | "ext-oblique" | "int-oblique" | "tap-plane" | "transversus" | "transversalis" | "extraperitoneal" | "peritoneum";

interface Layer {
  label: string;
  color: string;
  y: number;
  h: number;
  detail: string;
  clinicalNote: string;
}

const layers: Record<LayerKey, Layer> = {
  skin: { label: "Skin", color: "hsl(25, 50%, 62%)", y: 0, h: 14, detail: "Epidermis and dermis. Langer's lines run transversely in the abdomen — transverse incisions heal better cosmetically.", clinicalNote: "Local anaesthetic skin infiltration. Dermatomes: T6 (xiphisternum), T10 (umbilicus), L1 (inguinal ligament)." },
  camper: { label: "Camper's Fascia (fatty)", color: "hsl(35, 50%, 68%)", y: 16, h: 12, detail: "Superficial fatty layer of subcutaneous tissue. Continuous with superficial fascia elsewhere. Variable thickness.", clinicalNote: "Contains superficial epigastric and circumflex iliac vessels — may bleed during port insertion." },
  scarpa: { label: "Scarpa's Fascia (membranous)", color: "hsl(40, 45%, 58%)", y: 30, h: 10, detail: "Deep membranous layer of subcutaneous tissue. Attaches to fascia lata of thigh below inguinal ligament. Can contain fluid collections.", clinicalNote: "Fluid tracks along Scarpa's fascia — urine extravasation from urethral injury tracks into anterior abdominal wall and scrotum but NOT thigh (fascial attachment to fascia lata)." },
  "ext-oblique": { label: "External Oblique", color: "hsl(0, 55%, 55%)", y: 44, h: 22, detail: "Largest and most superficial of the three flat muscles. Fibres run downward and medially ('hands in pockets'). Aponeurosis forms anterior rectus sheath and inguinal ligament (Poupart's).", clinicalNote: "Aponeurosis forms the anterior wall of the inguinal canal and the superficial inguinal ring. External oblique aponeurosis split in open appendicectomy (McBurney's/Lanz incision)." },
  "int-oblique": { label: "Internal Oblique", color: "hsl(210, 55%, 52%)", y: 68, h: 22, detail: "Middle layer. Fibres run upward and medially (perpendicular to external oblique). Contributes to both anterior and posterior rectus sheath (above arcuate line).", clinicalNote: "Ilioinguinal nerve (L1) runs between internal oblique and transversus abdominis. Forms the conjoint tendon (with transversus) — posterior wall of inguinal canal medially." },
  "tap-plane": { label: "★ TAP BLOCK PLANE ★", color: "hsl(45, 90%, 50%)", y: 91, h: 8, detail: "The transversus abdominis plane (TAP) lies between internal oblique and transversus abdominis. The thoracolumbar nerves (T6–L1) run in this fascial plane.", clinicalNote: "US-guided TAP block: needle tip placed in this plane under real-time guidance. 20 ml LA per side. Provides somatic analgesia to anterior abdominal wall. Does NOT block visceral pain — supplement with systemic analgesia." },
  transversus: { label: "Transversus Abdominis", color: "hsl(160, 50%, 48%)", y: 101, h: 20, detail: "Deepest of the three flat muscles. Fibres run transversely (horizontally). Aponeurosis contributes to posterior rectus sheath above arcuate line; all aponeuroses pass anterior to rectus below.", clinicalNote: "Below the arcuate line (midway between umbilicus and pubis), posterior rectus sheath is absent — only transversalis fascia separates rectus from peritoneum. Relevant for rectus sheath block." },
  transversalis: { label: "Transversalis Fascia", color: "hsl(200, 40%, 50%)", y: 123, h: 12, detail: "Continuous fascial lining of abdominal cavity. Forms posterior wall of inguinal canal laterally. Deep inguinal ring is an opening in transversalis fascia.", clinicalNote: "Forms the fascial layer traversed during laparoscopic port insertion (after muscle layers). Continuous with iliac fascia and psoas fascia." },
  extraperitoneal: { label: "Extraperitoneal Fat", color: "hsl(50, 50%, 65%)", y: 137, h: 10, detail: "Variable layer of fat between transversalis fascia and peritoneum. Contains inferior epigastric vessels.", clinicalNote: "Inferior epigastric artery runs in this layer — must be identified and avoided during laparoscopic port placement (especially lateral ports). Runs medial to deep inguinal ring." },
  peritoneum: { label: "Parietal Peritoneum", color: "hsl(280, 45%, 52%)", y: 149, h: 14, detail: "Serous membrane lining the abdominal cavity. Somatic innervation (intercostal nerves) — pain-sensitive. Reflects onto organs as visceral peritoneum (autonomic innervation — poorly localised pain).", clinicalNote: "Peritoneal irritation → guarding and rebound tenderness. CO₂ insufflation during laparoscopy causes peritoneal stretching → shoulder tip pain (phrenic nerve, C3-5 — diaphragmatic peritoneum)." },
};

const layerOrder: LayerKey[] = ["skin", "camper", "scarpa", "ext-oblique", "int-oblique", "tap-plane", "transversus", "transversalis", "extraperitoneal", "peritoneum"];

const AbdominalWallDiagram = () => {
  const [selected, setSelected] = useState<LayerKey>("tap-plane");
  const info = layers[selected];

  const svgW = 280;
  const layerW = 160;
  const xOff = 10;

  return (
    <div className="border border-border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">Abdominal Wall Layers & TAP Block Plane</h3>
      <p className="text-xs text-muted-foreground mb-3">Tap any layer to explore its anatomy and relevance to regional techniques</p>

      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="flex-shrink-0 mx-auto">
          <svg viewBox={`0 0 ${svgW} 170`} width="280" height="170" className="border border-border rounded">
            {/* US probe indicator */}
            <rect x={xOff + 50} y={0} width="60" height="6" rx="3" fill="hsl(var(--muted-foreground))" opacity="0.3" />
            <text x={xOff + 80} y={5} fontSize="4" textAnchor="middle" fill="hsl(var(--foreground))">US Probe</text>

            {/* Needle trajectory */}
            <line x1={xOff + layerW + 5} y1="10" x2={xOff + layerW / 2 + 10} y2={layers["tap-plane"].y + layers["tap-plane"].h / 2} stroke="hsl(var(--muted-foreground))" strokeWidth="1.2" strokeDasharray="4 2" opacity="0.4" />
            <text x={xOff + layerW + 8} y="14" fontSize="5" fill="hsl(var(--muted-foreground))">Needle</text>

            {layerOrder.map((key) => {
              const l = layers[key];
              const isActive = selected === key;
              const isTAP = key === "tap-plane";
              return (
                <g key={key} className="cursor-pointer" onClick={() => setSelected(key)}>
                  <rect
                    x={xOff}
                    y={l.y}
                    width={layerW}
                    height={l.h}
                    rx={2}
                    fill={l.color}
                    fillOpacity={isActive ? 0.55 : isTAP ? 0.4 : 0.18}
                    stroke={isActive ? l.color : isTAP ? l.color : "transparent"}
                    strokeWidth={isActive ? 2.5 : isTAP ? 1.5 : 0}
                    strokeDasharray={isTAP && !isActive ? "4 2" : ""}
                    className="transition-all duration-200"
                  />
                  {/* Nerve symbols in TAP plane */}
                  {isTAP && (
                    <g opacity={isActive ? 0.9 : 0.5}>
                      {[30, 55, 80, 105, 130].map((nx, i) => (
                        <circle key={i} cx={xOff + nx} cy={l.y + l.h / 2} r="2" fill={l.color} />
                      ))}
                      <text x={xOff + 80} y={l.y + l.h / 2 + 1} fontSize="4" textAnchor="middle" fill="hsl(var(--foreground))" fontWeight="bold">T6–L1 nerves</text>
                    </g>
                  )}
                  {/* Fibre direction */}
                  {key === "ext-oblique" && (
                    <text x={xOff + 5} y={l.y + 14} fontSize="5" fill={l.color} opacity="0.5">↗ fibres</text>
                  )}
                  {key === "int-oblique" && (
                    <text x={xOff + 5} y={l.y + 14} fontSize="5" fill={l.color} opacity="0.5">↙ fibres</text>
                  )}
                  {key === "transversus" && (
                    <text x={xOff + 5} y={l.y + 13} fontSize="5" fill={l.color} opacity="0.5">→ fibres</text>
                  )}
                  {/* Label */}
                  <text
                    x={xOff + layerW + 5}
                    y={l.y + l.h / 2 + 3}
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
