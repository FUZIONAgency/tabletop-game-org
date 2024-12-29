import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { GraduationCap, Trophy } from "lucide-react";

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
  approval_player_id: string | null;
}

export const GameSystemCard = ({ gameSystem }: { gameSystem: GameSystem }) => {
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
      const { data: player } = await supabase
        .from('players')
        .select('id')
        .eq('auth_id', (await supabase.auth.getUser()).data.user?.id)
        .single();

      if (!player) return [];

      const { data, error } = await supabase
        .from('player_exams')
        .select('*')
        .eq('player_id', player.id);

      if (error) throw error;
      return data as PlayerExam[];
    }
  });

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center space-y-0 pb-2">
        <div className="flex items-center space-x-4">
          {gameSystem.logo_image_url && (
            <img
              src={gameSystem.logo_image_url}
              alt={gameSystem.name}
              className="h-12 w-12 object-contain"
            />
          )}
          <CardTitle className="text-xl">{gameSystem.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <GraduationCap className="mr-2 h-5 w-5" />
                Available Exams
              </CardTitle>
            </CardHeader>
            <CardContent>
              {exams?.length === 0 && (
                <p className="text-sm text-muted-foreground">No exams available yet</p>
              )}
              {exams?.map((exam) => (
                <div key={exam.id} className="mb-2">
                  <p className="font-medium">{exam.name}</p>
                  <p className="text-sm text-muted-foreground">Weight: {exam.weight}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                <Trophy className="mr-2 h-5 w-5" />
                Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {playerExams?.length === 0 && (
                <p className="text-sm text-muted-foreground">No exam results yet</p>
              )}
              {playerExams?.map((playerExam) => {
                const exam = exams?.find(e => e.id === playerExam.exam_id);
                return (
                  <div key={playerExam.id} className="mb-2">
                    <p className="font-medium">{exam?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Score: {playerExam.score ?? 'Pending'}
                    </p>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};