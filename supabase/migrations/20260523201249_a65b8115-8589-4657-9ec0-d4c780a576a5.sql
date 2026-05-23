UPDATE public.drug_verification_jobs
SET status = 'cancelled',
    last_error = 'Manually cancelled to unblock new start',
    completed_at = now(),
    updated_at = now()
WHERE status IN ('pending','running');