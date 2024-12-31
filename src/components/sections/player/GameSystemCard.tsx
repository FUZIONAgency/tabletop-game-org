import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plus } from "lucide-react";
import { useAuth } from "@/contexts/auth";
import { useState } from "react";
import { AddGameSystemModal } from "./AddGameSystemModal";
import { GameSystemCardContent } from "./GameSystemCardContent";

interface GameSystem {
  id: string;
  name: string;
  description: string | null;
  logo_image_url: string | null;
}

export const GameSystemCard = ({ gameSystem }: { gameSystem?: GameSystem }) => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

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
    queryKey: ['player_game_account', player?.id, gameSystem?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('player_game_accounts')
        .select('*')
        .eq('player_id', player?.id)
        .eq('game_system_id', gameSystem?.id)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
    enabled: !!player?.id && !!gameSystem?.id
  });

  const { data: exams } = useQuery({
    queryKey: ['exams', gameSystem?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('exams')
        .select('*')
        .eq('game_system_id', gameSystem?.id);
      
      if (error) throw error;
      return data;
    },
    enabled: !!gameSystem?.id
  });

  const { data: playerExams } = useQuery({
    queryKey: ['player_exams', player?.id, exams],
    queryFn: async () => {
      if (!player || !exams?.length) return [];

      const { data, error } = await supabase
        .from('player_exams')
        .select('*')
        .eq('player_id', player.id)
        .in('exam_id', exams.map(exam => exam.id));

      if (error) throw error;
      return data;
    },
    enabled: !!player?.id && !!gameSystem?.id && !!exams?.length
  });

  // If this is the "Add More Games" card
  if (!gameSystem) {
    return (
      <>
        <Card className="cursor-pointer">
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <h3 className="text-lg font-semibold">Add Game System</h3>
            </div>
            <Button 
              className="bg-gold hover:bg-gold/90 text-white"
              onClick={() => setIsOpen(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Game System
            </Button>
          </CardContent>
        </Card>
        {player && (
          <AddGameSystemModal 
            isOpen={isOpen} 
            onOpenChange={setIsOpen}
            playerId={player.id}
          />
        )}
      </>
    );
  }

  if (!playerGameAccount) {
    return null;
  }

  const completedExamIds = playerExams?.map(exam => exam.exam_id) || [];
  const hasCertification = playerExams && playerExams.length > 0;

  return (
    <GameSystemCardContent 
      gameSystem={gameSystem}
      exams={exams}
      hasCertification={hasCertification}
      accountId={playerGameAccount.account_id}
      completedExamIds={completedExamIds}
    />
  );
};