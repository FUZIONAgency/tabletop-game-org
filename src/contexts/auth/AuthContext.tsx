import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { AuthContextType } from "./types";
import { authService } from "./authService";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";

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
        setIsLoading(true);
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
        setUser(null);
        setRole(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = authService.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        console.log("Auth state changed:", event, session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          try {
            const userRole = await authService.fetchUserRole(session.user.id);
            setRole(userRole);
          } catch (error) {
            console.error("Error fetching user role:", error);
            setRole(null);
          }
        } else {
          setRole(null);
        }
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}