import Navigation from "@/components/Navigation";
import { useAuth } from "@/contexts/auth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const MyGames = () => {
  const { user } = useAuth();

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
      return data?.map(pga => pga.game_system) || [];
    },
    enabled: !!user,
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
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          ) : games?.length === 0 ? (
            <p className="text-gray-500">You haven't connected with any games yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {games?.map((game) => (
                <div key={game.id} className="border rounded-lg overflow-hidden shadow-sm">
                  {game.logo_image_url && (
                    <img 
                      src={game.logo_image_url} 
                      alt={game.name}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{game.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{game.description}</p>
                    {game.video_url && (
                      <a 
                        href={game.video_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Watch Tutorial
                      </a>
                    )}
                  </div>
                </div>
              ))}
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