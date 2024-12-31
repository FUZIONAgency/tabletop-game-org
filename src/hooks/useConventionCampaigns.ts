import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth";

export const useConventionCampaigns = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["convention-campaigns"],
    queryFn: async () => {
      // First get the player id
      const { data: playerData } = await supabase
        .from("players")
        .select("id")
        .eq("auth_id", user?.id)
        .maybeSingle();

      // Get all campaigns with game system information, owner alias, and campaign players
      const { data: campaigns, error } = await supabase
        .from("campaigns")
        .select(`
          *,
          campaign_players!inner(*),
          game_system:game_systems(name),
          owner:campaign_players!inner(
            player:players(alias)
          )
        `)
        .eq("type", "convention")
        .eq("campaign_players.role_type", "owner")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Add is_member flag and owner_alias, and check if current player is owner
      return campaigns.map(campaign => ({
        ...campaign,
        is_member: campaign.campaign_players.some(
          player => player.player_id === playerData?.id
        ),
        is_owner: campaign.campaign_players.some(
          player => player.player_id === playerData?.id && player.role_type === 'owner'
        ),
        owner_alias: campaign.owner[0]?.player?.alias || null
      }));
    },
    enabled: !!user,
  });
};