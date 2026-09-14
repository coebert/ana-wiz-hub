import { SectionLayout } from "@/components/layout/SectionLayout";
import { CaseBankCallout } from "@/components/cases/CaseBankCallout";
import { DrugDosesCallout } from "@/components/icu/DrugDosesCallout";
import { icuCaseBank } from "@/data/cases/icuCases";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { SectionSubNav } from "@/components/layout/SectionSubNav";
import { SectionTopicsList } from "@/components/topic/SectionTopicsList";
import { SectionSummary } from "@/components/topic/SectionSummary";
import { intensiveCareTopics } from "@/data/curriculum";
import { useProgress } from "@/contexts/ProgressContext";
import { useExamFilter } from "@/contexts/ExamFilterContext";

const IntensiveCareSection = () => {
  const { getSectionProgress } = useProgress();
  const { matchesFilter } = useExamFilter();
  const progress = getSectionProgress("intensive-care");
  const visibleTopics = intensiveCareTopics.filter((t) => matchesFilter(t.examTags));

  return (
    <SectionLayout
      title="Intensive Care Medicine Explained"
      subtitle="Intensive care medicine explained — organ support, sepsis, ARDS, shock and neurocritical care for FFICM and FRCA trainees."
      metaDescription="Intensive care for FFICM and FRCA: ventilation, sepsis, ARDS, shock, AKI, neurocritical care and organ support — concise notes and MCQs."
      backPath="/revise"
      backLabel="Core Disciplines"
      accentColor="text-icu"
      disableAutoTOC
    >
      <SectionSubNav />
      <SectionHeader
        section="intensive-care"
        eyebrow="Intensive Care · FFICM · FRCA Final"
        completed={progress.completed}
        total={progress.total}
        intro={
          <p>
            <strong>Intensive care medicine explained.</strong> Critical care for
            FFICM and FRCA Final trainees — mechanical ventilation and ARDS,
            sepsis and shock, AKI and renal replacement, neurocritical care,
            nutrition, sedation and end-of-life decisions. Each topic pairs
            concise notes with diagrams, MCQs and structured viva answers.
          </p>
        }
      />

      <CaseBankCallout bank={icuCaseBank} />

      <DrugDosesCallout />

      <p className="mt-3 text-sm text-muted-foreground">
        Also available:{" "}
        <a href="/intensive-care/nursing-protocols" className="font-medium text-icu underline-offset-4 hover:underline">
          ICU nursing protocols
        </a>{" "}
        (central line care, ventilator bundles, tracheostomy and more, with references),{" "}
        <a href="/intensive-care/management-flows" className="font-medium text-icu underline-offset-4 hover:underline">
          management flows
        </a>{" "}
        (adult and{" "}
        <a href="/intensive-care/paediatric-flows" className="font-medium text-icu underline-offset-4 hover:underline">
          paediatric
        </a>
        ){" "}
        , the{" "}
        <a href="/intensive-care/adult-withdrawal" className="font-medium text-icu underline-offset-4 hover:underline">
          adult
        </a>{" "}
        and{" "}
        <a href="/intensive-care/paediatric-withdrawal" className="font-medium text-icu underline-offset-4 hover:underline">
          paediatric
        </a>{" "}
        withdrawal flows (tapering, half-life timing, monitoring and rescue){" "}
        , the{" "}
        <a href="/intensive-care/calculator" className="font-medium text-icu underline-offset-4 hover:underline">
          drug calculator
        </a>{" "}
        ,{" "}
        <a href="/intensive-care/drug-safety" className="font-medium text-icu underline-offset-4 hover:underline">
          drug safety
        </a>{" "}
        (interactions, contraindications and monitoring), the{" "}
        <a href="/intensive-care/interaction-checker" className="font-medium text-icu underline-offset-4 hover:underline">
          interaction checker
        </a>{" "}
        , the{" "}
        <a href="/intensive-care/interaction-matrix" className="font-medium text-icu underline-offset-4 hover:underline">
          interaction matrix
        </a>{" "}
        (which ICU drugs interact with each other) and the{" "}
        <a href="/intensive-care/drug-comparison" className="font-medium text-icu underline-offset-4 hover:underline">
          drug comparison tool
        </a>{" "}
        and the{" "}
        <a href="/intensive-care/drug-cards" className="font-medium text-icu underline-offset-4 hover:underline">
          full drug cards
        </a>{" "}
        (class, mechanism, dosing, kinetics, safety and withdrawal on one card),
        the{" "}
        <a href="/intensive-care/pharmacology" className="font-medium text-icu underline-offset-4 hover:underline">
          ICU pharmacology reference
        </a>{" "}
        (dose, route, duration of therapy and monitoring thresholds by drug class),
        plus{" "}
        <a
          href="/intensive-care/paediatric-pharmacokinetics"
          className="font-medium text-icu underline-offset-4 hover:underline"
        >
          paediatric pharmacokinetics
        </a>{" "}
        (weight-based clearance, volume of distribution and half-life by age band)
        .


      </p>

      <section id="topics" className="scroll-mt-28">
        <SectionTopicsList section="intensive-care" topics={visibleTopics} />
      </section>

      <section id="summary" className="scroll-mt-28">
        <SectionSummary section="intensive-care" />
      </section>
    </SectionLayout>
  );
};

export default IntensiveCareSection;
