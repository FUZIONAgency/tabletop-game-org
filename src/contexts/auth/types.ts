import { User, Session } from "@supabase/supabase-js";

export type UserRole = "anonymous" | "user" | "admin";

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  role: UserRole;
  isLoading: boolean;
  signOut: () => Promise<void>;
}

export interface AuthStateHandlerProps {
  navigate: (path: string) => void;
  setSession: (session: Session | null) => void;
  setUser: (user: User | null) => void;
  setRole: (role: UserRole) => void;
  setIsLoading: (loading: boolean) => void;
  mounted: boolean;
}

export interface InitAuthProps {
  setSession: (session: Session | null) => void;
  setUser: (user: User | null) => void;
  setRole: (role: UserRole) => void;
  setIsLoading: (loading: boolean) => void;
}