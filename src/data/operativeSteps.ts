/**
 * Operative steps library — what the surgeon is doing at each stage, and
 * what that means for the anaesthetist. Summaries describe a typical
 * sequence; local technique varies by surgeon, unit and patient.
 * Source labels resolve from topicReferences["operative-steps"].
 */

export type Specialty =
  | "Vascular"
  | "Cardiothoracic"
  | "General & GI"
  | "Orthopaedic & Spine"
  | "Neurosurgery"
  | "Urology"
  | "ENT & Head and Neck"
  | "Obstetric";

export type OperativeDiagramKey = "carotid" | "open-aaa" | "evar" | "fem-pop" | "ivor-lewis"
  | "ruptured-aaa" | "aorto-bifem" | "amputation" | "av-fistula" | "cabg" | "vats" | "lap-chole" | "whipple" | "hip-hemi" | "caesarean"
  | "avr" | "anterior-resection" | "laparotomy" | "thr" | "tkr" | "spine" | "craniotomy" | "turp" | "robotic-prostate" | "thyroid" | "tonsil";

export interface OperativeStep {
  /** What the surgeon does. */
  step: string;
  /** Why it matters to the anaesthetist at that moment. */
  anaesthetic?: string;
}

export interface Operation {
  id: string;
  name: string;
  aka?: string[];
  specialty: Specialty;
  summary: string;
  position: string;
  bloodLossRisk: "Low" | "Moderate" | "High";
  steps: OperativeStep[];
  /** The moments the anaesthetist must be ready for. */
  criticalMoments: string[];
  /** Broader anaesthetic considerations. */
  anaestheticNotes: string[];
  related?: { label: string; path: string };
  diagram?: OperativeDiagramKey;
  sources?: string[];
}

export const operations: Operation[] = [
  // ───────────────────────── Vascular ─────────────────────────
  {
    id: "carotid-endarterectomy",
    name: "Carotid endarterectomy",
    aka: ["CEA", "carotid surgery"],
    specialty: "Vascular",
    summary: "Removal of atheromatous plaque from the carotid bifurcation to reduce stroke risk in symptomatic (or selected asymptomatic) carotid stenosis.",
    position: "Supine, head turned away from the operative side, neck slightly extended; arm on the operative side tucked.",
    bloodLossRisk: "Low",
    diagram: "carotid",
    steps: [
      { step: "Incision along the anterior border of sternocleidomastoid; dissection through platysma and division of the common facial vein.", anaesthetic: "Under regional anaesthesia the patient is awake: keep them comfortable and communicative; supplement local anaesthetic if the surgeon reaches the carotid sheath and the patient feels pain." },
      { step: "Exposure of the common, internal and external carotid arteries, protecting the vagus and hypoglossal nerves.", anaesthetic: "Manipulation near the carotid sinus can cause sudden bradycardia and hypotension — the surgeon may infiltrate local anaesthetic around the sinus; have atropine or glycopyrronium ready." },
      { step: "Systemic heparin before clamping.", anaesthetic: "Give and document heparin as requested; it must have circulated before the clamps go on." },
      { step: "Cross-clamping of the internal, common and external carotid arteries.", anaesthetic: "The critical moment for the brain. Maintain blood pressure at or above the patient's baseline to support collateral flow. In an awake patient, test speech, contralateral hand grip and consciousness immediately and repeatedly; under general anaesthesia, cerebral monitoring (e.g. stump pressure, near-infrared spectroscopy or transcranial Doppler) guides shunt use." },
      { step: "Arteriotomy and, if needed, insertion of a temporary shunt from the common to the internal carotid artery.", anaesthetic: "New neurological deficit during clamping in an awake patient is the usual trigger for a shunt; tell the surgeon immediately. Shunt insertion can embolise." },
      { step: "Plaque removal (endarterectomy), then closure of the arteriotomy, often with a patch.", anaesthetic: "Keep the patient still; coughing or movement is dangerous with an open artery." },
      { step: "Back-bleeding and flushing, then release of clamps (external carotid first, then internal).", anaesthetic: "Reperfusion can cause hypertension, hypotension or bradycardia. Watch for new neurology after unclamping." },
      { step: "Haemostasis, sometimes protamine; drain and closure.", anaesthetic: "Aim for a smooth emergence without coughing or hypertension, which increase the risk of neck haematoma." },
    ],
    criticalMoments: [
      "Carotid sinus manipulation — bradycardia and hypotension",
      "Cross-clamping — cerebral ischaemia; keep pressure up and assess neurology",
      "Unclamping — haemodynamic swings and hyperperfusion",
      "Emergence and the first hours — neck haematoma can compress the airway; open the wound early if the airway is threatened",
    ],
    anaestheticNotes: [
      "GALA found no significant difference between general and local anaesthesia in stroke, myocardial infarction or death within 30 days; choose by patient, surgeon and anaesthetist preference.",
      "Regional technique: superficial (± intermediate) cervical plexus block with surgical local anaesthetic supplementation; deep cervical plexus block carries more risk (phrenic block, intravascular injection).",
      "Arterial line before induction or block; measure blood pressure in both arms preoperatively and use the higher-reading arm.",
      "Postoperative blood pressure control matters: hypertension raises the risk of hyperperfusion syndrome (headache, seizures, intracerebral haemorrhage) and haematoma.",
      "Cranial nerve injury (hypoglossal, recurrent laryngeal, marginal mandibular) may affect swallowing or the airway after surgery.",
    ],
    related: { label: "Vascular surgery anaesthesia", path: "/clinical/vascular-anaesthesia" },
    sources: ["GALA 2008", "ESVS 2023 carotid"],
  },
  {
    id: "open-aaa-repair",
    name: "Open infrarenal abdominal aortic aneurysm repair",
    aka: ["open AAA", "aortic tube graft", "aorto-bi-iliac graft"],
    specialty: "Vascular",
    summary: "Replacement of the aneurysmal infrarenal aorta with a synthetic tube or bifurcated graft through a laparotomy or retroperitoneal approach.",
    position: "Supine with arms out; long midline or transverse laparotomy (or left flank for retroperitoneal approach).",
    bloodLossRisk: "High",
    diagram: "open-aaa",
    steps: [
      { step: "Laparotomy, packing the bowel aside and opening the retroperitoneum over the aorta.", anaesthetic: "Large evaporative heat and fluid losses: active warming, warmed fluids and cell salvage should be running. Bowel handling can cause mesenteric traction syndrome (flushing, hypotension)." },
      { step: "Dissection of the aneurysm neck below the renal arteries and of both iliac arteries.", anaesthetic: "Bleeding can be brisk, especially from the left renal vein and iliac veins; keep blood products available." },
      { step: "Systemic heparin, then clamping of the iliac arteries and the aorta below the renal arteries.", anaesthetic: "Cross-clamp raises afterload suddenly: hypertension and possible myocardial ischaemia or LV failure. Anticipate with deeper anaesthesia or vasodilators (e.g. GTN) just before clamping; the higher the clamp, the bigger the effect and the greater the kidney and gut ischaemia." },
      { step: "Opening of the aneurysm sac, removal of thrombus and oversewing of back-bleeding lumbar arteries.", anaesthetic: "Back-bleeding from lumbar and inferior mesenteric arteries can be significant; return salvaged blood." },
      { step: "Proximal then distal anastomosis of a tube or bifurcated graft.", anaesthetic: "Use this time to load volume and correct acidosis, calcium and haemoglobin before the clamp comes off." },
      { step: "Sequential release of the clamps, one limb at a time.", anaesthetic: "Declamping causes hypotension: sudden fall in afterload, reactive hyperaemia and washout of acid, potassium and vasodilators from the ischaemic legs. Agree slow, staged release with the surgeon; give fluid and vasopressors; reclamp if pressure collapses." },
      { step: "Closure of the sac over the graft, retroperitoneum and abdomen; check leg and bowel perfusion.", anaesthetic: "Watch for colonic ischaemia, lower limb ischaemia (trash foot) and abdominal compartment syndrome after closure." },
    ],
    criticalMoments: [
      "Aortic cross-clamp — acute rise in afterload",
      "Declamping — hypotension and metabolic washout",
      "Major haemorrhage at any stage",
      "Closure — rising airway pressures or falling urine output may signal intra-abdominal hypertension",
    ],
    anaestheticNotes: [
      "Arterial line, central venous access, large-bore cannulae, cell salvage, warming and invasive monitoring; thoracic epidural is commonly used for analgesia if not contraindicated.",
      "Plan critical care admission after surgery.",
      "Renal protection: the main strategies are maintaining perfusion pressure and normovolaemia and minimising clamp time; no drug has proven renal protective benefit.",
      "Coronary disease is common in this group; perioperative myocardial injury is a leading cause of death.",
      "NICE NG156 recommends offering open repair (rather than EVAR) for unruptured infrarenal aneurysms unless there are anaesthetic or medical contraindications or a hostile abdomen — EVAR has lower early mortality but more long-term reintervention.",
    ],
    related: { label: "Vascular surgery anaesthesia", path: "/clinical/vascular-anaesthesia" },
    sources: ["NICE NG156", "ESVS 2024 AAA", "EVAR-1 2004"],
  },
  {
    id: "evar",
    name: "Endovascular aneurysm repair (EVAR)",
    aka: ["endovascular aortic repair", "stent graft"],
    specialty: "Vascular",
    summary: "A covered stent graft is passed from the femoral arteries and deployed inside the aneurysm to exclude it from the circulation.",
    position: "Supine on a radiolucent table with arms out of the X-ray field; often in an interventional suite or hybrid theatre.",
    bloodLossRisk: "Moderate",
    diagram: "evar",
    steps: [
      { step: "Femoral artery access — open cut-down or percutaneous puncture with closure devices.", anaesthetic: "Can be done under general, regional or local anaesthesia with sedation; the patient must lie flat and still for a long time." },
      { step: "Heparin, then guidewires and sheaths passed into the aorta; angiography to mark the renal arteries.", anaesthetic: "Iodinated contrast: protect the kidneys with adequate hydration and avoid nephrotoxins. Breath-holding on request improves imaging." },
      { step: "Deployment of the main body of the stent graft just below the renal arteries.", anaesthetic: "Some teams request brief hypotension or apnoea during precise deployment; agree this in advance." },
      { step: "Cannulation of the contralateral gate and deployment of the iliac limb(s).", anaesthetic: "Long periods with little stimulation then sudden balloon inflation; keep the patient still and comfortable." },
      { step: "Balloon moulding of the seal zones, then completion angiography looking for endoleak.", anaesthetic: "Balloon inflation in the aorta briefly occludes flow — a short afterload spike." },
      { step: "Sheath removal and femoral closure.", anaesthetic: "Check distal leg perfusion; groin haematoma or access-vessel injury can cause concealed bleeding." },
    ],
    criticalMoments: [
      "Precise graft deployment — stillness, sometimes breath-hold or controlled hypotension",
      "Rupture or access-vessel injury — sudden conversion to open repair is possible; be prepared for major haemorrhage",
      "Post-implantation syndrome (fever, raised inflammatory markers) in the first days",
    ],
    anaestheticNotes: [
      "EVAR-1 showed lower 30-day mortality with EVAR than open repair (1.7% vs 4.7%), but this early advantage did not translate into long-term survival benefit and EVAR needs lifelong surveillance.",
      "Radiation protection for staff; limited access to the patient once draped and under the C-arm.",
      "Spinal cord ischaemia is rare with infrarenal EVAR but a recognised risk with more extensive (thoracic or complex) stent grafts.",
      "Hypothermia is less of a problem than with open repair but procedures can be long.",
    ],
    related: { label: "Vascular surgery anaesthesia", path: "/clinical/vascular-anaesthesia" },
    sources: ["EVAR-1 2004", "NICE NG156", "ESVS 2024 AAA"],
  },
  {
    id: "ruptured-aaa",
    diagram: "ruptured-aaa",
    name: "Ruptured AAA repair (open or endovascular)",
    aka: ["rAAA", "ruptured aneurysm"],
    specialty: "Vascular",
    summary: "Emergency control of haemorrhage from a ruptured aneurysm, by open repair or emergency EVAR when anatomy allows.",
    position: "Supine; patient fully prepped and draped before induction.",
    bloodLossRisk: "High",
    steps: [
      { step: "Rapid CT (if stable enough) to decide open versus endovascular repair; activation of major haemorrhage protocol.", anaesthetic: "Permissive hypotension before control: accept a lower blood pressure if the patient is conscious, avoiding aggressive fluid that can worsen bleeding." },
      { step: "Patient prepped and draped awake; surgeon scrubbed and ready before induction.", anaesthetic: "Induction can cause cardiovascular collapse by losing sympathetic tone and the tamponading effect of abdominal muscle tone. Use cautious doses and have vasopressors and blood running. EVAR can be started under local anaesthesia." },
      { step: "Open: immediate laparotomy and supracoeliac or infrarenal aortic clamp. EVAR: aortic occlusion balloon if needed, then stent graft deployment.", anaesthetic: "Clamp or occlusion balloon restores proximal pressure; resuscitate with blood products in balanced ratios and correct coagulopathy, calcium and temperature." },
      { step: "Graft insertion as for elective repair; declamping.", anaesthetic: "Declamping after prolonged shock causes profound hypotension and acidosis." },
      { step: "Closure — sometimes left open or with a temporary closure.", anaesthetic: "High risk of abdominal compartment syndrome, especially after EVAR with a large retroperitoneal haematoma." },
    ],
    criticalMoments: [
      "Induction — collapse is common; induce only when the surgeon is ready",
      "Aortic control",
      "Massive transfusion and coagulopathy",
      "Abdominal compartment syndrome after surgery",
    ],
    anaestheticNotes: [
      "IMPROVE found no significant difference in 30-day mortality between an endovascular-first strategy and open repair (35.4% vs 37.4%); local anaesthesia for EVAR was associated with lower mortality in observational analyses within the trial.",
      "Tranexamic acid, point-of-care coagulation testing, cell salvage and warming.",
      "Plan critical care with renal replacement available.",
    ],
    related: { label: "Major haemorrhage and haemorrhagic shock", path: "/intensive-care/haemorrhagic-shock" },
    sources: ["IMPROVE 2014", "ESVS 2024 AAA"],
  },
  {
    id: "fem-pop-bypass",
    name: "Femoro-popliteal bypass",
    aka: ["fem-pop", "lower limb bypass", "infrainguinal bypass"],
    specialty: "Vascular",
    summary: "Bypass around an occluded superficial femoral artery from the common femoral to the popliteal artery, using vein (usually great saphenous) or a prosthetic graft.",
    position: "Supine, leg externally rotated and knee flexed on a support.",
    bloodLossRisk: "Moderate",
    diagram: "fem-pop",
    steps: [
      { step: "Groin incision to expose the common femoral artery and its branches.", anaesthetic: "Neuraxial or general anaesthesia are both used; check anticoagulant and antiplatelet timing before any neuraxial technique." },
      { step: "Exposure of the popliteal artery above or below the knee.", anaesthetic: "Long procedure: pressure-area care, warming." },
      { step: "Harvest of the great saphenous vein (or preparation of the vein in situ), or tunnelling of a prosthetic graft.", anaesthetic: "Vein harvest adds a long incision and time." },
      { step: "Heparin, clamping, then proximal and distal anastomoses.", anaesthetic: "Limb clamping has little systemic effect, unlike aortic clamping." },
      { step: "Release of clamps, completion imaging or Doppler, closure.", anaesthetic: "Graft patency depends on good flow — avoid hypotension and hypothermia after surgery." },
    ],
    criticalMoments: [
      "Neuraxial timing against antiplatelet and anticoagulant use",
      "Maintaining perfusion pressure after reperfusion for graft patency",
    ],
    anaestheticNotes: [
      "Patients usually have widespread arterial disease, diabetes, renal impairment and often frailty.",
      "BASIL-2 found that, for chronic limb-threatening ischaemia needing infrapopliteal revascularisation, a best-endovascular-first strategy gave better amputation-free survival than vein bypass first — so surgical bypass is increasingly selected case by case.",
      "Graft failure in the first hours may need urgent return to theatre.",
    ],
    related: { label: "Vascular surgery anaesthesia", path: "/clinical/vascular-anaesthesia" },
    sources: ["GVG CLTI 2019", "BASIL-2 2023"],
  },
  {
    id: "aorto-bifemoral-bypass",
    diagram: "aorto-bifem",
    name: "Aorto-bifemoral bypass",
    aka: ["aortobifemoral graft"],
    specialty: "Vascular",
    summary: "A bifurcated graft from the infrarenal aorta to both femoral arteries for extensive aorto-iliac occlusive disease.",
    position: "Supine with both groins and abdomen prepped.",
    bloodLossRisk: "High",
    steps: [
      { step: "Bilateral groin incisions to expose the femoral arteries.", anaesthetic: "Major open aortic surgery: invasive monitoring, warming, cell salvage, epidural if appropriate." },
      { step: "Laparotomy (or retroperitoneal approach) and exposure of the infrarenal aorta.", anaesthetic: "As for open AAA: bowel handling, heat and fluid losses." },
      { step: "Tunnelling of the graft limbs from abdomen to groins behind the inguinal ligament.", anaesthetic: "Tunnelling can injure veins and cause bleeding." },
      { step: "Heparin, aortic cross-clamp and proximal anastomosis, then femoral anastomoses.", anaesthetic: "Clamp effects are often smaller than in aneurysm repair because collateral vessels have developed around chronic occlusion — but still anticipate them." },
      { step: "Staged declamping of each limb; closure.", anaesthetic: "Declamping hypotension and reperfusion of two limbs; communicate with the surgeon." },
    ],
    criticalMoments: ["Aortic cross-clamp", "Staged declamping", "Bleeding from tunnelling or anastomoses"],
    anaestheticNotes: [
      "Similar planning to open AAA repair including critical care admission.",
      "Endovascular aorto-iliac stenting is now often preferred where anatomy allows.",
    ],
    related: { label: "Vascular surgery anaesthesia", path: "/clinical/vascular-anaesthesia" },
    sources: ["GVG CLTI 2019"],
  },
  {
    id: "lower-limb-amputation",
    diagram: "amputation",
    name: "Major lower limb amputation",
    aka: ["below-knee amputation", "BKA", "above-knee amputation", "AKA"],
    specialty: "Vascular",
    summary: "Amputation below or above the knee for unsalvageable ischaemia, infection or necrosis.",
    position: "Supine; tourniquet sometimes used for below-knee amputation.",
    bloodLossRisk: "Moderate",
    steps: [
      { step: "Skin flaps marked and incised (e.g. long posterior flap for below-knee).", anaesthetic: "Patients are often frail, septic or diabetic with poor reserve; consider neuraxial or regional anaesthesia, timed against anticoagulants." },
      { step: "Muscle division and ligation of the major vessels.", anaesthetic: "Bleeding is usually controlled but can be significant in above-knee amputation." },
      { step: "Nerve division — nerves are pulled down and cut cleanly so they retract.", anaesthetic: "A perineural catheter placed by the surgeon on the sciatic or tibial nerve at this step can provide prolonged analgesia." },
      { step: "Bone section with a saw and bevelling of the bone end.", anaesthetic: "Highly stimulating; deepen anaesthesia or supplement the block." },
      { step: "Myoplasty or myodesis, flap closure and dressing.", anaesthetic: "Plan multimodal analgesia; pain before surgery and poorly controlled acute pain are associated with phantom and stump pain." },
    ],
    criticalMoments: ["Bone section — strong stimulus", "Sepsis-related haemodynamic instability"],
    anaestheticNotes: [
      "Perineural catheters, nerve blocks and neuraxial techniques are all used; no technique reliably prevents phantom limb pain.",
      "High perioperative mortality reflects the underlying disease: treat it as high-risk surgery.",
    ],
    sources: ["GVG CLTI 2019"],
  },
  {
    id: "av-fistula",
    diagram: "av-fistula",
    name: "Arteriovenous fistula formation",
    aka: ["AVF", "radiocephalic fistula", "brachiocephalic fistula"],
    specialty: "Vascular",
    summary: "Surgical joining of an artery to a vein in the arm to create haemodialysis access.",
    position: "Supine with the arm on an arm board.",
    bloodLossRisk: "Low",
    steps: [
      { step: "Incision at the wrist (radiocephalic) or elbow (brachiocephalic).", anaesthetic: "Commonly done under brachial plexus block; regional anaesthesia causes venous dilatation, which may help the surgeon." },
      { step: "Mobilisation of the vein and artery.", anaesthetic: "Avoid cannulas, cuffs and blood tests on the operative arm — and preserve veins in the other arm for future access." },
      { step: "Heparin, clamping, arteriotomy and venotomy, and anastomosis.", anaesthetic: "Short procedure; the patient must keep the arm still." },
      { step: "Release, check for a thrill, closure.", anaesthetic: "Hypotension after surgery risks early thrombosis of the fistula." },
    ],
    criticalMoments: ["Avoiding hypotension for fistula patency"],
    anaestheticNotes: [
      "Patients have end-stage kidney disease: check potassium, timing of last dialysis, fluid status and drug dosing.",
      "Avoid suxamethonium if potassium is raised; drugs cleared by the kidney accumulate.",
    ],
  },

  // ─────────────────────── Cardiothoracic ───────────────────────
  {
    id: "cabg",
    diagram: "cabg",
    name: "Coronary artery bypass grafting (on-pump)",
    aka: ["CABG", "heart bypass"],
    specialty: "Cardiothoracic",
    summary: "Grafting of arterial (internal mammary) and venous conduits to the coronary arteries beyond blockages, usually on cardiopulmonary bypass with an arrested heart.",
    position: "Supine, arms tucked; median sternotomy; leg prepped for vein harvest.",
    bloodLossRisk: "High",
    steps: [
      { step: "Median sternotomy while the saphenous vein or radial artery is harvested.", anaesthetic: "Sternotomy is very stimulating; deflate the lungs during the saw cut to avoid lung injury. Antifibrinolytic is usually started." },
      { step: "Harvest of the left internal mammary artery from the chest wall.", anaesthetic: "Retractor on one side of the chest can impair ventilation and cause arrhythmias." },
      { step: "Full heparinisation, then aortic and right atrial cannulation.", anaesthetic: "Confirm adequate anticoagulation (activated clotting time) before cannulation; keep systolic pressure low during aortic cannulation to reduce dissection risk." },
      { step: "Cardiopulmonary bypass started, aorta cross-clamped and cardioplegia given to arrest the heart.", anaesthetic: "Stop ventilation and volatile delivery via the ventilator once on full bypass (anaesthesia continues via the bypass circuit or intravenously); monitor depth of anaesthesia." },
      { step: "Distal anastomoses to the coronary arteries, then proximal vein graft anastomoses to the aorta.", anaesthetic: "Management of temperature, blood gases and glucose is shared with the perfusionist." },
      { step: "Rewarming, de-airing, cross-clamp removal, and weaning from bypass.", anaesthetic: "Restart ventilation; pacing, inotropes or vasopressors may be needed; use transoesophageal echo to assess function." },
      { step: "Protamine to reverse heparin, decannulation, haemostasis, drains, sternal wires and closure.", anaesthetic: "Protamine can cause hypotension, pulmonary hypertension or anaphylaxis — give slowly. Correct coagulopathy guided by point-of-care tests." },
    ],
    criticalMoments: ["Sternotomy", "Cannulation", "Going on and coming off bypass", "Protamine reversal", "Post-bypass bleeding"],
    anaestheticNotes: [
      "Arterial line before induction, central venous access, and transoesophageal echocardiography.",
      "Careful induction: maintain coronary perfusion pressure and avoid tachycardia.",
      "ERAS Cardiac Society guidance supports multimodal opioid-sparing analgesia, glycaemic control and early extubation pathways.",
      "Awareness risk during bypass; use depth-of-anaesthesia monitoring when using total intravenous anaesthesia.",
    ],
    related: { label: "Cardiac surgery anaesthesia", path: "/clinical/cardiothoracic" },
    sources: ["ERAS Cardiac 2019"],
  },
  {
    id: "aortic-valve-replacement",
    diagram: "avr",
    name: "Aortic valve replacement (surgical)",
    aka: ["AVR", "SAVR"],
    specialty: "Cardiothoracic",
    summary: "Excision of a diseased aortic valve and implantation of a mechanical or biological prosthesis on cardiopulmonary bypass.",
    position: "Supine, sternotomy (full or mini).",
    bloodLossRisk: "High",
    steps: [
      { step: "Sternotomy, heparin, cannulation and bypass as for CABG.", anaesthetic: "In aortic stenosis, induction is high risk: maintain sinus rhythm, a normal-to-slow heart rate, preload and systemic vascular resistance. Have a vasopressor (e.g. metaraminol or phenylephrine) drawn up." },
      { step: "Cross-clamp, cardioplegia, aortotomy.", anaesthetic: "Cardioplegia may be given directly into the coronary ostia because the valve is incompetent or about to be removed." },
      { step: "Excision of the valve and removal of calcium from the annulus.", anaesthetic: "Calcium debris can embolise." },
      { step: "Sizing and sewing in the prosthesis, closure of the aorta, de-airing.", anaesthetic: "Transoesophageal echo checks valve function, leak and residual air." },
      { step: "Weaning from bypass, protamine, closure.", anaesthetic: "The hypertrophied left ventricle is stiff and sensitive to under-filling; conduction block may need pacing." },
    ],
    criticalMoments: ["Induction in severe aortic stenosis", "Weaning from bypass", "Heart block after surgery"],
    anaestheticNotes: [
      "Hypotension in severe aortic stenosis reduces coronary perfusion and can spiral into arrest; treat promptly with vasopressor rather than waiting.",
      "Transcatheter (TAVI) is an alternative for many patients, often under sedation.",
    ],
    related: { label: "Cardiac surgery anaesthesia", path: "/clinical/cardiothoracic" },
    sources: ["ERAS Cardiac 2019"],
  },
  {
    id: "vats-lobectomy",
    diagram: "vats",
    name: "VATS lobectomy",
    aka: ["video-assisted thoracoscopic lobectomy", "lung resection"],
    specialty: "Cardiothoracic",
    summary: "Removal of a lung lobe (usually for cancer) through small ports with a camera.",
    position: "Lateral decubitus, operative side up, table flexed to open the rib spaces.",
    bloodLossRisk: "Moderate",
    steps: [
      { step: "Port insertion and deflation of the operative lung.", anaesthetic: "Requires one-lung ventilation via a double-lumen tube or bronchial blocker; confirm position with a fibreoptic scope after turning." },
      { step: "Division of the pulmonary vein, artery branches and bronchus with staplers.", anaesthetic: "Hypoxaemia during one-lung ventilation: check tube position, increase FiO₂, recruit and add PEEP to the ventilated lung, CPAP to the operative lung if the surgeon allows. Injury to a pulmonary artery branch can cause sudden major bleeding and conversion to thoracotomy." },
      { step: "Fissure completion and lymph node sampling.", anaesthetic: "Lung-protective ventilation of the dependent lung." },
      { step: "Specimen removed in a bag; leak test with the lung re-inflated under saline.", anaesthetic: "Re-inflate the lung gently on request, manually or with a set pressure." },
      { step: "Chest drain and port closure.", anaesthetic: "Paravertebral or erector spinae block (or surgically placed catheters) for analgesia; aim for early extubation and mobilisation." },
    ],
    criticalMoments: ["Lung isolation and hypoxaemia during one-lung ventilation", "Pulmonary vessel injury", "Air leak test"],
    anaestheticNotes: [
      "ERAS thoracic guidance supports regional analgesia (paravertebral preferred to epidural for minimally invasive surgery), avoiding fluid overload and early mobilisation.",
      "Preoperative lung function and predicted postoperative values guide risk.",
    ],
    related: { label: "Thoracic anaesthesia", path: "/clinical/cardiothoracic" },
    sources: ["ERAS Thoracic 2019"],
  },

  // ─────────────────────── General & GI ───────────────────────
  {
    id: "laparoscopic-cholecystectomy",
    diagram: "lap-chole",
    name: "Laparoscopic cholecystectomy",
    aka: ["lap chole", "gallbladder removal"],
    specialty: "General & GI",
    summary: "Removal of the gallbladder through laparoscopic ports.",
    position: "Supine, reverse Trendelenburg and tilted left side down.",
    bloodLossRisk: "Low",
    steps: [
      { step: "Umbilical port and creation of pneumoperitoneum with CO₂.", anaesthetic: "Insufflation can cause vagal bradycardia (even asystole) and reduced venous return; rising end-tidal CO₂ from absorption needs increased ventilation." },
      { step: "Further ports; head-up tilt to expose the gallbladder.", anaesthetic: "Head-up reduces venous return and blood pressure." },
      { step: "Dissection of Calot's triangle to identify the cystic duct and artery (critical view of safety).", anaesthetic: "Good muscle relaxation helps the surgeon at low insufflation pressures." },
      { step: "Clipping and division of cystic duct and artery; dissection of the gallbladder from the liver bed.", anaesthetic: "Bleeding from the liver bed is usually minor." },
      { step: "Removal of the gallbladder through a port; desufflation and closure.", anaesthetic: "Shoulder-tip pain from residual CO₂; PONV prophylaxis and multimodal analgesia; usually day case." },
    ],
    criticalMoments: ["Insufflation — bradycardia, hypotension, CO₂ rise", "Rare: CO₂ embolism (sudden fall in end-tidal CO₂ and collapse)"],
    anaestheticNotes: [
      "Moderate to high PONV risk — give at least two antiemetics where risk factors are present.",
      "Local anaesthetic port infiltration reduces opioid need.",
    ],
    related: { label: "General and colorectal surgery", path: "/clinical/general-colorectal-surgery" },
  },
  {
    id: "laparoscopic-anterior-resection",
    diagram: "anterior-resection",
    name: "Laparoscopic anterior resection",
    aka: ["rectal resection", "TME", "total mesorectal excision"],
    specialty: "General & GI",
    summary: "Removal of the rectum and its mesorectum (often for cancer) with a colorectal anastomosis, sometimes protected by a loop ileostomy.",
    position: "Lithotomy (Lloyd-Davies) with steep Trendelenburg, arms tucked.",
    bloodLossRisk: "Moderate",
    steps: [
      { step: "Ports, pneumoperitoneum and steep head-down tilt.", anaesthetic: "Steep Trendelenburg plus pneumoperitoneum raises airway pressures and reduces FRC; secure the patient against sliding, protect eyes and pressure areas, and check tube position after tilting." },
      { step: "Ligation of the inferior mesenteric vessels; mobilisation of the left colon and splenic flexure.", anaesthetic: "Long procedure in lithotomy — calf pressure risks compartment syndrome; reposition legs periodically where possible." },
      { step: "Total mesorectal excision down into the pelvis.", anaesthetic: "Presacral venous bleeding can be sudden and severe." },
      { step: "Division of the rectum with a stapler and extraction of the specimen through a small incision.", anaesthetic: "Extraction site incision increases pain." },
      { step: "Stapled colorectal anastomosis; leak test; often a defunctioning loop ileostomy.", anaesthetic: "Maintain perfusion and avoid fluid overload or hypovolaemia; anastomotic perfusion depends on cardiac output." },
    ],
    criticalMoments: ["Steep head-down positioning", "Pelvic bleeding", "Lower limb compartment syndrome after long lithotomy"],
    anaestheticNotes: [
      "ERAS colorectal guidance: avoid prolonged fasting, carbohydrate loading, multimodal opioid-sparing analgesia (spinal opioid or abdominal wall blocks for laparoscopy), goal-directed fluid where appropriate, early feeding and mobilisation.",
      "Facial and airway oedema after prolonged head-down tilt — check for a cuff leak if concerned before extubation.",
    ],
    related: { label: "General and colorectal surgery", path: "/clinical/general-colorectal-surgery" },
    sources: ["ERAS Colorectal 2018"],
  },
  {
    id: "emergency-laparotomy",
    diagram: "laparotomy",
    name: "Emergency laparotomy",
    aka: ["laparotomy for perforation", "laparotomy for obstruction"],
    specialty: "General & GI",
    summary: "Open abdominal exploration for perforation, obstruction, ischaemia or bleeding, with source control.",
    position: "Supine, midline incision.",
    bloodLossRisk: "Moderate",
    steps: [
      { step: "Rapid sequence induction (risk of aspiration with obstruction or ileus).", anaesthetic: "Decompress the stomach with a nasogastric tube before induction where possible; expect hypotension in sepsis or hypovolaemia." },
      { step: "Midline laparotomy and full exploration.", anaesthetic: "Release of a tense abdomen can cause sudden hypotension." },
      { step: "Source control — resection of perforated or ischaemic bowel, adhesiolysis, washout.", anaesthetic: "Sepsis management: antibiotics given, vasopressors, lactate-guided resuscitation. Bowel handling and endotoxin release may cause instability." },
      { step: "Anastomosis, stoma, or damage-control surgery with a planned return to theatre.", anaesthetic: "Physiological derangement (acidosis, hypothermia, coagulopathy) may make damage control the safer choice — share this information with the surgeon." },
      { step: "Closure (or temporary abdominal closure).", anaesthetic: "Decide postoperative destination by assessed risk; high-risk patients should go to critical care." },
    ],
    criticalMoments: ["Induction — aspiration and cardiovascular collapse", "Opening a distended abdomen", "Ongoing sepsis"],
    anaestheticNotes: [
      "Formal risk assessment (e.g. NELA or P-POSSUM) before surgery, consultant anaesthetist and surgeon present for high-risk cases.",
      "ERAS emergency laparotomy guidance covers timely source control, goal-directed haemodynamics and early critical care for high-risk patients.",
    ],
    related: { label: "Emergency surgery", path: "/clinical/emergency-surgery" },
    sources: ["ERAS Emergency Laparotomy 2021"],
  },
  {
    id: "whipple",
    diagram: "whipple",
    name: "Pancreaticoduodenectomy (Whipple procedure)",
    aka: ["Whipple", "PD"],
    specialty: "General & GI",
    summary: "Removal of the pancreatic head, duodenum, gallbladder and bile duct (and sometimes part of the stomach) with three reconstructions: pancreatic, biliary and gastric/duodenal.",
    position: "Supine, arms out; upper midline or rooftop incision.",
    bloodLossRisk: "High",
    steps: [
      { step: "Laparotomy and assessment of resectability (looking for metastases and vascular involvement).", anaesthetic: "Long operation (often many hours): warming, pressure areas, arterial line, central access as required." },
      { step: "Kocher manoeuvre, cholecystectomy and division of the bile duct.", anaesthetic: "Obstructive jaundice affects coagulation (vitamin K) and kidney function." },
      { step: "Division of the stomach or duodenum and jejunum; dissection of the pancreatic head off the portal and superior mesenteric veins.", anaesthetic: "The highest-risk point for major venous bleeding." },
      { step: "Pancreatic neck transection and removal of the specimen.", anaesthetic: "Monitor glucose." },
      { step: "Reconstruction: pancreaticojejunostomy (or gastrostomy), hepaticojejunostomy and gastro/duodenojejunostomy.", anaesthetic: "Avoid excessive fluids, which may contribute to anastomotic oedema; maintain perfusion." },
    ],
    criticalMoments: ["Dissection off the portal and superior mesenteric veins — bleeding", "Prolonged surgery and heat loss"],
    anaestheticNotes: [
      "ERAS pancreatoduodenectomy guidance covers nutrition, avoidance of fluid overload, and epidural or alternative analgesia.",
      "Pancreatic leak (fistula) is the major surgical complication.",
    ],
    sources: ["ERAS Pancreatoduodenectomy 2020"],
  },
  {
    id: "ivor-lewis-oesophagectomy",
    name: "Ivor Lewis oesophagectomy",
    aka: ["two-stage oesophagectomy", "oesophagectomy"],
    specialty: "General & GI",
    summary: "Two-stage removal of the lower oesophagus: abdominal mobilisation of the stomach, then right thoracotomy (or thoracoscopy) for oesophageal resection and an intrathoracic anastomosis.",
    position: "Supine for the abdominal stage, then left lateral (right side up) for the chest stage.",
    bloodLossRisk: "High",
    diagram: "ivor-lewis",
    steps: [
      { step: "Abdominal stage (open or laparoscopic): mobilisation of the stomach on the right gastroepiploic artery, lymphadenectomy, pyloric drainage and feeding jejunostomy.", anaesthetic: "Double-lumen tube placed at the start for the later chest stage; thoracic epidural or alternative regional analgesia." },
      { step: "Turn to the lateral position.", anaesthetic: "Recheck double-lumen tube position and all lines after the turn." },
      { step: "Right thoracotomy and one-lung ventilation; mobilisation of the oesophagus and division of the azygos vein.", anaesthetic: "One-lung ventilation for a long period; lung-protective strategy. Compression of the heart and great vessels causes hypotension and arrhythmia." },
      { step: "Gastric conduit pulled into the chest; oesophagogastric anastomosis.", anaesthetic: "Conduit perfusion depends on systemic blood pressure and cardiac output; avoid prolonged hypotension and excessive vasoconstriction — balance fluids and vasopressors with the surgeon." },
      { step: "Chest drains and closure.", anaesthetic: "Aim for extubation at the end if possible; avoid aspiration (the conduit has no sphincter) — keep head up after surgery." },
    ],
    criticalMoments: ["Repositioning and tube displacement", "Prolonged one-lung ventilation", "Conduit perfusion", "Respiratory complications after surgery"],
    anaestheticNotes: [
      "ERAS oesophagectomy guidance covers prehabilitation, nutrition, epidural analgesia, goal-directed fluids, and early extubation and mobilisation.",
      "Pneumonia and anastomotic leak are the leading complications; new atrial fibrillation may be an early warning sign of leak.",
    ],
    sources: ["ERAS Oesophagectomy 2019"],
  },

  // ─────────────────── Orthopaedic & Spine ───────────────────
  {
    id: "hip-hemiarthroplasty",
    diagram: "hip-hemi",
    name: "Hemiarthroplasty for hip fracture",
    aka: ["NOF", "fractured neck of femur", "cemented hemiarthroplasty"],
    specialty: "Orthopaedic & Spine",
    summary: "Replacement of the femoral head (but not the acetabulum) for a displaced intracapsular hip fracture, usually with a cemented stem.",
    position: "Lateral, fractured side up (or supine for some approaches).",
    bloodLossRisk: "Moderate",
    steps: [
      { step: "Lateral or posterior approach to the hip capsule.", anaesthetic: "Spinal or general anaesthesia; a femoral nerve or fascia iliaca block helps positioning and analgesia." },
      { step: "Capsulotomy and removal of the femoral head; neck cut.", anaesthetic: "Move the patient carefully — frail skin and bones." },
      { step: "Preparation of the femoral canal (reaming/broaching), and washing and drying it.", anaesthetic: "The surgeon should announce when cement is about to be inserted." },
      { step: "Cement inserted retrograde with a gun, then the stem.", anaesthetic: "Bone cement implantation syndrome (hypoxia, hypotension, arrhythmia, arrest) may follow cementing. Watch closely, be ready with vasopressors and oxygen, and optimise volume beforehand." },
      { step: "Head attached, joint reduced, closure.", anaesthetic: "Postoperative delirium prevention: avoid excess sedation and anticholinergics; treat pain." },
    ],
    criticalMoments: ["Cement insertion — bone cement implantation syndrome"],
    anaestheticNotes: [
      "The hip fracture guideline recommends surgery on the day of or day after admission, with a block for analgesia and spinal or general anaesthesia chosen by individual factors.",
      "The safety guideline on cemented hemiarthroplasty describes team roles: identify high-risk patients, surgeon announces cementing, anaesthetist watches for early signs.",
    ],
    related: { label: "Orthopaedic anaesthesia", path: "/clinical/orthopaedic-anaesthesia" },
    sources: ["AoA Hip Fracture 2020", "AAGBI BCIS 2015"],
  },
  {
    id: "total-hip-replacement",
    diagram: "thr",
    name: "Total hip replacement",
    aka: ["THR", "THA", "hip arthroplasty"],
    specialty: "Orthopaedic & Spine",
    summary: "Replacement of the acetabulum and femoral head for arthritis, with cemented or uncemented components.",
    position: "Lateral (posterior or lateral approach) or supine (anterior approach).",
    bloodLossRisk: "Moderate",
    steps: [
      { step: "Approach, capsulotomy, dislocation and resection of the femoral head.", anaesthetic: "Spinal anaesthesia (± sedation) is common; tranexamic acid reduces blood loss unless contraindicated." },
      { step: "Reaming of the acetabulum and insertion of the acetabular cup.", anaesthetic: "Bleeding mainly from bone." },
      { step: "Preparation of the femoral canal and insertion of the femoral stem (cemented or press-fit).", anaesthetic: "Cemented components carry a risk of cement reaction, as for hemiarthroplasty." },
      { step: "Trial reduction, final components, closure.", anaesthetic: "Early mobilisation pathways rely on good analgesia without dense motor block." },
    ],
    criticalMoments: ["Femoral stem cementing (if cemented)"],
    anaestheticNotes: ["Local infiltration analgesia and multimodal analgesia support same-day or next-day mobilisation."],
    related: { label: "Orthopaedic anaesthesia", path: "/clinical/orthopaedic-anaesthesia" },
    sources: ["AAGBI BCIS 2015"],
  },
  {
    id: "total-knee-replacement",
    diagram: "tkr",
    name: "Total knee replacement",
    aka: ["TKR", "TKA", "knee arthroplasty"],
    specialty: "Orthopaedic & Spine",
    summary: "Resurfacing of the femur, tibia (± patella) with metal and polyethylene components, usually under a tourniquet.",
    position: "Supine, leg on a foot rest; thigh tourniquet.",
    bloodLossRisk: "Low",
    steps: [
      { step: "Tourniquet inflation and medial parapatellar approach.", anaesthetic: "Document tourniquet time; tourniquet pain can break through a spinal over time." },
      { step: "Bone cuts with jigs, ligament balancing.", anaesthetic: "Stimulating but well covered by neuraxial anaesthesia." },
      { step: "Trial components then cemented implants.", anaesthetic: "Cement reactions are less common than in hip surgery while the tourniquet is up." },
      { step: "Local infiltration, closure, tourniquet deflation.", anaesthetic: "Deflation can cause transient hypotension and a rise in end-tidal CO₂ and potassium from washout." },
    ],
    criticalMoments: ["Tourniquet deflation"],
    anaestheticNotes: ["Adductor canal block and/or local infiltration analgesia provide analgesia while preserving quadriceps strength for early mobilisation."],
    related: { label: "Orthopaedic anaesthesia", path: "/clinical/orthopaedic-anaesthesia" },
  },
  {
    id: "posterior-spinal-fusion",
    diagram: "spine",
    name: "Posterior lumbar spinal fusion",
    aka: ["spinal fusion", "instrumented fusion", "pedicle screws"],
    specialty: "Orthopaedic & Spine",
    summary: "Decompression and fixation of lumbar vertebrae with pedicle screws and rods, often with bone graft or interbody cages.",
    position: "Prone on a frame or Jackson table, head in a padded headrest.",
    bloodLossRisk: "High",
    steps: [
      { step: "Turning the patient prone onto the frame.", anaesthetic: "Plan the turn with the team: secure tube and lines, keep the abdomen free (reduces venous bleeding), keep the head neutral, avoid any pressure on the eyes." },
      { step: "Midline incision and subperiosteal muscle stripping to expose the posterior elements.", anaesthetic: "Bleeding from muscle and bone; tranexamic acid and cell salvage for multilevel surgery." },
      { step: "Pedicle screw insertion under imaging or navigation.", anaesthetic: "Neuromonitoring (if used) needs a compatible anaesthetic, usually total intravenous anaesthesia without ongoing muscle relaxant." },
      { step: "Decompression (laminectomy) and interbody cage placement if planned.", anaesthetic: "Dural tear or nerve root injury may occur." },
      { step: "Rod placement, bone graft, closure.", anaesthetic: "Turn supine; assess vision and neurology early." },
    ],
    criticalMoments: ["Prone positioning", "Blood loss in multilevel surgery", "Neuromonitoring alerts"],
    anaestheticNotes: [
      "The ASA practice advisory on perioperative visual loss identifies prolonged prone surgery with large blood loss as higher risk; keep the head at or above heart level, avoid direct pressure on the eyes, and consider staging very long procedures.",
      "Multimodal analgesia; ketamine, intrathecal morphine or erector spinae blocks are used in some centres.",
    ],
    sources: ["ASA Visual Loss 2019"],
  },

  // ─────────────────────── Neurosurgery ───────────────────────
  {
    id: "craniotomy-tumour",
    diagram: "craniotomy",
    name: "Craniotomy for supratentorial tumour",
    aka: ["craniotomy", "brain tumour resection"],
    specialty: "Neurosurgery",
    summary: "Opening of the skull to resect a brain tumour, often with neuronavigation, then replacement of the bone flap.",
    position: "Supine (or lateral/prone depending on site), head fixed in pins, head slightly up.",
    bloodLossRisk: "Moderate",
    steps: [
      { step: "Application of the head pins.", anaesthetic: "Pin insertion is intensely stimulating — give a bolus of opioid or anaesthetic, or local anaesthetic at pin sites, to avoid a hypertensive surge." },
      { step: "Scalp incision, burr holes and raising of the bone flap.", anaesthetic: "Scalp block reduces stimulation; venous air embolism is possible, particularly with head-up positions." },
      { step: "Opening of the dura.", anaesthetic: "A tight brain needs brain relaxation: head up, normocapnia or mild hypocapnia briefly, avoid hypotonic fluids, osmotherapy (mannitol or hypertonic saline) on request." },
      { step: "Tumour resection with microscope and navigation.", anaesthetic: "Keep the patient completely still; maintain cerebral perfusion pressure." },
      { step: "Haemostasis, dural closure, bone flap replacement and scalp closure.", anaesthetic: "Smooth emergence without coughing or hypertension to allow early neurological assessment." },
    ],
    criticalMoments: ["Head pinning", "Dural opening — brain swelling", "Emergence"],
    anaestheticNotes: [
      "Awake craniotomy is used for tumours near speech or motor areas — needs a cooperative patient and a defined plan for the awake phase.",
      "Seizure prophylaxis and steroids follow the neurosurgical plan.",
    ],
    related: { label: "Neuroanaesthesia", path: "/clinical/neuroanaesthesia" },
  },

  // ───────────────────────── Urology ─────────────────────────
  {
    id: "turp",
    diagram: "turp",
    name: "Transurethral resection of the prostate",
    aka: ["TURP"],
    specialty: "Urology",
    summary: "Endoscopic resection of obstructing prostate tissue through a resectoscope, with continuous irrigation.",
    position: "Lithotomy.",
    bloodLossRisk: "Moderate",
    steps: [
      { step: "Cystoscopy and insertion of the resectoscope.", anaesthetic: "Spinal anaesthesia is common and lets you detect early TURP syndrome (confusion, restlessness, nausea) in an awake patient." },
      { step: "Resection of the prostate in chips with a diathermy loop, with continuous irrigation.", anaesthetic: "With monopolar resection, hypotonic glycine irrigation can be absorbed through opened venous sinuses — risk of fluid overload, hyponatraemia and glycine toxicity (visual disturbance). Bipolar resection uses saline, which avoids hyponatraemia but can still cause fluid overload. Track resection time and irrigation balance." },
      { step: "Haemostasis with diathermy.", anaesthetic: "Blood loss is hard to estimate because it mixes with irrigation fluid." },
      { step: "Removal of chips and insertion of a three-way catheter for irrigation.", anaesthetic: "Bladder perforation can cause abdominal or shoulder pain in the awake patient." },
    ],
    criticalMoments: ["Absorption of irrigation fluid (TURP syndrome)", "Bladder perforation", "Hidden blood loss"],
    anaestheticNotes: ["Check sodium if the resection is long, absorption is suspected, or the patient becomes confused, bradycardic or hypertensive."],
    related: { label: "Urology anaesthesia", path: "/clinical/urological-anaesthesia" },
  },
  {
    id: "robotic-prostatectomy",
    diagram: "robotic-prostate",
    name: "Robotic-assisted radical prostatectomy",
    aka: ["RARP", "robotic prostatectomy"],
    specialty: "Urology",
    summary: "Removal of the prostate and seminal vesicles for cancer using a robotic platform, with vesico-urethral anastomosis.",
    position: "Lithotomy with steep Trendelenburg; robot docked between the legs.",
    bloodLossRisk: "Moderate",
    steps: [
      { step: "Ports, pneumoperitoneum, steep head-down and docking of the robot.", anaesthetic: "Once docked, the table and patient must not move — ensure full neuromuscular block and no coughing. Access to the patient is very limited." },
      { step: "Bladder dropped, dissection of the prostate, ligation of the dorsal venous complex.", anaesthetic: "Bleeding is usually controlled by pneumoperitoneum pressure but can increase on desufflation." },
      { step: "Removal of prostate and seminal vesicles (± lymph node dissection).", anaesthetic: "Restrict fluids during the head-down phase to limit facial and airway oedema, as agreed locally." },
      { step: "Vesico-urethral anastomosis, undocking and specimen removal.", anaesthetic: "In an emergency, undocking takes time — rehearse the steps." },
    ],
    criticalMoments: ["Steep head-down positioning", "Patient movement while docked", "Emergency undocking"],
    anaestheticNotes: ["See the robotic surgery note for ventilation, positioning and eye-protection details."],
    related: { label: "Robotic surgery anaesthesia", path: "/notes/anaesthesia-for-robotic-surgery-guide" },
  },

  // ─────────────────── ENT & Head and Neck ───────────────────
  {
    id: "thyroidectomy",
    diagram: "thyroid",
    name: "Thyroidectomy",
    aka: ["total thyroidectomy", "hemithyroidectomy"],
    specialty: "ENT & Head and Neck",
    summary: "Removal of all or part of the thyroid gland through a transverse neck incision, preserving the recurrent laryngeal nerves and parathyroid glands.",
    position: "Supine, neck extended with a shoulder roll, head ring.",
    bloodLossRisk: "Low",
    steps: [
      { step: "Collar incision and raising of subplatysmal flaps; separation of the strap muscles.", anaesthetic: "Check the airway: a large or retrosternal goitre may compress or deviate the trachea — review imaging and plan intubation accordingly." },
      { step: "Ligation of the superior thyroid pole vessels, protecting the external branch of the superior laryngeal nerve.", anaesthetic: "Nerve monitoring tubes (with surface electrodes) need correct depth and minimal or no muscle relaxant after intubation." },
      { step: "Identification of the recurrent laryngeal nerve and parathyroid glands; division of the inferior vessels.", anaesthetic: "Keep the patient still; the surgeon may stimulate the nerve." },
      { step: "Removal of the lobe(s), haemostasis (often with a Valsalva test), closure.", anaesthetic: "A Valsalva manoeuvre on request shows hidden bleeding points." },
    ],
    criticalMoments: ["Airway management with a large goitre", "Emergence and extubation", "Post-operative haematoma — airway compression"],
    anaestheticNotes: [
      "DAS extubation guidance classes this as at-risk extubation; plan for a smooth wake-up and consider checking vocal cord movement.",
      "Neck haematoma after surgery: remove skin sutures and clips and open the wound at the bedside before re-intubation if the airway is compromised.",
      "Bilateral recurrent laryngeal nerve injury causes stridor after extubation; hypocalcaemia from parathyroid injury appears later.",
    ],
    related: { label: "ENT and head and neck anaesthesia", path: "/clinical/ent-anaesthesia" },
    sources: ["DAS Extubation 2012"],
  },
  {
    id: "tonsillectomy",
    diagram: "tonsil",
    name: "Tonsillectomy",
    aka: ["tonsils"],
    specialty: "ENT & Head and Neck",
    summary: "Removal of the palatine tonsils, commonly in children for recurrent tonsillitis or obstructive sleep-disordered breathing.",
    position: "Supine with shoulder roll; mouth gag (e.g. Boyle-Davis) placed by the surgeon.",
    bloodLossRisk: "Low",
    steps: [
      { step: "Insertion of the mouth gag.", anaesthetic: "The gag can kink, compress or dislodge the tube or laryngeal mask; check ventilation after it is opened and suspended." },
      { step: "Dissection of the tonsils (cold steel, diathermy or coblation).", anaesthetic: "Shared airway: blood can track to the larynx; keep the tube cuff sealed or the LMA well positioned." },
      { step: "Haemostasis and suction of the pharynx.", anaesthetic: "Check the airway and stomach for blood before waking." },
      { step: "Removal of the gag.", anaesthetic: "Extubate either deep or fully awake in the recovery position with the head down, according to local practice." },
    ],
    criticalMoments: ["Gag insertion — tube obstruction or displacement", "Extubation with blood in the airway", "Post-tonsillectomy bleeding"],
    anaestheticNotes: [
      "Children with obstructive sleep apnoea are more sensitive to opioids; use multimodal analgesia and reduced opioid doses.",
      "Return to theatre for bleeding: treat as a full stomach (swallowed blood), the patient may be hypovolaemic, and visualisation may be difficult.",
    ],
    related: { label: "ENT and head and neck anaesthesia", path: "/clinical/ent-anaesthesia" },
  },

  // ───────────────────────── Obstetric ─────────────────────────
  {
    id: "caesarean-section",
    diagram: "caesarean",
    name: "Caesarean section",
    aka: ["LSCS", "caesarean birth", "C-section"],
    specialty: "Obstetric",
    summary: "Delivery of the baby through a lower segment uterine incision via a Pfannenstiel (transverse) abdominal incision.",
    position: "Supine with left lateral tilt or uterine displacement to relieve aortocaval compression.",
    bloodLossRisk: "Moderate",
    steps: [
      { step: "Pfannenstiel skin incision, division of rectus sheath and separation of rectus muscles.", anaesthetic: "Under spinal or epidural anaesthesia, test the block to touch (cold alone is unreliable) to T4 before incision and document it." },
      { step: "Opening of the peritoneum, bladder reflected, lower segment uterine incision.", anaesthetic: "Spinal hypotension: prophylactic vasopressor infusion (phenylephrine) is commonly used." },
      { step: "Delivery of the baby (fundal pressure may be needed).", anaesthetic: "Fundal pressure and uterine exteriorisation are the most uncomfortable moments for the mother — reassure and supplement if needed." },
      { step: "Delivery of the placenta and uterotonic given.", anaesthetic: "Oxytocin by slow bolus and/or infusion; rapid bolus causes hypotension and tachycardia. Watch blood loss and uterine tone." },
      { step: "Closure of the uterus (sometimes exteriorised), peritoneum, sheath and skin.", anaesthetic: "Postpartum haemorrhage may need further uterotonics, tranexamic acid and blood products." },
    ],
    criticalMoments: ["Spinal hypotension", "Delivery", "Uterotonic administration", "Postpartum haemorrhage"],
    anaestheticNotes: [
      "NICE NG192 recommends regional anaesthesia for caesarean birth where possible.",
      "Classify urgency (categories 1–4) to guide the time available and anaesthetic choice.",
      "General anaesthesia risks: difficult airway and aspiration — follow obstetric difficult airway guidance.",
    ],
    related: { label: "Obstetric anaesthesia", path: "/clinical/obstetric-anaesthesia" },
    sources: ["NICE NG192"],
  },
];

export const specialties: Specialty[] = [
  "Vascular",
  "Cardiothoracic",
  "General & GI",
  "Orthopaedic & Spine",
  "Neurosurgery",
  "Urology",
  "ENT & Head and Neck",
  "Obstetric",
];

/** Case-insensitive match across name, aliases, specialty, summary and all step text. */
export function searchOperations(query: string, specialty: Specialty | "All" = "All", list: Operation[] = operations): Operation[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  return list.filter((op) => {
    if (specialty !== "All" && op.specialty !== specialty) return false;
    if (!terms.length) return true;
    const hay = [
      op.name, ...(op.aka ?? []), op.specialty, op.summary, op.position,
      ...op.steps.flatMap((s) => [s.step, s.anaesthetic ?? ""]),
      ...op.criticalMoments, ...op.anaestheticNotes,
    ].join(" ").toLowerCase();
    return terms.every((t) => hay.includes(t));
  });
}
