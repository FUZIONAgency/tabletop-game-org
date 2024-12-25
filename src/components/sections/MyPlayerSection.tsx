import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth";
import { supabase } from "@/integrations/supabase/client";
import { User, MapPin, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CreatePlayerForm } from "@/components/forms/CreatePlayerForm";

interface PlayerData {
  id: string;
  alias: string;
  email: string;
  city: string | null;
  state: string | null;
  alias_image_url: string | null;
}

interface GameSystem {
  id: string;
  name: string;
  description: string | null;
  logo_image_url: string | null;
}

const MyPlayerSection = () => {
  const { user } = useAuth();
  const [player, setPlayer] = useState<PlayerData | null>(null);
  const [gameSystems, setGameSystems] = useState<GameSystem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    if (!user?.email) return;

    try {
      const [playerResult, gameSystemsResult] = await Promise.all([
        supabase
          .from("players")
          .select("*")
          .eq("email", user.email)
          .maybeSingle(),
        supabase
          .from("game_systems")
          .select("*")
          .eq("status", "active")
      ]);

      if (playerResult.error) {
        console.error("Error fetching player data:", playerResult.error);
        return;
      }

      if (gameSystemsResult.error) {
        console.error("Error fetching game systems:", gameSystemsResult.error);
        return;
      }

      setPlayer(playerResult.data);
      setGameSystems(gameSystemsResult.data || []);
    } catch (error) {
      console.error("Error in fetchData:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user?.email]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6">
        <Skeleton className="h-[200px] w-full" />
      </div>
    );
  }

  if (!player) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-center">No Player Profile Found</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            Your email is not associated with any player profile.
          </p>
          {user?.email && <CreatePlayerForm email={user.email} onSuccess={fetchData} />}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {player.alias}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {player.city && player.state && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>
                {player.city}, {player.state}
              </span>
            </div>
          )}
          {player.alias_image_url && (
            <img
              src={player.alias_image_url}
              alt={player.alias}
              className="w-32 h-32 object-cover rounded-full mx-auto"
            />
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {gameSystems.map((gameSystem) => (
          <Card key={gameSystem.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold">
                {gameSystem.name}
              </CardTitle>
              <Button className="ml-auto">
                <Check className="mr-2 h-4 w-4" />
                Qualify
              </Button>
            </CardHeader>
            <CardContent>
              {gameSystem.logo_image_url && (
                <img
                  src={gameSystem.logo_image_url}
                  alt={gameSystem.name}
                  className="h-12 object-contain mb-4"
                />
              )}
              <p className="text-sm text-muted-foreground">
                {gameSystem.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyPlayerSection;