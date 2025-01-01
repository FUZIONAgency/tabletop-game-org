import { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { AuthContextType, UserRole } from "./types";
import { clearUserData, handleAuthStateChange, initializeAuth } from "./authService";

export const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  role: null,
  isLoading: true,
  signOut: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    // Initialize auth state
    initializeAuth({ setSession, setUser, setRole, setIsLoading }, mounted);

    // Subscribe to auth changes
    const { data: { subscription } } = handleAuthStateChange({
      navigate,
      setSession,
      setUser,
      setRole,
      setIsLoading,
      mounted,
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  const signOut = async () => {
    try {
      await clearUserData();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const value = {
    session,
    user,
    role,
    isLoading,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};