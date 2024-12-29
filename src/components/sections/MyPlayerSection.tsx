import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { GameSystemCard } from "./player/GameSystemCard";
import { ProfileCard } from "./player/ProfileCard";
import { AuthUserCard } from "./auth/AuthUserCard";
import { useAuth } from "@/contexts/auth";

const MyPlayerSection = () => {
  const { user } = useAuth();

  const { data: profile } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id,
  });

  const { data: gameSystems } = useQuery({
    queryKey: ['game_systems'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('game_systems')
        .select('*')
        .eq('status', 'active');
      
      if (error) throw error;
      return data;
    }
  });

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <AuthUserCard userId={user?.id} />
        <ProfileCard profile={profile} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {gameSystems?.map((gameSystem) => (
          <GameSystemCard key={gameSystem.id} gameSystem={gameSystem} />
        ))}
      </div>
    </div>
  );
};

export default MyPlayerSection;