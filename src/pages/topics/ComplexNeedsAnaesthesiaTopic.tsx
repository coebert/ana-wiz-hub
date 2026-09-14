import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { ExamSection } from "@/components/exam/ExamSection";
import { ExamMappingBadges } from "@/components/exam/ExamMappingBadges";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { InlineRef } from "@/components/references/InlineRef";
import { TopicTableOfContents } from "@/components/layout/TopicTableOfContents";
import { complexNeedsAnaesthesiaQuestions } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";

const TOPIC_ID = "complex-needs-anaesthesia";

const tocItems = [
  { id: "section-principles", label: "General Principles & Reasonable Adjustments", group: "Framework" },
  { id: "section-learning-disability", label: "Learning Disability", group: "Patient Groups" },
  { id: "section-autism", label: "Autism Spectrum Disorder", group: "Patient Groups" },
  { id: "section-phobia", label: "Severe Needle & Anaesthetic Phobia", group: "Patient Groups" },
  { id: "section-behaviour", label: "Behaviour That Challenges & Sedation Strategies", group: "Practical" },
  { id: "section-communication", label: "Communication Strategies", group: "Practical" },
  { id: "section-sedation-alternatives", label: "Sedation Alternatives", group: "Practical" },
  { id: "section-capacity", label: "Capacity, Consent & Restraint", group: "Legal & Ethical" },
  { id: "section-consent-practice", label: "Consent in Practice", group: "Legal & Ethical" },
  { id: "section-prisoners", label: "Anaesthesia for Patients Who Are Prisoners", group: "Special Circumstances" },
  { id: "section-postop", label: "Postoperative Care & Recovery", group: "Practical" },
];

const objectives = [
  "Describe the reasonable adjustments required by the Equality Act 2010 for patients with learning disability, autism or severe phobia presenting for anaesthesia.",
  "Plan an individualised perioperative pathway using pre-visit assessment, a hospital passport, desensitisation and first-on-list scheduling.",
  "Compare premedication and sedation strategies (oral, buccal, intranasal and inhalational) for the patient who cannot cooperate with cannulation.",
  "Apply the Mental Capacity Act 2005 best-interests framework, including the lawful use of proportionate restraint and clinical holding.",
  "Recognise the physical comorbidities and diagnostic overshadowing that contribute to premature mortality in people with learning disability.",
  "Outline the security, custody, confidentiality and consent issues raised by anaesthetising a patient in prison custody.",
  "Select communication strategies matched to the individual — including easy-read information, communication aids and supporter involvement — and use them to support consent.",
  "Choose non-pharmacological and procedural alternatives to sedation, escalating to pharmacological options only when these are insufficient.",
  "Plan postoperative recovery, pain assessment and discharge so that gains made in the anaesthetic room are not lost in recovery and on the ward.",
];

const keyPoints = [
  {
    text: "Reasonable adjustments are a legal duty under the Equality Act 2010, not a courtesy: extra appointment time, quiet environments, first or last on the list, familiar carers present throughout, and communication in the patient's preferred format.",
    cites: ["Equality Act 2010"],
  },
  {
    text: "People with a learning disability die younger than the general population, with a large proportion of deaths judged avoidable; diagnostic overshadowing (attributing new physical symptoms to the disability) is a recurring contributory factor identified by the LeDeR programme.",
    cites: ["LeDeR 2023"],
  },
  {
    text: "For autistic patients, plan around sensory sensitivities and predictability: minimise waiting, noise, bright light and unnecessary staff changes, allow familiar objects, and follow the patient's own routines and communication tools wherever possible.",
    cites: ["NICE CG142 Autism", "Vlassakova Autism 2016"],
  },
  {
    text: "A structured, planned premedication strategy (oral or buccal midazolam, oral clonidine, intranasal or buccal dexmedetomidine, oral ketamine, or inhalational induction with sevoflurane) is safer than an improvised struggle at the point of cannulation — see the premedication section of the preoperative assessment topic for doses.",
    cites: ["NICE NG11 Challenging Behaviour"],
  },
  {
    text: "Restraint or clinical holding in a patient who lacks capacity is lawful only when it is necessary to prevent harm and proportionate in degree and duration to the likelihood and seriousness of that harm; it must be planned, documented and reviewed, never used as a substitute for adjustment and preparation.",
    cites: ["MCA 2005", "FFLM Restraint 2022"],
  },
  {
    text: "Prisoners retain the same rights to consent, confidentiality and dignity as any other patient; custody officers may remain for security but clinical information must not be shared with them beyond what is needed for safety, and restraints should be removed for anaesthesia unless a documented risk assessment states otherwise.",
    cites: ["NICE NG57 Prison Health", "FFLM Restraint 2022"],
  },
  {
    text: "Sedation is the last rung of a ladder, not the first: adjustments, preparation, distraction, topical/local and regional techniques and nitrous oxide come before oral, buccal, intranasal or intramuscular drugs.",
    cites: ["NICE NG11 Challenging Behaviour"],
  },
  {
    text: "Consent in this group is a staged process, not a signature: information in the right format, capacity assessed with every support in place, legal instruments checked, and a documented best-interests meeting when the patient cannot decide.",
    cites: ["MCA 2005"],
  },
  {
    text: "Postoperative distress in a patient who cannot self-report is pain, delirium or a hidden physical cause until proved otherwise: regular multimodal analgesia, an observational pain tool plus carer knowledge, and a familiar supporter at the bedside are the safety net.",
    cites: ["LeDeR 2023", "NICE CG142 Autism"],
  },
];

const workedExamples: WorkedExample[] = [
  {
    title: "Dental extractions in a 24-year-old autistic man with severe learning disability who will not tolerate cannulation",
    scenario:
      "A 24-year-old man with severe learning disability, autism and non-verbal communication needs multiple dental extractions. He becomes highly distressed in clinical environments and previously required six staff to hold him for a blood test. Plan the pathway.",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>
            <strong>Preassessment away from the day of surgery</strong> — meet the patient with his family/paid carers, obtain the hospital passport, identify triggers (noise, touch, waiting), calming strategies, favoured distractions, and how he expresses pain.
          </li>
          <li>
            <strong>Capacity assessment</strong> for the specific decision. If he lacks capacity, hold a best-interests meeting under the Mental Capacity Act 2005 with family, carers, dentist, anaesthetist and (if no one appropriate to consult) an IMCA; document the decision, the least-restrictive option considered and any planned restraint.
          </li>
          <li>
            <strong>Bundle the procedures</strong> — arrange for bloods, ECG, examination, dental treatment and any deferred investigations (e.g. audiology, cervical screening where relevant) under one anaesthetic to avoid repeated distressing episodes.
          </li>
          <li>
            <strong>Reasonable adjustments</strong> — first on the list, admission direct to a quiet side room or straight to theatre, minimal staff, carers present until asleep and in recovery, lights and monitor alarms reduced, no unnecessary gowning or fasting-time drift.
          </li>
          <li>
            <strong>Planned premedication</strong> rather than improvised force: oral or buccal midazolam, or oral clonidine given at home/on the ward with carer support; intranasal or buccal dexmedetomidine and oral ketamine are alternatives where benzodiazepine premedication has previously failed or caused disinhibition.
          </li>
          <li>
            <strong>Induction</strong> — inhalational sevoflurane induction with the patient in a chair or on a trolley, carer-assisted, is often kinder than pursuing intravenous access; secure the cannula only once anaesthetised. Have a clear, rehearsed plan for clinical holding limited to the induction period if needed, with named roles and an agreed abort point.
          </li>
          <li>
            <strong>Recovery</strong> — extubate deep or smoothly, plan for emergence agitation, return carers to the bedside immediately, use a behavioural pain tool the carers recognise, and give long-acting multimodal analgesia plus local anaesthetic infiltration to reduce postoperative distress and opioid need.
          </li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Bringing the patient to a busy morning ward and only then discovering he will not tolerate cannulation.</li>
            <li>Treating physical restraint as the plan rather than as a documented, proportionate last resort.</li>
            <li>Accepting carer consent as valid — no adult can consent on behalf of another; only a valid health and welfare LPA or court deputy can, otherwise a best-interests decision is required.</li>
            <li>Failing to bundle procedures, guaranteeing another traumatic anaesthetic in a few months.</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "Preassess early with carers and the hospital passport, decide capacity and best interests formally, bundle procedures, apply reasonable adjustments, use planned premedication with inhalational induction, and treat clinical holding as a documented proportionate last resort.",
    cites: ["MCA 2005", "Equality Act 2010", "NICE CG142 Autism", "NICE NG11 Challenging Behaviour"],
  },
  {
    title: "Emergency appendicectomy in a serving prisoner",
    scenario:
      "A 31-year-old man is escorted from prison to the emergency department with appendicitis. He arrives handcuffed to a custody officer, with two officers in attendance. Discuss the practical and ethical management of his anaesthesia.",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>
            <strong>Clinical equivalence</strong> — care must be equivalent to that of any other patient. Prison custody is not a reason to alter analgesic, anaesthetic or critical-care decisions.
          </li>
          <li>
            <strong>Consent and capacity</strong> — the prisoner consents for himself exactly as any adult with capacity does; he may refuse surgery. Neither custody staff nor the prison governor can consent for him or override refusal.
          </li>
          <li>
            <strong>Confidentiality</strong> — history-taking should happen out of officers' hearing wherever the risk assessment allows; share with escorts only the operational minimum (timings, likely admission, mobility, whether he will be sedated). Do not disclose diagnosis, drug history or bloodborne-virus status for convenience.
          </li>
          <li>
            <strong>Restraints</strong> — ask for handcuffs and any escort chain to be removed for induction, surgery and recovery. Metal restraints are incompatible with safe positioning, venous access, diathermy return-plate placement, MRI and emergency airway access; if the security risk assessment requires them, document the discussion, the reason and who authorised it, and insist an officer with the key remains immediately available.
          </li>
          <li>
            <strong>Comorbidity profile</strong> — anticipate higher rates of smoking, opioid and alcohol dependence, bloodborne viruses, undertreated mental illness and self-harm; check the prison drug chart, since opioid substitution therapy (methadone or buprenorphine) must be continued and will markedly raise analgesic requirements.
          </li>
          <li>
            <strong>Analgesia and diversion risk</strong> — prescribe on clinical need with multimodal and regional techniques; where controlled drugs are needed, plan a supervised, non-divertible route and a clear handover plan with prison healthcare rather than under-treating pain.
          </li>
          <li>
            <strong>Discharge and continuity</strong> — write a discharge plan the prison healthcare team can deliver (dressings, VTE prophylaxis, analgesia, follow-up escorts), because access to review, mobilisation and simple analgesia is not guaranteed in custody.
          </li>
          <li>
            <strong>Staff safety and dignity</strong> — agree in advance who stays in theatre, avoid discussion of the offence, and ensure the patient is not identifiable as a prisoner to other patients any more than security requires.
          </li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Anaesthetising a handcuffed patient because nobody asked for the restraint to be removed.</li>
            <li>Taking the history with officers at the bedside and breaching confidentiality by default.</li>
            <li>Withholding opioid substitution therapy or adequate analgesia because of assumed drug-seeking.</li>
            <li>Assuming the escorting officer can sign the consent form.</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "Provide equivalent care: he consents for himself, confidentiality is preserved as far as security allows, restraints are removed for anaesthesia unless a documented risk assessment requires otherwise, opioid substitution is continued with multimodal analgesia, and discharge is planned around what prison healthcare can deliver.",
    cites: ["NICE NG57 Prison Health", "NICE NG66 Criminal Justice", "FFLM Restraint 2022"],
  },
];

const complexNeedsFaqs: Array<[string, string]> = [
  [
    "Can a family member or paid carer consent to anaesthesia for an adult with a learning disability?",
    "No. No adult can consent on behalf of another in England and Wales unless they hold a valid Lasting Power of Attorney for health and welfare or are a court-appointed deputy. If the patient lacks capacity for the decision, treatment proceeds as a best-interests decision under the Mental Capacity Act 2005, consulting family and carers, and involving an IMCA where there is no one appropriate to consult.",
  ],
  [
    "Is it ever lawful to hold an adult still for induction of anaesthesia?",
    "Yes, but only where the patient lacks capacity for that decision, the holding is necessary to prevent harm to them, and the degree and duration are proportionate to the likelihood and seriousness of that harm. It should be planned in advance with named roles, documented in the best-interests record, minimised by premedication and adjustments, and reviewed afterwards.",
  ],
  [
    "What is a hospital passport and why does it matter to the anaesthetist?",
    "It is a patient-held document summarising how someone with a learning disability or autism communicates, what distresses or calms them, how they show pain, their usual medication and their support needs. It converts a chaotic day-of-surgery encounter into a planned one and should be read before the patient arrives, not after.",
  ],
  [
    "What should I do before reaching for sedation in a patient who cannot cooperate?",
    "Work up the ladder: environmental and scheduling adjustments first, then preparation and desensitisation, distraction and control-giving, topical or local anaesthesia, regional techniques where suitable, and self-administered nitrous oxide/oxygen — with pharmacological premedication and inhalational induction reserved for when these are insufficient. Document which rung succeeded so it becomes the starting point next time.",
  ],
  [
    "How do I consent a patient who communicates non-verbally?",
    "Start the consent process early and in stages; provide easy-read, pictorial or video information; involve the people who know how the patient communicates; and use every support available (communication passport, AAC devices, interpreters, a trusted supporter) before concluding the patient cannot decide. If capacity for the decision is still lacking, hold a documented best-interests meeting with an IMCA if appropriate — a carer cannot simply sign instead.",
  ],
  [
    "Should a prisoner's handcuffs be removed for surgery?",
    "In almost all cases yes: metal restraints obstruct safe positioning, vascular access, diathermy, imaging and emergency airway management. Ask the escorting officers to remove them for induction, surgery and recovery. If a documented security risk assessment insists they remain, record the discussion and require an officer with the key to be immediately available in theatre.",
  ],
  [
    "Do prisoners have the same confidentiality rights as other patients?",
    "Yes. Custody officers may need operational information (timings, likely admission, whether the patient will be sedated) but not the diagnosis, drug history or infection status. Consultation should take place out of hearing whenever the security risk assessment allows.",
  ],
];

const ComplexNeedsAnaesthesiaTopic = () => {
  return (
    <TopicTemplate
      title="Anaesthesia for Patients with Complex Needs"
      subtitle="Learning disability, autism, severe phobia, behaviour that challenges — and anaesthesia for patients in prison custody"
      backPath="/perioperative"
      backLabel="Perioperative Medicine"
      accentColor="text-clinical"
      topicId={TOPIC_ID}
      topicTitle="Anaesthesia for Patients with Complex Needs"
      objectives={objectives}
      keyPoints={keyPoints}
      workedExamples={workedExamples}
      quizQuestions={complexNeedsAnaesthesiaQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL, Exam.FFICM] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM] },
        keyPoints: { exams: [Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        objectives: [
          "Equality Act 2010",
          "MCA 2005",
          "NICE CG142 Autism",
          "NICE NG11 Challenging Behaviour",
          "LeDeR 2023",
          "NICE NG57 Prison Health",
        ],
      }}
      coreConcepts={
        <ExamSection exams={[Exam.FINAL, Exam.FFICM]} className="scroll-mt-24">
          <div className="space-y-8">
            <p className="text-muted-foreground leading-relaxed">
              A substantial minority of patients cannot use a standard perioperative pathway. People with a learning disability, autistic patients, those with severe needle or anaesthetic phobia, and patients whose distress presents as behaviour that challenges all need the pathway rebuilt around them rather than a hurried improvisation on the morning of surgery. The same applies, for very different reasons, to patients who arrive from prison custody: the clinical care must be equivalent, but the practical, security and confidentiality arrangements are not. This topic covers the legal framework, the practical preparation, sedation and induction strategies, and the ethical issues raised by restraint and custody.
            </p>

            <TopicTableOfContents items={tocItems} />

            {/* General principles */}
            <section id="section-principles" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">General Principles &amp; Reasonable Adjustments</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">The legal duty</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Disability is a protected characteristic and services have an anticipatory duty to make <strong>reasonable adjustments</strong> — the adjustment must be in place before the patient arrives, not negotiated at the theatre door <InlineRef topicId={TOPIC_ID} refLabel="Equality Act 2010" />.</li>
                    <li>Typical adjustments: double or triple appointment times, a quiet waiting area or direct-to-theatre admission, first or last on the list, familiar carers present until induction and immediately in recovery, easy-read or pictorial information, and avoidance of repeated staff handovers.</li>
                    <li>Flag the patient's needs on the theatre list and at the safety briefing so the whole team behaves consistently.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Preparation is the intervention</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Early preassessment</strong>, ideally away from the day of surgery and with the people who know the patient best; read the hospital passport or communication plan in advance.</li>
                    <li><strong>Bundle procedures</strong> — combine dental treatment, blood tests, imaging, examination under anaesthesia and screening into one anaesthetic to minimise lifetime exposure to distressing encounters.</li>
                    <li><strong>Desensitisation and rehearsal</strong> — theatre or ward familiarisation visits, photographs of the room and staff, social stories, play-specialist or clinical-psychology input, topical local anaesthetic cream applied at home.</li>
                    <li><strong>Agree the plan in writing</strong>: premedication, induction route, who holds what if holding is needed, agreed abort criteria, recovery plan and analgesia.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Team and service factors</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Involve the hospital <strong>learning disability liaison nurse</strong> or acute liaison team early; they coordinate adjustments, best-interests meetings and follow-up.</li>
                    <li>Provision of anaesthesia services should include identified pathways and staff training for patients with additional needs, and staff in England are now required to receive learning disability and autism training <InlineRef topicId={TOPIC_ID} refLabel="RCoA GPAS 2023" />.</li>
                    <li>Document what worked so the next admission starts from an evidence base rather than from zero.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Learning disability */}
            <section id="section-learning-disability" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Learning Disability</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Why outcomes are worse</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>People with a learning disability die substantially younger than the general population, and reviews repeatedly judge a large share of those deaths avoidable with better care <InlineRef topicId={TOPIC_ID} refLabel="LeDeR 2023" />.</li>
                    <li><strong>Diagnostic overshadowing</strong> — new symptoms are attributed to the disability rather than investigated. A patient who becomes withdrawn, aggressive or immobile may be in pain, obstructed, hypoxic or septic.</li>
                    <li>Communication barriers delay presentation and consent; pain is frequently under-recognised and under-treated.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Associated physical comorbidity</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Epilepsy</strong> — continue antiepileptics perioperatively, plan the fasting-period doses and a parenteral route, and avoid unnecessarily proconvulsant drug choices.</li>
                    <li><strong>Aspiration risk</strong> — dysphagia, gastro-oesophageal reflux, drooling, thickened-fluid diets and previous chest infections; consider modified induction and airway protection.</li>
                    <li><strong>Airway and skeletal issues</strong> — kyphoscoliosis, restrictive lung disease, limited neck movement, dental disease, and syndrome-specific airways (e.g. Down syndrome: atlanto-axial instability, subglottic narrowing, obstructive sleep apnoea, congenital heart disease).</li>
                    <li><strong>Constipation, dehydration and polypharmacy</strong> — antipsychotics and antiepileptics bring QT prolongation, sedation and drug-interaction risk.</li>
                    <li><strong>Difficult venous access</strong> after years of procedures; plan ultrasound-guided access and consider inhalational induction first.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Assessing pain without self-report</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Use an observational tool and — crucially — the carers' knowledge of this individual's pain behaviours (vocalisation, guarding, rocking, withdrawal, appetite change, aggression).</li>
                    <li>Prescribe regular multimodal analgesia and local/regional blocks rather than relying on as-required opioids that depend on the patient asking.</li>
                    <li>Reassess after treating: improvement in behaviour after analgesia is itself diagnostic information.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Autism */}
            <section id="section-autism" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Autism Spectrum Disorder</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">What actually causes distress</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Autism is not a learning disability, and many autistic patients have full capacity and normal or high intellectual function — adjust the environment, not the level of explanation <InlineRef topicId={TOPIC_ID} refLabel="NICE CG142 Autism" />.</li>
                    <li><strong>Sensory load</strong>: noise, alarms, bright lights, strong smells (alcohol gel, volatile agents), unexpected touch, tight blood-pressure cuffs, gowns and adhesive dressings.</li>
                    <li><strong>Unpredictability</strong>: long unexplained waits, changing staff, changing plans, and being told "just a little scratch" when it is not.</li>
                    <li>Perioperative planning built around sensory and communication needs reduces distress, restraint and cancelled procedures <InlineRef topicId={TOPIC_ID} refLabel="Vlassakova Autism 2016" />.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Practical adjustments</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Ask the patient (or their supporter) what helps: headphones, sunglasses, own clothes, a weighted blanket, a specific comfort object, no eye contact, written rather than spoken instruction.</li>
                    <li>Give exact, literal information with timings; avoid euphemism and avoid promising what may not happen.</li>
                    <li>Reduce the number of people in the anaesthetic room to the minimum; one person speaks.</li>
                    <li>Consider a "straight to theatre" pathway, no premedication if not wanted, or self-administered inhalational induction with the patient controlling the mask.</li>
                    <li>Plan for emergence: unfamiliar recovery areas are a common flashpoint — quiet bay, familiar supporter present, avoid abrupt awakening and repeated questioning.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Phobia */}
            <section id="section-phobia" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Severe Needle &amp; Anaesthetic Phobia</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Recognition</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Specific phobias (trypanophobia, mask phobia, fear of loss of control or of awareness, claustrophobia in scanners) cause avoidance of surgery altogether, late presentation, and vasovagal collapse at induction.</li>
                    <li>Ask directly at preassessment about previous traumatic anaesthetic or dental experiences, fainting with needles, and what the patient fears specifically — "the mask", "not waking up", "being awake and paralysed" all demand different answers.</li>
                    <li>Consider intraoperative awareness anxiety in patients with prior awareness or with a family history; depth-of-anaesthesia monitoring and an explicit plan can be therapeutic.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Management ladder</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Psychological first</strong>: explanation and control-giving (the patient decides the arm, counts down, applies the mask), graded exposure, distraction, hypnosis or CBT for elective cases with time available; clinical psychology referral where surgery is repeatedly cancelled.</li>
                    <li><strong>Vasovagal precautions</strong>: supine or head-down cannulation, applied tension technique, avoid the patient watching, avoid prolonged fasting-related hypovolaemia.</li>
                    <li><strong>Topical anaesthesia</strong>: high-concentration lidocaine/prilocaine or tetracaine cream applied early and to more than one site, plus ethyl chloride spray or a vapocoolant, and a small-gauge cannula in a well-warmed hand.</li>
                    <li><strong>Pharmacological</strong>: oral or buccal benzodiazepine premedication, nitrous oxide/oxygen 50:50 self-administered for cannulation, intranasal or buccal dexmedetomidine, or a sevoflurane inhalational induction avoiding needles altogether until asleep.</li>
                    <li>Record which combination worked, so the next episode of care is not a fresh trauma.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Behaviour */}
            <section id="section-behaviour" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Behaviour That Challenges &amp; Sedation Strategies</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Behaviour is communication</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Behaviour that challenges usually reflects unmet need — pain, fear, hunger, thirst, constipation, needing the toilet, sensory overload or loss of routine. Exclude physical causes before escalating sedation <InlineRef topicId={TOPIC_ID} refLabel="NICE NG11 Challenging Behaviour" />.</li>
                    <li>Non-pharmacological de-escalation, environmental modification and a proactive support plan come before medication; psychotropics must not be used as a substitute for adjustment.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Premedication and induction options</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Oral or buccal midazolam</strong> — rapid, familiar, but can cause paradoxical disinhibition; ask carers whether previous benzodiazepines helped or worsened behaviour.</li>
                    <li><strong>Oral clonidine</strong> — smoother, longer-onset anxiolysis with sedation and analgesic sparing; plan for bradycardia and hypotension and allow adequate onset time.</li>
                    <li><strong>Intranasal or buccal dexmedetomidine</strong> — useful where midazolam has failed; produces cooperative sedation with maintained airway, again with bradycardia and slower onset.</li>
                    <li><strong>Oral ketamine</strong> — effective in the highly resistant patient, with dissociation and greater secretion/emergence-phenomena risk; consider an antisialagogue and quiet recovery.</li>
                    <li><strong>Inhalational induction</strong> with sevoflurane, carer-assisted, avoids the needle entirely; secure access once anaesthetised. Intramuscular ketamine is a rescue option only within an agreed, documented plan.</li>
                    <li>Doses for all of these are set out in the premedication section of the preoperative assessment topic; give them where the patient is monitored and reversal, airway equipment and trained staff are immediately available.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Safety of premedication in this group</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Obstructive sleep apnoea, obesity, hypotonia, chronic lung disease and existing psychotropic load all increase the risk of over-sedation and airway obstruction — monitor with oximetry and never leave the patient unattended.</li>
                    <li>Beware additive QT prolongation, and additive hypotension/bradycardia when clonidine or dexmedetomidine is added to existing antipsychotics or antihypertensives.</li>
                    <li>If the patient is already sedated when the list slips, keep them monitored; do not let the delay convert planned premedication into an unmonitored one.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Communication */}
            <section id="section-communication" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Communication Strategies</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Find out how this person communicates — before they arrive</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Read the <strong>hospital passport / communication passport</strong> and ask carers or family how the patient expresses yes/no, pain, fear and refusal. Behaviour is communication: withdrawal, rocking, echolalia, grabbing or aggression may all mean "no" or "it hurts".</li>
                    <li>Document the patient's preferred name, pronouns, first words/signs and their tolerance for touch, eye contact and personal questions; hand this to every member of the team at the briefing.</li>
                    <li>Book professional communication support in advance: British Sign Language or deafblind interpreters, Makaton signers, speech-and-language therapy input, and learning-disability liaison nurses <InlineRef topicId={TOPIC_ID} refLabel="NICE NG11 Challenging Behaviour" />.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Adapt the message</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Easy-read and pictorial information</strong>: simple sentences, one idea per line, photographs of the actual environment, equipment and (where possible) the staff who will be present. Anaesthesia-specific easy-read leaflets exist and should be offered as standard.</li>
                    <li><strong>Social stories and visual timetables</strong> for autistic patients: a step-by-step "what will happen" sequence with real timings, which can be rehearsed at home and updated if the list order changes.</li>
                    <li><strong>Verbal style</strong>: short concrete sentences, no idioms or euphemism ("you will feel a scratch" is dishonest — say "a sharp sting for a few seconds"), one question at a time, and allow processing time before repeating.</li>
                    <li><strong>Augmentative and alternative communication (AAC)</strong>: communication boards, symbol sets, picture-exchange systems, electronic voice-output devices and the patient's own tablet — ensure the device goes with the patient to theatre and recovery.</li>
                    <li>Demonstrate equipment (mask, cannula, saturation probe) on a teddy, a carer or the patient's own hand first; allow the patient to handle it.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Communication as consent support, and communication under anaesthesia</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Every practicable step to help the patient understand, retain, use/weigh and communicate their decision must be taken before concluding they lack capacity — adapted communication is a legal requirement of the capacity assessment, not an optional extra <InlineRef topicId={TOPIC_ID} refLabel="MCA 2005" />.</li>
                    <li>One designated communicator (often the supporter the patient trusts) reduces confusion; brief them that they support the patient's own decision, not make it for them.</li>
                    <li>For patients having awake procedures, agree signals in advance (raise a hand for a break, a buzzer for stop) and check understanding before starting.</li>
                    <li>Record what communication worked and what did not, so the next episode of care starts from a known position.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Sedation alternatives */}
            <section id="section-sedation-alternatives" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Sedation Alternatives</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Non-pharmacological alternatives — always the first rung</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Preparation techniques</strong>: graded exposure and desensitisation programmes, rehearsal visits, play-specialist and clinical-psychology input, and CBT or hypnotherapy for needle and mask phobia where time allows.</li>
                    <li><strong>Distraction and control-giving</strong>: tablets/video, music through headphones, guided breathing, counting down with the patient, the patient applying their own mask or choosing the arm for cannulation.</li>
                    <li><strong>Virtual and augmented reality</strong> headsets for cannulation and regional blocks, with growing evidence for procedural anxiety in children and adults with additional needs.</li>
                    <li><strong>Sensory modulation</strong>: weighted blankets, dimmed lights, noise reduction, familiar objects and own clothing frequently make sedation unnecessary.</li>
                    <li><strong>Scheduling as treatment</strong>: first on the list, minimal fasting drift, direct-to-theatre admission and a single trusted team reduce anticipatory arousal more effectively than any drug.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Procedural alternatives to sedation or general anaesthesia</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Regional anaesthesia alone</strong> — a spinal, epidural or peripheral block with generous explanation, a screened-off field, music and a familiar supporter is often better tolerated than expected; pair with the communication strategies above and agree "stop" signals in advance.</li>
                    <li><strong>Local anaesthesia with infiltration or topical agents</strong> for suitable procedures, with slow injection, buffering and small-gauge needles; offer nitrous oxide/oxygen 50:50 (Entonox) self-administered as an adjunct for the needle-phobic patient with capacity.</li>
                    <li><strong>Sedation under regional block</strong> where full wakefulness is intolerable: low-dose propofol target-controlled infusion, or a single-agent strategy with depth monitoring — but remember sedation in a patient who cannot reliably report distress requires the same monitoring standards as anaesthesia and an agreed abort plan.</li>
                    <li><strong>Choice of general anaesthetic technique</strong> when GA is unavoidable: patient-controlled inhalational induction with sevoflurane, TIVA to reduce postoperative nausea and emergence phenomena, and deep extubation where appropriate to smooth emergence.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Escalating safely</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Move up the ladder only when the rung below has genuinely been offered: adjustments → preparation/distraction → topical/local/regional → inhaled nitrous → oral/buccal/intranasal premedication → inhalational induction → (rarely, within a documented plan) intramuscular rescue <InlineRef topicId={TOPIC_ID} refLabel="NICE NG11 Challenging Behaviour" />.</li>
                    <li>Each step up increases monitoring requirements and the need for trained staff, reversal agents and airway equipment immediately available — never administer sedating medication in an unmonitored corridor.</li>
                    <li>Record which rung succeeded; "sedation ladder that works for this patient" is among the most valuable entries in the hospital passport.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Capacity */}
            <section id="section-capacity" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Capacity, Consent &amp; Restraint</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Capacity framework</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Capacity is assumed, is decision- and time-specific, and must be supported — easy-read material, pictures, interpreters, communication passports and a supporter all count as support before any conclusion of incapacity <InlineRef topicId={TOPIC_ID} refLabel="MCA 2005" />.</li>
                    <li>Where capacity is lacking, treatment proceeds in the patient's <strong>best interests</strong> using the least restrictive option, with a documented best-interests meeting, consultation of family/carers, and an IMCA where there is no one appropriate to consult.</li>
                    <li>Check for a valid <strong>Lasting Power of Attorney for health and welfare</strong>, court-appointed deputy or advance decision; serious or contested decisions (including sterilisation or withdrawal of life-sustaining treatment) go to the Court of Protection.</li>
                    <li>Fluctuating capacity, and capacity for one decision but not another, are both common — reassess rather than carrying forward a label.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Restraint and clinical holding</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Lawful only where the patient lacks capacity, it is <strong>necessary to prevent harm</strong> to them, and is <strong>proportionate</strong> in degree and duration to the likelihood and seriousness of that harm <InlineRef topicId={TOPIC_ID} refLabel="MCA 2005" />.</li>
                    <li>Plan it: who holds which limb, for how long, agreed abort criteria, the minimum number of staff, and the least restrictive method — usually brief supportive holding for an inhalational induction, not prolonged force for cannulation <InlineRef topicId={TOPIC_ID} refLabel="FFLM Restraint 2022" />.</li>
                    <li>Document the assessment, the alternatives tried, who was consulted, what was done and for how long; debrief the team, the patient's carers and the patient afterwards.</li>
                    <li>Consider whether the arrangements amount to a <strong>deprivation of liberty</strong> requiring separate authorisation, particularly with prolonged inpatient stays or continuous supervision.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Consent in practice */}
            <section id="section-consent-practice" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Consent in Practice</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">A staged consent pathway</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Start early</strong> — consent for this group is a process over weeks, not a signature on the day. Begin at the surgical referral, continue at a dedicated preassessment, and confirm on the day.</li>
                    <li><strong>Provide information in the right format first</strong> — easy-read leaflets, photographs, videos or a familiarisation visit; document what was given and how the patient engaged with it. Information the patient cannot process is not information.</li>
                    <li><strong>Assess capacity for this specific decision</strong>, with all communication support in place and at the patient's best time of day. Support includes quiet surroundings, the trusted supporter, and repetition across more than one visit <InlineRef topicId={TOPIC_ID} refLabel="MCA 2005" />.</li>
                    <li><strong>Check for existing legal instruments</strong>: health-and-welfare LPA, court-appointed deputy, advance decision to refuse treatment, or a previous best-interests decision for the same procedure.</li>
                    <li><strong>Document the discussion and the plan</strong>: what the patient understood, what they value (e.g. "must have mum present"), agreed adjustments, premedication plan, and any holding plan if capacity is lacking.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">When the patient cannot consent</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Convene a <strong>best-interests meeting</strong>: anaesthetist, surgeon/proceduralist, carers/family, learning-disability liaison nurse and an IMCA where no one appropriate can be consulted. Record options considered, the least-restrictive choice and the reasons.</li>
                    <li>Best interests are not best medical interests alone — weigh the patient's past and present wishes, beliefs and values, and the views of those who know them <InlineRef topicId={TOPIC_ID} refLabel="MCA 2005" />.</li>
                    <li>Serious, finely-balanced or contested decisions, and procedures such as sterilisation, require the <strong>Court of Protection</strong>; allow time for this at the start of the pathway, not the night before surgery.</li>
                    <li>Deprivation-of-liberty safeguards: prolonged admission, continuous supervision or sedation/restraint regimes may need separate authorisation — escalate to the hospital safeguarding team.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Emergencies, refusal and fluctuating capacity</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>In a genuine emergency, treatment immediately necessary to save life or prevent serious deterioration may proceed in best interests without a meeting — document why delay was impossible and consult retrospectively.</li>
                    <li>Respect a capacitous refusal even when it seems unwise, and even when the family disagree; a patient with a learning disability who retains and weighs the decision can decline surgery.</li>
                    <li>Fluctuating capacity (delirium, seizure activity, metabolic encephalopathy, time-of-day variation) means reassessing at the decision point — capacity gained overnight can restore the patient's right to decide for themselves.</li>
                    <li>Plan for refusal scenarios in advance where refusal is predictable: agree with the team and family what will happen if the patient says no on the day, and under what circumstances the case is stood down rather than escalated.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Prisoners */}
            <section id="section-prisoners" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Anaesthesia for Patients Who Are Prisoners</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Principle of equivalence</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>People in prison are entitled to healthcare equivalent in quality and access to that of the wider population; custody must not change the clinical decision <InlineRef topicId={TOPIC_ID} refLabel="NICE NG57 Prison Health" />.</li>
                    <li>Access barriers are real: escort availability, staff shortages and security cancellations delay elective surgery, investigations and follow-up, so presentations are often later and more advanced.</li>
                    <li>Where a procedure is likely to be cancelled repeatedly for escort reasons, prioritise bundling investigations and definitive treatment into a single admission.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Consent, capacity and coercion</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>A prisoner with capacity consents and may refuse, exactly like any other adult. No prison officer, governor or court can consent on their behalf.</li>
                    <li>Be alert to <strong>coercion in either direction</strong>: hospital attendance may be desirable ("a day out"), leading to symptom exaggeration, or feared, leading to refusal of needed surgery. Explore motivation privately and neutrally.</li>
                    <li>Undiagnosed and undertreated mental illness, personality disorder, self-harm and suicidality are all over-represented; involve mental health and substance-misuse services early <InlineRef topicId={TOPIC_ID} refLabel="NICE NG66 Criminal Justice" />.</li>
                    <li>Where capacity is impaired, the Mental Capacity Act framework applies unchanged — imprisonment is not incapacity.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Confidentiality and dignity</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Take the history out of officers' hearing whenever the security risk assessment allows; officers receive only operational information (timing, likely admission, sedation, mobility).</li>
                    <li>Do not record or discuss the index offence; it is rarely clinically relevant and knowing it risks biasing care and breaching dignity.</li>
                    <li>Manage the environment so the patient is not needlessly exposed as a prisoner to other patients, and agree who remains in the anaesthetic room and theatre before the patient arrives.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Restraints, escorts and practical safety</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Handcuffs, closeting chains and escort chains are <strong>clinically hazardous</strong> during anaesthesia: they obstruct positioning, venous and arterial access, diathermy return-plate siting, CPR, imaging (absolutely contraindicated in MRI) and emergency airway access.</li>
                    <li>Request removal for induction, surgery and recovery. If the security risk assessment requires restraint to continue, document the request, the reason for refusal, who authorised it, and require an officer with the key to remain immediately at hand throughout <InlineRef topicId={TOPIC_ID} refLabel="FFLM Restraint 2022" />.</li>
                    <li>Anticipate difficult positioning, delayed emergency response and the possibility that the patient cannot be safely moved rapidly — factor this into the anaesthetic plan and the choice of technique.</li>
                    <li>Escorting officers are not clinical staff: they must not be relied upon for monitoring, chaperoning or interpreting, and should be briefed on infection control and theatre etiquette.</li>
                    <li>Plan for absconding risk in a way that is proportionate — the answer is usually staffing and layout, not restraining an anaesthetised patient.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Comorbidity, drugs and analgesia</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Expect higher rates of smoking, alcohol and opioid dependence, injecting-related venous damage and infection, bloodborne viruses (hepatitis B and C, HIV), tuberculosis and poor dental health.</li>
                    <li>Obtain the prison drug chart: <strong>opioid substitution therapy (methadone or buprenorphine) must be continued</strong> and predicts markedly higher perioperative analgesic requirements — see the psychiatric disease and substance misuse topic.</li>
                    <li>Plan withdrawal management for alcohol, opioids, benzodiazepines and nicotine on admission; unrecognised withdrawal is a common cause of postoperative agitation and deterioration in this group.</li>
                    <li>Analgesia is prescribed on clinical need. Manage diversion risk with supervised administration, non-divertible formulations, regional techniques and multimodal analgesia — never by systematically under-treating pain.</li>
                    <li>Consider difficult venous access from previous injecting and plan ultrasound-guided or central access early.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Discharge and continuity of care</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Write a discharge plan the prison healthcare team can actually deliver: analgesia (with controlled-drug supply arrangements), VTE prophylaxis, wound and drain care, mobilisation and physiotherapy, and follow-up requiring an escort.</li>
                    <li>Communicate directly with prison healthcare rather than relying on the escorting officers to pass on clinical instructions.</li>
                    <li>Flag red-flag symptoms explicitly and in writing, since a prisoner's ability to seek urgent review is limited by regime and staffing.</li>
                    <li>Consider imminent release or transfer, which can interrupt follow-up entirely.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Postoperative care */}
            <section id="section-postop" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Postoperative Care &amp; Recovery</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">A planned, adjusted recovery</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Smooth emergence by design</strong>: deep extubation where appropriate, avoidance of unnecessary stimulation, reversal of residual neuromuscular block confirmed, and pre-emptive treatment of emergence agitation risk (e.g. residual sevoflurane effect, pain, full bladder, hunger).</li>
                    <li><strong>Familiar supporter at the bedside before waking</strong> — recovery staff should know the patient's name, communication method and calming strategies from the handover, and only essential staff should be present.</li>
                    <li>Quiet side bay, dimmed lights, alarms silenced where safe, minimal cuff cycles, and early removal of unnecessary monitoring once stable.</li>
                    <li>Keep the same nurse/ODP where possible; every unfamiliar face is a fresh stressor.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Pain assessment and analgesia</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Never rely on as-required opioids that depend on the patient asking: prescribe <strong>regular multimodal analgesia</strong> (paracetamol, NSAID where appropriate) plus local/regional techniques, with a written plan for breakthrough pain.</li>
                    <li>Use an <strong>observational pain tool</strong> (e.g. Abbey Pain Scale, Disability Distress Assessment Tool, FLACC) combined with carer-reported individual pain behaviours recorded at preassessment <InlineRef topicId={TOPIC_ID} refLabel="LeDeR 2023" />.</li>
                    <li>Treat behaviour change as pain until proved otherwise; improvement after analgesia is diagnostic. Remember constipation, urinary retention and nausea as hidden causes of postoperative distress.</li>
                    <li>For patients on opioid substitution or with opioid dependence, continue the baseline prescription and add analgesia on top — under-treatment drives agitation, self-discharge and relapse.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Ward care, discharge and learning</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Hand over the <strong>whole adjusted plan</strong>, not just the operation note: fasting restart, medication timing (antiepileptics, psychotropics), mobilisation support, communication needs and what to do if the patient pulls at lines or dressings.</li>
                    <li>Anticipate <strong>postoperative delirium</strong>: keep day–night cues, hearing aids and glasses available, avoid sedative accumulation, and screen for pain, hypoxia, infection and retention before labelling agitation as behavioural.</li>
                    <li>Discharge early where safe with clear, carer-friendly written instructions, red-flag symptoms, and direct contact details; many patients with learning disability cannot navigate standard "call the ward" systems.</li>
                    <li>Involve the learning-disability liaison team in follow-up, ensure the GP and community team receive the outcome, and — for prisoners — deliver the plan to prison healthcare in writing.</li>
                    <li><strong>Close the loop</strong>: document what worked (premedication, induction route, holding plan if any, recovery strategies) in the hospital passport and discharge summary so each future anaesthetic starts from a personalised evidence base <InlineRef topicId={TOPIC_ID} refLabel="RCoA GPAS 2023" />.</li>
                  </ul>
                </div>
              </div>
            </section>

            <ExamPitfallsCallout
              accent="clinical"
              pitfalls={[
                "Never accept a family member's or carer's signature as consent for an adult — only a valid health and welfare LPA or court deputy can consent; otherwise make a documented best-interests decision.",
                "Do not equate autism with learning disability or with incapacity — many autistic patients have full capacity and need environmental, not cognitive, adjustments.",
                "Physical holding is a planned, proportionate last resort under the Mental Capacity Act, not the default plan for a patient who dislikes needles.",
                "Do not attribute new behaviour change in a patient with learning disability to their disability — diagnostic overshadowing kills; look for pain, sepsis, obstruction and hypoxia.",
                "Do not anaesthetise a handcuffed patient by default: request removal, and document the risk assessment if restraints must remain with an officer holding the key present.",
                "Never withhold opioid substitution therapy or adequate analgesia from a prisoner because of assumed drug-seeking behaviour.",
                "Do not take a prisoner's history with escorting officers listening unless the security risk assessment genuinely requires it.",
              ]}
            />
            <TopicFaqs faqs={complexNeedsFaqs} />
          </div>
        </ExamSection>
      }
    />
  );
};

export default ComplexNeedsAnaesthesiaTopic;
