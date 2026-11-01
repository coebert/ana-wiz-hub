import { describe, it, expect } from 'vitest';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { parseTopic, labelIssues } from '../../scripts/lib/topic-citations';
import { referenceLabels } from '../../scripts/lib/reference-labels';
import { extractTopic } from '../__tests__/citation-coverage-extractor';
import { pool } from './fixtures/reference-pools/pool';
describe('shared citation contracts', () => {
  it.each(['topicId="single-key"', "topicId={'single-key'}", 'topicId={T}', 'topicId={TOPIC_ID}'])('resolves the actual prop %s', prop => {
    const source = `const T = 'single-key'; const TOPIC_ID = "single-key"; export default () => <TopicTemplate ${prop} keyPoints={[{ text:'x', cites:['Imported [brackets]'] }]} sectionSources={{'diagrams':['Merged']}} />;`;
    expect(parseTopic(source).topicId).toBe('single-key');
    expect(labelIssues(parseTopic(source), referenceLabels(pool), 'cites')).toEqual([]);
    const dir = mkdtempSync(join(tmpdir(), 'citation-fixture-'));
    try { const path = join(dir, 'topic.tsx'); writeFileSync(path, source); expect(extractTopic(path).topicId).toBe(parseTopic(source).topicId); }
    finally { rmSync(dir, { recursive: true }); }
  });
  it('consumes imported, merged and runtime-appended pools with both quoted key styles', () => {
    expect([...referenceLabels(pool).get('single-key') ?? []]).toEqual(['Imported [brackets]', 'Merged', 'Appended']);
    expect(referenceLabels(pool).get('double-key')?.has('Imported [brackets]')).toBe(true);
  });
  it('nonexistent label still fails', () => expect(labelIssues(parseTopic('<TopicTemplate topicId="single-key" keyPoints={[{cites:["invented"]}]} />'), referenceLabels(pool), 'cites')).toEqual(['unknown label: invented']));
  it.each(['const T = getId();', 'let T = "single-key";'])('dynamic/mutable ID fails distinctly: %s', decl => {
    const t = parseTopic(`${decl} const TOPIC_ID="unrelated"; <TopicTemplate topicId={T} />`);
    expect(t.topicId).toBeNull(); expect(labelIssues(t, referenceLabels(pool), 'cites')).toContain('unknown topicId'); expect(t.diagnostics.some(d => d.startsWith('unresolved topicId'))).toBe(true);
  });
  it('nonliteral citation is not silently dropped', () => expect(parseTopic('<TopicTemplate topicId="single-key" keyPoints={[{cites:[computed]}]} />').diagnostics).toEqual(['nonliteral cites: computed']));
  it('five operative labels resolve in the executed pool without duplicate additions', () => {
    for (const label of ['GALA 2008', 'ESVS 2024 AAA', 'EVAR-1 2004', 'NICE NG156', 'AAGBI BCIS 2015']) expect(referenceLabels().get('operative-steps')?.has(label), label).toBe(true);
  });
  it('a newly diagram-bearing topic cannot pass without its diagram declaration', () => {
    const t = parseTopic('import Diagram from "@/components/diagrams/Example"; <TopicTemplate topicId="single-key" coreConcepts={<Diagram />} />');
    expect(t.renderedDiagrams).toEqual(['Diagram']); expect(t.sections.diagrams).toBeUndefined();
  });
});
