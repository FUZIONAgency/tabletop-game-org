import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await authService.getSession();
        setUser(session?.user ?? null);
        
        if (session?.user) {
          const userRole = await authService.fetchUserRole(session.user.id);
          setRole(userRole);
        } else {
          setRole(null);
        }
      } catch (error) {
        console.error("Error in initializeAuth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = authService.onAuthStateChange(async (session) => {
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const userRole = await authService.fetchUserRole(session.user.id);
        setRole(userRole);
      } else {
        setRole(null);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}