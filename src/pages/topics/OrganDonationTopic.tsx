import { TopicTemplate } from "@/components/TopicTemplate";
import { TopicFaqs } from "@/components/TopicFaqs";
import { CollapsibleSubsection } from "@/components/CollapsibleSubsection";
import { ExamSection } from "@/components/ExamSection";
import { SynthesisBlock } from "@/components/SynthesisBlock";
import { organDonationQuestions } from "@/data/quizzes";
import type { WorkedExample } from "@/components/WorkedExamples";
import { Exam } from "@/data/curriculum";
import { ExamPitfallsCallout } from "@/components/ExamPitfallsCallout";
import { DiagramSection } from "@/components/DiagramSection";
import { BrainstemDeathCascadeDiagram } from "@/components/diagrams/BrainstemDeathCascadeDiagram";

const organDonationFaqs: Array<[string, string]> = [
  ["What are the UK criteria for brainstem death testing?", "Coma of known irreversible cause, exclusion of confounders (drugs, hypothermia <34 °C, metabolic/endocrine disturbance), absent brainstem reflexes (pupillary, corneal, oculocephalic, oculovestibular, gag, cough) and apnoea test with PaCO₂ rise >0.5 kPa above 6.0 kPa with pH <7.40 (AoMRC 2008)."],
  ["What physiological derangements occur after brainstem death?", "Catecholamine storm followed by vasodilation, diabetes insipidus (DDAVP/vasopressin), hypothermia, coagulopathy and pituitary failure; manage with the 'rule of 100s' — SBP >100, urine output ~100 mL/h, PaO₂ >100, Hb >100 g/L."],
  ["How does DCD differ from DBD for donation?", "DCD (Maastricht III) occurs after planned withdrawal with death by circulatory criteria and a 5-minute 'no-touch' period; warm ischaemic time limits organ viability (typically <30 min for liver, <2 h for kidney) and outcomes are slightly inferior for some grafts but improve donor numbers."],
];

const objectives = [
  "Distinguish DBD and DCD pathways and the legal time of death for each.",
  "Perform UK brainstem death testing — prerequisites, six reflexes, and the apnoea test (PaCO₂ >6.65 kPa with rise >0.5 kPa).",
  "Identify confounders that may render BSD testing unreliable and select appropriate ancillary investigations.",
  "Optimise the brainstem-dead donor across cardiovascular, respiratory, endocrine, and metabolic domains.",
  "Discuss the ethical framework for normothermic regional perfusion (NRP) — permanence vs irreversibility, dead donor rule, cerebral exclusion.",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Apnoea test — getting the numbers right",
    scenario: (
      <>
        You are about to perform the apnoea component of brainstem death testing. Baseline ABG on
        SIMV: PaO₂ 32 kPa, PaCO₂ 4.8 kPa. How do you proceed and what targets confirm an absent
        respiratory drive?
      </>
    ),
    working: (
      <>
        Pre-oxygenate with FiO₂ 1.0 for ≥10 min and adjust ventilation to bring baseline PaCO₂ to
        ~5.0 kPa (40 mmHg). Disconnect from the ventilator and deliver 6 L/min O₂ via a tracheal
        catheter to prevent hypoxaemia. Observe for chest/abdominal movement for 5 min (longer if
        target PaCO₂ not yet reached). The test is positive (i.e. confirms apnoea) when PaCO₂
        rises to <strong>&gt;6.65 kPa (50 mmHg)</strong> AND has risen by <strong>&gt;0.5 kPa</strong>{" "}
        from baseline with no respiratory effort.
      </>
    ),
    answer: (
      <>
        Reconnect to the ventilator immediately after the test. The legal time of death is recorded
        as the completion of the <strong>first</strong> set of tests (not the second). Spinal
        reflexes can persist after BSD and do not invalidate the diagnosis.
      </>
    ),
    cites: ["BJA Educ 2016"],
  },
  {
    title: "DCD III — withdrawal-to-retrieval timing",
    scenario: (
      <>
        A patient with catastrophic brain injury but who does not fulfil BSD criteria is to undergo
        WLST as Maastricht III DCD donation. SBP drops to 45 mmHg at 12 min after extubation;
        cardiac arrest at 28 min. What are the time markers and the implications?
      </>
    ),
    working: (
      <>
        <strong>Functional warm ischaemia time (fWIT)</strong> begins when SBP &lt; 50 mmHg. After
        cardiac arrest there is a mandatory <strong>5-minute hands-off observation</strong>;
        legal time of death = end of the 5 min. Cold perfusion should start within ~10 min of
        death; the standdown threshold (after which donation does not proceed) is typically 2–3 h
        from withdrawal — beyond this WIT is too prolonged for viable retrieval.
      </>
    ),
    answer: (
      <>
        fWIT starts at 12 min, death confirmed 33 min after extubation, target cold perfusion by
        ~43 min. Total fWIT for liver should be &lt;20 min, kidneys &lt;30 min — so this is borderline
        for liver. Discuss with retrieval team; abdominal NRP can salvage borderline organs by
        restoring oxygenated perfusion in situ.
      </>
    ),
    cites: ["NICE CG135"],
  },
];

const OrganDonationTopic = () => {
  return (
    <TopicTemplate
      title="Organ Donation"
      subtitle="FFICM / EDIC — Intensive Care"
      backPath="/intensive-care"
      backLabel="Intensive Care"
      accentColor="text-icu"
      objectives={objectives}
      workedExamples={workedExamples}
      keyPoints={[
        { text: "DCD now accounts for ~60% of deceased organ donations in the UK — Category III (controlled) is most common", cites: ["AoMRC 2008"] },
        { text: "Maastricht classification: 5 categories — only Category III (awaiting cardiac arrest after WLST) is routinely used in UK", cites: ["BJA Educ 2016"] },
        { text: "5-minute mandatory standoff after circulatory arrest before death can be confirmed", cites: ["NICE CG135"] },
        { text: "Functional warm ischaemia time starts when SBP < 50 mmHg — target < 30 min for kidneys, < 20 min for liver", cites: ["AoMRC 2008"] },
        { text: "Abdominal NRP: femoral cannulation + ECMO circuit with arch vessel exclusion — no cerebral reperfusion", cites: ["BJA Educ 2016"] },
        { text: "TA-NRP enables DCD heart transplantation — outcomes approaching DBD levels at 1 year", cites: ["NICE CG135"] },
        { text: "NRP reduces DCD liver discard and ischaemic cholangiopathy; reduces kidney DGF from ~50% to ~20%", cites: ["AoMRC 2008"] },
        { text: "Ethical framework: permanence vs irreversibility, dead donor rule, cerebral exclusion as safeguard", cites: ["BJA Educ 2016"] },
        { text: "AoMRC (2021) endorses NRP as ethically acceptable provided arch vessels are excluded before perfusion", cites: ["NICE CG135"] },
        { text: "Legal time of death: BSD = completion of first set of tests; DCD = end of 5-minute standoff — NRP does not reverse death", cites: ["AoMRC 2008"] },
      ]}
      topicId="organ-donation"
      topicTitle="Organ Donation"
      quizQuestions={organDonationQuestions}
      sectionSources={{
        objectives: ["AoMRC 2008", "NICE CG135", "BJA Educ 2016"],
        workedExamples: ["AoMRC 2008", "BJA Educ 2016", "NICE CG135"],
        keyPoints: ["AoMRC 2008", "NICE CG135", "BJA Educ 2016"],
      }}
      sectionExamMapping={{
        objectives: { exams: [Exam.FFICM, Exam.EDIC], curriculumCodes: ["FFICM 5.5", "EDIC 7.1"] },
        workedExamples: { exams: [Exam.FFICM, Exam.EDIC] },
        keyPoints: { exams: [Exam.FFICM, Exam.EDIC] },
      }}
      coreConcepts={
        <>
        <>
          <ExamSection id="types" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Types of Organ Donation" defaultOpen>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">DBD</p>
                <p className="text-sm text-muted-foreground mt-1">Brainstem death confirmed by 2 sets of tests. Time of death = completion of first set. Better graft outcomes (less warm ischaemia). ~40% of UK deceased donors.</p>
              </div>
              <div className="p-4 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">DCD</p>
                <p className="text-sm text-muted-foreground mt-1">WLST → circulatory arrest → 5-min standoff → death confirmed → retrieval. Now ~60% of UK donations. Maastricht Cat III most common.</p>
              </div>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="legal" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Legal & Ethical Framework (UK)">
            <div className="space-y-2">
              {[
                { point: "Deemed Consent (2020)", detail: "England, Scotland, Wales: opt-out unless excluded or opted out." },
                { point: "SN-OD", detail: "Specialist Nurse for Organ Donation must be involved in all potential donation conversations. Collaborative requesting improves consent." },
                { point: "Excluded groups", detail: "Children <18, never-capacitous adults, temporary residents (<12 months), opted-out individuals." },
                { point: "Coroner / Procurator Fiscal", detail: "Must be consulted in reportable deaths. Can refuse but cannot consent." },
              ].map((p) => (
                <div key={p.point} className="p-3 rounded-lg bg-secondary/30 border border-border">
                  <p className="font-semibold text-foreground text-sm">{p.point}</p>
                  <p className="text-sm text-muted-foreground mt-1">{p.detail}</p>
                </div>
              ))}
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="bsd-testing" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Brainstem Death Testing">
            <p className="text-muted-foreground leading-relaxed mb-3">
              UK definition (AoMRC 2008): irreversible loss of capacity for consciousness combined with irreversible loss of capacity to breathe. Two sets of tests by two senior doctors (one a consultant), both registered &gt;5 years, neither part of the transplant team.
            </p>
            <h3 className="text-lg font-serif font-bold text-foreground mb-2">Prerequisites</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground mb-4">
              <li><strong>Known aetiology</strong> sufficient to explain the picture (massive ICH, severe TBI, hypoxic injury post-arrest).</li>
              <li><strong>Exclude reversible causes</strong>: core temp ≥34°C; no residual sedation/paralysis; no severe metabolic/endocrine derangement; no unresuscitated shock.</li>
              <li><strong>Apnoea pre-condition</strong>: ventilated for inadequate spontaneous respiration.</li>
            </ol>
            <h3 className="text-lg font-serif font-bold text-foreground mb-2">Six brainstem reflexes (bilateral)</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground mb-4">
              <li><strong>Pupillary</strong> (CN II, III) — fixed, unreactive.</li>
              <li><strong>Corneal</strong> (CN V, VII) — no blink. Avoid corneal damage.</li>
              <li><strong>Vestibulo-ocular</strong> (CN III, VI, VIII) — clear EAC, 50 mL ice-cold water each ear, observe 1 min — no eye movement.</li>
              <li><strong>Motor in CN distribution</strong> (CN V, VII) — central painful stimulus → no facial response. Spinal reflexes may persist (do NOT preclude BSD).</li>
              <li><strong>Gag</strong> (CN IX, X) — no response to spatula/suction.</li>
              <li><strong>Cough</strong> (CN X) — no response to deep tracheal suction.</li>
            </ol>
            <h3 className="text-lg font-serif font-bold text-foreground mb-2">Apnoea test</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Pre-oxygenate with 100% O₂ ≥10 min, set baseline PaCO₂ ~5.0 kPa, disconnect with tracheal O₂ insufflation 6 L/min, observe 5 min for any respiratory effort. Confirm <strong>PaCO₂ &gt;6.65 kPa AND rise &gt;0.5 kPa</strong> from baseline. Reconnect immediately.
            </p>
            <div className="p-3 rounded-lg bg-secondary/50 border border-primary/20">
              <p className="text-sm font-semibold text-foreground mb-1">Time of death</p>
              <p className="text-sm text-muted-foreground">Legal time of death = completion of the <strong>first</strong> set of tests. There is no mandatory interval before the second set.</p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="bsd-redflags" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Red Flags & Ancillary Tests">
            <p className="text-muted-foreground text-sm mb-3">Confounders that may render testing unreliable: residual sedation (esp. thiopentone, opioids in renal/hepatic failure), residual paralysis, hypothermia (&lt;34°C), severe metabolic derangement, high cervical injury, GBS / locked-in, cranial nerve injury, pre-existing pupil abnormalities, isolated posterior fossa pathology, neonates &lt;2 months. Use ancillary tests when clinical assessment cannot be completed: <strong>CT angiography</strong> (4-point scoring; increasingly used in UK), <strong>4-vessel angiography</strong> (gold standard internationally), EEG (limited), TCD (operator-dependent).</p>
            </CollapsibleSubsection>
          </ExamSection>

          <DiagramSection
            id="bsd-cascade"
            title="Brainstem Death Cascade & Donor Optimisation"
            intro="After coning the donor passes through three predictable physiological phases. Recognising the current phase guides the right intervention — short-acting vasodilators during the storm, vasopressin-led support during vasoplegia, and DDAVP plus methylprednisolone once endocrine collapse develops."
          >
            <BrainstemDeathCascadeDiagram />
          </DiagramSection>

          <ExamSection id="donor-mgmt" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Physiological Management of the Donor">
            <div className="space-y-2">
              {[
                { system: "Cardiovascular", goal: "MAP >60 mmHg. Vasopressin 0.5–4 U/h (treats DI + hypotension). Noradrenaline if needed. Avoid high-dose inotropes." },
                { system: "Respiratory", goal: "VT 6–8 ml/kg, PEEP 5–10. Target PaO₂/FiO₂ >300 for lung retrieval. Recruitment, bronchoscopy." },
                { system: "Endocrine", goal: "DI in ~65% — DDAVP 1–2 µg IV. Methylprednisolone 15 mg/kg. T3/T4 controversial but commonly used." },
                { system: "Temperature", goal: "Active warming to 35–37°C." },
                { system: "Metabolic", goal: "Na⁺ <155 mmol/L. Glucose 4–10. Correct electrolytes." },
              ].map((s) => (
                <div key={s.system} className="flex gap-3 p-3 rounded border border-border">
                  <span className="font-bold text-primary text-sm whitespace-nowrap">{s.system}</span>
                  <span className="text-sm text-muted-foreground">{s.goal}</span>
                </div>
              ))}
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="dcd" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="DCD — Pathway & Maastricht Classification">
            <p className="text-muted-foreground leading-relaxed mb-3">
              DCD ~60% of UK deceased donations. Functional WIT begins when SBP &lt;50 mmHg. Mandatory 5-min hands-off period after asystole; legal time of death = end of 5 min.
            </p>
            <div className="space-y-2 mb-4">
              {[
                { c: "I — Dead on arrival", d: "Uncontrolled. Rare in UK." },
                { c: "II — Failed resuscitation", d: "Uncontrolled. Used in some EU centres; not UK." },
                { c: "III — Awaiting cardiac arrest after WLST", d: "Controlled. ~95% of UK DCD." },
                { c: "IV — Arrest after BSD", d: "Uncommon — switch from DBD to DCD pathway." },
                { c: "V — Unexpected hospital arrest", d: "Not in UK classification." },
              ].map((m) => (
                <div key={m.c} className="p-3 rounded border border-border">
                  <p className="font-bold text-primary text-sm">{m.c}</p>
                  <p className="text-sm text-muted-foreground">{m.d}</p>
                </div>
              ))}
            </div>
            <div className="grid sm:grid-cols-3 gap-3 mb-4">
              {[
                { l: "fWIT start", v: "SBP < 50 mmHg" },
                { l: "fWIT end", v: "Cold perfusion starts" },
                { l: "Target", v: "<30 min kidney, <20 min liver" },
              ].map((w) => (
                <div key={w.l} className="p-3 rounded-lg bg-secondary/30 border border-border text-center">
                  <p className="text-xs text-muted-foreground">{w.l}</p>
                  <p className="font-semibold text-foreground text-sm mt-1">{w.v}</p>
                </div>
              ))}
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="nrp" exams={[Exam.FFICM, Exam.EDIC]} className="scroll-mt-24">
            <CollapsibleSubsection title="Normothermic Regional Perfusion (NRP)">
            <p className="text-muted-foreground leading-relaxed mb-4">
              NRP restores warm oxygenated blood flow to donor organs <em>in situ</em> after DCD death is confirmed. <strong>Abdominal NRP (aNRP)</strong>: femoral cannulation, arch vessels clamped/balloon-occluded to prevent cerebral reperfusion. <strong>TA-NRP</strong>: also perfuses thoracic organs — enables DCD heart transplantation. Critical step is <strong>arch vessel exclusion before initiating NRP</strong>.
            </p>
            <h3 className="text-lg font-serif font-bold text-foreground mb-2">Ethical framework</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground mb-4">
              <li><strong>Permanence vs irreversibility</strong> — UK uses "irreversible" cessation; the 5-min standoff demonstrates permanence. NRP is justified by cerebral exclusion preventing consciousness restoration.</li>
              <li><strong>Dead donor rule</strong> — death is confirmed before NRP starts; perfusion does not reverse death.</li>
              <li><strong>AoMRC (2021)</strong> endorses NRP provided: death properly confirmed, arch vessels excluded, no cerebral reperfusion possible, family informed and consents.</li>
              <li><strong>Legal time of death is unchanged</strong> by subsequent restoration of regional circulation (UK legal opinion via NHSBT).</li>
            </ul>
            <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5">
              <p className="text-sm font-semibold text-destructive">⚠ Cerebral Exclusion Is the Safeguard</p>
              <p className="text-sm text-muted-foreground mt-1">The ethical legitimacy of NRP rests entirely on confirming arch vessel occlusion <em>before</em> the circuit starts.</p>
            </div>
            </CollapsibleSubsection>
          </ExamSection>

          <SynthesisBlock
            title="Organ Donation — Pathway at a Glance"
            subtitle="The two donation pathways, the triggers for SN-OD referral, and the donor optimisation bundle."
            variant="summary"
          >
            <ul className="space-y-2 list-disc list-inside text-sm">
              <li><strong>DBD</strong>: BSD confirmed by 2 doctors / 2 sets of tests; physiological support continued until retrieval.</li>
              <li><strong>DCD</strong>: WLST planned and BSD will not occur — Maastricht III; controlled withdrawal with rapid retrieval after 5-min standoff.</li>
              <li><strong>Refer SN-OD early</strong>: any catastrophic brain injury where BSD or WLST is being considered. Referral does not commit to donation.</li>
              <li><strong>Donor optimisation (DBD)</strong>: lung-protective ventilation, MAP ≥65, hormonal therapy, normothermia, glycaemic control.</li>
              <li><strong>Family approach</strong>: collaborative between intensivist and SN-OD, separate from prognosis discussion.</li>
            </ul>
          </SynthesisBlock>
          <ExamPitfallsCallout
            accent="icu"
            pitfalls={[
              "DBD: brain-stem death testing — two doctors, two sets ≥6 h apart, prerequisites met.",
              "DCD: planned withdrawal in identified candidates — controlled (Maastricht III) is the commonest UK pathway.",
              "Donor optimisation: cardiovascular stability (noradrenaline + vasopressin), lung-protective ventilation, T4/methylprednisolone, glycaemic control.",
              "SNOD referral early — even before brain-stem death testing or withdrawal decisions.",
              "Family approach: ideally separate from withdrawal discussion; respect documented organ-donor decisions.",
            ]}
          />
        </>
          <TopicFaqs faqs={organDonationFaqs} />
        </>
      }
    />
  );
};

export default OrganDonationTopic;
