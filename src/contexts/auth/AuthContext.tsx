import { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { AuthContextType, UserRole } from "./types";
import { toast } from "sonner";

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  role: "anonymous",
  isLoading: true,
  signOut: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [role, setRole] = useState<UserRole>("anonymous");
  const [isLoading, setIsLoading] = useState(true);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setRole("anonymous");
      localStorage.removeItem('sb-kwpptrhywkyuzadwxgdl-auth-token');
    } catch (error) {
      toast.error("Failed to sign out properly");
    }
  };

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const { data: { session: currentSession }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;

        if (mounted) {
          if (currentSession?.user) {
            setUser(currentSession.user);
            setSession(currentSession);
            
            const { data: profile, error: profileError } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', currentSession.user.id)
              .maybeSingle();
            
            if (profileError) throw profileError;

            setRole(profile?.role as UserRole || "user");
          }
          setIsLoading(false);
        }

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, newSession) => {
            if (!mounted) return;

            if (event === 'TOKEN_REFRESHED') {
              // Token refreshed successfully
            }

            if (event === 'SIGNED_OUT') {
              setUser(null);
              setSession(null);
              setRole("anonymous");
              localStorage.removeItem('sb-kwpptrhywkyuzadwxgdl-auth-token');
            }

            setSession(newSession);
            setUser(newSession?.user ?? null);

            if (newSession?.user) {
              try {
                const { data: profile } = await supabase
                  .from('profiles')
                  .select('role')
                  .eq('id', newSession.user.id)
                  .maybeSingle();
                
                setRole(profile?.role as UserRole || "user");
              } catch (error) {
                setRole("user");
              }
            }
          }
        );

        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        setRole("user");
        setIsLoading(false);
      }
    };

    initializeAuth();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, role, isLoading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};