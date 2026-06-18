import { Link } from "react-router-dom";
import { NoteLayout } from "./NoteLayout";

const MaplesonBreathingSystemsNote = () => (
  <NoteLayout
    slug="mapleson-breathing-systems-explained"
    title="Mapleson breathing systems A to F: classification and fresh gas flow"
    shortTitle="Mapleson breathing systems"
    description="The Mapleson A–F classification of semi-closed breathing systems. Component order, fresh gas flow requirements for spontaneous and controlled ventilation, and which system is used when."
    datePublished="2026-06-18"
    examTags={["primary"]}
    lede="The Mapleson classification (1954) describes five — later six — semi-closed breathing systems by the arrangement of fresh gas inlet, reservoir bag, corrugated tubing and expiratory valve. The efficiency of each depends on the mode of ventilation."
    faqs={[
      {
        q: "Which Mapleson system is most efficient for spontaneous ventilation?",
        a: "Mapleson A (Magill, or its co-axial cousin the Lack). Fresh gas flow equal to alveolar minute ventilation (~70 mL/kg/min) is enough to prevent rebreathing because dead-space gas is vented through the expiratory valve before the next inspiration.",
      },
      {
        q: "Which is most efficient for controlled ventilation?",
        a: "Mapleson D (and its co-axial form, the Bain). With positive-pressure ventilation, fresh gas flow of 70 mL/kg/min — about one to two times minute ventilation — prevents rebreathing because the fresh gas inlet is at the patient end and washes dead-space gas down the tubing during expiration.",
      },
      {
        q: "Why are Mapleson C, E and F used in specific niches?",
        a: "Mapleson C (Waters' circuit) is compact and used for resuscitation / transfer; high fresh gas flows (~2× MV) are needed. Mapleson E (Ayre's T-piece) has no reservoir or valve — used historically for paediatric anaesthesia. Mapleson F (Jackson Rees modification) adds an open-ended reservoir bag to allow controlled ventilation and is still used for children < 20 kg.",
      },
      {
        q: "Is the Bain a Mapleson D?",
        a: "Yes — the Bain is a co-axial Mapleson D. Fresh gas runs in the inner tube to the patient end; expired gas returns down the outer tube to the bag and valve. It is light, easy to scavenge and useful for head-and-neck surgery, but the inner tube must be tested for disconnection (Pethick test) at every use.",
      },
    ]}
    related={[
      { label: "Bain circuit fresh gas flow", to: "/notes/bain-circuit-fresh-gas-flow" },
      { label: "Anaesthetic machine — full topic", to: "/physics/anaesthetic-machine" },
      { label: "Capnography interpretation", to: "/clinical/capnography" },
    ]}
  >
    <h2>The classification at a glance</h2>
    <p>
      All Mapleson systems share four components arranged in different
      orders: fresh gas inlet (FGI), reservoir bag (RB), corrugated tubing,
      and an adjustable pressure-limiting (APL or expiratory) valve. The
      sequence — and where the patient sits in it — determines whether fresh
      gas or expired gas reaches the valve first, and therefore the fresh
      gas flow (FGF) needed to prevent rebreathing.
    </p>

    <h2>System-by-system</h2>
    <ul>
      <li>
        <strong>A (Magill / Lack):</strong> FGI at the machine end, valve at
        the patient end. Best for spontaneous ventilation (FGF ≈ alveolar MV).
        Inefficient for IPPV.
      </li>
      <li>
        <strong>B and C:</strong> intermediate arrangements. C (Waters') is a
        bag-valve-mask analogue used for transfer; both need ~2× MV.
      </li>
      <li>
        <strong>D (Bain):</strong> FGI at the patient end, valve at the
        machine end. Best for IPPV (FGF ≈ 70 mL/kg/min). For spontaneous
        ventilation needs 1.5–2× MV.
      </li>
      <li>
        <strong>E (Ayre's T-piece):</strong> valveless, low resistance. Used
        for spontaneous ventilation in small children. FGF ≈ 2.5–3× MV.
      </li>
      <li>
        <strong>F (Jackson Rees):</strong> T-piece + open-ended bag, allows
        IPPV and visual chest-rise feedback. Standard for paediatric
        anaesthesia in children &lt; 20 kg before circle systems took over.
      </li>
    </ul>

    <h2>Why Mapleson matters in 2026</h2>
    <p>
      Most modern UK practice uses circle systems with CO₂ absorbers, which
      decouple fresh gas flow from rebreathing. But Maplesons remain in use
      for transfer (C), paediatric anaesthesia (F), and head-and-neck
      surgery where a co-axial Bain (D) keeps tubing out of the surgical
      field. The classification is also a perennial favourite of the FRCA
      Primary OSCE — knowing which system is efficient for which mode of
      ventilation is the high-yield take-home.
    </p>
  </NoteLayout>
);

export default MaplesonBreathingSystemsNote;
