import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { GameSystemCard } from "@/components/sections/player/GameSystemCard";
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const GetCertified = () => {
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
                <div className="space-y-4">
                  {gameSystems?.map((gameSystem) => (
                    <GameSystemCard key={gameSystem.id} gameSystem={gameSystem} />
                  ))}
                  {gameSystems?.length === 0 && (
                    <p className="text-center text-muted-foreground">
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