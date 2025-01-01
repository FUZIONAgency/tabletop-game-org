import { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

export interface AuthContextType {
  session: Session | null;
  user: User | null;
  role: string | null;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  role: null,
  isLoading: true
});

const fetchAndStoreUserData = async (userId: string, userEmail: string) => {
  try {
    // Fetch profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (profile) {
      localStorage.setItem('user_profile', JSON.stringify(profile));
    }

    // Fetch player
    const { data: player } = await supabase
      .from('players')
      .select('*')
      .eq('auth_id', userId)
      .single();
    
    if (player) {
      localStorage.setItem('user_player', JSON.stringify(player));
      const playerId = player.id;

      // Fetch campaign players
      const { data: campaignPlayers } = await supabase
        .from('campaign_players')
        .select('*')
        .eq('player_id', playerId);
      
      if (campaignPlayers) {
        localStorage.setItem('user_campaign_players', JSON.stringify(campaignPlayers));
      }

      // Fetch game accounts
      const { data: gameAccounts } = await supabase
        .from('player_game_accounts')
        .select('*')
        .eq('player_id', playerId);
      
      if (gameAccounts) {
        localStorage.setItem('user_game_accounts', JSON.stringify(gameAccounts));
      }

      // Fetch ratings
      const { data: ratings } = await supabase
        .from('player_ratings')
        .select('*')
        .eq('player_id', playerId);
      
      if (ratings) {
        localStorage.setItem('user_ratings', JSON.stringify(ratings));
      }

      // Fetch relationships
      const { data: relationships } = await supabase
        .from('player_relationships')
        .select('*')
        .or(`upline_id.eq.${playerId},downline_id.eq.${playerId}`);
      
      if (relationships) {
        localStorage.setItem('user_relationships', JSON.stringify(relationships));
      }

      // Fetch retailers
      const { data: retailers } = await supabase
        .from('player_retailers')
        .select('*')
        .eq('player_id', playerId);
      
      if (retailers) {
        localStorage.setItem('user_retailers', JSON.stringify(retailers));
      }

      // Fetch sessions
      const { data: sessions } = await supabase
        .from('player_sessions')
        .select('*')
        .eq('player_id', playerId);
      
      if (sessions) {
        localStorage.setItem('user_sessions', JSON.stringify(sessions));
      }
    }

  } catch (error) {
    console.error('Error fetching user data:', error);
    toast({
      title: "Error",
      description: "Failed to load user data",
      variant: "destructive"
    });
  }
};

const clearUserData = () => {
  localStorage.removeItem('user_profile');
  localStorage.removeItem('user_player');
  localStorage.removeItem('user_campaign_players');
  localStorage.removeItem('user_game_accounts');
  localStorage.removeItem('user_ratings');
  localStorage.removeItem('user_relationships');
  localStorage.removeItem('user_retailers');
  localStorage.removeItem('user_sessions');
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;

        if (mounted) {
          setSession(session);
          setUser(session?.user ?? null);

          if (session?.user) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', session.user.id)
              .maybeSingle();

            if (mounted) {
              setRole(profile?.role ?? null);
            }

            // Fetch and store user data
            await fetchAndStoreUserData(session.user.id, session.user.email!);
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          try {
            const { data: profile } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', session.user.id)
              .maybeSingle();

            if (mounted) {
              setRole(profile?.role ?? null);
            }

            // Fetch and store user data on sign in
            if (event === 'SIGNED_IN') {
              await fetchAndStoreUserData(session.user.id, session.user.email!);
            }
          } catch (error) {
            console.error("Error fetching profile:", error);
          }
        } else {
          setRole(null);
          // Clear stored data on sign out
          clearUserData();
        }

        if (event === 'SIGNED_OUT') {
          navigate('/auth');
          toast({
            title: "Success",
            description: "Logged out successfully"
          });
        } else if (event === 'SIGNED_IN') {
          const returnPath = localStorage.getItem('returnPath') || '/';
          localStorage.removeItem('returnPath');
          navigate(returnPath);
          toast({
            title: "Success",
            description: "Logged in successfully"
          });
        }
      }
    );

    initializeAuth();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  const value = {
    session,
    user,
    role,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};