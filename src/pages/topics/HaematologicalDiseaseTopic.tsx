import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { ExamSection } from "@/components/exam/ExamSection";
import { ExamMappingBadges } from "@/components/exam/ExamMappingBadges";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { haematologicalDiseaseQuestions } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import { TopicTableOfContents } from "@/components/layout/TopicTableOfContents";

const objectives = [
  "Detect and treat preoperative anaemia (including iron-deficiency anaemia) using patient blood management principles.",
  "Apply restrictive transfusion thresholds (NICE NG24) and choose appropriate haemostatic adjuncts including tranexamic acid.",
  "Risk-stratify thrombocytopenic patients and select safe platelet thresholds for surgery and neuraxial blockade.",
  "Recognise neutropenia, plan safe anaesthesia, and manage suspected neutropenic sepsis within one hour.",
];

const keyPoints = [
  { text: "Preoperative anaemia is independently associated with increased mortality, transfusion and complications — screen ≥6 weeks before elective major surgery and treat iron deficiency first (oral if >6 weeks to surgery, IV if <6 weeks)", cites: ["CPOC Anaemia 2023", "NATA 2017"] },
  { text: "NICE NG24 restrictive threshold: transfuse stable adults at Hb <70 g/L (target 70–90 g/L); 80 g/L threshold (target 80–100 g/L) for ACS or chronic cardiovascular disease", cites: ["NICE NG24", "AAGBI PBM 2016"] },
  { text: "Platelet thresholds (BSH 2017): ≥50 ×10⁹/L for major surgery, ≥80 ×10⁹/L for neuraxial block, ≥100 ×10⁹/L for CNS/posterior-eye surgery; treat the cause, do not transfuse reflexively in ITP or TTP", cites: ["BSH Platelets 2017", "AAGBI Regional 2013"] },
  { text: "Neutropenic sepsis (neutrophils <0.5 ×10⁹/L with temperature ≥38°C or signs of sepsis) is a medical emergency — empirical piperacillin–tazobactam within 1 hour after cultures", cites: ["NICE NG141"] },
  { text: "Tranexamic acid 1 g at induction and 1 g at end of surgery reduces major bleeding in non-cardiac surgery without significant excess of vascular events (POISE-3, 2022)", cites: ["POISE-3 TXA 2022", "BJA Educ Haem 2020"] },
];

const haematologicalDiseaseWorkedExamples: WorkedExample[] = [
  {
    title: "Iron-deficient anaemia identified at pre-assessment",
    scenario: "A 72-year-old listed for elective right hemicolectomy in 5 weeks attends pre-assessment. Hb 96 g/L, MCV 72 fL, ferritin 8 µg/L, transferrin saturation 9%. What is your plan?",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Confirm iron deficiency anaemia (microcytic Hb &lt;130 g/L man / &lt;120 g/L woman with ferritin &lt;30 µg/L or TSAT &lt;20%).</li>
          <li>Investigate the cause (GI source mandatory in this age group — already being addressed by the surgical pathway).</li>
          <li>Surgery is &lt;6 weeks away → IV iron (ferric carboxymaltose 1000 mg or ferric derisomaltose up to 20 mg/kg) is preferred over oral iron (NATA 2017; CPOC 2023). Allow ≥2 weeks for Hb response.</li>
          <li>Do <strong>not</strong> transfuse to "top up" — preoperative transfusion is associated with worse outcomes and does not correct deficiency.</li>
          <li>Recheck Hb 1 week before surgery; combine with cell salvage, TXA 1 g at induction (POISE-3), and a restrictive intra-operative transfusion threshold (Hb 70 g/L).</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Giving oral iron when surgery is &lt;6 weeks — too slow.</li>
            <li>Transfusing pre-op to "optimise" anaemia: associated with infection, AKI and longer stay.</li>
            <li>Forgetting hypophosphataemia after high-dose ferric carboxymaltose — check phosphate post-op if symptomatic.</li>
          </ul>
        </div>
      </div>
    ),
    answer: "Diagnose IDA, give IV iron now, postpone if possible to allow response, intra-operative TXA + cell salvage, restrictive transfusion threshold (Hb 70 g/L).",
    cites: ["CPOC Anaemia 2023", "NATA 2017", "NICE NG24", "POISE-3 TXA 2022"],
  },
];

const tocItems = [
  { id: "section-anaemia", label: "Anaemia & Iron Deficiency", group: "Core" },
  { id: "section-thrombocytopenia", label: "Thrombocytopenia", group: "Core" },
  { id: "section-neutropenia", label: "Neutropenia", group: "Core" },
  { id: "section-haemoglobinopathies", label: "Haemoglobinopathies", group: "Advanced" },
  { id: "section-bleeding-disorders", label: "Inherited Bleeding Disorders", group: "Advanced" },
  { id: "section-acquired-coagulopathy", label: "Acquired Coagulopathy & Platelet Disorders", group: "Advanced" },
  { id: "section-thrombophilia-anticoag", label: "Thrombophilia & Perioperative Anticoagulation", group: "Advanced" },
  { id: "section-malignancy", label: "Haematological Malignancy & Its Treatment", group: "Advanced" },
];

const haematologicalDiseaseFaqs: Array<[string, string]> = [
  ["When should preoperative anaemia screening be performed?", "CPOC (2023) and NATA (2017) recommend identifying anaemia at the point of listing for major elective surgery, allowing at least 6 weeks for investigation and treatment. A full blood count, ferritin, transferrin saturation, B12, folate and renal function form the minimum panel; CRP is needed to interpret ferritin in inflammation (functional iron deficiency)."],
  ["What is the safe platelet count for spinal or epidural anaesthesia?", "AAGBI (2013) and BSH (2017) support neuraxial blockade with a platelet count ≥80 ×10⁹/L provided the count is stable and the cause of thrombocytopenia is benign. Counts of 50–80 ×10⁹/L require an explicit risk–benefit assessment; below 50 ×10⁹/L neuraxial techniques are generally avoided. Never transfuse platelets in HIT, TTP or ITP without specialist advice."],
  ["How do you manage a patient presenting for emergency surgery with severe thrombocytopenia of unknown cause?", "Discuss with haematology before transfusing. Avoid platelets in TTP/HIT (may worsen thrombosis). For life-threatening bleeding, give platelets to a target of >50 ×10⁹/L (>100 for CNS/eye), correct fibrinogen (>1.5 g/L), and consider TXA 1 g. Use general rather than neuraxial anaesthesia and minimise invasive lines where possible."],
  ["What antibiotic should be given for suspected neutropenic sepsis?", "Per NICE neutropenic-sepsis guidance, empirical piperacillin–tazobactam 4.5 g IV (or meropenem if previous resistance / β-lactam allergy with cross-reactivity assessment) within 1 hour of recognition, after blood cultures. Add vancomycin or teicoplanin only for suspected line infection, MRSA risk or severe mucositis."],
];

const HaematologicalDiseaseTopic = () => {
  return (
    <TopicTemplate
      title="Haematological Co-Existing Disease"
      subtitle="Perioperative management of anaemia (including iron-deficiency anaemia), thrombocytopenia and neutropenia"
      backPath="/perioperative"
      backLabel="Perioperative Medicine"
      accentColor="text-clinical"
      topicId="haematological-disease"
      topicTitle="Haematological Co-Existing Disease"
      workedExamples={haematologicalDiseaseWorkedExamples}
      objectives={objectives}
      keyPoints={keyPoints}
      quizQuestions={haematologicalDiseaseQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL, Exam.FFICM] },
        keyPoints: { exams: [Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        objectives: ["CPOC Anaemia 2023", "NATA 2017", "NICE NG24", "NICE NG141"],
        keyPoints: ["CPOC Anaemia 2023", "NATA 2017", "NICE NG24", "AAGBI PBM 2016", "BSH Platelets 2017", "AAGBI Regional 2013", "NICE NG141", "POISE-3 TXA 2022", "BJA Educ Haem 2020", "MHRA IV Iron 2013", "ASH HIT 2018"],
      }}
      coreConcepts={
        <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} className="scroll-mt-24">
          <p className="text-muted-foreground leading-relaxed">
            Haematological co-morbidity drives transfusion, infection and bleeding risk perioperatively. This topic
            focuses on the three highest-yield problems anaesthetists encounter: anaemia (especially iron deficiency),
            thrombocytopenia, and neutropenia — covering elective optimisation, emergency thresholds, and the relevant
            UK/European patient blood management guidance.
          </p>
          <TopicTableOfContents items={tocItems} />

          {/* Anaemia */}
          <section id="section-anaemia" className="scroll-mt-24">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Anaemia &amp; Iron Deficiency</h2>
            <ExamMappingBadges exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_05"]} />
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Definition &amp; Why It Matters</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>WHO: Hb &lt;130 g/L (men), &lt;120 g/L (non-pregnant women), &lt;110 g/L (pregnancy)</li>
                  <li>Present in 30–40% of patients listed for major surgery; independently associated with mortality, allogeneic transfusion, AKI, infection and length of stay</li>
                  <li>Iron deficiency (absolute or functional) is the commonest cause and is treatable</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Elective Pathway (CPOC 2023 / NATA 2017)</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Screen at the point of listing — allow ≥6 weeks before surgery for investigation and treatment</li>
                  <li>Minimum panel: FBC, ferritin, TSAT, B12/folate, U&amp;Es, CRP (functional iron deficiency = ferritin &lt;100 µg/L or TSAT &lt;20% with inflammation)</li>
                  <li>Iron deficiency: oral iron (ferrous sulphate 200 mg od/alt-day) first-line if surgery is &gt;6 weeks away; otherwise <strong>IV iron</strong> — single dose, response in 1–2 weeks, so give ≥2 weeks before surgery</li>
                  <li>Treat B12/folate deficiency, refer for GI evaluation in unexplained IDA</li>
                  <li>Consider erythropoiesis-stimulating agents in selected renal/chemotherapy-related anaemia (specialist input)</li>
                  <li>Do <strong>not</strong> transfuse to "top up" preoperatively — outcomes are worse than treating the underlying cause</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">IV Iron: Choice, Risks &amp; Contraindications (MHRA 2013)</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><strong>Ferric carboxymaltose:</strong> up to 1000 mg per dose (max ~20 mg/kg), infused over ≥15 minutes; can usually be given as a single dose</li>
                  <li><strong>Ferric derisomaltose (iron isomaltoside):</strong> up to 20 mg/kg as a single dose, infused over ~20–30 minutes regardless of dose size</li>
                  <li><strong>Hypersensitivity/anaphylaxis:</strong> all IV iron carries a small but real risk — give only where staff are trained to recognise and treat anaphylaxis, resuscitation facilities are immediately available, and the patient is observed for at least 30 minutes after completion of the infusion (MHRA 2013)</li>
                  <li><strong>Fishbane reaction:</strong> a non-allergic, self-limiting flushing/chest-tightness/back-pain reaction — slow or pause the infusion; does not require adrenaline or discontinuation of future IV iron</li>
                  <li><strong>Hypophosphataemia:</strong> more common and potentially more prolonged/symptomatic with ferric carboxymaltose (FGF23-mediated renal phosphate wasting) — check phosphate if bone pain, myalgia or fatigue develop post-infusion, particularly with repeated dosing</li>
                  <li><strong>Contraindications:</strong> known hypersensitivity to the product, anaemia not due to iron deficiency, evidence of iron overload or disturbances of iron utilisation, active infection/sepsis (may fuel bacterial growth), first trimester of pregnancy</li>
                  <li>Expect a haemoglobin response within 1–2 weeks — give IV iron at least 2 weeks before surgery wherever the pathway allows</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Urgent / Emergency Surgery</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Do not delay life- or limb-saving surgery for elective optimisation</li>
                  <li>Activate major haemorrhage protocol early; aim Hb ≥70 g/L (≥80 g/L with ACS / chronic cardiovascular disease) — NICE NG24</li>
                  <li>Use a 1:1:1 ratio of red cells:FFP:platelets in massive transfusion; add cryoprecipitate if fibrinogen &lt;1.5 g/L (&lt;2 g/L in obstetrics)</li>
                  <li>Give tranexamic acid 1 g IV at induction and 1 g at the end of surgery (POISE-3, 2022); within 3 hours of trauma (CRASH-2) or postpartum haemorrhage (WOMAN)</li>
                  <li>Use intra-operative cell salvage where feasible (including obstetrics and cancer surgery with leucodepletion filter)</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Intra-operative Patient Blood Management</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Maintain normothermia, normocalcaemia and pH &gt;7.2 — all support haemostasis</li>
                  <li>Avoid hypotensive episodes that drive ischaemia in anaemic patients</li>
                  <li>Use viscoelastic testing (ROTEM/TEG) to guide component therapy in major bleeding</li>
                  <li>Minimise iatrogenic blood loss (microsampling tubes, judicious phlebotomy)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Thrombocytopenia */}
          <section id="section-thrombocytopenia" className="scroll-mt-24">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Thrombocytopenia</h2>
            <ExamMappingBadges exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_05"]} />
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Assessment</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Identify the cause before transfusing: drug-induced (heparin → HIT, alcohol, chemotherapy), liver disease/hypersplenism, ITP, TTP/HUS, DIC, gestational thrombocytopenia, dilutional</li>
                  <li>Check trend, MCV, blood film, coagulation screen, fibrinogen, LDH, haptoglobin and renal function</li>
                  <li>Examine for petechiae, mucosal bleeding and splenomegaly</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Procedural Platelet Thresholds (BSH 2017 / AAGBI 2013)</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>≥20–30 ×10⁹/L: low bleeding-risk procedures (central line, paracentesis)</li>
                  <li>≥50 ×10⁹/L: most major surgery and lumbar puncture</li>
                  <li>≥80 ×10⁹/L: neuraxial (spinal/epidural) anaesthesia, including epidural catheter removal</li>
                  <li>≥100 ×10⁹/L: neurosurgery, posterior-eye surgery, cardiopulmonary bypass</li>
                  <li>For obstetric epidurals, count must be stable and trending upwards if low; obstetric haematology input if &lt;80 ×10⁹/L</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Anaesthetic Implications</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Prefer general over regional anaesthesia where count is below threshold or trajectory unclear</li>
                  <li>Avoid IM injections, nasogastric tube force, and unnecessary arterial/CVC lines; ultrasound for all vascular access</li>
                  <li>Use TXA, careful surgical haemostasis and intra-operative monitoring of platelet count in prolonged surgery</li>
                  <li><strong>Do not transfuse platelets in HIT, TTP, or chronic ITP without haematology advice</strong> — risk of thrombotic catastrophe</li>
                  <li>HIT: stop all heparin (including line flushes), switch to argatroban or fondaparinux, send HIT antibody screen</li>
                </ul>
              </div>

              <div className="bg-card border-2 border-clinical/40 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Heparin-Induced Thrombocytopenia (HIT)</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><strong>Pathophysiology:</strong> IgG antibodies form against platelet factor 4 (PF4)–heparin complexes; immune complexes cross-link and activate platelets via the FcγRIIa receptor, triggering thrombin generation and a paradoxically <em>prothrombotic</em> state despite a falling platelet count (ASH 2018)</li>
                  <li><strong>4Ts pre-test probability score</strong> — Thrombocytopenia (magnitude/pattern of fall), Timing (onset 5–10 days after heparin exposure, or &lt;24 h with recent heparin exposure in past 100 days), Thrombosis (new venous/arterial event, skin necrosis, or acute systemic reaction), oTher causes excluded: score 0–3 low probability (HIT essentially excluded, do not test), 4–5 intermediate, 6–8 high probability (send immunoassay and consider empirical non-heparin anticoagulation while awaiting results)</li>
                  <li><strong>Diagnostics:</strong> PF4–heparin immunoassay (ELISA) is sensitive but poorly specific (many false positives, especially post-cardiac surgery); confirm a positive or intermediate/high 4Ts result with a functional assay — serotonin release assay (SRA) or heparin-induced platelet activation assay (HIPA)</li>
                  <li><strong>Immediate management:</strong> stop <em>all</em> heparin exposure — unfractionated heparin, LMWH, heparin flushes and heparin-bonded catheters — and start therapeutic-dose non-heparin anticoagulation even in the absence of confirmed thrombosis (subclinical/occult thrombosis is common)</li>
                  <li><strong>Non-heparin anticoagulants:</strong> argatroban (direct thrombin inhibitor, hepatically cleared — preferred in renal failure; start ~0.5–2 microgram/kg/min, lower end in critical illness or hepatic dysfunction, titrate to APTT 1.5–3.0× baseline; falsely prolongs INR, complicating warfarin transition); bivalirudin; fondaparinux (weight-banded 5 mg &lt;50 kg / 7.5 mg 50–100 kg / 10 mg &gt;100 kg subcutaneously once daily — avoid in significant renal impairment); DOACs once platelets have recovered</li>
                  <li><strong>Platelet transfusion:</strong> avoid unless active, significant bleeding — transfusion may fuel the prothrombotic process and precipitate arterial or venous thrombosis</li>
                  <li><strong>Warfarin:</strong> defer until platelets have recovered to &gt;150 ×10⁹/L, and overlap with a therapeutic non-heparin anticoagulant for at least 5 days — starting warfarin early risks venous limb gangrene from unopposed protein C/S depletion</li>
                  <li><strong>Duration of anticoagulation:</strong> at least 4 weeks if no thrombosis identified; at least 3 months if HIT-associated thrombosis has occurred</li>
                  <li>Document a clear heparin allergy/alert on the drug chart and discharge summary — re-exposure risk persists for years</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Emergency Surgery with Severe Thrombocytopenia</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Discuss with haematology; consider IV immunoglobulin and steroids in ITP, plasma exchange in TTP</li>
                  <li>For active bleeding, target platelet count &gt;50 ×10⁹/L (or &gt;100 ×10⁹/L for CNS/eye surgery)</li>
                  <li>Correct associated coagulopathy: fibrinogen &gt;1.5 g/L, INR &lt;1.5, normothermia, ionised Ca²⁺ &gt;1.1 mmol/L</li>
                  <li>Consider DDAVP 0.3 µg/kg in uraemia or aspirin-induced platelet dysfunction</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Neutropenia */}
          <section id="section-neutropenia" className="scroll-mt-24">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Neutropenia</h2>
            <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_05"]} />
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Definitions &amp; Causes</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Mild 1.0–1.5 ×10⁹/L; moderate 0.5–1.0 ×10⁹/L; severe &lt;0.5 ×10⁹/L; profound &lt;0.1 ×10⁹/L</li>
                  <li>Commonest causes: cytotoxic chemotherapy, haematological malignancy, sepsis, drug-induced (clozapine, carbimazole, sulphasalazine), autoimmune, B12/folate deficiency, congenital</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Elective Surgery Planning</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Time elective surgery to neutrophil recovery (typically &gt;1.0 ×10⁹/L) when feasible</li>
                  <li>Discuss with oncology/haematology — chemotherapy timing, G-CSF (filgrastim) prophylaxis, antimicrobial cover</li>
                  <li>Cancel non-urgent surgery in active neutropenia unless oncologically essential</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Perioperative Conduct</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Strict aseptic technique for all invasive procedures; ultrasound-guided vascular access; full barrier precautions for central lines and neuraxial blocks</li>
                  <li>Reverse-barrier nursing where unit policy applies; minimise visitors, avoid rectal temperature probes and per-rectum drugs</li>
                  <li>Surgical antibiotic prophylaxis per local policy; treat any breach of mucocutaneous integrity aggressively</li>
                  <li>Recognise blunted inflammatory response — sepsis may present only as fever, hypotension or new organ dysfunction</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Neutropenic Sepsis — Emergency (NICE NG141)</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Definition: neutrophils ≤0.5 ×10⁹/L (or expected to fall) with temperature &gt;38°C <em>or</em> other signs of clinically significant sepsis</li>
                  <li><strong>Within 1 hour:</strong> blood cultures (peripheral and from each lumen of any indwelling line), then empirical IV piperacillin–tazobactam 4.5 g (or meropenem 1 g if previous resistance/severe penicillin allergy)</li>
                  <li>Resuscitate per Sepsis-6: O₂, IV fluids, lactate, urine output, source control</li>
                  <li>Add vancomycin/teicoplanin only for suspected line infection, MRSA risk or severe mucositis</li>
                  <li>Escalate to critical care early; admit even if initially stable for IV antibiotics and monitoring</li>
                </ul>
              </div>

              <div className="bg-card border-2 border-clinical/40 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-3">Actionable Perioperative Neutropenia Pathway</h3>

                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold text-foreground">Step 1 — Treat as neutropenic sepsis if ANY of:</p>
                    <ul className="list-disc list-inside space-y-1 mt-1">
                      <li>Neutrophils ≤0.5 ×10⁹/L (or expected to fall below within 48 h) <strong>AND</strong> temperature ≥38°C (single reading) or ≥37.5°C sustained &gt;1 h</li>
                      <li>Any neutropenic patient with rigors, hypotension (SBP &lt;90 or MAP &lt;65), tachycardia &gt;90, RR &gt;20, new confusion, mottling, oliguria, or lactate &gt;2</li>
                      <li>Neutropenic patient who is unwell <em>without</em> fever (steroids, elderly, post-op analgesia may mask pyrexia) — low threshold to treat</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-foreground">Step 2 — Investigations within 1 hour (do not delay antibiotics):</p>
                    <ul className="list-disc list-inside space-y-1 mt-1">
                      <li>Peripheral blood cultures <strong>plus</strong> separate cultures from <em>each lumen</em> of any central line / PICC / Hickman / port</li>
                      <li>FBC, U&amp;E, LFT, CRP, coagulation, lactate, venous/arterial gas, glucose</li>
                      <li>Urinalysis + MSU, sputum culture if productive, stool culture if diarrhoea, wound/line-site swabs</li>
                      <li>CXR; further imaging (CT chest/abdomen) if source unclear and patient stable</li>
                      <li>Viral PCR (respiratory, CMV) and fungal markers (β-D-glucan, galactomannan) if prolonged neutropenia &gt;7 days or recent stem-cell transplant</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-foreground">Step 3 — Empirical antibiotics within 60 min of recognition:</p>
                    <ul className="list-disc list-inside space-y-1 mt-1">
                      <li><strong>First line:</strong> piperacillin–tazobactam 4.5 g IV (NICE NG141)</li>
                      <li><strong>Severe β-lactam allergy / known resistance:</strong> meropenem 1 g IV (assess cross-reactivity first)</li>
                      <li><strong>Add vancomycin / teicoplanin</strong> only for suspected line infection, MRSA colonisation, severe mucositis, or skin/soft-tissue source</li>
                      <li><strong>Add antifungal</strong> (e.g. caspofungin) if fever persists &gt;96 h on broad-spectrum antibiotics or high-risk haematology patient</li>
                      <li>Sepsis-6 in parallel: O₂ to SpO₂ ≥94%, IV crystalloid 500 mL bolus, monitor urine output, repeat lactate at 2 h</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-foreground">Step 4 — Escalation criteria (call critical care immediately):</p>
                    <ul className="list-disc list-inside space-y-1 mt-1">
                      <li>Lactate &gt;2 mmol/L after fluid bolus, or &gt;4 mmol/L at any point</li>
                      <li>Persistent hypotension (MAP &lt;65) after 30 mL/kg crystalloid — vasopressor required</li>
                      <li>SpO₂ &lt;92% on ≥4 L O₂, RR &gt;25, or new respiratory failure</li>
                      <li>GCS drop ≥2, new confusion, or seizures</li>
                      <li>AKI (creatinine rise &gt;26 µmol/L in 48 h or urine output &lt;0.5 mL/kg/h for 6 h)</li>
                      <li>DIC, profound thrombocytopenia &lt;20 ×10⁹/L with bleeding, or new coagulopathy</li>
                      <li>NEWS2 ≥7, or any single parameter scoring 3</li>
                      <li>Failure to improve within 4–6 h of optimal therapy → ICU review for organ support, source control, antimicrobial broadening</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold text-foreground">Step 5 — Surgical decision-making:</p>
                    <ul className="list-disc list-inside space-y-1 mt-1">
                      <li><strong>Elective:</strong> postpone until neutrophils &gt;1.0 ×10⁹/L and afebrile ≥48 h</li>
                      <li><strong>Urgent (≤24 h):</strong> proceed with antibiotic cover, full barrier precautions, senior anaesthetist + surgeon, HDU/ICU bed booked</li>
                      <li><strong>Emergency:</strong> do not delay life-saving surgery — give first dose of empirical antibiotics in the anaesthetic room if not already started, take cultures intra-op, plan post-op critical care</li>
                      <li>Notify haematology/oncology of all neutropenic patients undergoing surgery; consider G-CSF post-op per local protocol</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <ExamPitfallsCallout
            accent="clinical"
            pitfalls={[
              'Iron-deficient anaemia <6 weeks before surgery: give IV iron (ferric carboxymaltose / derisomaltose) — oral iron is too slow.',
              'Restrictive transfusion threshold: Hb 70 g/L (80 g/L with ACS/chronic CVD) per NICE NG24 — do not transfuse to "normalise" Hb pre-op.',
              'Neuraxial block: platelets ≥80 ×10⁹/L (BSH 2017 / AAGBI 2013) and stable; never block in HIT/TTP.',
              'Suspected HIT: stop ALL heparin (including flushes), switch to argatroban/fondaparinux — do NOT transfuse platelets.',
              'Neutropenic sepsis: piperacillin–tazobactam within 1 hour of recognition, after cultures.',
              'POISE-3 (2022): TXA 1 g at induction + 1 g at end reduces major bleeding in non-cardiac surgery without significant excess of vascular events.',
            ]}
          />
          <TopicFaqs faqs={haematologicalDiseaseFaqs} />
        </ExamSection>
      }
    />
  );
};

export default HaematologicalDiseaseTopic;
