import { Helmet } from "react-helmet-async";
import { TopicTemplate } from "@/components/TopicTemplate";
import { CollapsibleSubsection } from "@/components/CollapsibleSubsection";
import { ExamSection } from "@/components/ExamSection";
import { TopicTableOfContents } from "@/components/TopicTableOfContents";
import { plasticSurgeryQuestions } from "@/data/quizzes";
import FreeFlaPerfusionDiagram from "@/components/diagrams/FreeFlaPerfusionDiagram";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";
import { InlineRef } from "@/components/InlineRef";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const tocItems = [
  { id: "intro", label: "Introduction", group: "Core" },
  { id: "principles", label: "Free flap principles", group: "Core" },
  { id: "prolonged", label: "Prolonged surgery", group: "Management" },
  { id: "procedures", label: "Specific procedures", group: "Procedures" },
  { id: "anticoagulation", label: "Anticoagulation & monitoring", group: "Postoperative" },
  { id: "faq", label: "FAQ", group: "Reference" },
];

const plasticFaqs: Array<[string, string]> = [
  [
    "What are the 'three norms' of free flap anaesthesia?",
    "The three essential physiological targets are normotension (MAP ≥65 mmHg, ideally 70–80 mmHg during anastomosis), normovolaemia (euvolaemia assessed by stroke-volume variation, passive leg raise, or cardiac output monitoring), and normothermia (core temperature >36 °C). Hypotension reduces driving pressure across the microvascular anastomosis; hypovolaemia increases blood viscosity and reduces cardiac output; hypothermia triggers vasoconstriction, platelet dysfunction, and coagulopathy. Together these three targets optimise perfusion pressure, microcirculatory flow, and haemostasis at the flap.",
  ],
  [
    "Why is haemodilution to Hct 30–35% recommended in free flap surgery?",
    "Haemodilution reduces blood viscosity, which improves microcirculatory flow through the small-calibre vessels of the flap anastomosis. At a haematocrit of 30–35%, oxygen-carrying capacity is preserved while viscosity is minimised — this is the optimal balance for microvascular perfusion. Excessive haemodilution (Hb <80 g/L) risks inadequate oxygen delivery to the flap, while polycythaemia increases viscosity and predisposes to thrombosis. Some units target Hb 80–100 g/L (approximately Hct 30–35%) specifically for this reason. Blood transfusion should be guided by haemoglobin trends and tissue oxygenation rather than absolute thresholds.",
  ],
  [
    "Which vasopressors are safest in free flap surgery?",
    "Vasopressors should be avoided where possible because they cause systemic vasoconstriction that reduces flap perfusion. If vasopressors are unavoidable, low-dose noradrenaline (0.02–0.05 µg/kg/min) is preferred because it has predominantly α-agonist effects with some β-agonist activity that maintains cardiac output. Phenylephrine and metaraminol are relatively contraindicated because they are pure α-agonists that cause intense peripheral and microvascular vasoconstriction, directly compromising flap blood flow. Vasopressin should also be avoided. The priority is always to restore intravascular volume first and treat the cause of hypotension (light anaesthesia, hypovolaemia, bleeding) before starting any vasopressor.",
  ],
  [
    "What are the specific anaesthetic considerations for head and neck free flaps?",
    "Head and neck free flaps (fibula, radial forearm, ALT) are performed after oncological resection and present several challenges: (1) Shared airway — nasal intubation, submental intubation, or tracheostomy may be required to allow surgical access to the oral cavity and mandible. (2) Venous congestion risk — head-down positioning and neck rotation can obstruct venous drainage; avoid tight ties around the neck. (3) Airway compromise postoperatively — tongue/floor-of-mouth reconstruction may cause significant oedema; plan for delayed extubation or prophylactic tracheostomy. (4) Two-team surgery — simultaneous resection and flap harvest requires coordination of lines, positioning, and communication. (5) Long duration — 8–12+ hours with risk of hypothermia, pressure injuries, and fluid shifts.",
  ],
  [
    "How is a DIEP flap different from a TRAM flap?",
    "A DIEP (deep inferior epigastric perforator) flap transfers abdominal skin and subcutaneous tissue based on perforating vessels from the deep inferior epigastric artery, preserving the rectus abdominis muscle. A TRAM (transverse rectus abdominis myocutaneous) flap includes the rectus muscle itself. The DIEP flap is preferred because it preserves abdominal wall strength, reduces donor-site morbidity (hernia risk, weakness), and causes less pain postoperatively. However, DIEP harvest is technically more demanding and takes longer (4–8 hours) because the surgeon must meticulously dissect individual perforator vessels through the rectus muscle. From an anaesthetic perspective, both require careful fluid management, normotension, and normothermia; TAP or rectus sheath blocks provide excellent donor-site analgesia. Muscle relaxation requirements vary — some surgeons prefer no relaxation during perforator dissection to aid identification.",
  ],
  [
    "What is the role of regional anaesthesia in plastic and reconstructive surgery?",
    "Regional techniques provide excellent analgesia and may improve flap perfusion through sympathetic blockade. For digital replantation, brachial plexus block (axillary or supraclavicular) provides surgical anaesthesia and sympathetic denervation that produces vasodilation and improves digital blood flow. For DIEP flap donor sites, TAP blocks or rectus sheath blocks reduce opioid requirements and improve respiratory function. For head and neck reconstruction, superficial cervical plexus block can supplement general anaesthesia. Pectoralis and serratus anterior plane blocks are increasingly used for breast reconstruction. The key caution is that bleeding risk from anticoagulation must be balanced against the benefits of regional techniques — many units avoid neuraxial blocks when postoperative heparin or dextran is planned.",
  ],
  [
    "How is flap viability monitored postoperatively?",
    "Clinical monitoring remains the gold standard: colour (pink = arterial; pale/white = arterial insufficiency; dusky/blue = venous congestion), temperature (warm = perfused; cool = compromised), capillary refill (normal <2 seconds; sluggish or absent = poor perfusion), and tissue turgor (soft = normal; tense = venous congestion; flaccid = arterial failure). For buried flaps where clinical assessment is impossible, implantable Doppler probes monitor blood flow continuously. Some units use near-infrared spectroscopy or laser Doppler imaging. The critical principle is that flap compromise is a surgical emergency — salvage rates fall sharply after 4–6 hours of ischaemia. Any change in these parameters triggers immediate surgical re-exploration.",
  ],
  [
    "What anticoagulation is used after free flap surgery?",
    "Postoperative anticoagulation protocols vary by unit and flap type but commonly include: (1) Aspirin 75–150 mg daily — inhibits platelet aggregation at the anastomosis and is widely used. (2) Low-molecular-weight heparin (LMWH) — prophylactic or therapeutic dosing depending on thrombosis risk and unit protocol. (3) Dextran 40 — a rheological agent that reduces blood viscosity and inhibits platelet aggregation; used in some units but carries a risk of anaphylaxis (≈0.05–0.1%) and volume overload. (4) Heparin infusion — occasionally used for the first 24–48 hours in high-risk flaps. The balance between thrombosis prevention and bleeding risk is individualised. Epidural catheters should be removed before therapeutic anticoagulation is started, and timing must follow neuraxial guidelines.",
  ],
  [
    "What are the risks of prolonged microsurgery and how are they mitigated?",
    "Microsurgical cases routinely last 6–12+ hours. Risks include: (1) Hypothermia — forced-air warming, warmed fluids, theatre temperature ≥23 °C, and reflective blankets are essential. (2) Pressure injuries — meticulous gel padding, rechecking pressure points every 2 hours, and alternating limb position where possible. (3) DVT/PE — intermittent pneumatic compression stockings should be applied before induction; pharmacological prophylaxis may be delayed until haemostasis is secure. (4) Corneal injury and eye protection — tape eyelids, use lubricant, check q2h. (5) Fluid overload — restrict crystalloid to maintenance (≈1–2 mL/kg/h) plus replacements; avoid excessive fluid which causes tissue oedema and flap congestion. (6) Rhabdomyolysis — prolonged immobility in lateral/prone positions; monitor creatine kinase and urine output. (7) Awareness — depth of anaesthesia monitoring (BIS) is recommended for prolonged TIVA cases.",
  ],
  [
    "What are the time-critical factors in digital replantation?",
    "Digital replantation is a race against warm ischaemia time. Digits tolerate warm ischaemia up to 12 hours because of their relatively low metabolic demand and the ability to cool them effectively. Major limbs (arm, leg) tolerate only 6 hours of warm ischaemia. Cold ischaemia extends these windows significantly — cooling the amputated part in saline-soaked gauze inside a sealed bag on ice (never direct ice contact) is standard. Anaesthetic considerations include: brachial plexus block for both anaesthesia and sympathetic blockade (vasodilation improves digital perfusion); avoidance of vasopressors; maintenance of normothermia and adequate hydration; and postoperative heparinisation, warm environment, and avoidance of nicotine/caffeine. The replanted digit must be kept warm, elevated, and closely monitored for colour and capillary refill.",
  ],
];

const PlasticSurgeryTopic = () => {
  return (
    <TopicTemplate
      title="Plastic Surgery & Microsurgery Anaesthesia"
      subtitle="FRCA Final — Clinical Anaesthesia"
      backPath="/clinical"
      backLabel="Clinical Anaesthesia"
      accentColor="text-clinical"
      topicId="plastic-surgery"
      topicTitle="Plastic Surgery & Microsurgery Anaesthesia"
      objectives={[
        "Apply the principles of normotension, normovolaemia and normothermia to optimise free-flap perfusion",
        "Justify avoidance of vasoconstrictors and the role of haemodilution to Hct 30–35%",
        "Plan management of prolonged microsurgery (positioning, temperature, DVT, monitoring)",
        "Tailor anaesthesia for head & neck flaps, DIEP and digital replantation",
        "Outline postoperative anticoagulation and flap-monitoring strategies",
      ]}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL], curriculumCodes: ["RCoA Final — Clinical Anaesthesia"] },
        workedExamples: { exams: [Exam.FINAL] },
        keyPoints: { exams: [Exam.FINAL] },
      }}
      sectionSources={{
        objectives: [
          "BJA Educ 2021",
          "BAPRAS 2020",
          "Curr Opin Anaesthesiol 2019",
        ],
        keyPoints: [
          "BJA Educ 2021",
          "BAPRAS 2020",
          "Curr Opin Anaesthesiol 2019",
        ],
        workedExamples: ["BJA Educ 2021", "Curr Opin Anaesthesiol 2019"],
      }}
      keyPoints={[
        { text: "Free-flap surgery demands meticulous haemodynamic management — normotension, normovolaemia, normothermia to optimise flap perfusion", cites: ["BAPRAS 2020"] },
        { text: "Avoid vasopressors where possible; if needed, low-dose noradrenaline preferred over metaraminol/phenylephrine", cites: ["BJA Educ 2021"] },
        { text: "Microsurgery is prolonged (6–12 h+) — anticipate hypothermia, pressure injuries, DVT risk; arterial line and urinary catheter mandatory", cites: ["Curr Opin Anaesthesiol 2019"] },
        { text: "Regional techniques (perforator, pectoralis, TAP) provide analgesia and may improve flap perfusion via sympathetic blockade", cites: ["BAPRAS 2020"] },
        { text: "Haemodilution to Hct 30–35% reduces blood viscosity and improves microcirculatory flow through anastomosed vessels", cites: ["BJA Educ 2021"] },
      ]}
      coreConcepts={
        <>
          <TopicTableOfContents items={tocItems} />

          <div id="intro" className="scroll-mt-24">
            <ExamSection exams={[Exam.FINAL]} curriculumCodes={["RCoA Final — Clinical Anaesthesia"]}>
              <CollapsibleSubsection title="Introduction" defaultOpen>
                <p className="text-muted-foreground leading-relaxed">
                  Plastic and reconstructive surgery spans free tissue transfer (free flaps), local pedicled flaps, and complex wound reconstruction. Free flap surgery — the transfer of vascularised tissue from a donor site to a distant recipient site with microvascular anastomosis — is the most technically demanding and anaesthetically critical. Flap survival depends on meticulous control of haemodynamics, temperature, coagulation, and vasoactive drugs. Cases are often prolonged, positioning is complex, and postoperative monitoring is labour-intensive. This topic covers the core physiological principles, specific procedures, and perioperative management strategies that determine flap success.
                </p>
              </CollapsibleSubsection>
            </ExamSection>
          </div>

          <div id="principles" className="scroll-mt-24">
            <ExamSection exams={[Exam.FINAL]} curriculumCodes={["RCoA Final — Clinical Anaesthesia"]}>
              <CollapsibleSubsection title="Free Flap Surgery — Anaesthetic Principles" defaultOpen>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Free tissue transfer involves harvesting a composite tissue flap (skin, muscle, bone) with its vascular pedicle and anastomosing it to recipient vessels at the defect site. Flap survival depends on <strong className="text-foreground">microvascular patency</strong>, influenced by haemodynamics, temperature, coagulation, and vasoactive drugs<InlineRef topicId="plastic-surgery" refLabel="BJA Educ 2021" />.
                </p>
                <div className="bg-card rounded-xl border border-border p-4 md:p-6 mb-4">
                  <FreeFlaPerfusionDiagram />
                </div>
                <div className="grid sm:grid-cols-2 gap-3 mb-3">
                  {[
                    { label: "Normotension", value: "MAP ≥65 mmHg (ideally 70–80 mmHg during anastomosis). Hypotension reduces perfusion pressure across the microvascular anastomosis" },
                    { label: "Normovolaemia", value: "Euvolaemia assessed by SVV, PLR, or cardiac output monitoring. Both hypo- and hypervolaemia impair flap perfusion" },
                    { label: "Normothermia", value: "Core temp >36 °C. Hypothermia causes vasoconstriction, platelet dysfunction, and coagulopathy" },
                    { label: "Haemodilution", value: "Hct 30–35% reduces viscosity and improves microcirculatory flow without compromising oxygen delivery" },
                    { label: "Vasopressors", value: "Avoid if possible. Low-dose noradrenaline (0.02–0.05 µg/kg/min) preferred over phenylephrine/metaraminol which cause flap vasospasm" },
                    { label: "Anaesthesia depth", value: "Adequate depth prevents sympathetic stimulation and hypertension. BIS monitoring recommended for prolonged TIVA" },
                  ].map((item) => (
                    <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="font-semibold text-foreground text-sm">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 rounded-lg border border-amber-500/20 bg-amber-500/5">
                  <p className="text-xs text-amber-400 font-semibold mb-1">⚠ Exam Tip</p>
                  <p className="text-xs text-muted-foreground">
                    The three norms — normotension, normovolaemia, normothermia — are the cornerstone of free flap anaesthesia. Examiners frequently ask why each matters and what happens when they are violated. Be prepared to explain the physiology of microvascular flow and how viscosity, vessel calibre, and perfusion pressure interact.
                  </p>
                </div>
              </CollapsibleSubsection>
            </ExamSection>
          </div>

          <div id="prolonged" className="scroll-mt-24">
            <ExamSection exams={[Exam.FINAL]} curriculumCodes={["RCoA Final — Clinical Anaesthesia"]}>
              <CollapsibleSubsection title="Management of Prolonged Surgery">
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Microsurgery and reconstructive cases routinely last 6–12+ hours. Careful planning mitigates the complications of prolonged anaesthesia.
                </p>
                <div className="grid sm:grid-cols-2 gap-3 mb-3">
                  {[
                    { label: "Temperature", value: "Forced-air warming, warmed fluids, theatre temp ≥23 °C, reflective blankets. Hypothermia is the enemy of flap perfusion" },
                    { label: "Positioning", value: "Meticulous pressure-area care with gel pads; recheck pressure points every 2 h. Lateral and prone positions need special attention" },
                    { label: "DVT prophylaxis", value: "Intermittent pneumatic compression stockings before induction. Pharmacological prophylaxis balanced against surgical haemostasis requirements" },
                    { label: "Monitoring", value: "Arterial line, urinary catheter, core temperature. Consider cardiac output monitoring for major cases with significant blood loss" },
                    { label: "Fluid balance", value: "Restrict crystalloid to ≈1–2 mL/kg/h maintenance plus replacements. Avoid overload — tissue oedema impairs flap perfusion and causes congestion" },
                    { label: "Analgesia", value: "Multimodal approach. Regional techniques (perforator, TAP, pectoralis, rectus sheath) reduce opioid requirements and may improve perfusion" },
                  ].map((item) => (
                    <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="font-semibold text-foreground text-sm">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 rounded-lg border border-destructive/30 bg-destructive/5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
                  <ul className="list-disc list-inside text-foreground text-sm">
                    <li>Excessive crystalloid administration → tissue oedema → flap congestion and venous compromise.</li>
                    <li>Failure to reposition or recheck pressure points every 2 h → pressure ulcers, nerve injuries.</li>
                    <li>Inadequate eye protection → corneal abrasion over 8+ hour cases.</li>
                    <li>Delaying DVT prophylaxis because of bleeding risk → PE is a significant cause of mortality in prolonged reconstructive surgery.</li>
                  </ul>
                </div>
              </CollapsibleSubsection>
            </ExamSection>
          </div>

          <div id="procedures" className="scroll-mt-24">
            <ExamSection exams={[Exam.FINAL]} curriculumCodes={["RCoA Final — Clinical Anaesthesia"]}>
              <CollapsibleSubsection title="Specific Reconstructive Procedures">
                <div className="bg-card border border-border rounded-lg p-4 mb-3">
                  <h3 className="font-semibold text-foreground mb-2">Head & Neck Free Flaps</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Common after oncological resection — fibula, radial forearm, anterolateral thigh (ALT) flaps</li>
                    <li>Shared airway — nasal/submental intubation, or tracheostomy may be required</li>
                    <li>Risk of <strong className="text-foreground">venous congestion</strong> from head-down tilt or neck positioning; avoid tight ties around the neck</li>
                    <li>Postoperative airway: plan for delayed extubation or tracheostomy; tongue/floor-of-mouth reconstruction may compromise the airway</li>
                    <li>Two-team surgery (resection + harvest) requires careful coordination of lines, positioning, and blood product management</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4 mb-3">
                  <h3 className="font-semibold text-foreground mb-2">Breast Reconstruction (DIEP Flap)</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Deep inferior epigastric perforator flap — microsurgical transfer of abdominal tissue to the chest</li>
                    <li>Duration 4–8 hours; two surgical teams often work simultaneously (abdominal harvest + chest preparation)</li>
                    <li>Avoid abdominal muscle relaxation during perforator dissection (surgeon preference varies; some prefer no relaxation to aid vessel identification)</li>
                    <li>TAP block or rectus sheath block provides excellent donor-site analgesia and reduces opioid requirements</li>
                    <li>Compared with TRAM, DIEP preserves rectus muscle and reduces donor-site morbidity (hernia, weakness)</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Digital Replantation</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Brachial plexus block provides surgical anaesthesia AND sympathetic blockade (improves digital perfusion via vasodilation)</li>
                    <li>Warm ischaemia time: digits tolerate up to 12 h; major limbs 6 h. Cool the amputated part in saline-soaked gauze inside a sealed bag on ice</li>
                    <li>Postoperative: heparin infusion per unit protocol, warm environment, avoid caffeine/nicotine, regular flap observations</li>
                    <li>Salvage rates depend on cold ischaemia time and technical precision — anaesthetic optimisation of perfusion is critical</li>
                  </ul>
                </div>
              </CollapsibleSubsection>
            </ExamSection>
          </div>

          <div id="anticoagulation" className="scroll-mt-24">
            <ExamSection exams={[Exam.FINAL]} curriculumCodes={["RCoA Final — Clinical Anaesthesia"]}>
              <CollapsibleSubsection title="Anticoagulation & Flap Monitoring">
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Postoperative anticoagulation protocols vary by institution but commonly include aspirin, LMWH, and occasionally dextran or heparin infusion. The balance between thrombosis prevention and bleeding risk is individualised.
                </p>
                <div className="grid sm:grid-cols-2 gap-3 mb-3">
                  {[
                    { label: "Aspirin", value: "75–150 mg daily starting within 24 h. Inhibits platelet aggregation at the anastomosis — standard in most units" },
                    { label: "LMWH", value: "Prophylactic or therapeutic dosing depending on thrombosis risk and unit protocol. Timing with neuraxial catheters critical" },
                    { label: "Dextran 40", value: "Rheological agent reducing viscosity and platelet aggregation. Risk of anaphylaxis (≈0.05–0.1%) and volume overload" },
                    { label: "Heparin infusion", value: "Occasionally used for first 24–48 h in high-risk flaps. Must balance against bleeding risk and epidural catheter timing" },
                    { label: "Clinical monitoring", value: "Colour, temperature, capillary refill, turgor. Pink, warm, refill <2 s, soft turgor = perfused flap" },
                    { label: "Implantable Doppler", value: "Used for buried flaps where clinical assessment is impossible. Continuous blood flow monitoring with audible signal" },
                  ].map((item) => (
                    <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="font-semibold text-foreground text-sm">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="p-3 rounded-lg border border-amber-500/20 bg-amber-500/5">
                  <p className="text-xs text-amber-400 font-semibold mb-1">⚠ Exam Tip</p>
                  <p className="text-xs text-muted-foreground">
                    Flap compromise is a surgical emergency — salvage rates fall sharply after 4–6 hours of ischaemia. Any concern should trigger immediate return to theatre for re-exploration. Do not wait for imaging or senior review if the clinical picture suggests failure.
                  </p>
                </div>
              </CollapsibleSubsection>
            </ExamSection>
          </div>

          <ExamPitfallsCallout
            accent="clinical"
            pitfalls={[
              "Free flap perfusion depends on CO, BP, viscosity and afterload — warm, well-filled, vasodilated patient; avoid vasoconstrictors where possible.",
              "Maintain Hb 80–100 g/L (haemodilution improves microcirculation); avoid hypothermia which causes vasospasm.",
              "Long surgery: prevent pressure sores, DVT, hypothermia, eye injury and corneal abrasion.",
              "Head and neck flaps: postoperative airway compromise from tongue/floor-of-mouth oedema — plan for delayed extubation or tracheostomy.",
              "Digital replantation success depends on cold ischaemia time — coordinate theatre setup before patient arrival.",
            ]}
          />

          <section id="faq" className="scroll-mt-24 mt-10">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
              Plastic Surgery & Microsurgery — FAQ
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
              Evidence-based answers to the questions FRCA Final candidates most often ask about free flap principles, haemodilution, vasopressor choice, head and neck reconstruction, DIEP vs TRAM flaps, regional anaesthesia in plastic surgery, flap monitoring, anticoagulation, prolonged surgery risks, and digital replantation.
            </p>
            <Accordion type="single" collapsible className="w-full">
              {plasticFaqs.map(([q, a], i) => (
                <AccordionItem key={q} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-sm font-medium text-foreground">
                    {q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    {a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <Helmet>
            <title>Plastic Surgery Anaesthesia — Free flap perfusion, DIEP & microsurgery | FRCA</title>
            <meta
              name="description"
              content="Plastic and reconstructive anaesthesia for FRCA Final: free flap physiology and the three norms, haemodilution and vasopressor choice, DIEP and head & neck reconstruction, digital replantation, prolonged surgery management, and flap monitoring."
            />
            <script type="application/ld+json">{JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: plasticFaqs.map(([name, acceptedAnswer]) => ({
                "@type": "Question",
                name,
                acceptedAnswer: { "@type": "Answer", text: acceptedAnswer },
              })),
            })}</script>
          </Helmet>
        </>
      }
      workedExamples={[
        {
          title: "Hypotension during DIEP flap inset",
          scenario:
            "Six hours into a DIEP flap, MAP drops to 55 mmHg with HR 95 and CVP normal. The microvascular team is about to anastomose. What do you do?",
          working: (
            <div className="space-y-2">
              <p className="font-semibold text-foreground">Step-by-step approach</p>
              <ol className="list-decimal list-inside space-y-1">
                <li><strong>Assess preload.</strong> Check stroke-volume variation (SVV) or perform a passive leg raise. If fluid-responsive, give 250 mL balanced crystalloid bolus.</li>
                <li><strong>Check depth.</strong> If BIS is high or MAC low, deepen anaesthesia/add opioid to reduce sympathetic stimulation.</li>
                <li><strong>Vasopressor choice.</strong> If adequately filled but hypotensive, start <strong>low-dose noradrenaline</strong> (0.02–0.05 µg/kg/min). This is preferred over phenylephrine or metaraminol, which cause direct microvascular vasoconstriction and compromise flap perfusion<InlineRef topicId="plastic-surgery" refLabel="BJA Educ 2021" />.</li>
                <li><strong>Optimise haematocrit.</strong> Maintain Hct 30–35%. If Hb >110 g/L, consider that relative polycythaemia may increase viscosity; if Hb &lt;80 g/L, consider transfusion.</li>
                <li><strong>Temperature.</strong> Check core temp. If &lt;36 °C, increase warming — hypothermia causes vasoconstriction and coagulopathy.</li>
                <li><strong>Communicate.</strong> Inform the microsurgeon of MAP trends and any interventions. They may pause or adjust the anastomosis timing.</li>
              </ol>
              <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
                <ul className="list-disc list-inside space-y-1 text-foreground">
                  <li>Using phenylephrine or metaraminol as first-line — these cause intense microvascular vasoconstriction.</li>
                  <li>Fluid-bolusing without assessing fluid responsiveness — causes tissue oedema and flap congestion.</li>
                  <li>Ignoring hypothermia — a core temp of 35 °C significantly impairs flap perfusion.</li>
                </ul>
              </div>
            </div>
          ),
          answer:
            "Assess preload with SVV or PLR, fluid-bolus if responsive, then add low-dose noradrenaline (not phenylephrine/metaraminol) to MAP ≥65 mmHg. Maintain Hct 30–35%, normothermia, and adequate depth of anaesthesia.",
          cites: ["BJA Educ 2021"],
        },
        {
          title: "Suspected venous flap congestion at 4 hours post-op",
          scenario:
            "A free TRAM flap becomes dusky with brisk capillary refill and a falling implantable Doppler signal at 4 h. What is the priority?",
          working: (
            <div className="space-y-2">
              <p className="font-semibold text-foreground">Step-by-step approach</p>
              <ol className="list-decimal list-inside space-y-1">
                <li><strong>Recognise venous congestion.</strong> Dusky colour, brisk capillary refill, and falling Doppler signal are classic for venous outflow obstruction — the most common early flap failure mode<InlineRef topicId="plastic-surgery" refLabel="Curr Opin Anaesthesiol 2019" />.</li>
                <li><strong>Time-critical action.</strong> Salvage rates fall sharply after 4–6 h of congestion. Call the surgeon immediately and prepare theatre for emergency re-exploration.</li>
                <li><strong>Optimise the patient.</strong> Ensure MAP ≥65 mmHg, normothermia, and adequate oxygenation. Avoid head-down positioning which worsens venous congestion.</li>
                <li><strong>Bedside measures.</strong> Loosen tight dressings or sutures if instructed by the surgeon. Some units use medicinal leeches (Hirudo medicinalis) for venous congestion as a temporising measure — this requires informed consent and antibiotic prophylaxis (third-generation cephalosporin for Aeromonas coverage).</li>
                <li><strong>Return to theatre.</strong> Re-exploration within 1–2 h dramatically improves flap salvage. The surgeon will revise the venous anastomosis or create a second venous outflow.</li>
              </ol>
              <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
                <ul className="list-disc list-inside space-y-1 text-foreground">
                  <li>Waiting for senior review or imaging — venous congestion is a surgical emergency.</li>
                  <li>Confusing arterial insufficiency (pale, sluggish refill) with venous congestion (dusky, brisk refill) — management differs.</li>
                  <li>Head-down positioning to 'improve perfusion' — worsens venous outflow.</li>
                </ul>
              </div>
            </div>
          ),
          answer:
            "This is venous congestion — a surgical emergency. Call the surgeon immediately, prepare for emergency re-exploration within 1–2 hours, optimise MAP and temperature, loosen dressings if instructed, and avoid head-down positioning. Re-exploration salvage rates are highest in the first 1–2 hours.",
          cites: ["Curr Opin Anaesthesiol 2019"],
        },
      ]}
    />
  );
};

export default PlasticSurgeryTopic;