import { createContext, useEffect, useState } from "react";
import type { AuthContextType } from "./types";
import { supabase } from "@/integrations/supabase/client";

export const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  isLoading: true,
});

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user?.id) {
        fetchUserRole(session.user.id);
      }
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session);
      setUser(session?.user ?? null);
      
      if (session?.user?.id) {
        fetchUserRole(session.user.id);
      } else {
        setRole(null);
      }
      
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setRole(data?.role ?? null);
    } catch (error) {
      console.error('Error fetching user role:', error);
      setRole(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}