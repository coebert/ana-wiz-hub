import { Link } from "react-router-dom";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { ExamSection } from "@/components/exam/ExamSection";
import { InlineRef } from "@/components/references/InlineRef";
import { QuizSection } from "@/components/quiz/QuizSection";
import { Exam } from "@/data/curriculum";
import { surgicalProtocols } from "@/data/surgicalProtocols";

const T = "surgical-protocols";

const PHASES = [
  { key: "preop", label: "Pre-op" },
  { key: "intraop", label: "Intra-op" },
  { key: "postop", label: "Post-op" },
] as const;

const SurgicalProtocolsTopic = () => (
  <TopicTemplate
    title="Perioperative Protocols by Surgery Type"
    subtitle="FRCA Final — Clinical"
    backPath="/clinical"
    backLabel="Clinical"
    accentColor="text-clinical"
    topicId={T}
    topicTitle="Perioperative Protocols by Surgery Type"
    objectives={[
      "Structure a pre-, intra- and post-operative plan for each major surgical specialty",
      "Identify the specialty-specific hazards that change a standard anaesthetic",
      "Link each protocol to the detailed topic page for depth and evidence",
    ]}
    keyPoints={[
      { text: "Every protocol starts with risk assessment, optimisation and shared decision-making", cites: ["AoA Preop 2021"] },
      { text: "WHO checklist, normothermia, VTE prophylaxis and multimodal analgesia apply across all specialties", cites: ["WHO Checklist 2009", "NICE NG180"] },
      { text: "Specialty hazards (shared airway, cross-clamp, one-lung ventilation, aortocaval compression, cement reaction) define the intra-op plan", cites: ["NICE NG180"] },
    ]}
    sectionExamMapping={{ objectives: { exams: [Exam.FINAL] }, keyPoints: { exams: [Exam.FINAL] } }}
    coreConcepts={
      <div className="space-y-10">
        <p className="text-muted-foreground leading-relaxed">
          These are exam-oriented summary protocols, not local policy. Each follows the same structure — pre-op, intra-op, post-op —
          and ends with a short quiz. General principles: perioperative care per NICE NG180<InlineRef topicId={T} refLabel="NICE NG180" />,
          preoperative assessment per the Association of Anaesthetists<InlineRef topicId={T} refLabel="AoA Preop 2021" /> and the WHO
          surgical safety checklist.<InlineRef topicId={T} refLabel="WHO Checklist 2009" />
        </p>
        {surgicalProtocols.map((p) => (
          <ExamSection key={p.id} id={p.id} exams={[Exam.FINAL]}>
            <section className="space-y-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-2xl font-serif font-bold text-foreground">{p.title}</h2>
                <Link to={p.link} className="text-sm text-primary underline-offset-4 hover:underline">Full topic →</Link>
              </div>
              <p className="text-sm text-muted-foreground">{p.scope}</p>
              <div className="grid gap-3 md:grid-cols-3">
                {PHASES.map((ph) => (
                  <div key={ph.key} className="rounded-lg border border-border p-3">
                    <p className="font-semibold text-foreground text-sm mb-2">{ph.label}</p>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      {p[ph.key].map((s) => <li key={s}>{s}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Quiz — {p.title}</h3>
                <QuizSection questions={p.quiz} />
              </div>
            </section>
          </ExamSection>
        ))}
      </div>
    }
  />
);

export default SurgicalProtocolsTopic;
