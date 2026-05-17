// Verify worked-example cites for the 30 updated topics
import fs from "node:fs";
import path from "node:path";

const TOPICS = [
  "SpinalAnatomyTopic","HeadNeckAnatomyTopic","UpperLimbAnatomyTopic","LowerLimbAnatomyTopic","ThoracicAnatomyTopic",
  "ABGAnalyserTopic","PulseOximetryTopic","DepthOfAnaesthesiaMonitoringTopic","ElectricalSafetyTopic",
  "TemperatureMeasurementTopic","ClinicalMeasurementTopic","EquipmentMonitoringTopic","VascularAccessDevicesTopic",
  "AntimicrobialsPharmTopic","BariatricAnaesthesiaTopic","CardiovascularDiseaseTopic","ElderlyAnaesthesiaTopic",
  "EmergencySurgeryTopic","EndOfLifeCommunicationTopic","EndocrineDiseaseTopic","EnhancedRecoveryTopic",
  "NeurologicalDiseaseTopic","NonTechnicalSkillsTopic","ObstetricAnaesthesiaTopic","OrthopaedicAnaesthesiaTopic",
  "PatientPositioningTopic","PreoperativeAssessmentTopic","RespiratoryDiseaseTopic","VascularAnaesthesiaTopic",
  "VasoactiveAgentsTopic",
];

// Load references.ts label set per topicId
const refsSrc = fs.readFileSync("src/data/references.ts", "utf8");
const refMap = {};
const blockRe = /"([\w-]+)"\s*:\s*\[([\s\S]*?)\]\s*,/g;
let m;
while ((m = blockRe.exec(refsSrc))) {
  const labels = [...m[2].matchAll(/label:\s*"([^"]+)"/g)].map((x) => x[1]);
  refMap[m[1]] = labels;
}

let pass = 0, fail = 0;
const issues = [];

for (const t of TOPICS) {
  const file = `src/pages/topics/${t}.tsx`;
  const src = fs.readFileSync(file, "utf8");

  // Extract worked-example cites arrays
  const cites = [];
  const citeRe = /cites:\s*\[([^\]]*)\]/g;
  let c;
  while ((c = citeRe.exec(src))) {
    [...c[1].matchAll(/"([^"]+)"/g)].forEach((x) => cites.push(x[1]));
  }
  // Extract topicId
  const idMatch = src.match(/topicId="([\w-]+)"/);
  const topicId = idMatch?.[1];
  const refLabels = topicId ? refMap[topicId] || [] : [];

  // Extract sectionSources labels
  const sectionSourcesBlock = src.match(/sectionSources=\{\{([\s\S]*?)\}\}/);
  const ssLabels = sectionSourcesBlock
    ? [...sectionSourcesBlock[1].matchAll(/"([^"]+)"/g)].map((x) => x[1])
    : [];

  // Check each worked-example cite is in either sectionSources or references.ts
  const missing = cites.filter((c) => !ssLabels.includes(c) && !refLabels.includes(c));

  if (missing.length === 0 && cites.length > 0) {
    pass++;
  } else {
    fail++;
    issues.push({ t, topicId, cites, missing, ssLabels, refLabels });
  }
}

console.log(`PASS ${pass} / ${TOPICS.length}, FAIL ${fail}`);
if (issues.length) {
  for (const i of issues) {
    console.log(`\n[FAIL] ${i.t} (topicId=${i.topicId})`);
    console.log(`  worked cites:    ${JSON.stringify(i.cites)}`);
    console.log(`  missing:         ${JSON.stringify(i.missing)}`);
    console.log(`  sectionSources:  ${JSON.stringify(i.ssLabels)}`);
    console.log(`  references.ts:   ${JSON.stringify(i.refLabels)}`);
  }
}
