UPDATE public.topic_audit_findings
SET status='fixed', resolved_at=now(), unverifiable_reason = CASE WHEN id='78a38923-122a-42bc-be6a-cd16cbfb84e5' THEN 'Diagram display rounding artifact; IQR label now derived from rounded Q1/Q3 to ensure consistency.' WHEN id='fc00fcb9-bef9-4014-a83d-fc151aef7dcb' THEN 'Diagram label updated (removed "Saturated"); no external citation needed for a diagram-only wording fix.' ELSE unverifiable_reason END
WHERE id IN (
  '78a38923-122a-42bc-be6a-cd16cbfb84e5',
  'fc00fcb9-bef9-4014-a83d-fc151aef7dcb',
  'a3c8c436-5805-4e6a-acdf-683f2d2373cb'
);