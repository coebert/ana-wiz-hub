import { TopicTemplate } from "@/components/TopicTemplate";
import { ExamSection } from "@/components/ExamSection";
import { WorkedExample } from "@/components/WorkedExamples";
import { daySurgeryQuestions } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";

const objectives = [
  "Apply BADS-aligned criteria to select patients suitable for day-case surgery",
  "Choose short-acting anaesthetic agents and a multimodal analgesic / antiemetic plan",
  "Recognise OSA, BMI and anticoagulation considerations specific to day surgery",
  "List the formal discharge criteria (vital signs, pain, PONV, surgical, mobilisation, voiding)",
  "Plan safe discharge instructions and unplanned admission criteria",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Suitability of an OSA patient for day-case knee arthroscopy",
    scenario:
      "A 55-year-old man (BMI 38, STOP-BANG 6, on overnight CPAP) is listed for day-case knee arthroscopy. Is day surgery appropriate?",
    working:
      "STOP-BANG ≥5 indicates high OSA risk. With good CPAP compliance and a short, predominantly regional/local anaesthetic technique (femoral block ± light sedation), day-case surgery is feasible.\nKey precautions: avoid long-acting opioids and benzodiazepines; multimodal analgesia (paracetamol + NSAID + local infiltration); patient brings own CPAP; assess ≥4 h postoperatively; clear instructions for resuming CPAP at home.",
    answer:
      "Yes, with caveats. Use a regional-led technique to avoid airway manipulation and systemic opioids, ensure CPAP availability at home, and apply extended postoperative monitoring (≥4 h) to detect respiratory depression before discharge. Document an explicit unplanned-admission threshold.",
  },
  {
    title: "Failed discharge after spinal anaesthesia",
    scenario:
      "A 70-year-old man underwent inguinal hernia repair under spinal anaesthesia. Four hours later he has not voided despite a palpable bladder. Can he go home?",
    working:
      "Voiding is a discharge requirement after spinal/epidural anaesthesia, perianal surgery and inguinal hernia repair due to risk of post-op urinary retention.\nBladder ultrasound to quantify volume; if >600 mL or unable to void, single in-out catheterisation and arrange community follow-up.",
    answer:
      "No — voiding is mandatory in this patient group. Confirm with bladder scan, catheterise (in-out) if >600 mL, and arrange follow-up before discharge. Failure to void is one of the commonest reasons for unplanned overnight admission in day-surgery units.",
  },
];

const DaySurgeryTopic = () => {
  return (
    <TopicTemplate
      title="Day Surgery Anaesthesia"
      subtitle="Patient selection, anaesthetic technique and discharge criteria"
      backPath="/clinical"
      backLabel="Clinical"
      accentColor="text-clinical"
      topicId="day-surgery"
      topicTitle="Day Surgery Anaesthesia"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={daySurgeryQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL], curriculumCodes: ["RCoA Final — Clinical Anaesthesia"] },
        workedExamples: { exams: [Exam.FINAL] },
        keyPoints: { exams: [Exam.FINAL] },
      }}
      sectionSources={{
        workedExamples: ["BADS Guidelines", "AAGBI Day Surgery 2019"],
      }}
      keyPoints={[
        "BADS target: ~80% of elective surgery as day case. ASA I–III with stable comorbidities suitable",
        "Short-acting agents preferred: propofol, remifentanil, desflurane. Avoid long-acting opioids",
        "Multimodal PONV prophylaxis: dexamethasone at induction + ondansetron at end. TIVA for high-risk",
        "Multimodal analgesia: paracetamol + NSAID + regional block. Opioid-sparing approach",
        "Discharge criteria: stable vitals, pain controlled orally, minimal PONV, mobile, responsible adult escort",
        "Voiding only mandatory after spinal/epidural, perianal surgery, or inguinal hernia repair",
      ]}
      coreConcepts={
        <>
          <ExamSection id="selection" exams={["final"]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Patient Selection</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              The British Association of Day Surgery (BADS) recommends that ~80% of elective surgery be delivered as day case.
              Patient selection is based on medical, surgical and social criteria — not on a single physiological cut-off.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>ASA I–III</strong> with stable comorbidities. ASA IV considered case-by-case</li>
              <li><strong>BMI</strong>: no absolute cutoff — assess on functional capacity. Most units accept BMI &lt;50</li>
              <li><strong>OSA</strong>: STOP-BANG ≥5 → high risk. May need overnight observation. Avoid long-acting opioids</li>
              <li><strong>Social</strong>: responsible adult escort, suitable home environment, telephone access, within 1 h of hospital</li>
              <li><strong>Anticoagulants</strong>: follow local bridging protocols. DOACs often omitted on the morning of surgery</li>
            </ul>
          </ExamSection>

          <ExamSection id="anaesthetic-technique" exams={["final"]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Anaesthetic Principles</h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Short-acting agents</strong>: propofol, remifentanil, desflurane/sevoflurane, mivacurium/sugammadex</li>
              <li><strong>PONV prevention</strong>: multimodal (dexamethasone + ondansetron). Consider TIVA for high-risk; avoid N₂O</li>
              <li><strong>Multimodal analgesia</strong>: paracetamol + NSAID + local/regional anaesthesia; take-home analgesics with clear instructions</li>
              <li><strong>Regional anaesthesia</strong>: excellent for day case — reduces opioid requirement. Single-shot peripheral nerve blocks preferred. Counsel about <strong>rebound pain</strong> as the block wears off</li>
            </ul>
          </ExamSection>

          <ExamSection id="discharge" exams={["final"]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Discharge Criteria</h2>
            <div className="space-y-3">
              {[
                { criterion: "Vital signs", detail: "Stable for ≥1 h. Within 20% of preoperative baseline" },
                { criterion: "Pain", detail: "Controlled with oral analgesia. VAS <4. Take-home prescription provided" },
                { criterion: "PONV", detail: "Minimal/absent. Able to tolerate oral fluids (not mandatory if regional)" },
                { criterion: "Surgical", detail: "No unexpected bleeding. Surgeon satisfied. Wound-care instructions given" },
                { criterion: "Mobilisation", detail: "Ambulatory (unless lower-limb block — chair/wheelchair acceptable)" },
                { criterion: "Voiding", detail: "Not mandatory for all patients. Required after inguinal hernia, perianal surgery, spinal/epidural" },
              ].map((c) => (
                <div key={c.criterion} className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{c.criterion}</p>
                  <p className="text-sm text-muted-foreground mt-1">{c.detail}</p>
                </div>
              ))}
            </div>
          </ExamSection>
        </>
      }
    />
  );
};

export default DaySurgeryTopic;
