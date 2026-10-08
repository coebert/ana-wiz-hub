import { AnatomyAtlas, BigLabel, Svg, ink, muted, fillA, accent, vessel, type AtlasPlate } from "./AnatomyAtlas";

/* 1 — Circle of Willis, inferior view */
const Willis = () => (
  <Svg title="Circle of Willis, inferior view, labelled">
    <path d="M200 270 L200 200" stroke={vessel} strokeWidth={6} />
    <path d="M185 290 L198 270 M215 290 L202 270" stroke={vessel} strokeWidth={4} />
    <path d="M200 200 L160 185 M200 200 L240 185" stroke={vessel} strokeWidth={4} />
    <path d="M160 185 L150 120 M240 185 L250 120" stroke={vessel} strokeWidth={2} />
    <path d="M150 120 L185 80 L215 80 L250 120" fill="none" stroke={vessel} strokeWidth={3} />
    <path d="M185 80 L215 80" stroke={vessel} strokeWidth={2} />
    <path d="M185 80 L175 30 M215 80 L225 30" stroke={vessel} strokeWidth={3} />
    <path d="M150 120 L70 110 M250 120 L330 110" stroke={vessel} strokeWidth={4} />
    <circle cx={150} cy={120} r={6} fill={vessel} />
    <circle cx={250} cy={120} r={6} fill={vessel} />
    <path d="M160 185 L90 200 M240 185 L310 200" stroke={vessel} strokeWidth={3} />
    <BigLabel x={200} y={235} tx={260} ty={250}>Basilar artery</BigLabel>
    <BigLabel x={186} y={285} tx={120} ty={290} anchor="end">Vertebral arteries</BigLabel>
    <BigLabel x={110} y={195} tx={40} ty={215} anchor="end">Posterior cerebral</BigLabel>
    <BigLabel x={155} y={150} tx={40} ty={160} anchor="end">Posterior communicating</BigLabel>
    <BigLabel x={250} y={120} tx={340} ty={140}>Internal carotid</BigLabel>
    <BigLabel x={300} y={112} tx={340} ty={90}>Middle cerebral</BigLabel>
    <BigLabel x={222} y={50} tx={300} ty={30}>Anterior cerebral</BigLabel>
    <BigLabel x={200} y={80} tx={120} ty={40} anchor="end">Anterior communicating</BigLabel>
  </Svg>
);

/* 2 — Intracranial compartments and herniation sites, coronal */
const Compartments = () => (
  <Svg title="Intracranial compartments and herniation sites, coronal section, labelled">
    <ellipse cx={200} cy={130} rx={160} ry={115} fill="none" stroke={ink} strokeWidth={4} />
    <ellipse cx={200} cy={120} rx={145} ry={100} fill={fillA} stroke={muted} />
    <path d="M200 25 L200 120" stroke={ink} strokeWidth={2} />
    <path d="M70 175 Q200 140 330 175" fill="none" stroke={ink} strokeWidth={2.5} />
    <path d="M165 110 Q180 80 195 110 Z M205 110 Q220 80 235 110 Z" fill={accent} fillOpacity={0.35} stroke={accent} />
    <path d="M185 175 L185 280 M215 175 L215 280" stroke={ink} strokeWidth={1.5} />
    <path d="M170 245 L230 245" stroke={ink} strokeWidth={4} />
    <path d="M140 140 Q160 165 185 160" fill="none" stroke={vessel} strokeWidth={2} strokeDasharray="4 2" />
    <BigLabel x={60} y={120} tx={-20} ty={60} anchor="end">Skull (fixed volume)</BigLabel>
    <BigLabel x={200} y={60} tx={290} ty={20}>Falx cerebri</BigLabel>
    <BigLabel x={225} y={100} tx={360} ty={70}>Lateral ventricles (CSF)</BigLabel>
    <BigLabel x={300} y={165} tx={360} ty={150}>Tentorium cerebelli</BigLabel>
    <BigLabel x={160} y={160} tx={-20} ty={170} anchor="end">Uncal herniation</BigLabel>
    <BigLabel x={200} y={245} tx={300} ty={260}>Foramen magnum</BigLabel>
    <BigLabel x={200} y={210} tx={120} ty={280} anchor="end">Brainstem / tonsils</BigLabel>
  </Svg>
);

/* 3 — Dural venous sinuses, lateral */
const Sinuses = () => (
  <Svg title="Dural venous sinuses, lateral view, labelled">
    <path d="M60 150 Q80 40 220 30 Q350 35 360 150 Q350 230 260 250 L120 250 Q60 230 60 150" fill={fillA} fillOpacity={0.4} stroke={ink} strokeWidth={2} />
    <path d="M90 90 Q200 15 340 110" fill="none" stroke="hsl(var(--primary) / 0.7)" strokeWidth={6} />
    <path d="M340 110 Q355 150 330 175 L250 190" fill="none" stroke="hsl(var(--primary) / 0.7)" strokeWidth={6} />
    <path d="M250 190 Q220 200 215 240 L205 290" fill="none" stroke="hsl(var(--primary) / 0.7)" strokeWidth={6} />
    <path d="M140 110 Q240 90 300 150" fill="none" stroke="hsl(var(--primary) / 0.5)" strokeWidth={3} />
    <circle cx={340} cy={150} r={7} fill="hsl(var(--primary) / 0.8)" />
    <BigLabel x={200} y={35} tx={200} ty={12} anchor="middle">Superior sagittal sinus</BigLabel>
    <BigLabel x={220} y={100} tx={30} ty={60} anchor="end">Straight sinus</BigLabel>
    <BigLabel x={340} y={150} tx={380} ty={130}>Confluence</BigLabel>
    <BigLabel x={300} y={182} tx={380} ty={200}>Transverse sinus</BigLabel>
    <BigLabel x={235} y={215} tx={370} ty={250}>Sigmoid sinus</BigLabel>
    <BigLabel x={207} y={280} tx={120} ty={290} anchor="end">Internal jugular vein</BigLabel>
  </Svg>
);

const plates: AtlasPlate[] = [
  {
    Diagram: Willis,
    title: "Circle of Willis",
    landmarks: [
      { text: "Anastomosis of the internal carotid and vertebrobasilar systems via the anterior and posterior communicating arteries", ref: "Gray's Anatomy 42e" },
      { text: "A complete, symmetrical circle is present in only a minority of adults — collateral flow during carotid clamping or vasospasm is unpredictable", ref: "Krabbe-Hartkamp 1998" },
      { text: "Most saccular aneurysms arise at branch points of the anterior circulation (anterior communicating, posterior communicating, middle cerebral bifurcation)", ref: "Gray's Anatomy 42e" },
    ],
    relevance: "Avoid hypertensive surges before an aneurysm is secured; maintain perfusion pressure during temporary clipping.",
  },
  {
    Diagram: Compartments,
    title: "Intracranial compartments",
    landmarks: [
      { text: "Monro–Kellie: brain, blood and CSF share a fixed volume — a rise in one must be offset by a fall in another or ICP rises", ref: "Mokri 2001 Monro-Kellie" },
      { text: "Falx and tentorium divide the cranium; uncal herniation compresses the third nerve, tonsillar herniation at the foramen magnum compresses the medulla", ref: "Gray's Anatomy 42e" },
    ],
    relevance: "Reduce intracranial volume with head-up tilt, normocapnia, osmotherapy and good venous drainage; a dilating pupil or Cushing's response signals herniation.",
  },
  {
    Diagram: Sinuses,
    title: "Dural venous sinuses",
    landmarks: [
      { text: "Superior sagittal → confluence → transverse → sigmoid sinus → internal jugular vein", ref: "Gray's Anatomy 42e" },
      { text: "Sinuses are held open by dura and cannot collapse, so air is entrained when the head is above the heart (e.g. sitting craniotomy)", ref: "Mirski 2007 Air Embolism" },
    ],
    relevance: "In sitting or head-up cases, monitor end-tidal CO₂ (and consider TOE/Doppler); if air embolism occurs, flood the field, lower the head and support the circulation.",
  },
];

export const NeuroanaesthesiaAtlas = () => (
  <AnatomyAtlas id="anatomy-atlas" heading="Atlas of Neurosurgical Anatomy & Key Landmarks" topicId="neuroanaesthesia" plates={plates} />
);
