import { TopicTemplate } from "@/components/TopicTemplate";
import { TopicFaqs } from "@/components/TopicFaqs";
import { CollapsibleSubsection } from "@/components/CollapsibleSubsection";
import { ExamSection } from "@/components/ExamSection";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";
import { WorkedExample } from "@/components/WorkedExamples";
import { foetalCirculationQuestions } from "@/data/quizzes";
import FoetalCirculationDiagram from "@/components/diagrams/FoetalCirculationDiagram";
import { Exam } from "@/data/curriculum";

const foetalCirculationFaqs: Array<[string, string]> = [
  [
    "Describe the three fetal shunts and what they become postnatally.",
    "Ductus venosus — bypasses liver from umbilical vein to IVC; becomes ligamentum venosum. Foramen ovale — bypasses pulmonary circulation, RA → LA; becomes fossa ovalis (patent in 25 % of adults). Ductus arteriosus — bypasses lungs, pulmonary artery → aorta; becomes ligamentum arteriosum. All three shunt blood away from the non-functioning fetal lungs toward systemic circulation."
  ],
  [
    "What triggers closure of the ductus arteriosus and how is it managed if it fails?",
    "At birth: ↑PaO₂, ↓pulmonary vascular resistance, ↓circulating prostaglandins (placenta removed). Functional closure within 24 h, anatomical closure by 3 weeks. Persistent PDA in preterm infants is treated with indomethacin or ibuprofen (COX inhibitors reducing PGE₂). In duct-dependent congenital heart disease, prostaglandin E₁ infusion (alprostadil) is used to keep the duct OPEN until surgical repair."
  ],
  [
    "Why is fetal haemoglobin (HbF) advantageous?",
    "Two α + two γ chains (vs α₂β₂ in HbA). γ binds 2,3-DPG poorly → left-shifted curve with P50 ~2.5 kPa (vs 3.5 kPa in adult). Higher O₂ affinity allows the fetus to extract O₂ from maternal blood across the placenta (where umbilical venous PO₂ is only 4 kPa). HbF declines from 80 % at birth to <2 % by 6 months."
  ]
];

const objectives = [
  "Identify the three foetal shunts and the role of each in directing oxygenated blood.",
  "Describe foetal oxygen carriage (HbF, double Bohr effect) and explain why a low umbilical PaO₂ is adequate.",
  "Outline the transitional circulatory changes at birth and the stimuli that drive them.",
  "Recognise persistent pulmonary hypertension of the newborn (PPHN) and outline management.",
  "Apply pharmacological manipulation of the ductus arteriosus to duct-dependent congenital heart disease.",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Duct-dependent congenital lesion",
    scenario: (
      <>
        A neonate becomes profoundly cyanosed with metabolic acidosis at 36 hours of age. Echo shows transposition of the
        great arteries (TGA) with restrictive PFO. Why does timing matter and what is the immediate management?
      </>
    ),
    working: (
      <>
        In TGA the systemic and pulmonary circulations are in <strong>parallel</strong> rather than series. Oxygenated
        pulmonary venous blood returns to the LA → LV → pulmonary artery (back to lungs); deoxygenated systemic venous
        blood returns to RA → RV → aorta (back to body). Survival depends on mixing — through PFO/ASD, VSD or PDA. As the
        ductus arteriosus closes (10–15 h post-partum, accelerated by ↑ PaO₂), mixing falls and cyanosis worsens.
        <p className="mt-2">Immediate management:</p>
        <ul className="list-disc list-inside mt-1 space-y-1">
          <li><strong>Prostaglandin E₁ (alprostadil) infusion</strong> 5–50 ng/kg/min to re-open the duct.</li>
          <li>Anticipate apnoea, hypotension and pyrexia from PGE₁ — have airway and inotropes ready.</li>
          <li>Avoid high FiO₂ if not hypoxic — O₂ promotes ductal closure.</li>
          <li>Refer urgently for balloon atrial septostomy (Rashkind) and arterial switch.</li>
        </ul>
      </>
    ),
    answer: (
      <>
        Start PGE₁ to reopen the ductus, prepare to ventilate (apnoea is a recognised side-effect), correct acidosis,
        avoid unnecessary hyperoxia, and transfer to a specialist paediatric cardiac centre.
      </>
    ),
    cites: ["Power & Kam Ch.18"],
  },
  {
    title: "Pre- vs post-ductal SpO₂ difference",
    scenario: (
      <>
        A term neonate with meconium aspiration has SpO₂ 96% on the right hand and 84% on the right foot despite FiO₂
        1.0. Interpret and outline next steps.
      </>
    ),
    working: (
      <>
        Right hand sampling is <strong>pre-ductal</strong> (right subclavian arises from the brachiocephalic trunk
        proximal to the ductus). Foot sampling is <strong>post-ductal</strong>. A gradient &gt;5% suggests right-to-left
        shunting through a still-patent ductus arteriosus, driven by elevated PVR — i.e. <strong>PPHN</strong>.
        <p className="mt-2">Reverse pulmonary vasoconstriction:</p>
        <ul className="list-disc list-inside mt-1 space-y-1">
          <li>Optimise ventilation (avoid acidosis, hypoxia, hypercarbia, hypothermia, hypoglycaemia — the "five H's").</li>
          <li>Inhaled nitric oxide 20 ppm (selective pulmonary vasodilator).</li>
          <li>Surfactant if meconium-related; consider ECMO if refractory (OI &gt;25–40 sustained).</li>
          <li>Avoid vasodilators that drop SVR — they worsen R→L shunt.</li>
        </ul>
      </>
    ),
    answer: (
      <>
        Diagnose PPHN. Treat the underlying lung disease, optimise oxygenation/ventilation, start iNO, and escalate to
        ECMO if oxygenation index does not improve.
      </>
    ),
    cites: ["BJA Educ 2015"],
  },
];

const FoetalCirculationTopic = () => {
  return (
    <TopicTemplate
      title="Foetal Circulation"
      subtitle="FRCA Primary & Final — Physiology"
      backPath="/physiology"
      backLabel="Physiology"
      accentColor="text-physiology"
      topicId="foetal-circulation"
      topicTitle="Foetal Circulation"
      quizQuestions={foetalCirculationQuestions}
      objectives={objectives}
      workedExamples={workedExamples}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL], curriculumCodes: ["PA_BK_01"] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM], curriculumCodes: ["PA_BK_02"] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL] },
      }}
      sectionSources={{
        objectives: ["Power & Kam Ch.18"],
        workedExamples: ["BJA Educ 2015", "Power & Kam Ch.18"],
        keyPoints: ["Power & Kam Ch.18", "Ganong Ch.33", "BJA Educ 2015"],
      }}
      keyPoints={[
        { text: "Three foetal shunts: ductus venosus, foramen ovale, ductus arteriosus — all bypass the lungs.", cites: ["Ganong Ch.33"] },
        { text: "HbF has higher O₂ affinity (P₅₀ 2.7 kPa) — left-shifted ODC aids placental O₂ uptake.", cites: ["Power & Kam Ch.18"] },
        { text: "Double Bohr effect: maternal curve shifts right while foetal curve shifts left simultaneously, enhancing transfer.", cites: ["BJA Educ 2015"] },
        { text: "First breath ↓ PVR dramatically; cord clamping ↑ SVR → parallel becomes series circulation.", cites: ["Ganong Ch.33"] },
        { text: "Ductus arteriosus closes with ↑ PaO₂ and ↓ PGE₂; PGE₁ keeps it open in duct-dependent lesions.", cites: ["Power & Kam Ch.18"] },
        { text: "Pre- minus post-ductal SpO₂ gradient >5% suggests persistent right-to-left ductal shunting (PPHN).", cites: ["BJA Educ 2015"] },
      ]}
      coreConcepts={
        <>
          <ExamSection id="overview" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["PA_BK_01"]}>
            <CollapsibleSubsection title="Overview" defaultOpen>
            <p className="text-muted-foreground leading-relaxed">
              The foetal circulation is uniquely designed to bypass the non-functioning lungs, directing oxygenated
              blood from the placenta to the systemic circulation via three key shunts. Understanding these pathways and
              their closure at birth is essential for managing neonatal physiology and congenital heart disease.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="shunts" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["PA_BK_01"]}>
            <CollapsibleSubsection title="The Three Foetal Shunts">
            <div className="space-y-3">
              {[
                {
                  name: "Ductus Venosus",
                  desc: "Connects the umbilical vein to the IVC, bypassing the hepatic sinusoids. Carries ~50% of well-oxygenated umbilical venous blood directly to the heart. Closes functionally within minutes of birth (ligamentum venosum).",
                },
                {
                  name: "Foramen Ovale",
                  desc: "Flap valve between right and left atria. Allows oxygenated IVC blood to pass directly to the LA, bypassing the pulmonary circulation. Stays open due to higher RA pressure. Functionally closes when LA pressure exceeds RA pressure after first breath. Anatomically closes by 3–12 months (probe-patent in ~25% of adults — PFO).",
                },
                {
                  name: "Ductus Arteriosus",
                  desc: "Connects the pulmonary artery to the descending aorta. Diverts ~90% of RV output away from the high-resistance pulmonary vasculature into the systemic circulation. Kept open by prostaglandins (PGE₂) and low PaO₂. Closes functionally within 10–15 hours of birth (↑ PaO₂ + ↓ PGE₂). Anatomically closes by 2–3 weeks (ligamentum arteriosum).",
                },
              ].map((shunt) => (
                <div key={shunt.name} className="p-4 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">{shunt.name}</p>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{shunt.desc}</p>
                </div>
              ))}
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="flow-pathway" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["PA_BK_01"]}>
            <CollapsibleSubsection title="Foetal Blood Flow Pathway">
            <div className="bg-card rounded-xl border border-border p-4 md:p-6 mb-4">
              <FoetalCirculationDiagram />
            </div>
            <div className="p-4 rounded-lg border border-border bg-secondary/20">
              <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside leading-relaxed">
                <li>Oxygenated blood from the <strong>placenta</strong> travels via the <strong>umbilical vein</strong> (SpO₂ ~80%).</li>
                <li>~50% passes through the <strong>ductus venosus</strong> to the IVC; ~50% perfuses the liver.</li>
                <li>IVC blood (mixed, SpO₂ ~67%) enters the <strong>right atrium</strong>.</li>
                <li>Oxygenated stream preferentially crosses the <strong>foramen ovale</strong> to the <strong>left atrium</strong> → LV → ascending aorta → brain and coronaries (SpO₂ ~65%).</li>
                <li>Deoxygenated SVC blood enters the RA → RV → pulmonary artery.</li>
                <li>~90% of PA blood shunts through the <strong>ductus arteriosus</strong> → descending aorta → placenta via umbilical arteries.</li>
                <li>Only ~10% of RV output passes through the lungs (high PVR).</li>
              </ol>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="oxygen-delivery" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["PA_BK_01"]}>
            <CollapsibleSubsection title="Foetal Oxygen Delivery">
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: "Umbilical Vein PaO₂", value: "~4.0 kPa (30 mmHg) — much lower than adult arterial." },
                { label: "Foetal Haemoglobin (HbF)", value: "Left-shifted ODC (P₅₀ ~2.7 kPa vs 3.5 kPa adult) → higher O₂ affinity." },
                { label: "Foetal Hb Concentration", value: "~180 g/L — compensates for lower PaO₂." },
                { label: "Cardiac Output", value: "~450 mL/kg/min (combined ventricular) — much higher than adult per kg." },
                { label: "2,3-DPG Effect", value: "HbF binds 2,3-DPG poorly → maintains left-shifted curve." },
                { label: "Double Bohr Effect", value: "CO₂ transfer to maternal blood shifts maternal ODC right and foetal ODC left simultaneously." },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-semibold text-foreground text-sm">{item.value}</p>
                </div>
              ))}
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="transitional" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["PA_BK_02"]}>
            <CollapsibleSubsection title="Transitional Circulation at Birth">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>First breath</strong>: alveolar expansion → dramatic ↓ PVR (8–10×) → ↑ pulmonary blood flow.</li>
              <li><strong>Cord clamping</strong>: removes low-resistance placental circuit → ↑ SVR.</li>
              <li><strong>LA pressure rises</strong> above RA pressure → <strong>foramen ovale closes</strong> (functional).</li>
              <li><strong>↑ PaO₂ + ↓ PGE₂</strong> → smooth-muscle constriction → <strong>ductus arteriosus closes</strong> (10–15 h).</li>
              <li><strong>Ductus venosus</strong> closes as umbilical venous flow ceases.</li>
              <li>Transition from <strong>parallel</strong> circulation (two ventricles in parallel) to <strong>series</strong> circulation (adult pattern).</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="pphn" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["PA_BK_02"]}>
            <CollapsibleSubsection title="Persistent Pulmonary Hypertension of the Newborn (PPHN)">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Failure of the normal transitional changes leads to persistent pulmonary hypertension of the newborn:
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
              <li>Persistent high PVR → right-to-left shunting through PDA and/or PFO.</li>
              <li>Causes: meconium aspiration, sepsis, congenital diaphragmatic hernia, lung hypoplasia.</li>
              <li>Pre- vs post-ductal SpO₂ difference &gt;5% suggests PDA shunting.</li>
              <li>Management: optimise oxygenation and ventilation, inhaled nitric oxide (iNO 20 ppm), correct acidosis, consider ECMO.</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="pharmacology" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["PA_BK_02"]}>
            <CollapsibleSubsection title="Pharmacological Manipulation of the Ductus">
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { label: "Keep PDA Open", value: "PGE₁ (alprostadil) infusion — duct-dependent congenital heart disease (e.g. TGA, critical coarctation, pulmonary atresia)." },
                { label: "Close PDA", value: "Indomethacin or ibuprofen (COX inhibitors) — premature infant with symptomatic PDA. Surgical/percutaneous ligation if medical therapy fails." },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-semibold text-foreground text-sm">{item.value}</p>
                </div>
              ))}
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamPitfallsCallout
            pitfalls={[
              <><strong>Duct-dependent lesions</strong>: keep PDA open with prostaglandin E₁ until surgical correction. Avoid high FiO₂ which closes the duct.</>,
              <><strong>PPHN</strong>: precipitated by hypoxia, acidosis, hypothermia, sepsis. Treat with oxygen, alkalinisation, inhaled NO ± sildenafil.</>,
              <><strong>Maternal hyperoxia</strong> in late pregnancy can constrict the foetal ductus — relevant during emergency obstetric anaesthesia.</>,
              <><strong>Neonatal R→L shunt</strong> through PFO/PDA may reverse with crying, hypoxia or rising PVR — explains transient cyanotic episodes.</>,
              <><strong>HbF</strong> sits left of adult Hb — facilitates placental O₂ uptake but means neonates desaturate quickly when offloading is impaired.</>,
            ]}
          />
          <TopicFaqs faqs={foetalCirculationFaqs} />

        </>
      }
    />
  );
};

export default FoetalCirculationTopic;
