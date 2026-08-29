-- Add an optional fixture-specific link, such as a live score or match page.
-- Run this once in the Supabase SQL Editor.

ALTER TABLE public.matches
  ADD COLUMN IF NOT EXISTS match_link TEXT;

ALTER TABLE public.matches
  DROP CONSTRAINT IF EXISTS matches_match_link_check;

ALTER TABLE public.matches
  ADD CONSTRAINT matches_match_link_check
  CHECK (match_link IS NULL OR match_link ~* '^https?://');
