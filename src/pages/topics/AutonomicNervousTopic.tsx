import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { autonomicNervousQuiz } from "@/data/quizzes";
import { ANSDiagram } from "@/components/diagrams/physiology/ANSDiagram";
import { ANSPathwayDiagram } from "@/components/diagrams/physiology/ANSPathwayDiagram";
import { CrossReferenceCallout } from "@/components/topic/CrossReferenceCallout";
import { Exam } from "@/data/curriculum";
import { InlineRef } from "@/components/references/InlineRef";

const autonomicNervousFaqs: Array<[string, string]> = [
  [
    "What are the neurotransmitters and receptor types at each step of the autonomic nervous system?",
    "Sympathetic: preganglionic — ACh on nicotinic receptors (paravertebral ganglia); postganglionic — noradrenaline on α/β adrenoceptors (exception: sweat glands — ACh on muscarinic). Parasympathetic: preganglionic — ACh on nicotinic (in the wall of the target organ); postganglionic — ACh on muscarinic. Adrenal medulla is a modified sympathetic ganglion releasing adrenaline directly."
  ],
  [
    "Describe the autonomic features of high spinal anaesthesia.",
    "Block above T4 abolishes cardiac sympathetic outflow (T1–T4) → unopposed vagal tone → severe bradycardia, hypotension, decreased contractility. Block above C3–5 causes diaphragmatic paralysis → respiratory failure. Treat: atropine 0.5–1 mg, ephedrine/metaraminol/adrenaline, IV fluid, head-down tilt, intubation and ventilation. Always have full resuscitation drugs drawn up for any high block."
  ],
  [
    "What is autonomic dysreflexia and how is it managed?",
    "Exaggerated sympathetic response in patients with spinal cord injury above T6, triggered by a noxious stimulus below the lesion (commonly bladder distension). Causes severe hypertension, bradycardia (carotid baroreflex), headache, sweating above the lesion, pallor below. Management: sit patient up, remove trigger (catheterise), short-acting antihypertensive (GTN, nifedipine), regional or general anaesthesia for surgery to block the afferent arc."
  ]
];

const objectives = [
  "Contrast sympathetic and parasympathetic outflow, neurotransmitters and receptor types.",
  "Classify adrenoceptor and muscarinic receptor subtypes and link each to clinical effect.",
  "Outline noradrenaline and acetylcholine synthesis, release and termination.",
  "Recognise key autonomic reflexes (baroreceptor, oculocardiac, Bezold-Jarisch) and their anaesthetic implications.",
  "Apply ANS pharmacology to manage common perioperative scenarios (bradycardia, hypotension, bronchospasm).",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Oculocardiac reflex during squint surgery",
    scenario: (
      <>
        A 6-year-old undergoing squint correction develops sudden bradycardia (HR 40 bpm) when the surgeon hooks the
        medial rectus. What is the reflex arc and what should you do?
      </>
    ),
    working: (
      <>
        <strong>Afferent</strong>: long ciliary nerves → ophthalmic division of trigeminal (CN V₁) → Gasserian ganglion →
        main sensory nucleus of V → reticular formation.
        <br />
        <strong>Efferent</strong>: vagal motor fibres (CN X) → SA node → bradycardia ± asystole and AV block.
        <br />
        Ask the surgeon to stop traction immediately. The reflex usually fatigues with repeated stimulation. Ensure
        ventilation, depth and oxygenation are adequate — hypoxia/hypercapnia exacerbate vagal tone. If persistent or
        haemodynamically significant, give an antimuscarinic per Resuscitation Council UK adult bradycardia guidance
        (atropine 500 µg IV, repeated up to 3 mg) — paediatric weight-based dosing (atropine 10–20 µg/kg IV; glycopyrrolate
        4–8 µg/kg IV) is widely quoted in the Association of Anaesthetists literature.
      </>
    ),
    answer: (
      <>
        Stop surgical stimulus → check ventilation/depth → antimuscarinic if persistent (Resus Council UK adult
        bradycardia algorithm; weight-based paediatric atropine 10–20 µg/kg IV). Discuss prophylactic antimuscarinic
        at induction with the team if multiple muscles are to be operated on.
      </>
    ),
    cites: ["RCUK ALS 2021", "BNFc Atropine"],
  },
  {
    title: "Cholinergic crisis vs myasthenic crisis",
    scenario: (
      <>
        A myasthenia patient on pyridostigmine arrives with worsening weakness, salivation, diarrhoea, miosis and
        fasciculations. How do you distinguish over- from under-treatment, and how do you manage?
      </>
    ),
    working: (
      <>
        Both present with weakness. Discriminating features:
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><strong>Cholinergic crisis</strong> (excess ACh): SLUDGE/BBB — Salivation, Lacrimation, Urination,
            Diarrhoea, GI upset, Emesis; Bradycardia, Bronchorrhoea, Bronchospasm; muscarinic excess + nicotinic
            fasciculations and weakness from depolarising block.</li>
          <li><strong>Myasthenic crisis</strong> (insufficient ACh): pure weakness, no muscarinic features, often
            triggered by infection, surgery or drugs (aminoglycosides, β-blockers).</li>
        </ul>
        Tensilon (edrophonium) test is now rarely used. Pragmatic approach: stop anticholinesterases for several hours,
        secure airway/ventilate as needed, treat triggers, and involve neurology — IVIg or plasma exchange for true
        myasthenic crisis.
      </>
    ),
    answer: (
      <>
        SLUDGE features ⇒ cholinergic crisis: stop pyridostigmine, support ventilation, atropine titrated to muscarinic
        symptoms (Resuscitation Council UK adult bradycardia guidance: 500 µg IV, repeated to a maximum of 3 mg). Pure
        weakness without cholinergic features ⇒ myasthenic crisis: ITU admission, ventilatory support, IVIg/plasma
        exchange, treat trigger.
      </>
    ),
    cites: ["Power & Kam Ch.14", "RCUK ALS 2021"],
  },
];

const AutonomicNervousTopic = () => {
  return (
    <TopicTemplate
      title="Autonomic Nervous System"
      subtitle="FRCA Primary — Physiology"
      backPath="/physiology"
      backLabel="Physiology"
      accentColor="text-physiology"
      topicId="autonomic-nervous"
      topicTitle="Autonomic Nervous System"
      quizQuestions={autonomicNervousQuiz}
      objectives={objectives}
      workedExamples={workedExamples}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL], curriculumCodes: ["CR_BK_05"] },
        workedExamples: { exams: [Exam.PRIMARY, Exam.FINAL], curriculumCodes: ["OA_BK_06"] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL] },
      }}
      sectionSources={{
        objectives: ["Power & Kam Ch.14"],
        workedExamples: ["BJA Educ 2007", "Power & Kam Ch.14", "RCUK ALS 2021", "BNFc Atropine"],
        keyPoints: ["BNF", "Power & Kam Ch.14", "Ganong Ch.13", "BJA Educ 2007"],
      }}
      keyPoints={[
        { text: "Sympathetic: thoracolumbar T1–L2; short pre-/long postganglionic. Postganglionic NT = noradrenaline (except sweat glands = ACh).", cites: ["BJA Educ 2007"] },
        { text: "Parasympathetic: craniosacral (III, VII, IX, X, S2–4); long pre-/short postganglionic. NT = ACh at both synapses.", cites: ["Ganong Ch.13"] },
        { text: "Adrenoceptors: α₁ (vasoconstriction), α₂ (presynaptic inhibition, sedation), β₁ (↑HR, ↑inotropy), β₂ (bronchodilation).", cites: ["Power & Kam Ch.14"] },
        { text: "Muscarinic receptors: M₁ (gastric), M₂ (cardiac — ↓HR), M₃ (smooth muscle contraction, secretions).", cites: ["BJA Educ 2007"] },
        { text: "NA synthesis: Tyrosine → DOPA → Dopamine → NA → Adrenaline. Rate-limiting enzyme = tyrosine hydroxylase.", cites: ["Ganong Ch.13"] },
        { text: "Baroreceptor reflex: carotid sinus (CN IX) + aortic arch (CN X) → NTS → autonomic balance. Resets in chronic hypertension.", cites: ["Power & Kam Ch.14"] },
        { text: "Oculocardiac reflex: V₁ afferent → X efferent → bradycardia. Stop stimulus, ventilate, atropine if persistent.", cites: ["BJA Educ 2007"] },
      ]}
      coreConcepts={
        <>
          <ExamSection id="overview" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["CR_BK_05"]}>
            <CollapsibleSubsection title="Overview" defaultOpen>
            <p className="text-foreground/90 leading-relaxed">
              The autonomic nervous system (ANS) controls involuntary functions including heart rate, blood pressure,
              bronchial tone, gut motility, and glandular secretion. Understanding sympathetic and parasympathetic
              pathways, receptors, and their pharmacological manipulation is essential for anaesthetic practice.
            </p>
            <div className="bg-card rounded-xl border border-border p-4 md:p-6 mt-4">
              <ANSDiagram />
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="sympathetic" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["CR_BK_05"]}>
            <CollapsibleSubsection title="Sympathetic Nervous System">
            <p className="text-foreground/90 leading-relaxed">
              Thoracolumbar outflow (T1–L2). Short preganglionic neurones (ACh at nicotinic receptors in paravertebral
              chain or prevertebral ganglia) → long postganglionic neurones releasing <strong>noradrenaline</strong>
              {" "}(exceptions: sweat glands = ACh, adrenal medulla releases adrenaline/noradrenaline directly into blood).
            </p>
            <p className="text-foreground/90 leading-relaxed mt-3">
              <strong>Adrenoceptors</strong>: α₁ (vascular smooth muscle contraction, mydriasis), α₂ (presynaptic
              inhibition, sedation — clonidine, dexmedetomidine), β₁ (↑HR, ↑contractility, ↑renin), β₂ (bronchodilation,
              vasodilation, uterine relaxation, glycogenolysis), β₃ (lipolysis, bladder relaxation).
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="parasympathetic" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["CR_BK_05"]}>
            <CollapsibleSubsection title="Parasympathetic Nervous System">
            <p className="text-foreground/90 leading-relaxed">
              Craniosacral outflow (CN III, VII, IX, X + S2–S4). Long preganglionic neurones → short postganglionic
              neurones. Both pre- and postganglionic neurotransmitter is <strong>acetylcholine</strong>. The vagus
              nerve (CN X) provides ~75% of parasympathetic outflow.
            </p>
            <p className="text-foreground/90 leading-relaxed mt-3">
              <strong>Muscarinic receptors</strong>: M₁ (CNS, gastric parietal cells — modulate acid secretion), M₂ (heart — ↓HR,
              ↓conduction), M₃ (smooth muscle contraction, glandular secretion, bronchoconstriction). <strong>Atropine</strong>
              {" "}and <strong>glycopyrrolate</strong> are non-selective muscarinic antagonists used in anaesthesia;
              glycopyrrolate is quaternary so does not cross the BBB (no central anticholinergic syndrome).
            </p>
            <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg border border-border p-3"><strong>CN III:</strong> Edinger–Westphal nucleus → ciliary ganglion → sphincter pupillae and ciliary muscle (miosis and accommodation).</div>
              <div className="rounded-lg border border-border p-3"><strong>CN VII:</strong> superior salivatory nucleus → pterygopalatine ganglion (lacrimal gland) and submandibular ganglion (submandibular/sublingual glands).</div>
              <div className="rounded-lg border border-border p-3"><strong>CN IX:</strong> inferior salivatory nucleus → otic ganglion → parotid gland.</div>
              <div className="rounded-lg border border-border p-3"><strong>CN X:</strong> dorsal motor nucleus and nucleus ambiguus → terminal ganglia in or near heart, lungs and gut to the splenic flexure <InlineRef topicId="autonomic-nervous" refLabel="Ganong Ch.13" />.</div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="enteric" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["CR_BK_05"]}>
            <CollapsibleSubsection title="Enteric Nervous System">
              <p className="text-foreground/90 leading-relaxed">The enteric nervous system is the “third division” of the ANS or intestinal “second brain”. Intrinsic primary afferent neurones (IPANs), interneurones and motor neurones form local reflex circuits that can coordinate gut function independently of the CNS <InlineRef topicId="autonomic-nervous" refLabel="Ganong Ch.13" />.</p>
              <div className="grid md:grid-cols-2 gap-4 mt-3 text-sm"><div className="rounded-lg border border-border p-4"><h3 className="font-semibold text-foreground">Myenteric (Auerbach) plexus</h3><p className="mt-1 text-foreground/80">Between longitudinal and circular muscle; principally controls tone, peristalsis and sphincter activity.</p></div><div className="rounded-lg border border-border p-4"><h3 className="font-semibold text-foreground">Submucosal (Meissner) plexus</h3><p className="mt-1 text-foreground/80">Within submucosa; coordinates secretion, absorption and local blood flow.</p></div></div>
              <p className="mt-3 text-sm text-foreground/80">Parasympathetic input is generally excitatory and sympathetic input generally inhibitory, but both modulate rather than create intrinsic activity. Important transmitters include ACh and substance P (usually excitatory), and nitric oxide and VIP (smooth-muscle relaxation); serotonin (5-HT) is central to sensory signalling and motility.</p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="autonomic-syndromes" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["OA_BK_06"]}>
            <CollapsibleSubsection title="Clinical Syndromes of Autonomic Dysfunction">
              <div className="space-y-3 text-sm text-foreground/85">
                <p><strong>Diabetic autonomic neuropathy:</strong> chronic hyperglycaemia damages nerves through polyol-pathway flux, advanced glycation end-products, oxidative stress and microvascular ischaemia of the vasa nervorum, affecting the longest fibres (vagus) first <InlineRef topicId="autonomic-nervous" refLabel="Circulation 2007 CAN" />.</p>
                <ul className="ml-4 list-disc space-y-1">
                  <li><strong>Cardiovascular:</strong> reduced heart-rate variability (earliest sign), resting tachycardia, orthostatic hypotension, silent myocardial ischaemia/infarction and intraoperative haemodynamic instability.</li>
                  <li><strong>Gastrointestinal:</strong> gastroparesis with delayed gastric emptying — treat as full stomach and consider RSI; also oesophageal dysmotility and diabetic diarrhoea.</li>
                  <li><strong>Genitourinary:</strong> neurogenic bladder with incomplete emptying, recurrent infection and erectile dysfunction.</li>
                  <li><strong>Sudomotor:</strong> distal anhidrosis with compensatory truncal/gustatory sweating, impairing thermoregulation.</li>
                </ul>
                <p><strong>Anaesthetic implications:</strong> bedside clues include loss of HR response to deep breathing or Valsalva and a postural BP drop (not routine tests but useful when suspected). Expect hypotension at induction and with neuraxial block, an attenuated response to atropine, greater sensitivity to anaesthetic agents, occult ischaemia without angina, and impaired thermoregulation. Use invasive BP monitoring for major surgery, vasopressors early, and a clear perioperative glucose plan with regular ketone/glucose checks <InlineRef topicId="autonomic-nervous" refLabel="Circulation 2007 CAN" />.</p>
                <p><strong>Autonomic dysreflexia:</strong> in spinal cord injury at/above T6, bladder distension, bowel impaction, pressure injury or surgery below the lesion drives unopposed sympathetic vasoconstriction. Severe hypertension activates intact baroreceptors, causing vagal bradycardia, headache and flushing/sweating above the lesion. Sit upright, remove the trigger, deepen/block afferent stimulation and use a rapid short-acting vasodilator if hypertension persists.</p>
                <p><strong>Multiple system atrophy (Shy–Drager):</strong> central autonomic failure causes profound orthostatic hypotension, impaired baroreflexes, urinary dysfunction, anhidrosis and airway problems; anaesthesia can produce extreme BP swings.</p>
                <p><strong>Horner's syndrome:</strong> interruption of the oculosympathetic pathway gives the triad of <em>miosis</em>, partial <em>ptosis</em> (Müller's muscle) and ipsilateral <em>anhidrosis</em>, often with apparent enophthalmos and facial flushing. The pathway has three neurones: first-order hypothalamus → brainstem/spinal cord, second-order (preganglionic) from T1 across the lung apex, third-order (postganglionic) from the superior cervical ganglion along the internal carotid artery. In anaesthesia it follows high epidural or spinal spread, supraclavicular/interscalene brachial plexus and stellate ganglion block, and internal jugular cannulation; block-related Horner's is transient, but new persistent signs demand investigation <InlineRef topicId="autonomic-nervous" refLabel="Eye Brain 2015 Horner" />.</p>
                <p><strong>Autonomic dysfunction in critical illness:</strong> a common feature of sepsis and other critical states, driven by cytokine and vagal-afferent signalling, altered central autonomic network activity and receptor desensitisation. Clinically: loss of heart-rate variability, labile blood pressure with vasopressor dependence, reduced baroreflex sensitivity and impaired gut motility. The same neuroendocrine dysregulation contributes to critical illness-related corticosteroid insufficiency (CIRCI), where tissue corticosteroid activity is inadequate for the degree of illness <InlineRef topicId="autonomic-nervous" refLabel="CIRCI 2017" />. Reduced HRV is consistently associated with worse outcomes and is prognostic rather than a treatment target.</p>
                <p><strong>Autonomic changes in pregnancy:</strong> the shift is biphasic. In the first trimester vagal (parasympathetic) tone rises with reduced sympathetic activity; through the second and third trimesters sympathetic tone rises progressively while vagal modulation falls — HRV analysis shows falling high-frequency power and a rising low-frequency/high-frequency ratio near term <InlineRef topicId="autonomic-nervous" refLabel="BJA 2000 Pregnancy ANS" />. Combined with altered baroreflex sensitivity and aortocaval compression, this explains the exaggerated hypotension after spinal anaesthesia and the value of left lateral tilt, co-loading and prophylactic phenylephrine.</p>
                <p><strong>Critical illness syndromes:</strong> Guillain–Barré syndrome causes alternating hypertension/hypotension and brady-/tachyarrhythmias; tetanus causes catecholamine-driven autonomic storms. Continuous monitoring and short-acting titratable drugs are preferred.</p>
                <p><strong>Drug-induced:</strong> tricyclic antidepressants impair noradrenaline reuptake and antimuscarinic function; antipsychotics may cause α-blockade and orthostatic hypotension. Dysautonomia is also recognised in post-viral syndromes <InlineRef topicId="autonomic-nervous" refLabel="Ann Med 2022 Dysautonomia" />.</p>
              </div>

            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="neurotransmitters" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["CR_BK_05"]}>
            <CollapsibleSubsection title="Neurotransmitter Synthesis & Metabolism">
            <p className="text-foreground/90 leading-relaxed">
              <strong>Noradrenaline synthesis</strong>: Tyrosine → DOPA (tyrosine hydroxylase, rate-limiting) → Dopamine
              → Noradrenaline → Adrenaline (in adrenal medulla, PNMT). Termination: reuptake (uptake-1 into nerve
              terminal, uptake-2 into effector cells) &gt; MAO/COMT metabolism.
            </p>
            <p className="text-foreground/90 leading-relaxed mt-3">
              <strong>ACh synthesis</strong>: Choline + Acetyl-CoA → ACh (choline acetyltransferase). Hydrolysed by
              acetylcholinesterase (true ChE, synapse) and butyrylcholinesterase (pseudocholinesterase/plasma ChE,
              hydrolyses suxamethonium and mivacurium).
            </p>
            <div className="bg-card rounded-xl border border-border p-4 md:p-6 mt-4">
              <ANSPathwayDiagram />
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="reflexes" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["OA_BK_06"]}>
            <CollapsibleSubsection title="Autonomic Reflexes">
            <p className="text-foreground/90 leading-relaxed">
              <strong>Baroreceptor reflex</strong>: carotid sinus (CN IX) and aortic arch (CN X) → NTS in medulla →
              adjusts sympathetic/parasympathetic outflow to maintain BP. Reset in chronic hypertension; blunted by
              volatile anaesthetics.
            </p>
            <p className="text-foreground/90 leading-relaxed mt-3">
              <strong>Oculocardiac reflex</strong>: pressure on globe → CN V₁ afferent → CN X efferent → bradycardia.
              Treat with stopping stimulus, atropine/glycopyrrolate. <strong>Bezold-Jarisch reflex</strong>: LV
              mechanoreceptors → vagal activation → bradycardia + vasodilation. May occur during neuraxial anaesthesia
              or haemorrhage and explains paradoxical bradycardia with hypovolaemia.
            </p>
            <CrossReferenceCallout
              reason="The baroreceptor arc is one limb of an integrated short-, medium- and long-term BP control system (RAAS, ADH, ANP, renal pressure-natriuresis)."
              links={[{ topicId: "cardiac-electrophysiology", anchor: "bp-regulation", label: "Blood Pressure Regulation" }]}
            />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamPitfallsCallout
            pitfalls={[
              <><strong>Oculocardiac reflex</strong> (V→X bradycardia) on traction of extraocular muscles — warn surgeon, treat with cessation, atropine if persistent.</>,
              <><strong>Autonomic dysreflexia</strong> in spinal injury &gt;T6 — noxious stimulus below the lesion triggers severe hypertension and reflex bradycardia. Treat trigger, head-up, vasodilator.</>,
              <><strong>Diabetic autonomic neuropathy</strong>: gastroparesis (aspiration risk), silent ischaemia, exaggerated BP swings on induction.</>,
              <><strong>Phaeochromocytoma</strong>: α-block before β-block; intra-op surges treated with short-acting agents (phentolamine, magnesium, esmolol).</>,
              <><strong>Anticholinergic syndrome</strong>: "hot as a hare, dry as a bone, mad as a hatter" — physostigmine reverses central effects but cardiac risk limits use.</>,
            ]}
          />
          <TopicFaqs faqs={autonomicNervousFaqs} />

        </>
      }
    />
  );
};

export default AutonomicNervousTopic;
