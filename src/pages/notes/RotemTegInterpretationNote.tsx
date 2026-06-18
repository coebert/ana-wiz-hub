import { Link } from "react-router-dom";
import { NoteLayout } from "./NoteLayout";

const RotemTegInterpretationNote = () => (
  <NoteLayout
    slug="rotem-teg-interpretation"
    title="ROTEM/TEG interpretation in major haemorrhage"
    shortTitle="ROTEM/TEG interpretation"
    description="Viscoelastic testing in major haemorrhage: which trace abnormality means which product. EXTEM, INTEM, FIBTEM and APTEM interpretation, with NICE/AAGBI 2018 thresholds."
    datePublished="2026-06-18"
    examTags={["final", "fficm"]}
    lede="ROTEM (and the very similar TEG) measure whole-blood clot strength in real time. In major haemorrhage they cut blood-product wastage and inappropriate FFP transfusion by directing fibrinogen, platelets, FFP or tranexamic acid to the patients who actually need them."
    faqs={[
      {
        q: "What do the four ROTEM channels test?",
        a: "EXTEM — extrinsic pathway (tissue-factor activator). INTEM — intrinsic pathway (ellagic acid activator). FIBTEM — extrinsic pathway with platelets blocked by cytochalasin D; isolates fibrinogen contribution. APTEM — extrinsic plus aprotinin; compared to EXTEM detects fibrinolysis.",
      },
      {
        q: "Which numbers should I look at?",
        a: "CT (clotting time, seconds) — time to clot initiation. A5/A10 (amplitude at 5/10 min) — clot strength. MCF (maximum clot firmness, mm) — final strength. ML (maximum lysis, %) — fibrinolysis at 30 or 60 min.",
      },
      {
        q: "What are the action thresholds in major haemorrhage?",
        a: "EXTEM CT > 80 s → FFP. EXTEM A5 < 35 mm with FIBTEM A5 ≥ 9 mm → platelets. FIBTEM A5 < 9 mm → fibrinogen concentrate (or cryoprecipitate). EXTEM ML > 15% at 60 min → tranexamic acid 1 g IV. INTEM CT prolonged with normal EXTEM → consider heparin effect, check with HEPTEM.",
      },
      {
        q: "What are ROTEM's limitations?",
        a: "Insensitive to von Willebrand disease, antiplatelet agents, and DOACs. The trace can look normal in a patient who is clinically coagulopathic from these causes. Always interpret alongside fibrinogen (Clauss), platelet count, the clinical picture, and the local major haemorrhage protocol.",
      },
    ]}
    related={[
      { label: "Haematological co-existing disease", to: "/perioperative/haematological-disease" },
      { label: "Major haemorrhage protocol", to: "/clinical/major-haemorrhage" },
      { label: "Tranexamic acid", to: "/pharmacology/tranexamic-acid" },
    ]}
  >
    <h2>What the trace shows</h2>
    <p>
      A ROTEM trace plots clot amplitude against time. The pen displacement
      reflects shear modulus of the developing clot. Three regions matter
      clinically:
    </p>
    <ul>
      <li><strong>Initiation</strong> — CT, governed by coagulation-factor concentrations. Long CT = need FFP (or factor concentrate).</li>
      <li><strong>Propagation</strong> — A5/A10, governed by fibrinogen polymerisation and platelet–fibrin interaction. Low A5 = low fibrinogen and/or platelet count.</li>
      <li><strong>Stability</strong> — ML, governed by fibrinolysis. ML &gt; 15% = hyperfibrinolysis, give TXA.</li>
    </ul>

    <h2>Reading the four channels together</h2>
    <p>
      Always compare EXTEM and FIBTEM first. FIBTEM isolates fibrinogen by
      blocking platelets; if FIBTEM A5 is normal (≥ 9 mm) but EXTEM A5 is
      low, the deficit is platelets, not fibrinogen. If FIBTEM A5 is low,
      give fibrinogen even if platelet count is normal — most early
      coagulopathy of trauma is functional fibrinogen deficiency.
    </p>

    <h2>Worked algorithm — adult trauma haemorrhage</h2>
    <ol>
      <li>Activate major haemorrhage protocol, send ROTEM, give 1 g TXA empirically within 3 h of injury (CRASH-2).</li>
      <li>FIBTEM A5 &lt; 9 mm → fibrinogen concentrate 3–4 g (or cryoprecipitate 2 pools).</li>
      <li>EXTEM A5 &lt; 35 mm with FIBTEM ≥ 9 mm → platelets 1 adult therapeutic dose.</li>
      <li>EXTEM CT &gt; 80 s → FFP 15 mL/kg (or PCC if factor-specific deficit).</li>
      <li>EXTEM ML &gt; 15% → additional TXA 1 g.</li>
      <li>Repeat ROTEM after each intervention.</li>
    </ol>

    <h2>Why the exam likes it</h2>
    <p>
      The FRCA Final and FFICM written/viva regularly ask candidates to
      interpret a ROTEM trace and recommend the appropriate product. The
      high-yield take-home is the FIBTEM vs EXTEM comparison — almost all
      goal-directed decisions hinge on it.
    </p>
  </NoteLayout>
);

export default RotemTegInterpretationNote;
