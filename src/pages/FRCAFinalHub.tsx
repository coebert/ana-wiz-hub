import ExamHub from "@/components/exam/ExamHub";
import FinalFrcaExtras from "@/components/exam/FinalFrcaExtras";

const FRCAFinalHub = () => (
  <ExamHub
    examTag="final"
    examName="FRCA Final"
    path="/frca-final"
    metaTitle="FRCA Final 2026: Curriculum Map & Model Viva Answers"
    metaDescription="Free Final FRCA revision for 2026: a curriculum map, model viva (SOE) answers, SBA and CRQ practice, and notes for every subspecialty and ICU."
    h1="FRCA Final revision"
    intro="A focused hub for the Final FRCA exam. Every published AnaesthesiaCore topic mapped to the Final syllabus — applied physiology and pharmacology, clinical anaesthesia subspecialties, perioperative medicine and intensive care — with structured notes, worked examples and SBA-style questions."
    extras={<FinalFrcaExtras />}
    faqs={[
      {
        question: "What is the Final FRCA exam?",
        answer:
          "The Final FRCA is the second part of the RCoA Fellowship exam, taken in higher anaesthesia training. It comprises a written paper (SBA + CRQ/SAQ) followed by a structured oral examination. The syllabus covers clinical anaesthesia for every subspecialty, perioperative medicine, intensive care, pain medicine, and the applied basic sciences from the Primary.",
      },
      {
        question: "How is the Final FRCA structured?",
        answer:
          "The Final FRCA written paper combines single best answer (SBA) questions with constructed response questions (CRQ). The structured oral examination (SOE) is split into clinical anaesthesia / clinical science / equipment stations and a long-case structured clinical viva. Both components have to be passed within the RCoA's specified time window.",
      },
      {
        question: "When should I take the Final FRCA?",
        answer:
          "Most UK trainees sit the Final FRCA written paper during ST5–ST6 and the SOE within the following twelve months. The exam window must be cleared before completion of higher training. Earlier attempts are common in trainees taking a fellowship year or pursuing FFICM dual accreditation in parallel.",
      },
      {
        question: "How should I revise for the Final FRCA?",
        answer:
          "Final FRCA revision is best structured around real cases. Work through each subspecialty (cardiac, neuro, obstetric, paediatric, regional, ICU) and for each one rehearse a structured anaesthetic plan, the key guidelines, and the likely complications. Pair textbook reading (Oxford Handbook, CEACCP/BJA Education) with timed SBA practice and viva-style discussion in a study group.",
      },
      {
        question: "What is the difference between FRCA Primary and Final?",
        answer:
          "The Primary FRCA tests the basic sciences (physics, physiology, pharmacology, clinical measurement) that underpin anaesthesia. The Final FRCA tests how you apply those sciences to clinical practice across every anaesthetic subspecialty, plus perioperative medicine, intensive care and pain. The two exams sit at different career stages and have different blueprints.",
      },
    ]}
  />
);

export default FRCAFinalHub;
