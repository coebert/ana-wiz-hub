import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";
const R = ({ label }: { label: string }) => <InlineRef topicId="antimicrobials-pharm" refLabel={label} />;

export function ResistanceTeaching() {
  return <div className="space-y-4 text-muted-foreground leading-relaxed mt-4">
    <h3 className="text-lg font-semibold text-foreground">Scale, definitions and how resistance spreads</h3>
    <p>A global analysis estimated that in 2019 bacterial antimicrobial resistance was directly attributable to about 1.27 million deaths and associated with about 4.95 million. Most of the burden came from lower respiratory, bloodstream and intra-abdominal infections — the core of ICU practice.<R label="Murray 2022 GBD AMR" /></p>
    <p>Use the standard terms precisely. <strong className="text-foreground">MDR</strong> means non-susceptible to at least one agent in three or more antimicrobial categories. <strong className="text-foreground">XDR</strong> means non-susceptible to at least one agent in all but two or fewer categories. <strong className="text-foreground">PDR</strong> means non-susceptible to all agents in all categories.<R label="Magiorakos 2012 MDR/XDR" /> “MDR” is therefore a laboratory category, not a statement about which drug will work.</p>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">Vertical vs horizontal:</strong> chromosomal mutations (for example gyrase changes or porin loss) are selected within a strain. Plasmid- or transposon-borne genes (ESBLs, carbapenemases) can move between species. That is why a carbapenemase can appear in several organisms in one unit.</li>
      <li><strong className="text-foreground">Mechanisms combine:</strong> porin loss plus an ESBL or AmpC enzyme can produce carbapenem resistance without a carbapenemase. Phenotypic results, not presumed mechanism, guide treatment.</li>
      <li><strong className="text-foreground">Selection pressure:</strong> every course selects for resistance in the patient's own flora. Shorter, targeted courses and de-escalation are resistance interventions as well as cost measures.<R label="IDSA Stewardship 2016" /></li>
      <li><strong className="text-foreground">Infection control:</strong> because resistance genes spread between patients, hand hygiene, screening and isolation per local policy are as important as drug choice.</li>
    </ul>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: can an organism be carbapenem-resistant without a carbapenemase?</summary><p className="mt-2">Yes. Reduced porin entry combined with ESBL or AmpC production, or efflux, can raise carbapenem MICs. Molecular testing distinguishes these mechanisms, which matters for infection control and newer agents.</p></details>
    <LessonSources topicId="antimicrobials-pharm" labels={["Murray 2022 GBD AMR", "Magiorakos 2012 MDR/XDR", "IDSA Stewardship 2016"]} />
  </div>;
}
