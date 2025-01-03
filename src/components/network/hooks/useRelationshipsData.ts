import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Relationship {
  id: string;
  upline_id: string;
  downline_id: string;
  status: string;
}

export const useRelationshipsData = (playerId: string | null) => {
  const [relationships, setRelationships] = useState<Relationship[]>([]);

  useEffect(() => {
    const fetchRelationships = async () => {
      if (!playerId) return;

      try {
        const { data, error } = await supabase
          .from('player_relationships')
          .select('*')
          .or(`upline_id.eq.${playerId},downline_id.eq.${playerId}`);
        
        if (error) {
          console.error('Error fetching relationships:', error);
          return;
        }

        if (data) {
          setRelationships(data);
        }
      } catch (error) {
        console.error('Unexpected error in useRelationshipsData:', error);
      }
    };

    fetchRelationships();
  }, [playerId]);

  return relationships;
};