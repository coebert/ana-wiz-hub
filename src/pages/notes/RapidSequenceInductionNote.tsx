import { Link } from "react-router-dom";
import { NoteLayout } from "./NoteLayout";

const RapidSequenceInductionNote = () => (
  <NoteLayout
    slug="rapid-sequence-induction-drug-doses"
    title="Rapid sequence induction: drugs, doses and modifications"
    shortTitle="RSI drugs and doses"
    description="Rapid sequence induction (RSI) — adult and paediatric drug doses, modifications for haemodynamic instability, sepsis, head injury and obstetrics, and the modern role of cricoid pressure."
    datePublished="2026-06-18"
    examTags={["primary", "final"]}
    lede="Rapid sequence induction is the standard technique for protecting the airway in any patient at increased aspiration risk: pre-oxygenation, a rapid-onset induction agent, a rapid-onset neuromuscular blocker, no positive-pressure ventilation until the tube is in place, and confirmation with capnography."
    faqs={[
      {
        q: "What are the standard adult RSI drugs?",
        a: "Induction: thiopentone 3–7 mg/kg or propofol 1.5–2.5 mg/kg (ketamine 1–2 mg/kg in shock; etomidate 0.3 mg/kg historically). Neuromuscular blocker: suxamethonium 1.0–1.5 mg/kg, or rocuronium 1.0–1.2 mg/kg if sugammadex is immediately available for rescue.",
      },
      {
        q: "When is rocuronium preferred over suxamethonium?",
        a: "Sux contraindications: hyperkalaemia, major burns > 24 h old, prolonged immobility, denervation injury, neuromuscular disease (MG, myotonia), suspected MH, malignant pseudocholinesterase deficiency. Rocuronium 1.2 mg/kg gives comparable intubating conditions at 60 s with sugammadex 16 mg/kg as the rescue option for can't-intubate-can't-oxygenate.",
      },
      {
        q: "Is cricoid pressure still indicated?",
        a: "Practice has shifted. AAGBI 2015 and DAS 2015 retain cricoid pressure as part of the standard adult RSI but mandate releasing it immediately if intubation is difficult or if it impairs view at laryngoscopy. The 2019 IRIS trial found no difference in pulmonary aspiration with or without cricoid pressure. Most UK departments still teach it for completeness, with low threshold to release.",
      },
      {
        q: "How do you modify RSI in obstetrics and major haemorrhage?",
        a: "Obstetric RSI: full pre-oxygenation, left lateral tilt, smaller dose of induction agent (thiopentone 4 mg/kg), suxamethonium 1.5 mg/kg, ramped position. Shock/haemorrhage: ketamine 1–2 mg/kg preserves sympathetic tone; reduce induction-agent dose by ~50%; consider rocuronium for prolonged paralysis; have vasopressors drawn up.",
      },
    ]}
    related={[
      { label: "Airway management — full topic", to: "/clinical/airway-management" },
      { label: "DAS difficult airway algorithm", to: "/notes/das-difficult-airway-algorithm" },
      { label: "Sugammadex reversal of rocuronium", to: "/notes/how-sugammadex-reverses-rocuronium" },
      { label: "Obstetric anaesthesia", to: "/clinical/obstetric-anaesthesia" },
    ]}
  >
    <h2>The canonical sequence</h2>
    <ol>
      <li><strong>Plan and prepare</strong> — assess airway, suction on, tilt available, drugs drawn up, monitoring attached, second IV access if possible, end-tidal CO₂ ready.</li>
      <li><strong>Pre-oxygenate</strong> — 3 minutes of tidal-volume breathing or 8 vital-capacity breaths on 100% O₂ with a tight-fitting mask. Aim FetO₂ &gt; 0.85. Consider apnoeic oxygenation with nasal O₂ at 15 L/min.</li>
      <li><strong>Position</strong> — ear-to-sternal-notch (ramped if obese), 20–30° head-up to reduce reflux.</li>
      <li><strong>Induction agent + neuromuscular blocker</strong> in immediate succession.</li>
      <li><strong>Apply cricoid pressure</strong> — 10 N awake, 30 N once asleep (or omit if departmental policy).</li>
      <li><strong>Intubate without bag-mask ventilation</strong>, confirm with capnography, inflate cuff, secure.</li>
      <li><strong>Release cricoid</strong> after tube confirmed and cuff up.</li>
    </ol>

    <h2>Standard drug doses</h2>
    <table>
      <thead>
        <tr><th>Drug</th><th>Adult IV dose</th><th>Notes</th></tr>
      </thead>
      <tbody>
        <tr><td>Thiopentone</td><td>3–7 mg/kg</td><td>Onset ~30 s. Halve dose in shock.</td></tr>
        <tr><td>Propofol</td><td>1.5–2.5 mg/kg</td><td>Marked hypotension; halve in elderly/shock.</td></tr>
        <tr><td>Ketamine</td><td>1–2 mg/kg</td><td>Preserves BP; agent of choice in shock.</td></tr>
        <tr><td>Etomidate</td><td>0.3 mg/kg</td><td>Adrenal suppression — avoid in sepsis.</td></tr>
        <tr><td>Suxamethonium</td><td>1.0–1.5 mg/kg</td><td>Onset 45–60 s; 1.5 mg/kg in obstetrics.</td></tr>
        <tr><td>Rocuronium</td><td>1.0–1.2 mg/kg</td><td>Onset 60 s; reverse with sugammadex 16 mg/kg.</td></tr>
      </tbody>
    </table>

    <h2>Common modifications</h2>
    <ul>
      <li><strong>Shocked patient:</strong> ketamine + rocuronium + reduced doses + vasopressor pre-drawn.</li>
      <li><strong>Head injury:</strong> thiopentone or propofol with fentanyl 2 µg/kg to obtund pressor response; maintain MAP &gt; 80 mmHg.</li>
      <li><strong>Obstetric:</strong> as above; antacid (ranitidine + sodium citrate); left lateral tilt 15°.</li>
      <li><strong>Paediatric:</strong> atropine 20 µg/kg pre-treatment in &lt; 1 y to blunt vagal response; suxamethonium 2 mg/kg in infants.</li>
    </ul>
  </NoteLayout>
);

export default RapidSequenceInductionNote;
