# Edge 404 Worker

Lovable hosting answers every non-file path with the app shell (HTTP 200). This
Worker sits in front of it on Cloudflare and returns a real `404` (noindex page)
for page paths the app does not render. Everything else is forwarded unchanged
with `fetch(request)`.

1. `npm run gen:route-manifest` — regenerate after adding routes, topics, drugs or diagrams.
2. `npx wrangler deploy -c cloudflare/wrangler.toml` — needs the domain proxied through Cloudflare.
3. Check: `curl -I https://anaesthesiacore.app/no-such-page` → 404; a topic page → 200.

Rollback: remove the Worker routes in Cloudflare; traffic goes straight to origin.
