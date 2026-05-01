import { useState } from "react";
import { TopicTemplate } from "@/components/TopicTemplate";
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
      quizQuestions={spinalAnatomyQuestions}
      objectives={[
        "Describe the vertebral column and identify safe landmarks for neuraxial techniques",
        "Outline the layers traversed during spinal and epidural anaesthesia",
        "Explain spinal cord blood supply and the consequences of artery of Adamkiewicz injury",
        "Apply dermatome and myotome knowledge to assess block height and neurological deficit",
        "Describe the epidural space and how pregnancy alters local anaesthetic spread",
      ]}
      keyPoints={[
        "Conus medullaris ends L1/2 in adults, L3 in neonates — neuraxial techniques below this level",
        "Ligamentum flavum: dense elastic tissue providing 'loss of resistance' for epidural identification",
        "Artery of Adamkiewicz (T9-T12, usually left) — damage causes anterior spinal artery syndrome",
        "Batson's plexus is valveless — engorges in pregnancy, reducing epidural space volume",
        "Tuffier's line (intercristal) identifies L4 spinous process or L3/4 interspace",
      ]}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL] },
      }}
      coreConcepts={
        <section className="space-y-6 mb-10">
        <CorPictumFolio {...spinalFolio} />
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
      }
    />
  );
};

export default SpinalAnatomyTopic;
