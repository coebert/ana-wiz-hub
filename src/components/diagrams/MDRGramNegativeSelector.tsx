import { useState } from "react";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * MDR Gram-negative agent selector.
 * User picks an organism / resistance phenotype → returns recommended first-line
 * agent(s), alternatives to avoid, and a brief mechanistic rationale.
 *
 * Aligned with IDSA 2024 Guidance on Treatment of AMR Gram-negative Infections
 * and BSAC/UK practice — for revision use only, not a prescribing tool.
 */

type OrgKey = "esbl" | "ampc" | "kpc" | "ndm" | "oxa48" | "mdr_pa" | "crab" | "steno";

interface Agent {
  name: string;
  rationale: string;
}

interface Organism {
  key: OrgKey;
  short: string;
  full: string;
  resistance: string;
  firstLine: Agent[];
  alternatives: Agent[];
  avoid: { name: string; why: string }[];
  pearls: string[];
  color: string;
}

const ORGANISMS: Organism[] = [
  {
    key: "esbl",
    short: "ESBL E. coli / Klebsiella",
    full: "Extended-spectrum β-lactamase (CTX-M most common)",
    resistance: "Class A serine β-lactamase → hydrolyses penicillins + 1st–4th gen cephalosporins (incl. ceftriaxone, cefepime). NOT carbapenems.",
    color: "hsl(15 90% 55%)",
    firstLine: [
      { name: "Meropenem (or ertapenem / imipenem)", rationale: "Carbapenems stable to ESBL hydrolysis → drug of choice for severe infection (BSI, pneumonia, intra-abdominal)." },
    ],
    alternatives: [
      { name: "Pip-tazobactam", rationale: "MERINO trial showed inferior to meropenem for ESBL bloodstream infection — reserve for non-severe UTI with susceptible isolate." },
      { name: "Ceftazidime-avibactam / ceftolozane-tazobactam", rationale: "Active but carbapenem-sparing rationale only — avoid to preserve activity against true CRE." },
      { name: "Cefiderocol, fosfomycin (uncomplicated cystitis), nitrofurantoin (cystitis)", rationale: "Oral options for lower UTI." },
    ],
    avoid: [
      { name: "Ceftriaxone, cefepime, ciprofloxacin", why: "Co-resistance common; unreliable even if reported susceptible at high inoculum." },
    ],
    pearls: [
      "Carbapenem = first-line for serious ESBL infection (MERINO trial).",
      "Step down to oral agent (co-trimoxazole, ciprofloxacin if susceptible) once stable.",
    ],
  },
  {
    key: "ampc",
    short: "AmpC producer (SPACE)",
    full: "Chromosomal AmpC: Serratia, Pseudomonas, Acinetobacter, Citrobacter, Enterobacter, Providencia, Morganella",
    resistance: "Inducible Class C cephalosporinase. Selected during 3rd-gen cephalosporin therapy → therapeutic failure mid-treatment.",
    color: "hsl(25 90% 55%)",
    firstLine: [
      { name: "Cefepime", rationale: "Stable to AmpC hydrolysis (zwitterion, low affinity for AmpC); preferred over carbapenem to spare carbapenem." },
    ],
    alternatives: [
      { name: "Meropenem", rationale: "Reliable but carbapenem-sparing preferred." },
      { name: "Co-trimoxazole, ciprofloxacin", rationale: "If susceptible — useful for step-down." },
    ],
    avoid: [
      { name: "Ceftriaxone, ceftazidime, cefotaxime", why: "Risk of AmpC induction → emergence of resistance on therapy, especially Enterobacter cloacae." },
      { name: "Pip-tazobactam (high-inoculum / severe)", why: "Tazobactam does not inhibit AmpC; unreliable for serious infection." },
    ],
    pearls: [
      "Even if susceptible on initial report, AmpC organisms can develop resistance during 3rd-gen cephalosporin therapy.",
      "Cefepime is the carbapenem-sparing agent of choice.",
    ],
  },
  {
    key: "kpc",
    short: "KPC Klebsiella (CRE)",
    full: "Klebsiella pneumoniae carbapenemase — most common CRE in Europe/US",
    resistance: "Class A serine carbapenemase → hydrolyses all β-lactams including carbapenems. INHIBITED by avibactam, vaborbactam, relebactam (NOT clavulanate/tazobactam).",
    color: "hsl(330 70% 55%)",
    firstLine: [
      { name: "Ceftazidime-avibactam", rationale: "Avibactam (diazabicyclooctane) inhibits KPC → restores ceftazidime activity. First-line for KPC bacteraemia, pneumonia." },
      { name: "Meropenem-vaborbactam", rationale: "Vaborbactam (boronate) inhibits KPC → meropenem regains activity. Equivalent first-line for KPC." },
      { name: "Imipenem-relebactam", rationale: "Alternative β-lactam/inhibitor combination active against KPC." },
    ],
    alternatives: [
      { name: "Cefiderocol", rationale: "Siderophore cephalosporin, active vs all CRE incl. KPC; reserve where novel BL/BLI unavailable." },
      { name: "Tigecycline (high dose), polymyxins, aminoglycosides", rationale: "Older salvage agents — inferior outcomes; combination therapy historically used before novel agents." },
    ],
    avoid: [
      { name: "Meropenem monotherapy", why: "Hydrolysed by KPC unless meropenem MIC ≤8 and high-dose extended infusion used (rarely appropriate)." },
      { name: "Pip-tazobactam, ceftriaxone", why: "No activity." },
    ],
    pearls: [
      "Watch for KPC variants (e.g. KPC-3 D179Y) that confer resistance to ceftazidime-avibactam — switch to meropenem-vaborbactam or cefiderocol.",
      "Avibactam restores aztreonam activity vs metallo-β-lactamase producers (aztreonam-avibactam) — important when KPC and NDM coexist.",
    ],
  },
  {
    key: "ndm",
    short: "NDM (metallo-β-lactamase)",
    full: "New Delhi metallo-β-lactamase (also VIM, IMP) — Enterobacterales or Pseudomonas",
    resistance: "Class B Zn²⁺-dependent carbapenemase → hydrolyses ALL β-lactams except aztreonam. NOT inhibited by clavulanate, tazobactam, avibactam, vaborbactam or relebactam.",
    color: "hsl(280 70% 55%)",
    firstLine: [
      { name: "Cefiderocol", rationale: "Siderophore cephalosporin — Trojan-horse uptake via iron transporters bypasses porin loss; stable to all four β-lactamase classes incl. MBLs. First-line for NDM." },
      { name: "Aztreonam + ceftazidime-avibactam (or aztreonam-avibactam where licensed)", rationale: "Aztreonam is stable to MBLs but hydrolysed by co-produced ESBLs/AmpC; avibactam protects aztreonam → effective dual therapy." },
    ],
    alternatives: [
      { name: "Polymyxins, tigecycline, fosfomycin, aminoglycosides", rationale: "Last-line salvage based on susceptibility." },
    ],
    avoid: [
      { name: "Ceftazidime-avibactam alone, meropenem-vaborbactam, imipenem-relebactam", why: "None of the available BLIs inhibit metallo-β-lactamases." },
      { name: "Carbapenems alone", why: "Hydrolysed by NDM/VIM/IMP." },
    ],
    pearls: [
      "If unsure between KPC and NDM — request rapid molecular test (NG-Test CARBA 5, Xpert Carba-R) before committing to a regimen.",
      "Aztreonam + ceftazidime-avibactam is the historical workaround pending widespread aztreonam-avibactam licensing.",
    ],
  },
  {
    key: "oxa48",
    short: "OXA-48-like Enterobacterales",
    full: "OXA-48-like Class D carbapenemase (Mediterranean, Middle East endemic)",
    resistance: "Hydrolyses penicillins and carbapenems weakly; spares broad-spectrum cephalosporins (unless co-produced ESBL). Inhibited by avibactam (NOT vaborbactam, relebactam, tazobactam).",
    color: "hsl(160 70% 40%)",
    firstLine: [
      { name: "Ceftazidime-avibactam", rationale: "Avibactam inhibits OXA-48 → ceftazidime regains activity. First-line." },
    ],
    alternatives: [
      { name: "Cefiderocol", rationale: "Reliable alternative." },
      { name: "Meropenem (high-dose extended infusion)", rationale: "Only if MIC ≤8 mg/L and isolated OXA-48 with no co-produced ESBL." },
    ],
    avoid: [
      { name: "Meropenem-vaborbactam, imipenem-relebactam", why: "Vaborbactam and relebactam do NOT inhibit OXA-48." },
    ],
    pearls: [
      "OXA-48 weakly hydrolyses carbapenems → MICs may sit just above breakpoint and be missed.",
      "Often co-produced with CTX-M ESBL → cephalosporin resistance from the ESBL, not OXA-48.",
    ],
  },
  {
    key: "mdr_pa",
    short: "MDR Pseudomonas aeruginosa",
    full: "Difficult-to-treat resistant (DTR) P. aeruginosa — resistant to all β-lactams + fluoroquinolones",
    resistance: "Combination of AmpC overexpression, OprD porin loss, efflux pump upregulation (MexAB-OprM) ± acquired carbapenemase.",
    color: "hsl(195 80% 50%)",
    firstLine: [
      { name: "Ceftolozane-tazobactam", rationale: "Novel cephalosporin/BLI specifically designed for P. aeruginosa — stable to AmpC, OprD loss, efflux. First-line for DTR-PA without carbapenemase." },
      { name: "Ceftazidime-avibactam", rationale: "Equivalent first-line option, especially if KPC also present." },
      { name: "Imipenem-relebactam", rationale: "Active vs DTR-PA including some carbapenemase producers." },
    ],
    alternatives: [
      { name: "Cefiderocol", rationale: "Active vs MBL-producing Pseudomonas (where novel BL/BLIs fail)." },
      { name: "Polymyxins, aminoglycosides (tobramycin, amikacin)", rationale: "Salvage; nephrotoxicity. Nebulised colistin/tobramycin for VAP adjunct." },
    ],
    avoid: [
      { name: "Pip-tazobactam, meropenem alone, ciprofloxacin", why: "By definition resistant in DTR phenotype." },
      { name: "Tigecycline, ertapenem", why: "No reliable Pseudomonas activity." },
    ],
    pearls: [
      "Always seek susceptibility-guided therapy — empirical novel BL/BLI choice depends on local resistance patterns.",
      "Combination therapy (β-lactam + aminoglycoside) only if synergy needed for severe infection or empirical cover; no survival benefit once susceptibilities known.",
    ],
  },
  {
    key: "crab",
    short: "CRAB (Acinetobacter)",
    full: "Carbapenem-resistant Acinetobacter baumannii — typically OXA-23/24/58",
    resistance: "OXA-type carbapenemases + porin loss + efflux. Often pan-resistant; high mortality in VAP and BSI.",
    color: "hsl(45 90% 50%)",
    firstLine: [
      { name: "Sulbactam-durlobactam (or high-dose ampicillin-sulbactam)", rationale: "Sulbactam has intrinsic activity against PBP3 of A. baumannii; durlobactam protects against OXA hydrolysis. New first-line per IDSA 2024." },
    ],
    alternatives: [
      { name: "Cefiderocol", rationale: "Active vs CRAB; useful when sulbactam-durlobactam unavailable." },
      { name: "Polymyxins (colistin) ± minocycline / tigecycline", rationale: "Combination salvage; historically standard before sulbactam-durlobactam." },
      { name: "Meropenem (high-dose extended infusion) as part of combination", rationale: "Only adjunctive — not monotherapy." },
    ],
    avoid: [
      { name: "Ceftazidime-avibactam, meropenem-vaborbactam, ceftolozane-tazobactam", why: "Poor activity against CRAB OXA carbapenemases." },
      { name: "Monotherapy with any agent for severe infection", why: "High failure rate — IDSA recommends combination therapy." },
    ],
    pearls: [
      "Distinguish colonisation (especially respiratory tract) from true infection — many CRAB isolates do not need treatment.",
      "Combination therapy (≥2 active agents) recommended for serious infection.",
    ],
  },
  {
    key: "steno",
    short: "Stenotrophomonas maltophilia",
    full: "Stenotrophomonas maltophilia — intrinsically MDR, often hospital-acquired pneumonia in ventilated/immunocompromised",
    resistance: "Two intrinsic β-lactamases (L1 metallo + L2 serine) → resistant to all β-lactams including carbapenems. Carbapenem exposure SELECTS for it.",
    color: "hsl(210 75% 50%)",
    firstLine: [
      { name: "Co-trimoxazole (TMP-SMX)", rationale: "Drug of choice — high-dose IV for severe infection." },
    ],
    alternatives: [
      { name: "Levofloxacin", rationale: "Useful if sulfa allergy; emerging resistance." },
      { name: "Minocycline / tigecycline", rationale: "Good in vitro activity; oral minocycline an option for step-down." },
      { name: "Ceftazidime-avibactam + aztreonam, or cefiderocol", rationale: "Reserve for severe / multi-resistant cases." },
    ],
    avoid: [
      { name: "Carbapenems, pip-tazobactam, ceftazidime alone", why: "Intrinsically resistant via L1 MBL + L2 ESBL; carbapenem use can promote Stenotrophomonas overgrowth." },
    ],
    pearls: [
      "Always consider in ventilated patients with new pneumonia after broad-spectrum (especially carbapenem) therapy.",
      "Co-trimoxazole + minocycline or co-trimoxazole + levofloxacin for severe pneumonia / bacteraemia.",
    ],
  },
];

const MDRGramNegativeSelector = () => {
  const [selected, setSelected] = useState<OrgKey>("kpc");
  const org = ORGANISMS.find((o) => o.key === selected)!;

  return (
    <DiagramFigure
      id="mdr-gram-negative-selector"
      title="Mdr gram negative selector"
      description="Auto-generated wrapper for the Mdr gram negative selector anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
          <div className="rounded-xl border border-border bg-card p-4 my-6">
        <h3 className="text-lg font-semibold text-foreground">
          MDR Gram-negative agent selector
        </h3>
        <p className="text-xs text-muted-foreground mb-4">
          Pick a resistant organism / phenotype to see the first-line agent, alternatives,
          what to avoid, and a brief mechanistic rationale. Aligned with IDSA 2024 AMR
          guidance — for revision use only, not a prescribing tool.
        </p>
  
        {/* Organism chips */}
        <div className="flex flex-wrap gap-2 mb-4">
          {ORGANISMS.map((o) => (
            <button
              key={o.key}
              onClick={() => setSelected(o.key)}
              className="text-xs px-3 py-1.5 rounded-full border transition-all"
              style={{
                backgroundColor: selected === o.key ? `${o.color}26` : "transparent",
                borderColor: selected === o.key ? o.color : "hsl(var(--border))",
                color: selected === o.key ? o.color : "hsl(var(--foreground))",
                fontWeight: selected === o.key ? 600 : 500,
              }}
            >
              {o.short}
            </button>
          ))}
        </div>
  
        {/* Header card */}
        <div
          className="rounded-lg border-l-4 p-3 mb-3"
          style={{ borderLeftColor: org.color, backgroundColor: `${org.color}10` }}
        >
          <p className="text-xs uppercase tracking-wide font-semibold" style={{ color: org.color }}>
            Selected organism / phenotype
          </p>
          <p className="text-base font-semibold text-foreground mt-1">{org.full}</p>
          <p className="text-xs text-muted-foreground mt-1 leading-snug italic">
            {org.resistance}
          </p>
        </div>
  
        {/* Three-column recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* First-line */}
          <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/5 p-3">
            <p className="text-xs uppercase tracking-wide font-semibold text-emerald-600 dark:text-emerald-400 mb-2">
              ✓ First-line
            </p>
            <div className="space-y-2">
              {org.firstLine.map((a) => (
                <div key={a.name} className="rounded-md border border-border bg-background/60 p-2">
                  <p className="text-xs font-semibold text-foreground">{a.name}</p>
                  <p className="text-[11px] text-muted-foreground leading-snug mt-0.5">{a.rationale}</p>
                </div>
              ))}
            </div>
          </div>
  
          {/* Alternatives */}
          <div className="rounded-lg border border-amber-500/40 bg-amber-500/5 p-3">
            <p className="text-xs uppercase tracking-wide font-semibold text-amber-600 dark:text-amber-400 mb-2">
              ↻ Alternatives / salvage
            </p>
            <div className="space-y-2">
              {org.alternatives.map((a) => (
                <div key={a.name} className="rounded-md border border-border bg-background/60 p-2">
                  <p className="text-xs font-semibold text-foreground">{a.name}</p>
                  <p className="text-[11px] text-muted-foreground leading-snug mt-0.5">{a.rationale}</p>
                </div>
              ))}
            </div>
          </div>
  
          {/* Avoid */}
          <div className="rounded-lg border border-rose-500/40 bg-rose-500/5 p-3">
            <p className="text-xs uppercase tracking-wide font-semibold text-rose-600 dark:text-rose-400 mb-2">
              ✗ Avoid
            </p>
            <div className="space-y-2">
              {org.avoid.map((a) => (
                <div key={a.name} className="rounded-md border border-border bg-background/60 p-2">
                  <p className="text-xs font-semibold text-foreground">{a.name}</p>
                  <p className="text-[11px] text-muted-foreground leading-snug mt-0.5">{a.why}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
  
        {/* Pearls */}
        <div className="mt-3 rounded-lg border border-border bg-muted/30 p-3">
          <p className="text-xs uppercase tracking-wide font-semibold text-foreground mb-1.5">
            Clinical pearls
          </p>
          <ul className="list-disc list-inside space-y-1">
            {org.pearls.map((p, i) => (
              <li key={i} className="text-xs text-muted-foreground leading-snug">{p}</li>
            ))}
          </ul>
        </div>
  
        {/* Inhibitor reference table */}
        <div className="mt-4 rounded-lg border border-border bg-background p-3">
          <p className="text-xs uppercase tracking-wide font-semibold text-foreground mb-2">
            β-lactamase inhibitor coverage — quick reference
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-[11px]">
              <thead>
                <tr className="text-left border-b border-border">
                  <th className="py-1.5 pr-2 font-semibold">Inhibitor</th>
                  <th className="py-1.5 px-2 font-semibold">Class A (ESBL)</th>
                  <th className="py-1.5 px-2 font-semibold">Class A (KPC)</th>
                  <th className="py-1.5 px-2 font-semibold">Class B (NDM/MBL)</th>
                  <th className="py-1.5 px-2 font-semibold">Class C (AmpC)</th>
                  <th className="py-1.5 px-2 font-semibold">Class D (OXA-48)</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[
                  ["Clavulanate / tazobactam / sulbactam", "✓", "✗", "✗", "✗", "✗"],
                  ["Avibactam", "✓", "✓", "✗", "✓", "✓"],
                  ["Vaborbactam", "✓", "✓", "✗", "partial", "✗"],
                  ["Relebactam", "✓", "✓", "✗", "✓", "✗"],
                  ["Durlobactam", "✓", "✓", "✗", "✓", "✓ (incl. OXA-23)"],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-border/50 last:border-0">
                    {row.map((cell, j) => (
                      <td key={j} className={`py-1.5 ${j === 0 ? "pr-2 font-medium text-foreground" : "px-2 text-center"}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-muted-foreground italic mt-2">
            No currently available β-lactamase inhibitor covers metallo-β-lactamases (NDM/VIM/IMP) → cefiderocol or aztreonam-avibactam combinations are needed.
          </p>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default MDRGramNegativeSelector;
