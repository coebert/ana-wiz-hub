import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { ExamSection } from "@/components/exam/ExamSection";
import { ExamMappingBadges } from "@/components/exam/ExamMappingBadges";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { InlineRef } from "@/components/references/InlineRef";
import { TopicTableOfContents } from "@/components/layout/TopicTableOfContents";
import { gastrointestinalDiseaseQuestions } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";

const tocItems = [
  { id: "section-reflux-and-aspiration", label: "Reflux, Delayed Emptying & Aspiration Risk", group: "Airway" },
  { id: "section-inflammatory-bowel-disease", label: "Inflammatory Bowel Disease", group: "Chronic Disease" },
  { id: "section-malnutrition-and-refeeding", label: "Malnutrition & Refeeding Syndrome", group: "Nutrition" },
  { id: "section-intestinal-failure", label: "Intestinal Failure & Short Bowel", group: "Complications" },
  { id: "section-bowel-obstruction", label: "Bowel Obstruction & Acute Abdomen", group: "Emergency" },
  { id: "section-other-gi-conditions", label: "Other GI Conditions", group: "Miscellaneous" },
];

const objectives = [
  "Stratify aspiration risk from reflux, delayed gastric emptying and mechanical obstruction, and select fasting rules, RSI technique and extubation strategy accordingly.",
  "Manage the perioperative implications of inflammatory bowel disease, including biologic and steroid therapy, anaemia, VTE risk and acute severe colitis.",
  "Screen for malnutrition and apply NICE high-risk refeeding criteria with an appropriately cautious feeding and electrolyte-replacement regimen.",
  "Recognise the physiology and perioperative management of intestinal failure, short bowel syndrome and high-output stoma.",
  "Plan anaesthesia for bowel obstruction and the acute abdomen, accounting for third-space losses, intra-abdominal hypertension and sepsis.",
  "Identify anaesthetic considerations in coeliac disease, peptic ulcer disease, pancreatic exocrine insufficiency and carcinoid syndrome.",
];

const keyPoints = [
  {
    text: "Standard fasting (6 h solids, 2 h clear fluids) does not guarantee an empty stomach in gastroparesis, bowel obstruction, achalasia or opioid/GLP-1 receptor agonist use — treat as 'full stomach' regardless of fasting time.",
    cites: ["AoA Fasting 2019", "BJA Educ Aspiration 2014"],
  },
  {
    text: "GLP-1 receptor agonists (semaglutide, liraglutide, tirzepatide) delay gastric emptying; guidance advises holding the dose for a full dosing interval (once weekly ≥ 1 week; daily ≥ 1 day) before elective anaesthesia and treating as high aspiration risk if GI symptoms persist.",
    cites: ["AoA Fasting 2019", "BJA Educ Aspiration 2014"],
  },
  {
    text: "Rapid sequence induction: preoxygenate to ETO₂ > 90%, cricoid pressure (10 N awake → 30 N on loss of consciousness) is now applied selectively, rapid-onset agent (propofol/ketamine) with suxamethonium 1–1.5 mg/kg or rocuronium 1.2 mg/kg, cuffed tracheal tube secured before ventilation.",
    cites: ["BJA Educ Aspiration 2014"],
  },
  {
    text: "IBD patients on biologics (anti-TNF, vedolizumab, ustekinumab) have increased infection and wound-complication risk; elective surgery is timed to trough drug levels where possible, while thiopurines and biologics are usually continued for emergency surgery.",
    cites: ["ECCO IBD 2020"],
  },
  {
    text: "Acute severe ulcerative colitis (Truelove & Witts criteria) requiring rescue therapy failure or toxic megacolon needs urgent colectomy — VTE prophylaxis is mandatory despite rectal bleeding.",
    cites: ["ECCO IBD 2020"],
  },
  {
    text: "NICE high-risk refeeding criteria (any one of BMI < 16, unintentional weight loss > 15% in 3–6 months, little/no intake > 10 days, or low K⁺/PO₄³⁻/Mg²⁺ before feeding) mandate thiamine 200–300 mg/day and starting at 10 kcal/kg/day (5 kcal/kg/day if extreme risk).",
    cites: ["NICE CG32 Nutrition"],
  },
  {
    text: "High-output stoma (> 1500-2000 mL/day) causes sodium and magnesium depletion; correct with an oral glucose-saline rehydration solution and loperamide/codeine before induction rather than IV fluid alone.",
    cites: ["BJA Educ Intestinal Failure 2019"],
  },
];

const workedExamples: WorkedExample[] = [
  {
    title: "Elective laparoscopic cholecystectomy in a patient with achalasia",
    scenario:
      "A 46-year-old with known achalasia presents for elective laparoscopic cholecystectomy. She reports occasional regurgitation of undigested food and a dilated oesophagus on recent barium swallow. Plan her perioperative aspiration risk management.",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>
            Recognise achalasia as a high aspiration-risk condition: failure of lower oesophageal sphincter relaxation and loss of peristalsis mean food and secretions can pool in a dilated oesophagus regardless of standard fasting time.
          </li>
          <li>
            Extend preoperative fasting beyond the standard 6 h solids / 2 h clear fluids — many centres use a clear-fluid-only diet for 24–48 h before surgery, or a liquid diet the day before, to allow oesophageal clearance.
          </li>
          <li>
            Consider preoperative endoscopy or nasogastric aspiration of residual contents if the oesophagus is significantly dilated; discuss with the endoscopist/surgeon.
          </li>
          <li>
            Give sodium citrate 30 mL orally shortly before induction (limited benefit against particulate oesophageal contents but raises gastric pH) and consider a prokinetic (metoclopramide 10 mg IV), acknowledging it will not empty a non-peristaltic oesophagus.
          </li>
          <li>
            Induction: rapid sequence induction with cricoid pressure, propofol and suxamethonium (or rocuronium 1.2 mg/kg with sugammadex available), head-up position to reduce passive regurgitation.
          </li>
          <li>
            Consider awake fibreoptic intubation only if a separate difficult airway concern coexists — achalasia alone does not usually mandate this, but a very dilated, symptomatic oesophagus with recent food intake may warrant it.
          </li>
          <li>
            Extubate awake, fully reversed, in a head-up or lateral position with suction immediately available; avoid early extubation in a "deep" plane.
          </li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Assuming standard fasting times protect against aspiration — achalasia empties by gravity, not peristalsis, and residue can remain despite prolonged starvation.</li>
            <li>Relying on metoclopramide to "empty" an aperistaltic oesophagus.</li>
            <li>Extubating deep to avoid coughing on the tube — removes airway protection at the point of highest regurgitation risk.</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "Treat as a full stomach irrespective of standard fasting duration: extended clear-fluid fasting ± preoperative oesophageal clearance, RSI with cricoid pressure, sodium citrate and metoclopramide as adjuncts (not substitutes), and awake extubation head-up with suction ready.",
    cites: ["AoA Fasting 2019", "BJA Educ Aspiration 2014"],
  },
  {
    title: "Urgent subtotal colectomy for acute severe ulcerative colitis",
    scenario:
      "A 29-year-old with known ulcerative colitis is admitted with 8 bloody stools/day, HR 118, temperature 38.4°C, CRP 92, and albumin 24 g/L, meeting Truelove & Witts criteria for acute severe colitis. She fails to respond to 72 h of IV hydrocortisone and infliximab rescue; the surgical team plans an urgent subtotal colectomy. Outline the anaesthetic and perioperative plan.",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>
            Recognise the severity: Truelove & Witts "severe" (≥ 6 bloody stools/day plus one of HR &gt; 90, temp &gt; 37.8°C, Hb &lt; 105 g/L, CRP &gt; 30) with failed rescue therapy is an indication for emergency colectomy — delay increases risk of toxic megacolon and perforation.
          </li>
          <li>
            Preoperative optimisation within the time available: cross-match blood (anaemia and ongoing loss common), correct electrolytes (hypokalaemia, hypomagnesaemia), continue high-dose IV hydrocortisone perioperatively (stress-dose steroid cover given recent corticosteroid exposure), VTE prophylaxis with LMWH despite rectal bleeding — hypercoagulability of active colitis outweighs bleeding risk.
          </li>
          <li>
            Anticipate hypovolaemia and sepsis physiology: obtain good IV access, consider invasive arterial monitoring, treat as a "full stomach" if abdominal distension or ileus present and use RSI.
          </li>
          <li>
            Discuss recent biologic (infliximab) exposure with the surgical/IBD team — associated with increased postoperative infective and wound-healing complications; this does not delay a life-saving operation but informs postoperative surveillance and often favours a defunctioning stoma over primary anastomosis.
          </li>
          <li>
            Intraoperative: balanced crystalloid guided by dynamic markers, early vasopressor support for septic vasoplegia, multimodal opioid-sparing analgesia, active warming, antibiotics per local sepsis protocol.
          </li>
          <li>
            Postoperative: HDU/ICU admission, continue stress-dose steroids with a tapering wean, VTE prophylaxis continued, nutritional support planned (likely malnourished from chronic disease), stoma education.
          </li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Withholding VTE prophylaxis because of rectal bleeding — active IBD is strongly prothrombotic and mechanical + pharmacological prophylaxis should continue.</li>
            <li>Forgetting stress-dose steroids in a patient on recent high-dose corticosteroids — risk of adrenal crisis.</li>
            <li>Delaying surgery to "optimise" a patient who has already failed medical rescue therapy — toxic megacolon/perforation risk rises with delay.</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "Urgent colectomy proceeds without delay: correct electrolytes and anaemia where feasible, continue stress-dose steroids, maintain VTE prophylaxis despite bleeding, treat as full stomach with RSI if distended, anticipate septic/hypovolaemic physiology, and plan HDU care with staged reconstruction given recent biologic exposure.",
    cites: ["ECCO IBD 2020", "BJA Educ Aspiration 2014"],
  },
];

const gastrointestinalDiseaseFaqs: Array<[string, string]> = [
  ["Do standard fasting times protect patients on GLP-1 receptor agonists from aspiration?", "Not reliably. GLP-1 receptor agonists (semaglutide, liraglutide, tirzepatide) delay gastric emptying even in fasted patients. Guidance recommends holding the drug for one dosing interval before elective surgery (≥1 week for weekly formulations, ≥1 day for daily ones) and treating the patient as high aspiration risk — considering RSI or gastric ultrasound — if GI symptoms (nausea, bloating, vomiting) persist or the drug could not be withheld."],
  ["Should biologics and thiopurines be stopped before surgery in IBD?", "For elective surgery, anti-TNF agents are often timed to trough levels (avoiding surgery in the days immediately after an infusion) because of an association with wound and infective complications, though evidence is mixed and disease control should not be sacrificed. Thiopurines (azathioprine/6-mercaptopurine) are usually continued. For emergency surgery (e.g. acute severe colitis), immunosuppression is not a reason to delay a life-saving operation."],
  ["What are the NICE criteria for 'high risk' of refeeding syndrome and how does this change feeding?", "High risk = one major criterion (BMI <16, unintentional weight loss >15% in 3-6 months, little/no nutritional intake for >10 days, or low potassium/phosphate/magnesium before feeding) or two minor criteria (BMI <18.5, weight loss >10% in 3-6 months, little/no intake >5 days, alcohol misuse or drugs including insulin, chemotherapy, antacids or diuretics). High-risk patients start at 10 kcal/kg/day (5 kcal/kg/day if extreme risk, e.g. BMI <14 or negligible intake >15 days), rising slowly over 4-7 days, with thiamine 200-300 mg/day and proactive potassium, phosphate and magnesium replacement started before or with feeding."],
  ["Why is a high-output stoma dangerous before anaesthesia?", "Outputs above 1500-2000 mL/day cause depletion of sodium, magnesium and water (the small bowel cannot compensate as the colon would), producing a contracted extracellular volume with secondary hyperaldosteronism and a thirsty, hyponatraemic patient who drinks hypotonic fluid and worsens losses further. Correct with a glucose-saline oral rehydration solution, loperamide/codeine to slow transit, and IV magnesium/sodium replacement guided by daily electrolytes before elective induction; treat as hypovolaemic even with a normal-looking blood pressure."],
];

const GastrointestinalDiseaseTopic = () => {
  return (
    <TopicTemplate
      title="Gastrointestinal Co-Existing Disease"
      subtitle="Perioperative management of reflux, aspiration risk, inflammatory bowel disease, malnutrition and intestinal failure"
      backPath="/perioperative"
      backLabel="Perioperative Medicine"
      accentColor="text-clinical"
      topicId="gastrointestinal-disease"
      topicTitle="Gastrointestinal Co-Existing Disease"
      workedExamples={workedExamples}
      objectives={objectives}
      keyPoints={keyPoints}
      quizQuestions={gastrointestinalDiseaseQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL, Exam.FFICM], curriculumCodes: ["PO_BK_05"] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM] },
        keyPoints: { exams: [Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        objectives: ["AoA Fasting 2019", "BJA Educ Aspiration 2014", "ECCO IBD 2020", "NICE CG32 Nutrition", "BJA Educ Intestinal Failure 2019", "ESPEN Surgery 2021"],
        workedExamples: ["AoA Fasting 2019", "BJA Educ Aspiration 2014", "ECCO IBD 2020"],
        keyPoints: [
          "AoA Fasting 2019",
          "BJA Educ Aspiration 2014",
          "ECCO IBD 2020",
          "NICE CG32 Nutrition",
          "BJA Educ Intestinal Failure 2019",
        ],
      }}
      coreConcepts={
        <ExamSection exams={[Exam.FINAL, Exam.FFICM]} className="scroll-mt-24">
          <div className="space-y-8">
            <p className="text-muted-foreground leading-relaxed">
              Gastrointestinal co-existing disease spans an enormous range of anaesthetic problems — from the everyday risk assessment of reflux and fasting, through the systemic effects of inflammatory bowel disease and malnutrition, to the acute physiological derangement of bowel obstruction and intestinal failure. This topic builds a structured approach to aspiration risk, perioperative drug management in IBD, safe refeeding, and the fluid and electrolyte physiology of the short-bowel and obstructed patient.
            </p>

            <TopicTableOfContents items={tocItems} />

            {/* Reflux and aspiration */}
            <section id="section-reflux-and-aspiration" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Reflux, Delayed Gastric Emptying & Aspiration Risk</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_05"]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Barrier Pressure Physiology</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Aspiration risk is determined by the balance between lower oesophageal sphincter (LOS) tone and intragastric pressure ("barrier pressure").</li>
                    <li>LOS tone is reduced by hiatus hernia, pregnancy (progesterone), opioids, anticholinergics, and nasogastric tubes traversing the sphincter.</li>
                    <li>Intragastric pressure rises with obesity, ascites, pregnancy, gastroparesis and mechanical obstruction — all shift the balance toward reflux.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Risk Stratification</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Anatomical/mechanical:</strong> hiatus hernia, achalasia, oesophageal stricture, bowel obstruction (mechanical or paralytic ileus).</li>
                    <li><strong>Motility disorders:</strong> diabetic autonomic neuropathy causing gastroparesis, connective tissue disease (systemic sclerosis), post-vagotomy states.</li>
                    <li><strong>Physiological:</strong> pregnancy (from the second trimester), obesity (raised intra-abdominal pressure, higher incidence of hiatus hernia).</li>
                    <li><strong>Pharmacological:</strong> opioids (delay emptying via µ-receptor effect on gut motility) and GLP-1 receptor agonists (semaglutide, liraglutide, tirzepatide, exenatide) — delay emptying as part of their glycaemic mechanism <InlineRef topicId="gastrointestinal-disease" refLabel="AoA Fasting 2019" />.</li>
                    <li><strong>Emergency states:</strong> trauma, acute abdomen, recent food intake, altered consciousness, difficult/unpredictable airway.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Fasting Rules and Their Limits</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Standard elective fasting: <strong>6 hours for solids/milk/formula, 2 hours for clear fluids</strong> (up to and including the time of surgery, "sip till send" encouraged) <InlineRef topicId="gastrointestinal-disease" refLabel="AoA Fasting 2019" />.</li>
                    <li>These rules assume normal gastric emptying — they do <strong>not</strong> protect against aspiration in gastroparesis, achalasia, bowel obstruction, or recent opioid/GLP-1 receptor agonist use; such patients should be managed as "full stomach" irrespective of fasting duration.</li>
                    <li>GLP-1 receptor agonists: hold for one dosing interval before elective anaesthesia (≥ 1 week for weekly formulations, ≥ 1 day for daily ones); if not held, or if GI symptoms present, treat as high aspiration risk (consider RSI or point-of-care gastric ultrasound) <InlineRef topicId="gastrointestinal-disease" refLabel="AoA Fasting 2019" />.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Airway Management and Pharmacological Adjuncts</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Rapid sequence induction:</strong> full preoxygenation, rapid-onset induction agent, suxamethonium 1–1.5 mg/kg or rocuronium 1.2 mg/kg (with sugammadex immediately available), cuffed tracheal tube; cricoid pressure applied selectively (10 N awake rising to 30 N at loss of consciousness) and released if it impairs laryngoscopy or ventilation <InlineRef topicId="gastrointestinal-disease" refLabel="BJA Educ Aspiration 2014" />.</li>
                    <li><strong>Sodium citrate</strong> 0.3 M, 30 mL orally, 15–30 minutes before induction raises gastric pH (target &gt; 2.5) but does not reduce volume; most useful as an adjunct in obstetric and emergency practice.</li>
                    <li><strong>Prokinetics:</strong> metoclopramide 10 mg IV increases gastric emptying and LOS tone but is ineffective against mechanical obstruction or an aperistaltic oesophagus (e.g. achalasia).</li>
                    <li><strong>H₂-antagonists/PPIs</strong> given the night before and morning of surgery reduce gastric volume and raise pH in high-risk elective cases.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Extubation Strategy and Management of Witnessed Aspiration</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Extubate awake, fully reversed (TOF ratio &gt; 0.9), in a head-up or left lateral position with suction immediately to hand; avoid "deep" extubation in high-risk patients.</li>
                    <li>Witnessed aspiration: head-down/lateral position, immediate suction of the oropharynx, 100% oxygen, do not lavage the airway; intubate if respiratory compromise and suction the trachea under direct vision before positive-pressure ventilation if particulate matter present.</li>
                    <li>No routine prophylactic antibiotics or steroids; chest X-ray and clinical observation, escalate to CPAP/ventilatory support for evolving aspiration pneumonitis or ARDS <InlineRef topicId="gastrointestinal-disease" refLabel="BJA Educ Aspiration 2014" />.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* IBD */}
            <section id="section-inflammatory-bowel-disease" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Inflammatory Bowel Disease</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_05"]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Disease Activity Assessment</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Truelove & Witts criteria</strong> for acute severe ulcerative colitis: ≥ 6 bloody stools/day plus one of HR &gt; 90/min, temperature &gt; 37.8°C, Hb &lt; 105 g/L, or ESR &gt; 30/CRP &gt; 30 <InlineRef topicId="gastrointestinal-disease" refLabel="ECCO IBD 2020" />.</li>
                    <li>Crohn's disease activity assessed clinically (CDAI) and biochemically (CRP, faecal calprotectin); look for extraintestinal manifestations (arthropathy, primary sclerosing cholangitis, uveitis) and fistulating/stricturing phenotype.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Perioperative Drug Management</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Corticosteroids:</strong> continue perioperatively; give stress-dose IV hydrocortisone (e.g. 50–100 mg at induction, then 6–8 hourly or infusion) if on &gt; 5 mg/day prednisolone-equivalent for &gt; 4 weeks, tapering over 24–72 h post-op.</li>
                    <li><strong>Biologics (anti-TNF, vedolizumab, ustekinumab):</strong> for elective surgery, time to trough drug levels where feasible because of an association with postoperative infective/wound complications; continue for emergency, life-saving surgery — disease control and source of sepsis take priority <InlineRef topicId="gastrointestinal-disease" refLabel="ECCO IBD 2020" />.</li>
                    <li><strong>Thiopurines (azathioprine/6-mercaptopurine):</strong> usually continued perioperatively; myelosuppression risk increased with allopurinol co-prescription and in TPMT-deficient patients — check FBC.</li>
                    <li><strong>5-ASA compounds:</strong> continue; rare interstitial nephritis — check renal function.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Anaemia, VTE and Nutrition</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Iron-deficiency anaemia is common from chronic blood loss and malabsorption; IV iron (e.g. ferric carboxymaltose) is preferred over oral iron in active disease (poor absorption, worsens symptoms) — correct before elective major surgery where time allows.</li>
                    <li>Active IBD is strongly prothrombotic (up to 3-fold risk of VTE); pharmacological and mechanical VTE prophylaxis is indicated even with rectal bleeding and should be continued through admission <InlineRef topicId="gastrointestinal-disease" refLabel="ECCO IBD 2020" />.</li>
                    <li>Malnutrition and hypoalbuminaemia are common — screen with MUST and involve dietitians; consider preoperative nutritional optimisation for elective resections.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Toxic Megacolon, Acute Severe Colitis and Surgery</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Toxic megacolon: colonic dilatation &gt; 6 cm with systemic toxicity — high perforation risk; nil by mouth, nasogastric decompression, IV steroids/rescue therapy, surgical review, avoid antimotility agents, opioids and anticholinergics which worsen dilatation.</li>
                    <li>Failure of medical rescue therapy (IV corticosteroids ± infliximab/ciclosporin) within 72 h mandates urgent subtotal colectomy — treat as full stomach with RSI if distended, anticipate septic and hypovolaemic physiology, continue stress-dose steroids and VTE prophylaxis.</li>
                    <li>Ileo-anal pouch surgery and stoma formation: anticipate high fluid/electrolyte losses from a new ileostomy and plan enhanced recovery with early oral rehydration solution.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Malnutrition and refeeding */}
            <section id="section-malnutrition-and-refeeding" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Malnutrition and Refeeding Syndrome</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_05"]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Screening and Perioperative Nutrition Targets</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>MUST</strong> (Malnutrition Universal Screening Tool) combines BMI, unplanned weight loss and acute disease effect to grade malnutrition risk (0 low, 1 medium, ≥ 2 high).</li>
                    <li>ESPEN targets for major surgery: energy 25–30 kcal/kg/day, protein 1.5–2.0 g/kg/day, with preoperative carbohydrate loading (clear carbohydrate drink up to 2 h before surgery in non-diabetic patients) to reduce insulin resistance and postoperative catabolism <InlineRef topicId="gastrointestinal-disease" refLabel="ESPEN Surgery 2021" />.</li>
                    <li>Immunonutrition (arginine, omega-3 fatty acids, nucleotides) for 5–7 days pre- and postoperatively is recommended in malnourished patients undergoing major GI cancer surgery to reduce infective complications <InlineRef topicId="gastrointestinal-disease" refLabel="ESPEN Surgery 2021" />.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">NICE High-Risk Refeeding Criteria</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>One or more major criteria:</strong> BMI &lt; 16 kg/m², unintentional weight loss &gt; 15% in the last 3–6 months, little or no nutritional intake for &gt; 10 days, or low potassium/phosphate/magnesium before feeding.</li>
                    <li><strong>Two or more minor criteria:</strong> BMI &lt; 18.5 kg/m², unintentional weight loss &gt; 10% in 3–6 months, little/no intake for &gt; 5 days, or history of alcohol misuse or drugs including insulin, chemotherapy, antacids or diuretics <InlineRef topicId="gastrointestinal-disease" refLabel="NICE CG32 Nutrition" />.</li>
                    <li><strong>Feeding regimen:</strong> start at 10 kcal/kg/day (5 kcal/kg/day if extreme risk, e.g. BMI &lt; 14 or negligible intake &gt; 15 days), increasing slowly to meet full needs over 4–7 days if biochemistry stable.</li>
                    <li><strong>Thiamine 200–300 mg/day</strong> orally (or IV as part of a Pabrinex-type regimen if higher risk) started before or with feeding, alongside a balanced multivitamin/trace element supplement, to prevent Wernicke's encephalopathy.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Electrolyte Replacement Targets</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Phosphate:</strong> the hallmark of refeeding syndrome — intracellular shift with insulin release causes severe hypophosphataemia (&lt; 0.5 mmol/L), risking cardiac and respiratory muscle failure; check daily and replace aggressively (IV phosphate polyfusor if severe/symptomatic).</li>
                    <li><strong>Potassium:</strong> target 4.0–5.0 mmol/L; hypokalaemia risks arrhythmia — replace before and during feeding.</li>
                    <li><strong>Magnesium:</strong> target &gt; 0.7 mmol/L; hypomagnesaemia perpetuates hypokalaemia and hypocalcaemia and must be corrected concurrently.</li>
                    <li>Fluid and sodium restriction is prudent in the first days of refeeding to avoid precipitating cardiac failure in a depleted, insulin-sensitised patient.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Intestinal failure */}
            <section id="section-intestinal-failure" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Intestinal Failure, Short Bowel and High-Output Stoma</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_05"]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Classification</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Type 1:</strong> acute, self-limiting (e.g. postoperative ileus) — usually managed with short-term IV fluid/electrolyte support.</li>
                    <li><strong>Type 2:</strong> prolonged acute condition, often with sepsis, metabolic and nutritional complications (e.g. enterocutaneous fistula) — requires multidisciplinary intestinal failure unit care and parenteral nutrition for weeks to months <InlineRef topicId="gastrointestinal-disease" refLabel="BJA Educ Intestinal Failure 2019" />.</li>
                    <li><strong>Type 3:</strong> chronic condition (e.g. short bowel syndrome) requiring long-term or home parenteral nutrition.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Sodium and Magnesium Depletion</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Jejunal/high-output losses are isotonic and sodium-rich; patients become chronically sodium-depleted, triggering secondary hyperaldosteronism and thirst that drives intake of hypotonic fluid, worsening losses ("hyponatraemic, sodium-depleted" state) <InlineRef topicId="gastrointestinal-disease" refLabel="BJA Educ Intestinal Failure 2019" />.</li>
                    <li>Magnesium is lost with fat malabsorption (saponification) and diarrhoea; hypomagnesaemia impairs PTH release, causing refractory hypocalcaemia unresponsive to calcium alone until magnesium is replaced.</li>
                    <li>Correction: oral glucose-saline rehydration solution (sipped slowly, not with meals), loperamide/codeine to reduce output, IV magnesium and sodium replacement guided by daily electrolytes.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Parenteral Nutrition and Line Sepsis</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Central venous catheter-related bloodstream infection is the most feared complication of long-term PN — strict aseptic technique, dedicated lumen, and a low threshold for line-sepsis workup with fever in a PN-dependent patient.</li>
                    <li>Monitor for PN-associated liver disease (cholestasis, steatosis) and metabolic bone disease with long-term use.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Fluid Strategy Before Induction</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Assume volume depletion even with a normal supine blood pressure; check postural blood pressure/heart rate and recent stoma output trends.</li>
                    <li>Correct sodium and magnesium deficits and optimise volume status before elective induction; have balanced crystalloid and vasopressor immediately available for emergency cases given the propensity for profound induction hypotension.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Bowel obstruction */}
            <section id="section-bowel-obstruction" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Bowel Obstruction and the Acute Abdomen</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_05"]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Third-Space Losses and Decompression</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Obstruction causes sequestration of isotonic fluid into the bowel lumen and wall ("third space"), vomiting-related losses of hydrogen and chloride (hypochloraemic, hypokalaemic metabolic alkalosis with proximal obstruction), and reduced oral intake — combining to produce significant hypovolaemia often underestimated by resting vital signs.</li>
                    <li>Nasogastric decompression reduces aspiration risk and vomiting, but does not replace fluid resuscitation; insert before induction where time allows and aspirate immediately before RSI.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Intra-Abdominal Hypertension and Sepsis</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Intra-abdominal pressure &gt; 12 mmHg = intra-abdominal hypertension; &gt; 20 mmHg with new organ dysfunction = abdominal compartment syndrome — reduces venous return, renal perfusion and diaphragmatic excursion, and increases induction hypotension risk.</li>
                    <li>Sepsis is common with strangulation, ischaemia or perforation — apply Sepsis Six /surviving sepsis principles (cultures, lactate, broad-spectrum antibiotics, fluids, source control, senior review) alongside airway and fluid planning.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Induction and Fluid Resuscitation Choices</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Treat as a full stomach: RSI with cricoid pressure and a rapid-onset agent; reduce induction doses in the hypovolaemic/septic patient and have vasopressor (metaraminol/noradrenaline) ready.</li>
                    <li>Resuscitate with balanced crystalloid guided by dynamic markers (stroke volume variation, passive leg raise) rather than a fixed volume, correcting potassium and chloride deficits; avoid excessive 0.9% saline which worsens hyperchloraemic acidosis.</li>
                    <li>Invasive arterial monitoring for major laparotomy or haemodynamic instability; escalate to HDU/ICU postoperatively for ongoing sepsis or major fluid shifts.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Other GI conditions */}
            <section id="section-other-gi-conditions" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Other GI Conditions Relevant to the Exams</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_05"]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Coeliac Disease</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Autoimmune villous atrophy causing malabsorption of iron, folate, vitamin D/calcium and fat-soluble vitamins — screen for anaemia and osteomalacia/osteoporosis before major surgery.</li>
                    <li>Ensure a strictly gluten-free diet perioperatively, including checking medication excipients and enteral feed formulations.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Peptic Ulcer Disease and Helicobacter pylori</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Chronic NSAID/aspirin use and <em>H. pylori</em> infection are the principal causes; eradication therapy is a PPI plus two antibiotics (commonly amoxicillin and clarithromycin, or metronidazole if penicillin-allergic) for 7–14 days.</li>
                    <li>Perforated peptic ulcer presents as an acute abdomen with pneumoperitoneum — manage as full stomach with sepsis physiology per the bowel obstruction pathway above; continue PPI perioperatively to reduce rebleeding risk after ulcer surgery/endoscopic therapy.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Pancreatic Exocrine Insufficiency</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Seen after pancreatitis, pancreatic resection or in cystic fibrosis; causes fat malabsorption (steatorrhoea) with deficiency of fat-soluble vitamins A, D, E and K.</li>
                    <li>Continue pancreatic enzyme replacement therapy (PERT) with feeds perioperatively; check clotting (vitamin K-dependent factors) if malabsorption is longstanding or feeding has been interrupted.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Carcinoid Syndrome — Brief Pointer</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Neuroendocrine tumours secreting vasoactive mediators (serotonin, bradykinin, histamine) can precipitate carcinoid crisis (flushing, bronchospasm, profound hypo- or hypertension) with tumour handling or anaesthesia; managed with octreotide infusion perioperatively.</li>
                    <li>Detailed endocrine and anaesthetic management is covered in the endocrine disease topic; recognise the GI context (midgut carcinoid, hepatic metastases) as the trigger for exam questions crossing both topics.</li>
                  </ul>
                </div>
              </div>
            </section>

            <ExamPitfallsCallout
              accent="clinical"
              pitfalls={[
                "Standard fasting times (6 h solids/2 h clears) do not protect against aspiration in gastroparesis, achalasia, bowel obstruction or recent GLP-1 receptor agonist/opioid use — manage as full stomach regardless of documented fasting duration.",
                "Do not withhold VTE prophylaxis in active IBD or acute severe colitis because of rectal bleeding — active disease is strongly prothrombotic.",
                "Forgetting stress-dose steroids in a patient on recent corticosteroids presenting for emergency IBD surgery risks adrenal crisis.",
                "In refeeding syndrome, hypophosphataemia (not hyperglycaemia) is the classical early biochemical marker of danger — check phosphate, potassium and magnesium before and during feeding, and start low (10 kcal/kg/day, or 5 kcal/kg/day if extreme risk).",
                "High-output stoma losses need oral glucose-saline rehydration solution and antimotility agents, not simply more IV fluid or more oral water, which worsens sodium depletion.",
                "Cricoid pressure should be released if it impairs laryngoscopy, ventilation or supraglottic airway insertion — it is not an absolute, unmodifiable manoeuvre.",
              ]}
              />
              <TopicFaqs faqs={gastrointestinalDiseaseFaqs} />
            </div>
          </ExamSection>
      }
    />
  );
};

export default GastrointestinalDiseaseTopic;
