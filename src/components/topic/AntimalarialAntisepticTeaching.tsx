import { InlineRef } from "@/components/references/InlineRef";
const R = ({ label }: { label: string }) => <InlineRef topicId="antimicrobials-pharm" refLabel={label} />;

export function AntimalarialAntisepticTeaching() {
  return <div className="space-y-4 text-muted-foreground leading-relaxed">
    <h2 className="text-2xl font-serif font-bold text-foreground mb-3">Antimalarials and Antiseptics</h2>
    <h3 className="text-lg font-semibold text-foreground">Severe falciparum malaria: artesunate replaced quinine</h3>
    <p>Artemisinin derivatives such as artesunate act rapidly against a broad range of parasite stages, including the young circulating ring forms. They clear parasitaemia faster than quinine. Two large randomised trials changed practice. In SEAQUAMAT (mainly Asian adults), in-hospital mortality was 15% with artesunate versus 22% with quinine.<R label="SEAQUAMAT 2005" /> In AQUAMAT (African children), mortality was 8.5% versus 10.9%, and artesunate also reduced coma, convulsions and hypoglycaemia during treatment.<R label="AQUAMAT 2010" /></p>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">Why quinine is harder to use:</strong> it stimulates insulin secretion, so it causes hypoglycaemia, which was more frequent with quinine in both trials (relative risk 3.2 in SEAQUAMAT).<R label="SEAQUAMAT 2005" /><R label="AQUAMAT 2010" /> It also has a narrow therapeutic index with cardiac conduction effects, so check glucose frequently and monitor the ECG if it has to be used.</li>
      <li><strong className="text-foreground">ICU relevance:</strong> severe malaria is a multi-organ illness — cerebral malaria, acidosis, AKI, ARDS and shock. Antimalarial choice is only one part of care. Seek specialist tropical-medicine advice and follow current national guidance for dosing and oral step-down.</li>
      <li><strong className="text-foreground">After artesunate:</strong> delayed haemolysis can occur after parasite clearance. Recheck haemoglobin in the weeks following treatment, per specialist guidance.</li>
    </ul>
    <h3 className="text-lg font-semibold text-foreground">Skin antisepsis: agent, vehicle and technique</h3>
    <p>Antiseptics are applied to living tissue; disinfectants to surfaces. Chlorhexidine disrupts microbial cell membranes and binds to the skin, giving a persistent (residual) effect. Povidone-iodine acts by oxidation and has little residual activity once dry. Alcohol kills rapidly but has no persistence, so combinations exploit the speed of alcohol and the persistence of chlorhexidine.</p>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">Surgical sites:</strong> in clean-contaminated surgery, chlorhexidine–alcohol preparation was associated with fewer surgical-site infections than aqueous povidone-iodine (9.5% vs 16.1%).<R label="Darouiche 2010" /> The comparator was aqueous, so the trial does not isolate chlorhexidine from the effect of alcohol.</li>
      <li><strong className="text-foreground">Intravascular catheters:</strong> the CLEAN trial found chlorhexidine–alcohol reduced catheter-related infections compared with povidone-iodine–alcohol (0.28 vs 1.77 per 1000 catheter-days). Scrubbing the skin with detergent first made no significant difference to catheter colonisation. Severe skin reactions were more frequent with chlorhexidine–alcohol (3% vs 1%).<R label="CLEAN 2015" /></li>
      <li><strong className="text-foreground">Allergy:</strong> chlorhexidine caused about 9% of perioperative anaphylaxis in NAP6. Hidden sources include catheter coatings, lubricant gels and skin preparations, so remove them when anaphylaxis is suspected.<InlineRef topicId="clinical-incidents" refLabel="NAP6 2018 (Triggers)" /></li>
      <li><strong className="text-foreground">Fire and drying:</strong> alcoholic preparations are flammable. Avoid pooling and allow them to dry fully before drapes and diathermy.</li>
    </ul>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: what metabolic complication should you anticipate with IV quinine?</summary><p className="mt-2">Hypoglycaemia, because quinine stimulates insulin release. It is easily missed in sedated or unconscious patients, so monitor glucose frequently.</p></details>
    <details className="border-l-2 border-primary pl-4"><summary className="cursor-pointer font-semibold text-foreground">Learning check: does Darouiche 2010 prove chlorhexidine is superior to iodine?</summary><p className="mt-2">Not by itself. It compared chlorhexidine in alcohol with aqueous povidone-iodine, so the alcohol vehicle may contribute to the effect.</p></details>
  </div>;
}
