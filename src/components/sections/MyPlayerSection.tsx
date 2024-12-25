import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth";
import { supabase } from "@/integrations/supabase/client";
import { User, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface PlayerData {
  id: string;
  alias: string;
  email: string;
  city: string | null;
  state: string | null;
  alias_image_url: string | null;
}

const MyPlayerSection = () => {
  const { user } = useAuth();
  const [player, setPlayer] = useState<PlayerData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlayerData = async () => {
      if (!user?.email) return;

      try {
        const { data, error } = await supabase
          .from("players")
          .select("*")
          .eq("email", user.email)
          .maybeSingle();

        if (error) {
          console.error("Error fetching player data:", error);
          return;
        }

        setPlayer(data);
      } catch (error) {
        console.error("Error in fetchPlayerData:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlayerData();
  }, [user?.email]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        <CardContent className="text-center text-muted-foreground">
          Your email is not associated with any player profile.
        </CardContent>
      </Card>
    );
  }

  return (
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
  );
};

export default MyPlayerSection;