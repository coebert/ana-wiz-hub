import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";
const R = () => <InlineRef topicId="paediatric-icu" refLabel="FEAST 2011" />;

export function FeastTrialTeaching() {
  return <div className="space-y-3 text-muted-foreground leading-relaxed p-4 rounded-lg border border-destructive/30 bg-destructive/5">
    <h3 className="text-lg font-serif font-bold text-foreground">The FEAST Trial: When Fluid Boluses Harmed Children</h3>
    <p>FEAST randomised children with severe febrile illness and impaired perfusion in Uganda, Kenya and Tanzania to 20–40 mL/kg boluses of 5% albumin or 0.9% saline, or no bolus. All children received antimicrobials, maintenance fluids and supportive care; those with malnutrition or gastroenteritis were excluded. Recruitment stopped early after 3,141 children.<R /></p>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">Result:</strong> 48-hour mortality was 10.6% with albumin, 10.5% with saline and 7.3% with no bolus (any bolus vs control RR 1.45, 95% CI 1.13–1.86). The excess persisted at 4 weeks (12.2%, 12.0%, 8.7%).<R /></li>
      <li><strong className="text-foreground">Albumin vs saline:</strong> no difference (RR 1.01), so the harm was linked to bolus volume, not fluid type.<R /></li>
      <li><strong className="text-foreground">Applying it:</strong> about 57% of the children had malaria, and intensive care and ventilation were not available.<R /> The trial therefore cannot be transferred directly to settings with PICU support. It is one reason current guidance favours smaller 10 mL/kg boluses with reassessment and earlier vasoactive drugs, rather than large fixed volumes.</li>
    </ul>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: did albumin perform better than saline in FEAST?</summary><p className="mt-2">No. 48-hour mortality was almost identical (10.6% vs 10.5%). Both bolus arms did worse than the no-bolus group.</p></details>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: why should you be careful applying FEAST to UK PICU practice?</summary><p className="mt-2">The children were treated where ventilation and intensive care were unavailable, and many had malaria. Children with malnutrition or gastroenteritis were excluded. It shows that liberal boluses can harm, but not that all fluid should be withheld.</p></details>
    <LessonSources topicId="paediatric-icu" labels={["FEAST 2011"]} />
  </div>;
}
