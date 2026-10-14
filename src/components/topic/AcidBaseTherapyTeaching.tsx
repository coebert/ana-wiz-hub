import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";

const T = "acid-base";
const R = ({ l }: { l: string }) => <InlineRef topicId={T} refLabel={l} />;

export function AcidBaseFluidsTeaching() {
  return (
    <div className="space-y-4 text-muted-foreground leading-relaxed">
      <h3 className="text-lg font-semibold text-foreground">Chemistry is settled; outcome is not</h3>
      <p>
        In Stewart terms, 0.9% sodium chloride contains equal sodium and chloride, so large volumes lower plasma strong ion difference and produce a hyperchloraemic, normal anion gap acidosis. That is a predictable effect on the blood gas. Whether it harms patients is a separate question, answered by trials rather than by the chemistry.
      </p>
      <h3 className="text-lg font-semibold text-foreground">SMART (2018): a small kidney signal</h3>
      <p>
        SMART randomised five Vanderbilt ICUs, unit by unit, between saline and balanced crystalloids (lactated Ringer's or Plasma-Lyte A) in 15,802 adults. A major adverse kidney event within 30 days (death, new renal replacement therapy, or creatinine at least doubled) occurred in 14.3% with balanced fluid and 15.4% with saline (odds ratio 0.91, 95% CI 0.84–0.99). Thirty-day in-hospital mortality was 10.3% v 11.1% (P = 0.06), so the mortality difference alone was not statistically significant.<R l="SMART 2018" />
      </p>
      <h3 className="text-lg font-semibold text-foreground">PLUS (2022): no mortality difference</h3>
      <p>
        PLUS randomised 5,037 patients in 53 Australian and New Zealand ICUs to a balanced multielectrolyte solution or saline. Death within 90 days was 21.8% v 22.0%; new renal replacement therapy 12.7% v 12.9%. The authors found no evidence that balanced fluid lowered death or kidney injury.<R l="PLUS 2022" />
      </p>
      <p>
        <strong className="text-foreground">How to put this in a viva (reasoning, not a quoted guideline):</strong> saline reliably causes a hyperchloraemic acidosis; one large single-centre cluster trial suggested a small kidney benefit from balanced fluids, and a later large multicentre blinded trial did not show a mortality benefit. A low bicarbonate after saline resuscitation should prompt a chloride and strong ion check before it is attributed to worsening shock.
      </p>
      <details className="border-l-2 border-primary pl-4">
        <summary className="cursor-pointer font-semibold text-foreground">Learning check: what was SMART's absolute difference?</summary>
        <p className="mt-2">15.4% − 14.3% = about <strong>1.1 percentage points</strong> in the composite kidney outcome, roughly one event avoided per 90 patients treated, under that trial's conditions. Mortality alone did not reach significance.<R l="SMART 2018" /></p>
      </details>
      <LessonSources topicId={T} labels={["SMART 2018", "PLUS 2022"]} />
    </div>
  );
}

export function BicarbonateTherapyTeaching() {
  return (
    <div className="space-y-4 text-muted-foreground leading-relaxed">
      <h3 className="text-lg font-semibold text-foreground">Who BICAR-ICU studied</h3>
      <p>
        BICAR-ICU enrolled adults within 48 hours of ICU admission with severe metabolic acidaemia: pH 7.20 or lower, PaCO₂ 45 mmHg or lower and bicarbonate 20 mmol/L or lower, plus a SOFA score of 4 or more or lactate of 2 mmol/L or more. The PaCO₂ limit matters: these were patients able to clear carbon dioxide, not those with a mixed respiratory acidosis.<R l="BICAR-ICU 2018 methods" />
      </p>
      <h3 className="text-lg font-semibold text-foreground">What it found</h3>
      <p>
        In 389 patients across 26 French ICUs, 4.2% sodium bicarbonate given to keep pH above 7.30 did not change the primary composite of death by day 28 or organ failure at day 7 (66% v 71%, P = 0.24). In the prespecified group with acute kidney injury (AKIN stage 2–3), bicarbonate lowered the composite outcome and day-28 mortality.<R l="BICAR-ICU 2018" />
      </p>
      <p>
        Harms were biochemical: metabolic alkalosis, hypernatraemia and hypocalcaemia were more common with bicarbonate, with no life-threatening complications reported.<R l="BICAR-ICU 2018 methods" />
      </p>
      <h3 className="text-lg font-semibold text-foreground">Interpreting it (reasoning, labelled as such)</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>The trial was open-label, and the kidney-injury benefit comes from a subgroup, so it supports considering bicarbonate in severe acidaemia with AKI rather than proving it.</li>
        <li>Bicarbonate generates CO₂; the trial excluded patients with a raised PaCO₂, so its results cannot be extended to patients who cannot increase ventilation.</li>
        <li>Because ionised calcium fell more often with bicarbonate, check calcium and sodium during treatment.</li>
      </ul>
      <details className="border-l-2 border-primary pl-4">
        <summary className="cursor-pointer font-semibold text-foreground">Learning check: would this patient have been eligible?</summary>
        <p className="mt-2">Septic shock, pH 7.15, bicarbonate 12 mmol/L, PaCO₂ 52 mmHg. <strong>No</strong> — the PaCO₂ exceeds 45 mmHg, so the trial's findings do not directly apply.<R l="BICAR-ICU 2018 methods" /></p>
      </details>
      <LessonSources topicId={T} labels={["BICAR-ICU 2018", "BICAR-ICU 2018 methods"]} />
    </div>
  );
}
