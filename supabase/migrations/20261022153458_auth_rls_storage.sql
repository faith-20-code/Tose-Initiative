-- helper: is the current user an admin?
create or replace function public.is_admin()
returns boolean
language sql stable security definer
set search_path = ''
as $$
  select exists (select 1 from public.admins where user_id = (select auth.uid()));
$$;

-- auto-create profile + preferences row on sign-up
create or replace function public.handle_new_user()
returns trigger
language plpgsql security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  insert into public.preferences (user_id) values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- keep updated_at fresh
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

create trigger profiles_touch before update on public.profiles
  for each row execute function public.touch_updated_at();
create trigger preferences_touch before update on public.preferences
  for each row execute function public.touch_updated_at();

-- profiles: own row only (created by trigger, so no insert policy)
create policy "profiles select own or admin" on public.profiles
  for select to authenticated
  using (id = (select auth.uid()) or public.is_admin());
create policy "profiles update own" on public.profiles
  for update to authenticated
  using (id = (select auth.uid())) with check (id = (select auth.uid()));

-- preferences: own row only
create policy "preferences select own" on public.preferences
  for select to authenticated using (user_id = (select auth.uid()));
create policy "preferences insert own" on public.preferences
  for insert to authenticated with check (user_id = (select auth.uid()));
create policy "preferences update own" on public.preferences
  for update to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));

-- admins: a user can only see whether they themselves are an admin; no writes via API
create policy "admins select self" on public.admins
  for select to authenticated using (user_id = (select auth.uid()));

-- partners: students see verified ones, admins manage all
create policy "partners select verified" on public.partners
  for select to authenticated using (verified or public.is_admin());
create policy "partners admin write" on public.partners
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- sources: admin only
create policy "sources admin all" on public.sources
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- opportunities: students see published, admins manage all
create policy "opportunities select published" on public.opportunities
  for select to authenticated using (is_published or public.is_admin());
create policy "opportunities admin write" on public.opportunities
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- saved_opportunities: own rows
create policy "saved select own" on public.saved_opportunities
  for select to authenticated using (user_id = (select auth.uid()));
create policy "saved insert own" on public.saved_opportunities
  for insert to authenticated with check (user_id = (select auth.uid()));
create policy "saved delete own" on public.saved_opportunities
  for delete to authenticated using (user_id = (select auth.uid()));

-- recommendations: students read their own; only the worker (service role) writes
create policy "recs select own" on public.recommendations
  for select to authenticated using (user_id = (select auth.uid()));

-- career guides: students see published, admins manage all
create policy "guides select published" on public.career_guides
  for select to authenticated using (is_published or public.is_admin());
create policy "guides admin write" on public.career_guides
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- private CV bucket: 5 MB, PDF or Word, files live under <user_id>/
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('cvs', 'cvs', false, 5242880, array[
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
])
on conflict (id) do nothing;

create policy "cvs select own" on storage.objects
  for select to authenticated
  using (bucket_id = 'cvs' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "cvs insert own" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'cvs' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "cvs update own" on storage.objects
  for update to authenticated
  using (bucket_id = 'cvs' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "cvs delete own" on storage.objects
  for delete to authenticated
  using (bucket_id = 'cvs' and (storage.foldername(name))[1] = (select auth.uid())::text);