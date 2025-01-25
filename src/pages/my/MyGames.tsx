import Navigation from "@/components/Navigation";
import { useAuth } from "@/contexts/auth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { GameSystemCard } from "@/components/sections/player/GameSystemCard";
import { PlayerGameAccount } from "@/types/player-game-account";
import { usePlayerData } from "@/components/network/hooks/usePlayerData";

const MyGames = () => {
  const { user } = useAuth();
  const playerId = usePlayerData(user?.id);

  const { data: games, isLoading, error } = useQuery({
    queryKey: ['my-owned-games', user?.id],
    queryFn: async () => {
      if (!playerId) return [];

      // Get campaigns where the player is an owner
      const { data: campaigns, error: campaignsError } = await supabase
        .from('campaigns')
        .select(`
          id,
          game_system:game_systems (
            id,
            name,
            description,
            logo_image_url,
            video_url
          )
        `)
        .eq('id', (
          supabase
            .from('campaign_players')
            .select('campaign_id')
            .eq('player_id', playerId)
            .eq('role_type', 'owner')
        ));

      if (campaignsError) throw campaignsError;
      
      // Transform the data to match PlayerGameAccount type
      return campaigns.map(campaign => ({
        account_id: campaign.id,
        game_system: campaign.game_system
      })) as PlayerGameAccount[];
    },
    enabled: !!playerId,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow bg-white">
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
              {games?.map((game) => (
                <GameSystemCard 
                  key={game.game_system.id} 
                  gameSystem={game.game_system}
                />
              ))}
              <GameSystemCard />
            </div>
          )}
        </div>
      </main>
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm">
            © {new Date().getFullYear()} TabletopGame.org. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MyGames;