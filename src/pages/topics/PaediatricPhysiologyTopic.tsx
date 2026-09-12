import { Link } from "react-router-dom";
import { Baby, HeartPulse, Thermometer, Wind } from "lucide-react";
import { TopicTemplate } from "@/components/topic/TopicTemplate";
import { CollapsibleSubsection } from "@/components/topic/CollapsibleSubsection";
import { ExamSection } from "@/components/exam/ExamSection";
import type { WorkedExample } from "@/components/topic/WorkedExamples";
import { Exam } from "@/data/curriculum";
import { InlineRef } from "@/components/references/InlineRef";

const objectives = [
  "Describe neonatal and infant cardiac output, its heart-rate dependence, and the structural reasons for a relatively fixed stroke volume.",
  "Explain the transitional circulation, persistence of fetal shunts and the physiology of persistent pulmonary hypertension of the newborn.",
  "Quantify neonatal oxygen consumption, alveolar ventilation and FRC, and predict the speed of desaturation during apnoea.",
  "Explain oxygen delivery in the neonate, including the left-shifted fetal haemoglobin dissociation curve and its clinical consequences.",
  "Describe neonatal thermoregulation — high surface area to mass ratio, non-shivering thermogenesis in brown fat, and the neutral thermal environment — and apply heat-conservation strategies in theatre.",
];

const workedExamples: WorkedExample[] = [
  {
    title: "Cardiac output and index in a 3.5 kg neonate",
    scenario: (
      <>
        A term 3.5 kg neonate has a heart rate of 140/min. Estimate cardiac output and cardiac
        index, and compare with a 70 kg adult.
      </>
    ),
    working: (
      <>
        Neonatal stroke volume is approximately <strong>1.5 mL/kg</strong> ≈ 5 mL. Cardiac output =
        SV × HR = 5 × 140 = <strong>≈700 mL/min</strong>, i.e. <strong>200 mL/kg/min</strong>.
        Cardiac index ≈ 700 mL/min ÷ 0.23 m² ≈ <strong>3 L/min/m²</strong>. The adult figure is
        70 mL × 70/min ≈ 5 L/min = <strong>70 mL/kg/min</strong>.
      </>
    ),
    answer: (
      <>
        Weight-indexed cardiac output is <strong>two to three times the adult value</strong> to
        match a high metabolic rate, and it is achieved almost entirely by heart rate: the
        neonatal myocardium has fewer contractile elements, less organised sarcomeres, poor
        compliance and immature sarcoplasmic reticulum calcium handling, so stroke volume cannot
        rise much. <strong>Bradycardia therefore causes a near-proportional fall in cardiac
        output</strong> and is treated as a pre-arrest sign.
      </>
    ),
    cites: ["BJA Educ Neonatal Physiol 2015", "APLS 2021"],
  },
  {
    title: "Time to desaturation after apnoea at induction",
    scenario: (
      <>
        Why does a preoxygenated 3 kg neonate desaturate within seconds while a healthy adult
        tolerates several minutes of apnoea?
      </>
    ),
    working: (
      <>
        Neonatal oxygen consumption is <strong>6–9 mL/kg/min</strong> (adult ≈3), so a 3 kg
        neonate consumes ≈20 mL O₂/min. FRC is <strong>≈30 mL/kg</strong> ≈ 90 mL; even fully
        denitrogenated this stores only ~80 mL of oxygen, and closing capacity lies{" "}
        <em>above</em> FRC so airways close during tidal breathing. Alveolar ventilation is{" "}
        <strong>100–150 mL/kg/min</strong> against the same FRC, giving a ventilation:FRC ratio of
        ~5:1 (adult 1.5:1).
      </>
    ),
    answer: (
      <>
        The usable reservoir divided by consumption gives well under a minute —{" "}
        <strong>often 10–20 seconds of apnoea before desaturation</strong>. The same high
        ventilation:FRC ratio speeds inhalational induction and emergence. Practical implications:
        meticulous preoxygenation, CPAP/apnoeic oxygenation, and short apnoea times.
      </>
    ),
    cites: ["BJA Educ Neonatal Physiol 2015", "Neonatal Resp Physiol 2020"],
  },
  {
    title: "Heat loss in a 1.2 kg preterm infant",
    scenario: (
      <>
        A 1.2 kg preterm infant is transferred for laparotomy. Rank the mechanisms of heat loss and
        state the target environment.
      </>
    ),
    working: (
      <>
        Surface area to mass ratio is ~3× the adult, skin is thin with minimal subcutaneous fat, and
        the head is a large proportion of surface area. In a naked infant under radiant theatre
        lights, <strong>radiation</strong> is the largest loss (~40%), then{" "}
        <strong>convection</strong> (~30%), <strong>evaporation</strong> (~25%, greater still with
        immature stratum corneum) and <strong>conduction</strong> (~5%). Brown adipose tissue
        (non-shivering thermogenesis, uncoupling protein-1) is sparse before 28 weeks and blunted by
        volatile agents; infants cannot shiver effectively.
      </>
    ),
    answer: (
      <>
        Aim for a <strong>neutral thermal environment</strong> (ambient 26–28 °C for term neonates,
        up to 28–30 °C or an incubator for preterm infants) with core temperature{" "}
        <strong>36.5–37.5 °C</strong>. Use forced-air warming, a warming mattress, plastic
        occlusive wrap, head covering, warmed and humidified gases, warmed irrigation and fluids,
        and continuous core temperature monitoring. Hypothermia increases oxygen consumption,
        metabolic acidosis, apnoea, bleeding and mortality.
      </>
    ),
    cites: ["WHO Thermal Protection 1997", "ERC Newborn 2021"],
  },
];

const keyPoints = [
  {
    text: "Neonatal cardiac output is 200–250 mL/kg/min (2–3× adult per kg) and is rate-dependent — stroke volume is ~1.5 mL/kg and relatively fixed, so bradycardia is a pre-arrest sign",
    cites: ["BJA Educ Neonatal Physiol 2015"],
  },
  {
    text: "The immature myocardium has fewer myofibrils (~30% vs 60%), disorganised sarcomeres, immature sarcoplasmic reticulum and depends on extracellular calcium — poor compliance and limited contractile reserve",
    cites: ["BJA Educ Neonatal Physiol 2015"],
  },
  {
    text: "Transitional circulation: hypoxia, acidosis, hypercarbia and hypothermia raise pulmonary vascular resistance and can reopen the ductus arteriosus and foramen ovale, causing right-to-left shunt (PPHN)",
    cites: ["PPHN Review 2019"],
  },
  {
    text: "Oxygen consumption is 6–9 mL/kg/min (adult ~3) with alveolar ventilation 100–150 mL/kg/min and FRC ~30 mL/kg — a ventilation:FRC ratio of about 5:1 means rapid desaturation and fast inhalational induction",
    cites: ["Neonatal Resp Physiol 2020"],
  },
  {
    text: "Fetal haemoglobin (60–80% at birth) has a LEFT-shifted curve (P50 ~19 mmHg) because it binds 2,3-DPG poorly — high oxygen affinity but impaired tissue unloading; HbF falls to ~5% by 6 months with a physiological nadir of Hb 9.5–11 g/dL at 8–12 weeks",
    cites: ["Fetal Hb Physiol 2018"],
  },
  {
    text: "Neonates have ~3× the adult surface area to mass ratio, thin skin, little subcutaneous fat and cannot shiver — heat loss is dominated by radiation, then convection and evaporation",
    cites: ["WHO Thermal Protection 1997"],
  },
  {
    text: "Non-shivering thermogenesis in brown adipose tissue (uncoupling protein-1, sympathetically driven, thyroid-dependent) is the main heat source; it raises oxygen consumption up to 2–3× and is impaired by volatile agents, prematurity and beta-blockade",
    cites: ["Brown Fat Thermogenesis 2017"],
  },
  {
    text: "Target core temperature 36.5–37.5 °C with a neutral thermal environment (theatre 26–28 °C, higher for preterm); hypothermia causes acidosis, apnoea, coagulopathy, delayed drug clearance and increased mortality",
    cites: ["ERC Newborn 2021", "WHO Thermal Protection 1997"],
  },
];

const PaediatricPhysiologyTopic = () => {
  return (
    <TopicTemplate
      title="Paediatric Physiology"
      subtitle="FRCA Primary / Final — Physiology"
      backPath="/physiology"
      backLabel="Physiology"
      accentColor="text-physiology"
      objectives={objectives}
      workedExamples={workedExamples}
      keyPoints={keyPoints}
      sectionSources={{
        objectives: ["BJA Educ Neonatal Physiol 2015"],
        workedExamples: ["BJA Educ Neonatal Physiol 2015", "WHO Thermal Protection 1997"],
        keyPoints: ["BJA Educ Neonatal Physiol 2015", "Neonatal Resp Physiol 2020"],
      }}
      topicId="paediatric-physiology"
      topicTitle="Paediatric Physiology"
      quizQuestions={[
        {
          question:
            "Why is cardiac output in the neonate described as heart-rate dependent?",
          options: [
            "Because neonatal systemic vascular resistance is fixed",
            "Because the immature myocardium has limited contractile reserve and poor compliance, giving a relatively fixed stroke volume",
            "Because the neonatal heart lacks sympathetic innervation entirely",
            "Because neonatal blood volume per kilogram is lower than in adults",
          ],
          correctIndex: 1,
          explanation:
            "Fewer and disorganised contractile elements (~30% myofibrils vs 60% in adults), an immature sarcoplasmic reticulum and a stiff ventricle mean stroke volume (~1.5 mL/kg) cannot rise significantly. Output of 200–250 mL/kg/min is therefore maintained by rate, and bradycardia causes a near-proportional fall in output.",
        },
        {
          question:
            "A term neonate has an oxygen consumption of about 7 mL/kg/min and an FRC of 30 mL/kg. What is the main clinical consequence?",
          options: [
            "Slow inhalational induction and slow desaturation",
            "Rapid desaturation during apnoea and rapid inhalational induction",
            "Resistance to hypoxaemia because of fetal haemoglobin",
            "A high risk of oxygen toxicity during preoxygenation",
          ],
          correctIndex: 1,
          explanation:
            "High oxygen consumption with a small FRC reservoir and a ventilation:FRC ratio of about 5:1 means the oxygen store lasts seconds, while alveolar concentration of volatile agent equilibrates quickly — rapid desaturation and rapid induction/emergence.",
        },
        {
          question:
            "Which statement about fetal haemoglobin is correct?",
          options: [
            "It has a right-shifted dissociation curve, easing tissue oxygen release",
            "It binds 2,3-DPG poorly, giving a left-shifted curve with P50 around 19 mmHg",
            "It comprises about 5% of haemoglobin at birth",
            "It persists unchanged until 2 years of age",
          ],
          correctIndex: 1,
          explanation:
            "HbF (two alpha, two gamma chains) binds 2,3-DPG poorly, so its curve is left-shifted (P50 ~19 vs 27 mmHg). This favours placental uptake but impairs tissue unloading. HbF is 60–80% at birth and falls to about 5% by 6 months.",
        },
        {
          question:
            "What is the principal mechanism of heat production in a cold-stressed term neonate?",
          options: [
            "Shivering thermogenesis in skeletal muscle",
            "Non-shivering thermogenesis in brown adipose tissue via uncoupling protein-1",
            "Increased hepatic gluconeogenesis",
            "Cutaneous vasodilatation to redistribute core heat",
          ],
          correctIndex: 1,
          explanation:
            "Neonates cannot shiver effectively. Noradrenaline acting on beta-3 receptors in brown fat uncouples oxidative phosphorylation through UCP-1 (thermogenin), producing heat at the cost of a 2–3-fold rise in oxygen consumption. Volatile agents, prematurity and beta-blockade blunt this response.",
        },
        {
          question:
            "Which combination most predisposes a neonate to reopening of fetal shunts and right-to-left shunting?",
          options: [
            "Hypocarbia, alkalosis and normothermia",
            "Hypoxia, acidosis, hypercarbia and hypothermia",
            "Hyperoxia and hypothermia",
            "Isolated systemic hypertension",
          ],
          correctIndex: 1,
          explanation:
            "All four raise pulmonary vascular resistance. If PVR exceeds systemic resistance the ductus arteriosus and foramen ovale can reopen, producing right-to-left shunt and refractory hypoxaemia — persistent pulmonary hypertension of the newborn. Management targets oxygenation, normocarbia, correction of acidosis, warmth and sometimes inhaled nitric oxide.",
        },
      ]}
      coreConcepts={
        <>
          <ExamSection id="cardiac-output" exams={[Exam.PRIMARY, Exam.FINAL]} className="scroll-mt-24">
            <CollapsibleSubsection title="Neonatal & Infant Cardiac Output" defaultOpen>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Weight-indexed cardiac output is highest at birth —{" "}
                <strong>200–250 mL/kg/min</strong> in the neonate, falling to about{" "}
                <strong>100 mL/kg/min</strong> in the infant and{" "}
                <strong>70 mL/kg/min</strong> in the adult — because metabolic rate and oxygen
                consumption per kilogram are correspondingly high. Stroke volume is only{" "}
                <strong>~1.5 mL/kg</strong> and is relatively fixed, so output is defended by heart
                rate.{" "}
                <InlineRef topicId="paediatric-physiology" refLabel="BJA Educ Neonatal Physiol 2015" />
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The structural basis matters in the viva: the neonatal myocyte contains{" "}
                <strong>~30% contractile elements</strong> (adult ~60%) in disorganised sarcomeres,
                the sarcoplasmic reticulum and T-tubule system are immature so contraction depends
                on <strong>trans-sarcolemmal (extracellular) calcium</strong>, and the ventricle is
                stiff and poorly compliant. Consequences: limited preload reserve (the
                Frank–Starling curve is flat and easily overloaded), sensitivity to{" "}
                <strong>ionised hypocalcaemia</strong> (citrated blood, rapid transfusion) and to
                the negative inotropy of volatile agents, and ventricular interdependence — the
                thin right ventricle is nearly the same mass as the left at birth.
              </p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-3 text-foreground font-semibold">Variable</th>
                      <th className="text-left py-2 pr-3 text-foreground font-semibold">Neonate</th>
                      <th className="text-left py-2 pr-3 text-foreground font-semibold">Infant (1 y)</th>
                      <th className="text-left py-2 text-foreground font-semibold">Adult</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-3 font-medium text-foreground">Cardiac output</td>
                      <td className="py-2 pr-3">200–250 mL/kg/min</td>
                      <td className="py-2 pr-3">~100 mL/kg/min</td>
                      <td className="py-2">~70 mL/kg/min</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-3 font-medium text-foreground">Stroke volume</td>
                      <td className="py-2 pr-3">~1.5 mL/kg (fixed)</td>
                      <td className="py-2 pr-3">~1.5 mL/kg</td>
                      <td className="py-2">~1 mL/kg (variable)</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-3 font-medium text-foreground">Heart rate</td>
                      <td className="py-2 pr-3">120–160/min</td>
                      <td className="py-2 pr-3">110–150/min</td>
                      <td className="py-2">60–100/min</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-3 font-medium text-foreground">Blood volume</td>
                      <td className="py-2 pr-3">85–90 mL/kg (preterm 90–100)</td>
                      <td className="py-2 pr-3">75–80 mL/kg</td>
                      <td className="py-2">65–70 mL/kg</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3 font-medium text-foreground">Systolic BP</td>
                      <td className="py-2 pr-3">60–80 mmHg</td>
                      <td className="py-2 pr-3">80–100 mmHg</td>
                      <td className="py-2">100–140 mmHg</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Practically: treat bradycardia aggressively (oxygenate and ventilate first — most
                neonatal bradycardia is hypoxic; then atropine 20 µg/kg and adrenaline 10 µg/kg
                IV/IO if arrest), avoid deep volatile anaesthesia without support, give calcium with
                rapid transfusion, and titrate fluid in{" "}
                <strong>10 mL/kg</strong> aliquots because the stiff ventricle tolerates volume
                poorly.{" "}
                <InlineRef topicId="paediatric-physiology" refLabel="APLS 2021" />{" "}
                Age-banded vital signs and WETFLAG calculations are tabulated in{" "}
                <Link to="/clinical/paediatric-core" className="text-primary underline underline-offset-2 font-medium">
                  Paediatric Core Essentials
                </Link>
                .
              </p>
            </CollapsibleSubsection>

            <CollapsibleSubsection title="Transitional Circulation & PPHN">
              <p className="text-muted-foreground leading-relaxed mb-4">
                At birth, lung expansion and a rising alveolar oxygen tension drop pulmonary
                vascular resistance, pulmonary blood flow increases eightfold, and clamping the cord
                removes the low-resistance placenta so systemic resistance rises. Left atrial
                pressure now exceeds right, closing the <strong>foramen ovale</strong> functionally
                within hours (anatomically over months). Rising PaO₂ and falling prostaglandin E₂
                constrict the <strong>ductus arteriosus</strong> functionally by 24–48 hours,
                anatomically by 2–3 weeks. The <strong>ductus venosus</strong> closes within days.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This circulation is <strong>transitional, not fixed</strong>. Hypoxia, acidosis,
                hypercarbia, hypothermia, sepsis and pain raise pulmonary vascular resistance; if it
                exceeds systemic resistance, the shunts reopen and right-to-left flow produces
                refractory hypoxaemia — <strong>persistent pulmonary hypertension of the
                newborn</strong>, classically with a pre/post-ductal saturation gradient &gt;5–10%.
                Management is oxygenation, gentle ventilation to normocarbia, correction of acidosis
                and temperature, adequate analgesia, maintaining systemic pressure, and inhaled
                nitric oxide (20 ppm) with ECMO as rescue.{" "}
                <InlineRef topicId="paediatric-physiology" refLabel="PPHN Review 2019" />
              </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="oxygen-consumption" exams={[Exam.PRIMARY, Exam.FINAL]} className="scroll-mt-24">
            <CollapsibleSubsection title="Oxygen Consumption, Ventilation & Delivery">
              <p className="text-muted-foreground leading-relaxed mb-4">
                Neonatal oxygen consumption is <strong>6–9 mL/kg/min</strong> (adult ~3 mL/kg/min),
                reflecting a basal metabolic rate roughly twice the adult per kilogram, growth, and
                the metabolic cost of thermoregulation. To supply it, alveolar ventilation is{" "}
                <strong>100–150 mL/kg/min</strong> — achieved by a high respiratory rate (30–60/min)
                rather than a larger tidal volume, which stays at{" "}
                <strong>6–8 mL/kg</strong> as in the adult.{" "}
                <InlineRef topicId="paediatric-physiology" refLabel="Neonatal Resp Physiol 2020" />
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                FRC is similar per kilogram (<strong>~30 mL/kg</strong>) but{" "}
                <strong>closing capacity lies above FRC</strong> because the chest wall is
                compliant, elastic recoil is low and there is little alveolar interdependence — so
                airways close during tidal breathing and neonates rely on{" "}
                <em>dynamic</em> FRC maintenance (laryngeal braking, rapid rate, expiratory muscle
                tone), all of which are abolished by anaesthesia and paralysis. The{" "}
                <strong>ventilation:FRC ratio of ~5:1</strong> (adult 1.5:1) explains both rapid
                desaturation on apnoea and fast inhalational induction and emergence. Add a
                horizontal ribcage, type-I fatigue-resistant diaphragmatic fibres of only 10–25%
                (25% at term, 55% in adults), obligate nasal breathing in early infancy and high
                nasal/airway resistance, and small reductions in airway calibre become
                clinically critical (resistance rises with the fourth power of radius).
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong>Oxygen delivery.</strong> DO₂ = cardiac output × (1.34 × Hb × SaO₂) plus
                dissolved oxygen. Neonatal haemoglobin is high (14–20 g/dL) but{" "}
                <strong>60–80% is HbF</strong>, which binds 2,3-DPG poorly and therefore has a
                left-shifted dissociation curve (<strong>P50 ≈19 mmHg</strong> vs 27 mmHg): excellent
                placental uptake, impaired tissue unloading. HbF falls to ~5% by 6 months, and the{" "}
                <strong>physiological nadir of haemoglobin (9.5–11 g/dL) occurs at 8–12 weeks</strong>{" "}
                (earlier and lower in preterm infants) — a period of reduced oxygen-carrying reserve.{" "}
                <InlineRef topicId="paediatric-physiology" refLabel="Fetal Hb Physiol 2018" />
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Clinical translation: preoxygenate thoroughly, apply CPAP/PEEP (5 cmH₂O) from
                induction to defend FRC, keep apnoea times short with apnoeic oxygenation, ventilate
                with pressure control and accurate small-volume delivery, and avoid both hypoxaemia
                and unnecessary hyperoxia (retinopathy of prematurity, oxidative injury) — target
                SpO₂ 91–95% in preterm infants. Ex-premature infants under 60 weeks post-conceptual
                age also carry a real risk of{" "}
                <strong>postoperative apnoea</strong> and need respiratory monitoring for 12–24
                hours.{" "}
                <InlineRef topicId="paediatric-physiology" refLabel="ERC Newborn 2021" />
              </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="thermoregulation" exams={[Exam.PRIMARY, Exam.FINAL]} className="scroll-mt-24">
            <CollapsibleSubsection title="Thermoregulation">
              <p className="text-muted-foreground leading-relaxed mb-4">
                Neonates are <strong>homeothermic but poorly equipped</strong>. Surface area to mass
                ratio is about three times the adult, the head is ~20% of surface area, skin is thin
                with a immature stratum corneum (huge evaporative loss in preterm infants),
                subcutaneous fat is scant, and effective shivering is absent. Anaesthesia adds
                vasodilatation, a widened inter-threshold range and abolition of behavioural
                responses.{" "}
                <InlineRef topicId="paediatric-physiology" refLabel="WHO Thermal Protection 1997" />
              </p>
              <div className="overflow-x-auto mb-4">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-3 text-foreground font-semibold">Mechanism</th>
                      <th className="text-left py-2 pr-3 text-foreground font-semibold">Approx. share</th>
                      <th className="text-left py-2 text-foreground font-semibold">Countermeasure</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-3 font-medium text-foreground">Radiation</td>
                      <td className="py-2 pr-3">~40%</td>
                      <td className="py-2">Raise ambient temperature, radiant warmer, cover exposed skin and head</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-3 font-medium text-foreground">Convection</td>
                      <td className="py-2 pr-3">~30%</td>
                      <td className="py-2">Forced-air warming blanket, minimise draughts and laminar flow exposure</td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2 pr-3 font-medium text-foreground">Evaporation</td>
                      <td className="py-2 pr-3">~25% (more if preterm)</td>
                      <td className="py-2">Dry immediately, occlusive plastic wrap, humidified warmed gases, warm skin prep</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3 font-medium text-foreground">Conduction</td>
                      <td className="py-2 pr-3">~5%</td>
                      <td className="py-2">Warming mattress, warmed IV and irrigation fluids</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                <strong>Non-shivering thermogenesis</strong> is the neonate's chief defence. Cold
                receptors drive sympathetic noradrenaline release onto <strong>beta-3</strong>{" "}
                receptors in <strong>brown adipose tissue</strong> (interscapular, perirenal,
                axillary, around great vessels — 2–6% of body weight at term). Lipolysis feeds fatty
                acids into mitochondria rich in <strong>uncoupling protein-1 (thermogenin)</strong>,
                which dissipates the proton gradient as heat instead of ATP. The process is
                thyroid-dependent (T4 → T3 by local deiodinase), can{" "}
                <strong>double or triple oxygen consumption</strong>, and generates lactate, glucose
                consumption and metabolic acidosis. It is impaired by prematurity (little brown fat
                before 28 weeks), hypoxia, hypoglycaemia, beta-blockade and{" "}
                <strong>volatile anaesthetics</strong> — so an anaesthetised neonate is essentially
                poikilothermic.{" "}
                <InlineRef topicId="paediatric-physiology" refLabel="Brown Fat Thermogenesis 2017" />
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Aim for a <strong>neutral thermal environment</strong> — the ambient temperature at
                which oxygen consumption is minimal: about <strong>32–34 °C incubator</strong> for a
                naked term neonate, higher for preterm; theatre ambient{" "}
                <strong>26–28 °C</strong> (up to 30 °C for neonatal surgery). Target core
                temperature <strong>36.5–37.5 °C</strong> with continuous monitoring
                (naso/oesophageal or rectal). Consequences of hypothermia: increased oxygen
                consumption, metabolic acidosis, pulmonary vasoconstriction and shunt reversal,
                apnoea, hypoglycaemia, coagulopathy and platelet dysfunction, delayed drug
                metabolism and prolonged neuromuscular blockade, poor wound healing and increased
                mortality. Overheating is also harmful — it raises metabolic rate, causes apnoea and
                dehydration, and outside therapeutic hypothermia protocols hyperthermia worsens
                hypoxic-ischaemic injury.{" "}
                <InlineRef topicId="paediatric-physiology" refLabel="ERC Newborn 2021" />
              </p>
            </CollapsibleSubsection>
          </ExamSection>

          <ExamSection id="related" exams={[Exam.PRIMARY, Exam.FINAL, Exam.FFICM]} className="scroll-mt-24">
            <CollapsibleSubsection title="Where This Applies">
              <div className="grid sm:grid-cols-2 gap-3">
                <Link
                  to="/clinical/paediatric-core"
                  className="flex items-start gap-3 rounded-lg border border-border p-3 hover:border-primary/50 transition-colors"
                >
                  <Baby className="h-5 w-5 text-clinical mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <div className="font-medium text-foreground text-sm">Paediatric Core Essentials</div>
                    <div className="text-xs text-muted-foreground">
                      Age-banded vitals, fluids, weight-based dosing, pain scoring
                    </div>
                  </div>
                </Link>
                <Link
                  to="/clinical/paediatric-anaesthesia"
                  className="flex items-start gap-3 rounded-lg border border-border p-3 hover:border-primary/50 transition-colors"
                >
                  <Wind className="h-5 w-5 text-clinical mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <div className="font-medium text-foreground text-sm">Paediatric Anaesthesia</div>
                    <div className="text-xs text-muted-foreground">
                      Airway management, induction technique, common procedures
                    </div>
                  </div>
                </Link>
                <Link
                  to="/intensive-care/paediatric-icu"
                  className="flex items-start gap-3 rounded-lg border border-border p-3 hover:border-primary/50 transition-colors"
                >
                  <HeartPulse className="h-5 w-5 text-icu mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <div className="font-medium text-foreground text-sm">Paediatric Intensive Care</div>
                    <div className="text-xs text-muted-foreground">
                      Sepsis, PARDS, congenital heart disease, neuroprotection
                    </div>
                  </div>
                </Link>
                <Link
                  to="/physiology/temperature-regulation"
                  className="flex items-start gap-3 rounded-lg border border-border p-3 hover:border-primary/50 transition-colors"
                >
                  <Thermometer className="h-5 w-5 text-physiology mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    <div className="font-medium text-foreground text-sm">Temperature Regulation</div>
                    <div className="text-xs text-muted-foreground">
                      Adult thermoregulation, redistribution and perioperative hypothermia
                    </div>
                  </div>
                </Link>
              </div>
            </CollapsibleSubsection>
          </ExamSection>
        </>
      }
    />
  );
};

export default PaediatricPhysiologyTopic;
