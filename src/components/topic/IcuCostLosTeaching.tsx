import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { lessonWrap, H, Check, Reasoning, makeQuote } from "@/components/topic/EndocrinePageShared";

/** ICU cost and length-of-stay pages. NHS figures come from the 2019/20 National Schedule of NHS Costs and HES Adult Critical Care 2019-20; aggregates are labelled arithmetic. Shared study quotes reuse ICU Outcomes records so wording cannot drift. */
const QC = makeQuote("icu-costs");
const QL = makeQuote("icu-length-of-stay");
const QO = makeQuote("icu-outcomes");
const L = ({ to, children }: { to: string; children: ReactNode }) => <Link to={to} className="text-primary underline">{children}</Link>;
const Row = ({ c }: { c: ReactNode[] }) => <tr className="border-t border-border">{c.map((v, i) => <td key={i} className="p-2">{v}</td>)}</tr>;
const Table = ({ head, rows }: { head: string[]; rows: ReactNode[][] }) => <div className="overflow-x-auto"><table className="w-full text-sm border border-border">
  <thead className="bg-muted/50"><tr>{head.map((h) => <th key={h} className="p-2 text-left">{h}</th>)}</tr></thead>
  <tbody>{rows.map((r, i) => <Row key={i} c={r} />)}</tbody></table></div>;

/* ---------------- Cost page ---------------- */

export function CostAverageTeaching() {
  return <div className={lessonWrap}>
    <p>Costs for individual conditions, UK beside US, are on <L to="/intensive-care/icu-cost-by-condition">ICU Cost by Condition</L>.</p>
    <H>The headline NHS figure</H>
    <QO label="DHSC 2023 NHS bed-day costs" />
    <QO label="DHSC 2023 critical care caveat" />
    <p><Reasoning />£1,881 is the average cost of one critical care bed day in England in 2020/21, averaged across adult, paediatric and neonatal critical care. A critical care day therefore cost about 5.5 times a standard bed day (£1,881 ÷ £345 — arithmetic, not a published ratio), but the £345 excludes treatment, so the real gap is smaller. 2020/21 was a COVID-affected year.</p>
    <H>Adult-only costs from the National Schedule</H>
    <QC label="NCC 2019/20 schedule" />
    <p><Reasoning />NHS England's National Schedule of NHS Costs lists adult critical care separately from paediatric and neonatal care, as cost per bed day for each Healthcare Resource Group (HRG). The 2019/20 schedule is the most recent one we could download and check as a spreadsheet; later years are published only through an interactive dashboard, so their figures are not quoted here. Adding up every adult critical care row in 2019/20 gives 1,326,594 bed days costing about £2.15 billion, an average of <strong>£1,620 per adult bed day</strong> (our arithmetic from the published rows). That is the last full year before COVID-19 and is in 2019/20 prices.</p>
    <Check question="Why is the £1,881 DHSC figure not an adult-only ICU cost?">It averages adult, paediatric and neonatal critical care (2020/21 cost collection data).</Check>
  </div>;
}

export function CostOrgansTeaching() {
  return <div className={lessonWrap}>
    <H>NHS costs rise with organs supported</H>
    <QC label="NCC 2019/20 general ICU by organs" />
    <p><Reasoning />Adult critical care is paid and costed by the number of organ systems supported on each day (HRGs XC01Z–XC07Z, from the Critical Care Minimum Dataset). The table combines every adult unit type, weighting each row by its bed days (our arithmetic from the 2019/20 schedule, rounded to the nearest pound).</p>
    <Table head={["HRG", "Organs supported that day", "Adult bed days", "Average cost per bed day"]} rows={[
      ["XC07Z", "0", "35,030", "£1,087"],
      ["XC06Z", "1", "516,316", "£1,240"],
      ["XC05Z", "2", "333,957", "£1,704"],
      ["XC04Z", "3", "270,880", "£1,947"],
      ["XC03Z", "4", "123,347", "£2,160"],
      ["XC02Z", "5", "37,279", "£2,275"],
      ["XC01Z", "6 or more", "9,785", "£2,330"],
      [<strong key="a">All</strong>, "—", "1,326,594", <strong key="b">£1,620</strong>],
    ]} />
    <p><Reasoning />A day with six or more organs supported cost about twice a one-organ day. Most adult bed days (about 64%) involved one or two organs. Costs flatten above four organs because nursing at 1:1 is already the main cost; more organ support adds drugs and equipment rather than staff (teaching interpretation). These are reported costs, not the price commissioners pay, and they vary between trusts.</p>
    <H>Worked example (fictional)</H>
    <p><Reasoning />A fictional patient spends 2 days on 3 organs, 3 days on 2 organs and 2 days on 1 organ: 2 × £1,947 + 3 × £1,704 + 2 × £1,240 = £11,486 at 2019/20 average costs. This is arithmetic for teaching, not a real bill or tariff.</p>
    <Check question="In the 2019/20 schedule, roughly what did an adult day with 1 organ supported cost compared with 6 or more?">About £1,240 versus £2,330 — roughly half.</Check>
  </div>;
}

export function CostUnitTypeTeaching() {
  return <div className={lessonWrap}>
    <H>Cost by type of unit</H>
    <p><Reasoning />The schedule also splits costs by unit function — the closest open NHS breakdown to cost &quot;by condition&quot;. It describes the type of patient a unit mainly treats, not each patient's diagnosis. Averages below combine all organ-support levels, weighted by bed days (our arithmetic from the 2019/20 rows).</p>
    <Table head={["Unit function (NHS description)", "Adult bed days", "Average cost per bed day"]} rows={[
      ["General adult critical care", "838,376", "£1,689"],
      ["Cardiac surgical", "168,333", "£1,660"],
      ["Medical (unspecified)", "83,020", "£1,300"],
      ["Neurosciences", "69,779", "£1,616"],
      ["Surgical (unspecified)", "64,982", "£1,458"],
      ["Thoracic surgical", "41,680", "£1,379"],
      ["Ward area (non-standard location)", "20,972", "£917"],
      ["Liver", "8,376", "£1,760"],
      ["Burns and plastic surgery", "8,087", "£1,637"],
      ["Obstetric and gynaecology", "8,008", "£2,303"],
      ["Spinal", "5,709", "£1,135"],
      ["Renal", "5,057", "£1,234"],
    ]} />
    <QC label="NCC 2019/20 specialist one-organ rows" />
    <p><Reasoning />Differences between unit types partly reflect case mix and partly how few trusts submitted data: small specialist groups (obstetric, burns, spinal, renal) come from a handful of trusts, so one hospital's accounting can move the average a lot. Treat them as descriptive, not as the cost of treating a condition. Diagnosis-level NHS costs are not published openly.</p>
    <Check question="Why can't the unit-function table be read as the NHS cost of a diagnosis?">Unit function describes the predominant patient type of a unit, not each patient's diagnosis, and small groups rest on few trust submissions.</Check>
  </div>;
}

export function CostInternationalTeaching() {
  return <div className={lessonWrap}>
    <H>US costs and why they don't convert</H>
    <QO label="Dasta 2005 daily cost" />
    <QO label="Dasta 2005 ventilation increment" />
    <p><Reasoning />US 2002 costs were derived from hospital charges; NHS figures are trust-reported expenditure. Different decades, costing methods and case mix mean you cannot compare them by exchange rate. Both show the same pattern: the first day and organ support (especially ventilation) drive cost.</p>
    <H>Costs after discharge</H>
    <QO label="Lone 2016 hospital costs" />
    <p><Reasoning />Hospital costs continue for years after ICU and exclude social care, lost earnings and carer time. See <L to="/intensive-care/icu-outcomes">ICU Outcomes</L> for recovery and work, and <L to="/intensive-care/icu-length-of-stay">ICU Length of Stay</L> for how many days are bought.</p>
    <Check question="Dasta 2005: what was the adjusted extra daily cost of mechanical ventilation?">US$1,522 per day.</Check>
  </div>;
}

/* ---------------- Length-of-stay page ---------------- */

export function LosNationalTeaching() {
  return <div className={lessonWrap}>
    <H>UK national averages</H>
    <QO label="ICNARC CMP 2024-25 length of stay" />
    <p><Reasoning />In ICNARC's 2024–25 audit, the average critical care stay was 6 days and the acute hospital stay 20 days. Non-survivors stayed slightly longer in critical care (7 days) but shorter in hospital (16), because many died in the unit.</p>
    <H>NHS England hospital statistics</H>
    <QL label="HES ACC 2019-20 weekend start" />
    <QL label="HES ACC 2019-20 discharge day" />
    <p><Reasoning />Hospital Episode Statistics (HES) count each critical care record. Weekend admissions stayed longer, which NHS Digital suggests may be because more are emergencies. The day-of-discharge pattern (longest for Monday discharges, shortest for Saturday) suggests that weekend discharge practice affects stay, not just illness (teaching interpretation).</p>
    <Check question="ICNARC 2024–25: average critical care and hospital stay for all admissions?">6 days in critical care; 20 days in acute hospital.</Check>
  </div>;
}

export function LosOrganSupportTeaching() {
  return <div className={lessonWrap}>
    <H>NHS England: days by type of organ support</H>
    <QL label="HES ACC support days" />
    <p><Reasoning />Average support days per critical care period, from NHS Digital's 2018-19 column (the most recent column clearly labelled in the table; men and women shown separately).</p>
    <Table head={["Support type", "Men (days)", "Women (days)"]} rows={[
      ["Gastrointestinal support", "8.5", "7.6"],
      ["Dermatological support", "6.2", "6.0"],
      ["Renal support", "5.4", "5.0"],
      ["Liver support", "5.1", "4.7"],
      ["Advanced respiratory support", "4.8", "5.0"],
      ["Neurological support", "4.6", "4.4"],
      ["Basic cardiovascular support", "4.2", "3.9"],
      ["Basic respiratory support", "3.1", "3.0"],
      ["Advanced cardiovascular support", "3.1", "3.0"],
    ]} />
    <p><Reasoning />These are days of each support, not total stay. Gastrointestinal support (mainly feeding) lasts longest because it continues through most of a long stay; advanced cardiovascular support is short because it is either weaned or the patient dies (teaching interpretation). Patients often receive several types at once.</p>
    <Check question="In HES 2018-19, which recorded support type lasted longest on average?">Gastrointestinal support (8.5 days in men, 7.6 in women).</Check>
  </div>;
}

export function LosConditionTeaching() {
  return <div className={lessonWrap}>
    <H>Length of stay by condition</H>
    <p><Reasoning />NHS England does not openly publish ICU stay for each diagnosis. The figures below come from published studies; they differ in country, year and whether they report means or medians, so compare with care.</p>
    <Table head={["Condition (source)", "ICU stay", "Notes"]} rows={[
      ["All UK admissions (ICNARC 2024–25)", "Average 6 days", "National audit"],
      ["Severe acute pancreatitis (Harrison 2007, ICNARC data)", "Median 3.8 days", "UK, 1995–2003"],
      ["Flail chest admitted to ICU (Dehghan 2014)", "Mean 11.7 days", "US trauma registry"],
      ["Ventilated ICU patients (Dasta 2005)", "Mean 14.4 days", "US, 2002"],
      ["Not ventilated (Dasta 2005)", "Mean 8.5 days", "US, 2002"],
    ]} />
    <QL label="Harrison 2007 pancreatitis stay" />
    <QO label="Dehghan 2014 flail chest stay" />
    <H>Predicting stay from diagnosis</H>
    <QO label="Zimmerman 2006 APACHE IV stay" />
    <QO label="Zimmerman 2006 conclusion" />
    <p><Reasoning />Diagnosis-based prediction works for groups and units, not individuals. The UK pancreatitis median (3.8 days) is shorter than many expect because early deaths and quick recoveries pull the median down; survivors and non-survivors had similar stays.</p>
    <Check question="ICNARC pancreatitis admissions 1995–2003: median ICU stay?">3.8 days, similar for survivors and non-survivors.</Check>
  </div>;
}

export function LosInterpretTeaching() {
  return <div className={lessonWrap}>
    <H>Deprivation and stay</H>
    <QL label="HES ACC 2019-20 deprivation" />
    <p><Reasoning />In 2019-20, patients from the most deprived tenth of areas averaged 4.19 days per critical care record against 3.82 in the least deprived. HES records are per unit episode, so they are shorter than ICNARC's per-admission average, and these figures are not adjusted for illness severity.</p>
    <H>Reading length-of-stay figures</H>
    <p><Reasoning />Stays are right-skewed: a few very long stays raise the mean above the median. Early deaths shorten averages, so a short mean stay is not automatically good care. Delayed discharge for lack of ward beds also adds days that are not illness — see <L to="/intensive-care/icu-discharge-planning">ICU Discharge Planning</L>. Costs per stay follow from days and organ support: see <L to="/intensive-care/icu-costs">ICU Costs</L>.</p>
    <Check question="Why is HES mean duration (~4 days) lower than ICNARC's 6 days?">HES counts each critical care record (unit episode); ICNARC reports per admission and covers different units and years.</Check>
  </div>;
}
