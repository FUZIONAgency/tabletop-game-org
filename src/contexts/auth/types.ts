import { User, Session } from "@supabase/supabase-js";
import { NavigateFunction } from "react-router-dom";

export type UserRole = "anonymous" | "user" | "admin";

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  role: UserRole;
  isLoading: boolean;
  signOut: () => Promise<void>;
}

export interface AuthStateHandlerProps {
  navigate: NavigateFunction;
  setSession: (session: Session | null) => void;
  setUser: (user: User | null) => void;
  setRole: (role: UserRole | null) => void;
  setIsLoading: (loading: boolean) => void;
  mounted: boolean;
}

export interface InitAuthProps {
  setSession: (session: Session | null) => void;
  setUser: (user: User | null) => void;
  setRole: (role: UserRole | null) => void;
  setIsLoading: (loading: boolean) => void;
}