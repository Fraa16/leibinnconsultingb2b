import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * Supabase client, or null when the environment is not configured.
 *
 * This used to `throw` at module scope. Because the contact page imports it,
 * a missing env var took the whole page down to a blank screen — the visitor
 * saw nothing at all, rather than a form that reports it could not send. The
 * failure now stays inside the submit handler, which already has an error
 * state for exactly this.
 */
export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

if (!supabase && import.meta.env.DEV) {
  console.warn(
    'Supabase is not configured: set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY. ' +
      'The contact form will render but cannot submit.',
  );
}
