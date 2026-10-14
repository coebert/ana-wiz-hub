import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";

const T = "anaesthesia-basics";
const R = ({ label }: { label: string }) => <InlineRef topicId={T} refLabel={label} />;
const H = ({ children }: { children: React.ReactNode }) => <h3 className="text-lg font-semibold text-foreground">{children}</h3>;
const B = ({ children }: { children: React.ReactNode }) => <strong className="text-foreground">{children}</strong>;
const Check = ({ q, a }: { q: string; a: string }) => (
  <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: {q}</summary><p className="mt-2">{a}</p></details>
);
const wrap = "space-y-4 text-sm text-muted-foreground leading-relaxed mt-5 mb-4";

export function EegMonitoringTeaching() {
  return <div className={wrap}>
    <H>What a depth-of-anaesthesia monitor actually measures</H>
    <p>Processed EEG monitors such as the Bispectral Index (BIS), E-Entropy and Narcotrend reduce the EEG to a single number. <B>The widely used indices assume that the same value means the same level of unconsciousness whatever drug is given.</B> Purdon and colleagues argue that this assumption is wrong: different anaesthetics act on different receptors and neural circuits and produce distinct brain states that can be seen directly in the raw EEG.<R label="Purdon 2015" /></p>

    <H>Reading the raw EEG: drug signatures</H>
    <ul className="list-disc list-inside space-y-1">
      <li><B>Propofol sedation:</B> alpha and beta oscillations.<R label="Purdon 2015 signatures" /></li>
      <li><B>Propofol unconsciousness:</B> slow-delta and alpha oscillations together; slow oscillations alone are common at induction.<R label="Purdon 2015 signatures" /></li>
      <li><B>Burst suppression:</B> a state of profound drug-induced brain inactivation, commonly seen in elderly patients, in anaesthetic-induced coma and in profound hypothermia. It means the brain is more deeply anaesthetised than unconsciousness requires.<R label="Purdon 2015 signatures" /></li>
      <li><B>Ketamine:</B> produces a high-frequency beta oscillation, because it blocks inhibitory interneurons. A processed index built on the propofol and volatile pattern can therefore read misleadingly "light" in a patient who is unconscious on ketamine.<R label="Purdon 2015 signatures" /></li>
    </ul>

    <H>What NICE recommends</H>
    <p>NICE recommends EEG-based depth-of-anaesthesia monitors as an option during any general anaesthetic in patients at higher risk of adverse outcomes. That includes patients at higher risk of awareness and those at higher risk of excessively deep anaesthesia. NICE also recommends them as an option in <B>all patients receiving TIVA</B>. BIS, E-Entropy and Narcotrend-Compact M are treated as broadly equivalent.<R label="NICE HTG292 (DG6)" /></p>
    <p>NICE adds that users need training and must understand the monitors' limitations. It lists high opiate or alcohol use, airway problems and previous awareness as higher-risk groups for awareness.<R label="NICE HTG292 risk groups" /></p>

    <Check q="a patient is sedated with ketamine and the processed index reads high. Is the patient awake?" a="Not necessarily. Ketamine's EEG signature is high-frequency beta activity, which an index calibrated on propofol and volatile agents can read as 'light'. Look at the raw EEG and the clinical picture rather than the number alone." />
    <Check q="which patients does NICE single out for a depth-of-anaesthesia monitor?" a="Patients at higher risk of adverse outcomes, meaning higher risk of awareness or of excessively deep anaesthesia, and every patient receiving TIVA." />
    <LessonSources topicId={T} labels={["Purdon 2015", "Purdon 2015 signatures", "NICE HTG292 (DG6)", "NICE HTG292 risk groups"]} />
  </div>;
}

export function AwarenessRiskTeaching() {
  return <div className={wrap}>
    <H>How common is accidental awareness? NAP5</H>
    <p>The 5th National Audit Project (NAP5) collected every reported case of accidental awareness during general anaesthesia in the UK and Ireland and matched it to a national activity survey. <B>With neuromuscular block the incidence was about 1 in 8,200; without it, about 1 in 135,900.</B> The reported cases were overwhelmingly cases of awareness during neuromuscular block. During Caesarean section it was about 1 in 670.<R label="NAP5 2014" /></p>
    <p><B>Two-thirds of experiences arose at induction or emergence</B>, not during maintenance. At induction, contributing factors were thiopental, rapid sequence induction, obesity, difficult airway management, neuromuscular block and interruptions in anaesthetic delivery while moving from the anaesthetic room to theatre. At emergence, patients often perceived residual paralysis as awareness because full return of motor power had not been confirmed.<R label="NAP5 2014" /></p>

    <H>Who is at risk</H>
    <p>NAP5 found higher risk with female sex, younger adults (but not children), obesity, junior trainees, previous awareness, out-of-hours operating, emergencies, obstetric, cardiac and thoracic surgery, and neuromuscular block. ASA grade, race and the use or omission of nitrous oxide were <B>not</B> risk factors.<R label="NAP5 2014 risk factors" /></p>

    <H>Does a BIS monitor prevent it? The trials disagree</H>
    <ul className="list-disc list-inside space-y-1">
      <li><B>B-Aware (2004):</B> 2,463 at-risk adults given relaxant anaesthesia. Awareness occurred in 2 patients in the BIS group and 11 with routine care, an 82% risk reduction.<R label="B-Aware 2004" /></li>
      <li><B>B-Unaware (2008):</B> high-risk patients randomised to BIS-guided (target 40–60) or end-tidal gas-guided anaesthesia (0.7–1.3 MAC). There were 2 definite cases in each group, and awareness happened even with both values in range. The authors concluded their findings did not support routine BIS monitoring.<R label="B-Unaware 2008" /></li>
      <li><B>BAG-RECALL (2011):</B> 6,041 high-risk patients. Definite awareness occurred in 7 of 2,861 in the BIS group and 2 of 2,852 in the end-tidal group, so BIS was not shown to be superior.<R label="BAG-RECALL 2011" /></li>
    </ul>
    <p>The difference is the comparator. B-Aware compared BIS with routine care, while the US trials compared BIS with a structured end-tidal gas protocol. With a volatile agent, a measured end-tidal concentration with alarms performs at least as well as BIS. That reasoning is drawn from the trial designs, not stated by any single source.</p>

    <Check q="in NAP5, what single factor most changed the incidence of awareness?" a="Neuromuscular block: about 1 in 8,200 with it versus about 1 in 135,900 without. Cases were overwhelmingly during neuromuscular block, and two-thirds arose at induction or emergence." />
    <Check q="why did BAG-RECALL not repeat the B-Aware result?" a="B-Aware compared BIS with routine care. BAG-RECALL compared BIS with an end-tidal anaesthetic concentration protocol with alarms, and the BIS protocol was not superior (7 of 2,861 v 2 of 2,852 definite cases)." />
    <LessonSources topicId={T} labels={["NAP5 2014", "NAP5 2014 risk factors", "B-Aware 2004", "B-Unaware 2008", "BAG-RECALL 2011"]} />
  </div>;
}

export function TivaBasicsTeaching() {
  return <div className={wrap}>
    <H>Why every anaesthetist needs TIVA</H>
    <p>Volatile maintenance remains the commonest technique in the UK and Ireland. But an inhalational technique is sometimes not possible, and sometimes contraindicated, so the joint Association of Anaesthetists and Society for Intravenous Anaesthesia guideline says <B>all anaesthetists should be able to deliver TIVA competently and safely</B>. The guideline deliberately sets out safe practice rather than arguing that TIVA is better than volatile anaesthesia where both are possible.<R label="AoA/SIVA TIVA 2019" /></p>

    <H>Why TIVA changes the awareness picture</H>
    <p>With a volatile agent you can measure the end-tidal concentration. With TIVA there is no equivalent measured drug concentration, and the infusion depends on an intact line and pump. (That is teaching reasoning, not a quoted source.) NICE recommends an EEG-based depth-of-anaesthesia monitor as an option in <B>all</B> patients receiving TIVA.<R label="NICE HTG292 (DG6)" /> NAP5 also identified interruptions in anaesthetic delivery, such as the move from the anaesthetic room to theatre, as a contributor to awareness at induction.<R label="NAP5 2014" /></p>
    <p>For pump models, target-controlled infusion and practical line set-up, see the full TIVA page.</p>

    <Check q="what does the 2019 joint guideline say about TIVA versus volatile anaesthesia?" a="That all anaesthetists should be able to give TIVA competently and safely, because volatile is sometimes impossible or contraindicated. It explicitly does not set out to say which technique is better when both are possible." />
    <LessonSources topicId={T} labels={["AoA/SIVA TIVA 2019", "NICE HTG292 (DG6)", "NAP5 2014"]} />
  </div>;
}
