import { InlineRef } from "@/components/references/InlineRef";
import { LessonSources } from "@/components/topic/LessonSources";
const R = () => <InlineRef topicId="resource-poor-anaesthesia" refLabel="Gerber 2024 ASOS caesarean" />;

export function LowResourceCaesareanTeaching() {
  return <div className="space-y-4 text-muted-foreground leading-relaxed">
    <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Spinal or General Anaesthesia for Caesarean Delivery in Africa: What ASOS Shows</h2>
    <p>Caesarean delivery was the commonest operation in the African Surgical Outcomes Study. A 2024 secondary analysis looked at 3,709 caesarean deliveries in 22 African countries. Spinal anaesthesia was used in 2,968 (80%) and general anaesthesia in 741 (20%).<R /></p>
    <h3 className="text-lg font-semibold text-foreground">Who received general anaesthesia?</h3>
    <ul className="list-disc pl-5 space-y-1">
      <li>General anaesthesia was independently associated with ASA III (adjusted OR 11.84) and ASA IV (11.48), eclampsia (3.92), placental abruption (6.23), ruptured uterus (3.61) and increasing gestational age (1.093 per unit).<R /></li>
      <li>Spinals were still often given to high-risk women: 51.1% of those with eclampsia, 42.9% with cardiac disease, 73.7% with sepsis, 63.2% with antepartum haemorrhage, 54.5% with placenta praevia, 42.3% with abruption and 41.4% with a ruptured uterus.<R /></li>
    </ul>
    <h3 className="text-lg font-semibold text-foreground">Outcomes</h3>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">Anaesthesia complications:</strong> 1.2% after general vs 0.1% after spinal anaesthesia (9/741 vs 3/2,968; P &lt; 0.001).<R /></li>
      <li><strong className="text-foreground">Neonatal death (unadjusted):</strong> 9.8% vs 2.7% (P &lt; 0.001). After adjustment for risk factors, the method of anaesthesia was <em>not</em> associated with neonatal death or maternal hypotension. The sicker mothers and babies were the ones receiving general anaesthesia.<R /></li>
      <li><strong className="text-foreground">Authors' recommendation:</strong> train providers in how to choose the anaesthetic technique, how to give general anaesthesia safely, and how to resuscitate newborns.<R /></li>
    </ul>
    <p><strong className="text-foreground">Practice point:</strong> spinal anaesthesia is usually the safer default. But high-risk cases such as haemorrhage, eclampsia or a ruptured uterus will still need general anaesthesia, and a team that can do safe GA and neonatal resuscitation must be available.</p>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: does ASOS show that general anaesthesia causes neonatal death after caesarean?</summary><p className="mt-2">No. Unadjusted neonatal death was higher after GA (9.8% vs 2.7%), but after adjusting for risk factors there was no association. GA was given to higher-risk cases (confounding by indication).</p></details>
    <LessonSources topicId="resource-poor-anaesthesia" labels={["Gerber 2024 ASOS caesarean"]} />
  </div>;
}
