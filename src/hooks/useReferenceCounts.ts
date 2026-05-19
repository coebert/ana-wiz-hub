import { useQuery } from "@tanstack/react-query";
import { fetchReferenceCounts } from "@/lib/topicReferences";

/**
 * Fetch reference counts for a set of topic ids in one query, cached for
 * 5 minutes. All TopicCards on a section page mount with the same key,
 * so react-query deduplicates the fetch.
 */
export const useReferenceCounts = (topicIds: string[]) => {
  const key = topicIds.slice().sort().join(",");
  return useQuery({
    queryKey: ["topic-reference-counts", key],
    queryFn: () => fetchReferenceCounts(topicIds),
    enabled: topicIds.length > 0,
    staleTime: 5 * 60 * 1000,
  });
};
