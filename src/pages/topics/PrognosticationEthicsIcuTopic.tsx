import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { prognosticationIcuQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";
import PostCardiacArrestProgDiagram from "@/components/diagrams/PostCardiacArrestProgDiagram";

const PrognosticationEthicsIcuTopic = () => {
  return (
    <SectionLayout title="Prognostication, Ethics & Outcomes" subtitle="FFICM — Intensive Care" backPath="/intensive-care" backLabel="Intensive Care" accentColor="text-icu">
      <section className="space-y-8 mb-10">

        {/* ---- Prognostication ---- */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Prognostication in Intensive Care</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Prognostication is one of the most challenging and important skills in intensive care medicine. Accurate outcome prediction guides treatment decisions, family communication, resource allocation, and end-of-life planning. No single tool is perfectly predictive — clinical judgement integrating multiple data sources remains essential.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-4">Interactive Diagrams</h2>
          <PostCardiacArrestProgDiagram />
        </div>

        {/* ---- Scoring Systems ---- */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Prognostic Scoring Systems</h2>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Score</th>
                  <th className="text-left py-2 text-foreground font-semibold">Variables & Timing</th>
                  <th className="text-left py-2 text-foreground font-semibold">Use & Limitations</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">APACHE II</td>
                  <td>12 physiological variables + age + chronic health. Worst values in first 24 h of ICU admission.</td>
                  <td>Population-level mortality prediction. Widely validated. Not designed for individual prognostication. Older model — may overestimate mortality with modern care. Does not account for treatment intensity.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">APACHE IV</td>
                  <td>Updated with 142 diagnostic categories, admission source, mechanical ventilation status. First 24 h data.</td>
                  <td>Better calibration than APACHE II for contemporary ICU populations. Requires proprietary software. US-centric validation.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">ICNARC Model</td>
                  <td>UK-specific. Physiological variables from first 24 h + admission diagnosis + source. Updated regularly against national audit data.</td>
                  <td>Gold standard for UK ICU benchmarking. Used in ICNARC Case Mix Programme (CMP). Standardised Mortality Ratio (SMR) = observed/expected deaths. Better calibrated for UK practice than APACHE.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">SOFA</td>
                  <td>6 organ systems scored 0–4 (respiratory, cardiovascular, hepatic, coagulation, renal, neurological). Daily calculation.</td>
                  <td>Tracks organ dysfunction trajectory. Rising SOFA predicts mortality (delta-SOFA). Integral to Sepsis-3 definition (≥2-point rise). Useful for serial assessment. Not admission-specific.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">SAPS 3</td>
                  <td>Pre-ICU variables + admission physiology + admission reason. Calculated at ICU admission (first hour).</td>
                  <td>International validation. Accounts for case mix and lead-time bias. Hospital mortality prediction. Requires electronic calculation.</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-foreground">GCS (neurological)</td>
                  <td>Eye, verbal, motor components. Serial assessment.</td>
                  <td>After cardiac arrest: motor score at 72 h is part of multimodal prognostication (ERC/ESICM 2021). After TBI: GCS at 6 h predicts outcome. Confounded by sedation, paralysis, intubation.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Disease-Specific Prognostication</h3>
          <div className="space-y-2 mb-4">
            {[
              { label: "Post-Cardiac Arrest (ERC/ESICM 2021)", detail: "Multimodal strategy at ≥72 h after ROSC (or after rewarming if TTM used). No single test is 100% predictive. Combine: bilateral absent pupillary light reflexes, bilateral absent N20 on SSEP, highly malignant EEG (suppression, burst-suppression), neuron-specific enolase (NSE) >60 μg/L, diffuse anoxic injury on MRI (diffusion restriction), absent brainstem reflexes. At least 2 concordant poor prognostic signs required. Avoid self-fulfilling prophecy — do not withdraw based on early single findings." },
              { label: "Traumatic Brain Injury", detail: "CRASH and IMPACT models incorporate age, GCS, pupil reactivity, CT findings (Marshall classification), and secondary insults. Extended Glasgow Outcome Scale (GOS-E) at 6 months is the standard outcome measure. Young patients with reactive pupils have potential for good recovery even with low initial GCS." },
              { label: "ARDS", detail: "Severity by PaO₂/FiO₂ ratio (Berlin criteria). Driving pressure >15 cmH₂O independently predicts mortality. Persistent ARDS at day 7 carries worse prognosis. ECMO referral scores (RESP, PRESERVE) aid selection." },
              { label: "Acute Liver Failure", detail: "King's College criteria (paracetamol and non-paracetamol). MELD score. Arterial lactate >3.5 mmol/L after resuscitation predicts need for transplant. Serial assessment — trajectory matters more than single values." },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">{item.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Limitations of Prognostic Scores</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Population vs Individual</p>
              <p className="text-xs text-muted-foreground mt-1">Scoring systems predict group mortality rates, not individual outcomes. A 30% predicted mortality means ~70% of similar patients survive. Never use a single score to justify withdrawal of treatment for an individual.</p>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Self-Fulfilling Prophecy</p>
              <p className="text-xs text-muted-foreground mt-1">If clinicians withdraw treatment based on a poor prognostic prediction, the patient dies — apparently confirming the prediction. This circular reasoning is a major ethical concern, particularly in post-cardiac arrest prognostication. Blinded prognostication protocols help mitigate this bias.</p>
            </div>
          </div>
        </div>

        {/* ---- Treatment Escalation & Limits ---- */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Treatment Escalation Plans & Limits</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Treatment escalation plans (TEPs) document decisions about the appropriateness of specific interventions. They are anticipatory — made prospectively before a crisis occurs. Clear documentation supports consistent decision-making, respects patient autonomy, and reduces inappropriate or unwanted escalation.
          </p>

          <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Levels of Treatment Limitation</h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Level</th>
                  <th className="text-left py-2 text-foreground font-semibold">Description</th>
                  <th className="text-left py-2 text-foreground font-semibold">Examples</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Full escalation</td>
                  <td>All appropriate treatments including CPR, intubation, organ support</td>
                  <td>Young patient with reversible pathology</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Ward-based ceiling</td>
                  <td>Full active treatment on the ward but not for ICU admission</td>
                  <td>Patient with advanced comorbidities where ICU unlikely to benefit</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Treatment trial</td>
                  <td>Time-limited ICU admission with defined review points and criteria for continuation or withdrawal</td>
                  <td>Uncertain prognosis — reassess at 48–72 h</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">DNAR / DNACPR</td>
                  <td>Do Not Attempt Cardiopulmonary Resuscitation. Does NOT limit other treatments unless specified.</td>
                  <td>Common misconception: DNACPR ≠ withdrawal of all active care. Patient may still receive ICU, ventilation, antibiotics.</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-foreground">Comfort care only</td>
                  <td>Focus on symptom control, dignity, and comfort. No disease-modifying treatments.</td>
                  <td>End-of-life care pathway. Symptom management with opioids, benzodiazepines, anti-secretory agents.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-2 mb-4">
            {[
              { label: "ReSPECT Process", detail: "Recommended Summary Plan for Emergency Care and Treatment. National (UK) approach to emergency care planning. Creates personalised recommendations based on shared decision-making. Includes CPR recommendation, preferred escalation level, and patient's priorities. Portable across care settings. Legally advisory, not legally binding (unlike ADRT)." },
              { label: "Documentation Requirements", detail: "Clear, unambiguous language. Specific treatments included/excluded. Name and grade of decision-maker. Evidence of discussion with patient/family. Review date. Accessible in medical notes and electronically. Communicated to all relevant teams." },
              { label: "Time-Limited Treatment Trials", detail: "Increasingly used when prognosis is uncertain. Define specific goals and timeframe (e.g. 'trial of NIV for 48 h — escalate to intubation if improving, palliate if deteriorating'). Reduces futile prolonged ICU stays. Requires clear communication with patient/family about what 'success' and 'failure' look like." },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">{item.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ---- Ethics ---- */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Medical Ethics in Intensive Care</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Ethical principles underpin every ICU decision, from admission and escalation to withdrawal and organ donation. The four pillars of medical ethics (Beauchamp & Childress) apply with particular intensity in critical care.
          </p>

          <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">The Four Pillars</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Autonomy</p>
              <p className="text-xs text-muted-foreground mt-1">The right of a competent patient to make informed decisions about their care, including refusal of treatment. In ICU, patients often lack capacity → advance decisions, lasting power of attorney, and best-interests decisions become critical. Mental Capacity Act 2005 (England & Wales): assume capacity unless proven otherwise.</p>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Beneficence</p>
              <p className="text-xs text-muted-foreground mt-1">The duty to act in the patient's best interest. In ICU: does continued treatment offer realistic benefit? Benefit must be defined in terms meaningful to the patient (not just survival, but quality of survival). 'Doing something' is not always beneficent.</p>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Non-maleficence</p>
              <p className="text-xs text-muted-foreground mt-1">'First, do no harm.' Prolonging dying rather than living causes harm. ICU treatments carry significant burdens: pain, delirium, loss of dignity, psychological trauma. The balance between benefit and burden must be continuously reassessed.</p>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Justice</p>
              <p className="text-xs text-muted-foreground mt-1">Fair allocation of finite resources. ICU beds, ECMO circuits, and specialist staff are limited. Admitting one patient may deny access to another. Triage decisions should be transparent, consistent, and based on clinical criteria — never on social worth or ability to pay.</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Legal Framework (UK)</h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Instrument</th>
                  <th className="text-left py-2 text-foreground font-semibold">Key Points</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Mental Capacity Act 2005</td>
                  <td>Applies in England & Wales. Five principles: presume capacity, support decision-making, unwise decisions allowed, best interests, least restrictive option. Capacity is decision-specific and time-specific. Two-stage test: (1) impairment of mind/brain, (2) unable to understand, retain, weigh, or communicate the decision.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Advance Decision to Refuse Treatment (ADRT)</td>
                  <td>Legally binding if valid and applicable. Must be written, signed, and witnessed if refusing life-sustaining treatment. Must specify the treatment refused and the circumstances. Cannot demand treatment. Overrides family and clinician opinions.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Lasting Power of Attorney (LPA)</td>
                  <td>Health and Welfare LPA allows a designated person to make decisions on behalf of an incapacitated patient. Must be registered with the Office of the Public Guardian. LPA for health can only be used when the patient lacks capacity. Attorney must act in best interests.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Best Interests Decision</td>
                  <td>When patient lacks capacity and has no ADRT or LPA: clinicians decide in best interests. Must consider patient's past and present wishes, beliefs, values, and any relevant factors they would consider. Consult family/friends, IMCA if no one else to consult. Not determined by clinical team alone.</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-foreground">Court of Protection</td>
                  <td>Can be asked to make decisions when there is disagreement between clinicians and family. Recent cases: Charlie Gard (2017), Alfie Evans (2018) — courts upheld clinicians' view that continued treatment was not in the child's best interests. Rarely needed — most disputes resolved through mediation.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ---- Withdrawal & End of Life ---- */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Withdrawal of Treatment & End-of-Life Care</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Approximately 70–80% of ICU deaths in the UK follow a decision to withdraw or withhold life-sustaining treatment. Ethically and legally, withdrawal and withholding are equivalent (GMC guidance, BMA). The distinction between withdrawing treatment and euthanasia is fundamental.
          </p>

          <div className="space-y-2 mb-4">
            {[
              { label: "Withholding vs Withdrawing", detail: "Ethically equivalent — both involve not providing a treatment that is no longer in the patient's best interest. Psychologically, withdrawal can feel harder for clinicians and families. There is no legal or ethical obligation to provide treatment that is futile or burdensome. Not providing treatment ≠ 'doing nothing' — the focus shifts to comfort care." },
              { label: "Doctrine of Double Effect", detail: "It is ethically permissible to give medications (e.g. opioids, sedatives) with the primary intention of relieving suffering, even if a foreseeable side effect is hastening death. Four conditions: (1) the act itself is morally neutral, (2) the good effect (comfort) is intended, (3) the bad effect (death) is foreseen but not intended, (4) the good effect is proportionate. This is legally and ethically distinct from euthanasia." },
              { label: "Process of Withdrawal", detail: "Senior-led, multidisciplinary decision. Discussion with family — they are consulted but do not make the decision (UK law). Clear documentation of decision, rationale, and those involved. Anticipatory prescribing: morphine/diamorphine, midazolam, glycopyrronium, levomepromazine. Remove monitoring that does not contribute to comfort. Maintain dignity, privacy, and family access. No fixed timeline — withdrawal is not a single event." },
              { label: "Symptom Management", detail: "Opioids: titrate to respiratory comfort, not respiratory rate. Midazolam: for agitation, anxiety, seizures. Glycopyrronium/hyoscine: for death rattle (secretions). Levomepromazine: for nausea, agitation. Syringe driver for continuous infusion. Regular reassessment and dose titration. Family presence encouraged." },
              { label: "Organ Donation After Death", detail: "Withdrawal of treatment and organ donation are separate decisions. The treating team must not be the organ donation team. Specialist Nurses for Organ Donation (SNODs) should be involved early. DCD (donation after circulatory death) is the most common pathway after treatment withdrawal in UK ICU. Deemed consent (opt-out) legislation in England (2020), Wales (2015), Scotland (2021)." },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">{item.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ---- Communication ---- */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Communication & Family</h2>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Breaking Bad News</p>
              <p className="text-xs text-muted-foreground mt-1">SPIKES framework: Setting, Perception, Invitation, Knowledge, Emotions, Strategy/Summary. Allow silence. Avoid medical jargon. Check understanding. Be honest about uncertainty. Document the conversation.</p>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Family Meetings</p>
              <p className="text-xs text-muted-foreground mt-1">Structured, planned, with clear objectives. Involve senior clinician, bedside nurse, and other relevant disciplines. Explore family's understanding and expectations. Shared decision-making — not information delivery. Regular updates even when there is no change. Document outcomes and plan.</p>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Conflict Resolution</p>
              <p className="text-xs text-muted-foreground mt-1">Disagreements between clinicians and families are common. Strategies: second opinions, ethics committee involvement, independent mediation, pastoral/spiritual support, time for reflection, involvement of PALS. Court of Protection as last resort. Avoid adversarial language. Document all discussions.</p>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Cultural & Religious Considerations</p>
              <p className="text-xs text-muted-foreground mt-1">Diverse views on brain death, treatment withdrawal, autopsy, and organ donation. Some faiths do not accept brain death as death. Rapid access to chaplaincy/spiritual care. Accommodate religious rituals where possible. Never assume — ask the family what is important to them.</p>
            </div>
          </div>
        </div>

        {/* ---- Long-Term Outcomes ---- */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Long-Term Outcomes After Critical Illness</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Survival to ICU discharge is only the beginning. Critical illness survivors face a constellation of physical, cognitive, and psychological sequelae collectively termed <strong>Post-Intensive Care Syndrome (PICS)</strong>. Understanding these outcomes is essential for informed consent, prognostication, and follow-up planning.
          </p>

          <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Post-Intensive Care Syndrome (PICS)</h3>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground font-semibold">Domain</th>
                  <th className="text-left py-2 text-foreground font-semibold">Manifestations</th>
                  <th className="text-left py-2 text-foreground font-semibold">Risk Factors & Prevalence</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Physical</td>
                  <td>ICU-acquired weakness (CIP/CIM), reduced exercise capacity, fatigue, weight loss, joint contractures, dysphagia, chronic pain, tracheal stenosis</td>
                  <td>ICU-AW affects 25–50% of patients ventilated &gt;7 days. Risk: sepsis, multi-organ failure, steroids, neuromuscular blockers, immobility. May persist for years.</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 font-medium text-foreground">Cognitive</td>
                  <td>Memory impairment, impaired executive function, reduced processing speed, difficulty concentrating, delirium-related cognitive decline</td>
                  <td>Affects 30–80% of ICU survivors at hospital discharge. Duration of delirium is the strongest predictor. Similar to mild TBI or early Alzheimer's on neuropsychological testing. May improve over 12 months but often persists.</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-foreground">Psychological</td>
                  <td>PTSD (10–50%), anxiety (30–40%), depression (25–30%), sleep disturbance, altered body image, loss of independence</td>
                  <td>Risk factors: delirium, benzodiazepine use, frightening ICU memories/delusions, pre-existing psychiatric history, female sex. PICS-F: family members also affected (anxiety, depression, complicated grief).</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">ICU-Acquired Weakness</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Critical Illness Polyneuropathy (CIP)</p>
              <p className="text-xs text-muted-foreground mt-1">Axonal sensorimotor polyneuropathy. Distal weakness, areflexia, sensory loss. EMG/NCS: reduced CMAP and SNAP amplitudes with normal conduction velocities. Sepsis and multi-organ failure are the strongest risk factors. Recovery over weeks to months but may be incomplete.</p>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <p className="font-semibold text-foreground text-sm">Critical Illness Myopathy (CIM)</p>
              <p className="text-xs text-muted-foreground mt-1">Primary myopathy with myosin loss. Proximal weakness, preserved reflexes (initially), elevated CK. Risk: steroids + neuromuscular blockers synergistic. EMG: small-amplitude, short-duration motor unit potentials. Generally better prognosis than CIP. Often coexists (CIPNM).</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">Outcome Measures</h3>
          <div className="space-y-2 mb-4">
            {[
              { label: "Mortality", detail: "In-ICU, in-hospital, 30-day, 90-day, and 1-year mortality. UK ICU mortality ~15–20%; hospital mortality ~25%. Post-discharge mortality remains elevated for years — 'hidden mortality.' 5-year survival after ICU may be 50–60% depending on case mix." },
              { label: "Functional Outcome Scales", detail: "Extended Glasgow Outcome Scale (GOS-E): 8 categories from death to upper good recovery — standard for TBI. Karnofsky Performance Status (KPS) and WHO Performance Status: functional capacity. EQ-5D: health-related quality of life. Barthel Index: activities of daily living. SF-36: physical and mental health domains." },
              { label: "Return to Work / Social Function", detail: "Only 50–70% of working-age ICU survivors return to work within 12 months. Cognitive impairment is the strongest barrier. Many return at reduced capacity or different role. Financial hardship, relationship breakdown, and social isolation are common. Rehabilitation needs are often unmet." },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">{item.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ---- ICU Follow-Up & Rehabilitation ---- */}
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">ICU Follow-Up & Rehabilitation</h2>
          <div className="space-y-2">
            {[
              { label: "NICE CG83 (Rehabilitation After Critical Illness)", detail: "Recommends structured rehabilitation assessment at ICU discharge, ward discharge, and 2–3 months post-ICU. Physical, cognitive, and psychological domains should all be assessed. Individualised rehabilitation goals. Referral to specialist services (physiotherapy, psychology, occupational therapy, speech and language therapy)." },
              { label: "ICU Follow-Up Clinics", detail: "Review at 2–3 months post-discharge. Multidisciplinary: intensivist, nurse, physiotherapist, psychologist. Assess PICS domains, medication review, provide information and peer support. Patient diaries (written during ICU stay) help fill memory gaps and reduce PTSD symptoms. Not yet universally available — significant variation across UK." },
              { label: "Prevention Strategies (In ICU)", detail: "ABCDEF Bundle: Assess, prevent, and manage pain; Both spontaneous awakening and breathing trials; Choice of analgesia and sedation; Delirium assess and manage; Early mobility and exercise; Family engagement. Early mobilisation: physiotherapy-led, reduces ICU-AW and delirium, shortens ventilator days. Minimise benzodiazepines (increase delirium risk). Promote sleep hygiene. ICU diaries." },
              { label: "Staff Wellbeing & Moral Distress", detail: "ICU clinicians experience high rates of burnout, moral distress, and compassion fatigue. End-of-life decisions, perceived futile treatment, and pandemic pressures are major contributors. Schwartz rounds, peer support, debriefing after difficult cases, and access to psychological support are essential. Staff wellbeing directly impacts patient safety and quality of care." },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="font-semibold text-foreground text-sm">{item.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

      </section>

      <KeyLearningPoints points={[
        "Prognostic scores predict population outcomes — never use a single score to determine treatment for an individual patient",
        "Post-cardiac arrest prognostication: multimodal at ≥72 h — at least 2 concordant poor prognostic signs required (ERC/ESICM 2021)",
        "Withholding and withdrawing treatment are ethically and legally equivalent (GMC/BMA guidance)",
        "DNACPR does NOT mean withdrawal of all active treatment — it only applies to CPR",
        "The Mental Capacity Act presumes capacity; best-interests decisions must consider the patient's values, wishes, and beliefs",
        "Doctrine of double effect permits medications for comfort even if they may hasten death — this is NOT euthanasia",
        "PICS affects up to 50–80% of ICU survivors: physical (ICU-AW), cognitive (delirium-related), and psychological (PTSD, depression)",
        "ICU-acquired weakness: CIP is axonal neuropathy, CIM is primary myopathy — often coexist. Sepsis is the strongest risk factor",
        "ABCDEF bundle reduces delirium, ICU-AW, and improves long-term outcomes — early mobilisation is a key component",
        "Self-fulfilling prophecy: withdrawing treatment based on early prediction confirms the prediction — use blinded multimodal assessment",
      ]} />

      <QuizSection questions={prognosticationIcuQuestions} />
      <ReferencesList topicId="prognostication-ethics-icu" />
      <SeeAlso topicId="prognostication-ethics-icu" />
      <TopicCompletionToggle topicId="prognostication-ethics-icu" topicTitle="Prognostication, Ethics & Outcomes" />
    </SectionLayout>
  );
};

export default PrognosticationEthicsIcuTopic;
