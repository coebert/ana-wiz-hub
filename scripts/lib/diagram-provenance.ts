import { readdirSync, readFileSync } from 'node:fs';
import { parseTopic } from './topic-citations';
import { referenceLabels } from './reference-labels';
export function diagramIssues() {
  const pool = referenceLabels();
  return readdirSync('src/pages/topics').filter(f => f.endsWith('.tsx')).flatMap(file => {
    const path = `src/pages/topics/${file}`;
    const topic = parseTopic(readFileSync(path, 'utf8'), path);
    if (!topic.renderedDiagrams.length) return [];
    const issues: { file: string; kind: string; detail: string }[] = [];
    if (!topic.topicId) return [{ file: path, kind: 'missing-topicId', detail: topic.diagnostics.join('; ') || 'No TopicTemplate topicId' }];
    const known = pool.get(topic.topicId);
    if (!known) return [{ file: path, kind: 'missing-references-entry', detail: topic.topicId }];
    const labels = topic.sections.diagrams;
    if (!labels?.length) issues.push({ file: path, kind: labels ? 'empty-diagram-sources' : 'missing-diagram-sources', detail: topic.renderedDiagrams.join(', ') });
    for (const label of labels ?? []) if (!known.has(label)) issues.push({ file: path, kind: 'label-mismatch', detail: label });
    for (const detail of topic.diagnostics) issues.push({ file: path, kind: 'parser-error', detail });
    return issues;
  });
}
