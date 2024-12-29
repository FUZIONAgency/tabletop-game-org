import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import TakeExamForm from "@/components/exams/TakeExamForm";

const TakeExam = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
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

  const { data: exam, isLoading: isLoadingExam } = useQuery({
    queryKey: ['exam', examId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('exams')
        .select(`
          *,
          game_system:game_systems (
            id,
            name,
            logo_image_url
          )
        `)
        .eq('id', examId)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!examId
  });

  if (isLoadingExam) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 pt-24 pb-12">
          <Skeleton className="h-8 w-64 mb-8" />
          <Skeleton className="h-64 w-full" />
        </div>
      </PageLayout>
    );
  }

  if (!exam) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 pt-24 pb-12">
          <h1 className="text-3xl font-bold mb-8">Exam Not Found</h1>
          <Button onClick={() => navigate('/my/exams')}>Return to My Exams</Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">{exam.name}</h1>
            {exam.game_system && (
              <p className="text-gray-600">{exam.game_system.name}</p>
            )}
          </div>
          <Button
            variant="outline"
            onClick={() => navigate('/my/exams')}
          >
            Cancel
          </Button>
        </div>

        {player && (
          <TakeExamForm
            examId={examId!}
            playerId={player.id}
            onComplete={() => navigate('/my/exams')}
          />
        )}
      </div>
    </PageLayout>
  );
};

export default TakeExam;