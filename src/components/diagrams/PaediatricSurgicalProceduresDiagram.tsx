import { useState } from "react";

type Procedure = {
  id: string;
  name: string;
  age: string;
  urgency: "Time-critical" | "Urgent" | "Semi-elective";
  pathology: string;
  preopPriorities: string[];
  inductionPlan: string;
  intraopConsiderations: string[];
  postopPlan: string;
  examPearl: string;
  color: string;
};

const PROCEDURES: Procedure[] = [
  {
    id: "nec",
    name: "Necrotising Enterocolitis (NEC) — Laparotomy",
    age: "Premature neonate (typically < 32/40, < 1500 g)",
    urgency: "Time-critical",
    pathology:
      "Ischaemic + inflammatory bowel injury → pneumatosis intestinalis, perforation, peritonitis. Profoundly septic, coagulopathic, often ventilated in NICU.",
    preopPriorities: [
      "Sepsis bundle: cultures, broad-spectrum antibiotics (e.g. tazocin + metronidazole + amikacin per local protocol)",
      "Resuscitate with 10–20 ml/kg balanced crystalloid boluses; correct acidosis",
      "Correct coagulopathy/thrombocytopenia (FFP, platelets, cryoprecipitate)",
      "Glucose check — neonates have minimal glycogen reserves; run dextrose-containing maintenance",
      "Consent for blood transfusion; cross-match 1 unit irradiated CMV-negative neonatal red cells",
      "Discuss with NICU: transfer in incubator, maintain ventilation continuity",
    ],
    inductionPlan:
      "Often already intubated and ventilated. If not: modified RSI with fentanyl 1–2 µg/kg + rocuronium 1 mg/kg (sux relatively contraindicated by hyperkalaemia risk). Avoid N₂O (bowel distension). Maintain with low-dose volatile + opioid; consider TIVA if cardiovascularly unstable.",
    intraopConsiderations: [
      "Theatre temperature 26–28°C, forced-air warming, warm fluids — hypothermia worsens coagulopathy and acidosis",
      "Two reliable IV access points + arterial line; consider CVC for inotropes",
      "Anticipate massive haemorrhage — have 20 ml/kg packed red cells immediately available",
      "Inotropes: noradrenaline ± adrenaline infusion via CVC; dopamine acceptable peripherally",
      "Monitor glucose hourly; lactate trend; ABGs",
      "Lung-protective ventilation: Vt 5–6 ml/kg, PEEP 5, accept permissive hypercapnia",
    ],
    postopPlan:
      "Transfer ventilated to NICU. Ongoing sepsis management, parenteral nutrition, careful fluid balance. Mortality 20–30%; survivors at risk of short-bowel syndrome.",
    examPearl:
      "Bell's staging guides surgery: Stage IIIB (perforation) = absolute indication. Bedside peritoneal drain under LA may precede laparotomy in extremely unstable infants.",
    color: "hsl(0 75% 55%)",
  },
  {
    id: "pyloric",
    name: "Pyloric Stenosis — Pyloromyotomy (Ramstedt)",
    age: "4–6 weeks, classically male first-born",
    urgency: "Semi-elective",
    pathology:
      "Hypertrophy of pyloric muscle → gastric outlet obstruction. Projectile non-bilious vomiting → loss of HCl → hypochloraemic, hypokalaemic metabolic alkalosis with paradoxical aciduria.",
    preopPriorities: [
      "MEDICAL emergency, NOT surgical — operate only after biochemistry corrected",
      "Targets: Cl⁻ > 100 mmol/L, HCO₃⁻ < 26 mmol/L, K⁺ > 3.5, normal pH",
      "Rehydrate with 0.9% NaCl + 20 mmol/L KCl at 1.5× maintenance until corrected (usually 24–48 h)",
      "NG tube on free drainage; aspirate before induction",
    ],
    inductionPlan:
      "Modified RSI — full stomach despite NG. Pre-oxygenate, aspirate NG in supine + lateral positions. IV induction: propofol 3–4 mg/kg + rocuronium 1 mg/kg (or suxamethonium 2 mg/kg). Cricoid pressure controversial in neonates.",
    intraopConsiderations: [
      "Short procedure (~30 min) — often done laparoscopically",
      "Maintain with sevoflurane/desflurane in air/O₂; small opioid dose (e.g. fentanyl 0.5 µg/kg)",
      "Local infiltration of port sites with bupivacaine 0.25% (max 2 mg/kg)",
      "Risk of post-op apnoea due to persistent CSF alkalosis depressing respiratory drive — DO NOT operate on uncorrected alkalosis",
    ],
    postopPlan:
      "Apnoea monitoring 12–24 h, especially if ex-premature or alkalosis incompletely corrected. Paracetamol 15 mg/kg PR/IV; avoid opioids if possible. Feed within 4–6 h.",
    examPearl:
      "The classic blood gas: pH ↑, PaCO₂ ↑ (compensatory hypoventilation), Cl⁻ ↓↓, K⁺ ↓, urinary pH paradoxically acidic (Na⁺ retained in exchange for H⁺ once K⁺ depleted).",
    color: "hsl(40 80% 50%)",
  },
  {
    id: "toef",
    name: "Tracheo-Oesophageal Fistula (TOF) ± Oesophageal Atresia",
    age: "Neonate (presents day 1)",
    urgency: "Urgent",
    pathology:
      "Most common variant (Gross C, ~85%): proximal oesophageal atresia + distal TOF. Antenatal polyhydramnios; postnatal frothing, choking, inability to pass NG. VACTERL associations in 50% — cardiac echo is mandatory pre-op.",
    preopPriorities: [
      "Replogle (sump) tube to upper pouch on continuous low suction — prevents aspiration",
      "Nurse head-up 30° to minimise reflux through fistula",
      "Echocardiogram: rule out duct-dependent lesion AND identify right-sided arch (~5%; would change thoracotomy side)",
      "Avoid CPAP/bag-mask ventilation — gas insufflates stomach via fistula → splinting + possible gastric rupture",
      "Renal USS, spine X-ray for VACTERL screen",
    ],
    inductionPlan:
      "Classic options: (1) inhalational induction maintaining spontaneous ventilation until ETT placed below the fistula; (2) IV induction with careful hand ventilation at low pressures. Ideally place ETT bevel beyond the fistula but above the carina. Awake fibreoptic in unstable neonates is occasionally used.",
    intraopConsiderations: [
      "Right thoracotomy (or thoracoscopy in experienced centres) — left lateral position, single-lung ventilation by mainstem intubation or bronchial blocker",
      "Frequent communication with surgeon — they may compress the lung or kink the trachea",
      "Pre-ductal SpO₂ probe (right hand) to detect ductal shunt",
      "Arterial line; warm theatre; meticulous fluid management (10–20 ml/kg/day baseline + losses)",
      "Avoid extremes of CO₂ — affects PVR in this duct-dependent population",
    ],
    postopPlan:
      "Usually extubated early (avoid prolonged positive pressure on the fresh anastomosis). Trans-anastomotic NG kept in place. Watch for anastomotic leak, recurrent fistula, tracheomalacia.",
    examPearl:
      "If oxygen saturation drops on positive-pressure ventilation pre-fistula-ligation, suspect gas going down the fistula — turn the ETT bevel posteriorly, advance distally, or have the surgeon clamp the fistula.",
    color: "hsl(195 75% 50%)",
  },
  {
    id: "torsion",
    name: "Testicular Torsion — Scrotal Exploration",
    age: "Adolescent (peak 12–18 y); also neonatal",
    urgency: "Time-critical",
    pathology:
      "Twist of spermatic cord → ischaemia. Salvage rate ~90% if detorsion within 6 h, < 10% beyond 24 h. Time from door to detorsion is the key outcome driver.",
    preopPriorities: [
      "MINIMAL delay — do not wait for fasting; treat as full stomach",
      "Brief AMPLE history; consent including orchidectomy possibility",
      "IV access, basic bloods, group & save",
      "Analgesia: IV morphine 0.1 mg/kg or fentanyl 1 µg/kg",
    ],
    inductionPlan:
      "RSI with propofol 3 mg/kg + rocuronium 1 mg/kg (or suxamethonium 1–1.5 mg/kg). Cricoid pressure. LMA only if explicitly low aspiration risk and surgery very brief.",
    intraopConsiderations: [
      "Maintenance: sevoflurane/desflurane in air/O₂ + opioid",
      "Multimodal analgesia: paracetamol 15 mg/kg, NSAID (ibuprofen 10 mg/kg or diclofenac PR 1 mg/kg) once haemostasis confirmed",
      "Ilioinguinal block or caudal (0.25% levobupivacaine 0.5 ml/kg) for post-op analgesia — avoid pudendal/penile block (changes scrotal exam)",
      "Antiemetic prophylaxis: ondansetron 0.15 mg/kg + dexamethasone 0.15 mg/kg",
    ],
    postopPlan:
      "Day-case discharge usually possible if simple detorsion + bilateral fixation. Safety-netting for post-op pain, swelling, retesting if orchidopexy of contralateral side performed.",
    examPearl:
      "Treat the time-pressure like an obstetric category-1 LSCS — the testicular salvage clock is the dominant variable. Document fasting status but never delay theatre for it.",
    color: "hsl(280 60% 55%)",
  },
  {
    id: "fb",
    name: "Inhaled Foreign Body — Rigid Bronchoscopy",
    age: "Toddler (peak 1–3 y); peanut & other organic FBs commonest",
    urgency: "Urgent",
    pathology:
      "Acute event: cough/choke/cyanosis. May settle into a 'silent phase' before complications (lobar collapse, pneumonia). Right main bronchus most common site (wider, more vertical even in children).",
    preopPriorities: [
      "Joint plan with ENT/paediatric surgeon BEFORE arriving in theatre",
      "Assess severity: stridor, oxygen saturation, signs of complete obstruction",
      "Investigations as appropriate (CXR — may show hyperinflation of affected lobe on expiratory film) but NEVER delay if critical",
      "Avoid sedative premedication if airway is critical; consider IV access first if calm",
    ],
    inductionPlan:
      "GOLD STANDARD: gaseous induction with sevoflurane in 100% O₂, MAINTAINING spontaneous ventilation. IV access once asleep. Topicalise cords with lidocaine (max 4 mg/kg) before bronchoscopy. Avoid muscle relaxants in critical FB — ball-valve obstruction can become complete with positive-pressure ventilation.",
    intraopConsiderations: [
      "Shared airway — close communication with bronchoscopist; ventilator circuit attaches to side-arm of rigid scope",
      "Maintain anaesthesia with TIVA (propofol ± remifentanil) for stable depth despite ventilation interruptions",
      "Risks: complete airway obstruction (FB dislodged proximally), bleeding, pneumothorax, post-extraction subglottic oedema",
      "Have second airway plan ready: tracheostomy set, ECMO standby in extreme cases",
      "Dexamethasone 0.15 mg/kg IV to reduce post-extraction airway oedema; nebulised adrenaline available",
    ],
    postopPlan:
      "Recover head-up; observe for stridor, desaturation, post-obstructive pulmonary oedema. Antibiotics if delayed presentation. Most go home next day.",
    examPearl:
      "Spontaneous ventilation for the foreign body that ISN'T causing complete obstruction; controlled ventilation only if the FB is fixed. Never paralyse a critical inhaled FB until you can see it.",
    color: "hsl(150 60% 45%)",
  },
];

const URGENCY_COLOR: Record<string, string> = {
  "Time-critical": "hsl(0 75% 55%)",
  Urgent: "hsl(40 80% 50%)",
  "Semi-elective": "hsl(150 55% 45%)",
};

const PaediatricSurgicalProceduresDiagram = () => {
  const [selectedId, setSelectedId] = useState<string>("nec");
  const sel = PROCEDURES.find((p) => p.id === selectedId)!;

  return (
    <div className="my-6 rounded-lg border border-border bg-card p-4">
      <p className="text-sm font-semibold text-foreground mb-1 text-center">
        Key Paediatric Surgical Procedures — Anaesthetic Implications
      </p>
      <p className="text-xs text-muted-foreground text-center mb-3">
        Click a procedure to see preoperative priorities, induction plan, intraoperative considerations and the highest-yield exam pearl.
      </p>

      {/* Anatomical schematic */}
      <svg viewBox="0 0 600 220" className="w-full h-auto max-w-[700px] mx-auto mb-3" role="img" aria-label="Anatomical sites of paediatric surgical conditions">
        {/* Infant body silhouette */}
        <path
          d="M 300 20 Q 270 20, 265 50 Q 263 70, 280 80 L 240 90 Q 215 95, 215 130 L 215 180 Q 218 195, 235 200 L 270 200 L 280 215 L 320 215 L 330 200 L 365 200 Q 382 195, 385 180 L 385 130 Q 385 95, 360 90 L 320 80 Q 337 70, 335 50 Q 330 20, 300 20 Z"
          fill="hsl(var(--muted))"
          opacity="0.35"
          stroke="hsl(var(--foreground))"
          strokeWidth="1"
        />
        {/* Trachea */}
        <line x1="300" y1="55" x2="300" y2="105" stroke="hsl(195 75% 50%)" strokeWidth="3" opacity="0.7" />
        {/* Bronchi */}
        <line x1="300" y1="105" x2="280" y2="125" stroke="hsl(195 75% 50%)" strokeWidth="2.2" opacity="0.7" />
        <line x1="300" y1="105" x2="325" y2="130" stroke="hsl(195 75% 50%)" strokeWidth="2.6" opacity="0.85" />
        {/* Lungs */}
        <ellipse cx="265" cy="135" rx="22" ry="32" fill="hsl(195 60% 60%)" opacity="0.18" stroke="hsl(195 60% 50%)" strokeWidth="0.6" />
        <ellipse cx="335" cy="135" rx="24" ry="32" fill="hsl(195 60% 60%)" opacity="0.18" stroke="hsl(195 60% 50%)" strokeWidth="0.6" />
        {/* Stomach + pylorus */}
        <path d="M 285 145 Q 275 155, 280 170 Q 290 178, 305 175 L 320 168 L 318 158 L 305 152 Z" fill="hsl(40 80% 50%)" opacity="0.22" stroke="hsl(40 80% 50%)" strokeWidth="0.8" />
        {/* Bowel coils */}
        <g fill="none" stroke="hsl(0 75% 55%)" strokeWidth="1.4" opacity="0.65">
          <path d="M 250 178 Q 270 188, 290 182 Q 310 176, 330 186 Q 350 192, 365 184" />
          <path d="M 248 188 Q 270 196, 295 190 Q 320 184, 348 192" />
        </g>
        {/* Scrotum */}
        <ellipse cx="300" cy="212" rx="14" ry="6" fill="hsl(280 60% 55%)" opacity="0.25" stroke="hsl(280 60% 55%)" strokeWidth="0.8" />

        {/* Markers */}
        {[
          { id: "toef", x: 300, y: 90, label: "TOF" },
          { id: "fb", x: 325, y: 130, label: "FB" },
          { id: "pyloric", x: 318, y: 158, label: "Pylorus" },
          { id: "nec", x: 295, y: 188, label: "NEC" },
          { id: "torsion", x: 300, y: 212, label: "Torsion" },
        ].map((mk) => {
          const proc = PROCEDURES.find((p) => p.id === mk.id)!;
          const isSel = selectedId === mk.id;
          return (
            <g key={mk.id} style={{ cursor: "pointer" }} onClick={() => setSelectedId(mk.id)}>
              <circle cx={mk.x} cy={mk.y} r={isSel ? 9 : 6} fill={proc.color} opacity={isSel ? 0.95 : 0.7} stroke="hsl(var(--background))" strokeWidth="1.5" />
              {isSel && <circle cx={mk.x} cy={mk.y} r="14" fill="none" stroke={proc.color} strokeWidth="1.5" opacity="0.6">
                <animate attributeName="r" values="9;18;9" dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.7;0;0.7" dur="1.8s" repeatCount="indefinite" />
              </circle>}
            </g>
          );
        })}

        {/* Side labels with leader lines */}
        {[
          { id: "toef", lx: 470, ly: 60, ax: 300, ay: 90 },
          { id: "fb", lx: 470, ly: 105, ax: 325, ay: 130 },
          { id: "pyloric", lx: 470, ly: 150, ax: 318, ay: 158 },
          { id: "nec", lx: 470, ly: 180, ax: 295, ay: 188 },
          { id: "torsion", lx: 470, ly: 205, ax: 300, ay: 212 },
        ].map((lp) => {
          const proc = PROCEDURES.find((p) => p.id === lp.id)!;
          const isSel = selectedId === lp.id;
          return (
            <g key={`lbl-${lp.id}`} opacity={isSel ? 1 : 0.6} style={{ cursor: "pointer" }} onClick={() => setSelectedId(lp.id)}>
              <line x1={lp.ax} y1={lp.ay} x2={lp.lx - 4} y2={lp.ly} stroke={proc.color} strokeWidth={isSel ? 1.2 : 0.6} />
              <text x={lp.lx} y={lp.ly + 3} fontSize="10" fontWeight="700" fill={proc.color}>
                {proc.name.split(" — ")[0]}
              </text>
            </g>
          );
        })}

        {/* Left side labels too */}
        {[
          { txt: "Trachea", x: 130, y: 60, ax: 300, ay: 60 },
          { txt: "Stomach", x: 130, y: 165, ax: 290, ay: 165 },
        ].map((l, i) => (
          <g key={`anat-${i}`} opacity="0.55">
            <line x1={l.ax} y1={l.ay} x2={l.x + 40} y2={l.y} stroke="hsl(var(--muted-foreground))" strokeWidth="0.5" strokeDasharray="2 2" />
            <text x={l.x} y={l.y + 3} fontSize="9" fill="hsl(var(--muted-foreground))" fontStyle="italic">
              {l.txt}
            </text>
          </g>
        ))}
      </svg>

      {/* Procedure chip selector */}
      <div className="flex flex-wrap gap-1.5 justify-center mb-4">
        {PROCEDURES.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedId(p.id)}
            className="text-[11px] px-2.5 py-1 rounded border transition font-semibold"
            style={{
              background: selectedId === p.id ? p.color : "transparent",
              color: selectedId === p.id ? "white" : "hsl(var(--foreground))",
              borderColor: selectedId === p.id ? p.color : "hsl(var(--border))",
            }}
          >
            {p.name.split(" — ")[0]}
          </button>
        ))}
      </div>

      {/* Detail panel */}
      <div className="rounded-lg border-2 p-3" style={{ borderColor: `${sel.color}55`, background: `${sel.color}0d` }}>
        <div className="flex items-baseline gap-2 flex-wrap mb-1">
          <span className="text-base font-bold text-foreground">{sel.name}</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mb-2">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide" style={{ background: `${URGENCY_COLOR[sel.urgency]}25`, color: URGENCY_COLOR[sel.urgency], border: `1px solid ${URGENCY_COLOR[sel.urgency]}55` }}>
            {sel.urgency}
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide bg-muted text-muted-foreground border border-border">
            {sel.age}
          </span>
        </div>
        <p className="text-xs text-foreground leading-relaxed mb-3">
          <strong>Pathology:</strong> <span className="text-muted-foreground">{sel.pathology}</span>
        </p>

        <div className="grid md:grid-cols-2 gap-3 mb-3">
          <div>
            <p className="text-[11px] font-bold text-foreground uppercase tracking-wide mb-1">Preop priorities</p>
            <ul className="text-[11px] text-muted-foreground space-y-1 list-disc list-inside leading-snug">
              {sel.preopPriorities.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-bold text-foreground uppercase tracking-wide mb-1">Intraop considerations</p>
            <ul className="text-[11px] text-muted-foreground space-y-1 list-disc list-inside leading-snug">
              {sel.intraopConsiderations.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-3 mb-2">
          <div className="p-2 rounded bg-card/60 border border-border">
            <p className="text-[11px] font-bold text-foreground uppercase tracking-wide mb-1">Induction plan</p>
            <p className="text-[11px] text-muted-foreground leading-snug">{sel.inductionPlan}</p>
          </div>
          <div className="p-2 rounded bg-card/60 border border-border">
            <p className="text-[11px] font-bold text-foreground uppercase tracking-wide mb-1">Postop plan</p>
            <p className="text-[11px] text-muted-foreground leading-snug">{sel.postopPlan}</p>
          </div>
        </div>

        <div className="p-2 rounded bg-secondary/50 border border-primary/20 mt-2">
          <p className="text-[11px] text-muted-foreground leading-snug">
            <strong className="text-foreground">💡 Exam pearl: </strong>{sel.examPearl}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaediatricSurgicalProceduresDiagram;
