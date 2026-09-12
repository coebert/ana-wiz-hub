import { Helmet } from "react-helmet-async";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { TopicTableOfContents } from "@/components/layout/TopicTableOfContents";
import { hepatobiliaryTransplantQuestions } from "@/data/quizzes";
import LiverTransplantPhasesDiagram from "@/components/diagrams/clinical/LiverTransplantPhasesDiagram";
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
  { id: "cholecystectomy", label: "Laparoscopic cholecystectomy", group: "Procedures" },
  { id: "resection", label: "Major liver resection", group: "Procedures" },
  { id: "transplant", label: "Liver transplantation", group: "Transplant" },
  { id: "cirrhosis", label: "The cirrhotic patient", group: "Physiology" },
  { id: "faq", label: "FAQ", group: "Reference" },
];

const hepFaqs: Array<[string, string]> = [
  [
    "What is the low CVP technique and why is it used in liver resection?",
    "The low CVP technique aims to reduce central venous pressure below 5 cmH₂O during hepatic parenchymal transection. By lowering CVP, the back-pressure in the hepatic veins and sinusoids is reduced, which minimises bleeding from the cut surface of the liver. Methods to achieve low CVP include: fluid restriction (maintenance only crystalloid), head-up (reverse Trendelenburg) positioning, and vasodilators such as glyceryl trinitrate or phlebotomy in extreme cases. The technique requires careful monitoring with an arterial line and central venous catheter. Caution is needed because excessive hypovolaemia risks renal dysfunction and air embolism through open hepatic veins. After resection is complete, fluids are liberalised to restore normovolaemia and support perfusion of the remaining liver.",
  ],
  [
    "What is the Pringle manoeuvre and what are its limitations?",
    "The Pringle manoeuvre involves clamping the hepatoduodenal ligament, which contains the hepatic artery, portal vein, and common bile duct. This occludes the inflow to the liver and dramatically reduces bleeding during parenchymal transection. The manoeuvre can be applied intermittently (15–20 minutes clamped, 5 minutes released) or continuously for up to 60 minutes in healthy livers. Limitations include: (1) ischaemia-reperfusion injury to the liver — the cirrhotic liver tolerates ischaemia poorly; (2) intestinal congestion from portal venous occlusion; (3) haemodynamic effects from reduced venous return (portal vein carries ~75% of hepatic blood flow); and (4) in chronic liver disease, even short periods of ischaemia may cause significant hepatocyte damage. Some surgeons use selective inflow occlusion (hepatic artery only) to preserve portal venous return.",
  ],
  [
    "What are the three phases of liver transplantation and their key physiological changes?",
    "Phase 1 — Dissection (pre-anhepatic): mobilisation of the diseased liver with division of hilar structures and hepatic veins. Portal hypertension and coagulopathy cause significant bleeding. Ascites drainage produces haemodynamic shifts. Rapid transfusion leads to citrate toxicity (hypocalcaemia), hypothermia, and acidosis. Phase 2 — Anhepatic: the native liver is removed and venous return is interrupted by IVC clamping (or maintained with venovenous bypass). Cardiac output falls 30–50%. There is no hepatic metabolism, so lactate, citrate, and drugs accumulate. Hypocalcaemia and acidosis worsen. Hypothermia is common from the cold donor organ and reduced metabolic heat production. Phase 3 — Reperfusion (neo-hepatic): the donor liver is revascularised. Cold, acidotic, hyperkalaemic preservative fluid and blood from the graft enter the systemic circulation, causing post-reperfusion syndrome — a precipitous fall in MAP, arrhythmias, and myocardial depression.",
  ],
  [
    "How is post-reperfusion syndrome managed?",
    "Post-reperfusion syndrome is defined as a &gt;30% fall in MAP for &gt;1 minute within 5 minutes of graft reperfusion. Management is pre-emptive and reactive: (1) Pre-emptive — before unclamping, ensure ionised calcium is normal (citrate chelation), pH &gt;7.25, K⁺ &lt;5.5 mmol/L, and core temperature &gt;35.5 °C. Have vasopressors, calcium, and bicarbonate drawn up. (2) Reactive — if MAP falls precipitously: give 10 mL 10% calcium chloride IV for cardiac membrane stabilisation and inotropy; administer vasopressors (noradrenaline bolus 10–20 µg, then infusion; adrenaline if severe); treat hyperkalaemia with insulin 10 U + 50 mL 50% glucose and 50 mmol sodium bicarbonate; manage arrhythmias according to ACLS; check TEG/ROTEM for fibrinolysis (graft releases tPA) and give tranexamic acid 1 g if indicated. The syndrome is usually transient (5–30 minutes) as the graft warms and the preservative solution is washed out.",
  ],
  [
    "What are the cardiovascular changes in cirrhosis?",
    "Cirrhosis produces a hyperdynamic circulation characterised by increased cardiac output and decreased systemic vascular resistance. The mechanism is primarily splanchnic and systemic vasodilation from increased nitric oxide and other vasodilators, combined with portal hypertension. Despite the high cardiac output, many cirrhotics have underlying cardiomyopathy (cirrhosis-associated cardiomyopathy) with blunted contractile response to stress and impaired diastolic function. Autonomic dysfunction is common. Portopulmonary hypertension occurs in 2–5% of cirrhotics and significantly increases perioperative risk. Hepatopulmonary syndrome (intrapulmonary vascular dilatation and shunting) causes refractory hypoxaemia that is not corrected by supplemental oxygen alone — the definitive treatment is liver transplantation. Preoperative echocardiography and cardiopulmonary exercise testing are essential for risk stratification.",
  ],
  [
    "How does cirrhosis affect drug pharmacokinetics?",
    "Cirrhosis alters drug handling through multiple mechanisms: (1) ↓ albumin synthesis → increased free fraction of highly protein-bound drugs (e.g., diazepam, thiopentone, bupivacaine); (2) ↓ hepatic blood flow and hepatocellular function → reduced clearance of high-extraction drugs (propofol, lignocaine, opioids) and decreased Phase I metabolism (oxidation, reduction, hydrolysis); (3) ↓ pseudocholinesterase activity → prolonged succinylcholine and mivacurium action; (4) ↑ volume of distribution for hydrophilic drugs due to ascites and oedema; (5) altered blood-brain barrier permeability and increased GABA receptor sensitivity → increased sensitivity to sedatives and anaesthetic agents. As a general principle, all drugs should be titrated carefully with reduced initial doses and longer intervals. Midazolam, for example, has a prolonged half-life and active metabolites that accumulate.",
  ],
  [
    "What is hepatorenal syndrome and how is it treated?",
    "Hepatorenal syndrome (HRS) is a functional renal failure occurring in advanced cirrhosis without intrinsic renal pathology. It is caused by extreme renal vasoconstriction due to activation of the renin-angiotensin-aldosterone and sympathetic nervous systems in response to splanchnic vasodilation and effective circulatory volume depletion. Type 1 HRS is rapid and progressive (creatinine doubling within 2 weeks); Type 2 is more indolent and refractory ascites is the dominant feature. Treatment: (1) terlipressin 0.5–2 mg IV every 4–6 hours (or noradrenaline infusion) to produce splanchnic and systemic vasoconstriction, improving renal perfusion; (2) 20% human albumin 1 g/kg on day 1, then 20–40 g daily to expand plasma volume; (3) avoid nephrotoxins (NSAIDs, aminoglycosides, radiocontrast); (4) transjugular intrahepatic portosystemic shunt (TIPS) in selected patients; (5) liver transplantation is the definitive treatment — HRS typically resolves within days to weeks post-transplant.",
  ],
  [
    "What are the anaesthetic considerations for laparoscopic cholecystectomy?",
    "Laparoscopic cholecystectomy is one of the most common operations and is frequently performed as day surgery. Pneumoperitoneum with CO₂ insufflation causes standard physiological effects: increased PaCO₂ from absorption, increased systemic vascular resistance, and reduced venous return at higher insufflation pressures. Reverse Trendelenburg (head-up) positioning is used to improve surgical exposure of the gallbladder — this reduces preload and venous return further. Anaesthetic management: standard general anaesthesia with controlled ventilation (increase minute ventilation to maintain normocapnia); multimodal analgesia including port-site local anaesthetic infiltration, paracetamol, and NSAIDs if renal function allows; TAP block for moderate-to-high risk patients. PONV prophylaxis is essential — cholecystectomy is a high-risk procedure; use ondansetron + dexamethasone ± cyclizine. Bile duct injury is rare but serious and may require conversion to open surgery with significant blood loss.",
  ],
  [
    "What monitoring is required for liver transplantation?",
    "Liver transplantation requires comprehensive invasive monitoring: (1) Arterial line — continuous blood pressure, frequent ABGs, electrolytes, and coagulation monitoring. (2) Central venous catheter — for CVP monitoring, drug administration, and potential aspiration of air emboli. Some centres use pulmonary artery catheters for high-risk patients (portopulmonary hypertension, severe cardiomyopathy). (3) Large-bore IV access (14–16G ×2 or introducer sheath) for rapid transfusion. (4) Urinary catheter — monitor urine output as a marker of renal perfusion and graft function. (5) Temperature monitoring — core and peripheral; forced-air warming and fluid warmers essential. (6) Thromboelastography (TEG) or ROTEM — guide targeted blood product administration. (7) BIS or entropy monitoring if TIVA used. (8) Cardiac output monitoring (oesophageal Doppler, FloTrac, or PiCCO) in many centres. Blood products must be crossmatched with CMV-negative, irradiated, and leucodepleted blood where indicated.",
  ],
  [
    "How is coagulation managed in liver surgery and transplantation?",
    "The cirrhotic liver produces a 'rebalanced' coagulopathy: decreased procoagulant factors (II, V, VII, IX, X) but also decreased anticoagulants (protein C, protein S, antithrombin). The net effect is not straightforward anticoagulation — thrombosis risk persists. In liver resection, TEG/ROTEM-guided therapy is preferred over empiric transfusion: give FFP if R-time prolonged, cryoprecipitate/fibrinogen concentrate if fibrinogen &lt;1.5 g/L, platelets if count &lt;50 ×10⁹/L. During transplantation, massive transfusion is common: maintain Hb 80–100 g/L, platelets &gt;50 ×10⁹/L, fibrinogen &gt;1.5 g/L, and INR &lt;2.0. Citrate toxicity from rapid transfusion causes hypocalcaemia — monitor ionised calcium and replace aggressively (10% calcium chloride 10 mL prn). Post-reperfusion, the graft releases tPA causing fibrinolysis — give tranexamic acid 1 g if TEG/ROTEM confirms hyperfibrinolysis. Recombinant factor VIIa is reserved for refractory bleeding due to thrombosis risk.",
  ],
];

const HepatobiliaryTransplantTopic = () => {
  return (
    <TopicTemplate
      title="Hepatobiliary & Transplant Anaesthesia"
      subtitle="FRCA Final — Clinical Anaesthesia"
      backPath="/clinical"
      backLabel="Clinical Anaesthesia"
      accentColor="text-clinical"
      topicId="hepatobiliary-transplant"
      quizQuestions={hepatobiliaryTransplantQuestions}
      objectives={[
        "Plan anaesthesia for laparoscopic cholecystectomy and major liver resection",
        "Apply the low CVP technique and Pringle manoeuvre during hepatic resection",
        "Describe the three phases of liver transplantation and their physiological challenges",
        "Recognise and treat post-reperfusion syndrome",
        "Adapt anaesthesia for the cirrhotic patient including hepatopulmonary syndrome",
      ]}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL, Exam.FFICM], curriculumCodes: ["CH_BK_03"] },
        workedExamples: { exams: [Exam.FINAL] },
        keyPoints: { exams: [Exam.FINAL] },
      }}
      sectionSources={{
        objectives: ["BJA Educ LiverResection 2017", "AAGBI Cirrhosis 2017"],
        workedExamples: ["BJA Educ LT 2010", "ITLS Reperfusion"],
        keyPoints: ["BJA Educ LiverResection 2017", "BJA Educ LT 2010", "AAGBI Cirrhosis 2017", "ITLS Reperfusion"],
      }}
      keyPoints={[
        { text: "Low CVP technique (&lt;5 cmH₂O) reduces blood loss during liver resection — fluid restriction, reverse Trendelenburg, vasodilators", cites: ["BJA Educ LiverResection 2017"] },
        { text: "Pringle manoeuvre: clamp hepatoduodenal ligament — limit to 15–20 min to prevent ischaemia; longer in healthy livers", cites: ["ITLS Reperfusion"] },
        { text: "Post-reperfusion syndrome: ↓ MAP &gt;30%, hyperkalaemia, acidosis within 5 min of unclamping — pre-emptive calcium, bicarbonate, vasopressors", cites: ["AAGBI Cirrhosis 2017"] },
        { text: "Cirrhotic patients: hyperdynamic circulation, rebalanced haemostasis, hepatopulmonary syndrome, altered drug pharmacokinetics", cites: ["BJA Educ LiverResection 2017"] },
        { text: "Anhepatic phase: no hepatic metabolism — citrate/drug accumulation, worsening acidosis and hypocalcaemia", cites: ["BJA Educ LT 2010"] },
      ]}
      coreConcepts={
        <>
          <TopicTableOfContents items={tocItems} />

          <div id="intro" className="scroll-mt-24">
            <ExamSection exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["CH_BK_03"]}>
              <CollapsibleSubsection title="Introduction" defaultOpen>
                <p className="text-muted-foreground leading-relaxed">
                  Hepatobiliary surgery ranges from laparoscopic cholecystectomy to major liver resection and transplantation. Liver transplant anaesthesia demands expertise in managing coagulopathy, massive transfusion, electrolyte derangement, and haemodynamic instability through the dissection, anhepatic, and reperfusion phases. Understanding the physiological consequences of portal hypertension, the low CVP technique, and the unique challenges of the cirrhotic patient is essential for the FRCA Final examination.
                </p>
              </CollapsibleSubsection>
            </ExamSection>
          </div>

          <div id="cholecystectomy" className="scroll-mt-24">
            <ExamSection exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["CH_BK_03"]}>
              <CollapsibleSubsection title="Laparoscopic Cholecystectomy">
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Laparoscopic cholecystectomy is the most common elective general surgical procedure and is frequently performed as day surgery. Anaesthetic considerations centre on pneumoperitoneum physiology, positioning, and PONV prophylaxis.
                </p>
                <div className="grid sm:grid-cols-2 gap-3 mb-3">
                  {[
                    { label: "Pneumoperitoneum", value: "CO₂ insufflation to 12–15 mmHg — ↑ PaCO₂, ↑ SVR, vagal stimulation on initial insufflation" },
                    { label: "Positioning", value: "Reverse Trendelenburg (head-up) — ↓ preload, ↓ venous return; combine with slight left tilt to minimise caval compression" },
                    { label: "Analgesia", value: "Port-site LA infiltration, paracetamol, NSAID if renal function allows, low-dose opioid; TAP block for high-risk patients" },
                    { label: "PONV", value: "High-risk procedure — multimodal antiemesis essential: ondansetron 4 mg + dexamethasone 4 mg ± cyclizine 50 mg" },
                    { label: "Bile duct injury", value: "Rare (0.3–0.5%) but serious — may require conversion to open; prolonged operation and potential for bile peritonitis" },
                    { label: "Day-case criteria", value: "Minimal opiates, able to tolerate oral fluids, pain controlled with simple analgesia, mobile, responsible adult at home" },
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
                    In a patient with significant comorbidity or anticipated difficult gallbladder (e.g. acute cholecystitis, previous upper abdominal surgery), plan for overnight stay and more invasive monitoring. Subcostal TAP blocks provide excellent analgesia for upper abdominal port sites.
                  </p>
                </div>
              </CollapsibleSubsection>
            </ExamSection>
          </div>

          <div id="resection" className="scroll-mt-24">
            <ExamSection exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["CH_BK_03"]}>
              <CollapsibleSubsection title="Major Liver Resection">
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Hepatectomy for primary or secondary liver tumours involves resection of up to 70% of hepatic parenchyma. The liver's dual blood supply and remarkable regenerative capacity make this possible, but anaesthetic management is complex<InlineRef topicId="hepatobiliary-transplant" refLabel="BJA Educ LiverResection 2017" />.
                </p>
                <div className="grid sm:grid-cols-2 gap-3 mb-3">
                  {[
                    { label: "Low CVP technique", value: "Target CVP &lt;5 cmH₂O — fluid restriction, reverse Trendelenburg, GTN. Reduces hepatic venous bleeding during transection" },
                    { label: "Pringle manoeuvre", value: "Clamp hepatoduodenal ligament (portal vein + hepatic artery) — limits 15–20 min, release 5 min. Reduces inflow bleeding" },
                    { label: "Blood loss", value: "Potentially massive — crossmatch 6 units, cell salvage, rapid infuser, activated massive haemorrhage protocol if needed" },
                    { label: "Coagulopathy", value: "Loss of clotting factor synthesis; TEG/ROTEM-guided therapy: FFP, cryoprecipitate, platelets as indicated" },
                    { label: "Monitoring", value: "Arterial line, CVC (for CVP target), large-bore IVs, urinary catheter, core temperature, TEG/ROTEM" },
                    { label: "Postoperative", value: "HDU/ICU; risk of hepatic failure, bile leak, haemorrhage; monitor lactate, INR, glucose, ammonia" },
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
                    <li>Excessive fluid administration → high CVP → torrential bleeding from hepatic veins.</li>
                    <li>Prolonged Pringle time in cirrhotic liver → irreversible ischaemic damage.</li>
                    <li>Failing to restore normovolaemia after resection → hypoperfusion of remaining liver and acute kidney injury.</li>
                  </ul>
                </div>
              </CollapsibleSubsection>
            </ExamSection>
          </div>

          <div id="transplant" className="scroll-mt-24">
            <ExamSection exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["CH_BK_03"]}>
              <CollapsibleSubsection title="Liver Transplantation — Phases">
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Orthotopic liver transplantation proceeds through three distinct phases, each with unique physiological challenges. Understanding these phases is critical for both the operating room and the FRCA Final viva<InlineRef topicId="hepatobiliary-transplant" refLabel="BJA Educ LT 2010" />.
                </p>
                <div className="bg-card rounded-xl border border-border p-4 md:p-6 mb-4">
                  <LiverTransplantPhasesDiagram />
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-border bg-secondary/10">
                    <h3 className="font-semibold text-foreground text-sm mb-2">Phase 1: Dissection (Pre-anhepatic)</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                      <li>Mobilisation of native liver — extensive adhesions in cirrhotic patients from previous peritonitis</li>
                      <li>Coagulopathy from portal hypertension and synthetic failure → bleeding can be massive and difficult to control</li>
                      <li>Ascites drainage → acute haemodynamic shifts; third-space losses significant</li>
                      <li>Citrate toxicity from rapid transfusion → hypocalcaemia (monitor ionised calcium and replace prophylactically)</li>
                      <li>Maintain haemoglobin 80–100 g/L, platelets &gt;50 ×10⁹/L, fibrinogen &gt;1.5 g/L using TEG/ROTEM guidance</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg border border-border bg-secondary/10">
                    <h3 className="font-semibold text-foreground text-sm mb-2">Phase 2: Anhepatic</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                      <li>IVC clamped (classic technique) or side-clamped/piggyback — ↓↓ preload, cardiac output falls 30–50%</li>
                      <li>Venovenous bypass (femoral-to-axillary or portal-to-axillary) maintains venous return in some centres but is increasingly abandoned</li>
                      <li>No hepatic metabolism — accumulation of citrate, lactate, and anaesthetic drugs; acidosis worsens</li>
                      <li>Hypocalcaemia from ongoing citrate administration; hypothermia from cold donor organ and reduced metabolic heat production</li>
                      <li>Duration 45–90 minutes; haemodynamic support with noradrenaline ± vasopressin; adrenaline if severe hypotension</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg border border-border bg-secondary/10">
                    <h3 className="font-semibold text-foreground text-sm mb-2">Phase 3: Reperfusion (Neo-hepatic)</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                      <li><strong>Post-reperfusion syndrome</strong>: ↓ MAP &gt;30% for &gt;1 min within 5 min of reperfusion — cold, acidotic, hyperkalaemic blood from graft washes into systemic circulation</li>
                      <li>Hyperkalaemia — potentially fatal; pre-emptive insulin/dextrose, calcium, and bicarbonate before unclamping</li>
                      <li>Arrhythmias including ventricular fibrillation and cardiac arrest — from K⁺ surge, acidosis, and myocardial depression</li>
                      <li>Fibrinolysis — graft releases tissue plasminogen activator (tPA); may need tranexamic acid 1 g</li>
                      <li>Progressive improvement as graft function recovers — falling lactate, improving coagulation, bile production in drain</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg border border-border bg-secondary/10">
                    <h3 className="font-semibold text-foreground text-sm mb-2">Citrate Toxicity During Massive Transfusion</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Stored blood components are anticoagulated with citrate, which acts by <strong className="text-foreground">chelating ionised calcium</strong> (and magnesium) into a non-ionised, biologically inactive complex. Each unit of red cells contains roughly 3 g of citrate and each unit of FFP considerably more, so rapid transfusion delivers a large citrate load. Citrate is normally metabolised within minutes by the liver (and to a lesser extent kidney and muscle) via the Krebs cycle to bicarbonate — so toxicity is a problem of <em>rate of delivery exceeding rate of metabolism</em><InlineRef topicId="hepatobiliary-transplant" refLabel="BJA Educ LT 2010" />.
                    </p>
                    <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside mb-2">
                      <li><strong className="text-foreground">Effects of the resulting hypocalcaemia</strong>: myocardial depression with reduced contractility and cardiac output, hypotension and vasodilatation (calcium is required for vascular smooth-muscle tone and catecholamine responsiveness), prolonged QT interval and arrhythmias, and impaired coagulation — calcium is factor IV and is essential for the tenase and prothrombinase complexes, so hypocalcaemia worsens the very bleeding driving the transfusion. Later signs in the awake patient include perioral paraesthesia, tetany and a positive Trousseau's sign. Citrate metabolism also produces a delayed <em>metabolic alkalosis</em> once liver function returns</li>
                      <li><strong className="text-foreground">Monitoring and target</strong>: measure <strong>ionised calcium</strong> on the blood gas analyser every 15–30 minutes during rapid transfusion (total calcium is misleading during citrate loading). Keep iCa <strong>&gt;0.8–1.0 mmol/L</strong> as the minimum acceptable range, aiming for the normal 1.1–1.3 mmol/L when there is coagulopathy or cardiovascular instability. Check magnesium too — it is chelated by the same mechanism</li>
                      <li><strong className="text-foreground">Replacement</strong>: 10 mL of <em>10% calcium chloride</em> provides ~6.8 mmol (272 mg) of elemental calcium, whereas 10 mL of <em>10% calcium gluconate</em> provides only ~2.2 mmol (89 mg) — roughly a three-fold difference. Practical approach: 10 mL 10% calcium chloride slowly through a central line for iCa &lt;0.9 mmol/L or during rapid transfusion (a common empirical practice is around 10 mL per 2–4 units of rapidly transfused blood or FFP, titrated to repeat iCa); use 10–30 mL 10% calcium gluconate peripherally, as it is far less irritant and does not cause tissue necrosis on extravasation. In severe or refractory cases a calcium infusion (e.g. 10% calcium chloride 10–20 mL/h, titrated) is preferable to repeated boluses. Give slowly with ECG monitoring and beware bradycardia. Note that calcium gluconate requires hepatic metabolism to liberate calcium, which is a further argument for calcium chloride in liver failure and the anhepatic phase</li>
                      <li><strong className="text-foreground">Why the anhepatic phase matters most</strong>: with the native liver excluded and the graft not yet perfused there is <em>no hepatic citrate metabolism at all</em>, so citrate accumulates in direct proportion to transfusion rate. Hypocalcaemia is therefore profound and progressive at exactly the point where cardiac output has already fallen 30–50% from IVC clamping, hypothermia and acidosis are worsening myocardial performance, and coagulopathy is at its peak. Correct ionised calcium <strong>before</strong> unclamping — normal iCa, pH &gt;7.25, K⁺ &lt;5.5 mmol/L and temperature &gt;35.5 °C are the pre-reperfusion checklist, and calcium chloride should be drawn up and ready in the syringe for the reperfusion hypotension and hyperkalaemia that follow</li>
                    </ul>
                  </div>
                </div>

              </CollapsibleSubsection>
            </ExamSection>
          </div>

          <div id="cirrhosis" className="scroll-mt-24">
            <ExamSection exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["CH_BK_03"]}>
              <CollapsibleSubsection title="Anaesthesia for the Cirrhotic Patient">
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Cirrhosis produces a multisystem disease that profoundly affects perioperative management. The concept of 'rebalanced haemostasis' is crucial — these patients are neither auto-anticoagulated nor automatically bleeding<InlineRef topicId="hepatobiliary-transplant" refLabel="AAGBI Cirrhosis 2017" />.
                </p>
                <div className="grid sm:grid-cols-2 gap-3 mb-3">
                  {[
                    { label: "Cardiovascular", value: "Hyperdynamic circulation (↑ CO, ↓ SVR), cirrhotic cardiomyopathy, autonomic dysfunction, portopulmonary hypertension" },
                    { label: "Respiratory", value: "Hepatopulmonary syndrome (intrapulmonary shunting → hypoxia), pleural effusions, restrictive physiology from ascites" },
                    { label: "Coagulation", value: "Rebalanced haemostasis — ↓ procoagulants AND ↓ anticoagulants. TEG/ROTEM more useful than INR alone" },
                    { label: "Pharmacology", value: "↓ albumin → ↑ free drug fraction; ↓ hepatic clearance; ↓ pseudocholinesterase. Titrate all drugs carefully" },
                    { label: "Renal", value: "Hepatorenal syndrome risk — functional renal failure from renal vasoconstriction. Avoid nephrotoxins" },
                    { label: "Neurological", value: "Hepatic encephalopathy — avoid sedatives if possible; lactulose and rifaximin preoperatively" },
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
                    A common exam trap is assuming cirrhotics are 'auto-anticoagulated' and therefore protected from thrombosis. This is false — they have a rebalanced but often prothrombotic state, particularly portal and hepatic vein thrombosis. VTE prophylaxis is essential.
                  </p>
                </div>
              </CollapsibleSubsection>
            </ExamSection>
          </div>

          <ExamPitfallsCallout
            accent="clinical"
            pitfalls={[
              "Low CVP technique (&lt;5 cmH₂O) reduces blood loss during hepatic resection — fluid restriction + reverse Trendelenburg + GTN.",
              "Liver transplant phases: pre-anhepatic (mobilisation), anhepatic (clamping → fall in CO, citrate accumulation), reperfusion (hyperkalaemia, acidosis, hypotension).",
              "Post-reperfusion syndrome: 30% fall in MAP within 5 min of reperfusion — pre-emptive calcium, bicarbonate, vasopressor bolus.",
              "Cirrhotic patient: altered drug kinetics, coagulopathy that is rebalanced not 'auto-anticoagulated' — VTE risk persists.",
              "Hepatorenal syndrome: functional renal failure, treat with terlipressin + albumin; liver transplant is definitive.",
            ]}
          />

          <section id="faq" className="scroll-mt-24 mt-10">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
              Hepatobiliary & Transplant Anaesthesia — FAQ
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
              Evidence-based answers to the questions FRCA Final candidates most often ask about the low CVP technique, Pringle manoeuvre, liver transplant phases, post-reperfusion syndrome, cirrhotic cardiovascular changes, drug pharmacokinetics in liver disease, hepatorenal syndrome, laparoscopic cholecystectomy, transplant monitoring, and coagulation management.
            </p>
            <Accordion type="single" collapsible className="w-full">
              {hepFaqs.map(([q, a], i) => (
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
            <title>Hepatobiliary & Transplant Anaesthesia — Liver resection & LT | FRCA</title>
            <meta
              name="description"
              content="Hepatobiliary and transplant anaesthesia for FRCA Final: low CVP technique and Pringle manoeuvre, liver transplant phases, post-reperfusion syndrome, cirrhotic patient physiology, and hepatorenal syndrome."
            />
            <script type="application/ld+json">{JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: hepFaqs.map(([name, acceptedAnswer]) => ({
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
          title: "Managing post-reperfusion syndrome",
          scenario: "Within 2 min of unclamping the donor liver, MAP falls from 75 to 45 mmHg, K⁺ jumps to 6.4 mmol/L, pH 7.18 with broad QRS on ECG.",
          working: (
            <div className="space-y-2">
              <p className="font-semibold text-foreground">Step-by-step reasoning</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Recognise <strong>post-reperfusion syndrome</strong> + hyperkalaemic cardiotoxicity.</li>
                <li>Membrane stabilisation: <strong>10 mL 10% calcium chloride</strong> (or 30 mL Ca gluconate via large vein) IV stat.</li>
                <li>Drive K⁺ intracellularly: <strong>insulin 10 U + 50 mL 50% glucose</strong>, plus <strong>50 mmol NaHCO₃</strong> for acidosis.</li>
                <li>Restore MAP: noradrenaline bolus 10–20 mcg + infusion; titrate adrenaline if myocardial depression.</li>
                <li>Anticipate fibrinolysis — send TEG/ROTEM, give tranexamic acid 1 g if EXTEM ML &gt;15%.</li>
                <li>Re-warm; continue volume optimisation guided by SV/PPV; communicate with surgeon for graft assessment.</li>
              </ol>
              <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
                <p className="text-xs font-semibold text-destructive uppercase">Common traps</p>
                <ul className="list-disc list-inside text-foreground">
                  <li>Bolus phenylephrine alone won't fix the hyperkalaemic arrest — treat K⁺ first.</li>
                  <li>Forgetting calcium when transfusing rapidly (citrate chelates Ca²⁺).</li>
                  <li>Withholding bicarbonate when severe acidosis worsens hyperkalaemia.</li>
                </ul>
              </div>
            </div>
          ),
          answer: "Calcium → insulin/dextrose + bicarbonate → vasopressor support; treat fibrinolysis with TXA if needed.",
          cites: ["BJA Educ LT 2010"],
        },
      ]}
    />
  );
};

export default HepatobiliaryTransplantTopic;