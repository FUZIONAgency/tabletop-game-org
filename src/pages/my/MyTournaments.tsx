import Navigation from "@/components/Navigation";
import { useAuth } from "@/contexts/auth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { TournamentEntry } from "@/types/tournament";

const MyTournaments = () => {
  const { user } = useAuth();

  const { data: tournaments, isLoading, error } = useQuery({
    queryKey: ['my-tournaments', user?.id],
    queryFn: async () => {
      const { data: playerData, error: playerError } = await supabase
        .from('players')
        .select('id')
        .eq('auth_id', user?.id)
        .maybeSingle();

      if (playerError) throw playerError;
      if (!playerData) return [];

      const { data, error: tournamentsError } = await supabase
        .from('tournament_entries')
        .select(`
          id,
          tournament:tournaments (
            id,
            title,
            description,
            start_date,
            end_date,
            location,
            venue,
            image_url,
            prize_pool
          )
        `)
        .eq('player_id', playerData.id);

      if (tournamentsError) throw tournamentsError;
      return data as unknown as TournamentEntry[];
    },
    enabled: !!user,
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow bg-white">
        <div className="container mx-auto px-4 pt-24 pb-12">
          <h1 className="text-3xl font-bold mb-8">My Tournaments</h1>
          
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                There was an error loading your tournaments. Please try again later.
              </AlertDescription>
            </Alert>
          )}
          
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          ) : tournaments?.length === 0 ? (
            <p className="text-gray-500">You haven't entered any tournaments yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tournaments?.map((entry) => (
                <div key={entry.id} className="border rounded-lg overflow-hidden shadow-sm">
                  {entry.tournament.image_url && (
                    <img 
                      src={entry.tournament.image_url} 
                      alt={entry.tournament.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{entry.tournament.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{entry.tournament.description}</p>
                    <div className="text-sm text-gray-500">
                      <p>{entry.tournament.venue}</p>
                      <p>{entry.tournament.location}</p>
                      <p>
                        {format(new Date(entry.tournament.start_date), 'MMM d, yyyy')} - {format(new Date(entry.tournament.end_date), 'MMM d, yyyy')}
                      </p>
                      {entry.tournament.prize_pool && (
                        <p className="mt-2 text-green-600">Prize Pool: ${entry.tournament.prize_pool}</p>
                      )}
                    </div>
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

export default MyTournaments;