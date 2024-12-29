import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Trophy } from "lucide-react";
import { useAuth } from "@/contexts/auth";

interface GameSystem {
  id: string;
  name: string;
  description: string | null;
  logo_image_url: string | null;
}

interface Exam {
  id: string;
  name: string;
  weight: number;
}

interface PlayerExam {
  id: string;
  exam_id: string;
  score: number | null;
}

export const GameSystemCard = ({ gameSystem }: { gameSystem: GameSystem }) => {
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

  const { data: playerGameAccount } = useQuery({
    queryKey: ['player_game_account', player?.id, gameSystem.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('player_game_accounts')
        .select('*')
        .eq('player_id', player?.id)
        .eq('game_system_id', gameSystem.id)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!player?.id
  });

  const { data: exams } = useQuery({
    queryKey: ['exams', gameSystem.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('exams')
        .select('*')
        .eq('game_system_id', gameSystem.id);
      
      if (error) throw error;
      return data as Exam[];
    }
  });

  const { data: playerExams } = useQuery({
    queryKey: ['player_exams', gameSystem.id],
    queryFn: async () => {
      if (!player) return [];

      const { data, error } = await supabase
        .from('player_exams')
        .select('*')
        .eq('player_id', player.id);

      if (error) throw error;
      return data as PlayerExam[];
    },
    enabled: !!player?.id
  });

  const hasCertification = playerExams && playerExams.length > 0;

  if (!playerGameAccount) {
    return null;
  }

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
        <div className="flex items-center space-x-4 w-full">
          {gameSystem.logo_image_url && (
            <img
              src={gameSystem.logo_image_url}
              alt={gameSystem.name}
              className="h-12 w-12 object-contain"
            />
          )}
          <h3 className="text-lg font-semibold">{gameSystem.name}</h3>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {hasCertification ? (
          <div className="flex items-center gap-2 text-green-600">
            <Trophy className="h-5 w-5" />
            <span>Certified!</span>
          </div>
        ) : (
          <div className="space-y-2">
            {exams?.map((exam) => (
              <div key={exam.id} className="flex items-center justify-between">
                <span className="text-sm">{exam.name}</span>
                <Button 
                  variant="default" 
                  className="bg-gold hover:bg-gold/90 text-white"
                >
                  Take Exam
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};