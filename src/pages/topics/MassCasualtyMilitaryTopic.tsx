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
import { MassCasualtyEthicsTeaching, MassCasualtyTeamworkTeaching, MassCasualtyBleedingTeaching, MassCasualtyMilitaryTeaching, MassCasualtyChemicalTeaching } from "@/components/topic/MassCasualtyTeaching";

const massCasualtyMilitaryFaqs: Array<[string, string]> = [
  [
    "What is the difference between primary, secondary and tertiary triage?",
    "Primary triage at scene now uses NARU Ten Second Triage (walking, severe bleeding, talking, penetrating torso injury) to assign P1/P2/P3/Not Breathing, with life-saving bleeding control and airway positioning done during triage. Secondary triage at the casualty clearing station uses the NHS Major Incident Triage Tool (MITT), which replaced the Triage Sieve and Triage Sort in 2023. Tertiary triage occurs in hospital after initial resuscitation and continuously thereafter."
  ],
  [
    "What are the principles of damage-control resuscitation?",
    "Rapid source control, restrictive resuscitation with SBP 80–90 mmHg only when there is no brain injury, early protocol-based blood products, TXA, ionised-calcium monitoring and warming. European 2023 guidance specifies TXA 1 g over 10 minutes within 3 hours then 1 g over 8 hours; severe TBI requires MAP ≥80 mmHg rather than permissive hypotension. Adapt to the applicable local protocol."
  ],
  [
    "How are nerve-agent (organophosphate) casualties managed?",
    "Protect responders and prevent secondary contamination. Disrobe and use appropriate decontamination while trained, protected teams provide urgent resuscitation and antidotes. Treat respiratory secretions and circulatory toxicity with atropine, give pralidoxime and treat convulsions with benzodiazepines according to current TOXBASE/specialist advice. Pupils are not an atropine endpoint. Support ventilation and avoid suxamethonium because paralysis may be prolonged."
  ]
];

const objectives = [
  "Apply the principles of major-incident command (MIMMS / NHS EPRR) to a mass-casualty event involving multiple critically injured patients",
  "Triage casualties using validated tools (Ten Second Triage, NHS MITT; legacy Sieve/Sort) and distinguish resource-limited allocation from reverse triage for capacity creation",
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
          <li><strong>Establish command</strong>: Gold (strategic — exec on call), Silver (tactical — designated tactical coordinator), Bronze (operational — ED/theatre/ICU leads). Wear tabards. Use action cards from the plan, do not rely on memory.</li>
          <li><strong>Triage at the door</strong>: senior clinicians reassess arrivals using the agreed incident pathway. Direct casualties to designated areas according to urgency; any exceptional allocation or palliation decision requires documented senior review and reassessment.</li>
          <li><strong>CRM principles</strong>: stay hands-off as MEDCO — your value is overview. Allocate teams (anaesthetist + surgeon + nurse + ODP) to each P1 bay; agree structured updates at clinically appropriate intervals; appoint a runner; use a whiteboard tracker for casualties and theatres.</li>
          <li><strong>Damage-control resuscitation</strong> for haemorrhagic shock: SBP 80–90 mmHg only without brain injury; severe TBI requires MAP ≥80 mmHg. Use protocol-based blood products, TXA within 3 h, ionised-calcium monitoring, warming and early haemostasis. Avoid large-volume crystalloid dilution; use a restricted crystalloid bridge if blood is unavailable.</li>
          <li><strong>Theatre prioritisation</strong>: prioritise source control and abbreviate procedures when physiological compromise prevents definitive repair. The theatre coordinator allocates capacity.</li>
          <li><strong>Communication out</strong>: regular sit-reps to Gold; liaise with mortuary, police, families' liaison; debrief team in waves; preserve documentation for inquiry.</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>MEDCO becoming a hands-on clinician — loses overview, decisions stall.</li>
            <li>Failing to re-triage — physiology changes faster than labels.</li>
            <li>Large-volume crystalloid resuscitation without haemorrhage control — risks dilution and coagulopathy.</li>
            <li>Forgetting CBRN — protect staff, assess contamination and use controlled pathways without withholding urgent care from protected teams.</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "Maintain incident oversight: activate the plan and named leads, triage and re-triage, coordinate haemorrhage control and resuscitation according to each casualty's needs, and communicate changes. Damage-control surgery is selected by physiology, not by a P1 tag alone. Arrange operational learning and welfare support afterwards.",
   cites: ["NHS Major Incidents Clinical", "JESIP Joint Doctrine", "European Trauma 2023 Pressure", "European Trauma 2023 Transfusion"],
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
          <li><strong>Airway &amp; breathing</strong>: assess oxygenation, ventilation and chest injury. If intubation is needed, resuscitate concurrently, use an experienced team and titrate induction to shock. Ketamine does not guarantee preservation of blood pressure. Decompress a suspected tension pneumothorax promptly, not every chest injury.</li>
          <li><strong>Tranexamic acid</strong>: follow the applicable trauma protocol and check doses already administered. European 2023 guidance recommends 1 g IV over 10 minutes within 3 hours followed by 1 g over 8 hours.<InlineRef topicId="mass-casualty-military" refLabel="European Trauma 2023 TXA" /></li>
          <li><strong>Damage-control resuscitation</strong>: activate the blood pathway and seek resupply. Use authorised whole blood or component therapy as available; monitor ionised calcium, temperature and perfusion. Assess for brain injury before using permissive hypotension.</li>
          <li><strong>Damage-control surgery</strong>: urgently control bleeding and contamination; abbreviate surgery if physiological instability prevents definitive repair. Do not delay needed source control for CT or transfer.</li>
          <li><strong>Critical care &amp; evacuation</strong>: agree an accepting facility, oxygen and power endurance, escort, drugs and contingency for delay. Continue ventilation, analgesia, haemostasis and temperature protection during transfer.</li>
          <li><strong>Anticipate</strong>: evolving blast lung, occult torso haemorrhage, brain injury, rhabdomyolysis and wound infection. Choose antibiotics using the relevant wound protocol rather than automatic anti-Pseudomonal cover.</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Large-volume crystalloid without source control — risks dilution and coagulopathy; a restricted bridge may be needed if blood is unavailable.</li>
            <li>Prolonged definitive surgery in an unstable casualty — assess physiology and the facility’s actual capability before committing.</li>
            <li>Uncontrolled tourniquet release — document time and reassess, but removal or conversion requires a trained clinician, a controlled setting and a plan for recurrent bleeding.</li>
            <li>Inadequate analgesia — titrate to clinical response with appropriate monitoring and transfer documentation.</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "Stop bleeding and resuscitate concurrently using available authorised blood products, protocol-based TXA, calcium monitoring and warming. Do not use permissive hypotension when brain injury is suspected. Abbreviate surgery according to physiology and arrange an accepted destination with critical-care escort and a delay contingency.",
   cites: ["NHS Major Incidents Clinical", "NATO Medical Support", "European Trauma 2023 TXA", "European Trauma 2023 Surgery"],
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
        objectives: ["NHS Major Incidents Clinical", "JESIP Joint Doctrine", "NATO Medical Support"],
        workedExamples: ["NHS Major Incidents Clinical", "European Trauma 2023 TXA", "European Trauma 2023 Pressure", "European Trauma 2023 Transfusion", "NATO Medical Support"],
        keyPoints: ["NARU TST 2023", "NHS England MITT 2023", "JESIP Joint Doctrine", "European Trauma 2023 TXA", "European Trauma 2023 Surgery", "NATO Medical Support", "UKHSA CBRN Priorities"],
      }}
      keyPoints={[
        { text: "Major incidents require extraordinary arrangements. Activate the local plan, named leads and action cards; protect ongoing essential care.", cites: ["NHS Major Incidents Clinical"] },
        { text: "METHANE: Major incident, Exact location, Type, Hazards, Access, Number of casualties, Emergency services.", cites: ["JESIP Joint Doctrine"] },
        { text: "TST assigns P1/P2/P3/Not Breathing with immediate life-saving actions; children under 2 are P1. NHS MITT replaces Sieve, Sort and paediatric triage tape. Reassess as conditions change.", cites: ["NARU TST 2023", "NHS England MITT 2023"] },
        { text: "Crisis teamwork requires named roles, shared situational awareness, closed-loop communication and repeated reassessment.", cites: ["JESIP Joint Doctrine", "Gaba CRM 2015"] },
        { text: "Bleeding control is time-critical. European 2023 TXA: 1 g over 10 minutes within 3 hours then 1 g over 8 hours; follow the applicable protocol and avoid duplicate dosing.", cites: ["European Trauma 2023 TXA"] },
        { text: "Damage-control surgery is selected for physiological compromise, not a mandatory procedure or fixed 90-minute limit for all casualties.", cites: ["European Trauma 2023 Surgery"] },
        { text: "Military roles describe capability, not a compulsory sequence. Role 1 primary/emergency care, Role 2 enhanced resuscitative/surgical capability, Role 3 deployed hospital, Role 4 definitive specialist care and rehabilitation.", cites: ["NATO Medical Support"] },
        { text: "Protect responders and prevent secondary contamination, but do not apply an absolute decontamination-before-resuscitation rule; use controlled, hazard-specific pathways.", cites: ["UKHSA CBRN Priorities"] },
      ]}
      coreConcepts={
        <>
          <ExamSection id="major-incident" exams={[Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Defining and Declaring a Major Incident" defaultOpen>
            <p className="text-muted-foreground leading-relaxed mb-3">
              A major incident exists when the location, number, severity or type of live casualties requires extraordinary resources.<InlineRef topicId="mass-casualty-military" refLabel="NHS Major Incidents Clinical" />
              Any responding agency can declare a major incident; hospitals activate the appropriate local response, which is not necessarily an internal incident.
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
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              UK primary triage now uses Ten Second Triage (TST) first, followed by the NHS Major Incident Triage Tool (MITT) once casualties reach a casualty collection point or clearing station
              <InlineRef topicId="mass-casualty-military" refLabel="NARU TST 2023" /><InlineRef topicId="mass-casualty-military" refLabel="NHS England MITT 2023" />.
            </p>
            <div className="space-y-3">
              {[
                { tool: "Ten Second Triage (TST)", detail: "NARU's first-line tool for all responders, including police and fire. Walking → P3. Severe bleeding → P1, with direct pressure, tourniquet or wound packing done during triage. Not talking → open the airway and place in the recovery position: breathing = P1; not breathing despite airway opening = silver &lsquo;Not Breathing&rsquo; band (TST has no &lsquo;Dead&rsquo; category; CPR if resources allow). Talking → P1 if any penetrating injury to neck, chest, armpits, back, abdomen, groin or buttocks, otherwise P2. Children under 2 (too young to walk or talk) are automatically P1. Re-triage about every 15 minutes or if condition changes." },
                { tool: "NHS Major Incident Triage Tool (MITT)", detail: "Used by healthcare responders at a casualty collection point or clearing station once every casualty has a TST band; the switch is decided by the ambulance on-scene commander. A single adult-and-paediatric tool that replaced the Triage Sieve, Triage Sort and paediatric triage tape, derived from the Modified Physiological Triage Tool-24 (MPTT-24). MITT tags are solid colour; TST bands have a white checked border." },
                { tool: "Legacy Triage Sieve (historical)", detail: "The older physiological sieve (walking, breathing, respiratory rate, capillary refill) still appears in older texts and exam questions, but has been replaced by TST and MITT in NHS practice." },
                { tool: "Scarcity decisions and capacity creation", detail: "Expectant categories, where authorised, require senior review and ongoing care; they are not part of TST. Reverse triage usually describes identifying existing patients safe for discharge or lower-acuity transfer to create capacity, not labelling injured casualties expectant." },
                { tool: "Paediatric triage tape (historical)", detail: "The length-based Paediatric Triage Tape adjusted sieve thresholds for children's size. In NHS practice it has been replaced by the single adult-and-paediatric MITT; in TST, children too young to walk or talk (under 2) are automatically P1. (JumpSTART is a separate US paediatric algorithm, not a tape.)" },
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
              <MassCasualtyEthicsTeaching />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="crm" exams={[Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Crisis Resource Management (CRM)">
              <MassCasualtyTeamworkTeaching />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="dcr-dcs" exams={[Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Damage-Control Resuscitation & Surgery">
              <MassCasualtyBleedingTeaching />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="military" exams={[Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Military Anaesthesia & Critical Care">
              <MassCasualtyMilitaryTeaching />
              <MilitaryRolesFlowDiagram />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="special-casualties" exams={[Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Special Casualty Categories">
            <p className="text-sm text-muted-foreground mb-3">Apply mechanism-specific assessment and seek specialist advice.<InlineRef topicId="mass-casualty-military" refLabel="NHS Major Incidents Clinical" /></p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Blast injury</strong>: primary (barotrauma — blast lung, tympanic rupture, bowel), secondary (fragments), tertiary (displacement), quaternary (burns, crush, inhalation). Always examine tympanic membranes and anticipate delayed ARDS</li>
              <li><strong>Ballistic / penetrating</strong>: identify concealed bleeding and expedite appropriate haemostasis. Resuscitative thoracotomy is a specialist, time-critical decision based on mechanism, signs of life, arrest circumstances, expertise and the trauma-arrest protocol; a single downtime cut-off is not sufficient.</li>
              <li><strong>Burns</strong>: airway oedema (early specialist airway assessment for progressive obstruction, respiratory failure or reduced consciousness; facial burns alone do not mandate intubation), use the burns service fluid protocol and titrate to physiology/urine output; circumferential burns require assessment for impaired perfusion or ventilation, not automatic escharotomy. Carbon monoxide and cyanide poisoning suspected in enclosed-space fires (hydroxocobalamin)</li>
              <li><strong>CBRN</strong>: protect responders, assess contamination, use appropriate decontamination and deliver urgent care through controlled pathways. Antidotes are agent-specific and require current specialist guidance; detailed teaching follows below.</li>
              <li><strong>Crush syndrome</strong>: anticipate reperfusion collapse, hyperkalaemia, rhabdomyolysis and AKI; coordinate safe extrication, obtain access where feasible, and titrate fluid to clinical status with repeated electrolyte, ECG and urine-output assessment. Do not apply a universal 1 L/h rate or routine urine alkalinisation</li>
              <li><strong>Paediatric</strong>: weight-based drug calculations (Broselow tape), psychological support, parents not always present, smaller margin for error in fluid &amp; airway management</li>
            </ul>

            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="chemical-incidents" exams={[Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Chemical Incidents & CBRN Response">
              <MassCasualtyChemicalTeaching />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="welfare-debrief" exams={[Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Team Welfare, Debriefing & Governance">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Hot debrief</strong> immediately after the event — facts only, what went well, what to change, no blame</li>
              <li><strong>Later operational review</strong> at an agreed time with actions and owners; offer confidential welfare support, not compulsory emotional recounting</li>
              <li><strong>Welfare</strong>: rest, food, fluids, recognised time off; signpost to occupational health and chaplaincy</li>
              <li><strong>Documentation</strong>: contemporaneous records preserved for inquiry (UK: e.g. Manchester Arena, 7/7); use mass-casualty proformas</li>
              <li><strong>Audit &amp; learning</strong>: M&amp;M review, regional and national reporting (TARN), update plans and run further exercises</li>
              <li><strong>Exercise regularly</strong>: live exercises, table-top, in-situ simulation — rehearse roles, identify system weaknesses and test contingency plans; exercise success does not guarantee clinical outcome benefit</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-3">Operational reviews are distinct from psychological treatment; do not offer psychologically focused debriefing to prevent or treat PTSD.<InlineRef topicId="mass-casualty-military" refLabel="NICE NG116 Debriefing" /></p>
            </CollapsibleSubsection>
          </ExamSection>
          <ExamPitfallsCallout
            accent="clinical"
            pitfalls={[
              "METHANE report: Major incident, Exact location, Type, Hazards, Access, Number, Emergency services.",
              "Ten Second Triage (walking → P3; severe bleeding or not talking → P1; not breathing after airway opening → Not Breathing; talking with penetrating torso injury → P1, else P2), then NHS MITT — which replaced the Sieve and Sort in 2023.",
              "Damage-control care: rapid haemostasis, protocol-based blood products, TXA, normal ionised calcium and warming; permissive hypotension is not for severe TBI.",
              "Military Roles 1–4: Role 1 primary/emergency care, Role 2 enhanced resuscitative/surgical capability, Role 3 deployed hospital, Role 4 definitive specialist care; transfer may bypass roles.",
              "CBRN: protect responders, control contamination and use agent-specific advice; trained, protected teams must not withhold urgent resuscitation under an absolute decontamination-first rule.",
            ]}
          />
          <TopicFaqs faqs={massCasualtyMilitaryFaqs} />

        </>
      }
    />
  );
};

export default MassCasualtyMilitaryTopic;
