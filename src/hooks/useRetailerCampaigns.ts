import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth";
import { Campaign } from "@/types/campaign";

export const useRetailerCampaigns = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["retailer-campaigns"],
    queryFn: async () => {
      // First get the player id
      const { data: playerData } = await supabase
        .from("players")
        .select("id")
        .eq("auth_id", user?.id)
        .maybeSingle();

      // Get the campaign type id for standard (retailer) games
      const { data: typeData, error: typeError } = await supabase
        .from("campaign_types")
        .select("id")
        .eq("name", "Retailer")
        .maybeSingle();

      if (typeError) {
        console.error("Error fetching campaign type:", typeError);
        throw new Error("Failed to fetch campaign type");
      }

      if (!typeData) {
        console.error("Campaign type 'Retailer' not found");
        return []; // Return empty array if type not found
      }

      // Get all campaigns with game system information and owner alias
      const { data: campaigns, error } = await supabase
        .from("campaigns")
        .select(`
          *,
          campaign_players!inner(*),
          game_system:game_systems(id, name, description, logo_image_url),
          owner:campaign_players!inner(
            player:players(alias)
          )
        `)
        .eq("type_id", typeData.id)
        .eq("campaign_players.role_type", "owner")
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Transform the data to match our Campaign type
      return campaigns.map(campaign => ({
        ...campaign,
        is_member: campaign.campaign_players.some(
          player => player.player_id === playerData?.id
        ),
        is_owner: campaign.campaign_players.some(
          player => player.player_id === playerData?.id && player.role_type === 'owner'
        ),
        owner_alias: campaign.owner[0]?.player?.alias || null,
        game_system: campaign.game_system || null
      })) as Campaign[];
    },
    enabled: !!user,
  });
};