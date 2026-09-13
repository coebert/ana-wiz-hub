import { Helmet } from "react-helmet-async";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { TopicTableOfContents } from "@/components/layout/TopicTableOfContents";
import { plasticSurgeryQuestions } from "@/data/quizzes";
import FreeFlaPerfusionDiagram from "@/components/diagrams/clinical/FreeFlaPerfusionDiagram";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { InlineRef } from "@/components/references/InlineRef";
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
  { id: "blocks", label: "Flap-specific regional blocks", group: "Procedures" },
  { id: "anticoagulation", label: "Anticoagulation & monitoring", group: "Postoperative" },
  { id: "vte", label: "DVT prophylaxis & Caprini risk", group: "Postoperative" },
  { id: "complications", label: "Postoperative complications", group: "Postoperative" },
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

          <div id="blocks" className="scroll-mt-24">
            <ExamSection exams={[Exam.FINAL]} curriculumCodes={["RCoA Final — Clinical Anaesthesia"]}>
              <CollapsibleSubsection title="Flap-Specific Regional Analgesia">
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Multimodal analgesia (paracetamol, NSAIDs where haemostasis permits, ketamine or magnesium infusion, opioid-sparing regimens) is combined with a block chosen for the specific donor and recipient sites. Blocks reduce opioid requirement, allow earlier mobilisation, and the accompanying sympathetic blockade may improve flap perfusion<InlineRef topicId="plastic-surgery" refLabel="BAPRAS 2020" />.
                </p>
                <div className="overflow-x-auto -mx-4 px-4 mb-3">
                  <table className="w-full min-w-[520px] text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-border text-left">
                        <th className="p-2.5 font-semibold text-foreground">Flap / site</th>
                        <th className="p-2.5 font-semibold text-foreground">Block</th>
                        <th className="p-2.5 font-semibold text-foreground">Notes</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-b border-border">
                        <td className="p-2.5">Fibula free flap (lower limb donor)</td>
                        <td className="p-2.5 font-medium text-foreground">Popliteal sciatic block + saphenous (adductor canal) block</td>
                        <td className="p-2.5">Covers the leg donor site; the saphenous nerve supplies the medial calf missed by the sciatic block. Use a catheter for prolonged analgesia and document motor block so compartment syndrome is not masked</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="p-2.5">Radial forearm free flap</td>
                        <td className="p-2.5 font-medium text-foreground">Brachial plexus block — axillary or supraclavicular</td>
                        <td className="p-2.5">Provides donor-site analgesia and sympathetic blockade (vasodilation). Avoid an interscalene approach for forearm work; check the Allen test and the surgeon's plan before blocking the operative limb</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="p-2.5">Anterolateral thigh (ALT) flap</td>
                        <td className="p-2.5 font-medium text-foreground">Fascia iliaca or femoral nerve block</td>
                        <td className="p-2.5">Covers the anterolateral thigh donor site (lateral cutaneous nerve of thigh territory is included by a fascia iliaca block). Single shot or catheter; balance quadriceps weakness against early mobilisation</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="p-2.5">DIEP / TRAM breast reconstruction</td>
                        <td className="p-2.5 font-medium text-foreground">TAP block or rectus sheath block (± pectoralis/serratus plane for the chest)</td>
                        <td className="p-2.5">Abdominal donor site is the dominant pain source. Catheters or liposomal/long-acting techniques reduce opioid need and improve respiratory function; discuss surgical infiltration to avoid local anaesthetic dose stacking</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="p-2.5">Head & neck reconstruction</td>
                        <td className="p-2.5 font-medium text-foreground">Superficial cervical plexus block</td>
                        <td className="p-2.5">Supplements general anaesthesia for neck dissection and recipient-site incisions; keep volumes modest and avoid deep cervical injection near a flap pedicle or after prior neck surgery</td>
                      </tr>
                      <tr>
                        <td className="p-2.5">Digital replantation</td>
                        <td className="p-2.5 font-medium text-foreground">Axillary or supraclavicular brachial plexus catheter</td>
                        <td className="p-2.5">Sympathetic blockade produces vasodilation and improves digital perfusion — analgesia is almost a secondary benefit</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="p-3 rounded-lg border border-amber-500/20 bg-amber-500/5">
                  <p className="text-xs text-amber-400 font-semibold mb-1">⚠ Exam Tip</p>
                  <p className="text-xs text-muted-foreground">
                    Always state the anticoagulation caveat: many units avoid neuraxial catheters when postoperative heparin, therapeutic LMWH or dextran is planned, and fascial-plane blocks are the safer alternative. Keep the total local anaesthetic dose within safe limits when several blocks plus surgical infiltration are used.
                  </p>
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
                <div className="p-4 rounded-lg border border-border mb-3">
                  <p className="font-semibold text-foreground text-sm mb-1">Suspected flap vasospasm — recognition and management</p>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                    Vasospasm is sympathetically mediated constriction of the pedicle and its microcirculation. The denervated free flap has no sympathetic tone of its own, so it depends entirely on perfusion pressure and vessel calibre — cold, pain, hypovolaemia, catecholamines and mechanical handling all provoke it. Clinically the flap looks pale and cool with sluggish capillary refill and a weak or absent Doppler signal; distinguishing spasm from true thrombosis is not reliable at the bedside, so persistent compromise is a surgical emergency.
                  </p>
                  <ul className="text-xs text-muted-foreground leading-relaxed space-y-1 list-disc pl-4">
                    <li><strong>Correct the physiology first</strong>: actively rewarm the patient to normothermia (core &gt; 36.5 °C) and keep the flap and limb warm; restore intravascular volume with warmed fluid aiming for a well-filled, vasodilated patient; treat pain, anxiety, nausea and shivering, which are all sympathetic stimuli; maintain MAP within 20% of baseline and haematocrit around 0.30 for optimal viscosity and oxygen delivery.</li>
                    <li><strong>Remove mechanical causes</strong>: release tight dressings, sutures and tracheostomy tapes; check for a haematoma or seroma compressing the pedicle; reposition the head and neck to avoid kinking or torsion of the anastomosis; ensure no external pressure on the flap.</li>
                    <li><strong>Vasodilators, in liaison with the surgeon</strong>: topical papaverine or lidocaine applied directly to the pedicle intraoperatively is the mainstay; systemic options where perfusion pressure is adequate include a low-dose glyceryl trinitrate infusion or topical GTN patch, and some units use dextran 40 or nifedipine. There is little high-quality evidence for any systemic agent.</li>
                    <li><strong>Avoid vasoconstrictors where possible</strong>, but do not accept hypotension: if a vasopressor is needed, current evidence shows short-term noradrenaline (rather than phenylephrine or high-dose adrenaline) does not increase flap failure and may improve flap blood flow by restoring perfusion pressure. Hypotension and hypovolaemia are more dangerous to the flap than a modest noradrenaline requirement.</li>
                    <li><strong>Escalate early</strong>: if the flap does not respond within minutes to warming, volume and pressure correction, alert the surgical team for immediate re-exploration — thrombosis salvage rates fall sharply after 4–6 hours.</li>
                  </ul>
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

          <div id="vte" className="scroll-mt-24">
            <ExamSection exams={[Exam.FINAL]} curriculumCodes={["RCoA Final — Clinical Anaesthesia"]}>
              <CollapsibleSubsection title="DVT Prophylaxis & Caprini Risk Assessment">
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Reconstructive patients combine several VTE risk factors — malignancy, prolonged immobile surgery, pelvic or abdominal donor sites and postoperative bed rest. Pulmonary embolism is a leading non-flap cause of death after major reconstruction, so prophylaxis must be planned rather than deferred<InlineRef topicId="plastic-surgery" refLabel="Curr Opin Anaesthesiol 2019" />.
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground mb-3">
                  <li><strong className="text-foreground">Caprini risk assessment</strong>: the validated tool for plastic and reconstructive surgery. Weighted points are given for age, BMI &gt;25, malignancy, previous VTE or family history, thrombophilia, sepsis, immobility, central venous access, oestrogen therapy and surgery lasting &gt;45 minutes. Scores stratify risk: 0–2 low, 3–4 moderate, 5–6 high, 7–8 very high, ≥9 highest risk — free-flap patients commonly score ≥7, which mandates combined mechanical <em>and</em> pharmacological prophylaxis and often extended-duration LMWH</li>
                  <li><strong className="text-foreground">Intermittent pneumatic compression from induction</strong>: correctly sized calf or thigh IPC applied <em>before</em> induction and continued until the patient is mobile. It is the only prophylaxis available during the flap dissection window and does not increase bleeding risk. Avoid IPC on a lower limb that is a donor site (e.g. fibula flap)</li>
                  <li><strong className="text-foreground">LMWH timing</strong>: give the first prophylactic dose <strong>6–12 hours after stable surgical haemostasis</strong> is confirmed (typically that evening or the following morning), then continue daily. Weight-adjust in obesity; reduce or extend the interval in renal impairment</li>
                  <li><strong className="text-foreground">Balancing bleeding and thrombosis</strong>: haematoma under a flap causes pedicle compression and flap loss, so the surgeon must confirm haemostasis before pharmacological prophylaxis; equally, omitting LMWH beyond 24 hours in a Caprini high-risk patient is rarely justifiable. Where both risks are high, rely on IPC, keep prophylaxis at prophylactic (not therapeutic) dose, and review daily with the surgical team. Note that flap-salvage antithrombotics (aspirin, dextran, heparin infusion) do not substitute for VTE prophylaxis</li>
                  <li><strong className="text-foreground">Epidural and catheter adjustments</strong>: insert or remove a neuraxial catheter at least 12 hours after a prophylactic LMWH dose and 24 hours after a therapeutic dose, and wait ≥4 hours after removal before the next dose. If postoperative therapeutic anticoagulation or a heparin infusion is planned, avoid neuraxial techniques altogether and use TAP, rectus sheath or peripheral catheters instead; document the timing plan clearly so ward staff do not give LMWH around catheter removal<InlineRef topicId="plastic-surgery" refLabel="BAPRAS 2020" /></li>
                  <li><strong className="text-foreground">Extended prophylaxis</strong>: consider continuing LMWH for up to 28 days after discharge in patients with malignancy, previous VTE, or prolonged immobility</li>
                </ul>
              </CollapsibleSubsection>
            </ExamSection>
          </div>

          <div id="vasopressors" className="scroll-mt-24">
            <ExamSection exams={[Exam.FINAL]} curriculumCodes={["RCoA Final — Clinical Anaesthesia"]}>
              <CollapsibleSubsection title="Vasopressor Choice and Titration in Free Flap Surgery">
                <p className="text-muted-foreground leading-relaxed mb-3">
                  The old teaching that vasopressors must be avoided absolutely has been overtaken: sustained hypotension is more harmful to a flap than a low-dose vasopressor, because a free flap is denervated and its perfusion depends almost entirely on perfusion pressure and cardiac output. Contemporary guidance is to correct hypovolaemia first, then use noradrenaline as the vasopressor of choice to restore mean arterial pressure and oxygen delivery<InlineRef topicId="plastic-surgery" refLabel="BJA Educ Free Flap 2021" />.
                </p>
                <div className="space-y-3">
                  {[
                    { t: "Why the flap is different", d: "Sympathetic denervation abolishes autoregulation and the response to circulating catecholamines within the flap itself, so flap blood flow is pressure-passive. Systemic vasoconstrictors act mainly on the innervated recipient bed and splanchnic circulation, raising perfusion pressure across the anastomosis; the concern is only whether the pedicle itself constricts." },
                    { t: "Sequence: filling before pressor", d: "Assess fluid responsiveness (stroke volume variation, pulse pressure variation, passive leg raise or a 250 mL fluid challenge) and correct a genuine deficit, then treat residual vasodilatation with a pressor. Do not chase blood pressure with repeated crystalloid boluses — excess crystalloid causes interstitial and flap oedema, raises interstitial pressure and precipitates venous congestion." },
                    { t: "Noradrenaline — first choice", d: "Start 0.02–0.05 µg/kg/min and titrate to the lowest effective rate. Predominant α1 effect with modest β1 support maintains mean arterial pressure and cardiac output; clinical series and reviews show no increase in flap failure at these doses, and free-flap blood flow is generally preserved or improved because of the rise in perfusion pressure. Give through a dedicated central or well-sited large peripheral line with extravasation precautions." },
                    { t: "Agents to avoid or limit", d: "Phenylephrine and metaraminol cause pure α1 vasoconstriction with reflex bradycardia and a fall in cardiac output, so perfusion pressure may rise while flow falls. Avoid boluses of adrenaline and any high-dose vasopressin/terlipressin, which cause intense cutaneous and splanchnic vasoconstriction. Topical or infiltrated adrenaline near the pedicle is contraindicated." },
                    { t: "Dobutamine and inotropes", d: "Where hypotension reflects low cardiac output rather than vasodilatation (poor ventricular function, sepsis, prolonged surgery), dobutamine 2–5 µg/kg/min or low-dose adrenaline increases flow-directed perfusion. Use cardiac-output monitoring rather than pressure alone to make this distinction." },
                    { t: "Haemodynamic targets", d: "Mean arterial pressure ≥ 65–70 mmHg (or within 20% of the patient's baseline; higher in chronic hypertension), cardiac index normal or slightly high, haemoglobin 80–100 g/L (moderate haemodilution optimises viscosity and oxygen delivery), core temperature > 36 °C, normocapnia, and pain-free vasodilatation of the flap bed. Urine output 0.5–1 mL/kg/h; do not use urine output alone to justify more fluid." },
                    { t: "Postoperative continuation", d: "A low-dose noradrenaline infusion can be continued into recovery or critical care to avoid the hypotension of rewarming, epidural or opioid analgesia, provided monitoring and flap observation continue. Wean the pressor before allowing the patient to become dry, and re-examine the flap after each change." },
                  ].map((x) => (
                    <div key={x.t} className="p-3 rounded-lg border border-border">
                      <p className="font-semibold text-foreground text-sm">{x.t}</p>
                      <p className="text-sm text-muted-foreground mt-1">{x.d}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 p-3 rounded-lg border border-amber-500/20 bg-amber-500/5">
                  <p className="text-xs text-amber-400 font-semibold mb-1">⚠ Exam Tip</p>
                  <p className="text-xs text-muted-foreground">
                    The examinable answer is not &quot;never use vasopressors&quot; — it is &quot;optimise preload, keep the patient warm, vasodilated and normocapnic, then use low-dose noradrenaline rather than tolerating hypotension or flooding the patient with crystalloid&quot;.
                  </p>
                </div>
              </CollapsibleSubsection>
            </ExamSection>
          </div>

          <div id="congestion-medical" className="scroll-mt-24">
            <ExamSection exams={[Exam.FINAL]} curriculumCodes={["RCoA Final — Clinical Anaesthesia"]}>
              <CollapsibleSubsection title="Medical Management of Venous Congestion">
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Venous congestion is a surgical emergency and re-exploration of the venous anastomosis is the definitive treatment. The measures below are adjuncts used while theatre is being arranged, or when the anastomosis is patent and congestion is due to outflow mismatch or a failing venous bed — they never replace surgical review<InlineRef topicId="plastic-surgery" refLabel="BJA Educ Free Flap 2021" />.
                </p>
                <div className="space-y-3">
                  {[
                    { t: "Immediate non-pharmacological measures", d: "Release constricting dressings, tight sutures and any external pressure; position the flap so venous drainage is dependent-free and avoid head-down tilt or neck rotation in head and neck cases; maintain normothermia, normocapnia, adequate mean arterial pressure and pain control. Loosening a tight closure alone can reverse early congestion." },
                    { t: "Systemic heparinisation — with important caveats", d: "A heparin infusion (or therapeutic low-molecular-weight heparin) is often used for salvage and after thrombectomy, but the evidence base is weak and bleeding is a real harm: haematoma in a closed flap pocket compresses the pedicle and can itself cause failure, and bleeding into a head and neck wound threatens the airway. Only start after surgical discussion, monitor APTT ratio or anti-Xa, and avoid combining full heparinisation with continuing surgical bleeding, recent neuraxial catheter placement or thrombocytopenia. Low-dose aspirin, dextran and prostacyclin analogues have all been used with little supporting evidence and, for dextran, a clear excess of systemic complications." },
                    { t: "Topical glyceryl trinitrate", d: "Topical GTN paste or patch applied to the flap surface produces local nitric-oxide-mediated venodilatation and arteriolar dilatation and has been used for early congestion and marginal ischaemia. It is cheap and simple but can cause systemic hypotension and headache; remove it if mean arterial pressure falls, since systemic hypotension harms the flap more than the local benefit helps." },
                    { t: "Hyperbaric oxygen therapy", d: "Where available, hyperbaric oxygen (typically 2.0–2.5 atmospheres absolute for 90 minutes, one to two sessions daily) raises dissolved plasma oxygen and can support a congested or partially ischaemic flap while collateral drainage develops. It is an adjunct for salvage of compromised flaps, is logistically demanding, and is contraindicated in untreated pneumothorax; ear barotrauma and oxygen toxicity limit repeated use." },
                    { t: "Medicinal leech therapy", d: "Hirudo medicinalis is used for congested flaps and replanted digits where no venous outflow can be re-established. The leech decompresses the flap by ingesting 5–15 mL of blood and, more importantly, its saliva contains hirudin (a direct thrombin inhibitor), plus hyaluronidase and vasodilators, so the bite continues to ooze for several hours after detachment — providing continuous decongestion." },
                    { t: "Practical and safety aspects of leech therapy", d: "Anticipate significant cumulative blood loss: check haemoglobin daily, group and save, and transfuse as needed. Each leech is used once and then destroyed as clinical waste. The specific hazard is infection with Aeromonas hydrophila, a Gram-negative commensal of the leech gut that causes wound infection, abscess or septicaemia — prophylactic ciprofloxacin (or another agent active against Aeromonas, such as a third-generation cephalosporin or co-trimoxazole) is given for the duration of therapy, since Aeromonas is typically resistant to penicillins and first-generation cephalosporins. Count and secure the leeches, obtain informed consent, and warn about scarring and the psychological aspect." },
                    { t: "When to stop adjuncts and re-explore", d: "If colour, capillary refill or Doppler signal do not improve within minutes to an hour, or deteriorate at any point, the flap needs theatre. Salvage rates fall sharply beyond 4–6 hours of congestion, so adjuncts must never be the reason for delay." },
                  ].map((x) => (
                    <div key={x.t} className="p-3 rounded-lg border border-border">
                      <p className="font-semibold text-foreground text-sm">{x.t}</p>
                      <p className="text-sm text-muted-foreground mt-1">{x.d}</p>
                    </div>
                  ))}
                </div>
              </CollapsibleSubsection>
            </ExamSection>
          </div>

          <div id="complications" className="scroll-mt-24">
            <ExamSection exams={[Exam.FINAL]} curriculumCodes={["RCoA Final — Clinical Anaesthesia"]}>
              <CollapsibleSubsection title="Postoperative Complications & Management">
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Complications divide into flap-related and systemic. Both are common after prolonged reconstruction and both are examined<InlineRef topicId="plastic-surgery" refLabel="BAPRAS 2020" />.
                </p>
                <div className="bg-card border border-border rounded-lg p-4 mb-3">
                  <h3 className="font-semibold text-foreground mb-2">Flap-related</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li><strong className="text-foreground">Haematoma</strong>: expanding swelling, rising drain output, falling Doppler signal and a tense, dusky flap. It compresses the pedicle and causes secondary thrombosis — treat as an emergency with immediate return to theatre for evacuation and haemostasis, correction of coagulopathy, and reassessment of anticoagulation. In head and neck flaps a neck haematoma also threatens the airway: open the wound and plan an advanced airway approach</li>
                    <li><strong className="text-foreground">Infection</strong>: usually days 3–7 — cellulitis, purulent discharge, wound breakdown or systemic sepsis. Take cultures, start broad-spectrum antibiotics per local policy (narrow when sensitivities return), drain collections, and involve microbiology for prosthetic or bone reconstruction. Poorly controlled infection precipitates anastomotic thrombosis</li>
                    <li><strong className="text-foreground">Partial flap loss</strong>: distal or marginal necrosis with a viable pedicle, often from venous congestion or excessive tension. Manage with dressings and observation, then delayed <em>debridement</em> of demarcated tissue with skin grafting or local flap coverage</li>
                    <li><strong className="text-foreground">Total flap loss</strong>: no Doppler signal, cold pale (arterial) or fixed dusky (venous) flap. Immediate re-exploration offers salvage within 4–6 hours; if the flap is unsalvageable it must be <em>debrided</em> and reconstruction planned — a second free flap, a pedicled alternative, or negative-pressure dressings and delayed reconstruction. Anaesthetic implications: repeat prolonged surgery, further blood loss, and a physiologically depleted patient</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Systemic</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li><strong className="text-foreground">Pulmonary embolism</strong>: sudden dyspnoea, tachycardia, hypoxia, pleuritic pain or unexplained hypotension. Give oxygen, obtain ECG and CTPA (echocardiography if unstable), and start therapeutic anticoagulation after discussing the flap bleeding risk with the surgical team; thrombolysis is reserved for haemodynamic collapse. Prevention through Caprini-guided prophylaxis is the exam answer</li>
                    <li><strong className="text-foreground">Pneumonia</strong>: risk is highest after head and neck reconstruction (aspiration, tracheostomy, impaired swallow) and after prolonged ventilation. Manage with sputum culture, targeted antibiotics, physiotherapy, sitting up, effective analgesia to allow coughing, speech-and-language assessment before oral intake, and early mobilisation. Escalate to level 2 care for respiratory support</li>
                    <li><strong className="text-foreground">Acute kidney injury</strong>: from intraoperative hypovolaemia, blood loss, rhabdomyolysis after prolonged immobility, sepsis or nephrotoxins. Monitor urine output hourly, check creatinine and creatine kinase, restore euvolaemia (remembering that flap patients are deliberately run on restricted crystalloid — hypovolaemia harms both kidney and flap), stop NSAIDs and other nephrotoxins, treat the cause, and involve critical care for renal replacement if needed</li>
                    <li>Other recognised problems: delirium in older patients, pressure injuries, corneal abrasion, hypothermia-related coagulopathy, PONV and poor nutrition — all reduced by structured enhanced recovery care</li>
                  </ul>
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
                <li><strong>Optimise haematocrit.</strong> Maintain Hct 30–35%. If Hb &gt;110 g/L, consider that relative polycythaemia may increase viscosity; if Hb &lt;80 g/L, consider transfusion.</li>
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