import { Session, User } from "@supabase/supabase-js";

export type UserRole = 'admin' | 'user' | null;

export interface AuthContextType {
  session: Session | null;
  user: User | null;
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