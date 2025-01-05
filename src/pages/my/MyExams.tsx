import { useAuth } from "@/contexts/auth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import PageLayout from "@/components/PageLayout";
import CompletedExams from "@/components/exams/CompletedExams";
import AvailableExams from "@/components/exams/AvailableExams";
import { Exam, PlayerExam } from "@/types/exam";
import { Alert, AlertDescription } from "@/components/ui/alert";

const MyExams = () => {
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

  const { data: availableExams, isLoading: isLoadingAvailable } = useQuery<Exam[]>({
    queryKey: ['available-exams', playerGameAccounts],
    queryFn: async () => {
      if (!playerGameAccounts?.length) return [];
      
      const gameSystemIds = playerGameAccounts.map(account => account.game_system_id);
      
      const { data, error } = await supabase
        .from('exams')
        .select(`
          id,
          name,
          weight,
          game_system:game_systems (
            id,
            name,
            logo_image_url,
            description
          )
        `)
        .in('game_system_id', gameSystemIds)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as unknown as Exam[];
    },
    enabled: !!playerGameAccounts?.length
  });

  const { data: completedExams, isLoading: isLoadingCompleted, error } = useQuery<PlayerExam[]>({
    queryKey: ['completed-exams', player?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('player_exams')
        .select(`
          id,
          score,
          exam:exams (
            id,
            name,
            weight,
            game_system:game_systems (
              id,
              name,
              logo_image_url,
              description
            )
          )
        `)
        .eq('player_id', player?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as unknown as PlayerExam[];
    },
    enabled: !!player?.id
  });

  const completedExamIds = completedExams?.map(exam => exam.exam.id) || [];

  return (
    <PageLayout>
      <div className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8">My Exams</h1>
        
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>
              There was an error loading your exams. Please try again later.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Completed Exams</h2>
            <CompletedExams 
              completedExams={completedExams} 
              isLoading={isLoadingCompleted} 
            />
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Available Exams</h2>
            <AvailableExams 
              availableExams={availableExams}
              completedExamIds={completedExamIds}
              isLoading={isLoadingAvailable}
              playerId={player?.id}
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default MyExams;