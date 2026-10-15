import { InlineRef } from "@/components/references/InlineRef";
import { topicReferences } from "@/data/references";

const T = "abg-analyser";

function SourceQuote({ label }: { label: string }) {
  const ref = topicReferences[T]?.find((item) => item.label === label);
  if (!ref?.excerpt) return null;
  return (
    <figure className="border-l-2 border-primary pl-4 space-y-2">
      <figcaption className="text-xs font-semibold text-foreground">
        From the source — {label}
        <InlineRef topicId={T} refLabel={label} />
      </figcaption>
      <blockquote className="text-sm text-muted-foreground">{ref.excerpt}</blockquote>
    </figure>
  );
}

const H = ({ children }: { children: React.ReactNode }) => <h3 className="text-lg font-semibold text-foreground">{children}</h3>;
const Reasoning = () => <strong className="text-foreground">Teaching reasoning: </strong>;
function Check({ q, a }: { q: string; a: string }) {
  return (
    <details className="border-l-2 border-primary pl-4">
      <summary className="cursor-pointer font-semibold text-foreground">Learning check: {q}</summary>
      <p className="mt-2">{a}</p>
    </details>
  );
}
const wrap = "space-y-4 text-sm text-muted-foreground leading-relaxed";

/** Pre-analytical error: how sampling and handling change the numbers. */
export function PreAnalyticalTeaching() {
  return (
    <div className={wrap}>
      <SourceQuote label="Blood Gas Review 2025 Pre-analytical" />
      <H>Air bubbles</H>
      <p>A bubble lets the sample equilibrate with air. PCO₂ falls because room air contains almost no CO₂, and pH rises with it. PO₂ moves towards the air value (about 21 kPa at sea level): it rises in a hypoxaemic sample but falls in a sample from a patient breathing high oxygen. So "bubbles raise PO₂" is only true when the true PO₂ is below room-air level.</p>
      <H>Heparin</H>
      <p>Liquid heparin dilutes the sample. Dissolved CO₂ is diluted directly, so PCO₂ and calculated bicarbonate fall. Heparin also binds calcium, lowering ionised calcium. Pre-filled dry (lyophilised, calcium-balanced) heparin syringes avoid most of this.</p>
      <H>Delay and "leucocyte larceny"</H>
      <p>Cells in the syringe keep metabolising: PO₂ and glucose fall, PCO₂ and lactate rise, pH falls. The effect is much larger with very high white cell or platelet counts, which can make a well-oxygenated patient look hypoxaemic.</p>
      <H>Ice and plastic syringes</H>
      <p><Reasoning />cooling slows metabolism, but plastic is slightly permeable to oxygen and oxygen is more soluble when cold, so an iced plastic syringe can gain O₂ from the surrounding air. Analysing promptly at room temperature is usually better than icing a plastic syringe; follow the analyser manufacturer and local laboratory guidance on time limits. This paragraph is standard laboratory teaching, not part of the quotation above.</p>
      <Check q="A patient on FiO₂ 1.0 has a PaO₂ of 55 kPa. The sample contained a large air bubble. Which way is the reported PO₂ wrong?" a="Falsely low. The bubble pulls PO₂ towards about 21 kPa, so a very high true value is under-read. PCO₂ is falsely low too." />
    </div>
  );
}

/** Arterial versus venous blood gases. */
export function VenousArterialTeaching() {
  return (
    <div className={wrap}>
      <SourceQuote label="Lee 2025 Arterial vs Venous" />
      <H>What a venous gas can and cannot tell you</H>
      <p>The analyser measures whatever blood you give it, so the physics is identical. The difference is physiological: venous blood has already given up oxygen to the tissues, so venous PO₂ says nothing reliable about lung gas exchange. pH, bicarbonate, lactate and electrolytes are close enough to arterial values to be useful for trends and for screening acid–base disorders.</p>
      <H>Where venous samples add information</H>
      <p>From a central venous catheter, ScvO₂ reflects the balance of oxygen delivery and consumption, and the venous-to-arterial PCO₂ gap reflects how well blood flow clears CO₂ from the tissues. Both need a matched arterial sample to interpret.</p>
      <p><Reasoning />venous PCO₂ is normally slightly higher than arterial, so a normal venous PCO₂ makes significant arterial hypercapnia unlikely, but a high venous PCO₂ does not confirm it. When oxygenation or a precise PaCO₂ matters, take an arterial sample.</p>
      <Check q="Why can't a peripheral venous PO₂ of 5 kPa be used to diagnose respiratory failure?" a="Venous PO₂ reflects tissue extraction downstream of the lungs, not how well the lungs oxygenate arterial blood. Oxygenation needs an arterial sample or pulse oximetry." />
    </div>
  );
}

/** Transcutaneous O₂ and CO₂ monitoring. */
export function TranscutaneousTeaching() {
  return (
    <div className={wrap}>
      <SourceQuote label="Bernasconi 2024 Transcutaneous" />
      <H>How it works</H>
      <p>A heated sensor on the skin warms the capillary bed, increasing local blood flow and making the skin more permeable to gases. Gas diffusing through the skin reaches a miniature electrode underneath: a Clark-type electrode for PtcO₂ and a Severinghaus-type electrode for PtcCO₂. Newer sensors use optical methods instead.</p>
      <H>Why heating is a trade-off</H>
      <p>Heat "arterialises" the capillary blood, but it also raises local metabolism and shifts the gas readings, so devices apply a correction. Because the sensor is hot, its site must be moved regularly to avoid burns, which matters most in neonates with thin skin. The temperatures quoted above show how close the working range sits to the maximum tolerable level.</p>
      <p><Reasoning />PtcCO₂ tracks PaCO₂ well enough for trend monitoring (for example during sedation or non-invasive ventilation), while PtcO₂ falls away from PaO₂ in adults and when skin perfusion is poor, such as in shock. Confirm with an arterial sample when decisions depend on the exact value.</p>
      <Check q="A shocked adult has a PtcO₂ far below the PaO₂. Is the sensor faulty?" a="Not necessarily. PtcO₂ depends on skin blood flow; poor perfusion lowers it even when arterial oxygenation is fine." />
    </div>
  );
}

/** Electrolytes, lactate and glucose on the blood gas analyser. */
export function ElectrolytesLactateTeaching() {
  return (
    <div className={wrap}>
      <SourceQuote label="Blood Gas Review 2025 Co-oximetry" />
      <H>Ion-selective electrodes</H>
      <p>Na⁺, K⁺, Cl⁻ and ionised Ca²⁺ are measured potentiometrically: a membrane that lets through only one ion develops a voltage that follows the Nernst equation, read against a reference electrode with no current flowing. The blood gas analyser measures directly on undiluted whole blood, so it reports ion activity in plasma water. This avoids the falsely low sodium (pseudohyponatraemia) that diluted laboratory methods can give when protein or lipid levels are very high.</p>
      <H>Lactate and glucose: enzyme electrodes</H>
      <p>These are amperometric, like a Clark electrode. An enzyme layer (lactate oxidase or glucose oxidase) converts the analyte and produces hydrogen peroxide, which is oxidised at a polarised platinum anode. The current is proportional to concentration.</p>
      <p><Reasoning />because these sensors depend on enzyme reactions, some substances can interfere with them, and haemolysis falsely raises potassium. A blood gas potassium that disagrees with the laboratory value, in a sample that was hard to take, should be repeated before acting on it. The mechanisms in this lesson are standard clinical measurement teaching; the quotation only confirms that analysers measure these values.</p>
      <Check q="Why might the blood gas sodium be normal when the laboratory reports 125 mmol/L in a patient with severe hypertriglyceridaemia?" a="The gas analyser measures directly in undiluted blood. The laboratory's indirect method dilutes the sample, so the lipid takes up volume and the sodium reads falsely low (pseudohyponatraemia)." />
    </div>
  );
}
