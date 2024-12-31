import type { User, Session } from "@supabase/supabase-js";

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  role: string | null;
  isLoading: boolean;
}