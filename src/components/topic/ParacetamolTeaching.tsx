import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";
const R = ({ label }: { label: string }) => <InlineRef topicId="toxicology" refLabel={label} />;

export function ParacetamolTeaching() {
  return <div className="space-y-4 text-muted-foreground leading-relaxed">
    <h3 className="text-lg font-semibold text-foreground">Mechanism of liver injury</h3>
    <p>At therapeutic doses, paracetamol is cleared mainly by glucuronidation and sulfation. A small fraction is oxidised by cytochrome P450 enzymes to the reactive metabolite NAPQI, which glutathione normally detoxifies. In overdose, the conjugation pathways saturate and more NAPQI forms. Once hepatic glutathione is depleted, NAPQI binds cellular proteins and causes centrilobular (zone 3) necrosis. Zone 3 hepatocytes have the highest P450 activity and the lowest oxygen tension. Acetylcysteine works by replenishing glutathione, so it is most effective early, ideally within 8 hours of ingestion.</p>
    <h3 className="text-lg font-semibold text-foreground">Treatment decisions</h3>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">Single timed ingestion:</strong> since 2012, UK guidance has used a single treatment line starting at 100 mg/L at 4 hours. It removed separate “high-risk” lines, and levels taken before 4 hours cannot be interpreted.<R label="MHRA NAC 2012" /></li>
      <li><strong className="text-foreground">Staggered, uncertain timing or late presentation:</strong> the nomogram does not apply. Start acetylcysteine and decide using the clinical picture, paracetamol level, ALT and INR.<R label="NPIS Toxbase" /></li>
      <li><strong className="text-foreground">Shorter regimen:</strong> in the SNAP trial, a 12-hour acetylcysteine schedule caused substantially fewer vomiting and anaphylactoid reactions than the traditional 21-hour, three-bag regimen. The trial was not designed to prove equal protection of the liver.<R label="SNAP 2014" /> Use the regimen your current national or local protocol specifies.</li>
      <li><strong className="text-foreground">Anaphylactoid reactions</strong> are rate- and concentration-related and not IgE-mediated. Pause the infusion, treat symptoms, then usually restart at a slower rate rather than abandoning treatment.<R label="NPIS Toxbase" /></li>
      <li><strong className="text-foreground">Liver failure:</strong> refer early to a liver unit, based on rising INR, acidosis, encephalopathy or AKI, using recognised criteria. Lactate and pH after resuscitation are among the strongest early prognostic markers.</li>
    </ul>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: a 2-hour paracetamol level is below the line — can you discharge?</summary><p className="mt-2">No. Levels before 4 hours cannot be interpreted against the nomogram. Repeat at 4 hours or later, or treat if the timing is uncertain.</p></details>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: does an acetylcysteine reaction mean true allergy?</summary><p className="mt-2">Usually not. It is an anaphylactoid, dose-rate-related reaction. Most patients complete treatment after a pause and a slower restart.</p></details>
    <LessonSources topicId="toxicology" labels={["MHRA NAC 2012", "NPIS Toxbase", "SNAP 2014"]} />
  </div>;
}
