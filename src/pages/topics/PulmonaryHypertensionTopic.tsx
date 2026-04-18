import { SectionLayout } from "@/components/SectionLayout";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";
import { pulmonaryHypertensionQuestions } from "@/data/quizzes";
import RVFailureSpiralDiagram from "@/components/diagrams/RVFailureSpiralDiagram";
import PHRiskStratificationCalculator from "@/components/diagrams/PHRiskStratificationCalculator";

const keyPoints = [
  "Pulmonary hypertension is defined as a resting mean pulmonary artery pressure (mPAP) ≥20 mmHg (2022 ESC/ERS); pre-capillary PH additionally requires PAWP ≤15 mmHg and PVR >2 Wood units",
  "The right ventricle is the limiting organ — RV failure is the leading cause of death; the priority of management is to protect coronary perfusion to the RV by maintaining systemic MAP > PAP",
  "Avoid the 'PVR triad' of hypoxia, hypercapnia and acidosis; also avoid hypothermia, pain, agitation, high airway pressures and excessive PEEP, all of which acutely raise PVR",
  "Targeted pulmonary vasodilators (sildenafil, bosentan, macitentan, riociguat, inhaled iloprost, IV epoprostenol, subcutaneous treprostinil) must be continued perioperatively — abrupt withdrawal can precipitate lethal rebound PH",
  "A pulmonary hypertensive crisis is treated by 100% O₂, mild hyperventilation to pH 7.45–7.50, deepening anaesthesia, inhaled NO (10–40 ppm) or nebulised prostacyclin, noradrenaline/vasopressin to restore SVR, and inotropic RV support with dobutamine or milrinone",
];

const PulmonaryHypertensionTopic = () => {
  return (
    <SectionLayout
      title="Pulmonary Hypertension Management"
      subtitle="Classification, RV-protective strategy, targeted pulmonary vasodilators, perioperative care and crisis management on ICU"
      backPath="/intensive-care"
      backLabel="Intensive Care Medicine"
      accentColor="text-icu"
    >
      <div className="space-y-8">
        {/* Definition & Classification */}
        <section>
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
        </section>

        {/* Pathophysiology of RV Failure */}
        <section>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Pathophysiology — Why the RV Fails</h2>
          <RVFailureSpiralDiagram />
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-4">
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>The thin-walled RV is designed for a low-impedance circulation; it tolerates volume but not pressure overload</li>
                <li>Acute rises in PVR cause RV dilatation → tricuspid regurgitation → further RV dilatation (a vicious cycle)</li>
                <li>RV dilatation shifts the interventricular septum leftwards (reverse Bernheim effect) → reduced LV preload, reduced cardiac output, systemic hypotension</li>
                <li>Unlike the LV, the RV is perfused throughout the cardiac cycle; once RV pressure approaches aortic pressure, RV perfusion becomes systolic-only and ischaemia develops</li>
                <li>The result is a "spiral of death": ↑PVR → RV failure → ↓LV filling → ↓MAP → ↓RV coronary perfusion → worsening RV failure</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Targeted PAH Therapy */}
        <section>
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
                    {/* NO/cGMP pathway */}
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
                    {/* Endothelin pathway */}
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
                    {/* Prostacyclin pathway */}
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
        </section>

        <section>
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
        </section>

        {/* Pulmonary Hypertensive Crisis */}
        <section>
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
        </section>

        {/* Special Situations */}
        <section>
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
        </section>

        <KeyLearningPoints points={keyPoints} />

        <QuizSection questions={pulmonaryHypertensionQuestions} />
        <ReferencesList topicId="pulmonary-hypertension" />
        <SeeAlso topicId="pulmonary-hypertension" />
        <TopicCompletionToggle topicId="pulmonary-hypertension" topicTitle="Pulmonary Hypertension Management" />
      </div>
    </SectionLayout>
  );
};

export default PulmonaryHypertensionTopic;
