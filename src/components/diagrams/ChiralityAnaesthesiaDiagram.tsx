import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DiagramFigure } from "./_shared/DiagramFigure";

type Form = "racemate" | "single" | "achiral-mix";
type DrugClass =
  | "IV induction"
  | "Volatile"
  | "Local anaesthetic"
  | "Opioid"
  | "NMBA"
  | "Sedative"
  | "Vasoactive";

interface ChiralDrug {
  name: string;
  drugClass: DrugClass;
  form: Form;
  enantiomer?: string;
  centres: number | "axial";
  reason: string;
  detail: string;
}

const drugs: ChiralDrug[] = [
  {
    name: "Bupivacaine",
    drugClass: "Local anaesthetic",
    form: "racemate",
    centres: 1,
    reason: "Racemate retained — historic; cardiotoxic R(+) isomer is the problem",
    detail:
      "R(+) bupivacaine binds cardiac Na⁺ channels for far longer than S(−), producing the notorious refractory VF on accidental IV injection. Levobupivacaine and ropivacaine were developed specifically to remove this enantiomer.",
  },
  {
    name: "Levobupivacaine",
    drugClass: "Local anaesthetic",
    form: "single",
    enantiomer: "S(−)",
    centres: 1,
    reason: "Single enantiomer — same block, less cardiotoxicity",
    detail:
      "Pure S(−) isomer of bupivacaine. Equipotent for sensory block but ~30–40% less cardiotoxic and CNS-toxic than racemic bupivacaine.",
  },
  {
    name: "Ropivacaine",
    drugClass: "Local anaesthetic",
    form: "single",
    enantiomer: "S(−)",
    centres: 1,
    reason: "Single enantiomer — designed-in safety + motor sparing",
    detail:
      "Pure S(−) propyl analogue. Less lipid-soluble than bupivacaine → less motor block at low concentrations (useful for labour epidurals) and a better cardiac safety margin.",
  },
  {
    name: "Prilocaine",
    drugClass: "Local anaesthetic",
    form: "racemate",
    centres: 1,
    reason: "Racemate — enantiomers clinically indistinguishable",
    detail:
      "Both enantiomers have similar potency and toxicity. No clinical or commercial driver to separate them. Methaemoglobinaemia risk relates to the o-toluidine metabolite, not stereochemistry.",
  },
  {
    name: "Ketamine (racemic)",
    drugClass: "IV induction",
    form: "racemate",
    centres: 1,
    reason: "Racemate widely used — single isomer (esketamine) available where licensed",
    detail:
      "S(+) ketamine is ~2× more potent at the NMDA receptor and produces less psychomimetic emergence than R(−). Racemate is cheaper and globally familiar; esketamine is preferred where cost allows.",
  },
  {
    name: "Esketamine",
    drugClass: "IV induction",
    form: "single",
    enantiomer: "S(+)",
    centres: 1,
    reason: "Single enantiomer — higher NMDA potency, fewer psychomimetic effects",
    detail:
      "Pure S(+) isomer. Roughly twice as potent so doses are halved. Faster recovery and lower incidence of emergence phenomena compared with the racemate.",
  },
  {
    name: "Thiopentone",
    drugClass: "IV induction",
    form: "racemate",
    centres: 1,
    reason: "Racemate — S(−) is more potent but separation never pursued",
    detail:
      "S(−) thiopentone is roughly twice as potent as R(+) at GABA_A. Because thiopentone is cheap, off-patent, and on the way out, no manufacturer has commercialised the single enantiomer.",
  },
  {
    name: "Etomidate",
    drugClass: "IV induction",
    form: "single",
    enantiomer: "R(+)",
    centres: 1,
    reason: "Single enantiomer — only R(+) is hypnotic",
    detail:
      "Marketed as the pure R(+) isomer because S(−) etomidate has essentially no GABA_A activity. Eliminating it removes inert ballast and improves dose precision.",
  },
  {
    name: "Propofol",
    drugClass: "IV induction",
    form: "achiral-mix",
    centres: 0,
    reason: "Not chiral — symmetric 2,6-di-isopropylphenol",
    detail:
      "Included for contrast: the two iso-propyl groups sit symmetrically around the phenol, so propofol has no chiral centre and the issue does not arise.",
  },
  {
    name: "Isoflurane",
    drugClass: "Volatile",
    form: "racemate",
    centres: 1,
    reason: "Racemate — single-enantiomer separation not commercially viable",
    detail:
      "S(+) isoflurane is modestly more potent at GABA_A in vitro, but separating gaseous enantiomers at scale is technically and economically impractical for a cheap inhalational agent.",
  },
  {
    name: "Desflurane",
    drugClass: "Volatile",
    form: "racemate",
    centres: 1,
    reason: "Racemate — same reason as isoflurane",
    detail:
      "Chiral at the α-carbon but used as a racemate. Clinical differences between enantiomers are small and gas-phase chiral separation is impractical.",
  },
  {
    name: "Sevoflurane",
    drugClass: "Volatile",
    form: "achiral-mix",
    centres: 0,
    reason: "Not chiral — fluoromethyl ether is symmetric",
    detail:
      "No chiral centre, so racemate vs single-enantiomer is a non-question. Useful contrast to isoflurane/desflurane.",
  },
  {
    name: "Halothane",
    drugClass: "Volatile",
    form: "racemate",
    centres: 1,
    reason: "Racemate — historical, now largely withdrawn",
    detail:
      "Chiral at the carbon bearing F, Cl and Br. Used as a racemate; never separated commercially.",
  },
  {
    name: "Atracurium",
    drugClass: "NMBA",
    form: "racemate",
    centres: 4,
    reason: "Mixture of 10 stereoisomers — original formulation",
    detail:
      "Four chiral centres give 16 possible isomers; only 10 are produced. Mixture works clinically but the cis-cis isomer (cisatracurium) drives most of the activity with less histamine release.",
  },
  {
    name: "Cisatracurium",
    drugClass: "NMBA",
    form: "single",
    enantiomer: "1R-cis,1′R-cis",
    centres: 4,
    reason: "Single isomer — purified to remove histamine-releasing isomers",
    detail:
      "The pure 1R-cis,1′R-cis isomer of atracurium. ~3× more potent and produces minimal histamine release, allowing safer use in cardiovascularly fragile and asthmatic patients.",
  },
  {
    name: "Mivacurium",
    drugClass: "NMBA",
    form: "racemate",
    centres: 2,
    reason: "Mixture — three isomers, each with different esterase kinetics",
    detail:
      "cis-cis, cis-trans and trans-trans isomers in fixed proportion. The trans-trans isomer dominates activity; the cis-cis is metabolised more slowly by plasma cholinesterase.",
  },
  {
    name: "Methadone",
    drugClass: "Opioid",
    form: "racemate",
    centres: 1,
    reason: "Racemate — R is the μ-opioid, S is the NMDA antagonist",
    detail:
      "R(−) methadone provides analgesia at μ; S(+) methadone is the NMDA antagonist (and the QTc offender). Both contribute to the chronic-pain profile, so the racemate is retained.",
  },
  {
    name: "Tramadol",
    drugClass: "Opioid",
    form: "racemate",
    centres: 2,
    reason: "Racemate — enantiomers are complementary",
    detail:
      "(+)-tramadol favours μ-opioid agonism and serotonin reuptake inhibition; (−)-tramadol favours noradrenaline reuptake inhibition. The racemate gives the full multimodal effect.",
  },
  {
    name: "Morphine",
    drugClass: "Opioid",
    form: "single",
    enantiomer: "natural (−)",
    centres: 5,
    reason: "Single enantiomer — extracted from poppy as one isomer only",
    detail:
      "Natural product — biosynthesis produces only the active (−) enantiomer. The synthetic (+) isomer has no analgesic activity.",
  },
  {
    name: "Dexmedetomidine",
    drugClass: "Sedative",
    form: "single",
    enantiomer: "S(+)",
    centres: 1,
    reason: "Single enantiomer — only D-isomer is α2 agonist",
    detail:
      "The D-(dex) isomer of medetomidine is the active α2 agonist; the L-isomer is essentially inactive. Removing it doubles potency per mg and removes inert load.",
  },
  {
    name: "Adrenaline / Noradrenaline",
    drugClass: "Vasoactive",
    form: "single",
    enantiomer: "L(−)",
    centres: 1,
    reason: "Single enantiomer — physiological isomer is L(−)",
    detail:
      "Endogenous catecholamines are L(−). The D(+) enantiomers are far less active at α and β receptors. Synthetic preparations are sold as the pure L(−) isomer.",
  },
  {
    name: "Salbutamol",
    drugClass: "Vasoactive",
    form: "racemate",
    centres: 1,
    reason: "Racemate — R(−) is the bronchodilator, S(+) may be pro-inflammatory",
    detail:
      "R(−) salbutamol (levalbuterol) is the active β2 agonist. S(+) is suspected of pro-inflammatory effects in chronic use. The racemate is still the standard inhaler in most markets.",
  },
];

const classColors: Record<DrugClass, string> = {
  "IV induction": "bg-pharmacology/15 text-pharmacology border-pharmacology/30",
  Volatile: "bg-physics/15 text-physics border-physics/30",
  "Local anaesthetic": "bg-clinical/15 text-clinical border-clinical/30",
  Opioid: "bg-pharmacology/15 text-pharmacology border-pharmacology/30",
  NMBA: "bg-perioperative/15 text-perioperative border-perioperative/30",
  Sedative: "bg-icu/15 text-icu border-icu/30",
  Vasoactive: "bg-physiology/15 text-physiology border-physiology/30",
};

const formMeta: Record<Form, { label: string; chip: string; dot: string }> = {
  racemate: {
    label: "Racemate / mixture",
    chip: "bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30",
    dot: "bg-amber-500",
  },
  single: {
    label: "Single enantiomer",
    chip: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30",
    dot: "bg-emerald-500",
  },
  "achiral-mix": {
    label: "Not chiral",
    chip: "bg-muted text-muted-foreground border-border",
    dot: "bg-muted-foreground",
  },
};

const filterOptions: Array<{ key: "all" | DrugClass; label: string }> = [
  { key: "all", label: "All classes" },
  { key: "IV induction", label: "IV induction" },
  { key: "Volatile", label: "Volatile" },
  { key: "Local anaesthetic", label: "Local anaesthetics" },
  { key: "Opioid", label: "Opioids" },
  { key: "NMBA", label: "NMBAs" },
  { key: "Sedative", label: "Sedatives" },
  { key: "Vasoactive", label: "Vasoactive" },
];

export const ChiralityAnaesthesiaDiagram = () => {
  const [filter, setFilter] = useState<"all" | DrugClass>("all");
  const [selected, setSelected] = useState<string>(drugs[0].name);

  const visible = useMemo(
    () => (filter === "all" ? drugs : drugs.filter((d) => d.drugClass === filter)),
    [filter]
  );

  const active = drugs.find((d) => d.name === selected) ?? drugs[0];

  const counts = useMemo(() => {
    const c = { racemate: 0, single: 0, "achiral-mix": 0 } as Record<Form, number>;
    drugs.forEach((d) => (c[d.form] += 1));
    return c;
  }, []);

  return (
    <DiagramFigure
      id="chirality-anaesthesia-diagram"
      title="Chirality anaesthesia"
      description="Auto-generated wrapper for the Chirality anaesthesia anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <Card className="p-6 bg-gradient-to-br from-background to-muted/20">
        <div className="flex flex-col gap-1 mb-4">
          <h3 className="text-xl font-serif font-bold text-foreground">
            Chirality in Anaesthesia — racemate or single enantiomer?
          </h3>
          <p className="text-sm text-muted-foreground">
            Every chiral anaesthetic drug, the form it is sold in, and the clinical reason why.
          </p>
        </div>
  
        {/* Summary strip */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {(Object.keys(formMeta) as Form[]).map((f) => (
            <div
              key={f}
              className="rounded-lg border border-border bg-card/50 p-3 flex flex-col gap-1"
            >
              <div className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${formMeta[f].dot}`} />
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  {formMeta[f].label}
                </span>
              </div>
              <span className="text-2xl font-serif font-bold text-foreground">{counts[f]}</span>
            </div>
          ))}
        </div>
  
        {/* Class filter */}
        <div className="flex flex-wrap gap-2 mb-4">
          {filterOptions.map((o) => (
            <Button
              key={o.key}
              size="sm"
              variant={filter === o.key ? "default" : "outline"}
              onClick={() => setFilter(o.key)}
              className="h-7 text-xs"
            >
              {o.label}
            </Button>
          ))}
        </div>
  
        <div className="grid lg:grid-cols-5 gap-4">
          {/* Table */}
          <div className="lg:col-span-3 rounded-lg border border-border overflow-hidden bg-card/50">
            <div className="grid grid-cols-12 px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground bg-muted/40 border-b border-border">
              <div className="col-span-4">Drug</div>
              <div className="col-span-3">Class</div>
              <div className="col-span-2 text-center">Centres</div>
              <div className="col-span-3">Form</div>
            </div>
            <div className="max-h-[460px] overflow-y-auto divide-y divide-border">
              {visible.map((d) => {
                const isActive = d.name === selected;
                return (
                      <button
                    key={d.name}
                    onClick={() => setSelected(d.name)}
                    className={`w-full grid grid-cols-12 items-center px-3 py-2 text-left text-sm transition-colors ${
                      isActive ? "bg-primary/10" : "hover:bg-muted/40"
                    }`}
                  >
                    <div className="col-span-4">
                      <div className="font-medium text-foreground leading-tight">{d.name}</div>
                      {d.enantiomer && (
                        <div className="text-[11px] text-muted-foreground">{d.enantiomer}</div>
                      )}
                    </div>
                    <div className="col-span-3">
                      <Badge variant="outline" className={`text-[10px] ${classColors[d.drugClass]}`}>
                        {d.drugClass}
                      </Badge>
                    </div>
                    <div className="col-span-2 text-center text-xs text-muted-foreground">
                      {d.centres === 0 ? "—" : d.centres}
                    </div>
                    <div className="col-span-3">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-medium ${formMeta[d.form].chip}`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${formMeta[d.form].dot}`} />
                        {d.form === "racemate"
                          ? "Racemate"
                          : d.form === "single"
                            ? "Single"
                            : "Achiral"}
                      </span>
                    </div>
                  </button>
    );
              })}
            </div>
          </div>
  
          {/* Detail panel */}
          <div className="lg:col-span-2 rounded-lg border border-border bg-card/50 p-4 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground">
                  {active.drugClass}
                </div>
                <h4 className="text-lg font-serif font-bold text-foreground leading-tight">
                  {active.name}
                </h4>
                {active.enantiomer && (
                  <div className="text-xs text-muted-foreground mt-0.5">
                    Active form: <span className="font-mono">{active.enantiomer}</span>
                  </div>
                )}
              </div>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-medium whitespace-nowrap ${formMeta[active.form].chip}`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${formMeta[active.form].dot}`} />
                {formMeta[active.form].label}
              </span>
            </div>
  
            <div className="rounded-md bg-muted/40 px-3 py-2">
              <div className="text-[11px] uppercase tracking-wide text-muted-foreground mb-0.5">
                Why this form?
              </div>
              <div className="text-sm font-medium text-foreground">{active.reason}</div>
            </div>
  
            <div className="text-sm text-muted-foreground leading-relaxed">{active.detail}</div>
  
            <div className="mt-auto pt-2 border-t border-border text-[11px] text-muted-foreground">
              Chiral centres:{" "}
              <span className="font-mono text-foreground">
                {active.centres === 0 ? "none (achiral)" : active.centres}
              </span>
            </div>
          </div>
        </div>
  
        <div className="mt-4 text-xs text-muted-foreground leading-relaxed">
          <span className="font-semibold text-foreground">Pattern:</span> drugs become single
          enantiomers when one isomer is meaningfully safer (cisatracurium, levobupivacaine,
          ropivacaine), more potent (esketamine, dexmedetomidine, etomidate), or biosynthetically
          unavoidable (morphine, catecholamines). They stay as racemates when enantiomers are
          complementary (methadone, tramadol), clinically indistinguishable (prilocaine), or
          separation is uneconomic (volatiles, thiopentone).
        </div>
      </Card>
    </DiagramFigure>
  );
};

export default ChiralityAnaesthesiaDiagram;
