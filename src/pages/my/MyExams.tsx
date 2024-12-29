import { useAuth } from "@/contexts/auth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import PageLayout from "@/components/PageLayout";

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

  const { data: exams, isLoading, error } = useQuery({
    queryKey: ['my-exams', player?.id],
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
        
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        ) : (
          <div className="space-y-4">
            {exams?.map((exam) => (
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
            {exams?.length === 0 && (
              <p className="text-gray-600 text-center py-8">
                You haven't taken any exams yet.
              </p>
            )}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default MyExams;