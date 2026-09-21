import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * The client is created lazily and may be null.
 *
 * The previous module threw at import time when the env vars were
 * missing. Because it sat in the import graph of the page, a missing
 * variable took down the entire site with a white screen rather than
 * degrading one form. Callers handle `null` by showing the direct
 * contact route instead.
 */
export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

if (!supabase && import.meta.env.DEV) {
  console.warn(
    '[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY missing — the contact form will fall back to the e-mail route.',
  );
}
