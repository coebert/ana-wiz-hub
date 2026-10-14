import { InlineRef } from "@/components/references/InlineRef";
import { QuizSection } from "@/components/quiz/QuizSection";
import APRVWaveformDiagram from "@/components/diagrams/intensive-care/APRVWaveformDiagram";
import APRVExpiratoryFlowDiagram from "@/components/diagrams/intensive-care/APRVExpiratoryFlowDiagram";

const T = "mechanical-ventilation";
const Review = () => <InlineRef topicId={T} refLabel="Swindin APRV 2020" />;

export const APRVSection = () => (
  <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
    <p>
      <strong className="text-foreground">Airway pressure release ventilation (APRV)</strong> is invasive,
      pressure-controlled, time-cycled ventilation: a prolonged high-pressure phase is interrupted by
      brief low-pressure releases. Spontaneous breaths are permitted at either pressure level.
      It resembles CPAP with intermittent releases, rather than ordinary pressure control with a
      conventional inspiratory–expiratory ratio. Manufacturer names such as BiLevel, BIPAP and
      BiVent are not interchangeable protocols; invasive biphasic ventilation is not mask BiPAP.<Review />
    </p>

    <section className="space-y-3" aria-label="APRV physiology">
      <h3 className="text-lg font-semibold text-foreground">Physiology: recruitment, release and respiratory effort</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Oxygenation:</strong> prolonged P<sub>high</sub> increases mean airway pressure and may recruit collapsed lung. Overdistension of already open units remains possible; improved oxygenation does not prove reduced lung injury.</li>
        <li><strong>Ventilation:</strong> releases expel gas down the pressure gradient. CO₂ clearance depends on release volume, release frequency, dead space and spontaneous ventilation — not on T<sub>low</sub> alone.</li>
        <li><strong>End-expiratory lung volume:</strong> truncating expiratory flow can preserve volume despite a set P<sub>low</sub> of zero. Set P<sub>low</sub> is not the same as alveolar pressure or measured total PEEP.</li>
        <li><strong>Spontaneous effort:</strong> may improve dependent ventilation and reduce sedation or diaphragm disuse. Vigorous effort can instead produce high transpulmonary pressures, pendelluft and patient self-inflicted lung injury (P-SILI); spontaneous breathing is not automatically protective.</li>
        <li><strong>Circulation:</strong> recruitment and spontaneous breathing may help haemodynamics in some patients, but high intrathoracic pressure can reduce venous return and worsen right-ventricular function.<Review /></li>
      </ul>
      <APRVWaveformDiagram />
    </section>

    <section className="space-y-3" aria-label="APRV patient selection">
      <h3 className="text-lg font-semibold text-foreground">Patient selection and important cautions</h3>
      <p>Consider only with an experienced ICU team and a defined local protocol, for selected patients with recruitable hypoxaemic lung disease, including ARDS or multifocal pneumonia. APRV is an alternative strategy, not a proven superior default or a reason to delay indicated prone positioning or ECMO referral.<Review /><InlineRef topicId={T} refLabel="ESICM ARDS 2023" /></p>
      <p>Reasons to avoid APRV or seek specialist reassessment include untreated pneumothorax, bronchopleural fistula, severe bronchospasm/airflow obstruction, profound circulatory instability, decompensated pulmonary hypertension/RV failure and recent lung resection. Neurocritical illness requires particularly careful control of PaCO₂, cerebral perfusion and respiratory effort. These risks depend on the clinical situation, rather than a universal contraindication list.<Review /></p>
      <p>Deep sedation or paralysis does not make the ventilator incapable of delivering APRV: timed releases continue, but spontaneous ventilation and its proposed benefits disappear. Reassess whether the release settings deliver adequate ventilation; never withdraw necessary sedation or paralysis simply to preserve the mode.<Review /></p>
    </section>

    <section className="space-y-3" aria-label="APRV settings">
      <h3 className="text-lg font-semibold text-foreground">The four settings — an adult teaching example</h3>
      <p>There is no universally agreed APRV protocol. The following is the personalised approach described by Swindin and colleagues, not a patient-specific prescription. Confirm whether the ventilator displays absolute airway pressures or pressures above baseline before entering settings.<Review /></p>
      <dl className="grid sm:grid-cols-2 gap-3">
        {[
          ["P high", "Start from the preceding measured plateau pressure, usually ≤30 cmH₂O in this review. This is not the peak pressure; unusual chest-wall mechanics require specialist interpretation."],
          ["P low", "0 cmH₂O in this approach. Other protocols use non-zero values: Zhou’s trial used 5 cmH₂O. Neither setting alone tells you total PEEP."],
          ["T high", "An initial 5 seconds (review range 3–8 seconds). Increasing it raises the proportion of time at high pressure but reduces release frequency."],
          ["T low", "An initial 0.5 seconds (review range 0.3–0.8 seconds), then titrate to the actual expiratory flow trace, rather than retaining a fixed time."],
          ["FiO₂", "Set for the immediate oxygenation requirement, then reduce promptly as tolerated towards the patient’s prescribed saturation target."],
          ["Releases per minute", "60 ÷ (T high + T low). At 5 and 0.5 seconds: 10.9 releases/min. This is not the total respiratory rate when spontaneous breaths are present."],
        ].map(([label, detail]) => (
          <div key={label} className="rounded-md border border-border p-3">
            <dt className="font-semibold text-foreground">{label}</dt>
            <dd className="mt-1">{detail}</dd>
          </div>
        ))}
      </dl>
      <p>For an ideal rectangular waveform, mean airway pressure ≈ (P<sub>high</sub> × T<sub>high</sub> + P<sub>low</sub> × T<sub>low</sub>) ÷ (T<sub>high</sub> + T<sub>low</sub>). With 28/0 cmH₂O and 5/0.5 seconds this is ≈25.5 cmH₂O. Transitions and spontaneous breaths alter the measured value; mean airway pressure is not mean transpulmonary pressure.<Review /></p>
    </section>

    <section className="space-y-3" aria-label="APRV expiratory flow titration">
      <h3 className="text-lg font-semibold text-foreground">T low titration: read the flow, not just the clock</h3>
      <p>Use the magnitudes of expiratory flows: termination ratio = |flow at the end of release| ÷ |peak expiratory flow|. Swindin’s approach aims for approximately <strong className="text-foreground">75%</strong>; Zhou’s trial used ≥50%. The often quoted 50–75% range reflects different protocols, not a universally validated safe window.<Review /><InlineRef topicId={T} refLabel="Zhou APRV 2017" /></p>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Example:</strong> peak expiratory flow −60 L/min and terminal flow −45 L/min gives 45/60 = 75%, not a negative ratio.</li>
        <li><strong>Below the chosen target:</strong> expiration has continued further; shorten T<sub>low</sub> and reassess. A very brief release can conversely cause inadequate ventilation or excessive gas trapping.</li>
        <li><strong>Changing mechanics:</strong> resistance, compliance, secretions and patient effort change the flow curve; revisit T<sub>low</sub> after clinical changes. Airway flow reaching zero does not prove that every alveolus has emptied or collapsed.</li>
        <li><strong>Measurement limitation:</strong> the termination ratio is not a direct measurement of intrinsic PEEP, recruitment or regional lung strain.<Review /></li>
      </ul>
      <APRVExpiratoryFlowDiagram />
    </section>

    <section className="space-y-3" aria-label="APRV monitoring and troubleshooting">
      <h3 className="text-lg font-semibold text-foreground">Monitoring, troubleshooting and stopping rules</h3>
      <p>Before and after initiation or a material setting change, reassess oxygenation, blood gases, measured release and spontaneous tidal volumes relative to predicted body weight, minute ventilation, waveforms, respiratory effort, comfort, blood pressure and perfusion. Use arterial monitoring and assess RV function where indicated. A pressure limit does not guarantee a safe tidal volume; P<sub>high</sub> − P<sub>low</sub> is not conventional driving pressure when alveolar pressure and muscle effort are uncertain.<Review /><InlineRef topicId={T} refLabel="Hirshberg APRV 2018" /></p>
      <dl className="space-y-3">
        {[
          ["Persistent hypoxaemia", "Check the airway, secretions, pneumothorax, haemodynamics and underlying disease first. Review recruitment versus overdistension, FiO₂, P high and T high with the ICU team. Increasing pressure or high-phase duration can worsen circulation or CO₂ clearance. Do not postpone indicated proning or escalation."],
          ["Hypercapnia / acidosis", "Check airway obstruction, circuit/HME dead space, release volume/frequency and loss of spontaneous ventilation. Shortening T high increases releases but may reduce recruitment. Do not simply lengthen T low and lose end-expiratory volume. Permissive hypercapnia requires an individual pH/PaCO₂ goal; it may be unsuitable in intracranial hypertension or RV failure."],
          ["Large tidal volumes / vigorous effort", "Treat pain, fever, acidosis and other drivers; reassess assistance and sedation. Monitor release volumes as well as spontaneous breaths. If effort remains injurious, prioritise lung protection, including controlled ventilation or paralysis when clinically indicated, rather than insisting on APRV."],
          ["Hypotension", "Exclude pneumothorax and excessive gas trapping; reassess venous return, volume responsiveness and RV function, using echocardiography when appropriate. Review airway pressures and provide cause-directed circulatory support, not an automatic fluid bolus."],
          ["Failure or deterioration", "Persistent severe gas-exchange failure, injurious effort/volumes, new barotrauma or haemodynamic compromise require immediate senior reassessment and a change of strategy. Better saturation alone is not success if ventilation or perfusion deteriorates."],
        ].map(([problem, response]) => (
          <div key={problem}>
            <dt className="font-semibold text-foreground">{problem}</dt>
            <dd>{response}</dd>
          </div>
        ))}
      </dl>
      <p>These responses are physiology-led adaptations of the review, not a validated escalation algorithm.<Review /></p>
    </section>

    <section className="space-y-3" aria-label="APRV weaning">
      <h3 className="text-lg font-semibold text-foreground">Weaning and transfers</h3>
      <p>“Drop and stretch” reduces P<sub>high</sub> while lengthening T<sub>high</sub>, progressively approaching CPAP with fewer releases. It is one protocol, not a mandatory schedule.<Review /></p>
      <ol className="list-decimal pl-5 space-y-2">
        <li>As the underlying illness improves, reduce FiO₂ first. The review begins pressure reduction once FiO₂ is around 0.4–0.5.</li>
        <li>Its example reduces P<sub>high</sub> by 2 cmH₂O every 2–6 hours as tolerated; once P<sub>high</sub> is 20 cmH₂O, T<sub>high</sub> is extended by 1–2 seconds with each further pressure reduction. Reassess oxygenation, CO₂, effort and circulation each time.</li>
        <li>Keep rechecking the release waveform as mechanics change. If gas exchange or effort worsens, stop the wean and reassess rather than following a clock.</li>
        <li>Transition to CPAP or pressure support under the local protocol, preserving adequate end-expiratory support. Passing a spontaneous breathing trial, airway protection, cough, secretions and clinical stability still determine extubation readiness.</li>
      </ol>
      <p>Transfers and disconnections can cause derecruitment. Prefer an APRV-capable transport ventilator where feasible; otherwise agree and test alternative settings with the ICU team before transfer. Do not assume P<sub>low</sub> = 0 means conventional PEEP should be zero.<Review /></p>
    </section>

    <section className="space-y-3" aria-label="APRV evidence">
      <h3 className="text-lg font-semibold text-foreground">Evidence: promising physiology, uncertain patient benefit</h3>
      <p><strong>Zhou 2017:</strong> a single-centre, unblinded RCT of 138 patients with early ARDS reported more ventilator-free days at day 28 (median 19 versus 2) with APRV. ICU mortality was 19.7% versus 34.3% (P=0.053), not a statistically significant mortality benefit. Different sedation practices, baseline imbalances and expert-led titration limit generalisability.<InlineRef topicId={T} refLabel="Zhou APRV 2017" /></p>
      <p><strong>Hirshberg 2018:</strong> a multicentre, three-arm feasibility trial stopped early because of low recruitment and inability to achieve the low-volume APRV target consistently. Release volumes often exceeded 12 mL/kg despite a low-volume protocol. It was not proof of clinical superiority and highlights difficulty reproducing lung-protective volumes.<InlineRef topicId={T} refLabel="Hirshberg APRV 2018" /></p>
      <p><strong>Interpretation:</strong> protocols differ substantially in P<sub>low</sub>, release timing, sedation and spontaneous-breath targets. Small studies and heterogeneous pooled results cannot establish a reliable survival advantage. The 2022 CADTH evidence update found uncertain effectiveness for several outcomes and no significant mortality difference in the included comparisons.<InlineRef topicId={T} refLabel="CADTH APRV 2022" /></p>
      <p><strong>Guideline context:</strong> ESICM’s 2023 ARDS guideline does not address APRV specifically. Its recommendations for low tidal volumes and indicated prone positioning remain the benchmark; absence of an APRV recommendation is neither endorsement nor proof of harm. No particular ARDS severity subgroup is established as the proven best candidate.<InlineRef topicId={T} refLabel="ESICM ARDS 2023" /><Review /></p>
    </section>

    <section className="space-y-3" aria-label="APRV viva and quiz">
      <h3 className="text-lg font-semibold text-foreground">Viva: explain APRV in one minute</h3>
      <p>“APRV is pressure-controlled, time-cycled ventilation with a long high-pressure phase and brief releases. I set P high, P low, T high and T low, plus FiO₂, using a named protocol and the preceding ventilator assessment. The high phase supports recruitment; releases and spontaneous breaths provide ventilation. I titrate release duration from the expiratory waveform, not a fixed time. I monitor volumes, gases, effort and circulation because pressure limitation and spontaneous breathing do not guarantee lung protection. I wean by reducing pressure and release frequency as tolerated. Outcome evidence is limited, and APRV must not displace proven ARDS care.”<Review /></p>
      <h3 className="text-lg font-semibold text-foreground">APRV knowledge check</h3>
      <QuizSection questions={[
        { question: "Peak expiratory flow is −60 L/min and terminal flow is −45 L/min. What is the termination ratio?", options: ["25%", "75%", "−75%", "133%"], correctIndex: 1, explanation: "Use flow magnitudes: 45/60 = 75%. Swindin’s personalised approach targets approximately 75%; protocols differ. Source: Swindin et al., BJA Education 2020." },
        { question: "T high is 5 seconds and T low is 0.5 seconds. How many timed releases occur per minute?", options: ["5", "10.9", "30", "60"], correctIndex: 1, explanation: "60/(5 + 0.5) = 10.9 releases/min. Spontaneous breaths add to total respiratory rate. Source: Swindin et al., BJA Education 2020." },
        { question: "Which statement about APRV safety is correct?", options: ["P low of zero means alveolar PEEP is zero", "Pressure limitation guarantees a low tidal volume", "Vigorous spontaneous effort may cause lung injury", "Paralysis stops all timed releases"], correctIndex: 2, explanation: "High effort may generate injurious transpulmonary pressure. Set P low is not total PEEP, volumes remain variable, and timed releases continue without spontaneous breathing. Sources: Swindin 2020; Hirshberg 2018." },
        { question: "What can be concluded from the current cited evidence?", options: ["APRV has an established survival advantage", "ESICM 2023 specifically endorses APRV", "A better saturation proves lung protection", "Physiological benefits do not establish mortality superiority"], correctIndex: 3, explanation: "Small heterogeneous trials do not establish a survival advantage. ESICM 2023 does not address APRV specifically. Sources: Zhou 2017; Hirshberg 2018; CADTH 2022; ESICM 2023." },
      ]} />
    </section>
  </div>
);