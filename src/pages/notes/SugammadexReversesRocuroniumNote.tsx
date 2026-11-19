import { Link } from "react-router-dom";
import { NoteLayout } from "./NoteLayout";

const SugammadexReversesRocuroniumNote = () => (
  <NoteLayout
    slug="how-sugammadex-reverses-rocuronium"
    title="How does sugammadex reverse rocuronium?"
    shortTitle="Sugammadex reversal of rocuronium"
    description="How sugammadex encapsulates rocuronium: 1:1 cyclodextrin chemistry, dosing by TOF/PTC, contraceptive failure, and when to choose neostigmine instead."
    datePublished="2026-06-13"
    lede="Sugammadex binds rocuronium or vecuronium in a 1:1 complex. Dose depends on the drug, depth of block and urgency. Confirm recovery with quantitative monitoring and maintain ventilation until adequate breathing returns."
    faqs={[
      {
        q: "Can sugammadex reverse rocuronium that has only just been given?",
        a: "In adults needing immediate reversal after rocuronium 1.2 mg/kg, the licensed sugammadex dose is 16 mg/kg. Reversal does not guarantee a patent airway. With declared CICO, maintain paralysis and proceed immediately to emergency front-of-neck airway.",
      },
      {
        q: "Why doesn't sugammadex reverse atracurium or cisatracurium?",
        a: "Sugammadex's hydrophobic cavity is shaped to fit the aminosteroid skeleton (rocuronium, vecuronium, pancuronium). Benzylisoquinolinium agents — atracurium, cisatracurium, mivacurium — have a different molecular geometry and are not encapsulated, so sugammadex is ineffective. Reverse these with neostigmine, or wait for spontaneous offset (Hofmann elimination for atracurium/cisatracurium).",
      },
      {
        q: "How long does sugammadex affect hormonal contraception?",
        a: "For oral hormonal contraception, follow the missed-dose instructions for that pill. With non-oral hormonal contraception, use an additional non-hormonal method for seven days and follow the advice in the contraceptive product leaflet.",
      },
      {
        q: "When should I still use neostigmine?",
        a: "For neostigmine reversal, ESAIC recommends waiting for advanced spontaneous recovery (quantitative TOF ratio above 0.2). Give an antimuscarinic and continue quantitative monitoring until the TOF ratio exceeds 0.9. Sugammadex does not reverse benzylisoquinolinium block.",
      },
    ]}
    related={[
      { label: "Muscle relaxants — full topic", to: "/pharmacology/muscle-relaxants" },
      { label: "Rocuronium — drug page", to: "/pharmacology/rocuronium" },
      { label: "Suxamethonium vs rocuronium for RSI", to: "/pharmacology/suxamethonium-vs-rocuronium" },
      { label: "Neuromuscular junction physiology", to: "/physiology/neuromuscular" },
      { label: "TOF ratio ≥ 0.9 before extubation", to: "/notes/tof-ratio-before-extubation" },
    ]}
  >
    <h2>The 1:1 inclusion chemistry</h2>
    <p>
      Sugammadex is a synthetic <em>modified γ-cyclodextrin</em>: a doughnut of
      eight α-1,4-linked glucose units whose inner cavity has been extended with
      eight thiocarboxyl side chains. The cavity is hydrophobic; the rim is
      hydrophilic. Rocuronium's steroid nucleus slides head-first into the
      cavity, and the negatively charged side chains form electrostatic bonds
      with rocuronium's positively charged quaternary nitrogen at the rim. The
      result is a 1:1 inclusion complex with a binding affinity (~10⁷ M⁻¹) high
      enough to be effectively irreversible at clinical concentrations.
    </p>
    <p>
      The complex is pharmacologically inert, water-soluble, and cleared
      unchanged in urine. Because rocuronium is bound in plasma, the
      concentration of free drug falls, the neuromuscular-junction equilibrium
      shifts off the receptor, and tissue rocuronium is rapidly pulled back into
      plasma to be encapsulated. The clinical effect — restoration of
      neuromuscular transmission — is seen within 2–3 minutes regardless of
      block depth.
    </p>

    <h2>Dosing by depth of block</h2>
    <p>
      The dose scales to how much rocuronium needs encapsulating, judged by
      objective neuromuscular monitoring at the adductor pollicis:
    </p>
    <ul>
      <li>
        <strong>2 mg/kg</strong> — moderate block, reappearance of the second
        twitch (T2) on train-of-four (TOF).
      </li>
      <li>
        <strong>4 mg/kg</strong> — deep block, post-tetanic count (PTC) 1–2 with
        no TOF response.
      </li>
      <li>
        <strong>16 mg/kg</strong> — adult immediate reversal after rocuronium 1.2 mg/kg. In declared CICO, maintain paralysis and proceed immediately to emergency front-of-neck airway.
      </li>
    </ul>
    <p>
      Always confirm reversal objectively with a <Link to="/notes/tof-ratio-before-extubation">TOF ratio ≥ 0.9</Link> before
      extubation. Clinical signs such as head-lift or sustained handgrip are
      insensitive to the residual block that drives postoperative pulmonary
      complications — the underlying receptor reserve is explained in <Link to="/physiology/neuromuscular">neuromuscular junction physiology</Link>.
    </p>

    <h2>Onset, offset and re-paralysis</h2>
    <p>
      Onset of effect is essentially as fast as the circulation time — typically
      90–120 seconds to TOF ratio ≥ 0.9. The complex is renally cleared, so
      the manufacturer advises against use in severe renal impairment (creatinine clearance below 30 mL/min). The interval before repeat rocuronium or vecuronium depends on the preceding sugammadex dose, renal function and the planned blocker dose. Follow the product information. If a blocker is needed before the recommended interval, use an appropriate non-steroidal agent.
    </p>

    <h2>Safety profile</h2>
    <p>
      The most clinically important adverse effects are anaphylaxis (~1:2 500,
      typically within 5 minutes of dosing) and bradycardia (rare but reported
      including cardiac arrest). For oral hormonal contraception follow the pill’s missed-dose guidance. For non-oral hormonal methods, use additional non-hormonal contraception for seven days.
    </p>
    <p><a href="https://www.medicines.org.uk/emc/product/100033/smpc">UK sugammadex SmPC</a> · <a href="https://doi.org/10.1016/j.bja.2025.10.006">DAS adult airway guideline</a> · <a href="https://pubmed.ncbi.nlm.nih.gov/36377554/">ESAIC neuromuscular blockade guideline</a></p>
  </NoteLayout>
);

export default SugammadexReversesRocuroniumNote;
