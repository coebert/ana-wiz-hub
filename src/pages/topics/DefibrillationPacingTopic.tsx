import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import DefibrillationPacingDiagram from "@/components/diagrams/physics/DefibrillationPacingDiagram";
import { defibrillationPacingQuiz } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import InlineRef from "@/components/references/InlineRef";

const defibrillationPacingFaqs: Array<[string, string]> = [
  [
    "What is the difference between monophasic and biphasic defibrillation?",
    "Monophasic — current flows in one direction; 360 J for all shocks (older defibrillators). Biphasic — current reverses direction mid-shock, lowers myocardial damage and skin burns, higher first-shock success at lower energy (120–200 J device-specific). Biphasic is now standard; Resus Council recommends manufacturer's setting, typically 150 J then escalating."
  ],
  [
    "When is synchronised cardioversion indicated and why must the shock be synchronised?",
    "For unstable tachyarrhythmias with a pulse (AF, atrial flutter, SVT, VT with pulse). Synchronisation delivers the shock on the R wave to avoid the vulnerable T wave period — an unsynchronised shock on the T wave can induce VF. Energy: AF 120–200 J biphasic, atrial flutter and SVT 70–120 J, VT 100 J starting."
  ],
  [
    "What are the indications for temporary transvenous pacing?",
    "Symptomatic bradycardia unresponsive to atropine: complete heart block, Mobitz II AV block, alternating bundle branch block, asystole, drug-induced bradycardia (β-blocker, digoxin), peri-procedural for high-risk patients (e.g. RCA PCI with RV infarct). Transcutaneous pacing is the bridge until transvenous access — sedation needed as it is painful."
  ]
];

const objectives = [
  "Compare monophasic and biphasic defibrillation waveforms in terms of energy, efficacy and myocardial injury",
  "List the determinants of transthoracic impedance and the manoeuvres that reduce it",
  "Decode the 5-position NBG pacemaker code and recognise the common modes (VVI, DDD, AAI, VOO/DOO)",
  "Predict pacemaker behaviour in response to magnet application and identify when it is unsafe",
  "Plan a perioperative strategy for patients with pacemakers and ICDs to minimise EMI-related harm",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Energy delivered by a defibrillator capacitor",
    scenario:
      "A defibrillator stores energy in a 32 µF capacitor charged to 5,000 V. Calculate the stored energy and explain why the patient does not receive the full amount.",
    working:
      "E = ½CV² = ½ × 32 × 10⁻⁶ × (5000)² = 0.5 × 32 × 10⁻⁶ × 2.5 × 10⁷ = 400 J.\nDelivered energy depends on transthoracic impedance (TTI). With TTI ≈ 75 Ω only ~4% of charge crosses the myocardium; biphasic devices use impedance compensation to deliver a consistent transmyocardial current.",
    answer:
      "Stored energy is 400 J. The 'selected energy' on the front panel (e.g. 200 J) is the energy actually delivered into a 50 Ω test load — only a small fraction (≈4%) reaches the heart, which is why pad contact, expiration phase and gel use matter so much.",
    cites: ["BJA Educ 2005"],
  },
  {
    title: "Pacemaker patient for elective laparoscopic cholecystectomy",
    scenario:
      "A 78-year-old DDD-paced for complete heart block is listed for laparoscopic cholecystectomy. The surgeon plans monopolar diathermy to the abdomen. Outline the perioperative plan.",
    working:
      "Pre-op: device interrogation within 6–12 months, identify pacing dependence, document mode and battery, contact cardiac physiology team.\nIntra-op: external defib pads on; bipolar diathermy if possible; if monopolar — short bursts <5 s, return pad on the thigh so current vector avoids the generator; magnet over generator converts most pacemakers to DOO (asynchronous) and prevents EMI-induced inhibition.\nMonitoring: ECG + plethysmography (confirms cardiac output during EMI artefact); arterial line considered.\nPost-op: re-interrogate before discharge to home / ward to confirm settings unchanged and reset to original mode.",
    answer:
      "Pre-op interrogation, intra-op magnet (DOO), bipolar diathermy where feasible with the return pad on the thigh, defib pads attached, plethysmographic confirmation of perfusion, and post-op reinterrogation. ICD patients additionally need anti-tachycardia therapies disabled before incision.",
    cites: ["Cross & Plunkett Ch.14"],
  },
];

const DefibrillationPacingTopic = () => {
  return (
    <TopicTemplate
      title="Defibrillation & Pacing"
      subtitle="Monophasic vs biphasic waveforms, transthoracic impedance, pacemaker modes, and electromagnetic interference"
      backPath="/physics"
      backLabel="Physics"
      accentColor="text-physics"
      topicId="defibrillation-pacing"
      topicTitle="Defibrillation & Pacing"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={defibrillationPacingQuiz}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM], curriculumCodes: ["RCoA Primary — Physics", "RCoA Final — Physics", "FFICM 2.5"] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL, Exam.FFICM] },
      }}
      sectionSources={{
        workedExamples: ["Resuscitation Council UK 2021", "RCUK Paediatric ALS 2021", "BJA Educ 2005", "Cross & Plunkett Ch.14"],
        keyPoints: ["Resuscitation Council UK 2021", "RCUK Paediatric ALS 2021", "BJA Educ 2005", "Cross & Plunkett Ch.14", "Assoc Anaesth CIED 2022"],
      }}
      keyPoints={[
        { text: "Biphasic defibrillators use lower energy (120–200 J vs 360 J monophasic) with equal or superior efficacy and less myocardial damage", cites: ["Resuscitation Council UK 2021"] },
        { text: "Transthoracic impedance (typically 70–80 Ω) determines how much current reaches the heart — only ~4% traverses the myocardium", cites: ["BJA Educ 2005"] },
        { text: "Factors reducing TTI: gel pads, firm pressure, expiration, larger pads, repeated shocks, and shaving a hairy chest", cites: ["Cross & Plunkett Ch.14"] },
        { text: "NBG pacemaker code: 5 positions — I (paced), II (sensed), III (response), IV (rate modulation), V (multisite)", cites: ["Resuscitation Council UK 2021"] },
        { text: "DDD is the most physiological mode; VOO/DOO (asynchronous) is used with magnet application to avoid EMI-induced inhibition", cites: ["BJA Educ 2005"] },
        { text: "Surgical diathermy is the most common source of EMI — bipolar preferred; monopolar in short bursts with return pad away from generator", cites: ["Cross & Plunkett Ch.14"] },
        { text: "ICD patients: disable anti-tachycardia therapies intra-operatively; always re-interrogate post-operatively", cites: ["Resuscitation Council UK 2021"] },
      ]}
      coreConcepts={
        <>
          <ExamSection id="introduction" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Introduction" defaultOpen>
            <p className="text-muted-foreground leading-relaxed">
              Defibrillation delivers a controlled electrical shock to depolarise a critical mass of myocardium simultaneously,
              terminating fibrillation and allowing the sinoatrial node to resume organised pacing. Cardiac pacing provides
              electrical stimulation when the heart's intrinsic conduction system fails. Understanding the physics of energy
              delivery, waveform design, and electromagnetic interference is essential for the Primary FRCA and safe perioperative
              management of patients with cardiac implantable electronic devices (CIEDs).
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="diagram" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Interactive Diagrams">
            <DefibrillationPacingDiagram />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="waveforms" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Defibrillation Waveforms">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                <strong>Monophasic damped sinusoidal (MDS)</strong> waveforms deliver current in a single direction. They require
                higher energies (up to 360 J for VF) and do not compensate for varying transthoracic impedance. They have been
                largely superseded by biphasic technology.
              </p>
              <p>
                <strong>Biphasic waveforms</strong> reverse polarity during the shock, delivering current first in one direction
                then the other. Two subtypes exist: <strong>biphasic truncated exponential (BTE)</strong> and <strong>rectilinear
                biphasic (RLB)</strong>. Both achieve equivalent or superior defibrillation success at lower energies (120–200 J),
                causing less myocardial injury and post-shock ST changes.
              </p>
              <p>
                A key advantage of biphasic devices is <strong>impedance compensation</strong> — the waveform automatically adjusts
                its duration and voltage based on measured transthoracic impedance, ensuring consistent current delivery regardless
                of patient characteristics.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="dccv-energies" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Synchronised DC Cardioversion — Energy Selection">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                In synchronised cardioversion the shock is timed to the R wave to avoid the relative refractory
                period (T wave) and the risk of inducing VF. Energies below are for <strong>biphasic</strong> devices
                — manufacturer guidance always takes precedence. For monophasic devices, use 200 J for AF and
                consider 360 J early; double the listed biphasic dose as a rough guide for other rhythms.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-3 font-medium text-foreground">Rhythm</th>
                      <th className="text-left py-2 pr-3 font-medium text-foreground">First shock (biphasic)</th>
                      <th className="text-left py-2 font-medium text-foreground">Escalation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="py-2 pr-3"><strong>Atrial fibrillation</strong></td>
                      <td className="py-2 pr-3">120–150 J synchronised</td>
                      <td className="py-2">Escalate to maximum (typically 200 J), then consider AP pad position</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3"><strong>Atrial flutter / SVT</strong></td>
                      <td className="py-2 pr-3">70–120 J synchronised</td>
                      <td className="py-2">Lower thresholds — many flutters cardiovert at 50–100 J</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3"><strong>Stable VT with pulse</strong></td>
                      <td className="py-2 pr-3">120–150 J synchronised</td>
                      <td className="py-2">Escalate stepwise to maximum biphasic output</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3"><strong>Polymorphic VT (pulse) / unsynchronised</strong></td>
                      <td className="py-2 pr-3">Treat as VF — defibrillate <em>unsynchronised</em></td>
                      <td className="py-2">120–200 J first shock, then 150–360 J per device guidance</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3"><strong>VF / pulseless VT</strong></td>
                      <td className="py-2 pr-3">120–150 J unsynchronised</td>
                      <td className="py-2">Subsequent shocks 150–200 J (or up to 360 J biphasic per manufacturer)</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3"><strong>Paediatric (synch or defib)</strong></td>
                      <td className="py-2 pr-3">1 J/kg synch; initial defibrillation 4 J/kg</td>
                      <td className="py-2">Escalate refractory VF/pVT towards 8 J/kg or the adult dose when appropriate; never exceed 10 J/kg. Synchronised cardioversion may be escalated to 2 J/kg <InlineRef topicId="defibrillation-pacing" refLabel="RCUK Paediatric ALS 2021" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p>
                <strong>Practical points:</strong> sedate or anaesthetise the conscious patient (propofol ± fentanyl,
                or short-acting induction with airway support). Confirm the <em>sync</em> marker is on the R wave —
                re-enable sync after every shock (most devices revert to unsynchronised mode automatically). For
                refractory AF, consider <strong>anteroposterior pad position</strong>, ensure full expiration, firm pad
                pressure (~8 kg), and exclude reversible factors (electrolytes, hypoxia, thyroid). Anticoagulation
                status must be confirmed for AF &gt;48 h or unknown duration before elective DCCV.
              </p>
              <p className="text-xs italic">
                Sources: Resuscitation Council UK Adult Advanced Life Support (2021); ERC Guidelines 2021; ESC
                Guidelines for AF (2024) and Ventricular Arrhythmias (2022); APLS / RCUK Paediatric ALS 2021.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="tti" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Transthoracic Impedance">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                Transthoracic impedance (TTI) is the resistance to current flow across the chest, typically <strong>70–80 Ω</strong> but
                ranging from 15–150 Ω. Only approximately <strong>4% of delivered current</strong> actually traverses the heart — the
                remainder follows alternative pathways through chest wall muscle, lung, and other structures.
              </p>
              <p>
                <strong>Patient and position factors increasing impedance</strong> include obesity, hyperinflated lungs, inspiration
                and anteroposterior placement (which can produce higher impedance than anterolateral placement). <strong>Technique and
                equipment factors increasing impedance</strong> include poor pad-skin contact, small pads and excessive chest hair.
                Factors that <strong>reduce impedance</strong> include
                self-adhesive gel pads, firm application pressure (~25 lb), defibrillation during expiration, larger pad surface area,
                and successive shocks (transthoracic impedance falls with repeated defibrillation)
                <InlineRef topicId="defibrillation-pacing" refLabel="BJA Educ 2005" />.
              </p>
              <p>
                Pad placement follows the <strong>anterolateral</strong> position: one pad below the right clavicle (right sternal edge)
                and one at the left mid-axillary line (V6 position). Alternative positions include anteroposterior, which may be
                preferred in certain circumstances.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="pacing-modes" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]}>
            <CollapsibleSubsection title="Pacemaker Modes">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                Pacemakers are classified using the <strong>NASPE/BPEG Generic (NBG) code</strong>, a five-position system describing
                chamber paced (I), chamber sensed (II), response to sensing (III), rate modulation (IV), and multisite pacing (V).
                Letters used include A (atrium), V (ventricle), D (dual), O (none), I (inhibited), T (triggered), and R (rate-responsive).
              </p>
              <p>
                <strong>VVI</strong> (ventricular demand) is the most common single-chamber mode — it paces and senses the ventricle,
                inhibiting output when intrinsic activity is detected. Its main limitation is <strong>pacemaker syndrome</strong>:
                ventricular pacing without AV synchrony permits atrial contraction against closed mitral and tricuspid valves,
                reducing cardiac output and producing fatigue, dizziness, syncope, hypotension and prominent neck pulsations
                (cannon waves in the JVP). Upgrading to a dual-chamber system restores AV synchrony and usually resolves it.
                <strong> DDD</strong> is the most physiological mode, pacing and sensing both chambers to
                maintain AV synchrony, and is the mode of choice for complete heart block.
              </p>
              <p>
                Magnet application converts most pacemakers to an <strong>asynchronous mode</strong> (VOO or DOO) — fixed-rate pacing
                without sensing. This eliminates the risk of EMI-induced inhibition during surgery. The magnet rate also provides
                manufacturer-specific information about battery status. <strong>Beginning of life (BOL)</strong> describes a fresh
                battery and its expected magnet rate; at the <strong>elective replacement indicator (ERI)</strong>, the magnet rate is
                slower and generator replacement should be planned; <strong>end of life (EOL)</strong> denotes advanced depletion and
                potentially unreliable output or altered device behaviour. A slow magnet rate must be interpreted against the
                manufacturer chart. ERI/EOL devices need urgent pacing-team review and possible reprogramming or replacement before
                high-risk surgery, particularly when EMI is expected
                <InlineRef topicId="defibrillation-pacing" refLabel="Assoc Anaesth CIED 2022" />.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="temporary-pacing" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["FFICM 2.5"]}>
            <CollapsibleSubsection title="Temporary Cardiac Pacing">
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  <strong>Indications</strong> include haemodynamically significant symptomatic bradycardia unresponsive to drugs,
                  high-grade AV block after myocardial infarction, drug toxicity, and a bridge to recovery or permanent pacing.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-border p-4">
                    <h3 className="font-semibold text-foreground">Transcutaneous pacing</h3>
                    <p className="mt-2 text-sm">Apply anterolateral or anteroposterior multifunction pads, select demand mode and a rate around 60–80 min⁻¹, then increase current from about 50 mA until electrical and mechanical capture occurs (often 50–100 mA). Confirm a pulse for every paced complex; provide sedation and analgesia because skeletal-muscle contraction is painful. Limitations are discomfort, artefact and failure to capture.</p>
                  </div>
                  <div className="rounded-lg border border-border p-4">
                    <h3 className="font-semibold text-foreground">Transvenous pacing</h3>
                    <p className="mt-2 text-sm">Insert via the internal jugular or subclavian vein and advance the electrode to the right-ventricular apex under fluoroscopy, intracavitary ECG or pressure-waveform guidance. A typical initial mode is VVI at 70 min⁻¹; set output above the measured capture threshold and sensitivity below the sensed R-wave amplitude. Complications include arrhythmia, failure to sense/capture, pneumothorax, cardiac perforation/tamponade, infection and venous thrombosis.</p>
                  </div>
                </div>
                <p className="text-sm">Transcutaneous pacing is a rapid bridge, not a substitute for prompt definitive planning when ongoing pacing is required <InlineRef topicId="defibrillation-pacing" refLabel="RCUK 2021 Bradycardia" />.</p>
                <div className="rounded-lg border border-border p-4 space-y-3">
                  <h3 className="font-semibold text-foreground">Pacemaker troubleshooting</h3>
                  <div className="grid gap-3 md:grid-cols-3 text-sm">
                    <div><strong className="text-foreground">Failure to capture</strong><p className="mt-1">A pacing spike is not followed by a P wave or QRS complex. Check cables and lead position; correct ischaemia/electrolytes, increase output (mA), reposition if appropriate and arrange lead review.</p></div>
                    <div><strong className="text-foreground">Undersensing</strong><p className="mt-1">Spikes occur despite intrinsic activity. Lead displacement, low-amplitude signals or an insensitive setting may be responsible. Check connections and increase sensitivity by reducing the mV value.</p></div>
                    <div><strong className="text-foreground">Failure to output</strong><p className="mt-1">No spike appears despite a rate below the lower limit. Check power, connections and lead integrity; remove EMI causing oversensing and obtain generator support or replacement.</p></div>
                  </div>
                  <svg viewBox="0 0 660 120" className="w-full h-auto" role="img" aria-label="Simplified pacing traces showing capture, failure to capture and undersensing">
                    <path d="M10 35h45l4-28 5 28h18l8-12 8 12h105" fill="none" className="stroke-primary" strokeWidth="2"/><text x="8" y="58" className="fill-muted-foreground text-[11px]">capture: spike → QRS</text>
                    <path d="M230 35h45l4-28 5 28h130" fill="none" className="stroke-destructive" strokeWidth="2"/><text x="228" y="58" className="fill-muted-foreground text-[11px]">failure to capture: spike only</text>
                    <path d="M448 35h25l12-20 12 20h25l4-28 5 28h35l12-20 12 20h55" fill="none" className="stroke-primary" strokeWidth="2"/><text x="446" y="58" className="fill-muted-foreground text-[11px]">undersensing: spike despite QRS</text>
                  </svg>
                  <p className="text-xs"><InlineRef topicId="defibrillation-pacing" refLabel="Assoc Anaesth CIED 2022" /></p>
                </div>
              </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="emi" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["FFICM 2.5"]}>
            <CollapsibleSubsection title="Electromagnetic Interference">
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>
                <strong>Surgical diathermy</strong> is the most significant source of EMI in the operating theatre. Monopolar diathermy
                poses the greatest risk as current passes through the body between the active electrode and return pad. EMI can cause
                inappropriate <strong>inhibition</strong> (pacemaker interprets diathermy as cardiac activity and withholds pacing) or
                <strong>inappropriate tracking</strong> (device interprets EMI as atrial activity and paces the ventricle rapidly).
              </p>
              <p>
                For patients with <strong>ICDs</strong>, anti-tachycardia therapies must be disabled intra-operatively (via magnet
                application or reprogramming) to prevent inappropriate shock delivery triggered by diathermy artefact. External
                defibrillation pads must be applied before disabling the ICD.
              </p>
              <p>
                Follow the hierarchy in the Association of Anaesthetists/MHRA perioperative guidance: use
                <strong> bipolar diathermy</strong> first; consider a harmonic scalpel when monopolar energy is otherwise required;
                if conventional monopolar diathermy is essential, use the lowest effective energy in short intermittent bursts.
                Position the return pad so the current path does not cross the CIED and keep the active electrode and cables away
                from the generator <InlineRef topicId="defibrillation-pacing" refLabel="Assoc Anaesth CIED 2022" />.
              </p>
              <p>
                A magnet is a <strong>temporary, device-specific intervention</strong>, not a universal off switch. Many pacemakers
                pace asynchronously, some have a programmable or absent response, while an ICD magnet usually suspends
                anti-tachycardia therapy without changing bradycardia pacing. Pre-operative identification, interrogation and a
                documented pacing-team plan are therefore essential; reprogram when the magnet response is unknown or unreliable.
              </p>
              <p>
                Monitor ECG continuously, but also use a pulse oximeter waveform or arterial pressure trace to confirm
                <strong> mechanical capture</strong> while diathermy obscures the ECG. External pacing/defibrillation must be
                immediately available, and all altered therapies must be restored with post-operative interrogation.
              </p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>
          <ExamPitfallsCallout
            accent="physics"
            pitfalls={[
              "Biphasic waveforms deliver lower peak current at equivalent efficacy — fewer skin burns and less myocardial stunning.",
              "Transthoracic impedance falls with paddle/pad size, conductive gel, expiration and firm contact.",
              "Pacemaker code: chamber paced / sensed / response / rate modulation / multisite (e.g. DDDR).",
              "EMI risk is highest with monopolar diathermy near the generator; an applied magnet typically converts to asynchronous (DOO/VOO), not 'off'.",
              "ICD magnet usually suspends shock therapy without affecting pacing — always confirm with manufacturer's chart.",
            ]}
          />
          <TopicFaqs faqs={defibrillationPacingFaqs} />

        </>
      }
    />
  );
};

export default DefibrillationPacingTopic;
