import { supabase } from "@/integrations/supabase/client";

export const authService = {
  async fetchUserRole(userId: string) {
    try {
      console.log('Fetching user role for:', userId);
      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .maybeSingle();

      if (error) {
        console.error("Error fetching user role:", error);
        return null;
      }

      console.log('User role data:', data);
      return data?.role ?? null;
    } catch (error) {
      console.error("Error in fetchUserRole:", error);
      return null;
    }
  },

  async getSession() {
    return await supabase.auth.getSession();
  },

  onAuthStateChange(callback: (session: any) => void) {
    return supabase.auth.onAuthStateChange(async (_, session) => {
      callback(session);
    });
  }
};