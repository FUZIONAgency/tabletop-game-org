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

      try {
        // First try to get from local storage
        const storedRelationships = localStorage.getItem('user_relationships');
        
        if (!storedRelationships) {
          // If not in storage, fetch from Supabase
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
            // Store in localStorage for future use
            localStorage.setItem('user_relationships', JSON.stringify(data));
          }
        } else {
          try {
            const parsedRelationships = JSON.parse(storedRelationships);
            setRelationships(parsedRelationships);
          } catch (error) {
            console.error('Error parsing stored relationships:', error);
            // If there's an error parsing, remove the invalid data
            localStorage.removeItem('user_relationships');
            // Fetch fresh data
            const { data, error: fetchError } = await supabase
              .from('player_relationships')
              .select('*')
              .or(`upline_id.eq.${playerId},downline_id.eq.${playerId}`);
            
            if (fetchError) {
              console.error('Error fetching relationships after parse error:', fetchError);
              return;
            }

            if (data) {
              setRelationships(data);
              localStorage.setItem('user_relationships', JSON.stringify(data));
            }
          }
        }
      } catch (error) {
        console.error('Unexpected error in useRelationshipsData:', error);
      }
    };

    fetchRelationships();
  }, [playerId]);

  return relationships;
};