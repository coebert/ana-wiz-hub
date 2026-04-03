import { useState } from "react";

interface DermatomeInfo {
  id: string;
  level: string;
  landmark: string;
  blockRelevance: string;
  color: string;
  paths: string[];
}

const dermatomes: DermatomeInfo[] = [
  { id: "c5", level: "C5", landmark: "Lateral arm (regimental badge area)", blockRelevance: "Interscalene block", color: "hsl(0, 70%, 60%)", paths: [
    "M120,120 Q130,110 145,115 Q155,125 150,140 Q140,135 130,130 Z"
  ]},
  { id: "c6", level: "C6", landmark: "Lateral forearm & thumb", blockRelevance: "Supraclavicular block", color: "hsl(20, 70%, 60%)", paths: [
    "M145,140 Q155,135 165,145 Q168,160 160,175 Q150,170 145,155 Z"
  ]},
  { id: "c7", level: "C7", landmark: "Middle finger", blockRelevance: "Supraclavicular block", color: "hsl(40, 70%, 55%)", paths: [
    "M160,175 Q168,170 175,180 Q178,195 172,205 Q163,198 158,188 Z"
  ]},
  { id: "c8", level: "C8", landmark: "Medial forearm & ring/little finger", blockRelevance: "Infraclavicular block", color: "hsl(60, 60%, 50%)", paths: [
    "M150,140 Q140,150 135,165 Q130,180 135,190 Q145,185 150,170 Z"
  ]},
  { id: "t1", level: "T1", landmark: "Medial arm", blockRelevance: "Infraclavicular / axillary block", color: "hsl(80, 60%, 50%)", paths: [
    "M125,130 Q118,140 115,155 Q120,160 130,150 Q135,140 130,132 Z"
  ]},
  { id: "t4", level: "T4", landmark: "Nipple line", blockRelevance: "High thoracic epidural", color: "hsl(120, 50%, 50%)", paths: [
    "M80,145 Q85,140 110,140 Q115,145 115,155 Q110,158 85,158 Q80,155 Z"
  ]},
  { id: "t6", level: "T6", landmark: "Xiphisternum", blockRelevance: "Mid-thoracic epidural", color: "hsl(150, 50%, 50%)", paths: [
    "M80,158 Q85,155 110,155 Q115,158 115,170 Q110,173 85,173 Q80,170 Z"
  ]},
  { id: "t10", level: "T10", landmark: "Umbilicus", blockRelevance: "TAP block / low epidural", color: "hsl(180, 50%, 50%)", paths: [
    "M78,185 Q83,182 112,182 Q117,185 117,200 Q112,203 83,203 Q78,200 Z"
  ]},
  { id: "l1", level: "L1", landmark: "Inguinal ligament / groin", blockRelevance: "Ilioinguinal / TAP block", color: "hsl(210, 60%, 55%)", paths: [
    "M78,203 Q83,200 100,200 Q105,205 105,218 Q100,222 88,222 Q80,218 Z",
    "M95,203 Q100,200 112,200 Q117,205 117,218 Q112,222 105,222 Q100,218 Z"
  ]},
  { id: "l3", level: "L3", landmark: "Anterior knee", blockRelevance: "Femoral / adductor canal block", color: "hsl(240, 55%, 60%)", paths: [
    "M82,265 Q88,258 96,258 Q100,265 100,280 Q96,288 88,288 Q82,280 Z",
    "M100,265 Q106,258 114,258 Q118,265 118,280 Q114,288 106,288 Q100,280 Z"
  ]},
  { id: "l5", level: "L5", landmark: "Dorsum of foot / great toe", blockRelevance: "Sciatic / popliteal block", color: "hsl(270, 55%, 60%)", paths: [
    "M84,340 Q88,335 94,335 Q98,340 98,355 Q94,360 88,360 Q84,355 Z",
    "M102,340 Q106,335 112,335 Q116,340 116,355 Q112,360 106,360 Q102,355 Z"
  ]},
  { id: "s1", level: "S1", landmark: "Lateral foot / sole", blockRelevance: "Sciatic / ankle block", color: "hsl(300, 50%, 55%)", paths: [
    "M86,355 Q90,352 96,355 Q100,362 96,370 Q90,372 86,368 Z",
    "M104,355 Q108,352 114,355 Q118,362 114,370 Q108,372 104,368 Z"
  ]},
];

const DermatomeDiagram = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const active = dermatomes.find(d => d.id === selected);

  return (
    <div className="border border-border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">Interactive Dermatome Map</h3>
      <p className="text-xs text-muted-foreground mb-3">Tap a dermatome region to see its clinical landmark and relevant nerve block</p>

      <div className="flex flex-col sm:flex-row gap-4 items-start">
        {/* SVG Body */}
        <div className="flex-shrink-0 mx-auto">
          <svg viewBox="55 60 95 330" width="200" height="380" className="border border-border rounded">
            {/* Body outline */}
            <g stroke="hsl(var(--muted-foreground))" strokeWidth="0.8" fill="none" opacity="0.4">
              {/* Head */}
              <ellipse cx="97" cy="80" rx="14" ry="16" />
              {/* Neck */}
              <line x1="91" y1="96" x2="88" y2="108" />
              <line x1="103" y1="96" x2="107" y2="108" />
              {/* Torso */}
              <path d="M78,108 Q75,140 75,180 Q75,210 80,225 L80,225" />
              <path d="M117,108 Q120,140 120,180 Q120,210 115,225 L115,225" />
              {/* Arms left */}
              <path d="M78,108 Q65,115 55,145 Q50,170 48,200 Q47,210 50,215" />
              <path d="M78,120 Q70,125 62,145 Q58,165 56,195 Q55,205 57,210" />
              {/* Arms right */}
              <path d="M117,108 Q130,115 140,145 Q145,170 147,200 Q148,210 145,215" />
              <path d="M117,120 Q125,125 133,145 Q137,165 139,195 Q140,205 138,210" />
              {/* Legs */}
              <path d="M80,225 Q78,260 80,300 Q82,330 84,360 Q85,375 88,385" />
              <path d="M100,225 Q98,260 96,300 Q94,330 92,360 Q91,375 88,385" />
              <path d="M115,225 Q117,260 115,300 Q113,330 112,360 Q111,375 108,385" />
              <path d="M96,225 Q98,260 100,300 Q102,330 104,360 Q105,375 108,385" />
            </g>

            {/* Dermatome regions */}
            {dermatomes.map((d) => (
              <g key={d.id}>
                {d.paths.map((path, i) => (
                  <path
                    key={i}
                    d={path}
                    fill={d.color}
                    fillOpacity={selected === d.id ? 0.7 : 0.3}
                    stroke={selected === d.id ? d.color : "transparent"}
                    strokeWidth={selected === d.id ? 1.5 : 0}
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => setSelected(selected === d.id ? null : d.id)}
                  />
                ))}
              </g>
            ))}

            {/* Labels */}
            {dermatomes.map((d) => {
              const firstPath = d.paths[0];
              // Approximate label position from first coordinate in path
              const match = firstPath.match(/M([\d.]+),([\d.]+)/);
              if (!match) return null;
              const x = parseFloat(match[1]) + 8;
              const y = parseFloat(match[2]) + 10;
              return (
                <text
                  key={d.id + "-label"}
                  x={x > 110 ? x + 12 : x - 18}
                  y={y}
                  fontSize="7"
                  fill={selected === d.id ? d.color : "hsl(var(--muted-foreground))"}
                  fontWeight={selected === d.id ? "bold" : "normal"}
                  className="cursor-pointer select-none"
                  onClick={() => setSelected(selected === d.id ? null : d.id)}
                >
                  {d.level}
                </text>
              );
            })}
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
