import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { diagramIssues } from '../../scripts/lib/diagram-provenance';
import { referenceLabels } from '../../scripts/lib/reference-labels';
// Historical baseline remains unchanged. Improvements need individually reviewed removals;
// new gaps are never accepted through snapshot regeneration.
const snapshot = readFileSync('src/test/__snapshots__/diagram-source-citations.test.ts.snap', 'utf8');
const baseline = new Set([...snapshot.matchAll(/"(\[[^\]]+\] src\/pages\/topics\/[^"\n]+)"/g)].map(m => m[1]));
const debt = JSON.parse(readFileSync('docs/diagram-provenance-debt-2026-11-01.json', 'utf8')) as { historicalReclassifications: { file: string; oldKind: string; newKind: string; evidence: string }[] };
const issues = diagramIssues();
describe('Diagram source-citation contract', () => {
  it('loads executed reference pools', () => expect(referenceLabels().size).toBeGreaterThan(20));
  it('audits a non-trivial set of diagrams', () => expect(issues.length).toBeGreaterThan(0));
  it('unknown labels and unresolved parser identities are hard failures', () => {
    expect(issues.filter(i => ['label-mismatch', 'parser-error', 'missing-topicId', 'missing-references-entry'].includes(i.kind))).toEqual([]);
  });
  it('new diagram-source gaps fail against reviewed historical debt', () => {
    const newGaps = issues.filter(i => !baseline.has(`[${i.kind}] ${i.file}`) && !debt.historicalReclassifications.some(d => d.file === i.file && d.newKind === i.kind && baseline.has(`[${d.oldKind}] ${i.file}`)));
    expect(newGaps).toEqual([]);
  });
});
