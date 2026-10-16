import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { lessonWrap, H, Check, Reasoning, makeQuote } from "@/components/topic/EndocrinePageShared";

const Q = makeQuote("icu-cost-timeline");
const L = ({ to, children }: { to: string; children: ReactNode }) => <Link to={to} className="text-primary underline">{children}</Link>;
const Row = ({ c, bold }: { c: string[]; bold?: boolean }) => (
  <tr className={`border-t border-border${bold ? " font-medium" : ""}`}>{c.map((x, i) => <td key={i} className="p-2">{x}</td>)}</tr>
);
const Table = ({ head, rows }: { head: string[]; rows: string[][] }) => (
  <div className="overflow-x-auto"><table className="w-full text-sm border border-border">
    <thead className="bg-muted/50"><tr>{head.map((h) => <th key={h} className="p-2 text-left">{h}</th>)}</tr></thead>
    <tbody>{rows.map((r, i) => <Row key={i} c={r} />)}</tbody>
  </table></div>
);

export function TimelineSeriesTeaching() {
  return <div className={lessonWrap}>
    <H>Adult critical care cost per bed day, year by year</H>
    <p><Reasoning />Each national schedule costs adult critical care with the same seven currencies (HRGs XC01Z–XC07Z, from 0 to 6 or more organs supported). We took the published rows for every year we could download and verify, and weighted each row by its bed days to give one adult average per year. The averages are our arithmetic; the row values are as published. Figures are cash (not inflation-adjusted) and are trust-reported costs, not prices paid (teaching summary).</p>
    <Table head={["Year", "Collection", "Adult bed days", "All-adult average (our arithmetic)", "Change from previous verified year"]} rows={[
      ["2013/14", "Reference Costs", "1,436,667", "£1,190", "—"],
      ["2015/16", "Reference Costs", "1,479,312", "£1,307", "+10% over two years"],
      ["2019/20", "National Cost Collection", "1,326,594", "£1,620", "+24% over four years"],
      ["2020/21", "National Cost Collection (all ages only)", "not split by age", "£1,881 all ages — not comparable", "—"],
      ["2021/22", "National Cost Collection", "1,313,179", "£2,144", "+32% over two years"],
    ]} />
    <p><Reasoning />Across the eight years the adult average rose from £1,190 to £2,144, about 80% in cash terms (our arithmetic). Missing years (2014/15, 2016/17–2018/19) are not shown because we could not obtain and check those files here; 2022/23 onwards is published as an interactive dashboard, not a downloadable schedule we could verify. We have not interpolated any year (teaching summary).</p>
    <Q label="RC 2013-14 adult CC by organs" />
    <Q label="RC 2015-16 adult CC by organs" />
    <Q label="NCC 2019/20 schedule" />
    <Q label="NCC 2021/22 adult CC by organs" />
    <Check question="What was the all-adult critical care cost per bed day in 2013/14 and in 2021/22?">About £1,190 and £2,144 respectively (bed-day-weighted arithmetic from the published rows), about 80% higher in cash terms.</Check>
  </div>;
}

export function TimelineOrgansTeaching() {
  return <div className={lessonWrap}>
    <H>How each organ-support level changed</H>
    <p><Reasoning />Published national average cost per adult bed day by organs supported (rounded to the nearest pound). The 2019/20 rows are the general adult critical care rows used on <L to="/intensive-care/icu-costs">ICU Costs</L>; the other years are the all-adult Total HRGs rows (teaching summary).</p>
    <Table head={["Organs supported", "2013/14", "2015/16", "2021/22"]} rows={[
      ["0", "£643", "£700", "£1,640"],
      ["1", "£890", "£994", "£1,587"],
      ["2", "£1,266", "£1,345", "£2,278"],
      ["3", "£1,449", "£1,582", "£2,587"],
      ["4", "£1,594", "£1,783", "£2,861"],
      ["5", "£1,712", "£2,006", "£2,892"],
      ["6 or more", "£1,886", "£2,456", "£2,985"],
    ]} />
    <Q label="NCC 2019/20 general ICU by organs" />
    <p><Reasoning />The ratio between the most and least intensive days narrowed: a six-plus-organ day cost about 2.1 times a one-organ day in 2013/14 and about 1.9 times in 2021/22 (our arithmetic). In 2021/22 a zero-organ day was published as slightly dearer than a one-organ day; that is how the data were reported, likely reflecting few and unusual zero-organ days, and should not be read as a clinical effect (teaching summary).</p>
    <Check question="Roughly how much more did a six-or-more-organ day cost than a one-organ day in 2021/22?">About 1.9 times (£2,985 vs £1,587), slightly less than the 2.1-fold gap in 2013/14.</Check>
  </div>;
}

export function TimelineCaveatsTeaching() {
  return <div className={lessonWrap}>
    <H>Reading the trend safely</H>
    <Q label="DHSC 2023 NHS bed-day costs" />
    <Q label="DHSC 2023 critical care caveat" />
    <ul className="list-disc pl-5 space-y-1 text-sm">
      <li><Reasoning />Cash, not real terms: part of the rise is general inflation and pay awards; we have not deflated the series.</li>
      <li><Reasoning />Method change: Reference Costs (to 2017/18) gave way to the National Cost Collection with patient-level costing, so the step to 2019/20 mixes method and spending.</li>
      <li><Reasoning />COVID: 2020/21 is published only as an all-ages figure (£1,881) and 2021/22 still carried pandemic pressures.</li>
      <li><Reasoning />Costs, not prices: these are what trusts report spending, not tariff payments or a bill for a patient.</li>
      <li><Reasoning />Bed days fell slightly over the period, so fixed costs spread over fewer days can raise the per-day figure without more care being delivered.</li>
    </ul>
    <p>For costs by country see <L to="/intensive-care/icu-cost-by-country">ICU Costs by Country</L>; by condition see <L to="/intensive-care/icu-cost-by-condition">ICU Cost by Condition</L>.</p>
    <Check question="Give two reasons the 2013/14 to 2021/22 rise overstates real growth in ICU spending.">Figures are not inflation-adjusted, and the costing method changed from Reference Costs to the National Cost Collection (plus COVID effects in 2021/22).</Check>
  </div>;
}
