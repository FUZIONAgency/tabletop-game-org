import { createContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    }).catch((error) => {
      console.error("Error getting session:", error);
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);

      if (event === 'SIGNED_OUT') {
        navigate('/auth');
        toast.success("Logged out successfully");
      } else if (event === 'SIGNED_IN') {
        // Get the return path from localStorage or default to '/'
        const returnPath = localStorage.getItem('returnPath') || '/';
        localStorage.removeItem('returnPath'); // Clean up
        navigate(returnPath);
        toast.success("Logged in successfully");
      } else if (event === 'TOKEN_REFRESHED') {
        // Handle successful token refresh
        console.log('Token refreshed successfully');
      } else if (event === 'USER_UPDATED') {
        // Handle user data update
        console.log('User data updated');
      }
    });

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}