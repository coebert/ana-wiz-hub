import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "./LessonSources";
import PEEPTimingDiagram from "@/components/diagrams/intensive-care/PEEPTimingDiagram";

const T = "peep-management";
const R = ({ label }: { label: string }) => <InlineRef topicId={T} refLabel={label} />;
const H = ({ children }: { children: ReactNode }) => <h3 className="text-lg font-semibold text-foreground">{children}</h3>;
const Check = ({ question, children }: { question: string; children: ReactNode }) => <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: {question}</summary><p className="mt-2">{children}</p></details>;
const wrap = "space-y-4 text-sm text-muted-foreground leading-relaxed";

export function PEEPFoundationsTeaching() {
  return <div className={wrap}>
    <H>Set PEEP, total PEEP and intrinsic PEEP</H>
    <p>Positive end-expiratory pressure (PEEP) maintains positive airway pressure at the end of expiration. <strong className="text-foreground">Set/external PEEP</strong> is the ventilator setting; <strong className="text-foreground">intrinsic PEEP (auto-PEEP)</strong> is pressure remaining because expiration is incomplete. In a passive patient with a valid end-expiratory occlusion, intrinsic PEEP is the measured total PEEP minus set PEEP. A long expiratory time constant in obstructed airways makes breath stacking more likely.<R label="Stather 2005 measurement" /></p>
    <p>PEEP can stabilise recruitable lung units and limit repeated closure and reopening. It can also overdistend already open units, impair venous return and increase right-ventricular afterload. The effect depends on lung recruitability, chest-wall mechanics and circulation: the same increase can improve one patient's mechanics and harm another's.<R label="ATS 2024 balance" /></p>
    <H>Measure rather than infer from one pressure</H>
    <ul className="list-disc pl-5 space-y-2">
      <li><strong className="text-foreground">End-expiratory hold:</strong> measure total PEEP only when the patient is relaxed without active expiratory muscle effort. Effort can falsely elevate the result; airway closure can conceal trapped pressure in poorly communicating lung regions.<R label="Stather 2005 measurement" /></li>
      <li><strong className="text-foreground">End-inspiratory hold:</strong> at zero flow, plateau pressure reflects static respiratory-system pressure, not peak resistive pressure. Inspiratory effort invalidates a passive interpretation. A rising plateau in obstruction needs assessment for worsening hyperinflation and other causes, including pneumothorax and reduced compliance.<R label="Stather 2005 plateau" /></li>
      <li><strong className="text-foreground">Flow–time waveform:</strong> expiratory flow still continuing when the next breath starts suggests incomplete exhalation. Flow reaching zero does not prove every obstructed region is empty; combine it with holds and clinical assessment.<R label="Stather 2005 occult" /></li>
    </ul>
    <Check question="set PEEP is 5 and a valid expiratory hold reads 13 cmH₂O. What is intrinsic PEEP?">13 − 5 = 8 cmH₂O. The patient is ventilating above a total end-expiratory pressure of 13, not simply the set 5. Check for expiratory effort and hidden regional trapping before treating the number as exact.</Check>
    <LessonSources topicId={T} labels={["ATS 2024 balance", "Stather 2005 measurement", "Stather 2005 plateau", "Stather 2005 occult"]} />
  </div>;
}

export function PEEPLungProtectionTeaching() {
  return <div className={wrap}>
    <H>Lung protection is a package, not a PEEP target</H>
    <p>For adult ARDS, ATS retains the recommendation for <strong className="text-foreground">tidal volumes 4–8 mL/kg predicted body weight (PBW) and plateau pressure below 30 cmH₂O</strong>. PBW describes expected lung size from height and sex rather than actual body mass. Changing PEEP does not make an excessive tidal volume safe.<R label="ATS 2024 protection" /></p>
    <p>Driving pressure is plateau pressure minus <strong className="text-foreground">total PEEP</strong> during passive, static measurement; static respiratory-system compliance is tidal volume divided by that difference. These are respiratory-system measurements, not direct regional lung stress or transpulmonary pressure. Compare measurements at a stable tidal volume and under comparable effort conditions.<R label="Respiratory mechanics 2005" /></p>
    <p>A fall in driving pressure at unchanged tidal volume can suggest improved compliance/recruitment, while a rise can suggest overdistension. Neither finding establishes recruitability by itself. A single numerical driving-pressure threshold is not a validated stand-alone prescription to increase PEEP; oxygenation and haemodynamic tolerance must be assessed alongside it.<R label="Respiratory mechanics 2005" /><R label="ATS 2024 individualisation" /></p>
    <H>Proning and oxygenation</H>
    <p>ATS retains prone positioning for <strong className="text-foreground">more than 12 hours per day in severe ARDS</strong>. PEEP titration is not a substitute for indicated proning or for specialist escalation when hypoxaemia remains refractory.<R label="ATS 2024 protection" /> Use an explicit local oxygenation target and approved PEEP/FiO₂ strategy rather than maximising saturation at the cost of damaging pressure.</p>
    <Check question="plateau is 28, total PEEP 12, tidal volume 420 mL. What are driving pressure and compliance?">Driving pressure = 28 − 12 = 16 cmH₂O. Compliance = 420 / 16 = 26.25 mL/cmH₂O. These arithmetic results describe this passive respiratory system; they do not determine a safe PEEP automatically. If set PEEP was 8, subtracting only 8 would wrongly report driving pressure as 20.</Check>
    <LessonSources topicId={T} labels={["ATS 2024 protection", "Respiratory mechanics 2005", "ATS 2024 individualisation"]} />
  </div>;
}

export function PEEPTitrationTeaching() {
  return <div className={wrap}>
    <H>What current ARDS guidance actually recommends</H>
    <p><strong className="text-foreground">ATS 2024 conditionally suggests higher rather than lower PEEP, without lung recruitment manoeuvres, for moderate-to-severe ARDS</strong> (low-to-moderate certainty). This is a population-level recommendation, not an instruction to increase PEEP in every hypoxaemic patient.<R label="ATS 2024 higher PEEP" /></p>
    <p><strong className="text-foreground">ESICM 2023 made no recommendation for routine higher versus lower PEEP/FiO₂ strategies</strong> to reduce mortality. The guidelines differ in evidence assessment; do not present one universally optimal table or method as settled.<R label="ESICM 2023 PEEP" /></p>
    <H>A supervised bedside assessment sequence</H>
    <p>The following is <strong className="text-foreground">clinical teaching synthesis</strong> of the physiology and guidance, not a quoted universal protocol. Step size, stabilisation time and monitoring frequency belong to the local protocol and the patient's stability.<R label="ATS 2024 individualisation" /><R label="Respiratory mechanics 2005" /></p>
    <ol className="list-decimal pl-5 space-y-3">
      <li><strong className="text-foreground">Identify the phenotype and goal.</strong> Confirm the dominant problem: recruitable ARDS, obstructive trapping or another cause. Check the airway/circuit and reversible deterioration before treating low saturation solely with PEEP.</li>
      <li><strong className="text-foreground">Record a comparable baseline.</strong> Document mode, PBW and delivered tidal volume, FiO₂, rate, inspiratory time, set/total PEEP, valid plateau/driving pressure, oxygenation, blood pressure, perfusion and vasoactive support. Assess RV function when clinically indicated.</li>
      <li><strong className="text-foreground">Change PEEP deliberately.</strong> Use the agreed local PEEP/FiO₂ strategy and clinician-supervised incremental assessment. Avoid changing multiple variables unknowingly. In pressure control or pressure support, check whether the device specifies inspiratory pressure above PEEP or as an absolute pressure; recheck delivered tidal volume.</li>
      <li><strong className="text-foreground">Reassess benefit and cost.</strong> Better oxygenation at comparable FiO₂, stable/improved compliance and preserved circulation support continued consideration. An oxygenation gain accompanied by hypotension, worse compliance or greater pressure cost is not an uncomplicated success.</li>
      <li><strong className="text-foreground">Stop, reverse and investigate deterioration.</strong> New hypotension, falling perfusion, increasing vasoactive need, overdistension or suspected barotrauma require urgent reassessment; return to the previous tolerated strategy when appropriate. Do not chase saturation while circulation deteriorates.</li>
      <li><strong className="text-foreground">Revisit after clinical changes.</strong> Proning, resolution of oedema, altered effort, suctioning/disconnections and changes in chest-wall mechanics can change the response. PEEP is not a set-and-forget setting.</li>
    </ol>
    <H>Advanced titration: useful information, uncertain outcome advantage</H>
    <p>Oesophageal pressure, electrical impedance tomography and other recruitability assessments can add information in selected patients with appropriate expertise. ATS does not identify one optimal titration method. A global compliance result cannot establish regional homogeneity; improved physiological measurements alone do not prove a survival benefit.<R label="ATS 2024 individualisation" /><R label="Respiratory mechanics 2005" /></p>
    <Check question="PEEP raises SpO₂ but blood pressure falls and driving pressure rises at the same tidal volume. Is that success?">No. The oxygenation response must be balanced against worse mechanics and haemodynamic cost. Reassess the measurement, overdistension, volume/circulatory state and RV function; stop/reverse the poorly tolerated change as clinically appropriate. There is no automatic next PEEP value from these observations.</Check>
    <LessonSources topicId={T} labels={["ATS 2024 higher PEEP", "ESICM 2023 PEEP", "ATS 2024 individualisation", "Respiratory mechanics 2005"]} />
  </div>;
}

export function PEEPSettingsTeaching() {
  return <div className={wrap}>
    <H>Settings that change the pressure left at end expiration</H>
    <p>Intrinsic PEEP reflects incomplete emptying, not just the external PEEP dial. In severe asthma, reducing minute ventilation is the most effective way to reduce gas trapping.<R label="Stather 2005 minute ventilation" /> More expiratory time can be obtained by lowering rate, reducing inspiratory time and removing an unnecessary inspiratory pause.<R label="Stather 2005 expiration" /></p>
    <div className="overflow-x-auto"><table className="w-full text-left text-sm"><caption className="text-left mb-3 font-semibold text-foreground">Setting → physiological consequence → reassessment</caption><thead><tr className="border-b border-border"><th className="p-2">Setting</th><th className="p-2">What changes</th><th className="p-2">What to check</th></tr></thead><tbody>
      <tr className="border-b border-border"><th className="p-2 font-medium text-foreground">Respiratory rate</th><td className="p-2">Higher rate shortens the breath cycle and available expiration at fixed inspiratory time.</td><td className="p-2">Expiratory flow, total PEEP, ventilation and pH; lowering rate trades CO₂ clearance for less trapping.</td></tr>
      <tr className="border-b border-border"><th className="p-2 font-medium text-foreground">Tidal volume</th><td className="p-2">More volume needs to empty; larger breaths can worsen hyperinflation in obstruction.</td><td className="p-2">Delivered volume/PBW, plateau, trapping and gas exchange.</td></tr>
      <tr className="border-b border-border"><th className="p-2 font-medium text-foreground">Inspiratory time / I:E / pause</th><td className="p-2">Longer inspiration or pause leaves less expiration at the same rate.</td><td className="p-2">Actual waveforms rather than a ratio alone; a short diagnostic hold is not a reason to leave a long routine pause.</td></tr>
      <tr className="border-b border-border"><th className="p-2 font-medium text-foreground">Inspiratory flow in volume control</th><td className="p-2">Higher flow can deliver the same tidal volume faster, allowing more expiration if the other timing settings permit.</td><td className="p-2">Flow demand, synchrony, peak versus plateau pressure and whether the ventilator's timing actually changes.</td></tr>
      <tr className="border-b border-border"><th className="p-2 font-medium text-foreground">Inspiratory pressure / support</th><td className="p-2">Delivered volume changes with pressure, effort and mechanics; pressure labels vary by ventilator.</td><td className="p-2">Actual delivered volume and cycling, not the nominal mode name.</td></tr>
      <tr className="border-b border-border"><th className="p-2 font-medium text-foreground">External PEEP</th><td className="p-2">Can stabilise lung units or alter the effort needed to trigger in flow-limited patients; can also increase hyperinflation.</td><td className="p-2">Total PEEP, plateau, volume, triggering and blood pressure after changes.</td></tr>
    </tbody></table></div>
    <p>The timing rows follow the severe-asthma review; pressure-label and monitoring checks are bedside teaching synthesis, not manufacturer-independent configuration instructions.<R label="Stather 2005 expiration" /><R label="Stather 2005 external PEEP" /></p>
    <PEEPTimingDiagram />
    <H>Triggering and cycling during assisted breathing</H>
    <p>Auto-PEEP is an inspiratory threshold load: the patient must overcome trapped end-expiratory pressure before triggering assistance. In selected spontaneously breathing, flow-limited COPD patients, external PEEP may reduce that burden; the review emphasises individual titration and the limitations of applying this approach in passive patients. This must not be transferred indiscriminately to passive severe asthma. Ineffective efforts and delayed cycling need expert waveform assessment, appropriate support and trigger/cycle adjustment, while avoiding excessive assisted tidal volumes.<R label="Stather 2005 external PEEP" /></p>
    <p>Shortening expiration deliberately is part of some APRV strategies, not conventional obstruction management. Detailed APRV settings remain in the <Link to="/intensive-care/mechanical-ventilation" className="text-primary underline">shared APRV lesson</Link>; the timing arithmetic here is not an APRV titration method.</p>
    <Check question="rate rises from 12 to 24/min while inspiratory time stays 1 second. How much expiration remains?">At 12/min the cycle is 60 / 12 = 5 s, leaving 4 s. At 24/min it is 2.5 s, leaving 1.5 s. This explains a risk of incomplete expiration in obstruction, but does not calculate intrinsic PEEP.</Check>
    <LessonSources topicId={T} labels={["Stather 2005 expiration", "Stather 2005 minute ventilation", "Stather 2005 external PEEP"]} />
  </div>;
}

export function PEEPSafetyTeaching() {
  return <div className={wrap}>
    <H>Higher PEEP is not the same as a recruitment manoeuvre</H>
    <p>ATS 2024 <strong className="text-foreground">strongly recommends against prolonged lung recruitment manoeuvres in moderate-to-severe ARDS</strong>. Do not equate the conditional higher-PEEP recommendation with permission for sustained high-pressure inflations.<R label="ATS 2024 recruitment" /></p>
    <p>In the <strong className="text-foreground">ART trial</strong>, the combined recruitment-and-compliance-titrated-PEEP strategy increased 28-day mortality: <strong className="text-foreground">55.3% versus 49.3%</strong>. Because the intervention combined recruitment and titration, this does not prove that every higher-PEEP strategy is harmful; it does show why an apparently physiological recruitment approach cannot be assumed to improve outcomes.<R label="ART 2017" /></p>
    <H>Obstructive failure needs a different emphasis</H>
    <p>In severe asthma, extra external PEEP may worsen total PEEP and gas trapping. The priority is treating obstruction, limiting minute ventilation and allowing exhalation while monitoring circulation and gas exchange. The severe-asthma review advises careful monitoring whenever external PEEP is added; there is no universally safe fraction of measured auto-PEEP for every patient.<R label="Stather 2005 external PEEP" /></p>
    <p>New shock during ventilation requires immediate senior assessment for hyperinflation, pneumothorax, airway/circuit problems and other causes—not an assumption that more PEEP will help. Severe hyperinflation can impair venous return and cause barotrauma.<R label="Stather 2005 harms" /> See <Link to="/intensive-care/bronchospastic-failure" className="text-primary underline">Bronchospastic Respiratory Failure</Link> for the full intrinsic-PEEP lesson and emergency context.</p>
    <Check question="does ATS's higher-PEEP recommendation justify routine prolonged recruitment inflations?">No. Higher PEEP without recruitment is conditionally suggested for moderate-to-severe ARDS, whereas prolonged recruitment manoeuvres are strongly recommended against. These are different interventions with different evidence.</Check>
    <LessonSources topicId={T} labels={["ATS 2024 recruitment", "ART 2017", "Stather 2005 external PEEP", "Stather 2005 harms"]} />
  </div>;
}