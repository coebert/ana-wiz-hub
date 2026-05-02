import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Patient-positioning diagrams — labelled SVG illustrations used by the
 * "Patient Positioning in Anaesthesia" clinical topic.
 *
 * Each diagram is a self-contained component:
 *  • Side-on schematic of the patient on the operating table
 *  • Numbered hotspots for pressure points / nerve injury zones
 *  • Hover or tap a hotspot → contextual injury / mitigation note
 *  • A small legend / ETT-and-monitoring side bar where relevant
 *
 * Colour use is restricted to semantic tokens or HSL strings that
 * read clearly on both light and dark backgrounds.
 */

// ── Shared building blocks ─────────────────────────────────────────────

interface Hotspot {
  id: string;
  /** Pixel coordinates inside the chosen viewBox */
  x: number;
  y: number;
  /** Short label shown when active */
  label: string;
  /** Detailed clinical note shown in the side panel */
  detail: string;
}

interface PositionDiagramProps {
  title: string;
  caption: string;
  hotspots: Hotspot[];
  width?: number;
  height?: number;
  /** SVG body — the painted patient + table */
  children: React.ReactNode;
  /** Optional small legend rendered below the SVG */
  legend?: React.ReactNode;
}

const POS_GREEN = "hsl(150 55% 40%)";
const POS_AMBER = "hsl(35 95% 50%)";
const POS_RED = "hsl(0 70% 50%)";

const PositionFrame = ({
  title,
  caption,
  hotspots,
  width = 560,
  height = 280,
  children,
  legend,
}: PositionDiagramProps) => {
  const [activeId, setActiveId] = useState<string | null>(hotspots[0]?.id ?? null);
  const active = hotspots.find((h) => h.id === activeId);

  return (
    <div className="my-4 rounded-xl border border-border bg-card overflow-hidden">
      <div className="px-4 py-3 border-b border-border bg-muted/30">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{caption}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_240px]">
        {/* Diagram */}
        <div className="p-3 bg-[hsl(var(--background))]">
          <div className="overflow-x-auto -mx-1 px-1">
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="w-full h-auto min-w-[460px]"
              role="img"
              aria-label={title}
            >
              {children}

              {/* Hotspots */}
              {hotspots.map((h, i) => {
                const isActive = h.id === activeId;
                return (
                  <g
                    key={h.id}
                    onPointerEnter={() => setActiveId(h.id)}
                    onClick={() => setActiveId(h.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <circle
                      cx={h.x}
                      cy={h.y}
                      r={isActive ? 13 : 11}
                      fill={isActive ? POS_RED : POS_AMBER}
                      fillOpacity={isActive ? 0.95 : 0.85}
                      stroke="hsl(var(--background))"
                      strokeWidth={2}
                    />
                    <text
                      x={h.x}
                      y={h.y + 4}
                      textAnchor="middle"
                      fontSize={12}
                      fontWeight={700}
                      fill="hsl(var(--background))"
                    >
                      {i + 1}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
          {legend ? (
            <div className="mt-2 px-1 text-[11px] text-muted-foreground">{legend}</div>
          ) : null}
        </div>

        {/* Side panel */}
        <div className="border-t md:border-t-0 md:border-l border-border bg-muted/20 p-3 text-xs">
          <p className="text-[10px] uppercase tracking-wide font-semibold text-muted-foreground mb-2">
            Pressure points & injury risks
          </p>
          <ol className="space-y-1.5 mb-3">
            {hotspots.map((h, i) => {
              const isActive = h.id === activeId;
              return (
                <li key={h.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(h.id)}
                    onPointerEnter={() => setActiveId(h.id)}
                    className={cn(
                      "w-full text-left rounded-md px-2 py-1 transition-colors flex items-start gap-2",
                      isActive
                        ? "bg-[hsl(0_70%_50%)]/10 text-foreground"
                        : "hover:bg-muted text-muted-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex-none w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white",
                      )}
                      style={{ background: isActive ? POS_RED : POS_AMBER }}
                    >
                      {i + 1}
                    </span>
                    <span className="leading-snug">{h.label}</span>
                  </button>
                </li>
              );
            })}
          </ol>
          {active ? (
            <div className="rounded-md border border-border bg-background p-2 leading-relaxed text-foreground/90">
              <p className="font-semibold text-foreground mb-1">{active.label}</p>
              <p>{active.detail}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

// ── Generic reusable shapes ───────────────────────────────────────────

const Table = ({
  x,
  y,
  w,
  h = 8,
  rx = 2,
}: {
  x: number;
  y: number;
  w: number;
  h?: number;
  rx?: number;
}) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx={rx} fill="hsl(210 25% 35%)" />
    {/* Table column */}
    <rect x={x + w / 2 - 8} y={y + h} width={16} height={26} fill="hsl(210 20% 45%)" />
    <rect x={x + w / 2 - 28} y={y + h + 26} width={56} height={6} rx={1} fill="hsl(210 15% 55%)" />
  </g>
);

// ── 1. SUPINE ──────────────────────────────────────────────────────────

export const SupinePositionDiagram = () => (
  <PositionFrame
    title="Supine position"
    caption="Default surgical position — patient lies face-up on a flat operating table."
    hotspots={[
      { id: "occ", x: 90, y: 110, label: "Occiput — pressure alopecia", detail: "Prolonged surgery (>4 h) on a hard headrest can cause focal alopecia from sustained scalp ischaemia. Use a soft gel ring and reposition the head every 30–60 min." },
      { id: "elbow", x: 230, y: 145, label: "Ulnar nerve at the elbow", detail: "The ulnar nerve runs in the cubital tunnel posterior to the medial epicondyle. With the arm pronated and tucked it is compressed between the bone and the table — supinate the forearm and pad the elbow. Commonest postoperative neuropathy after general anaesthesia." },
      { id: "sacrum", x: 290, y: 155, label: "Sacrum & heels", detail: "Supine pressure ulcers cluster over the sacrum, scapulae and heels. Float the heels off the mattress and use a pressure-redistributing surface for cases >2 h." },
      { id: "brachial", x: 200, y: 130, label: "Brachial plexus (arm-board)", detail: "Abduction of the arm >90° on an arm-board stretches the plexus over the head of the humerus. Keep abduction <90°, externally rotate, and avoid extension." },
    ]}
    legend={<>Common procedures: most general, vascular, urological, breast and orthopaedic upper-limb surgery.</>}
  >
    {/* Table */}
    <Table x={70} y={170} w={420} />

    {/* Patient — head left, feet right */}
    {/* Head */}
    <circle cx={100} cy={120} r={20} fill="hsl(35 80% 80%)" stroke="hsl(35 60% 40%)" strokeWidth={1.5} />
    {/* Body */}
    <rect x={120} y={130} width={250} height={40} rx={18} fill="hsl(210 60% 70%)" stroke="hsl(210 60% 35%)" strokeWidth={1.5} />
    {/* Arm tucked at side */}
    <rect x={210} y={140} width={90} height={14} rx={6} fill="hsl(35 80% 80%)" stroke="hsl(35 60% 40%)" strokeWidth={1.2} />
    {/* Legs */}
    <rect x={370} y={140} width={110} height={18} rx={8} fill="hsl(210 60% 70%)" stroke="hsl(210 60% 35%)" strokeWidth={1.5} />
    {/* Heels marker */}
    <circle cx={478} cy={160} r={6} fill="hsl(35 80% 80%)" stroke="hsl(35 60% 40%)" strokeWidth={1.2} />

    {/* Anatomical labels */}
    <text x={100} y={95} textAnchor="middle" fontSize={10} fill="hsl(var(--muted-foreground))">head</text>
    <text x={485} y={140} fontSize={10} fill="hsl(var(--muted-foreground))">feet</text>
    {/* horizon */}
    <line x1={70} y1={170} x2={490} y2={170} stroke="hsl(210 25% 25%)" strokeWidth={1.2} />
  </PositionFrame>
);

// ── 2. TRENDELENBURG ───────────────────────────────────────────────────

export const TrendelenburgPositionDiagram = () => (
  <PositionFrame
    title="Trendelenburg & reverse Trendelenburg"
    caption="Whole-table tilt head-down (Trendelenburg) for pelvic surgery; head-up (reverse) for upper-abdominal/laparoscopic gastric work."
    hotspots={[
      { id: "iop", x: 130, y: 95, label: "↑ IOP & cerebral venous pressure", detail: "Steep head-down tilt (e.g. robotic prostatectomy, 25–40°) can raise IOP by 13 mmHg and ICP by ~10 mmHg. Risk of post-op visual loss (POVL), conjunctival oedema and cerebral oedema." },
      { id: "frc", x: 270, y: 130, label: "↓ FRC, atelectasis", detail: "Abdominal contents push the diaphragm cephalad → ↓ FRC, ↑ shunt, ↓ compliance. Use lung-protective ventilation, recruitment manoeuvres and PEEP. Reverse Trendelenburg has the opposite (favourable) respiratory effect." },
      { id: "preload", x: 320, y: 150, label: "↑ preload (Trendelenburg) / ↓ preload (reverse)", detail: "Head-down auto-transfuses the central circulation — preload rises, useful in hypovolaemia but can decompensate failing ventricles. Reverse Trendelenburg drops venous return and can cause hypotension on induction." },
      { id: "slip", x: 410, y: 110, label: "Patient sliding", detail: "Steep tilt risks the patient sliding cephalad. Use anti-slip gel mattress, shoulder braces (NOT on the brachial plexus!), or the bean-bag/vacuum mattress. Shoulder braces on the AC joint cause brachial plexopathy — place over the lateral clavicle only." },
    ]}
    legend={<>Common procedures: robotic/laparoscopic pelvic surgery, gynaecology, lower colorectal, central-line insertion (Trendelenburg); laparoscopic upper GI / bariatric (reverse).</>}
  >
    {/* Tilted table — head down */}
    <g transform="rotate(-15 280 170)">
      <Table x={70} y={170} w={420} />
      {/* Head */}
      <circle cx={100} cy={120} r={20} fill="hsl(35 80% 80%)" stroke="hsl(35 60% 40%)" strokeWidth={1.5} />
      <rect x={120} y={130} width={250} height={40} rx={18} fill="hsl(210 60% 70%)" stroke="hsl(210 60% 35%)" strokeWidth={1.5} />
      <rect x={370} y={140} width={110} height={18} rx={8} fill="hsl(210 60% 70%)" stroke="hsl(210 60% 35%)" strokeWidth={1.5} />
      {/* Shoulder brace */}
      <rect x={118} y={120} width={6} height={20} fill={POS_RED} opacity={0.6} />
    </g>
    {/* Tilt-angle indicator */}
    <line x1={40} y1={210} x2={510} y2={210} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" />
    <text x={500} y={205} textAnchor="end" fontSize={10} fill="hsl(var(--muted-foreground))">horizontal</text>
    <text x={250} y={235} fontSize={11} fontWeight={600} fill="hsl(var(--foreground))">~ 15–40° head down</text>
  </PositionFrame>
);

// ── 3. LITHOTOMY ───────────────────────────────────────────────────────

export const LithotomyPositionDiagram = () => (
  <PositionFrame
    title="Lithotomy & Lloyd-Davies"
    caption="Hips and knees flexed in stirrups (Allen / Yellofin). Lloyd-Davies = lower (less flexed) variant for combined abdominal + perineal access."
    hotspots={[
      { id: "cpn", x: 360, y: 100, label: "Common peroneal nerve (fibular head)", detail: "Compressed between the lateral fibular head and the stirrup — causes foot drop. Pad the lateral knee and avoid lateral stirrup contact. Highest-incidence stirrup-related injury." },
      { id: "saph", x: 365, y: 130, label: "Saphenous nerve (medial tibia)", detail: "Compressed on the medial side by the stirrup support — paraesthesia along the medial calf." },
      { id: "compart", x: 380, y: 145, label: "Well-leg compartment syndrome", detail: "Risk rises sharply when stirrup time exceeds 4 h (some quote 2 h). Elevation ↓ perfusion pressure, calf compression by the stirrup ↑ tissue pressure. Mitigations: lower the legs every 2 h, use boot-style supports, avoid hypotension, document calf perfusion post-op." },
      { id: "hip", x: 320, y: 90, label: "Hip & femoral nerve stretch", detail: "Excessive hip flexion / abduction / external rotation stretches the femoral and obturator nerves and can dislocate prosthetic hips. Limit hip flexion to <90° if possible; both legs MUST be raised and lowered simultaneously to avoid pelvic torsion / lumbar strain." },
      { id: "back", x: 200, y: 150, label: "Lumbar lordosis loss", detail: "Flat positioning + pelvic tilt cause low-back pain post-op, especially in the elderly. Pad the lumbar spine and avoid prolonged extreme flexion." },
    ]}
    legend={<>Common procedures: cystoscopy, TURP, gynaecological surgery, anorectal surgery, vaginal hysterectomy; Lloyd-Davies for anterior resection / APR.</>}
  >
    <Table x={70} y={170} w={300} />

    {/* Head + body */}
    <circle cx={100} cy={120} r={20} fill="hsl(35 80% 80%)" stroke="hsl(35 60% 40%)" strokeWidth={1.5} />
    <rect x={120} y={130} width={230} height={40} rx={18} fill="hsl(210 60% 70%)" stroke="hsl(210 60% 35%)" strokeWidth={1.5} />

    {/* Thigh raised */}
    <line x1={345} y1={150} x2={395} y2={95} stroke="hsl(35 80% 80%)" strokeWidth={20} strokeLinecap="round" />
    <line x1={345} y1={150} x2={395} y2={95} stroke="hsl(35 60% 40%)" strokeWidth={1.2} fill="none" />
    {/* Calf */}
    <line x1={395} y1={95} x2={460} y2={130} stroke="hsl(35 80% 80%)" strokeWidth={18} strokeLinecap="round" />
    {/* Stirrup */}
    <path d="M 455 120 Q 480 105 470 145" fill="none" stroke="hsl(210 25% 35%)" strokeWidth={4} />
    <circle cx={465} cy={140} r={8} fill="hsl(210 25% 35%)" />

    <text x={250} y={235} fontSize={11} fontWeight={600} fill="hsl(var(--foreground))">hips & knees flexed in stirrups</text>
  </PositionFrame>
);

// ── 4. LATERAL DECUBITUS ───────────────────────────────────────────────

export const LateralPositionDiagram = () => (
  <PositionFrame
    title="Lateral decubitus"
    caption="Patient on their side with an axillary roll, dependent leg flexed, upper leg straight on a pillow."
    hotspots={[
      { id: "axroll", x: 145, y: 145, label: "Axillary roll (NOT in the axilla)", detail: "Placed beneath the chest 2–3 finger-breadths CAUDAL to the axilla — never IN the axilla, where it would compress the brachial plexus and axillary artery. Confirm the dependent radial pulse after positioning." },
      { id: "depeye", x: 100, y: 110, label: "Dependent eye & ear", detail: "Risk of corneal abrasion and pinna pressure ulcer. Use eye lubricant + tape, foam head ring with an ear cut-out, neutral cervical alignment." },
      { id: "depbrach", x: 175, y: 135, label: "Dependent brachial plexus", detail: "Compressed under the chest and humeral head. Pad the dependent arm and ensure axillary roll is correctly placed. Check pulses." },
      { id: "uplim", x: 230, y: 100, label: "Non-dependent (up) arm", detail: "Supported on a padded arm-rest or sling — abduction <90°, neutral rotation. Hyperabduction stretches the plexus." },
      { id: "vq", x: 285, y: 150, label: "V/Q mismatch", detail: "Awake spontaneously breathing lateral: ventilation matches perfusion (both favour dependent lung). Anaesthetised + paralysed + open chest: ventilation goes to the upper (compliant) lung but perfusion stays dependent → significant V/Q mismatch and shunt." },
      { id: "perlat", x: 360, y: 140, label: "Common peroneal & lateral malleolus", detail: "Dependent fibular neck compresses the common peroneal nerve. Place a pillow between the legs and pad the dependent fibular neck and lateral malleolus." },
    ]}
    legend={<>Common procedures: thoracotomy, oesophagectomy, nephrectomy, hip surgery, retroperitoneal procedures.</>}
  >
    <Table x={70} y={170} w={420} />

    {/* Lateral patient — torso oval, head left */}
    <circle cx={100} cy={130} r={18} fill="hsl(35 80% 80%)" stroke="hsl(35 60% 40%)" strokeWidth={1.5} />
    <ellipse cx={230} cy={150} rx={120} ry={28} fill="hsl(210 60% 70%)" stroke="hsl(210 60% 35%)" strokeWidth={1.5} />
    {/* Axillary roll */}
    <ellipse cx={145} cy={155} rx={14} ry={8} fill={POS_GREEN} opacity={0.85} />
    {/* Up arm — supported */}
    <line x1={195} y1={140} x2={250} y2={100} stroke="hsl(35 80% 80%)" strokeWidth={14} strokeLinecap="round" />
    <rect x={245} y={92} width={30} height={10} rx={3} fill="hsl(210 25% 35%)" />
    {/* Dependent arm */}
    <line x1={170} y1={155} x2={220} y2={150} stroke="hsl(35 80% 80%)" strokeWidth={12} strokeLinecap="round" />
    {/* Legs — dependent flexed, upper straight on pillow */}
    <line x1={350} y1={155} x2={400} y2={130} stroke="hsl(35 80% 80%)" strokeWidth={16} strokeLinecap="round" />
    <line x1={350} y1={155} x2={420} y2={170} stroke="hsl(35 80% 80%)" strokeWidth={16} strokeLinecap="round" />
    <ellipse cx={400} cy={148} rx={20} ry={6} fill="hsl(35 50% 70%)" />
    <text x={250} y={235} fontSize={11} fontWeight={600} fill="hsl(var(--foreground))">left lateral shown — kidney rest under flank if renal surgery</text>
  </PositionFrame>
);

// ── 5. PRONE ───────────────────────────────────────────────────────────

export const PronePositionDiagram = () => (
  <PositionFrame
    title="Prone position (general)"
    caption="Patient face-down on supports that leave the abdomen free. Choice of frame (Wilson / Jackson / Montreal / Relton-Hall) depends on procedure — see frame comparison below."
    hotspots={[
      { id: "eyes", x: 120, y: 95, label: "Eyes — POVL & globe pressure", detail: "Direct globe pressure causes ischaemic optic neuropathy and retinal artery occlusion (post-op visual loss, POVL). Use a horseshoe / Mayfield / ProneView mirror system, document free eye position every 15 min, avoid hypotension, head NEUTRAL or slightly above the heart." },
      { id: "neck", x: 145, y: 110, label: "Cervical spine (neutral)", detail: "Excessive flexion / extension / rotation risks cord injury (especially in pre-existing cervical disease) and brachial plexus stretch. Confirm neutral alignment after every move." },
      { id: "ettube", x: 100, y: 100, label: "Endotracheal tube — endobronchial migration", detail: "ETT tip moves an average of 1.9 cm caudally on prone repositioning — risk of right main-bronchus intubation. Re-check ETT position and bilateral air entry after turning. Use a reinforced (armoured) tube." },
      { id: "abdo", x: 280, y: 145, label: "Abdomen MUST hang free", detail: "Abdominal compression raises intra-abdominal pressure → IVC obstruction → ↓ venous return → ↓ CO and engorged epidural veins (↑ surgical bleeding). All prone frames lift the chest and pelvis to keep the belly free." },
      { id: "knees", x: 410, y: 145, label: "Knees, anterior superior iliac spine, breasts/genitalia", detail: "Pad the knees, ASIS and male genitalia (avoid penile compression). Female breasts displaced laterally or supported." },
      { id: "arms", x: 220, y: 100, label: "Arms — 'superman' or tucked", detail: "Either tucked at the side (preferred for spinal fusion) or abducted <90° + flexed at elbow with neutral wrist (superman). Excessive abduction stretches the plexus; the humerus rotates anteriorly when prone." },
    ]}
    legend={<>Common procedures: posterior spinal surgery, posterior fossa craniotomy, nephrolithotomy (PCNL), severe ARDS proning in ICU.</>}
  >
    <Table x={70} y={180} w={420} />
    {/* Prone patient */}
    <circle cx={120} cy={110} r={18} fill="hsl(35 80% 80%)" stroke="hsl(35 60% 40%)" strokeWidth={1.5} />
    {/* head holder (Mayfield/horseshoe) */}
    <rect x={95} y={130} width={50} height={8} rx={2} fill="hsl(280 50% 45%)" />
    {/* Body */}
    <rect x={140} y={120} width={250} height={30} rx={14} fill="hsl(210 60% 70%)" stroke="hsl(210 60% 35%)" strokeWidth={1.5} />
    {/* Chest support */}
    <rect x={170} y={145} width={50} height={20} rx={4} fill="hsl(280 50% 45%)" opacity={0.85} />
    {/* Pelvis support */}
    <rect x={330} y={145} width={50} height={20} rx={4} fill="hsl(280 50% 45%)" opacity={0.85} />
    {/* Legs */}
    <rect x={390} y={130} width={100} height={20} rx={8} fill="hsl(210 60% 70%)" stroke="hsl(210 60% 35%)" strokeWidth={1.5} />
    {/* free abdomen indicator */}
    <text x={280} y={172} textAnchor="middle" fontSize={10} fill={POS_GREEN} fontWeight={700}>abdomen hangs free</text>
    <text x={280} y={235} fontSize={11} fontWeight={600} fill="hsl(var(--foreground))">prone — chest & pelvis supported, abdomen free</text>
  </PositionFrame>
);

// ── 5b. PRONE FRAMES — Wilson / Jackson / Montreal / Relton ────────────

interface FrameCardProps {
  name: string;
  hue: number;
  caption: string;
  pros: string;
  cons: string;
  uses: string;
  /** Specific positioning issues / pitfalls unique to this frame. */
  issues: string[];
  /** Frame-specific supports drawn UNDER the patient silhouette (in viewBox 240×130). */
  draw: React.ReactNode;
  /** Optional spine curve override (path d). Defaults to a gentle natural lordosis. */
  spinePath?: string;
}

const FrameCard = ({
  name,
  hue,
  caption,
  pros,
  cons,
  uses,
  issues,
  draw,
  spinePath,
}: FrameCardProps) => {
  const accent = `hsl(${hue} 60% 50%)`;
  // Default spine: natural prone lordosis, head LEFT, feet RIGHT
  const spine = spinePath ?? "M 35 60 Q 80 56 120 60 Q 165 64 205 62";

  return (
    <div className="rounded-lg border border-border overflow-hidden bg-card flex flex-col">
      <div
        className="p-2 border-b border-border"
        style={{ background: `hsl(${hue} 60% 50% / 0.08)` }}
      >
        <div className="flex items-center gap-2">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ background: accent }}
            aria-hidden
          />
          <p className="text-sm font-semibold text-foreground">{name}</p>
        </div>
        <p className="text-[11px] text-muted-foreground mt-0.5">{caption}</p>
      </div>

      <div className="p-2">
        <svg
          viewBox="0 0 240 130"
          className="w-full h-auto"
          role="img"
          aria-label={`${name} — side-on schematic of patient on frame`}
        >
          {/* Theatre table base + legs */}
          <rect x={10} y={108} width={220} height={6} rx={2} fill="hsl(210 25% 35%)" />
          <rect x={20} y={114} width={6} height={14} fill="hsl(210 25% 30%)" />
          <rect x={214} y={114} width={6} height={14} fill="hsl(210 25% 30%)" />

          {/* Floor reference line */}
          <line
            x1={0}
            y1={128}
            x2={240}
            y2={128}
            stroke="hsl(var(--muted-foreground))"
            strokeWidth={0.4}
            strokeDasharray="2 3"
            opacity={0.5}
          />

          {/* Frame-specific supports (drawn UNDER patient) */}
          <g style={{ color: accent }}>{draw}</g>

          {/* Patient — prone, side-on. Head LEFT, feet RIGHT. */}
          {/* Torso */}
          <path
            d="M 55 56 Q 90 50 130 54 Q 170 58 200 60 L 200 70 Q 170 68 130 64 Q 90 60 55 66 Z"
            fill="hsl(35 70% 82%)"
            stroke="hsl(35 50% 40%)"
            strokeWidth={0.8}
          />
          {/* Spine curve indicator */}
          <path
            d={spine}
            fill="none"
            stroke="hsl(0 0% 25%)"
            strokeWidth={1}
            strokeDasharray="2 2"
            opacity={0.7}
          />
          {/* Head + neck */}
          <circle
            cx={42}
            cy={58}
            r={9}
            fill="hsl(35 70% 82%)"
            stroke="hsl(35 50% 40%)"
            strokeWidth={0.8}
          />
          <line x1={50} y1={60} x2={58} y2={60} stroke="hsl(35 50% 40%)" strokeWidth={2} />
          {/* Buttock + leg taper */}
          <path
            d="M 200 60 Q 215 62 222 66 L 222 70 Q 215 70 200 70 Z"
            fill="hsl(35 70% 82%)"
            stroke="hsl(35 50% 40%)"
            strokeWidth={0.8}
          />

          {/* Head + foot direction labels */}
          <text x={32} y={48} fontSize={6} fill="hsl(var(--muted-foreground))" textAnchor="middle">
            HEAD
          </text>
          <text
            x={218}
            y={48}
            fontSize={6}
            fill="hsl(var(--muted-foreground))"
            textAnchor="middle"
          >
            FEET
          </text>
        </svg>

        <dl className="mt-2 text-[11px] grid grid-cols-1 gap-1.5">
          <div>
            <dt className="font-semibold text-[hsl(150_55%_35%)] dark:text-[hsl(150_55%_55%)]">
              Pros
            </dt>
            <dd className="text-muted-foreground">{pros}</dd>
          </div>
          <div>
            <dt className="font-semibold text-[hsl(0_70%_45%)] dark:text-[hsl(0_70%_60%)]">Cons</dt>
            <dd className="text-muted-foreground">{cons}</dd>
          </div>
          <div>
            <dt className="font-semibold text-foreground">Used for</dt>
            <dd className="text-muted-foreground">{uses}</dd>
          </div>
          <div>
            <dt
              className="font-semibold"
              style={{ color: accent }}
            >
              Specific positioning issues
            </dt>
            <dd>
              <ul className="list-disc pl-4 space-y-0.5 text-muted-foreground marker:text-muted-foreground/50">
                {issues.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export const ProneFrameComparisonDiagram = () => (
  <div className="my-4 rounded-xl border border-border bg-card">
    <div className="px-4 py-3 border-b border-border bg-muted/30">
      <p className="text-sm font-semibold text-foreground">
        Prone-position frames at a glance — Wilson · Jackson · Relton-Hall · bolsters
      </p>
      <p className="text-xs text-muted-foreground mt-0.5">
        Side-on schematics (head left, feet right). Each frame supports the chest and pelvis
        differently — the choice trades off lumbar lordosis, abdominal decompression, fluoroscopy
        access and turning logistics. Each card lists the frame-specific positioning issues
        beneath the diagram.
      </p>
    </div>
    <div className="p-3 grid gap-3 md:grid-cols-2">
      <FrameCard
        name="Wilson frame"
        hue={210}
        caption="Adjustable convex (banana-shaped) pad on a standard table — flexes the lumbar spine, opens posterior interlaminar windows."
        pros="Quick set-up on any standard table; opens the posterior interlaminar space (good for microdiscectomy); height/curvature adjustable mid-case."
        cons="REVERSES lumbar lordosis (avoid in instrumented fusion); pad presses on the abdomen → ↑ intra-abdominal pressure → epidural venous engorgement → ↑ blood loss."
        uses="Lumbar microdiscectomy, single-level lumbar decompression, short non-instrumented cases."
        issues={[
          "Loss of lumbar lordosis — DO NOT use for instrumented fusion (fixes spine in flexion).",
          "Abdominal pad raises IAP → IVC compression, epidural venous bleeding, ↓ venous return.",
          "Single curved pad concentrates weight on lower ribs / costal margin → rib fracture in elderly.",
          "Femoral nerve stretch over the distal edge if hip flexion is excessive.",
          "Limited lateral fluoroscopy access (frame in the C-arm beam path).",
        ]}
        spinePath="M 35 60 Q 80 72 120 76 Q 165 72 205 62"
        draw={
          <>
            <path
              d="M 60 92 Q 120 50 180 92 Z"
              fill="currentColor"
              opacity={0.25}
              stroke="currentColor"
              strokeWidth={1.2}
            />
            <path d="M 60 92 Q 120 50 180 92" fill="none" stroke="currentColor" strokeWidth={2} />
            <line x1={120} y1={92} x2={120} y2={108} stroke="currentColor" strokeWidth={1.2} />
            <circle cx={120} cy={108} r={2} fill="currentColor" />
          </>
        }
      />
      <FrameCard
        name="Jackson (open / spinal) table"
        hue={280}
        caption="Dedicated cantilever spinal table — discrete chest, hip, thigh and shin pads with the abdomen completely free."
        pros="Abdomen totally free → ↓ epidural venous engorgement → ↓ blood loss; preserves natural lordosis (essential for fusion); permits AP and lateral fluoroscopy through the radiolucent gap."
        cons="Dedicated, expensive, theatre-occupying table; needs the 'sandwich-flip' transfer (supine top + Jackson top, then 180° rotation); not available for emergency airway prone."
        uses="Multi-level posterior spinal fusion / instrumentation, scoliosis correction, complex thoraco-lumbar surgery."
        issues={[
          "Sandwich-flip transfer — high-risk moment: ETT, lines, eyes and pin fixation can all dislodge.",
          "Chest pad too high → axillary plexus compression; too low → ↑ peak airway pressures.",
          "Hip pads must sit on iliac crests (NOT abdomen) — wrong placement re-creates IAP problem.",
          "Knees flexed over thigh pad — protect patella & common peroneal nerve at fibular head.",
          "Eye care critical: head usually in horseshoe / ProneView mirror — recheck free eyes every 15 min.",
        ]}
        draw={
          <>
            <rect x={55} y={72} width={28} height={20} rx={3} fill="currentColor" opacity={0.55} />
            <rect x={150} y={72} width={28} height={20} rx={3} fill="currentColor" opacity={0.55} />
            <rect x={186} y={78} width={22} height={14} rx={3} fill="currentColor" opacity={0.4} />
            <rect
              x={85}
              y={68}
              width={62}
              height={26}
              fill="none"
              stroke="currentColor"
              strokeDasharray="3 3"
            />
            <text x={116} y={104} fontSize={6} textAnchor="middle" fill="currentColor" opacity={0.85}>
              ABDOMEN FREE
            </text>
          </>
        }
      />
      <FrameCard
        name="Relton-Hall (Montreal 4-poster)"
        hue={150}
        caption="Four discrete pads — two on the lateral chest wall, two on the iliac crests — mounted on a frame fixed to a standard table."
        pros="Excellent abdominal decompression; preserves lordosis; lightweight and portable; the classic paediatric scoliosis frame."
        cons="Pad placement is critical (chest wall + iliac crests ONLY — never abdomen, breasts or pectoralis); needs sizing for paediatric vs adult patients."
        uses="Paediatric / adolescent posterior spinal surgery (AIS, scoliosis, kyphosis correction); selected adult fusion."
        issues={[
          "Chest pads must sit on lateral ribs — too medial compresses pectoralis & breast tissue (women).",
          "Iliac-crest pads must NOT slip onto the lateral femoral cutaneous nerve → meralgia paraesthetica.",
          "If pads too far apart in small children → abdomen sags between them, defeating the design.",
          "Genital compression in males — check penis and scrotum free between iliac pads.",
          "Frame is rigid — no mid-case lordosis adjustment; check lordosis BEFORE draping.",
        ]}
        draw={
          <>
            <rect x={62} y={78} width={14} height={14} rx={2} fill="currentColor" opacity={0.7} />
            <rect x={80} y={78} width={14} height={14} rx={2} fill="currentColor" opacity={0.45} />
            <rect x={150} y={78} width={14} height={14} rx={2} fill="currentColor" opacity={0.7} />
            <rect x={168} y={78} width={14} height={14} rx={2} fill="currentColor" opacity={0.45} />
            <line
              x1={96}
              y1={84}
              x2={148}
              y2={84}
              stroke="currentColor"
              strokeDasharray="2 2"
              opacity={0.6}
            />
          </>
        }
      />
      <FrameCard
        name="Standard table + bolsters / gel rolls"
        hue={35}
        caption="Two longitudinal foam or gel bolsters running chest-to-pelvis on a standard operating table."
        pros="Universally available; cheap; rapid set-up; suits short cases, non-spinal prone work and ICU prone ventilation."
        cons="Less effective abdominal decompression than dedicated frames; greater pressure-injury risk over a longer surface area; lordosis poorly controllable."
        uses="Posterior fossa craniotomy, PCNL, posterior fistula / pilonidal surgery, ENT (posterior pharynx), ICU prone ventilation."
        issues={[
          "Bolsters can migrate intra-operatively → abdomen drops onto the table; recheck after every position change.",
          "Pressure spread along a long surface → higher risk over iliac crests, ASIS and knees.",
          "Less abdominal decompression than Jackson / Relton — significant epidural bleeding in long spinal cases.",
          "Breast / genital entrapment between bolsters — actively check before draping.",
          "ICU prone ventilation: rotate head every 2 h, check ETT and lines, watch for facial pressure injury.",
        ]}
        draw={
          <>
            <rect x={45} y={78} width={150} height={14} rx={6} fill="currentColor" opacity={0.55} />
            <rect x={45} y={92} width={150} height={6} rx={3} fill="currentColor" opacity={0.3} />
          </>
        }
      />
    </div>

    {/* Quick comparison reference table */}
    <div className="border-t border-border p-3 overflow-x-auto">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-2">
        Quick comparison
      </p>
      <table className="w-full text-[11px] border-collapse">
        <thead>
          <tr className="text-left text-muted-foreground">
            <th className="py-1 pr-2 font-semibold">Feature</th>
            <th className="py-1 px-2 font-semibold">Wilson</th>
            <th className="py-1 px-2 font-semibold">Jackson</th>
            <th className="py-1 px-2 font-semibold">Relton-Hall</th>
            <th className="py-1 px-2 font-semibold">Bolsters</th>
          </tr>
        </thead>
        <tbody className="text-foreground">
          {[
            ["Lumbar lordosis", "Lost (kyphosis)", "Preserved", "Preserved", "Variable"],
            ["Abdomen free?", "No", "Yes ✓", "Yes ✓", "Partial"],
            ["IAP / blood loss", "↑↑", "↓↓", "↓", "↑"],
            ["Fluoroscopy access", "Limited", "AP + lateral", "AP only", "AP only"],
            ["Set-up cost / time", "Low", "High", "Medium", "Lowest"],
            ["Best for", "Microdiscectomy", "Long fusion", "Paediatric scoliosis", "Short / ICU"],
          ].map((row) => (
            <tr key={row[0]} className="border-t border-border/60">
              <td className="py-1 pr-2 font-medium text-muted-foreground">{row[0]}</td>
              {row.slice(1).map((cell, i) => (
                <td key={i} className="py-1 px-2">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// ── 6. PARK BENCH (modified lateral for posterior fossa / CPA) ─────────

export const ParkBenchPositionDiagram = () => (
  <PositionFrame
    title="Park-bench position"
    caption="Modified lateral with the patient at the edge of the table, head pinned in 3-point fixation, dependent arm hanging in a sling. Used for posterior-fossa / CPA / vestibular schwannoma surgery."
    hotspots={[
      { id: "pin", x: 105, y: 95, label: "Mayfield 3-pin head fixation", detail: "Skull pinned at 60–80 N. Risks: hypertension on application (pre-treat with remifentanil bolus, lidocaine, or LA), pin-site bleeding/CSF leak, depressed skull fracture in children/elderly. Pins must avoid the temporalis (heavy bleeding), frontal sinus and superficial temporal artery." },
      { id: "neck", x: 130, y: 110, label: "Neck flexion + 'two-finger' rule", detail: "Head is flexed and rotated towards the floor for surgical access. Excessive flexion → kinks the ETT, obstructs jugular venous drainage, raises ICP and can cause cervical cord ischaemia / quadriplegia. Maintain ≥2 finger-breadths between chin and chest." },
      { id: "depax", x: 165, y: 145, label: "Dependent axilla / brachial plexus", detail: "The dependent arm is allowed to hang off the table in a padded sling — this AVOIDS axillary compression. An axillary roll is also placed under the chest 2–3 finger-breadths caudal to the axilla. Confirm dependent radial pulse." },
      { id: "vae", x: 270, y: 130, label: "Venous air embolism (VAE)", detail: "Posterior-fossa craniotomies often expose dural venous sinuses above heart level → risk of VAE. Use precordial Doppler or TOE, end-tidal CO₂ + N₂ monitoring, central venous catheter for aspiration. Sudden ↓ EtCO₂ + ↓ SpO₂ + 'mill-wheel' murmur = VAE." },
      { id: "leg", x: 410, y: 145, label: "Dependent leg — peroneal nerve", detail: "Dependent fibular head padded; pillow between knees; hips slightly flexed to lower the centre of gravity and prevent rolling forwards." },
    ]}
    legend={<>Common procedures: posterior-fossa tumours, vestibular schwannoma / CPA, microvascular decompression, foramen magnum decompression.</>}
  >
    <Table x={70} y={180} w={420} />
    {/* Patient lateral but at table edge */}
    <circle cx={120} cy={110} r={18} fill="hsl(35 80% 80%)" stroke="hsl(35 60% 40%)" strokeWidth={1.5} />
    {/* Mayfield pins */}
    <line x1={108} y1={92} x2={102} y2={82} stroke="hsl(280 60% 40%)" strokeWidth={3} />
    <line x1={132} y1={92} x2={138} y2={82} stroke="hsl(280 60% 40%)" strokeWidth={3} />
    <line x1={120} y1={94} x2={120} y2={84} stroke="hsl(280 60% 40%)" strokeWidth={3} />
    {/* body lateral */}
    <ellipse cx={250} cy={150} rx={120} ry={25} fill="hsl(210 60% 70%)" stroke="hsl(210 60% 35%)" strokeWidth={1.5} />
    {/* axillary roll */}
    <ellipse cx={160} cy={155} rx={12} ry={6} fill={POS_GREEN} opacity={0.85} />
    {/* Dependent arm hanging off table in sling */}
    <line x1={175} y1={155} x2={185} y2={195} stroke="hsl(35 80% 80%)" strokeWidth={12} strokeLinecap="round" />
    <path d="M 165 195 Q 195 215 215 190" fill="none" stroke="hsl(280 50% 45%)" strokeWidth={2.5} />
    {/* Up arm forward on pad */}
    <line x1={210} y1={140} x2={260} y2={108} stroke="hsl(35 80% 80%)" strokeWidth={12} strokeLinecap="round" />
    {/* Legs — dependent flexed */}
    <line x1={370} y1={155} x2={420} y2={130} stroke="hsl(35 80% 80%)" strokeWidth={16} strokeLinecap="round" />
    <line x1={370} y1={155} x2={430} y2={170} stroke="hsl(35 80% 80%)" strokeWidth={16} strokeLinecap="round" />
    <text x={250} y={235} fontSize={11} fontWeight={600} fill="hsl(var(--foreground))">dependent arm in sling — avoids axillary compression</text>
  </PositionFrame>
);

// ── 6b. PARK BENCH — DEDICATED DETAILED VIEW ───────────────────────────

interface ParkBenchHotspot {
  id: string;
  x: number;
  y: number;
  label: string;
  risk: string;
  /** Ordered mitigation steps */
  mitigation: string[];
  severity: "high" | "moderate" | "low";
}

const PB_PROCEDURES: { name: string; why: string }[] = [
  { name: "Vestibular schwannoma / acoustic neuroma (CPA)", why: "Excellent retrosigmoid access without the VAE risk of full sitting." },
  { name: "Microvascular decompression (Jannetta) for trigeminal neuralgia / hemifacial spasm", why: "Lateral retromastoid trajectory to the root entry zone of CN V or CN VII." },
  { name: "Posterior fossa tumour resection (cerebellar, 4th-ventricle)", why: "Gravity-assisted retraction of the cerebellum; surgeon stands comfortably." },
  { name: "Foramen magnum / craniocervical decompression (Chiari)", why: "Allows midline suboccipital + upper-cervical exposure with neutral airway access." },
  { name: "Translabyrinthine / retrolabyrinthine skull-base approaches", why: "Joint ENT–neurosurgical CPA work; head pinned and rotated to floor." },
  { name: "Posterior cervical spine (selected upper-cervical cases)", why: "When prone is contraindicated (e.g. morbid obesity, severe cardio-respiratory disease)." },
];

const PB_HOTSPOTS: ParkBenchHotspot[] = [
  {
    id: "pb-pin",
    x: 130,
    y: 95,
    label: "Mayfield 3-pin head fixation",
    severity: "high",
    risk: "Hypertensive surge on pin application; pin-site bleeding, CSF leak, or depressed skull fracture (children, elderly, steroid-treated).",
    mitigation: [
      "Pre-treat: remifentanil 0.5–1 µg/kg bolus or alfentanil 10 µg/kg, ± lidocaine 1.5 mg/kg IV.",
      "Infiltrate pin sites with LA + adrenaline (e.g. 0.5% bupivacaine with 1:200,000 adrenaline).",
      "Avoid temporalis muscle, frontal sinus and superficial temporal artery.",
      "Torque 60–80 N in adults; reduce in children / thin skull.",
      "Eyes taped + padded BEFORE pinning; confirm no traction on ETT after pinning.",
    ],
  },
  {
    id: "pb-neck",
    x: 165,
    y: 115,
    label: "Cervical flexion / rotation",
    severity: "high",
    risk: "Excessive flexion → ETT kinking, jugular venous obstruction (raised ICP, venous bleeding), cervical cord ischaemia / quadriplegia.",
    mitigation: [
      "Maintain ≥ two finger-breadths between chin and sternum.",
      "Use an armoured (reinforced) ETT — taped, not tied around the neck.",
      "Limit head rotation to ≤ 45°; if more access needed, tilt the table laterally instead of rotating the neck further.",
      "Avoid intra-operative hypotension (cord watershed).",
    ],
  },
  {
    id: "pb-axilla",
    x: 205,
    y: 155,
    label: "Dependent arm — sling, NOT roll-in-axilla",
    severity: "high",
    risk: "Brachial plexus stretch / compression; axillary artery occlusion; rhabdomyolysis of the dependent arm.",
    mitigation: [
      "Allow the dependent arm to hang free in a padded sling off the table edge — this is the defining feature of park bench.",
      "Place the axillary roll on the chest wall 2–3 finger-breadths CAUDAL to (NOT IN) the axilla.",
      "Confirm dependent radial pulse ± pulse oximeter on the dependent hand after positioning.",
      "Recheck pulse and SpO₂ trace every 15 min during the case.",
    ],
  },
  {
    id: "pb-vae",
    x: 305,
    y: 130,
    label: "Venous air embolism (VAE)",
    severity: "moderate",
    risk: "Surgical site (posterior fossa dural sinuses) often above heart level — air entrainment. Lower risk than full sitting but still ~10–15%.",
    mitigation: [
      "Precordial Doppler (most sensitive non-invasive) over the right 2nd–3rd ICS, ± TOE for high-risk cases.",
      "Continuous EtCO₂ + EtN₂; sudden ↓ EtCO₂, ↓ SpO₂, ↑ PA pressure, mill-wheel murmur = VAE.",
      "Multi-orifice CVC tip at SVC–RA junction for air aspiration.",
      "Avoid N₂O (expands intravascular air).",
      "Crisis: alert surgeon (flood field with saline, bone wax exposed bone), jugular compression, FiO₂ 1.0, aspirate from CVC, fluid + vasopressors, left lateral / head-down if able.",
    ],
  },
  {
    id: "pb-uparm",
    x: 270,
    y: 105,
    label: "Non-dependent (upper) arm",
    severity: "moderate",
    risk: "Suspended forwards on a padded support → suprascapular nerve traction, shoulder dislocation, ulnar / radial nerve compression.",
    mitigation: [
      "Pad upper arm at < 90° abduction; forearm pronated and supported on a gel pad.",
      "Avoid traction by tying the arm across the chest rather than abducting.",
      "Pad the medial epicondyle; keep IV lines and ECG leads off pressure points.",
    ],
  },
  {
    id: "pb-fibhead",
    x: 410,
    y: 158,
    label: "Dependent fibular head — common peroneal n.",
    severity: "moderate",
    risk: "Pressure on the dependent fibular head → common peroneal palsy / foot drop.",
    mitigation: [
      "Pillow / gel pad between the knees and a second pad under the dependent fibular head.",
      "Slight hip and knee flexion to drop centre of gravity (stops the patient rolling forwards).",
      "Heels floated on gel pads.",
    ],
  },
  {
    id: "pb-tape",
    x: 360,
    y: 175,
    label: "Strapping & table-edge security",
    severity: "moderate",
    risk: "Patient is on the EDGE of the table to allow the dependent arm to hang — risk of falling, especially during head-up tilt.",
    mitigation: [
      "Wide cloth tape across the iliac crests and across the upper thighs to the table.",
      "Beanbag or vacuum mattress moulded to the patient before pinning.",
      "Brief the team: any table tilt requires a 5-person team and explicit call-out.",
    ],
  },
  {
    id: "pb-eye",
    x: 110,
    y: 105,
    label: "Eye and dependent ear",
    severity: "low",
    risk: "Globe pressure (dependent eye), corneal abrasion, pinna pressure necrosis on the dependent ear.",
    mitigation: [
      "Lubricate and tape both eyes BEFORE pinning; horseshoe head-rest cut-out clear of the globe.",
      "Pinna folded forwards and padded; no cables or tubing under the head.",
      "Inspect dependent eye and ear after every position adjustment.",
    ],
  },
];

const SEVERITY_COLOUR: Record<ParkBenchHotspot["severity"], string> = {
  high: POS_RED,
  moderate: POS_AMBER,
  low: POS_GREEN,
};

export const ParkBenchDetailedDiagram = () => {
  const [activeId, setActiveId] = useState<string>(PB_HOTSPOTS[0].id);
  const active = PB_HOTSPOTS.find((h) => h.id === activeId) ?? PB_HOTSPOTS[0];
  const accent = SEVERITY_COLOUR[active.severity];

  return (
    <div className="my-6 rounded-xl border border-border bg-card overflow-hidden">
      <div className="px-4 py-3 border-b border-border bg-muted/30">
        <p className="text-sm font-semibold text-foreground">
          Park-bench position — dedicated review
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          Modified lateral with the patient at the table edge, head pinned in 3-point fixation and rotated towards the
          floor; dependent arm hangs in a padded sling. Workhorse position for posterior-fossa and CPA surgery — most of
          the VAE benefit of avoiding sitting, with simpler set-up and safer haemodynamics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_280px]">
        {/* Diagram column */}
        <div className="p-3 bg-[hsl(var(--background))]">
          <div className="overflow-x-auto -mx-1 px-1">
            <svg viewBox="0 0 560 320" className="w-full h-auto min-w-[520px]" role="img" aria-label="Park-bench position with pressure-risk hotspots">
            {/* Floor line */}
            <line x1={20} y1={285} x2={540} y2={285} stroke="hsl(var(--border))" strokeWidth={1} strokeDasharray="2 4" />
            <text x={20} y={300} fontSize={11} fill="hsl(var(--muted-foreground))">FLOOR</text>

            {/* Operating table */}
            <Table x={70} y={185} w={420} />

            {/* Beanbag / vacuum mattress */}
            <ellipse cx={290} cy={170} rx={185} ry={18} fill="hsl(45 35% 75%)" opacity={0.55} />
            <text x={490} y={170} fontSize={11} fill="hsl(var(--muted-foreground))">vacuum mattress</text>

            {/* Patient body — lateral */}
            <ellipse cx={290} cy={150} rx={140} ry={26} fill="hsl(210 60% 70%)" stroke="hsl(210 60% 35%)" strokeWidth={1.5} />

            {/* Head — pinned, slightly rotated towards the floor */}
            <g>
              <circle cx={140} cy={110} r={22} fill="hsl(35 80% 80%)" stroke="hsl(35 60% 40%)" strokeWidth={1.5} />
              {/* Mayfield horseshoe pins */}
              <line x1={125} y1={92} x2={117} y2={80} stroke="hsl(280 60% 40%)" strokeWidth={3.2} />
              <line x1={155} y1={92} x2={163} y2={80} stroke="hsl(280 60% 40%)" strokeWidth={3.2} />
              <line x1={140} y1={88} x2={140} y2={75} stroke="hsl(280 60% 40%)" strokeWidth={3.2} />
              <text x={140} y={68} fontSize={11} fontWeight={600} fill="hsl(280 60% 40%)" textAnchor="middle">Mayfield 3-pin</text>
              {/* ETT armoured */}
              <path d="M 150 118 Q 175 130 195 130" fill="none" stroke="hsl(var(--foreground))" strokeWidth={2} />
              <text x={195} y={123} fontSize={11} fill="hsl(var(--muted-foreground))">armoured ETT</text>
            </g>

            {/* Axillary roll caudal to axilla */}
            <ellipse cx={200} cy={155} rx={14} ry={7} fill={POS_GREEN} opacity={0.85} />
            <text x={200} y={132} fontSize={11} textAnchor="middle" fill={POS_GREEN} fontWeight={600}>axillary roll (NOT in axilla)</text>

            {/* Dependent arm — hanging off table edge in sling */}
            <line x1={215} y1={158} x2={225} y2={235} stroke="hsl(35 80% 80%)" strokeWidth={13} strokeLinecap="round" />
            <path d="M 200 235 Q 230 260 255 230" fill="none" stroke="hsl(280 50% 45%)" strokeWidth={2.5} />
            <text x={235} y={275} fontSize={11} fill="hsl(280 50% 45%)" fontWeight={600}>padded sling</text>

            {/* Upper arm — supported forwards on padded gutter */}
            <line x1={245} y1={140} x2={295} y2={108} stroke="hsl(35 80% 80%)" strokeWidth={13} strokeLinecap="round" />
            <rect x={285} y={100} width={45} height={14} rx={4} fill={POS_GREEN} opacity={0.6} />
            <text x={307} y={92} fontSize={11} textAnchor="middle" fill={POS_GREEN} fontWeight={600}>arm gutter</text>

            {/* Legs — flexed, pillow between knees */}
            <line x1={400} y1={155} x2={455} y2={135} stroke="hsl(35 80% 80%)" strokeWidth={16} strokeLinecap="round" />
            <line x1={400} y1={155} x2={465} y2={172} stroke="hsl(35 80% 80%)" strokeWidth={16} strokeLinecap="round" />
            <ellipse cx={445} cy={150} rx={9} ry={5} fill={POS_GREEN} opacity={0.85} />
            <text x={478} y={150} fontSize={11} fill={POS_GREEN} fontWeight={600}>knee pad</text>

            {/* Hip + thigh tape */}
            <line x1={310} y1={130} x2={310} y2={195} stroke="hsl(0 0% 25%)" strokeWidth={3} />
            <line x1={370} y1={132} x2={370} y2={195} stroke="hsl(0 0% 25%)" strokeWidth={3} />
            <text x={340} y={123} fontSize={11} textAnchor="middle" fill="hsl(var(--muted-foreground))">strapping</text>

            {/* Surgical access arrow — surgeon comes from behind the head */}
            <path d="M 70 60 Q 110 50 145 75" fill="none" stroke="hsl(var(--primary))" strokeWidth={1.5} strokeDasharray="3 3" />
            <text x={75} y={46} fontSize={11} fill="hsl(var(--primary))" fontWeight={600}>surgeon</text>

            {/* Heart-to-craniotomy hydrostatic gradient */}
            <line x1={290} y1={150} x2={140} y2={90} stroke={POS_AMBER} strokeDasharray="3 3" strokeWidth={1} />
            <text x={210} y={106} fontSize={11} fill={POS_AMBER} fontWeight={600}>~10–15 cm gradient (VAE)</text>

            {/* Hotspots */}
            {PB_HOTSPOTS.map((h, i) => {
              const isActive = h.id === activeId;
              const colour = SEVERITY_COLOUR[h.severity];
              return (
                <g
                  key={h.id}
                  onPointerEnter={() => setActiveId(h.id)}
                  onClick={() => setActiveId(h.id)}
                  style={{ cursor: "pointer" }}
                >
                  <circle
                    cx={h.x}
                    cy={h.y}
                    r={isActive ? 14 : 12}
                    fill={colour}
                    fillOpacity={isActive ? 0.95 : 0.85}
                    stroke="hsl(var(--background))"
                    strokeWidth={2}
                  />
                  <text
                    x={h.x}
                    y={h.y + 4}
                    textAnchor="middle"
                    fontSize={12}
                    fontWeight={700}
                    fill="hsl(var(--background))"
                  >
                    {i + 1}
                  </text>
                </g>
              );
            })}
            </svg>
          </div>

          {/* Severity legend */}
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground px-1">
            <span className="flex items-center gap-1.5"><span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: POS_RED }} /> High risk</span>
            <span className="flex items-center gap-1.5"><span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: POS_AMBER }} /> Moderate</span>
            <span className="flex items-center gap-1.5"><span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: POS_GREEN }} /> Low / supportive</span>
          </div>
        </div>

        {/* Side panel: chip list + active detail */}
        <div className="border-t lg:border-t-0 lg:border-l border-border bg-muted/20 p-3 text-xs">
          <p className="text-[10px] uppercase tracking-wide font-semibold text-muted-foreground mb-2">
            Pressure-risk hotspots
          </p>
          <ol className="space-y-1.5 mb-3">
            {PB_HOTSPOTS.map((h, i) => {
              const isActive = h.id === activeId;
              const colour = SEVERITY_COLOUR[h.severity];
              return (
                <li key={h.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(h.id)}
                    className={cn(
                      "w-full text-left flex items-start gap-2 rounded-md px-2 py-1.5 transition",
                      isActive ? "bg-background border border-border shadow-sm" : "hover:bg-background/60"
                    )}
                  >
                    <span
                      className="mt-0.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-bold shrink-0"
                      style={{ background: colour, color: "hsl(var(--background))" }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-foreground leading-tight">{h.label}</span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div
            className="rounded-md border border-border bg-background p-2.5"
            style={{ borderLeft: `4px solid ${accent}` }}
          >
            <p className="text-[11px] font-semibold text-foreground mb-1">{active.label}</p>
            <p className="text-[11px] text-muted-foreground mb-2">
              <span className="font-medium text-foreground">Risk: </span>{active.risk}
            </p>
            <p className="text-[10px] uppercase tracking-wide font-semibold text-muted-foreground mb-1">
              Mitigation
            </p>
            <ol className="list-decimal list-inside space-y-1 text-[11px] text-muted-foreground">
              {active.mitigation.map((m, i) => <li key={i}>{m}</li>)}
            </ol>
          </div>
        </div>
      </div>

      {/* Procedures footer */}
      <div className="border-t border-border bg-muted/10 p-4">
        <p className="text-[10px] uppercase tracking-wide font-semibold text-muted-foreground mb-2">
          Typical neuro-anaesthesia procedures performed in park-bench
        </p>
        <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
          {PB_PROCEDURES.map((p) => (
            <li key={p.name} className="leading-snug">
              <span className="text-foreground font-medium">{p.name}.</span> {p.why}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// ── 6c. SITTING — DEDICATED DETAILED VIEW ──────────────────────────────

interface SittingHotspot {
  id: string;
  x: number;
  y: number;
  label: string;
  category: "circulation" | "airway" | "pressure" | "neuro";
  risk: string;
  mitigation: string[];
  severity: "high" | "moderate" | "low";
}

const ST_PROCEDURES: { name: string; why: string }[] = [
  { name: "Posterior fossa tumour resection (cerebellar, brainstem, 4th-ventricle)", why: "Gravity drains blood and CSF from the field — bloodless midline exposure unmatched by lateral approaches." },
  { name: "Vestibular schwannoma / acoustic neuroma (CPA)", why: "Excellent retrosigmoid trajectory with the cerebellum falling away from the petrous bone." },
  { name: "Pineal-region & 3rd-ventricle tumours (supracerebellar infratentorial)", why: "Gravity retraction of the cerebellum gives a midline corridor without fixed retractors." },
  { name: "Microvascular decompression (Jannetta) — trigeminal neuralgia / hemifacial spasm", why: "Direct view of the cranial-nerve root entry zone with minimal cerebellar retraction." },
  { name: "Foramen magnum / craniocervical decompression (Chiari I)", why: "Midline suboccipital + upper-cervical exposure; excellent venous drainage of the field." },
  { name: "Posterior cervical spine (laminectomy, cervical fusion C1–C2)", why: "Reduces venous engorgement and intra-operative bleeding compared with prone." },
  { name: "Deep brain stimulator (DBS) electrode insertion (selected centres)", why: "Awake, semi-sitting position assists clinical testing during electrode placement." },
];

const ST_HOTSPOTS: SittingHotspot[] = [
  {
    id: "st-vae",
    x: 175,
    y: 95,
    label: "Venous air embolism (VAE) — highest-risk position",
    severity: "high",
    category: "circulation",
    risk: "Operative site sits ~25 cm above the right atrium → open dural sinuses entrain air. Reported VAE 25–45 %; paradoxical air embolism via PFO 5–10 %.",
    mitigation: [
      "Pre-op bubble echocardiogram to screen for PFO — positive PFO is a relative contraindication.",
      "Multi-orifice CVC tip at the SVC–RA junction for air aspiration; confirm position with intracardiac ECG or TOE.",
      "Precordial Doppler over the right 2nd–3rd ICS (most sensitive non-invasive monitor) ± TOE for high-risk cases.",
      "Continuous EtCO₂ + EtN₂; sudden ↓ EtCO₂, ↓ SpO₂, ↑ PA pressure, mill-wheel murmur = VAE.",
      "Avoid N₂O (expands intravascular air).",
      "Crisis: alert surgeon (flood field with saline, bone wax exposed bone), bilateral jugular compression, FiO₂ 1.0, aspirate CVC, fluid + vasopressors, recline patient if possible.",
    ],
  },
  {
    id: "st-cpp",
    x: 145,
    y: 80,
    label: "Cerebral perfusion pressure — zero at the EAM",
    severity: "high",
    category: "circulation",
    risk: "MAP measured at the heart overestimates cerebral pressure by ~15–20 mmHg (1 cmH₂O ≈ 0.74 mmHg). Cerebral hypoperfusion → watershed stroke / POVL.",
    mitigation: [
      "Zero the arterial line transducer at the EXTERNAL AUDITORY MEATUS (Circle of Willis level), NOT at the heart.",
      "Maintain cerebral MAP ≥ 70 mmHg (or within 20 % of pre-induction baseline).",
      "Anticipate hypotension on positioning — graded sit-up, fluid load, vasopressor (metaraminol / noradrenaline) infusion ready.",
      "Graduated compression stockings ± pneumatic calf compression to support venous return.",
    ],
  },
  {
    id: "st-pneumo",
    x: 165,
    y: 65,
    label: "Tension pneumocephalus",
    severity: "moderate",
    category: "neuro",
    risk: "CSF drains caudally during surgery; intracranial air rises and accumulates → tension pneumocephalus on emergence (delayed awakening, focal neurology, seizures).",
    mitigation: [
      "Strictly avoid N₂O for the entire case.",
      "Surgeon fills resection cavity with warm saline before dural closure.",
      "CT head if delayed awakening or new focal neurology post-op.",
      "Treat tension pneumocephalus with burr-hole release; supportive care with FiO₂ 1.0 to encourage nitrogen washout.",
    ],
  },
  {
    id: "st-neckflex",
    x: 215,
    y: 110,
    label: "Cervical flexion — cord ischaemia & quadriplegia",
    severity: "high",
    category: "neuro",
    risk: "Excessive cervical flexion combined with intra-operative hypotension and pin-fixation has caused mid-cervical cord infarction with permanent quadriplegia.",
    mitigation: [
      "Maintain ≥ two finger-breadths between chin and sternum at all times.",
      "Avoid intra-operative hypotension (cord watershed perfusion is pressure-dependent).",
      "Document neurology pre-op; consider somatosensory / motor evoked potentials in long cases.",
      "Use an armoured (reinforced) ETT taped — never tied — around the neck.",
    ],
  },
  {
    id: "st-airway",
    x: 235,
    y: 125,
    label: "Macroglossia & supraglottic airway oedema",
    severity: "moderate",
    category: "airway",
    risk: "Prolonged neck flexion + ETT/oral airway → venous and lymphatic obstruction → tongue, pharyngeal and supraglottic oedema → airway obstruction at extubation.",
    mitigation: [
      "Remove oral airways and bite-blocks once ETT is taped; keep the tongue inside the dental arches.",
      "Cuff-leak test before extubation; if absent, leave intubated and re-assess at 12–24 h.",
      "Consider tube-exchange catheter for at-risk extubation.",
      "Sit head up post-extubation; have re-intubation kit and surgical airway equipment immediately available.",
    ],
  },
  {
    id: "st-pin",
    x: 130,
    y: 95,
    label: "Mayfield 3-pin head fixation",
    severity: "high",
    category: "pressure",
    risk: "Hypertensive surge on pin application → ICP spikes, intracranial bleeding. Pin-site bleeding, CSF leak or depressed skull fracture in children / steroid-treated patients.",
    mitigation: [
      "Pre-treat with remifentanil 0.5–1 µg/kg or alfentanil 10 µg/kg ± lidocaine 1.5 mg/kg IV.",
      "Infiltrate pin sites with LA + adrenaline (0.5 % bupivacaine with 1:200,000 adrenaline).",
      "Avoid temporalis muscle, frontal sinus and superficial temporal artery.",
      "Torque 60–80 N in adults; reduce in children / thin skull. Tape eyes BEFORE pinning.",
    ],
  },
  {
    id: "st-sciatic",
    x: 305,
    y: 215,
    label: "Sciatic stretch & lower-limb compartment syndrome",
    severity: "moderate",
    category: "pressure",
    risk: "Sustained hip flexion stretches the sciatic nerve; dependent calves at heart level can develop well-leg compartment syndrome in long cases.",
    mitigation: [
      "Knees flexed and supported on padded gutters; legs elevated to heart level to encourage venous return.",
      "Keep hip flexion < 90°; avoid simultaneous hip flexion and knee extension (sciatic stretch).",
      "Pneumatic calf compression; document calf softness regularly in cases > 4 h.",
      "Heels floated on gel pads — no pressure on the Achilles tendon.",
    ],
  },
  {
    id: "st-buttock",
    x: 285,
    y: 200,
    label: "Sacrum & ischial tuberosities",
    severity: "moderate",
    category: "pressure",
    risk: "Whole body weight transmitted through the sacrum and ischial tuberosities → pressure necrosis, particularly in long (>4 h) cases or low cardiac-output states.",
    mitigation: [
      "Gel or visco-elastic seat cushion moulded under the buttocks before sit-up.",
      "Reposition / re-pad every 2 h if surgically possible; document inspection in the chart.",
      "Maintain normothermia and adequate cardiac output to preserve skin perfusion.",
    ],
  },
  {
    id: "st-arms",
    x: 250,
    y: 150,
    label: "Arms across the abdomen / lap",
    severity: "low",
    category: "pressure",
    risk: "Arms folded across the lap can compress the ulnar nerve at the elbow and obstruct venous access to the cubital fossa.",
    mitigation: [
      "Pad the medial epicondyle of both elbows; keep forearms supinated where possible.",
      "Site IV access pre-positioning; secure lines so they are not pulled when the patient is sat up.",
      "Confirm radial pulse and SpO₂ trace on both hands after positioning.",
    ],
  },
];

const ST_CATEGORY_LABEL: Record<SittingHotspot["category"], string> = {
  circulation: "Circulation",
  airway: "Airway",
  neuro: "Neurology",
  pressure: "Pressure / nerve",
};

const ST_SEVERITY_COLOUR: Record<SittingHotspot["severity"], string> = {
  high: POS_RED,
  moderate: POS_AMBER,
  low: POS_GREEN,
};

export const SittingPositionDetailedDiagram = () => {
  const [activeId, setActiveId] = useState<string>(ST_HOTSPOTS[0].id);
  const active = ST_HOTSPOTS.find((h) => h.id === activeId) ?? ST_HOTSPOTS[0];
  const accent = ST_SEVERITY_COLOUR[active.severity];

  return (
    <div className="my-6 rounded-xl border border-border bg-card overflow-hidden">
      <div className="px-4 py-3 border-b border-border bg-muted/30">
        <p className="text-sm font-semibold text-foreground">
          Sitting (Fowler's) position — dedicated review
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          Trunk semi-upright (~60°), head flexed and pinned in 3-point fixation, knees flexed and elevated to heart
          level. Highest VAE-risk neurosurgical position but unmatched midline exposure of the posterior fossa,
          pineal region and craniocervical junction. Demands a coordinated package of cardiovascular, airway and
          neuromonitoring strategies.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px]">
        {/* Diagram column */}
        <div className="p-3 bg-[hsl(var(--background))]">
          <svg viewBox="0 0 420 320" className="w-full h-auto" role="img" aria-label="Sitting position with circulation, airway and pressure-risk hotspots">
            {/* Floor line */}
            <line x1={20} y1={295} x2={400} y2={295} stroke="hsl(var(--border))" strokeWidth={1} strokeDasharray="2 4" />
            <text x={20} y={310} fontSize={9} fill="hsl(var(--muted-foreground))">FLOOR</text>

            {/* Chair / table base */}
            <rect x={240} y={250} width={140} height={8} fill="hsl(210 25% 35%)" />
            <rect x={295} y={258} width={30} height={32} fill="hsl(210 20% 45%)" />

            {/* Seat pad */}
            <rect x={245} y={232} width={130} height={18} rx={4} fill="hsl(45 35% 75%)" opacity={0.8} />
            <text x={385} y={245} fontSize={9} fill="hsl(var(--muted-foreground))">gel cushion</text>

            {/* Backrest tilted ~60° from horizontal */}
            <g transform="rotate(-60 260 232)">
              <rect x={155} y={225} width={110} height={14} rx={3} fill="hsl(210 25% 35%)" />
            </g>

            {/* Patient torso along backrest */}
            <g transform="rotate(-60 260 232)">
              <rect x={155} y={180} width={110} height={45} rx={16} fill="hsl(210 60% 70%)" stroke="hsl(210 60% 35%)" strokeWidth={1.5} />
              {/* Neck */}
              <rect x={138} y={195} width={20} height={16} fill="hsl(35 80% 80%)" stroke="hsl(35 60% 40%)" strokeWidth={1.2} />
              {/* Head — flexed onto chest */}
              <circle cx={130} cy={200} r={20} fill="hsl(35 80% 80%)" stroke="hsl(35 60% 40%)" strokeWidth={1.5} />
              {/* Mayfield pins */}
              <line x1={117} y1={184} x2={111} y2={176} stroke="hsl(280 60% 40%)" strokeWidth={3.2} />
              <line x1={143} y1={184} x2={149} y2={176} stroke="hsl(280 60% 40%)" strokeWidth={3.2} />
              <line x1={130} y1={181} x2={130} y2={172} stroke="hsl(280 60% 40%)" strokeWidth={3.2} />
            </g>

            {/* Arms folded across lap */}
            <line x1={235} y1={155} x2={285} y2={170} stroke="hsl(35 80% 80%)" strokeWidth={11} strokeLinecap="round" />
            <line x1={285} y1={170} x2={250} y2={185} stroke="hsl(35 80% 80%)" strokeWidth={11} strokeLinecap="round" />

            {/* Legs — knees flexed and elevated to heart level */}
            <line x1={285} y1={205} x2={345} y2={185} stroke="hsl(35 80% 80%)" strokeWidth={18} strokeLinecap="round" />
            <line x1={345} y1={185} x2={325} y2={235} stroke="hsl(35 80% 80%)" strokeWidth={16} strokeLinecap="round" />
            {/* Knee gutter pad */}
            <ellipse cx={345} cy={185} rx={9} ry={5} fill={POS_GREEN} opacity={0.85} />

            {/* Pneumatic calf compression cuff */}
            <rect x={315} y={215} width={22} height={12} rx={3} fill={POS_GREEN} opacity={0.6} />
            <text x={355} y={224} fontSize={9} fill={POS_GREEN} fontWeight={600}>calf SCDs</text>

            {/* External auditory meatus reference line — TRUE cerebral MAP */}
            <line x1={150} y1={80} x2={400} y2={80} stroke={POS_GREEN} strokeDasharray="4 3" strokeWidth={1.2} />
            <text x={400} y={73} fontSize={9} textAnchor="end" fill={POS_GREEN} fontWeight={700}>zero MAP at external auditory meatus</text>

            {/* Heart-level reference line */}
            <line x1={195} y1={170} x2={400} y2={170} stroke="hsl(var(--muted-foreground))" strokeDasharray="2 3" strokeWidth={0.8} />
            <text x={400} y={163} fontSize={9} textAnchor="end" fill="hsl(var(--muted-foreground))">heart level (RA)</text>

            {/* Hydrostatic gradient annotation */}
            <line x1={170} y1={80} x2={170} y2={170} stroke={POS_AMBER} strokeDasharray="3 3" strokeWidth={1.2} />
            <text x={108} y={130} fontSize={10} fill={POS_AMBER} fontWeight={700}>~ 25 cm</text>
            <text x={108} y={142} fontSize={9} fill={POS_AMBER}>hydrostatic gradient</text>

            {/* Surgical access — surgeon stands behind */}
            <path d="M 70 50 Q 105 45 145 65" fill="none" stroke="hsl(var(--primary))" strokeWidth={1.5} strokeDasharray="3 3" />
            <text x={70} y={42} fontSize={9} fill="hsl(var(--primary))" fontWeight={600}>surgeon</text>

            {/* CVC at SVC-RA junction */}
            <line x1={210} y1={155} x2={195} y2={170} stroke="hsl(var(--foreground))" strokeWidth={1.2} />
            <circle cx={195} cy={170} r={2.5} fill="hsl(var(--foreground))" />
            <text x={205} y={150} fontSize={9} fill="hsl(var(--muted-foreground))">multi-orifice CVC tip @ SVC–RA</text>

            {/* Hotspots */}
            {ST_HOTSPOTS.map((h, i) => {
              const isActive = h.id === activeId;
              const colour = ST_SEVERITY_COLOUR[h.severity];
              return (
                <g
                  key={h.id}
                  onPointerEnter={() => setActiveId(h.id)}
                  onClick={() => setActiveId(h.id)}
                  style={{ cursor: "pointer" }}
                >
                  <circle
                    cx={h.x}
                    cy={h.y}
                    r={isActive ? 13 : 11}
                    fill={colour}
                    fillOpacity={isActive ? 0.95 : 0.85}
                    stroke="hsl(var(--background))"
                    strokeWidth={2}
                  />
                  <text
                    x={h.x}
                    y={h.y + 3.5}
                    textAnchor="middle"
                    fontSize={10}
                    fontWeight={700}
                    fill="hsl(var(--background))"
                  >
                    {i + 1}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Severity legend */}
          <div className="mt-2 flex items-center gap-4 text-[11px] text-muted-foreground px-1 flex-wrap">
            <span className="flex items-center gap-1.5"><span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: POS_RED }} /> High risk</span>
            <span className="flex items-center gap-1.5"><span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: POS_AMBER }} /> Moderate</span>
            <span className="flex items-center gap-1.5"><span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: POS_GREEN }} /> Low / supportive</span>
          </div>
        </div>

        {/* Side panel: chip list + active detail */}
        <div className="border-t lg:border-t-0 lg:border-l border-border bg-muted/20 p-3 text-xs">
          <p className="text-[10px] uppercase tracking-wide font-semibold text-muted-foreground mb-2">
            Pressure / circulation / airway hotspots
          </p>
          <ol className="space-y-1.5 mb-3">
            {ST_HOTSPOTS.map((h, i) => {
              const isActive = h.id === activeId;
              const colour = ST_SEVERITY_COLOUR[h.severity];
              return (
                <li key={h.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(h.id)}
                    className={cn(
                      "w-full text-left flex items-start gap-2 rounded-md px-2 py-1.5 transition",
                      isActive ? "bg-background border border-border shadow-sm" : "hover:bg-background/60"
                    )}
                  >
                    <span
                      className="mt-0.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-[9px] font-bold shrink-0"
                      style={{ background: colour, color: "hsl(var(--background))" }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-foreground leading-tight">{h.label}</span>
                  </button>
                </li>
              );
            })}
          </ol>

          <div
            className="rounded-md border border-border bg-background p-2.5"
            style={{ borderLeft: `4px solid ${accent}` }}
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <p className="text-[11px] font-semibold text-foreground">{active.label}</p>
              <span
                className="text-[9px] uppercase tracking-wide px-1.5 py-0.5 rounded-md font-semibold shrink-0"
                style={{ background: `${accent}26`, color: accent }}
              >
                {ST_CATEGORY_LABEL[active.category]}
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground mb-2">
              <span className="font-medium text-foreground">Risk: </span>{active.risk}
            </p>
            <p className="text-[10px] uppercase tracking-wide font-semibold text-muted-foreground mb-1">
              Mitigation
            </p>
            <ol className="list-decimal list-inside space-y-1 text-[11px] text-muted-foreground">
              {active.mitigation.map((m, i) => <li key={i}>{m}</li>)}
            </ol>
          </div>
        </div>
      </div>

      {/* Procedures footer */}
      <div className="border-t border-border bg-muted/10 p-4">
        <p className="text-[10px] uppercase tracking-wide font-semibold text-muted-foreground mb-2">
          Typical neurosurgical procedures performed in the sitting position
        </p>
        <ul className="grid sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
          {ST_PROCEDURES.map((p) => (
            <li key={p.name} className="leading-snug">
              <span className="text-foreground font-medium">{p.name}.</span> {p.why}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// ── 7. SITTING (neurosurgical) ─────────────────────────────────────────

export const SittingPositionDiagram = () => (
  <PositionFrame
    title="Sitting (Fowler's) position"
    caption="Trunk semi-upright (~60°), head flexed and pinned, knees flexed and elevated to heart level. Classic neurosurgical position for posterior fossa and cervical spine."
    hotspots={[
      { id: "vae", x: 360, y: 95, label: "Venous air embolism (HIGH risk)", detail: "Operative site sits well above the right atrium → open dural sinuses entrain air. Reported VAE incidence 25–45 % (paradoxical air embolism via PFO 5–10 %). Mandatory monitoring: precordial Doppler ± TOE, EtCO₂, EtN₂. Place a multi-orifice CVC at the SVC-RA junction for aspiration. SCREEN FOR PFO pre-op (bubble echo) — relative contraindication if positive." },
      { id: "cpp", x: 320, y: 75, label: "Cerebral perfusion pressure", detail: "MAP measured at HEART level overestimates pressure at the brain by ~15–20 mmHg (1 cmH₂O ≈ 0.74 mmHg). ZERO the arterial transducer at the EXTERNAL AUDITORY MEATUS (Circle of Willis) to read true cerebral perfusion pressure. Hypotension on positioning is common — pressors and graduated compression stockings." },
      { id: "neckflex", x: 270, y: 100, label: "Neck flexion — quadriplegia risk", detail: "Excessive cervical flexion combined with hypotension and pin-fixation has caused mid-cervical cord infarction. Maintain two finger-breadths between chin and chest; avoid intra-operative hypotension." },
      { id: "tongue", x: 245, y: 115, label: "Macroglossia & airway oedema", detail: "Prolonged neck flexion + ETT/oral airway → venous obstruction → tongue and supraglottic oedema. Risk of airway obstruction at extubation. Plan for cuff-leak test and possible delayed extubation." },
      { id: "sciatic", x: 320, y: 200, label: "Sciatic stretch & compartment", detail: "Knees flexed and supported; legs at heart level to encourage venous return. Prolonged hip flexion can stretch the sciatic nerve and contribute to lower-limb compartment syndrome." },
      { id: "pneum", x: 280, y: 60, label: "Pneumocephalus", detail: "CSF drains, intracranial air rises and accumulates → tension pneumocephalus on emergence. Avoid N₂O. CT head if delayed awakening or new neurology." },
    ]}
    legend={<>Common procedures: posterior fossa tumours, cervical spine (anterior or posterior), shoulder surgery (modified beach chair).</>}
  >
    {/* Backrest tilted 60° */}
    <rect x={70} y={210} width={420} height={6} fill="hsl(210 25% 35%)" />
    <rect x={70} y={216} width={6} height={20} fill="hsl(210 20% 45%)" />
    {/* Seat */}
    <rect x={250} y={195} width={140} height={10} fill="hsl(210 25% 35%)" />
    {/* Backrest */}
    <g transform="rotate(-60 270 195)">
      <rect x={170} y={188} width={100} height={10} fill="hsl(210 25% 35%)" />
    </g>

    {/* Patient torso along backrest */}
    <g transform="rotate(-60 270 195)">
      <rect x={170} y={150} width={100} height={38} rx={14} fill="hsl(210 60% 70%)" stroke="hsl(210 60% 35%)" strokeWidth={1.5} />
      {/* Head + Mayfield */}
      <circle cx={155} cy={170} r={18} fill="hsl(35 80% 80%)" stroke="hsl(35 60% 40%)" strokeWidth={1.5} />
      <line x1={143} y1={155} x2={138} y2={148} stroke="hsl(280 60% 40%)" strokeWidth={3} />
      <line x1={167} y1={155} x2={172} y2={148} stroke="hsl(280 60% 40%)" strokeWidth={3} />
      <line x1={155} y1={152} x2={155} y2={144} stroke="hsl(280 60% 40%)" strokeWidth={3} />
    </g>

    {/* Legs flexed forward */}
    <line x1={300} y1={195} x2={360} y2={170} stroke="hsl(35 80% 80%)" strokeWidth={20} strokeLinecap="round" />
    <line x1={360} y1={170} x2={400} y2={205} stroke="hsl(35 80% 80%)" strokeWidth={18} strokeLinecap="round" />

    {/* Arterial transducer line */}
    <line x1={245} y1={115} x2={50} y2={115} stroke={POS_GREEN} strokeDasharray="4 3" strokeWidth={1.2} />
    <text x={50} y={108} fontSize={10} fill={POS_GREEN} fontWeight={700}>zero MAP at the external auditory meatus</text>
    <line x1={245} y1={115} x2={245} y2={195} stroke={POS_AMBER} strokeDasharray="2 2" />
    <text x={250} y={160} fontSize={10} fill={POS_AMBER} fontWeight={600}>~ 25 cm hydrostatic gradient</text>
  </PositionFrame>
);

// ── 8. BEACH CHAIR (shoulder) ──────────────────────────────────────────

export const BeachChairPositionDiagram = () => (
  <PositionFrame
    title="Beach-chair position"
    caption="Modified Fowler's at ~30–45° for shoulder arthroscopy and open shoulder surgery. Lower VAE risk than full sitting but cerebral perfusion remains a concern."
    hotspots={[
      { id: "cere", x: 250, y: 85, label: "Cerebral hypoperfusion (CIDS)", detail: "Cerebral ischaemic desaturation events: hypotension at the brain (MAP measured at heart overestimates cerebral pressure by 12–20 mmHg) has caused stroke and visual loss after shoulder surgery. Zero arterial line at tragus / external auditory meatus; treat hypotension promptly with pressors; maintain cerebral MAP ≥ 70 mmHg." },
      { id: "neck", x: 230, y: 115, label: "Cervical alignment", detail: "Head and neck must be in neutral alignment with both ears visible. Lateral flexion stretches the contralateral brachial plexus and compromises vertebral artery flow." },
      { id: "ettmove", x: 215, y: 100, label: "ETT migration", detail: "Sitting up moves the carina cephalad relative to the ETT — risk of accidental extubation. Re-confirm bilateral air entry after positioning." },
      { id: "psd", x: 320, y: 130, label: "Padded support / no shoulder slip", detail: "Hip and head straps prevent slipping; padded foot-board supports body weight. Avoid hyperextension of the operative shoulder traction." },
    ]}
    legend={<>Common procedures: shoulder arthroscopy, rotator-cuff repair, open shoulder reconstruction, awake fibreoptic intubation.</>}
  >
    {/* Chair base */}
    <rect x={130} y={210} width={300} height={6} fill="hsl(210 25% 35%)" />
    <rect x={250} y={216} width={60} height={10} fill="hsl(210 20% 45%)" />
    {/* Backrest 35° */}
    <g transform="rotate(-35 280 200)">
      <rect x={195} y={155} width={170} height={45} rx={10} fill="hsl(210 25% 35%)" />
      {/* Body */}
      <rect x={200} y={120} width={160} height={35} rx={14} fill="hsl(210 60% 70%)" stroke="hsl(210 60% 35%)" strokeWidth={1.5} />
      <circle cx={195} cy={138} r={18} fill="hsl(35 80% 80%)" stroke="hsl(35 60% 40%)" strokeWidth={1.5} />
    </g>
    {/* Legs */}
    <rect x={310} y={185} width={130} height={20} rx={8} fill="hsl(210 60% 70%)" stroke="hsl(210 60% 35%)" strokeWidth={1.5} />
    {/* Arm — operative shoulder traction */}
    <line x1={235} y1={120} x2={290} y2={70} stroke="hsl(35 80% 80%)" strokeWidth={14} strokeLinecap="round" />
    <line x1={290} y1={70} x2={310} y2={50} stroke={POS_AMBER} strokeWidth={2} strokeDasharray="3 2" />
    <text x={315} y={48} fontSize={10} fill={POS_AMBER} fontWeight={700}>traction</text>

    <line x1={210} y1={108} x2={50} y2={108} stroke={POS_GREEN} strokeDasharray="4 3" strokeWidth={1.2} />
    <text x={50} y={101} fontSize={10} fill={POS_GREEN} fontWeight={700}>zero MAP at tragus</text>
  </PositionFrame>
);
