import { TopicTemplate } from "@/components/TopicTemplate";
import { TopicFaqs } from "@/components/TopicFaqs";
import { WorkedExample } from "@/components/WorkedExamples";
import { ExamSection } from "@/components/ExamSection";
import { ExamMappingBadges } from "@/components/ExamMappingBadges";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";
import { haematologicalDiseaseQuestions } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import { TopicTableOfContents } from "@/components/TopicTableOfContents";

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
        keyPoints: ["CPOC Anaemia 2023", "NATA 2017", "NICE NG24", "AAGBI PBM 2016", "BSH Platelets 2017", "AAGBI Regional 2013", "NICE NG141", "POISE-3 TXA 2022", "BJA Educ Haem 2020"],
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
                  <li>Iron deficiency: oral iron (ferrous sulphate 200 mg od/alt-day) first-line if surgery is &gt;6 weeks away; otherwise <strong>IV iron</strong> (ferric carboxymaltose up to 1000 mg or ferric derisomaltose up to 20 mg/kg) — single dose, response in 1–2 weeks</li>
                  <li>Treat B12/folate deficiency, refer for GI evaluation in unexplained IDA</li>
                  <li>Consider erythropoiesis-stimulating agents in selected renal/chemotherapy-related anaemia (specialist input)</li>
                  <li>Do <strong>not</strong> transfuse to "top up" preoperatively — outcomes are worse than treating the underlying cause</li>
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
