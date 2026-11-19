/**
 * Regression cover for the 19 November 2026 bibliography triage.
 *
 * The triage resolved every candidate DOI and compared the published title with the
 * citation the app displays. Corrected records must keep the verified destination;
 * withheld records must stay flagged with a disclosure so no learner-facing surface
 * can render them as a source again.
 */
import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "fs";
import { resolve } from "path";
import { topicReferences } from "@/data/references";

type Corrected = { topic: string; label: string; url: string; titleFragment: string };

const CORRECTED: Corrected[] = [
  { topic: "equipment-monitoring", label: "McCoy & Mirakhur 1993", url: "https://doi.org/10.1111/j.1365-2044.1993.tb07075.x", titleFragment: "The levering laryngoscope. Anaesthesia. 1993;48(6):516-519." },
  { topic: "equipment-monitoring", label: "BJA Educ 2017 (Medical gases)", url: "https://doi.org/10.4103/0019-5049.120145", titleFragment: "The anaesthesia gas supply system. Indian Journal of Anaesth" },
  { topic: "oxygen-haemoglobin", label: "BJA Educ 2018 (CO)", url: "https://doi.org/10.1164/rccm.201606-1275ci", titleFragment: "Carbon Monoxide Poisoning: Pathogenesis, Management, and Fut" },
  { topic: "haematology-immunity", label: "BJA Educ 2017", url: "https://doi.org/10.1111/j.1365-2044.2010.06538.x", titleFragment: "Blood transfusion and the anaesthetist: management of massiv" },
  { topic: "regional-anaesthesia", label: "OAA PDPH 2023", url: "https://doi.org/10.1016/j.ijoa.2018.12.006", titleFragment: "Treatment of obstetric post-dural puncture headache. Part 1:" },
  { topic: "obstetric-anaesthesia", label: "OAA PDPH 2023", url: "https://doi.org/10.1016/j.ijoa.2018.12.006", titleFragment: "Treatment of obstetric post-dural puncture headache. Part 1:" },
  { topic: "ent-anaesthesia", label: "Iliff 2022 Haematoma", url: "https://doi.org/10.1111/anae.15585", titleFragment: "Management of haematoma after thyroid surgery: systematic re" },
  { topic: "ent-anaesthesia", label: "BJA Educ Maxillofacial 2018", url: "https://doi.org/10.1055/s-0028-1098962", titleFragment: "Comprehensive Airway Management of Patients with Maxillofaci" },
  { topic: "general-colorectal-surgery", label: "Zhuang Early Feeding 2013", url: "https://doi.org/10.1159/000353136", titleFragment: "Early versus Traditional Postoperative Oral Feeding in Patie" },
  { topic: "icu-nutrition", label: "NUTRIREA-3 2022", url: "https://doi.org/10.1016/s2213-2600(23)00092-9", titleFragment: "Low versus standard calorie and protein feeding in ventilate" },
  { topic: "respiratory-disease", label: "Anaesthesia PHTN 2015", url: "https://doi.org/10.1111/anae.12831", titleFragment: "Pulmonary hypertension and its management in patients underg" },
];

const WITHHELD: Array<[string, string]> = [
  ["si-units-thermodynamics", "BJA Educ 2017 (Pressure)"],
  ["electrical-safety", "BJA Educ 2019 (MRI)"],
  ["humidity-gas-sampling", "BJA 1983 Pneumotachography"],
  ["mri-physics", "BJA Educ 2019"],
  ["xray-radiation-safety", "BJA Educ 2019 (CT)"],
  ["ventilator-modes", "Intensive Care Med 2012 NIV"],
  ["autonomic-nervous", "BJA Educ 2021 (Bradycardia)"],
  ["haematology-immunity", "AAGBI Anaphylaxis 2021"],
  ["haematology-immunity", "BJA Educ Adaptive 2019"],
  ["haematology-immunity", "BJA Educ Eosinophil 2020"],
  ["maternal-physiology", "BJA Educ 2020"],
  ["muscle-relaxants", "BJA Educ 2019"],
  ["rocuronium", "BJA 2008 NMB Factors"],
  ["operating-theatre-environment", "BJA Educ 2020 Electrical Safety"],
  ["airway-management", "BJA Educ 2017"],
  ["regional-anaesthesia", "BJA Educ 2018"],
  ["regional-anaesthesia", "SFAR 2019 Antithrombotics & RA"],
  ["pain-medicine", "LOLIPOP 2024"],
  ["obstetric-anaesthesia", "BJA Educ 2019"],
  ["paediatric-anaesthesia", "BJA Educ 2019"],
  ["paediatric-core", "BJA Educ Paeds 2018"],
  ["orthopaedic-anaesthesia", "AAGBI Tourniquet"],
  ["urological-anaesthesia", "Propofol Erection 2010"],
  ["urological-anaesthesia", "Positioning Review 2016"],
  ["urological-anaesthesia", "BJA Educ Cystectomy 2017"],
  ["urological-anaesthesia", "BJA Educ Cystectomy 2018"],
  ["urological-anaesthesia", "BJA Educ TURBT 2019"],
  ["day-surgery", "PADSS Review 2023"],
  ["interventional-radiology", "Assoc Anaesth MRI 2021"],
  ["ards", "BJA Educ 2018"],
  ["circulatory-failure", "BJA Educ ECMO Weaning 2019"],
  ["cardiac-output-monitoring", "BJA Educ 2018"],
  ["arrhythmias-ecg-icu", "BJA Educ 2018"],
  ["toxicology", "BJA Educ 2021 Cardiotox"],
  ["immunology-intensivists", "BJA Educ Immunosuppression 2019"],
  ["paediatric-icu", "CDH EURO 2024"],
  ["preoperative-assessment", "AoA Glucocorticoids 2024"],
  ["enhanced-recovery", "Hughes 2014"],
  ["genetic-syndromes", "BJA Educ Marfan 2016"],
];

describe("bibliography triage 2026-11-19", () => {
  it.each(CORRECTED)("keeps the verified destination for $topic / $label", ({ topic, label, url, titleFragment }) => {
    const ref = (topicReferences[topic] ?? []).find((r) => r.label === label);
    expect(ref, `${topic} / ${label} must stay in the pool`).toBeTruthy();
    expect(ref!.url).toBe(url);
    expect(ref!.citation).toContain(titleFragment);
    expect(ref!.withheld).not.toBe(true);
  });

  it.each(WITHHELD)("withholds %s / %s with a disclosure", (topic, label) => {
    const ref = (topicReferences[topic] ?? []).find((r) => r.label === label);
    expect(ref, `${topic} / ${label} must stay in the pool so labels resolve`).toBeTruthy();
    expect(ref!.withheld).toBe(true);
    expect(ref!.gapNote ?? "").toMatch(/Source withheld/);
  });

  it("never publishes a withheld record inside a viva deck", () => {
    const dir = resolve("public/viva-deck");
    const files = readdirSync(dir).filter((f) => f.endsWith(".json"));
    expect(files.length).toBeGreaterThan(0);
    const leaked = files.filter((f) => readFileSync(resolve(dir, f), "utf8").includes('"withheld": true'));
    expect(leaked).toEqual([]);
  });

  it("gives every withheld record in the pool a disclosure", () => {
    const missing: string[] = [];
    for (const [topic, refs] of Object.entries(topicReferences)) {
      for (const ref of refs) {
        if (ref.withheld && !ref.gapNote) missing.push(`${topic} / ${ref.label}`);
      }
    }
    expect(missing).toEqual([]);
  });
});
