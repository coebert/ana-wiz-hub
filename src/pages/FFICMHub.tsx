import ExamHub from "@/components/ExamHub";

const FFICMHub = () => (
  <ExamHub
    examTag="fficm"
    examName="FFICM"
    path="/fficm"
    metaTitle="FFICM Revision Notes & Exam Topics | AnaesthesiaCore"
    metaDescription="Free FFICM revision: every Faculty of Intensive Care Medicine syllabus topic with concise exam notes, ICU guidelines, worked examples and viva-style questions."
    h1="FFICM revision"
    intro="A focused hub for the Faculty of Intensive Care Medicine examinations. Every published AnaesthesiaCore topic mapped to the FFICM syllabus — applied respiratory, cardiovascular, renal and neurological intensive care, sepsis, ECMO, transfusion, ethics and end-of-life care — with structured notes and viva-style questions."
    faqs={[
      {
        question: "What is the FFICM exam?",
        answer:
          "The FFICM (Fellowship of the Faculty of Intensive Care Medicine) is the UK exit examination for intensive care medicine training. It has two parts: the MCQ paper (MTF + SBA) covering the FICM curriculum, and the OSCE/SOE which tests applied clinical knowledge, data interpretation, equipment, communication and procedural skills.",
      },
      {
        question: "How is the FFICM structured?",
        answer:
          "Part 1 is the MCQ written paper. Part 2 is a combined OSCE (structured stations covering data, equipment, communication and clinical scenarios) and SOE (structured oral examination on the FICM curriculum). Both parts must be passed within the regulation time window before CCT in ICM.",
      },
      {
        question: "Who can sit the FFICM?",
        answer:
          "FFICM is sat by trainees in single CCT Intensive Care Medicine, and by dual CCT trainees combining ICM with anaesthesia, acute medicine, emergency medicine or respiratory medicine. Eligibility and timing rules are set by FICM and depend on stage of training and prior exam passes.",
      },
      {
        question: "How should I revise for FFICM?",
        answer:
          "Use the FICM curriculum as your master checklist. Combine a reference text (Oh's Intensive Care Manual, ICU Book) with current guidelines (Surviving Sepsis, ICS, FICM, NICE, ERAS), and rehearse the SOE and OSCE under realistic time pressure with peers or seniors. AnaesthesiaCore's intensive care topics are mapped to the FFICM blueprint and end with viva-style questions.",
      },
      {
        question: "What is the difference between FFICM and EDIC?",
        answer:
          "FFICM is the UK Faculty of Intensive Care Medicine exit examination. EDIC (European Diploma in Intensive Care) is run by ESICM and recognised across Europe. Many UK trainees sit both — the syllabuses overlap heavily, but EDIC has a stronger emphasis on European guideline literature and is increasingly taken alongside FFICM.",
      },
    ]}
  />
);

export default FFICMHub;
