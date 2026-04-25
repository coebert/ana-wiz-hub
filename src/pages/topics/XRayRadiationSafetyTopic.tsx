import { TopicTemplate } from "@/components/TopicTemplate";
import { ExamSection } from "@/components/ExamSection";
import { WorkedExample } from "@/components/WorkedExamples";
import { CrossReferenceCallout } from "@/components/CrossReferenceCallout";
import { DiagramSection } from "@/components/DiagramSection";
import { XRayTubeDiagram } from "@/components/diagrams/XRayTubeDiagram";
import { RadiationSafetyChecklist } from "@/components/RadiationSafetyChecklist";
import { Cite, ReferencesList, type Reference } from "@/components/References";
import { xrayRadiationSafetyQuiz } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";

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
  },
  {
    title: "Justifying a CT pulmonary angiogram in a young patient",
    scenario:
      "A 26-year-old woman 6 days post-section presents with breathlessness. The team are considering a CTPA (~5 mSv). What dose context, alternatives and consent points should you weigh?",
    working:
      "Effective dose comparison:\n  • CXR: ~0.02 mSv\n  • V/Q scan (perfusion only): ~1–2 mSv\n  • CTPA: ~5–10 mSv (≈ 2 years background; ≈ 250 CXRs)\n  • Maternal breast tissue receives a relatively high local dose with CTPA → small lifetime breast-cancer risk increment.\nAlternatives:\n  • V/Q scan reduces breast dose substantially in young women with normal CXR.\n  • Bedside echo + leg ultrasound may avoid imaging if positive.\nJustification + optimisation (IRR 2017): every exposure must be justified, optimised (lowest dose for the diagnostic question), and authorised by an IR(ME)R practitioner.",
    answer:
      "Justify against the clinical question (a missed PE is high-cost), but in a young woman with a normal CXR and clinically suspected PE, V/Q is often the optimised first-line test. If CTPA is required, use low-dose protocols, dose modulation and lead breast shielding where local protocols allow. Document the discussion in the consent.",
  },
  {
    title: "Pregnant anaesthetist on the IR list",
    scenario:
      "A registrar declares pregnancy at 8 weeks. She is on next week's interventional cardiology list. What dose-monitoring and risk-mitigation steps should the department take?",
    working:
      "Foetal dose limit (IRR 2017): 1 mSv to the conceptus over the declared remainder of pregnancy.\nMonitoring:\n  • Standard collar dosimeter outside apron (lens/thyroid surrogate).\n  • Additional dosimeter UNDER the apron at waist level for foetal dose estimation, read monthly.\nProtective measures:\n  • 0.5 mm Pb wrap-around apron + 0.5 mm thyroid shield + leaded glasses (lens threshold for cataract under ICRP 2011: 0.5 Gy cumulative).\n  • Stand behind the ceiling-suspended lead screen during acquisitions.\n  • Maximise distance from patient during cine runs; step back during DSA.\n  • Ensure pulsed fluoroscopy is used and irradiated field collimated tightly.",
    answer:
      "Continued IR work is usually safe with the additional under-apron dosimeter, full PPE and screen use. Risk-assess monthly; remove from the rota only if doses approach the foetal limit or if procedures place her routinely close to the primary beam (e.g. pain procedures with hand exposure).",
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
      keyPoints={[
        "Diagnostic X-rays are produced by bombarding a tungsten anode with electrons accelerated across a high-voltage (typically 50–150 kVp) tube — output is a bremsstrahlung continuum plus characteristic K-shell line emissions",
        "kVp controls beam energy (penetration/quality); mAs controls beam quantity (number of photons) — together they determine dose and image contrast",
        "Four photon interactions: photoelectric (∝ Z³/E³, dominant at diagnostic energies, gives bone–soft-tissue contrast), Compton (dominant >100 keV, source of scatter), Rayleigh (minor coherent), pair production (>1.022 MeV only)",
        "Units: activity = becquerel (Bq); absorbed dose = gray (Gy, J/kg); equivalent dose = sievert (Sv) = Gy × wR; effective dose = Sv × tissue weighting factors",
        "ALARA = As Low As Reasonably Achievable. Three pillars: TIME (less exposure), DISTANCE (inverse-square law — doubling distance quarters dose), SHIELDING (0.5 mm Pb apron attenuates ~95% of scatter at 70 kVp)",
        "IRR 2017 occupational limit: 20 mSv/year (avg over 5 years, max 50 mSv/year). Public: 1 mSv/year. Declared-pregnant worker: 1 mSv to the foetus over remainder of pregnancy",
        "Stochastic effects (cancer, hereditary): no threshold, probability rises with dose. Deterministic effects (cataract, skin erythema, marrow suppression): have thresholds — ICRP 2011 lens threshold lowered to 0.5 Gy cumulative",
        "Approximate effective doses: CXR 0.02 mSv · head CT 2 mSv · CTPA 5–10 mSv · abdomen CT 10 mSv · UK background 2.7 mSv/year",
        "Anaesthetist's PPE for fluoroscopy: 0.5 mm Pb wrap-around apron, 0.5 mm thyroid shield, leaded glasses (cataract prevention), and where possible a ceiling-suspended lead screen — plus collar dosimeter outside apron",
      ]}
      coreConcepts={
        <>
          <ExamSection id="introduction" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Anaesthetists encounter ionising radiation routinely — fluoroscopy in interventional radiology and cardiology, image
              intensifiers in trauma theatre, hybrid theatre EVAR/TAVI, CT in resus and the on-call diagnostic workflow, and pain
              procedures with portable C-arms. A working knowledge of how X-rays are produced, how they interact with tissue, and how
              dose is measured underpins both safe patient practice (justification, optimisation) and personal protection (the ALARA
              framework, dose limits, dosimetry). The principles transfer directly to occupational health risk-assessments and to
              consenting patients for repeat or high-dose examinations.
            </p>
          </ExamSection>

          <ExamSection id="production" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <h2 className="text-xl font-bold text-foreground mb-2">X-ray Production</h2>
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                A diagnostic X-ray tube is an evacuated glass envelope containing a heated tungsten <strong>cathode</strong> (electron
                source by thermionic emission) and a rotating tungsten <strong>anode</strong> (the target). A high voltage —
                conventionally <strong>50–150 kVp</strong> — accelerates electrons across the tube; they strike the anode at high
                velocity. Two distinct mechanisms then generate X-rays:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>
                  <strong>Bremsstrahlung ('braking radiation')</strong> — the dominant contributor. As an electron is decelerated and
                  deflected by the field of a tungsten nucleus, the lost kinetic energy is emitted as a photon. This produces a
                  <em> continuous spectrum</em> from very low energies up to a maximum equal to the tube voltage in keV.
                </li>
                <li>
                  <strong>Characteristic radiation</strong> — when an incident electron ejects an inner-shell (K-shell) tungsten
                  electron, an outer electron drops in to fill the vacancy and releases a photon at a discrete energy (~59 and 67 keV
                  for tungsten). This appears as <em>line peaks</em> superimposed on the bremsstrahlung continuum.
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
                rotate and are oil-cooled.
              </p>
            </div>
          </ExamSection>

          <ExamSection id="interactions" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Photon–Tissue Interactions</h2>
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
          </ExamSection>

          <ExamSection id="units" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Dose Units</h2>
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
            </div>
          </ExamSection>

          <ExamSection id="alara" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-xl font-bold text-foreground mb-2">ALARA — Time, Distance, Shielding</h2>
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
                  <strong>Shielding</strong> — 0.5 mm Pb-equivalent wrap-around apron (~95% scatter attenuation at 70 kVp), 0.5 mm Pb
                  thyroid shield, leaded glasses (cataract prevention — see deterministic effects), and ceiling-suspended lead screen
                  + table-mounted lead drape. The screen is the single most effective additional measure for the anaesthetist who
                  cannot move the table or beam.
                </li>
              </ul>
              <p>
                Geometry matters: an under-couch tube (image intensifier above the patient) directs scatter downwards, away from
                staff faces and eyes, and is preferred. Avoid standing beside the X-ray tube — scatter is highest on the entrance side
                of the patient.
              </p>
              <RadiationSafetyChecklist />
            </div>
          </ExamSection>

          <ExamSection id="dose-limits" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Dose Limits & Personal Dosimetry</h2>
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
          </ExamSection>

          <ExamSection id="effects" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Stochastic & Deterministic Effects</h2>
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
          </ExamSection>

          <ExamSection id="practical" exams={[Exam.FINAL, Exam.FFICM]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Practical Anaesthetic Considerations</h2>
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
            <CrossReferenceCallout
              reason="Clinical-context companion to this physics topic — the IR-suite anaesthetic plan (remote location, contrast reactions, procedure-specific issues) where these radiation-safety principles are applied."
              links={[{ topicId: "interventional-radiology" }]}
              variant="inline"
            />
          </ExamSection>
        </>
      }
    />
  );
};

export default XRayRadiationSafetyTopic;
