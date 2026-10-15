import { InlineRef } from "@/components/references/InlineRef";
import { topicReferences } from "@/data/references";

const ACID = "acids-bases-buffers";
const SOL = "solutions-concentration";

function SourceQuote({ topicId, label }: { topicId: string; label: string }) {
  const ref = topicReferences[topicId]?.find((item) => item.label === label);
  if (!ref?.excerpt) return null;
  return (
    <figure className="border-l-2 border-primary pl-4 space-y-2">
      <figcaption className="text-xs font-semibold text-foreground">
        From the source — {label}
        <InlineRef topicId={topicId} refLabel={label} />
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

/** Kw and why "neutral" pH depends on temperature. */
export function WaterTemperatureTeaching() {
  return (
    <div className={wrap}>
      <SourceQuote topicId={ACID} label="OpenStax Chemistry 2e Kw" />
      <H>Kw: the ion product of water</H>
      <p>Water ionises slightly: H₂O ⇌ H⁺ + OH⁻. The ion product, Kw = [H⁺][OH⁻], is about 10⁻¹⁴ (mol/L)² at 25 °C, so pure water has [H⁺] = [OH⁻] = 10⁻⁷ mol/L and pH 7. "Neutral" means [H⁺] equals [OH⁻] — not "pH 7".</p>
      <H>Why neutral pH falls as temperature rises</H>
      <p>Because ionisation of water absorbs heat, warming pushes the equilibrium to the right: both [H⁺] and [OH⁻] rise together. pH falls, yet water stays neutral because the two ions are still equal. Cooling does the opposite, so neutral pH rises.</p>
      <p><Reasoning />this is the chemistry behind alpha-stat management in hypothermia (see the hypothermia section above). As blood cools, neutral pH rises, so a sample that reads 7.40 when warmed to 37 °C in the analyser is, at the patient's own temperature, both more alkaline and still in the same relation to neutrality. Alpha-stat accepts that; pH-stat adds CO₂ to hold the temperature-corrected pH at 7.40. The exact neutral pH at body temperature quoted elsewhere on this page comes from textbook tables, not from the OpenStax quotation.</p>
      <Check q="A beaker of pure water is warmed and its pH falls below 7. Is it now acidic?" a="No. Warming increases ionisation, so [H⁺] and [OH⁻] both rise equally. The water is still neutral; only the pH value that represents neutrality has fallen." />
    </div>
  );
}

const pkaRows: [string, string, string][] = [
  ["Lidocaine", "7.9", "Weak base, about 24% unionised"],
  ["Bupivacaine", "8.1", "Weak base, about 17% unionised"],
  ["Thiopental", "7.6", "Weak acid, about 61% unionised"],
  ["Morphine", "8.0", "Weak base, about 20% unionised"],
];

/** pKa of common drugs and what it means for ionisation at pH 7.4. */
export function DrugPkaTeaching() {
  return (
    <div className={wrap}>
      <SourceQuote topicId={ACID} label="Decloux 2021 Local Anaesthetics" />
      <H>Working out the unionised fraction</H>
      <p>For a weak base, the fraction unionised = 1 ÷ (1 + 10^(pKa − pH)). For a weak acid, it is 1 ÷ (1 + 10^(pH − pKa)). The further pH lies on the "wrong" side of pKa, the more drug is trapped in the charged, water-soluble form that cannot cross lipid membranes.</p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-foreground">
              <th className="py-1 pr-3">Drug</th><th className="py-1 pr-3">Approx. pKa</th><th className="py-1">At pH 7.4 (calculated)</th>
            </tr>
          </thead>
          <tbody>
            {pkaRows.map(([d, p, f]) => (
              <tr key={d} className="border-t border-border">
                <td className="py-1 pr-3 text-foreground">{d}</td><td className="py-1 pr-3">{p}</td><td className="py-1">{f}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs">pKa values are commonly taught textbook figures (published values vary slightly by method and temperature) and are not quoted from the source above. The percentages are arithmetic from the equations, not measured values.</p>
      <p><Reasoning />the quoted sentence explains the local anaesthetic pattern: lidocaine (lower pKa) has more unionised drug at pH 7.4 than bupivacaine, so it reaches the nerve faster. In inflamed, acidic tissue the gap between pH and pKa widens, more drug is ionised, and the block is slower and weaker. Ion trapping works the same way across the placenta: an acidotic fetus traps more of a basic drug such as lidocaine.</p>
      <Check q="Using the formula, why does adding bicarbonate to lidocaine speed onset?" a="Raising pH towards the pKa shrinks (pKa − pH), so 10^(pKa − pH) falls and the unionised fraction rises — more drug can cross the nerve membrane." />
    </div>
  );
}

/** Donnan effect across the capillary wall. */
export function DonnanTeaching() {
  return (
    <div className={wrap}>
      <SourceQuote topicId={SOL} label="Rügheimer 2008 Donnan" />
      <H>What the Donnan effect is</H>
      <p>Plasma proteins carry a net negative charge at body pH and cannot easily cross the capillary wall. Small ions can. To keep each side electrically neutral, extra cations (mainly Na⁺) are held on the protein side and some diffusible anions (such as Cl⁻) are pushed to the other side. The result is slightly more total small-ion particles on the plasma side.</p>
      <H>Why it matters for oncotic pressure</H>
      <p>Those extra ions add osmotic pressure on top of the protein molecules themselves. So the measured colloid osmotic pressure is larger than the protein concentration alone would predict. The quoted study was done in rats, so its exact numbers should not be applied to people; the principle is the same.</p>
      <p><Reasoning />this is why albumin, being both abundant and strongly negatively charged, contributes most of plasma oncotic pressure, and it links to the Stewart approach on the Acids, Bases & Buffers page, where albumin acts as a weak acid.</p>
      <Check q="Why does the Donnan effect increase oncotic pressure rather than simply rearranging ions?" a="Neutrality around trapped negatively charged proteins holds extra cations on the plasma side, so the plasma side ends up with more osmotically active particles in total." />
    </div>
  );
}

/** How osmolality is measured, and why the method matters for the osmolar gap. */
export function OsmometryTeaching() {
  return (
    <div className={wrap}>
      <SourceQuote topicId={SOL} label="Atluri 2021 Toxic Alcohols" />
      <H>Freezing-point depression osmometers</H>
      <p>Dissolved particles lower the freezing point of water by about 1.86 °C per osmole per kg. The osmometer supercools the sample, triggers freezing and reads the freezing temperature precisely; the depression is converted to osmolality in mOsm/kg. Because it counts particles per kg of water, it gives osmol<em>ality</em>, not osmol<em>arity</em>.</p>
      <H>Vapour-pressure osmometers</H>
      <p>These estimate osmolality from how much dissolved particles lower vapour pressure (Raoult's law), using the dew point above the sample.</p>
      <p><Reasoning />volatile solutes such as ethanol and methanol evaporate with the water, so they raise vapour pressure rather than lowering it and are largely missed by vapour-pressure methods. That is why the osmolar gap for toxic alcohol screening relies on freezing-point measurement. This point is standard laboratory teaching, not part of the quotation above; check which method your laboratory uses.</p>
      <Check q="A patient with suspected methanol poisoning has a normal osmolar gap measured by a vapour-pressure osmometer. Is methanol excluded?" a="No. Vapour-pressure methods can miss volatile alcohols. Ask for a freezing-point measurement, and remember a normal gap never excludes toxic alcohol ingestion on its own." />
    </div>
  );
}
