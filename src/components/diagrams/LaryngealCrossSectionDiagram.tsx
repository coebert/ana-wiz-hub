import { useState } from "react";

type StructureKey = "epiglottis" | "hyoid" | "thyrohyoid" | "thyroid" | "cricothyroid-membrane" | "cricoid" | "arytenoid" | "vocal-cords" | "vestibular-folds" | "trachea" | "sln-internal" | "sln-external" | "rln";

interface LaryngealStructure {
  label: string;
  color: string;
  detail: string;
  clinicalNote: string;
}

const structures: Record<StructureKey, LaryngealStructure> = {
  epiglottis: {
    label: "Epiglottis",
    color: "hsl(140, 50%, 48%)",
    detail: "Elastic cartilage, leaf-shaped. Attached to hyoid by hyoepiglottic ligament and to thyroid by thyroepiglottic ligament. Vallecula lies between epiglottis and tongue base.",
    clinicalNote: "Macintosh blade tip placed in vallecula — lifts epiglottis indirectly via hyoepiglottic ligament. Miller blade lifts epiglottis directly.",
  },
  hyoid: {
    label: "Hyoid Bone",
    color: "hsl(30, 55%, 55%)",
    detail: "U-shaped bone at C3. Only bone not articulating with another bone. Attachment for suprahyoid (mylohyoid, geniohyoid, digastric) and infrahyoid (sternohyoid, omohyoid) muscles.",
    clinicalNote: "Landmark for SLN block — greater horn palpable laterally. Internal branch of SLN pierces thyrohyoid membrane below greater horn.",
  },
  thyrohyoid: {
    label: "Thyrohyoid Membrane",
    color: "hsl(60, 50%, 50%)",
    detail: "Fibroelastic membrane connecting hyoid to thyroid cartilage. Pierced by internal branch of SLN and superior laryngeal artery.",
    clinicalNote: "SLN block: local anaesthetic deposited below greater horn of hyoid, targeting internal branch as it pierces this membrane → anaesthetises supraglottis.",
  },
  thyroid: {
    label: "Thyroid Cartilage",
    color: "hsl(210, 50%, 52%)",
    detail: "Largest laryngeal cartilage (hyaline). Two laminae fuse anteriorly forming laryngeal prominence (Adam's apple). Superior horn attaches to hyoid; inferior horn articulates with cricoid.",
    clinicalNote: "Calcifies with age — may be difficult to distinguish from cricoid on palpation in elderly. Thyroid notch is palpable landmark.",
  },
  "cricothyroid-membrane": {
    label: "Cricothyroid Membrane",
    color: "hsl(0, 70%, 55%)",
    detail: "Fibroelastic membrane between thyroid and cricoid cartilages. 9mm height × 30mm width. Relatively avascular in midline. Superior cricothyroid artery runs transversely across upper third.",
    clinicalNote: "EMERGENCY SURGICAL AIRWAY site. Scalpel-bougie-tube technique (DAS Plan D). Palpate as soft depression between thyroid and cricoid cartilages in midline.",
  },
  cricoid: {
    label: "Cricoid Cartilage",
    color: "hsl(220, 55%, 50%)",
    detail: "Only COMPLETE cartilaginous ring in the airway. Signet-ring shape — narrow anterior arch, broad posterior lamina (20–30mm high posteriorly). Level of C6.",
    clinicalNote: "Cricoid pressure (Sellick's manoeuvre) — 30N applied to compress oesophagus against C6 vertebral body. Landmark for emergency cricothyroidotomy (membrane is ABOVE cricoid).",
  },
  arytenoid: {
    label: "Arytenoid Cartilages",
    color: "hsl(280, 45%, 52%)",
    detail: "Paired pyramidal hyaline cartilages sitting on cricoid lamina. Vocal process (anterior) — attaches vocal ligament. Muscular process (lateral) — attaches intrinsic muscles. Apex articulates with corniculate cartilage.",
    clinicalNote: "Arytenoid dislocation is a rare complication of intubation — presents with hoarseness and stridor. Visible during laryngoscopy as asymmetric arytenoid position.",
  },
  "vocal-cords": {
    label: "True Vocal Cords (Folds)",
    color: "hsl(340, 55%, 52%)",
    detail: "Vocal ligament covered by mucosa. Attach from arytenoid vocal process to thyroid angle. Abducted by posterior cricoarytenoid (only abductor). Adducted by lateral cricoarytenoid and interarytenoids.",
    clinicalNote: "Narrowest point of adult airway (rima glottidis). In children <8yr, narrowest point is at cricoid. Vocal cord paralysis: RLN palsy → cord paramedian. SLN palsy → cord bowed (loss of tension).",
  },
  "vestibular-folds": {
    label: "False Vocal Cords (Vestibular Folds)",
    color: "hsl(300, 35%, 50%)",
    detail: "Above true cords. Contain vestibular ligaments. Ventricle of Morgagni lies between true and false cords (saccule extends superiorly).",
    clinicalNote: "Do not vibrate during phonation. May obscure view of true cords during laryngoscopy in oedematous states. Laryngeal ventricle is a potential site for tumour.",
  },
  trachea: {
    label: "Trachea",
    color: "hsl(180, 40%, 48%)",
    detail: "Begins at C6 (lower border of cricoid). 10–12 cm long, 16–20 C-shaped hyaline cartilage rings. Posterior membranous wall (trachealis muscle). Bifurcates at T4/5 (carina).",
    clinicalNote: "Tracheostomy between rings 2–3 or 3–4. ETT tip should be mid-trachea (5 cm above carina). Tracheal rings prevent collapse during negative pressure ventilation.",
  },
  "sln-internal": {
    label: "Internal Branch of SLN",
    color: "hsl(120, 50%, 45%)",
    detail: "Sensory nerve to laryngeal mucosa ABOVE vocal cords (supraglottis, epiglottis, aryepiglottic folds). Pierces thyrohyoid membrane with superior laryngeal artery.",
    clinicalNote: "Target for SLN block in awake fibreoptic intubation — abolishes gag/cough above the cords. Block bilaterally at greater horn of hyoid.",
  },
  "sln-external": {
    label: "External Branch of SLN",
    color: "hsl(90, 50%, 45%)",
    detail: "Motor nerve to cricothyroid muscle (tensor of vocal cords). Runs on inferior constrictor before reaching cricothyroid. Close to superior thyroid artery.",
    clinicalNote: "At risk during thyroid surgery (especially superior pole ligation). Injury → subtle voice changes (loss of high-pitched phonation) — important for singers.",
  },
  rln: {
    label: "Recurrent Laryngeal Nerve",
    color: "hsl(50, 65%, 48%)",
    detail: "Motor to ALL intrinsic muscles except cricothyroid. Sensory below vocal cords (subglottis). Left loops under aortic arch; right loops under subclavian. Ascends in tracheo-oesophageal groove.",
    clinicalNote: "At risk in thyroid, parathyroid, carotid, and oesophageal surgery. Unilateral palsy → hoarseness (cord paramedian). Bilateral → stridor and airway obstruction (cords both paramedian).",
  },
};

const structureOrder: StructureKey[] = ["epiglottis", "hyoid", "thyrohyoid", "thyroid", "vestibular-folds", "vocal-cords", "cricothyroid-membrane", "arytenoid", "cricoid", "trachea", "sln-internal", "sln-external", "rln"];

// SVG layout positions for anterior view cross-section
const svgPositions: Record<StructureKey, { x: number; y: number; w: number; h: number }> = {
  epiglottis: { x: 90, y: 10, w: 60, h: 22 },
  hyoid: { x: 70, y: 38, w: 100, h: 14 },
  thyrohyoid: { x: 80, y: 55, w: 80, h: 10 },
  thyroid: { x: 65, y: 68, w: 110, h: 40 },
  "vestibular-folds": { x: 95, y: 78, w: 50, h: 10 },
  "vocal-cords": { x: 95, y: 92, w: 50, h: 10 },
  arytenoid: { x: 100, y: 85, w: 40, h: 14 },
  "cricothyroid-membrane": { x: 85, y: 112, w: 70, h: 12 },
  cricoid: { x: 75, y: 128, w: 90, h: 20 },
  trachea: { x: 85, y: 152, w: 70, h: 34 },
  "sln-internal": { x: 5, y: 48, w: 55, h: 12 },
  "sln-external": { x: 5, y: 90, w: 55, h: 12 },
  rln: { x: 180, y: 130, w: 55, h: 12 },
};

const LaryngealCrossSectionDiagram = () => {
  const [selected, setSelected] = useState<StructureKey>("cricothyroid-membrane");
  const info = structures[selected];

  return (
    <div className="border border-border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">Laryngeal Anatomy — Interactive Cross-Section</h3>
      <p className="text-xs text-muted-foreground mb-3">Tap any structure to see its anatomy and clinical relevance for anaesthesia</p>

      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="flex-shrink-0 mx-auto">
          <svg viewBox="0 0 240 195" width="240" height="195" className="border border-border rounded">
            {/* Nerve lines */}
            {/* Internal SLN → thyrohyoid membrane */}
            <path d="M55,54 Q70,52 80,58" stroke={structures["sln-internal"].color} strokeWidth="1.5" fill="none" strokeDasharray="3 2" opacity={selected === "sln-internal" ? 0.8 : 0.3} />
            {/* External SLN → cricothyroid */}
            <path d="M55,96 Q70,100 85,108" stroke={structures["sln-external"].color} strokeWidth="1.5" fill="none" strokeDasharray="3 2" opacity={selected === "sln-external" ? 0.8 : 0.3} />
            {/* RLN → up to vocal cords */}
            <path d="M180,136 Q160,120 145,100" stroke={structures.rln.color} strokeWidth="1.5" fill="none" strokeDasharray="3 2" opacity={selected === "rln" ? 0.8 : 0.3} />

            {/* Structure blocks */}
            {structureOrder.map((key) => {
              const pos = svgPositions[key];
              const s = structures[key];
              const isActive = selected === key;
              const isNerve = key.includes("sln") || key === "rln";
              return (
                <g key={key} className="cursor-pointer" onClick={() => setSelected(key)}>
                  <rect
                    x={pos.x}
                    y={pos.y}
                    width={pos.w}
                    height={pos.h}
                    rx={isNerve ? 6 : 3}
                    fill={s.color}
                    fillOpacity={isActive ? 0.45 : 0.15}
                    stroke={s.color}
                    strokeWidth={isActive ? 2 : 0.8}
                    className="transition-all duration-200"
                  />
                  <text
                    x={pos.x + pos.w / 2}
                    y={pos.y + pos.h / 2 + 3}
                    textAnchor="middle"
                    fontSize={pos.w < 60 ? "5.5" : "6.5"}
                    fill={s.color}
                    fontWeight={isActive ? "bold" : "normal"}
                    className="select-none"
                  >
                    {key === "cricothyroid-membrane" ? "Cricothyroid Memb." :
                     key === "sln-internal" ? "Int. SLN (sensory)" :
                     key === "sln-external" ? "Ext. SLN (motor)" :
                     key === "rln" ? "RLN (motor)" :
                     key === "vestibular-folds" ? "False Cords" :
                     key === "vocal-cords" ? "True Vocal Cords" :
                     s.label}
                  </text>
                </g>
              );
            })}

            {/* Midline marker */}
            <line x1="120" y1="5" x2="120" y2="190" stroke="hsl(var(--muted-foreground))" strokeWidth="0.3" strokeDasharray="2 4" opacity="0.3" />
          </svg>
        </div>

        {/* Info panel */}
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
  );
};

export default LaryngealCrossSectionDiagram;
