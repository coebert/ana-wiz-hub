import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { ExamSection } from "@/components/exam/ExamSection";
import { electricalSafetyQuiz } from "@/data/quizzes";
import ElectricalSafetyDiagram from "@/components/diagrams/physics/ElectricalSafetyDiagram";
import { DefibrillatorCapacitorDiagram } from "@/components/diagrams/physics/DefibrillatorCapacitorDiagram";
import { IsolationTransformerDiagram } from "@/components/diagrams/physics/IsolationTransformerDiagram";
import { RCDDiagram } from "@/components/diagrams/physics/RCDDiagram";
import { MicroshockDiagram } from "@/components/diagrams/physics/MicroshockDiagram";
import { DiathermyDiagram } from "@/components/diagrams/physics/DiathermyDiagram";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import InlineRef from "@/components/references/InlineRef";

const electricalSafetyFaqs: Array<[string, string]> = [
  [
    "What are the classes I, II and III of electrical equipment?",
    "Class I — basic insulation + protective earth (e.g. floor-standing operating-theatre equipment). Class II — double or reinforced insulation, no earth (e.g. infusion pumps marked with the double-square symbol). Class III — supplied from a safety extra-low voltage source (≤24 V AC / 60 V DC), no shock hazard from the supply."
  ],
  [
    "What is the difference between type B, BF and CF applied parts?",
    "B — leakage current ≤100 µA, not for direct heart contact (e.g. operating table). BF — floating circuit, leakage ≤100 µA, safer for skin contact (e.g. ECG, NIBP). CF — floating circuit, leakage ≤10 µA, designed for direct cardiac connection (e.g. invasive pressure transducers, pacing wires). 'F' = floating (isolated from earth); 'C' = cardiac."
  ],
  [
    "What is microshock and how is it prevented?",
    "Microshock is ventricular fibrillation caused by a current as small as 50–100 µA delivered directly to the myocardium via a pacing wire or fluid-filled catheter. Prevention: use only CF-rated equipment for cardiac connections, ensure earth-leakage <10 µA, insulate the proximal end of pacing wires, and avoid touching exposed connectors with bare hands."
  ],
  [
    "Why do theatres use an isolated power supply instead of an RCD?",
    "An RCD disconnects the supply within about 40 ms when live/neutral currents differ by more than 30 mA. Sudden loss of power to a ventilator, bypass pump or surgical light can be more dangerous than the fault, so Group 2 medical locations (theatres, cardiac cath labs, critical care bedspaces) use a 1:1 isolation transformer with a line isolation monitor that alarms but does not disconnect. Two independent faults are then needed to shock anyone."
  ],
  [
    "What should I do when the line isolation monitor alarms mid-case?",
    "Do not panic or switch everything off. The supply is still safe — the alarm means one fault has occurred and the safety margin is gone. Stop connecting new devices, then unplug the most recently added equipment one at a time until the alarm clears; the last device unplugged is the faulty one. If the alarm persists with everything unplugged, the fault is in the fixed wiring: call estates, finish or pause the case safely, and avoid contact between patient and any earthed metalwork."
  ],
  [
    "What causes a diathermy return-plate burn and how is it avoided?",
    "Burns occur when the effective contact area of the return electrode falls — partial peeling, hair, scar, bony prominence, fluid or prep soaking the adhesive, or a plate applied over a metal implant — so current density at the plate rises. Apply a full-size plate to clean, dry, shaved, well-perfused muscle bulk close to the operative site, with the long axis facing the surgical field, and re-check it after repositioning. Contact-quality-monitoring plates alarm before injury occurs."
  ],
  [
    "Why does a patient get a burn somewhere other than the diathermy site?",
    "Alternate-site burns arise when current finds a small-area path to earth — ECG electrodes, temperature probes, a drip stand, stirrups, or skin-to-skin contact between a limb and the trunk. With modern isolated-output generators this is uncommon but occurs where the patient touches earthed metal. Keep the patient insulated from metal, avoid skin-to-skin bridges with padding, and site monitoring away from the current path."
  ],
  [
    "What are direct and capacitive coupling in laparoscopic surgery?",
    "Direct coupling is the active electrode touching another conductor (a metal instrument, laparoscope or clip) which then burns bowel out of view. Capacitive coupling is current induced in a surrounding conductor across intact insulation — classically an active hook inside a metal cannula, or a metal instrument in a plastic port. Insulation failure at the shaft causes the same injury. Mitigation: inspect insulation, use short bursts at lowest power, keep the whole active tip in view, activate only when the tip is clear, and use all-metal or all-plastic port systems rather than hybrids."
  ],
  [
    "How do I prevent a surgical fire in theatre?",
    "Fire needs oxidiser, fuel and ignition. Allow alcohol-based prep to dry fully and avoid pooling under drapes; avoid open oxygen delivery above the clavicles — use a cuffed tube or laryngeal mask so the oxygen is contained, or keep the inspired oxygen at the lowest tolerated level and pause enrichment for 1 minute before diathermy near the airway; keep swabs damp; and hold the active electrode in a quiver when not in use. If a fire starts: stop the gas flow, remove burning material and drapes, extinguish with saline, then reassess airway and burns."
  ],
  [
    "Is bipolar or monopolar diathermy safer for a patient with a pacemaker?",
    "Bipolar — the current path is confined to the two forceps tips, so nothing traverses the thorax or the device leads. Where monopolar is unavoidable, use short irregular bursts under 5 seconds at the lowest effective power, keep the current path (electrode to return plate) away from the generator and leads, monitor perfusion by plethysmograph or arterial trace because diathermy obscures the ECG, and have a magnet, external pacing/defibrillation pads and chronotropes immediately available."
  ],
  [
    "How does a magnet affect a pacemaker or ICD?",
    "Over most pacemakers a magnet produces asynchronous pacing (VOO/DOO) at a fixed manufacturer-specific rate, protecting against diathermy-induced inhibition. Over an ICD it suspends tachyarrhythmia detection and shock delivery but does not change pacing. Magnet behaviour varies between manufacturers and can be programmed off, so confirm the expected response with the device team, and arrange a postoperative check before the patient leaves monitored care."
  ],
  [
    "How is diathermy used safely in a patient having MRI or with an intra-aortic device?",
    "Diathermy is not used inside the MRI environment. The MRI hazards are different: radiofrequency energy heats conductive loops, so route ECG cables straight without loops, keep them off the skin, use the minimum monitoring, and only equipment labelled MR Safe or used within its MR Conditional limits. Active implants need exact device identification and a documented programme-and-monitor plan because of lead-tip heating and inappropriate therapy."
  ],
  [
    "What is a leakage current and what limits apply?",
    "Leakage current is the small current that flows from mains-powered parts to earth or to the patient through insulation and capacitance even when the device works normally. Limits under IEC 60601-1 are set by applied-part type: 100 µA for type B and BF, and 10 µA for type CF, with higher single-fault allowances. Because leakage from several devices can sum through one patient, equipotential earthing, CF connections for anything intracardiac, and routine electrical safety testing are all needed."
  ],
  [
    "What do I do if a member of staff or a patient receives an electric shock in theatre?",
    "Isolate the supply or use an insulating object to break contact before touching the casualty — never grab them. Start ALS if they are unresponsive: shock-induced arrest is often VF and responds to defibrillation. Look for entry and exit burns, arrhythmia, rhabdomyolysis and, in high-voltage injury, deep tissue damage. Monitor ECG for at least a few hours if there was any loss of consciousness, arrhythmia or a current path across the chest, quarantine the device, and report through the incident and MHRA/medical-device routes."
  ],
  [
    "Why is theatre humidity kept at 50–60%?",
    "A thin conductive film of water forms on surfaces at that humidity and continuously drains static charge to earth, preventing spark discharge. It began as protection against ignition of ether and cyclopropane and remains relevant to alcohol prep and airway fires, static damage to electronics, and static discharge to monitoring leads. Below about 40% relative humidity, drapes, vinyl flooring and clothing accumulate triboelectric charge."
  ],
  [
    "Can I use a nerve stimulator, TENS machine or forced-air warmer safely with an implanted device?",
    "Peripheral nerve stimulators deliver a few tens of milliamps over a limb and are safe with normal siting, but keep the electrodes on a limb away from the thorax and any pacing system. TENS is generally avoided over the chest or across a pacemaker or ICD because pulsed current can be sensed as intrinsic activity. Forced-air and resistive warming blankets are class-approved patient-contact devices — use only the manufacturer's blanket, never a bare hose (free-hosing causes burns), and keep them clear of the diathermy return plate."
  ],
  [
    "How often must theatre electrical equipment be tested?",
    "Frequency is set by risk in the local medical-device management policy rather than a fixed legal interval: mains-powered patient-connected devices in theatre and critical care are usually checked annually, with a visual check of plug, cable and casing by the user before every use. Anything dropped, wetted, sparking, tripping the supply or giving an unexplained monitor artefact is withdrawn and tested. Extension leads and daisy-chaining are avoided because they defeat isolated-supply protection and add earth-fault paths."
  ]
];

const objectives = [
  "Define macroshock and microshock and quote the threshold currents that cause perception, let-go, respiratory arrest and VF.",
  "Explain why intracardiac catheters reduce the VF threshold to ~100 µA and the rationale for Type CF equipment.",
  "Describe the isolated power supply with line isolation monitor and contrast with RCD/RCCB protection.",
  "Compare monopolar and bipolar diathermy, listing the principal hazards and how they are mitigated.",
  "Explain the role of theatre humidity (50–60%) and antistatic footwear (75 kΩ–10 MΩ) in electrical safety.",
  "Outline the physics of capacitor-based defibrillators and contrast monophasic and biphasic waveforms.",
];

const keyPoints = [
  { text: "Macroshock VF threshold ~100 mA via skin; microshock VF threshold ~100 µA (0.1 mA) via intracardiac catheter at 50 Hz.", cites: ["BJA Educ 2017"] },
  { text: "Type CF equipment (leakage <10 µA) required for intracardiac connections — a 10× safety margin below the microshock VF threshold.", cites: ["Cross & Plunkett Ch.14"] },
  { text: "Surgical diathermy uses high-frequency AC (0.4-3 MHz) which does not stimulate muscle/nerve.", cites: ["BJA Educ 2017"] },
  { text: "Monopolar diathermy requires a return plate; bipolar does not. Bipolar is safer near pacemakers.", cites: ["Middleton Ch.16"] },
  { text: "Equipment classes: I (earthed), II (double insulated), III (low voltage <24V AC). IEC 60601-1 defines the safety standard.", cites: ["IEC 60601-1"] },
  { text: "Theatre humidity 50–60% prevents static charge accumulation by providing a conductive surface film of water.", cites: ["BJA Educ 2017"] },
  { text: "Antistatic theatre footwear has sole resistance 75 kΩ–10 MΩ — drains static slowly while limiting macroshock current to <3 mA.", cites: ["Middleton Ch.16"] },
  { text: "Defibrillator capacitor stores energy E = ½CV²; charged slowly (~3 s) and discharged in ~10 ms (biphasic).", cites: ["Cross & Plunkett Ch.14"] },
  { text: "Biphasic defibrillators deliver equivalent efficacy at lower energy than monophasic.", cites: ["BJA Educ 2017"] },
];

const ElectricalSafetyTopicWorkedExamples: WorkedExample[] = [
  {
    title: "Microshock risk during central line insertion",
    scenario: "A patient with a temporary pacing wire develops VF when a poorly-earthed infusion pump is connected. Explain the mechanism and the safety standards that should have prevented it.",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Recognise microshock: very small currents (&gt;100 µA) reaching the myocardium directly via a conductive pathway can trigger VF — far below the macroshock threshold (100 mA)</li>
          <li>The pacing wire bypasses the skin's high resistance, eliminating the safety margin of macroshock</li>
          <li>Class CF (Cardiac Floating) equipment limits leakage to &lt;10 µA single fault, &lt;50 µA in fault conditions — mandatory for direct cardiac contact</li>
          <li>Theatre supply uses an isolated (IT) system with line isolation monitor — single-fault tolerance, no large current return path</li>
          <li>Equipotential earthing and regular electrical safety testing prevent leakage currents from summing across devices</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
          <li>Class B / BF equipment is not safe for direct cardiac contact</li>
          <li>RCDs protect against macroshock (mA range) but not microshock</li>
          <li>Daisy-chained extension leads defeat isolated supply protection</li>
          </ul>
        </div>
      </div>
    ),
    answer: "Microshock via the pacing wire. Use only CF-rated equipment for cardiac connections, maintain isolated theatre supply with line-isolation monitoring, and ensure regular electrical safety testing.",
    cites: ["BJA Educ 2017", "Cross & Plunkett Ch.14", "Middleton Ch.16"],
  },
  {
    title: "Line isolation monitor alarms during cardiac surgery",
    scenario: "Forty minutes into a coronary artery bypass graft, the theatre line isolation monitor alarms. The perfusionist, ventilator, cell saver and a newly connected warming device are all running. What is happening and what do you do?",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>The alarm signals a <strong>first</strong> insulation fault — enough leakage that a second fault would allow a hazardous current (set point typically 2–5 mA prospective fault current)</li>
          <li>The supply is deliberately <em>not</em> interrupted: power loss to bypass or ventilation would be more dangerous than the fault</li>
          <li>Stop adding equipment; announce the alarm to the team so nobody plugs anything else in</li>
          <li>Unplug devices in reverse order of connection — the last device that clears the alarm is the faulty one (here, most likely the newly connected warmer)</li>
          <li>If the alarm persists with all mobile equipment unplugged, the fault is in fixed wiring: call estates, keep the patient insulated from earthed metalwork, and complete the case on the remaining safe sockets</li>
          <li>Quarantine and label the faulty device, and report through incident and medical-device channels</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Silencing the alarm and continuing — the single-fault safety margin has gone</li>
            <li>Switching off the theatre supply reflexively during bypass</li>
            <li>Using extension leads or multiway adaptors, which defeat isolated-supply protection</li>
          </ul>
        </div>
      </div>
    ),
    answer: "A single insulation fault has been detected; the supply remains safe. Identify the faulty device by sequential unplugging, avoid adding equipment, keep the patient clear of earthed metal, and involve estates if fixed wiring is implicated.",
    cites: ["HTM 06-01", "BJA Educ 2017 (Electrical safety)"],
  },
  {
    title: "Airway fire during tracheostomy",
    scenario: "During an open tracheostomy on 100% oxygen, the surgeon uses monopolar diathermy to divide pretracheal tissue and a flame appears in the wound. What are the immediate actions and how should this have been prevented?",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Recognise the fire triad: oxidiser (high FiO₂ leaking around the airway), fuel (drapes, prep, swabs, tube), ignition (diathermy)</li>
          <li>Immediate actions: stop diathermy, <strong>disconnect the oxygen / stop fresh gas flow</strong>, remove burning drapes and swabs, extinguish with saline</li>
          <li>Remove the tracheal tube if it is burning; then re-establish ventilation on air or the lowest tolerated FiO₂</li>
          <li>Assess airway injury by bronchoscopy, look for facial and airway burns, plan for airway oedema and possible ICU admission</li>
          <li>Prevention: reduce FiO₂ to the minimum tolerated and pause enrichment for about 1 minute before cutting near the airway, use a cuffed tube so oxygen is contained rather than open delivery, allow alcohol prep to dry, keep swabs damp, use cutting mode at lowest power, and cut the trachea with a scalpel rather than diathermy</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Pouring saline before the oxygen source is stopped — the fire continues while oxygen flows</li>
            <li>Assuming a nasal cannula or supraglottic device is safe for head and neck diathermy: both create an oxygen-enriched pocket under the drapes</li>
            <li>Forgetting that 100% oxygen plus nitrous oxide markedly accelerates combustion</li>
          </ul>
        </div>
      </div>
    ),
    answer: "Stop diathermy and oxygen flow, remove and extinguish burning material, then re-secure the airway on the lowest tolerated FiO₂ and assess for thermal injury. Prevention is oxygen containment and minimisation plus avoidance of diathermy at the tracheal incision.",
    cites: ["Anesthesiology 2019 (OR fires)"],
  },
  {
    title: "Burn under the diathermy return plate after a long laparotomy",
    scenario: "After a 6-hour laparotomy in the lithotomy position, recovery staff find a full-thickness burn at the edge of the diathermy return plate on the patient's thigh. Explain the physics and the preventable factors.",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Monopolar current returns through the plate; heating depends on <strong>current density</strong> (I/A), so the same current through a smaller effective contact area produces the temperature rise</li>
          <li>Effective area falls when the plate partly peels (prep, blood, irrigation, sweat), is applied over hair, scar, bone or an implant, or when repositioning lifts an edge — classically after moving into lithotomy</li>
          <li>Poor perfusion of the underlying tissue reduces heat clearance, so pressure areas and vasoconstricted or hypotensive patients burn sooner</li>
          <li>Preventable factors: full-size plate on shaved, dry, well-perfused muscle bulk close to the operative field; long axis facing the field; re-inspection after every position change; contact-quality-monitoring plates that alarm on impedance rise; avoid pooling of prep or irrigation</li>
          <li>Also exclude an alternate-site burn: check ECG electrodes, temperature probes and any contact with earthed metal such as stirrups</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
            <li>Trimming a plate to fit — this reduces the area and raises current density</li>
            <li>Siting the plate over a hip prosthesis, bony prominence or ECG electrode</li>
            <li>Blaming the generator when the fault is nearly always plate contact or patient–metal contact</li>
          </ul>
        </div>
      </div>
    ),
    answer: "High current density at a reduced effective plate contact area. Full-size plate on prepared, well-perfused muscle, re-checked after repositioning, with contact-quality monitoring, prevents it.",
    cites: ["MHRA Electrosurgery", "BJA Educ 2017"],
  },
];

const ElectricalSafetyTopic = () => {
  return (
    <TopicTemplate
      title="Electrical Safety"
      subtitle="FRCA Primary — Physics"
      backPath="/physics"
      backLabel="Physics"
      accentColor="text-physics"
      topicId="electrical-safety"
      topicTitle="Electrical Safety"
      workedExamples={ElectricalSafetyTopicWorkedExamples}
      objectives={objectives}
      keyPoints={keyPoints}
      quizQuestions={electricalSafetyQuiz}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY] },
        keyPoints: { exams: [Exam.PRIMARY] },
      }}
      sectionSources={{
        objectives: [
          "BJA Educ 2017",
          "Cross & Plunkett Ch.14",
          "Middleton Ch.16",
          "IEC 60601-1",
        ],
        keyPoints: [
          "BJA Educ 2017",
          "Cross & Plunkett Ch.14",
          "Middleton Ch.16",
          "IEC 60601-1",
        ],
      }}
      coreConcepts={
        <>
        <ExamSection exams={[Exam.PRIMARY, Exam.FINAL]} className="scroll-mt-24">
        <div className="prose prose-slate max-w-none">
        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Introduction</h2>
          <p className="text-foreground/90 leading-relaxed">
            Anaesthesia electrical safety is a high-yield <strong>FRCA Primary physics</strong> topic. Operating theatres
            contain numerous electrical devices in close proximity to patients, so the exam focuses on three things:
            the <strong>shock thresholds</strong> that define harm (perception ~1 mA, let-go ~15 mA, macroshock VF
            ~100 mA, microshock VF ~100 µA), <strong>equipment classification</strong> under IEC 60601-1 (Class I
            earthed, Class II double-insulated, Class III low-voltage; applied parts type B, BF and CF), and the
            protective systems that limit leakage current — isolated power supplies with line isolation monitors,
            RCDs, theatre humidity and antistatic flooring. The same physics underpins the safe use
            of <strong>monopolar and bipolar diathermy</strong> and capacitor-based <strong>defibrillation</strong>.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Electrical Safety in the MRI Environment</h2>
          <p className="text-foreground/90 leading-relaxed">
            MRI adds time-varying radiofrequency (RF) and gradient fields to the static magnetic-field hazard. Conductive loops
            formed by ECG leads, monitoring cables or pacing wires can act as aerials: RF energy produces focal heating and burns,
            while rapidly switched gradients can induce currents and unwanted stimulation. Route leads straight, avoid loops and
            skin-to-skin contact, insulate cables from the patient and use the minimum necessary monitoring
            <InlineRef topicId="electrical-safety" refLabel="BJA Educ 2019 (MRI)" />.
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            Equipment labelled <strong>MR Safe</strong> poses no known hazard; <strong>MR Conditional</strong> equipment is safe only
            within its specified field strength, spatial gradient, RF exposure and positioning conditions. Standard pumps,
            ventilators and monitors must remain outside the controlled area unless specifically approved. Fibre-optic monitoring
            and signal transmission avoid conductive cables and therefore reduce induced-current and heating risks.
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            Pacemakers, ICDs, neurostimulators and other active implants require exact device and lead identification, confirmation
            of MR-conditional status, specialist risk assessment and a documented programme-and-monitor protocol. Risks include
            lead-tip heating, inappropriate sensing or therapy, device movement, power-on reset and pacing failure; abandoned or
            fractured leads may increase heating.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Current, Voltage & Resistance</h2>
          <p className="text-foreground/90 leading-relaxed">
            <strong>Ohm's law: V = IR</strong>. Current (I) is the flow of electrons; voltage (V) is the driving force;
            resistance (R) opposes current flow. Biological damage from electricity depends primarily on <em>current density</em>
            and <em>pathway</em> through the body. Skin resistance (dry ~100 kΩ, wet ~1 kΩ) is the main protective barrier.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Macroshock</h2>
          <p className="text-foreground/90 leading-relaxed">
            Macroshock occurs when current passes through the body via the skin. Thresholds (50 Hz AC):
          </p>
          <ul className="text-foreground/90 mt-2 space-y-1">
            <li><strong>1 mA</strong> — perception (tingling)</li>
            <li><strong>5 mA</strong> — pain</li>
            <li><strong>15 mA</strong> — "let-go" threshold (tetanic muscle contraction prevents release)</li>
            <li><strong>50 mA</strong> — respiratory arrest</li>
            <li><strong>100 mA</strong> — ventricular fibrillation</li>
            <li><strong>&gt;5 A</strong> — sustained asystole, burns</li>
          </ul>
          <p className="text-foreground/90 leading-relaxed mt-3">
            These thresholds are for 50 Hz mains-frequency current applied for ≥1 s; sensitivity is maximal at 50–60 Hz and falls
            sharply above ~1 kHz, which is why megahertz diathermy current does not stimulate nerve or muscle
            <InlineRef topicId="electrical-safety" refLabel="ATOTW 193 (Electricity II)" />
            <InlineRef topicId="electrical-safety" refLabel="BJA Educ 2017" />
            <InlineRef topicId="electrical-safety" refLabel="BJA Educ 2017 (Electrical safety)" />.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Microshock</h2>
          <p className="text-foreground/90 leading-relaxed">
            Microshock occurs when current is delivered directly to the myocardium (e.g., via a pacing wire, central line,
            or intracardiac catheter). As little as <strong>100 µA (0.1 mA) at 50 Hz</strong> applied directly to the heart can
            cause ventricular fibrillation — approximately 1000 times less than the macroshock threshold.
          </p>
          <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
            <p className="text-sm font-medium text-foreground">Clinical Implication</p>
            <p className="text-sm text-muted-foreground mt-1">
              Patients with intracardiac catheters are "electrically susceptible." All equipment contacting the patient must
              have leakage current &lt;10 µA (Type CF equipment) — a 10× safety margin below the 100 µA VF threshold.
              Saline-filled CVP lines can act as conductors
              <InlineRef topicId="electrical-safety" refLabel="IEC 60601-1" />.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Isolation Transformer & Line Isolation Monitor (LIM)</h2>
          <p className="text-foreground/90 leading-relaxed">
            In UK practice, operating theatres, cardiac catheter laboratories and critical care bedspaces are
            <strong>Group 2 medical locations</strong>, in which the standard earthed mains supply is
            replaced by an <strong>isolated power system</strong>. A 1:1 isolation transformer magnetically couples power to the
            theatre but removes the earth reference — both downstream conductors "float" relative to earth. Because no normal
            return path exists through earth, a patient or staff member touching a single live conductor cannot complete a
            circuit and no current flows through them.
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            A <strong>Line Isolation Monitor (LIM)</strong> continuously measures the impedance from each line to earth. A
            single insulation fault is detected and alarmed when the fault would permit a <strong>prospective fault current of
            about 2–5 mA</strong> to flow were a second fault to occur (the exact set point depends on the standard and the
            device) <InlineRef topicId="electrical-safety" refLabel="BJA Educ 2017 (Electrical safety)" />, but the supply is deliberately
            <em> not</em> automatically interrupted — abrupt loss of power to a ventilator or bypass pump may be more
            dangerous than the fault itself. Two simultaneous faults are required for a hazardous shock.
          </p>
          <div className="mt-4">
            <IsolationTransformerDiagram />
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-serif font-bold text-foreground mb-3">RCD / RCCB — Why Theatres Don't Use One</h3>
            <p className="text-foreground/90 leading-relaxed mb-4">
              Outside theatre, an earthed mains supply is protected by a <strong>Residual Current Device (RCD / RCCB)</strong>.
              An RCD compares the live and neutral currents through a single toroidal current transformer; any imbalance &gt; 30 mA
              triggers disconnection within 40 ms — fast enough to prevent ventricular fibrillation in most macroshock scenarios.
              RCD-protected earthed mains is the arrangement used in general clinical areas; in Group 2 locations this
              auto-disconnect is itself a hazard, so an isolated supply with insulation monitoring is required instead
              <InlineRef topicId="electrical-safety" refLabel="HTM 06-01" />.
            </p>
            <RCDDiagram />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Equipment Classification</h2>
          <p className="text-foreground/90 leading-relaxed">
            <strong>Class I</strong>: earthed metal casing (fault current flows to earth via green/yellow wire).
            <strong> Class II</strong>: double insulated, no earth needed (□ within □ symbol).
            <strong> Class III</strong>: powered by safety extra-low voltage (&lt;24V AC).
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            <strong>Type B</strong>: body contact, leakage &lt;100 µA. <strong>Type BF</strong>: floating patient connection,
            &lt;100 µA. <strong>Type CF</strong>: cardiac floating, leakage &lt;10 µA — required for intracardiac use.
          </p>

          <div className="mt-6">
            <h3 className="text-lg font-serif font-bold text-foreground mb-3">Microshock — Why 100 µA Can Kill</h3>
            <p className="text-foreground/90 leading-relaxed mb-4">
              <strong>Microshock</strong> is the induction of ventricular fibrillation by very small currents (as low as
              <strong> 100 µA at 50 Hz</strong>) delivered <em>directly to the myocardium</em> via a conductive intracardiac
              pathway — typically a CVP or PA catheter, transvenous pacing wire, or saline-filled pressure transducer line.
              The skin's natural impedance (~100 kΩ) is bypassed, and current is concentrated over a tiny endocardial area,
              producing the high local current density needed to depolarise the ventricle during the vulnerable T-wave period.
              This is the rationale for the <strong>Type CF (&lt;10 µA)</strong> standard — a 10× safety margin below the VF
              threshold.
            </p>
            <MicroshockDiagram />
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Diathermy</h2>
          <p className="text-foreground/90 leading-relaxed">
            Surgical diathermy uses high-frequency AC (0.4–3 MHz) which does not stimulate neuromuscular tissue. <strong>Monopolar
            </strong>: current flows from active electrode through the patient to a large return plate (current density at plate
            is low → no burns). <strong>Bipolar</strong>: current flows between two prongs of forceps — no return plate needed,
            safer near pacemakers.
          </p>
          <div className="bg-secondary/30 rounded-lg p-4 mt-3 border border-border">
            <p className="text-sm font-medium text-foreground">Diathermy Hazards</p>
            <p className="text-sm text-muted-foreground mt-1">
              Burns at the return plate (poor contact, small area). Channelling effect at narrow points (digits). Interference
              with pacemakers and monitoring. Bowel burns during laparoscopic surgery (direct coupling, capacitative coupling).
              Ignition of alcohol-based skin prep or airway fires with high FiO₂.
            </p>
          </div>
          <DiathermyDiagram />
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Theatre Environment — Humidity & Footwear</h2>
          <p className="text-foreground/90 leading-relaxed">
            Two often-overlooked engineering controls in the operating theatre — controlled humidity and antistatic footwear —
            were introduced in the era of flammable anaesthetic agents (ether, cyclopropane) but remain part of modern theatre
            design because they continue to mitigate electrical risk.
          </p>

          <div className="grid sm:grid-cols-2 gap-3 mt-4">
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="text-sm font-semibold text-foreground mb-1">Why humidity matters</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Theatre humidity is maintained at <strong className="text-foreground">50–60% relative humidity</strong> (with temperature 20–22 °C).</li>
                <li>At low humidity (&lt; 40%), insulating surfaces (vinyl flooring, plastics, drapes, hair, clothing) accumulate
                  <strong className="text-foreground"> static charge</strong> by triboelectric (friction-induced) charging.</li>
                <li>Higher humidity allows a thin film of water on surfaces to act as a <strong className="text-foreground">conductive path</strong>,
                  continuously bleeding static charge to earth before it reaches a hazardous potential.</li>
                <li>This <strong className="text-foreground">prevents spark formation</strong> — historically critical to avoid ignition of
                  ether/cyclopropane mixtures, but still relevant to: airway fires, alcohol-based skin prep ignition, microelectronic
                  device damage, and patient micro-shock from static discharge to monitoring leads or intracardiac catheters.</li>
                <li>Humidity also reduces <strong className="text-foreground">skin resistance</strong> in sweating staff and patients — a
                  trade-off that increases macroshock hazard slightly, but the dominant benefit is static dissipation.</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="text-sm font-semibold text-foreground mb-1">Antistatic theatre footwear</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Theatre clogs and overshoes are made of <strong className="text-foreground">antistatic (conductive) rubber</strong>
                  — typically with a sole resistance of <strong className="text-foreground">75 kΩ – 10 MΩ</strong>.</li>
                <li>This range is deliberately chosen as a <strong className="text-foreground">"Goldilocks" resistance</strong>:</li>
                <li><strong className="text-foreground">Low enough</strong> to <em>continuously drain static charge</em> from the wearer
                  to the conductive theatre floor (and on to earth) — preventing spark discharge.</li>
                <li><strong className="text-foreground">High enough</strong> to <em>limit current flow</em> if the wearer accidentally
                  becomes part of a mains circuit — at 240 V across &gt; 75 kΩ, current is limited to &lt; 3 mA (well below the 15 mA
                  let-go threshold and the 100 mA VF threshold).</li>
                <li>Combined with a <strong className="text-foreground">conductive floor</strong> (resistance 20 kΩ – 5 MΩ between two
                  electrodes 60 cm apart), the staff member–shoe–floor system acts as a controlled, slow discharge path.</li>
                <li>Pure rubber boots (very high resistance) would <em>protect against macroshock</em> but allow <strong className="text-foreground">static
                  build-up</strong> — and so are not used in theatre
                  <InlineRef topicId="electrical-safety" refLabel="Middleton Ch.16" />.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Diathermy in Patients with Pacemakers and ICDs</h2>
          <p className="text-foreground/90 leading-relaxed">
            Cardiac implantable electronic devices (CIEDs) are common, and diathermy is the main perioperative electrical hazard
            to them: radiofrequency energy can be sensed as intrinsic cardiac activity (inhibiting pacing), can be interpreted as
            a tachyarrhythmia (triggering an inappropriate ICD shock), can cause electrical reset to a back-up mode, and can very
            rarely conduct down a lead to cause endocardial thermal injury
            <InlineRef topicId="electrical-safety" refLabel="Assoc Anaesth CIED 2022" />.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mt-4">
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="text-sm font-semibold text-foreground mb-1">Preoperative risk assessment</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Identify device <strong className="text-foreground">type</strong> (pacemaker, ICD, CRT, loop recorder), manufacturer, indication and date of last check (within 12 months for a pacemaker, 6 months for an ICD).</li>
                <li>Establish <strong className="text-foreground">pacing dependence</strong> — the underlying rhythm on the device check determines whether loss of pacing is immediately life-threatening.</li>
                <li>Discuss with the cardiology or cardiac physiology team; reprogramming (asynchronous pacing, deactivating anti-tachycardia therapies) is required for high-risk surgery, especially above the umbilicus.</li>
                <li>Site of surgery matters: monopolar diathermy more than ~15 cm from the device and generator, with a current path away from it, is low risk.</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="text-sm font-semibold text-foreground mb-1">Intraoperative precautions</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li><strong className="text-foreground">Bipolar diathermy in preference</strong> — current is confined between the forceps tips, so no current traverses the thorax.</li>
                <li>If monopolar is unavoidable: lowest effective power, <strong className="text-foreground">short irregular bursts (&lt;5 s)</strong>, cutting rather than coagulation mode where possible, and the return plate positioned so the current path <em>does not cross</em> the generator or leads (e.g. thigh for lower-limb or pelvic surgery).</li>
                <li>Continuous ECG plus a mechanical means of confirming perfusion (pulse oximetry plethysmograph or invasive arterial trace) — diathermy artefact obscures the ECG.</li>
                <li>Immediately available: external defibrillator/pacing pads, a <strong className="text-foreground">magnet</strong>, chronotropic drugs (atropine, isoprenaline, adrenaline) and the ability to contact the device team.</li>
              </ul>
            </div>
          </div>
          <div className="bg-secondary/30 rounded-lg p-4 mt-4 border border-border">
            <p className="text-sm font-medium text-foreground">What does a magnet do?</p>
            <p className="text-sm text-muted-foreground mt-1">
              Over a <strong>pacemaker</strong>, a magnet usually switches it to asynchronous (VOO/DOO) pacing at a fixed
              manufacturer-specific rate, preventing diathermy-induced inhibition — but responses vary and some devices ignore
              magnets or enter a diagnostic mode. Over an <strong>ICD</strong>, a magnet suspends anti-tachycardia detection and
              shock delivery without altering the bradycardia pacing settings; the patient is then unprotected and must be
              continuously monitored with external defibrillation available. Magnet response should be confirmed with the device
              team rather than assumed, and every patient needs a <strong>postoperative device check</strong> before discharge from
              monitored care.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Defibrillation & Synchronised Cardioversion</h2>
          <p className="text-foreground/90 leading-relaxed">
            Defibrillation delivers a large DC current (~30–40 A peak) to simultaneously depolarise a critical mass of
            myocardium, allowing the SA node to resume normal conduction
            <InlineRef topicId="electrical-safety" refLabel="RCUK 2021 ALS" />.
          </p>
          <h3 className="text-lg font-serif font-bold text-foreground mt-5 mb-2">The capacitor: charge and discharge</h3>
          <p className="text-foreground/90 leading-relaxed">
            A defibrillator cannot take enough current directly from the mains, so energy is accumulated slowly in a
            <strong> capacitor</strong> (commonly approximately 100–200 µF, device dependent, charged to several thousand volts) and released rapidly. Stored energy
            is <strong>E = ½CV²</strong>, where E is energy in joules, C capacitance in farads and V voltage in volts; energy therefore rises with the <em>square</em> of voltage. Charge Q = CV. Charging
            follows an exponential rise (V = V<sub>max</sub>(1 − e<sup>−t/RC</sup>)) taking a few seconds, while discharge through
            the internal circuit plus ~70–80 Ω transthoracic resistance is an exponential decay with time constant <strong>τ = RC</strong>
            of only a few milliseconds. An
            <strong> inductor</strong> in series lengthens and smooths the pulse to ~5–20 ms, because a very short high-current
            spike causes myocardial injury without improving defibrillation
            <InlineRef topicId="electrical-safety" refLabel="Cross & Plunkett Ch.14" />.
          </p>
          <h3 className="text-lg font-serif font-bold text-foreground mt-5 mb-2">Waveforms</h3>
          <ul className="text-foreground/90 mt-1 space-y-1 list-disc list-inside">
            <li><strong>Monophasic damped sinusoidal</strong> — current flows in one direction only; historically 200 J escalating to 360 J.</li>
            <li><strong>Biphasic truncated exponential (BTE)</strong> — current flows one way then reverses, and the waveform is truncated rather than allowed to decay to zero.</li>
            <li><strong>Rectilinear biphasic</strong> — the device actively holds current near-constant during the first phase.</li>
            <li>Biphasic devices <strong>measure transthoracic impedance</strong> and compensate by adjusting voltage or phase duration, so a similar current reaches the myocardium in a small and a large patient.</li>
          </ul>
          <p className="text-foreground/90 leading-relaxed mt-3">
            Biphasic shocks achieve a higher first-shock success rate at <strong>lower selected energy (typically 120–200 J)</strong>
            than monophasic 360 J. The reversed second phase lowers the defibrillation threshold (partly by reducing the
            after-potential and post-shock electroporation of myocytes), so less current and less myocardial stunning, arrhythmia
            and skin burning are produced <InlineRef topicId="electrical-safety" refLabel="RCUK 2021 ALS" />.
          </p>
          <h3 className="text-lg font-serif font-bold text-foreground mt-5 mb-2">Transthoracic impedance</h3>
          <p className="text-foreground/90 leading-relaxed">
            <strong>Transthoracic impedance (TTI)</strong> is the opposition to current flow through the chest, typically
            ~70–80 Ω, and determines what fraction of delivered energy reaches the myocardium (I = V/Z). It <em>falls</em> with
            larger electrodes, conductive gel or gel pads, firm paddle pressure (~8 kg), shock delivery during expiration
            (smaller lung volume) and with each successive shock. It <em>rises</em> with poor skin contact, chest hair, air
            trapping or hyperinflation, obesity, and a short interval since the last shock has not yet lowered it.
          </p>
          <h3 className="text-lg font-serif font-bold text-foreground mt-5 mb-2">Safety during defibrillation</h3>
          <ul className="text-foreground/90 mt-1 space-y-1 list-disc list-inside">
            <li>Operator safety: a clear verbal "stand clear" with visual check, oxygen source moved at least 1 m away, no contact with the trolley or wet surfaces, self-adhesive pads in preference to paddles, and charging only once the pads are applied.</li>
            <li>Patient safety: correct pad placement (sternal–apical, or anterior–posterior for cardioversion of AF and for patients with a CIED, keeping pads &gt;8 cm from the generator), dry skin, removal of GTN patches, and avoidance of repeated shocks over the same skin to limit burns.</li>
            <li>Chest compressions continue while the device charges; the pre-shock pause should be under 5 s.</li>
          </ul>
          <h3 className="text-lg font-serif font-bold text-foreground mt-5 mb-2">Paediatric defibrillation</h3>
          <p className="text-foreground/90 leading-relaxed">
            Use <strong>4 J/kg</strong> for paediatric defibrillation. Paediatric attenuator pads or cables reduce the energy delivered
            by an adult device. If unavailable, use standard adult pads and select the nearest available dose (a 50 J starting setting
            may be needed on some devices). For infants and children under 10 kg, anterior–posterior placement usually provides enough
            separation; otherwise use anterolateral placement. Pads must never touch or overlap because this can arc or shunt current
            away from the myocardium <InlineRef topicId="electrical-safety" refLabel="RCUK Paediatric ALS 2021" />.
          </p>
          <h3 className="text-lg font-serif font-bold text-foreground mt-5 mb-2">Synchronised DC cardioversion</h3>
          <p className="text-foreground/90 leading-relaxed">
            For a tachyarrhythmia <em>with</em> a pulse, the shock is <strong>synchronised to the R wave</strong>. Delivering
            energy during the relative refractory period of repolarisation (on the T wave) can induce VF — the
            <strong> R-on-T phenomenon</strong> — so the device senses the QRS and times delivery to it. VF and pulseless VT
            require immediate <strong>unsynchronised</strong> defibrillation because there is no organised QRS to synchronise to.
            Anaesthesia for elective cardioversion aims to provide brief hypnosis and analgesia with minimal cardiovascular
            depression and rapid recovery — typically a small dose of propofol (or etomidate/ketamine in haemodynamic
            compromise) with preoxygenation, full monitoring, aspiration precautions and airway rescue equipment, in an area
            equipped for resuscitation <InlineRef topicId="electrical-safety" refLabel="Anaesthesia 1996 Cardioversion" />.
          </p>
          <DefibrillatorCapacitorDiagram />
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Diathermy Injury in Practice</h2>
          <p className="text-foreground/90 leading-relaxed">
            Most real electrical harm in theatre is thermal rather than shock. Heating depends on current density
            (I/A) and time, so injury occurs wherever current is forced through a small area: a partly lifted return
            plate, a limb touching earthed metal, or a narrow tissue pedicle such as a digit, penis or testicular
            cord where the <strong>channelling effect</strong> concentrates current
            <InlineRef topicId="electrical-safety" refLabel="MHRA Electrosurgery" />.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mt-4">
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="text-sm font-semibold text-foreground mb-1">Return-plate and alternate-site burns</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Apply a full-size plate to shaved, dry, well-perfused muscle bulk close to the operative site, long axis facing the field; never trim it.</li>
                <li>Avoid bony prominences, scars, metal implants, ECG electrodes and areas where prep or irrigation can pool.</li>
                <li>Re-inspect after every position change — lithotomy, tilt and lateral rolls lift plate edges.</li>
                <li>Contact-quality-monitoring plates measure impedance and alarm before the skin is injured.</li>
                <li>Alternate-site burns occur where the patient touches earthed metal (stirrups, drip stand) or where skin touches skin — pad and insulate.</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="text-sm font-semibold text-foreground mb-1">Laparoscopic coupling and insulation failure</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li><strong className="text-foreground">Direct coupling</strong> — the active tip touches another instrument, clip or the laparoscope, which then burns bowel outside the field of view.</li>
                <li><strong className="text-foreground">Capacitive coupling</strong> — current is induced across intact insulation into a surrounding conductor; classically an active hook inside a metal cannula, or a metal instrument through a plastic port.</li>
                <li><strong className="text-foreground">Insulation failure</strong> — a pinhole in the shaft delivers full current to whatever it touches; inspect instruments before use.</li>
                <li>Mitigate: lowest effective power, short bursts, whole active tip in view, activate only when clear of other metal, all-metal or all-plastic port systems, and cutting rather than high-voltage coagulation modes.</li>
                <li>Delayed presentation (48–72 h peritonitis) is typical of an unrecognised thermal bowel injury.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Surgical and Airway Fires</h2>
          <p className="text-foreground/90 leading-relaxed">
            Fire requires an oxidiser, a fuel and an ignition source, and all three are routinely present: oxygen and
            nitrous oxide, alcohol-based prep, drapes, swabs, tubes and hair, plus diathermy or a laser
            <InlineRef topicId="electrical-safety" refLabel="Anesthesiology 2019 (OR fires)" />. Risk is greatest for
            head, neck and airway surgery where oxygen accumulates under drapes.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mt-4">
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="text-sm font-semibold text-foreground mb-1">Prevention</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Use the lowest tolerated inspired oxygen; avoid open delivery above the clavicles — contain oxygen in a cuffed tube or supraglottic device.</li>
                <li>Stop or reduce oxygen enrichment and allow about a minute of washout before diathermy near the airway.</li>
                <li>Avoid nitrous oxide, which supports combustion.</li>
                <li>Allow alcohol prep to dry fully; avoid pooling under drapes and beneath the patient.</li>
                <li>Damp swabs and gauze near the airway; laser-resistant tube with saline-filled cuff for airway laser work; active electrode in a holster when idle.</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg border border-border bg-secondary/30">
              <p className="text-sm font-semibold text-foreground mb-1">Immediate management</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Declare the fire; stop diathermy or laser.</li>
                <li><strong className="text-foreground">Stop the fresh gas flow and disconnect the oxygen supply.</strong></li>
                <li>Remove burning drapes, swabs and the tube if it is alight; extinguish with saline.</li>
                <li>Re-establish ventilation on air or minimal FiO₂; bronchoscopy to assess airway injury and plan for oedema.</li>
                <li>Then treat burns, document, debrief and report; retain the equipment for examination.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold text-foreground">Responding to an Electrical Incident</h2>
          <p className="text-foreground/90 leading-relaxed">
            If a patient or staff member receives a shock, isolate the supply or break contact with an insulating
            object before touching them — never grab a casualty still in circuit. Shock-induced arrest is usually VF
            and is treated by standard ALS with prompt defibrillation
            <InlineRef topicId="electrical-safety" refLabel="RCUK 2021 ALS" />. Look for entry and exit burns,
            arrhythmia, rhabdomyolysis and, in high-voltage injury, deep tissue necrosis; monitor the ECG if there was
            loss of consciousness, arrhythmia or a current path across the chest. Quarantine and label the device, do
            not attempt repair, and report through local incident and medical-device channels
            <InlineRef topicId="electrical-safety" refLabel="MHRA Electrosurgery" />.
          </p>
          <p className="text-foreground/90 leading-relaxed mt-3">
            Everyday risk reduction is mundane: a user visual check of plug, flex and casing before use; withdrawal of
            any device that has been dropped, wetted, sparked or tripped the supply; risk-based electrical safety
            testing (usually annual for patient-connected theatre equipment); equipotential earthing so leakage from
            several devices cannot sum through one patient; CF-rated connections for anything intracardiac; and no
            extension leads or daisy-chained adaptors, which add earth-fault paths and defeat the isolated supply
            <InlineRef topicId="electrical-safety" refLabel="IEC 60601-1" />.
          </p>
        </section>

          <ElectricalSafetyDiagram />
          <ExamPitfallsCallout
            accent="physics"
            pitfalls={[
              "Microshock (<100 µA) via a pacing wire can induce VF; macroshock requires mA-level currents crossing the chest.",
              "Class I equipment relies on an earth wire; Class II uses double insulation; Class III runs on safety extra-low voltage.",
              "Type CF equipment has the lowest leakage current and is mandatory for direct cardiac contact (e.g. PA catheter).",
              "Diathermy: cutting uses a continuous waveform; coagulation uses pulsed/damped. Bipolar avoids return-pad burns.",
              "Pacemaker patients: use bipolar diathermy, short bursts, return pad away from the device, and have a magnet/external pacer available.",
            ]}
          />
        </div>
      </ExamSection>
          <TopicFaqs faqs={electricalSafetyFaqs} />
        </>
      }
    />
  );
};

export default ElectricalSafetyTopic;
