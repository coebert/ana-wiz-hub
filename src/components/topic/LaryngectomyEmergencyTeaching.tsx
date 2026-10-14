import { InlineRef } from "@/components/references/InlineRef";

const Source = () => <InlineRef topicId="ent-anaesthesia" refLabel="NTSP Laryngectomy Algorithm" />;

export function LaryngectomyEmergencyTeaching() {
  return (
    <section aria-labelledby="laryngectomy-emergency-heading" className="mt-6 space-y-4 text-sm text-muted-foreground leading-relaxed">
      <h3 id="laryngectomy-emergency-heading" className="text-lg font-semibold text-foreground">Laryngectomy emergency: recognise the anatomy, then follow the red algorithm</h3>
      <p>A total laryngectomy separates the trachea permanently from the pharynx. The trachea ends at the neck stoma: oxygen delivered to the nose, face-mask ventilation and oral intubation cannot reach the lungs. A tracheostomy is different: the larynx remains, although the upper airway may be obstructed or unusable. Check the bedhead sign, history and operative record, but do not delay oxygen while establishing the anatomy. If the type of neck airway is uncertain, apply oxygen to both the face and stoma until total laryngectomy is confirmed.<Source /></p>
      <div className="border-l-4 border-destructive pl-4 py-2">
        <p className="font-semibold text-foreground">Confirmed total laryngectomy: oxygenate and ventilate through the stoma, not the mouth.</p>
        <p>Most laryngectomy stomas have no tube. Do not confuse a removable stoma cover or inner cannula with a tracheo-oesophageal puncture (TEP) voice prosthesis: the NTSP algorithm explicitly says not to remove the TEP prosthesis.<Source /></p>
      </div>
      <ol className="list-decimal pl-5 space-y-3">
        <li><strong className="text-foreground">Call, assess and oxygenate.</strong> Call airway-expert help. Assess breathing at the stoma, deliver high-flow oxygen there and use waveform capnography whenever available. If there are no signs of life, call the resuscitation team and start CPR; airway troubleshooting takes place alongside resuscitation, not instead of it.<Source /></li>
        <li><strong className="text-foreground">Remove simple obstructions.</strong> Remove a stoma cover and any removable inner tube. Some tubes require the inner cannula to connect to a breathing circuit; know the device, but do not leave an obstructed cannula in place just to preserve the connector. Leave the TEP prosthesis in situ.<Source /></li>
        <li><strong className="text-foreground">Test patency with a suction catheter.</strong> If a catheter passes, perform tracheal suction, consider partial obstruction and reassess breathing. Passage indicates patency but does not prove adequate ventilation or exclude a distal mucus plug. If the patient is not breathing, ventilate via the stoma.<Source /></li>
        <li><strong className="text-foreground">If the catheter will not pass, deflate a cuff if present.</strong> Reassess at the stoma or tube with capnography where available. If the patient is not stable or improving, remove the tube from the laryngectomy stoma if one is present, reapply oxygen to the exposed stoma and reassess. Do not persist in ventilating through a potentially blocked or displaced tube.<Source /></li>
        <li><strong className="text-foreground">Primary rescue ventilation.</strong> Seal a paediatric face mask or a laryngeal mask over the neck stoma and ventilate through it. The laryngeal mask is applied externally to the stoma, not inserted into the mouth. Assess chest movement and exhaled carbon dioxide; reassess a poor seal, obstruction or ineffective ventilation rather than assuming oxygen flow alone is sufficient.<Source /></li>
        <li><strong className="text-foreground">Secondary rescue airway.</strong> An airway-skilled clinician may intubate the stoma with a small tracheostomy tube or a 6.0 cuffed tracheal tube, as illustrated in the adult NTSP algorithm. This is an algorithm example, not a size guaranteed to fit every stoma. A flexible scope, Aintree catheter, bougie or airway-exchange catheter may assist. Confirm effective ventilation with waveform capnography and avoid an excessively deep tube in the short stomal-to-carinal distance.<Source /></li>
      </ol>
      <h4 className="font-semibold text-foreground">After oxygenation is restored</h4>
      <p>Continue ABCDE assessment: resolving a blocked cannula does not exclude infection, distal obstruction or another cause of deterioration. Document the anatomy, airway device and intervention; restore the appropriate bedhead sign, suction, humidification and emergency equipment before handover. The official algorithm is consensus emergency guidance, not a substitute for device-specific training or specialist assessment.<Source /></p>
      <h4 className="font-semibold text-foreground">Viva application</h4>
      <p>“A neck-breather is cyanosed and the catheter will not pass. I call for help and give oxygen to the stoma, adding face oxygen if the anatomy is uncertain. I remove the cover and inner cannula, leave the voice prosthesis alone, deflate any cuff and reassess. If there is no improvement I remove the obstructing tube, then ventilate over the stoma and escalate to a capnography-confirmed stomal airway. Oral intubation cannot help a confirmed total laryngectomy.”<Source /></p>
    </section>
  );
}