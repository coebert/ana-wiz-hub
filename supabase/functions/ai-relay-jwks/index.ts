import { sourceKeys } from "../_shared/base44-assertion.ts";
import { ASSERTION, ISSUER, verifyAssertion } from "../_shared/relay-protocol.ts";

Deno.serve(async request => {
  try {
    const keys = await sourceKeys();
    if (request.method === "GET") return Response.json({keys:[keys.jwk]}, {headers:{"Cache-Control":"public, max-age=30"}});
    if (request.method !== "POST") return new Response(null,{status:405});
    const token = request.headers.get(ASSERTION);
    if (!token || token.length > 1300) return new Response(null,{status:401});
    let claims;
    try { claims = await verifyAssertion(token,keys.publicKey); } catch { return new Response(null,{status:401}); }
    const credential = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const result = await fetch(ISSUER + "/rest/v1/rpc/reserve_base44_ai_request", {
      method:"POST", redirect:"error", signal:AbortSignal.timeout(4500),
      headers:{apikey:credential, Authorization:"Bearer " + credential, "Content-Type":"application/json"},
      body:JSON.stringify({request_jti:claims.jti,kind:claims.op,expires_at_s:claims.exp}),
    });
    if (!result.ok) { await result.body?.cancel(); return new Response(null,{status:503}); }
    const status = await result.json();
    return new Response(null,{status:[204,401,409,429].includes(status) ? status : 503});
  } catch { return new Response(null,{status:503}); }
});
