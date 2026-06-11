import { TopicTemplate } from "@/components/TopicTemplate";
import { TopicFaqs } from "@/components/TopicFaqs";

const upperLimbAnatomyFaqs: Array<[string, string]> = [
  ["Where is the radial artery best palpated for arterial line insertion and why?", "At the volar wrist between the tendon of flexor carpi radialis and the distal radius, where it lies most superficially with the bony radius supporting it for compression. Always confirm collateral palmar arch flow (modified Allen's test or Doppler of the ulnar artery) before cannulation."],
  ["Which nerve is most at risk in supracondylar humeral fracture?", "The median nerve, often the anterior interosseous branch, is most commonly injured — producing weakness of the thumb–index \"OK\" sign (FPL and FDP-2). The brachial artery is also at risk, with compartment syndrome and Volkmann's contracture if missed. Radial and ulnar nerves are less commonly affected."],
  ["How are the cords of the brachial plexus arranged at the axilla relative to the artery?", "At the level of pectoralis minor: lateral cord is lateral to the axillary artery, medial cord medial, posterior cord posterior. This guides ultrasound-guided axillary block — the median nerve typically lies superior/lateral to the artery, ulnar inferomedial, radial deep/posterior."],
];
import { WorkedExample } from "@/components/WorkedExamples";
import { ExamSection } from "@/components/ExamSection";
import { upperLimbAnatomyQuestions } from "@/data/quizzes";
import BrachialPlexusDiagram from "@/components/diagrams/BrachialPlexusDiagram";
import BrachialPlexusUltrasoundDiagram from "@/components/diagrams/BrachialPlexusUltrasoundDiagram";
import UpperLimbArteriesDiagram from "@/components/diagrams/UpperLimbArteriesDiagram";
import UpperLimbBranchesDiagram from "@/components/diagrams/UpperLimbBranchesDiagram";
import AntecubitalFossaDiagram from "@/components/diagrams/AntecubitalFossaDiagram";
import UpperLimbVeinsDiagram from "@/components/diagrams/UpperLimbVeinsDiagram";
import CorPictumFolio from "@/components/diagrams/CorPictumFolio";
import { upperLimbFolio } from "@/components/diagrams/anatomyFolios";
import { Exam } from "@/data/curriculum";

const UpperLimbAnatomyTopicWorkedExamples: WorkedExample[] = [
  {
    title: "Choosing a brachial plexus approach for hand surgery",
    scenario: "A 45-year-old needs an awake regional anaesthetic for trigger finger release of the 4th digit. Which brachial plexus block is most appropriate and why?",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Identify the surgical territory: 4th digit innervated by median (palmar) and ulnar (dorsal) nerves — both terminal branches</li>
          <li>Map approaches to plexus levels: interscalene → roots/trunks (misses C8–T1), supraclavicular → trunks/divisions, infraclavicular → cords, axillary → terminal branches</li>
          <li>Interscalene spares the ulnar nerve (inferior trunk, C8–T1) — inappropriate</li>
          <li>Choose axillary or infraclavicular: axillary block covers median, ulnar, radial directly (musculocutaneous needs separate block for forearm tourniquet)</li>
          <li>Add ultrasound-guided musculocutaneous block in coracobrachialis if forearm tourniquet is used &gt;30 min</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
          <li>Forgetting the musculocutaneous nerve leaves the lateral cord proximal to the axilla</li>
          <li>Using interscalene for hand surgery — ulnar sparing</li>
          <li>Intercostobrachial (T2) not covered by any brachial plexus block</li>
          </ul>
        </div>
      </div>
    ),
    answer: "Ultrasound-guided axillary block (median, ulnar, radial) plus a separate musculocutaneous injection in coracobrachialis; add tourniquet pain plan and intercostobrachial infiltration if needed.",
    cites: ["BJA Educ 2021", "Ellis & Feldman Ch.8", "Last's Anatomy Ch.3"],
  },
];

const UpperLimbAnatomyTopic = () => {
  return (
    <TopicTemplate
      title="Upper Limb Anatomy"
      subtitle="FRCA — Applied Anatomy"
      backPath="/anatomy"
      backLabel="Anatomy"
      accentColor="text-anatomy"
      topicId="upper-limb-anatomy"
      topicTitle="Upper Limb Anatomy"
      workedExamples={UpperLimbAnatomyTopicWorkedExamples}
      quizQuestions={upperLimbAnatomyQuestions}
      objectives={[
        "Describe the anatomy of the brachial plexus from roots to terminal branches",
        "Compare interscalene, supraclavicular, infraclavicular, and axillary block approaches",
        "Identify the motor and sensory distributions of the median, ulnar, radial, and musculocutaneous nerves",
        "Outline the arterial supply of the upper limb and the basis of Allen's test",
        "Describe the cubital fossa and venous anatomy relevant to vascular access and PICC lines",
      ]}
      keyPoints={[
        { text: "Brachial plexus: C5–T1. 'Robert Taylor Drinks Cold Beer' — Roots, Trunks, Divisions, Cords, Branches", cites: ["Ellis & Feldman Ch.8"] },
        { text: "Interscalene block targets C5–7 (shoulder surgery) — 100% ipsilateral phrenic nerve palsy", cites: ["BJA Educ 2021"] },
        { text: "Cubital fossa contents lateral to medial: TAN — Tendon, Artery, Nerve", cites: ["NICE CG49"] },
        { text: "Radial artery cannulation requires Allen's test — superficial palmar arch (ulnar) provides collateral", cites: ["BJA Educ 2005"] },
        { text: "Basilic vein preferred for PICC lines — larger calibre, straighter course than cephalic", cites: ["Last's Anatomy Ch.3"] },
        { text: "Musculocutaneous nerve leaves the brachial plexus sheath early — block separately at axillary level", cites: ["Ellis & Feldman Ch.8"] },
        { text: "Subclavian vein is ANTERIOR to scalenus anterior; artery is POSTERIOR", cites: ["BJA Educ 2021"] },
      ]}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL] },
      }}
      sectionSources={{
        objectives: [
          "BJA Educ 2021",
          "Ellis & Feldman Ch.8",
          "Last's Anatomy Ch.3",
          "BJA Educ 2005",
          "NICE CG49",
        ],
        keyPoints: [
          "BJA Educ 2021",
          "Ellis & Feldman Ch.8",
          "Last's Anatomy Ch.3",
          "BJA Educ 2005",
          "NICE CG49",
        ],
      }}
      coreConcepts={
        <ExamSection exams={[Exam.PRIMARY, Exam.FINAL]} className="scroll-mt-24">
        <section className="space-y-6 mb-10">
        {/* ── BRACHIAL PLEXUS ── */}
        <div id="brachial-plexus" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Brachial Plexus</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Formed by ventral rami of C5–T1. Mnemonic: "Robert Taylor Drinks Cold Beer" (Roots, Trunks, Divisions, Cords, Branches).
          </p>
          <div className="space-y-2">
            {[
              { level: "Roots (C5–T1)", detail: "Emerge between anterior and middle scalene muscles. Long thoracic nerve (C5,6,7) — serratus anterior. Dorsal scapular nerve (C5)." },
              { level: "Trunks", detail: "Superior (C5,6), Middle (C7), Inferior (C8,T1). Suprascapular nerve arises from superior trunk — shoulder abduction and lateral rotation." },
              { level: "Divisions", detail: "Each trunk divides into anterior and posterior divisions behind the clavicle. Anterior divisions supply flexor compartments; posterior supply extensors." },
              { level: "Cords", detail: "Named by relation to 2nd part of axillary artery. Lateral (C5,6,7), Posterior (C5–T1), Medial (C8,T1)." },
              { level: "Terminal Branches", detail: "Lateral cord → musculocutaneous + lateral contribution to median. Medial cord → ulnar + medial contribution to median. Posterior cord → axillary + radial." },
            ].map((l) => (
              <div key={l.level} className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{l.level}</p>
                <p className="text-sm text-muted-foreground mt-1">{l.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <CorPictumFolio {...upperLimbFolio} suppressOverlayLabels />

        <BrachialPlexusDiagram />

        <div id="block-approaches" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Block Approaches & Anatomy</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Interscalene (Roots/Trunks)</p>
              <p className="text-sm text-muted-foreground mt-1">Between anterior and middle scalene at C6 level. Targets C5–C7 (superior/middle trunks). Misses C8/T1 (ulnar sparing). Phrenic nerve palsy 100%. Contralateral hand ventilation check essential.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Supraclavicular (Trunks/Divisions)</p>
              <p className="text-sm text-muted-foreground mt-1">Trunks and divisions most compact here ("3 grapes on a stalk" appearance on US above subclavian artery). Complete arm block. Pneumothorax risk (minimal with US).</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Infraclavicular (Cords)</p>
              <p className="text-sm text-muted-foreground mt-1">Cords surround 2nd part of axillary artery beneath pectoralis muscles. Good for catheter placement — skin puncture away from neck. Targets all cords.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Axillary (Branches)</p>
              <p className="text-sm text-muted-foreground mt-1">Terminal branches around 3rd part of axillary artery. Musculocutaneous already left (separate block in coracobrachialis). Safest approach — no pneumothorax risk.</p>
            </div>
          </div>
        </div>

        <BrachialPlexusUltrasoundDiagram />

        <div id="terminal-nerves" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Key Terminal Nerves</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Nerve</th>
                  <th className="text-left py-2 text-foreground font-semibold">Roots</th>
                  <th className="text-left py-2 text-foreground font-semibold">Motor</th>
                  <th className="text-left py-2 text-foreground font-semibold">Sensory</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Musculocutaneous</td><td>C5,6,7</td><td>Biceps, brachialis, coracobrachialis</td><td>Lateral cutaneous of forearm</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Median</td><td>C5–T1</td><td>Forearm flexors (most), thenar muscles, lateral 2 lumbricals</td><td>Lateral 3½ digits (palmar)</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Ulnar</td><td>C8,T1</td><td>Intrinsic hand muscles (most), FCU, FDP (medial)</td><td>Medial 1½ digits</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Radial</td><td>C5–T1</td><td>Extensors of arm and forearm, triceps, supinator</td><td>Posterior arm/forearm, dorsal 3½ digits</td></tr>
                <tr><td className="py-2 font-medium text-foreground">Axillary</td><td>C5,6</td><td>Deltoid, teres minor</td><td>Regimental badge area</td></tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <UpperLimbBranchesDiagram />
          </div>
        </div>

        {/* ── ARTERIAL SUPPLY ── */}
        <div id="arterial-supply" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Arterial Supply of the Upper Limb</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The arterial supply follows a continuous chain: subclavian → axillary → brachial → radial and ulnar arteries. Each segment is defined by anatomical landmarks and gives important branches. The radial and ulnar arteries form the superficial and deep palmar arches in the hand, providing redundant perfusion — the basis for Allen's test.
          </p>
          <UpperLimbArteriesDiagram />
          <div className="grid sm:grid-cols-2 gap-3 mt-4">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Allen's Test</p>
              <p className="text-sm text-muted-foreground mt-1">Compress both radial and ulnar arteries → patient clenches fist → release ulnar → hand should reperfuse within 5–7 seconds (modified Allen's test). Abnormal test suggests inadequate ulnar collateral — avoid radial artery cannulation on that side.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Elbow Anastomosis</p>
              <p className="text-sm text-muted-foreground mt-1">Rich periarticular anastomosis formed by: profunda brachii → radial/middle collateral aa.; superior/inferior ulnar collateral aa.; radial, ulnar, and interosseous recurrent aa. Maintains perfusion despite positional compression or injury.</p>
            </div>
          </div>
        </div>

        {/* ── CUBITAL FOSSA ── */}
        <div id="cubital-fossa" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">The Cubital Fossa</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The cubital fossa is a triangular depression on the anterior aspect of the elbow. Its borders are: lateral — brachioradialis; medial — pronator teres; superior — an imaginary line between the epicondyles. The roof is formed by skin, superficial fascia (containing the median cubital vein and cutaneous nerves), and the bicipital aponeurosis. The floor is formed by brachialis (proximally) and supinator (distally). Contents from lateral to medial: <strong>T</strong>endon (biceps), <strong>A</strong>rtery (brachial), <strong>N</strong>erve (median).
          </p>
          <AntecubitalFossaDiagram />
        </div>

        {/* ── VENOUS DRAINAGE ── */}
        <div id="venous-drainage" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Venous Drainage of the Upper Limb</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The upper limb has superficial and deep venous systems. The superficial system (cephalic, basilic, median cubital veins) is clinically important for venepuncture, IV cannulation, and PICC line insertion. The deep system (venae comitantes accompanying the arteries) handles the majority of venous return. Both systems communicate via perforating veins.
          </p>
          <UpperLimbVeinsDiagram />
          <div className="grid sm:grid-cols-2 gap-3 mt-4">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">PICC Line Selection</p>
              <p className="text-sm text-muted-foreground mt-1">Basilic vein preferred (larger, straighter course). Cephalic vein as alternative but higher failure rate due to acute angle at deltopectoral groove. Brachial vein (deep) used with US guidance. Tip position: lower SVC/cavoatrial junction — confirm with CXR.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Venous Access Hierarchy</p>
              <p className="text-sm text-muted-foreground mt-1">Peripheral IV: dorsal hand → forearm → cubital fossa. Central access: IJV → subclavian → femoral. PICC: basilic → cephalic → brachial. In CKD patients, preserve the non-dominant arm cephalic vein for future AV fistula.</p>
            </div>
          </div>
        </div>
        </section>
      </ExamSection>
      }
    />
  );
};

export default UpperLimbAnatomyTopic;
