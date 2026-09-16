/*
  # Create Contact Form Submissions Table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key) - Unique identifier for each submission
      - `vorname` (text) - First name of the contact
      - `nachname` (text) - Last name of the contact
      - `email` (text) - Email address for contact
      - `telefonnummer` (text) - Phone number
      - `firma` (text) - Company name
      - `mitarbeiteranzahl` (text) - Number of employees category
      - `nachricht` (text, optional) - Optional message from the contact
      - `created_at` (timestamptz) - Timestamp of submission
  
  2. Security
    - Enable RLS on `contact_submissions` table
    - Add policy for anonymous users to insert their contact information
    - No read access for anonymous users to protect privacy
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vorname text NOT NULL,
  nachname text NOT NULL,
  email text NOT NULL,
  telefonnummer text NOT NULL,
  firma text NOT NULL,
  mitarbeiteranzahl text NOT NULL,
  nachricht text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous users to submit contact forms"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);