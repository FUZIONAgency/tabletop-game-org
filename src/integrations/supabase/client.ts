import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://kwpptrhywkyuzadwxgdl.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3cHB0cmh5d2t5dXphZHd4Z2RsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxNDEwMzAsImV4cCI6MjA0OTcxNzAzMH0.P0NkkD9J2eyfrv_7shJW0FjjYqnNU2OzwH2MbsiJowE";

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
);