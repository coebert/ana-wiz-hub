import { useState } from "react";

interface DermatomeInfo {
  id: string;
  level: string;
  landmark: string;
  blockRelevance: string;
  color: string;
  paths: string[];
  labelPos: { x: number; y: number; side: "left" | "right" };
}

const dermatomes: DermatomeInfo[] = [
  {
    id: "c5", level: "C5", landmark: "Lateral arm (regimental badge area — deltoid)", blockRelevance: "Interscalene block (C5–C6 roots)",
    color: "hsl(0, 65%, 55%)",
    paths: [
      // Left lateral deltoid area
      "M54,108 C48,112 42,120 40,130 C38,138 42,142 48,140 C54,138 58,132 60,124 C62,116 58,110 54,108 Z",
      // Right
      "M146,108 C152,112 158,120 160,130 C162,138 158,142 152,140 C146,138 142,132 140,124 C138,116 142,110 146,108 Z",
    ],
    labelPos: { x: 22, y: 125, side: "left" },
  },
  {
    id: "c6", level: "C6", landmark: "Lateral forearm, thumb, and index finger", blockRelevance: "Supraclavicular block",
    color: "hsl(20, 70%, 55%)",
    paths: [
      // Left lateral forearm to thumb
      "M38,140 C34,150 30,162 28,175 C26,185 24,195 22,205 C20,212 22,216 26,214 C30,210 32,200 34,188 C36,176 40,160 44,148 C46,142 42,138 38,140 Z",
      // Right
      "M162,140 C166,150 170,162 172,175 C174,185 176,195 178,205 C180,212 178,216 174,214 C170,210 168,200 166,188 C164,176 160,160 156,148 C154,142 158,138 162,140 Z",
    ],
    labelPos: { x: 8, y: 175, side: "left" },
  },
  {
    id: "c7", level: "C7", landmark: "Middle finger (dorsal and palmar)", blockRelevance: "Supraclavicular block",
    color: "hsl(45, 65%, 48%)",
    paths: [
      "M22,205 C20,212 18,218 17,224 C16,228 18,230 22,228 C24,225 24,218 24,210 Z",
      "M178,205 C180,212 182,218 183,224 C184,228 182,230 178,228 C176,225 176,218 176,210 Z",
    ],
    labelPos: { x: 4, y: 222, side: "left" },
  },
  {
    id: "c8", level: "C8", landmark: "Medial forearm, ring and little finger", blockRelevance: "Infraclavicular block",
    color: "hsl(60, 55%, 48%)",
    paths: [
      "M48,140 C52,150 54,162 54,175 C54,188 52,200 48,210 C46,216 42,218 40,214 C38,210 40,198 42,186 C44,174 44,160 46,148 C46,142 48,140 48,140 Z",
      "M152,140 C148,150 146,162 146,175 C146,188 148,200 152,210 C154,216 158,218 160,214 C162,210 160,198 158,186 C156,174 156,160 154,148 C154,142 152,140 152,140 Z",
    ],
    labelPos: { x: 186, y: 175, side: "right" },
  },
  {
    id: "t1", level: "T1", landmark: "Medial arm (axilla to elbow)", blockRelevance: "Infraclavicular / axillary block",
    color: "hsl(80, 55%, 48%)",
    paths: [
      "M56,114 C58,120 60,130 60,138 C60,142 58,144 54,142 C52,138 52,128 54,118 Z",
      "M144,114 C142,120 140,130 140,138 C140,142 142,144 146,142 C148,138 148,128 146,118 Z",
    ],
    labelPos: { x: 186, y: 130, side: "right" },
  },
  {
    id: "t4", level: "T4", landmark: "Nipple line (4th intercostal space)", blockRelevance: "High thoracic epidural / paravertebral",
    color: "hsl(120, 48%, 48%)",
    paths: [
      "M74,112 C72,116 70,120 70,126 C70,132 72,134 80,134 C88,134 96,134 100,134 C104,134 106,132 106,126 C106,120 104,116 102,112 Z",
    ],
    labelPos: { x: 186, y: 124, side: "right" },
  },
  {
    id: "t6", level: "T6", landmark: "Xiphisternum / xiphoid process", blockRelevance: "Mid-thoracic epidural",
    color: "hsl(150, 48%, 48%)",
    paths: [
      "M72,134 C70,140 68,146 68,152 C68,156 72,158 80,158 C90,158 100,158 106,158 C112,158 114,156 114,152 C114,146 112,140 110,134 Z",
    ],
    labelPos: { x: 186, y: 146, side: "right" },
  },
  {
    id: "t10", level: "T10", landmark: "Umbilicus", blockRelevance: "TAP block / low thoracic epidural",
    color: "hsl(180, 48%, 48%)",
    paths: [
      "M70,168 C68,176 66,184 66,192 C66,198 70,200 80,200 C90,200 100,200 108,200 C116,200 118,198 118,192 C118,184 116,176 114,168 Z",
    ],
    labelPos: { x: 186, y: 186, side: "right" },
  },
  {
    id: "l1", level: "L1", landmark: "Inguinal ligament / groin crease", blockRelevance: "Ilioinguinal nerve block / TAP block",
    color: "hsl(210, 58%, 52%)",
    paths: [
      // Groin region splitting to legs
      "M70,200 C68,208 66,216 68,222 C70,226 76,228 82,226 C86,224 88,220 88,214 C88,208 86,204 82,200 Z",
      "M114,200 C116,208 118,216 116,222 C114,226 108,228 102,226 C98,224 96,220 96,214 C96,208 98,204 102,200 Z",
    ],
    labelPos: { x: 186, y: 215, side: "right" },
  },
  {
    id: "l3", level: "L3", landmark: "Anterior knee (patella)", blockRelevance: "Femoral nerve / adductor canal block",
    color: "hsl(240, 52%, 58%)",
    paths: [
      "M76,270 C74,278 72,286 72,294 C72,302 76,306 82,306 C86,306 90,302 90,294 C90,286 88,278 86,270 Z",
      "M114,270 C116,278 118,286 118,294 C118,302 114,306 108,306 C104,306 100,302 100,294 C100,286 102,278 104,270 Z",
    ],
    labelPos: { x: 186, y: 290, side: "right" },
  },
  {
    id: "l5", level: "L5", landmark: "Dorsum of foot, great toe, lateral calf", blockRelevance: "Sciatic / common peroneal block",
    color: "hsl(270, 52%, 58%)",
    paths: [
      "M74,350 C72,358 70,366 70,372 C70,378 74,380 80,378 C84,376 86,370 86,364 C86,358 84,352 82,348 Z",
      "M108,350 C110,358 112,366 112,372 C112,378 108,380 102,378 C98,376 96,370 96,364 C96,358 98,352 100,348 Z",
    ],
    labelPos: { x: 186, y: 365, side: "right" },
  },
  {
    id: "s1", level: "S1", landmark: "Lateral foot, sole, posterior calf", blockRelevance: "Sciatic / tibial / ankle block",
    color: "hsl(300, 48%, 52%)",
    paths: [
      "M72,378 C70,384 68,390 70,394 C72,398 78,398 82,396 C86,394 86,388 84,382 Z",
      "M110,378 C112,384 114,390 112,394 C110,398 104,398 100,396 C96,394 96,388 98,382 Z",
    ],
    labelPos: { x: 186, y: 390, side: "right" },
  },
];

const DermatomeDiagram = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const active = dermatomes.find(d => d.id === selected);

  return (
    <div className="border border-border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">Interactive Dermatome Map</h3>
      <p className="text-xs text-muted-foreground mb-3">Tap a dermatome region to see its clinical landmark and relevant nerve block</p>

      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="flex-shrink-0 mx-auto">
          <svg viewBox="0 0 200 410" width="200" height="410" className="border border-border rounded">
            {/* Anatomical body outline - anterior view */}
            <g stroke="hsl(var(--muted-foreground))" strokeWidth="0.8" fill="none" opacity="0.35">
              {/* Head */}
              <ellipse cx="100" cy="30" rx="18" ry="22" />
              {/* Neck */}
              <path d="M88,50 C86,56 82,62 78,68" />
              <path d="M112,50 C114,56 118,62 122,68" />
              {/* Shoulders */}
              <path d="M78,68 C68,72 58,80 52,90 C46,100 42,112 38,125" />
              <path d="M122,68 C132,72 142,80 148,90 C154,100 158,112 162,125" />
              {/* Torso - anatomical taper */}
              <path d="M78,68 C76,80 72,95 70,110 C68,130 66,150 66,170 C66,190 68,205 70,215" />
              <path d="M122,68 C124,80 128,95 130,110 C132,130 134,150 134,170 C134,190 132,205 130,215" />
              {/* Arms - left */}
              <path d="M38,125 C34,140 30,158 26,175 C22,192 20,208 18,220" />
              <path d="M52,125 C50,138 48,152 46,168 C44,184 42,200 42,215" />
              {/* Arms - right */}
              <path d="M162,125 C166,140 170,158 174,175 C178,192 180,208 182,220" />
              <path d="M148,125 C150,138 152,152 154,168 C156,184 158,200 158,215" />
              {/* Hands */}
              <path d="M18,220 C16,226 15,232 18,234 C20,232 22,226 24,220" />
              <path d="M42,215 C44,220 45,226 42,228 C40,226 38,220 38,214" />
              <path d="M182,220 C184,226 185,232 182,234 C180,232 178,226 176,220" />
              <path d="M158,215 C156,220 155,226 158,228 C160,226 162,220 162,214" />
              {/* Pelvis */}
              <path d="M70,215 C72,222 76,228 82,230" />
              <path d="M130,215 C128,222 124,228 118,230" />
              {/* Legs - left */}
              <path d="M82,230 C80,248 78,268 76,288 C74,308 72,328 72,348 C72,368 72,382 70,396" />
              <path d="M92,230 C92,248 90,268 88,288 C88,308 86,328 86,348 C86,368 84,382 84,396" />
              {/* Legs - right */}
              <path d="M108,230 C110,248 112,268 114,288 C116,308 118,328 118,348 C118,368 118,382 120,396" />
              <path d="M100,230 C100,248 102,268 104,288 C104,308 106,328 106,348 C106,368 108,382 108,396" />
              {/* Feet */}
              <path d="M70,396 C68,400 68,404 74,404 C80,404 84,402 84,396" />
              <path d="M120,396 C122,400 122,404 116,404 C110,404 108,402 108,396" />
              {/* Umbilicus marker */}
              <circle cx="100" cy="188" r="2" />
              {/* Nipple markers */}
              <circle cx="85" cy="124" r="1.5" />
              <circle cx="115" cy="124" r="1.5" />
            </g>

            {/* Midline */}
            <line x1="100" y1="52" x2="100" y2="230" stroke="hsl(var(--muted-foreground))" strokeWidth="0.3" strokeDasharray="2 4" opacity="0.2" />

            {/* Dermatome regions */}
            {dermatomes.map((d) => (
              <g key={d.id}>
                {d.paths.map((path, i) => (
                  <path
                    key={i}
                    d={path}
                    fill={d.color}
                    fillOpacity={selected === d.id ? 0.6 : 0.2}
                    stroke={selected === d.id ? d.color : "transparent"}
                    strokeWidth={selected === d.id ? 1.5 : 0}
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => setSelected(selected === d.id ? null : d.id)}
                  />
                ))}
              </g>
            ))}

            {/* Level labels with leader lines */}
            {dermatomes.map((d) => {
              const isActive = selected === d.id;
              return (
                <text
                  key={d.id + "-label"}
                  x={d.labelPos.x}
                  y={d.labelPos.y}
                  fontSize="7"
                  fill={isActive ? d.color : "hsl(var(--muted-foreground))"}
                  fontWeight={isActive ? "bold" : "normal"}
                  textAnchor={d.labelPos.side === "left" ? "start" : "start"}
                  className="cursor-pointer select-none"
                  onClick={() => setSelected(selected === d.id ? null : d.id)}
                >
                  {d.level}
                </text>
              );
            })}

            {/* Key landmark annotations */}
            <g opacity="0.35" fontSize="4.5" fill="hsl(var(--muted-foreground))">
              <text x="126" y="126">← nipple (T4)</text>
              <text x="108" y="190">← umbilicus (T10)</text>
            </g>
          </svg>
        </div>

        {/* Info panel */}
        <div className="flex-1 min-w-0">
          {active ? (
            <div className="p-4 rounded-lg border border-border animate-fade-in">
              <p className="text-lg font-bold" style={{ color: active.color }}>{active.level}</p>
              <p className="text-sm text-foreground font-semibold mt-1">Landmark</p>
              <p className="text-sm text-muted-foreground">{active.landmark}</p>
              <p className="text-sm text-foreground font-semibold mt-2">Block Relevance</p>
              <p className="text-sm text-muted-foreground">{active.blockRelevance}</p>
            </div>
          ) : (
            <div className="space-y-1.5">
              {dermatomes.map(d => (
                <button
                  key={d.id}
                  onClick={() => setSelected(d.id)}
                  className="flex items-center gap-2 w-full text-left px-2 py-1 rounded hover:bg-secondary/50 transition-colors text-sm"
                >
                  <span className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: d.color, opacity: 0.7 }} />
                  <span className="text-foreground font-medium">{d.level}</span>
                  <span className="text-muted-foreground text-xs truncate">{d.landmark}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DermatomeDiagram;
