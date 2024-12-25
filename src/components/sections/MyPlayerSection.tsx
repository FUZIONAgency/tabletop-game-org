import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ProfileCard } from "./player/ProfileCard";
import { PlayerCard } from "./player/PlayerCard";
import { GameSystemCard } from "./player/GameSystemCard";

interface PlayerData {
  id: string;
  alias: string;
  email: string;
  city: string | null;
  state: string | null;
  alias_image_url: string | null;
}

interface ProfileData {
  id: string;
  email: string | null;
  username: string | null;
  avatar_url: string | null;
  role: string | null;
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
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [gameSystems, setGameSystems] = useState<GameSystem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    if (!user?.id) return;

    try {
      const [playerResult, gameSystemsResult, profileResult] = await Promise.all([
        supabase
          .from("players")
          .select("*")
          .eq("email", user.email)
          .maybeSingle(),
        supabase
          .from("game_systems")
          .select("*")
          .eq("status", "active"),
        supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .maybeSingle()
      ]);

      if (playerResult.error) {
        console.error("Error fetching player data:", playerResult.error);
        return;
      }

      if (gameSystemsResult.error) {
        console.error("Error fetching game systems:", gameSystemsResult.error);
        return;
      }

      if (profileResult.error) {
        console.error("Error fetching profile:", profileResult.error);
        return;
      }

      setPlayer(playerResult.data);
      setGameSystems(gameSystemsResult.data || []);
      setProfile(profileResult.data);
    } catch (error) {
      console.error("Error in fetchData:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user?.id]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6">
        <Skeleton className="h-[200px] w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <ProfileCard profile={profile} />
      
      <Separator />
      
      <PlayerCard 
        player={player} 
        userEmail={user?.email || ""} 
        onSuccess={fetchData} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {gameSystems.map((gameSystem) => (
          <GameSystemCard key={gameSystem.id} gameSystem={gameSystem} />
        ))}
      </div>
    </div>
  );
};

export default MyPlayerSection;