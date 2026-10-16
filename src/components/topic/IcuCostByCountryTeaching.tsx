import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { lessonWrap, H, Check, Reasoning, makeQuote } from "@/components/topic/EndocrinePageShared";

/** ICU bed-day costs by country: NHS England beside Australia, New Zealand, Europe and the US. Quotes resolve verified excerpt records so wording cannot drift. */
const Q = makeQuote("icu-cost-by-country");
const L = ({ to, children }: { to: string; children: ReactNode }) => <Link to={to} className="text-primary underline">{children}</Link>;
const R = ({ cells }: { cells: ReactNode[] }) => <tr className="border-t border-border">{cells.map((c, i) => <td key={i} className="p-2 align-top">{c}</td>)}</tr>;

export function CostCountrySummaryTeaching() {
  return <div className={lessonWrap}>
    <H>Five health systems side by side</H>
    <p><Reasoning />The table summarises the quoted sources below. The figures differ in currency, year, costing method and what is included, so they are not directly comparable — read the caveats in each country lesson before quoting any number.</p>
    <div className="overflow-x-auto"><table className="w-full text-sm border border-border">
      <thead className="bg-muted/50"><tr><th className="p-2 text-left">Country</th><th className="p-2 text-left">Figure</th><th className="p-2 text-left">Source and year of data</th><th className="p-2 text-left">What it covers</th></tr></thead>
      <tbody>
        <R cells={["United Kingdom", "About £1,620 per adult bed day", "NHS England National Schedule of NHS Costs 2019/20", "All adult critical care, trust-reported costs, by organs supported"]} />
        <R cells={["Australia", "A$4,375 mean per patient bed-day (2019 CPI equivalent A$4,875)", "Hicks 2019, ANZICS registry survey, 2013/14 data", "36 ICUs (~25% of Australian ICU beds); excludes capital, overheads and equipment"]} />
        <R cells={["New Zealand", "NZ$7,259 per day", "Auckland DHB response to an Official Information Act request, 2020/21", "Adult ICU patients with a respiratory complaint at one district health board, COVID era"]} />
        <R cells={["Europe", "€1,168–€2,025 per ICU day", "Tan 2012, seven ICUs in Germany, Italy, the Netherlands and the UK", "Direct costs only, standardised microcosting method"]} />
        <R cells={["United States", "Mean ICU stay $31,574 (ventilated) vs $12,931 (not ventilated); ventilation adds ~$1,522 per day", "Dasta 2005, 2002 US data", "Charge-derived costs from a large US database"]} />
      </tbody></table></div>
    <p><Reasoning />No row here can be converted into another by exchange rate alone: the years span 2002 to 2021, the methods range from trust-reported expenditure to charge-derived costs, and the case mix differs. The European studies show that even within one study using one method, costs vary widely between countries and between units.</p>
    <Check question="Why can't the Australian A$4,375 bed-day figure be converted into pounds by exchange rate to compare with the NHS figure?">The data are from 2013/14, use a different costing method (operational expenditure excluding capital and overheads), and cover a different case mix — exchange rate conversion ignores all three.</Check>
  </div>;
}

export function CostCountryUkTeaching() {
  return <div className={lessonWrap}>
    <H>United Kingdom: NHS reference costs</H>
    <Q label="NCC 2019/20 schedule" />
    <Q label="NCC 2019/20 general ICU by organs" />
    <p><Reasoning />Full detail is on <L to="/intensive-care/icu-costs">ICU Costs</L>: the 2019/20 adult average is about £1,620 per bed day (our arithmetic from published rows), rising from about £1,240 with one organ supported to about £2,330 with six or more. These are reported hospital costs, not tariffs or prices.</p>
    <Check question="What grouping does the NHS use to cost adult critical care bed days?">Healthcare Resource Groups XC01Z–XC07Z, based on the number of organs supported each day.</Check>
  </div>;
}

export function CostCountryAustraliaTeaching() {
  return <div className={lessonWrap}>
    <H>Australia: ANZICS registry costing</H>
    <Q label="Hicks 2019 mean bed-day cost" />
    <Q label="Hicks 2019 study scope" />
    <p><Reasoning />Hicks and colleagues surveyed Australian ICUs through the ANZICS Centre for Outcome and Resource Evaluation registry. Larger units and higher occupancy were each significantly associated with lower cost per bed-day, suggesting economies of scale. An older single-unit study gives a lower figure from an earlier era:</p>
    <Q label="Rechner 2005 ICU day cost" />
    <p><Reasoning />Rechner and Lipman costed one tertiary referral ICU in 2002/03; staff were about 69% of costs. The two studies are fifteen years apart with different methods, which is why their figures differ so much.</p>
    <Check question="In the Hicks 2019 study, which two factors were significantly associated with lower cost per patient bed-day?">Higher ICU bed number and higher occupancy.</Check>
  </div>;
}

export function CostCountryNzTeaching() {
  return <div className={lessonWrap}>
    <H>New Zealand: a single-board figure</H>
    <Q label="ADHB 2022 ICU day cost" />
    <p><Reasoning />This figure comes from Auckland District Health Board's response to an Official Information Act request about COVID-19 costs. It is not a national costing study: it covers one board, one financial year during the pandemic, and a respiratory case mix, and it bundles in laboratory, radiology, pharmacy and theatre costs that other studies count separately. We could not find a published national New Zealand ICU bed-day costing study, so treat this as an indicative local figure only.</p>
    <Check question="Why should the NZ$7,259 Auckland figure not be read as a national New Zealand ICU cost?">It is one district health board, in the COVID-era 2020/21 year, for adult patients with a respiratory complaint, and it includes laboratory, radiology, pharmacy and theatre costs.</Check>
  </div>;
}

export function CostCountryEuropeTeaching() {
  return <div className={lessonWrap}>
    <H>Europe: standardised cross-country studies</H>
    <Q label="Tan 2012 four-country range" />
    <Q label="Tan 2012 labour driver" />
    <p><Reasoning />Tan's team applied one standardised costing method to seven ICUs in Germany, Italy, the Netherlands and the UK, so the remaining differences reflect real variation in practice and input prices rather than method. An earlier study used purchasing power parities to compare four countries:</p>
    <Q label="IPOC 2006 PPP costs" />
    <p><Reasoning />Both studies are old, and both show wide variation even with a common method. Labour was the largest cost component everywhere Tan looked — the same pattern as the Australian and NHS data.</p>
    <Check question="Across the seven European ICUs in Tan 2012, what was the most important cost driver?">Labour, at every department.</Check>
  </div>;
}

export function CostCountryUsTeaching() {
  return <div className={lessonWrap}>
    <H>United States: charge-derived costs</H>
    <Q label="Dasta 2005 daily cost" />
    <Q label="Dasta 2005 ventilation increment" />
    <p><Reasoning />Dasta's 2002 figures are derived from charges in a large US database, a different method from the trust-reported costs in the NHS schedule or the microcosting in the European studies. US figures also reflect a payer system with different input prices. The comparison lesson on <L to="/intensive-care/icu-costs">ICU Costs</L> explains why these cannot be converted into NHS costs by exchange rate. For condition-level US figures, see <L to="/intensive-care/icu-cost-by-condition">ICU Cost by Condition</L>.</p>
    <Check question="In Dasta 2005, how much did mechanical ventilation add per ICU day after adjustment?">About $1,522 per day.</Check>
  </div>;
}
