import { useState } from "react";
import { DiagramToggleBar } from "./DiagramToggleBar";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * Interactive lower-limb regional block coverage diagram.
 * Click a block (chip or marker on the leg) to see its motor and
 * sensory territory shaded on anterior + posterior leg silhouettes,
 * the needle entry point, and the clinical use-case.
 *
 * Conforms to STYLE_GUIDE.md: DiagramToggleBar header, prefixed defs
 * ids (llb-), depth gradient, drop shadow on the silhouettes, default
 * selection, left-border detail panel keyed to block colour.
 */

type BlockKey =
  | "femoral"
  | "acb"
  | "ipack"
  | "peng"
  | "fascia-iliaca"
  | "popliteal-sciatic"
  | "saphenous";

interface BlockInfo {
  label: string;
  shortLabel: string;
  color: string;
  target: string;
  needleSite: string;
  sensory: string;
  motor: string;
  motorSparing: boolean;
  useCase: string;
  // Polygon paths (in viewBox coords) for the shaded coverage on each view.
  // Coordinate system: 0–200 (W) × 0–520 (H).
  anteriorPath?: string;
  posteriorPath?: string;
  // Marker for the needle / entry point on the diagram.
  marker: { side: "anterior" | "posterior"; cx: number; cy: number };
}

const BLOCKS: Record<BlockKey, BlockInfo> = {
  femoral: {
    label: "Femoral nerve block",
    shortLabel: "Femoral",
    color: "hsl(0, 70%, 50%)",
    target: "Femoral nerve (L2–L4) below the inguinal ligament, lateral to the femoral artery",
    needleSite: "1–2 cm distal to inguinal ligament, lateral to femoral artery (in-plane US)",
    sensory: "Anterior thigh, medial leg below the knee (via saphenous branch)",
    motor: "Quadriceps (full quadriceps weakness — fall risk)",
    motorSparing: false,
    useCase:
      "Hip fracture / #NOF analgesia, anterior cruciate ligament repair, knee arthroplasty (largely superseded by ACB for TKA because of the quadriceps weakness).",
    anteriorPath:
      "M 100 165 L 75 175 L 70 240 L 78 320 L 95 380 L 105 380 L 118 320 L 122 250 L 118 180 Z",
    posteriorPath: "",
    marker: { side: "anterior", cx: 92, cy: 175 },
  },
  acb: {
    label: "Adductor canal block (ACB)",
    shortLabel: "ACB",
    color: "hsl(15, 80%, 50%)",
    target: "Saphenous nerve + branches to vastus medialis within the adductor canal (mid-thigh)",
    needleSite: "Mid-thigh, medial — under the sartorius, lateral to femoral artery in the canal (in-plane US)",
    sensory: "Antero-medial knee (capsule, periosteum) and medial leg to the medial malleolus",
    motor: "Largely motor-sparing (preserves quadriceps strength — supports early mobilisation)",
    motorSparing: true,
    useCase:
      "Day-case TKA analgesia (motor-sparing), medial-side knee surgery, ACL reconstruction. Now preferred over femoral block for TKA — Jaeger 2013 RCT.",
    anteriorPath: "M 105 270 L 88 280 L 85 360 L 100 410 L 110 410 L 120 360 L 118 290 Z",
    posteriorPath: "",
    marker: { side: "anterior", cx: 95, cy: 305 },
  },
  ipack: {
    label: "IPACK (interspace between popliteal artery & capsule of knee)",
    shortLabel: "IPACK",
    color: "hsl(30, 85%, 50%)",
    target: "Articular branches of the tibial and obturator nerves to the posterior knee capsule",
    needleSite: "Above the popliteal crease, between popliteal artery and posterior femoral condyle (in-plane US, deep to femur)",
    sensory: "Posterior knee capsule only — no cutaneous coverage",
    motor: "Motor-sparing (does not block tibial nerve trunk)",
    motorSparing: true,
    useCase:
      "Posterior-knee analgesia adjunct to ACB for TKA — covers the posterior capsule that ACB misses. Standard component of motor-sparing day-case TKA recipes.",
    posteriorPath: "M 95 340 L 80 355 L 80 395 L 100 410 L 120 395 L 120 355 L 105 340 Z",
    marker: { side: "posterior", cx: 100, cy: 365 },
  },
  peng: {
    label: "PENG (pericapsular nerve group) block",
    shortLabel: "PENG",
    color: "hsl(280, 60%, 55%)",
    target: "Articular branches of femoral, obturator and accessory obturator nerves to the anterior hip capsule",
    needleSite: "Anterior, between AIIS and ileopubic eminence; needle deep to psoas tendon (in-plane US)",
    sensory: "Anterior hip capsule (sensory only — no cutaneous coverage)",
    motor: "Motor-sparing — preserves quadriceps and hip flexion (Girón-Arango 2018)",
    motorSparing: true,
    useCase:
      "#NOF and elective THA analgesia with preserved motor function — increasingly preferred over fascia iliaca for hip fracture pain, particularly to allow early mobilisation.",
    anteriorPath: "M 105 175 L 85 175 L 78 210 L 105 230 L 130 210 L 122 175 Z",
    marker: { side: "anterior", cx: 105, cy: 200 },
  },
  "fascia-iliaca": {
    label: "Fascia iliaca compartment block",
    shortLabel: "Fascia iliaca",
    color: "hsl(330, 65%, 55%)",
    target: "Femoral, lateral femoral cutaneous and (variably) obturator nerves under fascia iliaca",
    needleSite: "Suprainguinal (Hebbard) or infrainguinal — 1 cm below inguinal ligament, lateral to femoral artery; high-volume (30–40 ml) injection",
    sensory: "Anterior + lateral thigh; medial leg via saphenous branch (variable obturator)",
    motor: "Quadriceps weakness (less reliably than femoral block — depends on volume reaching the femoral nerve)",
    motorSparing: false,
    useCase:
      "Hip fracture pre-op analgesia (NICE CG124, AAGBI 2020) — landmark-guided version usable on the ward before transfer. Useful for thigh / femur surgery when ultrasound is unavailable.",
    anteriorPath:
      "M 125 170 L 65 175 L 60 240 L 75 330 L 100 400 L 115 400 L 135 320 L 140 240 Z",
    marker: { side: "anterior", cx: 78, cy: 175 },
  },
  "popliteal-sciatic": {
    label: "Popliteal sciatic nerve block",
    shortLabel: "Popliteal sciatic",
    color: "hsl(220, 70%, 55%)",
    target: "Sciatic nerve in the popliteal fossa (proximal to its bifurcation into tibial and common fibular)",
    needleSite: "5–8 cm proximal to popliteal crease, lateral to popliteal artery (in-plane US, posterior or lateral approach)",
    sensory: "Foot and lower leg below the knee, EXCEPT a medial strip supplied by the saphenous nerve",
    motor: "Foot and ankle (plantarflexion, dorsiflexion, inversion, eversion) — motor block expected",
    motorSparing: false,
    useCase:
      "Foot and ankle surgery — bunionectomy, hindfoot fusion, Achilles repair. Often combined with a saphenous block to cover the medial strip. Suitable for ambulatory catheter for 48–72 h post-op analgesia.",
    posteriorPath:
      "M 95 380 L 80 410 L 75 450 L 80 510 L 120 510 L 125 450 L 120 410 L 105 380 Z",
    anteriorPath: "M 92 410 L 80 440 L 80 510 L 120 510 L 120 440 L 108 410 Z M 86 510 L 80 515 L 80 525 L 120 525 L 120 515 L 114 510 Z",
    marker: { side: "posterior", cx: 100, cy: 395 },
  },
  saphenous: {
    label: "Saphenous nerve block (distal)",
    shortLabel: "Saphenous",
    color: "hsl(170, 55%, 45%)",
    target: "Saphenous nerve — terminal sensory branch of the femoral nerve",
    needleSite: "Distal thigh / above knee (sub-sartorial canal) or at the level of the medial malleolus",
    sensory: "Medial leg from the knee to the medial malleolus and medial border of the foot",
    motor: "None — purely sensory branch",
    motorSparing: true,
    useCase:
      "Combined with popliteal sciatic for complete foot/ankle coverage. Sole block for procedures on the medial leg (saphenous vein harvesting, medial ankle).",
    anteriorPath: "M 102 410 L 90 440 L 92 500 L 105 510 L 105 440 Z",
    marker: { side: "anterior", cx: 95, cy: 440 },
  },
};

const ORDER: BlockKey[] = [
  "fascia-iliaca",
  "femoral",
  "peng",
  "acb",
  "ipack",
  "popliteal-sciatic",
  "saphenous",
];

// Anterior leg silhouette (R leg, viewer's left = patient's right side facing us)
const ANTERIOR_LEG_PATH =
  "M 100 145 Q 80 145 70 165 L 60 240 Q 60 320 75 380 Q 80 430 85 510 L 80 540 L 130 540 L 130 510 Q 130 430 130 380 Q 145 320 145 240 L 135 165 Q 125 145 100 145 Z";

// Posterior leg silhouette
const POSTERIOR_LEG_PATH = ANTERIOR_LEG_PATH;

const LegView = ({
  view,
  selected,
  showNerves,
  onPick,
}: {
  view: "anterior" | "posterior";
  selected: BlockKey;
  showNerves: boolean;
  onPick: (k: BlockKey) => void;
}) => {
  const info = BLOCKS[selected];
  const path = view === "anterior" ? info.anteriorPath : info.posteriorPath;
  const W = 200;
  const H = 560;
  const id = `llb-${view}`;

  return (
    <div className="flex flex-col items-center">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">
        {view === "anterior" ? "Anterior" : "Posterior"}
      </p>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto max-w-[170px]"
        role="img"
        aria-label={`${view} view of the lower limb showing the ${info.shortLabel} coverage area`}
      >
        <defs>
          <radialGradient id={`${id}-depth`} cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor="hsl(var(--background))" stopOpacity="0" />
            <stop offset="100%" stopColor="hsl(var(--background))" stopOpacity="0.3" />
          </radialGradient>
          <pattern id={`${id}-skin`} patternUnits="userSpaceOnUse" width="6" height="6">
            <circle cx="3" cy="3" r="0.5" fill="hsl(30, 40%, 40%)" opacity="0.25" />
          </pattern>
          <filter id={`${id}-shadow`} x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.2" />
          </filter>
          <pattern id={`${id}-stripe`} patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" stroke={info.color} strokeWidth="2" opacity="0.55" />
          </pattern>
        </defs>

        {/* Hip / pelvis hint */}
        <ellipse cx="100" cy="140" rx="48" ry="20" fill="url(#${id}-skin)" stroke="hsl(var(--border))" strokeWidth="1" opacity="0.4" />

        {/* Leg silhouette */}
        <g filter={`url(#${id}-shadow)`}>
          <path d={view === "anterior" ? ANTERIOR_LEG_PATH : POSTERIOR_LEG_PATH} fill={`url(#${id}-skin)`} stroke="hsl(var(--border))" strokeWidth="1.5" />
        </g>

        {/* Anatomical region labels (always shown for orientation) */}
        <text x="148" y="150" fontSize="8" fill="hsl(var(--muted-foreground))">hip</text>
        <text x="148" y="260" fontSize="8" fill="hsl(var(--muted-foreground))">thigh</text>
        {/* Knee crease */}
        <line x1="70" y1="380" x2="140" y2="380" stroke="hsl(var(--border))" strokeWidth="0.75" strokeDasharray="2 2" opacity="0.6" />
        <text x="148" y="384" fontSize="8" fill="hsl(var(--muted-foreground))">knee</text>
        <text x="148" y="450" fontSize="8" fill="hsl(var(--muted-foreground))">leg</text>
        {/* Ankle crease */}
        <line x1="78" y1="510" x2="122" y2="510" stroke="hsl(var(--border))" strokeWidth="0.75" strokeDasharray="2 2" opacity="0.6" />
        <text x="128" y="514" fontSize="8" fill="hsl(var(--muted-foreground))">ankle</text>
        <text x="148" y="535" fontSize="8" fill="hsl(var(--muted-foreground))">foot</text>

        {/* Optional simplified nerve tracks with labels */}
        {showNerves && view === "anterior" && (
          <g opacity="0.75">
            <g stroke="hsl(var(--muted-foreground))" strokeWidth="1" fill="none" strokeDasharray="3 2">
              {/* Femoral → saphenous */}
              <path d="M 95 165 L 95 350 L 90 510" />
              {/* LFC */}
              <path d="M 80 165 L 70 250" />
              {/* Obturator (medial thigh) */}
              <path d="M 110 165 L 120 240 L 122 320" />
            </g>
            <text x="38" y="170" fontSize="7" fill="hsl(var(--muted-foreground))">LFC</text>
            <text x="32" y="260" fontSize="7" fill="hsl(var(--muted-foreground))">femoral</text>
            <text x="150" y="240" fontSize="7" fill="hsl(var(--muted-foreground))">obturator</text>
            <text x="30" y="470" fontSize="7" fill="hsl(var(--muted-foreground))">saphenous</text>
          </g>
        )}
        {showNerves && view === "posterior" && (
          <g opacity="0.75">
            <g stroke="hsl(var(--muted-foreground))" strokeWidth="1" fill="none" strokeDasharray="3 2">
              {/* Sciatic */}
              <path d="M 100 165 L 100 380" />
              {/* Tibial */}
              <path d="M 100 380 L 100 510" />
              {/* Common fibular (formerly common peroneal) */}
              <path d="M 100 380 L 130 440" />
              {/* Posterior cutaneous of thigh */}
              <path d="M 110 175 L 115 320" />
              {/* Sural */}
              <path d="M 105 440 L 112 510" />
            </g>
            <text x="38" y="270" fontSize="7" fill="hsl(var(--muted-foreground))">sciatic</text>
            <text x="38" y="460" fontSize="7" fill="hsl(var(--muted-foreground))">tibial</text>
            <text x="135" y="442" fontSize="7" fill="hsl(var(--muted-foreground))">common fibular</text>
            <text x="125" y="320" fontSize="7" fill="hsl(var(--muted-foreground))">post. cut.</text>
            <text x="125" y="500" fontSize="7" fill="hsl(var(--muted-foreground))">sural</text>
          </g>
        )}

        {/* Coverage shading */}
        {path && (
          <g>
            <path d={path} fill={info.color} opacity="0.2" stroke={info.color} strokeWidth="1" />
            <path d={path} fill={`url(#${id}-stripe)`} opacity="0.65" />
          </g>
        )}

        {/* Needle marker for blocks on this view */}
        {info.marker.side === view && (
          <g onClick={() => onPick(selected)} style={{ cursor: "pointer" }}>
            <circle cx={info.marker.cx} cy={info.marker.cy} r="6" fill={info.color} stroke="hsl(var(--background))" strokeWidth="1.5" />
            <circle cx={info.marker.cx} cy={info.marker.cy} r="11" fill="none" stroke={info.color} strokeWidth="1" opacity="0.7">
              <animate attributeName="r" from="7" to="14" dur="1.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.7" to="0" dur="1.4s" repeatCount="indefinite" />
            </circle>
          </g>
        )}

        <rect x="0" y="0" width={W} height={H} fill={`url(#${id}-depth)`} pointerEvents="none" />
      </svg>
    </div>
  );
};

export const LowerLimbBlocksDiagram = () => {
  const [selected, setSelected] = useState<BlockKey>("acb");
  const [showNerves, setShowNerves] = useState(true);
  const [showSparingBadge, setShowSparingBadge] = useState(true);

  const info = BLOCKS[selected];

  return (
    <DiagramFigure
      id="lower-limb-blocks-diagram"
      title="Lower limb blocks"
      description="Auto-generated wrapper for the Lower limb blocks anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="my-6 space-y-4">
        <div className="bg-muted/30 rounded-xl border border-border p-4">
          <DiagramToggleBar
            toggles={[
              { label: "Nerve tracks", active: showNerves, onChange: () => setShowNerves((v) => !v) },
              { label: "Motor-sparing badge", active: showSparingBadge, onChange: () => setShowSparingBadge((v) => !v) },
            ]}
          />
  
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-4 items-start">
            {/* Anterior + posterior leg pair */}
            <div className="grid grid-cols-2 gap-2">
              <LegView view="anterior" selected={selected} showNerves={showNerves} onPick={setSelected} />
              <LegView view="posterior" selected={selected} showNerves={showNerves} onPick={setSelected} />
            </div>
  
            {/* Detail panel */}
            <div
              className="rounded-lg border border-border bg-background p-4 min-h-[280px] border-l-4"
              style={{ borderLeftColor: info.color }}
            >
              <div className="flex items-baseline justify-between gap-3 flex-wrap">
                <h4 className="font-serif font-bold text-foreground text-lg">{info.label}</h4>
                {showSparingBadge && (
                  <span
                    className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded border whitespace-nowrap"
                    style={{
                      borderColor: info.motorSparing ? "hsl(160, 55%, 45%)" : "hsl(var(--destructive))",
                      color: info.motorSparing ? "hsl(160, 55%, 45%)" : "hsl(var(--destructive))",
                    }}
                  >
                    {info.motorSparing ? "Motor-sparing" : "Motor block expected"}
                  </span>
                )}
              </div>
  
              <div className="mt-3 space-y-2 text-sm">
                <div>
                  <span className="text-[11px] uppercase tracking-wide text-muted-foreground font-semibold">Target</span>
                  <p className="text-foreground">{info.target}</p>
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wide text-muted-foreground font-semibold">Needle site</span>
                  <p className="text-foreground">{info.needleSite}</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-2 pt-1">
                  <div className="p-2 rounded border border-border">
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold mb-0.5">Sensory</p>
                    <p className="text-foreground text-sm">{info.sensory}</p>
                  </div>
                  <div className="p-2 rounded border border-border">
                    <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold mb-0.5">Motor</p>
                    <p className="text-foreground text-sm">{info.motor}</p>
                  </div>
                </div>
              </div>
  
              <div className="mt-3 pt-3 border-t border-border">
                <p className="text-xs uppercase tracking-wide text-muted-foreground font-semibold mb-1">Clinical use</p>
                <p className="text-sm text-foreground">{info.useCase}</p>
              </div>
            </div>
          </div>
  
          {/* Block selector chips */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {ORDER.map((k) => {
              const b = BLOCKS[k];
              const isSel = selected === k;
              return (
                    <button
                  key={k}
                  type="button"
                  onClick={() => setSelected(k)}
                  aria-pressed={isSel}
                  className="text-xs px-2.5 py-1 rounded-full border transition-colors"
                  style={{
                    borderColor: isSel ? b.color : "hsl(var(--border))",
                    background: isSel ? `${b.color.replace(")", " / 0.12)").replace("hsl", "hsl")}` : "transparent",
                    color: isSel ? b.color : "hsl(var(--muted-foreground))",
                    fontWeight: isSel ? 600 : 400,
                  }}
                >
                  {b.shortLabel}
                  {b.motorSparing && <span className="ml-1 opacity-70">·MS</span>}
                </button>
    );
            })}
          </div>
  
          <p className="mt-3 text-[11px] text-muted-foreground">
            <span className="font-semibold">·MS</span> = motor-sparing. Most foot/ankle surgery needs <em>both</em> a popliteal sciatic and a saphenous block to cover the medial strip the sciatic misses.
          </p>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default LowerLimbBlocksDiagram;
