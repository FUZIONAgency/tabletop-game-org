import { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { AuthStateHandlerProps, InitAuthProps } from "./types";

export async function initializeAuth(
  { setSession, setUser, setRole, setIsLoading }: InitAuthProps,
  mounted: boolean
) {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      throw error;
    }

    if (session) {
      if (mounted) {
        setSession(session);
        setUser(session.user);
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .maybeSingle();

      if (mounted) {
        setRole(profile?.role ?? null);
      }

      await fetchAndStoreUserData(session.user.id, session.user.email!);
    }
  } catch (error) {
    console.error('Error initializing auth:', error);
  } finally {
    if (mounted) {
      setIsLoading(false);
    }
  }
}

export function handleAuthStateChange({
  navigate,
  setSession,
  setUser,
  setRole,
  setIsLoading,
  mounted,
}: AuthStateHandlerProps) {
  return supabase.auth.onAuthStateChange(
    async (event, session) => {
      if (mounted) {
        if (session) {
          setSession(session);
          setUser(session.user);

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
          }

          if (event === 'SIGNED_OUT') {
            setSession(null);
            setUser(null);
            clearUserData();
          }
        } else {
          setRole(null);
          clearUserData();
        }

        if (event === 'PASSWORD_RECOVERY') {
          navigate('/auth', {
            state: { mode: 'resetPassword' }
          });
        }

        if (mounted) {
          setIsLoading(false);
        }
      }
    }
  );
}

export async function fetchAndStoreUserData(userId: string, email: string) {
  try {
    const { data: player } = await supabase
      .from('players')
      .select('*')
      .eq('auth_id', userId)
      .maybeSingle();

    if (!player) {
      await supabase.from('players').insert({
        auth_id: userId,
        email: email,
        alias: email
      });
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}

export async function clearUserData() {
  try {
    await supabase.auth.signOut();
  } catch (error) {
    console.error('Error clearing user data:', error);
  }
}