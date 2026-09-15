ALTER FUNCTION public.claim_podcast_rerecord_item(uuid, uuid, integer) SECURITY INVOKER;
ALTER FUNCTION public.refresh_podcast_rerecord_job(uuid) SECURITY INVOKER;