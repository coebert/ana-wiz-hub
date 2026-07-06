import { useState } from "react";
import { ExamSection } from "@/components/exam/ExamSection";
import { TopicFaqs } from "@/components/topic/TopicFaqs";

const spinalAnatomyFaqs: Array<[string, string]> = [
  ["At what vertebral level does the adult spinal cord end?", "The conus medullaris ends at L1/L2 in adults (most commonly the lower border of L1). In neonates it extends to L3 and ascends with growth. Lumbar puncture and spinal anaesthesia are therefore performed at L3/4 or L4/5 — Tuffier's line (intercristal line) traditionally identifies L4 — to avoid cord injury."],
  ["What are the contents of the epidural space?", "The epidural space lies between the dura mater and bony spinal canal. It contains fat (which buffers dose), the internal vertebral (Batson's) venous plexus, lymphatics, segmental nerve roots, and small arteries including the artery of Adamkiewicz (T9–T12 in 75%). Anterior–posterior depth is typically 4–6 mm at lumbar levels."],
  ["Which ligaments does a Tuohy needle pass through during a midline lumbar epidural?", "From superficial to deep: skin → subcutaneous fat → supraspinous ligament → interspinous ligament → ligamentum flavum (where loss of resistance is felt) → epidural space. The paramedian approach bypasses the supraspinous and interspinous ligaments, passing directly through the ligamentum flavum — useful when calcified midline ligaments resist needle advance."],
];
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { spinalAnatomyQuestions } from "@/data/quizzes";
import SpinalCordCrossSectionDiagram from "@/components/diagrams/SpinalCordCrossSectionDiagram";
import SpinalCordAxialDiagram from "@/components/diagrams/SpinalCordAxialDiagram";
import SpinalCordSagittalDiagram from "@/components/diagrams/SpinalCordSagittalDiagram";
import DermatomeMyotomeDiagram from "@/components/diagrams/DermatomeMyotomeDiagram";
import InteractiveDermatomeMap from "@/components/diagrams/InteractiveDermatomeMap";
import EpiduralSpaceDiagram from "@/components/diagrams/EpiduralSpaceDiagram";
import CorPictumFolio from "@/components/diagrams/CorPictumFolio";
import { spinalFolio } from "@/components/diagrams/anatomyFolios";
import { Exam } from "@/data/curriculum";

const SpinalAnatomyTopicWorkedExamples: WorkedExample[] = [
  {
    title: "Identifying a safe interspace for spinal anaesthesia",
    scenario: "A 32-year-old G2P1 at 39 weeks requests a CSE for elective caesarean section. She is BMI 38 and palpation is difficult. How do you choose a safe interspace and confirm midline?",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Position upright or lateral with maximal lumbar flexion to widen interspinous gaps</li>
          <li>Identify Tuffier's line (intercristal): in adults this crosses L4 spinous process or the L3/4 interspace</li>
          <li>In obese pregnancy the line may overlie L3 — go one space caudal (L3/4 or L4/5) to stay well below the L1/2 conus</li>
          <li>If landmarks are unreliable use ultrasound paramedian sagittal oblique to identify laminae and count from the sacrum upward</li>
          <li>Confirm midline by symmetrical paraspinous resistance and CSF flow free of paraesthesia</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
          <li>Choosing a higher interspace because Tuffier's line is displaced cephalad in pregnancy and obesity — risk of conus injury</li>
          <li>Mistaking the lower border of T12 for L1 on ultrasound count</li>
          </ul>
        </div>
      </div>
    ),
    answer: "Use L3/4 or L4/5 with Tuffier's line as a starting estimate; in this BMI-38 parturient, confirm with ultrasound and count from the sacrum to stay caudal to the conus (L1/2).",
    cites: ["BJA Educ 2006", "Ellis & Feldman Ch.6"],
  },
];

const SpinalAnatomyTopic = () => {
  // Synced selection between InteractiveDermatomeMap and DermatomeMyotomeDiagram —
  // canonical level keys ("C5", "T10", "S2-4") via src/lib/dermatome-sync.ts.
  const [dermatomeLevel, setDermatomeLevel] = useState<string | null>("T10");

  return (
    <TopicTemplate
      title="Vertebral Column & Spinal Cord"
      subtitle="FRCA — Applied Anatomy"
      backPath="/anatomy"
      backLabel="Anatomy"
      accentColor="text-anatomy"
      topicId="spinal-anatomy"
      topicTitle="Vertebral Column & Spinal Cord"
      workedExamples={SpinalAnatomyTopicWorkedExamples}
      quizQuestions={spinalAnatomyQuestions}
      objectives={[
        "Describe the vertebral column and identify safe landmarks for neuraxial techniques",
        "Outline the layers traversed during spinal and epidural anaesthesia",
        "Explain spinal cord blood supply and the consequences of artery of Adamkiewicz injury",
        "Apply dermatome and myotome knowledge to assess block height and neurological deficit",
        "Describe the epidural space and how pregnancy alters local anaesthetic spread",
      ]}
      keyPoints={[
        { text: "Conus medullaris ends L1/2 in adults, L3 in neonates — neuraxial techniques below this level", cites: ["Ellis & Feldman Ch.6"] },
        { text: "Ligamentum flavum: dense elastic tissue providing 'loss of resistance' for epidural identification", cites: ["BJA Educ 2006"] },
        { text: "Artery of Adamkiewicz (T9-T12, usually left) — damage causes anterior spinal artery syndrome", cites: ["BJA Educ 2018"] },
        { text: "Batson's plexus is valveless — engorges in pregnancy, reducing epidural space volume", cites: ["Ellis & Feldman Ch.6"] },
        { text: "Tuffier's line (intercristal) identifies L4 spinous process or L3/4 interspace", cites: ["BJA Educ 2006"] },
      ]}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL] },
      }}
      sectionSources={{
        objectives: [
          "BJA Educ 2006",
          "Ellis & Feldman Ch.6",
          "BJA Educ 2018",
        ],
        keyPoints: [
          "BJA Educ 2006",
          "Ellis & Feldman Ch.6",
          "BJA Educ 2018",
        ],
      }}
      coreConcepts={
        <>
        <ExamSection exams={[Exam.PRIMARY, Exam.FINAL]} className="scroll-mt-24">
        <section className="space-y-6 mb-10">
        <CorPictumFolio {...spinalFolio} suppressOverlayLabels />
        <div id="vertebral-column" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Vertebral Column</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            33 vertebrae: 7 cervical, 12 thoracic, 5 lumbar, 5 sacral (fused), 4 coccygeal (fused). Intervertebral discs between C2/3 and L5/S1. Spinal canal contains the spinal cord, meninges, CSF, epidural space contents, and spinal nerves.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Region</th>
                  <th className="text-left py-2 text-foreground font-semibold">Spinous Process</th>
                  <th className="text-left py-2 text-foreground font-semibold">Clinical Note</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Cervical</td><td>Bifid (C2-C6), C7 prominent</td><td>Atlas (C1) no body/spinous process. Axis (C2) has odontoid peg. C1-2 subluxation risk in RA.</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Thoracic</td><td>Long, downward-angled</td><td>Acute angle makes midline approach to epidural space difficult. Paramedian approach preferred at mid-thoracic level.</td></tr>
                <tr><td className="py-2 font-medium text-foreground">Lumbar</td><td>Horizontal, broad</td><td>Best access for neuraxial techniques. Tuffier's line (intercristal line) at L4 or L3/4 interspace.</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div id="neuraxial-layers" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Layers Traversed During Neuraxial Block</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Midline approach (superficial → deep):
          </p>

          <SpinalCordAxialDiagram />

          <div className="space-y-1.5 mt-4">
            {[
              "Skin",
              "Subcutaneous fat",
              "Supraspinous ligament (connects spinous process tips)",
              "Interspinous ligament (between adjacent spinous processes)",
              "Ligamentum flavum (paired, dense elastic — 'loss of resistance' for epidural)",
              "Epidural space (contains fat, veins, nerve roots — 4–6 mm at L3/4)",
              "Dura mater (tough outer meningeal layer)",
              "Arachnoid mater (avascular, adheres to dura)",
              "Subarachnoid space (CSF — target for spinal anaesthesia)",
            ].map((layer, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded border border-border">
                <span className="text-xs font-bold text-primary w-5 text-center">{i + 1}</span>
                <span className="text-sm text-muted-foreground">{layer}</span>
              </div>
            ))}
          </div>
        </div>

        <div id="spinal-cord" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Spinal Cord</h2>

          <SpinalCordCrossSectionDiagram />

          <SpinalCordSagittalDiagram />

          <div className="grid sm:grid-cols-2 gap-3 mt-4">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Cord Termination</p>
              <p className="text-sm text-muted-foreground mt-1">Conus medullaris ends at L1/2 in adults (L3 in neonates). Filum terminale extends to S2. Cauda equina (nerve roots) below conus. Spinal anaesthesia at L3/4 or below is safe in adults.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Blood Supply</p>
              <p className="text-sm text-muted-foreground mt-1">1 anterior spinal artery (supplies anterior 2/3) + 2 posterior spinal arteries (posterior 1/3). Artery of Adamkiewicz: major radicular artery (T9–T12, usually left) — damage → anterior spinal artery syndrome.</p>
            </div>
          </div>
        </div>

        <div id="dermatomes-myotomes" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Dermatomes & Myotomes</h2>
          <InteractiveDermatomeMap
            selectedLevel={dermatomeLevel}
            onLevelChange={setDermatomeLevel}
          />
          <DermatomeMyotomeDiagram
            selectedLevel={dermatomeLevel}
            onLevelChange={setDermatomeLevel}
          />
        </div>

        <div id="epidural-space" className="scroll-mt-24">
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Epidural Space & Venous Plexus</h2>
          <p className="text-muted-foreground leading-relaxed">
            The epidural space is a potential space between the ligamentum flavum/periosteum and dura. It contains fat, lymphatics, and the internal vertebral venous plexus (Batson's plexus). This plexus is valveless and communicates with pelvic veins — becomes engorged in pregnancy (reduced epidural space volume, higher block with same dose) and with raised intra-abdominal pressure. The epidural space is widest posteriorly at L2 (5–6 mm).
          </p>

          <EpiduralSpaceDiagram />
        </div>
        </section>
      </ExamSection>
      <TopicFaqs faqs={spinalAnatomyFaqs} />
      </>
      }
    />
  );
};

export default SpinalAnatomyTopic;
