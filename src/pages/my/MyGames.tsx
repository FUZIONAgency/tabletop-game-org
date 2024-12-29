import Navigation from "@/components/Navigation";
import { useAuth } from "@/contexts/auth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Plus, Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { AddGameSystemModal } from "@/components/sections/player/AddGameSystemModal";

const MyGames = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: player } = useQuery({
    queryKey: ['player', user?.email],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .eq('email', user?.email)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.email
  });

  const { data: games, isLoading, error } = useQuery({
    queryKey: ['my-games', user?.id],
    queryFn: async () => {
      const { data: playerData, error: playerError } = await supabase
        .from('players')
        .select('id')
        .eq('auth_id', user?.id)
        .maybeSingle();

      if (playerError) throw playerError;
      if (!playerData) return [];

      const { data, error: gamesError } = await supabase
        .from('player_game_accounts')
        .select(`
          account_id,
          game_system:game_systems (
            id,
            name,
            description,
            logo_image_url,
            video_url
          )
        `)
        .eq('player_id', playerData.id);

      if (gamesError) throw gamesError;
      return data || [];
    },
    enabled: !!user,
  });

  const { data: playerExams } = useQuery({
    queryKey: ['player_exams', player?.id],
    queryFn: async () => {
      if (!player?.id) return [];
      
      const { data, error } = await supabase
        .from('player_exams')
        .select('exam_id, exam:exams(game_system_id)')
        .eq('player_id', player.id);
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!player?.id
  });

  // Create a Set of game system IDs that have exams completed
  const completedGameSystems = new Set(
    playerExams?.map(exam => exam.exam?.game_system_id)
  );

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
              {games && games.length > 0 ? (
                games.map((game) => (
                  <Card key={game.game_system?.id || game.account_id} className="p-4">
                    <div className="flex items-center gap-4">
                      {game.game_system?.logo_image_url && (
                        <img 
                          src={game.game_system.logo_image_url} 
                          alt={game.game_system.name}
                          className="w-24 h-24 object-contain rounded-lg"
                        />
                      )}
                      <div className="flex-grow">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{game.game_system?.name}</h3>
                          {completedGameSystems.has(game.game_system?.id) && (
                            <Trophy className="h-5 w-5 text-green-600" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{game.game_system?.description}</p>
                        {game.game_system?.video_url && (
                          <a 
                            href={game.game_system.video_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline mt-2 inline-block"
                          >
                            Watch Tutorial
                          </a>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Account ID:</p>
                        <p className="font-medium">{game.account_id}</p>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-4">
                  <p className="text-center text-gray-500">No games added yet.</p>
                </Card>
              )}
              
              {/* Add Game Account Card */}
              <Card className="p-4 border-2 border-dashed cursor-pointer hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Plus className="h-8 w-8" />
                    <span className="text-lg font-semibold">Add a Game Account</span>
                  </div>
                  <Button 
                    className="bg-gold hover:bg-gold/90 text-white"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Account
                  </Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </main>
      {player && (
        <AddGameSystemModal 
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
          playerId={player.id}
        />
      )}
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