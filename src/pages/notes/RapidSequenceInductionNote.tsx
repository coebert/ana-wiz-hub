import { Link } from "react-router-dom";
import { NoteLayout } from "./NoteLayout";

const RapidSequenceInductionNote = () => (
  <NoteLayout
    slug="rapid-sequence-induction-drug-doses"
    title="Rapid sequence induction: drugs, doses and modifications"
    shortTitle="RSI drugs and doses"
    description="Rapid sequence induction: adult and paediatric drug doses, modifications for instability, sepsis, head injury and obstetrics, and modern cricoid pressure."
    datePublished="2026-06-18"
    examTags={["primary", "final"]}
    lede="Rapid sequence induction aims to minimise time to a protected airway while maintaining oxygenation. Preoxygenate, give a suitable induction agent and rapid-onset neuromuscular blocker, and confirm tracheal placement with sustained exhaled CO₂. Use gentle low-pressure mask ventilation if needed for oxygenation."
    faqs={[
      {
        q: "What are the standard adult RSI drugs?",
        a: "Induction: thiopentone 3–7 mg/kg or propofol 1.5–2.5 mg/kg (ketamine dosing must be adjusted to haemodynamic status; etomidate 0.3 mg/kg historically). Neuromuscular blocker: suxamethonium 1.0–1.5 mg/kg, or rocuronium 1.0–1.2 mg/kg. Sugammadex is a reversal option, not a substitute for front-of-neck access if intubation and oxygenation fail.",
      },
      {
        q: "When is rocuronium preferred over suxamethonium?",
        a: "Rocuronium is an option when suxamethonium is unsuitable, including susceptibility to malignant hyperthermia or clinically important hyperkalaemia risk. If intubation fails, prioritise rescue oxygenation. Declared CICO requires immediate emergency front-of-neck airway. OAA/DAS supports gentle facemask ventilation when needed in obstetric RSI and early release of cricoid pressure if it impedes airway management.",
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
      { label: "Local anaesthetic systemic toxicity (LAST)", to: "/notes/local-anaesthetic-systemic-toxicity-management" },
      { label: "ROTEM / TEG interpretation", to: "/notes/rotem-teg-interpretation" },
      { label: "Obstetric anaesthesia", to: "/clinical/obstetric-anaesthesia" },
    ]}
  >
    <h2>The canonical sequence</h2>
    <ol>
      <li><strong>Plan and prepare</strong> — assess airway, suction on, tilt available, drugs drawn up, monitoring attached, second IV access if possible, end-tidal CO₂ ready.</li>
      <li><strong>Pre-oxygenate</strong> — 3 minutes of tidal-volume breathing or 8 vital-capacity breaths on 100% O₂ with a tight-fitting mask. Aim for end-tidal oxygen ≥0.90 where possible. Consider apnoeic oxygenation with nasal O₂ at 15 L/min.</li>
      <li><strong>Position</strong> — ear-to-sternal-notch (ramped if obese), 20–30° head-up to reduce reflux.</li>
      <li><strong>Induction agent + <Link to="/pharmacology/muscle-relaxants">neuromuscular blocker</Link></strong> in immediate succession.</li>
      <li><strong>Apply cricoid pressure</strong> — 10 N awake, 30 N once asleep (or omit if departmental policy).</li>
      <li><strong>Maintain oxygenation.</strong> Use gentle low-pressure mask ventilation when needed and avoid high inflation pressures. Intubate, inflate the cuff and confirm placement with sustained <Link to="/physics/capnography">waveform capnography</Link>. Follow the <Link to="/notes/das-difficult-airway-algorithm">DAS algorithm</Link> if intubation fails.</li>
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
        <tr><td>Suxamethonium</td><td>1.0–1.5 mg/kg</td><td>Onset 45–60 s; 1.5 mg/kg in <Link to="/clinical/obstetric-anaesthesia">obstetrics</Link>.</td></tr>
        <tr><td>Rocuronium</td><td>1.0–1.2 mg/kg</td><td>Onset 60 s; <Link to="/notes/how-sugammadex-reverses-rocuronium">sugammadex 16 mg/kg</Link> can reverse it, but declared CICO still needs immediate front-of-neck access — do not delay for reversal.</td></tr>
      </tbody>
    </table>

    <h2>Common modifications</h2>
    <ul>
      <li><strong>Shocked patient:</strong> ketamine + rocuronium + reduced doses + vasopressor pre-drawn.</li>
      <li><strong>Head injury:</strong> thiopentone or propofol with fentanyl 2 µg/kg to obtund pressor response; maintain MAP &gt; 80 mmHg.</li>
      <li><strong>Caesarean birth:</strong> offer antacid prophylaxis and an acid-reducing medicine in accordance with NICE NG192 and local obstetric policy. Apply left uterine displacement when appropriate.</li>
      <li><strong>Paediatric:</strong> atropine 20 µg/kg pre-treatment in &lt; 1 y to blunt vagal response; suxamethonium 2 mg/kg in infants.</li>
    </ul>
    <p><a href="https://doi.org/10.1016/j.bja.2025.10.006">DAS 2025 adult intubation guideline, table 1</a> · <a href="https://www.nice.org.uk/guidance/ng192">NICE NG192</a></p>
  </NoteLayout>
);

export default RapidSequenceInductionNote;
