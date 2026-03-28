-- Tabela para tracking de calls detectadas via MS Graph / Calendly
create table if not exists calls (
  id uuid primary key default gen_random_uuid(),
  event_id text not null,
  event_subject text,
  attendee_email text not null,
  attendee_name text,
  call_datetime timestamptz not null,
  lead_id uuid references website_leads(id) on delete set null,
  meeting_url text,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'declined', 'rescheduled', 'no_show')),
  confirmation_sent_at timestamptz,
  responded_at timestamptz,
  created_at timestamptz not null default now()
);

-- Índice para deduplicação (event_id + email = par único)
create unique index if not exists calls_event_attendee_idx
  on calls (event_id, attendee_email);

-- RLS desligado — acesso via service role key apenas
alter table calls disable row level security;
