import type { User } from "@supabase/supabase-js";

export interface AuthContextType {
  user: User | null;
  role: string | null;
  isLoading: boolean;
}