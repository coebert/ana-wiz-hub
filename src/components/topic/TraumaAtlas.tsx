import { AnatomyAtlas, Label, Svg, ink, muted, fillA, accent, danger, vessel, type AtlasPlate } from "./AnatomyAtlas";

/* 1 — Front-of-neck airway, sagittal-ish anterior view */
const Fona = () => (
  <Svg title="Laryngeal cartilages and cricothyroid membrane for front-of-neck access, labelled">
    <ellipse cx={200} cy={30} rx={60} ry={10} fill={fillA} stroke={ink} />
    <path d="M140 60 L260 60 L235 130 L200 145 L165 130 Z" fill={fillA} stroke={ink} strokeWidth={1.5} />
    <path d="M190 60 L200 72 L210 60" fill="none" stroke={ink} />
    <rect x={172} y={150} width={56} height={18} fill={accent} fillOpacity={0.25} stroke={accent} strokeWidth={2} />
    <path d="M160 172 L240 172 L240 192 L160 192 Z" fill={fillA} stroke={ink} strokeWidth={1.5} />
    {[205, 225, 245, 265].map((y) => <rect key={y} x={175} y={y} width={50} height={10} rx={4} fill={fillA} stroke={ink} />)}
    <path d="M140 205 Q200 230 260 205 L260 225 Q200 250 140 225 Z" fill="hsl(var(--primary) / 0.15)" stroke={ink} />
    <path d="M150 159 L250 159" stroke={danger} strokeWidth={2} strokeDasharray="6 3" />
    <Label x={200} y={30} tx={300} ty={25}>Hyoid bone</Label>
    <Label x={200} y={68} tx={300} ty={60}>Laryngeal prominence</Label>
    <Label x={240} y={100} tx={300} ty={100}>Thyroid cartilage</Label>
    <Label x={225} y={159} tx={300} ty={145}>Cricothyroid membrane</Label>
    <Label x={238} y={182} tx={300} ty={182}>Cricoid cartilage (complete ring)</Label>
    <Label x={175} y={240} tx={40} ty={270} anchor="end">Thyroid isthmus</Label>
    <Label x={176} y={250} tx={40} ty={225} anchor="end">Tracheal rings</Label>
    <Label x={152} y={159} tx={40} ty={159} anchor="end">Transverse stab incision</Label>
  </Svg>
);

/* 2 — Chest wall decompression sites */
const Chest = () => (
  <Svg title="Lateral chest wall showing the safe triangle and decompression sites, labelled">
    <path d="M90 30 Q60 150 110 280 L300 280 Q340 150 310 30 Z" fill={fillA} fillOpacity={0.4} stroke={ink} />
    {[70, 100, 130, 160, 190, 220].map((y) => <path key={y} d={`M95 ${y} Q200 ${y + 20} 315 ${y}`} fill="none" stroke={muted} strokeWidth={1.5} />)}
    <path d="M150 60 L250 60 L200 190 Z" fill={accent} fillOpacity={0.15} stroke={accent} strokeWidth={2} strokeDasharray="5 3" />
    <path d="M150 60 Q130 150 140 200" fill="none" stroke={danger} strokeWidth={6} strokeOpacity={0.35} />
    <path d="M250 60 Q280 120 300 140" fill="none" stroke={danger} strokeWidth={6} strokeOpacity={0.35} />
    <circle cx={200} cy={165} r={6} fill={danger} />
    <path d="M170 160 Q200 170 230 160" stroke={vessel} strokeWidth={2} fill="none" />
    <Label x={200} y={40} tx={200} ty={14} anchor="middle">Base of axilla (apex)</Label>
    <Label x={138} y={140} tx={40} ty={120} anchor="end">Latissimus dorsi</Label>
    <Label x={285} y={125} tx={340} ty={95}>Pectoralis major</Label>
    <Label x={200} y={165} tx={340} ty={200}>4th/5th ICS, mid-axillary</Label>
    <Label x={110} y={190} tx={40} ty={200} anchor="end">5th rib / nipple level (base)</Label>
    <Label x={225} y={163} tx={340} ty={250}>Go over the lower rib</Label>
  </Svg>
);

/* 3 — Pelvic ring and binder */
const Pelvis = () => (
  <Svg title="Pelvic ring with binder position at the greater trochanters, labelled">
    <path d="M90 60 Q200 20 310 60 Q330 140 270 190 L130 190 Q70 140 90 60 Z" fill={fillA} fillOpacity={0.5} stroke={ink} strokeWidth={2} />
    <path d="M175 60 L225 60 L215 150 L185 150 Z" fill={fillA} stroke={ink} />
    <circle cx={140} cy={175} r={18} fill="none" stroke={ink} strokeWidth={2} />
    <circle cx={260} cy={175} r={18} fill="none" stroke={ink} strokeWidth={2} />
    <path d="M190 195 L210 195" stroke={ink} strokeWidth={4} />
    <circle cx={95} cy={210} r={12} fill={fillA} stroke={ink} strokeWidth={2} />
    <circle cx={305} cy={210} r={12} fill={fillA} stroke={ink} strokeWidth={2} />
    <rect x={70} y={200} width={260} height={22} rx={6} fill={accent} fillOpacity={0.25} stroke={accent} strokeWidth={2} />
    <path d="M185 120 Q200 130 215 120 M180 140 Q200 150 220 140" stroke={vessel} strokeWidth={2} fill="none" />
    <path d="M110 70 L60 40" stroke={muted} />
    <Label x={95} y={60} tx={40} ty={45} anchor="end">Iliac crest (too high for binder)</Label>
    <Label x={200} y={90} tx={300} ty={20}>Sacrum / SI joints</Label>
    <Label x={210} y={135} tx={370} ty={110}>Presacral venous plexus</Label>
    <Label x={260} y={175} tx={370} ty={160}>Obturator foramen</Label>
    <Label x={200} y={195} tx={200} ty={260} anchor="middle">Pubic symphysis</Label>
    <Label x={305} y={210} tx={370} ty={235}>Greater trochanter</Label>
    <Label x={80} y={211} tx={40} ty={250} anchor="end">Binder centred here</Label>
  </Svg>
);

/* 4 — Aortic zones for REBOA */
const Aorta = () => (
  <Svg title="Aortic zones for endovascular balloon occlusion, labelled">
    <path d="M200 20 Q250 15 255 45 L240 60 L240 270" fill="none" stroke={vessel} strokeWidth={14} strokeLinecap="round" />
    <path d="M240 270 L200 295 M240 270 L280 295" stroke={vessel} strokeWidth={10} strokeLinecap="round" />
    <path d="M235 30 L225 5" stroke={vessel} strokeWidth={5} />
    <path d="M248 125 L290 125" stroke={vessel} strokeWidth={5} />
    <path d="M248 175 L300 175 M232 175 L180 175" stroke={vessel} strokeWidth={5} />
    <path d="M195 135 Q240 120 295 140" fill="none" stroke={ink} strokeWidth={3} strokeOpacity={0.5} />
    <rect x={262} y={45} width={10} height={80} fill={accent} fillOpacity={0.4} />
    <rect x={262} y={125} width={10} height={50} fill={muted} fillOpacity={0.5} />
    <rect x={262} y={175} width={10} height={95} fill={accent} fillOpacity={0.25} />
    <Label x={267} y={85} tx={300} ty={70}>Zone I</Label>
    <Label x={267} y={150} tx={300} ty={150}>Zone II (no occlusion)</Label>
    <Label x={267} y={220} tx={300} ty={230}>Zone III</Label>
    <Label x={230} y={10} tx={150} ty={10} anchor="end">Left subclavian artery</Label>
    <Label x={285} y={125} tx={150} ty={100} anchor="end">Coeliac trunk</Label>
    <Label x={190} y={175} tx={110} ty={175} anchor="end">Renal arteries</Label>
    <Label x={210} y={135} tx={110} ty={135} anchor="end">Diaphragm</Label>
    <Label x={215} y={288} tx={110} ty={260} anchor="end">Common iliac arteries</Label>
  </Svg>
);

const plates: AtlasPlate[] = [
  {
    Diagram: Fona,
    title: "Front-of-neck airway",
    landmarks: [
      { text: "Cricothyroid membrane lies between thyroid and cricoid cartilages — identify with the laryngeal handshake", ref: "DAS 2015 (CICO)" },
      { text: "Scalpel–bougie–tube technique: transverse stab, rotate blade, bougie, size 6.0 cuffed tube", ref: "DAS 2015 (CICO)" },
      { text: "Thyroid isthmus overlies tracheal rings 2–4 — below the cricoid, not at the membrane", ref: "Gray's Anatomy 42e" },
    ],
    relevance: "Mark the membrane before induction in predicted difficult trauma airways; if it is impalpable, use a vertical skin incision to find it.",
  },
  {
    Diagram: Chest,
    title: "Chest decompression sites",
    landmarks: [
      { text: "Safe triangle: lateral border of pectoralis major, anterior border of latissimus dorsi, line at the 5th intercostal space, apex below the axilla", ref: "BTS Pleural 2023" },
      { text: "ATLS recommends 4th/5th intercostal space just anterior to the mid-axillary line for needle decompression in adults", ref: "ATLS 10th ed" },
      { text: "Chest wall is thinner at the 4th/5th ICS lateral site than the 2nd ICS midclavicular site, so needle failure is less likely", ref: "Laan 2016 Chest Wall" },
    ],
    relevance: "In ventilated trauma patients, finger thoracostomy at the same site is often preferred over needle decompression.",
  },
  {
    Diagram: Pelvis,
    title: "Pelvic ring and binder position",
    landmarks: [
      { text: "Centre the binder over the greater trochanters, not the iliac crests — high placement reduces the fracture poorly", ref: "Bonner 2011 Binder" },
      { text: "Most pelvic fracture bleeding is venous, from the presacral and paravesical plexuses and fracture surfaces", ref: "Gray's Anatomy 42e" },
    ],
    relevance: "Apply a binder early in suspected pelvic injury with shock; avoid repeated springing of the pelvis; plan for angioembolisation or pre-peritoneal packing.",
  },
  {
    Diagram: Aorta,
    title: "Aortic zones for REBOA",
    landmarks: [
      { text: "Zone I (left subclavian to coeliac) for abdominal bleeding; Zone III (lowest renal to bifurcation) for pelvic bleeding; Zone II is not used for occlusion", ref: "Stannard 2011 REBOA" },
      { text: "UK-REBOA found higher mortality with REBOA than standard care — not supported outside research in UK practice", ref: "UK-REBOA 2023" },
    ],
    relevance: "Occlusion causes distal ischaemia and severe hypertension above the balloon; expect reperfusion hyperkalaemia and acidosis on deflation.",
  },
];

export const TraumaAtlas = () => (
  <AnatomyAtlas id="anatomy-atlas" heading="Atlas of Trauma Anatomy & Key Landmarks" topicId="trauma-emergency" plates={plates} />
);
