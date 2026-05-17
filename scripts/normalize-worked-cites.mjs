// Normalize worked-example cites to canonical labels from references.ts per topic
import fs from "node:fs";

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

const refsSrc = fs.readFileSync("src/data/references.ts", "utf8");
const refMap = {};
const blockRe = /"([\w-]+)"\s*:\s*\[([\s\S]*?)\]\s*,/g;
let m;
while ((m = blockRe.exec(refsSrc))) {
  refMap[m[1]] = [...m[2].matchAll(/label:\s*"([^"]+)"/g)].map((x) => x[1]);
}

let updated = 0;
for (const t of TOPICS) {
  const file = `src/pages/topics/${t}.tsx`;
  let src = fs.readFileSync(file, "utf8");
  const idMatch = src.match(/topicId="([\w-]+)"/);
  const topicId = idMatch?.[1];
  const canon = refMap[topicId] || [];
  if (canon.length === 0) { console.warn("No refs for", t, topicId); continue; }

  // Locate the workedExamples const block (contains list-decimal)
  const constName = src.match(/const (\w+WorkedExamples)\s*:/)?.[1];
  if (!constName) { console.warn("no const for", t); continue; }
  const blockRe2 = new RegExp(`(const ${constName}[\\s\\S]*?\\n\\];)`);
  const blockMatch = src.match(blockRe2);
  if (!blockMatch) { console.warn("no block for", t); continue; }
  let block = blockMatch[1];

  // Pick 2-3 canonical labels (prefer ones already in block, else first 3)
  const inBlock = canon.filter((l) => block.includes(`"${l}"`));
  const picked = (inBlock.length >= 2 ? inBlock : canon).slice(0, 3);
  const newCites = `cites: [${picked.map((x) => JSON.stringify(x)).join(", ")}]`;

  // Replace the cites: [...] inside this block (only one worked example per topic)
  const newBlock = block.replace(/cites:\s*\[[^\]]*\]/, newCites);
  if (newBlock !== block) {
    src = src.replace(block, newBlock);
    fs.writeFileSync(file, src);
    updated++;
  }
}
console.log("Updated:", updated);
