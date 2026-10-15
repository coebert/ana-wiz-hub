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

/** Henderson-Hasselbalch: derivation, bicarbonate form and drug ionisation. */
export function HendersonHasselbalchTeaching() {
  return (
    <div className={wrap}>
      <SourceQuote topicId={ACID} label="OpenStax Chemistry 2e Henderson-Hasselbalch" />
      <H>Where the equation comes from</H>
      <p>For a weak acid HA ⇌ H⁺ + A⁻, Ka = [H⁺][A⁻]/[HA]. Taking negative logs gives pH = pKa + log([A⁻]/[HA]). When pH equals pKa the log term is zero, so the drug is exactly 50% ionised. Each whole pH unit away from pKa changes the ratio tenfold.</p>
      <H>Acids and bases written the same way</H>
      <p>Always write it as pH = pKa + log([proton acceptor]/[proton donor]). For a weak acid the acceptor is the ionised A⁻; for a weak base the acceptor is the unionised B and the donor is the ionised BH⁺. This avoids having to memorise two separate formulas.</p>
      <H>The bicarbonate form used for blood gases</H>
      <p>pH = 6.1 + log([HCO₃⁻] ÷ (0.23 × PaCO₂ in kPa)). With HCO₃⁻ 24 mmol/L and PaCO₂ 5.3 kPa, 0.23 × 5.3 ≈ 1.2, the ratio is about 20:1, log 20 ≈ 1.3, and pH ≈ 7.4. (0.03 replaces 0.23 when PaCO₂ is in mmHg.) The 6.1 and 0.23 are standard textbook constants for plasma at 37 °C, not from the quotation above.</p>
      <p><Reasoning />the 20:1 ratio is why the bicarbonate system works well in the body despite a pKa 1.3 units from blood pH: it is an open system, so the lungs control CO₂ and the kidneys control bicarbonate independently.</p>
      <div id="hh-worked-example" className="scroll-mt-24 rounded-md border border-border bg-muted/30 p-4 space-y-2">
        <p className="font-semibold text-foreground">Worked example (illustrative case — invented numbers, not a patient record)</p>
        <p><strong className="text-foreground">Case 1 — diabetic ketoacidosis.</strong> A 19-year-old with type 1 diabetes has pH 7.10 and PaCO₂ 2.5 kPa. Rearranging: [HCO₃⁻] = 0.23 × PaCO₂ × 10^(pH − 6.1) = 0.23 × 2.5 × 10^1.0 = 0.575 × 10 ≈ 5.8 mmol/L. The low PaCO₂ is respiratory compensation (Kussmaul breathing); it limits, but does not correct, the fall in pH.</p>
        <p><strong className="text-foreground">Case 2 — acute-on-chronic hypercapnia.</strong> A patient with COPD has PaCO₂ 9.0 kPa and HCO₃⁻ 30 mmol/L. 0.23 × 9.0 = 2.07; 30 ÷ 2.07 ≈ 14.5; log 14.5 ≈ 1.16; pH ≈ 6.1 + 1.16 = 7.26. The raised bicarbonate (renal compensation) keeps pH far higher than the same PaCO₂ would give with a normal bicarbonate of 24 (ratio 11.6, pH ≈ 7.16).</p>
        <p><Reasoning />the arithmetic shows the ratio, not either value alone, sets pH. Interpreting compensation in a real patient also needs history and expected-compensation rules.</p>

      </div>
      <Check q="A weak base has a pKa of 8.4. What fraction is unionised at pH 7.4?" a="pH − pKa = −1, so [B]/[BH⁺] = 10⁻¹ = 1:10. About 1 part in 11, roughly 9%, is unionised — the same figure as fentanyl in the pKa table." />
    </div>
  );
}

/** Calculated osmolality and the osmolar gap. */
export function OsmolarGapTeaching() {
  return (
    <div className={wrap}>
      <SourceQuote topicId={SOL} label="Atluri 2021 Osmolal Gap" />
      <H>The calculation</H>
      <p>Calculated osmolality ≈ 2[Na⁺] + [glucose] + [urea], all in mmol/L. Some laboratories add [ethanol] in mmol/L when it has been measured, so the remaining gap points to other substances. Osmolal gap = measured (freezing-point) − calculated.</p>
      <H>What "normal" means</H>
      <p>Textbooks commonly quote a normal gap below about 10 mOsm/kg, but healthy people vary widely — some have a negative gap — so a patient's own baseline is unknown. A "normal" result therefore cannot rule out toxic alcohol ingestion. The ranges here are standard teaching, not from the quotation.</p>
      <H>The timing trap</H>
      <p><Reasoning />methanol and ethylene glycol are themselves osmotically active but cause little acidosis. As they are metabolised, the osmolal gap falls while their acidic metabolites (formate, glycolate) raise the anion gap. Early after ingestion: high osmolal gap, normal anion gap. Late: the osmolal gap may be normal while there is a severe high anion gap acidosis. Seek specialist poisons advice (TOXBASE / National Poisons Information Service) on fomepizole or ethanol and haemodialysis.</p>
      <div id="osmolar-gap-worked-example" className="scroll-mt-24 rounded-md border border-border bg-muted/30 p-4 space-y-2">
        <p className="font-semibold text-foreground">Worked example (illustrative case — invented numbers, not a patient record)</p>
        <p><strong className="text-foreground">Case — suspected methanol ingestion.</strong> A man found confused after drinking from an unlabelled bottle: Na⁺ 138, glucose 6, urea 5 mmol/L, ethanol undetectable; measured (freezing-point) osmolality 330 mOsm/kg.</p>
        <p>Calculated = 2 × 138 + 6 + 5 = 287. Gap = 330 − 287 = 43 mOsm/kg. If methanol (molecular mass 32 g/mol) explained all of it, that is roughly 43 mmol/L × 32 ≈ 1.4 g/L — an approximate teaching estimate, never a substitute for a measured level.</p>
        <p>Twenty-four hours later the same patient might show a smaller osmolal gap but a high anion gap acidosis, as methanol becomes formate. Seek TOXBASE / NPIS advice; do not wait for the gap to decide on antidote.</p>

      </div>
      <Check q="A patient presents 30 hours after drinking antifreeze with a severe high anion gap acidosis and a normal osmolal gap. Is ethylene glycol excluded?" a="No. Late after ingestion most ethylene glycol has been converted to acidic metabolites, so the osmolal gap can be normal while the anion gap is very high." />
    </div>
  );
}

/** Classical and revised Starling principle. */
export function StarlingTeaching() {
  return (
    <div className={wrap}>
      <SourceQuote topicId={SOL} label="Woodcock 2012 Revised Starling" />
      <H>The equation</H>
      <p>Jv = Kf [(Pc − Pi) − σ(πc − πg)], where Jv is fluid filtration, Kf the filtration coefficient, Pc and Pi capillary and interstitial hydrostatic pressures, σ the reflection coefficient for protein, πc plasma oncotic pressure and πg the oncotic pressure in the small space just under the glycocalyx. In the classical version, πg is replaced by interstitial oncotic pressure.</p>
      <H>What changed in the revised model</H>
      <p>Classical teaching drew filtration at the arterial end and reabsorption at the venous end. In the revised model the space under the glycocalyx is kept almost protein-free by the outward flow of filtrate, so the oncotic gradient that opposes filtration stays large — but it slows filtration rather than reversing it (the "no absorption" rule). Filtered fluid returns via lymph.</p>
      <p><Reasoning />this is why transfusing colloid or albumin is a poor treatment for oedema, and why the source argues crystalloids are reasonable when capillary pressure is low. Hypoalbuminaemia is still associated with oedema, but the revised model suggests low albumin alone explains it less than classical teaching implied.</p>
      <div id="starling-worked-example" className="scroll-mt-24 rounded-md border border-border bg-muted/30 p-4 space-y-2">
        <p className="font-semibold text-foreground">Worked example (illustrative case — invented numbers, not a patient record)</p>
        <p>Using illustrative pressures in mmHg with σ = 0.9: Pc 25, Pi −2, πc 25, πg 3. Net driving pressure = (25 − (−2)) − 0.9 × (25 − 3) = 27 − 19.8 = 7.2 — filtration, not absorption.</p>
        <p><strong className="text-foreground">Case 1 — left heart failure.</strong> Pulmonary capillary pressure rises to 35: (35 + 2) − 19.8 = 17.2, more than double the filtration, overwhelming lymph flow and causing pulmonary oedema.</p>
        <p><strong className="text-foreground">Case 2 — sepsis with glycocalyx damage.</strong> If σ falls to 0.5 and πg rises towards πc (say 15): (25 + 2) − 0.5 × (25 − 15) = 27 − 5 = 22. Leak rises even without higher pressure, and giving albumin does little because the barrier that made it effective is damaged.</p>
        <p><Reasoning />the numbers are chosen to show direction of change, not measured values; Kf and lymph flow also matter.</p>

      </div>
      <Check q="According to the revised Starling model, how does fluid filtered at the capillary normally return to the circulation?" a="Mainly as lymph. The oncotic gradient across the glycocalyx opposes filtration but does not reverse it, so there is little venous-end reabsorption in most tissues." />
    </div>
  );
}
