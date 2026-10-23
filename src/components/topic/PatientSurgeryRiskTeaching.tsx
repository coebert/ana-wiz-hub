import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";

const R = ({ label }: { label: string }) => <InlineRef topicId="anaesthetic-risk" refLabel={label} />;
const heading = "text-lg font-semibold text-foreground";
const wrap = "space-y-4 text-muted-foreground leading-relaxed";
const h2 = "text-2xl font-serif font-bold text-foreground";

export function PreExistingConditionRiskTeaching() {
  return <div className={wrap}>
    <h2 className={h2}>Pre-existing conditions and anaesthetic risk</h2>
    <p>Most serious perioperative harm comes from the interaction of the patient’s illnesses with the stress of surgery, not from the anaesthetic drugs themselves. Conditions change the type of risk as well as the size, so state which outcome a figure describes. ASA physical status is a useful shared language, but it is subjective and is not a numerical prediction tool.<R label="ASA physical status" /></p>
    <ul className="list-disc pl-5 space-y-2">
      <li><strong>Cardiac disease:</strong> the 2022 ESC guideline combines patient factors with the risk category of the operation (low &lt;1%, intermediate 1–5%, high &gt;5% 30-day cardiovascular death or myocardial infarction) and supports the RCRI as a simple bedside index. Ischaemic heart disease, heart failure, cerebrovascular disease, insulin-treated diabetes and creatinine above 177 µmol/L are the RCRI patient factors; the sixth factor is high-risk surgery.<R label="ESC non-cardiac surgery 2022" /><R label="RCRI 1999" /></li>
      <li><strong>Respiratory disease:</strong> lung complications depend on both patient and operation. ARISCAT combines age, oxygen saturation, recent chest infection, anaemia, upper-abdominal or chest incision, long surgery and emergency surgery.<R label="ARISCAT 2010" /></li>
      <li><strong>Obstructive sleep apnoea:</strong> often undiagnosed, and linked to difficult airways and breathing problems after surgery, particularly with opioids. In the STOP development study, 27.5% of 2,467 surgical patients screened as high risk; STOP-Bang adds BMI, age, neck size and sex to improve sensitivity. It is a screening tool, not a diagnosis.<R label="STOP-Bang" /></li>
      <li><strong>Diabetes:</strong> CPOC guidance asks for HbA1c in the referral pathway and optimisation before elective surgery, because poor control is associated with infection, longer stay and other complications. An HbA1c threshold is a trigger for review, not a fixed risk number.<R label="CPOC diabetes 2023" /></li>
      <li><strong>Frailty and cognitive impairment:</strong> frailty predicts complications, longer stay and loss of independence better than age alone. Cognitive impairment raises delirium risk and affects consent.<R label="CPOC Frailty" /><R label="ESAIC delirium 2024" /></li>
      <li><strong>Other conditions</strong> — anaemia, kidney disease, liver disease, neuromuscular disease and previous airway difficulty — enter the scoring tools below or need specific planning rather than a separate generic number.</li>
    </ul>
  </div>;
}

export function AgeRelatedRiskTeaching() {
  return <div className={wrap}>
    <h2 className={h2}>Age-related risks: older adults and children</h2>
    <h3 className={heading}>Older adults</h3>
    <p>In US Veterans Affairs hospitals, 30-day mortality after major non-cardiac surgery was 8% for patients aged 80 and over versus 3% for younger patients, but under 2% for many common operations such as hernia repair, knee replacement and carotid endarterectomy. One in five patients aged 80 and over had a complication, and those with complications had 26% mortality compared with 4%.<R label="Hamel over-80 2005" /> The lesson for consent is that age raises risk mostly by reducing the ability to survive a complication. Frailty, function and the type of operation matter more than the number of years.<R label="CPOC Frailty" /></p>
    <ul className="list-disc pl-5 space-y-2">
      <li><strong>Delirium:</strong> common after major and emergency surgery in older people, and linked to longer stay and later cognitive decline. ESAIC 2024 recommends screening risk, avoiding unnecessary deep anaesthesia and drugs such as benzodiazepines, and using non-drug prevention.<R label="ESAIC delirium 2024" /></li>
      <li><strong>Brain health:</strong> ASA 2025 guidance covers perioperative care of older adults having inpatient surgery. It does not show that any particular anaesthetic technique prevents dementia, so avoid promising that one choice protects long-term brain health.<R label="ASA older adults 2025" /></li>
      <li><strong>Loss of function:</strong> for many older patients, being able to live at home matters more than survival figures. Ask about it and discuss it.</li>
    </ul>
    <h3 className={heading}>Children</h3>
    <p>APRICOT studied 31,127 anaesthetics in children across 261 European hospitals. Severe critical events occurred in 5.2% (95% CI 5.0–5.5), mostly respiratory (3.1%, such as laryngospasm and bronchospasm), with cardiovascular instability in 1.9%; 30-day in-hospital mortality was 10 per 10,000 and did not depend on the type of anaesthesia. Younger age and poorer health were the main risk factors, and greater experience of the most senior anaesthetist was protective.<R label="APRICOT 2017" /> For parents, explain that breathing problems during the anaesthetic are the most common serious event and that a recent cold increases them.</p>
  </div>;
}

export function SurgerySpecificRiskTeaching() {
  return <div className={wrap}>
    <h2 className={h2}>Risk prediction for specific types of surgery</h2>
    <p>General tools such as SORT and NSQIP work across many operations, but specialist scores are built on data from one type of surgery and are usually better calibrated for it. Each score predicts a defined outcome in the population it was built on; check that the patient and the outcome match before quoting it.<R label="SORT 2014" /><R label="NSQIP" /></p>
    <div className="overflow-x-auto"><table className="w-full text-sm border-collapse">
      <thead><tr className="border-b border-border text-left text-foreground"><th className="p-2">Surgery</th><th className="p-2">Tool</th><th className="p-2">What it predicts and key evidence</th></tr></thead>
      <tbody className="[&_td]:p-2 [&_td]:align-top [&_tr]:border-b [&_tr]:border-border">
        <tr><td>Emergency laparotomy</td><td>NELA risk calculator</td><td>30-day mortality, built from the UK National Emergency Laparotomy Audit. NELA states it must not be used alone, and its derivation data run from December 2016 to November 2019.<R label="NELA calculator" /></td></tr>
        <tr><td>Cardiac surgery</td><td>EuroSCORE II</td><td>In-hospital mortality, built from 22,381 patients in 154 hospitals in 43 countries. In the test group, actual mortality was 4.18% and predicted 3.95%, with an area under the curve of 0.81; the original EuroSCORE over-predicted mortality.<R label="EuroSCORE II 2012" /></td></tr>
        <tr><td>Hip fracture</td><td>Nottingham Hip Fracture Score</td><td>30-day mortality from age, male sex, two or more other illnesses, abbreviated mental test ≤6/10, haemoglobin ≤10 g/dL, living in a care home and cancer. Area under the curve 0.72 — reasonable, not precise.<R label="Nottingham Hip Fracture Score 2008" /></td></tr>
        <tr><td>Major non-cardiac surgery</td><td>RCRI and ESC surgical risk categories</td><td>Major cardiac complications; combines patient factors with the risk category of the operation.<R label="RCRI 1999" /><R label="ESC non-cardiac surgery 2022" /></td></tr>
        <tr><td>Operations with lung risk</td><td>ARISCAT</td><td>Lung complications after surgery; upper-abdominal and chest operations score highest.<R label="ARISCAT 2010" /></td></tr>
      </tbody>
    </table></div>
    <p>A score supports, not replaces, clinical judgement: in an international study of 22,631 patients, a model combining SORT with doctors’ estimates was developed, and all methods tested overpredicted risk.<R label="SORT clinical judgement 2020" /> Exercise testing can add information for major surgery but has its own limitations.<R label="CPET limitations" /></p>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: can you use the NELA calculator to counsel a patient before elective bowel surgery?</summary><p className="mt-2">No. It was built from emergency laparotomies and predicts emergency 30-day mortality; use a tool developed or validated for elective surgery instead.</p></details>
    <LessonSources topicId="anaesthetic-risk" labels={["ASA physical status", "ESC non-cardiac surgery 2022", "RCRI 1999", "ARISCAT 2010", "STOP-Bang", "CPOC diabetes 2023", "CPOC Frailty", "ESAIC delirium 2024", "ASA older adults 2025", "Hamel over-80 2005", "APRICOT 2017", "SORT 2014", "NSQIP", "NELA calculator", "EuroSCORE II 2012", "Nottingham Hip Fracture Score 2008", "SORT clinical judgement 2020", "CPET limitations"]} />
  </div>;
}
