import { TopicTemplate } from "@/components/TopicTemplate";
import { CollapsibleSubsection } from "@/components/CollapsibleSubsection";
import { ExamSection } from "@/components/ExamSection";
import { abdominalAnatomyQuestions } from "@/data/quizzes";
import AbdominalWallDiagram from "@/components/diagrams/AbdominalWallDiagram";
import CorPictumFolio from "@/components/diagrams/CorPictumFolio";
import { abdominalFolio } from "@/components/diagrams/anatomyFolios";
import { Exam } from "@/data/curriculum";

const AbdominalAnatomyTopic = () => {
  return (
    <TopicTemplate
      title="Abdominal & Pelvic Anatomy"
      subtitle="FRCA — Applied Anatomy"
      backPath="/anatomy"
      backLabel="Anatomy"
      accentColor="text-anatomy"
      topicId="abdominal-anatomy"
      quizQuestions={abdominalAnatomyQuestions}
      objectives={[
        "Describe the layered anatomy of the anterior abdominal wall and identify the TAP plane.",
        "Recall inguinal canal boundaries and the nerves targeted in hernia repair blocks.",
        "Outline the anaesthetic relevance of liver, kidneys, spleen, stomach and duodenum.",
        "Map pelvic autonomic and sacral plexus anatomy onto regional techniques.",
      ]}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL], curriculumCodes: ["AN_BK_03"] },
        workedExamples: { exams: [Exam.PRIMARY, Exam.FINAL] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL] },
      }}
      sectionSources={{
        objectives: ["Ellis & Feldman Ch.4", "Miller Ch.47"],
        workedExamples: ["BJA Educ 2015", "Miller Ch.47"],
        keyPoints: ["Ellis & Feldman Ch.4", "BJA Educ 2015", "Miller Ch.47"],
      }}
      coreConcepts={
        <>
          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["AN_BK_03"]}>
            <CollapsibleSubsection title="Anterior Abdominal Wall Layers" defaultOpen>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Understanding the abdominal wall layers is essential for TAP blocks, rectus sheath blocks, and laparoscopic port placement.
            </p>
            <div className="bg-card rounded-xl border border-border p-4 md:p-6 mb-4">
              <AbdominalWallDiagram />
            </div>
            <div className="space-y-1.5 mt-2">
              {[
                "Skin → Camper's fascia (fatty) → Scarpa's fascia (membranous)",
                "External oblique (fibres run downward and medially — 'hands in pockets')",
                "Internal oblique (fibres run upward and medially)",
                "Transversus abdominis — TAP plane lies between internal oblique and transversus",
                "Transversalis fascia → extraperitoneal fat → parietal peritoneum",
              ].map((layer, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded border border-border">
                  <span className="text-xs font-bold text-primary w-5 text-center">{i + 1}</span>
                  <span className="text-sm text-muted-foreground">{layer}</span>
                </div>
              ))}
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["AN_BK_03"]}>
            <CollapsibleSubsection title="Inguinal Canal">
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Boundaries</p>
                <p className="text-sm text-muted-foreground mt-1">Floor: inguinal ligament. Roof: internal oblique, transversus abdominis. Anterior wall: external oblique aponeurosis. Posterior wall: transversalis fascia (+ conjoint tendon medially).</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Nerve Blocks for Hernia Repair</p>
                <p className="text-sm text-muted-foreground mt-1">Ilioinguinal nerve (L1): runs between internal oblique and transversus. Iliohypogastric nerve (L1): runs between external and internal oblique. Genitofemoral nerve (L1,2): genital branch enters canal via deep ring.</p>
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["AN_BK_03"]}>
            <CollapsibleSubsection title="Key Abdominal Organs — Anaesthetic Relevance">
            <div className="bg-card rounded-xl border border-border p-4 md:p-6 mb-4">
              <CorPictumFolio {...abdominalFolio} suppressOverlayLabels />
            </div>
            <div className="space-y-2">
              {[
                { organ: "Liver", detail: "Right upper quadrant. Receives 25% CO (75% portal vein, 25% hepatic artery). Volatile agents reduce hepatic blood flow. Couinaud segments guide surgical resection." },
                { organ: "Kidneys", detail: "Retroperitoneal (T12–L3). Right lower than left (liver). Receive 20–25% CO. Relations: posterior to peritoneum, anterior to quadratus lumborum and psoas." },
                { organ: "Spleen", detail: "Left upper quadrant, under ribs 9–11. Friable capsule — bleeds easily. Splenic artery from coeliac trunk. Splenectomy → risk of OPSI (encapsulated organisms)." },
                { organ: "Stomach & Duodenum", detail: "Vagal innervation (anterior and posterior vagal trunks). Coeliac plexus block targets splanchnic nerves at L1 — used for upper abdominal cancer pain." },
              ].map((o) => (
                <div key={o.organ} className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{o.organ}</p>
                  <p className="text-sm text-muted-foreground mt-1">{o.detail}</p>
                </div>
              ))}
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["AN_BK_03"]}>
            <CollapsibleSubsection title="Pelvic Anatomy">
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Pelvic Autonomics</p>
                <p className="text-sm text-muted-foreground mt-1">Sympathetic: hypogastric nerves (L1–L2). Parasympathetic: pelvic splanchnic nerves (S2–S4 — "nervi erigentes"). Damage during pelvic surgery → bladder/sexual dysfunction.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">Sacral Plexus (L4–S4)</p>
                <p className="text-sm text-muted-foreground mt-1">Sciatic nerve (L4–S3): largest nerve in body. Exits pelvis through greater sciatic foramen below piriformis. Pudendal nerve (S2–S4): perineal sensation — pudendal nerve block for perineal surgery.</p>
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>
        </>
      }
      workedExamples={[
        {
          title: "Planning a TAP block for laparotomy analgesia",
          scenario: "A 60-year-old has had a midline laparotomy for bowel resection and is for a bilateral subcostal + lateral TAP block on a 70 kg frame.",
          working: (
            <div className="space-y-2">
              <p className="font-semibold text-foreground">Step-by-step reasoning</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Identify plane on US: external oblique → internal oblique → transversus abdominis. Inject between IO and TA.</li>
                <li>Subcostal TAP covers T6–T9 (upper abdomen); lateral TAP covers T10–L1 (lower abdomen).</li>
                <li>Total LA dose: stay below toxic threshold. Levobupivacaine max ≈ 2 mg/kg → 140 mg in this patient.</li>
                <li>Use 0.25% levobupivacaine 20 ml per side → 50 mg per side, 100 mg total — within limit.</li>
                <li>TAP blocks cover somatic wall pain only — combine with multimodal analgesia (paracetamol, opioid PCA) for visceral pain.</li>
              </ol>
              <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
                <p className="text-xs font-semibold text-destructive uppercase">Common traps</p>
                <ul className="list-disc list-inside text-foreground">
                  <li>Injecting too superficially (between EO and IO) → no spread to nerves.</li>
                  <li>Forgetting visceral pain coverage — TAP alone insufficient after bowel surgery.</li>
                  <li>Cumulative LA dose when combined with wound infiltration → LAST risk.</li>
                </ul>
              </div>
            </div>
          ),
          answer: "Bilateral subcostal + lateral TAP with 20 ml 0.25% levobupivacaine per side; combine with multimodal analgesia.",
    cites: ["Miller Ch.47"],
  },
      ]}
      keyPoints={[
        { text: "TAP block plane lies between internal oblique and transversus abdominis — targets T6–L1 intercostal nerves", cites: ["BJA Educ 2015"] },
        { text: "Ilioinguinal and iliohypogastric nerves (L1) — key targets for inguinal hernia repair blocks", cites: ["Ellis & Feldman Ch.4"] },
        { text: "Pelvic splanchnic nerves (S2-S4) provide parasympathetic supply — damage → bladder dysfunction", cites: ["Miller Ch.47"] },
        { text: "Liver receives 25% of CO — 75% portal vein, 25% hepatic artery", cites: ["BJA Educ 2015"] },
        { text: "Sciatic nerve exits pelvis below piriformis through greater sciatic foramen", cites: ["Ellis & Feldman Ch.4"] },
      ]}
    />
  );
};

export default AbdominalAnatomyTopic;
