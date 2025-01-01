import { User, Session } from "@supabase/supabase-js";

export type UserRole = "anonymous" | "user" | "admin";

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  role: UserRole;
  isLoading: boolean;
  signOut: () => Promise<void>;
}