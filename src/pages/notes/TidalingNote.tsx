import { Link } from "react-router-dom";
import { NoteLayout } from "./NoteLayout";

const TidalingNote = () => (
  <NoteLayout
    slug="tidaling-chest-drain"
    title="Tidaling in a chest drain: what swinging and bubbling mean"
    shortTitle="Tidaling"
    description="Tidaling (swinging) in a chest drain explained: why the water level moves with breathing, why it reverses on a ventilator, what absent tidaling and bubbling mean, and safe drain checks."
    datePublished="2026-09-24"
    examTags={["primary", "final", "fficm"]}
    lede="Tidaling, also called swinging, is the rise and fall of the fluid level in a chest drain's underwater seal as the patient breathes. It shows the drain is open and connected to the pleural space. The fluid rises on spontaneous inspiration and falls on expiration, and the pattern reverses during positive-pressure ventilation."
    faqs={[
      {
        q: "Why does the water level rise on inspiration?",
        a: "On spontaneous inspiration intrapleural pressure becomes more negative. That pressure is transmitted along the tube, pulling the fluid column up towards the patient. On expiration the pressure becomes less negative and the level falls.",
      },
      {
        q: "Why is tidaling reversed on a ventilator?",
        a: "During positive-pressure ventilation, intrathoracic pressure rises on inspiration, so the fluid level falls on inspiration and rises on expiration.",
      },
      {
        q: "What does absent tidaling mean?",
        a: "Either the lung has fully re-expanded and sealed the drain tip, or there is a problem: the tube is kinked, clamped, blocked by clot or fibrin, or has slipped out of the pleural space. Continuous suction also damps the swing. Examine the patient and the tubing, and get a chest X-ray if unsure.",
      },
      {
        q: "What is the difference between tidaling and bubbling?",
        a: "Tidaling is movement of the fluid level and means the system is open to the pleura. Bubbling is air passing through the underwater seal and means there is an air leak. Bubbling on expiration or coughing suggests a resolving pneumothorax; continuous bubbling suggests a large or persistent leak (e.g. a bronchopleural fistula) or a leak in the drainage system.",
      },
    ]}
    related={[
      { label: "Thoracic anatomy — full topic", to: "/anatomy/thoracic-anatomy" },
      { label: "Cardiothoracic anaesthesia", to: "/clinical/cardiothoracic" },
      { label: "Mechanical ventilation", to: "/intensive-care/mechanical-ventilation" },
      { label: "Notes index", to: "/notes" },
    ]}
  >
    <h2>How the underwater seal works</h2>
    <p>
      The drain tube ends about 2–3 cm below water in the collection bottle.
      Air and fluid can leave the chest, but the water stops air being sucked
      back in: a one-way valve. The small depth keeps the resistance to
      drainage low. The pressure changes of breathing move the fluid in the
      tube, and that movement is tidaling.
    </p>

    <h2>Reading the drain</h2>
    <ul>
      <li><strong>Swinging present, no bubbling:</strong> the drain is open to the pleural space and there is no current air leak.</li>
      <li><strong>Bubbling on expiration or coughing:</strong> an ongoing, usually small air leak from the lung.</li>
      <li><strong>Continuous bubbling:</strong> a large or persistent leak (e.g. bronchopleural fistula), or a leak in the tubing or at the insertion site. Check the connections.</li>
      <li><strong>No swing, no bubbling:</strong> the lung has re-expanded, or the tube is blocked, kinked or displaced. Correlate with examination and a chest X-ray.</li>
      <li><strong>Large swing:</strong> big pressure changes in the chest, e.g. severe respiratory distress or a large residual space.</li>
    </ul>

    <h2>Safety rules</h2>
    <ul>
      <li>Keep the bottle upright and below the level of the chest at all times.</li>
      <li>Never clamp a bubbling drain: it can cause a tension pneumothorax.</li>
      <li>On suction the swing is damped, so assess tidaling with suction briefly off if safe.</li>
      <li>Digital drainage systems show the air leak as a number and replace watching the water level.</li>
      <li>Follow the BTS pleural disease guideline (2023) and local chest drain policy.</li>
    </ul>

    <p>
      For pleural anatomy and the safe triangle for drain insertion, see the{" "}
      <Link to="/anatomy/thoracic-anatomy">thoracic anatomy topic</Link>.
    </p>
  </NoteLayout>
);

export default TidalingNote;
