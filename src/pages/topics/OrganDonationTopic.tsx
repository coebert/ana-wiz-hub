import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { organDonationQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";

const OrganDonationTopic = () => {
  return (
    <SectionLayout title="Organ Donation" subtitle="FRCA / FFICM — Intensive Care" backPath="/intensive-care" backLabel="Intensive Care" accentColor="text-icu">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Types of Organ Donation</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Donation after Brainstem Death (DBD)</p>
              <p className="text-sm text-muted-foreground mt-1">Brainstem death confirmed by 2 sets of tests. Time of death = completion of first set. Organ retrieval follows. Better graft outcomes (less warm ischaemia). Accounts for ~40% of deceased donors in UK.</p>
            </div>
            <div className="p-4 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Donation after Circulatory Death (DCD)</p>
              <p className="text-sm text-muted-foreground mt-1">Treatment withdrawal → circulatory arrest → 5 minutes observation (hands-off) → death confirmed → retrieval. Now majority of UK deceased donations. Maastricht categories (III = controlled, most common in UK).</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Physiological Management of the Organ Donor</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Brainstem death causes massive physiological derangement. Optimal donor management maximises organ quality and transplant outcomes.
          </p>
          <div className="space-y-2">
            {[
              { system: "Cardiovascular", goal: "MAP {'>'} 60 mmHg. Autonomic storm → vasoplegia. Vasopressin 0.5–4 units/hr (treats DI and hypotension). Noradrenaline if needed. Avoid high-dose inotropes — direct cardiac toxicity." },
              { system: "Respiratory", goal: "Lung-protective ventilation (VT 6–8 ml/kg, PEEP 5–10). Target PaO₂/FiO₂ {'>'} 300 for lung retrieval. Recruitment manoeuvres. Bronchoscopy to clear secretions." },
              { system: "Endocrine", goal: "Diabetes insipidus in ~65% (posterior pituitary failure). DDAVP 1–2 µg IV. Thyroid hormone replacement (T3/T4) — controversial but commonly used. Methylprednisolone 15 mg/kg." },
              { system: "Temperature", goal: "Hypothermia (loss of thermoregulation). Active warming to 35–37°C. Avoid hyperthermia." },
              { system: "Metabolic", goal: "Hypernatraemia (from DI) — target Na⁺ {'<'} 155 mmol/L. Maintain glucose 4–10 mmol/L. Correct electrolytes." },
            ].map((s) => (
              <div key={s.system} className="flex gap-3 p-3 rounded border border-border">
                <span className="font-bold text-primary text-sm whitespace-nowrap">{s.system}</span>
                <span className="text-sm text-muted-foreground">{s.goal}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Legal & Ethical Framework (UK)</h2>
          <div className="space-y-2">
            {[
              { point: "Deemed Consent (2020)", detail: "England, Scotland, Wales: opt-out system. Adults are deemed to have consented unless they opted out, appointed a representative, or are in an excluded group." },
              { point: "Specialist Nurse for Organ Donation (SN-OD)", detail: "Must be involved in all potential donation conversations. Family approach rate is critical — collaborative requesting improves consent." },
              { point: "Excluded groups", detail: "Children under 18, those lacking capacity who never had capacity, temporary UK residents (<12 months), those who opted out on the NHS Organ Donor Register." },
              { point: "Coroner/Procurator Fiscal", detail: "Must be consulted in reportable deaths. Coroner can refuse donation but cannot consent to it. Usually allows unless organs are needed for forensic examination." },
            ].map((p) => (
              <div key={p.point} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">{p.point}</p>
                <p className="text-sm text-muted-foreground mt-1">{p.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Brainstem Death Testing — Step by Step</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Brainstem death (BSD) is defined in the UK as the irreversible loss of the capacity for consciousness combined with the irreversible loss of the capacity to breathe (Academy of Medical Royal Colleges, 2008). Diagnosis requires two sets of tests performed by two senior doctors (one a consultant), both registered {'>'} 5 years, competent in BSD testing. Neither can be part of the transplant team.
          </p>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Prerequisites — Must Be Met Before Testing</h3>
          <div className="space-y-2 mb-4">
            {[
              { step: "1. Known aetiology", detail: "An identified cause of irreversible brain damage sufficient to explain the clinical picture (e.g. massive ICH, severe TBI, hypoxic brain injury post-cardiac arrest)." },
              { step: "2. Exclude reversible causes", detail: "No hypothermia (core temp must be ≥34°C). No residual sedation/paralysis (adequate time for drug clearance — use context-sensitive half-times, consider organ dysfunction). No severe metabolic/endocrine derangement (Na⁺, glucose, thyroid). No unresuscitated circulatory shock." },
              { step: "3. Apnoea pre-condition", detail: "Patient must be on a ventilator because of inadequate spontaneous respiration. This is a prerequisite, not a test." },
            ].map((s) => (
              <div key={s.step} className="p-3 rounded border border-border">
                <p className="font-bold text-primary text-sm mb-1">{s.step}</p>
                <p className="text-sm text-muted-foreground">{s.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Brainstem Reflexes — Tested Bilaterally</h3>
          <div className="space-y-2 mb-4">
            {[
              { test: "1. Pupillary reflex (CN II, III)", detail: "Shine bright light in each eye. Pupils must be fixed and unresponsive (not necessarily dilated — mid-position or dilated). Exclude topical mydriatics, direct eye trauma." },
              { test: "2. Corneal reflex (CN V, VII)", detail: "Firmly touch each cornea with a cotton wisp or gauze. No blink response. Avoid damage to corneas (potential donor tissue)." },
              { test: "3. Vestibulo-ocular reflex (CN III, VI, VIII)", detail: "Confirm clear external auditory canal (otoscopy). Slowly inject 50 mL ice-cold water into each ear. Observe for 1 minute. No eye movement in brainstem death. (Caloric test)" },
              { test: "4. Motor response in cranial nerve distribution (CN V, VII)", detail: "Apply central painful stimulus: supra-orbital pressure, trapezius squeeze, sternal rub. No motor response in the face or any cranial nerve territory. Spinal reflexes may persist — these do NOT preclude BSD." },
              { test: "5. Gag reflex (CN IX, X)", detail: "Stimulate posterior pharynx with spatula or suction catheter. No gag response." },
              { test: "6. Cough reflex (CN X)", detail: "Pass suction catheter into trachea beyond the carina. No cough or reflex response." },
            ].map((t) => (
              <div key={t.test} className="p-3 rounded border border-border">
                <p className="font-bold text-primary text-sm mb-1">{t.test}</p>
                <p className="text-sm text-muted-foreground">{t.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Apnoea Test</h3>
          <div className="space-y-2 mb-4">
            {[
              { step: "Pre-oxygenate", detail: "Ventilate with 100% O₂ for 10 minutes. Target PaCO₂ at baseline (~5.0 kPa / 40 mmHg) before starting. Pre-oxygenation ensures safe PaO₂ during disconnection." },
              { step: "Disconnect", detail: "Disconnect from the ventilator. Deliver passive O₂ via tracheal catheter (insufflation O₂ at 6 L/min) to prevent hypoxaemia during the test." },
              { step: "Observe", detail: "Observe for any respiratory effort for 5 minutes (or until PaCO₂ confirmed >6.65 kPa). Look for ANY chest or abdominal movement suggesting respiratory effort." },
              { step: "Confirm PaCO₂", detail: "Arterial blood gas: PaCO₂ must rise to >6.65 kPa (50 mmHg) AND have risen by >0.5 kPa from baseline. If PaCO₂ target not reached, continue observation (may need >5 min)." },
              { step: "Result", detail: "No respiratory effort with PaCO₂ >6.65 kPa confirms absent brainstem respiratory drive. Reconnect to ventilator immediately after the test." },
            ].map((s) => (
              <div key={s.step} className="p-3 rounded border border-border">
                <p className="font-bold text-primary text-sm mb-1">{s.step}</p>
                <p className="text-sm text-muted-foreground">{s.detail}</p>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-lg bg-secondary/50 border border-primary/20 mb-4">
            <p className="text-sm font-semibold text-foreground mb-1">Time of Death</p>
            <p className="text-sm text-muted-foreground">
              The legal time of death is recorded as the completion of the <strong>first</strong> set of brainstem death tests — not the second set. There is no mandatory interval between the two sets of tests; this is at clinical discretion but typically separated by several hours.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Red Flags — When BSD Testing May Be Unreliable</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The following situations may confound brainstem death testing, making results unreliable. Testing should be deferred or ancillary investigations considered:
          </p>
          <div className="space-y-2 mb-4">
            {[
              { flag: "Residual Sedation", detail: "Thiopentone has an extremely long CSHT (days in prolonged infusion). Midazolam and fentanyl accumulate in renal/hepatic failure. If any doubt, measure drug levels or wait 5× elimination half-life. Consider ancillary testing (CT angiography, 4-vessel angiography)." },
              { flag: "Neuromuscular Blockade", detail: "Residual paralysis prevents assessment of motor responses and respiratory effort. Confirm TOF ratio >0.9 at peripheral nerve stimulator. Atracurium/cisatracurium accumulate in organ dysfunction." },
              { flag: "Hypothermia (<34°C)", detail: "Hypothermia directly depresses brainstem function. Core temperature must be ≥34°C. Actively warm before testing. Hypothermia can mimic BSD — patients have recovered from profound hypothermia." },
              { flag: "Severe Metabolic Derangement", detail: "Profound hypo/hypernatraemia, hypo/hyperglycaemia, hepatic encephalopathy, severe uraemia, or endocrine crisis (myxoedema coma, Addisonian crisis) can suppress brainstem reflexes reversibly." },
              { flag: "High Cervical Spine Injury", detail: "C1–C3 lesion can abolish respiratory drive and some cranial nerve reflexes while the brainstem itself is intact. Must distinguish from BSD — may need ancillary testing." },
              { flag: "Guillain-Barré Syndrome / Locked-In Syndrome", detail: "GBS can abolish all peripheral motor responses and some cranial reflexes. Locked-in syndrome (basilar artery thrombosis) preserves consciousness but abolishes almost all motor output. EEG or clinical assessment of awareness is essential." },
              { flag: "Cranial Nerve Injury", detail: "Direct orbital/facial trauma, base of skull fractures affecting CN pathways, or pre-existing CN palsies may make specific reflex tests uninterpretable. Document and consider ancillary investigation." },
              { flag: "Pre-Existing Pupil Abnormalities", detail: "Previous eye surgery, traumatic mydriasis, topical atropine/mydriatics, or previous Adie's pupil. Check drug chart and ophthalmology history." },
              { flag: "Posterior Fossa Pathology", detail: "Isolated infratentorial lesion (e.g. cerebellar haemorrhage) may destroy brainstem while cortex remains viable. UK guidance considers this BSD, but some jurisdictions require ancillary testing to confirm absent cortical function." },
              { flag: "Children (<2 months)", detail: "UK guidance recommends caution in neonates. Immature nervous system may make testing unreliable. Specialist neonatal/paediatric neurology input required." },
            ].map((f) => (
              <div key={f.flag} className="p-3 rounded border border-border">
                <p className="font-bold text-destructive text-sm mb-1">{f.flag}</p>
                <p className="text-sm text-muted-foreground">{f.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Ancillary Investigations</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Used when clinical testing cannot be completed or confounders cannot be excluded. They support but do not replace clinical testing where possible:
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { test: "CT Angiography (CTA)", detail: "4-point scoring system assessing opacification of intracranial vessels. Absence of flow in MCA and intracranial ICA bilaterally suggests BSD. Increasingly used in UK. Non-invasive, widely available." },
              { test: "4-Vessel Catheter Angiography", detail: "Gold standard internationally. Demonstrates absent intracranial blood flow. Invasive, requires transfer, rarely used in UK practice." },
              { test: "EEG", detail: "Electrocerebral silence supports BSD but can be confounded by sedation, hypothermia, and ICU electrical interference. Not recommended as sole ancillary test in UK." },
              { test: "Transcranial Doppler (TCD)", detail: "Reverberating flow or absent diastolic flow in MCAs suggests no cerebral perfusion. Operator-dependent, inadequate temporal windows in ~10%. Useful bedside screening tool." },
            ].map((a) => (
              <div key={a.test} className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{a.test}</p>
                <p className="text-sm text-muted-foreground mt-1">{a.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 rounded-lg bg-secondary/50 border border-primary/20">
            <p className="text-sm font-semibold text-foreground mb-1">💡 Exam Tip</p>
            <p className="text-sm text-muted-foreground">
              BSD testing is heavily examined in both FRCA and FFICM. Know the prerequisites (especially drug clearance and temperature ≥34°C), all six brainstem reflexes with their cranial nerve pathways, and the apnoea test target (PaCO₂ {'>'} 6.65 kPa with {'>'} 0.5 kPa rise). Remember: spinal reflexes can persist after BSD and do NOT invalidate the diagnosis. The legal time of death is the completion of the first set of tests.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Donation after Circulatory Death (DCD) — In Detail</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            DCD now accounts for the majority (~60%) of deceased organ donations in the UK. Unlike DBD, death is diagnosed by the irreversible cessation of cardiorespiratory function rather than brainstem testing. The key challenge is minimising warm ischaemia time between circulatory arrest and organ perfusion.
          </p>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Maastricht Classification</h3>
          <p className="text-muted-foreground text-sm mb-3">
            The modified Maastricht classification categorises DCD donors by the circumstances of death. Category III (controlled) is by far the most common in the UK.
          </p>
          <div className="space-y-2 mb-4">
            {[
              { category: "Category I — Dead on arrival", detail: "Found dead, no resuscitation attempted. Uncontrolled. Rarely used in UK. Requires pre-established rapid retrieval programme (e.g. normothermic regional perfusion).", controlled: false },
              { category: "Category II — Unsuccessful resuscitation", detail: "Cardiac arrest with CPR attempted but unsuccessful. Uncontrolled. Used in some European centres (Spain, France). Not currently practised in UK. Requires rapid response and pre-consent frameworks.", controlled: false },
              { category: "Category III — Awaiting cardiac arrest", detail: "Planned withdrawal of life-sustaining treatment (WLST) in a patient where further treatment is futile. Controlled. Most common DCD category in UK (~95% of DCD). Allows planned retrieval team presence and optimisation.", controlled: true },
              { category: "Category IV — Cardiac arrest after BSD", detail: "Patient diagnosed BSD but sustains cardiac arrest before organ retrieval can occur. Uncontrolled. Organs retrieved as DCD rather than DBD. Uncommon.", controlled: false },
              { category: "Category V — Cardiac arrest in hospital", detail: "Unexpected cardiac arrest in hospitalised patient. Some countries include this. Not used in UK classification. Similar to Category II.", controlled: false },
            ].map((c) => (
              <div key={c.category} className="p-3 rounded border border-border">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="font-bold text-primary text-sm">{c.category}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${c.controlled ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400'}`}>
                    {c.controlled ? 'Controlled' : 'Uncontrolled'}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{c.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Withdrawal-to-Retrieval Pathway (Category III)</h3>
          <p className="text-muted-foreground text-sm mb-3">
            The pathway from treatment withdrawal to organ retrieval is time-critical. Warm ischaemia time (WIT) directly affects graft outcomes. The functional WIT begins when SBP {'<'} 50 mmHg.
          </p>
          <div className="space-y-2 mb-4">
            {[
              { step: "1. Decision to withdraw treatment", detail: "Made independently of any donation decision. Based on futility and best interests. Must be clearly documented. SN-OD (Specialist Nurse for Organ Donation) approached only after WLST decision is made." },
              { step: "2. Consent and planning", detail: "Family approached for donation consent (deemed consent applies). Retrieval team contacted and mobilised. Ante-mortem investigations: blood group, virology, tissue typing, CT chest/abdomen. Discuss location of withdrawal (ICU vs theatre)." },
              { step: "3. Ante-mortem interventions", detail: "Heparin (300 units/kg IV) — given before withdrawal to prevent microvascular thrombosis. Controversial but widely practised. Phentolamine sometimes used. Femoral vessel cannulation for NRP may be performed ante-mortem in some centres." },
              { step: "4. Treatment withdrawal", detail: "Extubation or reduction to T-piece/CPAP. Withdrawal of vasoactive drugs. Adequate symptom control: opioids, benzodiazepines as needed for comfort (not to hasten death). Usually performed in ICU or anaesthetic room adjacent to theatre." },
              { step: "5. Observation period", detail: "Monitor for circulatory arrest. If death does not occur within a defined standdown time (typically 2–3 hours, some centres up to 4 hours), donation does not proceed — warm ischaemia would be too prolonged for viable organs." },
              { step: "6. Circulatory arrest and 5-minute standoff", detail: "After the last cardiac output ceases (asystole or PEA with no pulsatile flow), a mandatory 5-minute hands-off observation period begins. No interventions during this time. This confirms the irreversibility of circulatory arrest." },
              { step: "7. Confirmation of death", detail: "After 5 minutes: confirm absent heart sounds, absent breath sounds, fixed dilated pupils. Death is certified by a doctor independent of the retrieval team. The legal time of death is the end of the 5-minute observation period." },
              { step: "8. Rapid organ retrieval", detail: "Immediate transfer to theatre (if not already there). Super-rapid retrieval technique: midline laparotomy, aortic cannulation, cold perfusion (University of Wisconsin or HTK solution). Target: cold perfusion within 10–20 minutes of death. Thoracic organs retrieved first (most ischaemia-sensitive)." },
            ].map((s) => (
              <div key={s.step} className="p-3 rounded border border-border">
                <p className="font-bold text-primary text-sm mb-1">{s.step}</p>
                <p className="text-sm text-muted-foreground">{s.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Normothermic Regional Perfusion (NRP)</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">
            An increasingly used technique to improve DCD organ quality. After death is confirmed, femoral arterial and venous cannulae are connected to an ECMO circuit to restore warm oxygenated perfusion to abdominal organs (abdominal NRP) or thoracoabdominal organs (thoracoabdominal NRP). The aortic arch vessels are clamped to prevent cerebral reperfusion.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            {[
              { label: "Benefits", detail: "Allows functional assessment of organs in situ. Reduces DGF (delayed graft function). Improves liver and kidney graft outcomes. Enables heart retrieval from DCD donors (thoracoabdominal NRP)." },
              { label: "Controversies", detail: "Ethical debate: does restoring circulation (even with arch clamping) conflict with the diagnosis of death by circulatory criteria? Some argue it challenges the 'permanence' standard. UK legal opinion supports current practice." },
            ].map((n) => (
              <div key={n.label} className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{n.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{n.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Warm Ischaemia Time</h3>
          <div className="grid sm:grid-cols-3 gap-3 mb-4">
            {[
              { label: "Functional WIT start", value: "SBP < 50 mmHg" },
              { label: "Functional WIT end", value: "Cold perfusion starts" },
              { label: "Target total WIT", value: "< 30 min (kidneys), < 20 min (liver)" },
            ].map((w) => (
              <div key={w.label} className="p-3 rounded-lg bg-secondary/30 border border-border text-center">
                <p className="text-xs text-muted-foreground">{w.label}</p>
                <p className="font-semibold text-foreground text-sm mt-1">{w.value}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">DCD vs DBD — Key Differences</h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Feature</th>
                  <th className="text-left py-2 text-foreground font-semibold">DBD</th>
                  <th className="text-left py-2 text-foreground font-semibold">DCD</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Death diagnosis</td><td>Brainstem death tests</td><td>Circulatory arrest + 5 min standoff</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Warm ischaemia</td><td>Minimal (organs perfused until retrieval)</td><td>Significant — time-critical</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Organs retrieved</td><td>All solid organs including heart</td><td>Kidneys, liver, lungs, pancreas. Heart via NRP in some centres</td></tr>
                <tr className="border-b border-border"><td className="py-2 font-medium text-foreground">Graft outcomes</td><td>Generally superior (less ischaemic injury)</td><td>Higher rates of DGF and PNF, but improving with NRP</td></tr>
                <tr><td className="py-2 font-medium text-foreground">UK proportion</td><td>~40% of deceased donors</td><td>~60% of deceased donors</td></tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-lg bg-secondary/50 border border-primary/20">
            <p className="text-sm font-semibold text-foreground mb-1">💡 Exam Tip</p>
            <p className="text-sm text-muted-foreground">
              DCD Category III is the most examined scenario. Know the withdrawal-to-retrieval pathway, the 5-minute standoff period, the concept of functional warm ischaemia time (from SBP {'<'} 50 mmHg), and the standdown time (2–3 hours). NRP is increasingly examined — understand the ethical debate around restoring circulation after death by circulatory criteria.
            </p>
          </div>
        </div>
      </section>

      <KeyLearningPoints points={[
        "DCD now accounts for ~60% of deceased organ donations in the UK — Category III (controlled) is most common",
        "Maastricht classification: 5 categories — only Category III (awaiting cardiac arrest after WLST) is routinely used in UK",
        "5-minute mandatory standoff after circulatory arrest before death can be confirmed",
        "Functional warm ischaemia time starts when SBP < 50 mmHg — target < 30 min for kidneys, < 20 min for liver",
        "Standdown time: if death does not occur within 2–3 hours of WLST, donation does not proceed",
        "Normothermic regional perfusion (NRP) improves DCD graft outcomes and enables DCD heart retrieval",
        "Heparin 300 units/kg is given ante-mortem to prevent microvascular thrombosis",
        "DBD: BSD prerequisites include temp ≥34°C, no residual sedation, known aetiology",
        "Apnoea test: PaCO₂ must rise to >6.65 kPa AND increase by >0.5 kPa — no respiratory effort",
        "Legal time of death: BSD = completion of first set of tests; DCD = end of 5-minute standoff",
      ]} />

      <QuizSection questions={organDonationQuestions} />
      <ReferencesList topicId="organ-donation" />

      <SeeAlso topicId="organ-donation" />
        <TopicCompletionToggle topicId="organ-donation" topicTitle="Organ Donation" />
    </SectionLayout>
  );
};

export default OrganDonationTopic;
