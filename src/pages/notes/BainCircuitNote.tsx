import { Link } from "react-router-dom";
import { NoteLayout } from "./NoteLayout";

const BainCircuitNote = () => (
  <NoteLayout
    slug="bain-circuit-fresh-gas-flow"
    title="Bain circuit: fresh gas flow for spontaneous and controlled ventilation"
    shortTitle="Bain circuit fresh gas flow"
    description="The Bain is a co-axial Mapleson D breathing system. Fresh gas flow requirements for spontaneous and controlled ventilation, the Pethick test, and how to scavenge safely."
    datePublished="2026-06-18"
    examTags={["primary"]}
    lede="The Bain is a co-axial Mapleson D circuit: fresh gas runs in an inner tube to the patient end, expired gas returns down the outer tube to the reservoir bag and APL valve at the machine end. It is light, easy to scavenge and well-suited to head-and-neck surgery — provided fresh gas flow is set correctly for the mode of ventilation."
    faqs={[
      {
        q: "What fresh gas flow does the Bain need for spontaneous ventilation?",
        a: "Approximately 150–200 mL/kg/min, or 1.5–2× minute ventilation. The fresh gas inlet is at the patient end, so during expiration the corrugated tubing fills with a mixture of fresh and expired gas. A high FGF is needed to wash dead-space gas back before the next inspiration.",
      },
      {
        q: "And for controlled ventilation?",
        a: "Approximately 70 mL/kg/min, or roughly equal to alveolar minute ventilation. With IPPV the long expiratory pause allows fresh gas to wash CO₂ down the corrugated tubing toward the bag and APL valve, so less flow is needed. This is the efficient mode for the Bain.",
      },
      {
        q: "What is the Pethick test?",
        a: "A pre-use safety check for the inner tube of a co-axial Bain. Occlude the patient end with a finger, set 5 L/min fresh gas flow, and press the oxygen flush. Sudden gas flow through the outer tube causes a Venturi effect at the patient end that collapses the reservoir bag. If the inner tube is disconnected or kinked, the bag does not collapse. A failed Pethick = do not use.",
      },
      {
        q: "What are the advantages of the Bain over a circle system?",
        a: "Light, single-tube, easy to position away from the surgical field, simple to scavenge, no CO₂ absorber needed. Disadvantages: high FGF for spontaneous ventilation (wasteful, environmentally and financially), and the inner tube cannot be visually inspected — hence the mandatory Pethick test.",
      },
    ]}
    related={[
      { label: "Mapleson breathing systems explained", to: "/notes/mapleson-breathing-systems-explained" },
      { label: "Anaesthetic equipment & monitoring", to: "/physics/equipment-monitoring" },
      { label: "Breathing circuits — full topic", to: "/physics/breathing-circuits" },
      { label: "Capnography", to: "/physics/capnography" },
    ]}
  >
    <h2>Anatomy of the circuit</h2>
    <p>
      The Bain is a 1.8 m co-axial tube. The inner tube (small bore, ~7 mm)
      carries fresh gas from the machine to the patient end. The outer
      corrugated tube (large bore, ~22 mm) carries expired gas back to the
      reservoir bag and APL valve at the machine end. The inner tube has
      higher resistance and lower compliance than the outer tube; the
      reservoir bag acts as a buffer.
    </p>

    <h2>Why Mapleson D is efficient for IPPV</h2>
    <p>
      With positive-pressure ventilation, a long expiratory pause lets
      fresh gas push expired gas down the tubing toward the bag and APL
      valve. By the end of expiration the patient-end tubing contains
      mostly fresh gas, so the next inspiration delivers it. With
      spontaneous ventilation the expiratory pause is shorter and fresh
      gas mixes more with expired gas before the next breath — hence the
      higher FGF needed.
    </p>

    <h2>Safety checks and pitfalls</h2>
    <ul>
      <li><strong>Pethick test</strong> before every use to confirm inner-tube patency.</li>
      <li><strong>Capnography</strong> from the start — rising baseline CO₂ suggests inadequate FGF or inner-tube disconnection.</li>
      <li><strong>Avoid kinks</strong> in the inner tube during surgical-field draping.</li>
      <li><strong>Beware of barotrauma</strong> if the outer tube is occluded — the inner tube can deliver high pressure directly.</li>
    </ul>
  </NoteLayout>
);

export default BainCircuitNote;
