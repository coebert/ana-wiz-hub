import { physicsCaseBank } from "./physicsCases";
import { physiologyCaseBank } from "./physiologyCases";
import { pharmacologyCaseBank } from "./pharmacologyCases";
import { icuCaseBank } from "./icuCases";
import { perioperativeCaseIndex } from "@/data/perioperativeCaseIndex";
import type { CaseBank } from "./types";

export const caseBanks: CaseBank[] = [physicsCaseBank, physiologyCaseBank, pharmacologyCaseBank, icuCaseBank];

export interface RelatedCaseEntry {
  id: string;
  title: string;
  category: string;
  difficulty: string;
  summary: string;
  path: string;
  bankTitle: string;
}

const bankEntries: RelatedCaseEntry[] = caseBanks.flatMap((bank) =>
  bank.cases.map((item) => ({
    id: item.id,
    title: item.title,
    category: item.category,
    difficulty: item.difficulty,
    summary: item.summary,
    path: `${bank.path}#${item.id}`,
    bankTitle: bank.title,
  })),
);

const perioperativeEntries: RelatedCaseEntry[] = perioperativeCaseIndex.map((item) => ({
  id: item.id,
  title: item.title,
  category: item.category,
  difficulty: item.difficulty,
  summary: item.summary,
  path: `/perioperative/case-bank#${item.id}`,
  bankTitle: "Perioperative Case Bank",
}));

const topicMap = new Map<string, RelatedCaseEntry[]>();

const register = (topicIds: string[], entry: RelatedCaseEntry) => {
  topicIds.forEach((topicId) => {
    const existing = topicMap.get(topicId) ?? [];
    existing.push(entry);
    topicMap.set(topicId, existing);
  });
};

caseBanks.forEach((bank) =>
  bank.cases.forEach((item) => {
    const entry = bankEntries.find((candidate) => candidate.id === item.id);
    if (entry) register(item.topicIds, entry);
  }),
);

perioperativeCaseIndex.forEach((item) => {
  const entry = perioperativeEntries.find((candidate) => candidate.id === item.id);
  if (entry) register(item.topicIds, entry);
});

/** All case-bank cases mapped to a curriculum topic, across every bank. */
export const relatedCasesForTopic = (topicId: string): RelatedCaseEntry[] => topicMap.get(topicId) ?? [];

export const caseBankBySlug = (slug: string): CaseBank | undefined =>
  caseBanks.find((bank) => bank.slug === slug);

export const totalCaseCount = bankEntries.length + perioperativeEntries.length;
