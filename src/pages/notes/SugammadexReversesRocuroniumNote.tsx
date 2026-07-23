import { Link } from "react-router-dom";
import { NoteLayout } from "./NoteLayout";

const SugammadexReversesRocuroniumNote = () => (
  <NoteLayout
    slug="how-sugammadex-reverses-rocuronium"
    title="How does sugammadex reverse rocuronium?"
    shortTitle="Sugammadex reversal of rocuronium"
    description="How sugammadex encapsulates rocuronium: 1:1 cyclodextrin chemistry, dosing by TOF/PTC, contraceptive failure, and when to choose neostigmine instead."
    datePublished="2026-06-13"
    lede="Sugammadex is a modified γ-cyclodextrin that wraps around rocuronium (and vecuronium) in a 1:1 inclusion complex, removing free drug from plasma and reversing neuromuscular block within 2–3 minutes — at any depth, including immediately after a 1.2 mg/kg RSI dose."
    faqs={[
      {
        q: "Can sugammadex reverse rocuronium that has only just been given?",
        a: "Yes. Sugammadex 16 mg/kg will reverse a 1.2 mg/kg rocuronium intubating dose within 2–3 minutes, even before twitches return (post-tetanic count of 0). This is the basis for using sugammadex as a rescue strategy after a failed RSI when rocuronium has been chosen instead of suxamethonium.",
      },
      {
        q: "Why doesn't sugammadex reverse atracurium or cisatracurium?",
        a: "Sugammadex's hydrophobic cavity is shaped to fit the aminosteroid skeleton (rocuronium, vecuronium, pancuronium). Benzylisoquinolinium agents — atracurium, cisatracurium, mivacurium — have a different molecular geometry and are not encapsulated, so sugammadex is ineffective. Reverse these with neostigmine, or wait for spontaneous offset (Hofmann elimination for atracurium/cisatracurium).",
      },
      {
        q: "How long does sugammadex affect hormonal contraception?",
        a: "Sugammadex also binds progestogens. Manufacturers recommend treating a single dose as the equivalent of one missed combined or progestogen-only pill: continue the pill normally and use additional non-hormonal contraception for the next 7 days. Patients with an implant, depot injection or IUS only need additional precautions if the dose was within the relevant high-risk window.",
      },
      {
        q: "When should I still use neostigmine?",
        a: "Neostigmine remains appropriate for routine reversal of shallow non-depolarising block (TOF count ≥ 2, ideally ≥ 4) — particularly with benzylisoquinoliniums, in cost-sensitive settings, or where sugammadex is unavailable. Always co-administer an antimuscarinic (glycopyrrolate or atropine) and confirm reversal with quantitative TOF ≥ 0.9.",
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
        <strong>16 mg/kg</strong> — immediate reversal after a 1.2 mg/kg
        rocuronium intubating dose (the “can't intubate, can't oxygenate”
        scenario).
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
      caution is warranted in severe renal impairment (eGFR &lt; 30) where
      manufacturer data are limited. If re-paralysis is needed within 24 hours,
      use a non-aminosteroid (cisatracurium or atracurium — see the <Link to="/pharmacology/muscle-relaxants">muscle relaxants topic</Link>) or a much larger
      <Link to="/pharmacology/rocuronium"> rocuronium</Link> dose (1.2 mg/kg).
    </p>

    <h2>Safety profile</h2>
    <p>
      The most clinically important adverse effects are anaphylaxis (~1:2 500,
      typically within 5 minutes of dosing) and bradycardia (rare but reported
      including cardiac arrest). Sugammadex also binds hormonal contraceptive
      progestogens; counsel patients to treat a dose as one missed pill and use
      additional non-hormonal precautions for seven days.
    </p>
  </NoteLayout>
);

export default SugammadexReversesRocuroniumNote;
