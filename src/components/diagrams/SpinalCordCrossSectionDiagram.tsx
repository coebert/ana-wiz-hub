import { useState } from "react";

type LayerKey = "skin" | "subcut" | "supraspinous" | "interspinous" | "flavum" | "epidural" | "dura" | "arachnoid" | "subarachnoid" | "pia" | "cord" | "pll" | "vertebral-body";

interface LayerInfo {
  label: string;
  h: number;
  color: string;
  detail: string;
  clinicalNote: string;
}

const layers: Record<LayerKey, LayerInfo> = {
  skin: { label: "Skin", h: 16, color: "hsl(30, 50%, 65%)", detail: "Epidermis and dermis. Local anaesthetic infiltration provides skin analgesia for needle insertion.", clinicalNote: "Infiltrate with 1% lidocaine before epidural/spinal needle." },
  subcut: { label: "Subcutaneous Fat", h: 20, color: "hsl(40, 55%, 72%)", detail: "Variable thickness (1–8 cm). Depth to epidural space correlates with BMI. Thicker in obese patients.", clinicalNote: "In morbid obesity, distance to epidural may exceed standard 8 cm Tuohy needle." },
  supraspinous: { label: "Supraspinous Ligament", h: 14, color: "hsl(210, 30%, 60%)", detail: "Connects tips of spinous processes. Strong midline structure. First significant resistance in midline approach. Continuous with ligamentum nuchae in cervical region.", clinicalNote: "Dense fibrous tissue — provides initial resistance to needle. May be calcified in elderly." },
  interspinous: { label: "Interspinous Ligament", h: 22, color: "hsl(200, 35%, 55%)", detail: "Connects adjacent spinous processes. Fibres posterosuperior to anteroinferior. Less well-defined than supraspinous. May be deficient in elderly — 'false loss of resistance'.", clinicalNote: "Gritty feel during advancement. Off-midline (paramedian) approach bypasses this structure entirely." },
  flavum: { label: "Ligamentum Flavum", h: 20, color: "hsl(55, 60%, 55%)", detail: "Paired elastic ligaments connecting adjacent laminae. 3–5 mm thick at lumbar level (up to 6 mm at L2/3). 80% elastic fibres (elastin) — hence yellow colour. Thickest and most reliable in midline. May have midline gap in up to 10% of patients.", clinicalNote: "'Loss of resistance' target for epidural. Calcification in elderly/fluorosis increases difficulty. Midline gap → false LOR. Paramedian approach: more reliable encounter with flavum." },
  epidural: { label: "Epidural Space", h: 24, color: "hsl(140, 45%, 50%)", detail: "Potential space between flavum/periosteum and dura. Contains fat, lymphatics, internal vertebral venous plexus (Batson's), segmental arteries, and spinal nerve roots. Widest posteriorly at L2 (5–6 mm). Narrowest at cervical level (1–2 mm). Negative pressure (2–5 cmH₂O) in thoracic region.", clinicalNote: "Target for epidural anaesthesia. Negative pressure thoracically (hanging drop technique). Engorged Batson's plexus in pregnancy → reduced volume → higher block with same dose. Segmental arteries — haematoma risk with anticoagulants (AAGBI guidelines)." },
  dura: { label: "Dura Mater", h: 12, color: "hsl(270, 40%, 55%)", detail: "Tough outer meningeal layer (~0.4 mm thick). Continuous with cranial dura. Dural sac ends at S2 in adults (S3–S4 in children). Fibres predominantly longitudinal — pencil-point needles part fibres rather than cutting.", clinicalNote: "Puncture → CSF flow. Accidental dural puncture with Tuohy (16/18G) → PDPH in 70–80%. Pencil-point needles (Whitacre/Sprotte) → PDPH <1% with 25–27G. Epidural blood patch success rate ~90%." },
  arachnoid: { label: "Arachnoid Mater", h: 8, color: "hsl(290, 35%, 60%)", detail: "Thin, avascular membrane adherent to inner dura. Subdural space is a potential space (not normally present). Contains no blood vessels — 'avascular barrier'. The main pharmacological barrier to drug transfer (not dura).", clinicalNote: "Subdural block: unexpectedly high, patchy, slow onset — catheter between dura and arachnoid. Arachnoid is the primary barrier to epidural drug diffusion (lipophilic drugs cross more readily)." },
  subarachnoid: { label: "Subarachnoid Space (CSF)", h: 26, color: "hsl(195, 60%, 55%)", detail: "Contains CSF (~75 ml in spinal canal, total 150 ml), nerve roots, blood vessels, arachnoid trabeculae. Cauda equina floats freely below L1/2. CSF: SG 1.003–1.009, pH 7.32, protein 15–45 mg/dL, glucose 2.8–4.4 mmol/L.", clinicalNote: "Spinal anaesthesia target. Hyperbaric bupivacaine (SG 1.026) sinks with gravity. Isobaric (SG ~1.005) gives less positional spread. Block height: baricity + position + volume + patient factors (height, age, pregnancy)." },
  pia: { label: "Pia Mater", h: 8, color: "hsl(320, 40%, 55%)", detail: "Innermost meningeal layer, adherent to cord surface. Highly vascular (carries perforating vessels into cord). Filum terminale (extension of pia) from conus to sacrum (S2). Dentate ligaments: lateral pia extensions anchoring cord to dura.", clinicalNote: "Dentate ligaments (pia → arachnoid → dura) suspend the cord laterally — 21 pairs between foramen magnum and T12/L1. Filum terminale internum (pia) vs externum (dura + pia → coccyx)." },
  cord: { label: "Spinal Cord", h: 38, color: "hsl(0, 0%, 70%)", detail: "Grey matter (H/butterfly shape — cell bodies, synapses) surrounded by white matter (ascending/descending tracts). Anterior horn: LMN cell bodies. Posterior horn: sensory relay (substantia gelatinosa). Lateral horn: sympathetic (T1–L2). Central canal: CSF (ependyma-lined).", clinicalNote: "ASA supplies anterior 2/3 (motor, pain, temperature, autonomic). PSA supplies posterior 1/3 (proprioception, vibration). Cord ends L1/2 in adults, L3 in neonates. Cervical and lumbar enlargements for limb innervation." },
  pll: { label: "Posterior Longitudinal Lig.", h: 6, color: "hsl(25, 40%, 52%)", detail: "Runs on posterior surface of vertebral bodies (anterior wall of spinal canal). Narrower than ALL, especially at lumbar level — disc prolapses more easily posterolaterally. Attached to discs but loosely to vertebral bodies.", clinicalNote: "PLL is the deepest anterior structure encountered if a needle passes through the entire canal. Posterior disc prolapse may be contained by PLL (central) or escape laterally (posterolateral — compresses nerve root in lateral recess)." },
  "vertebral-body": { label: "Vertebral Body", h: 14, color: "hsl(35, 30%, 58%)", detail: "Cancellous bone with cortical shell. Weight-bearing structure. Increases in size from cervical to lumbar. Separated by intervertebral discs (annulus fibrosus + nucleus pulposus). Anterior longitudinal ligament on anterior surface (limits extension).", clinicalNote: "ALL runs on anterior surface of vertebral bodies — limits hyperextension. Vertebral body fractures (osteoporotic compression) can cause canal compromise. Basivertebral veins drain to epidural venous plexus." },
};

const layerOrder: LayerKey[] = ["skin", "subcut", "supraspinous", "interspinous", "flavum", "epidural", "dura", "arachnoid", "subarachnoid", "pia", "cord", "pll", "vertebral-body"];

const SpinalCordCrossSectionDiagram = () => {
  const [selected, setSelected] = useState<LayerKey>("epidural");
  const [showSutures, setShowSutures] = useState<boolean>(true);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const info = layers[selected];

  const svgWidth = 310;
  const layerWidth = 195;
  const xOffset = 18;

  const yPositions: Record<LayerKey, number> = {} as any;
  let cumY = 10;
  for (const key of layerOrder) {
    yPositions[key] = cumY;
    cumY += layers[key].h;
  }
  const totalH = cumY + 14;

  return (
    <div className="my-6 space-y-4">
      <div className="bg-muted/30 rounded-xl border border-border p-4">
        <DiagramToggleBar
          title="Spinal Cord Layers — Neuraxial Cross-Section"
          subtitle="Tap a layer to see clinical relevance for epidural and spinal anaesthesia"
          toggles={[
            { label: "Sutures", active: showSutures, onChange: () => setShowSutures(s => !s) },
            { label: "Labels", active: showLabels, onChange: () => setShowLabels(s => !s) },
          ]}
        />

      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="flex-shrink-0 mx-auto">
          <svg viewBox={`0 0 ${svgWidth} ${totalH}`} width="310" height={totalH}>
            <defs>
              {/* Skin texture */}
              <pattern id="sc-skinTex" patternUnits="userSpaceOnUse" width="5" height="5">
                <circle cx="2.5" cy="2.5" r="0.35" fill="hsl(30, 40%, 50%)" opacity="0.2" />
              </pattern>
              {/* Fat globules */}
              <pattern id="sc-fatTex" patternUnits="userSpaceOnUse" width="12" height="10">
                <ellipse cx="6" cy="5" rx="4" ry="3" fill="hsl(40, 50%, 70%)" opacity="0.25" stroke="hsl(38, 40%, 58%)" strokeWidth="0.3" />
              </pattern>
              {/* Ligament collagen fibres */}
              <pattern id="sc-collagen" patternUnits="userSpaceOnUse" width="4" height="14" patternTransform="rotate(10)">
                <line x1="2" y1="0" x2="2" y2="14" stroke="hsl(210, 25%, 55%)" strokeWidth="0.5" opacity="0.3" />
              </pattern>
              {/* Elastic fibres (flavum) */}
              <pattern id="sc-elastic" patternUnits="userSpaceOnUse" width="8" height="20">
                <path d="M4,0 Q6,5 4,10 Q2,15 4,20" fill="none" stroke="hsl(55, 50%, 48%)" strokeWidth="0.6" opacity="0.3" />
              </pattern>
              {/* CSF shimmer */}
              <linearGradient id="sc-csfGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(195, 60%, 55%)" stopOpacity="0.15" />
                <stop offset="50%" stopColor="hsl(195, 65%, 65%)" stopOpacity="0.25" />
                <stop offset="100%" stopColor="hsl(195, 60%, 55%)" stopOpacity="0.15" />
              </linearGradient>
              {/* Dura texture */}
              <pattern id="sc-duraTex" patternUnits="userSpaceOnUse" width="6" height="3">
                <line x1="0" y1="1.5" x2="6" y2="1.5" stroke="hsl(270, 35%, 50%)" strokeWidth="0.4" opacity="0.3" />
              </pattern>
              {/* Vessel glow */}
              <filter id="sc-glow">
                <feGaussianBlur stdDeviation="1.2" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* Spinous process outlines — detailed bone anatomy */}
            <g opacity="0.25" fill="hsl(var(--muted-foreground))" fillOpacity="0.04" stroke="hsl(var(--muted-foreground))" strokeWidth="1">
              {/* Left spinous process & lamina */}
              <path d={`M${xOffset - 8},${yPositions.supraspinous - 2} L${xOffset - 28},${yPositions.interspinous + 5} Q${xOffset - 30},${yPositions.flavum - 2} ${xOffset - 18},${yPositions.flavum + 2} L${xOffset - 5},${yPositions.flavum}`} />
              {/* Right spinous process & lamina */}
              <path d={`M${xOffset + layerWidth + 8},${yPositions.supraspinous - 2} L${xOffset + layerWidth + 28},${yPositions.interspinous + 5} Q${xOffset + layerWidth + 30},${yPositions.flavum - 2} ${xOffset + layerWidth + 18},${yPositions.flavum + 2} L${xOffset + layerWidth + 5},${yPositions.flavum}`} />
              {/* Lamina extending to epidural/dura level */}
              <path d={`M${xOffset - 18},${yPositions.flavum + 2} C${xOffset - 22},${yPositions.epidural + 5} ${xOffset - 20},${yPositions.epidural + 12} ${xOffset - 12},${yPositions.dura}`} strokeDasharray="3 2" />
              <path d={`M${xOffset + layerWidth + 18},${yPositions.flavum + 2} C${xOffset + layerWidth + 22},${yPositions.epidural + 5} ${xOffset + layerWidth + 20},${yPositions.epidural + 12} ${xOffset + layerWidth + 12},${yPositions.dura}`} strokeDasharray="3 2" />
              {/* Pedicles — lateral to canal */}
              <ellipse cx={xOffset - 15} cy={yPositions.epidural + layers.epidural.h / 2} rx="5" ry="8" strokeDasharray="2 2" opacity="0.4" />
              <ellipse cx={xOffset + layerWidth + 15} cy={yPositions.epidural + layers.epidural.h / 2} rx="5" ry="8" strokeDasharray="2 2" opacity="0.4" />
              {/* Transverse processes hint */}
              <line x1={xOffset - 20} y1={yPositions.epidural + layers.epidural.h / 2} x2={xOffset - 35} y2={yPositions.epidural + layers.epidural.h / 2 - 3} strokeDasharray="3 2" opacity="0.2" />
              <line x1={xOffset + layerWidth + 20} y1={yPositions.epidural + layers.epidural.h / 2} x2={xOffset + layerWidth + 35} y2={yPositions.epidural + layers.epidural.h / 2 - 3} strokeDasharray="3 2" opacity="0.2" />
            </g>

            {/* Bony anatomy labels */}
            <g opacity="0.2" fontSize="3.5" fill="hsl(var(--muted-foreground))">
              <text x={xOffset - 32} y={yPositions.interspinous + 8} fontSize="3" textAnchor="end">Spinous process</text>
              <text x={xOffset - 18} y={yPositions.epidural + layers.epidural.h / 2 + 3} fontSize="2.8" textAnchor="middle">Pedicle</text>
              <text x={xOffset + layerWidth + 18} y={yPositions.epidural + layers.epidural.h / 2 + 3} fontSize="2.8" textAnchor="middle">Pedicle</text>
              <text x={xOffset - 20} y={yPositions.flavum + 6} fontSize="2.8" textAnchor="end">Lamina</text>
            </g>

            {/* Epidural needle trajectory — Tuohy */}
            <g opacity="0.45">
              <path
                d={`M${xOffset - 18},2 C${xOffset - 8},${yPositions.epidural / 2} ${xOffset + 18},${yPositions.epidural - 12} ${xOffset + 25},${yPositions.epidural + layers.epidural.h / 2}`}
                stroke="hsl(var(--muted-foreground))" strokeWidth="2" fill="none"
              />
              {/* Huber point bevel */}
              <circle cx={xOffset + 25} cy={yPositions.epidural + layers.epidural.h / 2} r="2.5" fill="hsl(140, 45%, 50%)" opacity="0.8" />
              <circle cx={xOffset + 25} cy={yPositions.epidural + layers.epidural.h / 2} r="5" fill="hsl(140, 45%, 50%)" opacity="0.12" />
              <text x={xOffset - 26} y={8} fontSize="5.5" fill="hsl(var(--muted-foreground))" fontWeight="600">Tuohy</text>
              {/* Epidural catheter threading through Tuohy */}
              <path
                d={`M${xOffset + 25},${yPositions.epidural + layers.epidural.h / 2} C${xOffset + 35},${yPositions.epidural + layers.epidural.h / 2 - 3} ${xOffset + 50},${yPositions.epidural + layers.epidural.h / 2 + 2} ${xOffset + 70},${yPositions.epidural + layers.epidural.h / 2 - 1}`}
                stroke="hsl(140, 45%, 50%)" strokeWidth="0.8" fill="none" strokeDasharray="2 1.5" opacity="0.4"
              />
              <text x={xOffset + 72} y={yPositions.epidural + layers.epidural.h / 2 - 3} fontSize="3" fill="hsl(140, 45%, 50%)" opacity="0.5">catheter (3–5 cm in space)</text>
            </g>

            {/* Spinal needle trajectory */}
            <g opacity="0.3">
              <path
                d={`M${xOffset - 10},4 C${xOffset + 2},${yPositions.subarachnoid / 2} ${xOffset + 24},${yPositions.subarachnoid - 12} ${xOffset + 32},${yPositions.subarachnoid + layers.subarachnoid.h / 2}`}
                stroke="hsl(195, 60%, 55%)" strokeWidth="1.2" strokeDasharray="3 3" fill="none"
              />
              <circle cx={xOffset + 32} cy={yPositions.subarachnoid + layers.subarachnoid.h / 2} r="2" fill="hsl(195, 60%, 55%)" opacity="0.7" />
            </g>

            {/* CSE (Combined Spinal-Epidural) — needle-through-needle annotation */}
            <g opacity="0.25">
              <path
                d={`M${xOffset + 25},${yPositions.epidural + layers.epidural.h / 2} L${xOffset + 28},${yPositions.subarachnoid + 4}`}
                stroke="hsl(280, 45%, 55%)" strokeWidth="0.8" fill="none" strokeDasharray="2 2"
              />
              <circle cx={xOffset + 28} cy={yPositions.subarachnoid + 4} r="1.5" fill="hsl(280, 45%, 55%)" opacity="0.6" />
              <text x={xOffset + 32} y={yPositions.subarachnoid + 3} fontSize="3" fill="hsl(280, 45%, 55%)" opacity="0.6">CSE: spinal needle through Tuohy</text>
            </g>

            {layerOrder.map((key) => {
              const l = layers[key];
              const y = yPositions[key];
              const isActive = selected === key;

              return (
                <g key={key} className="cursor-pointer" onClick={() => setSelected(key)}>
                  {key === "cord" ? (() => {
                    // Centre of cord
                    const cx = xOffset + layerWidth / 2;
                    const cy = y + l.h / 2;
                    // Radii
                    const rX = 65; // horizontal radius of cord ellipse
                    const rY = l.h / 2 - 1;

                    return (
                    <g>
                      {/* ── White matter: overall cord ellipse ── */}
                      <ellipse
                        cx={cx} cy={cy} rx={rX} ry={rY}
                        fill="hsl(0, 0%, 82%)"
                        fillOpacity={isActive ? 0.35 : 0.12}
                        stroke={isActive ? "hsl(0, 0%, 65%)" : "hsl(var(--border))"}
                        strokeWidth={isActive ? 1.5 : 0.5}
                        className="transition-all duration-200"
                      />

                      {/* ── White matter tract regions (filled wedges) ── */}
                      <g opacity={isActive ? 0.22 : 0.06}>
                        {/* Dorsal columns (fasciculus gracilis + cuneatus) */}
                        <path d={`M${cx - 12},${cy - 2} L${cx - 16},${cy - rY + 1} A${rX},${rY} 0 0,1 ${cx + 16},${cy - rY + 1} L${cx + 12},${cy - 2} Z`}
                          fill="hsl(210, 50%, 60%)" />
                        {/* Dorsal column midline septum */}
                        <line x1={cx} y1={cy - 2} x2={cx} y2={cy - rY + 2}
                          stroke="hsl(0, 0%, 55%)" strokeWidth="0.5" opacity="0.5" />

                        {/* Lateral corticospinal tracts */}
                        <path d={`M${cx - 18},${cy - 6} C${cx - 35},${cy - 12} ${cx - rX + 8},${cy - 8} ${cx - rX + 5},${cy} C${cx - rX + 8},${cy + 5} ${cx - 30},${cy + 6} ${cx - 20},${cy + 3} Z`}
                          fill="hsl(0, 45%, 58%)" />
                        <path d={`M${cx + 18},${cy - 6} C${cx + 35},${cy - 12} ${cx + rX - 8},${cy - 8} ${cx + rX - 5},${cy} C${cx + rX - 8},${cy + 5} ${cx + 30},${cy + 6} ${cx + 20},${cy + 3} Z`}
                          fill="hsl(0, 45%, 58%)" />

                        {/* Spinothalamic tracts (anterolateral) */}
                        <path d={`M${cx - 22},${cy + 4} C${cx - 40},${cy + 8} ${cx - rX + 5},${cy + 4} ${cx - rX + 8},${cy + rY - 6} C${cx - 35},${cy + rY - 2} ${cx - 20},${cy + 10} ${cx - 16},${cy + 5} Z`}
                          fill="hsl(45, 55%, 55%)" />
                        <path d={`M${cx + 22},${cy + 4} C${cx + 40},${cy + 8} ${cx + rX - 5},${cy + 4} ${cx + rX - 8},${cy + rY - 6} C${cx + 35},${cy + rY - 2} ${cx + 20},${cy + 10} ${cx + 16},${cy + 5} Z`}
                          fill="hsl(45, 55%, 55%)" />

                        {/* Anterior corticospinal tract */}
                        <path d={`M${cx - 8},${cy + 3} L${cx - 10},${cy + rY - 3} A${rX},${rY} 0 0,0 ${cx + 10},${cy + rY - 3} L${cx + 8},${cy + 3} Z`}
                          fill="hsl(140, 40%, 55%)" />
                      </g>

                      {/* White matter tract labels */}
                      <g opacity={isActive ? 0.55 : 0.1} fontSize="3.5" fill="hsl(var(--muted-foreground))">
                        <text x={cx} y={cy - rY + 6} textAnchor="middle" fontWeight="500">Dorsal columns</text>
                        <text x={cx} y={cy - rY + 10} textAnchor="middle" fontSize="2.8" opacity="0.7">Gracilis | Cuneatus</text>
                        <text x={cx - rX + 18} y={cy - 2} textAnchor="middle" fontSize="3">Lat</text>
                        <text x={cx - rX + 18} y={cy + 2} textAnchor="middle" fontSize="3">CST</text>
                        <text x={cx + rX - 18} y={cy - 2} textAnchor="middle" fontSize="3">Lat</text>
                        <text x={cx + rX - 18} y={cy + 2} textAnchor="middle" fontSize="3">CST</text>
                        <text x={cx - rX + 14} y={cy + rY - 6} textAnchor="middle" fontSize="3">STT</text>
                        <text x={cx + rX - 14} y={cy + rY - 6} textAnchor="middle" fontSize="3">STT</text>
                        <text x={cx} y={cy + rY - 4} textAnchor="middle" fontSize="2.8">Ant CST</text>
                      </g>

                      {/* ── Grey matter butterfly (filled shape) ── */}
                      <g opacity={isActive ? 0.65 : 0.25}>
                        {/* COMPLETE BUTTERFLY as single filled path */}
                        <path d={`
                          M${cx},${cy - 2}
                          C${cx - 3},${cy - 3} ${cx - 8},${cy - 6} ${cx - 12},${cy - 10}
                          C${cx - 14},${cy - 13} ${cx - 15},${cy - 15} ${cx - 14},${cy - 16}
                          C${cx - 12},${cy - 17} ${cx - 10},${cy - 16} ${cx - 9},${cy - 14}
                          C${cx - 7},${cy - 10} ${cx - 4},${cy - 6} ${cx - 3},${cy - 4}
                          L${cx - 3},${cy - 2}
                          L${cx - 5},${cy - 1}
                          C${cx - 8},${cy} ${cx - 12},${cy - 2} ${cx - 16},${cy - 3}
                          C${cx - 18},${cy - 3} ${cx - 18},${cy - 1} ${cx - 16},${cy}
                          L${cx - 5},${cy + 1}
                          C${cx - 5},${cy + 2} ${cx - 8},${cy + 3} ${cx - 14},${cy + 5}
                          C${cx - 20},${cy + 7} ${cx - 26},${cy + 10} ${cx - 28},${cy + 12}
                          C${cx - 30},${cy + 14} ${cx - 28},${cy + 15} ${cx - 25},${cy + 14}
                          C${cx - 20},${cy + 12} ${cx - 14},${cy + 8} ${cx - 8},${cy + 5}
                          C${cx - 5},${cy + 3} ${cx - 3},${cy + 2} ${cx},${cy + 2}
                          C${cx + 3},${cy + 2} ${cx + 5},${cy + 3} ${cx + 8},${cy + 5}
                          C${cx + 14},${cy + 8} ${cx + 20},${cy + 12} ${cx + 25},${cy + 14}
                          C${cx + 28},${cy + 15} ${cx + 30},${cy + 14} ${cx + 28},${cy + 12}
                          C${cx + 26},${cy + 10} ${cx + 20},${cy + 7} ${cx + 14},${cy + 5}
                          C${cx + 8},${cy + 3} ${cx + 5},${cy + 2} ${cx + 5},${cy + 1}
                          L${cx + 16},${cy}
                          C${cx + 18},${cy - 1} ${cx + 18},${cy - 3} ${cx + 16},${cy - 3}
                          C${cx + 12},${cy - 2} ${cx + 8},${cy} ${cx + 5},${cy - 1}
                          L${cx + 3},${cy - 2}
                          L${cx + 3},${cy - 4}
                          C${cx + 4},${cy - 6} ${cx + 7},${cy - 10} ${cx + 9},${cy - 14}
                          C${cx + 10},${cy - 16} ${cx + 12},${cy - 17} ${cx + 14},${cy - 16}
                          C${cx + 15},${cy - 15} ${cx + 14},${cy - 13} ${cx + 12},${cy - 10}
                          C${cx + 8},${cy - 6} ${cx + 3},${cy - 3} ${cx},${cy - 2}
                          Z
                        `}
                          fill="hsl(0, 0%, 52%)" fillOpacity="0.7"
                          stroke="hsl(0, 0%, 40%)" strokeWidth="0.6"
                        />

                        {/* Central canal */}
                        <circle cx={cx} cy={cy} r="1.8" fill="hsl(200, 50%, 65%)" stroke="hsl(200, 40%, 50%)" strokeWidth="0.4" />

                        {/* Substantia gelatinosa caps (Rexed lamina II) on posterior horns */}
                        <ellipse cx={cx - 13} cy={cy - 15} rx="3.5" ry="2" fill="hsl(45, 50%, 58%)" opacity="0.5" />
                        <ellipse cx={cx + 13} cy={cy - 15} rx="3.5" ry="2" fill="hsl(45, 50%, 58%)" opacity="0.5" />

                        {/* Motor neuron cell bodies in anterior horns */}
                        {[
                          [cx - 22, cy + 11], [cx - 25, cy + 13], [cx - 20, cy + 13],
                          [cx + 22, cy + 11], [cx + 25, cy + 13], [cx + 20, cy + 13],
                        ].map(([px, py], i) => (
                          <circle key={i} cx={px} cy={py} r="1.3" fill="hsl(0, 0%, 38%)" opacity="0.5" />
                        ))}
                      </g>

                      {/* Grey matter labels */}
                      <g opacity={isActive ? 0.5 : 0.08} fontSize="3.5" fill="hsl(0, 0%, 42%)">
                        <text x={cx - 38} y={cy + 16} textAnchor="middle" fontWeight="500">Ant horn</text>
                        <text x={cx - 38} y={cy + 20} textAnchor="middle" fontSize="2.8">(motor — LMN)</text>
                        <text x={cx + 38} y={cy - 18} textAnchor="middle" fontWeight="500">Post horn</text>
                        <text x={cx + 38} y={cy - 14} textAnchor="middle" fontSize="2.8">(sensory)</text>
                        <text x={cx - 22} y={cy - 5} textAnchor="middle" fontSize="3">IML</text>
                        <text x={cx + 22} y={cy - 5} textAnchor="middle" fontSize="3">IML</text>
                        <text x={cx - 14} y={cy - 17} textAnchor="middle" fontSize="2.5" fill="hsl(45, 50%, 50%)">SG</text>
                        <text x={cx + 14} y={cy - 17} textAnchor="middle" fontSize="2.5" fill="hsl(45, 50%, 50%)">SG</text>
                      </g>

                      {/* Anterior median fissure */}
                      <line x1={cx} y1={cy + rY} x2={cx} y2={cy + 5}
                        stroke="hsl(0, 0%, 50%)" strokeWidth="0.8" opacity={isActive ? 0.4 : 0.1} />
                      {isActive && <text x={cx + 3} y={cy + rY - 1} fontSize="2.8" fill="hsl(0, 0%, 50%)" opacity="0.5">Ant. median fissure</text>}

                      {/* Posterior median sulcus */}
                      <line x1={cx} y1={cy - rY} x2={cx} y2={cy - 5}
                        stroke="hsl(0, 0%, 50%)" strokeWidth="0.5" opacity={isActive ? 0.3 : 0.08} />

                      {/* ── Blood supply ── */}
                      <g opacity={isActive ? 0.6 : 0.15}>
                        {/* Anterior spinal artery — in anterior median fissure */}
                        <circle cx={cx} cy={cy + rY + 3} r="2.2" fill="hsl(0, 60%, 55%)" stroke="hsl(0, 50%, 42%)" strokeWidth="0.5" />
                        <text x={cx + 5} y={cy + rY + 5} fontSize="4" fill="hsl(0, 60%, 55%)" fontWeight="bold">ASA</text>
                        {/* ASA territory shading */}
                        {isActive && <path d={`M${cx - rX},${cy} A${rX},${rY} 0 0,0 ${cx + rX},${cy} L${cx + rX - 5},${cy + 2} C${cx + 30},${cy + rY - 8} ${cx - 30},${cy + rY - 8} ${cx - rX + 5},${cy + 2} Z`}
                          fill="hsl(0, 60%, 55%)" fillOpacity="0.04" stroke="hsl(0, 60%, 55%)" strokeWidth="0.3" strokeDasharray="3 2" />}
                        {/* Posterior spinal arteries */}
                        <circle cx={cx - 18} cy={cy - rY - 2} r="1.5" fill="hsl(0, 50%, 50%)" />
                        <circle cx={cx + 18} cy={cy - rY - 2} r="1.5" fill="hsl(0, 50%, 50%)" />
                        <text x={cx - 28} y={cy - rY - 1} fontSize="3.5" fill="hsl(0, 50%, 50%)" textAnchor="end">PSA</text>
                        <text x={cx + 28} y={cy - rY - 1} fontSize="3.5" fill="hsl(0, 50%, 50%)">PSA</text>
                      </g>

                      {/* ── Ventral and dorsal roots ── */}
                      <g opacity={isActive ? 0.45 : 0.1}>
                        {/* Dorsal root + DRG (left side) */}
                        <path d={`M${cx - 14},${cy - 15} C${cx - 30},${cy - 20} ${cx - 55},${cy - 18} ${cx - 65},${cy - 10}`}
                          stroke="hsl(45, 55%, 50%)" strokeWidth="1.2" fill="none" />
                        <ellipse cx={cx - 67} cy={cy - 8} rx="4.5" ry="2.8" fill="hsl(45, 55%, 50%)" opacity="0.35" stroke="hsl(45, 45%, 42%)" strokeWidth="0.5" />
                        <text x={cx - 76} y={cy - 6} fontSize="3.5" fill="hsl(45, 55%, 50%)" textAnchor="end">DRG</text>
                        {/* Dorsal root label */}
                        {isActive && <text x={cx - 40} y={cy - 20} fontSize="3" fill="hsl(45, 55%, 50%)" opacity="0.6">Dorsal root</text>}

                        {/* Ventral root (left side) */}
                        <path d={`M${cx - 28},${cy + 12} C${cx - 42},${cy + 16} ${cx - 58},${cy + 12} ${cx - 65},${cy + 2}`}
                          stroke="hsl(150, 45%, 48%)" strokeWidth="1" fill="none" />
                        {isActive && <text x={cx - 50} y={cy + 19} fontSize="3" fill="hsl(150, 45%, 48%)" opacity="0.6">Ventral root</text>}

                        {/* Mixed spinal nerve */}
                        <path d={`M${cx - 67},${cy - 5} L${cx - 75},${cy - 2}`}
                          stroke="hsl(var(--muted-foreground))" strokeWidth="1.5" fill="none" opacity="0.3" />
                        {isActive && <text x={cx - 80} y={cy} fontSize="3" fill="hsl(var(--muted-foreground))" textAnchor="end" opacity="0.5">Spinal n.</text>}
                      </g>
                    </g>
                    );
                  })() : (
                    <g>
                      {/* Base rect */}
                      <rect
                        x={xOffset}
                        y={y}
                        width={layerWidth}
                        height={l.h}
                        rx={key === "skin" ? 3 : 1}
                        fill={l.color}
                        fillOpacity={isActive ? 0.5 : 0.18}
                        stroke={isActive ? l.color : "transparent"}
                        strokeWidth={isActive ? 2 : 0}
                        className="transition-all duration-200"
                      />

                      {/* Skin texture */}
                      {key === "skin" && (
                        <rect x={xOffset} y={y} width={layerWidth} height={l.h} rx={3} fill="url(#sc-skinTex)" />
                      )}

                      {/* Subcutaneous fat globules */}
                      {key === "subcut" && (
                        <rect x={xOffset} y={y} width={layerWidth} height={l.h} fill="url(#sc-fatTex)" opacity={isActive ? 0.7 : 0.3} />
                      )}

                      {/* Ligament collagen fibres */}
                      {(key === "supraspinous" || key === "interspinous") && (
                        <g>
                          <rect x={xOffset} y={y} width={layerWidth} height={l.h} fill="url(#sc-collagen)" opacity={isActive ? 0.8 : 0.3} />
                          {/* Collagen crimp pattern */}
                          <g opacity={isActive ? 0.2 : 0.06}>
                            {Array.from({ length: Math.floor(layerWidth / 12) }).map((_, i) => (
                              <path key={i}
                                d={`M${xOffset + 6 + i * 12},${y + 2} Q${xOffset + 12 + i * 12},${y + l.h / 2} ${xOffset + 6 + i * 12},${y + l.h - 2}`}
                                stroke={l.color} strokeWidth="0.6" fill="none" />
                            ))}
                          </g>
                        </g>
                      )}

                      {/* Elastic fibres in flavum */}
                      {key === "flavum" && (
                        <g>
                          <rect x={xOffset} y={y} width={layerWidth} height={l.h} fill="url(#sc-elastic)" opacity={isActive ? 0.8 : 0.3} />
                          {/* Dense elastic fibre bundles */}
                          <g opacity={isActive ? 0.3 : 0.08}>
                            {Array.from({ length: 16 }).map((_, i) => (
                              <path key={i}
                                d={`M${xOffset + 8 + i * 12},${y + 2} Q${xOffset + 14 + i * 12},${y + l.h / 2} ${xOffset + 8 + i * 12},${y + l.h - 2}`}
                                stroke={l.color} strokeWidth="0.8" fill="none" />
                            ))}
                          </g>
                          {/* LOR annotation */}
                          <g opacity={isActive ? 0.6 : 0}>
                            <text x={xOffset + layerWidth / 2} y={y + l.h + 5} fontSize="3.5" textAnchor="middle" fill="hsl(55, 60%, 55%)" fontStyle="italic">← Loss of Resistance →</text>
                          </g>
                        </g>
                      )}

                      {/* Epidural space contents */}
                      {key === "epidural" && (
                        <g>
                          {/* Epidural fat */}
                          <g opacity={isActive ? 0.35 : 0.1}>
                            {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
                              <ellipse key={i} cx={xOffset + 15 + i * 24} cy={y + l.h / 2 + (i % 2 ? 3 : -2)} rx="8" ry="4" fill="hsl(45, 50%, 65%)" opacity="0.3" />
                            ))}
                          </g>
                          {/* Epidural veins (Batson's plexus) */}
                          <g opacity={isActive ? 0.4 : 0.1}>
                            <path d={`M${xOffset + 20},${y + l.h - 3} C${xOffset + 40},${y + l.h - 6} ${xOffset + 60},${y + l.h - 8} ${xOffset + 85},${y + l.h - 5}`}
                              stroke="hsl(220, 50%, 52%)" strokeWidth="1.2" fill="none" />
                            <path d={`M${xOffset + 100},${y + l.h - 4} C${xOffset + 130},${y + l.h - 7} ${xOffset + 150},${y + l.h - 5} ${xOffset + 170},${y + l.h - 6}`}
                              stroke="hsl(220, 50%, 52%)" strokeWidth="0.8" fill="none" />
                            <text x={xOffset + layerWidth - 20} y={y + l.h - 1} fontSize="3" fill="hsl(220, 50%, 52%)" textAnchor="end">Batson's plexus</text>
                          </g>
                          {/* Nerve root traversing */}
                          <g opacity={isActive ? 0.35 : 0.08}>
                            <path d={`M${xOffset + 50},${y + 2} C${xOffset + 45},${y + l.h / 2} ${xOffset + 40},${y + l.h - 2} ${xOffset + 35},${y + l.h + 5}`}
                              stroke="hsl(50, 60%, 55%)" strokeWidth="1" fill="none" />
                          </g>
                        </g>
                      )}

                      {/* Dura mater: dense fibrous with layered appearance */}
                      {key === "dura" && (
                        <g>
                          <rect x={xOffset} y={y} width={layerWidth} height={l.h} fill="url(#sc-duraTex)" opacity={isActive ? 0.8 : 0.3} />
                          {/* Multiple dense collagen layers */}
                          <g opacity={isActive ? 0.3 : 0.08}>
                            {[0, 1, 2].map(i => (
                              <line key={i} x1={xOffset + 2} y1={y + 3 + i * 3} x2={xOffset + layerWidth - 2} y2={y + 3 + i * 3}
                                stroke="hsl(270, 35%, 48%)" strokeWidth="0.6" />
                            ))}
                          </g>
                          {isActive && (
                            <text x={xOffset + layerWidth / 2} y={y + l.h + 4} fontSize="3" textAnchor="middle"
                              fill="hsl(270, 40%, 55%)" fontStyle="italic" opacity="0.5">Dural sac ends S2</text>
                          )}
                        </g>
                      )}

                      {/* Arachnoid: delicate trabeculated web */}
                      {key === "arachnoid" && (
                        <g>
                          {/* Fine trabecular network */}
                          <g opacity={isActive ? 0.35 : 0.1}>
                            {Array.from({ length: 14 }).map((_, i) => (
                              <g key={i}>
                                <path
                                  d={`M${xOffset + 5 + i * 14},${y + 1} Q${xOffset + 12 + i * 14},${y + l.h / 2 + (i % 3 - 1)} ${xOffset + 5 + i * 14},${y + l.h - 1}`}
                                  stroke="hsl(290, 30%, 58%)" strokeWidth="0.3" fill="none" />
                                {/* Cross-links between trabeculae */}
                                {i > 0 && (
                                  <path
                                    d={`M${xOffset + 5 + (i - 1) * 14},${y + l.h / 2} L${xOffset + 5 + i * 14},${y + l.h / 2 + (i % 2 ? 1 : -1)}`}
                                    stroke="hsl(290, 28%, 55%)" strokeWidth="0.2" fill="none" opacity="0.5" />
                                )}
                              </g>
                            ))}
                          </g>
                          {isActive && (
                            <text x={xOffset + layerWidth / 2} y={y + l.h + 4} fontSize="3" textAnchor="middle"
                              fill="hsl(290, 35%, 60%)" fontStyle="italic" opacity="0.5">Subdural space (potential) above</text>
                          )}
                        </g>
                      )}

                      {/* CSF in subarachnoid */}
                      {key === "subarachnoid" && (
                        <g>
                          <rect x={xOffset} y={y} width={layerWidth} height={l.h} fill="url(#sc-csfGrad)" />
                          {/* CSF flow waves */}
                          <g opacity={isActive ? 0.3 : 0.08}>
                            {[0, 1, 2, 3].map(i => (
                              <path key={i}
                                d={`M${xOffset + 5},${y + 5 + i * 6} Q${xOffset + layerWidth / 4},${y + 3 + i * 6} ${xOffset + layerWidth / 2},${y + 5 + i * 6} Q${xOffset + 3 * layerWidth / 4},${y + 7 + i * 6} ${xOffset + layerWidth - 5},${y + 5 + i * 6}`}
                                stroke="hsl(195, 55%, 60%)" strokeWidth="0.4" fill="none" />
                            ))}
                          </g>
                          {/* Cauda equina filaments — more realistic */}
                          <g opacity={isActive ? 0.3 : 0.06}>
                            {[0, 1, 2, 3, 4, 5, 6].map(i => (
                              <path key={i}
                                d={`M${xOffset + 40 + i * 18},${y + 2} C${xOffset + 38 + i * 18},${y + l.h / 3} ${xOffset + 36 + i * 17},${y + 2 * l.h / 3} ${xOffset + 34 + i * 17},${y + l.h - 2}`}
                                stroke="hsl(50, 50%, 55%)" strokeWidth="0.6" fill="none" />
                            ))}
                            <text x={xOffset + layerWidth / 2} y={y + l.h - 2} fontSize="3" textAnchor="middle" fill="hsl(50, 50%, 55%)" fontStyle="italic">cauda equina</text>
                          </g>
                          {/* Arachnoid trabeculae spanning the space */}
                          <g opacity={isActive ? 0.12 : 0.03}>
                            {[0, 1, 2, 3, 4, 5].map(i => (
                              <line key={i} x1={xOffset + 15 + i * 32} y1={y + 1} x2={xOffset + 20 + i * 32} y2={y + l.h - 1}
                                stroke="hsl(290, 25%, 55%)" strokeWidth="0.3" />
                            ))}
                          </g>
                        </g>
                      )}

                      {/* Pia: highly vascular, intimate with cord */}
                      {key === "pia" && (
                        <g>
                          {/* Pia vessels — branching pattern */}
                          <g opacity={isActive ? 0.45 : 0.12}>
                            <path d={`M${xOffset + 8},${y + l.h / 2} C${xOffset + 20},${y + 1} ${xOffset + 40},${y + l.h - 1} ${xOffset + 60},${y + l.h / 2}`}
                              stroke="hsl(0, 50%, 52%)" strokeWidth="0.6" fill="none" />
                            <path d={`M${xOffset + 60},${y + l.h / 2} C${xOffset + 75},${y + 2} ${xOffset + 95},${y + l.h - 1} ${xOffset + 110},${y + l.h / 2}`}
                              stroke="hsl(0, 50%, 52%)" strokeWidth="0.5" fill="none" />
                            <path d={`M${xOffset + 110},${y + l.h / 2} C${xOffset + 130},${y + 1} ${xOffset + 150},${y + l.h - 1} ${xOffset + 170},${y + l.h / 2}`}
                              stroke="hsl(0, 50%, 52%)" strokeWidth="0.5" fill="none" />
                            {/* Vasocorona (circumferential vessels) */}
                            <path d={`M${xOffset + 30},${y + 2} C${xOffset + 35},${y + l.h / 2} ${xOffset + 28},${y + l.h - 1} ${xOffset + 32},${y + l.h}`}
                              stroke="hsl(0, 45%, 55%)" strokeWidth="0.3" fill="none" opacity="0.5" />
                            <path d={`M${xOffset + 140},${y + 2} C${xOffset + 145},${y + l.h / 2} ${xOffset + 138},${y + l.h - 1} ${xOffset + 142},${y + l.h}`}
                              stroke="hsl(0, 45%, 55%)" strokeWidth="0.3" fill="none" opacity="0.5" />
                          </g>
                          {/* Dentate ligaments — extending laterally */}
                          <g opacity={isActive ? 0.55 : 0.15}>
                            <path d={`M${xOffset + 3},${y + l.h / 2} L${xOffset - 8},${y + l.h / 2 - 5}`}
                              stroke="hsl(320, 40%, 55%)" strokeWidth="1" />
                            <path d={`M${xOffset + layerWidth - 3},${y + l.h / 2} L${xOffset + layerWidth + 8},${y + l.h / 2 - 5}`}
                              stroke="hsl(320, 40%, 55%)" strokeWidth="1" />
                            {/* Triangular tooth shape */}
                            <polygon points={`${xOffset - 8},${y + l.h / 2 - 5} ${xOffset - 6},${y + l.h / 2 - 8} ${xOffset - 10},${y + l.h / 2 - 8}`}
                              fill="hsl(320, 40%, 55%)" opacity="0.4" />
                            <polygon points={`${xOffset + layerWidth + 8},${y + l.h / 2 - 5} ${xOffset + layerWidth + 6},${y + l.h / 2 - 8} ${xOffset + layerWidth + 10},${y + l.h / 2 - 8}`}
                              fill="hsl(320, 40%, 55%)" opacity="0.4" />
                            <text x={xOffset - 14} y={y + l.h / 2 - 9} fontSize="3" fill="hsl(320, 40%, 55%)" textAnchor="end">Dentate lig.</text>
                          </g>
                          {isActive && (
                            <text x={xOffset + layerWidth / 2} y={y + l.h + 4} fontSize="3" textAnchor="middle"
                              fill="hsl(320, 40%, 55%)" fontStyle="italic" opacity="0.5">Filum terminale extends from conus → S2</text>
                          )}
                        </g>
                      )}

                      {/* PLL: dense fibrous band on anterior canal wall */}
                      {key === "pll" && (
                        <g>
                          <g opacity={isActive ? 0.4 : 0.1}>
                            {Array.from({ length: 32 }).map((_, i) => (
                              <line key={i} x1={xOffset + 3 + i * 6} y1={y + 1} x2={xOffset + 3 + i * 6} y2={y + l.h - 1}
                                stroke={l.color} strokeWidth="0.5" opacity="0.5" />
                            ))}
                          </g>
                          {isActive && (
                            <text x={xOffset + layerWidth / 2} y={y + l.h + 4} fontSize="3" textAnchor="middle"
                              fill={l.color} fontStyle="italic" opacity="0.5">Narrow at lumbar level — posterolateral disc prolapse</text>
                          )}
                        </g>
                      )}

                      {/* Vertebral body: cancellous bone */}
                      {key === "vertebral-body" && (
                        <g>
                          {/* Cancellous bone pattern */}
                          <g opacity={isActive ? 0.3 : 0.08}>
                            {Array.from({ length: 20 }).map((_, i) => (
                              <circle key={i} cx={xOffset + 8 + (i * 10) % layerWidth} cy={y + 3 + (i * 7) % (l.h - 4)}
                                r={1.2 + (i % 3) * 0.5} fill={l.color} opacity="0.3" />
                            ))}
                          </g>
                          {/* Cortical shell */}
                          <rect x={xOffset} y={y} width={layerWidth} height={l.h} rx="2"
                            fill="none" stroke={l.color} strokeWidth={isActive ? 1.5 : 0.5} opacity={isActive ? 0.5 : 0.15} />
                          {/* ALL on anterior surface */}
                          <line x1={xOffset} y1={y + l.h} x2={xOffset + layerWidth} y2={y + l.h}
                            stroke="hsl(20, 45%, 50%)" strokeWidth={isActive ? 1.5 : 0.5} opacity={isActive ? 0.5 : 0.15} />
                          {isActive && (
                            <text x={xOffset + layerWidth / 2} y={y + l.h + 5} fontSize="3" textAnchor="middle"
                              fill="hsl(20, 45%, 50%)" fontStyle="italic" opacity="0.5">← ALL (anterior longitudinal ligament) — limits extension</text>
                          )}
                          {/* Basivertebral vein */}
                          <g opacity={isActive ? 0.35 : 0.05}>
                            <path d={`M${xOffset + layerWidth / 2},${y + l.h - 2} L${xOffset + layerWidth / 2},${y - 2}`}
                              stroke="hsl(220, 50%, 55%)" strokeWidth="0.8" fill="none" />
                            <text x={xOffset + layerWidth / 2 + 4} y={y + l.h / 2} fontSize="2.5" fill="hsl(220, 50%, 55%)">Basivertebral v.</text>
                          </g>
                        </g>
                      )}
                    </g>
                  )}

                  {/* Label */}
                  <text
                    x={xOffset + layerWidth + 8}
                    y={y + l.h / 2 + 3}
                    fontSize={l.h < 10 ? "5.5" : "6.5"}
                    fill={isActive ? l.color : "hsl(var(--muted-foreground))"}
                    fontWeight={isActive ? "bold" : "normal"}
                    className="select-none"
                  >
                    {l.label}
                  </text>
                </g>
              );
            })}

            {/* Needle labels */}
            <text x={xOffset - 6} y={yPositions.epidural + layers.epidural.h / 2 + 2} fontSize="5.5" fill="hsl(140, 45%, 50%)" textAnchor="end" fontWeight="bold">Epidural</text>
            <text x={xOffset - 6} y={yPositions.subarachnoid + layers.subarachnoid.h / 2 + 2} fontSize="5.5" fill="hsl(195, 60%, 55%)" textAnchor="end" fontWeight="bold">Spinal</text>

            {/* Depth scale */}
            <g opacity="0.25">
              <line x1={svgWidth - 8} y1={yPositions.skin} x2={svgWidth - 8} y2={yPositions.cord + layers.cord.h}
                stroke="hsl(var(--muted-foreground))" strokeWidth="0.6" />
              <text x={svgWidth - 6} y={(yPositions.skin + yPositions.cord + layers.cord.h) / 2} fontSize="4" fill="hsl(var(--muted-foreground))" transform={`rotate(90, ${svgWidth - 6}, ${(yPositions.skin + yPositions.cord + layers.cord.h) / 2})`} textAnchor="middle">Deep →</text>
            </g>
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <div className="p-4 rounded-lg border border-border animate-fade-in" key={selected}>
            <p className="font-bold text-sm" style={{ color: info.color }}>{info.label}</p>
            <p className="text-sm text-muted-foreground mt-1">{info.detail}</p>
            <p className="text-xs mt-2 p-2 rounded bg-secondary/50 text-foreground">
              <strong>Clinical:</strong> {info.clinicalNote}
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default SpinalCordCrossSectionDiagram;
