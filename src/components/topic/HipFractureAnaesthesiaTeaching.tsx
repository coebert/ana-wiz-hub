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
      <h3 className="font-semibold text-foreground mb-2">REGAIN (NEJM 2021) — death or inability to walk at 60 days</h3>
      <p className="text-sm mb-2">
        1,600 patients aged ≥50 were randomised to spinal or general anaesthesia for hip fracture surgery. The composite primary
        outcome occurred in <strong className="text-foreground">18.5% with spinal versus 18.0% with general anaesthesia</strong>
        (RR 1.03, 95% CI 0.84–1.27; P = 0.83). Death within 60 days was 3.9% vs 4.1%, and delirium 20.5% vs 19.7% (RR 1.04,
        95% CI 0.84–1.30) — no differences. Note that 16% of the spinal group did not receive their assigned technique.<R label="REGAIN 2021" />
      </p>
    </div>
    <div className="bg-card border border-border rounded-lg p-4">
      <h3 className="font-semibold text-foreground mb-2">RAGA (JAMA 2022) — postoperative delirium</h3>
      <p className="text-sm mb-2">
        950 patients aged ≥65 in China were randomised to regional or general anaesthesia (without benzodiazepines). Delirium within
        7 days occurred in <strong className="text-foreground">6.2% with regional versus 5.1% with general anaesthesia</strong>
        (risk difference 1.1%, 95% CI −1.7% to 3.8%; P = 0.48) — no significant difference.<R label="RAGA 2022" />
      </p>
    </div>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">What it means:</strong> NICE NG111 recommends <em>considering</em> spinal anaesthesia, but the trials show that neither technique confers a proven mortality or delirium advantage. The technique should be chosen on patient factors — cardiovascular reserve, aortic stenosis, anticoagulation, airway, patient preference — not on an assumed survival benefit.</li>
      <li><strong className="text-foreground">What it does not test:</strong> the trials do not license poor technique in either arm. Hypotension is common in both groups and remains independently associated with harm, so whichever technique is used, the priorities are the same: fascia-iliaca block early, avoidance of hypotension, and orthogeriatric co-management.</li>
      <li><strong className="text-foreground">Practice point:</strong> a reasonable default is spinal where there is no contraindication (it is quick, reliable and reduces early opioid requirement), with general anaesthesia reserved for anticoagulation, severe aortic stenosis, sepsis or patient refusal — an individualised decision, not a rigid protocol.</li>
    </ul>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: did spinal or regional anaesthesia improve outcome in REGAIN or RAGA?</summary><p className="mt-2">No. REGAIN: death or inability to walk at 60 days 18.5% (spinal) vs 18.0% (general), delirium 20.5% vs 19.7%. RAGA: delirium 6.2% (regional) vs 5.1% (general). None significant.</p></details>
    <LessonSources topicId="elderly-anaesthesia" labels={["REGAIN 2021", "RAGA 2022"]} />
  </div>;
}
