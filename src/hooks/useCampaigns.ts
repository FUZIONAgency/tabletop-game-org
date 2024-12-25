import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth";

export const useCampaigns = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["online-campaigns"],
    queryFn: async () => {
      // First get the player id
      const { data: playerData } = await supabase
        .from("players")
        .select("id")
        .eq("auth_id", user?.id)
        .maybeSingle();

      // Get all campaigns with game system information
      const { data: campaigns, error } = await supabase
        .from("campaigns")
        .select(`
          *,
          campaign_players!inner(*),
          game_system:game_systems(name)
        `)
        .eq("type", "online")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Add is_member flag
      return campaigns.map(campaign => ({
        ...campaign,
        is_member: campaign.campaign_players.some(
          player => player.player_id === playerData?.id
        )
      }));
    },
    enabled: !!user,
  });
};