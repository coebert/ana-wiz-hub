import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";
const R = ({ label }: { label: string }) => <InlineRef topicId="non-technical-skills" refLabel={label} />;

export function NTSEvidenceTeaching() {
  return <div className="space-y-4 text-muted-foreground leading-relaxed">
    <h2 className="text-2xl font-serif font-bold text-foreground mb-3">The Evidence Behind Non-Technical Skills Tools</h2>
    <h3 className="text-lg font-semibold text-foreground">ANTS: how a behavioural marker system was validated</h3>
    <p>ANTS was built from human-factors research. It has four skill categories — task management, team working, situation awareness and decision making — divided into 15 elements, each with example good and poor behaviours. In its evaluation, 50 consultant anaesthetists were trained to use it and rated an anaesthetist in eight simulated scenario videos. The system appeared complete, the skills were observable, and ratings showed acceptable agreement and accuracy.<R label="Fletcher 2003 ANTS" /></p>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">What it proves:</strong> trained raters can reliably observe and score these behaviours in a simulated setting.<R label="Fletcher 2003 ANTS" /></li>
      <li><strong className="text-foreground">What it does not prove:</strong> the evaluation was experimental and depended on rater training. It did not show that higher scores improve patient outcomes. The authors called for testing in real training environments.<R label="Fletcher 2003 ANTS" /></li>
      <li><strong className="text-foreground">Using it well:</strong> ANTS is best used for structured, specific feedback after simulation or observed practice ("you verbalised the plan but didn't confirm who was calling for help"). It should not be used as a pass/fail score without calibrated raters.</li>
    </ul>
    <h3 className="text-lg font-semibold text-foreground">The WHO Surgical Safety Checklist</h3>
    <p>In eight hospitals across high- and low-income settings, introducing a 19-item checklist designed to improve team communication was associated with a fall in deaths from 1.5% to 0.8% and in inpatient complications from 11.0% to 7.0%, in patients aged 16 or over having non-cardiac surgery.<R label="Haynes 2009 WHO Checklist" /></p>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">Interpretation:</strong> this was a before-and-after study, so the reductions are associations. Changes in awareness, practice and data collection over the same period may contribute.<R label="Haynes 2009 WHO Checklist" /></li>
      <li><strong className="text-foreground">Mechanism:</strong> the checklist works mainly through what it prompts — team introductions, shared anticipation of critical events, and confirmation of antibiotics and equipment. Ticking boxes without the conversation loses much of its purpose.</li>
      <li><strong className="text-foreground">ICU translation:</strong> the same principles underpin checklists for bedside tracheostomy, intubation and proning. Pre-brief roles, verbalise the plan and failure options, and debrief afterwards.</li>
    </ul>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: does the Haynes 2009 study prove the checklist halves surgical mortality?</summary><p className="mt-2">No. It showed an association in a before-and-after design across eight hospitals. Causation is plausible but not established by that design alone.</p></details>
    <LessonSources topicId="non-technical-skills" labels={["Fletcher 2003 ANTS", "Haynes 2009 WHO Checklist"]} />
  </div>;
}
