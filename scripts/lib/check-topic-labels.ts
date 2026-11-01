import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { referenceLabels } from './reference-labels';
import { parseTopic, labelIssues } from './topic-citations';
export function checkTopicLabels(kind: 'cites' | 'sections') {
  const pool = referenceLabels();
  const issues: string[] = [];
  let count = 0;
  for (const filename of readdirSync('src/pages/topics').filter(f => f.endsWith('.tsx'))) {
    const file = join('src/pages/topics', filename);
    const topic = parseTopic(readFileSync(file, 'utf8'), file);
    if (!topic.foundTopicTemplate && !topic.cites.length && !Object.keys(topic.sections).length && !topic.diagnostics.length) continue;
    count++;
    issues.push(...labelIssues(topic, pool, kind).map(issue => `${file}: ${issue}`));
  }
  if (issues.length) { console.error(issues.join('\n')); process.exitCode = 1; }
  else console.log(`No ${kind === 'cites' ? 'cites-label' : 'sectionSources label'} mismatches across ${count} topic pages.`);
}
