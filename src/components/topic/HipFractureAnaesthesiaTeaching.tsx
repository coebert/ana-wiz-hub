import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";
const R = ({ label }: { label: string }) => <InlineRef topicId="elderly-anaesthesia" refLabel={label} />;

export function HipFractureAnaesthesiaTeaching() {
  return <div className="space-y-4 text-muted-foreground leading-relaxed">
    <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Spinal or General Anaesthesia for Hip Fracture: What the Trials Show</h2>
    <p>
      Hip fracture is the largest single emergency surgical workload in older adults, and the choice of anaesthetic technique has been
      argued for decades. Two large randomised trials have now tested the assumption that neuraxial anaesthesia improves outcomes.
    </p>
    <div className="bg-card border border-border rounded-lg p-4">
      <h3 className="font-semibold text-foreground mb-2">RAGA (NEJM 2021) — 30-day mortality</h3>
      <p className="text-sm mb-2">
        1,600 patients aged ≥50 across 46 centres were randomised to spinal or general anaesthesia for hip fracture surgery. Death
        within 30 days occurred in <strong className="text-foreground">6.2% with spinal versus 7.5% with general anaesthesia</strong>
        (95% CI for the difference −2.9 to 1.4 percentage points; P = 0.48) — no significant difference. There was also no difference
        in the ability to walk without assistance at 60 days.<R label="RAGA 2021" />
      </p>
    </div>
    <div className="bg-card border border-border rounded-lg p-4">
      <h3 className="font-semibold text-foreground mb-2">REGAIN (JAMA 2022) — postoperative delirium</h3>
      <p className="text-sm mb-2">
        1,640 patients aged ≥65 were randomised in the same design. The primary outcome — delirium during the first three
        postoperative days — occurred in <strong className="text-foreground">20.5% with spinal versus 19.7% with general
        anaesthesia</strong> (RR 1.04, 95% CI 0.84–1.30; P = 0.70) — again no significant difference.<R label="REGAIN 2022" />
      </p>
    </div>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">What it means:</strong> NICE NG111 recommends <em>considering</em> spinal anaesthesia, but the trials show that neither technique confers a proven mortality or delirium advantage. The technique should be chosen on patient factors — cardiovascular reserve, aortic stenosis, anticoagulation, airway, patient preference — not on an assumed survival benefit.</li>
      <li><strong className="text-foreground">What it does not test:</strong> the trials do not license poor technique in either arm. Hypotension is common in both groups and remains independently associated with harm, so whichever technique is used, the priorities are the same: fascia-iliaca block early, avoidance of hypotension, and orthogeriatric co-management.</li>
      <li><strong className="text-foreground">Practice point:</strong> a reasonable default is spinal where there is no contraindication (it is quick, reliable and reduces early opioid requirement), with general anaesthesia reserved for anticoagulation, severe aortic stenosis, sepsis or patient refusal — an individualised decision, not a rigid protocol.</li>
    </ul>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: did spinal anaesthesia reduce 30-day mortality or delirium in the randomised trials?</summary><p className="mt-2">No. RAGA found 30-day mortality of 6.2% (spinal) vs 7.5% (general) — not significant; REGAIN found delirium in 20.5% vs 19.7% — not significant.</p></details>
    <LessonSources topicId="elderly-anaesthesia" labels={["RAGA 2021", "REGAIN 2022"]} />
  </div>;
}
