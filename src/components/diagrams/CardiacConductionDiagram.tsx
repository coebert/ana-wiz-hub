import { useState } from "react";
import { DiagramToggleBar } from "./DiagramToggleBar";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * Anterior view of the cardiac conduction system:
 *   SA node → internodal tracts (+ Bachmann) → AV node →
 *   bundle of His → R/L bundle branches (+ L anterior/posterior fascicles) →
 *   Purkinje fibres.
 *
 * Each node carries its intrinsic rate, conduction velocity and clinical
 * relevance. Conforms to STYLE_GUIDE.md: DiagramToggleBar header, ccd-
 * prefixed defs, radial myocardial gradient, fibre patterns, drop-shadow,
 * compass labels, default selection, left-border detail panel keyed to
 * conduction tier, animated wavefront when "Conduction" toggle is on.
 */

type StructureKey =
  | "sa-node"
  | "bachmann"
  | "internodal"
  | "av-node"
  | "his"
  | "rbb"
  | "lbb"
  | "lafb"
  | "lpfb"
  | "purkinje-r"
  | "purkinje-l";

interface ConductionInfo {
  label: string;
  tier: "pacemaker" | "atrial" | "junction" | "trunk" | "branch" | "fascicle" | "terminal";
  rate?: string;       // intrinsic escape rate
  velocity: string;    // conduction velocity
  detail: string;
  clinical: string;
}

const TIER_COLOR: Record<ConductionInfo["tier"], string> = {
  pacemaker: "hsl(0, 70%, 55%)",     // red — primary pacemaker
  atrial:    "hsl(25, 70%, 55%)",    // amber — atrial conduction
  junction:  "hsl(45, 75%, 50%)",    // gold — AV junction
  trunk:     "hsl(140, 55%, 45%)",   // green — His
  branch:    "hsl(200, 60%, 50%)",   // blue — bundle branches
  fascicle:  "hsl(220, 55%, 55%)",   // indigo — fascicles
  terminal:  "hsl(280, 50%, 55%)",   // purple — Purkinje
};

const STRUCTURES: Record<StructureKey, ConductionInfo> = {
  "sa-node": {
    label: "SA node (sinoatrial)",
    tier: "pacemaker",
    rate: "60–100 /min",
    velocity: "0.05 m/s",
    detail: "Crescent-shaped cluster of pacemaker cells at the junction of SVC and right atrium, near the crista terminalis. Spontaneous phase-4 depolarisation via funny (If) Na+ current. Supplied by SA nodal artery (RCA in 60%, LCx in 40%).",
    clinical: "Primary pacemaker. Heavy parasympathetic (vagal) tone — atropine increases rate, beta-blockers slow it. Sick sinus syndrome → bradycardia, sinus pauses, tachy-brady. Vulnerable to ischaemia in proximal RCA occlusion.",
  },
  bachmann: {
    label: "Bachmann's bundle",
    tier: "atrial",
    velocity: "1.0–1.5 m/s",
    detail: "Preferential interatrial conduction pathway running anterosuperiorly from the SA node region across the interatrial septum to the left atrium. Synchronises right-to-left atrial activation.",
    clinical: "Disruption (atrial fibrosis, surgical scarring, AF ablation) → interatrial conduction delay → P-mitrale on ECG and increased risk of atrial fibrillation.",
  },
  internodal: {
    label: "Internodal tracts",
    tier: "atrial",
    velocity: "1.0 m/s",
    detail: "Three preferential conduction pathways from SA to AV node — anterior (Bachmann), middle (Wenckebach) and posterior (Thorel). Histologically not discrete bundles but functionally faster zones of atrial myocardium.",
    clinical: "Provide rapid SA→AV transit (~30 ms) so atrial systole completes before ventricular contraction. Atrial fibrillation disorganises this conduction → loss of atrial kick (15–25% of cardiac output).",
  },
  "av-node": {
    label: "AV node (atrioventricular)",
    tier: "junction",
    rate: "40–60 /min",
    velocity: "0.05 m/s (slow)",
    detail: "Sub-endocardial node in the triangle of Koch (bounded by tricuspid annulus, coronary sinus ostium and tendon of Todaro). Slow Ca2+-dependent conduction creates the AV delay (~100 ms) that allows ventricular filling.",
    clinical: "Supplied by AV nodal artery (RCA 90%, LCx 10%) — inferior MI → AV block. Decremental conduction protects ventricles in AF/flutter. Target for adenosine, BBs, CCBs and slow-pathway ablation in AVNRT.",
  },
  his: {
    label: "Bundle of His",
    tier: "trunk",
    rate: "40–60 /min",
    velocity: "1.0–4.0 m/s",
    detail: "Penetrating bundle that pierces the central fibrous body and runs along the membranous interventricular septum. Only normal electrical connection between atria and ventricles. ~15 mm long before bifurcation.",
    clinical: "His-bundle pacing preserves physiological ventricular activation. Damage during aortic/mitral valve surgery or septal myectomy → complete heart block. Infranodal block (His or below) is wide-QRS and unstable.",
  },
  rbb: {
    label: "Right bundle branch",
    tier: "branch",
    velocity: "2–4 m/s",
    detail: "Single, long, thin cord running sub-endocardially down the right side of the interventricular septum to the moderator band, then to the RV anterior papillary muscle and apex.",
    clinical: "RBBB: rSR' (M-shape) in V1, wide S in I/V6, QRS ≥120 ms. Common after right heart catheterisation, congenital (10% of population, often benign), or with PE / RV strain. New RBBB + LAFB after anterior MI → high risk of complete AV block.",
  },
  lbb: {
    label: "Left bundle branch (main)",
    tier: "branch",
    velocity: "2–4 m/s",
    detail: "Short common stem (~10 mm) on left side of interventricular septum that fans into anterior and posterior fascicles, with a smaller septal branch to the mid-septum.",
    clinical: "LBBB: broad notched R in I/V6, deep wide S in V1, QRS ≥120 ms. Almost always pathological — IHD, hypertensive heart disease, dilated cardiomyopathy, aortic stenosis. New LBBB with chest pain = STEMI equivalent (Sgarbossa criteria). CRT candidate when LVEF ≤35%.",
  },
  lafb: {
    label: "Left anterior fascicle",
    tier: "fascicle",
    velocity: "2–3 m/s",
    detail: "Thin, long fascicle to the anterosuperior LV (anterior papillary muscle, anterolateral wall). Single blood supply (LAD septals) → vulnerable.",
    clinical: "LAFB: left axis deviation (-45° to -90°), qR in I/aVL, rS in II/III/aVF. Most common conduction abnormality (4% of population). Suggests underlying CAD when new.",
  },
  lpfb: {
    label: "Left posterior fascicle",
    tier: "fascicle",
    velocity: "2–3 m/s",
    detail: "Short, broad, fan-shaped fascicle to the inferoposterior LV (posterior papillary muscle). Dual blood supply (LAD + RCA) — relatively protected.",
    clinical: "LPFB: right axis deviation (+90° to +180°), rS in I/aVL, qR in II/III/aVF — diagnosis of exclusion (rule out RVH, lateral MI, vertical heart). Isolated LPFB is rare; suggests significant disease.",
  },
  "purkinje-r": {
    label: "Purkinje fibres (RV)",
    tier: "terminal",
    rate: "20–40 /min",
    velocity: "2–4 m/s",
    detail: "Sub-endocardial network spreading the depolarising wave from the moderator band across the RV free wall. Activate myocardium endocardium-to-epicardium and apex-to-base.",
    clinical: "Idioventricular escape rhythm if all supraventricular pacemakers fail — slow (20–40), wide-complex, unstable. Target for catheter ablation in idiopathic RVOT VT.",
  },
  "purkinje-l": {
    label: "Purkinje fibres (LV)",
    tier: "terminal",
    rate: "20–40 /min",
    velocity: "2–4 m/s",
    detail: "Dense sub-endocardial network across the LV. Sequential activation: septum (L→R) → apex → free walls → posterobasal. Total ventricular activation ~80 ms.",
    clinical: "Site of fascicular VT (verapamil-sensitive, narrow QRS with RBBB+LAH morphology) — ablated at left posterior Purkinje network. Loss of normal Purkinje activation in LBBB → dyssynchrony, target for CRT.",
  },
};

const ORDER: StructureKey[] = [
  "sa-node", "bachmann", "internodal", "av-node", "his",
  "rbb", "lbb", "lafb", "lpfb", "purkinje-r", "purkinje-l",
];

const CardiacConductionDiagram = () => {
  const [selected, setSelected] = useState<StructureKey>("sa-node");
  const [showSutures, setShowSutures] = useState(true); // chamber outlines / valves / septum line
  const [showLabels, setShowLabels] = useState(true);
  const [showWave, setShowWave] = useState(true); // animated conduction wavefront

  const info = STRUCTURES[selected];
  const accent = TIER_COLOR[info.tier];

  const opa = (k: StructureKey, on: number, off: number) => (selected === k ? on : off);
  const sw = (k: StructureKey, on: number, off: number) => (selected === k ? on : off);

  return (
    <div className="my-6 space-y-4">
      <div className="bg-muted/30 rounded-xl border border-border p-4">
        <DiagramToggleBar
          title="Cardiac conduction system — anterior view"
          subtitle="Tap any node, bundle or fibre network to see intrinsic rate and clinical relevance"
          toggles={[
            { label: "Sutures", active: showSutures, onChange: () => setShowSutures((s) => !s) },
            { label: "Labels", active: showLabels, onChange: () => setShowLabels((s) => !s) },
            { label: "Conduction", active: showWave, onChange: () => setShowWave((s) => !s) },
          ]}
        />

        <div className="flex justify-center">
          <svg
            viewBox="0 0 600 470"
            className="w-full max-w-2xl h-auto"
            role="img"
            aria-label="Anterior diagram of the cardiac conduction system from SA node to Purkinje fibres"
          >
            <defs>
              {/* Myocardial depth gradient */}
              <radialGradient id="ccd-myoShade" cx="50%" cy="55%" r="60%">
                <stop offset="0%" stopColor="hsl(var(--anatomy))" stopOpacity="0.20" />
                <stop offset="100%" stopColor="hsl(var(--anatomy))" stopOpacity="0.05" />
              </radialGradient>

              {/* Atrial myocardium — fine fibre pattern */}
              <pattern id="ccd-atrialFibre" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(40)">
                <line x1="0" y1="3" x2="6" y2="3" stroke="hsl(0, 30%, 50%)" strokeWidth="0.5" opacity="0.30" />
              </pattern>

              {/* Ventricular myocardium — denser muscle fibre */}
              <pattern id="ccd-ventFibre" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(-25)">
                <line x1="0" y1="3" x2="6" y2="3" stroke="hsl(0, 35%, 45%)" strokeWidth="0.5" opacity="0.32" />
              </pattern>

              {/* Endocardial Purkinje stipple */}
              <pattern id="ccd-purkinje" patternUnits="userSpaceOnUse" width="8" height="8">
                <circle cx="2" cy="2" r="0.7" fill="hsl(280, 50%, 55%)" opacity="0.55" />
                <circle cx="6" cy="6" r="0.5" fill="hsl(280, 50%, 60%)" opacity="0.45" />
              </pattern>

              {/* Drop shadow for heart silhouette */}
              <filter id="ccd-vaultShadow" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
                <feOffset dx="0" dy="2" result="off" />
                <feComponentTransfer><feFuncA type="linear" slope="0.30" /></feComponentTransfer>
                <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>

              {/* Pulse halo for SA node animation */}
              <radialGradient id="ccd-pulse" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="hsl(0, 70%, 55%)" stopOpacity="0.65" />
                <stop offset="100%" stopColor="hsl(0, 70%, 55%)" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Compass */}
            <text x="300" y="14" textAnchor="middle"
              className="text-[9px] fill-muted-foreground font-medium">SUPERIOR (base)</text>
            <text x="300" y="464" textAnchor="middle"
              className="text-[9px] fill-muted-foreground font-medium">INFERIOR (apex)</text>
            <text x="10" y="240" className="text-[9px] fill-muted-foreground font-medium">RIGHT</text>
            <text x="590" y="240" textAnchor="end" className="text-[9px] fill-muted-foreground font-medium">LEFT</text>

            {/* Midline septum reference */}
            {showSutures && (
              <line x1="300" y1="60" x2="300" y2="430"
                stroke="hsl(var(--muted-foreground))" strokeDasharray="2 4" opacity="0.30" />
            )}

            {/* ───── HEART SILHOUETTE ───── */}
            {/* Whole heart outline */}
            <path
              d="M300,70
                 C220,70 130,95 110,180
                 C95,250 130,340 200,400
                 C240,432 290,440 300,440
                 C310,440 360,432 400,400
                 C470,340 505,250 490,180
                 C470,95 380,70 300,70 Z"
              fill="url(#ccd-myoShade)"
              stroke="hsl(var(--anatomy))" strokeWidth="1.5"
              filter="url(#ccd-vaultShadow)"
            />

            {/* Right atrium (your right = patient's right = LEFT of viewer) */}
            <path
              d="M300,75 C235,75 165,95 145,150 C140,170 145,195 165,205 L300,205 Z"
              fill="hsl(0, 35%, 65%)" fillOpacity="0.18"
              stroke="hsl(0, 30%, 45%)" strokeWidth="0.75" opacity="0.85"
            />
            <path d="M300,75 C235,75 165,95 145,150 C140,170 145,195 165,205 L300,205 Z"
              fill="url(#ccd-atrialFibre)" pointerEvents="none" />

            {/* Left atrium */}
            <path
              d="M300,75 C365,75 435,95 455,150 C460,170 455,195 435,205 L300,205 Z"
              fill="hsl(0, 35%, 65%)" fillOpacity="0.22"
              stroke="hsl(0, 30%, 45%)" strokeWidth="0.75" opacity="0.85"
            />
            <path d="M300,75 C365,75 435,95 455,150 C460,170 455,195 435,205 L300,205 Z"
              fill="url(#ccd-atrialFibre)" pointerEvents="none" />

            {/* SVC stub */}
            {showSutures && (
              <>
                <path d="M210,40 L210,80 L240,90 L240,40 Z"
                  fill="hsl(220, 45%, 55%)" opacity="0.25"
                  stroke="hsl(220, 40%, 45%)" strokeWidth="0.75" />
                {showLabels && (
                  <text x="225" y="36" textAnchor="middle"
                    className="text-[8px] fill-muted-foreground italic pointer-events-none">SVC</text>
                )}
              </>
            )}

            {/* Right ventricle */}
            <path
              d="M165,205 L300,205 L300,420 C260,425 220,400 195,365 C170,330 158,275 165,205 Z"
              fill="hsl(0, 40%, 55%)" fillOpacity="0.20"
              stroke="hsl(0, 35%, 40%)" strokeWidth="0.75"
            />
            <path d="M165,205 L300,205 L300,420 C260,425 220,400 195,365 C170,330 158,275 165,205 Z"
              fill="url(#ccd-ventFibre)" pointerEvents="none" />

            {/* Left ventricle (thicker wall) */}
            <path
              d="M435,205 L300,205 L300,420 C340,425 380,400 405,365 C430,330 442,275 435,205 Z"
              fill="hsl(0, 45%, 50%)" fillOpacity="0.26"
              stroke="hsl(0, 40%, 35%)" strokeWidth="0.75"
            />
            <path d="M435,205 L300,205 L300,420 C340,425 380,400 405,365 C430,330 442,275 435,205 Z"
              fill="url(#ccd-ventFibre)" pointerEvents="none" />

            {/* AV valve plane (fibrous skeleton) */}
            {showSutures && (
              <line x1="155" y1="205" x2="445" y2="205"
                stroke="hsl(var(--foreground))" strokeWidth="1.5" opacity="0.45" strokeDasharray="6 3" />
            )}

            {showLabels && (
              <g className="text-[9px] fill-muted-foreground italic pointer-events-none">
                <text x="155" y="155">RA</text>
                <text x="438" y="155" textAnchor="end">LA</text>
                <text x="180" y="320">RV</text>
                <text x="420" y="320" textAnchor="end">LV</text>
                <text x="305" y="200" className="text-[7.5px]">fibrous skeleton</text>
              </g>
            )}

            {/* ═══════════ CONDUCTION SYSTEM ═══════════ */}

            {/* ── Bachmann's bundle (atrial roof, RA → LA) ── */}
            <g onClick={() => setSelected("bachmann")} className="cursor-pointer">
              <path d="M225,118 Q260,100 300,100 Q340,100 380,118"
                fill="none" stroke={TIER_COLOR.atrial}
                strokeWidth={sw("bachmann", 3.2, 2.0)}
                opacity={opa("bachmann", 1, 0.55)} strokeLinecap="round" />
              {showLabels && (
                <text x="300" y="92" textAnchor="middle"
                  className="text-[8px] fill-foreground pointer-events-none">Bachmann</text>
              )}
            </g>

            {/* ── Internodal tracts (RA from SA → AV) ── */}
            <g onClick={() => setSelected("internodal")} className="cursor-pointer">
              <path d="M225,120 C220,140 230,165 270,200"
                fill="none" stroke={TIER_COLOR.atrial}
                strokeWidth={sw("internodal", 2.6, 1.6)}
                opacity={opa("internodal", 1, 0.55)} strokeDasharray="4 2" strokeLinecap="round" />
              <path d="M232,120 C238,150 252,180 275,202"
                fill="none" stroke={TIER_COLOR.atrial}
                strokeWidth={sw("internodal", 2.2, 1.4)}
                opacity={opa("internodal", 1, 0.50)} strokeDasharray="4 2" strokeLinecap="round" />
              <path d="M240,118 C260,160 268,190 280,202"
                fill="none" stroke={TIER_COLOR.atrial}
                strokeWidth={sw("internodal", 2.0, 1.3)}
                opacity={opa("internodal", 1, 0.48)} strokeDasharray="4 2" strokeLinecap="round" />
              {showLabels && (
                <text x="218" y="170" textAnchor="end"
                  className="text-[8px] fill-foreground pointer-events-none">Internodal tracts</text>
              )}
            </g>

            {/* ── SA node ── */}
            <g onClick={() => setSelected("sa-node")} className="cursor-pointer">
              {showWave && (
                <circle cx="225" cy="115" r="20" fill="url(#ccd-pulse)">
                  <animate attributeName="r" values="8;26;8" dur="1.0s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.7;0;0.7" dur="1.0s" repeatCount="indefinite" />
                </circle>
              )}
              <ellipse cx="225" cy="115" rx="11" ry="6"
                fill={TIER_COLOR.pacemaker}
                fillOpacity={opa("sa-node", 1, 0.85)}
                stroke="hsl(0, 70%, 35%)" strokeWidth={sw("sa-node", 2, 1.2)}
                transform="rotate(-25 225 115)" />
              {showLabels && (
                <text x="195" y="108" textAnchor="end"
                  className="text-[9px] fill-foreground font-semibold pointer-events-none">SA node</text>
              )}
            </g>

            {/* ── AV node ── */}
            <g onClick={() => setSelected("av-node")} className="cursor-pointer">
              {showWave && (
                <circle cx="285" cy="200" r="16" fill={TIER_COLOR.junction} opacity="0.4">
                  <animate attributeName="r" values="6;18;6" dur="1.0s" begin="0.15s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.55;0;0.55" dur="1.0s" begin="0.15s" repeatCount="indefinite" />
                </circle>
              )}
              <ellipse cx="285" cy="200" rx="9" ry="6"
                fill={TIER_COLOR.junction}
                fillOpacity={opa("av-node", 1, 0.85)}
                stroke="hsl(45, 75%, 30%)" strokeWidth={sw("av-node", 2, 1.2)} />
              {showLabels && (
                <text x="270" y="195" textAnchor="end"
                  className="text-[9px] fill-foreground font-semibold pointer-events-none">AV node</text>
              )}
            </g>

            {/* ── Bundle of His ── */}
            <g onClick={() => setSelected("his")} className="cursor-pointer">
              <line x1="290" y1="206" x2="298" y2="240"
                stroke={TIER_COLOR.trunk}
                strokeWidth={sw("his", 4, 2.6)}
                opacity={opa("his", 1, 0.7)} strokeLinecap="round" />
              {showLabels && (
                <text x="312" y="225"
                  className="text-[8px] fill-foreground pointer-events-none">Bundle of His</text>
              )}
            </g>

            {/* ── Right bundle branch ── */}
            <g onClick={() => setSelected("rbb")} className="cursor-pointer">
              <path d="M298,240 C275,265 245,295 230,365 C228,378 232,388 245,395"
                fill="none" stroke={TIER_COLOR.branch}
                strokeWidth={sw("rbb", 3, 1.8)}
                opacity={opa("rbb", 1, 0.65)} strokeLinecap="round" />
              {showLabels && (
                <text x="216" y="290" textAnchor="end"
                  className="text-[8px] fill-foreground pointer-events-none">RBB</text>
              )}
            </g>

            {/* ── Left bundle branch (main stem) ── */}
            <g onClick={() => setSelected("lbb")} className="cursor-pointer">
              <line x1="298" y1="240" x2="320" y2="260"
                stroke={TIER_COLOR.branch}
                strokeWidth={sw("lbb", 4, 2.4)}
                opacity={opa("lbb", 1, 0.7)} strokeLinecap="round" />
              {showLabels && (
                <text x="335" y="252"
                  className="text-[8px] fill-foreground pointer-events-none">LBB</text>
              )}
            </g>

            {/* ── Left anterior fascicle ── */}
            <g onClick={() => setSelected("lafb")} className="cursor-pointer">
              <path d="M320,260 C340,275 365,290 390,310"
                fill="none" stroke={TIER_COLOR.fascicle}
                strokeWidth={sw("lafb", 2.6, 1.5)}
                opacity={opa("lafb", 1, 0.6)} strokeLinecap="round" />
              {showLabels && (
                <text x="395" y="305"
                  className="text-[8px] fill-foreground pointer-events-none">LAF</text>
              )}
            </g>

            {/* ── Left posterior fascicle ── */}
            <g onClick={() => setSelected("lpfb")} className="cursor-pointer">
              <path d="M320,260 C345,290 370,335 385,380"
                fill="none" stroke={TIER_COLOR.fascicle}
                strokeWidth={sw("lpfb", 2.6, 1.5)}
                opacity={opa("lpfb", 1, 0.6)} strokeLinecap="round" />
              {showLabels && (
                <text x="395" y="365"
                  className="text-[8px] fill-foreground pointer-events-none">LPF</text>
              )}
            </g>

            {/* ── Purkinje fibres (RV) ── */}
            <g onClick={() => setSelected("purkinje-r")} className="cursor-pointer">
              <path d="M210,395 C190,400 195,410 220,415 M225,395 C215,408 230,418 250,415 M240,395 C235,410 252,420 268,418"
                fill="none" stroke={TIER_COLOR.terminal}
                strokeWidth={sw("purkinje-r", 1.6, 1.0)}
                opacity={opa("purkinje-r", 1, 0.7)} strokeLinecap="round" />
              {/* End-twigs */}
              {[210, 225, 240, 255, 270].map((x, i) => (
                <circle key={`pr-${i}`} cx={x} cy={415 + (i % 2) * 4} r="1.2"
                  fill={TIER_COLOR.terminal} opacity={opa("purkinje-r", 1, 0.7)} />
              ))}
              {showLabels && (
                <text x="180" y="425" textAnchor="end"
                  className="text-[8px] fill-foreground pointer-events-none">Purkinje (RV)</text>
              )}
            </g>

            {/* ── Purkinje fibres (LV) ── */}
            <g onClick={() => setSelected("purkinje-l")} className="cursor-pointer">
              <path d="M395,310 C405,318 400,330 388,335 M390,328 C402,338 398,350 385,355 M385,355 C400,365 392,378 380,382 M380,382 C395,395 380,410 360,412"
                fill="none" stroke={TIER_COLOR.terminal}
                strokeWidth={sw("purkinje-l", 1.6, 1.0)}
                opacity={opa("purkinje-l", 1, 0.7)} strokeLinecap="round" />
              {[388, 385, 380, 372, 360].map((x, i) => (
                <circle key={`pl-${i}`} cx={x} cy={335 + i * 18} r="1.2"
                  fill={TIER_COLOR.terminal} opacity={opa("purkinje-l", 1, 0.7)} />
              ))}
              {showLabels && (
                <text x="420" y="380"
                  className="text-[8px] fill-foreground pointer-events-none">Purkinje (LV)</text>
              )}
            </g>
          </svg>
        </div>

        {/* Mnemonic / footer */}
        <p className="text-xs text-center text-muted-foreground mt-2 italic">
          <span className="font-semibold not-italic text-foreground">SA → AV → His → BB → Purkinje. </span>
          Intrinsic rates fall down the hierarchy: 60–100 → 40–60 → 20–40.
        </p>

        {/* Detail panel */}
        <div className="mt-4 min-h-[110px]">
          <div
            className="p-3 rounded-lg border border-border bg-background/80 space-y-1.5"
            style={{ borderLeftWidth: 4, borderLeftColor: accent }}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="font-semibold text-foreground text-sm">{info.label}</p>
              <span
                className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded-md"
                style={{ background: `${accent}26`, color: accent }}
              >
                {info.tier}
              </span>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-xs text-muted-foreground">
              {info.rate && (
                <span><span className="font-medium text-foreground">Intrinsic rate:</span> {info.rate}</span>
              )}
              <span><span className="font-medium text-foreground">Velocity:</span> {info.velocity}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Anatomy:</span> {info.detail}
            </p>
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Clinical:</span> {info.clinical}
            </p>
          </div>
        </div>

        {/* Chip row */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {ORDER.map((k) => {
            const s = STRUCTURES[k];
            const c = TIER_COLOR[s.tier];
            const active = selected === k;
            return (
    <DiagramFigure
      id="cardiac-conduction-diagram"
      title="Cardiac conduction"
      description="Auto-generated wrapper for the Cardiac conduction anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
                    <button
                  key={k}
                  type="button"
                  onClick={() => setSelected(k)}
                  className="text-[11px] px-2 py-0.5 rounded-full border transition-colors"
                  style={{
                    borderColor: active ? c : "hsl(var(--border))",
                    background: active ? `${c}1F` : "transparent",
                    color: active ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
                  }}
                >
                  {s.label}
                </button>
    </DiagramFigure>
  );
          })}
        </div>
      </div>
    </div>
  );
};

export default CardiacConductionDiagram;
