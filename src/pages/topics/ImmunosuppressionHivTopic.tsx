import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { ExamSection } from "@/components/exam/ExamSection";
import { ExamMappingBadges } from "@/components/exam/ExamMappingBadges";
import { InlineRef } from "@/components/references/InlineRef";
import { TopicTableOfContents } from "@/components/layout/TopicTableOfContents";
import { immunosuppressionHivQuestions } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";

const TOPIC_ID = "immunosuppression-hiv";

const tocItems = [
  { id: "section-immunosuppressed-patient", label: "The Immunosuppressed Patient", group: "Assessment" },
  { id: "section-transplant-immunosuppressants", label: "Transplant Immunosuppressants", group: "Pharmacology" },
  { id: "section-biologics", label: "Biologics & Targeted Therapies", group: "Pharmacology" },
  { id: "section-glucocorticoids", label: "Glucocorticoids & Adrenal Suppression", group: "Management" },
  { id: "section-hiv", label: "HIV", group: "Core" },
  { id: "section-asplenia", label: "Asplenia & Hyposplenism", group: "Core" },
  { id: "section-neutropenic-sepsis", label: "Neutropenia & Theatre Planning", group: "Management" },
];

const objectives = [
  "List the causes of immunosuppression encountered perioperatively and describe how they alter presentation of sepsis, wound healing and infection risk.",
  "Describe the classes of transplant immunosuppressant drugs, their key toxicities and the principle that maintenance therapy must never be interrupted perioperatively.",
  "Outline the perioperative management of biologic and targeted synthetic therapies (anti-TNF, rituximab, tocilizumab, JAK inhibitors).",
  "Calculate perioperative corticosteroid replacement according to surgical severity and recognise and treat adrenal crisis.",
  "Describe the perioperative implications of HIV infection including drug interactions, organ dysfunction and post-exposure prophylaxis.",
  "Describe the management of asplenia/hyposplenism including vaccination and lifelong antibiotic prophylaxis.",
];

const keyPoints = [
  {
    text: "Maintenance immunosuppression (calcineurin inhibitors, antiproliferatives, corticosteroids) must never be interrupted perioperatively — use IV or NG routes if the oral route is unavailable and involve the transplant centre.",
    cites: ["KDIGO Transplant 2009"],
  },
  {
    text: "Tacrolimus and ciclosporin have a narrow therapeutic index and cause nephrotoxicity, hypertension, hyperkalaemia, hypomagnesaemia and neurotoxicity; both are CYP3A4 substrates with extensive interaction potential.",
    cites: ["KDIGO Transplant 2009"],
  },
  {
    text: "Biologics (anti-TNF, rituximab, tocilizumab) and JAK inhibitors are withheld for one full dosing interval before elective surgery and restarted once wound healing is established, to balance infection risk against disease flare.",
    cites: ["BSR Biologics 2019"],
  },
  {
    text: "Prednisolone ≥5 mg daily for >4 weeks suppresses the hypothalamic-pituitary-adrenal axis; perioperative hydrocortisone cover is titrated to surgical severity — minor 25–50 mg, moderate 50–100 mg then 25–50 mg 6-hourly, major 100 mg at induction then 200 mg/24 h infusion.",
    cites: ["AoA Glucocorticoids 2024"],
  },
  {
    text: "Ritonavir and cobicistat are potent CYP3A4 inhibitors that markedly prolong midazolam and fentanyl; efavirenz is a CYP3A4 inducer — antiretroviral therapy must not be interrupted perioperatively.",
    cites: ["BJA Educ HIV 2019", "BHIVA Monitoring 2019"],
  },
  {
    text: "Asplenic/hyposplenic patients are at lifelong risk of overwhelming post-splenectomy infection (OPSI) with encapsulated organisms and require vaccination and lifelong penicillin V 250–500 mg twice daily.",
    cites: ["BCSH Asplenia 2011"],
  },
];

const workedExamples: WorkedExample[] = [
  {
    title: "Renal transplant recipient for laparoscopic cholecystectomy",
    scenario:
      "A 47-year-old with a renal transplant 6 years ago (maintenance tacrolimus, mycophenolate mofetil and prednisolone 5 mg OD) presents for elective laparoscopic cholecystectomy. Creatinine is stable at baseline 130 µmol/L.",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Confirm baseline graft function (creatinine, eGFR, recent trough tacrolimus levels) and liaise with the transplant centre — do not omit any immunosuppressant dose; give the morning dose with a sip of water or via NG tube if fasted for a long list.</li>
          <li>Continue prednisolone and add perioperative hydrocortisone cover as this is moderate surgery on long-term steroid — 50–100 mg IV at induction, then 25–50 mg 6-hourly for 24 h, tapering back to oral maintenance <InlineRef topicId={TOPIC_ID} refLabel="AoA Glucocorticoids 2024" />.</li>
          <li>Avoid nephrotoxins (NSAIDs, aminoglycosides, iodinated contrast where possible) and drugs that raise tacrolimus levels via CYP3A4 inhibition (macrolides, azole antifungals, calcium-channel blockers such as diltiazem) — check the full drug chart.</li>
          <li>Maintain adequate hydration and avoid hypotension to protect graft perfusion; site IV access and blood pressure cuff away from the fistula arm if one remains from prior dialysis access.</li>
          <li>Strict aseptic technique for all lines and the pneumoperitoneum given ongoing immunosuppression — antibiotic prophylaxis as per local protocol, lower threshold for treating postoperative fever aggressively as signs of sepsis may be blunted.</li>
          <li>Postoperatively resume oral immunosuppressants as soon as possible, recheck renal function and tacrolimus trough level, and monitor closely for atypical presentation of surgical site or intra-abdominal infection.</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Withholding tacrolimus/mycophenolate "to reduce infection risk" — this precipitates rejection and must never be done without transplant team advice.</li>
            <li>Prescribing NSAIDs for postoperative analgesia in a transplant recipient — nephrotoxic and contraindicated.</li>
            <li>Forgetting steroid cover because the maintenance dose "seems low" — 5 mg for years still suppresses the axis.</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "Continue tacrolimus, mycophenolate and prednisolone uninterrupted (IV/NG if needed), add hydrocortisone cover for moderate surgery, avoid nephrotoxins and CYP3A4 interactors, protect graft perfusion and vascular access, apply strict asepsis, and maintain a low threshold for treating occult sepsis.",
    cites: ["KDIGO Transplant 2009", "AoA Glucocorticoids 2024"],
  },
  {
    title: "HIV-positive patient with a hip fracture",
    scenario:
      "A 72-year-old on combination antiretroviral therapy including ritonavir-boosted darunavir presents with a fractured neck of femur for emergency hemiarthroplasty. CD4 count is 420 cells/µL with an undetectable viral load.",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Continue antiretroviral therapy without interruption — give via NG tube if the patient cannot swallow; missed doses risk resistance and viral rebound <InlineRef topicId={TOPIC_ID} refLabel="BHIVA Monitoring 2019" />.</li>
          <li>Recognise the ritonavir boost as a potent CYP3A4 inhibitor — reduce and titrate doses of midazolam and fentanyl carefully as their clearance is markedly prolonged; consider drugs with less CYP3A4 dependence (e.g. remifentanil, morphine) and use short-acting agents titrated to effect <InlineRef topicId={TOPIC_ID} refLabel="BJA Educ HIV 2019" />.</li>
          <li>An undetectable viral load and CD4 &gt;400 indicate well-controlled disease with low risk of opportunistic infection, but assess for HIV-associated organ dysfunction — cardiomyopathy, nephropathy and peripheral/autonomic neuropathy that may affect regional technique choice and cardiovascular stability.</li>
          <li>Apply universal precautions for all invasive procedures; if a needlestick or mucocutaneous exposure occurs, wash the area, report immediately and start post-exposure prophylaxis within 72 hours (ideally &lt;1 hour) per occupational health protocol.</li>
          <li>Proceed with spinal anaesthesia or general anaesthesia as clinically indicated — HIV status alone is not a contraindication to any anaesthetic technique; expedite surgery per NICE hip fracture standards (within 36 hours) as for any patient.</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Stopping antiretroviral therapy perioperatively "because the patient is nil by mouth" — give via NG or IV alternative instead.</li>
            <li>Standard opioid/benzodiazepine dosing in a patient on ritonavir-boosted regimens — markedly prolonged sedation and respiratory depression risk.</li>
            <li>Delaying surgery or applying excessive additional precautions beyond standard universal precautions on the basis of HIV status alone.</li>
          </ul>
        </div>
      </div>
    ),
    answer:
      "Continue antiretrovirals uninterrupted, anticipate prolonged sedative/opioid effect from ritonavir-mediated CYP3A4 inhibition, assess for HIV-related organ dysfunction, apply universal precautions with rapid post-exposure prophylaxis if needed, and proceed with standard anaesthetic technique without unnecessary delay.",
    cites: ["BHIVA Monitoring 2019", "BJA Educ HIV 2019"],
  },
];

const immunosuppressionHivFaqs: Array<[string, string]> = [
  [
    "Should transplant immunosuppressants ever be stopped before surgery?",
    "No — calcineurin inhibitors, antiproliferatives and corticosteroids must be continued throughout the perioperative period. Use IV or NG routes if the patient cannot take oral medication, monitor trough levels, and involve the transplant centre for any dose changes.",
  ],
  [
    "How long before elective surgery should biologic therapies be withheld?",
    "Typically for one full dosing interval of the specific agent (e.g. one interval for anti-TNF drugs, one infusion cycle for rituximab or tocilizumab, one dosing interval for JAK inhibitors), balancing reduced surgical site infection risk against disease flare; restart once wound healing is established.",
  ],
  [
    "What dose of steroid therapy is significant for adrenal suppression?",
    "Prednisolone ≥5 mg daily (or equivalent) for more than 4 weeks in the preceding year is considered clinically significant for HPA axis suppression and warrants perioperative hydrocortisone supplementation scaled to surgical severity.",
  ],
  [
    "Why is ritonavir clinically important to the anaesthetist even though it is not itself an anaesthetic drug?",
    "Ritonavir (and cobicistat) are potent CYP3A4 inhibitors used as pharmacokinetic 'boosters' in antiretroviral regimens. They markedly prolong the action of CYP3A4-dependent drugs such as midazolam and fentanyl, so doses should be reduced and titrated carefully to avoid prolonged sedation and respiratory depression.",
  ],
];

const ImmunosuppressionHivTopic = () => {
  return (
    <TopicTemplate
      title="Immunosuppression & HIV"
      subtitle="Perioperative management of the immunosuppressed patient, transplant recipients, biologic therapies and HIV infection"
      backPath="/perioperative"
      backLabel="Perioperative Medicine"
      accentColor="text-clinical"
      topicId={TOPIC_ID}
      topicTitle="Immunosuppression & HIV"
      workedExamples={workedExamples}
      objectives={objectives}
      keyPoints={keyPoints}
      quizQuestions={immunosuppressionHivQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL, Exam.FFICM], curriculumCodes: ["PO_BK_05"] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM] },
        keyPoints: { exams: [Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        objectives: ["BHIVA Monitoring 2019", "BJA Educ HIV 2019", "AoA Glucocorticoids 2024", "BSR Biologics 2019", "BCSH Asplenia 2011", "KDIGO Transplant 2009"],
        workedExamples: ["KDIGO Transplant 2009", "AoA Glucocorticoids 2024", "BHIVA Monitoring 2019", "BJA Educ HIV 2019"],
        keyPoints: ["KDIGO Transplant 2009", "BSR Biologics 2019", "AoA Glucocorticoids 2024", "BJA Educ HIV 2019", "BHIVA Monitoring 2019", "BCSH Asplenia 2011"],
      }}
      coreConcepts={
        <ExamSection exams={[Exam.FINAL, Exam.FFICM]} className="scroll-mt-24">
          <div className="space-y-8">
            <p className="text-muted-foreground leading-relaxed">
              Immunosuppressed patients — whether through drugs, malignancy, transplantation, HIV, asplenia, malnutrition or diabetes — present unique perioperative challenges: infection risk is higher, sepsis presents atypically, wound healing is impaired and strict asepsis is mandatory for every invasive procedure. This topic covers transplant immunosuppressant pharmacology, biologic and targeted therapies, glucocorticoid replacement, HIV, and asplenia/hyposplenism.
            </p>

            <TopicTableOfContents items={tocItems} />

            {/* The immunosuppressed patient */}
            <section id="section-immunosuppressed-patient" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">The Immunosuppressed Patient</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_05"]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Causes of Immunosuppression</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Drugs:</strong> corticosteroids, calcineurin inhibitors, antiproliferatives, biologics, cytotoxic chemotherapy.</li>
                    <li><strong>Malignancy:</strong> haematological malignancy (leukaemia, lymphoma, myeloma) and treatment-related bone marrow suppression.</li>
                    <li><strong>Transplantation:</strong> solid-organ and haematopoietic stem cell recipients on lifelong maintenance immunosuppression.</li>
                    <li><strong>HIV/AIDS:</strong> progressive CD4+ T-cell depletion.</li>
                    <li><strong>Asplenia/hyposplenism:</strong> surgical splenectomy, sickle cell disease, coeliac disease.</li>
                    <li><strong>Malnutrition and diabetes mellitus:</strong> impaired neutrophil function and wound healing, particularly with poor glycaemic control.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Consequences for Perioperative Care</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Increased risk and severity of infection, including opportunistic organisms not seen in immunocompetent patients.</li>
                    <li><strong>Atypical presentation of sepsis:</strong> fever, tachycardia and raised white cell count may be blunted or absent — maintain a high index of suspicion and low threshold to investigate and treat.</li>
                    <li>Impaired wound healing due to reduced fibroblast activity, angiogenesis and collagen deposition, especially with corticosteroids and mTOR inhibitors.</li>
                    <li><strong>Strict asepsis</strong> is mandatory for regional anaesthesia, central and peripheral vascular access, and any invasive procedure — full aseptic technique, chlorhexidine skin preparation and minimising the number of attempts.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Transplant immunosuppressants */}
            <section id="section-transplant-immunosuppressants" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Transplant Immunosuppressants</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_05"]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Calcineurin Inhibitors — Ciclosporin, Tacrolimus</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Toxicities: <strong>nephrotoxicity</strong> (afferent arteriolar vasoconstriction), <strong>hypertension</strong>, <strong>hyperkalaemia</strong>, <strong>hypomagnesaemia</strong>, tremor and other <strong>neurotoxicity</strong> (including posterior reversible encephalopathy syndrome), gingival hyperplasia and hirsutism (ciclosporin).</li>
                    <li><strong>Narrow therapeutic index</strong> — trough levels must be monitored; both agents are <strong>CYP3A4 substrates</strong> with major interaction potential (macrolides, azole antifungals, calcium-channel blockers, grapefruit juice raise levels; rifampicin, phenytoin lower them).</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Antiproliferatives, mTOR Inhibitors, Corticosteroids</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Azathioprine:</strong> bone marrow suppression, hepatotoxicity; metabolised by thiopurine methyltransferase — dangerous interaction with allopurinol.</li>
                    <li><strong>Mycophenolate mofetil:</strong> GI upset, marrow suppression, increased risk of viral infection (CMV).</li>
                    <li><strong>mTOR inhibitors (sirolimus, everolimus):</strong> impaired wound healing and lymphocele formation — a specific concern for surgical timing and technique.</li>
                    <li><strong>Corticosteroids:</strong> as maintenance immunosuppression, also cause HPA axis suppression requiring perioperative cover (see below).</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">General Principles</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Never interrupt maintenance immunosuppression</strong> — give via IV or NG route if the oral route is temporarily unavailable <InlineRef topicId={TOPIC_ID} refLabel="KDIGO Transplant 2009" />.</li>
                    <li>Monitor trough drug levels perioperatively, especially with altered renal/hepatic function or drug interactions.</li>
                    <li>Avoid nephrotoxic drugs (NSAIDs, aminoglycosides, iodinated contrast where avoidable) and agents that alter CYP3A4 activity.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">The Solid-Organ Transplant Recipient for Unrelated Surgery</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>The <strong>denervated transplanted heart</strong> lacks vagal tone — resting tachycardia (90–110 bpm), no response to atropine, blunted response to direct-acting sympathomimetics is preserved but indirect agents (e.g. ephedrine) are less effective; isoprenaline or direct-acting catecholamines are preferred for inotropic support.</li>
                    <li>Assess graft function specifically — renal transplant: creatinine, eGFR, recent biopsy results; cardiac transplant: recent echocardiogram/biopsy for rejection; liver transplant: LFTs and synthetic function.</li>
                    <li><strong>Involve the transplant centre</strong> in perioperative planning for any but the most minor procedures.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Biologics */}
            <section id="section-biologics" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Biologics & Targeted Therapies</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_05"]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Agents include <strong>anti-TNF</strong> (infliximab, adalimumab, etanercept), <strong>rituximab</strong> (anti-CD20), <strong>tocilizumab</strong> (anti-IL-6 receptor) and <strong>JAK inhibitors</strong> (tofacitinib, baricitinib) used for rheumatoid arthritis, IBD and other autoimmune conditions.</li>
                    <li>Perioperative principle: <strong>withhold for one dosing interval</strong> of the specific agent before elective surgery to reduce infection and wound-healing complication risk, then <strong>restart once wound healing is established</strong> and there is no evidence of infection <InlineRef topicId={TOPIC_ID} refLabel="BSR Biologics 2019" />.</li>
                    <li>Discuss timing with the prescribing specialty (rheumatology/gastroenterology) — balance surgical infection risk against disease flare, which itself can complicate recovery.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Glucocorticoids */}
            <section id="section-glucocorticoids" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Glucocorticoids & Adrenal Suppression</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_05"]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Which Patients Are Suppressed?</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Prednisolone ≥5 mg daily for &gt;4 weeks</strong> (or equivalent) in the preceding year is considered clinically significant for HPA axis suppression <InlineRef topicId={TOPIC_ID} refLabel="AoA Glucocorticoids 2024" />.</li>
                    <li>Also consider any dose of long-term inhaled/topical steroid with systemic absorption, and recent (within 3 months) high-dose courses.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Perioperative Hydrocortisone Regimens by Surgical Severity</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Minor surgery:</strong> hydrocortisone 25–50 mg IV at induction; resume usual oral dose after.</li>
                    <li><strong>Moderate surgery:</strong> hydrocortisone 50–100 mg IV at induction, then 25–50 mg IV 6-hourly (or continuous infusion) for 24 hours, then taper to oral maintenance.</li>
                    <li><strong>Major surgery:</strong> hydrocortisone 100 mg IV at induction, then 200 mg/24 h by continuous infusion (or 50 mg 6-hourly), continued until the patient is stable and eating, then tapered.</li>
                    <li>Continue the patient's usual oral glucocorticoid dose in addition where practicable, and always continue on the day of surgery.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Adrenal Crisis</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Presents with refractory hypotension, hyponatraemia, hyperkalaemia, hypoglycaemia, abdominal pain, vomiting and unexplained fever, often disproportionate to the apparent surgical insult.</li>
                    <li>Treat immediately with <strong>hydrocortisone 100 mg IV bolus</strong>, followed by 200 mg/24 h infusion, aggressive IV crystalloid resuscitation (0.9% saline), correction of hypoglycaemia, and treatment of the precipitant (sepsis, undertreated stress dose).</li>
                    <li>Do not delay treatment awaiting confirmatory cortisol levels in a patient with a plausible history.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* HIV */}
            <section id="section-hiv" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">HIV</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_05"]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Natural History and Monitoring</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Untreated HIV progresses from acute seroconversion illness through a latent phase to AIDS, defined by CD4 count &lt;200 cells/µL or an AIDS-defining illness.</li>
                    <li><strong>CD4 count</strong> reflects current immune competence and opportunistic infection risk; <strong>viral load</strong> reflects current disease activity and treatment response — an undetectable viral load on effective antiretroviral therapy indicates good control and near-normal life expectancy <InlineRef topicId={TOPIC_ID} refLabel="BHIVA Monitoring 2019" />.</li>
                    <li>Antiretroviral therapy (ART) must be <strong>continued uninterrupted</strong> perioperatively via oral, NG or where necessary alternative parenteral routes — interruption risks viral rebound and resistance <InlineRef topicId={TOPIC_ID} refLabel="BHIVA Monitoring 2019" />.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Key Drug Interactions</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Ritonavir and cobicistat</strong> (pharmacokinetic "boosters") are potent CYP3A4 inhibitors — markedly prolong midazolam and fentanyl; reduce doses and titrate carefully <InlineRef topicId={TOPIC_ID} refLabel="BJA Educ HIV 2019" />.</li>
                    <li><strong>Efavirenz</strong> is a CYP3A4 inducer, reducing the effect of some co-administered drugs.</li>
                    <li>Check for interactions with any new perioperative drug before prescribing in a patient on combination ART.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Organ Dysfunction and Opportunistic Infection</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>HIV cardiomyopathy</strong> — dilated cardiomyopathy from direct viral effect and chronic inflammation.</li>
                    <li><strong>HIV-associated nephropathy</strong> — focal segmental glomerulosclerosis; also nephrotoxicity from tenofovir.</li>
                    <li><strong>Peripheral and autonomic neuropathy</strong> — from HIV itself or antiretroviral neurotoxicity (older NRTIs); consider before regional anaesthesia and document baseline deficits.</li>
                    <li>Opportunistic infections (Pneumocystis jirovecii pneumonia, CMV, TB, cryptococcal meningitis) occur predominantly at low CD4 counts and should be considered in unexplained perioperative illness.</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <h3 className="font-semibold text-foreground mb-2">Universal Precautions and Post-Exposure Prophylaxis</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li><strong>Universal precautions</strong> apply to all patients regardless of known HIV status; there is no requirement or justification for additional precautions based on HIV status alone.</li>
                    <li>After a needlestick or mucocutaneous exposure: wash immediately, report to occupational health, and start <strong>post-exposure prophylaxis (PEP) within 72 hours</strong> (efficacy greatest if started within 1–2 hours) <InlineRef topicId={TOPIC_ID} refLabel="BJA Educ HIV 2019" />.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Asplenia */}
            <section id="section-asplenia" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Asplenia & Hyposplenism</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_05"]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>The spleen clears encapsulated organisms and blood-borne parasites — asplenic/hyposplenic patients are at lifelong risk of <strong>overwhelming post-splenectomy infection (OPSI)</strong> from <em>Streptococcus pneumoniae</em>, <em>Haemophilus influenzae</em> type b and <em>Neisseria meningitidis</em>, which can progress to fulminant sepsis within hours.</li>
                    <li>Vaccination schedule: pneumococcal (conjugate then polysaccharide, with booster every 5 years), Hib, meningococcal ACWY and B <InlineRef topicId={TOPIC_ID} refLabel="BCSH Asplenia 2011" />; annual influenza vaccination.</li>
                    <li><strong>Lifelong penicillin V 250–500 mg twice daily</strong> prophylaxis (erythromycin or clarithromycin if penicillin-allergic) <InlineRef topicId={TOPIC_ID} refLabel="BCSH Asplenia 2011" />.</li>
                    <li>Patients should carry an alert card and have a low threshold for early antibiotic treatment and hospital assessment of any febrile illness.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Neutropenia pointer */}
            <section id="section-neutropenic-sepsis" className="scroll-mt-24">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Neutropenia & Theatre List Planning</h2>
              <ExamMappingBadges exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["PO_BK_05"]} />
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div className="bg-card border border-border rounded-lg p-4">
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Neutropenia (chemotherapy, haematological malignancy, marrow-suppressive drugs) is a distinct and time-critical emergency — <strong>neutropenic sepsis</strong> requires immediate empirical broad-spectrum antibiotics within 1 hour of recognition (see the dedicated neutropenic sepsis topic for full management).</li>
                    <li>Infection-control planning: position immunosuppressed and neutropenic patients first on the operating list where possible, minimise time in shared waiting areas, use strict aseptic technique for all invasive access, and ensure theatre ventilation/cleaning standards are met for high-risk patients.</li>
                    <li>Communicate immunosuppression status clearly on the theatre list and in handover so that atypical presentations of infection are not missed postoperatively.</li>
                  </ul>
                </div>
              </div>
            </section>

            <TopicFaqs faqs={immunosuppressionHivFaqs} />
          </div>
        </ExamSection>
      }
    />
  );
};

export default ImmunosuppressionHivTopic;
