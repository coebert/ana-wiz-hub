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
          <svg viewBox="0 0 400 440" width="360" height="400" className="border border-border rounded bg-gradient-to-b from-background to-secondary/20">
            <defs>
              {/* Gradient for myocardium */}
              <linearGradient id="myocardium" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="hsl(0, 35%, 45%)" />
                <stop offset="100%" stopColor="hsl(0, 30%, 35%)" />
              </linearGradient>
              <linearGradient id="myocardiumLV" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="hsl(0, 38%, 42%)" />
                <stop offset="100%" stopColor="hsl(0, 32%, 32%)" />
              </linearGradient>
              <linearGradient id="bloodRA" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(220, 50%, 30%)" />
                <stop offset="100%" stopColor="hsl(230, 45%, 25%)" />
              </linearGradient>
              <linearGradient id="bloodLA" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(0, 55%, 38%)" />
                <stop offset="100%" stopColor="hsl(0, 50%, 32%)" />
              </linearGradient>
              <linearGradient id="bloodRV" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(225, 48%, 28%)" />
                <stop offset="100%" stopColor="hsl(230, 42%, 22%)" />
              </linearGradient>
              <linearGradient id="bloodLV" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(0, 60%, 35%)" />
                <stop offset="100%" stopColor="hsl(0, 52%, 28%)" />
              </linearGradient>
              <linearGradient id="aortaGrad" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="hsl(0, 50%, 42%)" />
                <stop offset="100%" stopColor="hsl(0, 55%, 48%)" />
              </linearGradient>
              <linearGradient id="paGrad" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="hsl(225, 45%, 35%)" />
                <stop offset="100%" stopColor="hsl(220, 50%, 42%)" />
              </linearGradient>
              <linearGradient id="veinGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(220, 40%, 40%)" />
                <stop offset="100%" stopColor="hsl(225, 35%, 35%)" />
              </linearGradient>
              {/* Epicardial fat */}
              <filter id="softGlow">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* ===== PERICARDIUM (outer layer) ===== */}
            <path d="M200,22 C240,20 280,30 310,55 C340,80 358,115 365,155 C372,195 370,240 360,280 C350,320 330,355 300,378 C270,400 240,410 210,412 C195,413 185,412 178,408 C165,400 148,382 132,360 C112,332 96,298 86,260 C76,222 72,182 78,145 C84,108 98,75 120,52 C142,30 168,22 200,22Z"
              fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="0.8" strokeDasharray="6 3" opacity="0.2" />

            {/* ===== GREAT VESSELS ===== */}
            {/* SVC */}
            <path d="M302,10 C305,20 308,35 310,50 C312,65 312,78 310,88"
              fill="none" stroke="url(#veinGrad)" strokeWidth="16" strokeLinecap="round" opacity="0.7" />
            <path d="M302,10 C305,20 308,35 310,50 C312,65 312,78 310,88"
              fill="none" stroke="hsl(220, 40%, 50%)" strokeWidth="1" opacity="0.4" />
            <text x="326" y="35" fontSize="7" fill="hsl(var(--muted-foreground))" opacity="0.5" fontWeight="bold">SVC</text>

            {/* IVC */}
            <path d="M320,340 C325,350 328,360 330,372"
              fill="none" stroke="url(#veinGrad)" strokeWidth="16" strokeLinecap="round" opacity="0.7" />
            <text x="342" y="365" fontSize="7" fill="hsl(var(--muted-foreground))" opacity="0.5" fontWeight="bold">IVC</text>

            {/* Pulmonary veins (left, entering LA) */}
            <path d="M60,100 C72,108 86,115 100,120" fill="none" stroke="hsl(0, 40%, 45%)" strokeWidth="6" opacity="0.4" strokeLinecap="round" />
            <path d="M58,135 C72,138 86,140 100,140" fill="none" stroke="hsl(0, 40%, 45%)" strokeWidth="6" opacity="0.4" strokeLinecap="round" />
            <text x="48" y="100" fontSize="6" fill="hsl(var(--muted-foreground))" opacity="0.4" textAnchor="end">PVs</text>

            {/* Aorta — ascending, arch, descending */}
            <path d="M195,72 C192,50 194,30 206,15 C218,2 240,0 258,6 C276,12 286,28 282,48 C278,68 268,82 260,92"
              fill="none" stroke="url(#aortaGrad)" strokeWidth="18" strokeLinecap="round" opacity="0.8" />
            {/* Aorta lumen */}
            <path d="M195,72 C192,50 194,30 206,15 C218,2 240,0 258,6 C276,12 286,28 282,48 C278,68 268,82 260,92"
              fill="none" stroke="hsl(0, 60%, 55%)" strokeWidth="1" opacity="0.3" />
            {/* Arch branches */}
            <path d="M232,4 L228,-12" fill="none" stroke="hsl(0, 45%, 48%)" strokeWidth="5" strokeLinecap="round" opacity="0.5" />
            <path d="M248,2 L250,-14" fill="none" stroke="hsl(0, 45%, 48%)" strokeWidth="4.5" strokeLinecap="round" opacity="0.5" />
            <path d="M262,8 L268,-6" fill="none" stroke="hsl(0, 45%, 48%)" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
            <text x="220" y="-14" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.35" textAnchor="middle">BCT</text>
            <text x="250" y="-16" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.35" textAnchor="middle">LCC</text>
            <text x="274" y="-8" fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.35" textAnchor="middle">LSA</text>
            <text x="242" y="22" fontSize="8" fill="hsl(var(--muted-foreground))" opacity="0.45" fontWeight="bold" textAnchor="middle">Aorta</text>

            {/* Pulmonary trunk */}
            <path d="M155,75 C148,55 138,38 125,28 C112,18 96,16 82,22 C68,28 60,42 62,58"
              fill="none" stroke="url(#paGrad)" strokeWidth="16" strokeLinecap="round" opacity="0.8" />
            {/* PA bifurcation */}
            <path d="M82,22 C72,15 58,14 48,20" fill="none" stroke="hsl(220, 45%, 38%)" strokeWidth="8" strokeLinecap="round" opacity="0.5" />
            <path d="M82,22 C82,10 88,2 98,0" fill="none" stroke="hsl(220, 45%, 38%)" strokeWidth="8" strokeLinecap="round" opacity="0.5" />
            <text x="36" y="18" fontSize="6" fill="hsl(var(--muted-foreground))" opacity="0.4">RPA</text>
            <text x="96" y="-2" fontSize="6" fill="hsl(var(--muted-foreground))" opacity="0.4">LPA</text>
            <text x="108" y="48" fontSize="7" fill="hsl(var(--muted-foreground))" opacity="0.4" fontWeight="bold">PA</text>

            {/* ===== HEART WALL — OUTER (epicardium) ===== */}
            <path d="M200,55 C245,52 290,68 320,100 C350,132 358,172 355,215 C352,258 338,298 315,330 C292,362 262,382 230,392 C210,398 195,400 185,395 C168,385 148,365 130,340 C108,308 92,270 84,230 C76,190 74,152 82,118 C90,84 108,62 140,55 C162,50 182,52 200,55Z"
              fill="url(#myocardium)" stroke="hsl(0, 28%, 30%)" strokeWidth="2" opacity="0.85" />

            {/* Epicardial fat streaks */}
            <path d="M320,100 C312,108 308,120 310,130" fill="none" stroke="hsl(40, 50%, 55%)" strokeWidth="3" opacity="0.15" strokeLinecap="round" />
            <path d="M84,230 C90,240 98,245 105,242" fill="none" stroke="hsl(40, 50%, 55%)" strokeWidth="3" opacity="0.15" strokeLinecap="round" />

            {/* ===== CHAMBERS (cut-away view) ===== */}
            {/* Right Atrium */}
            <path d="M260,90 C290,95 310,110 318,135 C326,160 322,180 310,190 C298,200 280,200 268,195 L260,90Z"
              fill="url(#bloodRA)" opacity="0.7" />
            {/* RA pectinate muscles */}
            <g opacity="0.15" stroke="hsl(220, 30%, 45%)" strokeWidth="1.5">
              <path d="M270,110 C280,115 290,118 298,118" />
              <path d="M268,125 C278,130 290,132 300,130" />
              <path d="M266,140 C276,145 288,147 298,145" />
              <path d="M265,155 C275,160 286,162 296,158" />
            </g>
            {/* Crista terminalis */}
            <path d="M268,92 C265,120 264,150 265,180 C265,190 266,195 268,195"
              fill="none" stroke="hsl(0, 25%, 38%)" strokeWidth="2" opacity="0.35" />

            {/* Left Atrium */}
            <path d="M118,90 C100,100 88,118 86,140 C84,162 92,180 106,190 C118,198 134,200 148,195 L118,90Z"
              fill="url(#bloodLA)" opacity="0.7" />

            {/* Interatrial septum */}
            <path d="M200,82 C198,105 196,130 195,155 C194,170 194,185 195,195"
              fill="none" stroke="hsl(0, 25%, 35%)" strokeWidth="4" opacity="0.5" />
            {/* Fossa ovalis */}
            <ellipse cx="198" cy="140" rx="8" ry="14" fill="none" stroke="hsl(0, 20%, 42%)" strokeWidth="1.2" opacity="0.3" strokeDasharray="2 1.5" />
            <text x="198" y="142" fontSize="4" fill="hsl(var(--muted-foreground))" textAnchor="middle" opacity="0.25">FO</text>

            {/* Right Ventricle */}
            <path d="M268,210 C290,218 315,240 330,270 C345,300 340,335 320,358 C305,375 280,385 255,388 C240,390 228,388 220,384 L210,210 Z"
              fill="url(#bloodRV)" opacity="0.7" />
            {/* RV trabeculae carneae */}
            <g opacity="0.12" stroke="hsl(220, 25%, 40%)" strokeWidth="1.8">
              <path d="M270,250 C280,265 285,280 282,295" />
              <path d="M285,240 C295,258 300,278 298,300" />
              <path d="M260,270 C268,285 272,305 270,325" />
              <path d="M300,260 C310,278 315,300 310,325" />
            </g>
            {/* Moderator band */}
            <path d="M240,340 C260,335 280,338 300,345" fill="none" stroke="hsl(0, 22%, 40%)" strokeWidth="2.5" opacity="0.3" />
            <text x="270" y="350" fontSize="4" fill="hsl(var(--muted-foreground))" textAnchor="middle" opacity="0.25">moderator band</text>

            {/* Interventricular septum (thick) */}
            <path d="M210,210 C208,240 205,275 202,310 C200,338 198,365 200,385"
              fill="none" stroke="url(#myocardiumLV)" strokeWidth="14" opacity="0.6" strokeLinecap="round" />
            <path d="M210,210 C208,240 205,275 202,310 C200,338 198,365 200,385"
              fill="none" stroke="hsl(0, 22%, 28%)" strokeWidth="1" opacity="0.3" />

            {/* Left Ventricle */}
            <path d="M148,210 C128,218 108,240 96,268 C84,296 82,330 92,355 C102,378 122,392 148,398 C168,402 185,400 200,392 L210,210 Z"
              fill="url(#bloodLV)" opacity="0.7" />
            {/* LV thick wall indicator */}
            <path d="M96,268 C84,296 82,330 92,355 C102,378 122,392 148,398"
              fill="none" stroke="url(#myocardiumLV)" strokeWidth="18" opacity="0.4" strokeLinecap="round" />
            {/* LV trabeculae */}
            <g opacity="0.12" stroke="hsl(0, 28%, 38%)" strokeWidth="1.8">
              <path d="M148,250 C138,268 132,288 130,310" />
              <path d="M138,260 C128,278 122,300 120,322" />
              <path d="M158,270 C148,290 142,312 140,335" />
            </g>

            {/* ===== AV GROOVE (fibrous skeleton) ===== */}
            <path d="M106,195 C130,205 160,210 195,210 C230,210 260,205 268,195"
              fill="none" stroke="hsl(40, 20%, 50%)" strokeWidth="3" opacity="0.2" />

            {/* ===== VALVES ===== */}
            {/* Mitral valve with leaflets */}
            <g className="cursor-pointer" onClick={click("mitral")}>
              <ellipse cx="160" cy="208" rx="20" ry="7"
                fill={structures.mitral.color} fillOpacity={isActive("mitral") ? 0.55 : 0.2}
                stroke={structures.mitral.color} strokeWidth={isActive("mitral") ? 2.5 : 1.2} />
              {/* Leaflet lines */}
              <path d="M145,208 C150,222 155,230 160,232 C165,230 170,222 175,208"
                fill="none" stroke={structures.mitral.color} strokeWidth={isActive("mitral") ? 1.5 : 0.8} opacity={isActive("mitral") ? 0.7 : 0.3} />
              {/* Chordae tendineae */}
              <g opacity={isActive("mitral") ? 0.5 : 0.15} stroke={structures.mitral.color} strokeWidth="0.7">
                <path d="M148,225 C145,250 140,280 135,310" />
                <path d="M155,230 C150,255 146,285 142,315" />
                <path d="M165,230 C168,255 170,285 170,315" />
                <path d="M172,225 C175,250 178,280 178,310" />
              </g>
              {/* Papillary muscles */}
              <ellipse cx="138" cy="318" rx="6" ry="10" fill="hsl(0, 30%, 38%)" opacity={isActive("mitral") ? 0.5 : 0.2} />
              <ellipse cx="174" cy="318" rx="6" ry="10" fill="hsl(0, 30%, 38%)" opacity={isActive("mitral") ? 0.5 : 0.2} />
              {isActive("mitral") && (
                <g className="animate-fade-in">
                  <text x="122" y="322" fontSize="4" fill={structures.mitral.color} opacity="0.7" textAnchor="end">AL pap.</text>
                  <text x="192" y="322" fontSize="4" fill={structures.mitral.color} opacity="0.7">PM pap.</text>
                  <text x="160" y="240" fontSize="4" fill={structures.mitral.color} opacity="0.6" textAnchor="middle">chordae</text>
                </g>
              )}
            </g>
            <text x="130" y="205" fontSize="6" fill={isActive("mitral") ? structures.mitral.color : "hsl(var(--muted-foreground))"} opacity={isActive("mitral") ? 1 : 0.5} fontWeight={isActive("mitral") ? "bold" : "normal"} textAnchor="end" className="cursor-pointer select-none" onClick={click("mitral")}>Mitral</text>

            {/* Tricuspid valve with leaflets */}
            <g className="cursor-pointer" onClick={click("tricuspid")}>
              <ellipse cx="245" cy="212" rx="20" ry="7"
                fill={structures.tricuspid.color} fillOpacity={isActive("tricuspid") ? 0.55 : 0.2}
                stroke={structures.tricuspid.color} strokeWidth={isActive("tricuspid") ? 2.5 : 1.2} />
              {/* Leaflet lines */}
              <path d="M230,212 C235,226 240,234 245,236 C250,234 255,226 260,212"
                fill="none" stroke={structures.tricuspid.color} strokeWidth={isActive("tricuspid") ? 1.5 : 0.8} opacity={isActive("tricuspid") ? 0.7 : 0.3} />
              {/* Chordae */}
              <g opacity={isActive("tricuspid") ? 0.4 : 0.12} stroke={structures.tricuspid.color} strokeWidth="0.7">
                <path d="M235,232 C240,260 242,290 240,315" />
                <path d="M255,232 C258,260 260,290 262,315" />
              </g>
              {/* RV papillary muscles */}
              <ellipse cx="240" cy="320" rx="5" ry="8" fill="hsl(0, 25%, 35%)" opacity={isActive("tricuspid") ? 0.45 : 0.15} />
              <ellipse cx="262" cy="320" rx="5" ry="8" fill="hsl(0, 25%, 35%)" opacity={isActive("tricuspid") ? 0.45 : 0.15} />
            </g>
            <text x="278" y="218" fontSize="6" fill={isActive("tricuspid") ? structures.tricuspid.color : "hsl(var(--muted-foreground))"} opacity={isActive("tricuspid") ? 1 : 0.5} fontWeight={isActive("tricuspid") ? "bold" : "normal"} className="cursor-pointer select-none" onClick={click("tricuspid")}>Tricuspid</text>

            {/* Aortic valve with cusps */}
            <g className="cursor-pointer" onClick={click("aortic")}>
              <ellipse cx="195" cy="75" rx="14" ry="7"
                fill={structures.aortic.color} fillOpacity={isActive("aortic") ? 0.6 : 0.2}
                stroke={structures.aortic.color} strokeWidth={isActive("aortic") ? 2.5 : 1.2} />
              {/* Three cusps */}
              {isActive("aortic") && (
                <g opacity="0.6" className="animate-fade-in">
                  <path d="M184,72 C188,78 192,80 195,78" fill="none" stroke={structures.aortic.color} strokeWidth="1" />
                  <path d="M195,78 C198,80 202,78 206,72" fill="none" stroke={structures.aortic.color} strokeWidth="1" />
                  <path d="M188,68 C192,64 198,64 202,68" fill="none" stroke={structures.aortic.color} strokeWidth="1" />
                  <text x="186" y="86" fontSize="4" fill={structures.aortic.color}>R</text>
                  <text x="194" y="86" fontSize="4" fill={structures.aortic.color}>L</text>
                  <text x="202" y="86" fontSize="4" fill={structures.aortic.color}>NC</text>
                </g>
              )}
              {/* Sinuses of Valsalva */}
              {isActive("aortic") && (
                <g className="animate-fade-in">
                  <text x="195" y="65" fontSize="4" fill={structures.aortic.color} opacity="0.5" textAnchor="middle">sinuses of Valsalva</text>
                </g>
              )}
            </g>
            <text x="218" y="72" fontSize="6" fill={isActive("aortic") ? structures.aortic.color : "hsl(var(--muted-foreground))"} opacity={isActive("aortic") ? 1 : 0.5} fontWeight={isActive("aortic") ? "bold" : "normal"} className="cursor-pointer select-none" onClick={click("aortic")}>Aortic</text>

            {/* Pulmonary valve */}
            <g className="cursor-pointer" onClick={click("pulmonary")}>
              <ellipse cx="155" cy="78" rx="12" ry="6"
                fill={structures.pulmonary.color} fillOpacity={isActive("pulmonary") ? 0.6 : 0.2}
                stroke={structures.pulmonary.color} strokeWidth={isActive("pulmonary") ? 2.5 : 1.2} />
              {isActive("pulmonary") && (
                <g opacity="0.5" className="animate-fade-in">
                  <path d="M146,76 C150,80 155,82 155,80" fill="none" stroke={structures.pulmonary.color} strokeWidth="1" />
                  <path d="M155,80 C155,82 160,80 164,76" fill="none" stroke={structures.pulmonary.color} strokeWidth="1" />
                </g>
              )}
            </g>
            <text x="135" y="72" fontSize="6" fill={isActive("pulmonary") ? structures.pulmonary.color : "hsl(var(--muted-foreground))"} opacity={isActive("pulmonary") ? 1 : 0.5} fontWeight={isActive("pulmonary") ? "bold" : "normal"} textAnchor="end" className="cursor-pointer select-none" onClick={click("pulmonary")}>Pulm.</text>

            {/* RVOT (infundibulum) */}
            <path d="M210,195 C200,170 185,140 170,110 C162,96 158,86 155,78"
              fill="none" stroke="hsl(0, 20%, 35%)" strokeWidth="2" opacity="0.15" strokeDasharray="3 2" />
            <text x="178" y="135" fontSize="4" fill="hsl(var(--muted-foreground))" opacity="0.2" transform="rotate(-55 178 135)">RVOT</text>

            {/* ===== CORONARY ARTERIES ===== */}
            {/* Left Main */}
            <path d="M188,68 C178,78 168,88 158,96"
              stroke={structures.lca.color} strokeWidth={isActive("lca") ? 4.5 : 2.8} fill="none"
              opacity={isActive("lca") ? 1 : 0.45} strokeLinecap="round"
              className="cursor-pointer transition-all duration-200" onClick={click("lca")} />
            <path d="M188,68 C178,78 168,88 158,96" stroke="transparent" strokeWidth="16" fill="none"
              className="cursor-pointer" onClick={click("lca")} />

            {/* LAD */}
            <path d="M158,96 C155,115 152,138 150,162 C148,188 148,218 150,250 C152,282 156,312 162,340 C166,358 172,375 180,390"
              stroke={structures.lad.color} strokeWidth={isActive("lad") ? 4.5 : 2.8} fill="none"
              opacity={isActive("lad") ? 1 : 0.45} strokeLinecap="round"
              className="cursor-pointer transition-all duration-200" onClick={click("lad")} />
            {/* LAD septal perforators */}
            {isActive("lad") && (
              <g opacity="0.5" className="animate-fade-in">
                {[165, 200, 235, 270, 305].map((y, i) => (
                  <line key={i} x1={150 + (y - 165) * 0.05} y1={y} x2={175} y2={y + 10} stroke={structures.lad.color} strokeWidth="1.2" strokeDasharray="2 2" />
                ))}
                <text x="180" y="235" fontSize="5" fill={structures.lad.color}>septals</text>
              </g>
            )}
            {/* LAD diagonal */}
            {isActive("lad") && (
              <g opacity="0.5" className="animate-fade-in">
                <path d="M152,180 C140,195 128,212 118,230" stroke={structures.lad.color} strokeWidth="1.2" strokeDasharray="2 2" fill="none" />
                <text x="112" y="235" fontSize="5" fill={structures.lad.color} textAnchor="end">D1</text>
                <path d="M152,230 C140,245 130,260 122,278" stroke={structures.lad.color} strokeWidth="1.2" strokeDasharray="2 2" fill="none" />
                <text x="116" y="282" fontSize="5" fill={structures.lad.color} textAnchor="end">D2</text>
              </g>
            )}
            <path d="M158,96 C155,115 152,138 150,162 C148,188 148,218 150,250 C152,282 156,312 162,340 C166,358 172,375 180,390"
              stroke="transparent" strokeWidth="16" fill="none" className="cursor-pointer" onClick={click("lad")} />

            {/* LCx */}
            <path d="M158,96 C145,105 132,118 122,134 C112,150 105,168 100,188 C95,208 94,228 98,248"
              stroke={structures.lcx.color} strokeWidth={isActive("lcx") ? 4.5 : 2.8} fill="none"
              opacity={isActive("lcx") ? 1 : 0.45} strokeLinecap="round"
              className="cursor-pointer transition-all duration-200" onClick={click("lcx")} />
            {/* OM branches */}
            {isActive("lcx") && (
              <g opacity="0.5" className="animate-fade-in">
                <path d="M112,150 C102,168 95,188 92,208" stroke={structures.lcx.color} strokeWidth="1.2" strokeDasharray="2 2" fill="none" />
                <text x="84" y="205" fontSize="5" fill={structures.lcx.color}>OM1</text>
                <path d="M100,200 C92,218 88,238 86,255" stroke={structures.lcx.color} strokeWidth="1.2" strokeDasharray="2 2" fill="none" />
                <text x="78" y="258" fontSize="5" fill={structures.lcx.color}>OM2</text>
              </g>
            )}
            <path d="M158,96 C145,105 132,118 122,134 C112,150 105,168 100,188 C95,208 94,228 98,248"
              stroke="transparent" strokeWidth="16" fill="none" className="cursor-pointer" onClick={click("lcx")} />

            {/* RCA */}
            <path d="M210,65 C225,72 242,85 255,102 C268,120 278,142 285,168 C292,194 292,222 285,248 C278,272 268,292 255,308"
              stroke={structures.rca.color} strokeWidth={isActive("rca") ? 4.5 : 2.8} fill="none"
              opacity={isActive("rca") ? 1 : 0.45} strokeLinecap="round"
              className="cursor-pointer transition-all duration-200" onClick={click("rca")} />
            {/* Acute marginal */}
            {isActive("rca") && (
              <g opacity="0.5" className="animate-fade-in">
                <path d="M288,185 C298,205 305,228 308,250" stroke={structures.rca.color} strokeWidth="1.2" strokeDasharray="2 2" fill="none" />
                <text x="312" y="235" fontSize="5" fill={structures.rca.color}>AM</text>
              </g>
            )}
            <path d="M210,65 C225,72 242,85 255,102 C268,120 278,142 285,168 C292,194 292,222 285,248 C278,272 268,292 255,308"
              stroke="transparent" strokeWidth="16" fill="none" className="cursor-pointer" onClick={click("rca")} />

            {/* PDA */}
            <path d="M255,308 C242,325 228,340 215,355 C205,365 198,378 195,390"
              stroke={structures.pda.color} strokeWidth={isActive("pda") ? 4.5 : 2.8} fill="none"
              opacity={isActive("pda") ? 1 : 0.45} strokeLinecap="round"
              className="cursor-pointer transition-all duration-200" onClick={click("pda")} />
            <path d="M255,308 C242,325 228,340 215,355 C205,365 198,378 195,390"
              stroke="transparent" strokeWidth="16" fill="none" className="cursor-pointer" onClick={click("pda")} />

            {/* Coronary labels */}
            <text x="165" y="92" fontSize="6.5" fill={isActive("lca") ? structures.lca.color : "hsl(var(--muted-foreground))"} fontWeight={isActive("lca") ? "bold" : "normal"} className="cursor-pointer select-none" onClick={click("lca")} textAnchor="end">LMCA</text>
            <text x="135" y="230" fontSize="6.5" fill={isActive("lad") ? structures.lad.color : "hsl(var(--muted-foreground))"} fontWeight={isActive("lad") ? "bold" : "normal"} className="cursor-pointer select-none" onClick={click("lad")} textAnchor="end">LAD</text>
            <text x="82" y="155" fontSize="6.5" fill={isActive("lcx") ? structures.lcx.color : "hsl(var(--muted-foreground))"} fontWeight={isActive("lcx") ? "bold" : "normal"} className="cursor-pointer select-none" onClick={click("lcx")} textAnchor="end">LCx</text>
            <text x="300" y="148" fontSize="6.5" fill={isActive("rca") ? structures.rca.color : "hsl(var(--muted-foreground))"} fontWeight={isActive("rca") ? "bold" : "normal"} className="cursor-pointer select-none" onClick={click("rca")}>RCA</text>
            <text x="262" y="340" fontSize="6.5" fill={isActive("pda") ? structures.pda.color : "hsl(var(--muted-foreground))"} fontWeight={isActive("pda") ? "bold" : "normal"} className="cursor-pointer select-none" onClick={click("pda")}>PDA</text>

            {/* ===== CONDUCTING SYSTEM ===== */}
            {/* SA node */}
            <circle cx="308" cy="82" r={isActive("sa-node") ? 7 : 5} fill={structures["sa-node"].color}
              fillOpacity={isActive("sa-node") ? 0.75 : 0.35} stroke={structures["sa-node"].color}
              strokeWidth={isActive("sa-node") ? 2.5 : 1.2}
              className="cursor-pointer transition-all duration-200" onClick={click("sa-node")} filter={isActive("sa-node") ? "url(#softGlow)" : undefined} />
            <text x="320" y="78" fontSize="6.5" fill={isActive("sa-node") ? structures["sa-node"].color : "hsl(var(--muted-foreground))"} fontWeight={isActive("sa-node") ? "bold" : "normal"} className="cursor-pointer select-none" onClick={click("sa-node")}>SA node</text>

            {/* Internodal pathways */}
            <path d="M308,88 C305,110 300,138 295,160 C290,175 285,188 280,195"
              stroke={structures["sa-node"].color} strokeWidth="1.2" strokeDasharray="3 2.5" fill="none"
              opacity={isActive("sa-node") || isActive("av-node") ? 0.55 : 0.15} />
            {isActive("sa-node") && (
              <text x="310" y="140" fontSize="4" fill={structures["sa-node"].color} opacity="0.5">internodal</text>
            )}

            {/* AV node */}
            <circle cx="275" cy="198" r={isActive("av-node") ? 7 : 5} fill={structures["av-node"].color}
              fillOpacity={isActive("av-node") ? 0.75 : 0.35} stroke={structures["av-node"].color}
              strokeWidth={isActive("av-node") ? 2.5 : 1.2}
              className="cursor-pointer transition-all duration-200" onClick={click("av-node")} filter={isActive("av-node") ? "url(#softGlow)" : undefined} />
            <text x="290" y="200" fontSize="6.5" fill={isActive("av-node") ? structures["av-node"].color : "hsl(var(--muted-foreground))"} fontWeight={isActive("av-node") ? "bold" : "normal"} className="cursor-pointer select-none" onClick={click("av-node")}>AV node</text>
            {isActive("av-node") && (
              <g className="animate-fade-in">
                <text x="285" y="210" fontSize="4" fill={structures["av-node"].color} opacity="0.5">△ of Koch</text>
              </g>
            )}

            {/* Bundle of His */}
            <path d="M275,204 C265,212 255,222 240,232"
              stroke={structures["bundle-his"].color} strokeWidth={isActive("bundle-his") ? 3.5 : 2} fill="none"
              opacity={isActive("bundle-his") ? 0.85 : 0.3} strokeLinecap="round"
              className="cursor-pointer transition-all duration-200" onClick={click("bundle-his")} />
            <path d="M275,204 C265,212 255,222 240,232" stroke="transparent" strokeWidth="14" fill="none"
              className="cursor-pointer" onClick={click("bundle-his")} />
            <text x="260" y="228" fontSize="5.5" fill={isActive("bundle-his") ? structures["bundle-his"].color : "hsl(var(--muted-foreground))"} className="cursor-pointer select-none" onClick={click("bundle-his")}>His</text>

            {/* Left bundle branch */}
            <path d="M240,232 C228,245 215,265 205,288 C195,312 188,338 185,365"
              stroke={structures["left-bundle"].color} strokeWidth={isActive("left-bundle") ? 3.5 : 2} fill="none"
              opacity={isActive("left-bundle") ? 0.85 : 0.3} strokeLinecap="round"
              className="cursor-pointer transition-all duration-200" onClick={click("left-bundle")} />
            {/* Fascicles */}
            {isActive("left-bundle") && (
              <g opacity="0.45" className="animate-fade-in">
                <path d="M218,260 C205,272 188,282 172,288" stroke={structures["left-bundle"].color} strokeWidth="1.2" strokeDasharray="2.5 2" fill="none" />
                <text x="164" y="288" fontSize="4.5" fill={structures["left-bundle"].color} textAnchor="end">ant. fascicle</text>
                <path d="M205,300 C192,318 182,335 175,352" stroke={structures["left-bundle"].color} strokeWidth="1.2" strokeDasharray="2.5 2" fill="none" />
                <text x="168" y="355" fontSize="4.5" fill={structures["left-bundle"].color} textAnchor="end">post. fascicle</text>
              </g>
            )}
            <path d="M240,232 C228,245 215,265 205,288 C195,312 188,338 185,365" stroke="transparent" strokeWidth="14" fill="none"
              className="cursor-pointer" onClick={click("left-bundle")} />
            <text x="180" y="340" fontSize="5.5" fill={isActive("left-bundle") ? structures["left-bundle"].color : "hsl(var(--muted-foreground))"} className="cursor-pointer select-none" onClick={click("left-bundle")} textAnchor="end">LBB</text>

            {/* Right bundle branch */}
            <path d="M240,232 C248,248 256,268 262,292 C268,316 270,342 270,365"
              stroke={structures["right-bundle"].color} strokeWidth={isActive("right-bundle") ? 3.5 : 2} fill="none"
              opacity={isActive("right-bundle") ? 0.85 : 0.3} strokeLinecap="round"
              className="cursor-pointer transition-all duration-200" onClick={click("right-bundle")} />
            <path d="M240,232 C248,248 256,268 262,292 C268,316 270,342 270,365" stroke="transparent" strokeWidth="14" fill="none"
              className="cursor-pointer" onClick={click("right-bundle")} />
            <text x="278" y="340" fontSize="5.5" fill={isActive("right-bundle") ? structures["right-bundle"].color : "hsl(var(--muted-foreground))"} className="cursor-pointer select-none" onClick={click("right-bundle")}>RBB</text>

            {/* Purkinje fibres */}
            {(isActive("purkinje") || isActive("left-bundle") || isActive("right-bundle")) && (
              <g opacity="0.45" className="animate-fade-in">
                {/* Left Purkinje network */}
                <path d="M185,365 C168,370 148,372 128,368" stroke={structures.purkinje.color} strokeWidth="1.2" fill="none" />
                <path d="M185,365 C180,375 175,385 168,392" stroke={structures.purkinje.color} strokeWidth="1.2" fill="none" />
                <path d="M185,365 C188,375 192,384 194,390" stroke={structures.purkinje.color} strokeWidth="1.2" fill="none" />
                <path d="M185,365 C172,368 158,376 148,382" stroke={structures.purkinje.color} strokeWidth="1" fill="none" />
                {/* Right Purkinje network */}
                <path d="M270,365 C282,370 296,372 308,368" stroke={structures.purkinje.color} strokeWidth="1.2" fill="none" />
                <path d="M270,365 C275,375 280,385 284,392" stroke={structures.purkinje.color} strokeWidth="1.2" fill="none" />
                <path d="M270,365 C265,375 260,384 256,390" stroke={structures.purkinje.color} strokeWidth="1.2" fill="none" />
                <path d="M270,365 C284,368 298,376 310,382" stroke={structures.purkinje.color} strokeWidth="1" fill="none" />
              </g>
            )}
            <circle cx="185" cy="368" r={isActive("purkinje") ? 6 : 4} fill={structures.purkinje.color}
              fillOpacity={isActive("purkinje") ? 0.55 : 0.18} stroke={structures.purkinje.color}
              strokeWidth={isActive("purkinje") ? 1.8 : 0.6}
              className="cursor-pointer transition-all duration-200" onClick={click("purkinje")} />
            <circle cx="270" cy="368" r={isActive("purkinje") ? 6 : 4} fill={structures.purkinje.color}
              fillOpacity={isActive("purkinje") ? 0.55 : 0.18} stroke={structures.purkinje.color}
              strokeWidth={isActive("purkinje") ? 1.8 : 0.6}
              className="cursor-pointer transition-all duration-200" onClick={click("purkinje")} />
            <text x="228" y="385" fontSize="6" textAnchor="middle" fill={isActive("purkinje") ? structures.purkinje.color : "hsl(var(--muted-foreground))"} className="cursor-pointer select-none" onClick={click("purkinje")}>Purkinje</text>

            {/* Chamber labels */}
            <g fontSize="9" fill="hsl(var(--muted-foreground))" opacity="0.22" fontWeight="bold" fontStyle="italic">
              <text x="285" y="148" textAnchor="middle">RA</text>
              <text x="128" y="148" textAnchor="middle">LA</text>
              <text x="270" y="290" textAnchor="middle">RV</text>
              <text x="155" y="290" textAnchor="middle">LV</text>
            </g>

            {/* LV wall thickness annotation */}
            <g opacity="0.2">
              <line x1="78" y1="300" x2="96" y2="300" stroke="hsl(var(--muted-foreground))" strokeWidth="0.8" markerEnd="url(#arrowhead)" />
              <text x="72" y="298" fontSize="4" fill="hsl(var(--muted-foreground))" textAnchor="end">LV wall</text>
              <text x="72" y="304" fontSize="4" fill="hsl(var(--muted-foreground))" textAnchor="end">12–15 mm</text>
            </g>
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
