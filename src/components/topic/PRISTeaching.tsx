import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";
const R = ({ label }: { label: string }) => <InlineRef topicId="iv-anaesthetics" refLabel={label} />;

export function PRISTeaching() {
  return <div className="space-y-4 text-muted-foreground leading-relaxed mt-6">
    <h3 className="text-lg font-semibold text-foreground">What the published cases show</h3>
    <p>The largest structured analysis of PRIS reviewed 108 publications describing 168 cases. Because propofol is no longer used for long-term sedation in children, it analysed child and adult cases separately.<R label="Hemphill 2019 PRIS" /> Its evidence is case reports, so it describes associations and the pattern of reported cases. It cannot give incidence or prove a safe dose.</p>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">Different phenotypes:</strong> lipidaemia, fever and hepatomegaly were more frequent in children. Rhabdomyolysis and hyperkalaemia were more frequent in adults.<R label="Hemphill 2019 PRIS" /></li>
      <li><strong className="text-foreground">Markers of death in adults:</strong> ECG changes, hypotension, hyperkalaemia, traumatic brain injury and a mean infusion rate above 5 mg/kg/h were independently associated with mortality. In children, fever and hepatomegaly were.<R label="Hemphill 2019 PRIS" /></li>
      <li><strong className="text-foreground">Dose relationship:</strong> in adults, higher cumulative propofol dose was associated with more clinical features and more organ systems involved.<R label="Hemphill 2019 PRIS" /> This is why both rate and duration matter, not a single threshold.</li>
    </ul>
    <h3 className="text-lg font-semibold text-foreground">Recognition and management</h3>
    <p>Consider PRIS in any patient on propofol with <strong className="text-foreground">unexplained metabolic acidosis, ECG changes or rhabdomyolysis</strong>.<R label="Hemphill 2019 PRIS" /> Early ECG signs can include new Brugada-like right bundle branch morphology, which may progress to bradyarrhythmia and asystole. When PRIS is suspected, stop propofol and change to an alternative sedative. Support the circulation, correct hyperkalaemia, and consider continuous haemofiltration early to clear acid, potassium and myoglobin.<R label="Hemphill 2019 PRIS" /><R label="BJA Educ 2014" /></p>
    <p><strong className="text-foreground">Prevention on ICU:</strong> use the lowest effective dose, combine with other sedatives or analgesia rather than escalating propofol, and give adequate carbohydrate. In prolonged or high-dose infusions, especially after brain injury when vasopressors are needed, monitor lactate, pH, CK, potassium and triglycerides.<R label="BJA Educ 2014" /></p>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: is 4 mg/kg/h a safe ceiling?</summary><p className="mt-2">No. It is a commonly used precaution, but cases occur at lower or shorter exposures, and case-report data cannot define a safe dose. Adult mortality was associated with mean rates above 5 mg/kg/h.</p></details>
    <LessonSources topicId="iv-anaesthetics" labels={["Hemphill 2019 PRIS", "BJA Educ 2014"]} />
  </div>;
}
