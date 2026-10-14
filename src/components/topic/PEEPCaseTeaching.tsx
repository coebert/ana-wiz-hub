import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "./LessonSources";

const T = "peep-management";
const R = ({ label }: { label: string }) => <InlineRef topicId={T} refLabel={label} />;
const H = ({ children }: { children: ReactNode }) => <h3 className="text-lg font-semibold text-foreground">{children}</h3>;
const Check = ({ question, children }: { question: string; children: ReactNode }) => <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: {question}</summary><p className="mt-2">{children}</p></details>;
const Table = ({ caption, rows }: { caption: string; rows: string[][] }) => <div className="overflow-x-auto"><table className="w-full text-left text-sm"><caption className="text-left font-semibold text-foreground mb-2">{caption}</caption><thead><tr className="border-b border-border"><th className="p-2">Observation</th><th className="p-2">Initial assessment</th><th className="p-2">Later reassessment</th></tr></thead><tbody>{rows.map(([label, before, after]) => <tr key={label} className="border-b border-border"><th className="p-2 font-medium text-foreground">{label}</th><td className="p-2">{before}</td><td className="p-2">{after}</td></tr>)}</tbody></table></div>;

export function PEEPCaseTeaching() {
  return <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
    <p><strong className="text-foreground">Fictional adult ICU teaching cases—not actual patient records.</strong> Numbers are illustrative observations and arithmetic, not validated predictions, starting prescriptions or guaranteed responses. Decisions require bedside assessment, local protocols and senior supervision. Pressure holds below are valid only during passive, leak-free measurement; airway closure can conceal regional trapping.</p>
    <section className="space-y-4" data-peep-case="asthma">
      <H>Case 1 — severe asthma: high peak pressure, trapped gas and hypotension</H>
      <p>A 34-year-old with severe asthma is intubated after exhaustion despite medical treatment. Predicted body weight (PBW) is 70 kg. During passive volume-controlled ventilation, expiration is still flowing when the next breath begins; peak pressure is 55 cmH₂O and blood pressure falls. A high peak pressure includes airway resistance: measure plateau and total PEEP rather than equating peak with alveolar pressure. Urgently assess hyperinflation, pneumothorax, tube obstruction, circuit problems and other causes of shock.<R label="Stather 2005 plateau" /><R label="Stather 2005 harms" /></p>
      <Table caption="Illustrative observed sequence: passive volume control" rows={[
        ["Tidal volume / PBW", "560 mL / 70 kg = 8 mL/kg", "420 mL / 70 kg = 6 mL/kg"],
        ["Rate / minute ventilation", "22/min / 12.32 L/min", "12/min / 5.04 L/min"],
        ["Inspiratory / expiratory time", "1.00 s / 1.73 s", "0.35 s / 4.65 s"],
        ["Set / measured total PEEP", "5 / 17 cmH₂O", "5 / 10 cmH₂O"],
        ["Intrinsic PEEP", "17 − 5 = 12 cmH₂O", "10 − 5 = 5 cmH₂O"],
        ["Plateau / driving pressure", "34 / (34 − 17) = 17 cmH₂O", "26 / (26 − 10) = 16 cmH₂O"],
        ["Clinical reassessment", "Incomplete expiration and hypotension", "Less trapping and improved circulation in this fictional case"],
      ]} />
      <p>The team continues treatment of obstruction, reduces volume and rate, shortens inspiration and removes the routine inspiratory pause. At constant flow, 420 mL in 0.35 s corresponds to 72 L/min; the actual device waveform and timing must be checked. A short diagnostic plateau hold is different from leaving a routine pause on every breath. Reducing minute ventilation is the central intervention; changing flow alone cannot compensate for excessive ventilation.<R label="Stather 2005 expiration" /><R label="Stather 2005 minute ventilation" /></p>
      <p>Lower ventilation can raise PaCO₂. Follow gases, pH, oxygenation and circulation, and assess whether hypercapnia is tolerable in this individual; it is not permission to ignore severe acidaemia or conditions in which hypercapnia is hazardous. These example volumes and pressures are not a universal asthma protocol. If ARDS also exists, apply its PBW-volume and plateau-pressure guidance while still addressing obstruction.<R label="ATS 2024 protection" /></p>
      <p>The measured fall in intrinsic PEEP is an observation—not calculated from expiratory time. Driving pressure uses <em>total</em> PEEP; it changes only slightly here despite less hyperinflation. Raising external PEEP simply because auto-PEEP is high can worsen passive severe asthma; no fixed fraction is automatically safe.<R label="Stather 2005 external PEEP" /><R label="Respiratory mechanics 2005" /></p>
      <Check question="does a peak pressure of 55 prove a plateau of 55, or require a switch to pressure control?">No. Resistive pressure can make peak much higher than plateau. Obtain valid measurements and assess delivered volume, expiration and circulation. A mode switch does not itself remove trapped gas; either controlled mode requires suitable timing and close monitoring.</Check>
    </section>
    <section className="space-y-4" data-peep-case="pressure-control">
      <H>Case 2 — pressure control: the same setting delivers more volume as bronchospasm resolves</H>
      <p>A 61-year-old with COPD and acute bronchospasm is receiving passive pressure-controlled ventilation. PBW is 70 kg. The team uses a set inspiratory time of 0.7 s and rate of 12/min (4.3 s available for expiration), and checks whether the displayed inspiratory pressure is above PEEP or an absolute pressure. No mode is intrinsically lung-protective: pressure control limits the selected airway-pressure waveform, not tidal volume under all conditions.<R label="Keller 2022 mode response" /></p>
      <Table caption="Illustrative observation at initially unchanged pressure-control settings" rows={[
        ["Delivered volume", "350 mL = 5 mL/kg PBW", "630 mL = 9 mL/kg PBW after obstruction improves"],
        ["Set / measured total PEEP", "5 / 14 cmH₂O", "5 / 8 cmH₂O during another valid passive hold"],
        ["Intrinsic PEEP", "9 cmH₂O", "3 cmH₂O"],
        ["Decision", "Treat obstruction; assess ventilation and trapping", "Reduce inspiratory pressure as appropriate; recheck volume, gas exchange and expiration"],
      ]} />
      <p>As resistance and trapping change, a fixed pressure can deliver a substantially different volume. The later volume is excessive for this teaching lung-protection goal; reducing support is a clinician-led response, not a predictable dose–response calculation. Check the delivered breath after each adjustment. In volume control, the converse concern is that the chosen volume can be maintained while peak and plateau pressures change; monitor both. A volume-targeted pressure-regulated mode also needs review of its actual pressure adjustments, delivered volume and timing, not trust in its brand name.<R label="Keller 2022 mode response" /></p>
      <p>If the patient has concurrent ARDS, the ATS 4–8 mL/kg PBW range and plateau below 30 cmH₂O apply specifically to that diagnosis. They do not establish a universal COPD target or a reason to abandon monitoring when within range. Switching from volume to pressure control—or back—must preserve the intended volume, expiration and alarms and confirm the measured response.<R label="ATS 2024 protection" /></p>
      <Check question="intrinsic PEEP has fallen, but tidal volume rises from 350 to 630 mL at unchanged pressure. Is improvement in obstruction enough?">No. Improvement changes the volume delivered by pressure control. Reassess inspiratory pressure and timing, PBW-normalised volume, gas exchange and patient effort; do not assume a pressure-limited mode prevents large breaths.</Check>
    </section>
    <section className="space-y-4" data-peep-case="assisted-copd">
      <H>Case 3 — assisted COPD: ineffective efforts, external PEEP and cycling</H>
      <p>After bronchospasm improves, a 72-year-old with COPD starts triggering breaths and is assessed for pressure-support ventilation (PSV). The change follows improved clinical readiness—not a fixed elapsed time. Inspiratory efforts sometimes fail to trigger a ventilator breath, while other assisted breaths are large and inspiration ends late. Auto-PEEP creates a threshold load; excessive support and delayed cycling can further reduce expiration.<R label="Keller 2022 triggering" /></p>
      <Table caption="Illustrative assisted-breathing review: observed rather than predicted" rows={[
        ["Mode", "Pressure support with frequent ineffective efforts", "Pressure support after supervised trigger, support and cycle review"],
        ["External PEEP", "5 cmH₂O", "Trial of 7 cmH₂O, retained only if tolerated"],
        ["Volume / synchrony", "Large variable breaths, delayed cycling", "More appropriate volumes and fewer ineffective efforts in this fictional observation"],
        ["Total PEEP / plateau", "Awake effort prevents reliable passive interpretation", "Do not report a precise intrinsic PEEP from an effort-contaminated hold"],
      ]} />
      <p>In selected flow-limited, spontaneously breathing COPD patients, external PEEP can reduce the effort needed to trigger. The illustrative 5-to-7 change is not a standard increment or target: assess effort, expiratory flow, volume, circulation and evidence of hyperinflation, and stop or reverse a poorly tolerated trial. Do not carry this approach indiscriminately into passive severe asthma.<R label="Stather 2005 external PEEP" /><R label="Keller 2022 triggering" /></p>
      <p>The following device checks are bedside teaching synthesis, not settings quoted from Keller: review trigger sensitivity for missed efforts versus auto-triggering. On devices using flow cycling in PSV, an earlier cycle can shorten inspiration; reduce excessive pressure support when appropriate and verify the waveform, comfort and ventilation. Trigger/cycle controls vary across devices, so there is no manufacturer-independent dial setting. If effort becomes unsustainable or gases and circulation deteriorate, reassess causes and the need for controlled support rather than repeatedly adding PEEP.</p>
      <Check question="can you copy the earlier passive intrinsic-PEEP value into a PEEP prescription after the patient wakes?">No. Effort and mechanics have changed, and passive holds may no longer be valid. Reassess the assisted-breathing problem and response; external PEEP is not an automatic percentage of a previous measurement.</Check>
    </section>
    <p>For the underlying physiology and medical management, see <Link to="/intensive-care/bronchospastic-failure" className="text-primary underline">Bronchospastic Respiratory Failure</Link>; for readiness, SBTs and the separate extubation decision, see <Link to="/intensive-care/mechanical-ventilation" className="text-primary underline">Mechanical Ventilation</Link>.</p>
    <LessonSources topicId={T} labels={["Stather 2005 measurement", "Stather 2005 plateau", "Stather 2005 harms", "Stather 2005 expiration", "Stather 2005 minute ventilation", "Stather 2005 external PEEP", "Respiratory mechanics 2005", "ATS 2024 protection", "Keller 2022 mode response", "Keller 2022 triggering"]} />
  </div>;
}