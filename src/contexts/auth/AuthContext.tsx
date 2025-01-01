import { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export interface AuthContextType {
  session: Session | null;
  user: User | null;
  role: string | null;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  role: null,
  isLoading: true
});

// Function to fetch and store user data
const fetchAndStoreUserData = async (userId: string, email: string) => {
  try {
    // Check if profile exists
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (!existingProfile) {
      // Create profile if it doesn't exist
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: userId,
            email: email,
            role: 'user'
          }
        ]);

      if (profileError) throw profileError;
    }
  } catch (error) {
    console.error('Error fetching/storing user data:', error);
    throw error;
  }
};

// Function to clear user data
const clearUserData = () => {
  localStorage.removeItem('userData');
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    async function initializeAuth() {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Auth initialization error:", error);
          throw error;
        }

        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);

          if (session?.user) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', session.user.id)
              .maybeSingle();

            setRole(profile?.role ?? null);
            await fetchAndStoreUserData(session.user.id, session.user.email!);
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        console.log("Auth state change:", event, session);
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          try {
            const { data: profile } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', session.user.id)
              .maybeSingle();

            if (mounted) {
              setRole(profile?.role ?? null);
            }

            if (event === 'SIGNED_IN') {
              await fetchAndStoreUserData(session.user.id, session.user.email!);
              const returnPath = localStorage.getItem('returnPath') || '/';
              localStorage.removeItem('returnPath');
              navigate(returnPath);
              toast({
                title: "Success",
                description: "Logged in successfully"
              });
            }
          } catch (error) {
            console.error("Error fetching profile:", error);
          }
        } else {
          setRole(null);
          clearUserData();
        }

        if (event === 'SIGNED_OUT') {
          navigate('/auth');
          toast({
            title: "Success",
            description: "Logged out successfully"
          });
        }

        if (mounted) {
          setIsLoading(false);
        }
      }
    );

    initializeAuth();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  const value = {
    session,
    user,
    role,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};