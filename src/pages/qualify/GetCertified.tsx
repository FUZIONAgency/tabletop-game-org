import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { GameSystemCard } from "@/components/sections/player/GameSystemCard";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth";

const GetCertified = () => {
  const { user } = useAuth();

  const { data: player } = useQuery({
    queryKey: ['player', user?.email],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .eq('email', user?.email)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.email
  });

  const { data: playerGameAccounts } = useQuery({
    queryKey: ['player_game_accounts', player?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('player_game_accounts')
        .select('game_system_id')
        .eq('player_id', player?.id);
      
      if (error) throw error;
      return data;
    },
    enabled: !!player?.id
  });

  const { data: gameSystems, isLoading } = useQuery({
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

  const filteredGameSystems = gameSystems?.filter(gameSystem => 
    playerGameAccounts?.some(account => account.game_system_id === gameSystem.id)
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        <div className="container mx-auto px-6 py-8">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Get Certified</CardTitle>
              <CardDescription>
                Complete your certification process to become a qualified pro
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  <div className="h-24 bg-muted animate-pulse rounded-lg" />
                  <div className="h-24 bg-muted animate-pulse rounded-lg" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
                  {filteredGameSystems?.map((gameSystem) => (
                    <GameSystemCard key={gameSystem.id} gameSystem={gameSystem} />
                  ))}
                  {filteredGameSystems?.length === 0 && (
                    <p className="text-center text-muted-foreground col-span-full">
                      No game systems available for certification
                    </p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default GetCertified;