import { Helmet } from "react-helmet-async";
import { InlineRef } from "@/components/references/InlineRef";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { TopicTableOfContents } from "@/components/layout/TopicTableOfContents";
import { DiagramSection } from "@/components/topic/DiagramSection";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { ophthalmicAnaesthesiaQuestions } from "@/data/quizzes";
import { Exam } from "@/data/curriculum";
import {
  SubTenonsBlockIllustration,
  PeribulbarBlockIllustration,
  RetrobulbarBlockIllustration,
  TopicalIntracameralIllustration,
} from "@/components/diagrams/clinical/EyeBlockIllustrations";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const tocItems = [
  { id: "physiology", label: "Ocular physiology & IOP", group: "Foundations" },
  { id: "regional", label: "Regional techniques", group: "Techniques" },
  { id: "conduct", label: "Anaesthetic conduct & fasting", group: "Techniques" },
  { id: "open-globe", label: "Open-globe injury", group: "Emergency" },
  { id: "strabismus", label: "Strabismus surgery", group: "Paediatric" },
  { id: "brainstem", label: "Brainstem anaesthesia", group: "Complications" },
  { id: "faq", label: "FAQ", group: "Reference" },
];

const eyeFaqs: Array<[string, string]> = [
  [
    "What is the oculocardiac reflex and how is it managed?",
    "The oculocardiac reflex is a trigeminovagal reflex produced by traction on extraocular muscles (especially the medial rectus) or pressure on the globe. The afferent pathway is the ophthalmic division of the trigeminal nerve (V₁), and the efferent is the vagus nerve, producing bradycardia, junctional rhythm, or occasionally asystole. It is most common in children undergoing strabismus surgery (incidence 30–90%) and with medial rectus traction. Management: ask the surgeon to release traction immediately — this is the first and most important step. Ensure adequate ventilation and depth of anaesthesia. If bradycardia persists or is profound, give atropine 20 µg/kg IV (or glycopyrrolate 10 µg/kg). The reflex usually fatigues with repeated traction. Routine prophylactic anticholinergics are not recommended because they can mask subsequent events and precipitate tachyarrhythmias.",
  ],
  [
    "How does intra-ocular pressure change during anaesthesia?",
    "Intra-ocular pressure (normal 10–21 mmHg) is increased by suxamethonium (transient, 5–10 mmHg rise), coughing, straining, vomiting, prone positioning, hypoxia, hypercapnia, light anaesthesia, and external pressure on the eye (tight mask, improper laryngoscope technique). N₂O raises IOP if sulphur hexafluoride (SF₆) or perfluoropropane (C₃F₈) gas has been injected into the vitreous cavity during retinal surgery, because N₂O enters the gas bubble faster than nitrogen leaves, causing expansion. IOP is lowered by propofol, volatile agents, non-depolarising neuromuscular blockers, mannitol, acetazolamide, timolol, hyperventilation, and a smooth induction/emergence without coughing. In open-globe surgery, even small transient rises can cause vitreous extrusion, so every aspect of anaesthesia must be optimised to avoid IOP spikes.",
  ],
  [
    "What are the different regional techniques for ophthalmic surgery?",
    "Four main regional techniques are used. (1) Sub-Tenon's block: a blunt cannula is inserted through an inferonasal conjunctival incision into the sub-Tenon's space. It is the safest technique with the lowest risk of globe perforation or brainstem spread, provides good akinesia and anaesthesia, and is suitable for most intraocular surgery. (2) Peribulbar block: local anaesthetic is injected outside the muscle cone (inferotemporal, sometimes medial as well). It has a lower risk of brainstem anaesthesia and optic nerve damage than retrobulbar, but onset is slower (10–15 min) and akinesia may be less complete. (3) Retrobulbar block: local anaesthetic is injected inside the muscle cone. It produces rapid, dense akinesia but carries the highest risk of globe perforation, retrobulbar haemorrhage, optic nerve injury, and brainstem anaesthesia. It is now rarely used. (4) Topical ± intracameral: anaesthetic drops with or without injection into the anterior chamber by the surgeon. No akinesia, so patient cooperation is essential. Mainly used for cataract surgery in cooperative adults.",
  ],
  [
    "Why is suxamethonium relatively contraindicated in open-globe injury?",
    "Suxamethonium causes a transient rise in intra-ocular pressure of 5–10 mmHg due to extraocular muscle fasciculation and increased aqueous humour outflow resistance. In an open-globe injury, any rise in IOP can cause expulsion of vitreous humour and permanent visual loss. However, suxamethonium is not absolutely contraindicated — if the patient has a full stomach and aspiration risk is the dominant concern, the literature supports its use because coughing and vomiting (which occur with a failed or difficult intubation) cause far larger IOP rises than suxamethonium. The preferred technique for open-globe injury with a full stomach is rapid sequence induction with rocuronium 1.2 mg/kg, which provides rapid onset without raising IOP, and sugammadex is available for reversal if needed. A smooth induction, maintenance, and emergence are equally important.",
  ],
  [
    "What is brainstem anaesthesia and how is it managed?",
    "Brainstem anaesthesia is a rare but life-threatening complication of retrobulbar or peribulbar block in which local anaesthetic tracks along the optic nerve sheath into the subarachnoid space, reaching the brainstem. Onset is within minutes and may include contralateral amaurosis, ptosis, cranial nerve palsies (III, IV, VI), dysarthria, confusion, respiratory depression, apnoea, hypotension, and seizures. Management is supportive: establish airway control and ventilation immediately, provide cardiovascular support with fluids and vasopressors, and monitor in a high-dependency area until the block resolves (typically 1–2 hours). All ophthalmic regional blocks should be performed with full monitoring, intravenous access, resuscitation drugs, and an anaesthetist immediately available. This complication is the main reason retrobulbar blocks have largely been replaced by sub-Tenon's and peribulbar techniques.",
  ],
  [
    "Why must N₂O be avoided after intraocular gas injection?",
    "Nitrous oxide diffuses into closed gas spaces 34 times faster than nitrogen leaves. Sulphur hexafluoride (SF₆) and perfluoropropane (C₃F₈) are long-acting gases injected into the vitreous cavity during retinal detachment surgery to provide internal tamponade. If N₂O is administered, it rapidly diffuses into the gas bubble, causing expansion and a catastrophic rise in intra-ocular pressure that can compromise retinal blood flow and cause infarction. N₂O must be avoided for the entire duration that the gas remains in the eye — typically 1–3 months for SF₆ and up to 3 months for C₃F₈. Patients with intraocular gas should carry a warning bracelet, and anaesthetists must specifically ask about recent vitrectomy before any anaesthetic.",
  ],
  [
    "What is the best anaesthetic technique for paediatric strabismus surgery?",
    "Paediatric strabismus surgery requires a secured but unobtrusive airway, anticipation of the oculocardiac reflex, and aggressive PONV prophylaxis. A laryngeal mask airway (LMA) is standard for most children; a reinforced/flexible LMA allows the surgeon to drape and rotate the head without kinking. Maintenance with TIVA (propofol ± remifentanil) is increasingly favoured because it produces markedly lower PONV rates than volatile-based anaesthesia, smoother emergence, and ideal conditions for shared-airway work. Analgesia is provided with paracetamol, NSAIDs, and topical local anaesthetic drops or sub-Tenon's block by the surgeon — avoid long-acting opioids which worsen PONV. Dual antiemetic prophylaxis (ondansetron + dexamethasone) is mandatory because baseline PONV rates approach 60–80% without prophylaxis. Suxamethonium should be avoided because it raises IOP, causes extraocular muscle contracture that confuses surgical testing, and carries a historical association with malignant hyperthermia in this population.",
  ],
  [
    "How do IOP-lowering drugs used in ophthalmic surgery interact with anaesthesia?",
    "Systemic absorption of topical ophthalmic drops can produce significant physiological effects — the conjunctival and nasal mucosa absorb drug directly into the systemic circulation with no first-pass metabolism. Timolol (a non-selective beta-blocker) can cause bradycardia, bronchospasm, and heart block — caution in asthmatics and patients on beta-blockers; it also potentiates the bradycardia produced by propofol, opioids, suxamethonium and the oculocardiac reflex, and can mask the adrenergic warning signs of hypoglycaemia in diabetic patients. Acetazolamide (carbonic anhydrase inhibitor) causes a hyperchloraemic metabolic acidosis, hypokalaemia, hyponatraemia and diuresis — check electrolytes if the patient has been on it long-term; hypokalaemia potentiates non-depolarising neuromuscular blockade and prolongs recovery, and the acidosis may be misread as a respiratory problem. Cyclopentolate and tropicamide are anticholinergic mydriatics that can cause tachycardia, dry mouth, flushing and, particularly in the very young and the elderly, a central anticholinergic syndrome with confusion, agitation and hallucinations. Pilocarpine is a direct parasympathomimetic miotic and can produce bradycardia, salivation, sweating, bronchospasm and abdominal cramps. Ecothiopate iodide, an irreversible cholinesterase inhibitor still occasionally used for glaucoma, reduces plasma cholinesterase activity and markedly prolongs the action of suxamethonium, mivacurium and ester local anaesthetics — avoid suxamethonium or anticipate prolonged block. Brimonidine (alpha-2 agonist) can cause hypotension and sedation. Apraclonidine has similar alpha-agonist effects. Topical phenylephrine 10% can produce severe hypertension with reflex bradycardia, arrhythmias, myocardial ischaemia and even pulmonary oedema, particularly in elderly patients and those with cardiovascular disease — the 2.5% preparation gives adequate mydriasis and is safer and preferred, and drops should be counted rather than instilled freely. Cocaine 5–10% (used in nasal surgery) inhibits noradrenaline reuptake and produces sympathomimetic effects — avoid in combination with other vasopressors and halothane. Always ask what eye drops the patient has received preoperatively.",
  ],
  [
    "What are the specific airway considerations for ophthalmic surgery?",
    "Ophthalmic surgery creates several unique airway challenges. The surgeon works at the head, so the airway must be secured but unobtrusive — south-facing oral RAE tubes, reinforced LMAs, and nasal intubation are commonly used. Prone positioning for posterior segment surgery requires meticulous airway security and pressure-area protection. A throat pack prevents blood and debris entering the larynx and stomach but must be documented and removed — a retained pack is a never event. In paediatric strabismus, a reinforced LMA is standard because it allows head turning without dislodgement. For laser or microlaryngoscopy work, small-bore tubes or tubeless techniques (jet ventilation, THRIVE) are used. Shared-airway discipline is essential: the anaesthetist and surgeon must agree on tube type, ventilation mode, and an emergency plan for accidental extubation before starting.",
  ],
  [
    "What are the anaesthetic considerations for vitreoretinal surgery?",
    "Vitreoretinal surgery involves the posterior segment and often requires controlled hypotension to reduce bleeding, particularly during scleral buckling or membrane peeling. The patient may be prone, requiring careful airway security and pressure-point protection. Intraocular gas (SF₆ or C₃F₈) may be injected — N₂O is absolutely contraindicated for 1–3 months postoperatively because it expands the gas bubble and raises IOP catastrophically. General anaesthesia is usually required because the surgery is long and delicate, though some macular procedures can be performed under sub-Tenon's block. Postoperative positioning (often face-down for several days) is critical for gas tamponade efficacy but does not affect the immediate anaesthetic plan. PONV is common after vitrectomy; use TIVA and multimodal antiemetics.",
  ],
];

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
        workedExamples: ["RCOphth/RCoA 2012", "Allman & Wilson Ch.29"],
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
          <TopicTableOfContents items={tocItems} />

          <div id="physiology" className="scroll-mt-24">
          <ExamSection exams={[Exam.FINAL]}>
            <CollapsibleSubsection title="Ocular Physiology" defaultOpen>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>IOP</strong>: normal 10–21 mmHg. Aqueous humour produced by ciliary body, drains via canal of Schlemm. IOP ↑ by: coughing, straining, prone, N₂O (if SF₆ in eye), suxamethonium, ketamine</li>
              <li><strong>IOP ↓ by</strong>: mannitol, acetazolamide, timolol, hyperventilation, non-depolarising NMBs, propofol, volatile agents</li>
              <li><strong>Oculocardiac reflex</strong>: traction on extraocular muscles (especially medial rectus) → trigeminal afferent (V₁) → vagal efferent → bradycardia, asystole. Treatment: stop surgical stimulus, atropine 20 µg/kg. More common in children (strabismus surgery)</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>
          </div>

          <div id="regional" className="scroll-mt-24">
          <ExamSection exams={[Exam.FINAL]}>
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
          </div>

          <DiagramSection
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

          <div id="conduct" className="scroll-mt-24">
          <ExamSection exams={[Exam.FINAL]}>
            <CollapsibleSubsection title="Anaesthetic Conduct & Modern Fasting Guidance">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li><strong>Routine fasting is no longer recommended</strong> for low-risk ophthalmic surgery performed under topical or regional block (topical/intracameral, sub-Tenon&apos;s, peribulbar) without planned sedation — patients may continue normal food and drink up to the point of surgery<InlineRef topicId="ophthalmic-anaesthesia" refLabel="Ambulatory Ophthalmic 2025" /></li>
              <li><strong>Why it matters</strong>: the population is elderly and frequently diabetic; prolonged starvation causes dehydration, hypoglycaemia, hypotension, delirium and discomfort, all of which make patients less able to lie still and cooperate. Allowing normal intake improves comfort, list throughput and glycaemic stability, and permits usual medication timing (including oral hypoglycaemics with food)</li>
              <li><strong>When conventional fasting still applies</strong>: general anaesthesia, deep or moderate procedural sedation, and any case where conversion to GA is likely (open globe, uncooperative patient, complex vitreoretinal or paediatric surgery) — 6 h food, 2 h clear fluids</li>
              <li><strong>Practical conduct under block</strong>: shared verbal contact and reassurance, arm-touch signalling, supplemental oxygen with capnography if the face is draped, and a clear plan and drugs available for the oculocardiac reflex, local anaesthetic systemic toxicity and brainstem anaesthesia</li>
              <li><strong>Documentation</strong>: record the fasting decision and the reason on the anaesthetic chart so subsequent teams do not re-starve the patient if the list overruns</li>
            </ul>
            </CollapsibleSubsection>
          </ExamSection>
          </div>

          <div id="open-globe" className="scroll-mt-24">

          <ExamSection exams={[Exam.FINAL]}>
            <CollapsibleSubsection title="Open Globe Injury">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed mb-3">
              <li><strong>Preoperative goals</strong>: avoid any external pressure on the globe (no eye-pad pressure, no forced lid retraction, careful mask holding); give an antiemetic early, treat pain with IV opioid rather than allowing straining, and consider a small anxiolytic dose in the very distressed patient. Antiemetics and analgesia matter because retching and coughing raise IOP far more than any anaesthetic drug<InlineRef topicId="ophthalmic-anaesthesia" refLabel="Vachon 2003 Open Globe" /></li>
              <li><strong>Induction</strong>: aims are rapid airway security in a patient with a full stomach, obtunding the cough/press response (fentanyl 1–2 µg/kg or alfentanil 10–20 µg/kg, plus IV lidocaine 1–1.5 mg/kg), and no IOP spike. Rocuronium 1.2 mg/kg RSI is standard with sugammadex immediately available; suxamethonium raises IOP by 5–10 mmHg for around 5 minutes and remains defensible when aspiration risk dominates<InlineRef topicId="ophthalmic-anaesthesia" refLabel="Vachon 2003 Open Globe" /></li>
              <li><strong>Maintenance</strong>: keep anaesthesia deep enough to abolish movement and coughing with full neuromuscular monitoring. Volatile agents lower IOP and are perfectly acceptable; TIVA is favoured where PONV risk is high (young patients, previous PONV) since vomiting threatens the repair. Maintain normocapnia (hypercapnia raises choroidal volume and IOP) and normotension, head slightly up</li>
              <li><strong>Emergence</strong>: plan a smooth, deep extubation or deep LMA exchange/removal; IV lidocaine 1.5 mg/kg a few minutes beforehand, full reversal with sugammadex, avoid oropharyngeal suction under light anaesthesia, and do not allow bucking on the tube</li>
              <li><strong>Postoperative care</strong>: aggressive multimodal antiemesis (dexamethasone plus ondansetron ± droperidol), effective non-sedating analgesia (paracetamol, NSAID if permitted, low-dose opioid), head-up positioning, avoid nose-blowing and straining, and continue IOP-lowering drops as prescribed by the ophthalmologist</li>
              <li>Do <strong>NOT</strong> press on the eye, and avoid N₂O if intraocular gas (SF₆/C₃F₈) has been used</li>
            </ul>

            </CollapsibleSubsection>
          </ExamSection>
          </div>

          <div id="strabismus" className="scroll-mt-24">
          <ExamSection exams={[Exam.FINAL]}>
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
          </div>

          <div id="brainstem" className="scroll-mt-24">
          <ExamSection exams={[Exam.FINAL]}>
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
          </div>

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

          <section id="faq" className="scroll-mt-24 mt-10">
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">
              Ophthalmic Anaesthesia — FAQ
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4 text-sm">
              Evidence-based answers to the questions FRCA Final candidates most often ask about intra-ocular pressure, the oculocardiac reflex, regional eye blocks, open-globe injury, brainstem anaesthesia, N₂O and intraocular gas, strabismus surgery, and vitreoretinal anaesthesia.
            </p>
            <Accordion type="single" collapsible className="w-full">
              {eyeFaqs.map(([q, a], i) => (
                <AccordionItem key={q} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-sm font-medium text-foreground">
                    {q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
                    {a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <Helmet>
            <title>Ophthalmic Anaesthesia — IOP, oculocardiac reflex, eye blocks & open globe</title>
            <meta
              name="description"
              content="Ophthalmic anaesthesia for FRCA Final: intra-ocular pressure control, the oculocardiac reflex, sub-Tenon's peribulbar and retrobulbar blocks, open-globe injury RSI, brainstem anaesthesia, strabismus surgery, and N₂O contraindication after intraocular gas."
            />
            <script type="application/ld+json">{JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: eyeFaqs.map(([name, acceptedAnswer]) => ({
                "@type": "Question",
                name,
                acceptedAnswer: { "@type": "Answer", text: acceptedAnswer },
              })),
            })}</script>
          </Helmet>
        </>
      }
    />
  );
};

export default OphthalmicAnaesthesiaTopic;
