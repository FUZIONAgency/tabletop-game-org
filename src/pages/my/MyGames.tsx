import { useAuth } from "@/contexts/auth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { GameSystemCard } from "@/components/sections/player/GameSystemCard";
import { usePlayerData } from "@/components/network/hooks/usePlayerData";
import PageLayout from "@/components/PageLayout";

const MyGames = () => {
  const { user } = useAuth();
  const playerId = usePlayerData(user?.id);

  const { data: campaigns, isLoading, error } = useQuery({
    queryKey: ['my-campaigns', playerId],
    queryFn: async () => {
      if (!playerId) return [];

      const { data: campaignPlayers, error } = await supabase
        .from('campaign_players')
        .select(`
          campaign:campaigns (
            id,
            game_system:game_systems (
              id,
              name,
              description,
              logo_image_url,
              video_url
            )
          )
        `)
        .eq('player_id', playerId);

      if (error) throw error;

      // Transform the data to match PlayerGameAccount type and remove duplicates
      const uniqueGameSystems = campaignPlayers?.reduce((acc, cp) => {
        const gameSystem = cp.campaign?.game_system;
        if (gameSystem && !acc.some(g => g.game_system.id === gameSystem.id)) {
          acc.push({
            account_id: cp.campaign.id,
            game_system: gameSystem
          });
        }
        return acc;
      }, []);

      return uniqueGameSystems || [];
    },
    enabled: !!playerId,
  });

  return (
    <PageLayout>
      <div className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8">My Games</h1>
        
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              There was an error loading your games. Please try again later.
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
            {campaigns?.map((game) => (
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

export default MyGames;