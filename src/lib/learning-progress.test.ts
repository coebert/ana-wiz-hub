import { describe, it, expect } from 'vitest';
import { averageStudySeconds, studyStorageKey, countsAsActiveStudy } from './learning-progress';
describe('learning progress', () => {
  it('averages only accounts with recorded time, not untimed completions', () => {
    expect(averageStudySeconds({ seconds: 600, timed_learners: 2 })).toBe(300);
    expect(averageStudySeconds({ seconds: 0, timed_learners: 0 })).toBe(0);
  });
  it('isolates account time from other accounts and anonymous time', () => {
    expect(studyStorageKey('time', 'a')).not.toBe(studyStorageKey('time', 'b'));
    expect(studyStorageKey('time', 'a')).not.toBe(studyStorageKey('time'));
  });
  it('stops crediting time after 90 seconds of inactivity', () => {
    expect(countsAsActiveStudy(true, 89_999)).toBe(true);
    expect(countsAsActiveStudy(true, 90_000)).toBe(false);
  });
  it('does not count hidden topic pages', () => {
    expect(countsAsActiveStudy(false, 0)).toBe(false);
  });
});