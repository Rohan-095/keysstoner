-- ============================================================
-- Keystoners Lead Capture + AI Voice System — Supabase Schema
-- Run this entire file in Supabase SQL Editor
-- ============================================================

-- Leads submitted from the website
create table if not exists leads (
  id               uuid primary key default gen_random_uuid(),
  name             text not null,
  phone            text not null,
  email            text,
  address          text,
  city             text,
  service          text,
  notes            text,
  preferred_time   text,
  -- new | calling | called | booked | no_answer | not_interested | failed
  status           text not null default 'new',
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- One row per AI call attempt (a lead may have multiple retries)
create table if not exists calls (
  id                 uuid primary key default gen_random_uuid(),
  lead_id            uuid not null references leads(id) on delete cascade,
  provider           text not null default 'retell',
  provider_call_id   text,
  -- initiated | ringing | in_progress | completed | failed | no_answer
  status             text not null default 'initiated',
  transcript         text,
  summary            text,
  -- booked | callback | not_interested | no_answer
  intent             text,
  -- positive | neutral | negative
  sentiment          text,
  duration_seconds   integer,
  recording_url      text,
  raw_webhook        jsonb,
  created_at         timestamptz not null default now(),
  updated_at         timestamptz not null default now()
);

-- Indexes
create index if not exists leads_status_idx          on leads(status);
create index if not exists leads_created_at_idx      on leads(created_at desc);
create index if not exists calls_lead_id_idx         on calls(lead_id);
create index if not exists calls_provider_call_id_idx on calls(provider_call_id);

-- Auto-update updated_at on row changes
create or replace function update_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists leads_updated_at on leads;
create trigger leads_updated_at
  before update on leads
  for each row execute function update_updated_at();

drop trigger if exists calls_updated_at on calls;
create trigger calls_updated_at
  before update on calls
  for each row execute function update_updated_at();
