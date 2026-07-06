import { useMemo, useState } from "react";
import { withAlpha } from "@/lib/color-utils";
import { DiagramToggleBar } from "@/components/diagrams/shared/DiagramToggleBar";
import { DiagramFigure } from "./_shared/DiagramFigure";

/**
 * Postpartum leg weakness / sensory disturbance decision tree.
 *
 * Walks the clinician through the key discriminators between time-critical
 * neuraxial pathology (haematoma, abscess, cauda equina) and the much more
 * common intrinsic obstetric nerve injuries (lumbosacral trunk, common
 * peroneal, femoral, obturator, meralgia paraesthetica) and musculoskeletal
 * causes (SI joint / pubic symphysis dysfunction).
 *
 * Aligned with OAA/RCoA "Management of postpartum nerve injuries" (2023)
 * and NAP3 (RCoA, 2009).
 */

type Step = "timing" | "laterality" | "distribution" | "sphincter" | "backPain";

interface Option {
  label: string;
  value: string;
  /** true = concerning for neuraxial / central cause */
  red?: boolean;
}

interface NodeMeta {
  question: string;
  hint?: string;
  options: Option[];
}

const tree: Record<Step, NodeMeta> = {
  timing: {
    question: "When did symptoms become apparent?",
    hint: "Compare onset against the expected duration of the block.",
    options: [
      { label: "Block fails to regress by 4 h after last top-up / expected spinal duration", value: "persistent", red: true },
      { label: "Block recurs after initial full recovery", value: "recurrent", red: true },
      { label: "Noted on first mobilisation, after block fully worn off", value: "mobilising" },
      { label: "Pre-existed labour / present antenatally", value: "preexisting" },
    ],
  },
  laterality: {
    question: "Laterality of weakness / sensory loss?",
    options: [
      { label: "Unilateral", value: "unilateral" },
      { label: "Bilateral", value: "bilateral", red: true },
    ],
  },
  distribution: {
    question: "Distribution of motor / sensory signs?",
    hint: "Map the deficit to a peripheral nerve vs a dermatome / myotome.",
    options: [
      { label: "Foot drop + weak hip abduction (L4–L5, lumbosacral trunk)", value: "lst" },
      { label: "Foot drop + weak eversion, inversion preserved (common peroneal)", value: "peroneal" },
      { label: "Weak quadriceps, absent knee jerk, iliopsoas spared (femoral)", value: "femoral" },
      { label: "Weak hip adduction ± medial thigh sensory loss (obturator)", value: "obturator" },
      { label: "Anterolateral thigh burning / numbness, no weakness (meralgia paraesthetica)", value: "meralgia" },
      { label: "Bilateral / multi-dermatomal / saddle distribution", value: "central", red: true },
    ],
  },
  sphincter: {
    question: "Sphincter / saddle involvement?",
    hint: "Painless retention with overflow, reduced anal tone, perianal numbness or new faecal incontinence.",
    options: [
      { label: "None — voiding normally, normal perianal sensation & tone", value: "none" },
      { label: "Painless retention, saddle anaesthesia, ↓anal tone, faecal incontinence", value: "saddle", red: true },
      { label: "Retention only, no saddle / motor signs (likely covert/overt obstetric retention)", value: "retention" },
      { label: "OASI suspected — perineal trauma, painful defecation, normal saddle sensation", value: "oasi" },
    ],
  },
  backPain: {
    question: "Back pain or systemic features?",
    options: [
      { label: "None / mild postural ache only", value: "none" },
      { label: "Severe / progressive back pain, fever, raised CRP (abscess)", value: "abscess", red: true },
      { label: "Severe back pain ± coagulopathy / recent LMWH / bloody tap (haematoma)", value: "haematoma", red: true },
      { label: "Pelvic / SI joint pain worse on weight-bearing, no neurology", value: "sij" },
    ],
  },
};

const stepOrder: Step[] = ["timing", "laterality", "distribution", "sphincter", "backPain"];

interface Verdict {
  type: "emergency" | "likely-obstetric" | "musculoskeletal" | "monitor" | "incomplete";
  color: string;
  label: string;
  diagnosis: string;
  action: string;
}

function decide(a: Partial<Record<Step, string>>): Verdict | null {
  const answered = stepOrder.filter((s) => a[s] !== undefined);
  if (answered.length === 0) return null;

  // ---------- Time-critical neuraxial emergencies ----------
  if (a.backPain === "haematoma") {
    return {
      type: "emergency",
      color: "hsl(0, 75%, 48%)",
      label: "URGENT MRI — exclude vertebral canal haematoma",
      diagnosis: "Spinal/epidural haematoma until proven otherwise. Risk ↑ with coagulopathy, recent LMWH, multiple/bloody attempts.",
      action: "MRI whole spine within 4 h; immediate neurosurgical referral. Decompression within 8 h of onset gives best chance of recovery (Vandermeulen 1994). Reverse anticoagulation; senior anaesthetic + obstetric input.",
    };
  }
  if (a.backPain === "abscess") {
    return {
      type: "emergency",
      color: "hsl(0, 75%, 48%)",
      label: "URGENT MRI — exclude epidural abscess",
      diagnosis: "Epidural abscess. Classic triad: back pain + fever + neurology (often incomplete). Catheter in situ >48 h, immunosuppression, diabetes are risk factors.",
      action: "MRI with contrast urgently; blood + catheter-tip cultures; broad-spectrum IV antibiotics covering Staph aureus (incl. MRSA); neurosurgical referral for drainage.",
    };
  }
  if (a.timing === "persistent" || a.timing === "recurrent") {
    return {
      type: "emergency",
      color: "hsl(0, 75%, 48%)",
      label: "URGENT MRI — block not behaving as expected",
      diagnosis:
        a.timing === "persistent"
          ? "Block failing to regress by 4 h beyond expected duration — assume compressive neuraxial lesion (haematoma > abscess) until imaged."
          : "Recurrence of dense block after full recovery — highly suspicious for evolving haematoma or abscess.",
      action: "Stop any epidural infusion; MRI whole spine within 4 h; senior anaesthetist + neurosurgery; serial neuro obs every 30 min until imaged.",
    };
  }
  if (a.sphincter === "saddle" || (a.distribution === "central" && a.laterality === "bilateral")) {
    return {
      type: "emergency",
      color: "hsl(0, 75%, 48%)",
      label: "URGENT MRI — possible cauda equina syndrome",
      diagnosis: "Bilateral signs with saddle anaesthesia and sphincter disturbance — cauda equina syndrome. May be neuraxial (haematoma/abscess) or disc-related; either way time-critical.",
      action: "MRI lumbosacral spine within 4 h; PR exam to document anal tone; bladder scan; neurosurgical referral. Surgical decompression within 24–48 h of onset.",
    };
  }

  // ---------- Likely intrinsic obstetric nerve palsies ----------
  if (a.laterality === "unilateral" && a.timing !== "preexisting") {
    if (a.distribution === "lst") {
      return {
        type: "likely-obstetric",
        color: "hsl(140, 55%, 40%)",
        label: "Likely lumbosacral trunk palsy (L4–L5)",
        diagnosis:
          "Most common intrinsic obstetric nerve injury. Compression of the lumbosacral trunk against the pelvic brim by the fetal head, especially with cephalopelvic disproportion or prolonged second stage. Foot drop + weak hip abduction; sensory loss over lateral calf and dorsum of foot.",
        action:
          "No urgent imaging if no red flags. Bedside motor/sensory map, document on OAA pathway, foot-drop splint, physiotherapy. EMG/NCS at ~3 weeks to localise and prognosticate. Most recover fully in 6–8 weeks.",
      };
    }
    if (a.distribution === "peroneal") {
      return {
        type: "likely-obstetric",
        color: "hsl(140, 55%, 40%)",
        label: "Likely common peroneal nerve compression",
        diagnosis:
          "Compression of common peroneal nerve at the fibular head from prolonged lithotomy or hand-held leg supports. Foot drop with weak eversion, but inversion (tibial nerve) preserved — distinguishes it from L5 / lumbosacral trunk lesion.",
        action:
          "Reassure, foot-drop splint, physiotherapy referral, padding for future positioning. Document on OAA pathway. Recovery typically 6–8 weeks.",
      };
    }
    if (a.distribution === "femoral") {
      return {
        type: "likely-obstetric",
        color: "hsl(140, 55%, 40%)",
        label: "Likely femoral neuropathy",
        diagnosis:
          "Compression of femoral nerve under the inguinal ligament during prolonged hyperflexion / abduction in lithotomy. Weak quadriceps, absent knee jerk, sensory loss over anterior thigh and medial calf; iliopsoas spared (lesion below the inguinal ligament).",
        action:
          "Crutches / knee brace to prevent buckling; physiotherapy; OAA pathway documentation; EMG at ~3 weeks. Recovery usually complete by 6 weeks.",
      };
    }
    if (a.distribution === "obturator") {
      return {
        type: "likely-obstetric",
        color: "hsl(140, 55%, 40%)",
        label: "Likely obturator nerve injury",
        diagnosis:
          "Compression in the obturator canal by the fetal head or forceps blade. Weak hip adduction, medial thigh sensory loss; gait is wide-based.",
        action:
          "Physiotherapy, OAA pathway. MRI pelvis only if persistent beyond 6 weeks or atypical features.",
      };
    }
    if (a.distribution === "meralgia") {
      return {
        type: "musculoskeletal",
        color: "hsl(38, 92%, 48%)",
        label: "Meralgia paraesthetica (lateral femoral cutaneous nerve)",
        diagnosis:
          "Pure sensory: burning / numbness over anterolateral thigh, no weakness. Caused by entrapment under the inguinal ligament (lithotomy, abdominal pressure, post-CS retractor injury).",
        action:
          "Reassurance, weight loss advice, loose clothing, simple analgesia / gabapentin if troublesome. Self-limiting in most. No imaging required.",
      };
    }
  }

  if (a.sphincter === "oasi") {
    return {
      type: "likely-obstetric",
      color: "hsl(140, 55%, 40%)",
      label: "Likely obstetric anal sphincter injury (OASI)",
      diagnosis:
        "3rd/4th degree tear with sphincter disruption — perineal pain, faecal urgency or incontinence with NORMAL saddle sensation and anal tone reduced focally rather than circumferentially. Distinguishes from cauda equina.",
      action:
        "Urgent obstetric/colorectal review, endoanal ultrasound, perineal clinic follow-up. Not a neuraxial complication.",
    };
  }

  if (a.sphincter === "retention" && a.distribution !== "central") {
    return {
      type: "musculoskeletal",
      color: "hsl(38, 92%, 48%)",
      label: "Postpartum urinary retention (obstetric)",
      diagnosis:
        "Covert/overt retention is common after delivery (incidence up to 14%) — risk factors include long second stage, instrumental delivery, epidural, large baby, episiotomy. NOT cauda equina if perianal sensation, anal tone and motor exam are normal.",
      action:
        "Bladder scan; in/out catheterise if >500 ml; indwelling catheter for 24–48 h with free drainage; trial without catheter. Urogynaecology referral if fails. Image only if any red flag develops.",
    };
  }

  if (a.backPain === "sij") {
    return {
      type: "musculoskeletal",
      color: "hsl(38, 92%, 48%)",
      label: "Likely pelvic girdle pain / SI joint dysfunction",
      diagnosis:
        "Mechanical pelvic / SI pain provoked by weight-bearing, with no neurology. Common postnatally; relaxin-mediated ligamentous laxity. Often misattributed to the epidural.",
      action:
        "Reassurance, physiotherapy, simple analgesia, pelvic support belt. No imaging unless atypical or red flags develop.",
    };
  }

  if (a.timing === "preexisting") {
    return {
      type: "musculoskeletal",
      color: "hsl(38, 92%, 48%)",
      label: "Pre-existing — unlikely neuraxial",
      diagnosis: "Symptoms predate the block — neuraxial cause unlikely. Document pre-existing status carefully and continue baseline pathway.",
      action: "Bedside neuro exam, document baseline, neurology / obstetric referral as appropriate. Reassure regarding neuraxial technique.",
    };
  }

  // ---------- Need more information ----------
  return {
    type: "incomplete",
    color: "hsl(var(--muted-foreground))",
    label: `Continue (${answered.length}/${stepOrder.length} answered)`,
    diagnosis: "Answer the remaining questions to generate a likely diagnosis and management recommendation.",
    action: "",
  };
}

const PostpartumLegWeaknessDecisionTree = () => {
  const [answers, setAnswers] = useState<Partial<Record<Step, string>>>({});
  const [showHints, setShowHints] = useState(true);

  const verdict = useMemo(() => decide(answers), [answers]);
  const reset = () => setAnswers({});

  return (
    <DiagramFigure
      id="postpartum-leg-weakness-decision-tree"
      title="Postpartum leg weakness decision tree"
      description="Auto-generated wrapper for the Postpartum leg weakness decision tree anatomical/physiological diagram. Review and replace with a specific, curriculum-aligned summary of what learners should take from the figure."
    >
              <div className="my-6 space-y-4">
        <div className="bg-muted/30 rounded-xl border border-border p-4">
          <DiagramToggleBar
            title="Postpartum leg weakness — decision tree"
            subtitle="Walk through 5 discriminators to separate neuraxial emergencies from intrinsic obstetric nerve injuries"
            toggles={[{ label: "Hints", active: showHints, onChange: () => setShowHints((s) => !s) }]}
          />
  
          <div className="space-y-2">
            {stepOrder.map((step, i) => {
              const node = tree[step];
              const ans = answers[step];
              const answered = ans !== undefined;
              const selected = node.options.find((o) => o.value === ans);
              const stepColor = answered
                ? selected?.red
                  ? "hsl(0, 75%, 48%)"
                  : "hsl(140, 55%, 42%)"
                : "hsl(var(--muted-foreground))";
              return (
                <div
                  key={step}
                  className="rounded-lg border border-border bg-background/70 p-3"
                  style={{ borderLeftWidth: 4, borderLeftColor: stepColor }}
                >
                  <div className="flex items-start gap-2 mb-2">
                    <span
                      className="flex-shrink-0 w-6 h-6 rounded-full text-[11px] font-bold flex items-center justify-center text-white"
                      style={{ backgroundColor: stepColor }}
                    >
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">{node.question}</p>
                      {showHints && node.hint && (
                        <p className="text-[11px] text-muted-foreground italic mt-0.5 leading-relaxed">{node.hint}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 ml-8">
                    {node.options.map((opt) => {
                      const isSelected = ans === opt.value;
                      const accent = opt.red ? "hsl(0, 75%, 48%)" : "hsl(140, 55%, 42%)";
                      return (
                            <button
                          key={opt.value}
                          onClick={() => setAnswers((a) => ({ ...a, [step]: opt.value }))}
                          aria-pressed={isSelected}
                          className="px-2.5 py-1 rounded-md text-[11px] font-medium border transition-all text-left"
                          style={{
                            borderColor: isSelected ? accent : "hsl(var(--border))",
                            backgroundColor: isSelected ? withAlpha(accent, 0.15) : "transparent",
                            color: isSelected
                              ? opt.red
                                ? "hsl(0, 70%, 42%)"
                                : "hsl(140, 55%, 32%)"
                              : "hsl(var(--foreground))",
                          }}
                        >
                          {opt.label}
                        </button>
    );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
  
          {/* Verdict */}
          <div className="mt-4">
            {verdict ? (
              <div
                className="p-3 rounded-lg border-2"
                style={{ borderColor: verdict.color, backgroundColor: withAlpha(verdict.color, 0.08) }}
              >
                <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                  <p className="text-sm font-bold" style={{ color: verdict.color }}>
                    {verdict.label}
                  </p>
                  <button
                    onClick={reset}
                    className="text-[10px] uppercase tracking-wide px-2 py-0.5 rounded border border-border text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
                  >
                    Reset
                  </button>
                </div>
                <p className="text-xs text-foreground/90 leading-relaxed mb-2">
                  <span className="font-semibold">Likely diagnosis: </span>
                  {verdict.diagnosis}
                </p>
                {verdict.action && (
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground/80">Action: </span>
                    {verdict.action}
                  </p>
                )}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground italic text-center py-2">
                Answer the questions above to generate a likely diagnosis and management recommendation.
              </p>
            )}
          </div>
  
          <p className="text-[11px] text-muted-foreground mt-2 italic text-center">
            Aligned with OAA/RCoA <em>Management of postpartum nerve injuries</em> (2023) and NAP3 (RCoA, 2009). Always discuss with senior obstetric anaesthetist; this tool supports — not replaces — bedside clinical judgement.
          </p>
        </div>
      </div>
    </DiagramFigure>
  );
};

export default PostpartumLegWeaknessDecisionTree;
