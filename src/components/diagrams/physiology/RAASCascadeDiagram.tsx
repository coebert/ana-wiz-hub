import { useState } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

type NodeId = "angiotensinogen" | "renin" | "ang1" | "ace" | "ang2" | "at1" | "at2" | "aldosterone" | "adh" | "acei" | "arb" | "dri" | "mra";

interface CascadeNode {
  id: NodeId;
  label: string;
  category: "substrate" | "enzyme" | "effector" | "drug";
  color: string;
  description: string;
  detail: string;
}

const nodes: CascadeNode[] = [
  {
    id: "angiotensinogen", label: "Angiotensinogen", category: "substrate", color: "hsl(30 50% 50%)",
    description: "α₂-globulin produced constitutively by the liver (452 amino acids). Plasma levels increase with oestrogens, corticosteroids, thyroid hormone, and ANG II itself. The rate-limiting step in RAAS is renin activity, not angiotensinogen concentration — except in pregnancy where elevated levels contribute to increased ANG II.",
    detail: "Hepatic synthesis is upregulated by ANG II (positive feedback on substrate), glucocorticoids, oestrogen (explains ↑BP with OCP), and inflammation (acute phase reactant). Plasma concentration ≈ 1 μmol/L.",
  },
  {
    id: "renin", label: "Renin", category: "enzyme", color: "hsl(260 55% 55%)",
    description: "Aspartyl protease released from JG cells of the afferent arteriole. Cleaves angiotensinogen → angiotensin I (removes 10 AA from N-terminus). Half-life ≈ 15 min. Three stimuli: (1) ↓renal perfusion pressure (baroreceptor), (2) ↓NaCl at macula densa (TGF), (3) sympathetic β₁ stimulation.",
    detail: "Inhibited by: ANG II (short-loop negative feedback), ANP, high perfusion pressure, β-blockers. Prorenin (inactive) is also released and may have independent tissue effects via the (pro)renin receptor.",
  },
  {
    id: "ang1", label: "Angiotensin I", category: "substrate", color: "hsl(270 45% 50%)",
    description: "Decapeptide with minimal biological activity. Serves as substrate for ACE. Also converted to ANG-(1-9) by ACE2 — an alternative pathway that produces vasodilatory peptides. Circulating half-life < 1 min.",
    detail: "ANG I can also be converted to ANG II by chymase (mast cells, heart, vasculature) — this ACE-independent pathway explains why ACEi do not completely suppress ANG II production, especially in tissue RAAS.",
  },
  {
    id: "ace", label: "ACE", category: "enzyme", color: "hsl(0 50% 50%)",
    description: "Angiotensin-converting enzyme (kininase II). Zinc metallopeptidase found on pulmonary vascular endothelium (major site), renal endothelium, and in plasma. Removes 2 C-terminal amino acids from ANG I → ANG II. Also degrades bradykinin → inactive fragments.",
    detail: "Dual action: produces vasoconstrictor (ANG II) AND destroys vasodilator (bradykinin). ACE inhibition → ↑bradykinin → vasodilation, ↑PGI₂, but also → cough (10-15%) and angioedema (0.1-0.5%). ACE2 is a different enzyme — receptor for SARS-CoV-2.",
  },
  {
    id: "ang2", label: "Angiotensin II", category: "effector", color: "hsl(0 60% 50%)",
    description: "Octapeptide — the primary effector of RAAS. Acts on AT₁ and AT₂ receptors. Half-life ≈ 30 seconds (rapidly degraded by aminopeptidases to ANG III and ANG IV). Tissue RAAS (heart, kidney, brain, adrenals) may be more important than circulating RAAS.",
    detail: "Metabolised to ANG III (des-Asp¹-ANG II) which stimulates aldosterone release, and ANG IV which acts on AT₄ receptors (IRAP) in the brain. ANG-(1-7) produced by ACE2 from ANG II → Mas receptor → vasodilation (counter-regulatory).",
  },
  {
    id: "at1", label: "AT₁ Receptor Effects", category: "effector", color: "hsl(0 55% 48%)",
    description: "Gq-coupled GPCR → PLC → IP₃/DAG → ↑[Ca²⁺]ᵢ. Effects: (1) Vasoconstriction (systemic + efferent arteriole), (2) Aldosterone secretion (zona glomerulosa), (3) ADH release (posterior pituitary), (4) Thirst & salt appetite (SFO, OVLT), (5) Proximal tubular Na⁺/HCO₃⁻ reabsorption, (6) Cardiac/vascular hypertrophy, (7) SNS facilitation.",
    detail: "AT₁ mediates almost all pathological effects. Chronic activation → cardiac fibrosis, vascular remodelling, glomerulosclerosis. Blocked by ARBs (losartan, candesartan, valsartan). Unblocking AT₁ shunts ANG II to AT₂ → may enhance counter-regulatory vasodilation.",
  },
  {
    id: "at2", label: "AT₂ Receptor Effects", category: "effector", color: "hsl(210 50% 50%)",
    description: "Counter-regulatory receptor. Gi-coupled, also activates phosphatases. Effects: vasodilation (NO, bradykinin), anti-proliferation, anti-fibrosis, apoptosis. Highly expressed in foetal tissues, downregulated in adults except in brain, adrenal medulla, uterus, and ovary. Re-expressed after tissue injury.",
    detail: "Clinical relevance: ARBs block AT₁ → more ANG II available for AT₂ → additional vasodilation and cardioprotection. This may contribute to the benefit of ARBs beyond simple AT₁ blockade. AT₂ agonists (compound 21) are in clinical trials for fibrotic diseases.",
  },
  {
    id: "aldosterone", label: "Aldosterone", category: "effector", color: "hsl(45 60% 48%)",
    description: "Mineralocorticoid produced by zona glomerulosa of adrenal cortex. Acts on MR (mineralocorticoid receptor) in principal cells of collecting duct → ↑ENaC expression → Na⁺ reabsorption, K⁺ secretion. Also ↑Na⁺/K⁺-ATPase activity. Onset 1-2 hours (genomic, requires protein synthesis).",
    detail: "Non-genomic effects: cardiac fibrosis, vascular inflammation, endothelial dysfunction. Aldosterone escape: Na⁺ retention is self-limiting due to ANP and pressure natriuresis, but fibrotic effects persist. MRA (spironolactone, eplerenone) reduce mortality in HFrEF (RALES, EMPHASIS-HF).",
  },
  {
    id: "adh", label: "ADH (Vasopressin)", category: "effector", color: "hsl(200 50% 48%)",
    description: "Released from posterior pituitary. ANG II stimulates ADH release via SFO (subfornical organ). V₁ receptors → vascular smooth muscle constriction. V₂ receptors → collecting duct → AQP2 insertion → water reabsorption. V₃ (V₁b) → anterior pituitary → ACTH release.",
    detail: "Terlipressin (V₁ agonist): hepatorenal syndrome, variceal bleeding. Desmopressin (V₂ agonist): diabetes insipidus, von Willebrand disease. Conivaptan (V₁a/V₂ antagonist), tolvaptan (V₂ antagonist): SIADH, hyponatraemia.",
  },
  {
    id: "acei", label: "ACE Inhibitors", category: "drug", color: "hsl(150 55% 40%)",
    description: "Block ACE → ↓ANG II production + ↓bradykinin degradation. Examples: ramipril, enalapril, lisinopril, perindopril. Reduce preload, afterload, and aldosterone. Renoprotective in diabetic nephropathy (↓efferent tone → ↓intraglomerular pressure → ↓proteinuria).",
    detail: "Side effects: cough (↑bradykinin, 10-15%), angioedema (0.1-0.5%), hyperkalaemia (↓aldosterone), first-dose hypotension, teratogenic (2nd/3rd trimester → renal agenesis). Contraindicated in bilateral RAS. Do not combine with ARB + MRA ('triple blockade' → hyperkalaemia, ↓GFR — ONTARGET, VA NEPHRON-D).",
  },
  {
    id: "arb", label: "ARBs", category: "drug", color: "hsl(180 50% 40%)",
    description: "Selective AT₁ receptor antagonists. Examples: losartan, candesartan, valsartan, irbesartan. Block AT₁ effects without affecting bradykinin metabolism → no cough. ANG II still produced → shunted to AT₂ → potential additional benefit (vasodilation, anti-fibrosis).",
    detail: "Losartan has unique uricosuric effect. Candesartan has highest AT₁ binding affinity. Indications similar to ACEi: hypertension, HF, diabetic nephropathy, post-MI. First-line if ACEi-intolerant (cough/angioedema). CHARM, Val-HeFT, LIFE trials.",
  },
  {
    id: "dri", label: "Direct Renin Inhibitors", category: "drug", color: "hsl(90 45% 40%)",
    description: "Aliskiren: binds active site of renin → prevents angiotensinogen → ANG I conversion. Blocks RAAS at the rate-limiting step. Oral bioavailability ~3%. Half-life 24h. Reduces PRA (plasma renin activity) unlike ACEi/ARB which increase it.",
    detail: "ALTITUDE trial: aliskiren + ACEi/ARB in diabetic nephropathy → ↑hyperkalaemia, ↑hypotension, ↑renal events → combination contraindicated. Limited clinical use as monotherapy. Theoretical advantage: blocks reactive rise in renin that occurs with ACEi/ARB.",
  },
  {
    id: "mra", label: "MR Antagonists", category: "drug", color: "hsl(320 50% 45%)",
    description: "Block mineralocorticoid receptor in collecting duct → ↓Na⁺ reabsorption, ↓K⁺ secretion (K⁺-sparing diuretic). Spironolactone (non-selective, also blocks androgen/progesterone receptors → gynaecomastia). Eplerenone (selective MR antagonist, fewer endocrine side effects). Finerenone (non-steroidal MRA).",
    detail: "Landmark trials: RALES (spironolactone in severe HF, 30% mortality reduction), EPHESUS (eplerenone post-MI), EMPHASIS-HF (eplerenone in mild HF), FIDELIO-DKD (finerenone in diabetic CKD). Risk: hyperkalaemia — monitor K⁺ closely, especially with ACEi/ARB. Avoid if K⁺ >5.0 or eGFR <30.",
  },
];

export const RAASCascadeDiagram = () => {
  const [active, setActive] = useState<NodeId | null>(null);
  const info = active ? nodes.find(n => n.id === active) : null;
  const toggle = (id: NodeId) => () => setActive(active === id ? null : id);
  const hl = (id: NodeId) => active === id;
  const dim = (id: NodeId) => active !== null && active !== id;

  // Layout constants (viewBox 640 × 640)
  // Central cascade column at x=320 (boxes 260-380), drugs on left col, effects on right
  const cx = 320;        // cascade centre
  const boxW = 120;
  const boxH = 38;
  const drugX = 20;      // drugs left column
  const drugW = 110;

  return (
    <DiagramFigure
      id="raas-cascade-diagram"
      title="RAAS cascade"
      description="Auto-generated wrapper for the RAAS cascade anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="space-y-4">
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="text-xs font-semibold text-muted-foreground self-center mr-1">Pathway:</span>
          {nodes.filter(n => n.category !== "drug").map(n => (
            <button key={n.id} onClick={toggle(n.id)}
              className={`px-2 py-1 rounded-lg text-xs font-medium border transition-all ${
                active === n.id ? "bg-primary/15 border-primary/40 text-primary" : "bg-secondary/50 border-border text-muted-foreground hover:bg-secondary"
              }`}>{n.label.replace(" Receptor Effects", "")}</button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="text-xs font-semibold text-muted-foreground self-center mr-1">Drugs:</span>
          {nodes.filter(n => n.category === "drug").map(n => (
            <button key={n.id} onClick={toggle(n.id)}
              className={`px-2 py-1 rounded-lg text-xs font-medium border transition-all ${
                active === n.id ? "bg-primary/15 border-primary/40 text-primary" : "bg-secondary/50 border-border text-muted-foreground hover:bg-secondary"
              }`}>{n.label}</button>
          ))}
        </div>
  
        <svg viewBox="0 0 640 660" className="w-full" role="img" aria-label="RAAS cascade diagram">
          <defs>
            <marker id="raasArr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
              <path d="M0,0 L7,2.5 L0,5" fill="hsl(var(--muted-foreground))" opacity="0.5" />
            </marker>
            <marker id="raasArrRed" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
              <path d="M0,0 L7,2.5 L0,5" fill="hsl(0 55% 50%)" />
            </marker>
            <marker id="raasArrBlue" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
              <path d="M0,0 L7,2.5 L0,5" fill="hsl(210 50% 50%)" />
            </marker>
          </defs>
  
          {/* ===== ANIMATED CASCADE FLOW (suppressed when a drug blocks the relevant step) ===== */}
          {(() => {
            const driBlocks = active === "dri";       // blocks renin step
            const aceiBlocks = active === "acei";     // blocks ACE step
            // Particles for each cascade step
            const stepDur = "3s";
            return (
                  <g opacity="0.85">
                {/* Angiotensinogen → ANG I (renin step) */}
                {!driBlocks && [0, 1, 2].map(i => (
                  <circle key={`p1-${i}`} r="2.6" fill="hsl(30 60% 50%)">
                    <animate attributeName="cy" values="48;92" dur={stepDur} begin={`${-i}s`} repeatCount="indefinite" />
                    <animate attributeName="cx" values={`${cx};${cx}`} dur={stepDur} repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur={stepDur} begin={`${-i}s`} repeatCount="indefinite" />
                  </circle>
                ))}
                {/* ANG I → ANG II (ACE step) */}
                {!driBlocks && !aceiBlocks && [0, 1, 2].map(i => (
                  <circle key={`p2-${i}`} r="2.6" fill="hsl(270 50% 55%)">
                    <animate attributeName="cy" values="132;176" dur={stepDur} begin={`${-i - 0.5}s`} repeatCount="indefinite" />
                    <animate attributeName="cx" values={`${cx};${cx}`} dur={stepDur} repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.15;0.85;1" dur={stepDur} begin={`${-i - 0.5}s`} repeatCount="indefinite" />
                  </circle>
                ))}
                {/* ANG II → AT₁ (downstream effector) */}
                {!driBlocks && !aceiBlocks && active !== "arb" && [0, 1].map(i => (
                  <circle key={`p3-${i}`} r="2.4" fill="hsl(0 60% 50%)">
                    <animateMotion dur={stepDur} begin={`${-i - 1}s`} repeatCount="indefinite"
                      path="M 280 216 Q 260 235 240 250" />
                    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur={stepDur} begin={`${-i - 1}s`} repeatCount="indefinite" />
                  </circle>
                ))}
                {/* ANG II → AT₂ */}
                {!driBlocks && !aceiBlocks && [0, 1].map(i => (
                  <circle key={`p4-${i}`} r="2.4" fill="hsl(210 50% 50%)">
                    <animateMotion dur={stepDur} begin={`${-i - 1.2}s`} repeatCount="indefinite"
                      path="M 360 216 Q 410 235 470 252" />
                    <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.2;0.8;1" dur={stepDur} begin={`${-i - 1.2}s`} repeatCount="indefinite" />
                  </circle>
                ))}
              </g>
    );
          })()}
          {/* ===== MAIN CASCADE (vertical centre, x = 260..380) ===== */}
          {/* Angiotensinogen y=10..48 */}
          <g className="cursor-pointer" onClick={toggle("angiotensinogen")} opacity={dim("angiotensinogen") ? 0.3 : 1}>
            <rect x={cx - boxW / 2} y={10} width={boxW} height={boxH} rx={6}
              fill={hl("angiotensinogen") ? "hsl(30 50% 50%/0.2)" : "hsl(30 50% 50%/0.08)"}
              stroke="hsl(30 50% 50%)" strokeWidth={hl("angiotensinogen") ? 2 : 1} />
            <text x={cx} y={27} fontSize="9" fill="hsl(30 50% 50%)" textAnchor="middle" fontWeight="700">Angiotensinogen</text>
            <text x={cx} y={40} fontSize="6" fill="hsl(30 50% 50%)" textAnchor="middle" opacity="0.7">α₂-globulin (liver)</text>
          </g>
  
          {/* Arrow + Renin label (label placed RIGHT of arrow at x=400) */}
          <line x1={cx} y1={48} x2={cx} y2={92} stroke="hsl(var(--muted-foreground))" strokeWidth="1" markerEnd="url(#raasArr)" opacity={dim("renin") ? 0.2 : 0.7} />
          <g className="cursor-pointer" onClick={toggle("renin")} opacity={dim("renin") ? 0.3 : 1}>
            <rect x={395} y={58} width={70} height={20} rx={4}
              fill={hl("renin") ? "hsl(260 55% 55%/0.2)" : "hsl(260 55% 55%/0.08)"}
              stroke="hsl(260 55% 55%)" strokeWidth={hl("renin") ? 1.5 : 0.8} />
            <text x={430} y={72} fontSize="8" fill="hsl(260 55% 55%)" textAnchor="middle" fontWeight="600">Renin</text>
            <line x1={395} y1={68} x2={cx + boxW / 2 + 2} y2={68} stroke="hsl(260 55% 55%)" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.5" />
          </g>
  
          {/* ANG I y=92..130 */}
          <g className="cursor-pointer" onClick={toggle("ang1")} opacity={dim("ang1") ? 0.3 : 1}>
            <rect x={cx - boxW / 2} y={94} width={boxW} height={boxH} rx={6}
              fill={hl("ang1") ? "hsl(270 45% 50%/0.2)" : "hsl(270 45% 50%/0.08)"}
              stroke="hsl(270 45% 50%)" strokeWidth={hl("ang1") ? 2 : 1} />
            <text x={cx} y={111} fontSize="9" fill="hsl(270 45% 50%)" textAnchor="middle" fontWeight="700">Angiotensin I</text>
            <text x={cx} y={124} fontSize="6" fill="hsl(270 45% 50%)" textAnchor="middle" opacity="0.7">decapeptide (inactive)</text>
          </g>
  
          {/* Arrow + ACE label (right) */}
          <line x1={cx} y1={132} x2={cx} y2={176} stroke="hsl(var(--muted-foreground))" strokeWidth="1" markerEnd="url(#raasArr)" opacity={dim("ace") ? 0.2 : 0.7} />
          <g className="cursor-pointer" onClick={toggle("ace")} opacity={dim("ace") ? 0.3 : 1}>
            <rect x={395} y={142} width={80} height={20} rx={4}
              fill={hl("ace") ? "hsl(0 50% 50%/0.2)" : "hsl(0 50% 50%/0.08)"}
              stroke="hsl(0 50% 50%)" strokeWidth={hl("ace") ? 1.5 : 0.8} />
            <text x={435} y={156} fontSize="8" fill="hsl(0 50% 50%)" textAnchor="middle" fontWeight="600">ACE (lung)</text>
            <line x1={395} y1={152} x2={cx + boxW / 2 + 2} y2={152} stroke="hsl(0 50% 50%)" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.5" />
          </g>
  
          {/* ANG II y=178..216 */}
          <g className="cursor-pointer" onClick={toggle("ang2")} opacity={dim("ang2") ? 0.3 : 1}>
            <rect x={cx - boxW / 2} y={178} width={boxW} height={boxH} rx={6}
              fill={hl("ang2") ? "hsl(0 60% 50%/0.2)" : "hsl(0 60% 50%/0.08)"}
              stroke="hsl(0 60% 50%)" strokeWidth={hl("ang2") ? 2 : 1} />
            <text x={cx} y={195} fontSize="9" fill="hsl(0 60% 50%)" textAnchor="middle" fontWeight="700">Angiotensin II</text>
            <text x={cx} y={208} fontSize="6" fill="hsl(0 60% 50%)" textAnchor="middle" opacity="0.7">octapeptide (active)</text>
          </g>
  
          {/* ===== BRANCHING FROM ANG II ===== */}
          {/* AT₁ — left branch — box x=160..300, y=250..360 */}
          <path d="M 280 216 Q 260 235 240 250" fill="none"
            stroke="hsl(0 55% 48%)" strokeWidth="1" markerEnd="url(#raasArrRed)" opacity={dim("at1") ? 0.2 : 0.6} />
          <g className="cursor-pointer" onClick={toggle("at1")} opacity={dim("at1") ? 0.3 : 1}>
            <rect x={160} y={252} width={140} height={108} rx={6}
              fill={hl("at1") ? "hsl(0 55% 48%/0.15)" : "hsl(0 55% 48%/0.05)"}
              stroke="hsl(0 55% 48%)" strokeWidth={hl("at1") ? 1.5 : 0.8} />
            <text x={230} y={268} fontSize="8.5" fill="hsl(0 55% 48%)" textAnchor="middle" fontWeight="700">AT₁ Receptor</text>
            <text x={230} y={279} fontSize="5.5" fill="hsl(0 55% 48%)" textAnchor="middle" opacity="0.6">(Gq → PLC → ↑Ca²⁺)</text>
            {[
              "• Vasoconstriction",
              "• ↑ Aldosterone",
              "• ↑ ADH release",
              "• ↑ Thirst / salt appetite",
              "• Proximal Na⁺ reabsorption",
              "• Cardiac hypertrophy",
            ].map((t, i) => (
              <text key={i} x={172} y={295 + i * 10} fontSize="5.5" fill="hsl(0 50% 48%)" opacity="0.75">{t}</text>
            ))}
          </g>
  
          {/* AT₂ — right branch — box x=470..610, y=250..340 */}
          <path d="M 360 216 Q 410 235 470 252" fill="none"
            stroke="hsl(210 50% 50%)" strokeWidth="1" markerEnd="url(#raasArrBlue)" opacity={dim("at2") ? 0.2 : 0.6} />
          <g className="cursor-pointer" onClick={toggle("at2")} opacity={dim("at2") ? 0.3 : 1}>
            <rect x={470} y={254} width={140} height={88} rx={6}
              fill={hl("at2") ? "hsl(210 50% 50%/0.15)" : "hsl(210 50% 50%/0.05)"}
              stroke="hsl(210 50% 50%)" strokeWidth={hl("at2") ? 1.5 : 0.8} />
            <text x={540} y={270} fontSize="8.5" fill="hsl(210 50% 50%)" textAnchor="middle" fontWeight="700">AT₂ Receptor</text>
            <text x={540} y={281} fontSize="5.5" fill="hsl(210 50% 50%)" textAnchor="middle" opacity="0.6">(counter-regulatory)</text>
            {[
              "• Vasodilation (NO)",
              "• Anti-proliferation",
              "• Anti-fibrosis",
              "• Apoptosis",
            ].map((t, i) => (
              <text key={i} x={482} y={297 + i * 10} fontSize="5.5" fill="hsl(210 50% 50%)" opacity="0.75">{t}</text>
            ))}
          </g>
  
          {/* Aldosterone — from AT₁ — box x=160..300, y=400..470 */}
          <line x1={200} y1={360} x2={200} y2={398} stroke="hsl(45 60% 48%)" strokeWidth="1" markerEnd="url(#raasArr)" opacity={dim("aldosterone") ? 0.2 : 0.6} />
          <g className="cursor-pointer" onClick={toggle("aldosterone")} opacity={dim("aldosterone") ? 0.3 : 1}>
            <rect x={160} y={400} width={140} height={70} rx={6}
              fill={hl("aldosterone") ? "hsl(45 60% 48%/0.15)" : "hsl(45 60% 48%/0.05)"}
              stroke="hsl(45 60% 48%)" strokeWidth={hl("aldosterone") ? 1.5 : 0.8} />
            <text x={230} y={416} fontSize="8.5" fill="hsl(45 60% 48%)" textAnchor="middle" fontWeight="700">Aldosterone</text>
            <text x={230} y={428} fontSize="5.5" fill="hsl(45 60% 48%)" textAnchor="middle" opacity="0.6">(zona glomerulosa)</text>
            <text x={230} y={444} fontSize="6" fill="hsl(45 60% 48%)" textAnchor="middle" opacity="0.75">↑ENaC → Na⁺ reabsorption</text>
            <text x={230} y={456} fontSize="6" fill="hsl(45 60% 48%)" textAnchor="middle" opacity="0.75">K⁺ secretion</text>
          </g>
  
          {/* ADH — from AT₁, routed to right of cascade — box x=470..610, y=400..460 */}
          <path d="M 300 320 Q 400 320 470 420" fill="none"
            stroke="hsl(200 50% 48%)" strokeWidth="1" markerEnd="url(#raasArr)" opacity={dim("adh") ? 0.2 : 0.6} />
          <g className="cursor-pointer" onClick={toggle("adh")} opacity={dim("adh") ? 0.3 : 1}>
            <rect x={470} y={400} width={140} height={60} rx={6}
              fill={hl("adh") ? "hsl(200 50% 48%/0.15)" : "hsl(200 50% 48%/0.05)"}
              stroke="hsl(200 50% 48%)" strokeWidth={hl("adh") ? 1.5 : 0.8} />
            <text x={540} y={418} fontSize="8.5" fill="hsl(200 50% 48%)" textAnchor="middle" fontWeight="700">ADH (Vasopressin)</text>
            <text x={540} y={434} fontSize="6" fill="hsl(200 50% 48%)" textAnchor="middle" opacity="0.75">V₂ → AQP2 → H₂O reabsorption</text>
            <text x={540} y={446} fontSize="6" fill="hsl(200 50% 48%)" textAnchor="middle" opacity="0.75">V₁ → vasoconstriction</text>
          </g>
  
          {/* ===== DRUG INTERVENTION POINTS — left column x=20..130 ===== */}
          {/* DRI — blocks renin (target: renin label at y≈68) */}
          <g className="cursor-pointer" onClick={toggle("dri")} opacity={dim("dri") ? 0.3 : 1}>
            <rect x={drugX} y={54} width={drugW} height={30} rx={5}
              fill={hl("dri") ? "hsl(90 45% 40%/0.2)" : "hsl(90 45% 40%/0.08)"}
              stroke="hsl(90 45% 40%)" strokeWidth={hl("dri") ? 2 : 1} strokeDasharray={hl("dri") ? "0" : "4 2"} />
            <text x={drugX + drugW / 2} y={67} fontSize="7.5" fill="hsl(90 45% 40%)" textAnchor="middle" fontWeight="700">DRI</text>
            <text x={drugX + drugW / 2} y={78} fontSize="6" fill="hsl(90 45% 40%)" textAnchor="middle" opacity="0.7">(aliskiren)</text>
          </g>
          <line x1={drugX + drugW} y1={68} x2={cx - boxW / 2 - 4} y2={68} stroke="hsl(90 45% 40%)" strokeWidth="1" strokeDasharray="3 2" opacity={dim("dri") ? 0.15 : 0.55} />
          <text x={cx - boxW / 2 - 8} y={71} fontSize="9" fill="hsl(90 45% 40%)" textAnchor="end" fontWeight="800" opacity={dim("dri") ? 0.2 : 0.85}>✕</text>
  
          {/* ACEi — blocks ACE (target: ACE label at y≈152) */}
          <g className="cursor-pointer" onClick={toggle("acei")} opacity={dim("acei") ? 0.3 : 1}>
            <rect x={drugX} y={138} width={drugW} height={30} rx={5}
              fill={hl("acei") ? "hsl(150 55% 40%/0.2)" : "hsl(150 55% 40%/0.08)"}
              stroke="hsl(150 55% 40%)" strokeWidth={hl("acei") ? 2 : 1} strokeDasharray={hl("acei") ? "0" : "4 2"} />
            <text x={drugX + drugW / 2} y={151} fontSize="7.5" fill="hsl(150 55% 40%)" textAnchor="middle" fontWeight="700">ACE Inhibitors</text>
            <text x={drugX + drugW / 2} y={162} fontSize="6" fill="hsl(150 55% 40%)" textAnchor="middle" opacity="0.7">(ramipril, enalapril)</text>
          </g>
          <line x1={drugX + drugW} y1={152} x2={cx - boxW / 2 - 4} y2={152} stroke="hsl(150 55% 40%)" strokeWidth="1" strokeDasharray="3 2" opacity={dim("acei") ? 0.15 : 0.55} />
          <text x={cx - boxW / 2 - 8} y={155} fontSize="9" fill="hsl(150 55% 40%)" textAnchor="end" fontWeight="800" opacity={dim("acei") ? 0.2 : 0.85}>✕</text>
          {hl("acei") && (
            <g>
              <rect x={400} y={476} width={210} height={32} rx={4} fill="hsl(150 50% 40%/0.1)" stroke="hsl(150 50% 40%)" strokeWidth="0.5" />
              <text x={505} y={490} fontSize="6.5" fill="hsl(150 55% 40%)" textAnchor="middle" fontWeight="600">Also: ↑ Bradykinin</text>
              <text x={505} y={501} fontSize="6" fill="hsl(150 55% 40%)" textAnchor="middle" opacity="0.7">→ vasodilation, cough (10-15%)</text>
            </g>
          )}
  
          {/* ARB — blocks AT₁ receptor */}
          <g className="cursor-pointer" onClick={toggle("arb")} opacity={dim("arb") ? 0.3 : 1}>
            <rect x={drugX} y={278} width={drugW} height={30} rx={5}
              fill={hl("arb") ? "hsl(180 50% 40%/0.2)" : "hsl(180 50% 40%/0.08)"}
              stroke="hsl(180 50% 40%)" strokeWidth={hl("arb") ? 2 : 1} strokeDasharray={hl("arb") ? "0" : "4 2"} />
            <text x={drugX + drugW / 2} y={291} fontSize="7.5" fill="hsl(180 50% 40%)" textAnchor="middle" fontWeight="700">ARBs</text>
            <text x={drugX + drugW / 2} y={302} fontSize="6" fill="hsl(180 50% 40%)" textAnchor="middle" opacity="0.7">(losartan, candesartan)</text>
          </g>
          <line x1={drugX + drugW} y1={293} x2={158} y2={293} stroke="hsl(180 50% 40%)" strokeWidth="1" strokeDasharray="3 2" opacity={dim("arb") ? 0.15 : 0.55} />
          <text x={155} y={296} fontSize="9" fill="hsl(180 50% 40%)" textAnchor="end" fontWeight="800" opacity={dim("arb") ? 0.2 : 0.85}>✕</text>
  
          {/* MRA — blocks aldosterone receptor */}
          <g className="cursor-pointer" onClick={toggle("mra")} opacity={dim("mra") ? 0.3 : 1}>
            <rect x={drugX} y={420} width={drugW} height={36} rx={5}
              fill={hl("mra") ? "hsl(320 50% 45%/0.2)" : "hsl(320 50% 45%/0.08)"}
              stroke="hsl(320 50% 45%)" strokeWidth={hl("mra") ? 2 : 1} strokeDasharray={hl("mra") ? "0" : "4 2"} />
            <text x={drugX + drugW / 2} y={434} fontSize="7.5" fill="hsl(320 50% 45%)" textAnchor="middle" fontWeight="700">MR Antagonists</text>
            <text x={drugX + drugW / 2} y={445} fontSize="6" fill="hsl(320 50% 45%)" textAnchor="middle" opacity="0.7">(spironolactone,</text>
            <text x={drugX + drugW / 2} y={453} fontSize="6" fill="hsl(320 50% 45%)" textAnchor="middle" opacity="0.7">eplerenone)</text>
          </g>
          <line x1={drugX + drugW} y1={435} x2={158} y2={435} stroke="hsl(320 50% 45%)" strokeWidth="1" strokeDasharray="3 2" opacity={dim("mra") ? 0.15 : 0.55} />
          <text x={155} y={438} fontSize="9" fill="hsl(320 50% 45%)" textAnchor="end" fontWeight="800" opacity={dim("mra") ? 0.2 : 0.85}>✕</text>
  
          {/* ===== NEGATIVE FEEDBACK ARROW — runs along far right, well clear of AT₂/ADH ===== */}
          <path d="M 380 197 Q 625 197 625 110 Q 625 30 540 22 Q 460 16 380 22" fill="none"
            stroke="hsl(var(--muted-foreground))" strokeWidth="0.75" strokeDasharray="4 2" markerEnd="url(#raasArr)" opacity="0.3" />
          <text x={620} y={130} fontSize="6" fill="hsl(var(--muted-foreground))" opacity="0.55" transform="rotate(90, 620, 130)">negative feedback (↓ renin)</text>
  
          {/* ===== SUMMARY BOX (bottom centre) ===== */}
          <rect x={170} y={540} width={300} height={100} rx={6} fill="hsl(var(--secondary))" fillOpacity="0.3" stroke="hsl(var(--border))" strokeWidth="0.75" />
          <text x={320} y={558} fontSize="9" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="700">Net Effect of RAAS</text>
          {[
            "↑ Blood pressure (vasoconstriction)",
            "↑ Blood volume (Na⁺/H₂O retention)",
            "↑ Preload + afterload",
            "Maintain GFR (efferent constriction)",
            "↑ K⁺ excretion",
          ].map((t, i) => (
            <text key={i} x={185} y={576 + i * 12} fontSize="7" fill="hsl(var(--muted-foreground))">{t}</text>
          ))}
        </svg>
  
        {info ? (
          <div className="rounded-lg border border-border bg-secondary/30 p-4 animate-fade-in" key={info.id}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: info.color }} />
              <h4 className="text-sm font-semibold text-foreground">{info.label}</h4>
              <span className={`text-xs px-1.5 py-0.5 rounded ${
                info.category === "drug" ? "bg-green-500/10 text-green-600" :
                info.category === "enzyme" ? "bg-orange-500/10 text-orange-600" :
                info.category === "effector" ? "bg-red-500/10 text-red-600" :
                "bg-blue-500/10 text-blue-600"
              }`}>{info.category}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{info.description}</p>
            <p className="text-xs text-muted-foreground mt-2 border-t border-border pt-2">
              <span className="font-semibold text-foreground/80">Clinical: </span>{info.detail}
            </p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center">Click any component or drug to explore its pharmacology, mechanism, and clinical relevance</p>
        )}
      </div>
    </DiagramFigure>
  );
};
