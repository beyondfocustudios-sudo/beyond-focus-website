-- Colunas para pipeline pós-call (transcrição + briefing ALFRED)
alter table calls
  add column if not exists transcript_text text,
  add column if not exists transcript_summary text,
  add column if not exists next_steps text,
  add column if not exists deal_probability text, -- HOT / WARM / COLD
  add column if not exists draft_email_subject text,
  add column if not exists draft_email_html text,
  add column if not exists transcript_processed boolean not null default false,
  add column if not exists draft_notified_at timestamptz;
