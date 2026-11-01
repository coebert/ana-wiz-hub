import { readdirSync, readFileSync } from 'node:fs';
import { parseTopic } from './topic-citations';
import { referenceLabels } from './reference-labels';
export function diagramIssues() {
  const pool = referenceLabels();
  return readdirSync('src/pages/topics').filter(f => f.endsWith('.tsx')).flatMap(file => {
    const path = `src/pages/topics/${file}`;
    const topic = parseTopic(readFileSync(path, 'utf8'), path);
    const issues: { file: string; kind: string; detail: string }[] = topic.diagnostics.map(detail => ({ file: path, kind: 'parser-error', detail }));
    if (!topic.renderedDiagrams.length) return issues;
    if (!topic.topicId) return [...issues, { file: path, kind: 'missing-topicId', detail: 'No TopicTemplate topicId' }];
    const known = pool.get(topic.topicId);
    if (!known) return [...issues, { file: path, kind: 'missing-references-entry', detail: topic.topicId }];
    const labels = topic.sections.diagrams;
    if (!labels?.length) issues.push({ file: path, kind: labels ? 'empty-diagram-sources' : 'missing-diagram-sources', detail: topic.renderedDiagrams.join(', ') });
    for (const label of labels ?? []) if (!known.has(label)) issues.push({ file: path, kind: 'label-mismatch', detail: label });
    return issues;
  });
}
