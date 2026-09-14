-- Cache one episode per (topic, voice) so each listener's accent choice is kept.
update public.podcasts set voice = 'british-rp' where voice is null;
alter table public.podcasts alter column voice set default 'british-rp';
alter table public.podcasts alter column voice set not null;
alter table public.podcasts drop constraint podcasts_topic_id_key;
alter table public.podcasts add constraint podcasts_topic_voice_key unique (topic_id, voice);