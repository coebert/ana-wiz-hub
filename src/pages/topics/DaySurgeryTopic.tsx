import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { daySurgeryQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";

const DaySurgeryTopic = () => {
  return (
    <SectionLayout title="Day Surgery Anaesthesia" subtitle="FRCA Final — Clinical" backPath="/clinical" backLabel="Clinical" accentColor="text-clinical">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Patient Selection</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">BADS (British Association of Day Surgery) recommends ~80% of elective surgery should be day case. Patient selection based on medical, surgical, and social criteria.</p>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>ASA I-III</strong> with stable comorbidities. ASA IV can be considered case-by-case</li>
            <li><strong>BMI</strong>: no absolute cutoff — assess on functional capacity. Most units accept BMI &lt;50</li>
            <li><strong>OSA</strong>: STOP-BANG score ≥5 → increased risk. May need overnight observation. Avoid long-acting opioids</li>
            <li><strong>Social</strong>: responsible adult escort, suitable home environment, access to telephone, within 1h of hospital</li>
            <li><strong>Anticoagulants</strong>: follow local bridging protocols. DOACs often omitted on morning of surgery</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Anaesthetic Principles</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
            <li><strong>Short-acting agents</strong>: propofol, remifentanil, desflurane/sevoflurane, mivacurium/sugammadex. Avoid long-acting opioids</li>
            <li><strong>PONV prevention</strong>: multimodal (dexamethasone + ondansetron). Consider TIVA for high-risk patients. Avoid N₂O</li>
            <li><strong>Multimodal analgesia</strong>: paracetamol + NSAID (if appropriate) + local/regional anaesthesia. Opioid-sparing approach. Take-home analgesics with clear instructions</li>
            <li><strong>Regional anaesthesia</strong>: excellent for day case — reduces opioid requirement. Peripheral nerve blocks (single-shot) preferred. Avoid bilateral blocks. Consider rebound pain</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Discharge Criteria</h2>
          <div className="space-y-3">
            {[
              { criterion: "Vital signs", detail: "Stable for ≥1h. Within 20% of preoperative baseline" },
              { criterion: "Pain", detail: "Controlled with oral analgesia. VAS <4. Take-home prescription provided" },
              { criterion: "PONV", detail: "Minimal/absent. Able to tolerate oral fluids (not mandatory if regional)" },
              { criterion: "Surgical", detail: "No unexpected bleeding. Surgeon satisfied. Wound care instructions given" },
              { criterion: "Mobilisation", detail: "Ambulatory (unless lower limb block — chair/wheelchair acceptable)" },
              { criterion: "Voiding", detail: "Not mandatory for all patients. Required after inguinal hernia, perianal surgery, spinal/epidural" },
            ].map(c => (
              <div key={c.criterion} className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{c.criterion}</p>
                <p className="text-sm text-muted-foreground mt-1">{c.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <KeyLearningPoints points={[
        "BADS target: ~80% elective surgery as day case. ASA I-III with stable comorbidities suitable",
        "Short-acting agents preferred: propofol, remifentanil, desflurane. Avoid long-acting opioids",
        "Multimodal PONV prophylaxis: dexamethasone at induction + ondansetron at end. TIVA for high-risk",
        "Multimodal analgesia: paracetamol + NSAID + regional block. Opioid-sparing approach",
        "Discharge criteria: stable vitals, pain controlled orally, minimal PONV, mobile, responsible adult escort",
      ]} />
      <QuizSection questions={daySurgeryQuestions} />
      <ReferencesList topicId="day-surgery" />
      <SeeAlso topicId="day-surgery" />
        <TopicCompletionToggle topicId="day-surgery" topicTitle="Day Surgery Anaesthesia" />
    </SectionLayout>
  );
};

export default DaySurgeryTopic;
