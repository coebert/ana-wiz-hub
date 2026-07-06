import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DiagramFigure } from "./_shared/DiagramFigure";

type Mode = "tertiary" | "quaternary";

interface DrugRow {
  name: string;
  type: Mode;
  use: string;
  pKa?: string;
  note: string;
}

const drugs: DrugRow[] = [
  { name: "Lidocaine", type: "tertiary", use: "Local anaesthetic", pKa: "7.9", note: "Unionised form crosses nerve membrane → re-ionises inside axoplasm → blocks Na⁺ channel from within." },
  { name: "Bupivacaine", type: "tertiary", use: "Local anaesthetic", pKa: "8.1", note: "Higher pKa → slower onset than lidocaine; high lipid solubility → long duration." },
  { name: "Morphine", type: "tertiary", use: "Opioid", pKa: "8.0", note: "Crosses BBB (slowly — relatively hydrophilic) and placenta. Active metabolite M6G also crosses." },
  { name: "Fentanyl", type: "tertiary", use: "Opioid", pKa: "8.4", note: "Highly lipid-soluble tertiary amine → rapid CNS penetration despite >90% ionised at pH 7.4." },
  { name: "Atropine", type: "tertiary", use: "Antimuscarinic", pKa: "9.8", note: "Crosses BBB → central anticholinergic effects (sedation, delirium, mydriasis from systemic absorption)." },
  { name: "Ephedrine", type: "tertiary", use: "Vasopressor", pKa: "9.6", note: "Crosses BBB → CNS stimulation; crosses placenta → safe in obstetrics for maternal hypotension (now superseded by phenylephrine)." },
  { name: "Ketamine", type: "tertiary", use: "IV anaesthetic", pKa: "7.5", note: "Largely unionised at physiological pH → rapid BBB crossing → fast onset of dissociative anaesthesia." },

  { name: "Glycopyrrolate", type: "quaternary", use: "Antimuscarinic", note: "Permanent +ve charge → does NOT cross BBB or placenta. First-line antisialagogue and pairing for neostigmine reversal." },
  { name: "Neostigmine", type: "quaternary", use: "Anticholinesterase", note: "Charged → confined to NMJ; cannot reverse central anticholinergic syndrome (use physostigmine, a tertiary amine, for that)." },
  { name: "Suxamethonium", type: "quaternary", use: "Depolarising NMBA", note: "Two quaternary nitrogens (bis-quaternary). Cannot cross BBB or placenta — safe NMBA for foetus." },
  { name: "Rocuronium", type: "quaternary", use: "Non-depolarising NMBA", note: "Aminosteroid quaternary ammonium. Confined to extracellular space → low Vd, predictable dosing on lean body weight." },
  { name: "Vecuronium / Pancuronium", type: "quaternary", use: "Non-depolarising NMBA", note: "Same family as rocuronium. Quaternary charge prevents BBB and placental crossing — does not affect foetus or sedation level." },
  { name: "Atracurium / Cisatracurium", type: "quaternary", use: "Non-depolarising NMBA", note: "Bis-quaternary benzylisoquinoliniums. Hofmann elimination is independent of organ function." },
  { name: "Hyoscine butylbromide (Buscopan)", type: "quaternary", use: "Antispasmodic", note: "Quaternary version of hyoscine — peripheral antimuscarinic without central effects (vs. hyoscine hydrobromide, which is tertiary and crosses BBB → antiemetic, sedative)." },
];

// Stylised SVG of the two amine forms
const AmineSVG = ({ mode }: { mode: Mode }) => {
  const isQuat = mode === "quaternary";
  return (
    <svg viewBox="0 0 360 220" className="w-full h-auto">
      {/* Background membrane indicator */}
      <defs>
        <linearGradient id="membrane" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--muted))" stopOpacity="0.6" />
          <stop offset="100%" stopColor="hsl(var(--muted))" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* Membrane on right */}
      <rect x="240" y="0" width="120" height="220" fill="url(#membrane)" />
      <text x="300" y="18" textAnchor="middle" fontSize="9" fill="hsl(var(--muted-foreground))" fontFamily="sans-serif">
        lipid membrane
      </text>

      {/* Central nitrogen */}
      <circle cx="120" cy="110" r="26" fill="hsl(var(--background))" stroke={isQuat ? "hsl(var(--destructive))" : "hsl(var(--primary))"} strokeWidth="2" />
      <text x="120" y="115" textAnchor="middle" fontSize="18" fontWeight={700} fill={isQuat ? "hsl(var(--destructive))" : "hsl(var(--primary))"} fontFamily="serif">
        N{isQuat ? "⁺" : ""}
      </text>

      {/* R groups */}
      {/* R1 */}
      <line x1="120" y1="84" x2="120" y2="48" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
      <RGroup cx={120} cy={36} label="R₁" />

      {/* R2 */}
      <line x1="98" y1="125" x2="60" y2="160" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
      <RGroup cx={50} cy={170} label="R₂" />

      {/* R3 */}
      <line x1="142" y1="125" x2="180" y2="160" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
      <RGroup cx={190} cy={170} label="R₃" />

      {/* R4 (only in quaternary) or lone pair (in tertiary) */}
      {isQuat ? (
        <>
          <line x1="146" y1="110" x2="186" y2="110" stroke="hsl(var(--foreground))" strokeWidth="1.5" />
          <RGroup cx={196} cy={110} label="R₄" />
        </>
      ) : (
        <>
          <circle cx={158} cy={110} r={3} fill="hsl(var(--primary))" />
          <circle cx={166} cy={110} r={3} fill="hsl(var(--primary))" />
          <text x={205} y={114} fontSize="9" fill="hsl(var(--muted-foreground))" fontFamily="sans-serif">
            lone pair
          </text>
        </>
      )}

      {/* Crossing arrow */}
      {isQuat ? (
        <g>
          <line x1="160" y1="60" x2="240" y2="60" stroke="hsl(var(--destructive))" strokeWidth="2" />
          <line x1="232" y1="48" x2="248" y2="72" stroke="hsl(var(--destructive))" strokeWidth="2" />
          <line x1="248" y1="48" x2="232" y2="72" stroke="hsl(var(--destructive))" strokeWidth="2" />
          <text x="200" y="50" textAnchor="middle" fontSize="9" fill="hsl(var(--destructive))" fontWeight={600} fontFamily="sans-serif">
            blocked
          </text>
        </g>
      ) : (
        <g>
          <path d="M160 60 Q 220 30 290 50" stroke="hsl(var(--primary))" strokeWidth="2" fill="none" markerEnd="url(#arrowGreen)" strokeDasharray="3 3" />
          <text x="220" y="35" textAnchor="middle" fontSize="9" fill="hsl(var(--primary))" fontWeight={600} fontFamily="sans-serif">
            unionised form crosses
          </text>
        </g>
      )}

      <defs>
        <marker id="arrowGreen" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="hsl(var(--primary))" />
        </marker>
      </defs>

      {/* Charge state caption */}
      <text x="120" y="200" textAnchor="middle" fontSize="10" fill="hsl(var(--muted-foreground))" fontFamily="sans-serif">
        {isQuat ? "Permanent positive charge — pH-independent" : "Equilibrium: protonated ⇌ unionised (depends on pKa & pH)"}
      </text>
    </svg>
  );
};

const RGroup = ({ cx, cy, label }: { cx: number; cy: number; label: string }) => (
  <g>
    <circle cx={cx} cy={cy} r={12} fill="hsl(var(--muted))" stroke="hsl(var(--border))" />
    <text x={cx} y={cy + 4} textAnchor="middle" fontSize="10" fill="hsl(var(--foreground))" fontFamily="sans-serif">
      {label}
    </text>
  </g>
);

export const AmineComparisonDiagram = () => {
  const [mode, setMode] = useState<Mode>("tertiary");
  const filtered = drugs.filter((d) => d.type === mode);

  return (
    <DiagramFigure
      id="amine-comparison-diagram"
      title="Amine comparison"
      description="Auto-generated wrapper for the Amine comparison anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <Card className="p-6 bg-gradient-to-br from-background to-muted/20">
        <div className="flex flex-col gap-1 mb-4">
          <h3 className="text-xl font-serif font-bold text-foreground">
            Tertiary vs Quaternary Amines
          </h3>
          <p className="text-sm text-muted-foreground">
            Why one nitrogen substitution determines whether a drug crosses the blood–brain barrier, the placenta, and the cell membrane.
          </p>
        </div>
  
        <div className="flex gap-2 mb-4">
          <Button
            variant={mode === "tertiary" ? "default" : "outline"}
            onClick={() => setMode("tertiary")}
            className="flex-1"
          >
            Tertiary amine (R₃N)
          </Button>
          <Button
            variant={mode === "quaternary" ? "default" : "outline"}
            onClick={() => setMode("quaternary")}
            className="flex-1"
          >
            Quaternary amine (R₄N⁺)
          </Button>
        </div>
  
        <div className="grid lg:grid-cols-5 gap-4">
          {/* Diagram + properties */}
          <div className="lg:col-span-2 space-y-3">
            <div className="rounded-lg border border-border bg-card/50 p-3">
              <AmineSVG mode={mode} />
            </div>
  
            <div className="rounded-lg border border-border bg-card/50 p-3 space-y-2 text-xs">
              <Property label="Charge" value={mode === "tertiary" ? "Variable — depends on pKa & pH (Henderson–Hasselbalch)" : "Permanent positive (+1)"} />
              <Property label="Water solubility" value={mode === "tertiary" ? "Moderate — increases when protonated" : "High (always charged)"} />
              <Property label="Lipid solubility" value={mode === "tertiary" ? "Unionised form is highly lipid-soluble" : "Very low — cannot dissolve in lipid bilayer"} />
              <Property label="BBB penetration" value={mode === "tertiary" ? "Yes (via unionised form)" : "No"} />
              <Property label="Placental crossing" value={mode === "tertiary" ? "Yes" : "No — foetus protected"} />
              <Property label="GI absorption" value={mode === "tertiary" ? "Generally good (oral bioavailability variable)" : "Poor — must be given parenterally"} />
              <Property label="Vd" value={mode === "tertiary" ? "Often large — distributes into tissue" : "Small — confined to extracellular fluid"} />
            </div>
          </div>
  
          {/* Drug list */}
          <div className="lg:col-span-3 rounded-lg border border-border bg-card/50 overflow-hidden">
            <div className="px-3 py-2 bg-muted/40 border-b border-border flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                {mode === "tertiary" ? "Tertiary-amine drugs in anaesthesia" : "Quaternary-amine drugs in anaesthesia"}
              </span>
              <Badge variant="outline" className="text-[10px]">{filtered.length} drugs</Badge>
            </div>
            <div className="max-h-[420px] overflow-y-auto divide-y divide-border">
              {filtered.map((d) => (
                <div key={d.name} className="px-3 py-2.5">
                  <div className="flex items-baseline justify-between gap-2 mb-0.5">
                    <span className="font-medium text-foreground text-sm">{d.name}</span>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wide">{d.use}{d.pKa && ` · pKa ${d.pKa}`}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-snug">{d.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
  
        {/* Clinical pearls strip */}
        <div className="grid md:grid-cols-3 gap-3 mt-4">
          <Pearl
            title="Reversal pairing"
            body="Neostigmine (quaternary, can't cross BBB) is paired with glycopyrrolate (also quaternary) so neither produces central effects. If you used atropine (tertiary), you'd risk central anticholinergic syndrome — useful in elderly only when avoiding bradycardia matters more."
          />
          <Pearl
            title="Obstetric vasopressor"
            body="Phenylephrine (a tertiary amine, but at physiological pH largely ionised) crosses placenta minimally and is now first-line for spinal hypotension at caesarean section over ephedrine, which crossed more freely and caused foetal acidosis."
          />
          <Pearl
            title="Local anaesthetic onset"
            body="LAs are tertiary amines. Only the unionised base crosses the nerve membrane, then re-ionises in the axoplasm to block the Na⁺ channel from within. Higher pKa = more ionised at pH 7.4 = slower onset (bupivacaine 8.1 vs lidocaine 7.9)."
          />
        </div>
      </Card>
    </DiagramFigure>
  );
};

const Property = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col">
    <span className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</span>
    <span className="text-foreground">{value}</span>
  </div>
);

const Pearl = ({ title, body }: { title: string; body: string }) => (
      <div className="rounded-lg border border-border bg-card/50 p-3">
    <div className="text-xs font-semibold text-foreground mb-1">{title}</div>
    <div className="text-xs text-muted-foreground leading-relaxed">{body}</div>
  </div>
  );

export default AmineComparisonDiagram;
