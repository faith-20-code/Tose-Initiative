create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  country text not null default 'Zimbabwe',
  nationality text,
  cv_path text,
  onboarded boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);

create table public.preferences (
  user_id uuid primary key references public.profiles(id) on delete cascade,
  looking_for text[] not null default '{}',
  education_level text,
  fields text[] not null default '{}',
  interests text[] not null default '{}',
  study_levels text[] not null default '{}',
  funding_pref text,
  study_locations text[] not null default '{}',
  work_types text[] not null default '{}',
  work_arrangement text,
  job_locations text[] not null default '{}',
  experience_level text,
  priorities text[] not null default '{}',
  updated_at timestamptz not null default now()
);

create table public.partners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  website text,
  contact_email text,
  verified boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.sources (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null check (type in ('api', 'rss', 'manual')),
  base_url text,
  config jsonb not null default '{}',
  active boolean not null default true,
  last_run_at timestamptz
);

create table public.opportunities (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in
    ('scholarship','job','internship','course','cv_class','volunteering')),
  title text not null,
  description text,
  url text not null unique,
  provider text,
  source_id uuid references public.sources(id) on delete set null,
  partner_id uuid references public.partners(id) on delete set null,
  external_id text,
  levels text[] not null default '{}',
  fields text[] not null default '{}',
  eligible_countries text[] not null default '{}',  -- empty = open to all
  funding text,
  location text,
  work_arrangement text,
  opens_on date,
  deadline date,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  unique (source_id, external_id)
);

create table public.saved_opportunities (
  user_id uuid not null references public.profiles(id) on delete cascade,
  opportunity_id uuid not null references public.opportunities(id) on delete cascade,
  saved_at timestamptz not null default now(),
  primary key (user_id, opportunity_id)
);

create table public.recommendations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  opportunity_id uuid not null references public.opportunities(id) on delete cascade,
  rec_date date not null default current_date,
  score int not null default 0,
  unique (user_id, opportunity_id, rec_date)
);

create table public.career_guides (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text,
  typical_duties text[] not null default '{}',
  skills text[] not null default '{}',
  fields text[] not null default '{}',
  ai_generated boolean not null default true,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

-- indexes for the daily matching and the feed
create index on public.opportunities (kind, deadline) where is_published;
create index on public.opportunities using gin (fields);
create index on public.opportunities using gin (levels);
create index on public.recommendations (user_id, rec_date);

-- lock everything; policies come in Step 3
alter table public.profiles enable row level security;
alter table public.admins enable row level security;
alter table public.preferences enable row level security;
alter table public.partners enable row level security;
alter table public.sources enable row level security;
alter table public.opportunities enable row level security;
alter table public.saved_opportunities enable row level security;
alter table public.recommendations enable row level security;
alter table public.career_guides enable row level security;