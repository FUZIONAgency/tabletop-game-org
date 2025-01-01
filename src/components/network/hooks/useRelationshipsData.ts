import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Relationship {
  upline_id: string;
  downline_id: string;
  status: string;
}

export const useRelationshipsData = (playerId: string | null) => {
  const [relationships, setRelationships] = useState<Relationship[]>([]);

  useEffect(() => {
    const fetchRelationships = async () => {
      if (!playerId) return;

      const storedRelationships = localStorage.getItem('user_relationships');
      
      if (!storedRelationships) {
        const { data, error } = await supabase
          .from('player_relationships')
          .select('*');
        
        if (error) {
          console.error('Error fetching relationships:', error);
          return;
        }

        if (data) {
          setRelationships(data);
          localStorage.setItem('user_relationships', JSON.stringify(data));
        }
      } else {
        try {
          const parsedRelationships = JSON.parse(storedRelationships);
          setRelationships(parsedRelationships);
        } catch (error) {
          console.error('Error parsing stored relationships:', error);
          localStorage.removeItem('user_relationships');
        }
      }
    };

    fetchRelationships();
  }, [playerId]);

  return relationships;
};