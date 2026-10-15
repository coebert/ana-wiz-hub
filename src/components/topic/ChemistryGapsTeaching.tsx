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
      <p><Reasoning />this is the chemistry behind alpha-stat management in hypothermia (see the hypothermia section above). As blood cools, neutral pH rises. A sample that reads 7.40 when measured at 37 °C in the analyser has a higher pH at the patient's lower temperature, but because neutral pH has risen by a similar amount, its distance from neutrality is roughly unchanged. Alpha-stat accepts that; pH-stat adds CO₂ to hold the temperature-corrected pH at 7.40. The exact neutral pH at body temperature quoted elsewhere on this page comes from textbook tables, not from the OpenStax quotation.</p>
      <Check q="A beaker of pure water is warmed and its pH falls below 7. Is it now acidic?" a="No. Warming increases ionisation, so [H⁺] and [OH⁻] both rise equally. The water is still neutral; only the pH value that represents neutrality has fallen." />
    </div>
  );
}

type PkaRow = { drug: string; pka: number | null; kind: "acid" | "base" | "quaternary"; note?: string };
const pkaGroups: { group: string; rows: PkaRow[] }[] = [
  { group: "Local anaesthetics", rows: [
    { drug: "Mepivacaine", pka: 7.6, kind: "base" },
    { drug: "Lidocaine", pka: 7.9, kind: "base" },
    { drug: "Prilocaine", pka: 7.9, kind: "base" },
    { drug: "Articaine", pka: 7.8, kind: "base" },
    { drug: "Ropivacaine", pka: 8.1, kind: "base" },
    { drug: "Bupivacaine / levobupivacaine", pka: 8.1, kind: "base" },
    { drug: "Tetracaine (amethocaine)", pka: 8.5, kind: "base" },
    { drug: "Chloroprocaine", pka: 8.7, kind: "base", note: "Fast onset despite high pKa — given at high concentration" },
  ]},
  { group: "Opioids", rows: [
    { drug: "Alfentanil", pka: 6.5, kind: "base" },
    { drug: "Remifentanil", pka: 7.1, kind: "base" },
    { drug: "Morphine", pka: 8.0, kind: "base" },
    { drug: "Sufentanil", pka: 8.0, kind: "base" },
    { drug: "Fentanyl", pka: 8.4, kind: "base" },
    { drug: "Pethidine", pka: 8.5, kind: "base" },
  ]},
  { group: "Induction agents and sedatives", rows: [
    { drug: "Etomidate", pka: 4.2, kind: "base" },
    { drug: "Midazolam", pka: 6.5, kind: "base", note: "Ring opens below about pH 4 (water-soluble), closes at body pH" },
    { drug: "Ketamine", pka: 7.5, kind: "base" },
    { drug: "Thiopental", pka: 7.6, kind: "acid" },
    { drug: "Methohexital", pka: 7.9, kind: "acid" },
    { drug: "Propofol", pka: 11, kind: "acid" },
  ]},
  { group: "Other drugs", rows: [
    { drug: "Aspirin", pka: 3.5, kind: "acid" },
    { drug: "Paracetamol", pka: 9.5, kind: "acid" },
    { drug: "Atropine", pka: 9.8, kind: "base" },
    { drug: "Neostigmine, glycopyrronium, rocuronium, atracurium", pka: null, kind: "quaternary", note: "Permanently charged — no pKa applies; poor membrane and blood–brain barrier crossing" },
  ]},
];

function unionised(r: PkaRow): string {
  if (r.pka === null) return "~0% (always ionised)";
  const f = r.kind === "base" ? 1 / (1 + 10 ** (r.pka - 7.4)) : 1 / (1 + 10 ** (7.4 - r.pka));
  const pct = f * 100;
  return pct > 99 ? ">99%" : pct < 1 ? "<1%" : `${Math.round(pct)}%`;
}

/** pKa of anaesthetic drugs and what it means for ionisation at pH 7.4. */
export function DrugPkaTeaching() {
  return (
    <div className={wrap}>
      <SourceQuote topicId={ACID} label="Decloux 2021 Local Anaesthetics" />
      <SourceQuote topicId={ACID} label="Egan 2019 Opioids" />
      <H>Working out the unionised fraction</H>
      <p>For a weak base, the fraction unionised = 1 ÷ (1 + 10^(pKa − pH)). For a weak acid, it is 1 ÷ (1 + 10^(pH − pKa)). The further pH lies on the "wrong" side of pKa, the more drug is held in the charged, water-soluble form that crosses lipid membranes poorly.</p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-foreground">
              <th className="py-1 pr-3">Drug</th><th className="py-1 pr-3">Approx. pKa</th><th className="py-1 pr-3">Acid / base</th><th className="py-1 pr-3">Unionised at pH 7.4 (calculated)</th><th className="py-1">Note</th>
            </tr>
          </thead>
          {pkaGroups.map(({ group, rows }) => (
            <tbody key={group}>
              <tr className="border-t border-border"><th colSpan={5} className="py-2 text-left text-foreground">{group}</th></tr>
              {rows.map((r) => (
                <tr key={r.drug} className="border-t border-border">
                  <td className="py-1 pr-3 text-foreground">{r.drug}</td>
                  <td className="py-1 pr-3">{r.pka === null ? "—" : r.pka.toFixed(1)}</td>
                  <td className="py-1 pr-3">{r.kind === "quaternary" ? "Quaternary amine" : r.kind === "base" ? "Weak base" : "Weak acid"}</td>
                  <td className="py-1 pr-3">{unionised(r)}</td>
                  <td className="py-1">{r.note ?? ""}</td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>
      <p className="text-xs">pKa values are commonly taught textbook figures; published values vary by up to about 0.3 depending on method and temperature, so small differences between tables are expected. They are not quoted from the sources above. The percentages are calculated from the equations, ignore protein binding, and are not measured values. This table covers the drugs most often examined, not every drug used in anaesthesia.</p>
      <p><Reasoning />the local anaesthetic quotation explains why lidocaine (pKa 7.9) starts working faster than bupivacaine (8.1): more of it is unionised at pH 7.4. Chloroprocaine is the classic exception — its high pKa is outweighed by the large dose given. The opioid quotation explains alfentanil and remifentanil: their low pKa leaves most drug unionised, so they reach peak effect quickly. In inflamed, acidic tissue more local anaesthetic is ionised and the block is weaker. Ion trapping works the same way across the placenta: an acidotic fetus traps more of a basic drug such as lidocaine.</p>
      <Check q="Why does alfentanil reach peak effect faster than fentanyl, even though fentanyl is more fat-soluble?" a="Alfentanil's pKa (6.5) is below body pH, so about 89% is unionised at pH 7.4, compared with about 9% for fentanyl (pKa 8.4). More unionised, unbound drug is available to cross into the brain straight away." />
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
      <SourceQuote topicId={SOL} label="Walker 1986 Osmometry" />
      <p><Reasoning />volatile solutes such as ethanol and methanol evaporate along with the water, so they do not produce the drop in vapour pressure that the instrument measures, and they go largely uncounted. Freezing-point depression does count them, which is why the osmolar gap for toxic alcohol screening needs a freezing-point measurement. The quoted source is a single case report with laboratory testing; check which method your laboratory uses.</p>
      <Check q="A patient with suspected methanol poisoning has a normal osmolar gap measured by a vapour-pressure osmometer. Is methanol excluded?" a="No. Vapour-pressure methods can miss volatile alcohols. Ask for a freezing-point measurement, and remember a normal gap never excludes toxic alcohol ingestion on its own." />
    </div>
  );
}
