import { Session, AuthChangeEvent } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { AuthStateHandlerProps, InitAuthProps, UserRole } from "./types";

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
        setRole(profile?.role as UserRole ?? null);
      }

      await fetchAndStoreUserData(session.user.id);
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
  return supabase.auth.onAuthStateChange((event, session) => {
    const handleChange = async () => {
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
            setRole(profile?.role as UserRole ?? null);
          }

          if (event === 'SIGNED_IN') {
            await fetchAndStoreUserData(session.user.id);
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
          navigate('/auth');
        }

        if (mounted) {
          setIsLoading(false);
        }
      }
    };
    handleChange();
  });
}

export async function fetchAndStoreUserData(userId: string) {
  try {
    const { data: player } = await supabase
      .from('players')
      .select('*')
      .eq('auth_id', userId)
      .maybeSingle();

    if (!player) {
      const { data: userEmail } = await supabase
        .from('profiles')
        .select('email')
        .eq('id', userId)
        .single();

      if (userEmail?.email) {
        await supabase.from('players').insert({
          auth_id: userId,
          email: userEmail.email,
          alias: userEmail.email
        });
      }
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