import { useState } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

/**
 * Ambler classification of β-lactamases (A-D) with substrate spectrum
 * and β-lactamase inhibitor coverage.
 */

type ClassKey = "A_esbl" | "A_kpc" | "B" | "C" | "D";

interface BLClass {
  key: ClassKey;
  ambler: string;
  group: string;
  mechanism: string;
  examples: string;
  organisms: string;
  substrates: string;
  spares: string;
  inhibitors: { clav: Cov; tazo: Cov; avi: Cov; vabo: Cov; rele: Cov };
  clinical: string;
  color: string;
}

type Cov = "yes" | "no" | "partial";

const CLASSES: BLClass[] = [
  {
    key: "A_esbl",
    ambler: "Class A",
    group: "ESBLs (serine)",
    mechanism: "Serine β-lactamase — extended-spectrum hydrolysis of oxyimino-cephalosporins.",
    examples: "TEM-3+, SHV-2+, CTX-M (most common worldwide)",
    organisms: "E. coli, Klebsiella spp., other Enterobacterales",
    substrates: "Penicillins, 1st–4th gen cephalosporins (incl. ceftriaxone, cefepime), aztreonam",
    spares: "Carbapenems, cephamycins (cefoxitin)",
    inhibitors: { clav: "yes", tazo: "yes", avi: "yes", vabo: "yes", rele: "yes" },
    clinical: "Treat severe infection with carbapenem (MERINO trial). Pip-tazobactam acceptable only for non-severe UTI.",
    color: "hsl(15 90% 55%)",
  },
  {
    key: "A_kpc",
    ambler: "Class A",
    group: "Carbapenemases (serine)",
    mechanism: "Serine carbapenemase — hydrolyses all β-lactams including carbapenems.",
    examples: "KPC (KPC-2, KPC-3), GES, IMI, SME",
    organisms: "Klebsiella pneumoniae (esp. ST258), other Enterobacterales",
    substrates: "All penicillins, cephalosporins, carbapenems, aztreonam",
    spares: "Nothing β-lactam (unless protected by inhibitor)",
    inhibitors: { clav: "no", tazo: "no", avi: "yes", vabo: "yes", rele: "yes" },
    clinical: "Ceftazidime-avibactam, meropenem-vaborbactam, or imipenem-relebactam. Watch for KPC-3 D179Y → ceftazidime-avibactam resistance.",
    color: "hsl(330 70% 55%)",
  },
  {
    key: "B",
    ambler: "Class B",
    group: "Metallo-β-lactamases (MBLs)",
    mechanism: "Zn²⁺-dependent — hydrolyses β-lactam ring via active-site zinc.",
    examples: "NDM (-1 to -19), VIM, IMP, SPM, GIM",
    organisms: "Enterobacterales (esp. NDM in Klebsiella, E. coli), Pseudomonas aeruginosa, Acinetobacter",
    substrates: "All β-lactams INCLUDING carbapenems",
    spares: "Aztreonam (monobactam) — but usually co-produced ESBL hydrolyses it in practice",
    inhibitors: { clav: "no", tazo: "no", avi: "no", vabo: "no", rele: "no" },
    clinical: "Cefiderocol (siderophore — Trojan-horse uptake) or aztreonam + ceftazidime-avibactam (avibactam protects aztreonam from co-produced ESBL/KPC).",
    color: "hsl(280 70% 55%)",
  },
  {
    key: "C",
    ambler: "Class C",
    group: "AmpC cephalosporinases",
    mechanism: "Serine β-lactamase — chromosomal (inducible) or plasmid-mediated. Selected during 3rd-gen cephalosporin therapy.",
    examples: "AmpC (chromosomal); CMY, DHA, FOX (plasmid)",
    organisms: "SPACE/SPICE-M: Serratia, Pseudomonas, Acinetobacter, Citrobacter freundii, Enterobacter cloacae complex, Morganella, Providencia, Hafnia",
    substrates: "Penicillins, cephalosporins (incl. cefoxitin), aztreonam",
    spares: "Cefepime (zwitterion, low affinity), carbapenems",
    inhibitors: { clav: "no", tazo: "no", avi: "yes", vabo: "partial", rele: "yes" },
    clinical: "Cefepime preferred (carbapenem-sparing). Avoid 3rd-gen cephalosporins for serious infection — induction risk with Enterobacter cloacae. Pip-tazobactam unreliable at high inoculum.",
    color: "hsl(25 90% 55%)",
  },
  {
    key: "D",
    ambler: "Class D",
    group: "OXA-type oxacillinases",
    mechanism: "Serine β-lactamase — hydrolyses oxacillin/cloxacillin; some carbapenemase activity.",
    examples: "OXA-48-like (Enterobacterales); OXA-23, -24/40, -58, -143 (Acinetobacter)",
    organisms: "OXA-48 in K. pneumoniae (Mediterranean/Middle East endemic); OXA-23 etc. in CRAB",
    substrates: "Penicillins; carbapenems (weak hydrolysis — MICs often just above breakpoint); broad-spectrum cephalosporins (only if co-produced ESBL)",
    spares: "Broad-spectrum cephalosporins (if no co-produced ESBL); aztreonam",
    inhibitors: { clav: "no", tazo: "no", avi: "yes", vabo: "no", rele: "no" },
    clinical: "OXA-48 → ceftazidime-avibactam. CRAB OXA-23 → sulbactam-durlobactam (durlobactam covers OXA-23) or cefiderocol.",
    color: "hsl(160 70% 40%)",
  },
];

const COV_DISPLAY: Record<Cov, { symbol: string; label: string; cls: string }> = {
  yes: { symbol: "✓", label: "Inhibits", cls: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10" },
  no: { symbol: "✗", label: "No effect", cls: "text-rose-600 dark:text-rose-400 bg-rose-500/10" },
  partial: { symbol: "~", label: "Partial / variable", cls: "text-amber-600 dark:text-amber-400 bg-amber-500/10" },
};

const INHIBITORS = [
  { key: "clav" as const, name: "Clavulanate", sub: "(co-amoxiclav, co-ticarclav)" },
  { key: "tazo" as const, name: "Tazobactam", sub: "(pip-tazobactam, ceftolozane-tazo)" },
  { key: "avi" as const, name: "Avibactam", sub: "(ceftazidime-avi, aztreonam-avi)" },
  { key: "vabo" as const, name: "Vaborbactam", sub: "(meropenem-vaborbactam)" },
  { key: "rele" as const, name: "Relebactam", sub: "(imipenem-relebactam)" },
];

const BetaLactamaseClassificationTable = () => {
  const [selected, setSelected] = useState<ClassKey>("A_kpc");
  const cls = CLASSES.find((c) => c.key === selected)!;

  return (
    <DiagramFigure
      id="beta-lactamase-classification-table"
      title="Beta lactamase classification table"
      description="Auto-generated wrapper for the Beta lactamase classification table anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="rounded-xl border border-border bg-card p-4 my-6">
        <h3 className="text-lg font-semibold text-foreground">
          β-lactamase classification — Ambler classes A–D
        </h3>
        <p className="text-xs text-muted-foreground mb-4">
          Click a row in the matrix to see organisms, substrate spectrum, sparing
          agents and clinical implications. Inhibitor coverage shown as ✓ inhibited
          / ✗ no effect / ~ partial.
        </p>
  
        {/* Coverage matrix */}
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-[11px]">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="py-2 px-2 text-left font-semibold sticky left-0 bg-muted/50">Ambler / group</th>
                <th className="py-2 px-2 text-left font-semibold">Key examples</th>
                <th className="py-2 px-2 text-left font-semibold min-w-[180px]">Substrates hydrolysed</th>
                {INHIBITORS.map((inh) => (
                  <th key={inh.key} className="py-2 px-2 text-center font-semibold">
                    <div>{inh.name}</div>
                    <div className="text-[9px] font-normal text-muted-foreground">{inh.sub}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CLASSES.map((c) => {
                const isActive = selected === c.key;
                return (
                  <tr
                    key={c.key}
                    onClick={() => setSelected(c.key)}
                    className="border-b border-border last:border-0 cursor-pointer transition-colors hover:bg-muted/30"
                    style={{
                      backgroundColor: isActive ? `${c.color}14` : undefined,
                    }}
                  >
                    <td
                      className="py-2 px-2 sticky left-0 border-l-4"
                      style={{
                        borderLeftColor: c.color,
                        backgroundColor: isActive ? `${c.color}14` : "hsl(var(--card))",
                      }}
                    >
                      <div className="font-semibold text-foreground">{c.ambler}</div>
                      <div className="text-muted-foreground text-[10px]">{c.group}</div>
                    </td>
                    <td className="py-2 px-2 text-foreground font-mono text-[10.5px]">{c.examples}</td>
                    <td className="py-2 px-2 text-muted-foreground leading-snug">{c.substrates}</td>
                    {INHIBITORS.map((inh) => {
                      const v = c.inhibitors[inh.key];
                      const d = COV_DISPLAY[v];
                      return (
                            <td key={inh.key} className="py-2 px-2 text-center">
                          <span
                            className={`inline-flex items-center justify-center w-7 h-7 rounded-full font-bold ${d.cls}`}
                            title={d.label}
                          >
                            {d.symbol}
                          </span>
                        </td>
    );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
  
        {/* Legend */}
        <div className="mt-2 flex flex-wrap gap-3 text-[10px] text-muted-foreground">
          {(Object.keys(COV_DISPLAY) as Cov[]).map((k) => (
            <div key={k} className="flex items-center gap-1.5">
              <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full font-bold ${COV_DISPLAY[k].cls}`}>
                {COV_DISPLAY[k].symbol}
              </span>
              <span>{COV_DISPLAY[k].label}</span>
            </div>
          ))}
        </div>
  
        {/* Selected detail */}
        <div
          className="mt-4 rounded-lg border-l-4 p-3"
          style={{ borderLeftColor: cls.color, backgroundColor: `${cls.color}10` }}
        >
          <p className="text-xs uppercase tracking-wide font-semibold" style={{ color: cls.color }}>
            {cls.ambler} — {cls.group}
          </p>
          <p className="text-xs text-foreground mt-1 leading-snug">
            <span className="font-semibold">Mechanism: </span>
            <span className="text-muted-foreground">{cls.mechanism}</span>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
            <div className="rounded-md border border-border bg-background/50 p-2">
              <p className="text-[10px] uppercase tracking-wide font-semibold text-muted-foreground">Typical organisms</p>
              <p className="text-xs text-foreground leading-snug mt-0.5">{cls.organisms}</p>
            </div>
            <div className="rounded-md border border-border bg-background/50 p-2">
              <p className="text-[10px] uppercase tracking-wide font-semibold text-muted-foreground">Spares (still active)</p>
              <p className="text-xs text-foreground leading-snug mt-0.5">{cls.spares}</p>
            </div>
          </div>
          <div className="mt-2 rounded-md border border-border bg-background/50 p-2">
            <p className="text-[10px] uppercase tracking-wide font-semibold text-muted-foreground">Clinical approach</p>
            <p className="text-xs text-foreground leading-snug mt-0.5">{cls.clinical}</p>
          </div>
        </div>
  
        <p className="text-[10px] text-muted-foreground italic mt-3">
          Bush-Jacoby functional classification overlaps Ambler structural: 2be = ESBLs (Class A), 2f = serine carbapenemases (KPC), 3 = MBLs (Class B), 1 = AmpC (Class C), 2d/2df = OXA (Class D). For revision use only.
        </p>
      </div>
    </DiagramFigure>
  );
};

export default BetaLactamaseClassificationTable;
