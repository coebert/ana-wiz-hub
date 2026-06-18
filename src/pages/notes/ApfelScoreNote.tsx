import { Link } from "react-router-dom";
import { NoteLayout } from "./NoteLayout";

const ApfelScoreNote = () => (
  <NoteLayout
    slug="apfel-score-ponv-risk"
    title="Apfel score: predicting postoperative nausea and vomiting risk"
    shortTitle="Apfel score for PONV"
    description="The four-item Apfel score predicts postoperative nausea and vomiting risk. The variables, the 10/20/40/60/80% risk gradient, and how it maps to multimodal antiemetic prophylaxis."
    datePublished="2026-06-18"
    examTags={["primary", "final"]}
    lede="The Apfel score is a four-item bedside predictor of postoperative nausea and vomiting (PONV) in adults. Each present risk factor adds one point and shifts the predicted 24-hour PONV risk from 10% (zero factors) to 80% (all four)."
    faqs={[
      {
        q: "What are the four Apfel risk factors?",
        a: "Female sex, non-smoker, history of PONV or motion sickness, and planned postoperative opioids. Each scores one point.",
      },
      {
        q: "How does the Apfel score map to PONV risk?",
        a: "0 factors ~10%, 1 factor ~20%, 2 factors ~40%, 3 factors ~60%, 4 factors ~80% over the first 24 hours after anaesthesia.",
      },
      {
        q: "How many antiemetics should I give for each risk band?",
        a: "Society for Ambulatory Anesthesia (SAMBA) 2020 guidelines: 0–1 factors — one prophylactic agent (or none if very low risk); 2 factors — two agents from different drug classes; 3–4 factors — three or four agents plus a TIVA technique and minimising opioids.",
      },
      {
        q: "Does the Apfel score apply to children?",
        a: "No — use the Eberhart score in children: age ≥ 3 years, surgery ≥ 30 minutes, strabismus surgery, and family/personal history of POV. Postoperative vomiting (POV) rather than nausea is the primary endpoint because young children cannot reliably report nausea.",
      },
    ]}
    related={[
      { label: "Antiemetics — full topic", to: "/pharmacology/antiemetics" },
      { label: "Day-case anaesthesia", to: "/clinical/day-surgery" },
      { label: "TIVA — total intravenous anaesthesia", to: "/clinical/tiva" },
      { label: "Pharmacokinetics", to: "/pharmacology/pharmacokinetics" },
    ]}
  >
    <h2>Why predict PONV at all?</h2>
    <p>
      PONV is the single biggest patient-rated complaint after anaesthesia and
      a leading cause of unplanned admission after <Link to="/clinical/day-surgery">day surgery</Link>.
      It prolongs recovery, predisposes to wound dehiscence and aspiration, and is highly
      preventable. The Apfel score's value is that it lets you scale
      antiemetic prophylaxis to risk rather than treating everyone the same.
    </p>

    <h2>The four variables</h2>
    <ul>
      <li><strong>Female sex</strong> — the strongest single predictor.</li>
      <li><strong>Non-smoker</strong> — chronic nicotine exposure induces hepatic enzymes and downregulates 5-HT₃ receptors.</li>
      <li><strong>History of PONV or motion sickness</strong> — captures individual susceptibility.</li>
      <li><strong>Anticipated postoperative opioids</strong> — opioids stimulate the chemoreceptor trigger zone and delay gastric emptying.</li>
    </ul>

    <h2>Risk-stratified prophylaxis</h2>
    <p>
      Each antiemetic from a different drug class reduces relative PONV risk
      by about 26%, and effects are roughly additive when classes are
      combined. The 2020 SAMBA consensus matrix:
    </p>
    <ul>
      <li><strong>Low risk (0–1):</strong> single agent (often dexamethasone at induction).</li>
      <li><strong>Moderate risk (2):</strong> dexamethasone 4–8 mg IV + ondansetron 4 mg IV at end of surgery.</li>
      <li><strong>High risk (3–4):</strong> add a third agent (droperidol 0.625–1.25 mg IV or aprepitant 40 mg PO) and consider <Link to="/clinical/tiva">TIVA with propofol</Link> plus opioid-sparing analgesia (<Link to="/clinical/regional-anaesthesia">regional</Link>, paracetamol, <Link to="/pharmacology/nsaids-paracetamol">NSAIDs</Link>).</li>
    </ul>

    <h2>Beyond the score</h2>
    <p>
      The Apfel score is not exhaustive. Independent additional risk factors
      include young adult age, duration of anaesthesia, volatile vs propofol
      maintenance, and laparoscopic, gynaecological, middle-ear, or
      strabismus surgery. Treat these as score-modifiers when deciding
      between two- and three-agent prophylaxis.
    </p>
  </NoteLayout>
);

export default ApfelScoreNote;
