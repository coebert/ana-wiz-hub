import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { lessonWrap, H, Check, Reasoning, makeQuote } from "@/components/topic/EndocrinePageShared";

/** One page per ICU unit type: GPICS V3 staffing plus NHS 2019/20 unit-function costs.
 *  Quotes resolve verified excerpt records copied verbatim from icu-staffing-by-unit and icu-costs. */
const QG = makeQuote("icu-general-unit");
const QC = makeQuote("icu-cardiac-unit");
const QN = makeQuote("icu-neuro-unit");
const QL = makeQuote("icu-liver-unit");
const QO = makeQuote("icu-obstetric-unit");
const L = ({ to, children }: { to: string; children: ReactNode }) => <Link to={to} className="text-primary underline">{children}</Link>;
const Row = ({ c }: { c: ReactNode[] }) => <tr className="border-t border-border">{c.map((v, i) => <td key={i} className="p-2">{v}</td>)}</tr>;
const Table = ({ head, rows }: { head: string[]; rows: ReactNode[][] }) => <div className="overflow-x-auto"><table className="w-full text-sm border border-border">
  <thead className="bg-muted/50"><tr>{head.map((h) => <th key={h} className="p-2 text-left">{h}</th>)}</tr></thead>
  <tbody>{rows.map((r, i) => <Row key={i} c={r} />)}</tbody></table></div>;

const CostNote = () => <p><Reasoning />Cost figures are adult bed-day averages from NHS England's National Schedule of NHS Costs 2019/20, weighted across organ-support levels (our arithmetic from the published rows). The schedule describes the type of patient a unit mainly treats, not each patient's diagnosis, and small specialist groups rest on few trust submissions — treat them as descriptive, not as the cost of treating a condition. The full table is on <L to="/intensive-care/icu-costs">ICU Costs</L>.</p>;

/* ---------------- General adult ICU ---------------- */

export function GeneralUnitStaffingTeaching() {
  return <div className={lessonWrap}>
    <H>Staffing: the GPICS V3 baseline</H>
    <p><Reasoning />The general adult ICU is the baseline every specialist chapter builds on. These minimum standards come from the GPICS V3 staffing chapters and apply to every ICU, whatever its case mix.</p>
    <QG label="GPICS V3 consultant ratio" />
    <QG label="GPICS V3 consultant availability" />
    <QG label="GPICS V3 resident ratio" />
    <QG label="GPICS V3 nurse ratios" />
    <QG label="GPICS V3 coordinator" />
    <QG label="GPICS V3 additional nurse" />
    <QG label="GPICS V3 pharmacist" />
    <p><Reasoning />Role-by-role detail, including bank/agency limits, nursing associates and allied health professionals, is on <L to="/intensive-care/icu-staffing-ratios">ICU Staffing Ratios</L>; what other unit types add is on <L to="/intensive-care/icu-staffing-by-unit">ICU Staffing by Unit Type</L>.</p>
    <Check question="What nurse:patient ratios does GPICS V3 set for a general ICU?">1:1 for level 3 patients and 1:2 for level 2 patients, plus a clinical shift leader with no patient allocation.</Check>
  </div>;
}

export function GeneralUnitCostTeaching() {
  return <div className={lessonWrap}>
    <H>Cost: general adult critical care</H>
    <QG label="NCC 2019/20 schedule" />
    <QG label="NCC 2019/20 general ICU by organs" />
    <Table head={["Measure (2019/20)", "Value"]} rows={[
      ["Adult bed days, general adult critical care (CCU01)", "838,376"],
      ["Average cost per bed day, all organ-support levels", "£1,689"],
      ["Share of all adult critical care bed days", "About 63% (838,376 of 1,326,594 — our arithmetic)"],
    ]} />
    <CostNote />
    <p><Reasoning />General units carry most of England's adult critical care activity, so their average sits close to the all-unit average of £1,620. Within CCU01, cost still rises with organs supported — from £1,096.41 with none to £2,066.08 with six or more (published row values).</p>
    <Check question="In the 2019/20 schedule, what was the average cost of a general adult critical care bed day?">About £1,689, across 838,376 bed days.</Check>
  </div>;
}

/* ---------------- Cardiac (cardiothoracic) ICU ---------------- */

export function CardiacUnitStaffingTeaching() {
  return <div className={lessonWrap}>
    <H>Staffing: GPICS V3 cardiothoracic intensive care</H>
    <QC label="GPICS V3 cardiothoracic consultant" />
    <QC label="GPICS V3 cardiothoracic skills" />
    <QC label="GPICS V3 cardiothoracic perfusion" />
    <QC label="GPICS V3 cardiothoracic ward round" />
    <p><Reasoning />The general ratios still apply; the chapter adds a cardiothoracic surgeon alongside the on-site ICU doctor or ACCP, a CALS-trained rota able to reopen the chest 24/7, readily available perfusion and theatre staff, and a job-planned cardiothoracic consultant directing care. Consultants covering out of hours must work daytime cardiothoracic sessions.</p>
    <Check question="What must the cardiothoracic on-site rota be trained in?">Cardiac Surgery Advanced Life Support (CALS), with the capability to reopen the chest 24/7.</Check>
  </div>;
}

export function CardiacUnitCostTeaching() {
  return <div className={lessonWrap}>
    <H>Cost: cardiac surgical critical care</H>
    <QC label="NCC 2019/20 schedule" />
    <QC label="NCC 2019/20 specialist one-organ rows" />
    <Table head={["Measure (2019/20)", "Value"]} rows={[
      ["Adult bed days, cardiac surgical units (CCU06)", "168,333"],
      ["Average cost per bed day, all organ-support levels", "£1,660"],
      ["One organ supported (XC06Z row, published value)", "£1,215.90"],
    ]} />
    <CostNote />
    <p><Reasoning />Cardiac surgical is the largest specialist group in the schedule and its average (£1,660) sits just below the general figure — consistent with short, planned post-operative stays at low organ-support levels, though the schedule does not break this down by diagnosis.</p>
    <Check question="How did cardiac surgical unit costs compare with the general average in 2019/20?">Slightly lower: about £1,660 per bed day versus £1,689 for general adult critical care.</Check>
  </div>;
}

/* ---------------- Neurocritical care ---------------- */

export function NeuroUnitStaffingTeaching() {
  return <div className={lessonWrap}>
    <H>Staffing: GPICS V3 neurocritical care</H>
    <QN label="GPICS V3 neuro staffing" />
    <QN label="GPICS V3 neuro specialists" />
    <QN label="GPICS V3 neuro ward round" />
    <p><Reasoning />Neurocritical care keeps the general ratios. Its additions are consultant-specific: out-of-hours consultants must have daytime neurocritical care sessions, care must be directed by a job-planned consultant trained in neuro intensive care, and the unit must have access to a defined list of neuroscience specialties — access, not co-location.</p>
    <Check question="Which specialist services must a neurocritical care unit have access to?">Neurosurgery, spinal surgery, neurology, stroke, diagnostic and interventional neuroradiology, neurophysiology and neurorehabilitation.</Check>
  </div>;
}

export function NeuroUnitCostTeaching() {
  return <div className={lessonWrap}>
    <H>Cost: neurosciences critical care</H>
    <QN label="NCC 2019/20 schedule" />
    <Table head={["Measure (2019/20)", "Value"]} rows={[
      ["Adult bed days, neurosciences units", "69,779"],
      ["Average cost per bed day, all organ-support levels", "£1,616"],
    ]} />
    <CostNote />
    <p><Reasoning />The neurosciences average (£1,616) is close to the all-unit average of £1,620. The schedule gives no diagnosis-level split, so this cannot be read as the cost of, for example, subarachnoid haemorrhage or traumatic brain injury.</p>
    <Check question="In 2019/20, what was the average cost per bed day in neurosciences critical care units?">About £1,616, across 69,779 adult bed days.</Check>
  </div>;
}

/* ---------------- Liver ICU ---------------- */

export function LiverUnitStaffingTeaching() {
  return <div className={lessonWrap}>
    <H>Staffing: no dedicated GPICS V3 chapter</H>
    <p><Reasoning />GPICS V3 has specialist chapters for cardiothoracic, neurocritical care, burns, smaller remote and rural units and enhanced care — but none for liver intensive care. Liver units therefore work to the general staffing chapters, quoted below. This absence is our reading of the V3 contents, not a GPICS statement; specialist liver service specifications may add requirements locally.</p>
    <QL label="GPICS V3 consultant ratio" />
    <QL label="GPICS V3 consultant availability" />
    <QL label="GPICS V3 resident ratio" />
    <QL label="GPICS V3 nurse ratios" />
    <QL label="GPICS V3 coordinator" />
    <QL label="GPICS V3 pharmacist" />
    <Check question="Which GPICS V3 chapter sets liver ICU staffing?">None — liver units follow the general staffing chapters; there is no liver-specific chapter in V3.</Check>
  </div>;
}

export function LiverUnitCostTeaching() {
  return <div className={lessonWrap}>
    <H>Cost: liver critical care</H>
    <QL label="NCC 2019/20 schedule" />
    <Table head={["Measure (2019/20)", "Value"]} rows={[
      ["Adult bed days, liver units", "8,376"],
      ["Average cost per bed day, all organ-support levels", "£1,760"],
    ]} />
    <CostNote />
    <p><Reasoning />Liver is a small group — 8,376 bed days from a handful of specialist centres — so one hospital's accounting can move the average. At £1,760 it sits above the general figure, consistent with high organ-support intensity, but the schedule does not separate transplant from non-transplant patients.</p>
    <Check question="Why should the liver unit average be treated cautiously?">It rests on few trust submissions (8,376 bed days), so individual hospitals' accounting can shift it; it is descriptive, not a per-condition cost.</Check>
  </div>;
}

/* ---------------- Obstetric critical care ---------------- */

export function ObstetricUnitStaffingTeaching() {
  return <div className={lessonWrap}>
    <H>Staffing: no dedicated GPICS V3 chapter</H>
    <p><Reasoning />GPICS V3 has no obstetric critical care chapter, so the general staffing standards below apply. Obstetric patients are usually cared for in general ICUs or enhanced care areas with obstetric team input; local maternity and critical care networks set additional requirements. This is our reading of the V3 contents, not a GPICS statement.</p>
    <QO label="GPICS V3 consultant ratio" />
    <QO label="GPICS V3 consultant availability" />
    <QO label="GPICS V3 resident ratio" />
    <QO label="GPICS V3 nurse ratios" />
    <QO label="GPICS V3 coordinator" />
    <QO label="GPICS V3 pharmacist" />
    <p><Reasoning />For the obstetric emergencies themselves, see <L to="/intensive-care/icu-eclampsia">Severe Pre-eclampsia and Eclampsia</L>.</p>
    <Check question="Does GPICS V3 set a separate staffing standard for obstetric critical care?">No — there is no obstetric chapter; the general staffing chapters apply.</Check>
  </div>;
}

export function ObstetricUnitCostTeaching() {
  return <div className={lessonWrap}>
    <H>Cost: obstetric and gynaecology critical care</H>
    <QO label="NCC 2019/20 schedule" />
    <QO label="NCC 2019/20 specialist one-organ rows" />
    <Table head={["Measure (2019/20)", "Value"]} rows={[
      ["Adult bed days, obstetric and gynaecology units (CCU12)", "8,008"],
      ["Average cost per bed day, all organ-support levels", "£2,303"],
      ["One organ supported (XC06Z row, published value)", "£3,039.99"],
    ]} />
    <CostNote />
    <p><Reasoning />This is the highest unit-function average in the schedule and the smallest group (8,008 bed days), so it is the most sensitive to individual trusts' accounting. It should not be read as the cost of caring for a critically ill pregnant patient.</p>
    <Check question="Which unit function had the highest average cost per bed day in the 2019/20 schedule?">Obstetric and gynaecology, at about £2,303 — from the smallest bed-day group.</Check>
  </div>;
}
