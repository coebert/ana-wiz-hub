import { TopicTemplate } from "@/components/TopicTemplate";
import { ExamSection } from "@/components/ExamSection";
import { WorkedExample } from "@/components/WorkedExamples";
import { massCasualtyMilitaryQuestions } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import { MajorIncidentTriageDiagram } from "@/components/diagrams/MajorIncidentTriageDiagram";
import { MilitaryRolesFlowDiagram } from "@/components/diagrams/MilitaryRolesFlowDiagram";

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
          <li><strong>Damage-control resuscitation</strong>: activate massive transfusion. Whole blood (low-titre group O if available) is the military standard; otherwise 1:1:1. TXA 1 g IV bolus + 1 g infusion. Calcium chloride 1 g per 4 units. Warm everything (Belmont / fluid warmer / blankets). Permissive hypotension SBP 80–90 mmHg until haemorrhage controlled.</li>
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
          "MIMMS Major Incident Medical Management & Support (4e)",
          "NHS England EPRR Framework 2022",
          "FICM/ICS Major Incident Guidance",
          "Joint Service Publication 999 (UK Defence Medical Services)",
        ],
        workedExamples: [
          "Eastridge JAMA 2012 — Death on the battlefield",
          "CRASH-2 Lancet 2010 — TXA in trauma",
          "Joint Trauma System Clinical Practice Guidelines",
        ],
        keyPoints: [
          "MIMMS 4e",
          "Rall &amp; Gaba — Crisis Resource Management",
          "BJA Educ — Damage Control Resuscitation 2018",
        ],
      }}
      keyPoints={[
        "Major incident = casualty load exceeds normal resources. Declared by first emergency service on scene; cascade activates hospital plan.",
        "METHANE message structures the alert: Major incident, Exact location, Type, Hazards, Access, Number, Emergency services.",
        "Triage Sieve (walking? breathing? RR? CRT/pulse?) → categorises P1/P2/P3/P4 within 30 s per casualty. Triage Sort uses TRTS for in-hospital re-triage.",
        "Crisis Resource Management: leadership, role clarity, closed-loop communication, situational awareness, workload distribution, calling for help early.",
        "Damage-control resuscitation: permissive hypotension, 1:1:1 ratio (or whole blood), TXA &lt;3 h, calcium, warmth, early surgical haemostasis.",
        "Damage-control surgery: abbreviated procedure to control haemorrhage and contamination, with planned return for definitive surgery once physiology corrected.",
        "Military Role 1 (point of wounding) → Role 2 (forward surgical) → Role 3 (deployed hospital) → Role 4 (home) — same paradigm informs civilian disaster pathways.",
        "CBRN casualties: decontaminate before treatment; PPE for staff; antidotes rehearsed (atropine/pralidoxime, hydroxocobalamin, dicobalt edetate).",
      ]}
      coreConcepts={
        <>
          <ExamSection id="major-incident" exams={[Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Defining and Declaring a Major Incident</h2>
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
          </ExamSection>

          <ExamSection id="triage" exams={[Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Triage Tools</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Triage is dynamic — every casualty is re-triaged at each stage of the chain.
            </p>
            <MajorIncidentTriageDiagram />
            <div className="space-y-3">
              {[
                { tool: "Triage Sieve", detail: "Pre-hospital, &lt;30 s. Walking → P3 (delayed). Not breathing despite airway opening → Dead. Then RR &lt;10 or &gt;30 → P1; CRT &gt;2 s or HR &gt;120 → P1; otherwise P2." },
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
          </ExamSection>

          <ExamSection id="crm" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["FFICM 11"]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Crisis Resource Management (CRM)</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              CRM (Gaba, Rall, Howard) translates aviation human-factors science into the operating theatre and ICU.
              In a mass-casualty event, technical skill is rarely the bottleneck — coordination, communication and cognition are.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Know the environment</strong> — equipment, drugs, who is in the room and their capability</li>
              <li><strong>Anticipate and plan</strong>; verbalise the plan; "share the mental model"</li>
              <li><strong>Call for help early</strong> — the senior, the porter, the runner, blood bank, theatres</li>
              <li><strong>Leadership &amp; followership</strong>: clear leader (hands-off when possible), explicit role allocation by name</li>
              <li><strong>Communicate effectively</strong>: closed-loop ("give 1 g TXA" → "1 g TXA given"), SBAR, no ambiguity</li>
              <li><strong>Distribute workload</strong>; allocate the cognitive task to the leader, technical tasks to the team</li>
              <li><strong>Use all available information</strong> (monitors, labs, history) and cross-check</li>
              <li><strong>Mobilise resources</strong>: cognitive aids (checklists, action cards), pre-prepared kit, mass-haemorrhage proformas</li>
              <li><strong>Re-evaluate</strong> repeatedly; avoid fixation error; "Is the patient getting better?"</li>
              <li><strong>Hot &amp; cold debrief</strong>: psychological safety, learning not blaming, document for governance</li>
            </ul>
          </ExamSection>

          <ExamSection id="dcr-dcs" exams={[Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Damage-Control Resuscitation &amp; Surgery</h2>
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
          </ExamSection>

          <ExamSection id="military" exams={[Exam.FFICM]} curriculumCodes={["FFICM 2.6"]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Military Anaesthesia &amp; Critical Care</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Defence Medical Services deliver care along a graded chain. The same Roles framework underpins NATO doctrine and informs civilian
              regional trauma networks and pre-hospital emergency medicine.
            </p>
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
          </ExamSection>

          <ExamSection id="special-casualties" exams={[Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Special Casualty Categories</h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Blast injury</strong>: primary (barotrauma — blast lung, tympanic rupture, bowel), secondary (fragments), tertiary (displacement), quaternary (burns, crush, inhalation). Always examine tympanic membranes and anticipate delayed ARDS</li>
              <li><strong>Ballistic / penetrating</strong>: damage-control surgery; consider thoracotomy for cardiac arrest with penetrating chest trauma &lt;15 min downtime</li>
              <li><strong>Burns</strong>: airway oedema (early intubation if &gt;30% TBSA / facial burns / soot in airway), Parkland formula 2–4 mL/kg/%TBSA Hartmann's first 24 h, escharotomy for circumferential. Carbon monoxide and cyanide poisoning suspected in enclosed-space fires (hydroxocobalamin)</li>
              <li><strong>CBRN</strong>: decontamination BEFORE entry; PPE level appropriate to agent; antidotes — atropine + pralidoxime (organophosphate/nerve), hydroxocobalamin (cyanide), dicobalt edetate (cyanide alt), DMPS (heavy metals), potassium iodide (radioactive iodine)</li>
              <li><strong>Crush syndrome</strong>: aggressive crystalloid before extrication (1 L/h adult), monitor for hyperkalaemia, rhabdomyolysis, AKI; alkalinisation of urine if myoglobinuric</li>
              <li><strong>Paediatric</strong>: weight-based drug calculations (Broselow tape), psychological support, parents not always present, smaller margin for error in fluid &amp; airway management</li>
            </ul>
          </ExamSection>

          <ExamSection id="welfare-debrief" exams={[Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Team Welfare, Debriefing &amp; Governance</h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Hot debrief</strong> immediately after the event — facts only, what went well, what to change, no blame</li>
              <li><strong>Cold debrief</strong> within 1–2 weeks with full team; consider TRiM (Trauma Risk Management) screening for staff at risk of PTSD</li>
              <li><strong>Welfare</strong>: rest, food, fluids, recognised time off; signpost to occupational health and chaplaincy</li>
              <li><strong>Documentation</strong>: contemporaneous records preserved for inquiry (UK: e.g. Manchester Arena, 7/7); use mass-casualty proformas</li>
              <li><strong>Audit &amp; learning</strong>: M&amp;M review, regional and national reporting (TARN), update plans and run further exercises</li>
              <li><strong>Exercise regularly</strong>: live exercises, table-top, in-situ simulation — proven to improve real performance</li>
            </ul>
          </ExamSection>
        </>
      }
    />
  );
};

export default MassCasualtyMilitaryTopic;
