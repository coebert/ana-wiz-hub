import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type StructureKey = "epiglottis" | "hyoid" | "thyrohyoid" | "thyroid" | "cricothyroid-membrane" | "cricoid" | "arytenoid" | "vocal-cords" | "vestibular-folds" | "trachea" | "sln-internal" | "sln-external" | "rln" | "cricothyroid-joint" | "piriform-fossa" | "aryepiglottic-fold" | "conus-elasticus" | "quadrangular-membrane" | "pre-epiglottic" | "corniculate" | "cuneiform" | "reinke-space";

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
    detail: "Elastic cartilage, leaf-shaped. Attached to hyoid by hyoepiglottic ligament and to thyroid by thyroepiglottic ligament. Vallecula lies between epiglottis base and tongue base (median glossoepiglottic fold).",
    clinicalNote: "Macintosh blade tip in vallecula → lifts epiglottis indirectly via hyoepiglottic ligament. Miller blade lifts epiglottis directly. Omega-shaped in neonates → difficult direct laryngoscopy.",
  },
  hyoid: {
    label: "Hyoid Bone",
    color: "hsl(30, 55%, 55%)",
    detail: "U-shaped bone at C3. Only bone not articulating with another. Greater horns project posterolaterally. Attachment for suprahyoid (digastric, stylohyoid, mylohyoid, geniohyoid) and infrahyoid muscles.",
    clinicalNote: "Landmark for SLN block — greater horn palpable laterally. Internal branch of SLN pierces thyrohyoid membrane 2–4mm below greater horn. Forensic significance: fracture suggests strangulation.",
  },
  thyrohyoid: {
    label: "Thyrohyoid Membrane",
    color: "hsl(60, 50%, 50%)",
    detail: "Fibroelastic membrane connecting hyoid to superior border of thyroid cartilage. Pierced by internal branch of SLN and superior laryngeal artery. Thickened centrally as median thyrohyoid ligament and laterally as lateral thyrohyoid ligaments.",
    clinicalNote: "SLN block: walk off inferior border of greater horn of hyoid, advance 2–3mm through membrane → deposit 2ml LA. Anaesthetises supraglottis for awake fibreoptic intubation.",
  },
  thyroid: {
    label: "Thyroid Cartilage",
    color: "hsl(210, 50%, 52%)",
    detail: "Largest laryngeal cartilage (hyaline). Two laminae fuse anteriorly — angle 90° in males, 120° in females (determines pitch). Superior horn attaches to hyoid; inferior horn articulates with cricoid at cricothyroid joint. Oblique line on lateral surface — attachment for strap muscles.",
    clinicalNote: "Calcifies with age. Thyroid notch is palpable landmark for midline identification. Laryngeal prominence ('Adam's apple') more pronounced in males. Provides rigid anterior wall protecting vocal cords.",
  },
  "cricothyroid-membrane": {
    label: "Cricothyroid Membrane (CTM)",
    color: "hsl(0, 70%, 55%)",
    detail: "Fibroelastic membrane between inferior thyroid border and superior cricoid arch. 9–10mm height × 22–30mm width. Relatively avascular in midline below upper 1/3 (superior cricothyroid artery crosses upper part). Contains conus elasticus laterally.",
    clinicalNote: "EMERGENCY SURGICAL AIRWAY (DAS Plan D). Scalpel-bougie-tube technique. Palpate: thyroid notch → slide down to soft depression before cricoid ring. Vertical skin incision → horizontal stab through CTM. Insert bougie, railroad 6.0 cuffed ETT.",
  },
  cricoid: {
    label: "Cricoid Cartilage",
    color: "hsl(220, 55%, 50%)",
    detail: "Only COMPLETE cartilaginous ring in the airway. Signet-ring shaped — narrow anterior arch (~5mm), broad posterior lamina (20–30mm). Level of C6. Articulates with thyroid (cricothyroid joints) and arytenoids (cricoarytenoid joints).",
    clinicalNote: "Sellick's manoeuvre (cricoid pressure, 30N) compresses oesophagus against C6 vertebral body to prevent passive regurgitation during RSI. Controversial — may worsen laryngoscopic view. Narrowest point of paediatric airway (<8yr) is at cricoid level (not glottis).",
  },
  arytenoid: {
    label: "Arytenoid Cartilages",
    color: "hsl(280, 45%, 52%)",
    detail: "Paired pyramidal hyaline cartilages sitting on superior border of cricoid posterior lamina. Vocal process (anterior) — vocal ligament attachment. Muscular process (lateral) — cricoarytenoid muscle attachments. Apex supports corniculate cartilage.",
    clinicalNote: "Arytenoid dislocation (rare intubation complication) → hoarseness. Cricoarytenoid arthritis in RA → reduced cord mobility, stridor. Posterior cricoarytenoid is the ONLY abductor of the vocal cords.",
  },
  "vocal-cords": {
    label: "True Vocal Cords (Folds)",
    color: "hsl(340, 55%, 52%)",
    detail: "Vocal ligament (free edge of conus elasticus) covered by stratified squamous epithelium. Attach from arytenoid vocal process to thyroid angle anteriorly. Abducted by posterior cricoarytenoid (only abductor). Adducted by lateral cricoarytenoid and interarytenoid muscles. Tensioned by cricothyroid (tilts thyroid forward).",
    clinicalNote: "Narrowest point of adult airway (rima glottidis: anteroposterior 23mm ♂, 17mm ♀). In children <8yr, narrowest at subglottic/cricoid level. RLN palsy → cord paramedian (all intrinsic muscles paralysed except cricothyroid). Bilateral RLN palsy → stridor/obstruction.",
  },
  "vestibular-folds": {
    label: "False Vocal Cords (Vestibular Folds)",
    color: "hsl(300, 35%, 50%)",
    detail: "Above true cords. Contain vestibular ligaments (upper edge of quadrangular membrane). Ventricle of Morgagni (laryngeal ventricle) lies between true and false cords — saccule extends superiorly from its anterior part. Lined by respiratory epithelium.",
    clinicalNote: "Do not normally vibrate during phonation. May obscure view during laryngoscopy if oedematous. Reinke's space (potential space deep to epithelium of true cords) may fill with fluid in Reinke's oedema → breathy voice.",
  },
  trachea: {
    label: "Trachea",
    color: "hsl(180, 40%, 48%)",
    detail: "Begins at C6 (lower border of cricoid). 10–12cm long in adults. 16–20 C-shaped hyaline cartilage rings. Posterior membranous wall (trachealis muscle — smooth muscle). Bifurcates at carina (T4/5 — sternal angle). Blood supply: inferior thyroid artery (upper 2/3), bronchial arteries (lower 1/3).",
    clinicalNote: "Surgical tracheostomy: between rings 2–3 or 3–4 (below thyroid isthmus at ring 2). Percutaneous tracheostomy: between rings 1–2 or 2–3. ETT tip: mid-trachea (5cm above carina). Right mainstem intubation if inserted too far (right bronchus more vertical, shorter, wider).",
  },
  "sln-internal": {
    label: "Internal Branch of SLN",
    color: "hsl(120, 50%, 45%)",
    detail: "Pure sensory nerve. Branch of superior laryngeal nerve (from vagus X, via inferior ganglion). Pierces thyrohyoid membrane with superior laryngeal artery. Supplies sensation to laryngeal mucosa ABOVE vocal cords — base of tongue, vallecula, epiglottis, aryepiglottic folds, piriform fossa.",
    clinicalNote: "Target for SLN block in awake fibreoptic intubation — abolishes cough/gag above cords. Block bilaterally: palpate greater horn of hyoid, walk off inferiorly, advance needle through thyrohyoid membrane, aspirate, inject 2ml LA.",
  },
  "sln-external": {
    label: "External Branch of SLN",
    color: "hsl(90, 50%, 45%)",
    detail: "Motor nerve. Descends on inferior constrictor before reaching cricothyroid muscle (the only intrinsic laryngeal muscle supplied by SLN, not RLN). Close to superior thyroid artery superior pole. Tensor of vocal cords (increases pitch).",
    clinicalNote: "At risk during thyroid surgery (superior pole ligation near Joll's triangle). Injury → subtle voice changes: loss of high-pitched phonation ('Amelita Galli-Curci nerve'). Often asymptomatic.",
  },
  rln: {
    label: "Recurrent Laryngeal Nerve",
    color: "hsl(50, 65%, 48%)",
    detail: "Motor to ALL intrinsic laryngeal muscles EXCEPT cricothyroid. Sensory to mucosa BELOW vocal cords (subglottis, upper trachea). Left loops under aortic arch (at ligamentum arteriosum), right under right subclavian artery. Both ascend in tracheo-oesophageal groove. Enters larynx posterior to cricothyroid joint.",
    clinicalNote: "At risk in thyroid/parathyroid/carotid/oesophageal surgery, mediastinal tumours, and aortic arch aneurysm. Unilateral palsy → hoarse voice (cord paramedian). Bilateral palsy → stridor, airway obstruction (both cords paramedian). Non-recurrent right RLN in 0.5% (with aberrant right subclavian — arteria lusoria).",
  },
  "cricothyroid-joint": {
    label: "Cricothyroid Joint",
    color: "hsl(260, 40%, 50%)",
    detail: "Synovial joint between inferior horn of thyroid and lateral cricoid. Allows rocking/tilting movement of thyroid on cricoid. Cricothyroid muscle contraction tilts thyroid forward → tenses vocal ligament → increases pitch.",
    clinicalNote: "BURP/external laryngeal manipulation acts on this articulation. Understanding this joint explains how cricothyroid (SLN) tenses cords independently of RLN-supplied muscles.",
  },
  "piriform-fossa": {
    label: "Piriform Fossa (Recess)",
    color: "hsl(190, 45%, 50%)",
    detail: "Pear-shaped recess on either side of laryngeal inlet, between aryepiglottic fold medially and thyroid cartilage/thyrohyoid membrane laterally. Internal branch of SLN lies deep to mucosa in its floor.",
    clinicalNote: "Accumulates secretions — visible during laryngoscopy as a sign of oesophageal obstruction or poor swallowing. Site for spray-as-you-go LA during awake fibreoptic. Foreign bodies may lodge here. Internal SLN can be blocked by soaking pledgets in piriform fossa.",
  },
  "aryepiglottic-fold": {
    label: "Aryepiglottic Fold",
    color: "hsl(155, 45%, 48%)",
    detail: "Mucosal fold running from lateral epiglottis to arytenoid apex. Contains aryepiglottic muscle (sphincter of laryngeal inlet) and cuneiform/corniculate cartilages (visible as small bumps). Forms the boundary of the laryngeal inlet.",
    clinicalNote: "Prominent aryepiglottic folds in laryngomalacia (floppy, collapse inward on inspiration → inspiratory stridor in neonates). Define the lateral boundary of the supraglottis during laryngoscopy.",
  },
  "conus-elasticus": {
    label: "Conus Elasticus",
    color: "hsl(15, 60%, 55%)",
    detail: "Fibroelastic membrane from upper border of cricoid arch to vocal ligament (its free superior edge). Forms the subglottic lateral wall. Continuous with CTM anteriorly. The vocal ligament is the thickened superior free edge.",
    clinicalNote: "Defines the subglottic space. Subglottic stenosis (post-intubation) occurs here. In children <8yr, this region (not the glottis) is the narrowest point of the airway. Cuffed ETT exerts pressure on this structure.",
  },
  "quadrangular-membrane": {
    label: "Quadrangular Membrane",
    color: "hsl(200, 50%, 58%)",
    detail: "Fibroelastic membrane extending from lateral epiglottis to arytenoid. Superior free edge forms aryepiglottic fold (with aryepiglottic muscle). Inferior free edge forms vestibular ligament (false cord). Separates vestibule from piriform fossa.",
    clinicalNote: "Understanding quadrangular membrane anatomy clarifies the layers of the supraglottis — relevant to supraglottic airway device placement and spread of supraglottic tumours.",
  },
  "pre-epiglottic": {
    label: "Pre-epiglottic Space",
    color: "hsl(45, 60%, 55%)",
    detail: "Fat-filled space anterior to epiglottis, bounded by thyrohyoid membrane/hyoid superiorly, thyroid cartilage anteriorly, and epiglottis posteriorly. Contains fat and loose areolar tissue. Continuous with paraglottic spaces laterally.",
    clinicalNote: "Key space in laryngeal cancer staging — invasion indicates advanced disease (T3+). Macintosh blade tip engages hyoepiglottic ligament which attaches through this space. CT/MRI assessment important pre-operatively.",
  },
  corniculate: {
    label: "Corniculate Cartilages",
    color: "hsl(270, 40%, 55%)",
    detail: "Small paired elastic cartilages (of Santorini) sitting on apex of each arytenoid. Visible as small tubercles (corniculate tubercles) on posterior laryngoscopic view within aryepiglottic folds.",
    clinicalNote: "Visible landmarks during laryngoscopy — the paired 'bumps' seen posteriorly at the laryngeal inlet. Help distinguish posterior commissure anatomy.",
  },
  cuneiform: {
    label: "Cuneiform Cartilages",
    color: "hsl(310, 40%, 55%)",
    detail: "Small paired elastic cartilages (of Wrisberg) embedded within the aryepiglottic folds, anterior to corniculate cartilages. Visible as cuneiform tubercles on laryngoscopy. Not all individuals have them.",
    clinicalNote: "Visible as elongated whitish elevations (cuneiform tubercles) in the aryepiglottic folds during laryngoscopy. Stiffen the aryepiglottic folds.",
  },
  "reinke-space": {
    label: "Reinke's Space",
    color: "hsl(350, 50%, 55%)",
    detail: "Potential space (superficial lamina propria) between vocal cord epithelium and vocal ligament. Contains loose gelatinous tissue. Mucosal wave propagation depends on this layer. Extends the full length of the membranous vocal cord.",
    clinicalNote: "Reinke's oedema: fluid accumulation → polypoid degeneration, breathy/husky voice (associated with smoking). Vocal cord haematoma (post-intubation) occurs in this layer. Microflap surgery targets this space.",
  },
};

const structureOrder: StructureKey[] = [
  "epiglottis", "aryepiglottic-fold", "hyoid", "thyrohyoid", "pre-epiglottic", "thyroid",
  "quadrangular-membrane", "vestibular-folds", "piriform-fossa", "vocal-cords", "reinke-space",
  "conus-elasticus", "cricothyroid-joint", "cricothyroid-membrane", "arytenoid", "corniculate", "cuneiform",
  "cricoid", "trachea", "sln-internal", "sln-external", "rln",
];

const intrinsicMuscles = [
  { name: "Posterior cricoarytenoid", action: "ABDUCTS cords (only abductor)", nerve: "RLN" },
  { name: "Lateral cricoarytenoid", action: "Adducts cords", nerve: "RLN" },
  { name: "Transverse arytenoid", action: "Adducts cords (closes posterior glottis)", nerve: "RLN" },
  { name: "Oblique arytenoid", action: "Narrows laryngeal inlet", nerve: "RLN" },
  { name: "Thyroarytenoid (vocalis)", action: "Relaxes/shortens vocal ligament", nerve: "RLN" },
  { name: "Cricothyroid", action: "Tenses/elongates vocal ligament (pitch ↑)", nerve: "External SLN" },
];

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

      <Tabs defaultValue="sagittal">
        <TabsList className="grid w-full grid-cols-3 mb-3">
          <TabsTrigger value="sagittal" className="text-xs">Sagittal View</TabsTrigger>
          <TabsTrigger value="axial" className="text-xs">Axial (Superior)</TabsTrigger>
          <TabsTrigger value="muscles" className="text-xs">Intrinsic Muscles</TabsTrigger>
        </TabsList>

        <TabsContent value="sagittal">
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <div className="flex-shrink-0 mx-auto">
              <svg viewBox="0 0 280 340" width="280" height="340" className="border border-border rounded">
                {/* Background: pharyngeal/airway lumen */}
                <path d="M120,20 C120,30 118,45 116,60 C114,78 113,95 115,110 C117,125 119,140 120,155 C120,168 118,180 115,195 C113,208 112,220 113,235 C114,250 115,265 115,280 L165,280 C165,265 166,250 167,235 C168,220 167,208 165,195 C162,180 160,168 160,155 C161,140 163,125 165,110 C167,95 166,78 164,60 C162,45 160,30 160,20 Z"
                  fill="hsl(200, 30%, 92%)" opacity="0.15" stroke="none" />

                {/* Posterior pharyngeal wall / vertebral bodies */}
                <rect x="165" y="30" width="12" height="270" rx="4" fill="hsl(30, 20%, 75%)" opacity="0.12" />
                {[50, 90, 130, 170, 210, 250].map((y, i) => (
                  <line key={`vert-${i}`} x1="166" y1={y} x2="176" y2={y} stroke="hsl(30, 20%, 60%)" strokeWidth="0.5" opacity="0.2" />
                ))}

                {/* Aryepiglottic fold */}
                <path
                  d="M118,68 C115,80 112,92 110,100 C108,108 106,112 105,116"
                  fill="none"
                  stroke={structures["aryepiglottic-fold"].color}
                  strokeWidth={isActive("aryepiglottic-fold") ? 3 : 1.5}
                  opacity={isActive("aryepiglottic-fold") ? 0.9 : 0.25}
                  className="cursor-pointer transition-all duration-200"
                  onClick={click("aryepiglottic-fold")}
                />
                <path
                  d="M142,68 C145,80 148,92 150,100 C152,108 154,112 155,116"
                  fill="none"
                  stroke={structures["aryepiglottic-fold"].color}
                  strokeWidth={isActive("aryepiglottic-fold") ? 3 : 1.5}
                  opacity={isActive("aryepiglottic-fold") ? 0.9 : 0.25}
                  className="cursor-pointer transition-all duration-200"
                  onClick={click("aryepiglottic-fold")}
                />
                {isActive("aryepiglottic-fold") && (
                  <text x="8" y="96" fontSize="5" fill={structures["aryepiglottic-fold"].color} className="select-none">Aryep. fold</text>
                )}

                {/* Pre-epiglottic space — fat-filled space anterior to epiglottis */}
                <path
                  d="M100,55 C102,48 108,42 118,40 C122,38 126,38 130,40 L130,82 C125,83 115,80 108,74 C102,68 100,62 100,55 Z"
                  fill={structures["pre-epiglottic"].color}
                  fillOpacity={isActive("pre-epiglottic") ? 0.4 : 0.06}
                  stroke={structures["pre-epiglottic"].color}
                  strokeWidth={isActive("pre-epiglottic") ? 1.5 : 0}
                  strokeDasharray="3 2"
                  className="cursor-pointer transition-all duration-200"
                  onClick={click("pre-epiglottic")}
                />
                {isActive("pre-epiglottic") && (
                  <text x="104" y="62" fontSize="4" fill={structures["pre-epiglottic"].color} className="select-none">Pre-epiglottic</text>
                )}

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
                <path d="M130,74 L130,88" stroke={structures.epiglottis.color} strokeWidth="2" opacity={isActive("epiglottis") ? 0.6 : 0.25} />

                {/* Vallecula label */}
                <text x="130" y="9" fontSize="4" textAnchor="middle" fill="hsl(var(--muted-foreground))" opacity="0.4">Vallecula ↓</text>

                {/* Hyoid bone */}
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

                {/* Thyroid cartilage */}
                <path
                  d="M72,82 L72,145 C72,152 80,158 95,160 C110,162 120,158 130,148 C140,158 150,162 165,160 C180,158 188,152 188,145 L188,82 C185,80 175,78 160,80 C145,82 135,83 130,84 C125,83 115,82 100,80 C85,78 75,80 72,82 Z"
                  fill={structures.thyroid.color}
                  fillOpacity={opacity("thyroid")}
                  stroke={structures.thyroid.color}
                  strokeWidth={sw("thyroid")}
                  className="cursor-pointer transition-all duration-200"
                  onClick={click("thyroid")}
                />
                <path d="M125,84 L130,78 L135,84" stroke={structures.thyroid.color} strokeWidth="1.5" fill="none" opacity={isActive("thyroid") ? 0.8 : 0.3} />
                <text x="210" y="115" fontSize="7" fill={isActive("thyroid") ? structures.thyroid.color : "hsl(var(--muted-foreground))"} fontWeight={isActive("thyroid") ? "bold" : "normal"} className="cursor-pointer select-none" onClick={click("thyroid")}>Thyroid cart.</text>

                {/* Piriform fossa indicators */}
                <ellipse cx="96" cy="105" rx="8" ry="14"
                  fill={structures["piriform-fossa"].color}
                  fillOpacity={isActive("piriform-fossa") ? 0.4 : 0.08}
                  stroke={structures["piriform-fossa"].color}
                  strokeWidth={isActive("piriform-fossa") ? 1.5 : 0.5}
                  className="cursor-pointer transition-all duration-200"
                  onClick={click("piriform-fossa")}
                />
                <ellipse cx="164" cy="105" rx="8" ry="14"
                  fill={structures["piriform-fossa"].color}
                  fillOpacity={isActive("piriform-fossa") ? 0.4 : 0.08}
                  stroke={structures["piriform-fossa"].color}
                  strokeWidth={isActive("piriform-fossa") ? 1.5 : 0.5}
                  className="cursor-pointer transition-all duration-200"
                  onClick={click("piriform-fossa")}
                />
                {isActive("piriform-fossa") && (
                  <>
                    <text x="84" y="130" fontSize="4" fill={structures["piriform-fossa"].color} textAnchor="middle">Piriform</text>
                    <text x="176" y="130" fontSize="4" fill={structures["piriform-fossa"].color} textAnchor="middle">Piriform</text>
                  </>
                )}

                {/* Quadrangular membrane — from epiglottis to arytenoid, between vestibular folds and aryepiglottic folds */}
                <path
                  d="M108,72 C106,82 105,92 105,100 L105,108 L115,118 L115,100 C115,90 116,80 118,72 Z"
                  fill={structures["quadrangular-membrane"].color}
                  fillOpacity={isActive("quadrangular-membrane") ? 0.35 : 0.04}
                  stroke={structures["quadrangular-membrane"].color}
                  strokeWidth={isActive("quadrangular-membrane") ? 1.5 : 0}
                  strokeDasharray="3 2"
                  className="cursor-pointer transition-all duration-200"
                  onClick={click("quadrangular-membrane")}
                />
                <path
                  d="M152,72 C154,82 155,92 155,100 L155,108 L145,118 L145,100 C145,90 144,80 142,72 Z"
                  fill={structures["quadrangular-membrane"].color}
                  fillOpacity={isActive("quadrangular-membrane") ? 0.35 : 0.04}
                  stroke={structures["quadrangular-membrane"].color}
                  strokeWidth={isActive("quadrangular-membrane") ? 1.5 : 0}
                  strokeDasharray="3 2"
                  className="cursor-pointer transition-all duration-200"
                  onClick={click("quadrangular-membrane")}
                />
                {isActive("quadrangular-membrane") && (
                  <>
                    <text x="80" y="92" fontSize="4" fill={structures["quadrangular-membrane"].color} textAnchor="end" className="select-none">Quadrangular</text>
                    <text x="80" y="98" fontSize="4" fill={structures["quadrangular-membrane"].color} textAnchor="end" className="select-none">membrane</text>
                  </>
                )}

                {/* Vestibular folds (inferior free edge of quadrangular membrane) */}
                <path
                  d="M105,108 C112,104 118,103 125,104 C128,104 132,103 135,104 C142,103 148,104 155,108"
                  fill="none"
                  stroke={structures["vestibular-folds"].color}
                  strokeWidth={isActive("vestibular-folds") ? 3.5 : 2}
                  opacity={isActive("vestibular-folds") ? 0.8 : 0.3}
                  className="cursor-pointer transition-all duration-200"
                  onClick={click("vestibular-folds")}
                />
                <text x="220" y="110" fontSize="5.5" fill={isActive("vestibular-folds") ? structures["vestibular-folds"].color : "hsl(var(--muted-foreground))"} className="cursor-pointer select-none" onClick={click("vestibular-folds")}>False cords</text>

                {/* Ventricle of Morgagni (laryngeal sinus) */}
                <path d="M108,110 C112,116 120,118 130,118 C140,118 148,116 152,110"
                  fill="hsl(200, 30%, 92%)" fillOpacity="0.1"
                  stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.35" />
                <text x="130" y="115" fontSize="3.5" textAnchor="middle" fill="hsl(var(--muted-foreground))" opacity="0.4">ventricle (Morgagni)</text>
                {/* Saccule extending superiorly from anterior ventricle */}
                <path d="M118,110 C116,106 115,100 116,94" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.4" strokeDasharray="1.5 1.5" opacity="0.2" />
                <text x="108" y="100" fontSize="3" fill="hsl(var(--muted-foreground))" opacity="0.25">saccule</text>

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
                <text x="130" y="112" fontSize="4" textAnchor="middle" fill="hsl(var(--muted-foreground))" opacity="0.4">glottis</text>
                <text x="220" y="122" fontSize="6" fill={isActive("vocal-cords") ? structures["vocal-cords"].color : "hsl(var(--muted-foreground))"} fontWeight={isActive("vocal-cords") ? "bold" : "normal"} className="cursor-pointer select-none" onClick={click("vocal-cords")}>True vocal cords</text>

                {/* Reinke's space — superficial lamina propria of true cords */}
                <path
                  d="M108,119 C115,115.5 122,114.5 130,114.5 C138,114.5 145,115.5 152,119"
                  fill="none"
                  stroke={structures["reinke-space"].color}
                  strokeWidth={isActive("reinke-space") ? 2 : 0.8}
                  strokeDasharray={isActive("reinke-space") ? "2 1" : "1.5 1.5"}
                  opacity={isActive("reinke-space") ? 0.8 : 0.15}
                  className="cursor-pointer transition-all duration-200"
                  onClick={click("reinke-space")}
                />
                {isActive("reinke-space") && (
                  <text x="130" y="124" fontSize="3.5" textAnchor="middle" fill={structures["reinke-space"].color} className="select-none">Reinke's space</text>
                )}

                {/* Conus elasticus — fibroelastic membrane from cricoid to vocal ligament */}
                <path
                  d="M105,120 C100,135 95,150 92,165 L168,165 C165,150 160,135 155,120"
                  fill={structures["conus-elasticus"].color}
                  fillOpacity={isActive("conus-elasticus") ? 0.25 : 0.04}
                  stroke={structures["conus-elasticus"].color}
                  strokeWidth={isActive("conus-elasticus") ? 1.5 : 0}
                  strokeDasharray="3 2"
                  className="cursor-pointer transition-all duration-200"
                  onClick={click("conus-elasticus")}
                />
                {isActive("conus-elasticus") && (
                  <>
                    <text x="78" y="142" fontSize="4" fill={structures["conus-elasticus"].color} textAnchor="end" className="select-none">Conus</text>
                    <text x="78" y="148" fontSize="4" fill={structures["conus-elasticus"].color} textAnchor="end" className="select-none">elasticus</text>
                  </>
                )}

                {/* Arytenoid cartilages */}
                <path d="M108,125 L115,118 L122,128 Z"
                  fill={structures.arytenoid.color} fillOpacity={opacity("arytenoid")}
                  stroke={structures.arytenoid.color} strokeWidth={sw("arytenoid")}
                  className="cursor-pointer transition-all duration-200" onClick={click("arytenoid")}
                />
                <path d="M138,125 L145,118 L152,128 Z"
                  fill={structures.arytenoid.color} fillOpacity={opacity("arytenoid")}
                  stroke={structures.arytenoid.color} strokeWidth={sw("arytenoid")}
                  className="cursor-pointer transition-all duration-200" onClick={click("arytenoid")}
                />
                <text x="220" y="132" fontSize="5.5" fill={isActive("arytenoid") ? structures.arytenoid.color : "hsl(var(--muted-foreground))"} className="cursor-pointer select-none" onClick={click("arytenoid")}>Arytenoids</text>

                {/* Corniculate cartilages — on apex of arytenoids */}
                <circle cx="115" cy="116" r="2.5"
                  fill={structures.corniculate.color} fillOpacity={isActive("corniculate") ? 0.6 : 0.15}
                  stroke={structures.corniculate.color} strokeWidth={isActive("corniculate") ? 1.5 : 0.5}
                  className="cursor-pointer transition-all duration-200" onClick={click("corniculate")}
                />
                <circle cx="145" cy="116" r="2.5"
                  fill={structures.corniculate.color} fillOpacity={isActive("corniculate") ? 0.6 : 0.15}
                  stroke={structures.corniculate.color} strokeWidth={isActive("corniculate") ? 1.5 : 0.5}
                  className="cursor-pointer transition-all duration-200" onClick={click("corniculate")}
                />
                {isActive("corniculate") && (
                  <text x="130" y="132" fontSize="3.5" textAnchor="middle" fill={structures.corniculate.color} className="select-none">Corniculate (Santorini)</text>
                )}

                {/* Cuneiform cartilages — within aryepiglottic folds */}
                <ellipse cx="110" cy="98" rx="2" ry="3.5"
                  fill={structures.cuneiform.color} fillOpacity={isActive("cuneiform") ? 0.6 : 0.12}
                  stroke={structures.cuneiform.color} strokeWidth={isActive("cuneiform") ? 1.2 : 0.4}
                  className="cursor-pointer transition-all duration-200" onClick={click("cuneiform")}
                />
                <ellipse cx="150" cy="98" rx="2" ry="3.5"
                  fill={structures.cuneiform.color} fillOpacity={isActive("cuneiform") ? 0.6 : 0.12}
                  stroke={structures.cuneiform.color} strokeWidth={isActive("cuneiform") ? 1.2 : 0.4}
                  className="cursor-pointer transition-all duration-200" onClick={click("cuneiform")}
                />
                {isActive("cuneiform") && (
                  <text x="130" y="95" fontSize="3.5" textAnchor="middle" fill={structures.cuneiform.color} className="select-none">Cuneiform (Wrisberg)</text>
                )}

                {/* Cricothyroid joint */}
                <circle cx="72" cy="158" r="4"
                  fill={structures["cricothyroid-joint"].color}
                  fillOpacity={isActive("cricothyroid-joint") ? 0.6 : 0.15}
                  stroke={structures["cricothyroid-joint"].color}
                  strokeWidth={isActive("cricothyroid-joint") ? 2 : 0.8}
                  className="cursor-pointer transition-all duration-200"
                  onClick={click("cricothyroid-joint")}
                />
                <circle cx="188" cy="158" r="4"
                  fill={structures["cricothyroid-joint"].color}
                  fillOpacity={isActive("cricothyroid-joint") ? 0.6 : 0.15}
                  stroke={structures["cricothyroid-joint"].color}
                  strokeWidth={isActive("cricothyroid-joint") ? 2 : 0.8}
                  className="cursor-pointer transition-all duration-200"
                  onClick={click("cricothyroid-joint")}
                />
                {isActive("cricothyroid-joint") && (
                  <>
                    <text x="56" y="152" fontSize="4" fill={structures["cricothyroid-joint"].color} textAnchor="middle">CT joint</text>
                    <text x="204" y="152" fontSize="4" fill={structures["cricothyroid-joint"].color} textAnchor="middle">CT joint</text>
                  </>
                )}

                {/* Cricothyroid membrane */}
                <rect x="90" y="162" width="80" height="14" rx="2"
                  fill={structures["cricothyroid-membrane"].color}
                  fillOpacity={isActive("cricothyroid-membrane") ? 0.5 : 0.2}
                  stroke={structures["cricothyroid-membrane"].color}
                  strokeWidth={isActive("cricothyroid-membrane") ? 3 : 1.5}
                  className="cursor-pointer transition-all duration-200"
                  onClick={click("cricothyroid-membrane")}
                />
                <path d="M125,169 L135,169" stroke={structures["cricothyroid-membrane"].color} strokeWidth="2" opacity={isActive("cricothyroid-membrane") ? 0.8 : 0.3} />
                <text x="210" y="172" fontSize="6" fill={isActive("cricothyroid-membrane") ? structures["cricothyroid-membrane"].color : "hsl(var(--muted-foreground))"} fontWeight="bold" className="cursor-pointer select-none" onClick={click("cricothyroid-membrane")}>CTM</text>
                <text x="210" y="180" fontSize="5" fill="hsl(0, 70%, 55%)" opacity="0.6">★ Emergency airway</text>

                {/* Cricoid cartilage */}
                <path
                  d="M82,178 C82,176 90,174 105,174 L155,174 C170,174 178,176 178,178 L178,200 C178,210 170,218 155,220 C140,222 120,222 105,220 C90,218 82,210 82,200 Z"
                  fill={structures.cricoid.color}
                  fillOpacity={opacity("cricoid")}
                  stroke={structures.cricoid.color}
                  strokeWidth={sw("cricoid")}
                  className="cursor-pointer transition-all duration-200"
                  onClick={click("cricoid")}
                />
                <rect x="110" y="200" width="40" height="18" rx="4"
                  fill={structures.cricoid.color} fillOpacity={isActive("cricoid") ? 0.3 : 0.1} stroke="none" />
                <text x="130" y="212" fontSize="4" textAnchor="middle" fill={structures.cricoid.color} opacity="0.5">post. lamina</text>
                <text x="210" y="198" fontSize="7" fill={isActive("cricoid") ? structures.cricoid.color : "hsl(var(--muted-foreground))"} fontWeight={isActive("cricoid") ? "bold" : "normal"} className="cursor-pointer select-none" onClick={click("cricoid")}>Cricoid cart.</text>

                {/* Trachea */}
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
                      <line x1="105" y1={ty + 5} x2="155" y2={ty + 5} stroke={structures.trachea.color} strokeWidth="0.5" strokeDasharray="2 2" opacity="0.3" />
                    </g>
                  );
                })}
                <text x="210" y="250" fontSize="7" fill={isActive("trachea") ? structures.trachea.color : "hsl(var(--muted-foreground))"} fontWeight={isActive("trachea") ? "bold" : "normal"} className="cursor-pointer select-none" onClick={click("trachea")}>Trachea</text>

                {/* Nerves & vessels */}
                {/* Superior laryngeal artery — accompanies internal SLN through thyrohyoid membrane */}
                <path d="M40,42 C52,44 62,49 74,56 C80,60 84,64 87,68"
                  stroke="#cc3333" strokeWidth={isActive("sln-internal") ? 1.5 : 0.8}
                  fill="none" opacity={isActive("sln-internal") ? 0.6 : 0.15}
                />
                {isActive("sln-internal") && (
                  <text x="50" y="40" fontSize="3.5" fill="#cc3333" opacity="0.6">Sup. laryngeal A.</text>
                )}

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

                {/* RLN */}
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

                {/* Sensory innervation zones */}
                {(isActive("sln-internal") || isActive("rln")) && (
                  <g className="animate-fade-in">
                    <rect x="104" y="68" width="52" height="48" rx="3"
                      fill={isActive("sln-internal") ? structures["sln-internal"].color : "transparent"}
                      fillOpacity="0.08"
                      stroke={isActive("sln-internal") ? structures["sln-internal"].color : "transparent"}
                      strokeWidth="0.8" strokeDasharray="3 2" />
                    {isActive("sln-internal") && (
                      <text x="130" y="78" fontSize="4" textAnchor="middle" fill={structures["sln-internal"].color} opacity="0.6">sensory zone ↑</text>
                    )}
                    <rect x="104" y="120" width="52" height="80" rx="3"
                      fill={isActive("rln") ? structures.rln.color : "transparent"}
                      fillOpacity="0.08"
                      stroke={isActive("rln") ? structures.rln.color : "transparent"}
                      strokeWidth="0.8" strokeDasharray="3 2" />
                    {isActive("rln") && (
                      <text x="130" y="165" fontSize="4" textAnchor="middle" fill={structures.rln.color} opacity="0.6">sensory zone ↓</text>
                    )}
                  </g>
                )}

                {/* Vertebral levels */}
                <g opacity="0.25">
                  <text x="250" y="60" fontSize="5" fill="hsl(var(--muted-foreground))">C3</text>
                  <text x="250" y="115" fontSize="5" fill="hsl(var(--muted-foreground))">C4-5</text>
                  <text x="250" y="195" fontSize="5" fill="hsl(var(--muted-foreground))">C6</text>
                  <text x="250" y="260" fontSize="5" fill="hsl(var(--muted-foreground))">C7-T1</text>
                </g>
              </svg>
            </div>

            {/* Info panel */}
            <div className="flex-1 min-w-0 space-y-3">
              <div className="p-4 rounded-lg border border-border animate-fade-in" key={selected}>
                <p className="font-bold text-sm" style={{ color: info.color }}>{info.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{info.detail}</p>
                <p className="text-xs mt-2 p-2 rounded bg-secondary/50 text-foreground">
                  <strong>Clinical:</strong> {info.clinicalNote}
                </p>
              </div>

              {/* Structure selector */}
              <div className="flex flex-wrap gap-1">
                {structureOrder.map(key => (
                  <button
                    key={key}
                    onClick={click(key)}
                    className={`px-1.5 py-0.5 rounded text-xs transition-colors border ${
                      selected === key ? "text-foreground" : "border-border text-muted-foreground hover:bg-muted/50"
                    }`}
                    style={selected === key ? { borderColor: structures[key].color, backgroundColor: structures[key].color + "18", color: structures[key].color } : {}}
                  >
                    {structures[key].label.replace(" (Vestibular Folds)", "").replace(" (Folds)", "").replace(" (Recess)", "").replace(" (CTM)", "")}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="axial">
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <div className="flex-shrink-0 mx-auto">
              <svg viewBox="0 0 240 240" width="240" height="240" className="border border-border rounded">
                <text x="120" y="15" fontSize="6" textAnchor="middle" fill="hsl(var(--muted-foreground))" opacity="0.6" fontWeight="600">SUPERIOR VIEW — looking down at glottis</text>

                {/* Thyroid cartilage outline */}
                <path d="M120,35 L60,80 L60,180 L120,200 L180,180 L180,80 Z"
                  fill="none" stroke="hsl(210, 50%, 52%)" strokeWidth="2" opacity="0.3" />
                <text x="120" y="32" fontSize="5" textAnchor="middle" fill="hsl(210, 50%, 52%)" opacity="0.4">Thyroid cart. (anterior)</text>

                {/* Cricoid (posterior arc) */}
                <path d="M80,170 C80,190 100,210 120,210 C140,210 160,190 160,170"
                  fill="hsl(220, 55%, 50%)" fillOpacity="0.15" stroke="hsl(220, 55%, 50%)" strokeWidth="1.5" opacity="0.4" />
                <text x="120" y="222" fontSize="5" textAnchor="middle" fill="hsl(220, 55%, 50%)" opacity="0.5">Cricoid (posterior)</text>

                {/* Arytenoid cartilages */}
                <path d="M95,160 L105,145 L115,160 Z" fill="hsl(280, 45%, 52%)" fillOpacity="0.3" stroke="hsl(280, 45%, 52%)" strokeWidth="1.2" />
                <path d="M125,160 L135,145 L145,160 Z" fill="hsl(280, 45%, 52%)" fillOpacity="0.3" stroke="hsl(280, 45%, 52%)" strokeWidth="1.2" />
                <text x="88" y="170" fontSize="4.5" fill="hsl(280, 45%, 52%)">Arytenoid</text>
                <text x="130" y="170" fontSize="4.5" fill="hsl(280, 45%, 52%)">Arytenoid</text>

                {/* Vocal process labels */}
                <text x="105" y="142" fontSize="3.5" textAnchor="middle" fill="hsl(var(--muted-foreground))" opacity="0.5">VP</text>
                <text x="135" y="142" fontSize="3.5" textAnchor="middle" fill="hsl(var(--muted-foreground))" opacity="0.5">VP</text>

                {/* True vocal cords */}
                <line x1="105" y1="148" x2="120" y2="85" stroke="hsl(340, 55%, 52%)" strokeWidth="3" opacity="0.7" />
                <line x1="135" y1="148" x2="120" y2="85" stroke="hsl(340, 55%, 52%)" strokeWidth="3" opacity="0.7" />
                <text x="120" y="82" fontSize="5" textAnchor="middle" fill="hsl(340, 55%, 52%)" fontWeight="bold">Anterior commissure</text>

                {/* Glottic opening */}
                <path d="M120,85 L105,148 L135,148 Z" fill="hsl(200, 30%, 92%)" fillOpacity="0.2" stroke="none" />
                <text x="120" y="130" fontSize="5" textAnchor="middle" fill="hsl(var(--muted-foreground))" opacity="0.5">Rima glottidis</text>

                {/* False cords (wider apart) */}
                <line x1="98" y1="155" x2="115" y2="95" stroke="hsl(300, 35%, 50%)" strokeWidth="1.5" opacity="0.3" strokeDasharray="3 2" />
                <line x1="142" y1="155" x2="125" y2="95" stroke="hsl(300, 35%, 50%)" strokeWidth="1.5" opacity="0.3" strokeDasharray="3 2" />

                {/* Piriform fossae */}
                <ellipse cx="72" cy="130" rx="10" ry="20" fill="hsl(190, 45%, 50%)" fillOpacity="0.15" stroke="hsl(190, 45%, 50%)" strokeWidth="0.8" />
                <ellipse cx="168" cy="130" rx="10" ry="20" fill="hsl(190, 45%, 50%)" fillOpacity="0.15" stroke="hsl(190, 45%, 50%)" strokeWidth="0.8" />
                <text x="72" y="158" fontSize="4" textAnchor="middle" fill="hsl(190, 45%, 50%)">Piriform</text>
                <text x="168" y="158" fontSize="4" textAnchor="middle" fill="hsl(190, 45%, 50%)">Piriform</text>

                {/* Aryepiglottic folds */}
                <path d="M95,160 C88,145 82,130 80,115 C78,100 80,90 85,85" stroke="hsl(155, 45%, 48%)" strokeWidth="1.5" fill="none" opacity="0.4" />
                <path d="M145,160 C152,145 158,130 160,115 C162,100 160,90 155,85" stroke="hsl(155, 45%, 48%)" strokeWidth="1.5" fill="none" opacity="0.4" />
                <text x="30" y="100" fontSize="4" fill="hsl(155, 45%, 48%)" opacity="0.6">Aryepiglottic fold</text>

                {/* Epiglottis base */}
                <path d="M85,85 C95,78 110,74 120,73 C130,74 145,78 155,85" stroke="hsl(140, 50%, 48%)" strokeWidth="2" fill="hsl(140, 50%, 48%)" fillOpacity="0.15" />
                <text x="120" y="70" fontSize="5" textAnchor="middle" fill="hsl(140, 50%, 48%)">Epiglottis</text>

                {/* Posterior interarytenoid */}
                <line x1="115" y1="160" x2="125" y2="160" stroke="hsl(var(--muted-foreground))" strokeWidth="2" opacity="0.3" />
                <text x="120" y="180" fontSize="4" textAnchor="middle" fill="hsl(var(--muted-foreground))" opacity="0.4">Interarytenoid</text>
              </svg>
            </div>

            <div className="flex-1 min-w-0">
              <div className="p-4 rounded-lg border border-border space-y-2">
                <p className="text-sm font-semibold text-foreground">Axial View — Laryngoscopic Perspective</p>
                <p className="text-xs text-muted-foreground">This view shows the anatomy as seen looking down from above — similar to the direct laryngoscopy view. Anterior is at the top (where the epiglottis and anterior commissure are).</p>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p>• <strong className="text-foreground">Rima glottidis:</strong> Triangular opening between true cords — narrowest point of adult airway</p>
                  <p>• <strong className="text-foreground">Piriform fossae:</strong> Lateral recesses — secretion pooling, SLN block site</p>
                  <p>• <strong className="text-foreground">Aryepiglottic folds:</strong> Boundary of laryngeal inlet — collapse in laryngomalacia</p>
                  <p>• <strong className="text-foreground">Vocal processes:</strong> Anterior arytenoid projections where vocal ligaments attach</p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="muscles">
          <p className="text-sm text-muted-foreground mb-3">
            All intrinsic laryngeal muscles are supplied by the RLN <strong>except cricothyroid</strong> (external branch of SLN). The posterior cricoarytenoid is the <strong>only abductor</strong>.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Muscle</th>
                  <th className="text-left py-2 text-foreground font-semibold">Action</th>
                  <th className="text-left py-2 text-foreground font-semibold">Nerve</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {intrinsicMuscles.map((m, i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="py-2 font-medium text-foreground">{m.name}</td>
                    <td className="py-2">{m.action}</td>
                    <td className="py-2">{m.nerve}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 p-3 rounded-lg border border-amber-500/20 bg-amber-500/5">
            <p className="text-xs text-amber-400 font-semibold mb-1">⚠ Exam Tip — Vocal Cord Positions</p>
            <p className="text-xs text-muted-foreground">
              <strong>Unilateral RLN palsy:</strong> Cord paramedian (adducted by cricothyroid, which is intact). Hoarse voice but adequate airway. <br />
              <strong>Bilateral RLN palsy:</strong> Both cords paramedian → stridor, airway obstruction. May need tracheostomy. <br />
              <strong>Unilateral vagal (X) palsy:</strong> Cord in intermediate (cadaveric) position — both SLN and RLN lost. <br />
              <strong>Bilateral vagal palsy:</strong> Both cords intermediate → better airway (wider gap) but aspiration risk and aphonia.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LaryngealCrossSectionDiagram;
