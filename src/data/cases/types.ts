import type { PerioperativeCase } from "@/components/perioperative/ProgressiveCase";

/**
 * A case bank case is a ProgressiveCase plus the metadata needed to surface it
 * from topic pages (short summary and the curriculum topics it belongs to).
 */
export interface CaseBankCase extends PerioperativeCase {
  summary: string;
  topicIds: string[];
}

export interface CaseBank {
  slug: string;
  path: string;
  title: string;
  subtitle: string;
  metaDescription: string;
  backPath: string;
  backLabel: string;
  accentColor: string;
  categories: string[];
  cases: CaseBankCase[];
}
