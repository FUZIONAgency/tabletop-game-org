import { createContext, useEffect, useState } from "react";
import type { AuthContextType } from "./types";
import { authService } from "./authService";

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
    console.log('AuthProvider mounted, isLoading:', isLoading);
    let mounted = true;

    const initializeAuth = async () => {
      if (!mounted) return;
      
      try {
        console.log('Initializing auth...');
        const { data: { session } } = await authService.getSession();
        console.log('Session received:', session);
        
        if (!mounted) return;

        setUser(session?.user ?? null);
        
        if (session?.user) {
          const userRole = await authService.fetchUserRole(session.user.id);
          if (!mounted) return;
          setRole(userRole);
        } else {
          setRole(null);
        }
      } catch (error) {
        console.error("Error in initializeAuth:", error);
      } finally {
        if (mounted) {
          console.log('Setting isLoading to false');
          setIsLoading(false);
        }
      }
    };

    // Initialize auth immediately
    initializeAuth();

    // Set up auth state change listener
    const { data: { subscription } } = authService.onAuthStateChange(async (session) => {
      console.log('Auth state changed:', session);
      if (!mounted) return;

      setUser(session?.user ?? null);
      
      if (session?.user) {
        const userRole = await authService.fetchUserRole(session.user.id);
        if (!mounted) return;
        setRole(userRole);
      } else {
        setRole(null);
      }
      setIsLoading(false);
    });

    return () => {
      console.log('AuthProvider unmounting');
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  console.log('AuthProvider rendering with state:', { user, role, isLoading });

  return (
    <AuthContext.Provider value={{ user, role, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}