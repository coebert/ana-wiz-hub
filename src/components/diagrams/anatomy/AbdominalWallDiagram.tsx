import { useState } from "react";
import { DiagramToggleBar } from "@/components/diagrams/shared/DiagramToggleBar";
import { DiagramFigure } from "../_shared/DiagramFigure";

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
  "tap-plane": { label: "★ TAP BLOCK PLANE ★", color: "hsl(45, 90%, 50%)", detail: "Fascial plane between internal oblique and transversus abdominis. Thoracoabdominal nerves (T7–T11), subcostal (T12) and L1 branches (iliohypogastric, ilioinguinal) run here.", clinicalNote: "US-guided TAP block: 20 ml LA per side. Somatic wall analgesia. Does NOT block visceral pain — supplement systemically." },
  transversus: { label: "Transversus Abdominis", color: "hsl(160, 50%, 48%)", detail: "Deepest flat muscle. Fibres transverse. Below arcuate line, all aponeuroses pass anterior to rectus.", clinicalNote: "Rectus sheath block relevant below arcuate line (midway umbilicus–pubis). No posterior sheath there." },
  transversalis: { label: "Transversalis Fascia", color: "hsl(200, 40%, 50%)", detail: "Continuous fascial lining. Forms posterior inguinal canal wall laterally. Deep inguinal ring is an opening here.", clinicalNote: "Layer traversed during laparoscopic port insertion after muscle layers." },
  extraperitoneal: { label: "Extraperitoneal Fat", color: "hsl(50, 50%, 65%)", detail: "Variable fat between transversalis fascia and peritoneum. Contains inferior epigastric vessels.", clinicalNote: "Inferior epigastric artery here — avoid during lateral laparoscopic ports. Runs medial to deep inguinal ring." },
  peritoneum: { label: "Parietal Peritoneum", color: "hsl(280, 45%, 52%)", detail: "Serous membrane lining abdomen. Somatic innervation (intercostal nerves) — pain-sensitive. Reflects onto organs as visceral peritoneum.", clinicalNote: "Peritoneal irritation → guarding/rebound. CO₂ insufflation → diaphragmatic stretch → shoulder tip pain (C3-5 phrenic)." },
};

const layerOrder: LayerKey[] = ["skin", "camper", "scarpa", "ext-oblique", "int-oblique", "tap-plane", "transversus", "transversalis", "extraperitoneal", "peritoneum"];

const layerGeom: Record<LayerKey, { y: number; h: number }> = {
  skin: { y: 12, h: 18 },
  camper: { y: 32, h: 16 },
  scarpa: { y: 50, h: 10 },
  "ext-oblique": { y: 64, h: 34 },
  "int-oblique": { y: 100, h: 34 },
  "tap-plane": { y: 135, h: 12 },
  transversus: { y: 149, h: 30 },
  transversalis: { y: 181, h: 12 },
  extraperitoneal: { y: 195, h: 12 },
  peritoneum: { y: 209, h: 16 },
};

const AbdominalWallDiagram = () => {
  const [selected, setSelected] = useState<LayerKey>("tap-plane");
  const [showSutures, setShowSutures] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const info = layers[selected];

  const layerW = 190;
  const xOff = 14;
  const svgW = 310;
  const svgH = 240;

  return (
    <DiagramFigure
      id="abdominal-wall-diagram"
      title="Abdominal wall"
      description="Auto-generated wrapper for the Abdominal wall anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="my-6 space-y-4">
        <div className="bg-muted/30 rounded-xl border border-border p-4">
          <DiagramToggleBar
            title="Abdominal wall layers & TAP block plane"
            subtitle="Tap any layer to explore anatomy and relevance to regional techniques"
            toggles={[
              { label: "Sutures", active: showSutures, onChange: () => setShowSutures((s) => !s) },
              { label: "Labels", active: showLabels, onChange: () => setShowLabels((s) => !s) },
            ]}
          />
  
          <div className="flex flex-col sm:flex-row gap-4 items-start">
          <div className="flex-shrink-0 mx-auto">
            <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full max-w-[330px]" role="img" aria-label="Abdominal wall layers cross-section showing TAP block plane">
              <defs>
                <radialGradient id="abw-bgShade" cx="50%" cy="50%" r="65%">
                  <stop offset="0%" stopColor="hsl(var(--anatomy))" stopOpacity="0.13" />
                  <stop offset="100%" stopColor="hsl(var(--anatomy))" stopOpacity="0.03" />
                </radialGradient>
                <filter id="abw-shadow" x="-10%" y="-10%" width="120%" height="120%">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" />
                  <feOffset dx="0" dy="1.2" result="off" />
                  <feComponentTransfer><feFuncA type="linear" slope="0.26" /></feComponentTransfer>
                  <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                {/* Skin texture */}
                <pattern id="skinTex" patternUnits="userSpaceOnUse" width="6" height="6">
                  <circle cx="3" cy="3" r="0.4" fill="hsl(25, 40%, 50%)" opacity="0.25" />
                </pattern>
                {/* Fat globule pattern */}
                <pattern id="fatTex" patternUnits="userSpaceOnUse" width="10" height="8">
                  <ellipse cx="5" cy="4" rx="3.2" ry="2.4" fill="hsl(40, 55%, 72%)" opacity="0.3" stroke="hsl(35, 40%, 60%)" strokeWidth="0.5" />
                </pattern>
                {/* Fascia striation */}
                <pattern id="fasciaTex" patternUnits="userSpaceOnUse" width="16" height="3">
                  <line x1="0" y1="1.5" x2="16" y2="1.5" stroke="hsl(40, 35%, 50%)" strokeWidth="0.5" opacity="0.35" />
                </pattern>
                {/* Muscle fibre diagonal down-medial (EO) */}
                <pattern id="eoFibre" patternUnits="userSpaceOnUse" width="8" height="12" patternTransform="rotate(-30)">
                  <line x1="0" y1="0" x2="0" y2="12" stroke="hsl(0, 45%, 50%)" strokeWidth="0.5" opacity="0.25" />
                  <line x1="4" y1="0" x2="4" y2="12" stroke="hsl(0, 45%, 50%)" strokeWidth="0.5" opacity="0.15" />
                </pattern>
                {/* Muscle fibre diagonal up-medial (IO) */}
                <pattern id="ioFibre" patternUnits="userSpaceOnUse" width="8" height="12" patternTransform="rotate(30)">
                  <line x1="0" y1="0" x2="0" y2="12" stroke="hsl(210, 45%, 48%)" strokeWidth="0.5" opacity="0.25" />
                  <line x1="4" y1="0" x2="4" y2="12" stroke="hsl(210, 45%, 48%)" strokeWidth="0.5" opacity="0.15" />
                </pattern>
                {/* Transverse muscle fibres (TA) */}
                <pattern id="taFibre" patternUnits="userSpaceOnUse" width="12" height="5">
                  <line x1="0" y1="2.5" x2="12" y2="2.5" stroke="hsl(160, 40%, 42%)" strokeWidth="0.5" opacity="0.25" />
                </pattern>
                {/* Peritoneal sheen */}
                <linearGradient id="peritonealGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(280, 45%, 52%)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="hsl(280, 35%, 42%)" stopOpacity="0.15" />
                </linearGradient>
                {/* Blood vessel glow */}
                <filter id="vesselGlow">
                  <feGaussianBlur stdDeviation="1" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>
  
              {/* US probe with realistic shape */}
              <rect x={xOff + 50} y={0} width="80" height="9" rx="4.5" fill="hsl(var(--muted-foreground))" opacity="0.25" stroke="hsl(var(--border))" strokeWidth="0.75" />
              <rect x={xOff + 55} y={7} width="70" height="3" rx="1" fill="hsl(var(--muted-foreground))" opacity="0.15" stroke="hsl(var(--border))" strokeWidth="0.75" />
              <text x={xOff + 90} y={7} fontSize="5" textAnchor="middle" fill="hsl(var(--foreground))" opacity="0.55" fontWeight="600">US Probe</text>
  
              {/* US beam cone */}
              <path d={`M${xOff + 60},10 L${xOff + 42},${layerGeom["tap-plane"].y + 6} M${xOff + 120},10 L${xOff + 138},${layerGeom["tap-plane"].y + 6}`}
                stroke="hsl(45, 80%, 60%)" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.15" fill="none" />
              {/* Beam fill */}
              <path d={`M${xOff + 60},10 L${xOff + 42},${layerGeom["tap-plane"].y + 6} L${xOff + 138},${layerGeom["tap-plane"].y + 6} L${xOff + 120},10 Z`}
                fill="hsl(45, 80%, 60%)" opacity="0.03" />
  
              {/* Needle trajectory with realistic bevel */}
              <path d={`M${xOff + layerW + 15},18 C${xOff + layerW + 5},50 ${xOff + layerW - 15},90 ${xOff + layerW / 2 + 20},${layerGeom["tap-plane"].y + 6}`}
                stroke="hsl(var(--muted-foreground))" strokeWidth="2" strokeDasharray="5 2" opacity="0.35" fill="none" />
              {/* Needle shaft sheen */}
              <path d={`M${xOff + layerW + 15},18 C${xOff + layerW + 5},50 ${xOff + layerW - 15},90 ${xOff + layerW / 2 + 20},${layerGeom["tap-plane"].y + 6}`}
                stroke="hsl(0, 0%, 80%)" strokeWidth="0.5" opacity="0.2" fill="none" />
              <text x={xOff + layerW + 18} y="17" fontSize="5.5" fill="hsl(var(--muted-foreground))" fontWeight="600">Block needle</text>
              {/* Needle tip with bevel */}
              <circle cx={xOff + layerW / 2 + 20} cy={layerGeom["tap-plane"].y + 6} r="2.5" fill="hsl(45, 90%, 50%)" opacity="0.7" />
              <circle cx={xOff + layerW / 2 + 20} cy={layerGeom["tap-plane"].y + 6} r="5" fill="hsl(45, 90%, 50%)" opacity="0.12" />
  
              {/* LA spread in TAP plane */}
              {selected === "tap-plane" && (
                <ellipse cx={xOff + layerW / 2 + 20} cy={layerGeom["tap-plane"].y + 6} rx="35" ry="4" fill="hsl(180, 60%, 55%)" opacity="0.12">
                  <animate attributeName="rx" values="25;40;25" dur="3s" repeatCount="indefinite" />
                </ellipse>
              )}
  
              {layerOrder.map((key) => {
                const l = layers[key];
                const g = layerGeom[key];
                const isActive = selected === key;
                const isTAP = key === "tap-plane";
  
                return (
                      <g key={key} className="cursor-pointer" onClick={() => setSelected(key)}>
                    {/* Base layer */}
                    <rect
                      x={xOff}
                      y={g.y}
                      width={layerW}
                      height={g.h}
                      rx={key === "skin" ? 3 : 1}
                      fill={l.color}
                      fillOpacity={isActive ? 0.55 : isTAP ? 0.45 : 0.18}
                      stroke={isActive ? l.color : isTAP ? l.color : "transparent"}
                      strokeWidth={isActive ? 2.5 : isTAP ? 1.5 : 0}
                      strokeDasharray={isTAP && !isActive ? "4 2" : ""}
                      className="transition-all duration-200"
                    />
  
                    {/* Skin: stippled texture + hair follicles */}
                    {key === "skin" && (
                      <g>
                        <rect x={xOff} y={g.y} width={layerW} height={g.h} rx={3} fill="url(#skinTex)" />
                        {/* Hair follicle hints */}
                        <g opacity={isActive ? 0.35 : 0.12}>
                          {[30, 65, 100, 135, 165].map((hx, i) => (
                            <g key={i}>
                              <line x1={xOff + hx} y1={g.y + 2} x2={xOff + hx - 1} y2={g.y + g.h - 2} stroke="hsl(25, 35%, 45%)" strokeWidth="0.5" />
                              <ellipse cx={xOff + hx} cy={g.y + g.h - 1} rx="1.5" ry="1" fill="hsl(25, 40%, 50%)" opacity="0.3" />
                            </g>
                          ))}
                        </g>
                      </g>
                    )}
  
                    {/* Camper's: fat globule texture */}
                    {key === "camper" && (
                      <g opacity={isActive ? 0.6 : 0.2}>
                        <rect x={xOff} y={g.y} width={layerW} height={g.h} fill="url(#fatTex)" />
                        {/* Superficial vessels */}
                        <path d={`M${xOff + 40},${g.y + 4} C${xOff + 55},${g.y + 8} ${xOff + 70},${g.y + 10} ${xOff + 90},${g.y + 7}`}
                          stroke="hsl(0, 50%, 55%)" strokeWidth="0.75" fill="none" opacity="0.4" />
                        <path d={`M${xOff + 120},${g.y + 6} C${xOff + 140},${g.y + 10} ${xOff + 155},${g.y + 12} ${xOff + 170},${g.y + 9}`}
                          stroke="hsl(220, 45%, 55%)" strokeWidth="0.75" fill="none" opacity="0.3" />
                      </g>
                    )}
  
                    {/* Scarpa's: dense fibrous membrane */}
                    {key === "scarpa" && (
                      <rect x={xOff} y={g.y} width={layerW} height={g.h} fill="url(#fasciaTex)" opacity={isActive ? 0.8 : 0.3} />
                    )}
  
                    {/* External oblique: diagonal fibres down-medial */}
                    {key === "ext-oblique" && (
                      <g>
                        <rect x={xOff} y={g.y} width={layerW} height={g.h} fill="url(#eoFibre)" opacity={isActive ? 1 : 0.5} />
                        {/* Connective tissue septa */}
                        <g opacity={isActive ? 0.2 : 0.06}>
                          {[0, 1, 2].map(i => (
                            <line key={i} x1={xOff + 5} y1={g.y + 8 + i * 10} x2={xOff + layerW - 5} y2={g.y + 8 + i * 10}
                              stroke="hsl(0, 0%, 70%)" strokeWidth="0.5" strokeDasharray="2 4" />
                          ))}
                        </g>
                        {/* Fibre direction arrow */}
                        <g opacity={isActive ? 0.35 : 0.1}>
                          <path d={`M${xOff + 30},${g.y + 6} L${xOff + 80},${g.y + g.h - 6}`} stroke="hsl(0, 60%, 60%)" strokeWidth="1" fill="none" markerEnd="none" />
                          <text x={xOff + 55} y={g.y + g.h / 2 - 2} fontSize="4" fill="hsl(0, 55%, 55%)" transform={`rotate(-30, ${xOff + 55}, ${g.y + g.h / 2 - 2})`}>fibres ↘</text>
                        </g>
                      </g>
                    )}
  
                    {/* Internal oblique: diagonal fibres up-medial */}
                    {key === "int-oblique" && (
                      <g>
                        <rect x={xOff} y={g.y} width={layerW} height={g.h} fill="url(#ioFibre)" opacity={isActive ? 1 : 0.5} />
                        {/* Fibre direction */}
                        <g opacity={isActive ? 0.35 : 0.1}>
                          <text x={xOff + 55} y={g.y + g.h / 2 - 2} fontSize="4" fill="hsl(210, 55%, 52%)" transform={`rotate(30, ${xOff + 55}, ${g.y + g.h / 2 - 2})`}>fibres ↗</text>
                        </g>
                      </g>
                    )}
  
                    {/* TAP plane: nerve cross-sections + fascial shimmer */}
                    {isTAP && (
                      <g>
                        {/* Nerve cross-sections - realistic circles with myelin */}
                        {[18, 40, 62, 84, 106, 128, 150, 172].map((nx, i) => (
                          <g key={i} opacity={isActive ? 0.9 : 0.45}>
                            <circle cx={xOff + nx} cy={g.y + g.h / 2} r="3.5" fill="hsl(45, 80%, 85%)" stroke="hsl(45, 70%, 45%)" strokeWidth="0.75" />
                            <circle cx={xOff + nx} cy={g.y + g.h / 2} r="1.8" fill="hsl(45, 90%, 50%)" opacity="0.6" />
                            <circle cx={xOff + nx} cy={g.y + g.h / 2} r="0.8" fill="hsl(0, 0%, 30%)" opacity="0.5" />
                          </g>
                        ))}
                        <text x={xOff + layerW / 2} y={g.y - 2} fontSize="4.5" textAnchor="middle" fill="hsl(45, 90%, 50%)" fontWeight="bold" opacity={isActive ? 1 : 0.6}>T7–L1 nerve branches (incl. ilioinguinal &amp; iliohypogastric, L1)</text>
                      </g>
                    )}
  
                    {/* Transversus: horizontal fibres */}
                    {key === "transversus" && (
                      <g>
                        <rect x={xOff} y={g.y} width={layerW} height={g.h} fill="url(#taFibre)" opacity={isActive ? 1 : 0.5} />
                        <g opacity={isActive ? 0.35 : 0.1}>
                          <text x={xOff + layerW / 2} y={g.y + g.h / 2 + 1} fontSize="4" fill="hsl(160, 50%, 48%)" textAnchor="middle">fibres →</text>
                        </g>
                      </g>
                    )}
  
                    {/* Transversalis: thin fascial line */}
                    {key === "transversalis" && (
                      <rect x={xOff} y={g.y} width={layerW} height={g.h} fill="url(#fasciaTex)" opacity={isActive ? 0.7 : 0.25} />
                    )}
  
                    {/* Extraperitoneal fat — lateral wall view only.
                        The inferior epigastric vessels run medially within the
                        rectus sheath (deep to rectus abdominis) and are NOT in
                        the TAP plane, so they are not drawn here to avoid
                        confusing learners about the relevant anatomy for a
                        lateral TAP block. */}
                    {key === "extraperitoneal" && (
                      <g opacity={isActive ? 0.6 : 0.2}>
                        <rect x={xOff} y={g.y} width={layerW} height={g.h} fill="url(#fatTex)" />
                      </g>
                    )}
  
                    {/* Peritoneum: glistening membrane effect */}
                    {key === "peritoneum" && (
                      <g>
                        <rect x={xOff} y={g.y} width={layerW} height={g.h} rx={1} fill="url(#peritonealGrad)" />
                        {/* Mesothelial cell layer suggestion */}
                        <g opacity={isActive ? 0.25 : 0.08}>
                          {Array.from({ length: 20 }).map((_, i) => (
                            <circle key={i} cx={xOff + 8 + i * 9} cy={g.y + 3} r="0.8" fill="hsl(280, 40%, 55%)" />
                          ))}
                        </g>
                        {/* Peritoneal cavity label */}
                        <g opacity={isActive ? 0.4 : 0.15}>
                          <text x={xOff + layerW / 2} y={g.y + g.h + 8} fontSize="5" textAnchor="middle" fill="hsl(var(--muted-foreground))" fontStyle="italic">← Peritoneal cavity →</text>
                        </g>
                      </g>
                    )}
  
                    {/* Layer label */}
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
  
              {/* Depth scale bar */}
              <g opacity="0.3">
                <line x1={xOff - 6} y1={layerGeom.skin.y} x2={xOff - 6} y2={layerGeom.peritoneum.y + layerGeom.peritoneum.h}
                  stroke="hsl(var(--muted-foreground))" strokeWidth="0.75" />
                <line x1={xOff - 9} y1={layerGeom.skin.y} x2={xOff - 3} y2={layerGeom.skin.y}
                  stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
                <line x1={xOff - 9} y1={layerGeom.peritoneum.y + layerGeom.peritoneum.h} x2={xOff - 3} y2={layerGeom.peritoneum.y + layerGeom.peritoneum.h}
                  stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" />
                <text x={xOff - 6} y={layerGeom.skin.y + (layerGeom.peritoneum.y + layerGeom.peritoneum.h - layerGeom.skin.y) / 2} fontSize="4" textAnchor="middle" fill="hsl(var(--muted-foreground))" transform={`rotate(-90, ${xOff - 6}, ${layerGeom.skin.y + (layerGeom.peritoneum.y + layerGeom.peritoneum.h - layerGeom.skin.y) / 2})`}>Deep →</text>
              </g>
  
              {/* Rectus abdominis is a midline structure and is not present in the lateral
                  TAP-block plane shown here, so no rectus label is drawn on this view. */}
            </svg>
          </div>
  
          <div className="flex-1 min-w-0">
            <div
              className="p-3 rounded-lg border border-border bg-background/80 space-y-1.5 min-h-[110px]"
              style={{ borderLeftWidth: 4, borderLeftColor: info.color }}
              key={selected}
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
    </DiagramFigure>
  );
};

export default AbdominalWallDiagram;
