import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { daySurgeryQuestions } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { TopicTableOfContents } from "@/components/layout/TopicTableOfContents";
import { InlineRef } from "@/components/references/InlineRef";


const daySurgeryFaqs: Array<[string, string]> = [
  [
    "What BMI is acceptable for day-case surgery?",
    "There is no absolute BMI cutoff. BADS guidance is to assess functional capacity, comorbidity (especially OSA), and surgical complexity rather than weight alone. Many UK units accept BMI up to 50 for appropriate procedures, provided the patient meets all other day-case criteria and a suitable airway plan is in place."
  ],
  [
    "When is voiding mandatory before day-case discharge?",
    "After spinal/epidural anaesthesia, inguinal/femoral hernia repair, and perianal/urological surgery — because of the risk of urinary retention. For most other day-case procedures, voiding is not required as long as the patient is well, drinking, and has clear instructions on when to seek help if retention develops."
  ],
  [
    "How should a patient with STOP-BANG ≥5 be managed for day surgery?",
    "Stratify as high OSA risk. Use opioid-sparing multimodal analgesia, prefer regional techniques, avoid long-acting sedatives, and monitor for ≥3 h post-op with continuous SpO₂. CPAP-dependent patients should bring their device. Many units admit STOP-BANG ≥5 patients overnight after general anaesthesia."
  ]
];

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
    cites: ["BJA Educ 2016"],
  },
  {
    title: "Failed discharge after spinal anaesthesia",
    scenario:
      "A 70-year-old man underwent inguinal hernia repair under spinal anaesthesia. Four hours later he has not voided despite a palpable bladder. Can he go home?",
    working:
      "Voiding is a discharge requirement after spinal/epidural anaesthesia, perianal surgery and inguinal hernia repair due to risk of post-op urinary retention.\nBladder ultrasound to quantify volume; if >600 mL or unable to void, single in-out catheterisation and arrange community follow-up.",
    answer:
      "No — voiding is mandatory in this patient group. Confirm with bladder scan, catheterise (in-out) if >600 mL, and arrange follow-up before discharge. Failure to void is one of the commonest reasons for unplanned overnight admission in day-surgery units.",
   cites: ["BADS Guidelines"],
  },
];

const tocItems = [
  { id: "section-selection", label: "Patient Selection", group: "Core" },
  { id: "section-anaesthetic-technique", label: "Anaesthetic Principles", group: "Core" },
  { id: "section-discharge", label: "Discharge Criteria", group: "Core" },
  { id: "section-eras", label: "Enhanced Recovery", group: "Core" },
  { id: "section-experience", label: "Patient Experience After Discharge", group: "Core" },
  { id: "section-information", label: "Patient Information & Consent", group: "Core" },
  { id: "section-paediatric", label: "Paediatric Day Surgery", group: "Special groups" },
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
        workedExamples: ["BADS Guidelines", "AAGBI Day Surgery 2019", "BJA Educ 2016"],
        keyPoints: ["AAGBI Day Surgery 2019", "BJA Educ 2016", "BADS Guidelines", "PADSS Review 2023", "APAGBI Paediatric Day Case 2019", "ERAS Ambulatory 2023", "Day Surgery Experience 2024"],
      }}

      keyPoints={[
        { text: "BADS target: ~80% of elective surgery as day case. ASA I–III with stable comorbidities suitable", cites: ["AAGBI Day Surgery 2019"] },
        { text: "Short-acting agents preferred: propofol, remifentanil, desflurane. Avoid long-acting opioids", cites: ["BJA Educ 2016"] },
        { text: "Multimodal PONV prophylaxis: dexamethasone at induction + ondansetron at end. TIVA for high-risk", cites: ["BADS Guidelines"] },
        { text: "Multimodal analgesia: paracetamol + NSAID + regional block. Opioid-sparing approach", cites: ["AAGBI Day Surgery 2019"] },
        { text: "Discharge criteria: stable vitals, pain controlled orally, minimal PONV, mobile, responsible adult escort", cites: ["BJA Educ 2016"] },
        { text: "Voiding only mandatory after spinal/epidural, perianal surgery, or inguinal hernia repair", cites: ["BADS Guidelines"] },
      ]}
      coreConcepts={
        <>
          <TopicTableOfContents items={tocItems} />
          <ExamSection id="section-selection" className="scroll-mt-24" exams={[Exam.FINAL]}>
            <CollapsibleSubsection title="Patient Selection" defaultOpen>
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
            <div className="space-y-3 mt-3">
              {[
                { t: "Medical criteria", d: "ASA I–III with stable, optimised comorbidity — stability matters far more than the ASA number, and many ASA III patients are better served by a day-case pathway than by an inpatient stay. Exclusions are unstable angina, decompensated heart failure, poorly controlled arrhythmia, uncontrolled asthma or COPD with a recent exacerbation, unstable diabetes, untreated severe OSA without CPAP, and end-stage renal or liver disease. BMI alone is not a barrier: assess functional capacity, airway and OSA risk with a suitable airway plan and equipment — morbid obesity is often better managed as a day case because of earlier mobilisation and lower VTE and infection risk. Age alone is not a barrier either; frailty, cognition and home support decide. Screen for OSA with STOP-BANG, review anticoagulants and antiplatelets against the bleeding risk of the procedure, and manage diabetes drugs and GLP-1 receptor agonists to local policy." },
                { t: "Social criteria", d: "A responsible, capable adult to escort the patient home and stay for the first 24 hours; a telephone; reasonable travel time to hospital (commonly about an hour) with access to transport; and home conditions allowing rest, toilet access and stairs where relevant. The patient or carer must understand and be able to deliver the analgesia and wound-care plan. Language needs, learning disability, dementia, safeguarding concerns, homelessness or sole responsibility for dependants do not automatically exclude a patient, but each requires a specific plan — interpreter, carer briefing, extended-stay bed or an inpatient pathway. Lack of any escort is the commonest social reason for an overnight stay." },
                { t: "Procedural criteria", d: "Surgery not requiring prolonged specialist care: expected duration usually under about 2 hours (longer is acceptable in experienced units), minimal expected blood loss, no drains or invasive monitoring, no body-cavity or airway compromise needing overnight observation, and postoperative pain controllable with oral analgesia plus local or regional anaesthesia. The surgical team must be able to deliver it reliably to that standard. BADS publishes procedure-specific day-case rate targets — laparoscopic cholecystectomy, hernia repair, arthroscopy, selected tonsillectomy, breast and thyroid surgery, and increasingly shoulder and laparoscopic colorectal work — so the question is not whether an operation can be a day case but why this particular patient needs a bed." },
              ].map((x) => (
                <div key={x.t} className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{x.t}</p>
                  <p className="text-sm text-muted-foreground mt-1">{x.d}</p>
                </div>
              ))}
            </div>

            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="section-anaesthetic-technique" className="scroll-mt-24" exams={[Exam.FINAL]}>
            <CollapsibleSubsection title="Anaesthetic Principles">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Short-acting agents</strong>: propofol, remifentanil, desflurane/sevoflurane, mivacurium/sugammadex</li>
              <li><strong>PONV prevention</strong>: multimodal (dexamethasone + ondansetron). Consider TIVA for high-risk; avoid N₂O</li>
              <li><strong>Multimodal analgesia</strong>: paracetamol + NSAID + local/regional anaesthesia; take-home analgesics with clear instructions</li>
              <li><strong>Regional anaesthesia</strong>: excellent for day case — reduces opioid requirement. Single-shot peripheral nerve blocks preferred. Counsel about <strong>rebound pain</strong> as the block wears off</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="section-discharge" className="scroll-mt-24" exams={[Exam.FINAL]}>
            <CollapsibleSubsection title="Discharge Criteria">
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

            <div className="mt-4 bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2 text-sm">Post-Anaesthetic Discharge Scoring System (PADSS)</h3>
              <p className="text-sm text-muted-foreground mb-2">
                The modified PADSS turns the criteria above into an auditable score. Five domains are each scored 0, 1 or 2 (maximum 10); a score of <strong className="text-foreground">≥9</strong>, ideally on two consecutive assessments, is the usual threshold for discharge home with an escort<InlineRef topicId="day-surgery" refLabel="PADSS Review 2023" />.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-border rounded-lg">
                  <caption className="sr-only">Modified PADSS domains and 0–2 scoring</caption>
                  <thead>
                    <tr className="bg-muted/50 text-left">
                      <th scope="col" className="p-2 font-semibold text-foreground border-b border-border">Domain</th>
                      <th scope="col" className="p-2 font-semibold text-foreground border-b border-border">2</th>
                      <th scope="col" className="p-2 font-semibold text-foreground border-b border-border">1</th>
                      <th scope="col" className="p-2 font-semibold text-foreground border-b border-border">0</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground align-top">
                    {[
                      { d: "Vital signs", two: "Within 20% of preoperative baseline", one: "20–40% of baseline", zero: "More than 40% from baseline" },
                      { d: "Ambulation", two: "Steady gait, no dizziness", one: "Needs assistance", zero: "Unable to ambulate / dizzy" },
                      { d: "Nausea & vomiting", two: "Minimal, oral treatment only", one: "Moderate, needed parenteral treatment", zero: "Severe, persistent despite treatment" },
                      { d: "Pain", two: "Minimal, controlled by oral analgesia and acceptable to the patient", one: "Moderate", zero: "Severe" },
                      { d: "Surgical bleeding", two: "Minimal, no dressing change", one: "Moderate, up to two dressing changes", zero: "Severe, more than three dressing changes" },
                    ].map((r) => (
                      <tr key={r.d} className="border-b border-border last:border-0">
                        <th scope="row" className="p-2 font-medium text-foreground">{r.d}</th>
                        <td className="p-2">{r.two}</td>
                        <td className="p-2">{r.one}</td>
                        <td className="p-2">{r.zero}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground mt-2 italic">
                Drinking and voiding are no longer mandatory PADSS criteria for most ambulatory patients — voiding remains a requirement after neuraxial blockade, inguinal/femoral hernia repair and perianal or urological surgery<InlineRef topicId="day-surgery" refLabel="AAGBI Day Surgery 2019" />.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="section-eras" className="scroll-mt-24" exams={[Exam.FINAL]}>
            <CollapsibleSubsection title="Enhanced Recovery in Ambulatory Surgery">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Enhanced recovery for ambulatory surgery rests on five fundamentals: preoperative counselling, education and optimisation; multimodal opioid-sparing analgesia; prophylaxis against nausea and vomiting, wound infection and venous thromboembolism; maintenance of euvolaemia; and encouragement of early mobility<InlineRef topicId="day-surgery" refLabel="ERAS Ambulatory 2023" />.
            </p>
            <div className="space-y-3">
              {[
                { t: "Preoperative counselling, education and optimisation", d: "Set expectations at pre-assessment: what the day will feel like, the analgesia plan, recovery milestones and the discharge criteria the patient must meet. Optimise anaemia, glycaemic control, blood pressure, smoking and alcohol, and prehabilitate where the wait allows. Avoid prolonged fasting — clear fluids up to 2 hours before arrival, with carbohydrate loading where used locally." },
                { t: "Multimodal, opioid-sparing analgesia", d: "Pre-emptive paracetamol and a non-steroidal anti-inflammatory drug, local infiltration or a peripheral nerve block for every feasible case, and adjuncts (dexamethasone, lidocaine infusion, ketamine, dexmedetomidine, gabapentinoid in selected patients) instead of routine long-acting opioids. Warn the patient about block regression and to take oral analgesia before rebound pain begins." },
                { t: "Prophylaxis bundle", d: "Score PONV risk (Apfel) and give at least two agents to high-risk patients — dexamethasone at induction plus ondansetron at the end, with total intravenous anaesthesia and avoidance of nitrous oxide for the highest risk. Surgical antibiotic prophylaxis within 60 minutes of incision where indicated, and VTE risk assessment for every patient with mechanical prophylaxis, early mobilisation, and pharmacological prophylaxis where risk is high." },
                { t: "Euvolaemia", d: "Neither dry nor flooded: about 1–2 L of balanced crystalloid for most day cases reduces PONV, dizziness and fatigue, whereas excess fluid delays discharge through bladder distension and oedema. Encourage oral intake as soon as the patient is awake — drinking is part of the pathway, not merely a discharge criterion." },
                { t: "Early mobility and short-acting anaesthesia", d: "Propofol, remifentanil or fentanyl, sevoflurane or desflurane, and quantitatively confirmed reversal of neuromuscular blockade so the patient is awake, clear-headed and able to sit and walk within the hour. Fast-track suitable patients from theatre directly to phase 2 recovery, then to a chair, oral fluids and mobilisation." },
                { t: "Governance and outcome measures", d: "Track day-case rates against BADS procedure-specific targets, unplanned admission rate (aim below 2%), readmission and return-to-theatre rates, pain and PONV scores in recovery and at 24 hours, and patient-reported experience and quality of recovery. Audit the reason for every overnight admission — pain, PONV, retention, bleeding, a late finish and lack of an escort are all modifiable." },
              ].map((x) => (
                <div key={x.t} className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{x.t}</p>
                  <p className="text-sm text-muted-foreground mt-1">{x.d}</p>
                </div>
              ))}
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="section-experience" className="scroll-mt-24" exams={[Exam.FINAL]}>
            <CollapsibleSubsection title="Patient Experience After Discharge">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Qualitative synthesis of day-surgery recovery identifies four consistent themes: patients ask for information tailored to them, they find it hard to recognise and understand postoperative symptoms, they depend on continuous professional and personal support, and they want individual adaptation rather than a standard leaflet<InlineRef topicId="day-surgery" refLabel="Day Surgery Experience 2024" />.
            </p>
            <div className="space-y-3">
              {[
                { t: "Tailored information", d: "Generic instructions are frequently described as too little, too general, or given at the wrong moment. Deliver key information at pre-assessment when the patient can absorb it, repeat it at discharge with the escort present, and adapt it to the individual — their procedure, analgesia, job, caring responsibilities and language. Written or digital material supplements a conversation; it does not replace one." },
                { t: "Recognising and interpreting symptoms", d: "Patients struggle to distinguish normal recovery from complications: they under-report pain, mistake block regression for something going wrong, worry about bruising and swelling, and delay seeking help so as not to be a nuisance. Give concrete descriptions of what is expected and for how long, alongside unambiguous red flags — pain uncontrolled by the prescribed analgesia, persistent vomiting, inability to pass urine, fever, spreading wound redness or discharge, calf pain or breathlessness, and heavy bleeding." },
                { t: "Continuous professional and personal support", d: "A named 24-hour contact number, a next-day follow-up call and a clear route back into the service reduce anxiety and avoidable emergency attendances. Involve the escort or carer directly in the discharge conversation, because they give the analgesia and decide when to seek help. Identify patients without support before the day of surgery rather than in recovery." },
                { t: "Individual adaptation", d: "Recovery does not follow a fixed timetable. Fatigue, disturbed sleep, low mood, dizziness and poor appetite are common for several days and often take patients by surprise. Give realistic procedure-specific advice on returning to work, driving, exercise, lifting and sexual activity, and on the 24-hour restrictions after anaesthesia, and encourage patients to arrange help at home rather than assuming they will be back to normal the next day." },
                { t: "Measuring and improving experience", d: "Use patient-reported outcome and experience measures — quality-of-recovery scores, pain and PONV at 24 hours, satisfaction with information — and feed the results back into the pathway. Recurring themes such as unrelieved pain on the first night, unexpected retention or confusion about analgesia timing usually indicate a fixable process rather than a difficult patient." },
              ].map((x) => (
                <div key={x.t} className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{x.t}</p>
                  <p className="text-sm text-muted-foreground mt-1">{x.d}</p>
                </div>
              ))}
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="section-information" className="scroll-mt-24" exams={[Exam.FINAL]}>
            <CollapsibleSubsection title="Patient Information & Consent">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Day surgery devolves much of the recovery to the patient and their carer, so written information and an explicit consent conversation are part of the safety system rather than paperwork<InlineRef topicId="day-surgery" refLabel="AAGBI Day Surgery 2019" />.
            </p>
            <div className="space-y-3">
              {[
                { t: "Preoperative instructions", d: "Fasting: 6 h food, 4 h breast milk, 2 h clear fluids — with active encouragement to drink clear fluids up to 2 h before arrival rather than prolonged starvation. Which medicines to take on the morning of surgery (antihypertensives, inhalers, analgesics) and which to omit (some diabetes drugs, DOACs, GLP-1 agonists per local policy). Bring regular medicines, inhalers and CPAP device." },
                { t: "Belongings and practicalities", d: "Leave valuables and jewellery at home, wear loose clothing, arrange childcare and time off work, and expect the whole day in the unit even for a short procedure." },
                { t: "Consent for the possibility of admission", d: "Discuss and document that 1–3% of day cases require unplanned overnight admission — for pain, PONV, urinary retention, bleeding, extended surgery or unexpected findings — so that admission is a planned contingency rather than a perceived failure." },
                { t: "Written postoperative instructions", d: "Given to both patient and escort, in plain language: wound and dressing care, analgesic ladder with doses and timings, when to expect the block to wear off and to take analgesia before rebound pain, expected recovery milestones, and activity restrictions (no driving, operating machinery, alcohol, or signing legal documents for 24 h; longer if opioids continue)." },
                { t: "24-hour contact and red flags", d: "A named 24-hour telephone contact for the unit or on-call team, and explicit red flags prompting contact: uncontrolled pain, persistent vomiting, inability to pass urine, fever, increasing wound redness or discharge, calf pain or breathlessness, and heavy bleeding." },
                { t: "Escort and home environment", d: "A responsible adult must collect the patient and stay overnight, with a telephone and reasonable access to hospital. Public transport home alone is not acceptable after general anaesthesia or sedation." },
                { t: "Consent to self-care", d: "Confirm the patient understands and agrees to the self-care they are undertaking — taking their own analgesia, wound observation, mobilising and seeking help — and that they, or their carer, are capable of doing so. Where they are not, plan an extended-stay or inpatient pathway instead." },
              ].map((x) => (
                <div key={x.t} className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{x.t}</p>
                  <p className="text-sm text-muted-foreground mt-1">{x.d}</p>
                </div>
              ))}
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="section-paediatric" className="scroll-mt-24" exams={[Exam.FINAL]}>
            <CollapsibleSubsection title="Paediatric Day Surgery Considerations">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Most paediatric elective surgery is suitable for a day-case pathway provided the child, the procedure and the family are all appropriate<InlineRef topicId="day-surgery" refLabel="APAGBI Paediatric Day Case 2019" />.
            </p>
            <div className="space-y-3">
              {[
                { t: "Selection and age limits", d: "Term infants are generally accepted from ~1 month and >5 kg in units with paediatric expertise; ex-preterm infants should not be day cases until at least 60 weeks post-conceptual age because of the risk of postoperative apnoea (admit and monitor with apnoea alarms if younger). Exclude poorly controlled asthma, severe OSA (particularly children <3 years having tonsillectomy, or with syndromes/neuromuscular disease), significant congenital cardiac disease, and current respiratory infection." },
                { t: "Fasting — the 6-4-2 rule", d: "6 h for solids and formula, 4 h for breast milk, 2 h (and actively encouraged) for clear fluids. Children tolerate starvation poorly — first-on-list scheduling for the youngest, and clear-fluid sipping up to 1–2 h reduces distress, hypoglycaemia and hypotension." },
                { t: "Anaesthetic technique", d: "Inhalational induction with sevoflurane, or IV induction with propofol through a topical-anaesthetic-prepared cannula site depending on the child's preference; supraglottic airway where feasible; sevoflurane or TIVA maintenance with a low-opioid plan. Regional supplementation is the mainstay: caudal for sub-umbilical surgery, ilioinguinal/transversus abdominis plane blocks for hernia repair, penile or pudendal block for circumcision, and simple wound infiltration for everything else." },
                { t: "Analgesia and dosing", d: "Weight-based multimodal analgesia: paracetamol 15 mg/kg 6-hourly (max 60 mg/kg/day), ibuprofen 5–10 mg/kg 6–8-hourly if no contraindication, plus block or infiltration. Codeine is contraindicated in children (MHRA — unpredictable CYP2D6 ultra-rapid metabolism, fatal respiratory depression, and specifically contraindicated after tonsillectomy/adenoidectomy for OSA and in all children under 12). Use morphine sparingly and only where the child can be observed; oral morphine take-home only with careful written instructions." },
                { t: "PONV", d: "High baseline risk in children — combine dexamethasone 0.15 mg/kg and ondansetron 0.1 mg/kg, avoid prolonged fasting, and prefer opioid-sparing regional techniques." },
                { t: "Parental and social factors", d: "One parent present at induction where appropriate, honest age-appropriate preparation, play specialist input, and a carer who understands and can deliver the analgesia plan. Both a competent carer at home and reasonable travel time to hospital are prerequisites; safeguarding concerns or an inability to give medicines reliably should trigger an inpatient plan." },
                { t: "Child-specific discharge criteria", d: "Awake and behaving normally for that child, pain controlled on oral analgesia, drinking without vomiting, no active bleeding, and observed for an adequate period after the last opioid dose. Voiding is not routinely required except after caudal blockade or genitourinary surgery. Give written instructions, the analgesia timetable, and a 24-hour contact number to the parent." },
              ].map((x) => (
                <div key={x.t} className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{x.t}</p>
                  <p className="text-sm text-muted-foreground mt-1">{x.d}</p>
                </div>
              ))}
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamPitfallsCallout
            accent="clinical"
            pitfalls={[
              "Patient selection by clinical, social and surgical criteria — not by age or BMI alone.",
              "Use short-acting agents (propofol, desflurane/sevoflurane, remifentanil, fentanyl) and multimodal opioid-sparing analgesia.",
              "PONV prophylaxis is essential — score risk (Apfel) and give a multimodal combination.",
              "Discharge criteria (PADSS): vital signs, ambulation, pain control, nausea/emesis, surgical bleeding, adult escort.",
              "Avoid long-acting opioids; ensure a responsible adult, written information and 24-h contact details before discharge.",
            ]}
          />
          <TopicFaqs faqs={daySurgeryFaqs} />

        </>
      }
    />
  );
};

export default DaySurgeryTopic;
