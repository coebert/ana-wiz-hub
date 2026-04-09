import { useState } from "react";

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

  const boxW = 110;
  const drugW = 80;

  return (
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

      <svg viewBox="0 0 520 540" className="w-full" role="img" aria-label="RAAS cascade diagram">
        <defs>
          <marker id="raasArr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <path d="M0,0 L7,2.5 L0,5" fill="hsl(var(--muted-foreground))" opacity="0.5" />
          </marker>
          <marker id="raasArrRed" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <path d="M0,0 L7,2.5 L0,5" fill="hsl(0 55% 50%)" />
          </marker>
          <marker id="raasArrGreen" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
            <path d="M0,0 L7,2.5 L0,5" fill="hsl(150 55% 40%)" />
          </marker>
        </defs>

        {/* ===== MAIN CASCADE (vertical center) ===== */}
        {/* Angiotensinogen */}
        <g className="cursor-pointer" onClick={toggle("angiotensinogen")} opacity={dim("angiotensinogen") ? 0.3 : 1}>
          <rect x={205} y={10} width={boxW} height={36} rx={6}
            fill={hl("angiotensinogen") ? "hsl(30 50% 50%/0.2)" : "hsl(30 50% 50%/0.08)"}
            stroke="hsl(30 50% 50%)" strokeWidth={hl("angiotensinogen") ? 2 : 1} />
          <text x={260} y={26} fontSize="8" fill="hsl(30 50% 50%)" textAnchor="middle" fontWeight="700">Angiotensinogen</text>
          <text x={260} y={38} fontSize="5.5" fill="hsl(30 50% 50%)" textAnchor="middle" opacity="0.6">α₂-globulin (liver)</text>
        </g>

        {/* Arrow + Renin label */}
        <line x1={260} y1={46} x2={260} y2={80} stroke="hsl(var(--muted-foreground))" strokeWidth="1.2" markerEnd="url(#raasArr)" opacity={dim("renin") ? 0.2 : 0.7} />
        <g className="cursor-pointer" onClick={toggle("renin")} opacity={dim("renin") ? 0.3 : 1}>
          <rect x={265} y={53} width={55} height={18} rx={4}
            fill={hl("renin") ? "hsl(260 55% 55%/0.2)" : "hsl(260 55% 55%/0.08)"}
            stroke="hsl(260 55% 55%)" strokeWidth={hl("renin") ? 1.5 : 0.8} />
          <text x={292} y={66} fontSize="7" fill="hsl(260 55% 55%)" textAnchor="middle" fontWeight="600">Renin</text>
        </g>

        {/* ANG I */}
        <g className="cursor-pointer" onClick={toggle("ang1")} opacity={dim("ang1") ? 0.3 : 1}>
          <rect x={205} y={82} width={boxW} height={36} rx={6}
            fill={hl("ang1") ? "hsl(270 45% 50%/0.2)" : "hsl(270 45% 50%/0.08)"}
            stroke="hsl(270 45% 50%)" strokeWidth={hl("ang1") ? 2 : 1} />
          <text x={260} y={98} fontSize="8" fill="hsl(270 45% 50%)" textAnchor="middle" fontWeight="700">Angiotensin I</text>
          <text x={260} y={110} fontSize="5.5" fill="hsl(270 45% 50%)" textAnchor="middle" opacity="0.6">decapeptide (inactive)</text>
        </g>

        {/* Arrow + ACE label */}
        <line x1={260} y1={118} x2={260} y2={155} stroke="hsl(var(--muted-foreground))" strokeWidth="1.2" markerEnd="url(#raasArr)" opacity={dim("ace") ? 0.2 : 0.7} />
        <g className="cursor-pointer" onClick={toggle("ace")} opacity={dim("ace") ? 0.3 : 1}>
          <rect x={265} y={125} width={65} height={18} rx={4}
            fill={hl("ace") ? "hsl(0 50% 50%/0.2)" : "hsl(0 50% 50%/0.08)"}
            stroke="hsl(0 50% 50%)" strokeWidth={hl("ace") ? 1.5 : 0.8} />
          <text x={297} y={138} fontSize="7" fill="hsl(0 50% 50%)" textAnchor="middle" fontWeight="600">ACE (lung)</text>
        </g>

        {/* ANG II */}
        <g className="cursor-pointer" onClick={toggle("ang2")} opacity={dim("ang2") ? 0.3 : 1}>
          <rect x={205} y={157} width={boxW} height={36} rx={6}
            fill={hl("ang2") ? "hsl(0 60% 50%/0.2)" : "hsl(0 60% 50%/0.08)"}
            stroke="hsl(0 60% 50%)" strokeWidth={hl("ang2") ? 2 : 1} />
          <text x={260} y={173} fontSize="8" fill="hsl(0 60% 50%)" textAnchor="middle" fontWeight="700">Angiotensin II</text>
          <text x={260} y={185} fontSize="5.5" fill="hsl(0 60% 50%)" textAnchor="middle" opacity="0.6">octapeptide (active)</text>
        </g>

        {/* ===== BRANCHING FROM ANG II ===== */}
        {/* AT₁ — left branch */}
        <path d="M 220 193 Q 220 210 150 220 Q 100 228 100 240" fill="none"
          stroke="hsl(0 55% 48%)" strokeWidth="1" markerEnd="url(#raasArrRed)" opacity={dim("at1") ? 0.2 : 0.5} />
        <g className="cursor-pointer" onClick={toggle("at1")} opacity={dim("at1") ? 0.3 : 1}>
          <rect x={40} y={242} width={120} height={100} rx={6}
            fill={hl("at1") ? "hsl(0 55% 48%/0.15)" : "hsl(0 55% 48%/0.05)"}
            stroke="hsl(0 55% 48%)" strokeWidth={hl("at1") ? 1.5 : 0.8} />
          <text x={100} y={256} fontSize="7.5" fill="hsl(0 55% 48%)" textAnchor="middle" fontWeight="700">AT₁ Receptor</text>
          <text x={100} y={266} fontSize="5" fill="hsl(0 55% 48%)" textAnchor="middle" opacity="0.5">(Gq → PLC → ↑Ca²⁺)</text>
          {[
            "• Vasoconstriction",
            "• ↑ Aldosterone",
            "• ↑ ADH release",
            "• ↑ Thirst / salt appetite",
            "• Proximal Na⁺ reabsorption",
            "• Cardiac hypertrophy",
          ].map((t, i) => (
            <text key={i} x={50} y={280 + i * 10} fontSize="5" fill="hsl(0 50% 48%)" opacity="0.7">{t}</text>
          ))}
        </g>

        {/* AT₂ — right branch */}
        <path d="M 300 193 Q 300 210 370 220 Q 420 228 420 240" fill="none"
          stroke="hsl(210 50% 50%)" strokeWidth="1" markerEnd="url(#raasArr)" opacity={dim("at2") ? 0.2 : 0.5} />
        <g className="cursor-pointer" onClick={toggle("at2")} opacity={dim("at2") ? 0.3 : 1}>
          <rect x={360} y={242} width={120} height={80} rx={6}
            fill={hl("at2") ? "hsl(210 50% 50%/0.15)" : "hsl(210 50% 50%/0.05)"}
            stroke="hsl(210 50% 50%)" strokeWidth={hl("at2") ? 1.5 : 0.8} />
          <text x={420} y={256} fontSize="7.5" fill="hsl(210 50% 50%)" textAnchor="middle" fontWeight="700">AT₂ Receptor</text>
          <text x={420} y={266} fontSize="5" fill="hsl(210 50% 50%)" textAnchor="middle" opacity="0.5">(counter-regulatory)</text>
          {[
            "• Vasodilation (NO)",
            "• Anti-proliferation",
            "• Anti-fibrosis",
            "• Apoptosis",
          ].map((t, i) => (
            <text key={i} x={370} y={280 + i * 10} fontSize="5" fill="hsl(210 50% 50%)" opacity="0.7">{t}</text>
          ))}
        </g>

        {/* Aldosterone — from AT₁ */}
        <path d="M 100 342 Q 100 360 100 370" fill="none"
          stroke="hsl(45 60% 48%)" strokeWidth="1" markerEnd="url(#raasArr)" opacity={dim("aldosterone") ? 0.2 : 0.5} />
        <g className="cursor-pointer" onClick={toggle("aldosterone")} opacity={dim("aldosterone") ? 0.3 : 1}>
          <rect x={35} y={372} width={130} height={55} rx={6}
            fill={hl("aldosterone") ? "hsl(45 60% 48%/0.15)" : "hsl(45 60% 48%/0.05)"}
            stroke="hsl(45 60% 48%)" strokeWidth={hl("aldosterone") ? 1.5 : 0.8} />
          <text x={100} y={386} fontSize="7.5" fill="hsl(45 60% 48%)" textAnchor="middle" fontWeight="700">Aldosterone</text>
          <text x={100} y={396} fontSize="5" fill="hsl(45 60% 48%)" textAnchor="middle" opacity="0.5">(zona glomerulosa)</text>
          <text x={100} y={408} fontSize="5" fill="hsl(45 60% 48%)" textAnchor="middle" opacity="0.6">↑ENaC → Na⁺ reabsorption</text>
          <text x={100} y={418} fontSize="5" fill="hsl(45 60% 48%)" textAnchor="middle" opacity="0.6">K⁺ secretion</text>
        </g>

        {/* ADH — center-right from AT₁ */}
        <path d="M 150 310 Q 200 330 240 360 Q 260 375 260 380" fill="none"
          stroke="hsl(200 50% 48%)" strokeWidth="1" markerEnd="url(#raasArr)" opacity={dim("adh") ? 0.2 : 0.5} />
        <g className="cursor-pointer" onClick={toggle("adh")} opacity={dim("adh") ? 0.3 : 1}>
          <rect x={200} y={382} width={120} height={45} rx={6}
            fill={hl("adh") ? "hsl(200 50% 48%/0.15)" : "hsl(200 50% 48%/0.05)"}
            stroke="hsl(200 50% 48%)" strokeWidth={hl("adh") ? 1.5 : 0.8} />
          <text x={260} y={396} fontSize="7.5" fill="hsl(200 50% 48%)" textAnchor="middle" fontWeight="700">ADH (Vasopressin)</text>
          <text x={260} y={408} fontSize="5" fill="hsl(200 50% 48%)" textAnchor="middle" opacity="0.6">V₂ → AQP2 → H₂O reabsorption</text>
          <text x={260} y={418} fontSize="5" fill="hsl(200 50% 48%)" textAnchor="middle" opacity="0.6">V₁ → vasoconstriction</text>
        </g>

        {/* ===== DRUG INTERVENTION POINTS ===== */}
        {/* DRI — blocks renin */}
        <g className="cursor-pointer" onClick={toggle("dri")} opacity={dim("dri") ? 0.3 : 1}>
          <rect x={10} y={48} width={drugW} height={28} rx={5}
            fill={hl("dri") ? "hsl(90 45% 40%/0.2)" : "hsl(90 45% 40%/0.08)"}
            stroke="hsl(90 45% 40%)" strokeWidth={hl("dri") ? 2 : 1} strokeDasharray={hl("dri") ? "0" : "4 2"} />
          <text x={50} y={60} fontSize="6.5" fill="hsl(90 45% 40%)" textAnchor="middle" fontWeight="700">DRI</text>
          <text x={50} y={70} fontSize="5" fill="hsl(90 45% 40%)" textAnchor="middle" opacity="0.6">(aliskiren)</text>
          <line x1={90} y1={62} x2={210} y2={62} stroke="hsl(90 45% 40%)" strokeWidth="1" strokeDasharray="3 2" opacity="0.5" />
          <text x={150} y={58} fontSize="7" fill="hsl(90 45% 40%)" textAnchor="middle" fontWeight="800">✕</text>
        </g>

        {/* ACEi — blocks ACE */}
        <g className="cursor-pointer" onClick={toggle("acei")} opacity={dim("acei") ? 0.3 : 1}>
          <rect x={10} y={120} width={drugW} height={28} rx={5}
            fill={hl("acei") ? "hsl(150 55% 40%/0.2)" : "hsl(150 55% 40%/0.08)"}
            stroke="hsl(150 55% 40%)" strokeWidth={hl("acei") ? 2 : 1} strokeDasharray={hl("acei") ? "0" : "4 2"} />
          <text x={50} y={132} fontSize="6.5" fill="hsl(150 55% 40%)" textAnchor="middle" fontWeight="700">ACE Inhibitors</text>
          <text x={50} y={142} fontSize="5" fill="hsl(150 55% 40%)" textAnchor="middle" opacity="0.6">(ramipril, enalapril)</text>
          <line x1={90} y1={134} x2={210} y2={134} stroke="hsl(150 55% 40%)" strokeWidth="1" strokeDasharray="3 2" opacity="0.5" />
          <text x={150} y={130} fontSize="7" fill="hsl(150 55% 40%)" textAnchor="middle" fontWeight="800">✕</text>
          {/* Bradykinin note */}
          {hl("acei") && (
            <g>
              <rect x={340} y={120} width={130} height={28} rx={4} fill="hsl(150 50% 40%/0.1)" stroke="hsl(150 50% 40%)" strokeWidth="0.6" />
              <text x={405} y={132} fontSize="5.5" fill="hsl(150 55% 40%)" textAnchor="middle" fontWeight="600">Also: ↑ Bradykinin</text>
              <text x={405} y={142} fontSize="5" fill="hsl(150 55% 40%)" textAnchor="middle" opacity="0.6">→ vasodilation, cough (10-15%)</text>
            </g>
          )}
        </g>

        {/* ARB — blocks AT₁ */}
        <g className="cursor-pointer" onClick={toggle("arb")} opacity={dim("arb") ? 0.3 : 1}>
          <rect x={10} y={225} width={drugW} height={28} rx={5}
            fill={hl("arb") ? "hsl(180 50% 40%/0.2)" : "hsl(180 50% 40%/0.08)"}
            stroke="hsl(180 50% 40%)" strokeWidth={hl("arb") ? 2 : 1} strokeDasharray={hl("arb") ? "0" : "4 2"} />
          <text x={50} y={237} fontSize="6.5" fill="hsl(180 50% 40%)" textAnchor="middle" fontWeight="700">ARBs</text>
          <text x={50} y={247} fontSize="5" fill="hsl(180 50% 40%)" textAnchor="middle" opacity="0.6">(losartan, candesartan)</text>
          <path d="M 50 253 Q 50 260 60 268 Q 70 275 80 280" fill="none"
            stroke="hsl(180 50% 40%)" strokeWidth="1" strokeDasharray="3 2" opacity="0.5" />
          <text x={65} y={266} fontSize="7" fill="hsl(180 50% 40%)" fontWeight="800">✕</text>
        </g>

        {/* MRA — blocks aldosterone receptor */}
        <g className="cursor-pointer" onClick={toggle("mra")} opacity={dim("mra") ? 0.3 : 1}>
          <rect x={10} y={380} width={drugW} height={36} rx={5}
            fill={hl("mra") ? "hsl(320 50% 45%/0.2)" : "hsl(320 50% 45%/0.08)"}
            stroke="hsl(320 50% 45%)" strokeWidth={hl("mra") ? 2 : 1} strokeDasharray={hl("mra") ? "0" : "4 2"} />
          <text x={50} y={394} fontSize="6.5" fill="hsl(320 50% 45%)" textAnchor="middle" fontWeight="700">MR Antagonists</text>
          <text x={50} y={404} fontSize="5" fill="hsl(320 50% 45%)" textAnchor="middle" opacity="0.6">(spironolactone,</text>
          <text x={50} y={412} fontSize="5" fill="hsl(320 50% 45%)" textAnchor="middle" opacity="0.6">eplerenone)</text>
          <path d="M 55 380 Q 55 375 70 370 Q 80 365 85 372" fill="none"
            stroke="hsl(320 50% 45%)" strokeWidth="1" strokeDasharray="3 2" opacity="0.5" />
          <text x={70} y={370} fontSize="7" fill="hsl(320 50% 45%)" fontWeight="800">✕</text>
        </g>

        {/* ===== NEGATIVE FEEDBACK ARROW ===== */}
        <path d="M 315 175 Q 450 175 480 130 Q 500 90 480 50 Q 465 25 400 20 Q 330 15 300 28" fill="none"
          stroke="hsl(var(--muted-foreground))" strokeWidth="0.8" strokeDasharray="4 2" markerEnd="url(#raasArr)" opacity="0.25" />
        <text x={478} y={100} fontSize="5" fill="hsl(var(--muted-foreground))" opacity="0.4" transform="rotate(90, 478, 100)">negative feedback</text>

        {/* ===== SUMMARY BOX ===== */}
        <rect x={340} y={450} width={170} height={80} rx={6} fill="hsl(var(--secondary))" fillOpacity="0.3" stroke="hsl(var(--border))" strokeWidth="0.8" />
        <text x={425} y={466} fontSize="7" fill="hsl(var(--foreground))" textAnchor="middle" fontWeight="700">Net Effect of RAAS</text>
        {[
          "↑ Blood pressure (vasoconstriction)",
          "↑ Blood volume (Na⁺/H₂O retention)",
          "↑ Preload + afterload",
          "Maintain GFR (efferent constriction)",
          "↑ K⁺ excretion",
        ].map((t, i) => (
          <text key={i} x={350} y={480 + i * 10} fontSize="5.5" fill="hsl(var(--muted-foreground))">{t}</text>
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
  );
};
