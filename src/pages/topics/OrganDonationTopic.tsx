import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { SynthesisBlock } from "@/components/SynthesisBlock";
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
          <p className="text-muted-foreground leading-relaxed mb-3">
            UK deceased organ donation falls into two pathways with distinct legal, logistical, and physiological implications: donation after brainstem death (DBD) and donation after circulatory death (DCD). The cards below compare the two before subsequent sections explore the legal framework, brainstem death testing, and donor management in detail.
          </p>
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
            See dedicated NRP section below for full technical and ethical detail.
          </p>

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

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Normothermic Regional Perfusion (NRP)</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            NRP is an increasingly adopted technique that restores warm, oxygenated blood flow to donor organs <em>in situ</em> after DCD death has been confirmed. By reconnecting a modified ECMO circuit to the donor's vasculature, NRP reverses ischaemic injury, allows functional organ assessment, and dramatically improves graft outcomes — including enabling heart transplantation from DCD donors for the first time.
          </p>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Types of NRP</h3>
          <div className="space-y-2 mb-4">
            {[
              { type: "Abdominal NRP (aNRP)", detail: "Perfuses abdominal organs only (kidneys, liver, pancreas). Femoral arterial and venous cannulation. Aortic arch vessels are clamped (or an aortic balloon occluder is placed) to prevent cerebral reperfusion. Thoracic aorta is cross-clamped. Most widely used form in UK. Simpler circuit, fewer ethical concerns than TA-NRP." },
              { type: "Thoracoabdominal NRP (TA-NRP)", detail: "Perfuses both thoracic and abdominal organs, including the heart. Requires sternotomy for direct cardiac cannulation or peripheral VA-ECMO with arch vessel clamping. Enables functional assessment of the heart under near-physiological conditions. Used in selected UK centres for DCD heart transplantation." },
              { type: "Ex-situ machine perfusion", detail: "Alternative to NRP: organs are retrieved cold and then perfused on a machine outside the body (e.g. OrganOx metra for liver, Transmedics OCS for heart/lung). Can be combined with NRP. Less ethical controversy but no in-situ functional assessment." },
            ].map((t) => (
              <div key={t.type} className="p-3 rounded border border-border">
                <p className="font-bold text-primary text-sm mb-1">{t.type}</p>
                <p className="text-sm text-muted-foreground">{t.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Technical Procedure — Abdominal NRP</h3>
          <div className="space-y-2 mb-4">
            {[
              { step: "1. Pre-mortem preparation", detail: "Femoral arterial and venous cannulae may be placed ante-mortem (before treatment withdrawal) under local anaesthesia, or rapidly post-mortem. Heparin 300 units/kg IV given before withdrawal." },
              { step: "2. Death confirmed", detail: "5-minute hands-off period after circulatory arrest. Death certified. Legal time of death recorded." },
              { step: "3. Arch vessel exclusion", detail: "Immediate sternotomy or balloon occlusion catheter placed in descending thoracic aorta to prevent cerebral reperfusion. Supra-aortic vessels ligated or clamped. This is the critical step that addresses the ethical concern of restoring brain circulation." },
              { step: "4. Initiate NRP circuit", detail: "Connect femoral cannulae to VA-ECMO circuit. Begin normothermic perfusion (37°C) with oxygenated blood. Target flow 2–2.5 L/min. Perfuse for 60–120 minutes to allow organ recovery and functional assessment." },
              { step: "5. Organ assessment", detail: "During NRP: measure hepatic transaminases (AST/ALT trend), bile production, lactate clearance (liver viability). Urine output, creatinine clearance (kidney viability). Cardiac function assessed by TOE if TA-NRP." },
              { step: "6. Organ retrieval", detail: "Once viability confirmed, proceed to standard organ retrieval. Organs are flushed with cold preservation solution. NRP circuit discontinued. Organs transported to recipient centres." },
            ].map((s) => (
              <div key={s.step} className="p-3 rounded border border-border">
                <p className="font-bold text-primary text-sm mb-1">{s.step}</p>
                <p className="text-sm text-muted-foreground">{s.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-serif font-bold text-foreground mb-2">Evidence & Outcomes</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            {[
              { organ: "Liver", outcome: "NRP reduces DCD liver discard rates from ~25% to <10%. Significantly lower rates of ischaemic cholangiopathy (the main cause of DCD liver graft failure). 1-year graft survival approaches DBD levels." },
              { organ: "Kidney", outcome: "NRP reduces delayed graft function (DGF) from ~50% to ~20%. Lower rates of primary non-function. Allows extended criteria DCD kidneys to be used safely." },
              { organ: "Heart", outcome: "TA-NRP enables DCD heart transplantation — previously impossible. UK centres (Papworth, Harefield) have performed successful DCD heart transplants via TA-NRP with outcomes comparable to DBD hearts at 1 year." },
              { organ: "Pancreas", outcome: "NRP allows functional assessment of pancreatic viability. Reduced rates of graft thrombosis. Enables DCD pancreas transplants in centres using NRP." },
            ].map((o) => (
              <div key={o.organ} className="p-3 rounded-lg border border-border">
                <p className="font-semibold text-foreground text-sm">{o.organ}</p>
                <p className="text-sm text-muted-foreground mt-1">{o.outcome}</p>
              </div>
            ))}
          </div>

          <h3 className="text-2xl font-serif font-bold text-foreground mb-3">Ethical Framework — Restoring Circulation After Circulatory Death</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            NRP raises fundamental ethical and philosophical questions about the definition and diagnosis of death. The core tension is: if death was diagnosed by the irreversible cessation of circulation, does restoring circulation (even regionally) challenge the validity of that diagnosis?
          </p>

          <div className="space-y-2 mb-4">
            {[
              { issue: "The permanence vs irreversibility debate", detail: "UK law uses 'irreversible' cessation of circulatory function. The 5-minute standoff demonstrates 'permanence' (circulation will not restart spontaneously) but not strict 'irreversibility' (it could theoretically be restored by CPR/ECMO). NRP exploits this distinction — circulation is restored after permanence is established, but some argue this undermines the irreversibility criterion." },
              { issue: "Cerebral exclusion as safeguard", detail: "The requirement to clamp/ligate arch vessels before initiating NRP ensures no cerebral reperfusion occurs. This means consciousness cannot be restored. Proponents argue that death of the brain (the seat of consciousness) is already established, and NRP simply maintains perfusion to non-sentient organs. The patient remains dead throughout NRP." },
              { issue: "Dead donor rule", detail: "The foundational ethical principle: organ retrieval must not cause or hasten the donor's death. NRP complies because death has already been confirmed before NRP begins. However, critics argue that the act of restoring circulation creates a philosophical inconsistency — the body is simultaneously 'dead' and 'perfused'." },
              { issue: "Academy of Medical Royal Colleges position", detail: "The UK's AoMRC (2021) endorsed NRP as ethically acceptable, provided: (1) death is properly confirmed using standard criteria, (2) arch vessels are excluded before NRP begins, (3) there is no possibility of cerebral reperfusion, (4) the family has been informed and consents. This position is supported by the UK Department of Health." },
              { issue: "International perspectives", detail: "NRP is widely used in Spain (pioneered the technique), France, and increasingly the UK. Some countries (e.g. Australia, parts of USA) have ethical reservations. The International Society for Heart and Lung Transplantation supports TA-NRP for DCD heart transplantation but acknowledges ethical debate." },
              { issue: "Alternative: ex-situ machine perfusion", detail: "Some ethicists prefer ex-situ machine perfusion (retrieving organs cold, then perfusing outside the body) as it avoids restoring circulation in the donor entirely. However, this approach cannot provide in-situ functional assessment and may produce inferior outcomes for some organs (especially liver)." },
            ].map((e) => (
              <div key={e.issue} className="p-3 rounded border border-border">
                <p className="font-bold text-primary text-sm mb-1">{e.issue}</p>
                <p className="text-sm text-muted-foreground">{e.detail}</p>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5 mb-4">
            <p className="text-sm font-semibold text-destructive">⚠ Key Legal Point</p>
            <p className="text-sm text-muted-foreground mt-1">
              In the UK, death diagnosed by circulatory criteria remains legally valid even if circulation is subsequently restored to the body (excluding the brain) for NRP. The legal time of death is the end of the 5-minute standoff period — NRP does not 'reverse' death. This position was confirmed by legal opinion obtained by NHSBT and endorsed by the AoMRC.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-secondary/50 border border-primary/20">
            <p className="text-sm font-semibold text-foreground mb-1">💡 Exam Tip</p>
            <p className="text-sm text-muted-foreground">
              NRP is a hot topic in FRCA Final and FFICM. Know: (1) the distinction between abdominal NRP and thoracoabdominal NRP, (2) the requirement for arch vessel exclusion before initiating NRP, (3) the permanence vs irreversibility debate, (4) why cerebral exclusion is the ethical safeguard, (5) the dead donor rule and how NRP complies with it. Be prepared to discuss this in a structured oral or essay format.
            </p>
          </div>
        </div>
      </section>

      <SynthesisBlock
        title="Organ Donation — Pathway at a Glance"
        subtitle="The two donation pathways, the triggers for SN-OD referral, and the donor optimisation bundle."
        variant="summary"
      >
        <ul className="space-y-2 list-disc list-inside text-sm">
          <li><strong>DBD (donation after brainstem death)</strong>: requires confirmed brainstem death by 2 doctors at 2 separate tests; physiological support continued until retrieval.</li>
          <li><strong>DCD (donation after circulatory death)</strong>: when WLST is planned but BSD will not occur — Maastricht III; controlled withdrawal in theatre/ICU with rapid retrieval after asystole + 5 min stand-off.</li>
          <li><strong>Refer SN-OD early</strong>: any catastrophic brain injury where BSD testing or WLST is being considered. Referral does not commit to donation.</li>
          <li><strong>Donor optimisation bundle (DBD)</strong>: lung-protective ventilation, MAP ≥65, CVP 6–10, hormonal therapy (methylprednisolone, vasopressin, T3 if cardiac instability), normothermia, glycaemic control.</li>
          <li><strong>Family approach</strong>: collaborative between intensivist and SN-OD, separate from prognosis discussion. Honour past wishes (ODR, family knowledge).</li>
        </ul>
      </SynthesisBlock>

      <KeyLearningPoints points={[
        "DCD now accounts for ~60% of deceased organ donations in the UK — Category III (controlled) is most common",
        "Maastricht classification: 5 categories — only Category III (awaiting cardiac arrest after WLST) is routinely used in UK",
        "5-minute mandatory standoff after circulatory arrest before death can be confirmed",
        "Functional warm ischaemia time starts when SBP < 50 mmHg — target < 30 min for kidneys, < 20 min for liver",
        "Abdominal NRP: femoral cannulation + ECMO circuit with arch vessel exclusion — no cerebral reperfusion",
        "TA-NRP enables DCD heart transplantation — outcomes approaching DBD levels at 1 year",
        "NRP reduces DCD liver discard and ischaemic cholangiopathy; reduces kidney DGF from ~50% to ~20%",
        "Ethical framework: permanence vs irreversibility, dead donor rule, cerebral exclusion as safeguard",
        "AoMRC (2021) endorses NRP as ethically acceptable provided arch vessels are excluded before perfusion",
        "Legal time of death: BSD = completion of first set of tests; DCD = end of 5-minute standoff — NRP does not reverse death",
      ]} />

      <QuizSection questions={organDonationQuestions} />
      <ReferencesList topicId="organ-donation" />

      <SeeAlso topicId="organ-donation" />
        <TopicCompletionToggle topicId="organ-donation" topicTitle="Organ Donation" />
    </SectionLayout>
  );
};

export default OrganDonationTopic;
