import { Link } from "react-router-dom";
import { lessonWrap, H, Check, Reasoning, makeQuote } from "@/components/topic/EndocrinePageShared";

/** Temperature and pH lessons. Quotes resolve the verified temperature-ph excerpt records (copied verbatim from Acids, Bases & Buffers). */
const Quote = makeQuote("temperature-ph");

export function TempPhKwTeaching() {
  return (
    <div className={lessonWrap}>
      <H>Water ionises more as it warms</H>
      <Quote label="OpenStax Chemistry 2e Kw" />
      <p><Reasoning />water self-ionises (H₂O ⇌ H⁺ + OH⁻) with ion product Kw = [H⁺][OH⁻]. Because the reaction is endothermic, Kw rises with temperature. Neutrality is defined as [H⁺] = [OH⁻], so neutral pH = ½ pKw. At 25 °C Kw ≈ 1.0 × 10⁻¹⁴, giving neutral pH 7.0. At 37 °C standard textbook tables give Kw ≈ 2.4 × 10⁻¹⁴, so neutral pH is about 6.8 — these values are textbook figures, not part of the quotation.</p>
      <p><Reasoning />blood at pH 7.40 and 37 °C is therefore about 0.6 units alkaline to neutral. The normal range itself is quoted below; the "distance from neutrality" idea is what alpha-stat theory tries to preserve.</p>
      <Quote label="StatPearls Acid-Base 2022" />
      <Check question="Pure water is heated to 60 °C and reads pH 6.5. Is it acidic?">No. [H⁺] and [OH⁻] have risen equally, so it is still neutral; only the pH value of neutrality has fallen.</Check>
    </div>
  );
}

export function TempPhBloodTeaching() {
  return (
    <div className={lessonWrap}>
      <H>What happens to a blood sample as it cools</H>
      <p><Reasoning />in a closed sample (no gas exchange), cooling increases CO₂ and O₂ solubility, so their partial pressures fall, and the dissociation of buffer groups — chiefly histidine imidazole on proteins — shifts so pH rises. A commonly taught rule of thumb is that blood pH rises by roughly 0.015 per °C of cooling; this is a textbook approximation, not a quoted figure.</p>
      <p><Reasoning />blood-gas analysers warm every sample to 37 °C before measuring. Results can be reported "at 37 °C" (uncorrected) or mathematically corrected to the patient's temperature. Neither number is wrong; they answer different questions.</p>
      <p>See <Link to="/physics/abg-analyser" className="text-primary underline">ABG Analyser &amp; Gas Measurement</Link> for how the electrodes are thermostatted.</p>
      <Check question="A patient at 32 °C has a sample analysed at 37 °C reading pH 7.40, PaCO₂ 5.3 kPa. What would the temperature-corrected values look like?">Higher pH and lower PaCO₂ than the 37 °C values, because cooling raises gas solubility and lowers PaCO₂ in the closed sample.</Check>
    </div>
  );
}

export function TempPhStatTeaching() {
  return (
    <div className={lessonWrap}>
      <H>Alpha-stat versus pH-stat</H>
      <p><Reasoning />alpha-stat manages ventilation using the uncorrected (37 °C) values, aiming for pH 7.40 and PaCO₂ about 5.3 kPa as measured. This keeps the ionisation state ("alpha") of histidine imidazole constant, so enzyme function and cerebral autoregulation are preserved. pH-stat uses temperature-corrected values and adds CO₂ to hold the corrected pH at 7.40; the extra CO₂ dilates cerebral vessels, increasing brain blood flow and cooling uniformity.</p>
      <Quote label="Chatzopoulou 2025 alpha/pH-stat" />
      <p><Reasoning />the quotation describes adult deep hypothermic circulatory arrest. In adults alpha-stat is usual; pH-stat is often preferred in paediatric cardiac surgery before circulatory arrest, where more even brain cooling is the priority. That paediatric point is standard teaching, not part of the quoted review. Clinical uses: <Link to="/intensive-care/neurointensive-care" className="text-primary underline">temperature control after brain injury</Link>, cardiopulmonary bypass, and accidental hypothermia.</p>
      <Check question="Why might pH-stat increase embolic risk during adult bypass?">The added CO₂ causes cerebral vasodilatation and loss of autoregulation, so more blood — and any microemboli it carries — reaches the brain.</Check>
    </div>
  );
}
