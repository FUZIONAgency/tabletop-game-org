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
    console.log('AuthProvider mounted');
    let mounted = true;

    const initializeAuth = async () => {
      try {
        console.log('Initializing auth...');
        const { data: { session } } = await authService.getSession();
        console.log('Session:', session);
        
        if (mounted) {
          setUser(session?.user ?? null);
          
          if (session?.user) {
            const userRole = await authService.fetchUserRole(session.user.id);
            setRole(userRole);
          } else {
            setRole(null);
          }
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error in initializeAuth:", error);
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    initializeAuth();

    const { data: { subscription } } = authService.onAuthStateChange(async (session) => {
      console.log('Auth state changed:', session);
      if (mounted) {
        setUser(session?.user ?? null);
        
        if (session?.user) {
          const userRole = await authService.fetchUserRole(session.user.id);
          setRole(userRole);
        } else {
          setRole(null);
        }
        setIsLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  console.log('AuthProvider state:', { user, role, isLoading });

  return (
    <AuthContext.Provider value={{ user, role, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}