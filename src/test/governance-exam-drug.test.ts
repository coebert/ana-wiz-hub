import { describe, it, expect } from 'vitest';
import { Linter } from 'eslint';
import tseslint from 'typescript-eslint';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import rule from '../../eslint-rules/valid-exam-tag.js';
import { validateDoseSummary } from '../../scripts/lib/drug-summary.mjs';
const linter = new Linter({ configType: 'flat' });
// typescript-eslint exposes a deliberately loose parser type; ESLint executes
// this parser directly. Keep the narrowing confined to the test adapter.
const config: Linter.Config[] = [{ languageOptions: { parser: tseslint.parser as unknown as NonNullable<Linter.Config['languageOptions']>['parser'] }, plugins: { local: { rules: { exam: rule } } }, rules: { 'local/exam': 'error' } }];
describe('exam checker safeguards', () => {
  it.each(['unrelated-label', 'fic'])('does not autofix distant/ambiguous %s', value => {
    const source = `const examTags = ["${value}"];`;
    const result = linter.verifyAndFix(source, config);
    expect(result.fixed).toBe(false); expect(result.messages).toHaveLength(1);
  });
  it('uniquely close typo can be fixed', () => expect(linter.verifyAndFix('const examTags = ["primry"];', config).output).toContain('"primary"'));
  it('leaves clinical prose outside exam contexts untouched', () => expect(linter.verify('const summary="ffic"; const row={exam:"Chest X-ray (PA)", dose_mSv:0.02};', config)).toEqual([]));
  it('invalid TS makes CLI fail with filename and parser reason', () => {
    const dir = mkdtempSync(join(tmpdir(), 'exam-check-')); const file = join(dir, 'bad.ts'); writeFileSync(file, 'const examTags: = [');
    try { execFileSync('node', ['scripts/check-exam-tags.mjs', file], { encoding:'utf8' }); throw new Error('Checker incorrectly passed'); }
    catch (error) { const e = error as { stdout?: string }; const output = e.stdout?.replace(/\u001b\[[0-9;]*m/g, '') ?? ''; expect(output).toContain('bad.ts'); expect(output).toMatch(/checker-error.*Parsing error/); }
    finally { rmSync(dir, { recursive: true }); }
  });
});
describe('population-aware structural dose material', () => {
  it('neonatal caffeine needs no invented adult summary', () => expect(validateDoseSummary({ indication_oneliner:'Apnoea of prematurity in neonates', dosing:'Loading dose 20 mg/kg caffeine citrate.', adult_bolus_dose:'', infusion_range:'' }).warning).toContain('neonatal'));
  it.each(['', 'See local policy', null])('missing/malformed neonatal material still fails: %s', dosing => expect(validateDoseSummary({ indication_oneliner:'Neonatal apnoea', dosing }).error).toBeDefined());
  it('non-neonatal missing summary still fails', () => expect(validateDoseSummary({ indication_oneliner:'Adult treatment', dosing:'1 mg' }).error).toContain('no dose summary'));
});
