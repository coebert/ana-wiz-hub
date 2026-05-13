import { useState } from "react";
import { DiagramToggleBar } from "./DiagramToggleBar";

/**
 * Paediatric caudal epidural block — parasagittal view of the sacrum showing
 * the sacral hiatus, sacrococcygeal membrane, sacral cornua, dural sac
 * termination and needle trajectory. Demonstrates why the block is safer in
 * young children (dura ends higher; hiatus easily palpable) and why landmarks
 * become unreliable after ~7 years.
 *
 * Conforms to STYLE_GUIDE.md: DiagramToggleBar header, prefixed defs ids
 * (cbd-), radial depth gradient, bone pattern, drop-shadow, compass labels,
 * default selection, left-border detail panel keyed to region.
 */

type StructureKey =
  | "skin"
  | "sc-membrane"
  | "cornua"
  | "hiatus"
  | "epidural-fat"
  | "dura"
  | "csf"
  | "cauda"
  | "sacrum"
  | "coccyx"
  | "l5"
  | "needle";

interface StructureInfo {
  label: string;
  region: "soft-tissue" | "ligament" | "epidural" | "dural" | "bone" | "needle";
  color: string;
  detail: string;
  clinical: string;
}

const REGION_COLOR: Record<StructureInfo["region"], string> = {
  "soft-tissue": "hsl(30, 55%, 60%)",
  ligament: "hsl(50, 55%, 50%)",
  epidural: "hsl(140, 45%, 50%)",
  dural: "hsl(270, 40%, 55%)",
  bone: "hsl(35, 35%, 55%)",
  needle: "hsl(var(--muted-foreground))",
};

const STRUCTURES: Record<StructureKey, StructureInfo> = {
  skin: {
    label: "Skin & subcutaneous fat",
    region: "soft-tissue",
    color: "hsl(30, 55%, 65%)",
    detail: "Overlies the sacral hiatus at the apex of an equilateral triangle formed with the posterior superior iliac spines.",
    clinical: "Prep with 0.5% chlorhexidine; child usually positioned in left lateral with hips flexed.",
  },
  "sc-membrane": {
    label: "Sacrococcygeal membrane",
    region: "ligament",
    color: "hsl(50, 60%, 55%)",
    detail: "Fibroelastic membrane covering the sacral hiatus — the analogue of ligamentum flavum at this level.",
    clinical: "A characteristic 'pop' or loss of resistance is felt as the needle passes through this membrane.",
  },
  cornua: {
    label: "Sacral cornua",
    region: "bone",
    color: "hsl(35, 35%, 55%)",
    detail: "Two bony prominences flanking the sacral hiatus — the key palpable landmarks for needle entry.",
    clinical: "Become harder to palpate >7 yrs as fat pad develops; ultrasound increasingly used in older children.",
  },
  hiatus: {
    label: "Sacral hiatus",
    region: "epidural",
    color: "hsl(140, 50%, 55%)",
    detail: "Defect in the posterior wall of S5 created by failed midline fusion of the laminae of S5 (± S4).",
    clinical: "Entry point for caudal block. Anatomy variable — absent/closed in ~5% of adults.",
  },
  "epidural-fat": {
    label: "Caudal epidural fat",
    region: "epidural",
    color: "hsl(140, 45%, 50%)",
    detail: "Loose fat with a sacral venous plexus and the filum terminale externum.",
    clinical: "LA spreads cephalad here; volume (not concentration) determines block height in caudal anaesthesia.",
  },
  dura: {
    label: "Dural sac (terminates S2)",
    region: "dural",
    color: "hsl(270, 45%, 55%)",
    detail: "Dura ends at S2 in adults but as low as S3-S4 in neonates — risk of inadvertent dural puncture.",
    clinical: "Always aspirate before injection. Test dose with adrenaline-containing LA detects intravascular/intrathecal placement.",
  },
  csf: {
    label: "CSF",
    region: "dural",
    color: "hsl(200, 70%, 70%)",
    detail: "Within the dural sac. Aspiration of CSF mandates abandonment of the block.",
    clinical: "Inadvertent intrathecal injection of caudal volumes (1 ml/kg) would produce a total spinal.",
  },
  cauda: {
    label: "Cauda equina / filum terminale",
    region: "dural",
    color: "hsl(280, 40%, 50%)",
    detail: "L2–S5 nerve roots descend within the dural sac. Spinal cord ends at L3 in neonates, L1 by 1 yr.",
    clinical: "The lower cord position in neonates is why lumbar puncture in infants is performed at L4/5 or L5/S1.",
  },
  sacrum: {
    label: "Sacrum (fused S1–S5)",
    region: "bone",
    color: "hsl(35, 30%, 50%)",
    detail: "Triangular bone formed by fusion of 5 sacral vertebrae. Curves anteriorly creating the sacral kyphosis.",
    clinical: "After advancing through the membrane, lower the needle hub before advancing 2–3 mm into the canal — avoids piercing the anterior wall.",
  },
  coccyx: {
    label: "Coccyx",
    region: "bone",
    color: "hsl(35, 30%, 50%)",
    detail: "3–5 fused rudimentary vertebrae. Tip of the equilateral landmark triangle.",
    clinical: "Helps locate the hiatus — palpate up from the natal cleft to find the gap between the cornua.",
  },
  l5: {
    label: "L5 vertebra",
    region: "bone",
    color: "hsl(35, 30%, 50%)",
    detail: "Last lumbar vertebra. Reference for understanding caudal-to-thoracic spread of LA.",
    clinical: "1 ml/kg of 0.25% bupivacaine (Armitage) covers up to T10 — sufficient for sub-umbilical surgery.",
  },
  needle: {
    label: "22G short-bevel needle",
    region: "needle",
    color: "hsl(var(--muted-foreground))",
    detail: "Inserted at 45° to skin, advanced through SC membrane, then angle reduced to 20–30° before advancing 2–3 mm into the canal.",
    clinical: "Whoosh test (auscultate over thoracolumbar spine while injecting saline) confirms epidural placement.",
  },
};

const ORDER: StructureKey[] = [
  "needle",
  "hiatus",
  "sc-membrane",
  "cornua",
  "epidural-fat",
  "dura",
  "csf",
  "cauda",
  "sacrum",
  "coccyx",
  "l5",
  "skin",
];

export const CaudalBlockDiagram = () => {
  const [selected, setSelected] = useState<StructureKey>("hiatus");
  const [showLabels, setShowLabels] = useState(true);
  const [showLandmarks, setShowLandmarks] = useState(true);

  const info = STRUCTURES[selected];

  const isSel = (k: StructureKey) => selected === k;
  const dim = (k: StructureKey) => (isSel(k) ? 1 : 0.75);

  return (
    <div className="my-6 space-y-4">
      <div className="bg-muted/30 rounded-xl border border-border p-4">
        <DiagramToggleBar
          toggles={[
            { label: "Landmarks", active: showLandmarks, onChange: () => setShowLandmarks((v) => !v) },
            { label: "Labels", active: showLabels, onChange: () => setShowLabels((v) => !v) },
          ]}
        />

        <svg
          viewBox="0 0 600 420"
          className="w-full h-auto"
          role="img"
          aria-label="Parasagittal section of the paediatric sacrum showing the caudal epidural space and needle trajectory"
        >
          <defs>
            <radialGradient id="cbd-depth" cx="50%" cy="50%" r="65%">
              <stop offset="0%" stopColor="hsl(var(--background))" stopOpacity="0" />
              <stop offset="100%" stopColor="hsl(var(--background))" stopOpacity="0.35" />
            </radialGradient>
            <pattern id="cbd-bone" patternUnits="userSpaceOnUse" width="6" height="6">
              <path d="M0 6 L6 0" stroke="hsl(35, 30%, 35%)" strokeWidth="0.5" opacity="0.35" />
            </pattern>
            <pattern id="cbd-tissue" patternUnits="userSpaceOnUse" width="5" height="5">
              <circle cx="2.5" cy="2.5" r="0.4" fill="hsl(30, 40%, 40%)" opacity="0.3" />
            </pattern>
            <filter id="cbd-shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Compass labels */}
          <g fontSize="10" fill="hsl(var(--muted-foreground))" fontFamily="sans-serif">
            <text x="300" y="14" textAnchor="middle">CEPHALAD (head)</text>
            <text x="300" y="412" textAnchor="middle">CAUDAD (coccyx)</text>
            <text x="14" y="215" textAnchor="middle">POSTERIOR</text>
            <text x="586" y="215" textAnchor="middle">ANTERIOR</text>
          </g>

          {/* Skin/SC fat layer (posterior) */}
          <g
            onClick={() => setSelected("skin")}
            style={{ cursor: "pointer", opacity: dim("skin") }}
          >
            <path
              d="M 80 60 Q 75 220 95 380 L 130 380 Q 110 220 115 60 Z"
              fill="url(#cbd-tissue)"
              stroke={REGION_COLOR["soft-tissue"]}
              strokeWidth={isSel("skin") ? 2 : 1}
            />
            <rect x="80" y="60" width="35" height="320" fill={STRUCTURES.skin.color} opacity="0.25" />
          </g>

          {/* Sacrum body (curved triangular bone) */}
          <g
            onClick={() => setSelected("sacrum")}
            style={{ cursor: "pointer", opacity: dim("sacrum") }}
            filter="url(#cbd-shadow)"
          >
            <path
              d="M 130 70 Q 200 90 270 130 Q 330 170 360 230 Q 380 290 360 340 Q 330 350 280 340 Q 210 320 160 280 Q 130 220 125 140 Z"
              fill="url(#cbd-bone)"
              stroke={REGION_COLOR.bone}
              strokeWidth={isSel("sacrum") ? 2.5 : 1.5}
            />
            <path
              d="M 130 70 Q 200 90 270 130 Q 330 170 360 230 Q 380 290 360 340 Q 330 350 280 340 Q 210 320 160 280 Q 130 220 125 140 Z"
              fill={STRUCTURES.sacrum.color}
              opacity="0.35"
            />
            {/* Inter-segmental lines (S1–S5) */}
            {showLandmarks && (
              <g stroke="hsl(35, 30%, 30%)" strokeWidth="0.5" opacity="0.5" strokeDasharray="2 2">
                <line x1="160" y1="105" x2="195" y2="135" />
                <line x1="190" y1="155" x2="240" y2="180" />
                <line x1="220" y1="200" x2="290" y2="220" />
                <line x1="245" y1="245" x2="320" y2="265" />
                <line x1="270" y1="285" x2="345" y2="305" />
              </g>
            )}
          </g>

          {/* Epidural fat strip (anterior to canal posterior wall) */}
          <g
            onClick={() => setSelected("epidural-fat")}
            style={{ cursor: "pointer", opacity: dim("epidural-fat") }}
          >
            <path
              d="M 145 95 Q 200 130 250 165 Q 295 195 320 235 Q 335 280 320 320 Q 290 325 245 315 Q 195 290 160 250 Q 140 190 145 95 Z"
              fill={STRUCTURES["epidural-fat"].color}
              opacity={isSel("epidural-fat") ? 0.7 : 0.45}
              stroke={REGION_COLOR.epidural}
              strokeWidth={isSel("epidural-fat") ? 1.5 : 0.8}
            />
          </g>

          {/* Dural sac (terminates S2 in adult, S3 in neonate) */}
          <g
            onClick={() => setSelected("dura")}
            style={{ cursor: "pointer", opacity: dim("dura") }}
          >
            <path
              d="M 155 80 Q 210 120 255 155 Q 290 185 305 215 L 285 220 Q 260 200 225 175 Q 185 145 150 110 Z"
              fill={STRUCTURES.dura.color}
              opacity={isSel("dura") ? 0.65 : 0.45}
              stroke={REGION_COLOR.dural}
              strokeWidth={isSel("dura") ? 2 : 1.2}
            />
            {/* CSF inside */}
            <g
              onClick={(e) => {
                e.stopPropagation();
                setSelected("csf");
              }}
              style={{ cursor: "pointer", opacity: dim("csf") }}
            >
              <path
                d="M 165 95 Q 215 130 255 160 Q 285 185 295 210 L 280 213 Q 255 195 225 173 Q 190 145 162 115 Z"
                fill={STRUCTURES.csf.color}
                opacity="0.55"
              />
            </g>
            {/* Cauda equina threads */}
            <g
              onClick={(e) => {
                e.stopPropagation();
                setSelected("cauda");
              }}
              style={{ cursor: "pointer", opacity: dim("cauda") }}
              stroke={STRUCTURES.cauda.color}
              strokeWidth="0.75"
              fill="none"
            >
              <path d="M 170 90 Q 210 130 250 160 Q 280 185 290 210" />
              <path d="M 178 100 Q 218 138 256 165 Q 282 188 292 212" />
              <path d="M 165 110 Q 205 145 245 170 Q 275 192 285 212" />
            </g>
          </g>

          {/* Sacral hiatus (gap in posterior wall) */}
          <g
            onClick={() => setSelected("hiatus")}
            style={{ cursor: "pointer", opacity: dim("hiatus") }}
          >
            <ellipse
              cx="195"
              cy="335"
              rx="22"
              ry="16"
              fill={STRUCTURES.hiatus.color}
              opacity={isSel("hiatus") ? 0.85 : 0.6}
              stroke={REGION_COLOR.epidural}
              strokeWidth={isSel("hiatus") ? 2.5 : 1.5}
            />
          </g>

          {/* Sacrococcygeal membrane (across the hiatus) */}
          <g
            onClick={() => setSelected("sc-membrane")}
            style={{ cursor: "pointer", opacity: dim("sc-membrane") }}
          >
            <path
              d="M 173 335 Q 195 325 217 335"
              stroke={REGION_COLOR.ligament}
              strokeWidth={isSel("sc-membrane") ? 4 : 2.5}
              fill="none"
              strokeLinecap="round"
            />
          </g>

          {/* Sacral cornua (paired bumps) */}
          <g
            onClick={() => setSelected("cornua")}
            style={{ cursor: "pointer", opacity: dim("cornua") }}
            fill={STRUCTURES.cornua.color}
            stroke={REGION_COLOR.bone}
            strokeWidth={isSel("cornua") ? 1.5 : 1}
          >
            <ellipse cx="172" cy="332" rx="6" ry="9" />
            <ellipse cx="218" cy="332" rx="6" ry="9" />
          </g>

          {/* Coccyx */}
          <g
            onClick={() => setSelected("coccyx")}
            style={{ cursor: "pointer", opacity: dim("coccyx") }}
            filter="url(#cbd-shadow)"
          >
            <path
              d="M 200 360 Q 215 380 225 400 Q 235 405 240 395 Q 230 370 215 350 Z"
              fill="url(#cbd-bone)"
              stroke={REGION_COLOR.bone}
              strokeWidth={isSel("coccyx") ? 2 : 1.2}
            />
            <path
              d="M 200 360 Q 215 380 225 400 Q 235 405 240 395 Q 230 370 215 350 Z"
              fill={STRUCTURES.coccyx.color}
              opacity="0.4"
            />
          </g>

          {/* L5 vertebra (top) */}
          <g
            onClick={() => setSelected("l5")}
            style={{ cursor: "pointer", opacity: dim("l5") }}
            filter="url(#cbd-shadow)"
          >
            <path
              d="M 130 35 Q 160 30 195 38 Q 215 50 215 75 L 195 80 Q 165 75 135 70 Q 125 55 130 35 Z"
              fill="url(#cbd-bone)"
              stroke={REGION_COLOR.bone}
              strokeWidth={isSel("l5") ? 2 : 1.2}
            />
            <path
              d="M 130 35 Q 160 30 195 38 Q 215 50 215 75 L 195 80 Q 165 75 135 70 Q 125 55 130 35 Z"
              fill={STRUCTURES.l5.color}
              opacity="0.35"
            />
          </g>

          {/* Needle (45° entry then 20° advancement) */}
          <g
            onClick={() => setSelected("needle")}
            style={{ cursor: "pointer", opacity: dim("needle") }}
          >
            {/* Initial 45° segment outside */}
            <line
              x1="120"
              y1="395"
              x2="178"
              y2="338"
              stroke={STRUCTURES.needle.color}
              strokeWidth={isSel("needle") ? 3.5 : 2.5}
              strokeLinecap="round"
            />
            {/* Reduced angle inside the canal */}
            <line
              x1="178"
              y1="338"
              x2="245"
              y2="320"
              stroke={STRUCTURES.needle.color}
              strokeWidth={isSel("needle") ? 3.5 : 2.5}
              strokeLinecap="round"
            />
            {/* Hub */}
            <rect x="105" y="400" width="22" height="10" rx="2" fill={STRUCTURES.needle.color} />
          </g>

          {/* Dura termination marker */}
          {showLandmarks && (
            <g fontSize="9" fill="hsl(var(--muted-foreground))" fontFamily="sans-serif">
              <line x1="295" y1="215" x2="380" y2="215" stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" strokeWidth="0.5" />
              <text x="385" y="213">S2 — adult dura ends</text>
              <line x1="305" y1="232" x2="395" y2="232" stroke="hsl(270, 40%, 55%)" strokeDasharray="3 3" strokeWidth="0.5" />
              <text x="400" y="230">S3/4 — neonatal dura ends</text>
              <line x1="160" y1="50" x2="240" y2="50" stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" strokeWidth="0.5" />
              <text x="245" y="52">L3 — neonatal cord ends (L1 by 1y)</text>
            </g>
          )}

          {/* Labels */}
          {showLabels && (
            <g fontSize="10" fill="hsl(var(--foreground))" fontFamily="sans-serif">
              <text x="195" y="365" textAnchor="middle" fontWeight="600">Hiatus</text>
              <text x="155" y="320" textAnchor="end">Cornu</text>
              <text x="240" y="320">Cornu</text>
              <text x="100" y="395" textAnchor="end">22G needle</text>
              <text x="270" y="290">Sacral canal</text>
              <text x="225" y="410">Coccyx</text>
              <text x="170" y="48" textAnchor="end">L5</text>
            </g>
          )}

          <rect x="0" y="0" width="600" height="420" fill="url(#cbd-depth)" pointerEvents="none" />
        </svg>

        {/* Detail panel */}
        <div
          className="mt-3 rounded-lg border border-border bg-background p-3 min-h-[110px] border-l-4"
          style={{ borderLeftColor: REGION_COLOR[info.region] }}
        >
          <div className="flex items-baseline justify-between gap-3 flex-wrap">
            <h4 className="font-serif font-bold text-foreground">{info.label}</h4>
            <span
              className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded border"
              style={{ borderColor: REGION_COLOR[info.region], color: REGION_COLOR[info.region] }}
            >
              {info.region.replace("-", " ")}
            </span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{info.detail}</p>
          <p className="text-sm text-foreground mt-1.5">
            <span className="font-semibold">Clinical: </span>
            {info.clinical}
          </p>
        </div>

        {/* Chip row */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {ORDER.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setSelected(k)}
              className={`text-xs px-2 py-1 rounded-full border transition-colors ${
                selected === k
                  ? "bg-primary/10 border-primary text-foreground"
                  : "border-border text-muted-foreground hover:bg-muted/50"
              }`}
            >
              {STRUCTURES[k].label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaudalBlockDiagram;
