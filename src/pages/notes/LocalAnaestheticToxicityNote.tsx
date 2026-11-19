import { Link } from "react-router-dom";
import { NoteLayout } from "./NoteLayout";

const LocalAnaestheticToxicityNote = () => (
  <NoteLayout
    slug="local-anaesthetic-systemic-toxicity-management"
    title="Local anaesthetic systemic toxicity (LAST) management"
    shortTitle="LAST management"
    description="Local anaesthetic systemic toxicity (LAST): recognition, Association QRH 3-10 v2 management, lipid emulsion dosing, and prevention strategies."
    datePublished="2026-06-18"
    examTags={["primary", "final"]}
    lede="Local anaesthetic systemic toxicity (LAST) is a life-threatening complication of regional anaesthesia: CNS excitation followed by cardiovascular collapse from sodium-channel block in the myocardium. The Association of Anaesthetists QRH 3-10 v2 makes immediate lipid emulsion part of resuscitation."
    faqs={[
      {
        q: "What is the maximum safe dose of lidocaine and bupivacaine?",
        a: "There is no single universal maximum across formulations and routes. Use the named product label and the procedure: for example, UK lidocaine 2% (emc 15150) limits a single adult dose to 4.5 mg/kg and 300 mg, while Xylocaine with adrenaline (emc 2397) has a 500 mg adult ceiling. Named bupivacaine field-block/infiltration (emc 11611) limits 150 mg. These are not interchangeable with spinal, major nerve block or IVRA doses. Calculate against the labelled weight basis, use the lowest effective dose, and reduce in the elderly, pregnant and hepatically impaired.",
      },
      {
        q: "What is the Intralipid 20% dose in LAST?",
        a: "Bolus 1.5 mL/kg lean body weight over 2–3 minutes (≈ 100 mL in a 70 kg adult), followed by an infusion of 15 mL/kg/h. If circulation is not restored, give no more than two repeat boluses after 5 and 10 minutes; review ongoing instability and increase the infusion as directed by the QRH. Maximum cumulative dose 12 mL/kg (840 mL at 70 kg).",
      },
      {
        q: "What are the early warning signs of LAST?",
        a: "Circumoral or tongue numbness, metallic taste, tinnitus, visual disturbance, agitation, drowsiness — followed by seizures, then loss of consciousness. Cardiovascular signs (hypertension/tachycardia → bradycardia → arrhythmia → cardiac arrest) may occur without a CNS prodrome, particularly with bupivacaine and after intravascular bolus.",
      },
      {
        q: "How does LAST cardiac arrest differ from a standard arrest?",
        a: "Bupivacaine-induced asystole is notoriously resistant to standard ALS. Adrenaline doses should be reduced to ≤ 1 µg/kg, vasopressin is not recommended, and lidocaine and other class I antiarrhythmics are contraindicated. Amiodarone is preferred for ventricular arrhythmias. Prolonged resuscitation (≥ 60 minutes) and consideration of VA-ECMO are justified.",
      },
    ]}
    related={[
      { label: "Local anaesthetics — full topic", to: "/pharmacology/local-anaesthetics" },
      { label: "Maximum LA dose calculator", to: "/tools/max-local-anaesthetic-dose" },
      { label: "Paediatric maintenance fluids (4-2-1 rule)", to: "/notes/paediatric-maintenance-fluids-4-2-1-rule" },
      { label: "Regional anaesthesia — full topic", to: "/clinical/regional-anaesthesia" },
    ]}
  >
    <h2>Recognition</h2>
    <p>
      LAST is biphasic. CNS excitation (peri-oral numbness, tinnitus,
      agitation, seizures) precedes myocardial depression (bradycardia,
      arrhythmia, asystole). With bupivacaine the CNS prodrome may be
      absent and the first sign is sudden cardiovascular collapse — the
      "cardiac before convulsions" pattern that drove its withdrawal from
      Bier's blocks.
    </p>

    <h2>Immediate management (Association QRH 3-10 v2)</h2>
    <ol>
      <li>Stop injecting LA. Call for help. ABC, 100% O₂, secure the airway.</li>
      <li>Treat seizures with a small dose of benzodiazepine, thiopentone or propofol — avoid large propofol doses (cardiovascular depression).</li>
      <li>If cardiac arrest: start CPR with reduced adrenaline (≤ 1 µg/kg), avoid lidocaine and vasopressin.</li>
      <li>
        <strong>Lipid emulsion 20%</strong>: 1.5 mL/kg over 2–3 min, then
        15 mL/kg/h infusion. If circulation is not restored, give no more
        than two repeat boluses after 5 and 10 min; review ongoing
        instability and increase the infusion as directed by the QRH.
        Maximum total 12 mL/kg (840 mL at 70 kg).
      </li>
      <li>Continue CPR throughout. Consider VA-ECMO early.</li>
      <li>Monitor in critical care for at least 12 hours — recurrence has been reported. Monitor for pancreatitis after lipid rescue independently of whether propofol was used.</li>
    </ol>

    <h2>Prevention</h2>
    <ul>
      <li>Calculate maximum dose against lean body weight before drawing up — the <Link to="/tools/max-local-anaesthetic-dose">maximum LA dose calculator</Link> handles agent, adrenaline status and weight.</li>
      <li>Use ultrasound guidance and incremental injection (3–5 mL aliquots) with intermittent aspiration — covered in the <Link to="/clinical/regional-anaesthesia">regional anaesthesia topic</Link>.</li>
      <li>Test dose with adrenaline-containing solution if not contraindicated.</li>
      <li>Continuous verbal contact with the patient to detect early CNS symptoms.</li>
      <li>Display the Association QRH 3-10 v2 LAST guideline on every block trolley alongside lipid emulsion 20%. See <Link to="/pharmacology/local-anaesthetics">local anaesthetic pharmacology</Link> for agent-specific safety margins.</li>
    </ul>
  </NoteLayout>
);

export default LocalAnaestheticToxicityNote;
