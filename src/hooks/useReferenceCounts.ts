import { useMemo } from "react";
import { topicReferences } from "@/data/references";

/** Count of curated (authored) references per topic id. */
export const useReferenceCounts = (topicIds: string[]) => {
  const key = topicIds.join(",");
  const data = useMemo(() => {
    const out: Record<string, number> = {};
    for (const id of topicIds) {
      const n = topicReferences[id]?.length ?? 0;
      if (n > 0) out[id] = n;
    }
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return { data };
};
