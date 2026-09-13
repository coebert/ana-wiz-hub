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
  { id: "meld", label: "MELD & MELD-Na scores", group: "Physiology" },
  { id: "tipss", label: "Anaesthesia for TIPSS", group: "Procedures" },
  { id: "prs", label: "Post-reperfusion syndrome", group: "Procedures" },
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

                <h3 className="font-semibold text-foreground text-sm mb-2 mt-4">Risk Stratification — Child-Pugh and MELD</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Every cirrhotic patient presenting for surgery should be scored, because the score — not the diagnosis of cirrhosis alone — drives the consent conversation and the decision to operate<InlineRef topicId="hepatobiliary-transplant" refLabel="BJA Educ Cirrhosis Surgery 2020" />.
                </p>
                <div className="overflow-x-auto mb-3">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-border text-left text-foreground">
                        <th className="py-2 pr-3 font-semibold">Child-Pugh component</th>
                        <th className="py-2 pr-3 font-semibold">1 point</th>
                        <th className="py-2 pr-3 font-semibold">2 points</th>
                        <th className="py-2 font-semibold">3 points</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-b border-border"><td className="py-2 pr-3 font-medium text-foreground">Bilirubin (µmol/L)</td><td>&lt; 34</td><td>34–50</td><td>&gt; 50</td></tr>
                      <tr className="border-b border-border"><td className="py-2 pr-3 font-medium text-foreground">Albumin (g/L)</td><td>&gt; 35</td><td>28–35</td><td>&lt; 28</td></tr>
                      <tr className="border-b border-border"><td className="py-2 pr-3 font-medium text-foreground">INR (or prothrombin time)</td><td>&lt; 1.7</td><td>1.7–2.3</td><td>&gt; 2.3</td></tr>
                      <tr className="border-b border-border"><td className="py-2 pr-3 font-medium text-foreground">Ascites</td><td>None</td><td>Mild / diuretic-responsive</td><td>Moderate–severe / refractory</td></tr>
                      <tr><td className="py-2 pr-3 font-medium text-foreground">Encephalopathy</td><td>None</td><td>Grade I–II</td><td>Grade III–IV</td></tr>
                    </tbody>
                  </table>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed mb-3">
                  <li><strong>Child-Pugh grade</strong>: A = 5–6 points, B = 7–9, C = 10–15. Two of the five variables are subjective (ascites, encephalopathy), which is its main weakness, but it remains the quickest bedside tool<InlineRef topicId="hepatobiliary-transplant" refLabel="Pugh 1973" />. Classically quoted perioperative mortality for major abdominal surgery is roughly 10% for grade A, 30% for grade B and 70–80% for grade C.</li>
                  <li><strong>MELD</strong> is entirely objective and predicts <strong>3-month mortality</strong> from bilirubin, creatinine and INR (with a term for dialysis); MELD-Na adds sodium. It was derived to predict survival after TIPSS and is now used for transplant allocation and preoperative risk<InlineRef topicId="hepatobiliary-transplant" refLabel="MELD Kamath 2001" />.</li>
                  <li><strong>Clinical implications</strong>: a <strong>MELD &gt; 15 or Child-Pugh C</strong> carries a very high perioperative mortality and usually precludes elective non-transplant surgery — the discussion should shift to non-operative management, less invasive alternatives, or transplant assessment. MELD &lt; 10 / Child-Pugh A patients generally tolerate surgery with careful optimisation; the intermediate group needs individualised multidisciplinary discussion, and every point of MELD above 8 adds roughly 1% to 30-day mortality.</li>
                  <li><strong>Beyond the scores</strong>: sarcopenia and frailty, portal hypertension (hepatic venous pressure gradient &gt; 10 mmHg), hyponatraemia, active infection and the urgency and site of surgery (emergency, cardiac and hepatic resection carry the highest risk) all modify these estimates.</li>
                </ul>

                <h3 className="font-semibold text-foreground text-sm mb-2 mt-4">Detailed Cardiovascular Assessment of the Cirrhotic Patient</h3>
                <div className="space-y-3">
                  {[
                    { t: "Why standard assessment misleads", d: "The hyperdynamic circulation (high cardiac output, low systemic vascular resistance, low-normal blood pressure) masks limited reserve: resting cardiac output is high, so a normal exercise tolerance does not exclude disease, and vasodilatation keeps blood pressure and creatinine deceptively normal. Beta-blockade for varices further blunts the heart-rate response. Functional testing (cardiopulmonary exercise testing, dobutamine stress echocardiography where exercise is impossible) is more informative than history alone in patients listed for transplantation or major resection." },
                    { t: "Cirrhotic cardiomyopathy", d: "Present in up to half of patients with advanced cirrhosis: blunted contractile and chronotropic response to stress, diastolic dysfunction with impaired relaxation, electrophysiological abnormalities (prolonged QT interval), and a normal or supranormal resting ejection fraction. It is unmasked by the stress of surgery, reperfusion, sepsis or a transjugular shunt, when cardiac output fails to rise or overt pulmonary oedema appears." },
                    { t: "Transthoracic echocardiography — what to look for", d: "Routine in all transplant candidates. Assess left ventricular systolic function and, critically, diastolic function (E/A ratio, E/e′, left atrial size), left ventricular hypertrophy, valvular lesions, right ventricular size and function, tricuspid annular plane systolic excursion, estimated pulmonary artery systolic pressure from the tricuspid regurgitant jet, and inferior vena cava dimensions. Agitated-saline (bubble) study identifies intrapulmonary shunting when hepatopulmonary syndrome is suspected — late (3–6 cardiac cycles) left-heart appearance of bubbles indicates intrapulmonary rather than intracardiac shunt." },
                    { t: "Portopulmonary hypertension (PoPH)", d: "Pulmonary arterial hypertension occurring with portal hypertension: mean pulmonary artery pressure > 20 mmHg with pulmonary vascular resistance > 3 Wood units and normal or low left atrial filling pressure. Screen by echocardiography and confirm by right heart catheterisation, because the echo estimate is unreliable in a high-output state. It is a right ventricular problem, not a shunt problem: mean pulmonary artery pressure ≥ 50 mmHg (or ≥ 35 mmHg with right ventricular failure) is generally a contraindication to transplantation until pulmonary vasodilator therapy (phosphodiesterase-5 inhibitors, endothelin antagonists, prostanoids) reduces pressure and improves right ventricular function." },
                    { t: "Hepatopulmonary syndrome (HPS)", d: "The physiological opposite: intrapulmonary vascular dilatation causing right-to-left shunt with hypoxaemia, platypnoea and orthodeoxia (arterial oxygen falling on sitting up), clubbing and spider naevi. Defined by liver disease with portal hypertension, an alveolar–arterial gradient above the age-adjusted limit or PaO₂ < 80 mmHg on air, and demonstrable intrapulmonary shunt. Unlike PoPH it improves and usually resolves after transplantation, and severe hypoxaemia earns exception listing points. Anaesthetic implications are difficult pre-oxygenation, shunt unresponsive to increased FiO₂, and a slow postoperative oxygenation recovery." },
                    { t: "Coronary artery disease and rhythm", d: "Prevalence is rising with non-alcoholic fatty liver disease, diabetes and older recipients. Assess conventional risk factors, obtain a 12-lead ECG (QT prolongation, atrial fibrillation), and consider computed-tomography coronary angiography or functional imaging in patients over 50 or with risk factors; a raised troponin or brain natriuretic peptide should prompt cardiology review. Coronary revascularisation before transplantation must be balanced against the bleeding risk of antiplatelet therapy." },
                    { t: "Volume state and vasopressor responsiveness", d: "Chronic vasodilatation, splanchnic sequestration, diuretics and large-volume paracentesis leave many patients intravascularly depleted despite ascites and oedema, with relative vasopressin deficiency and reduced catecholamine responsiveness. Anticipate profound hypotension at induction, and note that ascites drainage, tense abdomen and diaphragmatic splinting all alter preload assessment. Dynamic measures and echocardiography are more reliable than central venous pressure." },
                    { t: "Risk stratification and decision-making", d: "Combine liver-specific scores (MELD, MELD-Na, Child–Pugh) with cardiopulmonary findings, frailty and sarcopaemia. The combination of cirrhotic cardiomyopathy, PoPH and renal dysfunction identifies the patients at highest risk of intraoperative cardiac arrest and post-reperfusion collapse, and should trigger multidisciplinary discussion, pre-optimisation, invasive haemodynamic monitoring from the outset, and planning for postoperative critical care." },
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


          <div id="prs" className="scroll-mt-24">
            <ExamSection exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["CH_BK_03"]}>
              <CollapsibleSubsection title="Post-Reperfusion Syndrome — Risk, Prophylaxis and Team Communication">
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Post-reperfusion syndrome is a fall in mean arterial pressure of more than 30% from the pre-reperfusion value, lasting at least one minute, within five minutes of graft reperfusion. It occurs in roughly a third of transplants and is the single most dangerous minute of the operation<InlineRef topicId="hepatobiliary-transplant" refLabel="ITLS Reperfusion" />.
                </p>
                <div className="space-y-3">
                  {[
                    { t: "Mechanism", d: "Unclamping washes a cold (often < 30 °C locally), acidotic, hyperkalaemic, hyperosmolar preservation-solution and metabolite load into the right heart, together with vasoactive mediators, air and microemboli, tissue plasminogen activator and cytokines from the reperfused graft. The result is myocardial depression and bradyarrhythmia, abrupt vasodilatation, sudden pulmonary hypertension and right ventricular strain, and hyperfibrinolysis." },
                    { t: "Graft and donor risk factors", d: "Prolonged cold ischaemia time (particularly > 8–10 hours), steatotic or marginal grafts, older donors, donation after circulatory death, extended warm ischaemia, large graft-to-recipient size ratio, and a large volume of preservation solution retained in the graft. Machine perfusion and thorough back-table flushing of the graft with albumin or blood reduce the insult." },
                    { t: "Recipient risk factors", d: "High MELD score, cirrhotic cardiomyopathy or diastolic dysfunction, portopulmonary hypertension, pre-existing renal impairment, low pre-reperfusion mean arterial pressure or ionised calcium, acidosis, hyperkalaemia, hypothermia, high vasopressor requirement in the anhepatic phase, and piggy-back versus full caval clamping technique." },
                    { t: "Preparation in the last minutes of the anhepatic phase", d: "Correct what you can control before the clamps come off: normalise ionised calcium, potassium and pH, rewarm actively, ensure haemoglobin and volume state are adequate but avoid over-filling a stiff right ventricle, confirm large-bore access and a working rapid infuser, and have adrenaline, calcium chloride, sodium bicarbonate, insulin/dextrose, atropine and a vasopressin syringe drawn up and labelled at the head of the table." },
                    { t: "Prophylactic strategies — and the debate", d: "Practice varies and the evidence is largely observational. Commonly used measures include pre-emptive calcium chloride, sodium bicarbonate and insulin/dextrose, a small prophylactic adrenaline bolus (10–100 µg) or a pre-started low-dose adrenaline/noradrenaline infusion, methylene blue for refractory vasoplegia, and pre-reperfusion volume loading. Each is debated: bicarbonate loading worsens hypercapnia and shifts potassium unpredictably, routine calcium risks graft injury and hypercalcaemia, prophylactic vasopressors may increase pulmonary vascular resistance in an already strained right ventricle, and aggressive volume loading raises hepatic venous congestion and worsens graft outflow. There is no consensus on a single regimen — the defensible position is to correct measured derangements, avoid empirical polypharmacy, and be immediately ready to treat rather than blindly pre-treat." },
                    { t: "Vasopressor and inotrope selection", d: "The problem is combined vasoplegia and right ventricular dysfunction. Adrenaline in 10–100 µg boluses (or an infusion) is first-line for the acute event because it treats both the myocardial depression and the vasodilatation; noradrenaline is the workhorse infusion for maintaining perfusion pressure; vasopressin 0.01–0.04 units/min is a valuable adjunct in catecholamine-resistant vasoplegia and spares splanchnic pressure, but excessive doses raise portal and pulmonary pressures. Methylene blue 1–2 mg/kg is reserved for refractory vasoplegia. Where right ventricular failure dominates, add an inodilator (dobutamine or milrinone) with inhaled nitric oxide or nebulised prostacyclin rather than escalating pure vasoconstrictors. Avoid phenylephrine alone, which raises afterload without supporting the right ventricle." },
                    { t: "Refractory collapse and fibrinolysis", d: "Treat hyperkalaemic cardiac arrest along ALS lines with calcium, insulin/dextrose and bicarbonate, continue chest compressions with the surgeon controlling the field, and consider re-clamping if the graft is the cause. Suspect hyperfibrinolysis if diffuse oozing begins immediately after reperfusion — confirm with viscoelastic testing (ROTEM/TEG) and treat with tranexamic acid 1 g and fibrinogen replacement rather than empirical fresh frozen plasma." },
                    { t: "Sterile cockpit communication", d: "Reperfusion should be run like a briefed high-risk aviation manoeuvre. The surgeon announces intent and asks permission before unclamping; the anaesthetist explicitly confirms readiness (calcium, potassium, pH, temperature, volume, drugs drawn up, blood available, monitoring stable); non-essential conversation, music, telephone calls, and staff movement stop; the perfusionist and scrub team are told to hold. Everyone watches the arterial trace and the ECG for the first five minutes, drug doses are called out and acknowledged, and the surgeon is told immediately about pressure, rhythm and bleeding changes. Debrief afterwards on what was needed. This structured, closed-loop communication — the same principle as the WHO checklist and aviation-derived sterile cockpit — measurably reduces error at the moment when two teams must act as one." },
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

          <div id="meld" className="scroll-mt-24">
            <ExamSection exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["CH_BK_03"]}>
              <CollapsibleSubsection title="MELD & MELD-Na — Components and Significance">
                <p className="text-muted-foreground leading-relaxed mb-3">
                  The Model for End-stage Liver Disease (MELD) score is a validated prognostic score predicting 3-month mortality in end-stage liver disease; it was derived to predict survival after TIPSS and is now used for organ allocation and preoperative risk stratification<InlineRef topicId="hepatobiliary-transplant" refLabel="MELD Kamath 2001" />.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside mb-3">
                  <li><strong>Components</strong>: serum bilirubin, serum creatinine, and INR (logarithmic formula; values &lt;1.0 are rounded up to 1.0, creatinine capped at 4 mg/dL or if on dialysis)</li>
                  <li><strong>Interpretation</strong>: score 6–40; rising score tracks 3-month mortality (roughly &lt;2% at MELD &lt;10 vs &gt;50% at MELD &gt;30)</li>
                  <li><strong>MELD-Na</strong>: serum sodium is now incorporated because hyponatraemia independently predicts waiting-list mortality, improving discrimination in patients with low MELD but refractory ascites<InlineRef topicId="hepatobiliary-transplant" refLabel="MELD-Na 2008" /></li>
                  <li><strong>Clinical use</strong>: organ allocation in many countries, listing thresholds, and preoperative risk assessment for non-transplant surgery in cirrhotics</li>
                  <li><strong>Limitations</strong>: takes no account of comorbidity, frailty, ascites, encephalopathy, varices or hepatocellular carcinoma — fitness for surgery must be judged clinically alongside the number</li>
                </ul>
                <div className="p-3 rounded-lg border border-amber-500/20 bg-amber-500/5">
                  <p className="text-xs text-amber-400 font-semibold mb-1">⚠ Exam Tip</p>
                  <p className="text-xs text-muted-foreground">
                    Remember the three original MELD variables as the &apos;liver, kidney, clotting&apos; triad — bilirubin, creatinine, INR. Child–Pugh differs by including ascites and encephalopathy (subjective) plus albumin.
                  </p>
                </div>
              </CollapsibleSubsection>
            </ExamSection>
          </div>

          <div id="tipss" className="scroll-mt-24">
            <ExamSection exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["CH_BK_03"]}>
              <CollapsibleSubsection title="Anaesthesia for TIPSS">
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Transjugular intrahepatic portosystemic shunt (TIPSS) creates a low-resistance channel between a branch of the portal vein and a hepatic vein using a covered stent, decompressing the portal system<InlineRef topicId="hepatobiliary-transplant" refLabel="AASLD TIPS 2010" />.
                </p>
                <div className="grid sm:grid-cols-2 gap-3 mb-3">
                  {[
                    { label: "Indications", value: "Refractory ascites and secondary prevention of variceal haemorrhage; salvage for uncontrolled acute variceal bleeding" },
                    { label: "Contraindications", value: "Severe heart failure (shunt increases preload → acute decompensation), severe pulmonary hypertension, active sepsis, established or recurrent hepatic encephalopathy, polycystic liver" },
                    { label: "Technique", value: "Frequently sedation/monitored anaesthesia care in the interventional radiology suite; GA with a secured airway for agitation, encephalopathy, long procedures, tense ascites or active variceal bleeding with soiling risk" },
                    { label: "Monitoring", value: "Invasive arterial pressure for haemodynamic shifts and repeated sampling; large-bore access, blood products available, temperature management in a cold radiology suite" },
                    { label: "Complications", value: "Haemorrhage (capsular perforation, haemobilia, intraperitoneal bleed), stent thrombosis or stenosis, new or worsening hepatic encephalopathy, cardiac decompensation from the acute increase in venous return" },
                    { label: "Remote-site issues", value: "Unfamiliar environment, limited assistance, radiation protection, table access restricted during imaging — bring full airway and drug kit" },
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
                    The airway is the dominant risk in emergency TIPSS for bleeding varices — assume a full stomach of blood, secure the airway before transfer to the radiology table, and anticipate encephalopathy worsening after shunt creation.
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