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
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await authService.getSession();
        
        if (session?.user) {
          setUser(session.user);
          const userRole = await authService.fetchUserRole(session.user.id);
          setRole(userRole);
        } else {
          setUser(null);
          setRole(null);
        }
      } catch (error) {
        console.error("Error in initializeAuth:", error);
        setUser(null);
        setRole(null);
      } finally {
        setIsLoading(false);  // Make sure we set loading to false after initial check
      }
    };

    initializeAuth();

    const { data: { subscription } } = authService.onAuthStateChange(async (session) => {
      try {
        if (session?.user) {
          setUser(session.user);
          const userRole = await authService.fetchUserRole(session.user.id);
          setRole(userRole);
        } else {
          setUser(null);
          setRole(null);
        }
      } catch (error) {
        console.error("Error in auth state change:", error);
        setUser(null);
        setRole(null);
      } finally {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}