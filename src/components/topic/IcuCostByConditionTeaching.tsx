import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { lessonWrap, H, Check, Reasoning, makeQuote } from "@/components/topic/EndocrinePageShared";

/** ICU cost by condition, UK/NHS beside US. Quotes resolve verified excerpt records so wording cannot drift. */
const Q = makeQuote("icu-cost-by-condition");
const L = ({ to, children }: { to: string; children: ReactNode }) => <Link to={to} className="text-primary underline">{children}</Link>;
const R = ({ cells }: { cells: ReactNode[] }) => <tr className="border-t border-border">{cells.map((c, i) => <td key={i} className="p-2 align-top">{c}</td>)}</tr>;

export function ConditionSummaryTeaching() {
  return <div className={lessonWrap}>
    <H>Each condition, UK beside US</H>
    <p><Reasoning />NHS England does not openly publish critical care cost by diagnosis: its National Schedule costs adult bed days by the number of organs supported (see <L to="/intensive-care/icu-costs">ICU Costs</L>). Condition costs therefore come from individual studies. Each row pairs the best UK figure we could verify with a US one. Read across a row for scale, never as an exchange-rate comparison: years, costing methods and what is counted (ICU stay, whole hospital stay, or ICU patient-related costs only) all differ.</p>
    <div className="overflow-x-auto"><table className="w-full text-sm border border-border">
      <thead className="bg-muted/50"><tr><th className="p-2 text-left">Condition</th><th className="p-2 text-left">UK / NHS figure</th><th className="p-2 text-left">US figure</th><th className="p-2 text-left">What is counted</th></tr></thead>
      <tbody>
        <R cells={["Sepsis", "Median $3,802–$17,963 per patient by day sepsis began, vs $1,667 without sepsis (one UK ICU, 1990s; reported in US dollars)", "Mean $16,324 (no organ dysfunction), $24,638 (severe sepsis), $38,298 (septic shock) per hospital stay, 2010–16", "UK: ICU patient-related costs; US: whole hospital stay"]} />
        <R cells={["Ventilator- or hospital-acquired pneumonia", "Mean £43,100; mean stay 22 days (143 patients, four ICUs, 2020)", "Mean $99,598 with VAP vs $59,770 matched without; difference $39,828 (2008–09)", "UK: ICU stay and hospital costs (conference abstract); US: hospital stay"]} />
        <R cells={["ARDS / prolonged ventilation", "Mean initial ICU stay £26,857; £1,738 per ICU day (795 ventilated ARDS patients, OSCAR trial)", "Median $135,238 per hospital stay for ≥48 h ventilation with chronic illness (one academic system, 2011–17) — not an ARDS-only cohort", "UK: ICU stay; US: hospital stay"]} />
        <R cells={["Any mechanical ventilation", "£1,587 (1 organ) to £2,985 (6+ organs) per adult bed day, NHS 2021/22 — by organ support, not diagnosis", "Mean ICU cost $31,574 ventilated vs $12,931 not; ventilation adds $1,522/day after adjustment (2002)", "UK: trust-reported bed-day cost; US: ICU cost from charges"]} />
      </tbody></table></div>
    <p><Reasoning />The common pattern is that cost tracks duration and organ support more than the label: later-onset sepsis and VAP cost more chiefly because patients stay longer. We found no verifiable current UK per-admission costs for community-acquired pneumonia, trauma, cardiac surgery or pancreatitis, so they are omitted rather than estimated.</p>
    <Check question="Why can the NHS National Schedule not give ICU cost per diagnosis?">It costs adult critical care per bed day by number of organs supported (HRGs XC01Z–XC07Z), not by diagnosis.</Check>
  </div>;
}

export function ConditionSepsisTeaching() {
  return <div className={lessonWrap}>
    <H>UK: one general ICU</H>
    <Q label="Edbrooke 1999 sepsis costs" />
    <p><Reasoning />Edbrooke costed 36 septic and 177 non-septic patients in a single UK university-hospital ICU. Patients who developed sepsis later in the stay cost most, largely because they stayed longer. The figures are 1990s ICU patient-related costs reported in US dollars, so they show relative scale, not today&apos;s NHS cost.</p>
    <H>US: national hospital database</H>
    <Q label="Paoli 2018 sepsis costs" />
    <p><Reasoning />Paoli analysed about 2.6 million US sepsis hospitalisations. Costs and mortality both rose with severity, and sepsis not present at admission cost almost three times sepsis present at admission. These are whole-hospital costs, including ward and step-down care, not ICU-only costs.</p>
    <Check question="In Paoli 2018, what was the mean hospital cost of septic shock?">$38,298, against $16,324 for sepsis without organ dysfunction.</Check>
  </div>;
}

export function ConditionPneumoniaTeaching() {
  return <div className={lessonWrap}>
    <H>UK: INHALE programme</H>
    <Q label="INHALE 2020 HAP/VAP costs" />
    <H>US: matched cohort</H>
    <Q label="Kollef 2012 VAP costs" />
    <Q label="Kollef 2012 VAP stay" />
    <p><Reasoning />Both studies show long, expensive stays, but differ in design: INHALE is a UK conference abstract of 143 patients being treated for HAP or VAP, with skewed costs; Kollef matched 2,238 US VAP patients to similar ventilated patients without VAP, so its $39,828 difference is an attributable-cost estimate for an administratively coded diagnosis.</p>
    <Check question="What was the matched difference in hospital cost with VAP in Kollef 2012?">$39,828 ($99,598 vs $59,770), with ICU stay 20.5 vs 11.6 days.</Check>
  </div>;
}

export function ConditionVentilationTeaching() {
  return <div className={lessonWrap}>
    <H>UK: ARDS in the OSCAR trial</H>
    <Q label="Marti 2016 ARDS costs" />
    <H>US: prolonged ventilation</H>
    <Q label="Khandelwal 2022 ventilation costs" />
    <Q label="Dasta 2005 daily cost" />
    <Q label="Dasta 2005 ventilation increment" />
    <H>NHS: cost by organ support</H>
    <Q label="NCC 2021/22 adult CC by organs" />
    <p><Reasoning />We could not verify a US ARDS-only cost, so the US row uses patients ventilated for at least 48 hours with chronic illness (Khandelwal) and Dasta&apos;s ventilated ICU population. The NHS figures are the nearest national equivalent: ventilation counts as an organ supported, so a ventilated day sits in the one-or-more-organ HRGs. These are bed-day costs, not costs per condition.</p>
    <Check question="What was the mean initial ICU stay cost in ventilated UK ARDS patients (OSCAR)?">£26,857, at £1,738 per ICU day.</Check>
  </div>;
}
