-- Run once in Supabase Dashboard -> SQL Editor for an existing BNIOC database.
-- Adds opponent and overs while preserving player capacity.
ALTER TABLE public.matches ADD COLUMN IF NOT EXISTS opponent VARCHAR(160);
UPDATE public.matches
SET opponent = 'To be announced'
WHERE opponent IS NULL OR btrim(opponent) = '';
ALTER TABLE public.matches ALTER COLUMN opponent SET NOT NULL;

ALTER TABLE public.matches ADD COLUMN IF NOT EXISTS overs INTEGER;
UPDATE public.matches
SET overs = 15
WHERE overs IS NULL;
ALTER TABLE public.matches ALTER COLUMN overs SET DEFAULT 15;
ALTER TABLE public.matches ALTER COLUMN overs SET NOT NULL;
ALTER TABLE public.matches DROP CONSTRAINT IF EXISTS matches_overs_check;
ALTER TABLE public.matches ADD CONSTRAINT matches_overs_check CHECK (overs > 0);

ALTER TABLE public.matches ADD COLUMN IF NOT EXISTS capacity INTEGER;
UPDATE public.matches
SET capacity = 22
WHERE capacity IS NULL;
ALTER TABLE public.matches ALTER COLUMN capacity SET DEFAULT 22;
ALTER TABLE public.matches ALTER COLUMN capacity SET NOT NULL;
ALTER TABLE public.matches DROP CONSTRAINT IF EXISTS matches_capacity_check;
ALTER TABLE public.matches ADD CONSTRAINT matches_capacity_check CHECK (capacity > 0);
