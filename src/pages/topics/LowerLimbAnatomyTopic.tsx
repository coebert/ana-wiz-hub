import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";

const lowerLimbAnatomyFaqs: Array<[string, string]> = [
  ["At the inguinal level, what is the order of structures from lateral to medial?", "NAVeL: femoral Nerve — femoral Artery — femoral Vein — empty space — Lymphatics (within femoral canal). The artery lies at the mid-inguinal point (midway between ASIS and pubic symphysis); the nerve sits ~1 cm lateral, separated from the artery by the iliopectineal arch — relevant for femoral nerve block needle placement."],
  ["What does a femoral nerve block cover, and what does it miss?", "It covers the anterior thigh (skin and quadriceps), medial leg (saphenous nerve below the knee) and periosteum of the femur — sufficient for analgesia after femoral neck or shaft fracture and for knee surgery in combination with a sciatic block. It misses the posterior thigh (sciatic), hip joint (obturator + sciatic + femoral all contribute), and lateral thigh (lateral cutaneous nerve of thigh)."],
  ["Where does the sciatic nerve divide and why does that matter for popliteal block?", "The sciatic typically divides into tibial and common peroneal branches in the popliteal fossa, ~7 cm proximal to the popliteal crease. Ultrasound-guided popliteal block targets the nerve just proximal to the bifurcation so one injection captures both branches — block below the bifurcation may spare one division and leave the lateral foot (peroneal) or sole (tibial) unblocked."],
];
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { lowerLimbAnatomyQuestions } from "@/data/quizzes";
import LumbosacralPlexusDiagram from "@/components/diagrams/LumbosacralPlexusDiagram";
import LowerLimbBranchesDiagram from "@/components/diagrams/LowerLimbBranchesDiagram";
import LowerLimbArteriesDiagram from "@/components/diagrams/LowerLimbArteriesDiagram";
import LowerLimbVeinsDiagram from "@/components/diagrams/LowerLimbVeinsDiagram";
import LowerLimbInnervationDiagram from "@/components/diagrams/LowerLimbInnervationDiagram";
import CorPictumFolio from "@/components/diagrams/CorPictumFolio";
import { lowerLimbFolio } from "@/components/diagrams/anatomyFolios";
import { Exam } from "@/data/curriculum";

const objectives = [
  "Describe the formation and main branches of the lumbar and sacral plexuses",
  "Identify nerve, motor and sensory territories relevant to lower-limb regional anaesthesia",
  "Choose appropriate lower-limb blocks (fascia iliaca, femoral, adductor canal, popliteal sciatic, ankle) for common procedures",
  "Outline the arterial supply of the lower limb and clinical pulse points",
  "Explain compartment syndrome anatomy and DVT prevention principles",
];

const LowerLimbAnatomyTopicWorkedExamples: WorkedExample[] = [
  {
    title: "Regional plan for total knee replacement",
    scenario: "A 72-year-old for elective TKR wants opioid-sparing analgesia with early mobilisation. Design a regional plan covering the relevant nerves while preserving quadriceps power.",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Map the surgical innervation: anterior knee — femoral nerve branches (vastus, saphenous); posterior knee — sciatic (tibial + common peroneal) and obturator articular branches</li>
          <li>For motor-sparing analgesia choose adductor canal block (saphenous + nerve to vastus medialis) instead of femoral — preserves quadriceps for early mobilisation</li>
          <li>Cover the posterior capsule with IPACK (Infiltration between Popliteal Artery and Capsule of Knee) — analgesia without foot drop</li>
          <li>Add periarticular surgical infiltration with LA + ketorolac to bridge the obturator contribution</li>
          <li>Avoid sciatic block — produces foot drop and impairs early mobilisation/falls assessment</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
          <li>Femoral block causing quad weakness and falls in day-case TKR</li>
          <li>Missing posterior capsule pain when relying on adductor canal alone</li>
          <li>Local anaesthetic systemic toxicity from combined regional + periarticular doses — calculate maximum mg/kg</li>
          </ul>
        </div>
      </div>
    ),
    answer: "Adductor canal block + IPACK + surgical periarticular infiltration — motor-sparing multimodal regional plan compatible with enhanced recovery.",
    cites: ["Ellis Ch.7", "NYSORA Lower Limb", "BJA Educ 2016"],
  },
];

const LowerLimbAnatomyTopic = () => {
  return (
    <TopicTemplate
      title="Lower Limb & Lumbosacral Plexus"
      subtitle="FRCA Primary & Final — Anatomy"
      backPath="/anatomy"
      backLabel="Anatomy"
      accentColor="text-clinical"
      topicId="lower-limb-anatomy"
      topicTitle="Lower Limb & Lumbosacral Plexus"
      workedExamples={LowerLimbAnatomyTopicWorkedExamples}
      objectives={objectives}
      quizQuestions={lowerLimbAnatomyQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL], curriculumCodes: ["RCoA Primary — Anatomy"] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL] },
      }}
      sectionSources={{
        objectives: [
          "Ellis Ch.7",
          "NYSORA Lower Limb",
          "BJA Educ 2016",
        ],
        keyPoints: [
          "Ellis Ch.7",
          "NYSORA Lower Limb",
          "BJA Educ 2016",
        ],
      }}
      keyPoints={[
        { text: "Femoral nerve (L2-L4): lateral to femoral artery under inguinal ligament. Motor: quadriceps. Sensory: anterior thigh + medial leg (saphenous)", cites: ["NYSORA Lower Limb"] },
        { text: "Sciatic nerve (L4-S3): largest nerve. Two components — tibial (plantarflexion) and common peroneal (dorsiflexion)", cites: ["Ellis Ch.7"] },
        { text: "Common peroneal nerve wraps around fibular neck — vulnerable to compression → foot drop", cites: ["BJA Educ 2016"] },
        { text: "Femoral artery palpated at the mid-inguinal point; profunda femoris is the main supply to thigh musculature", cites: ["NYSORA Lower Limb"] },
        { text: "Displaced intracapsular #NOF disrupts the MCFA → AVN of femoral head → hemiarthroplasty required", cites: ["Ellis Ch.7"] },
        { text: "Great saphenous vein: medial limb, drains at SFJ in groin. Cutdown landmark: 1 cm anterior + superior to medial malleolus", cites: ["BJA Educ 2016"] },
        { text: "May-Thurner syndrome: left CIV compression → higher incidence of left-sided DVT", cites: ["NYSORA Lower Limb"] },
        { text: "Adductor canal block: motor-sparing alternative to femoral nerve block for knee surgery", cites: ["Ellis Ch.7"] },
      ]}
      coreConcepts={
        <>
          <ExamSection id="lumbar-plexus" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Lumbar Plexus (L1-L4)" defaultOpen>
            <p className="text-muted-foreground leading-relaxed mb-3">Formed within psoas major from anterior rami of L1-L4. Main branches:</p>
            <CorPictumFolio {...lowerLimbFolio} enableReviewMode suppressOverlayLabels />
            <LowerLimbInnervationDiagram />
            <LumbosacralPlexusDiagram />
            <LowerLimbBranchesDiagram />
            <div className="space-y-3 mt-3">
              {[
                { nerve: "Femoral nerve (L2-L4)", desc: "Passes under inguinal ligament lateral to femoral artery (VAN: vein-artery-nerve). Motor: quadriceps (knee extension), sartorius. Sensory: anterior thigh, medial leg (saphenous branch). Block: below inguinal ligament lateral to artery, or fascia iliaca block." },
                { nerve: "Obturator nerve (L2-L4)", desc: "Through obturator foramen. Motor: adductors of thigh. Sensory: medial thigh (variable). Relevant for hip/knee surgery. Can cause incomplete block with femoral nerve block alone." },
                { nerve: "Lateral cutaneous nerve of thigh (L2-L3)", desc: "Passes under/through inguinal ligament near ASIS. Pure sensory: lateral thigh. Meralgia paraesthetica = entrapment neuropathy." },
                { nerve: "Iliohypogastric/Ilioinguinal (L1)", desc: "Relevant for inguinal hernia surgery. TAP/ilioinguinal block provides analgesia for lower abdominal incisions." },
              ].map(n => (
                <div key={n.nerve} className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{n.nerve}</p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{n.desc}</p>
                </div>
              ))}
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="sacral-plexus" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Sacral Plexus (L4-S3)">
            <div className="space-y-3">
              {[
                { nerve: "Sciatic nerve (L4-S3)", desc: "Largest nerve in the body. Exits pelvis through greater sciatic foramen below piriformis. Two components: tibial (medial, anterior divisions) and common peroneal (lateral, posterior divisions). Divides in popliteal fossa (variable). Block: subgluteal, anterior, popliteal approaches." },
                { nerve: "Tibial nerve", desc: "Motor: posterior compartment (gastrocnemius, soleus — plantarflexion), deep muscles of foot. Sensory: sole of foot (medial/lateral plantar nerves). Passes behind medial malleolus." },
                { nerve: "Common peroneal nerve", desc: "Wraps around fibular neck (vulnerable to compression). Motor: anterior compartment (dorsiflexion — deep peroneal), lateral compartment (eversion — superficial peroneal). Sensory: lateral leg and dorsum of foot. Foot drop from compression." },
                { nerve: "Posterior cutaneous nerve of thigh (S1-S3)", desc: "Sensory: posterior thigh. Not blocked by sciatic nerve block — need separate block or proximal approach." },
              ].map(n => (
                <div key={n.nerve} className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{n.nerve}</p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{n.desc}</p>
                </div>
              ))}
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="lower-limb-blocks" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Key Blocks for Lower Limb">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead><tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Block</th>
                  <th className="text-left py-2 text-foreground font-semibold">Nerves</th>
                  <th className="text-left py-2 text-foreground font-semibold">Indications</th>
                </tr></thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Fascia iliaca</td><td>Femoral, obturator, LCNT</td><td>Hip fracture analgesia (#NOF), hip/knee surgery</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Femoral nerve block</td><td>Femoral</td><td>Knee surgery, femoral shaft fracture</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Adductor canal</td><td>Saphenous + nerve to vastus medialis</td><td>Knee arthroplasty — motor-sparing (preserves quadriceps)</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Popliteal sciatic</td><td>Tibial + common peroneal</td><td>Below-knee surgery, ankle/foot</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">Ankle block</td><td>5 nerves at ankle</td><td>Foot surgery. Tibial, deep peroneal, superficial peroneal, sural, saphenous</td></tr>
                </tbody>
              </table>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="arterial-supply" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Arterial Supply of the Lower Limb">
            <p className="text-muted-foreground leading-relaxed mb-4">
              The arterial supply follows a continuous chain: external iliac → femoral → popliteal → anterior tibial, posterior tibial, and peroneal arteries. The profunda femoris is the main supply to the thigh musculature. Peripheral pulse assessment (femoral, popliteal, posterior tibial, dorsalis pedis) is a fundamental clinical skill.
            </p>
            <LowerLimbArteriesDiagram />
            <div className="grid sm:grid-cols-2 gap-3 mt-4">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Peripheral Pulse Assessment</p>
                <p className="text-sm text-muted-foreground mt-1">Femoral: mid-inguinal point. Popliteal: deep in the popliteal fossa with knee flexed. Posterior tibial: posterior to the medial malleolus. Dorsalis pedis: lateral to EHL tendon (absent in 5–12%). Document pulses pre-operatively, especially before vascular, orthopaedic, and regional anaesthesia procedures.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Compartment Syndrome</p>
                <p className="text-sm text-muted-foreground mt-1">The leg has 4 compartments: anterior (deep peroneal nerve, anterior tibial artery), lateral (superficial peroneal nerve), deep posterior (tibial nerve, posterior tibial and peroneal arteries), superficial posterior. Anterior compartment is most commonly affected. All 4 compartments must be released at fasciotomy. Pain out of proportion to injury + pain on passive stretch are key signs.</p>
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="venous-drainage" exams={[Exam.PRIMARY, Exam.FINAL]}>
            <CollapsibleSubsection title="Venous Drainage of the Lower Limb">
            <p className="text-muted-foreground leading-relaxed mb-4">
              The lower limb has superficial and deep venous systems connected by perforating veins. The great saphenous vein (GSV) is the longest vein in the body, running along the medial limb from ankle to groin. The small saphenous vein (SSV) runs posteriorly in the calf. The deep system (tibial veins, popliteal, femoral) carries the majority of venous return, driven by the calf muscle pump. DVT prevention is a cornerstone of perioperative care.
            </p>
            <LowerLimbVeinsDiagram />
            <div className="grid sm:grid-cols-2 gap-3 mt-4">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">DVT Risk & Prevention</p>
                <p className="text-sm text-muted-foreground mt-1">Virchow's triad: stasis, endothelial injury, hypercoagulability. Perioperative prevention: early mobilisation, TEDs, intermittent pneumatic compression, pharmacological thromboprophylaxis (LMWH/DOACs). Risk assessment: NICE CG89 — all surgical patients should have VTE risk assessment on admission.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">GSV Cutdown</p>
                <p className="text-sm text-muted-foreground mt-1">Emergency venous access: 1 cm anterior and 1 cm superior to the medial malleolus. Transverse skin incision, blunt dissection to expose the vein, tie distally, venotomy, and advance cannula proximally. Landmark-based — can be performed when peripheral IV and central access fail.</p>
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>
          <TopicFaqs faqs={lowerLimbAnatomyFaqs} />
        </>
      }
    />
  );
};

export default LowerLimbAnatomyTopic;
