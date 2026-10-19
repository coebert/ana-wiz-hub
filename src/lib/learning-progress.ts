export interface LearningAccount { account_id: string; seconds: number; completed_at: string | null; subsection_ticks: number }
export interface LearningTopic { topic_id: string; learners: number; timed_learners: number; completions: number; seconds: number; accounts: LearningAccount[] }
export interface LearningProgress { learners: number; seconds: number; completions: number; topics: LearningTopic[] }
export function averageStudySeconds(topic: Pick<LearningTopic, 'seconds' | 'timed_learners'>) { return topic.timed_learners > 0 ? topic.seconds / topic.timed_learners : 0; }
export function studyStorageKey(base: string, userId?: string) { return userId ? `${base}:account:${userId}` : base; }
export function countsAsActiveStudy(visible: boolean, idleMilliseconds: number) { return visible && idleMilliseconds < 90_000; }