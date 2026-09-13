import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { CrossReferenceCallout } from "@/components/topic/CrossReferenceCallout";
import { DiagramSection } from "@/components/topic/DiagramSection";
import { XRayTubeDiagram } from "@/components/diagrams/physics/XRayTubeDiagram";
import { CTScannerDiagram } from "@/components/diagrams/physics/CTScannerDiagram";
import ElectromagneticSpectrumDiagram from "@/components/diagrams/physics/ElectromagneticSpectrumDiagram";
import RadiationDoseUnitsDiagram from "@/components/diagrams/physics/RadiationDoseUnitsDiagram";
import { SinogramFBPWalkthrough } from "@/components/diagrams/physics/SinogramFBPWalkthrough";
import { CTDoseExplorer } from "@/components/diagrams/physics/CTDoseExplorer";
import { RadiationSafetyChecklist } from "@/components/clinical/RadiationSafetyChecklist";
import { RadiationDoseComparisonTable } from "@/components/clinical/RadiationDoseComparisonTable";
import { Cite, ReferencesList, type Reference } from "@/components/references/References";
import { InlineRef } from "@/components/references/InlineRef";
import { xrayRadiationSafetyQuiz } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";

const xrayRadiationSafetyFaqs: Array<[string, string]> = [
  [
    "What are the three principles of radiation protection?",
    "ALARA — As Low As Reasonably Achievable. Achieved by Time (minimise exposure duration), Distance (inverse-square law — doubling distance quarters dose), and Shielding (lead aprons 0.25–0.5 mm Pb equivalent, thyroid collars, lead glasses, mobile screens)."
  ],
  [
    "What is the annual dose limit for occupationally exposed staff?",
    "IRR 2017 (UK): whole-body effective dose 20 mSv/year (averaged over 5 years, max 50 mSv in any single year). Equivalent dose limits: lens 20 mSv/year, skin/extremities 500 mSv/year. Pregnant staff — fetal dose ≤1 mSv over the declared pregnancy. Wear film/TLD badges and review records with the RPS."
  ],
  [
    "What is scattered radiation in fluoroscopy and how do you minimise exposure?",
    "X-rays scatter from the patient in all directions; the operator's main exposure is scatter, not the primary beam. Minimise by: standing on the image-intensifier side (not the X-ray tube), pulsed rather than continuous fluoroscopy, collimating to the field of interest, last-image-hold review, wearing lead apron + thyroid shield + lead glasses, and keeping ≥2 m from the source when not directly required."
  ]
];

const REFERENCES: Reference[] = [
  {
    id: "iaea-handbook",
    n: 1,
    authors: "International Atomic Energy Agency (IAEA)",
    title: "Diagnostic Radiology Physics: A Handbook for Teachers and Students (Chs 1–3: X-ray production and tubes)",
    source: "IAEA, Vienna",
    year: 2014,
    url: "https://www.iaea.org/publications/8841/diagnostic-radiology-physics",
  },
  {
    id: "bushberg",
    n: 2,
    authors: "Bushberg JT, Seibert JA, Leidholdt EM, Boone JM",
    title: "The Essential Physics of Medical Imaging (4th ed., Ch 6 — X-ray Production, X-ray Tubes, and Generators)",
    source: "Wolters Kluwer, Philadelphia",
    year: 2020,
  },
  {
    id: "icrp103",
    n: 3,
    authors: "International Commission on Radiological Protection",
    title: "ICRP Publication 103 — The 2007 Recommendations of the ICRP (tissue weighting factors, stochastic vs deterministic effects)",
    source: "Annals of the ICRP 37(2–4)",
    year: 2007,
    url: "https://www.icrp.org/publication.asp?id=ICRP%20Publication%20103",
  },
  {
    id: "icrp118",
    n: 4,
    authors: "International Commission on Radiological Protection",
    title: "ICRP Publication 118 — Statement on Tissue Reactions / Threshold Doses (lens of the eye reduced to 0.5 Gy)",
    source: "Annals of the ICRP 41(1–2)",
    year: 2012,
    url: "https://www.icrp.org/publication.asp?id=ICRP%20Publication%20118",
  },
  {
    id: "irr2017",
    n: 5,
    authors: "UK Government",
    title: "The Ionising Radiations Regulations 2017 (SI 2017/1075) — dose limits, classified workers, declared-pregnant workers",
    source: "legislation.gov.uk",
    year: 2017,
    url: "https://www.legislation.gov.uk/uksi/2017/1075/contents/made",
  },
  {
    id: "irmer2017",
    n: 6,
    authors: "UK Government",
    title: "The Ionising Radiation (Medical Exposure) Regulations 2017 (IR(ME)R) — justification, optimisation, authorisation",
    source: "legislation.gov.uk",
    year: 2017,
    url: "https://www.legislation.gov.uk/uksi/2017/1322/contents/made",
  },
  {
    id: "phe-doses",
    n: 7,
    authors: "Public Health England (now UKHSA)",
    title: "Patient dose information: guidance — typical effective doses for common diagnostic exposures (CXR, CT, fluoroscopy)",
    source: "GOV.UK",
    year: 2020,
    url: "https://www.gov.uk/government/publications/medical-radiation-patient-doses",
  },
  {
    id: "rcoa-curriculum",
    n: 8,
    authors: "Royal College of Anaesthetists",
    title: "2021 Curriculum for a CCT in Anaesthetics — Domain 12 Equipment (X-rays, radiation safety, contrast)",
    source: "RCoA, London",
    year: 2021,
    url: "https://rcoa.ac.uk/training-careers/training-anaesthesia/2021-anaesthetics-curriculum",
  },
  {
    id: "aapm-ct",
    n: 9,
    authors: "American Association of Physicists in Medicine",
    title: "AAPM Report 96 — The Measurement, Reporting, and Management of Radiation Dose in CT (CTDI, DLP, SSDE)",
    source: "AAPM, College Park MD",
    year: 2008,
    url: "https://www.aapm.org/pubs/reports/RPT_96.pdf",
  },
  {
    id: "rcr-ct",
    n: 10,
    authors: "Royal College of Radiologists",
    title: "iRefer: Making the Best Use of Clinical Radiology (CT indications, dose context, justification)",
    source: "RCR, London",
    year: 2017,
    url: "https://www.rcr.ac.uk/clinical-radiology/being-consultant/rcr-referral-guidelines/about-irefer",
  },
];

const objectives = [
  "Describe how diagnostic X-rays are produced (bremsstrahlung and characteristic radiation) and the influence of kVp and mAs on beam quality and quantity",
  "Explain the four photon–tissue interactions (photoelectric, Compton, Rayleigh, pair production) and which dominates at diagnostic energies",
  "Define and use the units of radiation: becquerel, gray, sievert; distinguish absorbed, equivalent and effective dose",
  "Apply the ALARA framework — time, distance, shielding — to anaesthetic practice in the fluoroscopy and CT environment",
  "State current dose limits (IRR 2017) for occupational, public and pregnant workers and describe routine personal dosimetry",
  "Distinguish stochastic from deterministic effects and list the relevant deterministic thresholds for staff (lens, skin)",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Inverse-square law in the IR suite",
    scenario:
      "During an EVAR you are standing 0.75 m from the patient (the principal scatter source) and your dosimeter reads 120 µSv/h. Estimate the dose-rate if you can step back to 1.5 m, and again to 2.25 m, all other factors unchanged.",
    working:
      "Dose-rate ∝ 1/d².\nAt 1.5 m: factor = (0.75/1.5)² = 0.25 → 120 × 0.25 = 30 µSv/h.\nAt 2.25 m: factor = (0.75/2.25)² = 1/9 ≈ 0.11 → 120 × 0.11 ≈ 13 µSv/h.",
    answer:
      "Doubling the distance cuts dose-rate to ~30 µSv/h (a 4× drop); tripling it to ~13 µSv/h (a 9× drop). Distance is the most powerful single ALARA lever. Combine with a ceiling-suspended lead screen and a 0.5 mm Pb apron and you typically push residual whole-body dose well below 1 µSv/h.",
   cites: ["RCR Radiation 2020"],
  },
  {
    title: "Justifying a CT pulmonary angiogram in a young patient",
    scenario:
      "A 26-year-old woman 6 days post-section presents with breathlessness. The team are considering a CTPA (~5 mSv). What dose context, alternatives and consent points should you weigh?",
    working:
      "Effective dose comparison:\n  • CXR: ~0.02 mSv\n  • V/Q scan (perfusion only): ~1–2 mSv\n  • CTPA: ~5–10 mSv (≈ 2 years background; ≈ 250 CXRs)\n  • Maternal breast tissue receives a relatively high local dose with CTPA → small lifetime breast-cancer risk increment.\nAlternatives:\n  • V/Q scan reduces breast dose substantially in young women with normal CXR.\n  • Bedside echo + leg ultrasound may avoid imaging if positive.\nJustification + optimisation (IRR 2017): every exposure must be justified, optimised (lowest dose for the diagnostic question), and authorised by an IR(ME)R practitioner.",
    answer:
      "Justify against the clinical question (a missed PE is high-cost), but in a young woman with a normal CXR and clinically suspected PE, V/Q is often the optimised first-line test. If CTPA is required, use low-dose protocols, dose modulation and lead breast shielding where local protocols allow. Document the discussion in the consent.",
   cites: ["IRR 2017"],
  },
  {
    title: "Pregnant anaesthetist on the IR list",
    scenario:
      "A registrar declares pregnancy at 8 weeks. She is on next week's interventional cardiology list. What dose-monitoring and risk-mitigation steps should the department take?",
    working:
      "Foetal dose limit (IRR 2017): 1 mSv to the conceptus over the declared remainder of pregnancy.\nMonitoring:\n  • Standard collar dosimeter outside apron (lens/thyroid surrogate).\n  • Additional dosimeter UNDER the apron at waist level for foetal dose estimation, read monthly.\nProtective measures:\n  • 0.5 mm Pb wrap-around apron + 0.5 mm thyroid shield + leaded glasses (lens threshold for cataract under ICRP 2011: 0.5 Gy cumulative).\n  • Stand behind the ceiling-suspended lead screen during acquisitions.\n  • Maximise distance from patient during cine runs; step back during DSA.\n  • Ensure pulsed fluoroscopy is used and irradiated field collimated tightly.",
    answer:
      "Continued IR work is usually safe with the additional under-apron dosimeter, full PPE and screen use. Risk-assess monthly; remove from the rota only if doses approach the foetal limit or if procedures place her routinely close to the primary beam (e.g. pain procedures with hand exposure).",
   cites: ["IR(ME)R 2017"],
  },
];

const XRayRadiationSafetyTopic = () => {
  return (
    <TopicTemplate
      title="X-rays & Radiation Safety"
      subtitle="X-ray production, photon–tissue interactions, dose units, and ALARA practice for anaesthetists"
      backPath="/physics"
      backLabel="Physics"
      accentColor="text-physics"
      topicId="xray-radiation-safety"
      topicTitle="X-rays & Radiation Safety"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={xrayRadiationSafetyQuiz}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM], curriculumCodes: ["RCoA Primary — Physics", "RCoA Final — Physics", "FFICM — Equipment & Safety"] },
        workedExamples: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        objectives: [
          "IRR 2017",
          "IR(ME)R 2017",
          "BJA Educ Radiation 2016",
          "ICRP 103",
          "RCR Radiation 2020",
        ],
        keyPoints: [
          "IRR 2017",
          "IR(ME)R 2017",
          "BJA Educ Radiation 2016",
          "ICRP 103",
          "RCR Radiation 2020",
        ],
        workedExamples: ["RCR Radiation 2020", "IRR 2017", "IR(ME)R 2017"],
      }}
      keyPoints={[
        { text: "Diagnostic X-rays are produced by bombarding a tungsten anode with electrons accelerated across a high-voltage (typically 50–150 kVp) tube — output is a bremsstrahlung continuum plus characteristic K-shell line emissions", cites: ["IRR 2017"] },
        { text: "kVp controls beam energy (penetration/quality); mAs controls beam quantity (number of photons) — together they determine dose and image contrast", cites: ["IR(ME)R 2017"] },
        { text: "Four photon interactions: photoelectric (∝ Z³/E³, dominant at diagnostic energies, gives bone–soft-tissue contrast), Compton (dominant >100 keV, source of scatter), Rayleigh (minor coherent), pair production (>1.022 MeV only)", cites: ["BJA Educ Radiation 2016"] },
        { text: "Units: activity = becquerel (Bq); absorbed dose = gray (Gy, J/kg); equivalent dose = sievert (Sv) = Gy × wR; effective dose = Sv × tissue weighting factors", cites: ["ICRP 103"] },
        { text: "ALARA = As Low As Reasonably Achievable. Three pillars: TIME (less exposure), DISTANCE (inverse-square law — doubling distance quarters dose), SHIELDING (0.5 mm Pb apron attenuates ~95% of scatter at 70 kVp)", cites: ["RCR Radiation 2020"] },
        { text: "IRR 2017 occupational limit: 20 mSv/year (avg over 5 years, max 50 mSv/year). Public: 1 mSv/year. Declared-pregnant worker: 1 mSv to the foetus over remainder of pregnancy", cites: ["IRR 2017"] },
        { text: "Stochastic effects (cancer, hereditary): no threshold, probability rises with dose. Deterministic effects (cataract, skin erythema, marrow suppression): have thresholds — ICRP 2011 lens threshold lowered to 0.5 Gy cumulative", cites: ["IR(ME)R 2017"] },
        { text: "Approximate effective doses: CXR 0.02 mSv · head CT 2 mSv · CTPA 5–10 mSv · abdomen CT 10 mSv · UK background 2.7 mSv/year", cites: ["BJA Educ Radiation 2016"] },
        { text: "Anaesthetist's PPE for fluoroscopy: 0.5 mm Pb wrap-around apron, 0.5 mm thyroid shield, leaded glasses (cataract prevention), and where possible a ceiling-suspended lead screen — plus collar dosimeter outside apron", cites: ["ICRP 103"] },
      ]}
      coreConcepts={
        <>
          <ExamSection id="introduction" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Introduction" defaultOpen>
            <p className="text-muted-foreground leading-relaxed">
              Anaesthetists encounter ionising radiation routinely — fluoroscopy in interventional radiology and cardiology, image
              intensifiers in trauma theatre, hybrid theatre EVAR/TAVI, CT in resus and the on-call diagnostic workflow, and pain
              procedures with portable C-arms. A working knowledge of how X-rays are produced, how they interact with tissue, and how
              dose is measured underpins both safe patient practice (justification, optimisation) and personal protection (the ALARA
              framework, dose limits, dosimetry). The principles transfer directly to occupational health risk-assessments and to
              consenting patients for repeat or high-dose examinations.
            </p>
            <ElectromagneticSpectrumDiagram />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="production" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="X-ray Production">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                A diagnostic X-ray tube is an evacuated glass envelope containing a heated tungsten <strong>cathode</strong> (electron
                source by thermionic emission) and a rotating tungsten <strong>anode</strong> (the target). A high voltage —
                conventionally <strong>50–150 kVp</strong> — accelerates electrons across the tube; they strike the anode at high
                velocity.<Cite refs={[{ id: "iaea-handbook", n: 1 }, { id: "bushberg", n: 2 }]} /> Two distinct mechanisms then generate X-rays:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>
                  <strong>Bremsstrahlung ('braking radiation')</strong> — the dominant contributor. As an electron is decelerated and
                  deflected by the field of a tungsten nucleus, the lost kinetic energy is emitted as a photon. This produces a
                  <em> continuous spectrum</em> from very low energies up to a maximum equal to the tube voltage in keV.<Cite refs={[{ id: "bushberg", n: 2 }]} />
                </li>
                <li>
                  <strong>Characteristic radiation</strong> — when an incident electron ejects an inner-shell (K-shell) tungsten
                  electron, an outer electron drops in to fill the vacancy and releases a photon at a discrete energy (~59 and 67 keV
                  for tungsten). This appears as <em>line peaks</em> superimposed on the bremsstrahlung continuum.<Cite refs={[{ id: "iaea-handbook", n: 1 }]} />
                </li>
              </ul>
              <DiagramSection
                title="Anatomy of an X-ray tube"
                intro="Electrons are boiled off a heated tungsten cathode, accelerated across the kVp gap, and slam into the rotating tungsten anode — generating bremsstrahlung and characteristic photons that exit through the beryllium window."
              >
                <XRayTubeDiagram />
              </DiagramSection>
              <p>
                Two operator settings dominate the output. <strong>kVp</strong> controls the maximum photon energy and therefore beam
                quality (penetration); raising kVp increases mean photon energy and reduces tissue contrast. <strong>mAs</strong> (tube
                current × exposure time) controls beam quantity (photon number) and is the primary determinant of patient dose for a
                given kVp. Less than 1% of the electron kinetic energy is converted to X-rays — the rest is heat, which is why anodes
                rotate and are oil-cooled.<Cite refs={[{ id: "bushberg", n: 2 }, { id: "iaea-handbook", n: 1 }]} />
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="interactions" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Photon–Tissue Interactions">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>Four interactions matter clinically; the first two account for almost all relevant medical physics:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>
                  <strong>Photoelectric effect</strong> — the photon is fully absorbed by an inner-shell electron, which is ejected.
                  Probability is proportional to <strong>Z³/E³</strong> — strongly favoured at low energies and high atomic number.
                  This is what gives the bone–soft-tissue contrast on plain films and why iodinated and barium contrast (high Z) work.
                </li>
                <li>
                  <strong>Compton scattering</strong> — the photon is partially absorbed by an outer-shell electron and scattered with
                  reduced energy. Dominates above ~100 keV (CT, fluoroscopy primary beam) and is essentially independent of Z. Compton
                  scattering is the source of the <em>scatter dose</em> to staff — the patient becomes the principal scatter source
                  inside the room.
                </li>
                <li>
                  <strong>Rayleigh (coherent) scattering</strong> — a minor process where the photon is deflected without losing
                  energy. Contributes a small amount to image noise.
                </li>
                <li>
                  <strong>Pair production</strong> — a photon (&gt;1.022 MeV) interacts with a nucleus to create an electron–positron
                  pair. Not relevant in diagnostic imaging but matters in radiotherapy and PET.
                </li>
              </ul>
              <p>
                Beam attenuation through tissue follows an exponential law: <strong>I = I₀·e<sup>−μx</sup></strong>, where μ is the
                linear attenuation coefficient (m⁻¹) and x the thickness. The <em>half-value layer (HVL)</em> is the thickness of a
                given material that halves intensity — for typical 70 kVp scatter, HVL is ~0.2 mm of lead, which is why a 0.5 mm Pb
                apron attenuates to roughly (½)<sup>2.5</sup> ≈ 6% (i.e. ~94% scatter reduction).
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="ct-scanner" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="How a CT Scanner Works">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                Computed tomography takes the same X-ray tube and turns plain-film attenuation into a cross-sectional map. A high-output
                rotating-anode tube and a curved <strong>arc of detectors</strong> sit on opposite sides of a <em>gantry</em> that
                rotates around the patient (typically 0.25–0.5 s per revolution). At hundreds of projection angles per rotation, the
                detectors record how much the fan beam has been attenuated along every line through the slice.<Cite refs={[{ id: "bushberg", n: 2 }, { id: "iaea-handbook", n: 1 }]} />
              </p>

              <div className="rounded-lg border border-border bg-muted/30 p-3 not-prose">
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1.5">
                  Imaging chain
                </p>
                <ol className="text-xs text-foreground space-y-1 list-decimal list-inside marker:text-muted-foreground">
                  <li><strong>Acquisition</strong> — fan-beam X-rays from a rotating tube are recorded by a multi-row solid-state detector array (typically Gd-oxysulphide or CsI scintillator + photodiode).</li>
                  <li><strong>Pre-processing</strong> — log conversion, beam-hardening &amp; scatter correction, channel calibration. Output is a <em>sinogram</em> (raw attenuation projections).</li>
                  <li><strong>Reconstruction</strong> — filtered back-projection or, on modern scanners, iterative / model-based reconstruction (e.g. ASIR, IMR) — lower noise → enables dose reduction.</li>
                  <li><strong>Display</strong> — voxel attenuations rescaled to <strong>Hounsfield Units</strong>: HU = 1000 × (μ<sub>tissue</sub> − μ<sub>water</sub>) / μ<sub>water</sub>. Air ≈ −1000, fat ≈ −100, water = 0, blood ≈ +40, bone +400 → +1000.</li>
                </ol>
              </div>

              <CTScannerDiagram />

              <SinogramFBPWalkthrough />

              <p>
                Modern scanners are <strong>helical (spiral) multi-detector CT (MDCT)</strong>: the table moves through the gantry continuously
                while the tube rotates, tracing a helix. <em>Pitch</em> = table travel per rotation ÷ total beam width along z; pitch &gt; 1
                spreads dose over more anatomy (faster, less dose), pitch &lt; 1 oversamples (less noise, higher dose). 64-, 128- and
                320-slice detectors allow whole-organ coverage in a single rotation, enabling cardiac and CTPA studies.<Cite refs={[{ id: "aapm-ct", n: 9 }]} />
              </p>

              <div className="rounded-lg border border-border bg-muted/30 p-3 not-prose">
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1.5">
                  Reconstruction: FBP vs iterative reconstruction
                </p>
                <ul className="text-xs text-foreground space-y-1.5 list-disc list-inside marker:text-muted-foreground">
                  <li>
                    <strong>Filtered back-projection (FBP)</strong> — the attenuation data from each projection are 'smeared' back
                    across the image matrix. Simple back projection alone gives a blurred image with star artefacts, so the raw data
                    are first passed through a mathematical filter/kernel that sharpens them before back projection — soft-tissue
                    kernels favour low noise, bone/lung kernels favour spatial resolution at the cost of more noise
                    <InlineRef topicId="xray-radiation-safety" refLabel="BJA Educ 2019 (CT)" />.
                  </li>
                  <li>
                    <strong>Iterative reconstruction (IR)</strong> — an initial image estimate is forward-projected to create
                    simulated raw data, compared against the measured data, and the image is repeatedly corrected over successive
                    iterations (e.g. ASIR, IMR, and model-based IR that also models system optics and photon statistics). Lower
                    image noise allows diagnostic images at a significantly lower radiation dose; the trade-offs are increased
                    computation time and an altered, sometimes 'blotchy', image texture
                    <InlineRef topicId="xray-radiation-safety" refLabel="BJA Educ 2019 (CT)" />.
                  </li>
                </ul>
              </div>

              <p>
                <strong>Pitch</strong> = table movement per gantry rotation ÷ total (collimated) beam width. Pitch = 1 gives
                contiguous slices; pitch &gt; 1 stretches the helix — gaps requiring interpolation, a faster scan and (for fixed mAs)
                lower dose, useful in trauma or an uncooperative patient. Pitch &lt; 1 overlaps the data — higher dose but better image
                quality and less helical artefact, used for high-resolution or cardiac work. On most modern scanners, however, tube
                current is modulated in real time to keep image noise constant, so dose does not simply fall as pitch rises
                <InlineRef topicId="xray-radiation-safety" refLabel="BJA Educ 2019 (CT)" />.
              </p>

              <p>
                <strong>Dose modulation</strong> is the headline patient-safety feature: the tube current (mA) is varied in real time
                with patient diameter (angular and z-axis modulation) and the kVp can be lowered for paediatric and contrast-enhanced
                studies — together typically halving dose for an equivalent diagnostic image.<Cite refs={[{ id: "aapm-ct", n: 9 }]} />
              </p>

              <div className="rounded-lg border border-border bg-muted/30 p-3 not-prose">
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1.5">
                  Dose descriptors you must recognise
                </p>
                <ul className="text-xs text-foreground space-y-1.5 list-disc list-inside marker:text-muted-foreground">
                  <li id="ctdi-vol" className="scroll-mt-24">
                    <strong>CTDI<sub>vol</sub></strong> (mGy) — average dose to a 16 cm (head) or 32 cm (body) PMMA phantom for a single rotation; reported on every scanner console.
                    <span className="block mt-0.5 text-[10px] text-muted-foreground">
                      Used by:{" "}
                      <a href="#mode-cta" className="underline hover:text-foreground">CTA</a>{" · "}
                      <a href="#mode-perfusion" className="underline hover:text-foreground">CT perfusion</a>{" · "}
                      <a href="#mode-dect" className="underline hover:text-foreground">dual-energy CT</a>
                    </span>
                  </li>
                  <li id="dlp" className="scroll-mt-24">
                    <strong>DLP</strong> (mGy·cm) = CTDI<sub>vol</sub> × scan length — best surrogate for total patient energy deposition.
                    <span className="block mt-0.5 text-[10px] text-muted-foreground">
                      Used by:{" "}
                      <a href="#mode-cta" className="underline hover:text-foreground">CTA</a>{" (long z-coverage)"}{" · "}
                      <a href="#mode-perfusion" className="underline hover:text-foreground">CT perfusion</a>{" (multi-phase) · "}
                      <a href="#mode-dect" className="underline hover:text-foreground">dual-energy</a>{" (two acquisitions)"}
                    </span>
                  </li>
                  <li id="effective-dose-ct" className="scroll-mt-24">
                    <strong>Effective dose</strong> (mSv) ≈ DLP × <em>k</em> (region-specific factor; chest k ≈ 0.014). Allows comparison with background and dose limits.
                    <span className="block mt-0.5 text-[10px] text-muted-foreground">
                      Drives mode choice for{" "}
                      <a href="#mode-cta" className="underline hover:text-foreground">CTA</a>{", "}
                      <a href="#mode-perfusion" className="underline hover:text-foreground">perfusion</a>{" and "}
                      <a href="#mode-dect" className="underline hover:text-foreground">dual-energy</a>
                    </span>
                  </li>
                  <li id="ssde" className="scroll-mt-24">
                    <strong>SSDE</strong> — size-specific dose estimate, corrects CTDI<sub>vol</sub> for actual patient diameter (essential in paediatrics).
                    <span className="block mt-0.5 text-[10px] text-muted-foreground">
                      Especially relevant for{" "}
                      <a href="#mode-perfusion" className="underline hover:text-foreground">CT perfusion</a>{" and paediatric "}
                      <a href="#mode-cta" className="underline hover:text-foreground">CTA</a>
                    </span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-border bg-muted/30 p-3 not-prose">
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-1.5">
                  Special CT modes
                </p>
                <ul className="text-xs text-foreground space-y-1.5 list-disc list-inside marker:text-muted-foreground">
                  <li id="mode-cta" className="scroll-mt-24">
                    <strong>CT angiography (CTA)</strong> — timed iodinated-contrast bolus; long z-coverage means high{" "}
                    <a href="#dlp" className="underline hover:text-foreground">DLP</a>{" "}
                    despite per-rotation{" "}
                    <a href="#ctdi-vol" className="underline hover:text-foreground">CTDI<sub>vol</sub></a>{" "}
                    similar to a routine CT — report{" "}
                    <a href="#effective-dose-ct" className="underline hover:text-foreground">effective dose</a>{" "}
                    via DLP × <em>k</em>.
                  </li>
                  <li id="mode-perfusion" className="scroll-mt-24">
                    <strong>CT perfusion</strong> — repeated low-dose acquisitions over the same slab to track contrast wash-in (e.g. stroke). Cumulative{" "}
                    <a href="#dlp" className="underline hover:text-foreground">DLP</a>{" "}
                    can be high; in small patients use{" "}
                    <a href="#ssde" className="underline hover:text-foreground">SSDE</a>{" "}
                    rather than{" "}
                    <a href="#ctdi-vol" className="underline hover:text-foreground">CTDI<sub>vol</sub></a>{" "}
                    to judge true skin/organ dose.
                  </li>
                  <li id="mode-dect" className="scroll-mt-24">
                    <strong>Dual-energy CT (DECT)</strong> — two kVp acquisitions separate iodine from calcium, characterise stones, reduce metal artefact. Two acquisitions ≈ doubles{" "}
                    <a href="#ctdi-vol" className="underline hover:text-foreground">CTDI<sub>vol</sub></a>{" "}
                    and{" "}
                    <a href="#dlp" className="underline hover:text-foreground">DLP</a>{" "}
                    unless dose-balanced — modern fast-kVp-switching/dual-source designs aim for{" "}
                    <a href="#effective-dose-ct" className="underline hover:text-foreground">effective dose</a>{" "}
                    parity with single-energy.
                  </li>
                  <li>
                    <strong>Cone-beam CT</strong> — built into IR/cath-lab C-arms for intra-procedural 3-D imaging.
                  </li>
                </ul>
                <p className="text-[10px] text-muted-foreground italic mt-2">
                  <Cite refs={[{ id: "rcr-ct", n: 10 }]} /> Click any descriptor or mode to jump between them.
                </p>
              </div>

              <CTDoseExplorer />

              <p>
                <strong>Anaesthetic relevance:</strong> CT effective doses dwarf plain films — head ~2 mSv, chest ~7 mSv, CTPA 5–10 mSv,
                abdomen/pelvis ~10 mSv (≈ 100–500 CXRs each). Justification (IR(ME)R 2017) and choice of the lowest-dose adequate
                protocol are clinical responsibilities, not just radiology decisions. In ICU transfers and intra-operative CT, staff
                should leave the scanner room or stand behind lead glass during acquisition; only those clinically essential (e.g.
                managing an unstable airway) remain, wearing a 0.5 mm Pb apron and standing as far from the bore as the case
                permits.<Cite refs={[{ id: "irmer2017", n: 6 }, { id: "phe-doses", n: 7 }]} />
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="units" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Dose Units">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>Distinguish three quantities — the exam favourites:</p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>
                  <strong>Activity (becquerel, Bq)</strong> — disintegrations per second of a radionuclide source. Not directly
                  relevant to X-ray equipment.
                </li>
                <li>
                  <strong>Absorbed dose (gray, Gy)</strong> — energy deposited per unit mass of tissue (J/kg). A purely physical
                  measurement.
                </li>
                <li>
                  <strong>Equivalent dose (sievert, Sv)</strong> — absorbed dose × <em>radiation weighting factor (wR)</em>. wR = 1
                  for X-rays, γ and β; wR = 20 for α-particles. Sieverts therefore reflect biological effect of the radiation type.
                </li>
                <li>
                  <strong>Effective dose (sievert, Sv)</strong> — equivalent dose summed across organs, each weighted by a
                  <em> tissue weighting factor (wT)</em> that reflects radiosensitivity (e.g. wT = 0.12 for breast, lung, colon, marrow;
                  0.04 for thyroid; 0.01 for skin). Effective dose is what is reported in personal dosimetry and for comparing risks
                  across imaging modalities.
                </li>
              </ul>
              <p>
                Useful magnitudes: UK natural background ~2.7 mSv/year; CXR ~0.02 mSv; head CT ~2 mSv; chest CT ~7 mSv; CTPA ~5–10 mSv;
                abdomen/pelvis CT ~10 mSv.
              </p>
              <RadiationDoseComparisonTable />
              <RadiationDoseUnitsDiagram />
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="alara" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="ALARA — Time, Distance, Shielding">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                The radiation protection framework is built on three legal/ethical pillars (IR(ME)R 2017): <strong>justification</strong>
                (the exposure must do more good than harm), <strong>optimisation</strong> (lowest dose for the diagnostic question —
                the ALARA principle), and <strong>limitation</strong> (statutory dose limits). For staff, ALARA reduces to three
                operational levers:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>
                  <strong>Time</strong> — minimise screening time, use pulsed rather than continuous fluoroscopy (typical 30–70%
                  dose reduction), avoid 'cine' acquisition unless needed.
                </li>
                <li>
                  <strong>Distance</strong> — by far the most powerful lever. Dose-rate falls with the inverse square of distance:
                  doubling distance quarters dose; tripling it cuts dose 9-fold. A single step back is usually worth more than any PPE
                  upgrade.
                </li>
                <li>
                  <strong>Shielding</strong> — aprons are commonly <strong>0.25, 0.35 or 0.5 mm Pb-equivalent</strong>; protection increases
                  with thickness and falls as beam energy rises, with 0.5 mm Pb attenuating roughly 90–99% of scattered diagnostic X-rays.
                  A single-front apron protects only when facing the patient; a wrap-around apron protects during turning and is preferred
                  for mobile staff, though heavier. Correct sizing matters: gaps at the armholes, side seam or overlap defeat protection.
                  Store aprons hanging rather than folded, inspect visually before use and test at least annually by fluoroscopy/radiography
                  for cracks. Add a 0.5 mm Pb thyroid shield and leaded glasses. Position a ceiling-suspended screen between patient and head,
                  and under-table drapes between the X-ray tube/patient and the operator; these intercept scatter before it reaches the body.
                </li>
              </ul>
              <p>
                Geometry matters: an under-couch tube (image intensifier above the patient) directs scatter downwards, away from
                staff faces and eyes, and is preferred. Avoid standing beside the X-ray tube — scatter is highest on the entrance side
                of the patient.
              </p>
              <RadiationSafetyChecklist />
            </div>
            </CollapsibleSubsection>
            <CollapsibleSubsection title="UK Regulatory Framework: IRR 2017 and IR(ME)R 2017">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                Within the UK, ionising radiation is controlled by two statutory instruments with distinct purposes
                <InlineRef topicId="xray-radiation-safety" refLabel="BJA Educ 2021 (Radiation safety)" />:
              </p>
              <p>
                <strong>IRR 2017</strong> protects <em>workers and the public</em>. Employer duties include a prior risk
                assessment, restriction of exposure so far as reasonably practicable, written local rules with dose-constraint and
                contingency arrangements, and appointment of a <strong>Radiation Protection Supervisor (RPS)</strong> to secure
                day-to-day compliance. Employers must also appoint a suitably qualified{" "}
                <strong>Radiation Protection Adviser (RPA)</strong> to advise on compliance, and designate{" "}
                <strong>controlled areas</strong> (where special procedures are needed to restrict exposure — e.g. within the
                theatre during fluoroscopy, or within ~2 m of the beam) and <strong>supervised areas</strong>. Staff likely to
                exceed 6 mSv/year effective dose (or 3/10 of any other relevant dose limit) must be{" "}
                <strong>classified</strong>, with formal dose monitoring and annual medical surveillance. Statutory dose limits:
                20 mSv/year whole-body effective dose for classified workers, 1 mSv/year for the public, 20 mSv/year to the lens
                of the eye, and 500 mSv/year to skin and extremities
                <InlineRef topicId="xray-radiation-safety" refLabel="IRR 2017" />.
              </p>
              <p>
                <strong>IR(ME)R 2017</strong> protects the <em>patient</em>. Four duty-holder roles are defined: the{" "}
                <strong>employer</strong> (written procedures and protocols, clinical audit), the <strong>referrer</strong>{" "}
                (supplies adequate clinical information to justify the exposure), the <strong>practitioner</strong> (justifies the
                individual exposure — weighing benefit against detriment) and the <strong>operator</strong> (carries out any
                practical aspect — including an anaesthetist who presses the fluoroscopy pedal or moves the table). Core
                principles are <strong>justification</strong>, <strong>optimisation</strong> (ALARP/ALARA, benchmarked against
                diagnostic reference levels) and <strong>authorisation</strong> of exposures against agreed guidelines, together
                with dose recording and mandatory notification of clinically significant accidental or unintended exposures to
                the Care Quality Commission (CQC)
                <InlineRef topicId="xray-radiation-safety" refLabel="IR(ME)R 2017" />.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="dose-limits" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Dose Limits & Personal Dosimetry">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>UK Ionising Radiations Regulations 2017 (IRR 2017) set the following effective dose limits per calendar year:</p>

              {/* Quick-reference: IRR 2017 limits at a glance */}
              <aside
                aria-labelledby="irr-quickref-title"
                className="rounded-xl border border-border bg-background/80 p-4 not-prose"
                style={{ borderLeftWidth: 4, borderLeftColor: "hsl(var(--physics))" }}
              >
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h3
                    id="irr-quickref-title"
                    className="text-sm font-semibold text-foreground tracking-tight"
                  >
                    IRR 2017 — dose limits at a glance
                  </h3>
                  <span className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded-md bg-physics/10 text-physics">
                    UK · per calendar year
                  </span>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {/* Effective (whole-body) dose limits */}
                  <div className="rounded-lg border border-border bg-muted/30 p-3">
                    <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-2">
                      Effective dose (whole body)
                    </p>
                    <ul className="space-y-1.5 text-xs">
                      <li className="flex items-baseline justify-between gap-3">
                        <span className="text-foreground"><strong>Classified worker</strong></span>
                        <span className="tabular-nums font-semibold text-foreground">20 mSv</span>
                      </li>
                      <li className="flex items-baseline justify-between gap-3 text-muted-foreground">
                        <span className="italic">5-yr average; max in any 1 yr</span>
                        <span className="tabular-nums">50 mSv</span>
                      </li>
                      <li className="flex items-baseline justify-between gap-3">
                        <span className="text-foreground"><strong>Trainee 16–18</strong></span>
                        <span className="tabular-nums font-semibold text-foreground">6 mSv</span>
                      </li>
                      <li className="flex items-baseline justify-between gap-3">
                        <span className="text-foreground"><strong>Member of the public</strong></span>
                        <span className="tabular-nums font-semibold text-foreground">1 mSv</span>
                      </li>
                      <li className="flex items-baseline justify-between gap-3">
                        <span className="text-foreground"><strong>Foetus</strong> (declared pregnancy)</span>
                        <span className="tabular-nums font-semibold text-foreground">1 mSv</span>
                      </li>
                    </ul>
                  </div>

                  {/* Equivalent (organ) dose limits + thresholds */}
                  <div className="rounded-lg border border-border bg-muted/30 p-3">
                    <p className="text-[11px] uppercase tracking-wide text-muted-foreground mb-2">
                      Equivalent dose (organ)
                    </p>
                    <ul className="space-y-1.5 text-xs">
                      <li className="flex items-baseline justify-between gap-3">
                        <span className="text-foreground"><strong>Lens of eye</strong></span>
                        <span className="tabular-nums font-semibold text-foreground">20 mSv</span>
                      </li>
                      <li className="flex items-baseline justify-between gap-3 text-muted-foreground">
                        <span className="italic">Pre-ICRP 2011</span>
                        <span className="tabular-nums">150 mSv</span>
                      </li>
                      <li className="flex items-baseline justify-between gap-3">
                        <span className="text-foreground"><strong>Skin</strong> (1 cm² avg)</span>
                        <span className="tabular-nums font-semibold text-foreground">500 mSv</span>
                      </li>
                      <li className="flex items-baseline justify-between gap-3">
                        <span className="text-foreground"><strong>Extremities</strong></span>
                        <span className="tabular-nums font-semibold text-foreground">500 mSv</span>
                      </li>
                    </ul>

                    <p className="text-[11px] uppercase tracking-wide text-muted-foreground mt-3 mb-2">
                      Deterministic thresholds
                    </p>
                    <ul className="space-y-1.5 text-xs">
                      <li className="flex items-baseline justify-between gap-3">
                        <span className="text-foreground">Lens cataract (cumulative)</span>
                        <span className="tabular-nums font-semibold text-foreground">0.5 Gy</span>
                      </li>
                      <li className="flex items-baseline justify-between gap-3">
                        <span className="text-foreground">Skin erythema (acute)</span>
                        <span className="tabular-nums font-semibold text-foreground">2 Gy</span>
                      </li>
                      <li className="flex items-baseline justify-between gap-3">
                        <span className="text-foreground">Temporary sterility (M)</span>
                        <span className="tabular-nums font-semibold text-foreground">0.15 Gy</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <p className="text-[11px] text-muted-foreground italic mt-3 leading-snug">
                  Effective dose (Sv) = Σ (organ equivalent dose × tissue weighting wT). Stochastic risk has
                  <strong className="not-italic text-foreground"> no threshold</strong>; deterministic effects do.
                </p>
              </aside>

              <p>
                <strong>Personal dosimetry</strong> uses thermoluminescent (TLD) or optically stimulated luminescence (OSL) badges,
                read monthly. The standard configuration is a single collar badge worn outside the apron at chest level (estimates
                effective dose to head/neck/lens) ± a body badge under the apron for true effective dose in high-exposure roles.
                <strong> Pregnant workers</strong> add a second badge under the apron at waist/abdomen level for foetal dose monitoring.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="effects" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Stochastic & Deterministic Effects">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                <strong>Stochastic effects</strong> have <em>no threshold</em>; probability of harm rises with dose, but severity does
                not. Cancer induction and heritable effects are the principal stochastic risks. Because there is no safe threshold,
                every avoidable exposure should be avoided.
              </p>
              <p>
                <strong>Deterministic effects</strong> have a <em>threshold dose</em> below which the effect does not occur, and
                severity rises with dose above it. Relevant thresholds for staff:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li><strong>Lens (cataract)</strong>: 0.5 Gy cumulative (ICRP 2011) — drives mandatory leaded glasses for interventionalists and anaesthetists in IR.</li>
                <li><strong>Skin erythema</strong>: ~2 Gy single dose — relevant to long fluoroscopy procedures (TIPS, complex EP ablation, embolisation).</li>
                <li><strong>Bone marrow suppression</strong>: ~0.5 Gy single whole-body dose; lethality at ~3–4 Gy without treatment.</li>
                <li><strong>Foetal effects</strong>: organogenesis (8–15/56 days post-conception) most sensitive — &gt;100 mGy raises risk of microcephaly and intellectual disability; &lt;50 mGy is generally considered low-risk.</li>
              </ul>
            </div>

            {/* === Summary: deterministic vs stochastic + dose-response === */}
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Summary — deterministic vs stochastic, and how risk changes with dose</h3>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-muted/40">
                      <th className="text-left p-2 font-semibold text-foreground border border-border">Feature</th>
                      <th className="text-left p-2 font-semibold text-foreground border border-border">Deterministic (tissue reactions)</th>
                      <th className="text-left p-2 font-semibold text-foreground border border-border">Stochastic</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr>
                      <td className="p-2 border border-border font-medium text-foreground">Mechanism</td>
                      <td className="p-2 border border-border">Cell killing — once enough cells in a tissue are lost, function fails</td>
                      <td className="p-2 border border-border">Sub-lethal DNA damage in a surviving cell → mutation → cancer or heritable effect</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-border font-medium text-foreground">Threshold?</td>
                      <td className="p-2 border border-border">Yes — clear dose threshold below which the effect does not occur</td>
                      <td className="p-2 border border-border">No threshold (ICRP linear-no-threshold model)</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-border font-medium text-foreground">What rises with dose?</td>
                      <td className="p-2 border border-border"><em>Severity</em> of the effect (and probability above threshold approaches 100%)</td>
                      <td className="p-2 border border-border"><em>Probability</em> of the effect — severity is all-or-nothing once it occurs</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-border font-medium text-foreground">Latency</td>
                      <td className="p-2 border border-border">Days to months (erythema, cataract, marrow suppression)</td>
                      <td className="p-2 border border-border">Years to decades (solid tumours), months to years (leukaemia)</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-border font-medium text-foreground">Examples</td>
                      <td className="p-2 border border-border">Skin erythema (~2 Gy), cataract (0.5 Gy), marrow suppression (~0.5 Gy), foetal anomalies (~100 mGy)</td>
                      <td className="p-2 border border-border">Solid cancers, leukaemia, heritable mutations</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-border font-medium text-foreground">Dominant in clinical practice</td>
                      <td className="p-2 border border-border">High-dose interventional fluoroscopy (TIPS, EP ablation, embolisation, EVAR)</td>
                      <td className="p-2 border border-border">All diagnostic radiology and routine occupational exposure</td>
                    </tr>
                    <tr>
                      <td className="p-2 border border-border font-medium text-foreground">Mitigated by</td>
                      <td className="p-2 border border-border">Dose limits, procedure planning, leaded glasses, skin-dose monitoring</td>
                      <td className="p-2 border border-border">ALARA — justification, optimisation, time/distance/shielding</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Inline dose–response diagram */}
              <div className="rounded-xl border border-border bg-card p-3 overflow-x-auto">
                <svg
                  viewBox="0 0 720 280"
                  className="w-full h-auto min-w-[420px]"
                  role="img"
                  aria-label="Dose-response curves showing sigmoidal threshold deterministic effect on the left and linear no-threshold stochastic effect on the right"
                >
                  {/* === LEFT panel: deterministic (sigmoid with threshold) === */}
                  <g>
                    <text x="170" y="22" textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
                      Deterministic — severity vs dose
                    </text>
                    {/* axes */}
                    <line x1="50" y1="50" x2="50" y2="230" stroke="hsl(var(--border))" />
                    <line x1="50" y1="230" x2="320" y2="230" stroke="hsl(var(--border))" />
                    <text x="185" y="258" textAnchor="middle" className="fill-muted-foreground text-[10px]">
                      Dose →
                    </text>
                    <text x="20" y="140" textAnchor="middle" transform="rotate(-90 20 140)" className="fill-muted-foreground text-[10px]">
                      Severity / incidence
                    </text>
                    {/* Threshold marker */}
                    <line x1="140" y1="50" x2="140" y2="230" stroke="hsl(var(--destructive))" strokeDasharray="3 3" opacity={0.6} />
                    <text x="142" y="62" className="fill-destructive text-[10px] font-semibold">
                      Threshold
                    </text>
                    {/* Sigmoidal curve: flat → 0 below threshold (140), then rises to plateau */}
                    <path
                      d="M 50 230 L 140 230 C 170 230, 200 100, 240 65 C 270 50, 300 50, 320 50"
                      fill="none"
                      stroke="hsl(var(--destructive))"
                      strokeWidth={2.4}
                    />
                    {/* Annotations */}
                    <text x="90" y="220" className="fill-muted-foreground text-[10px]">
                      No effect
                    </text>
                    <text x="245" y="80" className="fill-destructive text-[10px] font-semibold">
                      Effect certain &amp; severe
                    </text>
                  </g>

                  {/* === RIGHT panel: stochastic (linear no-threshold) === */}
                  <g transform="translate(360, 0)">
                    <text x="170" y="22" textAnchor="middle" className="fill-foreground text-[12px] font-semibold">
                      Stochastic — probability vs dose
                    </text>
                    <line x1="50" y1="50" x2="50" y2="230" stroke="hsl(var(--border))" />
                    <line x1="50" y1="230" x2="320" y2="230" stroke="hsl(var(--border))" />
                    <text x="185" y="258" textAnchor="middle" className="fill-muted-foreground text-[10px]">
                      Dose →
                    </text>
                    <text x="20" y="140" textAnchor="middle" transform="rotate(-90 20 140)" className="fill-muted-foreground text-[10px]">
                      Probability of effect
                    </text>
                    {/* Linear-no-threshold line from origin */}
                    <line x1="50" y1="230" x2="320" y2="80" stroke="hsl(var(--primary))" strokeWidth={2.4} />
                    {/* Hormesis / supralinear uncertainty band at low dose */}
                    <path
                      d="M 50 230 Q 100 220 150 195"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth={1}
                      strokeDasharray="3 3"
                      opacity={0.5}
                    />
                    <path
                      d="M 50 230 Q 100 200 150 195"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth={1}
                      strokeDasharray="3 3"
                      opacity={0.5}
                    />
                    <text x="60" y="220" className="fill-muted-foreground text-[10px]">
                      Low-dose extrapolation
                    </text>
                    <text x="60" y="232" className="fill-muted-foreground text-[9px] italic">
                      (assumed linear)
                    </text>
                    <text x="225" y="105" className="fill-primary text-[10px] font-semibold">
                      No safe threshold
                    </text>
                  </g>
                </svg>
                <p className="text-[11px] text-muted-foreground mt-2 text-center">
                  Left: deterministic effects only appear once dose exceeds a tissue-specific threshold, then severity rises rapidly. Right: stochastic risk is assumed proportional to dose all the way to zero (linear no-threshold model) — every avoidable mGy matters.
                </p>
              </div>

              <div className="p-4 rounded-lg border border-physics/30 bg-physics/5">
                <p className="text-xs uppercase tracking-wide text-physics font-semibold mb-2">Key learning points</p>
                <ul className="text-sm text-foreground space-y-1.5 list-disc list-inside marker:text-physics">
                  <li><strong>Deterministic = dose causes severity</strong> above a threshold; <strong>stochastic = dose changes the probability</strong> of an all-or-nothing harm with no threshold.</li>
                  <li>Stochastic risk justifies <strong>ALARA</strong> for routine practice; deterministic thresholds drive specific protections (leaded glasses, skin-dose limits in interventional procedures).</li>
                  <li>Dose limits (ICRP / IRR17): occupational <strong>20 mSv/yr effective dose</strong>, lens <strong>20 mSv/yr</strong>, skin/extremity <strong>500 mSv/yr</strong> — all set well below deterministic thresholds with a wide stochastic safety margin.</li>
                  <li>The foetus is a special case — the developing CNS has an effective deterministic threshold (~100 mGy) and is also at higher stochastic risk; declared pregnant workers limit equivalent dose to the abdomen to 1 mSv for the remainder of pregnancy.</li>
                </ul>
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="practical" exams={[Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Practical Anaesthetic Considerations">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                The anaesthetist is often the staff member with the longest time in the room and the most fixed position (at the head
                of the patient). Standard precautions:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Wear a 0.5 mm Pb wrap-around apron, 0.5 mm thyroid shield, and leaded glasses for every fluoroscopic case.</li>
                <li>Position behind a ceiling-suspended lead screen during cine runs and DSA acquisitions.</li>
                <li>Use long IV/extension lines and remote infusion pumps to allow you to step back during high-dose phases.</li>
                <li>Communicate with the radiographer: ask for pulsed fluoroscopy and tight collimation as a routine.</li>
                <li>Wear your dosimeter — check it is yours, in date, and read monthly.</li>
                <li>Care for the apron: hang it on a stand (not folded); annual integrity testing for cracks.</li>
              </ul>
              <p>
                For <strong>CT</strong> in resus or ICU transfers, exposure is brief but cumulative for staff who routinely accompany
                patients. Step out of the room or behind the lead-glass during acquisition; never stay in the bore unless clinically
                required (e.g. ventilated unstable patient — wear lead and stand at the back).
              </p>
            </div>
            </CollapsibleSubsection>
            <CollapsibleSubsection title="Risks of Iodinated Contrast Media">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                Most CT and cath-lab studies the anaesthetist attends use intravascular iodinated contrast. Four risks matter
                for anaesthetic practice <InlineRef topicId="xray-radiation-safety" refLabel="RCR Contrast 2023" />:
              </p>
              <ul className="list-disc list-inside space-y-1.5 ml-2">
                <li>
                  <strong>Acute hypersensitivity / anaphylaxis</strong> — mild reactions (urticaria, nausea, flushing) occur in
                  ~1–3% with modern low-osmolar agents; severe reactions are rare (~1:10,000) and fatal reactions rarer still
                  (~1:100,000). Most are <em>non-IgE, direct mast-cell activation</em> rather than true allergy. Signs range from
                  urticaria, flushing and angio-oedema to bronchospasm, hypotension and cardiovascular collapse. Management is
                  standard anaphylaxis practice: stop the injection, ABC approach, <strong>IM adrenaline 500 micrograms</strong> for
                  anaphylaxis, oxygen and fluids, then antihistamine and corticosteroid, with tryptase sampling and allergy
                  referral. A stated shellfish allergy is <em>not</em> a specific risk factor for contrast reaction — a prior
                  reaction to contrast is <InlineRef topicId="xray-radiation-safety" refLabel="RCR Contrast 2023" />.
                </li>
                <li>
                  <strong>Contrast-associated / contrast-induced nephropathy (CIN)</strong> — a rise in serum creatinine
                  ≥26 micromol/L or ≥25% within 48–72 hours of intravascular contrast, without another cause. Risk factors:
                  pre-existing CKD (especially eGFR &lt;30), diabetic nephropathy, dehydration/hypovolaemia, heart failure, large
                  contrast volume, intra-arterial route, repeated exposure, sepsis and concurrent nephrotoxins. Prevention: check
                  eGFR beforehand, correct hypovolaemia, give IV isotonic saline ~1 mL/kg/h peri-procedure in high-risk patients,
                  use the lowest effective volume of a low- or iso-osmolar non-ionic agent, stop NSAIDs and other nephrotoxins, and
                  avoid repeat contrast within 48–72 hours; N-acetylcysteine is no longer supported
                  <InlineRef topicId="xray-radiation-safety" refLabel="RCR Contrast 2023" />.
                </li>
                <li>
                  <strong>Metformin</strong> — accumulation and lactic acidosis risk if contrast precipitates acute kidney injury.
                  With eGFR ≥30 and a low-volume IV contrast study, no interruption is needed. With eGFR &lt;30, an intra-arterial
                  study, or established acute kidney injury, stop metformin at the time of contrast and restart 48 hours later once
                  renal function is confirmed stable <InlineRef topicId="xray-radiation-safety" refLabel="RCR Contrast 2023" />.
                </li>
                <li>
                  <strong>Phaeochromocytoma</strong> — the iodine load can precipitate catecholamine release and a hypertensive
                  crisis. Ensure adequate alpha blockade first, avoid high-osmolar ionic agents, and have phentolamine available
                  <InlineRef topicId="xray-radiation-safety" refLabel="RCR Radiation 2020" />.
                </li>
                <li>
                  <strong>Thyroid</strong> — the large iodine load can precipitate thyrotoxicosis or thyroid storm in untreated
                  Graves' disease or an autonomous nodule, and blocks radioiodine uptake for subsequent weeks
                  <InlineRef topicId="xray-radiation-safety" refLabel="RCR Contrast 2023" />.
                </li>
              </ul>
            </div>
            </CollapsibleSubsection>
            <CrossReferenceCallout
              reason="Clinical-context companion to this physics topic — the IR-suite anaesthetic plan (remote location, contrast reactions, procedure-specific issues) where these radiation-safety principles are applied."
              links={[{ topicId: "interventional-radiology" }]}
              variant="inline"
            />
          </ExamSection>

          <ExamSection id="references" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <ReferencesList references={REFERENCES} />
            <p className="text-[11px] text-muted-foreground italic mt-3">
              Numbers correspond to inline superscripts above. Standards (ICRP, IAEA) are reviewed periodically — verify against the current edition before quoting in audit or guideline work.
            </p>
          </ExamSection>
          <ExamPitfallsCallout
            accent="physics"
            pitfalls={[
              "X-rays produced when accelerated electrons strike a tungsten anode — bremsstrahlung plus characteristic radiation.",
              "Photon–tissue interactions: photoelectric absorption (low energy, high Z) dominates contrast; Compton scatter (higher energy) dominates dose to staff.",
              "Dose units: absorbed dose (Gy), equivalent dose (Sv), effective dose (Sv) — multiply by tissue and radiation weighting factors.",
              "ALARA: time, distance (inverse-square law), shielding. Doubling distance quarters dose.",
              "Annual occupational limit for classified workers: 20 mSv whole-body; lens 20 mSv; extremities 500 mSv.",
            ]}
          />
          <TopicFaqs faqs={xrayRadiationSafetyFaqs} />

        </>
      }
    />
  );
};

export default XRayRadiationSafetyTopic;
