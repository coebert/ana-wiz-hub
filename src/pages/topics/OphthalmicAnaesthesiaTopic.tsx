import { TopicTemplate } from "@/components/TopicTemplate";
import { CollapsibleSubsection } from "@/components/CollapsibleSubsection";
import { ExamSection } from "@/components/ExamSection";
import { DiagramSection } from "@/components/DiagramSection";
import { WorkedExample } from "@/components/WorkedExamples";
import { ophthalmicAnaesthesiaQuestions } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import {
  SubTenonsBlockIllustration,
  PeribulbarBlockIllustration,
  RetrobulbarBlockIllustration,
  TopicalIntracameralIllustration,
} from "@/components/diagrams/EyeBlockIllustrations";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";

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
    cites: ["Allman & Wilson Ch.29"],
  },
  {
    title: "Open-globe injury with a full stomach",
    scenario:
      "A 35-year-old presents with a penetrating eye injury 1 h after eating. He needs urgent repair to preserve vision. RSI is required — but suxamethonium raises IOP. How do you proceed?",
    working:
      "Risk of vitreous extrusion if IOP rises during induction.\nOptimal RSI: rocuronium 1.2 mg/kg (rapid onset, no IOP rise); sugammadex available for reversal.\nAlternatives if rocuronium unavailable: pre-treat with non-depolariser then suxamethonium (controversial — IOP rise is small and transient compared with vomiting/coughing risks).\nMaintain smooth anaesthesia: avoid coughing/straining, use lidocaine before extubation, treat PONV aggressively (vomiting markedly raises IOP).",
    answer:
      "RSI with rocuronium 1.2 mg/kg is the preferred technique. If only suxamethonium is available, the literature supports it when aspiration risk is the dominant concern — coughing and vomiting cause much larger IOP rises than suxamethonium itself. Plan a smooth, deep extubation with prophylactic antiemetics.",
    cites: ["RCOphth/RCoA 2012"],
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
        objectives: { exams: [Exam.FINAL], curriculumCodes: ["RCoA Final — Clinical Anaesthesia"] },
        workedExamples: { exams: [Exam.FINAL] },
        keyPoints: { exams: [Exam.FINAL] },
      }}
      sectionSources={{
        workedExamples: ["RCOphth/RCoA 2012"],
        keyPoints: ["BJA Educ 2018", "Allman & Wilson Ch.29", "RCOphth/RCoA 2012"],
      }}
      keyPoints={[
        { text: "IOP ↑ by suxamethonium, coughing, prone, N₂O (if SF₆ present); IOP ↓ by propofol, volatiles, mannitol", cites: ["BJA Educ 2018"] },
        { text: "Oculocardiac reflex: medial rectus traction → V₁ afferent → vagal bradycardia. Treat: stop stimulus + atropine", cites: ["Allman & Wilson Ch.29"] },
        { text: "Sub-Tenon's block: safest needle technique, good akinesia. Peribulbar: outside muscle cone (safer than retrobulbar)", cites: ["RCOphth/RCoA 2012"] },
        { text: "Open globe: avoid suxamethonium if possible. RSI with rocuronium 1.2 mg/kg preferred", cites: ["BJA Educ 2018"] },
        { text: "Brainstem anaesthesia (retrobulbar complication): contralateral amaurosis, respiratory depression, apnoea, ↓ consciousness", cites: ["Allman & Wilson Ch.29"] },
      ]}
      coreConcepts={
        <>
          <ExamSection id="introduction" exams={[Exam.FINAL]}>
            <p className="text-muted-foreground leading-relaxed">
              Ophthalmic anaesthesia is dominated by two priorities: controlling intra-ocular pressure during open-eye surgery, and
              providing reliable akinesia and analgesia — increasingly through regional rather than general techniques. The
              oculocardiac reflex remains the classic intra-operative event to anticipate, particularly in paediatric strabismus
              surgery.
            </p>
          </ExamSection>

          <ExamSection id="iop" exams={[Exam.FINAL]}>
            <CollapsibleSubsection title="Ocular Physiology" defaultOpen>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>IOP</strong>: normal 10–21 mmHg. Aqueous humour produced by ciliary body, drains via canal of Schlemm. IOP ↑ by: coughing, straining, prone, N₂O (if SF₆ in eye), suxamethonium, ketamine</li>
              <li><strong>IOP ↓ by</strong>: mannitol, acetazolamide, timolol, hyperventilation, non-depolarising NMBs, propofol, volatile agents</li>
              <li><strong>Oculocardiac reflex</strong>: traction on extraocular muscles (especially medial rectus) → trigeminal afferent (V₁) → vagal efferent → bradycardia, asystole. Treatment: stop surgical stimulus, atropine 20 µg/kg. More common in children (strabismus surgery)</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="regional" exams={[Exam.FINAL]}>
            <CollapsibleSubsection title="Regional Techniques">
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
            </CollapsibleSubsection>
          </ExamSection>

          <DiagramSection
            id="block-illustrations"
            title="Eye Block Procedures — Illustrated"
            intro={
              <p>
                Procedural plates for the four ophthalmic regional techniques. Note the relationship of the needle / cannula tip
                to the muscle cone — the single most important determinant of safety and efficacy.
              </p>
            }
          >
            <SubTenonsBlockIllustration />
            <PeribulbarBlockIllustration />
            <RetrobulbarBlockIllustration />
            <TopicalIntracameralIllustration />
          </DiagramSection>

          <ExamSection id="open-globe" exams={[Exam.FINAL]}>
            <CollapsibleSubsection title="Open Globe Injury">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li>Avoid ↑ IOP: suxamethonium is <strong>relatively</strong> contraindicated (but may be used if RSI required for life-threatening aspiration risk — benefit vs risk)</li>
              <li>RSI with rocuronium 1.2 mg/kg preferred. Sugammadex available for reversal</li>
              <li>Smooth induction; avoid coughing/straining. Aggressive antiemetics (vomiting markedly ↑ IOP)</li>
              <li>Do <strong>NOT</strong> press on the eye (no eye-pad pressure, careful intubation)</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="strabismus" exams={[Exam.FINAL]}>
            <CollapsibleSubsection title="Anaesthesia for Strabismus Surgery">
            <p className="text-muted-foreground leading-relaxed mb-3">
              Strabismus (squint) correction is the commonest paediatric ophthalmic procedure. It is short (20–60 min), extra-ocular,
              day-case in most children, and shared-airway with the surgeon working at the head. Three features dominate the
              anaesthetic plan: a secured but unobtrusive airway, a high incidence of the oculocardiac reflex (OCR), and one of the
              highest baseline rates of post-operative nausea and vomiting (PONV) of any paediatric operation (up to 60–80% without
              prophylaxis).
            </p>
            <p className="font-semibold text-foreground text-sm mb-1">Anaesthetic conduct</p>
            <ul className="space-y-1.5 text-sm text-muted-foreground list-disc list-inside leading-relaxed mb-3">
              <li><strong className="text-foreground">Airway</strong>: LMA is standard for most children; reinforced/flexible LMA preferred so the surgeon can drape and rotate the head without kinking. Tracheal tube reserved for very young infants, syndromic children with difficult airways, or prone/long cases</li>
              <li><strong className="text-foreground">Maintenance</strong>: TIVA with propofol ± remifentanil ("Remi 5") is increasingly favoured — markedly lower PONV than volatile, smooth emergence, ideal for shared-airway work. Sevoflurane maintenance is acceptable but mandates aggressive antiemetic prophylaxis</li>
              <li><strong className="text-foreground">Analgesia</strong>: paracetamol + NSAID (ibuprofen/diclofenac) usually sufficient. Avoid long-acting opioids (worsen PONV); short-acting fentanyl 1 µg/kg or remifentanil infusion preferred. Topical local anaesthetic drops (proxymetacaine/tetracaine) and sub-Tenon's block by the surgeon reduce opioid requirement and OCR</li>
              <li><strong className="text-foreground">PONV prophylaxis</strong>: dual therapy is the standard of care — ondansetron 0.15 mg/kg + dexamethasone 0.15 mg/kg. Add a third agent (cyclizine, droperidol) for high-risk children or repeat surgery</li>
              <li><strong className="text-foreground">Emergence</strong>: smooth extubation/LMA removal in lateral position; avoid coughing</li>
            </ul>
            <p className="font-semibold text-foreground text-sm mb-1">Complications & things to watch out for</p>
            <ul className="space-y-1.5 text-sm text-muted-foreground list-disc list-inside leading-relaxed mb-3">
              <li><strong className="text-foreground">Oculocardiac reflex</strong> — incidence 30–90% in strabismus surgery, highest with medial rectus traction. Trigeminovagal arc (V₁ afferent → vagal efferent) → bradycardia, junctional rhythm, occasionally asystole. <em>Management:</em> ask surgeon to release traction immediately; ensure adequate ventilation and depth; if persistent or profound, atropine 20 µg/kg IV (or glycopyrrolate 10 µg/kg). The reflex usually fatigues with repeat traction. Routine prophylactic anticholinergic is not recommended (risk of tachyarrhythmia, masks subsequent events) but may be considered in infants or after repeated severe episodes</li>
              <li><strong className="text-foreground">PONV</strong> — without prophylaxis, vomiting rates approach those of middle-ear surgery. Always give dual antiemetics; consider TIVA; avoid N₂O and long-acting opioids; ensure good hydration</li>
              <li><strong className="text-foreground">Malignant hyperthermia association</strong> — strabismus (especially in children with congenital myopathies, ptosis or other ocular muscle anomalies) has a historical association with MH susceptibility. Take a careful family/personal history; have a low threshold for trigger-free TIVA technique</li>
              <li><strong className="text-foreground">Masseter spasm / suxamethonium</strong> — suxamethonium is best avoided in strabismus surgery: it raises IOP, causes extraocular muscle contracture that can confuse the surgical "forced duction" test for ≥20 min, and carries the historical MH-trigger concern</li>
              <li><strong className="text-foreground">Oculo-respiratory and oculo-emetic reflexes</strong> — same trigeminal afferent pathway can produce shallow breathing/apnoea or intra-operative retching; respond as for OCR (release traction)</li>
              <li><strong className="text-foreground">Globe perforation</strong> — rare but reported with sub-Tenon's or peribulbar block, especially in myopic eyes (long axial length) or in re-do strabismus where scarring distorts anatomy. Surgeon-performed sub-Tenon's under direct vision is safest</li>
              <li><strong className="text-foreground">Postoperative diplopia and disorientation</strong> — common after eye-muscle realignment; warn parents and nurse the child in a calm, dimly lit recovery bay</li>
              <li><strong className="text-foreground">Co-existing conditions</strong> — strabismus is over-represented in cerebral palsy, craniofacial syndromes (Crouzon, Apert), trisomy 21 and prematurity (ROP). Tailor airway plan, drug doses and post-operative apnoea monitoring (ex-prems &lt; 60 weeks PCA) accordingly</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="brainstem-anaesthesia" exams={[Exam.FINAL]}>
            <CollapsibleSubsection title="Brainstem Anaesthesia">
            <p className="text-muted-foreground leading-relaxed">
              A rare but life-threatening complication of retrobulbar (and occasionally peribulbar) block: local anaesthetic tracks
              along the optic-nerve sheath into the subarachnoid space. Onset is within minutes — contralateral amaurosis, cranial-
              nerve palsies, respiratory depression, apnoea and reduced consciousness. Management is supportive: airway control,
              ventilation, cardiovascular support until block resolves (1–2 h). Always perform ophthalmic regional blocks with full
              monitoring, IV access and resuscitation drugs immediately available.
            </p>
            </CollapsibleSubsection>
          </ExamSection>
          <ExamPitfallsCallout
            accent="clinical"
            pitfalls={[
              "IOP is raised by coughing, suxamethonium, hypoventilation, hypoxia, light anaesthesia and external pressure (mask).",
              "Oculocardiac reflex: traction on extraocular muscles → bradycardia/asystole — stop traction, atropine if persistent.",
              "Peribulbar > retrobulbar (lower risk of globe perforation, optic-nerve injury, brainstem anaesthesia); sub-Tenon's is safest.",
              "SF₆ or C₃F₈ intraocular gas: avoid N₂O until 1–3 months after vitrectomy (expansion can cause retinal infarction).",
              "Open-globe injury: 'full stomach' RSI without sux is preferred — use rocuronium + sugammadex if reversal needed.",
            ]}
          />
        </>
      }
    />
  );
};

export default OphthalmicAnaesthesiaTopic;
