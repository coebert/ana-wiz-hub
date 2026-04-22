import { TopicTemplate } from "@/components/TopicTemplate";
import { ExamSection } from "@/components/ExamSection";
import { WorkedExample } from "@/components/WorkedExamples";
import { ophthalmicAnaesthesiaQuestions } from "@/data/quizzes";

const objectives = [
  "Outline the determinants of intra-ocular pressure and the drugs/manoeuvres that raise or lower it",
  "Recognise the oculocardiac reflex and manage it (stop stimulus, atropine, deepen anaesthesia)",
  "Compare sub-Tenon's, peribulbar, retrobulbar and topical techniques for cataract / vitreoretinal surgery",
  "Plan a safe anaesthetic for open-globe injury (RSI, IOP control, smooth induction/extubation)",
  "Identify brainstem anaesthesia after retrobulbar block and manage it as an airway emergency",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Bradycardia during paediatric strabismus surgery",
    scenario:
      "A 4-year-old undergoing strabismus surgery becomes bradycardic (HR 45) during medial rectus traction. What is the diagnosis and immediate management?",
    working:
      "Oculocardiac reflex: stretch on extraocular muscles → trigeminal V₁ afferent → vagal efferent → bradycardia, occasionally asystole. Most pronounced in children and with medial rectus traction.\nImmediate steps: ask surgeon to stop traction; ensure adequate ventilation and depth of anaesthesia; if persistent, give atropine 20 µg/kg IV.\nProphylactic atropine is not routine in adults but may be considered in repeated episodes or in children.",
    answer:
      "Stop the surgical stimulus first. The reflex usually fatigues; if the bradycardia persists or is profound, give atropine 20 µg/kg IV and ensure depth of anaesthesia. Document the event so the surgeon and recovery team are aware on subsequent eyes.",
  },
  {
    title: "Open-globe injury with a full stomach",
    scenario:
      "A 35-year-old presents with a penetrating eye injury 1 h after eating. He needs urgent repair to preserve vision. RSI is required — but suxamethonium raises IOP. How do you proceed?",
    working:
      "Risk of vitreous extrusion if IOP rises during induction.\nOptimal RSI: rocuronium 1.2 mg/kg (rapid onset, no IOP rise); sugammadex available for reversal.\nAlternatives if rocuronium unavailable: pre-treat with non-depolariser then suxamethonium (controversial — IOP rise is small and transient compared with vomiting/coughing risks).\nMaintain smooth anaesthesia: avoid coughing/straining, use lidocaine before extubation, treat PONV aggressively (vomiting markedly raises IOP).",
    answer:
      "RSI with rocuronium 1.2 mg/kg is the preferred technique. If only suxamethonium is available, the literature supports it when aspiration risk is the dominant concern — coughing and vomiting cause much larger IOP rises than suxamethonium itself. Plan a smooth, deep extubation with prophylactic antiemetics.",
  },
];

const OphthalmicAnaesthesiaTopic = () => {
  return (
    <TopicTemplate
      title="Ophthalmic Anaesthesia"
      subtitle="IOP control, regional techniques, oculocardiac reflex and open-globe injury"
      backPath="/clinical"
      backLabel="Clinical"
      accentColor="text-clinical"
      topicId="ophthalmic-anaesthesia"
      topicTitle="Ophthalmic Anaesthesia"
      objectives={objectives}
      workedExamples={workedExamples}
      quizQuestions={ophthalmicAnaesthesiaQuestions}
      sectionExamMapping={{
        objectives: { exams: ["final"], curriculumCodes: ["RCoA Final — Clinical Anaesthesia"] },
        workedExamples: { exams: ["final"] },
        keyPoints: { exams: ["final"] },
      }}
      sectionSources={{
        workedExamples: ["RCoA / RCOphth Joint Guidelines on Local Anaesthesia for Ophthalmic Surgery 2012"],
      }}
      keyPoints={[
        "IOP ↑ by suxamethonium, coughing, prone, N₂O (if SF₆ present); IOP ↓ by propofol, volatiles, mannitol",
        "Oculocardiac reflex: medial rectus traction → V₁ afferent → vagal bradycardia. Treat: stop stimulus + atropine",
        "Sub-Tenon's block: safest needle technique, good akinesia. Peribulbar: outside muscle cone (safer than retrobulbar)",
        "Open globe: avoid suxamethonium if possible. RSI with rocuronium 1.2 mg/kg preferred",
        "Brainstem anaesthesia (retrobulbar complication): contralateral amaurosis, respiratory depression, apnoea, ↓ consciousness",
      ]}
      coreConcepts={
        <>
          <ExamSection id="introduction" exams={["final"]}>
            <p className="text-muted-foreground leading-relaxed">
              Ophthalmic anaesthesia is dominated by two priorities: controlling intra-ocular pressure during open-eye surgery, and
              providing reliable akinesia and analgesia — increasingly through regional rather than general techniques. The
              oculocardiac reflex remains the classic intra-operative event to anticipate, particularly in paediatric strabismus
              surgery.
            </p>
          </ExamSection>

          <ExamSection id="iop" exams={["final"]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Ocular Physiology</h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>IOP</strong>: normal 10–21 mmHg. Aqueous humour produced by ciliary body, drains via canal of Schlemm. IOP ↑ by: coughing, straining, prone, N₂O (if SF₆ in eye), suxamethonium, ketamine</li>
              <li><strong>IOP ↓ by</strong>: mannitol, acetazolamide, timolol, hyperventilation, non-depolarising NMBs, propofol, volatile agents</li>
              <li><strong>Oculocardiac reflex</strong>: traction on extraocular muscles (especially medial rectus) → trigeminal afferent (V₁) → vagal efferent → bradycardia, asystole. Treatment: stop surgical stimulus, atropine 20 µg/kg. More common in children (strabismus surgery)</li>
            </ul>
          </ExamSection>

          <ExamSection id="regional" exams={["final"]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Regional Techniques</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Technique</th>
                    <th className="text-left py-2 text-foreground font-semibold">Needle Position</th>
                    <th className="text-left py-2 text-foreground font-semibold">Advantages</th>
                    <th className="text-left py-2 text-foreground font-semibold">Risks</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Sub-Tenon's</td><td>Under Tenon's capsule (conjunctiva + Tenon's incised inferonasal)</td><td>No sharp needle near globe. Good akinesia + anaesthesia</td><td>Chemosis, subconjunctival haemorrhage. Low risk of serious complications</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Peribulbar</td><td>Outside muscle cone (inferotemporal, often 2 injections)</td><td>Lower risk of brainstem anaesthesia vs retrobulbar</td><td>Globe perforation, retrobulbar haemorrhage, slower onset (10–15 min)</td></tr>
                  <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Retrobulbar</td><td>Inside muscle cone (rarely used now)</td><td>Rapid akinesia + anaesthesia</td><td>Globe perforation, retrobulbar haemorrhage, brainstem anaesthesia, optic-nerve damage</td></tr>
                  <tr><td className="py-2 font-medium text-foreground">Topical + intracameral</td><td>Drops ± intracameral LA</td><td>No injection risks. Patient cooperation required</td><td>No akinesia. Patient may move. Mainly used for cataract surgery</td></tr>
                </tbody>
              </table>
            </div>
          </ExamSection>

          <ExamSection id="open-globe" exams={["final"]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Open Globe Injury</h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li>Avoid ↑ IOP: suxamethonium is <strong>relatively</strong> contraindicated (but may be used if RSI required for life-threatening aspiration risk — benefit vs risk)</li>
              <li>RSI with rocuronium 1.2 mg/kg preferred. Sugammadex available for reversal</li>
              <li>Smooth induction; avoid coughing/straining. Aggressive antiemetics (vomiting markedly ↑ IOP)</li>
              <li>Do <strong>NOT</strong> press on the eye (no eye-pad pressure, careful intubation)</li>
            </ul>
          </ExamSection>

          <ExamSection id="brainstem-anaesthesia" exams={["final"]}>
            <h2 className="text-xl font-bold text-foreground mb-2">Brainstem Anaesthesia</h2>
            <p className="text-muted-foreground leading-relaxed">
              A rare but life-threatening complication of retrobulbar (and occasionally peribulbar) block: local anaesthetic tracks
              along the optic-nerve sheath into the subarachnoid space. Onset is within minutes — contralateral amaurosis, cranial-
              nerve palsies, respiratory depression, apnoea and reduced consciousness. Management is supportive: airway control,
              ventilation, cardiovascular support until block resolves (1–2 h). Always perform ophthalmic regional blocks with full
              monitoring, IV access and resuscitation drugs immediately available.
            </p>
          </ExamSection>
        </>
      }
    />
  );
};

export default OphthalmicAnaesthesiaTopic;
