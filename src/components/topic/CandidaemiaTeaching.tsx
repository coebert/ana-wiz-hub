import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";
const R = ({ label }: { label: string }) => <InlineRef topicId="antimicrobials-pharm" refLabel={label} />;

export function CandidaemiaTeaching() {
  return <div className="space-y-4 text-muted-foreground leading-relaxed mt-6">
    <h3 className="text-lg font-semibold text-foreground">Candidaemia: choosing and sequencing therapy</h3>
    <p>In a randomised trial of invasive candidiasis, mostly candidaemia, the echinocandin anidulafungin met its non-inferiority margin against fluconazole and had a higher global response rate.<R label="Reboli 2007 Anidulafungin" /> Together with rising azole resistance and non-albicans species, this is one basis for current guidance. The guidance recommends an echinocandin as initial therapy for candidaemia in most adults. Fluconazole is an alternative in selected non-critically ill patients unlikely to have resistant isolates.<R label="IDSA Candidiasis 2016" /></p>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">Step-down:</strong> once the patient is clinically stable, the isolate is fluconazole-susceptible and repeat blood cultures are negative, transition to fluconazole, usually within 5–7 days.<R label="IDSA Candidiasis 2016" /></li>
      <li><strong className="text-foreground">Source control:</strong> remove central venous catheters when the catheter is presumed to be the source and removal is safe. Decide case by case.<R label="IDSA Candidiasis 2016" /></li>
      <li><strong className="text-foreground">Look for complications:</strong> repeat blood cultures to document clearance, and arrange a dilated eye examination for endophthalmitis. Treat uncomplicated candidaemia for 2 weeks after documented clearance and symptom resolution.<R label="IDSA Candidiasis 2016" /></li>
      <li><strong className="text-foreground">Site matters:</strong> echinocandins achieve poor urinary and CNS concentrations. They are not the right choice for <em>Candida</em> urinary infection or meningitis.<R label="IDSA Candidiasis 2016" /></li>
      <li><strong className="text-foreground">Stewardship:</strong> isolated <em>Candida</em> from respiratory secretions usually represents colonisation, not an indication for treatment.<R label="IDSA Candidiasis 2016" /></li>
    </ul>
    <p><strong className="text-foreground">Evidence limits:</strong> trial populations predated emerging <em>Candida auris</em>, and local susceptibility patterns differ. Follow local microbiology advice.</p>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: is caspofungin a good choice for <em>Candida</em> cystitis?</summary><p className="mt-2">Usually not. Echinocandins reach low urinary concentrations. Fluconazole is preferred for susceptible isolates.</p></details>
    <LessonSources topicId="antimicrobials-pharm" labels={["Reboli 2007 Anidulafungin", "IDSA Candidiasis 2016"]} />
  </div>;
}
