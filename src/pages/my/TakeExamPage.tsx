import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import TakeExamForm from "@/components/exams/TakeExamForm";
import PageLayout from "@/components/PageLayout";

const TakeExamPage = () => {
  const { examId } = useParams();
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

  if (!examId || !player) {
    return null;
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 pt-24 pb-12">
        <TakeExamForm
          examId={examId}
          playerId={player.id}
          onComplete={() => navigate("/my/exams")}
        />
      </div>
    </PageLayout>
  );
};

export default TakeExamPage;