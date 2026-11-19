import { createClientFromRequest } from "npm:@base44/sdk@0.8.52";
import { secrets } from "base44:runtime";
import { relay, reserve, trustedKey } from "../../shared/ai-relay.ts";

export default function aiRelay(request: Request): Promise<Response> {
  return relay(request, {
    getKey: trustedKey,
    reserve,
    connection: req => createClientFromRequest(req).asServiceRole.aiGateway.connection(),
    fetcher: fetch,
    embeddingsKey: () => secrets.get("ANAESTHESIACORE_ENABLE_OPENAI_EMBEDDINGS") === "true" ? secrets.get("OPENAI_API_KEY") : undefined,
  });
}
