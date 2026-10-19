CREATE OR REPLACE FUNCTION public.admin_topic_learning_progress(_from date DEFAULT NULL, _to date DEFAULT NULL)
RETURNS jsonb LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
DECLARE result jsonb;
BEGIN
 IF auth.uid() IS NULL OR NOT public.has_role(auth.uid(), 'admin') THEN RAISE EXCEPTION 'Admin access required' USING ERRCODE='42501'; END IF;
 IF _from IS NOT NULL AND _to IS NOT NULL AND _from > _to THEN RAISE EXCEPTION 'Invalid date range'; END IF;
 WITH times AS (
 SELECT user_id,topic_id,sum(seconds)::bigint seconds,max(day)::text last_activity FROM public.user_study_time WHERE (_from IS NULL OR day>=_from) AND (_to IS NULL OR day<=_to) GROUP BY user_id,topic_id
 ), completions AS (
 SELECT user_id,topic_id,completed_at FROM public.user_topic_progress WHERE (_from IS NULL OR completed_at>=_from::timestamp AT TIME ZONE 'UTC') AND (_to IS NULL OR completed_at<(_to+1)::timestamp AT TIME ZONE 'UTC')
 ), subsections AS (
 SELECT user_id,topic_id,count(*) ticks,max(checked_at)::text last_activity FROM public.user_subsection_progress WHERE (_from IS NULL OR checked_at>=_from::timestamp AT TIME ZONE 'UTC') AND (_to IS NULL OR checked_at<(_to+1)::timestamp AT TIME ZONE 'UTC') GROUP BY user_id,topic_id
 ), keys AS (SELECT user_id,topic_id FROM times UNION SELECT user_id,topic_id FROM completions UNION SELECT user_id,topic_id FROM subsections), learners AS (
 SELECT k.user_id,k.topic_id,coalesce(t.seconds,0) seconds,c.completed_at,coalesce(s.ticks,0) ticks,greatest(t.last_activity,c.completed_at::text,s.last_activity) last_activity FROM keys k LEFT JOIN times t USING(user_id,topic_id) LEFT JOIN completions c USING(user_id,topic_id) LEFT JOIN subsections s USING(user_id,topic_id)
 ), topics AS (
 SELECT topic_id,count(*) learners,count(*) FILTER(WHERE seconds>0) timed_learners,count(*) FILTER(WHERE completed_at IS NOT NULL) completions,sum(seconds) seconds,sum(ticks) subsection_ticks,max(last_activity) last_activity,jsonb_agg(jsonb_build_object('account_id',user_id,'seconds',seconds,'completed_at',completed_at,'subsection_ticks',ticks) ORDER BY seconds DESC,user_id) accounts FROM learners GROUP BY topic_id
 )
 SELECT jsonb_build_object('learners',(SELECT count(DISTINCT user_id) FROM learners),'seconds',(SELECT coalesce(sum(seconds),0) FROM learners),'completions',(SELECT count(*) FROM completions),'topics',coalesce((SELECT jsonb_agg(to_jsonb(topics) ORDER BY seconds DESC,topic_id) FROM topics),'[]'::jsonb)) INTO result;
 RETURN result;
END; $$;
REVOKE ALL ON FUNCTION public.admin_topic_learning_progress(date,date) FROM PUBLIC,anon;
GRANT EXECUTE ON FUNCTION public.admin_topic_learning_progress(date,date) TO authenticated;
CREATE OR REPLACE FUNCTION public.add_study_time(_topic_id text, _seconds integer, _day date DEFAULT CURRENT_DATE)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
 IF auth.uid() IS NULL THEN RAISE EXCEPTION 'not authenticated'; END IF;
 IF _seconds IS NULL OR _seconds<=0 OR _seconds>14400 THEN RETURN; END IF;
 INSERT INTO public.user_study_time(user_id,topic_id,day,seconds) VALUES(auth.uid(),_topic_id,coalesce(_day,CURRENT_DATE),_seconds)
 ON CONFLICT(user_id,topic_id,day) DO UPDATE SET seconds=least(14400,public.user_study_time.seconds+EXCLUDED.seconds),updated_at=now();
END; $$;