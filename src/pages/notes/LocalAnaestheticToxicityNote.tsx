import { Link } from "react-router-dom";
import { NoteLayout } from "./NoteLayout";

const LocalAnaestheticToxicityNote = () => (
  <NoteLayout
    slug="local-anaesthetic-systemic-toxicity-management"
    title="Local anaesthetic systemic toxicity (LAST) management"
    shortTitle="LAST management"
    description="Local anaesthetic systemic toxicity (LAST): recognition, AAGBI Safety Guideline management, Intralipid 20% dosing, and prevention strategies."
    datePublished="2026-06-18"
    examTags={["primary", "final"]}
    lede="Local anaesthetic systemic toxicity (LAST) is a life-threatening complication of regional anaesthesia: CNS excitation followed by cardiovascular collapse from sodium-channel block in the myocardium. The Association of Anaesthetists Quick Reference Handbook (3-10, 2023) is the current UK reference and mandates immediate 20% lipid emulsion as part of resuscitation."
    faqs={[
      {
        q: "What is the maximum dose of lidocaine and bupivacaine?",
        a: "There is no single agent-wide maximum — use the named product, technique and route table. For example, lidocaine 1% plain is limited to 4.5 mg/kg and 300 mg per single dose, and with a vasoconstrictor to 7 mg/kg and 500 mg; the named bupivacaine field-block table limits 2 mg/kg and 150 mg; levobupivacaine infiltration 150 mg; prilocaine 1% has a 400 mg adult maximum and no adult mg/kg figure. No universal ropivacaine maximum is inferred. Calculate against lean body weight, use the lowest effective dose, and reduce in the elderly, pregnant and hepatically impaired.",
      },
      {
        q: "What is the Intralipid 20% dose in LAST?",
        a: "Bolus 1.5 mL/kg lean body weight over 2–3 minutes (≈ 100 mL in a 70 kg adult), followed by an infusion of 15 mL/kg/h. Give the same bolus again at 5 and 10 minutes and double the infusion rate to 30 mL/kg/h if the circulation is not restored. Maximum cumulative dose 12 mL/kg (≈ 840 mL in a 70 kg adult).",
      },
      {
        q: "What are the early warning signs of LAST?",
        a: "Circumoral or tongue numbness, metallic taste, tinnitus, visual disturbance, agitation, drowsiness — followed by seizures, then loss of consciousness. Cardiovascular signs (hypertension/tachycardia → bradycardia → arrhythmia → cardiac arrest) may occur without a CNS prodrome, particularly with bupivacaine and after intravascular bolus.",
      },
      {
        q: "How does LAST cardiac arrest differ from a standard arrest?",
        a: "Bupivacaine-induced asystole is notoriously resistant to standard ALS. Adrenaline doses should be reduced to ≤ 1 µg/kg, vasopressin is not recommended, and lidocaine is avoided. Amiodarone is used for ventricular arrhythmias. Prolonged resuscitation (at least 60 minutes) and consideration of VA-ECMO are justified.",
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

    <h2>Immediate management (Association of Anaesthetists QRH 3-10, 2023)</h2>
    <ol>
      <li>Stop injecting LA. Call for help. ABC, 100% O₂, secure the airway.</li>
      <li>Treat seizures with a small dose of benzodiazepine, thiopentone or propofol — avoid large propofol doses (cardiovascular depression).</li>
      <li>If cardiac arrest: start CPR with reduced adrenaline (≤ 1 µg/kg) and avoid vasopressin and lidocaine; amiodarone is used for ventricular arrhythmias.</li>
      <li>
        <strong>20% lipid emulsion</strong>: 1.5 mL/kg over 2–3 min, then
        15 mL/kg/h. Repeat the same bolus at 5 and 10 min and double the
        infusion to 30 mL/kg/h if the circulation is not restored. Maximum
        cumulative dose 12 mL/kg.
      </li>
      <li>Continue CPR throughout. Consider VA-ECMO early.</li>
      <li>Monitor in critical care for at least 12 hours — recurrence has been reported.</li>
    </ol>

    <h2>Prevention</h2>
    <ul>
      <li>Check the named product, technique and route table against lean body weight before drawing up — the <Link to="/tools/max-local-anaesthetic-dose">local anaesthetic product-limit calculator</Link> shows the product's own ceiling and refuses combinations it does not cover.</li>
      <li>Use ultrasound guidance and incremental injection (3–5 mL aliquots) with intermittent aspiration — covered in the <Link to="/clinical/regional-anaesthesia">regional anaesthesia topic</Link>.</li>
      <li>Test dose with adrenaline-containing solution if not contraindicated.</li>
      <li>Continuous verbal contact with the patient to detect early CNS symptoms.</li>
      <li>Display the Association of Anaesthetists QRH 3-10 LAST page on every block trolley alongside 20% lipid emulsion. See <Link to="/pharmacology/local-anaesthetics">local anaesthetic pharmacology</Link> for agent-specific safety margins.</li>
    </ul>
  </NoteLayout>
);

export default LocalAnaestheticToxicityNote;
