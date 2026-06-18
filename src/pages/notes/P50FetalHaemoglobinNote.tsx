import { Link } from "react-router-dom";
import { NoteLayout } from "./NoteLayout";

const P50FetalHaemoglobinNote = () => (
  <NoteLayout
    slug="p50-fetal-haemoglobin"
    title="P50 of fetal haemoglobin: why HbF sits left of HbA"
    shortTitle="P50 of fetal haemoglobin"
    description="Why fetal haemoglobin (HbF) has a lower P50 (~19 mmHg) than adult haemoglobin (~26.6 mmHg), the role of 2,3-DPG, and the placental gas-exchange consequences."
    datePublished="2026-06-13"
    lede="P50 is the oxygen tension at which haemoglobin is 50% saturated. For adult haemoglobin (HbA) it is ~26.6 mmHg; for fetal haemoglobin (HbF) it is ~19 mmHg. The left shift reflects HbF's reduced binding of 2,3-diphosphoglycerate (2,3-DPG) and is essential for placental oxygen transfer."
    faqs={[
      {
        q: "What is the P50 of fetal haemoglobin?",
        a: "Approximately 19 mmHg, compared with ~26.6 mmHg for adult haemoglobin. A lower P50 means HbF binds oxygen more tightly at any given PO₂, shifting the oxygen-haemoglobin dissociation curve to the left.",
      },
      {
        q: "Why does HbF have a lower P50?",
        a: "HbF is composed of two α and two γ chains (α₂γ₂) rather than the adult α₂β₂. The γ chain replaces a positively charged histidine residue with serine, reducing the binding pocket for 2,3-DPG. With less 2,3-DPG bound, HbF stabilises in its high-affinity (R) state at lower PO₂.",
      },
      {
        q: "How does the left-shifted curve help the fetus?",
        a: "At the placental villous interface, maternal blood PO₂ is only ~30–40 mmHg. HbF's higher oxygen affinity means it can take up substantial oxygen at that low PO₂ — the 'double Bohr effect' (maternal blood acidifying as it gives up CO₂; fetal blood alkalinising as it loses CO₂) further widens the affinity gap. The fetal arterial saturation reaches ~70–80% despite the low driving pressure.",
      },
      {
        q: "When is HbF replaced by HbA?",
        a: "HbF production switches off in the perinatal period and HbA progressively replaces it. By 6 months of age HbF makes up <5% of total haemoglobin; by 1 year it is at the adult level of <1%. This is also when the infant's P50 normalises and 2,3-DPG levels approach adult values.",
      },
    ]}
    related={[
      { label: "Oxygen-haemoglobin dissociation — full topic", to: "/physiology/oxygen-haemoglobin" },
      { label: "Foetal circulation", to: "/physiology/foetal-circulation" },
      { label: "Maternal physiology of pregnancy", to: "/physiology/maternal-physiology" },
    ]}
  >
    <h2>Defining P50</h2>
    <p>
      The oxygen-haemoglobin dissociation curve plots saturation against
      partial pressure of oxygen. Its sigmoid shape reflects cooperative
      binding — each O₂ that binds shifts haemoglobin toward its high-affinity
      relaxed (R) state. P50 is the partial pressure at which half the binding
      sites are occupied, a single number that captures where the whole curve
      sits on the x-axis. A lower P50 = left shift = higher oxygen affinity; a
      higher P50 = right shift = lower oxygen affinity (better unloading at the
      tissues).
    </p>

    <h2>HbF structure and the 2,3-DPG story</h2>
    <p>
      Adult haemoglobin is α₂β₂. Fetal haemoglobin is α₂γ₂. The γ subunit
      replaces a positively charged histidine in the central cavity with a
      neutral serine. 2,3-diphosphoglycerate — a glycolytic intermediate
      abundant in red cells — is a strongly negatively charged molecule that
      stabilises haemoglobin in its low-affinity tense (T) state by sitting in
      that central cavity. Without the matching positive charge, 2,3-DPG binds
      HbF poorly. The result: HbF remains in the high-affinity R state at lower
      PO₂, and the curve shifts left by about 6–8 mmHg of P50.
    </p>

    <h2>The placental gradient</h2>
    <p>
      Maternal blood in the intervillous space has a PO₂ of only 30–40 mmHg —
      well below the PO₂ that fully saturates adult haemoglobin. The fetus
      relies on three mechanisms to extract enough oxygen at this low driving
      pressure:
    </p>
    <ul>
      <li>
        <strong>Higher haemoglobin concentration</strong> — ~17 g/dL at term.
      </li>
      <li>
        <strong>HbF's lower P50</strong> — pulls oxygen off maternal HbA at the
        same PO₂.
      </li>
      <li>
        <strong>Double Bohr effect</strong> — maternal blood becomes more acidic
        as it picks up fetal CO₂ (right-shifting maternal HbA, releasing more
        O₂), while fetal blood alkalinises as it loses CO₂ (further
        left-shifting HbF, capturing more O₂).
      </li>
    </ul>
    <p>
      Together these mechanisms achieve fetal umbilical-vein saturation of
      ~70–80% from maternal PO₂ that would barely saturate adult haemoglobin.
    </p>

    <h2>The transition to HbA</h2>
    <p>
      γ-chain synthesis falls and β-chain synthesis rises sharply from ~32
      weeks gestation. At birth HbF is still 70–80% of total haemoglobin; by 6
      months it is &lt;5%, and by 1 year it has dropped to the adult value
      &lt;1%. 2,3-DPG concentration rises in parallel, and the infant's P50
      reaches adult levels of ~26.6 mmHg — the curve completes its rightward
      migration over the first year of life. Persistent HbF (e.g. hereditary
      persistence of fetal haemoglobin) reduces sickling in sickle-cell
      disease, which is the rationale for using hydroxycarbamide to re-induce
      HbF expression.
    </p>
  </NoteLayout>
);

export default P50FetalHaemoglobinNote;
