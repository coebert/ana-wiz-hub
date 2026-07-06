import { useState } from "react";
import { Activity, Eye, Thermometer, Droplets, HeartPulse, Brain } from "lucide-react";
import { DiagramFigure } from "../_shared/DiagramFigure";

type ToxidromeKey = "anticholinergic" | "cholinergic" | "sympathomimetic" | "opioid" | "sedative";

interface Toxidrome {
  key: ToxidromeKey;
  label: string;
  examples: string;
  hr: string;
  bp: string;
  temp: string;
  pupils: string;
  skin: string;
  mental: string;
  antidote: string;
  accent: string;
}

const TOXIDROMES: Toxidrome[] = [
  {
    key: "anticholinergic",
    label: "Anticholinergic",
    examples: "TCAs, antihistamines, atropine, hyoscine, antipsychotics",
    hr: "↑↑ (tachycardia)",
    bp: "Normal/↑",
    temp: "↑ (hyperthermia)",
    pupils: "Dilated",
    skin: "Hot, dry, flushed",
    mental: "Agitation, delirium, hallucinations",
    antidote: "Supportive ± physostigmine (specialist only)",
    accent: "border-clinical/40 bg-clinical/5",
  },
  {
    key: "cholinergic",
    label: "Cholinergic (SLUDGE / DUMBELS)",
    examples: "Organophosphates, carbamates, nerve agents, pyridostigmine OD",
    hr: "↓ (or ↑ with nicotinic effects)",
    bp: "↓",
    temp: "Normal",
    pupils: "Pinpoint (miosis)",
    skin: "Wet — sweating, salivation, lacrimation",
    mental: "Confusion → coma; fasciculations, weakness",
    antidote: "Atropine (titrate to dry secretions) + pralidoxime",
    accent: "border-icu/40 bg-icu/5",
  },
  {
    key: "sympathomimetic",
    label: "Sympathomimetic",
    examples: "Cocaine, amphetamines, MDMA, theophylline, caffeine",
    hr: "↑↑",
    bp: "↑↑",
    temp: "↑ (severe hyperthermia in MDMA)",
    pupils: "Dilated",
    skin: "Diaphoretic (wet)",
    mental: "Agitation, paranoia, seizures",
    antidote: "Benzodiazepines first-line; active cooling; avoid β-blockers (unopposed α)",
    accent: "border-perioperative/40 bg-perioperative/5",
  },
  {
    key: "opioid",
    label: "Opioid",
    examples: "Morphine, heroin, fentanyl, oxycodone, methadone",
    hr: "↓",
    bp: "↓",
    temp: "↓",
    pupils: "Pinpoint (miosis)",
    skin: "Normal/cool",
    mental: "Sedation, coma, respiratory depression",
    antidote: "Naloxone (titrate to RR ≥10, not GCS) — short t½, may need infusion",
    accent: "border-pharmacology/40 bg-pharmacology/5",
  },
  {
    key: "sedative",
    label: "Sedative-hypnotic",
    examples: "Benzodiazepines, alcohol, barbiturates, GHB, zopiclone",
    hr: "Normal/↓",
    bp: "Normal/↓",
    temp: "Normal/↓",
    pupils: "Normal or small",
    skin: "Normal",
    mental: "Sedation, slurred speech, ataxia, coma",
    antidote: "Supportive (airway). Flumazenil — risk of seizures, rarely indicated",
    accent: "border-physiology/40 bg-physiology/5",
  },
];

const ToxidromeComparatorDiagram = () => {
  const [active, setActive] = useState<ToxidromeKey>("anticholinergic");
  const t = TOXIDROMES.find((x) => x.key === active)!;

  return (
    <DiagramFigure
      id="toxidrome-comparator-diagram"
      title="Toxidrome comparator"
      description="Auto-generated wrapper for the Toxidrome comparator anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
                  <div className="rounded-xl border border-border bg-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <Activity className="h-4 w-4 text-icu" />
          <h3 className="text-sm font-semibold text-foreground">Toxidrome Comparator</h3>
        </div>
  
        <div className="flex flex-wrap gap-1.5 mb-4">
          {TOXIDROMES.map((tx) => (
            <button
              key={tx.key}
              type="button"
              onClick={() => setActive(tx.key)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors border ${
                active === tx.key
                  ? `${tx.accent} text-foreground ring-2 ring-primary/30`
                  : "border-border text-muted-foreground hover:bg-muted"
              }`}
            >
              {tx.label.split(" (")[0]}
            </button>
          ))}
        </div>
  
        <div className={`rounded-lg border p-3 ${t.accent}`}>
          <div className="flex items-baseline justify-between gap-2 mb-2 flex-wrap">
            <h4 className="text-base font-serif font-semibold text-foreground">{t.label}</h4>
            <span className="text-[11px] text-muted-foreground">{t.examples}</span>
          </div>
  
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            {[
              { icon: HeartPulse, label: "Heart rate", value: t.hr },
              { icon: Activity, label: "Blood pressure", value: t.bp },
              { icon: Thermometer, label: "Temperature", value: t.temp },
              { icon: Eye, label: "Pupils", value: t.pupils },
              { icon: Droplets, label: "Skin", value: t.skin },
              { icon: Brain, label: "Mental state", value: t.mental },
            ].map((row) => (
              <div key={row.label} className="rounded-md border border-border/60 bg-card p-2">
                <div className="flex items-center gap-1 text-[10px] uppercase tracking-wide text-muted-foreground">
                  <row.icon className="h-3 w-3" />
                  {row.label}
                </div>
                <p className="text-foreground font-medium mt-0.5 leading-snug">{row.value}</p>
              </div>
            ))}
          </div>
  
          <div className="mt-3 rounded-md bg-card border border-border/60 p-2 text-xs">
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground mb-0.5">
              Antidote / specific therapy
            </p>
            <p className="text-foreground font-medium leading-snug">{t.antidote}</p>
          </div>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default ToxidromeComparatorDiagram;
