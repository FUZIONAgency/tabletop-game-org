import { useAuth } from "@/contexts/auth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useJoinCampaign = (refetch: () => void) => {
  const { user } = useAuth();
  const { toast } = useToast();

  const joinCampaign = async (campaignId: string) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to join campaigns",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log("Attempting to join campaign:", campaignId);
      console.log("Current user:", user.id);

      // First check if there are any existing players
      const { data: existingPlayers } = await supabase
        .from("campaign_players")
        .select("*")
        .eq("campaign_id", campaignId);

      console.log("Existing players:", existingPlayers);

      const roleType = existingPlayers && existingPlayers.length === 0 ? "owner" : "player";
      console.log("Role type determined:", roleType);

      // Get the player record for the current user
      const { data: playerData, error: playerError } = await supabase
        .from("players")
        .select("id")
        .eq("auth_id", user.id)
        .maybeSingle();

      if (playerError) throw playerError;

      console.log("Player data:", playerData);

      if (!playerData) {
        toast({
          title: "Player profile required",
          description: "Please create a player profile first",
          variant: "destructive",
        });
        return;
      }

      // Check if the user is already in the campaign
      const { data: existingPlayer } = await supabase
        .from("campaign_players")
        .select("*")
        .eq("campaign_id", campaignId)
        .eq("player_id", playerData.id)
        .maybeSingle();

      console.log("Existing player check:", existingPlayer);

      if (existingPlayer) {
        toast({
          title: "Already joined",
          description: "You are already a member of this campaign",
          variant: "destructive",
        });
        return;
      }

      // Join the campaign
      const { error: joinError } = await supabase
        .from("campaign_players")
        .insert({
          campaign_id: campaignId,
          player_id: playerData.id,
          role_type: roleType,
          status: "active",
        });

      console.log("Join attempt result:", joinError || "Success");

      if (joinError) throw joinError;

      toast({
        title: "Success!",
        description: `You have joined the campaign as ${roleType}`,
      });

      refetch();
    } catch (error) {
      console.error("Error joining campaign:", error);
      toast({
        title: "Error",
        description: "Failed to join campaign. Please try again.",
        variant: "destructive",
      });
    }
  };

  return joinCampaign;
};