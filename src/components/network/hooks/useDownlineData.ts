import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Downline } from "../types/NetworkTypes";

export const useDownlineData = (relationships: any[], playerId: string | null) => {
  const [downlines, setDownlines] = useState<Downline[]>([]);

  useEffect(() => {
    const fetchDownlines = async () => {
      if (!playerId) return;

      const downlineData = relationships.filter(
        (r: any) => r.upline_id === playerId && r.status === 'active'
      );

      const fetchedDownlines = [];
      for (const relationship of downlineData) {
        const { data, error } = await supabase
          .from('players')
          .select('id, alias')
          .eq('id', relationship.downline_id)
          .single();

        if (error) {
          console.error('Error fetching downline:', error);
          continue;
        }

        if (data) {
          fetchedDownlines.push({
            id: data.id,
            alias: data.alias
          });
        }
      }

      setDownlines(fetchedDownlines);
    };

    fetchDownlines();
  }, [relationships, playerId]);

  return downlines;
};