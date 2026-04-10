import { SectionLayout } from "@/components/SectionLayout";
import { KeyLearningPoints } from "@/components/KeyLearningPoints";
import { QuizSection } from "@/components/QuizSection";
import { TopicCompletionToggle } from "@/components/TopicCompletionToggle";
import { gynaecologicalAnaesthesiaQuestions } from "@/data/quizzes";
import { ReferencesList } from "@/components/ReferencesList";
import { SeeAlso } from "@/components/SeeAlso";

const GynaecologicalAnaesthesiaTopic = () => {
  return (
    <SectionLayout title="Gynaecological Anaesthesia" subtitle="FRCA Final — Clinical Anaesthesia" backPath="/clinical" backLabel="Clinical Anaesthesia" accentColor="text-clinical">
      <section className="space-y-6 mb-10">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            Gynaecological surgery encompasses a wide range from minor day-case procedures (hysteroscopy, laparoscopic sterilisation) to major oncological operations (radical hysterectomy, pelvic exenteration). Key considerations include laparoscopic pneumoperitoneum effects, positioning (Trendelenburg/lithotomy), venous thromboembolism risk, and the increasing role of robotic surgery.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Laparoscopic Gynaecological Surgery</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Most gynaecological procedures are now laparoscopic or robotic. The combination of pneumoperitoneum and steep Trendelenburg creates unique physiological challenges.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { label: "Pneumoperitoneum", value: "CO₂ insufflation to 12–15 mmHg — ↑ PaCO₂ (absorption), ↑ SVR, ↓ venous return, ↓ renal blood flow" },
              { label: "Trendelenburg", value: "↑ Preload, ↑ ICP, ↑ IOP, laryngeal/facial oedema, cephalad diaphragm shift → ↓ FRC" },
              { label: "Ventilation", value: "↑ Peak pressures, ↓ compliance — use lung-protective settings, ↑ RR to maintain normocapnia" },
              { label: "Shoulder tip pain", value: "Diaphragmatic irritation from residual CO₂ — postop; may mimic cardiac pain" },
              { label: "Gas embolism", value: "Rare but catastrophic — mill-wheel murmur, cardiovascular collapse; treat with left lateral, aspirate via CVC" },
              { label: "Subcutaneous emphysema", value: "CO₂ tracking into tissues — ↑ ETCO₂, crepitus; usually self-limiting" },
            ].map((item) => (
              <div key={item.label} className="p-3 rounded-lg bg-secondary/30 border border-border">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="font-semibold text-foreground text-sm">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Robotic Gynaecological Surgery</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Robotic-assisted procedures require prolonged steep Trendelenburg (up to 30°) and pneumoperitoneum, often for 3–6 hours.
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
            <li><strong>Airway</strong>: facial/laryngeal oedema may preclude extubation — assess with cuff leak test; avoid re-intubation if significant oedema</li>
            <li><strong>Eyes</strong>: ↑ IOP from Trendelenburg + pneumoperitoneum; risk of ischaemic optic neuropathy</li>
            <li><strong>Brachial plexus</strong>: arms tucked at sides; shoulder braces avoided (brachial plexus stretch injury)</li>
            <li><strong>Access</strong>: robot docked over patient — limited access to airway; secure ETT and lines meticulously before docking</li>
            <li><strong>Conversion</strong>: plan for emergency undocking (typically 2–3 min); communication with surgical team essential</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Hysteroscopy</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Diagnostic hysteroscopy is often performed under local anaesthesia or sedation. Operative hysteroscopy (resection of fibroids, endometrial ablation) requires GA or spinal.
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
            <li><strong>Fluid absorption</strong>: similar risk to TURP syndrome with glycine distension media — monitor fluid deficit (&lt;1000 ml with glycine, &lt;2500 ml with saline)</li>
            <li><strong>Uterine perforation</strong>: may cause intraperitoneal haemorrhage; requires laparoscopy/laparotomy</li>
            <li><strong>Gas embolism</strong>: rare with liquid media; risk with air entrainment via open cervix</li>
            <li><strong>Cervical stimulation</strong>: may cause vasovagal bradycardia — atropine/glycopyrrolate ready</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Major Gynaecological Oncology</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Radical hysterectomy, pelvic exenteration, and debulking surgery for ovarian cancer are major procedures with significant morbidity.
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
            <li><strong>Duration</strong>: 4–8+ hours; risk of hypothermia, pressure injury, DVT</li>
            <li><strong>Blood loss</strong>: potentially massive — crossmatch, cell salvage controversial in malignancy (leucodepletion filters)</li>
            <li><strong>Ovarian cancer</strong>: patients often cachectic with ascites, pleural effusions, hypoalbuminaemia</li>
            <li><strong>Analgesia</strong>: epidural (T8–T10 level) or TAP/rectus sheath blocks; multimodal approach</li>
            <li><strong>VTE prophylaxis</strong>: LMWH + mechanical prophylaxis; high-risk population for PE</li>
            <li><strong>ERAS protocols</strong>: increasingly adopted — early oral intake, early mobilisation, minimise opioids</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Ectopic Pregnancy — Anaesthetic Considerations</h2>
          <p className="text-muted-foreground leading-relaxed">
            Unruptured ectopic may be managed laparoscopically as an elective/urgent case. Ruptured ectopic is covered in the Emergency Surgery topic. For unruptured cases: standard laparoscopic anaesthesia, awareness of haemorrhage risk, crossmatch available, and anti-D immunoglobulin for Rh-negative patients.
          </p>
        </div>
      </section>

      <KeyLearningPoints points={[
        "Pneumoperitoneum + steep Trendelenburg: ↑ PaCO₂, ↓ FRC, ↑ IOP/ICP, facial oedema",
        "Robotic surgery: prolonged position → airway oedema; plan for difficult extubation; limited patient access",
        "Hysteroscopy fluid absorption: monitor deficit — glycine limit 1000 ml, saline limit 2500 ml",
        "CO₂ gas embolism: mill-wheel murmur, cardiovascular collapse — left lateral + CVC aspiration",
        "Major oncology: elderly/cachectic patients, massive blood loss, thoracic epidural, ERAS protocols",
      ]} />

      <QuizSection questions={gynaecologicalAnaesthesiaQuestions} />
      <ReferencesList topicId="gynaecological-anaesthesia" />
      <SeeAlso topicId="gynaecological-anaesthesia" />
        <TopicCompletionToggle topicId="gynaecological-anaesthesia" topicTitle="Gynaecological Anaesthesia" />
    </SectionLayout>
  );
};

export default GynaecologicalAnaesthesiaTopic;
