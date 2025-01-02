import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://kwpptrhywkyuzadwxgdl.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3cHB0cmh5d2t5dXphZHd4Z2RsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY4MjU2MDAsImV4cCI6MjAyMjQwMTYwMH0.RwHcmXCEHxZD9jNXZGvyoGvxLqZF-v3vTPWbAe7qnDk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
  },
});