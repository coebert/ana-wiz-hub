import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { massCasualtyMilitaryQuestions } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import { MajorIncidentTriageDiagram } from "@/components/diagrams/clinical/MajorIncidentTriageDiagram";
import { MilitaryRolesFlowDiagram } from "@/components/diagrams/clinical/MilitaryRolesFlowDiagram";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import InlineRef from "@/components/references/InlineRef";

const massCasualtyMilitaryFaqs: Array<[string, string]> = [
  [
    "What is the difference between primary, secondary and tertiary triage?",
    "Primary triage (Triage Sieve) at scene uses walking/breathing/pulse-or-capillary-refill to assign P1/P2/P3/Dead in <30 s. Secondary triage (Triage Sort) at casualty clearing applies the Triage Revised Trauma Score (GCS, RR, SBP). Tertiary triage occurs in hospital after initial resuscitation and continuously thereafter."
  ],
  [
    "What are the principles of damage-control resuscitation?",
    "Permissive hypotension (SBP 80–90 mmHg until haemorrhage controlled, except TBI), haemostatic resuscitation with 1:1:1 plasma:platelets:red cells, early tranexamic acid (1 g within 3 h — CRASH-2/MATTERs), avoidance of crystalloid, active rewarming, and rapid surgical haemorrhage control."
  ],
  [
    "How are nerve-agent (organophosphate) casualties managed?",
    "Don PPE and decontaminate before any clinical contact. Treat with atropine 2 mg IV repeated every 5 min until secretions dry, pralidoxime 30 mg/kg IV (reactivates acetylcholinesterase if given before ageing), and diazepam for seizures. Support airway, ventilation, and circulation. Avoid suxamethonium — prolonged paralysis."
  ]
];

const objectives = [
  "Apply the principles of major-incident command (MIMMS / NHS EPRR) to a mass-casualty event involving multiple critically injured patients",
  "Triage casualties using validated tools (Triage Sieve, Triage Sort, MPTT-24) and understand reverse triage in austere environments",
  "Use crisis resource management (CRM) — leadership, situational awareness, communication and resource allocation — under acute cognitive load",
  "Describe damage-control resuscitation, damage-control surgery and the lethal triad in the context of military and civilian trauma",
  "Outline how forward (Role 1–4) military medical care is organised and how it informs civilian disaster anaesthesia and critical care",
  "Anticipate the unique challenges of CBRN, blast, ballistic and burns casualties and the role of the anaesthetist within the wider response",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Major incident at a city centre — anaesthetist as Medical Coordinator",
    scenario:
      "A vehicle has driven into a crowd. You are the on-call consultant anaesthetist when a Major Incident is declared. Pre-alert: ≥30 casualties, an unknown number P1. The hospital activates its Major Incident Plan and you are designated Medical Coordinator (MEDCO) in ED.",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step approach (METHANE → CRM)</p>
        <ol className="list-decimal list-inside space-y-1">
          <li><strong>METHANE report</strong> from scene confirmed: Major incident declared, Exact location, Type (vehicle-as-weapon), Hazards (secondary device possible), Access, Number of casualties, Emergency services on scene.</li>
          <li><strong>Activate hospital plan</strong>: cascade call, cancel all non-urgent activity, free theatres &amp; ICU beds, surge anaesthetic and surgical rota, call blood bank for major haemorrhage stand-by.</li>
          <li><strong>Establish command</strong>: Gold (strategic — exec on call), Silver (tactical — site MEDCO), Bronze (operational — ED/theatre/ICU leads). Wear tabards. Use action cards from the plan, do not rely on memory.</li>
          <li><strong>Triage at the door</strong>: senior clinician using Triage Sieve → Sort. P1 (immediate) to resus, P2 (urgent) to majors, P3 (delayed) to minors area, P4/expectant to a designated area with palliation. Re-triage every 15 min.</li>
          <li><strong>CRM principles</strong>: stay hands-off as MEDCO — your value is overview. Allocate teams (anaesthetist + surgeon + nurse + ODP) to each P1 bay; demand SBAR updates every 10 min; appoint a runner; use a whiteboard tracker for casualties and theatres.</li>
          <li><strong>Damage-control resuscitation</strong> for haemorrhagic shock: permissive hypotension (SBP 80–90 mmHg, &gt;110 if TBI), 1:1:1 RBC:FFP:platelets, TXA &lt;3 h, calcium, warming, early surgical control. Avoid clear fluids.</li>
          <li><strong>Theatre prioritisation</strong>: damage-control surgery first (haemorrhage control, bowel stapling, packs and abbreviated closure), definitive surgery later. Theatre coordinator allocates lists.</li>
          <li><strong>Communication out</strong>: regular sit-reps to Gold; liaise with mortuary, police, families' liaison; debrief team in waves; preserve documentation for inquiry.</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>MEDCO becoming a hands-on clinician — loses overview, decisions stall.</li>
            <li>Failing to re-triage — physiology changes faster than labels.</li>
            <li>Using crystalloid resuscitation in penetrating trauma — worsens dilution and coagulopathy.</li>
            <li>Forgetting CBRN — undress, decontaminate and don PPE before bringing casualties inside.</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "Run the incident, do not run a patient. Activate the plan, command and control with action cards, triage and re-triage, push damage-control resuscitation and damage-control surgery for P1s, and communicate ruthlessly. Hot debrief and welfare for the team afterwards.",
   cites: ["Damage Control Resuscitation"],
  },
  {
    title: "Forward military critical care: blast injury at a Role 2 facility",
    scenario:
      "A 22-year-old soldier arrives at a deployed Role 2 (forward surgical) hospital after an IED detonation: traumatic above-knee amputation, peppered torso wounds, agitated, GCS 13, SBP 80, HR 140, SpO₂ unreadable. Theatre, two units of group O blood and a CT scanner are available; the next surgical capability (Role 3) is 90 min by rotary aero-medical evacuation.",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step (&lt;C&gt;ABC + DCR + DCS)</p>
        <ol className="list-decimal list-inside space-y-1">
          <li><strong>Catastrophic haemorrhage first</strong>: apply / tighten CAT tourniquet to stump, direct pressure or haemostatic gauze to torso wounds. Then ABC.</li>
          <li><strong>Airway &amp; breathing</strong>: RSI with ketamine 1–2 mg/kg + rocuronium 1.2 mg/kg (preserves BP), in-line stabilisation, eFAST and bilateral chest decompression (finger/needle) if any chest signs.</li>
          <li><strong>Damage-control resuscitation</strong>: activate massive transfusion. Whole blood (low-titre group O if available) is the military standard; otherwise 1:1:1. TXA 1 g IV bolus immediately (the time-critical dose, within 3 h of wounding), with a second 1 g given while bleeding continues rather than as a routine 8-hour infusion. Calcium chloride 1 g per 4 units. Warm everything (Belmont / fluid warmer / blankets). Permissive hypotension SBP 80–90 mmHg until haemorrhage controlled.</li>
          <li><strong>Damage-control surgery</strong>: laparotomy / thoracotomy as needed for haemorrhage and contamination control; pack, staple bowel, temporary abdominal closure (Bogota bag / negative-pressure dressing); revise amputation. &lt;90 min in theatre.</li>
          <li><strong>Critical care &amp; tactical evacuation</strong>: continue sedation (ketamine + fentanyl), paralysis, lung-protective ventilation, ongoing blood products via en-route CCAST team. Forward to Role 3 for definitive surgery and ICU.</li>
          <li><strong>Anticipate</strong>: blast lung (delayed ARDS), tympanic rupture (always check), traumatic brain injury (tight CO₂/MAP), rhabdomyolysis, fat embolism, infection (early antibiotics including anti-Pseudomonal cover for war wounds).</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Using crystalloid in haemorrhagic shock — worsens the lethal triad (acidosis, hypothermia, coagulopathy).</li>
            <li>Definitive surgery at Role 2 — risks instability and second-hit inflammation; aim to abbreviate and evacuate.</li>
            <li>Forgetting to release tourniquets when haemorrhage is controlled — limb-threatening if &gt;2 h without reassessment.</li>
            <li>Inadequate analgesia — ketamine 0.1–0.3 mg/kg boluses or low-dose infusion is the deployed analgesic of choice.</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "Stop the bleeding, support physiology with damage-control resuscitation (whole blood, TXA, calcium, warming, permissive hypotension), perform damage-control surgery in &lt; 90 min, and evacuate to definitive care under critical-care escort. The lethal triad — hypothermia, acidosis, coagulopathy — is the enemy at every step.",
   cites: ["NHS EPRR 2022"],
  },
];

const MassCasualtyMilitaryTopic = () => {
  return (
    <TopicTemplate
      title="Mass Casualty, CRM &amp; Military Anaesthesia"
      subtitle="Major-incident planning, triage, crisis resource management, damage-control resuscitation and deployed military critical care"
      backPath="/clinical"
      backLabel="Clinical"
      accentColor="text-clinical"
      topicId="mass-casualty-military"
      topicTitle="Mass Casualty, CRM &amp; Military Anaesthesia"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={massCasualtyMilitaryQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL, Exam.FFICM], curriculumCodes: ["FFICM 2.6", "RCoA Final — Trauma & Stabilisation"] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM] },
        keyPoints: { exams: [Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        objectives: [
          "MIMMS 4e",
          "NHS EPRR 2022",
          "FICM/ICS MI",
          "JSP 999",
        ],
        workedExamples: [
          "Eastridge 2012",
          "CRASH-2 2010",
          "JTS CPG",
        
          "Damage Control Resuscitation",
          "NHS EPRR 2022",
        ],
        keyPoints: [
          "MIMMS 4e",
          "Rall & Gaba CRM",
          "BJA Educ DCR 2018",
        
          "JRCALC 2022",
          "BJA Educ MCI 2017",
          "MARCH Algorithm",
          "Damage Control Resuscitation",
          "NHS EPRR 2022",
        ],
      }}
      keyPoints={[
        { text: "Major incident = casualty load exceeds normal resources. Declared by first emergency service on scene; cascade activates hospital plan.", cites: ["JRCALC 2022"] },
        { text: "METHANE message structures the alert: Major incident, Exact location, Type, Hazards, Access, Number, Emergency services.", cites: ["BJA Educ MCI 2017"] },
        { text: "Triage Sieve (walking? breathing? RR? CRT or radial pulse?) → categorises P1/P2/P3/P4 within 30 s per casualty. Respiratory threshold is now RR <10 or >22 = P1, aligned with the physiologically validated MPTT-24 and the NARU Ten Second Triage tool (legacy MIMMS taught >29/>30, which under-triaged patients needing immediate intervention). Circulation step uses CRT >2 s OR absent radial pulse (not a heart-rate cut-off). Triage Sort uses TRTS for in-hospital re-triage.", cites: ["NARU MPTT-24", "MIMMS 4e", "BJA Educ Major Incident 2017"] },
        { text: "Crisis Resource Management: leadership, role clarity, closed-loop communication, situational awareness, workload distribution, calling for help early.", cites: ["Damage Control Resuscitation"] },
        { text: "Damage-control resuscitation: permissive hypotension, 1:1:1 ratio (or whole blood), TXA &lt;3 h, calcium, warmth, early surgical haemostasis.", cites: ["NHS EPRR 2022"] },
        { text: "Damage-control surgery: abbreviated procedure to control haemorrhage and contamination, with planned return for definitive surgery once physiology corrected.", cites: ["JRCALC 2022"] },
        { text: "Military Role 1 (point of wounding) → Role 2 (forward surgical) → Role 3 (deployed hospital) → Role 4 (home) — same paradigm informs civilian disaster pathways.", cites: ["BJA Educ MCI 2017"] },
        { text: "CBRN casualties: decontaminate before treatment; PPE for staff; antidotes rehearsed (atropine/pralidoxime, hydroxocobalamin, dicobalt edetate).", cites: ["MARCH Algorithm"] },
      ]}
      coreConcepts={
        <>
          <ExamSection id="major-incident" exams={[Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Defining and Declaring a Major Incident" defaultOpen>
            <p className="text-muted-foreground leading-relaxed mb-3">
              A major incident exists when the location, number, severity or type of live casualties requires extraordinary resources.
              It can be declared by the first emergency service on scene; the receiving hospital independently declares an Internal Major Incident.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>METHANE report</strong>: Major incident standby/declared · Exact location · Type · Hazards · Access · Number of casualties · Emergency services present</li>
              <li><strong>Categories</strong>: simple vs compound (infrastructure damaged), compensated vs uncompensated, natural vs human-caused, CBRN</li>
              <li><strong>Hospital response phases</strong>: Activation → Reception &amp; triage → Definitive care → Recovery &amp; debrief</li>
              <li><strong>Command structure</strong>: Gold (strategic) – Silver (tactical) – Bronze (operational); pre-printed action cards and tabards</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="triage" exams={[Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Triage Tools">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Triage is dynamic — every casualty is re-triaged at each stage of the chain.
            </p>
            <MajorIncidentTriageDiagram />
            <div className="space-y-3">
              {[
                { tool: "Triage Sieve", detail: "Pre-hospital, &lt;30 s. Walking → P3 (delayed). Not breathing despite airway opening → Dead. Then RR &lt;10 or &gt;22 → P1; CRT &gt;2 s or absent radial pulse → P1; otherwise P2. The narrower upper respiratory threshold of 22 replaces the legacy MIMMS figure of &gt;29, matching MPTT-24 and the current NARU Ten Second Triage tool; the older cut-off missed a substantial proportion of casualties who needed life-saving intervention. No heart-rate threshold is used in the civilian sieve." },
                { tool: "Ten Second Triage (TST)", detail: "The UK's current national primary triage tool for major incidents (NARU): a rapid catastrophic-haemorrhage-first sweep giving Priority 1/2/3/Dead in about ten seconds per casualty, designed for use by any responder including police and fire, and followed by the Triage Sort in hospital." },
                { tool: "Triage Sort (TRTS)", detail: "In hospital. Scores RR, SBP, GCS to give Triage Revised Trauma Score 0–12. ≤10 = P1, 11 = P2, 12 = P3." },
                { tool: "MPTT-24 (military)", detail: "Modified Physiological Triage Tool — RR &lt;10 or &gt;22, HR &gt;100, GCS motor &lt;6 = P1. Better discrimination for needs-immediate-intervention than civilian sieve." },
                { tool: "Reverse / expectant triage", detail: "When demand vastly exceeds capacity (austere or wartime), the most resource-intensive may be designated expectant (P4) to maximise survivors. Ethically reviewed by senior team and documented." },
                { tool: "Paediatric triage tape", detail: "Length-based vital sign thresholds (e.g. JumpSTART) — children's normal ranges differ; do not apply adult sieve directly." },
              ].map(t => (
                <div key={t.tool} className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{t.tool}</p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.detail }} />
                </div>
              ))}
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="triage-ethics" exams={[Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Ethical Principles of Triage">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Major-incident triage requires a deliberate shift from the everyday duty of individual patient advocacy
              towards a utilitarian, public-health ethic: the goal becomes the greatest good for the greatest number.
              "Save the most lives" may override sickest-first or first-come-first-served norms of routine practice <InlineRef topicId="mass-casualty-military" refLabel="FICM Major Incident Ethics" />.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Duty to care</strong> — obligation to respond and treat persists, but is balanced against duties to the wider casualty population</li>
              <li><strong>Equity of access</strong> — resources allocated by clinical need and chance of benefit, not by queue position, status or ability to pay</li>
              <li><strong>Proportionality</strong> — the restriction of normal individual care (e.g. withholding resource-intensive intervention) must be proportionate to the scale of the resource shortfall</li>
              <li><strong>Reciprocity</strong> — a system obligation to support staff who make and carry out these decisions (welfare, indemnity, debrief)</li>
              <li><strong>Transparency</strong> — triage criteria and decision-making process should be explicit, pre-agreed and open to scrutiny, not ad hoc</li>
              <li><strong>Consistency</strong> — the same criteria applied to all casualties regardless of who they are</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Categorising a casualty as P4/expectant is one of the most ethically weighty decisions in a major incident.
              It should be made and documented by a senior team (not a single individual acting alone), remains reviewable
              and reversible as resources or casualty numbers change, and does not discharge the obligation to provide
              analgesia and palliative care to expectant patients <InlineRef topicId="mass-casualty-military" refLabel="GMC Good Medical Practice 2024" />.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Robust documentation and audit of triage decisions protect both patients and staff and support learning.
              Moral distress among staff who must apply population-level rationing is a recognised occupational hazard —
              anticipate it, name it, and build in hot and cold debrief and welfare support as part of the response plan.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="crm" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["FFICM 11"]}>
            <CollapsibleSubsection title="Crisis Resource Management (CRM)">
            <p className="text-muted-foreground leading-relaxed mb-3">
              CRM (Gaba, Rall, Howard) translates aviation human-factors science into the operating theatre and ICU.
              In a mass-casualty event, technical skill is rarely the bottleneck — coordination, communication and cognition are.
              These are observable, assessable behaviours (analogous to the ANTS non-technical skills framework), not abstract theory <InlineRef topicId="mass-casualty-military" refLabel="Gaba CRM 2015" />.
            </p>
            <div className="space-y-3">
              {[
                {
                  principle: "Leadership",
                  good: "One named leader declared aloud, stays hands-off to retain overview, makes and owns decisions.",
                  poor: "No declared leader; the most senior person scrubs in and loses situational overview; decisions drift or are duplicated.",
                },
                {
                  principle: "Role allocation",
                  good: "Explicit, named roles (\"you — airway; you — IV access and bloods; you — scribe\") assigned before the casualty arrives.",
                  poor: "Ambiguous \"someone should...\" instructions; several staff attempt the same task while others are neglected.",
                },
                {
                  principle: "Communication (closed-loop)",
                  good: "\"Give 1 g TXA now\" → \"1 g TXA given\" spoken back and confirmed; SBAR used for handover.",
                  poor: "Instructions shouted into the room with no name attached; no confirmation that a drug or task was actually completed.",
                },
                {
                  principle: "Situational awareness (10-for-10)",
                  good: "Leader calls a deliberate 10-second pause every 10 minutes to step back, summarise progress and re-plan.",
                  poor: "Continuous task-focus with no scheduled pause; fixation on one casualty while others deteriorate unnoticed.",
                },
                {
                  principle: "Resource allocation",
                  good: "Blood products, theatres and staff tracked on a whiteboard and actively redirected to the sickest survivable casualties.",
                  poor: "First-come-first-served use of blood/theatre capacity with no overview of competing demand elsewhere.",
                },
                {
                  principle: "Task distribution / workload management",
                  good: "Cognitive tasks (planning, prioritising) kept with the leader; technical tasks delegated to the team, matched to competence.",
                  poor: "The leader also tries to cannulate, intubate and document — cognitive overload, missed developments elsewhere.",
                },
                {
                  principle: "Verbalising the mental model",
                  good: "Leader states the plan aloud (\"we are treating this as haemorrhagic shock, aiming for permissive hypotension, theatre is being prepared\") so the whole team shares it.",
                  poor: "Plan exists only in the leader's head; team members act on their own assumptions, leading to conflicting actions.",
                },
                {
                  principle: "Re-evaluation",
                  good: "Repeated, explicit reassessment: \"is the patient getting better?\"; triage category and plan revised as physiology changes.",
                  poor: "Initial diagnosis or triage category treated as fixed; deterioration missed because no one re-assessed.",
                },
                {
                  principle: "Calling for help",
                  good: "Help requested early and specifically (named senior, blood bank, second surgeon) before the situation is unrecoverable.",
                  poor: "Help sought only once the team is overwhelmed, or not sought at all due to perceived loss of face.",
                },
              ].map(row => (
                <div key={row.principle} className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{row.principle}</p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed"><span className="text-foreground font-medium">Good practice:</span> {row.good}</p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed"><span className="text-foreground font-medium">Poor practice:</span> {row.poor}</p>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Debrief (hot immediately, cold later) should explicitly assess these behaviours alongside clinical outcomes: psychological safety, learning rather than blaming, and documentation for governance.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="dcr-dcs" exams={[Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Damage-Control Resuscitation & Surgery">
            <p className="text-muted-foreground leading-relaxed mb-3">
              The defining advance from military experience over the last two decades.
              The lethal triad — hypothermia, acidosis, coagulopathy — feeds itself; DCR/DCS is designed to interrupt the loop.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Permissive hypotension</strong>: SBP 80–90 mmHg until haemorrhage controlled (&gt;110 if TBI). Avoids "pop-the-clot" rebleeding and dilution</li>
              <li><strong>Haemostatic resuscitation</strong>: 1:1:1 ratio of RBC:FFP:platelets (PROPPR trial), or whole blood (military standard, growing civilian uptake)</li>
              <li><strong>Tranexamic acid 1 g IV</strong> within 3 h (CRASH-2; CRASH-3 for TBI); maintenance 1 g over 8 h. After 3 h may worsen outcome</li>
              <li><strong>Calcium</strong>: ionised Ca²⁺ &gt;1.0 mmol/L; give 1 g calcium chloride per 4 units of blood products (citrate chelation + calcium is factor IV)</li>
              <li><strong>Warm everything</strong>: target core temperature &gt;36 °C; fluid warmer, forced air, warmed environment</li>
              <li><strong>Damage-control surgery</strong>: stop bleeding, control contamination, abbreviate (&lt;90 min), pack and temporary closure; planned return for definitive surgery once physiology corrected</li>
              <li><strong>Adjuncts</strong>: REBOA (resuscitative endovascular balloon occlusion of aorta) Zone 1/3; thoracotomy for penetrating chest with witnessed arrest</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="military" exams={[Exam.FFICM]} curriculumCodes={["FFICM 2.6"]}>
            <CollapsibleSubsection title="Military Anaesthesia & Critical Care">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Defence Medical Services deliver care along a graded chain. The same Roles framework underpins NATO doctrine and informs civilian
              regional trauma networks and pre-hospital emergency medicine.
            </p>
            <MilitaryRolesFlowDiagram />
            <div className="space-y-3">
              {[
                { role: "Role 1", detail: "Point of wounding / unit aid post. CABC, tourniquets, haemostatic dressings, decompression, IV/IO access, TXA, ketamine analgesia, basic airway. Combat Application Tourniquet, chest seals." },
                { role: "Role 2 (Light Manoeuvre / Enhanced)", detail: "Forward surgical capability. Damage-control resuscitation and damage-control surgery; small ICU footprint; blood-on-the-shelf (whole blood / 1:1:1). Aim: stabilise &lt;90 min, evacuate." },
                { role: "Role 3", detail: "Deployed hospital with full surgical specialties, CT, ICU, blood bank. Definitive haemorrhage control, complex orthopaedics/neurosurgery, burns stabilisation. Equivalent to a UK MTC deployed forward." },
                { role: "Role 4", detail: "Home-base definitive and rehabilitative care (e.g. Royal Centre for Defence Medicine, Birmingham). Prosthetics, plastics, neuro-rehabilitation, mental-health support." },
                { role: "CCAST", detail: "Critical Care Air Support Team — RAF anaesthetists/intensivists with ventilator, monitoring, blood and pumps, transferring ventilated patients between Roles by C-17 / A400M." },
              ].map(r => (
                <div key={r.role} className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{r.role}</p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{r.detail}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground italic mt-3">
              Key military-derived practices now standard in civilian trauma: tourniquets, TXA, 1:1:1 / whole blood, REBOA,
              forward damage-control surgery, junctional haemorrhage devices, and pre-hospital blood products.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="special-casualties" exams={[Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Special Casualty Categories">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Blast injury</strong>: primary (barotrauma — blast lung, tympanic rupture, bowel), secondary (fragments), tertiary (displacement), quaternary (burns, crush, inhalation). Always examine tympanic membranes and anticipate delayed ARDS</li>
              <li><strong>Ballistic / penetrating</strong>: damage-control surgery; consider thoracotomy for cardiac arrest with penetrating chest trauma &lt;15 min downtime</li>
              <li><strong>Burns</strong>: airway oedema (early intubation if &gt;30% TBSA / facial burns / soot in airway), Parkland formula 2–4 mL/kg/%TBSA Hartmann's first 24 h, escharotomy for circumferential. Carbon monoxide and cyanide poisoning suspected in enclosed-space fires (hydroxocobalamin)</li>
              <li><strong>CBRN</strong>: decontamination BEFORE entry; PPE level appropriate to agent; antidotes — atropine + pralidoxime (organophosphate/nerve), hydroxocobalamin (cyanide), dicobalt edetate (cyanide alt), DMPS (heavy metals), potassium iodide (radioactive iodine). Agent-specific management is expanded below.</li>
              <li><strong>Crush syndrome</strong>: aggressive crystalloid before extrication (1 L/h adult), monitor for hyperkalaemia, rhabdomyolysis, AKI; alkalinisation of urine if myoglobinuric</li>
              <li><strong>Paediatric</strong>: weight-based drug calculations (Broselow tape), psychological support, parents not always present, smaller margin for error in fluid &amp; airway management</li>
            </ul>

            <h3 className="text-lg font-serif font-bold text-foreground mt-6 mb-2">
              CBRN Casualties — Agent-Specific Management <InlineRef topicId="mass-casualty-military" refLabel="UKHSA CBRN" />
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              The governing principle is <strong className="text-foreground">staff safety and decontamination before treatment</strong>: contaminated casualties are managed in the
              cold-zone Initial Operational Response (disrobe — removing outer clothing removes up to 80% of contaminant — then dry or wet decontamination) before entry to the
              clean clinical area. Anaesthetists work in powered respirator PPE with impaired dexterity, vision and communication, so airway plans must be simplified,
              videolaryngoscopy favoured, and drugs pre-drawn and labelled. Do not bring an undecontaminated patient into theatre or ICU.
            </p>
            <div className="space-y-3">
              {[
                {
                  agent: "Nerve agents (sarin, VX, Novichok) and organophosphates",
                  detail: "Acetylcholinesterase inhibition → muscarinic (SLUDGE: salivation, lacrimation, urination, defaecation, GI cramps, emesis, bronchorrhoea, bronchospasm, bradycardia, miosis) plus nicotinic (fasciculation, weakness, paralysis) and central (seizures, apnoea) effects. Death is from bronchorrhoea, bronchospasm and respiratory muscle paralysis. Treat with high-dose atropine titrated to drying of secretions and adequate oxygenation (doubling doses, often tens of milligrams — pupils are not the endpoint), an oxime (pralidoxime or obidoxime by infusion) to reactivate enzyme, and benzodiazepines (diazepam/midazolam) for seizures and as prophylaxis in severe exposure. Expect prolonged apnoea and a very prolonged suxamethonium block (plasma cholinesterase is also inhibited) — use a non-depolarising agent and anticipate ventilation for days; intermediate syndrome may cause relapse of weakness."
                },
                {
                  agent: "Vesicants / blister agents (sulphur mustard, lewisite)",
                  detail: "Alkylating agents causing delayed (2–24 h) erythema, blistering, painful keratoconjunctivitis and airway mucosal sloughing; systemic mustard is myelosuppressive with a nadir at 7–14 days. Management is essentially burns care: meticulous decontamination (mustard persists on skin and clothing and can contaminate staff), analgesia, fluid resuscitation using burns formulae but recognising fluid losses are usually less than thermal burns of equivalent area, eye irrigation with topical mydriatics and lubricants, and early airway assessment because pseudomembrane formation can obstruct the trachea and require bronchoscopy. There is no antidote for mustard; lewisite is amenable to chelation with dimercaprol (BAL) or DMPS. Monitor full blood count for delayed neutropenia and treat as an immunocompromised patient."
                },
                {
                  agent: "Pulmonary / choking agents (chlorine, phosgene, ammonia)",
                  detail: "Water-soluble agents (chlorine, ammonia) cause immediate upper airway and conjunctival irritation with laryngeal oedema; poorly soluble phosgene penetrates distally and produces non-cardiogenic pulmonary oedema after a latent period of up to 24 h. Management is supportive: remove from exposure, humidified oxygen, nebulised bronchodilators, low threshold for intubation before airway oedema progresses, and lung-protective ventilation with PEEP for the resulting ARDS. Nebulised sodium bicarbonate may relieve chlorine-induced bronchospasm. Enforce a minimum 24 h observation period after significant phosgene exposure, avoid exertion (which worsens oedema), and do not rely on an initially normal chest radiograph. Steroids and prophylactic antibiotics are not routinely indicated."
                },
                {
                  agent: "Cyanide (hydrogen cyanide, cyanogen chloride, enclosed-space fires)",
                  detail: "Cytochrome oxidase inhibition → cellular asphyxia with normal SpO₂, severe lactic acidosis, a narrowed veno-arterial oxygen difference and rapid loss of consciousness. Give high-flow oxygen and hydroxocobalamin as first-line (safe in the smoke-inhalation patient and does not impair oxygen carriage; expect red discolouration of skin and urine and interference with colorimetric assays); alternatives are sodium thiosulphate and, where hypoxaemia is not co-existent, dicobalt edetate or sodium nitrite. Correct acidosis and support ventilation."
                },
                {
                  agent: "Riot-control agents (CS, CN, PAVA/OC spray)",
                  detail: "Transient sensory irritants producing intense blepharospasm, lacrimation, rhinorrhoea, cough, chest tightness and skin burning. Effects usually settle within 20–30 minutes in fresh air. Management is reassurance, removal from exposure, dry decontamination and copious eye irrigation with saline (air-drying works better than water for CS-contaminated skin, and wetting CS can transiently worsen symptoms). Watch for bronchospasm in asthmatics, for high-concentration enclosed-space exposure causing genuine chemical pneumonitis, and for the airway of a struggling restrained patient — always consider the differential of head injury, hypoxia or excited delirium rather than attributing collapse to the spray."
                },
                {
                  agent: "Radiological / nuclear",
                  detail: "Distinguish irradiation (patient is not a hazard) from contamination (external or internal — patient and wound debris are a hazard, though dose to staff from a contaminated casualty is low and must never delay life-saving treatment). Priorities are ABC and surgery first, then decontamination: remove clothing, wash with soap and water, cover wounds, use radiation monitors and a controlled 'dirty' area, collect wound tissue and swabs for dosimetry. Estimate dose from the time to onset of vomiting and serial lymphocyte counts (rapid lymphopenia predicts a high dose). Treat acute radiation syndrome haematologically (isolation, G-CSF, transfusion support). Blocking or chelating agents are agent-specific: potassium iodide for radioiodine (most effective if given before or within hours of exposure), Prussian blue for caesium, DTPA for plutonium and other actinides. Ideally operate within the first 48 h before immunosuppression and impaired wound healing develop."
                },
                {
                  agent: "Biological agents (anthrax, plague, tularaemia, viral haemorrhagic fever)",
                  detail: "Presentation is delayed and epidemiological rather than a scene-based surge, so the first sign is often an unusual cluster of severe pneumonia or sepsis. Apply syndromic surveillance, notify public health early, use transmission-based precautions (airborne/contact plus eye protection for suspected VHF and pneumonic plague), restrict aerosol-generating procedures to negative-pressure areas, and start empirical therapy (e.g. ciprofloxacin or doxycycline for anthrax and plague) on clinical suspicion without waiting for confirmation. Post-exposure prophylaxis and vaccination for staff are directed by public health."
                },
              ].map(item => (
                <div key={item.agent} className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{item.agent}</p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="welfare-debrief" exams={[Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Team Welfare, Debriefing & Governance">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Hot debrief</strong> immediately after the event — facts only, what went well, what to change, no blame</li>
              <li><strong>Cold debrief</strong> within 1–2 weeks with full team; consider TRiM (Trauma Risk Management) screening for staff at risk of PTSD</li>
              <li><strong>Welfare</strong>: rest, food, fluids, recognised time off; signpost to occupational health and chaplaincy</li>
              <li><strong>Documentation</strong>: contemporaneous records preserved for inquiry (UK: e.g. Manchester Arena, 7/7); use mass-casualty proformas</li>
              <li><strong>Audit &amp; learning</strong>: M&amp;M review, regional and national reporting (TARN), update plans and run further exercises</li>
              <li><strong>Exercise regularly</strong>: live exercises, table-top, in-situ simulation — proven to improve real performance</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>
          <ExamPitfallsCallout
            accent="clinical"
            pitfalls={[
              "METHANE report: Major incident, Exact location, Type, Hazards, Access, Number, Emergency services.",
              "Triage Sieve (walking → P3; airway/breathing/circulation criteria → P1/P2/dead); Sort uses TRTS; MPTT-24 prioritises by mobility/RR/HR.",
              "Damage-control resuscitation + surgery: minimise time to haemorrhage control, permissive hypotension, blood products only.",
              "Military Roles 1–4: Role 1 first aid, Role 2 forward surgical, Role 3 field hospital, Role 4 home-base definitive care.",
              "CBRN: identify hazard, don PPE before patient contact, decontaminate before treatment, specific antidotes (atropine + pralidoxime for nerve agents).",
            ]}
          />
          <TopicFaqs faqs={massCasualtyMilitaryFaqs} />

        </>
      }
    />
  );
};

export default MassCasualtyMilitaryTopic;
