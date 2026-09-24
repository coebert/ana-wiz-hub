import { Link } from "react-router-dom";
import { NoteLayout } from "./NoteLayout";

const AsaClassificationNote = () => (
  <NoteLayout
    slug="asa-classification"
    title="ASA classification: ASA physical status grades I–VI with examples"
    shortTitle="ASA classification"
    description="The ASA physical status classification explained: ASA I to VI definitions, the 'E' emergency suffix, adult examples for each grade and its limits as a risk score."
    datePublished="2026-09-24"
    examTags={["primary", "final"]}
    lede="The ASA classification (American Society of Anesthesiologists physical status, or ASA-PS) grades a patient's pre-operative health from ASA I (a normal healthy patient) to ASA VI (a brain-dead organ donor), with an 'E' added for emergency surgery. It describes the patient's fitness, not the risk of the operation itself."
    faqs={[
      {
        q: "What are the ASA grades?",
        a: "ASA I: a normal healthy patient. ASA II: mild systemic disease. ASA III: severe systemic disease. ASA IV: severe systemic disease that is a constant threat to life. ASA V: a moribund patient not expected to survive without the operation. ASA VI: a declared brain-dead patient whose organs are being removed for donation.",
      },
      {
        q: "What does the E mean in ASA classification?",
        a: "The 'E' suffix marks an emergency: a case where delay in treatment would lead to a significant increase in the threat to life or body part (for example ASA IIIE). It can be added to any grade except VI.",
      },
      {
        q: "Is obesity ASA II or III?",
        a: "In the ASA's 2020 examples, obesity with a BMI of 30–40 is ASA II, and morbid obesity with a BMI of 40 or more is ASA III.",
      },
      {
        q: "Is the ASA grade a risk score?",
        a: "Not on its own. ASA grade correlates with perioperative mortality, but it ignores the type and urgency of surgery, age and frailty, and different assessors often grade the same patient differently. Combine it with procedure-specific tools such as NSQIP, P-POSSUM or NELA risk models.",
      },
    ]}
    related={[
      { label: "Preoperative assessment — full topic", to: "/perioperative/preoperative-assessment" },
      { label: "Apfel score for PONV risk", to: "/notes/apfel-score-ponv-risk" },
      { label: "Notes index", to: "/notes" },
    ]}
  >
    <h2>ASA grades with examples</h2>
    <p>
      The examples below follow the ASA's adult examples (last updated 2020).
      They are a guide: the grade is a clinical judgement of the whole patient.
    </p>
    <ul>
      <li>
        <strong>ASA I: a normal healthy patient.</strong> Healthy, non-smoking,
        little or no alcohol use.
      </li>
      <li>
        <strong>ASA II: mild systemic disease.</strong> No substantive
        functional limitation. Current smoker, social alcohol use, pregnancy,
        BMI 30–40, well-controlled diabetes or hypertension, mild lung disease.
      </li>
      <li>
        <strong>ASA III: severe systemic disease.</strong> Substantive
        functional limitation. Poorly controlled diabetes or hypertension,
        COPD, BMI ≥ 40, active hepatitis, alcohol dependence, implanted
        pacemaker, moderately reduced ejection fraction, end-stage renal disease
        on regular dialysis, or a history of MI, stroke, TIA or coronary stents
        more than 3 months ago.
      </li>
      <li>
        <strong>ASA IV: severe systemic disease that is a constant threat to
        life.</strong> MI, stroke, TIA or coronary stents within the last 3
        months, ongoing cardiac ischaemia or severe valve dysfunction, severely
        reduced ejection fraction, shock, sepsis, DIC, or acute or end-stage
        renal disease not on regular dialysis.
      </li>
      <li>
        <strong>ASA V: a moribund patient not expected to survive without the
        operation.</strong> Ruptured abdominal aortic aneurysm, massive trauma,
        intracranial bleed with mass effect, or ischaemic bowel with significant
        cardiac disease or multi-organ failure.
      </li>
      <li>
        <strong>ASA VI: a declared brain-dead patient</strong> whose organs are
        being removed for donation.
      </li>
    </ul>

    <h2>The "E" suffix</h2>
    <p>
      Add <strong>E</strong> when delay in treatment would significantly
      increase the threat to life or body part, for example ASA IIIE for a
      patient with COPD having a laparotomy for perforation. Emergency status
      roughly doubles to triples mortality at any given grade.
    </p>

    <h2>Where the ASA grade falls short</h2>
    <ul>
      <li>It ignores the operation: an ASA II patient having an oesophagectomy carries far more risk than one having a cataract operation.</li>
      <li>It ignores age and frailty unless they cause systemic disease.</li>
      <li>Different assessors often disagree, especially between II and III.</li>
      <li>
        For decisions and consent, pair it with procedure-specific risk tools
        and functional measures (see <Link to="/perioperative/preoperative-assessment">preoperative assessment</Link>).
      </li>
    </ul>

    <h2>Exam points</h2>
    <ul>
      <li>First described by Saklad in 1941; the modern grading was published in 1963, and ASA VI was added later.</li>
      <li>Children and pregnancy have their own ASA example lists; pregnancy itself is ASA II.</li>
      <li>ASA grade is recorded in UK national audits (e.g. NELA, NAP) and forms part of several composite risk scores.</li>
    </ul>
  </NoteLayout>
);

export default AsaClassificationNote;
