import { useAuth } from "@/contexts/auth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const MyExams = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

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

  // Fetch player's game accounts
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

  // Fetch available exams based on player's game systems
  const { data: availableExams, isLoading: isLoadingAvailable } = useQuery({
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
            logo_image_url
          )
        `)
        .in('game_system_id', gameSystemIds)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!playerGameAccounts?.length
  });

  // Fetch completed exams
  const { data: completedExams, isLoading: isLoadingCompleted, error } = useQuery({
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
              logo_image_url
            )
          )
        `)
        .eq('player_id', player?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!player?.id
  });

  return (
    <PageLayout>
      <div className="container mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8">My Exams</h1>
        
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              There was an error loading your exams. Please try again later.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-8">
          {/* Completed Exams Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Completed Exams</h2>
            {isLoadingCompleted ? (
              <div className="space-y-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            ) : (
              <div className="space-y-4">
                {completedExams?.map((exam) => (
                  <div 
                    key={exam.id} 
                    className="bg-white rounded-lg shadow p-6 flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-4">
                      {exam.exam?.game_system?.logo_image_url && (
                        <img
                          src={exam.exam.game_system.logo_image_url}
                          alt={exam.exam.game_system.name}
                          className="h-12 w-12 object-contain"
                        />
                      )}
                      <div>
                        <h3 className="font-semibold">{exam.exam?.name}</h3>
                        <p className="text-sm text-gray-600">
                          {exam.exam?.game_system?.name}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">
                        Score: {exam.score ? `${exam.score}%` : 'Not completed'}
                      </div>
                    </div>
                  </div>
                ))}
                {completedExams?.length === 0 && (
                  <p className="text-gray-600 text-center py-8">
                    You haven't taken any exams yet.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Available Exams Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Available Exams</h2>
            {isLoadingAvailable ? (
              <div className="space-y-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
              </div>
            ) : (
              <div className="space-y-4">
                {availableExams?.map((exam) => (
                  <div 
                    key={exam.id} 
                    className="bg-white rounded-lg shadow p-6 flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-4">
                      {exam.game_system?.logo_image_url && (
                        <img
                          src={exam.game_system.logo_image_url}
                          alt={exam.game_system.name}
                          className="h-12 w-12 object-contain"
                        />
                      )}
                      <div>
                        <h3 className="font-semibold">{exam.name}</h3>
                        <p className="text-sm text-gray-600">
                          {exam.game_system?.name}
                        </p>
                      </div>
                    </div>
                    <Button 
                      onClick={() => navigate(`/exams/${exam.id}`)}
                      className="bg-gold hover:bg-gold/90"
                    >
                      Take Exam
                    </Button>
                  </div>
                ))}
                {availableExams?.length === 0 && (
                  <p className="text-gray-600 text-center py-8">
                    No exams are currently available. Add more games to unlock exams.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default MyExams;