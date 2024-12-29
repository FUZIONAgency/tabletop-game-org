import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth";

interface GameSystemCardContentProps {
  gameSystemId: string;
}

export const GameSystemCardContent = ({ gameSystemId }: GameSystemCardContentProps) => {
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

  const { data: playerExam } = useQuery({
    queryKey: ['player_exam', player?.id, gameSystemId],
    queryFn: async () => {
      const { data: exams } = await supabase
        .from('exams')
        .select('id')
        .eq('game_system_id', gameSystemId)
        .single();

      if (!exams) return null;

      const { data, error } = await supabase
        .from('player_exams')
        .select('*')
        .eq('player_id', player?.id)
        .eq('exam_id', exams.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error;
      return data;
    },
    enabled: !!player?.id && !!gameSystemId
  });

  const handleClick = () => {
    navigate('/my/exams');
  };

  const renderButton = () => {
    if (!playerExam) {
      return (
        <Button onClick={handleClick} className="w-full">
          Get Certified
        </Button>
      );
    }

    if (playerExam.score === 0) {
      return (
        <Button 
          disabled 
          className="w-full bg-burgundy hover:bg-burgundy/90"
        >
          In Review
        </Button>
      );
    }

    if (playerExam.score < 25) {
      return (
        <Button 
          onClick={handleClick}
          className="w-full bg-gold hover:bg-gold/90"
        >
          Re-Take
        </Button>
      );
    }

    return (
      <Button disabled className="w-full bg-green-600 hover:bg-green-600/90">
        Certified
      </Button>
    );
  };

  return (
    <div className="flex justify-center p-4">
      {renderButton()}
    </div>
  );
};