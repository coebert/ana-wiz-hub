import { Link } from "react-router-dom";
import { NoteLayout } from "./NoteLayout";

const MacForAgeNote = () => (
  <NoteLayout
    slug="mac-for-age-formula"
    title="MAC for age formula: how to calculate age-adjusted MAC"
    shortTitle="MAC for age formula"
    description="How to calculate age-adjusted MAC: Mapleson formula MAC = MAC40 × 10^(−0.00269 × (age − 40)), with worked sevoflurane, isoflurane and desflurane values."
    datePublished="2026-06-18"
    examTags={["primary", "final"]}
    lede="MAC is the end-tidal concentration of a volatile agent that prevents movement to a standard surgical stimulus in 50% of patients. It falls by about 6% per decade after age 40 — the Mapleson age-adjustment formula lets you calculate age-adjusted MAC for sevoflurane, isoflurane or desflurane for the patient in front of you: MAC(age) = MAC₄₀ × 10^(−0.00269 × (age − 40))."
    faqs={[
      {
        q: "What is the Mapleson formula for MAC age adjustment?",
        a: "MAC at age = MAC₄₀ × 10^(−0.00269 × (age − 40)). In practice this is ~6% reduction per decade above 40. So sevoflurane MAC₄₀ of 2.0% becomes ~1.5% at 80 years.",
      },
      {
        q: "What is the MAC of common volatiles at age 40?",
        a: "Sevoflurane 2.0%, isoflurane 1.15%, desflurane 6.0%, nitrous oxide 105% (extrapolated under hyperbaric conditions). Halothane is 0.75% but is no longer in clinical use in the UK.",
      },
      {
        q: "What factors increase or decrease MAC?",
        a: "Decrease MAC: age, hypothermia, hyponatraemia, opioids, sedatives, α2-agonists, lithium, pregnancy, acute alcohol. Increase MAC: hyperthermia, chronic alcohol use, hypernatraemia, central stimulants (amphetamine, ephedrine), red hair. Sex, duration of anaesthesia, PaCO₂ within physiological range, and acid–base status have minimal effect.",
      },
      {
        q: "Why aim for 1.0 MAC age-adjusted rather than a fixed dial value?",
        a: "A fixed 2.0% sevoflurane is roughly 1.3 MAC in an 80-year-old, predisposing to hypotension, deeper-than-needed anaesthesia and prolonged emergence. Targeting an age-adjusted MAC keeps depth equivalent across patients and is the basis for the ASA/ESAIC Brain Health Initiative recommendation to maintain 0.7–1.3 MAC in the elderly.",
      },
    ]}
    related={[
      { label: "Volatile agents — full topic", to: "/pharmacology/volatile-agents" },
      { label: "MAC for age calculator", to: "/tools/mac-for-age" },
      { label: "Sevoflurane vs desflurane recovery", to: "/notes/sevoflurane-vs-desflurane-recovery" },
      { label: "Elderly anaesthesia", to: "/clinical/elderly-anaesthesia" },
      { label: "Depth of anaesthesia monitoring", to: "/physics/depth-of-anaesthesia" },
    ]}
  >
    <h2>What MAC actually measures</h2>
    <p>
      Minimum alveolar concentration is the end-tidal partial pressure at one
      atmosphere that prevents purposeful movement to a standardised skin
      incision in 50% of patients. It is an ED₅₀, not a depth-of-anaesthesia
      target. Clinical practice usually titrates to 1.2–1.3 MAC (ED₉₅) to
      account for the dose–response curve's slope.
    </p>

    <h2>The age-adjustment formula</h2>
    <p>
      Mapleson's 1996 meta-regression of human MAC data showed a log-linear
      decline with age, fitted by:
    </p>
    <p>
      <strong>MAC<sub>age</sub> = MAC<sub>40</sub> × 10<sup>−0.00269 × (age − 40)</sup></strong>
    </p>
    <p>
      A useful bedside approximation is a ~6% reduction per decade above 40,
      and a ~10% increase between age 1 and the peak around age 1–6 months.
      Neonates have a lower MAC than infants. The formula applies to every
      volatile agent and to nitrous oxide.
    </p>

    <h2>Why it matters clinically</h2>
    <p>
      Running an undiscounted 1 MAC dial setting in an 80-year-old delivers
      roughly 1.3 age-adjusted MAC. This drives intra-operative hypotension,
      contributes to postoperative delirium, and prolongs emergence — all
      tracked outcomes in the SNAP-2 and ENGAGES trials. The ASA and ESAIC
      now recommend titrating to age-adjusted MAC (0.7–1.3) with <Link to="/physics/depth-of-anaesthesia">depth
      monitoring</Link> in patients ≥ 65. See the <Link to="/clinical/elderly-anaesthesia">elderly anaesthesia topic</Link> for the wider geriatric perioperative bundle.
    </p>

    <h2>Practical numbers to remember</h2>
    <ul>
      <li>Sevoflurane: MAC₄₀ 2.0% → MAC₈₀ ≈ 1.5%</li>
      <li>Isoflurane: MAC₄₀ 1.15% → MAC₈₀ ≈ 0.85%</li>
      <li>Desflurane: MAC₄₀ 6.0% → MAC₈₀ ≈ 4.4%</li>
      <li>Add MAC values when agents are combined (e.g. 60% N₂O ≈ 0.57 MAC + 1.0% sevoflurane ≈ 0.5 MAC = 1.07 total MAC).</li>
    </ul>
  </NoteLayout>
);

export default MacForAgeNote;
