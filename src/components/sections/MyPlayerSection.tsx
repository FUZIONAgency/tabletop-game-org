import { useAuth } from "@/contexts/auth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { GameSystemCard } from "./player/GameSystemCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuthUserCard from "./auth/AuthUserCard";
import ProfileCard from "./player/ProfileCard";
import { Skeleton } from "@/components/ui/skeleton";

const MyPlayerSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['profile', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!user?.id
  });

  const { data: gameSystems, isLoading: gameSystemsLoading } = useQuery({
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

  if (profileLoading || gameSystemsLoading) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-[200px] w-full" />
          <Skeleton className="h-[200px] w-full" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton className="h-[200px] w-full" />
          <Skeleton className="h-[200px] w-full" />
          <Skeleton className="h-[200px] w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AuthUserCard userId={user?.id} />
        <ProfileCard profile={profile} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {gameSystems?.map((gameSystem) => (
          <GameSystemCard key={gameSystem.id} gameSystem={gameSystem} />
        ))}
        <Card className="h-full flex flex-col justify-center">
          <CardContent className="flex flex-col items-center justify-center space-y-4 py-6">
            <h3 className="text-lg font-semibold text-center">Add More Game Systems</h3>
            <Button 
              onClick={() => navigate('/my/games')} 
              className="bg-gold hover:bg-gold/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Games
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyPlayerSection;