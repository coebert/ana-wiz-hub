import { Link } from "react-router-dom";
import { NoteLayout } from "./NoteLayout";

const SevoVsDesfluraneNote = () => (
  <NoteLayout
    slug="sevoflurane-vs-desflurane-recovery"
    title="Sevoflurane vs desflurane: recovery and choice"
    shortTitle="Sevoflurane vs desflurane"
    description="Sevoflurane vs desflurane: blood–gas partition coefficients, emergence times, side effects, environmental impact, and when each is the better choice."
    datePublished="2026-06-18"
    examTags={["primary", "final"]}
    lede="Desflurane has a lower blood–gas partition coefficient (0.42 vs 0.65) than sevoflurane and therefore the faster emergence, but it costs ~20× more in CO₂-equivalent greenhouse impact and is being deselected across the UK. Knowing the pharmacokinetic, clinical and environmental trade-offs explains why."
    faqs={[
      {
        q: "Which agent has the faster emergence?",
        a: "Desflurane, marginally. In adults with anaesthesia of < 2 hours the difference in time to eye-opening is 1–3 minutes; in obese patients and longer cases the advantage widens (the lower fat solubility means less accumulation). For day surgery in lean adults the difference is usually clinically negligible.",
      },
      {
        q: "Why is desflurane being phased out in the UK?",
        a: "Desflurane has a global warming potential ~2540× that of CO₂ over 100 years — about 20× higher than sevoflurane and 5× isoflurane. NHS England's Net Zero strategy committed to decommissioning desflurane from all hospitals by early 2024 except where clinically essential, and most trusts have now removed it from anaesthetic machines.",
      },
      {
        q: "Does sevoflurane really cause renal injury via Compound A?",
        a: "Compound A is produced when sevoflurane reacts with desiccated CO₂ absorbents (especially baralyme). Nephrotoxicity has been demonstrated in rats but never convincingly in humans, even at low fresh gas flows. UK practice considers low-flow sevoflurane safe; nevertheless, current circle-system absorbents (lithium hydroxide, Amsorb Plus) produce negligible Compound A.",
      },
      {
        q: "Which agent is better for inhalational induction?",
        a: "Sevoflurane. It is non-pungent, well-tolerated, and is the only volatile licensed for paediatric inhalational induction in the UK. Desflurane is highly pungent, causes coughing, breath-holding and laryngospasm in light planes, and must never be used for inhalational induction.",
      },
    ]}
    related={[
      { label: "Volatile agents — full topic", to: "/pharmacology/volatile-agents" },
      { label: "Vaporisers (Tec 5/6/7)", to: "/physics/vaporisers" },
      { label: "MAC for age formula", to: "/notes/mac-for-age-formula" },
      { label: "TIVA — total intravenous anaesthesia", to: "/clinical/tiva" },
      { label: "Context-sensitive half-time: propofol vs remifentanil", to: "/notes/context-sensitive-half-time-propofol-vs-remifentanil" },
      { label: "Pharmacokinetics", to: "/pharmacology/pharmacokinetics" },
    ]}
  >
    <h2>Pharmacokinetic head-to-head</h2>
    <table>
      <thead>
        <tr><th>Property</th><th>Sevoflurane</th><th>Desflurane</th></tr>
      </thead>
      <tbody>
        <tr><td>Blood:gas coefficient</td><td>0.65</td><td>0.42</td></tr>
        <tr><td>MAC₄₀ (in O₂)</td><td>2.0%</td><td>6.0%</td></tr>
        <tr><td>Oil:gas coefficient</td><td>53</td><td>19</td></tr>
        <tr><td>SVP at 20°C</td><td>21 kPa</td><td>89 kPa</td></tr>
        <tr><td>Metabolism</td><td>3–5% (CYP2E1 → inorganic fluoride + HFIP)</td><td>0.02%</td></tr>
      </tbody>
    </table>

    <h2>Clinical differences that matter</h2>
    <ul>
      <li><strong>Induction:</strong> sevoflurane only.</li>
      <li><strong>Emergence:</strong> desflurane faster, especially in obese or long cases — see <Link to="/notes/mac-for-age-formula">MAC for age</Link> for emergence in elderly patients.</li>
      <li><strong>Cardiovascular:</strong> both reduce SVR; desflurane causes sympathetic stimulation if rapidly increased above 1 MAC (transient hypertension, tachycardia).</li>
      <li><strong>Airway:</strong> desflurane is pungent — avoid in light planes or with LMAs unless deep.</li>
      <li><strong>Vapouriser:</strong> desflurane needs a heated, pressurised <Link to="/physics/vaporisers">TEC 6</Link> because of its low boiling point (23.5°C).</li>
    </ul>

    <h2>Environmental footprint</h2>
    <p>
      Per MAC-hour, desflurane is responsible for ~440 kg CO₂-equivalent at
      2 L/min fresh gas flow — comparable to driving 1500 km. Sevoflurane is
      ~7 kg, isoflurane ~22 kg. Coupled with the marginal clinical
      advantage, this is the basis for NHS England's deselection and the
      Royal College's recommendation to default to low-flow sevoflurane or
      <Link to="/clinical/tiva"> TIVA</Link> wherever possible.
    </p>

    <h2>When to still use desflurane</h2>
    <p>
      Where rapid emergence carries genuine clinical benefit — long
      bariatric surgery, neurosurgery requiring early neurological
      assessment, and selected cases of morbid obesity. These should now be
      individually justified rather than routine.
    </p>
  </NoteLayout>
);

export default SevoVsDesfluraneNote;
