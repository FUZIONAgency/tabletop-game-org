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
    console.log('Getting session...');
    const session = await supabase.auth.getSession();
    console.log('Session result:', session);
    return session;
  },

  onAuthStateChange(callback: (session: any) => void) {
    console.log('Setting up auth state change listener');
    return supabase.auth.onAuthStateChange(async (_, session) => {
      console.log('Auth state change detected:', session);
      callback(session);
    });
  }
};