create table if not exists public.fund_requests (
  id uuid primary key default gen_random_uuid(),
  fund_name text not null check (char_length(fund_name) between 1 and 160),
  option_name text check (option_name is null or char_length(option_name) between 1 and 160),
  status text not null default 'pending' check (status in ('pending', 'reviewed', 'added', 'rejected')),
  created_at timestamptz not null default now()
);

alter table public.fund_requests enable row level security;

grant insert on public.fund_requests to anon, authenticated;

drop policy if exists "Allow fund request submissions" on public.fund_requests;
create policy "Allow fund request submissions"
  on public.fund_requests
  for insert
  to anon, authenticated
  with check (true);
