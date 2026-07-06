import { useState } from "react";
import { DiagramFigure } from "../_shared/DiagramFigure";

type Dermatome = {
  level: string;
  rank: number; // higher rank = higher up the body
  landmark: string;
  testSite: string;
};

const DERMATOMES: Dermatome[] = [
  { level: "C4", rank: 24, landmark: "Clavicle / shoulder tip", testSite: "Over clavicle, lateral to sternoclavicular joint" },
  { level: "T1", rank: 23, landmark: "Medial elbow / inner arm", testSite: "Medial epicondyle of humerus" },
  { level: "T2", rank: 22, landmark: "Apex of axilla", testSite: "Highest point of axilla (intercostobrachial)" },
  { level: "T3", rank: 21, landmark: "3rd intercostal space", testSite: "Mid-clavicular line, 3rd ICS" },
  { level: "T4", rank: 20, landmark: "Nipple line", testSite: "Just lateral to nipple (avoid areola)" },
  { level: "T5", rank: 19, landmark: "Inframammary fold", testSite: "Below breast, mid-clavicular line" },
  { level: "T6", rank: 18, landmark: "Xiphisternum", testSite: "Over xiphoid process" },
  { level: "T7", rank: 17, landmark: "Lower costal margin", testSite: "Mid-clavicular line, costal margin" },
  { level: "T8", rank: 16, landmark: "Between xiphoid & umbilicus (upper)", testSite: "Epigastrium" },
  { level: "T9", rank: 15, landmark: "Above umbilicus", testSite: "Two finger-breadths above umbilicus" },
  { level: "T10", rank: 14, landmark: "Umbilicus", testSite: "At umbilicus (NEVER above — that's T9)" },
  { level: "T11", rank: 13, landmark: "Below umbilicus", testSite: "Halfway between umbilicus and ASIS" },
  { level: "T12", rank: 12, landmark: "Suprapubic / iliac crest", testSite: "Just above pubic symphysis or over iliac crest" },
  { level: "L1", rank: 11, landmark: "Inguinal ligament", testSite: "Mid-inguinal point (femoral pulse area)" },
  { level: "L2", rank: 10, landmark: "Anterior mid-thigh", testSite: "Mid-anterior thigh" },
  { level: "L3", rank: 9, landmark: "Medial knee / above patella", testSite: "Just above medial femoral condyle" },
  { level: "L4", rank: 8, landmark: "Medial malleolus / shin", testSite: "Over medial malleolus" },
  { level: "L5", rank: 7, landmark: "Dorsum of foot / great toe", testSite: "Dorsum of foot, base of great toe" },
  { level: "S1", rank: 6, landmark: "Lateral foot / little toe", testSite: "Lateral border of foot / 5th toe" },
  { level: "S2", rank: 5, landmark: "Posterior thigh", testSite: "Mid-posterior thigh" },
  { level: "S3", rank: 4, landmark: "Ischial tuberosity area", testSite: "Over ischial tuberosity" },
  { level: "S4-S5", rank: 3, landmark: "Perianal ('saddle')", testSite: "Perianal skin — saddle area" },
];

type Procedure = {
  name: string;
  level: string;
  rationale: string;
  warning?: string;
};

const PROCEDURES: Procedure[] = [
  { name: "Lower limb (foot/ankle)", level: "L2", rationale: "Covers lower limb dermatomes; tourniquet may need higher block." },
  { name: "Knee surgery / TKR", level: "T12", rationale: "Covers thigh tourniquet + knee capsule (obturator + femoral + sciatic territories).", warning: "Some advocate combined femoral/adductor canal + sciatic + LIA instead of high spinal." },
  { name: "Hip surgery / fractured NOF", level: "T10", rationale: "Hip joint innervation includes obturator, femoral, sciatic — needs T10 minimum." },
  { name: "TURP / cystoscopy", level: "T10", rationale: "Bladder distension referred via T10 (sympathetic afferents from hypogastric plexus)." },
  { name: "Inguinal hernia repair", level: "T8", rationale: "Spermatic cord traction → vagal/sympathetic afferents from T8–T10. Pure L1 block insufficient for handling." },
  { name: "LSCS / Caesarean section", level: "T4", rationale: "Peritoneal traction by surgeon causes nausea/pain unless block reaches T4 (nipple). T6 is INADEQUATE.", warning: "Test with COLD (ethyl chloride) AND light touch — touch level is typically 2 segments lower than cold; pinprick lower again. Document all three." },
  { name: "Upper abdominal surgery", level: "T4", rationale: "Visceral peritoneum innervated up to T4. Spinal alone usually inadequate — combine with GA or epidural." },
  { name: "Perianal / haemorrhoid surgery", level: "S2-S5", rationale: "'Saddle block' — small dose of hyperbaric local in sitting position confines block to sacral roots." },
  { name: "Manual removal of placenta", level: "T6", rationale: "Uterine fundus + cervical traction need T6 cover; lower block risks visceral pain." },
];

const COLD = "hsl(195 75% 50%)";
const PIN = "hsl(0 70% 55%)";
const TOUCH = "hsl(40 80% 50%)";

const SpinalBlockHeightAssessmentTool = () => {
  const [procIndex, setProcIndex] = useState<number>(5); // default LSCS
  const [customLevel, setCustomLevel] = useState<string | null>(null);

  const proc = PROCEDURES[procIndex];
  const targetLevel = customLevel ?? proc.level;

  // For combined targets like "S2-S5" treat as S2; for "T4" as T4
  const targetTopLevel = targetLevel.split("-")[0];
  const target = DERMATOMES.find((d) => d.level === targetTopLevel) ?? DERMATOMES.find((d) => d.level === "T4")!;

  const _blocked = DERMATOMES.filter((d) => d.rank <= target.rank);
  const _notBlocked = DERMATOMES.filter((d) => d.rank > target.rank);

  return (
    <DiagramFigure
      id="spinal-block-height-assessment-tool"
      title="Spinal block height assessment tool"
      description="Auto-generated wrapper for the Spinal block height assessment tool anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="my-6 rounded-lg border border-border bg-card p-4">
        <p className="text-sm font-semibold text-foreground mb-1 text-center">
          Block Height Assessment Tool
        </p>
        <p className="text-xs text-muted-foreground text-center mb-3">
          Choose a procedure (or set a custom target) to see which dermatomes must be anaesthetised, with bedside testing landmarks.
        </p>
  
        {/* Procedure selector */}
        <div className="mb-3">
          <p className="text-[11px] font-bold text-foreground uppercase tracking-wide mb-1">Select procedure</p>
          <div className="flex flex-wrap gap-1.5">
            {PROCEDURES.map((p, i) => (
              <button
                key={p.name}
                onClick={() => { setProcIndex(i); setCustomLevel(null); }}
                className={`text-[11px] px-2.5 py-1 rounded border transition font-semibold ${
                  procIndex === i && !customLevel
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card hover:bg-muted/50 text-foreground"
                }`}
              >
                {p.name} <span className="opacity-70">({p.level})</span>
              </button>
            ))}
          </div>
        </div>
  
        {/* Custom target */}
        <div className="mb-4">
          <p className="text-[11px] font-bold text-foreground uppercase tracking-wide mb-1">Or set custom target level</p>
          <div className="flex flex-wrap gap-1">
            {DERMATOMES.map((d) => (
              <button
                key={d.level}
                onClick={() => setCustomLevel(d.level)}
                className={`text-[10px] px-1.5 py-0.5 rounded border transition font-bold ${
                  customLevel === d.level
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card hover:bg-muted/50 text-muted-foreground"
                }`}
              >
                {d.level}
              </button>
            ))}
          </div>
        </div>
  
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-4 items-start">
          {/* Dermatome ladder visual */}
          <div className="rounded-lg border border-border bg-secondary/20 p-3">
            <div className="flex items-baseline justify-between mb-2">
              <p className="text-xs font-bold text-foreground">Dermatome ladder</p>
              <p className="text-[10px] text-muted-foreground italic">Target: <span className="font-bold text-primary">{targetLevel}</span></p>
            </div>
            <div className="space-y-0.5">
              {DERMATOMES.map((d) => {
                const isBlocked = d.rank <= target.rank;
                const isTarget = d.level === targetTopLevel;
                return (
                      <div
                    key={d.level}
                    className={`flex items-center gap-2 py-1 px-2 rounded text-[11px] transition ${
                      isTarget ? "bg-primary/15 border border-primary/40" : isBlocked ? "bg-clinical/10" : ""
                    }`}
                  >
                    <span className="font-bold text-foreground w-10 text-right">{d.level}</span>
                    <span className="text-base leading-none">
                      {isBlocked ? "🟢" : "⚪"}
                    </span>
                    <span className="text-muted-foreground flex-1">{d.landmark}</span>
                    {isTarget && <span className="text-[9px] font-bold text-primary uppercase">TARGET</span>}
                  </div>
    );
              })}
            </div>
            <p className="text-[10px] text-muted-foreground italic mt-2">
              🟢 = should be anaesthetised &nbsp;·&nbsp; ⚪ = expected to retain sensation
            </p>
          </div>
  
          {/* Right panel: rationale + testing */}
          <div className="space-y-3">
            {/* Procedure rationale */}
            {!customLevel && (
              <div className="rounded-lg border-2 border-clinical/40 bg-clinical/5 p-3">
                <p className="text-[10px] font-bold text-clinical uppercase tracking-wide mb-1">Why {proc.level} for {proc.name}?</p>
                <p className="text-xs text-foreground leading-snug mb-1">{proc.rationale}</p>
                {proc.warning && (
                  <p className="text-[11px] text-muted-foreground leading-snug mt-2 pt-2 border-t border-border">
                    <strong className="text-foreground">⚠ Note: </strong>{proc.warning}
                  </p>
                )}
              </div>
            )}
  
            {/* Testing modalities */}
            <div className="rounded-lg border border-border p-3">
              <p className="text-[10px] font-bold text-foreground uppercase tracking-wide mb-2">Bedside testing — three modalities</p>
              <div className="space-y-2">
                <div className="p-2 rounded border-l-4" style={{ borderLeftColor: COLD, background: `${COLD}10` }}>
                  <p className="text-xs font-bold" style={{ color: COLD }}>❄ Cold (ethyl chloride spray / ice cube)</p>
                  <p className="text-[11px] text-muted-foreground leading-snug mt-0.5">
                    Tests Aδ fibres (small, lightly myelinated). <strong className="text-foreground">Highest level</strong> — use to assess the upper margin of sympathetic block. Most sensitive. Apply from clearly blocked area UP to clearly unblocked area.
                  </p>
                </div>
                <div className="p-2 rounded border-l-4" style={{ borderLeftColor: TOUCH, background: `${TOUCH}10` }}>
                  <p className="text-xs font-bold" style={{ color: TOUCH }}>✋ Light touch (cotton wool / gauze)</p>
                  <p className="text-[11px] text-muted-foreground leading-snug mt-0.5">
                    Tests Aβ fibres (large, myelinated). <strong className="text-foreground">~2 segments lower than cold.</strong> Best correlates with surgical readiness for LSCS. RCOA recommends light-touch level to T5 + cold to T4 before knife-to-skin.
                  </p>
                </div>
                <div className="p-2 rounded border-l-4" style={{ borderLeftColor: PIN, background: `${PIN}10` }}>
                  <p className="text-xs font-bold" style={{ color: PIN }}>📍 Pinprick (Neurotip)</p>
                  <p className="text-[11px] text-muted-foreground leading-snug mt-0.5">
                    Tests Aδ + C fibres (sharp pain). <strong className="text-foreground">Often 1–2 segments lower than cold.</strong> Useful but less reproducible; some avoid in obstetrics (patient anxiety).
                  </p>
                </div>
              </div>
              <div className="mt-2 p-2 rounded bg-secondary/50 border border-primary/20">
                <p className="text-[11px] text-muted-foreground leading-snug">
                  <strong className="text-foreground">💡 Block hierarchy: </strong>
                  Sympathetic block ≥ 2 segments above cold ≥ touch ≥ motor. Document all modalities AND time. For LSCS the standard documentation is: <em>"Cold to T4 bilaterally, light touch to T5 bilaterally, motor block Bromage 3."</em>
                </p>
              </div>
            </div>
  
            {/* Test site for target level */}
            <div className="rounded-lg border border-border p-3 bg-card">
              <p className="text-[10px] font-bold text-foreground uppercase tracking-wide mb-1">Where to test the target level ({targetTopLevel})</p>
              <p className="text-xs text-foreground leading-snug">
                <strong>Landmark:</strong> {target.landmark}
              </p>
              <p className="text-xs text-muted-foreground leading-snug mt-1">
                <strong className="text-foreground">Test site:</strong> {target.testSite}
              </p>
            </div>
          </div>
        </div>
  
        {/* Bottom synthesis */}
        <div className="mt-3 p-2.5 rounded bg-secondary/40 border border-border">
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Common pitfalls: </strong>
            (1) <em>Testing only at the umbilicus and assuming T10 = adequate</em> — for LSCS you need T4. (2) <em>Confusing T10 with the iliac crest</em> — iliac crest is L1; umbilicus is T10. (3) <em>Documenting only "block adequate"</em> — medico-legal disasters; always state modality + level + side + time. (4) <em>Forgetting that cold returns first</em> — a patient who can suddenly feel cold is signalling block regression, not nothing.
          </p>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default SpinalBlockHeightAssessmentTool;
