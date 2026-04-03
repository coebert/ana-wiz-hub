import { useState } from "react";

type StructureKey =
  | "lca" | "lad" | "lcx" | "rca" | "pda"
  | "sa-node" | "av-node" | "bundle-his" | "left-bundle" | "right-bundle" | "purkinje"
  | "mitral" | "aortic" | "tricuspid" | "pulmonary";

interface Structure {
  label: string;
  color: string;
  detail: string;
  clinicalNote: string;
  category: "coronary" | "conduction" | "valve";
}

const structures: Record<StructureKey, Structure> = {
  // Coronary arteries
  lca: { label: "Left Main Coronary (LMCA)", color: "hsl(0, 65%, 52%)", category: "coronary",
    detail: "Arises from left aortic sinus (of Valsalva). Short trunk (0.5–2 cm) before bifurcating into LAD and LCx. Passes between pulmonary trunk and left atrial appendage.",
    clinicalNote: "Left main stenosis is a surgical emergency — supplies ~75% of LV. 'Widow-maker' if occluded. CABG rather than PCI for significant left main disease." },
  lad: { label: "Left Anterior Descending (LAD)", color: "hsl(350, 60%, 50%)", category: "coronary",
    detail: "Runs in anterior interventricular groove toward apex. Gives septal perforators (supply anterior 2/3 of interventricular septum) and diagonal branches (anterior LV wall).",
    clinicalNote: "Most commonly occluded in MI. Territory: anterior LV wall, apex, anterior septum. ECG: V1–V4 ST elevation. LIMA-to-LAD is the gold standard CABG graft." },
  lcx: { label: "Left Circumflex (LCx)", color: "hsl(20, 65%, 50%)", category: "coronary",
    detail: "Runs in left AV groove posteriorly. Gives obtuse marginal branches to lateral LV wall. In 15% of population, gives the PDA ('left-dominant' circulation).",
    clinicalNote: "Territory: lateral and posterior LV wall. ECG: I, aVL, V5–V6 changes. Circumflex occlusion may be 'ECG-silent' — posterior changes often missed." },
  rca: { label: "Right Coronary Artery (RCA)", color: "hsl(10, 60%, 52%)", category: "coronary",
    detail: "Arises from right aortic sinus. Runs in right AV groove. Supplies RA, RV, SA node (in 60%), AV node (in 85% — right-dominant). Gives acute marginal branches.",
    clinicalNote: "In 85% ('right-dominant'), RCA gives posterior descending artery (PDA). RCA occlusion → inferior MI (II, III, aVF) + RV infarction. May cause bradycardia (SA/AV node supply)." },
  pda: { label: "Posterior Descending (PDA)", color: "hsl(280, 45%, 50%)", category: "coronary",
    detail: "Runs in posterior interventricular groove. Supplies posterior 1/3 of interventricular septum and inferior LV wall. Arises from RCA in 85% (right-dominant), LCx in 15%.",
    clinicalNote: "Dominance defined by which artery gives PDA. Right-dominant (85%): PDA from RCA. Left-dominant (15%): PDA from LCx. Co-dominant: both contribute." },

  // Conducting system
  "sa-node": { label: "Sinoatrial (SA) Node", color: "hsl(45, 75%, 48%)", category: "conduction",
    detail: "Located at junction of SVC and right atrium (crista terminalis). Primary pacemaker: intrinsic rate 60–100 bpm. Supplied by SA nodal artery (from RCA in 60%, LCx in 40%).",
    clinicalNote: "Sick sinus syndrome if damaged. SA nodal artery at risk during SVC cannulation and Fontan surgery. Automaticity influenced by autonomic tone." },
  "av-node": { label: "Atrioventricular (AV) Node", color: "hsl(55, 70%, 46%)", category: "conduction",
    detail: "Located in triangle of Koch (bounded by tendon of Todaro, coronary sinus ostium, tricuspid annulus). Intrinsic rate 40–60 bpm. Delays conduction 0.1s (PR interval).",
    clinicalNote: "AV node supplied by RCA in 85%. AV block in inferior MI (RCA territory). Only structure allowing atrial-to-ventricular conduction (cardiac skeleton insulates)." },
  "bundle-his": { label: "Bundle of His", color: "hsl(65, 65%, 44%)", category: "conduction",
    detail: "Penetrates the central fibrous body (cardiac skeleton) to reach the ventricular septum. Only electrical connection between atria and ventricles. Short segment (~20 mm).",
    clinicalNote: "Damage during aortic/mitral valve surgery → complete heart block. His bundle pacing is emerging as physiological pacing alternative." },
  "left-bundle": { label: "Left Bundle Branch", color: "hsl(80, 55%, 44%)", category: "conduction",
    detail: "Fans out as a broad sheet on left septal surface. Divides into anterior and posterior fascicles. Anterior fascicle: thin, single blood supply (LAD) — vulnerable. Posterior fascicle: thick, dual supply.",
    clinicalNote: "LBBB: QRS >120ms, broad negative V1, broad positive V6. New LBBB with chest pain = STEMI equivalent. Left anterior hemiblock is most common conduction defect." },
  "right-bundle": { label: "Right Bundle Branch", color: "hsl(100, 50%, 44%)", category: "conduction",
    detail: "Thin, discrete cord running along right side of interventricular septum to the moderator band, then to RV free wall. Single blood supply — relatively vulnerable.",
    clinicalNote: "RBBB: rsR' pattern in V1, wide S in V6. Common after right heart catheterisation or RV surgery. RBBB alone usually benign; with left fascicular block = bifascicular." },
  purkinje: { label: "Purkinje Fibres", color: "hsl(120, 45%, 42%)", category: "conduction",
    detail: "Terminal network of fast-conducting fibres spreading across ventricular endocardium. Conduction velocity 2–4 m/s (fastest in heart). Ensures synchronous ventricular contraction.",
    clinicalNote: "Intrinsic rate 20–40 bpm (escape rhythm). Wide QRS escape rhythm = infra-nodal (His-Purkinje). Purkinje fibres can be arrhythmogenic trigger in VF." },

  // Valves
  mitral: { label: "Mitral Valve", color: "hsl(200, 55%, 50%)", category: "valve",
    detail: "Bicuspid valve between LA and LV. Anterior leaflet larger (covers more orifice area), posterior leaflet longer (greater annular attachment). Supported by anterolateral and posteromedial papillary muscles via chordae tendineae.",
    clinicalNote: "Auscultation: apex (5th ICS, mid-clavicular). Mitral regurgitation: posterior leaflet prolapse most common. LCx artery runs in proximity — at risk during mitral surgery." },
  aortic: { label: "Aortic Valve", color: "hsl(170, 50%, 45%)", category: "valve",
    detail: "Trileaflet semilunar valve (right, left, non-coronary cusps). Coronary arteries arise from right and left sinuses of Valsalva above the cusps. No chordae — supported by annulus.",
    clinicalNote: "Auscultation: right 2nd ICS. Aortic stenosis: most common valve lesion requiring surgery. TAVI via femoral/transapical approach. Calcification progresses with age." },
  tricuspid: { label: "Tricuspid Valve", color: "hsl(260, 45%, 52%)", category: "valve",
    detail: "Three leaflets (anterior, posterior, septal) between RA and RV. Largest valve by annular area. Septal leaflet attached to ventricular septum — offset from mitral (more apical).",
    clinicalNote: "Auscultation: left lower sternal edge. Functional TR common in RV dilatation. AV node lies near septal leaflet — risk during tricuspid surgery. Offset helps identify ventricles on echo." },
  pulmonary: { label: "Pulmonary Valve", color: "hsl(310, 40%, 50%)", category: "valve",
    detail: "Trileaflet semilunar valve at RV outflow tract (infundibulum) — pulmonary trunk junction. Most anterior valve. No coronary arteries arise from pulmonary sinuses.",
    clinicalNote: "Auscultation: left 2nd ICS. Pulmonary stenosis: congenital (tetralogy of Fallot). PA catheter passes through this valve. Ross procedure: pulmonary autograft replaces diseased aortic valve." },
};

const categories = [
  { key: "coronary" as const, label: "Coronary Arteries", keys: ["lca", "lad", "lcx", "rca", "pda"] as StructureKey[] },
  { key: "conduction" as const, label: "Conducting System", keys: ["sa-node", "av-node", "bundle-his", "left-bundle", "right-bundle", "purkinje"] as StructureKey[] },
  { key: "valve" as const, label: "Valves", keys: ["mitral", "aortic", "tricuspid", "pulmonary"] as StructureKey[] },
];

const CardiacAnatomyDiagram = () => {
  const [selected, setSelected] = useState<StructureKey>("lad");
  const info = structures[selected];
  const click = (key: StructureKey) => () => setSelected(key);
  const isActive = (key: StructureKey) => selected === key;

  return (
    <div className="border border-border rounded-lg p-4 mb-6">
      <h3 className="text-lg font-serif font-bold text-foreground mb-1">Interactive Cardiac Anatomy</h3>
      <p className="text-xs text-muted-foreground mb-3">Tap any structure to see its anatomy and clinical significance</p>

      <div className="flex flex-col sm:flex-row gap-4 items-start">
        <div className="flex-shrink-0 mx-auto">
          <svg viewBox="0 0 320 340" width="300" height="320" className="border border-border rounded">
            {/* Heart outline — anterior view */}
            <g opacity="0.2" stroke="hsl(var(--muted-foreground))" strokeWidth="1.2" fill="none">
              {/* Right heart border */}
              <path d="M175,40 C195,38 215,42 230,55 C245,68 255,90 260,115 C265,140 262,168 255,195 C248,220 235,248 215,270 C200,285 185,295 170,300" />
              {/* Left heart border */}
              <path d="M175,40 C155,38 135,42 118,55 C100,70 88,92 80,118 C72,145 70,175 75,205 C80,230 92,255 110,275 C130,295 150,300 170,300" />
              {/* Apex */}
              <path d="M170,300 C168,302 166,303 165,303 C164,303 163,302 162,300" />
              {/* Interatrial/interventricular groove line */}
              <path d="M175,40 C172,80 170,130 168,180 C166,230 165,270 165,300" strokeDasharray="4 3" strokeWidth="0.6" />
              {/* AV groove (horizontal) */}
              <path d="M90,130 C110,140 140,148 170,150 C200,148 230,140 255,130" strokeDasharray="3 3" strokeWidth="0.6" />
              {/* Great vessels */}
              {/* Aorta */}
              <path d="M160,40 C158,25 160,12 170,8 C180,5 195,10 200,22 C205,34 202,45 195,50" strokeWidth="1.5" />
              <text x="170" y="6" fontSize="5.5" textAnchor="middle" fill="hsl(var(--muted-foreground))">Aorta</text>
              {/* Pulmonary trunk */}
              <path d="M140,45 C135,30 128,18 118,15 C108,14 100,22 100,32" strokeWidth="1.5" />
              <text x="108" y="12" fontSize="5" fill="hsl(var(--muted-foreground))">PA</text>
              {/* SVC */}
              <path d="M225,10 C228,18 230,30 228,42" strokeWidth="1" />
              <text x="232" y="12" fontSize="5" fill="hsl(var(--muted-foreground))">SVC</text>
              {/* IVC */}
              <path d="M240,140 C248,148 255,158 258,170" strokeWidth="1" />
            </g>

            {/* Chamber labels */}
            <g fontSize="7" fill="hsl(var(--muted-foreground))" opacity="0.25" fontWeight="bold">
              <text x="210" y="100" textAnchor="middle">RA</text>
              <text x="130" y="100" textAnchor="middle">LA</text>
              <text x="200" y="220" textAnchor="middle">RV</text>
              <text x="140" y="220" textAnchor="middle">LV</text>
            </g>

            {/* ===== CORONARY ARTERIES ===== */}
            {/* Left Main */}
            <path d="M162,42 C155,50 148,58 140,65"
              stroke={structures.lca.color} strokeWidth={isActive("lca") ? 4 : 2.5} fill="none"
              opacity={isActive("lca") ? 1 : 0.4} strokeLinecap="round"
              className="cursor-pointer transition-all duration-200" onClick={click("lca")} />
            <path d="M162,42 C155,50 148,58 140,65" stroke="transparent" strokeWidth="14" fill="none"
              className="cursor-pointer" onClick={click("lca")} />

            {/* LAD */}
            <path d="M140,65 C138,80 136,100 135,120 C134,145 134,175 136,205 C138,235 142,260 148,280 C152,292 158,298 163,300"
              stroke={structures.lad.color} strokeWidth={isActive("lad") ? 4 : 2.5} fill="none"
              opacity={isActive("lad") ? 1 : 0.4} strokeLinecap="round"
              className="cursor-pointer transition-all duration-200" onClick={click("lad")} />
            {/* LAD septal perforators */}
            {isActive("lad") && (
              <g opacity="0.5" className="animate-fade-in">
                {[130, 160, 190, 220].map((y, i) => (
                  <line key={i} x1={135} y1={y} x2={155} y2={y + 8} stroke={structures.lad.color} strokeWidth="1" strokeDasharray="2 2" />
                ))}
                <text x="158" y="178" fontSize="4.5" fill={structures.lad.color}>septals</text>
              </g>
            )}
            {/* LAD diagonals */}
            {isActive("lad") && (
              <g opacity="0.5" className="animate-fade-in">
                <path d="M136,140 C125,150 115,162 108,175" stroke={structures.lad.color} strokeWidth="1" strokeDasharray="2 2" fill="none" />
                <text x="105" y="178" fontSize="4.5" fill={structures.lad.color} textAnchor="end">D1</text>
              </g>
            )}
            <path d="M140,65 C138,80 136,100 135,120 C134,145 134,175 136,205 C138,235 142,260 148,280 C152,292 158,298 163,300"
              stroke="transparent" strokeWidth="14" fill="none" className="cursor-pointer" onClick={click("lad")} />

            {/* LCx */}
            <path d="M140,65 C128,72 115,82 105,95 C95,108 88,122 84,138 C80,155 80,172 84,188"
              stroke={structures.lcx.color} strokeWidth={isActive("lcx") ? 4 : 2.5} fill="none"
              opacity={isActive("lcx") ? 1 : 0.4} strokeLinecap="round"
              className="cursor-pointer transition-all duration-200" onClick={click("lcx")} />
            {/* OM branches */}
            {isActive("lcx") && (
              <g opacity="0.5" className="animate-fade-in">
                <path d="M95,108 C88,120 82,135 80,150" stroke={structures.lcx.color} strokeWidth="1" strokeDasharray="2 2" fill="none" />
                <text x="74" y="148" fontSize="4.5" fill={structures.lcx.color}>OM</text>
              </g>
            )}
            <path d="M140,65 C128,72 115,82 105,95 C95,108 88,122 84,138 C80,155 80,172 84,188"
              stroke="transparent" strokeWidth="14" fill="none" className="cursor-pointer" onClick={click("lcx")} />

            {/* RCA */}
            <path d="M190,42 C200,50 210,62 218,78 C226,95 232,112 235,130 C238,148 238,165 235,182 C232,198 225,215 215,230"
              stroke={structures.rca.color} strokeWidth={isActive("rca") ? 4 : 2.5} fill="none"
              opacity={isActive("rca") ? 1 : 0.4} strokeLinecap="round"
              className="cursor-pointer transition-all duration-200" onClick={click("rca")} />
            {/* Acute marginal */}
            {isActive("rca") && (
              <g opacity="0.5" className="animate-fade-in">
                <path d="M235,145 C242,160 248,178 250,195" stroke={structures.rca.color} strokeWidth="1" strokeDasharray="2 2" fill="none" />
                <text x="252" y="178" fontSize="4.5" fill={structures.rca.color}>AM</text>
              </g>
            )}
            <path d="M190,42 C200,50 210,62 218,78 C226,95 232,112 235,130 C238,148 238,165 235,182 C232,198 225,215 215,230"
              stroke="transparent" strokeWidth="14" fill="none" className="cursor-pointer" onClick={click("rca")} />

            {/* PDA */}
            <path d="M215,230 C205,245 195,258 185,270 C178,278 172,288 168,298"
              stroke={structures.pda.color} strokeWidth={isActive("pda") ? 4 : 2.5} fill="none"
              opacity={isActive("pda") ? 1 : 0.4} strokeLinecap="round"
              className="cursor-pointer transition-all duration-200" onClick={click("pda")} />
            <path d="M215,230 C205,245 195,258 185,270 C178,278 172,288 168,298"
              stroke="transparent" strokeWidth="14" fill="none" className="cursor-pointer" onClick={click("pda")} />

            {/* Coronary labels */}
            <text x="148" y="48" fontSize="5.5" fill={isActive("lca") ? structures.lca.color : "hsl(var(--muted-foreground))"} fontWeight={isActive("lca") ? "bold" : "normal"} className="cursor-pointer select-none" onClick={click("lca")} textAnchor="end">LMCA</text>
            <text x="120" y="175" fontSize="5.5" fill={isActive("lad") ? structures.lad.color : "hsl(var(--muted-foreground))"} fontWeight={isActive("lad") ? "bold" : "normal"} className="cursor-pointer select-none" onClick={click("lad")} textAnchor="end">LAD</text>
            <text x="72" y="118" fontSize="5.5" fill={isActive("lcx") ? structures.lcx.color : "hsl(var(--muted-foreground))"} fontWeight={isActive("lcx") ? "bold" : "normal"} className="cursor-pointer select-none" onClick={click("lcx")} textAnchor="end">LCx</text>
            <text x="248" y="108" fontSize="5.5" fill={isActive("rca") ? structures.rca.color : "hsl(var(--muted-foreground))"} fontWeight={isActive("rca") ? "bold" : "normal"} className="cursor-pointer select-none" onClick={click("rca")}>RCA</text>
            <text x="220" y="262" fontSize="5.5" fill={isActive("pda") ? structures.pda.color : "hsl(var(--muted-foreground))"} fontWeight={isActive("pda") ? "bold" : "normal"} className="cursor-pointer select-none" onClick={click("pda")}>PDA</text>

            {/* ===== CONDUCTING SYSTEM ===== */}
            {/* SA node */}
            <circle cx="228" cy="55" r={isActive("sa-node") ? 6 : 4} fill={structures["sa-node"].color}
              fillOpacity={isActive("sa-node") ? 0.7 : 0.3} stroke={structures["sa-node"].color}
              strokeWidth={isActive("sa-node") ? 2 : 1}
              className="cursor-pointer transition-all duration-200" onClick={click("sa-node")} />
            <text x="236" y="52" fontSize="5.5" fill={isActive("sa-node") ? structures["sa-node"].color : "hsl(var(--muted-foreground))"} fontWeight={isActive("sa-node") ? "bold" : "normal"} className="cursor-pointer select-none" onClick={click("sa-node")}>SA</text>

            {/* Internodal pathways */}
            <path d="M228,60 C225,75 222,95 220,110 C218,125 216,135 214,142"
              stroke={structures["sa-node"].color} strokeWidth="1" strokeDasharray="3 2" fill="none"
              opacity={isActive("sa-node") || isActive("av-node") ? 0.5 : 0.15} />

            {/* AV node */}
            <circle cx="214" cy="145" r={isActive("av-node") ? 6 : 4} fill={structures["av-node"].color}
              fillOpacity={isActive("av-node") ? 0.7 : 0.3} stroke={structures["av-node"].color}
              strokeWidth={isActive("av-node") ? 2 : 1}
              className="cursor-pointer transition-all duration-200" onClick={click("av-node")} />
            <text x="222" y="148" fontSize="5.5" fill={isActive("av-node") ? structures["av-node"].color : "hsl(var(--muted-foreground))"} fontWeight={isActive("av-node") ? "bold" : "normal"} className="cursor-pointer select-none" onClick={click("av-node")}>AV</text>

            {/* Bundle of His */}
            <path d="M214,150 C210,155 205,162 195,170"
              stroke={structures["bundle-his"].color} strokeWidth={isActive("bundle-his") ? 3 : 1.5} fill="none"
              opacity={isActive("bundle-his") ? 0.8 : 0.3} strokeLinecap="round"
              className="cursor-pointer transition-all duration-200" onClick={click("bundle-his")} />
            <path d="M214,150 C210,155 205,162 195,170" stroke="transparent" strokeWidth="12" fill="none"
              className="cursor-pointer" onClick={click("bundle-his")} />
            <text x="210" y="165" fontSize="5" fill={isActive("bundle-his") ? structures["bundle-his"].color : "hsl(var(--muted-foreground))"} className="cursor-pointer select-none" onClick={click("bundle-his")}>His</text>

            {/* Left bundle branch */}
            <path d="M195,170 C185,180 175,195 165,215 C155,235 148,258 145,278"
              stroke={structures["left-bundle"].color} strokeWidth={isActive("left-bundle") ? 3 : 1.5} fill="none"
              opacity={isActive("left-bundle") ? 0.8 : 0.3} strokeLinecap="round"
              className="cursor-pointer transition-all duration-200" onClick={click("left-bundle")} />
            {/* Fascicles */}
            {isActive("left-bundle") && (
              <g opacity="0.4" className="animate-fade-in">
                <path d="M175,200 C165,210 152,218 140,222" stroke={structures["left-bundle"].color} strokeWidth="1" strokeDasharray="2 2" fill="none" />
                <text x="132" y="222" fontSize="4" fill={structures["left-bundle"].color} textAnchor="end">ant. fascicle</text>
                <path d="M165,225 C155,238 148,250 142,262" stroke={structures["left-bundle"].color} strokeWidth="1" strokeDasharray="2 2" fill="none" />
                <text x="132" y="262" fontSize="4" fill={structures["left-bundle"].color} textAnchor="end">post. fascicle</text>
              </g>
            )}
            <path d="M195,170 C185,180 175,195 165,215 C155,235 148,258 145,278" stroke="transparent" strokeWidth="12" fill="none"
              className="cursor-pointer" onClick={click("left-bundle")} />
            <text x="148" y="248" fontSize="5" fill={isActive("left-bundle") ? structures["left-bundle"].color : "hsl(var(--muted-foreground))"} className="cursor-pointer select-none" onClick={click("left-bundle")} textAnchor="end">LBB</text>

            {/* Right bundle branch */}
            <path d="M195,170 C200,180 208,195 212,215 C216,235 218,258 218,278"
              stroke={structures["right-bundle"].color} strokeWidth={isActive("right-bundle") ? 3 : 1.5} fill="none"
              opacity={isActive("right-bundle") ? 0.8 : 0.3} strokeLinecap="round"
              className="cursor-pointer transition-all duration-200" onClick={click("right-bundle")} />
            <path d="M195,170 C200,180 208,195 212,215 C216,235 218,258 218,278" stroke="transparent" strokeWidth="12" fill="none"
              className="cursor-pointer" onClick={click("right-bundle")} />
            <text x="222" y="248" fontSize="5" fill={isActive("right-bundle") ? structures["right-bundle"].color : "hsl(var(--muted-foreground))"} className="cursor-pointer select-none" onClick={click("right-bundle")}>RBB</text>

            {/* Purkinje fibres */}
            {(isActive("purkinje") || isActive("left-bundle") || isActive("right-bundle")) && (
              <g opacity="0.4" className="animate-fade-in">
                {/* Left Purkinje network */}
                <path d="M145,278 C130,282 115,285 100,284" stroke={structures.purkinje.color} strokeWidth="1" fill="none" />
                <path d="M145,278 C140,285 135,292 128,296" stroke={structures.purkinje.color} strokeWidth="1" fill="none" />
                <path d="M145,278 C148,285 152,290 155,295" stroke={structures.purkinje.color} strokeWidth="1" fill="none" />
                {/* Right Purkinje network */}
                <path d="M218,278 C228,282 238,284 246,282" stroke={structures.purkinje.color} strokeWidth="1" fill="none" />
                <path d="M218,278 C222,285 225,290 228,296" stroke={structures.purkinje.color} strokeWidth="1" fill="none" />
                <path d="M218,278 C215,285 212,292 208,296" stroke={structures.purkinje.color} strokeWidth="1" fill="none" />
              </g>
            )}
            <circle cx="145" cy="282" r={isActive("purkinje") ? 5 : 3} fill={structures.purkinje.color}
              fillOpacity={isActive("purkinje") ? 0.5 : 0.15} stroke={structures.purkinje.color}
              strokeWidth={isActive("purkinje") ? 1.5 : 0.5}
              className="cursor-pointer transition-all duration-200" onClick={click("purkinje")} />
            <circle cx="218" cy="282" r={isActive("purkinje") ? 5 : 3} fill={structures.purkinje.color}
              fillOpacity={isActive("purkinje") ? 0.5 : 0.15} stroke={structures.purkinje.color}
              strokeWidth={isActive("purkinje") ? 1.5 : 0.5}
              className="cursor-pointer transition-all duration-200" onClick={click("purkinje")} />
            <text x="170" y="292" fontSize="5" textAnchor="middle" fill={isActive("purkinje") ? structures.purkinje.color : "hsl(var(--muted-foreground))"} className="cursor-pointer select-none" onClick={click("purkinje")}>Purkinje</text>

            {/* ===== VALVES ===== */}
            {/* Mitral valve — between LA and LV */}
            <ellipse cx="140" cy="150" rx="14" ry="6"
              fill={structures.mitral.color} fillOpacity={isActive("mitral") ? 0.5 : 0.15}
              stroke={structures.mitral.color} strokeWidth={isActive("mitral") ? 2.5 : 1}
              className="cursor-pointer transition-all duration-200" onClick={click("mitral")} />
            <text x="118" y="152" fontSize="5" fill={isActive("mitral") ? structures.mitral.color : "hsl(var(--muted-foreground))"} textAnchor="end" className="cursor-pointer select-none" onClick={click("mitral")}>Mitral</text>

            {/* Aortic valve */}
            <ellipse cx="170" cy="52" rx="10" ry="5"
              fill={structures.aortic.color} fillOpacity={isActive("aortic") ? 0.5 : 0.15}
              stroke={structures.aortic.color} strokeWidth={isActive("aortic") ? 2.5 : 1}
              className="cursor-pointer transition-all duration-200" onClick={click("aortic")} />
            {/* Three cusps hint */}
            {isActive("aortic") && (
              <g opacity="0.5" className="animate-fade-in">
                <line x1="163" y1="48" x2="163" y2="56" stroke={structures.aortic.color} strokeWidth="0.8" />
                <line x1="170" y1="47" x2="170" y2="57" stroke={structures.aortic.color} strokeWidth="0.8" />
                <line x1="177" y1="48" x2="177" y2="56" stroke={structures.aortic.color} strokeWidth="0.8" />
              </g>
            )}
            <text x="185" y="55" fontSize="5" fill={isActive("aortic") ? structures.aortic.color : "hsl(var(--muted-foreground))"} className="cursor-pointer select-none" onClick={click("aortic")}>Aortic</text>

            {/* Tricuspid valve */}
            <ellipse cx="205" cy="150" rx="14" ry="6"
              fill={structures.tricuspid.color} fillOpacity={isActive("tricuspid") ? 0.5 : 0.15}
              stroke={structures.tricuspid.color} strokeWidth={isActive("tricuspid") ? 2.5 : 1}
              className="cursor-pointer transition-all duration-200" onClick={click("tricuspid")} />
            <text x="222" y="158" fontSize="5" fill={isActive("tricuspid") ? structures.tricuspid.color : "hsl(var(--muted-foreground))"} className="cursor-pointer select-none" onClick={click("tricuspid")}>Tricuspid</text>

            {/* Pulmonary valve */}
            <ellipse cx="135" cy="52" rx="10" ry="5"
              fill={structures.pulmonary.color} fillOpacity={isActive("pulmonary") ? 0.5 : 0.15}
              stroke={structures.pulmonary.color} strokeWidth={isActive("pulmonary") ? 2.5 : 1}
              className="cursor-pointer transition-all duration-200" onClick={click("pulmonary")} />
            <text x="118" y="45" fontSize="5" fill={isActive("pulmonary") ? structures.pulmonary.color : "hsl(var(--muted-foreground))"} textAnchor="end" className="cursor-pointer select-none" onClick={click("pulmonary")}>Pulm.</text>
          </svg>
        </div>

        {/* Info panel */}
        <div className="flex-1 min-w-0">
          {/* Category selector */}
          <div className="flex flex-wrap gap-1 mb-3">
            {categories.map(cat => (
              <div key={cat.key} className="flex flex-wrap gap-1">
                {cat.keys.map(k => (
                  <button
                    key={k}
                    onClick={() => setSelected(k)}
                    className={`text-xs px-2 py-0.5 rounded-full border transition-colors ${selected === k ? 'border-current font-bold' : 'border-border text-muted-foreground hover:text-foreground'}`}
                    style={selected === k ? { color: structures[k].color, borderColor: structures[k].color } : {}}
                  >
                    {structures[k].label.split('(')[0].replace('Left ', 'L ').replace('Right ', 'R ').trim()}
                  </button>
                ))}
              </div>
            ))}
          </div>

          <div className="p-4 rounded-lg border border-border animate-fade-in" key={selected}>
            <p className="font-bold text-sm" style={{ color: info.color }}>{info.label}</p>
            <span className="text-[10px] uppercase tracking-wide text-muted-foreground">{info.category === "coronary" ? "Coronary Artery" : info.category === "conduction" ? "Conducting System" : "Heart Valve"}</span>
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

export default CardiacAnatomyDiagram;
