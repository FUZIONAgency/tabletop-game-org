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
      console.error('Error signing out:', error);
      toast.error("Failed to sign out properly");
    }
  };

  useEffect(() => {
    // Initialize auth state
    const initAuth = async () => {
      try {
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }

        if (currentSession?.user) {
          setUser(currentSession.user);
          setSession(currentSession);
          
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', currentSession.user.id)
            .maybeSingle();
          
          setRole(profile?.role as UserRole || "user");
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        toast.error("Authentication error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log('Auth state changed:', event);

        if (event === 'SIGNED_OUT') {
          setUser(null);
          setSession(null);
          setRole("anonymous");
          setIsLoading(false);
          return;
        }

        if (newSession?.user) {
          setUser(newSession.user);
          setSession(newSession);
          
          try {
            const { data: profile } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', newSession.user.id)
              .maybeSingle();
            
            setRole(profile?.role as UserRole || "user");
          } catch (error) {
            console.error('Error fetching profile:', error);
            setRole("user");
          }
        } else {
          setUser(null);
          setSession(null);
          setRole("anonymous");
        }
        
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
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
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};