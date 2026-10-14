import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";
const R1 = () => <InlineRef topicId="ophthalmic-anaesthesia" refLabel="Guay 2015 Cochrane" />;
const R2 = () => <InlineRef topicId="ophthalmic-anaesthesia" refLabel="OCR JAMC 2023" />;

export function OphthalmicEvidenceTeaching() {
  return <div className="space-y-4 text-muted-foreground leading-relaxed">
    <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Topical versus Sub-Tenon's: What the Trials Actually Show</h2>
    <p>Topical anaesthesia (± intracameral injection) and sub-Tenon's block are both accepted techniques for cataract surgery, but the evidence base is thinner and more nuanced than most viva answers suggest. A Cochrane review updated in 2015 pooled seven randomised trials in 742 operated eyes of 617 participants (mean ages 71.5–83.5). Compared with sub-Tenon's, topical anaesthesia <strong className="text-foreground">increased intra-operative pain</strong> but <strong className="text-foreground">decreased pain at 24 hours</strong>. The size of the effect, however, was small — equivalent to about 1.1 points on a 0–10 pain scale intra-operatively and 0.2 points at 24 hours — statistically significant but probably too small to matter to patients. The quality of this evidence was rated high for intra-operative pain and moderate at 24 hours.<R1 /></p>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">Surgeon and patient satisfaction:</strong> both were lower with topical anaesthesia (moderate and low quality evidence respectively) — relevant because a moving eye under a microscope is a surgical problem, not just a comfort problem.<R1 /></li>
      <li><strong className="text-foreground">Complications:</strong> there was not enough evidence to say whether one technique causes more intra-operative complications than the other. The safety advantage of avoiding a needle is biologically plausible but has never been demonstrated in a randomised trial at the frequencies involved.<R1 /></li>
      <li><strong className="text-foreground">Practice point:</strong> "needle blocks are dangerous, drops are safer" overstates the evidence. The honest position is that both are safe and effective in trained hands, topical is more painful during surgery, and the choice should reflect patient cooperation, surgical requirements and local complication experience.</li>
    </ul>

    <h3 className="text-lg font-serif font-bold text-foreground pt-2">Quantifying the Oculocardiac Reflex</h3>
    <p>The reflex is conventionally quoted as occurring in 30–90% of strabismus operations. A randomised study in 124 children (mean age 9.45 years) undergoing squint surgery under general anaesthesia recorded the oculocardiac reflex in 90.3% of the control group versus 21% of children given a sub-Tenon's bupivacaine injection — a reminder that the quoted incidence depends heavily on the monitoring threshold used (a fall in heart rate of &gt;15% from baseline counts in this study) and on whether a block has blunted the afferent limb. It also reinforces the practical point that surgeon-performed sub-Tenon's or topical local anaesthetic reduces reflex episodes.<R2 /></p>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">Interpret with care:</strong> this is a single-centre study with a deliberately sensitive definition; the 90% figure represents "any significant bradycardic episode", not clinically dangerous bradycardia. The management principle is unchanged — release the stimulus first, deepen anaesthesia, and use atropine only for persistent or profound bradycardia.<R2 /></li>
    </ul>

    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: what was the main randomised difference between topical and sub-Tenon's anaesthesia?</summary><p className="mt-2">Topical anaesthesia caused slightly more intra-operative pain (about 1.1 points on a 0–10 scale) but slightly less pain at 24 hours (0.2 points) — both statistically significant but too small to be clinically important. Evidence on complications was insufficient to separate the techniques.</p></details>
    <LessonSources topicId="ophthalmic-anaesthesia" labels={["Guay 2015 Cochrane", "OCR JAMC 2023"]} />
  </div>;
}
