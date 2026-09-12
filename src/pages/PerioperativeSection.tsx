import { SectionLayout } from "@/components/layout/SectionLayout";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { SectionSubNav } from "@/components/layout/SectionSubNav";
import { SectionTopicsList } from "@/components/topic/SectionTopicsList";
import { SectionSummary } from "@/components/topic/SectionSummary";
import { perioperativeTopics } from "@/data/curriculum";
import { useProgress } from "@/contexts/ProgressContext";
import { useExamFilter } from "@/contexts/ExamFilterContext";
import { Link } from "react-router-dom";
import { BookOpenCheck, Pill, Stethoscope, Milestone } from "lucide-react";
import { anaesthesiaDrugCount } from "@/data/anaesthesiaDrugDoses";
import { Button } from "@/components/ui/button";

const PerioperativeSection = () => {
  const { getSectionProgress } = useProgress();
  const { matchesFilter } = useExamFilter();
  const progress = getSectionProgress("perioperative");
  const visibleTopics = perioperativeTopics.filter((t) => matchesFilter(t.examTags));

  return (
    <SectionLayout
      title="Perioperative Medicine Explained"
      subtitle="Perioperative medicine explained — preoperative assessment, risk stratification, enhanced recovery and postoperative care for FRCA and FFICM."
      metaDescription="Perioperative medicine for FRCA and FFICM: preop assessment, cardiac and respiratory risk, ERAS, postoperative care and frailty — notes and MCQs."
      backPath="/revise"
      backLabel="Core Disciplines"
      accentColor="text-perioperative"
      disableAutoTOC
    >
      <SectionSubNav />
      <SectionHeader
        section="perioperative"
        eyebrow="Perioperative Medicine · FRCA Final · FFICM"
        completed={progress.completed}
        total={progress.total}
        intro={
          <p>
            <strong>Perioperative medicine explained.</strong> Preoperative
            assessment, cardiac and respiratory risk stratification, CPET, frailty
            scoring, enhanced recovery (ERAS) and postoperative care for FRCA
            Final and FFICM trainees. Each topic pairs concise notes with
            diagrams, MCQs and structured viva answers.
          </p>
        }
      />

      <section className="border-y border-border py-5 mb-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-start gap-3">
          <BookOpenCheck className="h-6 w-6 shrink-0 text-perioperative mt-0.5" aria-hidden />
          <div>
            <h2 className="font-semibold text-foreground">Perioperative Case Bank</h2>
            <p className="mt-1 text-sm text-muted-foreground">Work through 18 progressive patient scenarios covering steroid cover, phaeochromocytoma and antifibrinolytics.</p>
          </div>
        </div>
        <Button asChild className="shrink-0"><Link to="/perioperative/case-bank">Open case bank</Link></Button>
      </section>

      <section className="border-b border-border py-5 mb-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-start gap-3">
          <Stethoscope className="h-6 w-6 shrink-0 text-perioperative mt-0.5" aria-hidden />
          <div>
            <h2 className="font-semibold text-foreground">Co-Existing Disease Overview</h2>
            <p className="mt-1 text-sm text-muted-foreground">All co-existing disease topics on one revision page with the key exam points for each.</p>
          </div>
        </div>
        <Button asChild variant="outline" className="shrink-0"><Link to="/perioperative/co-existing-disease">Open overview</Link></Button>
      </section>

      <section className="border-b border-border py-5 mb-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-start gap-3">
          <Pill className="h-6 w-6 shrink-0 text-perioperative mt-0.5" aria-hidden />
          <div>
            <h2 className="font-semibold text-foreground">Anaesthesia Drug Dosing Table</h2>
            <p className="mt-1 text-sm text-muted-foreground">Dose, route, frequency and key indications for {anaesthesiaDrugCount} anaesthetic drugs — induction, maintenance, analgesia and reversal — in one searchable table.</p>
          </div>
        </div>
        <Button asChild variant="outline" className="shrink-0"><Link to="/perioperative/drug-doses">Open dosing table</Link></Button>
      </section>

      <section id="topics" className="scroll-mt-28">
        <SectionTopicsList section="perioperative" topics={visibleTopics} />
      </section>

      <section id="summary" className="scroll-mt-28">
        <SectionSummary section="perioperative" />
      </section>
    </SectionLayout>
  );
};

export default PerioperativeSection;
