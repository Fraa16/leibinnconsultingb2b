/*
  # Add `position` to contact submissions

  The /kontakt form collects "Ihre Position" (job title, optional) but the
  original table had no column for it, so the value had nowhere to go.

  1. Changes
    - Add `position` (text, nullable) to `contact_submissions`

  2. Security
    - No policy change. RLS stays enabled and the existing anon INSERT policy
      continues to apply.
*/

ALTER TABLE contact_submissions
  ADD COLUMN IF NOT EXISTS position text;
