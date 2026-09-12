import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { TopicFaqs } from "@/components/topic/TopicFaqs";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import { ExamPitfallsCallout } from "@/components/exam/ExamPitfallsCallout";
import { InlineRef } from "@/components/references/InlineRef";
import { WorkedExample } from "@/components/topic/WorkedExamples";
import { giPhysiologyQuestions } from "@/data/quizzes";
import VomitingControlDiagram from "@/components/diagrams/pharmacology/VomitingControlDiagram";
import { Exam } from "@/data/curriculum";

const gastrointestinalPhysiologyFaqs: Array<[string, string]> = [
  [
    "What are the current ASA fasting guidelines?",
    "Clear fluids — 2 h. Breast milk — 4 h. Infant formula and light meal (toast) — 6 h. Fatty meal — 8 h. Recent ESAIC and APAGBI guidance encourages clear-fluid intake up to 1 h pre-op in children and adults (1-2-6 rule), reducing dehydration and improving comfort without increasing aspiration risk."
  ],
  [
    "What factors increase the risk of aspiration?",
    "Full stomach (emergency, trauma, recent meal, GI obstruction), pregnancy, hiatus hernia/GORD, raised intra-abdominal pressure (obesity, ascites), diabetic gastroparesis, opioid use, head injury, deep sedation without airway protection. Mendelson's syndrome (1946) — aspiration of acidic gastric contents (pH <2.5, volume >25 mL) causing chemical pneumonitis."
  ],
  [
    "Outline the secretions and pH at each level of the GI tract.",
    "Saliva — 1.5 L/day, pH 6–7 (amylase). Gastric — 2 L/day, pH 1–3 (HCl from parietal cells, pepsinogen, intrinsic factor). Pancreatic — 1.5 L/day, pH 8 (bicarbonate, enzymes). Bile — 0.5 L/day, pH 7–8 (salts, bilirubin). Small intestine — 1.5 L/day. Total ~7–9 L/day; >98 % is reabsorbed. Major fluid losses (high-output stoma, prolonged NG aspiration) require careful electrolyte replacement."
  ]
];

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
          <li><strong>5-HT₃</strong> (vagal/CTZ): ondansetron 4 mg IV at end of surgery<InlineRef topicId="gi-physiology" refLabel="Gan et al. 2020" />.</li>
          <li><strong>Glucocorticoid</strong> (CTZ + anti-inflammatory): dexamethasone 4–8 mg IV at induction<InlineRef topicId="gi-physiology" refLabel="Gan et al. 2020" />.</li>
          <li><strong>D₂</strong> (CTZ): droperidol 0.625 mg IV or metoclopramide 10 mg IV<InlineRef topicId="gi-physiology" refLabel="Gan et al. 2020" />.</li>
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
        workedExamples: { exams: [Exam.PRIMARY, Exam.FINAL], curriculumCodes: ["OA_BK_03"] },
        keyPoints: { exams: [Exam.PRIMARY, Exam.FINAL] },
      }}
      sectionSources={{
        objectives: ["Peck & Hill Ch.11", "RCoA Fasting 2019"],
        workedExamples: ["Gan et al. 2020", "BJA Educ 2018", "Peck & Hill Ch.11"],
        keyPoints: ["Peck & Hill Ch.11", "BJA Educ 2018", "Gan et al. 2020", "RCoA Fasting 2019", "Assoc Anaesth GLP-1 2024"],
      }}
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
          <ExamSection id="overview" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["CR_BK_06"]}>
            <CollapsibleSubsection title="Overview" defaultOpen>
            <p className="text-muted-foreground leading-relaxed">
              Gastrointestinal physiology matters to the anaesthetist for two reasons: aspiration risk and
              postoperative ileus / PONV. Starting from gastric secretion (the target for fasting guidelines and
              acid-suppression pharmacology), we move through the vomiting reflex (mapping onto antiemetic classes),
              motility (relevant to ileus and prokinetics) and finish with the integrated anaesthetic implications.
            </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="gastric-secretion" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["CR_BK_06"]}>
            <CollapsibleSubsection title="Gastric Secretion">
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
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="gi-hormones" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["CR_BK_06"]}>
            <CollapsibleSubsection title="Major Gastrointestinal Hormones">
              <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-border"><th className="p-2 text-left">Hormone/source</th><th className="p-2 text-left">Stimulus</th><th className="p-2 text-left">Principal actions</th></tr></thead><tbody className="divide-y divide-border text-muted-foreground"><tr><td className="p-2">CCK — duodenal/jejunal I cells</td><td className="p-2">Fat and protein</td><td className="p-2">Gallbladder contraction, pancreatic enzymes, sphincter of Oddi relaxation; slows gastric emptying.</td></tr><tr><td className="p-2">Secretin — duodenal S cells</td><td className="p-2">Duodenal acid</td><td className="p-2">Pancreatic/biliary bicarbonate; inhibits gastric acid.</td></tr><tr><td className="p-2">GIP — K cells</td><td className="p-2">Oral glucose, fat</td><td className="p-2">Incretin insulin release; inhibits gastric acid.</td></tr><tr><td className="p-2">Motilin — M cells</td><td className="p-2">Fasting</td><td className="p-2">Initiates the migrating motor complex; erythromycin is an agonist.</td></tr><tr><td className="p-2">Ghrelin — stomach</td><td className="p-2">Fasting</td><td className="p-2">Stimulates appetite and growth-hormone release.</td></tr></tbody></table></div>
              <InlineRef topicId="gi-physiology" refLabel="Ganong GI Hormones" />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="nausea-vomiting" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["OA_BK_03"]}>
            <CollapsibleSubsection title="Nausea & Vomiting">
            <p className="text-muted-foreground leading-relaxed mb-3">
              The vomiting centre (nucleus tractus solitarius) receives input from multiple sites — this explains why
              different antiemetics target different pathways and why combination therapy outperforms monotherapy.
              Vagal efferent output during the emetic reflex drives <strong>retroperistalsis with relaxation of the
              proximal stomach and lower oesophageal sphincter</strong> (not an increase in pro-grade gastric
              motility), followed by forceful abdominal and respiratory muscle contraction<InlineRef topicId="gi-physiology" refLabel="Ganong Ch.27" />:
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
            <div className="mt-4 bg-card rounded-xl border border-border p-4 md:p-6">
              <VomitingControlDiagram />
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="motility" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["CR_BK_06"]}>
            <CollapsibleSubsection title="Gut Motility">
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
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="liver-physiology" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} curriculumCodes={["CR_BK_06"]}>
            <CollapsibleSubsection title="Liver Physiology and Anaesthetic Implications">
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed"><p><strong>Blood supply:</strong> dual inflow of roughly 25% of flow from the hepatic artery and 75% from the portal vein, together supplying about 25% of cardiac output; because portal blood is already partly desaturated the artery delivers around half the oxygen. The <strong>hepatic arterial buffer response</strong> increases hepatic arterial flow as portal flow falls (adenosine washout mediated), partially defending total hepatic blood flow and oxygen delivery.</p><p><strong>Metabolism:</strong> Phase I CYP450 oxidation, reduction or hydrolysis may activate or inactivate drugs; Phase II conjugation (glucuronidation, sulfation, acetylation, glutathione) usually increases water solubility. High-extraction drugs (propranolol, lidocaine, morphine, GTN) are flow-limited, while low-extraction drugs (warfarin, diazepam, phenytoin) are capacity-limited and depend on protein binding and intrinsic enzyme activity.</p><p><strong>Synthesis:</strong> albumin maintains oncotic pressure and binds acidic drugs; the liver synthesises most coagulation factors, including the vitamin K-dependent factors II, VII, IX and X plus protein C and S, so a changing PT/INR reflects synthetic failure more rapidly than albumin (factor VII half-life ~4–6 h). Cholestasis impairs vitamin K absorption and responds to parenteral vitamin K, unlike true hepatocellular failure.</p><p><strong>Bilirubin:</strong> haem breakdown produces unconjugated bilirubin, albumin-bound transport to liver, glucuronide conjugation and biliary excretion. Cholestasis raises conjugated bilirubin; hepatocellular failure may produce a mixed pattern.</p><p><strong>Anaesthesia:</strong> hypotension, high airway pressure and excessive PEEP can reduce hepatic blood flow. Liver disease increases free drug, reduces metabolism/excretion and prolongs opioids and some neuromuscular blockers (atracurium and cisatracurium are least affected); assess renal function, encephalopathy, nutrition and haemostasis, and manage coagulopathy with viscoelastic testing and targeted product rather than correcting INR reflexively.</p></div>
              <InlineRef topicId="gi-physiology" refLabel="Lautt HABR" />

              <InlineRef topicId="gi-physiology" refLabel="Hepatic Physiology Review" />
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="abdo-compartment" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["CR_BK_06"]}>
            <CollapsibleSubsection title="Intra-abdominal Hypertension and Abdominal Compartment Syndrome">
              <p className="text-sm text-muted-foreground leading-relaxed"><strong>IAH</strong> is sustained/repeated IAP ≥12 mmHg: grade I 12–15, II 16–20, III 21–25, IV &gt;25. <strong>ACS</strong> is sustained IAP &gt;20 mmHg with new organ dysfunction <InlineRef topicId="gi-physiology" refLabel="WSACS 2013" />.</p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground list-disc list-inside"><li><strong>Effects:</strong> reduced venous return and cardiac output; diaphragmatic splinting, raised peak/plateau pressures and barotrauma; renal vein/parenchymal compression with oliguria; impaired splanchnic perfusion and raised ICP.</li><li><strong>Measurement:</strong> end-expiratory intravesical pressure, supine, zeroed at the mid-axillary line at iliac crest, with no abdominal muscle contraction and ≤25 mL bladder saline.</li><li><strong>Stepwise treatment:</strong> analgesia/sedation, brief neuromuscular blockade, avoid positive fluid balance, NG/rectal decompression, evacuate collections percutaneously, optimise perfusion; decompressive laparotomy for refractory ACS.</li></ul>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="gut-microbiome" exams={[Exam.FINAL, Exam.FFICM]} curriculumCodes={["CR_BK_06"]}>
            <CollapsibleSubsection title="The Gut Microbiome and Perioperative Significance">
              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p><strong>Role:</strong> around 10<sup>14</sup> commensal organisms ferment non-digestible carbohydrate to short-chain fatty acids (butyrate fuels colonocytes), synthesise vitamin K and B vitamins, deconjugate bile acids, contribute to drug and hormone metabolism, and train mucosal immunity while competing with pathogens for niche and nutrients.</p>
                <p><strong>Dysbiosis:</strong> loss of diversity with expansion of virulent organisms. It is driven by surgical stress, starvation and altered nutrition, opioids, proton-pump inhibitors, broad-spectrum antibiotics, hypoperfusion and prolonged critical illness — the ICU pattern of a low-diversity, pathogen-dominated flora.</p>
                <p><strong>Perioperative impact:</strong> dysbiotic collagenase-producing organisms (Enterococcus faecalis, Pseudomonas) are implicated in anastomotic leak; dysbiosis is also associated with surgical site and healthcare-associated infection, <em>Clostridioides difficile</em> colitis, ventilator-associated pneumonia and delirium <InlineRef topicId="gi-physiology" refLabel="BJS 2017 Microbiome" />.</p>
                <p><strong>Therapeutic potential:</strong> ERAS elements that limit fasting, maintain enteral nutrition and avoid unnecessary antibiotics help preserve flora. Probiotics/synbiotics reduce infectious complications in some elective abdominal surgery meta-analyses but evidence is heterogeneous and they are avoided in immunocompromised or severely ill patients; faecal microbiota transplantation is established only for recurrent <em>C. difficile</em> infection.</p>
              </div>
            </CollapsibleSubsection>
          </ExamSection>


          <ExamSection id="anaesthetic-implications" exams={[Exam.PRIMARY, Exam.FINAL]} curriculumCodes={["OA_BK_03"]}>
            <CollapsibleSubsection title="Anaesthetic Implications">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside leading-relaxed">
              <li>
                <strong>Aspiration risk</strong>: RCoA fasting guidance — 2 h clear fluids, 6 h light meal/milk, 6 h
                expressed breast milk in infants<InlineRef topicId="gi-physiology" refLabel="RCoA Fasting 2019" />. RSI for full-stomach scenarios; cricoid pressure (controversial but UK
                standard).
              </li>
              <li>
                <strong>Hepatic first-pass</strong>: oral drugs pass through portal circulation → extensive metabolism of
                high extraction-ratio drugs (propranolol, lidocaine, GTN).
              </li>
              <li>
                <strong>GLP-1 receptor agonists</strong> (semaglutide): markedly delayed gastric emptying — 2024 CPOC/Association of Anaesthetists
                guidance recommends withholding ≥1 week (weekly) or the day before (daily) where clinically safe, and
                treating as full-stomach if continued<InlineRef topicId="gi-physiology" refLabel="Assoc Anaesth GLP-1 2024" />.
              </li>
            </ul>
            </CollapsibleSubsection>
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
          <TopicFaqs faqs={gastrointestinalPhysiologyFaqs} />

        </>
      }
    />
  );
};

export default GastrointestinalPhysiologyTopic;
