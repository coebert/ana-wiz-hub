import { useState } from "react";
import { DiagramToggleBar } from "./DiagramToggleBar";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * Paediatric caudal epidural — POSTERIOR surface-anatomy plate.
 * View: posterior (viewer faces patient's back). Patient's RIGHT = viewer's LEFT.
 *
 * Shows the surface landmarks for siting a caudal: posterior superior iliac
 * spines (PSIS dimples), the natal cleft, the equilateral triangle PSIS–PSIS–
 * sacral hiatus, the paired sacral cornua flanking the hiatus, the
 * sacrococcygeal membrane and the coccyx.
 */

type Region = "bone" | "landmark" | "soft" | "needle";

type StructureKey =
  | "psis"
  | "iliac-crest"
  | "sacrum"
  | "cornua"
  | "hiatus"
  | "membrane"
  | "coccyx"
  | "natal-cleft"
  | "triangle"
  | "needle-site";

interface Info {
  label: string;
  region: Region;
  detail: string;
  clinical: string;
}

const REGION_COLOR: Record<Region, string> = {
  bone: "hsl(35, 35%, 55%)",
  landmark: "hsl(0, 70%, 50%)",
  soft: "hsl(20, 30%, 70%)",
  needle: "hsl(220, 75%, 45%)",
};

const STRUCTURES: Record<StructureKey, Info> = {
  psis: {
    label: "Posterior superior iliac spines (PSIS)",
    region: "landmark",
    detail:
      "Paired bony prominences felt as the 'sacral dimples' of Venus, ~5 cm lateral to the midline at the S2 level. Mark the upper two corners of the equilateral landmark triangle.",
    clinical:
      "Easily palpated even in chubby infants. PSIS = level of S2 = caudal-most extent of dural sac in adults; in neonates the dura may extend as low as S3–S4 — never advance the needle cephalad past the membrane.",
  },
  "iliac-crest": {
    label: "Iliac crest (Tuffier's line)",
    region: "bone",
    detail:
      "Highest point of the iliac crest crosses the L4 spinous process / L4–L5 interspace in adults. In infants this line lies one segment lower (L5/S1).",
    clinical:
      "Useful orientation landmark but NOT the target — caudal needle goes 5–10 cm caudal to this, at the sacral hiatus.",
  },
  sacrum: {
    label: "Sacrum",
    region: "bone",
    detail:
      "Triangular fusion of S1–S5 vertebrae. Posterior surface bears the median sacral crest (fused spinous processes) and lateral sacral crests. Incomplete fusion of S5 (and often S4) laminae creates the sacral hiatus.",
    clinical:
      "Ossifies progressively through childhood and adolescence — landmarks become less distinct, success rate falls, and ultrasound-guided technique is preferred from ~7 years onward.",
  },
  cornua: {
    label: "Sacral cornua",
    region: "landmark",
    detail:
      "Paired bony prominences either side of the sacral hiatus, formed by the inferior articular processes of S5. Roll a finger from coccyx upwards in the midline — the cornua are the first paired bumps you feel.",
    clinical:
      "The single most reliable landmark for the caudal block. Once both cornua are between thumb and index finger, the needle entry point lies in the depression directly between them — the centre of the sacrococcygeal membrane.",
  },
  hiatus: {
    label: "Sacral hiatus",
    region: "landmark",
    detail:
      "U- or V-shaped opening at the lower end of the sacrum, bounded by the cornua laterally and the body of S5 superiorly. Apex of the equilateral triangle PSIS–PSIS–hiatus.",
    clinical:
      "Insertion point for the caudal needle. The triangle rule (PSIS dimples + hiatus form an equilateral triangle of side ~5 cm in toddlers) is a quick cross-check when the cornua are difficult to palpate.",
  },
  membrane: {
    label: "Sacrococcygeal membrane",
    region: "soft",
    detail:
      "Continuation of the ligamentum flavum closing the sacral hiatus. Pierced by the caudal needle to enter the sacral epidural space — felt as a definite 'pop' or loss of resistance.",
    clinical:
      "After the pop, drop the needle hub towards the skin (angle ~20° to the surface) and advance only a few millimetres before injecting — deeper advancement risks dural puncture, intra-osseous or intravascular placement.",
  },
  coccyx: {
    label: "Coccyx",
    region: "bone",
    detail:
      "Three to five fused rudimentary vertebrae forming the tip of the spine, immediately caudal to the sacral hiatus.",
    clinical:
      "Useful starting point: palpate the coccyx in the natal cleft and walk fingers cephalad until the cornua are felt.",
  },
  "natal-cleft": {
    label: "Natal (gluteal) cleft",
    region: "soft",
    detail:
      "Midline groove between the buttocks, overlying the coccyx and lower sacrum.",
    clinical:
      "Position the child in lateral decubitus with hips and knees flexed (knee-chest). Aseptic prep extends from PSIS down to the upper natal cleft — keep the perianal area outside the sterile field.",
  },
  triangle: {
    label: "Equilateral landmark triangle",
    region: "landmark",
    detail:
      "Triangle formed by the two PSIS dimples and the sacral hiatus. In infants and small children these three points form a near-equilateral triangle of side ~5 cm; geometry is preserved across the paediatric age range.",
    clinical:
      "Quick visual check: if your proposed insertion point does not sit at the apex of an equilateral triangle, re-palpate. Loss of equilaterality (e.g. triangle becomes scalene or shorter) suggests sacral spina bifida occulta — palpate the spinal midline before proceeding.",
  },
  "needle-site": {
    label: "Needle insertion point",
    region: "needle",
    detail:
      "Midline depression directly between the sacral cornua, at the apex of the PSIS–PSIS–hiatus triangle.",
    clinical:
      "22–25 G short-bevel or dedicated caudal needle, 60–70° to skin until 'pop' through the membrane, then drop angle to 20–30° and advance 2–3 mm. Confirm: no blood/CSF on aspiration, no SC swelling on injection, 'whoosh' on stethoscope, ± ultrasound confirmation.",
  },
};

const CaudalSurfaceAnatomyDiagram = () => {
  const [selected, setSelected] = useState<StructureKey>("cornua");
  const [showLabels, setShowLabels] = useState(true);
  const [showTriangle, setShowTriangle] = useState(true);

  const sel = STRUCTURES[selected];
  const accent = REGION_COLOR[sel.region];

  const handle = (k: StructureKey) => () => setSelected(k);

  return (
    <DiagramFigure
      id="caudal-surface-anatomy-diagram"
      title="Caudal surface anatomy"
      description="Auto-generated wrapper for the Caudal surface anatomy anatomical diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
          <div className="my-6 space-y-4">
        <div className="bg-muted/30 rounded-xl border border-border p-4">
          <DiagramToggleBar
            title="Caudal block — surface anatomy"
            subtitle="Posterior view. Tap PSIS dimples, sacral cornua or the hiatus to see the landmark detail."
            toggles={[
              { label: "Labels", active: showLabels, onChange: () => setShowLabels((s) => !s) },
              { label: "Landmark triangle", active: showTriangle, onChange: () => setShowTriangle((s) => !s) },
            ]}
          />
  
          <div className="grid lg:grid-cols-[1fr_auto] gap-4 items-start">
            <svg
              viewBox="0 0 320 420"
              className="w-full h-auto max-w-[420px] mx-auto"
              role="img"
              aria-label="Posterior view of paediatric pelvis showing PSIS, sacral cornua, sacral hiatus and equilateral landmark triangle"
            >
              <defs>
                <radialGradient id="csa-skin" cx="50%" cy="40%" r="65%">
                  <stop offset="0%" stopColor="hsl(25, 45%, 92%)" />
                  <stop offset="100%" stopColor="hsl(25, 35%, 82%)" />
                </radialGradient>
                <radialGradient id="csa-bone" cx="50%" cy="50%" r="60%">
                  <stop offset="0%" stopColor="hsl(35, 45%, 78%)" />
                  <stop offset="100%" stopColor="hsl(35, 35%, 60%)" />
                </radialGradient>
                <pattern id="csa-bone-pattern" patternUnits="userSpaceOnUse" width="6" height="6">
                  <circle cx="3" cy="3" r="0.4" fill="hsl(35, 30%, 45%)" opacity="0.45" />
                </pattern>
                <filter id="csa-shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.18" />
                </filter>
              </defs>
  
              {/* 1. Skin/back outline */}
              <path
                d="M 60 30 C 50 80 45 150 50 220 C 55 290 70 360 95 400 L 225 400 C 250 360 265 290 270 220 C 275 150 270 80 260 30 Z"
                fill="url(#csa-skin)"
                stroke="hsl(var(--border))"
                strokeWidth="1"
                filter="url(#csa-shadow)"
              />
  
              {/* Spine midline (dashed) */}
              <line
                x1="160" y1="40" x2="160" y2="395"
                stroke="hsl(var(--foreground))"
                strokeWidth="0.75"
                strokeDasharray="3 3"
                opacity="0.45"
              />
  
              {/* 2. Iliac crests + ilia (bone) */}
              <g
                onClick={handle("iliac-crest")}
                style={{ cursor: "pointer" }}
              >
                <path
                  d="M 60 150 C 75 130 100 122 130 130 L 130 200 C 100 200 78 195 60 188 Z"
                  fill="url(#csa-bone)"
                  stroke={selected === "iliac-crest" ? REGION_COLOR.bone : "hsl(35, 30%, 45%)"}
                  strokeWidth={selected === "iliac-crest" ? 2 : 1}
                  opacity={selected === "iliac-crest" ? 1 : 0.85}
                />
                <path
                  d="M 260 150 C 245 130 220 122 190 130 L 190 200 C 220 200 242 195 260 188 Z"
                  fill="url(#csa-bone)"
                  stroke={selected === "iliac-crest" ? REGION_COLOR.bone : "hsl(35, 30%, 45%)"}
                  strokeWidth={selected === "iliac-crest" ? 2 : 1}
                  opacity={selected === "iliac-crest" ? 1 : 0.85}
                />
                <path d="M 60 150 C 75 130 100 122 130 130" fill="none" stroke="url(#csa-bone-pattern)" strokeWidth="3" opacity="0.4" />
                <path d="M 260 150 C 245 130 220 122 190 130" fill="none" stroke="url(#csa-bone-pattern)" strokeWidth="3" opacity="0.4" />
              </g>
  
              {/* 3. Sacrum */}
              <g
                onClick={handle("sacrum")}
                style={{ cursor: "pointer" }}
              >
                <path
                  d="M 130 175 L 190 175 C 195 230 192 280 178 320 L 142 320 C 128 280 125 230 130 175 Z"
                  fill="url(#csa-bone)"
                  stroke={selected === "sacrum" ? REGION_COLOR.bone : "hsl(35, 30%, 45%)"}
                  strokeWidth={selected === "sacrum" ? 2 : 1.2}
                  filter="url(#csa-shadow)"
                />
                {/* Median sacral crest (fused spinous processes) */}
                {[195, 220, 245, 275].map((y) => (
                  <ellipse key={y} cx="160" cy={y} rx="5" ry="6" fill="hsl(35, 30%, 50%)" opacity="0.7" />
                ))}
                {/* Posterior sacral foramina */}
                {[200, 230, 260, 290].map((y) => (
                  <g key={`for-${y}`}>
                    <circle cx="142" cy={y} r="2" fill="hsl(35, 25%, 35%)" opacity="0.55" />
                    <circle cx="178" cy={y} r="2" fill="hsl(35, 25%, 35%)" opacity="0.55" />
                  </g>
                ))}
              </g>
  
              {/* 4. Coccyx */}
              <g onClick={handle("coccyx")} style={{ cursor: "pointer" }}>
                <path
                  d="M 152 345 L 168 345 L 165 380 L 155 380 Z"
                  fill="url(#csa-bone)"
                  stroke={selected === "coccyx" ? REGION_COLOR.bone : "hsl(35, 30%, 45%)"}
                  strokeWidth={selected === "coccyx" ? 2 : 1}
                />
              </g>
  
              {/* 5. Sacral hiatus (U-shaped opening) */}
              <g onClick={handle("hiatus")} style={{ cursor: "pointer" }}>
                <path
                  d="M 150 308 C 150 318 153 328 160 332 C 167 328 170 318 170 308 Z"
                  fill="hsl(var(--background))"
                  stroke={selected === "hiatus" ? REGION_COLOR.landmark : "hsl(0, 50%, 40%)"}
                  strokeWidth={selected === "hiatus" ? 2.2 : 1.4}
                />
                {/* Sacrococcygeal membrane (translucent fill across hiatus) */}
                <g onClick={(e) => { e.stopPropagation(); setSelected("membrane"); }} style={{ cursor: "pointer" }}>
                  <path
                    d="M 150 308 C 150 318 153 328 160 332 C 167 328 170 318 170 308 Z"
                    fill={REGION_COLOR.soft}
                    opacity={selected === "membrane" ? 0.55 : 0.30}
                    stroke={selected === "membrane" ? REGION_COLOR.soft : "transparent"}
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />
                </g>
              </g>
  
              {/* 6. Sacral cornua — paired bony prominences flanking the hiatus */}
              <g onClick={handle("cornua")} style={{ cursor: "pointer" }}>
                <ellipse
                  cx="146" cy="306" rx="5" ry="7"
                  fill="url(#csa-bone)"
                  stroke={selected === "cornua" ? REGION_COLOR.landmark : "hsl(35, 30%, 40%)"}
                  strokeWidth={selected === "cornua" ? 2.2 : 1.2}
                />
                <ellipse
                  cx="174" cy="306" rx="5" ry="7"
                  fill="url(#csa-bone)"
                  stroke={selected === "cornua" ? REGION_COLOR.landmark : "hsl(35, 30%, 40%)"}
                  strokeWidth={selected === "cornua" ? 2.2 : 1.2}
                />
              </g>
  
              {/* 7. PSIS dimples */}
              <g onClick={handle("psis")} style={{ cursor: "pointer" }}>
                <circle
                  cx="118" cy="178" r="6"
                  fill="hsl(25, 40%, 75%)"
                  stroke={selected === "psis" ? REGION_COLOR.landmark : "hsl(0, 45%, 35%)"}
                  strokeWidth={selected === "psis" ? 2.4 : 1.2}
                />
                <circle cx="118" cy="178" r="2.4" fill="hsl(25, 30%, 55%)" opacity="0.7" />
                <circle
                  cx="202" cy="178" r="6"
                  fill="hsl(25, 40%, 75%)"
                  stroke={selected === "psis" ? REGION_COLOR.landmark : "hsl(0, 45%, 35%)"}
                  strokeWidth={selected === "psis" ? 2.4 : 1.2}
                />
                <circle cx="202" cy="178" r="2.4" fill="hsl(25, 30%, 55%)" opacity="0.7" />
              </g>
  
              {/* 8. Natal cleft */}
              <g onClick={handle("natal-cleft")} style={{ cursor: "pointer" }}>
                <path
                  d="M 160 340 L 160 400"
                  stroke={selected === "natal-cleft" ? REGION_COLOR.soft : "hsl(20, 25%, 50%)"}
                  strokeWidth={selected === "natal-cleft" ? 3 : 1.6}
                  opacity="0.7"
                  strokeLinecap="round"
                />
              </g>
  
              {/* 9. Equilateral landmark triangle */}
              {showTriangle && (
                <g onClick={handle("triangle")} style={{ cursor: "pointer", pointerEvents: "stroke" }}>
                  <polygon
                    points="118,178 202,178 160,318"
                    fill={REGION_COLOR.landmark}
                    fillOpacity={selected === "triangle" ? 0.18 : 0.08}
                    stroke={selected === "triangle" ? REGION_COLOR.landmark : "hsl(0, 60%, 45%)"}
                    strokeWidth={selected === "triangle" ? 1.8 : 1.2}
                    strokeDasharray="4 3"
                  />
                  {showLabels && (
                    <text x="160" y="240" textAnchor="middle" fontSize="9" fontWeight="600"
                      fill={REGION_COLOR.landmark} opacity="0.85">
                      equilateral
                    </text>
                  )}
                </g>
              )}
  
              {/* 10. Needle insertion site marker */}
              <g onClick={handle("needle-site")} style={{ cursor: "pointer" }}>
                <circle
                  cx="160" cy="318" r={selected === "needle-site" ? 6 : 4}
                  fill={REGION_COLOR.needle}
                  opacity="0.85"
                />
                <line x1="160" y1="318" x2="190" y2="295"
                  stroke={REGION_COLOR.needle}
                  strokeWidth={selected === "needle-site" ? 2.2 : 1.4}
                />
              </g>
  
              {/* Labels */}
              {showLabels && (
                <g fontSize="9" fontWeight="600" fill="hsl(var(--foreground))">
                  <text x="80" y="172" textAnchor="end">PSIS (R)</text>
                  <text x="240" y="172" textAnchor="start">PSIS (L)</text>
                  <text x="50" y="145" textAnchor="end">Iliac crest</text>
                  <text x="270" y="145" textAnchor="start">Iliac crest</text>
                  <text x="105" y="248" textAnchor="end">Sacrum</text>
                  <text x="215" y="248" textAnchor="start">Median crest</text>
                  <text x="105" y="312" textAnchor="end">Sacral cornua</text>
                  <text x="215" y="312" textAnchor="start">Sacral hiatus</text>
                  <text x="195" y="298" textAnchor="start" fill={REGION_COLOR.needle}>insertion point</text>
                  <text x="170" y="378" textAnchor="start">Coccyx</text>
                </g>
              )}
  
              {/* Compass — 4 point */}
              <g fontSize="8" fill="hsl(var(--muted-foreground))" opacity="0.7">
                <text x="160" y="20" textAnchor="middle" fontWeight="700">CEPHALAD</text>
                <text x="160" y="415" textAnchor="middle" fontWeight="700">CAUDAD</text>
                <text x="20" y="215" textAnchor="start" fontWeight="700">RIGHT</text>
                <text x="300" y="215" textAnchor="end" fontWeight="700">LEFT</text>
              </g>
            </svg>
  
            {/* Chip selector */}
            <div className="lg:w-56 flex flex-row lg:flex-col flex-wrap gap-1.5">
              <p className="w-full text-xs font-semibold text-muted-foreground uppercase tracking-wide">Landmarks</p>
              {(Object.keys(STRUCTURES) as StructureKey[]).map((k) => (
                <button
                  key={k}
                  onClick={handle(k)}
                  className={`text-[11px] px-2 py-1 rounded border transition text-left ${
                    selected === k
                      ? "border-primary bg-primary/10 text-foreground font-semibold"
                      : "border-border text-muted-foreground hover:bg-muted/50"
                  }`}
                >
                  {STRUCTURES[k].label}
                </button>
              ))}
            </div>
          </div>
  
          {/* Detail panel */}
          <div
            className="mt-4 p-3 rounded-lg border border-border bg-background/80 space-y-1.5 min-h-[110px]"
            style={{ borderLeftWidth: 4, borderLeftColor: accent }}
          >
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <p className="font-semibold text-foreground text-sm">{sel.label}</p>
              <span
                className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded-md"
                style={{ background: `${accent}26`, color: accent }}
              >
                {sel.region.replace("-", " ")}
              </span>
            </div>
            <p className="text-xs text-muted-foreground"><span className="font-semibold text-foreground">Anatomy:</span> {sel.detail}</p>
            <p className="text-xs text-muted-foreground"><span className="font-semibold text-foreground">Clinical:</span> {sel.clinical}</p>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default CaudalSurfaceAnatomyDiagram;
