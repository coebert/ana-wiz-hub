import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { ExamSection } from "@/components/exam/ExamSection";
import { ExamMappingBadges } from "@/components/exam/ExamMappingBadges";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { InlineRef } from "@/components/references/InlineRef";
import { renalDiseaseQuestions } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";

const tocItems = [
  { id: "section-ckd-and-uraemic-effects", label: "CKD Staging & Uraemic Effects", group: "Core" },
  { id: "section-preoperative-assessment", label: "Preoperative Assessment & Optimisation", group: "Assessment" },
  { id: "section-pharmacology-in-renal-impairment", label: "Pharmacology in Renal Impairment", group: "Pharmacology" },
  { id: "section-intraoperative-management", label: "Intraoperative Management", group: "Management" },
  { id: "section-electrolyte-and-acid-base-emergencies", label: "Electrolyte & Acid-Base Emergencies", group: "Emergencies" },
  { id: "section-perioperative-aki", label: "Perioperative AKI", group: "Complications" },
  { id: "section-renal-transplant-recipient", label: "The Renal Transplant Recipient", group: "Special Situations" },
];

const objectives = [
  "Stage chronic kidney disease by eGFR (G1–G5) and albuminuria (A1–A3) and describe the multi-system consequences of uraemia relevant to anaesthesia.",
  "Optimise the dialysis-dependent or CKD patient before surgery, including dialysis timing, fistula protection and management of anaemia and antihypertensives.",
  "Modify anaesthetic drug choice and dosing appropriately for reduced renal clearance, including neuromuscular blockers, opioids and drugs to avoid.",
  "Plan intraoperative fluid, monitoring and regional anaesthesia strategies for patients with CKD or on renal replacement therapy.",
  "Recognise and treat hyperkalaemia and other electrolyte/acid-base emergencies using an exact stepwise drug protocol.",
  "Apply KDIGO/NICE NG148 criteria to prevent and manage perioperative acute kidney injury, and know the evidence for RRT timing.",
  "Describe the specific perioperative considerations for a patient with a functioning renal transplant.",
];

const keyPoints = [
  {
    text: "CKD is staged by eGFR (G1 ≥90, G2 60–89, G3a 45–59, G3b 30–44, G4 15–29, G5 <15 mL/min/1.73m² or dialysis) combined with albuminuria category (A1 <3, A2 3–30, A3 >30 mg/mmol) — risk of progression and cardiovascular events rises with both axes.",
    cites: ["KDIGO CKD 2024", "NICE NG203"],
  },
  {
    text: "Uraemia causes platelet dysfunction (abnormal platelet–vessel wall interaction despite normal count/coagulation screen), anaemia (reduced erythropoietin), autonomic neuropathy with labile blood pressure, accelerated atherosclerosis, renal bone disease and delayed gastric emptying — treat as 'full stomach' in advanced uraemia.",
    cites: ["BJA Educ Renal 2018"],
  },
  {
    text: "Elective dialysis patients should undergo haemodialysis the day before surgery (not the same day), aiming for a potassium <5.5 mmol/L and near-dry weight; avoid aggressive ultrafiltration immediately pre-theatre which risks hypovolaemia and hypotension.",
    cites: ["UKKA Dialysis Perioperative", "CPOC Kidney 2023"],
  },
  {
    text: "Atracurium and cisatracurium (organ-independent Hofmann elimination/ester hydrolysis) are the neuromuscular blockers of choice in renal failure; avoid morphine (active metabolite morphine-6-glucuronide accumulates) and pethidine (norpethidine accumulation causes seizures) — use fentanyl or dose-reduced oxycodone instead.",
    cites: ["BJA Educ Renal 2018"],
  },
  {
    text: "Suxamethonium raises serum potassium by ~0.5–1.0 mmol/L and is not contraindicated in stable CKD, but should be avoided if pre-existing hyperkalaemia, uraemic neuropathy or recent dialysis-related hyperkalaemia is present.",
    cites: ["BJA Educ Renal 2018"],
  },
  {
    text: "Severe hyperkalaemia is treated with a stepwise protocol: calcium chloride 10 mL 10% (or calcium gluconate 30 mL 10%) IV for cardiac membrane stabilisation, insulin 10 units in 25 g glucose (50 mL 50% or 250 mL 10%) IV, nebulised salbutamol 10–20 mg, ± sodium bicarbonate if acidotic, with definitive treatment by dialysis.",
    cites: ["UKKA Dialysis Perioperative", "BJA Educ Renal 2018"],
  },
  {
    text: "KDIGO defines AKI as creatinine rise ≥26.5 μmol/L within 48 h, or ≥1.5× baseline within 7 days, or urine output <0.5 mL/kg/h for 6 h; STARRT-AKI showed no survival benefit from accelerated RRT initiation over a watchful-waiting strategy guided by conventional indications.",
    cites: ["KDIGO AKI 2012", "STARRT-AKI 2020"],
  },
];

const workedExamples: WorkedExample[] = [
  {
    title: "Elective laparoscopic cholecystectomy in a haemodialysis-dependent patient",
    scenario:
      "A 61-year-old on thrice-weekly haemodialysis via a left brachiocephalic fistula (CKD G5D, dry weight 68 kg) is listed for elective laparoscopic cholecystectomy. Last dialysis was 3 days ago. Plan the perioperative pathway.",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>
            Liaise with renal team to arrange haemodialysis the day before surgery, aiming for near-dry weight and a post-dialysis potassium &lt;5.5 mmol/L; check same-day bloods (U&amp;E, bicarbonate, calcium, haemoglobin) before theatre.
          </li>
          <li>
            Protect the fistula: site the blood pressure cuff and IV/arterial access on the contralateral limb, pad and avoid pressure on the fistula arm during positioning, document a clear warning on the anaesthetic chart and theatre door.
          </li>
          <li>
            Optimise anaemia — check haemoglobin against ESA/iron therapy record; renal anaemia target Hb 100–120 g/L; avoid unnecessary transfusion (sensitisation risk for future transplantation) unless symptomatic or actively bleeding.
          </li>
          <li>
            Continue erythropoiesis-stimulating agent and phosphate binders as normal; hold ACE inhibitor/ARB and SGLT2 inhibitor on the day of surgery (SGLT2 inhibitors stopped 3 days prior per "sick day rules" — euglycaemic DKA/AKI risk); continue beta-blockers.
          </li>
          <li>
            Intraoperative plan: standard monitoring plus consideration of invasive arterial line for haemodynamic stability given autonomic neuropathy; balanced crystalloid in modest volumes (avoid potassium-containing solutions such as Hartmann's if potassium borderline — use 0.9% saline or a low-potassium balanced solution and titrate to losses); cisatracurium for neuromuscular blockade; fentanyl-based analgesia; avoid NSAIDs.
          </li>
          <li>
            Postoperatively plan return to the dialysis unit's normal schedule (typically next scheduled session, or earlier if fluid overloaded/hyperkalaemic); multimodal opioid-sparing analgesia with dose-reduced opioids and regular paracetamol; monitor for pneumoperitoneum-related reduction in renal perfusion.
          </li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Dialysing the same day as surgery — risks intraoperative hypotension from residual hypovolaemia and heparin-related bleeding.</li>
            <li>Using the fistula arm for cannulation or NIBP cuff — risks thrombosis of a life-sustaining access.</li>
            <li>Choosing morphine for analgesia — accumulates active metabolites and precipitates prolonged sedation/respiratory depression.</li>
            <li>Giving Hartmann's/potassium-containing fluid freely without checking recent potassium.</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "Dialyse the day before surgery to a dry weight with potassium <5.5 mmol/L, protect the fistula arm from all access/cuffs, continue ESA/phosphate binders, hold ACE inhibitor/ARB and SGLT2 inhibitor, use cisatracurium and fentanyl, avoid potassium-containing fluids and NSAIDs, and return the patient to the normal dialysis schedule postoperatively.",
    cites: ["UKKA Dialysis Perioperative", "CPOC Kidney 2023", "BJA Educ Renal 2018"],
  },
  {
    title: "Emergency laparotomy with severe hyperkalaemia",
    scenario:
      "A 74-year-old with CKD G4 presents with a perforated sigmoid diverticulum and requires emergency laparotomy. Potassium is 6.9 mmol/L with peaked T-waves and a widened QRS on the ECG. Outline immediate management before and during induction.",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>
            Continuous cardiac monitoring; treat as a medical emergency in parallel with surgical preparation — do not delay life-saving surgery, but stabilise potassium first if at all possible.
          </li>
          <li>
            Cardioprotection: <strong>calcium chloride 10 mL 10% IV</strong> (or calcium gluconate 30 mL 10% if only peripheral access) over 2–5 minutes, repeated if ECG changes persist after 5 minutes — does not lower potassium but stabilises the myocardium.
          </li>
          <li>
            Shift potassium intracellularly: <strong>insulin 10 units (Actrapid) in 25 g glucose IV</strong> (50 mL 50% glucose or 250 mL 10% glucose) over 15–30 minutes, plus <strong>nebulised salbutamol 10–20 mg</strong>; monitor capillary glucose for at least 4–6 hours after (risk of delayed hypoglycaemia).
          </li>
          <li>
            Consider sodium bicarbonate 50–100 mL 8.4% IV if significant metabolic acidosis coexists (limited efficacy in isolation but useful adjunct in mixed acidosis/hyperkalaemia).
          </li>
          <li>
            Arrange definitive removal of potassium — urgent haemodialysis if renal team/access available; if not immediately possible, proceed to surgery once temporising measures given, with continuous ECG and repeat potassium.
          </li>
          <li>
            Induction: avoid suxamethonium given the pre-existing hyperkalaemia — use a non-depolarising agent (rocuronium, with sugammadex available) for rapid sequence induction; have calcium and insulin/dextrose immediately to hand in theatre; invasive arterial monitoring before induction if time allows.
          </li>
          <li>
            Intraoperative fluids: avoid potassium-containing solutions; use balanced crystalloid without added potassium or 0.9% saline, with cautious volumes given likely coexisting AKI and sepsis; consider post-operative RRT.
          </li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Using suxamethonium for RSI in known hyperkalaemia — can precipitate cardiac arrest.</li>
            <li>Forgetting glucose monitoring after insulin/dextrose — delayed hypoglycaemia is common.</li>
            <li>Relying on bicarbonate alone as definitive treatment — it is an adjunct, not a substitute for insulin/dextrose or dialysis.</li>
            <li>Delaying a life-saving laparotomy purely to "normalise" potassium — treat in parallel, not sequentially.</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "Calcium chloride 10 mL 10% for cardioprotection, insulin 10 units in 25 g glucose plus nebulised salbutamol 10–20 mg to shift potassium intracellularly, consider bicarbonate if acidotic, arrange dialysis for definitive clearance, avoid suxamethonium (use rocuronium/sugammadex), and proceed to surgery without unnecessary delay under continuous ECG monitoring.",
    cites: ["UKKA Dialysis Perioperative", "BJA Educ Renal 2018", "KDIGO AKI 2012"],
  },
];

const renalDiseaseFaqs: Array<[string, string]> = [
  ["Why should a dialysis patient not be dialysed on the same day as surgery?", "Same-day dialysis leaves residual heparin effect and acute intravascular volume shifts that predispose to intraoperative hypotension. Dialysis the day before allows correction of potassium and fluid overload while restoring haemodynamic stability by the time of surgery."],
  ["Is suxamethonium contraindicated in chronic kidney disease?", "No — stable CKD patients with a normal baseline potassium can safely receive suxamethonium (typical rise ~0.5 mmol/L). It should be avoided if the patient is already hyperkalaemic, has uraemic neuropathy, or has missed dialysis, given the risk of a dangerous further rise."],
  ["Why is morphine avoided in advanced renal impairment?", "Morphine is metabolised to morphine-6-glucuronide (M6G), a more potent active metabolite than morphine itself, which accumulates in renal failure and can cause prolonged sedation and respiratory depression. Fentanyl (largely hepatically metabolised, inactive metabolites) or carefully titrated oxycodone are preferred."],
  ["What did STARRT-AKI show about the timing of renal replacement therapy?", "In critically ill patients with severe AKI, an accelerated strategy of RRT initiation conferred no mortality benefit over a standard, watchful-waiting strategy that initiated RRT only for conventional indications (refractory hyperkalaemia, acidosis, fluid overload, or lack of recovery), and was associated with more RRT-related adverse events."],
];

const RenalDiseaseTopic = () => {
  return (
    <TopicTemplate
      title="Renal Co-Existing Disease"
      subtitle="Anaesthesia for the patient with chronic kidney disease or dialysis dependence"
      backPath="/perioperative"
      backLabel="Perioperative Medicine"
      accentColor="text-clinical"
      topicId="renal-disease"
      topicTitle="Renal Co-Existing Disease"
      workedExamples={workedExamples}
      objectives={objectives}
      keyPoints={keyPoints}
      quizQuestions={renalDiseaseQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM], curriculumCodes: ["PO_BK_06"] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        objectives: ["KDIGO CKD 2024", "NICE NG203", "BJA Educ Renal 2018", "UKKA Dialysis Perioperative", "CPOC Kidney 2023", "KDIGO AKI 2012", "STARRT-AKI 2020"],
        workedExamples: ["UKKA Dialysis Perioperative", "CPOC Kidney 2023", "BJA Educ Renal 2018", "KDIGO AKI 2012"],
        keyPoints: ["KDIGO CKD 2024", "NICE NG203", "BJA Educ Renal 2018", "UKKA Dialysis Perioperative", "CPOC Kidney 2023", "KDIGO AKI 2012", "STARRT-AKI 2020"],
      }}
      coreConcepts={
        <ExamSection exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} className="scroll-mt-24">
          <div className="space-y-8">
            <p className="text-muted-foreground leading-relaxed">
              Chronic kidney disease is common in the surgical population and its severity — not merely its presence — drives perioperative risk through anaemia, cardiovascular disease, electrolyte instability and altered drug handling. This topic covers CKD staging and uraemic physiology, preoperative optimisation of the dialysis-dependent patient, renal-adjusted pharmacology, intraoperative management, electrolyte/acid-base emergencies, perioperative acute kidney injury, and the specific needs of the renal transplant recipient.
            </p>

            {/* CKD staging and uraemic effects */}
            <section id="section-ckd-and-uraemic-effects" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">CKD Staging & Uraemic Multi-System Effects</h2>
              <ExamMappingBadges exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_06"]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">KDIGO/NICE CKD Classification</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>eGFR categories</strong>: G1 ≥90, G2 60–89, G3a 45–59, G3b 30–44, G4 15–29, G5 &lt;15 mL/min/1.73m² (or established renal replacement therapy) <InlineRef topicId="renal-disease" refLabel="KDIGO CKD 2024" />.</li>
                    <li><strong>Albuminuria categories</strong> (ACR): A1 &lt;3 mg/mmol, A2 3–30 mg/mmol, A3 &gt;30 mg/mmol.</li>
                    <li>CKD is defined as abnormalities of kidney structure or function present for &gt;3 months; combining eGFR and albuminuria categories on a "heat-map" predicts progression and cardiovascular mortality risk <InlineRef topicId="renal-disease" refLabel="NICE NG203" />.</li>
                    <li>Prevalence in the surgical population is high and frequently unrecognised — routine preoperative U&amp;E should prompt eGFR calculation in at-risk groups (diabetes, hypertension, age &gt;60, vascular disease).</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Uraemic Multi-System Effects</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Anaemia</strong>: reduced erythropoietin production plus iron-restricted erythropoiesis; target Hb 100–120 g/L on ESA therapy — over-correction increases thrombotic and cardiovascular risk.</li>
                    <li><strong>Platelet dysfunction</strong>: uraemic toxins impair platelet–vessel wall adhesion (abnormal bleeding time) despite a normal platelet count and standard coagulation screen; bleeding risk is clinically significant and not detected by INR/APTT.</li>
                    <li><strong>Autonomic neuropathy</strong>: blunted baroreceptor reflexes cause labile blood pressure and an exaggerated hypotensive response to induction agents, neuraxial blockade and fluid shifts.</li>
                    <li><strong>Accelerated cardiovascular disease</strong>: CKD is a coronary heart disease risk-equivalent — accelerated atherosclerosis, left ventricular hypertrophy, vascular calcification and high rates of silent ischaemia.</li>
                    <li><strong>Renal bone disease (CKD-MBD)</strong>: secondary hyperparathyroidism, hyperphosphataemia, vascular calcification and osteodystrophy — relevant to positioning (fracture risk) and airway/spine considerations.</li>
                    <li><strong>Delayed gastric emptying</strong>: autonomic neuropathy and uraemia slow gastric emptying — treat advanced CKD/dialysis patients as at increased aspiration risk and consider rapid sequence induction for emergency surgery <InlineRef topicId="renal-disease" refLabel="BJA Educ Renal 2018" />.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Preoperative assessment */}
            <section id="section-preoperative-assessment" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Preoperative Assessment & Optimisation</h2>
              <ExamMappingBadges exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_06"]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Timing of Dialysis</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Elective haemodialysis should ideally occur the <strong>day before surgery</strong>, aiming for dry (or near-dry) weight and correction of biochemistry, rather than same-day dialysis which risks residual heparinisation and volume shifts <InlineRef topicId="renal-disease" refLabel="UKKA Dialysis Perioperative" />.</li>
                    <li>Aim for a pre-theatre serum potassium <strong>&lt;5.5 mmol/L</strong> before elective surgery; recheck U&amp;E on the day of surgery.</li>
                    <li>Peritoneal dialysis patients should drain the abdomen before surgery (especially abdominal/laparoscopic procedures) and may need a temporary switch to haemodialysis or reduced dwell volumes perioperatively.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Fistula Protection</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>No blood pressure cuffs, venepuncture, cannulation or arterial lines in the fistula limb — clearly label the notes, theatre door and the limb itself.</li>
                    <li>Avoid prolonged pressure or awkward positioning of the fistula arm during surgery; check for a palpable thrill/audible bruit before and after the case.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Anaemia, Antihypertensives and Nephrotoxin Avoidance</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Continue iron and erythropoiesis-stimulating agent (ESA) therapy; correct significant anaemia before major elective surgery, avoiding unnecessary transfusion which risks HLA sensitisation and reduces future transplant compatibility.</li>
                    <li><strong>ACE inhibitors/ARBs</strong>: consider omitting on the morning of surgery for major/intermediate-risk surgery to reduce refractory intraoperative hypotension, particularly with neuraxial or general anaesthesia and significant fluid shifts.</li>
                    <li><strong>SGLT2 inhibitors</strong> ("sick day rules"): stop 3 days before major surgery (2 days for ertugliflozin/dapagliflozin per some protocols) due to the risk of euglycaemic diabetic ketoacidosis and perioperative AKI <InlineRef topicId="renal-disease" refLabel="CPOC Kidney 2023" />.</li>
                    <li>Avoid iodinated <strong>contrast</strong> and other nephrotoxins (aminoglycosides, NSAIDs) in the perioperative period in patients with residual renal function; if contrast unavoidable, ensure euvolaemia and use the lowest effective dose.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Pharmacology */}
            <section id="section-pharmacology-in-renal-impairment" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Pharmacology in Renal Impairment</h2>
              <ExamMappingBadges exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_06"]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Neuromuscular Blockade</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Atracurium and cisatracurium</strong> are preferred — Hofmann elimination and non-specific ester hydrolysis are organ-independent, giving predictable duration in renal failure.</li>
                    <li>Rocuronium and vecuronium have partial renal excretion and a prolonged duration in CKD, but are usable with monitoring and, for rocuronium, reversal with sugammadex (sugammadex-rocuronium complex is itself renally excreted, so use with caution in severe/end-stage renal failure and monitor for recurarisation).</li>
                    <li>Suxamethonium is not contraindicated in stable CKD (potassium rises ~0.5–1.0 mmol/L) but should be avoided in the presence of pre-existing hyperkalaemia.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Analgesia</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Avoid morphine</strong> — active metabolite morphine-6-glucuronide (M6G) accumulates and causes prolonged sedation/respiratory depression.</li>
                    <li><strong>Avoid pethidine</strong> — norpethidine metabolite accumulates and lowers seizure threshold.</li>
                    <li><strong>Fentanyl</strong> (hepatic metabolism, inactive metabolites) is preferred for intraoperative use; <strong>oxycodone</strong> can be used post-operatively at reduced, carefully titrated doses with extended dosing intervals.</li>
                    <li><strong>Gabapentin/pregabalin</strong> require substantial dose reduction (renally excreted unchanged) — e.g. gabapentin dose reduced according to eGFR, and given post-dialysis on dialysis days as they are dialysable.</li>
                    <li><strong>NSAIDs and ketorolac are contraindicated</strong> — inhibit prostaglandin-mediated renal autoregulation and precipitate AKI, particularly with concurrent ACE inhibitor/diuretic use ("triple whammy").</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Antibiotics and Other Agents</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Renally-cleared antibiotics (gentamicin, vancomycin, piperacillin-tazobactam) require dose or interval adjustment guided by eGFR/levels and local antimicrobial pharmacy guidance; single prophylactic doses may not need adjustment.</li>
                    <li>Sugammadex, digoxin and low-molecular-weight heparins also accumulate in renal failure and need dose review.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Intraoperative management */}
            <section id="section-intraoperative-management" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Intraoperative Management</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_06"]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Access, Monitoring and MAP Targets</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Site cannulae and NIBP cuff on the non-fistula limb; consider invasive arterial monitoring for major surgery given labile blood pressure from autonomic neuropathy.</li>
                    <li>Target MAP within the patient's own autoregulatory range, generally ≥65 mmHg and avoiding falls &gt;20% from baseline, to protect residual renal function and (if present) graft perfusion.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Fluid Choice</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Use a <strong>balanced crystalloid</strong> as first-line; if potassium is borderline or the patient is oliguric/anuric, choose a low-/no-potassium fluid (0.9% saline) rather than Hartmann's/Plasma-Lyte to avoid inadvertent potassium load.</li>
                    <li><strong>Avoid hydroxyethyl starches</strong> — associated with AKI and increased RRT requirement in critically ill and CKD populations.</li>
                    <li>Aim for euvolaemia — both hypovolaemia (further renal hypoperfusion) and fluid overload (in oliguric/anuric patients with no diuretic reserve) must be avoided; goal-directed fluid therapy is useful for major surgery.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Regional Anaesthesia and Positioning</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Regional/neuraxial techniques are attractive (avoid airway instrumentation, opioid-sparing) but assess bleeding risk from uraemic platelet dysfunction — check recent dialysis, clinical bleeding history, and consider platelet function optimisation (desmopressin 0.3 microgram/kg, or dialysis) if neuraxial block is planned and bleeding risk is a concern.</li>
                    <li>Position carefully to protect a fistula/graft limb and any pressure areas — renal bone disease increases fracture risk with positioning and padding.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Electrolyte and acid-base emergencies */}
            <section id="section-electrolyte-and-acid-base-emergencies" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Electrolyte & Acid-Base Emergencies</h2>
              <ExamMappingBadges exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_06"]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Hyperkalaemia Treatment Ladder</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>1. Cardioprotection</strong>: calcium chloride 10 mL 10% IV (central line preferred) or calcium gluconate 30 mL 10% IV peripherally, over 2–5 minutes; repeat after 5 minutes if ECG changes persist. Does not lower potassium.</li>
                    <li><strong>2. Shift potassium intracellularly</strong>: insulin 10 units (soluble/Actrapid) in 25 g glucose IV (50 mL 50% or 250 mL 10% glucose) over 15–30 minutes; nebulised salbutamol 10–20 mg (higher than the standard bronchodilator dose).</li>
                    <li><strong>3. Sodium bicarbonate</strong> 50–100 mL 8.4% IV — useful adjunct if concurrent metabolic acidosis, of limited benefit as monotherapy.</li>
                    <li><strong>4. Removal of potassium</strong>: definitive treatment is haemodialysis; loop diuretics if some residual renal function; calcium resonium is slow-acting and rarely useful acutely.</li>
                    <li>Monitor capillary glucose for at least 4–6 hours post insulin/dextrose (delayed hypoglycaemia); continuous cardiac monitoring throughout.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Metabolic Acidosis and Hypocalcaemia</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>CKD produces a high-anion-gap metabolic acidosis from reduced renal acid excretion; worsens hyperkalaemia by driving potassium extracellularly — correct acidosis as part of hyperkalaemia management in acute settings.</li>
                    <li>Hypocalcaemia (reduced 1-alpha-hydroxylation of vitamin D, hyperphosphataemia) may unmask as tetany or prolonged QT with citrated blood products or rapid correction of acidosis; treat symptomatic hypocalcaemia with calcium gluconate 10 mL 10% IV, titrated to ionised calcium.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Perioperative AKI */}
            <section id="section-perioperative-aki" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Perioperative Acute Kidney Injury</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_06"]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">KDIGO AKI Staging</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Stage 1</strong>: creatinine ↑ ≥26.5 μmol/L within 48 h, or 1.5–1.9× baseline; urine output &lt;0.5 mL/kg/h for 6–12 h.</li>
                    <li><strong>Stage 2</strong>: creatinine 2.0–2.9× baseline; urine output &lt;0.5 mL/kg/h for ≥12 h.</li>
                    <li><strong>Stage 3</strong>: creatinine ≥3× baseline, or ≥353.6 μmol/L, or initiation of RRT; urine output &lt;0.3 mL/kg/h for ≥24 h or anuria for ≥12 h <InlineRef topicId="renal-disease" refLabel="KDIGO AKI 2012" />.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">NICE NG148 Risk Factors and Prevention</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Risk factors: pre-existing CKD, age &gt;65, diabetes, heart failure, sepsis, hypovolaemia, nephrotoxin exposure, emergency/major surgery, and use of contrast media <InlineRef topicId="renal-disease" refLabel="NICE NG148" />.</li>
                    <li>Prevention: identify at-risk patients preoperatively, avoid hypovolaemia and hypotension, review/withhold nephrotoxic drugs (NSAIDs, ACE inhibitors/ARBs, aminoglycosides) perioperatively, and use goal-directed fluid therapy for major surgery <InlineRef topicId="renal-disease" refLabel="CPOC Kidney 2023" />.</li>
                    <li>Daily monitoring of creatinine and urine output postoperatively in at-risk patients enables early detection and staging.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">RRT Indications and Timing</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Classic indications: refractory hyperkalaemia, severe/refractory metabolic acidosis, fluid overload unresponsive to diuretics, uraemic complications (encephalopathy, pericarditis, bleeding), and certain toxin/drug overdoses.</li>
                    <li><strong>STARRT-AKI</strong> demonstrated no mortality benefit from an accelerated RRT-initiation strategy versus a standard, watchful strategy based on conventional indications — accelerated initiation increased RRT-related adverse events (hypotension, catheter complications) without improving 90-day mortality <InlineRef topicId="renal-disease" refLabel="STARRT-AKI 2020" />.</li>
                    <li>Practical approach: treat reversible causes and optimise fluid/electrolyte status first; reserve RRT for patients meeting conventional indications or failing to improve despite optimisation.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Renal transplant recipient */}
            <section id="section-renal-transplant-recipient" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">The Renal Transplant Recipient</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_06"]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Uninterrupted immunosuppression</strong>: continue calcineurin inhibitors (tacrolimus/ciclosporin), mycophenolate and prednisolone through the perioperative period wherever possible; if the patient cannot take oral medication, liaise with the transplant team for IV equivalents/stress-dose steroid cover and resume enteral dosing as soon as feasible.</li>
                    <li><strong>Graft perfusion</strong>: the transplanted kidney is typically denervated (no autoregulatory sympathetic response) and relies on adequate MAP for perfusion — avoid hypotension and hypovolaemia; maintain MAP ≥70–80 mmHg intraoperatively, especially for non-renal surgery under GA or neuraxial block.</li>
                    <li><strong>Avoid instrumentation/access on the graft side</strong> where a residual fistula or vascular access exists, and take care with lower abdominal/pelvic surgical positioning and retraction, as the graft usually sits in the iliac fossa (extraperitoneal).</li>
                    <li><strong>Infection risk</strong>: immunosuppression increases risk of surgical site infection, atypical/opportunistic infection and delayed wound healing — strict asepsis, consider broader-spectrum or prolonged prophylaxis per local protocol, and maintain a low threshold for early treatment of sepsis.</li>
                    <li>Continue nephrotoxin avoidance (NSAIDs, contrast, aminoglycosides) — a single kidney has no functional reserve; monitor graft function (creatinine, urine output) closely postoperatively.</li>
                  </ul>
                </div>
              </div>
            </section>

            <ExamPitfallsCallout
              exam={Exam.FINAL}
              pitfalls={[
                "Dialysing on the same day as surgery instead of the day before — leaves residual heparin effect and volume instability.",
                "Using morphine or pethidine in significant renal impairment — active metabolites accumulate.",
                "Assuming suxamethonium is absolutely contraindicated in all CKD — it is safe in stable, normokalaemic CKD.",
                "Treating bicarbonate as a definitive hyperkalaemia treatment rather than an adjunct to insulin/dextrose and dialysis.",
                "Forgetting fistula protection — no cuffs, cannulae or arterial lines in the access limb.",
              ]}
            />
            <TopicFaqs faqs={renalDiseaseFaqs} />
          </div>
        </ExamSection>
      }
    />
  );
};

export default RenalDiseaseTopic;
