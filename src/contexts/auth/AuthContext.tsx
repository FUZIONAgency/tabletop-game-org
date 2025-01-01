import { createContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  role: string | null;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  role: null,
});

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    async function initializeAuth() {
      try {
        // Set loading state immediately
        if (mounted) setIsLoading(true);

        // Get initial session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;

        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);
          
          if (session?.user) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', session.user.id)
              .single();
            setRole(profile?.role ?? null);
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        // Always set loading to false when done
        if (mounted) setIsLoading(false);
      }
    }

    // Initialize auth state
    initializeAuth();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        try {
          setSession(session);
          setUser(session?.user ?? null);
          
          if (session?.user) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', session.user.id)
              .single();
            setRole(profile?.role ?? null);
          } else {
            setRole(null);
          }

          if (event === 'SIGNED_OUT') {
            navigate('/auth');
            toast.success("Logged out successfully");
          } else if (event === 'SIGNED_IN') {
            const returnPath = localStorage.getItem('returnPath') || '/';
            localStorage.removeItem('returnPath');
            navigate(returnPath);
            toast.success("Logged in successfully");
          }
        } catch (error) {
          console.error("Error handling auth state change:", error);
        } finally {
          setIsLoading(false);
        }
      }
    );

    // Cleanup
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        role,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}