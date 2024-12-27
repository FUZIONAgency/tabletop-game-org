import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const usePlayerSessions = (userId: string | undefined, roleType: "owner" | "player") => {
  return useQuery({
    queryKey: ["player-sessions", userId, roleType],
    queryFn: async () => {
      const { data: playerData } = await supabase
        .from("players")
        .select("id")
        .eq("auth_id", userId)
        .maybeSingle();

      if (!playerData) return [];

      // First get the campaign IDs where the user has the specified role
      const { data: campaignIds } = await supabase
        .from("campaign_players")
        .select("campaign_id")
        .eq("player_id", playerData.id)
        .eq("role_type", roleType === "owner" ? "owner" : "player");

      if (!campaignIds) return [];

      // Then get the sessions for those campaigns
      const { data, error } = await supabase
        .from("sessions")
        .select(`
          id,
          session_number,
          start_date,
          description,
          campaign:campaigns (
            id,
            title,
            retailer_id
          )
        `)
        .gte("start_date", new Date().toISOString())
        .in("campaign_id", campaignIds.map(c => c.campaign_id))
        .order("start_date", { ascending: true })
        .limit(4);

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });
};