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

export function AnaestheticAgentsTeaching() {
  return <div className={wrap}>
    <H>Volatile agents: MAC falls with age</H>
    <p>Minimum alveolar concentration (MAC) is the end-expired concentration used to compare the potency of inhaled agents. Nickalls and Mapleson turned Mapleson's 1996 meta-analysis of MAC data into age-related iso-MAC charts for isoflurane, sevoflurane and desflurane. <B>To give a total of 1.2 MAC with isoflurane and 67% nitrous oxide, a 95-year-old needs an end-expired isoflurane of only 0.25%, compared with 1% in a 5-year-old.</B> The charts let a consistent total MAC be kept when the nitrous oxide concentration changes, reducing the chance of inadvertent awareness, particularly at the extremes of age.<R label="Nickalls & Mapleson 2003" /></p>
    <p>The practical point: one fixed "1 MAC" dial setting overdoses the very old and can underdose the young. That is teaching reasoning drawn from the charts, not a separate source.</p>

    <H>Nitrous oxide: ENIGMA-II</H>
    <p>ENIGMA-II randomised 7,112 patients aged 45 or over with known or suspected coronary artery disease, having major non-cardiac surgery, to anaesthesia with or without nitrous oxide. <B>Death and cardiovascular complications at 30 days occurred in 8% of each group</B> (relative risk 0.96). Surgical site infection was also no different (9% each). <B>Severe nausea and vomiting was higher with nitrous oxide: 15% versus 11%.</B> The authors concluded the findings support its safety in major non-cardiac surgery, that its emetogenic effect can be controlled with antiemetic prophylaxis, and that it reduced volatile use.<R label="ENIGMA-II 2014" /></p>

    <H>Propofol versus volatile: the PONV trade-off (IMPACT)</H>
    <p>The IMPACT factorial trial randomised high-risk patients across six interventions. <B>Propofol reduced the risk of postoperative nausea and vomiting by 19%, and avoiding nitrous oxide (nitrogen) by 12%.</B> Together, that is TIVA, the reduction was similar to any one antiemetic (ondansetron, dexamethasone and droperidol each about 26%). All interventions acted independently, so combined relative risks can be multiplied. Absolute benefit depends on the patient's baseline risk.<R label="IMPACT 2004" /></p>

    <Check q="a 90-year-old is maintained on sevoflurane at the dial setting you would use for a 30-year-old. What is the concern?" a="MAC falls with age. The iso-MAC charts show the very elderly need much lower end-expired concentrations for the same total MAC, so the patient is likely to be deeper than intended." />
    <Check q="what did ENIGMA-II show about nitrous oxide in patients with coronary disease?" a="No difference in death or cardiovascular complications at 30 days (8% in each group) and no difference in wound infection, but more severe nausea and vomiting (15% versus 11%)." />
    <LessonSources topicId={T} labels={["Nickalls & Mapleson 2003", "ENIGMA-II 2014", "IMPACT 2004"]} />
  </div>;
}

export function DrugInteractionsTeaching() {
  return <div className={wrap}>
    <H>Hypnotic plus opioid: synergy, not addition</H>
    <p>Bouillon and colleagues gave 20 volunteers propofol and remifentanil by target-controlled infusion, alone and together. <B>Remifentanil alone had no appreciable effect on response to shaking and shouting, or to laryngoscopy. Propofol could ablate both.</B> Yet modest remifentanil concentrations dramatically reduced the propofol needed. The authors describe this as potent synergy.<R label="Bouillon 2004" /></p>
    <p>The same study found <B>BIS was more sensitive to propofol than to remifentanil</B>. The BIS value at which 95% of subjects did not respond depended on the drug mix, with higher propofol giving lower BIS.<R label="Bouillon 2004" /> So an opioid-heavy technique can produce an unresponsive patient with a higher index than you might expect. That last inference is teaching reasoning, linking back to the EEG lesson.</p>

    <H>Volatile plus nitrous oxide: MAC fractions add up</H>
    <p>The iso-MAC charts let the contribution of nitrous oxide be counted towards total MAC. If nitrous oxide is turned down or off, the volatile must go up to keep the same total, or awareness risk rises, particularly at the extremes of age.<R label="Nickalls & Mapleson 2003" /></p>

    <H>Gabapentinoids plus opioids: respiratory depression</H>
    <p>In 8,567 patients having major laparoscopic surgery, Cavalcante and colleagues found <B>gabapentin was associated with respiratory depression in recovery (odds ratio 1.47)</B>, confirmed in a propensity-matched subset. Older patients and those given more intraoperative opioid were at higher risk, and respiratory depression lengthened recovery and increased admission to a higher level of care. The authors advise that when gabapentinoids are used, <B>intraoperative opioids must be reduced</B>, with increased vigilance, especially in the elderly.<R label="Cavalcante 2017" /> This was a retrospective single-centre study, so it shows an association, not proof of cause.</p>

    <Check q="why does a small dose of remifentanil allow a much lower propofol target for laryngoscopy?" a="The two drugs are synergistic: remifentanil alone barely suppresses the response to laryngoscopy, but modest concentrations dramatically reduce the propofol needed to ablate it (Bouillon 2004)." />
    <Check q="a frail patient had pregabalin premedication and a generous opioid dose. What should recovery staff watch for?" a="Respiratory depression. Gabapentinoid use was associated with respiratory depression in recovery (OR 1.47), with higher risk in older patients and those given more opioid. The authors advise reducing opioids and increasing vigilance." />
    <LessonSources topicId={T} labels={["Bouillon 2004", "Nickalls & Mapleson 2003", "Cavalcante 2017"]} />
  </div>;
}

export function MonitoringAlternativesTeaching() {
  return <div className={wrap}>
    <H>The UK minimum standard</H>
    <p>The Association of Anaesthetists' 2021 standards set the minimum monitoring for any patient having anaesthesia or sedation under an anaesthetist in the UK and Ireland. The 2021 edition added sections on capnography, sedation and regional anaesthesia, and updated the indications for processed EEG and neuromuscular monitoring.<R label="AoA Monitoring 2021" /> The full guideline was not available to quote, so read it directly for the specific indications.</p>

    <H>Alternative 1: end-tidal anaesthetic concentration</H>
    <p>With a volatile agent, a measured end-tidal concentration is the main alternative to a processed EEG. In BAG-RECALL, a protocol of end-tidal concentration with alarms was compared with BIS in 6,041 high-risk patients. Definite awareness occurred in 2 of 2,852 with the end-tidal protocol and 7 of 2,861 with BIS, so BIS was not shown to be superior.<R label="BAG-RECALL 2011" /> Interpreting the number needs age-adjusted MAC, because the concentration needed falls steeply in the elderly.<R label="Nickalls & Mapleson 2003" /> This alternative does not exist for TIVA, where NICE recommends a depth monitor as an option in every patient.<R label="NICE HTG292 (DG6)" /></p>

    <H>Alternative 2: the isolated forearm technique</H>
    <p>The isolated forearm technique inflates a tourniquet on one arm before neuromuscular block, so that hand can still move, then asks the patient to squeeze on command. It tests consciousness of the outside world, called connected consciousness. In a six-centre study of 260 adults, <B>4.6% (12 of 260) responded to command after intubation, and 5 of the 12 signalled pain</B>. Responders were younger, and their depth-monitor values were higher, but the values overlapped widely. <B>No participant had explicit recall afterwards.</B> In patients not on TIVA, volatile exposure before intubation reduced the odds of responding.<R label="Sanders 2017 IFT" /></p>
    <p>So connected consciousness without later recall is far commoner than the 1 in 8,200 reported awareness in NAP5.<R label="NAP5 2014" /> The two measure different things: response during anaesthesia versus reported memory afterwards. That comparison is teaching reasoning, not stated in either source.</p>

    <Check q="why is end-tidal gas monitoring a reasonable alternative to BIS with volatiles but not with TIVA?" a="BAG-RECALL found BIS was not superior to an end-tidal protocol with alarms. With TIVA there is no measured end-tidal drug concentration, and NICE recommends a depth monitor as an option in all TIVA patients." />
    <Check q="in Sanders 2017, how many patients responded on the isolated forearm after intubation, and how many recalled it?" a="12 of 260 (4.6%) responded, 5 of them signalling pain, yet no participant had explicit recall when questioned after surgery." />
    <LessonSources topicId={T} labels={["AoA Monitoring 2021", "BAG-RECALL 2011", "Nickalls & Mapleson 2003", "NICE HTG292 (DG6)", "Sanders 2017 IFT", "NAP5 2014"]} />
  </div>;
}
