import { InlineRef } from "@/components/references/InlineRef";

const R = ({ label }: { label: string }) => <InlineRef topicId="anaesthetic-risk" refLabel={label} />;
const heading = "text-lg font-semibold text-foreground";

/** Technique-specific risks: neuraxial vs peripheral, guidance method, and individual block approaches. */
export function RegionalTechniqueRiskTeaching() {
  return <div className="space-y-4">
    <h3 className={heading}>Neuraxial techniques: landmark versus ultrasound-assisted</h3>
    <p>Spinals and epidurals are usually placed by palpated landmarks; a nerve stimulator has no routine role. Pre-procedure ultrasound of the spine helps find the midline and interspace. In a meta-analysis of 14 trials (1,334 patients), it reduced failed procedures (risk ratio 0.21) and traumatic procedures (risk ratio 0.27), as well as attempts and needle redirections.<R label="Shaikh neuraxial ultrasound 2013" /> These trials were too small to show any effect on rare harms such as permanent nerve injury, haematoma or abscess, so NAP3 figures still apply. The practical benefit is mostly in patients whose landmarks are hard to feel, such as obesity, scoliosis or previous spinal surgery. Risks that depend on the type of neuraxial technique:</p>
    <ul className="list-disc pl-5 space-y-2">
      <li><strong>Single-shot spinal:</strong> a fine pencil-point needle; the main issues are hypotension, high block and a lower headache risk than an accidental puncture with a large epidural needle.</li>
      <li><strong>Epidural (catheter):</strong> accidental dural puncture with a large needle (high headache risk), catheter migration into a vein (LAST) or the intrathecal space (high or total spinal), and a catheter that must be removed safely in relation to anticoagulant timing.<R label="ASRA anticoagulation 2018" /></li>
      <li><strong>Combined spinal–epidural:</strong> combines both sets of risks; an untested epidural catheter makes later top-ups less predictable.</li>
    </ul>

    <h3 className={heading}>Peripheral blocks: landmark, nerve stimulator and ultrasound</h3>
    <p>A Cochrane review of 32 randomised trials (2,844 adults) compared ultrasound with nerve stimulation, landmark or transarterial techniques. Ultrasound gave more blocks adequate for surgery (odds ratio 2.94) and fewer needing supplementation or conversion to general anaesthesia (odds ratio 0.28). It also reduced paraesthesia during the procedure and vascular puncture, but those results came from fewer studies and were rated as imprecise.<R label="Cochrane US blocks 2015" /> In the Australian and New Zealand registry, ultrasound was also associated with less LAST.<R label="LAST registry 2013" /></p>
    <ul className="list-disc pl-5 space-y-2">
      <li><strong>Permanent nerve injury is not proven to be lower with ultrasound.</strong> The ASRA advisory on neurological complications finds that no method — ultrasound, nerve stimulation, or the two combined — has been shown to reduce the rate of nerve injury. The RCoA figure of 2–5 per 10,000 should therefore be quoted whichever method is used.<R label="ASRA neurologic advisory 2015" /><R label="RCoA PNB nerve damage" /></li>
      <li><strong>Nerve stimulator:</strong> a motor response at a very low current suggests the needle tip is close to or inside the nerve, but a response may be absent even when the tip is inside the nerve, so it is not a reliable safeguard. Avoid forceful or painful injection; injection-pressure monitoring is an extra precaution.<R label="ASRA neurologic advisory 2015" /></li>
      <li><strong>Ultrasound plus stimulator:</strong> stimulation can confirm a target that is hard to see; the combination has not been shown to reduce serious harm compared with ultrasound alone.<R label="Cochrane US blocks 2015" /></li>
      <li><strong>Landmark-only techniques:</strong> rely on anatomy and loss-of-resistance or paraesthesia. Historically they carried higher vascular puncture and failure rates and, near the pleura, a greater risk of pneumothorax.</li>
    </ul>

    <h3 className={heading}>Risks by individual block</h3>
    <div className="overflow-x-auto"><table className="w-full text-sm border-collapse">
      <thead><tr className="border-b border-border text-left text-foreground"><th className="p-2">Block</th><th className="p-2">Main block-specific risks</th><th className="p-2">Practical point</th></tr></thead>
      <tbody className="[&_td]:p-2 [&_td]:align-top [&_tr]:border-b [&_tr]:border-border">
        <tr><td><strong>Interscalene</strong> (shoulder)</td><td>Phrenic nerve block with paralysis of half the diaphragm is expected: 13 of 13 patients in a classic study using large-volume injection found by paraesthesia.<R label="Urmey interscalene 1991" /> Also Horner syndrome, hoarseness (recurrent laryngeal nerve), injection into the vertebral artery or spread to the epidural or intrathecal space, rare pneumothorax, and sudden low heart rate and blood pressure when sitting upright.</td><td>Smaller volumes under ultrasound reduce but do not remove diaphragm weakness; be cautious or choose an alternative when the patient cannot tolerate losing half the diaphragm (severe lung disease, existing paralysis on the other side).</td></tr>
        <tr><td><strong>Supraclavicular</strong></td><td>Pneumothorax (the pleura is close; historically a major risk with landmark techniques), phrenic nerve involvement, puncture of the subclavian vessels.</td><td>Keep the needle tip in view at all times; diaphragm weakness is still possible.</td></tr>
        <tr><td><strong>Infraclavicular / axillary</strong></td><td>Puncture of vessels and LAST (axillary block sits close to vessels); phrenic involvement is uncommon.</td><td>Useful alternatives when respiratory reserve is poor.</td></tr>
        <tr><td><strong>Femoral / fascia iliaca</strong></td><td>Quadriceps weakness and falls when walking; femoral vessel puncture.</td><td>Warn ward staff and the patient; supervise first mobilisation.</td></tr>
        <tr><td><strong>Adductor canal</strong></td><td>Less quadriceps weakness than femoral block, but not none.</td><td>Often chosen for knee surgery to protect early mobilisation.</td></tr>
        <tr><td><strong>Sciatic / popliteal</strong></td><td>Prolonged foot drop; dense block may mask the pain of compartment syndrome; heel pressure injury.</td><td>Protect the limb and agree compartment monitoring after high-risk fractures.</td></tr>
        <tr><td><strong>Paravertebral</strong></td><td>Pneumothorax, spread to the epidural space, low blood pressure, bilateral spread.</td><td>Monitor as for a partial neuraxial block.</td></tr>
        <tr><td><strong>Fascial plane blocks</strong> (erector spinae, TAP, rectus sheath, serratus)</td><td>Large volumes raise LAST risk, especially with bilateral blocks or catheters; failure and unpredictable spread; rarely organ puncture.</td><td>Calculate the total local anaesthetic dose across all blocks and any surgical infiltration.<R label="ASRA LAST checklist 2020" /></td></tr>
      </tbody>
    </table></div>
    <p className="text-sm">The block descriptions are summaries of standard regional anaesthesia practice; only the figures and findings marked with a source are quoted from published data. Rates for individual blocks vary with volume, approach and operator, so no single-figure risk is given where reliable data are lacking.</p>
  </div>;
}
