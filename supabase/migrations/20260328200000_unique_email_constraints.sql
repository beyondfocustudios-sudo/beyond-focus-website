-- UNIQUE constraint na tabela website_leads para deduplicação por email
-- Permite upserts com on_conflict=email sem criar registos duplicados

do $$ begin
  if not exists (
    select 1 from information_schema.table_constraints
    where constraint_name = 'website_leads_email_key' and table_name = 'website_leads'
  ) then
    alter table website_leads add constraint website_leads_email_key unique (email);
  end if;
end $$;
