import { Link } from "react-router-dom";
import { NoteLayout } from "./NoteLayout";

const TofRatioExtubationNote = () => (
  <NoteLayout
    slug="tof-ratio-before-extubation"
    title="Why TOF ratio ≥ 0.9 before extubation?"
    shortTitle="TOF ratio ≥ 0.9 before extubation"
    description="Residual neuromuscular block is common, dangerous and invisible to clinical signs. Why quantitative train-of-four ratio ≥ 0.9 is the modern standard before extubation, and how to achieve it."
    datePublished="2026-06-18"
    examTags={["primary", "final"]}
    lede="A train-of-four (TOF) ratio less than 0.9 at the adductor pollicis is the strongest single predictor of postoperative pulmonary complications after non-depolarising neuromuscular block. Quantitative monitoring and reversal to a TOF ratio ≥ 0.9 is the standard recommended by AAGBI 2015, ASA 2023 and ESAIC 2023."
    faqs={[
      {
        q: "What is the TOF ratio?",
        a: "The ratio of the fourth twitch amplitude (T4) to the first (T1) after four supramaximal stimuli at 2 Hz to the ulnar nerve. With no block T4/T1 = 1.0; non-depolarising block produces fade so the ratio falls. Below 0.9, pharyngeal coordination, hypoxic ventilatory response and airway protection are all impaired even though the patient may appear awake.",
      },
      {
        q: "Why isn't clinical assessment enough?",
        a: "Head lift > 5 s, sustained handgrip and tidal volumes only exclude TOF ratios below ~0.6. Patients with TOF ratios of 0.7–0.9 routinely look adequate at the bedside but have a 3–5× increase in postoperative pulmonary complications (POPCs).",
      },
      {
        q: "When can I rely on neostigmine?",
        a: "Neostigmine is effective from TOF count ≥ 2 (ideally ≥ 4) — i.e. only for shallow block. Give 50 µg/kg with glycopyrrolate 10 µg/kg. Allow 10 minutes for full effect and confirm TOF ratio ≥ 0.9 quantitatively before extubation. Deep block (TOF count 0–1) needs sugammadex 4 mg/kg (rocuronium/vecuronium) or further waiting.",
      },
      {
        q: "Does sugammadex remove the need for monitoring?",
        a: "No. Sugammadex dose depends on the depth of block — 2 mg/kg at TOF count of 2, 4 mg/kg at PTC 1–2, 16 mg/kg immediately after a 1.2 mg/kg rocuronium intubating dose. Monitoring is also needed to confirm successful reversal (TOF ratio ≥ 0.9) and to detect rare re-paralysis.",
      },
    ]}
    related={[
      { label: "Muscle relaxants — full topic", to: "/pharmacology/muscle-relaxants" },
      { label: "Sugammadex reversal of rocuronium", to: "/notes/how-sugammadex-reverses-rocuronium" },
      { label: "Neuromuscular junction physiology", to: "/physiology/neuromuscular" },
    ]}
  >
    <h2>What residual block actually does</h2>
    <p>
      Below a TOF ratio of 0.9, three things go wrong simultaneously:
      pharyngeal muscle coordination fails (silent aspiration), the carotid
      body's hypoxic ventilatory response is blunted by ~30%, and upper
      airway dilator tone is reduced enough to cause airway obstruction at
      end-expiration. Patients can talk, lift their head, and follow
      commands while still being dangerously weak.
    </p>

    <h2>Why qualitative monitoring isn't enough</h2>
    <p>
      Peripheral nerve stimulators that rely on visual or tactile assessment
      of fade detect block only down to a TOF ratio of about 0.4 — every
      patient discharged on visual TOF assessment risks residual block.
      Quantitative monitors (acceleromyography, electromyography,
      kinemyography) measure the numerical T4/T1 ratio and are the only
      reliable way to confirm 0.9.
    </p>

    <h2>How to actually achieve TOF ≥ 0.9</h2>
    <ul>
      <li>Apply the monitor at the adductor pollicis before induction and obtain a control.</li>
      <li>Titrate maintenance doses to TOF rather than fixed time intervals.</li>
      <li>Match reversal agent and dose to depth of block — see table above.</li>
      <li>Wait long enough for the chosen reversal agent: neostigmine ≥ 10 min, sugammadex 2–3 min.</li>
      <li>Confirm a numerical TOF ratio ≥ 0.9 before extubation.</li>
    </ul>

    <h2>Why this is exam-favourite</h2>
    <p>
      The FRCA Final repeatedly tests the gap between clinical signs and
      quantitative TOF, the dose–depth pairing for sugammadex, and the
      pulmonary complication evidence base (POPULAR study, 2019). Knowing
      the 0.9 threshold and why it matters is high-yield for both written
      and viva components.
    </p>
  </NoteLayout>
);

export default TofRatioExtubationNote;
