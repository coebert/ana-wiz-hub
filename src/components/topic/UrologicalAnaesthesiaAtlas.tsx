import { AnatomyAtlas, BigLabel, WideSvg, ink, muted, fillA, accent, vessel, nerve, type AtlasPlate } from "./AnatomyAtlas";

/* 1 — Bladder and obturator nerve, coronal pelvis */
const Obturator = () => (
  <WideSvg title="Bladder lateral wall and obturator nerve, coronal section, labelled">
    <path d="M60 60 Q200 0 340 60 L320 200 Q200 260 80 200 Z" fill="none" stroke={ink} strokeWidth={3} />
    <ellipse cx={200} cy={165} rx={90} ry={65} fill={accent} fillOpacity={0.15} stroke={ink} strokeWidth={2} />
    <path d="M114 168 L150 172" stroke={muted} fill="none" strokeWidth={6} strokeLinecap="round" />
    <path d="M100 40 Q95 120 108 175 L70 240" stroke={nerve} fill="none" strokeWidth={2.5} />
    <path d="M300 40 Q305 120 292 175 L330 240" stroke={nerve} fill="none" strokeWidth={2.5} />
    <circle cx={85} cy={215} r={12} fill="none" stroke={ink} />
    <circle cx={315} cy={215} r={12} fill="none" stroke={ink} />
    <path d="M70 240 L60 290" stroke={nerve} fill="none" strokeWidth={2} />
    <BigLabel x={200} y={150} tx={330} ty={120}>Bladder</BigLabel>
    <BigLabel x={125} y={170} tx={40} ty={145} anchor="end">Resection loop</BigLabel>
    <BigLabel x={105} y={120} tx={40} ty={80} anchor="end">Obturator nerve (L2–L4)</BigLabel>
    <BigLabel x={85} y={215} tx={40} ty={215} anchor="end">Obturator canal</BigLabel>
    <BigLabel x={62} y={280} tx={40} ty={280} anchor="end">To adductors</BigLabel>
    <BigLabel x={200} y={30} tx={330} ty={30}>Pelvic brim</BigLabel>
  </WideSvg>
);

/* 2 — Prostate, TURP and the venous sinuses */
const Prostate = () => (
  <WideSvg title="Prostate, capsule and venous sinuses during TURP, sagittal, labelled">
    <ellipse cx={200} cy={90} rx={90} ry={60} fill={accent} fillOpacity={0.15} stroke={ink} strokeWidth={2} />
    <ellipse cx={200} cy={185} rx={50} ry={40} fill={fillA} stroke={ink} strokeWidth={2} />
    <ellipse cx={200} cy={185} rx={56} ry={46} fill="none" stroke={ink} strokeDasharray="3 2" />
    <path d="M200 150 L200 290" stroke={muted} fill="none" strokeWidth={5} />
    {[[154, 163], [246, 163], [154, 207], [246, 207]].map(([x, y]) => <circle key={x} cx={x} cy={y} r={5} fill={vessel} />)}
    <path d="M60 30 L60 100" stroke={muted} fill="none" strokeWidth={2} />
    <path d="M60 30 L120 50" stroke={muted} fill="none" strokeWidth={2} markerEnd="" />
    <BigLabel x={200} y={70} tx={330} ty={50}>Bladder (irrigation fluid)</BigLabel>
    <BigLabel x={200} y={185} tx={330} ty={150}>Prostate</BigLabel>
    <BigLabel x={254} y={195} tx={330} ty={200}>Capsule</BigLabel>
    <BigLabel x={154} y={163} tx={40} ty={170} anchor="end">Venous sinuses at capsule</BigLabel>
    <BigLabel x={200} y={260} tx={330} ty={260}>Urethra / resectoscope</BigLabel>
    <BigLabel x={60} y={60} tx={40} ty={40} anchor="end">Bag height = pressure</BigLabel>
  </WideSvg>
);

const plates: AtlasPlate[] = [
  {
    Diagram: Obturator,
    title: "Obturator nerve and the bladder wall",
    landmarks: [
      { text: "The obturator nerve (L2–L4) runs along the lateral pelvic wall, close to the inferolateral bladder wall, to the obturator canal", ref: "Gray's Anatomy 42e" },
      { text: "Diathermy at the lateral bladder wall can stimulate the nerve, causing sudden adductor contraction (obturator jerk)", ref: "Gray's Anatomy 42e" },
    ],
    relevance: "A spinal does not stop the obturator jerk during TURBT of lateral wall tumours — use an obturator nerve block or general anaesthesia with neuromuscular blockade to reduce the risk of bladder perforation.",
  },
  {
    Diagram: Prostate,
    title: "Prostate and fluid absorption in TURP",
    landmarks: [
      { text: "Irrigating fluid enters the circulation through opened prostatic venous sinuses, and into the tissues if the capsule is perforated", ref: "Hahn 2006 Fluid Absorption" },
      { text: "Absorption rises with irrigation pressure (bag height), resection time and capsular or sinus breach", ref: "Hahn 2006 Fluid Absorption" },
    ],
    relevance: "Keeping the patient awake under a spinal (block to T10) lets you spot early TURP syndrome — confusion, nausea, bradycardia, hypertension then hypotension — and capsular perforation (shoulder-tip or abdominal pain).",
  },
];

export const UrologicalAnaesthesiaAtlas = () => (
  <AnatomyAtlas id="anatomy-atlas" heading="Atlas of Urological Anatomy & Key Landmarks" topicId="urological-anaesthesia" plates={plates} />
);
