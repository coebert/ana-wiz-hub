import { TopicTemplate } from "@/components/TopicTemplate";
import { TopicFaqs } from "@/components/TopicFaqs";
import { ExamSection } from "@/components/ExamSection";
import { SynthesisBlock } from "@/components/SynthesisBlock";
import { pulmonaryHypertensionQuestions } from "@/data/quizzes";
import RVFailureSpiralDiagram from "@/components/diagrams/RVFailureSpiralDiagram";
import PHRiskStratificationCalculator from "@/components/diagrams/PHRiskStratificationCalculator";
import PHPathophysiologyDiagram from "@/components/diagrams/PHPathophysiologyDiagram";
import type { WorkedExample } from "@/components/WorkedExamples";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";

const pulmonaryHypertensionFaqs: Array<[string, string]> = [
  ["What is the haemodynamic definition of pulmonary hypertension?", "Mean PAP >20 mmHg at rest by right heart catheterisation (ESC/ERS 2022); precapillary if PAWP ≤15 and PVR >2 WU, postcapillary if PAWP >15."],
  ["How should anaesthesia avoid acute right heart failure in PH?", "Maintain sinus rhythm, normovolaemia, avoid hypoxia/hypercapnia/acidosis/hypothermia (all raise PVR), preserve coronary perfusion with noradrenaline/vasopressin, and consider inhaled nitric oxide or epoprostenol for acute crises."],
  ["When is mechanical support indicated in decompensated pulmonary hypertension?", "VA-ECMO as bridge to transplant or recovery when refractory to inotropes and inhaled pulmonary vasodilators; atrial septostomy is an alternative palliative option in select centres."],
];

const objectives = [
  "Define pulmonary hypertension using 2022 ESC/ERS haemodynamic criteria and classify by WHO group.",
  "Explain the pathophysiology of RV failure in PH, including the reverse Bernheim effect and the death spiral.",
  "Identify and continue targeted pulmonary vasodilator therapy across the three signalling pathways perioperatively.",
  "Apply an RV-protective anaesthetic strategy: keep MAP > PAP, avoid the PVR triad, optimise preload and ventilation.",
  "Recognise and treat a pulmonary hypertensive crisis using inhaled NO/prostacyclin, vasopressors and RV inotropes.",
  "Manage special PH situations: Eisenmenger syndrome, pregnancy, and acute massive pulmonary embolism.",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Perioperative plan — Group 1 PAH for laparoscopic cholecystectomy",
    scenario: (
      <>
        58-year-old WHO functional class III PAH on macitentan + tadalafil + nebulised iloprost,
        listed for laparoscopic cholecystectomy. Last RHC: mPAP 48 mmHg, PVR 6 WU, CI 2.0
        L/min/m². How would you plan and conduct anaesthesia?
      </>
    ),
    working: (
      <>
        High-risk patient (perioperative mortality 4–25% in PAH). Continue all targeted
        therapy on the morning of surgery (macitentan PO, tadalafil PO, convert iloprost to
        intra-op nebulised dose). Pre-induction arterial line and large-bore access; start
        noradrenaline before induction to maintain SVR. Avoid bolus propofol; use etomidate or
        cautious ketamine + opioid. Tidal volume 6 mL/kg, low PEEP, PaCO₂ 4.5–5 kPa, FiO₂ to
        SpO₂ ≥95%. Beware capnoperitoneum-induced ↑PVR and ↓venous return — ask surgeon to keep
        intra-abdominal pressure ≤12 mmHg, head-down minimised.
      </>
    ),
    answer: (
      <>
        Plan: HDU/ICU bed booked. Pre-op multidisciplinary discussion with the PH centre.
        Continue oral therapy; have inhaled NO/iloprost and dobutamine drawn up. Conduct slow
        induction; maintain MAP 70–80 mmHg with noradrenaline ± vasopressin. TIVA or low-dose
        volatile, no N₂O. Restrictive fluids (≤500 mL crystalloid). Postoperative care in HDU
        for ≥48 h. Have a low threshold to declare a PH crisis and escalate.
      </>
    ),
    cites: ["ESC/ERS PH 2022"],
  },
  {
    title: "Pulmonary hypertensive crisis on ICU",
    scenario: (
      <>
        Day 2 post-op cardiac surgery, idiopathic PAH patient develops sudden hypotension
        (MAP 45), SpO₂ 84%, EtCO₂ falls 5.0 → 2.8 kPa, CVP 22, RV severely dilated on TOE.
        Outline immediate management.
      </>
    ),
    working: (
      <>
        Diagnosis: pulmonary hypertensive crisis with acute RV failure. The priorities are
        simultaneous: <strong>reduce PVR</strong> and <strong>support the failing RV</strong>{" "}
        while maintaining systemic perfusion pressure to perfuse the RV coronary tree.
      </>
    ),
    answer: (
      <>
        FiO₂ 1.0; mild hyperventilation to PaCO₂ 4.0–4.5 kPa, target pH 7.45–7.50. Deepen
        sedation, opioid bolus. Start <strong>inhaled NO 20 ppm</strong> (or nebulised
        iloprost 5–10 µg). Push <strong>noradrenaline</strong> to MAP &gt; PAP and add{" "}
        <strong>vasopressin 0.01–0.04 U/min</strong> if vasoplegic. RV inotropy with{" "}
        <strong>dobutamine 5 µg/kg/min</strong> or milrinone (offset hypotension with
        noradrenaline). Treat the trigger: drain pneumothorax, suction, antibiotics, lyse PE.
        Refractory: VA-ECMO bridge to recovery or transplantation.
      </>
    ),
    cites: ["AHA PH 2018"],
  },
];

const PulmonaryHypertensionTopic = () => {
  return (
    <TopicTemplate
      title="Pulmonary Hypertension Management"
      subtitle="Classification, RV-protective strategy, targeted pulmonary vasodilators, perioperative care and crisis management on ICU"
      backPath="/intensive-care"
      backLabel="Intensive Care"
      accentColor="text-icu"
      objectives={objectives}
      workedExamples={workedExamples}
      keyPoints={[
        { text: "Pulmonary hypertension is defined as a resting mean pulmonary artery pressure (mPAP) ≥20 mmHg (2022 ESC/ERS); pre-capillary PH additionally requires PAWP ≤15 mmHg and PVR >2 Wood units", cites: ["BJA Educ PH 2017"] },
        { text: "The right ventricle is the limiting organ — RV failure is the leading cause of death; the priority of management is to protect coronary perfusion to the RV by maintaining systemic MAP > PAP", cites: ["ESC/ERS PH 2022"] },
        { text: "Avoid the 'PVR triad' of hypoxia, hypercapnia and acidosis; also avoid hypothermia, pain, agitation, high airway pressures and excessive PEEP, all of which acutely raise PVR", cites: ["AHA PH 2018"] },
        { text: "Targeted pulmonary vasodilators (sildenafil, bosentan, macitentan, riociguat, inhaled iloprost, IV epoprostenol, subcutaneous treprostinil) must be continued perioperatively — abrupt withdrawal can precipitate lethal rebound PH", cites: ["BJA Educ PH 2017"] },
        { text: "A pulmonary hypertensive crisis is treated by 100% O₂, mild hyperventilation to pH 7.45–7.50, deepening anaesthesia, inhaled NO (10–40 ppm) or nebulised prostacyclin, noradrenaline/vasopressin to restore SVR, and inotropic RV support with dobutamine or milrinone", cites: ["ESC/ERS PH 2022"] },
      ]}
      topicId="pulmonary-hypertension"
      topicTitle="Pulmonary Hypertension Management"
      quizQuestions={pulmonaryHypertensionQuestions}
      sectionExamMapping={{
        objectives: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC], curriculumCodes: ["FRCA Final CV", "FFICM 4.5", "EDIC 3"] },
        workedExamples: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC] },
        keyPoints: { exams: [Exam.FINAL, Exam.FFICM, Exam.EDIC] },
      }}
      sectionSources={{
        objectives: [
          "ESC/ERS PH 2022",
          "BJA Educ PH 2017",
          "AHA PH 2018",
        ],
        keyPoints: [
          "ESC/ERS PH 2022",
          "BJA Educ PH 2017",
          "Thunberg BJA Educ 2017",
          "AHA PH 2018",
        ],
        workedExamples: ["ESC/ERS PH 2022", "AHA PH 2018"],
      }}
      coreConcepts={
        <>
        <>
          <p className="text-muted-foreground leading-relaxed">
            Pulmonary hypertension is a heterogeneous group of disorders united by elevated pulmonary vascular resistance and right-ventricular vulnerability. Perioperative and ICU mortality is high; the central principle is to protect the right ventricle by maintaining systemic perfusion pressure above pulmonary pressure while avoiding any insult that acutely raises PVR.
          </p>

          <ExamSection
            id="definition"
            exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}
            curriculumCodes={["FRCA Final CV", "FFICM 4.5"]}
            className="scroll-mt-24"
          >
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Definition & Classification</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Haemodynamic Definition (2022 ESC/ERS)</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><strong>Pulmonary hypertension:</strong> resting mPAP ≥20 mmHg measured by right heart catheterisation (lowered from the previous ≥25 mmHg threshold)</li>
                  <li><strong>Pre-capillary PH:</strong> mPAP ≥20, PAWP ≤15 mmHg, PVR &gt;2 Wood units (e.g. PAH, chronic thromboembolic, lung disease)</li>
                  <li><strong>Isolated post-capillary PH:</strong> mPAP ≥20, PAWP &gt;15 mmHg, PVR ≤2 (left heart disease)</li>
                  <li><strong>Combined pre- and post-capillary PH:</strong> mPAP ≥20, PAWP &gt;15, PVR &gt;2 (advanced left heart disease with reactive pulmonary remodelling)</li>
                  <li><strong>Exercise PH:</strong> mPAP/CO slope &gt;3 mmHg/L/min between rest and exercise — recognised in 2022 update</li>
                </ul>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">WHO Clinical Groups</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><strong>Group 1 — PAH:</strong> idiopathic, heritable (BMPR2), drug-induced (anorexigens, methamphetamine), connective tissue disease (scleroderma), HIV, portopulmonary, congenital L→R shunts</li>
                  <li><strong>Group 2 — Left heart disease:</strong> HFrEF, HFpEF, valvular disease (commonest cause of PH overall)</li>
                  <li><strong>Group 3 — Lung disease/hypoxia:</strong> COPD, ILD, OSA, high altitude</li>
                  <li><strong>Group 4 — Chronic thromboembolic PH (CTEPH):</strong> potentially curable by pulmonary endarterectomy</li>
                  <li><strong>Group 5 — Multifactorial/unclear:</strong> sarcoidosis, haematological disorders (sickle cell), metabolic disorders</li>
                </ul>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Severity Markers</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>WHO functional class III/IV, syncope, signs of right heart failure (raised JVP, hepatomegaly, ascites, peripheral oedema)</li>
                  <li>6-minute walk test &lt;165 m, NT-proBNP &gt;1100 ng/L, RA area &gt;26 cm², pericardial effusion</li>
                  <li>Cardiac index &lt;2.0 L/min/m², RA pressure &gt;14 mmHg, mixed venous saturation &lt;60%</li>
                  <li>These translate to a 1-year mortality &gt;20% in the ESC/ERS risk stratification table</li>
                </ul>
              </div>
            </div>
            <PHRiskStratificationCalculator />
          </ExamSection>

          <ExamSection
            id="pathophysiology"
            exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}
            curriculumCodes={["FRCA Final CV", "FFICM 4.5"]}
            className="scroll-mt-24"
          >
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Pathophysiology — From Endothelial Injury to RV Failure</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed mt-2">
              <div className="bg-card rounded-xl border border-border p-4 md:p-6">
                <PHPathophysiologyDiagram />
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>The thin-walled RV is designed for a low-impedance circulation; it tolerates volume but not pressure overload</li>
                  <li>Acute rises in PVR cause RV dilatation → tricuspid regurgitation → further RV dilatation (a vicious cycle)</li>
                  <li>RV dilatation shifts the interventricular septum leftwards (reverse Bernheim effect) → reduced LV preload, reduced cardiac output, systemic hypotension</li>
                  <li>Unlike the LV, the RV is perfused throughout the cardiac cycle; once RV pressure approaches aortic pressure, RV perfusion becomes systolic-only and ischaemia develops</li>
                  <li>The result is a "spiral of death": ↑PVR → RV failure → ↓LV filling → ↓MAP → ↓RV coronary perfusion → worsening RV failure</li>
                </ul>
              </div>
              <div className="bg-card rounded-xl border border-border p-4 md:p-6">
                <RVFailureSpiralDiagram />
              </div>
            </div>
          </ExamSection>

          <ExamSection
            id="targeted-therapy"
            exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}
            curriculumCodes={["FRCA Final CV", "FFICM 4.5"]}
            className="scroll-mt-24"
          >
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Targeted Pulmonary Vasodilator Therapy</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Three Pathways of PAH Therapy</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><strong>Nitric oxide / cGMP pathway:</strong> phosphodiesterase-5 inhibitors (sildenafil, tadalafil); soluble guanylate cyclase stimulator (riociguat — used in CTEPH)</li>
                  <li><strong>Endothelin pathway:</strong> endothelin receptor antagonists — bosentan (dual ETA/ETB), ambrisentan and macitentan (selective ETA). Hepatotoxicity with bosentan; teratogenic</li>
                  <li><strong>Prostacyclin pathway:</strong> inhaled iloprost, IV epoprostenol (very short half-life, 3–5 min — abrupt cessation is fatal), subcutaneous/IV treprostinil, oral selexipag (IP receptor agonist)</li>
                  <li>Group 1 PAH is treated with combination therapy from diagnosis (AMBITION trial — ambrisentan + tadalafil)</li>
                  <li>These agents are <strong>not</strong> indicated for groups 2 or 3 — they may worsen pulmonary oedema by increasing pulmonary blood flow</li>
                </ul>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Inhaled Selective Pulmonary Vasodilators</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><strong>Inhaled nitric oxide (iNO):</strong> 10–40 ppm — selective for ventilated alveoli, no systemic vasodilatation (rapidly inactivated by haemoglobin). Rebound PH on cessation; wean over hours. Methaemoglobinaemia risk &gt;40 ppm</li>
                  <li><strong>Nebulised iloprost or epoprostenol:</strong> alternatives where iNO unavailable; cheaper, similar efficacy in many series</li>
                  <li>Inhaled agents preserve V/Q matching, unlike IV vasodilators which dilate poorly ventilated regions and worsen shunt</li>
                </ul>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Comparative Table — Targeted Pulmonary Vasodilators</h3>
                <p className="text-xs text-muted-foreground mb-3">Doses are typical adult starting/maintenance values; check local protocols. Pathway colour: <span className="text-clinical font-semibold">NO/cGMP</span>, <span className="text-icu font-semibold">Endothelin</span>, <span className="text-perioperative font-semibold">Prostacyclin</span>.</p>
                <div className="overflow-x-auto -mx-4 sm:mx-0">
                  <table className="w-full text-xs border-collapse min-w-[640px]">
                    <thead>
                      <tr className="border-b-2 border-border bg-secondary/30">
                        <th className="text-left p-2 font-semibold text-foreground">Drug</th>
                        <th className="text-left p-2 font-semibold text-foreground">Class / Mechanism</th>
                        <th className="text-left p-2 font-semibold text-foreground">Route &amp; Dose</th>
                        <th className="text-left p-2 font-semibold text-foreground">t½</th>
                        <th className="text-left p-2 font-semibold text-foreground">Key Side Effects / Cautions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border/50 hover:bg-secondary/20">
                        <td className="p-2 font-medium text-foreground"><span className="inline-block w-1.5 h-1.5 rounded-full bg-clinical mr-1.5 align-middle"></span>Sildenafil</td>
                        <td className="p-2 text-muted-foreground">PDE-5 inhibitor → ↑cGMP → pulmonary vasodilation</td>
                        <td className="p-2 text-muted-foreground">PO 20 mg TDS (up to 80 mg TDS); IV 10 mg TDS</td>
                        <td className="p-2 text-muted-foreground">~4 h</td>
                        <td className="p-2 text-muted-foreground">Headache, flushing, dyspepsia, visual disturbance (NAION); contraindicated with nitrates and riociguat</td>
                      </tr>
                      <tr className="border-b border-border/50 hover:bg-secondary/20">
                        <td className="p-2 font-medium text-foreground"><span className="inline-block w-1.5 h-1.5 rounded-full bg-clinical mr-1.5 align-middle"></span>Riociguat</td>
                        <td className="p-2 text-muted-foreground">Soluble guanylate cyclase stimulator (NO-independent ↑cGMP)</td>
                        <td className="p-2 text-muted-foreground">PO 1 mg TDS, titrated to 2.5 mg TDS</td>
                        <td className="p-2 text-muted-foreground">5–10 h</td>
                        <td className="p-2 text-muted-foreground">Hypotension, syncope, haemoptysis; teratogenic (REMS programme); only oral agent licensed for CTEPH; never combine with PDE-5i or nitrates</td>
                      </tr>
                      <tr className="border-b border-border/50 hover:bg-secondary/20">
                        <td className="p-2 font-medium text-foreground"><span className="inline-block w-1.5 h-1.5 rounded-full bg-icu mr-1.5 align-middle"></span>Bosentan</td>
                        <td className="p-2 text-muted-foreground">Dual ET<sub>A</sub>/ET<sub>B</sub> endothelin receptor antagonist</td>
                        <td className="p-2 text-muted-foreground">PO 62.5 mg BD × 4 wk → 125 mg BD</td>
                        <td className="p-2 text-muted-foreground">~5 h (active metabolite ~9 h)</td>
                        <td className="p-2 text-muted-foreground">Hepatotoxicity (monthly LFTs mandatory), anaemia, peripheral oedema; teratogenic; CYP3A4/2C9 inducer — reduces warfarin and OCP levels</td>
                      </tr>
                      <tr className="border-b border-border/50 hover:bg-secondary/20">
                        <td className="p-2 font-medium text-foreground"><span className="inline-block w-1.5 h-1.5 rounded-full bg-icu mr-1.5 align-middle"></span>Macitentan</td>
                        <td className="p-2 text-muted-foreground">Dual ET<sub>A</sub>/ET<sub>B</sub> antagonist (high tissue affinity)</td>
                        <td className="p-2 text-muted-foreground">PO 10 mg OD</td>
                        <td className="p-2 text-muted-foreground">~16 h (parent), ~48 h (active metabolite)</td>
                        <td className="p-2 text-muted-foreground">Anaemia (monitor Hb), nasopharyngitis, headache; less hepatotoxicity than bosentan but still teratogenic; SERAPHIN trial — first to show morbidity/mortality benefit</td>
                      </tr>
                      <tr className="border-b border-border/50 hover:bg-secondary/20">
                        <td className="p-2 font-medium text-foreground"><span className="inline-block w-1.5 h-1.5 rounded-full bg-perioperative mr-1.5 align-middle"></span>Iloprost</td>
                        <td className="p-2 text-muted-foreground">Synthetic prostacyclin (PGI₂) analogue → IP receptor → ↑cAMP</td>
                        <td className="p-2 text-muted-foreground">Inhaled (nebulised) 2.5–5 µg, 6–9 times/day; IV in crisis</td>
                        <td className="p-2 text-muted-foreground">20–30 min</td>
                        <td className="p-2 text-muted-foreground">Cough, jaw pain, flushing, hypotension; bronchospasm; frequent dosing burdens patients</td>
                      </tr>
                      <tr className="border-b border-border/50 hover:bg-secondary/20">
                        <td className="p-2 font-medium text-foreground"><span className="inline-block w-1.5 h-1.5 rounded-full bg-perioperative mr-1.5 align-middle"></span>Epoprostenol</td>
                        <td className="p-2 text-muted-foreground">Native prostacyclin (PGI₂) — most potent pulmonary vasodilator</td>
                        <td className="p-2 text-muted-foreground">Continuous IV via tunnelled central line; start 2 ng/kg/min, titrate</td>
                        <td className="p-2 text-muted-foreground"><strong className="text-destructive">3–5 min</strong></td>
                        <td className="p-2 text-muted-foreground"><strong>Abrupt cessation is fatal</strong> — rebound PH crisis. Line sepsis, jaw pain, diarrhoea, thrombocytopenia. Only agent with mortality benefit in WHO IV PAH</td>
                      </tr>
                      <tr className="border-b border-border/50 hover:bg-secondary/20">
                        <td className="p-2 font-medium text-foreground"><span className="inline-block w-1.5 h-1.5 rounded-full bg-perioperative mr-1.5 align-middle"></span>Treprostinil</td>
                        <td className="p-2 text-muted-foreground">Stable prostacyclin analogue (longer half-life)</td>
                        <td className="p-2 text-muted-foreground">SC infusion (1.25 ng/kg/min, titrated), IV, inhaled QDS, or PO</td>
                        <td className="p-2 text-muted-foreground">~4 h</td>
                        <td className="p-2 text-muted-foreground">SC infusion site pain (limits use); same prostacyclin class effects; longer t½ allows safer transient interruption than epoprostenol</td>
                      </tr>
                      <tr className="hover:bg-secondary/20">
                        <td className="p-2 font-medium text-foreground"><span className="inline-block w-1.5 h-1.5 rounded-full bg-perioperative mr-1.5 align-middle"></span>Selexipag</td>
                        <td className="p-2 text-muted-foreground">Selective oral IP-receptor agonist (non-prostanoid)</td>
                        <td className="p-2 text-muted-foreground">PO 200 µg BD, titrated weekly to max 1600 µg BD</td>
                        <td className="p-2 text-muted-foreground">~1 h (active metabolite ~10 h)</td>
                        <td className="p-2 text-muted-foreground">Headache, diarrhoea, jaw pain, nausea; GRIPHON trial showed reduced morbidity events; oral alternative to parenteral prostacyclins</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-[11px] text-muted-foreground italic mt-3">
                  Group 1 PAH is treated with upfront combination therapy (e.g. ambrisentan + tadalafil, AMBITION trial). These agents are <strong>not</strong> indicated in Group 2 (left heart) or uncomplicated Group 3 PH — they may worsen pulmonary oedema or V/Q mismatch. <strong>Never abruptly stop</strong> any of these drugs perioperatively.
                </p>
              </div>
            </div>
          </ExamSection>

          <ExamSection
            id="perioperative"
            exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}
            curriculumCodes={["FRCA Final CV", "FFICM 4.5", "EDIC 3"]}
            className="scroll-mt-24"
          >
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Perioperative & ICU Management</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Goals (the "RV-protective" strategy)</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Maintain MAP &gt; PAP — coronary perfusion of the failing RV depends on systemic pressure</li>
                  <li>Keep PVR low: avoid hypoxia, hypercarbia, acidosis, hypothermia, pain, light anaesthesia, high airway pressures</li>
                  <li>Optimise preload — neither under- nor over-filled. CVP target typically 8–12 mmHg; bedside echo to assess RV filling</li>
                  <li>Maintain sinus rhythm — atrial kick contributes ≥30% of RV output in PH; cardiovert AF promptly</li>
                  <li>Continue background pulmonary vasodilator therapy without interruption — convert oral agents to IV/inhaled if NBM</li>
                </ul>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Vasopressors & Inotropes</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li><strong>Noradrenaline:</strong> first-line vasopressor — increases SVR &gt; PVR, restores RV coronary perfusion</li>
                  <li><strong>Vasopressin (0.01–0.04 U/min):</strong> increases SVR with little effect on PVR; useful adjunct, particularly in vasoplegia</li>
                  <li><strong>Dobutamine (2–10 µg/kg/min):</strong> RV inodilator of choice; mild pulmonary vasodilatation; watch for tachyarrhythmias at higher doses</li>
                  <li><strong>Milrinone:</strong> PDE-3 inhibitor — inotrope and pulmonary vasodilator; often combined with noradrenaline to offset systemic vasodilatation. Inhaled milrinone selective for pulmonary circulation</li>
                  <li><strong>Avoid:</strong> phenylephrine (raises PVR more than SVR), high-dose adrenaline (tachyarrhythmia, ↑PVR)</li>
                </ul>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Anaesthetic Conduct</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Pre-induction arterial line; large-bore IV access; vasopressor running before induction</li>
                  <li>Induction: etomidate or careful ketamine + opioid; avoid bolus propofol which causes precipitous SVR drop</li>
                  <li>Maintenance: opioid-based, low-dose volatile or TIVA; avoid N₂O (raises PVR and expands air emboli)</li>
                  <li>Ventilation: tidal volume 6 mL/kg, lowest plateau pressure achievable, PEEP titrated (excess PEEP raises PVR and reduces RV preload)</li>
                  <li>Regional/neuraxial anaesthesia is attractive (avoids IPPV) but profound sympathectomy can be catastrophic — incremental epidural preferred over single-shot spinal</li>
                  <li>Postoperative HDU/ICU; high risk of decompensation in first 48 h, particularly after fluid shifts and re-mobilisation</li>
                </ul>
              </div>
            </div>
          </ExamSection>

          <ExamSection
            id="crisis"
            exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}
            curriculumCodes={["FFICM 4.5", "EDIC 3"]}
            className="scroll-mt-24"
          >
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Pulmonary Hypertensive Crisis</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Recognition</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Acute rise in PAP toward or above systemic pressure with falling cardiac output</li>
                  <li>Sudden hypotension, desaturation, rising CVP, falling EtCO₂, distended neck veins, RV dilatation on echo</li>
                  <li>Triggers: hypoxia, hypercarbia, pain, suctioning, high PEEP, sepsis, missed pulmonary vasodilator dose, pulmonary embolism</li>
                </ul>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Immediate Management — "Reduce PVR, Support RV"</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>FiO₂ 1.0; mild hyperventilation to PaCO₂ 4.0–4.5 kPa, target pH 7.45–7.50</li>
                  <li>Deepen anaesthesia/sedation; opioid bolus to suppress sympathetic drive</li>
                  <li>Start inhaled NO 20 ppm (or nebulised iloprost 5–10 µg) — selective pulmonary vasodilatation</li>
                  <li>Noradrenaline ± vasopressin to push MAP &gt; PAP and restore RV coronary perfusion</li>
                  <li>Add dobutamine or milrinone for RV inotropic support</li>
                  <li>Treat the trigger: drain pneumothorax, evacuate gastric distension, suction airway, give antibiotics, lyse/embolectomy for PE</li>
                  <li>Consider VA-ECMO as a bridge to recovery, transplantation, or pulmonary endarterectomy in refractory cases</li>
                </ul>
              </div>
            </div>
          </ExamSection>

          <ExamSection
            id="special"
            exams={[Exam.FINAL, Exam.FFICM, Exam.EDIC]}
            curriculumCodes={["FRCA Final CV", "FFICM 4.5"]}
            className="scroll-mt-24"
          >
            <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Special Situations</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Eisenmenger Syndrome</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Long-standing L→R shunt that has reversed to R→L due to suprasystemic pulmonary pressures — pulmonary vasculature is fixed</li>
                  <li>Perioperative mortality 7–30%; falls in SVR worsen the R→L shunt and cause profound desaturation</li>
                  <li>Strict de-airing of all IV lines (paradoxical air embolism); maintain SVR aggressively; avoid pulmonary vasodilators (no benefit, may worsen shunt)</li>
                </ul>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Pregnancy</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Maternal mortality with PAH 16–30%; pregnancy is contraindicated and termination should be discussed</li>
                  <li>Highest risk in the third trimester and early postpartum (up to 4 weeks) due to autotransfusion and fluid shifts</li>
                  <li>Multidisciplinary care in a specialist pulmonary hypertension centre; planned early delivery, incremental epidural, avoidance of ergometrine</li>
                </ul>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2">Acute (Massive) Pulmonary Embolism</h3>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Acute RV failure on a normal RV — clot burden + hypoxic vasoconstriction + neurohumoral release</li>
                  <li>Systemic thrombolysis (alteplase 100 mg over 2 h) for haemodynamic instability; surgical/catheter embolectomy or VA-ECMO if thrombolysis fails or is contraindicated</li>
                  <li>Cautious fluid (≤500 mL); avoid over-filling the dilated RV. Noradrenaline + dobutamine; iNO if available</li>
                </ul>
              </div>
            </div>
          </ExamSection>

          <SynthesisBlock
            title="Pulmonary Hypertension — Perioperative Synthesis"
            subtitle="Avoiding the right-ventricular death spiral in the patient with PH."
            variant="summary"
          >
            <ul className="space-y-2 list-disc list-inside text-sm">
              <li><strong>Diagnosis (2022 ESC/ERS)</strong>: mean PAP &gt;20 mmHg at rest by RHC. Group 1 (PAH) = PVR &gt;2 WU and PCWP ≤15.</li>
              <li><strong>Avoid the killers</strong>: hypoxia, hypercapnia, acidosis, hypothermia — all ↑PVR. Maintain SVR with noradrenaline / vasopressin.</li>
              <li><strong>Pulmonary vasodilators</strong>: inhaled NO (5–40 ppm) or epoprostenol — selectively reduce PVR without dropping SVR.</li>
              <li><strong>RV support</strong>: dobutamine or milrinone for inotropy; vasopressin preserves coronary perfusion to RV.</li>
              <li><strong>Anaesthetic technique</strong>: regional preferred where feasible; if GA — slow induction, etomidate + opioid; avoid N₂O (↑PVR), high airway pressures, dynamic hyperinflation.</li>
              <li><strong>Refractory failure</strong>: VA-ECMO bridge; consider transfer to PH centre.</li>
            </ul>
          </SynthesisBlock>
          <ExamPitfallsCallout
            accent="icu"
            pitfalls={[
              "WHO groups: 1 PAH, 2 left heart disease, 3 lung disease/hypoxia, 4 CTEPH, 5 multifactorial.",
              "Anaesthetic principles: avoid hypoxia, hypercapnia, acidosis, hypothermia, light anaesthesia — all worsen PVR.",
              "RV-protective strategy: maintain coronary perfusion (high diastolic BP), avoid fluid overload, low airway pressures.",
              "Targeted vasodilators: inhaled NO/prostacyclin (selective), sildenafil, bosentan — systemic agents risk hypotension.",
              "PH crisis: noradrenaline/vasopressin for systemic BP, inhaled pulmonary vasodilator, treat trigger — high mortality.",
            ]}
          />
        </>
          <TopicFaqs faqs={pulmonaryHypertensionFaqs} />
        </>
      }
    />
  );
};

export default PulmonaryHypertensionTopic;
