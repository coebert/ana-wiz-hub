import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { ExamSection } from "@/components/exam/ExamSection";
import { ExamMappingBadges } from "@/components/exam/ExamMappingBadges";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { haematologicalDiseaseQuestions } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import { TopicTableOfContents } from "@/components/layout/TopicTableOfContents";
import InlineRef from "@/components/references/InlineRef";

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
  { id: "section-vwd", label: "Von Willebrand Disease", group: "Core" },
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
  ["What HbS target is needed before major surgery in sickle cell disease?", "A simple top-up transfusion to Hb ~100 g/L is usually sufficient for most surgery and is as effective as exchange transfusion at preventing perioperative complications. Exchange transfusion to reduce HbS% to below ~30% is reserved for high-risk surgery (bypass, neurosurgery) or patients with a history of severe crises, and avoids the hyperviscosity risk of simple top-up in patients with an already-high baseline Hb."],
  ["When is desmopressin useful in a bleeding disorder and when is it not?", "Desmopressin 0.3 microgram/kg IV releases stored factor VIII and von Willebrand factor, making it useful in mild haemophilia A and type 1 von Willebrand disease, as well as uraemic or aspirin-induced platelet dysfunction. It is ineffective in haemophilia B (no effect on factor IX) and type 3 VWD (no VWF stores to release), and should be used cautiously in type 2B VWD (may worsen thrombocytopenia)."],
  ["How long should a DOAC be omitted before neuraxial anaesthesia?", "Intervals depend on the drug and renal function: apixaban/rivaroxaban/edoxaban are typically omitted for 48 hours before a high bleeding-risk procedure or neuraxial block (longer if CrCl 30–50 mL/min), while dabigatran requires 48–96 hours depending on creatinine clearance and is avoided below CrCl 30 mL/min. Catheters are removed only once the same interval has elapsed since the last dose, and the next dose is delayed for several hours after removal."],
  ["What blood products must be irradiated, and why?", "Irradiated cellular blood products prevent transfusion-associated graft-versus-host disease from viable donor lymphocytes. They are mandatory for stem cell transplant recipients, granulocyte transfusions, intrauterine/neonatal exchange transfusion, directed donations from blood relatives, patients treated with purine analogues (fludarabine, cladribine, bendamustine), and Hodgkin lymphoma patients."],
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
                <h3 className="font-semibold text-foreground mb-2">Tranexamic Acid: Risks and Safe Use</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><strong>Seizure risk:</strong> TXA is a competitive antagonist at glycine and GABA-A receptors; risk rises with high dose, cardiac surgery (especially open-chamber/on-pump procedures) and renal impairment where clearance is reduced — dose-reduce in renal failure. New myoclonus or seizure requires drug review and supportive management (<InlineRef topicId="haematological-disease" refLabel="Lecker TXA Seizures 2016" />).</li>
                  <li><strong>Thrombotic risk:</strong> POISE-3 showed less bleeding with TXA but did not establish non-inferiority for the composite cardiovascular outcome, so a documented risk/benefit judgement is still needed in patients with a recent thrombotic event (<InlineRef topicId="haematological-disease" refLabel="POISE-3 TXA 2022" />).</li>
                  <li><strong>Anaphylaxis:</strong> rare but reported — treat as any drug hypersensitivity reaction.</li>
                  <li><strong>Hypotension:</strong> can occur with rapid intravenous bolus — give over at least 10 minutes.</li>
                  <li><strong>Wrong-route error:</strong> inadvertent intrathecal administration (ampoule confusion with bupivacaine) causes refractory seizures, ventricular arrhythmia and high mortality — store TXA separately from local anaesthetics, label ampoules/syringes distinctly, and perform a read-back check of the drug name before any neuraxial injection.</li>
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
                  <li><strong>For the bleeding patient tonight:</strong> platelet-sparing second-line ITP agents (below) are <em>not</em> fast-acting enough — mainstays remain IVIg 1 g/kg (onset 24–48 h), high-dose corticosteroids, and platelet transfusion given <em>during</em> rather than before surgery to avoid consumption by circulating antiplatelet antibodies <InlineRef topicId="haematological-disease" refLabel="ASH ITP 2019" /> <InlineRef topicId="haematological-disease" refLabel="BSH Platelets 2017" /></li>
                  <li><strong>Second-line agents for chronic ITP (planned/semi-elective surgery only):</strong> thrombopoietin (TPO) receptor agonists — eltrombopag (oral, 25–75 mg daily, taken away from food and calcium-containing products, requires hepatotoxicity monitoring) and romiplostim (weekly subcutaneous injection, 1–10 mcg/kg) — stimulate megakaryopoiesis to raise the platelet count and avoid the alloimmunisation and refractoriness risks of repeated platelet transfusion; other second-line options include rituximab, splenectomy, and fostamatinib where available <InlineRef topicId="haematological-disease" refLabel="ASH ITP 2019" /></li>
                  <li><strong>Timing:</strong> TPO agonists have a typical onset of 1–2 weeks with peak effect at 2–4 weeks, so they are only suitable when surgery can be planned or is semi-elective/urgent rather than immediate; specialist haematology input is required, TPO agonists carry a thrombotic risk if the platelet count overshoots, and dosing should be timed so the count peaks on the day of surgery</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Von Willebrand Disease */}
          <section id="section-vwd" className="scroll-mt-24">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Von Willebrand Disease</h2>
            <ExamMappingBadges exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_05"]} />
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Definition &amp; Epidemiology</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Deficiency or dysfunction of von Willebrand factor (VWF), a large multimeric glycoprotein that mediates platelet adhesion to subendothelial collagen at sites of vascular injury and carries and stabilises factor VIII, protecting it from proteolysis in plasma <InlineRef topicId="haematological-disease" refLabel="UKHCDO vWD 2014" /></li>
                  <li>The most common inherited bleeding disorder, affecting up to 1% of the population, though only around 0.01% are clinically symptomatic; usually inherited in an autosomal dominant pattern <InlineRef topicId="haematological-disease" refLabel="BJA Educ vWD 2018" /></li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Classification &amp; Treatment Implications</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><strong>Type 1</strong> (70–80% of cases): partial quantitative deficiency of VWF; usually mild and DDAVP-responsive</li>
                  <li><strong>Type 2</strong> (subtypes 2A, 2B, 2M, 2N): qualitative defects in VWF function; DDAVP is generally ineffective and is relatively contraindicated in type 2B, where it can worsen thrombocytopenia by releasing dysfunctional high-molecular-weight multimers that bind platelets and are cleared</li>
                  <li><strong>Type 3</strong>: near-complete absence of VWF; severe bleeding phenotype requiring factor concentrate rather than DDAVP <InlineRef topicId="haematological-disease" refLabel="UKHCDO vWD 2014" /></li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Presentation</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Mucocutaneous bleeding, menorrhagia, epistaxis, easy bruising, and post-operative or post-partum haemorrhage</li>
                  <li>A normal APTT does <strong>not</strong> exclude von Willebrand disease <InlineRef topicId="haematological-disease" refLabel="BJA Educ vWD 2018" /></li>
                </ul>
              </div>

              <div className="bg-card border-2 border-clinical/40 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Anaesthetic Management</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Early pre-operative haematology consultation with subtype confirmation and, where relevant, a documented prior DDAVP trial response</li>
                  <li><strong>DDAVP (desmopressin):</strong> 0.3 mcg/kg IV over 30 minutes, given about 30–60 minutes before surgery, for DDAVP-responsive type 1 disease; tachyphylaxis occurs after repeated doses, and hyponatraemia is a risk — restrict free water, avoid in the elderly and in cardiac disease, and use with caution in children under 2 years <InlineRef topicId="haematological-disease" refLabel="UKHCDO vWD 2014" /></li>
                  <li><strong>Factor replacement:</strong> VWF-containing factor VIII concentrate (e.g. Haemate P/Voncento) or recombinant VWF for type 2, type 3, or major surgery, dosed in VWF:RCo units to target levels of about 100 IU/dL for major surgery and 50 IU/dL for minor surgery, maintained for several days post-operatively <InlineRef topicId="haematological-disease" refLabel="UKHCDO vWD 2014" /></li>
                  <li><strong>Tranexamic acid</strong> 1 g IV 8-hourly (or oral/topical) as an adjunct, particularly valuable for mucosal surgery</li>
                  <li>Avoid NSAIDs, aspirin, and intramuscular injections</li>
                  <li>Neuraxial and deep blocks only after correction of the defect and discussion with haematology</li>
                  <li>Monitor VWF and factor VIII levels post-operatively — the physiological peripartum rise in VWF falls rapidly after delivery, risking delayed post-partum haemorrhage <InlineRef topicId="haematological-disease" refLabel="BJA Educ vWD 2018" /></li>
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

          {/* Haemoglobinopathies */}
          <section id="section-haemoglobinopathies" className="scroll-mt-24">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Haemoglobinopathies</h2>
            <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_05"]} />
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <div className="bg-card border-2 border-clinical/40 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Sickle Cell Disease</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><strong>Pathophysiology:</strong> HbS polymerises on deoxygenation, deforming erythrocytes into a rigid sickle shape that occludes the microvasculature — the "five H" triggers to actively avoid are <strong>H</strong>ypoxia, <strong>H</strong>ypothermia, <strong>H</strong>acidosis (acidosis), de<strong>H</strong>ydration and venous st<strong>a</strong>sis (plus pain/stress and infection)</li>
                  <li><strong>Perioperative avoidance strategy:</strong> supplemental O₂ throughout (aim SpO₂ ≥95–98%), active warming and warmed fluids, avoid tourniquets where possible (see debate below), maintain euvolaemia with generous IV fluids, avoid prolonged fasting, avoid vasoconstrictors/positioning that impair venous return, treat pain and anxiety early, avoid acidosis (adequate ventilation, avoid hypercapnia)</li>
                  <li><strong>Preoperative transfusion:</strong> for major/intermediate-risk surgery, a simple top-up transfusion targeting Hb ~100 g/L is as effective as aggressive exchange transfusion at preventing perioperative sickle complications (TAPS trial) and is preferred for most surgery; exchange transfusion (manual or automated) to reduce HbS% to &lt;30% (some centres &lt;20–30%) is reserved for high-risk surgery (cardiopulmonary bypass, neurosurgery, prior severe crises) or when Hb is already high (avoid hyperviscosity from simple transfusion)</li>
                  <li><strong>Acute chest syndrome:</strong> new pulmonary infiltrate plus one of fever, chest pain, tachypnoea, or hypoxia — treat with high-flow O₂, incentive spirometry, empirical antibiotics (cover atypicals), analgesia titrated to avoid respiratory depression, exchange transfusion for hypoxia or rapid deterioration, escalate to critical care early; a leading cause of death in SCD</li>
                  <li><strong>Vaso-occlusive crisis:</strong> aggressive IV fluids, high-flow O₂ if hypoxic, early strong opioid analgesia (avoid pethidine — accumulation risk of norpethidine seizures), warmth, treat any precipitant (infection, dehydration, cold exposure)</li>
                  <li><strong>Tourniquet debate:</strong> tourniquets induce local hypoxia, acidosis and stasis distal to the cuff and are traditionally avoided in SCD; however case series and some genotypes (particularly HbSC) tolerate tourniquets with adequate limb exsanguination, optimisation of HbS% and minimising inflation time — decision should be individualised with haematology input, and tourniquets are generally avoided unless essential for the surgical field</li>
                  <li>Regional anaesthesia is not contraindicated and may reduce stress-related sickling; avoid excessive vasoconstrictor-containing local anaesthetic solutions and maintain warmth of the limb</li>
                  <li>HbSC and HbS-β-thalassaemia genotypes are milder than HbSS but still require the same precautions</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Thalassaemia</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><strong>β-thalassaemia major:</strong> transfusion-dependent from infancy, resulting in chronic iron overload despite iron chelation (desferrioxamine, deferiprone, deferasirox)</li>
                  <li><strong>Cardiac disease:</strong> iron deposition causes dilated cardiomyopathy, arrhythmias and pulmonary hypertension — the leading cause of death; obtain ECG, echocardiography (and cardiac MRI T2* if available) preoperatively in any transfusion-dependent patient</li>
                  <li><strong>Endocrinopathy:</strong> iron deposition in pituitary, pancreas and thyroid causes diabetes, hypothyroidism, hypoparathyroidism and growth/pubertal delay — check glucose and endocrine function preoperatively</li>
                  <li><strong>Difficult airway:</strong> extramedullary haematopoiesis causes maxillary and frontal bone overgrowth ("chipmunk facies"), maxillary protrusion and dental malocclusion — anticipate a difficult laryngoscopy/mask fit and have airway adjuncts and videolaryngoscopy available</li>
                  <li><strong>Hepatosplenomegaly</strong> from extramedullary haematopoiesis and iron deposition — risk of splenic rupture, altered drug metabolism, and coagulopathy from hepatic iron overload/cirrhosis</li>
                  <li>Continue iron chelation; check ferritin and organ function; transfuse to pre-op Hb targets set by the patient's haematologist (typically maintaining pre-transfusion Hb &gt;90–100 g/L in transfusion-dependent disease)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Inherited bleeding disorders */}
          <section id="section-bleeding-disorders" className="scroll-mt-24">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Inherited Bleeding Disorders</h2>
            <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_05"]} />
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Haemophilia A &amp; B</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>X-linked recessive deficiency of factor VIII (haemophilia A) or factor IX (haemophilia B/Christmas disease); severity by baseline factor level — severe &lt;1 IU/dL, moderate 1–5 IU/dL, mild &gt;5–40 IU/dL</li>
                  <li><strong>Factor replacement targets by procedure</strong> (peak level immediately pre-procedure, then maintained for the stated duration): minor procedures/dental extraction 50 IU/dL; major surgery 80–100 IU/dL pre-op, maintained &gt;50 IU/dL for 7–14 days post-op depending on bleeding risk; trough levels checked daily post-op to guide ongoing dosing</li>
                  <li><strong>Desmopressin (DDAVP) 0.3 microgram/kg</strong> IV (over 20–30 minutes, diluted in 50–100 mL saline) or intranasally — releases stored endogenous factor VIII and von Willebrand factor, useful in <em>mild haemophilia A</em> (2–3× rise in FVIII) but ineffective in haemophilia B (no effect on factor IX); tachyphylaxis after repeated doses (usually within 24–48 h); watch for hyponatraemia/fluid retention — restrict free fluids for 24 h after dosing, especially in children and the elderly</li>
                  <li><strong>Avoid intramuscular injections</strong> and other invasive procedures without prior factor correction; avoid NSAIDs and aspirin</li>
                  <li><strong>Neuraxial anaesthesia:</strong> only after haematology input and factor correction to normal levels (typically &gt;80–100 IU/dL) immediately before block and catheter removal, with ongoing cover for the duration of the catheter — generally avoided unless factor levels can be reliably normalised</li>
                  <li><strong>Inhibitors:</strong> alloantibodies against factor VIII/IX develop in up to 25–30% of severe haemophilia A patients, causing resistance to standard factor replacement — manage with bypassing agents (recombinant activated factor VII, or activated prothrombin complex concentrate/FEIBA) and always involve a haemophilia centre; emicizumab (a bispecific antibody mimicking FVIII) is used for prophylaxis in haemophilia A with or without inhibitors but does not treat acute bleeding — do not use FEIBA concurrently with emicizumab except under specialist guidance (thrombotic microangiopathy risk)</li>
                  <li>All haemophilia patients undergoing surgery should be managed jointly with a Haemophilia Comprehensive Care Centre; tranexamic acid is a useful adjunct for mucosal bleeding (dental, ENT) alongside factor replacement</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Von Willebrand Disease (VWD)</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Commonest inherited bleeding disorder — quantitative or qualitative deficiency of von Willebrand factor (VWF), which mediates platelet adhesion and stabilises factor VIII</li>
                  <li><strong>Type 1</strong> (~70–80%): partial quantitative deficiency, usually mild — often responds well to desmopressin 0.3 microgram/kg</li>
                  <li><strong>Type 2</strong> (2A, 2B, 2M, 2N): qualitative functional defects — desmopressin response variable and type 2B is a relative contraindication (releases dysfunctional VWF that binds platelets, worsening thrombocytopenia); type 2N mimics mild haemophilia A (low FVIII, normal VWF antigen)</li>
                  <li><strong>Type 3</strong>: severe, near-total VWF deficiency with markedly low FVIII — desmopressin ineffective; requires VWF-containing factor concentrate for all significant procedures</li>
                  <li><strong>Treatment options:</strong> desmopressin (type 1 mainly), plasma-derived or recombinant VWF concentrate (dosed by VWF:RCo activity, target &gt;100 IU/dL pre-op major surgery, maintained &gt;50 IU/dL for 7–10 days), tranexamic acid for mucosal bleeding, combined oral contraceptives for menorrhagia</li>
                  <li>Check FVIII, VWF antigen and VWF activity (ristocetin cofactor) pre- and post-desmopressin/concentrate to confirm adequate haemostatic correction before surgery</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Acquired coagulopathy and platelet disorders */}
          <section id="section-acquired-coagulopathy" className="scroll-mt-24">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Acquired Coagulopathy &amp; Platelet Disorders</h2>
            <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_05"]} />
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Immune Thrombocytopenia (ITP)</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Autoantibody-mediated platelet destruction and impaired production; diagnosis of exclusion (normal film aside from low platelets, no other cytopenias)</li>
                  <li>First-line for symptomatic/pre-procedure bleeding risk: corticosteroids (prednisolone 1 mg/kg) ± IV immunoglobulin 1 g/kg (rapid rise over 24–48 h, useful before urgent surgery); tranexamic acid for mucosal bleeding</li>
                  <li>Platelet transfusion reserved for active major bleeding or immediately pre-procedure in refractory cases — platelets are consumed rapidly and give only a transient rise, but are still indicated as a bridge alongside IVIG/steroids when the count is critically low and bleeding risk is high</li>
                  <li>Splenectomy or thrombopoietin-receptor agonists (eltrombopag, romiplostim) for chronic refractory ITP — specialist-led</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Drug-Induced &amp; Uraemic Platelet Dysfunction</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><strong>Drug-induced thrombocytopenia:</strong> heparin (HIT — see Thrombocytopenia section), vancomycin, quinine, some antiepileptics; stop the causative drug and monitor recovery</li>
                  <li><strong>Uraemic platelet dysfunction:</strong> chronic kidney disease impairs platelet adhesion/aggregation (normal count, prolonged bleeding time) via uraemic toxins and altered VWF function — optimise with dialysis, correct anaemia to Hb &gt;100 g/L (improves rheology and platelet margination), desmopressin 0.3 microgram/kg before invasive procedures (effect lasts ~4–8 h, tachyphylaxis with repeat dosing), cryoprecipitate or conjugated oestrogens for refractory bleeding</li>
                </ul>
              </div>

              <div className="bg-card border-2 border-clinical/40 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Disseminated Intravascular Coagulation (DIC)</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Systemic activation of coagulation (sepsis, trauma, obstetric catastrophe, malignancy, transfusion reaction) consumes platelets and clotting factors while simultaneously depositing microvascular fibrin — causes concurrent bleeding <em>and</em> thrombosis/organ ischaemia</li>
                  <li>Diagnosis: prolonged PT/APTT, low fibrinogen, thrombocytopenia, markedly raised D-dimer, schistocytes on film; ISTH DIC score aids formal diagnosis</li>
                  <li><strong>Treat the underlying cause</strong> — this is the only definitive treatment; supportive component therapy for active bleeding: FFP for prolonged PT/APTT, cryoprecipitate to keep fibrinogen &gt;1.5–2 g/L, platelets to keep count &gt;50 ×10⁹/L (&gt;20–30 ×10⁹/L if not actively bleeding but high risk), guided by viscoelastic testing where available</li>
                  <li>Avoid tranexamic acid in DIC with a dominant thrombotic phenotype unless bleeding is life-threatening and hyperfibrinolysis is confirmed (risk of worsening organ thrombosis)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Thrombophilia and anticoagulation */}
          <section id="section-thrombophilia-anticoag" className="scroll-mt-24">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Thrombophilia &amp; Perioperative Anticoagulation</h2>
            <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_05"]} />
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Thrombophilia &amp; Antiphospholipid Syndrome</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Inherited thrombophilias (Factor V Leiden, prothrombin G20210A, protein C/S or antithrombin deficiency) increase VTE risk — assess as part of routine perioperative VTE risk stratification rather than mandating a change in anaesthetic technique per se</li>
                  <li><strong>Antiphospholipid syndrome (APS):</strong> lupus anticoagulant, anticardiolipin or anti-β2-glycoprotein-I antibodies causing recurrent arterial/venous thrombosis and/or pregnancy morbidity; lupus anticoagulant paradoxically prolongs the APTT in vitro despite being prothrombotic in vivo — do not mistake for a bleeding tendency</li>
                  <li>High-risk APS patients on long-term warfarin generally require bridging with therapeutic LMWH perioperatively (see below) given very high thrombosis recurrence risk; involve hematology/rheumatology early</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">VTE Risk Assessment &amp; Bridging</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>All surgical patients require VTE risk assessment on admission (Department of Health / NICE tool) balancing thrombosis risk against bleeding risk, guiding mechanical (compression stockings, intermittent pneumatic compression) and pharmacological (LMWH) prophylaxis</li>
                  <li><strong>Bridging anticoagulation</strong> (therapeutic LMWH while warfarin is stopped) is reserved for high thrombotic risk: mechanical mitral valve, AF with high CHA₂DS₂-VASc plus recent stroke/TIA, or VTE within the last 3 months — most patients (e.g. AF alone, bioprosthetic valve) do <strong>not</strong> need bridging (BRIDGE trial: bridging increases bleeding without reducing thromboembolism in most AF patients)</li>
                  <li>Stop bridging LMWH ≥24 h (therapeutic dose) before surgery; restart post-op once haemostasis secure, usually 24–72 h depending on bleeding risk</li>
                </ul>
              </div>

              <div className="bg-card border-2 border-clinical/40 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-3">DOAC Omission Intervals &amp; Reversal</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-semibold text-foreground">Omission before elective surgery/neuraxial block (last dose to procedure):</p>
                    <ul className="list-disc list-inside space-y-1 mt-1">
                      <li><strong>Dabigatran</strong> (renally cleared — most affected by renal function): CrCl &gt;80 mL/min — omit 48 h (low bleeding risk 24 h); CrCl 50–80 — omit 72 h; CrCl 30–50 — omit 96 h; avoid if CrCl &lt;30</li>
                      <li><strong>Apixaban / rivaroxaban / edoxaban</strong> (normal renal function): omit 48 h before high bleeding-risk surgery/neuraxial block, 24 h before low bleeding-risk procedures; extend by 24–48 h if CrCl 30–50 mL/min; specialist advice if CrCl &lt;30 mL/min</li>
                      <li>Longer intervals throughout for neuraxial block/catheter removal than for general surgical bleeding risk, per AAGBI/ESRA regional anaesthesia guidance</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Reversal agents (life-threatening bleeding or emergency surgery):</p>
                    <ul className="list-disc list-inside space-y-1 mt-1">
                      <li><strong>Idarucizumab</strong> (dabigatran-specific monoclonal antibody fragment): 5 g IV (two 2.5 g/50 mL vials given consecutively or together) — immediate, complete reversal</li>
                      <li><strong>Andexanet alfa</strong> (factor Xa decoy, reverses apixaban/rivaroxaban): weight/dose/timing-based low-dose (400 mg bolus + 480 mg infusion) or high-dose (800 mg bolus + 960 mg infusion) regimen depending on agent, dose and time since last dose — limited availability, thrombotic events reported</li>
                      <li><strong>Prothrombin complex concentrate (PCC, e.g. Beriplex/Octaplex)</strong> — used where a Xa-inhibitor-specific reversal agent is unavailable: 25–50 IU/kg IV (up to 50 IU/kg for life-threatening bleeding) as a non-specific pro-haemostatic agent for DOAC-associated major bleeding</li>
                      <li>Activated charcoal if within 2 h of ingestion (overdose) and airway protected; haemodialysis can remove dabigatral (low protein binding) but not the factor Xa inhibitors (highly protein-bound)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Warfarin reversal:</p>
                    <ul className="list-disc list-inside space-y-1 mt-1">
                      <li><strong>Major/life-threatening bleeding or emergency surgery:</strong> stop warfarin, give PCC 25–50 IU/kg (dosed by baseline INR/product) for immediate reversal, plus vitamin K 5 mg IV (slow) for sustained effect (onset ~6 h, full effect 24 h) — FFP only if PCC unavailable (slower, larger volume, less effective)</li>
                      <li><strong>Elective surgery:</strong> stop warfarin 5 days pre-op, check INR the day before (target &lt;1.5); vitamin K 1–5 mg oral if INR remains elevated the day before surgery</li>
                      <li><strong>Urgent surgery within 5 days:</strong> vitamin K 1–5 mg IV/oral ± low-dose PCC depending on urgency and INR</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Timing of neuraxial blockade against antithrombotics (AAGBI Regional 2013):</p>
                    <ul className="list-disc list-inside space-y-1 mt-1">
                      <li><strong>Unfractionated heparin (prophylactic SC):</strong> 4–6 h before/after block; therapeutic IV: 4 h before, APTT normal</li>
                      <li><strong>LMWH prophylactic:</strong> 12 h before block/catheter removal, 4 h after; <strong>LMWH therapeutic:</strong> 24 h before, 4 h after</li>
                      <li><strong>Warfarin:</strong> stop, confirm INR ≤1.4 before block</li>
                      <li><strong>Aspirin:</strong> no additional precaution needed as monotherapy</li>
                      <li><strong>Clopidogrel:</strong> 7 days; <strong>prasugrel:</strong> 7 days; <strong>ticagrelor:</strong> 5 days</li>
                      <li><strong>Dabigatran/rivaroxaban/apixaban:</strong> per the renal-function-adjusted omission intervals above before block, and catheters removed only once the same interval has elapsed since the last dose, restarting only after catheter removal (typically 6 h prophylactic dose, longer for therapeutic)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Haematological malignancy */}
          <section id="section-malignancy" className="scroll-mt-24">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Haematological Malignancy &amp; Its Treatment</h2>
            <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_05"]} />
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Chemotherapy Organ Toxicities</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><strong>Anthracyclines</strong> (doxorubicin): dose-dependent, potentially irreversible cardiomyopathy — check recent echocardiogram/LVEF and cumulative dose history</li>
                  <li><strong>Bleomycin:</strong> pulmonary fibrosis — avoid high FiO₂ intraoperatively (may precipitate/worsen bleomycin lung injury); titrate to lowest SpO₂-adequate FiO₂</li>
                  <li><strong>Platinum agents (cisplatin):</strong> nephrotoxicity and peripheral neuropathy — check renal function, avoid further nephrotoxins</li>
                  <li><strong>Vincristine/vinca alkaloids:</strong> peripheral and autonomic neuropathy — document baseline neurology before regional blocks</li>
                  <li><strong>Cyclophosphamide:</strong> haemorrhagic cystitis, myelosuppression, cardiotoxicity at high dose</li>
                  <li>Myelosuppression from most cytotoxics causes neutropenia, thrombocytopenia and anaemia — see relevant sections above</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Hyperviscosity Syndrome</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Seen with Waldenström macroglobulinaemia (IgM paraprotein), multiple myeloma, or extreme leucocytosis/polycythaemia — presents with visual disturbance, headache, mucosal bleeding, confusion and heart failure</li>
                  <li>Avoid rapid red cell transfusion (worsens viscosity) until treated; urgent plasmapheresis for symptomatic paraproteinaemia, or leukapheresis for hyperleukocytosis (blast count &gt;100 ×10⁹/L) prior to chemotherapy</li>
                  <li>Maintain hydration; avoid diuretics that concentrate blood further</li>
                </ul>
              </div>

              <div className="bg-card border-2 border-clinical/40 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Tumour Lysis Syndrome</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Massive release of intracellular contents after rapid tumour cell death (spontaneous or post-chemotherapy) in high-turnover malignancies (Burkitt lymphoma, ALL, bulky/high-grade disease)</li>
                  <li><strong>Cairo–Bishop metabolic criteria (any two within 3 days before to 7 days after treatment):</strong> uric acid ≥476 µmol/L or 25% rise; potassium ≥6.0 mmol/L or 25% rise; phosphate ≥1.45 mmol/L (adult) or 25% rise; corrected calcium ≤1.75 mmol/L or 25% fall</li>
                  <li><strong>Clinical TLS:</strong> metabolic criteria plus AKI, arrhythmia or seizure</li>
                  <li><strong>Prevention/treatment:</strong> aggressive IV hydration, rasburicase (recombinant urate oxidase, contraindicated in G6PD deficiency — risk of methaemoglobinaemia/haemolysis) or allopurinol for lower-risk disease, correct electrolytes, avoid potassium-containing fluids, renal replacement therapy for refractory hyperkalaemia/AKI</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Stem Cell Transplant Patients &amp; Blood Product Modification</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Peri-transplant patients are profoundly immunosuppressed with prolonged pancytopenia — apply strict neutropenic precautions (see Neutropenia section) and low threshold for empirical broad-spectrum antibiotics with any fever</li>
                  <li><strong>Graft-versus-host disease (GVHD)</strong> after allogeneic transplant affects skin, gut and liver — may cause coagulopathy (hepatic GVHD) and altered drug handling</li>
                  <li><strong>Irradiated blood products</strong> (gamma/X-irradiated, prevents transfusion-associated GVHD from donor lymphocytes) are mandatory for: allogeneic/autologous stem-cell transplant recipients (irradiated from conditioning until 6 months–2 years post-transplant depending on type), intrauterine/neonatal exchange transfusion, granulocyte transfusions, directed donations from blood relatives, patients on purine-analogue chemotherapy (fludarabine, cladribine, bendamustine) — indefinitely, and Hodgkin lymphoma at any stage</li>
                  <li><strong>CMV-negative products</strong> are indicated for CMV-seronegative pregnant women, intrauterine transfusions, CMV-seronegative transplant candidates/recipients (stem cell or solid organ) where the recipient is CMV-negative, and neonates — leucodepletion (universal in the UK) also substantially reduces CMV transmission risk, so CMV-negative <em>and</em> leucodepleted products are used together for highest-risk recipients</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Cross-References</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>For massive haemorrhage protocol activation, 1:1:1 component ratios and viscoelastic-guided resuscitation, see the Anaemia section above and the dedicated Massive Haemorrhage / Major Trauma topics</li>
                  <li>For acute transfusion reactions (febrile non-haemolytic, acute haemolytic, TRALI, TACO, anaphylactic) — recognition and immediate management (stop transfusion, maintain IV access, supportive resuscitation, return unit and samples to blood bank, report via Serious Hazards of Transfusion (SHOT)) is covered in the Transfusion Medicine / Massive Haemorrhage topics</li>
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
              'Sickle cell disease: avoid the "five H" triggers — hypoxia, hypothermia, acidosis, dehydration and stasis — and transfuse to Hb ~100 g/L (simple) or HbS <30% (exchange) before major surgery.',
              'Desmopressin 0.3 microgram/kg works in mild haemophilia A and type 1 VWD but NOT haemophilia B or type 3 VWD — check the diagnosis before relying on it.',
              'DOAC reversal: idarucizumab 5 g IV for dabigatran; andexanet alfa or PCC 25–50 IU/kg for factor Xa inhibitors when andexanet unavailable.',
              'Tumour lysis syndrome: aggressive hydration + rasburicase (avoid in G6PD deficiency) — monitor potassium, phosphate, calcium and uric acid.',
              'Stem cell transplant / immunosuppressed haematology patients require irradiated and, where indicated, CMV-negative blood products.',
            ]}
          />
          <TopicFaqs faqs={haematologicalDiseaseFaqs} />
        </ExamSection>
      }
    />
  );
};

export default HaematologicalDiseaseTopic;
