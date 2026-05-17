import { TopicTemplate } from "@/components/TopicTemplate";
import { ExamSection } from "@/components/ExamSection";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";
import { WorkedExample } from "@/components/WorkedExamples";
import { giPhysiologyQuestions } from "@/data/quizzes";
import VomitingControlDiagram from "@/components/diagrams/VomitingControlDiagram";
import { Exam } from "@/data/curriculum";

const objectives = [
  "Describe the cellular control of gastric acid secretion and the receptor pharmacology that targets it.",
  "Map the four afferent inputs to the vomiting centre and link each to a class of antiemetic.",
  "Explain the determinants of lower oesophageal barrier pressure and the implications for aspiration risk.",
  "Outline gut motility, the migrating motor complex, and the time-course of post-operative ileus.",
  "Apply RCoA pre-operative fasting guidance to common clinical scenarios.",
];

const workedExamples: WorkedExample[] = [
  {
    title: "PONV prophylaxis in a high-risk patient",
    scenario: (
      <>
        A 32-year-old non-smoker, female, with prior PONV is having a laparoscopic cholecystectomy under
        general anaesthesia with intra-operative opioid. Apfel score = 4. Plan a multimodal antiemetic strategy.
      </>
    ),
    working: (
      <>
        Apfel risk factors target distinct pathways. Best evidence is for combining drugs that act at <em>different</em>{" "}
        receptors rather than escalating dose at one. Choose one agent per pathway:
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li><strong>5-HT₃</strong> (vagal/CTZ): ondansetron 4 mg IV at end of surgery.</li>
          <li><strong>Glucocorticoid</strong> (CTZ + anti-inflammatory): dexamethasone 4–8 mg IV at induction.</li>
          <li><strong>D₂</strong> (CTZ): droperidol 0.625 mg IV or metoclopramide 10 mg IV.</li>
          <li><strong>NK₁</strong> (CTZ, long acting): aprepitant 40 mg PO pre-op for very high-risk patients.</li>
        </ul>
        Also reduce baseline risk: TIVA with propofol, opioid-sparing analgesia (regional, paracetamol, NSAID),
        adequate hydration.
      </>
    ),
    answer: (
      <>
        TIVA + dexamethasone at induction + ondansetron at emergence + a third agent (droperidol or aprepitant).
        Three-agent prophylaxis halves PONV in Apfel-3/4 patients (Gan et al., 4th Consensus, 2020).
      </>
    ),
   cites: ["Peck & Hill Ch.11"],
  },
  {
    title: "Aspiration risk and barrier pressure",
    scenario: (
      <>
        A 28-week pregnant woman needs emergency appendicectomy. Why is she at increased aspiration risk and
        how does this change your induction technique?
      </>
    ),
    working: (
      <>
        Barrier pressure = LOS pressure − intragastric pressure. In pregnancy:
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Progesterone reduces LOS tone.</li>
          <li>Gravid uterus raises intragastric pressure.</li>
          <li>Gastrin from the placenta increases acid secretion.</li>
          <li>Gastric emptying is normal until labour, then markedly delayed by pain and opioids.</li>
        </ul>
        Net effect: barrier pressure falls, residual volume rises, and pH drops — Mendelson's criteria for clinically
        significant aspirate (&gt;25 mL, pH &lt;2.5) are easily met.
      </>
    ),
    answer: (
      <>
        Treat as full stomach: H₂ antagonist + 30 mL 0.3 M sodium citrate, RSI with cricoid pressure, head-up tilt,
        avoid bag-mask ventilation pre-intubation, and extubate awake in the lateral position.
      </>
    ),
   cites: ["BJA Educ 2018"],
  },
];

const GastrointestinalPhysiologyTopic = () => {
  return (
    <TopicTemplate
      title="Gastrointestinal Physiology"
      subtitle="FRCA Primary & Final — Physiology"
      backPath="/physiology"
      backLabel="Physiology"
      accentColor="text-physiology"
      topicId="gi-physiology"
      topicTitle="Gastrointestinal Physiology"
      quizQuestions={giPhysiologyQuestions}
      objectives={objectives}
      workedExamples={workedExamples}
      sectionExamMapping={{
        objectives: { exams: [Exam.PRIMARY, Exam.FINAL], curriculumCodes: ["CR_BK_06", "OA_BK_03"] },
        diagrams: { exams: [Exam.PRIMARY, Exam.FINAL] },
        workedExamples: { exams: [Exam.PRIMARY, Exam.FINAL], curriculumCodes: ["OA_BK_03"] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL] },
      }}
      sectionSources={{
        objectives: ["Peck & Hill Ch.11"],
        workedExamples: ["Gan et al. 2020", "BJA Educ 2018"],
        keyPoints: ["Peck & Hill Ch.11", "BJA Educ 2018"],
      }}
      diagrams={
        <div className="bg-card rounded-xl border border-border p-4 md:p-6">
          <VomitingControlDiagram />
        </div>
      }
      keyPoints={[
        { text: "Parietal cells secrete HCl via H⁺/K⁺-ATPase, stimulated by ACh (M₃), histamine (H₂), and gastrin (CCK-B).", cites: ["Gan et al. 2020"] },
        { text: "Vomiting centre receives input from CTZ (D₂, 5-HT₃, NK₁), GI tract (5-HT₃ via vagus), vestibular (H₁, M₁), and cortex.", cites: ["BJA Educ 2018"] },
        { text: "LOS barrier pressure = LOS pressure − intragastric pressure — reduced by volatiles, opioids, pregnancy.", cites: ["Peck & Hill Ch.11"] },
        { text: "Multimodal antiemesis (different receptor classes) outperforms single high-dose strategies in high-risk PONV.", cites: ["Gan et al. 2020"] },
        { text: "Post-surgical ileus: small bowel recovers ~24 h, stomach ~48 h, colon ~72 h.", cites: ["BJA Educ 2018"] },
        { text: "Enteric nervous system (Auerbach's + Meissner's) can function independently of the CNS.", cites: ["Peck & Hill Ch.11"] },
      ]}
      coreConcepts={
        <>
          <ExamSection id="overview" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["CR_BK_06"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Overview</h2>
            <p className="text-muted-foreground leading-relaxed">
              Gastrointestinal physiology matters to the anaesthetist for two reasons: aspiration risk and
              postoperative ileus / PONV. Starting from gastric secretion (the target for fasting guidelines and
              acid-suppression pharmacology), we move through the vomiting reflex (mapping onto antiemetic classes),
              motility (relevant to ileus and prokinetics) and finish with the integrated anaesthetic implications.
            </p>
          </ExamSection>

          <ExamSection id="gastric-secretion" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["CR_BK_06"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Gastric Secretion</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              The stomach produces ~2 L of gastric juice/day. Parietal cells secrete HCl via H⁺/K⁺-ATPase (proton pump) on
              the apical membrane. Stimulated by acetylcholine (M₃), histamine (H₂), and gastrin (CCK-B receptors) — the
              three converge on intracellular cAMP/Ca²⁺ to activate the proton pump. PPIs (omeprazole) act on the final
              common pathway and so are more effective than H₂ antagonists alone.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground font-semibold">Cell Type</th>
                    <th className="text-left py-2 text-foreground font-semibold">Secretion</th>
                    <th className="text-left py-2 text-foreground font-semibold">Function</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium text-foreground">Parietal</td>
                    <td>HCl, intrinsic factor</td>
                    <td>pH 1–2; protein denaturation; B₁₂ absorption</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium text-foreground">Chief</td>
                    <td>Pepsinogen</td>
                    <td>Activated to pepsin by acid → protein digestion</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium text-foreground">G cells (antrum)</td>
                    <td>Gastrin</td>
                    <td>Stimulates parietal cells and gastric motility</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 font-medium text-foreground">D cells</td>
                    <td>Somatostatin</td>
                    <td>Inhibits gastrin and acid secretion</td>
                  </tr>
                  <tr>
                    <td className="py-2 font-medium text-foreground">ECL cells</td>
                    <td>Histamine</td>
                    <td>Paracrine stimulation of parietal cells (H₂ receptors)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ExamSection>

          <ExamSection id="nausea-vomiting" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["OA_BK_03"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Nausea & Vomiting</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              The vomiting centre (nucleus tractus solitarius) receives input from multiple sites — this explains why
              different antiemetics target different pathways and why combination therapy outperforms monotherapy:
            </p>
            <div className="space-y-3">
              {[
                {
                  input: "CTZ (area postrema)",
                  receptors: "D₂, 5-HT₃, NK₁, μ-opioid",
                  drugs: "Outside BBB — detects circulating emetogens (opioids, cytotoxics). Targets: ondansetron, droperidol, aprepitant.",
                },
                {
                  input: "GI tract (vagal afferents)",
                  receptors: "5-HT₃, mechanoreceptors",
                  drugs: "Distension, irritation, chemo/radiotherapy → serotonin release from enterochromaffin cells. Targets: ondansetron.",
                },
                {
                  input: "Vestibular system",
                  receptors: "H₁, M₁",
                  drugs: "Motion sickness, opioid-induced. Targets: cyclizine, hyoscine, promethazine.",
                },
                {
                  input: "Higher centres (cortex)",
                  receptors: "Various",
                  drugs: "Anticipatory nausea, anxiety, ↑ ICP, pain. Adjuncts: benzodiazepines, dexamethasone.",
                },
              ].map((item) => (
                <div key={item.input} className="p-3 rounded-lg border border-border">
                  <p className="font-semibold text-foreground text-sm">
                    {item.input}{" "}
                    <span className="text-xs text-muted-foreground ml-1">({item.receptors})</span>
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{item.drugs}</p>
                </div>
              ))}
            </div>
          </ExamSection>

          <ExamSection id="motility" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["CR_BK_06"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Gut Motility</h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li>
                <strong>Lower oesophageal sphincter</strong>: tonic contraction (15–25 mmHg). Relaxed by volatile agents,
                opioids, anticholinergics, pregnancy. Barrier pressure = LOS pressure − intragastric pressure.
              </li>
              <li>
                <strong>Gastric emptying</strong>: accelerated by metoclopramide (D₂ antagonist), erythromycin (motilin
                agonist). Delayed by opioids, pain, trauma, anticholinergics, pregnancy, DM, GLP-1 analogues.
              </li>
              <li>
                <strong>Small bowel</strong>: peristalsis + segmentation. Migrating motor complex (MMC) in fasting —
                ~90 min cycles. Ileus post-surgery: small bowel recovers first (24 h), stomach (48 h), colon last (72 h).
              </li>
              <li>
                <strong>Enteric nervous system</strong>: Meissner's (submucosal, secretomotor) and Auerbach's (myenteric,
                motility) plexuses — can function independently of CNS.
              </li>
            </ul>
          </ExamSection>

          <ExamSection id="anaesthetic-implications" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["OA_BK_03"]}>
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Anaesthetic Implications</h2>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li>
                <strong>Aspiration risk</strong>: RCoA fasting guidance — 2 h clear fluids, 6 h light meal/milk, 6 h
                expressed breast milk in infants. RSI for full-stomach scenarios; cricoid pressure (controversial but UK
                standard).
              </li>
              <li>
                <strong>Hepatic first-pass</strong>: oral drugs pass through portal circulation → extensive metabolism of
                high extraction-ratio drugs (propranolol, lidocaine, GTN).
              </li>
              <li>
                <strong>Abdominal compartment syndrome</strong>: IAP &gt;20 mmHg with new organ dysfunction → ↓ venous
                return, ↓ renal perfusion, ↑ airway pressures. Decompressive laparotomy if refractory.
              </li>
              <li>
                <strong>GLP-1 receptor agonists</strong> (semaglutide): markedly delayed gastric emptying — 2024 ASA/AAGBI
                guidance recommends withholding ≥1 week (weekly) or the day before (daily) where clinically safe, and
                treating as full-stomach if continued.
              </li>
            </ul>
          </ExamSection>

          <ExamPitfallsCallout
            pitfalls={[
              <><strong>GLP-1 agonists</strong> (semaglutide, tirzepatide): treat as full-stomach unless held per ASA/AAGBI 2024 guidance — gastric residual volume can be high even after prolonged fasting.</>,
              <><strong>RSI indications</strong>: hiatus hernia + symptoms, bowel obstruction, pregnancy &gt;20 weeks, recent trauma, emergency surgery, gastroparesis.</>,
              <><strong>Multimodal PONV prophylaxis</strong> beats single-agent every time — combine 5-HT₃ + dexamethasone ± droperidol or cyclizine.</>,
              <><strong>Ileus prevention</strong>: opioid-sparing analgesia, early enteral nutrition, gum chewing, alvimopan in selected ERAS pathways.</>,
              <><strong>"Empty stomach"</strong> ≠ low risk: pyloric stenosis, achalasia and DKA may retain large volumes despite fasting.</>,
            ]}
          />
        </>
      }
    />
  );
};

export default GastrointestinalPhysiologyTopic;
