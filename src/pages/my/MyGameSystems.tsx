import { useAuth } from "@/contexts/auth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { GameSystemCard } from "@/components/sections/player/GameSystemCard";
import { PlayerGameAccount } from "@/types/player-game-account";
import { usePlayerData } from "@/components/network/hooks/usePlayerData";
import PageLayout from "@/components/PageLayout";

const MyGameSystems = () => {
  const { user } = useAuth();
  const playerId = usePlayerData(user?.id);

  const { data: games, isLoading, error } = useQuery({
    queryKey: ['my-game-systems', playerId],
    queryFn: async () => {
      if (!playerId) return [];

      const { data, error: gamesError } = await supabase
        .from('player_game_accounts')
        .select(`
          id,
          player_id,
          game_system_id,
          account_id,
          status,
          game_system:game_systems (
            id,
            name,
            description,
            logo_image_url,
            video_url
          )
        `)
        .eq('player_id', playerId);

      if (gamesError) throw gamesError;
      return data as unknown as PlayerGameAccount[];
    },
    enabled: !!playerId,
  });

  return (
    <PageLayout>
      <div className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8">My Game Systems</h1>
        
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              There was an error loading your game systems. Please try again later.
            </AlertDescription>
          </Alert>
        )}
        
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        ) : (
          <div className="space-y-4">
            <GameSystemCard />
            {games?.map((game) => (
              <GameSystemCard 
                key={game.game_system.id} 
                gameSystem={game.game_system}
              />
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default MyGameSystems;