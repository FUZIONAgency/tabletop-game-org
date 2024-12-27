import { supabase } from "@/integrations/supabase/client";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";

export const authService = {
  async fetchUserRole(userId: string) {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .maybeSingle();

      if (error) {
        console.error("Error fetching user role:", error);
        return null;
      }

      return data?.role ?? null;
    } catch (error) {
      console.error("Error in fetchUserRole:", error);
      return null;
    }
  },

  async getSession() {
    return await supabase.auth.getSession();
  },

  onAuthStateChange(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return supabase.auth.onAuthStateChange(callback);
  }
};