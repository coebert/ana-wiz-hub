import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";

const T = "mechanical-ventilation";
const R = ({ label }: { label: string }) => <InlineRef topicId={T} refLabel={label} />;
const H = ({ children }: { children: React.ReactNode }) => <h3 className="text-lg font-semibold text-foreground">{children}</h3>;
const B = ({ children }: { children: React.ReactNode }) => <strong className="text-foreground">{children}</strong>;
const Check = ({ q, a }: { q: string; a: string }) => (
  <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: {q}</summary><p className="mt-2">{a}</p></details>
);

const families = [
  {
    family: "Volume-targeted pressure control (dual / adaptive pressure control)",
    names: "PRVC — Getinge (Maquet) Servo; AutoFlow — Dräger; VC+ — Medtronic Puritan Bennett; APVcmv — Hamilton Medical; PCV-VG — GE HealthCare",
    what: "Pressure-controlled breaths, but the ventilator adjusts the inspiratory pressure breath by breath to reach a set tidal volume. The guideline classes PRVC (and AutoFlow) as volume control with adaptive pressure changes.",
    ref: "S3 Ventilation 2025 (mode table)",
  },
  {
    family: "Biphasic / airway pressure release (two CPAP levels)",
    names: "BIPAP — Dräger; BiLevel — Medtronic Puritan Bennett; Bi-Vent — Getinge (Maquet); DuoPAP — Hamilton Medical; APRV — available on most platforms",
    what: "Time-controlled switching between two pressure levels, with spontaneous breathing possible at both. The guideline notes these are different names for the same basic principle, and that many versions let the patient trigger the switch, like SIMV. APRV is the extreme setting: long high-pressure time and a brief release.",
    ref: "S3 Ventilation 2025 (BIPAP family)",
  },
  {
    family: "Adaptive (optimal) targeting",
    names: "ASV — Hamilton Medical",
    what: "Pressure-controlled or pressure-supported breaths whose size and rate the ventilator chooses from measured lung mechanics, aiming to minimise work of breathing for a set minute ventilation.",
    ref: "S3 Ventilation 2025 (mode table)",
  },
  {
    family: "Intelligent / fully closed-loop",
    names: "INTELLiVENT-ASV — Hamilton Medical",
    what: "ASV plus automatic adjustment of oxygenation (PEEP and FiO₂) and ventilation from SpO₂ and end-tidal CO₂ feedback.",
    ref: "Arnal 2012 (IntelliVent-ASV)",
  },
  {
    family: "Servo targeting from the diaphragm",
    names: "NAVA — Getinge (Maquet) Servo",
    what: "Support in proportion to the electrical activity of the diaphragm (Edi), measured by a dedicated nasogastric catheter. Edi triggers and cycles the breath, so timing follows the patient's own neural drive.",
    ref: "S3 Ventilation 2025 (mode table)",
  },
  {
    family: "Servo targeting from flow and volume",
    names: "PAV+ — Medtronic Puritan Bennett; (PPS — Dräger, proportional pressure support)",
    what: "Pressure rises in proportion to the patient's own instantaneous flow and volume, so support scales with effort. PAV+ measures resistance and compliance automatically to set the gain.",
    ref: "Xirouchaki 2008 (PAV+)",
  },
  {
    family: "Knowledge-based weaning",
    names: "SmartCare/PS — Dräger",
    what: "Automatically adjusts pressure support to keep the patient in a target comfort zone (rate, tidal volume, end-tidal CO₂), reduces support step by step and runs a spontaneous breathing trial.",
    ref: "Lellouche 2006 (SmartCare)",
  },
];

export function ProprietaryModesTeaching() {
  return <div className="space-y-4 text-sm text-muted-foreground leading-relaxed mt-6 mb-4">
    <H>Proprietary modes: same physics, different brand names</H>
    <p>Manufacturers and the academic community have never agreed a standard way to name modes, and the resulting confusion puts education and patient care at risk.<R label="Chatburn 2007 (mode classification)" /> Most "new" modes are not new physics. They are different <B>targeting schemes</B>: the closed-loop rules the ventilator uses to adjust its output. Chatburn describes six: <B>set-point, dual, servo, adaptive, optimal and intelligent</B>.<R label="Chatburn 2011 (targeting schemes)" /> The practical skill is to translate any brand name into breath type (trigger, target, cycle) and targeting scheme.</p>

    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead><tr className="border-b border-border">
          <th className="text-left py-2 pr-3 text-foreground font-semibold">Mode family</th>
          <th className="text-left py-2 pr-3 text-foreground font-semibold">Brand names (manufacturer)</th>
          <th className="text-left py-2 text-foreground font-semibold">What it does</th>
        </tr></thead>
        <tbody>
          {families.map((f) => (
            <tr key={f.family} className="border-b border-border align-top">
              <td className="py-2 pr-3 font-medium text-foreground">{f.family}</td>
              <td className="py-2 pr-3">{f.names}</td>
              <td className="py-2">{f.what}<R label={f.ref} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-xs">Which manufacturer markets each brand name is product labelling, not a quoted source. Names and availability vary by ventilator model and software version, so check the operator's manual for your machine.</p>

    <H>What the evidence says about the newer modes</H>
    <ul className="list-disc list-inside space-y-1">
      <li><B>ASV / INTELLiVENT-ASV:</B> the 2025 German S3 guideline <em>suggests considering</em> partly or fully automated ventilation, with very low certainty of evidence.<R label="S3 Ventilation 2025 (adaptive recs)" /> In Arnal's crossover study of 50 sedated patients, INTELLiVENT-ASV lowered plateau pressure (24 to 20 cmH₂O) and FiO₂ (40% to 30%) compared with ASV over 2 hours.<R label="Arnal 2012 (IntelliVent-ASV)" /></li>
      <li><B>NAVA:</B> the guideline also <em>suggests considering</em> NAVA, again with very low certainty: trials show better synchrony than pressure support but no proven benefit in mortality or ventilation duration.<R label="S3 Ventilation 2025 (adaptive recs)" /></li>
      <li><B>PAV / PAV+:</B> an early randomised study of 208 patients found fewer failures (11.1% v 22.0%) and less major dyssynchrony (5.6% v 29.0%) than pressure support.<R label="Xirouchaki 2008 (PAV+)" /> But the guideline makes a <em>weak recommendation against</em> it: a later multicentre trial showed no benefit and frequent intolerance, with a mode change needed in 42%.<R label="S3 Ventilation 2025 (adaptive recs)" /><R label="S3 Ventilation 2025 (PAV intolerance)" /></li>
      <li><B>SmartCare/PS:</B> in a 144-patient multicentre trial, computer-driven weaning cut median weaning time from 5 to 3 days and total ventilation from 12 to 7.5 days, with no difference in reintubation. Usual care in that trial ran spontaneous breathing trials only about half the time, which may explain part of the effect.<R label="Lellouche 2006 (SmartCare)" /></li>
    </ul>

    <H>Practical traps</H>
    <ul className="list-disc list-inside space-y-1">
      <li><B>"BIPAP" on an ICU ventilator is not NIV BiPAP.</B> On a Dräger ventilator it is the biphasic invasive mode described above. The same name is used loosely elsewhere for non-invasive bilevel support. Always confirm which is meant.<R label="S3 Ventilation 2025 (BIPAP family)" /></li>
      <li><B>Volume-targeted pressure modes chase the set volume.</B> If the patient makes a big effort, the ventilator lowers its pressure to hold the volume, which can reduce support when the patient most needs it. This follows from how the targeting works; it is teaching reasoning, not a quoted source.</li>
      <li><B>Automation does not replace lung-protective limits.</B> The guideline urges caution with automated modes, monitoring tidal volume and driving pressure to avoid inadvertent overdistension.<R label="S3 Ventilation 2025 (adaptive recs)" /></li>
    </ul>

    <Check q="you move from a Getinge Servo on PRVC to a Dräger ventilator. What is the equivalent mode?" a="AutoFlow (volume-targeted pressure control). Both give pressure-controlled breaths with the pressure adjusted breath by breath to reach a set tidal volume." />
    <Check q="what do BIPAP, BiLevel, Bi-Vent and DuoPAP have in common?" a="They are brand names for the same principle: time-cycled alternation between two pressure levels with spontaneous breathing allowed at both. APRV is the variant with a long high-pressure phase and a short release." />
    <Check q="why does the 2025 guideline recommend against PAV/PAV+ despite an early positive trial?" a="A later multicentre randomised trial showed no benefit in ventilation duration or other outcomes, and intolerance was common, with a mode change needed in 42%. The guideline judged no reproducible benefit against a non-trivial risk of harm." />
    <LessonSources topicId={T} labels={["Chatburn 2007 (mode classification)", "Chatburn 2011 (targeting schemes)", "S3 Ventilation 2025 (mode table)", "S3 Ventilation 2025 (BIPAP family)", "S3 Ventilation 2025 (adaptive recs)", "S3 Ventilation 2025 (PAV intolerance)", "Arnal 2012 (IntelliVent-ASV)", "Xirouchaki 2008 (PAV+)", "Lellouche 2006 (SmartCare)"]} />
  </div>;
}
