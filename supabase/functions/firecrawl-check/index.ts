import "jsr:@supabase/functions-js/edge-runtime.d.ts";
Deno.serve(async () => {
  const key = Deno.env.get("FIRECRAWL_API_KEY") ?? "";
  const r = await fetch("https://api.firecrawl.dev/v2/scrape", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ url: "https://example.com", formats: ["markdown"] }),
  });
  const text = await r.text();
  return new Response(JSON.stringify({ status: r.status, keyTail: key.slice(-6), body: text.slice(0, 400) }), {
    headers: { "Content-Type": "application/json" },
  });
});
