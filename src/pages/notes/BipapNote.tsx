import { Link } from "react-router-dom";
import { NoteLayout } from "./NoteLayout";

const BipapNote = () => (
  <NoteLayout
    slug="bipap"
    title="BiPAP: how bilevel NIV works, indications and starting settings"
    shortTitle="BiPAP"
    description="BiPAP (bilevel non-invasive ventilation) explained: IPAP and EPAP, when to use it in hypercapnic respiratory failure, BTS starting settings, contraindications and signs of failure."
    datePublished="2026-09-24"
    examTags={["primary", "final", "fficm"]}
    lede="BiPAP (bilevel positive airway pressure) is non-invasive ventilation that delivers a higher pressure when the patient breathes in (IPAP) and a lower pressure when they breathe out (EPAP). The difference between the two is pressure support, which increases tidal volume and clears carbon dioxide. That makes BiPAP the main treatment for acute hypercapnic respiratory failure."
    faqs={[
      {
        q: "What is the difference between BiPAP and CPAP?",
        a: "CPAP gives one continuous pressure. It recruits alveoli and improves oxygenation but adds no ventilatory support, so it suits hypoxaemic failure such as cardiogenic pulmonary oedema or obstructive sleep apnoea. BiPAP adds inspiratory pressure support on top, so it also removes CO₂ and treats hypercapnic failure.",
      },
      {
        q: "When is BiPAP indicated?",
        a: "The main indication is acute hypercapnic respiratory failure, typically an exacerbation of COPD with pH below 7.35 and PaCO₂ above 6.5 kPa that persists despite optimal medical treatment (BTS/ICS). Other uses include obesity hypoventilation, neuromuscular disease and chest-wall deformity.",
      },
      {
        q: "What are typical starting BiPAP settings?",
        a: "BTS/ICS guidance suggests starting at EPAP 3–5 cmH₂O and IPAP 15 cmH₂O, then increasing IPAP by 2–5 cmH₂O every few minutes towards 20–30 cmH₂O over about 30 minutes as tolerated. Titrate oxygen to SpO₂ 88–92% and repeat the blood gas at 1 hour.",
      },
      {
        q: "What are the contraindications to BiPAP?",
        a: "Inability to protect the airway or a low conscious level (unless NIV is the agreed ceiling of care), copious secretions or vomiting, facial trauma or burns, fixed upper-airway obstruction, undrained pneumothorax, severe haemodynamic instability, and recent upper GI or airway surgery (relative).",
      },
    ]}
    related={[
      { label: "Mechanical ventilation — full topic", to: "/intensive-care/mechanical-ventilation" },
      { label: "Ventilator modes", to: "/physics/ventilator-modes" },
      { label: "Notes index", to: "/notes" },
    ]}
  >
    <h2>How the two pressures work</h2>
    <ul>
      <li>
        <strong>IPAP (inspiratory pressure)</strong>: on each breath the
        machine rises to IPAP. The <strong>pressure support</strong>{" "}
        (IPAP − EPAP) increases tidal volume, reduces the work of breathing and
        clears CO₂.
      </li>
      <li>
        <strong>EPAP (expiratory pressure)</strong>: works like PEEP. It keeps
        alveoli and the upper airway open, offsets intrinsic PEEP in COPD, and
        flushes exhaled CO₂ out of the mask through the exhalation port.
      </li>
      <li>Raising IPAP (with EPAP unchanged) lowers PaCO₂; raising EPAP mainly improves oxygenation.</li>
      <li>"BiPAP" is originally a brand name; "bilevel NIV" is the generic term.</li>
    </ul>

    <h2>Starting and monitoring (BTS/ICS approach)</h2>
    <ol>
      <li>Agree and document an escalation plan first: is intubation appropriate if NIV fails?</li>
      <li>Choose a well-fitting full-face mask.</li>
      <li>Start EPAP 3–5 cmH₂O and IPAP 15 cmH₂O, then increase IPAP towards 20–30 cmH₂O over about 30 minutes as tolerated.</li>
      <li>Titrate oxygen to SpO₂ 88–92% in COPD.</li>
      <li>Repeat the blood gas at 1 hour and at 4 hours, and after any change in settings.</li>
    </ol>

    <h2>Recognising failure</h2>
    <ul>
      <li>pH or PaCO₂ not improving, or worsening, at 1–4 hours despite optimal settings.</li>
      <li>Falling conscious level, exhaustion, or inability to tolerate the mask.</li>
      <li>Big leak or patient–ventilator asynchrony that cannot be corrected.</li>
      <li>Delaying intubation when NIV is failing worsens outcomes; escalate early if intubation is part of the plan.</li>
    </ul>

    <p>
      For invasive modes, lung-protective ventilation and weaning, see the{" "}
      <Link to="/intensive-care/mechanical-ventilation">mechanical ventilation topic</Link>.
    </p>
  </NoteLayout>
);

export default BipapNote;
