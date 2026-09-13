import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { ExamSection } from "@/components/exam/ExamSection";
import { elderlyAnaesthesiaQuestions } from "@/data/quizzes";
import FrailtyAssessmentDiagram from "@/components/diagrams/clinical/FrailtyAssessmentDiagram";
import POCDPathophysiologyCascadeDiagram from "@/components/diagrams/clinical/POCDPathophysiologyCascadeDiagram";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { InlineRef } from "@/components/references/InlineRef";


const elderlyAnaesthesiaFaqs: Array<[string, string]> = [
  [
    "How is frailty assessed preoperatively and why does it matter?",
    "Clinical Frailty Scale (Rockwood, 1–9) is the validated NHS tool: ≥5 indicates frailty and predicts increased 30-day mortality, longer stay, delirium and discharge to care. Triggers comprehensive geriatric assessment (CGA), shared decision-making about thresholds for invasive treatment, and proactive delirium and pressure-care planning."
  ],
  [
    "What anaesthetic dose adjustments are needed in the elderly?",
    "Reduce induction doses by 20–40 % (propofol 1.0–1.5 mg/kg, thiopentone 2–3 mg/kg) due to reduced volume of distribution, lower albumin, and increased brain sensitivity. MAC falls ~6 % per decade after 40. Avoid long-acting benzodiazepines and anticholinergics (Beers criteria). Titrate opioids; consider regional techniques to spare systemic agents."
  ],
  [
    "How is postoperative delirium prevented?",
    "Multicomponent bundle (HELP/NICE CG103): orientation cues, hearing/visual aids, early mobilisation, hydration and nutrition, sleep hygiene, pain control with opioid-sparing regional techniques, avoidance of deliriogenic drugs (benzodiazepines, anticholinergics, pethidine), depth-of-anaesthesia monitoring (BIS 40–60 reduces incidence), and early identification with the 4AT score."
  ]
];

const keyPoints = [
  { text: "Physiological reserve is reduced in the elderly — decreased cardiac output, reduced FRC and closing capacity, impaired renal/hepatic drug clearance, and reduced CNS sensitivity thresholds", cites: ["NICE NG111"] },
  { text: "MAC decreases approximately 6% per decade after age 40 — elderly patients require significantly lower doses of volatile and IV anaesthetic agents", cites: ["Lancet Delirium 2014"] },
  { text: "Postoperative delirium affects 15–50% of elderly surgical patients and is independently associated with increased mortality, prolonged hospital stay, and long-term cognitive decline", cites: ["Lancet Frailty 2013"] },
  { text: "Frailty (assessed by Clinical Frailty Scale or phenotype model) is a stronger predictor of postoperative outcome than age or ASA grade alone", cites: ["AAGBI Elderly 2014"] },
  { text: "Regional anaesthesia may reduce postoperative pulmonary complications and delirium in hip fracture patients — fascia iliaca block should be performed on admission (NICE NG111)", cites: ["NICE NG111"] },
];

const ElderlyAnaesthesiaTopicWorkedExamples: WorkedExample[] = [
  {
    title: "Preventing postoperative delirium in an 85-year-old",
    scenario: "An 85-year-old with mild cognitive impairment is for fractured-NOF repair. Build an evidence-based perioperative bundle to reduce postoperative delirium.",
    working: (
      <div className="space-y-2">
        <p className="font-semibold text-foreground">Step-by-step reasoning</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Preoperative: orientation aids (glasses, hearing aids), AMTS baseline, hydration, screen and treat anaemia, review benzodiazepines/anticholinergics</li>
          <li>Anaesthetic technique: regional (spinal or fascia-iliaca) where feasible; if GA, use depth monitoring to avoid burst suppression (BIS 40–60) — ENGAGES showed depth-targeted GA did not reduce delirium but very deep anaesthesia increases risk</li>
          <li>Avoid deliriogenic drugs: benzodiazepines, pethidine, anticholinergics (prefer glycopyrrolate over atropine); favour paracetamol-based multimodal analgesia</li>
          <li>Postoperative: HELP bundle (Hospital Elder Life Program) — re-orientation, early mobilisation, sleep hygiene, daily delirium screen with 4AT</li>
          <li>Treat reversible causes promptly: pain, hypoxia, sepsis, urinary retention, constipation, electrolyte disturbance</li>
        </ol>
        <div className="mt-2 rounded-md border border-destructive/30 bg-destructive/5 p-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-destructive mb-1">Common traps</p>
          <ul className="list-disc list-inside space-y-1 text-foreground">
          <li>Equating sedation with anaesthesia — over-sedation worsens delirium</li>
          <li>Withholding analgesia for fear of delirium — under-treated pain is itself a strong precipitant</li>
          <li>Using haloperidol routinely for prevention (not evidence-based)</li>
          </ul>
        </div>
      </div>
    ),
    answer: "Multimodal bundle: fascia-iliaca block, neuraxial where suitable, depth-monitored light GA if needed, avoid deliriogenic drugs, HELP bundle and 4AT screening post-op.",
    cites: ["NICE NG111", "AAGBI Elderly 2014", "Lancet Frailty 2013"],
  },
];

const ElderlyAnaesthesiaTopic = () => {
  return (
    <TopicTemplate
      title="Anaesthesia for the Elderly Patient"
      subtitle="Age-related physiological changes, frailty assessment, pharmacological considerations, and postoperative cognitive dysfunction"
      backPath="/clinical"
      backLabel="Clinical Anaesthesia"
      accentColor="text-clinical"
      topicId="elderly-anaesthesia"
      topicTitle="Anaesthesia for the Elderly Patient"
      workedExamples={ElderlyAnaesthesiaTopicWorkedExamples}
      quizQuestions={elderlyAnaesthesiaQuestions}
      objectives={[
        "Describe age-related physiological changes affecting anaesthetic management",
        "Assess frailty using validated tools and integrate it into perioperative risk stratification",
        "Adjust anaesthetic and analgesic dosing for altered pharmacokinetics in the elderly",
        "Recognise and manage postoperative delirium and cognitive dysfunction",
        "Apply NICE NG111 standards to anaesthesia for hip fracture surgery",
      ]}
      keyPoints={keyPoints}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL] },
        keyPoints: { exams: [Exam.FINAL] },
      }}
      sectionSources={{
        objectives: [
          "NICE NG111",
          "AAGBI Elderly 2014",
          "Lancet Frailty 2013",
          "Lancet Delirium 2014",
        ],
        keyPoints: [
          "NICE NG111",
          "AAGBI Elderly 2014",
          "Lancet Frailty 2013",
          "Lancet Delirium 2014",
        ],
      }}
      coreConcepts={
        <>
        <ExamSection exams={[Exam.FINAL, Exam.FFICM]} className="scroll-mt-24">
        <div className="space-y-8">
          <p className="text-muted-foreground leading-relaxed">
            Elderly patients now form the majority of the surgical workload in many UK hospitals. Reduced physiological reserve, altered pharmacokinetics, frailty, and a high background prevalence of comorbidity all combine to elevate perioperative risk. This topic outlines the age-related changes that matter at induction, maintenance, and emergence, and the practical strategies — including frailty assessment and delirium prevention — that improve outcomes.
          </p>
          <FrailtyAssessmentDiagram />

          {/* Physiological Changes */}
          <section>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Age-Related Physiological Changes</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Cardiovascular</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Reduced cardiac output (↓1% per year after age 30); ↓ maximal heart rate (220 − age)</li>
                <li>Increased arterial stiffness → isolated systolic hypertension, increased afterload, LV hypertrophy</li>
                <li><strong className="text-foreground">Impaired baroreceptor reflex</strong> → blunted reflex tachycardia and vasoconstriction, so hypotension from induction agents, neuraxial blockade, IPPV and positional change is exaggerated and slow to correct<InlineRef topicId="elderly-anaesthesia" refLabel="BJA 2010 Ageing CVS" /></li>
                <li><strong className="text-foreground">Reduced β-adrenoceptor sensitivity</strong> → attenuated chronotropic and inotropic response to endogenous and exogenous catecholamines; higher doses of ephedrine/dobutamine may be needed, and α-agonists (metaraminol, phenylephrine, noradrenaline) are often more effective<InlineRef topicId="elderly-anaesthesia" refLabel="BJA 2010 Ageing CVS" /></li>
                <li><strong className="text-foreground">Diastolic dysfunction</strong> from ventricular stiffening → filling depends on atrial contraction and adequate preload; the patient is preload-dependent yet intolerant of fluid overload, and atrial fibrillation (loss of atrial kick with a short diastole) causes abrupt falls in cardiac output<InlineRef topicId="elderly-anaesthesia" refLabel="BJA 2010 Ageing CVS" /></li>
              </ul>

            </div>
            <div className="bg-card border border-border rounded-lg p-4 mt-3">
              <h3 className="font-semibold text-foreground mb-2">Respiratory</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Reduced FRC and increased closing capacity → closing capacity exceeds FRC in supine position by age ~65 (airway closure during tidal breathing)</li>
                <li>Reduced chest wall compliance (calcified costal cartilage), reduced lung elastic recoil</li>
                <li>Blunted hypoxic and hypercapnic ventilatory drive</li>
                <li>Increased V/Q mismatch → lower baseline PaO₂ (expected PaO₂ ≈ 13.3 − [age/30] kPa)</li>
                <li>Reduced cough reflex and mucociliary clearance → increased aspiration and pneumonia risk</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 mt-3">
              <h3 className="font-semibold text-foreground mb-2">Renal & Hepatic</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>GFR declines ~1 ml/min/year after age 40 — serum creatinine may be normal despite significant renal impairment (reduced muscle mass)</li>
                <li>Reduced hepatic blood flow and Phase I metabolism (oxidation, reduction) — Phase II (conjugation) relatively preserved</li>
                <li>Reduced plasma albumin → increased free fraction of protein-bound drugs</li>
                <li>Increased body fat, decreased total body water → altered volume of distribution</li>
                <li><strong className="text-foreground">Renally cleared drugs accumulate</strong>: rocuronium and pancuronium depend substantially on renal excretion, so a single "standard" bolus has a markedly prolonged duration — use neuromuscular monitoring and consider reduced, TOF-guided top-ups<InlineRef topicId="elderly-anaesthesia" refLabel="AAGBI Elderly 2014" /></li>
                <li><strong className="text-foreground">Active metabolites accumulate</strong>: morphine-6-glucuronide (from morphine) and norpethidine (from pethidine) are renally excreted — M6G causes delayed sedation and respiratory depression, and norpethidine is neurotoxic and pro-convulsant. Avoid pethidine in the elderly and reduce/extend morphine dosing</li>
                <li><strong className="text-foreground">Phase I versus Phase II metabolism</strong>: diazepam undergoes Phase I oxidation to long-lived active metabolites (desmethyldiazepam) and is greatly prolonged with age, whereas lorazepam is conjugated (Phase II) and is comparatively little affected — if a benzodiazepine is unavoidable, lorazepam is the safer choice</li>
                <li><strong className="text-foreground">Flow-dependent (high-extraction) drugs</strong>: fentanyl and lignocaine have hepatic extraction ratios approaching unity, so their clearance falls with reduced hepatic blood flow (cardiac failure, hypovolaemia, β-blockade, pneumoperitoneum) — reduce infusion rates and expect prolonged effect</li>
                <li><strong className="text-foreground">Organ-independent elimination is advantageous</strong>: atracurium and cisatracurium undergo Hofmann elimination and ester hydrolysis, and remifentanil is cleared by non-specific plasma and tissue esterases, so their offset is essentially unchanged by age or by renal and hepatic impairment</li>
              </ul>

            </div>
            <div className="bg-card border border-border rounded-lg p-4 mt-3">
              <h3 className="font-semibold text-foreground mb-2">Central Nervous System</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Reduced neuronal density and neurotransmitter levels</li>
                <li>MAC decreases ~6% per decade after age 40 (MAC at 80 ≈ 0.7 × MAC at 40)</li>
                <li>Increased sensitivity to benzodiazepines, opioids, and propofol</li>
                <li>Reduced spinal cord CSF volume → higher block level for a given neuraxial dose</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Frailty */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Frailty Assessment</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              <strong className="text-foreground">Frailty</strong> is a state of increased vulnerability to stressors, with reduced physiological reserve. It is distinct from disability and comorbidity, though they overlap.
            </p>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Assessment Tools</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong className="text-foreground">Clinical Frailty Scale (CFS)</strong> — 9-point scale from "very fit" to "terminally ill"; CFS ≥5 = frail; widely used, quick, validated</li>
                <li><strong className="text-foreground">Fried Phenotype Model</strong> — 5 criteria: unintentional weight loss, exhaustion, low physical activity, slow walking speed, weak grip strength; ≥3 = frail</li>
                <li><strong className="text-foreground">Edmonton Frail Scale</strong> — 11 domains including cognition, mood, functional independence, continence</li>
                <li>Frailty is a better predictor of 30-day mortality, length of stay, and discharge destination than age or ASA alone</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 mt-3">
              <h3 className="font-semibold text-foreground mb-2">Prehabilitation</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Exercise training, nutritional optimisation, smoking/alcohol cessation, psychological preparation</li>
                <li>Comprehensive Geriatric Assessment (CGA) for patients ≥65 undergoing major surgery</li>
                <li>Medication review: polypharmacy is common — stop anticholinergics, rationalise antihypertensives, manage anticoagulants</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Pharmacology */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Pharmacological Considerations</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Dose Adjustments</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong className="text-foreground">Propofol</strong> — reduce induction dose by 30–50%. In dose-finding work using slow infusion, the mean effective induction dose was <strong>≈0.8 mg/kg in the elderly versus ≈1.6 mg/kg in young adults at 25 mg/min</strong>, rising to ≈1.65 mg/kg (elderly) and ≈2.5 mg/kg (young) when infused rapidly at 100 mg/min<InlineRef topicId="elderly-anaesthesia" refLabel="Propofol Elderly 1992" />. The dose needed therefore depends on the <em>rate</em> of administration: a slower infusion (e.g. 20–30 mg/min, or 10–20 mg increments every 20–30 s) allows equilibration between plasma and effect site, so anaesthesia is reached at a much lower total dose and with far less hypotension. Prolonged arm–brain circulation time in low-output states delays the visible effect, so the common error is to bolus again before the first dose has acted.</li>
                <li><strong className="text-foreground">Opioids</strong> — reduce dose by 30–50%; increased sensitivity and reduced clearance; consider remifentanil (organ-independent metabolism)</li>
                <li><strong className="text-foreground">Muscle relaxants</strong> — atracurium/cisatracurium preferred (Hofmann degradation, organ-independent); rocuronium clearance reduced in elderly</li>
                <li><strong className="text-foreground">Volatile agents</strong> — reduced MAC; titrate to effect; consider BIS/processed EEG monitoring to avoid excessive depth</li>
                <li><strong className="text-foreground">Neuraxial</strong> — reduced dose required (reduced CSF volume, increased neural sensitivity); expect higher, longer-lasting block</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 mt-3">
              <h3 className="font-semibold text-foreground mb-2">Spinal-Induced Hypotension in the Elderly</h3>
              <p className="text-sm mb-2">
                Sympathetic blockade removes arteriolar and venous tone at a time when the stiff, non-compliant elderly ventricle is preload-dependent and the baroreceptor reflex is blunted — so a modest fall in venous return produces a disproportionate fall in cardiac output and blood pressure.
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong className="text-foreground">Crystalloid preload does not reliably prevent it</strong> — a randomised comparison in elderly patients found the same overall 27% incidence of hypotension with or without crystalloid preloading, because the load redistributes and provokes atrial natriuretic peptide release before the block is established<InlineRef topicId="elderly-anaesthesia" refLabel="Crystalloid Preload 1990" />. Large-volume preloading also risks pulmonary oedema in diastolic dysfunction.</li>
                <li><strong className="text-foreground">Co-loading is preferred to preloading</strong> — give the fluid (e.g. 500 mL crystalloid, or a smaller colloid volume) <em>as the block sets</em>, matched to the actual fall in tone, rather than in advance.</li>
                <li><strong className="text-foreground">Vasopressor first, not fluid first</strong> — treat the primary problem (loss of vascular tone). <strong>Phenylephrine 25–100 µg IV</strong> boluses (or an infusion at 25–50 µg/min) in patients with adequate heart rate; <strong>metaraminol 0.25–0.5 mg IV</strong> boluses where a mild rise in rate is acceptable. Ephedrine 3–6 mg is reserved for coexisting bradycardia.</li>
                <li><strong className="text-foreground">Targets</strong> — keep systolic pressure within 20% of the patient's pre-operative baseline and mean arterial pressure ≥ 65–70 mmHg (higher in chronic hypertension or carotid/renovascular disease). Baseline should be the ward or clinic reading, not the anxious pre-theatre value.</li>
                <li><strong className="text-foreground">Technique modifications</strong> — small-dose (2–2.5 mL 0.5% hyperbaric bupivacaine) or intrathecal-opioid-supplemented spinals, incremental low-dose sequential/epidural top-up, or a continuous spinal catheter for hip fracture; avoid steep or rapid table tilt after injection.</li>
                <li><strong className="text-foreground">Severe aortic stenosis</strong> — a fixed-output lesion coupled with a fall in SVR causes coronary hypoperfusion and a downward spiral of ischaemia. Avoid single-shot high spinals; use invasive arterial monitoring before block, prepare a vasopressor infusion running before injection, maintain sinus rhythm and heart rate 60–80/min, treat hypotension immediately with phenylephrine/noradrenaline, and consider a slowly titrated epidural or careful general anaesthesia instead. The same principle applies to hypertrophic cardiomyopathy and severe mitral stenosis.</li>
              </ul>
            </div>
          </div>
        </section>


        {/* Postoperative Delirium */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Postoperative Cognitive Dysfunction & Delirium</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Postoperative Delirium (POD)</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Acute fluctuating confusional state; onset within hours to days postoperatively; 15–50% of elderly surgical patients</li>
                <li><strong className="text-foreground">Risk factors</strong>: age &gt;65, pre-existing cognitive impairment, sensory impairment, polypharmacy, anticholinergics, alcohol, pain, sepsis, metabolic derangement</li>
                <li>Three subtypes: <strong className="text-foreground">hyperactive</strong> (agitation), <strong className="text-foreground">hypoactive</strong> (withdrawal — most common, often missed), <strong className="text-foreground">mixed</strong></li>
                <li>Screening: 4AT (rapid, validated, no training required), CAM (Confusion Assessment Method)</li>
                <li>Prevention: non-pharmacological multicomponent interventions (orientation, sleep hygiene, early mobilisation, glasses/hearing aids, hydration) — reduce delirium by 30–40%</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 mt-3">
              <h3 className="font-semibold text-foreground mb-2">Postoperative Cognitive Dysfunction (POCD)</h3>
              <p className="text-sm mb-2">
                POCD is a subtle, objectively measurable decline in cognitive domains (memory, executive function, processing speed, attention) persisting <strong className="text-foreground">weeks to months</strong> after surgery, diagnosed only by neuropsychological testing pre- and postoperatively (≥1 SD drop on ≥2 tests). The 2018 international nomenclature group recommends aligning post-surgical cognitive change with the DSM-5 framework — <em>delayed neurocognitive recovery</em> (≤30 days) and <em>postoperative neurocognitive disorder</em> (mild or major, 30 days–12 months). POCD is distinct from delirium (acute, fluctuating, attention-based) but the two are linked: delirium is the strongest single predictor of subsequent POCD.
              </p>

              <div className="my-4">
                <POCDPathophysiologyCascadeDiagram />
              </div>

              <div className="bg-muted/40 border border-border rounded-lg p-3 mt-2">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Step-by-step cascade</p>
                <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                  <li><strong className="text-foreground">Surgical trauma</strong> releases DAMPs (HMGB1, S100, mtDNA) and triggers a systemic inflammatory response with IL-1β, IL-6 and TNF-α.</li>
                  <li><strong className="text-foreground">BBB disruption</strong>: cytokines and complement degrade tight junctions, allowing peripheral inflammatory mediators and monocytes into the CNS.</li>
                  <li><strong className="text-foreground">Microglial priming</strong>: an exaggerated, sustained neuroinflammatory response occurs in the hippocampus and prefrontal cortex, impairing LTP and synaptic plasticity.</li>
                  <li><strong className="text-foreground">Cholinergic deficit</strong>: reduced acetylcholine and anticholinergic drug burden worsen attention and memory.</li>
                  <li><strong className="text-foreground">Synaptic dysfunction</strong>: Aβ/tau aggregation (animal data), oxidative stress, mitochondrial injury and cerebral hypoperfusion compound neuronal damage.</li>
                  <li><strong className="text-foreground">Cognitive decline</strong>: delirium in the early postoperative period is the strongest predictor of subsequent POCD / delayed neurocognitive recovery.</li>
                </ol>
                <p className="text-xs text-muted-foreground mt-2 italic">
                  Mitigation bundle: pre-op MoCA + CGA, processed-EEG to avoid deep anaesthesia, MAP 10–20% above baseline, opioid-sparing analgesia, and a HELP-style postoperative multicomponent intervention with daily 4AT/CAM screening.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-4 mt-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">POCD mitigation checklist — quick revision</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-foreground">Pre-op</p>
                    <ul className="list-disc list-inside space-y-0.5 text-xs text-muted-foreground">
                      <li>Cognitive screen (MoCA / Mini-Cog) — document baseline</li>
                      <li>Comprehensive Geriatric Assessment (≥65 y, major surgery)</li>
                      <li>Prehab: aerobic + resistance exercise, nutrition, smoking/alcohol cessation</li>
                      <li>Treat anaemia, optimise diabetes, review polypharmacy (STOPP/START)</li>
                      <li>Stop anticholinergics and long-acting benzodiazepines</li>
                      <li>Counsel patient and family on POD/POCD risk</li>
                    </ul>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-foreground">Intra-op</p>
                    <ul className="list-disc list-inside space-y-0.5 text-xs text-muted-foreground">
                      <li>Processed-EEG (BIS / entropy) — avoid burst suppression & deep anaesthesia</li>
                      <li>MAP within 10–20% of baseline; avoid MAP &lt;65 mmHg</li>
                      <li>Normoxia, normocapnia, normothermia, normoglycaemia</li>
                      <li>Cerebral oximetry in cardiac / major vascular surgery</li>
                      <li>Regional / neuraxial where feasible — reduce opioid load</li>
                      <li>Avoid deliriogenic drugs: benzodiazepines, pethidine, atropine</li>
                      <li>Short-acting agents: propofol TCI, remifentanil, desflurane / sevoflurane</li>
                    </ul>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-foreground">Post-op</p>
                    <ul className="list-disc list-inside space-y-0.5 text-xs text-muted-foreground">
                      <li>HELP-style bundle: re-orientation, glasses / hearing aids, early mobilisation</li>
                      <li>Sleep hygiene, hydration, early nutrition, bowel / bladder care</li>
                      <li>Multimodal opioid-sparing analgesia (paracetamol + NSAID + regional)</li>
                      <li>Daily delirium screen with 4AT or CAM</li>
                      <li>Promptly treat pain, hypoxia, sepsis, electrolyte disturbance, retention, constipation</li>
                      <li>Orthogeriatric / perioperative-medicine review</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-3 pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground italic">
                    Caveats: ENGAGES (2019) — EEG-guided light anaesthesia did not reduce delirium; routine pharmacoprophylaxis (haloperidol, dexmedetomidine, ketamine, statins) is not recommended outside specific ICU contexts.
                  </p>
                </div>
              </div>

              <h4 className="font-semibold text-foreground mt-3 mb-1 text-sm">Epidemiology</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>ISPOCD1 (cardiac-free major non-cardiac surgery, &gt;60 y): ~25% at 1 week, ~10% at 3 months</li>
                <li>Higher after cardiac surgery (30–50% at discharge, 10–30% at 3 months) and major orthopaedic/vascular surgery</li>
                <li>Independently associated with loss of independence, premature retirement, and increased 1-year mortality</li>
              </ul>

              <h4 className="font-semibold text-foreground mt-3 mb-1 text-sm">Risk factors</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong className="text-foreground">Patient</strong>: age &gt;65, pre-existing mild cognitive impairment or dementia, lower educational attainment, frailty, depression, cerebrovascular disease, APOE-ε4 genotype (signal, not proven), alcohol misuse, polypharmacy (especially anticholinergics and long-acting benzodiazepines)</li>
                <li><strong className="text-foreground">Surgical</strong>: cardiac &gt; major vascular &gt; major non-cardiac &gt; minor surgery; duration &gt;2 h; intraoperative hypotension; massive transfusion; second hit (re-operation, post-op sepsis)</li>
                <li><strong className="text-foreground">Anaesthetic</strong>: deep anaesthesia / EEG burst-suppression (signal), prolonged exposure (uncertain); choice of GA vs neuraxial has <em>not</em> been shown to alter long-term POCD incidence in RCTs</li>
                <li><strong className="text-foreground">Postoperative</strong>: delirium, uncontrolled pain, sleep disruption, hypoxia, sepsis, ICU length of stay</li>
              </ul>

              <h4 className="font-semibold text-foreground mt-3 mb-1 text-sm">Proposed pathophysiology</h4>
              <p className="text-sm mb-1">Multifactorial; no single mechanism explains all cases. Current models converge on <strong className="text-foreground">surgery-triggered neuroinflammation</strong> in a vulnerable brain:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong className="text-foreground">Systemic inflammation</strong>: surgical trauma releases DAMPs (HMGB1, S100) and cytokines (IL-1β, IL-6, TNF-α) that signal across the blood–brain barrier</li>
                <li><strong className="text-foreground">BBB disruption</strong>: cytokine- and complement-mediated tight-junction breakdown allows peripheral monocytes and inflammatory mediators into the CNS</li>
                <li><strong className="text-foreground">Microglial priming and activation</strong>: an exaggerated, sustained neuroinflammatory response, especially in hippocampus and prefrontal cortex, impairs synaptic plasticity and LTP</li>
                <li><strong className="text-foreground">Cholinergic deficit</strong>: reduced acetylcholine availability and anticholinergic drug burden contribute to attentional/memory failure</li>
                <li><strong className="text-foreground">Amyloid-β and tau</strong>: animal data show volatile anaesthetics may accelerate Aβ oligomerisation and tau hyperphosphorylation; human evidence is associative, not causal</li>
                <li><strong className="text-foreground">Cerebral hypoperfusion / micro-emboli</strong>: relevant in cardiac and major vascular surgery (CPB, aortic clamping, atheroembolism)</li>
                <li><strong className="text-foreground">Oxidative stress and mitochondrial dysfunction</strong> compound the above in aged neurons with reduced reserve</li>
              </ul>

              <h4 className="font-semibold text-foreground mt-3 mb-1 text-sm">Mitigation — perioperative bundle</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li><strong className="text-foreground">Preoperative</strong>: baseline cognitive screen (MoCA / Mini-Cog) and document; Comprehensive Geriatric Assessment for ≥65 y major surgery; prehabilitation (aerobic + resistance exercise, nutrition, smoking/alcohol cessation); treat anaemia and optimise diabetes; rationalise polypharmacy (STOPP/START) — stop long-acting benzodiazepines, anticholinergics, and unnecessary opioids; counsel patient and family about POD/POCD risk</li>
                <li><strong className="text-foreground">Intraoperative</strong>: processed-EEG depth monitoring to avoid burst-suppression and excessive depth (ASA Brain Health Initiative); maintain MAP within 10–20% of baseline (avoid MAP &lt;65 mmHg); normoxia, normocapnia, normothermia, normoglycaemia; cerebral oximetry in cardiac/major vascular surgery; regional or neuraxial where feasible to reduce opioid load; avoid deliriogenic drugs (benzodiazepines, pethidine, atropine — prefer glycopyrrolate); use short-acting agents (propofol TCI, remifentanil, desflurane/sevoflurane)</li>
                <li><strong className="text-foreground">Postoperative</strong>: HELP-style multicomponent bundle — re-orientation, glasses/hearing aids, early mobilisation, day–night sleep hygiene, hydration, early nutrition, bowel/bladder care; multimodal opioid-sparing analgesia (paracetamol + NSAID where safe + regional); daily 4AT/CAM screening; prompt treatment of pain, hypoxia, sepsis, electrolyte disturbance, urinary retention and constipation; orthogeriatric/perioperative-medicine review</li>
                <li><strong className="text-foreground">Caveats</strong>: ENGAGES (2019) did <em>not</em> show that EEG-guided light anaesthesia reduced delirium, but very deep anaesthesia remains a modifiable risk; routine pharmacological prophylaxis (haloperidol, dexmedetomidine, ketamine, statins) is <em>not</em> recommended for POD/POCD prevention outside specific ICU contexts</li>
              </ul>
            </div>
          </div>
        </section>


        {/* Hip Fracture */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Hip Fracture — The Index Condition</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Hip fracture in the elderly is the paradigm for geriatric anaesthesia. Annual incidence ~70,000 in the UK with 30-day mortality ~7%.
            </p>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2">Key Standards (NICE NG111 / AAGBI)</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Surgery within 36 hours of admission (ideally within 24 hours)</li>
                <li><strong className="text-foreground">Fascia iliaca block</strong> on admission — reduces opioid requirements and delirium incidence</li>
                <li>Spinal anaesthesia is recommended by NICE — associated with reduced 30-day mortality (REGAIN trial considerations noted)</li>
                <li>Avoid hypotension: MAP &gt;65 mmHg or within 20% of baseline; careful fluid management</li>
                <li>Cement implantation syndrome — see below</li>
                <li>Early mobilisation, orthogeriatric review, delirium prevention protocols</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4 mt-3">
              <h3 className="font-semibold text-foreground mb-2">Bone Cement Implantation Syndrome (BCIS)</h3>
              <p className="text-sm mb-2">
                BCIS is cardiorespiratory collapse occurring during cementation, prosthesis insertion, joint reduction or limb tourniquet deflation — classically during cemented hemiarthroplasty for hip fracture in an elderly, frail, dehydrated patient with limited cardiac reserve<InlineRef topicId="elderly-anaesthesia" refLabel="AAGBI Elderly 2014" />.
              </p>
              <p className="text-sm font-semibold text-foreground mb-1">Pathophysiology</p>
              <ul className="list-disc list-inside space-y-1 text-sm mb-2">
                <li>Pressurised insertion of methylmethacrylate cement into the femoral canal raises intramedullary pressure to several hundred mmHg, embolising fat, marrow, bone fragments, air and cement into the femoral vein</li>
                <li>Embolic and mediator-driven (histamine, complement, thromboxane, endothelin) pulmonary vascular obstruction → acute rise in pulmonary vascular resistance, right ventricular strain and failure</li>
                <li>Reduced left ventricular filling and cardiac output; increased dead space and V/Q mismatch cause hypoxia and a fall in end-tidal CO₂</li>
                <li>An exothermic, mildly vasodilating monomer effect contributes to hypotension; the ageing heart cannot compensate because of baroreflex impairment and diastolic dependence on preload</li>
              </ul>
              <p className="text-sm font-semibold text-foreground mb-1">Clinical triad and grading</p>
              <ul className="list-disc list-inside space-y-1 text-sm mb-2">
                <li>Triad: <strong className="text-foreground">hypoxia, hypotension and loss of consciousness</strong> (or unexpected loss of cardiac output under general anaesthesia); often accompanied by a sudden fall in EtCO₂, arrhythmia and raised CVP</li>
                <li>Severity grading: grade 1 — moderate hypoxia (SpO₂ &lt;94%) or hypotension (systolic fall &gt;20%); grade 2 — severe hypoxia (SpO₂ &lt;88%) or hypotension (fall &gt;40%) or unexpected loss of consciousness; grade 3 — cardiovascular collapse requiring CPR</li>
                <li><strong className="text-foreground">Timing</strong>: onset typically within seconds to a few minutes of cementation, prosthesis insertion, joint reduction or tourniquet release — usually within 5 minutes, and the highest-risk moments should be anticipated and announced by the surgeon</li>
              </ul>
              <p className="text-sm font-semibold text-foreground mb-1">Prevention and management (supportive)</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Prevent: correct hypovolaemia before cementation, avoid excessive anaesthetic depth or neuraxial-induced hypotension, and ask the surgeon about thorough canal lavage, retrograde cement insertion with a suction/venting catheter, and minimal pressurisation. Consider uncemented prostheses in the highest-risk patients</li>
                <li>Increase FiO₂ to 1.0 and support ventilation; treat hypoxia aggressively</li>
                <li>Optimise preload with rapid fluid; treat hypotension with α-agonists (metaraminol, phenylephrine) and add adrenaline or noradrenaline for right ventricular support in grade 2–3 disease</li>
                <li>Follow ALS if cardiac arrest occurs; there is no specific antidote — management is entirely supportive</li>
                <li>Post-event: arterial blood gas, ECG and echocardiography to assess right ventricular function, and critical care admission for grade 2–3 events</li>
              </ul>
            </div>
          </div>
        </section>

          <ExamPitfallsCallout
            accent="clinical"
            pitfalls={[
              "Reduced MAC, reduced clearance, reduced cardiovascular reserve — start low, go slow, titrate to effect.",
              "Frailty (Rockwood CFS ≥5) predicts postoperative complications independently of age.",
              "Postoperative delirium: prevention is key — orientation, sleep, hydration, pain control, avoid benzodiazepines and anticholinergics.",
              "Hip-fracture pathway: surgery within 36 h, fascia-iliaca block on admission, multidisciplinary ortho-geriatric care.",
              "Polypharmacy: review and stop high-risk drugs (anticoagulants, ACE inhibitors, oral hypoglycaemics) preoperatively per local guideline.",
            ]}
          />
        </div>
      </ExamSection>
          <TopicFaqs faqs={elderlyAnaesthesiaFaqs} />
        </>
      }
    />
  );
};

export default ElderlyAnaesthesiaTopic;
