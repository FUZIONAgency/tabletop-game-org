import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const usePlayerData = (userId: string | undefined) => {
  const [playerId, setPlayerId] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlayerId = async () => {
      if (!userId) return;

      const { data, error } = await supabase
        .from('players')
        .select('id')
        .eq('auth_id', userId)
        .single();

      if (error) {
        console.error('Error fetching player:', error);
        return;
      }

      if (data) {
        setPlayerId(data.id);
      } else {
        console.log('No player data found');
      }
    };

    fetchPlayerId();
  }, [userId]);

  return playerId;
};