import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { abdominalAnatomyQuestions } from "@/data/quizzes";
import AbdominalWallDiagram from "@/components/diagrams/AbdominalWallDiagram";

const AbdominalAnatomyTopic = () => {
  return (
    <SectionLayout title="Abdominal & Pelvic Anatomy" subtitle="FRCA — Applied Anatomy" backPath="/anatomy" backLabel="Anatomy" accentColor="text-anatomy">
      <AbdominalWallDiagram />
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Anterior Abdominal Wall Layers</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Understanding the abdominal wall layers is essential for TAP blocks, rectus sheath blocks, and laparoscopic port placement.
          </p>
          <div className="space-y-1.5">
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
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Inguinal Canal</h2>
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
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Key Abdominal Organs — Anaesthetic Relevance</h2>
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
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Pelvic Anatomy</h2>
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
        </div>
      </section>

      <KeyLearningPoints points={[
        "TAP block plane lies between internal oblique and transversus abdominis — targets T6–L1 intercostal nerves",
        "Ilioinguinal and iliohypogastric nerves (L1) — key targets for inguinal hernia repair blocks",
        "Pelvic splanchnic nerves (S2-S4) provide parasympathetic supply — damage → bladder dysfunction",
        "Liver receives 25% of CO — 75% portal vein, 25% hepatic artery",
        "Sciatic nerve exits pelvis below piriformis through greater sciatic foramen",
      ]} />

      <QuizSection questions={abdominalAnatomyQuestions} />
      <TopicCompletionToggle topicId="abdominal-anatomy" topicTitle="Abdominal & Pelvic Anatomy" />
    </SectionLayout>
  );
};

export default AbdominalAnatomyTopic;
