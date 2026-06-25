import ExamHub from "@/components/ExamHub";

const FRCAPrimaryHub = () => (
  <ExamHub
    examTag="primary"
    examName="FRCA Primary"
    path="/frca-primary"
    metaTitle="FRCA Primary Revision Notes & MCQ Topics | AnaesthesiaCore"
    metaDescription="Free FRCA Primary revision: every Primary FRCA syllabus topic in physics, physiology and pharmacology with concise exam notes, diagrams and MCQ-style questions."
    h1="FRCA Primary revision"
    intro="A focused hub for the Primary FRCA exam. Every published AnaesthesiaCore topic mapped to the Primary syllabus — physics, physiology, pharmacology and clinical foundations — with structured notes, diagrams, worked examples and MCQs that mirror the RCoA blueprint."
    faqs={[
      {
        question: "What is the Primary FRCA exam?",
        answer:
          "The Primary FRCA is the first part of the Royal College of Anaesthetists Fellowship examination, taken in the early years of UK anaesthesia training. It tests the basic sciences underpinning anaesthesia — physics, physiology, pharmacology and clinical measurement — across an MCQ/SBA paper and a structured oral (SOE/OSCE) component.",
      },
      {
        question: "How difficult is the Primary FRCA?",
        answer:
          "Pass rates for the Primary FRCA MCQ typically sit around 50–65% per sitting and the SOE around 60–70%. Most candidates who fail underestimate the depth required in physics and pharmacokinetics. Structured topic-by-topic revision against the RCoA syllabus, plenty of question practice and timed mock vivas are the single biggest predictors of success.",
      },
      {
        question: "When should I take the Primary FRCA?",
        answer:
          "Most UK trainees sit the Primary FRCA MCQ during CT2 and the SOE/OSCE shortly after passing the MCQ, aiming to clear both components before progressing to ST4. Earlier attempts are increasingly common — once you have six to twelve months of consolidated theatre experience plus dedicated revision time, you are usually well placed to sit.",
      },
      {
        question: "How should I revise for the Primary FRCA?",
        answer:
          "Work through the RCoA syllabus systematically rather than randomly. Cover every physics, physiology and pharmacology topic — even ones you find easy — and pair each with question practice (MCQs and viva-style questions). Use teaching journals (BJA Education), a core textbook (Peck & Hill, West, Power & Kam) and an active recall tool such as the AnaesthesiaCore quizzes and worked examples.",
      },
      {
        question: "What are the best Primary FRCA notes?",
        answer:
          "Strong revision notes are concise, mapped to the RCoA Primary syllabus, and cite peer-reviewed sources. AnaesthesiaCore's Primary FRCA topics are written in that style — every page lists the syllabus reference, the key concepts in exam-shaped wording, diagrams that match common viva questions, and a short quiz to test recall.",
      },
      {
        question: "How is the Primary FRCA structured?",
        answer:
          "The Primary FRCA has two components. The MCQ paper combines multiple true/false (MTF) and single best answer (SBA) questions across physiology, pharmacology, physics & clinical measurement, and statistics. The structured oral (SOE) and OSCE then test applied knowledge through equipment stations, simulated clinical scenarios and structured viva questions on the same syllabus areas.",
      },
    ]}
  />
);

export default FRCAPrimaryHub;
