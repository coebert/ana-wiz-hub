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
    detail: "U-shaped bone at C3. Only bone not articulating with another bone. Attachment for suprahyoid and infrahyoid muscles.",
    clinicalNote: "Landmark for SLN block — greater horn palpable laterally. Internal branch of SLN pierces thyrohyoid membrane below greater horn.",
  },
  thyrohyoid: {
    label: "Thyrohyoid Membrane",
    color: "hsl(60, 50%, 50%)",
    detail: "Fibroelastic membrane connecting hyoid to thyroid cartilage. Pierced by internal branch of SLN and superior laryngeal artery.",
    clinicalNote: "SLN block: LA deposited below greater horn of hyoid, targeting internal branch as it pierces this membrane → anaesthetises supraglottis.",
  },
  thyroid: {
    label: "Thyroid Cartilage",
    color: "hsl(210, 50%, 52%)",
    detail: "Largest laryngeal cartilage (hyaline). Two laminae fuse anteriorly forming laryngeal prominence (Adam's apple). Superior horn attaches to hyoid; inferior horn articulates with cricoid.",
    clinicalNote: "Calcifies with age. Thyroid notch is palpable landmark. Provides the anterior rigid wall protecting the vocal cords.",
  },
  "cricothyroid-membrane": {
    label: "Cricothyroid Membrane",
    color: "hsl(0, 70%, 55%)",
    detail: "Fibroelastic membrane between thyroid and cricoid cartilages. 9mm height × 30mm width. Relatively avascular in midline. Superior cricothyroid artery runs across upper third.",
    clinicalNote: "EMERGENCY SURGICAL AIRWAY site (DAS Plan D). Scalpel-bougie-tube technique. Palpate soft depression between thyroid and cricoid in midline.",
  },
  cricoid: {
    label: "Cricoid Cartilage",
    color: "hsl(220, 55%, 50%)",
    detail: "Only COMPLETE cartilaginous ring in the airway. Signet-ring shape — narrow anterior arch (~5mm), broad posterior lamina (20–30mm high). At level of C6.",
    clinicalNote: "Cricoid pressure (Sellick's) — 30N compresses oesophagus against C6 vertebral body. Cricothyroid membrane is ABOVE cricoid.",
  },
  arytenoid: {
    label: "Arytenoid Cartilages",
    color: "hsl(280, 45%, 52%)",
    detail: "Paired pyramidal hyaline cartilages on cricoid lamina. Vocal process (anterior) — vocal ligament attachment. Muscular process (lateral) — intrinsic muscle attachment.",
    clinicalNote: "Arytenoid dislocation is rare intubation complication → hoarseness and stridor. Visible as asymmetric arytenoid position during laryngoscopy.",
  },
  "vocal-cords": {
    label: "True Vocal Cords (Folds)",
    color: "hsl(340, 55%, 52%)",
    detail: "Vocal ligament covered by mucosa. Attach from arytenoid vocal process to thyroid angle. Abducted by posterior cricoarytenoid (only abductor). Adducted by lateral cricoarytenoid.",
    clinicalNote: "Narrowest point of adult airway (rima glottidis). In children <8yr, narrowest at cricoid. Vocal cord paralysis: RLN palsy → cord paramedian.",
  },
  "vestibular-folds": {
    label: "False Vocal Cords",
    color: "hsl(300, 35%, 50%)",
    detail: "Above true cords. Contain vestibular ligaments. Ventricle of Morgagni lies between true and false cords (saccule extends superiorly).",
    clinicalNote: "Do not vibrate during phonation. May obscure view of true cords during laryngoscopy in oedematous states.",
  },
  trachea: {
    label: "Trachea",
    color: "hsl(180, 40%, 48%)",
    detail: "Begins at C6 (lower border of cricoid). 10–12 cm long, 16–20 C-shaped hyaline cartilage rings. Posterior membranous wall (trachealis muscle). Bifurcates at T4/5.",
    clinicalNote: "Tracheostomy between rings 2–3 or 3–4. ETT tip should be mid-trachea (5 cm above carina). C-rings prevent collapse.",
  },
  "sln-internal": {
    label: "Internal Branch of SLN",
    color: "hsl(120, 50%, 45%)",
    detail: "Sensory nerve to laryngeal mucosa ABOVE vocal cords (supraglottis, epiglottis, aryepiglottic folds). Pierces thyrohyoid membrane with superior laryngeal artery.",
    clinicalNote: "Target for SLN block in awake fibreoptic intubation — abolishes gag/cough above cords. Block bilaterally at greater horn of hyoid.",
  },
  "sln-external": {
    label: "External Branch of SLN",
    color: "hsl(90, 50%, 45%)",
    detail: "Motor nerve to cricothyroid muscle (tensor of vocal cords). Runs on inferior constrictor before reaching cricothyroid. Close to superior thyroid artery.",
    clinicalNote: "At risk during thyroid surgery (superior pole ligation). Injury → subtle voice changes (loss of high-pitched phonation).",
  },
  rln: {
    label: "Recurrent Laryngeal Nerve",
    color: "hsl(50, 65%, 48%)",
    detail: "Motor to ALL intrinsic muscles except cricothyroid. Sensory below vocal cords. Left loops under aortic arch; right under subclavian. Ascends in tracheo-oesophageal groove.",
    clinicalNote: "At risk in thyroid/parathyroid/carotid surgery. Unilateral palsy → hoarseness. Bilateral → stridor and airway obstruction (cords both paramedian).",
  },
};

const structureOrder: StructureKey[] = ["epiglottis", "hyoid", "thyrohyoid", "thyroid", "vestibular-folds", "vocal-cords", "cricothyroid-membrane", "arytenoid", "cricoid", "trachea", "sln-internal", "sln-external", "rln"];

const LaryngealCrossSectionDiagram = () => {
  const [selected, setSelected] = useState<StructureKey>("cricothyroid-membrane");
  const info = structures[selected];

  const click = (key: StructureKey) => () => setSelected(key);
  const isActive = (key: StructureKey) => selected === key;
  const opacity = (key: StructureKey) => isActive(key) ? 0.65 : 0.2;
  const sw = (key: StructureKey) => isActive(key) ? 2.5 : 1;

  return (
    <div className="border border-border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">Laryngeal Anatomy — Sagittal Cross-Section</h3>
      <p className="text-xs text-muted-foreground mb-3">Tap any structure to see its anatomy and anaesthetic relevance</p>

      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="flex-shrink-0 mx-auto">
          <svg viewBox="0 0 260 310" width="260" height="310" className="border border-border rounded">
            {/* Background: pharyngeal/airway lumen */}
            <path d="M110,20 C110,30 108,45 106,60 C104,78 103,95 105,110 C107,125 109,140 110,155 C110,168 108,180 105,195 C103,208 102,220 103,235 C104,250 105,265 105,280 L155,280 C155,265 156,250 157,235 C158,220 157,208 155,195 C152,180 150,168 150,155 C151,140 153,125 155,110 C157,95 156,78 154,60 C152,45 150,30 150,20 Z"
              fill="hsl(200, 30%, 92%)" opacity="0.15" stroke="none" />

            {/* Epiglottis - leaf shape */}
            <path
              d="M125,15 C120,20 115,30 112,42 C110,52 112,62 118,68 C122,72 128,74 132,74 C136,74 138,72 142,68 C148,62 150,52 148,42 C145,30 140,20 135,15 C132,12 128,12 125,15 Z"
              fill={structures.epiglottis.color}
              fillOpacity={opacity("epiglottis")}
              stroke={structures.epiglottis.color}
              strokeWidth={sw("epiglottis")}
              className="cursor-pointer transition-all duration-200"
              onClick={click("epiglottis")}
            />
            {/* Epiglottic stalk */}
            <path d="M130,74 L130,88" stroke={structures.epiglottis.color} strokeWidth="2" opacity={isActive("epiglottis") ? 0.6 : 0.25} />

            {/* Hyoid bone - U shape */}
            <path
              d="M60,60 C62,55 70,50 85,48 C100,46 115,48 130,50 C145,48 160,46 175,48 C190,50 198,55 200,60 C198,64 192,66 185,65 C175,63 165,60 155,58 C145,56 135,56 130,57 C125,56 115,56 105,58 C95,60 85,63 75,65 C68,66 62,64 60,60 Z"
              fill={structures.hyoid.color}
              fillOpacity={opacity("hyoid")}
              stroke={structures.hyoid.color}
              strokeWidth={sw("hyoid")}
              className="cursor-pointer transition-all duration-200"
              onClick={click("hyoid")}
            />
            <text x="210" y="60" fontSize="7" fill={isActive("hyoid") ? structures.hyoid.color : "hsl(var(--muted-foreground))"} fontWeight={isActive("hyoid") ? "bold" : "normal"} className="cursor-pointer select-none" onClick={click("hyoid")}>Hyoid</text>

            {/* Thyrohyoid membrane */}
            <rect x="85" y="66" width="90" height="14" rx="2"
              fill={structures.thyrohyoid.color}
              fillOpacity={opacity("thyrohyoid")}
              stroke={structures.thyrohyoid.color}
              strokeWidth={sw("thyrohyoid")}
              strokeDasharray={isActive("thyrohyoid") ? "" : "3 2"}
              className="cursor-pointer transition-all duration-200"
              onClick={click("thyrohyoid")}
            />
            <text x="210" y="77" fontSize="6" fill={isActive("thyrohyoid") ? structures.thyrohyoid.color : "hsl(var(--muted-foreground))"} className="cursor-pointer select-none" onClick={click("thyrohyoid")}>Thyrohyoid memb.</text>

            {/* Thyroid cartilage - shield shape with anterior prominence */}
            <path
              d="M72,82 L72,145 C72,152 80,158 95,160 C110,162 120,158 130,148 C140,158 150,162 165,160 C180,158 188,152 188,145 L188,82 C185,80 175,78 160,80 C145,82 135,83 130,84 C125,83 115,82 100,80 C85,78 75,80 72,82 Z"
              fill={structures.thyroid.color}
              fillOpacity={opacity("thyroid")}
              stroke={structures.thyroid.color}
              strokeWidth={sw("thyroid")}
              className="cursor-pointer transition-all duration-200"
              onClick={click("thyroid")}
            />
            {/* Laryngeal prominence */}
            <path d="M125,84 L130,78 L135,84" stroke={structures.thyroid.color} strokeWidth="1.5" fill="none" opacity={isActive("thyroid") ? 0.8 : 0.3} />
            <text x="210" y="115" fontSize="7" fill={isActive("thyroid") ? structures.thyroid.color : "hsl(var(--muted-foreground))"} fontWeight={isActive("thyroid") ? "bold" : "normal"} className="cursor-pointer select-none" onClick={click("thyroid")}>Thyroid cart.</text>

            {/* Vestibular folds (false cords) inside thyroid */}
            <path
              d="M105,108 C112,104 118,103 125,104 C128,104 132,103 135,104 C142,103 148,104 155,108"
              fill="none"
              stroke={structures["vestibular-folds"].color}
              strokeWidth={isActive("vestibular-folds") ? 3.5 : 2}
              opacity={isActive("vestibular-folds") ? 0.8 : 0.3}
              className="cursor-pointer transition-all duration-200"
              onClick={click("vestibular-folds")}
            />
            <text x="210" y="110" fontSize="5.5" fill={isActive("vestibular-folds") ? structures["vestibular-folds"].color : "hsl(var(--muted-foreground))"} className="cursor-pointer select-none" onClick={click("vestibular-folds")}>False cords</text>

            {/* Ventricle of Morgagni space */}
            <path d="M108,110 C115,114 125,115 130,115 C135,115 145,114 152,110" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.3" />

            {/* True vocal cords */}
            <path
              d="M105,120 C112,116 120,115 130,115 C140,115 148,116 155,120"
              fill="none"
              stroke={structures["vocal-cords"].color}
              strokeWidth={isActive("vocal-cords") ? 4 : 2.5}
              opacity={isActive("vocal-cords") ? 0.9 : 0.35}
              className="cursor-pointer transition-all duration-200"
              onClick={click("vocal-cords")}
            />
            {/* Glottic opening indicator */}
            <text x="130" y="112" fontSize="4" textAnchor="middle" fill="hsl(var(--muted-foreground))" opacity="0.4">glottis</text>
            <text x="210" y="122" fontSize="6" fill={isActive("vocal-cords") ? structures["vocal-cords"].color : "hsl(var(--muted-foreground))"} fontWeight={isActive("vocal-cords") ? "bold" : "normal"} className="cursor-pointer select-none" onClick={click("vocal-cords")}>True vocal cords</text>

            {/* Arytenoid cartilages - paired pyramids on posterior cricoid */}
            <path
              d="M108,125 L115,118 L122,128 Z"
              fill={structures.arytenoid.color}
              fillOpacity={opacity("arytenoid")}
              stroke={structures.arytenoid.color}
              strokeWidth={sw("arytenoid")}
              className="cursor-pointer transition-all duration-200"
              onClick={click("arytenoid")}
            />
            <path
              d="M138,125 L145,118 L152,128 Z"
              fill={structures.arytenoid.color}
              fillOpacity={opacity("arytenoid")}
              stroke={structures.arytenoid.color}
              strokeWidth={sw("arytenoid")}
              className="cursor-pointer transition-all duration-200"
              onClick={click("arytenoid")}
            />
            <text x="210" y="132" fontSize="5.5" fill={isActive("arytenoid") ? structures.arytenoid.color : "hsl(var(--muted-foreground))"} className="cursor-pointer select-none" onClick={click("arytenoid")}>Arytenoids</text>

            {/* Cricothyroid membrane - highlighted RED for emergency */}
            <rect x="90" y="162" width="80" height="14" rx="2"
              fill={structures["cricothyroid-membrane"].color}
              fillOpacity={isActive("cricothyroid-membrane") ? 0.5 : 0.2}
              stroke={structures["cricothyroid-membrane"].color}
              strokeWidth={isActive("cricothyroid-membrane") ? 3 : 1.5}
              className="cursor-pointer transition-all duration-200"
              onClick={click("cricothyroid-membrane")}
            />
            {/* Emergency scalpel icon */}
            <path d="M125,169 L135,169" stroke={structures["cricothyroid-membrane"].color} strokeWidth="2" opacity={isActive("cricothyroid-membrane") ? 0.8 : 0.3} />
            <text x="210" y="172" fontSize="6" fill={isActive("cricothyroid-membrane") ? structures["cricothyroid-membrane"].color : "hsl(var(--muted-foreground))"} fontWeight="bold" className="cursor-pointer select-none" onClick={click("cricothyroid-membrane")}>Cricothyroid memb.</text>
            <text x="210" y="180" fontSize="5" fill="hsl(0, 70%, 55%)" opacity="0.6">★ Emergency airway</text>

            {/* Cricoid cartilage - signet ring (wider posteriorly) */}
            <path
              d="M82,178 C82,176 90,174 105,174 L155,174 C170,174 178,176 178,178 L178,200 C178,210 170,218 155,220 C140,222 120,222 105,220 C90,218 82,210 82,200 Z"
              fill={structures.cricoid.color}
              fillOpacity={opacity("cricoid")}
              stroke={structures.cricoid.color}
              strokeWidth={sw("cricoid")}
              className="cursor-pointer transition-all duration-200"
              onClick={click("cricoid")}
            />
            {/* Posterior lamina thicker */}
            <rect x="110" y="200" width="40" height="18" rx="4"
              fill={structures.cricoid.color}
              fillOpacity={isActive("cricoid") ? 0.3 : 0.1}
              stroke="none"
            />
            <text x="130" y="212" fontSize="4" textAnchor="middle" fill={structures.cricoid.color} opacity="0.5">lamina</text>
            <text x="210" y="198" fontSize="7" fill={isActive("cricoid") ? structures.cricoid.color : "hsl(var(--muted-foreground))"} fontWeight={isActive("cricoid") ? "bold" : "normal"} className="cursor-pointer select-none" onClick={click("cricoid")}>Cricoid cart.</text>

            {/* Trachea - C-shaped rings */}
            {[0, 1, 2, 3].map((i) => {
              const ty = 224 + i * 20;
              return (
                <g key={i} className="cursor-pointer" onClick={click("trachea")}>
                  <path
                    d={`M95,${ty} C95,${ty - 4} 105,${ty - 6} 130,${ty - 6} C155,${ty - 6} 165,${ty - 4} 165,${ty} L165,${ty + 10} C165,${ty + 14} 155,${ty + 16} 130,${ty + 16} C105,${ty + 16} 95,${ty + 14} 95,${ty + 10} Z`}
                    fill={structures.trachea.color}
                    fillOpacity={isActive("trachea") ? 0.4 : 0.12}
                    stroke={structures.trachea.color}
                    strokeWidth={isActive("trachea") ? 1.5 : 0.8}
                    className="transition-all duration-200"
                  />
                  {/* Posterior membranous wall */}
                  <line x1="105" y1={ty + 5} x2="155" y2={ty + 5} stroke={structures.trachea.color} strokeWidth="0.5" strokeDasharray="2 2" opacity="0.3" />
                </g>
              );
            })}
            <text x="210" y="250" fontSize="7" fill={isActive("trachea") ? structures.trachea.color : "hsl(var(--muted-foreground))"} fontWeight={isActive("trachea") ? "bold" : "normal"} className="cursor-pointer select-none" onClick={click("trachea")}>Trachea</text>

            {/* Nerve paths */}
            {/* Internal SLN */}
            <path d="M38,48 C50,50 60,55 72,62 C78,66 82,70 85,73"
              stroke={structures["sln-internal"].color}
              strokeWidth={isActive("sln-internal") ? 2.5 : 1.5}
              fill="none" strokeDasharray="4 2"
              opacity={isActive("sln-internal") ? 0.9 : 0.3}
              className="cursor-pointer transition-all duration-200"
              onClick={click("sln-internal")}
            />
            <circle cx="85" cy="73" r="2" fill={structures["sln-internal"].color} opacity={isActive("sln-internal") ? 0.8 : 0.3} />
            <text x="12" y="46" fontSize="6" fill={isActive("sln-internal") ? structures["sln-internal"].color : "hsl(var(--muted-foreground))"} fontWeight={isActive("sln-internal") ? "bold" : "normal"} className="cursor-pointer select-none" onClick={click("sln-internal")}>Int. SLN</text>
            <text x="12" y="54" fontSize="4.5" fill={structures["sln-internal"].color} opacity="0.5">(sensory ↑cords)</text>

            {/* External SLN */}
            <path d="M38,90 C50,95 60,105 68,115 C74,125 78,140 82,155"
              stroke={structures["sln-external"].color}
              strokeWidth={isActive("sln-external") ? 2.5 : 1.5}
              fill="none" strokeDasharray="4 2"
              opacity={isActive("sln-external") ? 0.9 : 0.3}
              className="cursor-pointer transition-all duration-200"
              onClick={click("sln-external")}
            />
            <text x="12" y="88" fontSize="6" fill={isActive("sln-external") ? structures["sln-external"].color : "hsl(var(--muted-foreground))"} fontWeight={isActive("sln-external") ? "bold" : "normal"} className="cursor-pointer select-none" onClick={click("sln-external")}>Ext. SLN</text>
            <text x="12" y="96" fontSize="4.5" fill={structures["sln-external"].color} opacity="0.5">(motor: cricothyr.)</text>

            {/* RLN - ascending from below */}
            <path d="M192,290 C190,275 188,260 185,245 C183,232 180,222 178,210 C176,200 174,185 172,170 C170,155 168,140 165,130"
              stroke={structures.rln.color}
              strokeWidth={isActive("rln") ? 2.5 : 1.5}
              fill="none" strokeDasharray="4 2"
              opacity={isActive("rln") ? 0.9 : 0.3}
              className="cursor-pointer transition-all duration-200"
              onClick={click("rln")}
            />
            <text x="195" y="288" fontSize="6" fill={isActive("rln") ? structures.rln.color : "hsl(var(--muted-foreground))"} fontWeight={isActive("rln") ? "bold" : "normal"} className="cursor-pointer select-none" onClick={click("rln")}>RLN</text>
            <text x="195" y="296" fontSize="4.5" fill={structures.rln.color} opacity="0.5">(motor: all except</text>
            <text x="195" y="304" fontSize="4.5" fill={structures.rln.color} opacity="0.5">cricothyroid)</text>

            {/* Vertebral levels */}
            <g opacity="0.25">
              <text x="250" y="60" fontSize="5" fill="hsl(var(--muted-foreground))">C3</text>
              <text x="250" y="115" fontSize="5" fill="hsl(var(--muted-foreground))">C4-5</text>
              <text x="250" y="195" fontSize="5" fill="hsl(var(--muted-foreground))">C6</text>
            </g>
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
